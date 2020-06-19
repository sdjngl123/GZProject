Hoteam_Mobile_MobileForgetPassword_Init = function () {
    //校验是否符合规范及为空
    function regexCheck(ele) {
        //找到所有的ele下面的input
        var flag = true;
        var inputs = ele.find("input.mobile-for-input");
        for (var i = 0; i < inputs.length; i++) {
            var input = $(inputs[i]);
            var error = input.closest(".mobile-for-input-c").find(".mobile-for-error");
            if (!input.val() && input.attr("required")) {
                error.html(HMUI.Language.Lang("ForgetPassword", "NoNull") + input.attr("placeholder")).show();
                flag = false;
            } else if (input.val().length > 50) {
                error.html(HMUI.Language.Lang("ForgetPassword", "Length")).show();
                flag = false;
            } else if (input.val() && input.attr("regex")) {
                var reg = new RegExp(input.attr("regex"));
                if (!reg.test(input.val())) {//验证不通过
                    error.html(input.attr("placeholder") + HMUI.Language.Lang("ForgetPassword", "Dontrules")).show();
                    flag = false;
                } else {
                    error.hide();
                }
            } else {
                error.hide();
            }
        }
        return flag;
    }
    $("#mobileforname").on("blur", function () {
        regexCheck($(this).parent());
    });
    $("#mobileforcode").on("blur", function () {
        regexCheck($(this).parent());
    });
    $("#getmobileforcode").on("click", function () {
        if ($(this).attr("send") == "yes") {//如果已经发送过一次，且还未过60秒
            return;
        }
        if ($("#mobileforname").val()) {//如果邮箱或者手机号已经填写
            //进行校验
            if (regexCheck($("#mobileforname").parent())) { //如果通过校验，请求服务器
                $.ajax({
                    type: "post",
                    url: "Registered/RegisteredService.asmx/GetPasswordValidateCode",
                    data: JSON.stringify({ RegisterEmail: $("#mobileforname").val() }),
                    dataType: "json",
                    contentType: "application/json",
                    success: function (data) {
                        if (data && data.d.length == 0) {
                            $("#getmobileforcode").empty().text(HMUI.Language.Lang("ForgetPassword", "SendSuccess")).attr("send", "yes");
                            setTimeout(function () {
                                var time = 60;
                                var interval = setInterval(function () {
                                    time = time - 1;
                                    if (time > 0 && $("#getmobileforcode").attr("send") != 'no') {
                                        $("#getmobileforcode").html(time + HMUI.Language.Lang("ForgetPassword", "AfterSendAgain")).addClass("mobile-for-ide-disa");
                                    } else {
                                        clearInterval(interval);
                                        $("#getmobileforcode").html(HMUI.Language.Lang("ForgetPassword", "SendAgain")).attr("send", "no").removeClass("mobile-for-ide-disa");
                                    }
                                }, 1000);
                            }, 800);
                        } else {
                            var returnArr = data.d;
                            for (var n = 0; n < returnArr.length; n++) {
                                if (returnArr[n].Key == "RegisterEmail") {
                                    $("#mobileforname").closest(".mobile-for-input-c").find(".mobile-for-error").html(returnArr[n].Value).show();
                                } else if (returnArr[n].Key == "ValidateCode") {
                                    $("#identifyingcode").closest(".mobile-for-input-c").find(".mobile-for-error").html(returnArr[n].Value).show();
                                }
                            }
                        }
                    },
                    error: function (err) {
                        alert(err.responseText);
                    }
                });
            }
        }
    });
    //点击下一步，校验验证码
    $("#mobilefornextstep").on("click", function () {
        $.ajax({
            type: "post",
            url: "Registered/ResetPassword/IdentityVerification.aspx",
            data: { Method: "CheckValidateCode", ValidateCode: $("#mobileforcode").val(), Email: $("#mobileforname").val() },
            dataType: "json",
            success: function (data) {

                if (data.Success == "true") {
                    if (HMUI.AppSets.MobileDevice != "Phone") {
                        HMUI.UIManager.ShowInSingle("MobileResetPassword", { "usercode": $("#mobileforname").val(), "Token": data.Token }, "right", "slide");
                    }
                    else {
                        HMUI.UIManager.ShowInLeft("MobileResetPassword", { "usercode": $("#mobileforname").val(), "Token": data.Token }, "slide", false);
                    }
                } else {
                    $("#mobileforcode").closest(".mobile-for-input-c").find(".mobile-for-error").html(data.Value).show();
                }
            },
            error: function (err) {
                alert(err.responseText);
            }
        });
    });
    $(".mobile-forgetpassword-back").on("click", function () {
        if (HMUI.AppSets.MobileDevice != "Phone") {
            HMUI.UIManager.ShowInSingle("MobileLogin", {}, "right", "slide");
        }
        else {
            HMUI.UIManager.ShowInLeft("MobileLogin", {}, "slide", false);
        }
    });
}
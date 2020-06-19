Hoteam_Mobile_MobileRegistered_Init = function (pageEvent) {
    //校验是否符合规范及为空
    function regexCheck(ele) {
        //找到所有的ele下面的input
        var flag = true;
        var inputs = ele.find("input.mobile-re-input");
        for (var i = 0; i < inputs.length; i++) {
            var input = $(inputs[i]);
            var error = input.closest(".mobile-re-c").find(".mobile-re-error");
            if (!input.val() && input.attr("required")) {
                error.html(HMUI.Language.Lang("Registered", "NoNull") + input.attr("placeholder")).show();
                flag = false;
            } else if (input.val().length > 50) {
                error.html(HMUI.Language.Lang("Registered", "Length")).show();
                flag = false;
            } else if (input.val() && input.attr("regex")) {
                var reg = new RegExp(input.attr("regex"));
                if (!reg.test(input.val())) {//验证不通过
                    error.html(input.attr("placeholder") + HMUI.Language.Lang("Registered", "Dontrules")).show();
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
    //离开事件
    $(".mobile-re-content").find("input.mobile-re-input").on({
        "focus": function () {
            $(this).addClass("mobile-input-focus");
            $(this).closest(".mobile-re-c").find(".mobile-iden-btn").addClass("mobile-input-focus");
        },
        "blur": function () {
            $(this).removeClass("mobile-input-focus");
            regexCheck($(this).parent());
            if ($(this).attr("id") == "registeredname" && $(this).val()) {
                var type = $(this).val().indexOf("@") < 0 ? "phone" : "email"; ;
                var usermsgstr = HMUI.DataService.Call("Hoteam.Registered.RegisteredDataService.CheckMailOrCompanyNameExist", { para: { ValidateType: type, RegisterEmail: $(this).val()} });
                if (usermsgstr) {
                    $(this).closest(".mobile-re-c").find(".mobile-re-error").html(usermsgstr).show();
                }
            } else if ($(this).attr("id") == "registeredcompany" && $(this).val()) {
                var companymsgstr = HMUI.DataService.Call("Hoteam.Registered.RegisteredDataService.CheckMailOrCompanyNameExist", { para: { ValidateType: "company", CompanyName: $(this).val()} });
                if (companymsgstr) {
                    $(this).closest(".mobile-re-c").find(".mobile-re-error").html(companymsgstr).show();
                }
            }
        }
    });
    //获取验证码
    $("#mobilegetVerNum").on("click", function () {
        if ($(this).attr("send") == "yes") {//如果已经发送过一次，且还未过60秒
            return;
        }
        if ($("#registeredname").val()) {//如果邮箱或者手机号已经填写
            //进行校验
            if (regexCheck($("#registeredname").parent())) { //如果通过校验，请求服务器
                var paras = {};
                paras.RegisterEmail = $("#registeredname").val();
                var returnArr = HMUI.CallAjax.Call(PageInit.WebRootPath + "/Registered/RegisteredService.asmx/", "SendValidateCode", { para: paras });
                if (returnArr && returnArr.length == 0) {//如果返回发送成功
                    $(this).empty().text(HMUI.Language.Lang("Registered", "SendSuccess"));
                    $(this).attr("send", "yes");
                    setTimeout(function () {
                        var time = 60;
                        var interval = setInterval(function () {
                            time = time - 1;
                            if (time > 0 && $("#mobilegetVerNum").attr("send") != 'no') {
                                $("#mobilegetVerNum").html(time + HMUI.Language.Lang("Registered", "AfterSendAgain")).addClass("mobile-iden-btn-disa");
                            } else {
                                clearInterval(interval);
                                $("#mobilegetVerNum").html(HMUI.Language.Lang("Registered", "SendAgain")).attr("send", "no").removeClass("mobile-iden-btn-disa");
                            }
                        }, 1000);
                    }, 800);
                } else {
                    for (var n = 0; n < returnArr.length; n++) {
                        if (returnArr[n].Key == "RegisterEmail") {
                            $("#registeredname").closest(".mobile-re-c").find(".mobile-re-error").html(returnArr[n].Value).show();
                        } else if (returnArr[n].Key == "ValidateCode") {
                            $("#identifyingcode").closest(".mobile-re-c").find(".mobile-re-error").html(returnArr[n].Value).show();
                        }
                    }
                }
            }
        }
    });
    //注册
    $("#registeredBtn").on("click", function () {

        if (regexCheck($(".re-register-content"))) { //通过校验
            var error = $(".mobile-re-error");
            //判判是否还有未通过服务器端校验的数据
            for (var i = 0; i < error.length; i++) {
                if ($(error[i]).css("display") != "none") {
                    return;
                }
            }
            //调用服务器端注册方法
            var paras = {};
            paras.RegisterEmail = $("#registeredname").val();
            paras.Password = EncryptDecrypt.Encrypt($("#registeredpassword").val(), paras.RegisterEmail);
            paras.ValidateCode = $("#identifyingcode").val();
            paras.CompanyName = $("#registeredcompany").val();
            var returnArr = HMUI.CallAjax.Call(PageInit.WebRootPath + "/Registered/RegisteredService.asmx/", "Register", { para: paras });
            //var returnArr = [];
            if (returnArr && returnArr.length == 0) {//注册成功
                var time = 5;
                var text = HMUI.Language.Lang("Registered", "RegisteredSuccess");
                var interval = setInterval(function () {
                    if (time == 1) {
                        clearInterval(interval);
                        if (HMUI.AppSets.MobileDevice != "Phone") {
                            HMUI.UIManager.ShowInSingle("MobileLogin", {}, "right", "slide");
                        }
                        else {
                            HMUI.UIManager.ShowInLeft("MobileLogin", {}, "slide", false);
                        }
                    }
                    $("#registeredBtn").text(text + time);
                    time = time - 1;
                }, 1000);
            } else {
                for (var n = 0; n < returnArr.length; n++) {
                    if (returnArr[n].Key == "RegisterEmail") {
                        $("#registeredname").closest(".mobile-re-c").find(".mobile-re-error").html(returnArr[n].Value).show();
                    } else if (returnArr[n].Key == "ValidateCode") {
                        $("#identifyingcode").closest(".mobile-re-c").find(".mobile-re-error").html(returnArr[n].Value).show();
                    } else if (returnArr[n].Key == "Password") {
                        $("#registeredpassword").closest(".mobile-re-c").find(".mobile-re-error").html(returnArr[n].Value).show();
                    } else if (returnArr[n].Key == "RegisterCompany") {
                        $("#registeredcompany").closest(".mobile-re-c").find(".mobile-re-error").html(returnArr[n].Value).show();
                    }
                }
            }
        }
    });
    //返回登陆页
    $(".mobile-re-back").on("click", function () {
        if (HMUI.AppSets.MobileDevice != "Phone") {
            HMUI.UIManager.ShowInSingle("MobileLogin", {}, "right", "slide");
        }
        else {
            HMUI.UIManager.ShowInLeft("MobileLogin", {}, "slide", false);
        }
    });
    $(".mobile-re-login").on("click", function () {
        if (HMUI.AppSets.MobileDevice != "Phone") {
            HMUI.UIManager.ShowInSingle("MobileLogin", {}, "right", "slide");
        }
        else {
            HMUI.UIManager.ShowInLeft("MobileLogin", {}, "slide", false);
        }
    });
};
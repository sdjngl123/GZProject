Hoteam_Mobile_MobileResetPassword_Init = function (pageCtrl) {

    //校验是否符合规范及为空
    function regexCheck(ele) {
        //找到所有的ele下面的input
        var flag = true;
        var inputs = ele.find("input.mobile-for-input");
        for (var i = 0; i < inputs.length; i++) {
            var input = $(inputs[i]);
            var error = input.closest(".mobile-for-input-c").find(".mobile-for-error");
            if (!input.val() && input.attr("required")) {
                error.html(HMUI.Language.Lang("MobileResetPassword", "NoNull")).show();
                flag = false;
            } else if (input.val().length > 50) {
                error.html(HMUI.Language.Lang("MobileResetPassword", "Length")).show();
                flag = false;
            } else if (input.val() && input.attr("regex")) {
                var reg = new RegExp(input.attr("regex"));
                if (!reg.test(input.val())) {//验证不通过
                    error.html(HMUI.Language.Lang("MobileResetPassword", "Dontrules")).show();
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
    //校验两次密码是否一致
    function checkpassword() {
        if ($("#mobileresetpaw1").val() && $("#mobileresetpaw").val()) {//两个密码框均有输入值
            if ($("#mobileresetpaw1").val() != $("#mobileresetpaw").val()) {
                $("#mobileresetpaw1").closest(".mobile-for-input-c").find(".mobile-for-error").html(HMUI.Language.Lang("MobileResetPassword", "CheckPassword")).show();
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }
    $("#mobileresetpaw").on("blur", function () {
        regexCheck($(this).parent());
        checkpassword();
    });
    $("#mobileresetpaw1").on("blur", function () {
        regexCheck($(this).parent());
        checkpassword();
    });
    //保存密码
    $("#mobileresetok").on("click", { usercode: pageCtrl.o.GetPara().usercode, token: pageCtrl.o.GetPara().Token }, function (e) {
        if (!checkpassword()) {
            return;
        }
        if (!regexCheck($(".mobile-forgetpassword-content"))) {
            return;
        }

        var pwd = EncryptDecrypt.Encrypt($("#mobileresetpaw").val(), e.data.usercode);
        var para = { Password: pwd, Token: e.data.token, Method: "SavePassword" };
        $.ajax({
            type: "get",
            data: para,
            url: "Registered/ResetPassword/IdentityVerification.aspx",
            dataType: "json",
            success: function (data) {
                if (data && data.Key == "Success") {
                    var callback = function () {
                        if (HMUI.AppSets.MobileDevice != "Phone") {
                            HMUI.UIManager.ShowInSingle("MobileLogin", {}, "right", "slide");
                        }
                        else {
                            HMUI.UIManager.ShowInLeft("MobileLogin", {}, "slide", false);
                        }
                    }
                    HMUI.UIManager.MsgBox(HMUI.Language.Lang("MobileResetPassword", "SetPasswordSuccess"), null, callback);
                }
                if (data && data.Key == "Error") {
                    $("#mobileresetpaw1").closest(".mobile-for-input-c").find(".mobile-for-error").html(data.Value).show();
                }
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
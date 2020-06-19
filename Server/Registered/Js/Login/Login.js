//页面初始化
InforCenter_Platform_Login_PageInit = function (ctrlEvent) {
    LoginUserData = null;
    ctrlEvent.o.LoadTemplate("LoginCenterContent");
    //为了防止chrome的自动记住密码功能，动态添加password
    if ("ActiveXObject" in window) {//如果是ie
        $("#lblPassword").before('<div class="re-login-input-c"><input id="txtPassword" type="password" class="re-login-input"></input></div>');
    } else {
        $("#lblPassword").before('<div class="re-login-input-c"><input id="txtPassword" type="text" onfocus="this.type=\'password\'" class="re-login-input"></input></div>');
    }
    LoginInitData = HoteamUI.DataService.Call("InforCenter.Organization.OrganizationDataService.GetLoginInfo", {});
    if (HoteamUI.Common.IsNullOrEmpty(LoginInitData) == false) {
        HoteamUI.Security.LoginPara.Lang = HoteamUI.Language.CurLanguage;
        InforCenter_Platform_Login_InitPageLanguage();
        InforCenter_Platform_Login_BindData();
        InforCenter_Platform_Login_BindEvent();
    }
    var loginType = $.cookie("loginType");
    if (loginType) {
        $("#userRegister").click();
        $.cookie("loginType", "");
    }
}
//初始化页面语言信息
InforCenter_Platform_Login_InitPageLanguage = function () {
    HoteamUI.Language.SetLanguage(HoteamUI.Security.LoginPara.Lang);
    InforCenter_Platform_Login_SetCtrLanguage("lblUserName", "UserName");
    InforCenter_Platform_Login_SetCtrLanguage("lblLanguage", "Language");
    InforCenter_Platform_Login_SetCtrLanguage("lblPassword", "Password");
    InforCenter_Platform_Login_SetCtrLanguage("lblGroup", "Group");
    InforCenter_Platform_Login_SetCtrLanguage("lblLogin", "LoginText");
    if (HoteamUI.Common.IsNullOrEmpty($("#autoLoginname")) == false) {
        var text = HoteamUI.Language.Lang("Login.AutoLogin");
        $("#autoLoginname").html(text);
    }
    //注册页面的语言信息
    InforCenter_Platform_Login_SetCtrLanguage("userLogin", "UserLogin");
    InforCenter_Platform_Login_SetCtrLanguage("userRegister", "UserRegister");
    InforCenter_Platform_Login_SetCtrLanguage("registerName", "UserName");
    InforCenter_Platform_Login_SetCtrLanguage("verificationNum", "VerificationNum");
    InforCenter_Platform_Login_SetCtrLanguage("getVerNum", "GetVerNum");
    InforCenter_Platform_Login_SetCtrLanguage("registerPassword", "RegisterPassword");
    InforCenter_Platform_Login_SetCtrLanguage("companyName", "CompanyName");
    InforCenter_Platform_Login_SetCtrLanguage("advancedSetting", "AdvancedSetting");
    InforCenter_Platform_Login_SetCtrLanguage("forgetPassword", "ForgetPassword");
    InforCenter_Platform_Login_SetCtrLanguage("registerBtn", "Register");
    InforCenter_Platform_Login_SetCtrLanguage("companyAccount", "CompanyAccount");
}
//绑定下拉框数据
InforCenter_Platform_Login_BindData = function () {
    if (HoteamUI.Common.IsNullOrEmpty(LoginInitData) == false) {
        var languages = HoteamUI.Language.GetLanguageList();
        var ctrLanguage = $("#ddlLanguage").data("languages", languages);
        //语言数据绑定
        if (HoteamUI.Common.IsNullOrEmpty(ctrLanguage) == false && ctrLanguage.length > 0) {
            var $languageSel = $("#ddlLanguageul");
            if ($languageSel.length > 0) {
                $languageSel.empty();
            } else {
                var languageSel = '<ul id="ddlLanguageul" class="login-center-item-selul" pid="ddlLanguage"></ul>';
                $languageSel = $(languageSel);
            }
            var languageValue = '', languageText = '';
            for (var i = 0; i < languages.length; i++) {
                if (HoteamUI.Common.IsNullOrEmpty(languages[i]) == false
                    && HoteamUI.Common.IsNullOrEmpty(languages[i].Name) == false
                    && HoteamUI.Common.IsNullOrEmpty(languages[i].Text) == false) {
                    var $li = $("<li>");
                    $li.attr("val", languages[i].Name);
                    $li.html(languages[i].Text);
                    $languageSel.append($li);
                    if (HoteamUI.Security.LoginPara.Lang) {
                        if (HoteamUI.Security.LoginPara.Lang == languages[i].Name) {
                            languageValue = languages[i].Name;
                            languageText = languages[i].Text;
                        }
                    } else if (i == 0) {
                        ctrLanguage.attr("val", languages[i].Name);
                        ctrLanguage.val(languages[i].Text);
                    }
                }
            }
            $languageSel.appendTo($("body")).hide();
            if (languages.length > 0) {
                $("#lblLanguage").hide();
            }
            if (HoteamUI.Common.IsNullOrEmpty(HoteamUI.Security.LoginPara.Lang) == false) {
                ctrLanguage.attr("val", languageValue);
                ctrLanguage.val(languageText);
            }
            else {
                HoteamUI.Security.LoginPara.Lang = ctrLanguage.val();
            }
        }
    }
    if (HoteamUI.Common.IsNullOrEmpty(LoginUserData) == false) {
        InforCenter_Platform_Login_BindGroupData();
    }
}
//绑定组织数据
InforCenter_Platform_Login_BindGroupData = function () {
    var ctrGroup = $("#ddlGroup");
    if (!HoteamUI.Common.IsNullOrEmpty(ctrGroup)
        && ctrGroup.length > 0
        && !HoteamUI.Common.IsNullOrEmpty(LoginUserData)
        && !HoteamUI.Common.IsNullOrEmpty(LoginUserData.Groups)
        && LoginUserData.Groups.length > 0) {
        var data = LoginUserData.Groups;
        ctrGroup.data("groups", data);
        var $ctrGroupul = $("#ddlGroupul");
        if ($ctrGroupul.length > 0) {
            $ctrGroupul.empty();
        } else {
            $ctrGroupul = $('<ul id="ddlGroupul" class="login-center-item-selul" pid="ddlGroup"></ul>');
        }
        for (var i = 0; i < data.length; i++) {
            if (!HoteamUI.Common.IsNullOrEmpty(data[i])
                && !HoteamUI.Common.IsNullOrEmpty(data[i].GroupName)
                && data[i].GroupName.length > 0) {
                var groupText = '';
                for (var j = 0; j < data[i].GroupName.length; j++) {
                    if (data[i].GroupName[j].Language == HoteamUI.Security.LoginPara.Lang) {
                        groupText = data[i].GroupName[j].Text;
                    }
                }
                var $li = $("<li></li>");
                $li.attr("val", data[i].GroupID);
                $li.html(groupText);
                $ctrGroupul.append($li);
                if (!HoteamUI.Security.LoginPara.UserGroup && i == 0) {
                    ctrGroup.attr("val", data[i].GroupID);
                    ctrGroup.val(groupText);
                    $("#lblGroup").hide();
                } else if (HoteamUI.Security.LoginPara.UserGroup == data[i].GroupID) {
                    ctrGroup.attr("val", data[i].GroupID);
                    ctrGroup.val(groupText);
                }
            }
        }
        $ctrGroupul.appendTo($("body")).hide();
        //组织机构下拉添加点击事件
        $ctrGroupul.off("click").on("mousedown", function (e) {
            var li = e.target;
            var pid = $(this).attr("pid");
            var input = $("#" + pid);
            input.attr("val", $(li).attr("val"));
            input.val($(li).text());
            input.trigger("change");
        });

        if (!HoteamUI.Security.LoginPara.UserGroup) {
            HoteamUI.Security.LoginPara.UserGroup = ctrGroup.attr("val");
        }
    }
}
//绑定事件
InforCenter_Platform_Login_BindEvent = function () {
    var ctrUserName = $("#txtUserName");
    var ctrPassword = $("#txtPassword");
    var ctrGroup = $("#ddlGroup");
    var ctrLanguage = $("#ddlLanguage");
    //点击背景提示文字，触发事件
    $(".re-login-container .re-input-placeholder").on("click", function () {
        $(this).hide().prev().find("input").click().focus();
    });
    $(".re-login-container .re-register-input-placeholder").click(function () {
        $(this).hide().parent().find("input").click().focus();
    });
    //点击高级设置注册事件
    $(".re-login-container .re-advanced-setting-title").on("click", function () {
        if ($(".re-login-container .re-item:first").css("display") == "none") {
            $(".re-login-container .re-item").show();
            $(".re-login-container").css("height", 405);
        } else {
            $(".re-login-container .re-item").hide();
            $(".re-login-container").css("height", 365);
        }
    });
    //点击头部title进行切换登录和注册
    $(".re-login-container .re-login-title").on("click", function () {
        if ($(this).hasClass("re-login-user-login")) {
            $(".re-login-container .re-login-content").show();
            $(".re-login-container .re-register-content").hide();
            $(this).addClass("re-login-user-login-sel");
            $(this).next().removeClass("re-login-user-login-sel");
            $(".re-register-content").find("input").val("");
            $(".re-register-content").find(".re-register-input-placeholder").show();
            $("#registerBtn").removeAttr("register").html(HoteamUI.Language.Lang("Login", "Register"));
            $("#getVerNum").html(HoteamUI.Language.Lang("Login", "GetVerNum"));
        } else {
            $(".re-login-container .re-login-content").hide();
            $(".re-login-container .re-register-content").show();
            $(this).addClass("re-login-user-login-sel");
            $(this).prev().removeClass("re-login-user-login-sel");
        }
    });
    if (HoteamUI.Common.IsNullOrEmpty(ctrUserName) == false && ctrUserName.length > 0
        && HoteamUI.Common.IsNullOrEmpty(ctrPassword) == false && ctrPassword.length > 0
        && HoteamUI.Common.IsNullOrEmpty(ctrGroup) == false && ctrGroup.length > 0
        && HoteamUI.Common.IsNullOrEmpty(ctrLanguage) == false && ctrLanguage.length > 0) {
        $(".login-center-item-down").on("click", function () {
            $(this).prev().trigger("click").focus();
        });
        ctrGroup.on("click", function () {
            var groupul = $("#ddlGroupul");
            if (groupul.css("display") == "none") {
                var position = $(this).offset();
                groupul.css("left", position.left).css("top", parseFloat(position.top) + 30).show();
            } else {
                $("#ddlGroupul").hide();
            }
        }).on("blur", function () {
            $("#ddlGroupul").hide();
        });
        ctrGroup.next(".re-item-down").on("click", function () {
            ctrGroup.click();
        });
        ctrLanguage.on("click", function () {
            var languageul = $("#ddlLanguageul");
            if (languageul.css("display") == "none") {
                var position = $(this).offset();
                languageul.css("left", position.left).css("top", parseFloat(position.top) + 30).show();
            } else {
                languageul.hide();
            }
        }).on("blur", function () {
            $("#ddlLanguageul").hide();
        });
        ctrLanguage.next(".re-item-down").on("click", function () {
            ctrLanguage.click();
        });
        $(".login-center-item-selul").on("mousedown", function (e) {
            var li = e.target;
            var pid = $(this).attr("pid");
            var input = $("#" + pid);
            input.attr("val", $(li).attr("val"));
            input.val($(li).text());
            input.trigger("change");
        });
        ctrUserName.focus(function () {
            $(this).parent().next().hide();
            $(this).closest(".re-login-username-c").addClass("re-login-username-c-focus");
            $(this).parent().prev().addClass("b-blue-user").removeClass("b-user");
        });
        //用户名失去焦点事件
        ctrUserName.blur(function () {
            $(this).closest(".re-login-username-c").removeClass("re-login-username-c-focus");
            $(this).parent().nextAll(".login-error").hide();
            $(this).parent().prev().addClass("b-user").removeClass("b-blue-user");
            var userCode = $.trim(ctrUserName.val());
            if (HoteamUI.Common.IsNullOrEmpty(userCode) == false) {
                HoteamUI.Security.LoginPara.UserCode = userCode;
                HoteamUI.Security.LoginPara.UserGroup = "";
                //ctrPassword.val("").next().show();
                GetLoginUser();
            }
            else {
                ctrGroup.empty2();
                $(this).parent().next().show();
            }
        });
        ctrPassword.on("blur", function () {
            $(this).closest(".re-login-password-c").removeClass("re-login-username-c-focus");
            $(this).parent().nextAll(".login-error").hide();
            $(this).parent().prev().addClass("b-password").removeClass("b-blue-password");
            if (!$(this).val()) {
                $(this).parent().next().show();
            }
        });
        ctrPassword.on("focus", function () {
            $(this).parent().next().hide();
            $(this).closest(".re-login-password-c").addClass("re-login-username-c-focus");
            $(this).parent().prev().addClass("b-blue-password").removeClass("b-password");
        });
        $(".re-register-input").on({
            "focus": function () {
                $(this).next().hide();
                $(this).addClass("re-login-username-c-focus");
                $(this).nextAll(".re-register-verification-btn").addClass("re-login-username-c-focus");
            },
            "blur": function () {
                $(this).removeClass("re-login-username-c-focus");
                if (!$(this).val()) {
                    $(this).next().show();
                }
                if (!regexCheck($(this).parent())) {
                    return;
                } else {
                    if ($(this).attr("id") == "registerUser") {
                        var type = $(this).val().indexOf("@") < 0 ? "phone" : "email";
                        var usermsgstr = HoteamUI.DataService.Call("Hoteam.Registered.RegisteredDataService.CheckMailOrCompanyNameExist", { para: { ValidateType: type, RegisterEmail: $(this).val()} });
                        if (usermsgstr) {
                            $(this).nextAll(".re-register-error").html(usermsgstr).show();
                        }
                    }
                    if ($(this).attr("id") == "r_companyName") {
                        var usermsgstr = HoteamUI.DataService.Call("Hoteam.Registered.RegisteredDataService.CheckMailOrCompanyNameExist", { para: { ValidateType: "company", CompanyName: $(this).val()} });
                        if (usermsgstr) {
                            $(this).nextAll(".re-register-error").html(usermsgstr).show();
                        }
                    }
                    if ($(this).attr("id") == "r_companyAccount") {
                        var usermsgstr = HoteamUI.DataService.Call("Hoteam.Registered.RegisteredDataService.CheckCompanyAccountExist", { para: {  CompanyAccount: $(this).val() } });
                        if (usermsgstr) {
                            $(this).nextAll(".re-register-error").html(usermsgstr).show();
                        }
                    }
                }
            }
        });
        //获取验证码
        $("#getVerNum").on("click", function () {
            if ($("#registerBtn").attr("register")) {
                return;
            }
            if ($(this).attr("send") == "yes") {//如果已经发送过一次，且还未过60秒
                return;
            }
            if ($("#registerUser").val()) {//如果邮箱或者手机号已经填写
                //进行校验
                if (regexCheck($("#registerUser").parent())) { //如果通过校验，请求服务器
                    var paras = {};
                    paras.RegisterEmail = $("#registerUser").val();
                    var returnArr = HoteamUI.CallAjax.Call(Registered.WebServicePath, "SendValidateCode", { para: paras });
                    if (returnArr && returnArr.length == 0) {//如果返回发送成功
                        var success = "<span class='send-success'></span><span style='color:#4cba76;'>" + HoteamUI.Language.Lang("Login", "Send") + "</span>";
                        $(this).empty().append(success);
                        $(this).attr("send", "yes");
                        setTimeout(function () {
                            $("#getVerNum").data("time", 60);
                            var interval = setInterval(function () {
                                var time = $("#getVerNum").data("time");
                                $("#getVerNum").data("time", time - 1);
                                if ($("#getVerNum").data("time") > 0 && $("#getVerNum").attr("send") != 'no') {
                                    $("#getVerNum").html(time + HoteamUI.Language.Lang("Login", "AfterSendAgain")).css({
                                        "background-color": "#eee", "border": "1px solid #ccc"
                                    });
                                } else {
                                    clearInterval(interval);
                                    $("#getVerNum").html(HoteamUI.Language.Lang("Login", "SendAgain")).attr("send", "no").css({
                                        "background-color": "#fff", "border": "1px solid #0090ff"
                                    });
                                }
                            }, 1000);
                        }, 800);
                    } else {
                        for (var n = 0; n < returnArr.length; n++) {
                            if (returnArr[n].Key == "RegisterEmail") {
                                $("#registerUser").nextAll(".re-register-error").html(returnArr[n].Value).show();
                            } else if (returnArr[n].Key == "ValidateCode") {
                                $("#r_verificationNum").nextAll(".re-register-error").html(returnArr[n].Value).show();
                            }
                        }
                    }
                }
            }
        });
        //注册
        $("#registerBtn").on("click", function () {
            if ($(this).attr("register")) {
                return;
            }
            if (regexCheck($(".re-register-content"))) { //通过校验
                if ($("#r_companyName").nextAll(".re-register-error").css("display") != "none" || $("#registerUser").nextAll(".re-register-error").css("display") != "none") {
                    return;
                }
                //调用服务器端注册方法
                var paras = {};
                paras.RegisterEmail = $("#registerUser").val();
                paras.Password = EncryptDecrypt.Encrypt($("#r_Password").val(), paras.RegisterEmail);
                paras.ValidateCode = $("#r_verificationNum").val();
                paras.CompanyName = $("#r_companyName").val();
                paras.CompanyAccount = $("#r_companyAccount").val();
                var returnArr = HoteamUI.CallAjax.Call(Registered.WebServicePath, "Register", { para: paras });
                if (returnArr && returnArr.length == 0) {//注册成功
                    if (AppSets.RegisterSuccessMessage) {
                        HoteamUI.UIManager.MsgBox(AppSets.RegisterSuccessMessage);
                    }
                    $("#getVerNum").removeClass("re-login-username-c-focus").data("time", 0).css({ "border": "1px solid #ccc" });
                    $("#registerBtn").text(HoteamUI.Language.Lang("Login", "RegisterSuccess")).attr("register", true);
                    var time = 5;
                    var interval = setInterval(function () {
                        if (time > 0) {
                            $("#registerBtn").find("span").remove();
                            $("#registerBtn").append("<span style='margin-left:5px;'>" + time + "</span>");
                            time = time - 1;
                        } else {
                            clearInterval(interval);
                            $("#userLogin").trigger("click");
                        }
                    }, 1000);
                } else {
                    for (var n = 0; n < returnArr.length; n++) {
                        if (returnArr[n].Key == "RegisterEmail") {
                            $("#registerUser").nextAll(".re-register-error").html(returnArr[n].Value).show();
                        } else if (returnArr[n].Key == "ValidateCode") {
                            $("#r_verificationNum").nextAll(".re-register-error").html(returnArr[n].Value).show();
                        } else if (returnArr[n].Key == "Password") {
                            $("#r_Password").nextAll(".re-register-error").html(returnArr[n].Value).show();
                        } else if (returnArr[n].Key == "RegisterCompany") {
                            $("#r_companyName").nextAll(".re-register-error").html(returnArr[n].Value).show();
                        }
                    }
                }
            }
        });
        //忘记密码
        $("#forgetPassword").on("click", function () {
            window.open(PageInit.WebRootPath + "/Registered/ResetPassword/resetpassword.html");
        });
        //校验是否符合规范及为空
        function regexCheck(ele) {
            //找到所有的ele下面的input
            var flag = true;
            var inputs = ele.find("input.re-register-input");
            for (var i = 0; i < inputs.length; i++) {
                var input = $(inputs[i]);
                var error = input.nextAll(".re-register-error");
                var title = input.next().html();
                if (!input.val() && input.attr("required")) {
                    error.html(title + HoteamUI.Language.Lang("Login", "NotNull")).show();
                    flag = false;
                } else if (input.val().length > 50) {
                    error.html(HoteamUI.Language.Lang("Login", "Length")).show();
                    flag = false;
                } else if (input.val() && input.attr("regex")) {
                    var reg = new RegExp(input.attr("regex"));
                    if (!reg.test(input.val())) {//验证不通过
                        error.html(title + HoteamUI.Language.Lang("Login", "Dontrules")).show();
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
        var GetLoginUser = function () {
            var userCode = $.trim(ctrUserName.val());
            if (HoteamUI.Common.IsNullOrEmpty(userCode) == false) {
                ctrGroup.empty();
                LoginUserData = HoteamUI.DataService.Call("Hoteam.Registered.RegisteredDataService.GetLoginUser", { para: { UserCode: userCode} });

                if (HoteamUI.Common.IsNullOrEmpty(LoginUserData.ErrorInfo) == false) {
                    ctrUserName.parent().nextAll(".login-error").show().html(LoginUserData.ErrorInfo);
                    return;
                }

                if (HoteamUI.Common.IsNullOrEmpty(ctrUserName) == false) {
                    //用户名为空
                    if (HoteamUI.Common.IsNullOrEmpty($.trim(ctrUserName.val())) == true) {
                        ctrUserName.parent().nextAll(".login-error").show().html(HoteamUI.Language.Lang("Login", "UserNameIsEmpty"));
                        return;
                    }
                    //用户名不存在
                    else if (HoteamUI.Common.IsNullOrEmpty(LoginUserData.UserID) == true) {
                        ctrUserName.parent().nextAll(".login-error").show().html(HoteamUI.Language.Lang("Login", "UserNameIsWrong"));
                        return;
                    }
                }


                //设置企业ID
                HoteamUI.Security.LoginPara.CompanyID = LoginUserData.CompanyID;

                HoteamUI.Security.LoginPara.HostIP = window.location.hostname;

                //设置企业Code
                HoteamUI.Security.LoginPara.CompanyCode = LoginUserData.CompanyCode;
                //数据库
                HoteamUI.Security.LoginPara.Connect = LoginUserData.Connect;

                if (HoteamUI.Common.IsNullOrEmpty(LoginUserData) == false) {
                    //设置当前用户语言
                    if (HoteamUI.Common.IsNullOrEmpty(LoginUserData.Language) == false) {
                        HoteamUI.Security.LoginPara.Lang = LoginUserData.Language;
                        var languages = ctrLanguage.data("languages");
                        for (var i = 0; i < languages.length; i++) {
                            if (languages[i].Name == LoginUserData.Language) {
                                ctrLanguage.attr("val", languages[i].Name);
                                ctrLanguage.val(languages[i].Text);
                            }
                        }
                        ctrLanguage.trigger("change");
                    }
                    //设置当前用户时区
                    if (HoteamUI.Common.IsNullOrEmpty(LoginUserData.TimeZone) == false) {
                        HoteamUI.Security.LoginPara.TimeZone = LoginUserData.TimeZone;
                        HoteamUI.TimeZoneManager.SetTimeZone(LoginUserData.TimeZone);
                    }
                    else {
                        HoteamUI.Security.LoginPara.TimeZone = HoteamUI.TimeZoneManager.TimeZone;
                    }
                    //设置当前用户ID
                    if (HoteamUI.Common.IsNullOrEmpty(LoginUserData.UserID) == false) {
                        HoteamUI.Security.LoginPara.UserID = LoginUserData.UserID;
                    }
                    //设置企业ID
                    HoteamUI.Security.LoginPara.CompanyID = LoginUserData.CompanyID;
                    HoteamUI.Security.LoginPara.CompanyName = LoginUserData.CompanyName;
                    HoteamUI.Security.LoginPara.HostIP = PageInit.HostIP;
                    HoteamUI.Security.LoginPara.HostPort = PageInit.HostPort;

                    InforCenter_Platform_Login_BindGroupData();
                }
            }
        };

        //组织下拉框改变事件
        ctrGroup.change(function () {
            if (HoteamUI.Common.IsNullOrEmpty(ctrGroup.val()) == false) {
                HoteamUI.Security.LoginPara.UserGroup = ctrGroup.attr("val");
            }
        });
        //语言下拉框改变事件
        ctrLanguage.change(function () {
            if (ctrLanguage.val()) {
                HoteamUI.Security.LoginPara.Lang = ctrLanguage.attr("val");
                InforCenter_Platform_Login_InitPageLanguage();
                InforCenter_Platform_Login_BindData();
            }
        });
        //页面响应回车执行登录事件
        $(".re-login-content").keypress(function (event) {
            switch (event.keyCode) {
                case 13:
                    var ctrLogin = $("#lblLogin");
                    if (HoteamUI.Common.IsNullOrEmpty(ctrLogin) == false) {
                        GetLoginUser();
                        ctrLogin.click();
                    }
                    break;
                default:
                    break;
            }
        });
    }
    else {
        var para = { pageMode: "OK", context: "Login", labelName: "PageInitFailed" };
        HoteamUI.UIManager.Popup("Confirm", para, null, {});
        return;
    }
}
//登录验证
InforCenter_Platform_Login_LoginCheck = function () {
    var ctrUserName = $("#txtUserName");
    var ctrPassword = $("#txtPassword");
    var ctrGroup = $("#ddlGroup");
    var ctrLanguage = $("#ddlLanguage");
    var ctrThemes = $("#ddlTheme");
    var ctrConnection = $("#ddlConnection");


    if (HoteamUI.Common.IsNullOrEmpty(LoginUserData.ErrorInfo) == false) {
        ctrUserName.parent().nextAll(".login-error").show().html(LoginUserData.ErrorInfo);
        return;
    }

    if (HoteamUI.Common.IsNullOrEmpty(ctrUserName) == false) {
        //用户名为空
        if (HoteamUI.Common.IsNullOrEmpty($.trim(ctrUserName.val())) == true) {
            ctrUserName.parent().nextAll(".login-error").show().html(HoteamUI.Language.Lang("Login", "UserNameIsEmpty"));
            return;
        }
        //用户名不存在
        else if (HoteamUI.Common.IsNullOrEmpty(LoginUserData.UserID) == true) {
            ctrUserName.parent().nextAll(".login-error").show().html(HoteamUI.Language.Lang("Login", "UserNameIsWrong"));
            return;
        }
    }
    if (HoteamUI.Common.IsNullOrEmpty(ctrPassword) == false && HoteamUI.Common.IsNullOrEmpty(ctrPassword.val()) == true) {
        //密码为空
        ctrPassword.parent().nextAll(".login-error").show().html(HoteamUI.Language.Lang("Login", "PasswordIsEmpty"));
        return;
    }
    if (HoteamUI.Common.IsNullOrEmpty(ctrGroup) == false && HoteamUI.Common.IsNullOrEmpty(ctrGroup.val()) == true) {
        var groupFocusCallback = function (data, ret) {
            ctrGroup.focus();
            return;
        }
        //组织为空
        var para = { pageMode: "OK", context: "Login", labelName: "GroupIsEmpty" };
        HoteamUI.UIManager.Popup("Confirm", para, groupFocusCallback, {});
        return;
    }
    if (HoteamUI.Common.IsNullOrEmpty(ctrLanguage) == false && HoteamUI.Common.IsNullOrEmpty(ctrLanguage.val()) == true) {
        var languageFocusCallback = function (data, ret) {
            ctrLanguage.focus();
            return;
        }
        //语言为空
        var para = { pageMode: "OK", context: "Login", labelName: "LanguageIsEmpty" };
        HoteamUI.UIManager.Popup("Confirm", para, languageFocusCallback, {});
        return;
    }
    if (HoteamUI.Common.IsNullOrEmpty(ctrThemes) == false && HoteamUI.Common.IsNullOrEmpty(ctrThemes.val()) == true) {
        var themeFocusCallback = function (data, ret) {
            ctrThemes.focus();
            return;
        }
        //主题为空
        var para = { pageMode: "OK", context: "Login", labelName: "ThemeIsEmpty" };
        HoteamUI.UIManager.Popup("Confirm", para, themeFocusCallback, {});
        return;
    }
    if (HoteamUI.Common.IsNullOrEmpty(ctrConnection) == false && HoteamUI.Common.IsNullOrEmpty(ctrConnection.val()) == true) {
        var connectFocusCallback = function (data, ret) {
            ctrConnection.focus();
            return;
        }
        //连接为空
        var para = { pageMode: "OK", context: "Login", labelName: "ConnectIsEmpty" };
        HoteamUI.UIManager.Popup("Confirm", para, connectFocusCallback, {});
        return;
    }
    var homePageMode = "";
    if (HoteamUI.Common.IsNullOrEmpty(LoginUserData.HomePageMode) == false) {
        homePageMode = LoginUserData.HomePageMode;
    }
    var userName = "";
    if (HoteamUI.Common.IsNullOrEmpty(LoginUserData.UserName) == false) {
        userName = LoginUserData.UserName;
    }
    var userPassword = InforCenter_Platform_Login_GetUserPassword();
    var autoLoginOjb = $("#autoLogin");
    var autoLogin = false;
    if (HoteamUI.Common.IsNullOrEmpty(autoLoginOjb) == false
                && HoteamUI.Common.IsNullOrEmpty(autoLoginOjb.attr("checked")) == false) {
        autoLogin = true;
    }
    var UserLoginData = { para: {
        UserCode: $.trim(ctrUserName.val()),
        UserName: userName,
        Password: userPassword,
        HomePageMode: homePageMode,
        Theme: ctrThemes.attr("val"),
        UserGroupName: ctrGroup.val(),
        AutoLogin: autoLogin,
        LoginDeviceType: "PC"
        //TODO:扩展列表信息
    }
    };
    HoteamUI.Security.Login(UserLoginData);
    //显示消息提醒
    //InforCenter_Platform_Login_ShowInstantMessage();
    $("#ddlLanguageul,#ddlThemeul,#ddlConnectionul,#ddlGroupul").remove();
}
//密码错误
InforCenter_Platform_Login_PasswordError = function () {
    var para = { pageMode: 'OK', context: 'Login', labelName: 'PasswordIsWrong' };
    $("#txtPassword").parent().nextAll(".login-error").show().html(HoteamUI.Language.Lang("Login", "PasswordIsWrong"));
}
//页面底部版权信息初始化
InforCenter_Platform_Login_PageBottomInit = function (ctrlEvent) {
    $("#lblCopyRight").html(HoteamUI.Language.Lang("Common.Copyright"));
}
InforCenter_Platform_Login_GetQueryString = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
};
InforCenter_Platform_Login_CheckAutoLoginData = function (para) {
    var temp = HoteamUI.DataService.Call("Hoteam.Registered.RegisteredDataService.CheckAutoLoginUser", { para: para });
    if (HoteamUI.Common.IsNullOrEmpty(temp) == false
        && HoteamUI.Common.IsNullOrEmpty(temp.Groups) == false
        && temp.Groups.length > 0) {
        if (temp.ErrorInfo) {
            return false;
        }
        var hasGroup = false;
        for (var i = 0; i < temp.Groups.length; i++) {
            if (temp.Groups[i].GroupID == para.UserGroup) {
                hasGroup = true;
                break;
            }
        }
        if (hasGroup == false) {
            return false;
        }
    } else {
        return false;
    }
}

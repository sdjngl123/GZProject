InforCenter_Platform_Login_BindEvent = function () {
    var ctrUserName = $("#txtUserName");
    var ctrPassword = $("#txtPassword");
    var ctrLanguage = $("#ddlLanguage");
    var ctrThemes = $("#ddlTheme");
    var ctrGroup = $("#ddlGroup");
    var ctrConnection = $("#ddlConnection");
    var ctrlLoginType = $("#ddlLoginType");
    //给自动登录选框图片增加点击事件
    $("#autoLogin").on("click", function () {
        if ($(this).hasClass("b-white-checkbox")) {
            $(this).removeClass("b-white-checkbox");
            $(this).addClass("b-white-checkbox-sel");
            $(this).attr("checked", "checked");
        } else {
            $(this).removeClass("b-white-checkbox-sel");
            $(this).addClass("b-white-checkbox");
            $(this).removeAttr("checked");
        }
    });
    $("#autoLoginname").on("click", function () {
        $("#autoLogin").click();
    });
    //高级设置点击事件
    $("#advancedsetting").on("click", function () {
        var ele = $(".login-advanced-setting-c");
        if (ele.css("display") == "none") {
            ele.show();
            $(".login-advanced-setting-img").addClass("b-white-circle-up").removeClass("b-white-circle-down");
        } else {
            ele.hide();
            $(".login-advanced-setting-img").addClass("b-white-circle-down").removeClass("b-white-circle-up");
        }
    });
    $(".login-advanced-setting-img").click(function () {
        $("#advancedsetting").click();
    });
    if (HoteamUI.Common.IsNullOrEmpty(ctrUserName) == false && ctrUserName.length > 0
        && HoteamUI.Common.IsNullOrEmpty(ctrPassword) == false && ctrPassword.length > 0
        && HoteamUI.Common.IsNullOrEmpty(ctrGroup) == false && ctrGroup.length > 0
        && HoteamUI.Common.IsNullOrEmpty(ctrLanguage) == false && ctrLanguage.length > 0
        && HoteamUI.Common.IsNullOrEmpty(ctrThemes) == false && ctrThemes.length > 0
        && HoteamUI.Common.IsNullOrEmpty(ctrConnection) == false && ctrConnection.length > 0
        && HoteamUI.Common.IsNullOrEmpty(ctrlLoginType) == false && ctrlLoginType.length > 0) {
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
        ctrThemes.on("click", function () {
            var themeul = $("#ddlThemeul");
            if (themeul.css("display") == "none") {
                var position = $(this).offset();
                themeul.css("left", position.left).css("top", parseFloat(position.top) + 30).show();
            } else {
                themeul.hide();
            }
        }).on("blur", function () {
            $("#ddlThemeul").hide();
        });
        ctrConnection.on("click", function () {
            var connectionul = $("#ddlConnectionul");
            if (connectionul.css("display") == "none") {
                var position = $(this).offset();
                connectionul.css("left", position.left).css("top", parseFloat(position.top) + 30).show();
            } else {
                connectionul.hide();
            }
        }).on("blur", function () {
            $("#ddlConnectionul").hide();
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
            $(this).next().hide();
            $(this).addClass("login-input-focus");
            $(this).nextAll(".login-center-item-img").addClass("login-center-item-img-focus");
        });
        //用户名失去焦点事件
        ctrUserName.blur(function () {
            var userCode = $.trim(ctrUserName.val());
            $(this).removeClass("login-input-focus");
            $(this).nextAll(".login-center-item-img").removeClass("login-center-item-img-focus");
            if (HoteamUI.Common.IsNullOrEmpty(userCode) == false) {
                HoteamUI.Security.LoginPara.UserCode = userCode;
                HoteamUI.Security.LoginPara.UserGroup = "";
                ctrPassword.val("").next().show();
                GetLoginUser();
            }
            else {
                ctrGroup.empty2();
                $(this).next().show();
            }
        });
        ctrPassword.on("blur", function () {
            $(this).removeClass("login-input-focus");
            $(this).nextAll(".login-center-item-img").removeClass("login-center-item-img-focus");
            if (!$(this).val()) {
                $(this).next().show();
            }
        });
        ctrPassword.on("focus", function () {
            $(this).addClass("login-input-focus");
            $(this).nextAll(".login-center-item-img").addClass("login-center-item-img-focus");
            $(this).next().hide();
        });

        $("#lblUserName").on("click", function () {
            $(this).hide();
            ctrUserName.focus();
        });
        $("#lblPassword").on("click", function () {
            $(this).hide();
            ctrPassword.focus();
        });
        ctrlLoginType.on("click", function () {
            var languageul = $("#ddlLoginTypeul");
            if (languageul.css("display") == "none") {
                var position = $(this).offset();
                languageul.css("left", position.left).css("top", parseFloat(position.top) + 30).show();
            } else {
                languageul.hide();
            }
        }).on("blur", function () {
            $("#ddlLoginTypeul").hide();
        });


        var GetLoginUser = function () {
            var userCode = $.trim(ctrUserName.val());
            if (HoteamUI.Common.IsNullOrEmpty(userCode) == false) {
                ctrGroup.empty();
                LoginUserData = HoteamUI.DataService.Call("InforCenter.Organization.ThreeRoleAuthPlatformService.GetLoginUser", { para: { ExtendJsonInfo: JSON.stringify({ UserCode: userCode }) } });
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
                    //设置当前用户主题
                    if (HoteamUI.Common.IsNullOrEmpty(LoginUserData.Theme) == false) {
                        var beforeTheme = ctrThemes.attr('val');
                        var themes = ctrThemes.data("themes");
                        for (var i = 0; i < themes.length; i++) {
                            if (themes[i].Key == LoginUserData.Theme) {
                                ctrThemes.attr("val", themes[i].Key);
                                ctrThemes.val(themes[i].Value);
                            }
                        }

                        if (beforeTheme != LoginUserData.Theme) {
                            ctrThemes.trigger("change");
                        }
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
                        HoteamUI.Security.LoginPara.UserName = LoginUserData.UserName;
                    }
                    //设置企业ID
                    HoteamUI.Security.LoginPara.CompanyID = LoginUserData.CompanyID;
                    HoteamUI.Security.LoginPara.CompanyName = LoginUserData.CompanyName;
                    HoteamUI.Security.LoginPara.HostIP = PageInit.HostIP;
                    HoteamUI.Security.LoginPara.HostPort = PageInit.HostPort;
                    HoteamUI.Security.LoginPara.UserSecurityLevel = LoginUserData.UserSecurityLevel;
                    HoteamUI.Security.LoginPara.LoginIP = HoteamUI.CallAjax.Call(ThreeRolePlatform.WebServicePath, "GetUserClientIP", {});

                    InforCenter_Platform_Login_BindGroupData();
                    InforCenter_Platform_Login_BindThreeRoleData();
                    HoteamUI.Security.LoginPara.UserState = LoginUserData.UserState;
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
        //皮肤下拉框改变事件
        ctrThemes.change(function () {
            HoteamUI.ThemeManager.ThemeChange = true;
            if (HoteamUI.Common.IsNullOrEmpty(ctrThemes.val()) == false) {
                HoteamUI.ThemeManager.SetTheme(ctrThemes.attr("val"));
            }
        });
        //连接下拉框改变事件
        ctrConnection.change(function () {
            ctrUserName.val("");
            ctrGroup.empty2();
            ctrPassword.val("");
            ctrUserName.focus();
            if (HoteamUI.Common.IsNullOrEmpty(ctrConnection.val()) == false) {
                HoteamUI.Security.LoginPara.Connect = ctrConnection.val();
            }
        });

        loginTypecallback = function (data, ret) {
            //验证是否所有的都已经成功
        }

        ctrlLoginType.change(function () {
            var val = ctrlLoginType.attr("val");
            //获取页面
            if (val) {
                var page = HoteamUI.DataService.Call("InforCenter.ThreeRolePlatformManagement.ThreeRoleAuthPlatformService.GetLoginTypePageName", { para: { ExtendJsonInfo: JSON.stringify({ LoginType: val }) } });
                if (page) {
                    var loginPara = {};
                    loginPara.LoginPage = page;
                    loginPara.LoginType = val;
                    if (InforCenter_Platform_Login_ThreeLoginCheck()) {
                        //获取组，
                        loginPara.UserGroupName = ctrGroup.val();
                        loginPara.Theme = ctrThemes.attr("val");
                        loginPara.Lang = ctrLanguage.attr("val");
                        loginPara.Connect = ctrConnection.attr("val");
                        HoteamUI.UIManager.Popup("ThreeRoleLoginPage", loginPara, loginTypecallback, {});
                    }
                }
            }
        });

        //页面响应回车执行登录事件
        $(".Login_Layout").keypress(function (event) {
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


InforCenter_Platform_Login_ThreeLoginCheck = function () {
    var ctrUserName = $("#txtUserName");
    var ctrPassword = $("#txtPassword");
    var ctrGroup = $("#ddlGroup");
    var ctrLanguage = $("#ddlLanguage");
    var ctrThemes = $("#ddlTheme");
    var ctrConnection = $("#ddlConnection");
    //用户名为空
    if (HoteamUI.Common.IsNullOrEmpty($.trim(ctrUserName.val())) == true) {
        var para = { pageMode: "OK", context: "Login", labelName: "UserNameIsEmpty" };
        HoteamUI.UIManager.Popup("Confirm", para, nameFocusCallback, {});
        return false;
    }
    //用户名不存在
    else if (HoteamUI.Common.IsNullOrEmpty(LoginUserData) == true) {
        var para = { pageMode: "OK", context: "Login", labelName: "UserNameIsWrong" };
        HoteamUI.UIManager.Popup("Confirm", para, nameFocusCallback, {});
        return false;
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

    return true;
}

InforCenter_Platform_Login_BindThreeRoleData = function () {
    var ctrGroup = $("#ddlLoginType");
    var $ctrGroupul = $("#ddlLoginTypeul");
    var ctrGroupDefault = $("#lblLoginType");
    if (!HoteamUI.Common.IsNullOrEmpty(ctrGroup)
        && ctrGroup.length > 0
        && !HoteamUI.Common.IsNullOrEmpty(LoginUserData)
        && !HoteamUI.Common.IsNullOrEmpty(LoginUserData.ThreeRoleLoginType)
        && LoginUserData.ThreeRoleLoginType.length > 0) {
        var data = LoginUserData.ThreeRoleLoginType;
        ctrGroup.data("groups", data);
        if ($ctrGroupul.length > 0) {
            $ctrGroupul.empty();
        } else {
            $ctrGroupul = $('<ul id="ddlLoginTypeul" class="login-center-item-selul" pid="ddlLoginType"></ul>');
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
                if (i == 0) {
                    ctrGroup.attr("val", data[i].GroupID);
                    ctrGroup.val(groupText);
                    ctrGroupDefault.hide();
                }
            }
        }
        $ctrGroupul.appendTo($("body")).hide();
        //组织机构下拉添加点击事件
        $ctrGroupul.off("mousedown").on("mousedown", function (e) {
            var li = e.target;
            var pid = $(this).attr("pid");
            var input = $("#" + pid);
            input.attr("val", $(li).attr("val"));
            input.val($(li).text());
            input.trigger("change");
        });

    }
    else {
        ctrGroup.val('');
        ctrGroupDefault.show();
        if ($ctrGroupul.length > 0) {
            $ctrGroupul.remove();
        }
    }
}

InforCenter_Platform_Login_InitPageLanguage = function () {
    HoteamUI.Language.SetLanguage(HoteamUI.Security.LoginPara.Lang);
    InforCenter_Platform_Login_SetCtrLanguage("lblWelcome", "Welcome");
    InforCenter_Platform_Login_SetCtrLanguage("lblUserName", "UserName");
    InforCenter_Platform_Login_SetCtrLanguage("lblLanguage", "Language");
    InforCenter_Platform_Login_SetCtrLanguage("lblPassword", "Password");
    InforCenter_Platform_Login_SetCtrLanguage("lblThemes", "Themes");
    InforCenter_Platform_Login_SetCtrLanguage("lblGroup", "Group");
    InforCenter_Platform_Login_SetCtrLanguage("lblConnection", "Connection");
    InforCenter_Platform_Login_SetCtrLanguage("lblLogin", "LoginText");
    InforCenter_Platform_Login_SetCtrLanguage("lblQRCode", "QRCodeLogin");
    InforCenter_Platform_Login_SetCtrLanguage("lblScanQRCode", "ScanQRCode");
    InforCenter_Platform_Login_SetCtrLanguage("lblLoginType", "LoginType");

    if (HoteamUI.Common.IsNullOrEmpty($("#lblSystemName")[0]) == false) {
        $("#lblSystemName")[0].innerHTML = HoteamUI.Language.Lang("Common.SystemTitle");
    }
    if (HoteamUI.Common.IsNullOrEmpty($("#lblPluginDownLoad")[0]) == false) {
        $("#lblPluginDownLoad").children().html(HoteamUI.Language.Lang("Login.ShowPluginList"));
    }
    if (HoteamUI.Common.IsNullOrEmpty($("#autoLoginname")) == false) {
        var text = HoteamUI.Language.Lang("Login.AutoLogin");
        $("#autoLoginname").html(text);
    }
    if (HoteamUI.Common.IsNullOrEmpty($("#advancedsetting")) == false) {
        $("#advancedsetting").html(HoteamUI.Language.Lang("Login.AdvancedSetting"));
    }
    if (HoteamUI.Common.IsNullOrEmpty($("#lblLicenseInfo")) == false) {
        var licenseInfo = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, 'GetLicenseInfo', {});
        if (HoteamUI.Common.IsNullOrEmpty(licenseInfo) == false) {
            $("#lblLicenseInfo").text("*" + licenseInfo);
        }
    }
}

HoteamUI.Security.Login = function (arg) {
    var data = {};

    data.LoginType = "UserNameAndPassword";
    data.LoginGuid = HoteamUI.Security.LoginPara.ThreeRoleLoginGuid;
    data.Data = JSON.stringify({ UserCode: arg.para.UserCode, Password: arg.para.Password });
    var ret = HoteamUI.DataService.Call("InforCenter.ThreeRolePlatformManagement.ThreeRoleAuthPlatformService.ValidateLoginData", { para: { ExtendJsonInfo: JSON.stringify(data) } });
    if (ret) {
        ret = JSON.parse(ret);
    } else {
        InforCenter_Platform_Login_RemoveWaiting();
        return;
    }
    if (ret && ret.Success == true) {
        if (ret.NextValidateName) {
            HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("Login.ValidateSuccessNeedValidateNext").replace('[LoginType]', ret.NextValidateText));
            var loginTypecallback = function (data, ret) {

            }
            var loginPara = {};
            loginPara.LoginPage = ret.NextValidateLoginPageName;
            loginPara.LoginType = ret.NextValidateName;
            loginPara.LoginGuid = ret.LoginGuid;

            var ctrGroup = $("#ddlGroup");
            var ctrLanguage = $("#ddlLanguage");
            var ctrThemes = $("#ddlTheme");
            var ctrConnection = $("#ddlConnection");

            loginPara.UserGroupName = ctrGroup.val();
            loginPara.Theme = ctrThemes.attr("val");
            loginPara.Lang = ctrLanguage.attr("val");
            loginPara.Connect = ctrConnection.attr("val");


            HoteamUI.UIManager.Popup("ThreeRoleLoginPage", loginPara, loginTypecallback, {});
        } else {
            //验证成功
            //license验证和加入到在线用户列表

            HoteamUI.Trace.Write("debug", "HoteamUI.Security.Login!", arg);
            arg.para.LoginID = ret.AccessToken;
            $.cookie("autoLoginInfo", "");

            HoteamUI.Security.TryLogin(arg)
        }
    } else if (ret && ret.ErrorMessage) {
        HoteamUI.UIManager.MsgBox(ret.ErrorMessage);
        InforCenter_Platform_Login_RemoveWaiting();
        return;
    }
    
}

HoteamUI.Security.TryLogin = function (loginPara) {
    tmpLoginPara = loginPara;
    var callback = function (para, tmpLoginPara) {

        var successCallback = function (para, tmpLoginPara) {
            if (!para) {
                InforCenter_Platform_Login_RemoveWaiting();
                return;
            }
            var homePageMode = para.HomePageMode || "";
            var homePage = homePageMode;
            if (homePage == '' || homePage == 'DefaultHomePage') {
                homePage = HoteamUI.AppSets.DefaultHomePageMode;
            }
            HoteamUI.Security.LoginPara.LoginID = loginPara.para.LoginID;
            HoteamUI.Security.LoginPara.LoginIP = para.LoginIP;
            HoteamUI.Security.LoginPara.HomePageMode = homePage;
            HoteamUI.Security.LoginPara.LoginDeviceType = "PC";

            if (HoteamUI.Common.IsNullOrEmpty(tmpLoginPara) == false
                && HoteamUI.Common.IsNullOrEmpty(tmpLoginPara.para) == false) {
                tmpLoginPara.para.LoginID = loginPara.para.LoginID;
                tmpLoginPara.para.LoginDeviceType = "PC";
                var autoLoginInfoString = JSON.stringify(tmpLoginPara.para);
                if (para.AutoLogin == true) {
                    $.cookie("autoLoginInfo", autoLoginInfoString, { expires: 10 });
                }
                else {
                    $.cookie("autoLoginInfo", autoLoginInfoString);
                }
            }
            clearInterval(InforCenter_Platform_Login_IntervalID);
            var info = HoteamUI.DataService.Call("InforCenter.ThreeRolePlatformManagement.ThreeRoleAuthPlatformService.GetSystemSettingAndModelPermission", {});
            if (info) {
                info = JSON.parse(info);
                HoteamUI.SystemSettings = info.SystemSettings;
                PlatformUI.Permission = info.Permissions;
                HoteamUI.UIManager.Show('', homePage, '');
                var logpara = { RecordLog: { OperateType: 'Login', IP: HoteamUI.Security.LoginPara.LoginIP } };
                HoteamUI.DataService.AsyncCall({ serviceuri: 'InforCenter.Common.OperateLogService.RecordLog', paras: { para: logpara } });
            }
        }

        var modifyPassworCallBack = function (data, ret) {
            if (ret && ret.confirm == "OK") {
                successCallback(para, tmpLoginPara);
            } else {
                InforCenter_Platform_Login_RemoveWaiting();
            }
        }

        //验证通过后，判断是否需要更换密码
        var needChangePassword = HoteamUI.DataService.Call("InforCenter.ThreeRolePlatformManagement.ThreeRoleAuthPlatformService.NeedChangePassword", {});
        if (needChangePassword) {
            needChangePassword = JSON.parse(needChangePassword);
            if (needChangePassword.NeedChange == true) {
                HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("Login." + needChangePassword.ChangePaswordType));
                HoteamUI.UIManager.Popup("ModifyPassword", {}, modifyPassworCallBack);
            } else {
                successCallback(para, tmpLoginPara);
            }
        } else {
            successCallback(para, tmpLoginPara);
        }

    }
    var servicepath = {};
    servicepath.servicepath = ThreeRolePlatform.WebServicePath
    servicepath.errorCallback = InforCenter_Platform_Login_RemoveWaiting;
    servicepath.callback = callback;
    servicepath.paras = loginPara;
    servicepath.callcackpara = tmpLoginPara;
    servicepath.method = "TryLogin";
    HoteamUI.CallAjax.AsyncCall(servicepath);
}

HoteamUI.Security.AutoLogin = function () {
    //三员不允许自动登录
    return false;
}

ThreeRolePlatform = {};
ThreeRolePlatform.WebServicePath = "/ThreeRolePlatformManagement/ThreeRolePlatformManagement.asmx/";
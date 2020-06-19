/******************************************************************************
*    Copyright (c) 2012,山东山大华天软件有限公司
*    All rights reserved.
*
*    文件名称： Login.js
*
*    创 建 人： 李士利
*    创建日期： 2013-01-01
*    初始版本： 1.0
*
*    修 改 人： 李士利
*    修改日期： 2013-01-01
*    当前版本： 1.0
******************************************************************************/
var LoginInitData = null;
var LoginUserData = null;
var tmpLoginPara = null;

//初始化LoginInitData参数值
InforCenter_Platform_Login_SetLoginInitData = function () {
    LoginInitData = HoteamUI.DataService.Call("InforCenter.Organization.OrganizationDataService.GetLoginInfo", {
        para: { Lang: HoteamUI.Language.CurLanguage }
    });
}
//页面初始化
InforCenter_Platform_Login_PageInit = function (ctrlEvent) {
    LoginUserData = null;
    ctrlEvent.o.LoadTemplate("LoginContent");
    //处理数据库项和主题项是否显示
    if (AppSets.DisableTheme == "true") {
        $("#ddlTheme").parent().hide();
    }
    if (AppSets.DisableDataBase == "true") {
        $("#ddlConnection").parent().hide();
    }
    //为了防止chrome的自动记住密码功能，动态添加password
    if ("ActiveXObject" in window) {//如果是ie
        $("#lblPassword")
            .before('<input id="txtPassword" style="width:260px;" type="password" class="re-login-input" tabIndex="2"/>');
    } else {
        $("#lblPassword")
            .before('<input id="txtPassword" style="width:260px;" type="text" onfocus="this.type=\'password\'" class="re-login-input" tabIndex="2"></input>');
    }
    InforCenter_Platform_Login_SetLoginInitData();
 
    if (HoteamUI.Common.IsNullOrEmpty(LoginInitData) == false) {
        HoteamUI.Security.LoginPara.Lang = HoteamUI.Language.CurLanguage;
        InforCenter_Platform_Login_InitPageLanguage();
        InforCenter_Platform_Login_BindData();
        InforCenter_Platform_Login_BindEvent();
        $('#txtUserName').focus();
    }
    var containers = $(".hoteam-login-center-right-c");
    $(".hoteam-login-badge-qrcode").on("click", function () {
        InforCenter_Platform_Login_InitQRCode();
        $(this).hide();
        $(this).next().show();
        $(containers[0]).hide();
        $(containers[1]).show();
    });
    $(".hoteam-login-badge-pc").on("click", function () {
        clearInterval(InforCenter_Platform_Login_IntervalID);
        $(this).hide();
        $(this).prev().show();
        $(containers[0]).show();
        $(containers[1]).hide();
    });
}
//初始化页面语言信息
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
//绑定下拉框数据
InforCenter_Platform_Login_BindData = function () {
    InforCenter_Platform_Login_SetLoginInitData();

    if (HoteamUI.Common.IsNullOrEmpty(LoginInitData) == false) {
        var languages = HoteamUI.Language.GetLanguageList();
        var themes = LoginInitData.ThemeDic;
        var connections = LoginInitData.DataBaseList;
        var ctrLanguage = $("#ddlLanguage").data("languages", languages);
        var ctrThemes = $("#ddlTheme").data("themes", themes);
        var ctrConnection = $("#ddlConnection").data("connections", connections);
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
        //主题数据绑定
        if (HoteamUI.Common.IsNullOrEmpty(ctrThemes) == false && ctrThemes.length > 0) {
            var $themeSel = $("#ddlThemeul");
            if ($themeSel.length > 0) {
                $themeSel.empty();
            } else {
                var themeSel = '<ul id="ddlThemeul" class="login-center-item-selul" pid="ddlTheme"></ul>';
                var $themeSel = $(themeSel);
            }
            var themeValue = '', themeText = '';
            for (var i = 0; i < themes.length; i++) {
                if (!HoteamUI.Common.IsNullOrEmpty(themes[i])
                    && !HoteamUI.Common.IsNullOrEmpty(themes[i].Key)
                    && !HoteamUI.Common.IsNullOrEmpty(themes[i].Value)) {
                    var $li = $("<li>");
                    $li.attr("val", themes[i].Key);
                    $li.html(themes[i].Value);
                    $themeSel.append($li);
                    if (HoteamUI.ThemeManager.Theme) {
                        if (HoteamUI.ThemeManager.Theme == themes[i].Key) {
                            themeValue = themes[i].Key;
                            themeText = themes[i].Value;
                        }
                    } else if (i == 0) {
                        ctrThemes.attr("val", themes[i].Key);
                        ctrThemes.val(themes[i].Value);
                    }
                }
            }
            $themeSel.appendTo($("body")).hide();
            if (themes.length > 0) {
                $("#lblThemes").hide();
            }
            if (HoteamUI.Common.IsNullOrEmpty(HoteamUI.ThemeManager.Theme) == false) {
                ctrThemes.attr("val", themeValue);
                ctrThemes.val(themeText);
            }
            else {
                HoteamUI.ThemeManager.Theme = ctrThemes.val();
            }
        }
        //连接数据绑定
        if (HoteamUI.Common.IsNullOrEmpty(ctrConnection) == false && ctrConnection.length > 0 && connections) {
            var $connectionSel = $("#ddlConnectionul");
            if ($connectionSel.length > 0) {
                $connectionSel.empty();
            } else {
                var connectionSel = '<ul id="ddlConnectionul" class="login-center-item-selul" pid="ddlConnection"></ul>';
                var $connectionSel = $(connectionSel);
            }
            for (var i = 0; i < connections.length; i++) {
                if (connections && !HoteamUI.Common.IsNullOrEmpty(connections[i])) {
                    var $li = $("<li>");
                    $li.attr("val", connections[i]);
                    $li.html(connections[i]);
                    $connectionSel.append($li);
                    if (!HoteamUI.Security.LoginPara.Connect && i == 0) {
                        ctrConnection.attr("val", connections[i]);
                        ctrConnection.val(connections[i]);
                    }
                }
            }
            $connectionSel.appendTo($("body")).hide();
            if (connections.length > 0) {
                $("#lblConnection").hide();
            }
            if (HoteamUI.Common.IsNullOrEmpty(HoteamUI.Security.LoginPara.Connect) == false) {
                ctrConnection.attr("val", HoteamUI.Security.LoginPara.Connect);
                ctrConnection.val(HoteamUI.Security.LoginPara.Connect);
            }
            else {
                HoteamUI.Security.LoginPara.Connect = ctrConnection.val();
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
    var $ctrGroupul = $("#ddlGroupul");
    var ctrGroupDefault = $("#lblGroup");
    if (!HoteamUI.Common.IsNullOrEmpty(ctrGroup)
        && ctrGroup.length > 0
        && !HoteamUI.Common.IsNullOrEmpty(LoginUserData)
        && !HoteamUI.Common.IsNullOrEmpty(LoginUserData.Groups)
        && LoginUserData.Groups.length > 0) {
        var data = LoginUserData.Groups;
        ctrGroup.data("groups", data);
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
                    ctrGroupDefault.hide();
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
    else {
        ctrGroup.val('');
        ctrGroupDefault.show();
        if ($ctrGroupul.length > 0) {
            $ctrGroupul.remove();
        }
    }
}

HoteamUI.ThemeManager.ThemeChange = false;
//绑定事件
InforCenter_Platform_Login_BindEvent = function () {
    var ctrUserName = $("#txtUserName");
    var ctrPassword = $("#txtPassword");
    var ctrLanguage = $("#ddlLanguage");
    var ctrThemes = $("#ddlTheme");
    var ctrGroup = $("#ddlGroup");
    var ctrConnection = $("#ddlConnection");
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
        && HoteamUI.Common.IsNullOrEmpty(ctrConnection) == false && ctrConnection.length > 0) {
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
        var GetLoginUser = function () {
            var userCode = $.trim(ctrUserName.val());
            if (HoteamUI.Common.IsNullOrEmpty(userCode) == false) {
                ctrGroup.empty();
                LoginUserData = HoteamUI.DataService.Call("InforCenter.Organization.OrganizationDataService.GetLoginUser", { para: { UserCode: userCode } });
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
                    HoteamUI.Security.LoginPara.LoginIP = PageInit.LoginIP;
                    HoteamUI.Security.LoginPara.UserSecurityLevel = LoginUserData.UserSecurityLevel;

                    InforCenter_Platform_Login_BindGroupData();
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
//设置页面控件多语言
InforCenter_Platform_Login_SetCtrLanguage = function (ctrID, ctrNameLabel) {
    var control = $("#" + ctrID);
    if (HoteamUI.Common.IsNullOrEmpty(control) == false && control.length > 0) {
        var obj = control[0];
        var text = HoteamUI.Language.Lang("Login", ctrNameLabel);
        if (HoteamUI.Common.IsNullOrEmpty(text) == false) {
            obj.innerHTML = text;
        }
    }
}
//登录验证
InforCenter_Platform_Login_LoginCheck = function () {
    InforCenter_Platform_Login_Waiting();
    var ctrUserName = $("#txtUserName");
    var ctrPassword = $("#txtPassword");
    var ctrGroup = $("#ddlGroup");
    var ctrLanguage = $("#ddlLanguage");
    var ctrThemes = $("#ddlTheme");
    var ctrConnection = $("#ddlConnection");
    if (HoteamUI.Common.IsNullOrEmpty(ctrUserName) == false) {
        var nameFocusCallback = function (data, ret) {
            InforCenter_Platform_Login_RemoveWaiting();
            ctrUserName.focus();
            return;
        }
        //用户名为空
        if (HoteamUI.Common.IsNullOrEmpty($.trim(ctrUserName.val())) == true) {
            var para = { pageMode: "OK", context: "Login", labelName: "UserNameIsEmpty" };
            HoteamUI.UIManager.Popup("Confirm", para, nameFocusCallback, {});
            return;
        }
            //用户名不存在
        else if (HoteamUI.Common.IsNullOrEmpty(LoginUserData) == true) {
            var para = { pageMode: "OK", context: "Login", labelName: "UserNameIsWrong" };
            HoteamUI.UIManager.Popup("Confirm", para, nameFocusCallback, {});
            return;
        }
    }
    if (HoteamUI.Security.LoginPara.UserState == "Dimission") {
        var userStateCallback = function (data, ret) {
            InforCenter_Platform_Login_RemoveWaiting();
            return;
        }
        //组织为空
        var para = { pageMode: "OK", context: "OrganizationCommon", labelName: "DimissionUsreNotLogin" };
        HoteamUI.UIManager.Popup("Confirm", para, userStateCallback, {});
        return;
    }
    if (HoteamUI.Common.IsNullOrEmpty(ctrPassword) == false && HoteamUI.Common.IsNullOrEmpty($.trim(ctrPassword.val())) == true) {
        var passwordFocusCallback = function (data, ret) {
            InforCenter_Platform_Login_RemoveWaiting();
            ctrPassword.focus();
            return;
        }
        //密码为空
        var para = { pageMode: "OK", context: "Login", labelName: "PasswordIsEmpty" };
        HoteamUI.UIManager.Popup("Confirm", para, passwordFocusCallback, {});
        return;
    }
    if (HoteamUI.Common.IsNullOrEmpty(ctrGroup) == false && HoteamUI.Common.IsNullOrEmpty(ctrGroup.val()) == true) {
        var groupFocusCallback = function (data, ret) {
            InforCenter_Platform_Login_RemoveWaiting();
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
            InforCenter_Platform_Login_RemoveWaiting();
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
            InforCenter_Platform_Login_RemoveWaiting();
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
            InforCenter_Platform_Login_RemoveWaiting();
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

    var companyID = "";
    companyName = ""
    if (HoteamUI.Common.IsNullOrEmpty(LoginUserData.CompanyID) == false) {
        companyID = LoginUserData.CompanyID;
        companyName = LoginUserData.CompanyName;
    }
    var userPassword = InforCenter_Platform_Login_GetUserPassword();
    var autoLoginOjb = $("#autoLogin");
    var autoLogin = false;
    if (HoteamUI.Common.IsNullOrEmpty(autoLoginOjb) == false
        && autoLoginOjb.attr("checked")) {
        autoLogin = true;
    }
    var UserLoginData = {
        para: {
            UserCode: $.trim(ctrUserName.val()),
            UserName: userName,
            Password: userPassword,
            HomePageMode: homePageMode,
            Theme: ctrThemes.attr("val"),
            UserGroupName: ctrGroup.val(),
            CompanyID: companyID,
            CompanyName: companyName,
            AutoLogin: autoLogin,
            LoginDeviceType: "PC"
            //TODO:扩展列表信息
        }
    };
    var result = HoteamUI.Security.Login(UserLoginData);
    //解决IE9切换主题登陆css加载不完全，图片颜色错误问题
    if (result && HoteamUI.Browser.isIE && HoteamUI.Browser.version == "9.0" && (UserLoginData.para.Theme != HoteamUI.AppSets.DefaultTheme || HoteamUI.ThemeManager.ThemeChange)) {
        window.location.reload();
    }
    else {
        //显示消息提醒
        InforCenter_Platform_Login_ShowInstantMessage();
    }

    $("#ddlLanguageul,#ddlThemeul,#ddlConnectionul,#ddlGroupul").remove();
}

//获取加密密码
InforCenter_Platform_Login_GetUserPassword = function () {
    var ctrUserName = $("#txtUserName");
    var ctrPassword = $("#txtPassword");
    if (HoteamUI.Common.IsNullOrEmpty(ctrUserName) == false
        && HoteamUI.Common.IsNullOrEmpty(ctrPassword) == false) {
        var pwd = EncryptDecrypt.Encrypt(ctrPassword.val(), HoteamUI.Security.LoginPara.UserID);
        return pwd;
    }
}
//密码错误
InforCenter_Platform_Login_PasswordError = function () {
    var passwordFocusCallback = function (data, ret) {
        $('#txtPassword').focus();
        return;
    }
    var para = { pageMode: 'OK', context: 'Login', labelName: 'PasswordIsWrong' };
    HoteamUI.UIManager.Popup('Confirm', para, passwordFocusCallback, {});
}
//重复登录
InforCenter_Platform_Login_MultiLogin = function () {
    //不允许重复登录
    var reLoginCallBack = function (data, ret) {
        if (HoteamUI.Common.IsNullOrEmpty(ret) == false
            && HoteamUI.Common.IsNullOrEmpty(ret.confirm) == false
            && ret.confirm == 'Yes'
            && HoteamUI.Common.IsNullOrEmpty(tmpLoginPara) == false) {
            HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, 'RemoveUserOtherLoginIP', { para: { LoginDeviceType: "PC" } });
            HoteamUI.Security.Login(tmpLoginPara);
        }
        else {
            return;
        }
    }
    var msgLabel = "UserHasLogin";
    var confirmPara = { pageMode: 'YesNo', context: 'Login', labelName: msgLabel };
    HoteamUI.UIManager.Popup('Confirm', confirmPara, reLoginCallBack, {});
}

InforCenter_Platform_Login_AutoLoginMultiLogin = function () {
    //不允许重复登录
    var reLoginCallBack = function (data, ret) {
        if (HoteamUI.Common.IsNullOrEmpty(ret) == false
            && HoteamUI.Common.IsNullOrEmpty(ret.confirm) == false
            && ret.confirm == 'Yes'
            && HoteamUI.Common.IsNullOrEmpty(tmpLoginPara) == false) {
            HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, 'RemoveUserOtherLoginIP', { para: { LoginDeviceType: "PC" } });
            HoteamUI.Security.AutoLogin();
        }
        else {
            HoteamUI.UIManager.Show("", "Login", "");
            return;
        }
    }
    var msgLabel = "UserHasLogin_AutoLogin";
    var confirmPara = { pageMode: 'YesNo', context: 'Login', labelName: msgLabel };
    HoteamUI.UIManager.Popup('Confirm', confirmPara, reLoginCallBack, {});
}
//自动登录
HoteamUI.Security.AutoLogin = function () {
    HoteamUI.Trace.Write("debug", "HoteamUI.Security.AutoLogin!");
    var autoLoginInfo = $.cookie("autoLoginInfo");
    if (HoteamUI.Common.IsNullOrEmpty(autoLoginInfo) == false) {
        var userInfo = JSON.parse(autoLoginInfo);
        if (HoteamUI.Common.IsNullOrEmpty(userInfo) == false) {
            HoteamUI.Security.LoginPara = userInfo;
            if (InforCenter_Platform_Login_CheckAutoLoginData(userInfo) == false) {
                var autoLoginCallBack = function (data, ret) {
                    return false;
                }
                $.cookie("autoLoginInfo", "");
                HoteamUI.UIManager.Show("", "Login", "");
                var confirmPara = { pageMode: 'OK', context: 'Login', labelName: "AutoLoginInfoError" };
                HoteamUI.UIManager.Popup('Confirm', confirmPara, autoLoginCallBack, {});
                return false;
            }

            userInfo.AutoLogin = true;
            var paras = { para: userInfo };
            tmpLoginPara = paras;
            HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "AutoLogin", paras);
            //解决IE9不显示消息提醒的问题
            //if (HoteamUI.Browser.isIE && HoteamUI.Browser.version == "9.0") {
            InforCenter_Platform_Login_ShowInstantMessage();
            //}

            return true;
        }
    }
    return false;
}

InforCenter_Platform_Login_CheckAutoLoginData = function (para) {
    var temp = HoteamUI.DataService.Call("InforCenter.Organization.OrganizationDataService.CheckAutoLoginUser", { para: para });
    if (HoteamUI.Common.IsNullOrEmpty(temp) == false
        && HoteamUI.Common.IsNullOrEmpty(temp.Groups) == false
        && temp.Groups.length > 0) {
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
//登录
HoteamUI.Security.Login = function (arg) {
    if (HoteamUI.Common.IsNullOrEmpty(arg) == false) {
        tmpLoginPara = arg;
        HoteamUI.Trace.Write("debug", "HoteamUI.Security.Login!", arg);
        $.cookie("autoLoginInfo", "");

        //var para = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "TryLogin", arg);
        var callback = function (para, tmpLoginPara) {
            if (!para) {
                InforCenter_Platform_Login_RemoveWaiting();
                return;
            }
            var homePageMode = para.HomePageMode || "";
            var homePage = homePageMode;
            if (homePage == '' || homePage == 'DefaultHomePage') {
                homePage = HoteamUI.AppSets.DefaultHomePageMode;
            }
            HoteamUI.Security.LoginPara.LoginID = para.LoginID;
            HoteamUI.Security.LoginPara.LoginIP = para.LoginIP;
            HoteamUI.Security.LoginPara.HomePageMode = homePage;
            HoteamUI.Security.LoginPara.LoginDeviceType = "PC";

            if (HoteamUI.Common.IsNullOrEmpty(tmpLoginPara) == false
                && HoteamUI.Common.IsNullOrEmpty(tmpLoginPara.para) == false) {
                tmpLoginPara.para.LoginID = para.LoginID;
                tmpLoginPara.para.LoginDeviceType = "PC";
                tmpLoginPara.para.HomePageMode = homePage;
                tmpLoginPara.para.LoginIP = para.LoginIP;
                var autoLoginInfoString = JSON.stringify(tmpLoginPara.para);
                if (para.AutoLogin == true) {
                    $.cookie("autoLoginInfo", autoLoginInfoString, { expires: 10 });
                }
                else {
                    $.cookie("autoLoginInfo", autoLoginInfoString);
                }
            }
            clearInterval(InforCenter_Platform_Login_IntervalID);
            HoteamUI.SystemSettings = JSON.parse(para.SystemSettings);
            PlatformUI.Permission = JSON.parse(para.Permissions);
            HoteamUI.UIManager.Show('', homePage, '');
            var logpara = { RecordLog: { OperateType: 'Login', IP: HoteamUI.Security.LoginPara.LoginIP } };
            HoteamUI.DataService.AsyncCall({ serviceuri: 'InforCenter.Common.OperateLogService.RecordLog', paras: { para: logpara } });

            InforCenter_Platform_Login_ShowInstantMessage();
        }
        var servicepath = {};
        servicepath.servicepath = PlatformUI.WebServicePath;
        servicepath.errorCallback = InforCenter_Platform_Login_RemoveWaiting;
        servicepath.callback = callback;
        servicepath.paras = arg;
        servicepath.callcackpara = tmpLoginPara;
        servicepath.method = "TryLogin";
        HoteamUI.CallAjax.AsyncCall(servicepath);
    }
    return true;
}

HoteamUI.Security.LogoutActive = function () {
    if (HoteamUI.Security.LoginPara.LoginID) {
        HoteamUI.Trace.Write("debug", "HoteamUI.Security.Logout!", {});
        var para = { RecordLog: { OperateType: "Logout", IP: HoteamUI.Security.LoginPara.LoginIP } }
        HoteamUI.DataService.Call("Hoteam.Common.OperateLogService.RecordLog", { para: para });
        HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "RemoveOnlineUserByLoginID", {});
    }
}
//退出登陆
HoteamUI.Security.Logout = function () {
    HoteamUI.Security.LogoutActive();
    $.cookie("autoLoginInfo", "");
    //开始：问题42
    var href = window.location.href;
    if (typeof href === "string") {
        href = href.replace(window.location.hash, "");
    }
    window.location.href = href;
    //结束

}
//登录异常信息提示窗口，覆盖实现
HoteamUI.UIManager.LoginStateExceptionMsgBox = function (msg) {
    if (HoteamUI.Common.IsNullOrEmpty(msg) == false) {
        var LoginStateExceptionCallback = function (data, ret) {
            if (HoteamUI.Common.IsNullOrEmpty(ret) == false && HoteamUI.Common.IsNullOrEmpty(ret.confirm) == false && ret.confirm == 'OK') {
                //HoteamUI.Security.Logout();
                $.cookie("autoLoginInfo", "");
                location.reload();
            }
        }
        var para = { pageMode: 'OkCancel', message: msg };
        HoteamUI.UIManager.Popup('Confirm', para, LoginStateExceptionCallback, {});
    }
}

InforCenter_Platform_Login_EnEight = function (str) {
    var monyer = new Array();
    var i, s;
    for (i = 0; i < str.length; i++) {
        monyer += "\\" + str.charCodeAt(i).toString(8);
    }
    return monyer;
}

InforCenter_Platform_Login_DeEight = function (str) {
    var monyer = new Array();
    var i;
    var s = str.split("\\");
    for (i = 1; i < str.length; i++) {
        monyer += String.fromCharCode(parseInt(s[i], 8));
    }
    return monyer;
}

InforCenter_Platform_Login_ShowInstantMessage = function () {
    InforCenter_Platform_ShowInstantMessage();
}

InforCenter_Platform_Login_ShowPluginDownLoadList = function () {
    HoteamUI.UIManager.Popup({ pagename: "PluginDownLoad", modal: true, size: "600*400" });
}
InforCenter_Platform_Login_ShowPlugDownLoadList = function (ctrlEvent) {
    var html = '';
    //for (var i in ActiveXScript) {
    for (var i = 0; i < ActiveXScript.length; i++) {
        var item = ActiveXScript[i];
        if (item.ShowInList) {
            var dicName = HoteamUI.Language.Lang("ActiveXs." + item.Name + "Header");
            var dicDes = HoteamUI.Language.Lang("ActiveXs." + item.Name + "Caption");
            var url = item.Url.replace("~", PageInit.WebRootPath);
            var lastliStyle = "";
            html +=
                "   <li class='title'> <a href='" + url + "' target='_blank' >" + dicName + "</a></li>" +
                "   <li class='description' " + lastliStyle + ">" + dicDes + "</li>"
            ;
        }
    }
    var page = $("#DownLoadAPluginList");
    page.append(html);
    page.find("li:last").css("border-bottom", "none");
}
InforCenter_Platform_Login_ClosePluginDownLoad = function (ctrlEvent) {
    location.href = location.href;
}
//页面底部版权信息初始化
InforCenter_Platform_Login_PageBottomInit = function (ctrlEvent) {
    $("#lblCopyRight").html(HoteamUI.Language.Lang("Common.Copyright"));
    $("#lblAddressAndPhone").html(HoteamUI.Language.Lang("Common.AddressAndPhone"));
}
InforCenter_Platform_Login_IdentificationID = "";
InforCenter_Platform_Login_IntervalID = 0;
InforCenter_Platform_Login_InitQRCode = function () {
    var para = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GetLoginQRCode", {});
    if (para) {
        var result = para.split(';');
        var srcStr = "data:image/png;base64," + result[0];
        InforCenter_Platform_Login_IdentificationID = result[1];
        $("#loginQRCode").attr("src", srcStr);
        InforCenter_Platform_Login_IntervalID = setInterval(function () {
            var para = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "CheckUserLoginState", { para: { IdentificationID: InforCenter_Platform_Login_IdentificationID } });
            para = JSON.parse(para);
            if (para.userInfo) {
                var userInfo = JSON.parse(para.userInfo);
                if (userInfo.UserID) {
                    clearInterval(InforCenter_Platform_Login_IntervalID);
                    $.cookie("autoLoginInfo", para.userInfo);
                    HoteamUI.Security.AutoLogin();
                }
            }
            else if (para.expire == "True") {
                clearInterval(InforCenter_Platform_Login_IntervalID);
                InforCenter_Platform_Login_InitQRCode();
            }
        }, 2000);
    }
}

InforCenter_Platform_Login_Waiting = function () {
    InforCenter_Platform_Login_SetCtrLanguage("lblLogin", "LoginWaitingText");
    $("#lblLogin").addClass("login-center-loginBtn-wait");
}

InforCenter_Platform_Login_RemoveWaiting = function () {
    InforCenter_Platform_Login_SetCtrLanguage("lblLogin", "LoginText");
    $("#lblLogin").removeClass("login-center-loginBtn-wait");
}
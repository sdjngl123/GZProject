var UserGroups;
var UserID;
var UserName;

Hoteam_Mobile_MobileLogin_Init = function (pageEvent) {

    $("#mobilePage,.rightdiv.pad").addClass("full");
    $("[data-role='header'], [data-role='footer']").toolbar();
    $("body>[data-role='panel']").panel();
    $("[data-role='listview']").listview();
    $("[data-role='collapsible']").collapsible();
    $("[data-role='controlgroup']").controlgroup();
    $('input[type="checkbox"]').checkboxradio();
    $("[data-role='popup']").enhanceWithin().popup();

    HMUI.MobileCommon.SetHeaderText(HMUI.Language.Lang("MobileLogin", "Title"));
    var pagePara = pageEvent.o.GetPara();
    //读取配置信息
    Hoteam_Mobile_MobileLogin_LoadAppSetting(pagePara.Action);

};

Hoteam_Mobile_MobileLogin_OnLogin = function () {

    var username = $("#username").val();
    var password = $("#userpassword").val();

    if (HMUI.Common.IsNullOrEmpty(username)) {
        $('#usernametip').html("请输入用户名!");
        return;
    }
    if (HMUI.Common.IsNullOrEmpty(password)) {
        $('#userpasswordtip').html("请输入密码!");
        return;
    }
    $('#usernametip').html("");
    $('#userpasswordtip').html("");

    //再次验证用户是否可用（在输入用户名后，点击登录之前，用户状态改变进行验证）
    if (!Hoteam_Mobile_MobileLogin_OnBlurUserName($("#username")[0])) {
        return;
    }

    //设置登录参数
    HMUI.Security.LoginPara.UserID = UserID;
    HMUI.Security.LoginPara.UserGroup = $("#changeOrangize").val();
    HMUI.Security.LoginPara.GroupName = $("#changeOrangize").find("option:selected").text();
    HMUI.Security.LoginPara.RoleID = $("#changeRole").val();
    HMUI.Security.LoginPara.RoleName = $("#changeRole").find("option:selected").text();
    //支持点数控制
    HMUI.Security.LoginPara.LoginDeviceType = 'MOBILE';
    HMUI.Security.LoginPara.LoginMac = HMUI.MobileCommon.getMacAddress();

    $('#userpasswordtip').html("");

    HMUI.MobileCommon.SetAppSetting("MessageCheckPara", JSON.stringify(HMUI.Security.LoginPara));
    HMUI.MobileCommon.SetAppSetting("MobileLoginUserID", UserID);
    HMUI.MobileCommon.SetAppSetting("MobileLoginUserName", username);
    HMUI.MobileCommon.SetAppSetting("MobileLoginUserDisplayName", UserDisplayName);
    HMUI.MobileCommon.SetAppSetting("MobileLoginUserPassword", EncryptDecrypt.Encrypt(password, UserID));
    HMUI.MobileCommon.SetAppSetting("MobileLoginGroupID", $("#changeOrangize").val());
    HMUI.MobileCommon.SetAppSetting("MobileLoginGroupName", $("#changeOrangize").find("option:selected").text());
    HMUI.MobileCommon.SetAppSetting("MobileLoginRoleID", $("#changeRole").val());
    HMUI.MobileCommon.SetAppSetting("MobileLoginRoleName", $("#changeRole").find("option:selected").text());
    HMUI.MobileCommon.SetAppSetting("UserIsExit", "false")

    //设置每页最大行数
    var MaxRowCountSetting = HMUI.MobileCommon.GetAppSetting("MaxRowCount");
    if (HMUI.Common.IsNullOrEmpty(MaxRowCountSetting)) {

        HMUI.MobileCommon.SetAppSetting("MaxRowCount", HMUI.AppSets.MaxRowCount);
    }
    else {
        var MaxRowCount = parseInt(MaxRowCountSetting, 10);
        HMUI.AppSets.MaxRowCount = MaxRowCount;
    }

    //零组件默认展示视图
    var masterItemDefaultViewSetting = HMUI.MobileCommon.GetAppSetting("MasterItemDefaultView");
    if (HMUI.Common.IsNullOrEmpty(masterItemDefaultViewSetting)) {
        HMUI.MobileCommon.SetAppSetting("MasterItemDefaultView", HMUI.AppSets.MasterItemDefaultView);
    }
    else {
        HMUI.AppSets.MasterItemDefaultView = masterItemDefaultViewSetting;
    }

    HMUI.CallAjax.Call(HMUI.BaseServicePath, "TryLogin", { para: { Password: EncryptDecrypt.Encrypt(password, UserID), ID: UserID} });

    var navName = HMUI.MobileCommon.GetAppSetting("MessageType");
    if (HMUI.Common.IsNullOrEmpty(navName) == false) {
        var selector = "[navname=" + navName + "]";
        $(selector).parent().parent().find("a").removeClass("ui-btn-active");
        $(selector).addClass("ui-btn-active");
        HMUI.MobileCommon.SetAppSetting("MessageType", "");
    }
};

Hoteam_Mobile_MobileLogin_LoadAppSetting = function (Action) {

    var rolehtml = "";
    var groupshtml = "";
    var MobileLoginUserID = HMUI.MobileCommon.GetAppSetting("MobileLoginUserID");
    var MobileLoginUserName = HMUI.MobileCommon.GetAppSetting("MobileLoginUserName");
    var MobileLoginUserDisplayName = HMUI.MobileCommon.GetAppSetting("MobileLoginUserDisplayName");
    var MobileLoginUserPassword = HMUI.MobileCommon.GetAppSetting("MobileLoginUserPassword");
    var MobileLoginGroupID = HMUI.MobileCommon.GetAppSetting("MobileLoginGroupID");
    var MobileLoginGroupName = HMUI.MobileCommon.GetAppSetting("MobileLoginGroupName");
    var MobileLoginRoleID = HMUI.MobileCommon.GetAppSetting("MobileLoginRoleID");
    var MobileLoginRoleName = HMUI.MobileCommon.GetAppSetting("MobileLoginRoleName");
    var theme = HMUI.MobileCommon.GetAppSetting("MobileLoginTheme");
    var themeText = HMUI.MobileCommon.GetAppSetting("MobileLoginThemeText");
    //如果用户名不为空，则填充到输入框中
    if (!HMUI.Common.IsNullOrEmpty(MobileLoginUserName)) {
        $("#username").val("" + MobileLoginUserName + "");
    }
    //调整主题
    if (!HMUI.Common.IsNullOrEmpty(theme)) {
        themehtml = '<option value="a">灰色</option><option value="g">蓝色</option>';
        $("#changeTheme").html(themehtml).val(theme).selectmenu('refresh', true);
        Hoteam_Mobile_MobileLogin_OnChangeTheme();
    }
    //如果不是退出模式，则设置组织信息、角色、
    if (Action != "Loginout") {
        //填充组
        if (!HMUI.Common.IsNullOrEmpty(MobileLoginGroupID)) {
            groupshtml += "<option value='" + MobileLoginGroupID + "'>" + MobileLoginGroupName + "</option>";
            $("#changeOrangize").html(groupshtml).selectmenu('refresh', true);
        }
        //填充角色
        if (!HMUI.Common.IsNullOrEmpty(MobileLoginRoleID)) {
            rolehtml += "<option value='" + MobileLoginRoleID + "'>" + MobileLoginRoleName + "</option>";
            $("#changeRole").html(rolehtml).selectmenu('refresh', true);
        }
        //
        UserID = MobileLoginUserID;
        UserName = MobileLoginUserName;
        UserDisplayName = MobileLoginUserDisplayName;
        //填充用户密码
        if (!HMUI.Common.IsNullOrEmpty(MobileLoginUserPassword)) {
            $("#userpassword").val("" + EncryptDecrypt.Decrypt(MobileLoginUserPassword, UserID) + "");
        }
        //如果登录ID和用户密码不为空，则自动登录
        if (!HMUI.Common.IsNullOrEmpty(MobileLoginUserID) && !HMUI.Common.IsNullOrEmpty(MobileLoginUserPassword)) {
            Hoteam_Mobile_MobileLogin_OnLogin();
        }
    }
    else {
        Hoteam_Mobile_MobileLogin_LoadUserGroup(MobileLoginUserName, MobileLoginGroupID, MobileLoginRoleID);
    }

};
/*组织角色信息*/
Hoteam_Mobile_MobileLogin_LoadUserGroup = function (username, groupId, roleId) {

    var groupshtml = "";
    var rolehtml = "";
    var userGroups;

    if (!HMUI.Common.IsNullOrEmpty(username)) {
        userGroups = HMUI.DataService.Call("Hoteam.Mobile.SettingService.GetLoginUser", { para: { UserCode: username} });
        if (userGroups && userGroups.CanUse && UserGroups !== null && UserID && UserID === userGroups.UserID) {
            return true;
        }
        //设置企业ID
        HMUI.Security.LoginPara.CompanyID = userGroups.CompanyID;
        //设置企业Code
        HMUI.Security.LoginPara.CompanyCode = userGroups.CompanyCode;
        //数据库
        HMUI.Security.LoginPara.Connect = userGroups.Connect;
        //时区
        HMUI.Security.LoginPara.TimeZone = userGroups.TimeZone;
        //多语言
        HMUI.Security.LoginPara.Language = userGroups.Language;

        UserGroups = userGroups;

        if (!HMUI.Common.IsNullOrEmpty(UserGroups)) {
            UserID = "";
            UserName = "";
            UserDisplayName = "";
            if (HMUI.Common.IsNullOrEmpty(UserGroups.UserID)) {
                $('#usernametip').html("登录用户不正确，请重新输入!");
                return false;
            }
            else if (UserGroups.CanUse == false) {
                $('#usernametip').html("此用户为非活动用户，无法登录!");
                return false;
            }
            else if (HMUI.Common.IsNullOrEmpty(UserGroups.Groups)) {
                $('#usernametip').html("登录用户在组织结构中不存在，请重新输入!");
                $("#changeOrangize").html("").selectmenu('refresh', true);
                //$("#changeRole").html("").selectmenu('refresh', true);
                return false;
            }
            else {
                UserID = UserGroups.UserID;
                UserName = username;
                UserDisplayName = UserGroups.UserName;
                var selected = "";
                //绑定组织
                for (var i = 0; i < UserGroups.Groups.length; i++) {
                    var item = UserGroups.Groups[i];
                    selected = "";
                    if (groupId && groupId == item.GroupID) {
                        selected = "selected='selected'";
                    }
                    groupshtml += "<option value='" + item.GroupID + "' " + selected + " >" + item.GroupName[1].Text + "</option>";
                }
                $("#changeOrangize").html(groupshtml).selectmenu('refresh', true);
                //$("#changeRole").html(rolehtml).selectmenu('refresh', true);
                $('#usernametip').html("");
                return true;
            }
        }
        else {
            UserID = "";
            UserName = "";
            UserDisplayName = "";
            $('#usernametip').html("登录用户不正确，请重新输入!");
            return false;
        }
    }

    return false;
};
//切换主题
Hoteam_Mobile_MobileLogin_OnChangeTheme = function () {
    var newTheme = $("#changeTheme").val();

    var lastTheme = $('[data-theme]:first').attr("data-theme");

    $('[data-theme]').attr("data-theme", newTheme);

    var lastThemeType = "ui-page-theme-" + lastTheme;
    var newThemeType = "ui-page-theme-" + newTheme;
    $("." + lastThemeType).removeClass(lastThemeType).addClass(newThemeType);


    lastThemeType = "ui-body-" + lastTheme;
    newThemeType = "ui-body-" + newTheme;
    $("." + lastThemeType).removeClass(lastThemeType).addClass(newThemeType);

    lastThemeType = "ui-bar-" + lastTheme;
    newThemeType = "ui-bar-" + newTheme;
    $("." + lastThemeType).removeClass(lastThemeType).addClass(newThemeType);


    lastThemeType = "ui-overlay-" + lastTheme;
    newThemeType = "ui-overlay-" + newTheme;
    $("." + lastThemeType).removeClass(lastThemeType);

    HMUI.Security.LoginPara.Theme = newTheme;
};
//切换多语言
Hoteam_Mobile_MobileLogin_OnChangeLanguage = function () {
    var lang = $("#changeLanguage").val();
    HMUI.Security.LoginPara.Lang = lang;
};
//用户名输入框，离开时自动加载组织信息
Hoteam_Mobile_MobileLogin_OnBlurUserName = function (obj) {
 
    var username = $("#username").val();

    var flag = HMUI.CheckInputValue(49, "true", obj, "用户名", "false");
    if (flag) {
        flag = Hoteam_Mobile_MobileLogin_LoadUserGroup(username);
    }

    return flag;
};
//组织信息切换事件
Hoteam_Mobile_MobileLogin_OnChangeOrangize = function () {
    var changeOrangize = $("#changeOrangize").val();
    var rolehtml = "";
    for (var i = 0; i < UserGroups.Groups.length; i++) {
        var item = UserGroups.Groups[i];
        if (changeOrangize == item.GroupID) {
            for (var j = 0; j < item.Groups.length; j++) {
                var roleitem = item.Groups[j];
                rolehtml += "<option value='" + roleitem.RoleID + "'>" + roleitem.RoleName + "</option>";
            }
        }
    }
    $("#changeRole").html(rolehtml).selectmenu('refresh', true);

    //控制ios viewport 禁止缩放
    HMUI.MobileCommon.ResetWebViewFrame();
};

//密码错误
Hoteam_Mobile_MobileLogin_PasswordError = function () {

    if (HMUI.Window.CheckIsOffLine()) {
        $("#userpasswordtip").html("密码错误，请重新输入!");
    }
}
//点击注册事件
Hoteam_Mobile_MobileLogin_OnRegistered = function () {
    if (HMUI.AppSets.MobileDevice != "Phone") {
        HMUI.UIManager.ShowInSingle("MobileRegistered", {}, "right", "slide");
    }
    else {
        HMUI.UIManager.ShowInLeft("MobileRegistered", {}, "slide", false);
    }
}
//忘记密码
Hoteam_Mobile_MobileLogin_OnForgetPassword = function () {
    if (HMUI.AppSets.MobileDevice != "Phone") {
        HMUI.UIManager.ShowInSingle("MobileForgetPassword", {}, "right", "slide");
    }
    else {
        HMUI.UIManager.ShowInLeft("MobileForgetPassword", {}, "slide", false);
    }
}
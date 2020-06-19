//根据参数进行登陆
HMUI_Mobile_SystemSettingsList_PageInit = function (pageEvent) {
   
    if (HMUI.AppSets.MobileDevice == "Phone") {
        HMUI.MobileCommon.SetHeaderText(HMUI.Language.Lang("MobileSystemSettingsList", "Title"));
        HMUI.MobileCommon.HideHeaderBackButton();
    }
    else {
        HMUI.MobileCommon.ShowRefreshButton();
        $("#rightcontent,#rightheader>.ui-navbar-header>ul").html("");
    }
    $(".footernav.ui-grid-b").html("");
    $(".ui-page-container").removeClass("ui-page-hasfilterable");

};

HMUI_Mobile_SystemSettingsList_ShowMobileUserInfo = function () {
    HMUI.UIManager.ShowInRight("MobileUserInfo", { ObjectText: "用户设置" }, "slide", false);
};

HMUI_Mobile_SystemSettingsList_ShowMobileSystemSettings = function () {
    HMUI.UIManager.ShowInRight("MobileSystemSettingsInfo", { ObjectText: "参数设置" }, "slide", false);
    HMUI.MobileCommon.ShowRefreshButton();
};

HMUI_Mobile_SystemSettingsList_Loginout = function () {
    
    $(".footernav").html("");
    $("#rightcontent").html("");
    $("#rightheader div>ul:first").html("");
    $("#rightfooter>.ui-navbar>ul").html("");
    HMUI.MobileCommon.SetAppSetting("UserIsExit", "true");
    HMUI.MobileCommon.SetAppSetting("MobileLoginUserPassword", "")
    UserGroups = null;

    if (HMUI.MobileCommon.IsPhone() === false) {
        HMUI.UIManager.ShowInSingle(HMUI.AppSets.MobileLoginPage, { Action: "Loginout" }, "right", "slide");
    }
    else {
        HMUI.UIManager.ShowInLeft(HMUI.AppSets.MobileLoginPage, { Action: "Loginout" }, "slide", false);
    }

    //HMUI.MobileCommon.HideRefreshButton();
    HMUI.MobileCommon.HideHeaderNavButton();
    HMUI.CallAjax.Call(HMUI.BaseServicePath, "RemoveOnlineUserByLoginID", { para: {} });
};




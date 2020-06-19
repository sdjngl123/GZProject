//根据参数进行登陆
HMUI_InforCenter_MobilePropertyPage_PageInit = function (pageEvent) {

    var pagePara = pageEvent.o.GetPara();
    var pid = pageEvent.o.pid;

    if (HMUI.Common.IsNullOrEmpty(pagePara.PropertyDataService) == false) {
        var data = HMUI.DataService.Call(pagePara.PropertyDataService, { para: { ObjectID: pagePara.ObjectID, ObjectType: pagePara.ObjectType} });
        if (data != null) {
            HMUI.MobilePropertyPage.ShowHtml($("#" + pid + " #MobilePropertyPageContainer"), data);
            var container = $("#" + pid).find(".scroller");
            HMUI.MobileCommon.InitScroll(container, false);
        }
    }
    else {
        if (HMUI.Common.IsNullOrEmpty(pagePara.PropertyPage) == false) {
            HMUI.UIManager.ShowInRight(pagePara.PropertyPage, pagePara, "slide", false, false);
        }
    }
    var listConfig = HMUI.UIManager.GetMobileListConfig(pagePara.ListName);
    if (HMUI.AppSets.MobileDevice == "Phone") {
        HMUI.MobileCommon.ShowHeaderBackButton();
        HMUI.MobileCommon.SetHeaderText(pagePara.ObjectText);
        HMUI.MobileList.BuildObjectBar($("#PageContainer .footernav"), listConfig, pagePara);
    }
    else {
        HMUI.MobileList.BuildObjectBar($("#rightheader div>ul:first"), listConfig, pagePara);
    }
};


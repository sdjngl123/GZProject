InforCenter_Platform_SearchPermission_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    var para = {};
    para.ItemName = "SearchPermissionPage";
    var data = {};
    $.each(VerticalTabManagementScript, function (index, val) {
        if (val.Name == para.ItemName)
            data = JSON.parse(JSON.stringify(val));
    });
    pagePara = $.extend(true, {}, pagePara, data);

    var tabsPage = HoteamUI.Page.InstanceIn(page.pid, "SearchPageContainer", "VerticalTabsCtrl");
    var tabsCtrl = tabsPage.GetControl("Tabs");
    pagePara.TabsGuid = tabsCtrl.id;
    pagePara.PagePID = page.pid;

    var pageLinksName = pagePara.PageLinksName;
    if (pagePara.TabsGuid) {
        if (HoteamUI.Common.IsNullOrEmpty(pageLinksName) == false) {
            data = InforCenter_Platform_GetTreeManagePageLinksByName(pageLinksName);
            if (data != null) {
                InforCenter_Platform_TabsCtrl_UpdateTabs(tabsCtrl, data, pagePara, pageLinksName);
            }
        }
    }
}

InforCenter_Platform_SearchPermission_OnQuery = function (pageEvent) {
    if (pageEvent) {
        var tabs = HoteamUI.Control.Instance(pageEvent.TabsGuid);
        var tabList = tabs.GetTabInfoList();
        var detailPageID = "";
        var detailPagePara = {};
        for (var i = 0; i < tabList.length; i++) {
            if (tabList[i].pageName == "ObjectPermissionDetail") {
                detailPageID = tabList[i].pid;
                detailPagePara = tabList[i].pageParas;
                break;
            }
        }
        if (detailPageID) {
            var para = {};
            para.UserID = pageEvent.UserID;
            para.GroupID = pageEvent.GroupID;
            detailPagePara = $.extend(true, {}, detailPagePara, para);
            HoteamUI.Page.FirePageEvent(detailPageID, "OnQuery", detailPagePara);
        }
    }
}
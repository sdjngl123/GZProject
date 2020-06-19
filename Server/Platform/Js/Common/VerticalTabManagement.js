//Verticaltab管理页面加载事件
InforCenter_Platform_VerticalTabManagement_LoadPage = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    var data = null;
    $.each(VerticalTabManagementScript, function (index, val) {
        if (val.Name == pagePara.ItemName)
            data = JSON.parse(JSON.stringify(val));
    });
    pagePara = $.extend(pagePara, data);

    var tabsPage = HoteamUI.Page.InstanceIn(page.pid, "VerticalTabsCtrlPage", "VerticalTabsCtrl");
    var tabsCtrl = tabsPage.GetControl("Tabs");
    pagePara.TabsGuid = tabsCtrl.id;
    pagePara.PagePID = page.pid;

    var pageLinksName = pagePara.PageLinksName;
    if ( pagePara.TabsGuid) {
        if (HoteamUI.Common.IsNullOrEmpty(pageLinksName) == false) {
            var data = InforCenter_Platform_GetTreeManagePageLinksByName(pageLinksName);
            if (data != null) {
                if (HoteamUI.Common.IsNullOrEmpty(data.GetLinksItemJS) == false) {
                    pagePara.LinksData = data;
                    data = HoteamUI.Common.ExeFunction(data.GetLinksItemJS, pagePara);
                }
                InforCenter_Platform_TabsCtrl_LoadTabs(tabsPage, pagePara, pageLinksName, "", data);
            }
        }
    }
};
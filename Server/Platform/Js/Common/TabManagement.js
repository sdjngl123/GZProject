//tab管理页面加载事件
InforCenter_Platform_TabManagement_LoadPage = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();

    var tabsPage = HoteamUI.Page.InstanceIn(page.pid, "TabsCtrlPage", "TabsCtrl");
    var tabsCtrl = tabsPage.GetControl("Tabs");
    pagePara.TabsGuid = tabsCtrl.id;
    pagePara.PagePID = page.pid;
    var pageLinksName = pagePara.ItemName;
    if (pagePara.Refresh && pagePara.Refresh == true && pagePara.TabsGuid) {
        if (HoteamUI.Common.IsNullOrEmpty(pageLinksName) == false) {
            var data = InforCenter_Platform_GetTreeManagePageLinksByName(pageLinksName);
            if (data != null) {
                //支持Js定位tab页
                if (!HoteamUI.Common.IsNullOrEmpty(pagePara.FixedTab)) {
                    InforCenter_Platform_TabsCtrl_SetSelectedLinkByFixedTab(tabsCtrl, data, pagePara.FixedTab);
                }
                if (HoteamUI.Common.IsNullOrEmpty(data.GetLinksItemJS) == false) {
                    pagePara.LinksData = data;
                    data = HoteamUI.Common.ExeFunction(data.GetLinksItemJS, pagePara);
                }
                InforCenter_Platform_TabsCtrl_UpdateTabs(tabsCtrl, data, pagePara, pageLinksName);
            }
        }
    }
    else {
        pagePara.TabOptions = {};
        pagePara.TabOptions.titleType = "capsule sample";
        InforCenter_Platform_TabsCtrl_LoadTabs(tabsPage, pagePara, pageLinksName);
    }
};
InforCenter_Platform_CommandServiceLogView_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();

    var tabsPage = HoteamUI.Page.InstanceIn(page.pid, "TabsCtrlPage", "TabsCtrl");
    var tabsCtrl = tabsPage.GetControl("Tabs");
    var pageLinksData = InforCenter_Platform_GetTreeManagePageLinksByName("CommandServiceLogLink");
    var pageLinks = pageLinksData.PageLinks;
    
    pagePara.HiddenMenu = true;
    pageLinksData.PageLinks = pageLinks;
    var paras = $.extend(pagePara, pageLinks);
    InforCenter_Platform_TabsCtrl_UpdateTabs(tabsCtrl, pageLinksData, paras);
    tabsCtrl.SelectTab(0);
}

InforCenter_Platform_CommandServiceLogView_ShowDetailPage = function (ctrlEvent) {
    var pageParas = {};
    pageParas.ObjectID = ctrlEvent.rowobject.EID;
    pageParas.SelectID = ctrlEvent.rowobject.EID;
    pageParas.CommandID = ctrlEvent.rowobject.EID;
    HoteamUI.UIManager.Popup({ pagename: "CommandServiceLogView", paras: pageParas });
}
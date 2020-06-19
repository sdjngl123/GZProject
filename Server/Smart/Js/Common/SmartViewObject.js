InforCenter_Platform_SmartViewObject_OnCreate = function (pageEvent) {
    var para = pageEvent.o.GetPara();
    var ObjectID = para.SelectID;
    var ObjectType = ObjectID.split("_")[0];
    para.ObjectID = para.SelectID;
    var tabsPage = HoteamUI.Page.InstanceIn(pageEvent.o.pid, "TabsCtrlPage", "SmartTabsCtrl");
    var tabsCtrl = tabsPage.GetControl("Tabs");
    InforCenter_Platform_TabsCtrl_LoadTabs(tabsPage, para, null, ObjectType);
    var tabs = tabsCtrl.GetTabInfoList();
    var pagename = ObjectType + "-VIEW";
    if (tabs.length == 0) {
        InforCenter_Platform_TabsCtrl_AddTabs(tabsCtrl, null, pagename, para, true, pagename);
        tabsCtrl.HideAllTitle();
    }
}
InforCenter_Platform_ViewObject_OnCreate = function (pageEvent) {
    var para = pageEvent.o.GetPara();
    var ObjectID = para.SelectID;
    var ObjectType = ObjectID.split("_")[0];
    var pagename = ObjectType + "-VIEW";
    var execPara = {
        pageType: "VIEW",
        objectID: ObjectID
    };
    var ret = HoteamUI.Common.ExeFunction("InforCenter_ModelGenerator_FormBuilder_GetPageName", execPara);
    if (ret) {
        pagename = pagename + "-" + ret;
    }

    para.ObjectID = para.SelectID;
    var tabsContainer = pageEvent.o.GetControl("TabsCtrlPage");
    //2016-04-23 dycBegion 当Web.setting中ViewObjectPageIsVerticalTabs配置项为true且当前使用SmartList模式，则在详细页面使用纵向Tab页显示PageLinks中的配置项否则使用普通tab页
    //如果使用纵向tab页
    if (HoteamUI.Common.IsNullOrEmpty(HoteamUI.AppSets.ViewObjectPageIsVerticalTabs) == false
     && HoteamUI.AppSets.ViewObjectPageIsVerticalTabs == "true"
     && HoteamUI.Common.IsNullOrEmpty(para.ListCtrlPageName) == false && para.ListCtrlPageName == "SmartListViewCtrl") {
        tabsContainer.LoadPage("VerticalTabsCtrl");
        var tabsPage = HoteamUI.Page.InstanceIn(pageEvent.o.pid, "TabsCtrlPage", "VerticalTabsCtrl");
        var tabsCtrl = tabsPage.GetControl("Tabs");
        InforCenter_Platform_TabsCtrl_LoadTabs(tabsPage, para, null, ObjectType);
        var tabs = tabsCtrl.GetTabInfoList();
        if (tabs.length == 0) {
            InforCenter_Platform_TabsCtrl_UpdateTabs(tabsCtrl, null, pagename, para, true, pagename);
            tabsCtrl.HideTab();
        }
    } else {
        //使用横向tab页
        tabsContainer.LoadPage("TabsCtrl");
        var tabsPage = HoteamUI.Page.InstanceIn(pageEvent.o.pid, "TabsCtrlPage", "TabsCtrl");
        var tabsCtrl = tabsPage.GetControl("Tabs");
        InforCenter_Platform_TabsCtrl_LoadTabs(tabsPage, para, null, ObjectType);
        var tabs = tabsCtrl.GetTabInfoList();
        if (tabs.length == 0) {
            InforCenter_Platform_TabsCtrl_AddTabs(tabsCtrl, null, pagename, para, true, pagename);
            tabsCtrl.HideAllTitle();
        }
    }
    //2016-04-23 dyc end
}
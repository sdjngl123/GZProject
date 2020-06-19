InforCenter_GACTT_EditMultiObjectTab_LoadPage = function (pageEvent) {
    var para = pageEvent.o.GetPara();
    var ctrl = pageEvent.o.GetControl('Info_Container');
    var pagename = "VerticalTabManagement";
    para.MainPageId = pageEvent.o.pid;
    ctrl.LoadPage(pagename, para);
    var pageContainer = pageEvent.o.GetControl('Btn_Container');
    HoteamUI.Page.SetContainerParas(pageContainer.id, "CreateMultiObjectTab", para);
}

InforCenter_GACTT_EditMultiObjectTab_OnOK = function (ctrlEvent) {
    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    var para = page.GetPara();
    var ctrl = ctrlEvent.o.OtherControl('Info_Container');
    var verticalTabPage = HoteamUI.Page.InstanceIn(ctrl.ContainerID(), "Info_Container", "VerticalTabManagement");
    var tabPage = HoteamUI.Page.InstanceIn(verticalTabPage.pid, "VerticalTabsCtrlPage", "VerticalTabsCtrl");
    var tabCtrl = tabPage.GetControl('Tabs');
    var tabList = tabCtrl.GetTabInfoList();
    if (para && HoteamUI.Common.IsNullOrEmpty(para.SaveJS) == false) {
        var ret = HoteamUI.Common.ExeFunction(para.SaveJS, tabList);
        if (ret) {
            HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), ret);
        }
    }
}
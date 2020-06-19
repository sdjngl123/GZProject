InforCenter_Platform_LifeCycleInfo_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var tabCtrl = page.GetControl("LifeCycleInfoTabs");
    tabCtrl.AddTab({ pageName: "LifeCycleStateInfo", pageParas: page.GetPara(), text: HoteamUI.Language.Lang("LifeCycleInfo.StateSet"), isSelected: true, activeRefresh: true });
    //加载插件设置Tab页
    tabCtrl.AddTab({ pageName: "LifeCyclePluginSetting", pageParas: page.GetPara(), text: HoteamUI.Language.Lang("LifeCyclePluginSetting.Title"), isSelected: false, activeRefresh: true });
    //加载选中项插件设置Tab页
    tabCtrl.AddTab({ pageName: "SelectedItemPluginSetting", pageParas: page.GetPara(), text: HoteamUI.Language.Lang("SelectedItemPluginSetting.Title"), isSelected: false, activeRefresh: true });
}

///节点切换事件,当绘图区节点切换时掉用
InforCenter_Platform_LifeCycleInfo_OnSelectChanged = function (pageEvent) {
    var page = pageEvent.o;
    var tabCtrl = page.GetControl("LifeCycleInfoTabs");

    var para = {};
    if (tabCtrl.GetTabInfoList()[tabCtrl.GetSelectedTab()].pageName == "SelectedItemPluginSetting") {
        tabCtrl.UpdateTab(tabCtrl.GetSelectedTab(), { pageName: "SelectedItemPluginSetting", pageParas: para })
    }
    else {
        tabCtrl.RemoveTab("SelectedItemPluginSetting");
        //选中选中页信息Tab页
        tabCtrl.AddTab({ pageName: "SelectedItemPluginSetting", pageParas: para, text: HoteamUI.Language.Lang("SelectedItemPluginSetting.Title"), isSelected: true, activeRefresh: true });
    }
}

InforCenter_Platform_LifeCycleInfo_OnSelectTemplate = function (pageEvent) {
    var page = pageEvent.o;
    var tabCtrl = page.GetControl("LifeCycleInfoTabs");
    tabCtrl.SelectTab(0);
}

InforCenter_Platform_LifeCycleInfo_OnBeforeToggle = function (ctrlEvent) {

    if (HoteamUI.Common.IsNullOrEmpty(WebDesignerWorkflowInfo.GetDataPid) == false && WebDesignerWorkflowInfo.IsNodeSelectChanged == false && HoteamUI.Common.IsNullOrEmpty(HoteamUI.Page.Instance(WebDesignerWorkflowInfo.GetDataPid).PageName()) == false) {
        //验证输入的值是否都通过，如果不通过，不允许切换节点
        return HoteamUI.Page.FirePageEvent(WebDesignerWorkflowInfo.GetDataPid, "OnCheck");
    }
}

InforCenter_Platform_LifeCycleStateInfo_OnGetData = function (pageEvent) {
    var stateCtrl = pageEvent.o.GetControl('InitState_Value');
    WebDesignerWorkflowInfo.InitState = stateCtrl.GetSelectedValue();
}

InforCenter_Platform_LifeCycleStateInfo_OnCheck = function (pageEvent) {

}

InforCenter_Platform_LifeCycleInitState_OnChange = function (ctrlEvent) {
    WebDesignerWorkflowInfo.InitState = ctrlEvent.o.GetSelectedValue();
}

InforCenter_Platform_LifeCycleStateInfo_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    if (page.pid != WebDesignerWorkflowInfo.GetDataPid)
        InforCenter_Platform_WorkflowTemplateEdit_SavePreviousPageData(page);
    var pagePara = page.GetPara();
    var nameCtrl = page.GetControl('Name_Value');
    nameCtrl.SetText(WebDesignerWorkflowInfo.Template.DisplayName);
    var stateCtrl = page.GetControl('InitState_Value');
    var stateData = HoteamUI.DataService.Call("InforCenter.LifeCycle.LifeCycleService.GetLifeCycleState", { para: {} });
    stateCtrl.LoadItems(stateData);
    if (pagePara.SelectID) {
        var lifeCycleData = InforCenter_Platform_Object_GetObjectData(pagePara.SelectID, pagePara);
        if (lifeCycleData && HoteamUI.Common.IsNullOrEmpty(WebDesignerWorkflowInfo.InitState)) {
            WebDesignerWorkflowInfo.InitState = lifeCycleData.INITSTATE;
        }
    }
    stateCtrl.SetSelectedByValue(WebDesignerWorkflowInfo.InitState);
}
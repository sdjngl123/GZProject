//流程信息Tab页，用于加载流程信息，参数，插件三个tab页
InforCenter_Platform_WorkflowTemplateInfoTab_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var tabCtrl = page.GetControl("InfoTabs");
    //如果不是第一次加载
    if (tabCtrl.GetTabInfoList().length > 1) {
        //得到选中页的pid
        var pid = tabCtrl.GetTabInfoList()[tabCtrl.GetSelectedTab()].pid;
        HoteamUI.Page.FirePageEvent(pid, "OnCreate");
    } else {
        //加载基本信息
        tabCtrl.AddTab({ pageName: "WorkflowBaseInfo", pageParas: page.GetPara(), text: HoteamUI.Language.Lang("WorkflowBaseInfo.Title"), isSelected: true, activeRefresh: true });
        //加载参数设置
        tabCtrl.AddTab({ pageName: "WorkflowParameterSetting", pageParas: page.GetPara(), text: HoteamUI.Language.Lang("WorkflowParameterSetting.Title"), activeRefresh: true });
        //加载插件设置
        tabCtrl.AddTab({ pageName: "WorkflowPluginSetting", pageParas: page.GetPara(), text: HoteamUI.Language.Lang("WorkflowPluginSetting.Title"), activeRefresh: true });
    }
}
InforCenter_Platform_WorkflowTemplateInfoTab_OnBeforeToggle = function (ctrlEvent) {
    if (HoteamUI.Common.IsNullOrEmpty(WebDesignerWorkflowInfo.GetDataPid) == false && WebDesignerWorkflowInfo.IsNodeSelectChanged == false && HoteamUI.Common.IsNullOrEmpty(HoteamUI.Page.Instance(WebDesignerWorkflowInfo.GetDataPid).PageName()) == false) {
        //验证输入的值是否都通过，如果不通过，不允许切换节点
        return HoteamUI.Page.FirePageEvent(WebDesignerWorkflowInfo.GetDataPid, "OnCheck");
    }
}
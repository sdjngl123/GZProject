
InforCenter_Platform_WorkflowTemplateInfo_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var tabCtrl = page.GetControl("WorkflowInfoTabs");

    //加载流程信息Tab页
    tabCtrl.AddTab({ pageName: "WorkflowTemplateInfoTab", text: HoteamUI.Language.Lang("WorkflowTemplateInfoTab.Title"), isSelected: true, activeRefresh: true });
    //加载选中页信息Tab页
    tabCtrl.AddTab({ pageName: "WorkflowTemplateSelectedTab", text: HoteamUI.Language.Lang("WorkflowTemplateSelectedTab.Title"), isSelected: false, activeRefresh: true });
}

///节点切换事件,当绘图区节点切换时掉用
InforCenter_Platform_WorkflowTemplateInfo_OnSelectChanged = function (pageEvent) {
    var page = pageEvent.o;

    var tabCtrl = page.GetControl("WorkflowInfoTabs");

    var para = {};
    //用于标识是切换tab页保存还是切换节点保存
    if (tabCtrl.GetTabInfoList()[tabCtrl.GetSelectedTab()].pageName == "WorkflowTemplateSelectedTab") {
        tabCtrl.UpdateTab(tabCtrl.GetSelectedTab(), { pageName: "WorkflowTemplateSelectedTab", pageParas: para })
    } else {
        //更新流程信息tab页
        tabCtrl.RemoveTab("WorkflowTemplateSelectedTab");
        //选中选中页信息Tab页
        tabCtrl.AddTab({ pageName: "WorkflowTemplateSelectedTab", pageParas: para, text: HoteamUI.Language.Lang("WorkflowTemplateSelectedTab.Title"), isSelected: true, activeRefresh: true });
    }
}

InforCenter_Platform_WorkflowTemplateInfo_OnSelectTemplate = function (pageEvent) {
    var page = pageEvent.o;

    var tabCtrl = page.GetControl("WorkflowInfoTabs");
    tabCtrl.SelectTab(0);
}

InforCenter_Platform_WorkflowTemplateInfo_OnBeforeToggle = function (ctrlEvent) {
    //return false;
    if (HoteamUI.Common.IsNullOrEmpty(WebDesignerWorkflowInfo.GetDataPid) == false && WebDesignerWorkflowInfo.IsNodeSelectChanged == false && HoteamUI.Common.IsNullOrEmpty(HoteamUI.Page.Instance(WebDesignerWorkflowInfo.GetDataPid).PageName()) == false) {
        //验证输入的值是否都通过，如果不通过，不允许切换节点
        return HoteamUI.Page.FirePageEvent(WebDesignerWorkflowInfo.GetDataPid, "OnCheck");
    }
}


InforCenter_Platform_GetWorkflowTemplateTaskInfo_OnNodeDbClick = function (pageEvent) {
    var node = pageEvent.GetSelectedNode();
    if (node.Value3 != 'TASKNODE') {
        return;
    }
    var selectedlist = pageEvent.o.GetControl("TreeViewSelectedPage");
    var pNode = node.getParentNode();
    selectedlist.AddRow({
        title: pNode.Text + "(" + node.Text + ")",
        value: pNode.Value1 + "|" + node.Value1,
        icon: node.IconOpen
    });
}

InforCenter_Platform_GetWorkflowTemplateTaskInfo_OnSelectedOne = function (ctrlEvent) {
    var pageContainer = ctrlEvent.o.OtherControl("Btn_Container");
    var para = HoteamUI.Page.GetContainerPara(pageContainer.id);
    var selectpageContainer = ctrlEvent.o.OtherControl("TreeViewSelectedPage");
    var treeListContainer = ctrlEvent.o.OtherControl("TreeListContainer");
    var treeCtrl = HoteamUI.Control.Instance(para.TreeGuid);
    var node = treeCtrl.GetSelectedNode();
    if (node.Value3 != 'TASKNODE') {
        return;
    }
    var pNode = node.getParentNode();
    selectpageContainer.AddRow({
        title: pNode.Text + "(" + node.Text + ")",
        value: pNode.Value1 + "|" + node.Value1,
        icon: node.IconOpen
    });
}

InforCenter_Platform_GetWorkflowTemplateTaskInfo_OnOK = function (pageEvent) {
    var control = HoteamUI.Control.Instance(pageEvent.o.id);
    var page = HoteamUI.Page.Instance(control.ContainerID());
    var returnData = {};
    returnData.value = '';
    returnData.text = '';
    var ctrl = page.GetControl('TreeViewSelectedPage');
    var selectItem = ctrl.GetSelected();
    var value = selectItem.values;
    var text = selectItem.titles;
    $.each(value, function (i, d) {
        returnData.value += ';' + d;
    });
    $.each(text, function (i, d) {
        returnData.text += ';' + d;
    });
    HoteamUI.UIManager.Return(control.ContainerID(), returnData);
}


InforCenter_Platform_GetWorkflowTemplateTaskInfo_TreeSelectedListInit = function (ctrlEvent) {
    var Objects = [];
    if (!HoteamUI.Common.IsNullOrEmpty(ctrlEvent.Value)) {
        var retStr = HoteamUI.DataService.Call("InforCenter.Common.WorkflowService.GetFlowTaskTemplateNameByID", { para: { FlowID: ctrlEvent.Value } });
        if (!HoteamUI.Common.IsNullOrEmpty(retStr)) {
            var values = ctrlEvent.Value.split(';');
            var texts = retStr.split(';');
            for (var i = 0; i < values.length; i++) {
                var tempObj = {};
                tempObj.ENAME = texts[i];
                tempObj.EID = values[i];
                tempObj.IMGICONTYPE = "~/Platform/Image/Workflow/FlowAudit.png";
                Objects.push(JSON.stringify(tempObj));
            }
        }
    }
    return { Objects: Objects };
};

InforCenter_Platform_WorkFlowAudit_LoadPage = function (pageEvent) {
    var page = pageEvent.o;
    var para = page.GetPara();
    if (para.TreeGuid) {
        var treeCtrl = HoteamUI.Control.Instance(para.TreeGuid);
        var node = treeCtrl.GetSelectedNode();
        if (node && HoteamUI.Common.IsNullOrEmpty(node.value1) == false) {
            var info = HoteamUI.DataService.Call("InforCenter.Common.WorkflowService.GetFlowTaskInfo", { para: { TaskID: node.value1 } });
            info.TaskInfo = JSON.parse(info.TaskInfo);
            var menuPage = HoteamUI.Page.InstanceIn(page.pid, "MenuPageContainer", "MenuCtrl");
            var menuGrid = menuPage.GetControl("Menu");
            para.MenuGuid = menuGrid.id;
            para.PageID = page.pid;
            para.WORKFLOWID = info.TaskInfo.WORKFLOWID;
            var menuName = para.AuditMenuName;
            if (info.AssistAudit) {
                menuName = para.MenuName;
            }
            InforCenter_Platform_MenuCtrl_LoadMenus(menuPage, para, menuName);
            InforCenter_Platform_WorkFlowAudit_LoadTaskAuditInfo(page, info)
            InforCenter_Platform_WorkFlowAudit_LoadAttachAndPlugins(page, info, para);
            para.Info = info;
            var taskResultContainer = page.GetControl("TaskResultContainer");
            HoteamUI.Page.SetContainerParas(taskResultContainer.id, "WorkFlowAudit", para);
        }
    }
}
InforCenter_Platform_WorkFlowAudit_LoadAttachAndPlugins = function (page, info, pagePara) {
    var tabsPage = HoteamUI.Page.InstanceIn(page.pid, "VerticalTabsCtrlPage", "VerticalTabsCtrl");
    var tabsCtrl = tabsPage.GetControl("Tabs");
    pagePara.TabsGuid = tabsCtrl.id;
    var pageLinksName = pagePara.PageLinksName;
    if (pagePara.TabsGuid) {
        var tabs = tabsCtrl.GetTabInfoList();
        for (var index = tabs.length - 1; index >= 0; index--) {
            tabsCtrl.RemoveTab(index, false);
        }

        if (info != null && info.PluginInfos != null) {
            for (var i = 0; i < info.PluginInfos.length; i++) {
                var data = info.PluginInfos[i];
                var tmpPara = JSON.parse(data.value);
                var pageName = tmpPara.PageName;
                var pluginPara = $.extend(true, {}, tmpPara, pagePara);
                InforCenter_Platform_TabsCtrl_AddTabs(tabsCtrl, data.key, pageName, pluginPara, false, HoteamUI.Language.Lang(pageName, "Title"), false, false, true);
            }
        }
        if (info != null && info.IsHideAttachList == false && HoteamUI.Common.IsNullOrEmpty(pageLinksName) == false) {
            var data = InforCenter_Platform_GetTreeManagePageLinksByName(pageLinksName);
            if (data != null) {
                for (var index = 0; index < data.PageLinks.length; index++) {
                    var item = data.PageLinks[index];
                    var urlPara = InforCenter_Platform_TabsCtrl_GetUrlPara(item, pagePara);
                    //已pageLinksName开头的 不属于页面插件
                    InforCenter_Platform_TabsCtrl_AddTabs(tabsCtrl, pageLinksName + item.Name, item.PageName, urlPara, false, item.Text, false, false, true);
                }
            }
        }
    }
    //var tabs = tabsCtrl.GetTabInfoList();
    //if (tabs.length == 1)
    tabsCtrl.HideAllTitle();
}

InforCenter_Platform_WorkFlowAudit_LoadTaskAuditInfo = function (page, info) {
    if (info) {
        if (HoteamUI.Common.IsNullOrEmpty(info.Result) == false) {
            var taskResult = page.GetControl("TaskResult_Value");
            taskResult.Clear();
            for (var i = 0; i < info.Result.length; i++) {
                var item = info.Result[i];
                taskResult.AddRadio({ value: item.Name, text: item.Name, checked: i == 0 ? true : false });
            }
        }
        if (info.IsHideOpinion) {
            var baseInfoContainer = page.GetControl("WorkFlowAudit_Container");
            baseInfoContainer.HiddenPanel(["item4"]);
        } else {
            var baseInfoContainer = page.GetControl("WorkFlowAudit_Container");
            baseInfoContainer.ShowPanel(["item4"]);
        }
    }
}


InforCenter_Platform_WorkFlowAudit_OnOK = function (execPara) {
    var para = HoteamUI.Page.GetContainerPara(execPara[0].ContainerID);
    var page = HoteamUI.Page.Instance(para.PageID);
    var taskResultContainer = page.GetControl("TaskResultContainer");
    var pagePara = HoteamUI.Page.GetContainerPara(taskResultContainer.id);
    var taskResult = page.GetControl("TaskResult_Value");
    var result = null;
    var labelName = ""
    if (taskResult != null) {
        result = taskResult.GetValue();
        if (HoteamUI.Common.IsNullOrEmpty(result) == true) {
            labelName = "Workflow.NotSelectResult";
        }
    }

    if (HoteamUI.Common.IsNullOrEmpty(labelName) == false) {
        var message = HoteamUI.Language.Lang(labelName);
        HoteamUI.UIManager.Popup("Confirm", { pageMode: "OK", message: message });
        return;
    }
    //获取基本信息
    var task = pagePara.Info.TaskInfo;
    var paras = {};
    paras.TaskID = task.EID;
    paras.NodeID = task.FLOWNODEID;
    paras.Result = result;
    var taskOpinion = page.GetControl("TaskOpinion_Value");
    if (taskOpinion.Check() == false) {
        return;
    }
    paras.Opinion = taskOpinion.GetText();
    paras.FlowID = task.WORKFLOWID;
    //获取附件ID、插件值
    var tabsPage = HoteamUI.Page.InstanceIn(page.pid, "VerticalTabsCtrlPage", "VerticalTabsCtrl");
    var tabsCtrl = tabsPage.GetControl("Tabs");
    var tabs = tabsCtrl.GetTabInfoList();
    var ids = "";
    var pluginDatas = [];
    var checkSucceed = true;
    for (var i = 0; i < tabs.length; i++) {
        var tab = tabs[i];
        if (HoteamUI.Page.FirePageEvent(tab.pid, 'OnCheckData', para) == false) {
            checkSucceed = false;
            break;
        }
        var result = HoteamUI.Page.FirePageEvent(tab.pid, 'OnGetData', para);
        if (pagePara.PageLinksName && tab.tabId.startsWith(pagePara.PageLinksName)) {
            if (result) {
                ids += ";" + result;
            }
        }
        else {
            pluginDatas.push({ Name: tab.tabId, PageName: tab.pageName, Data: result });
        }
    }
    if (checkSucceed == false) {
        return;
    }
    if (HoteamUI.Common.IsNullOrEmpty(ids) == false) {
        paras.ObjIDs = ids.substring(1);
    }
    paras.PluginDatas = pluginDatas;
    var ret = HoteamUI.DataService.Call("InforCenter.Common.WorkflowService.AuditFlowTask", { para: paras });
    if (ret != null) {
        taskOpinion.SetText("");
        var message = HoteamUI.Language.Lang("Workflow.AuditTaskSuccessful");
        HoteamUI.UIManager.Popup("Confirm", { pageMode: "OK", message: message });
        InforCenter_Platform_MenuCtrl_InnerReceiveServerData(execPara[0], ret);
    }
}

InforCenter_Platform_WorkFlowAudit_CheckDeliveryWorkflow = function (para) {
    if (para[1].TreeID) {
        var treeCtrl = HoteamUI.Control.Instance(para[1].TreeID);
        var node = treeCtrl.GetSelectedNode();
        var parentNode = treeCtrl.GetParentNode(node);
        if (HoteamUI.Common.IsNullOrEmpty(parentNode.value5) == false && parentNode.value5 == "MYFLOWTASK") {
            return { confirm: "OK" };
        }
        else {
            var para = { pageMode: "OK", message: HoteamUI.Language.Lang("Workflow.AgainNotAllowedDeliveryTask") };
            HoteamUI.UIManager.Popup("Confirm", para);
        }
    }
}

InforCenter_Platform_WorkFlowAudit_RollBackSuccess = function (para) {
    HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("WorkFlowAudit.RollbackTaskSuccess"));
    InforCenter_Platform_MenuCtrl_InnerReceiveServerData(para[0], { confirm: "OK" });

}

InforCenter_Platform_WorkFlowAudit_AssistAudit = function (execPara) {
    var para = HoteamUI.Page.GetContainerPara(execPara[0].ContainerID);
    var page = HoteamUI.Page.Instance(para.PageID);
    var taskResultContainer = page.GetControl("TaskResultContainer");
    var pagePara = HoteamUI.Page.GetContainerPara(taskResultContainer.id);

    //只有节点任务类型为AssistAudit的类型时，才允许协助
    var task = pagePara.Info.TaskInfo;
    var paras = {};
    paras.Template = task.FLOWTEMPLATE;
    paras.NodeID = task.FLOWNODEID;
    var isAssistAudit = HoteamUI.DataService.Call("InforCenter.Common.WorkflowService.IsAssistAudit", { para: { ExtendJsonInfo: JSON.stringify(paras) } });
    if (isAssistAudit == false) {
        HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("WorkFlowAudit.IsNotAssistAudit"));
        return;
    }
    var taskpara = {};
    taskpara.TaskID = task.EID;
    //判断是否已经设置了协助评审人，已经设置了协助评审人时，弹出协助评审人列表
    var assistAuditGrid = HoteamUI.DataService.Call("InforCenter.Common.WorkflowService.GetAssistAuditGrid", { para: { ExtendJsonInfo: JSON.stringify(taskpara) } });
    if (assistAuditGrid && assistAuditGrid.Rows.length > 0) {
        HoteamUI.UIManager.Popup("WorkFlowAssistAuditPage", { AssistAuditGrid: assistAuditGrid });
    } else if (!assistAuditGrid) {
        //报错直接返回
        return;
    } else {
        //如果没有设置协助评审人，弹出选择人员对话框
        var callback = function (data, ret) {
            //设置人员
            if (ret && ret.length > 0) {
                var assistAuditPara = {};
                assistAuditPara.TaskID = data.TaskID;
                assistAuditPara.UserID = "";
                for (var i = 0; i < ret.length; i++) {
                    assistAuditPara.UserID += ";" + ret[i].EID
                }

                var success = HoteamUI.DataService.Call("InforCenter.Common.WorkflowService.SetAssistAudit", { para: { ExtendJsonInfo: JSON.stringify(assistAuditPara) } });
                if (success == true) {
                    HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("WorkFlowAudit.AssistAuditSuccess"));
                }
            }
        }
        HoteamUI.UIManager.Popup("TreeCommonQuery", { ItemName: "AssistAuditGroupToRoleToUser", LoadAndSelectType: "SingleLevel_MultiSelect", AllQuery: true, ObjectID: task.EID }, callback, { TaskID: task.EID }, "700*500");
    }
}

InforCenter_Platform_WorkFlowAudit_WorkFlowAssistAuditPageOnCreate = function (pageEvent) {
    var para = pageEvent.o.GetPara();
    if (para && para.AssistAuditGrid) {
        var grid = pageEvent.o.GetControl("WorkFlowAssistAuditPageGrid");
        grid.LoadGridRows(para.AssistAuditGrid);
    }
}

InforCenter_Platform_Organization_CheckAssistUser = function (ctrlEvent) {
    var control = HoteamUI.Control.Instance(ctrlEvent.o.id);
    var page = HoteamUI.Page.Instance(control.ContainerID());
    var pagePara = page.GetPara();
  
    var ctrl = page.GetControl('TreeViewSelectedPage');
    var selectItem = ctrl.GetSelected();
    var value = selectItem.values;
    var text = selectItem.titles;
    var returnData = [];
    var ids = '';
    $.each(value, function (i, d) {
        var curObj = {};
        curObj.EID = d;
        returnData.push(curObj);
        ids += ';' + d;
    });
    if (ids != '') {
        ids = ids.substr(1);
    }
    var success = HoteamUI.DataService.Call("InforCenter.Common.WorkflowService.CheckCurSelectUserInRunTaskAuditor", { para: { FlowID: pagePara.ObjectID, Actor: ids } });
    if (success) {
        HoteamUI.UIManager.Return(control.ContainerID(), returnData);
    }
}
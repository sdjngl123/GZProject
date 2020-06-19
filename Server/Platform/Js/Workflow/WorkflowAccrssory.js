
//流程附件页面初始化方法
InforCenter_InforCenter_StartWorkflow_AccessoryPageOnLoad = function (pageEvent) {
    var page = pageEvent.o;
    var paras = page.GetPara();
    paras.parentPid = page.pid;

    if (HoteamUI.Common.IsNullOrEmpty(paras.WorkflowId) == false || HoteamUI.Common.IsNullOrEmpty(paras.TaskId) == false) {
        var workflowId = paras.WorkflowId;
        if (HoteamUI.Common.IsNullOrEmpty(paras.TaskId) == false) {
            var info = HoteamUI.DataService.Call("InforCenter.WorkFlow.WorkflowService.GetFlowTaskInfo", { para: { TaskID: paras.TaskId } });
            info.TaskInfo = JSON.parse(info.TaskInfo);
            workflowId = info.TaskInfo.WORKFLOWID;

            //用于子页面异步加载数据 sujingfang
            paras.WorkflowId = workflowId;
        }
        //获取附件数据
        //var ret = HoteamUI.DataService.Call("InforCenter.WorkFlow.WorkflowService.GetGridObjectListForWorkflowId", { para: { WorkflowId: workflowId } });
        //paras.AttachData = ret;
        //数据加载用于子页面异步处理，此处不再获取数据

        //加载发起流程tab页
        var tabsPage = HoteamUI.Page.InstanceIn(page.pid, "TabsCtrlPage", "VerticalTabsCtrl");
        var tabsCtrl = tabsPage.GetControl("Tabs");
        var pageLinksData = InforCenter_Platform_GetTreeManagePageLinksByName("WorkFlowAccessoryLink");
        var pageLinks = pageLinksData.PageLinks;
        InforCenter_Platform_TabsCtrl_UpdateTabs(tabsCtrl, pageLinksData, paras);
    }
}

InforCenter_InforCenter_StartWorkflow_AccessorySave = function (allPages, currentPage) {
    var curPara = currentPage.GetPara();
    var accessoryTabCtrlPage = HoteamUI.Page.InstanceIn(currentPage.pid, "TabsCtrlPage", "VerticalTabsCtrl");
    //获取附件数据
    var idsObjList = InforCenter_InforCenter_StartWorkflow_GetAccessoryIDs(accessoryTabCtrlPage);
    var mainIdObjList = [];
    for (var i = 0; i < idsObjList.length; i++) {
        if (idsObjList[i].Type == "main") {
            mainIdObjList = idsObjList[i];
        }
    }
    if (mainIdObjList.length == 0) {
        HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("WorkFlow.MainObjectNull"));
        return false;
    }
}

//流程附件页面向导初始化方法
InforCenter_InforCenter_StartWorkflow_AccessoryPageInit = function (curpage, prePage) {
    //将流程模版信息放入到页面参数中
    var tempId = prePage.GetControl("Template_Value").GetSelectedValue();
    var paras = curpage.GetPara();
    paras.TemplateID = tempId;
    paras.parentPid = curpage.pid;
    if (HoteamUI.Common.IsNullOrEmpty(paras.WorkflowId) != false && HoteamUI.Common.IsNullOrEmpty(paras.TaskId) != false) {
        //加载发起流程tab页
        var tabsPage = HoteamUI.Page.InstanceIn(curpage.pid, "TabsCtrlPage", "VerticalTabsCtrl");
        var tabsCtrl = tabsPage.GetControl("Tabs");
        paras.ParentTabCtrlPageID = curpage.pid;
        var pageLinksData = InforCenter_Platform_GetTreeManagePageLinksByName("WorkFlowAccessoryLink");
        var pageLinks = pageLinksData.PageLinks;
        HoteamUI.Page.SetContainerParas(curpage.pid, curpage.PageName(), paras);

        InforCenter_Platform_TabsCtrl_UpdateTabs(tabsCtrl, pageLinksData, paras);
    }
}

//初始化流程主目标附件页面的方法
InforCenter_InforCenter_StartWorkflow_RootChildPageOnLoad = function (pageEvent) {
    var page = pageEvent.o;
    var paras = page.GetPara();
    var gridCtrl = page.GetControl("ObjectList");
    //如果AttachData有数据则，此处为查看详细信息页面，则给页面表格赋值，并隐藏页面操作按钮 paras.OperateType = "EditFlowAttach";
    if (HoteamUI.Common.IsNullOrEmpty(paras.AttachData) == false && HoteamUI.Common.IsNullOrEmpty(paras.AttachData.MainGridData) == false) {
        if (HoteamUI.Common.IsNullOrEmpty(paras.OperateType)) {
            var containerCtrl = page.GetControl("Info_Container");
            containerCtrl.HiddenPanel(["item2"]);
        }
        gridCtrl.LoadGridRows(paras.AttachData.MainGridData);
    } else if (HoteamUI.Common.IsNullOrEmpty(paras.WorkflowId) == false || HoteamUI.Common.IsNullOrEmpty(paras.AuditWorkflowID) == false) {
        //获取附件数据
        var containerCtrl = page.GetControl("Info_Container");
        //流程审批时调用
        //用于异步加载数据 sujingfang
        if (HoteamUI.Common.IsNullOrEmpty(paras.AuditWorkflowID) == false) {
            paras.WorkflowId = paras.AuditWorkflowID;
        }
        else {
            containerCtrl.HiddenPanel(["item3"]);
        }

        containerCtrl.HiddenPanel(["item2"]);
        //sujingfang 修改为异步方式
        HoteamUI.Window.WaitWindow.LayoutShow(gridCtrl.id);
        var callPara = {
            gridCtrl: gridCtrl
        };

        var callBack = function (ret, callPara) {
            if (HoteamUI.Common.IsNullOrEmpty(ret.MainGridData) == false) {
                callPara.gridCtrl.LoadGridRows(ret.MainGridData);
                callPara.gridCtrl.SetSelectAll();
            }

            HoteamUI.Window.WaitWindow.LayoutDestory(callPara.gridCtrl.id);
        }

        var errorCallBack = function () {
            HoteamUI.Window.WaitWindow.LayoutDestory(gridCtrl.id);
        }
        var asyncArgs = {
            serviceuri: "InforCenter.WorkFlow.WorkflowService.GetGridObjectListForWorkflowId",
            paras: { para: { WorkflowId: paras.WorkflowId, AttachType: "main" } },
            callback: callBack,
            callcackpara: callPara,
            errorCallback: errorCallBack
        };

        HoteamUI.DataService.AsyncCall(asyncArgs);

    } else {
        var ret = HoteamUI.DataService.Call("InforCenter.WorkFlow.WorkflowService.GetGridObjectForIds", { para: { IdList: paras.ObjectID } });
        if (ret) {
            var gridData = {}
            if (ret.CheckNodeResult) {
                gridData.Rows = ret.CheckNodeResult;
            } else {
                gridData.Rows = [];
            }
            gridCtrl.LoadGridRows(gridData);
            gridCtrl.SetSelectAll();
            if (HoteamUI.Common.IsNullOrEmpty(ret.CheckMessage) == false) {
                HoteamUI.UIManager.Popup({
                    pagename: "Confirm", paras: { pageMode: "OK", message: ret.CheckMessage }, callback: function (ret, page, nodes) {
                    }, data: ret
                });
            }
        }
    }
}

//初始化流程下级标附件页面的方法
InforCenter_InforCenter_StartWorkflow_ChildPageOnLoad = function (pageEvent) {
    var page = pageEvent.o;
    var paras = page.GetPara();
    var gridCtrl = page.GetControl("ObjectList");
    //如果AttachData有数据则，此处为审批页面，则给页面表格赋值，并隐藏页面操作按钮
    if (HoteamUI.Common.IsNullOrEmpty(paras.AttachData) == false && HoteamUI.Common.IsNullOrEmpty(paras.AttachData.ChildGridData) == false) {
        if (HoteamUI.Common.IsNullOrEmpty(paras.OperateType)) {
            var containerCtrl = page.GetControl("Info_Container");
            containerCtrl.HiddenPanel(["item2"]);
            containerCtrl.HiddenPanel(["item3"]);
        }
        gridCtrl.LoadGridRows(paras.AttachData.ChildGridData);
    } else if (HoteamUI.Common.IsNullOrEmpty(paras.WorkflowId) == false || HoteamUI.Common.IsNullOrEmpty(paras.AuditWorkflowID) == false) {
        //获取附件数据
        var containerCtrl = page.GetControl("Info_Container");
        //流程审批时调用
        //用于异步加载数据 sujingfang
        if (HoteamUI.Common.IsNullOrEmpty(paras.AuditWorkflowID) == false) {
            paras.WorkflowId = paras.AuditWorkflowID;
        }
        else {
            containerCtrl.HiddenPanel(["item3"]);
        }

        //获取附件数据
        containerCtrl.HiddenPanel(["item2"]);
        //sujingfang 修改为异步方式
        HoteamUI.Window.WaitWindow.LayoutShow(gridCtrl.id);
        var callPara = {
            gridCtrl: gridCtrl
        };

        var callBack = function (ret, callData) {
            if (HoteamUI.Common.IsNullOrEmpty(ret.ChildGridData) == false) {
                callData.gridCtrl.LoadGridRows(ret.ChildGridData);
                callData.gridCtrl.SetSelectAll();
            }

            HoteamUI.Window.WaitWindow.LayoutDestory(callData.gridCtrl.id);
        }

        var errorCallBack = function () {
            HoteamUI.Window.WaitWindow.LayoutDestory(gridCtrl.id);
        }
        var asyncArgs = {
            serviceuri: "InforCenter.WorkFlow.WorkflowService.GetGridObjectListForWorkflowId",
            paras: { para: { WorkflowId: paras.WorkflowId, AttachType: "child" } },
            callback: callBack,
            callcackpara: callPara,
            errorCallback: errorCallBack
        };

        HoteamUI.DataService.AsyncCall(asyncArgs);

    } else {
        var containerCtrl = page.GetControl("Info_Container");
        containerCtrl.HiddenPanel(["item3"]);
    }
}

//初始化流程引用附件页面的方法
InforCenter_InforCenter_StartWorkflow_QuoteChildPageOnLoad = function (pageEvent) {
    var page = pageEvent.o;
    var paras = page.GetPara();
    var gridCtrl = page.GetControl("ObjectList");
    //如果AttachData有数据则，此处为审批页面，则给页面表格赋值，并隐藏页面操作按钮
    if (HoteamUI.Common.IsNullOrEmpty(paras.AttachData) == false && HoteamUI.Common.IsNullOrEmpty(paras.AttachData.QuoteGridData) == false) {
        if (HoteamUI.Common.IsNullOrEmpty(paras.OperateType)) {
            var containerCtrl = page.GetControl("Info_Container");
            containerCtrl.HiddenPanel(["item2"]);
            containerCtrl.HiddenPanel(["item3"]);
        }
        gridCtrl.LoadGridRows(paras.AttachData.QuoteGridData);
    } else if (HoteamUI.Common.IsNullOrEmpty(paras.WorkflowId) == false || HoteamUI.Common.IsNullOrEmpty(paras.AuditWorkflowID) == false) {
        //获取附件数据
        var containerCtrl = page.GetControl("Info_Container");
        //流程审批时调用
        //用于异步加载数据 sujingfang
        if (HoteamUI.Common.IsNullOrEmpty(paras.AuditWorkflowID) == false) {
            paras.WorkflowId = paras.AuditWorkflowID;
        }
        else {
            containerCtrl.HiddenPanel(["item3"]);
        }

        //获取附件数据
        containerCtrl.HiddenPanel(["item2"]);
        //sujingfang 修改为异步方式
        HoteamUI.Window.WaitWindow.LayoutShow(gridCtrl.id);
        var callPara = {
            gridCtrl: gridCtrl
        };

        var callBack = function (ret, callData) {
            if (HoteamUI.Common.IsNullOrEmpty(ret.QuoteGridData) == false) {
                callData.gridCtrl.LoadGridRows(ret.QuoteGridData);
                callData.gridCtrl.SetSelectAll();
            }

            HoteamUI.Window.WaitWindow.LayoutDestory(callData.gridCtrl.id);
        }

        var errorCallBack = function () {
            HoteamUI.Window.WaitWindow.LayoutDestory(gridCtrl.id);
        }
        var asyncArgs = {
            serviceuri: "InforCenter.WorkFlow.WorkflowService.GetGridObjectListForWorkflowId",
            paras: { para: { WorkflowId: paras.WorkflowId, AttachType: "quote" } },
            callback: callBack,
            callcackpara: callPara,
            errorCallback: errorCallBack
        };

        HoteamUI.DataService.AsyncCall(asyncArgs);
    } else {
        var containerCtrl = page.GetControl("Info_Container");
        containerCtrl.HiddenPanel(["item3"]);
    }
}

//主目标附件和下级目标附件获取页面数据方法
InforCenter_InforCenter_AttachObjectList_OnRootOrChildGetData = function (pageEvent) {
    var ids = "";
    var gridCtrl = pageEvent.o.GetControl("ObjectList");
    var selectedRows = gridCtrl.GetSelectedRows();
    if (selectedRows != null && selectedRows.length > 0) {
        for (var i = 0; i < selectedRows.length; i++) {
            if (ids == "") {
                ids = selectedRows[i].EID;
                continue;
            }
            ids += ";" + selectedRows[i].EID;
        }
    }
    return ids;
}

//引用附件获取页面数据方法
InforCenter_InforCenter_AttachObjectList_OnQuoteGetData = function (pageEvent) {
    var ids = "";
    var gridCtrl = pageEvent.o.GetControl("ObjectList");
    var allRows = gridCtrl.SaveGridRows();
    if (allRows != null && allRows.length > 0) {
        for (var i = 0; i < allRows.length; i++) {
            if (ids == "") {
                ids = allRows[i].EID;
                continue;
            }
            ids += ";" + allRows[i].EID;
        }
    }
    return ids;
}

//主目标页面按钮事件
InforCenter_WorkFlow_FlowRootObject_MenuClick = function (ctrlEvent) {
    var gridCtrl = ctrlEvent.o.OtherControl("ObjectList");
    var selectRow = gridCtrl.GetSelectedRows();

    switch (ctrlEvent.value) {
        case "Copy":
            if (selectRow.length > 0) {
                InforCenter_WorkFlow_FlowChildObject_OnCop(ctrlEvent, selectRow);
            } else {
                HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("WorkFlow.SelectIsNull"));
            }
            break;
        case "Remove":
            if (selectRow.length > 0) {
                gridCtrl.DeleteGridRow();
            } else {
                HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("WorkFlow.SelectIsNull"));
            }
            break;
        case "Paste":
            InforCenter_WorkFlow_FlowChildObject_OnPaste(ctrlEvent, true);
            break;
    }
}

//引用附件页面按钮事件
InforCenter_WorkFlow_FlowQuoteObject_MenuClick = function (ctrlEvent) {
    var gridCtrl = ctrlEvent.o.OtherControl("ObjectList");
    var selectRow = gridCtrl.GetSelectedRows();
    switch (ctrlEvent.value) {
        case "Paste":
            InforCenter_WorkFlow_FlowChildObject_OnPaste(ctrlEvent, false);
            break;
        case "Remove":
            if (selectRow.length > 0) {
                gridCtrl.DeleteGridRow();
            } else {
                HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("WorkFlow.SelectIsNull"));
            }
            break;
    }
}

//下级目标页面按钮事件
InforCenter_WorkFlow_FlowChildObject_MenuClick = function (ctrlEvent) {
    var gridCtrl = ctrlEvent.o.OtherControl("ObjectList");
    var selectRow = gridCtrl.GetSelectedRows();
    switch (ctrlEvent.value) {
        case "Paste":
            InforCenter_WorkFlow_FlowChildObject_OnPaste(ctrlEvent, true);
            break;
        case "Remove":
            if (selectRow.length > 0) {
                gridCtrl.DeleteGridRow();
            } else {
                HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("WorkFlow.SelectIsNull"));
            }
            break;
    }
}

//添加下级操作
InforCenter_WorkFlow_FlowChildObject_OnAddChild = function (ctrlEvent, selectRow) {
    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    var pagePara = page.GetPara();
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.OperateType) == false && pagePara.OperateType == "EditFlowAttach") {
        HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("WorkFlow.CanNotAddAttach"));
        return false;
    }
    var data = pagePara.FlowID;
    var rootNodeId = "";
    if (selectRow.length > 0) {
        for (var s = 0; s < selectRow.length; s++) {
            if (selectRow[s].EID) {
                rootNodeId += ";" + selectRow[s].EID;
            }
        }
    }
    pagePara.RootNodeId = rootNodeId;
    var callback = function (data, ret) {
        if (ret != null && ret.length > 0) {
            var newData = [];
            for (var i = 0; i < ret.length; i++) {
                newData.push(InforCenter_WorkFlow_StartWorkFlow_MarkOneGridNode(ret[i]));
            }
            //var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
            var parentPage = HoteamUI.Page.Instance(pagePara.parentPid);
            var accessoryTabCtrlPage = HoteamUI.Page.InstanceIn(parentPage.pid, "TabsCtrlPage", "VerticalTabsCtrl");
            var tabCtrl = accessoryTabCtrlPage.GetControl("Tabs");
            var tabs = tabCtrl.GetTabInfoList();
            var childObjectPageID = "";
            if (tabs.length > 0) {
                for (var i = 0; i < tabs.length; i++) {
                    if (tabs[i].pageName == "ChildObject") {
                        childObjectPageID = tabs[i].pid;
                        break;
                    }
                }
            } else {
                return;
            }
            var childObjectPage = HoteamUI.Page.Instance(childObjectPageID);
            var idObjList = new Array();
            var ctrlGrid = childObjectPage.GetControl("ObjectList");

            var oldData = ctrlGrid.SaveGridRows().rowsObject;
            var data = InforCenter_WorkFlow_StartWorkFlow_MarkGridNode(oldData, newData);
            var gridData = {}
            gridData.Rows = newData;
            ctrlGrid.LoadGridRows(gridData);

        }
    }
    HoteamUI.UIManager.Popup("ChildObjectList", pagePara, callback, data);
}

//复制按钮操作
InforCenter_WorkFlow_FlowChildObject_OnCop = function (ctrlEvent, selectRow) {
    var ctrl = ctrlEvent.o;
    var ContainerID = ctrl.ContainerID();
    var ids = "";
    var euids = "";
    for (var i = 0; i < selectRow.length; i++) {
        if (ids == "") {
            ids = selectRow[i].EID;
            if (HoteamUI.Common.IsNullOrEmpty(selectRow[i].EUID) == false)
                euids = selectRow[i].EUID;
        } else {
            ids += ";" + selectRow[i].EID;
            if (HoteamUI.Common.IsNullOrEmpty(selectRow[i].EUID) == false)
                euids += ";" + selectRow[i].EUID;
        }
    }

    InforCenter_Platform_ClipBoard_Copy([{ ContainerID: ContainerID, Order: 1 }, { EID: ids, EUID: euids }]);

}

//粘贴重复的提示
InforCenter_WorkFlow_FlowChildObject_PasteRepeatMsg = function (attachType) {
    var lang = "";
    if (attachType == "main") {
        lang += "WorkFlow.MainAttachPasteExist";
    }
    else if (attachType == "quote") {
        lang += "WorkFlow.QuoteAttachPasteExist";
    }
    else if (attachType == "child") {
        lang += "WorkFlow.ChildAttachPasteExist";
    }

    if (lang != "") {
        HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang(lang));
    }
}

//粘贴
InforCenter_WorkFlow_FlowChildObject_OnPaste = function (ctrlEvent, needCheck) {
    var ctrl = ctrlEvent.o;
    var page = HoteamUI.Page.Instance(ctrl.ContainerID());
    var pagePara = page.GetPara();
    var data = pagePara.FlowID;

    if (HoteamUI.Common.IsNullOrEmpty(ClipBoard) == false
        && HoteamUI.Common.IsNullOrEmpty(ClipBoard.ObjIDArr) == false
        && ClipBoard.ObjIDArr.length > 0) {

        var objectIDs = ClipBoard.ObjIDArr.toString().replace(/,/g, ";");
        var tabsPage = HoteamUI.Page.InstanceIn(pagePara.ParentTabCtrlPageID, "TabsCtrlPage", "VerticalTabsCtrl");
        var idsObjList = InforCenter_InforCenter_StartWorkflow_GetAccessoryIDs(tabsPage);

        for (var i = 0; i < idsObjList.length; i++) {
            if (objectIDs.indexOf(idsObjList[i].ID) > -1) {
                //已存在
                InforCenter_WorkFlow_FlowChildObject_PasteRepeatMsg(idsObjList[i].Type);
                return;
            }
        }
        InforCenter_WorkFlow_FlowChildObject_AddChildNode(data, objectIDs, page, pagePara, needCheck);
    }
    else {
        //剪切板内没信息
        HoteamUI.UIManager.Popup({ pagename: "Confirm", paras: { pageMode: "OK", message: HoteamUI.Language.Lang("ClipBoard.ClipBoardEmpty") } });
        return;
    }
}

//粘贴时将选择的数据添加到下级附件列表
InforCenter_WorkFlow_FlowChildObject_AddChildNode = function (data, idList, page, pagePara, needCheck) {
    var editFlowID = "";
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.OperateType) == false && pagePara.OperateType == "EditFlowAttach") {
        editFlowID = pagePara.WorkflowId;
    }
    var ret = HoteamUI.DataService.Call("InforCenter.WorkFlow.WorkflowService.GetChildDataToDestNode", { para: { IdList: idList, WorkFlowTemplateId: pagePara.TemplateID, NeedCheck: needCheck, EditWorkFlowID: editFlowID } });
    if (ret) {
        var nodes = ret.CheckNodeResult;
        if (HoteamUI.Common.IsNullOrEmpty(ret.CheckMessage) == false) {
            HoteamUI.UIManager.Popup({
                pagename: "Confirm", paras: { pageMode: "OK", message: ret.CheckMessage }, callback: function (ret, page, nodes) {
                    if (ret.CheckResult) {
                        InforCenter_WorkFlow_StartWorkFlow_PasteNodeToChildList(ret, page, nodes);
                    }
                }, data: ret
            });
        } else {
            InforCenter_WorkFlow_StartWorkFlow_PasteNodeToChildList(ret, page, nodes);
        }
    }
}


//粘贴时将树节点集合添加到列表上
InforCenter_WorkFlow_StartWorkFlow_PasteNodeToChildList = function (ret, page, nodes) {
    var listCtrl = page.GetControl("ObjectList");
    var data = listCtrl.SaveGridRows().rowsObject;
    var newData = InforCenter_WorkFlow_StartWorkFlow_MarkGridNode(data, nodes);
    var gridData = {}
    gridData.Rows = newData;
    listCtrl.LoadGridRows(gridData);
}

//将数据转换为列表节点格式
InforCenter_WorkFlow_StartWorkFlow_MarkGridNode = function (oldData, NewGridData) {
    var severGridData = [];
    for (var i = 0; i < oldData.length; i++) {
        severGridData.push(InforCenter_WorkFlow_StartWorkFlow_MarkOneGridNode(oldData[i]));
    }
    for (var j = 0; j < NewGridData.length; j++) {
        var colIndex = 0;
        for (var k = 0; k < NewGridData[j].length; k++) {
            if (NewGridData[j][k].ColName == "EID") {
                colIndex = k;
                break;
            }
        }
        var eid = NewGridData[j][colIndex].ColText;
        var isHas = false;
        for (var i = 0; i < severGridData.length; i++) {
            var cololdIndex = 0;
            for (var m = 0; m < severGridData[i].length; m++) {
                if (severGridData[i][m].ColName == "EID") {
                    cololdIndex = m;
                    break;
                }
            }
            if (severGridData[i][cololdIndex].ColText == eid) {
                isHas = true;
            }
        }
        if (!isHas)
            severGridData.push(NewGridData[j]);
    }
    //根据对象类型、编号排序
    var objectCode = [];
    for (var i = 0; i < severGridData.length; i++) {
        var colIndex = 0;
        var colTypeIndex = 0;
        var colCodeIndex = 0;
        for (var k = 0; k < severGridData[i].length; k++) {
            if (severGridData[i][k].ColName == "EID") {
                colIndex = k;
            }
            if (severGridData[i][k].ColName == "ECODE") {
                colCodeIndex = k;
            }
            if (severGridData[i][k].ColName == "OBJECTTYPE") {
                colTypeIndex = k;
            }
        }
        objectCode.push(severGridData[i][colTypeIndex].ColText + "$" + severGridData[i][colCodeIndex].ColText + "$" + severGridData[i][colIndex].ColText);
    }
    objectCode.sort();
    var newSeverGridData = [];
    for (var j = 0; j < objectCode.length; j++) {
        var row = null;
        for (var i = 0; i < severGridData.length; i++) {
            var colIndex = 0;
            var colTypeIndex = 0;
            var colCodeIndex = 0;
            for (var k = 0; k < severGridData[i].length; k++) {
                if (severGridData[i][k].ColName == "EID") {
                    colIndex = k;
                }
                if (severGridData[i][k].ColName == "ECODE") {
                    colCodeIndex = k;
                }
                if (severGridData[i][k].ColName == "OBJECTTYPE") {
                    colTypeIndex = k;
                }
            }
            if (severGridData[i][colTypeIndex].ColText + "$" + severGridData[i][colCodeIndex].ColText + "$" + severGridData[i][colIndex].ColText == objectCode[j]) {
                row = severGridData[i];
                break;
            }
        }
        if (row != null) {
            newSeverGridData.push(row);
        }
    }
    return newSeverGridData;
}

InforCenter_WorkFlow_StartWorkFlow_MarkOneGridNode = function (data) {
    var colData = [];
    colData.push(InforCenter_WorkFlow_StartWorkFlow_MarkOneColNode("ECODE", data.ECODE ? data.ECODE : "", ""));

    colData.push(InforCenter_WorkFlow_StartWorkFlow_MarkOneColNode("EID", data.EID ? data.EID : "", ""));
    colData.push(InforCenter_WorkFlow_StartWorkFlow_MarkOneColNode("ENAME", data.ENAME ? data.ENAME : "", ""));
    colData.push(InforCenter_WorkFlow_StartWorkFlow_MarkOneColNode("VERSION", data.VERSION ? data.VERSION : "", ""));
    if (data.IMGICONTYPE) {
        if (data.IMGICONTYPE.text) {
            colData.push(InforCenter_WorkFlow_StartWorkFlow_MarkOneColNode("IMGICONTYPE", data.IMGICONTYPE.text, data.IMGICONTYPE.icon));
        } else {
            colData.push(InforCenter_WorkFlow_StartWorkFlow_MarkOneColNode("IMGICONTYPE", data.IMGICONTYPE.ColText, data.IMGICONTYPE.ColIcon));
        }
    } else {
        colData.push(InforCenter_WorkFlow_StartWorkFlow_MarkOneColNode("IMGICONTYPE", data.IMGICONTYPE.text ? data.IMGICONTYPE.text : "", data.IMGICONTYPE.icon ? data.IMGICONTYPE.icon : ""));
    }
    colData.push(InforCenter_WorkFlow_StartWorkFlow_MarkOneColNode("OBJECTSTATE", data.OBJECTSTATE ? data.OBJECTSTATE : "", ""));
    colData.push(InforCenter_WorkFlow_StartWorkFlow_MarkOneColNode("OBJECTTYPE", data.OBJECTTYPE ? data.OBJECTTYPE : "", ""));
    return colData;
}

InforCenter_WorkFlow_StartWorkFlow_MarkOneColNode = function (name, value, colIcon) {
    var colData = {};
    colData.ColName = name;
    colData.ColText = value;
    colData.ColIcon = colIcon;
    return colData;
}


InforCenter_WorkFlow_List_GridColImage = function (ctrlEvent) {

    var paras = {};
    paras.Data = ctrlEvent.rowobject;
    paras.ObjectID = paras.TabId = paras.SelectID = ctrlEvent.rowobject.EID;
    paras.ObjectType = InforCenter_Platform_GTypeFromID(paras.ObjectID);
    var objectInspectorConfig = null;
    $.each(ObjectInspectorsScript, function (index, val) {
        if (val.ObjectType == paras.ObjectType)
            objectInspectorConfig = JSON.parse(JSON.stringify(val));
    });
    if (objectInspectorConfig != null) {
        if (ctrlEvent.rowobject.EUID)
            paras.SelectEUID = ctrlEvent.rowobject.EUID;
        paras.ObjectInspectorConfig = objectInspectorConfig;
        InforCenter_Platform_ObjectInspector_AddMainTab(paras);
        isHave = true;
    }
};

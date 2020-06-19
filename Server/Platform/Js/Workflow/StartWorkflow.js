//加载页面
InforCenter_Platform_StartWorkflow_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    var Issucceed = InforCenter_Platform_StartWorkflow_InitPageData(page, pagePara);
    if (Issucceed == false) {
        return;
    }
}

//初始化页面数据
InforCenter_Platform_StartWorkflow_InitPageData = function (page, pagePara) {
    var ret = false;
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.StartWorkFlowType) == false) {
        ret = HoteamUI.Common.ExeFunction("Platform_StartWorkflow_BindWorkflowTemplate_" + pagePara.StartWorkFlowType, page);
    }

    if (ret.Issucceed == true) { }
    else {
        ret = InforCenter_Platform_StartWorkflow_BindWorkflowTemplate(page, pagePara);
    }

    if (ret.Issucceed == true) {
        pagePara.FlowID = ret.flowid;
        var pageContainer = page.GetControl("TopContainer");
        HoteamUI.Page.SetContainerParas(pageContainer.id, "StartWorkflow", pagePara);
        InforCenter_Platform_Workflow_UpdateUIForTemplate(page, pagePara);
    }
    else {
        return false;
    }
    return true;
}

//流程模板加载内容
InforCenter_Platform_StartWorkflow_BindWorkflowTemplate = function (page, pagePara) {
    var ret = {};
    ret.flowid = "";
    ret.Issucceed = true;
    if (HoteamUI.Common.IsNullOrEmpty(page) == false
        && HoteamUI.Common.IsNullOrEmpty(pagePara.SelectID) == false) {
        var ctrl = page.GetControl("Template_Value");
        var data = InforCenter_Platform_Workflow_GetFlowTemplateForObj(pagePara);
        if (HoteamUI.Common.IsNullOrEmpty(ctrl) == false
            && HoteamUI.Common.IsNullOrEmpty(data) == false) {
            if (HoteamUI.Common.IsNullOrEmpty(data.DropDownItemList) == false) {
                ctrl.LoadItems(data.DropDownItemList);
                ctrl.SetSelectedByIndex(0);
            }
            if (HoteamUI.Common.IsNullOrEmpty(data.WorkFlowClassifyDropDownItemList) == false) {
                var tempClassify = page.GetControl("Classify_Value");
                data.WorkFlowClassifyDropDownItemList.unshift({ Text: "", Value: "" });
                tempClassify.LoadItems(data.WorkFlowClassifyDropDownItemList);
            }
            if (HoteamUI.Common.IsNullOrEmpty(data.FlowID) == false) {
                ret.flowid = data.FlowID;
            }
        }
    }
    else {
        ret.Issucceed = false;
    }
    return ret;
}

//流程模板切换
InforCenter_Platform_StartWorkflow_OnTemplateChange = function (ctrlEvent) {
    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    var pageContainer = ctrlEvent.o.OtherControl("TopContainer");
    var para = HoteamUI.Page.GetContainerPara(pageContainer.id);
    InforCenter_Platform_Workflow_UpdateUIForTemplate(page, para);
}

//获取流程模板
InforCenter_Platform_Workflow_GetFlowTemplateForObj = function (pagePara) {
    return HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowService.GetTempAndClassifyListModel", { para: { IDs: pagePara.SelectID, TemplateType: pagePara.TemplateType } });
}

//流程模版分类切换
InforCenter_Platform_StartWorkflow_OnTemplateClassifyChange = function (ctrlEvent) {
    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    var pageContainer = ctrlEvent.o.OtherControl("TopContainer");
    var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
    pagePara.ClassifyId = ctrlEvent.o.GetSelectedValue();
    pagePara.IDs = pagePara.SelectID;
    var ret = HoteamUI.DataService.Call("InforCenter.WorkFlow.WorkflowService.GetTempListForClassify", {
        para: pagePara
    });
    if (ret) {
        var tempCtrl = ctrlEvent.o.OtherControl("Template_Value");
        tempCtrl.LoadItems(ret.DropDownItemList);
        tempCtrl.SetSelectedByIndex(0);
        InforCenter_Platform_StartWorkflow_OnTemplateChange(ctrlEvent);
    }
}


//设置流程默认名称
InforCenter_Platform_Workflow_SetFlowName = function (page, paras) {
    //为发起流程页面表单赋值
    var workflowName = "";
    if (HoteamUI.Common.IsNullOrEmpty(paras.ObjectName) == false) {
        workflowName = paras.ObjectName;
    }

    var selectRows;
    if (HoteamUI.Common.IsNullOrEmpty(paras.ListID) == false) {
        var listCtrl = HoteamUI.Control.Instance(paras.ListID);
        if (listCtrl && HoteamUI.Common.IsNullOrEmpty(listCtrl.id) == false) {
            selectRows = listCtrl.GetSelectedRows();
        }
    }

    if (selectRows && selectRows.length > 0) {
        for (var key in selectRows[0]) {
            workflowName = workflowName.replace("[" + key.toUpperCase() + "]", selectRows[0][key]);
        }

        if (paras.workflowName) {
            for (var j in paras.workflowName) {
                workflowName = workflowName + paras.workflowName[j];
                for (var key in selectRows[0]) {
                    workflowName = workflowName.replace("[" + key.toUpperCase() + "]", selectRows[0][key]);
                }
            }
        }
    }

    if (workflowName.length > 180) {
        workflowName = workflowName.substr(0, 180);
    }
    page.GetControl("FlowName_Value").SetText(workflowName);

}
//更新页面显示内容
InforCenter_Platform_Workflow_UpdateUIForTemplate = function (page, paras) {
    InforCenter_Platform_Workflow_SetFlowName(page, paras);

    var ctrlTemplate = page.GetControl("Template_Value");
    var tempDisplayName = ctrlTemplate.GetSelectedText();
    var tempname = ctrlTemplate.GetSelectedValue();
    if (HoteamUI.Common.IsNullOrEmpty(tempname)) {
        return false;
    }
    var info = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowService.GetFlowTemplateInfo", { template: tempname });
    if (info == null) {
        return;
    }
    paras.Template = tempname;
    //加载发起流程tab页
    var tabsPage = HoteamUI.Page.InstanceIn(page.pid, "TabsCtrlPage", "VerticalTabsCtrl");
    var tabsCtrl = tabsPage.GetControl("Tabs");
    var pageLinksData = InforCenter_Platform_GetTreeManagePageLinksByName("WorkFlowStartPageLink");
    var pageLinks = pageLinksData.PageLinks;
    var pageLinkIndex = 0;
    for (var index = 0; index < pageLinks.length; index++) {
        var item = pageLinks[index];
        item.Text = HoteamUI.Language.Lang("PageLinkItems", item.Name);
        if (item.Name == "WorkflowPlugin") {
            pageLinkIndex = index;
        }
    }
    paras.FlowID = "";
    //查看流程是否有插件，没有插件则把插件tab页去掉
    var pluginInfo = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowService.GetFlowPagePluginInfo", { para: paras });
    if (pluginInfo.length == 0) {
        if (pageLinkIndex == 0) {
            //如果插件在第一个tab页
            pageLinks = pageLinks.slice(1);
        } else {
            //插件在最后一个tab页
            pageLinks = pageLinks.slice(0, pageLinkIndex);
        }
    }
    else {
        paras.info = pluginInfo;
    }
    pageLinksData.PageLinks = pageLinks;
    paras = $.extend(paras, pageLinks);
    InforCenter_Platform_TabsCtrl_UpdateTabs(tabsCtrl, pageLinksData, paras);

    page.GetControl("FlowAdmin_Value").SetValue(info.FlowAdminID);
    page.GetControl("FlowAdmin_Value").SetText(info.FlowAdminName);
}

InforCenter_Platform_TreeManagement_GetObjectTypeTabs = function (objTypes, objType) {
    var pageLinksName = null;
    for (var i in objTypes) {
        var obj = objTypes[i];
        if (obj.Name && obj.Name == objType) {
            if (HoteamUI.Common.IsNullOrEmpty(obj.PageLinksName) == false) {
                pageLinksName = obj.PageLinksName;
            }
            break;
        }
    }
    return pageLinksName;
};
//发起流程
InforCenter_Platform_StartWorkflow_OnOK = function (ctrlEvent) {
    pageContainer = ctrlEvent.o.OtherControl("TopContainer");
    para = HoteamUI.Page.GetContainerPara(pageContainer.id);
    var p = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    var cflowname = p.GetControl("FlowName_Value");
    var ctemplate = p.GetControl("Template_Value");
    var cadmin = p.GetControl("FlowAdmin_Value");
    var cactor = p.GetControl("NodeActor_Value");

    var ids = InforCenter_Platform_StartWorkflow_GetGridObjectIDs(p);
    if (HoteamUI.Common.IsNullOrEmpty(ids) == true && (HoteamUI.Common.IsNullOrEmpty(para.IsShowObjectList) == true || para.IsShowObjectList == "true")) {
        //列表无数据
        HoteamUI.UIManager.Popup({ pagename: "Confirm", paras: { pageMode: "OK", message: HoteamUI.Language.Lang("StartWorkflow.ObjectListEmpty") } });
        return;
    }
    var actors = {};
    actors.Rows = JSON.parse(cactor.GetValue()).Rows;
    actors = JSON.stringify(actors);
    //获取插件信息
    var tabsPage = HoteamUI.Page.InstanceIn(p.pid, "TabsCtrlPage", "TabsCtrl");
    var tabsCtrl = tabsPage.GetControl("Tabs");
    var tabs = tabsCtrl.GetTabInfoList();
    var pluginDatas = [];
    var checkSucceed = true;
    for (var i in tabs) {
        var tab = tabs[i];
        if (HoteamUI.Page.FirePageEvent(tab.pid, 'OnCheckData', para) == false) {
            checkSucceed = false;
            break;
        }
        var result = HoteamUI.Page.FirePageEvent(tab.pid, 'OnGetData', para);
        if (HoteamUI.Common.IsNullOrEmpty(result) == false) {
            pluginDatas.push({ Name: tab.tabId, PageName: tab.pagename, Data: result });
        }
    }
    if (checkSucceed == false) {
        return;
    }

    var info = { FlowID: para.FlowID, FlowName: cflowname.GetText(), FlowAdmin: cadmin.GetValue(), Template: ctemplate.GetSelectedValue(), Actor: actors, ObjIDs: ids };
    info.PluginDatas = pluginDatas;

    var ret = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowService.StartWorkflow", { para: info });
    if (ret != null) {
        HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), { confirm: "OK" });
    }
}


InforCenter_Platform_StartWorkflow_SetFlowAdmin = function (ctrlEvent) {
    var callback = function (data, ret) {
        var o = ctrlEvent.o;
        if (ret != null && ret.length > 0) {
            o.SetText(ret[0].ENAME);
            o.SetValue(ret[0].EID);
        }
    }
    InforCenter_Platform_OrganizationSelecter(ctrlEvent.o.GetValue(), "GroupToRoleToUser", "SingleLevel_SingleSelect", callback, ctrlEvent.o.id);
}
InforCenter_Platform_StartWorkflow_SetFlowActor = function (ctrlEvent) {
    var callback = function (data, ret) {
        var o = ctrlEvent.o;
        if (HoteamUI.Common.IsNullOrEmpty(ret) == false && HoteamUI.Common.IsNullOrEmpty(ret.Actor) == false) {
            o.SetText("...");
            o.SetValue(ret.Actor);
        }
    }
    var p = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    var ctemplate = p.GetControl("Template_Value");
    var cactor = p.GetControl("NodeActor_Value");

    var para = { Template: ctemplate.GetSelectedValue(), Actor: cactor.GetValue() };
    var data = {};
    HoteamUI.UIManager.Popup("FlowTaskActor", para, callback, data);
}

InforCenter_Platform_FlowTaskActor_OnCreate = function (pageEvent) {
    var para, paras, data, editGrid, pageContainer;
    para = pageEvent.o.GetPara();
    paras = { para: { Template: para.Template, Actor: para.Actor, FlowID: para.FlowID } };
    //paras = { para: { Template: para.Template, Actor: para.Actor} };
    if (HoteamUI.Common.IsNullOrEmpty(para.FlowID) == true) {
        var valueContainer = pageEvent.o.GetControl("TopContainer");
        valueContainer.HiddenPanel(["item2"]);
    }
    data = HoteamUI.DataService.Call("InforCenter.WorkFlow.WorkflowService.GetFlowActorEditData", paras);
    if (data == null) {
        return;
    }
    editGrid = data.EditGridObject;
    if (!para.Template) {
        para.Template = data.TemplateName;
    }
    pageContainer = pageEvent.o.GetControl("TopContainer");
    HoteamUI.Page.SetContainerParas(pageContainer.id, "FlowTaskActor", para);

    pageEvent.o.GetControl("ActorEditGrid").LoadGridRows(editGrid);
}

InforCenter_Platform_FlowTaskActor_SelTaskNodeActor = function (ctrlEvent) {
    var callback = function (data, ret) {
        if (ret != null) {
            data.ctrl.setTextValue(ret.ActorValueText, ret.ActorValue);
        }
    }

    HoteamUI.UIManager.Popup("FlowTaskActorSelect", {}, callback, { ctrl: ctrlEvent.textValue });
}

InforCenter_Platform_FlowTaskActor_Save = function (ctrlEvent) {

    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    var pagePara = page.GetPara();
    var grid = page.GetControl("ActorEditGrid");
    var data = grid.SaveGridRows();
    var disPlayText = "";
    var customDisPlayText = "";
    for (var index in data.rowsObject) {
        var row = data.rowsObject[index];
        var updateActor = row.UpdateActor.value;
        var defaulActor = row.DefaultActor.value;
        if (HoteamUI.Common.IsNullOrEmpty(updateActor) == true
            && row.IsValidateCustomNull == "True") {
            customDisPlayText += "、" + row.FlowNode;
        }
        if (HoteamUI.Common.IsNullOrEmpty(updateActor) == true
            && HoteamUI.Common.IsNullOrEmpty(defaulActor) == true
            && row.IsValidateNull == "True") {
            disPlayText += "、" + row.FlowNode;
        }
    }
    if (HoteamUI.Common.IsNullOrEmpty(customDisPlayText) == false) {
        var message = HoteamUI.Language.Lang("Workflow.NodeMustManuallyChangeActor");
        message = message.replace("[NodeText]", customDisPlayText.substring(1));
        var para = { pageMode: "OK", message: message };
        HoteamUI.UIManager.Popup("Confirm", para);
        return;
    }
    if (HoteamUI.Common.IsNullOrEmpty(disPlayText) == false) {
        var message = HoteamUI.Language.Lang("Workflow.NodeActorIsNotEmpty");
        message = message.replace("[NodeText]", disPlayText.substring(1));
        var para = { pageMode: "OK", message: message };
        HoteamUI.UIManager.Popup("Confirm", para);
        return;
    }
    var actorinfo = JSON.stringify(grid.SaveGridRowsByServerFormat());
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.FlowID) == false) {
        var result = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowService.UpdataWorkflowActor", { para: { FlowID: pagePara.FlowID }, actor: actorinfo });
    }

    HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), { Actor: actorinfo });
}
InforCenter_Platform_FlowTaskActorSelect_OnCreate = function (pageEvent) { }

InforCenter_Platform_FlowTaskActorSelect_SelOrganization = function (ctrlEvent) {
    var callback = function (data, ret) {
        var o = ctrlEvent.o;

        if (ret != null && ret.length > 0) {
            var text = "";
            var value = "";
            for (var i in ret) {
                text = text + ret[i].ENAME + ";";
                value = value + ret[i].EID + ";";
            }
            o.setText(text);
            o.setValue(value);
        }
    }
    InforCenter_Platform_OrganizationSelecter(ctrlEvent.o.GetValue(), "GroupToRoleToUserAndRole", "SingleLevel_MultiSelect", callback, ctrlEvent.o.id);
}
InforCenter_Platform_FlowTaskActor_SetOrganization = function (ctrlEvent) {
    var pageContainer = ctrlEvent.o.OtherControl("TopContainer");
    var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
    var callback = function (data, ret) {
        var o = ctrlEvent.textValue;

        if (ret != null) {
            var text = "";
            var value = "";
            for (var i = 0; i < ret.length; i++) {
                text += ret[i].ENAME + "; ";
                value += ret[i].EID + ";";
            }
            o.setTextValue(text, value);
        }
    }
    var para = {};
    para.Value = ctrlEvent.textValue.getValue();
    para.ItemName = "ChangeTaskActor";
    para.IsLoadAllData = true;
    para.LoadAndSelectType = "SingleLevel_MultiSelect";
    para.TemplateName = pagePara.Template;
    var grid = ctrlEvent.o.OtherControl("ActorEditGrid");
    var rowid = grid.GetEditRowID();
    if (rowid > 0 && para.TemplateName != null) {
        var row = grid.GetRowContent(rowid);
        para.NodeID = row.FlowNodeID
        HoteamUI.UIManager.Popup("TreeCommonQuery", para, callback, { id: ctrlEvent.o.id }, "650*470");
    }
}
InforCenter_Platform_FlowTaskActor_ReturnValue = function (ctrlEvent) {
    var pageContainer = ctrlEvent.o.OtherControl("ViewFilterPageContainer");
    var para = HoteamUI.Page.GetContainerPara(pageContainer.id);
    var grid = HoteamUI.Control.Instance(para.ListGuid);

    var selectedgrid = HoteamUI.Control.Instance(para.SelectedListGuid);
    gridSelectData = selectedgrid.GetCurrentPageRows();
    var returnValue = [];
    for (var i = 0; i < gridSelectData.length; i++) {
        var row = gridSelectData[i];
        returnValue.push({ value: row.EID, text: row.ENAME });
    }
    HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), returnValue);
}
InforCenter_Platform_FlowTaskActorSelect_Save = function (ctrlEvent) {
    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    var creator = page.GetControl("Creator_Value").IsChecked();
    var admin = page.GetControl("Admin_Value").IsChecked();
    var orga = page.GetControl("Organzation_Value").GetValue();

    var data = "";
    if (HoteamUI.Common.IsNullOrEmpty(orga) == false) data = data + orga;
    if (creator == true) data = data + "Creator;";
    if (admin == true) data = data + "Admin;";
    if (HoteamUI.Common.IsNullOrEmpty(data)) {
        return;
    }

    var text = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowService.GetActorDisplayText", { actor: data });

    HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), { ActorValueText: text, ActorValue: data });
}

InforCenter_Platform_StartWorkflow_ObjectGridData = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    var ctrlEvent = page.GetControl('ObjectListEditGrid');
    if (HoteamUI.Common.IsNullOrEmpty(pagePara) == false
        && HoteamUI.Common.IsNullOrEmpty(pagePara.SelectID) == false) {
        var data = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowService.GetWorkflowStartObjectData", { para: { ObjIDs: pagePara.SelectID } });
        if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
            //加载内容
            ctrlEvent.LoadGridRows(data);
        }
    }
}

//列表加载数据
InforCenter_Platform_StartWorkflow_GridData = function (ctrlEvent) {
    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    var pagePara = page.GetPara();
    if (HoteamUI.Common.IsNullOrEmpty(pagePara) == false
        && HoteamUI.Common.IsNullOrEmpty(pagePara.SelectID) == false) {
        var data = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowService.GetWorkflowStartObjectData", { para: { ObjIDs: pagePara.SelectID } });
        if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
            //加载内容
            ctrlEvent.o.LoadGridRows(data);
        }
    }
}

//增加新数据
InforCenter_Platform_WorkflowStart_AddGridData = function (ctrlEvent) {
    if (HoteamUI.Common.IsNullOrEmpty(ClipBoard) == false
        && HoteamUI.Common.IsNullOrEmpty(ClipBoard.ObjIDArr) == false
        && ClipBoard.ObjIDArr.length > 0) {
        try {
            var objectIDs = ClipBoard.ObjIDArr.toString().replace(/,/g, ";");
            //取粘贴数据
            var newAddData = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowService.GetWorkflowStartObjectData", { para: { ObjIDs: objectIDs } });
            if (HoteamUI.Common.IsNullOrEmpty(newAddData) == false
                && HoteamUI.Common.IsNullOrEmpty(newAddData.Rows) == false
                && newAddData.Rows.length > 0) {
                var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
                var grid = page.GetControl("ObjectListEditGrid");
                //取原来数据
                var OldData = grid.SaveGridRowsByServerFormat();
                if (HoteamUI.Common.IsNullOrEmpty(OldData) == false
                    && OldData.success == true
                    && HoteamUI.Common.IsNullOrEmpty(OldData.Rows) == false
                    && OldData.Rows.length > 0) {
                    var oldDataLength = OldData.Rows.length;
                    var newMergeData = OldData;
                    var newMergeDataIndex = oldDataLength;
                    for (var i = 0; i < newAddData.Rows.length; i++) {
                        var findData = false;
                        for (var j = 0; j < oldDataLength; j++) {
                            if (OldData.Rows[j][0].ColText == newAddData.Rows[i][0].ColText) {
                                findData = true;
                                break;
                            }
                        }
                        if (findData == false) {
                            newMergeData.Rows[newMergeDataIndex] = newAddData.Rows[i];
                            newMergeDataIndex++;
                        }
                    }
                    if (newMergeData.Rows.length > oldDataLength) {
                        grid.LoadGridRows(newMergeData);
                        InforCenter_Platform_StartWorkflow_GridDataChange(page);
                    }
                }
                else {
                    //没老数据
                    grid.LoadGridRows(newAddData);
                    InforCenter_Platform_StartWorkflow_GridDataChange(page);
                }
            }
        }
        catch (e) { }
    }
    else {
        //剪切板内没信息
        HoteamUI.UIManager.Popup({ pagename: "Confirm", paras: { pageMode: "OK", message: HoteamUI.Language.Lang("ClipBoard.ClipBoardEmpty") } });
        return;
    }
}

//移除数据
InforCenter_Platform_WorkflowStart_RemoveGridData = function (ctrlEvent) {
    try {
        var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
        var grid = page.GetControl("ObjectListEditGrid");
        if (HoteamUI.Common.IsNullOrEmpty(grid) == false) {
            grid.DeleteGridRow();

            InforCenter_Platform_StartWorkflow_GridDataChange(page);
        }
    } catch (e) { }
}

//列表数据改变
InforCenter_Platform_StartWorkflow_GridDataChange = function (page) {
    if (HoteamUI.Common.IsNullOrEmpty(page) == false) {
        var pageContainer = page.GetControl("TopContainer");
        var para = HoteamUI.Page.GetContainerPara(pageContainer.id);
        para.objectIDs = InforCenter_Platform_StartWorkflow_GetGridObjectIDs(page);
        InforCenter_Platform_StartWorkflow_InitPageData(page, para);
    }
}

InforCenter_Platform_StartWorkflow_GetGridObjectIDs = function (page) {
    var objectIDs = "";
    if (HoteamUI.Common.IsNullOrEmpty(page) == false) {
        var ctrlEvent = InfoCenter_Platform_StartWorkflow_GetTabInfo(page.pid, "WorkflowObjectList");
        var ctrlGrid = ctrlEvent.GetControl('ObjectListEditGrid');
        var gridData = ctrlGrid.SaveGridRows();
        if (gridData != null
        && gridData.success == true
        && gridData.rowsObject
        && gridData.rowsObject.length > 0) {
            for (var i = 0; i < gridData.rowsObject.length; i++) {
                objectIDs += ";" + gridData.rowsObject[i].EID;
            }
            if (objectIDs.length > 1) {
                objectIDs = objectIDs.substring(1);
            }
        }
    }
    return objectIDs;
}

InfoCenter_Platform_StartWorkflow_GetTabInfo = function (pid, tabName) {
    var tabsPage = HoteamUI.Page.InstanceIn(pid, "TabsCtrlPage", "TabsCtrl");
    var tabsCtrl = tabsPage.GetControl("Tabs");
    var tabList = tabsCtrl.GetTabInfoList();
    var tabIndex = 0;
    $.each(tabList, function (i, d) {
        if (d.pageName == tabName) {
            tabIndex = i;
            return;
        }
    })
    return HoteamUI.Page.Instance(tabList[tabIndex].pid);
}




//验证必填项
InforCenter_InforCenter_StartWorkflow_CheckWorkflowBaseInfor = function (a, currentPage) {
    var flowName = currentPage.GetControl('FlowName_Value');
    var bCheck = true;
    if (flowName.id != '') {
        if (flowName.Check() == false) bCheck = false;
    }
    var flowTemplateName = currentPage.GetControl('Template_Value');
    if (flowTemplateName.id != '') {
        if (flowTemplateName.Check() == false) bCheck = false;
    }

    var para = {};
    var data = InforCenter_InforCenter_StartWorkflow_GetWorkflowInforData(currentPage);
    if (data) {
        para.Template = data.TemplateID;
        para.Actors = JSON.stringify(data.Actor);
        var result = HoteamUI.DataService.Call("Hoteam.InforCenter.WorkflowService.ValidataActors", { para: para });
        if (!result) {
            bCheck = false;
        }
    }

    if (bCheck == false) {
        return false;
    }
}


//获取流程基本信息数据  
InforCenter_InforCenter_StartWorkflow_GetWorkflowInforData = function (tabCtrlPage) {
    var actorCtrlPage = HoteamUI.Page.InstanceIn(tabCtrlPage.pid, "TabsCtrlPage", "VerticalTabsCtrl");
    var tabsCtrl = actorCtrlPage.GetControl("Tabs");
    var tabs = tabsCtrl.GetTabInfoList();
    var pluginDatas = [];
    var tabActorPageID = "";
    var checkSucceed = true;
    var pagepara = tabCtrlPage.GetPara();
    if (tabs.length > 0) {
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i].pageName == "FlowTaskActor") {
                tabActorPageID = tabs[i].pid;
                continue;
            } else {
                //保存插件
                var tab = tabs[i];
                if (tab.pageName == "WorkflowPlugin") {

                    var template = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateService.GetWorkflowTemplate", {
                        para: {
                            TemplateName: tab.pageParas.Template
                        }
                    });
                    if (template && template.Template && template.Template.PluginList) {
                        var containerID = 1;
                        for (var p = 0; p < template.Template.PluginList.length; p++) {
                            var plugin = template.Template.PluginList[p];
                            //说明是页面插件
                            if (plugin.Name = "WorkflowPagePlugin") {
                                var content = JSON.parse(plugin.Content);
                                var pluginPage = HoteamUI.Page.InstanceIn(tab.pid, "Container" + containerID, content.PageName);
                                if (pluginPage.pid != "" && pluginPage.pid != undefined) {
                                    if (HoteamUI.Page.FirePageEvent(pluginPage.pid, 'OnCheckData', pagepara) == false) {
                                        checkSucceed = false;
                                        break;
                                    }
                                    var result = HoteamUI.Page.FirePageEvent(pluginPage.pid, 'OnGetData', pagepara);
                                    if (HoteamUI.Common.IsNullOrEmpty(result) == false) {
                                        pluginDatas.push({
                                            Name: plugin.Name, PageName: content.PageName, Data: result
                                        });
                                    }
                                }
                                containerID++;
                            }
                        }
                    }

                }
            }

        }
    } else {
        return;
    }
    if (checkSucceed == false)
        return;
    var actorPage = HoteamUI.Page.Instance(tabActorPageID);
    var data = {};
    data.FlowName = tabCtrlPage.GetControl("FlowName_Value").GetText();
    data.TemplateID = tabCtrlPage.GetControl("Template_Value").GetSelectedValue();
    data.FlowAdmin = tabCtrlPage.GetControl("FlowAdmin_Value").GetValue();

    var ctrlGrid = actorPage.GetControl("ActorEditGrid");
    if (ctrlGrid.SaveGridRowsByServerFormat) {
        var gridData = ctrlGrid.SaveGridRowsByServerFormat();
        data.Actor = {};
        data.Actor.Rows = gridData.Rows;
    }

    data.PluginDatas = pluginDatas;
    return data;
}



//点击完成时验证流程发起流程数据，并发起流程
InforCenter_InforCenter_StartWorkflow_SaveNewWorkflow = function (allPages, currentPage) {
    var workflowInforPage = null;
    var accessoryPage = null;
    var workflowInformPage = null;
    var workflowInforData = {};
    var idsObjList = [];
    var workflowInformData = {};
    for (var i = 0; i < allPages.length; i++) {
        if (allPages[i].PageName() == "StartWorkflow") {
            workflowInforPage = allPages[i];
            //获取流程基本信息
            workflowInforData = InforCenter_InforCenter_StartWorkflow_GetWorkflowInforData(workflowInforPage);
            if (!workflowInforData) {
                return false;
            }
            var actorList = [];
            for (var rowIndex in workflowInforData.Actor.Rows) {
                var curRow = workflowInforData.Actor.Rows[rowIndex];
                var tempActor = {};
                for (var colIndex in curRow) {
                    var tempCol = curRow[colIndex];
                    var tempColName = tempCol.ColName;
                    if (tempColName == 'FlowNodeID') {
                        tempActor.FlowNodeID = tempCol.ColText;
                    }
                    else if (tempColName == 'UpdateActor') {
                        tempActor.UpdateActorText = tempCol.ColText;
                        tempActor.UpdateActorValue = tempCol.ColValue;
                    } else if (tempColName == 'DefaultActor') {
                        tempActor.DefaultActorText = tempCol.ColText;
                        tempActor.DefaultActorValue = tempCol.ColValue;
                    }
                }
                actorList.push(tempActor);
            }
            InforCenter_InforCenter_StartWorkflow_SaveFlowTaskActor(workflowInforData.TemplateID, "TaskActorSetting", JSON.stringify(actorList));
        } else if (allPages[i].PageName() == "WorkflowAccessory") {
            accessoryPage = allPages[i];
            var accessoryTabCtrlPage = HoteamUI.Page.InstanceIn(accessoryPage.pid, "TabsCtrlPage", "VerticalTabsCtrl");
            //获取附件数据
            idsObjList = InforCenter_InforCenter_StartWorkflow_GetAccessoryIDs(accessoryTabCtrlPage);

        } else if (allPages[i].PageName() == "WorkflowInform") {
            workflowInformPage = allPages[i];
            //获取流程通知信息
            workflowInformData = InforCenter_InforCenter_StartWorkflow_GetWorkflowInform(workflowInformPage);
        }
    }
    var para = workflowInforPage.GetPara();
    if (accessoryPage == null) {
        //默认选中对象为主目标附件 
        var ids = para.SelectID.split(';');
        for (var i = 0; i < ids.length; i++) {
            var idObj = {
            };
            idObj.ID = ids[i];
            idObj.Type = "main";
            idsObjList.push(idObj);
        }
    }
    if (workflowInformPage == null) {
        workflowInformData.Rows = [];
        workflowInformData.success = true;
    }
    //验证数据是否可以进行发起流程操作

    var info = {
        FlowID: para.FlowID, FlowName: workflowInforData.FlowName, FlowAdmin: workflowInforData.FlowAdmin, Template: workflowInforData.TemplateID, Actor: JSON.stringify(workflowInforData.Actor), FlowInform: JSON.stringify(workflowInformData), FlowObjIDList: idsObjList
    };
    info.PluginDatas = workflowInforData.PluginDatas;
    var ret = HoteamUI.DataService.Call("InforCenter.WorkFlow.WorkflowService.StartWorkflow", {
        para: info
    });

    if (!ret) {
        return { CancelClosed: true };
    }
    if (HoteamUI.Common.IsNullOrEmpty(ret.CheckMessage) == false) {
        HoteamUI.UIManager.Popup({
            pagename: "Confirm", paras: {
                pageMode: "OK", message: ret.CheckMessage
            }, callback: null, data: ret
        });
        return false;
    } else {

        HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("StartWorkflow.WorkflowStartSuccess"));
        var newRet = [];
        for (var i = 0; i < idsObjList.length; i++) {
            newRet.push({
                EID: ret.EID, ENAME: ret.EName, ObjectIDS: idsObjList[i].ID
            })
        }
        return newRet;
    }

}

InforCenter_InforCenter_StartWorkflow_SaveFlowTaskActor = function (ename, settingType, settingValue) {
    var ret = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowService.SaveTaskActor", {
        para: {
            Template: ename,
            ActorData: settingValue
        }
    });
}


//获取所有附件IDs
InforCenter_InforCenter_StartWorkflow_GetAccessoryIDs = function (tabCtrlPage) {
    var tabsCtrl = tabCtrlPage.GetControl("Tabs");
    var tabs = tabsCtrl.GetTabInfoList();
    var rootObjectPageID = "";
    var childObjectPageID = "";
    var quoteObjectPageID = "";
    if (tabs.length > 0) {
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i].pageName == "RootObject") {
                rootObjectPageID = tabs[i].pid;
            } else if (tabs[i].pageName == "ChildObject") {
                childObjectPageID = tabs[i].pid;
            } else if (tabs[i].pageName == "QuoteObject") {
                quoteObjectPageID = tabs[i].pid;
            }
        }
    } else {
        return;
    }
    var rootObjectPage = HoteamUI.Page.Instance(rootObjectPageID);
    var childObjectPage = HoteamUI.Page.Instance(childObjectPageID);
    var quoteObjectPage = HoteamUI.Page.Instance(quoteObjectPageID);
    var dataArray = new Array();
    if (childObjectPage && childObjectPage.pid != "") {
        dataArray.push(InforCenter_InforCenter_StartWorkflow_GetIDsOnGrid(childObjectPage, "ObjectList", "child"));
    }

    var mainIdObjList = InforCenter_InforCenter_StartWorkflow_GetIDsOnGrid(rootObjectPage, "ObjectList", "main");
    dataArray.push(mainIdObjList);
    if (quoteObjectPage && quoteObjectPage.pid != "") {
        dataArray.push(InforCenter_InforCenter_StartWorkflow_GetIDsOnGrid(quoteObjectPage, "ObjectList", "quote"));
    }

    var idsObjList = new Array();
    for (var i = 0; i < dataArray.length; i++) {
        if (dataArray[i].length > 0) {
            for (var j = 0; j < dataArray[i].length; j++) {
                idsObjList.push(dataArray[i][j]);
            }
        }
    }
    return idsObjList;
}


//获取对应页面的列表数据
InforCenter_InforCenter_StartWorkflow_GetIDsOnGrid = function (page, controlId, type) {
    var idObjList = new Array();
    var ctrlGrid = page.GetControl(controlId);
    var gridData = ctrlGrid.SaveGridRows();
    if (gridData != null
        && gridData.success == true
        && gridData.rowsObject
        && gridData.rowsObject.length > 0) {
        for (var i = 0; i < gridData.rowsObject.length; i++) {
            var idObj = {
            };
            idObj.ID = gridData.rowsObject[i].EID;
            idObj.Type = type;
            idObjList.push(idObj);
        }
    }
    return idObjList;
}

InforCenter_InforCenter_StartWorkflow_GetWorkflowInform = function (page) {
    var gridCtrl = page.GetControl("InformEditGrid");
    return gridCtrl.SaveGridRowsByServerFormat();
}

InforCenter_Workflow_StartWorkflow_SendBack = function (para) {
    var ret = HoteamUI.DataService.Call("InforCenter.WorkFlow.WorkflowService.SendBackFlowTask", {
        para: { FlowID: para[1].FlowID }
    });
    if (ret) {
        var data = JSON.parse(ret);
        data.confirm = "OK";
        InforCenter_Platform_MenuCtrl_InnerReceiveServerData(para[0], data);
    }
}
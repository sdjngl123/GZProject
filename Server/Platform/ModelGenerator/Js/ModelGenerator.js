var formbuilderSaveState = false;
//调用表单设计器
InforCenter_Platform_FormBuilder_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    formbuilderSaveState = false;
}

//生成.page配置文件
InforCenter_Platform_Generator_SaveAndGenerator = function (para, hideMsg) {
    var result = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GeneratorFormBuilderPage", { para: { ObjType: para[1].ObjType, FormTypeID: para[1].FormTypeID, SaveAs: para[1].SaveAs, SaveState: formbuilderSaveState, Version: para[1].Version } });
    if (result) {
        for (var i = 0; i < result.length; i++) {
            var curPage = result[i];
            var pageName = curPage.Name;

            var paras = { ContextName: pageName, FindException: false };
            var con = HoteamUI.CallAjax.Call(HoteamUI.BaseServicePath, "GetDictionaryJson", { para: paras });
            if (!HoteamUI.Common.IsNullOrEmpty(con)) {
                con = JSON.parse(con);
                DictionaryScript[con.N] = con;
            }
            var pageIndex = -1;
            $.each(PageConfigScript, function (index, val) {
                if (val.Name == pageName) {
                    pageIndex = index;
                    return;
                }
            });
            if (pageIndex > -1) {
                PageConfigScript[pageIndex] = curPage;
            } else {
                PageConfigScript.push(curPage);
            }
            var pageHandlerScript = curPage.PageHandlesScript;
            var oHead = document.getElementsByTagName('HEAD').item(0);
            var oScript = document.createElement("script");
            oScript.type = "text/javascript";
            oScript.text = pageHandlerScript;
            oHead.appendChild(oScript);

        }

        if (hideMsg == true) {

        }
        else {
            var message = HoteamUI.Language.Lang("ModelGenerator.GeneratorSuccess");
            HoteamUI.UIManager.MsgBox(message);
        }
    }
}

//获取当前模型右侧列表所有属性信息数据
InforCenter_Platform_Generator_GetModelData = function (para) {

}

InforCenter_Platform_FormBuilder_Save = function (ctrlEvent, saveAs) {
    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    var pagePara = page.GetPara();
    var formbuilderData = ctrlEvent.o.OtherControl("FormBuilderCtrl").GetDesignData();
    var layoutData = JSON.parse(formbuilderData.LayoutData);
    for (var i = 0; i < layoutData.controls.length; i++) {
        var curControls = layoutData.controls[i];
        if (typeof curControls.value == "object") {
            curControls.value = "";
        }
    }
    formbuilderData.layoutData = JSON.stringify(layoutData);

    var temporaryData = JSON.parse(formbuilderData.TemporaryData);
    for (var i = 0; i < temporaryData.controls.length; i++) {
        var curControls = temporaryData.controls[i];
        if (typeof curControls.value == "object") {
            curControls.value = "";
        }
    }
    formbuilderData.TemporaryData = JSON.stringify(temporaryData);

    var designControlData = JSON.stringify(formbuilderData.DesignControlData);
    formbuilderData.DesignControlData = designControlData;
    formbuilderData.PermissionData = JSON.stringify(formbuilderData.PermissionData);
    formbuilderData.FlowTaskPermissionData = JSON.stringify(formbuilderData.FlowTaskPermissionData);
    formbuilderData = JSON.stringify(formbuilderData);
    var result = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "SaveFormBuilderDesignData", {
        para: {
            ObjType: pagePara.ObjType, Data: formbuilderData,
            FormTypeID: pagePara.FormTypeID, SaveAs: saveAs, SaveState: formbuilderSaveState, Version: pagePara.Version,
            ServiceUri: "InforCenter.Platform.ModelGeneratorService.SaveFormBuilderDesignData"
        }
    });
    if (result) {
        formbuilderSaveState = true;

        //生成页面
        var para = [];
        para[1] = {};
        para[1].ObjType = pagePara.ObjType;
        para[1].Version = pagePara.Version;
        para[1].SaveAs = saveAs;
        para[1].FormTypeID = pagePara.FormTypeID;
        InforCenter_Platform_Generator_SaveAndGenerator(para, true);

        var message = HoteamUI.Language.Lang("ModelGenerator.SaveSuccess");
        HoteamUI.UIManager.MsgBox(message);
        HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), { confirm: "OK" });
    }
}

//选择表单版本
InforCenter_Platform_FormBuilder_OnSelectVersion = function (ctrlEvent) {
    var data = InforCenter_Platform_Object_GetDataFromPage(ctrlEvent.o.ContainerID());
    HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), data);
}

InforCenter_Platform_FormBuilder_OnVersionCreate = function (pageEvent) {
    var pagePara = pageEvent.o.GetPara();
    var o = pageEvent.o.GetControl('VERSIONLIST_Value');
    if (o.id != '') {
        var data = HoteamUI.DataService.Call('InforCenter.ModelGenerator.ModelGeneratorService.GetFormBuilderVersionList', { para: { ObjType: pagePara.ObjType, FormTypeID: pagePara.FormTypeID } });
        o.LoadItems(data);
    }
}

InforCenter_Platform_FormBuilder_GetData = function (ctrlEvent) {
    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    var pagePara = page.GetPara();
    //查询表单设计数据，获取该对象之前的设计数据
    var designData = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GetObjectTypeGeneratorData", {
        para: {
            ObjType: pagePara.ObjType, FormTypeID: pagePara.FormTypeID,
            Version: pagePara.Version,
            ServiceUri: "InforCenter.Platform.ModelGeneratorService.GetObjectTypeGeneratorData"
        }
    });
    var result = JSON.parse(designData);
    for (var i in result.TemplateData) {
        var tempData = result.TemplateData[i];
        if (tempData.ObjTypeName == pagePara.ObjType) continue;
        tempData.MasterType = pagePara.ObjType;
    }
    result.ObjectID = pagePara.ObjectID;
    return result;
}

InforCenter_Platform_FormBuilder_GetChildData = function (idData, ctrlEvent) {
    var objData = null;
    var objType = '';
    if (ctrlEvent.isExport == true) {
        objData = ctrlEvent.objData;
    } else {
        var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
        var pagePara = page.GetPara();
        objData = pagePara.ObjData;
        objType = pagePara.ObjectType;
    }
    var ids = idData.split('|');
    var formbuilderId = ids[1];
    var objectId = ids[0];
    var data = null;
    var newObj = false;
    if (objData) {
        data = objData;
    } else if (!HoteamUI.Common.IsNullOrEmpty(objectId)) {
        data = InforCenter_Platform_Object_GetForeignKeyObjectData(objectId, null);

    } else {
        data = InforCenter_Platform_Object_GetForeignKeyObjectInitData(objType, null);
        newObj = true;
    }
    //var permissioData = InforCenter_Platform_Object_GetControlPermissionData(objType, { ObjectID: objectId });
    var inputFormBuilderData = data;
    if (data && data.multi) {
        if (newObj) {
            for (var i in data) {
                data[i] = JSON.parse(data[i]);
            }
        } else {
            for (var i in data) {
                if (i != 'mainObjType') {
                    if (data[i].length && data.mainObjType != i && i != 'multi') {
                        for (var j in data[i]) {
                            if (data[i][j] == '{}') {
                                data[i][j] = null;
                                continue;
                            }
                            data[i][j] = JSON.parse(data[i][j]);
                        }
                    }
                    else {
                        data[i] = JSON.parse(data[i]);
                    }
                }
            }
        }
        inputFormBuilderData = InforCenter_Platform_InitData_Transition(data, formbuilderId);
    }
    return [inputFormBuilderData];
}

InforCenter_Platform_FormBuilder_UpdateDatabaseStruct = function (para) {
    var objType = para[1].ObjType;
    var retData = HoteamUI.DataService.Call("InforCenter.ModelGenerator.ModelGeneratorService.UpdateSqlSchemaByObjType", { para: { ObjType: objType } });
    if (retData) {
        var message = HoteamUI.Language.Lang("ModelGenerator.UpdateSuccess");
        HoteamUI.UIManager.MsgBox(message);
    }

}

InforCenter_Platform_FormBuilder_OpenModule = function (para) {
    var popPara = para[1];
    popPara.ConstraintRefresh = true;
    var title = HoteamUI.Language.Lang(popPara.Title);
    var guid = $("[cid='HomePage_Content']").attr("id");
    var pageObject = HoteamUI.Page.Instance(guid);
    var tabsCtrl = pageObject.GetControl("HomePage_Tabs");
    var tabId = popPara.PageName;
    var tabinfos = tabsCtrl.GetTabInfoList();
    var isRemove = false;
    var index = -1;
    for (var j = 0; j < tabinfos.length; j++) {
        var tabinfo = tabinfos[j];
        if (tabinfo.tabId == tabId) {
            index = tabsCtrl.GetTabIndexByTabId(tabinfo.tabId);
        }
    }

    if (index > -1) {
        var callback = function (data, ret) {
            if (ret) {
                if (ret.confirm == "OK") {
                    tabsCtrl.RemoveTab(index, true);
                    InforCenter_Platform_MainTabs_AddTab(popPara.PageName, popPara, title, false);
                    InforCenter_Platform_MenuCtrl_InnerReceiveServerData(para[0], { confirm: "OK" });
                }
            }
        }
        HoteamUI.UIManager.Popup("Confirm", { pageMode: "OkCancel", message: HoteamUI.Language.Lang("ModelGenerator.CheckSaveInfo") },
            callback, {});
    } else {
        InforCenter_Platform_MainTabs_AddTab(popPara.PageName, popPara, title, false);
        InforCenter_Platform_MenuCtrl_InnerReceiveServerData(para[0], { confirm: "OK" });
    }
}

InforCenter_Platform_FormBuilder_BeforeClose = function (pageEvent) {
    var callback = function (data, ret) {
        if (ret && ret.confirm == "OK") {
            var pagePara = pageEvent.o.GetPara();
            var tabs = HoteamUI.Control.Instance(pagePara.HPTablsID);
            var tabinfos = tabsCtrl.GetTabInfoList();
            var index = -1;
            for (var j = 0; j < tabinfos.length; j++) {
                var tabinfo = tabinfos[j];
                if (tabinfo.tabId == 'FormBuilder') {
                    index = tabsCtrl.GetTabIndexByTabId(tabinfo.tabId);
                    break;
                }
            }
            if (index > -1) {
                tabs.RemoveTab(index);
            }
        }
    }
    var pagePara = pageEvent.o.GetPara();
    //调用wcf接口对比数据是否一致
    var formbuilderData = pageEvent.o.GetControl("FormBuilderCtrl").GetDesignData();
    var layoutData = JSON.parse(formbuilderData.LayoutData);
    for (var i = 0; i < layoutData.controls.length; i++) {
        var curControls = layoutData.controls[i];
        if (typeof curControls.value == "object") {
            curControls.value = "";
        }
    }
    formbuilderData.layoutData = JSON.stringify(layoutData);

    var temporaryData = JSON.parse(formbuilderData.TemporaryData);
    for (var i = 0; i < temporaryData.controls.length; i++) {
        var curControls = temporaryData.controls[i];
        if (typeof curControls.value == "object") {
            curControls.value = "";
        }
    }
    formbuilderData.TemporaryData = JSON.stringify(temporaryData);

    var designControlData = JSON.stringify(formbuilderData.DesignControlData);
    formbuilderData.DesignControlData = designControlData;
    formbuilderData.PermissionData = JSON.stringify(formbuilderData.PermissionData);
    formbuilderData.FlowTaskPermissionData = JSON.stringify(formbuilderData.FlowTaskPermissionData);
    formbuilderData = JSON.stringify(formbuilderData);

    var retData = HoteamUI.DataService.Call("InforCenter.ModelGenerator.ModelGeneratorService.CheckFormBuilderDesignData", { para: { ObjType: pagePara.ObjType, Data: formbuilderData, FormTypeID: pagePara.FormTypeID, Version: pagePara.Version } });
    if (!retData) {
        var msgPara = { pageMode: "OkCancel", context: "ModelGenerator", labelName: "FormSaveInfo" };
        HoteamUI.UIManager.Popup("Confirm", msgPara, callback, {});
        return { close: false };
    }
}

InforCenter_Platform_SetFlowTaskPermission_LoadPage = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    pagePara.ItemName = "FlowTaskPermissionEditList";
    var listPage = HoteamUI.Page.InstanceIn(page.pid, "ListViewPageContainer", "EditListViewCtrl");
    var editlistGrid = listPage.GetControl("ListView");
    var oldPagePara = HoteamUI.Page.GetContainerPara(listPage.pid);
    if (oldPagePara != null && oldPagePara.AutoLoadData == false) {
        return;
    }
    pagePara = InforCenter_Platform_EditListManagement_LoadListMangementPage(pageEvent, page, listPage, editlistGrid, pagePara);
    if (!HoteamUI.Common.IsNullOrEmpty(pagePara.Value)) {
        var textData = pagePara.Text.split('#');
        var valueData = pagePara.Value.split('#');
        for (var i = 0; i < textData.length; i++) {
            var curValue = valueData[i];
            var curText = textData[i];
            var tempValueData = curValue.split(':');
            var tempTextData = curText.split(':');
            var curRow = {};
            curRow.TASKNODE = { ColText: tempTextData[0], ColValue: tempValueData[0] };
            curRow.PERMISSION = { ColText: tempTextData[1], ColValue: tempValueData[1] };
            editlistGrid.AddGridRow(0, false, curRow);
        }
    }
}

InforCenter_Platform_FlowTaskPermissionTaskNode_OnSelect = function (ctrlEvent) {
    var editRow = ctrlEvent.o.GetEditRowID();
    var taskNodeValue = ctrlEvent.o.GetCellContent(editRow, "TASKNODE").value;
    var callback = function (data, ret) {
        if (ret) {
            var text = ret.text;
            var value = ret.value;
            if (!HoteamUI.Common.IsNullOrEmpty(text)) {
                text = text.substr(1);
                value = value.substr(1);
            }
            ctrlEvent.o.SetCellContent(editRow, "TASKNODE", text, value);
        }
    }
    var curPage = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    var pagePara = curPage.GetPara();
    HoteamUI.UIManager.Popup("TreeCommonQuery", { Value: taskNodeValue, ObjType: pagePara.ObjType, ItemName: 'CustomFormFlowAuditNodeTreeQuery', LoadAndSelectType: "SingleLevel_MultiSelect", AllowReturnEmptyValue: true, AllQuery: true }, callback, { id: ctrlEvent.o.id }, "650*470");
}

InforCenter_Platform_FlowTaskPermissionOrg_OnSelect = function (ctrlEvent) {
    var editRow = ctrlEvent.o.GetEditRowID();
    var permissionValue = ctrlEvent.o.GetCellContent(editRow, "PERMISSION").value;
    var callback = function (data, ret) {
        if (ret) {
            var text = ret.text;
            var value = ret.value;
            if (!HoteamUI.Common.IsNullOrEmpty(text)) {
                text = text.substr(1);
                value = value.substr(1);
            }
            ctrlEvent.o.SetCellContent(editRow, "PERMISSION", text, value);
        }
    }

    HoteamUI.UIManager.Popup("TreeCommonQuery", { Value: permissionValue, ItemName: 'FormDesignFlowTaskOrgTreeQuery', LoadAndSelectType: "SingleLevel_MultiSelect", AllowReturnEmptyValue: true, AllQuery: true }, callback, { id: ctrlEvent.o.id }, "650*470");
}

InforCenter_Platform_FlowTaskPermissionTaskNode_AddRow = function (para) {
    var listCtrl = HoteamUI.Control.Instance(para[1].ListID);
    listCtrl.AddGridRow("last", false);
}

InforCenter_Platform_FlowTaskPermissionTaskNode_RemoveRow = function (para) {
    var listid = para[1].ListID;
    var editGrid = HoteamUI.Control.Instance(listid);
    var selIds = editGrid.GetSelectedRowsID();
    for (var i = selIds.length - 1; i >= 0; i--) {
        editGrid.DeleteDataByRowNums(selIds[i]);
    }
}

InforCenter_ModelGenerator_ControlPermission_TreeSelectedListInit = function (ctrlEvent) {
    var Objects = [];
    if (!HoteamUI.Common.IsNullOrEmpty(ctrlEvent.Value)) {
        var values = ctrlEvent.Value.split(';');
        for (var i = 0; i < values.length; i++) {
            var curValue = values[i];
            var curText = "";
            var icon = "~/Platform/Image/Model/p_userobject.png";
            if (curValue == "Creator") {
                curText = HoteamUI.Language.Lang("WebTreeViews.FLOWCREATOR");
            } else if (curValue == "AllUser") {
                curText = HoteamUI.Language.Lang("WebTreeViews.ALLUSER");
            } else {
                var data = InforCenter_Platform_Object_GetObjectData(curValue, null);
                if (data) {
                    curText = data.ENAME;
                    icon = data.IMGICONTYPE;
                }
            }
            var tempObj = {};
            tempObj.ENAME = curText;
            tempObj.EID = curValue;
            tempObj.IMGICONTYPE = icon;
            Objects.push(JSON.stringify(tempObj));
        }
    }
    return { Objects: Objects };
};

InforCenter_ModelGenerator_ControlPermission_OnNodeDbClick = function (pageEvent) {
    var node = pageEvent.GetSelectedNode();
    if (node.Value3 == 'ORGANIZATION' || node.Value3 == 'COMPANY') {
        return;
    }
    var selectedlist = pageEvent.o.GetControl("TreeViewSelectedPage");
    selectedlist.AddRow({
        title: node.Text,
        value: node.Value1,
        icon: node.IconOpen
    });
}

InforCenter_ModelGenerator_ControlPermission_OnSelected = function (ctrlEvent) {
    var pageContainer = ctrlEvent.o.OtherControl("Btn_Container");
    var para = HoteamUI.Page.GetContainerPara(pageContainer.id);
    var selectpageContainer = ctrlEvent.o.OtherControl("TreeViewSelectedPage");
    var treeListContainer = ctrlEvent.o.OtherControl("TreeListContainer");
    var treeCtrl = HoteamUI.Control.Instance(para.TreeGuid);
    var node = treeCtrl.GetSelectedNode();
    if (node.Value3 == 'ORGANIZATION' || node.Value3 == 'COMPANY') {
        return;
    }
    selectpageContainer.AddRow({
        title: node.Text,
        value: node.Value1,
        icon: node.IconOpen
    });
}

InforCenter_ModelGenerator_ControlPermission_OnOK = function (pageEvent) {
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

InforCenter_Platform_SetFlowTaskPermission_OnOK = function (ctrlEvent) {
    var listPage = HoteamUI.Page.InstanceIn(ctrlEvent.o.ContainerID(), "ListViewPageContainer", "EditListViewCtrl");
    var editlistGrid = listPage.GetControl("ListView");
    var rowIds = editlistGrid.GetAllRowsID();
    var lstData = [];
    if (rowIds.length > 0) {
        var text = '';
        var value = '';
        for (var i = 0; i < rowIds.length; i++) {
            var curRow = editlistGrid.GetRowContent(rowIds[i]);
            var textData = curRow.TASKNODE.text.split(';');
            var valueData = curRow.TASKNODE.value.split(';');
            for (var j = 0; j < textData.length; j++) {
                text += '#' + textData[j] + ":" + curRow.PERMISSION.text;
                value += '#' + valueData[j] + ":" + curRow.PERMISSION.value;
            }
        }
        if (!HoteamUI.Common.IsNullOrEmpty(text)) {
            text = text.substr(1);
        }
        if (!HoteamUI.Common.IsNullOrEmpty(value)) {
            value = value.substr(1);
        }
        var curObj = {};
        curObj.ENAME = text;
        curObj.EID = value;
        lstData.push(curObj);
    }
    HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), lstData);
}

InforCenter_Platform_ModelForm_BindFlowTemplate = function (para) {
    var filter = {
        "FLOWBINDINFO": {
            FilterInfo: [
                { infoType: "OBJTYPENAME", operation: "=", parameter: para[1].ObjType }
            ],
            FilterString: "",
            OrderbyString: ""
        }
    };

    var data = InforCenter_Platform_Object_CommonGetObjectDataByFilter(filter);
    var pagePara = {};
    var pageName;
    if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
        data = JSON.parse(data);
        if (data && data.FLOWBINDINFO && data.FLOWBINDINFO.length > 0) {
            pagePara.SelectID = data.FLOWBINDINFO[0].EID;
            pageName = "EditObject";
        }
    }
    else {
        pagePara.ObjectType = "FLOWBINDINFO";
        pagePara.initData = { OBJTYPENAME: para[1].ObjType };
        pageName = "CreateObject"
    }

    var callback = function (data, ret) {
    }

    if (pageName)
        HoteamUI.UIManager.Popup(pageName, pagePara, callback);
}

Platform_StartWorkflow_BindWorkflowTemplate_WebObjTypeWorkFlow = function (page) {
    var ret = {};
    var pagePara = page.GetPara();
    pagePara.ObjectID = pagePara.SelectID;

    var retData = HoteamUI.DataService.Call("InforCenter.ModelGenerator.ModelGeneratorService.GetWorkflowTemplateInfo", { para: pagePara });
    if (retData) {
        var ctrl = page.GetControl("Template_Value");
        var tempClassify = page.GetControl("Classify_Value");
        ctrl.LoadItems(retData.WorkflowTemplate);
        tempClassify.LoadItems(retData.WorkflowTemplateClassify);
        ctrl.Disable();
        tempClassify.Disable();
        ret.Issucceed = true;
    }

    return ret;
}

InforCenter_ModelGenerator_CopyModel_OnCreate = function (pageEvent) {
    var para = pageEvent.o.GetPara();
    var ctrl = pageEvent.o.GetControl('Info_Container');
    var pagename = "MODELDATA-COPY";
    para.ObjectID = para.SelectID;
    ctrl.LoadPage(pagename, para);
    var pageContainer = pageEvent.o.GetControl('Btn_Container');
    HoteamUI.Page.SetContainerParas(pageContainer.id, "CopyObject", para);
}

InforCenter_ModelGenerator_SetAboutModel_OnCreate = function (pageEvent) {
    var pagePara = pageEvent.o.GetPara();
    var objType = pagePara.ObjType;
    var aboutModelCtrl = pageEvent.o.GetControl('ABOUTMODEL_Value');
    var objTypeList = HoteamUI.DataService.Call("InforCenter.ModelGenerator.ModelGeneratorService.GetCurCompanyObjTypeList", { para: {} });
    aboutModelCtrl.LoadItems(objTypeList);
    var retData = HoteamUI.DataService.Call("InforCenter.ModelGenerator.ModelGeneratorService.GetModelData", { para: { ObjType: objType } });
    if (!HoteamUI.Common.IsNullOrEmpty(retData)) {
        var obj = JSON.parse(retData);
        if (obj) {
            aboutModelCtrl.SetSelectedByValue(obj.ABOUTMODEL);
        }
    }
}

InforCenter_ModelGenerator_SetAboutModel_OnOK = function (ctrlEvent) {
    var aboutModelCtrl = ctrlEvent.o.OtherControl('ABOUTMODEL_Value');
    var aboutModel = aboutModelCtrl.GetSelectedValue();
    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    var pagePara = page.GetPara();
    var retData = HoteamUI.DataService.Call("InforCenter.ModelGenerator.ModelGeneratorService.SaveAboutModel", { para: { ObjType: pagePara.ObjType, Data: aboutModel } });
    if (retData) {
        HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), { confirm: "OK" });
    }
}
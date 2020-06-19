Hoteam_InforCenter_AccessRecordTree_OnCreate = function (pageEvent) {
    Hoteam_InforCenter_AccessRecordTree_RefreshData(pageEvent);
    var page = pageEvent.o;
    var tree = page.GetControl('TreeView');

    var ObjTypes = [];
    var objType1 = {};
    objType1.Name = "OPERATELOG";
    objType1.MenuName = "AccessRecordShowMenu";
    var objType2 = {};
    objType2.Name = "DAY";
    objType2.MenuName = "AccessRecordShowTreeRootMenu";
    var objType3 = {};
    objType3.Name = "WEEK";
    objType3.MenuName = "AccessRecordShowTreeRootMenu";
    var objType4 = {};
    objType4.Name = "MONTH";
    objType4.MenuName = "AccessRecordShowTreeRootMenu";
    var objType5 = {};
    objType5.Name = "ALL";
    objType5.MenuName = "AccessRecordShowTreeRootMenu";
    ObjTypes.push(objType1);
    ObjTypes.push(objType2);
    ObjTypes.push(objType3);
    ObjTypes.push(objType4);
    ObjTypes.push(objType5);

    var pagePara = {};
    pagePara.ObjTypes = ObjTypes;
    pagePara.TreeGuid = tree.id;
    pagePara.IsLoadAllData = false;
    pagePara.TreeChildDataService = 'Hoteam.InforCenter.AccessRecordService.GetAccessRecordChildNode';
    pagePara.TreeQueryDataService = 'Hoteam.InforCenter.AccessRecordService.GetTreeQueryData';
    InforCenter_Platform_MenuCtrl_LoadRightMenus(page, pagePara, tree);
    var container = page.GetControl('Left_Container');
    HoteamUI.Page.SetContainerParas(container.id, page.PageName(), pagePara);
    var treeContainer = page.GetControl('TreeView_Container');
    HoteamUI.Page.SetContainerParas(treeContainer.id, page.PageName(), pagePara);
}

Hoteam_InforCenter_AccessRecordTree_RefreshData = function (pageEvent) {
    var page = pageEvent.o;
    var treeCtrl = page.GetControl("TreeView");
    Hoteam_InforCenter_AccessRecordTree_LoadNode(treeCtrl, 'DAY');
}

Hoteam_InforCenter_AccessRecordTree_LoadNode = function (treeCtrl, mode, showType) {
    var pagePara = {};
    pagePara.DisplayMode = mode;
    if (showType == "left") {
        pagePara.TreeRootDataService = 'Hoteam.InforCenter.AccessRecordService.GetAccessRecordRootNode';
    } else {
        pagePara.TreeAllDataService = 'Hoteam.InforCenter.AccessRecordService.GetAccessRecordAllNode';
        pagePara.IsLoadAllData = true;
    }

    InforCenter_Platform_TreeViewCtrl_LoadRootData(treeCtrl, pagePara);
}
Hoteam_InforCenter_AccessRecordTree_OnExpandLoad = function (ctrlEvent) {
    var node = ctrlEvent.treeNode;
    if (HoteamUI.Common.IsNullOrEmpty(node) == false) {
        var pageContainer = ctrlEvent.o.OtherControl("FavoriteTreeView");
        var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.ContainerID());
        var para = { para: { TreeViewName: pagePara.TreeViewName } };
        para.para.Text = node.text;
        para.para.Value1 = node.value1;
        para.para.Value2 = node.value2;
        para.para.Value3 = node.value3;
        para.para.Value4 = node.value4;
        para.para.Value5 = node.value5;
        var returnData = InforCenter_Platform_MenuCtrl_GetParameters(pagePara, pagePara, null, node);
        returnData = JSON.stringify(returnData);
        para.para.ParaList = returnData;
        var data = HoteamUI.DataService.Call("Hoteam.InforCenter.AccessRecordService.GetAccessRecordChildNode", para);
        InforCenter_Platform_TreeViewCtrl_LoadNodes(ctrlEvent.o, node, data);
    }
}

Hoteam_InforCenter_AccessRecord_OnShowModeChange = function (para) {
    var mode = para[1].Mode;
    var showType = para[1].ShowType;
    var treeCtrlId = para[1].TREEID;
    var treeCtrl = HoteamUI.Control.Instance(treeCtrlId);
    if (treeCtrl.id != '') {
        Hoteam_InforCenter_AccessRecordTree_LoadNode(treeCtrl, mode, showType);
    }
}


Hoteam_InforCenter_TimeRange_OnSelect = function (ctrlEvent) {
    var para = { para: {} };
    var dataTypeCtrl = ctrlEvent.o.OtherControl('TypeValue');
    para.para.DataType = dataTypeCtrl.GetSelectedValue();
    if (HoteamUI.Common.IsNullOrEmpty(para.para.DataType)) {
        var msg = HoteamUI.Language.Lang('AccessRecord', 'SelectDataTypeInfo');
        HoteamUI.UIManager.MsgBox(msg);
        return;
    }
    //else if (dataTypeCtrl.IsInOption()==false) {
    //    var msg = HoteamUI.Language.Lang('AccessRecord', 'SelectDataTypeInfo');
    //    HoteamUI.UIManager.MsgBox(msg);
    //    return;
    //}
    var rangeCtrl = ctrlEvent.o.OtherControl('RangeValue');
    var rangeValue = rangeCtrl.GetSelectedValue();
    para.para.RangeType = rangeValue;
    if (rangeValue == 'CustomTime') {
        var startCtrl = ctrlEvent.o.OtherControl('StartTime');
        var endCtrl = ctrlEvent.o.OtherControl('EndTime');
        para.para.StartTime = startCtrl.GetDateTime();
        para.para.EndTime = endCtrl.GetDateTime();
        if (para.para.StartTime == '' || para.para.EndTime == '') {
            var msg = HoteamUI.Language.Lang('AccessRecord', 'SelectTimeRangeInfo');
            HoteamUI.UIManager.MsgBox(msg);
            return;
        }
    }
    var result = HoteamUI.DataService.Call("Hoteam.InforCenter.AccessRecordService.DeleteRecordByTimeRange", para);
    if (result) {
        HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), { confirm: "OK" });
    }
}

Hoteam_InforCenter_TimeRange_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var container = page.GetControl('Range_Container');
    container.HiddenPanel(["item5", "item6"]);
    var rangeCtrl = page.GetControl('RangeValue');
    InforCenter_Platform_Object_SetEnumListbyName(rangeCtrl, 'TimeRange', true, false);
    var dataTypeCtrl = page.GetControl('TypeValue');
    var result = HoteamUI.DataService.Call("Hoteam.InforCenter.AccessRecordService.GetAllObjectTypeData", {});
    if (result && !HoteamUI.Common.IsNullOrEmpty(result)) {
        dataTypeCtrl.LoadItems(result);
    }
}

Hoteam_InforCenter_RangeValue_OnChange = function (ctrlEvent) {
    var selectValue = ctrlEvent.o.GetSelectedValue();
    var container = ctrlEvent.o.OtherControl('Range_Container');
    if (selectValue == 'CustomTime') {
        container.ShowPanel(["item5", "item6"]);
    } else {
        container.HiddenPanel(["item5", "item6"]);
    }
}


Hoteam_InforCenter_AccessRecord_OnOpen = function (para) {
    var ObjectID = para[1].SelectID;
    if (ObjectID.indexOf('_') == -1)
        return;

    //权限判断
    var check = HoteamUI.DataService.Call('InforCenter.Common.WebActionService.CheckActionPermission', { para: { ActionType: "AUTO", ActionName: "BROWSE", SelectID: ObjectID } });
    if (check == null) {
        return;
    }

    var data = InforCenter_Platform_Object_GetObjectData(ObjectID, para);
    var paras = {};
    paras.Data = data;
    paras.ObjectID = paras.TabId = paras.SelectID = ObjectID;
    var objectType = InforCenter_Platform_GTypeFromID(paras.ObjectID);

    var customObjectType = "";
    if (objectType == "PMTASK") {
        var data = InforCenter_Platform_Object_GetObjectData(paras.ObjectID, null);
        customObjectType = data.TASKTYPE;
    }

    paras.ObjectType = HoteamUI.Common.IsNullOrEmpty(customObjectType) ? objectType : customObjectType;
    var objectInspectorConfig = null;
    $.each(ObjectInspectorsScript, function (index, val) {
        if (val.ObjectType == paras.ObjectType)
            objectInspectorConfig = JSON.parse(JSON.stringify(val));
    });
    if (objectInspectorConfig != null) {
        if (data.EUID)
            paras.SelectEUID = data.EUID;
        paras.ObjectInspectorConfig = objectInspectorConfig;
        InforCenter_Platform_ObjectInspector_AddMainTab(paras);
    } else {
        HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("AccessRecord.NoObjectInspector"));
    }
}

Hoteam_InforCenter_AccessRecord_NeedToDelete = function (para) {
    var listId = para[1].ListID;
    var lstCtrl = HoteamUI.Control.Instance(listId);
    if (lstCtrl && lstCtrl.id) {
        var count = lstCtrl.GetRowsCount();
        if (count == 0) {
            var title = HoteamUI.Language.Lang("AccessRecord.NoDataDelete");
            HoteamUI.UIManager.MsgBox(title);
            return { confirm: "cancel" };
        }
        else {
            return { confirm: "ok" };
        }
    }
}



InforCenter_Platform_AccessRecordList_OnImageClick = function (ctrlEvent) {
    var pageContainer = ctrlEvent.o.OtherControl("ListView_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
    var actionName = "BROWSE";
    //权限判断
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.WebListView.DetailsAction) == false) {
        actionName = pagePara.WebListView.DetailsAction;
    }
    //权限判断
    var check = HoteamUI.DataService.Call('InforCenter.Common.WebActionService.CheckActionPermission', { para: { ActionType: "AUTO", ActionName: actionName, SelectID: ctrlEvent.rowobject.EID } });
    if (check == null) {
        return;
    }
    //自定义js脚本
    var detailPageSettingList = pagePara.WebListView.DetailColumnSettingList;
    var isHave = false;
    if (HoteamUI.Common.IsNullOrEmpty(detailPageSettingList) == false) {
        var type = ctrlEvent.rowobject.EID.split('_')[0];
        //for (var i in detailPageSettingList) {
        for (var i = 0; i < detailPageSettingList.length; i++) {
            var obj = detailPageSettingList[i];
            if (obj.ObjectType == type) {
                HoteamUI.Common.ExeFunction(obj.JSMethod, ctrlEvent);
                return;
            }
        }
    }
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.WebListView.DetailsPageUseObjectInspector) == false
        && pagePara.WebListView.DetailsPageUseObjectInspector == true) {
        var paras = {};
        paras.Data = ctrlEvent.rowobject;
        paras.ObjectID = paras.TabId = paras.SelectID = ctrlEvent.rowobject.EID;
        paras.ListGuid = ctrlEvent.o.id;
        var customObjectType = "";
        if (InforCenter_Platform_GTypeFromID(paras.ObjectID) == "PMTASK") {
            var data = InforCenter_Platform_Object_GetObjectData(paras.ObjectID, paras);
            customObjectType = data.TASKTYPE;
        }
        if (HoteamUI.Common.IsNullOrEmpty(pagePara.WebListView.CustomObjectTypeField) == false) {
            customObjectType = ctrlEvent.rowobject[pagePara.WebListView.CustomObjectTypeField];
        }
        paras.ObjectType = HoteamUI.Common.IsNullOrEmpty(customObjectType) ? InforCenter_Platform_GTypeFromID(paras.ObjectID) : customObjectType;
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
    }
    if (isHave == false && ctrlEvent.rowobject
    && HoteamUI.Common.IsNullOrEmpty(ctrlEvent.rowobject.EID) == false
    && (ctrlEvent.colName == "IMGICONTYPE" || ctrlEvent.colName == "ENAME")) {
        if (pagePara.ListCtrlPageName == "SmartListViewCtrl") {
            HoteamUI.UIManager.Sideslip({
                pagename: "ViewObject", paras: { SelectID: ctrlEvent.rowobject.EID, ListCtrlPageName: "SmartListViewCtrl", ListGuid: ctrlEvent.o.id }, width: "600"
            });


        }
        else {
            HoteamUI.UIManager.Popup({
                pagename: "ViewObject", paras: { SelectID: ctrlEvent.rowobject.EID, ListCtrlPageName: "ListViewCtrl" }, size: pagePara.WebListView.DetailsPageSize
            });
        }
    }
}
/*
通用页面可编辑列表相关JS
*/

//可编辑列表处理选择用户，用于支持单一用户属性
InforCenter_Platform_ObjectEditGrid_OnEditSingleUserValue = function (ctrlEvent) {
    var callback = function (data, ret) {
        if (ret != null && ret.length > 0) {
            ctrlEvent.setContent({ text: ret[0].ENAME, value: ret[0].EID });
        }
    }
    HoteamUI.UIManager.Popup("TreeCommonQuery", { Value: ctrlEvent.value, ItemName: "GroupToRoleToUser", LoadAndSelectType: "SingleLevel_SingleSelect", AllQuery: true }, callback, { ctrl: ctrlEvent }, "440*560");
}

InforCenter_Platform_ObjectEditGrid_OnEditSingleUserAutoComboxValue = function (ctrlEvent,objtype, infoname) {
    var functionName = "InforCenter_" + objtype + "_" + infoname + "_OnEditSingleUserAutoComboxValueOnCreate";
    if (window[functionName] && typeof window[functionName] == "function") {
       return HoteamUI.Common.ExeFunction(functionName, ctrlEvent);
    } else {
        var data = HoteamUI.DataService.Call("InforCenter.Organization.OrganizationDataService.GetUserDropdownList", { para: { ExtendJsonInfo: JSON.stringify({ FillEmpty: true }) } });

        return data;
    }
    
}

//处理选择用户，用于支持多用户用户属性
InforCenter_Platform_ObjectEditGrid_OnEditGridMutliUserValue = function (ctrlEvent) {
    var callback = function (data, ret) {
        if (ret != null && ret.length > 0) {
            var value = "";
            var text = "";
            // for (var i in ret) {
            for (var i = 0; i < ret.length; i++) {
                text = text + ";" + ret[i].ENAME;
                value = value + ";" + ret[i].EID;
            }
            if (HoteamUI.Common.IsNullOrEmpty(text) == false) {
                text = text.substring(1);
                value = value.substring(1);
            }
            ctrlEvent.setContent({ text: text, value: value });
        }
    }
    HoteamUI.UIManager.Popup("TreeCommonQuery", { Value: ctrlEvent.value, ItemName: "GroupToRoleToUser", LoadAndSelectType: "SingleLevel_MultiSelect", AllQuery: true }, callback, { id: ctrlEvent.o.id }, "440*560");
}

//处理选择用户，用于支持多用户用户属性 忽略公司ID
InforCenter_Platform_ObjectEditGrid_OnEditGridMultiUserValueIgnoreCompany = function (ctrlEvent) {
    var callback = function (data, ret) {
        if (ret != null && ret.length > 0) {
            var value = "";
            var text = "";
            // for (var i in ret) {
            for (var i = 0; i < ret.length; i++) {
                text = text + ";" + ret[i].ENAME;
                value = value + ";" + ret[i].EID;
            }
            if (HoteamUI.Common.IsNullOrEmpty(text) == false) {
                text = text.substring(1);
                value = value.substring(1);
            }
            ctrlEvent.setContent({ text: text, value: value });
        }
    }
    HoteamUI.UIManager.Popup("TreeCommonQuery", { Value: ctrlEvent.value, ItemName: "GroupToRoleToUserIgnoreCompanyID", LoadAndSelectType: "SingleLevel_MultiSelect" }, callback, { id: ctrlEvent.o.id }, "440*560");
}

//处理选择组，用于支持单一组属性
InforCenter_Platform_ObjectEditGrid_OnEditGridSingleGroupValue = function (ctrlEvent) {
    var callback = function (data, ret) {
        if (ret != null && ret.length > 0) {
            ctrlEvent.setContent({ text: ret[0].ENAME, value: ret[0].EID });
        }
    }
    HoteamUI.UIManager.Popup("TreeCommonQuery", { Value: ctrlEvent.value, ItemName: "GroupToGroup" }, callback, null, "440*560");
}
InforCenter_Platform_ObjectEditGrid_OnEditSingleGroupAutoComboxValue = function (ctrlEvent, objtype, infoname) {
    var functionName = "InforCenter_" + objtype + "_" + infoname + "_OnEditSingleGroupAutoComboxValueOnCreate";
    if (window[functionName] && typeof window[functionName] == "function") {
        HoteamUI.Common.ExeFunction(functionName, ctrlEvent);
    } else {
        var data = HoteamUI.DataService.Call("InforCenter.Organization.OrganizationDataService.GetGroupDropdownList", { para: { ExtendJsonInfo: JSON.stringify({ FillEmpty: true }) } });

        return data;
    }
}
//处理选择组，用于支持单一组属性
InforCenter_Platform_ObjectEditGrid_OnEditGridMutliGroupValue = function (ctrlEvent) {
    var callback = function (data, ret) {

        if (ret != null && ret.length > 0) {
            var value = "";
            var text = "";
            //for (var i in ret) {
            for (var i = 0; i < ret.length; i++) {
                text = text + ";" + ret[i].ENAME;
                value = value + ";" + ret[i].EID;
            }
            if (HoteamUI.Common.IsNullOrEmpty(text) == false) {
                text = text.substring(1);
                value = value.substring(1);
            }
            ctrlEvent.setContent({ text: text, value: value });
        }
    }
    HoteamUI.UIManager.Popup("ListCommonQuery", { Value: ctrlEvent.value, ItemName: "MultiGroupTreeListQuery" }, callback, null, "960*600");
}
//处理选择角色，用于支持单一角色属性
InforCenter_Platform_ObjectEditGrid_OnEditGridSingleRoleValue = function (ctrlEvent) {
    var callback = function (data, ret) {
        if (ret != null && ret.length > 0) {
            ctrlEvent.setContent({ text: ret[0].ENAME, value: ret[0].EID });
        }
    }
    HoteamUI.UIManager.Popup("ListCommonQuery", { Value: ctrlEvent.value, ItemName: "SingleRoleListSearch" }, callback, null, "960*600");
}
InforCenter_Platform_ObjectEditGrid_OnEditSingleRoleAutoComboxValue = function (ctrlEvent, objtype, infoname) {
    var functionName = "InforCenter_" + objtype + "_" + infoname + "_OnEditSingleRoleAutoComboxValueOnCreate";
    if (window[functionName] && typeof window[functionName] == "function") {
        HoteamUI.Common.ExeFunction(functionName, ctrlEvent);
    } else {
        var data = HoteamUI.DataService.Call("InforCenter.Organization.OrganizationDataService.GetRoleDropdownList", { para: { ExtendJsonInfo: JSON.stringify({ FillEmpty: true }) } });

        return data;
    }
}
//处理选择角色，用于支持多角色属性
InforCenter_Platform_ObjectEditGrid_OnEditGridMutliRoleValue = function (ctrlEvent) {
    var callback = function (data, ret) {
        if (ret != null && ret.length > 0) {
            var value = "";
            var text = "";
            // for (var i in ret) {
            for (var i = 0; i < ret.length; i++) {
                text = text + ";" + ret[i].ENAME;
                value = value + ";" + ret[i].EID;
            }
            if (HoteamUI.Common.IsNullOrEmpty(text) == false) {
                text = text.substring(1);
                value = value.substring(1);
            }
            ctrlEvent.setContent({ text: text, value: value });
        }
    }
    HoteamUI.UIManager.Popup("ListCommonQuery", { Value: ctrlEvent.value, ItemName: "RoleListSearch" }, callback, null, "960*600");
}

InforCenter_Platform_ObjectEditGrid_ObjectTypeListValue = function (ctrlEvent) {
    var ret = HoteamUI.DataService.Call("InforCenter.Rule.RuleDataService.GetObjectTypeList", {});
    if (ret == null) {
        return;
    }
    var empty = new Array(0);
    var step = 0;

    // for (var x in ret) {
    for (var i = 0; i < ret.length; i++) {
        i = parseInt(i);
        empty[i + step] = { Value: ret[i].Value, Text: ret[i].Text };
    }
    return empty;
}

InforCenter_Platform_EditGridColDataBindScript_StateValue = function (objInfo) {
    var ret = HoteamUI.DataService.Call("Hoteam.InforCenter.ObjectService.GetStateList", { para: { InfoName: objInfo.infoName, ObjectType: objInfo.objectType } });
    if (ret == null) {
        return;
    }
    var fillEmpty = true;
    var step = 0;
    var list = [];
    if (fillEmpty) {
        list[0] = { Value: "", Text: "" };
        step = 1;
    }

    for (var x = 0; x < ret.length; x++) {
        list[x + step] = { Value: ret[x].Key, Text: ret[x].Value };
    }
    return list;
}


InforCenter_Platform_EditGridColDataBindScript_SubDataModelValue = function (objInfo) {
    var ret = HoteamUI.DataService.Call("Hoteam.InforCenter.ObjectService.GetSubDataModelList",
        { para: { InfoName: objInfo.infoName, ObjType: objInfo.objectType } });
    if (ret == null) {
        return;
    }
    var fillEmpty = true;
    var list = [];
    var step = 0;
    if (fillEmpty) {
        list[0] = { Value: "", Text: "" };
        step = 1;
    }

    for (var x = 0; x < ret.length; x++) {
        list[x + step] = { Value: ret[x].Key, Text: ret[x].Value };
    }
    return list;
}

InforCenter_Platform_EditGridColDataBindScript_UnionDataModelValue = function (objInfo) {
    var ret = HoteamUI.DataService.Call("Hoteam.InforCenter.ObjectService.GetUnionDataModelList",
        { para: { InfoName: objInfo.infoName, ObjType: objInfo.objectType, UnionName: objInfo.unionName } });
    if (ret == null) {
        return;
    }
    var fillEmpty = true;
    var list = [];
    var step = 0;
    if (fillEmpty) {
        list[0] = { Value: "", Text: "" };
        step = 1;
    }

    for (var x = 0; x < ret.length; x++) {
        list[x + step] = { Value: ret[x].Key, Text: ret[x].Value };
    }
    return list;
}

InforCenter_Platform_EditGridColDataBindScript_LinkChildDataModelValue = function (objInfo) {
    var ret = HoteamUI.DataService.Call("Hoteam.InforCenter.ObjectService.GetLinkChildDataModelList",
        { para: { ObjType: objInfo.objectType } });
    if (ret == null) {
        return;
    }
    var fillEmpty = true;
    var list = [];
    var step = 0;
    if (fillEmpty) {
        list[0] = { Value: "", Text: "" };
        step = 1;
    }

    for (var x = 0; x < ret.length; x++) {
        list[x + step] = { Value: ret[x].Key, Text: ret[x].Value };
    }
    return list;
}

//ObjectTypeList
InforCenter_Platform_EditGridColDataBindScript_ObjectTypeListValue = function (objInfo) {
    if (objInfo) {
        var ret = HoteamUI.DataService.Call("Hoteam.InforCenter.ObjectService.GetObjectTypeList", { para: { ObjectType: objInfo.objectType } });
    }
    if (ret == null) {
        return;
    }
    var fillEmpty = true;
    var list = [];
    var step = 0;
    if (fillEmpty) {
        list[0] = { Value: "", Text: "" };
        step = 1;
    }

    for (var x = 0; x < ret.length; x++) {
        list[x + step] = { Value: ret[x].Key, Text: ret[x].Value };
    }
    return list;
}

//LovListValue
InforCenter_Platform_EditGridColDataBindScript_LovListValue = function (objInfo) {
    var ret = HoteamUI.DataService.Call("InforCenter.Enumeration.EnumerationService.GetLovListItemFromObj",
        { para: { InfoName: objInfo.infoName, ObjType: objInfo.objectType } });
    if (ret == null) {
        return;
    }
    var fillEmpty = true;
    var list = [];
    var step = 0;
    if (fillEmpty) {
        list[0] = { Value: "", Text: "" };
        step = 1;
    }

    for (var x = 0; x < ret.length; x++) {
        list[x + step] = { Value: ret[x].Key, Text: ret[x].Value };
    }
    return list;
}

//LovValue
InforCenter_Platform_EditGridColDataBindScript_LovValue = function (objInfo) {
    var ret = HoteamUI.DataService.Call("InforCenter.Enumeration.EnumerationService.GetLov", {});
    if (ret == null) {
        return;
    }
    var fillEmpty = true;
    var list = [];
    var step = 0;
    if (fillEmpty) {
        list[0] = { Value: "", Text: "" };
        step = 1;
    }

    for (var x = 0; x < ret.length; x++) {
        list[x + step] = { Value: ret[x].Key, Text: ret[x].Value };
    }
    return list;
}

//ObjectEnumValue
InforCenter_Platform_EditGridColDataBindScript_ObjectEnumValue = function (objInfo) {
    var ret = HoteamUI.DataService.Call("InforCenter.Enumeration.EnumerationService.GetOjbectEnumerationItem",
        { para: { InfoName: objInfo.infoName, ObjType: objInfo.objectType } });
    if (ret == null) {
        return;
    }
    var fillEmpty = true;
    var list = [];
    var step = 0;
    if (fillEmpty) {
        list[0] = { Value: "", Text: "" };
        step = 1;
    }

    for (var x = 0; x < ret.length; x++) {
        list[x + step] = { Value: ret[x].Key, Text: ret[x].Value };
    }
    return list;
}


//MajorMinorVersionValue
InforCenter_Platform_EditGridColDataBindScript_MajorMinorVersionValue = function (objInfo) {
    var ret = HoteamUI.DataService.Call("InforCenter.InforCenter.QueryMachineService.GetMajorVersionFormatValues",
        { para: { ObjType: objInfo.objectType } });
    if (ret == null) {
        return;
    }
    var fillEmpty = true;
    var list = [];
    var step = 0;
    if (fillEmpty) {
        list[0] = { Value: "", Text: "" };
        step = 1;
    }

    for (var x = 0; x < ret.length; x++) {
        list[x + step] = { Value: ret[x].Key, Text: ret[x].Value };
    }
    return list;
}


//MinorVersionValue
InforCenter_Platform_EditGridColDataBindScript_MinorVersionValue = function (objInfo) {
    var ret = HoteamUI.DataService.Call("InforCenter.InforCenter.QueryMachineService.GetMinorVersionFormatValues",
        { para: { ObjType: objInfo.objectType } });
    if (ret == null) {
        return;
    }
    var fillEmpty = true;
    var list = [];
    var step = 0;
    if (fillEmpty) {
        list[0] = { Value: "", Text: "" };
        step = 1;
    }

    for (var x = 0; x < ret.length; x++) {
        list[x + step] = { Value: ret[x].Key, Text: ret[x].Value };
    }
    return list;
}


InforCenter_Platform_ObjectEditGrid_ExecInfoDataSource = function (ctrlEvent) {
    var curRow = ctrlEvent.o.GetRowContent(ctrlEvent.o.GetEditRowID());
    var para = {
        para: {
            FlagName: curRow.COLNAME, ObjectType: curRow.OBJECTTYPENAME, InfoName: curRow.COLNAME,
            PID: ctrlEvent.o.ContainerID(), ShowWhenQuery: false
        }
    };
    var datasourceStr = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GetInfoDataSource", para);
    var dataSource = JSON.parse(datasourceStr);
    var callback = function (data, ret) {
        if (ret != null && ret.length > 0) {
            ctrlEvent.setContent({ text: ret[0].ENAME, value: ret[0].EID });
        }
    }
    var para = JSON.parse(dataSource.sPara);
    para.pagename = dataSource.PageName;
    para.callback = callback;
    para.data = datasourceStr;
    para.paras = JSON.parse(dataSource.sPara);
    HoteamUI.UIManager.Popup(para);
}
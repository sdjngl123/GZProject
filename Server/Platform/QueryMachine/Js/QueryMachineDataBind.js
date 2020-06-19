//处理选择角色，用于支持单一角色属性
InforCenter_Platform_Object_OnBindSingleRoleValue = function (ctrlEvent) {
    var callback = function (data, ret) {
        var o = HoteamUI.Control.Instance(data.id);
        if (ret != null && ret.length > 0) {
            o.SetTextValueData(ctrlEvent.id, { value: ret[0].EID, text: ret[0].ENAME });
        }
    }
    HoteamUI.UIManager.Popup("ListCommonQuery", { Value: ctrlEvent.value, ItemName: "SingleRoleListSearch" }, callback, { id: ctrlEvent.o.id }, "960*600");
}

//处理选择组，用于支持单一组属性
InforCenter_Platform_Object_OnBindSingleGroupValue = function (ctrlEvent) {
    var callback = function (data, ret) {
        var o = HoteamUI.Control.Instance(data.id);
        if (ret != null && ret.length > 0) {
            o.SetTextValueData(ctrlEvent.id, { value: ret[0].EID, text: ret[0].ENAME });
        }
    }
    HoteamUI.UIManager.Popup("TreeCommonQuery", { Value: ctrlEvent.value, ItemName: "GroupToGroup" }, callback, { id: ctrlEvent.o.id }, "440*560");
}


//处理选择用户，用于支持单一用户属性
InforCenter_Platform_Object_OnBindSingleUserValue = function (ctrlEvent) {
    var callback = function (data, ret) {
        var o = HoteamUI.Control.Instance(data.id);
        if (ret != null && ret.length > 0) {
            o.SetTextValueData(ctrlEvent.id, { value: ret[0].EID, text: ret[0].ENAME });
        }
    }
    HoteamUI.UIManager.Popup("TreeCommonQuery", { Value: ctrlEvent.value, ItemName: "GroupToRoleToUser", AllQuery: true }, callback, { id: ctrlEvent.o.id }, "440*560");
}

//处理选择角色，用于支持多角色属性
InforCenter_Platform_QueryMachine_OnBindingMutliRoleValue = function (ctrlEvent) {
    var callback = function (data, ret) {
        if (ret != null && ret.length > 0) {
            var value = "";
            var text = "";
            for (var i = 0; i < ret.length; i++) {
                text = text + ";" + ret[i].ENAME;
                value = value + ";" + ret[i].EID;
            }
            if (HoteamUI.Common.IsNullOrEmpty(text) == false) {
                text = text.substring(1);
                value = value.substring(1);
            }
            var o = HoteamUI.Control.Instance(data.id);
            o.SetTextValueData(ctrlEvent.id, { value: value, text: text });
        }
    }
    HoteamUI.UIManager.Popup("ListCommonQuery", { Value: ctrlEvent.value, ItemName: "RoleListSearch" }, callback, { id: ctrlEvent.o.id }, "960*600");
}
//处理选择组，用于支持多组属性
InforCenter_Platform_QueryMachine_OnBindingMutliGroupValue = function (ctrlEvent) {
    var callback = function (data, ret) {

        if (ret != null && ret.length > 0) {
            var value = "";
            var text = "";
            for (var i = 0; i < ret.length; i++) {
                text = text + ";" + ret[i].ENAME;
                value = value + ";" + ret[i].EID;
            }
            if (HoteamUI.Common.IsNullOrEmpty(text) == false) {
                text = text.substring(1);
                value = value.substring(1);
            }
            var o = HoteamUI.Control.Instance(data.id);
            o.SetTextValueData(ctrlEvent.id, { value: value, text: text });
        }
    }
    HoteamUI.UIManager.Popup("ListCommonQuery", { Value: ctrlEvent.value, ItemName: "MultiGroupTreeListQuery" }, callback, { id: ctrlEvent.o.id }, "960*600");
}

//处理选择用户，用于支持多用户用户属性
InforCenter_Platform_QueryMachine_OnBindingMutliUserValue = function (ctrlEvent) {
    var callback = function (data, ret) {
        if (ret != null && ret.length > 0) {
            var value = "";
            var text = "";
            for (var i = 0; i < ret.length; i++) {
                text = text + ";" + ret[i].ENAME;
                value = value + ";" + ret[i].EID;
            }
            if (HoteamUI.Common.IsNullOrEmpty(text) == false) {
                text = text.substring(1);
                value = value.substring(1);
            }
            var o = HoteamUI.Control.Instance(data.id);
            o.SetTextValueData(ctrlEvent.id, { value: value, text: text });
        }
    }
    HoteamUI.UIManager.Popup("ListCommonQuery", { Value: ctrlEvent.value, ItemName: "MultiUserTreeListQuery" }, callback, { id: ctrlEvent.o.id }, "960*600");
}

InforCenter_Platform_QueryMachineDataBind_StateValue = function (objInfo) {
    return InforCenter_Platform_EditGridColDataBindScript_StateValue(objInfo);
}

InforCenter_Platform_QueryMachineDataBind_SubDataModelValue = function (objInfo) {
    return InforCenter_Platform_EditGridColDataBindScript_SubDataModelValue(objInfo);
}

InforCenter_Platform_QueryMachineDataBind_UnionDataModelValue = function (objInfo) {
    return InforCenter_Platform_EditGridColDataBindScript_UnionDataModelValue(objInfo);
}

InforCenter_Platform_QueryMachineDataBind_LinkChildDataModelValue = function (objInfo) {
    return InforCenter_Platform_EditGridColDataBindScript_LinkChildDataModelValue(objInfo);
}

InforCenter_Platform_QueryMachineDataBind_ObjectTypeListValue = function (objInfo) {
    return InforCenter_Platform_EditGridColDataBindScript_ObjectTypeListValue(objInfo);
}

InforCenter_Platform_QueryMachineDataBind_LovListValue = function (objInfo) {
    return InforCenter_Platform_EditGridColDataBindScript_LovListValue(objInfo);
}


InforCenter_Platform_QueryMachineDataBind_LovValue = function (objInfo) {
    return InforCenter_Platform_EditGridColDataBindScript_LovValue(objInfo);
}

InforCenter_Platform_QueryMachineDataBind_ObjectEnumValue = function (objInfo) {
    return InforCenter_Platform_EditGridColDataBindScript_ObjectEnumValue(objInfo);
}


InforCenter_Platform_QueryMachineDataBind_MajorMinorVersionValue = function (objInfo) {
    return InforCenter_Platform_EditGridColDataBindScript_MajorMinorVersionValue(objInfo);
}

InforCenter_Platform_QueryMachineDataBind_MinorVersionValue = function (objInfo) {
    return InforCenter_Platform_EditGridColDataBindScript_MinorVersionValue(objInfo);
}

InforCenter_Platform_QueryMachineDataBind_ObjectIDValue = function (ctrlEvent) {
    var data = InforCenter_Platform_Object_GetObjectData(ctrlEvent.id);
    var para = {
        para: {
            FlagName: data.COLNAME, ObjectType: data.OBJECTTYPENAME, InfoName: data.COLNAME,
            PID: ctrlEvent.o.ContainerID(), ShowWhenQuery: false
        }
    };
    var datasourceStr = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GetInfoDataSource", para);
    var dataSource = JSON.parse(datasourceStr);
    var callback = function (data, ret) {
        if (ret != null && ret.length > 0) {
            ctrlEvent.o.SetTextValueData(ctrlEvent.id, { value: ret[0].EID, text: ret[0].ENAME });
        }
    }
    var para = JSON.parse(dataSource.sPara);
    para.pagename = dataSource.PageName;
    para.callback = callback;
    para.data = datasourceStr;
    para.paras = JSON.parse(dataSource.sPara);
    HoteamUI.UIManager.Popup(para);
}
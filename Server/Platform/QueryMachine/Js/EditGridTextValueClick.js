

//处理选择用户，用于支持单一用户属性
InforCenter_Platform_QueryMachine_OnEditGridSingleUserValue = function (ctrlEvent) {
    var callback = function (data, ret) {
        if (ret != null && ret.length > 0) {
            ctrlEvent.setContent({ text: ret[0].ENAME ,value: ret[0].EID});
        }
    }
    HoteamUI.UIManager.Popup("ListCommonQuery", { Value: ctrlEvent.value, ItemName: "SingleUserTreeListQuery"}, callback, null, "960*600");
}


//处理选择用户，用于支持多用户用户属性
InforCenter_Platform_QueryMachine_OnEditGridMutliUserValue = function (ctrlEvent) {
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
            ctrlEvent.setContent({ text: text, value: value });
        }
    }
    HoteamUI.UIManager.Popup("ListCommonQuery", { Value: ctrlEvent.value, ItemName: "MultiUserTreeListQuery" }, callback, null, "960*600");
}
//处理选择组，用于支持单一组属性
InforCenter_Platform_QueryMachine_OnEditGridSingleGroupValue = function (ctrlEvent) {
    var callback = function (data, ret) {
        if (ret != null && ret.length > 0) {
            ctrlEvent.setContent({ text: ret[0].ENAME, value: ret[0].EID });
        }
    }
    HoteamUI.UIManager.Popup("ListCommonQuery", { Value: ctrlEvent.value, ItemName: "SingleGroupTreeListQuery" }, callback, null, "960*600");
}
//处理选择组，用于支持单一组属性
InforCenter_Platform_QueryMachine_OnEditGridMutliGroupValue = function (ctrlEvent) {
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
            ctrlEvent.setContent({ text: text, value: value });
        }
    }
    HoteamUI.UIManager.Popup("ListCommonQuery", { Value: ctrlEvent.value, ItemName: "MultiGroupTreeListQuery" }, callback, null, "960*600");
}
//处理选择角色，用于支持单一角色属性
InforCenter_Platform_QueryMachine_OnEditGridSingleRoleValue = function (ctrlEvent) {
    var callback = function (data, ret) {
        if (ret != null && ret.length > 0) {
            ctrlEvent.setContent({ text: ret[0].ENAME, value: ret[0].EID });
        }
    }
    HoteamUI.UIManager.Popup("ListCommonQuery", { Value: ctrlEvent.value, ItemName: "SingleRoleListSearch" }, callback, null, "960*600");
}
//处理选择角色，用于支持多角色属性
InforCenter_Platform_QueryMachine_OnEditGridMutliRoleValue = function (ctrlEvent) {
    var callback = function (data, ret) {
        if (ret != null && ret.length > 0) {
            var value = "";
            var text = "";
            for (var i = 0; i < ret.length;i++){
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
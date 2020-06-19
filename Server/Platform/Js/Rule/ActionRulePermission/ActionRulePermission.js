//显示授权对象页面
InforCenter_Platform_ActionRulePermission_ShowPermissionActorValuePage = function (ctrlEvent) {
    var callback = function (data, ret) {
        if (ret != null) {
            var o = HoteamUI.Control.Instance(data.id);
            o.SetText(ret.PermissionActorValueText);
            o.SetValue(ret.PermissionActorValue);
        }
    }
    var para = {};
    //获取页面参数
    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    para = page.GetPara();
    //获取授权对象参数
    var permissionActorValue = ctrlEvent.o.GetValue();
    if (HoteamUI.Common.IsNullOrEmpty(permissionActorValue) == false) {
        para.PermissionActorValue = JSON.parse(permissionActorValue);
    }
    HoteamUI.UIManager.Popup("PermissionActorValue", para, callback, { id: ctrlEvent.o.id });
}

//显示授权操作页面
InforCenter_Platform_ActionRulePermission_ShowPermissionActionValuePage = function (ctrlEvent) {
    var callback = function (data, ret) {
        if (ret != null) {
            var o = HoteamUI.Control.Instance(data.id);
            o.SetText(ret.PermissionActionValueText);
            o.SetValue(ret.PermissionActionValue);
        }
    }
    var para = {};
    //获取页面参数
    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    para = page.GetPara();
    //获取授权操作参数
    var permissionActionValue = ctrlEvent.o.GetValue();
    if (HoteamUI.Common.IsNullOrEmpty(permissionActionValue) == false) {
        para.PermissionActionValue = JSON.parse(permissionActionValue);
    }
    HoteamUI.UIManager.Popup("PermissionAction", para, callback, { id: ctrlEvent.o.id });
}

//可编辑列表自动生成的可编辑列表的PermissionActorValue方法（包含授权类型和授权对象）
InforCenter_Platform_ActionRulePermission_ShowPermissionActorValueOnEditGrid = function (ctrlEvent) {
    var callback = function (data, ret) {
        if (ret != null) {
            ctrlEvent.setContent({ text: ret.PermissionActorValueText, value: ret.PermissionActorValue });
        }
    }
    var para = {};
    //获取页面参数
    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    para = $.extend(para, page.GetPara());
    //获取授权对象参数
    var permissionActorValue = ctrlEvent.value;
    if (HoteamUI.Common.IsNullOrEmpty(permissionActorValue) == false) {
        para.PermissionActorValue = JSON.parse(permissionActorValue);
    }
    HoteamUI.UIManager.Popup("PermissionActorValue", para, callback, { id: ctrlEvent.o.id });
}


InforCenter_Platform_ActionRulePermission_ShowPermissionActorTypeDLL = function (ctrlEvent) {
    return InforCenter_Platform_ObjectPermission_ShowPermissionActorTypeDLL(ctrlEvent);
}

InforCenter_Platform_ActionRulePermission_ShowLinkPermissionActorTypeDLL = function (ctrlEvent) {
    var data = HoteamUI.DataService.Call("InforCenter.Rule.RuleDataService.GetPermissionTypeList", { para: { UseBy: "Link" } });
    if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
        return data;
    }
}

InforCenter_Platform_ActionRulePermission_ShowCreatePermissionActorTypeDLL = function (ctrlEvent) {
    var data = HoteamUI.DataService.Call("InforCenter.Rule.RuleDataService.GetPermissionTypeList", { para: { UseBy: "Common" } });
    if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
        return data;
    }
}
InforCenter_Platform_ActionRulePermission_ShowCompanyRulePermissionActorTypeDLL = function (ctrlEvent) {

    var pid = ctrlEvent.o.ContainerID();
    var para = HoteamUI.Page.GetContainerPara(pid);
    if (!para) {
        para = {};
    }
    para.IgnoreCompanyID = true;
    var pageName = HoteamUI.Page.Instance(pid).PageName();
    HoteamUI.Page.SetContainerParas(pid, pageName, para);

    var data = HoteamUI.DataService.Call("InforCenter.Rule.RuleDataService.GetPermissionTypeList", { para: { UseBy: "Company" } });
    if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
        return data;
    }
}

InforCenter_Platform_ActionRulePermission_ShowPermissionActorTypeDLLChange = function (ctrlEvent) {
    var editRow = ctrlEvent.o.GetEditRowID();
    //var actorType = ctrlEvent.o.GetCellContent(editRow, "PERMISSIONACTORTYPE");
    var actorType = ctrlEvent.value;
    ctrlEvent.o.SetCellContent(editRow, "PERMISSIONACTORVALUE", "", "", true);
    //判断是否是弹窗
    var plugin = HoteamUI.DataService.Call("InforCenter.Rule.RulePageService.GetActionRulePermissionTypePlugin", { para: { PermissionType: actorType } });
    if (plugin && plugin.JSMethod) {
        var para = {};
        para.ActorValue = ctrlEvent.o.GetCellContent(editRow, "PERMISSIONACTORVALUE").value;
        para.PermissionType = actorType;
        para.ctrlEvent = ctrlEvent;
        para.UseBy = plugin.Group;
        if (plugin.IsPopup) {
            var callback = function (data, ret) {
                ctrlEvent.o.SetCellContent(editRow, "PERMISSIONACTORVALUE", ret.Text, ret.Value, true);
            }

            para.ctrlEvent.Callback = callback;

            HoteamUI.Common.ExeFunction(plugin.JSMethod, para);
        } else {
            var ret = HoteamUI.Common.ExeFunction(plugin.JSMethod, para);
            ctrlEvent.o.SetCellContent(editRow, "PERMISSIONACTORVALUE", ret.Text, ret.Value, true);
        }
    }
}

//不需要弹框的设置值，如对象创建者，对象所属者等
InforCenter_Platform_ActionRulePermissionToOrganization_SetPermissionValue = function (para) {
    if (para) {
        var permissionType = para.PermissionType;
        var permissionActorValueText = HoteamUI.Language.Lang(permissionType, "Title");
        var permissionActroValue = "{\"ActorType\":\"" + permissionType + "\"}";
        return { Text: permissionActorValueText, Value: permissionActroValue };
    }
}

//只包括授权对象，不包含授权类型的可编辑列表点击事件
InforCenter_Platform_ActionRulePermission_ShowPermissionActorValueOnEditGridWithoutType = function (ctrlEvent) {

    var editRow = ctrlEvent.o.GetEditRowID();
    var actorType = ctrlEvent.o.GetCellContent(editRow, "PERMISSIONACTORTYPE").value;

    var plugin = HoteamUI.DataService.Call("InforCenter.Rule.RulePageService.GetActionRulePermissionTypePlugin", { para: { PermissionType: actorType } });
    if (plugin && plugin.IsPopup == true) {

        var para = {};
        para.ActorValue = ctrlEvent.value;
        para.PermissionType = actorType;
        para.ctrlEvent = ctrlEvent;
        para.UseBy = plugin.Group;

        var callback = function (data, ret) {
            if (ret) {
                ctrlEvent.setContent({ text: ret.Text, value: ret.Value });
            }
        }
        para.ctrlEvent.Callback = callback;
        HoteamUI.Common.ExeFunction(plugin.JSMethod, para);
    }
}


InforCenter_Platform_ActionRulePermission_PermissionToUserActorValueOnClick = function (para) {
    if (para) {
        var pid = para.ctrlEvent.o.ContainerID();
        var pagePara = HoteamUI.Page.Instance(pid).GetPara();
        if (pagePara && pagePara.IgnoreCompanyID) {
            para.QueryItemName = "GroupToRoleToUserIgnoreCompanyID";
            InforCenter_Platform_ActionRulePermission_PermissionToOrgActorValueOnClick(para);
        } else {
            para.QueryItemName = "GroupToRoleToUser";
            InforCenter_Platform_ActionRulePermission_PermissionToOrgActorValueOnClick(para);
        }
    }
}

InforCenter_Platform_ActionRulePermission_PermissionToRoleActorValueOnClick = function (para) {
    if (para) {
        var pid = para.ctrlEvent.o.ContainerID();
        var pagePara = HoteamUI.Page.Instance(pid).GetPara();
        if (pagePara && pagePara.IgnoreCompanyID) {
            para.QueryItemName = "RolesToRoleIgnoreCompanyID";
            InforCenter_Platform_ActionRulePermission_PermissionToOrgActorValueOnClick(para);
        } else {
            para.QueryItemName = "RolesToRole";
            InforCenter_Platform_ActionRulePermission_PermissionToOrgActorValueOnClick(para);
        }

    }
}

InforCenter_Platform_ActionRulePermission_PermissionToGroupRoleActorValueOnClick = function (para) {
    if (para) {
        var ctrlEvent = para.ctrlEvent;
        var actorValue = para.ActorValue;
        var type = para.PermissionType;
        var pid = para.ctrlEvent.o.ContainerID();
        var pagePara = HoteamUI.Page.Instance(pid).GetPara();
        if (pagePara && pagePara.IgnoreCompanyID) {
            var queryItemName = "GroupToRoleIgnoreCompanyID";
        } else {
            var queryItemName = "GroupToRole";
        }
        var editRow = ctrlEvent.o.GetEditRowID();
        var actorValueData = ctrlEvent.o.GetCellContent(editRow, "PERMISSIONACTORVALUE");
        if (actorValue) {
            var actor = JSON.parse(actorValue);
            actor = actor.ActorValue;
        } else {
            var actor = "";
        }

        var callback = function (data, ret) {
            if (ret && ret.length > 0) {
                var valueString = "";
                var nameString = "";
                for (var i = 0; i < ret.length; i++) {
                    valueString += ";" + ret[i].EID;
                    var groupid = ret[i].GROUPEID;
                    var group = InforCenter_Platform_Object_GetObjectData(groupid);
                    nameString += ";" + group.ENAME + "|" + ret[i].ENAME;
                }
                if (valueString.length > 0) {
                    valueString = valueString.substring(1);
                    nameString = nameString.substring(1);
                }
                var value = "{\"ActorValue\":\"" + valueString + "\",\"ActorType\":\"" + data.permissionType + "\"}";
                var ret = { Text: nameString, Value: value };
                ctrlEvent.Callback(data, ret);
            }
        }

        HoteamUI.UIManager.Popup("TreeCommonQuery", { Value: actor, ItemName: queryItemName, LoadAndSelectType: "SingleLevel_SingleSelect" }, callback, { permissionType: type }, "400*500");

    }
}

InforCenter_Platform_ActionRulePermission_PermissionToGroupActorValueOnClick = function (para) {
    if (para) {
        var pid = para.ctrlEvent.o.ContainerID();
        var pagePara = HoteamUI.Page.Instance(pid).GetPara();
        if (pagePara && pagePara.IgnoreCompanyID) {
            para.QueryItemName = "GroupToGroupIgnoreCompanyID";
        } else {
            para.QueryItemName = "GroupToGroup";
        }
        InforCenter_Platform_ActionRulePermission_PermissionToOrgActorValueOnClick(para);
    }
}

InforCenter_Platform_ActionRulePermission_PermissionToOrgActorValueOnClick = function (para) {
    var ctrlEvent = para.ctrlEvent;
    var actorValue = para.ActorValue;
    var type = para.PermissionType;
    var queryItemName = para.QueryItemName;
    var editRow = ctrlEvent.o.GetEditRowID();
    var actorValueData = ctrlEvent.o.GetCellContent(editRow, "PERMISSIONACTORVALUE");
    if (actorValue) {
        var actor = JSON.parse(actorValue);
        actor = actor.ActorValue;
    } else {
        var actor = "";
    }

    var callback = function (data, ret) {
        if (ret && ret.length > 0) {
            var valueString = "";
            var nameString = "";
            for (var i = 0; i < ret.length; i++) {
                valueString += ";" + ret[i].EID;
                nameString += ";" + ret[i].ENAME;
            }
            if (valueString.length > 0) {
                valueString = valueString.substring(1);
                nameString = nameString.substring(1);
            }
            var value = "{\"ActorValue\":\"" + valueString + "\",\"ActorType\":\"" + data.permissionType + "\"}";
            var ret = { Text: nameString, Value: value };
            ctrlEvent.Callback(data, ret);
        }
    }

    HoteamUI.UIManager.Popup("TreeCommonQuery", { Value: actor, ItemName: queryItemName, LoadAndSelectType: "SingleLevel_SingleSelect" }, callback, { permissionType: type }, "400*500");

}

//InforCenter_Platform_ActionRulePermissionToOrganization_ShowSelecter = function (ctrlEvent, selectMode, permissionType) {
//    var editRow = ctrlEvent.o.GetEditRowID();
//    var actorValueData = ctrlEvent.o.GetCellContent(editRow, "PERMISSIONACTORVALUE");
//    var actorValue = "";
//    if (actorValueData.value) {
//        var actorData = JSON.parse(actorValueData.value);
//        actorValue = actorData.ActorValue;
//    }
//    var callback = function (data, ret) {
//        var o = HoteamUI.Control.Instance(data.id);
//        if (ret != null) {
//            if (ret.PermissionActorType == "PermissionToOwnGroup" || ret.PermissionActorType == "PermissionToGroup") {
//                var editRow = o.GetEditRowID();
//                ctrlEvent.setContent({ text: ret.PermissionActorValueText, value: ret.PermissionActorValue });
//            }
//            if (ret.length > 0) {
//                var valueString = "";
//                var nameString = "";
//                for (var i = 0; i < ret.length; i++) {
//                    valueString += ";" + ret[i].EID;
//                    if (data.selectMode && data.selectMode == "GroupToRole") {
//                        var groupid = ret[i].GROUPEID;
//                        var group = InforCenter_Platform_Object_GetObjectData(groupid);
//                        nameString += ";" + group.ENAME + "|" + ret[i].ENAME;
//                    } else {
//                        nameString += ";" + ret[i].ENAME;
//                    }
//                }
//                if (valueString.length > 0) {
//                    valueString = valueString.substring(1);
//                    nameString = nameString.substring(1);
//                }
//                var value = "{\"ActorValue\":\"" + valueString + "\",\"ActorType\":\"" + permissionType + "\"}";
//                var editRow = o.GetEditRowID();
//                ctrlEvent.setContent({ text: nameString, value: value });
//            }
//        }
//    }
//    if (permissionType == "PermissionToOwnGroup" || permissionType == "PermissionToGroup") {
//        var paras = {};
//        if (!actorData) {
//            actorData = {};
//            actorData.ActorType = permissionType;
//        }
//        actorData.DisableActorTypeDDL = true;
//        paras.PermissionActorValue = actorData;
//        HoteamUI.UIManager.Popup("PermissionActorValue", paras, callback, { id: ctrlEvent.o.id });
//    } else {
//        InforCenter_Platform_OrganizationSelecter(actorValue, selectMode, "SingleLevel_MultiSelect", callback, ctrlEvent.o.id);
//    }
//}



//----------------------------保存列表数据 开始------------------------
InforCenter_Platform_ActionRulePermission_SavePermission = function (para) {
    InforCenter_Platform_Permission_SavePermission(para, false);
}

InforCenter_Platform_ActionRuleMessagePermission_SavePermission = function (para) {
    InforCenter_Platform_Permission_SavePermission(para, true);
}

InforCenter_Platform_Permission_SavePermission = function (para, isMessagePermission) {
    if (para && para.length > 1) {
        var listid = para[1].ListID;
        var dataService = para[1].DataService;
        if (!dataService) {
            dataService = "Hoteam.InforCenter.EditWebListViewService.SaveEditGrid";
        }
        var initData = para[1].initData;
        var editGrid = HoteamUI.Control.Instance(listid);
        if (!editGrid.SaveEditCell()) {
            return;
        }

        if (editGrid.GetRegexStatus() == false) {
            return;
        }

        //判断是否存在重复
        var griddata = editGrid.SaveGridRows();
        var permissionList = []
        if (griddata && griddata.success == true && griddata.rowsObject.length > 0) {
            for (var i = 0; i < griddata.rowsObject.length; i++) {
                var row = griddata.rowsObject[i];
                for (var j = 0; j < permissionList.length; j++) {
                    if (isMessagePermission == false && row.PERMISSIONACTORVALUE.value == permissionList[j]) {
                        editGrid.UnSelectAll()
                        editGrid.SetSelectedRow(i + 1);
                        var msg = HoteamUI.Language.Lang("ActionRulePermission.SamePermission");
                        HoteamUI.UIManager.Popup("Confirm", { pageMode: "OK", message: msg });
                        return;
                    } else if (isMessagePermission == true && row.MESSAGEACTORVALUE.value == permissionList[j]) {
                        editGrid.UnSelectAll()
                        editGrid.SetSelectedRow(i + 1);
                        var msg = HoteamUI.Language.Lang("ActionRulePermission.SamePermission");
                        HoteamUI.UIManager.Popup("Confirm", { pageMode: "OK", message: msg });
                        return;
                    }
                }
                if (isMessagePermission == true) {
                    permissionList.push(row.MESSAGEACTORVALUE.value);
                } else {
                    permissionList.push(row.PERMISSIONACTORVALUE.value);
                }
            }
        }

        if (editGrid.GetEditData) {
            var dataServicePara = {};
            var editData = editGrid.GetEditData();
            //组装editGrid用于保存数据
            var col = para[1].ColName;
            editData = InforCenter_Platform_ActionRulePermission_GetEditData(editData, para[1].USEBY, col);
            dataServicePara = InforCenter_Platform_EditListViewCtrl_EditData(editData, initData, para);
            if (dataService) {
                dataServicePara = $.extend(true, {}, dataServicePara, para[1].DataServicePara);
                if (HoteamUI.DataService.Call(dataService, { para: dataServicePara }) == true) {
                    //保存成功，设为初始状态
                    editGrid.SaveEditData();
                    InforCenter_Platform_MenuCtrl_InnerReceiveServerData(para[0], { confirm: "OK" });
                }
            }
        }
    }
}

InforCenter_Platform_ActionRulePermission_GetEditData = function (editData, useby, col) {
    var data = {};
    //获取ACTION
    var actionListdata = HoteamUI.DataService.Call("Hoteam.InforCenter.RuleDataService.GetActionListData", { para: { UseBy: useby } });
    var actionList = [];
    if (actionListdata) {
        for (var i = 0; i < actionListdata.length; i++) {
            actionList.push(actionListdata[i].Name);
        }
    }
    if (editData.add && editData.add.length > 0) {
        data.add = [];
        data.add = InforCenter_Platform_ActionRulePermission_GetAddEditData(editData.add, actionList, col);
    }
    if (editData.edit && editData.edit.length > 0) {
        data.edit = [];
        data.edit = InforCenter_Platform_ActionRulePermission_GetAddEditData(editData.edit, actionList, col);
    }
    if (editData.remove && editData.remove.length > 0) {
        data.remove = [];
        data.remove = InforCenter_Platform_ActionRulePermission_GetAddEditData(editData.remove, actionList, col);
    }
    return data;
}

InforCenter_Platform_ActionRulePermission_GetAddEditData = function (editdata, actionList, col) {
    var data = [];
    for (var i = 0; i < editdata.length; i++) {
        var row = editdata[i];
        var newrow = {};
        var actionvalue = {};
        var allowActions = {}; allowActions.AllowActions = "";
        var denyActions = {}; denyActions.DenyActions = "";
        for (var item in row) {
            if (!row.hasOwnProperty(item)) {
                continue;
            }
            //判断是否在Action里
            if (InforCenter_Platform_ActionRulePermission_ExistActionList(item, actionList)) {
                if (row[item] == "0" || row[item] == 0) {
                    denyActions.DenyActions += ";" + item;
                }
                if (row[item] == "1" || row[item] == 1) {
                    allowActions.AllowActions += ";" + item;
                }
            } else {
                newrow[item] = row[item];
            }
        }
        if (!allowActions.AllowActions && !denyActions.DenyActions) {
            newrow[col] = '{"AllowActions":""}';
            //newrow.PERMISSIONACTIONVALUE = '{"AllowActions":""}';
            data.push(newrow);
            continue;
        }
        if (allowActions.AllowActions) {
            actionvalue.AllowActions = allowActions.AllowActions.substring(1);
        }
        if (denyActions.DenyActions) {
            actionvalue.DenyActions = denyActions.DenyActions.substring(1);
        }
        newrow[col] = JSON.stringify(actionvalue);
        //newrow.PERMISSIONACTIONVALUE = JSON.stringify(actionvalue);
        data.push(newrow);
    }

    return data;
}

//判断给定的字符串是否是动作
InforCenter_Platform_ActionRulePermission_ExistActionList = function (str, actionList) {
    for (var i = 0; i < actionList.length ; i++) {
        if (str == actionList[i]) {
            return true;
        }
    }
    return false;
}

//----------------------------保存列表数据 结束------------------------
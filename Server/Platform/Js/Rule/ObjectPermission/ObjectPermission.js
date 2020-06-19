InforCenter_Platform_ObjectPermission_LoadPage = function (pageEvent) {
    var enable = HoteamUI.DataService.Call("Hoteam.InforCenter.RuleDataService.IsEnableObjectPermission", {});
    if (!enable) {
        HoteamUI.UIManager.Popup("Confirm", { pageMode: "OK", context: "ObjectPermission", labelName: "EnableObjectPermission" })
        HoteamUI.UIManager.Return(pageEvent.o.pid, null);
        return;
    }
    var para = pageEvent.o.GetPara();
    pageEvent.o.GetControl("PageContainer").LoadPage("ObjectPermissionPage", para);
}
InforCenter_Platform_ObjectPermission_Save = function (ctrlEvent) {
    var page = HoteamUI.Page.InstanceIn(ctrlEvent.o.ContainerID(), "PageContainer", "ObjectPermissionPage");
    var para = {};
    para.PermissionPageID = ctrlEvent.o.ContainerID();
    para.ClearPermission = true;
    HoteamUI.Page.FirePageEvent(page.pid, "OnSave", para);
    //if (result == true) {
    //    HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), { confirm: "OK" });
    //}
}

//显示对象授权页面
InforCenter_Platform_ObjectPermissionPage_LoadPage = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    //隐藏多级授权
    if (pagePara.DisableMultiPermission) {
        if (typeof pagePara.DisableMultiPermission == "string") {
            if (pagePara.DisableMultiPermission.toLowerCase() == "true") {
                page.GetControl("ObjectPermission_Container").HiddenPanel(["item3"]);
            }
        } else if (typeof pagePara.DisableMultiPermission == "boolean") {
            page.GetControl("ObjectPermission_Container").HiddenPanel(["item3"]);
        }
    }
    var menuPage = HoteamUI.Page.InstanceIn(page.pid, "MenuPageContainer", "MenuCtrl");
    var menuGrid = menuPage.GetControl("Menu");
    pagePara.MenuGuid = menuGrid.id;
    var grid = page.GetControl("PermissionListEditGrid");
    if (HoteamUI.Common.IsNullOrEmpty(grid) == false) {
        //ListGuid为固定属性，方便WebAction中取[LISTID]
        pagePara.ListGuid = grid.id;
    }
    //加载Menu
    InforCenter_Platform_MenuCtrl_LoadMenus(menuPage, pagePara, "ObjectPermissionMenu");
    //加载列表
    InforCenter_Platform_ObjectPermission_GridData(page, pagePara, grid);
}

//列表加载数据
InforCenter_Platform_ObjectPermission_GridData = function (page, pagePara, grid) {
    if (HoteamUI.Common.IsNullOrEmpty(pagePara) == false
        && HoteamUI.Common.IsNullOrEmpty(pagePara.SelectID) == false
        && HoteamUI.Common.IsNullOrEmpty(grid) == false) {
        var data = HoteamUI.DataService.Call("InforCenter.Rule.RuleDataService.GetObjectPermissionGridData", { para: { ObjectIDs: pagePara.SelectID, ObjectType: pagePara.ObjectType, IsPatchPermission: pagePara.IsPatchPermission } });
        if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
            //加载表头
            if (HoteamUI.Common.IsNullOrEmpty(data.EditGridRowTitle) == false) {
                grid.LoadColTitle(data.EditGridRowTitle);
            }
            //加载内容
            if (HoteamUI.Common.IsNullOrEmpty(data.EditGridData) == false
                && HoteamUI.Common.IsNullOrEmpty(data.EditGridData.Rows) == false
                && data.EditGridData.Rows.length > 0) {
                grid.LoadGridRows(data.EditGridData);
            }
        }
    }
}

//加载授权对象选择页面
InforCenter_Platform_ObjectPermission_ShowPermissionActorValuePage = function (ctrlEvent) {
    var callback = function (data, ret) {
        if (ret != null) {
            data.ctrl.setTextValue(ret.PermissionActorValueText, ret.PermissionActorValue);
        }
    }
    var para = {};
    //获取页面参数
    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    para = page.GetPara();
    //获取授权对象参数
    var permissionActorValue = ctrlEvent.textValue.getValue();
    if (HoteamUI.Common.IsNullOrEmpty(permissionActorValue) == false) {
        para.PermissionActorValue = JSON.parse(permissionActorValue);
    }
    HoteamUI.UIManager.Popup("PermissionActorValue", para, callback, { ctrl: ctrlEvent.textValue });
}


//保存数据
InforCenter_Platform_ObjectPermissionPage_OnSave = function (pageEvent) {
    return InforCenter_Platform_ObjectPermissionPage_SaveData(pageEvent, true);
}

InforCenter_Platform_ObjectPermissionPage_OnCheck = function (pageEvent) {
    return InforCenter_Platform_ObjectPermissionPage_SaveData(pageEvent, false);
}

InforCenter_Platform_ObjectPermissionPage_SaveData = function (pageEvent, isSave) {
    try {
        var page = pageEvent.o;
        var saveDataArray = new Array();
        var index = 0;
        var pagePara = page.GetPara();
        var selectObjectCount = pagePara.SelectID.split(';').length;
        //授权对象ID
        var objectIDs = "";
        if (HoteamUI.Common.IsNullOrEmpty(pagePara) == false && HoteamUI.Common.IsNullOrEmpty(pagePara.SelectID) == false) {
            objectIDs = pagePara.SelectID;
        }
        var authorizePermission = page.GetControl("AuthorizePermission").IsChecked();
        var grid = page.GetControl("PermissionListEditGrid");
        var data = grid.SaveGridRows();
        if (HoteamUI.Common.IsNullOrEmpty(objectIDs) == false
            && HoteamUI.Common.IsNullOrEmpty(data) == false
            && data.success == true
            && HoteamUI.Common.IsNullOrEmpty(data.rowsObject) == false
            && data.rowsObject.length > 0) {
            for (var i = 0; i < data.rowsObject.length; i++) {
                var mode = data.rowsObject[i].OBJECTPERMISSIONMODE.value;
                //只保存可以手动修改的对象授权，流程中的和规则定义的不做修改
                if (mode != "Manual") {
                    continue;
                }
                var saveData = {};
                saveData.PermissionMode = mode;
                if (HoteamUI.Common.IsNullOrEmpty(data.rowsObject[i].PERMISSIONACTORVALUE) == false
                    && HoteamUI.Common.IsNullOrEmpty(data.rowsObject[i].PERMISSIONACTORVALUE.value) == false) {
                    //授权对象值
                    saveData.PermissionActorValue = data.rowsObject[i].PERMISSIONACTORVALUE.value;
                } else {
                    grid.UnSelectAll();
                    grid.SetSelectedRow(i + 1);
                    var msg = HoteamUI.Language.Lang("ObjectPermissionPage.PermissionInfoError");
                    HoteamUI.UIManager.Popup("Confirm", { pageMode: "OK", message: msg });
                    return false;
                }
                if (HoteamUI.Common.IsNullOrEmpty(data.rowsObject[i].PERMISSIONEXPIREVALUE) == false) {
                    //授权对象截止有效期值(IE浏览器 时间字符串不识别'-'，需要改为'/')
                    var date = new Date(data.rowsObject[i].PERMISSIONEXPIREVALUE.text.replace(/-/g, "/"));
                    var nowDate = new Date();
                    if (nowDate > date) {
                        grid.UnSelectAll();
                        grid.SetSelectedRow(i + 1);
                        var msg = HoteamUI.Language.Lang("ObjectPermissionPage.PermissionInfoDateError");
                        HoteamUI.UIManager.Popup("Confirm", { pageMode: "OK", message: msg });
                        return false;
                    }

                    saveData.PermissionExpireValue = data.rowsObject[i].PERMISSIONEXPIREVALUE.value;
                }

                //授权动作值
                var permissionActionValueData = {};
                var allowActions = "";
                var denyActions = "";
                var row = data.rowsObject[i];
                for (var key in row) {
                    if (!row.hasOwnProperty(key)) {
                        continue;
                    }
                    if (key == "PERMISSIONACTORVALUE") {
                        continue;
                    }
                    else {
                        var item = data.rowsObject[i][key];
                        if (item === '1') {
                            allowActions += ';' + key;
                        }
                        else if (item === '0') {
                            denyActions += ';' + key;
                        }
                    }
                }
                if (allowActions.length > 0) {
                    //允许的动作
                    permissionActionValueData.AllowActions = allowActions.substring(1);
                }
                if (denyActions.length > 0) {
                    //禁止的动作
                    permissionActionValueData.DenyActions = denyActions.substring(1);
                }
                saveData.PermissionActionValue = JSON.stringify(permissionActionValueData);

                if (HoteamUI.Common.IsNullOrEmpty(saveData.PermissionActorValue) == true
                    || HoteamUI.Common.IsNullOrEmpty(permissionActionValueData) == true
                    || HoteamUI.Common.IsNullOrEmpty(permissionActionValueData) == false
                    && HoteamUI.Common.IsNullOrEmpty(permissionActionValueData.AllowActions) == true
                    && HoteamUI.Common.IsNullOrEmpty(permissionActionValueData.DenyActions) == true) {
                    //未进行动作设置，不保存数据
                    continue;
                }
                //排序号
                saveData.SerialNumber = index;
                var exist = false;
                //判断是否设置了相同的数据
                for (var item = 0; item < saveDataArray.length; item++) {
                    var row = saveDataArray[item];
                    if (row.PermissionActorValue == saveData.PermissionActorValue) {
                        exist = true;
                        grid.UnSelectAll();
                        grid.SetSelectedRow(i + 1);
                        var msg = HoteamUI.Language.Lang("ObjectPermissionPage.SamePermissionInfoError");
                        HoteamUI.UIManager.Popup("Confirm", { pageMode: "OK", message: msg });
                        return false;
                    }
                }
                if (exist == false) {
                    saveDataArray[index] = saveData;
                }
                index = index + 1;
            }
        }
        var multiAuthorize = false;
        if (selectObjectCount > 1) {
            multiAuthorize = true;
        }

        //如果保存数据
        if (isSave) {
            var pid = pageEvent.PermissionPageID;
            if (!pid) {
                pid = pageEvent.o.pid;
            }
            var clearPermission = pageEvent.ClearPermission;
            if (clearPermission == undefined || clearPermission == null) {
                //默认清除权限
                clearPermission = true;
            }
            pageEvent.PermissionPageID = pid;
            HoteamUI.Window.WaitWindow.LayoutShow(pid);
            var successCallback = function (ret, pageEvent) {
                HoteamUI.Window.WaitWindow.LayoutDestory(pid);
                if (ret && (ret == true || ret == "true")) {
                    if (pageEvent.SuccessMessage) {
                        HoteamUI.UIManager.Popup({ pagename: "Confirm", paras: { pageMode: "OK", message: pageEvent.SuccessMessage } });
                    } if (pageEvent.PermissionPageID) {
                        HoteamUI.UIManager.Return(pageEvent.PermissionPageID, { confirm: "OK" });
                    }
                }
            }
            var failCallback = function () {
                HoteamUI.Window.WaitWindow.LayoutDestory(pid);
            }
            var asyncPara = {
                ObjectIDs: objectIDs,
                DataList: saveDataArray,
                AuthorizeChildren: authorizePermission,
                MultiAuthorize: multiAuthorize,
                ExtendJsonInfo: JSON.stringify({ ClearPermission: clearPermission })
            };

            var asyncargs = {
                serviceuri: "InforCenter.Rule.RuleDataService.SaveObjectPermissionData",
                paras: { para: asyncPara },
                callback: successCallback,
                callcackpara: pageEvent,
                errorCallback: failCallback
            }
            HoteamUI.DataService.AsyncCall(asyncargs);

            //return result;
        }
        else {
            return true;
        }
    }
    catch (e) { }
}


InforCenter_Platform_ObjectPermission_ShowPermissionActorTypeDLL = function (ctrlEvent) {
    //获取规则条件类型数据
    var data = HoteamUI.DataService.Call("InforCenter.Rule.RuleDataService.GetPermissionTypeList", {});
    if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
        return data;
    }
}
InforCenter_Platform_ObjectPermission_ShowPermissionActorValue = function (ctrlEvent) {
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
        if (plugin.Name == "PermissionToGroup") {
            //组织和对象所属组在规则定义中有“包含所有父组”和“包含所有子组”，在对象授权中没有该设置，组和对象所属组单独处理
            InforCenter_Platform_ObjectPermission_SetPermissionToGroup(para);
        } else if (plugin.Name == "PermissionToOwnGroup") {
            return;
        }
        else {
            HoteamUI.Common.ExeFunction(plugin.JSMethod, para);
        }
    }
}

InforCenter_Platform_ObjectPermission_ShowPermissionActorTypeDLLChange = function (ctrlEvent) {
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
        //组织和对象所属组在规则定义中有“包含所有父组”和“包含所有子组”，在对象授权中没有该设置，组和对象所属组单独处理
        if (plugin.Name == "PermissionToOwnGroup") {
            var ret = InforCenter_Platform_ObjectPermission_SetPermissionToOwnGroup(para)
            ctrlEvent.o.SetCellContent(editRow, "PERMISSIONACTORVALUE", ret.Text, ret.Value, true);
        } else if (plugin.IsPopup) {
            var callback = function (data, ret) {
                ctrlEvent.o.SetCellContent(editRow, "PERMISSIONACTORVALUE", ret.Text, ret.Value, true);
            }

            para.ctrlEvent.Callback = callback;
            if (plugin.Name == "PermissionToGroup") {
                InforCenter_Platform_ObjectPermission_SetPermissionToGroup(para);
            } else {
                HoteamUI.Common.ExeFunction(plugin.JSMethod, para);
            }
        } else {
            var ret = HoteamUI.Common.ExeFunction(plugin.JSMethod, para);
            ctrlEvent.o.SetCellContent(editRow, "PERMISSIONACTORVALUE", ret.Text, ret.Value, true);
        }
    }
}

InforCenter_Platform_ObjectPermission_SetPermissionToOwnGroup = function (para) {
    var permissionActorValueText = HoteamUI.Language.Lang("PermissionToOwnGroup", "Title");
    var permissionActroValue = "{\"ActorType\":\"PermissionToOwnGroup\"}";
    return { Text: permissionActorValueText, Value: permissionActroValue };
}
InforCenter_Platform_ObjectPermission_SetPermissionToGroup = function (para) {
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
//新增行
InforCenter_Platform_ObjectPermission_AddRow = function (para) {
    try {
        if (HoteamUI.Common.IsNullOrEmpty(para[1].gridID) == false) {
            var grid = HoteamUI.Control.Instance(para[1].gridID);
            if (HoteamUI.Common.IsNullOrEmpty(grid) == false) {
                //添加图标
                var data = {};
                data.OBJECTPERMISSIONMODEIMAGE = {};
                data.OBJECTPERMISSIONMODEIMAGE.ColName = "OBJECTPERMISSIONMODEIMAGE";
                data.OBJECTPERMISSIONMODEIMAGE.ColIcon = "~/Platform/Image/Model/p_manually.png";
                data.OBJECTPERMISSIONMODEIMAGE.ColText = HoteamUI.Language.Lang("Enumerations.ObjectPermissionModeManual");

                data.ACTIONRULENAME = {};
                data.ACTIONRULENAME.ColName = "ACTIONRULENAME";
                data.ACTIONRULENAME.ColText = HoteamUI.Language.Lang("Common.ObjectPermission");
                grid.AddGridRow('last', false, data);
            }
        }
    }
    catch (e) { }
}

//删除行
InforCenter_Platform_ObjectPermission_DeleteRow = function (para) {
    try {
        if (HoteamUI.Common.IsNullOrEmpty(para[1].gridID) == false) {
            var grid = HoteamUI.Control.Instance(para[1].gridID);
            if (HoteamUI.Common.IsNullOrEmpty(grid) == false) {
                var canDelete = true;
                var selected = grid.GetSelectedRows();
                if (selected.length <= 0) {
                    var confirmPara = { pageMode: "OK", context: "Platform", labelName: "EmptySelectionException" };
                    HoteamUI.UIManager.Popup("Confirm", confirmPara);
                    return;
                }
                for (var i = 0; i < selected.length; i++) {
                    if (selected[i].OBJECTPERMISSIONMODE.value != "Manual") {
                        canDelete = false;
                        HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("ObjectPermission.ModeDeleteError"));
                        break;
                    }
                }
                if (canDelete)
                    grid.DeleteGridRow();
            }
        }
    }
    catch (e) { }
}
//-------------------------------以下方法在对象授权中去掉--------------------------------

InforCenter_Platform_PermissionToOrganization_SetPermissionValue = function (ctrlEvent, permissionMode) {
    var pagePara = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID()).GetPara();
    var objectIdCount = pagePara.SelectID.split(';');
    var permissionActorValueText = HoteamUI.Language.Lang(permissionMode, "Title");
    var editRow = ctrlEvent.o.GetEditRowID();
    var permissionActroValue = "{\"ActorType\":\"" + permissionMode + "\"}";

    //遍历当前表格中是否存在相同的授权类型-授权值
    var existPermission = false;
    var grid = ctrlEvent.o.SaveGridRows();
    $.each(grid.rowsObject, function (i, d) {
        if (d.PERMISSIONACTORVALUE.value == permissionActroValue) {
            existPermission = true;
        }
    })

    var pageId = ctrlEvent.o.ContainerID();
    var pagePara = HoteamUI.Page.Instance(pageId).GetPara();
    var selectId = pagePara.SelectID;
    var saveDataArray = [];
    var saveData = {};
    saveData.PermissionActorValue = permissionActroValue;
    saveDataArray.push(saveData);
    if (objectIdCount.length == 1) {
        var result = HoteamUI.DataService.Call("InforCenter.Rule.RuleDataService.CheckObjectPermissionActorExist", { para: { ObjectIDs: selectId, DataList: saveDataArray } });
    }
    if (result || existPermission) {
        var msg = HoteamUI.Language.Lang("Rule.Repetition");
        HoteamUI.UIManager.noty({ text: msg, type: 'error', layout: 'topCenter' });
    } else {
        var actorValueData = ctrlEvent.o.SetCellContent(editRow, "PERMISSIONACTORVALUE", permissionActorValueText, permissionActroValue);
    }

}
InforCenter_Platform_PermissionToOrganization_ShowSelecter = function (ctrlEvent, selectMode, permissionMode) {
    var pagePara = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID()).GetPara();
    var objectIdCount = pagePara.SelectID.split(';');
    var editRow = ctrlEvent.o.GetEditRowID();
    var actorValueData = ctrlEvent.o.GetCellContent(editRow, "PERMISSIONACTORVALUE");
    var actorValue = "";
    if (actorValueData.value) {
        var actorData = JSON.parse(actorValueData.value);
        actorValue = actorData.ActorValue;
    }
    var callback = function (data, ret) {
        var o = HoteamUI.Control.Instance(data.id);
        if (ret != null && ret.length > 0) {
            var valueString = "";
            var nameString = "";
            for (var i = 0; i < ret.length; i++) {
                valueString += ";" + ret[i].EID;
                if (data.selectMode && data.selectMode == "GroupToRole") {
                    var groupid = ret[i].GROUPEID;
                    var group = InforCenter_Platform_Object_GetObjectData(groupid);
                    nameString += ";" + group.ENAME + "|" + ret[i].ENAME;
                } else {
                    nameString += ";" + ret[i].ENAME;
                }
            }
            if (valueString.length > 0) {
                valueString = valueString.substring(1);
                nameString = nameString.substring(1);
            }
            var value = "{\"ActorValue\":\"" + valueString + "\",\"ActorType\":\"" + permissionMode + "\"}";
            var editRow = o.GetEditRowID();

            var existPermission = false;
            var grid = ctrlEvent.o.SaveGridRows();
            $.each(grid.rowsObject, function (i, d) {
                if (d.PERMISSIONACTORVALUE.value == value) {
                    existPermission = true;
                }
            })

            if (objectIdCount.length == 1) {
                var pageId = HoteamUI.Control.Instance(data.id).ContainerID();
                var pagePara = HoteamUI.Page.Instance(pageId).GetPara();
                var selectId = pagePara.SelectID;
                var saveDataArray = [];
                var saveData = {};
                saveData.PermissionActorValue = value;
                saveDataArray.push(saveData);
                var result = HoteamUI.DataService.Call("InforCenter.Rule.RuleDataService.CheckObjectPermissionActorExist", { para: { ObjectIDs: selectId, DataList: saveDataArray } });
            }

            if (result || existPermission) {
                var msg = HoteamUI.Language.Lang("Rule.Repetition");
                HoteamUI.UIManager.noty({ text: msg, type: 'infomation', layout: 'topCenter' });
            } else {
                o.SetCellContent(editRow, "PERMISSIONACTORVALUE", nameString, value);
            }
        }
    }

    InforCenter_Platform_OrganizationSelecter(actorValue, selectMode, "SingleLevel_MultiSelect", callback, ctrlEvent.o.id);
}



//上移
InforCenter_Platform_ObjectPermission_MoveUp = function (para) {
    try {
        if (HoteamUI.Common.IsNullOrEmpty(para[1].gridID) == false) {
            var grid = HoteamUI.Control.Instance(para[1].gridID);
            if (HoteamUI.Common.IsNullOrEmpty(grid) == false) {
                grid.MoveGridRow('before');
            }
        }
    }
    catch (e) { }
}

//上移至顶部
InforCenter_Platform_ObjectPermission_MoveToTop = function (para) {
    try {
        if (HoteamUI.Common.IsNullOrEmpty(para[1].gridID) == false) {
            var grid = HoteamUI.Control.Instance(para[1].gridID);
            if (HoteamUI.Common.IsNullOrEmpty(grid) == false) {
                grid.MoveGridRow('first');
            }
        }
    }
    catch (e) { }
}

//下移
InforCenter_Platform_ObjectPermission_MoveDown = function (para) {
    try {
        if (HoteamUI.Common.IsNullOrEmpty(para[1].gridID) == false) {
            var grid = HoteamUI.Control.Instance(para[1].gridID);
            if (HoteamUI.Common.IsNullOrEmpty(grid) == false) {
                grid.MoveGridRow('after');
            }
        }
    }
    catch (e) { }
}

//下移至底部
InforCenter_Platform_ObjectPermission_MoveToBottom = function (para) {
    try {
        if (HoteamUI.Common.IsNullOrEmpty(para[1].gridID) == false) {
            var grid = HoteamUI.Control.Instance(para[1].gridID);
            if (HoteamUI.Common.IsNullOrEmpty(grid) == false) {
                grid.MoveGridRow('last');
            }
        }
    }
    catch (e) { }
}


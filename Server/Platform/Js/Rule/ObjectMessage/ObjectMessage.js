//显示对象授权页面
InforCenter_Platform_ObjectMessage_LoadPage = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    var menuPage = HoteamUI.Page.InstanceIn(page.pid, "MenuPageContainer", "MenuCtrl");
    var menuGrid = menuPage.GetControl("Menu");
    pagePara.MenuGuid = menuGrid.id;
    var grid = page.GetControl("MessageListEditGrid");
    if (HoteamUI.Common.IsNullOrEmpty(grid) == false) {
        //ListGuid为固定属性，方便WebAction中取[LISTID]
        pagePara.ListGuid = grid.id;
    }
    //加载Menu
    InforCenter_Platform_MenuCtrl_LoadMenus(menuPage, pagePara, "ObjectMessageMenu");
    //加载列表
    InforCenter_Platform_ObjectMessage_GridData(page, pagePara, grid);
}

//列表加载数据
InforCenter_Platform_ObjectMessage_GridData = function (page, pagePara, grid) {
    if (HoteamUI.Common.IsNullOrEmpty(pagePara) == false
        && HoteamUI.Common.IsNullOrEmpty(pagePara.SelectID) == false
        && HoteamUI.Common.IsNullOrEmpty(grid) == false) {
        var data = HoteamUI.DataService.Call("InforCenter.Rule.RuleDataService.GetObjectMessageGridData", { para: { ObjectIDs: pagePara.SelectID } });
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
InforCenter_Platform_ObjectMessage_ShowMessageActorValuePage = function (ctrlEvent) {
    var callback = function (data, ret) {
        if (ret != null) {
            data.ctrl.setTextValue(ret.PermissionActorValueText, ret.PermissionActorValue);
        }
    }
    var para = {};
    //获取页面参数
    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    para = page.GetPara();
    //使用在消息订阅页面
    para.IsObjectMessagePage = true;
    //获取授权对象参数
    var permissionActorValue = ctrlEvent.textValue.getValue();
    if (HoteamUI.Common.IsNullOrEmpty(permissionActorValue) == false) {
        para.MessageActorValue = JSON.parse(permissionActorValue);
    }
    //获取数据，用于判断是否重复
    var permissionValueList = [];
    //不能调用保存方法，调用后，可编辑文本框会小时    
    //var gridData = ctrlEvent.o.SaveGridRows();
    var rowids = ctrlEvent.o.GetAllRowsID();
    for (var i = 0; i < rowids.length; i++) {
        var row = ctrlEvent.o.GetRowContent(rowids[i]);
        if (row.MESSAGEACTORVALUE && row.MESSAGEACTORVALUE.value) {
            permissionValueList.push(row.MESSAGEACTORVALUE.value);
        }
    }    
    para.PermissionMessageValueList = permissionValueList;

    HoteamUI.UIManager.Popup("PermissionActorValue", para, callback, { ctrl: ctrlEvent.textValue });
}

//新增行
InforCenter_Platform_ObjectMessage_AddRow = function (para) {
    try {
        if (HoteamUI.Common.IsNullOrEmpty(para[1].gridID) == false) {
            var grid = HoteamUI.Control.Instance(para[1].gridID);
            if (HoteamUI.Common.IsNullOrEmpty(grid) == false) {
                grid.AddGridRow('last');
            }
        }
    }
    catch (e) { }
}

//上移
InforCenter_Platform_ObjectMessage_MoveUp = function (para) {
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
InforCenter_Platform_ObjectMessage_MoveToTop = function (para) {
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
InforCenter_Platform_ObjectMessage_MoveDown = function (para) {
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
InforCenter_Platform_ObjectMessage_MoveToBottom = function (para) {
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

//删除行
InforCenter_Platform_ObjectMessage_DeleteRow = function (para) {
    try {
        if (HoteamUI.Common.IsNullOrEmpty(para[1].gridID) == false) {
            var grid = HoteamUI.Control.Instance(para[1].gridID);
            if (HoteamUI.Common.IsNullOrEmpty(grid) == false) {
                var selected = grid.GetSelectedRows();
                if (selected.length <= 0) {
                    var confirmPara = { pageMode: "OK", context: "Platform", labelName: "EmptySelectionException" };
                    HoteamUI.UIManager.Popup("Confirm", confirmPara);
                    return;
                }
                grid.DeleteGridRow();
            }
        }
    }
    catch (e) { }
}

//保存数据
InforCenter_Platform_ObjectMessage_Save = function (ctrlEvent) {
    try {
        var saveDataArray = new Array();
        var index = 0;
        var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
        var pagePara = page.GetPara();
        //授权对象ID
        var objectIDs = "";
        if (HoteamUI.Common.IsNullOrEmpty(pagePara) == false && HoteamUI.Common.IsNullOrEmpty(pagePara.SelectID) == false) {
            objectIDs = pagePara.SelectID;
        }
        var grid = page.GetControl("MessageListEditGrid");
        var data = grid.SaveGridRows();
        if (HoteamUI.Common.IsNullOrEmpty(objectIDs) == false
            && HoteamUI.Common.IsNullOrEmpty(data) == false
            && data.success == true
            && HoteamUI.Common.IsNullOrEmpty(data.rowsObject) == false
            && data.rowsObject.length > 0) {
            for (var i = 0; i < data.rowsObject.length; i++) {
                var saveData = {};
                if (HoteamUI.Common.IsNullOrEmpty(data.rowsObject[i].MESSAGEACTORVALUE) == false
                && HoteamUI.Common.IsNullOrEmpty(data.rowsObject[i].MESSAGEACTORVALUE.value) == false) {
                    //授权对象值
                    saveData.MessageActorValue = data.rowsObject[i].MESSAGEACTORVALUE.value;
                } else {
                    grid.UnSelectAll();
                    grid.SetSelectedRow(i + 1);
                    var msg = HoteamUI.Language.Lang("ObjectPermissionPage.PermissionInfoError");
                    HoteamUI.UIManager.Popup("Confirm", { pageMode: "OK", message: msg });
                    return false;
                }
                //授权动作值
                var messageActionValueData = {};
                var allowActions = "";
                for (var key in data.rowsObject[i]) {
                    if (!data.rowsObject[i].hasOwnProperty(key)) {
                        continue;
                    }
                    if (key == "MESSAGEACTORVALUE") {
                        continue;
                    }
                    else {
                        var item = data.rowsObject[i][key];
                        if (item == '1') {
                            allowActions += ';' + key;
                        }
                    }
                }
                if (allowActions.length > 0) {
                    //允许的动作
                    messageActionValueData.AllowActions = allowActions.substring(1);
                }
                saveData.MessageActionValue = JSON.stringify(messageActionValueData);

                if (HoteamUI.Common.IsNullOrEmpty(saveData.MessageActorValue) == false
                    && HoteamUI.Common.IsNullOrEmpty(saveData.MessageActionValue) == false) {
                    //排序号
                    saveData.SerialNumber = index;
                    var exist = false;
                    //判断是否设置了相同的数据
                    for (var item = 0; item < saveDataArray.length; item++) {
                        var row = saveDataArray[item];
                        if (row.MessageActorValue == saveData.MessageActorValue) {
                            exist = true;
                            grid.UnSelectAll();
                            grid.SetSelectedRow(i + 1);
                            var msg = HoteamUI.Language.Lang("ObjectMessage.SameMessageInfoError");
                            HoteamUI.UIManager.Popup("Confirm", { pageMode: "OK", message: msg });
                            return;
                        }
                    }
                    if (exist == false) {
                        saveDataArray[index] = saveData;
                    }
                    index = index + 1;
                }

            }
        }
        var result = HoteamUI.DataService.Call("InforCenter.Rule.RuleDataService.SaveObjectMessageData", { para: { ObjectIDs: objectIDs, DataList: saveDataArray } });
        HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), {});
    }
    catch (e)
    { }
}
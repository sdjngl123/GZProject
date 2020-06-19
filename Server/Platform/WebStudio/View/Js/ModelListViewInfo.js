InforCenter_Platform_ModelListViewInfo_PageInit = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();

    //中间属性列表
    pagePara.ItemName = pagePara.MidEditList;
    var modelInfoListCtrl = page.GetControl("LeftContainer");
    pagePara.ShowBreadNavigation = false;
    modelInfoListCtrl.LoadPage("EditListManagement", pagePara);

    //右侧属性页先隐藏
    pagePara.ItemName = pagePara.RightEditList;
    var modelInfoTypeListCtrl = page.GetControl("PropertyPage");
    modelInfoTypeListCtrl.LoadPage("EditListManagement", pagePara);
    var contentContainer = page.GetControl("Content_Container");
    contentContainer.HiddenPanel(['item4']);
}
//列表查询行点击事件
InforCenter_Platform_ModelListViewInfo_RowClick = function (ctrlEvent) {
    var parentPageID = HoteamUI.Page.ParentPage(ctrlEvent.o.pid);
    var parentPage = HoteamUI.Page.Instance(parentPageID);
    var contentContainer = parentPage.GetControl("Content_Container");
    //显示右侧属性设置
    var needSaveRight = false;
    if (contentContainer.GetPanelStatus('item4') == 'hidden') {
        contentContainer.ShowPanel(['item4']);
    }
    else {
        //保存一下右侧设置
        needSaveRight = true;
    }

    var rightContainer = parentPage.GetControl("RightContainer");
    var propertyPageID = rightContainer.OtherControl("PropertyPage").id;
    var listPage = HoteamUI.Page.InstanceIn(propertyPageID, "ListViewPageContainer", "EditListViewCtrl");
    var editlistGrid = listPage.GetControl("ListView");
    if (needSaveRight) {
        editlistGrid.SaveEditCell();
    }

    //获取属性的设置格式
    var selRowData = ctrlEvent.SelectRowData;
    //设置列名称【第一行】
    editlistGrid.SetCellContent(1, "VALUE", selRowData.NAME, selRowData.NAME, false);
    //模型名称+属性名称+点击的EditList控件id
    var valueType = selRowData.MODEL + "-" + selRowData.INFONAME + "-" + ctrlEvent.ListGuid;
    editlistGrid.SetCellContent(1, "VALUETYPE", valueType, valueType, false);
    var infoSettingRows = editlistGrid.GetCurrentPageRows();

    if (!HoteamUI.Common.IsNullOrEmpty(selRowData.SETVAL)) {
        //缓存的格式值
        var infoSetVal = JSON.parse(selRowData.SETVAL);
        //忽略第一行
        for (var i = 1; i < infoSettingRows.length; i++) {
            var infoColVal = "";
            var infoColTxt = "";
            var infoVal = infoSetVal[infoSettingRows[i].TXTVAL];
            if (!HoteamUI.Common.IsNullOrEmpty(infoVal)) {
                infoColVal = infoVal;
                infoColTxt = infoColVal;
            }
            editlistGrid.SetCellContent(infoSettingRows[i].row_number, "VALUE", infoColTxt, infoColVal, false, infoSettingRows[i].VALUETYPE);
        }
    }
    else {
        for (var i = 1; i < infoSettingRows.length; i++) {
            editlistGrid.SetCellContent(infoSettingRows[i].row_number, "VALUE", "", "", false);
        }
    }
}
InforCenter_Platform_SetModelInfoType_OnRowClick = function (ctrlEvent) {
    //显示对应设置的解释
    var propertyExplainPid = HoteamUI.Page.ParentPage(ctrlEvent.o.pid);
    var propertyExplainCtrl = HoteamUI.Page.Instance(propertyExplainPid).GetControl("PropertyExplain");
    propertyExplainCtrl.SetText();
}
InforCenter_Platform_SetModelInfoType_ValueCheck = function (ctrlEvent) {
    var colRowObj = ctrlEvent.rowobject;
    var infoName = ctrlEvent.o.GetRowContent(1);
    var infoArr = infoName.VALUETYPE.split('-');
    //获取模型属性列表控件
    var infoEditList = HoteamUI.Control.Instance(infoArr[2]);
    var infoRows = infoEditList.GetCurrentPageRows();
    var infoRowObject = [];
    for (var i = 0; i < infoRows.length; i++) {
        if (infoArr[0] == infoRows[i].MODEL && infoArr[1] == infoRows[i].INFONAME) {
            if (!HoteamUI.Common.IsNullOrEmpty(infoRows[i].SETVAL)) {
                infoRowObject = JSON.parse(infoRows[i].SETVAL);
                //var isPush = true;
                //改变属性格式对应的值
                if (colRowObj.VALUETYPE == "dropdown") {
                    infoRowObject[colRowObj.TXTVAL] = ctrlEvent.newData.VALUE.value;
                }
                else {
                    infoRowObject[colRowObj.TXTVAL] = ctrlEvent.newData.VALUE;
                }

            }
            //设置列的格式值
            var valStr = JSON.stringify(infoRowObject);
            infoEditList.SetCellContent(infoRows[i].row_number, "SETVAL", valStr, valStr, false);
            break;
        }
    }
}
//设置属性的格式值
InforCenter_Platform_SetModelInfoType_SetInfoVal = function (ctrlEvent) {
    var infoValList = ctrlEvent.o.SaveGridRows();
    if (infoValList.success) {
        var infoRowObject = infoValList.rowsObject;
        var infoName = infoRowObject[0];
        var infoArr = infoName.VALUETYPE.split('-');
        //获取模型属性列表控件
        var infoEditList = HoteamUI.Control.Instance(infoArr[2]);
        var infoRows = infoEditList.GetCurrentPageRows();
        for (var i = 0; i < infoRows.length; i++) {
            if (infoArr[0] == infoRows[i].MODEL && infoArr[1] == infoRows[i].INFONAME) {
                //设置列的格式值
                var valStr = JSON.stringify(infoRowObject);
                infoEditList.SetCellContent(infoRows[i].row_number, "SETVAL", valStr, valStr, false);
            }
        }
    }
}

InforCenter_Platform_ModelListViewInfo_SaveClick = function (ctrlEvent) {
    //显示对应设置的解释
    var infoEditList = HoteamUI.Control.Instance(ctrlEvent[1].ListID);
    infoEditList.SaveEditCell();

    //主动调用右侧存数据
    var menuCt = HoteamUI.Control.Instance(ctrlEvent[0].ContainerID)
    var cid = HoteamUI.Page.ParentPage(menuCt.ContainerID());
    var ctrl = HoteamUI.Control.Instance(cid);
    var contentContainer = ctrl.OtherControl("Content_Container");
    if (contentContainer.GetPanelStatus('item4') == 'show') {
        var rightContainer = ctrl.OtherControl("RightContainer");
        var propertyPageID = rightContainer.OtherControl("PropertyPage").id;
        var listPage = HoteamUI.Page.InstanceIn(propertyPageID, "ListViewPageContainer", "EditListViewCtrl");
        var editlistGrid = listPage.GetControl("ListView");
        editlistGrid.SaveEditCell();
    }

    var infoRows = infoEditList.GetCurrentPageRows();
    var treeID = ctrlEvent[1].TreeID;
    var selNode = HoteamUI.Control.Instance(treeID).GetSelectedNode();
    var servicePara = {
        ObjectType: ctrlEvent[1].ModelName,
        ViewName: selNode.Text,
        ViewType: ctrlEvent[1].ViewType,
        ObjectID: ctrlEvent[1].ObjectID,
        Data: JSON.stringify(infoRows)
    };
    var result = HoteamUI.DataService.Call("Hoteam.InforCenter.WebStudioViewService.SaveModelViewSetting", {
        para: { ExtendJsonInfo: JSON.stringify(servicePara) }
    });
    if (result) {
        var message = HoteamUI.Language.Lang("ModelListViewInfo.SaveSuccess");
        HoteamUI.UIManager.MsgBox(message);
        InforCenter_Platform_MenuCtrl_InnerReceiveServerData(ctrlEvent[0], { confirm: "OK" });
    }
}

//添加条件字段
InforCenter_Platform_ModelListViewCondition_AddColumn = function (ctrlEvent) {
    var callback = function (data, ret) {
        var o = HoteamUI.Control.Instance(data.para.ListID);
        o.UnSelectAll();
        if (ret.length == 0) {
            return;
        }

        var defaultVal = {
            AndOrFlag: "AND",
            Operation: "=",
            Required: false
        };
        for (var i = 0; i < ret.length; i++) {
            var val = ret[i];
            defaultVal.InfoName = val.Name;
            defaultVal.ObjectTypeName = val.ObjectType;
            defaultVal.Name = val.Description;
            var jsonVal = JSON.stringify(defaultVal);
            var data = {
                NAME: {
                    ColText: val.Description, ColValue: val.Description
                },
                OBJTYPE: {
                    ColText: val.ObjectType, ColValue: val.ObjectType
                },
                INFONAME: {
                    ColText: val.Name, ColValue: val.Name
                },
                MODEL: {
                    ColText: val.ObjectType, ColValue: val.ObjectType
                },
                SETVAL: {
                    ColText: jsonVal, ColValue: jsonVal
                }
            };
            o.AddGridRow("last", true, data);
        }

        InforCenter_Platform_ModelListViewCondition_HiddenRight(o);
    }

    var pagePara = $.extend({}, ctrlEvent[1], { ItemName: "ObjTypeInfoColListQuery" });
    HoteamUI.UIManager.Popup("ListCommonQuery", pagePara, callback, { para: ctrlEvent[1] }, "660*600");
}

//移除条件字段
InforCenter_Platform_ModelListViewCondition_RemoveColumn = function (ctrlEvent) {
    var editGrid = HoteamUI.Control.Instance(ctrlEvent[1].ListID);
    editGrid.DeleteGridRow();
    InforCenter_Platform_ModelListViewCondition_HiddenRight(editGrid);
}

InforCenter_Platform_ModelListViewCondition_HiddenRight = function (o) {
    var parentPageID = HoteamUI.Page.ParentPage(o.ContainerID());
    parentPageID = HoteamUI.Page.ParentPage(parentPageID);
    var parentPage = HoteamUI.Page.Instance(parentPageID);
    var contentContainer = parentPage.GetControl("Content_Container");
    //显示右侧属性设置
    if (contentContainer.GetPanelStatus('item4') == 'show') {
        contentContainer.HiddenPanel(['item4']);
    }
}


InforCenter_Platform_ModelListViewCondition_RowClick = function (ctrlEvent) {
    var parentPageID = HoteamUI.Page.ParentPage(ctrlEvent.o.pid);
    var parentPage = HoteamUI.Page.Instance(parentPageID);
    var contentContainer = parentPage.GetControl("Content_Container");
    //显示右侧属性设置
    var needSaveRight = false;
    if (contentContainer.GetPanelStatus('item4') == 'hidden') {
        contentContainer.ShowPanel(['item4']);
    }
    else {
        //保存一下右侧设置
        needSaveRight = true;
    }

    var rightContainer = parentPage.GetControl("RightContainer");
    var propertyPageID = rightContainer.OtherControl("PropertyPage").id;
    var listPage = HoteamUI.Page.InstanceIn(propertyPageID, "ListViewPageContainer", "EditListViewCtrl");
    var editlistGrid = listPage.GetControl("ListView");
    if (needSaveRight) {
        editlistGrid.SaveEditCell();
    }

    //获取属性的设置格式
    var selRowData = ctrlEvent.SelectRowData;
    //设置列名称【第一行】
    editlistGrid.SetCellContent(1, "VALUE", selRowData.NAME, selRowData.NAME, false);
    //模型名称+属性名称+点击的EditList控件id
    var valueType = selRowData.MODEL + "-" + selRowData.INFONAME + "-" + ctrlEvent.ListGuid;
    editlistGrid.SetCellContent(1, "VALUETYPE", valueType, valueType, false);
    editlistGrid.SetCellContent(1, "NUMBER", selRowData.row_number, selRowData.row_number, false);
    var infoSettingRows = editlistGrid.GetCurrentPageRows();

    if (!HoteamUI.Common.IsNullOrEmpty(selRowData.SETVAL)) {
        //缓存的格式值
        var infoSetVal = JSON.parse(selRowData.SETVAL);
        //忽略第一行
        for (var i = 1; i < infoSettingRows.length; i++) {
            var infoColVal = "";
            var infoColTxt = "";
            var infoVal = infoSetVal[infoSettingRows[i].TXTVAL];
            if (!HoteamUI.Common.IsNullOrEmpty(infoVal)) {
                infoColVal = infoVal;
                infoColTxt = infoColVal;
            }
            editlistGrid.SetCellContent(infoSettingRows[i].row_number, "VALUE", infoColTxt, infoColVal, false, infoSettingRows[i].VALUETYPE);
        }
    }
    else {
        for (var i = 1; i < infoSettingRows.length; i++) {
            editlistGrid.SetCellContent(infoSettingRows[i].row_number, "VALUE", "", "", false);
        }
    }
}

InforCenter_Platform_SetModelInfoCondition_ValueCheck = function (ctrlEvent) {
    var colRowObj = ctrlEvent.rowobject;
    var infoName = ctrlEvent.o.GetRowContent(1);
    var infoArr = infoName.VALUETYPE.split('-');
    var number = infoName.NUMBER;
    //获取模型属性列表控件
    var infoEditList = HoteamUI.Control.Instance(infoArr[2]);
    var infoRows = infoEditList.GetCurrentPageRows();
    var infoRowObject = [];
    for (var i = 0; i < infoRows.length; i++) {
        if (infoArr[0] == infoRows[i].MODEL && infoArr[1] == infoRows[i].INFONAME && number == i + 1) {
            if (!HoteamUI.Common.IsNullOrEmpty(infoRows[i].SETVAL)) {
                infoRowObject = JSON.parse(infoRows[i].SETVAL);
                //var isPush = true;
                //改变属性格式对应的值
                if (colRowObj.VALUETYPE == "dropdown") {
                    infoRowObject[colRowObj.TXTVAL] = ctrlEvent.newData.VALUE.value;
                }
                else {
                    infoRowObject[colRowObj.TXTVAL] = ctrlEvent.newData.VALUE;
                }

            }
            //设置列的格式值
            var valStr = JSON.stringify(infoRowObject);
            infoEditList.SetCellContent(infoRows[i].row_number, "SETVAL", valStr, valStr, false);

            if (colRowObj.TXTVAL == 'Name') {
                //反写列多语言
                var text = infoRowObject[colRowObj.TXTVAL];
                infoEditList.SetCellContent(number, "NAME", text, text, false);
            }
            break;
        }
    }
}

InforCenter_Platform_SetModelInfoCondition_OnRowClick = function (ctrlEvent) {
    //显示对应设置的解释
    var propertyExplainPid = HoteamUI.Page.ParentPage(ctrlEvent.o.pid);
    var propertyExplainCtrl = HoteamUI.Page.Instance(propertyExplainPid).GetControl("PropertyExplain");
    propertyExplainCtrl.SetText();
}

InforCenter_Platform_ModelListViewCondition_SaveClick = function (ctrlEvent) {
    //显示对应设置的解释
    var infoEditList = HoteamUI.Control.Instance(ctrlEvent[1].ListID);
    infoEditList.SaveEditCell();

    //主动调用右侧存数据
    var menuCt = HoteamUI.Control.Instance(ctrlEvent[0].ContainerID)
    var cid = HoteamUI.Page.ParentPage(menuCt.ContainerID());
    var ctrl = HoteamUI.Control.Instance(cid);
    var contentContainer = ctrl.OtherControl("Content_Container");
    if (contentContainer.GetPanelStatus('item4') == 'show') {
        var rightContainer = ctrl.OtherControl("RightContainer");
        var propertyPageID = rightContainer.OtherControl("PropertyPage").id;
        var listPage = HoteamUI.Page.InstanceIn(propertyPageID, "ListViewPageContainer", "EditListViewCtrl");
        var editlistGrid = listPage.GetControl("ListView");
        editlistGrid.SaveEditCell();
    }

    var infoRows = infoEditList.GetCurrentPageRows();
    var treeID = ctrlEvent[1].TreeID;
    var selNode = HoteamUI.Control.Instance(treeID).GetSelectedNode();
    var servicePara = {
        ObjectType: ctrlEvent[1].ModelName,
        ViewName: selNode.Text,
        ObjectID: ctrlEvent[1].ObjectID,
        ViewType: ctrlEvent[1].ViewType,
        Data: JSON.stringify(infoRows)
    };
    var result = HoteamUI.DataService.Call("Hoteam.InforCenter.WebStudioViewService.SaveModelViewConditionSetting", {
        para: { ExtendJsonInfo: JSON.stringify(servicePara) }
    });
    if (result) {
        var message = HoteamUI.Language.Lang("ModelListViewInfo.SaveSuccess");
        HoteamUI.UIManager.MsgBox(message);
        InforCenter_Platform_MenuCtrl_InnerReceiveServerData(ctrlEvent[0], { confirm: "OK" });
    }
}
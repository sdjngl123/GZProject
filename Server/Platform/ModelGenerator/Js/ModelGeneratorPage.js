InforCenter_Platform_ModelInfoTypePage_PageInit = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();

    var menuPage = HoteamUI.Page.InstanceIn(page.pid, "MenuPageContainer", "MenuCtrl");
    var tabsPage = HoteamUI.Page.InstanceIn(page.pid, "VerticalTabsCtrlPage", "VerticalTabsCtrl");
    var menuGrid = menuPage.GetControl("Menu");
    var tabsCtrl = tabsPage.GetControl("Tabs");
    pagePara.PagePID = page.pid;
    pagePara.TabsGuid = tabsCtrl.id;

    var container = page.GetControl('Content_Container');
    //container.ShowPanel(["item0", "item1"]);
    InforCenter_Platform_ListManagement_LoadMenus(page, pagePara, menuPage);
    //if (pagePara.FromWeb == "True") {
    //} else {
    //    container.HiddenPanel(["item0", "item1"]);
    //}
    var firstContainer = page.GetControl('FirstContainer');
    var stateLabel = page.GetControl('StateLabel');
    var data = InforCenter_Platform_GetTreeManagePageLinksByName(pagePara.PageLinksName);
    data.HideTitle = false;
    var checkOutInfo = HoteamUI.DataService.Call("InforCenter.ModelGenerator.ModelGeneratorService.GetCheckOutInfo", { para: { ObjType: pagePara.ObjectID } });
    if (!HoteamUI.Common.IsNullOrEmpty(checkOutInfo)) {
        stateLabel.SetText(checkOutInfo);
        //firstContainer.ShowPanel(["item1", "item3"]);
    } else {
        stateLabel.SetText('');
        //firstContainer.HiddenPanel(["item1", "item3"]);
    }

    //验证检出状态，未检出或检出人不是当前用户则不显示菜单
    var retData = HoteamUI.DataService.Call("InforCenter.ModelGenerator.ModelGeneratorService.CheckCheckOutUser", { para: { ObjType: pagePara.ObjectID } });
    if (HoteamUI.Common.IsNullOrEmpty(retData)) {
        for (var index in data.PageLinks) {
            if (typeof (data.PageLinks[index].PagePara) == "string") {
                data.PageLinks[index].PagePara = JSON.parse(data.PageLinks[index].PagePara);
            }
            delete data.PageLinks[index].PagePara.MenuName;
        }
    } else {
        for (var index in data.PageLinks) {
            if (typeof (data.PageLinks[index].PagePara) == "string") {
                data.PageLinks[index].PagePara = JSON.parse(data.PageLinks[index].PagePara);
            }
            data.PageLinks[index].PagePara.MenuName = '';
        }
    }

    InforCenter_Platform_TabsCtrl_LoadTabs(tabsPage, pagePara, pagePara.PageLinksName, "", data);
    HoteamUI.Page.SetContainerParas(page.id, page.PageName(), pagePara);
}


InforCenter_Platform_ModelGenerator_SaveGrid = function (para) {
    if (para && para.length > 1) {
        var retData = HoteamUI.DataService.Call("InforCenter.ModelGenerator.ModelGeneratorService.CheckCheckOutUser", { para: { ObjType: para[1].ObjType } });
        if (!HoteamUI.Common.IsNullOrEmpty(retData)) {
            HoteamUI.UIManager.MsgBox(retData);
            return;
        }
        //var srcType = para[1].SrcType;
        //if (srcType != "Config") {
        //    //不是从配置文件读取的
        //    var ownCompanyID = para[1].ModelCompanyID;
        //    if (ownCompanyID != HoteamUI.Security.LoginPara.CompanyID) {
        //        HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("ModelGenerator.ConnotSaveOtherCompanyModel"));
        //        return;
        //    }
        //}
        var tabsCtrl = HoteamUI.Control.Instance(para[1].TabsGuid);
        var tbs = tabsCtrl.GetTabInfoList();
        var baseInfoData = "";
        var inheritInfoData = "";
        var extendInfoData = "";
        var foreignKeyInfoData = "";
        var allow = true;
        var columnList = [];
        //遍历tab页获取可编辑列表数据
        for (var index in tbs) {
            var tempObj = {};
            var curTb = tbs[index];
            var curListPage = HoteamUI.Page.Instance(tbs[index].pid);
            var tempInfoData = InforCenter_Platform_ModelGenerator_GetEditData(curListPage, columnList);
            var curItemName = tbs[index].pageParas.ItemName;
            if (tempInfoData === undefined) {
                var type = HoteamUI.Language.Lang("ModelGenerator", curItemName);
                var info = HoteamUI.Language.Lang("ModelGenerator", "DataCannotEmpty");
                HoteamUI.UIManager.MsgBox(type + " " + info);
                return;
            }

            if (tempInfoData) {
                if (curItemName == "BaseInfoList") {
                    baseInfoData = tempInfoData;
                } else if (curItemName == "InheritList") {
                    inheritInfoData = tempInfoData;
                } else if (curItemName == "ExtendList") {
                    extendInfoData = tempInfoData;
                } else {
                    foreignKeyInfoData = tempInfoData;
                }
            } else {
                allow = false;
            }
        }

        if (!HoteamUI.Common.IsNullOrEmpty(extendInfoData)) {
            var extendData = JSON.parse(extendInfoData);
            var baseData = JSON.parse(baseInfoData);
            if (extendData.length > 0) {
                for (var i in extendData) {
                    var curInfoData = extendData[i];
                    if (curInfoData.Column == baseData[0].Name) {
                        var message = HoteamUI.Language.Lang("ModelGenerator.PropertyNameInheritBaseConflict");
                        message = message.replace('[NAME]', curInfoData.Column);
                        HoteamUI.UIManager.MsgBox(message);
                        return;
                    } else if (HoteamUI.Common.IsNullOrEmpty(curInfoData.Column)) {
                        var message = HoteamUI.Language.Lang("ModelGenerator.ColumnNameEmpty");
                        HoteamUI.UIManager.MsgBox(message);
                        return;
                    }
                }
            }
            var inheritData = JSON.parse(inheritInfoData);
            for (var j in inheritData) {
                var curInheritData = inheritData[j];
                for (var i in extendData) {
                    var curInfoData = extendData[i];
                    if (curInfoData.Column == curInheritData.Column) {
                        var message = HoteamUI.Language.Lang("ModelGenerator.PropertyNameExtendInheritConflict");
                        message = message.replace('[NAME]', curInfoData.Column);
                        HoteamUI.UIManager.MsgBox(message);
                        return;
                    }
                }
            }
        }
        if (!allow) {
            var message = HoteamUI.Language.Lang("ModelGenerator.ColumnNameExist");
            HoteamUI.UIManager.MsgBox(message);
            return;
        }
        var retData = HoteamUI.DataService.Call("InforCenter.ModelGenerator.ModelGeneratorService.SaveModelData", { para: { ObjType: para[1].ObjType, BaseInfo: baseInfoData, InheritInfo: inheritInfoData, ExtendInfo: extendInfoData, ForeignKeyInfoData: foreignKeyInfoData } });
        if (retData) {
            var result = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GeneratorPageByWebModel", { para: { ObjType: para[1].ObjType } });
            if (result) {
                var message = HoteamUI.Language.Lang("ModelGenerator.SaveSuccess");
                HoteamUI.UIManager.MsgBox(message);
                InforCenter_Platform_MenuCtrl_InnerReceiveServerData(para[0], { confirm: "OK" });
            }
        }
    }
}

InforCenter_Platform_ModelGenerator_CheckIn = function (para) {
    var retData = HoteamUI.DataService.Call("InforCenter.ModelGenerator.ModelGeneratorService.CheckInObjectByTypeName", { para: { ObjType: para[1].ObjType } });
    if (retData) {
        var message = HoteamUI.Language.Lang("ModelGenerator.CheckInSuccess");
        HoteamUI.UIManager.MsgBox(message);
        InforCenter_Platform_MenuCtrl_InnerReceiveServerData(para[0], { confirm: "OK" });
    }
}


InforCenter_Platform_ModelGenerator_CheckOut = function (para) {
    var retData = HoteamUI.DataService.Call("InforCenter.ModelGenerator.ModelGeneratorService.CheckOutObjectByTypeName", { para: { ObjType: para[1].ObjType } });
    if (retData) {
        var message = HoteamUI.Language.Lang("ModelGenerator.CheckOutSuccess");
        HoteamUI.UIManager.MsgBox(message);
        InforCenter_Platform_MenuCtrl_InnerReceiveServerData(para[0], { confirm: "OK" });
    }
}

InforCenter_Platform_ModelGenerator_UndoCheckOut = function (para) {
    var retData = HoteamUI.DataService.Call("InforCenter.ModelGenerator.ModelGeneratorService.UndoCheckOutByTypeName", { para: { ObjType: para[1].ObjType } });
    if (retData) {
        var message = HoteamUI.Language.Lang("ModelGenerator.UndoCheckOutSuccess");
        HoteamUI.UIManager.MsgBox(message);
        InforCenter_Platform_MenuCtrl_InnerReceiveServerData(para[0], { confirm: "OK" });
    }
}





InforCenter_Platform_ModelGenerator_AddRow = function (para) {
    var editGrid = HoteamUI.Control.Instance(para[1].ListGuid);
    editGrid.AddGridRow("last", true, null);
    var index = editGrid.GetEditRowID();
    editGrid.SetCellContent(index, "DataType", "STRING100", "STRING100", true);
}

InforCenter_Platform_ModelGenerator_RemoveRow = function (para) {
    var editGrid = HoteamUI.Control.Instance(para[1].ListGuid);
    editGrid.DeleteGridRow();
}



InforCenter_Platform_ModelGenerator_ColumnLinkOnClick = function (ctrlEvent) {
    var listViewCtrl = HoteamUI.Control.Instance(ctrlEvent.o.ContainerID());
    var page = HoteamUI.Page.Instance(listViewCtrl.ContainerID());
    var pagePara = page.GetPara();
    var curObjId = ctrlEvent.rowobject.EID;
    var treeCtrl = HoteamUI.Control.Instance(pagePara.TreeGuid);
    if (treeCtrl.id != '') {
        var selectNode = treeCtrl.GetSelectedNode();
        var nodes = treeCtrl.GetChildrenNodes(selectNode);
        if (nodes == undefined) {
            var data = InforCenter_Platform_TreeViewCtrl_GetChildrenData(treeCtrl, selectNode);
            InforCenter_Platform_TreeViewCtrl_LoadNodes(treeCtrl, selectNode, data);
            var nodes = treeCtrl.GetChildrenNodes(selectNode);
        }
        var newSelectNode = null;
        for (var i = 0; i < nodes.length; i++) {
            var curNode = nodes[i];
            if (curNode.Value1 == curObjId) {
                newSelectNode = curNode;
                break;
            }
        }
        if (newSelectNode != null) {
            treeCtrl.SelectNode(newSelectNode);
            HoteamUI.Page.FireParentPageEvent(treeCtrl.ContainerID(), 'OnNodeChange', { ctrl: treeCtrl });
        }
    }
}


InforCenter_Platform_ModelGenerator_NewModel = function (para) {

}

InforCenter_Platform_ModelGenerator_GetEditData = function (page, columnList) {
    var listPage = HoteamUI.Page.InstanceIn(page.pid, "ListViewPageContainer", "EditListViewCtrl");
    var editGrid = listPage.GetControl("ListView");
    if (!editGrid.SaveEditCell()) {
        return;
    }
    if (!editGrid.GetRegexStatus()) {
        return;
    }
    if (editGrid.SaveGridRows) {
        var retData = [];
        //var nameArray = [];
        var editData = editGrid.SaveGridRows();
        var existName = false;
        for (var i = 0; i < editData.rowsObject.length; i++) {
            var tempData = InforCenter_Platform_ModelGenerator_RecombineData(editData.rowsObject[i]);
            //if (nameArray.indexOf(tempData.Column) > -1) {
            //    existName = true;
            //}
            for (var j = 0; j < columnList.length; j++) {
                if (tempData.Column && (columnList[j].toUpperCase() == tempData.Column.toUpperCase())) {
                    existName = true;
                    break;
                }
            }
            if (tempData.Column)
                columnList.push(tempData.Column);
            //nameArray.push(tempData.Column);
            retData.push(tempData);
        }
        if (existName) {
            return false;
        }
        return JSON.stringify(retData);
    }
}
InforCenter_Platform_ModelGenerator_RecombineData = function (rowData) {
    var data = {};
    for (var j in rowData) {
        if (HoteamUI.Common.IsNullOrEmpty(rowData[j].value)) {
            if (typeof rowData[j] === 'object')
                data[j] = "";
            else
                data[j] = rowData[j];
        } else {
            data[j] = rowData[j].value;
        }
    }
    return data;
}


InforCenter_Platform_ModelGenerator_EditInheritItem = function (para) {
    var retData = HoteamUI.DataService.Call("InforCenter.ModelGenerator.ModelGeneratorService.UpdateInheritInfoState", { para: { ObjType: para[1].ObjType, ObjInfoType: para[1].ObjInfoType } });
    if (retData) {
        InforCenter_Platform_MenuCtrl_InnerReceiveServerData(para[0], { confirm: "OK" });
    }
}

InforCenter_Platform_ModelGenerator_ResetInheritItem = function (para) {
    var retData = HoteamUI.DataService.Call("InforCenter.ModelGenerator.ModelGeneratorService.ResetInheritInfoState", { para: { ObjType: para[1].ObjType, ObjInfoType: para[1].ObjInfoType } });
    if (retData) {
        InforCenter_Platform_MenuCtrl_InnerReceiveServerData(para[0], { confirm: "OK" });
    }
}



HoteamUI_PageEvent_MODELDATACREATEOnGetDataFromPage_after = function (pageEvent) {
    var pagePara = pageEvent.o.GetPara();
    InforCenter_Platform_Object_Data.PObjType = pagePara.PObjType;
    var ret = HoteamUI.DataService.Call("InforCenter.ModelGenerator.ModelGeneratorService.CheckObjectNameExist", { para: { ObjType: InforCenter_Platform_Object_Data.ENAME } });
    if (!ret) {
        InforCenter_Platform_Object_Data = null;
    }
}


InforCenter_Platform_ModelGenerator_GetForeignKey = function (ctrlEvent) {
    var editRow = ctrlEvent.o.GetEditRowID();
    var keyValue = ctrlEvent.o.GetCellContent(editRow, "KEY").value;
    var srcText = ctrlEvent.o.GetCellContent(editRow, "KEY").text;
    var callback = function (data, ret) {
        if (ret) {
            ctrlEvent.setContent({ text: ret.Text, value: ret.Value });
            ctrlEvent.o.SaveGridRows();
        }
    }
    var title = HoteamUI.Language.Lang("ModelGenerator", "SetForeignKey");
    HoteamUI.UIManager.Popup("SetForeignKey", { ItemName: 'SetFKInfoList', Value: keyValue, Text: srcText }, callback, { ctrl: ctrlEvent.o }, "400*260", title);

}

InforCenter_Platform_SetForeignKey_LoadPage = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    var pageContainer = page.GetControl('ListPage');
    pageContainer.LoadPage("EditListManagement", pagePara);
    var listPage = HoteamUI.Page.InstanceIn(page.pid, "ListPage", "EditListManagement");
    var listViewPage = HoteamUI.Page.InstanceIn(listPage.pid, "ListViewPageContainer", "EditListViewCtrl");
    var editlistGrid = listViewPage.GetControl("ListView");
    if (pagePara.Value) {
        var valueData = pagePara.Value.split(';');
        var textData = pagePara.Text.split(';');
        for (var index in valueData) {
            var curValueData = valueData[index].split(':');
            var curTextData = textData[index].split(':');
            var objType = curValueData[0];
            var infoType = curValueData[1];
            var objTypeText = curTextData[0];
            var infoTypeText = curTextData[1];

            editlistGrid.AddGridRow("last", true, null);
            var rowid = editlistGrid.GetEditRowID();
            editlistGrid.SetCellContent(rowid, "ABOUTOBJECT", objTypeText, objType, true);
            var retData = HoteamUI.DataService.Call("InforCenter.ModelGenerator.ModelGeneratorService.GetObjectInfoTypeList", { para: { ObjType: objType } });
            editlistGrid.SetDataSource(rowid, "ABOUTFIELD", retData);
            editlistGrid.SetCellContent(rowid, "ABOUTFIELD", infoTypeText, infoType, true);
        }
    }
}

InforCenter_Platform_SetForeignKey_OnOK = function (ctrlEvent) {
    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    var listPage = HoteamUI.Page.InstanceIn(page.pid, "ListPage", "EditListManagement");
    var listViewPage = HoteamUI.Page.InstanceIn(listPage.pid, "ListViewPageContainer", "EditListViewCtrl");
    var editlistGrid = listViewPage.GetControl("ListView");
    var editData = editlistGrid.SaveGridRows();
    var text = '';
    var value = '';
    for (var i in editData.rowsObject) {
        var curObj = editData.rowsObject[i];
        text += ";" + curObj.ABOUTOBJECT.text + ":" + curObj.ABOUTFIELD.text;
        value += ";" + curObj.ABOUTOBJECT.value + ":" + curObj.ABOUTFIELD.value;
    }
    var retObj = {};
    retObj.Text = text.substr(1);
    retObj.Value = value.substr(1);
    HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), retObj);
}

InforCenter_Platform_SetForeignKey_CheckKeyField = function (ctrlEvent) {
    var rowids = ctrlEvent.o.GetEditRowID();
    var retData = HoteamUI.DataService.Call("InforCenter.ModelGenerator.ModelGeneratorService.GetObjectInfoTypeList", { para: { ObjType: ctrlEvent.newData.ABOUTOBJECT.value } });
    ctrlEvent.o.SetDataSource(rowids, "ABOUTFIELD", retData);
}


InforCenter_Platform_ModelGenerator_CheckNodeType = function (para) {
    if (para[1].NodeType != 'WEBMODEL') {
        var message = HoteamUI.Language.Lang("ModelGenerator.ActionDenyInfo");
        HoteamUI.UIManager.MsgBox(message);
    } else {
        InforCenter_Platform_MenuCtrl_InnerReceiveServerData(para[0], { confirm: "OK" });
    }
}


InforCenter_Platform_ModelGenerator_RowMove = function (para) {
    var editGrid = HoteamUI.Control.Instance(para[1].ListID);
    var selectRowIds = editGrid.GetSelectedRowsID();
    var index = 0;
    if (para[1].Mode == "up") {
        index -= 1;
        for (var i = 0; i < selectRowIds.length; i++) {
            editGrid.UnSelectAll();
            editGrid.SetSelectedRow(selectRowIds[i]);
            var result = editGrid.MoveGridRow("before");
            if (result == 0) {
                var message = HoteamUI.Language.Lang("ModelGenerator.FirstRow");
                HoteamUI.UIManager.MsgBox(message);
            }
        }
    } else {
        index += 1;
        for (var i = selectRowIds.length - 1; i >= 0; i--) {
            editGrid.UnSelectAll();
            editGrid.SetSelectedRow(selectRowIds[i]);
            var result = editGrid.MoveGridRow("after");
            if (result == 0) {
                var message = HoteamUI.Language.Lang("ModelGenerator.LastRow");
                HoteamUI.UIManager.MsgBox(message);
            }
        }
    }
    for (var j = 0; j < selectRowIds.length; j++) {
        selectRowIds[j] = selectRowIds[j] + index;
    }
    editGrid.SetSelectedRow(selectRowIds);
}

InforCenter_Platform_ModelGenerator_StartModel = function (para) {
    var retData = HoteamUI.DataService.Call("InforCenter.ModelGenerator.ModelGeneratorService.StartModel", { para: { ObjType: para[1].ObjType } });
    if (retData) {
        var message = HoteamUI.Language.Lang("ModelGenerator.ModelStarted");
        HoteamUI.UIManager.MsgBox(message);
        InforCenter_Platform_MenuCtrl_InnerReceiveServerData(para[0], { confirm: "OK" });
    }
}
InforCenter_Platform_ModelGenerator_StopModel = function (para) {
    var retData = HoteamUI.DataService.Call("InforCenter.ModelGenerator.ModelGeneratorService.StopModel", { para: { ObjType: para[1].ObjType } });
    if (retData) {
        var message = HoteamUI.Language.Lang("ModelGenerator.ModelStopd");
        HoteamUI.UIManager.MsgBox(message);
        InforCenter_Platform_MenuCtrl_InnerReceiveServerData(para[0], { confirm: "OK" });
    }
}
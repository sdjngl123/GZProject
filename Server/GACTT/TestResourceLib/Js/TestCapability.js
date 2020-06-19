
GACTT_TestResourceLib_TestCapability_LoadPage = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    var listGrid = page.GetControl("ListView");
    var titleDataService = "'Hoteam.GACTT.TestResourceLibService.GetTestCapabilityTreeGridRowTitle";
    var data = HoteamUI.DataService.Call(titleDataService, { para: {} });
    if (data) {
        listGrid.LoadColTitle({ data: data });
    }

}

GACTT_TestResourceLib_TestCapability_GridData = function (ctrlEvent) {
    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    var pagePara = page.GetPara();
    var listGrid = ctrlEvent.o;
    var menuPage = HoteamUI.Page.InstanceIn(page.pid, "MenuPageContainer", "MenuCtrl");
    var menuGrid = menuPage.GetControl("Menu");
    pagePara.MenuGuid = menuGrid.id;
    pagePara.ListGuid = listGrid.id;
    pagePara.TreeListChildDataService = 'Hoteam.GACTT.TestResourceLibService.GetTestCapabilityTreeGridChildRowData';
    pagePara.ParaList = ['ObjectID', 'PEID'];
    pagePara.MenuName = 'TestCapabilityTreeListMenu';
    if (!HoteamUI.Common.IsNullOrEmpty(pagePara.ObjectID)) {
        GACTT_TestResourceLib_TestCapability_LoadMenus(page, pagePara, menuPage);

        var pageContainer = listGrid.OtherControl("TreeListView_Container");
        var dataService = "Hoteam.GACTT.TestResourceLibService.GetTestCapabilityTreeGridRowData";
        var data = HoteamUI.DataService.Call(dataService, { para: { ObjectID: pagePara.ObjectID, ObjectType: pagePara.ObjectType } });
        if (data) {
            listGrid.LoadGridRows(data);
        }
        HoteamUI.Page.SetContainerParas(pageContainer.id, 'TreeListView_Container', pagePara);
    }
    HoteamUI.Page.SetContainerParas(page.pid, page.PageName(), pagePara);
}

GACTT_TestResourceLib_TestCapability_LoadMenus = function (page, pagePara, menuPage) {
    var listManagementContainer = page.GetControl("TreeListView_Container");
    var menuflag = false;
    if (pagePara.HiddenMenu) {
        listManagementContainer.HiddenPanel(["item1"]);
        return;
    }
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.MenuName) == false) {//如果有菜单，则将item1展示
        var menuData = InforCenter_Platform_MenuCtrl_LoadMenus(menuPage, pagePara, pagePara.MenuName);
        if (menuData && menuData.Menus && menuData.Menus.length > 0) {
            menuflag = true;
        }
    }
    if (HoteamUI.Common.IsNullOrEmpty(listManagementContainer) == false) {
        if (menuflag) {
            listManagementContainer.ShowPanel(["item1"]);
        }
        else {
            //如果没菜单，将item1隐藏
            listManagementContainer.HiddenPanel(["item1"]);
        }
    }
    return true;
}


GACTT_TestResourceLib_TestCapability_OpenRow = function (ctrlEvent) {
    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    var pagePara = page.GetPara();
    var node = ctrlEvent.o.GetRowByRowID(ctrlEvent.rowid);

    var dataService = "Hoteam.GACTT.TestResourceLibService.GetTestCapabilityTreeGridChildRowData";
    var data = HoteamUI.DataService.Call(dataService, { para: { PEID: node.EID, ObjectID: pagePara.ObjectID, ObjectType: pagePara.ObjectType } });
    InforCenter_Platform_TreeListViewCtrl_LoadNodes(ctrlEvent.o, ctrlEvent.rowid, data);
}

GACTT_TestResourceLib_TestCapability_OnCheckboxClick = function (ctrlEvent) {
    //注释掉勾选当前行级联勾选下级行
    //GACTT_TestResourceLib_TestCapability_DeepSetCheckState(ctrlEvent, ctrlEvent.rowid);
}

GACTT_TestResourceLib_TestCapability_OnColLinkClick = function (ctrlEvent) {
    HoteamUI.UIManager.Popup({
        pagename: "ViewObject", paras: { SelectID: ctrlEvent.rowobject.EID },
        size: '500*250'
    });
}

GACTT_TestResourceLib_TestCapability_DeepSetCheckState = function (ctrlEvent, parentId) {
    var childRow = ctrlEvent.o.GetChildRows(parentId);
    if (childRow && childRow.length > 0) {
        for (var i in childRow) {
            var curRowNumber = childRow[i].row_number;
            if (ctrlEvent.rowselected) {
                ctrlEvent.o.SetSelectedRow(curRowNumber);
            } else {
                ctrlEvent.o.SetUnSelectRow(curRowNumber);
            }
            GACTT_TestResourceLib_TestCapability_DeepSetCheckState(ctrlEvent, curRowNumber);
        }
    }
}

GACTT_TestResourceLib_TestCapability_RefreshTreeList = function (para) {
    var pageId = HoteamUI.Control.Instance(para[1].ListID).ContainerID();
    HoteamUI.Page.FirePageEvent(pageId, "OnCreate", { ObjectID: para[1].ObjectID });
}

HoteamUI_PageEvent_TESTCAPABILITYCREATEOnGetDataFromPage_after = function (pageEvent) {
    if (InforCenter_Platform_Object_Data)
        InforCenter_Platform_Object_Data.STATEID = 'Save';
}

InforCenter_GACTT_TestAbility_Add = function (para) {
    var callback = function (opt, ret) {
        if (ret) {
            var peid = opt.data[1].PEID;
            var linkTypeName = opt.data[1].LinkTypeName;
            var ids = '';
            for (var i = 0; i < ret.length; i++) {
                ids += ';' + ret[i].EID;
            }
            if (ids.length > 0) {
                ids = ids.substr(1);
            }
            var dataService = "Hoteam.GACTT.TestResourceLibService.AddLinkByObjectIdAndLinkTypeName";
            var result = HoteamUI.DataService.Call(dataService, { para: { PEID: peid, ObjectID: ids, LinkTypeName: linkTypeName } });
            if (result) {
                InforCenter_Platform_MenuCtrl_InnerReceiveServerData(opt.data[0], { confirm: "OK" });
            }
        }
    }
    HoteamUI.UIManager.Popup("ListCommonQuery", { ItemName: para[1].QueryName }, callback, { data: para }, "700*500");
}

InforCenter_GACTT_TestAbility_Remove = function (para) {
    var dataService = "Hoteam.GACTT.TestResourceLibService.RemoveLinkObject";
    var result = HoteamUI.DataService.Call(dataService, { para: { ObjectID: para[1].LID } });
    if (result) {
        InforCenter_Platform_MenuCtrl_InnerReceiveServerData(para[0], { confirm: "OK" });
    }
}

InforCenter_GACTT_NewTestAbility_Add = function (para) {
    var callback = function (opt, ret) {
        if (ret) {
            var listCtrl = HoteamUI.Control.Instance(opt.data[1].ListID);
            var allRows = listCtrl.GetCurrentPageRows();
            var newRows = [];
            for (var j = 0; j < ret.length; j++) {
                var newTempRow = ret[j];
                for (var i in newTempRow) {
                    if (i.indexOf('_DisplayValue') < 0)
                        newTempRow[i] = newTempRow[i + '_DisplayValue'];
                }
                var exist = false;
                for (var i = 0; i < allRows.length; i++) {
                    var tempRow = allRows[i];
                    if (newTempRow.EID == tempRow.EID) {
                        exist = true;
                    }
                }
                if (!exist) {
                    newRows.push(newTempRow);
                }
            }
            listCtrl.AddRows(newRows);
        }
    }
    HoteamUI.UIManager.Popup("ListCommonQuery", { ItemName: para[1].QueryName }, callback, { data: para }, "700*500");
}

InforCenter_GACTT_NewTestAbility_Remove = function (para) {
    var listCtrl = HoteamUI.Control.Instance(para[1].ListID);
    listCtrl.RemoveSelectedRows();
}

InforCenter_GACTT_TestAbility_SaveData = function (pageList) {
    var saveData = {};
    var objectId = '';
    var baseObjName = '';
    var resourceIds = [];
    var knowledgeIds = [];
    for (var i = 0; i < pageList.length; i++) {
        var curPage = pageList[i];
        var curPagePara = curPage.pageParas;
        objectId = curPage.pageParas.ObjectID;
        if (curPage.pageName == 'TESTCAPABILITY-CREATE' || curPage.pageName == 'TESTCAPABILITY-EDIT') {
            var data = InforCenter_Platform_Object_GetDataFromPage(curPage.pid);
            if (data) {
                if (curPagePara.initData) {
                    for (var property in curPagePara.initData) {
                        data[property] = curPagePara.initData[property];
                    }
                }
                saveData.BaseData = data;
            } else {
                return false;
            }
        } else {
            var listPage = HoteamUI.Page.InstanceIn(curPage.pid, "ListViewPageContainer", "ListViewCtrl");
            var grid = listPage.GetControl("ListView");
            var gridData = grid.GetCurrentPageRows();
            if (curPagePara.ItemName == 'AddTestResourceList') {
                for (var j = 0; j < gridData.length; j++) {
                    var tempData = gridData[j];
                    resourceIds.push(tempData.EID);
                }
            } else {
                for (var j = 0; j < gridData.length; j++) {
                    var tempData = gridData[j];
                    knowledgeIds.push(tempData.EID);
                }
            }
        }
    }
    if (saveData) {
        var retData = HoteamUI.DataService.Call("Hoteam.GACTT.TestResourceLibService.SaveCapabilityData", { para: { BaseData: JSON.stringify(saveData.BaseData), KnowledgeID: JSON.stringify(knowledgeIds), ResourceID: JSON.stringify(resourceIds), ObjectID: objectId } });
        if (retData) {
            return retData;
        }
    }
}

InforCenter_GACTT_CapabilityBatchEdit_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var fieldCtrl = page.GetControl('SELECTFIELD_Value');
    InforCenter_Platform_Object_SetEnumListbyName(fieldCtrl, 'BatchEditField', true);
}

InforCenter_GACTT_CapabilityBatchEdit_OnOK = function (ctrlEvent) {
    var ctrl = ctrlEvent.o;
    var page = HoteamUI.Page.Instance(ctrl.ContainerID());
    var pagePara = page.GetPara();
    var fieldCtrl = ctrl.OtherControl('SELECTFIELD_Value');
    var field = fieldCtrl.GetSelectedValue();
    var valueCtrl = ctrl.OtherControl('TVALUE_Value');
    var value = valueCtrl.GetValue();
    var wcf = 'Inforcenter.GACTT.CommonService.SetObjectValueByFiledName';
    if (field == 'ORG') {
        wcf = 'Inforcenter.GACTT.TestResourceLibService.ChangeCapabilityOrg';
    }
    var result = HoteamUI.DataService.Call(wcf, { para: { ObjectID: pagePara.ObjectID, FieldName: field, Value: value } });
    if (result) {
        var msg = HoteamUI.Language.Lang("TestResourceLib.SetSuccess");
        HoteamUI.UIManager.MsgBox(msg);
        HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), { confirm: "OK" });
    }
}

InforCenter_GACTT_CapabilityBatchEdit_SelectFieldOnChange = function (ctrlEvent) {
    var ctrl = ctrlEvent.o;

}

InforCenter_GACTT_CapabilityBatchEdit_ValueOnClick = function (ctrlEvent) {
    var ctrl = ctrlEvent.o;
    var fieldCtrl = ctrl.OtherControl('SELECTFIELD_Value');
    var field = fieldCtrl.GetSelectedValue();

    var callback = function (opt, ret) {
        if (ret) {
            var tValueCtrl = opt.ctrl.OtherControl('TVALUE_Value');
            tValueCtrl.SetText(ret[0].ENAME);
            tValueCtrl.SetValue(ret[0].EID);
        }
    }
    var queryName = 'TestLocationListQuery';
    if (field == 'ORG') {
        queryName = 'TestOrgListQuery';
    } else if (field == 'CONTACTPERSON') {
        queryName = 'SingleUserTreeListQuery';
    }
    HoteamUI.UIManager.Popup("ListCommonQuery", { ItemName: queryName }, callback, { ctrl: ctrl }, "1000*500");
}


InforCenter_GACTT_TESTCAPABILITY_OnSelectTestProject = function (ctrlEvent) {
    var ctrl = ctrlEvent.o;
    var callback = function (opt, ret) {
        if (ret) {
            var tValueCtrl = opt.ctrl.OtherControl('ENAME_Value');
            var projectCtrl = opt.ctrl.OtherControl('Project_Value');
            var oldNameCtrl = opt.ctrl.OtherControl('OldName_Value');
            tValueCtrl.SetText(ret[0].ENAME);
            oldNameCtrl.SetText(ret[0].ENAME);
            projectCtrl.SetText(ret[0].EID);
        }
    }
    HoteamUI.UIManager.Popup("ListCommonQuery", { ItemName: 'TestProjectListQuery' }, callback, { ctrl: ctrl }, "1000*500");
}

InforCenter_GACTT_TESTCAPABILITY_OnCreate = function (pageEvent) {
    var para = pageEvent.o.GetPara();
    var data = InforCenter_Platform_Object_GetObjectInitData('TESTCAPABILITY', para);
    {
        var o = pageEvent.o.GetControl('ENAME_Value');
        if (o.id != '') {
            o.SetText(data.ENAME_DisplayValue);
        }
    } {
        var o = pageEvent.o.GetControl('TYPE_Value');
        if (o.id != '') {
            if (!HoteamUI.Common.IsNullOrEmpty(para.initData.TESTPROJECT)) {
                var pData = InforCenter_Platform_Object_GetObjectData(para.initData.TESTPROJECT, para);
                o.SetSelectedByValue(pData.TYPE);
                o.Disable();
            }
        }
    } {
        var o = pageEvent.o.GetControl('TESTPROJECT_Value');
        if (o.id != '') {
            o.SetText(data.TESTPROJECT_DisplayValue);
        }
    } {
        var c = pageEvent.o.GetControl('STANDARDCODE_Value');
        if (c.id != '') {
            c.SetText(data.STANDARDCODE);
        }
    }
    {
        var c = pageEvent.o.GetControl('STANDARDNAME_Value');
        if (c.id != '') {
            c.SetText(data.STANDARDNAME);
        }
    }

    {
        var o = pageEvent.o.GetControl('ORG_Value');
        if (o.id != '') {
            o.SetValue(data.ORG);
            o.SetText(data.ORG_DisplayValue);
        }
    } {
        var o = pageEvent.o.GetControl('CONTACTPERSON_Value');
        if (o.id != '') {
            o.SetValue(data.CONTACTPERSON);
            o.SetText(data.CONTACTPERSON_DisplayValue);
        }
    }
    {
        var o = pageEvent.o.GetControl('LOCATION_Value');
        if (o.id != '') {
            o.SetValue(data.LOCATION);
            o.SetText(data.LOCATION_DisplayValue);
        }
    } {
        var o = pageEvent.o.GetControl('SCHEDULETYPE_Value');
        if (o.id != '') {
            o.SetSelectedByValue(data.SCHEDULETYPE);
        }
    } {
        var c = pageEvent.o.GetControl('CYCLE_Value');
        if (c.id != '') {
            c.SetText(data.CYCLE);
        }
    }
    {
        var c = pageEvent.o.GetControl('WORKHOURS_Value');
        if (c.id != '') {
            c.SetText(data.WORKHOURS);
        }
    }
    {
        var c = pageEvent.o.GetControl('ACTUALCOST_Value');
        if (c.id != '') {
            c.SetText(data.ACTUALCOST);
        }
    }
    {
        var c = pageEvent.o.GetControl('VIRTUALCOST_Value');
        if (c.id != '') {
            c.SetText(data.VIRTUALCOST);
        }
    }
    {
        var o = pageEvent.o.GetControl('WORKMODE_Value');
        if (o.id != '') {
            o.SetSelectedByValue(data.WORKMODE);
        }
    } {
        var c = pageEvent.o.GetControl('CARRYINGCAPACITY_Value');
        if (c.id != '') {
            c.SetText(data.CARRYINGCAPACITY);
        }
    }
    {
        var c = pageEvent.o.GetControl('ISPARALLEL_Value');
        if (c.id != '') {
            c.SetChecked(data.ISPARALLEL);
        }
        var d = pageEvent.o.GetControl('ISPARALLEL_Label');
        if (d.id != '') {
            d.SetText('');
        }
    }
    {
        var c = pageEvent.o.GetControl('ISSHARE_Value');
        if (c.id != '') {
            c.SetChecked(data.ISSHARE);
        }
        var d = pageEvent.o.GetControl('ISSHARE_Label');
        if (d.id != '') {
            d.SetText('');
        }
    }
    {
        var c = pageEvent.o.GetControl('ISUPLOADTESTDATA_Value');
        if (c.id != '') {
            c.SetChecked(data.ISUPLOADTESTDATA);
        }
        var d = pageEvent.o.GetControl('ISUPLOADTESTDATA_Label');
        if (d.id != '') {
            d.SetText('');
        }
    }
    {
        var c = pageEvent.o.GetControl('ISUPLOADVTSDATA_Value');
        if (c.id != '') {
            c.SetChecked(data.ISUPLOADVTSDATA);
        }
        var d = pageEvent.o.GetControl('ISUPLOADVTSDATA_Label');
        if (d.id != '') {
            d.SetText('');
        }
    }
    {
        var c = pageEvent.o.GetControl('ABILITYORDER_Value');
        if (c.id != '') {
            c.SetText(data.ABILITYORDER);
        }
    }
    {
        var c = pageEvent.o.GetControl('ISCNAS_Value');
        if (c.id != '') {
            c.SetChecked(data.ISCNAS);
        }
        var d = pageEvent.o.GetControl('ISCNAS_Label');
        if (d.id != '') {
            d.SetText('');
        }
    }
}
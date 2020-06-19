
//列表页面加载事件
InforCenter_Platform_EditListViewCtrl_LoadListView = function (listPage, para, listViewName) {
    var pageContainer = listPage.GetControl("ListView_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
    var listGrid = listPage.GetControl("ListView");


    if (pagePara == "" || HoteamUI.Common.IsNullOrEmpty(pagePara.ListViewName) == true || pagePara.ListViewName != listViewName) {
        if (HoteamUI.Common.IsNullOrEmpty(listViewName) == false) {
            para.ListViewName = listViewName;
        }
        var ctrlPage = "EditListViewCtrl";
        if (HoteamUI.Common.IsNullOrEmpty(para.ListCtrlPageName) == false) {
            ctrlPage = para.ListCtrlPageName;
        }
        //为保证正确性，兼容原来错误的方式
        HoteamUI.Page.SetContainerParas(pageContainer.id, para);

        HoteamUI.Page.SetContainerParas(listPage.pid, para);
        //获取列表标题内容
        var listTitleData = InforCenter_Platform_EditListViewCtrl_GetGridTitleData(listGrid, para, pagePara);
        //可编辑列表没有右键，如果增加，在放开
        //if (listTitleData != null) {
        //    InforCenter_Platform_ListViewCtrl_SetRightMenu(listPage, para);
        //    InforCenter_Platform_ListViewCtrl_SetSuspension(listPage, para);
        //}
    }
    else {
        InforCenter_Platform_EditListViewCtrl_GetGridData(listGrid, pagePara);
    }
    return listTitleData;
};
//获取列表内容事件调用方法
InforCenter_Platform_EditListViewCtrl_GridData = function (ctrlEvent) {
    InforCenter_Platform_EditListViewCtrl_GetGridData(ctrlEvent.o, {});
}


//获取一页列表数据通用方法
InforCenter_Platform_EditListViewCtrl_GetGridData = function (listGrid, para) {
    var pageContainer = listGrid.OtherControl("ListView_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);

    if (pagePara) {
        $.extend(pagePara, para);
        var ctrlPage = "EditListViewCtrl";
        if (HoteamUI.Common.IsNullOrEmpty(pagePara.ListCtrlPageName) == false) {
            ctrlPage = pagePara.ListCtrlPageName;
        }
        HoteamUI.Page.SetContainerParas(pageContainer.id, ctrlPage, pagePara);
        var pager = listGrid.GetPagerInfo();

        if (para.CurrentPager) {
            pager.CurrentPager = para.CurrentPager;
            listGrid.SetPagerInfo(pager);
        }
        if (para.RowNumber) {
            pager.RowNumber = para.RowNumber;
            listGrid.SetPagerInfo(pager);
        }

        var pageDataService = "InforCenter.Common.EditWebListViewService.GetGridData";
        if (HoteamUI.Common.IsNullOrEmpty(pagePara.EditListDataService) == false) {
            pageDataService = pagePara.EditListDataService;
        }
        var returnData = InforCenter_Platform_MenuCtrl_GetParameters(pagePara, pagePara);
        returnData = JSON.stringify(returnData);
        pagePara = InforCenter_Platform_ListViewCtrl_MergeFilter(pagePara);
        var paras = {
            para:
                {
                    Pager: pager,
                    ViewName: pagePara.ListViewName,
                    ParaList: returnData,
                    FilterString: pagePara.FilterString,
                    EntityFilterString: pagePara.EntityFilterString,
                    CustomViewFilterString: pagePara.CustomViewFilterString,
                    ObjectType: pagePara.ObjectType
                }
        };
        paras.para.OnlyQuery = "true";
        if (HoteamUI.Common.IsNullOrEmpty(pagePara.OnlyQuery) == false) {
            paras.para.OnlyQuery = pagePara.OnlyQuery;
        }
        if (pagePara.AsyncLoadData == true || pagePara.AsyncLoadData == "true") {
            //异步加载
            var callback = function (ret, data) {
                if (HoteamUI.Common.IsNullOrEmpty(ret) == false) {
                    if (HoteamUI.Common.IsNullOrEmpty(pagePara.DistinctField) == false) {
                        ret = InforCenter_Platform_ListViewCtrl_DistinctRow(ret, pagePara);
                    }
                    listGrid.LoadGridRows(ret);
                }
                HoteamUI.Window.WaitWindow.LayoutDestory(pageContainer.id);
            }
            HoteamUI.DataService.AsyncCall(pageDataService, paras, callback);
            HoteamUI.Window.WaitWindow.LayoutShow(pageContainer.id);
        } else {
            var gridData = HoteamUI.DataService.Call(pageDataService, paras);
            if (HoteamUI.Common.IsNullOrEmpty(gridData) == false) {
                if (HoteamUI.Common.IsNullOrEmpty(pagePara.DistinctField) == false) {
                    gridData = InforCenter_Platform_ListViewCtrl_DistinctRow(gridData, pagePara);
                }
                listGrid.LoadGridRows(gridData);
            }
        }

    }
    return gridData;
}

//获取列表标题通用方法
InforCenter_Platform_EditListViewCtrl_GetGridTitleData = function (listGrid, para, oldPara) {
    var titleDataService = "InforCenter.Common.EditWebListViewService.GetEditGridRowTitle";
    if (HoteamUI.Common.IsNullOrEmpty(para.EditListTitleDataService) == false) {
        titleDataService = para.EditListTitleDataService;
    }
    if (para.gridTitle == undefined) {
        var execPara = {};
        if (oldPara != undefined && oldPara != "" && HoteamUI.Common.IsNullOrEmpty(oldPara.RefreshTitle) == false && oldPara.RefreshTitle == "true") {
            var returnData = InforCenter_Platform_MenuCtrl_GetParameters(oldPara, oldPara);
            returnData = JSON.stringify(returnData);
            execPara.para = { ViewName: para.ListViewName, ParaList: returnData, ObjectType: para.ObjectType };
        }
        else {
            var sParaList = JSON.stringify(para);
            execPara.para = { ViewName: para.ListViewName, ParaList: sParaList, ObjectType: para.ObjectType };
        }

        para.gridTitle = HoteamUI.DataService.Call(titleDataService, execPara);
        //para.gridTitle = HoteamUI.DataService.Call(titleDataService, { para: { ViewName: para.ListViewName } });
    }
    InforCenter_Platform_EditListViewCtrl_SetGridTitle(listGrid, para);
    return para.gridTitle;
}
InforCenter_Platform_EditListViewCtrl_SetGridTitle = function (listGrid, para) {
    var gridTitle = para.gridTitle;
    if (HoteamUI.Common.IsNullOrEmpty(gridTitle) == false) {

        var pageContainer = listGrid.OtherControl("ListView_Container");
        var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
        pagePara.ParaList = gridTitle.FilterFlag;
        pagePara.WebListView = gridTitle.WebListView;

        if (para.AutoLoadData != undefined) {
            pagePara.AutoLoadData = para.AutoLoadData;
        }
        var ctrlPage = "EditListViewCtrl";
        if (HoteamUI.Common.IsNullOrEmpty(pagePara.ListCtrlPageName) == false) {
            ctrlPage = pagePara.ListCtrlPageName;
        }
        HoteamUI.Page.SetContainerParas(pageContainer.id, ctrlPage, pagePara);


        var allowCheckBox = gridTitle.WebListView.AllowCheckBox;
        if (para.AllowCheckBox != undefined) {
            allowCheckBox = para.AllowCheckBox;
        }
        var titlePara = {};
        titlePara.data = gridTitle.TitleObjectData ? gridTitle.TitleObjectData : gridTitle.TitleData;
        titlePara.multiselect = allowCheckBox;
        titlePara.autoLoadData = gridTitle.WebListView.AutoLoadData;
        titlePara.SuspensionMenuField = gridTitle.WebListView.SuspensionMenuField;
        titlePara.isShowSearch = gridTitle.WebListView.IsShowSearch;
        titlePara.isLayoutSave = gridTitle.WebListView.IsLayoutSave;
        titlePara.isColumnSetting = gridTitle.WebListView.IsColumnSetting;
        titlePara.zebraList = gridTitle.WebListView.ZebraList;
        titlePara.hoverLight = gridTitle.WebListView.HoverLight;
        titlePara.border = gridTitle.WebListView.Border;
        titlePara.KeyField = gridTitle.WebListView.KeyField;
        titlePara.OnRowClick = gridTitle.WebListView.OnRowClick;
        if (para.AutoLoadData != undefined) {
            titlePara.autoLoadData = para.AutoLoadData;
        }
        if (para.ShowPaging != undefined) {
            (para.ShowPaging === "true" || para.ShowPaging === true) ? titlePara.showPageBar = true : titlePara.showPageBar = false;
        }
        else {
            (gridTitle.WebListView.ShowPaging === true) ? titlePara.showPageBar = true : titlePara.showPageBar = false;
        }

        if (para.RowList != undefined) {
            titlePara.rowList = para.RowList;
        }

        listGrid.LoadColTitle(titlePara);
    }

    InforCenter_Platform_EditListViewCtrl_SetListButtonVisable(gridTitle.WebListView.IsSelectExporting, listGrid, "exportList");
    InforCenter_Platform_EditListViewCtrl_SetListButtonVisable(para.IsSelectExporting, listGrid, "exportList");


    InforCenter_Platform_EditListViewCtrl_SetListButtonVisable(gridTitle.WebListView.IsAllExporting, listGrid, "allExportList");
    InforCenter_Platform_EditListViewCtrl_SetListButtonVisable(para.IsAllExporting, listGrid, "allExportList");

    InforCenter_Platform_EditListViewCtrl_SetListButtonVisable(gridTitle.WebListView.IsSelectPrinting, listGrid, "printList");
    InforCenter_Platform_EditListViewCtrl_SetListButtonVisable(para.IsSelectPrintin, listGrid, "printList");

    InforCenter_Platform_EditListViewCtrl_SetListButtonVisable(gridTitle.WebListView.IsAllPrinting, listGrid, "allPrintList");
    InforCenter_Platform_EditListViewCtrl_SetListButtonVisable(para.IsAllPrinting, listGrid, "allPrintList");
}

InforCenter_Platform_EditListViewCtrl_SetListButtonVisable = function (value, listGrid, btnName) {
    if (value == undefined || value == null) {
        return;
    }

    if (value == true) {
        listGrid.ShowButton(btnName);
    }
    else {
        listGrid.HideButton(btnName);
    }
}

InforCenter_Platform_EditListViewCtrl_SetListViewPara = function (listGrid, para) {
    var pageContainer = listGrid.OtherControl("ListView_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
    if (pagePara) {
        $.extend(pagePara, para);
    }
    var ctrlPage = "EditListViewCtrl";
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.ListCtrlPageName) == false) {
        ctrlPage = pagePara.ListCtrlPageName;
    }
    HoteamUI.Page.SetContainerParas(pageContainer.id, ctrlPage, pagePara);

}


InforCenter_Platform_EditListViewCtrl_OnAfterEdit = function (ctrlEvent) {
    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    var pagePara = page.GetPara();
    if (!pagePara)
        pagePara = {};
    var para = {};
    para.EditGridCtrlEvent = ctrlEvent;
    para = $.extend({}, true, para, pagePara);
    var parentpagepid = HoteamUI.Page.ParentPage(page.pid);
    return HoteamUI.Page.FirePageEvent(parentpagepid, 'OnGridAfterEdit', para);

}

InforCenter_Platform_EditListViewCtrl_OnBeforeEdit = function (ctrlEvent) {
    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    var pagePara = page.GetPara();
    if (!pagePara)
        pagePara = {};
    var para = {};
    para.EditGridCtrlEvent = ctrlEvent;
    para = $.extend({}, true, para, pagePara);
    var parentpagepid = HoteamUI.Page.ParentPage(page.pid);
    return HoteamUI.Page.FirePageEvent(parentpagepid, 'OnGridBeforeEdit', para);
}

//添加一行
InforCenter_Platform_EditListViewCtrl_AddRow = function (para) {
    if (para && para.length > 1) {
        var listid = para[1].ListID;
        var ActionType = para[1].ActionType;
        //判断是否有新建权限
        if (para[1].NotPermission == "true" || InforCenter_Platform_EditListViewCtrl_ActionChecker("CREATE", ActionType) == true) {
            var editGrid = HoteamUI.Control.Instance(listid);
            if (para[1].InitData) {
                var data = {};
                for (var info in para[1].InitData) {
                    if (!para[1].InitData.hasOwnProperty(info)) {
                        continue;
                    }
                    data[info] = { ColText: para[1].InitData[info], ColValue: para[1].InitData[info] };
                }
                editGrid.AddGridRow("last", false, data);
            }
            else if (editGrid.AddGridRow) {
                editGrid.AddGridRow("last");
            }
        }
    }
}

//删除一行
InforCenter_Platform_EditListViewCtrl_DeleteRow = function (para) {
    if (para && para.length > 1) {
        var listid = para[1].ListID;
        var actionType = para[1].ActionType;
        var selectID = para[1].SelectID;
        if (selectID) {
            var ids = selectID.split(';');
            selectID = "";
            for (var i = 0; i < ids.length; i++) {
                if (ids[i]) {
                    selectID += ";" + ids[i];
                }
            }
            if (selectID.length > 0) {
                selectID = selectID.substring(1);
            }
        }
        var editGrid = HoteamUI.Control.Instance(listid);
        if (editGrid.DeleteGridRow) {
            if (selectID && actionType) {
                para[1].SelectID = selectID;
                //验证权限
                if (para[1].NotPermission == "true" || InforCenter_Platform_EditListViewCtrl_ActionChecker("DELETE", actionType, selectID) == true) {
                    //后台进行验证
                    var paras = {
                        para: para[1]
                    }
                    var result = 0;
                    if (para[1].ValidateObject) {
                        result = HoteamUI.DataService.Call("InforCenter.Common.ObjectService.DeleteObjCheckObjToObj", paras);
                    }

                    if (result == 0) {
                        if (para[1].ValidateParentLink
                            || para[1].ValidateParentLink == ""
                            || para[1].ValidateChildLink
                            || para[1].ValidateChildLink == "") {
                            result = HoteamUI.DataService.Call("InforCenter.Common.ObjectService.DeleteObjCheckLink", paras);
                            if (result == 0) {
                                editGrid.DeleteGridRow();
                            }
                        } else {
                            editGrid.DeleteGridRow();
                        }
                    }

                }
            } else {
                editGrid.DeleteGridRow();
            }
        }
    }
}

InforCenter_Platform_EditListViewCtrl_SaveGrid = function (para) {
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
        //if(GetEditStatus)
        if (editGrid.GetEditData) {
            var dataServicePara = {};
            var editData = editGrid.GetEditData();
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

InforCenter_Platform_EditListViewCtrl_EditData = function (editData, initData, para) {
    var gridDataPara = {};
    if (editData.add && editData.add.length > 0) {
        gridDataPara.AddRowData = InforCenter_Platform_EditListViewCtrl_EditDataToObjectJSON(editData.add, initData, para[1])
    }

    if (editData.edit && editData.edit.length > 0)
        gridDataPara.EditRowData = InforCenter_Platform_EditListViewCtrl_EditDataToObjectJSON(editData.edit, initData, para[1]);

    if (editData.remove && editData.remove.length > 0)
        gridDataPara.RemoveRowData = InforCenter_Platform_EditListViewCtrl_EditDataToObjectJSON(editData.remove, initData, para[1]);

    return gridDataPara;
}

InforCenter_Platform_EditListViewCtrl_EditDataToObjectJSON = function (data, initData, para) {
    if (data) {
        var arr = [];
        for (var i = 0; i < data.length; i++) {
            var obj = {};
            var row = data[i];
            for (var property in row) {
                if (!row.hasOwnProperty(property)) {
                    continue;
                }
                var item = row[property];

                if ((item.text != null && item.text != undefined)
                    || (item.value != null && item.value != undefined)) {
                    obj[property] = item.value;
                    obj[property + "_DisplayValue"] = item.text;
                } else {
                    obj[property] = item;
                    obj[property + "_DisplayValue"] = item;
                }
            }
            //处理InitData
            if (initData) {
                for (var init in initData) {
                    if (!initData.hasOwnProperty(init)) {
                        continue;
                    }
                    obj[init] = initData[init];
                }
            }
            var obj = $.extend(true, {}, obj, para)
            arr.push(obj);
        }
        if (arr.length > 0) {
            return JSON.stringify(arr);
        }
    }
}

InforCenter_Platform_EditListViewCtrl_ActionChecker = function (action, actionType, selectID) {
    var para = {};
    para.ActionName = action;
    para.ActionType = actionType;
    para.SelectID = selectID;
    return HoteamUI.DataService.Call("Hoteam.InforCenter.WebActionService.CheckActionPermission", { para: para });
}

InforCenter_Platform_EditListViewCtrl_OnRowClick = function (ctrlEvent) {
    HoteamUI.Page.FireParentPageEvent(ctrlEvent.o.ContainerID(), 'OnRowClick',
        {
            Selected: ctrlEvent.rowselected,
            SelectCtrl: ctrlEvent.o,
            SelectIndex: ctrlEvent.rowid,
            SelectRowData: ctrlEvent.rowobject,
            ColName: ctrlEvent.colName
        });
}

InforCenter_Platform_EditListViewCtrl_OnRowDblClick = function (ctrlEvent) {
    HoteamUI.Page.FireParentPageEvent(ctrlEvent.o.ContainerID(), 'OnRowDblClick',
        {
            Selected: ctrlEvent.rowselected, SelectCtrl: ctrlEvent.o, SelectIndex: ctrlEvent.rowid, SelectRowData: ctrlEvent.rowobject
        });
}

//Grid导出Excel - 部分导出/当前页导出
InforCenter_Platform_EditListViewCtrl_GridExport_Current = function (ctrlEvent) {
    var confirmInfo = HoteamUI.Language.Lang("ListViewCtrl", "CuurentExportConfirmInfo");
    InforCenter_Platform_EditListViewCtrl_GridExport_Common(ctrlEvent, ctrlEvent.rowsIndexList, "0", confirmInfo);
};

//导出列表数据
function InforCenter_Platform_EditListViewCtrl_GridExport_Common(ctrlEvent, rowsIndexList, isAllexport, confirmInfo) {
    //导出（有confirm验证）
    if (HoteamUI.Common.IsNullOrEmpty(confirmInfo) == false) {

        //生成参数
        var pager = ctrlEvent.o.GetPagerInfo();

        var pageContainer = ctrlEvent.o.OtherControl("ListView_Container");
        var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
        var returnData = InforCenter_Platform_MenuCtrl_GetParameters(pagePara, pagePara);
        returnData = JSON.stringify(returnData);
        var exportFrontColumn = new Array();
        var rowData = new Array();

        /*if (pagePara.WebListView.IsFrontExporting) {*/
        ///可编辑列表 默认前端导出
        //var printData = ctrlEvent.o.GetSelectedRows();
        //if (printData.length == 0) {
        //    printData = ctrlEvent.o.GetCurrentPageRows();
        //}
        //此处获取所有数据，如果是选择导出，在后台有处理（通过rowsIndexList）
        var printData = ctrlEvent.o.GetCurrentPageRows();

        for (var i = 0; i < printData.length; i++) {
            rowData.push(JSON.stringify(printData[i]));
        }

        var colModels = ctrlEvent.o.GetColModel();

        var columns = new Array();
        var exportCol = [];

        for (var j = 0; j < ctrlEvent.Columns.length; j++) {
            for (var k = 0; k < colModels.length; k++) {
                if (ctrlEvent.Columns[j].ColumnName == colModels[k].name) {
                    if (colModels[k].colType === "image" || colModels[k].colType === "hidden")
                        continue;
                    var col = {};
                    col.ColumnName = colModels[k].name;
                    col.ColumnText = colModels[k].text;
                    col.ColumnType = colModels[k].colType;
                    columns.push(JSON.stringify(col));
                    exportCol.push({ "ColumnName": col.ColumnName });
                    break;
                }
            }
        }
        exportFrontColumn = columns;

        var paras = {
            Pager: pager, Columns: exportCol, ViewName: pagePara.ListViewName, ParaList: returnData, FilterString: pagePara.FilterString, EntityFilterString: pagePara.EntityFilterString, IsAll: isAllexport, RowsIndexList: rowsIndexList,
            ReplaceName: pagePara.ReplaceName, IsFrontExporting: true, FrontListData: rowData, FrontListColumn: exportFrontColumn
        };
        //调用，返回生成的【文件名 + 最大行数提示】
        //paras.OnePageDataService = pagePara.EditListDataService;
        //paras.ListTitleDataService = pagePara.EditListTitleDataService;
        PlatformUI.UIManager.ExportFileFromGrid.Call("", paras);
    }
}
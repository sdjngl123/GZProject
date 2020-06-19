
//列表页面加载事件
InforCenter_Platform_ListViewCtrl_LoadListView = function (listPage, para, listViewName) {
    var pageContainer = listPage.GetControl("ListView_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
    var listGrid = listPage.GetControl("ListView");


    if (pagePara == "" || HoteamUI.Common.IsNullOrEmpty(pagePara.ListViewName) == true || pagePara.ListViewName != listViewName) {
        if (HoteamUI.Common.IsNullOrEmpty(listViewName) == false) {
            para.ListViewName = listViewName;
        }
        var ctrlPage = "ListViewCtrl";
        if (HoteamUI.Common.IsNullOrEmpty(para.ListCtrlPageName) == false) {
            ctrlPage = para.ListCtrlPageName;
        }
        HoteamUI.Page.SetContainerParas(pageContainer.id, ctrlPage, para);
        //获取列表标题内容
        var listTitleData = InforCenter_Platform_ListViewCtrl_GetGridTitleData(listGrid, para, pagePara);
        if (listTitleData != null) {

            InforCenter_Platform_ListViewCtrl_SetRightMenu(listPage, para);
            InforCenter_Platform_ListViewCtrl_SetSuspension(listPage, para);
        }
    }
    else {
        InforCenter_Platform_ListViewCtrl_GetOnePageGridData(listGrid, null);
    }
    return listTitleData;
};

//获取列表标题通用方法
InforCenter_Platform_ListViewCtrl_GetGridTitleData = function (listGrid, pagePara, oldPara) {
    var titleDataService = "InforCenter.Common.WebListViewService.GetGridRowTitle";
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.ListTitleDataService) == false) {
        titleDataService = pagePara.ListTitleDataService;
    }
    var execPara = {};
    var sParaList = JSON.stringify(pagePara);
    execPara.para = { ViewName: pagePara.ListViewName, ObjectType: pagePara.ObjectType, ParaList: sParaList };
    pagePara.gridTitle = HoteamUI.DataService.Call(titleDataService, execPara);
    InforCenter_Platform_ListViewCtrl_SetGridTitle(listGrid, pagePara);
    return pagePara.gridTitle;
}
//获取一页列表数据通用方法
InforCenter_Platform_ListViewCtrl_GetOnePageGridData = function (listGrid, para, ifClear, callFunc, callPara) {
    var args = arguments;

    if (args.length == 3 || args.length == 4) {
        if (ifClear && typeof ifClear === "function") {
            callPara = callFunc;
            callFunc = ifClear;
            ifClear = null;
        }
    }

    var pageContainer = listGrid.OtherControl("ListView_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
    var execPara = null;
    if (HoteamUI.Common.IsNullOrEmpty(para) == true) {
        execPara = {};
    }
    else {
        execPara = JSON.parse(JSON.stringify(para));
    }
    if (pagePara) {
        pagePara = $.extend(pagePara, para);
        var ctrlPage = "ListViewCtrl";
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
        var pageDataService = "InforCenter.Common.WebListViewService.GetOnePageGridData";
        if (HoteamUI.Common.IsNullOrEmpty(pagePara.OnePageDataService) == false) {
            pageDataService = pagePara.OnePageDataService;
        }
        var returnData = InforCenter_Platform_MenuCtrl_GetParameters(pagePara, pagePara);
        returnData = JSON.stringify(returnData);
        pagePara = InforCenter_Platform_ListViewCtrl_MergeFilter(pagePara);
        execPara.Pager = pager;
        execPara.ViewName = pagePara.ListViewName;
        execPara.ObjectType = pagePara.ObjectType;
        execPara.OnlyQuery = "true";
        if (HoteamUI.Common.IsNullOrEmpty(pagePara.OnlyQuery) == false) {
            execPara.OnlyQuery = pagePara.OnlyQuery;
        }
        execPara.UseBy = pagePara.UseBy;
        execPara.ParaList = returnData;
        execPara.FilterString = pagePara.FilterString;
        execPara.QueryData = JSON.stringify(pagePara.QueryData);
        execPara.EntityFilterString = pagePara.EntityFilterString;
        execPara.RelatedFilterString = pagePara.RelatedFilterString;
        execPara.RelatedEntityFilterString = pagePara.RelatedEntityFilterString;
        execPara.CustomViewFilterString = pagePara.CustomViewFilterString;
        execPara.SpecialFilterString = pagePara.SpecialFilterString;
        if (pagePara.ExtendJsonInfo) {
            execPara.ExtendJsonInfo = JSON.stringify(pagePara.ExtendJsonInfo);
        }
        HoteamUI.Window.WaitWindow.LayoutShow(pageContainer.id);
        var callBack = function (gridData, callData) {
            if (HoteamUI.Common.IsNullOrEmpty(gridData) == false) {
                if (HoteamUI.Common.IsNullOrEmpty(gridData.DistinctField) == false) {
                    gridData = InforCenter_Platform_ListViewCtrl_DistinctRow(gridData, pagePara);
                }
                if (!HoteamUI.Control.Instance(listGrid.id).id) {
                    return;
                }
                listGrid.LoadGridRows(gridData, ifClear);
            }

            //加载后激发父页面的加载成功事件
            var pid = listGrid.ContainerID();
            HoteamUI.Page.FireParentPageEvent(pid, "OnLoadSuccess", { listcid: pid, gridData: gridData, pagePara: pagePara });
            HoteamUI.Window.WaitWindow.LayoutDestory(pageContainer.id);

            if (callFunc) {
                callFunc(gridData, callData);
            }
        };

        var errorCallBack = function () {
            HoteamUI.Window.WaitWindow.LayoutDestory(pageContainer.id);
        }

        var asyncArgs = {
            serviceuri: pageDataService,
            paras: { para: execPara },
            callback: callBack,
            callcackpara: callPara,
            errorCallback: errorCallBack
        };

        HoteamUI.DataService.AsyncCall(asyncArgs);
    }
}

//获取列表内容事件调用方法
InforCenter_Platform_ListViewCtrl_GridData = function (ctrlEvent) {
    var contentControl = ctrlEvent.o.OtherControl("ListView_Content");
    var controlPara = null;
    if (contentControl.id && contentControl.id != "") {
        controlPara = HoteamUI.Page.GetContainerPara(contentControl.id);
    }

    var execPara = null;
    if (controlPara) {
        execPara = controlPara;
    }
    else {
        execPara = {};
    }
    InforCenter_Platform_ListViewCtrl_GetOnePageGridData(ctrlEvent.o, execPara, ctrlEvent.ifClear);
}
InforCenter_Platform_ListViewCtrl_SetSuspension = function (listPage, pagePara) {
    var suspensionCtrl = listPage.GetControl("Suspension");
    if (!suspensionCtrl.id) {
        return;
    }
    var listCtrl = listPage.GetControl("ListView");
    var ObjTypes = pagePara.ListObjTypes;
    var suspensiondata;
    suspensionCtrl.RemoveAllItems();
    var suspensionid = suspensionCtrl.id + "_Suspension";
    var hasSuspension = false;
    if (ObjTypes && ObjTypes.length > 0) {
        for (var i = 0; i < ObjTypes.length; i++) {
            var objType = ObjTypes[i];
            if (objType.RightMenuName) {
                suspensiondata = InforCenter_Platform_GetMenus(objType.RightMenuName).Menus;
                suspensionCtrl.LoadItems(suspensiondata, objType.Name, objType.RightMenuName);
                hasSuspension = true;
            }
        }
    }
    if (hasSuspension) {
        listCtrl.SetSuspension(suspensionid);
        var suspensionContainer = listPage.GetControl("Suspension_Container");
        HoteamUI.Page.SetContainerParas(suspensionContainer.id, "SuspensionCtrl", pagePara);
    }
}
InforCenter_Platform_ListViewCtrl_SetRightMenu = function (listPage, pagePara) {
    var rightMenuCtrl = listPage.GetControl("RightMenu");
    var listCtrl = listPage.GetControl("ListView");
    var ObjTypes = pagePara.ListObjTypes;
    var rightmenudata;
    rightMenuCtrl.RemoveAllItems();
    var rightmenuid = rightMenuCtrl.id + "_RightMenu";
    if (pagePara.AutoClearOldRightMenu) {
        $("#" + rightmenuid).children().remove();
    }
    var hasRightMenu = false;
    if (ObjTypes && ObjTypes.length > 0) {
        for (var i = 0; i < ObjTypes.length; i++) {
            var objType = ObjTypes[i];
            if (objType && objType.ListRightMenuName) {
                rightmenudata = InforCenter_Platform_GetMenus(objType.ListRightMenuName, listPage, { ObjType: objType.Name }).Menus;
                rightMenuCtrl.LoadItems(rightmenudata, objType.Name, objType.ListRightMenuName);
                hasRightMenu = true;
            }
        }
    }
    if (pagePara.ListRightMenuName) {
        rightmenudata = InforCenter_Platform_GetMenus(pagePara.ListRightMenuName, listPage, { ObjType: 'RightMenu' }).Menus;
        rightMenuCtrl.LoadItems(rightmenudata, "", pagePara.ListRightMenuName);
        hasRightMenu = true;
    }
    if (hasRightMenu) {
        listCtrl.SetListRightMenu(rightmenuid);
        var rightmenuContainer = listPage.GetControl("RightMenu_Container");
        HoteamUI.Page.SetContainerParas(rightmenuContainer.id, "RightMenuCtrl", pagePara);
    }
}

InforCenter_Platform_ListViewCtrl_MergeFilter = function (pagePara) {
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.CustomQueryFilter) == false) {
        if (HoteamUI.Common.IsNullOrEmpty(pagePara.FilterString)) {
            pagePara.FilterString = " 1=1 ";
        }
        pagePara.FilterString = pagePara.FilterString + " and " + pagePara.CustomQueryFilter;
    }
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.CustomQueryEntityFilter) == false) {
        if (HoteamUI.Common.IsNullOrEmpty(pagePara.EntityFilterString)) {
            pagePara.EntityFilterString = " 1=1 ";
        }
        pagePara.EntityFilterString = pagePara.EntityFilterString + " and " + pagePara.CustomQueryEntityFilter;
    }
    return pagePara;
}
InforCenter_Platform_ListViewCtrl_DistinctRow = function (gridData, pagePara) {
    if (gridData.Rows.length > 0) {
        var index = -1;
        // for (var i in gridData.Rows[0]) {
        for (var i = 0; i < gridData.Rows[0].length; i++) {
            var col = gridData.Rows[0][i];
            if (col.ColName == gridData.DistinctField) {
                index = i;
                break;
            }
        }
        if (index > -1) {
            var tempField = "";
            var tempArry = [];
            //  for (var i in gridData.Rows) {
            for (var i = 0; i < gridData.Rows.length; i++) {
                var item = gridData.Rows[i][index];
                if (tempField.indexOf("," + item.ColText + ",") == -1) {
                    tempField += "," + item.ColText + ",";
                    tempArry.push(gridData.Rows[i]);
                }
            }
            gridData.Rows = tempArry;
            gridData.RecordsTotal = tempArry.length;
        }
    }
    return gridData;
}
//获取一页列表数据通用方法
InforCenter_Platform_ListViewCtrl_SetListViewPara = function (listGrid, para) {
    var pageContainer = listGrid.OtherControl("ListView_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
    if (pagePara) {
        $.extend(pagePara, para);
    }
    var ctrlPage = "ListViewCtrl";
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.ListCtrlPageName) == false) {
        ctrlPage = pagePara.ListCtrlPageName;
    }
    HoteamUI.Page.SetContainerParas(pageContainer.id, ctrlPage, pagePara);

}


InforCenter_Platform_ListViewCtrl_SetGridTitle = function (listGrid, para) {
    var gridTitle = para.gridTitle;
    if (HoteamUI.Common.IsNullOrEmpty(gridTitle) == false) {

        var pageContainer = listGrid.OtherControl("ListView_Container");
        var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
        pagePara.ParaList = gridTitle.FilterFlag;
        pagePara.WebListView = gridTitle.WebListView;

        if (para.AutoLoadData != undefined) {
            pagePara.AutoLoadData = para.AutoLoadData;
        }
        var ctrlPage = "ListViewCtrl";
        if (HoteamUI.Common.IsNullOrEmpty(pagePara.ListCtrlPageName) == false) {
            ctrlPage = pagePara.ListCtrlPageName;
        }
        HoteamUI.Page.SetContainerParas(pageContainer.id, ctrlPage, pagePara);

        if (!!gridTitle.TitleData || !!gridTitle.TitleObjectData) {
            var titlePara = {};
            titlePara.multiselect = gridTitle.WebListView.AllowCheckBox;
            if (para.AllowCheckBox != undefined) {
                titlePara.multiselect = para.AllowCheckBox;
            }
            titlePara.loadMore = gridTitle.WebListView.LoadMore;
            if (para.LoadMore != undefined) {
                titlePara.loadMore = para.LoadMore;
            }
            titlePara.autoLoadData = gridTitle.WebListView.AutoLoadData;
            if (para.AutoLoadData != undefined) {
                titlePara.autoLoadData = para.AutoLoadData;
            }
            titlePara.data = gridTitle.TitleObjectData ? gridTitle.TitleObjectData : gridTitle.TitleData;
            titlePara.SuspensionMenuField = gridTitle.WebListView.SuspensionMenuField;
            titlePara.isShowSearch = gridTitle.WebListView.IsShowSearch;
            titlePara.isLayoutSave = gridTitle.WebListView.IsLayoutSave;
            titlePara.isColumnSetting = gridTitle.WebListView.IsColumnSetting;
            titlePara.zebraList = gridTitle.WebListView.ZebraList;
            titlePara.hoverLight = gridTitle.WebListView.HoverLight;
            titlePara.border = gridTitle.WebListView.Border;
            titlePara.isSelectCheckbox = gridTitle.WebListView.IsSelectCheckbox;

            titlePara.keyField = gridTitle.KeyField;

            //titlePara.showListTail = gridTitle.WebListView.ShowListTail;
            //if (para.ShowListTail != undefined) {
            //  titlePara.showListTail = para.ShowListTail;
            // }
            //if (para.ShowPaging != undefined) {
            //    (para.ShowPaging === "true" || para.ShowPaging === true) ? titlePara.showPageBar = true : titlePara.showPageBar = false;
            //} else {
            //    titlePara.showPageBar = gridTitle.WebListView.ShowPageBar
            //}

            //18986 李金岳
            //配置文件ShowPaging对应控件Grid里的showPageBar
            //配置文件里的ShowPageBar对应控件Grid里的showListTail
            if (para.ShowPageBar != undefined) {
                titlePara.showListTail = para.ShowPageBar;
            } else {
                titlePara.showListTail = gridTitle.WebListView.ShowPageBar
            }
            if (para.ShowPaging != undefined) {
                titlePara.showPageBar = para.ShowPaging;
            } else {
                titlePara.showPageBar = gridTitle.WebListView.ShowPaging;
            }
            if (titlePara.showPageBar === true || titlePara.showPageBar === "true") {
                titlePara.showListTail = true;
            }

            if (para.RowList != undefined) {
                titlePara.rowList = para.RowList;
            }

            listGrid.LoadColTitle(titlePara);
        }

        InforCenter_Platform_ListViewCtrl_SetListButtonVisable(gridTitle.WebListView.IsSelectExporting, listGrid, "exportList");
        InforCenter_Platform_ListViewCtrl_SetListButtonVisable(para.IsSelectExporting, listGrid, "exportList");


        InforCenter_Platform_ListViewCtrl_SetListButtonVisable(gridTitle.WebListView.IsAllExporting, listGrid, "allExportList");
        InforCenter_Platform_ListViewCtrl_SetListButtonVisable(para.IsAllExporting, listGrid, "allExportList");

        InforCenter_Platform_ListViewCtrl_SetListButtonVisable(gridTitle.WebListView.IsSelectPrinting, listGrid, "printList");
        InforCenter_Platform_ListViewCtrl_SetListButtonVisable(para.IsSelectPrintin, listGrid, "printList");

        InforCenter_Platform_ListViewCtrl_SetListButtonVisable(gridTitle.WebListView.IsAllPrinting, listGrid, "allPrintList");
        InforCenter_Platform_ListViewCtrl_SetListButtonVisable(para.IsAllPrinting, listGrid, "allPrintList");

    }
}
InforCenter_Platform_ListViewCtrl_SetListButtonVisable = function (value, listGrid, btnName) {
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

//grid图标列
InforCenter_Platform_ListViewCtrl_GridColImage = function (ctrlEvent) {
    var pageContainer = ctrlEvent.o.OtherControl("ListView_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
    var actionName = "BROWSE";
    //判断EID是否符合系统对象ID形式（"模型_GUID") 防止集成其他系统数据导致报错
    if (ctrlEvent.rowobject.EID && ctrlEvent.rowobject.EID.split('_').length > 1) {
        //权限判断
        if (HoteamUI.Common.IsNullOrEmpty(pagePara.WebListView.DetailsAction) == false) {
            actionName = pagePara.WebListView.DetailsAction;
        }
        //权限判断
        var check = HoteamUI.DataService.Call('InforCenter.Common.WebActionService.CheckActionPermission', { para: { ActionType: "AUTO", ActionName: actionName, SelectID: ctrlEvent.rowobject.EID } });
        if (check == null) {
            return;
        }
        //自定义js脚本
        var detailPageSettingList = pagePara.WebListView.DetailColumnSettingList;
        var isHave = false;
        if (HoteamUI.Common.IsNullOrEmpty(detailPageSettingList) == false) {
            var type = ctrlEvent.rowobject.EID.split('_')[0];
            //for (var i in detailPageSettingList) {
            for (var i = 0; i < detailPageSettingList.length; i++) {
                var obj = detailPageSettingList[i];
                if (obj.ObjectType == type) {
                    HoteamUI.Common.ExeFunction(obj.JSMethod, ctrlEvent);
                    return;
                }
            }
        }
        else if (HoteamUI.Common.IsNullOrEmpty(pagePara.WebListView.DetailsPageJSMethod) == false) {
            HoteamUI.Common.ExeFunction(pagePara.WebListView.DetailsPageJSMethod, ctrlEvent);
            isHave = true;
        }

        if (isHave == false && HoteamUI.Common.IsNullOrEmpty(pagePara.WebListView.DetailsPageUseObjectInspector) == false
            && pagePara.WebListView.DetailsPageUseObjectInspector == true) {
            var paras = {};
            paras.Data = ctrlEvent.rowobject;
            paras.ObjectID = paras.TabId = paras.SelectID = ctrlEvent.rowobject.EID;
            paras.ListGuid = ctrlEvent.o.id;
            var customObjectType = "";
            if (HoteamUI.Common.IsNullOrEmpty(pagePara.WebListView.CustomObjectTypeField) == false) {
                customObjectType = ctrlEvent.rowobject[pagePara.WebListView.CustomObjectTypeField];
            }
            paras.ObjectType = HoteamUI.Common.IsNullOrEmpty(customObjectType) ? InforCenter_Platform_GTypeFromID(paras.ObjectID) : customObjectType;
            var objectInspectorConfig = null;
            $.each(ObjectInspectorsScript, function (index, val) {
                if (val.ObjectType == paras.ObjectType)
                    objectInspectorConfig = JSON.parse(JSON.stringify(val));
            });
            if (objectInspectorConfig != null) {
                if (ctrlEvent.rowobject.EUID)
                    paras.SelectEUID = ctrlEvent.rowobject.EUID;
                paras.ObjectInspectorConfig = objectInspectorConfig;
                InforCenter_Platform_ObjectInspector_AddMainTab(paras);
                isHave = true;
            }
        }
        if (isHave == false && ctrlEvent.rowobject
            && HoteamUI.Common.IsNullOrEmpty(ctrlEvent.rowobject.EID) == false
            && (ctrlEvent.colName == "IMGICONTYPE" || ctrlEvent.colName == "ENAME")) {
            if (pagePara.ListCtrlPageName == "SmartListViewCtrl") {
                HoteamUI.UIManager.Sideslip({
                    pagename: "ViewObject", paras: { SelectID: ctrlEvent.rowobject.EID, ListCtrlPageName: "SmartListViewCtrl", ListGuid: ctrlEvent.o.id }, width: "600"
                });


            }
            else {
                HoteamUI.UIManager.Popup({
                    pagename: "ViewObject", paras: { SelectID: ctrlEvent.rowobject.EID, ListCtrlPageName: "ListViewCtrl" }, size: pagePara.WebListView.DetailsPageSize
                });
            }
        }
    } else if (HoteamUI.Common.IsNullOrEmpty(pagePara.WebListView.DetailsPageJSMethod) == false) {
        HoteamUI.Common.ExeFunction(pagePara.WebListView.DetailsPageJSMethod, ctrlEvent);
    }

};

InforCenter_Platform_ListViewCtrl_OnRowDblClick = function (ctrlEvent) {
    HoteamUI.Page.FireParentPageEvent(ctrlEvent.o.ContainerID(), 'OnRowDblClick',
        {
            Selected: ctrlEvent.rowselected, SelectCtrl: ctrlEvent.o, SelectIndex: ctrlEvent.rowid, SelectRowData: ctrlEvent.rowobject
        });
}

InforCenter_Platform_ListViewCtrl_OnRowClick = function (ctrlEvent) {
    HoteamUI.Page.FireParentPageEvent(ctrlEvent.o.ContainerID(), 'OnRowClick',
        {
            Selected: ctrlEvent.rowselected,
            SelectCtrl: ctrlEvent.o,
            SelectIndex: ctrlEvent.rowid,
            SelectRowData: ctrlEvent.rowobject,
            ColName: ctrlEvent.colName
        });
}
InforCenter_Platform_ListViewCtrl_OnLoadSuccess = function (ctrlEvent) {
    HoteamUI.Page.FireParentPageEvent(ctrlEvent.o.ContainerID(), 'OnLoadSuccess', { o: ctrlEvent });
}

//导出列表数据
function InforCenter_Platform_ListViewCtrl_GridExport_Common(ctrlEvent, rowsIndexList, isAllexport, confirmInfo) {
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

        if (pagePara.WebListView.IsFrontExporting) {//前端导出
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

            for (var j = 0; j < ctrlEvent.Columns.length; j++) {
                for (var k = 0; k < colModels.length; k++) {
                    if (ctrlEvent.Columns[j].ColumnName == colModels[k].name) {
                        var col = {};
                        col.ColumnName = colModels[k].name;
                        col.ColumnText = colModels[k].text;
                        columns.push(JSON.stringify(col));
                        break;
                    }
                }
            }
            exportFrontColumn = columns;
        }
        var paras = {
            Pager: pager, Columns: ctrlEvent.Columns, ViewName: pagePara.ListViewName, ParaList: returnData, FilterString: pagePara.FilterString, EntityFilterString: pagePara.EntityFilterString, CustomViewFilterString: pagePara.CustomViewFilterString, IsAll: isAllexport, RowsIndexList: rowsIndexList,
            ReplaceName: pagePara.ReplaceName, IsFrontExporting: pagePara.WebListView.IsFrontExporting, FrontListData: rowData, FrontListColumn: exportFrontColumn
        };
        //调用，返回生成的【文件名 + 最大行数提示】
        paras.OnePageDataService = pagePara.OnePageDataService;
        paras.ListTitleDataService = pagePara.ListTitleDataService;
        PlatformUI.UIManager.ExportFileFromGrid.Call("", paras);
    }
}

//Grid导出Excel - 部分导出/当前页导出
InforCenter_Platform_ListViewCtrl_GridExport_Current = function (ctrlEvent) {
    var confirmInfo = HoteamUI.Language.Lang("ListViewCtrl", "CuurentExportConfirmInfo");
    InforCenter_Platform_ListViewCtrl_GridExport_Common(ctrlEvent, ctrlEvent.rowsIndexList, "0", confirmInfo);
};

//Grid导出Excel - 全部导出
InforCenter_Platform_ListViewCtrl_GridExport_All = function (ctrlEvent) {
    var confirmInfo = HoteamUI.Language.Lang("ListViewCtrl", "AllExportConfirmInfo");
    InforCenter_Platform_ListViewCtrl_GridExport_Common(ctrlEvent, ctrlEvent.rowsIndexList, "1", confirmInfo);
};


//grid打印 - 通用方法
function InforCenter_Platform_ListViewCtrl_GridPrint_Common(ctrlEvent, rowsIndexList, IsAllPrint, confirmInfo) {

    //定义打印方法
    var PrintFun = function () {

        //生成参数
        var pager = ctrlEvent.o.GetPagerInfo();
        var pageContainer = ctrlEvent.o.OtherControl("ListView_Container");
        var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
        var returnData = InforCenter_Platform_MenuCtrl_GetParameters(pagePara, pagePara);
        returnData = JSON.stringify(returnData);
        var paras = {
            para: {
                Pager: pager, ViewName: pagePara.ListViewName, ParaList: returnData, FilterString: pagePara.FilterString, EntityFilterString: pagePara.EntityFilterString, IsAll: IsAllPrint, RowsIndexList: rowsIndexList, OnePageDataService: pagePara.OnePageDataService, ListTitleDataService: pagePara.ListTitleDataService,
                ReplaceName: pagePara.ReplaceName
            }
        };

        var ret = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GridPrint", paras);

        //定义弹出打印页面的方法
        var OpenPrintPageFun = function () {
            if (HoteamUI.Common.IsNullOrEmpty(ret[0]) == false) {
                var popWinTitle = HoteamUI.Language.Lang("ListViewCtrl", "PrintPopWinTitle");
                var printPageParas = {
                    "option": ret[0]
                };
                HoteamUI.UIManager.Popup({
                    pagename: "GridPrintPage", title: popWinTitle, paras: printPageParas, size: '850*650'
                });
            }
        };
        if (ret != null) {
            //最大行数提示
            if (HoteamUI.Common.IsNullOrEmpty(ret[1]) == false) {

                //定义打印页面被弹出的方法
                var OpenPrintPage = function (data, ret) {
                    if (HoteamUI.Common.IsNullOrEmpty(ret) == false
                        && HoteamUI.Common.IsNullOrEmpty(ret.confirm) == false
                        && ret.confirm == 'OK') {
                        OpenPrintPageFun();
                    }
                }
                var title = HoteamUI.Language.Lang("Platform.Prompt");
                var para = {
                    pageMode: "OK", message: ret[1]
                };
                HoteamUI.UIManager.Popup({
                    pagename: "Confirm", paras: para, callback: OpenPrintPage, data: {}, title: title
                });
            }
            else {
                //未超过最大行数，直接打开
                OpenPrintPageFun();
            }

        }
    }

    //执行导出方法
    PrintFun();


}

//grid打印 - 部分打印/当前页打印
InforCenter_Platform_ListViewCtrl_GridPrint_Current = function (ctrlEvent) {
    var confirmInfo = HoteamUI.Language.Lang("ListViewCtrl", "CuurentPrintConfirmInfo");
    InforCenter_Platform_ListViewCtrl_GridPrint_Common(ctrlEvent, ctrlEvent.rowsIndexList, "0", confirmInfo);
};

//grid打印 - 全部打印
InforCenter_Platform_ListViewCtrl_GridPrint_All = function (ctrlEvent) {
    var confirmInfo = HoteamUI.Language.Lang("ListViewCtrl", "AllPrintConfirmInfo");
    InforCenter_Platform_ListViewCtrl_GridPrint_Common(ctrlEvent, ctrlEvent.rowsIndexList, "1", confirmInfo);
};

//刷新数据
InforCenter_Platform_ListViewCtrl_GridTitleRefresh = function (ctrl) {
    var para = {
    };
    para.CurrentPager = 1;
    InforCenter_Platform_ListViewCtrl_GetOnePageGridData(ctrl, para);
}
//树展示或隐藏
InforCenter_Platform_ListViewCtrl_GridTitleTreeOperation = function (ctrl) {
    HoteamUI.Page.FireParentPageEvent(ctrl.ContainerID(), 'OnOtherOperation', {
    });
}
//列表模式
InforCenter_Platform_ListViewCtrl_GridTitleListModel = function (ctrl) {
    ctrl.ChangeModel("list");
}
InforCenter_Platform_ListViewCtrl_GridTitleImgModel = function (ctrl) {
    ctrl.ChangeModel("image");
}
var InforCenter_Platform_GridPrint_OnCreate = function (pageEvent) {
    var page = pageEvent;
    var pagePara = page.o.GetPara();
    var ctrl = page.o.GetControl("ReportCtrl");
    ctrl.OpenByXMLContent(pagePara.option, false, true);
}
InforCenter_Platform_InterCept_Width = function (str) {
    return parseInt(str.substring(0, str.length - 2));
}



InforCenter_Platform_ListViewCtrl_ColumnLinkOnClick = function (ctrlEvent) {
    var listCtrl = ctrlEvent.o;
    var selectid = ctrlEvent.rowobject.EID;
    var pageContainer = listCtrl.OtherControl("ListView_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
    pagePara.rowobject = ctrlEvent.rowobject;
    pagePara.ObjectId = selectid;
    var objectType = InforCenter_Platform_GTypeFromID(selectid);
    //对不是业务对象进行支持
    if (HoteamUI.Common.IsNullOrEmpty(objectType) == true) {
        objectType = selectid;
    }
    var data = null;
    $.each(ObjectBrowsesScript, function (index, val) {
        if (val.ObjectName == objectType)
            data = JSON.parse(JSON.stringify(val));
    });
    if (data != null) {
        var jsMethod = data.JSMthod;
        HoteamUI.Common.ExeFunction(jsMethod, ctrlEvent);
    }
}

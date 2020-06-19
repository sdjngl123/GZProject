
//列表页面加载事件
InforCenter_Platform_FilterListViewCtrl_LoadListView = function (listPage, para, listViewName) {
    var pageContainer = listPage.GetControl("ListView_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
    var listGrid = listPage.GetControl("ListView");


    if (pagePara == "" || HoteamUI.Common.IsNullOrEmpty(pagePara.ListViewName) == true || pagePara.ListViewName != listViewName) {
        if (HoteamUI.Common.IsNullOrEmpty(listViewName) == false) {
            para.ListViewName = listViewName;
        }
        var ctrlPage = "FilterListViewCtrl";
        if (HoteamUI.Common.IsNullOrEmpty(para.ListCtrlPageName) == false) {
            ctrlPage = para.ListCtrlPageName;
        }
        HoteamUI.Page.SetContainerParas(pageContainer.id, ctrlPage, para);
        //获取列表标题内容
        var listTitleData = InforCenter_Platform_FilterListViewCtrl_GetGridTitleData(listGrid, para, pagePara);
        if (listTitleData != null) {
            InforCenter_Platform_FilterListViewCtrl_SetRightMenu(listPage, para);
        }
    }
    else {
        InforCenter_Platform_FilterListViewCtrl_GetOnePageGridData(listGrid, null);
    }
    return listTitleData;
};

//获取列表标题通用方法
InforCenter_Platform_FilterListViewCtrl_GetGridTitleData = function (listGrid, pagePara, oldPara) {
    var titleDataService = "InforCenter.Common.FilterListViewService.GetGridRowTitle";
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.ListTitleDataService) == false) {
        titleDataService = pagePara.ListTitleDataService;
    }
    if (pagePara.gridTitle == undefined) {

        var execPara = {};
        if (oldPara != undefined && oldPara != "" && HoteamUI.Common.IsNullOrEmpty(oldPara.RefreshTitle) == false && oldPara.RefreshTitle == "true") {
            var returnData = InforCenter_Platform_MenuCtrl_GetParameters(oldPara, oldPara);
            returnData = JSON.stringify(returnData);
            execPara.para = { ViewName: pagePara.ListViewName, ParaList: returnData };
        }
        else {
            var sParaList = JSON.stringify(pagePara);
            execPara.para = { ViewName: pagePara.ListViewName, ParaList: sParaList };
        }

        pagePara.gridTitle = HoteamUI.DataService.Call(titleDataService, execPara);
    }
    InforCenter_Platform_FilterListViewCtrl_SetGridTitle(listGrid, pagePara);
    return pagePara.gridTitle;
}
//获取一页列表数据通用方法
InforCenter_Platform_FilterListViewCtrl_GetOnePageGridData = function (listGrid, para, ifClear) {
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
        var pageDataService = "InforCenter.Common.FilterListViewService.GetOnePageGridData";
        if (HoteamUI.Common.IsNullOrEmpty(pagePara.OnePageDataService) == false) {
            pageDataService = pagePara.OnePageDataService;
        }
        var returnData = InforCenter_Platform_MenuCtrl_GetParameters(pagePara, pagePara);
        returnData = JSON.stringify(returnData);
        pagePara = InforCenter_Platform_ListViewCtrl_MergeFilter(pagePara);
        execPara.Pager = pager;
        execPara.ViewName = pagePara.ListViewName;
        execPara.ParaList = returnData;
        execPara.FilterString = pagePara.FilterString;
        execPara.EntityFilterString = pagePara.EntityFilterString;
        execPara.RelatedFilterString = pagePara.RelatedFilterString;
        execPara.RelatedEntityFilterString = pagePara.RelatedEntityFilterString;
        execPara.CustomViewFilterString = pagePara.CustomViewFilterString;
        var gridData = HoteamUI.DataService.Call(pageDataService, { para: execPara });
        if (HoteamUI.Common.IsNullOrEmpty(gridData) == false) {
            if (HoteamUI.Common.IsNullOrEmpty(gridData.DistinctField) == false) {
                gridData = InforCenter_Platform_ListViewCtrl_DistinctRow(gridData, pagePara);
            }
            listGrid.LoadGridRows(gridData, ifClear);
        }
    }
    //加载后激发父页面的加载成功事件
    var pid = listGrid.ContainerID();
    HoteamUI.Page.FireParentPageEvent(pid, "OnLoadSuccess", { listcid: pid });

    return gridData;
}
//获取列表内容事件调用方法
InforCenter_Platform_FilterListViewCtrl_GridData = function (ctrlEvent) {
    InforCenter_Platform_FilterListViewCtrl_GetOnePageGridData(ctrlEvent.o, {}, ctrlEvent.ifClear);
}
InforCenter_Platform_FilterListViewCtrl_SetRightMenu = function (listPage, pagePara) {
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
            if (objType.ListRightMenuName) {
                rightmenudata = InforCenter_Platform_GetMenus(objType.ListRightMenuName).Menus;
                rightMenuCtrl.LoadItems(rightmenudata, objType.Name, objType.ListRightMenuName);
                hasRightMenu = true;
            }
        }
    }
    if (pagePara.ListRightMenuName) {
        rightmenudata = InforCenter_Platform_GetMenus(pagePara.ListRightMenuName).Menus;
        rightMenuCtrl.LoadItems(rightmenudata, "", pagePara.ListRightMenuName);
        hasRightMenu = true;
    }
    if (hasRightMenu) {
        listCtrl.SetListRightMenu(rightmenuid);
        var rightmenuContainer = listPage.GetControl("RightMenu_Container");
        HoteamUI.Page.SetContainerParas(rightmenuContainer.id, "RightMenuCtrl", pagePara);
    }
}

InforCenter_Platform_FilterListViewCtrl_MergeFilter = function (pagePara) {
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
//获取一页列表数据通用方法
InforCenter_Platform_FilterListViewCtrl_SetListViewPara = function (listGrid, para) {
    var pageContainer = listGrid.OtherControl("ListView_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
    if (pagePara) {
        $.extend(pagePara, para);
    }
    var ctrlPage = "FilterListViewCtrl";
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.ListCtrlPageName) == false) {
        ctrlPage = pagePara.ListCtrlPageName;
    }
    HoteamUI.Page.SetContainerParas(pageContainer.id, ctrlPage, pagePara);

}


InforCenter_Platform_FilterListViewCtrl_SetGridTitle = function (listGrid, para) {
    var gridTitle = para.gridTitle;
    if (HoteamUI.Common.IsNullOrEmpty(gridTitle) == false) {

        var pageContainer = listGrid.OtherControl("ListView_Container");
        var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
        pagePara.ParaList = gridTitle.FilterFlag;
        pagePara.WebListView = gridTitle.WebListView;

        if (para.AutoLoadData != undefined) {
            pagePara.AutoLoadData = para.AutoLoadData;
        }
        var ctrlPage = "FilterListViewCtrl";
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
            //titlePara.showListTail = gridTitle.WebListView.ShowListTail;
            //if (para.ShowListTail != undefined) {
            //    titlePara.showListTail = para.ShowListTail;
            //}
            titlePara.autoLoadData = gridTitle.WebListView.AutoLoadData;
            if (para.AutoLoadData != undefined) {
                titlePara.autoLoadData = para.AutoLoadData;
            }
            titlePara.data = gridTitle.TitleObjectData ? gridTitle.TitleObjectData : gridTitle.TitleData;
            titlePara.SuspensionMenuField = gridTitle.WebListView.SuspensionMenuField;
            titlePara.isShowSearch = gridTitle.WebListView.IsShowSearch;
            titlePara.isLayoutSave = gridTitle.WebListView.IsLayoutSave;
            titlePara.isColumnSetting = gridTitle.WebListView.IsColumnSetting;
            titlePara.keyField = gridTitle.KeyField;
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

        //InforCenter_Platform_ListViewCtrl_SetListButtonVisable(gridTitle.WebListView.IsSelectExporting, listGrid, "exportList");
        //InforCenter_Platform_ListViewCtrl_SetListButtonVisable(para.IsSelectExporting, listGrid, "exportList");


        //InforCenter_Platform_ListViewCtrl_SetListButtonVisable(gridTitle.WebListView.IsAllExporting, listGrid, "allExportList");
        //InforCenter_Platform_ListViewCtrl_SetListButtonVisable(para.IsAllExporting, listGrid, "allExportList");

        //InforCenter_Platform_ListViewCtrl_SetListButtonVisable(gridTitle.WebListView.IsSelectPrinting, listGrid, "printList");
        //InforCenter_Platform_ListViewCtrl_SetListButtonVisable(para.IsSelectPrintin, listGrid, "printList");

        //InforCenter_Platform_ListViewCtrl_SetListButtonVisable(gridTitle.WebListView.IsAllPrinting, listGrid, "allPrintList");
        //InforCenter_Platform_ListViewCtrl_SetListButtonVisable(para.IsAllPrinting, listGrid, "allPrintList");
        //test
        //InforCenter_Platform_FilterListViewCtrl_GridTitleRefresh(listGrid);
    }
}
InforCenter_Platform_FilterListViewCtrl_SetListButtonVisable = function (value, listGrid, btnName) {
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
InforCenter_Platform_FilterListViewCtrl_GridColImage = function (ctrlEvent) {
    var pageContainer = ctrlEvent.o.OtherControl("ListView_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
    var actionName = "BROWSE";
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
                isHave = true;
                break;
            }
        }
    }
    else if (HoteamUI.Common.IsNullOrEmpty(pagePara.WebListView.DetailsPageJSMethod) == false) {
        HoteamUI.Common.ExeFunction(pagePara.WebListView.DetailsPageJSMethod, ctrlEvent);
        isHave = true;
    }

    if (HoteamUI.Common.IsNullOrEmpty(pagePara.WebListView.DetailsPageUseObjectInspector) == false
        && pagePara.WebListView.DetailsPageUseObjectInspector == true) {
        var paras = {};
        paras.Data = ctrlEvent.rowobject;
        paras.ObjectID = paras.TabId = paras.SelectID = ctrlEvent.rowobject.EID;
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
};

InforCenter_Platform_FilterListViewCtrl_OnRowDblClick = function (ctrlEvent) {
    HoteamUI.Page.FireParentPageEvent(ctrlEvent.o.ContainerID(), 'OnRowDblClick',
    {
        Selected: ctrlEvent.rowselected, SelectCtrl: ctrlEvent.o, SelectIndex: ctrlEvent.rowid, SelectRowData: ctrlEvent.rowobject
    });
}

InforCenter_Platform_FilterListViewCtrl_OnRowClick = function (ctrlEvent) {
    HoteamUI.Page.FireParentPageEvent(ctrlEvent.o.ContainerID(), 'OnRowClick',
    {
        Selected: ctrlEvent.rowselected, SelectCtrl: ctrlEvent.o, SelectIndex: ctrlEvent.rowid, SelectRowData: ctrlEvent.rowobject
    });
}

//刷新数据
InforCenter_Platform_FilterListViewCtrl_GridTitleRefresh = function (ctrl) {
    var para = {
    };
    para.CurrentPager = 1;
    InforCenter_Platform_FilterListViewCtrl_GetOnePageGridData(ctrl, para);
}


InforCenter_Platform_FilterListViewCtrl_ColumnLinkOnClick = function (ctrlEvent) {
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

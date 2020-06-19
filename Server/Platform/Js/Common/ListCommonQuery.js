//列表管理页面加载事件
InforCenter_Platform_ListCommonQuery_LoadPage = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    var hiddenBtn = pagePara.HiddenButton;
    if (typeof (hiddenBtn) == "string") {
        hiddenBtn = hiddenBtn == "true" ? true : false;
    }
    if (hiddenBtn) {
        var container = page.GetControl("ListCommonQuery_Container");
        container.HiddenPanel(["item3"]);
    }

    var listPage = HoteamUI.Page.InstanceIn(page.pid, "ListViewPage", "ListViewCtrl");
    var selectedListPage = HoteamUI.Page.InstanceIn(page.pid, "SelectedListViewPage", "ListViewCtrl");
    InforCenter_Platform_ListCommonQuery_LoadData(pageEvent, page, pagePara, listPage, selectedListPage);

};
InforCenter_Platform_ListCommonQuery_LoadData = function (pageEvent, page, pagePara, listPage, selectedListPage) {

    var listGrid = listPage.GetControl("ListView");
    var selectedGrid = selectedListPage.GetControl("ListView");

    var itemName = null;
    var selectedvalue = pagePara.Value;
    if (selectedvalue && selectedvalue.length > 1 && selectedvalue.substring(selectedvalue.length - 1) == ";") {
        selectedvalue = selectedvalue.substring(0, selectedvalue.length - 1);
    }
    selectedvalue = selectedvalue ? selectedvalue.split(';') : [];

    if (HoteamUI.Common.IsNullOrEmpty(pageEvent.ItemName) == false) {
        itemName = pageEvent.ItemName;
    }
    else {
        itemName = pagePara.ItemName;
    }

    var data = null;
    $.each(ListCommonQueryScript, function (index, val) {
        if (val.Name == pagePara.ItemName)
            data = JSON.parse(JSON.stringify(val));
    });
    if (data == null) {
        data = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GetListCommonQuery", { para: { Name: pagePara.ItemName } });
        if (data)
            ListCommonQueryScript.push(data);
    }
    if (data == null) {
        return;
    }

    pagePara = $.extend(data, pagePara);
    pagePara.ListGuid = listGrid.id;
    pagePara.SelectedListGuid = selectedGrid.id;
    var allowMul = data.AllowMultiSelect;
    if (typeof (allowMul) == "string") {
        allowMul = allowMul == "true" ? true : false;
    }
    pagePara.AllowMultiSelect = allowMul;
    if (pagePara.AllowMultiSelect) {
        pagePara.AllowCheckBox = true;
    }
    else {
        pagePara.AllowCheckBox = false;
    }
    var showTabs = [];
    for (var i = 0; i < pagePara.ListCommonQueryTabs.length; i++) {
        var tempTab = pagePara.ListCommonQueryTabs[i];
        if (!tempTab.IsHidden) {
            showTabs.push(tempTab);

            for (var j = 0; j < tempTab.ListObjTypes.length; j++) {
                if (tempTab.ListObjTypes[j].Hidden == false) {
                    pagePara.ListObjTypes.push(tempTab.ListObjTypes[j]);
                }
            }
        }
    }

    pagePara.ListCommonQueryTabs = showTabs;
    pagePara.LoadMore = true;// 是否有加载更多功能
    pagePara.ShowPaging = false;//是否有分页功能
    pagePara.ShowListTail = false;//是否显示列表底部区域
    InforCenter_Platform_ListCommonQuery_LoadviewFilterPage(page, pagePara);
    if (pagePara.ChangeTabLoadList == false) {
        pagePara.AutoLoadData = false;
        if (pagePara.ListCommonQueryTabs.length == 0) {
            pagePara.AutoLoadData = true;
        }

        if (pagePara.ListCommonQueryTabs.length > 0) {
            var first = pagePara.ListCommonQueryTabs[0];
            pagePara.DownListViewName = pagePara.ListViewName;
            pagePara.ListViewName = first.ListViewName;
            pagePara.ListTitleDataService = first.ListTitleDataService;
            pagePara.OnePageDataService = first.OnePageDataService;
            pagePara.FilterString = '';
            pagePara.EntityFilterString = '';
            pagePara.CurrentPager = 1;
            pagePara.ListObjTypes = first.ListObjTypes;
            pagePara.FilterSecurity = true;
            InforCenter_Platform_ListCommonQuery_LoadListView(page, listPage, selectedListPage, pagePara, selectedvalue);

            if (pagePara.AutoLoadData == true)
                InforCenter_Platform_ListViewCtrl_GetOnePageGridData(listGrid, pagePara);
        } else {
            InforCenter_Platform_ListCommonQuery_LoadListView(page, listPage, selectedListPage, pagePara, selectedvalue);
        }
    }
    else {
        if (pagePara.ListCommonQueryTabs.length > 0) {
            var first = pagePara.ListCommonQueryTabs[0];
            pagePara.ListViewName = first.ListViewName;
            pagePara.ListTitleDataService = first.ListTitleDataService;
            pagePara.OnePageDataService = first.OnePageDataService;
            pagePara.ListObjTypes = first.ListObjTypes;
        }
        InforCenter_Platform_ListCommonQuery_LoadListView(page, listPage, selectedListPage, pagePara, selectedvalue);
    }
    HoteamUI.Page.SetContainerParas(pageEvent.o.pid, pagePara);
};
//列表加载数据后执行方法
InforCenter_Platform_ListCommonQuery_OnLoadSuccess = function (pageEvent) {
    var id = pageEvent.listcid;
    var containerCtrl = HoteamUI.Control.Instance(id);
    var cid = containerCtrl.CID();
    var gridCtrl = HoteamUI.Control.InstanceIn(id, "ListView");
    if (cid == "ListViewPage") {//上方列表
        //获取上方列表的列表数据信息
        //var records = gridCtrl.GetPagerInfo().Records;
        var count = gridCtrl.GetRowsCount();
        var records = gridCtrl.GetPagerInfo().Records;
        var labelCtrl = containerCtrl.OtherControl("ListViewPageOneRTitle");
        labelCtrl.SetText(HoteamUI.Language.Lang("ListCommonQuery", "QueryListTitle").replace('{0}', count).replace('{1}', records));
    } else if (cid == "SelectedListViewPage") {//下方列表
        var count = gridCtrl.GetRowsCount();
        var labelCtrl = containerCtrl.OtherControl("ListViewPageTwoRTitle");
        labelCtrl.SetText(HoteamUI.Language.Lang("ListCommonQuery", "SelectListTitle").replace('{0}', count));
    }
}

InforCenter_Platform_ListCommonQuery_LoadviewFilterPage = function (page, pagePara) {
    var tabsPage = HoteamUI.Page.InstanceIn(page.pid, "TabsCtrlPage", "TabsCtrl");
    var tabsCtrl = tabsPage.GetControl("Tabs");
    var tabsPara = {};
    //支持tab页是否显示向左向右的参数传入
    if (pagePara.ShowSwitchBar && (pagePara.ShowSwitchBar == "true" || pagePara.ShowSwitchBar == true)) {
        tabsPara.showSwitchBar = true;
    }
    tabsPara.titleType = "capsule split";
    tabsCtrl.ReInit(tabsPara);
    pagePara.TabGuid = tabsCtrl.id;
    HoteamUI.Page.SetContainerParas(page.pid, page.PageName(), pagePara);
    var isQuery = false;
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.QueryPageName) == false) {
        var pageName = pagePara.QueryPageName;
        var title = HoteamUI.Language.Lang("ListCommonQuery", HoteamUI.Common.IsNullOrEmpty(pagePara.ItemName) ? pageName : pagePara.ItemName);
        if (HoteamUI.Common.IsNullOrEmpty(pagePara.QueryPageNameItem) == false) {
            pagePara.ItemName = pagePara.QueryPageNameItem;
        }
        InforCenter_Platform_TabsCtrl_AddTabs(tabsCtrl, pageName, pageName, pagePara, true, title, true, false, true);
        isQuery = true;
    }
    else if (HoteamUI.Common.IsNullOrEmpty(pagePara.ListCommonQueryTabs) == false) {
        for (var i = 0; i < pagePara.ListCommonQueryTabs.length; i++) {
            var tab = pagePara.ListCommonQueryTabs[i];
            if (HoteamUI.Common.IsNullOrEmpty(tab.QueryPageNameItem) == false) {
                pagePara.ItemName = tab.QueryPageNameItem;
            }
            var title = HoteamUI.Language.Lang("ListCommonQuery", tab.Name);
            InforCenter_Platform_TabsCtrl_AddTabs(tabsCtrl, tab.Name, tab.QueryPageName, pagePara, i == 0 ? true : false, title, true, false, true);
        }
        isQuery = true;
    }
    if (isQuery == false) {
        var contentPageContainer = page.GetControl("ContentPageContainer");
        contentPageContainer.HiddenPanel(["item1", "item2"]);
    }
}
InforCenter_Platform_ListCommonQuery_LoadListView = function (page, listPage, selectedListPage, pagePara, selectedvalue) {
    var gridTitle = InforCenter_Platform_ListViewCtrl_LoadListView(listPage, pagePara);
    if (gridTitle != null) {
        var listViewPageMainContainer = page.GetControl("ListViewPageMainContainer");
        if (pagePara.AllowMultiSelect) {
            pagePara.ShowPaging = false;
            pagePara.IsSelectExporting = false;
            pagePara.IsAllExporting = false;
            pagePara.IsSelectPrintin = false;
            pagePara.IsAllPrinting = false;
            pagePara.gridTitle = gridTitle;
            if (selectedvalue.length > 0) {
                pagePara.FilterString = " EID IN ('" + selectedvalue.join("','") + "')";
            }
            else {
                pagePara.AutoLoadData = false;
            }
            //上下列表的ListView不一致时 临时存上侧列表的ListView 在下侧列表加载完成后 再赋值回去
            var tmp = pagePara.ListViewName;
            if (pagePara.DownListViewName) {
                pagePara.ListViewName = pagePara.DownListViewName;
            }
            InforCenter_Platform_ListViewCtrl_LoadListView(selectedListPage, pagePara);
            pagePara.ListViewName = tmp;
            listViewPageMainContainer.HiddenPanel(["item5"]);
        }
        else {
            if (selectedvalue.length > 0)
                selectedvalue = HoteamUI.DataService.Call("InforCenter.Common.ObjectService.GetObjectInitDataByIDs", { para: { IDs: selectedvalue, ObjectTypes: pagePara.ReturnValueType } });
            if (selectedvalue == null) {
                return;
            }
            listViewPageMainContainer.HiddenPanel(["item3", "item4"]);
            var selectedcontainer = page.GetControl("SingleSelectContainer");

            selectedcontainer.SetLableName(HoteamUI.Language.Lang("TreeListCommonQuery.Selected") + ":");
            if (selectedvalue.Objects && selectedvalue.Objects.length) {
                var object = JSON.parse(selectedvalue.Objects[0]);
                selectedcontainer.SetContentVal({ text: object.ENAME, value: object });
            }
        }
    }
}
//查询按钮执行方法，
InforCenter_Platform_ListCommonQuery_OnQuery = function (pageEvent) {
    //向待选列表添加数据
    var page = pageEvent.o;
    var tabinfo = InforCenter_Platform_ListCommonQuery_SetTabQueryInfo(pageEvent);
    var listPage = HoteamUI.Page.InstanceIn(page.pid, "ListViewPage", "ListViewCtrl");
    //var pageContainer = listPage.GetControl("ListView_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(pageEvent.o.pid);
    if (tabinfo && tabinfo.QueryJS) {
        HoteamUI.Common.ExeFunction(tabinfo.QueryJS, pageEvent);
    }
    else if (pagePara.QueryJS) {
        HoteamUI.Common.ExeFunction(pagePara.QueryJS, pageEvent);
    }
    else {
        var ctrl = listPage.GetControl("ListView");
        var para = {};
        for (var key in pageEvent) {
            if (!pageEvent.hasOwnProperty(key)) {
                continue;
            }
            if (typeof pageEvent[key] == "string") {
                para[key] = pageEvent[key];
            }
        }
        para.CurrentPager = 1;
        para.TreeGuid = tabinfo.TreeGuid;
        para.FilterSecurity = true;
        InforCenter_Platform_ListViewCtrl_GetOnePageGridData(ctrl, para);
    }
}
InforCenter_Platform_ListCommonQuery_SetTabQueryInfo = function (pageEvent) {
    //向待选列表添加数据
    var page = pageEvent.o;
    var para = HoteamUI.Page.GetContainerPara(pageEvent.o.pid);


    var tabCtrl = HoteamUI.Control.Instance(para.TabGuid);
    var selectTabIndex = tabCtrl.GetSelectedTab();
    var tabs = tabCtrl.GetTabInfoList();
    var selectTab = tabs[selectTabIndex];
    var item = null;
    if (para.ListCommonQueryTabs.length > 0) {
        //   for (var i in para.ListCommonQueryTabs) {
        for (var i = 0; i < para.ListCommonQueryTabs.length; i++) {
            var t = para.ListCommonQueryTabs[i];
            if (t.Name == selectTab.tabId) {
                item = t;
                break;
            }
        }
    } else if (para.QueryPageName) {
        item = {};
    }
    if (item) {
        if (pageEvent.FilterString)
            item.FilterString = pageEvent.FilterString;
        if (pageEvent.EntityFilterString)
            item.EntityFilterString = pageEvent.EntityFilterString;
        if (pageEvent.TreeGuid)
            item.TreeGuid = pageEvent.TreeGuid;
        else if (selectTab.pageName == "TreeListQueryCtrl") {
            var treePage = HoteamUI.Page.Instance(selectTab.pid);
            var pageContainer = treePage.GetControl("ViewFilterPageContainer");
            var para = HoteamUI.Page.GetContainerPara(pageContainer.id);
            item.TreeGuid = para.TreeGuid;
        }
    }
    HoteamUI.Page.SetContainerParas(pageEvent.o.pid, "ListCommonQuery", para);

    return item;
};

InforCenter_Platform_ListCommonQuery_CheckAddSelect = function (selectEID, selectedGrid, selectKey) {
    if (HoteamUI.Common.IsNullOrEmpty(selectKey)) {
        selectKey = "EID";
    }
    var selecteddata = selectedGrid.GetCurrentPageRows();
    for (var i = 0; i < selecteddata.length; i++) {
        var row = selecteddata[i];
        if (row[selectKey] == selectEID)
            return true;
    }
    return false;
}

InforCenter_Platform_ListCommonQuery_OnOK = function (ctrlEvent) {
    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    var para = HoteamUI.Page.GetContainerPara(ctrlEvent.o.ContainerID());
    var grid = HoteamUI.Control.Instance(para.ListGuid);
    //自定义提交脚本
    if (para && HoteamUI.Common.IsNullOrEmpty(para.CommitJS) == false) {
        HoteamUI.Common.ExeFunction(para.CommitJS, ctrlEvent);
        return;
    }
    var gridSelectData = [];
    var labelName = InforCenter_Platform_ListCommonQuery_CheckData(page, para, gridSelectData);
    if (labelName == "") {
        var returnValue = [];
        var key = "EID";
        if (HoteamUI.Common.IsNullOrEmpty(para.KeyFilter) == false) {
            key = para.KeyFilter;
        }
        //   for (var i in gridSelectData) {
        for (var i = 0; i < gridSelectData.length; i++) {
            var row = gridSelectData[i];
            if (row[key]) {
                returnValue[i] = row[key];
            }
        }
        if (para.ReturnGridData) {
            InforCenter_Platform_ListCommonQuery_ReturnSelectGridData(page, para);
        }
        else if (para.HiddenButton && para.HiddenButton == true) {
            return true;
        }
        else {
            InforCenter_Platform_CommonQuery_CheckReturnData(returnValue, para, ctrlEvent.o.ContainerID(), false)
        }
    }
    else {
        return InforCenter_Platform_ListCommonQuery_AlertToSelect(labelName);
    }
}
InforCenter_Platform_ListCommonQuery_CheckData = function (page, para, gridSelectData) {
    var grid = HoteamUI.Control.Instance(para.ListGuid);
    if (grid) {
        //var gridSelectData = [];
        if (para.AllowMultiSelect) {
            var selectedgrid = HoteamUI.Control.Instance(para.SelectedListGuid);
            var d = selectedgrid.GetCurrentPageRows();
            for (var i = 0; i < d.length; i++) {
                gridSelectData.push(d[i]);
            }
        }
        else {
            var d = grid.GetSelectedRows()
            for (var i = 0; i < d.length; i++) {
                gridSelectData.push(d[i]);
            }
            if (gridSelectData.length == 0) {
                var selectedContainer = page.GetControl("SingleSelectContainer");
                var selecteddata = selectedContainer.GetContentVal().value;
                if (selecteddata)
                    gridSelectData.push(selecteddata);
            }
        }
        var labelName = "";

        if (gridSelectData.length > 1) {
            if (para.AllowMultiSelect == false) {
                labelName = "OnlyOneAllow";
            }
        }
        else if (gridSelectData.length == 0) {
            if (para.AllowReturnEmptyValue == false) {
                if (para.AllowMultiSelect == false) {
                    labelName = "NotOneSelectObject";
                }
                else {
                    labelName = "NotSelectObject";
                }
            }
        }
        return labelName;
    }
}
InforCenter_Platform_ListCommonQuery_ReturnSelectGridData = function (page, pagePara) {
    var listGuid = pagePara.AllowMultiSelect ? pagePara.SelectedListGuid : pagePara.ListGuid;
    var ListCtrl = HoteamUI.Control.Instance(listGuid);
    var lstData = pagePara.AllowMultiSelect ? ListCtrl.GetCurrentPageRows() : ListCtrl.GetSelectedRows();
    HoteamUI.UIManager.Return(page.pid, lstData);
}
InforCenter_Platform_ListCommonQuery_AlertToSelect = function (labelName) {
    var para = { pageMode: "OK", context: "Platform", labelName: labelName };
    HoteamUI.UIManager.Popup("Confirm", para);
    return false;
}

InforCenter_Platform_ListCommonQuery_OnRowClick = function (pageEvent) {
    var pagePara = HoteamUI.Page.GetContainerPara(pageEvent.o.pid);
    if (!pagePara.AllowMultiSelect) {//如果是一个列表的情况（只允许单选）,则需要在下方将已选项体现出来
        var selectCtrl = pageEvent.SelectCtrl;
        var rows = selectCtrl.GetSelectedRows();
        if (rows.length > 0) {
            pageEvent.o.GetControl("SingleSelectContainer").SetContentVal({ text: rows[0].ENAME, value: rows[0] });
        }
    }
}

InforCenter_Platform_ListCommonQuery_OnRowDblClick = function (pageEvent) {
    var pagePara = HoteamUI.Page.GetContainerPara(pageEvent.o.pid);
    var selectObject = pageEvent.SelectCtrl;
    if (selectObject.id == pagePara.SelectedListGuid) {
        selectObject.RemoveSelectedRows();
    }
    else if (selectObject.id == pagePara.ListGuid) {
        if (pagePara.AllowMultiSelect) {
            var selectData = pageEvent.SelectRowData;
            var selectedCtrl = HoteamUI.Control.Instance(pagePara.SelectedListGuid);

            var key = "EID";
            if (HoteamUI.Common.IsNullOrEmpty(pagePara.KeyFilter) == false) {
                key = pagePara.KeyFilter;
            }

            if (!InforCenter_Platform_ListCommonQuery_CheckAddSelect(selectData[key], selectedCtrl, key)) {
                selectedCtrl.AddRows([selectData]);
                //处理列表头部提示信息
                var labelCtrl = pageEvent.o.GetControl("ListViewPageTwoRTitle");
                labelCtrl.SetText(HoteamUI.Language.Lang("ListCommonQuery", "SelectListTitle").replace('{0}', selectedCtrl.GetRowsCount()));
            }
        }
        else {
            var selectedCtrl = HoteamUI.Control.Instance(pagePara.ListGuid);
            selectedCtrl.UnSelectAll();
            selectedCtrl.SetSelectedRow([pageEvent.SelectRowData.row_number]);
            var btnOK = pageEvent.o.GetControl("btnOK");// HoteamUI.Control.Instance(pagePara.btnOKGuid);
            btnOK.Click();
        }
    }
}

InforCenter_Platform_ListCommonQuery_OnNodeChange = function (pageEvent) {
    var pagePara = pageEvent.Para;
    var tabinfo = InforCenter_Platform_ListCommonQuery_SetTabQueryInfo(pageEvent);
    if (tabinfo && tabinfo.NodeChangeJS) {
        HoteamUI.Common.ExeFunction(tabinfo.NodeChangeJS, pageEvent);
    }
    else if (pagePara.NodeChangeJS) {
        HoteamUI.Common.ExeFunction(pagePara.NodeChangeJS, pageEvent);
    }
    else {
        var ctrl = pageEvent.TreeCtrl;
        var node = ctrl.GetSelectedNode();
        if (HoteamUI.Common.IsNullOrEmpty(node) == false
            && HoteamUI.Common.IsNullOrEmpty(pagePara.ListGuid) == false) {
            var ListCtrl = HoteamUI.Control.Instance(pagePara.ListGuid);

            var callFUNC = function (gridData) {
                var labelCtrl = pageEvent.o.GetControl("ListViewPageOneRTitle");
                var count = ListCtrl.GetRowsCount();
                var records = ListCtrl.GetPagerInfo().Records;
                labelCtrl.SetText(HoteamUI.Language.Lang("ListCommonQuery", "QueryListTitle").replace('{0}', count).replace('{1}', records));
            }
            InforCenter_Platform_ListViewCtrl_GetOnePageGridData(ListCtrl, { CurrentPager: 1, TreeGuid: pagePara.TreeGuid }, callFUNC);
        }
    }
};
InforCenter_Platform_ListCommonQuery_SelectedOne = function (ctrlEvent) {
    var para = HoteamUI.Page.GetContainerPara(ctrlEvent.o.ContainerID());
    var grid = HoteamUI.Control.Instance(para.ListGuid);
    var selectedgrid = HoteamUI.Control.Instance(para.SelectedListGuid);
    var gridSelectData;
    if (grid) {
        gridSelectData = grid.GetSelectedRows();
        if (gridSelectData.length == 0) {
            InforCenter_Platform_ListCommonQuery_ShowNonOperateInfo("NoAddSelectRowInfo");
            return;
        }
        var key = "EID";
        if (HoteamUI.Common.IsNullOrEmpty(para.KeyFilter) == false) {
            key = para.KeyFilter;
        }

        for (var i = 0; i < gridSelectData.length; i++) {
            var selected = gridSelectData[i];
            if (selected && !InforCenter_Platform_ListCommonQuery_CheckAddSelect(selected[key], selectedgrid, key)) {
                selectedgrid.AddRows([selected]);
            }
        }
        //处理列表头部提示信息
        var labelCtrl = ctrlEvent.o.OtherControl("ListViewPageTwoRTitle");
        labelCtrl.SetText(HoteamUI.Language.Lang("ListCommonQuery", "SelectListTitle").replace('{0}', selectedgrid.GetRowsCount()));
    }
}
InforCenter_Platform_ListCommonQuery_SelectedAll = function (ctrlEvent) {
    var para = HoteamUI.Page.GetContainerPara(ctrlEvent.o.ContainerID());
    var grid = HoteamUI.Control.Instance(para.ListGuid);
    var selectedgrid = HoteamUI.Control.Instance(para.SelectedListGuid);
    if (grid) {
        var gridSelectData = grid.GetCurrentPageRows();
        if (gridSelectData.length == 0) {
            InforCenter_Platform_ListCommonQuery_ShowNonOperateInfo("NoAddRowInfo");
            return;
        }

        var key = "EID";
        if (HoteamUI.Common.IsNullOrEmpty(para.KeyFilter) == false) {
            key = para.KeyFilter;
        }

        //  for (var i in gridSelectData) {
        for (var i = 0; i < gridSelectData.length; i++) {
            var selected = gridSelectData[i];
            if (selected && !InforCenter_Platform_ListCommonQuery_CheckAddSelect(selected[key], selectedgrid, key)) {
                selectedgrid.AddRows([selected]);
            }
        }
        //处理列表头部提示信息
        var labelCtrl = ctrlEvent.o.OtherControl("ListViewPageTwoRTitle");
        labelCtrl.SetText(HoteamUI.Language.Lang("ListCommonQuery", "SelectListTitle").replace('{0}', selectedgrid.GetRowsCount()));
    }
};
InforCenter_Platform_ListCommonQuery_RemoveOne = function (ctrlEvent) {
    var para = HoteamUI.Page.GetContainerPara(ctrlEvent.o.ContainerID());
    var selectedgrid = HoteamUI.Control.Instance(para.SelectedListGuid);
    if (selectedgrid) {
        var gridData = selectedgrid.GetSelectedRows();
        if (gridData.length == 0) {
            InforCenter_Platform_ListCommonQuery_ShowNonOperateInfo("NoRemoveSelectRowInfo");
            return;
        }

        selectedgrid.RemoveSelectedRows();
        //处理列表头部提示信息
        var labelCtrl = ctrlEvent.o.OtherControl("ListViewPageTwoRTitle");
        labelCtrl.SetText(HoteamUI.Language.Lang("ListCommonQuery", "SelectListTitle").replace('{0}', selectedgrid.GetRowsCount()));
    }
};
InforCenter_Platform_ListCommonQuery_RemoveAll = function (ctrlEvent) {
    var para = HoteamUI.Page.GetContainerPara(ctrlEvent.o.ContainerID());
    var selectedgrid = HoteamUI.Control.Instance(para.SelectedListGuid);
    if (selectedgrid) {
        var gridData = selectedgrid.GetCurrentPageRows();
        if (gridData.length == 0) {
            InforCenter_Platform_ListCommonQuery_ShowNonOperateInfo("NoRemoveRowInfo");
            return;
        }

        selectedgrid.ClearGridRows();
        //处理列表头部提示信息
        var labelCtrl = ctrlEvent.o.OtherControl("ListViewPageTwoRTitle");
        labelCtrl.SetText(HoteamUI.Language.Lang("ListCommonQuery", "SelectListTitle").replace('{0}', selectedgrid.GetRowsCount()));
    }
};
InforCenter_Platform_ListCommonQuery_ShowNonOperateInfo = function (type) {
    //未选择数据提示
    var info = HoteamUI.Language.Lang("ListCommonQuery." + type);
    HoteamUI.UIManager.MsgBox(info, "", "", "");
}

InforCenter_Platform_ListCommonQuery_OnTabChange = function (pageEvent) {
    var page = pageEvent.o;
    var para = HoteamUI.Page.GetContainerPara(pageEvent.o.pid);
    if (para.TabChangeJS) {
        HoteamUI.Common.ExeFunction(para.TabChangeJS, pageEvent);
    } else {
        var curitem = null;
        var preitem = null;
        var curitemindex = -1;
        var preitemindex = -1;
        if (para.ListCommonQueryTabs.length > 0) {
            //   for (var i in para.ListCommonQueryTabs) {
            for (var i = 0; i < para.ListCommonQueryTabs.length; i++) {
                var t = para.ListCommonQueryTabs[i];
                if (t.Name == pageEvent.currenttabid) {
                    curitem = t;
                    curitemindex = i;
                    continue;
                }
                if (t.Name == pageEvent.tabid) {
                    preitem = t;
                    preitemindex = i;
                    continue;
                }
            }
            var listPage = HoteamUI.Page.InstanceIn(page.pid, "ListViewPage", "ListViewCtrl");
            if (para.ChangeTabLoadList == true) {
                para.ListViewName = curitem.ListViewName;
                para.ListTitleDataService = curitem.ListTitleDataService;
                para.OnePageDataService = curitem.OnePageDataService;
                para.ListObjTypes = curitem.ListObjTypes;
                para.AutoLoadData = true;
                para.FilterSecurity = true;
                var selectedListPage = HoteamUI.Page.InstanceIn(page.pid, "SelectedListViewPage", "ListViewCtrl");
                InforCenter_Platform_ListCommonQuery_LoadListView(page, listPage, selectedListPage, para, []);
            }
            else {
                curitem.CurrentPager = 1;
                var listGrid = listPage.GetControl("ListView");
                var pageContainer = listGrid.OtherControl("ListView_Container");
                var prePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
                if (preitemindex > -1)
                    para.ListCommonQueryTabs[preitemindex] = $.extend(prePara, preitem);
                HoteamUI.Page.SetContainerParas(page.pid, page.PageName(), para);
                curitem.FilterString = curitem.FilterString === undefined ? "" : curitem.FilterString;
                curitem.EntityFilterString = curitem.EntityFilterString === undefined ? "" : curitem.EntityFilterString;
                curitem.RelatedFilterString = curitem.RelatedFilterString === undefined ? "" : curitem.RelatedFilterString;
                curitem.RelatedEntityFilterString = curitem.RelatedEntityFilterString === undefined ? "" : curitem.RelatedEntityFilterString;
                curitem.FilterSecurity = true;
                InforCenter_Platform_ListViewCtrl_GetTabChangeGridTitleData(listGrid, curitem)
                //InforCenter_Platform_ListViewCtrl_GetOnePageGridData(listGrid, curitem);
            }
        }
    }
};

InforCenter_Platform_ListViewCtrl_GetTabChangeGridTitleData = function (listGrid, pagePara) {
    var titleDataService = "InforCenter.Common.WebListViewService.GetGridRowTitle";
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.ListTitleDataService) == false) {
        titleDataService = pagePara.ListTitleDataService;
    }
    var execPara = {};
    var sParaList = JSON.stringify(pagePara);
    execPara.para = { ViewName: pagePara.ListViewName, ObjectType: pagePara.ObjectType, ParaList: sParaList };
    pagePara.gridTitle = HoteamUI.DataService.Call(titleDataService, execPara);
    InforCenter_Platform_ListCommonQuery_TabChangeSetGridTitle(listGrid, pagePara);
    return pagePara.gridTitle;
}

InforCenter_Platform_ListCommonQuery_TabChangeSetGridTitle = function (listGrid, para) {
    var gridTitle = para.gridTitle;
    if (HoteamUI.Common.IsNullOrEmpty(gridTitle) == false) {

        var pageContainer = listGrid.OtherControl("ListView_Container");
        var pagePara = para;
        pagePara.ParaList = gridTitle.FilterFlag;
        pagePara.WebListView = gridTitle.WebListView;

        if (para.AutoLoadData != undefined) {
            pagePara.AutoLoadData = para.AutoLoadData;
        }

        HoteamUI.Page.SetContainerParas(pageContainer.id, pagePara);

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
            titlePara.zebraList = gridTitle.WebListView.ZebraList;
            titlePara.hoverLight = gridTitle.WebListView.HoverLight;
            titlePara.border = gridTitle.WebListView.Border;
            titlePara.isSelectCheckbox = gridTitle.WebListView.IsSelectCheckbox;

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
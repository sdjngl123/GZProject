//树管理页面加载事件
InforCenter_Platform_TreeListCommonQuery_LoadPage = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    var selectedvalue = pagePara.Value;
    if (selectedvalue && selectedvalue.length > 1 && selectedvalue.substring(selectedvalue.length - 1) == ";") {
        selectedvalue = selectedvalue.substring(0, selectedvalue.length - 1);
    }
    selectedvalue = selectedvalue ? selectedvalue.split(';') : [];

    var data = null;
    $.each(TreeListCommonQueryScript, function (index, val) {
        if (val.Name == pagePara.ItemName)
            data = JSON.parse(JSON.stringify(val));
    });
    if (data == null) {
        data = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GetTreeListCommonQuery", { para: { Name: pagePara.ItemName } });
        if (data)
            TreeListCommonQueryScript.push(data);
    }
    if (data == null) {
        return;
    }

    pagePara = $.extend(data, pagePara);
    var listPage = HoteamUI.Page.InstanceIn(page.pid, "ListViewPageContainer", "ListViewCtrl");
    var treePage = HoteamUI.Page.InstanceIn(page.pid, "TreeViewPage", "TreeViewCtrl");
    var selectedListPage = HoteamUI.Page.InstanceIn(page.pid, "SelectedListViewPage", "ListViewCtrl");
    var listCtrl = listPage.GetControl("ListView");
    var treeCtrl = treePage.GetControl("TreeView");
    var selectedGrid = selectedListPage.GetControl("ListView");
    var btnOkId = page.GetControl("btnOK").id;

    pagePara.ListGuid = listCtrl.id;
    pagePara.TreeGuid = treeCtrl.id;
    pagePara.SelectedGridGuid = selectedGrid.id;
    pagePara.PagePID = page.pid;
    pagePara.AllowMultiSelect = data.AllowMultiSelect;
    pagePara.btnOKGuid = btnOkId;

    var treeData = InforCenter_Platform_TreeViewCtrl_LoadTreeView(treePage, pagePara);
    if (treeData == null) {
        return;
    }
    var node = treeCtrl.GetSelectedNode();
    if (node) {
        pagePara.AllowCheckBox = false;
        var gridTitle = InforCenter_Platform_ListViewCtrl_LoadListView(listPage, pagePara);
        //当存在初始值时，进行填充已选对象列表

        var listViewPageMainContainer = page.GetControl("ListViewMainPage_Container");
        //多选模型
        if (data.AllowMultiSelect) {
            pagePara.ShowPaging = false;
            pagePara.SelectedListGuid = selectedGrid.id;
            pagePara.IsSelectExporting = false;
            pagePara.IsAllExporting = false;
            pagePara.IsSelectPrintin = false;
            pagePara.IsAllPrinting = false;
            pagePara.gridTitle = gridTitle;
            pagePara.AutoLoadData = false;

            var listTitleData = InforCenter_Platform_ListViewCtrl_LoadListView(selectedListPage, pagePara);
            if (listTitleData == null) {
                return;
            }
            if (selectedvalue.length > 0) {
                var ctrl = selectedListPage.GetControl("ListView");
                var para = {};
                para.FilterString = " EID IN ('" + selectedvalue.join("','") + "')";
                para.DistinctField = "EID";
                para.EntityFilterString = pageEvent.EntityFilterString;
                para.CurrentPager = 1;
                para.RowNumber = 9999;
                if (pagePara.QueryListViewName) {
                    para.ListViewName = pagePara.QueryListViewName;
                }
                InforCenter_Platform_ListViewCtrl_GetOnePageGridData(ctrl, para);
            }
            listViewPageMainContainer.HiddenPanel(["item4"]);
        }
        //单选模式
        else {
            if (selectedvalue.length > 0)
                selectedvalue = HoteamUI.DataService.Call("InforCenter.Common.ObjectService.GetObjectInitDataByIDs", { para: { IDs: selectedvalue, ObjectTypes: pagePara.ReturnValueType } });
            if (selectedvalue == null) {
                return;
            }
            listViewPageMainContainer.HiddenPanel(["item2", "item3"]);
            var selectedcontainer = page.GetControl("SingleSelectContainer");

            selectedcontainer.SetLableName(HoteamUI.Language.Lang("TreeListCommonQuery.Selected") + ":");
            if (selectedvalue.Objects && selectedvalue.Objects.length) {
                var object = JSON.parse(selectedvalue.Objects[0]);
                selectedcontainer.SetContentVal({ text: object.ENAME, value: object });
            }
        }
        InforCenter_Platform_TreeListCommonQuery_LoadviewFilterPage(page, pagePara);
        var topContainer = page.GetControl("ViewFilterPageContainer");
        HoteamUI.Page.SetContainerParas(topContainer.id, "TreeListCommonQuery", pagePara);
    }
};

InforCenter_Platform_TreeListCommonQuery_LoadviewFilterPage = function (page, pagePara) {
    var listViewFilterPageContainer = page.GetControl("Top_Container");
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.QueryPageName) == false) {
        var viewFilterPage = page.GetControl("ViewFilterPageContainer");
        HoteamUI.UIManager.Show(viewFilterPage.id, pagePara.QueryPageName, pagePara)
    }
    else {
        if (HoteamUI.Common.IsNullOrEmpty(listViewFilterPageContainer) == false) {
            listViewFilterPageContainer.HiddenPanel(["item4", "item5"]);
        }
    }
}

InforCenter_Platform_TreeListCommonQuery_OnRowDblClick = function (pageEvent) {

    var containerid = pageEvent.o.GetControl("ViewFilterPageContainer").id;
    var pagePara = HoteamUI.Page.GetContainerPara(containerid);
    var selectObject = pageEvent.SelectObject;
    if (selectObject.id == pagePara.SelectedListGuid) {
        selectObject.RemoveSelectedRows();
    }
    else if (selectObject.id == pagePara.ListGuid) {
        if (pagePara.AllowMultiSelect) {
            var selectData = selectObject.GetSelectedRows()[0];
            var selectedCtrl = HoteamUI.Control.Instance(pagePara.SelectedListGuid);
            if (!InforCenter_Platform_ListCommonQuery_CheckAddSelect(selectData.EID, selectedCtrl)) {
                selectedCtrl.AddRows([selectData]);
            }
        }
        else {
            var btnOK = HoteamUI.Control.Instance(pagePara.btnOKGuid);
            btnOK.Click();
        }
    }
}
InforCenter_Platform_TreeListCommonQuery_GetIsShowContent = function (pagePara, node) {
    var objPara = true;
    var objTypes = pagePara.ObjTypes;
    if (objTypes && objTypes.length > 0) {
        if (HoteamUI.Common.IsNullOrEmpty(node.value5) == false) {
            objPara = InforCenter_Platform_TreeListCommonQuery_GetTypeIsShowContent(objTypes, node.value5);
        }
        if (pageLinksName == null) {
            objPara = InforCenter_Platform_TreeListCommonQuery_GetTypeIsShowContent(objTypes, node.value3);
        }
    }
    return isShowContent;
};
InforCenter_Platform_TreeListCommonQuery_GetTypeIsShowContent = function (objTypes, objType) {
    var objPara = null;
    //  for (var i in objTypes) {
    for (var i = 0; i < objTypes.length; i++) {
        var obj = objTypes[i];
        if (obj.Name && obj.Name == objType) {
            objPara = obj;
            break;
        }
    }
    return objPara;
};
InforCenter_Platform_TreeListCommonQuery_OnNodeChange = function (pageEvent) {
    var ctrl = pageEvent.ctrl;
    var node = ctrl.GetSelectedNode();
    var pageContainer = ctrl.OtherControl("TreeView_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
    if (HoteamUI.Common.IsNullOrEmpty(node) == false
        && HoteamUI.Common.IsNullOrEmpty(pagePara.ListGuid) == false) {
        var ListCtrl = HoteamUI.Control.Instance(pagePara.ListGuid);
        var objPara = InforCenter_Platform_TreeManagement_GetTypeTabs(pagePara, node);
        if (objPara && objPara.IsHideContent == true) {
            ListCtrl.ClearGridRows();
        }
        else {
            var listViewName = pagePara.ListViewName;
            if (objPara && objPara.ListViewName) {
                listViewName = objPara.ListViewName;
            }
            InforCenter_Platform_ListViewCtrl_GetOnePageGridData(ListCtrl, { CurrentPager: 1, ListViewName: listViewName });
        }
    }
};
InforCenter_Platform_TreeListCommonQuery_OnOK = function (ctrlEvent) {
    var pageContainer = ctrlEvent.o.OtherControl("ViewFilterPageContainer");
    var para = HoteamUI.Page.GetContainerPara(pageContainer.id);
    var grid = HoteamUI.Control.Instance(para.ListGuid);
    //自定义提交脚本
    if (para && HoteamUI.Common.IsNullOrEmpty(para.CommitJS) == false) {
        HoteamUI.Common.ExeFunction(para.CommitJS, ctrlEvent);
        return;
    }
    if (grid) {
        if (para.AllowMultiSelect) {
            var selectedgrid = HoteamUI.Control.Instance(para.SelectedListGuid);
            gridSelectData = selectedgrid.GetCurrentPageRows();
        }
        else {
            gridSelectData = grid.GetSelectedRows();
            if (gridSelectData.length == 0) {
                var selectedContainer = ctrlEvent.o.OtherControl("SingleSelectContainer");
                var selecteddata = selectedContainer.GetContentVal().value;
                if (selecteddata)
                    gridSelectData = [selecteddata];
                else
                    gridSelectData = [];
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
        if (labelName == "") {
            var returnValue = [];
            //   for (var i in gridSelectData) {
            for (var i = 0; i < gridSelectData.length; i++) {
                var row = gridSelectData[i];
                if (row.EID) {
                    returnValue[i] = row.EID;
                }
            }
            InforCenter_Platform_CommonQuery_CheckReturnData(returnValue, para, ctrlEvent.o.ContainerID(), false)
        }
        else {
            InforCenter_Platform_ListCommonQuery_AlertToSelect(labelName);
        }
    }
}


InforCenter_Platform_TreeListCommonQuery_SelectedOne = function (ctrlEvent) {
    var pageContainer = ctrlEvent.o.OtherControl("ViewFilterPageContainer");
    var para = HoteamUI.Page.GetContainerPara(pageContainer.id);
    var grid = HoteamUI.Control.Instance(para.ListGuid);
    var selectedgrid = HoteamUI.Control.Instance(para.SelectedListGuid);
    var gridSelectData;
    if (grid) {
        gridSelectData = grid.GetSelectedRows();
        for (var i = 0; i < gridSelectData.length; i++) {
            var selected = gridSelectData[i];
            if (selected && !InforCenter_Platform_ListCommonQuery_CheckAddSelect(selected.EID, selectedgrid)) {
                selectedgrid.AddRows([selected]);
            }
        }
    }
}
InforCenter_Platform_TreeListCommonQuery_SelectedAll = function (ctrlEvent) {
    var pageContainer = ctrlEvent.o.OtherControl("ViewFilterPageContainer");
    var para = HoteamUI.Page.GetContainerPara(pageContainer.id);
    var grid = HoteamUI.Control.Instance(para.ListGuid);
    var selectedgrid = HoteamUI.Control.Instance(para.SelectedListGuid);
    if (grid) {
        var gridSelectData = grid.GetCurrentPageRows();
        //       for (var i in gridSelectData) {
        for (var i = 0; i < gridSelectData.length; i++) {
            var selected = gridSelectData[i];
            if (selected && !InforCenter_Platform_ListCommonQuery_CheckAddSelect(selected.EID, selectedgrid)) {
                selectedgrid.AddRows([selected]);
            }
        }
    }
}
InforCenter_Platform_TreeListCommonQuery_RemoveOne = function (ctrlEvent) {
    var pageContainer = ctrlEvent.o.OtherControl("ViewFilterPageContainer");
    var para = HoteamUI.Page.GetContainerPara(pageContainer.id);
    var selectedgrid = HoteamUI.Control.Instance(para.SelectedListGuid);
    selectedgrid.RemoveSelectedRows();
}
InforCenter_Platform_TreeListCommonQuery_RemoveAll = function (ctrlEvent) {
    var pageContainer = ctrlEvent.o.OtherControl("ViewFilterPageContainer");
    var para = HoteamUI.Page.GetContainerPara(pageContainer.id);
    var selectedgrid = HoteamUI.Control.Instance(para.SelectedListGuid);
    selectedgrid.ClearGridRows();
}
InforCenter_Platform_TreeListManagement_OnQuery = function (pageEvent) {
    var listPage = HoteamUI.Page.InstanceIn(pageEvent.o.pid, "ListViewPageContainer", "ListViewCtrl");
    var ctrl = listPage.GetControl("ListView");
    var para = {};
    para.FilterString = pageEvent.FilterString;
    para.EntityFilterString = pageEvent.EntityFilterString;
    para.CurrentPager = 1;

    var pageContainer = ctrl.OtherControl("ListView_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
    var treeGuid = pagePara.TreeGuid;

    HoteamUI.Page.SetContainerParas(pageContainer.id, "TreeListCommonQuery", pagePara);
    if (pageEvent.ButtonType == "Reset") {
        para.ListViewName = pagePara.ListViewName;
    }
    else {
        if (pagePara.QueryListViewName) {
            para.ListViewName = pagePara.QueryListViewName;
        }
    }

    var callFunc = function (griddata) {
        HoteamUI.Page.SetContainerParas(pageContainer.id, "TreeListCommonQuery", pagePara);

        //当返回值为多值时，查询出的结果为一个时，自动添加到已选列表中
        var listView = pageEvent.o.GetControl("ViewFilterPageContainer");
        var para = HoteamUI.Page.GetContainerPara(listView.id);
        var rows = ctrl.GetCurrentPageRows();
        if (para.AllowMultiSelect && rows && rows.length == 1 && pageEvent.ButtonType == "Query") {
            var selectedGrid = HoteamUI.Control.Instance(para.SelectedGridGuid);
            var selectEID = rows[0].EID;

            if (!InforCenter_Platform_ListCommonQuery_CheckAddSelect(selectEID, selectedGrid)) {
                selectedGrid.AddRows(rows);
            }
        }
    }
    InforCenter_Platform_ListViewCtrl_GetOnePageGridData(ctrl, para, callFunc);
}
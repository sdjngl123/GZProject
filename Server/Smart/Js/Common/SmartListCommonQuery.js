////列表管理页面加载事件
//InforCenter_Platform_SmartListCommonQuery_LoadPage = function (pageEvent) {
//    var page = pageEvent.o;
//    var pagePara = page.GetPara();
//    pagePara.ListCtrlPageName = "SmartListViewCtrl";
//    var listPage = HoteamUI.Page.InstanceIn(page.pid, "ListViewPageContainer", "SmartListViewCtrl");
//    var selectedListPage = HoteamUI.Page.InstanceIn(page.pid, "SelectedListViewPageContainer", "SmartListViewCtrl");
//    InforCenter_Platform_SmartListCommonQuery_LoadData(pageEvent, page, pagePara, listPage, selectedListPage);
//};

////查询按钮执行方法，
//InforCenter_Platform_SmartListCommonQuery_OnQuery = function (pageEvent) {
//    //向待选列表添加数据
//    var listPage = HoteamUI.Page.InstanceIn(pageEvent.o.pid, "ListViewPageContainer", "SmartListViewCtrl");
//    InforCenter_Platform_SmartListCommonQuery_OnQueryData(pageEvent, listPage);
//};

//InforCenter_Platform_SmartListCommonQuery_LoadData = function (pageEvent, page, pagePara, listPage, selectedListPage) {

//    var listGrid = listPage.GetControl("ListView");
//    var selectedGrid = selectedListPage.GetControl("ListView");
//    var btnOkId = page.GetControl("btnOK").id;

//    var itemName = null;
//    var selectedvalue = pagePara.Value;
//    if (selectedvalue && selectedvalue.length > 1 && selectedvalue.substring(selectedvalue.length - 1) == ";") {
//        selectedvalue = selectedvalue.substring(0, selectedvalue.length - 1);
//    }
//    selectedvalue = selectedvalue ? selectedvalue.split(';') : [];

//    if (HoteamUI.Common.IsNullOrEmpty(pageEvent.ItemName) == false) {
//        itemName = pageEvent.ItemName;
//    }
//    else {
//        itemName = pagePara.ItemName;
//    }
//    var data = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GetListCommonQuery", { para: { Name: itemName } });
//    if (data == null) {
//        return;
//    }

//    pagePara = HoteamUI.Common.MergeObject(data, pagePara);
//    pagePara.ListGuid = listGrid.id;
//    pagePara.AllowCheckBox = false;
//    pagePara.AllowMultiSelect = data.AllowMultiSelect;
//    pagePara.btnOKGuid = btnOkId;
//    var gridTitle = InforCenter_Platform_ListViewCtrl_LoadListView(listPage, pagePara);
//    if (gridTitle != null) {
//        var listViewPageMainContainer = page.GetControl("ListViewPageMainContainer");
//        if (data.AllowMultiSelect) {
//            pagePara.ShowPaging = false;
//            pagePara.SelectedListGuid = selectedGrid.id;
//            pagePara.IsSelectExporting = false;
//            pagePara.IsAllExporting = false;
//            pagePara.IsSelectPrintin = false;
//            pagePara.IsAllPrinting = false;
//            pagePara.gridTitle = gridTitle;
//            if (selectedvalue.length > 0) {
//                pagePara.FilterString = " EID IN ('" + selectedvalue.join("','") + "')";
//            }
//            else {
//                pagePara.AutoLoadData = false;
//            }

//            InforCenter_Platform_ListViewCtrl_LoadListView(selectedListPage, pagePara);
//            listViewPageMainContainer.HiddenPanel(["item4"]);
//        }
//        else {
//            if (selectedvalue.length > 0)
//                selectedvalue = HoteamUI.DataService.Call("InforCenter.Common.ObjectService.GetObjectInitDataByIDs", { para: { IDs: selectedvalue, ObjectTypes: pagePara.ReturnValueType } });
//            if (selectedvalue == null) {
//                return;
//            }
//            listViewPageMainContainer.HiddenPanel(["item2", "item3"]);
//            var selectedcontainer = page.GetControl("SingleSelectContainer");

//            selectedcontainer.SetLableName(HoteamUI.Language.Lang("TreeListCommonQuery.Selected") + ":");
//            if (selectedvalue.Objects && selectedvalue.Objects.length) {
//                var object = JSON.parse(selectedvalue.Objects[0]);
//                selectedcontainer.SetContentVal({ text: object.ENAME, value: object });
//            }
//        }
//        InforCenter_Platform_ListCommonQuery_LoadviewFilterPage(page, pagePara);
//        var listView = page.GetControl("ViewFilterPageContainer");
//        HoteamUI.Page.SetContainerParas(listView.id, "ListCommonQuery", pagePara);
//    }
//};

//InforCenter_Platform_ListCommonQuery_LoadviewFilterPage = function (page, pagePara) {
//    var listViewFilterPageContainer = page.GetControl("ListViewFilterPageContainer");
//    if (HoteamUI.Common.IsNullOrEmpty(pagePara.QueryPageName) == false) {
//        var viewFilterPage = page.GetControl("ViewFilterPageContainer");
//        HoteamUI.UIManager.Show(viewFilterPage.id, pagePara.QueryPageName, pagePara)
//    }
//    else {
//        if (HoteamUI.Common.IsNullOrEmpty(listViewFilterPageContainer) == false) {
//            listViewFilterPageContainer.HiddenPanel(["item2", "item3"]);
//        }
//    }
//}
////查询按钮执行方法，/*废*/
//InforCenter_Platform_ListCommonQuery_OnQuery = function (pageEvent) {
//    //向待选列表添加数据
//    var listPage = HoteamUI.Page.InstanceIn(pageEvent.o.pid, "ListViewPageContainer", "ListViewCtrl");
//    InforCenter_Platform_SmartListCommonQuery_OnQueryData(pageEvent, listPage);
//}
///*废*/
//InforCenter_Platform_SmartListCommonQuery_OnQueryData = function (pageEvent, listPage) {
//    //向待选列表添加数据
//    var ctrl = listPage.GetControl("ListView");
//    var para = {};
//    para.FilterString = pageEvent.FilterString;
//    para.EntityFilterString = pageEvent.EntityFilterString;
//    para.RelatedFilterString = pageEvent.RelatedFilterString;
//    para.RelatedEntityFilterString = pageEvent.RelatedEntityFilterString;
//    para.CurrentPager = 1;

//    var callFunc = function (listData) {
//        if (listData != null) {
//            //当返回值为多值时，查询出的结果为一个时，自动添加到已选列表中
//            var listView = pageEvent.o.GetControl("ViewFilterPageContainer");
//            var para = HoteamUI.Page.GetContainerPara(listView.id);
//            var rows = ctrl.GetCurrentPageRows();
//            if (para.AllowMultiSelect && rows && rows.length == 1) {
//                var selectedGrid = HoteamUI.Control.Instance(para.SelectedListGuid);
//                var selectEID = rows[0].EID;

//                if (!InforCenter_Platform_ListCommonQuery_CheckAddSelect(selectEID, selectedGrid)) {
//                    selectedGrid.AddRows(rows);
//                }
//            }
//        }
//    }

//    InforCenter_Platform_ListViewCtrl_GetOnePageGridData(ctrl, para, callFunc);
//}

//InforCenter_Platform_ListCommonQuery_CheckAddSelect = function (selectEID, selectedGrid) {
//    var selecteddata = selectedGrid.GetCurrentPageRows();

//    for (var i in selecteddata) {
//        var row = selecteddata[i];
//        if (row.EID == selectEID)
//            return true;
//    }
//    return false;
//}




//InforCenter_Platform_ListCommonQuery_AlertToSelect = function (labelName) {
//    var para = { pageMode: "OK", context: "Platform", labelName: labelName };
//    HoteamUI.UIManager.Popup("Confirm", para);
//    return;
//}

//InforCenter_Platform_ListCommonQuery_OnRowDblClick = function (pageEvent) {
//    var containerid = pageEvent.o.GetControl("ViewFilterPageContainer").id;
//    var pagePara = HoteamUI.Page.GetContainerPara(containerid);
//    var selectObject = pageEvent.SelectCtrl;

//    if (selectObject.id == pagePara.SelectedListGuid) {
//        selectObject.RemoveSelectedRows();
//    }
//    else if (selectObject.id == pagePara.ListGuid) {
//        if (pagePara.AllowMultiSelect) {
//            var selectData = selectObject.GetSelectedRows()[0];
//            var selectedCtrl = HoteamUI.Control.Instance(pagePara.SelectedListGuid);
//            if (!InforCenter_Platform_ListCommonQuery_CheckAddSelect(selectData.EID, selectedCtrl)) {
//                selectedCtrl.AddRows([selectData]);
//            }
//        }
//        else {
//            var btnOK = HoteamUI.Control.Instance(pagePara.btnOKGuid);
//            btnOK.Click();
//        }
//    }
//}


//InforCenter_Platform_ListCommonQuery_SelectedOne = function (ctrlEvent) {
//    var pageContainer = ctrlEvent.o.OtherControl("ViewFilterPageContainer");
//    var para = HoteamUI.Page.GetContainerPara(pageContainer.id);
//    var grid = HoteamUI.Control.Instance(para.ListGuid);
//    var selectedgrid = HoteamUI.Control.Instance(para.SelectedListGuid);
//    var gridSelectData;
//    if (grid) {
//        gridSelectData = grid.GetSelectedRows();
//        if (gridSelectData.length > 0 && !InforCenter_Platform_ListCommonQuery_CheckAddSelect(gridSelectData[0].EID, selectedgrid)) {
//            selectedgrid.AddRows(gridSelectData);
//        }
//    }
//}

//InforCenter_Platform_ListCommonQuery_SelectedAll = function (ctrlEvent) {
//    var pageContainer = ctrlEvent.o.OtherControl("ViewFilterPageContainer");
//    var para = HoteamUI.Page.GetContainerPara(pageContainer.id);
//    var grid = HoteamUI.Control.Instance(para.ListGuid);
//    var selectedgrid = HoteamUI.Control.Instance(para.SelectedListGuid);
//    if (grid) {
//        var gridSelectData = grid.GetCurrentPageRows();
//        for (var i in gridSelectData) {
//            var selected = gridSelectData[i];
//            if (selected && !InforCenter_Platform_ListCommonQuery_CheckAddSelect(selected.EID, selectedgrid)) {
//                selectedgrid.AddRows([selected]);
//            }
//        }
//    }
//}

//InforCenter_Platform_ListCommonQuery_RemoveOne = function (ctrlEvent) {
//    var pageContainer = ctrlEvent.o.OtherControl("ViewFilterPageContainer");
//    var para = HoteamUI.Page.GetContainerPara(pageContainer.id);
//    var selectedgrid = HoteamUI.Control.Instance(para.SelectedListGuid);
//    selectedgrid.RemoveSelectedRows();
//}

//InforCenter_Platform_ListCommonQuery_RemoveAll = function (ctrlEvent) {
//    var pageContainer = ctrlEvent.o.OtherControl("ViewFilterPageContainer");
//    var para = HoteamUI.Page.GetContainerPara(pageContainer.id);
//    var selectedgrid = HoteamUI.Control.Instance(para.SelectedListGuid);
//    selectedgrid.ClearGridRows();
//}
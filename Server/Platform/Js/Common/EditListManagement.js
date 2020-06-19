//可编辑列表管理页面加载事件
InforCenter_Platform_EditListManagement_LoadPage = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();

    var listPage = HoteamUI.Page.InstanceIn(page.pid, "ListViewPageContainer", "EditListViewCtrl");
    var editlistGrid = listPage.GetControl("ListView");
    var oldPagePara = HoteamUI.Page.GetContainerPara(listPage.pid);
    if (oldPagePara != null && oldPagePara.AutoLoadData == false) {
        return;
    }
    pagePara = InforCenter_Platform_EditListManagement_LoadListMangementPage(pageEvent, page, listPage, editlistGrid, pagePara);

    //隐藏面包屑
    var breadNavCtrl = page.GetControl('BreadNavigation');
    //只有存在树 并且配置ShowBreadNavigation=true时才显示面包屑导航
    if (breadNavCtrl != '' && !HoteamUI.Common.IsNullOrEmpty(pagePara.TreeGuid) && pagePara.ShowBreadNavigation == "true") {
        var treeCtrl = HoteamUI.Control.Instance(pagePara.TreeGuid);
        if (treeCtrl.id != '') {
            var selectNode = treeCtrl.GetSelectedNode();
            InforCenter_Platform_ListManagement_BreadNavLoadData(breadNavCtrl, selectNode);
        }
    } else {
        var breadNavContainer = page.GetControl('ListManagement_Container');
        breadNavContainer.HiddenPanel(["item0", "item5"]);
    }

    HoteamUI.Common.ExeFunction("InforCenter_EditListManagement_" + pagePara.ItemName + "_AfterLoadPage", pagePara);
};

InforCenter_Platform_EditListManagement_OnGetEditGridData = function (pageEvent) {
    var gridData = {};
    return gridData;
}

InforCenter_Platform_EditListManagement_LoadListMangementPage = function (pageEvent, page, listPage, editlistGrid, pagePara) {
    var itemName = null;
    if (HoteamUI.Common.IsNullOrEmpty(pageEvent.ItemName) == false) {
        itemName = pageEvent.ItemName;
    }
    else {
        itemName = pagePara.ItemName;
    }

    var data = null;
    $.each(EditListManagementScript, function (index, val) {
        if (val.Name == itemName)
            data = JSON.parse(JSON.stringify(val));
    });
    if (data == null) {

        data = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GetEditListManagement", { para: { Name: itemName } });
        if (data != null)
            EditListManagementScript.push(data);
    }
    if (data.RowHeightAuto == true) {
        editlistGrid.ResetGrid({ setting: { bheight: "auto" } });
    }
    var tempData = JSON.stringify(data);
    var dataClone = JSON.parse(tempData);
    if (dataClone != null) {
        pagePara = $.extend(pagePara, data);
        if (pagePara.InitParaJSMethod) {
            pagePara = eval(pagePara.InitParaJSMethod);
        }
        var menuPage = HoteamUI.Page.InstanceIn(page.pid, "MenuPageContainer", "MenuCtrl");
        var menuGrid = menuPage.GetControl("Menu");
        pagePara.MenuGuid = menuGrid.id;
        pagePara.ListGuid = editlistGrid.id;
        //加载菜单,如果不配置隐藏菜单高度
        if (pagePara.MenuName) {
            InforCenter_Platform_MenuCtrl_LoadMenus(menuPage, pagePara, pagePara.MenuName);
            page.GetControl("ListManagement_Container").ShowPanel(["item1"]);
        } else {
            page.GetControl("ListManagement_Container").HiddenPanel(["item1"]);
        }
        InforCenter_Platform_EditListViewCtrl_LoadListView(listPage, pagePara);
    }

    return pagePara;
}

InforCenter_Platform_EditListManagement_OnGridAfterEdit = function (pageEvent) {

    var editlistviewpage = HoteamUI.Page.InstanceIn(pageEvent.o.pid, "ListViewPageContainer", "EditListViewCtrl");
    if (editlistviewpage.pid) {
        var container = editlistviewpage.GetControl("ListView_Container");

        var ctrlEvent = pageEvent.EditGridCtrlEvent;
        var para = HoteamUI.Page.GetContainerPara(container.id);
        var editCol = para.WebListView.EditWebListColumnTypeList;

        for (var i = 0; i < editCol.length; i++) {
            var col = editCol[i];
            if (col.ViewColumnName == ctrlEvent.colName) {
                if (col.CheckJS) {
                    ctrlEvent.TreeGuid = para.TreeGuid;
                    var result = HoteamUI.Common.ExeFunction(col.CheckJS, ctrlEvent);
                    return result;
                }
            }

        }
        //验证操作列checkjs
        if (para.WebListView.EditOperatorColumnTypeList && para.WebListView.EditOperatorColumnTypeList.length > 0) {
            var operatorCol = para.WebListView.EditOperatorColumnTypeList
            for (var i = 0; i < operatorCol.length; i++) {
                var col = operatorCol[i];
                if (col.OperatorColName == ctrlEvent.colName) {
                    if (col.CheckJS) {
                        ctrlEvent.TreeGuid = para.TreeGuid;
                        var result = HoteamUI.Common.ExeFunction(col.CheckJS, ctrlEvent);
                        return result;
                    }
                }

            }
        }
        if (para.WebListView.CellValueChange && ctrlEvent.newData) {
            if (ctrlEvent.newData[ctrlEvent.colName] != ctrlEvent.oldData[ctrlEvent.colName]) {
                var result = HoteamUI.Common.ExeFunction(para.WebListView.CellValueChange, ctrlEvent);
                return result;
            }
        }

    }
}

InforCenter_Platform_EditListManagement_OnGridBeforeEdit = function (pageEvent) {
    var editlistviewpage = HoteamUI.Page.InstanceIn(pageEvent.o.pid, "ListViewPageContainer", "EditListViewCtrl");
    if (editlistviewpage.pid) {
        var container = editlistviewpage.GetControl("ListView_Container");
        var ctrlEvent = pageEvent.EditGridCtrlEvent;
        var para = HoteamUI.Page.GetContainerPara(container.id);
        var result = HoteamUI.Common.ExeFunction(para.WebListView.CellBeforeEdit, ctrlEvent);
        return result;
    }
}

InforCenter_Platform_EditListManagement_OnRowDblClick = function (pageEvent) {
    var ctrl = pageEvent.SelectCtrl;
    var pageContainer = ctrl.OtherControl("ListView_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);

    $.extend(pagePara, pageEvent);
    //自定义行双击事件
    if (pagePara.WebListView.OnRowDoubleClickJSMethod) {
        HoteamUI.Common.ExeFunction(pagePara.WebListView.OnRowDoubleClickJSMethod, pagePara)
    }
}
InforCenter_Platform_EditListManagement_OnRowClick = function (pageEvent) {
    var ctrl = pageEvent.SelectCtrl;
    var pageContainer = ctrl.OtherControl("ListView_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);

    $.extend(pagePara, pageEvent);
    //自定义行双击事件
    if (pagePara.WebListView.OnRowClick) {
        HoteamUI.Common.ExeFunction(pagePara.WebListView.OnRowClick, pagePara)
    }
}
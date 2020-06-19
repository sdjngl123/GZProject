//列表管理页面加载事件
InforCenter_Platform_FilterListManagement_LoadPage = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    //隐藏面包屑
    var breadNavCtrl = page.GetControl('BreadNavigation');
    if (breadNavCtrl != '' && !HoteamUI.Common.IsNullOrEmpty(pagePara.TreeGuid)) {
        var treeCtrl = HoteamUI.Control.Instance(pagePara.TreeGuid);
        if (treeCtrl.id != '') {
            var selectNode = treeCtrl.GetSelectedNode();
            InforCenter_Platform_ListManagement_BreadNavLoadData(breadNavCtrl, selectNode);
        }
    } else {
        var breadNavContainer = page.GetControl('ListManagement_Container');
        breadNavContainer.HiddenPanel(["item1"]);
    }
    var listPage = HoteamUI.Page.InstanceIn(page.pid, "ListViewPageContainer", "FilterListViewCtrl");
    var listGrid = listPage.GetControl("ListView");

    var oldPagePara = HoteamUI.Page.GetContainerPara(listPage.pid);
    if (oldPagePara != null && oldPagePara.AutoLoadData == false) {
        return;
    }

    var itemName = null;
    if (HoteamUI.Common.IsNullOrEmpty(pageEvent.ItemName) == false) {
        itemName = pageEvent.ItemName;
    }
    else {
        itemName = pagePara.ItemName;
    }

    var data = null;
    $.each(FilterListManagementListScript, function (index, val) {
        if (val.Name == itemName)
            data = JSON.parse(JSON.stringify(val));

    });
    if (data == null) {

        data = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GetFilterListManagement", { para: { Name: itemName } });
        if (data != null)
            FilterListManagementListScript.push(data);
    }

    if (data.ShowFilterRow == false) {
        listGrid.ResetGrid({ filtering: false });
    }
    //判断是否重新获取列标题
    var flag = InforCenter_Platform_FilterListManagement_IsLoadListTitle(listPage, pagePara, oldPagePara);
    if (flag == false && pagePara.Refresh && pagePara.Refresh == true && pagePara.RefreshTitle != "true") {
        pagePara.CurrentPager = 1;
        //2013-06-04处理树节点点击两次，ParaList被覆盖问题
        var pageContainer = listGrid.OtherControl("ListView_Container");
        var pageContainerPara = HoteamUI.Page.GetContainerPara(pageContainer.id);
        if (HoteamUI.Common.IsNullOrEmpty(pageContainerPara) == false && HoteamUI.Common.IsNullOrEmpty(pageContainerPara.ParaList) == false) {
            pagePara.ParaList = pageContainerPara.ParaList;
        }
        InforCenter_Platform_FilterListViewCtrl_GetOnePageGridData(listGrid, pagePara);
    }
    else if (flag == true || pagePara.RefreshTitle == "true") {
        pagePara = InforCenter_Platform_FilterListManagement_LoadListMangementPage(pageEvent, data, page, listPage, listGrid, pagePara);
    }

    InforCenter_Platform_FilterListManagement_WriteObjectType(listPage, pagePara);
};

InforCenter_Platform_FilterListManagement_LoadListMangementPage = function (pageEvent, data, page, listPage, listGrid, pagePara) {

    var tempData = JSON.stringify(data);
    var dataClone = JSON.parse(tempData);
    if (dataClone != null) {
        pagePara = $.extend(data, pagePara);
        if (pagePara.InitParaJSMethod) {
            pagePara = eval(pagePara.InitParaJSMethod);
        }
        var menuPage = HoteamUI.Page.InstanceIn(page.pid, "MenuPageContainer", "MenuCtrl");
        var menuGrid = menuPage.GetControl("Menu");
        pagePara.MenuGuid = menuGrid.id;
        pagePara.ListGuid = listGrid.id;
        var isSucceed = InforCenter_Platform_FilterListManagement_LoadMenus(page, pagePara, menuPage);
        InforCenter_Platform_FilterListManagement_LoadFilterPage(page, pagePara);
        if (isSucceed == true) {
            var titleData = InforCenter_Platform_FilterListViewCtrl_LoadListView(listPage, pagePara);
        }
    }

    return pagePara;
}

InforCenter_Platform_FilterListManagement_LoadMenus = function (page, pagePara, menuPage) {
    var content_Container = page.GetControl("ListManagement_Container");
    var menuflag = false;
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.MenuName) == false) {//如果有菜单，则将item1展示
        var menuData = InforCenter_Platform_MenuCtrl_LoadMenus(menuPage, pagePara, pagePara.MenuName, null, pagePara.ObjType, pagePara.NodeType);
        if (menuData && menuData.Menus && menuData.Menus.length > 0) {
            menuflag = true;
        }
    }

    if (HoteamUI.Common.IsNullOrEmpty(content_Container) == false) {
        if (menuflag) {
            content_Container.ShowPanel(["item0"]);
        }
        else {
            //如果一个菜单项也没有，也隐藏，不然会有空白行
            //如果没菜单，将item1隐藏
            content_Container.HiddenPanel(["item0"]);
        }
    }

    return true;
}

InforCenter_Platform_FilterListManagement_LoadFilterPage = function (page, pagePara) {
    var hidPanelArr = [];
    var listManagement_Container = page.GetControl("Content_Container");
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.QueryPageName) == false) {//如果有查询功能
        var viewFilterPage = page.GetControl("ViewFilterPageContainer");
        if (pagePara.HideViewFilterPage && pagePara.HideViewFilterPage == true) {//默认隐藏
            listManagement_Container.HiddenItem("item2", "item3");
        }
        else {
            listManagement_Container.ShowPage("item2", viewFilterPage.id, pagePara.QueryPageName, pagePara);
        }
    }
    else {//如果没有查询功能,则隐藏item2和item3
        if (HoteamUI.Common.IsNullOrEmpty(listManagement_Container) == false) {
            listManagement_Container.HiddenPanel(["item2", "item3"]);
        }
    }
    return true;
}

InforCenter_Platform_FilterListManagement_IsLoadListTitle = function (listPage, pagePara, oldPagePara) {
    var flag = false;
    if (oldPagePara) {
        if (HoteamUI.Common.IsNullOrEmpty(oldPagePara.NodeType) == false
    && HoteamUI.Common.IsNullOrEmpty(pagePara.NodeType) == false) {
            if (oldPagePara.NodeType != pagePara.NodeType) {
                flag = true;
            }
        }
        else if (HoteamUI.Common.IsNullOrEmpty(oldPagePara.ObjType) == false
    && HoteamUI.Common.IsNullOrEmpty(pagePara.ObjType) == false) {
            if (flag == false && oldPagePara.ObjType != pagePara.ObjType) {
                flag = true;
            }
        }
        else
            flag = true;
    }
    else {
        flag = true;
    }
    return flag;
}

InforCenter_Platform_FilterListManagement_WriteObjectType = function (listPage, pagePara) {
    var tmp = {};
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.ObjType) == false) {
        tmp.ObjType = pagePara.ObjType;
    }
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.NodeType) == false) {
        tmp.NodeType = pagePara.NodeType;
    }
    if (pagePara.gridTitle && pagePara.gridTitle.AutoLoadData != undefined) {
        tmp.AutoLoadData = pagePara.gridTitle.AutoLoadData;
    }
    HoteamUI.Page.SetContainerParas(listPage.pid, "FilterListViewCtrl", tmp);
}

InforCenter_Platform_FilterListManagement_OnQuery = function (pageEvent) {
    var listPage = HoteamUI.Page.InstanceIn(pageEvent.o.pid, "ListViewPageContainer", "ListViewCtrl");
    var ctrl = listPage.GetControl("ListView");
    var para = {};
    para.FilterString = pageEvent.FilterString;
    para.EntityFilterString = pageEvent.EntityFilterString;
    para.CurrentPager = 1;
    para.AutoLoadData = true;
    InforCenter_Platform_ListViewCtrl_GetOnePageGridData(ctrl, para);
};


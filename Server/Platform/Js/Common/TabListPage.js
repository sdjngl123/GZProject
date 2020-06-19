//列表页面加载事件
InforCenter_Platform_TabListPage_LoadPage = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    var listPage = HoteamUI.Page.InstanceIn(page.pid, "ListViewPageContainer", "ListViewCtrl");
    var flag = InforCenter_Platform_TabListPage_IsLoadListTitle(listPage, pagePara);
    var listCtrl = listPage.GetControl("ListView");
    if (flag == true) {
        InforCenter_Platform_TabListPage_LoadTabListPage(pageEvent, page, listPage, listCtrl, pagePara);
    }
    else {
        InforCenter_Platform_ListViewCtrl_GetOnePageGridData(listCtrl, { CurrentPager: 1 });
    }
    InforCenter_Platform_TabListPage_WriteObjectType(listPage, pagePara);
};
InforCenter_Platform_TabListPage_IsLoadListTitle = function (listPage, pagePara) {
    var flag = false;
    var oldPagePara = HoteamUI.Page.GetContainerPara(listPage.pid);
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
        } else
            flag = true;
    }
    else {
        flag = true;
    }
    return flag;
}
InforCenter_Platform_TabListPage_WriteObjectType = function (listPage, pagePara) {
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.ObjType) == false) {
        var tmp = { ObjType: pagePara.ObjType };
        if (HoteamUI.Common.IsNullOrEmpty(pagePara.NodeType) == false) {
            tmp.NodeType = pagePara.NodeType;
        }
        HoteamUI.Page.SetContainerParas(listPage.pid, "ListViewCtrl", tmp);
    }
}

InforCenter_Platform_TabListPage_LoadTabListPage = function (pageEvent, page, listPage, listCtrl, pagePara) {
    var menuPage = HoteamUI.Page.InstanceIn(page.pid, "MenuPageContainer", "MenuCtrl");
    var menuCtrl = menuPage.GetControl("Menu");
    pagePara.MenuGuid = menuCtrl.id;
    pagePara.ListGuid = listCtrl.id;

    var listManagementContainer = page.GetControl("TabListPage_Container");
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.MenuName) == false) {
        InforCenter_Platform_MenuCtrl_LoadMenus(menuPage, pagePara, pagePara.MenuName);

        pagePara.RightMenuName = pagePara.MenuName;
        pagePara.AutoClearOldRightMenu = true;
        listManagementContainer.ShowPanel(["item1"]);
        listManagementContainer.HiddenPanel(["item3"]);
    }
    else {
        if (HoteamUI.Common.IsNullOrEmpty(listManagementContainer) == false) {
            listManagementContainer.HiddenPanel(["item1"]);
            listManagementContainer.ShowPanel(["item3"]);
        }
    }

    var listTitleData = InforCenter_Platform_ListViewCtrl_LoadListView(listPage, pagePara);
    if (listTitleData == null) {
        return false;
    }
    return true;
}
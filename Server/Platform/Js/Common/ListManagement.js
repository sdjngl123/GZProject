//列表管理页面加载事件
InforCenter_Platform_ListManagement_LoadPage = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    var listPage = HoteamUI.Page.InstanceIn(page.pid, "ListViewPageContainer", "ListViewCtrl");
    var listGrid = listPage.GetControl("ListView");

    var oldPagePara = HoteamUI.Page.GetContainerPara(listPage.pid);
    if (oldPagePara != null && oldPagePara.AutoLoadData == false) {
        return;
    }
    //先将侧边签隐藏
    var listManagerC = pageEvent.o.GetControl("ListManagement_Container");
    if (listManagerC.GetPanelStatus("item4") == "show") {
        listManagerC.HiddenPanel(["item4", "item5"]);
    }

    var pageContainer = pageEvent.o.GetControl('Page_Container');
    if (pageContainer.GetPanelStatus("item2") == "show") {
        pageContainer.HiddenPanel(["item2", "item3"]);
    }

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
        var breadNavContainer = page.GetControl('Content_Container');
        breadNavContainer.HiddenPanel(["item0", "item4"]);
    }
    var itemName = null;
    if (HoteamUI.Common.IsNullOrEmpty(pageEvent.ItemName) == false) {
        itemName = pageEvent.ItemName;
    }
    else {
        itemName = pagePara.ItemName;
    }

    var data = null;
    $.each(ListManagementListScript, function (index, val) {
        if (val.Name == itemName)
            data = JSON.parse(JSON.stringify(val));

    });
    if (data == null) {

        data = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GetListManagement", { para: { Name: itemName } });
        if (data != null)
            ListManagementListScript.push(data);
    }

    var page_Container = page.GetControl('Page_Container');
    if (data.IsBottomTab == false) {
        var width = data.SideTabWidth;
        if (width) {
            HoteamUI.Page.Instance(pageEvent.o.GetControl("SideTabsPage").id).GetControl("Tabs").SetWidth(data.SideTabWidth);
        }
        page_Container.HiddenPanel(["item2", "item3"]);
    }

    //判断是否重新获取列标题
    var flag = InforCenter_Platform_ListManagement_IsLoadListTitle(listPage, pagePara, oldPagePara);
    if (flag == false && pagePara.Refresh && pagePara.Refresh == true && pagePara.RefreshTitle != "true") {
        pagePara.CurrentPager = 1;
        //2013-06-04处理树节点点击两次，ParaList被覆盖问题
        var pageContainer = listGrid.OtherControl("ListView_Container");
        var pageContainerPara = HoteamUI.Page.GetContainerPara(pageContainer.id);
        if (HoteamUI.Common.IsNullOrEmpty(pageContainerPara) == false && HoteamUI.Common.IsNullOrEmpty(pageContainerPara.ParaList) == false) {
            pagePara.ParaList = pageContainerPara.ParaList;
        }
        InforCenter_Platform_ListViewCtrl_GetOnePageGridData(listGrid, pagePara);
    }
    else if (flag == true || pagePara.RefreshTitle == "true") {
        pagePara = InforCenter_Platform_ListManagement_LoadListMangementPage(pageEvent, data, page, listPage, listGrid, pagePara);
    }

    InforCenter_Platform_ListManagement_WriteObjectType(listPage, pagePara);
};

InforCenter_Platform_ListManagement_LoadListMangementPage = function (pageEvent, data, page, listPage, listGrid, pagePara) {

    var tempData = JSON.stringify(data);
    var dataClone = JSON.parse(tempData);
    if (dataClone != null) {
        pagePara = $.extend(pagePara, data);
        if (pagePara.InitParaJSMethod) {
            pagePara = eval(pagePara.InitParaJSMethod);
        }
        var menuPage = HoteamUI.Page.InstanceIn(page.pid, "MenuPageContainer", "MenuCtrl");
        var menuGrid = menuPage.GetControl("Menu");
        var tabsPage = HoteamUI.Page.InstanceIn(page.pid, "SideTabsPage", "SideTabsCtrl");
        var tabsCtrl = tabsPage.GetControl("Tabs");
        var bottomTabsPage = HoteamUI.Page.InstanceIn(page.pid, "TabsPage", "TabsCtrl");
        var bottomtabsCtrl = bottomTabsPage.GetControl("Tabs");
        pagePara.BottomTabsGuid = bottomtabsCtrl.id;
        pagePara.SideTabsGuid = tabsCtrl.id;
        pagePara.MenuGuid = menuGrid.id;
        pagePara.ListGuid = listGrid.id;
        //支持根据配置不显示菜单
        if (!pagePara.HiddenMenu || (pagePara.HiddenMenu != true && pagePara.HiddenMenu != 'True')) {
            isSucceed = InforCenter_Platform_ListManagement_LoadMenus(page, pagePara, menuPage);
        } else {
            var content_Container = page.GetControl("Content_Container");
            content_Container.HiddenPanel(["item1"]);
            content_Container.ShowPanel(["item3"]);
            isSucceed = true;
        }
        InforCenter_Platform_ListManagement_LoadFilterPage(page, pagePara, tabsPage);
        if (isSucceed == true) {
            var titleData = InforCenter_Platform_ListViewCtrl_LoadListView(listPage, pagePara);
            if (titleData) {
                InforCenter_Platform_ListManagement_LoadSearchFields(page, pagePara, titleData);
            }
        }
    }

    return pagePara;
}

InforCenter_Platform_ListManagement_LoadMenus = function (page, pagePara, menuPage) {
    var content_Container = page.GetControl("Content_Container");
    var menuflag = false;
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.MenuName) == false) {//如果有菜单，则将item1展示
        var menuData = InforCenter_Platform_MenuCtrl_LoadMenus(menuPage, pagePara, pagePara.MenuName, null, pagePara.ObjType, pagePara.NodeType);
        if (menuData && menuData.Menus && menuData.Menus.length > 0) {
            menuflag = true;
        }
    }

    if (HoteamUI.Common.IsNullOrEmpty(content_Container) == false) {
        if (menuflag) {
            content_Container.ShowPanel(["item1"]);
        }
        else {
            //如果一个菜单项也没有，也隐藏，不然会有空白行
            //如果没菜单且没有查询框要求，将item1隐藏
            if (HoteamUI.Common.IsNullOrEmpty(pagePara.SearchFields) == true) {
                content_Container.HiddenPanel(["item1"]);
                //根据是否有menu来调整样式
                content_Container.ShowPanel(["item3"]);
            }
        }
    }

    return true;
}

InforCenter_Platform_ListManagement_LoadSearchFields = function (page, pagePara, titleData) {
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.SearchFields) == true) {//如果有查询功能
        var top_Container = page.GetControl("Top_Container");
        top_Container.HiddenPanel(["item2"]);
    }
    else {
        var searchTitle = '';
        var searchFields = pagePara.SearchFields.split(';');
        for (var i = 0; i < searchFields.length; i++) {
            var field = searchFields[i];
            if (field != "") {
                for (var j = 0; j < titleData.TitleData.length; j++) {
                    var col = titleData.TitleData[j];
                    if (col.Name == field || col.Name == field.replace(".", "_")) {
                        if (HoteamUI.Common.IsNullOrEmpty(col.Text) == false) {
                            searchTitle += ",";
                            searchTitle += col.Text;
                            break;
                        }
                    }
                }
            }
        }
        if (searchTitle != '') {
            var searchCrtl = page.GetControl("SearchContainer");
            searchCrtl.SetBackgroundWord(searchTitle.substring(1));
        }
    }

}
InforCenter_Platform_ListManagement_LoadFilterPage = function (page, pagePara, tabsPage) {
    var hidPanelArr = [];
    var page_Container = page.GetControl("Page_Container");
    var listManagement_Container = page.GetControl("ListManagement_Container");
    if (pagePara.ViewFilterPagePosition == "top") {
        if (HoteamUI.Common.IsNullOrEmpty(pagePara.QueryPageName) == false) {//如果有查询功能
            var viewFilterPage = page.GetControl("ViewFilterTopPageContainer");
            if (pagePara.HideViewFilterPage && pagePara.HideViewFilterPage == true) {//默认隐藏
                listManagement_Container.HiddenItem("item01");
            }

            var pageHeight = 300;
            var pageConfig = HoteamUI.UIManager.GetPageConfig(pagePara.QueryPageName);
            if (pageConfig) {
                $.each(pageConfig.Settings, function (index, val) {
                    if (val.Key == "height") {
                        pageHeight = parseInt(val.Value);
                        return false;
                    }
                });
            }

            page_Container.ResetPanelSize({ item00: pageHeight });
            page_Container.ShowPage("item01", viewFilterPage.id, pagePara.QueryPageName, pagePara);
        }
        else {//如果没有查询功能
            if (HoteamUI.Common.IsNullOrEmpty(page_Container.id) == false) {
                page_Container.HiddenPanel(["item00", "item01"]);
                hidPanelArr.push("item00", "item01");
            }
            if (HoteamUI.Common.IsNullOrEmpty(pagePara.DefaultPageLinksName) == false) {//如果有侧标签功能
                pagePara.IsTab = true;
                InforCenter_Platform_TabsCtrl_LoadTabs(tabsPage, pagePara, pagePara.DefaultPageLinksName);
            }
        }

        page_Container.HiddenPanel(hidPanelArr);

        hidPanelArr = [];
        hidPanelArr.push("item2", "item3");
        listManagement_Container.HiddenPanel(hidPanelArr);
    }
    else {
        //默认为左右布局的查询页面

        if (HoteamUI.Common.IsNullOrEmpty(pagePara.QueryPageName) == false) {//如果有查询功能
            var viewFilterPage = page.GetControl("ViewFilterPageContainer");
            if (pagePara.HideViewFilterPage && pagePara.HideViewFilterPage == true) {//默认隐藏
                listManagement_Container.HiddenItem("item2");
            }
            listManagement_Container.ShowPage("item2", viewFilterPage.id, pagePara.QueryPageName, pagePara);
            //listManagement_Container.HiddenPanel(["item5"]);
            //hidPanelArr.push("item5");
        }
        else {//如果没有查询功能,则隐藏item2和item3
            if (HoteamUI.Common.IsNullOrEmpty(listManagement_Container) == false) {
                listManagement_Container.HiddenPanel(["item2", "item3"]);
                hidPanelArr.push("item2", "item3");
            }
            if (HoteamUI.Common.IsNullOrEmpty(pagePara.DefaultPageLinksName) == false) {//如果有侧标签功能
                pagePara.IsTab = true;
                InforCenter_Platform_TabsCtrl_LoadTabs(tabsPage, pagePara, pagePara.DefaultPageLinksName);
            }
        }

        listManagement_Container.HiddenPanel(hidPanelArr);

        hidPanelArr = [];
        hidPanelArr.push("item00", "item01");
        page_Container.HiddenPanel(hidPanelArr);
    }
    return true;
}

InforCenter_Platform_ListManagement_IsLoadListTitle = function (listPage, pagePara, oldPagePara) {
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

InforCenter_Platform_ListManagement_WriteObjectType = function (listPage, pagePara) {
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
    HoteamUI.Page.SetContainerParas(listPage.pid, "ListViewCtrl", tmp);
}

InforCenter_Platform_ListManagement_OnQuery = function (pageEvent) {
    var listPage = HoteamUI.Page.InstanceIn(pageEvent.o.pid, "ListViewPageContainer", "ListViewCtrl");
    var ctrl = listPage.GetControl("ListView");
    var para = {};
    for (var i in pageEvent) {
        if (!pageEvent.hasOwnProperty(i)) {
            continue;
        }
        para[i] = pageEvent[i];
    }
    para.CurrentPager = 1;
    para.AutoLoadData = true;
    InforCenter_Platform_ListViewCtrl_GetOnePageGridData(ctrl, para);
}

InforCenter_Platform_ListManagement_OnSearch = function (ctrlEvent) {
    var pagePID = ctrlEvent.o.ContainerID();
    var page = HoteamUI.Page.Instance(pagePID);
    var listPage = HoteamUI.Page.InstanceIn(pagePID, "ListViewPageContainer", "ListViewCtrl");
    var pageContainer = listPage.GetControl("ListView_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.SearchFields) == false) {
        var tempAndValue = '';
        var queryData = [];
        var searchInfoList = [];
        if (HoteamUI.Common.IsNullOrEmpty(ctrlEvent.text) == false) {
            var searchFields = pagePara.SearchFields.split(';');
            for (var i = 0; i < searchFields.length; i++) {
                var field = searchFields[i];
                if (field != "") {
                    var searchInfo = {};
                    searchInfo.Name = field;
                    searchInfo.Operator = "LIKE";
                    searchInfo.SearchValue = ctrlEvent.text;
                    searchInfoList.push(searchInfo);

                    //组织QueryData
                    queryData.push({ ANDOR: 'LIKE', QUERYCOLUMN: field, QUERYOPERATOR: 'LIKE', VALUE: ctrlEvent.text, UNQUOTED: false });

                    if (i > 0)
                        tempAndValue += " OR ";
                    tempAndValue += field + " LIKE N'%" + HoteamUI.Common.ReplaceSQLFilter(ctrlEvent.text) + "%' ";
                }
            }
        }
        var ctrl = listPage.GetControl("ListView");
        var para = {};
        para.FilterString = tempAndValue;
        //因为自定义的数据源也是通过FilterString添加的参数，此参数用于非自定义时替换FilterString，为保持兼容
        para.TempForReplaceFilterString = tempAndValue;
        para.EntityFilterString = "";
        para.CurrentPager = 1;
        para.QueryData = JSON.stringify(queryData);
        para.AutoLoadData = true;
        if (searchInfoList.length > 0) {
            para.SearchInfoList = JSON.stringify(searchInfoList);
        } else {
            para.SearchInfoList = [];
        }

        InforCenter_Platform_ListViewCtrl_GetOnePageGridData(ctrl, para);
    }
};

InforCenter_Platform_ListManagement_OnRowClick = function (pageEvent) {
    var ctrl = pageEvent.SelectCtrl;
    var pageContainer = ctrl.OtherControl("ListView_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);

    //自定义行点击事件
    if (pagePara.WebListView.OnRowClick) {
        HoteamUI.Common.ExeFunction(pagePara.WebListView.OnRowClick, pageEvent)
    }

    //如果是包含tab页的，从此方法获取 点击的 对象Id
    if (pagePara.IsTab || pagePara.IsBottomTab == true && HoteamUI.Common.IsNullOrEmpty(pagePara.WebListView.DetailsPageUseObjectInspector) == false
        && pagePara.WebListView.DetailsPageUseObjectInspector == true) {
        pagePara.ObjectID = pageEvent.SelectRowData.EID;
        var actionName = "BROWSE";
        //权限判断
        if (HoteamUI.Common.IsNullOrEmpty(pagePara.WebListView.DetailsAction) == false) {
            actionName = pagePara.WebListView.DetailsAction;
        }
        var check = HoteamUI.DataService.Call('InforCenter.Common.WebActionService.CheckActionPermission', { para: { ActionType: "AUTO", ActionName: actionName, SelectID: pagePara.ObjectID } });
        if (check == null) {
            pageEvent.o.GetControl("Page_Container").HiddenPanel(["item2", "item3"]);
            pageEvent.o.GetControl("ListManagement_Container").HiddenPanel(["item4", "item5"]);
            return;
        }

        //获取对象类型

        if (pagePara.IsBottomTab == true && HoteamUI.Common.IsNullOrEmpty(pagePara.WebListView.DetailsPageUseObjectInspector) == false
            && pagePara.WebListView.DetailsPageUseObjectInspector == true) {
            var customObjectType = "";
            if (HoteamUI.Common.IsNullOrEmpty(pagePara.WebListView.CustomObjectTypeField) == false) {
                customObjectType = pageEvent.SelectRowData[pagePara.WebListView.CustomObjectTypeField];
            }
            var curObjectType = HoteamUI.Common.IsNullOrEmpty(customObjectType) ? InforCenter_Platform_GTypeFromID(pagePara.ObjectID) : customObjectType;

            var paras = {};
            paras.Data = pageEvent.SelectRowData;
            paras.ObjectID = paras.TabId = paras.SelectID = paras.Data.EID;
            paras.ObjectType = curObjectType;
            var objectInspectorConfig = null;
            $.each(ObjectInspectorsScript, function (index, val) {
                if (val.ObjectType == curObjectType)
                    objectInspectorConfig = JSON.parse(JSON.stringify(val));
            });
            if (objectInspectorConfig != null) {
                if (paras.Data.EUID)
                    paras.SelectEUID = paras.Data.EUID;
                paras.ObjectInspectorConfig = objectInspectorConfig;
                var ctrl = pageEvent.o.GetControl("ObjectInspectorPage");
                pageEvent.o.GetControl("Page_Container").ShowPanel(["item2", "item3"]);
                InforCenter_Platform_ObjectInspector_AddPage(ctrl, paras);
            }
        }
        else if (pagePara.IsTab) {
            var curObjectType = InforCenter_Platform_GTypeFromID(pagePara.ObjectID);
            var data = null;
            var objectTypes = pagePara.ListObjTypes;
            if (objectTypes != undefined) {
                //根据PageLinksName获取一组PageLink
                for (var i = 0; i < objectTypes.length; i++) {
                    var tmpType = objectTypes[i];
                    if (tmpType.Name == curObjectType) {
                        data = InforCenter_Platform_GetTreeManagePageLinksByName(objectTypes[i].PageLinksName);
                        break;
                    }
                }
            }
            if (data != null && data.PageLinks.length > 0) {
                var tabid = null;
                pageEvent.o.GetControl("ListManagement_Container").ShowPanel(["item4", "item5"]);
                tabid = pagePara.SideTabsGuid;
                var tabCtrl = HoteamUI.Control.Instance(tabid);
                //Start sjf 2019-9-3 解决功能授权与这里的URL路径不匹配问题
                pagePara.Url.push(curObjectType);
                //End
                InforCenter_Platform_TabsCtrl_UpdateTabs(tabCtrl, data, pagePara);
            }
        }
    }
};

InforCenter_Platform_ListManagement_OnRowDblClick = function (pageEvent) {
    var ctrl = pageEvent.SelectCtrl;
    var pageContainer = ctrl.OtherControl("ListView_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
    pagePara = $.extend(pagePara, pageEvent);
    //自定义行双击事件
    if (pagePara.WebListView.OnRowDoubleClickJSMethod) {
        HoteamUI.Common.ExeFunction(pagePara.WebListView.OnRowDoubleClickJSMethod, pagePara)
    }
}

InforCenter_Platform_SideTabsCtrl_OnShow = function (ctrlEvent) {
    var parentPage = HoteamUI.Page.Instance(HoteamUI.Page.ParentPage(ctrlEvent.o.ContainerID()));
    var control = parentPage.GetControl("ListManagement_Container");
    control.ResetPanelSize({
        item4: 3, item5: ctrlEvent.width
    });
}

InforCenter_Platform_SideTabsCtrl_OnHide = function (ctrlEvent) {
    var parentPage = HoteamUI.Page.Instance(HoteamUI.Page.ParentPage(ctrlEvent.o.ContainerID()));
    var control = parentPage.GetControl("ListManagement_Container");
    control.ResetPanelSize({
        item4: 0, item5: ctrlEvent.width
    });
}

InforCenter_Platform_SideTabsCtrl_OnQuery = function (pageEvent) {
    HoteamUI.Page.FireParentPageEvent(pageEvent.o.pid, 'OnQuery', pageEvent);
};

InforCenter_Platform_ListManagement_BreadNavOnClick = function (ctrlEvent) {
    var pageID = ctrlEvent.o.ContainerID();
    var pagePara = HoteamUI.Page.GetContainerPara(pageID);
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.TreeGuid) == false) {
        var treeCtrl = HoteamUI.Control.Instance(pagePara.TreeGuid);
        var nodes = treeCtrl.GetNodesByParam("tId", ctrlEvent.value);
        if (nodes.length > 0) {
            treeCtrl.SelectNode(nodes[0]);
            var currentId = treeCtrl.ContainerID();
            var treePageName = '';
            while (true) {
                var tempPage = HoteamUI.Page.Instance(currentId);
                if (!HoteamUI.Common.IsNullOrEmpty(tempPage)) {
                    treePageName = tempPage.PageName();
                }
                if (treePageName != 'TreeViewCtrl') {
                    currentId = HoteamUI.Control.Instance(currentId).ContainerID();
                } else {
                    break;
                }
            }
            HoteamUI.Page.FireParentPageEvent(currentId, 'OnNodeChange', {
                ctrl: treeCtrl
            });
        }
    }
}

InforCenter_Platform_ListManagement_BreadNavLoadData = function (breadNavCtrl, node) {
    //如果存在面包屑导航
    if (breadNavCtrl.id) {
        var arr = new Array();
        //将节点数据放入数组首位
        arr.unshift({
            value: node.Value1, text: node.name
        });
        while (true) {
            var parentNode = node.getParentNode();
            if (parentNode) {
                arr.unshift({
                    value: parentNode.tId, text: parentNode.name
                });
                node = parentNode;
            } else {
                break;
            }
        }
        breadNavCtrl.LoadData(arr);
    }
};

InforCenter_Platform_ListManagement_OnLoadSuccess = function (pageEvent) {
    var page = pageEvent.o;
    HoteamUI.Page.FireParentPageEvent(page.pid, "OnLoadSuccess", pageEvent);
    var pagePara = page.GetPara();

    var functionName = "InforCenter_ListManagement_" + pagePara.ItemName + "_OnLoadSuccess";
    if (window[functionName] && typeof window[functionName] == "function") {
        HoteamUI.Common.ExeFunction(functionName, pageEvent);
    }
}
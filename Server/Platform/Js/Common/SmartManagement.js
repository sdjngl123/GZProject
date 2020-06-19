//树管理页面加载事件
InforCenter_Platform_SmartManagement_LoadPage = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    var data = null;

    $.each(SmartManagementScript, function (index, val) {
        if (val.Name == pagePara.ItemName)
            data = JSON.parse(JSON.stringify(val));
    });
    if (data == null) {
        data = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GetSmartManagement", { para: { Name: pagePara.ItemName } });
        if (data)
            SmartManagementScript.push(data);
    }
    if (data == null) {
        return;
    }

    pagePara = $.extend(pagePara, data);

    var menuPage = HoteamUI.Page.InstanceIn(page.pid, "MenuPage", "MenuCtrl");
    var listPage = HoteamUI.Page.InstanceIn(page.pid, "ListViewPage", "SmartListViewCtrl");
    var treePage = HoteamUI.Page.InstanceIn(page.pid, "TreeViewPage", "TreeViewCtrl");
    var menuCtrl = menuPage.GetControl("Menu");
    var listCtrl = listPage.GetControl("ListView");
    var treeCtrl = treePage.GetControl("TreeView");
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.TreeViewName) == false) {

        pagePara.TreeGuid = treeCtrl.id;
    }
    pagePara.MenuGuid = menuCtrl.id;
    pagePara.ListGuid = listCtrl.id;

    pagePara.PagePID = page.pid;
    pagePara.ListCtrlPageName = "SmartListViewCtrl";

    InforCenter_Platform_MenuCtrl_LoadMenus(menuPage, pagePara, pagePara.TreeMenuName);
    //如果树视图没有配置，则隐藏树结构
    var content_One_Container = page.GetControl("Content_One_Container");
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.TreeViewName) == false) {
        content_One_Container.ShowPanel(["item1", "item2"]);
        var treeData = InforCenter_Platform_TreeViewCtrl_LoadTreeView(treePage, pagePara);
        if (treeData == null) {
            return;
        }

        if (HoteamUI.Common.IsNullOrEmpty(pagePara.ShowTreeQuery) == true || pagePara.ShowTreeQuery == false) {
            var treeContainer = treePage.GetControl("TreeView_Container")
            if (HoteamUI.Common.IsNullOrEmpty(treeContainer) == false) {
                treeContainer.HiddenPanel(["item1"]);
            }
        }
        if (!(pagePara.IsLoadAllData === undefined) && pagePara.IsLoadAllData == true) {
            InforCenter_Platform_SmartManagement_FixedNodePosition(treeCtrl, pagePara);
        }
        var node = treeCtrl.GetSelectedNode();
        if (node) {
            var breadNavCtrl = page.GetControl("BreadNavigation");
            InforCenter_Platform_SmartManagement_breadNavLoadData(breadNavCtrl, node);

            $.each(pagePara.ObjTypes, function (i, d) {
                if (d.Name == node.value3) {
                    if (d.ListTitleDataService != "" && d.ListTitleDataService != undefined) {
                        pagePara.ListTitleDataService = d.ListTitleDataService;
                    }
                    if (d.OnePageDataService != "" && d.OnePageDataService != undefined) {
                        pagePara.OnePageDataService = d.OnePageDataService;
                    }
                }
            })
        }
    }
    else {
        content_One_Container.HiddenPanel(["item1", "item2"]);
    }

    InforCenter_Platform_ListViewCtrl_LoadListView(listPage, pagePara);

    var management_Container = page.GetControl("Center_Container");
    management_Container.ShowPanel(["item1", "item2", "item3"]);
    management_Container.HiddenPanel(["item4"]);

    //    隐藏查询数量页面
    var top_Container = page.GetControl("Top_Container");
    top_Container.ShowPanel(["item2"]);
    top_Container.HiddenPanel(["item1"]);

    //给搜索框赋值为空
    var osearch = page.GetControl("SearchContainer");
    osearch.SetText("");

    //    如果没有配置查询视图，则隐藏查询框
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.QueryListViewName)) {
        top_Container.HiddenPanel(["item3"]);
    }
    var btnscontainer = $("#" + pageEvent.o.GetControl("ListView_Btns").id);
    //如果没有配置查询视图，则隐藏刷新按钮
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.IsRefreshButton)) {
        //listCtrl.HideTitleButton("refreshButton");
        btnscontainer.find(".smart-list-btns").eq(3).hide();
    }

    //如果没有配置查询视图，则隐藏切换树结构
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.IsTreeButton)) {
        //listCtrl.HideTitleButton("treeButton");
        btnscontainer.find(".smart-list-btns").eq(2).hide();
    }

    //如果没有配置查询视图，则隐藏列表模式
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.IsModelButton)) {
        //listCtrl.HideTitleButton("modelButton");
        btnscontainer.find(".smart-list-btns").eq(1).hide();
        btnscontainer.find(".smart-list-btns").eq(0).hide();
    }

    //如果没有配置默认菜单，则隐藏菜单区域
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.TreeMenuName)) {
        management_Container.HiddenPanel(["item1"]);
    }
    //设置查询结果标题
    $("#SmartManagementSearchCountBefore").html(HoteamUI.Language.Lang("SmartManagement", "SmartManagementSearchCountBefore"));
    $("#SmartManagementSearchCountNumber").html(HoteamUI.Language.Lang("SmartManagement", "SmartManagementSearchCountNumber"));

    if (HoteamUI.Common.IsNullOrEmpty(pagePara.IsBreadcrumbNavigation)) {
        var lisViewPage_Container = page.GetControl("LisViewPage_Container");
        lisViewPage_Container.HiddenPanel(["item1", "item2"]);
    }
    else if (HoteamUI.Common.IsNullOrEmpty(pagePara.TreeViewName)) {
        var breadNavCtrl = page.GetControl("BreadNavigation");
        breadNavCtrl.LoadData([{ value: "", text: HoteamUI.Language.Lang("SmartManagement", "AllInfo") }]);
    }
};
InforCenter_Platform_SmartManagement_FixedNodePosition = function (treeCtrl, pagePara) {
    var nodes = treeCtrl.GetNodesByParam("value1", pagePara.FixedEID);
    if (nodes.length > 0) {
        var node = nodes[0];
        treeCtrl.SelectNode(node);
        while (true) {
            var parentNode = node.getParentNode();
            if (parentNode) {
                treeCtrl.ExpandNode(parentNode, true);
                node = parentNode;
            } else {
                break;
            }
        }
    }
};

InforCenter_Platform_SmartManagement_OnNodeChange = function (pageEvent) {
    var ctrl = pageEvent.ctrl;
    var node = ctrl.GetSelectedNode();
    var pageContainer = ctrl.OtherControl("TreeView_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
    if (HoteamUI.Common.IsNullOrEmpty(node) == false) {
        if (HoteamUI.Common.IsNullOrEmpty(pagePara.MenuGuid) == false) {
            var menuPage = HoteamUI.Page.InstanceIn(pagePara.PagePID, "MenuPage", "MenuCtrl");
            var menuName = InforCenter_Platform_SmartManagement_GetTypeMenu(pagePara, node);
            InforCenter_Platform_MenuCtrl_LoadMenus(menuPage, pagePara, menuName);
        }
        if (HoteamUI.Common.IsNullOrEmpty(pagePara.ListGuid) == false) {
            var listPage = HoteamUI.Page.InstanceIn(pagePara.PagePID, "ListViewPage", "SmartListViewCtrl");
            var listViewName = InforCenter_Platform_SmartManagement_GetTypeListView(pagePara, node);

            $.each(pagePara.ObjTypes, function (i, d) {
                if (d.Name == node.value3) {
                    if (d.ListTitleDataService != "" && d.ListTitleDataService != undefined) {
                        pagePara.ListTitleDataService = d.ListTitleDataService;
                    }
                    if (d.OnePageDataService != "" && d.OnePageDataService != undefined) {
                        pagePara.OnePageDataService = d.OnePageDataService;
                    }
                }
            })
            InforCenter_Platform_ListViewCtrl_LoadListView(listPage, pagePara, listViewName);
        }
        //更新面包屑导航
        var breadNavCtrl = pageEvent.o.GetControl("BreadNavigation");
        //获取当前选中节点
        var node = ctrl.GetSelectedNode();
        InforCenter_Platform_SmartManagement_breadNavLoadData(breadNavCtrl, node);
    }
};


InforCenter_Platform_SmartManagement_breadNavLoadData = function (breadNavCtrl, node) {
    //如果存在面包屑导航
    if (breadNavCtrl.id) {
        var arr = new Array();
        //将节点数据放入数组首位
        arr.unshift({ value: node.Value1, text: node.name });
        while (true) {
            var parentNode = node.getParentNode();
            if (parentNode) {
                arr.unshift({ value: parentNode.tId, text: parentNode.name });
                node = parentNode;
            } else {
                break;
            }
        }
        breadNavCtrl.LoadData(arr);
    }
};
InforCenter_Platform_SmartManagement_OnRowClick = function (pageEvent) {
    var ctrl = pageEvent.SelectCtrl;
    var eid = "";
    var pageContainer = ctrl.OtherControl("ListView_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.MenuGuid) == false) {
        var selectRows = ctrl.GetSelectedRows();
        var menuName = "";
        if (selectRows.length == 0 && (pageEvent.Selected === undefined || pageEvent.Selected == false)) {
            var treePage = HoteamUI.Page.InstanceIn(pagePara.PagePID, "TreeViewPage", "TreeViewCtrl");
            var treeCtrl = treePage.GetControl("TreeView");
            try {
                var node = treeCtrl.GetSelectedNode();
                eid = node.value1;
                var values = eid.split('_');
                menuName = InforCenter_Platform_SmartManagement_GetObjectTypeMenu(pagePara.ObjTypes, values[0], true);
            } catch (e) {
                if (window.console) {
                    window.console.error(typeof (e) === "string" ? e : e.message);
                }
            }
        }
        else {
            var objType = "";
            //     for (var i in selectRows) {
            for (var i = 0; i < selectRows.length; i++) {
                var row = selectRows[i];
                var eid = row.EID;
                var values = eid.split('_');
                if (objType == "") {
                    objType = values[0];
                    continue;
                }
                if (objType != values[0]) {
                    objType = null;
                    break;
                }
            }
            if (objType == null) {
                menuName = pagePara.MultiObjectMenuName;
            }
            else if (objType != "") {
                menuName = InforCenter_Platform_SmartManagement_GetObjectTypeMenu(pagePara.ObjTypes, objType, false);
            }
        }

        if (menuName != "") {
            var menuPage = HoteamUI.Page.InstanceIn(pagePara.PagePID, "MenuPage", "MenuCtrl");
            InforCenter_Platform_MenuCtrl_LoadMenus(menuPage, pagePara, menuName);
        }
    }
};

InforCenter_Platform_SmartManagement_GetTypeMenu = function (pagePara, node) {
    var menuName = null;
    var objTypes = pagePara.ObjTypes;
    if (objTypes && objTypes.length > 0) {
        if (HoteamUI.Common.IsNullOrEmpty(node.value5) == false) {
            menuName = InforCenter_Platform_SmartManagement_GetObjectTypeMenu(objTypes, node.value5, true);
        }
        if (menuName == null) {
            menuName = InforCenter_Platform_SmartManagement_GetObjectTypeMenu(objTypes, node.value3, true);
            if (menuName == null) {
                menuName = pagePara.TreeMenuName;
            }
        }
    }
    return menuName;
};

InforCenter_Platform_SmartManagement_GetObjectTypeMenu = function (objTypes, objType, isTreeMenu) {
    var menuName = null;
    //   for (var i in objTypes) {
    for (var i = 0; i < objTypes.length; i++) {
        var obj = objTypes[i];
        if (obj.Name && obj.Name == objType) {
            if (isTreeMenu == true) {
                if (obj.TreeMenuName) {
                    menuName = obj.TreeMenuName;
                }
            }
            else {
                if (obj.ListMenuName) {
                    menuName = obj.ListMenuName;
                }
            }
            break;
        }
    }
    return menuName;
};

InforCenter_Platform_SmartManagement_GetTypeListView = function (pagePara, node) {
    var listViewName = null;
    var objTypes = pagePara.ObjTypes;
    if (objTypes && objTypes.length > 0) {
        if (HoteamUI.Common.IsNullOrEmpty(node.value5) == false) {
            listViewName = InforCenter_Platform_SmartManagement_GetObjectTypeListView(objTypes, node.value5);
        }
        if (listViewName == null) {
            listViewName = InforCenter_Platform_SmartManagement_GetObjectTypeListView(objTypes, node.value3);
            if (listViewName == null) {
                listViewName = pagePara.ListViewName;
            }
        }
    }
    return listViewName;
};

InforCenter_Platform_SmartManagement_GetObjectTypeListView = function (objTypes, objType) {
    var listViewName = null;
    // for (var i in objTypes) {
    for (var i = 0; i < objTypes.length; i++) {
        var obj = objTypes[i];
        if (obj.Name && obj.Name == objType) {
            if (obj.ListViewName) {
                listViewName = obj.ListViewName;
            }
            break;
        }
    }
    return listViewName;
};



InforCenter_Platform_SmartManagement_NameLinkOnClick = function (ctrlEvent) {

    var listCtrl = ctrlEvent.o;
    var selectid = ctrlEvent.rowobject.EID;

    var pageContainer = listCtrl.OtherControl("ListView_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
    pagePara.rowobject = ctrlEvent.rowobject;
    var page = HoteamUI.Page.Instance(pagePara.PagePID);

    if (selectid.indexOf("DOCUMENT") != -1) {
        if (HoteamUI.Page.Instance(pageContainer.id).PageName() == "ListViewCtrl") {
            pagePara.isHiddenMenu = true;
            HoteamUI.UIManager.Popup("DocumentView", pagePara, null, { id: ctrlEvent.o.id });
        } else {
            //展示
            var management_Container = page.GetControl("Center_Container");
            management_Container.HiddenPanel(["item1", "item2", "item3"]);
            management_Container.ShowPanel(["item4"]);

            var content_Two_Container = page.GetControl("Content_Two_Container");
            if (HoteamUI.Common.IsNullOrEmpty(pagePara.PopPageName) == false) {
                content_Two_Container.LoadPage(pagePara.PopPageName, pagePara);
            }
        }
    }
    else if (HoteamUI.Common.IsNullOrEmpty(pagePara.TreeViewName)) {
        var para = {};
        para.SmartQueryValue = ctrlEvent.text;
        para.CurrentPager = 1;
        para.AutoLoadData = true;
        para.ListSelectObject = [ctrlEvent.rowobject];
        InforCenter_Platform_ListViewCtrl_GetOnePageGridData(listCtrl, para);

        var breadNavCtrl = page.GetControl("BreadNavigation");
        breadNavCtrl.AppendNode({ value: pagePara.rowobject.EID, text: pagePara.rowobject.ENAMW });
    }
    else {

        if (HoteamUI.Common.IsNullOrEmpty(pagePara.TreeGuid) == false) {
            var treePage = HoteamUI.Page.InstanceIn(pagePara.PagePID, "TreeViewPage", "TreeViewCtrl");
            var treeCtrl = treePage.GetControl("TreeView");
            var node = treeCtrl.GetSelectedNode();

            if (HoteamUI.Common.IsNullOrEmpty(node) == false && HoteamUI.Common.IsNullOrEmpty(selectid) == false) {
                var cnodes = treeCtrl.GetChildrenNodes(node);
                var selectnode = null;
                if (cnodes && cnodes.length > 0) {
                    //  for (var i in cnodes) {
                    for (var i = 0; i < cnodes.length; i++) {
                        var cnode = cnodes[i];
                        if (cnode.Value1 == selectid) {
                            selectnode = cnode;
                            break;
                        }
                    }
                    if (selectnode != null) {
                        //var data = InforCenter_Platform_TreeViewCtrl_GetChildrenData(treeCtrl, selectnode);
                        //treeCtrl.LoadNodes(selectnode, data);
                        treeCtrl.SelectNode(selectnode);
                        HoteamUI.Page.FireParentPageEvent(treePage.pid, 'OnNodeChange', { ctrl: treeCtrl });
                    }
                } else { //如果没有子节点，说明当前选中的节点是没有下级的，则进行加载此节点数据
                    var data = InforCenter_Platform_TreeViewCtrl_GetChildrenData(treeCtrl, node);
                    treeCtrl.LoadNodes(node, data);
                    var nodes = treeCtrl.GetChildrenNodes(node);
                    if (nodes && nodes.length > 0) {
                        //    for (var i in nodes) {
                        for (var i = 0; i < nodes.length; i++) {
                            var cnode = nodes[i];
                            if (cnode.Value1 == selectid) {
                                selectnode = cnode;
                                break;
                            }
                        }
                        if (selectnode != null) {
                            treeCtrl.SelectNode(selectnode);
                            HoteamUI.Page.FireParentPageEvent(treePage.pid, 'OnNodeChange', { ctrl: treeCtrl });
                        }
                    }
                }
            }
        }
    }
};
InforCenter_Platform_SmartManagement_ClosePupPage = function (pagePID) {
    var page = HoteamUI.Page.Instance(pagePID);
    var content_Two_Container = page.GetControl("Content_Two_Container");
    //展示
    var management_Container = page.GetControl("Center_Container");
    management_Container.ShowPanel(["item1", "item2", "item3"]);
    management_Container.HiddenPanel(["item4"]);
};
InforCenter_Platform_SmartManagement_OnOtherOperation = function (pageEvent) {
    var container = pageEvent.o.GetControl("Content_One_Container")

    if (HoteamUI.Common.IsNullOrEmpty(container) == false) {
        var treePage = HoteamUI.Page.InstanceIn(pageEvent.o.pid, "TreeViewPage", "TreeViewCtrl");
        var treePageContainer = treePage.GetControl("TreeView_Container");
        var para = HoteamUI.Page.GetContainerPara(treePageContainer.id);
        if (para.TreeIsHidden === undefined || para.TreeIsHidden == false) {
            container.HiddenPanel(["item1", "item2"]);
            para.TreeIsHidden = true;
        }
        else {
            container.ShowPanel(["item1", "item2"]);
            para.TreeIsHidden = false;
        }
        HoteamUI.Page.SetContainerParas(treePageContainer.id, "TreeViewCtrl", para);
    }
};

InforCenter_Platform_SmartManagement_Search = function (ctrlEvent) {
    //没有查询条件，先定不做查询
    if (HoteamUI.Common.IsNullOrEmpty(ctrlEvent.text)) {
        return;
    }

    //隐藏树结构
    var treeContainer = ctrlEvent.o.OtherControl("Content_One_Container")
    if (HoteamUI.Common.IsNullOrEmpty(treeContainer) == false) {
        treeContainer.HiddenPanel(["item1", "item2"]);
    }

    var pagePID = ctrlEvent.o.ContainerID();
    var page = HoteamUI.Page.Instance(pagePID);
    var listPage = HoteamUI.Page.InstanceIn(pagePID, "ListViewPage", "SmartListViewCtrl");

    var listCtrl = listPage.GetControl("ListView");
    var pageContainer = listPage.GetControl("ListView_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
    var para = {};
    var searchtext = ctrlEvent.text;
    searchtext = searchtext.replace(/'/g, "''");
    searchtext = searchtext.replace(/\[/g, "[[]");
    searchtext = searchtext.replace(/\%/g, "[%]");
    searchtext = searchtext.replace(/_/g, "[_]");
    para.SmartQueryValue = searchtext;
    if (pagePara.TreeGuid) {
        var treeCtrl = HoteamUI.Control.Instance(pagePara.TreeGuid);
        var treeroot = treeCtrl.GetTreeRootNodes();
        if (treeroot && treeroot.length > 0) {
            para.SmartTreeRootID = treeroot[0].value1;
        }
    }
    para.CurrentPager = 1;
    para.AutoLoadData = true;
    para.ListViewName = pagePara.QueryListViewName;
    if (pagePara.ParaList) {
        pagePara.ParaList.push("SmartQueryValue");
        pagePara.ParaList.push("SmartTreeRootID");
    }
    else {
        pagePara.ParaList = ["SmartQueryValue"];
    }
    para.ParaList = pagePara.ParaList;

    var callFunc = function (gridData) {
        //显示查询数量页面
        var top_Container = page.GetControl("Top_Container");
        top_Container.ShowPanel(["item1"]);
        top_Container.HiddenPanel(["item2"]);

        //显示查询数量
        if (gridData.RecordsTotal >= 0) {
            $("#SmartManagementSearchCount").html(gridData.RecordsTotal);
        }
        //隐藏切换树结构
        listCtrl.HideTitleButton("treeButton");
    }

    InforCenter_Platform_ListViewCtrl_GetOnePageGridData(listCtrl, para, callFunc);
};

InforCenter_Platform_SmartManagement_NodeOnClick = function (ctrlEvent) {
    var pageID = ctrlEvent.o.ContainerID();
    var listPage = HoteamUI.Page.InstanceIn(pageID, "ListViewPage", "SmartListViewCtrl");
    var pageContainer = listPage.GetControl("ListView_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
    if (pagePara.TreeViewName) {
        var treePage = HoteamUI.Page.InstanceIn(pageID, "TreeViewPage", "TreeViewCtrl");
        var treeCtrl = treePage.GetControl("TreeView");
        var nodes = treeCtrl.GetNodesByParam("tId", ctrlEvent.value);
        if (nodes.length > 0) {
            treeCtrl.SelectNode(nodes[0]);
            HoteamUI.Page.FireParentPageEvent(treePage.pid, 'OnNodeChange', { ctrl: treeCtrl });
        }
    }
    else {
        var para = {};
        para.CurrentPager = 1;
        para.AutoLoadData = true;
        para.ListSelectObject = { EID: ctrlEvent.value };
        InforCenter_Platform_ListViewCtrl_GetOnePageGridData(listCtrl, para);
    }
}

InforCenter_Platform_SmartManagement_BtnsOnCreat = function (ctrlEvent) {
    $("#smartlistbtns").attr("id", ctrlEvent.id + "smartlistbtns");
    var btns = $("#" + ctrlEvent.id + "smartlistbtns").children(".smart-list-btns");
    $(btns[0]).attr("title", HoteamUI.Language.Lang("SmartManagement", "ThumbnailModel"));
    $(btns[1]).attr("title", HoteamUI.Language.Lang("SmartManagement", "ListModel"));
    $(btns[2]).attr("title", HoteamUI.Language.Lang("SmartManagement", "HideTree"));
    $(btns[3]).attr("title", HoteamUI.Language.Lang("SmartManagement", "Refresh"));
    $("#" + ctrlEvent.id + "smartlistbtns").on("click", ".smart-list-btns", { ctrl: ctrlEvent }, function (e) {
        var index = $(this).index();
        var ctrl = e.data.ctrl.o.OtherControl("ListViewPage").ChildrenControl("ListView");
        if (index == 3) {//缩略图模式
            InforCenter_Platform_ListViewCtrl_GridTitleRefresh(ctrl);
        } else if (index == 2) {
            InforCenter_Platform_ListViewCtrl_GridTitleTreeOperation(ctrl);
            if ($(this).hasClass("b-title-treeOperation-sel")) {
                $(this).addClass("b-title-treeOperation").removeClass("b-title-treeOperation-sel")
                    .attr("title", HoteamUI.Language.Lang("SmartManagement", "ShowTree"));
            } else {
                $(this).addClass("b-title-treeOperation-sel").removeClass("b-title-treeOperation")
                    .attr("title", HoteamUI.Language.Lang("SmartManagement", "HideTree"));
            }
        } else if (index == 1) {
            InforCenter_Platform_ListViewCtrl_GridTitleListModel(ctrl);
            if ($(this).hasClass("b-title-listModel")) {
                $(this).prev().addClass("b-title-imgModel").removeClass("b-title-imgModel-sel");
                $(this).addClass("b-title-listModel-sel");
            }
        } else if (index == 0) {
            InforCenter_Platform_ListViewCtrl_GridTitleImgModel(ctrl);
            if ($(this).hasClass("b-title-imgModel")) {
                $(this).next().addClass("b-title-listModel").removeClass("b-title-listModel-sel");
                $(this).addClass("b-title-imgModel-sel");
            }
        }
    });
}
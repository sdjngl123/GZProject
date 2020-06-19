//树管理页面加载事件
InforCenter_Platform_TreeManagement_LoadPage = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    var data = null;
    var isLoadAllData = pagePara.IsLoadAllData;
    $.each(TreeManagementScript, function (index, val) {
        if (val.Name == pagePara.ItemName)
            data = JSON.parse(JSON.stringify(val));
    });
    if (data == null) {
        data = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GetTreeManagement", { para: { Name: pagePara.ItemName } });
        if (data)
            TreeManagementScript.push(data);
    }
    if (data == null) {
        return;
    }
    pagePara = $.extend(pagePara, data);
    var tabsPage = HoteamUI.Page.InstanceIn(page.pid, "TabsCtrlPage", "TabsCtrl");
    var treePage = HoteamUI.Page.InstanceIn(page.pid, "TreeViewPage", "TreeViewCtrl");
    var menuPage = HoteamUI.Page.InstanceIn(page.pid, "MenuCtrlPage", "MenuCtrl");
    var tabsCtrl = tabsPage.GetControl("Tabs");
    var treeCtrl = treePage.GetControl("TreeView");
    var menuCtrl = menuPage.GetControl("Menu");
    pagePara.TabsGuid = tabsCtrl.id;
    pagePara.TreeGuid = treeCtrl.id;
    pagePara.PagePID = page.pid;

    if (isLoadAllData) {
        pagePara.IsLoadAllData = isLoadAllData;
        pagePara.Refresh = false;
    }

    if (pagePara.Refresh && pagePara.Refresh == true && pagePara.TreeGuid && !pagePara.IsLoadAllData && !pagePara.ConstraintRefresh) {
        if (!pagePara.OnlyTree) {
            InforCenter_Platform_TreeViewCtrl_RefreshCurrentStructureAndTab(pagePara.TreeGuid);
        }
        if (pagePara.FixedPath) {
            InforCenter_Platform_TreeManagement_FixedNodePositionForPath(treeCtrl, pagePara);
        }
    }
    else {
        var treeData = InforCenter_Platform_TreeViewCtrl_LoadTreeView(treePage, pagePara);
        if (treeData == null) {
            return;
        }
        //根据传入的ID进行定位树节点
        if (pagePara.FixedEID) {
            if ((pagePara.IsLoadAllData && pagePara.IsLoadAllData == true) || (pagePara.FixedById && pagePara.FixedById == true)) {
                InforCenter_Platform_TreeManagement_FixedNodePosition(treeCtrl, pagePara);
            }
        }
        //根据传入的路径进行定位树节点
        if (pagePara.FixedPath) {
            InforCenter_Platform_TreeManagement_FixedNodePositionForPath(treeCtrl, pagePara);
        }
        var node = treeCtrl.GetSelectedNode();
        if (node) {
            pagePara.ObjType = node.value3;
            pagePara.NodeType = node.value5;
            pagePara.ObjectID = pagePara.SelectID = node.value1;
            var leftContainer = page.GetControl("Left_Container");
            var curNodeType = !HoteamUI.Common.IsNullOrEmpty(node.Value5) ? node.Value5 : node.Value3;
            var curNodeData = null;
            for (var i = 0; i < data.ObjTypes.length; i++) {
                var objType = data.ObjTypes[i];
                if (objType.Name == curNodeType) {
                    curNodeData = objType;
                    break;
                }
            }
            if (curNodeData != null && !HoteamUI.Common.IsNullOrEmpty(curNodeData.CustomPage)) {
                var customPageContainer = page.GetControl('CustomPageContainer');
                customPageContainer.LoadPage(curNodeData.CustomPage, pagePara);
                var tempPara = page.GetPara();
                pagePara = $.extend(pagePara, tempPara);
            } else {
                leftContainer.HiddenPanel(["item6", "item7"]);
            }

            var menuFlag = false;
            if (HoteamUI.Common.IsNullOrEmpty(pagePara.MenuName) == false) {
                var menuData = InforCenter_Platform_MenuCtrl_LoadMenus(menuPage, pagePara, pagePara.MenuName);
                if (menuData && menuData.Menus && menuData.Menus.length > 0) {
                    menuFlag = true;
                }
            }

            if (HoteamUI.Common.IsNullOrEmpty(leftContainer) == false) {
                if (menuFlag) {
                    leftContainer.ShowPanel(["item1", "item2"]);
                }
                else {
                    leftContainer.HiddenPanel(["item1", "item2"]);
                }
            }

            if (HoteamUI.Common.IsNullOrEmpty(pagePara.ShowTreeQuery) == true || pagePara.ShowTreeQuery == false) {
                leftContainer.HiddenPanel(["item3"]);
            }
            var mainContainer = page.GetControl('TreeManagement_Container');
            if (!HoteamUI.Common.IsNullOrEmpty(pagePara.TreeWidth)) {
                mainContainer.ResetPanelSize({ item1: pagePara.TreeWidth });
            }
            if (!pagePara.OnlyTree) {
                if (pagePara.IsHiddenTabs == true) {
                    pagePara.HideTitle = true;
                }
                var pageLinksName = InforCenter_Platform_TreeManagement_GetTypeTabs(pagePara, node);
                pagePara.TabOptions = {};
                pagePara.TabOptions.titleType = "standard";
                var data = InforCenter_Platform_GetTreeManagePageLinksByName(pageLinksName);
                if (data.CheckContentPermission == true) {
                    pagePara.ContentPermission = node.ContentPermission;
                }
                InforCenter_Platform_TabsCtrl_LoadTabs(tabsPage, pagePara, pageLinksName, "", data);
            } else {
                mainContainer.HiddenPanel(["item2", "item3"]);
                mainContainer.ResetPanelSize({ item1: '100%' });
            }
            HoteamUI.Page.SetContainerParas(leftContainer.id, "TreeManagement", pagePara);
        }
    }
};
InforCenter_Platform_TreeManagement_FixedNodePosition = function (treeCtrl, pagePara) {
    var nodes = treeCtrl.GetNodesByParam("value1", pagePara.FixedEID);
    if (nodes.length > 0) {
        var node = nodes[0];
        treeCtrl.SelectNode(node);
        //选中项更换了 需要重新定位url
        if (pagePara.Url && pagePara.Url.length > 0) {
            pagePara.Url.pop();
        }
        var objType = HoteamUI.Common.IsNullOrEmpty(node.value5) ? node.value3 : node.value5;
        pagePara.Url.push(objType);
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

InforCenter_Platform_TreeManagement_FixedNodePositionForPath = function (treeCtrl, pagePara) {
    var rootNodes = treeCtrl.GetTreeRootNodes();
    var rootIndex = 0;
    if (rootNodes.length > 1) {
        var firstIndex = pagePara.FixedPath.indexOf('.');
        rootIndex = pagePara.FixedPath.substr(0, firstIndex);
        pagePara.FixedPath = pagePara.FixedPath.substr(firstIndex + 1);
    }
    var curRootNode = rootNodes[rootIndex];
    InforCenter_Platform_TreeViewCtrl_SelectTreeNode(treeCtrl, curRootNode, pagePara.FixedPath);
}
InforCenter_Platform_TreeManagement_GetTypeTabs = function (pagePara, node) {
    var pageLinksName = null;
    var objTypes = pagePara.ObjTypes;
    if (objTypes && objTypes.length > 0) {
        if (HoteamUI.Common.IsNullOrEmpty(node.value5) == false) {
            pageLinksName = InforCenter_Platform_TreeManagement_GetObjectTypeTabs(objTypes, node.value5);
        }
        if (pageLinksName == null) {
            pageLinksName = InforCenter_Platform_TreeManagement_GetObjectTypeTabs(objTypes, node.value3);
            if (pageLinksName == null) {
                pageLinksName = pagePara.PageLinksName;
            }
        }
    }
    return pageLinksName;
};

InforCenter_Platform_TreeManagement_GetTypeMenu = function (pagePara, node) {
    var menuName = null;
    var objTypes = pagePara.ObjTypes;
    if (objTypes && objTypes.length > 0) {
        if (HoteamUI.Common.IsNullOrEmpty(node.value5) == false) {
            menuName = InforCenter_Platform_TreeManagement_GetObjectTypeMenu(objTypes, node.value5);
        }
        if (menuName == null) {
            menuName = InforCenter_Platform_TreeManagement_GetObjectTypeMenu(objTypes, node.value3);
        }
    }
    return menuName;
};
InforCenter_Platform_TreeManagement_GetObjectTypeTabs = function (objTypes, objType) {
    var pageLinksName = null;
    // for (var i in objTypes) {
    for (var i = 0; i < objTypes.length; i++) {
        var obj = objTypes[i];
        if (obj.Name && obj.Name == objType) {
            if (HoteamUI.Common.IsNullOrEmpty(obj.PageLinksName) == false) {
                pageLinksName = obj.PageLinksName;
            }
            break;
        }
    }
    return pageLinksName;
};

InforCenter_Platform_TreeManagement_GetObjectTypeMenu = function (objTypes, objType) {
    var menuName = null;
    //for (var i in objTypes) {
    for (var i = 0; i < objTypes.length; i++) {
        var obj = objTypes[i];
        if (obj.Name && obj.Name == objType) {
            if (obj.MenuName) {
                menuName = obj.MenuName;
            }
            break;
        }
    }
    return menuName;
};
InforCenter_Platform_TreeManagement_OnNodeChange = function (pageEvent) {
    var ctrl = pageEvent.ctrl;
    var node = ctrl.GetSelectedNode();
    var pageContainer = ctrl.OtherControl("TreeView_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);

    //缓存记录本次选中节点
    pagePara.LastestTreeNode = node;
    HoteamUI.Page.SetContainerParas(pageContainer.id, pagePara);

    if (HoteamUI.Common.IsNullOrEmpty(node) == false
    && HoteamUI.Common.IsNullOrEmpty(pagePara.TabsGuid) == false) {

        var rightContainer = null;
        if (pageEvent.o) {
            rightContainer = pageEvent.o.GetControl("Right_Container");
        }

        var curNodeType = !HoteamUI.Common.IsNullOrEmpty(node.Value5) ? node.Value5 : node.Value3;
        var curNodeData = null;
        for (var i = 0; i < pagePara.ObjTypes.length; i++) {
            var objType = pagePara.ObjTypes[i];
            if (objType.Name == curNodeType) {
                curNodeData = objType;
                break;
            }
        }
        if (curNodeData != null) {
            var page = HoteamUI.Page.Instance(pagePara.PagePID);
            var leftContainer = page.GetControl("Left_Container");
            if (HoteamUI.Common.IsNullOrEmpty(curNodeData.CustomPage)) {
                leftContainer.HiddenPanel(["item6", "item7"]);
            } else {
                var customPageContainer = page.GetControl('CustomPageContainer');
                leftContainer.ShowPanel(["item6", "item7"]);
                customPageContainer.LoadPage(curNodeData.CustomPage, pagePara);
                var tempPara = page.GetPara();
                pagePara = $.extend(pagePara, tempPara);
            }
        }

        var tabCtrl = HoteamUI.Control.Instance(pagePara.TabsGuid);
        var pageLinksName = InforCenter_Platform_TreeManagement_GetTypeTabs(pagePara, node);
        if (HoteamUI.Common.IsNullOrEmpty(pageLinksName) == false) {
            var data = InforCenter_Platform_GetTreeManagePageLinksByName(pageLinksName);
            if (data != null) {
                if (HoteamUI.Common.IsNullOrEmpty(data.GetLinksItemJS) == false) {
                    pagePara.LinksData = data;
                    data = HoteamUI.Common.ExeFunction(data.GetLinksItemJS, pagePara);
                }
                pagePara.ObjType = node.value3;
                pagePara.NodeType = node.value5;
                pagePara.ObjectID = pagePara.SelectID = node.value1;
                if (pagePara.Url) {
                    pagePara.Url.push(HoteamUI.Common.IsNullOrEmpty(node.value5) ? node.value3 : node.value5);
                }
                if (data.CheckContentPermission == true) {
                    node.ContentPermission = pagePara.ContentPermission = InforCenter_Platform_TreeViewCtrl_GetTreeNodeExpandPermission(ctrl, node);
                }
                InforCenter_Platform_TabsCtrl_UpdateTabs(tabCtrl, data, pagePara, pageLinksName);
            }
        }
        else {
            var tabs = tabCtrl.GetTabInfoList();
            for (var i = 0; i < tabs.length; i++) {
                tabCtrl.RemoveTab(i);
            }
        }
    }
};

InforCenter_Platform_TreeManagement_OnTabChange = function (pageEvent) {
    var page = pageEvent.o;
    var treePage = HoteamUI.Page.InstanceIn(page.pid, "TreeViewPage", "TreeViewCtrl");
    var ctrl = treePage.GetControl("TreeView");
    var node = ctrl.GetSelectedNode();
    var pageContainer = ctrl.OtherControl("TreeView_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
    if (HoteamUI.Common.IsNullOrEmpty(node) == false
        && HoteamUI.Common.IsNullOrEmpty(pagePara.TabsGuid) == false) {

        var rightContainer = null;
        if (pageEvent.o) {
            rightContainer = pageEvent.o.GetControl("Right_Container");
        }

        var curNodeType = !HoteamUI.Common.IsNullOrEmpty(node.Value5) ? node.Value5 : node.Value3;
        var curNodeData = null;
        for (var i = 0; i < pagePara.ObjTypes.length; i++) {
            var objType = pagePara.ObjTypes[i];
            if (objType.Name == curNodeType) {
                curNodeData = objType;
                break;
            }
        }
        if (curNodeData != null) {
            var page = HoteamUI.Page.Instance(pagePara.PagePID);
            var leftContainer = page.GetControl("Left_Container");
            if (HoteamUI.Common.IsNullOrEmpty(curNodeData.CustomPage)) {
                leftContainer.HiddenPanel(["item6", "item7"]);
            } else {
                var customPageContainer = page.GetControl('CustomPageContainer');
                leftContainer.ShowPanel(["item6", "item7"]);
                customPageContainer.LoadPage(curNodeData.CustomPage, pagePara);
                var tempPara = page.GetPara();
                pagePara = $.extend(pagePara, tempPara);
            }
        }

        var tabCtrl = HoteamUI.Control.Instance(pagePara.TabsGuid);
        var pageLinksName = InforCenter_Platform_TreeManagement_GetTypeTabs(pagePara, node);
        if (HoteamUI.Common.IsNullOrEmpty(pageLinksName) == false) {
            var data = InforCenter_Platform_GetTreeManagePageLinksByName(pageLinksName);
            if (data != null) {
                if (HoteamUI.Common.IsNullOrEmpty(data.GetLinksItemJS) == false) {
                    pagePara.LinksData = data;
                    data = HoteamUI.Common.ExeFunction(data.GetLinksItemJS, pagePara);
                }
                pagePara.ObjType = node.value3;
                pagePara.NodeType = node.value5;
                pagePara.ObjectID = pagePara.SelectID = node.value1;
                if (pagePara.Url) {
                    pagePara.Url.push(HoteamUI.Common.IsNullOrEmpty(node.value5) ? node.value3 : node.value5);
                }
                if (data.CheckContentPermission == true) {
                    node.ContentPermission = pagePara.ContentPermission = InforCenter_Platform_TreeViewCtrl_GetTreeNodeExpandPermission(ctrl, node);
                }
                InforCenter_Platform_TabsCtrl_UpdateTabs(tabCtrl, data, pagePara, pageLinksName);
            }
        }
        else {
            var tabs = tabCtrl.GetTabInfoList();
            for (var i = 0; i < tabs.length; i++) {
                tabCtrl.RemoveTab(i);
            }
        }
    }
};


InforCenter_Platform_TreeManagement_QueryInit = function (ctrlEvent) {
    $('#' + ctrlEvent.o.id + " #treeviewQueryTemplate").attr("id", ctrlEvent.o.id + "_treeviewQueryTemplate");
    var template = $("#" + ctrlEvent.o.id + "_treeviewQueryTemplate");
    var searchinput = template.find("input");
    searchinput.parent().append("<span class='basesprite b-close treeview-query-search-trash' style='display:none;'/>");
    var previous = HoteamUI.Language.Lang("TreeViewCtrl.Previous");
    var next = HoteamUI.Language.Lang("TreeViewCtrl.Next");
    template.find(".basesprite").each(function () {
        if ($(this).hasClass("b-gray-prev")) {
            $(this).attr("title", previous);
        } else if ($(this).hasClass("b-gray-next")) {
            $(this).attr("title", next);
        } else if ($(this).hasClass("b-angle-down")) {
            InforCenter_Platform_ShowSearchHistory($(this), $(this).parents(".treeview-query-search-input").find("input"), "treemanagement");
        }
    });
    template.find(".basesprite").on("mouseenter", function () {
        if ($(this).hasClass("b-gray-search")) {
            $(this).addClass("b-gray-search-hover");
        } else if ($(this).hasClass("b-gray-prev")) {
            $(this).addClass("b-gray-prev-hover");
        } else if ($(this).hasClass("b-gray-next")) {
            $(this).addClass("b-gray-next-hover");
        } else if ($(this).hasClass("b-angle-down")) {
            $(this).addClass("b-blue-angle-down");
        }
    }).on("mouseleave", function () {
        if ($(this).hasClass("b-gray-search")) {
            $(this).removeClass("b-gray-search-hover");
        } else if ($(this).hasClass("b-gray-prev")) {
            $(this).removeClass("b-gray-prev-hover");
        } else if ($(this).hasClass("b-gray-next")) {
            $(this).removeClass("b-gray-next-hover");
        } else if ($(this).hasClass("b-angle-down")) {
            $(this).removeClass("b-blue-angle-down");
        }
    }).on("click", function () {
        if ($(this).hasClass("b-gray-search")) {
            InforCenter_Platform_TreeManagement_Query(ctrlEvent);
        } else if ($(this).hasClass("b-gray-prev")) {
            InforCenter_Platform_TreeManagement_Previous(ctrlEvent);
        } else if ($(this).hasClass("b-gray-next")) {
            InforCenter_Platform_TreeManagement_Next(ctrlEvent);
        } else if ($(this).hasClass("b-close")) {
            $(this).siblings("input").val("").focus();
            $(this).hide();
        }
    });
    searchinput.on("keyup", function (e) {
        if ($(this).val()) {
            $(this).siblings(".b-close").show();
        }
        else {
            $(this).siblings(".b-close").hide();
        }
        if (e.keyCode == 13) {//enter键
            InforCenter_Platform_TreeManagement_Query(ctrlEvent);
        }
    });
};

///删除上一次选中记录
InforCenter_Platform_TreeManagement_ClearLastestSelectNode = function (ctrlEvent) {
    var ctrid = ctrlEvent.o.ContainerID();
    var page = HoteamUI.Page.Instance(ctrid);
    var tvcPage = HoteamUI.Page.InstanceIn(page.pid, "TreeViewPage", "TreeViewCtrl");
    var tvCtr = tvcPage.GetControl("TreeView_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(tvCtr.id);
    pagePara.LastestTreeNode = null;
    HoteamUI.Page.SetContainerParas(tvCtr.id, pagePara);
}

InforCenter_Platform_TreeManagement_Query = function (ctrlEvent) {
    var $searchInput = $("#" + ctrlEvent.o.id + "_treeviewQueryTemplate").find("input");
    var text = $.trim($searchInput.val());
    $searchInput.val(text);
    var leftContainer = ctrlEvent.o.OtherControl("Left_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(leftContainer.id);
    if (pagePara.AllQuery) {
        InforCenter_Platform_TreeViewCtrl_AllExecQuery(text, pagePara.TreeGuid, $searchInput);
    } else {
        InforCenter_Platform_TreeViewCtrl_ExecQuery(text, pagePara.TreeGuid, $searchInput);
    }
    InforCenter_Platform_SaveSearchHistory("treemanagement", text, 10);
    InforCenter_Platform_TreeManagement_ClearLastestSelectNode(ctrlEvent);
};
InforCenter_Platform_TreeManagement_Previous = function (ctrlEvent) {
    var leftContainer = ctrlEvent.o.OtherControl("Left_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(leftContainer.id);
    if (pagePara.AllQuery) {
        InforCenter_Platform_TreeViewCtrl_AllPrevious(pagePara.TreeGuid);
    } else {
        InforCenter_Platform_TreeViewCtrl_Previous(pagePara.TreeGuid);
    }
    InforCenter_Platform_TreeManagement_ClearLastestSelectNode(ctrlEvent);
};
InforCenter_Platform_TreeManagement_Next = function (ctrlEvent) {
    var leftContainer = ctrlEvent.o.OtherControl("Left_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(leftContainer.id);
    if (pagePara.AllQuery) {
        InforCenter_Platform_TreeViewCtrl_AllNext(pagePara.TreeGuid);
    } else {
        InforCenter_Platform_TreeViewCtrl_Next(pagePara.TreeGuid);
    }
    InforCenter_Platform_TreeManagement_ClearLastestSelectNode(ctrlEvent);
};

//节点双击事件支持自定义
InforCenter_Platform_TreeManagement_OnNodeDblClick = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara()

    var data = null;
    $.each(TreeManagementScript, function (index, val) {
        if (val.Name == pagePara.ItemName)
            data = JSON.parse(JSON.stringify(val));
    });
    if (data == null) {
        data = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GetTreeManagement", { para: { Name: pagePara.ItemName } });
        if (data)
            TreeManagementScript.push(data);
    }
    if (data == null) {
        return;
    }
    if (!HoteamUI.Common.IsNullOrEmpty(data.TreeNodeOnDblClick)) {
        HoteamUI.Common.ExeFunction(data.TreeNodeOnDblClick, pageEvent);
    }
}

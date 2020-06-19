ModulePermission = {};
ModulePermission.NodeEnum = {
    Menu: "Menu",
    Tabs: "Tabs",
    Navigation: "Navigation"
}

InforCenter_Platform_ModulePermission_LoadPermisssionTree = function (ctrlEvent) {
    var data = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GetModulePermissionTree", {});

    if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
        ModulePermission.TreeNodeData = data;
        ctrlEvent.o.LoadNodes(null, data);
        ModulePermission.AllTreeNode = InforCenter_Platform_ModulePermission_SetNodePermissionModulePath(ctrlEvent.o);
    }

}

InforCenter_Platform_ModulePermission_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = {};
    var treePage = HoteamUI.Page.InstanceIn(page.pid, "TreeViewPage", "TreeViewCtrl");
    var treeCtrl = treePage.GetControl("TreeView");
    pagePara.TreeGuid = treeCtrl.id;
    pagePara.TreeViewName = "ModulePermissionTreeView";
    pagePara.TreeQueryDataService = "InforCenter.Organization.OrganizationDataService.GetTreeQueryData";
    var treeData = InforCenter_Platform_TreeViewCtrl_LoadTreeView(treePage, pagePara);
    var leftContainer = page.GetControl("Left_Container")
    HoteamUI.Page.SetContainerParas(leftContainer.id, "ModulePermission", pagePara);
}
InforCenter_Platform_ModulePermission_QueryInit = function (ctrlEvent) {
    $("#treeviewQueryTemplate").attr("id", ctrlEvent.o.id + "_treeviewQueryTemplate");
    var template = $("#" + ctrlEvent.o.id + "_treeviewQueryTemplate");
    var previous = HoteamUI.Language.Lang("TreeViewCtrl.Previous");
    var next = HoteamUI.Language.Lang("TreeViewCtrl.Next");
    template.find(".basesprite").each(function () {
        if ($(this).hasClass("b-gray-prev")) {
            $(this).attr("title", previous);
        } else if ($(this).hasClass("b-gray-next")) {
            $(this).attr("title", next);
        }
    });
    template.find(".basesprite").on("mouseenter", function () {
        if ($(this).hasClass("b-gray-search")) {
            $(this).addClass("b-gray-search-hover");
        } else if ($(this).hasClass("b-gray-prev")) {
            $(this).addClass("b-gray-prev-hover");
        } else if ($(this).hasClass("b-gray-next")) {
            $(this).addClass("b-gray-next-hover");
        }
    }).on("mouseleave", function () {
        if ($(this).hasClass("b-gray-search")) {
            $(this).removeClass("b-gray-search-hover");
        } else if ($(this).hasClass("b-gray-prev")) {
            $(this).removeClass("b-gray-prev-hover");
        } else if ($(this).hasClass("b-gray-next")) {
            $(this).removeClass("b-gray-next-hover");
        }
    }).on("click", function () {
        if ($(this).hasClass("b-gray-search")) {
            InforCenter_Platform_ModulePermission_Query(ctrlEvent);
        } else if ($(this).hasClass("b-gray-prev")) {
            InforCenter_Platform_ModulePermission_Previous(ctrlEvent);
        } else if ($(this).hasClass("b-gray-next")) {
            InforCenter_Platform_ModulePermission_Next(ctrlEvent);
        }
    });
    template.find("input").on("keyup", function (e) {
        if (e.keyCode == 13) {//enter键
            InforCenter_Platform_ModulePermission_Query(ctrlEvent);
        }
    });
};
InforCenter_Platform_ModulePermission_Query = function (ctrlEvent) {
    var $searchInput = $("#" + ctrlEvent.o.id + "_treeviewQueryTemplate").find("input");
    var text = $.trim($searchInput.val());
    $searchInput.val(text);
    var leftContainer = ctrlEvent.o.OtherControl("Left_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(leftContainer.id);
    var treeGuid = pagePara.TreeGuid;
    InforCenter_Platform_TreeViewCtrl_ExecQuery(text, treeGuid, $searchInput);
};
InforCenter_Platform_ModulePermission_ExecRoleQuery = function (text, treeCtrl) {
    var callFocus = function () {
        setTimeout(function () {
            if ($searchInput)
                $searchInput.focus();
        }, 200);
    }

    if (text) {
        var pageContainer = treeCtrl.OtherControl("TreeView_Container");
        var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
        if (HoteamUI.Common.IsNullOrEmpty(pagePara.TreeGuid) == false) {
            var currentNode = treeCtrl.GetSelectedNode();
            if (HoteamUI.Common.IsNullOrEmpty(currentNode) == false) {
                var node = currentNode;
                var para = { para: { QueryFilter: text } };
                var data = HoteamUI.DataService.Call("InforCenter.Organization.OrganizationDataService.GetRoleTreeQuery", para);
                if (data != null) {
                    if (data.length == 0) {
                        var para = { pageMode: "OK", MessageIcon: "point", context: "Platform", labelName: "DidNotFindTheQueryContent" }
                        HoteamUI.UIManager.Popup("Confirm", para, callFocus);
                    }
                    InforCenter_Platform_TreeViewCtrl_SelectTreeNode(treeCtrl, node, data[0]);
                    pagePara.SearchData = data;
                    pagePara.SearchNodeID = currentNode.tId;
                    HoteamUI.Page.SetContainerParas(pageContainer.id, "TreeViewCtrl", pagePara);
                }

            }
            else {
                var para = { pageMode: "OK", context: "Platform", labelName: "PleaseSelectQueryStartNode" }
                HoteamUI.UIManager.Popup("Confirm", para);
            }
        }
    }
    else {
        var para = { pageMode: "OK", context: "Platform", labelName: "PleaseInputQueryContent" }
        HoteamUI.UIManager.Popup("Confirm", para, callFocus);
    }
};
InforCenter_Platform_ModulePermission_GetRootNode = function (treeCtrl) {
    var node = treeCtrl.GetSelectedNode();
    while (true) {
        var parentNode = treeCtrl.GetParentNode(node);
        if (!parentNode) { break; }
        node = parentNode;
    }
    return node;
};
InforCenter_Platform_ModulePermission_Previous = function (ctrlEvent) {
    var leftContainer = ctrlEvent.o.OtherControl("Left_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(leftContainer.id);
    InforCenter_Platform_TreeViewCtrl_Previous(pagePara.TreeGuid);
};
InforCenter_Platform_ModulePermission_Next = function (ctrlEvent) {
    var leftContainer = ctrlEvent.o.OtherControl("Left_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(leftContainer.id);
    InforCenter_Platform_TreeViewCtrl_Next(pagePara.TreeGuid);
};

InforCenter_Platform_ModulePermission_Reset = function (ctrlEvent) {
    var tree = ctrlEvent.o.OtherControl("PermissionTree_Tree");
    tree.SetAllCheckState("2");
}
InforCenter_Platform_ModulePermission_AllAllow = function (ctrlEvent) {
    var tree = ctrlEvent.o.OtherControl("PermissionTree_Tree");
    tree.SetAllCheckState("1");
}
InforCenter_Platform_ModulePermission_AllForbid = function (ctrlEvent) {
    var tree = ctrlEvent.o.OtherControl("PermissionTree_Tree");
    tree.SetAllCheckState("0");
}
InforCenter_Platform_ModulePermission_Save = function (ctrlEvent) {
    var tree = ctrlEvent.o.OtherControl("PermissionTree_Tree");
    var guid = ctrlEvent.o.OtherControl("TreeViewPage").id;
    var pageObject = HoteamUI.Page.Instance(guid);
    var orgTree = pageObject.GetControl("TreeView");
    var orgSelectNode = orgTree.GetSelectedNode();
    //组织结构ID
    var orgID = orgSelectNode.value1;
    //组织结构类型
    var orgType = orgSelectNode.value3;
    //
    if (orgType == "ORGANIZATION") {
        HoteamUI.UIManager.Popup("Confirm", { pageMode: "OK", message: HoteamUI.Language.Lang("ModulePermission.Err") });
        return;
    }
    var allow = tree.GetCheckNodes("1", false);
    var deny = tree.GetCheckNodes("0", false);

    var allowList = [];
    InforCenter_Platform_ModulePermission_GetPath(allow, allowList);
    allowStr = JSON.stringify(allowList);
    var denyList = [];
    InforCenter_Platform_ModulePermission_GetPath(deny, denyList);
    denyStr = JSON.stringify(denyList);
    var type = { OrgID: orgID, OrgType: orgType };
    var value = { Allow: allowStr, Deny: denyStr };

    var typeStr = JSON.stringify(type);
    var valueStr = JSON.stringify(value);

    var result = HoteamUI.DataService.Call("InforCenter.ModulePermission.ModulePermisssionService.SavePermission", { para: { type: typeStr, value: valueStr } });
    if (result == true) {
        HoteamUI.UIManager.Popup("Confirm", { pageMode: "OK", message: HoteamUI.Language.Lang("ModulePermission.Success") });
    } else {
        HoteamUI.UIManager.Popup("Confirm", { pageMode: "OK", message: HoteamUI.Language.Lang("ModulePermission.Failure") });
    }

}

InforCenter_Platform_ModulePermission_GetPath = function (allow, allowList) {
    if (allow && allow instanceof Array) {
        for (var i = 0, len = allow.length; i < len; i++) {
            var type = allow[i].value3;
            if (type != ModulePermission.NodeEnum.Navigation &&
                type != ModulePermission.NodeEnum.Tabs &&
                type != ModulePermission.NodeEnum.Menu) {
            }
            else {
                var path = allow[i].PermissionModulePath;
                var pathName = allow[i].PermissionModulePathName;
                allowList.push({ Type: type, Name: allow[i].value1, Path: path.join(';'), PathName: pathName.join(';'), NavigationID: path[path.length - 1] });
            }
        }
    }
}



InforCenter_Platform_ModulePermission_OnNodeChange = function (pageEvent) {
    InforCenter_Platform_ModulePermission_OrgTreeCommonOnClick(pageEvent.ctrl);
};
InforCenter_Platform_ModulePermission_OrgTreeCommonOnClick = function (ctrl) {
    var guid = $("[cid='PermissionTree_Tree']").attr("id");
    var permTree = HoteamUI.Control.Instance(guid);
    permTree.SetAllCheckState("2");

    var guidContainer = $("[cid='PermissionTree_Content']").attr("id");
    var permContainer = HoteamUI.Control.Instance(guidContainer);

    var orgID = ctrl.GetSelectedNode().value1;
    var orgType = ctrl.GetSelectedNode().value3;
    var type = { OrgID: orgID, OrgType: orgType };
    var typeStr = JSON.stringify(type);
    var coverid = $("[cid='ModulePermission_LayoutContainer']").attr("id");

    var callBack = function (permissonStr) {
        var permJson = JSON.parse(permissonStr);
        if (permissonStr != null) {
            var allNodes = ModulePermission.AllTreeNode;
            var moduleAllow = JSON.parse(permJson.Allow);
            var moduleDeny = JSON.parse(permJson.Deny);

            var allowNodes = [];
            var denyNodes = [];
            for (var nd = 0; nd < allNodes.length; nd++) {
                var node = allNodes[nd];
                for (var item = 0; item < moduleAllow.length; item++) {
                    if (moduleAllow[item].Path == node.PermissionModulePath.join(';')) {
                        allowNodes.push(node);
                        break;
                    }
                }

                for (var item = 0; item < moduleDeny.length; item++) {
                    if (moduleDeny[item].Path == node.PermissionModulePath.join(';')) {
                        denyNodes.push(node);
                        break;
                    }
                }
            }

            permTree.SetCheckState(allowNodes, "1");
            permTree.SetCheckState(denyNodes, "0");
        }
        HoteamUI.Window.WaitWindow.LayoutDestory(coverid);
    }

    HoteamUI.Window.WaitWindow.LayoutShow(coverid);
    HoteamUI.DataService.AsyncCall("InforCenter.ModulePermission.ModulePermisssionService.GetPermissionStr", { para: { type: typeStr, value: "" } }, callBack);
}
InforCenter_Platform_ModulePermission_OrgTreeOnClick = function (ctrlEvent) {
    InforCenter_Platform_ModulePermission_OrgTreeCommonOnClick(ctrlEvent.o);
}

InforCenter_Platform_ModulePermission_SetNodePermissionModulePath = function (permTree) {

    //处理所有节点
    var rootNodes = permTree.GetTreeRootNodes();
    var allNodes = [];
    for (i = 0; i < rootNodes.length; i++) {
        rootNodes[i].PermissionModulePath = [];
        rootNodes[i].PermissionModulePathName = [];
        rootNodes[i].PermissionModulePath.push(rootNodes[i].Value1);
        rootNodes[i].PermissionModulePathName.push(rootNodes[i].Text);
        allNodes.push(rootNodes[i]);
    }

    for (i = 0; i < allNodes.length; i++) {
        if (allNodes[i].children) {
            for (j = 0; j < allNodes[i].children.length; j++) {
                allNodes[i].children[j].PermissionModulePath = [];
                allNodes[i].children[j].PermissionModulePathName = [];
                if (allNodes[i].children[j].value3 == ModulePermission.NodeEnum.Navigation) {
                    allNodes[i].children[j].PermissionModulePath.push(allNodes[i].children[j].Value1);
                    allNodes[i].children[j].PermissionModulePathName.push(allNodes[i].children[j].Text);
                }
                else {
                    for (k = 0; k < allNodes[i].PermissionModulePath.length; k++) {
                        allNodes[i].children[j].PermissionModulePath.push(allNodes[i].PermissionModulePath[k]);
                        allNodes[i].children[j].PermissionModulePathName.push(allNodes[i].PermissionModulePathName[k]);
                    }
                    allNodes[i].children[j].PermissionModulePath.unshift(allNodes[i].children[j].Value1);
                    allNodes[i].children[j].PermissionModulePathName.unshift(allNodes[i].children[j].Text);
                }

                allNodes.push(allNodes[i].children[j]);
            }
        }
    }
    return allNodes;
}

Hoteam_Paltform_ModulePermission_Check = function () {
    if (HoteamUI.Common.IsNullOrEmpty(HoteamUI.Security.LoginPara.UserID) == false) {
        return true;
    }
    return false;
}

Hoteam_Paltform_ModulePermission_CallBack = function (ret) {
    if (ret) {
        var data = JSON.parse(ret);
        PlatformUI.Permission = data;

    }
}

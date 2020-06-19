MobileModulePermission = {};
MobileModulePermission.NodeEnum = {
    Menu: "DATA",
    Tabs: "TAB",
    Navigation: "PAGE"
}
MobileModulePermission.AllTreeNode = [];
InforCenter_MobilePlatform_ModulePermission_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = {};
    var treePage = HoteamUI.Page.InstanceIn(page.pid, "TreeViewPage", "TreeViewCtrl");
    var treeCtrl = treePage.GetControl("TreeView");
    pagePara.TreeGuid = treeCtrl.id;
    pagePara.TreeViewName = "ModulePermissionTreeView";
    pagePara.TreeQueryDataService = "InforCenter.Organization.OrganizationDataService.GetTreeQueryData";
    var treeData = InforCenter_Platform_TreeViewCtrl_LoadTreeView(treePage, pagePara);

    var data = HoteamUI.CallAjax.Call(MobilePlatformUI.WebServicePath, "GetMobilePermissionAllNode", {});
    if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
        var devTreeCtrl = page.GetControl('DevelopmentTree');
        devTreeCtrl.LoadNodes(null, data);
        MobileModulePermission.AllTreeNode = InforCenter_MobilePlatform_ModulePermission_SetNodePermissionModulePath(devTreeCtrl);
    }
    var leftContainer = page.GetControl("Left_Container");
    HoteamUI.Page.SetContainerParas(leftContainer.id, page.PageName(), pagePara);
}


InforCenter_MobilePlatform_ModulePermission_AllAllow = function (ctrlEvent) {
    var tree = ctrlEvent.o.OtherControl("DevelopmentTree");
    tree.SetAllCheckState("1");
}

InforCenter_MobilePlatform_ModulePermission_AllForbid = function (ctrlEvent) {
    var tree = ctrlEvent.o.OtherControl("DevelopmentTree");
    tree.SetAllCheckState("0");
}


InforCenter_MobilePlatform_ModulePermission_Reset = function (ctrlEvent) {
    var tree = ctrlEvent.o.OtherControl("DevelopmentTree");
    tree.SetAllCheckState("2");
}

InforCenter_MobilePlatform_ModulePermission_Save = function (ctrlEvent) {
    var tree = ctrlEvent.o.OtherControl("DevelopmentTree");
    var guid = ctrlEvent.o.OtherControl("TreeViewPage").id;
    var pageObject = HoteamUI.Page.Instance(guid);
    var orgTree = pageObject.GetControl("TreeView");
    var orgSelectNode = orgTree.GetSelectedNode();
    //组织结构ID
    var orgID = orgSelectNode.value1;
    //组织结构类型
    var orgType = orgSelectNode.value3;

    if (orgType == "ORGANIZATION") {
        HoteamUI.UIManager.Popup("Confirm", { pageMode: "OK", message: HoteamUI.Language.Lang("ModulePermission.Err") });
        return;
    }
    var allow = tree.GetCheckNodes("1", false);
    var deny = tree.GetCheckNodes("0", false);

    var allowList = [];
    InforCenter_MobilePlatform_ModulePermission_GetPath(allow, allowList);
    allowStr = JSON.stringify(allowList);
    var denyList = [];
    InforCenter_MobilePlatform_ModulePermission_GetPath(deny, denyList);
    denyStr = JSON.stringify(denyList);
    var type = { OrgID: orgID, OrgType: orgType };
    var value = { Allow: allowStr, Deny: denyStr };

    var typeStr = JSON.stringify(type);
    var valueStr = JSON.stringify(value);

    var result = HoteamUI.DataService.Call("InforCenter.MobilePlatform.MobilePermissionService.SavePermission", { para: { type: typeStr, value: valueStr } });
    if (result == true) {
        HoteamUI.UIManager.Popup("Confirm", { pageMode: "OK", message: HoteamUI.Language.Lang("ModulePermission.Success") });
    } else {
        HoteamUI.UIManager.Popup("Confirm", { pageMode: "OK", message: HoteamUI.Language.Lang("ModulePermission.Failure") });
    }
}


InforCenter_MobilePlatform_ModulePermission_GetPath = function (allow, allowList) {
    if (allow && allow instanceof Array) {
        for (var i = 0, len = allow.length; i < len; i++) {
            var type = allow[i].value3;
            var path = allow[i].PermissionModulePath;
            allowList.push({ Type: type, Name: allow[i].value1, Path: path.join(';'), NavigationID: path[path.length - 1] });
        }
    }
}


InforCenter_MobilePlatform_ModulePermission_SetNodePermissionModulePath = function (permTree) {

    //处理所有节点
    var rootNodes = permTree.GetTreeRootNodes();
    var allNodes = [];
    for (i = 0; i < rootNodes.length; i++) {
        rootNodes[i].PermissionModulePath = [];
        rootNodes[i].PermissionModulePath.push(rootNodes[i].Value1);
        allNodes.push(rootNodes[i]);
    }

    for (i = 0; i < allNodes.length; i++) {
        if (allNodes[i].children) {
            for (j = 0; j < allNodes[i].children.length; j++) {
                allNodes[i].children[j].PermissionModulePath = [];
                if (allNodes[i].children[j].value3 == MobileModulePermission.NodeEnum.Navigation) {
                    allNodes[i].children[j].PermissionModulePath.push(allNodes[i].children[j].Value1);
                }
                else {
                    for (k = 0; k < allNodes[i].PermissionModulePath.length; k++) {
                        allNodes[i].children[j].PermissionModulePath.push(allNodes[i].PermissionModulePath[k]);
                    }
                    allNodes[i].children[j].PermissionModulePath.unshift(allNodes[i].children[j].Value1);
                }

                allNodes.push(allNodes[i].children[j]);
            }
        }
    }
    return allNodes;
}

InforCenter_MobilePlatform_ModulePermission_OnNodeChange = function (pageEvent) {
    InforCenter_MobilePlatform_ModulePermission_OrgTreeCommonOnClick(pageEvent.ctrl);
}

InforCenter_MobilePlatform_ModulePermission_OrgTreeCommonOnClick = function (ctrl) {
    var guid = $("[cid='DevelopmentTree']").attr("id");
    var permTree = HoteamUI.Control.Instance(guid);
    permTree.SetAllCheckState("2");

    var guidContainer = $("[cid='TreeView_Container']").attr("id");
    var permContainer = HoteamUI.Control.Instance(guidContainer);

    var orgID = ctrl.GetSelectedNode().value1;
    var orgType = ctrl.GetSelectedNode().value3;
    var type = { OrgID: orgID, OrgType: orgType };
    var typeStr = JSON.stringify(type);
    var coverid = $("[cid='MobileModulePermission_LayoutContainer']").attr("id");

    var callBack = function (permissonStr) {
        var permJson = JSON.parse(permissonStr);
        if (permissonStr != null) {
            var allNodes = MobileModulePermission.AllTreeNode;
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
    HoteamUI.DataService.AsyncCall("InforCenter.MobilePlatform.MobilePermissionService.GetPermissionStr", { para: { type: typeStr, value: "" } }, callBack);
}
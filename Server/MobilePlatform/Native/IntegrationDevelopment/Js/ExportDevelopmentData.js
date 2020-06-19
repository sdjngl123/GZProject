InforCenter_MobliePlatform_ExportDevelopment_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();

    var data = null;
    $.each(TreeManagementScript, function (index, val) {
        if (val.Name == pagePara.ItemName)
            data = JSON.parse(JSON.stringify(val));
    });
    pagePara = $.extend(pagePara, data);

    var treeCtrl = page.GetControl("DevelopmentTree");
    var data = InforCenter_Platform_TreeViewCtrl_LoadRootData(treeCtrl, pagePara);
    if (data != null) {
        var rootNode = treeCtrl.GetTreeRootNodes();
        if (rootNode && rootNode.length > 0) {
            treeCtrl.SelectNode(rootNode[0]);
            data.TempObjectType = rootNode[0].value3;
            var treePageContainer = page.GetControl("TreeView_Container");
            if (data.FilterFlag) {
                pagePara.ParaList = data.FilterFlag;
            }
            HoteamUI.Page.SetContainerParas(page.pid, page.PageName(), pagePara);
            HoteamUI.UIManager.MergeUrl(data.TempObjectType, pagePara);
        }
    }
    return data;
}


InforCenter_MobliePlatform_ExportDevelopment_OnNodeChange = function (pageEvent) {

}


InforCenter_MobliePlatform_ExportDevelopment_LoadChildData = function (ctrlEvent) {
    var containerId = ctrlEvent.o.ContainerID();
    var node = ctrlEvent.treeNode;
    var page = HoteamUI.Page.Instance(containerId);
    var treeNodeData = InforCenter_MobliePlatform_ExportDevelopment_GetChildNode(page, ctrlEvent.o, node);
    InforCenter_Platform_TreeViewCtrl_LoadNodes(ctrlEvent.o, ctrlEvent.treeNode, treeNodeData);
}

InforCenter_MobliePlatform_ExportDevelopment_GetChildNode = function (page, treeCtrl, node) {
    var pagePara = page.GetPara();
    var data = null;
    $.each(TreeManagementScript, function (index, val) {
        if (val.Name == pagePara.ItemName)
            data = JSON.parse(JSON.stringify(val));
    });
    pagePara = $.extend(pagePara, data);
    var paraData = '';
    var pageLinksName = InforCenter_Platform_TreeManagement_GetTypeTabs(pagePara, node);
    if (!HoteamUI.Common.IsNullOrEmpty(pageLinksName)) {
        var linkData = InforCenter_Platform_GetTreeManagePageLinksByName(pageLinksName);
        if (linkData) {
            var dataArray = [];
            for (var index in linkData.PageLinks) {
                var pagelink = linkData.PageLinks[index];
                var tempData = {};
                tempData.Name = pagelink.Name;
                tempData.Text = pagelink.Text;
                tempData.PageName = pagelink.PageName;
                var paraData = pagelink.PagePara;
                if (typeof pagelink.PagePara == "string") {
                    paraData = JSON.parse(pagelink.PagePara);
                }
                var tempListData = {};
                if (pagelink.PageName == 'ListManagement') {
                    $.each(ListManagementListScript, function (index, val) {
                        if (val.Name == paraData.ItemName) {
                            tempListData = JSON.parse(JSON.stringify(val));
                            return;
                        }
                    });
                    tempData.ViewName = tempListData.ListViewName;
                } else if (pagelink.PageName == 'TreeManagement') {
                    $.each(TreeManagementScript, function (index, val) {
                        if (val.Name == paraData.ItemName)
                            tempListData = JSON.parse(JSON.stringify(val));
                    });
                    tempData.ViewName = tempListData.ListViewName;
                }
                dataArray.push(tempData);
            }
            paraData = JSON.stringify(dataArray);
        }
    }
    pagePara.ParaData = paraData;
    pagePara = $.extend(pagePara, data);
    var treeContainer = page.GetControl("TreeView_Container");
    HoteamUI.Page.SetContainerParas(treeContainer.id, "TreeView_Container", pagePara);
    return InforCenter_Platform_TreeViewCtrl_GetChildrenData(treeCtrl, node);
}
InforCenter_MobliePlatform_ExportDevelopment_OnOK = function (ctrlEvent) {
    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    var pagePara = page.GetPara();

    var treeCtrl = page.GetControl('DevelopmentTree');
    var nodes = treeCtrl.GetCheckNodes(1);
    var nodeIds = '';
    for (var index in nodes) {
        var curNode = nodes[index];
        if (curNode.value1.indexOf('|') < 0) {
            nodeIds += ';' + curNode.value1;
        }
        if (!curNode.children) {
            nodeIds += InforCenter_MobliePlatform_ExportDevelopment_GetChildNodeData(page, treeCtrl, curNode);
        }
    }
    if (page.GetControl('btnCheck').IsChecked()) {
        var nodes = treeCtrl.GetCheckNodes(2);
        for (var index in nodes) {
            var curNode = nodes[index];
            if (curNode.value1.indexOf('|') < 0) {
                nodeIds += ';' + curNode.value1;
            }
        }
    }
    if (nodeIds.length > 0) {
        var paras = { ObjectID: nodeIds.substr(1) };
        PlatformUI.UIManager.ExportFile.Call("InforCenter.Common.ObjectService.ExportTableRecords", paras, { filetype: "dbdata" });
    }
}

InforCenter_MobliePlatform_ExportDevelopment_GetChildNodeData = function (page, treeCtrl, pNode) {
    var ids = '';
    var data = InforCenter_MobliePlatform_ExportDevelopment_GetChildNode(page, treeCtrl, pNode);
    if (data && data.ChildData.length > 0) {
        InforCenter_Platform_TreeViewCtrl_LoadNodes(treeCtrl, pNode, data);
        var nodes = treeCtrl.GetChildrenNodes(pNode);
        for (var nIndex in nodes) {
            var curNode = nodes[nIndex];
            if (curNode.value1.indexOf('|') < 0) {
                ids += ';' + curNode.value1;
            }
            ids += InforCenter_MobliePlatform_ExportDevelopment_GetChildNodeData(page, treeCtrl, curNode);
        }
    }
    return ids;
}
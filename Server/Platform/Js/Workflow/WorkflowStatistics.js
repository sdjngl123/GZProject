InforCenter_Platform_WorkflowStatistics_RootNodeLoadRows = function (ctrlEvent) {
    var data = HoteamUI.DataService.Call("InforCenter.Common.WorkflowService.GetWorkflowStatistics", { para: { Type: "All" } });
    if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
        ctrlEvent.o.LoadGridRows(data);
    }
}
InforCenter_Platform_WorkflowStatistics_StartWorkflowLoadRows = function (ctrlEvent) {
    var data = HoteamUI.DataService.Call("InforCenter.Common.WorkflowService.GetWorkflowStatistics", { para: { Type: "Start" } });
    if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
        ctrlEvent.o.LoadGridRows(data);
    }
}
InforCenter_Platform_WorkflowStatistics_ResponsibleWorkflowLoadRows = function (ctrlEvent) {
    var data = HoteamUI.DataService.Call("InforCenter.Common.WorkflowService.GetWorkflowStatistics", { para: { Type: "Responsible" } });
    if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
        ctrlEvent.o.LoadGridRows(data);
    }
}


//流程任务模块名称链接响应方法（后续考虑移到指定模块）
InforCenter_Platform_ObjectManagement_WorkflowAttachInfoColumnLinkOnClick = function (ctrlEvent) {

    var listCtrl = ctrlEvent.o;
    var selectid = ctrlEvent.rowobject.EID;
    var rowName = ctrlEvent.rowobject.NAME;

    if (selectid != undefined && selectid.indexOf("WORKFLOWTASKINFO") != -1) {
        var pageContainer = listCtrl.OtherControl("ListView_Container");
        var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
        pagePara.rowobject = ctrlEvent.rowobject;
        var page = HoteamUI.Page.Instance(pagePara.PagePID);
        if (HoteamUI.Common.IsNullOrEmpty(pagePara.TreeGuid) == false) {
            var treePage = HoteamUI.Page.InstanceIn(pagePara.PagePID, "TreeViewPage", "TreeViewCtrl");
            var treeCtrl = treePage.GetControl("TreeView");
            var node = treeCtrl.GetSelectedNode();

            var selectnode = null;
            if (HoteamUI.Common.IsNullOrEmpty(node) == false && HoteamUI.Common.IsNullOrEmpty(selectid) == false) {
                var cnodes = treeCtrl.GetChildrenNodes(node);
                if (cnodes && cnodes.length > 0) {
                    for (var i in cnodes) {
                        var cnode = cnodes[i];
                        if (cnode.Value1 == selectid) {
                            selectnode = cnode;
                            break;
                        }
                    }
                }
                if (selectnode != null) {
                    treeCtrl.SelectNode(selectnode);
                    HoteamUI.Page.FireParentPageEvent(treePage.pid, 'OnNodeChange', { ctrl: treeCtrl });
                }
                else { //如果没有子节点，说明当前选中的节点是没有下级的，则进行加载此节点数据
                    var data = InforCenter_Platform_TreeViewCtrl_GetChildrenData(treeCtrl, node);
                    treeCtrl.LoadNodes(node, data.ChildData);
                    var nodes = treeCtrl.GetChildrenNodes(node);
                    if (nodes && nodes.length > 0) {
                        for (var i in nodes) {
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
    } else if (selectid.indexOf("WORKFLOWSTATIC") != -1) {
        var containerId = listCtrl.ContainerID();
        var pagePara = HoteamUI.Page.Instance(containerId).GetPara();
        if (HoteamUI.Common.IsNullOrEmpty(pagePara.TreeGuid) == false) {
            var treePage = HoteamUI.Page.InstanceIn(pagePara.PagePID, "TreeViewPage", "TreeViewCtrl");
            var treeCtrl = treePage.GetControl("TreeView");
            var node = treeCtrl.GetSelectedNode();

            if (HoteamUI.Common.IsNullOrEmpty(node) == false && HoteamUI.Common.IsNullOrEmpty(rowName) == false) {
                var cnodes = treeCtrl.GetChildrenNodes(node);
                var selectnode = null;
                if (cnodes && cnodes.length > 0) {
                    for (var i in cnodes) {
                        var cnode = cnodes[i];
                        if (cnode.Text.indexOf(rowName) == 0) {
                            selectnode = cnode;
                            break;
                        }
                    }
                    if (selectnode != null) {
                        treeCtrl.SelectNode(selectnode);
                        HoteamUI.Page.FireParentPageEvent(treePage.pid, 'OnNodeChange', { ctrl: treeCtrl });
                    }
                } else { //如果没有子节点，说明当前选中的节点是没有下级的，则进行加载此节点数据
                    var data = InforCenter_Platform_TreeViewCtrl_GetChildrenData(treeCtrl, node);
                    treeCtrl.LoadNodes(node, data.ChildData);
                    var nodes = treeCtrl.GetChildrenNodes(node);
                    if (nodes && nodes.length > 0) {
                        for (var i in nodes) {
                            var cnode = nodes[i];
                            if (cnode.Text.indexOf(rowName) == 0) {
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
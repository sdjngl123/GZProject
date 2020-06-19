InforCenter_Platform_FSContent_OnClick = function (ctrlEvent) {
    var listCtrl = ctrlEvent.o;
    var reqData = ctrlEvent.rowobject.RequestData;
    HoteamUI.UIManager.MsgBox("", reqData);
}

InforCenter_Platform_ServerNode_OnClick = function (ctrlEvent) {
    var listCtrl = ctrlEvent.o;
    var containerID = listCtrl.ContainerID();
    var pageId = HoteamUI.Control.Instance(containerID).ContainerID();
    var page = HoteamUI.Page.Instance(pageId);
    var pagePara = page.GetPara();
    var treeCtrl = HoteamUI.Control.Instance(pagePara.TreeGuid);
    if (treeCtrl.id != '') {
        var selectNode = treeCtrl.GetSelectedNode();
        var nodes = treeCtrl.GetChildrenNodes(selectNode);
        
        var newSelectNode = null;
        for (var i = 0; i < nodes.length; i++) {
            var curNode = nodes[i];
            if (curNode.text == ctrlEvent.rowobject.SERVERNODE) {
                newSelectNode = curNode;
                break;
            }
        }
        if (newSelectNode != null) {
            treeCtrl.SelectNode(newSelectNode);
            HoteamUI.Page.FireParentPageEvent(treeCtrl.ContainerID(), 'OnNodeChange', { ctrl: treeCtrl });
        }
    }

}
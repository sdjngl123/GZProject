InforCenter_Platform_ActionRule_MoveForTree = function (para) {
    var treeId = para && para[1].TreeID;
    var moveType = para && para[1].MoveType;
    if (treeId) {
        var treeCtrl = HoteamUI.Control.Instance(treeId);
        if (treeCtrl) {
            var selectedNode = treeCtrl.GetSelectedNode();
            var moveToNode, parentNode;
            if (selectedNode) {
                moveToNode = (moveType == "UP") ? treeCtrl.GetPreNode(selectedNode) : treeCtrl.GetNextNode(selectedNode);
                if (!moveToNode) {
                    var msg = (moveType == "UP") ? HoteamUI.Language.Lang("MenuItems", "AlreadyMoveToTop") : HoteamUI.Language.Lang("MenuItems", "AlreadyMoveToBottom");
                    HoteamUI.UIManager.MsgBox(msg, null, false);
                    return;
                }
                if (moveToNode.Value3 !== selectedNode.Value3) {
                    var msg = (moveType == "UP") ? HoteamUI.Language.Lang("MenuItems", "AlreadyMoveToTop") : HoteamUI.Language.Lang("MenuItems", "AlreadyMoveToBottom");
                    HoteamUI.UIManager.MsgBox(msg, null, false);
                    return;
                }
                if (selectedNode && moveToNode) {
                    var selectedNodeEid, moveToNodeEid, parentNodeEid, type;
                    selectedNodeEid = selectedNode.Value1;
                    moveToNodeEid = moveToNode.Value1;
                    type = selectedNode.Value3;
                    parentNodeEid = (type == "USERINFO") ? treeCtrl.GetParentNode(selectedNode).Value1 : null;
                    var movePara = { MoveObjectID: selectedNodeEid, MoveToObjectID: moveToNodeEid };
                    var result = HoteamUI.DataService.Call("InforCenter.Rule.RulePageService.MoveActionRule", { para: movePara });
                    if (result) {
                        return { confirm: "OK" };
                    }
                }
            }
        }
    }

}
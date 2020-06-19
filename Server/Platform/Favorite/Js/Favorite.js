Hoteam_InforCenter_FavoriteObject_OnMove = function (para) {
    var callback = function (data, ret) {
        if (ret) {
            var childObjID = data.ObjectID;
            var parentObjID = ret[0].EID;
            var treeCtrl = HoteamUI.Control.Instance(data.treeId);
            //删除原本的关系，添加新的关系，且新关系的顺序号要调整
            var result = HoteamUI.DataService.Call("Hoteam.InforCenter.FavoriteService.FavoriteFolderMoveToNewParent", { para: { PEID: parentObjID, CEID: childObjID, OldPEID: data.OldPEID } });
            if (result) {
                var nodes = treeCtrl.GetTreeRootNodes();
                var parentNode = Hoteam_InforCenter_FavoriteTree_FindNodeByObjectId(nodes, parentObjID);
                var oldParentNode = Hoteam_InforCenter_FavoriteTree_FindNodeByObjectId(nodes, data.OldPEID);
                if (!HoteamUI.Common.IsNullOrEmpty(oldParentNode) && oldParentNode.children != undefined) {
                    var childNode = Hoteam_InforCenter_FavoriteTree_FindNodeByObjectId(oldParentNode.children, childObjID);
                    if (!HoteamUI.Common.IsNullOrEmpty(childNode)) {
                        treeCtrl.RemoveNode(childNode);
                    }
                }
                if (parentNode != null) {
                    var data = InforCenter_Platform_TreeViewCtrl_GetChildrenData(treeCtrl, parentNode);
                    var childNodes = data.ChildData;
                    treeCtrl.ReplaceChildrenNodes(parentNode, childNodes);
                    treeCtrl.SelectNode(parentNode);
                    treeCtrl.ExpandNode(parentNode, true);
                    InforCenter_Platform_TreeManagement_OnNodeChange({ ctrl: treeCtrl });
                }
            } else {
                InforCenter_Platform_MenuCtrl_InnerReceiveServerData(para[0], { confirm: "OK" });
            }
        }
    }
    var page = HoteamUI.Page.Instance(para[0].ContainerID);
    var pagePara = page.GetPara();

    HoteamUI.UIManager.Popup('TreeCommonQuery', { ItemName: "FavoriteFolderQuery", SelectedFavoriteId: para[1].SelectID }, callback, { treeId: pagePara.TreeGuid, para: para[0], ObjectID: para[1].SelectID, OldPEID: para[1].OldPEID }, "800*560");
}

Hoteam_InforCenter_FavoriteTree_FindNodeByObjectId = function (nodes, NodeID) {
    var retNode = null;
    for (var i = 0; i < nodes.length; i++) {
        var curNode = nodes[i];
        if (curNode.Value1 == NodeID) {
            retNode = curNode;
            break;
        }
        if (curNode.children != undefined) {
            var findNode = Hoteam_InforCenter_FavoriteTree_FindNodeByObjectId(curNode.children, NodeID);
            if (findNode != null) {
                retNode = findNode;
                break;
            }
        }
    }
    return retNode;
}
Hoteam_InforCenter_FavoriteObject_OnFavorite = function (para) {
    //判断是否所选对象是否存在
    var selectID = para[1].SelectID;
    var allExist = true;
    if (selectID) {
        var ids = selectID.split(';');
        for (var i = 0; i < ids.length; i++) {
            var obj = InforCenter_Platform_Object_GetObjectData(ids[i]);
            if (obj == null || obj == undefined) {
                allExist = false;
                break;
            }
        }
    }
    if (allExist == false)
        return;
    var callback = function (data, ret) {
        if (ret) {
            var childObjID = data.ObjectID;
            var parentObjID = ret[0].EID;
            //删除原本的关系，添加新的关系，且新关系的顺序号要调整
            var result = HoteamUI.DataService.Call("Hoteam.InforCenter.FavoriteService.FavoriteObject", { para: { PEID: parentObjID, CEID: childObjID } });
            if (result) {
                var msg = HoteamUI.Language.Lang("Favorite", "FavoriteSuccess");
                HoteamUI.UIManager.MsgBox(msg, "", false);
                InforCenter_Platform_MenuCtrl_InnerReceiveServerData(data.para, { confirm: "OK" });
            }
        }
    }

    //添加右键新建和刷新菜单
    var ObjTypes = [];
    var objType1 = {};
    objType1.Name = "FAVORITE";
    objType1.MenuName = "FavoriteQueryTreeMenu";
    var objType2 = {};
    objType2.Name = "FAVORITEFOLDER";
    objType2.MenuName = "FavoriteQueryTreeMenu";
    ObjTypes.push(objType1);
    ObjTypes.push(objType2);

    HoteamUI.UIManager.Popup('TreeCommonQuery', { ItemName: "FavoriteQuery", ObjTypes: ObjTypes }, callback, { para: para[0], ObjectID: para[1].SelectID }, "315*515");
}
Hoteam_InforCenter_FavoriteTree_RefreshData = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = {};
    pagePara.TreeViewName = 'FavoriteShowTreeView';
    var treeCtrl = page.GetControl("FavoriteTreeView");
    InforCenter_Platform_TreeViewCtrl_LoadRootData(treeCtrl, pagePara);
    HoteamUI.Page.SetContainerParas(page.pid, page.PageName(), pagePara);
    var treeContainer = page.GetControl("TreeView_Container");
    HoteamUI.Page.SetContainerParas(treeContainer.id, page.PageName(), pagePara);
}
Hoteam_InforCenter_FavoriteTree_OnCreate = function (pageEvent) {
    Hoteam_InforCenter_FavoriteTree_RefreshData(pageEvent);
    var page = pageEvent.o;
    var tree = page.GetControl('FavoriteTreeView');
    var pagePara = {};
    var para = { para: {} };
    var data = HoteamUI.DataService.Call("Hoteam.InforCenter.FavoriteService.GetFavoriteObjectTypes", para);
    pagePara.ObjTypes = [];
    for (var i = 0; i < data.length; i++) {
        pagePara.ObjTypes.push({ Name: data[i], MenuName: "FavoriteShowMenu" });
    }
    //pagePara.MenuName = 'FavoriteShowMenu';
    //pagePara.ObjTypes = [{ Name: "FAVORITEFOLDER", MenuName: "FavoriteShowMenu" }, { Name: "FAVORITE", MenuName: "FavoriteShowMenu" }];
    InforCenter_Platform_MenuCtrl_LoadRightMenus(page, pagePara, tree);
}

Hoteam_InforCenter_FavoriteTree_OnNodeDblClick = function (ctrlEvent) { 
    var favoriteObjId = ctrlEvent.GetSelectedNode().value1;
    if (InforCenter_Platform_GTypeFromID(favoriteObjId) == "") {
        return;
    }

    //权限判断
    var check = HoteamUI.DataService.Call('InforCenter.Common.WebActionService.CheckActionPermission', { para: { ActionType: "AUTO", ActionName: "BROWSE", SelectID: favoriteObjId } });
    if (check == null) {
        return;
    }

    var para = HoteamUI.Page.GetContainerPara(ctrlEvent.ContainerID());
    var data = InforCenter_Platform_Object_GetObjectData(favoriteObjId, para);
    var paras = {};
    paras.Data = data;
    paras.ObjectID = paras.TabId = paras.SelectID = favoriteObjId;

    var objectType = InforCenter_Platform_GTypeFromID(paras.ObjectID);

    var customObjectType = "";
    if (objectType == "PMTASK") {
        var data = InforCenter_Platform_Object_GetObjectData(paras.ObjectID, null);
        customObjectType = data.TASKTYPE;
    }

    paras.ObjectType = HoteamUI.Common.IsNullOrEmpty(customObjectType) ? objectType : customObjectType;
    var objectInspectorConfig = null;
    $.each(ObjectInspectorsScript, function (index, val) {
        if (val.ObjectType == paras.ObjectType)
            objectInspectorConfig = JSON.parse(JSON.stringify(val));
    });
    if (objectInspectorConfig != null) {
        if (data.EUID)
            paras.SelectEUID = data.EUID;
        paras.ObjectInspectorConfig = objectInspectorConfig;
        InforCenter_Platform_ObjectInspector_AddMainTab(paras);
    }
}

Hoteam_InforCenter_FavoriteTree_OnExpandLoad = function (ctrlEvent) {
    var node = ctrlEvent.treeNode;
    if (HoteamUI.Common.IsNullOrEmpty(node) == false) {
        var pageContainer = ctrlEvent.o.OtherControl("FavoriteTreeView");
        var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.ContainerID());
        var para = { para: { TreeViewName: pagePara.TreeViewName } };
        para.para.Text = node.text;
        para.para.Value1 = node.value1;
        para.para.Value2 = node.value2;
        para.para.Value3 = node.value3;
        para.para.Value4 = node.value4;
        para.para.Value5 = node.value5;
        var returnData = InforCenter_Platform_MenuCtrl_GetParameters(pagePara, pagePara, null, node);
        returnData = JSON.stringify(returnData);
        para.para.ParaList = returnData;
        var data = HoteamUI.DataService.Call("InforCenter.Common.WebTreeViewService.GetTreeChildData", para);
        InforCenter_Platform_TreeViewCtrl_LoadNodes(ctrlEvent.o, node, data);
    }
};


//列表页面加载事件
InforCenter_Platform_TreeViewCtrl_LoadTreeView = function (treePage, pagePara) {
    var objType = null;
    var treeCtrl = treePage.GetControl("TreeView");
    if (pagePara.TreeOptions) {
        treeCtrl.ReInitTree(pagePara.TreeOptions);
    }

    var data = InforCenter_Platform_TreeViewCtrl_LoadRootData(treeCtrl, pagePara);
    if (data != null) {
        var rootNode = treeCtrl.GetTreeRootNodes();
        if (rootNode && rootNode.length > 0) {
            treeCtrl.SelectNode(rootNode[0]);
            data.TempObjectType = rootNode[0].value3;
            var treePageContainer = treePage.GetControl("TreeView_Container");
            if (data.FilterFlag) {
                pagePara.ParaList = data.FilterFlag;
            }
            HoteamUI.Page.SetContainerParas(treePageContainer.id, "TreeViewCtrl", pagePara);
            HoteamUI.UIManager.MergeUrl(data.TempObjectType, pagePara);
        }

        //右键

        /*\ pagePara
        |*  {
        |*    ObjTypes: [
        |*                  {MenuName:"xxx",Name:"xxxx",PageLinksName:"xxx"}   
        |*              ]
        |*    RightMenu: null
        |*  }
        \*/
        InforCenter_Platform_TreeViewCtrl_SetRightMenu(treePage, pagePara);
    }

    return data;
};

InforCenter_Platform_TreeViewCtrl_OnNodeDblClick = function (ctrlEvent) {
    HoteamUI.Page.FireParentPageEvent(ctrlEvent.ContainerID(), 'OnNodeDblClick', ctrlEvent);
}

InforCenter_Platform_TreeViewCtrl_SetRightMenu = function (treePage, pagePara) {
    var rightMenuCtrl = treePage.GetControl("RightMenu");
    var treeCtrl = treePage.GetControl("TreeView");
    var ObjTypes = pagePara.ObjTypes;
    var rightmenudata;
    var rightmenuid = rightMenuCtrl.id + "_RightMenu";
    var hasRightMenu = false;
    rightMenuCtrl.RemoveAllItems();
    if (ObjTypes && ObjTypes.length > 0) {

        for (var i = 0; i < ObjTypes.length; i++) {
            var objType = ObjTypes[i];
            if (objType.MenuName) {
                rightmenudata = InforCenter_Platform_GetMenus(objType.MenuName, treePage, { ObjType: objType.Name }).Menus;
                rightMenuCtrl.LoadItems(rightmenudata, objType.Name, objType.MenuName);
                hasRightMenu = true;
            }
        }
    }
    //    if (pagePara.MenuName) {
    //        rightmenudata = InforCenter_Platform_GetMenus(pagePara.MenuName);
    //        rightMenuCtrl.LoadItems(rightmenudata, "", pagePara.MenuName);
    //        hasRightMenu = true;
    //    }
    if (hasRightMenu) {
        treeCtrl.SetTreeRightMenu(rightmenuid);
        var rightmenuContainer = treePage.GetControl("RightMenu_Container");
        HoteamUI.Page.SetContainerParas(rightmenuContainer.id, "RightMenuCtrl", pagePara);
    }

}

InforCenter_Platform_TreeViewCtrl_LoadRootData = function (ctrl, pagePara) {
    var data = null;
    if (pagePara.TreeViewName || pagePara.TreeRootDataService || pagePara.TreeAllDataService) {

        var rootDataService = "";
        if (!(pagePara.IsLoadAllData === undefined) && pagePara.IsLoadAllData == true) {
            rootDataService = "InforCenter.Common.WebTreeViewService.GetTreeAllData";
            if (HoteamUI.Common.IsNullOrEmpty(pagePara.TreeAllDataService) == false) {
                rootDataService = pagePara.TreeAllDataService;
            }
        }
        else {
            rootDataService = "InforCenter.Common.WebTreeViewService.GetTreeRootData";
            if (HoteamUI.Common.IsNullOrEmpty(pagePara.TreeRootDataService) == false) {
                rootDataService = pagePara.TreeRootDataService;
            }
        }
        var sParaList = JSON.stringify(pagePara);
        var para = { para: { TreeViewName: pagePara.TreeViewName, ParaList: sParaList } };
        if (pagePara.IsMultiLevel) {
            para.para.IsMultiLevel = pagePara.IsMultiLevel;

        }

        para.para.OnlyQuery = "true";
        if (HoteamUI.Common.IsNullOrEmpty(pagePara.OnlyQuery) == false) {
            para.para.OnlyQuery = pagePara.OnlyQuery;
        }
        var data = HoteamUI.DataService.Call(rootDataService, para);
        if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
            if (!(pagePara.IsLoadAllData === undefined) && pagePara.IsLoadAllData == true) {
                ctrl.LoadNodes(null, data);
            }
            else {
                ctrl.LoadNodes(null, data.RootData);
            }
        }
    }

    //刷新树节点数量
    InforCenter_Platform_TreeViewCtrl_AsyncLoadNodeCount(ctrl, data, pagePara);
    return data;
};

InforCenter_Platform_TreeViewCtrl_AsyncLoadNodeCount = function (treeCtrl, data, pagePara, isChildData) {
    if (data != null) {
        var nodeData = [];
        var tmpNodeData = [];
        //获取所有节点数据
        if (!(pagePara.IsLoadAllData === undefined) && pagePara.IsLoadAllData == true) {
            tmpNodeData = data;
        }
        else if (isChildData === true) {
            tmpNodeData = data.ChildData;
        } else {
            tmpNodeData = data.RootData;
        }
        if (tmpNodeData) {
            for (var i = 0; i < tmpNodeData.length; i++) {
                nodeData.push(tmpNodeData[i]);
            }
            for (var i = 0; i < nodeData.length; i++) {
                if (nodeData[i].Children && nodeData[i].Children instanceof Array) {
                    for (var j = 0; j < nodeData[i].Children.length; j++) {
                        nodeData.push(nodeData[i].Children[j]);
                    }
                }
            }
        }

        InforCenter_Platform_TreeViewCtrl_RefreshAsyncLoadNodeCount(treeCtrl, nodeData, true, pagePara);
    }
}

InforCenter_Platform_TreeViewCtrl_RefreshAsyncLoadNodeCount = function (treeCtrl, nodeData, isInit, initPara) {
    var pageContainer = treeCtrl.OtherControl("TreeView_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
    if (isInit == true && initPara) {
        pagePara = initPara;
    }

    //刷新节点文本
    var callBack = function (dataRet, callPara) {
        if (HoteamUI.Common.IsNullOrEmpty(dataRet) == false) {
            var nds = treeCtrl.GetNodesByParam("value1", callPara.Value1);
            for (var i = 0; i < nds.length; i++) {
                nds[i].text = nds[i].name = callPara.Text + dataRet;
                treeCtrl.UpdateNode(nds[i]);
            }
        }
    };

    //遍历处理节点的数量
    for (var i = 0; i < nodeData.length; i++) {
        var node = nodeData[i];
        if (node.Value6 == "true") {
            var para = { para: { TreeViewName: pagePara.TreeViewName } };
            para.para.Text = node.text;
            para.para.Value1 = node.value1 == null ? node.Value1 : node.value1;
            para.para.Value2 = node.value2 == null ? node.Value2 : node.value2;
            para.para.Value3 = node.value3 == null ? node.Value3 : node.value3;
            para.para.Value4 = node.value4 == null ? node.Value4 : node.value4;
            para.para.Value5 = node.value5 == null ? node.Value5 : node.value5;
            para.para.Value6 = node.value6 == null ? node.Value6 : node.value6;
            var returnData = InforCenter_Platform_MenuCtrl_GetParameters(pagePara, pagePara, null, node);
            returnData = JSON.stringify(returnData);
            para.para.ParaList = returnData;
            var service = "InforCenter.Common.WebTreeViewService.GetTreeNodeChildCount";
            if (HoteamUI.Common.IsNullOrEmpty(pagePara.TreeCountDataService) == false) {
                service = pagePara.TreeCountDataService;
            }
            HoteamUI.DataService.AsyncCall(service, para, callBack, node);
        }
    }
}

//树节点展开自定义事件
InforCenter_Platform_TreeViewCtrl_OnExpand = function (ctrlEvent) {
    // HoteamUI.Page.FireParentPageEvent(ctrlEvent.ContainerID(), 'OnExpand', ctrlEvent);
}
InforCenter_Platform_TreeViewCtrl_OnBeforeExpand = function (ctrlEvent) {
    var node = ctrlEvent.treeNode;
    if (node.children && node.children.length > 0) {
        var treeCtrl = ctrlEvent.o;
        var permission = InforCenter_Platform_TreeViewCtrl_GetTreeNodeExpandPermission(treeCtrl, node);
        node.ContentPermission = permission;
        if (permission == false) {
            treeCtrl.ExpandNode(node, false);
            var msg = HoteamUI.Language.Lang("Platform", "NoPermissionExpandCurrentTreeNode");
            HoteamUI.UIManager.MsgBox(msg);
            return false;
        }
        return true;
    }
}
InforCenter_Platform_TreeViewCtrl_OnExpandLoad = function (ctrlEvent) {
    var node = ctrlEvent.treeNode;
    var data = InforCenter_Platform_TreeViewCtrl_GetChildrenData(ctrlEvent.o, node);
    InforCenter_Platform_TreeViewCtrl_LoadNodes(ctrlEvent.o, node, data);
    //HoteamUI.Page.FireParentPageEvent(ctrlEvent.o.ContainerID(), 'OnNodeChange', { ctrl: ctrlEvent.o });
};
InforCenter_Platform_TreeViewCtrl_LoadNodes = function (treeCtrl, currentNode, data, refresh) {
    var nodeData = [];
    if (data instanceof Array) {
        nodeData = data;
        //如果是刷新的方式，则采用节点替换模式，避免重复打开关闭节点 sjf 2019-9-4
        if (refresh) {
            treeCtrl.ReplaceChildrenNodes(currentNode, data);
        }
        else {
            treeCtrl.LoadNodes(currentNode, data);
        }
        //End sjf 2019-9-4
    }
    else {
        nodeData = data.ChildData;
        currentNode.ContentPermission = data.ExpandPermission;
        if (data.ExpandPermission) {
            //如果是刷新的方式，则采用节点替换模式，避免重复打开关闭节点 sjf 2019-9-4
            if (refresh) {
                treeCtrl.ReplaceChildrenNodes(currentNode, data.ChildData);
            }
            else {
                treeCtrl.LoadNodes(currentNode, data.ChildData);
            }
            //End sjf 2019-9-4
        }
        else {
            treeCtrl.ExpandNode(currentNode, false);
            var msg = HoteamUI.Language.Lang("Platform", "NoPermissionExpandCurrentTreeNode");
            HoteamUI.UIManager.MsgBox(msg);
        }
    }

    if (currentNode.getParentNode() == null)
        //根节点
        InforCenter_Platform_TreeViewCtrl_RefreshAsyncLoadNodeCount(treeCtrl, nodeData, false);
};

InforCenter_Platform_TreeViewCtrl_ReplaceChildrenNodes = function (treeCtrl, parentTreeNode, data) {
    if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
        var nodeData = [];
        if (data instanceof Array) {
            nodeData = data;
            treeCtrl.ReplaceChildrenNodes(parentTreeNode, data);
        }
        else {
            nodeData = data.ChildData;
            if (data.ExpandPermission) {
                treeCtrl.ReplaceChildrenNodes(parentTreeNode, data.ChildData);
                treeCtrl.ExpandNode(parentTreeNode, true);
            }
            else {
                treeCtrl.ExpandNode(parentTreeNode, false);
                var msg = HoteamUI.Language.Lang("Platform", "NoPermissionExpandCurrentTreeNode");
                HoteamUI.UIManager.MsgBox(msg);
            }
        }

        if (parentTreeNode.getParentNode() == null)
            //根节点
            InforCenter_Platform_TreeViewCtrl_RefreshAsyncLoadNodeCount(treeCtrl, nodeData, false);
    } else {
        treeCtrl.ReplaceChildrenNodes(parentTreeNode, []);
    }
};

//树节点自定义点击事件
//树节点自定义点击事件
InforCenter_Platform_TreeViewCtrl_GetChildrenData = function (ctrl, node, dataService) {
    if (HoteamUI.Common.IsNullOrEmpty(node) == false) {
        var pageContainer = ctrl.OtherControl("TreeView_Container");
        var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
        var para = {
            para: {
                TreeViewName: pagePara.TreeViewName
            }
        };
        para.para.OnlyQuery = "true";
        if (HoteamUI.Common.IsNullOrEmpty(pagePara.OnlyQuery) == false) {
            para.para.OnlyQuery = pagePara.OnlyQuery;
        }
        para.para.Text = node.text;
        para.para.Value1 = node.value1 == null ? node.Value1 : node.value1;
        para.para.Value2 = node.value2 == null ? node.Value2 : node.value2;
        para.para.Value3 = node.value3 == null ? node.Value3 : node.value3;
        para.para.Value4 = node.value4 == null ? node.Value4 : node.value4;
        para.para.Value5 = node.value5 == null ? node.Value5 : node.value5;
        var returnData = InforCenter_Platform_MenuCtrl_GetParameters(pagePara, pagePara, null, node);
        returnData = JSON.stringify(returnData);
        para.para.ParaList = returnData;

        var childDataService = "InforCenter.Common.WebTreeViewService.GetTreeChildData";
        if (HoteamUI.Common.IsNullOrEmpty(pagePara.TreeChildDataService) == false) {
            childDataService = pagePara.TreeChildDataService;
        }

        var nodeObjectType;
        if (HoteamUI.Common.IsNullOrEmpty(para.para.Value5) == false) {
            nodeObjectType = para.para.Value5;
        } else if (HoteamUI.Common.IsNullOrEmpty(para.para.Value3) == false) {
            nodeObjectType = para.para.Value3;
        }

        if (nodeObjectType && pagePara.ObjTypes) {
            $.each(pagePara.ObjTypes, function (i, val) {
                if (val.Name == nodeObjectType) {
                    if (HoteamUI.Common.IsNullOrEmpty(val.TreeChildDataService) == false) {
                        childDataService = val.TreeChildDataService;
                        return false;
                    }
                }
            });
        }

        if (dataService) {
            childDataService = dataService;
        }
        var data = HoteamUI.DataService.Call(childDataService, para);
        InforCenter_Platform_TreeViewCtrl_AsyncLoadNodeCount(ctrl, data, pagePara, true);
    }
    return data;
};

//树节点自定义点击事件
InforCenter_Platform_TreeViewCtrl_OnClick = function (ctrlEvent) {
    var pageContainer = ctrlEvent.o.OtherControl("TreeView_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
    //上次选中的树节点   
    var needRefresh = false;
    var lastestNode = pagePara.LastestTreeNode;
    if (HoteamUI.Common.IsNullOrEmpty(lastestNode) == false) {
        if (lastestNode.tId != ctrlEvent.treeNode.tId) {
            needRefresh = true;
        }
    }
    else {
        needRefresh = true;
    }

    if (needRefresh) {
        pagePara.LastestTreeNode = ctrlEvent.treeNode;
        HoteamUI.Page.SetContainerParas(pageContainer.id, pagePara);
        HoteamUI.Page.FireParentPageEvent(ctrlEvent.o.ContainerID(), 'OnNodeChange', { ctrl: ctrlEvent.o });
    }

    if (pagePara.TreeNodeOnClick) {
        HoteamUI.Common.ExeFunction(pagePara.TreeNodeOnClick, ctrlEvent);
    }
};

InforCenter_Platform_TreeViewCtrl_GetTreeNodeExpandPermission = function (ctrl, node) {
    if (HoteamUI.Common.IsNullOrEmpty(node) == false) {
        var pageContainer = ctrl.OtherControl("TreeView_Container");
        var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
        var dataService = "InforCenter.Common.WebTreeViewService.GetTreeNodeExpandPermission";

        var para = { para: { TreeViewName: pagePara.TreeViewName } };
        para.para.Text = node.text;
        para.para.Value1 = node.value1;
        para.para.Value2 = node.value2;
        para.para.Value3 = node.value3;
        para.para.Value4 = node.value4;
        para.para.Value5 = node.value5;
        para.para.ExpandAction = pagePara.TreeExpandAction;
        var data = HoteamUI.DataService.Call(dataService, para);
    }
    return data;
};

//删除及刷新父节点，刷新树结构及tab页
InforCenter_Platform_TreeViewCtrl_RefreshParentStructureAndTab = function (treeGuid) {
    var ctrl = InforCenter_Platform_TreeViewCtrl_RefreshParentStructure(treeGuid);
    HoteamUI.Page.FireParentPageEvent(ctrl.ContainerID(), 'OnNodeChange', { ctrl: ctrl });
};
//刷新根节点树结构及tab页
InforCenter_Platform_TreeViewCtrl_RefreshRootStructureAndTab = function (treeGuid) {
    var ctrl = InforCenter_Platform_TreeViewCtrl_RefreshRootStructure(treeGuid);
    HoteamUI.Page.FireParentPageEvent(ctrl.ContainerID(), 'OnNodeChange', { ctrl: ctrl });
};
//Update刷新树节点
InforCenter_Platform_TreeViewCtrl_RefreshCurrentStructureAndTab = function (treeGuid) {
    var ctrl = InforCenter_Platform_TreeViewCtrl_RefreshCurrentStructure(treeGuid);
    HoteamUI.Page.FireParentPageEvent(ctrl.ContainerID(), 'OnNodeChange', { ctrl: ctrl });
};
//Update刷新树节点
InforCenter_Platform_TreeViewCtrl_RefreshParentStructure = function (treeGuid) {
    var ctrl = HoteamUI.Control.Instance(treeGuid);
    var treeNode = ctrl.GetSelectedNode();
    //var nodeCount = ctrl.
    var selectedNodeId = treeNode.Value1;
    var selectedNodeIndex = treeNode.getIndex();

    if (treeNode) {
        var parentTreeNode = ctrl.GetParentNode(treeNode);
        if (parentTreeNode) {
            //加载前的个数
            var nodeCount = ctrl.GetChildrenNodes(parentTreeNode);

            var data = InforCenter_Platform_TreeViewCtrl_GetChildrenData(ctrl, parentTreeNode);
            InforCenter_Platform_TreeViewCtrl_LoadNodes(ctrl, parentTreeNode, data, true);

            //选定指定节点
            var childNodes = ctrl.GetChildrenNodes(parentTreeNode);
            if (childNodes && childNodes.length > 0) {


                var exist = false;
                for (var i = 0; i < childNodes.length; i++) {
                    //根节点的value1不会相同(处理上移下移)
                    if (childNodes[i].Value1 == selectedNodeId) {
                        ctrl.SelectNode(childNodes[i]);
                        exist = true;
                        break;
                    }
                }
                if (exist == false) {
                    if (nodeCount > childNodes) {
                        //刷新后比原来的数据少时
                        if (selectedNodeIndex == 0) {
                            //如果移除的是第一个，刷新后应当选中第一个
                            ctrl.SelectNode(childNodes[0]);
                        }
                        else {
                            ctrl.SelectNode(childNodes[selectedNodeIndex - 1]);
                        }
                    }
                    else {
                        //刷新后比原来的数据多或者相等时，选中当前
                        ctrl.SelectNode(childNodes[selectedNodeIndex]);
                    }
                }

                HoteamUI.Page.FireParentPageEvent(ctrl.ContainerID(), 'OnNodeChange', {
                    ctrl: ctrl
                });
            }
            else {
                ctrl.SelectNode(parentTreeNode);
            }
        }
        else {
            var pageContainer = ctrl.OtherControl("TreeView_Container");
            var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
            var data = InforCenter_Platform_TreeViewCtrl_LoadRootData(ctrl, pagePara);
            var rootNode = ctrl.GetTreeRootNodes();
            if (rootNode && rootNode.length > 0) {
                //for (var i in rootNode) {
                for (var i = 0; i < rootNode.length; i++) {
                    //根节点的value1不会相同
                    if (rootNode[i].Value1 == treeNode.Value1) {
                        ctrl.SelectNode(rootNode[i]);
                    }
                }

            }
        }
    }
    return ctrl;
};
//Update刷新树节点
InforCenter_Platform_TreeViewCtrl_RefreshRootStructure = function (treeGuid) {
    var ctrl = HoteamUI.Control.Instance(treeGuid);
    var treeNodes = ctrl.GetTreeRootNodes();
    if (treeNodes.length > 0) {
        var pageContainer = ctrl.OtherControl("TreeView_Container");
        var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
        var data = InforCenter_Platform_TreeViewCtrl_LoadRootData(ctrl, pagePara);
        var rootNode = ctrl.GetTreeRootNodes();
        if (rootNode && rootNode.length > 0) {
            ctrl.SelectNode(rootNode[0]);
        }
    }
    return ctrl;
};
//Update刷新树节点
InforCenter_Platform_TreeViewCtrl_RefreshCurrentStructure = function (treeGuid) {
    var ctrl = HoteamUI.Control.Instance(treeGuid);
    var treeNode = ctrl.GetSelectedNode();
    if (treeNode) {
        var data = InforCenter_Platform_TreeViewCtrl_GetChildrenData(ctrl, treeNode);
        InforCenter_Platform_TreeViewCtrl_ReplaceChildrenNodes(ctrl, treeNode, data);
    }
    return ctrl;
};

InforCenter_Platform_TreeViewCtrl_RefreshCurrentStructCount = function (treeGuid, isRoot) {
    var ctrl = HoteamUI.Control.Instance(treeGuid);
    var treeNode = ctrl.GetSelectedNode();
    var nodes = [];
    if (isRoot == true) {
        var rootNodes = ctrl.GetTreeRootNodes();
        for (var i = 0; i < rootNodes.length; i++) {
            var rootNode = rootNodes[i];
            nodes.push(rootNode);

            var childNodes = ctrl.GetChildrenNodes(rootNode);
            for (var j = 0; j < childNodes.length; j++) {
                nodes.push(childNodes[j]);
            }
        }
    }
    else {
        nodes.push(treeNode);
    }

    InforCenter_Platform_TreeViewCtrl_RefreshAsyncLoadNodeCount(ctrl, nodes, false);
    return ctrl;
};

//下一个
InforCenter_Platform_TreeViewCtrl_Next = function (treeGuid) {
    //获取树控件
    var treeCtrl = HoteamUI.Control.Instance(treeGuid);
    var pageContainer = treeCtrl.OtherControl("TreeView_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
    if (pagePara.IsLoadAllData) {
        var findNodes = treeCtrl.GetLikeNodesByParam("Text", pagePara.SearchText);
        var currentNode = treeCtrl.GetSelectedNode();
        var node = InforCenter_Platform_TreeViewCtrl_FindNodeFromFilter(findNodes, 'NEXT', currentNode);
        treeCtrl.SelectNode(node);
        return;
    }
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.SearchData) == true)
        return;
    var treeCtrl = HoteamUI.Control.Instance(pagePara.TreeGuid);
    var startNode = treeCtrl.GetLikeNodesByParam("tId", pagePara.SearchNodeID)[0];
    var currentPath = InforCenter_Platform_TreeViewCtrl_GetSelectNodePath(treeCtrl, startNode);
    if (HoteamUI.Common.IsNullOrEmpty(currentPath) == true)
        return;
    while (currentPath != null) {
        currentPath = InforCenter_Platform_TreeViewCtrl_SelectNext(treeCtrl, startNode, pagePara.SearchData, currentPath);
    }

};
InforCenter_Platform_TreeViewCtrl_SelectNext = function (treeCtrl, startNode, data, currentPath) {
    var nextPath = "";
    //查找下一个
    for (var i = 0; i < data.length; i++) {
        var dataitem = data[i];
        if (i == data.length - 1) {
            break;
        }
        if (dataitem == currentPath) {
            nextPath = data[i + 1];
            break;
        }
    }
    //判断是否是最后一个
    if (nextPath == "") {
        var para = { pageMode: "OK", context: "Platform", labelName: "WasTheLastOne" }
        HoteamUI.UIManager.Popup("Confirm", para);
        return;
    }
    //切换到下一个节点
    return InforCenter_Platform_TreeViewCtrl_SelectTreeNode(treeCtrl, startNode, nextPath);
};
//上一个
InforCenter_Platform_TreeViewCtrl_Previous = function (treeGuid) {
    var treeCtrl = HoteamUI.Control.Instance(treeGuid);
    var node = treeCtrl.GetSelectedNode();
    if (HoteamUI.Common.IsNullOrEmpty(node) == true) {
        var para = { pageMode: "OK", context: "Platform", labelName: "PleaseSelectStartNode" }
        HoteamUI.UIManager.Popup("Confirm", para);
        return;
    }

    //获取树控件
    var pageContainer = treeCtrl.OtherControl("TreeView_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);

    if (pagePara.IsLoadAllData) {
        var findNodes = treeCtrl.GetLikeNodesByParam("Text", pagePara.SearchText);
        node = InforCenter_Platform_TreeViewCtrl_FindNodeFromFilter(findNodes, 'PREVIOUS', node);
        treeCtrl.SelectNode(node);
        return;
    }

    var parentNode = treeCtrl.GetParentNode(node);
    if (HoteamUI.Common.IsNullOrEmpty(parentNode) == true) {
        var para = { pageMode: "OK", context: "Platform", labelName: "IsRootUnableQuery" }
        HoteamUI.UIManager.Popup("Confirm", para);
        return;
    }


    if (HoteamUI.Common.IsNullOrEmpty(pagePara.SearchData) == true)
        return;
    var startNode = treeCtrl.GetLikeNodesByParam("tId", pagePara.SearchNodeID)[0];
    var currentPath = InforCenter_Platform_TreeViewCtrl_GetSelectNodePath(treeCtrl, startNode);
    if (HoteamUI.Common.IsNullOrEmpty(currentPath) == true)
        return;
    while (currentPath != null) {
        currentPath = InforCenter_Platform_TreeViewCtrl_SelectPrevious(treeCtrl, startNode, pagePara.SearchData, currentPath);
    }
};
InforCenter_Platform_TreeViewCtrl_SelectPrevious = function (treeCtrl, startNode, data, currentPath) {
    var previousPath = "";
    //查找上一个
    for (var i = data.length - 1; i >= 0; i--) {
        var dataitem = data[i];
        if (i == 0) {
            break;
        }
        if (dataitem == currentPath) {
            previousPath = data[i - 1];
            break;
        }
    }
    //判断是否是第一个
    if (previousPath == "") {
        var para = { pageMode: "OK", context: "Platform", labelName: "WasTheFirstOne" }
        HoteamUI.UIManager.Popup("Confirm", para);
        return;
    }
    //切换到上一个节点
    return InforCenter_Platform_TreeViewCtrl_SelectTreeNode(treeCtrl, startNode, previousPath);
};
//全部展开
InforCenter_Platform_TreeViewCtrl_ExpandAll = function (treeGuid) {
    var treeCtrl = HoteamUI.Control.Instance(treeGuid);
    var node = treeCtrl.GetSelectedNode();
    if (HoteamUI.Common.IsNullOrEmpty(node) == false) {
        if (node.open == false) {
            var pageContainer = treeCtrl.OtherControl("TreeView_Container");
            var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
            if (!pagePara.IsLoadAllData) {
                var treeAllData = "InforCenter.Common.WebTreeViewService.GetTreeAllData";
                if (HoteamUI.Common.IsNullOrEmpty(pagePara.TreeAllDataService) == false) {
                    treeAllData = pagePara.TreeAllDataService;
                }
                var data = InforCenter_Platform_TreeViewCtrl_GetChildrenData(treeCtrl, node, treeAllData);
                InforCenter_Platform_TreeViewCtrl_LoadNodes(treeCtrl, node, data);
            } else {
                treeCtrl.ExpandNode(node, true);
            }
        }
        else {
            treeCtrl.ExpandNode(node, false);
        }
    }
};
InforCenter_Platform_TreeViewCtrl_FindNodeFromFilter = function (findNodes, type, currentNode) {
    var retNode;
    for (var i = 0; i < findNodes.length; i++) {
        if ((findNodes[i].parentTId === currentNode.parentTId) && (findNodes[i].value1 == currentNode.value1)) {
            if (type == "PREVIOUS") {
                if (i == 0) {
                    var para = { pageMode: "OK", context: "Platform", labelName: "WasTheFirstOne" }
                    HoteamUI.UIManager.Popup("Confirm", para);
                    retNode = findNodes[i];
                }
                else {
                    retNode = findNodes[i - 1];
                }
                break;
            } else if (type == "NEXT") {
                if (i == findNodes.length - 1) {
                    var para = { pageMode: "OK", context: "Platform", labelName: "WasTheLastOne" }
                    HoteamUI.UIManager.Popup("Confirm", para);
                    retNode = findNodes[i];
                }
                else {
                    retNode = findNodes[i + 1];
                }
                break;
            }
        }
    }
    if (HoteamUI.Common.IsNullOrEmpty(retNode))
        retNode = findNodes[0];
    return retNode;
}

InforCenter_Platform_TreeViewCtrl_GetRootNode = function (treeGuid) {
    var treeCtrl = HoteamUI.Control.Instance(treeGuid);
    var node = treeCtrl.GetSelectedNode();
    while (true) {
        var parentNode = treeCtrl.GetParentNode(node);
        if (!parentNode) { break; }
        node = parentNode;
    }
    return node;
};

//执行查询操作
InforCenter_Platform_TreeViewCtrl_ExecQuery = function (text, treeGuid, $searchInput) {
    var callFocus = function () {
        setTimeout(function () {
            if ($searchInput)
                $searchInput.focus();
        }, 200);
    }

    if (text) {
        var treeCtrl = HoteamUI.Control.Instance(treeGuid);
        var pageContainer = treeCtrl.OtherControl("TreeView_Container");
        var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
        var treeQueryData = "InforCenter.Common.WebTreeViewService.GetTreeQueryData";
        var useFontQuery = pagePara.IsLoadAllData;
        if (HoteamUI.Common.IsNullOrEmpty(pagePara.TreeQueryDataService) == false) {
            treeQueryData = pagePara.TreeQueryDataService;
            //若配置了自定义查询接口，则从后台进行树查询；否则采用默认查询方式
            useFontQuery = false;
        }
        pagePara.SearchText = text;
        if (HoteamUI.Common.IsNullOrEmpty(pagePara.TreeGuid) == false) {
            if (useFontQuery) {
                var data = [];
                var findNodes = treeCtrl.GetLikeNodesByParam("Text", text);
                if (findNodes.length > 0) {
                    treeCtrl.SelectNode(findNodes[0]);
                    $.each(findNodes, function (i, d) {
                        data.push(d.value4);
                    });
                }
                else {
                    var para = {
                        pageMode: "OK", MessageIcon: "point", context: "Platform", labelName: "DidNotFindTheQueryContent"
                    }
                    HoteamUI.UIManager.Popup("Confirm", para, callFocus);
                }

                pagePara.SearchData = data;
                if (findNodes.length > 0)
                    pagePara.SearchNodeID = findNodes[0].tId;
                pagePara.IsLoadAllData = true;
                HoteamUI.Page.SetContainerParas(pageContainer.id, "TreeViewCtrl", pagePara);

            } else {
                var currentNode = treeCtrl.GetSelectedNode();
                if (HoteamUI.Common.IsNullOrEmpty(currentNode) == false) {
                    var rootNode = InforCenter_Platform_TreeViewCtrl_GetRootNode(treeGuid);
                    var node = currentNode;
                    var para = {
                        para: {
                            TreeViewName: pagePara.TreeViewName
                        }
                    };
                    para.para.OnlyQuery = "true";
                    if (HoteamUI.Common.IsNullOrEmpty(pagePara.OnlyQuery) == false) {
                        para.para.OnlyQuery = pagePara.OnlyQuery;
                    }
                    para.para.Value1 = node.value1;
                    para.para.Value2 = node.value2;
                    para.para.Value3 = node.value3;
                    para.para.Value4 = node.value4;
                    para.para.Value5 = node.value5;
                    para.para.QueryType = "Query";
                    para.para.QueryFilter = text;
                    para.para.SelectPath = InforCenter_Platform_TreeViewCtrl_GetSelectNodePath(treeCtrl);
                    para.para.RootNodeValue1 = rootNode.value1;
                    var returnData = InforCenter_Platform_MenuCtrl_GetParameters(pagePara, pagePara);
                    returnData = JSON.stringify(returnData);
                    para.para.ParaList = returnData;
                    var data = HoteamUI.DataService.Call(treeQueryData, para);
                    if (data != null) {
                        if (data.length == 0) {
                            var para = {
                                pageMode: "OK", MessageIcon: "point", context: "Platform", labelName: "DidNotFindTheQueryContent"
                            }
                            HoteamUI.UIManager.Popup("Confirm", para, callFocus);
                        }
                        InforCenter_Platform_TreeViewCtrl_SelectTreeNode(treeCtrl, node, data[0]);
                        pagePara.SearchData = data;
                        pagePara.SearchNodeID = currentNode.tId;
                        HoteamUI.Page.SetContainerParas(pageContainer.id, "TreeViewCtrl", pagePara);
                    }

                }
                else {
                    var para = {
                        pageMode: "OK", context: "Platform", labelName: "PleaseSelectQueryStartNode"
                    }
                    HoteamUI.UIManager.Popup("Confirm", para);
                }
            }
        }
    }
    else {
        var para = {
            pageMode: "OK", context: "Platform", labelName: "PleaseInputQueryContent"
        }

        HoteamUI.UIManager.Popup("Confirm", para, callFocus);
    }
};

InforCenter_Platform_TreeViewCtrl_SelectTreeNode = function (ctrl, node, currentPath) {
    var pageContainer = ctrl.OtherControl("TreeView_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
    var isLoadNodes = false;
    if (node != null && !HoteamUI.Common.IsNullOrEmpty(currentPath)) {
        var values = currentPath.split('.');

        for (var index = 0; index < values.length; index++) {
            var item = values[index];
            var cnodes = ctrl.GetChildrenNodes(node);
            if (HoteamUI.Common.IsNullOrEmpty(cnodes) == true) {
                var data = InforCenter_Platform_TreeViewCtrl_GetChildrenData(ctrl, node);
                if (data == null && index != values.length - 1)
                    return currentPath;
                InforCenter_Platform_TreeViewCtrl_LoadNodes(ctrl, node, data);
                isLoadNodes = true;
            }
            var cnodes = ctrl.GetChildrenNodes(node);
            if (cnodes && cnodes.length > 0) {
                node = cnodes[item - 1];
            }
        }
        ctrl.SelectNode(node);
        //加载下级节点后选中节点bug，需要重新选中一下，使节点自动滚动到可视区域内
        if (isLoadNodes) {
            setTimeout(function () {
                ctrl.SelectNode(node);
            }, 200);

        }
        HoteamUI.Page.FireParentPageEvent(ctrl.ContainerID(), 'OnNodeChange', {
            ctrl: ctrl
        });
    }
    //返回空，表示已正常结束
    return null;
};

InforCenter_Platform_TreeViewCtrl_GetSelectNodePath = function (treeCtrl, startNode) {
    var node = treeCtrl.GetSelectedNode();
    var spath = "." + (treeCtrl.GetNodeIndex(node) + 1);
    while (true) {
        var parentNode = treeCtrl.GetParentNode(node);
        if (!parentNode) {
            break;
        }
        spath = "." + (treeCtrl.GetNodeIndex(parentNode) + 1) + spath;
        node = parentNode;
        if (parentNode == startNode) {
            break;
        }
    }
    if (HoteamUI.Common.IsNullOrEmpty(spath) == false) {
        if (spath.length > 2) {
            spath = spath.substring(3);
        }
        else {
            spath = spath.substring(2);
        }
    }
    return spath;
};




//执行查询操作
InforCenter_Platform_TreeViewCtrl_AllExecQuery = function (text, treeGuid, $searchInput) {
    var callFocus = function () {
        setTimeout(function () {
            if ($searchInput)
                $searchInput.focus();
        }, 200);
    }

    if (text) {
        var treeCtrl = HoteamUI.Control.Instance(treeGuid);
        var pageContainer = treeCtrl.OtherControl("TreeView_Container");
        var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
        var treeQueryData = "InforCenter.Common.WebTreeViewService.GetTreeQueryData";
        var useFontQuery = pagePara.IsLoadAllData;
        if (HoteamUI.Common.IsNullOrEmpty(pagePara.TreeQueryDataService) == false) {
            treeQueryData = pagePara.TreeQueryDataService;
            //若配置了自定义查询接口，则从后台进行树查询；否则采用默认查询方式
            useFontQuery = false;
        }
        pagePara.SearchText = text;
        if (HoteamUI.Common.IsNullOrEmpty(pagePara.TreeGuid) == false) {
            if (useFontQuery) {
                var data = [];
                var findNodes = treeCtrl.GetLikeNodesByParam("Text", text);
                if (findNodes.length > 0) {
                    treeCtrl.SelectNode(findNodes[0]);
                    $.each(findNodes, function (i, d) {
                        data.push(d.value4);
                    });
                }
                else {
                    var para = {
                        pageMode: "OK", MessageIcon: "point", context: "Platform", labelName: "DidNotFindTheQueryContent"
                    }
                    HoteamUI.UIManager.Popup("Confirm", para, callFocus);
                }

                pagePara.SearchData = data;
                if (findNodes.length > 0)
                    pagePara.SearchNodeID = findNodes[0].tId;
                pagePara.IsLoadAllData = true;
                HoteamUI.Page.SetContainerParas(pageContainer.id, "TreeViewCtrl", pagePara);

            } else {
                var currentNode = treeCtrl.GetSelectedNode();
                if (HoteamUI.Common.IsNullOrEmpty(currentNode) == false) {
                    var rootNode = InforCenter_Platform_TreeViewCtrl_GetRootNode(treeGuid);
                    var node = currentNode;
                    var para = {
                        para: {
                            TreeViewName: pagePara.TreeViewName
                        }
                    };
                    para.para.OnlyQuery = "true";
                    if (HoteamUI.Common.IsNullOrEmpty(pagePara.OnlyQuery) == false) {
                        para.para.OnlyQuery = pagePara.OnlyQuery;
                    }
                    para.para.Value1 = node.value1;
                    para.para.Value2 = node.value2;
                    para.para.Value3 = node.value3;
                    para.para.Value4 = node.value4;
                    para.para.Value5 = node.value5;
                    para.para.QueryType = "AllQuery";
                    para.para.QueryFilter = text;
                    para.para.SelectPath = InforCenter_Platform_TreeViewCtrl_GetSelectAllNodePath(treeCtrl);
                    para.para.RootNodeValue1 = rootNode.value1;
                    var returnData = InforCenter_Platform_MenuCtrl_GetParameters(pagePara, pagePara);
                    returnData = JSON.stringify(returnData);
                    para.para.ParaList = returnData;
                    var data = HoteamUI.DataService.Call(treeQueryData, para);
                    if (data != null) {
                        if (data.length == 0) {
                            var para = {
                                pageMode: "OK", MessageIcon: "point", context: "Platform", labelName: "DidNotFindTheQueryContent"
                            }
                            HoteamUI.UIManager.Popup("Confirm", para, callFocus);
                        }
                        var rootNodes = treeCtrl.GetTreeRootNodes();
                        var firstCharIndex = data[0].indexOf('.');
                        var rootNodeIndex = data[0].substr(0, firstCharIndex);
                        var startNode = rootNodes[rootNodeIndex - 1];
                        var path = data[0];
                        path = path.substr(2);
                        InforCenter_Platform_TreeViewCtrl_SelectTreeNode(treeCtrl, startNode, path);
                        pagePara.SearchData = data;
                        pagePara.SearchNodeID = currentNode.tId;
                        HoteamUI.Page.SetContainerParas(pageContainer.id, "TreeViewCtrl", pagePara);
                    }

                }
                else {
                    var para = {
                        pageMode: "OK", context: "Platform", labelName: "PleaseSelectQueryStartNode"
                    }
                    HoteamUI.UIManager.Popup("Confirm", para);
                }
            }
        }
    }
    else {
        var para = {
            pageMode: "OK", context: "Platform", labelName: "PleaseInputQueryContent"
        }

        HoteamUI.UIManager.Popup("Confirm", para, callFocus);
    }
};

//上一个
InforCenter_Platform_TreeViewCtrl_AllPrevious = function (treeGuid) {
    var treeCtrl = HoteamUI.Control.Instance(treeGuid);
    var node = treeCtrl.GetSelectedNode();
    if (HoteamUI.Common.IsNullOrEmpty(node) == true) {
        var para = { pageMode: "OK", context: "Platform", labelName: "PleaseSelectStartNode" }
        HoteamUI.UIManager.Popup("Confirm", para);
        return;
    }

    //获取树控件
    var pageContainer = treeCtrl.OtherControl("TreeView_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);

    if (pagePara.IsLoadAllData) {
        var findNodes = treeCtrl.GetLikeNodesByParam("Text", pagePara.SearchText);
        node = InforCenter_Platform_TreeViewCtrl_FindNodeFromFilter(findNodes, 'PREVIOUS', node);
        treeCtrl.SelectNode(node);
        return;
    }

    var parentNode = treeCtrl.GetParentNode(node);
    if (HoteamUI.Common.IsNullOrEmpty(parentNode) == true) {
        var para = { pageMode: "OK", context: "Platform", labelName: "IsRootUnableQuery" }
        HoteamUI.UIManager.Popup("Confirm", para);
        return;
    }


    if (HoteamUI.Common.IsNullOrEmpty(pagePara.SearchData) == true)
        return;
    var rootNodes = treeCtrl.GetTreeRootNodes();
    for (var i = rootNodes.length - 1; i >= 0; i--) {
        var startNode = rootNodes[i];
        var currentPath = InforCenter_Platform_TreeViewCtrl_GetSelectAllNodePath(treeCtrl, startNode);
        if (!HoteamUI.Common.IsNullOrEmpty(currentPath))
            break;
    }
    while (currentPath != null && currentPath != "") {
        currentPath = InforCenter_Platform_TreeViewCtrl_SelectAllPrevious(treeCtrl, rootNodes, pagePara.SearchData, currentPath);
    }

    if (currentPath == "") {
        var para = { pageMode: "OK", context: "Platform", labelName: "WasTheFirstOne" }
        HoteamUI.UIManager.Popup("Confirm", para);
    }
};

//下一个
InforCenter_Platform_TreeViewCtrl_AllNext = function (treeGuid) {
    //获取树控件
    var treeCtrl = HoteamUI.Control.Instance(treeGuid);
    var pageContainer = treeCtrl.OtherControl("TreeView_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
    if (pagePara.IsLoadAllData) {
        var findNodes = treeCtrl.GetLikeNodesByParam("Text", pagePara.SearchText);
        var currentNode = treeCtrl.GetSelectedNode();
        var node = InforCenter_Platform_TreeViewCtrl_FindNodeFromFilter(findNodes, 'NEXT', currentNode);
        treeCtrl.SelectNode(node);
        return;
    }
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.SearchData) == true)
        return;
    var treeCtrl = HoteamUI.Control.Instance(pagePara.TreeGuid);
    var rootNodes = treeCtrl.GetTreeRootNodes();
    for (var index in rootNodes) {
        var startNode = rootNodes[index];
        //var startNode = treeCtrl.GetLikeNodesByParam("tId", pagePara.SearchNodeID)[0];
        var currentPath = InforCenter_Platform_TreeViewCtrl_GetSelectAllNodePath(treeCtrl, startNode);
        if (!HoteamUI.Common.IsNullOrEmpty(currentPath))
            break;
    }

    while (currentPath != null && currentPath != "") {
        currentPath = InforCenter_Platform_TreeViewCtrl_SelectAllNext(treeCtrl, rootNodes, pagePara.SearchData, currentPath);
    }
    if (currentPath == "") {
        var para = { pageMode: "OK", context: "Platform", labelName: "WasTheLastOne" }
        HoteamUI.UIManager.Popup("Confirm", para);
    }
};

InforCenter_Platform_TreeViewCtrl_SelectAllPrevious = function (treeCtrl, rootNodes, data, currentPath) {
    var previousPath = "";
    //查找上一个
    for (var i = data.length - 1; i >= 0; i--) {
        var dataitem = data[i];
        if (i == 0) {
            break;
        }
        if (dataitem == currentPath) {
            previousPath = data[i - 1];
            break;
        }
    }
    //判断是否是第一个
    if (previousPath == "") {
        return previousPath;
    }
    var firstCharIndex = previousPath.indexOf('.');
    var rootNodeIndex = previousPath.substr(0, firstCharIndex);
    var startNode = rootNodes[rootNodeIndex - 1];
    previousPath = previousPath.substr(firstCharIndex + 1);
    //切换到上一个节点
    return InforCenter_Platform_TreeViewCtrl_SelectTreeNode(treeCtrl, startNode, previousPath);
};

InforCenter_Platform_TreeViewCtrl_SelectAllNext = function (treeCtrl, rootNodes, data, currentPath) {
    var nextPath = "";
    //查找下一个
    for (var i = 0; i < data.length; i++) {
        var dataitem = data[i];
        if (i == data.length - 1) {
            break;
        }
        if (dataitem == currentPath) {
            nextPath = data[i + 1];
            break;
        }
    }
    //判断是否是最后一个
    if (nextPath == "") {
        return nextPath;
    }
    var firstCharIndex = nextPath.indexOf('.');
    var rootNodeIndex = nextPath.substr(0, firstCharIndex);
    var startNode = rootNodes[rootNodeIndex - 1];
    nextPath = nextPath.substr(firstCharIndex + 1);
    //切换到下一个节点
    return InforCenter_Platform_TreeViewCtrl_SelectTreeNode(treeCtrl, startNode, nextPath);
};

InforCenter_Platform_TreeViewCtrl_GetSelectAllNodePath = function (treeCtrl, startNode) {
    var node = treeCtrl.GetSelectedNode();
    var spath = "." + (treeCtrl.GetNodeIndex(node) + 1);
    while (true) {
        var parentNode = treeCtrl.GetParentNode(node);
        if (!parentNode) {
            break;
        }
        spath = "." + (treeCtrl.GetNodeIndex(parentNode) + 1) + spath;
        node = parentNode;
        if (parentNode == startNode) {
            break;
        }
    }
    if (HoteamUI.Common.IsNullOrEmpty(spath) == false) {
        if (spath.length > 2) {
            spath = spath.substring(1);
        }
        else {
            spath = spath.substring(2);
        }
    }
    return spath;
};

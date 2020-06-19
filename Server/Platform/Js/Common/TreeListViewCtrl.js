//列表页面加载事件
InforCenter_Platform_TreeListViewCtrl_LoadTreeView = function (treePage, pagePara) {
    var objType = null;
    var treeCtrl = treePage.GetControl("TreeListView");

    var data = InforCenter_Platform_TreeListViewCtrl_LoadRootData(treeCtrl, pagePara);
    if (data != null) {
        var rootRows = treeCtrl.GetRootRows();
        if (rootRows && rootRows.length > 0) {
            if (!pagePara.NotSelect) {
                treeCtrl.SetSelectedRow([rootRows[0].row_number]);
            }
            var treePageContainer = treePage.GetControl("TreeListView_Container");
            if (data.FilterFlag) {
                pagePara.ParaList = data.FilterFlag;
            }
            HoteamUI.Page.SetContainerParas(treePageContainer.id, "TreeListViewCtrl", pagePara);
        }
        //TODO:暂时不支持
        // InforCenter_Platform_TreeListViewCtrl_SetRightMenu(treePage, pagePara);
        var customContainer = treePage.GetControl('LeftContainerTxt');
        var ctrlEvent = {};
        ctrlEvent.o = customContainer;
        InforCenter_Platform_TreeListViewCtrl_QueryInit(ctrlEvent, data);
    }
    return data;
};
InforCenter_Platform_TreeListViewCtrl_SetTitle = function (treePage, text) {
    var titleLabel = treePage.GetControl("TreeListLabel");
    titleLabel.SetText(text);
}

InforCenter_Platform_TreeListViewCtrl_SetRightMenu = function (treePage, pagePara) {
    var rightMenuCtrl = treePage.GetControl("RightMenu");
    var treeCtrl = treePage.GetControl("TreeListView");
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
    if (hasRightMenu) {
        treeCtrl.SetTreeRightMenu(rightmenuid);
        var rightmenuContainer = treePage.GetControl("RightMenu_Container");
        HoteamUI.Page.SetContainerParas(rightmenuContainer.id, "RightMenuCtrl", pagePara);
    }

}

InforCenter_Platform_TreeListViewCtrl_LoadRootData = function (ctrl, pagePara) {
    var data = InforCenter_Platform_TreeListViewCtrl_GetRootData(ctrl, pagePara);
    if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
        var options = {};
        options.data = data.TitleData;
        if (data.Options) {
            options.multiselect = data.Options.AllowCheckBox;
            options.check = data.Options.NodeCheckBox;
            options.checkType = data.Options.RelevanceChild;
            options.rowLinkCheck = data.Options.RowLinkCheck;
            options.rowrejection = data.Options.RowRejection;
            options.KeyField = data.Options.KeyField;
            options.islayoutsave = data.Options.IsLayoutSave;
            options.iscolumnsetting = data.Options.IsColumnSetting;
        }
        if (pagePara.AllowMultiSelect != undefined) {
            options.multiselect = pagePara.AllowMultiSelect;
        }
        if (pagePara.AllowCheckBox != undefined) {
            options.check = pagePara.AllowCheckBox;
        }
        if (pagePara.RelevanceChild != undefined) {
            options.checkType = pagePara.RelevanceChild;
        }
        if (pagePara.RowLinkCheck != undefined) {
            options.rowLinkCheck = pagePara.RowLinkCheck;
        }
        if (pagePara.RowRejection != undefined) {
            options.rowrejection = pagePara.RowRejection;
        }
        if (pagePara.IsLayoutSave != undefined) {
            options.isLayoutSave = pagePara.IsLayoutSave;
        }
        if (pagePara.IsColumnSetting != undefined) {
            options.isColumnSetting = pagePara.IsColumnSetting;
        }
        ctrl.LoadColTitle(options);
        ctrl.LoadGridRows(data.RootData);
    }
    return data;
};
InforCenter_Platform_TreeListViewCtrl_GetRootData = function (ctrl, pagePara) {
    var data = null;
    var viewName = pagePara.ListViewName ? pagePara.ListViewName : pagePara.TreeViewName;
    if (viewName || pagePara.TreeListRootDataService || pagePara.TreeListAllDataService) {

        var rootDataService = "";
        if (!(pagePara.IsLoadAllData === undefined) && pagePara.IsLoadAllData == true) {
            rootDataService = "InforCenter.Common.WebTreeListViewService.GetTreeListAllData";
            if (HoteamUI.Common.IsNullOrEmpty(pagePara.TreeListAllDataService) == false) {
                rootDataService = pagePara.TreeListAllDataService;
            }
        }
        else {
            rootDataService = "InforCenter.Common.WebTreeListViewService.GetTreeListRootData";
            if (HoteamUI.Common.IsNullOrEmpty(pagePara.TreeListRootDataService) == false) {
                rootDataService = pagePara.TreeListRootDataService;
            }
        }

        var returnData = InforCenter_Platform_MenuCtrl_GetParameters(pagePara, pagePara);
        pagePara.ParaList = returnData;
        var sParaList = JSON.stringify(pagePara);
        var para = { para: { TreeViewName: viewName, ParaList: sParaList } };
        if (pagePara.IsMultiLevel) {
            para.para.IsMultiLevel = pagePara.IsMultiLevel;
        }
        var data = HoteamUI.DataService.Call(rootDataService, para);
    }
    return data;
};
//树节点自定义点击事件
InforCenter_Platform_TreeListViewCtrl_OnRowClick = function (ctrlEvent) {
    var para = { ctrl: ctrlEvent.o, rowid: ctrlEvent.rowid, rowobject: ctrlEvent.rowobject, rowselected: ctrlEvent.rowselected };
    HoteamUI.Page.FireParentPageEvent(ctrlEvent.o.ContainerID(), 'OnRowClick', para);
};

//树节点自定义点击事件
InforCenter_Platform_TreeListViewCtrl_OnBeforeEdit = function (ctrlEvent) {
    var para = { ctrl: ctrlEvent.o, rowid: ctrlEvent.rowid, rowobject: ctrlEvent.rowobject, colName: ctrlEvent.colName };
    return HoteamUI.Page.FireParentPageEvent(ctrlEvent.o.ContainerID(), 'OnBeforeEdit', para);
};

//树节点自定义点击事件 
InforCenter_Platform_TreeListViewCtrl_OnAfterEdit = function (ctrlEvent) {
    var para = { ctrl: ctrlEvent.o, rowid: ctrlEvent.rowid, newData: ctrlEvent.newData, oldData: ctrlEvent.oldData, rowobject: ctrlEvent.rowobject, colName: ctrlEvent.colName };
    return HoteamUI.Page.FireParentPageEvent(ctrlEvent.o.ContainerID(), 'OnAfterEdit', para);
};

//树节点自定义点击事件
InforCenter_Platform_TreeListViewCtrl_OnColImageClick = function (ctrlEvent) {
    var para = { ctrl: ctrlEvent.o, rowid: ctrlEvent.rowid, rowobject: ctrlEvent.rowobject, rowselected: ctrlEvent.rowselected };
    HoteamUI.Page.FireParentPageEvent(ctrlEvent.o.ContainerID(), 'OnColImageClick', para);
};

//树节点自定义点击事件
InforCenter_Platform_TreeListViewCtrl_OnColLinkClick = function (ctrlEvent) {
    var para = { ctrl: ctrlEvent.o, rowid: ctrlEvent.rowid, rowobject: ctrlEvent.rowobject, rowselected: ctrlEvent.rowselected };
    HoteamUI.Page.FireParentPageEvent(ctrlEvent.o.ContainerID(), 'OnColLinkClick', para);
};
//树节点自定义点击事件
InforCenter_Platform_TreeListViewCtrl_OnLoadSuccess = function (ctrlEvent) {
    var para = { ctrl: ctrlEvent.o, rowid: ctrlEvent.rowid, rowobject: ctrlEvent.rowobject, rowselected: ctrlEvent.rowselected };
    HoteamUI.Page.FireParentPageEvent(ctrlEvent.o.ContainerID(), 'OnLoadSuccess', para);
};
//checkbox勾选事件
InforCenter_Platform_TreeListViewCtrl_OnCheckboxClick = function (ctrlEvent) {
    var para = { ctrl: ctrlEvent.o, rowid: ctrlEvent.rowid, rowobject: ctrlEvent.rowobject, rowselected: ctrlEvent.rowselected };
    HoteamUI.Page.FireParentPageEvent(ctrlEvent.o.ContainerID(), 'OnCheckboxClick', para);
};
InforCenter_Platform_TreeListViewCtrl_OnNodeDblClick = function (ctrlEvent) {
    var para = { ctrl: ctrlEvent.o, rowid: ctrlEvent.rowid, rowobject: ctrlEvent.rowobject, rowselected: ctrlEvent.rowselected };
    HoteamUI.Page.FireParentPageEvent(ctrlEvent.o.ContainerID(), 'OnNodeDblClick', para);
}

InforCenter_Platform_TreeListViewCtrl_OnOpenRow = function (ctrlEvent) {
    var node = ctrlEvent.o.GetRowByRowID(ctrlEvent.rowid);
    var data = InforCenter_Platform_TreeListViewCtrl_GetChildrenData(ctrlEvent.o, node);
    InforCenter_Platform_TreeListViewCtrl_LoadNodes(ctrlEvent.o, ctrlEvent.rowid, data);
};
//树节点自定义点击事件
InforCenter_Platform_TreeListViewCtrl_GetChildrenData = function (ctrl, node, dataService, extendPara) {
    if (HoteamUI.Common.IsNullOrEmpty(node) == false) {
        var pageContainer = ctrl.OtherControl("TreeListView_Container");
        var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
        var childDataService = "InforCenter.Common.WebTreeListViewService.GetTreeListChildData";
        if (HoteamUI.Common.IsNullOrEmpty(pagePara.TreeListChildDataService) == false) {
            childDataService = pagePara.TreeListChildDataService;
        }
        if (dataService) {
            childDataService = dataService;
        }
        var viewName = pagePara.ListViewName ? pagePara.ListViewName : pagePara.TreeViewName;
        var para = { para: { TreeViewName: viewName } };
        para.para.EID = node["EID"];
        para.para.ObjectType = node["ObjectType"];
        para.para.LevelIndex = node["LevelIndex"];
        var returnData = InforCenter_Platform_MenuCtrl_GetParameters(pagePara, pagePara, null, node);
        returnData = JSON.stringify(returnData);
        para.para.ParaList = returnData;
        $.extend(para.para, extendPara);
        var data = HoteamUI.DataService.Call(childDataService, para);
    }
    return data;
};
InforCenter_Platform_TreeListViewCtrl_LoadNodes = function (treeCtrl, rowid, data) {
    if (data && data.ExpandPermission)
        treeCtrl.LoadChildRows(rowid, data.Children);
    else if (data == null) {
        //不做处理
    }
    else {
        treeCtrl.ExpandNode(rowid, false);
        var msg = HoteamUI.Language.Lang("Platform", "NoPermissionExpandCurrentTreeNode");
        HoteamUI.UIManager.MsgBox(msg);
    }
};

InforCenter_Platform_TreeListViewCtrl_ReplaceChildrenNodes = function (treeCtrl, rowid, data) {
    if (data.ExpandPermission)
        treeCtrl.UpdateChildrenNodes(rowid, data.Children);
    else {
        treeCtrl.ExpandNode(rowid, false);
        var msg = HoteamUI.Language.Lang("Platform", "NoPermissionExpandCurrentTreeNode");
        HoteamUI.UIManager.MsgBox(msg);
    }
};


//Update刷新当前和树结构
InforCenter_Platform_TreeListViewCtrl_RefreshCurrentAndStructure = function (treeGuid, isRefreshCurrent, isOnlyCurrent) {

    var ctrl = HoteamUI.Control.Instance(treeGuid);
    var rows = [];
    if (isRefreshCurrent) {
        rows = ctrl.GetSelectedRows();
    } else {
        rows = ctrl.GetTopSelectedRows();
    }
    var data = null;
    //for (var rowindex in rows) {
    for (var i = rows.length - 1; i >= 0; i--) {
        var rowid = rows[i].row_number;
        var data = InforCenter_Platform_TreeListViewCtrl_GetChildrenData(ctrl, rows[i], "", { IsContainCurrent: isRefreshCurrent, IsOnlyCurrent: isOnlyCurrent });
        if (data != null) {
            if (isRefreshCurrent) {
                if (data.Children && data.Children.length > 0) {
                    var currentData = data.Children[0];
                    ctrl.UpdateDataByRowID(rowid, currentData);
                    if (isOnlyCurrent != true) {
                        if (currentData.Children && currentData.Children.length > 0) {
                            currentData.ExpandPermission = data.ExpandPermission;
                            InforCenter_Platform_TreeListViewCtrl_ReplaceChildrenNodes(ctrl, rowid, currentData);
                        }
                        else
                            ctrl.DeleteChildRows(rowid);
                    }
                }
                else {
                    ctrl.DeleteGridRows([rowid]);
                }
            }
            else {
                InforCenter_Platform_TreeListViewCtrl_ReplaceChildrenNodes(ctrl, rowid, data);
            }
        }
    }
    return ctrl;
};

//Update刷新当前树节点和Tab
InforCenter_Platform_TreeListViewCtrl_RefreshCurrentStructureAndTab = function (treeGuid) {
    var ctrl = InforCenter_Platform_TreeListViewCtrl_RefreshCurrentAndStructure(treeGuid, false);
    HoteamUI.Page.FireParentPageEvent(ctrl.ContainerID(), 'OnNodeChange', {
        ctrl: ctrl
    });
};

//Update刷新当前、结构和Tab
InforCenter_Platform_TreeListViewCtrl_RefreshCurrentAndStructureAndTab = function (treeGuid) {
    var ctrl = InforCenter_Platform_TreeListViewCtrl_RefreshCurrentAndStructure(treeGuid, true);
    HoteamUI.Page.FireParentPageEvent(ctrl.ContainerID(), 'OnNodeChange', {
        ctrl: ctrl
    });
};

//Update刷新父节点
InforCenter_Platform_TreeListViewCtrl_RefreshParentAndStructure = function (treeGuid, isRefreshCurrent) {
    var ctrl = HoteamUI.Control.Instance(treeGuid);
    var rowids = ctrl.GetSelectedRowsID();
    var parentNodeArray = [];
    var isRoot = false;
    //   for (var rowindex in rowids) {
    for (var i = 0; i < rowids.length; i++) {
        var rowid = rowids[i];
        var parentTreeNode = ctrl.GetParentRow(rowid);
        if (parentTreeNode.row_number) {
            var isExist = false;
            for (var j = 0; j < parentNodeArray.length; j++) {
                if (parentNodeArray[j].row_number == parentTreeNode.row_number) {
                    isExist = true;
                    break;
                }
            }
            if (isExist == false)
                parentNodeArray.push(parentTreeNode);
        }
        else {
            isRoot = true;
            break;
        }
    }
    if (isRoot) {
        var pageContainer = ctrl.OtherControl("TreeListView_Container");
        var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
        InforCenter_Platform_TreeListViewCtrl_LoadRootData(ctrl, pagePara);
        var rootRows = ctrl.GetRootRows();
        if (rootRows && rootRows.length > 0) {
            ctrl.SetSelectedRow([rootRows[0].row_number]);
        }
    }
    else {
        //for (var rowindex in parentNodeArray) {
        for (var i = 0; i < parentNodeArray.length; i++) {
            var parentRow = parentNodeArray[i];
            var rowid = parentRow.row_number;
            var data = InforCenter_Platform_TreeListViewCtrl_GetChildrenData(ctrl, parentRow, "", { IsContainCurrent: isRefreshCurrent });
            if (data != null) {
                if (isRefreshCurrent) {
                    if (data.Children && data.Children.length > 0) {
                        var currentData = data.Children[0];
                        ctrl.UpdateDataByRowID(rowid, currentData);
                        if (currentData.Children && currentData.Children.length > 0) {
                            currentData.ExpandPermission = data.ExpandPermission;
                            InforCenter_Platform_TreeListViewCtrl_ReplaceChildrenNodes(ctrl, rowid, currentData);
                        }
                        else
                            ctrl.DeleteChildRows(rowid);
                    }
                    else {
                        ctrl.DeleteGridRows([rowid]);
                    }
                }
                else {
                    InforCenter_Platform_TreeListViewCtrl_ReplaceChildrenNodes(ctrl, rowid, data);
                }
            }
        }
    }
    return ctrl;
};

//删除及刷新父节点，刷新树结构及tab页
InforCenter_Platform_TreeListViewCtrl_RefreshParentStructureAndTab = function (treeGuid) {
    var ctrl = InforCenter_Platform_TreeListViewCtrl_RefreshParentAndStructure(treeGuid, false);
    HoteamUI.Page.FireParentPageEvent(ctrl.ContainerID(), 'OnNodeChange', { ctrl: ctrl });
};

//删除及刷新父节点，刷新树结构及tab页
InforCenter_Platform_TreeListViewCtrl_RefreshParentAndStructureAndTab = function (treeGuid) {
    var ctrl = InforCenter_Platform_TreeListViewCtrl_RefreshParentAndStructure(treeGuid, true);
    HoteamUI.Page.FireParentPageEvent(ctrl.ContainerID(), 'OnNodeChange', { ctrl: ctrl });
};



//Update刷新根节点结构
InforCenter_Platform_TreeListViewCtrl_RefreshRootStructure = function (treeGuid) {
    var ctrl = HoteamUI.Control.Instance(treeGuid);
    var treeNodes = ctrl.GetRootRows();
    if (treeNodes.length > 0) {
        var pageContainer = ctrl.OtherControl("TreeListView_Container");
        var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
        InforCenter_Platform_TreeListViewCtrl_LoadRootData(ctrl, pagePara);
    }
    return ctrl;
};

//刷新根节点树结构及tab页
InforCenter_Platform_TreeListViewCtrl_RefreshRootStructureAndTab = function (treeGuid) {
    var ctrl = InforCenter_Platform_TreeListViewCtrl_RefreshRootNode(treeGuid);
    HoteamUI.Page.FireParentPageEvent(ctrl.ContainerID(), 'OnNodeChange', { ctrl: ctrl });
};

//Update刷新树节点
InforCenter_Platform_TreeListViewCtrl_RefreshCurrentAndTab = function (treeGuid) {
    var ctrl = InforCenter_Platform_TreeListViewCtrl_RefreshCurrent(treeGuid);
    HoteamUI.Page.FireParentPageEvent(ctrl.ContainerID(), 'OnNodeChange', { ctrl: ctrl });
};

//Update刷新树节点
InforCenter_Platform_TreeListViewCtrl_RefreshCurrent = function (treeGuid) {
    return InforCenter_Platform_TreeListViewCtrl_RefreshCurrentAndStructure(treeGuid, true, true);
};

//查询
InforCenter_Platform_TreeListViewCtrl_OnQuery = function (ctrlEvent) {
    InforCenter_Platform_TreeListViewCtrl_ExecQuery(ctrlEvent, "QUERY");
};

//下一个
InforCenter_Platform_TreeListViewCtrl_OnNext = function (ctrlEvent) {
    //获取查询信息
    var searchContainer = ctrlEvent.o.OtherControl("SearchContainer");
    var searchPara = HoteamUI.Page.GetContainerPara(searchContainer.id);
    if (HoteamUI.Common.IsNullOrEmpty(searchPara.SearchData) == true)
        return;

    //获取树控件
    var pageContainer = ctrlEvent.o.OtherControl("TreeListView_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
    var gridId = pagePara.TreeListGuid ? pagePara.TreeListGuid : pagePara.TreeTreeListGuid;
    var treeCtrl = HoteamUI.Control.Instance(gridId);

    if (pagePara.IsLoadAllData) {
        if (searchPara.SearchData.length <= 1) {
            return;
        }
        var rows = treeCtrl.GetSelectedRows();
        var nextRow = null;
        for (var i = 0; i < searchPara.SearchData.length - 1; i++) {
            var tempData = searchPara.SearchData[i];
            if (tempData.row_number == rows[0].row_number) {
                nextRow = searchPara.SearchData[i + 1];
                break;
            }
        }
        if (nextRow != null) {
            treeCtrl.UnSelectAll();
            treeCtrl.SetSelectedRow([nextRow.row_number]);
            searchPara.SearchNodeID = nextRow.row_number;
        }
        return;
    }

    var startNode = treeCtrl.GetRowByRowID(searchPara.SearchNodeID);
    var currentPath = InforCenter_Platform_TreeListViewCtrl_GetSelectNodePath(treeCtrl, startNode);
    if (HoteamUI.Common.IsNullOrEmpty(currentPath) == true)
        return;
    while (currentPath != null) {
        currentPath = InforCenter_Platform_TreeListViewCtrl_SelectNext(treeCtrl, startNode, searchPara.SearchData, currentPath);
    }

};
InforCenter_Platform_TreeListViewCtrl_SelectNext = function (treeCtrl, startNode, data, currentPath) {
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
    return InforCenter_Platform_TreeListViewCtrl_SelectTreeNode(treeCtrl, startNode, nextPath);
};
//上一个
InforCenter_Platform_TreeListViewCtrl_OnPrevious = function (ctrlEvent) {
    var treeCtrl = ctrlEvent.o.OtherControl("TreeListView");
    var rows = treeCtrl.GetSelectedRows();
    if (rows == null || rows.length == 0) {
        var para = { pageMode: "OK", context: "Platform", labelName: "PleaseSelectStartNode" }
        HoteamUI.UIManager.Popup("Confirm", para);
        return;
    }
    var parentRow = treeCtrl.GetParentRow(rows[0].row_number);
    if (HoteamUI.Common.IsNullOrEmpty(parentRow) == true) {
        var para = { pageMode: "OK", context: "Platform", labelName: "IsRootUnableQuery" }
        HoteamUI.UIManager.Popup("Confirm", para);
        return;
    }

    //获取查询信息
    var searchContainer = ctrlEvent.o.OtherControl("SearchContainer");
    var searchPara = HoteamUI.Page.GetContainerPara(searchContainer.id);
    if (HoteamUI.Common.IsNullOrEmpty(searchPara.SearchData) == true)
        return;

    //获取树控件
    var pageContainer = ctrlEvent.o.OtherControl("TreeListView_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
    //兼容树树列表
    var gridId = pagePara.TreeListGuid ? pagePara.TreeListGuid : pagePara.TreeTreeListGuid;
    var treeCtrl = HoteamUI.Control.Instance(gridId);

    if (pagePara.IsLoadAllData) {
        if (searchPara.SearchData.length <= 1) {
            return;
        }
        var preRow = null;
        for (var i = searchPara.SearchData.length - 1; i > 0; i--) {
            var tempData = searchPara.SearchData[i];
            if (tempData.row_number == rows[0].row_number) {
                preRow = searchPara.SearchData[i - 1];
                break;
            }
        }
        if (preRow != null) {
            treeCtrl.UnSelectAll();
            treeCtrl.SetSelectedRow([preRow.row_number]);
            searchPara.SearchNodeID = preRow.row_number;
        }
        return;
    }

    var startNode = treeCtrl.GetRowByRowID(searchPara.SearchNodeID);
    var currentPath = InforCenter_Platform_TreeListViewCtrl_GetSelectNodePath(treeCtrl, startNode);
    if (HoteamUI.Common.IsNullOrEmpty(currentPath) == true)
        return;
    while (currentPath != null) {
        currentPath = InforCenter_Platform_TreeListViewCtrl_SelectPrevious(treeCtrl, startNode, searchPara.SearchData, currentPath);
    }
};
InforCenter_Platform_TreeListViewCtrl_SelectPrevious = function (treeCtrl, startNode, data, currentPath) {
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
    return InforCenter_Platform_TreeListViewCtrl_SelectTreeNode(treeCtrl, startNode, previousPath);
};

//展开到
InforCenter_Platform_TreeListViewCtrl_ExpandTo = function (treeCtrl, expandToLevel) {
    var pageContainer = treeCtrl.OtherControl("TreeListView_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
    pagePara.ExpandToLevel = expandToLevel;
    HoteamUI.Page.SetContainerParas(pageContainer.id, "TreeListViewCtrl", pagePara);
    InforCenter_Platform_TreeListViewCtrl_ExpandAll(treeCtrl);
};
//展开当前
InforCenter_Platform_TreeListViewCtrl_ExpandAll = function (treeCtrl) {
    var rows = treeCtrl.GetSelectedRows();
    if (rows.length > 0) {
        var selectRow = rows[0];
        var pageContainer = treeCtrl.OtherControl("TreeListView_Container");
        var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
        if (!pagePara.IsLoadAllData) {
            var treeAllData = "InforCenter.Common.WebTreeListViewService.GetTreeListAllData";
            if (HoteamUI.Common.IsNullOrEmpty(pagePara.TreeListAllDataService) == false) {
                treeAllData = pagePara.TreeListAllDataService;
            }
            var data = InforCenter_Platform_TreeListViewCtrl_GetChildrenData(treeCtrl, selectRow, treeAllData);
            InforCenter_Platform_TreeListViewCtrl_LoadNodes(treeCtrl, selectRow.row_number, data);
        } else {
            treeCtrl.ExpandNode(selectRow.row_number, true);
        }
    }
};
InforCenter_Platform_TreeListViewCtrl_OnExpandAll = function (ctrlEvent) {
    var treeCtrl = ctrlEvent.o.OtherControl("TreeListView");
    InforCenter_Platform_TreeListViewCtrl_ExpandAll(treeCtrl);
};

//执行查询操作
InforCenter_Platform_TreeListViewCtrl_ExecQuery = function (ctrlEvent, type) {
    var searchContainer = ctrlEvent.o.OtherControl("SearchContainer");
    var searchPara = {};
    var text = $("#" + ctrlEvent.o.id + "_treeviewQueryTemplate").find("input").val();
    if (text) {
        var pageContainer = ctrlEvent.o.OtherControl("TreeListView_Container");
        var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
        var treeQueryData = "InforCenter.Common.WebTreeListViewService.GetTreeListQueryData";
        if (HoteamUI.Common.IsNullOrEmpty(pagePara.TreeListQueryDataService) == false) {
            treeQueryData = pagePara.TreeListQueryDataService;
        }

        var gridGuid = pagePara.TreeListGuid ? pagePara.TreeListGuid : pagePara.TreeTreeListGuid;
        if (HoteamUI.Common.IsNullOrEmpty(gridGuid) == false) {
            var treeCtrl = HoteamUI.Control.Instance(gridGuid);
            if (pagePara.IsLoadAllData) {
                var rows = treeCtrl.GetCurrentPageRows();
                var findRow = [];
                treeCtrl.ExpandNode(rows[0].row_number, true);
                for (var i = 0; i < rows.length; i++) {
                    treeCtrl.ExpandNode(rows[i].row_number, true);
                    if (rows[i].ENAME.indexOf(text) > -1) {
                        findRow.push(rows[i]);
                    }
                }
                if (findRow == null || findRow.length == 0) {
                    var para = { pageMode: "OK", context: "Platform", labelName: "DidNotFindTheQueryContent" }
                    HoteamUI.UIManager.Popup("Confirm", para);
                } else {
                    treeCtrl.UnSelectAll();
                    treeCtrl.SetSelectedRow([findRow[0].row_number]);
                    searchPara.SearchData = findRow;
                    searchPara.SearchNodeID = findRow[0].row_number;
                }
                InforCenter_Platform_SaveSearchHistory("treelistview", text, 10);

            } else {
                var selectRows = treeCtrl.GetSelectedRows();
                if (selectRows.length > 0) {
                    var node = selectRows[0];
                    var viewName = pagePara.ListViewName ? pagePara.ListViewName : pagePara.TreeViewName;
                    var para = { para: { TreeViewName: viewName } };
                    para.para.EID = node["EID"];
                    para.para.ObjectType = node["ObjectType"];
                    para.para.LevelIndex = node["LevelIndex"];
                    para.para.QueryFilter = text;
                    var returnData = InforCenter_Platform_MenuCtrl_GetParameters(pagePara, pagePara);
                    returnData = JSON.stringify(returnData);
                    para.para.ParaList = returnData;
                    var data = HoteamUI.DataService.Call(treeQueryData, para);
                    if (data == null || data.length == 0) {
                        var para = { pageMode: "OK", context: "Platform", labelName: "DidNotFindTheQueryContent" }
                        HoteamUI.UIManager.Popup("Confirm", para);
                    }
                    InforCenter_Platform_TreeListViewCtrl_SelectTreeNode(treeCtrl, node, data[0]);
                    searchPara.SearchData = data;
                    searchPara.SearchNodeID = node.row_number;
                    InforCenter_Platform_SaveSearchHistory("treelistview", text, 10);
                }
                else {
                    var para = { pageMode: "OK", context: "Platform", labelName: "PleaseSelectQueryStartNode" }
                    HoteamUI.UIManager.Popup("Confirm", para);
                }
            }
        }
    }
    else {
        var para = { pageMode: "OK", context: "Platform", labelName: "PleaseInputQueryContent" }
        HoteamUI.UIManager.Popup("Confirm", para);
    }
    HoteamUI.Page.SetContainerParas(searchContainer.id, "TreeViewCtrl", searchPara);
};

InforCenter_Platform_TreeListViewCtrl_SelectTreeNode = function (ctrl, node, currentPath) {
    var pageContainer = ctrl.OtherControl("TreeView_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
    if (HoteamUI.Common.IsNullOrEmpty(node) == false && !HoteamUI.Common.IsNullOrEmpty(currentPath)) {
        var row = node;

        var values = currentPath.split('.');
        //   for (var index in values) {
        for (var index = 0; index < values.length; index++) {
            var item = values[index];
            var cnodes = ctrl.GetChildRows(row.row_number);
            if (HoteamUI.Common.IsNullOrEmpty(cnodes) == true) {
                var data = InforCenter_Platform_TreeListViewCtrl_GetChildrenData(ctrl, row);
                if (data == null && index != values.length - 1)
                    return currentPath;
                InforCenter_Platform_TreeListViewCtrl_LoadNodes(ctrl, row.row_number, data);
            }
            else {
                ctrl.ExpandNode(row.row_number, true);
            }

            var cnodes = ctrl.GetChildRows(row.row_number);
            if (cnodes.length > 0) {
                row = cnodes[item - 1];
            }
        }
        ctrl.UnSelectAll();
        ctrl.SetSelectedRow([row.row_number]);
        HoteamUI.Page.FireParentPageEvent(ctrl.ContainerID(), 'OnNodeChange', { ctrl: ctrl });
    }
    //返回空，表示已正常结束
    return null;
};

InforCenter_Platform_TreeListViewCtrl_GetSelectNodePath = function (treeCtrl, startNode) {
    var rows = treeCtrl.GetSelectedRows();
    var currentRow_number = rows[0].row_number;

    var spath = "." + (treeCtrl.GetNodeIndex(currentRow_number) + 1);
    while (true) {
        var parentRow = treeCtrl.GetParentRow(currentRow_number);
        spath = "." + (treeCtrl.GetNodeIndex(parentRow.row_number) + 1) + spath;
        currentRow_number = parentRow.row_number;
        if (parentRow.row_number == startNode.row_number) {
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


InforCenter_Platform_TreeListViewCtrl_QueryInit = function (ctrlEvent) {
    $("#treeviewQueryTemplate").attr("id", ctrlEvent.o.id + "_treeviewQueryTemplate");
    var template = $("#" + ctrlEvent.o.id + "_treeviewQueryTemplate");
    var searchinput = template.find("input");
    searchinput.parent().append("<span class='basesprite b-close treeview-query-search-trash' style='display:none;'/>");
    template.find(".basesprite").each(function () {
        if ($(this).hasClass("b-angle-down")) {
            InforCenter_Platform_ShowSearchHistory($(this), $(this).parents(".treeview-query-search-input").find("input"), "treelistview");
        }
    });
    template.find(".basesprite").unbind('mouseenter').on("mouseenter", function () {
        if ($(this).hasClass("b-gray-search")) {
            $(this).addClass("b-gray-search-hover");
        } else if ($(this).hasClass("b-gray-prev")) {
            $(this).addClass("b-gray-prev-hover");
        } else if ($(this).hasClass("b-gray-next")) {
            $(this).addClass("b-gray-next-hover");
        } else if ($(this).hasClass("b-angle-down")) {
            $(this).addClass("b-blue-angle-down");
        }
    }).unbind('mouseleave').on("mouseleave", function () {
        if ($(this).hasClass("b-gray-search")) {
            $(this).removeClass("b-gray-search-hover");
        } else if ($(this).hasClass("b-gray-prev")) {
            $(this).removeClass("b-gray-prev-hover").attr("title", HoteamUI.Language.Lang("TreeViewCtrl.Previous"));
        } else if ($(this).hasClass("b-gray-next")) {
            $(this).removeClass("b-gray-next-hover").attr("title", HoteamUI.Language.Lang("TreeViewCtrl.Next"));
        } else if ($(this).hasClass("b-angle-down")) {
            $(this).removeClass("b-blue-angle-down");
        }
    }).unbind('click').on("click", function () {
        if ($(this).hasClass("b-gray-search")) {
            InforCenter_Platform_TreeListViewCtrl_OnQuery(ctrlEvent);
        } else if ($(this).hasClass("b-gray-prev")) {
            InforCenter_Platform_TreeListViewCtrl_OnPrevious(ctrlEvent);
        } else if ($(this).hasClass("b-gray-next")) {
            InforCenter_Platform_TreeListViewCtrl_OnNext(ctrlEvent);
        } else if ($(this).hasClass("b-close")) {
            $(this).siblings("input").val("").focus();
            $(this).hide();
        } else if ($(this).hasClass("b-angle-down")) {
            InforCenter_Platform_ShowSearchHistory($(this), $(this).parents(".treeview-query-search-input").find("input"), "treelistview");
        }

    });
    searchinput.unbind('keyup').on("keyup", function (e) {
        if ($(this).val()) {
            $(this).siblings(".b-close").show();
        }
        else {
            $(this).siblings(".b-close").hide();
        }
        if (e.keyCode == 13) {//enter键
            InforCenter_Platform_TreeListViewCtrl_OnQuery(ctrlEvent);
        }
    });

    //添加placeholder
    searchinput.on({
        focus: function () {
            $(this).next().hide();
        },
        blur: function () {
            if ($(this).val()) {
                $(this).next().hide();
            } else {
                $(this).next().show();
            }
        },
        keydown: function (e) {
            if (e.which == 13) {
                $(this).parent().next().click();
            }
        },
        keyup: function () {
            if ($(this).val()) {
                $(this).siblings(".hoteam-search-trash").show();
            } else {
                $(this).siblings(".hoteam-search-trash").hide();
            }
        }
    });

    var ctrlContainer = HoteamUI.Control.Instance(ctrlEvent.o.ContainerID());
    var pagePara = HoteamUI.Page.GetContainerPara(ctrlContainer.ContainerID());

    var searchTitle = '';
    if (pagePara && pagePara.SearchFields) {
        var searchFields = pagePara.SearchFields.split(';');
        for (var i = 0; i < searchFields.length; i++) {
            var field = searchFields[i];
            if (field != "") {
                for (var j = 0; j < data.TitleData.ColumnData.length; j++) {
                    var col = data.TitleData.ColumnData[j];
                    if (col.Name == field && HoteamUI.Common.IsNullOrEmpty(col.Text) == false) {
                        searchTitle += ",";
                        searchTitle += col.Text;
                        break;
                    }
                }
            }
        }
        if (searchTitle != '') {
            searchTitle = searchTitle.substring(1);
        }
    }

    template.find("span.hoteam-search-placeholder").text(searchTitle).on({
        click: function () {
            $(this).hide();
            $(this).prev().click().focus();
        }
    });
}
InforCenter_Platform_TreeListViewCtrl_ClearQueryCtrl = function (treeListGuid) {
    var treeListCtrl = HoteamUI.Control.Instance(treeListGuid);
    var queryCtrl = treeListCtrl.OtherControl("LeftContainerTxt");
    $("#" + queryCtrl.id + "_treeviewQueryTemplate").find("input").val("");
};
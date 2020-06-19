InforCenter_Platform_BomTreeListCtrl_OnCreate = function (pageEvent) {
    var treePage = pageEvent.o;
    var treeCtrl = treePage.GetControl("TreeListView");
    var customContainer = treePage.GetControl('LeftContainerTxt');
    var ctrlEvent = {};
    ctrlEvent.o = customContainer;
    InforCenter_Platform_BomTreeListCtrl_QueryInit(ctrlEvent);
}

//设置标题
InforCenter_Platform_BomTreeListCtrl_SetTitle = function (treePage, text) {
    var titleLabel = treePage.GetControl("TreeListLabel");
    titleLabel.SetText(text);
}

//刷新数据
InforCenter_Platform_BomTreeListCtrl_Refresh = function (ctrlEvent, pagePara) {
    if (HoteamUI.Common.IsNullOrEmpty(pagePara) == false) {
        HoteamUI.Page.SetContainerParas(ctrlEvent.o.ContainerID(), pagePara);
    }

    ctrlEvent.o.Reload();
}

//加载树结构
InforCenter_Platform_BomTreeListCtrl_OnLoadTreeData = function (ctrlEvent) {
    var revsolve = ctrlEvent.resolve;
    var pagePara = HoteamUI.Page.GetContainerPara(ctrlEvent.o.ContainerID());

    var BomTreePara = {};
    var functionName = pagePara.BomTreeParaJs;
    if (window[functionName] && typeof window[functionName] == 'function') {
        BomTreePara = window[functionName](ctrlEvent);
    }
    //调用数据
    InforCenter_Platform_BomTreeListCtrl_GetTreeListDataAsync(pagePara.BomTreeService, BomTreePara, revsolve);
}

//加载树列表表头
InforCenter_Platform_BomTreeListCtrl_OnLoadFieldsData = function (ctrlEvent) {
    var revsolve = ctrlEvent.resolve;
    var pagePara = HoteamUI.Page.GetContainerPara(ctrlEvent.o.ContainerID());

    var BomFieldsPara = {};
    var functionName = pagePara.BomFieldsParaJs;
    if (window[functionName] && typeof window[functionName] == 'function') {
        BomFieldsPara = window[functionName](ctrlEvent);
    }

    //调用数据
    InforCenter_Platform_BomTreeListCtrl_GetTreeListDataAsync(pagePara.BomFieldsService, BomFieldsPara, revsolve);
}

//加载分页数据-异步
InforCenter_Platform_BomTreeListCtrl_OnAsyncLoadData = function (ctrlEvent) {
    InforCenter_Platform_BomTreeListCtrl_OnLoadData(ctrlEvent, false);
}

//加载分页数据-同步
InforCenter_Platform_BomTreeListCtrl_OnSyncLoadData = function (ctrlEvent) {
    return InforCenter_Platform_BomTreeListCtrl_OnLoadData(ctrlEvent, true);
}

//加载分页数据
InforCenter_Platform_BomTreeListCtrl_OnLoadData = function (ctrlEvent, isSync) {
    var revsolve = ctrlEvent.resolve;
    var opt = ctrlEvent.opt;
    var pagePara = HoteamUI.Page.GetContainerPara(ctrlEvent.o.ContainerID());

    var BomListPara = {};
    var functionName = pagePara.BomListParaJs;
    if (window[functionName] && typeof window[functionName] == 'function') {
        BomListPara = window[functionName](ctrlEvent);
    }

    //调用数据
    if (isSync == true) {
        var para = { para: BomListPara };
        var data = HoteamUI.DataService.Call(pagePara.BomListService, para);
        data = JSON.parse(data);
        return data;

    }
    else {
        var callback = function (data) {
            data = JSON.parse(data);
            revsolve({ success: true, data: data });
        }

        InforCenter_Platform_BomTreeListCtrl_GetTreeListDataAsync(pagePara.BomListService, BomListPara, revsolve, callback);
    }
}

InforCenter_Platform_BomTreeListCtrl_GetTreeListDataAsync = function (wcfUri, wcfPara, revsolve, callback) {
    if (wcfUri) {
        //var returnData = InforCenter_Platform_MenuCtrl_GetParameters(pagePara, pagePara);
        //pagePara.ParaList = returnData;
        //var sParaList = JSON.stringify(pagePara);
        var para = { para: wcfPara };
        //$.extend(para.para, wcfPara);
        //异步执行
        // HoteamUI.DataService.Call(rootDataService, para);

        if (!callback) {
            var callback = function (data) {
                revsolve({ success: true, data: data });
            }
        }
        var asyncArgs = {
            serviceuri: wcfUri,
            paras: para,
            callback: callback,
            errorCallback: function () {
                revsolve({ success: false });
            }
        };

        HoteamUI.DataService.AsyncCall(asyncArgs);
    }
    else {
        return null;
    }
}

//展开下级节点
InforCenter_Platform_BomTreeListCtrl_ExpandChild = function (treeListCtrl, ExpandToLevel) {
    var rows = treeListCtrl.GetSelectedRows();
    if (rows.length > 0) {
        treeListCtrl.UpdateChildrenNodes(rows[0].row_number, { ExpandToLevel: ExpandToLevel });
    }
};

//数据刷新完成事件
InforCenter_Platform_BomTreeListCtrl_OnRowUpdated = function (ctrlEvent) {
    var para = { ctrl: ctrlEvent.o, rows: ctrlEvent.rows };
    HoteamUI.Page.FireParentPageEvent(ctrlEvent.o.ContainerID(), 'OnRowUpdated', para);
};

//树节点自定义点击事件
InforCenter_Platform_BomTreeListCtrl_OnRowClick = function (ctrlEvent) {
    var para = { ctrl: ctrlEvent.o, rowid: ctrlEvent.rowid, rowobject: ctrlEvent.rowobject, rowselected: ctrlEvent.rowselected };
    HoteamUI.Page.FireParentPageEvent(ctrlEvent.o.ContainerID(), 'OnRowClick', para);
};

//树节点自定义点击事件
InforCenter_Platform_BomTreeListCtrl_OnBeforeEdit = function (ctrlEvent) {
    var para = { ctrl: ctrlEvent.o, rowid: ctrlEvent.rowid, rowobject: ctrlEvent.rowobject, colName: ctrlEvent.colName };
    return HoteamUI.Page.FireParentPageEvent(ctrlEvent.o.ContainerID(), 'OnBeforeEdit', para);
};

//树节点自定义点击事件 
InforCenter_Platform_BomTreeListCtrl_OnAfterEdit = function (ctrlEvent) {
    var para = { ctrl: ctrlEvent.o, rowid: ctrlEvent.rowid, newData: ctrlEvent.newData, oldData: ctrlEvent.oldData, rowobject: ctrlEvent.rowobject, colName: ctrlEvent.colName };
    return HoteamUI.Page.FireParentPageEvent(ctrlEvent.o.ContainerID(), 'OnAfterEdit', para);
};

//树节点自定义点击事件
InforCenter_Platform_BomTreeListCtrl_OnColImageClick = function (ctrlEvent) {
    var para = { ctrl: ctrlEvent.o, rowid: ctrlEvent.rowid, rowobject: ctrlEvent.rowobject, rowselected: ctrlEvent.rowselected };
    HoteamUI.Page.FireParentPageEvent(ctrlEvent.o.ContainerID(), 'OnColImageClick', para);
};

//树节点自定义点击事件
InforCenter_Platform_BomTreeListCtrl_OnColLinkClick = function (ctrlEvent) {
    var para = { ctrl: ctrlEvent.o, rowid: ctrlEvent.rowid, rowobject: ctrlEvent.rowobject, rowselected: ctrlEvent.rowselected };
    HoteamUI.Page.FireParentPageEvent(ctrlEvent.o.ContainerID(), 'OnColLinkClick', para);
};

//自动展开选中完事件
InforCenter_Platform_BomTreeListCtrl_OnGoto = function (ctrlEvent) {
    var para = { ctrl: ctrlEvent.o, rowid: ctrlEvent.rowid, rowobject: ctrlEvent.rowobject, rowselected: ctrlEvent.rowselected };
    HoteamUI.Page.FireParentPageEvent(ctrlEvent.o.ContainerID(), 'OnGoto', para);
};

//Update刷新当前和树结构
InforCenter_Platform_BomTreeListCtrl_RefreshCurrentAndStructure = function (treeGuid, isRefreshCurrent, isOnlyCurrent) {

    var ctrl = HoteamUI.Control.Instance(treeGuid);
    var rows = [];
    if (isRefreshCurrent) {
        rows = ctrl.GetSelectedRows();
    } else {
        rows = ctrl.GetTopSelectedRows();
    }

    if (isOnlyCurrent == true) {
        for (var i = rows.length - 1; i >= 0; i--) {
            var row = rows[i];
            ctrl.UpdateDataByRowID(row.row_number);
        }
    }
    else {
        for (var i = rows.length - 1; i >= 0; i--) {
            var row = rows[i];
            ctrl.UpdateDataByRowID(row.row_number);
            ctrl.UpdateChildrenNodes(row.row_number, { ExpandToLevel: -1 });
        }
    }
    return ctrl;
};

//Update刷新根节点结构
InforCenter_Platform_BomTreeListCtrl_RefreshRootStructure = function (treeGuid) {
    var ctrl = HoteamUI.Control.Instance(treeGuid);
    ctrl.Reload();
    return ctrl;
};

//Update刷新父节点
InforCenter_Platform_BomTreeListCtrl_RefreshParentAndStructure = function (treeGuid, isRefreshCurrent) {
    var ctrl = HoteamUI.Control.Instance(treeGuid);
    var rows = ctrl.GetTopSelectedRows();
    var parentNodeArray = [];
    var isRoot = false;
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var parentTreeNode = ctrl.GetParentRow(row.row_number);
        if (parentTreeNode && parentTreeNode.row_number) {
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
        ctrl.Reload();
    }
    else {
        for (var i = 0; i < parentNodeArray.length; i++) {
            var parentRow = parentNodeArray[i];
            if (isRefreshCurrent) {
                ctrl.UpdateDataByRowID(parentRow.row_number);
            }
            ctrl.UpdateChildrenNodes(parentRow.row_number, { ExpandToLevel: -1 });
        }
    }
    return ctrl;
};

//Update刷新当前树节点和Tab
InforCenter_Platform_BomTreeListCtrl_RefreshCurrentStructureAndTab = function (treeGuid) {
    var ctrl = InforCenter_Platform_BomTreeListCtrl_RefreshCurrentAndStructure(treeGuid, false);
    HoteamUI.Page.FireParentPageEvent(ctrl.ContainerID(), 'OnNodeChange', {
        ctrl: ctrl
    });
};

//Update刷新当前、结构和Tab
InforCenter_Platform_BomTreeListCtrl_RefreshCurrentAndStructureAndTab = function (treeGuid) {
    var ctrl = InforCenter_Platform_BomTreeListCtrl_RefreshCurrentAndStructure(treeGuid, true);
    HoteamUI.Page.FireParentPageEvent(ctrl.ContainerID(), 'OnNodeChange', {
        ctrl: ctrl
    });
};

//删除及刷新父节点，刷新树结构及tab页
InforCenter_Platform_BomTreeListCtrl_RefreshParentStructureAndTab = function (treeGuid) {
    var ctrl = InforCenter_Platform_BomTreeListCtrl_RefreshParentAndStructure(treeGuid, false);
    HoteamUI.Page.FireParentPageEvent(ctrl.ContainerID(), 'OnNodeChange', { ctrl: ctrl });
};

//删除及刷新父节点，刷新树结构及tab页
InforCenter_Platform_BomTreeListCtrl_RefreshParentAndStructureAndTab = function (treeGuid) {
    var ctrl = InforCenter_Platform_BomTreeListCtrl_RefreshParentAndStructure(treeGuid, true);
    HoteamUI.Page.FireParentPageEvent(ctrl.ContainerID(), 'OnNodeChange', { ctrl: ctrl });
};

//刷新根节点树结构及tab页
InforCenter_Platform_BomTreeListCtrl_RefreshRootStructureAndTab = function (treeGuid) {
    var ctrl = InforCenter_Platform_BomTreeListCtrl_RefreshRootStructure(treeGuid);
    HoteamUI.Page.FireParentPageEvent(ctrl.ContainerID(), 'OnNodeChange', { ctrl: ctrl });
};

//Update刷新树节点
InforCenter_Platform_BomTreeListCtrl_RefreshCurrentAndTab = function (treeGuid) {
    var ctrl = InforCenter_Platform_BomTreeListCtrl_RefreshCurrent(treeGuid);
    HoteamUI.Page.FireParentPageEvent(ctrl.ContainerID(), 'OnNodeChange', { ctrl: ctrl });
};

//Update刷新树节点
InforCenter_Platform_BomTreeListCtrl_RefreshCurrent = function (treeGuid) {
    return InforCenter_Platform_BomTreeListCtrl_RefreshCurrentAndStructure(treeGuid, true, true);
};

//查询相关
InforCenter_Platform_BomTreeListCtrl_QueryInit = function (ctrlEvent) {
    $("#treeviewQueryTemplate").attr("id", ctrlEvent.o.id + "_treeviewQueryTemplate");
    var template = $("#" + ctrlEvent.o.id + "_treeviewQueryTemplate");
    var searchinput = template.find("input");
    searchinput.parent().append("<span class='basesprite b-close treeview-query-search-trash' style='display:none;'/>");
    template.find(".basesprite").each(function () {
        if ($(this).hasClass("b-angle-down")) {
            InforCenter_Platform_ShowSearchHistory($(this), $(this).parents(".treeview-query-search-input").find("input"), "BomTreeListCtrl");
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
            InforCenter_Platform_BomTreeListCtrl_OnQuery(ctrlEvent);
        } else if ($(this).hasClass("b-gray-prev")) {
            InforCenter_Platform_BomTreeListCtrl_OnPrevious(ctrlEvent);
        } else if ($(this).hasClass("b-gray-next")) {
            InforCenter_Platform_BomTreeListCtrl_OnNext(ctrlEvent);
        } else if ($(this).hasClass("b-close")) {
            $(this).siblings("input").val("").focus();
            $(this).hide();
        } else if ($(this).hasClass("b-angle-down")) {
            InforCenter_Platform_ShowSearchHistory($(this), $(this).parents(".treeview-query-search-input").find("input"), "BomTreeListCtrl");
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
            InforCenter_Platform_BomTreeListCtrl_OnQuery(ctrlEvent);
        }
    });
}

//查询
InforCenter_Platform_BomTreeListCtrl_OnQuery = function (ctrlEvent) {
    InforCenter_Platform_BomTreeListCtrl_ExecQuery(ctrlEvent, "QUERY");
};

//执行查询操作
InforCenter_Platform_BomTreeListCtrl_ExecQuery = function (ctrlEvent, type) {
    var searchContainer = ctrlEvent.o.OtherControl("SearchContainer");
    var searchPara = {};
    var text = $("#" + ctrlEvent.o.id + "_treeviewQueryTemplate").find("input").val();
    if (text) {
        var pageContainer = ctrlEvent.o.OtherControl("TreeListView_Container");
        var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
        var treeQueryData = "";
        if (HoteamUI.Common.IsNullOrEmpty(pagePara.BomTreeQueryService) == false) {
            treeQueryData = pagePara.BomTreeQueryService;
        }
        else {
            return;
        }

        var gridGuid = pagePara.TreeListGuid ? pagePara.TreeListGuid : pagePara.TreeTreeListGuid;
        if (HoteamUI.Common.IsNullOrEmpty(gridGuid) == false) {
            var treeCtrl = HoteamUI.Control.Instance(gridGuid);

            var selectRows = treeCtrl.GetSelectedRows();
            if (selectRows.length > 0) {
                var node = selectRows[0];
                var viewName = pagePara.ListViewName ? pagePara.ListViewName : pagePara.TreeViewName;
                var para = { para: {} };
                var functionName = pagePara.BomTreeQueryParaJs;
                if (window[functionName] && typeof window[functionName] == 'function') {
                    ctrlEvent.text = text;
                    para.para = window[functionName](ctrlEvent);
                }
                else {
                    return;
                }

                var data = HoteamUI.DataService.Call(treeQueryData, para);
                if (data == null || data.length == 0) {
                    var para = { pageMode: "OK", context: "Platform", labelName: "DidNotFindTheQueryContent" }
                    HoteamUI.UIManager.Popup("Confirm", para);
                }
                InforCenter_Platform_BomTreeListCtrl_SelectTreeNode(treeCtrl, data[0]);
                searchPara.SearchData = data;
                searchPara.SearchDataSelectIndex = 0;
                searchPara.SearchNodeID = node.row_number;
                InforCenter_Platform_SaveSearchHistory("BomTreeListCtrl", text, 10);
            }
            else {
                var para = { pageMode: "OK", context: "Platform", labelName: "PleaseSelectQueryStartNode" }
                HoteamUI.UIManager.Popup("Confirm", para);
            }

        }
    }
    else {
        var para = { pageMode: "OK", context: "Platform", labelName: "PleaseInputQueryContent" }
        HoteamUI.UIManager.Popup("Confirm", para);
    }
    HoteamUI.Page.SetContainerParas(searchContainer.id, "TreeViewCtrl", searchPara);
};

//下一个
InforCenter_Platform_BomTreeListCtrl_OnNext = function (ctrlEvent) {
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

    if (searchPara.SearchDataSelectIndex + 1 < searchPara.SearchData.length) {
        searchPara.SearchDataSelectIndex = searchPara.SearchDataSelectIndex + 1;
        InforCenter_Platform_BomTreeListCtrl_SelectTreeNode(treeCtrl, searchPara.SearchData[searchPara.SearchDataSelectIndex]);
        HoteamUI.Page.SetContainerParas(searchContainer.id, "TreeViewCtrl", searchPara);
    }
    else {
        var para = { pageMode: "OK", context: "Platform", labelName: "WasTheLastOne" };
        HoteamUI.UIManager.Popup("Confirm", para);
        return;
    }

};
//上一个
InforCenter_Platform_BomTreeListCtrl_OnPrevious = function (ctrlEvent) {
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


    if (searchPara.SearchDataSelectIndex - 1 >= 0) {
        searchPara.SearchDataSelectIndex = searchPara.SearchDataSelectIndex - 1;
        InforCenter_Platform_BomTreeListCtrl_SelectTreeNode(treeCtrl, searchPara.SearchData[searchPara.SearchDataSelectIndex]);
        HoteamUI.Page.SetContainerParas(searchContainer.id, "TreeViewCtrl", searchPara);
    }
    else {
        var para = { pageMode: "OK", context: "Platform", labelName: "WasTheFirstOne" };
        HoteamUI.UIManager.Popup("Confirm", para);
        return;
    }
};

InforCenter_Platform_BomTreeListCtrl_SelectTreeNode = function (ctrl, node) {
    var pageContainer = ctrl.OtherControl("TreeView_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
    if (HoteamUI.Common.IsNullOrEmpty(node) == false) {
        ctrl.GotoRow(node);
        //HoteamUI.Page.FireParentPageEvent(ctrl.ContainerID(), 'OnNodeChange', { ctrl: ctrl });
    }
    //返回空，表示已正常结束
    return null;
};

InforCenter_Platform_BomTreeListCtrl_ClearQueryCtrl = function (treeListGuid) {
    var treeListCtrl = HoteamUI.Control.Instance(treeListGuid);
    var queryCtrl = treeListCtrl.OtherControl("LeftContainerTxt");
    $("#" + queryCtrl.id + "_treeviewQueryTemplate").find("input").val("");

    var searchContainer = treeListCtrl.OtherControl("SearchContainer");
    var searchPara = {};
    searchPara.SearchData = [];
    searchPara.SearchDataSelectIndex = 0;
    searchPara.SearchNodeID = 1;
    HoteamUI.Page.SetContainerParas(searchContainer.id, "TreeViewCtrl", searchPara);
};
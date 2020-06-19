InforCenter_Platform_MenuCtrl_LoadMenus = function (menuPage, para, menuName, sourceData, objectType, nodeType) {
    var data = null;
    if (HoteamUI.Common.IsNullOrEmpty(menuName) == false) {
        var pageContainer = menuPage.GetControl("Menu_Container");
        var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
        //对象类型、节点类型不相同时也重新加载
        if (HoteamUI.Common.IsNullOrEmpty(pagePara.MenuName) == true || pagePara.MenuName != menuName || pagePara.ObjType != objectType
            || (pagePara.NodeType != undefined && pagePara.NodeType != nodeType)) {

            if (sourceData != null) {
                //自定义菜单配置项
                data = sourceData;
            }
            else {
                //根据菜单名称获取菜单项
                data = InforCenter_Platform_GetMenus(menuName, menuPage);
            }
            //if (HoteamUI.Common.IsNullOrEmpty(data.Menus) == false)
            {
                var menuCtrl = menuPage.GetControl("Menu");
                //给容器设置参数
                para.MenuName = menuName;
                para.MenuData = data;
                HoteamUI.Page.SetContainerParas(pageContainer.id, para);
                menuCtrl.LoadItems(data.Menus, data.Type, data.Issplit);
            }
            $.extend(para, HoteamUI.Page.GetContainerPara(pageContainer.id));
        }
        else {
            data = pagePara.MenuData;
            para.MenuName = menuName;
            para.MenuData = data;
            para.CustomViewFilterString = pagePara.CustomViewFilterString;
            var srcUrl = para.Url;
            para.Url = pagePara.Url;
            HoteamUI.Page.SetContainerParas(pageContainer.id, para);
            para.Url = srcUrl;
        }
    }
    return data;
}

/*
@page 菜单页面
@pagePara 页面参数
@bindCtrl 右键菜单绑定的控件
*/
InforCenter_Platform_MenuCtrl_LoadRightMenus = function (page, pagePara, bindCtrl) {
    if (HoteamUI.Common.IsNullOrEmpty(bindCtrl)) {
        HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("Menu.MissBind"));
        return;
    }
    var ctrlType = bindCtrl.ControlInfo().TypeName;
    var func = InforCenter_Platform_MenuCtrl_GetCtrlType(pagePara, ctrlType, bindCtrl.id);
    var rightMenuCtrl = page.GetControl("RightMenu");
    //var bindCtrl = page.GetControl("TreeView");
    var ObjTypes = pagePara.ObjTypes;
    var rightmenudata;
    var rightmenuid = rightMenuCtrl.id + "_RightMenu";
    var hasRightMenu = false;
    rightMenuCtrl.RemoveAllItems();
    if (ObjTypes && ObjTypes.length > 0) {
        for (var i = 0; i < ObjTypes.length; i++) {
            var objType = ObjTypes[i];
            if (objType.MenuName) {
                rightmenudata = InforCenter_Platform_GetMenus(objType.MenuName, page, { ObjType: objType.Name }).Menus;
                rightMenuCtrl.LoadItems(rightmenudata, objType.Name, objType.MenuName);
                hasRightMenu = true;
            }
        }
    } else {
        if (pagePara.MenuName) {
            rightmenudata = InforCenter_Platform_GetMenus(pagePara.MenuName, page, { ObjType: pagePara.ObjectType }).Menus;
            rightMenuCtrl.LoadItems(rightmenudata, pagePara.ObjectType, pagePara.MenuName);
            hasRightMenu = true;
        }
    }
    if (hasRightMenu) {
        bindCtrl[func](rightmenuid);
        var rightmenuContainer = page.GetControl("RightMenu_Container");
        HoteamUI.Page.SetContainerParas(rightmenuContainer.id, pagePara);
    }
}

InforCenter_Platform_MenuCtrl_GetCtrlType = function (para, typeName, ctrlId) {
    var functionName = "";
    switch (typeName) {
        case "Tree":
            para.TreeGuid = ctrlId;
            functionName = "SetTreeRightMenu";
            break;
        case "ListView":
            para.ListGuid = ctrlId;
            functionName = "SetListRightMenu";
            break;
        case "TreeListView":
            para.TreeListGuid = ctrlId;
            functionName = "SetTreeRightMenu";
            break;
        default:
            para.TreeGuid = ctrlId;
            functionName = "SetRightMenu";
            break;
    }
    return functionName;
}

//菜单点击处理事件
InforCenter_Platform_MenuCtrl_OnClick = function (ctrlEvent) {
    var pageContainerID;
    var para;
    switch (ctrlEvent.menuType) {
        case "rightmenu":
            var pageContainer = ctrlEvent.o.OtherControl("RightMenu_Container");
            pageContainerID = pageContainer.id;
            para = HoteamUI.Page.GetContainerPara(pageContainerID);
            if (HoteamUI.Common.IsNullOrEmpty(para)) {
                para = {};
            }
            para.WebAtionName = ctrlEvent.value;
            para.MenuName = ctrlEvent.menuName;
            InforCenter_Platform_MenuCtrl_MergeUrl(para);
            HoteamUI.Page.SetContainerParas(pageContainerID, para);
            break;
        case "ocxmenu":
            pageContainerID = ctrlEvent.ContainerId;
            para = HoteamUI.Page.GetContainerPara(pageContainerID);
            if (HoteamUI.Common.IsNullOrEmpty(para)) {
                para = {};
            }
            para.WebAtionName = ctrlEvent.value;
            InforCenter_Platform_MenuCtrl_MergeUrl(para);
            HoteamUI.Page.SetContainerParas(pageContainerID, para);
            break;
        default:
            var pageContainer = ctrlEvent.o.OtherControl("Menu_Container");
            pageContainerID = pageContainer.id;
            para = HoteamUI.Page.GetContainerPara(pageContainerID);
            if (HoteamUI.Common.IsNullOrEmpty(para)) {
                para = {};
            }
            para.WebAtionName = ctrlEvent.value;
            InforCenter_Platform_MenuCtrl_MergeUrl(para);
            HoteamUI.Page.SetContainerParas(pageContainerID, para);
            break;
    }

    var selectionString = "{para:{Order:-1,MenuName:'" + para.MenuName + "',WebAtionName:'" + para.WebAtionName + "',ContainerID:'" + pageContainerID + "'}}";
    var para = eval("(" + selectionString + ")");
    HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "ExecuteWebAction", para);
}
InforCenter_Platform_MenuCtrl_MergeUrl = function (para) {
    var webActionName = para.WebAtionName;
    var menus = InforCenter_Platform_GetMenus(para.MenuName);
    var List = [];
    // for (var item in menus.Menus) {
    for (var i = 0; i < menus.Menus.length; i++) {
        var menu = menus.Menus[i];
        List.length = 0;
        if (menu.Value == webActionName) {
            List.push(webActionName);
            break;
        }
        else {
            if (menu.Children.length > 0) {
                List.push(menu.Value);
                var ret = Recursion(menu.Children, webActionName, List);
                if (ret) {
                    break;
                }
            }
        }
    }
    var path = List.join(';');
    if (!HoteamUI.Common.IsNullOrEmpty(para.Url)) {
        var pathAll = para.Url.join(';');
        if (pathAll.indexOf(path) < 0) {
            for (var i = 0, len = List.length; i < len; i++) {
                para.Url.push(List[i]);
            }
        }
    }
    function Recursion(webActions, webActionName, List) {
        //    for (var item in webActions) {
        for (var i = 0; i < webActions.length; i++) {
            if (webActions[i].Value == webActionName) {
                List.push(webActionName);
                return true;
            } else {
                if (webActions[i].Children.length > 0) {
                    List.push(webActions[i].Value);
                    Recursion(webActions[i].Children, webActionName, List);
                }
            }
        }
    }
}

InforCenter_Platform_MenuCtrl_OnDropDownListChange = function (ctrlEvent) {

    var pageContainer = ctrlEvent.o.OtherControl("Menu_Container");
    var para = HoteamUI.Page.GetContainerPara(pageContainer.id);
    para.WebAtionName = ctrlEvent.value;
    para.DropDownListValue = ctrlEvent.DropDownListValue;
    HoteamUI.Page.SetContainerParas(pageContainer.id, para);
    var selectionString = "{para:{Order:-1,MenuName:'" + para.MenuName + "',WebAtionName:'" + para.WebAtionName + "',ContainerID:'" + pageContainer.id + "',DropDownListalVue:\"" + para.DropDownListValue + "\"}}";
    var para = eval("(" + selectionString + ")");
    HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "ExecuteWebAction", para);
}

//循环处理WebAction多步操作
InforCenter_Platform_MenuCtrl_InnerReceiveServerData = function (data, ret) {

    if (ret && (ret.confirm == undefined || ret.confirm.toUpperCase() == "OK")) {
        if (HoteamUI.Common.IsNullOrEmpty(data.Order) == false && data.Order != "-2") {

            if ($("#" + data.ContainerID).length == 0) {
                return;
            }

            var para = HoteamUI.Page.GetContainerPara(data.ContainerID);
            data.MenuName = para.MenuName;
            data.WebAtionName = para.WebAtionName;
            if (data.ParaList instanceof Array) {
                var returnData = InforCenter_Platform_MenuCtrl_GetParameters(data, para, ret);
                data.StrParaList = JSON.stringify(returnData);
            }
            HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "ExecuteWebAction", { para: data });
        }
    }
}

//执行消息方法
InforCenter_Platform_MenuCtrl_ExecWebMessage = function (execPara) {
    if (execPara.PromptMode == "PROMPT") {
        title = HoteamUI.Language.Lang("Platform.Prompt");
        HoteamUI.UIManager.Popup({ pagename: "Confirm", paras: { pageMode: "OK", message: execPara.PromptContent }, title: title });

        return;
    }
    else if (execPara.PromptMode == "NORMAL") {

        HoteamUI.UIManager.Popup({ pagename: "Confirm", paras: { pageMode: "OK", message: execPara.PromptContent }, callback: InforCenter_Platform_MenuCtrl_InnerReceiveServerData, data: execPara });

    }
    else if (execPara.PromptMode == "CONFIRM") {
        title = HoteamUI.Language.Lang("Platform.Confirm");
        HoteamUI.UIManager.Popup({ pagename: "Confirm", paras: { pageMode: "OkCancel", message: execPara.PromptContent }, callback: InforCenter_Platform_MenuCtrl_InnerReceiveServerData, data: execPara, title: title });
    }
    else if (execPara.PromptMode == "NULL") {
        InforCenter_Platform_MenuCtrl_InnerReceiveServerData(execPara, { confirm: 'OK' });
    }
    else if (execPara.PromptMode == "REFRESH") {
        InforCenter_Platform_MenuCtrl_RefreshData(execPara);
        if (execPara.IsLoopExec == true) {
            InforCenter_Platform_MenuCtrl_InnerReceiveServerData(execPara, { confirm: 'OK' });
        }
    }

}

//执行弹出页面方法
InforCenter_Platform_MenuCtrl_ExecWebMethod = function (paras) {
    var execPara = paras[0];
    var pagePara = {};
    if (paras.length > 1) {
        pagePara = paras[1];
    }
    pagePara.IsLoopExec = execPara.IsLoopExec;
    var size = null;
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.Size) == false) {
        size = pagePara.Size;
    }
    var title = null;
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.Title) == false) {
        title = HoteamUI.Language.Lang(pagePara.Title);
    }
    if (execPara.IsPopup && execPara.IsPopup == true) {
        if (execPara.IsSideSlip && execPara.IsSideSlip == true) {
            var width = 500;
            if (size != null && size.indexOf('*') > -1) {
                var values = size.split('_');
                if (values.length == 2) {
                    width = Number(values[1]);
                }
            }
            HoteamUI.UIManager.Sideslip({ pagename: execPara.PageName, paras: pagePara, title: title, width: width, callback: InforCenter_Platform_MenuCtrl_InnerReceiveServerData, data: execPara });
        }
        else {
            HoteamUI.UIManager.Popup({ pagename: execPara.PageName, paras: pagePara, callback: InforCenter_Platform_MenuCtrl_InnerReceiveServerData, data: execPara, size: size, title: title, modal: execPara.IsModal, minWindow: execPara.MinWindow, maxWindow: execPara.MaxWindow });
        }
    }
    else {
        InforCenter_Platform_MainTabs_AddTab(execPara.PageName, pagePara, title, true);
    }
};
//执行JS方法
InforCenter_Platform_MenuCtrl_ExecJSMethod = function (paras) {
    var execPara = [];
    execPara.push(JSON.parse(paras.ExecPara));
    execPara.push(JSON.parse(paras.PagePara));
    var ret = HoteamUI.Common.ExeFunction(paras.JSName, execPara);
    InforCenter_Platform_MenuCtrl_InnerReceiveServerData(execPara[0], ret);
};
//刷新页面方法
InforCenter_Platform_MenuCtrl_RefreshData = function (paras) {
    if (HoteamUI.Common.IsNullOrEmpty(paras.PromptContent) == false
        && HoteamUI.Common.IsNullOrEmpty(paras.ContainerID) == false && $("#" + paras.ContainerID).length) {
        var paraValues = HoteamUI.Page.GetContainerPara(paras.ContainerID);
        if (HoteamUI.Common.IsNullOrEmpty(paras.JSMethod) == false) {
            HoteamUI.Common.ExeFunction(paras.JSMethod, paras);
        }
        else {

            //判断是否有listguid或者treelistgrid
            function checkIfHasListGrid(paraValues, refreshedSelect, callback) {
                var listGuid = paraValues.ListGuid || paraValues.TreeListGuid;
                if (listGuid) {
                    var ctrl = HoteamUI.Control.Instance(listGuid);
                    getAndSetSelectedList(ctrl, refreshedSelect, callback);
                } else {
                    callback();
                }
            }
            //记录选中行主键,刷新后可以重新将选中状态设置
            function getAndSetSelectedList(ctrl, refreshedSelect, refreshFun) {
                var idArr;
                var callback = null;
                var callbackPara = {};
                if (refreshedSelect) {
                    idArr = ctrl.GetSelectedRowIds();
                    //修复异步加载时不能重新选中问题
                    callback = function (ret, data) {
                        data.ctrl.SetSelectedRowByIds(JSON.parse(data.idArr));
                    }
                    callbackPara.ctrl = ctrl;
                    callbackPara.idArr = JSON.stringify(idArr);
                }
                refreshFun(callback, callbackPara);

                if (refreshedSelect) {
                    idArr = ctrl.SetSelectedRowByIds(idArr);
                }
            }

            switch (paras.PromptContent) {
                //Update开头的刷新方式已过时，会逐步废弃
                case "UPDATELIST":
                    if (HoteamUI.Common.IsNullOrEmpty(paraValues.ListGuid) == false) {
                        checkIfHasListGrid(paraValues, paras.RefreshedSelect, function (callback, callbackPara) {
                            InforCenter_Platform_ListViewCtrl_GetOnePageGridData(HoteamUI.Control.Instance(paraValues.ListGuid), {}, {}, callback, callbackPara);
                        });
                    }
                    break;
                case "UPDATEEDITLIST":
                    if (HoteamUI.Common.IsNullOrEmpty(paraValues.ListGuid) == false) {
                        checkIfHasListGrid(paraValues, paras.RefreshedSelect, function () {
                            InforCenter_Platform_EditListViewCtrl_GetGridData(HoteamUI.Control.Instance(paraValues.ListGuid), {});
                        });
                    }
                    break;
                case "UPDATEPARENTSTRUCTURE":
                    if (HoteamUI.Common.IsNullOrEmpty(paraValues.TreeGuid) == false) {
                        checkIfHasListGrid(paraValues, paras.RefreshedSelect, function () {
                            InforCenter_Platform_TreeViewCtrl_RefreshParentStructureAndTab(paraValues.TreeGuid);
                        });
                    }
                    break;
                case "UPDATEROOTSTRUCTURE":
                    if (HoteamUI.Common.IsNullOrEmpty(paraValues.TreeGuid) == false) {
                        checkIfHasListGrid(paraValues, paras.RefreshedSelect, function () {
                            InforCenter_Platform_TreeViewCtrl_RefreshRootStructureAndTab(paraValues.TreeGuid);
                        });
                    }
                    break;
                case "UPDATECURRENTSTRUCTURE":
                    if (HoteamUI.Common.IsNullOrEmpty(paraValues.TreeGuid) == false) {
                        checkIfHasListGrid(paraValues, paras.RefreshedSelect, function () {
                            InforCenter_Platform_TreeViewCtrl_RefreshCurrentStructureAndTab(paraValues.TreeGuid);
                        });
                    }
                    break;
                case "UPDATECURRENTNODE":
                    if (HoteamUI.Common.IsNullOrEmpty(paraValues.TreeGuid) == false) {
                        checkIfHasListGrid(paraValues, paras.RefreshedSelect, function () {
                            InforCenter_Platform_TreeViewCtrl_RefreshCurrentStructure(paraValues.TreeGuid);
                        });
                    }
                    break;
                case "UPDATEPARENTNODE":
                    if (HoteamUI.Common.IsNullOrEmpty(paraValues.TreeGuid) == false) {
                        checkIfHasListGrid(paraValues, paras.RefreshedSelect, function () {
                            InforCenter_Platform_TreeViewCtrl_RefreshParentStructure(paraValues.TreeGuid);
                        });
                    }
                    break;
                case "UPDATEROOTNODE":
                    if (HoteamUI.Common.IsNullOrEmpty(paraValues.TreeGuid) == false) {
                        checkIfHasListGrid(paraValues, paras.RefreshedSelect, function () {
                            InforCenter_Platform_TreeViewCtrl_RefreshRootStructure(paraValues.TreeGuid);
                        });
                    }
                    break;
                case "UPDATESELECTTAB":
                    if (HoteamUI.Common.IsNullOrEmpty(paraValues.TreeGuid) == false) {
                        checkIfHasListGrid(paraValues, paras.RefreshedSelect, function () {
                            HoteamUI.Page.FireParentPageEvent(paras.ContainerID, 'OnNodeChange', { ctrl: HoteamUI.Control.Instance(paraValues.TreeGuid) });
                        });
                    }
                    break;
                case "UPDATEQUICKNAV":
                    if (InforCenter_Platform_QuickRefeshData) {
                        InforCenter_Platform_QuickRefeshData();
                    }
                    break;
                case "UPDATEOBJECTINSPECTOR":
                    InforCenter_Platform_ObjectInspector_AddMainTab(paraValues);
                    break;
                //新的刷新方式
                case "RefreshList":
                    if (HoteamUI.Common.IsNullOrEmpty(paraValues.ListGuid) == false) {
                        checkIfHasListGrid(paraValues, paras.RefreshedSelect, function (callback, callbackPara) {
                            InforCenter_Platform_ListViewCtrl_GetOnePageGridData(HoteamUI.Control.Instance(paraValues.ListGuid), {}, {}, callback, callbackPara);
                        });
                    }
                    break;
                case "RefreshEditList":
                    if (HoteamUI.Common.IsNullOrEmpty(paraValues.ListGuid) == false) {
                        checkIfHasListGrid(paraValues, paras.RefreshedSelect, function () {
                            InforCenter_Platform_EditListViewCtrl_GetGridData(HoteamUI.Control.Instance(paraValues.ListGuid), {});
                        });
                    }
                    break;
                //新的刷新方式
                case "RefreshFilterList":
                    if (HoteamUI.Common.IsNullOrEmpty(paraValues.ListGuid) == false) {
                        checkIfHasListGrid(paraValues, paras.RefreshedSelect, function () {
                            InforCenter_Platform_FilterListViewCtrl_GetOnePageGridData(HoteamUI.Control.Instance(paraValues.ListGuid), {});
                        });
                    }
                    break;
                case "RefreshCurrentNode":
                    if (HoteamUI.Common.IsNullOrEmpty(paraValues.TreeListGuid) == false) {
                        checkIfHasListGrid(paraValues, paras.RefreshedSelect, function () {
                            if (paraValues.IsBomTreeList === true) {
                                InforCenter_Platform_BomTreeListCtrl_RefreshCurrent(paraValues.TreeListGuid);
                            }
                            else {
                                InforCenter_Platform_TreeListViewCtrl_RefreshCurrent(paraValues.TreeListGuid);
                            }
                        });
                    }
                    break;
                case "RefreshCurrentNodeAndTab":
                    if (HoteamUI.Common.IsNullOrEmpty(paraValues.TreeListGuid) == false) {
                        checkIfHasListGrid(paraValues, paras.RefreshedSelect, function () {
                            if (paraValues.IsBomTreeList === true) {
                                InforCenter_Platform_BomTreeListCtrl_RefreshCurrentAndTab(paraValues.TreeListGuid);
                            }
                            else {
                                InforCenter_Platform_TreeListViewCtrl_RefreshCurrentAndTab(paraValues.TreeListGuid);
                            }
                        });
                    }
                    break;
                case "RefreshCurrentStruct":
                    if (HoteamUI.Common.IsNullOrEmpty(paraValues.TreeGuid) == false) {
                        checkIfHasListGrid(paraValues, paras.RefreshedSelect, function () {
                            InforCenter_Platform_TreeViewCtrl_RefreshCurrentStructure(paraValues.TreeGuid);
                        });
                    }
                    else if (HoteamUI.Common.IsNullOrEmpty(paraValues.TreeListGuid) == false) {
                        checkIfHasListGrid(paraValues, paras.RefreshedSelect, function () {
                            if (paraValues.IsBomTreeList === true) {
                                InforCenter_Platform_BomTreeListCtrl_RefreshCurrentAndStructure(paraValues.TreeListGuid, false);
                            }
                            else {
                                InforCenter_Platform_TreeListViewCtrl_RefreshCurrentAndStructure(paraValues.TreeListGuid, false);
                            }
                        });
                    }
                    break;
                case "RefreshCurrentAndStruct":
                    if (HoteamUI.Common.IsNullOrEmpty(paraValues.TreeGuid) == false) {
                        //TODO:树节点待实现
                    }
                    else if (HoteamUI.Common.IsNullOrEmpty(paraValues.TreeListGuid) == false) {
                        checkIfHasListGrid(paraValues, paras.RefreshedSelect, function () {
                            if (paraValues.IsBomTreeList === true) {
                                InforCenter_Platform_BomTreeListCtrl_RefreshCurrentAndStructure(paraValues.TreeListGuid, true);
                            }
                            else {
                                InforCenter_Platform_TreeListViewCtrl_RefreshCurrentAndStructure(paraValues.TreeListGuid, true);
                            }
                        });
                    }
                    break;
                case "RefreshCurrentStructAndTab":
                    if (HoteamUI.Common.IsNullOrEmpty(paraValues.TreeGuid) == false) {
                        checkIfHasListGrid(paraValues, paras.RefreshedSelect, function () {
                            InforCenter_Platform_TreeViewCtrl_RefreshCurrentStructureAndTab(paraValues.TreeGuid);
                        });
                    }
                    else if (HoteamUI.Common.IsNullOrEmpty(paraValues.TreeListGuid) == false) {
                        checkIfHasListGrid(paraValues, paras.RefreshedSelect, function () {
                            if (paraValues.IsBomTreeList === true) {
                                InforCenter_Platform_BomTreeListCtrl_RefreshCurrentStructureAndTab(paraValues.TreeListGuid);
                            }
                            else {
                                InforCenter_Platform_TreeListViewCtrl_RefreshCurrentStructureAndTab(paraValues.TreeListGuid);
                            }
                        });
                    }
                    break;
                case "RefreshCurrentAndStructAndTab":
                    if (HoteamUI.Common.IsNullOrEmpty(paraValues.TreeGuid) == false) {
                        //TODO:树节点待实现
                    }
                    else if (HoteamUI.Common.IsNullOrEmpty(paraValues.TreeListGuid) == false) {
                        checkIfHasListGrid(paraValues, paras.RefreshedSelect, function () {
                            if (paraValues.IsBomTreeList === true) {
                                InforCenter_Platform_BomTreeListCtrl_RefreshCurrentAndStructureAndTab(paraValues.TreeListGuid);
                            }
                            else {
                                InforCenter_Platform_TreeListViewCtrl_RefreshCurrentAndStructureAndTab(paraValues.TreeListGuid);
                            }
                        });
                    }
                    break;
                case "RefreshParentStruct":
                    if (HoteamUI.Common.IsNullOrEmpty(paraValues.TreeGuid) == false) {
                        checkIfHasListGrid(paraValues, paras.RefreshedSelect, function () {
                            InforCenter_Platform_TreeViewCtrl_RefreshParentStructure(paraValues.TreeGuid);
                        });
                    }
                    else if (HoteamUI.Common.IsNullOrEmpty(paraValues.TreeListGuid) == false) {
                        checkIfHasListGrid(paraValues, paras.RefreshedSelect, function () {
                            if (paraValues.IsBomTreeList === true) {
                                InforCenter_Platform_BomTreeListCtrl_RefreshParentAndStructure(paraValues.TreeListGuid, false);
                            }
                            else {
                                InforCenter_Platform_TreeListViewCtrl_RefreshParentAndStructure(paraValues.TreeListGuid, false);
                            }
                        });
                    }
                    break;
                case "RefreshParentAndStruct":
                    if (HoteamUI.Common.IsNullOrEmpty(paraValues.TreeGuid) == false) {
                        //TODO:树节点待实现
                    }
                    else if (HoteamUI.Common.IsNullOrEmpty(paraValues.TreeListGuid) == false) {
                        checkIfHasListGrid(paraValues, paras.RefreshedSelect, function () {
                            if (paraValues.IsBomTreeList === true) {
                                InforCenter_Platform_BomTreeListCtrl_RefreshParentAndStructure(paraValues.TreeListGuid, true);
                            }
                            else {
                                InforCenter_Platform_TreeListViewCtrl_RefreshParentAndStructure(paraValues.TreeListGuid, true);
                            }
                        });
                    }
                    break;
                case "RefreshParentStructAndTab":
                    if (HoteamUI.Common.IsNullOrEmpty(paraValues.TreeGuid) == false) {
                        checkIfHasListGrid(paraValues, paras.RefreshedSelect, function () {
                            InforCenter_Platform_TreeViewCtrl_RefreshParentStructureAndTab(paraValues.TreeGuid);
                        });
                    }
                    else if (HoteamUI.Common.IsNullOrEmpty(paraValues.TreeListGuid) == false) {
                        checkIfHasListGrid(paraValues, paras.RefreshedSelect, function () {
                            if (paraValues.IsBomTreeList === true) {
                                InforCenter_Platform_BomTreeListCtrl_RefreshParentStructureAndTab(paraValues.TreeListGuid);
                            }
                            else {
                                InforCenter_Platform_TreeListViewCtrl_RefreshParentStructureAndTab(paraValues.TreeListGuid);
                            }
                        });
                    }
                    break;
                case "RefreshParentAndStructAndTab":
                    if (HoteamUI.Common.IsNullOrEmpty(paraValues.TreeGuid) == false) {
                        //TODO:树节点待实现
                    }
                    else if (HoteamUI.Common.IsNullOrEmpty(paraValues.TreeListGuid) == false) {
                        checkIfHasListGrid(paraValues, paras.RefreshedSelect, function () {
                            if (paraValues.IsBomTreeList === true) {
                                InforCenter_Platform_BomTreeListCtrl_RefreshParentAndStructureAndTab(paraValues.TreeListGuid);
                            }
                            else {
                                InforCenter_Platform_TreeListViewCtrl_RefreshParentAndStructureAndTab(paraValues.TreeListGuid);
                            }
                        });
                    }
                    break;
                case "RefreshRootStruct":
                    if (HoteamUI.Common.IsNullOrEmpty(paraValues.TreeGuid) == false) {
                        checkIfHasListGrid(paraValues, paras.RefreshedSelect, function () {
                            InforCenter_Platform_TreeViewCtrl_RefreshRootStructure(paraValues.TreeGuid);
                        });
                    }
                    else if (HoteamUI.Common.IsNullOrEmpty(paraValues.TreeListGuid) == false) {
                        checkIfHasListGrid(paraValues, paras.RefreshedSelect, function () {
                            if (paraValues.IsBomTreeList === true) {
                                InforCenter_Platform_BomTreeListCtrl_RefreshRootStructure(paraValues.TreeListGuid);
                            }
                            else {
                                InforCenter_Platform_TreeListViewCtrl_RefreshRootStructure(paraValues.TreeListGuid);
                            }
                        });
                    }
                    break;
                case "RefreshRootStructAndTab":
                    if (HoteamUI.Common.IsNullOrEmpty(paraValues.TreeGuid) == false) {
                        checkIfHasListGrid(paraValues, paras.RefreshedSelect, function () {
                            InforCenter_Platform_TreeViewCtrl_RefreshRootStructureAndTab(paraValues.TreeGuid);
                        });
                    }
                    else if (HoteamUI.Common.IsNullOrEmpty(paraValues.TreeListGuid) == false) {
                        checkIfHasListGrid(paraValues, paras.RefreshedSelect, function () {
                            if (paraValues.IsBomTreeList === true) {
                                InforCenter_Platform_BomTreeListCtrl_RefreshRootStructureAndTab(paraValues.TreeListGuid);
                            }
                            else {
                                InforCenter_Platform_TreeListViewCtrl_RefreshRootStructureAndTab(paraValues.TreeListGuid);
                            }
                        });
                    }
                    break;
                case "RefreshSelectTab":
                    if (HoteamUI.Common.IsNullOrEmpty(paraValues.TreeGuid) == false) {
                        checkIfHasListGrid(paraValues, paras.RefreshedSelect, function () {
                            var ctrl = HoteamUI.Control.Instance(paraValues.TreeGuid);
                            HoteamUI.Page.FireParentPageEvent(paras.ContainerID, 'OnNodeChange', { ctrl: ctrl });
                        });
                    }
                    break;
                case "RefreshQuickNav":
                    if (InforCenter_Platform_QuickRefeshData) {
                        InforCenter_Platform_QuickRefeshData();
                    }
                    break;
                case "RefreshObjectInspector":
                    InforCenter_Platform_ObjectInspector_AddMainTab(paraValues);
                    break;
                case "DeleteObjectInspector":
                    InforCenter_Platform_ObjectInspector_RemoveTab(paraValues);
                    break;
                case "RefreshParentStructAndRootCountAndTab":
                    if (HoteamUI.Common.IsNullOrEmpty(paraValues.TreeGuid) == false) {
                        checkIfHasListGrid(paraValues, paras.RefreshedSelect, function () {
                            InforCenter_Platform_TreeViewCtrl_RefreshParentStructureAndTab(paraValues.TreeGuid);
                            InforCenter_Platform_TreeViewCtrl_RefreshCurrentStructCount(paraValues.TreeGuid, true);
                        });
                    }
                    break;
                case "RefreshParentStructAndRootCount":
                    if (HoteamUI.Common.IsNullOrEmpty(paraValues.TreeGuid) == false) {
                        checkIfHasListGrid(paraValues, paras.RefreshedSelect, function () {
                            InforCenter_Platform_TreeViewCtrl_RefreshParentStructure(paraValues.TreeGuid);
                            InforCenter_Platform_TreeViewCtrl_RefreshCurrentStructCount(paraValues.TreeGuid, true);
                        });
                    }
                    break;
                case "RefreshCurrentStructAndRootCountAndTab":
                    if (HoteamUI.Common.IsNullOrEmpty(paraValues.TreeGuid) == false) {
                        checkIfHasListGrid(paraValues, paras.RefreshedSelect, function () {
                            InforCenter_Platform_TreeViewCtrl_RefreshCurrentStructureAndTab(paraValues.TreeGuid);
                            InforCenter_Platform_TreeViewCtrl_RefreshCurrentStructCount(paraValues.TreeGuid, true);
                        });
                    }
                    break;
                case "RefreshCurrentCountAndTab":
                    if (HoteamUI.Common.IsNullOrEmpty(paraValues.TreeGuid) == false) {
                        checkIfHasListGrid(paraValues, paras.RefreshedSelect, function () {
                            InforCenter_Platform_TreeViewCtrl_RefreshCurrentStructureAndTab(paraValues.TreeGuid);
                            InforCenter_Platform_TreeViewCtrl_RefreshCurrentStructCount(paraValues.TreeGuid);
                        });
                    }
                    break;
                default:
                    break;
            }
        }
    }
}

//处理返回值
InforCenter_Platform_MenuCtrl_GetParameters = function (data, para, ret, node) {
    var jdata = {};
    if (HoteamUI.Common.IsNullOrEmpty(data.ParaList) == false) {
        var paraList = data.ParaList;
        var gridSelectData = null;
        if (HoteamUI.Common.IsNullOrEmpty(para.ListSelectObject)) {
            if (HoteamUI.Common.IsNullOrEmpty(para.ListGuid) == false) {
                try {
                    var grid = HoteamUI.Control.Instance(para.ListGuid);
                    gridSelectData = grid.GetSelectedRows();


                }
                catch (p) { }
            } else if (!HoteamUI.Common.IsNullOrEmpty(para.GanttGuid)) {
                var ganttGrid = HoteamUI.Control.Instance(para.GanttGuid);
                gridSelectData = ganttGrid.GetSelectedRow();
            }
        }
        else {
            gridSelectData = para.ListSelectObject;
        }
        var tree = null;
        var selectNode = null;

        if (HoteamUI.Common.IsNullOrEmpty(para.TreeGuid) == false) {
            tree = HoteamUI.Control.Instance(para.TreeGuid);
            selectNode = tree.GetSelectedNode();
        }
        if (HoteamUI.Common.IsNullOrEmpty(para.TreeListGuid) == false) {
            tree = HoteamUI.Control.Instance(para.TreeListGuid);
            selectNode = tree.GetSelectedRows();
        }
        if (node) {
            selectNode = node;
        }
        //for (var index in paraList) {
        for (var i = 0; i < paraList.length; i++) {
            var itemVaule = paraList[i];
            var array = null;
            if (itemVaule.toUpperCase() == "LISTID") {
                if (HoteamUI.Common.IsNullOrEmpty(para.ListGuid) == false) {
                    array = [para.ListGuid];
                }
            }
            else if (itemVaule.toUpperCase() == "TREEID") {
                if (HoteamUI.Common.IsNullOrEmpty(para.TreeGuid) == false) {
                    array = [para.TreeGuid];
                }
            }
            else if (itemVaule.toUpperCase() == "TREELISTID") {
                if (HoteamUI.Common.IsNullOrEmpty(para.TreeListGuid) == false) {
                    array = [para.TreeListGuid];
                }
            }
            else if (itemVaule.toUpperCase() == "CONTAINERID") {
                if (HoteamUI.Common.IsNullOrEmpty(para.ContainerID) == false) {
                    array = [para.ContainerID];
                }
            }
            else if (itemVaule.indexOf('_') > -1) {

                var itemVaules = itemVaule.split('_');
                if (itemVaules[0].toUpperCase() == "LIST"
                    && gridSelectData != null
                    && itemVaules.length >= 2) {
                    var tmpValue = itemVaule.substr(5);
                    array = InforCenter_Platform_MenuCtrl_GetListOrRetParameter(tmpValue, gridSelectData);
                }
                if (itemVaules[0].toUpperCase() == "RETURNVALUE"
                    && ret != null
                    && (itemVaules.length == 2 || itemVaules.length == 3)) {
                    var tmpValue = itemVaules[1];
                    if (itemVaules.length == 3) {
                        tmpValue = itemVaules[1] + "_" + itemVaules[2];
                    }
                    array = InforCenter_Platform_MenuCtrl_GetListOrRetParameter(tmpValue, ret);
                }

                if (itemVaules[0].toUpperCase() == "TREELIST"
                    && selectNode != null
                    && (itemVaules.length == 3 || itemVaules.length == 4)) {
                    array = InforCenter_Platform_MenuCtrl_GetTreeListParameter(itemVaules[1], itemVaules, selectNode, tree);
                }
                else if (itemVaules[0].toUpperCase() == "TREE"
                    && selectNode != null
                    && (itemVaules.length == 3 || itemVaules.length == 4)) {
                    array = InforCenter_Platform_MenuCtrl_GetTreeParameter(itemVaules[1], itemVaules, selectNode, tree);
                }

                if (itemVaules[0].toUpperCase() == "QUICKNAV" && itemVaules.length == 2
                    && InforCenter_Platform_QuickRightMenuData != undefined) {
                    array = [InforCenter_Platform_QuickRightMenuData];
                }
                if (itemVaules[0].toUpperCase() == "TOPOLOGYVIEW" && itemVaules.length == 2) {
                    if (HoteamUI.Common.IsNullOrEmpty(para.TopologyViewGuid) == false) {
                        var topologyView = HoteamUI.Control.Instance(para.TopologyViewGuid);
                        var viewData = topologyView.GetSelectedNode();
                        array = InforCenter_Platform_MenuCtrl_GetListOrRetParameter(itemVaules[1], viewData);
                    }

                }
                if (itemVaules[0].toUpperCase() == "CLIPBOARD"
                    && itemVaules[1].toUpperCase() == "EID"
                    && ClipBoard.ObjIDArr.length > 0) {
                    array = ClipBoard.ObjIDArr;
                }
                if (itemVaules[0].toUpperCase() == "GANTT" && gridSelectData != null && itemVaules.length >= 2) {
                    array = InforCenter_Platform_MenuCtrl_GetGanttOrRetParameter(itemVaules[1], itemVaules, gridSelectData);
                }
            }
            else {
                try {
                    var value = para[itemVaule];
                    if (HoteamUI.Common.IsNullOrEmpty(value) == false) {
                        array = [value];
                    }
                }
                catch (e) { }
            }
            if (array != null && array.length > 0) {
                jdata[itemVaule] = array;
            }
        }
    }
    return jdata;
}

InforCenter_Platform_MenuCtrl_GetGanttOrRetParameter = function (field, idArray, gridSelectData) {
    var para = [];
    if (gridSelectData instanceof Array) {
        for (var i = 0; i < gridSelectData.length; i++) {
            var rowItem = gridSelectData[i];
            if (idArray.length == 2) {
                var value = rowItem[field];
                if (HoteamUI.Common.IsNullOrEmpty(value) == false) {
                    para[para.length] = value;
                }
            } else if (idArray.length == 3 && idArray[1].toUpperCase() == "PARENT" && rowItem.parent && para.indexOf(rowItem.parent[idArray[2]]) > -1) {
                para[para.length] = rowItem.parent[idArray[2]];
            }
        }
    } else {
        if (idArray.length == 2) {
            var value = gridSelectData[field];
            if (HoteamUI.Common.IsNullOrEmpty(value) == false) {
                para[0] = value;
            }
        } else if (idArray.length == 3 && idArray[1].toUpperCase() == "PARENT" && gridSelectData.parent) {
            para[0] = gridSelectData.parent[idArray[2]];
        }
    }
    return para;
}

InforCenter_Platform_MenuCtrl_GetListOrRetParameter = function (field, gridSelectData) {
    var para = [];
    if (gridSelectData instanceof Array) {
        if (gridSelectData.length == 0) {
            para[0] = '';
        } else {
            for (var i = 0; i < gridSelectData.length; i++) {
                var rowItem = gridSelectData[i];
                var value = rowItem[field];
                if (value && value.value != undefined && value.value != null) {
                    para[para.length] = value.value;
                } else {
                    para[para.length] = value;
                }
            }
        }
    }
    else {
        if (gridSelectData.hasOwnProperty(field)) {
            var value = gridSelectData[field];
            para[0] = value;
        }
    }
    return para;
}

InforCenter_Platform_MenuCtrl_GetTreeParameter = function (type, itemVaules, selectNode, tree) {
    var para = [];
    var flag = false;
    if (type.toUpperCase() == "CURRENT") {
        flag = true;
    }
    else if (type.toUpperCase() == "PARENT") {
        var node = tree.GetParentNode(selectNode);
        if (node != null) {
            selectNode = node;
            flag = true;
        }
    }
    else if (type.toUpperCase() == "ROOT") {
        var node = tree.GetTreeRootNodes();
        if (node != null) {
            //此处返回的是数组，需要根据当前选中节点向上找才对
            selectNode = node[0];
            flag = true;
        }
    }
    if (flag == true) {
        var value = null;
        if (itemVaules.length == 3) {
            value = selectNode[itemVaules[2]];
        }
        else if (itemVaules.length == 4) {
            value = selectNode[itemVaules[2].toLowerCase()][itemVaules[3]];
        }
        if (value != null) {
            para[0] = value;
        }
    }
    return para;
};

InforCenter_Platform_MenuCtrl_GetTreeListParameter = function (type, itemVaules, selectNode, tree) {
    var para = [];
    var flag = false;
    if (type.toUpperCase() == "CURRENT") {
        flag = true;
    }
    else if (type.toUpperCase() == "PARENT") {
        var rowids = tree.GetSelectedRowsID();
        var parentNode = [];
        //  for (var rowindex in rowids) {
        for (var i = 0; i < rowids.length; i++) {
            var rowid = rowids[i];
            var node = tree.GetParentRow(rowid);
            if (node != null) {
                parentNode.push(node);
                flag = true;
            }
        }
        selectNode = parentNode;
    }
    else if (type.toUpperCase() == "ROOT") {
        var node = tree.GetRootRows();
        if (node != null) {
            selectNode = node;
            flag = true;
        }
    }
    if (flag == true) {
        var value = null;
        if (itemVaules.length == 3) {
            if (selectNode instanceof Array) {
                // for (var row in selectNode) {
                for (var i = 0; i < selectNode.length; i++) {
                    var rowItem = selectNode[i];
                    value = rowItem[itemVaules[2]];
                    if ((HoteamUI.Common.IsNullOrEmpty(value) == false) && typeof value === 'object') {
                        var text = value.text ? value.text : "";
                        value = text ? text : (value.value ? value.value : "");
                    }
                    para[para.length] = value;
                }
            }
            else {
                var value = selectNode[itemVaules[2]];
                if (HoteamUI.Common.IsNullOrEmpty(value) == false) {
                    if (typeof value === 'object') {
                        var text = value.text ? value.text : "";
                        value = text ? text : (value.value ? value.value : "");
                    }
                    para[0] = value;
                }
            }
        }
    }
    return para;
}

InforCenter_Platform_MenuSelect_OnLoad = function (ctrlEvent, actionInfo) {
    var data = [];
    var menu_Container = ctrlEvent.o.OtherControl("Menu_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(menu_Container.id);
    var listData = InforCenter_Platform_GetMenuDropDownData(actionInfo.Value);
    var selectValue = '';
    if (listData && listData.DropDownDataItemList) {
        for (var i = 0, len = listData.DropDownDataItemList.length; i < len; i++) {
            var info = listData.DropDownDataItemList[i];
            var obj = {
                text: info.Name && info.Name.indexOf(".") > 0 ? HoteamUI.Language.Lang(info.Name) : info.Name,
                value: info.Value,
                custom: false
            };
            if (info.hasOwnProperty("IsSelect")) {
                obj.Selected = info.IsSelect;
                if (info.IsSelect) {
                    selectValue = info.Value;
                }
            }
            data.push(obj);
        }
    } else
        data = [];

    //自定义
    if (!actionInfo.DropDownItemIsHideCustom) {
        var custom = { text: HoteamUI.Language.Lang("QueryView.Custom"), value: "Custom", custom: true, Selected: false };
        data.push(custom);
    }
    //增加url判断，dropdown菜单需要url参数，但是通过按钮弹出页面时，此时并没有将url参数传递过来
    if (pagePara.Url) {
        var path = pagePara.Url.join(";");
        var value = HoteamUI.Common.GetPersonalSettingObject(path);
    }
    //var path = pagePara.Url.join(";");
    //var value = HoteamUI.Common.GetPersonalSettingObject(path);
    if (value) {
        var items = JSON.parse(value.SETTINGVALUE);
        for (var i = 0, len = items.length; i < len; i++) {
            var obj = {
                text: items[i].Name,
                value: items[i].queryString,
                custom: false,
                Selected: false,
                ObjectID: value.ObjectID,
                canRemove: true
            }
            data.push(obj);
        }
    }
    pagePara.CustomViewFilterString = selectValue;
    HoteamUI.Page.SetContainerParas(menu_Container.id, pagePara);
    return data;
}

InforCenter_Platform_MenuSelect_OnChange = function (para) {
    if (para && para.length > 1) {
        var ddlValue = para[1].DropDownListValue;
        var listGridID = para[1].ListID;
        var listCtrl = HoteamUI.Control.Instance(listGridID);
        //判断是否是可编辑列表
        var isEditGrid = false;
        if (listCtrl.ControlType() == "EditGrid") {
            isEditGrid = true;
        }
        var ddlPara = {};
        if (ddlValue == "Custom") {
            var page = HoteamUI.Page.Instance(para[0].ContainerID);
            var pagePara = page.GetPara();
            var listviewName = pagePara.ListViewName;
            var listData = InforCenter_Platform_GetMenuDropDownData(pagePara.WebAtionName);
            var data;
            if (listData.CustomService) {
                pagePara.ParaList.push('Tree_Current_Tag_EID');
                var returnData = InforCenter_Platform_MenuCtrl_GetParameters(pagePara, pagePara);
                returnData = JSON.stringify(returnData);
                data = HoteamUI.DataService.Call(listData.CustomService, { para: { ViewName: listviewName, ParaList: returnData } });
            } else {
                data = HoteamUI.DataService.Call("InforCenter.Common.CustomPageService.GetQueryViewColumnInfo", { para: { ViewName: listviewName } });
            }
            function searchcallback(ret) {

                if (ret) {
                    ddlPara.CustomViewFilterString = HoteamUI.Common.HtmlUnEscape(ret);
                    if (isEditGrid) {
                        InforCenter_Platform_EditListViewCtrl_SetListViewPara(listCtrl, ddlPara);
                    } else {
                        InforCenter_Platform_ListViewCtrl_SetListViewPara(listCtrl, ddlPara);
                    }

                    InforCenter_Platform_MenuCtrl_InnerReceiveServerData(para[0], { confirm: "OK" });
                }
            }
            HoteamUI.Control.OQueryView.Create({ id: "optGrid", data: data, searchcallback: searchcallback, pagePara: pagePara, canRepeat: true });
            //弹出自定义对话框时，阻止菜单继续向下执行
            return;
        }
        else {
            var ddlPara = {};
            ddlPara.CustomViewFilterString = ddlValue.replace(/\\"/g, "\"");
            if (isEditGrid) {
                InforCenter_Platform_EditListViewCtrl_SetListViewPara(listCtrl, ddlPara);
            } else {
                InforCenter_Platform_ListViewCtrl_SetListViewPara(listCtrl, ddlPara);
            }
        }
        return { confirm: "OK" };
    }
}


InforCenter_Platform_MenuSelect_OnRemove = function (ctrlEvent, actionInfo) {
    var para = HoteamUI.Page.GetContainerPara(ctrlEvent.o.ContainerID());
    if (!HoteamUI.Common.IsNullOrEmpty(ctrlEvent.objectId) && ctrlEvent.objectId != undefined && ctrlEvent.objectId != 'undefined') {
        var data = InforCenter_Platform_Object_GetObjectData(ctrlEvent.objectId, para);
        if (!HoteamUI.Common.IsNullOrEmpty(data)) {
            var settingData = JSON.parse(data.SETTINGVALUE);
            var newArray = [];
            for (var i = 0; i < settingData.length; i++) {
                var tempData = settingData[i];
                if (tempData.queryString != ctrlEvent.removeData && HoteamUI.Common.HtmlUnEscape(tempData.queryString) != ctrlEvent.removeData) {
                    newArray.push(tempData);
                }
            }
            var settingValue = JSON.stringify(newArray);
            HoteamUI.Common.SavePersonalSetting("CustomView", data.ENAME, settingValue);
        }
    }
}

InforCenter_Platform_MenuSelect_OnEdit = function (ctrlEvent, actionInfo) {
    var containerID = ctrlEvent.o.ContainerID();
    var para = HoteamUI.Page.GetContainerPara(containerID);

    if (!HoteamUI.Common.IsNullOrEmpty(ctrlEvent.objectId) && ctrlEvent.objectId != undefined && ctrlEvent.objectId != 'undefined') {
        var data = InforCenter_Platform_Object_GetObjectData(ctrlEvent.objectId, para);
        if (!HoteamUI.Common.IsNullOrEmpty(data)) {
            var pageContainer = ctrlEvent.o.OtherControl("Menu_Container");
            var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
            var listviewName = pagePara.ListViewName;
            var listData = InforCenter_Platform_GetMenuDropDownData(pagePara.WebAtionName);
            var feildData;
            if (listData.CustomService) {
                feildData = HoteamUI.DataService.Call(listData.CustomService, { para: { ViewName: listviewName } });
            } else {
                feildData = HoteamUI.DataService.Call("InforCenter.Common.CustomPageService.GetQueryViewColumnInfo", { para: { ViewName: listviewName } });
            }
            function searchcallback(ret) {
                if (ret) {
                    ddlPara.CustomViewFilterString = ret;

                    var settingData = JSON.parse(data.SETTINGVALUE);
                    var newArray = [];
                    for (var i = 0; i < settingData.length; i++) {
                        var tempData = settingData[i];
                        if (tempData.queryString == ctrlEvent.removeData) {
                            tempData = ret;
                            break;
                        }
                    }
                    var settingValue = JSON.stringify(newArray);
                    HoteamUI.Common.SavePersonalSetting("CustomView", data.ENAME, settingValue);
                    var listCtrl = HoteamUI.Control.Instance(pagePara.ListGuid);
                    if (listCtrl.ControlType() == "EditGrid") {
                        InforCenter_Platform_EditListViewCtrl_SetListViewPara(listCtrl, ddlPara);
                    } else {
                        InforCenter_Platform_ListViewCtrl_SetListViewPara(listCtrl, ddlPara);
                    }

                    InforCenter_Platform_MenuCtrl_InnerReceiveServerData(para[0], { confirm: "OK" });
                }
            }
            HoteamUI.Control.OQueryView.Edit({ id: "optGrid", feildData: ctrlEvent.Data, data: feildData, searchcallback: searchcallback, pagePara: pagePara });
        }
    }
}
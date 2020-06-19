//树管理页面加载事件
InforCenter_Platform_TreeCommonQuery_LoadPage = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();

    var selectedvalue = pagePara.Value;
    if (selectedvalue && selectedvalue.length > 1 && selectedvalue.substring(selectedvalue.length - 1) == ";") {
        selectedvalue = selectedvalue.substring(0, selectedvalue.length - 1);
    }
    selectedvalue = selectedvalue ? selectedvalue.split(';') : [];

    var data = null;
    $.each(TreeCommonQueryScript, function (index, val) {
        if (val.Name == pagePara.ItemName)
            data = JSON.parse(JSON.stringify(val));
    });
    if (data == null) {
        data = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GetTreeCommonQuery", { para: { Name: pagePara.ItemName } });
        if (data)
            TreeCommonQueryScript.push(data);
    }
    if (data == null) {
        return;
    }
    pagePara.SelectControl == "Tree";
    pagePara = $.extend(data, pagePara);
    var treePage = HoteamUI.Page.InstanceIn(page.pid, "TreeViewPage", "TreeViewCtrl");
    var menuPage = HoteamUI.Page.InstanceIn(page.pid, "MenuCtrlPage", "MenuCtrl");
    var treeCtrl = treePage.GetControl("TreeView");

    var selectTreePage = page.GetControl("TreeViewSelectedPage");
    var treeMainContainer = page.GetControl("TreeViewMainPage_Container");
    var TreeCommonQuery_Container = page.GetControl("TreeCommonQuery_Container");
    pagePara.TreeGuid = treeCtrl.id;
    pagePara.PagePID = page.pid;
    pagePara.SelectedListPageID = selectTreePage.id;
    pagePara.LoadAndSelectType = data.LoadAndSelectType;

    var treeOptions = {};
    if (selectedvalue.length > 0) {
        if (pagePara.SelectedListInitJS) {
            selectedvalue = HoteamUI.Common.ExeFunction(pagePara.SelectedListInitJS, pagePara);
        }
        else {
            //解决传入的数据非对象ID报错
            var selectedValues = [];
            for (var vindex in selectedvalue) {
                var curValue = selectedvalue[vindex];
                if (curValue.indexOf('_') > -1) {
                    selectedValues.push(curValue);
                }
            }
            if (selectedValues.length > 0) {
                selectedvalue = HoteamUI.DataService.Call("InforCenter.Common.ObjectService.GetObjectInitDataByIDs", { para: { IDs: selectedValues, ObjectTypes: pagePara.ReturnValueType } });
            }
        }
    }
    if (selectedvalue == null) {
        return;
    }
    //下面两行代码是为了将树两侧增加留白区域
    var treeContainerC = treePage.GetControl("TreeView_ContainerC");
    treeContainerC.ShowPanel(['item0', 'item2']);
    var treeViewPageContainer = page.GetControl("TreeViewPageContainer");

    if (data.ShowTreeQuery) {
        if (data.DropSearch) {
            if (data.SelectControl == "Tree" || data.SelectControl == "List") {

                var searchContainerCtrl = page.GetControl("SearchContainerTxtContainer");
                searchContainerCtrl.HiddenPanel(["item2"]);
            }
            treeViewPageContainer.HiddenPanel(["item1"]);
        }
        else {
            if (data.SelectControl == "Tree" || data.SelectControl == "List") {

                var treequeyCtrl = page.GetControl("TreeQuery");
                InforCenter_Platform_TreeCommonQuery_QueryOperateConvert(treequeyCtrl, false);
            }
            treeViewPageContainer.HiddenPanel(["item2", "item3"]);
        }

    }
    else {
        treeViewPageContainer.HiddenPanel(["item1", "item2", "item3"]);
    }

    var isSetInit = false;
    if (data.LoadAndSelectType) {

        if (data.LoadAndSelectType == "SingleLevel_MultiSelect" || data.LoadAndSelectType == "AllUserLevel_SingleSelect") {
            pagePara.IsMultiLevel = false;
            treeOptions.isRelevance = false;
            treeOptions.showCheck = false;
            treeOptions.isThirdState = false;

            TreeCommonQuery_Container.HiddenPanel(["item1"]);
            if (selectedvalue.Objects && selectedvalue.Objects.length) {
                InforCenter_Platform_TreeCommonQuery_AddDefaultSelectedData(selectTreePage, selectedvalue.Objects);
            }
        }
        else if (data.LoadAndSelectType == "MultiLevel_Relevance") {
            //pagePara.IsLoadAllData = true;
            pagePara.IsMultiLevel = true;
            treeOptions.isRelevance = true;
            treeOptions.showCheck = false;
            treeOptions.isThirdState = false;

            TreeCommonQuery_Container.HiddenPanel(["item1"]);
            if (selectedvalue.Objects && selectedvalue.Objects.length) {
                InforCenter_Platform_TreeCommonQuery_AddDefaultSelectedData(selectTreePage, selectedvalue.Objects);
            }
        }
        else if (data.LoadAndSelectType == "SingleLevel_SingleSelect") {
            pagePara.IsMultiLevel = false;
            treeOptions.showCheck = false;
            treeOptions.TreeNodeOnClick = "InforCenter_Platform_TreeCommonQuery_OnNodeClick(CtrlEvent);";
            treeMainContainer.HiddenPanel(["item4", "item5", "item6", "item7"]);
            var selectedcontainer = page.GetControl("SingleSelectContainer");
            selectedcontainer.SetLableName(HoteamUI.Language.Lang("TreeListCommonQuery.Selected") + ":");
            if (selectedvalue.Objects && selectedvalue.Objects.length) {
                var object = JSON.parse(selectedvalue.Objects[0]);

                //优先取下多语言
                var text;
                var arrLabel = object.ENAME.split('.');
                if (arrLabel.length == 2) {
                    text = HoteamUI.Language.Lang(arrLabel[0], arrLabel[1], false);
                }
                if (HoteamUI.Common.IsNullOrEmpty(text)) {
                    text = object.ENAME;
                }
                selectedcontainer.SetContentVal({
                    text: text, value: object.EID
                });
                isSetInit = true;
            }
        }
    }
    else if (HoteamUI.Common.IsNullOrEmpty(pagePara.LoadAndSelectType) == true) {
        pagePara.IsMultiLevel = false;
        treeOptions.showCheck = false;
    }
    pagePara.TreeOptions = treeOptions;
    pagePara.IsSetInit = isSetInit;
    var treeListContainer = page.GetControl("TreeListContainer");
    var isload = false;
    if ((data.SelectControl == "Tree" || data.SelectControl == "TreeList")
        && (pagePara.TreeRootDataService || pagePara.TreeViewName)) {
        var treeData = InforCenter_Platform_TreeViewCtrl_LoadTreeView(treePage, pagePara);
        if (treeData == null) {
            return;
        }
        var node = treeCtrl.GetSelectedNode();
        if (isSetInit == false && node) {
            var selectedTip = pageEvent.o.GetControl("SingleSelectContainer");
            selectedTip.SetContentVal({
                text: node.Text,
                value: node.Value1
            });
        }
        isload = true;
    }
    else {
        treeListContainer.HiddenPanel(["item1"]);
    }
    if (isload == false && pagePara.ListAllDataService && (data.SelectControl == "List" || data.SelectControl == "ListTree")) {
        var selectList = page.GetControl("ListViewPage");
        var selectListData = HoteamUI.DataService.Call(pagePara.ListAllDataService, { para: pagePara });
        selectList.AddRows(selectListData);
    }
    else {
        treeListContainer.HiddenPanel(["item2"]);
    }
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.MenuName) == false) {
        var menuData = InforCenter_Platform_MenuCtrl_LoadMenus(menuPage, pagePara, pagePara.MenuName);
    }

    var topContainer = page.GetControl("Btn_Container");
    HoteamUI.Page.SetContainerParas(topContainer.id, "TreeCommonQuery", pagePara);
};

//注释一下
InforCenter_Platform_TreeCommonQuery_AddDefaultSelectedData = function (selectedlist, DefaultData) {
    // for (var i in DefaultData) {
    for (var i = 0; i < DefaultData.length; i++) {
        var data = DefaultData[i];
        data = JSON.parse(DefaultData[i]);
        selectedlist.AddRow({
            title: data.ENAME,
            value: data.EID,
            icon: data.IMGICONTYPE
        });
    }
}
InforCenter_Platform_TreeCommonQuery_ClickCheck = function (value, filter) {
    if (filter !== undefined) {
        if (filter == null) {
            return true;
        }
        else {
            var array = filter.split(';');
            // for (var item in array) {
            for (var i = 0; i < array.length; i++) {
                if (array[i] === value) {
                    return true;
                }
            }
        }
    }
    return false;
}
InforCenter_Platform_TreeCommonQuery_OnNodeDblClick = function (pageEvent) {
    var btnCtrl = pageEvent.o.GetControl("Btn_Container");
    var containerid = btnCtrl.id;
    var pagePara = HoteamUI.Page.GetContainerPara(containerid);
    var selectedlist = pageEvent.o.GetControl("TreeViewSelectedPage");

    if (pagePara && pagePara.TreeGuid) {
        var selecttreeCtrl = HoteamUI.Control.Instance(pagePara.TreeGuid);
        var selectNode = selecttreeCtrl.GetSelectedNode();
    }

    function AddChildrenToSelectList(nodes, selectNode, recurse) {
        if (!nodes) return;
        for (var i = 0; i < nodes.length; i++) {
            var nodeTmp = nodes[i];
            var text = nodeTmp.Text;
            var flagIndex = nodeTmp.Text.indexOf(':');
            if (flagIndex > 0) {
                text = nodeTmp.Text.substr(flagIndex + 1);
            }
            var type = InforCenter_Platform_GTypeFromID(nodeTmp.Value1);
            var falg = InforCenter_Platform_TreeCommonQuery_CheckReturnObjectType(pagePara.returnType, type);
            if (falg) {
                if (InforCenter_Platform_TreeCommonQuery_ClickCheck(nodeTmp.Value3, pagePara.ReturnValueType)) {
                    if (nodeTmp.Value1 == selectNode.value1) {
                        nodeTmp.IconOpen = selectNode.IconOpen;
                    }
                    //添加pathName属性（归档时用到，原来在点击添加按钮时存在而此处不存在，导致报错）
                    if (selectNode) {
                        var parentPath = InforCenter_Platform_TreeCommonQuery_GetNodeAllPath(selectNode);
                    }
                    selectedlist.AddRow({
                        title: text,
                        value: nodeTmp.Value1,
                        icon: nodeTmp.IconOpen,
                        pathName: parentPath != "" ? parentPath + '\\' + text : text
                    });
                }
            }

            if (recurse) {
                AddChildrenToSelectList(nodeTmp.Children, node, recurse);
            }
        }
    }

    //双击树节点是否自动选择所有下级节点到已选列表
    var dbClickToAll = pagePara.DbClickToAll === true;

    switch (pagePara.LoadAndSelectType) {
        case "AllUserLevel_SingleSelect":
            var node = pageEvent.GetSelectedNode();
            var text = node.Text;
            var flagIndex = node.Text.indexOf(':');
            if (flagIndex > 0) {
                text = node.Text.substr(flagIndex + 1);
            }

            selectedlist.RemoveAll();
            if (InforCenter_Platform_TreeCommonQuery_ClickCheck(node.Value3, pagePara.ReturnValueType)) {
                selectedlist.AddRow({
                    title: text,
                    value: node.Value1,
                    icon: node.IconOpen
                });
            }
            break;
        case "SingleLevel_SingleSelect":
            var selectedContainer = pageEvent.o.GetControl("SingleSelectContainer");
            var selecteddata = [selectedContainer.GetContentVal().value];
            var ret = InforCenter_Platform_TreeCommonQuery_CheckReturnObjectsType(selecteddata, HoteamUI.Page.GetContainerPara(btnCtrl.id));
            if (ret.length == 0) {
                return;
            } else {
                InforCenter_Platform_TreeCommonQuery_OnOK({ o: btnCtrl });
            }
            break;
        case "SingleLevel_MultiSelect":
            if (pagePara.NodeDblClickJS) {
                HoteamUI.Common.ExeFunction(pagePara.NodeDblClickJS, pageEvent);
                return;
            }

            var node = pageEvent.GetSelectedNode();
            var text = node.Text;
            var flagIndex = node.Text.indexOf(':');
            if (flagIndex > 0) {
                text = node.Text.substr(flagIndex + 1);
            }

            //从服务器获取当前节点的所有下级节点，并添加到已选择列表中。
            if (dbClickToAll) {
                var allNodeDataService = "InforCenter.Common.WebTreeViewService.GetTreeAllData";
                if (HoteamUI.Common.IsNullOrEmpty(pagePara.TreeAllDataService) == false) {
                    allNodeDataService = pagePara.TreeAllDataService;
                }

                var returnData = InforCenter_Platform_MenuCtrl_GetParameters(pagePara, pagePara, null, node);
                for (var j in returnData) {
                    if (!returnData.hasOwnProperty(j)) {
                        continue;
                    }
                    returnData[j] = returnData[j][0];
                }

                var sParaList = JSON.stringify(returnData);
                var para = { para: { TreeViewName: pagePara.TreeViewName, ParaList: sParaList, IsMultiLevel: pagePara.IsMultiLevel, IsContainCurrent: true, IsFromCurrent: true, Text: node.text, Value1: node.value1, Value2: node.value2, Value3: node.value3, Value4: node.value4, Value5: node.value5 } };
                var allNodeData = HoteamUI.DataService.Call(allNodeDataService, para);
                AddChildrenToSelectList(allNodeData, node, dbClickToAll);
            } else {
                AddChildrenToSelectList([pageEvent.GetSelectedNode()], node, dbClickToAll);
            }

            break;
        case "MultiLevel_Relevance":
            var node = pageEvent.GetSelectedNode();
            AddChildrenToSelectList([node], node, dbClickToAll);
            break;
        default: break;
    }
}


InforCenter_Platform_TreeCommonQuery_GetNodeAllPath = function (selectNode) {
    var text = '';
    var parentNode = selectNode.getParentNode();
    if (HoteamUI.Common.IsNullOrEmpty(parentNode)) {
        return text;
    }
    text = parentNode.text;
    if (!HoteamUI.Common.IsNullOrEmpty(parentNode)) {
        var parentText = InforCenter_Platform_TreeCommonQuery_GetNodeAllPath(parentNode);
        if (parentText != '') {
            text = parentText + '\\' + text;
        }
    }
    return text;
}

InforCenter_Platform_TreeCommonQuery_OnNodeChange = function (pageEvent) {
    var node = pageEvent.ctrl.GetSelectedNode();
    var selectedTip = pageEvent.o.GetControl("SingleSelectContainer");
    selectedTip.SetContentVal({
        text: node.Text,
        value: node.Value1
    });
}

InforCenter_Platform_TreeCommonQuery_OnOK = function (ctrlEvent) {
    var pageContainer = ctrlEvent.o.OtherControl("Btn_Container");
    var para = HoteamUI.Page.GetContainerPara(pageContainer.id);

    //自定义提交脚本
    if (para && HoteamUI.Common.IsNullOrEmpty(para.CommitJS) == false) {
        HoteamUI.Common.ExeFunction(para.CommitJS, ctrlEvent);
        return;
    }
    var treeCtrl = HoteamUI.Control.Instance(para.TreeGuid);
    if (treeCtrl) {
        var returnValue = [];
        var isPrompt = true;
        if (para.IsPrompt) {
            isPrompt = para.IsPrompt;
        }
        if (para.LoadAndSelectType) {
            if (para.LoadAndSelectType == "SingleLevel_MultiSelect" || para.LoadAndSelectType == "AllUserLevel_SingleSelect" ||
                para.LoadAndSelectType == "MultiLevel_Relevance") {
                var selectedlist = ctrlEvent.o.OtherControl("TreeViewSelectedPage");
                returnValue = selectedlist.GetSelected().values;

                if (para.LoadAndSelectType == "MultiLevel_Relevance") {
                    isPrompt = false;
                }

            }
            else if (para.LoadAndSelectType == "SingleLevel_SingleSelect") {

                var selectedContainer = ctrlEvent.o.OtherControl("SingleSelectContainer");
                var selecteddata = selectedContainer.GetContentVal().value;
                if (selecteddata)
                    returnValue = [selecteddata];
                else
                    returnValue = [];

            }
        }
        else if (HoteamUI.Common.IsNullOrEmpty(para.LoadAndSelectType) == true) {
            var node = treeCtrl.GetSelectedNode();
            returnValue[0] = node.value1;
        }

        if (returnValue.length == 0) {
            var labelName = "";
            if (para.AllowReturnEmptyValue == false) {
                if (para.LoadAndSelectType && para.LoadAndSelectType != "SingleLevel_SingleSelect") {
                    labelName = "NotOneSelectObject";
                }
                else {
                    labelName = "NotSelectObject";
                }
            }
            if (HoteamUI.Common.IsNullOrEmpty(labelName) == false) {
                InforCenter_Platform_ListCommonQuery_AlertToSelect(labelName);
                return;
            }

        }
        InforCenter_Platform_CommonQuery_CheckReturnData(returnValue, para, ctrlEvent.o.ContainerID(), isPrompt);
    }
}

InforCenter_Platform_CommonQuery_CheckReturnData = function (returnValue, para, containerID, isPrompt) {
    var lstData = [];
    var checkData = null;
    if (returnValue != null && returnValue.length > 0) {
        checkData = InforCenter_Platform_TreeCommonQuery_CheckReturnObjectsType(returnValue, para);
        var data = HoteamUI.DataService.Call("InforCenter.Common.ObjectService.GetObjectInitDataByIDs", { para: { IDs: checkData, ObjectTypes: para.ReturnValueType } });

        if ((returnValue != null && checkData != null && returnValue.length == checkData.length) || isPrompt == false) {
            if (data) {
                lstData = data.Objects;
                for (var i = 0; i < lstData.length; i++) {
                    lstData[i] = JSON.parse(lstData[i]);
                }
            }
        } else {
            var message = HoteamUI.Language.Lang("Platform.OnlyReturnAllow");
            message = message.replace("[ObjectType]", data.AllowReturnObjTypeName);
            var para = {
                pageMode: "OK", message: message
            };
            HoteamUI.UIManager.Popup("Confirm", para);
            return;
        }
        if (checkData == null) {
            HoteamUI.UIManager.Popup({ pagename: "Confirm", paras: { pageMode: "OK", message: HoteamUI.Language.Lang("Platform.NoFitableValue") } });
            return;
        }
    }
    HoteamUI.UIManager.Return(containerID, lstData);
}

InforCenter_Platform_TreeCommonQuery_CheckReturnObjectsType = function (returnValue, para) {
    var tmp = [];
    var j = 0;
    // for (var i in returnValue) {
    for (var i = 0; i < returnValue.length; i++) {
        var type = InforCenter_Platform_GTypeFromID(returnValue[i]);
        var falg = InforCenter_Platform_TreeCommonQuery_CheckReturnObjectType(para.ReturnValueType, type);
        if (falg) {
            tmp[j] = returnValue[i];
            j++;
        }
    }
    return tmp;
}

InforCenter_Platform_TreeCommonQuery_CheckReturnObjectType = function (ReturnValueType, type) {

    var result = false;
    if (HoteamUI.Common.IsNullOrEmpty(ReturnValueType) == false) {
        var values = ReturnValueType.split(';');
        // for (var i in values) {
        for (var i = 0; i < values.length; i++) {
            var n = values[i];
            if (values[i] == type) {
                result = true;
                break;
            }
        }
    }
    else {
        result = true;
    }
    return result;
}

InforCenter_Platform_TreeCommonQuery_Operate = function (ctrlEvent) {
    $("#treeviewSelectOne").attr("id", ctrlEvent.o.id + "selectone");
    $("#treeviewSelectAll").attr("id", ctrlEvent.o.id + "selectall");
    $("#treeviewRemoveOne").attr("id", ctrlEvent.o.id + "removeone");
    $("#treeviewRemoveAll").attr("id", ctrlEvent.o.id + "removeall");
    $("#" + ctrlEvent.o.id + "selectone").on("click", function () {
        InforCenter_Platform_TreeCommonQuery_SelectedOne(ctrlEvent);
    });
    $("#" + ctrlEvent.o.id + "removeone").on("click", function () {
        InforCenter_Platform_TreeCommonQuery_RemoveOne(ctrlEvent);
    });
    $("#" + ctrlEvent.o.id + "removeall").on("click", function () {
        InforCenter_Platform_TreeCommonQuery_RemoveAll(ctrlEvent);
    });

    var pagePara = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID()).GetPara();
    var data = null;
    $.each(TreeCommonQueryScript, function (index, val) {
        if (val.Name == pagePara.ItemName)
            data = JSON.parse(JSON.stringify(val));
    });

    $("#" + ctrlEvent.o.id + "selectall").on("click", function () {
        InforCenter_Platform_TreeCommonQuery_SelectedAll(ctrlEvent);
    });
    if ((data && data.SelectControl != 'List' && data.SelectControl != 'ListTree') || !data) {
        $("#" + ctrlEvent.o.id + "selectall").css('display', 'none');
    }
}
//selectList控件双击事件
InforCenter_Platform_TreeCommonQuery_SelectList_OnDbClick = function (ctrlEvent) {
    var btnCtrl = ctrlEvent.o.OtherControl("Btn_Container");
    var containerid = btnCtrl.id;
    var pagePara = HoteamUI.Page.GetContainerPara(containerid);

    switch (pagePara.LoadAndSelectType) {
        case "AllUserLevel_SingleSelect":
        case "SingleLevel_SingleSelect":
            var selectedContainer = ctrlEvent.o.OtherControl("SingleSelectContainer");
            var selecteddata = [selectedContainer.GetContentVal().value];
            var ret = InforCenter_Platform_TreeCommonQuery_CheckReturnObjectsType(selecteddata, HoteamUI.Page.GetContainerPara(btnCtrl.id));
            if (ret.length == 0) {
                return;
            } else {
                InforCenter_Platform_TreeCommonQuery_OnOK({ o: btnCtrl });
            }
            break;
        case "SingleLevel_MultiSelect":
        case "MultiLevel_Relevance":
            var selectpageContainer = ctrlEvent.o.OtherControl("TreeViewSelectedPage");
            selectpageContainer.AddRow({
                title: ctrlEvent.text || ctrlEvent.title,
                value: ctrlEvent.value,
                icon: ctrlEvent.icon
            });
            break;
        default: break;
    }
}
//selectList控件单击事件
InforCenter_Platform_TreeCommonQuery_SelectList_OnClick = function (ctrlEvent) {
    var selectedTip = ctrlEvent.o.OtherControl("SingleSelectContainer");
    selectedTip.SetContentVal({
        value: ctrlEvent.value,
        text: ctrlEvent.text
    });
}
InforCenter_Platform_TreeCommonQuery_SelectedOne = function (ctrlEvent) {

    var pageContainer = ctrlEvent.o.OtherControl("Btn_Container");
    var para = HoteamUI.Page.GetContainerPara(pageContainer.id);
    var selectpageContainer = ctrlEvent.o.OtherControl("TreeViewSelectedPage");
    var treeListContainer = ctrlEvent.o.OtherControl("TreeListContainer");
    if (treeListContainer.GetPanelStatus("item1") == "show") {
        //如果当前 展示的是树
        if (para.SelectedOneJS) {
            HoteamUI.Common.ExeFunction(para.SelectedOneJS, ctrlEvent);
            return;
        }
        var treeCtrl = HoteamUI.Control.Instance(para.TreeGuid);
        var node = treeCtrl.GetSelectedNode();
        switch (para.LoadAndSelectType) {
            case "SingleLevel_MultiSelect":
                var text = node.Text;
                var flagIndex = node.Text.indexOf(':');
                if (flagIndex > 0) {
                    text = node.Text.substr(flagIndex + 1);
                }

                if (InforCenter_Platform_TreeCommonQuery_ClickCheck(node.Value3, para.ReturnValueType)) {
                    var parentPath = InforCenter_Platform_TreeCommonQuery_GetNodeAllPath(node);
                    selectpageContainer.AddRow({
                        title: text,
                        value: node.Value1,
                        icon: node.IconOpen,
                        pathName: parentPath != "" ? parentPath + '\\' + text : text
                    });
                }
                break;
            default:
                if (InforCenter_Platform_TreeCommonQuery_ClickCheck(node.Value3, para.ReturnValueType)) {
                    selectpageContainer.AddRow({
                        title: node.Text,
                        value: node.Value1,
                        icon: node.IconOpen
                    });
                }
        }
    } else {//如果当前展示的是selectlist
        var selectListCtrl = ctrlEvent.o.OtherControl("ListViewPage");
        var dataObj = selectListCtrl.getCurrentSelected();
        if (dataObj.values.length > 0) {
            selectpageContainer.AddRow({
                title: dataObj.titles[0] ? dataObj.titles[0] : dataObj.texts[0],
                value: dataObj.values[0],
                icon: dataObj.icons[0]
            });
        }
    }
}

InforCenter_Platform_TreeCommonQuery_SelectedAll = function (ctrlEvent) {
    var pageContainer = ctrlEvent.o.OtherControl("Btn_Container");
    var para = HoteamUI.Page.GetContainerPara(pageContainer.id);
    var selectpageContainer = ctrlEvent.o.OtherControl("TreeViewSelectedPage");
    var treeListContainer = ctrlEvent.o.OtherControl("TreeListContainer");
    if (treeListContainer.GetPanelStatus("item1") == "show") {
        //如果当前 展示的是树
        if (para.SelectedOneJS) {
            HoteamUI.Common.ExeFunction(para.SelectedOneJS, ctrlEvent);
            return;
        }
        var treeCtrl = HoteamUI.Control.Instance(para.TreeGuid);
        var node = treeCtrl.GetSelectedNode();
        switch (para.LoadAndSelectType) {
            case "SingleLevel_MultiSelect":
                var text = node.Text;
                var flagIndex = node.Text.indexOf(':');
                if (flagIndex > 0) {
                    text = node.Text.substr(flagIndex + 1);
                }

                if (InforCenter_Platform_TreeCommonQuery_ClickCheck(node.Value3, para.ReturnValueType)) {
                    var parentPath = InforCenter_Platform_TreeCommonQuery_GetNodeAllPath(node);
                    selectpageContainer.AddRow({
                        title: text,
                        value: node.Value1,
                        icon: node.IconOpen,
                        pathName: parentPath != "" ? parentPath + '\\' + text : text
                    });
                }
                break;
            default:
                if (InforCenter_Platform_TreeCommonQuery_ClickCheck(node.Value3, para.ReturnValueType)) {
                    selectpageContainer.AddRow({
                        title: node.Text,
                        value: node.Value1,
                        icon: node.IconOpen
                    });
                }
        }
    } else {//如果当前展示的是selectlist
        var selectListCtrl = ctrlEvent.o.OtherControl("ListViewPage");
        var dataObj = selectListCtrl.GetSelected();
        if (dataObj.values.length > 0) {
            for (var i = 0; i < dataObj.values.length; i++) {
                selectpageContainer.AddRow({
                    title: dataObj.titles[i] ? dataObj.titles[i] : dataObj.texts[i],
                    value: dataObj.values[i],
                    icon: dataObj.icons[i]
                });
            }
        }
    }
}
InforCenter_Platform_TreeCommonQuery_RemoveOne = function (ctrlEvent) {
    var pageContainer = ctrlEvent.o.OtherControl("TreeViewSelectedPage");
    pageContainer.RemoveSelected();
}

InforCenter_Platform_TreeCommonQuery_RemoveAll = function (ctrlEvent) {
    var pageContainer = ctrlEvent.o.OtherControl("TreeViewSelectedPage");
    pageContainer.RemoveAll();
}

InforCenter_Platform_TreeCommonQuery_QueryInit = function (ctrlEvent) {
    if (HoteamUI.Browser.isIE && HoteamUI.Browser.version == "10.0") {//兼容ie10bug
        $("#treeviewQueryTemplate").resize(function () {
            var ele = $(this).find(".treequery-query-more");
            ele.css("z-index", -1);
            setTimeout(function () {
                ele.css("z-index", 1);
            }, 100);
        });
    }
    $("#treeviewQueryTemplate").attr("id", ctrlEvent.o.id + "_treeviewQueryTemplate");
    var template = $("#" + ctrlEvent.o.id + "_treeviewQueryTemplate");
    var previous = HoteamUI.Language.Lang("TreeViewCtrl.Previous");
    var next = HoteamUI.Language.Lang("TreeViewCtrl.Next");
    var convert = HoteamUI.Language.Lang("TreeViewCtrl.Convert");
    template.find(".basesprite").each(function () {
        if ($(this).hasClass("b-gray-prev")) {
            $(this).attr("title", previous);
        } else if ($(this).hasClass("b-gray-next")) {
            $(this).attr("title", next);
        } else if ($(this).hasClass("b-gray-convert")) {
            $(this).attr("title", convert);
        }
    });
    template.find(".basesprite").on("mouseenter", function () {
        if ($(this).hasClass("b-gray-search")) {
            $(this).addClass("b-gray-search-hover");
        } else if ($(this).hasClass("b-gray-prev")) {
            $(this).addClass("b-gray-prev-hover");
        } else if ($(this).hasClass("b-gray-next")) {
            $(this).addClass("b-gray-next-hover");
        } else if ($(this).hasClass("b-gray-convert")) {
            $(this).addClass("b-gray-convert-hover");
        }
    }).on("mouseleave", function () {
        if ($(this).hasClass("b-gray-search")) {
            $(this).removeClass("b-gray-search-hover");
        } else if ($(this).hasClass("b-gray-prev")) {
            $(this).removeClass("b-gray-prev-hover");
        } else if ($(this).hasClass("b-gray-next")) {
            $(this).removeClass("b-gray-next-hover");
        } else if ($(this).hasClass("b-gray-convert")) {
            $(this).removeClass("b-gray-convert-hover");
        }
    }).on("click", function () {
        if ($(this).hasClass("b-gray-search")) {
            InforCenter_Platform_TreeCommonQuery_Query(ctrlEvent);
        } else if ($(this).hasClass("b-gray-prev")) {
            InforCenter_Platform_TreeCommonQuery_Previous(ctrlEvent);
        } else if ($(this).hasClass("b-gray-next")) {
            InforCenter_Platform_TreeCommonQuery_Next(ctrlEvent);
        }
        else if ($(this).hasClass("b-gray-convert")) {
            InforCenter_Platform_TreeCommonQuery_Convert(ctrlEvent);
        }
    });
    template.find("input").on("keyup", function (e) {
        if (e.keyCode == 13) {//enter键
            InforCenter_Platform_TreeCommonQuery_Query(ctrlEvent);
        }
    });
};
InforCenter_Platform_TreeCommonQuery_QueryOperateConvert = function (ctrl, flag) {
    var con = $("#" + ctrl.id + "_treeviewQueryTemplate");
    var ele = con.find(".treequery-query-more").children(":last");
    if (flag) {
        ele.show();
        con.find(".treequery-query-search").css("padding-right", "65px");
        con.find(".treequery-query-more").css("width", "60px");
    } else {
        ele.hide();
        con.find(".treequery-query-search").css("padding-right", "45px");
        con.find(".treequery-query-more").css("width", "40px");
    }
}

InforCenter_Platform_TreeCommonQuery_Query = function (ctrlEvent) {
    var $searchInput = $("#" + ctrlEvent.o.id + "_treeviewQueryTemplate").find("input");
    var filterText = $.trim($searchInput.val());
    $searchInput.val(filterText);
    var treeListContainer = ctrlEvent.o.OtherControl("TreeListContainer");
    if (treeListContainer.GetPanelStatus("item1") == "show") {//如果当前展示的是树
        var leftContainer = ctrlEvent.o.OtherControl("Btn_Container");
        var pagePara = HoteamUI.Page.GetContainerPara(leftContainer.id);
        if (pagePara.AllQuery || pagePara.AllQuery == 'true') {
            InforCenter_Platform_TreeViewCtrl_AllExecQuery(filterText, pagePara.TreeGuid, $searchInput);
        } else {
            InforCenter_Platform_TreeViewCtrl_ExecQuery(filterText, pagePara.TreeGuid, $searchInput);
        }
    } else {
        //如果当前展示的是selectlist
        //获取所有的selectlist数据，并获取第一个可以匹配的
        var selectListCtrl = ctrlEvent.o.OtherControl("ListViewPage");
        var dataObj = selectListCtrl.GetSelected();
        var texts = dataObj.texts[0] ? dataObj.texts : dataObj.titles;
        var codes = dataObj.codes[0] ? dataObj.codes : dataObj.codes;
        if (filterText === "") {
            var para = { pageMode: "OK", context: "Platform", labelName: "PleaseInputQueryContent" }
            HoteamUI.UIManager.Popup("Confirm", para);
        }
        var find = false;
        for (var i = 0; i < texts.length; i++) {
            var text = texts[i];
            var code = codes[i] 
            if (!text) {
                continue;
            }

            if ((text.indexOf(filterText) > -1) || (code.indexOf(filterText) > -1)) {
                selectListCtrl.SetSelectByIndex(i);
                var select = selectListCtrl.getCurrentSelected();
                var tip = ctrlEvent.o.OtherControl("SingleSelectContainer");
                var val = {}; 
                val.text = select.texts[0];
                val.value = select.values[0];
                tip.SetContentVal(val);
                find = true;
                break;
            }
        }
        //添加提示
        if (!find) {
            var callFocus = function () {
                setTimeout(function () {
                    if ($searchInput)
                        $searchInput.focus();
                }, 200);
            }

            var para = { pageMode: "OK", MessageIcon: "point", context: "Platform", labelName: "DidNotFindTheQueryContent" }
            HoteamUI.UIManager.Popup("Confirm", para, callFocus);

        }
    }
};
InforCenter_Platform_TreeCommonQuery_Previous = function (ctrlEvent) {
    var treeListContainer = ctrlEvent.o.OtherControl("TreeListContainer");
    if (treeListContainer.GetPanelStatus("item1") == "show") {//如果当前展示的是树
        var leftContainer = ctrlEvent.o.OtherControl("Btn_Container");
        var pagePara = HoteamUI.Page.GetContainerPara(leftContainer.id);
        if (pagePara.AllQuery || pagePara.AllQuery == 'true') {
            InforCenter_Platform_TreeViewCtrl_AllPrevious(pagePara.TreeGuid);
        } else {
            InforCenter_Platform_TreeViewCtrl_Previous(pagePara.TreeGuid);
        }
    } else {
        var filterText = $("#" + ctrlEvent.o.id + "_treeviewQueryTemplate").find("input").val();
        filterText = filterText.trim();
        var selectListCtrl = ctrlEvent.o.OtherControl("ListViewPage");
        var dataObj = selectListCtrl.GetSelected();
        var texts = dataObj.texts[0] ? dataObj.texts : dataObj.titles;
        //获取当前选中的项的index
        var index = selectListCtrl.GetSelectedIndex();
        for (var i = 1; i <= texts.length; i++) {
            var realIndex = index - i;
            if (realIndex < 0) {
                //realIndex = texts.length + realIndex;
                var para = { pageMode: "OK", context: "Platform", labelName: "WasTheFirstOne" }
                HoteamUI.UIManager.Popup("Confirm", para);
                return;
            }
            var text = texts[realIndex];
            if (!text) {
                continue;
            }
            if (text.indexOf(filterText) > -1) {
                selectListCtrl.SetSelectByIndex(realIndex);
                var select = selectListCtrl.getCurrentSelected();
                var tip = ctrlEvent.o.OtherControl("SingleSelectContainer");
                var val = {};
                val.text = select.texts[0];
                val.value = select.values[0];
                tip.SetContentVal(val);
                break;
            }
        }
    }
};
InforCenter_Platform_TreeCommonQuery_Next = function (ctrlEvent) {
    var treeListContainer = ctrlEvent.o.OtherControl("TreeListContainer");
    if (treeListContainer.GetPanelStatus("item1") == "show") {//如果当前展示的是树
        var leftContainer = ctrlEvent.o.OtherControl("Btn_Container");
        var pagePara = HoteamUI.Page.GetContainerPara(leftContainer.id);
        if (pagePara.AllQuery || pagePara.AllQuery == 'true') { InforCenter_Platform_TreeViewCtrl_AllNext(pagePara.TreeGuid); } else {
            InforCenter_Platform_TreeViewCtrl_Next(pagePara.TreeGuid);
        }
    } else {
        var filterText = $("#" + ctrlEvent.o.id + "_treeviewQueryTemplate").find("input").val();
        filterText = filterText.trim();
        var selectListCtrl = ctrlEvent.o.OtherControl("ListViewPage");
        var dataObj = selectListCtrl.GetSelected();
        var texts = dataObj.texts[0] ? dataObj.texts : dataObj.titles;
        //获取当前选中的项的index
        var index = selectListCtrl.GetSelectedIndex();
        for (var i = 1; i <= texts.length; i++) {
            var realIndex = index + i;
            if (realIndex > texts.length - 1) {
                //realIndex = realIndex - texts.length;
                var para = { pageMode: "OK", context: "Platform", labelName: "WasTheLastOne" }
                HoteamUI.UIManager.Popup("Confirm", para);
                return;
            }
            var text = texts[realIndex];
            if (!text) {
                continue;
            }
            if (text.indexOf(filterText) > -1) {
                selectListCtrl.SetSelectByIndex(realIndex);
                var select = selectListCtrl.getCurrentSelected();
                var tip = ctrlEvent.o.OtherControl("SingleSelectContainer");
                var val = {};
                val.text = select.texts[0];
                val.value = select.values[0];
                tip.SetContentVal(val);
                break;
            }
        }
    }


};
InforCenter_Platform_TreeCommonQuery_Convert = function (ctrlEvent) {
    var ctrl = ctrlEvent.o;
    var treeListContainer = ctrl.OtherControl("TreeListContainer");
    var pageContainer = ctrl.OtherControl("Btn_Container");
    var btnContainer = ctrlEvent.o.OtherControl('BtnSelect_Container');
    var para = HoteamUI.Page.GetContainerPara(pageContainer.id);
    if (treeListContainer.GetPanelStatus("item1") == "hidden") {
        treeListContainer.ShowPanel(["item1"]);
        treeListContainer.HiddenPanel(["item2"]);
        if (HoteamUI.Common.IsNullOrEmpty(para.SelectTreeLoad) == true) {
            var treePage = HoteamUI.Page.InstanceIn(para.PagePID, "TreeViewPage", "TreeViewCtrl");
            if (treePage && (para.TreeRootDataService || para.TreeViewName)) {
                var treeData = InforCenter_Platform_TreeViewCtrl_LoadTreeView(treePage, para);
                if (treeData == null) {
                }
                else {
                    para.SelectTreeLoad = true;
                }
            }
        }

        var tip = ctrlEvent.o.OtherControl("SingleSelectContainer");
        var val = {};
        var tree = HoteamUI.Control.Instance(para.TreeGuid);
        var select = tree.GetSelectedNode();
        if (select) {
            val.text = select.Text;
            val.value = select.value1;
        }
        else {
            val.text = "";
            val.value = "";
        }
        
        tip.SetContentVal(val);
        $("#" + btnContainer.id + "selectall").css('display', 'none');
    }
    else {
        var selectList = ctrl.OtherControl("ListViewPage");
        if (HoteamUI.Common.IsNullOrEmpty(para.SelectListLoad) == true) {
            var selectListData = HoteamUI.DataService.Call(para.ListAllDataService, {
                para: para
            });
            selectList.AddRows(selectListData);
            selectList.SetSelectByIndex(0);
            para.SelectListLoad = true;
        }
        var select = selectList.getCurrentSelected();
        var tip = ctrlEvent.o.OtherControl("SingleSelectContainer");
        var val = {};
        val.text = select.texts[0];
        val.value = select.values[0];
        tip.SetContentVal(val);
        treeListContainer.HiddenPanel(["item1"]);
        treeListContainer.ShowPanel(["item2"]);
        $("#" + btnContainer.id + "selectall").css('display', 'block');
    }
    HoteamUI.Page.SetContainerParas(pageContainer.id, "TreeCommonQuery", para);
};
InforCenter_Platform_TreeCommonQuery_DropSearchChange = function (ctrlEvent) {
    var inputText = ctrlEvent.value;
    if (inputText != "") {
        var ctrl = ctrlEvent.o;
        var pageContainer = ctrl.OtherControl("Btn_Container");
        var para = HoteamUI.Page.GetContainerPara(pageContainer.id);
        var searchService = para.DropSearchChangeService;
        para.SearchContent = HoteamUI.Common.ReplaceSQLFilter(inputText);
        var retData = HoteamUI.DataService.Call(searchService, {
            para: para
        });
        ctrlEvent.o.LoadData(retData, true);
    }
}

InforCenter_Platform_TreeCommonQuery_ConvertInit = function (ctrlEvent) {
    $("#treeCommonQuery_ConvertBtn").attr("id", ctrlEvent.o.id + "_treeCommonQuery_ConvertBtn");
    var btn = $("#" + ctrlEvent.o.id + "_treeCommonQuery_ConvertBtn");
    var convert = HoteamUI.Language.Lang("TreeViewCtrl.Convert");
    btn.attr("title", convert).on("mouseenter", function () {
        $(this).addClass("b-gray-convert-hover");
    }).on("mouseleave", function () {
        $(this).removeClass("b-gray-convert-hover");
    }).on("click", function () {
        InforCenter_Platform_TreeCommonQuery_Convert(ctrlEvent);
    });
}

InforCenter_Platform_TreeCommonQuery_DropSearchClick = function (ctrlEvent) {
    var ctrl = HoteamUI.Control.Instance(ctrlEvent.o.ContainerID());

    var pageContainer = ctrl.OtherControl("Btn_Container");
    var para = HoteamUI.Page.GetContainerPara(pageContainer.id);

    var selectpageContainer = ctrl.OtherControl('TreeViewSelectedPage')
    var node = {
    };
    var retData = ctrlEvent.data;
    node.Text = retData.text;
    node.Value = retData.value;
    node.Value3 = retData.value.split('_')[0];
    node.IconOpen = retData.icon;
    if (InforCenter_Platform_TreeCommonQuery_ClickCheck(node.Value3, para.ReturnValueType)) {
        if (para.LoadAndSelectType == "AllUserLevel_SingleSelect") {
            selectpageContainer.RemoveAll();
        }
        selectpageContainer.AddRow({
            title: node.Text,
            value: node.Value,
            icon: node.IconOpen
        });
    }
}

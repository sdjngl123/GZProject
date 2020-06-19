//树管理页面加载事件
InforCenter_Platform_HelpTreeQuery_LoadPage = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    pagePara = $.extend(data, pagePara);

    //加载数据节点
    var treePage = HoteamUI.Page.InstanceIn(page.pid, "TreeViewPage", "TreeViewCtrl");
    var treeCtrl = treePage.GetControl("TreeView");
    var data = FJC.WebService.Call("GetHelpTreeData", {})
    if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
        treeCtrl.LoadNodes(null, data);
    }

    var selectedcontainer = page.GetControl("SingleSelectContainer");
    selectedcontainer.SetLableName(HoteamUI.Language.Lang("TreeListCommonQuery.Selected") + ":");
    //如果存在初始值，则显示
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.ID) == false && data!=null&&data.length>0) {
        var titleID = HoteamUI.DataService.Call("Fjc.BaseServices.HelpService.GetHelpLink", { para: { ObjectID: pagePara.ID} });
        if (HoteamUI.Common.IsNullOrEmpty(titleID) == false) {
            var node = InforCenter_Platform_HelpTreeQuery_GetTitleByID(treeCtrl.GetTreeRootNodes(), titleID);
            if (HoteamUI.Common.IsNullOrEmpty(node) == false)
                selectedcontainer.SetContentVal({ text: node.Text, value: pagePara.ID });
        }
    }

    //隐藏查询按钮
    var treeContainer = treePage.GetControl("TreeView_Container")
    if (HoteamUI.Common.IsNullOrEmpty(treeContainer) == false) {
        treeContainer.HiddenPanel(["item2"]);
        treeContainer.HiddenPanel(["item3"]);
    }
    var topContainer = page.GetControl("Btn_Container");
    HoteamUI.Page.SetContainerParas(topContainer.id, "HelpTreeQuery", pagePara);
};

//节点点击事件
InforCenter_Platform_HelpTreeQuery_GetTitleByID = function (nodes, id) {
    var selectnode = null;
    if (HoteamUI.Common.IsNullOrEmpty(nodes) == false) {
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (HoteamUI.Common.IsNullOrEmpty(node.value1) == false && node.value1 == id) {
                selectnode = node;
                break;
            }
            else {
                selectnode = InforCenter_Platform_HelpTreeQuery_GetTitleByID(node.children, id);
                if (selectnode != null) {
                    break;
                }
            }
        }
    }
    return selectnode;
}

InforCenter_Platform_HelpTreeQuery_OnNodeDblClick = function (pageEvent) {
    var containerid = pageEvent.o.GetControl("Btn_Container").id;
    var pagePara = HoteamUI.Page.GetContainerPara(containerid);

    function check(value, filter) {
        if (filter !== undefined) {
            var array = filter.split(';');
            for (var item in array) {
                if (array[item] === value) {
                    return true;
                }
            }
        }
        return false;
    }

    var btnOK = pageEvent.o.GetControl("btnOK");
    btnOK.Click();
}

InforCenter_Platform_HelpTreeQuery_OnNodeChange = function (pageEvent) {
    var node = pageEvent.ctrl.GetSelectedNode();
    var selectedTip = pageEvent.o.GetControl("SingleSelectContainer");
    selectedTip.SetContentVal({
        text: node.Text,
        value: node.Value1
    });
}

InforCenter_Platform_HelpTreeQuery_OnOK = function (ctrlEvent) {
    var pageContainer = ctrlEvent.o.OtherControl("Btn_Container");
    var para = HoteamUI.Page.GetContainerPara(pageContainer.id);
    var treeCtrl = HoteamUI.Control.Instance(para.TreeGuid);

    if (treeCtrl) {
        var returnValue = [];
        var isPrompt = true;
        if (para.IsPrompt) {
            isPrompt = para.IsPrompt;
        }

        var selectedContainer = ctrlEvent.o.OtherControl("SingleSelectContainer");
        var selecteddata = selectedContainer.GetContentVal();
        if (selecteddata)
            returnValue = [selecteddata];
        else
            returnValue = [];

        if (returnValue.length == 0) {
            InforCenter_Platform_ListCommonQuery_AlertToSelect("NotSelectObject");
            return;
        }
        HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), returnValue);
    }
}


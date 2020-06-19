//树管理页面加载事件
InforCenter_Platform_CreateMultiObject_LoadPage = function (pageEvent) {
    var page = pageEvent.o;
    //隐藏确定等按钮
    var btnContainer = page.GetControl("Btn_Container");
    btnContainer.HiddenPanel(["item2"]);
    btnContainer.HiddenPanel(["item6"]);
    var pagePara = page.GetPara();
    if (pagePara != null) {
        //获得参数不为空，实例化树页面
        var treePage = HoteamUI.Page.InstanceIn(page.pid, "TreeViewPage", "TreeViewCtrl");
        var treeCtrl = treePage.GetControl("TreeView");
        pagePara.TreeGuid = treeCtrl.id;
        pagePara.PagePID = page.pid;
        var treeContainer = treePage.GetControl("TreeView_Container")
        if (HoteamUI.Common.IsNullOrEmpty(treeContainer) == false) {
            //将树下上一个、下一个隐藏
            treeContainer.HiddenPanel(["item0"]);
            treeContainer.HiddenPanel(["item1"]);
        }
        ///加载类型树
        pagePara.TreeRootDataService = "InforCenter.Common.ObjectService.GetCreateMultiObjectTreeData";
        var objType = InforCenter_Platform_TreeViewCtrl_LoadTreeView(treePage, pagePara);
    }
};

InforCenter_Platform_CreateMultiObject_OnNodeChange = function (pageEvent) {
    var page = pageEvent.o;
    var ctrl = pageEvent.ctrl;
    var node = ctrl.GetSelectedNode();
    var pageContainer = pageEvent.o.GetControl("Info_Container");
    var layoutControl = pageEvent.o.GetControl("CreateMultiObject_Container");
    var pagePara = page.GetPara();
    layoutControl.HiddenPanel(["item1"]);
    layoutControl.ShowPanel(["item2"]);
    layoutControl.ShowPanel(["item3"]);
    if (HoteamUI.Common.IsNullOrEmpty(node) == false) {
        //树节点不为空时，根据树节点值，生成不同类型的属性页面
        var pagename = node.value1 + "-CREATE";
        var para = $.extend(true, {}, pagePara, node.value1);
        pageContainer.LoadPage(pagename, para);
        var pageContainer = pageEvent.o.GetControl('Btn_Container');
        HoteamUI.Page.SetContainerParas(pageContainer.id, "CreateMultiObject", para);
    }
    var btnContainer = pageEvent.o.GetControl("Btn_Container");
    btnContainer.ShowPanel(["item2"]);
    btnContainer.ShowPanel(["item6"]);
};
//进行返回时，显示类型树，隐藏属性页面以及确定等按钮
InforCenter_Platform_CreateMultiObject_OnReturn = function (ctrlEvent) {
    var ctrl = ctrlEvent.o;
    var btnContainer = ctrl.OtherControl("Btn_Container");
    btnContainer.ShowPanel(["item4"]);
    btnContainer.HiddenPanel(["item2"]);
    btnContainer.HiddenPanel(["item6"])
    var parentId = ctrl.ContainerID();
    var parentCtrl = HoteamUI.Page.Instance(parentId);
    var pageContainer = parentCtrl.GetControl("CreateMultiObject_Container");
    pageContainer.ShowPanel(["item1"]);
    pageContainer.HiddenPanel(["item2"]);
}



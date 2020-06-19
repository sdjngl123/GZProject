//树管理页面加载事件
InforCenter_Platform_TreeListQueryCtrl_LoadPage = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();

    var data = null;
    $.each(TreeListCommonQueryScript, function (index, val) {
        if (val.Name == pagePara.ItemName)
            data = JSON.parse(JSON.stringify(val));
    });
    if (data == null) {
        data = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GetTreeListCommonQuery", { para: { Name: pagePara.ItemName } });
        if (data)
            TreeListCommonQueryScript.push(data);
    }
    if (data == null) {
        return;
    }
    pagePara = HoteamUI.Common.MergeObject(pagePara, data);
    var treePage = HoteamUI.Page.InstanceIn(page.pid, "TreeViewPage", "TreeViewCtrl");
    var treeCtrl = treePage.GetControl("TreeView");

    pagePara.TreeGuid = treeCtrl.id;
    pagePara.PagePID = page.pid;
    pagePara.AllowMultiSelect = !pagePara.AllowMultiSelect ? data.AllowMultiSelect : pagePara.AllowMultiSelect;

    var treeData = InforCenter_Platform_TreeViewCtrl_LoadTreeView(treePage, pagePara);
    if (treeData == null) {
        return;
    }
    var node = treeCtrl.GetSelectedNode();
    if (node) {
        InforCenter_Platform_TreeListQueryCtrl_LoadviewFilterPage(page, pagePara);
        var topContainer = page.GetControl("ViewFilterPageContainer");
        HoteamUI.Page.SetContainerParas(topContainer.id, "ListCommonQuery", pagePara);
        HoteamUI.Page.FireParentPageEvent(pageEvent.o.pid, 'OnNodeChange', { Para: pagePara, TreeCtrl: treeCtrl });
    }
};

InforCenter_Platform_TreeListQueryCtrl_LoadviewFilterPage = function (page, pagePara) {
    var listViewFilterPageContainer = page.GetControl("Top_Container");
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.QueryPageName) == false) {
        var viewFilterPage = page.GetControl("ViewFilterPageContainer");
        HoteamUI.UIManager.Show(viewFilterPage.id, pagePara.QueryPageName, pagePara)
    }
    else {
        if (HoteamUI.Common.IsNullOrEmpty(listViewFilterPageContainer) == false) {
            listViewFilterPageContainer.HiddenPanel(["item4", "item5"]);
        }
    }
}
InforCenter_Platform_TreeListQueryCtrl_OnNodeChange = function (pageEvent) {
    var ctrl = pageEvent.ctrl;
    var pageContainer = ctrl.OtherControl("TreeView_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
    HoteamUI.Page.FireParentPageEvent(pageEvent.o.pid, 'OnNodeChange', { Para: pagePara, TreeCtrl: pageEvent.ctrl });
};

InforCenter_Platform_TreeListQueryCtrl_OnQuery = function (pageEvent) {
    HoteamUI.Page.FireParentPageEvent(pageEvent.o.pid, 'OnQuery', pageEvent);
};
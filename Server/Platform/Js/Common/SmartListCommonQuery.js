//列表管理页面加载事件
InforCenter_Platform_SmartListCommonQuery_LoadPage = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    pagePara.ListCtrlPageName = "SmartListViewCtrl";
    var listPage = HoteamUI.Page.InstanceIn(page.pid, "ListViewPageContainer", "SmartListViewCtrl");
    var selectedListPage = HoteamUI.Page.InstanceIn(page.pid, "SelectedListViewPageContainer", "SmartListViewCtrl");
    InforCenter_Platform_ListCommonQuery_LoadData(pageEvent, page, pagePara, listPage, selectedListPage);
    var listCtrl = listPage.GetControl("ListView");
    listCtrl.HideTitleButton("refreshButton");
    listCtrl.HideTitleButton("treeButton");
    listCtrl.HideTitleButton("modelButton");

    var selectedlistCtrl = selectedListPage.GetControl("ListView");
    selectedlistCtrl.HideTitleButton("refreshButton");
    selectedlistCtrl.HideTitleButton("treeButton");
    selectedlistCtrl.HideTitleButton("modelButton");
};

//查询按钮执行方法，
InforCenter_Platform_SmartListCommonQuery_OnQuery = function (pageEvent) {
    //向待选列表添加数据
    var listPage = HoteamUI.Page.InstanceIn(pageEvent.o.pid, "ListViewPageContainer", "SmartListViewCtrl");
    InforCenter_Platform_ListCommonQuery_OnQueryData(pageEvent,listPage);
};

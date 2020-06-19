
//查询页面加载方法
InforCenter_Platform_QueryMachineQuery_QueryPageLoadData = function (pageEvent) {
    var page = pageEvent.o;
    var paras = pageEvent.o.GetPara();
    paras.QueryPagePid = pageEvent.o.pid;
    var tabsCtrl = pageEvent.o.GetControl("Tabs_Ctrl");
    var pageLinksData = InforCenter_Platform_GetTreeManagePageLinksByName("QueryMachineQueryPageLink");
    tabsCtrl.ReInit({ titleType: "capsule split" });
    InforCenter_Platform_TabsCtrl_UpdateTabs(tabsCtrl, pageLinksData, paras);
    var curTabPage = null;
    if (pageLinksData.PageLinks.length > 0) {
        tabsCtrl.SelectTab(0);
        var firstTab = tabsCtrl.GetTabInfoList()[0];
        if (firstTab != null) {
            curTabPage = HoteamUI.Page.Instance(firstTab.pid);
        }
    }javascript: void (0)
    var query = {};
    query.QueryType = "OnPageLoad";
    if (curTabPage != null) {
        query.QueryID = curTabPage.GetControl('Query_Drop').GetSelectedValue();
    }
    var pageContainerCtrl = pageEvent.o.GetControl("PageContainer_Ctrl");
    InforCenter_Platform_QueryMachineQuery_QueryGridDataLoad(pageEvent.o.pid, paras, pageContainerCtrl, JSON.stringify(query));

}

//查询页面初始化列表控件
InforCenter_Platform_QueryMachineQuery_QueryGridDataLoad = function (pid, paras, pageContainerCtrl, queryData) {
    paras.ItemName = 'QueryMachineQueryList';
    paras.ListTitleDataService = "InforCenter.Platform.QueryMachineService.GetQueryMachineGridTitle";
    paras.MenuName = "";
    paras.RightMenuName = "";
    paras.QueryPageName = "";
    paras.AllPageDataService = "InforCenter.Platform.QueryMachineService.GetQueryMachineGridAllPageData";
    paras.OnePageDataService = "InforCenter.Platform.QueryMachineService.GetQueryMachineGridOnePageData";
    paras.RightMenuName = "";
    paras.QueryData = queryData;
    pageContainerCtrl.LoadPage("ListViewCtrl", paras);
    var listPage = HoteamUI.Page.InstanceIn(pid, "PageContainer_Ctrl", "ListViewCtrl");
    InforCenter_Platform_ListViewCtrl_LoadListView(listPage, paras);

    //初始化按钮控件
    var listPage = HoteamUI.Page.InstanceIn(pid, "PageContainer_Ctrl", "ListViewCtrl");
    var listGrid = listPage.GetControl("ListView");
    var menuPage = HoteamUI.Page.InstanceIn(pid, "MenuPageContainer", "MenuCtrl");
    var menuGrid = menuPage.GetControl("Menu");
    var pagePara = paras;
    pagePara.MenuGuid = menuGrid.id;
    pagePara.MenuName = "QueryMachineQueryMenu";
    pagePara.ListGuid = listGrid.id;
    var page = HoteamUI.Page.Instance(pid);
    var isSucceed = InforCenter_Platform_ListManagement_LoadMenus(page, pagePara, menuPage);

}

//查询页面加载方法
InforCenter_Platform_QueryMachineQuery_QueryRolePageLoadData = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    InforCenter_Platform_QueryMachineQuery_QueryRolePageBindQueryData(pagePara, page);
}
//绑定查询对象
InforCenter_Platform_QueryMachineQuery_QueryRolePageBindQueryData = function (pageParas, pageControl) {
    var ret = HoteamUI.DataService.Call("InforCenter.Platform.QueryMachineService.GetQueryMachineQueryData", { para: { Type: "Common" } });
    if (ret) {
        if (ret.CurrentDropData) {
            var currentQueryDropCtrl = pageControl.GetControl("Query_Drop");
            for (var i = 0; i < ret.CurrentDropData.length; i++) {
                var tempData = ret.CurrentDropData[i];
                var newText = HoteamUI.Common.HtmlEscape(tempData.Text);
                ret.CurrentDropData[i].Text = newText;
            }
            currentQueryDropCtrl.LoadItems(ret.CurrentDropData);
            if (HoteamUI.Common.IsNullOrEmpty(pageParas.SelectedHistoryId) == false) {
                currentQueryDropCtrl.SetSelectedByValue(pageParas.SelectedHistoryId);
                var tabsCtrl = pageControl.GetControl("QueryMachine_Ctrl");

                tabsCtrl.LoadFilterData(pageParas.QueryMachineData);
            } else {
                var queryID = currentQueryDropCtrl.GetSelectedValue();
                var currentQueryBaseData = InforCenter_Platform_QueryMachineRole_GetCurrentQueryBaseData(queryID);
                if (currentQueryBaseData && currentQueryBaseData.length > 0) {
                    for (var i = 0; i < currentQueryBaseData.length; i++) {
                        var tempData = currentQueryBaseData[i];
                        var newText = HoteamUI.Common.HtmlEscape(tempData.labelText);
                        currentQueryBaseData[i].labelText = newText;
                    }

                    var tabsCtrl = pageControl.GetControl("QueryMachine_Ctrl");
                    tabsCtrl.LoadFilterData(currentQueryBaseData);
                }
            }
        }
    }
};

//通用查询下拉框改变事件
InforCenter_Platform_QueryMachineRole_CurrentQueryChange = function (ctrlEvent) {
    InforCenter_Platform_QueryMachineRole_QueryChange(ctrlEvent);
}
InforCenter_Platform_QueryMachineRole_QueryChange = function (ctrlEvent) {
    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    var pagePara = page.GetPara();
    var queryID = ctrlEvent.o.GetSelectedValue();
    if (queryID != "") {
        var currentQueryBaseData = InforCenter_Platform_QueryMachineRole_GetCurrentQueryBaseData(queryID);
        if (currentQueryBaseData) {
            var queryMachineCtrl = ctrlEvent.o.OtherControl("QueryMachine_Ctrl");
            queryMachineCtrl.LoadFilterData(currentQueryBaseData);
        }
    }
}

//获取当前选中的通用查询数据
InforCenter_Platform_QueryMachineRole_GetCurrentQueryBaseData = function (queryID) {
    var ret = HoteamUI.DataService.Call("InforCenter.Platform.QueryMachineService.GetCurrentQueryBaseData", { para: { QueryID: queryID } });
    for (var i = 0; i < ret.length; i++) {
        if (ret[i].dateType == "datetime") {
            //ret[i].dateType = "date";
        }
    }
    return ret;
}

//点击【保存】、【删除】按钮时触发事件
InforCenter_Platform_QueryMachine_QueryRolePageMenuClick = function (ctrlEvent) {
    //保存数据
    if (ctrlEvent.value == "Save") {
        var callback = function (ret, da) {
            if (da != null) {
                var queryData = {};
                queryData.QueryID = ctrlEvent.o.OtherControl("Query_Drop").GetSelectedValue();
                queryType = "CommonQuery";
                queryData.Type = queryType;
                var queryMachineCtrl = ctrlEvent.o.OtherControl("QueryMachine_Ctrl");
                var data = queryMachineCtrl.GetFilterData();
                queryData.ConditionData = JSON.stringify(data);
                var ret = HoteamUI.DataService.Call("InforCenter.Platform.QueryMachineService.SaveMyQuery", { para: { QueryParaStr: JSON.stringify(queryData), QueryName: da } });
            }
        }
        HoteamUI.UIManager.Popup("QueryMachineSaveQuery", {}, callback, null, "400*200");
    }
    else if (ctrlEvent.value == "Refresh") {
        var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
        var pagePara = page.GetPara();
        InforCenter_Platform_QueryMachineQuery_QueryRolePageBindQueryData(pagePara, page);
    }
}

//自定义查询保存页面确定方法。
InforCenter_Platform_QueryMachineQuery_QueryRoleBtnSave = function (ctrlEvent) {
    var nameCtrl = ctrlEvent.o.OtherControl("Query_TextBox");
    if (nameCtrl.id != '') {
        if (nameCtrl.Check() != false) {
            HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), nameCtrl.GetText())
        }
    }
}

//查询按钮事件
InforCenter_Platform_QueryMachine_BtnQuery = function (ctrlEvent) {
    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    var pagePara = page.GetPara();
    var queryID = "";
    queryID = ctrlEvent.o.OtherControl("Query_Drop").GetSelectedValue();
    if (HoteamUI.Common.IsNullOrEmpty(queryID) == false) {
        queryType = "CommonQuery";
        var queryMachineCtrl = ctrlEvent.o.OtherControl("QueryMachine_Ctrl");
        var valid = queryMachineCtrl.Check();
        if (valid && pagePara.QueryPagePid) {
            var data = queryMachineCtrl.GetFilterData();
            var queryPage = HoteamUI.Page.Instance(pagePara.QueryPagePid);
            var pageContainerCtrl = queryPage.GetControl("PageContainer_Ctrl");
            var queryData = {};
            queryData.QueryID = queryID;
            queryData.ConditionData = JSON.stringify(data);
            //标识为通用查询
            queryData.Type = queryType;
            //标识为点击查询触发
            queryData.QueryType = "QueryBtn";
            InforCenter_Platform_QueryMachineQuery_QueryGridDataLoad(pagePara.QueryPagePid, pagePara, pageContainerCtrl, JSON.stringify(queryData));
        }
    }
}



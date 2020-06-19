
//查询页面加载方法
InforCenter_Platform_QueryMachineQuery_MyQueryPageLoadData = function (pageEvent) {
    InforCenter_Platform_QueryMachineQuery_MyQueryPageBindData(pageEvent.o);
}

//绑定数据
InforCenter_Platform_QueryMachineQuery_MyQueryPageBindData = function (pageControl) {
    var paras = pageControl.GetPara();
    var ret = HoteamUI.DataService.Call("InforCenter.Platform.QueryMachineService.GetQueryMachineQueryData", { para: { Type: "MyQuery" } });
    if (ret) {
        if (ret.CurrentDropData) {
            var currentQueryDropCtrl = pageControl.GetControl("MyQueryQuery_Drop");
            currentQueryDropCtrl.LoadItems(ret.CurrentDropData);
            if (HoteamUI.Common.IsNullOrEmpty(paras.SelectedHistoryId) == false) {
                currentQueryDropCtrl.SetSelectedByValue(paras.SelectedHistoryId);
                var tabsCtrl = pageControl.GetControl("QueryMachine_Ctrl");
                tabsCtrl.LoadFilterData(paras.QueryMachineData);
            } else {
                var queryID = currentQueryDropCtrl.GetSelectedValue();
                var currentQueryBaseData = InforCenter_Platform_QueryMachineRole_GetCurrentQueryBaseData(queryID);
                if (currentQueryBaseData && currentQueryBaseData.length > 0) {
                    var queryMachineCtrl = pageControl.GetControl("QueryMachine_Ctrl");
                    queryMachineCtrl.LoadFilterData(currentQueryBaseData);
                }
            }
        }
    }
}

//自定义查询下拉框改变事件
InforCenter_Platform_QueryMachineRole_MyQueryChange = function (ctrlEvent) {
    InforCenter_Platform_QueryMachineRole_QueryChange(ctrlEvent);
}

//查询按钮事件
InforCenter_Platform_QueryMachine_MyQueryBtnQuery = function (ctrlEvent) {
    
    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    var pagePara = page.GetPara();
    var queryID = "";
    var queryType = "MyQuery";
    queryID = ctrlEvent.o.OtherControl("MyQueryQuery_Drop").GetSelectedValue();
    if (HoteamUI.Common.IsNullOrEmpty(queryID) == false) {
        var queryMachineCtrl = ctrlEvent.o.OtherControl("QueryMachine_Ctrl");
        var data = queryMachineCtrl.GetFilterData();

        if (pagePara.QueryPagePid) {
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

//页面按钮事件（删除自定义查询功能）
InforCenter_Platform_QueryMachine_MyQueryPageMenuClick = function (ctrlEvent) {
    if (ctrlEvent.value == "Delete") {
        var currentQueryDropCtrl = ctrlEvent.o.OtherControl("MyQueryQuery_Drop");
        var selectID = currentQueryDropCtrl.GetSelectedValue();
        if (selectID != "") {
            var callback = function (rr, dd) {
                if (dd.confirm != "Cancel") {
                    var ret = HoteamUI.DataService.Call("InforCenter.Platform.QueryMachineService.DeleteMyQueryDropData", { para: { SelectedID: selectID } });
                    if (ret) {
                        currentQueryDropCtrl.LoadItems(ret);
                        var queryID = currentQueryDropCtrl.GetSelectedValue();
                        var currentQueryBaseData = InforCenter_Platform_QueryMachineRole_GetCurrentQueryBaseData(queryID);
                        if (currentQueryBaseData) {
                            var queryMachineCtrl = ctrlEvent.o.OtherControl("QueryMachine_Ctrl");
                            queryMachineCtrl.LoadFilterData(currentQueryBaseData);
                        }
                    }
                }
            }
            HoteamUI.UIManager.Popup({ pagename: "Confirm", paras: { pageMode: "OkCancel", message: HoteamUI.Language.Lang("QueryMachine.DeteleText") }, callback: callback });
        }
    }
    else if (ctrlEvent.value == "Refresh")
    {
        var pageControl = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
        InforCenter_Platform_QueryMachineQuery_MyQueryPageBindData(pageControl);
    }
}



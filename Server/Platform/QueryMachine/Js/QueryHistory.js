
//查询历史页面加载数据方法
InforCenter_Platform_QueryMachineQuery_QueryHistoryPageLoadData = function (pageEvent) {
    var customControl = pageEvent.o.GetControl("QueryMachineHistoryCtrl");
    customControl.LoadTemplate("QueryMachineHistoryTemp");
    var data = HoteamUI.DataService.Call("InforCenter.Platform.QueryMachineService.GetQueryHistoryData", { para: { StartNo: "0", EndNo: "100" } });
    InforCenter_Platform_QueryMachineQuery_LoadQueryHistoryData(data);
}

InforCenter_Platform_QueryMachineQuery_TitleClick = function (historyObj) {
    var queryID = $(historyObj).attr("QueryId");
    var ctrlId = $(historyObj).parent().parent().parent().parent().attr('id');
    var ctrl = HoteamUI.Control.Instance(ctrlId);
    var page = HoteamUI.Page.Instance(ctrl.ContainerID());
    var pagePara = page.GetPara();
    var queryPage = HoteamUI.Page.Instance(pagePara.QueryPagePid);
    var pageContainerCtrl = queryPage.GetControl("PageContainer_Ctrl");
    var queryData = {};
    queryData.QueryID = queryID;
    queryData.ConditionData = "[]";
    InforCenter_Platform_QueryMachineQuery_QueryGridDataLoad(pagePara.QueryPagePid, pagePara, pageContainerCtrl, JSON.stringify(queryData));
}


InforCenter_Platform_QueryMachineQuery_LoadQueryHistoryData = function (retData) {
    var data = retData.data;
    var html = '';
    for (var i = 0; i < data.length; i++) {
        html += '<div style="height:25px;line-height:25px;">' + data[i].title + '</div>';
        for (var j = 0; j < data[i].content.length; j++) {
            var obj = data[i].content[j];
            html +=
                '<div class="QueryHistoryAllDiv">' +
			        '<div class="QueryHistoryTitleDiv">' +
				        '<input class="QueryHistoryCheckBox" type="checkbox"/>' +
				        '<a class="QueryHistoryTitle" title="' + HoteamUI.Common.HtmlEscape(obj.title) + '" QueryId=' + obj.id + '>' + obj.title + '</a>' +
			        '</div>' +
			        '<div class="QueryHistoryValueDiv">' +
				        '<span title="' + obj.value + '">' + obj.value + '</span>' +
			        '</div>' +
		        '</div>';
        }
    }
    $("#QueryMachineHistoryTemp").append(html);

    //绑定事件
    $("#QueryMachineHistoryTemp").on("mouseenter", ">div", function () {
        $(this).css("background-color", "#D9E5EF");
    }).on("mouseleave", ">div", function () {
        if (!$(this).find(".QueryHistoryCheckBox").prop("checked")) {
            $(this).css("background-color", "#ffffff");
        }
    }).on("click", "input", function (e) {
        if ($(this).prop("checked")) {
            $(this).parent().addClass("QueryHistoryAllDivChecked");
        } else {
            $(this).parent().removeClass("QueryHistoryAllDivChecked");
        }
        e.stopPropagation();
    }).on("click", ">div", function () {
        if ($(this).find(".QueryHistoryCheckBox").prop("checked")) {
            $(this).find(".QueryHistoryCheckBox").prop("checked", "");
            $(this).removeClass("QueryHistoryAllDivChecked");
        } else {
            $(this).find(".QueryHistoryCheckBox").prop("checked", "checked");
            $(this).addClass("QueryHistoryAllDivChecked");
        }
    })
    $(".QueryHistoryTitle").on("click", function () {
        InforCenter_Platform_QueryMachineQuery_TitleClick(this);
    })

    //设置滚动加载功能
    $("#QueryMachineHistoryTemp").scroll(function () {
        var ele = $(this);
        var viewH = ele.height(),//可见高度  
            contentH = ele.get(0).scrollHeight,//内容高度  
            scrollTop = ele.scrollTop();//滚动高度  
        if (ele.attr("thisHeight") && ele.attr("thisHeight") == scrollTop + "")
            return;
        if (contentH - viewH - scrollTop == 0) { //到达底部0px时,加载新内容  
            ele.attr("thisHeight", scrollTop);
            var checlNo = ele.find(".QueryHistoryCheckBox").length;
            var data = HoteamUI.DataService.Call("InforCenter.Platform.QueryMachineService.GetQueryHistoryData", { para: { StartNo: checlNo + "", EndNo: checlNo + 100 + "" } });
            InforCenter_Platform_QueryMachineQuery_LoadQueryHistoryData(data);
        }
    });
}
//按钮点击事件
InforCenter_Platform_QueryMachine_QueryMachineQueryHistoryMenuClick = function (ctrlEvent) {
    var customControl = ctrlEvent.o.OtherControl("QueryMachineHistoryCtrl");
    var checkedCtrls = $("#" + customControl.id).find(".QueryHistoryCheckBox:checked");

    if (ctrlEvent.value == "Edit") {
        if (checkedCtrls.length != 1) {
            HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("QueryMachine.NoneSelect"));
        } else {
            var checkCtrl = checkedCtrls[0];
            var queryId = $(checkCtrl).next("a").attr("queryid");
            var data = HoteamUI.DataService.Call("InforCenter.Platform.QueryMachineService.GetHisotryModelForHistoryID", { para: { ObjectID: queryId } });
            if (data) {
                var baseQueryId = data.BaseQueryID;
                var baseType = baseQueryId.split('_')[0];
                if (baseType != "") {

                    var page = HoteamUI.Page.Instance(customControl.ContainerID());
                    var pagePara = page.GetPara();
                    var queryPage = HoteamUI.Page.Instance(pagePara.QueryPagePid);
                    var tabsCtrl = queryPage.GetControl("Tabs_Ctrl");
                    pagePara.QueryMachineData = data.QueryMachine;
                    pagePara.SelectedHistoryId = baseQueryId;
                    if (baseType == "MYQUERYMACHINEBASEINFO") {
                        var index = tabsCtrl.GetTabIndexByTabId("MyQueryRole");
                        tabsCtrl.UpdateTab(index, { pageName: "MyQueryMachine", pageParas: pagePara, isSelected: true });
                        tabsCtrl.SelectTab(index);
                    } else {
                        var index = tabsCtrl.GetTabIndexByTabId("QueryRole");
                        tabsCtrl.UpdateTab(index, { pageName: "QueryMachineQueryRole", pageParas: pagePara, isSelected: true });
                        tabsCtrl.SelectTab(index);
                    }
                }
            }
        }
    } else if (ctrlEvent.value == "Delete") {
        var queryIDs = "";
        var checkCount = checkedCtrls.length;
        if (checkCount == 0) {
            HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("QueryMachine.SelectRows"));
            return;
        }
        for (var i = 0; i < checkCount; i++) {
            if (i == checkCount - 1) {
                queryIDs += $(checkedCtrls[i]).next("a").attr("queryid");
                continue;
            }
            queryIDs += $(checkedCtrls[i]).next("a").attr("queryid") + ";";
        }
        var ret = HoteamUI.DataService.Call("InforCenter.Platform.QueryMachineService.DeleteQueryHistory", { para: { QueryID: queryIDs } });
        if (ret) {
            $("#QueryMachineHistoryTemp").remove();
            customControl.LoadTemplate("QueryMachineHistoryTemp");
            var data = HoteamUI.DataService.Call("InforCenter.Platform.QueryMachineService.GetQueryHistoryData", { para: { StartNo: "0", EndNo: "100" } });
            InforCenter_Platform_QueryMachineQuery_LoadQueryHistoryData(data);
        }
    } else if (ctrlEvent.value == "DeleteAll") {
        var ret = HoteamUI.DataService.Call("InforCenter.Platform.QueryMachineService.DeleteQueryHistory", { para: { DeleteType: "DeleteAll" } });
        if (ret) {
            $("#QueryMachineHistoryTemp").remove();
        }
    }
    else if (ctrlEvent.value == "Refresh") {
        var pageControl = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
        var customControl = pageControl.GetControl("QueryMachineHistoryCtrl");
        customControl.LoadTemplate("QueryMachineHistoryTemp");
        var data = HoteamUI.DataService.Call("InforCenter.Platform.QueryMachineService.GetQueryHistoryData", { para: { StartNo: "0", EndNo: "100" } });
        InforCenter_Platform_QueryMachineQuery_LoadQueryHistoryData(data);
    }
}

scrollBottomTest = function () {
    $("#QueryMachineHistoryTemp").scroll(function () {
        var $this = $(this),
        viewH = $(this).height(),//可见高度  
        contentH = $(this).get(0).scrollHeight,//内容高度  
        scrollTop = $(this).scrollTop();//滚动高度  
        //if(contentH - viewH - scrollTop <= 100) { //到达底部100px时,加载新内容  
        if (scrollTop / (contentH - viewH) >= 0.95) { //到达底部100px时,加载新内容  

        }
    });
}
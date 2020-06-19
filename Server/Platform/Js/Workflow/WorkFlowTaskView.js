
//点击详细信息显示查看详细信息页面
InforCenter_Platform_WorkFlow_WorkFlowTask_ShowDetailPage = function (rowEvent) {
    var rowObject = rowEvent.rowobject;
    var info = HoteamUI.DataService.Call("InforCenter.Common.WorkflowService.GetFlowTaskInfo", { para: { TaskID: rowObject.EID } });
    info.TaskInfo = JSON.parse(info.TaskInfo);
    var pageParas = {};
    pageParas.ObjectID = rowObject.EID;
    pageParas.SelectID = rowObject.EID;
    pageParas.Template = info.TaskInfo.FLOWTEMPLATE;
    pageParas.NodeID = info.TaskInfo.FLOWNODEID;
    HoteamUI.UIManager.Popup({ pagename: "WorkFlowTaskView", paras: pageParas });

}


//流程任务详细信息页面
InforCenter_Platform_WorkFlowTaskViewPage_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();

    //加载发起流程tab页
    var tabsPage = HoteamUI.Page.InstanceIn(page.pid, "TabsCtrlPage", "TabsCtrl");
    var tabsCtrl = tabsPage.GetControl("Tabs");
    var pageLinksData = InforCenter_Platform_GetTreeManagePageLinksByName("WorkFlowTaskPropertys");
    var pageLinks = pageLinksData.PageLinks;
    var pageLinkIndex = 0;
    var index = 0;
    for (var index in pageLinks) {
        var item = pageLinks[index];
        item.Text = HoteamUI.Language.Lang("PageLinkItems", item.Name);
        if (item.Name == "WorkflowPlugin") {
            pageLinkIndex = index;
        }
        index++;
    }

    //查看流程是否有插件，没有插件则把插件tab页去掉
    var pluginInfo = HoteamUI.DataService.Call("InforCenter.Common.WorkflowService.GetFlowPagePluginInfo", { para: pagePara });
    if (pluginInfo.length == 0) {
        pageLinks = pageLinks.slice(0, pageLinkIndex);
    }
    else {
        pagePara.info = pluginInfo;
    }
    pagePara.HiddenMenu = true;
    pageLinksData.PageLinks = pageLinks;
    var paras = $.extend(pagePara, pageLinks);
    InforCenter_Platform_TabsCtrl_UpdateTabs(tabsCtrl, pageLinksData, paras);
    tabsCtrl.SelectTab(0);
}
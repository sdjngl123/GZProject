//选中项信息tab页，用于添加选中的节点tab页，根据不同的选中节点类型，添加或删除Tab页
InforCenter_Platform_WorkflowTemplateSelectedTab_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var template = WebDesignerWorkflowInfo.Template;
    if (!WebDesignerWorkflowInfo.CurrSelectInfo) {
        //移除tab页
        tabCtrl = page.GetControl("SelectedTabs");
        var tabs = tabCtrl.GetTabInfoList();
        for (var i = tabs.length - 1; i >= 0; i--) {
            tabCtrl.RemoveTab(i);
        }
        WebDesignerWorkflowInfo.GetDataPid = "";
        return;
    }
    var pages = [];
    var pageParas = page.GetPara();

    //初始化选中节点的数据,如果选中的是节点
    if (WebDesignerWorkflowInfo.CurrSelectInfo.NodeID) {
        pageParas.ID = WebDesignerWorkflowInfo.CurrSelectInfo.NodeID;
        switch (WebDesignerWorkflowInfo.CurrSelectInfo.NodeType) {
            case "StartNode":
            case "EndNode":
            case "FlowSwitch":
            case "FlowAnd":
            case "FlowOr":
                pages = ["SelectedOtherBaseInfo"];
                InforCenter_Platform_WorkflowTemplateSelectedTab_UpdateTabs(page, pages, pageParas);
                break;
            case "FlowBusiness":
                pages = ["SelectedBusinessBaseInfo", "SelectedBusinessPluginSetting"];
                InforCenter_Platform_WorkflowTemplateSelectedTab_UpdateTabs(page, pages, pageParas);
                break;
            case "FlowState":
                break;
            default:
                pages = ["SelectedAuditBaseInfo", "SelectedTaskActorInfo", "AuditResultInfo", "SelectedAuditPluginSetting"];
                InforCenter_Platform_WorkflowTemplateSelectedTab_UpdateTabs(page, pages, pageParas);
                break;
        }
    } else if (WebDesignerWorkflowInfo.CurrSelectInfo.LinkID) {
        pageParas.ID = WebDesignerWorkflowInfo.CurrSelectInfo.NodeID;
        pages = ["SelectedLineInfo"];
        InforCenter_Platform_WorkflowTemplateSelectedTab_UpdateTabs(page, pages, pageParas);
    }

}
//更新Tab页
InforCenter_Platform_WorkflowTemplateSelectedTab_UpdateTabs = function (page, pages, pagePara) {
    var tabCtrl = page.GetControl("SelectedTabs");
    var tabs = tabCtrl.GetTabInfoList();
    if (tabs.length == 0) {
        for (var index = 0; index < pages.length; index++) {
            var item = pages[index];
            tabCtrl.AddTab({ pageName: item, pageParas: pagePara, text: HoteamUI.Language.Lang(item + ".Title"), activeRefresh: true });
        }
    }
    else if (pages.length == tabs.length) {
        for (var index = 0; index < pages.length;index++) {
            var item = pages[index];
            tabCtrl.UpdateTab(index, {
                pageName: item,
                pageParas: pagePara,
                text: HoteamUI.Language.Lang(item + ".Title"),
                tabId: item,
                activeRefresh: true
            });
        }
    }
    else if (pages.length > tabs.length) {
        for (var index = 0; index < tabs.length;index++) {
            var item = pages[index];
            tabCtrl.UpdateTab(index, {
                pageName: item,
                pageParas: pagePara,
                text: HoteamUI.Language.Lang(item + ".Title"),
                tabId: item,
                activeRefresh: true
            });
        }
        for (var index = 0; index < pages.length; index++) {
            if (index >= tabs.length) {
                var item = pages[index];
                tabCtrl.AddTab({ pageName: item, pageParas: pagePara, text: HoteamUI.Language.Lang(item + ".Title"), activeRefresh: true });
            }
        }
    }

    else {
        for (var index = 0; index < pages.length;index++) {
            var item = pages[index];
            tabCtrl.UpdateTab(index, {
                pageName: item,
                pageParas: pagePara,
                text: HoteamUI.Language.Lang(item + ".Title"),
                tabId: item,
                activeRefresh: true
            });
        }
        for (var i = tabs.length - 1; i >= pages.length; i--) {
            tabCtrl.RemoveTab(i);
        }
    }
    var currentSelectPage = "";
    var selectIndex = tabCtrl.GetSelectedTab();
    if (selectIndex >= 0) {
        currentSelectPage = tabCtrl.GetTabInfoList()[selectIndex].pageName;
    }
    if (currentSelectPage != WebDesignerWorkflowInfo.SelectedNodePageName) {
        var isSelect = false;
        var tabs = tabCtrl.GetTabInfoList();
        for (var index = 0; index < tabs.length;index++) {
            if (tabs[index].pageName == currentSelectPage) {
                isSelect = true;
                break;
            }
            if (tabs[index].pageName == WebDesignerWorkflowInfo.SelectedNodePageName) {
                tabCtrl.SelectTab(index);
                isSelect = true;
                break;
            }
        }
        //选中指定的Tab页
        if (isSelect == false) {
            tabCtrl.SelectTab(0);
        }
    }
};

InforCenter_Platform_WorkflowTemplateSelectedTab_OnBeforeToggle = function (ctrlEvent) {
    if (HoteamUI.Common.IsNullOrEmpty(WebDesignerWorkflowInfo.GetDataPid) == false && WebDesignerWorkflowInfo.IsNodeSelectChanged == false && HoteamUI.Common.IsNullOrEmpty(HoteamUI.Page.Instance(WebDesignerWorkflowInfo.GetDataPid).PageName()) == false) {
        //验证输入的值是否都通过，如果不通过，不允许切换节点
        return HoteamUI.Page.FirePageEvent(WebDesignerWorkflowInfo.GetDataPid, "OnCheck");
    }
}

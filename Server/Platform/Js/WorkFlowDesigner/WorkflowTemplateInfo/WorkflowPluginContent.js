//插件内容通用页，扩展的插件都要嵌套到改页中
InforCenter_Platform_WorkflowPluginContent_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();

    var pageCtrl = page.GetControl("PluginPageContainer");
    if (pagePara.PageName) {
        pageCtrl.LoadPage(pagePara.PageName, pagePara);
    }
    if (pagePara.Plugin) {
        var title = HoteamUI.Language.Lang("WorkflowPlugins", pagePara.Plugin.Name);
        page.GetControl("HeaderlLabel").SetText(title);
        page.GetControl("BeforeExec").SetChecked(pagePara.Plugin.BeforeExec);
    }
}
//删除当前插件
InforCenter_Platform_WorkflowPluginContent_Close = function (ctrlEvent) {
    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    var pagePara = page.GetPara();

    if (!pagePara.ParentPID || !pagePara.Position || isNaN(pagePara.Position) || pagePara.Position == 0) {
        return;
    }
    var pluginpage = "";
    var selectPlugin = "";
    if (pagePara.ShowType == "AuditNode") {
        pluginpage = "SelectedAuditPluginSetting";
        var parentPage = HoteamUI.Page.Instance(pagePara.ParentPID);
        selectPlugin = parentPage.GetControl("SelectedAuditPluginSettingAddpluginDropdown").GetSelectedValue();
    }
    if (pagePara.ShowType == "Workflow") {
        pluginpage = "WorkflowPluginSetting";
        var parentPage = HoteamUI.Page.Instance(pagePara.ParentPID);
        selectPlugin = parentPage.GetControl("WorkflowPluginSettingAddpluginDropdown").GetSelectedValue();
    }
    if (pagePara.ShowType == "BusinessNode") {
        pluginpage = "SelectedBusinessPluginSetting";
        var parentPage = HoteamUI.Page.Instance(pagePara.ParentPID);
        selectPlugin = parentPage.GetControl("SelectedBusinessPluginSettingAddpluginDropdown").GetSelectedValue();
    }


    //保存所有插件
    HoteamUI.Page.FirePageEvent(pagePara.ParentPID, "OnGetData");


    if (pagePara.ShowType == "Workflow") {
        WebDesignerWorkflowInfo.Template.PluginList.splice(parseInt(pagePara.Position) - 1, 1);
    } else {
        WebDesignerWorkflowInfo.CurrSelectInfo.PluginList.splice(parseInt(pagePara.Position) - 1, 1);
    }
    
    var para = {};
    para.SelectPlugin = selectPlugin;
    HoteamUI.UIManager.Show(pagePara.ParentPID, pluginpage, para);
}
//当前插件OnGetData
InforCenter_Platform_WorkflowPluginContent_OnGetData = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    var containerid = "PluginPageContainer";
    var childpage = HoteamUI.Page.InstanceIn(page.pid, containerid, pagePara.PageName);
    //获取前序是否前序执行，传入到插件页面中
    var beforeExec = page.GetControl("BeforeExec").IsChecked();
    HoteamUI.Page.FirePageEvent(childpage.pid, "OnGetData", { BeforeExec: beforeExec });
}
InforCenter_Platform_WorkflowPluginContent_OnCheck = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    var containerid = "PluginPageContainer";
    var childpage = HoteamUI.Page.InstanceIn(page.pid, containerid, pagePara.PageName);
   
    return HoteamUI.Page.FirePageEvent(childpage.pid, "OnCheck");
}
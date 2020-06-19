//页面插件OnCreate
InforCenter_Platform_LifeCyclePagePlugin_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var para = page.GetPara();
    var template = WebDesignerWorkflowInfo.Template;

    var currPlugin = {};
    if (para.Plugin) {
        currPlugin = para.Plugin;
    }

    var pageData = HoteamUI.DataService.Call("Hoteam.InforCenter.WorkflowService.GetPagePluginList", { para: { TemplateType: template.TemplateType } });
    if (pageData) {
        page.GetControl("PageName_Value").LoadItems(pageData);
    }
    if (currPlugin.Content) {
        var content = JSON.parse(currPlugin.Content);

        for (var i in content) {
            if (!content.hasOwnProperty(i)) {
                continue;
            }
            if (i == "PageName") {
                page.GetControl("PageName_Value").SetSelectedByValue(content.PageName);
                break;
            }
        }

        var editGrid = page.GetControl("PagePara_Value");
        var data = HoteamUI.DataService.Call("Hoteam.InforCenter.WorkflowTemplateService.GetPluginPageEditGrid", { para: { PageContent: currPlugin.Content } });
        if (data) {
            editGrid.LoadGridRows(data);
        }
    }

}

//获取数据存到模板上
InforCenter_Platform_LifeCyclePagePlugin_OnGetData = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();

    var plugin = {};
    plugin.Name = "LifeCyclePagePlugin";
    plugin.PluginType = pagePara.ShowType;


    var content = {};
    content.PageName = page.GetControl("PageName_Value").GetSelectedValue();
    var editGrid = page.GetControl("PagePara_Value");
    var data = editGrid.SaveGridRows();

    if (data.rowsObject) {
        for (var i = 0; i < data.rowsObject.length; i++) {
            var name = data.rowsObject[i].ParameterName;
            var value = data.rowsObject[i].ParameterValue;

            content[name] = value;
        }
    }
    var contentStr = JSON.stringify(content);
    plugin.Content = contentStr;

    if (pagePara.ShowType == "Page") {
        WebDesignerWorkflowInfo.Template.PluginList.push(plugin);
    } else {
        plugin.Name = "TaskPagePlugin";
        WebDesignerWorkflowInfo.CurrSelectInfo.PluginList.push(plugin);
    }
}

InforCenter_Platform_LifeCyclePagePlugin_OnCheck = function (pageEvent) {
    var page = pageEvent.o;
    var result = true;
    var pageNameCtrl = page.GetControl("PageNameContainer");
    if (pageNameCtrl && pageNameCtrl.id != "") {
        result = pageNameCtrl.Check();
        if (!result) {
            return false;
        }
    }

    var editCtrl = page.GetControl("PagePara_Value");
    if (editCtrl && editCtrl.id != "") {
        return editCtrl.GetRegexStatus();
    }
}

InforCenter_Platform_LifeCyclePagePlugin_PageNameOnChange = function (ctrlEvent) {
    var pageName = ctrlEvent.o.GetSelectedValue();
    var data = HoteamUI.DataService.Call("Hoteam.InforCenter.WorkflowTemplateService.ChangePluginPageEditGrid", { para: { PageName: pageName } });
    if (data) {
        var editGrid = ctrlEvent.o.OtherControl("PagePara_Value");
        editGrid.LoadGridRows(data);
    }
}
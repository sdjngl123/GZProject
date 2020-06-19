//更改生命周期状态插件onCreate
InforCenter_Platform_ChangeStatePlugin_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    var modelData = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateExtendService.GetEntityTypeList", {});

    page.GetControl("ModelList_Value").LoadItems(modelData);

    var currPlugin = {};
    if (pagePara.Plugin) {
        currPlugin = pagePara.Plugin;
    }

    if (currPlugin.Content) {
        try {
            var content = JSON.parse(currPlugin.Content);
            if (content) {
                page.GetControl("ModelList_Value").SetSelectedByValue(content.ModelName);

                var data = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateExtendService.GetLifeCircleListforBindingDroupdown", { para: { StateType: "Workflow", ModelName: content.ModelName } });
                page.GetControl("LifeCricleState_Value").LoadItems(data);

                page.GetControl("LifeCricleState_Value").SetSelectedByValue(content.State);
            }
        } catch (e) {
            if (window.console) {
                console.log(e.message);
            }
        }
    }
}

InforCenter_Platform_ChangeStatePlugin_ModelListOnChange = function (ctrlEvent) {
    var ctrl = ctrlEvent.o;
    ctrl.OtherControl("LifeCricleState_Value").LoadItems([]);
    var model = ctrl.OtherControl("ModelList_Value").GetSelectedValue();
    if (model) {
        var data = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateExtendService.GetLifeCircleListforBindingDroupdown", { para: { StateType: "Workflow", ModelName: model } });
        ctrl.OtherControl("LifeCricleState_Value").LoadItems(data);
    }
}

//更改生命周期状态插件onGetData
InforCenter_Platform_ChangeStatePlugin_OnGetData = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();

    var plugin = {};
    plugin.Name = "ChangeState";
    plugin.BeforeExec = pageEvent.BeforeExec == true ? true : false;
    var content = {};
    content.ModelName = page.GetControl("ModelList_Value").GetSelectedValue();
    content.State = page.GetControl("LifeCricleState_Value").GetSelectedValue();
    plugin.Content = JSON.stringify(content);

    if (pagePara.ShowType == "Workflow") {
        WebDesignerWorkflowInfo.Template.PluginList.push(plugin);
    } else {
        WebDesignerWorkflowInfo.CurrSelectInfo.PluginList.push(plugin);
    }
}
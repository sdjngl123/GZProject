﻿//生命周期插件OnCreate
InforCenter_Platform_LifeCyclePluginSetting_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    //保存上一个页面的数据
    if (page.pid != WebDesignerWorkflowInfo.GetDataPid)
        InforCenter_Platform_WorkflowTemplateEdit_SavePreviousPageData(page);
    var template = WebDesignerWorkflowInfo.Template;
    //初始化下拉框
    var pluginListCtrl = page.GetControl("LifeCyclePluginSettingAddpluginDropdown");
    var servicePara = {};
    servicePara.PluginType = "Page";
    servicePara.LifeCycleType = WebDesignerWorkflowInfo.Template.TemplateType;
    var data = HoteamUI.DataService.Call("InforCenter.LifeCycle.LifeCycleService.GetLifeCyclePluginListByType", { para: servicePara });
    pluginListCtrl.LoadItems(data);
    var tmpPara = page.GetPara();
    if (tmpPara && tmpPara.SelectPlugin)
    {
        pluginListCtrl.SetSelectedByValue(tmpPara.SelectPlugin);
    }

    var pagePara = {};
    pagePara.ShowType = "Page";
    pagePara.ParentPID = page.pid;

    var curPagePara = [];
    //初始化插件
    var layoutCtrl = page.GetControl("LifeCyclePluginSettingVLayout");
    var ret = HoteamUI.DataService.Call("InforCenter.LifeCycle.LifeCycleService.GetLifeCyclePluginList", {});
    if (template.PluginList) {
        for (var i = 0; i < template.PluginList.length; i++) {
            var plugin = template.PluginList[i];
            var pageName = undefined;
            var pageHeight = undefined;
            for (var j = 0; j < ret.length; j++) {
                if (ret[j].Name == plugin.Name) {
                    pageName = ret[j].PageName;
                    break;
                }
            }

            pageContainer = page.GetControl("PageContainer_" + (parseInt(i) + 1));
            pagePara.Position = parseInt(i) + 1;
            pagePara.Plugin = plugin;
            pagePara.PageName = pageName;
            pageContainer.LoadPage("LifeCyclePluginContent", pagePara);
            //得到插件页面高度
            var pluginPageConfig = HoteamUI.UIManager.GetPageConfig(pageName);
            if (pluginPageConfig && pluginPageConfig.Settings) {
                for (var s = 0; s < pluginPageConfig.Settings.length; s++) {
                    if (pluginPageConfig.Settings[s].Key == "height") {
                        var h = pluginPageConfig.Settings[s].Value;
                        if (isNaN(parseInt(h)) == false) {
                            //35为插件上侧高度
                            pageHeight = parseInt(h) + 35;
                        } else {
                            pageHeight = "120";
                        }
                    }
                }
            } else {
                pageHeight = "120";
            }
            var info = {};
            info.Position = parseInt(i) + 1;
            info.PageName = pageName;
            curPagePara.push(info);

            var size = {};
            var str = 'size = {item' + (parseInt(i) + 1) + ':"' + pageHeight + '"}';
            eval(str);
            layoutCtrl.ResetPanelSize(size);

        }
    }
    HoteamUI.Page.SetContainerParas(page.pid, "LifeCyclePluginSetting", { PageInfo: curPagePara });
}

//添加插件
InforCenter_Platform_LifeCyclePluginSetting_AddPlugin = function (ctrlEvent) {
    var ctrl = ctrlEvent.o;
    var para = HoteamUI.Page.GetContainerPara(ctrl.ContainerID());
    if (para && para.PageInfo.length >= 20) {
        HoteamUI.UIManager.Popup({ pagename: "Confirm", paras: { pageMode: "OK", message: HoteamUI.Language.Lang("LifeCyclePluginSetting.MaxCountError") } });
        return;
    }

    var ddlCtrl = ctrl.OtherControl("LifeCyclePluginSettingAddpluginDropdown");
    var value = ddlCtrl.GetSelectedValue();
    if (!value) {
        return;
    }
    var pageName = undefined;
    var name = undefined;
    var pageHeight = undefined;
    //获取插件列表
    var ret = HoteamUI.DataService.Call("InforCenter.LifeCycle.LifeCycleService.GetLifeCyclePluginList", {});
    for (var i = 0; i < ret.length; i++) {
        if (ret[i].Name == value) {
            pageName = ret[i].PageName;
            name = ret[i].Name;
            break;
        }
    }

    var pagePara = {};
    pagePara.ShowType = "Page";
    pagePara.ParentPID = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID()).pid;

    var plugin = {};
    plugin.PluginType = "Page";
    plugin.Name = name;
    plugin.Content = "{}";
    pagePara.Plugin = plugin;
    //如果页面没有设置个数,即第一次添加
    if (!para || !para.PageInfo || para.PageInfo.length == 0) {
        pageContainer = ctrl.OtherControl("PageContainer_1");
        pagePara.Position = 1;
        pagePara.PageName = pageName;
        pageContainer.LoadPage("LifeCyclePluginContent", pagePara);
        //得到插件页面高度
        var pluginPageConfig = HoteamUI.UIManager.GetPageConfig(pageName);
        if (pluginPageConfig && pluginPageConfig.Settings) {
            for (var s = 0; s < pluginPageConfig.Settings.length; s++) {
                if (pluginPageConfig.Settings[s].Key == "height") {
                    var h = pluginPageConfig.Settings[s].Value;
                    if (isNaN(parseInt(h)) == false) {
                        //35为插件上侧高度
                        pageHeight = parseInt(h) + 35;
                    } else {
                        pageHeight = "120";
                    }
                }
            }
        } else {
            pageHeight = "120";
        }

        var pageInfo = [];
        var info = {};
        info.Position = 1;
        info.PageName = pageName;
        pageInfo.push(info);
        HoteamUI.Page.SetContainerParas(ctrl.ContainerID(), "LifeCyclePluginSetting", { PageInfo: pageInfo });
        var layoutCtrl = ctrl.OtherControl("LifeCyclePluginSettingVLayout");
        layoutCtrl.ResetPanelSize({ item1: pageHeight });

    } else {
        var position = para.PageInfo.length + 1;
        pageContainer = ctrl.OtherControl("PageContainer_" + position);
        pagePara.Position = position;
        pagePara.PageName = pageName;
        pageContainer.LoadPage("LifeCyclePluginContent", pagePara);

        //得到插件页面高度
        var pluginPageConfig = HoteamUI.UIManager.GetPageConfig(pageName);
        if (pluginPageConfig && pluginPageConfig.Settings) {
            for (var s = 0; s < pluginPageConfig.Settings.length; s++) {
                if (pluginPageConfig.Settings[s].Key == "height") {
                    var h = pluginPageConfig.Settings[s].Value;
                    if (isNaN(parseInt(h)) == false) {
                        //35为插件上侧高度
                        pageHeight = parseInt(h) + 35;
                    } else {
                        pageHeight = "120";
                    }
                }
            }
        } else {
            pageHeight = "120";
        }

        var info = {};
        info.Position = position;
        info.PageName = pageName;
        para.PageInfo.push(info);
        HoteamUI.Page.SetContainerParas(ctrl.ContainerID(), "LifeCyclePluginSetting", para);
        var size = {};
        var str = 'size = {item' + position + ':"' + pageHeight + '"}';
        eval(str);
        var layoutCtrl = ctrl.OtherControl("LifeCyclePluginSettingVLayout");
        layoutCtrl.ResetPanelSize(size);
    }
    if (!WebDesignerWorkflowInfo.Template.PluginList) {
        WebDesignerWorkflowInfo.Template.PluginList = [];
    }
    //加载到流程模板上,用于删除时，删除时需要重新加载页面，内容要从流程模板上取
    WebDesignerWorkflowInfo.Template.PluginList.push(plugin);

}

//生命周期插件OnGetData
InforCenter_Platform_LifeCyclePluginSetting_OnGetData = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    if (!pagePara || !pagePara.PageInfo) {
        return;
    }
    //清除插件列表，在每个子页OnGetData事件中添加
    WebDesignerWorkflowInfo.Template.PluginList = [];
    for (var i = 0; i < pagePara.PageInfo.length; i++) {
        //获取各个插件页的pid
        var containerid = "PageContainer_" + pagePara.PageInfo[i].Position;
        var childpage = HoteamUI.Page.InstanceIn(page.pid, containerid, "LifeCyclePluginContent");
        HoteamUI.Page.FirePageEvent(childpage.pid, "OnGetData");
    }
}

InforCenter_Platform_LifeCyclePluginSetting_OnCheck = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    if (!pagePara || !pagePara.PageInfo) {
        return;
    }
    var checkSuccess = true;
    for (var i = 0; i < pagePara.PageInfo.length; i++) {
        //获取各个插件页的pid
        var containerid = "PageContainer_" + pagePara.PageInfo[i].Position;
        var childpage = HoteamUI.Page.InstanceIn(page.pid, containerid, "LifeCyclePluginContent");
        var ret = HoteamUI.Page.FirePageEvent(childpage.pid, "OnCheck");
        if (ret == false) {
            checkSuccess = false;
            break;
        }
    }
    return checkSuccess;
}
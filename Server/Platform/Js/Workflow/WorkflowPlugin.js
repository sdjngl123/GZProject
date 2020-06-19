InforCenter_Platform_WorkflowPlugin_OnCreate = function (pageEvent) {
    var para = pageEvent.o.GetPara();
    var info;
    var top = pageEvent.o.GetControl("TopContainer");
    if (para.info == undefined || para.info.length == 0) {
        var paras = { Template: para.Template, NodeID: para.NodeID };
        info = HoteamUI.DataService.Call("InforCenter.Common.WorkflowService.GetFlowPagePluginInfo", { para: paras });
    } else {
        info = para.info;
    }
    if (info == null || info.length == 0) {
        return;
    }
    var pageHeight = 0;
    var strtemp = [];
    if (info && info.length > 0) {
        for (var i = 0; i < info.length; i++) {
            var data = info[i].value;
            var tmpPara = JSON.parse(data);
            var name = tmpPara.PageName;
            paras = $.extend(true, {}, tmpPara, para);
            var cid = "Container" + (i + 1);
            var container = pageEvent.o.GetControl(cid);

            var pageconfig = HoteamUI.UIManager.GetPageConfig(name);
            var str;
            var height;
            var parentPageID = HoteamUI.Page.ParentPage(pageEvent.o.pid);
            var parentParent = HoteamUI.Page.Instance(parentPageID);
            var tabs = parentParent.GetControl("Tabs");
            if (tabs && tabs.ControlType() == "VerticalTabs") {
                //纵向Tab页不设置高度
            } else {
                if (HoteamUI.Common.IsNullOrEmpty(pageconfig.PageOptions) == false && HoteamUI.Common.IsNullOrEmpty(pageconfig.PageOptions.height) == false) {
                    str = '"item' + (i + 1) + '":"' + pageconfig.PageOptions.height + '"';
                    height = parseInt(pageconfig.PageOptions.height);
                }
                else {
                    str = '"item' + (i + 1) + '":"200"';
                    height = 200;
                }
            }
            
            container.LoadPage(name, paras);
            //如果内部页面重新设置了高度，需要将container重设高度
            var innerPage = HoteamUI.Page.InstanceIn(pageEvent.o.pid, cid, name);
            var innerPagePara = innerPage.GetPara();
            if (innerPagePara && innerPagePara.ResizePageHeight) {
                str = '"item' + (i + 1) + '":"' + innerPagePara.ResizePageHeight + '"';
                height = innerPagePara.ResizePageHeight;
            }
            pageHeight += height;
            strtemp.push(str);
        }
        var resizeStr = strtemp.join(',');
        if (resizeStr) {
            top.ResetPanelSize(JSON.parse("{" + resizeStr + "}"));
        }

    }
    //2013-04-10 刘强 添加设置流程插件页面高度
    para.height = pageHeight;
    HoteamUI.Page.SetContainerParas(pageEvent.o.pid, "WorkflowPlugin", para);

}

InforCenter_Platform_WorkflowPlugin_OnPluginSave = function (para) {
    var paras = { Template: para.Template, NodeID: para.NodeID };
    var info = HoteamUI.DataService.Call("InforCenter.Common.WorkflowService.GetFlowPagePluginInfo", { para: paras });
    if (info == null)
        return;
    var result = null;
    for (var i in info) {
        var data = info[i];
        var tmpPara = JSON.parse(data);
        var name = tmpPara.PageName;
        var page = HoteamUI.Page.InstanceByName(name);
        var result = HoteamUI.Page.FirePageEvent(page.pid, 'OnPluginSave', para);
        if (result === false) {
            return false;
        }
    }
}
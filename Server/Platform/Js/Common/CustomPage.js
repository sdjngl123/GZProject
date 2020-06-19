//平台公共-根据模型数据获取新建、view、copy等页面pageconfig
InforCenter_Platform_CustomPage_CreatePageByModel = function (CurPage, PaterCtrlName, Model, PageType, retData, ctrlName) {

    var curPara = CurPage.GetPara();
    //组织返回数据信息
    var pageConfigStr = HoteamUI.DataService.Call("InforCenter.Common.CustomPageService.getCustomPageConfig", {
        para: {
            Model: Model,
        }
    });
    if (HoteamUI.Common.IsNullOrEmpty(pageConfigStr))
        return;
    for (var rowindex in retData) {
        var data = retData[rowindex];
        //if (PageType.toUpperCase() = "CREATE") {
        pageConfigStr = pageConfigStr.replace("CUSTOMOBJECT-" + PageType.toUpperCase() + "." + data[ctrlName] + "Header", data.ENAME);

        var column_RegEx_dicstr = HoteamUI.Language.Lang("Validation." + data.DATATYPE)
        //如果必填设置必填规则
        if (data["ISREQUIRE"]) {
            column_RegEx_dicstr += "；" + HoteamUI.Language.Lang("Validation.NotEmpty")
        }
        pageConfigStr = pageConfigStr.replace("CUSTOMOBJECT-" + PageType.toUpperCase() + "." + data[ctrlName] + "Regex", column_RegEx_dicstr);
        //}
    }
    var page = HoteamUI.CallAjax.Call(HoteamUI.BaseServicePath, "GetCustomPageConfig", { para: { PageConfigStr: pageConfigStr } });
    //循环替换多语言标签

    if (page != null) {
        //this.PageConfigs.push(page);
        HoteamUI.Trace.Write("debug", "HoteamUI.UIManager.GetPageConfig FromServer OK!", { PageName: page.Name });
        //var pageHandlerScript = HoteamUI.CallAjax.Call(HoteamUI.BaseServicePath, "GetPageHandlesScript", { para: { PageName: page.Name } });
        var pageHandlerScript = page.PageHandlesScript;
        var oHead = document.getElementsByTagName('HEAD').item(0);
        var oScript = document.createElement("script");
        oScript.type = "text/javascript";
        oScript.text = pageHandlerScript;
        oHead.appendChild(oScript);
    }
    else {
        HoteamUI.Trace.Write("error", "HoteamUI.UIManager.GetPageConfig FromServer Failed!", { PageName: page.Name });
        return null;
    }
    function SetPageOption() {
        if (typeof page.PageOptions === "object")
            return;
        var PageOptions = {};
        HoteamUI.Common.ConverSettings(page.Settings, PageOptions, PageOptions);
        page.PageOptions = PageOptions;

        var PageControls = page.PageControls;
        //for (var pageControl in PageControls) {
        for (var i = 0; i < PageControls.length; i++) {
            var control = PageControls[i];
            var CtrlOptions = {};
            HoteamUI.Common.ConverSettings(control.Settings, CtrlOptions, CtrlOptions);
            control.CtrlOptions = CtrlOptions;
        }
    }
    SetPageOption();
    //是否自定义页面
    page.IsCustomPage = "true";
    var paterCtrl = CurPage.GetControl(PaterCtrlName)
    HoteamUI.Page.CreatePageControl(paterCtrl.id, page);
    curPara.PageConfig = page;
    HoteamUI.Page.SetContainerParas(CurPage.pid, curPara);

}

//根据pageconfigStr创建动态页面
InforCenter_Platform_CustomPage_CreatePageByPageConfigStr = function (CurPage, PaterCtrlName, PageConfigStr) {

    var curPara = CurPage.GetPara();
    var page = HoteamUI.CallAjax.Call(HoteamUI.BaseServicePath, "GetCustomPageConfig", { para: { PageConfigStr: PageConfigStr } });
    if (page != null) {
        //this.PageConfigs.push(page);
        HoteamUI.Trace.Write("debug", "HoteamUI.UIManager.GetPageConfig FromServer OK!", { PageName: page.Name });
        //var pageHandlerScript = HoteamUI.CallAjax.Call(HoteamUI.BaseServicePath, "GetPageHandlesScript", { para: { PageName: page.Name } });
        var pageHandlerScript = page.PageHandlesScript;
        var oHead = document.getElementsByTagName('HEAD').item(0);
        var oScript = document.createElement("script");
        oScript.type = "text/javascript";
        oScript.text = pageHandlerScript;
        oHead.appendChild(oScript);
    }
    else {
        HoteamUI.Trace.Write("error", "HoteamUI.UIManager.GetPageConfig FromServer Failed!", { PageName: page.Name });
        return null;
    }
    function SetPageOption() {
        if (typeof page.PageOptions === "object")
            return;
        var PageOptions = {};
        HoteamUI.Common.ConverSettings(page.Settings, PageOptions, PageOptions);
        page.PageOptions = PageOptions;

        var PageControls = page.PageControls;
        //for (var pageControl in PageControls) {
        for (var i = 0; i < PageControls.length; i++) {
            var control = PageControls[i];
            var CtrlOptions = {};
            HoteamUI.Common.ConverSettings(control.Settings, CtrlOptions, CtrlOptions);
            control.CtrlOptions = CtrlOptions;
        }
    }
    SetPageOption();
    //是否自定义页面
    page.IsCustomPage = "true";
    var paterCtrl = CurPage.GetControl(PaterCtrlName)
    HoteamUI.Page.CreatePageControl(paterCtrl.id, page);
    curPara.PageConfig = page;
    HoteamUI.Page.SetContainerParas(CurPage.pid, curPara);
}


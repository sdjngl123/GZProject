//流程新建初始化
InforCenter_Platform_WorkflowTemplateSaveAs_OK = function (execPara) {
    var pagePara = execPara[1];
    var isSave = false;
    //保存流程模板
    var templateID = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateService.WorkflowTemplateListSaveAs", { para: { TemplateName: pagePara.TemplateName, TemplateDisplayName: pagePara.TemplateDisplayName, TemplateType: pagePara.TemplateType, ClassifyID: pagePara.ClassifyID } });
    if (HoteamUI.Common.IsNullOrEmpty(templateID) == false) {
        isSave = true;
        return { confirm: "OK" };
    }
    if (isSave == false) {
        var para = { pageMode: "OK", context: "WorkflowTemplateSaveAs", labelName: "Fail" }
        HoteamUI.UIManager.Popup("Confirm", para, null, {});
    }
}
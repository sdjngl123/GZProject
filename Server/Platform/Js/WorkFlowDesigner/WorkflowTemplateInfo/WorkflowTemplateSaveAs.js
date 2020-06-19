//流程新建初始化
InforCenter_Platform_WorkflowTemplateSaveAs_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var para = page.GetPara();
    //初始化类型下拉框
    var typeList = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateService.GetWorkflowTemplateType", {});
    if (typeList) {
        var typeCtrl = page.GetControl("WorkflowType_Value");
        typeCtrl.LoadItems(typeList);
        typeCtrl.SetSelectedByValue(para.TemplateType);
    }
    var classifyID = para.ClassifyID;
    var classifies = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateService.GetWorkflowTemplateClassify", {});
    var classifyCtrl = page.GetControl("WorkflowClassify_Value");
    classifyCtrl.LoadItems(classifies);

    if (classifyID) {
        classifyCtrl.SetSelectedByValue(classifyID);
    }
    var nameCtrl = page.GetControl("Name_Value").SetText(para.TemplateDisplayName);

}
//流程模板新建确定按钮
InforCenter_Platform_WorkflowTemplateSaveAs_OnOK = function (ctrlEvent) {
    var ctrl = ctrlEvent.o;
    if (ctrl.OtherControl("Name_Value").Check() == false) {
        return;
    }
    var name = ctrl.OtherControl("Name_Value").GetText()
    if (HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateService.CheckTemplateNameExist", { para: { TemplateName: name, IsNewObject: true } }) == true) {
        HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("WorkflowTemplateSaveAs.NameExit"));
        return;
    }
    var returnValue = {};
    returnValue.TemplateDisplayName = name;
    returnValue.TemplateType = ctrl.OtherControl("WorkflowType_Value").GetSelectedValue();
    returnValue.ClassifyID = ctrl.OtherControl("WorkflowClassify_Value").GetSelectedValue();

    HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), new Array(returnValue));
}
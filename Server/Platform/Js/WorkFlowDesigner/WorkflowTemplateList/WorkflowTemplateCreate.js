//流程新建初始化
InforCenter_Platform_WorkflowTemplateCreate_Init = function (pageEvent) {
    var para = pageEvent.o.GetPara();
    var ctrl = pageEvent.o.GetControl('Info_Container');
    var pagename = para.ObjectType + "-CREATE";
    ctrl.LoadPage(pagename, para);
}
//流程模板新建确定按钮
InforCenter_Platform_WorkflowTemplateCreate_OnOK = function (ctrlEvent) {

    var ctrl = ctrlEvent.o.OtherControl('Info_Container');
    var data = InforCenter_Platform_Object_GetDataFromPage(ctrl.id);
    if (data != null) {
        var returnValue = {};
        for (var item in data)
        {
            if (!data.hasOwnProperty(item)) {
                continue;
            }
            returnValue[item] = data[item];
        }
        if (HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateService.CheckTemplateNameExist", { para: { TemplateName: returnValue.ENAME, IsNewObject: true } }) == true) {
            HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("WorkflowTemplateSaveAs.NameExit"));
            return;
        }
        //returnValue.Data = data;
        HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), new Array(returnValue));
    }
}

InforCenter_Platform_WorkflowTemplate_SetWorkflowTemplateType = function (o, infoName, objType, fillEmpty) {
    var typeList = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateService.GetWorkflowTemplateType", {});
    if (typeList) {
        o.LoadItems(typeList);
    }
}
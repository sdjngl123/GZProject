InforCenter_Platform_WorkflowTemplateSavePrompt_OnCreate = function (pageEvent) {
    var para = pageEvent.o.GetPara();
    var ctrlObject = pageEvent.o.GetControl("SavePrompt_Btn");
    var pid = null;
    if (HoteamUI.Common.IsNullOrEmpty(ctrlObject) == false) {
        pid = ctrlObject.id;
    }
    if (HoteamUI.Common.IsNullOrEmpty(para) == false) {
        HoteamUI.Page.SetContainerParas(pid, "WorkflowTemplateSavePrompt", para);
    }
}


InforCenter_Platform_WorkflowTemplateSavePrompt_OK = function (ctrlEvent) {
    var ret = { confirm: "OK" };
    var pid = ctrlEvent.o.ContainerID();
    HoteamUI.UIManager.Return(pid, ret);
}
InforCenter_Platform_WorkflowTemplateSavePrompt_SaveAs = function (ctrlEvent) {
    var ctrlObject = ctrlEvent.o.OtherControl("SavePrompt_Btn");
    var pagePara = null;
    if (HoteamUI.Common.IsNullOrEmpty(ctrlObject) == false) {
        pagePara = HoteamUI.Page.GetContainerPara(ctrlObject.id);
    }
    var callback = function (data, ret) {
        if (HoteamUI.Common.IsNullOrEmpty(ret) == false) {
            var rett = { confirm: "SaveAs", TemplateDisplayName: ret[0].TemplateDisplayName, TemplateType: ret[0].TemplateType, ClassifyID: ret[0].ClassifyID };
            var pid = ctrlEvent.o.ContainerID();
            HoteamUI.UIManager.Return(pid, rett);
        }
    }
    HoteamUI.UIManager.Popup("WorkflowTemplateSaveAs", pagePara, callback, null);
}

InforCenter_Platform_WorkflowTemplateSavePrompt_Emend = function (ctrlEvent) {
    var ret = { confirm: "Emend" };
    var pid = ctrlEvent.o.ContainerID();
    HoteamUI.UIManager.Return(pid, ret);
}

InforCenter_Platform_WorkflowTemplateSavePrompt_Cancel = function (ctrlEvent) {
    var ret = { confirm: "Cancel" };
    var pid = ctrlEvent.o.ContainerID();
    HoteamUI.UIManager.Return(pid, ret);
}

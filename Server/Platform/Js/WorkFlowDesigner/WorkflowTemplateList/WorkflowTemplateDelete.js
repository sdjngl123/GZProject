InforCenter_Platform_WorkflowTemplateDelete_OnCreate = function (pageEvent) {
    var para = pageEvent.o.GetPara();
    var result = false;

    para.IsPrompt = false;
    var paras = {
        para: para
    }
    var text = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateService.DeleteWorkflowTemplateValidate", paras);
    if (text != "") {
        $("#WorkflowTemplateDeleteContent").html(text);
    }
    var ctrlObject = pageEvent.o.GetControl("DeleteObject_Btn");
    var pid = null;
    if (HoteamUI.Common.IsNullOrEmpty(ctrlObject) == false) {
        pid = ctrlObject.id;
    }
    if (HoteamUI.Common.IsNullOrEmpty(para) == false) {
        HoteamUI.Page.SetContainerParas(pid, "WorkflowTemplateDelete", para);
    }
}


InforCenter_Platform_WorkflowTemplateDelete_DeleteObject = function (ctrlEvent) {
    var ctrlObject = ctrlEvent.o.OtherControl("DeleteObject_Btn");
    var pagePara = null;
    if (HoteamUI.Common.IsNullOrEmpty(ctrlObject) == false) {
        pagePara = HoteamUI.Page.GetContainerPara(ctrlObject.id);
    }
    var para = {
        para: pagePara
    }
    if (HoteamUI.Common.IsNullOrEmpty(para) == false) {
        var result = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateService.DeleteWorkflowTemplate", para);
        if (result == true) {
            var ret = { confirm: "OK" };
            var pid = ctrlEvent.o.ContainerID();
            HoteamUI.UIManager.Return(pid, ret);
        } else {
            var callback = function (data, ret) {
                var ret = { confirm: "null" };
                var pid = ctrlEvent.o.ContainerID();
                HoteamUI.UIManager.Return(pid, ret);
            }
            var para = { pageMode: "OK", context: "DeleteObject", labelName: "Fail" }
            HoteamUI.UIManager.Popup("Confirm", para, callback, {});
        }
    }
}

InforCenter_Platform_WorkflowTemplateDelete_Cancel = function (ctrlEvent) {
    var ret = { confirm: "Cancel" };
    var pid = ctrlEvent.o.ContainerID();
    HoteamUI.UIManager.Return(pid, ret);
}

InforCenter_Platform_WorkflowTemplateDelete_ValidateUsing = function (para) {
    var paras = {};
    paras.TemplateName = para[1].TemplateName;
    if (HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateService.DeleteWorkflowTemplateValidateUsing", { para: paras }) === true) {
        InforCenter_Platform_MenuCtrl_InnerReceiveServerData(para[0], { confirm: "OK" });
    }
}

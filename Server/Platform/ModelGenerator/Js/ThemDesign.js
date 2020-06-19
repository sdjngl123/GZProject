InforCenter_Platform_FormThemDesign_BeforeClose = function (pageEvent) {

}

InforCenter_Platform_FormThemDesign_GetData = function (ctrlEvent) {
    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    var pagePara = page.GetPara();
    //查询表单设计数据，获取该对象之前的设计数据
    var designData = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GetObjectTypeGeneratorData", {
        para: {
            ObjectID: pagePara.ThemID,
            ServiceUri: "InforCenter.Platform.ModelGeneratorService.GetFormThemData"
        }
    });
    var result = JSON.parse(designData);
    return result;
}


InforCenter_Platform_FormThemDesign_Save = function (ctrlEvent) {
    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    var pagePara = page.GetPara();
    if (!HoteamUI.Common.IsNullOrEmpty(pagePara.ThemID)) {
        var formbuilderData = ctrlEvent.o.OtherControl("FormBuilderCtrl").GetDesignData();
        var designControlData = JSON.stringify(formbuilderData.DesignControlData);
        formbuilderData.DesignControlData = designControlData;
        formbuilderData.PermissionData = JSON.stringify(formbuilderData.PermissionData);
        formbuilderData.FlowTaskPermissionData = JSON.stringify(formbuilderData.FlowTaskPermissionData);
        formbuilderData = JSON.stringify(formbuilderData);
        var result = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "SaveFormBuilderDesignData", {
            para: {
                ObjectID: pagePara.ThemID, Data: formbuilderData,
                ServiceUri: "InforCenter.Platform.ModelGeneratorService.SaveFormThemData"
            }
        });
        if (result) {
            formbuilderSaveState = true;
            var message = HoteamUI.Language.Lang("ModelGenerator.SaveSuccess");
            HoteamUI.UIManager.MsgBox(message);
            HoteamUI.UIManager.Return(page.pid, { confirm: "OK" });
        }
    } else {
        var callback = function (data, ret) {
            if (!HoteamUI.Common.IsNullOrEmpty(ret)) {
                var page = data.page;
                var pagePara = page.GetPara();
                var formbuilderData = ctrlEvent.o.OtherControl("FormBuilderCtrl").GetDesignData();
                var designControlData = JSON.stringify(formbuilderData.DesignControlData);
                formbuilderData.DesignControlData = designControlData;
                formbuilderData.PermissionData = JSON.stringify(formbuilderData.PermissionData);
                formbuilderData.FlowTaskPermissionData = JSON.stringify(formbuilderData.FlowTaskPermissionData);
                formbuilderData = JSON.stringify(formbuilderData);
                var result = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "SaveFormBuilderDesignData", {
                    para: {
                        ObjType: ret.Name,
                        ObjectID: pagePara.ThemID, Data: formbuilderData,
                        ServiceUri: "InforCenter.Platform.ModelGeneratorService.SaveFormThemData"
                    }
                });
                if (result) {
                    formbuilderSaveState = true;
                    var message = HoteamUI.Language.Lang("ModelGenerator.SaveSuccess");
                    HoteamUI.UIManager.MsgBox(message);
                    HoteamUI.UIManager.Return(page.pid, { confirm: "OK" });
                }
            }
        }
        HoteamUI.UIManager.Popup("SetTheamName", {}, callback, { page: page }, "400*120");
    }
}


InforCenter_Platform_FormThemDesign_Import = function (para) {
    PlatformUI.UIManager.ImportFile.Call("InforCenter.Platform.ModelGeneratorService.ImportThem", {}, { filetype: "Excel" }, function () {
        InforCenter_Platform_MenuCtrl_InnerReceiveServerData(para[0], { confirm: "OK" });
    });
}


InforCenter_Platform_EditObject_OnExport = function (ctrlEvent) {
    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    var pagePara = page.GetPara();
    var container = page.GetControl('Btn_Container');
    var para = HoteamUI.Page.GetContainerPara(container.id);
    var infoPage = HoteamUI.Page.InstanceIn(page.pid, "Info_Container", para.pagename);
    var formbuilder = infoPage.GetControl("FormBuilderCtrl");
    var exportData = formbuilder.GetExportData();
    for (var i = 0; i < exportData.controls.length; i++) {
        var curPageControls = exportData.controls[i];
        for (var j = 0; j < curPageControls.length; j++) {
            var curCtrl = curPageControls[j];
            if (typeof (curCtrl.value) === "object") {
                if (curCtrl.value == null) {
                    curCtrl.value = { value: null, text: "" };
                }
                curCtrl.value = curCtrl.value.text;
            }
        }
    }

    var formData = JSON.stringify([exportData]);
    var wcf = "InforCenter.Platform.ModelGeneratorService.ExportFromFormData";
    //PlatformUI.UIManager.ExportFile.Call(wcf, { Data: formData }, { filetype: "Excel" }, function () { });
    PlatformUI.UIManager.ExportPdfFile.Call(wcf, { Data: formData }, { filetype: "Excel" }, function () { });

}

InforCenter_Platform_SetTheamName_OnOK = function (ctrlEvent) {
    var nameCtrl = ctrlEvent.o.OtherControl('ENAME_Value');
    var text = nameCtrl.GetText();
    if (HoteamUI.Common.IsNullOrEmpty(text)) {
        var message = HoteamUI.Language.Lang("ModelGenerator.DataCannotEmpty");
        HoteamUI.UIManager.MsgBox(message);
        return "";
    }
    HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), { Name: text });
}
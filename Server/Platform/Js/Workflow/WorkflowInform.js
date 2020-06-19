InforCenter_InforCenter_StartWorkflow_WorkflowInformInit = function (currentPage, prePage, allPage) {
    var baseWorkflowInforPage = null;
    if (allPage.length > 0) {
        for (var i = 0; i < allPage.length; i++) {
            if (allPage[i].PageName() == "StartWorkflow") {
                baseWorkflowInforPage = allPage[i];
                break;
            }
        }
    }
    if (HoteamUI.Common.IsNullOrEmpty(baseWorkflowInforPage) == false) {
        var tempCtrl = baseWorkflowInforPage.GetControl("Template_Value");
        var paras = { Template: tempCtrl.GetSelectedValue() };
        var data = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowService.GetWorkflowTemplateExtendProperty", { para: paras });
        if (data) {
            data = $.parseJSON(data);
            var extendData = {};
            extendData.Rows = data.InfromDtata;
            extendData.RowSettings = [];
            currentPage.GetControl("InformEditGrid").LoadGridRows(extendData);
        }
    }
}

InforCenter_WorkFlow_WorkflowInform_OnLoad = function (pageEvent) {
    var page = pageEvent.o;
    var para = page.GetPara();
    if (para && HoteamUI.Common.IsNullOrEmpty(para.ViewWorkflowID) == false) {
        var containerCtrl = page.GetControl("TopContainer");
        containerCtrl.HiddenPanel(["item2"]);
        var data = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowService.GetWorkflowInform", { para: { FlowID: para.ViewWorkflowID } });
        if (data) {
            page.GetControl("InformEditGrid").LoadGridRows(data);
        }
    }
}

InforCenter_InforCenter_StartWorkflow_OnWorkflowExtendSettingCheck = function (pages, page) {
    return InforCenter_Workflow_WorkflowExtendSetting_CheckData(page);
};


InforCenter_Workflow_WorkflowExtendSetting_CheckData = function (page) {
    var editGrid = page.GetControl("InformEditGrid");
    var data = editGrid.SaveGridRows();
    var actorsList = new Array();
    for (var i = 0; i < data.rowsObject.length; i++) {
        var actor = {};
        if (!data.rowsObject[i].Result.value) {
            editGrid.UnSelectAll();
            editGrid.SetSelectedRow(i + 1);
            var msg = HoteamUI.Language.Lang("Workflow.NoneResult");
            HoteamUI.UIManager.Popup("Confirm", { pageMode: "OK", message: msg });
            return false;
        }
        actor.Actors = data.rowsObject[i].Result.value;
        actor.Name = data.rowsObject[i].UserType.value;
        var exist = false;
        for (var j = 0; j < actorsList.length; j++) {
            var row = actorsList[j];
            if (row.Actors == actor.Actors && row.Name == actor.Name) {
                exist = true;
                editGrid.UnSelectAll();
                editGrid.SetSelectedRow(i + 1);
                var msg = HoteamUI.Language.Lang("Workflow.ResultSame");
                HoteamUI.UIManager.Popup("Confirm", { pageMode: "OK", message: msg });
                return false;
            }
        }
        if (exist == false) {
            actorsList.push(actor);
        }
    }
    return true;
}

InforCenter_WorkFlow_WorkflowInform_MenuClick = function (ctrlEvent) {

    var gridCtrl = ctrlEvent.o.OtherControl("InformEditGrid");
    var selectRow = gridCtrl.GetSelectedRows();

    switch (ctrlEvent.value) {
        case "Add":
            gridCtrl.AddGridRow("last", false);
            break;
        case "Delete":
            if (selectRow && selectRow.length > 0) {
                gridCtrl.DeleteGridRow();
                gridCtrl.UnSelectAll();
            }
            else {
                var detail = HoteamUI.Language.Lang("Platform.EmptySelectionException");
                var title = HoteamUI.Language.Lang("Platform.Prompt");
                HoteamUI.UIManager.Popup({ pagename: "Confirm", paras: { pageMode: "OK", message: detail }, title: title });

            }
            break;
    }
}
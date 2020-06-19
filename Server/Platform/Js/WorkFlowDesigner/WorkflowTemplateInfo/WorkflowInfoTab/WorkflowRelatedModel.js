//相关模型页OnCreate
InforCenter_Platform_WorkflowRelatedModel_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var para = page.GetPara();
    var editGrid = page.GetControl("WorkflowRelatedModelEditGrid");
    //获取列信息
    var data = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateService.GerEditGridForRelateModel", {});
    editGrid.LoadColTitle(data);


    var relateModel = para.RelatedModel;
    if (HoteamUI.Common.IsNullOrEmpty(relateModel)) {
        return;
    }
    var ret = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateService.GetEditGridDataForRelateModel", { para: { RelateModel: relateModel } });
    if (ret) {
        editGrid.LoadGridRows(ret);
    }
}

//新建
InforCenter_Platform_WorkflowRelatedModel_CreateMenu = function (ctrlEvent) {
    var editGrid = ctrlEvent.o.OtherControl("WorkflowRelatedModelEditGrid");
    editGrid.AddGridRow();
}
//删除
InforCenter_Platform_WorkflowRelatedModel_DeleteMenu = function (ctrlEvent) {
    var editGrid = ctrlEvent.o.OtherControl("WorkflowRelatedModelEditGrid");
    if (InforCenter_Platform_Workflow_GridCheck(editGrid, true)) {
        editGrid.DeleteGridRow();
    }
}
//上移
InforCenter_Platform_WorkflowRelatedModel_MoveUpMenu = function (ctrlEvent) {
    var editGrid = ctrlEvent.o.OtherControl("WorkflowRelatedModelEditGrid");
    if (InforCenter_Platform_Workflow_GridCheck(editGrid)) {
        var selectRowsNumber = editGrid.GetSelectedRows()[0].row_number;
        if (selectRowsNumber == 1) {
            HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("Platform.AlreadyMoveToTop"));
            return;
        }
        editGrid.MoveGridRow("before");
    }
}
//下移
InforCenter_Platform_WorkflowRelatedModel_moveDownMenu = function (ctrlEvent) {
    var editGrid = ctrlEvent.o.OtherControl("WorkflowRelatedModelEditGrid");
    if (InforCenter_Platform_Workflow_GridCheck(editGrid)) {
        var totalRowsCount = editGrid.GetRowsCount();
        var selectRowsNumber = editGrid.GetSelectedRows()[0].row_number;
        if (selectRowsNumber >= totalRowsCount) {
            HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("Platform.AlreadyMoveToBottom"));
            return;
        }
        editGrid.MoveGridRow("after");
    }
}

//相关模型页确定
InforCenter_Platform_WorkflowRelatedModel_OnOK = function (ctrlEvent) {
    var editGrid = ctrlEvent.o.OtherControl("WorkflowRelatedModelEditGrid");
    var data = editGrid.SaveGridRows();
    var value = "";
    var text = "";
    if (!data.rowsObject || data.rowsObject.length <= 0) {
        var msg = HoteamUI.Language.Lang("WorkflowRelatedModel.None");
        HoteamUI.UIManager.Popup("Confirm", { pageMode: "OK", message: msg });
        return;
    }
    var modelList = [];
    if (data && data.rowsObject && data.success == true) {
        for (var i = 0; i < data.rowsObject.length; i++) {
            var modelName = data.rowsObject[i].ModelCol.value;
            for (var j = 0; j < modelList.length; j++) {
                var exist = modelList[j];
                if (exist == modelName) {
                    editGrid.UnSelectAll();
                    editGrid.SetSelectedRow(i + 1);
                    var msg = HoteamUI.Language.Lang("WorkflowRelatedModel.ResultSame");
                    HoteamUI.UIManager.Popup("Confirm", { pageMode: "OK", message: msg });
                    return;
                }
            }
            modelList.push(modelName);
            var valueitem = modelName;
            var textItem = HoteamUI.Language.Lang(modelName + "Model", modelName + "Header");
            for (var j in data.rowsObject[i]) {
                if (j == "row_number")
                    continue;
                if (data.rowsObject[i][j] === "1" || data.rowsObject[i][j] === 1) {
                    valueitem += ":" + j;
                    textItem += ":" + HoteamUI.Language.Lang("LifeCircleState", j + "Header");
                }
            }
            value += valueitem + ";";
            text += textItem + ";";
        }
    }
    HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), { ReturnValue: value, ReturnText: text, Success: true });
}
InforCenter_Platform_SelectedTaskObjectPermission_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var para = page.GetPara();
    var editGrid = page.GetControl("SelectedTaskObjectPermissionEditGrid");
    //获取列信息
    var titledata = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateService.GerEditGridTitleForObjectPermission", {});
    editGrid.LoadColTitle(titledata);

    var objpermission = para.ObjectPermission;
    if (!objpermission) {
        return;
    }

    var data = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateService.GerEditGridDataForObjectPermission", { para: { ObjectPermission: objpermission } });
    if (data) {
        editGrid.LoadGridRows(data);
    }
}

InforCenter_Platform_SelectedTaskObjectPermission_OnOK = function (ctrlEvent) {
    var editGrid = ctrlEvent.o.OtherControl("SelectedTaskObjectPermissionEditGrid");
    var data = editGrid.SaveGridRows();

    if (data && data.success == true) {
        var ret = {};
        var value = "";
        var text = "";
        var modelArray = [];
        for (var i = 0; i < data.rowsObject.length ; i++) {
            var row = data.rowsObject[i];
            var modelName = row.ModelCol.value;
            for (var m = 0; m < modelArray.length; m++) {
                var mo = modelArray[m];
                if (mo == modelName)
                {
                    editGrid.UnSelectAll()
                    editGrid.SetSelectedRow(i + 1);
                    var msg = HoteamUI.Language.Lang("SelectedTaskObjectPermission.SameModel");
                    HoteamUI.UIManager.Popup("Confirm", { pageMode: "OK", message: msg });
                    return;
                }
            }
            modelArray.push(modelName);
            //var valueitem = modelName;
            var modelText = HoteamUI.Language.Lang(modelName + "Model", modelName + "Header");
            var arrayText = [];
            var arrayValue = [];
            var allowText = "";
            var allowValue = "";
            var denyText = "";
            var denyValue = "";
            for (var j in row) {
                if (row[j] === "1") {
                    allowValue += ":" + j;
                    var lang = HoteamUI.Language.Lang("Actions", j);
                    if (!lang)
                        lang = j;
                    allowText += ":" + lang;
                } else if (row[j] === "0") {
                    denyValue += ":" + j;
                    var lang = HoteamUI.Language.Lang("Actions", j);
                    if (!lang)
                        lang = j;
                    denyText += ":" + lang;
                }
            }
            if (allowValue && allowText) {
                allowText = "{" + HoteamUI.Language.Lang("SelectedTaskObjectPermission.Allow") + allowText + "}";
                allowValue = "\"Allow\":\"" + allowValue + "\"";
                arrayText.push(allowText);
                arrayValue.push(allowValue);
            }
            if (denyValue && denyText) {
                denyText = "{" + HoteamUI.Language.Lang("SelectedTaskObjectPermission.Deny") + denyText + "}";
                denyValue = "\"Deny\":\"" + denyValue + "\"";
                arrayText.push(denyText);
                arrayValue.push(denyValue);
            }
            if (arrayText.length > 0 && arrayValue.length > 0) {
                modelText = modelText + ":" + arrayText.join(',');
                modelName = "\"ModelName\":" + "\"" + modelName + "\"," + arrayValue.join(',');
                value += "{" + modelName + "}" + ";";
                text += modelText + ";";
            }

        }
        ret.ReturnValue = value;
        ret.ReturnText = text;
        ret.Success = true;
        HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), ret);
    }
}
InforCenter_Platform_SelectedTaskObjectPermission_CreateMenu = function (ctrlEvent) {
    var editGrid = ctrlEvent.o.OtherControl("SelectedTaskObjectPermissionEditGrid");
    editGrid.AddGridRow("last");
}
InforCenter_Platform_SelectedTaskObjectPermission_DeleteMenu = function (ctrlEvent) {
    var editGrid = ctrlEvent.o.OtherControl("SelectedTaskObjectPermissionEditGrid");
    editGrid.DeleteGridRow();
}
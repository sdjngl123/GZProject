//流程参数设置OnCreate
InforCenter_Platform_WorkflowParameterSetting_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    //保存上一个页面的数据
    InforCenter_Platform_WorkflowTemplateEdit_SavePreviousPageData(page);

    var template = WebDesignerWorkflowInfo.Template;
    var editGrid = page.GetControl("WorkflowParameterSettingEditGrid");
    var rows = new Array();
    for (var i = 0; i < template.ParameterList.length;i++) {
        //组装EditGrid数据
        var cols = new Array();
        var row = template.ParameterList[i];

        var nameCol = {};
        nameCol.ColName = "ParaName";
        nameCol.ColText = row.Name;
        cols.push(nameCol);

        var valueCol = {};
        valueCol.ColName = "ParaValue";
        valueCol.ColText = row.Value.toString();
        cols.push(valueCol);
        rows.push(cols);
    }
    var data = {};
    data.Rows = rows;
    editGrid.LoadGridRows(data);
}

//新建
InforCenter_Platform_WorkflowParameterSetting_CreateMenu = function (ctrlEvent) {
    var editGrid = ctrlEvent.o.OtherControl("WorkflowParameterSettingEditGrid");
    editGrid.AddGridRow("last",false);
}
//删除
InforCenter_Platform_WorkflowParameterSetting_DeleteMenu = function (ctrlEvent) {
    var editGrid = ctrlEvent.o.OtherControl("WorkflowParameterSettingEditGrid");
    editGrid.DeleteGridRow();
}
//上移
InforCenter_Platform_WorkflowParameterSetting_MoveUpMenu = function (ctrlEvent) {
    var editGrid = ctrlEvent.o.OtherControl("WorkflowParameterSettingEditGrid");
    editGrid.MoveGridRow("before");
}
//下移
InforCenter_Platform_WorkflowParameterSetting_moveDownMenu = function (ctrlEvent) {
    var editGrid = ctrlEvent.o.OtherControl("WorkflowParameterSettingEditGrid");
    editGrid.MoveGridRow("after");
}
//复制选中行 首先获取选中行的数据，添加一行，将数据填充到新建的选中行
InforCenter_Platform_WorkflowParameterSetting_CopyMenu = function (ctrlEvent) {
    var editGrid = ctrlEvent.o.OtherControl("WorkflowParameterSettingEditGrid");
    var data = editGrid.GetRowContent(editGrid.GetSelectedRowsID());
    if (data) {
        //新建一行
        editGrid.AddGridRow("last",false);
        var id = editGrid.GetSelectedRowsID();
        editGrid.SetCellContent(id, "ParaName", data.ParaName, "");
        editGrid.SetCellContent(id, "ParaValue", data.ParaValue, "");
    }
}

//流程参数设置onGetData
InforCenter_Platform_WorkflowParameterSetting_OnGetData = function (pageEvent) {
    var ctrl = pageEvent.o.GetControl("WorkflowParameterSettingEditGrid");
    var data = ctrl.SaveGridRows();
    var paraList = new Array();
    for (var i = 0; i < data.rowsObject.length;i++) {
        var parameter = {};
        parameter.Name = data.rowsObject[i].ParaName;
        parameter.Value = data.rowsObject[i].ParaValue;
        paraList.push(parameter);
    }
    WebDesignerWorkflowInfo.Template.ParameterList = paraList;
}

InforCenter_Platform_WorkflowParameterSetting_OnCheck = function (pageEvent) {
    var page = pageEvent.o;
    //验证页面控件
    var control = page.GetControl("WorkflowParameterSettingEditGrid");
    if (control && control.id != "") {
        return control.GetRegexStatus();
    }
}
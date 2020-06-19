//选中项评审结果OnCreate
InforCenter_Platform_AuditResultInfo_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    //保存上一个页面的数据
    InforCenter_Platform_WorkflowTemplateEdit_SavePreviousPageData(page);
    var template = WebDesignerWorkflowInfo.Template;
    var currInfo = WebDesignerWorkflowInfo.CurrSelectInfo;
    if (!currInfo || !currInfo.NodeID || !template) {
        return;
    }
    var node = currInfo;
    var editGrid = page.GetControl("AuditResultInfoEditGrid");

    var rows = new Array();
    if (node.ResultList) {
        for (var i = 0; i < node.ResultList.length; i++) {
            var cols = new Array();
            var nameCol = {};
            nameCol.ColName = "ResultName";
            nameCol.ColText = node.ResultList[i].Name;
            cols.push(nameCol);

            var ParameterNameCol = {};
            ParameterNameCol.ColName = "ParameterName";
            ParameterNameCol.ColText = node.ResultList[i].ParameterName;
            ParameterNameCol.ColValue = node.ResultList[i].ParameterName;
            cols.push(ParameterNameCol);

            var paraValueCol = {};
            paraValueCol.ColName = "ParaValue";
            paraValueCol.ColText = node.ResultList[i].ParameterValue.toString();
            cols.push(paraValueCol);

            rows.push(cols);
        }
    }
    var data = {};
    data.Rows = rows;
    editGrid.LoadGridRows(data);
}

//新建
InforCenter_Platform_AuditResultInfo_CreateMenu = function (ctrlEvent) {
    var editGrid = ctrlEvent.o.OtherControl("AuditResultInfoEditGrid");
    var data = {};
    data.ParaValue = {};
    data.ParaValue.ColName = "ParaValue";
    data.ParaValue.ColText = WebDesignerWorkflowInfo.Template.ParameterList[0].Value.toString();
    data.ParaValue.ColValue = WebDesignerWorkflowInfo.Template.ParameterList[0].Value.toString();
    editGrid.AddGridRow("last", false, data);
}
//删除
InforCenter_Platform_AuditResultInfo_DeleteMenu = function (ctrlEvent) {
    var editGrid = ctrlEvent.o.OtherControl("AuditResultInfoEditGrid");
    editGrid.DeleteGridRow();
}
//上移
InforCenter_Platform_AuditResultInfo_MoveUpMenu = function (ctrlEvent) {
    var editGrid = ctrlEvent.o.OtherControl("AuditResultInfoEditGrid");
    editGrid.MoveGridRow("before");
}
// 下移
InforCenter_Platform_AuditResultInfo_moveDownMenu = function (ctrlEvent) {
    var editGrid = ctrlEvent.o.OtherControl("AuditResultInfoEditGrid");
    editGrid.MoveGridRow("after");
}

//参数名称绑定
InforCenter_Platform_AuditResultInfo_BindingParaDropdown = function (ctrlEvent) {
    var currInfo = WebDesignerWorkflowInfo.CurrSelectInfo;
    var template = WebDesignerWorkflowInfo.Template;

    var ret = new Array();
    for (var i = 0; i < template.ParameterList.length;i++) {
        var item = { Text: template.ParameterList[i].Name, Value: template.ParameterList[i].Name };
        ret.push(item);
    }
    return ret;
}

//选中项评审结果OnGetData
InforCenter_Platform_AuditResultInfo_OnGetData = function (pageEvent) {
    if (pageEvent.currSelectInfoIsNull) {
        return;
    }
    var page = pageEvent.o;
    var editGrid = page.GetControl("AuditResultInfoEditGrid");
    var data = editGrid.SaveGridRows();

    var resultList = new Array();
    for (var i = 0; i < data.rowsObject.length;i++) {
        var result = {};
        result.Name = data.rowsObject[i].ResultName;
        result.ParameterName = data.rowsObject[i].ParameterName.value;
        result.ParameterValue = data.rowsObject[i].ParaValue;
        resultList.push(result);
    }
    WebDesignerWorkflowInfo.CurrSelectInfo.ResultList = resultList;
}
InforCenter_Platform_AuditResultInfo_OnCheck = function (pageEvent) {
    var page = pageEvent.o;
    //验证页面控件
    var control = page.GetControl("AuditResultInfoEditGrid");
    if (control && control.id != "") {
        return control.GetRegexStatus();
    }
}
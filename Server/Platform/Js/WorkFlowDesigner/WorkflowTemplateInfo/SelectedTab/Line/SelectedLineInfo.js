//选中线条件OnCreate
InforCenter_Platform_SelectedLineInfo_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    //保存上一个页面的数据
    InforCenter_Platform_WorkflowTemplateEdit_SavePreviousPageData(page);
    var template = WebDesignerWorkflowInfo.Template;
    var currInfo = WebDesignerWorkflowInfo.CurrSelectInfo;
    if (!currInfo || !currInfo.LinkID || !template) {
        return;
    }
    var link = currInfo;

    var editGrid = page.GetControl("SelectedLineInfoEditGrid");
    var allItem = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateService.GetWorkflowConditionItemList", { para: { TemplateType: WebDesignerWorkflowInfo.Template.TemplateType } });
    var rows = new Array();
    if (link.Conditions) {
        for (var i = 0; i < link.Conditions.length; i++) {
            //组装EditGrid数据
            var cols = new Array();
            var condition = link.Conditions[i];

            var leftCol = {};
            leftCol.ColName = "Left";
            leftCol.ColValue = condition.LeftParenthesis;
            leftCol.ColText = condition.LeftParenthesis;
            cols.push(leftCol);

            parameterTypeCol = {};
            parameterTypeCol.ColName = "ParameterType";
            parameterTypeCol.ColValue = condition.ConditionType;
            parameterTypeCol.ColText = HoteamUI.Language.Lang("WorkflowConditionItems", condition.ConditionType);

            cols.push(parameterTypeCol);

            conditionCol = {};
            conditionCol.ColName = "Condition";
            conditionCol.ColValue = condition.Expression;
            for (var j = 0; j < allItem.length; j++) {
                if (allItem[j].Name == condition.ConditionType) {
                    if (HoteamUI.Common.IsNullOrEmpty(allItem[j].InitDataJSMethod) == false) {
                        var initPara = {};
                        initPara.Value = condition.Expression;
                        conditionCol.ColText = HoteamUI.Common.ExeFunction(allItem[j].InitDataJSMethod, initPara);
                    }
                    else {
                        conditionCol.ColText = condition.Expression;
                    }
                    break;
                }
            }
            cols.push(conditionCol);

            var rightCol = {};
            rightCol.ColName = "Right";
            rightCol.ColValue = condition.RightParenthesis;
            rightCol.ColText = condition.RightParenthesis;
            cols.push(rightCol);

            var operatorCol = {};
            operatorCol.ColName = "Operator";
            operatorCol.ColValue = condition.Operator;
            operatorCol.ColText = condition.Operator;;
            cols.push(operatorCol);

            rows.push(cols);
        }
    }
    var data = {};
    data.Rows = rows;
    editGrid.LoadGridRows(data);

}


//新建
InforCenter_Platform_SelectedLineInfo_CreateMenu = function (ctrlEvent) {
    var editGrid = ctrlEvent.o.OtherControl("SelectedLineInfoEditGrid");
    editGrid.AddGridRow('last', false);
}
//删除
InforCenter_Platform_SelectedLineInfo_DeleteMenu = function (ctrlEvent) {
    var editGrid = ctrlEvent.o.OtherControl("SelectedLineInfoEditGrid");
    editGrid.DeleteGridRow();
}
//上移
InforCenter_Platform_SelectedLineInfo_MoveUpMenu = function (ctrlEvent) {
    var editGrid = ctrlEvent.o.OtherControl("SelectedLineInfoEditGrid");
    editGrid.MoveGridRow("before");
}
//下移
InforCenter_Platform_SelectedLineInfo_moveDownMenu = function (ctrlEvent) {
    var editGrid = ctrlEvent.o.OtherControl("SelectedLineInfoEditGrid");
    editGrid.MoveGridRow("after");
}
InforCenter_Platform_SelectedLineInfo_ValidateMenu = function (ctrlEvent) {
    var ctrl = ctrlEvent.o;
    var editGrid = ctrl.OtherControl("SelectedLineInfoEditGrid");
    var data = editGrid.SaveGridRows();

    var reulst = "CheckByConditions";
    var leftCount = 0;
    var rightCount = 0;
    var checkError = false;
    for (var i = 0; i < data.rowsObject.length; i++) {
        var con = data.rowsObject[i];
        if (HoteamUI.Common.IsNullOrEmpty(con.Left) == false) {
            if (con.Left.value.indexOf(")") >= 0) {
                reulst = "LeftParenthesisTextboxError";
                checkError = true;
                break;
            }
            var lcount = con.Left.value.match(/\(/g);
            if (lcount != null)
                leftCount += lcount.length;
        }
        if (HoteamUI.Common.IsNullOrEmpty(con.Right) == false) {
            if (con.Right.value.indexOf("(") >= 0) {
                reulst = "RightParenthesisTextboxError";
                checkError = true;
                break;
            }
            var rcount = con.Right.value.match(/\)/g);
            if (rcount != null)
                rightCount += rcount.length;
        }
        if (HoteamUI.Common.IsNullOrEmpty(con.Condition) || HoteamUI.Common.IsNullOrEmpty(con.Condition.value)) {
            reulst = "EmptyCondition";
            break;
        }
    }
    if (leftCount != rightCount && (leftCount != 0 || rightCount != 0) && checkError == false) {
        reulst = "ParenthesisNumberOfInconsistencies";
    }
    if (data.rowsObject.length == 0) {
        reulst = "NotExistConditions";
    }
    var para = { pageMode: "OK", context: "WorkflowEditForm", labelName: reulst }
    HoteamUI.UIManager.Popup("Confirm", para, null, {});
}
//可编辑列表下拉框绑定
InforCenter_Platform_SelectedLineInfo_BindingParameterDropdown = function (ctrlEvent) {
    var ret = [];
    var conditionList = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateService.GetWorkflowConditionItemList", { para: { TemplateType: WebDesignerWorkflowInfo.Template.TemplateType } });
    for (var i = 0; i < conditionList.length;i++) {
        var item = {};
        var text = HoteamUI.Language.Lang("WorkflowConditionItems", conditionList[i].Name);
        item.Text = text;
        item.Value = conditionList[i].Name;
        ret.push(item);
    }
    return ret;
}

InforCenter_Platform_SelectedLineInfo_BindingLeftDropdown = function (ctrlEvent) {
    var ret = [];
    var left = {};
    var empty = {};
    empty.Text = "";
    empty.Value = "";
    empty.Selected = true;
    ret.push(empty);
    left.Text = "(";
    left.Value = "(";
    left.Selected = false;
    ret.push(left);

    return ret;
}
InforCenter_Platform_SelectedLineInfo_BindingRightDropdown = function (ctrlEvent) {
    var ret = [];
    var right = {};    
    var empty = {};
    empty.Text = "";
    empty.Value = "";
    empty.Selected = true;

    right.Text = ")";
    right.Value = ")";
    right.Selected = true;    
    ret.push(empty);
    ret.push(right);

    return ret;
}
//可编辑列表下拉框change
InforCenter_Platform_SelectedLineInfo_ParameterDropdownChanged = function (ctrlEvent) {
    var rowIDs = ctrlEvent.o.GetEditRowID();
    if (rowIDs) {
        ctrlEvent.o.SetCellContent(rowIDs, "Condition", "", "");
    }
}
//textValue点击事件
InforCenter_Platform_SelectedLineInfo_ConditionOnClick = function (ctrlEvent) {
    var rowIDs = ctrlEvent.o.GetEditRowID();
    if (rowIDs) {
        var paraType = ctrlEvent.o.GetCellContent(rowIDs, "ParameterType");
        if (!paraType) {
            return;
        }
        var item = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateService.GetWorkflowConditionItem", { para: { Name: paraType.value } });
        if (HoteamUI.Common.IsNullOrEmpty(item.PageName) == false) {
            var callback = function (data, ret) {
                if (HoteamUI.Common.IsNullOrEmpty(ret) == false && ret.length > 0) {
                    ctrlEvent.textValue.setTextValue(ret[0].Text, ret[0].Value);
                }
            }
            HoteamUI.UIManager.Popup(item.PageName, { Value: ctrlEvent.value }, callback, null);
        } else if (HoteamUI.Common.IsNullOrEmpty(item.SetDataJSMethod) == false) {
            var setpara = {};
            setpara.Text = ctrlEvent.text;
            setpara.Value = ctrlEvent.value;
            var methodRet = HoteamUI.Common.ExeFunction(item.SetDataJSMethod, setpara);
            if (methodRet) {
                ctrlEvent.textValue.setTextValue(methodRet.Text, methodRet.Value);
            }
        }
    }

}
//绑定可编辑列表类型列下拉框
InforCenter_Platform_SelectedLineInfo_BindingOperatorDropdown = function (ctrlEvent) {
    var ret = [
        { Text: "And", Value: "And" },
        { Text: "Or", Value: "Or" }
    ];
    return ret;
}

//选中线条件OnCreate
InforCenter_Platform_SelectedLineInfo_OnGetData = function (pageEvent) {

    if (pageEvent.currSelectInfoIsNull) {
        return;
    }
    var page = pageEvent.o;
    var editGrid = page.GetControl("SelectedLineInfoEditGrid");
    var data = editGrid.SaveGridRows();

    var conditionList = new Array();
    var conditionText = "";
    for (var i = 0; i < data.rowsObject.length; i++) {
        var condition = {};
        condition.ConditionType = data.rowsObject[i].ParameterType.value;
        condition.Expression = data.rowsObject[i].Condition.value;
        if (HoteamUI.Common.IsNullOrEmpty(condition.Expression) == true)
            continue;
        condition.LeftParenthesis = data.rowsObject[i].Left.value;
        condition.Operator = data.rowsObject[i].Operator.value;
        condition.RightParenthesis = data.rowsObject[i].Right.value;
        if (i == data.rowsObject.length - 1) {
            conditionText += " " + data.rowsObject[i].Condition.text
        } else {
            conditionText += " " + data.rowsObject[i].Condition.text + " " + condition.Operator;
        }
        conditionList.push(condition);
    }
    WebDesignerWorkflowInfo.CurrSelectInfo.Conditions = conditionList;
    WebDesignerWorkflowInfo.CurrSelectInfo.ConditionText = conditionText;
}

//任务类型页面OnCreate
InforCenter_Platform_SelectedTaskType_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var para = page.GetPara();

    var resultList = WebDesignerWorkflowInfo.CurrSelectInfo.ResultList;
    if (!resultList || resultList.length <= 0) {
        return;
    }
    var ddlValue = [];
    for (var i = 0; i < resultList.length; i++) {
        var ddlItem = {};
        ddlItem.Text = resultList[i].Name;
        ddlItem.Value = resultList[i].Name;
        if (i == '0') {
            ddlItem.Selected = true;
        }
        ddlValue.push(ddlItem);
    }
    var overHalfTextValue = page.GetControl("OverHalfTextValue");
    var anyOneDropDown1 = page.GetControl("AnyOneDropDown1");
    var anyOneDropDown2 = page.GetControl("AnyOneDropDown2");
    var byAccordDropdown1 = page.GetControl("ByAccordDropdown1");
    var byAccordDropdown2 = page.GetControl("ByAccordDropdown2");
    var auditCountDropDown1 = page.GetControl("AuditCountDropDown1");
    var auditCountDropDown2 = page.GetControl("AuditCountDropDown2");
    var selectResultCtrl = page.GetControl("SelectResultDropDown");
    //overHalfDropDown.LoadItems(ddlValue);
    anyOneDropDown1.LoadItems(ddlValue);
    anyOneDropDown2.LoadItems(ddlValue);
    byAccordDropdown1.LoadItems(ddlValue);
    byAccordDropdown2.LoadItems(ddlValue);
    auditCountDropDown1.LoadItems(ddlValue);
    auditCountDropDown2.LoadItems(ddlValue);
    selectResultCtrl.LoadItems(ddlValue);
    if (!para.TaskType) {
        return;
    }
    var radioCtrl = page.GetControl("RadioList");
    var taskInfoList = para.TaskType.split(';');
    switch (taskInfoList[0]) {
        case "Simple":
            radioCtrl.SetSelectByValue("Simple");
            if (taskInfoList[1] == "true") {
                page.GetControl("AutoAduitCheckBox").SetChecked(true);
                selectResultCtrl.Enable();
                selectResultCtrl.SetSelectedByValue(taskInfoList[2]);
            }
            InforCenter_Platform_SelectedTaskType_DisableType("Simple", radioCtrl);
            break;
        case "OverHalf":
            radioCtrl.SetSelectByValue("OverHalf");
            overHalfTextValue.SetValue(taskInfoList[1]);
            var user = InforCenter_Platform_Object_GetObjectData(taskInfoList[1]);
            if (user) {
                overHalfTextValue.SetText(user.ENAME_DisplayValue);
            }
            if (taskInfoList.length > 2 && taskInfoList[2] == "AllAudit") {
                page.GetControl("OverHalfTextValue_AllAuditChk").SetChecked(true);
            }
            InforCenter_Platform_SelectedTaskType_DisableType("OverHalf", radioCtrl);
            break;
        case "AnyOne":
            radioCtrl.SetSelectByValue("AnyOne");
            anyOneDropDown1.SetSelectedByValue(taskInfoList[1]);
            anyOneDropDown2.SetSelectedByValue(taskInfoList[2]);
            if (taskInfoList.length > 3 && taskInfoList[3] == "AllAudit") {
                page.GetControl("AnyOneDropDown_AllAuditChk").SetChecked(true);
            }
            InforCenter_Platform_SelectedTaskType_DisableType("AnyOne", radioCtrl);

            break;
        case "ByAccord":
            radioCtrl.SetSelectByValue("ByAccord");
            byAccordDropdown1.SetSelectedByValue(taskInfoList[1]);
            byAccordDropdown2.SetSelectedByValue(taskInfoList[2]);
            if (taskInfoList.length > 3 && taskInfoList[3] == "AllAudit") {
                page.GetControl("ByAccordDropDown_AllAuditChk").SetChecked(true);
            }
            InforCenter_Platform_SelectedTaskType_DisableType("ByAccord", radioCtrl);
            break;
        case "AuditCount":
            radioCtrl.SetSelectByValue("AuditCount");
            page.GetControl("Count").SetText(taskInfoList[1])
            auditCountDropDown1.SetSelectedByValue(taskInfoList[2]);
            auditCountDropDown2.SetSelectedByValue(taskInfoList[3]);
            //if (taskInfoList.length > 4 && taskInfoList[4] == "AllAudit") {
            //    page.GetControl("AuditCountDropDownContainer_AllAuditChk").SetChecked(true);
            //}

            InforCenter_Platform_SelectedTaskType_DisableType("AuditCount", radioCtrl);
            break;
        case "AssistAudit":
            radioCtrl.SetSelectByValue("AssistAudit");
            InforCenter_Platform_SelectedTaskType_DisableType("AssistAudit", radioCtrl);
            break;
        default:
            break;
    }

    var tmp = HoteamUI.UIManager.GetTemplate("SelectedTaskType_AllAuditQuestion");
    page.GetControl("OverHalfTextValue_AllAuditImg").AppendHtml(tmp.replace(/\{i\}/g, 1));
    page.GetControl("AnyOneDropDown_AllAuditImg").AppendHtml(tmp.replace(/\{i\}/g, 2));
    page.GetControl("ByAccordDropDown_AllAuditImg").AppendHtml(tmp.replace(/\{i\}/g, 3));
    //page.GetControl("AuditCountDropDownContainer_AllAuditImg").AppendHtml(tmp.replace(/\{i\}/g, 4));
}
//任务类型 确定
InforCenter_Platform_SelectedTaskType_OnOK = function (ctrlEvent) {
    var value = "";
    var text = "";
    var radioCtrl = ctrlEvent.o.OtherControl("RadioList");
    var result = radioCtrl.GetValue();
    var showText = radioCtrl.GetText();
    switch (result) {
        case "Simple":
            var autoAduit = ctrlEvent.o.OtherControl("AutoAduitCheckBox");
            var selectResult = ctrlEvent.o.OtherControl("SelectResultDropDown");
            if (autoAduit.IsChecked()) {
                text = showText + ":" + autoAduit.GetText() + " " + selectResult.GetSelectedValue();
                value = result + ";" + autoAduit.IsChecked() + ";" + selectResult.GetSelectedValue();
            } else {
                text = showText;
                value = result + ";" + autoAduit.IsChecked();
            }
            break;
        case "OverHalf":
            var ctrl = ctrlEvent.o.OtherControl("OverHalfTextValue");
            if (ctrl.Check() == false)
                return;
            text = showText + ":" + ctrlEvent.o.OtherControl("OverHalfTextValue").GetText();
            value = result + ";" + ctrlEvent.o.OtherControl("OverHalfTextValue").GetValue();;
            if (ctrlEvent.o.OtherControl("OverHalfTextValue_AllAuditChk").IsChecked()) {
                text += ";" + ctrlEvent.o.OtherControl("OverHalfTextValue_AllAuditChk").GetText();
                value += ";AllAudit";
            }
            break;
        case "AnyOne":
            var anyOneddl = ctrlEvent.o.OtherControl("AnyOneDropDown1");
            var elesAnyOnelbl = ctrlEvent.o.OtherControl("AnyOneElseLabel");
            var elseAnyOneddl = ctrlEvent.o.OtherControl("AnyOneDropDown2");
            text = showText + ":" + anyOneddl.GetSelectedValue() + " " + elesAnyOnelbl.GetText() + " " + elseAnyOneddl.GetSelectedValue();
            value = result + ";" + anyOneddl.GetSelectedValue() + ";" + elseAnyOneddl.GetSelectedValue();
            if (ctrlEvent.o.OtherControl("AnyOneDropDown_AllAuditChk").IsChecked()) {
                text += ";" + ctrlEvent.o.OtherControl("AnyOneDropDown_AllAuditChk").GetText();
                value += ";AllAudit";
            }
            break;
        case "ByAccord":
            text = showText + ":" + ctrlEvent.o.OtherControl("ByAccordDropdown1").GetSelectedValue() + " " + ctrlEvent.o.OtherControl("ElseLabel").GetText() + " " + ctrlEvent.o.OtherControl("ByAccordDropdown2").GetSelectedValue();
            value = result + ";" + ctrlEvent.o.OtherControl("ByAccordDropdown1").GetSelectedValue() + ";" + ctrlEvent.o.OtherControl("ByAccordDropdown2").GetSelectedValue();
            if (ctrlEvent.o.OtherControl("ByAccordDropDown_AllAuditChk").IsChecked()) {
                text += ";" + ctrlEvent.o.OtherControl("ByAccordDropDown_AllAuditChk").GetText();
                value += ";AllAudit";
            }
            break;
        case "AuditCount":
            var ctrl = ctrlEvent.o.OtherControl("Count");
            if (ctrl.Check() == false) {
                return;
            }
            var auditCountddl = ctrlEvent.o.OtherControl("AuditCountDropDown1");
            var elesauditCountlbl = ctrlEvent.o.OtherControl("AuditCountElseLabel");
            var elseauditCountddl = ctrlEvent.o.OtherControl("AuditCountDropDown2");

            text = showText + ":" + ctrl.GetText() + ctrlEvent.o.OtherControl("People").GetText() + " " + auditCountddl.GetSelectedValue() + " " + elesauditCountlbl.GetText() + " " + elseauditCountddl.GetSelectedValue();
            value = result + ";" + ctrl.GetText() + ";" + auditCountddl.GetSelectedValue() + ";" + elseauditCountddl.GetSelectedValue();
            //if (ctrlEvent.o.OtherControl("AuditCountDropDownContainer_AllAuditChk").IsChecked()) {
            //    text += ";" + ctrlEvent.o.OtherControl("AuditCountDropDownContainer_AllAuditChk").GetText();
            //    value += ";AllAudit";
            //}
            break;
        case "AssistAudit":
        default:
            text = showText;
            value = result;
            break;
    }

    HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), { ReturnValue: value, ReturnText: text, Success: true });
};
InforCenter_Platform_SelectedTaskType_OnAutoAduitChecked = function (ctrlEvent) {

    var ctrl = ctrlEvent.o;
    var selectResultCtrl = ctrl.OtherControl("SelectResultDropDown");
    if (ctrl.IsChecked()) {
        selectResultCtrl.Enable();
    }
    else {
        selectResultCtrl.Disable();
    }
}


InforCenter_Platform_SelectedTaskType_RadioOnClick = function (ctrlEvent) {
    InforCenter_Platform_SelectedTaskType_DisableType(ctrlEvent.o.GetValue(), ctrlEvent.o);
}

InforCenter_Platform_SelectedTaskType_DisableType = function (type, ctrl) {
    var overHalfTextValue = ctrl.OtherControl("OverHalfTextValue");
    var anyOneDropDown1 = ctrl.OtherControl("AnyOneDropDown1");
    var anyOneDropDown2 = ctrl.OtherControl("AnyOneDropDown2");
    var byAccordDropdown1 = ctrl.OtherControl("ByAccordDropdown1");
    var byAccordDropdown2 = ctrl.OtherControl("ByAccordDropdown2");
    var auditCountDropDown1 = ctrl.OtherControl("AuditCountDropDown1");
    var auditCountDropDown2 = ctrl.OtherControl("AuditCountDropDown2");
    var selectResultCtrl = ctrl.OtherControl("SelectResultDropDown");
    var auditcheckbox = ctrl.OtherControl("AutoAduitCheckBox");
    var auditcount = ctrl.OtherControl("Count");

    var overHalfTextValue_AllAuditChk = ctrl.OtherControl("OverHalfTextValue_AllAuditChk");
    var anyOneDropDown_AllAuditChk = ctrl.OtherControl("AnyOneDropDown_AllAuditChk");
    var byAccordDropDown_AllAuditChk = ctrl.OtherControl("ByAccordDropDown_AllAuditChk");
    //var auditCountDropDownContainer_AllAuditChk = ctrl.OtherControl("AuditCountDropDownContainer_AllAuditChk");

    overHalfTextValue.Disable();
    anyOneDropDown1.Disable();
    anyOneDropDown2.Disable();
    byAccordDropdown1.Disable();
    byAccordDropdown2.Disable();
    auditCountDropDown1.Disable();
    auditCountDropDown2.Disable();
    selectResultCtrl.Disable();
    auditcheckbox.Disable();
    auditcount.Disable();
    overHalfTextValue_AllAuditChk.Disable();
    anyOneDropDown_AllAuditChk.Disable();
    byAccordDropDown_AllAuditChk.Disable();
   // auditCountDropDownContainer_AllAuditChk.Disable();

    switch (type) {
        case "Simple":
            auditcheckbox.Enable();
            if (auditcheckbox.IsChecked()) {
                selectResultCtrl.Enable();
            } else {
                selectResultCtrl.Disable();
            }
            break;
        case "OverHalf":
            overHalfTextValue.Enable();
            overHalfTextValue_AllAuditChk.Enable();
            break;
        case "AnyOne":
            anyOneDropDown1.Enable();
            anyOneDropDown2.Enable();
            anyOneDropDown_AllAuditChk.Enable();
            break;
        case "ByAccord":
            byAccordDropdown1.Enable();
            byAccordDropdown2.Enable();
            byAccordDropDown_AllAuditChk.Enable();
            break;
        case "AuditCount":
            auditCountDropDown1.Enable();
            auditCountDropDown2.Enable();
            auditcount.Enable();
            //auditCountDropDownContainer_AllAuditChk.Enable();
            break;
        case "AssistAudit":
            break;
    }

}

InforCenter_Platform_SelectedTaskType_AllAuditOnMouseOver = function (id) {
    var txt = HoteamUI.Language.Lang("SelectedTaskType.AllAuditDetail");
    $("#" + id)
        .poshytip({
            content: txt,
            alignTo: 'target',
            alignX: 'inner-left',
            slide: false,
            offsetX: -16,
            offsetY: 1
        });
}
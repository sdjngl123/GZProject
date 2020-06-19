//选中项基本信息OnCreate
InforCenter_Platform_SelectedAuditBaseInfo_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    //保存上一个页面的数据
    InforCenter_Platform_WorkflowTemplateEdit_SavePreviousPageData(page);
    var template = WebDesignerWorkflowInfo.Template;
    var currInfo = WebDesignerWorkflowInfo.CurrSelectInfo;

    if (!currInfo || !currInfo.NodeID || !template) {
        return;
    }

    var node = currInfo;
    //显示文本
    page.GetControl("ShowText_Value").SetText(node.NodeText);
    //节点图片
    page.GetControl("NodeImage_Value").SetText(node.ImagePath);
    page.GetControl("NodeImage_Value").SetValue(node.ImagePath);
    //节点标识
    page.GetControl("NodeIdentification_Value").SetText(node.NodeFlag);
    //显示顺序
    if (HoteamUI.Common.IsNullOrEmpty(node.ShowOrder) == true) {
        var tmpShowOrder = 0;
        for (var i = 0; i < template.NodeList.length; i++) {
            var tnode = template.NodeList[i];
            if (HoteamUI.Common.IsNullOrEmpty(tnode.ShowOrder) == false) {
                var intShowOrder = parseInt(tnode.ShowOrder);
                if (intShowOrder > tmpShowOrder) {
                    tmpShowOrder = intShowOrder;
                }
            }
        }
        tmpShowOrder = tmpShowOrder + 1;
        node.ShowOrder = Array(4 - ('' + tmpShowOrder).length).join(0) + tmpShowOrder;
    }
    page.GetControl("ShowOrder_Value").SetText(node.ShowOrder);
    //任务类型
    var text = "";
    if (node.TaskType && node.TaskType != "") {
        var type = node.TaskType.split(';');
        switch (type[0]) {
            case "OverHalf":
                var username = type[1];
                var user = InforCenter_Platform_Object_GetObjectData(username);
                if (user) {
                    username = user.ENAME_DisplayValue;
                }
                text = HoteamUI.Language.Lang("SelectedTaskType.OverHalf") + ":" + username;
                if (type.length > 2 && type[2] == "AllAudit") {
                    text += ";" + HoteamUI.Language.Lang("SelectedTaskType.AllAudit");
                }
                break;
            case "AnyOne":
                text = HoteamUI.Language.Lang("SelectedTaskType.AnyOne") + ":" + type[1] + " " + HoteamUI.Language.Lang("SelectedTaskType.Else") + " " + type[2];
                if (type.length > 3 && type[3] == "AllAudit") {
                    text += ";" + HoteamUI.Language.Lang("SelectedTaskType.AllAudit");
                }
                break;
            case "ByAccord":
                text = HoteamUI.Language.Lang("SelectedTaskType.ByAccord") + ":" + type[1] + " " + HoteamUI.Language.Lang("SelectedTaskType.Else") + " " + type[2];
                if (type.length > 3 && type[3] == "AllAudit") {
                    text += ";" + HoteamUI.Language.Lang("SelectedTaskType.AllAudit");
                }
                break;
            case "AuditCount":
                text = HoteamUI.Language.Lang("SelectedTaskType.AuditCount") + ":" + type[1] + HoteamUI.Language.Lang("SelectedTaskType.People") + " " + type[2] + " " + HoteamUI.Language.Lang("SelectedTaskType.Else") + " " + type[3];
                if (type.length > 4 && type[4] == "AllAudit") {
                    text += ";" + HoteamUI.Language.Lang("SelectedTaskType.AllAudit");
                }
                break;
            case "AssistAudit":
                text = HoteamUI.Language.Lang("SelectedTaskType.AssistAudit");
                break;
            default:
                if (type.length > 2) {
                    text = HoteamUI.Language.Lang("SelectedTaskType.Simple") + ":" + HoteamUI.Language.Lang("SelectedTaskType.AutoAduit") + " " + type[2];
                }
                else {
                    text = HoteamUI.Language.Lang("SelectedTaskType.Simple");
                }
                break;
        }
    }
    if (!text) {
        page.GetControl("TaskType_Value").SetText(HoteamUI.Language.Lang("SelectedTaskType.Simple"));
        page.GetControl("TaskType_Value").SetValue("Simple;false");
    } else {
        page.GetControl("TaskType_Value").SetText(text);
        page.GetControl("TaskType_Value").SetValue(!node.TaskType || node.TaskType == "" ? "" : node.TaskType);
    }
    var objectPermissionText = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateService.GerObjectPermissionText", { para: { ObjectPermission: node.ObjectPermission } });
    if (objectPermissionText) {
        page.GetControl("ObjectPermission_Value").SetText(objectPermissionText);
    } else {
        page.GetControl("ObjectPermission_Value").SetText("");
    }
    page.GetControl("ObjectPermission_Value").SetValue(!node.ObjectPermission || node.ObjectPermission == "" ? "" : node.ObjectPermission);
    //有效时间
    var efftime = node.EffectivityTime;
    var effDayCtrl = page.GetControl("EffectDay_Value");
    var effHourCtrl = page.GetControl("EffectHour_Value");
    var effMinuteCtrl = page.GetControl("EffectMinute_Value");
    try {
        var num = parseInt(efftime);
        var day = Math.floor(num / (24 * 60));
        var hour = Math.floor((num - (day * 24 * 60)) / 60);
        var minute = num - (day * 24 * 60) - (hour * 60);
        effDayCtrl.SetText(isNaN(day) == true ? '0' : day);
        effHourCtrl.SetText(isNaN(hour) == true ? '0' : hour);
        effMinuteCtrl.SetText(isNaN(minute) == true ? '0' : minute);
    } catch (e) {
        effDayCtrl.SetText('0');
        effHourCtrl.SetText('0');
        effMinuteCtrl.SetText('0');
    }
    //提前提醒时间
    var remindTime = node.AdjectiveRemindTime;
    var remindDayCtrl = page.GetControl("RemindDay_Value");
    var remindHourCtrl = page.GetControl("RemindHour_Value");
    var remindMinuteCtrl = page.GetControl("RemindMinute_Value");
    try {
        var num = parseInt(remindTime);
        var day = Math.floor(num / (24 * 60));
        var hour = Math.floor((num - (day * 24 * 60)) / 60);
        var minute = num - (day * 24 * 60) - (hour * 60);
        remindDayCtrl.SetText(isNaN(day) == true ? '0' : day);
        remindHourCtrl.SetText(isNaN(hour) == true ? '0' : hour);
        remindMinuteCtrl.SetText(isNaN(minute) == true ? '0' : minute);
    } catch (e) {
        remindDayCtrl.SetText('0');
        remindHourCtrl.SetText('0');
        remindMinuteCtrl.SetText('0');
    }

    var acquiesceResultValueCtrl = page.GetControl("AcquiesceResultValue");
    var isHas = false;
    if (HoteamUI.Common.IsNullOrEmpty(currInfo.AcquiesceResult) == false) {
        //默认执行结果 
        acquiesceResultValueCtrl.SetValue(currInfo.AcquiesceResult);
        var resultList = currInfo.ResultList;

        for (var i = 0; i < resultList.length; i++) {
            if (resultList[i].ParameterValue == currInfo.AcquiesceResult) {
                acquiesceResultValueCtrl.SetText(resultList[i].Name);
                isHas = true;
                break;
            }
        }
    }
    if (isHas == false) {
        acquiesceResultValueCtrl.SetText("");
        acquiesceResultValueCtrl.SetValue("");
    }

    //忽略节点执行人
    var ignoreCtrl = page.GetControl("Ignore_Value");
    if (ignoreCtrl.id != '') {
        ignoreCtrl.SetChecked(node.IsIgnoreDefaultActor);
    }

    //隐藏意见狂
    page.GetControl("HideOpinion_Value").SetChecked(node.IsHideOpinion);
    //隐藏附件列表
    page.GetControl("HideAttachList_Value").SetChecked(node.IsHideAttachList);
    //协助评审
    page.GetControl("AssistAudit_Value").SetChecked(node.AssistAudit);
    //更改节点执行人,除了当前节点其余的节点
    var changeNodeActor = page.GetControl("ChangeNodeActor_Value");
    var rows = new Array();
    for (var i = 0; i < template.NodeList.length; i++) {
        var item = template.NodeList[i];
        if (item.NodeType == "FlowExecute" || item.NodeType == "FlowAudit" || item.NodeType == "FlowCheck") {
            if (item.NodeID == currInfo.NodeID) {
                continue;
            }
            var cols = new Array();

            var nameCol = {};
            nameCol.ColName = "Node";
            nameCol.ColText = item.NodeText;
            cols.push(nameCol);
            var exist = false;
            if (currInfo.ChangeActorNodeList) {
                for (var j = 0; j < currInfo.ChangeActorNodeList.length; j++) {
                    if (currInfo.ChangeActorNodeList[j].Name == item.NodeID) {
                        var allowChangeCol = {};
                        allowChangeCol.ColName = "AllowChange";
                        allowChangeCol.ColText = currInfo.ChangeActorNodeList[j].IsAllowChange == true ? "1" : "0";
                        allowChangeCol.ColValue = currInfo.ChangeActorNodeList[j].IsAllowChange == true ? "1" : "0";
                        cols.push(allowChangeCol);

                        //var validateNullCol = {};
                        //validateNullCol.ColName = "ValidateNull";
                        //validateNullCol.ColText = currInfo.ChangeActorNodeList[j].IsValidateNull == true ? "1" : "0";
                        //validateNullCol.ColValue = currInfo.ChangeActorNodeList[j].IsValidateNull == true ? "1" : "0";
                        //cols.push(validateNullCol);

                        var allocateNullCol = {};
                        allocateNullCol.ColName = "AllocateNull";
                        allocateNullCol.ColText = currInfo.ChangeActorNodeList[j].IsValidateCustomNull == true ? "1" : "0";
                        allocateNullCol.ColValue = currInfo.ChangeActorNodeList[j].IsValidateCustomNull == true ? "1" : "0";
                        cols.push(allocateNullCol);

                        var hiddenCol = {};
                        hiddenCol.ColName = "ID";
                        hiddenCol.ColText = currInfo.ChangeActorNodeList[j].Name;
                        cols.push(hiddenCol);
                        exist = true;
                        break;
                    }
                }
            }
            //说明是新增节点
            if (exist == false) {
                var allowChangeCol = {};
                allowChangeCol.ColName = "AllowChange";
                allowChangeCol.ColText = "1";
                allowChangeCol.ColValue = "1";
                cols.push(allowChangeCol);

                //var validateNullCol = {};
                //validateNullCol.ColName = "ValidateNull";
                //validateNullCol.ColText = "0"
                //cols.push(validateNullCol);

                var allocateNullCol = {};
                allocateNullCol.ColName = "AllocateNull";
                allocateNullCol.ColText = "0";
                allocateNullCol.ColValue = "0";
                cols.push(allocateNullCol);

                var hiddenCol = {};
                hiddenCol.ColName = "ID";
                hiddenCol.ColText = item.NodeID;
                cols.push(hiddenCol);
            }
            rows.push(cols);
        }
    }
    var data = {};
    data.Rows = rows;
    changeNodeActor.LoadGridRows(data);

    //加载扩展设置
    var layout = page.GetControl("Info_Container");
    var tempIndex = 1;
    var templateTypeList = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateService.GetWorkflowTemplateTypeList", {});
    for (var i = 0; i < templateTypeList.length; i++) {
        var type = templateTypeList[i];
        if (type.Name == WebDesignerWorkflowInfo.Template.TemplateType) {
            for (var j = 0; j < type.WorkflowNodeExtendList.length; j++) {
                var itemName = "item1" + tempIndex.toString();
                layout.ShowPanel([itemName]);
                for (var p = 0; p < PageConfigScript.length; p++) {
                    if (PageConfigScript[p].PageOptions && PageConfigScript[p].PageOptions.height) {
                        var heightJson = '{"' + itemName + '":"' + PageConfigScript[p].PageOptions.height + '"}';
                        layout.ResetPanelSize($.parseJSON(heightJson));
                    }
                    break;
                }
                page.GetControl("NodeExtend_Value" + tempIndex.toString()).LoadPage(type.WorkflowNodeExtendList[j].PageName, page.GetPara());
                tempIndex++;
            }
        }
    }
}

//选中项基本信息OnGetData
InforCenter_Platform_SelectedAuditBaseInfo_OnGetData = function (pageEvent) {
    if (pageEvent.currSelectInfoIsNull) {
        return;
    }
    var page = pageEvent.o;
    WebDesignerWorkflowInfo.CurrSelectInfo.NodeText = page.GetControl("ShowText_Value").GetText();
    WebDesignerWorkflowInfo.CurrSelectInfo.ImagePath = page.GetControl("NodeImage_Value").GetText();
    WebDesignerWorkflowInfo.CurrSelectInfo.NodeFlag = page.GetControl("NodeIdentification_Value").GetText();
    WebDesignerWorkflowInfo.CurrSelectInfo.ShowOrder = page.GetControl("ShowOrder_Value").GetText();
    WebDesignerWorkflowInfo.CurrSelectInfo.TaskType = page.GetControl("TaskType_Value").GetValue();
    WebDesignerWorkflowInfo.CurrSelectInfo.ObjectPermission = page.GetControl("ObjectPermission_Value").GetValue();

    //有效时间
    var effectDay = 0;
    var effectHour = 0;
    var effectMinute = 0;
    if (isNaN(parseInt(page.GetControl("EffectDay_Value").GetText())) == false) {
        effectDay = parseInt(page.GetControl("EffectDay_Value").GetText()) * 24 * 60;
    }
    if (isNaN(parseInt(page.GetControl("EffectHour_Value").GetText())) == false) {
        effectHour = parseInt(page.GetControl("EffectHour_Value").GetText()) * 60;
    }
    if (isNaN(parseInt(page.GetControl("EffectMinute_Value").GetText())) == false) {
        effectMinute = parseInt(page.GetControl("EffectMinute_Value").GetText());
    }
    WebDesignerWorkflowInfo.CurrSelectInfo.EffectivityTime = effectDay + effectHour + effectMinute;

    //提前提醒时间
    var remindDay = 0;
    var remindHour = 0;
    var remindMinute = 0;
    if (isNaN(parseInt(page.GetControl("RemindDay_Value").GetText())) == false) {
        remindDay = parseInt(page.GetControl("RemindDay_Value").GetText()) * 24 * 60;
    }
    if (isNaN(parseInt(page.GetControl("RemindHour_Value").GetText())) == false) {
        remindHour = parseInt(page.GetControl("RemindHour_Value").GetText()) * 60;
    }
    if (isNaN(parseInt(page.GetControl("RemindMinute_Value").GetText())) == false) {
        remindMinute = parseInt(page.GetControl("RemindMinute_Value").GetText());
    }
    WebDesignerWorkflowInfo.CurrSelectInfo.AdjectiveRemindTime = remindDay + remindHour + remindMinute;

    var ignoreCtrl = page.GetControl("Ignore_Value");
    if (ignoreCtrl.id != '') {
        WebDesignerWorkflowInfo.CurrSelectInfo.IsIgnoreDefaultActor = ignoreCtrl.IsChecked();
    }

    WebDesignerWorkflowInfo.CurrSelectInfo.IsHideOpinion = page.GetControl("HideOpinion_Value").IsChecked();
    WebDesignerWorkflowInfo.CurrSelectInfo.IsHideAttachList = page.GetControl("HideAttachList_Value").IsChecked();
    WebDesignerWorkflowInfo.CurrSelectInfo.AssistAudit = page.GetControl("AssistAudit_Value").IsChecked();
    //默认执行结果
    var editGridCtrl = page.GetControl("AcquiesceResultValue");
    WebDesignerWorkflowInfo.CurrSelectInfo.AcquiesceResult = editGridCtrl.GetValue();

    //更改执行人
    var editGridCtrl = page.GetControl("ChangeNodeActor_Value");
    var data = editGridCtrl.SaveGridRows();
    var changeNodeActorList = new Array();
    for (var i = 0; i < data.rowsObject.length; i++) {
        var changeNodeActor = {};
        changeNodeActor.Name = data.rowsObject[i].ID;
        changeNodeActor.IsAllowChange = data.rowsObject[i].AllowChange == "1" ? true : false;
        changeNodeActor.IsValidateCustomNull = data.rowsObject[i].AllocateNull == "1" ? true : false;
        //changeNodeActor.IsValidateNull = data.rowsObject[i].ValidateNull == "1" ? true : false;
        changeNodeActorList.push(changeNodeActor);
    }
    WebDesignerWorkflowInfo.CurrSelectInfo.ChangeActorNodeList = changeNodeActorList;

}

//选中项基本信息 任务类型列点击事件
InforCenter_Platform_SelectedAuditBaseInfo_TaskTypeOnClick = function (ctrlEvent) {
    var taskType = ctrlEvent.o.GetValue();
    var callback = function (data, ret) {
        if (ret && ret.Success == true) {
            data.OtherControl("TaskType_Value").SetText(ret.ReturnText);
            data.OtherControl("TaskType_Value").SetValue(ret.ReturnValue);
        }
    }
    HoteamUI.UIManager.Popup("SelectedTaskType", { TaskType: taskType }, callback, ctrlEvent.o);
}

//选中项基本信息 更改节点图片事件
InforCenter_Platform_SelectedAuditBaseInfo_SelectedImageOnClick = function (ctrlEvent) {
    var callback = function (data, ret) {
        if (ret && ret.ReturnValue) {
            data.ctrl.SetText(ret.ReturnValue);
            data.ctrl.SetValue(ret.ReturnValue);
        }
    }
    HoteamUI.UIManager.Popup("WorkflowSelectImage", { ObjectType: "WORKFLOWTEMPLATE" }, callback, { ctrl: ctrlEvent.o },"520*280");
}

InforCenter_Platform_SelectedAuditBaseInfo_ObjectPermission = function (ctrlEvent) {
    var objectPermission = ctrlEvent.o.GetValue();
    var callback = function (data, ret) {
        if (ret && ret.Success == true) {
            data.OtherControl("ObjectPermission_Value").SetText(ret.ReturnText);
            data.OtherControl("ObjectPermission_Value").SetValue(ret.ReturnValue);
        }
    }
    HoteamUI.UIManager.Popup("SelectedTaskObjectPermission", { ObjectPermission: objectPermission }, callback, ctrlEvent.o);
}

InforCenter_Platform_SelectedAuditBaseInfo_OnCheck = function (pageEvent) {
    var page = pageEvent.o;
    //验证页面控件
    var control = page.GetControl("Info_Container");
    if (control && control.id != "") {
        return control.Check();
    }
}

//默认结果点击事件
InforCenter_Platform_SelectedAuditBaseInfo_AcquiesceResultOnClick = function (ctrlEvent) {
    var relateModel = ctrlEvent.o.GetValue();
    var callback = function (data, ret) {
        if (ret && ret.Success == true) {
            data.OtherControl("AcquiesceResultValue").SetText(ret.ReturnText);
            data.OtherControl("AcquiesceResultValue").SetValue(ret.ReturnValue);
        }
    }
    HoteamUI.UIManager.Popup("ShouAuditResult", { RelatedModel: relateModel }, callback, ctrlEvent.o, "650*400");
}


InforCenter_Platform_SelectedAuditBaseInfo_FlowNodeExtend_OnOK = function (ctrlEvent) {
    var gridCtrl = ctrlEvent.o.OtherControl("AuditResultInfoEditGrid");
    var rows = gridCtrl.GetSelectedRows();
    if (rows.length > 0) {
        HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), { ReturnValue: rows[0].ParaValue, ReturnText: rows[0].ResultName, Success: true });
    } else {
        HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("Platform.NotSelectObject"));
    }
}

//选择结果页面初始化页面
InforCenter_Platform_SelectedAuditBaseInfo_ShouAuditResultOnCreate = function (pageEvent) {
    var template = WebDesignerWorkflowInfo.Template;
    var currInfo = WebDesignerWorkflowInfo.CurrSelectInfo;
    if (!currInfo || !currInfo.NodeID || !template) {
        return;
    }
    var node = currInfo;
    var gridCtrl = pageEvent.o.GetControl("AuditResultInfoEditGrid");
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
    gridCtrl.LoadGridRows(data);
}
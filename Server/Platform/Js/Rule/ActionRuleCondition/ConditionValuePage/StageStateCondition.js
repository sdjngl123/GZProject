//对象授权结果加载页面
InforCenter_Platform_StageStateCondition_LoadPage = function (pageEvent) {
    var page = pageEvent.o;
    var para = page.GetPara();
    var isActionRuleMessage = false;
    if (para && para.NodeType == "ActionRuleMessage")
        isActionRuleMessage = true;
    var modelData = HoteamUI.DataService.Call("InforCenter.Workflow.RulePageService.GetStageStateConditionObjectList", { IsActionRuleMessage: isActionRuleMessage });
    page.GetControl("ModelList_Value").LoadItems(modelData);

    if (HoteamUI.Common.IsNullOrEmpty(para.ConditionValue) == false) {
        if (HoteamUI.Common.IsNullOrEmpty(para.ConditionValue.Parameter1) == false) {
            page.GetControl("ModelList_Value").SetSelectedByValue(para.ConditionValue.Parameter1);
        }
        if (HoteamUI.Common.IsNullOrEmpty(para.ConditionValue.Parameter2) == false) {
            var data = HoteamUI.DataService.Call("InforCenter.Workflow.ObjectService.GetStateList", { para: { InfoName: "STAGESTATEID", ObjectType: para.ConditionValue.Parameter1 } });

            var list = [];
            for (var x = 0; x < data.length; x++) {
                x = parseInt(x);
                list[x] = { Value: data[x].Key, Text: data[x].Value };
            }
            page.GetControl("StageState_Value").LoadItems(list);
            page.GetControl("StageState_Value").SetSelectedByValue(para.ConditionValue.Parameter2);
        }
    }
}

//获取页面保存数据
InforCenter_Platform_StageStateCondition_OnGetDataFromPage = function (pageEvent) {
    InforCenter_Platform_Object_Data = null;
    var bCheck = true;
    var data = {};

    {
        var c = pageEvent.o.GetControl('ModelList_Value');
        if (c.Check() == false) bCheck = false;
        data.Parameter1 = c.GetSelectedValue();
    }
    {
        var c = pageEvent.o.GetControl('StageState_Value');
        if (c.Check() == false) bCheck = false;
        data.Parameter2 = c.GetSelectedValue();
    }

    if (bCheck) {
        InforCenter_Platform_Object_Data = data;
    }
}

InforCenter_Platform_StageStateCondition_ModelListOnChange = function (ctrlEvent) {
    var ctrl = ctrlEvent.o;
    ctrl.OtherControl("StageState_Value").LoadItems([]);
    var model = ctrl.OtherControl("ModelList_Value").GetSelectedValue();
    if (model) {
        var data = HoteamUI.DataService.Call("InforCenter.Workflow.ObjectService.GetStateList", { para: { InfoName: "STAGESTATEID", ObjectType: model } });

        var list = [];
        for (var x = 0; x < data.length; x++) {
            x = parseInt(x);
            list[x] = { Value: data[x].Key, Text: data[x].Value };
        }
        ctrl.OtherControl("StageState_Value").LoadItems(list);
    }
}

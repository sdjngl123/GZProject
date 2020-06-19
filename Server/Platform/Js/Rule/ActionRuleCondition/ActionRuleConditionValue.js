//加载条件编辑页面
InforCenter_Platform_ActionRuleConditionValue_LoadPage = function (pageEvent) {
    var page = pageEvent.o;
    var para = page.GetPara();
    var conditionTypeDDL = page.GetControl("ActionRuleConditionTypeDDL");
    if (HoteamUI.Common.IsNullOrEmpty(conditionTypeDDL) == false) {
        if (HoteamUI.Common.IsNullOrEmpty(para) == false
        && HoteamUI.Common.IsNullOrEmpty(para.ConditionValue) == false
        && HoteamUI.Common.IsNullOrEmpty(para.ConditionValue.ConditionType) == false) {
            //设置编辑值
            conditionTypeDDL.SetSelectedByValue(para.ConditionValue.ConditionType);
        }
        InforCenter_Platform_ActionRuleCondition_ConditionTypeSelectedIndexChangeMethod(conditionTypeDDL);
    }
}

//初始化规则条件下拉列表
InforCenter_Platform_ActionRuleCondition_InitConditionTypeDDL = function (ctrlEvent) {
    //获取规则条件类型数据
    var pagePara = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID()).GetPara();
    if (pagePara)
    {
        var conditionUserBy = pagePara.ConditionUseBy;
    }
    var data = HoteamUI.DataService.Call("InforCenter.Rule.RuleDataService.GetActionRuleConditionTypeList", { para: { ConditionUseBy: conditionUserBy } });
    if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
        ctrlEvent.o.LoadItems(data);
    }
    //初始化时默认加载页面
    InforCenter_Platform_ActionRuleCondition_ConditionTypeSelectedIndexChange(ctrlEvent);
}

//规则条件下拉列表改变
InforCenter_Platform_ActionRuleCondition_ConditionTypeSelectedIndexChange = function (ctrlEvent) {
    InforCenter_Platform_ActionRuleCondition_ConditionTypeSelectedIndexChangeMethod(ctrlEvent.o);
}

//规则条件下拉列表改变调用方法
InforCenter_Platform_ActionRuleCondition_ConditionTypeSelectedIndexChangeMethod = function (ctrl) {
    try {
        if (HoteamUI.Common.IsNullOrEmpty(ctrl) == false) {
            var selectedValue = ctrl.GetSelectedValue();
            if (HoteamUI.Common.IsNullOrEmpty(selectedValue) == false) {
                var infoContainer = ctrl.OtherControl("ConditionValue_Container");
                if (HoteamUI.Common.IsNullOrEmpty(infoContainer) == false) {
                    var page = HoteamUI.Page.Instance(ctrl.ContainerID());
                    var para = page.GetPara();
                    if (HoteamUI.Common.IsNullOrEmpty(para) == false
                        && HoteamUI.Common.IsNullOrEmpty(para.ConditionValue) == false
                        && HoteamUI.Common.IsNullOrEmpty(para.ConditionValue.ConditionType) == false
                        && para.ConditionValue.ConditionType != selectedValue) {
                        para.ConditionValue = {};
                    }
                    infoContainer.LoadPage(selectedValue, para);
                }
            }
        }
    }
    catch (e) { }
}

//保存条件值
InforCenter_Platform_ActionRuleConditionValue_GetConditionValue = function (ctrlEvent) {
    var infoContainer = ctrlEvent.o.OtherControl("ConditionValue_Container");
    var data = InforCenter_Platform_Object_GetDataFromPage(infoContainer.id);
    if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
        var typeDDL = ctrlEvent.o.OtherControl("ActionRuleConditionTypeDDL");
        if (HoteamUI.Common.IsNullOrEmpty(typeDDL) == false) {
            data.ConditionType = typeDDL.GetSelectedValue();
            var ret = {};
            ret.ConditionValue = JSON.stringify(data);

            var para = { para: data };
            var conditionValueText = HoteamUI.DataService.Call("InforCenter.Rule.RuleDataService.GetActionRuleConditionValueText", para);
            ret.ConditionValueText = conditionValueText;

            HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), ret);
        }
    }
}

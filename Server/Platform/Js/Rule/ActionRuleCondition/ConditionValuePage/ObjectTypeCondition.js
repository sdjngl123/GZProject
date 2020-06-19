//加载页面
InforCenter_Platform_ObjectTypeCondition_LoadPage = function (pageEvent) {
    var page = pageEvent.o;
    var para = page.GetPara();
    if (HoteamUI.Common.IsNullOrEmpty(para.ConditionValue) == false
        && HoteamUI.Common.IsNullOrEmpty(para.ConditionValue.Parameter1) == false) {
        var objectTypeDDL = page.GetControl("ObjectTypeValueDDL");
        if (HoteamUI.Common.IsNullOrEmpty(objectTypeDDL) == false) {
            objectTypeDDL.SetSelectedByValue(para.ConditionValue.Parameter1);
        }
    }
}

//初始化对象类型下拉框
InforCenter_Platform_ObjectTypeCondition_InitObjectType = function (ctrlEvent) {
    var para = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID()).GetPara();
    var isActionRuleMessage = false;
    if (para && para.NodeType == "ActionRuleMessage")
        isActionRuleMessage = true;
    var data = HoteamUI.DataService.Call("InforCenter.Rule.RuleDataService.GetObjectTypeList", { para: { IsActionRuleMessage: isActionRuleMessage } });
    if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
        ctrlEvent.o.LoadItems(data);
    }
}

//页面数据获取统一方法，每个页面必须实现
InforCenter_Platform_ObjectTypeCondition_OnGetDataFromPage = function (pageEvent) {
    InforCenter_Platform_Object_Data = null;
    var bCheck = true;
    var data = {};
    {
        var c = pageEvent.o.GetControl('ObjectTypeValueDDL');
        if (c.Check() == false) {
            bCheck = false;
            return;
        }
        if (c.IsInOption() == false) {
            HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("ObjectTypeCondition.IsNotInOption"));
            return;
        }
        data.Parameter1 = c.GetSelectedValue();
    }
    if (bCheck) {
        InforCenter_Platform_Object_Data = data;
    }
}
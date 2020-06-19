//加载页面
InforCenter_Platform_ObjectStateCondition_LoadPage = function (pageEvent) {
    var page = pageEvent.o;
    var para = page.GetPara();
    if (HoteamUI.Common.IsNullOrEmpty(para.ConditionValue) == false
        && HoteamUI.Common.IsNullOrEmpty(para.ConditionValue.Parameter1) == false) {
        var objectPermissionDDL = page.GetControl("ObjectStateValueDDL");
        if (HoteamUI.Common.IsNullOrEmpty(objectPermissionDDL) == false) {
            objectPermissionDDL.SetSelectedByValue(para.ConditionValue.Parameter1);
        }
    }
}

//加载对象状态数据
InforCenter_Platform_ObjectStateCondition_InitObjectStateValue = function (ctrlEvent) {
    var data = HoteamUI.DataService.Call("InforCenter.Rule.RuleDataService.GetObjectStateList", {});
    if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
        ctrlEvent.o.LoadItems(data);
    }
}

//获取页面保存数据
InforCenter_Platform_ObjectStateCondition_OnGetDataFromPage = function (pageEvent) {
    InforCenter_Platform_Object_Data = null;
    var bCheck = true;
    var data = {};
    {
        var c = pageEvent.o.GetControl('ObjectStateValueDDL');
        if (c.Check() == false) {
            bCheck = false;
            return;
        }

        if (c.IsInOption() == false) {
            HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("ObjectStateCondition.IsNotInOption"));
            return;
        }
        data.Parameter1 = c.GetSelectedValue();
    }
    if (bCheck) {
        InforCenter_Platform_Object_Data = data;
    }
}

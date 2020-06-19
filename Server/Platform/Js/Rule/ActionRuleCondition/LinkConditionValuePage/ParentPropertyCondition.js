//对象授权结果加载页面
InforCenter_Platform_ParentPropertyCondition_LoadPage = function (pageEvent) {
    var page = pageEvent.o;
    var para = page.GetPara();
    if (HoteamUI.Common.IsNullOrEmpty(para.ConditionValue) == false) {
        if (HoteamUI.Common.IsNullOrEmpty(para.ConditionValue.Parameter1) == false) {
            var objectPermissionName = page.GetControl("ParentPropertyNameText");
            if (HoteamUI.Common.IsNullOrEmpty(objectPermissionName) == false) {
                objectPermissionName.SetText(para.ConditionValue.Parameter1);
            }
        }
        if (HoteamUI.Common.IsNullOrEmpty(para.ConditionValue.Parameter2) == false) {
            var objectPermissionOperatorDDL = page.GetControl("ParentPropertyOperatorDDL");
            if (HoteamUI.Common.IsNullOrEmpty(objectPermissionOperatorDDL) == false) {
                objectPermissionOperatorDDL.SetSelectedByValue(para.ConditionValue.Parameter2);
            }
        }
        if (HoteamUI.Common.IsNullOrEmpty(para.ConditionValue.Parameter3) == false) {
            var objectPermissionValue = page.GetControl("ParentPropertyValueText");
            if (HoteamUI.Common.IsNullOrEmpty(objectPermissionValue) == false) {
                objectPermissionValue.SetText(para.ConditionValue.Parameter3);
            }
        }
        if (HoteamUI.Common.IsNullOrEmpty(para.ConditionValue.Parameter4) == false && para.ConditionValue.Parameter4 == "false") {
            var objectPermissionValueType = page.GetControl("ParentPropertyValueType");
            if (HoteamUI.Common.IsNullOrEmpty(objectPermissionValueType) == false ) {
                objectPermissionValueType.SetChecked(false);
            }
        }
    }
}

//获取页面保存数据
InforCenter_Platform_ParentPropertyCondition_OnGetDataFromPage = function (pageEvent) {
    InforCenter_Platform_Object_Data = null;
    var bCheck = true;
    var data = {};
    {
        var c = pageEvent.o.GetControl('ParentPropertyNameText');
        if (c.Check() == false) bCheck = false;
        data.Parameter1 = c.GetText();
    }
    {
        var c = pageEvent.o.GetControl('ParentPropertyOperatorDDL');
        if (c.Check() == false) bCheck = false;
        data.Parameter2 = c.GetSelectedValue();
    }
    {
        var c = pageEvent.o.GetControl('ParentPropertyValueText');
        if (c.Check() == false) bCheck = false;
        data.Parameter3 = c.GetText();
    }
    {
        var c = pageEvent.o.GetControl('ParentPropertyValueType');
        data.Parameter4 = ""+c.IsChecked();
    }
    if (bCheck) {
        InforCenter_Platform_Object_Data = data;
    }
}

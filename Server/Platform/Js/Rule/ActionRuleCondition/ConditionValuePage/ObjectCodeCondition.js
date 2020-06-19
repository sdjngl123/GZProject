//对象授权结果加载页面
InforCenter_Platform_ObjectNameCondition_LoadPage = function (pageEvent) {
    var page = pageEvent.o;
    var para = page.GetPara();
    if (HoteamUI.Common.IsNullOrEmpty(para.ConditionValue) == false) {
       
        if (HoteamUI.Common.IsNullOrEmpty(para.ConditionValue.Parameter1) == false) {
            var objectPermissionOperatorDDL = page.GetControl("ObjectNameOperatorDDL");
            if (HoteamUI.Common.IsNullOrEmpty(objectPermissionOperatorDDL) == false) {
                objectPermissionOperatorDDL.SetSelectedByValue(para.ConditionValue.Parameter1);
            }
        }
        if (HoteamUI.Common.IsNullOrEmpty(para.ConditionValue.Parameter2) == false) {
            var objectPermissionValue = page.GetControl("ObjectNameValueText");
            if (HoteamUI.Common.IsNullOrEmpty(objectPermissionValue) == false) {
                objectPermissionValue.SetText(para.ConditionValue.Parameter2);
            }
        }
    }
}

//获取页面保存数据
InforCenter_Platform_ObjectNameCondition_OnGetDataFromPage = function (pageEvent) {
    InforCenter_Platform_Object_Data = null;
    var bCheck = true;
    var data = {};
   
    {
        var c = pageEvent.o.GetControl('ObjectNameOperatorDDL');
        if (c.Check() == false) bCheck = false;
        data.Parameter1 = c.GetSelectedValue();
    }
    {
        var c = pageEvent.o.GetControl('ObjectNameValueText');
        if (c.Check() == false) bCheck = false;
        data.Parameter2 = c.GetText();
    }
    
    if (bCheck) {
        InforCenter_Platform_Object_Data = data;
    }
}

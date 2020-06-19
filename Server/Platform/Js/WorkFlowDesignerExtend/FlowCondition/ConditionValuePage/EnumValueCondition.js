//对象授权结果加载页面
InforCenter_Platform_EnumValueCondition_LoadPage = function (pageEvent) {
    var page = pageEvent.o;
    var para = page.GetPara();
    var objectPermissionValue = page.GetControl("ObjectOwnGroupValueText");

    if (HoteamUI.Common.IsNullOrEmpty(objectPermissionValue) == false) {
        if (HoteamUI.Common.IsNullOrEmpty(para.Value) == false) {
            var conditionValue = JSON.parse(para.Value);
            //设置下拉
            InforCenter_Platform_Object_SetEnumList(objectPermissionValue, conditionValue.InfoType, conditionValue.ObjectType, false);
            if (HoteamUI.Common.IsNullOrEmpty(conditionValue.Data) == false) {
                objectPermissionValue.SetSelectedByValue(conditionValue.Data.Value);
            }
        }
    }
}

//获取页面保存数据
InforCenter_Platform_EnumValueCondition_OnGetDataFromPage = function (pageEvent) {
    InforCenter_Platform_Object_Data = null;
    var bCheck = true;
    var data = {};
    {
        var c = pageEvent.o.GetControl('ObjectOwnGroupValueText');
        if (c.Check() == false) bCheck = false;
        data.Value = c.GetSelectedValue();
        data.Text = c.GetSelectedText();
    }

    if (bCheck) {
        InforCenter_Platform_Object_Data = data;
    }
}
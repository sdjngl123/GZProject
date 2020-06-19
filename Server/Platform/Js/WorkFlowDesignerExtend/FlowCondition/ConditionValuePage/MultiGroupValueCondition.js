//对象授权结果加载页面
InforCenter_Platform_MultiGroupValueCondition_LoadPage = function (pageEvent) {
    var page = pageEvent.o;
    var para = page.GetPara();
    if (HoteamUI.Common.IsNullOrEmpty(para.Value) == false) {
        var conditionValue = JSON.parse(para.Value);
        if (HoteamUI.Common.IsNullOrEmpty(conditionValue) == false) {
            var objectPermissionValue = page.GetControl("ObjectOwnGroupValueText");
            if (HoteamUI.Common.IsNullOrEmpty(objectPermissionValue) == false) {
                objectPermissionValue.SetText(conditionValue.Data.Text);
                objectPermissionValue.SetValue(conditionValue.Data.Value);
            }
        }
    }
}

//获取页面保存数据
InforCenter_Platform_MultiGroupValueCondition_OnGetDataFromPage = function (pageEvent) {
    InforCenter_Platform_Object_Data = null;
    var bCheck = true;
    var data = {};
    {
        var c = pageEvent.o.GetControl('ObjectOwnGroupValueText');
        if (c.Check() == false) bCheck = false;
        data.Value = c.GetValue();
        data.Text = c.GetText();
    }

    if (bCheck) {
        InforCenter_Platform_Object_Data = data;
    }
}
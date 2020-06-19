//对象授权结果加载页面
InforCenter_Platform_ObjectPermissionCondition_LoadPage = function (pageEvent) {
    var page = pageEvent.o;
    var para = page.GetPara();
    if (HoteamUI.Common.IsNullOrEmpty(para.ConditionValue) == false
        && HoteamUI.Common.IsNullOrEmpty(para.ConditionValue.Parameter1) == false) {
        var objectPermissionDDL = page.GetControl("ObjectPermissionValueDDL");
        if (HoteamUI.Common.IsNullOrEmpty(objectPermissionDDL) == false) {
            objectPermissionDDL.SetSelectedByValue(para.ConditionValue.Parameter1);
        }
    }
}

//获取页面保存数据
InforCenter_Platform_ObjectPermissionCondition_OnGetDataFromPage = function (pageEvent) {
    InforCenter_Platform_Object_Data = null;
    var bCheck = true;
    var data = {};
    {
        var c = pageEvent.o.GetControl('ObjectPermissionValueDDL');
        if (c.Check() == false) bCheck = false;
        data.Parameter1 = c.GetSelectedValue();
    }
    if (bCheck) {
        InforCenter_Platform_Object_Data = data;
    }
}

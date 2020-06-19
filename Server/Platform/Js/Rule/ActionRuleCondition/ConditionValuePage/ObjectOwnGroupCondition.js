//对象授权结果加载页面
InforCenter_Platform_ObjectOwnGroupCondition_LoadPage = function (pageEvent) {
    var page = pageEvent.o;
    var para = page.GetPara();
    if (HoteamUI.Common.IsNullOrEmpty(para.ConditionValue) == false) {
        if (HoteamUI.Common.IsNullOrEmpty(para.ConditionValue.Parameter1) == false) {
            var objectPermissionValue = page.GetControl("ObjectOwnGroupValueText");
            if (HoteamUI.Common.IsNullOrEmpty(objectPermissionValue) == false) {
                var user = InforCenter_Platform_Object_GetObjectData(para.ConditionValue.Parameter1);
                if (user) {
                    objectPermissionValue.SetText(user.ENAME);
                    objectPermissionValue.SetValue(user.EID);
                }
            }
        }
    }
}

//获取页面保存数据
InforCenter_Platform_ObjectOwnGroupCondition_OnGetDataFromPage = function (pageEvent) {
    InforCenter_Platform_Object_Data = null;
    var bCheck = true;
    var data = {};
    {
        var c = pageEvent.o.GetControl('ObjectOwnGroupValueText');
        if (c.Check() == false) bCheck = false;
        data.Parameter1 = c.GetValue();
    }

    if (bCheck) {
        InforCenter_Platform_Object_Data = data;
    }
}

InforCenter_Platform_ObjectOwnGroupCondition_OwnGroupOnClick = function (ctrlEvent) {
    var userID = ctrlEvent.o.GetValue();
    var callback = function (data, ret) {
        if (ret != null && ret.length > 0) {
            var value = "";
            var text = "";
            // for (var i in ret) {
            for (var i = 0; i < ret.length; i++) {
                text = text + ";" + ret[i].ENAME;
                value = value + ";" + ret[i].EID;
            }
            if (HoteamUI.Common.IsNullOrEmpty(text) == false) {
                text = text.substring(1);
                value = value.substring(1);
            }
            ctrlEvent.o.SetText(text);
            ctrlEvent.o.SetValue(value);
        }
    }
    HoteamUI.UIManager.Popup("TreeCommonQuery", { Value: userID, ItemName: "GroupToGroup", LoadAndSelectType: "SingleLevel_SingleSelect", }, callback, "", "320*500");
}
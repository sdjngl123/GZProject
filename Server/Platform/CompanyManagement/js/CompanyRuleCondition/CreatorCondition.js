InforCenter_Platform_CreatorCondition_LoadPage = function (pageEvent) {
    var page = pageEvent.o;
    var para = page.GetPara();
    if (HoteamUI.Common.IsNullOrEmpty(para.ConditionValue) == false
        && HoteamUI.Common.IsNullOrEmpty(para.ConditionValue.Parameter1) == false) {
        var eid = para.ConditionValue.Parameter1;
        var user = InforCenter_Platform_Object_GetObjectData(eid)
        if (user) {
            page.GetControl("CreatorValueCtrl").SetText(user.ENAME_DisplayValue);
            page.GetControl("CreatorValueCtrl").SetValue(eid);
        }
    }
}

InforCenter_Platform_CreatorCondition_OnGetDataFromPage = function (pageEvent) {
    InforCenter_Platform_Object_Data = null;
    var bCheck = true;
    var data = {};
    {
        var c = pageEvent.o.GetControl('CreatorValueCtrl');
        if (c.Check() == false) {
            bCheck = false;
            return;
        }

        data.Parameter1 = c.GetValue();
    }
    if (bCheck) {
        InforCenter_Platform_Object_Data = data;
    }
}

InforCenter_Platform_CreatorCondition_CreatorOnClick = function (ctrlEvent) {
    var callback = function (data, ret) {
        if (ret && ret.length > 0) {
            var valueString = ret[0].EID;
            var nameString = ret[0].ENAME;
            ctrlEvent.o.SetText(nameString);
            ctrlEvent.o.SetValue(valueString);
        }
    }
    var actor = ctrlEvent.o.GetValue();
    HoteamUI.UIManager.Popup("TreeCommonQuery", { Value: actor, ItemName: "GroupToRoleToUserIgnoreCompanyID", LoadAndSelectType: "SingleLevel_SingleSelect" }, callback, "650*470");
}
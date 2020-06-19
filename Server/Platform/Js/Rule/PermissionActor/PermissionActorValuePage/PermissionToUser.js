//加载页面
InforCenter_Platform_PermissionToUser_LoadPage = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.PermissionActorValue) == false
        && HoteamUI.Common.IsNullOrEmpty(pagePara.PermissionActorValue.ActorValue) == false) {
        var text = HoteamUI.DataService.Call("InforCenter.Rule.RuleDataService.GetPermissionActorValueText", { para: pagePara.PermissionActorValue });
        var userTextValue = page.GetControl("UserTextValue");
        if (HoteamUI.Common.IsNullOrEmpty(userTextValue) == false) {
            userTextValue.SetValue(pagePara.PermissionActorValue.ActorValue);
            userTextValue.SetText(text);
        }
    }
}

InforCenter_Platform_PermissionToUser_ShowSelecterPage = function (ctrlEvent) {
    var callback = function (data, ret) {
        var o = HoteamUI.Control.Instance(data.id);
        if (ret != null && ret.length > 0) {
            var valueString = "";
            for (var i = 0; i < ret.length; i++) {
                valueString += ";" + ret[i].EID;
            }
            if (valueString.length > 0) {
                valueString = valueString.substring(1);
            }
            var dataValue = {};
            var page = HoteamUI.Page.Instance(o.ContainerID());
            var pagePara = page.GetPara();
            dataValue.ActorType = pagePara.ActorType;
            dataValue.ActorValue = valueString;

            var displayText = HoteamUI.DataService.Call("InforCenter.Rule.RuleDataService.GetPermissionActorValueText", { para: dataValue });
            o.SetText(displayText);
            o.SetValue(valueString);
        }
    }

    InforCenter_Platform_OrganizationSelecter(ctrlEvent.o.GetValue(), "GroupToRoleToUser", "SingleLevel_MultiSelect", callback, ctrlEvent.o.id);
}

//页面数据获取统一方法，每个页面必须实现
InforCenter_Platform_PermissionToUser_OnGetDataFromPage = function (pageEvent) {
    InforCenter_Platform_Object_Data = null;
    var bCheck = true;
    var data = {};
    {
        var c = pageEvent.o.GetControl('UserTextValue');
        if (c.Check() == false) bCheck = false;
        data.ActorValue = c.GetValue();
    }
    if (bCheck) {
        InforCenter_Platform_Object_Data = data;
    }
}


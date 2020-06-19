//加载页面
InforCenter_Platform_PermissionToGroup_LoadPage = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.PermissionActorValue) == false) {
        if (HoteamUI.Common.IsNullOrEmpty(pagePara.PermissionActorValue.ActorValue) == false) {
            var text = HoteamUI.DataService.Call("InforCenter.Rule.RuleDataService.GetPermissionActorValueText", { para: pagePara.PermissionActorValue });
            var groupTextValue = page.GetControl("GroupTextValue");
            if (HoteamUI.Common.IsNullOrEmpty(groupTextValue) == false) {
                groupTextValue.SetValue(pagePara.PermissionActorValue.ActorValue);
                groupTextValue.SetText(text);
            }
        }
        if (HoteamUI.Common.IsNullOrEmpty(pagePara.PermissionActorValue.ExtendToParent) == false) {
            var extendToParentCtrl = page.GetControl("ExtendToParentValue");
            if (HoteamUI.Common.IsNullOrEmpty(extendToParentCtrl) == false) {
                extendToParentCtrl.SetChecked(pagePara.PermissionActorValue.ExtendToParent);
            }
        }
        if (HoteamUI.Common.IsNullOrEmpty(pagePara.PermissionActorValue.ExtendToChildren) == false) {
            var extendToChildrenCtrl = page.GetControl("ExtendToChildrenValue");
            if (HoteamUI.Common.IsNullOrEmpty(extendToChildrenCtrl) == false) {
                extendToChildrenCtrl.SetChecked(pagePara.PermissionActorValue.ExtendToChildren);
            }
        }
    }
}

//加载组织选择界面
InforCenter_Platform_PermissionToGroup_ShowSelecterPage = function (ctrlEvent) {
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

    InforCenter_Platform_OrganizationSelecter(ctrlEvent.o.GetValue(), "GroupToGroup", "SingleLevel_MultiSelect", callback, ctrlEvent.o.id);
}

//页面数据获取统一方法，每个页面必须实现
InforCenter_Platform_PermissionToGroup_OnGetDataFromPage = function (pageEvent) {
    InforCenter_Platform_Object_Data = null;
    var bCheck = true;
    var data = {};
    {
        var c = pageEvent.o.GetControl('GroupTextValue');
        if (c.Check() == false) bCheck = false;
        data.ActorValue = c.GetValue();
    }
    {
        var c = pageEvent.o.GetControl('ExtendToParentValue');
        if (c.Check() == false) bCheck = false;
        data.ExtendToParent = c.IsChecked();
    }
    {
        var c = pageEvent.o.GetControl('ExtendToChildrenValue');
        if (c.Check() == false) bCheck = false;
        data.ExtendToChildren = c.IsChecked();
    }
    if (bCheck) {
        InforCenter_Platform_Object_Data = data;
    }
}

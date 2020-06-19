//加载页面
InforCenter_Platform_PermissionToLinkOwnGroup_LoadPage = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.PermissionActorValue) == false) {        
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

//页面数据获取统一方法，每个页面必须实现
InforCenter_Platform_PermissionToLinkOwnGroup_OnGetDataFromPage = function (pageEvent) {
    InforCenter_Platform_Object_Data = null;
    var bCheck = true;
    var data = {};
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

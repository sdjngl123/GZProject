//加载授权对象页面
InforCenter_Platform_PermissionActorValue_LoadPage = function (pageEvent) {
    var page = pageEvent.o;
    var para = page.GetPara();
    var permissionTypeDDL = page.GetControl("ActorTypeDDL");
    if (HoteamUI.Common.IsNullOrEmpty(permissionTypeDDL) == false) {
        if (HoteamUI.Common.IsNullOrEmpty(para) == false
        && HoteamUI.Common.IsNullOrEmpty(para.PermissionActorValue) == false
        && HoteamUI.Common.IsNullOrEmpty(para.PermissionActorValue.ActorType) == false) {
            permissionTypeDDL.SetSelectedByValue(para.PermissionActorValue.ActorType);
            if (para.PermissionActorValue.DisableActorTypeDDL) {
                permissionTypeDDL.Disable();
            }
        }
        InforCenter_Platform_PermissionActorValue_PermissionTypeSelectedIndexChangeMethod(permissionTypeDDL);
    }
}

//初始化授权类型下拉框
InforCenter_Platform_PermissionActorValue_InitPermissionTypeDLL = function (ctrlEvent) {
    var para = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID()).GetPara();
    if (para && para.PermissionActorValue) {
        var data = HoteamUI.DataService.Call("InforCenter.Rule.RuleDataService.GetPermissionTypeList", { para: { UseBy: para.PermissionActorValue.UseBy, IsObjectMessagePage: para.IsObjectMessagePage } });
    } else {
        var data = HoteamUI.DataService.Call("InforCenter.Rule.RuleDataService.GetPermissionTypeList", { para: { IsObjectMessagePage: para.IsObjectMessagePage } });
    }

    //获取规则条件类型数据

    if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
        ctrlEvent.o.LoadItems(data);
    }
    //初始化时默认加载页面
    InforCenter_Platform_PermissionActorValue_PermissionTypeSelectedIndexChange(ctrlEvent);
}

//授权类型下拉框改变时事件
InforCenter_Platform_PermissionActorValue_PermissionTypeSelectedIndexChange = function (ctrlEvnet) {
    InforCenter_Platform_PermissionActorValue_PermissionTypeSelectedIndexChangeMethod(ctrlEvnet.o);
}

//规则条件下拉列表改变调用方法
InforCenter_Platform_PermissionActorValue_PermissionTypeSelectedIndexChangeMethod = function (ctrl) {
    try {
        if (HoteamUI.Common.IsNullOrEmpty(ctrl) == false) {
            var selectedValue = ctrl.GetSelectedValue();
            if (HoteamUI.Common.IsNullOrEmpty(selectedValue) == false) {
                var infoContainer = ctrl.OtherControl("ActorValue_Container");
                if (HoteamUI.Common.IsNullOrEmpty(infoContainer) == false) {
                    var page = HoteamUI.Page.Instance(ctrl.ContainerID());
                    var para = page.GetPara();
                    para.ActorType = selectedValue;
                    if (HoteamUI.Common.IsNullOrEmpty(para.PermissionActorValue) == false
                        && HoteamUI.Common.IsNullOrEmpty(para.PermissionActorValue.ActorType) == false
                        && para.PermissionActorValue.ActorType != selectedValue) {
                        para.PermissionActorValue.ActorValue = null;
                        para.PermissionActorValue.ExtendToParent = null;
                        para.PermissionActorValue.ExtendToChildren = null;
                    }
                    infoContainer.LoadPage(selectedValue, para);
                }
            }
        }
    }
    catch (e) { }
}

//获取授权对象值
InforCenter_Platform_PermissionActorValue_GetPermissionActorValue = function (ctrlEvent) {
    var pagePara = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID()).GetPara();
    var infoContainer = ctrlEvent.o.OtherControl("ActorValue_Container");
    var data = InforCenter_Platform_Object_GetDataFromPage(infoContainer.id);
    if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
        var typeDDL = ctrlEvent.o.OtherControl("ActorTypeDDL");
        if (HoteamUI.Common.IsNullOrEmpty(typeDDL) == false) {
            data.ActorType = typeDDL.GetSelectedValue();

            if (InforCenter_Platform_PermissionActorValue_CheckValue(data, pagePara)) {//判断重复
                var ret = {};
                ret.PermissionActorValue = JSON.stringify(data);

                var para = { para: data };
                var permissionActorValueText = HoteamUI.DataService.Call("InforCenter.Rule.RuleDataService.GetPermissionActorValueText", para);
                ret.PermissionActorValueText = permissionActorValueText;
                ret.PermissionActorType = data.ActorType;

                HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), ret);
            } else {
                //提示重复
                HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("PermissionActorValue.SameItem"));
            }

        }
    }
}

InforCenter_Platform_PermissionActorValue_CheckValue = function (data, pagePara) {
    if (pagePara && pagePara.PermissionMessageValueList && pagePara.PermissionMessageValueList.length > 0) {
        for (var i = 0; i < pagePara.PermissionMessageValueList.length; i++) {
            var permessionValue = pagePara.PermissionMessageValueList[i];
            try {
                var json = JSON.parse(permessionValue);
                if (json.ActorType == data.ActorType && json.ActorValue == data.ActorValue) {
                    return false;
                }
            } catch (e) {
                continue;
            }
        }
    }
    return true;
}
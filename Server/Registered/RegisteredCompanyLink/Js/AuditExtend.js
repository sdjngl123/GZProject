InforCenter_Platform_Registered_ExecAuditExtend = function (datapara, extendcallback) {
    var ret = {};
    extendcallback(ret);
    //不再进行模块授权
    ////执行验证
    //var check = HoteamUI.DataService.Call("InforCenter.RegisteredCompanyLink.RegisteredCompanyLinkService.CheckAuditUser", {
    //    para: {
    //        ExtendJsonInfo: JSON.stringify(datapara)
    //    }
    //});

    //if (check == true) {
    //    var pagecallback = function (data, pageRet) {
    //        var ret = {};
    //        if (pageRet && pageRet.PermissionInfo) {
    //            ret.ExtendInfo = pageRet.PermissionInfo;
    //            extendcallback(ret);
    //        }
    //    }
    //    HoteamUI.UIManager.Popup("RegisteredModulePermission", datapara, pagecallback, {});
    //}
}

InforCenter_Registered_RegisteredModulePermission_PageOnCreate = function (pageEvent) {

    var data = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "OnlyGetNavModulePermissionTree", {});

    if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
        pageEvent.o.GetControl("TreeCtrl").LoadNodes(null, data);
    }
}

InforCenter_Registered_RegisteredModulePermission_PageOnOK = function (ctrlEvent) {
    var tree = ctrlEvent.o.OtherControl("TreeCtrl");

    var allow = tree.GetCheckNodes("1", false);
    var deny = tree.GetCheckNodes("0", false);

    var allowModule = "";
    var denyModule = "";

    if (allow && allow.length > 0) {
        for (var i = 0; i < allow.length; i++) {
            allowModule += ";" + allow[i].value1;
        }
    }
    if (allowModule.length > 0) {
        allowModule = allowModule.substring(1);
    }

    if (deny && deny.length > 0) {
        for (var i = 0; i < deny.length; i++) {
            denyModule += ";" + deny[i].value1;
        }
    }
    if (denyModule.length > 0) {
        denyModule = denyModule.substring(1);
    }
    var ret = {};
    ret.AllowModule = allowModule;
    ret.DenyModule = denyModule;

    HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), { PermissionInfo: JSON.stringify(ret) });

}

//重写加载导航方法
InforCenter_Platform_ClassicHomePageNavigation_LoadNavigationItems = function (ctrlEvent) {

    var data, modelItems, item, addModelNavItem;

    data = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GetNavigationItems", { para: { QuickType: "CustomNav" } });

    for (var i = 0, len = data.length; i < len; i++) {
        item = data[i];
        if (item.Name === "AddModel") {
            var cloneData = JSON.parse(JSON.stringify(data));
            modelItems = InforCenter_Platform_ClassicHomePageNavigation_LoadNavigationAddModelItems(cloneData);
            item.Children = modelItems;
            break;
        }
    }

    //将导航数据赋给全局变量
    //获取该公司禁止的模块
    var companyDenyModule = HoteamUI.DataService.Call("InforCenter.RegisteredCompanyLink.RegisteredCompanyLinkService.GetCompanyDenyModule", {});
    if (companyDenyModule) {
        var companyDenyModule = companyDenyModule.split(';');
        _InforCenter_Platform_ClassicHomePageNavigation_RemoveDenyModule(data, companyDenyModule, function (navInfo, denyInfo) {
            return navInfo.Name == denyInfo;
        });
    }


    PlatformUI.NavigationData = data;
    if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
        if (window["InforCenter_Registered_NavIntegration_GetIntegrationNav"]
            && typeof window["InforCenter_Registered_NavIntegration_GetIntegrationNav"] == "function") {
            var integrationInfo = InforCenter_Registered_NavIntegration_GetIntegrationNav();
            if (integrationInfo && integrationInfo.length > 0) {
                for (var i = 0; i < integrationInfo.length; i++) {
                    data.push(integrationInfo[i]);
                }
            }
        }
        ctrlEvent.o.LoadItems(data);
    }

}
_InforCenter_Platform_ClassicHomePageNavigation_RemoveDenyModule = function (nvaData, denyData, equalFunc) {
    var remove = [];
    for (var i = 0; i < nvaData.length; i++) {
        var nav = nvaData[i];
        for (var j = 0; j < denyData.length; j++) {
            if (equalFunc(nav, denyData[j])) {
                remove.push(i);
            }
        }
    }
    //倒序删除
    if (remove.length > 0) {
        for (var j = remove.length - 1; j >= 0; j--) {
            var idx = remove[j];
            nvaData.splice(idx, 1);
        }
    }

    //查找下级
    if (nvaData.length > 0) {
        for (var j = 0; j < nvaData.length; j++) {
            var n = nvaData[j];
            if (n.Children && n.Children.length > 0) {
                _InforCenter_Platform_ClassicHomePageNavigation_RemoveDenyModule(n.Children, denyData, equalFunc);
            }
        }
    }
}

//重写加载授权树的方法
InforCenter_Platform_ModulePermission_LoadPermisssionTree = function (ctrlEvent) {
    var data = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GetModulePermissionTree", {});

    var companyDenyModule = HoteamUI.DataService.Call("InforCenter.RegisteredCompanyLink.RegisteredCompanyLinkService.GetCompanyDenyModule", {});
    if (companyDenyModule) {
        var companyDenyModule = companyDenyModule.split(';');
        _InforCenter_Platform_ClassicHomePageNavigation_RemoveDenyModule(data, companyDenyModule, function (navInfo, denyInfo) {
            return navInfo.Value1 == denyInfo && navInfo.Value3 == "Navigation";
        });
    }

    if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
        ModulePermission.TreeNodeData = data;
        ctrlEvent.o.LoadNodes(null, data);
        ModulePermission.AllTreeNode = InforCenter_Platform_ModulePermission_SetNodePermissionModulePath(ctrlEvent.o);
    }

}
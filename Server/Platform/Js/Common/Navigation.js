/******************************************************************************
*    Copyright (c) 2012,山东山大华天软件有限公司
*    All rights reserved.
*
*    文件名称： Navigation.js
*
*    创 建 人： 李士利
*    创建日期： 2013-01-01
*    初始版本： 1.0
*
*    修 改 人： 李士利
*    修改日期： 2013-01-01
*    当前版本： 1.0
******************************************************************************/

//添加快捷图标
InforCenter_Platform_Navigation_AddQuickNavigation = function (ctrlEvent) {
    var navigationID = ctrlEvent.name;
    InforCenter_Platform_QuickNavigation_AddQuickNavigation(navigationID);
}

//添加用户导航
InforCenter_Platform_Navigation_AddCustomNavigation = function (navigationID) {

    InforCenter_Platform_QuickNavigation_AddQuickNavigation(navigationID, null, "CustomNav");
}
//删除用户导航
InforCenter_Platform_Navigation_RemoveCustomNavigation = function (navigationID, callbackordeleteobj) {
    HoteamUI.DataService.Call("InforCenter.Organization.OrganizationDataService.RemoveQuickNavigation", { para: { NavigationID: navigationID } });
}

//添加主框架Tab页 isAdd参数是是否可以添加相同tab页
InforCenter_Platform_Navigation_AddTab = function (pageUrl, pageText, isAdd, navName, param, jsMethod) {
    var pageName = null;
    var para = {};
    if (HoteamUI.Common.IsNullOrEmpty(pageUrl) == false) {
        var values = pageUrl.split('?');
        pageName = values[0];
        if (values.length > 1) {
            para = eval("(" + values[1] + ")");
        }
        para.navName = navName;
        para.Url = [navName];
        for (var key in param) {
            if (param.hasOwnProperty(key)) {
                para[key] = param[key];
            }
        }
        if (window[jsMethod] && typeof window[jsMethod] == "function") {
            var ret = window[jsMethod](para);
            //根据返回值判断是否刷新，如果不刷新，直接返回，不执行AddTab方法
            if (ret && ret.Refresh == false) {
                return;
            }
        }
        InforCenter_Platform_MainTabs_AddTab(pageName, para, pageText, isAdd);
    }
}

//加载导航
InforCenter_Platform_OriginalityHomePageNavigation_LoadNavigationItems = function (ctrlEvent) {
    var data = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GetNavigationItemsForPreview", {});
    if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
        var userQuickNavigationList = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GetUserQuickNavigationList", {});

        ctrlEvent.o.LoadItemsFromServer(data, userQuickNavigationList);

        $("#QuickNav_all_sub").sortable({
            stop: function () {
                var result = [];
                $("#QuickNav_all_sub").children("div").map(function (index, value) {
                    result.push($(value).attr("data-id"));
                });
                InforCenter_Platform_QuickNavigation_UpdateQuickNavigationSort(result);
            }
        }).disableSelection();
    }

    //指定刷新方法
    InforCenter_Platform_QuickRefeshData = function () {
        var userQuickNavigationList = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GetUserQuickNavigationList", {});
        $("#QuickNav_all_sub").empty();
        ctrlEvent.o.LoadItemsFromServer(data, userQuickNavigationList);
    }
};

InforCenter_Platform_OriginalityHomePageNavigation_OnPageCreate = function (pageEvent) {
    //初始化快捷菜单的右键菜单控件
    InforCenter_Platform_QuickRightMenuCtrl = pageEvent.o.GetControl("RightMenu");
}
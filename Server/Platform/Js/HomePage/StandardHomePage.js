//加载一级精简导航
InforCenter_Platform_StandardHomePage_LoadAccordion = function (ctrlEvent) {
    var paras = {};
    paras.QuickType = "TopLevel";
    var data = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GetNavigationItems", { para: paras });
    PlatformUI.NavigationData = data;
    InforCenter_Platform_StandardHomePage_SetSelect(PlatformUI.NavigationData);
    if (data) {
        ctrlEvent.o.LoadItems(data);
    }
}
//设置导航的每级菜单的第一个为select
InforCenter_Platform_StandardHomePage_SetSelect = function (data) {
    for (var i = 0; i < data.length; i++) {
        if (i == 0) {
            data[i].Select = true;
        }
        if (data[i].Children.length > 0) {
            InforCenter_Platform_StandardHomePage_SetSelect(data[i].Children);
        }
    }
}
//一级导航点击事件，刷新二级导航
InforCenter_Platform_StandardHomePage_AccordionOnClick = function (ctrlEvent) {
    var nav = $("[cid=SmartHomePage_Navigation]");
    var data = PlatformUI.NavigationData;
    for (var i = 0; i < data.length; i++) {
        if (data[i].Name == ctrlEvent.customname) {
            var childData = data[i].Children;
            ctrlEvent.o.OtherControl("SmartHomePage_Navigation").LoadItems(childData);
            InforCenter_Platform_ClassicHomePageNavigation_SelectChildNav(PlatformUI.NavigationData[i].Children, $(nav.children(".hoteam-accordion").find(".ui-accordion-header")), ctrlEvent.param);
        }
    }
}
//保存一级收藏导航
InforCenter_Platform_Navigation_StandardAddQuickNavigation = function (ctrlEvent) {
    var data = { "NavigationID": ctrlEvent.customname };
    data.QuickType = "TopLevel";
    HoteamUI.DataService.Call("InforCenter.Organization.OrganizationDataService.AddQuickNavigation", { para: data });
}
//删除一级收藏导航
InforCenter_Platform_Navigation_StandardDeleteQuickNavigation = function (ctrlEvent) {
    HoteamUI.DataService.Call("InforCenter.Organization.OrganizationDataService.RemoveQuickNavigation", { para: { NavigationID: ctrlEvent.customname} });
}
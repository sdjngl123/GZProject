
//页面底部初始化
InforCenter_Platform_ClassicHomePageBottom_Init = function (ctrlEvent) {
    var pageDom = $("[cid='ClassicHomePage_Bottom']")[0];
    if (HoteamUI.Common.IsNullOrEmpty(pageDom) == false) {
        ctrlEvent.o.LoadTemplate("ClassicHomePageBottom");
        InforCenter_Platform_ClassicHomePageBottom_SetLang("Help");
        $("#Help").click(function () {
            InforCenter_Platform_ClassicHomePageBottom_OnClick("Help");
        }
        );
        InforCenter_Platform_ClassicHomePageBottom_SetLang("About");
        $("#About").click(function () {
            InforCenter_Platform_ClassicHomePageBottom_PopUp("About");
        }
        );
        InforCenter_Platform_ClassicHomePageBottom_SetLang("ServiceAndLaw");
        $("#ServiceAndLaw").click(function () {
            InforCenter_Platform_ClassicHomePageBottom_PopUp("ServiceAndLaw");
        }
        );
        if (HoteamUI.Common.IsNullOrEmpty($("#RightInfo")[0]) == false) {
            $("#RightInfo")[0].innerHTML = HoteamUI.Language.Lang("Common.Copyright");
        }
    }
}
InforCenter_Platform_ClassicHomePageBottom_SetLang = function (label) {
    var dom = $("#" + label)[0];
    if (HoteamUI.Common.IsNullOrEmpty(label) == false && HoteamUI.Common.IsNullOrEmpty(dom) == false) {
        var lang = HoteamUI.Language.Lang("ClassicHomePageBottom", label);
        dom.innerHTML = lang;
    }
}
InforCenter_Platform_ClassicHomePageBottom_OnClick = function (id) {
    //获取选中tab页
    var guid = $("[cid='HomePage_Content']").attr("id");
    var pageObject = HoteamUI.Page.Instance(guid);
    var tabsCtrl = pageObject.GetControl("HomePage_Tabs");
    var idx = tabsCtrl.GetSelectedTab();
    if (idx >= 0) {
        var tab = tabsCtrl.GetTabInfoList()[idx];
        var selectTabID = tab.tabId;
        var para = {};
        para.SelectTabID = selectTabID;
        InforCenter_Platform_Navigation_AddTab(id, null, true, null, para);
    } else {
        InforCenter_Platform_Navigation_AddTab(id, null, true);
    }
}
InforCenter_Platform_ClassicHomePageBottom_PopUp = function (id) {
    HoteamUI.UIManager.Popup(id, {}, function (data, ret) { }, {});
}
InforCenter_Platform_About_OKOnClock = function (ctrlEvent) {
    var ret = { confirm: "OK" }
    var pid = ctrlEvent.o.ContainerID();
    HoteamUI.UIManager.Return(pid, ret);
}
InforCenter_Platform_ServiceAndLaw_OKOnClock = function (ctrlEvent) {
    var ret = { confirm: "OK" }
    var pid = ctrlEvent.o.ContainerID();
    HoteamUI.UIManager.Return(pid, ret);
}

//加载导航
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
    PlatformUI.NavigationData = data;
    if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
        ctrlEvent.o.LoadItems(data);
    }

}

InforCenter_Platform_ClassicHomePageNavigation_LoadNavigationAddModelItems = function (data) {
    var item = {}, data = data;

    for (var length = data.length, i = (length - 1) ; i >= 0; i--) {
        item = data[i];
        if (item.IsAddCustom === true) {
            item.ShowMode = "AddNewCustomModel";
            if (item.Children && item.Children.length > 0) {
                InforCenter_Platform_ClassicHomePageNavigation_LoadNavigationAddModelItems(item.Children);
            }
        }
        else {
            data.splice(i, 1)
        }
    }

    return data;
}

//导航栏点击事件
InforCenter_Platform_ClassicHomePageNavigation_NavigationOnClick = function (ctrlEvent) {

    var itemOption = ctrlEvent.opt;
    if (itemOption.ShowMode === "AddNewCustomModel") {
        var newOption = JSON.parse(JSON.stringify(itemOption));
        newOption.ShowMode = "CustomNav";
        var flag = ctrlEvent.o.AddTopItem(newOption, -1);
        if (flag) {
            InforCenter_Platform_Navigation_AddCustomNavigation(ctrlEvent.name);
        }
        return;
    }
    InforCenter_Platform_Navigation_AddTab(ctrlEvent.value, ctrlEvent.text, false, ctrlEvent.name, ctrlEvent.param, itemOption.JSMethod);
}

//导航栏关闭点击事件
InforCenter_Platform_ClassicHomePageNavigation_NavigationRemoveOnClick = function (ctrlEvent) {

    InforCenter_Platform_Navigation_RemoveCustomNavigation(ctrlEvent.name);
}

//通过js代码自动打开导航功能
InforCenter_Platform_AutoOpenNavigation = function (params) {
    var nav = $("[cid=ClassicHomePage_Navigation]");
    var data = PlatformUI.NavigationData;
    InforCenter_Platform_ClassicHomePageNavigation_SelectChildNav(data, nav.find("li.ui-accordion-header"), params);
}
//如果当前childData子集里没有默认选中的，那么默认选中第一个，如果有，则选中设置的
InforCenter_Platform_ClassicHomePageNavigation_SelectChildNav = function (childData, ele, params) {
    $(ele).find(".ui-accordion-content").css("display", "none");
    $(ele).find(".ui-accordion-header-title .ui-li-position").removeClass("b-angle-up").addClass("b-angle-down");
    for (var k = 0; k < childData.length; k++) {
        if (childData[k].Select) {
            //将当前的这个select置为false
            childData[k].Select = false; 
            //如果有多级导航，则触发下级导航选择事件
            if (childData[k].Children && childData[k].Children.length > 0) {
                InforCenter_Platform_ClassicHomePageNavigation_SelectChildNav(childData[k].Children, $(ele).eq(k).children("ul").children("li"), params);
            }
            if ($(ele).eq(k).children("ul").length == 0 || $(ele).eq(k).children("ul").css("display") == "none") {
                $(ele).eq(k).trigger("click", params);
            }
        }
    }
    childData[0].Select = true; //恢复为默认选中第一个
}


InforCenter_Platform_ServiceAndLaw_CtrlInit = function (ctrlEvent) {
    ctrlEvent.o.SetText(HoteamUI.Language.Lang("ServiceAndLaw.Clause"));
}

InforCenter_Platform_About_CtrlInit = function (ctrlEvent) {
    ctrlEvent.o.SetText(HoteamUI.Language.Lang("About.Content"));
}
InforCenter_Platform_ClassicHomePageQuickNav_QuickOnCreate = function (pageEvent) {
    //初始化快捷菜单的右键菜单控件
    InforCenter_Platform_QuickRightMenuCtrl = pageEvent.o.GetControl("RightMenu");
}
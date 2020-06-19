/******************************************************************************
*    Copyright (c) 2012,山东山大华天软件有限公司
*    All rights reserved.
*
*    文件名称： QuickNavigation.js
*
*    创 建 人： 李士利
*    创建日期： 2013-01-01
*    初始版本： 1.0
*
*    修 改 人： 李士利
*    修改日期： 2013-01-01
*    当前版本： 1.0
******************************************************************************/
InforCenter_Platform_ClassicHomePageQuickNav_LoadNavigationItems = function (ctrlEvent) {
    var userQuickNavigationList = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GetUserQuickNavigationList", { "QuickType": "TopLevel" });
    if (userQuickNavigationList && userQuickNavigationList.length > 0) {
        for (var i = 0; i < userQuickNavigationList.length; i++) {
            InforCenter_Platform_QuickNavigation_AddQuickNavigationOnPage(userQuickNavigationList[i]);
        }
    }
    //拖动排序方法
    $(".QuickNavigation").sortable({
        placeholder: "draggablehover",
        axis: "y",
        stop: function () {
            var result = [];
            $(".QuickNavigation").children("li").map(function (index, value) {
                result.push(value.id.substring(2));
            });
            InforCenter_Platform_QuickNavigation_UpdateQuickNavigationSort(result);
        }
    }).disableSelection();
}

//快捷导航排序
InforCenter_Platform_QuickNavigation_UpdateQuickNavigationSort = function (result) {
    //若只有一个，不需要向数据库操作。
    if (result.length > 1) {
        HoteamUI.DataService.Call("InforCenter.Organization.OrganizationDataService.UpdateQuickNavigationSort", { para: { SortResult: result} });
    }
}

//InforCenter_Platform_QuickNavigation_UpdateQuickNavigation = function (navigation, callBack) {
    //var isAdded = HoteamUI.DataService.Call("InforCenter.Organization.OrganizationDataService.UpdateQuickNavigation", { para: navigation });
    //if (isAdded == true) {
        //if ($.isFunction(callBack)) {
      //      callBack();
    //    }
  //  }
//}

//添加快捷菜单
InforCenter_Platform_QuickNavigation_AddQuickNavigation = function (navigation, callBack, QuickType) {
    QuickType = QuickType || "Module";
    var data = {};
    if (typeof (navigation) == "string") {
        data = { NavigationID: navigation };
    }
    else {
        data = navigation;
    }
    data.QuickType = QuickType;
    var navID = HoteamUI.DataService.Call("InforCenter.Organization.OrganizationDataService.AddQuickNavigation", { para: data });
    if (navID != "") {
        var newNavigation = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GetNavigationItemByName", { para: { Name: navID} });
        if (HoteamUI.Common.IsNullOrEmpty(newNavigation) == false) {
            if ($.isFunction(callBack)) {
                callBack(newNavigation);
            }
            else {
                var QuickModel = {};
                QuickModel.PageName = newNavigation.PageName;
                if (HoteamUI.Common.IsNullOrEmpty(newNavigation.PagePara) == false) {
                    QuickModel.Url = QuickModel.PageName + "?" + newNavigation.PagePara;
                }
                QuickModel.ImageSrc = newNavigation.Image;
                QuickModel.Text = HoteamUI.Language.Lang("NavigationItems", navID) || data.Text;
                QuickModel.QuickType = QuickType;
                QuickModel.ID = navID;
                QuickModel.PagePara = newNavigation.PagePara;
                InforCenter_Platform_QuickNavigation_AddQuickNavigationOnPage(QuickModel);
            }
        }
    }
}
//InforCenter_Platform_QuickNavigation_UpdateQuickNavigation = function (navation, callBack) {
  //  HoteamUI.DataService.Call("InforCenter.Organization.OrganizationDataService.UpdateQuickNavigation", { para: navation });

//}


//从页面添加快捷菜单
InforCenter_Platform_QuickNavigation_AddQuickNavigationOnPage = function (QuickModel) {
    var navigationID = QuickModel.ID, navigationUrl = QuickModel.Url, navigationType = QuickModel.QuickType,
        navigationImageSrc = QuickModel.ImageSrc, navigationText = QuickModel.Text;
    if (!navigationUrl) return;
    var navigationList = $(".QuickNavigation");
    var existLi = navigationList.find("#li" + navigationID);
    if (existLi && existLi.length > 0) {
        return;
    }
    //创建我的收藏下拉
    var $container = $(".HomePage_Collection");
    if ($container.length == 0) {
        $container = $('<div class="HomePage_Collection"><div class="HomePage_Collection_c"><ul class="QuickNavigation"></ul></div></div>');
        $container.appendTo("body");
        //给我的收藏注册事件
        $(".HomePage_Collection_Container").on("mouseenter", function () {
            var pos = $(this).offset();
            var col = $(".HomePage_Collection");
            col.css("left", pos.left).css({ "top": 38, "max-height": $(window).height() - 65 });
            var lis = col.find("li");
            var height = (lis.eq(0).outerHeight()) * (lis.length);
            $(col).show().css("height",height+2);
        }).on("mouseleave", function (e) {
            if ($(e.toElement).hasClass("HomePage_Collection") || $(e.toElement).closest(".HomePage_Collection").length > 0) {
                return false;
            }
            $(".HomePage_Collection").hide();
        });
        $(".HomePage_Collection").on("mouseleave", function (e) {
            if ($(e.toElement).hasClass("HomePage_Collection_Container") || $(e.toElement).closest(".HomePage_Collection_Container").length > 0) {
                return false;
            }
            $(this).hide();
        });
    }
    var li =
            '<li>' +
                    navigationText +
                    '<span class="collect-trash basesprite b-trash"></span>'
    '</li>';
    $li = $(li).data("QuickModel", QuickModel).attr("id", "li" + navigationID);
    //注册事件
    $li.on("click", function (e) {
        if (navigationType == "Module") {
            InforCenter_Platform_Navigation_AddTab($(this).data("QuickModel").Url, $(this).data("QuickModel").Text);
        }
        else {
            InforCenter_Platform_OpenQuick($(this).data("QuickModel"));
        }
        e.stopPropagation();
    }).on("mouseover", function () {
        $(this).find(".collect-trash").css("display", "block");
    }).on("mouseout", function () {
        $(this).find(".collect-trash").css("display", "none");
    });
    //删除收藏事件
    $li.find(".collect-trash").on("click", function (e) {
        var li = $(this).closest("li");
        InforCenter_Platform_QuickNavigation_RemoveQuickNavigation(li.data("QuickModel").ID, li);
        e.stopPropagation();
    }).on("mouseenter", function () {
        $(this).removeClass("b-trash").addClass("b-blue-trash");
    }).on("mouseleave", function () {
        $(this).removeClass("b-blue-trash").addClass("b-trash");
    });
    $container.find("ul").append($li);
}

//移除快捷菜单
InforCenter_Platform_QuickNavigation_RemoveQuickNavigation = function (navigationID, callbackordeleteobj) {
    var isDeleted = HoteamUI.DataService.Call("InforCenter.Organization.OrganizationDataService.RemoveQuickNavigation", { para: { NavigationID: navigationID} });
    if (isDeleted == true) {
        if ($.isFunction(callbackordeleteobj)) {
            callbackordeleteobj();
        }
        else {
            callbackordeleteobj.remove();
        }
    }
}

//快捷菜单往左滚动
InforCenter_Platform_QuickNavigation_MoveBack = function () {
    var navigationList = $(".QuickNavigation_MenuList");
    var liAll = navigationList.find("li");
    var liLast = null;
    var liToFirst = null;
    if (liAll.length > 0) {
        liLast = $(liAll[liAll.length - 1]);
        liToFirst = liLast.clone(true, true);
        liLast.remove2();
    }
    if (liToFirst) {
        navigationList.prepend(liToFirst);
    }
}

//快捷菜单往右滚动
InforCenter_Platform_QuickNavigation_MoveForward = function () {
    var navigationList = $(".QuickNavigation_MenuList");
    var liAll = navigationList.find("li");
    var liFirst = null;
    var liToLast = null;
    if (liAll.length > 0) {
        liFirst = $(liAll[0]);
        liToLast = liFirst.clone(true, true);
        liFirst.remove2();
    }
    if (liToLast) {
        navigationList.append(liToLast);
    }
}


/*\
*{
*   ObjectType:{
*        click:functionName,
*        rightMenu:menuName     
*   }
*}
\*/
var QuickNavOptions = {
    EITEM: {
        rightMenu: "ItemManagementRightMenuForQuickNav"
    }
};
function InforCenter_Platform_QuickNav_Add(para) {
    if (para.length > 1) {  //是菜单返回的参数
        para = para[1];
    }
    var Content = para.Content;
    var NAME = para.Text;
    var callBack = undefined;
    var QuickNavType = para.QuickNavType || "Object";
    var ICON = para.Icon || "";
    var row = 0;
    var column = 0;

    switch (HoteamUI.Security.LoginPara.HomePageMode) {
        case "DesktopHomePage":
            var position = PlatformUI.Desktop.__searchNextEmpty(0, 0);
            row = position.row;
            column = position.column;
            callBack = function (app) {

                PlatformUI.Desktop.__createApp({
                    ID: app.Name,
                    ImageSrc: app.Image,
                    PagePara: app.PagePara,
                    Text: NAME,
                    Url: app.PageName + "?" + NAME,
                    QuickType: QuickNavType
                });
            }
            break;
        case "OriginalityHomePage":
            callBack = function (app) {

                MenuPreviewCreateQuickNav({
                    ID: app.Name,
                    ImageSrc: app.Image,
                    PagePara: app.PagePara,
                    Text: NAME,
                    Url: app.PageName + "?" + NAME,
                    QuickType: QuickNavType
                });
            }
            break;
        default: break;
    }
    InforCenter_Platform_QuickNavigation_AddQuickNavigation({
        Row: row,
        Column: column,
        QuickType: QuickNavType,
        Text: NAME,
        Content: Content,
        Image: ICON
    }, callBack, QuickNavType);
}
function InforCenter_Platform_OpenQuick(appinfo, isAdd) {
    switch (appinfo.QuickType) {
        case "Object":
            var EID = appinfo.PagePara;
            var ObjectType = EID.substring(0, EID.indexOf("_"));
            if (QuickNavOptions[ObjectType]) {
                var click = QuickNavOptions[ObjectType].click;
                if (click) {
                    click(EID);
                    return;
                }
            }
            HoteamUI.UIManager.Popup({
                pagename: "ViewObject",
                paras: { SelectID: appinfo.PagePara }
            });
            break;
        case "JSMethod":
            eval(appinfo.PagePara);
            break;
        default:
            InforCenter_Platform_MainTabs_AddTab(appinfo.PageName, JSON.parse(appinfo.PagePara), appinfo.Text, isAdd, undefined, { name: appinfo.ID, text: appinfo.Text, icon: appinfo.ImageSrc });
            break;
    }
}

//快捷菜单邮件菜单控件，由各个模式的Init方法中进行指定。
var InforCenter_Platform_QuickRightMenuCtrl = null;
//用于记录当前右键菜单的对象信息
var InforCenter_Platform_QuickRightMenuData = null;
//快捷导航刷新方法，由各个模式的Init方法指定刷新方式
var InforCenter_Platform_QuickRefeshData = null;
//右键菜单
function InforCenter_Platform_QuickRightMenu(appinfo, position) {
    switch (appinfo.QuickType) {
        case "Object":
            var EID = appinfo.PagePara;
            var ObjectType = EID.substring(0, EID.indexOf("_"));
            if (QuickNavOptions[ObjectType]) {
                var rightMenu = QuickNavOptions[ObjectType].rightMenu;
                if (rightMenu && typeof rightMenu == "string") {

                    //清空菜单
                    InforCenter_Platform_QuickRightMenuCtrl.ClearItems();

                    //重新加载菜单项
                    var rightmenudata = InforCenter_Platform_GetMenus(rightMenu).Menus;
                    InforCenter_Platform_QuickRightMenuCtrl.LoadItems(rightmenudata, "", rightMenu);

                    //设值
                    HoteamUI.Page.SetContainerParas(InforCenter_Platform_QuickRightMenuCtrl.OtherControl("RightMenu_Container").id, "RightMenuCtrl", {});
                    InforCenter_Platform_QuickRightMenuData = EID;
                    var $rightmenu = $("#" + InforCenter_Platform_QuickRightMenuCtrl.id + "_RightMenu");
                    if ($rightmenu.find("li").length) {
                        $rightmenu.css({
                            top: position.top,
                            left: position.left
                        });
                        $rightmenu.show();
                    }

                }
            }
            break;
    }
}





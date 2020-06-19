//定义全局变量，作为平台通用js接口的入口
var PlatformUI = {};
PlatformUI.UIManager = {};
//应用服务调用所在webservice服务路径
PlatformUI.WebServicePath = PageInit.WebRootPath + "/Platform/PlatformService.asmx/";
PlatformUI.UIManager.NoPermission = "NoPermission";
HoteamUI.UIManager.PopupAdjust.push(function (argus) {
    var pagename = argus.pagename;
    var changesize = argus.size ? false : true;
    var isPage = true;
    if (pagename == "CreateObject") {
        pagename = argus.paras.ObjectType + "-CREATE";
    }
    else if (pagename == "EditObject") {
        var ObjectID = argus.paras.SelectID;
        var ObjectType = ObjectID.split("_")[0];
        pagename = ObjectType + "-EDIT";
    }
    else if (pagename == "ViewObject") {
        var ObjectID = argus.paras.SelectID;
        var ObjectType = ObjectID.split("_")[0];
        var links = InforCenter_Platform_GetTreeManagePageLinksByObjType(ObjectType);
        if (links != null && links.length > 0) changesize = false;
        pagename = ObjectType + "-VIEW";
    } else if (pagename == "CopyObject") {
        var ObjectID = argus.paras.SelectID;
        var ObjectType = ObjectID.split("_")[0];
        pagename = ObjectType + "-COPY";

    } else if (pagename == "TreeCommonQuery") {
        isPage = false;
        argus.title = HoteamUI.Language.Lang("TreeCommonQuery", argus.paras.ItemName);
        if (HoteamUI.Common.IsNullOrEmpty(argus.title) == true) {
            argus.title = HoteamUI.Language.Lang("TreeCommonQuery.Title");
        }
    } else if (pagename == "ListCommonQuery") {
        isPage = false;
        argus.title = HoteamUI.Language.Lang("ListCommonQuery", argus.paras.ItemName);
        if (HoteamUI.Common.IsNullOrEmpty(argus.title) == true) {
            argus.title = HoteamUI.Language.Lang("ListCommonQuery.Title");
        }
    }
    else {
        return;
    }
    if (isPage) {
        if (!argus.paras.FormBuilder || argus.paras.FormBuilder != 'true') {
            var pageconfig = HoteamUI.UIManager.GetPageConfig(pagename);
            if (HoteamUI.Common.IsNullOrEmpty(argus.title) == true) {
                argus.title = HoteamUI.Language.Lang(pageconfig.PageOptions.title);
            }
            if (changesize) {
                var w = 0, h = 0;
                if (pagename.indexOf("-VIEW") > -1) {//如果当前页面是查看页面
                    //35为弹出框头部高度，30为viewpage页面的内部padding值
                    h = parseInt(pageconfig.PageOptions.height) + 35 + 30;
                } else {//35为弹出框头部高度，60为底部按钮高度,1为按钮上部的一条横线,10为page的内部padding值
                    h = parseInt(pageconfig.PageOptions.height) + 35 + 60 + 1 + 20;
                }
                var w = parseInt(pageconfig.PageOptions.width) + 20;
                if (w < 400) w = 400;
                if (h < 250) h = 250
                argus.size = w + "*" + h;
            }
        }
    }
});

InforCenter_Platform_GetTreeManagePageLinksByName = function (pageLinksName) {
    var con = {};
    $.each(PageLinkScript, function (index, val) {
        if (val.PageLinksName == pageLinksName)
            con = val;
    });
    var data = {};

    if (HoteamUI.Common.IsNullOrEmpty(con.PageLinksName) == true) {
        con.PageLinks = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GetPageLinkByName", { para: { Name: pageLinksName } });
        if (con != null && con.PageLinks) {
            con.PageLinksName = pageLinksName;
            PageLinkScript.push(con);
            data.PageLinks = con.PageLinks;
            data.HideTitle = con.HideTitle;
            data.GetLinksItemJS = con.GetLinksItemJS;
        }
    }
    else {
        if (con != null && con.PageLinks) {
            //   for (var index in con.PageLinks) 
            for (var i = 0; i < con.PageLinks.length; i++) {
                var item = con.PageLinks[i];
                item.Text = HoteamUI.Language.Lang("PageLinkItems", item.Name);
            }
            data.PageLinks = con.PageLinks;
            data.HideTitle = con.HideTitle;
            data.CheckContentPermission = con.CheckContentPermission;
            data.TabSelectedIndex = con.TabSelectedIndex;
            data.GetLinksItemJS = con.GetLinksItemJS;
        }
    }

    return data;
};

InforCenter_Platform_GetTreeManagePageLinksByObjType = function (objTypeName) {
    var con = {};
    $.each(PageLinkScript, function (index, val) {
        if (val.ObjectType == objTypeName)
            con = val;
    });
    var data = {};
    if (HoteamUI.Common.IsNullOrEmpty(con.ObjectType) == true) {
        con.PageLinks = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GetPageLinkByObjectType", { para: { Name: objTypeName } });
        if (con != null && con.PageLinks) {
            con.ObjectType = objTypeName;
            PageLinkScript.push(con);
            data.PageLinks = con.PageLinks;
            data.HideTitle = con.HideTitle;
            data.GetLinksItemJS = con.GetLinksItemJS;
        }
    }
    else {
        if (con != null && con.PageLinks) {
            //  for (var index in con.PageLinks) {
            for (var i = 0; i < con.PageLinks.length; i++) {
                var item = con.PageLinks[i];
                item.Text = HoteamUI.Language.Lang("PageLinkItems", item.Name);
            }
            data.PageLinks = con.PageLinks;
            data.HideTitle = con.HideTitle;
            data.CheckContentPermission = con.CheckContentPermission;
            data.TabSelectedIndex = con.TabSelectedIndex;
            data.GetLinksItemJS = con.GetLinksItemJS;
        }
    }

    return data;
};

InforCenter_Platform_GetMenus = function (menuName, page, para) {
    var Menus = null;
    var con = {};
    $.each(MenuItemScript, function (index, val) {
        if (val.MenuName == menuName)
            con = val;
    });
    if (HoteamUI.Common.IsNullOrEmpty(con.MenuName) == true) {
        con.Menus = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GetMenuItemByName", { para: { Name: menuName } });
        if (con.Menus != null) {
            con.MenuName = menuName;
            MenuItemScript.push(con);
            Menus = con.Menus;
            if (HoteamUI.Common.IsNullOrEmpty(page) == false) {
                Menus = InforCenter_Platform_FilterMenus(Menus, page, para);
            }
            InforCenter_Platform_GetMenusDictionary(Menus, con.MenuName);
        }
    }
    else {
        if (con != null && con.Menus) {
            Menus = con.Menus;
            if (HoteamUI.Common.IsNullOrEmpty(page) == false) {
                Menus = InforCenter_Platform_FilterMenus(Menus, page, para);
            }
            InforCenter_Platform_GetMenusDictionary(Menus, con.MenuName);
        }
    }
    return { Menus: Menus, Type: con.Type, Issplit: con.Issplit };
};

InforCenter_Platform_FilterMenus = function (Menus, page, para) {
    function RescursionMenu(webAction, pagePath) {
        //如果菜单有下级元素，应该直接递归
        for (var item = webAction.Children.length - 1; item >= 0; item--) {
            var info = webAction.Children[item];
            var list = webAction.PathTag.split(";");
            list.unshift(info.Value);
            var path = list.join(";") + pagePath;
            if (CheckMenuItem(path, info.Value)) {
                webAction.Children.splice(item, 1);
            } else if (info.Children.length > 0) {
                info.PathTag = info.Value + ";" + webAction.PathTag;
                RescursionMenu(info, pagePath);
            }
        }
    }
    function CheckMenuItem(path, value) {
        var deny = false;
        // for (var infoAttr in PlatformUI.Permission) {
        for (var i = 0; i < PlatformUI.Permission.length; i++) {
            var info = PlatformUI.Permission[i];
            if (info.Name == value && path == info.Path) {
                deny = true;
                break;
            }
        }
        return deny;
    }

    var menu = JSON.parse(JSON.stringify(Menus));
    //通用页面，如ListManagement
    var parentPid = HoteamUI.Page.ParentPage(page.pid);
    var pPage = HoteamUI.Page.Instance(parentPid);
    var pPara = pPage.GetPara();
    if (!HoteamUI.Common.IsNullOrEmpty(pPara.Url)) {
        var pagePath = (para ? ';' + para.ObjType : "") + ';' + pPara.Url.reverse().join(";");
        for (var item = menu.length - 1; item >= 0; item--) {
            var info = menu[item];
            var path = info.Value + pagePath;
            if (CheckMenuItem(path, info.Value)) {
                //说明顶级菜单没有权限，那么下级就不用判断
                menu.splice(item, 1);
            } else if (info.Children.length > 0) {
                info.PathTag = info.Value;
                RescursionMenu(info, pagePath);
            }
        }
    }
    return menu;
}

InforCenter_Platform_GetMenusDictionary = function (Menus, MenuName) {
    if (Menus) {
        //for (var index in Menus) {
        for (var index = 0; index < Menus.length; index++) {
            var item = Menus[index];
            if (item.TextId.indexOf('.') > 0)
                item.Text = HoteamUI.Language.Lang(item.TextId);
            else {
                item.Text = HoteamUI.Language.Lang(MenuName, item.TextId, false);
            }
            if (HoteamUI.Common.IsNullOrEmpty(item.Text)) {
                item.Text = HoteamUI.Language.Lang("MenuItems", item.TextId);
            }
            InforCenter_Platform_GetMenusDictionary(item.Children, MenuName);
        }
    }
}

InforCenter_Platform_GetMenuDropDownData = function (actionName) {
    var con = {};
    $.each(MenuItemDropDownDataScript, function (index, val) {
        if (index == actionName)
            con = val;
    });
    return con;
};
InforCenter_Platform_GTypeFromID = function (id) {
    var type = "";
    if (id) {
        var index = id.indexOf("_");
        if (index > 0) {
            type = id.substring(0, index);
        }
    }
    return type;
}

InforCenter_Platform_OrganizationSelecter = function (defaultValue, pageMode, selectMode, callback, ctrlID) {
    HoteamUI.UIManager.Popup("TreeCommonQuery", { Value: defaultValue, ItemName: pageMode, LoadAndSelectType: selectMode }, callback, { id: ctrlID, selectMode: pageMode }, "560*600");
}

InforCenter_Platform_GetFileUrl = function (VaultName, Path) {
    var urlString = HoteamUI.DataService.Call("Inforcenter.FileManage.FileManageService.GetHttpUrl", { vaultName: VaultName, filePath: Path });
    return urlString;
}
$.fn.ShowFlash = function () {
    var embed = $(this);
    var ValutName = embed.attr("vaultname");
    var Path = embed.attr("path");
    embed.attr("src", InforCenter_Platform_GetFileUrl(ValutName, Path));
}

//通过ticks获取平台制定格式的时间
//参数：type选项 datetime、date
InforCenter_Platform_GetDateTimeByTicks = function (ticks, type) {
    return $.hoteamDateTime.getDateTimeByTicks(ticks, type);
}

//通过时间获取ticks
//参数：type选项 datetime、date
InforCenter_Platform_GetTicksByDateTime = function (datetime, type) {
    return $.hoteamDateTime.getTicksByDateTime(datetime, type);
}

//合并参数，组成路径用
HoteamUI.UIManager.MergeUrl = function (pageName, para) {
    if (para instanceof Object) {
        para.Url = para.Url || [para.navName];
        var item;
        switch (pageName) {
            case "ListManagement":
            case "TabManagement":
            case "TreeManagement":
                item = para.ItemName;
                break;
            case "ObjectInspector":
                item = para.ObjectType;
                break;
            default:
                item = pageName;
                break;
        }
        para.Url.push(item);
    }
}
//导入文件
PlatformUI.UIManager.ImportFile = {};
PlatformUI.UIManager.ImportFile.Call = function (servicepath, wcfparas, paras, callback) {
    HoteamUI.UIManager.Popup({
        pagename: "ImportPage",
        paras: { wcfpath: servicepath, wcfpara: wcfparas, para: paras || {} },
        callback: function (data, ret) {
            if (callback) {
                callback(ret);
            }
        }
    });
}

//导出文件
PlatformUI.UIManager.ExportFile = {};
PlatformUI.UIManager.ExportFile.Call = function (servicepath, wcfparas, paras, callback) {
    paras = paras || {};
    wcfparas = JSON.stringify(wcfparas);
    paras.webservice = "ExportFile";
    HoteamUI.UIManager.Popup({
        pagename: "ExportPage",
        paras: { wcfpath: servicepath, wcfpara: wcfparas, para: paras },
        callback: function (data, ret) {
            if (callback) {
                callback(ret);
            }
        }
    });
}
PlatformUI.UIManager.ExportPdfFile = {};
PlatformUI.UIManager.ExportPdfFile.Call = function (servicepath, wcfparas, paras, callback) {
    paras = paras || {};
    wcfparas = JSON.stringify(wcfparas);
    paras.webservice = "ExportPdfFile";
    HoteamUI.UIManager.Popup({
        pagename: "ExportPage",
        paras: { wcfpath: servicepath, wcfpara: wcfparas, para: paras },
        callback: function (data, ret) {
            if (callback) {
                callback(ret);
            }
        }
    });
}
//按照模板导出文件
PlatformUI.UIManager.ExportFileByTemplate = {};
PlatformUI.UIManager.ExportFileByTemplate.Call = function (servicepath, wcfparas, paras, callback) {
    paras = paras || {};
    wcfparas = JSON.stringify(wcfparas);
    paras.webservice = "ExportFileByTemplate";
    HoteamUI.UIManager.Popup({
        pagename: "ExportPage",
        paras: { wcfpath: servicepath, wcfpara: wcfparas, para: paras },
        callback: function (data, ret) {
            if (callback) {
                callback(ret);
            }
        }
    });
}

//导出列表数据
PlatformUI.UIManager.ExportFileFromGrid = {};
PlatformUI.UIManager.ExportFileFromGrid.Call = function (servicepath, wcfparas, callback) {
    var paras = {};
    wcfparas = JSON.stringify(wcfparas);
    paras.webservice = "ExportFileFromGrid";
    paras.filetype = "Excel";
    HoteamUI.UIManager.Popup({
        pagename: "ExportPage",
        paras: { wcfpath: servicepath, wcfpara: wcfparas, para: paras },
        callback: function (data, ret) {
            if (callback) {
                callback(ret);
            }
        }
    });
}

//定义一个变量，用来存储导航数据
PlatformUI.NavigationData = null;
//smart模式下触发导航点击,参数解释（params：page页所需参数,navParams：导航路径参数）
//参数规格（navParams：["","",""]从前往后，依次为1级，2级，3级导航的name
InforCenter_Platform_TriggerNavigationClick = function (navParams, params) {
    //遍历将PlatformUI.NavigationData各级菜单的需要选择项的Select置为true
    InforCenter_Platform_SetNavigationData(navParams, PlatformUI.NavigationData, 0);
    //触发一级菜单
    for (var i = 0; i < PlatformUI.NavigationData.length; i++) {
        if (PlatformUI.NavigationData[i].Select) {
            var name = PlatformUI.NavigationData[i].Name;
            if (HoteamUI.Security.LoginPara.HomePageMode == "SmartHomePage") {
                $(".hoteam-smartaccordion").find("ul li div[customname='" + name + "']").trigger("click", params);
            } else if (HoteamUI.Security.LoginPara.HomePageMode == "ClassicHomePage") {
                InforCenter_Platform_AutoOpenNavigation(params);
            }
        }
    }
}
//将PlatformUI.NavigationData各级菜单的需要选择项的Select置为true
InforCenter_Platform_SetNavigationData = function (navParams, navData, m) {
    for (var i = 0; i < navData.length; i++) {
        navData[i].Select = false;
        if (navData[i].Name == navParams[m]) {
            navData[i].Select = true;
            if (navData[i].Children.length > 0) {
                InforCenter_Platform_SetNavigationData(navParams, navData[i].Children, m + 1);
            }
        }
    }
}

//覆盖MsgBox实现
HoteamUI.UIManager.MsgBox = function (msg, detailmsg, iserr, callback) {
    if (HoteamUI.Common.IsNullOrEmpty(detailmsg) == false) {
        HoteamUI.UIManager.Popup("Message", { msg: msg, detailmsg: detailmsg, iserr: iserr, minWindow: false, maxWindow: false }, callback, null);
    }
    else {
        var options = { timeout: 3000, text: msg, type: 'success', layout: 'topCenter', callback: { onShow: callback } };

        if (HoteamUI.Common.OCXIframe.IsExist()) {
            options.layout = 'topCenterByOCX';
        } else {
            msg = msg.replace(/[\n][\r]/g, function () { return '</br>' }).replace(/[\r][\n]/g, function () { return '</br>' });//.replace(/[\n|\r]/g, function () { return '</br>' })
        }

        HoteamUI.UIManager.noty(options);
    }
}

//处理内部异常信息
HoteamUI.UIManager.HandelInnerException = function (msg, detialmsg, containerid, order) {

    var callback = function (data, ret) {

        InforCenter_Platform_MenuCtrl_InnerReceiveServerData({ ContainerID: containerid, Order: order }, { confirm: "OK" });
    };

    HoteamUI.UIManager.Popup("Confirm", { msg: msg, detailmsg: detialmsg, iserr: false }, callback, null);

};


PlatformUI.Interval = {};

PlatformUI.Interval.Time = parseInt(HoteamUI.AppSets.InstantMessageInterval) * 1000;
PlatformUI.Interval.SetInterval = function () {
    var callLength = ClientTimers.length;
    var callArray = [];
    for (var i = 0; i < callLength; i++) {
        //判断当前的对象是否可调用，比如没有登录时不执行该对象
        if (ClientTimers[i].FilterFunction && typeof window[ClientTimers[i].FilterFunction] == "function" && window[ClientTimers[i].FilterFunction]()) {
            callArray.push(ClientTimers[i]);
        }
    }
    //如果没有需要执行的前台定时器，则不需要连后台
    if (callArray.length > 0) {
        HoteamUI.CallAjax.AsyncCall({
            servicepath: PlatformUI.WebServicePath,
            method: "GetIntervals",
            paras: { para: { ClientTimers: callArray } },
            showErrorMessage: false,
            callback: function (data, callcackpara) {
                if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
                    // for (var item in data.ClientTimers) {
                    for (var index = 0; index < data.ClientTimers.length; index++) {
                        var timer = data.ClientTimers[index];
                        if (timer && window[timer.CallBackFunction] && typeof window[timer.CallBackFunction] == "function") {
                            window[timer.CallBackFunction](timer.Result);
                        }
                    }
                }
            }
        });
    }

    setTimeout(function () {
        PlatformUI.Interval.SetInterval();
    }, PlatformUI.Interval.Time)
}

PlatformUI.Permission = {};
$(function () {
    PlatformUI.Interval.SetInterval();
})


//兼容IE不支持startsWith
String.prototype.startsWith = function (str) {
    if (HoteamUI.Common.IsNullOrEmpty(str) || this.length == 0 || str.length > this.length) {
        return false;
    }
    if (this.substr(0, str.length) == str) {
        return true;
    } else {
        return false;
    }
}

HoteamUI.Common.UpdateSystemSettingsValueByName = function (name, value) {
    var para = { Name: name, Value: value };
    var ret = HoteamUI.DataService.Call("InforCenter.SystemSetting.SystemSettingsService.UpdateSettingsValueByName", { para: para });
    if (ret && ret == true) {
        $.each(HoteamUI.SystemSettings, function (i, e) {
            if (e.ENAME && e.ENAME == name) {
                var settingValue = $.parseJSON(e.SETTINGVALUE)
                if (settingValue) {
                    settingValue.Value = value;
                    e.SETTINGVALUE = JSON.stringify(settingValue);
                }
            }
        })
    }
    return ret;
}

//获取不支持类型图片的默认显示
HoteamUI.Common.GetBase64DisplayImage = function (src) {
    if (src.indexOf('base64|') === 0) {
        var srcArr = src.split('|');
        var imgType = srcArr[1].toLowerCase();
        var tmp = HoteamUI.Common.GetDefaultDisplayImage(imgType);
        if (tmp != "") {
            src = tmp;
        }
    }
    return src;
}

HoteamUI.Common.GetDefaultDisplayImage = function (imgType, imgSrc) {
    var tmp = "";
    if (imgSrc && imgSrc != "") {
        var dotIndex = imgSrc.indexOf('.');
        if (dotIndex > 0 && dotIndex < imgSrc.length - 1) {
            imgType = imgSrc.substr(dotIndex + 1);
            tmp = imgSrc;
        }
    }

    if (imgType && imgType != "") {
    }
    else {
        return imgSrc;
    }

    var fileSupport = ['jpg', 'png', 'jpeg', 'bmp', 'gif'];
    if ($.inArray(imgType, fileSupport) == -1) {
        var display = HoteamUI.AppSets.Base64DisplayImage;
        if (display) {
            var isSet = false;
            var defaultSet;
            var base64Arr = display.split(';');
            $.each(base64Arr, function (i, vl) {
                var kvp = vl.split(':');
                if (kvp[0] == imgType) {
                    tmp = kvp[1];
                    isSet = true;
                    return false;
                }

                if (kvp[0] == "default") {
                    defaultSet = kvp[1];
                }
            });

            if (isSet == false && defaultSet) {
                tmp = defaultSet;
            }
        }
    }

    return tmp;
}

InforCenter_Platform_ShowSearchHistory = function (btn, input, key) {
    var id = key + "_SearchHistoryUI";
    var ul = $("#" + id);
    $(document).on("mousedown", function (e) {
        ul.hide();
        //HoteamUI.Common.OCXIframe.Hide();
    })
    btn.on("click", function () {
        HoteamUI.Common.OCXIframe.Show();
        if (ul.length == 0) {
            var ulStr = '<ul class="HoteamUI_SearchHistoryUI" id="' + id + '"></ul>';
            $("body").append(ulStr);
        }
        var items = "";
        var ret = JSON.parse($.cookie("searchhistory_" + key));
        if (!HoteamUI.Common.IsNullOrEmpty(ret) && ret.length > 0) {
            for (var i = 0; i < ret.length; i++) {
                items += '<li title="' + ret[i] + '">' + ret[i] + '</li>';
            }
            items += '<li class="HoteamUI_SearchHistoryUI_AllClear">清除历史</li>';
        }
        else {
            items = '<li></li>';
        }
        ul = $("#" + id);
        ul.html("").append(items);
        ul.on("click", "li", function () {
            if ($(this).attr("class") == "HoteamUI_SearchHistoryUI_AllClear") {
                $.cookie("searchhistory_" + key, "[]");
            }
            else {
                var str = $(this).html();
                input.click();
                input.val(str).focus();
                if (str) {
                    input.siblings(".b-close").show();
                }
            }
            ul.hide();
            //HoteamUI.Common.OCXIframe.Hide();
        }).on("mousedown", function () {
            return false;
        });

        var position = input.offset();
        ul.show().css({
            top: position.top + 22,
            left: position.left - 1,
            width: input.parent().parent().width()
        });
    });
}

InforCenter_Platform_SaveSearchHistory = function (key, searchText, limitCount) {
    if (HoteamUI.Common.IsNullOrEmpty(searchText)) {
        return;
    }
    var cookieName = "searchhistory_" + key;
    var histories = JSON.parse($.cookie(cookieName));
    if (HoteamUI.Common.IsNullOrEmpty(histories)) {
        histories = [];
    }
    histories.unshift(searchText);
    var result = [];
    $.each(histories, function (i, el) {
        if ($.inArray(el, result) === -1) {
            result.push(el);
        }
    })
    if (result.length > limitCount) {
        result = result.slice(0, limitCount);
    }
    $.cookie(cookieName, JSON.stringify(result));
}
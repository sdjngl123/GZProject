//重写导航合并点击事件
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
    if (itemOption.IsIntegration && itemOption.LocalSoftwareAddress) {
        InforCenter_Registered_NavIntegration_AddTab(ctrlEvent.value, ctrlEvent.text, false, ctrlEvent.name, ctrlEvent.param, itemOption.JSMethod, itemOption.LocalSoftwareAddress)
    } else {
        InforCenter_Platform_Navigation_AddTab(ctrlEvent.value, ctrlEvent.text, false, ctrlEvent.name, ctrlEvent.param, itemOption.JSMethod);
    }

}
NavIntegration = {};
NavIntegration.WebServicePath = PageInit.WebRootPath + "/Registered/NavIntegration/NavIntegration.asmx/";
InforCenter_Registered_NavIntegration_GetIntegrationNav = function () {
    var company = InforCenter_Platform_Object_GetObjectData(HoteamUI.Security.LoginPara.CompanyID);
    if (company) {
        var url = company.LOCALSOFTWAREADDRESS;
        if (url) {
            data = HoteamUI.CallAjax.Call(NavIntegration.WebServicePath, "RedirectMethod", { para: { ExtendJsonInfo: JSON.stringify({ Url: url + "/Registered/NavIntegration/NavIntegration.asmx/", LocalSoftwareAddress: url, Method: "GetIntegrationNavInfo" }) } });
            if (data) {
                data = JSON.parse(data).d;
            }
            return data;
        }
    }
}

InforCenter_Registered_NavIntegration_AddTab = function (pageUrl, pageText, isAdd, navName, param, jsMethod, url) {
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
        InforCenter_Registered_NavIntegration_AddIntegrationTabfunction("IntegrationIframePage", pageName, para, pageText, isAdd, url);
    }
}

InforCenter_Registered_NavIntegration_AddIntegrationTabfunction = function (pageName, toaddPageName, pagePara, pageText, isAdd, url) {

    pagePara.PageName = toaddPageName;
    pagePara.LocalSoftwareAddress = url;
    pagePara.UserCode = HoteamUI.Security.LoginPara.UserCode;
    pagePara.UserID = HoteamUI.Security.LoginPara.UserID;
    pagePara.UserGroup = HoteamUI.Security.LoginPara.UserGroup;
    pagePara.PageText = pageText;
    pagePara.Password = JSON.parse($.cookie("autoLoginInfo")).Password;
    var guid = $("[cid='HomePage_Content']").attr("id");
    var pageObject = HoteamUI.Page.Instance(guid);
    if (HoteamUI.Common.IsNullOrEmpty(pageName) == false) {
        tabsCtrl = pageObject.GetControl("HomePage_Tabs");
        tabid = pageName;
        if (pagePara.TabId) {
            tabid = pagePara.TabId;
        } else if (pagePara.ItemName) {
            tabid = pagePara.ItemName;
        }
        var tabIndex = tabsCtrl.GetTabIndexByTabId(tabid);
        pagePara.HPTablsID = tabsCtrl.id;
        if (tabIndex == -1 || isAdd == true) {
            var index = tabsCtrl.GetSelectedTab();
            if (index === -1) {
                index = 0;
            }
            else if (index >= 0) {
                ++index;
            }

            tabsCtrl.AddTab({
                pageName: pageName,
                pageParas: pagePara,
                isSelected: true,
                text: pageText,
                tabId: tabid
            }, index);
        } else {
            tabsCtrl.SelectTab(tabIndex);
            //更新页面内容
            tabsCtrl.UpdateTab(tabIndex, {
                pageName: pageName,
                tabId: tabid,
                text: pageText,
                pageParas: pagePara
            });
        }

    }
}
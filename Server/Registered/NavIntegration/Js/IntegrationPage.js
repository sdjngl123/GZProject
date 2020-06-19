InforCenter_NavIntegration_IntegrationPage_OnCreate = function (pageEvent) {
    var para = pageEvent.o.GetPara();
    var arg = {};
    var para = JSON.parse(para.pagePara);
    arg.Password = para.Password;
    arg.UserCode = para.UserCode;
    arg.PageName = para.PageName;
    arg.CompanyID = para.CompanyID;
    arg.UserID = para.UserID;
    arg.UserGroup = para.UserGroup;
    arg.PagePara = para;
    InforCenter_NavIntegration_IntegrationPage_Login(arg)
}

InforCenter_NavIntegration_IntegrationPage_Login = function (arg) {
    if (HoteamUI.Common.IsNullOrEmpty(arg) == false) {
        tmpLoginPara = arg;
        HoteamUI.Trace.Write("debug", "HoteamUI.Security.Login!", arg);

        var localpara = HoteamUI.CallAjax.Call(NavIntegration.WebServicePath, "GetLocalSoftwarePara", { para: { UserCode: arg.UserCode, Password: arg.Password } });
        if (!localpara) {
            return;
        }
        localpara = JSON.parse(localpara);
        
        HoteamUI.Security.LoginPara.LoginID = "";
        HoteamUI.Security.LoginPara.HomePageMode = "ClassicHomePage";
        HoteamUI.Security.LoginPara.LoginDeviceType = "PC";
        HoteamUI.Security.LoginPara.UserID = arg.UserID;
        HoteamUI.Security.LoginPara.UserCode = arg.UserCode;
        HoteamUI.Security.LoginPara.UserGroup = arg.UserGroup;
        HoteamUI.Security.LoginPara.CompanyID = arg.CompanyID;

        if (localpara) {
            HoteamUI.Security.LoginPara.Connect = localpara.Connect;
            HoteamUI.Security.LoginPara.Lang = localpara.Lang;
            HoteamUI.Security.LoginPara.LoginIP = localpara.LoginIP;
            HoteamUI.Security.LoginPara.TimeZone = localpara.TimeZone;
        }

        if (HoteamUI.Common.IsNullOrEmpty(tmpLoginPara) == false
            && HoteamUI.Common.IsNullOrEmpty(tmpLoginPara.para) == false) {
            tmpLoginPara.para.LoginID = arg.LoginID;
            tmpLoginPara.para.LoginDeviceType = "PC";
            var autoLoginInfoString = JSON.stringify(tmpLoginPara.para);
            if (para.AutoLogin == true) {
                $.cookie("autoLoginInfo", autoLoginInfoString, { expires: 10 });
            }
            else {
                $.cookie("autoLoginInfo", autoLoginInfoString);
            }
        }
        clearInterval(InforCenter_Platform_Login_IntervalID);
        //HoteamUI.SystemSettings = JSON.parse(para.SystemSettings);
        //PlatformUI.Permission = JSON.parse(para.Permissions);
        //调用addtab方法
        InforCenter_Registered_NavIntegration_FactoryAddTabfunction(arg.PageName, arg.PagePara, arg.PagePara.PageText, true)
    }
    return true;
}

//工厂端调用加载页面方法
InforCenter_Registered_NavIntegration_FactoryAddTabfunction = function (pageName, pagePara, pageText, isAdd) {

    var guid = $("[cid='HomePage_Content']").attr("id");
    var pageObject = HoteamUI.Page.Instance(guid);
    if (HoteamUI.Common.IsNullOrEmpty(pageName) == false) {
        tabsCtrl = pageObject.GetControl("HomePage_Tabs");
        tabsCtrl.HideAllTitle();
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
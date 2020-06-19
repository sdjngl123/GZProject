InforCenter_ThreeRolePlatformManagement_ThreeRoleLoginPage_OnCreate = function (pageEvent) {
    var para = pageEvent.o.GetPara();
    var ctrl = pageEvent.o.GetControl('Info_Container');
    var pagename = para.LoginPage;
    ctrl.LoadPage(pagename, para);
}

InforCenter_ThreeRolePlatformManagement_ThreeRoleLoginPage_OnOK = function (ctrlEvent) {
    var para = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID()).GetPara();
    var innerPage = HoteamUI.Page.InstanceIn(ctrlEvent.o.ContainerID(), "Info_Container", para.LoginPage);
    var data = {};
    data.PageName = para.LoginPage;
    data.LoginType = para.LoginType;
    data.LoginGuid = para.LoginGuid;
    if (HoteamUI.Page.FirePageEvent(innerPage.pid, "OnCheck", {})) {
        data.Data = HoteamUI.Page.FirePageEvent(innerPage.pid, "OnGetData", {});
    }
    var ret = HoteamUI.DataService.Call("InforCenter.ThreeRolePlatformManagement.ThreeRoleAuthPlatformService.ValidateLoginData", { para: { ExtendJsonInfo: JSON.stringify(data) } });
    if (ret) {
        ret = JSON.parse(ret);
    }
    if (ret && ret.Success == true) {
        //判断是否验证通过，通过后可以进入主页，还是需要弹出另外的登录页面
        if (ret.NextValidateName) {
            //判断是否是用户名密码登录，如果是用户名密码登录，直接提示在登陆页输入用户名和密码，如果不是，弹出新的登录页面
            if (ret.NextValidateName == "UserNameAndPassword") {
                HoteamUI.Security.LoginPara.ThreeRoleLoginGuid = ret.LoginGuid;
                HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("Login.NeedValidateUserAndPassword"));
                HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), { confirm: "OK" });
            } else {
                HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("Login.ValidateSuccessNeedValidateNext").replace('[LoginType]', ret.NextValidateText));
                HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), { confirm: "OK" });
                var loginTypecallback = function (data, ret) {

                }
                var loginPara = {};
                loginPara.LoginPage = ret.NextValidateLoginPageName;
                loginPara.LoginType = ret.NextValidateName;
                loginPara.LoginGuid = ret.LoginGuid;

                loginPara.UserGroupName = para.UserGroupName;
                loginPara.Theme = para.Theme;
                loginPara.Lang = para.Lang;
                loginPara.Connect = para.Connect;
                HoteamUI.UIManager.Popup("ThreeRoleLoginPage", loginPara, loginTypecallback, {});
            }
        } else {
            //验证成功
            var autoLoginOjb = $("#autoLogin");
            var autoLogin = false;
            if (HoteamUI.Common.IsNullOrEmpty(autoLoginOjb) == false
                && autoLoginOjb.attr("checked")) {
                autoLogin = true;
            }
            var ctrUserName = $("#txtUserName");
            var args = {
                para: {
                    UserCode: $.trim(ctrUserName.val()),
                    UserName: LoginUserData.UserName,
                    Theme: para.Theme,
                    UserGroupName: para.UserGroupName,
                    CompanyID: HoteamUI.Security.LoginPara.CompanyID,
                    CompanyName: HoteamUI.Security.LoginPara.CompanyName,
                    AutoLogin: autoLogin,
                    LoginDeviceType: "PC",
                    LoginID: ret.AccessToken
                }
            };
            HoteamUI.Security.TryLogin(args);
            HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), { confirm: "OK" });
        }
    } else if (ret && ret.ErrorMessage) {
        HoteamUI.UIManager.MsgBox(ret.ErrorMessage);
        InforCenter_Platform_Login_RemoveWaiting();
        return;
    }
}

InforCenter_ThreeRolePlatformManagement_ThreeRoleAuthDomainLogin_OnCheck = function (pageEvent) {
    return pageEvent.o.GetControl("Info_Container").Check();
}
InforCenter_ThreeRolePlatformManagement_ThreeRoleAuthDomainLogin_OnGetData = function (pageEvent) {
    var domainUser = pageEvent.o.GetControl("DomainUserName_Value").GetText();
    var domainPassword = pageEvent.o.GetControl("DomainPassword_Value").GetText();
    var para = {};
    para.DomainUser = domainUser;
    para.DomainPassword = EncryptDecrypt.Encrypt(domainPassword, HoteamUI.Security.LoginPara.UserID);

    return JSON.stringify(para);
}


InforCenter_ThreeRolePlatformManagement_Login_AccessTokenError = function () {
    
    var para = { pageMode: 'OK', context: 'Login', labelName: 'AccessTokenError' };
    HoteamUI.UIManager.Popup('Confirm', para, {}, {});
}

InforCenter_ThreeRolePlatformManagement_ThreeRoleUKeyLogin_OnCheck = function (pageEvent) {
    return pageEvent.o.GetControl("Info_Container").Check();
}
InforCenter_ThreeRolePlatformManagement_ThreeRoleUKeyLogin_OnGetData = function (pageEvent) {
    return JSON.stringify({});
}

InforCenter_ThreeRolePlatformManagement_ThreeRoleCACenterLogin_OnCheck = function (pageEvent) {
    return pageEvent.o.GetControl("Info_Container").Check();
}
InforCenter_ThreeRolePlatformManagement_ThreeRoleCACenterLogin_OnGetData = function (pageEvent) {
    return JSON.stringify({});
}
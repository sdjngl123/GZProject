//定义全局变量，作为平台通用js接口的入口
var Registered = {};
//应用服务调用所在webservice服务路径
Registered.WebServicePath = PageInit.WebRootPath + "/Registered/RegisteredService.asmx/";

HoteamUI.LoadLoadingPage = function () {
    $("#LoginWait_Container").empty().css("background-color", '#fff');
    var src = PageInit.WebRootPath + "/Registered/LoadingPage/html/Index.html";
    $("#LoginWait_Container").load(src);
}

HoteamUI.Window.InitPage = function () {
    var searchStr = HoteamUI.Window.GetSearchString();
    if (searchStr && (searchStr.IsIntegration == true || searchStr.IsIntegration=="true")) {
        //工厂端集成
        HoteamUI.UIManager.Show("", "IntegrationPage", searchStr);
    } else {
        var loginType = $.cookie("loginType");
        if (loginType) {
            var loginname = HoteamUI.AppSets.LoginPage;
            HoteamUI.UIManager.Show("", loginname, {});
        } else {
            var autoLogin = HoteamUI.Security.AutoLogin();
            if (autoLogin == false) {
                var name = HoteamUI.AppSets.LoginPage;
                HoteamUI.UIManager.Show("", name, {});
            }
        }
    }

    
};

HoteamUI.Window.GetSearchString = function () {
    var str = (location.search.length > 0 ? location.search.substring(1) : "");
    var args = {};
    var items = str.length > 0 ? str.split('&') : [];
    var item = null;
    var name = null;
    var value = null;
    for (var i = 0; i < items.length; i++) {
        item = items[i].split('=');
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if (name.length > 0)
        {
            args[name] = value;
        }
    }
    return args;
}

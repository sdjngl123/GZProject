
var DesktopBackImg = "platform/image/Desktop/desktop.jpg";
var NavDirection = "left";
var DesktopHomePageOnCreate = function (pageEvent) {
    //显示等待效果
    $("#LoginWait_Container").show();
    PlatformUI_DesktopHomePage_Init();
    $(window).resize(function () {
        if (HoteamUI.Security.LoginPara.HomePageMode == "DesktopHomePage") {
            PlatformUI_Desktop_initBackImg(DesktopBackImg, function () { $("#LoginWait_Container").fadeOut("slow") });
            PlatformUI.Nav.resize();
        }
    });

    //初始化快捷菜单的右键菜单控件
    InforCenter_Platform_QuickRightMenuCtrl = pageEvent.o.GetControl("RightMenu");

}

//初始化配置
function PlatformUI_DesktopHomePage_Init() {
    PlatformUI_Desktop_LoadNav("left");
    PlatformUI_Desktop_initBackImg(DesktopBackImg, function () { $("#LoginWait_Container").fadeOut("slow") });
    PlatformUI_Desktop_InitStartMenu();
    PlatformUI_Desktop_LoadDesktopApp();
    PlatformUI_Desktop_InitWindowPlug();
    PlatformUI_Desktop_DialogInit();




    var homePageMunuDic = HoteamUI.Language.Lang("QuickNavigation", "HomePage");
    $("#MainPageMenu").html(homePageMunuDic).click(function () {
        var mainFlatPara = {};
        if (HoteamUI.Common.IsNullOrEmpty(AppSets.DefaultMainFlatPara) == false)
            mainFlatPara = JSON.parse(AppSets.DefaultMainFlatPara);
        InforCenter_Platform_MainTabs_AddTab(AppSets.DefaultMainFlat, mainFlatPara, homePageMunuDic, null, null, { name: "homepage" }, true);
    }).click();
    var userName = HoteamUI.DataService.Call("InforCenter.Organization.OrganizationDataService.GetUserName", {});
    if (HoteamUI.Common.IsNullOrEmpty(userName) == false) {
        $("#UserName").html(userName + " " + HoteamUI.Language.Lang("ClassicHomePageTop", "Welcome"));
    }
   
    $("#PersonalSetting").html(HoteamUI.Language.Lang("ClassicHomePageTop", "PersonalSetting"));
    $("#ModifyPassword").html(HoteamUI.Language.Lang("ClassicHomePageTop", "ModifyPassword"));
    $("#Help").html(HoteamUI.Language.Lang("ClassicHomePageBottom", "Help"));
    $("#About").html(HoteamUI.Language.Lang("ClassicHomePageBottom", "About"));
    $("#ServiceAndLaw").html(HoteamUI.Language.Lang("ClassicHomePageBottom", "ServiceAndLaw"));
    $("#logout").html(HoteamUI.Language.Lang("ClassicHomePageTop", "Logout"));
}




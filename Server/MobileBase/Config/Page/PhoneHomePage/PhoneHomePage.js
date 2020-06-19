//根据参数进行登陆
Hoteam_MobileBase_PhoneHomePage_Init = function (pageEvent) {
    HMUI.UIManager.ShowInLeft(HMUI.AppSets.MobileLoginPage, {}, "slide", false);
    //选中当前的模块
    $(".headernavbtn").on("click", function () {
        $("#SlideNav").find("[navname='" + HMUI.UIManager.CurrentNavigation + "']").addClass("ui-btn-active");
    });
};



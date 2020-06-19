
InforCenter_Platform_IFrame_OnCreate = function (pageEvent) {
    var paras = pageEvent.o.GetPara();
    if (paras != null) {
        var pageUrl = paras.pageUrl;
        $("#IFrameMyIFrame").attr("src", pageUrl);
    }
};
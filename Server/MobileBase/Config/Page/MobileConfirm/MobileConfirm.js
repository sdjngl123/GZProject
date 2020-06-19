Hoteam_InforCenter_MobileConfirm_Init = function (pageEvent) {
    var pagePara = pageEvent.o.GetPara(),
        title = "",
        html = "",
        pid = pageEvent.o.pid;

    title = HMUI.Language.Lang("MobileConfirm", "Alert");

    if (pagePara.stackTrace) {
        html = "<h3 class=\"ui-title\" style='overflow-y: auto;height: 48px;'>" + pagePara.message + "</h3>";
        html += "<p style='max-height:260px;overflow-y:auto;overflow-x:hidden;white-space:nowwarp;word-break:break-all'>" + pagePara.stackTrace + "</p>";
    }
    else {
        html = "<h3 class=\"ui-title\" >" + pagePara.message + "</h3>";
        //没有详细信息则将弹出框高度调小
        $(".confirmcontent").height("auto");
    }
    if (pagePara.pageMode == "OK") {
        $("#" + pid + " #MobileConfirmBtns .alert").show();
    }
    else if (pagePara.pageMode == "YesNo") {
        $("#" + pid + " #MobileConfirmBtns .yes").show();
        $("#" + pid + " #MobileConfirmBtns .no").show();
    }
    else {
        $("#" + pid + " #MobileConfirmBtns .ok").show();
        $("#" + pid + " #MobileConfirmBtns .cancel").show();
    }

    $(".confirmtitle").html(title);
    $(".confirmcontent").html(html);
};

Hoteam_InforCenter_Confirm_OkClick = function () {

    var page = HMUI.Page.InstanceByName("MobileConfirm");
    var pagePara = page.GetPara();
    var ret = {};
    ret.Confirm = "OK";
    HMUI.UIManager.Return(page.pid, "MobileConfirm", ret);
};


Hoteam_InforCenter_Confirm_YesClick = function () {
    var page = HMUI.Page.InstanceByName("MobileConfirm");
    var pagePara = page.GetPara();
    var ret = {};
    ret.Confirm = "Yes";
    HMUI.UIManager.Return(page.pid, "MobileConfirm", ret);
};












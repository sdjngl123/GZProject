//根据参数进行登陆
HMUI_Mobile_MobileSystemSettingsInfo_PageInit = function (pageEvent) {

    var pid = pageEvent.o.pid,
        container = $("#" + pid);
    systemType = HMUI.Window.GetSystemType();

    if (HMUI.AppSets.MobileDevice == "Phone") {
        //var pid = pageEvent.o.pid;
        $(".pad-mobile-systemSettingsInfo-item").removeClass("pad-mobile-systemSettingsInfo-item").addClass("phone-mobile-systemSettingsInfo-item");
        $(".pad-mobile-systemSettingsInfo-item-left").removeClass("pad-mobile-systemSettingsInfo-item-left").addClass("phone-mobile-systemSettingsInfo-item-left");
        $(".pad-mobile-systemSettingsInfo-item-right").removeClass("pad-mobile-systemSettingsInfo-item-right").addClass("phone-mobile-systemSettingsInfo-item-right");
        $(".pad-mobile-systemSettingsInfo-item-right-text").removeClass("pad-mobile-systemSettingsInfo-item-right-text").addClass("phone-mobile-systemSettingsInfo-item-right-text");
    }

    var ExitCleanCache = HMUI.MobileCommon.GetAppSetting("ExitCleanCache");
    var CacheWarnSize = HMUI.MobileCommon.GetAppSetting("CacheWarnSize");
    var MessageCheckEnable = HMUI.MobileCommon.GetAppSetting("MessageCheckEnable");
    var MessageCheckInterval = HMUI.MobileCommon.GetAppSetting("MessageCheckInterval");
    var MaxRowCount = HMUI.MobileCommon.GetAppSetting("MaxRowCount");
    var ServerIp = HMUI.MobileCommon.GetAppSetting("ServerIp");
    var ServerPort = HMUI.MobileCommon.GetAppSetting("ServerPort");
    var SystemOffLine = HMUI.MobileCommon.GetAppSetting("SystemOffLine");
    var SetCacheData = HMUI.MobileCommon.GetAppSetting("SetCacheData");
    var MasterItemDefaultView = HMUI.MobileCommon.GetAppSetting("MasterItemDefaultView");

    if (ExitCleanCache == "true") {
        container.find('#ExitCleanCache').attr("checked", "checked").closest(".ui-flipswitch").addClass("ui-flipswitch-active");
    }
    container.find('#CacheWarnSize').val(CacheWarnSize);
    if (MessageCheckEnable == "true") {
        container.find('#MessageCheckEnable').attr("checked", "").closest(".ui-flipswitch").addClass("ui-flipswitch-active");
    }
    if (SetCacheData == "true") {
        container.find('#SetCacheData').attr("checked", "").closest(".ui-flipswitch").addClass("ui-flipswitch-active");
    }
    container.find('#MessageCheckInterval').val(MessageCheckInterval);
    container.find('#MaxRowCount').val(MaxRowCount);
    container.find('#ServerIp').val(ServerIp);
    container.find('#ServerPort').val(ServerPort);
    if (MasterItemDefaultView) {
        container.find("#MasterItemDefaultView").val(MasterItemDefaultView).selectmenu('refresh', true);
    }
    else {
        container.find("#MasterItemDefaultView").selectmenu('refresh', true);
    }


    if (SystemOffLine === "true") {
        container.find('#SystemOffLine').attr("checked", "checked").closest(".ui-flipswitch").addClass("ui-flipswitch-active");
    }

    if (HMUI.AppSets.MobileDevice == "Phone") {
        HMUI.MobileCommon.SetHeaderText(HMUI.Language.Lang("MobileSystemSettingsInfo", "Title"));
        HMUI.MobileCommon.ShowHeaderBackButton();
    }

    var updateInfo = JSON.parse(HMUI.WebService.CallData(HMUI.BaseServicePath, "CheckSystemUpdate", {}));
    if (updateInfo) {
        var newVersion = updateInfo.AppVersion;
        var appVersion = HMUI.MobileCommon.GetLocalAppVersion();
        var appUpdateTime = HMUI.MobileCommon.GetLocalAppVersionUpdateTime();
        container.find("#MobileSystemSettingsInfo_Version").text(appVersion);

        //安卓下判断版本，允许点击更新
        if (systemType !== "iPhone" && systemType !== "iPad") {

            container.find("#MobileSystemSettingsInfo_Update").text(appUpdateTime);

            if (newVersion !== appVersion) {
                container.find("#MobileSystemSettingsInfo_NewVersion").show();
            }
            else {
                container.find("#MobileSystemSettingsInfo_NewVersion").hide();
            }

        }


    }

    HMUI_Mobile_MobileSystemSettingsInfo_OnSelectChange(container);

    //    //只允许输入正整数,检测事件在ipad中冲突，注释

    //    container.find("#CacheWarnSize,#MessageCheckInterval,#MaxRowCount,#ServerPort").bind('keyup', function () {

    //        HMUI_Mobile_MobileSystemSettingsInfo_Replace(this, $(this).val());

    //    });

    //在ios中隐藏更新时间
    if (systemType === "iPhone" || systemType === "iPad") {
        $("#MobileSystemSettingsInfo_Update").parent().hide();
    }

    //Android4.2.2对onchange支持存在bug，调整为onblur事件
    if (systemType === "android") {
        $("#CacheWarnSize,#MessageCheckInterval,#MaxRowCount,#ServerPort").each(function () {
            var self = $(this),
                 fn = self.attr("onchange");

            self.removeAttr("onchange").attr("onblur", fn);
        });
    }
};

HMUI_Mobile_MobileSystemSettingsInfo_ClickSetValue = function (obj, key) {
    var container = $(obj);
    var enable = '0';
    var checkbox = $(obj).find("input[type='checkbox']");
    var checked = checkbox[0].checked;

    var html = '<div class="ui-flipswitch ui-shadow-inset ui-bar-inherit ui-corner-all ui-mini [active]">';
    html += '<a href="#" class="ui-flipswitch-on ui-btn ui-shadow ui-btn-inherit"></a>';
    html += '<span class="ui-flipswitch-off"></span>';
    html += '<input type="checkbox" id="[id]" class="ui-flipswitch-input" [checked] tabindex="-1"/>';
    html += '</div>';



    if (key == "ExitCleanCache" || key == "MessageCheckEnable" || key == "SystemOffLine" || key == "SetCacheData") {
        if (!checked) {
            enable = "true";
            checked = ' checked="checked" ';
            var template = html.replace("[id]", key).replace("[checked]", checked).replace("[active]", "ui-flipswitch-active");
            container.html(template);
        }
        else {
            enable = "false";
            var template = html.replace("[id]", key).replace("[checked]", "").replace("[active]", "");
            container.html(template);
        }

    }
    HMUI.MobileCommon.SetAppSetting(key, enable);
};

HMUI_Mobile_MobileSystemSettingsInfo_ClickSetExitCleanCacheValue = function (self) {

    var container = $(self).closest("[data-role='content']");
    var message = "",
        systemOffLine = container.find("#SystemOffLine"),
        exitCleanCache = container.find('#ExitCleanCache');

    if (systemOffLine[0].checked) {
        message = "启用系统离线功能时不可开启此功能,请手动关闭系统离线功能";
        HMUI.UIManager.MsgBox(message, "", function () {
        }, {});
    }
    else if (!exitCleanCache[0].checked && !systemOffLine[0].checked) {

        message = "系统退出时，将会清除系统的数据缓存及文件缓存";
        HMUI.UIManager.Popup("MobileConfirm", { message: message }, { position: "center" }, "", "", function (data, ret) {
            if (ret.Confirm == "OK") {

                HMUI_Mobile_MobileSystemSettingsInfo_ClickSetValue(self, 'ExitCleanCache');
            }
        }, {});

    }
    else {

        HMUI_Mobile_MobileSystemSettingsInfo_ClickSetValue(self, 'ExitCleanCache');
    }
}

HMUI_Mobile_MobileSystemSettingsInfo_ClickSetSystemOffLineValue = function (self) {

    var container = $(self).closest("[data-role='content']");
    var message = "",
        systemOffLine = container.find("#SystemOffLine"),
        exitCleanCache = container.find('#ExitCleanCache');

    if (!systemOffLine[0].checked && exitCleanCache[0].checked) {

        systemOffLine.removeAttr("checked");
        message = "启用退出清除缓存功能时不可开启此功能,请手动关闭退出清除缓存";
        HMUI.UIManager.MsgBox(message, "", function () {
        }, {});
        return;
    }
    else {
        HMUI_Mobile_MobileSystemSettingsInfo_ClickSetValue(self, 'SystemOffLine');
    }
}

HMUI_Mobile_MobileSystemSettingsInfo_SetCacheDataValue = function (self) {

    var container = $(self).closest("[data-role='content']");
    var message = "",
        systemOffLine = container.find("#SystemOffLine"),
        exitCleanCache = container.find('#ExitCleanCache');

    if (!systemOffLine[0].checked && exitCleanCache[0].checked) {

        systemOffLine.removeAttr("checked");
        message = "启用退出清除缓存功能时不可开启此功能,请手动关闭退出清除缓存";
        HMUI.UIManager.MsgBox(message, "", function () {
        }, {});
        return;
    }
    else {
        HMUI_Mobile_MobileSystemSettingsInfo_ClickSetValue(self, 'SystemOffLine');
    }
}

HMUI_Mobile_MobileSystemSettingsInfo_BlurSetValue = function (obj, key, txt) {

    var object = $(obj),
        value = object.val(),
        id = object.attr("id");

    var result = HMUI.CheckInputValue(50, 'false', obj, txt, 'true');
    if (result) {
        value = HMUI_Mobile_MobileSystemSettingsInfo_Replace(obj, value);
        //消息间隔大于30
        if (id === "MessageCheckInterval") {
            value = HMUI_Mobile_MobileSystemSettingsInfo_MessageCheckIntervalMin(obj, value);
        }
        HMUI.MobileCommon.SetAppSetting(key, value);
    }
};

HMUI_Mobile_MobileSystemSettingsInfo_OnSelectChange = function (container) {

    $(container).find("select").change(function () {

        var obj = $(this),
            key = obj.attr("id"),
            value = obj.val();

        HMUI.MobileCommon.SetAppSetting(key, value);
        if (key === "MasterItemDefaultView") {
            HMUI.AppSets.MasterItemDefaultView = value;
        }

        //控制ios viewport 禁止缩放
        HMUI.MobileCommon.ResetWebViewFrame();

    });


};

HMUI_Mobile_MobileSystemSettingsInfo_Replace = function (obj, value) {
    var id = $(obj).attr("id");
    if (id === "MaxRowCount" || id === "ServerPort" || id === "MessageCheckInterval" || id === "CacheWarnSize") {
        if (value.length === 1) {
            value = value.replace(/[^1-9]/g, '');
        }
        else {
            value = value.replace(/\D/g, '');
            if (value !== "") {
                value = parseInt(value);
            }
        }
        $(obj).val(value);
    }

    if (id === "MaxRowCount") {
        //每页最大行数不允许为空
        if (value === "") {
            value = 0;
            $(obj).val("0");
        }
        //设置默认最小为100条
        HMUI.AppSets.MaxRowCount = value > 100 ? value : 100;
    }

    return value;
};

HMUI_Mobile_MobileSystemSettingsInfo_MessageCheckIntervalMin = function (obj, val) {
    //消息间隔最少为30秒
    if (val !== "" && isNaN(val) === false) {
        val = parseInt(val);
        if (val < 30) {
            val = 30;
            $(obj).val(val);
        }
    }
    return val.toString();
}


HMUI_Mobile_MobileSystemSettingsInfo_ClickUpdateVersion = function () {

    var systemType = HMUI.Window.GetSystemType();
    if (systemType !== "iPhone" && systemType !== "iPad") {
        HMUI.MobileCommon.CheckSystemUpdate();
    }
    else {
        return false;
    }

}








HMUI.MobileCommon.SystemSetting = {};
HMUI.MobileCommon.SetAppSetting = function (key, value) {
    var systemType = HMUI.Window.GetSystemType();
    if (systemType == "android") {
        if (typeof bridge !== "undefined") {
            bridge.setAppSetting(key, value);
        }
    }
    else if (systemType == "iPhone" || systemType == "iPad") {
        window.bridge.setAppSettingWithValue(key, value);
    }
    else if (systemType == "pc") {
        HMUI.MobileCommon.SystemSetting[key] = value;
    }
};

//向ShreadPreference中获取key对应的value值
HMUI.MobileCommon.GetAppSetting = function (key) {
    var systemType = HMUI.Window.GetSystemType();
    if (systemType == "android") {
        if (typeof bridge !== "undefined") {
            return bridge.getAppSetting(key);
        }
    }
    else if (systemType == "iPhone" || systemType == "iPad") {

        return window.bridge.getAppSetting(key);

    }
    else if (systemType == "pc") {

        var v = HMUI.MobileCommon.SystemSetting[key];
        return v;
    }
};

//向ShreadPreference中获取key对应的value值
HMUI.MobileCommon.CheckDeviceIsOnline = function () {
    var systemType = HMUI.Window.GetSystemType();
    if (systemType == "android") {
        if (typeof bridge !== "undefined")
            return bridge.checkDeviceIsOnline();
    }
    else if (systemType == "iPhone" || systemType == "iPad") {
        return window.bridge.checkDeviceIsOnline();
    }
    else if (systemType == "pc") {
        //TODO:添加缓存
        return "true";
        //TOD:测试pc端离线缓存
        //return "false";
    }
};


//浏览文件
HMUI.MobileCommon.FileDownLoadBrowse = function (paras) {

    if (!HMUI.MobileCommon.FileDownLoadBrowse.Enable) {
        return;
    }
    setTimeout(function () {
        HMUI.MobileCommon.FileDownLoadBrowse.Enable = true;
    }, 1000);

    HMUI.MobileCommon.FileDownLoadBrowse.Enable = false;
    var systemType = HMUI.Window.GetSystemType();
    if (systemType == "android") {
        if (typeof bridge !== "undefined") {
            bridge.filesDownLoadBrowse(JSON.stringify(paras));
        }
    }
    else if (systemType == "iPhone" || systemType == "iPad") {
        if (paras != null) {
            window.bridge.filesDownLoadBrowse(JSON.stringify(paras));
        }
    }
    else if (systemType == "pc") {
        if (paras != null) {
            var dataset = paras.FileList[0];
            if (dataset) {
                window.open(" http://" + dataset.ServerIP + ":" + dataset.ServerPort + "/" + dataset.ServerVolume + "/" + dataset.SrcPath);
            }
        }
    }


};
HMUI.MobileCommon.FileDownLoadBrowse.Enable = true;

//下载文件
HMUI.MobileCommon.FileDownLoad = function (paras) {

    if (!HMUI.MobileCommon.FileDownLoad.Enable) {
        return;
    }
    setTimeout(function () {
        HMUI.MobileCommon.FileDownLoad.Enable = true;
    }, 1000);

    HMUI.MobileCommon.FileDownLoad.Enable = false;
    var systemType = HMUI.Window.GetSystemType();
    if (systemType == "android") {
        if (typeof bridge !== "undefined") {
            bridge.filesDownLoad(JSON.stringify(paras));
        }
    }
    else if (systemType == "iPhone" || systemType == "iPad") {
        if (paras != null) {
            window.bridge.filesDownLoad(JSON.stringify(paras));
        }
    }
    else if (systemType == "pc") {
        if (paras != null) {
            var dataset = paras.FileList[0];
            if (dataset) {
                window.open(" http://" + dataset.ServerIP + ":" + dataset.ServerPort + "/" + dataset.ServerVolume + "/" + dataset.SrcPath);
            }
        }
    }


};

HMUI.MobileCommon.FileDownLoad.Enable = true;


//分享
HMUI.MobileCommon.ShareURL = function (paras) {

    var systemType = HMUI.Window.GetSystemType();
    if (systemType == "android") {
        if (typeof bridge !== "undefined") {
            bridge.shareURL(JSON.stringify(paras));
        }
    }
    else if (systemType == "iPhone" || systemType == "iPad") {
        if (paras != null) {
            window.bridge.shareURL(JSON.stringify(paras));
        }
    }
    else if (systemType == "pc") {
        return false;
    }


};

//显示下载列表接口
HMUI.MobileCommon.ShowDownloadFileList = function (paras) {

    var systemType = HMUI.Window.GetSystemType();
    if (systemType == "android") {
        if (typeof bridge !== "undefined") {
            bridge.showDownLoadFileList();
        }
    }
    else if (systemType == "iPhone" || systemType == "iPad") {
        window.bridge.showDownLoadFileList();

    }
    else if (systemType == "pc") {
        return false;
    }


};



//向ShreadPreference中获取key对应的value值
HMUI.MobileCommon.CheckSystemUpdate = function () {
    var systemType = HMUI.Window.GetSystemType();
    if (systemType == "android") {
        if (typeof bridge !== "undefined")
            return bridge.checkSystemUpdate();
    }
    else if (systemType == "iPhone" || systemType == "iPad") {
        if (typeof bridge !== "undefined")
            return window.bridge.checkSystemUpdate();
    }
    else if (systemType == "pc") {
        //TODO:添加缓存
        return "";
    }
};

//向ShreadPreference中获取key对应的value值
HMUI.MobileCommon.IsPhone = function () {
    var systemType = HMUI.Window.GetSystemType();
    if (systemType == "android") {
        if (typeof bridge !== "undefined")
            var ret = bridge.isPadOrPhone();
        if (ret == "true") {
            return false;
        }
        else {
            return true;
        }
    }
    else if (systemType == "iPhone") {
        return true;
    }
    else if (systemType == "iPad") {
        return false;
    }
    else {
        var total = $(window).height() + $(window).width();
        /*浏览器可视高度和宽度总和大于某个数就是平板*/
        if (total >= 1500) {
            return false;
        }
        else {
            return true;
        }
    }
};

//获取App版本
HMUI.MobileCommon.GetLocalAppVersion = function () {
    var systemType = HMUI.Window.GetSystemType();
    if (systemType == "android") {
        if (typeof bridge !== "undefined")
            return bridge.getLocalAppVersion();
    }
    else if (systemType == "iPhone" || systemType == "iPad") {
        return window.bridge.getLocalAppVersion();
    }
    else if (systemType == "pc") {
        //TODO:添加缓存
        return "";
    }
}

//获取更新时间App版本
HMUI.MobileCommon.GetLocalAppVersionUpdateTime = function () {
    var systemType = HMUI.Window.GetSystemType();
    if (systemType == "android") {
        return HMUI.AppSets.AndroidUpdateTime;
    }
    else if (systemType == "iPhone" || systemType == "iPad") {
        return HMUI.AppSets.IOSUpdateTime;
    }
    else if (systemType == "pc") {
        return "PC端没有App更新";
    }
}



//扫描二维码
HMUI.MobileCommon.GetQRCode = function (callbackName) {

    //TODO:测试
    //    data = "ObjectID:f4b60e13ab8d462da583f960145993a5\r\n" + "Name:国家标准\r\n" + "ObjectType:FolderObject";
    //    window[callbackName](data);

    var systemType = HMUI.Window.GetSystemType();
    if (systemType == "android") {
        if (typeof scanner !== "undefined") {
            return window.scanner.scannerQR(callbackName);
        } else {
            HMUI.UIManager.MsgBox("该版本暂不支持此功能，请升级应用后再试！");
        }

    }
    else if (systemType == "iPhone" || systemType == "iPad") {
        if (typeof bridge !== "undefined") {
            return window.bridge.scannerQR(callbackName);
        }
    }
    else if (systemType == "pc") {
        //TODO:添加缓存
        return "";
    }
}
//安卓系统返回键返回
HMUI.MobileCommon.getReturnFlag = function () {
    var systemType = HMUI.Window.GetSystemType();
    if (systemType == "android") {
        if (typeof quite !== "undefined") {
            var returnFlag = HMUI.MobileList.GetPreviousOpenPath();
            quite.getReturnFlag(returnFlag);
        }

    }

}

//更新iOSUIWebView的frame的大小
HMUI.MobileCommon.ResetWebViewFrame = function () {
    var systemType = HMUI.Window.GetSystemType();
    if (systemType == "iPhone" || systemType == "iPad") {
        if (typeof bridge !== "undefined") {
            setTimeout(function () {
                window.bridge.upDataWebViewFrame();
                document.getElementsByName("viewport")[0].content = "initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=0";
            }, 500);

        }
    }
}

//iOS获取XML文件
HMUI.MobileCommon.getXMLFile = function (url) {
    var systemType = HMUI.Window.GetSystemType();
    if (systemType == "iPhone" || systemType == "iPad") {
        if (typeof bridge !== "undefined") {
            return window.bridge.reloadXMLFile(url);
        }
    }
}

//安卓系统返回设备高度
HMUI.MobileCommon.getScreenHeight = function () {
    var systemType = HMUI.Window.GetSystemType();
    if (systemType == "android") {
        if (typeof bridge !== "undefined") {
            return bridge.getScreenHeight();
        }
    }
}


//获取MAC地址信息
HMUI.MobileCommon.getMacAddress = function () {
    var systemType = HMUI.Window.GetSystemType();
    if (systemType == "android") {
        if (typeof bridge !== "undefined") {
            return bridge.getMacAddress();
        }
    }
    else if (systemType == "iPhone" || systemType == "iPad") {
        if (typeof bridge !== "undefined") {
            return window.bridge.getMacAddress();
        }
    }

    return "";
}


HMUI.MobileCommon.clearCacheData = function () {
    var systemType = HMUI.Window.GetSystemType();
    if (systemType == "android") {
        if (typeof bridge !== "undefined") {
            return bridge.clearCacheData();
        }
    }
    else if (systemType == "iPhone" || systemType == "iPad") {
        if (typeof bridge !== "undefined") {
            return window.bridge.clearCacheData();
        }
    }
}

HMUI.MobileCommon.restartApp = function () {

    var systemType = HMUI.Window.GetSystemType();
    if (systemType == "android") {
        if (typeof bridge !== "undefined") {
            return bridge.restartApp();
        }
    }
    else if (systemType == "iPhone" || systemType == "iPad") {
        if (typeof bridge !== "undefined") {
            return window.bridge.restartApp();
        }
    }
    else {
        window.location.href = window.location.href.split("#")[0];
    }
}


HMUI.MobileCommon.KeyBoardClose = function () {

    var systemType = HMUI.Window.GetSystemType();
    if (systemType == "android") {
        if (typeof bridge !== "undefined") {
            $('.ui-popup-container.ui-popup-active').removeClass('ui-popup-active').addClass('ui-popup-hidden');
            $('.ui-popup-screen.ui-overlay-inherit.in').removeClass('in');
        }
    }
}


/******************************************************************************
*    Copyright (c) 2012,山东山大华天软件有限公司
*    All rights reserved.
*
*    文件名称： MobileBasePage.js
*
*    创 建 人： 薛延兵
*    创建日期： 2015-02-06
*    初始版本： 1.0
*
*    修 改 人： 薛延兵
*    修改日期： 2015-02-06
*    当前版本： 1.0
******************************************************************************/

//定义全局变量，作为所有通用js接口的入口
var HMUI = {};

//应用程序配置文件（Setting.xml）中的键值对信息
HMUI.AppSets = {};
HMUI.AppSets = AppSets;

//界面核心调用所在webservice服务路径
HMUI.BaseServicePath = PageInit.WebRootPath + "/MobileBase/MobileBaseService.asmx/";

//通用方法
HMUI.Common = {};

//移除对象上的属性
HMUI.Common.RemoveObjectField = function (obj, fieldName) {
    delete obj[fieldName];
}

HMUI.Common.IsNullOrEmpty = function (object) {
    return (object == undefined || object == null || object == "" || object.length <= 0 || object == "null" || object == "undefined");
}

//判断一个对象内是否有属性（继承除外）
HMUI.Common.HasProperty = function (object) {
    for (var i in object) {
        if (object.hasOwnProperty(i))
            return true;
    }
    return false;

}

HMUI.Common.Format = function () {
    var options, value = arguments[0] || "", i = 1, length = arguments.length;
    if ($.trim(value) == "")
        return "";
    if (typeof value == "string") {
        for (; i < length; i++) {
            options = arguments[i];
            if (options !== undefined) {
                value = value.replace("{" + (i - 1) + "}", options);
            }
        }
        return value;
    }
    else {
        alert("HMUI.Common.Format Error,the value' type is not string");
    }
}

HMUI.Common.Eval = function (str) {

    try {
        try {
            eval(str);
        }
        catch (e) {
            var title = " Exception:" + e.name + " Message:" + e.message;
            var detail = "Function:HMUI.Common.Eval str:" + str + +" Description:" + e.description;

            HMUI.UIManager.MsgBox(title, detail, true);
        }
    }
    catch (ex) {
        var edata = "Function:HMUI.Common.Eval str:" + str + " Exception:" + e.name + " Message:" + e.message + " Description:" + e.description;
        alert(edata);
    }
}

//通过方法名执行方法
HMUI.Common.ExeFunction = function (functionName, functionPara) {
    if (window[functionName] && typeof window[functionName] == "function") {
        return window[functionName](functionPara);
    }
}

//和服务器端的ajax交互接口，主要包括同步和异步两种，分别用于不同的地方
HMUI.CallAjax = {};
//同步调用服务器点接口(servicepath:webservice服务地址，method：方法名,paras:参数信息)
HMUI.CallAjax.Call = function (servicepath, method, paras) {
    var spara = JSON.stringify(paras);
    var dataparas = JSON.parse(spara);
    if (dataparas.para == undefined) { dataparas.para = {}; }
    dataparas.para = HMUI.ExtendPara(dataparas.para);
    dataparas.para.Parameter = spara;
    var surl = servicepath + method;
    var sdata = JSON.stringify(dataparas);

    //设置返回值为null，出现错误时即返回null
    var resutrndata = null;
    //调用webservice接口
    $.ajax({
        url: surl,
        data: sdata,
        async: false,
        type: 'post',
        dataType: 'json',
        cache: false,
        contentType: 'application/json',
        success: function (data) {

            //如返回的是正常信息，设置返回值 
            resutrndata = data;
            if (resutrndata.d != undefined) resutrndata = resutrndata.d;
        },
        error: function (err) {

            //执行失败，进行错误处理
            if (err.responseText != null && err.responseText != '') {
                var errinfo = JSON.parse(err.responseText);
                var errtype = errinfo.ExceptionType;
                if (errtype.match("LoginStateException") != null) {
                    setTimeout(function () {
                        HMUI.UIManager.LoginStateExceptionMsgBox(errinfo.Message);
                    }, 200);
                }
                else if (errtype.match("MsgException") != null) {
                    setTimeout(function () {
                        HMUI.UIManager.MsgBox(errinfo.Message, errinfo.StackTrace, false);
                    }, 200);
                }
                else if (errtype.match("ErrException") != null) {
                    setTimeout(function () {
                        HMUI.UIManager.MsgBox(errinfo.Message, errinfo.StackTrace, true);
                    }, 200);
                }
                else if (errtype.match("JSException") != null) {
                    var key = servicepath + method + JSON.stringify(paras);
                    if (errinfo.Message != null) {
                        if (HMUI.MobileCommon.GetAppSetting("SetCacheData") === "true") {
                            HMUI.MobileCache.SetData(key, errinfo.Message, "JSData");
                        }
                    }
                    HMUI.Common.Eval(errinfo.Message);
                }
                else {
                    setTimeout(function () {
                        HMUI.UIManager.MsgBox(errinfo.Message, errinfo.StackTrace, true);
                    }, 200);
                }
            }
            else {
                var msg = '';
                if (err.readyState != null) {
                    msg = 'readyState:' + err.readyState + ';';
                }
                if (err.status != null) {
                    msg = msg + 'status:' + err.status + ';';
                }
                setTimeout(function () {
                    HMUI.UIManager.MsgBox(HMUI.Language.Lang('License', 'CallAjaxError'), '', true);
                }, 200);
            }

            //暂时注释
            //HMUI.ThrowError.HasError = true;
        }
    });
    //返回结果
    return resutrndata;
}

//异步调用webservice，相对于同步调用，多了个回调方法作为参数
HMUI.CallAjax.AsyncCall = function (servicepath, method, paras, callback, callcackpara) {

    var isObject = servicepath instanceof Object;
    var arguLength = arguments.length;
    if (isObject == true && arguLength == 1) {
        var argus = servicepath;
        var servicepath = argus.servicepath;
        var method = argus.method;
        var paras = argus.paras;
        var data = argus.data;
        var callback = argus.callback;
        var callcackpara = argus.callcackpara;
        var showErrorMessage = argus.showErrorMessage;
        var errorCallback = argus.errorCallback;
    }
    var spara = JSON.stringify(paras);
    var dataparas = JSON.parse(spara);
    if (dataparas.para == undefined) { dataparas.para = {}; }
    dataparas.para = HMUI.ExtendPara(dataparas.para);
    dataparas.para.Parameter = spara;
    var surl = servicepath + method;
    var sdata = JSON.stringify(dataparas);

    $.ajax({
        url: surl,
        data: sdata,
        async: true,
        type: 'post',
        dataType: 'json',
        cache: false,
        contentType: 'application/json',
        success: function (data) {
            resutrndata = data;
            if (resutrndata.d != undefined) resutrndata = resutrndata.d;
            callback(resutrndata, callcackpara);
        },
        error: function (err) {

            if (showErrorMessage != false) {
                //执行失败，进行错误处理
                if (err.responseText != null && err.responseText != '') {
                    var errinfo = JSON.parse(err.responseText);
                    var errtype = errinfo.ExceptionType;
                    if (errtype.match("LoginStateException") != null) {
                        HMUI.UIManager.LoginStateExceptionMsgBox(errinfo.Message);
                    }
                    else if (errtype.match("MsgException") != null) {
                        HMUI.UIManager.MsgBox(errinfo.Message, errinfo.StackTrace, false);
                    }
                    else if (errtype.match("ErrException") != null) {

                        HMUI.UIManager.MsgBox(errinfo.Message, errinfo.StackTrace, true);
                    }
                    else if (errtype.match("JSException") != null) {
                        var key = servicepath + method + JSON.stringify(paras);
                        if (errinfo.Message != null) {
                            if (HMUI.MobileCommon.GetAppSetting("SetCacheData") === "true") {
                                HMUI.MobileCache.SetData(key, errinfo.Message, "JSData");
                            }
                        }
                        HMUI.Common.Eval(errinfo.Message);
                    }
                    else {
                        HMUI.UIManager.MsgBox(errinfo.Message, errinfo.StackTrace, true);
                    }
                }
                else {
                    var msg = '';
                    if (err.readyState != null) {
                        msg = 'readyState:' + err.readyState + ';';
                    }
                    if (err.status != null) {
                        msg = msg + 'status:' + err.status + ';';
                    }
                    setTimeout(function () {
                        HMUI.UIManager.MsgBox(HMUI.Language.Lang('License', 'CallAjaxError'), '', true);
                    }, 200);
                }
            }
            if (errorCallback) {
                errorCallback(err);
            }
        }
    });
}

HMUI.DataService = {};
HMUI.DataService.Call = function (serviceuri, paras, isNnllPrompt) {
    var content = JSON.stringify(paras);
    var key = serviceuri + content;
    var ret = null;
    if (HMUI.Window.CheckIsOffLine()) {
        ret = HMUI.MobileCache.GetData(key, "Data");
        if (ret != null) {
            ret = JSON.parse(ret);
        }
    }
    else {
        if (paras.para == undefined) paras.para = {};
        paras.para = HMUI.ExtendPara(paras.para);
        content = JSON.stringify(paras);
        var para = { para: { ServiceUri: serviceuri }, content: content };

        var ret = HMUI.WebService.CallData(HMUI.BaseServicePath, "DataService", para);
        if (ret != null) { ret = JSON.parse(ret); for (var i in ret) { ret = ret[i]; break; } }
        if (ret != null) {
            HMUI.MobileCache.SetData(key, JSON.stringify(ret), "Data");
        }
    }

    return ret;
};

HMUI.DataService.AsyncCall = function (serviceuri, paras, callback, callcackpara) {
    var isObject = serviceuri instanceof Object;
    var arguLength = arguments.length;
    if (isObject == true && arguLength == 1) {
        var argus = serviceuri;
        var serviceuri = argus.serviceuri;
        var paras = argus.paras;
        var callback = argus.callback;
        var callcackpara = argus.callcackpara;
        var showErrorMessage = argus.showErrorMessage;
        var errorCallback = argus.errorCallback;
    }
    if (paras.para == undefined) paras.para = {};
    paras.para = HMUI.ExtendPara(paras.para);
    var para = { para: { ServiceUri: serviceuri }, content: JSON.stringify(paras) };

    return HMUI.WebService.AsyncCallData(HMUI.BaseServicePath, "DataService", para, function (ret, callcackpara) {

        if (ret != null) {
            if (ret != null) {
                ret = JSON.parse(ret);
                for (var i in ret) {
                    ret = ret[i]; break;
                }
            }
        }
        callback(ret, callcackpara);

    }, callcackpara, showErrorMessage, errorCallback);
};

HMUI.WebService = {};
HMUI.WebService.ConfigData = [];
HMUI.WebService.CallConfig = function (servicepath, method, paras) {
    var value = null;
    var key = servicepath + method + JSON.stringify(paras);
    $.each(HMUI.WebService.ConfigData, function (index, val) {
        if (val.Key == key) {
            value = val.Value;
            return false;
        }
    });

    if (value == null) {
        value = HMUI.MobileCache.GetData(key, "Config");
        if (value != null) {
            if (typeof value === "string") {
                value = JSON.parse(value);
            }
            HMUI.WebService.ConfigData.push({ Key: key, Value: value })
        }
    }
    if (value == null && HMUI.Window.CheckIsOffLine() == false) {
        value = HMUI.CallAjax.Call(servicepath, method, paras);
        if (value != null) {
            HMUI.WebService.ConfigData.push({ Key: key, Value: value })
            HMUI.MobileCache.SetData(key, JSON.stringify(value), "Config");
            if (value.DicContext != null) {
                HMUI.MobileCache.SetData(value.DicContext.Name, JSON.stringify(value.DicContext), "DicContext");
                HMUI.Language.Context.push(value.DicContext);
            }
        }
    }
    return value;
};

HMUI.WebService.AsyncCallConfig = function (servicepath, method, paras, callback, callcackpara) {
    return HMUI.CallAjax.AsyncCall(servicepath, method, paras, callback, callcackpara);
};
HMUI.WebService.CallData = function (servicepath, method, paras, isNnllPrompt) {
    var key = servicepath + method + JSON.stringify(paras);
    var value = null;
    if (HMUI.Window.CheckIsOffLine()) {
        value = HMUI.MobileCache.GetData(key, "Data");
        if (value != null && value != undefined) {
            value = JSON.parse(value);
        }
        if (value == null) {
            value = HMUI.MobileCache.GetData(key, "JSData");
            if (value != null && value != undefined) {
                HMUI.Common.Eval(value);
            }
        }
    }
    else {
        var value = HMUI.CallAjax.Call(servicepath, method, paras);
        if (value != null) {
            if (HMUI.MobileCommon.GetAppSetting("SetCacheData") === "true") {
                HMUI.MobileCache.SetData(key, JSON.stringify(value), "Data");
            }
        }
    }
    return value;
};

HMUI.WebService.AsyncCallData = function (servicepath, method, paras, callback, callcackpara) {
    var key = servicepath + method + JSON.stringify(paras);
    var value = null;
    if (HMUI.Window.CheckIsOffLine()) {
        value = HMUI.MobileCache.GetData(key, "Data");
        if (value != null && value != undefined) {
            value = JSON.parse(value);
        }
        if (value == null) {
            value = HMUI.MobileCache.GetData(key, "JSData");
            if (value != null && value != undefined) {
                HMUI.Common.Eval(value);
            }
        }
        callback(value, callcackpara);
    }
    else {
        var value = HMUI.CallAjax.AsyncCall(servicepath, method, paras, callback, callcackpara);
        if (value != null) {
            if (HMUI.MobileCommon.GetAppSetting("SetCacheData") === "true") {
                HMUI.MobileCache.SetData(key, JSON.stringify(value), "Data");
            }
        }
    }
    return value;
};
//界面相关接口
HMUI.UIManager = {};
//页面已经加载项数组
HMUI.UIManager.RegisterJs = [];
//获取页面标签模板
HMUI.UIManager.GetMobilePage = function (pagename) {
    if (pagename === undefined)
        return;
    var pageconfig = HMUI.WebService.CallConfig(HMUI.BaseServicePath, "GetMobilePage", { para: { PageName: pagename} });
    if (pageconfig) {
        HMUI.UIManager.RegisterPageJs("page", pagename, pageconfig.JsFile);
        if (pageconfig.LayoutFile) {
            //对模板中的图片路径标记进行统一的替换
            pageconfig.LayoutFile = pageconfig.LayoutFile.replace(/\{ImagesBaseUrl\}/g, HMUI.LoadImages.ImagesBaseUrl);
        }
    }
    //TODO:注意后续缓存
    return pageconfig;
};
//注册页面相关脚本
HMUI.UIManager.RegisterPageJs = function (type, name, content) {
    var obj = null;
    $.each(HMUI.UIManager.RegisterJs, function (index, val) {
        if (val.Type == type && val.Name == name) {
            obj = val;
            return false;
        }
    });
    if (HMUI.Common.IsNullOrEmpty(obj) == true) {
        var oHead = document.getElementsByTagName('HEAD').item(0);
        var oScript = document.createElement("script");
        oScript.type = "text/javascript";
        oScript.text = content;
        oHead.appendChild(oScript);
        HMUI.UIManager.RegisterJs.push({ Type: type, Name: name });
    }
};
//获取列表配置信息
HMUI.UIManager.GetMobileListConfig = function (listName) {
    var list = HMUI.WebService.CallConfig(HMUI.BaseServicePath, "GetListConfig", { para: { ListName: listName} });
    //注册脚本
    if (list != null)
        HMUI.UIManager.RegisterPageJs("page", listName, list.JsFile);
    //TODO:注意后续缓存
    return list;
};


HMUI.UIManager.OpenPath = [];
HMUI.UIManager.CurrentNavigation = null;
//显示在固定div中
//pid:div的id、pagename：页面名称、paras：页面参数
HMUI.UIManager.ShowInFixed = function (pid, pagename, paras) {
    if (pagename === null || pagename === undefined)
        return;
    if (pid == null || pid == undefined || pid == "") {
        return;
    }
    //设置参数
    HMUI.Page.SetContainerParas(pid, pagename, paras);
    //获取页面配置
    var pageconfig = HMUI.UIManager.GetMobilePage(pagename);
    if (pageconfig != null) {
        //向div中添加页面
        HMUI.Page.CreatePage(pid, {
            parentid: pid,
            containerid: pid,
            pagename: pageconfig.Name,
            layout: pageconfig.LayoutFile
        });

        //发送初始化事件
        HMUI.Page.FirePageEvent(pid, "OnCreate", null, pageconfig);
    }
};

//显示到框架的左侧div中
//pagename:页面名称、paras：参数、transition：切换方式、reverse：方向
HMUI.UIManager.ShowInLeft = function (pagename, paras, transition, reverse, isAddOpenPath) {

    if (pagename === null || pagename === undefined)
        return;
    if (HMUI.AppSets.MobileDevice != "Phone") {
        $("[data-layout='leftdiv']").show();
        $("[data-layout='rightdiv']").width('70%');
    }
    //自动获取加载页面ID
    var pid = "SlidePageOne";
    var activePage = $.mobile.activePage;
    if (activePage != null) {
        pid = activePage.attr("id") == "SlidePageOne" ? "SlidePageTwo" : "SlidePageOne";
    }

    paras.PageIndex = 1;

    //只有在正向的切换的情况下，才添加数据导航中
    if (HMUI.Common.IsNullOrEmpty(reverse) && (isAddOpenPath === undefined || isAddOpenPath)) {
        HMUI.UIManager.AddOpenPath(pid, pagename, paras);
    }
    //设置参数
    HMUI.Page.SetContainerParas(pid, pagename, paras);
    //获取页面配置
    var pageconfig = HMUI.UIManager.GetMobilePage(pagename);
    if (pageconfig != null) {
        //添加页面
        HMUI.Page.CreatePage(pid, {
            parentid: pid,
            containerid: pid,
            pagename: pageconfig.Name,
            layout: pageconfig.LayoutFile
        });


        //发送初始化事件
        HMUI.Page.FirePageEvent(pid, "OnCreate", null, pageconfig);

        //进行页面切换，暂时将动画切换页面效果去除，解决手机端闪烁、滚动条和空白问题。
        //ransition: transition
        $.mobile.changePage("#" + pid, { theme: "a", transition: "none", reverse: HMUI.Common.IsNullOrEmpty(reverse) ? false : true });
    }
};

//显示到框架的右侧div中
//pagename:页面名称、paras：参数、transition：切换方式、reverse：方向
HMUI.UIManager.ShowInRight = function (pagename, paras, transition, reverse, isAddOpenPath) {
    if (HMUI.AppSets.MobileDevice == "Phone") {
        HMUI.UIManager.ShowInLeft(pagename, paras, transition, reverse, isAddOpenPath);
    }
    else {
        HMUI.UIManager.ShowInFixed("rightcontent", pagename, paras);
    }
};
//只在框架一个div中显示
//pagename:页面名称、paras：参数、position：left左/right(右)、transition：切换方式、reverse：方向
HMUI.UIManager.ShowInSingle = function (pagename, paras, position, transition, reverse) {
    if (position == "left") {
        $("[data-layout='rightdiv']").css('display', 'none');
        $("[data-layout='leftdiv']").width('100%');

        HMUI.UIManager.ShowInLeft(pagename, paras, transition, reverse);
    }
    else if (position == "right") {
        $("[data-layout='leftdiv']").css('display', 'none');
        $("[data-layout='rightdiv']").width('100%');
        HMUI.UIManager.ShowInFixed("rightcontent", pagename, paras);
    }
};
HMUI.UIManager.ShowInSingleFromNav = function (pagename, paras, transition, reverse) {
    if (HMUI.AppSets.MobileDevice == "Phone") {
        $("[data-layout='rightdiv']").css('display', 'none');
        $("[data-layout='leftdiv']").width('100%');

        HMUI.UIManager.ShowInLeft(pagename, paras, transition, reverse);
    }
    else {
        //只有在正向的切换的情况下，才添加数据导航中
        HMUI.UIManager.AddOpenPath("rightcontent", pagename, paras);
        $("[data-layout='leftdiv']").css('display', 'none');
        $("[data-layout='rightdiv']").width('100%');
        HMUI.UIManager.ShowInFixed("rightcontent", pagename, paras);
    }
};
HMUI.UIManager.AddOpenPath = function (pid, pagename, paras) {
    var navigation = null;
    $.each(HMUI.UIManager.OpenPath, function (index, val) {
        if (val.Name == HMUI.UIManager.CurrentNavigation) {
            navigation = val;
        }
    });
    if (navigation == null) {
        var newNavigation = { Name: HMUI.UIManager.CurrentNavigation };
        newNavigation.OpenPages = [{ PageName: pagename, Paras: paras, PID: pid}];
        HMUI.UIManager.OpenPath.push(newNavigation)
    }
    else {
        navigation.OpenPages.push({ PageName: pagename, Paras: paras, PID: pid });
    }
};
HMUI.UIManager.GetToOpenPath = function (index) {
    var navigation = HMUI.UIManager.GetActiveNavigation();
    var transition = "slide";
    var unlast = true;

    if (!navigation) {
        return null;
    }

    if (index == "previous") {
        index = navigation.OpenPages.length - 2;
    }
    else if (index == "last") {
        index = navigation.OpenPages.length - 1;
        unlast = false;
    }
    else if (index < 0) {
        index = navigation.OpenPages.length - 1 + index;
        transition = "previous";
    }

    if (index < 0) {
        return null;
    }
    var ret = null;
    if (navigation != null && navigation.OpenPages.length > 0) {
        ret = navigation.OpenPages[index];
        for (var j = navigation.OpenPages.length - 1; j > index; j--) {
            var last = navigation.OpenPages[j];
            navigation.OpenPages.pop(last);
        }
        if (ret.PID == "rightcontent") {
            $("[data-layout='leftdiv']").css('display', 'none');
            $("[data-layout='rightdiv']").width('100%');
            HMUI.UIManager.ShowInFixed("rightcontent", ret.PageName, ret.Paras);
        }
        else {
            if (unlast == false) {
                navigation.OpenPages.pop(ret);
            }
            HMUI.UIManager.ShowInLeft(ret.PageName, ret.Paras, transition, unlast, true);
        }
    }
    ret.Paras.PageIndex = 1;
    return { openPage: ret, IsFirst: navigation.OpenPages.length == 1 };
};
HMUI.UIManager.GetActiveNavigation = function () {
    var navigation = null;
    $.each(HMUI.UIManager.OpenPath, function (i, val) {
        if (val.Name == HMUI.UIManager.CurrentNavigation) {
            navigation = val;
        }
    });
    return navigation;
};
HMUI.UIManager.ReSetNavigation = function () {
    var navigation = null;
    $.each(HMUI.UIManager.OpenPath, function (i, val) {
        if (val.Name == HMUI.UIManager.CurrentNavigation) {
            navigation = val;
        }
    });
    HMUI.UIManager.OpenPath.pop(navigation);
};
HMUI.UIManager.GetLastPagePathValue = function () {
    var navigation = HMUI.UIManager.GetActiveNavigation();
    var ret = null;
    if (navigation != null && navigation.OpenPages.length > 0) {
        ret = navigation.OpenPages[navigation.OpenPages.length - 1];
    }
    return ret;
};
//界面层当前guid序号，使用整型数字生成伪guid
HMUI.UIManager.CurGUID = 0;
//获取新的伪guid。作为唯一标示，控件原有id不能保证唯一
HMUI.UIManager.NewGUID = function () {
    HMUI.UIManager.CurGUID++;
    return "guid" + HMUI.UIManager.CurGUID;
}

//弹出选择框
HMUI.UIManager.Popup = function (pagename, paras, popupparas, modal, arrow, callback, data, width, height, top, left) {

    var pid = "popupMobileContent";
    var popupid = "popupMobileArrowPage";
    if (popupparas.position == "center") {
        pid = "popupMobilePage";
        popupid = "popupMobilePage";
    }
    if (pagename === null || pagename === undefined)
        return;
    if (paras == null) {
        paras = {};
    }
    window.hoteamctrl = window.hoteamctrl || {};
    window.hoteamctrl[pid + pagename] = {};
    var thisdialog = window.hoteamctrl[pid + pagename];
    thisdialog.callback = callback;
    thisdialog.data = data;

    HMUI.Page.SetContainerParas(pid, pagename, paras);
    var pageconfig = HMUI.UIManager.GetMobilePage(pagename);
    if (pageconfig != null) {

        var popupselect = $("#" + pid);
        popupselect.attr("data-overlay-theme", "b");
        if (HMUI.Common.IsNullOrEmpty(modal) == false) {
            popupselect.removeAttr("data-overlay-theme");
        }
        popupselect.attr("data-arrow", "true");
        if (HMUI.Common.IsNullOrEmpty(arrow) == false) {
            popupselect.removeAttr("data-arrow");
        }
        var style = "";
        if (HMUI.Common.IsNullOrEmpty(width) == false) {
            style += "width:" + width + "px;";
        }
        if (HMUI.Common.IsNullOrEmpty(height) == false) {
            style += "height:" + height + "px;";
        }
        if (HMUI.Common.IsNullOrEmpty(top) == false) {
            style += "top:" + top + ";";
        }
        if (HMUI.Common.IsNullOrEmpty(left) == false) {
            style += "left:" + left + ";";
        }
        if (HMUI.Common.IsNullOrEmpty(style) == false) {
            popupselect.attr("style", style);
        }
        var id = HMUI.UIManager.NewGUID();
        popupselect.html("<div id = '" + id + "' pid='" + pid + "'></div>");
        var select = $("#" + id);
        select.attr("containerid", pid);
        select.attr('pagename', pagename);
        select.attr("parentid", pid);

        /*不要删除*/
        select.html(pageconfig.LayoutFile).trigger("create");

        //发送事件
        HMUI.Page.FirePageEvent(pid, "OnCreate", null, pageconfig);

        //弹出对话框
        var direction, target, offsetX, offsetY, targetWidth, targetHeight;
        if (popupparas.target) {
            target = $(popupparas.target);
            targetWidth = target.width();
            targetHeight = target.height();
            offset = target.offset();
            offsetX = offset.left;
            offsetY = offset.top;
            direction = "bottom";
            switch (popupparas.direction) {
                case "top":
                    offset = { x: offsetX + targetWidth / 2, y: offsetY };
                    break;
                case "bottom":
                    offset = { x: offsetX + targetWidth / 2, y: offsetY + targetHeight };
                    break;
                case "left":
                    offset = { x: offsetX, y: offsetY + targetHeight / 2 };
                    break;
                case "right":
                    offset = { x: offsetX + targetWidth, y: offsetY + targetHeight / 2 };
                    break;
                default:
                    offset = { x: offsetX + targetWidth / 2, y: offsetY + targetHeight };
                    break;
            }
        }

        var openwidth = $(window).width() / 3;
        if (HMUI.AppSets.MobileDevice == "Phone") {
            openwidth = $(window).width() * 0.8;
        }
        if (popupparas.position == "center") {
            $("#" + popupid).css("width", openwidth);
            $("#" + popupid).popup('open');
        }
        else {
            $("#" + popupid).css("width", openwidth);
            $("#" + popupid).popup('open', offset);
        }
    }
    else if (pagename === "MobileConfirm") {
        HMUI.UIManager.Confirm(paras.message);
        return;
    }
};

//对话框关闭执行销毁并条用回调函数
HMUI.UIManager.Return = function (pid, pagename, ret) {
    var id = pid + pagename;
    if (hoteamctrl[id]) {
        var ctrldata = hoteamctrl[id];
        if (typeof ctrldata.callback === "function") {
            ctrldata.callback(ctrldata.data, ret);
            delete hoteamctrl[id];
        }
        if (pid == "popupMobilePage") {
            $("#popupMobilePage").popup('close');
        }
        else {
            $("#popupMobileArrowPage").popup('close');
        }
    }
};

//弹出提示：当离线无法加载配置文件弹出确认框时使用
HMUI.UIManager.Confirm = function (message) {

    var html = ['<div data-role="header" data-theme="a" role="banner" class="ui-header ui-page-theme-a" id="MobileConfirmHeader">',
                '<h1 class="ui-title confirmtitle" role="heading" aria-level="1">',
                    "提示",
                '</h1>',
            '</div>',
            '<div role="main" class="ui-content confirmcontent" style="max-height:300px">',
                '<h3 class=\"ui-title\" >', message, '</h3>',
            '</div>',
            '<div align="center" id="MobileConfirmBtns">',
                '<a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline" data-rel="back" >',
                    '确定',
                '</a>',
            '</div>'].join(""),

        openwidth = $(window).width() / 3,
        popup = $("#popupMobilePage");


    if (HMUI.AppSets.MobileDevice == "Phone") {
        openwidth = $(window).width() * 0.8;
    }

    popup.html(html).css("width", openwidth).popup('open');
}

//身份验证提示
HMUI.UIManager.LoginStateExceptionMsgBox = function (message) {
    HMUI.UIManager.Confirm(message);
    $("#popupMobilePage").find("#MobileConfirmBtns>a").click(function () {
        HMUI.MobileCommon.restartApp();
    });
}

//控件管理
HMUI.Page = {};
//设置页面容器信息，页面名称，参数等等
HMUI.Page.SetContainerParas = function (pid, pagename, paras) {
    var select = "#" + pid;
    if (paras.target) {
        delete paras.target;
    }
    paras = JSON.stringify(paras);
    $(select).attr('pagepagename', pagename);
    $(select).attr('paras', paras);
};

//获取指定的容器参数
HMUI.Page.GetContainerPara = function (pid) {
    var select = "#" + pid;
    var paras = $(select).attr('paras');
    if (HMUI.Common.IsNullOrEmpty(paras) == false) {
        return JSON.parse(paras);
    }
    else {
        return "";
    }
};

HMUI.Page.ParentPage = function (curpid) {
    var select = "#" + curpid;
    var p = $(select).parents('[pagepagename]').first();

    if (p.size() > 0)
        return p.attr('id');

    return "";
};
HMUI.Page.FireParentPageEvent = function (curpid, name, para) {
    var pid = HMUI.Page.ParentPage(curpid);
    if (HMUI.Common.IsNullOrEmpty(pid) == false) {
        HMUI.Page.FirePageEvent(pid, name, para);
    }
}
HMUI.Page.FirePageEvent = function (pid, name, para, pageconfig) {
    var select = "#" + pid;
    var pagename = $(select).attr('pagepagename');

    pageconfig = pageconfig || HMUI.UIManager.GetMobilePage(pagename);
    var handlers = pageconfig.PageHandlers;
    var select = "#" + pid;

    var pageEvent = $.extend({}, para);
    pageEvent.o = HMUI.Page.Instance(pid);
    var result = undefined;
    for (var i in handlers) {
        var val = handlers[i];
        if (val.HandlerName == name) {
            var result = HMUI.Common.ExeFunction(val.Script, pageEvent);
        }
    }
    return result;
}
//创建页面
HMUI.Page.CreatePage = function (pid, options) {
    var id, pselect = $("#" + options.parentid);
    if (options.existid) {
        id = options.exisid;
    }
    else {
        id = HMUI.UIManager.NewGUID();
        pselect.html("<div id = '" + id + "' pid='" + pid + "'></div>");
    }
    var select = $("#" + id);
    select.attr("containerid", options.containerid);
    select.attr('pagename', options.pagename);
    select.attr("parentid", options.parentid);

    select.html(options.layout).trigger("create");
}
//销毁页面控件
HMUI.Page.DisposePage = function (pid) {
    var pselect = "#" + pid;
    $(pselect).remove();
}

HMUI.Page.InstanceByName = function (pagename) {
    var pselect = "[pagepagename='" + pagename + "']";
    return HMUI.Page.Instance($(pselect).attr("id"));
}
//根据控件guid初始化控件操作类对象实例
HMUI.Page.Instance = function (pid) {
    var page = $.extend({}, HMUI.Page.BasePage);
    page.pid = pid;
    return page;
}

HMUI.Page.BasePage = {
    pid: "",
    PageName: function () { var select = "#" + this.pid; var pagename = $(select).attr('pagepagename'); return pagename; },
    GetPara: function () { return HMUI.Page.GetContainerPara(this.pid); },
    FireParentPageEvent: function (eventname) { HMUI.Page.FireParentPageEvent(this.ContainerID(), eventname); }
};

//多语言管理
HMUI.Language = {};
HMUI.Language.Context = [];
HMUI.Language.GetLanguageList = function () {
    if (HMUI.Common.IsNullOrEmpty(HMUI.Language.LanguageList)) {
        HMUI.Language.LanguageList = HMUI.CallAjax.Call(HoteamUI.BaseServicePath, "GetLanguageList", {});
    }
    return HMUI.Language.LanguageList;
}

HMUI.Language.Lang = function (context, labelname) {

    if (HMUI.Common.IsNullOrEmpty(labelname) == true) {
        labelname = context.split(".")[1];
        context = context.split(".")[0];
    }

    var con = null;
    $.each(HMUI.Language.Context, function (index, val) {
        if (val.Name == context) {
            con = val;
            return false;
        }
    });
    if (con == null) {
        con = HMUI.MobileCache.GetData(context, "DicContext");
        if (con != null) {
            con = JSON.parse(con);
            HMUI.Language.Context.push(con);
        }
    }
    if (con != undefined && con != null && con.Labels != undefined) {
        var lab = null;
        $.each(con.Labels, function (index, val) {
            if (val.Name == labelname) {
                lab = val;
                return false;
            }
        });

        if (lab != null && lab.LocalizedLabels != undefined) {
            var text = null;
            var def = null;
            $.each(lab.LocalizedLabels, function (index, val) {
                if (val.LanguageRef == HMUI.Language.CurLanguage)
                    text = val.Value;
                if (val.LanguageRef == HMUI.AppSets.DefaultLanguage)
                    def = val.Value;
            });
            if (text != null) {
                return text;
            }
            if (def != null) {
                return def;
            }
        }
    }

    return "";
};
HMUI.Language.CurLanguage = HMUI.AppSets.DefaultLanguage;
//设置多语言
HMUI.Language.SetLanguage = function (lanuage) {

    if (lanuage == null || lanuage == undefined || lanuage == "") {
        var cookie = $.cookie("Language");
        if (PageInit.Language != null && PageInit.Language != undefined && PageInit.Language != "") {
            lanuage = PageInit.Language;
        }
        else if (cookie != null && cookie != undefined && cookie != "") {
            lanuage = cookie;
        }
        else {
            lanuage = HMUI.AppSets.DefaultLanguage;
        }
    }

    $("script[langsoruce]").each(function (index, val) {
        val.src = val.getAttribute("langsoruce").replace("[LANGUAGE]", lanuage);
    });

    HMUI.Language.CurLanguage = lanuage;
    $.cookie("Language", lanuage, { expires: 10 });
};

//用户登录及安全验证接口，因为核心部分不涉及数据库和用户操作，这里仅仅提供相应的接口和虚实现，应在相应的地方进行覆盖实现
HMUI.Security = {};
HMUI.Security.LoginPara = {};
//自动登录
HMUI.Security.AutoLogin = function () {
    return true;
};
//根据参数进行登陆
HMUI.Security.Login = function (para) {
    return true;
};


//退出登陆
HMUI.Security.Logout = function (loginid) {
    return true;
};
//退出登录逻辑执行方法
HMUI.Security.LogoutActive = function () {

}
//检查用户是否已经登陆，登陆界面使用
HMUI.Security.CheckLogin = function () {
};

HMUI.Window = {};

HMUI.Window.WaitWindow =
{
    Create: function () {
        var src = "../MobileBase/loading.html";
        $("body").append("<iframe src='" + src + "' id='loading-bg' style='z-index:999999999;width:100%;height:100%;border:0px none;position:fixed;left:0px;right:0px;bottom:1px;' frameborder=0 allowTransparency='true' />");
    },
    Show: function () {
        $("#loading-bg").show();
    },
    Hide: function () {
        $("#loading-bg").hide();
    }
}
HMUI.Window.CheckIsOffLine = function () {
    var ret = false;
    var state = HMUI.MobileCommon.GetAppSetting("SystemOffLine");
    if (state == "true") {
        ret = true;
    }
    else if (HMUI.MobileCommon.CheckDeviceIsOnline() == "false") {
        ret = true;
    }
    return ret;
}



//页面初始化，根据参数设置加载页面
HMUI.Window.InitPage = function () {
    HMUI.Security.LoginPara.Lang = HMUI.AppSets.DefaultLanguage;
    HMUI.Security.LoginPara.Connect = HMUI.AppSets.MobileDataBaseName;
    HMUI.AppSets.MobileDevice = "Phone";
    var homePage = 'PhoneHomePage';
    if (HMUI.MobileCommon.IsPhone() == false) {
        homePage = 'PadHomePage';
        HMUI.AppSets.MobileDevice = "Pad";
    }
    HMUI.MobileCommon.SetAppSetting("MessageCheckMethod", "GetMessageInfo");
    HMUI.MobileCommon.SetAppSetting("MessageCheckUrl", HMUI.BaseServicePath);
    if (HMUI.Common.IsNullOrEmpty(HMUI.MobileCommon.GetAppSetting("WebAppVersion"))) {
        HMUI.MobileCommon.SetAppSetting("WebAppVersion", HMUI.AppSets.WebAppVersion);
    }

    HMUI.MobileCommon.SetAppSetting("isPlayMusic", HMUI.AppSets.isPlayMusic);
    //缓存异常框信息
    HMUI.UIManager.GetMobilePage("MobileConfirm");
    HMUI.UIManager.ShowInFixed("mobilePage", homePage, {});
};

//获取客户端类型
HMUI.Window.GetSystemType = function () {
    if (navigator.userAgent.indexOf("iPhone") != -1) {
        return "iPhone";
    }
    else if (navigator.userAgent.indexOf("iPad") != -1) {
        return "iPad";
    }
    else if (navigator.userAgent.indexOf("Android") != -1) {
        return "android";
    }
    else {
        return "pc";
    }
}
//合并参数
HMUI.ExtendPara = function (para) {
    if (para == undefined) {
        para = {};
    }
    $.extend(para, HMUI.Security.LoginPara);
    return para;
}

//列表查询隐藏
HMUI.HideListViewSearch = function () {
    $(".contentsearch").hide();
}

//阻止冒泡事件
HMUI.StopEventBubble = function (event) {
    var e = event || window.event;
    if (e && e.stopPropagation) {
        e.stopPropagation();
    }
    else {
        e.cancelBubble = true;
    }
};

//截取字符串显示...
HMUI.CutStr = function (str, len) {
    var str_length = 0;
    var str_len = 0;
    str_cut = new String();
    str_len = str.length;
    for (var i = 0; i < str_len; i++) {
        a = str.charAt(i);
        str_length++;
        if (escape(a).length > 4) {
            //中文字符的长度经编码之后大于4  
            str_length++;
        }
        str_cut = str_cut.concat(a);
        if (str_length >= len) {
            str_cut = str_cut.concat("...");
            return str_cut;
        }
    }
    //如果给定字符串小于指定长度，则返回源字符串；  
    if (str_length < len) {
        return str;
    }
}

//检查输入数据
HMUI.CheckInputValue = function (len, isrequired, obj, tip, ismsgbox) {

    var result = true;
    //var strlen = HMUI.GetStrLength($(obj).val());
    //调整为统一按照汉字字符判断,将验证长度除以2
    len = len / 2;
    var strlen = $(obj).val().length;
    var id = $(obj).attr("id");
    tip = "请输入" + tip + "!";
    if (isrequired == "true" && parseInt(strlen) == 0) {
        //必填提示
        if (ismsgbox == "true") {
            HMUI.UIManager.MsgBox("必填项提示", tip);
        }
        else {
            $("#" + id + "tip").html(tip);
        }
        result = false;
    }
    else if (parseInt(strlen) > parseInt(len)) {
        //长度超出提示
        if (ismsgbox == "true") {
            HMUI.UIManager.MsgBox("长度超长提示", "最大允许输入" + parseInt(len) + "个字符");
        }
        else {
            $("#" + id + "tip").html("最大允许输入" + parseInt(len) + "个字符");
        }
        result = false;
    }
    else {
        if (ismsgbox == "false") {
            $("#" + id + "tip").html("");
            return true;
        }
    }
    return result;
}


//获得字符串实际长度，中文2，英文1
HMUI.GetStrLength = function (str) {
    var realLength = 0, len = str.length, charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
    }
    return realLength;

}

HMUI.ThrowError = function () {
    window.onerror = function (msg, url, line) {
        alert("msg:" + msg + "\r\n url:" + url + "\r\n" + "line:" + line);
    }
}





HMUI.LoadImages = function () {

    var sprite = "sprite",
        imagesURL = HMUI.AppSets.ImagesBaseUrl.split(';'),
        imageURL;

    for (var i = 0, len = imagesURL.length; i < len; i++) {

        imageURL = imagesURL[i];

        //针对ipad出现的ajax请求异常的替代方案，调用ipad壳接口
        var systemType = HMUI.Window.GetSystemType();
        if (systemType == "iPhone" || systemType == "iPad") {
            var url, xml;
            url = location.origin + "/" + imageURL;
            xml = HMUI.MobileCommon.getXMLFile(url);
            if (xml) {

                var svgStartPosition = xml.indexOf("<svg");
                var svgEndPosition = xml.indexOf("</svg>");
                xml = xml.substring(svgStartPosition, svgEndPosition + 6);
                if (xml) {
                    var sprite = $('<div class="mobile-icon-sprite"  style="display:none;" ></div>');
                    sprite.append(xml).appendTo("body");
                    HMUI.LoadImages.ImagesBaseUrl = "#";
                }
            }
        }

        $.ajax({
            url: imageURL,
            type: 'get',
            dataType: 'text',
            success: function (data) {

                //降级方案，兼容性较高
                data = data.replace(/_x5F_/g, '_');
                var sprite = $('<div style="display:none;"></div>');
                var svgStartPosition = data.indexOf("<svg"),
                        svgEndPosition = data.indexOf("</svg>");
                sprite.append(data.substring(svgStartPosition, svgEndPosition + 6)).appendTo("body");
                HMUI.LoadImages.ImagesBaseUrl = "#";
            },
            error: function () {
                //报错时使用预加载方案
            },
            complete: function (XHR, TS) {
                XHR.abort = null;
                XHR = null;
            }
        });
    }

}

HMUI.LoadImages.ImagesBaseUrl = "#";

HMUI.LoadingScreen = {};

HMUI.LoadingScreen.Create = function () {
    var sprite = $('<div class="mobile-loading-screen-container"><div class="mobile-loading-screen"></div><div class="mobile-loading-screen-title"></div></div>');
    sprite.appendTo("body");
}

HMUI.LoadingScreen.Show = function () {
    $(".mobile-loading-screen-container").show();
}

HMUI.LoadingScreen.Hide = function () {
    $(".mobile-loading-screen-container").hide();
}

HMUI.FixDeviceHeight = function () {
    //固定内容区域高度
    setTimeout(function () {

        $("#PageContainer").css({ "height": HMUI.MobileCommon.DeviceHeight + "px" });
    }, 600);

    setTimeout(function () {

        $("#PageContainer").css({ "height": HMUI.MobileCommon.DeviceHeight + "px" });
    }, 2000);
}

//页面初始化脚本
$(document).ready(function () {
    
    HMUI.LoadingScreen.Create();
    HMUI.LoadImages();
    HMUI.MobileCache.CacheInit();

    if (HMUI.Common.IsNullOrEmpty(PageInit.LoginID) == false) { HMUI.Security.LoginID = PageInit.LoginID; }
    //调用页面初始化接口
    HMUI.Window.InitPage();

    //HMUI.ThrowError();
    $("#popupMobilePage-screen").unbind();

    HMUI.FixDeviceHeight();
});




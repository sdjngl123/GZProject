/******************************************************************************
*    Copyright (c) 2012,山东山大华天软件有限公司
*    All rights reserved.
*
*    文件名称： BasePage.js
*
*    创 建 人： 邱仲
*    创建日期： 2012-09-03
*    初始版本： 1.0
*
*    修 改 人： 邱仲
*    修改日期： 2012-09-03
*    当前版本： 1.0
******************************************************************************/

//定义全局变量，作为所有通用js接口的入口
var HoteamUI = {};

//应用程序配置文件（Setting.xml）中的键值对信息
HoteamUI.AppSets = {};
HoteamUI.AppSets = AppSets;

//界面核心调用所在webservice服务路径
HoteamUI.BaseServicePath = PageInit.WebRootPath + "/Base/BaseService.asmx/";

//通用方法
HoteamUI.Common = {};

//移除对象上的属性
HoteamUI.Common.RemoveObjectField = function (obj, fieldName) {
    delete obj[fieldName];
}

HoteamUI.Common.ConverSettings = function (settings, settingsOption, settingsOption, optionPath) {
    for (var i = 0; i < settings.length; i++) {
        HoteamUI.Common.ConverSetting(settings[i], settingsOption, settingsOption, optionPath);
    }
};
HoteamUI.Common.IsNullOrEmpty = function (object) {
    return (object === undefined || object === null || object === "" || object.length <= 0);
}

//判断一个对象内是否有属性（继承除外）
HoteamUI.Common.HasProperty = function (object) {
    for (var i in object) {
        if (object.hasOwnProperty(i))
            return true;
    }
    return false;

}

HoteamUI.Common.Format = function () {
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
        alert("HoteamUI.Common.Format Error,the value' type is not string");
    }
}

HoteamUI.Common.ConverSetting = function (settings, option, options, optionPath) {
    //获取键值对
    var key = settings.Key;
    var value = settings.Value;
    //处理value值
    if (value == "" || value == null) {
        value = "null";
    } else if (typeof value === "string") {
        if (value == "true" || value === "false") {

        } else {
            if (!value.startsWith('{')) {
                value = ['"', value, '"'].join("");
            }
        }
    }
    //转换
    //原来方式
    //var setJson = ["{\"", key, "\":", value, "}"].join("").replace(/\\/g, "\\\\");//replace 给正则表达式用
    //setJson = eval("(" + setJson + ")");
    //在自定义表单中，使用原来方式格式会有错误
    try {
        var setJson = ["{\"", key, "\":", value, "}"].join("").replace(/\\/g, "\\\\");//replace 给正则表达式用
        setJson = eval("(" + setJson + ")");
    } catch (err) {
        var setJson = ["{\"", key, "\":", value, "}"].join("");
        setJson = eval("(" + setJson + ")");
    }
    $.extend(option, setJson);
    //记录路径
    optionPath = ["options", ".", key].join("");
    //子元素设置
    if (settings.Settings) {
        var settingChilds = settings.Settings;
        var number = settingChilds.length;
        if (number > 0) {
            var optionJson = eval([optionPath, "=", "{}"].join(""));
        }
        //for (var settingChild in settingChilds) {
        for (var i = 0; i < settingChilds.length; i++) {
            HoteamUI.Common.ConverSetting(settingChilds[i], eval(optionPath), eval(optionPath), optionPath);
        }
    }
};

HoteamUI.Common.Eval = function (str) {
    HoteamUI.Trace.Write("debug", "HoteamUI.Common.Eval Call!", { str: str });
    try {
        try {
            eval(str);
            HoteamUI.Trace.Write("debug", "HoteamUI.Common.Eval Call OK!", { str: str });
        }
        catch (e) {
            var title = " Exception:" + e.name + " Message:" + e.message;
            var detail = "Function:HoteamUI.Common.Eval str:" + str + +" Description:" + e.description;
            HoteamUI.Trace.Write("error", "HoteamUI.Common.Eval Call Error!", { msg: title, detail: detail });
            console.log(e.stack);//报错时方便查找堆栈
            HoteamUI.UIManager.MsgBox(title, detail, true);
        }
    }
    catch (ex) {
        var edata = "Function:HoteamUI.Common.Eval str:" + str + " Exception:" + e.name + " Message:" + e.message + " Description:" + e.description;
        HoteamUI.Trace.Write("error", "HoteamUI.Common.Eval Call Error!", { e: edata });
        alert(edata);
    }
}

//通过方法名执行方法
HoteamUI.Common.ExeFunction = function (functionName, functionPara) {
    if (window[functionName] && typeof window[functionName] == "function") {
        return window[functionName](functionPara);
    }
}

HoteamUI.Common.MergeObject = function () {
    function mergeObject(preObj, nextObj) {
        for (var i in nextObj) {
            if (nextObj[i] instanceof Object && preObj.hasOwnProperty(i)) {
                preObj[i] = mergeObject(preObj[i], nextObj[i]);
            }
            else if (HoteamUI.Common.IsNullOrEmpty(nextObj[i]) == false) {
                preObj[i] = nextObj[i];
            }
        }
        return preObj;
    }
    var args = arguments;
    var ret = args[0];
    for (var i = 1, len = args.length; i < len; i++) {
        ret = mergeObject(ret, args[i]);
    }
    return ret;
}



HoteamUI.Common.FilterPagePara = function (pagepara) {
    if (pagepara) {
        var para = JSON.parse(JSON.stringify(pagepara));
        delete para.Url;
        return $.isEmptyObject(para);
    }
    return true;
}

//和服务器端的ajax交互接口，主要包括同步和异步两种，分别用于不同的地方
HoteamUI.CallAjax = {};
//同步调用服务器点接口(servicepath:webservice服务地址，method：方法名,paras:参数信息)
HoteamUI.CallAjax.Call = function (servicepath, method, paras) {
    HoteamUI.Window.DataLoadPointer.Loading();
    if (paras.para == undefined) { paras.para = {}; }
    paras.para = HoteamUI.ExtendPara(paras.para);
    var surl = servicepath + method;
    var sdata = JSON.stringify(paras);
    HoteamUI.Trace.Write("debug", "HoteamUI.CallAjax.Call!", { url: surl, para: sdata });

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
            HoteamUI.Trace.Write("debug", "HoteamUI.CallAjax.Call Result!", { result: data });
        },
        error: function (err) {
            try {
                //执行失败，进行错误处理
                if (err.responseText != null && err.responseText != '') {
                    var errinfo = JSON.parse(err.responseText);
                    var errtype = errinfo.ExceptionType;
                    if (errtype.match("LoginStateException") != null) {
                        $.cookie("autoLoginInfo", "");
                        HoteamUI.Trace.Write("error", "HoteamUI.CallAjax.Call Error!", { result: err });
                        HoteamUI.UIManager.LoginStateExceptionMsgBox(errinfo.Message);
                    }
                    else if (errtype.match("MsgException") != null) {
                        HoteamUI.Trace.Write("error", "HoteamUI.CallAjax.Call Error!", { result: err });
                        HoteamUI.UIManager.MsgBox(errinfo.Message, errinfo.StackTrace, false);
                    }
                    else if (errtype.match("ErrException") != null) {
                        HoteamUI.Trace.Write("error", "HoteamUI.CallAjax.Call Error!", { result: err });
                        HoteamUI.UIManager.MsgBox(errinfo.Message, errinfo.StackTrace, true);
                    }
                    else if (errtype.match("JSException") != null) {
                        if (HoteamUI.Common.IsNullOrEmpty(errinfo.StackTrace) == false) {
                            var funPara = JSON.parse(errinfo.StackTrace);
                            HoteamUI.Common.ExeFunction(errinfo.Message, funPara);
                        }
                        else
                            HoteamUI.Common.Eval(errinfo.Message);
                    } else if (errtype.match("OnlyQueryException") != null) {
                        HoteamUI.Trace.Write("error", "HoteamUI.CallAjax.Call Error!", { result: err });
                        HoteamUI.UIManager.MsgBox(errinfo.Message);
                    }
                    else {
                        HoteamUI.Trace.Write("error", "HoteamUI.CallAjax.Call Error!", { result: err });
                        HoteamUI.UIManager.MsgBox(errinfo.Message, errinfo.StackTrace, true);
                    }
                }
                else {
                    HoteamUI.Trace.Write("error", "HoteamUI.CallAjax.Call Error!", { result: err });
                    var msg = '';
                    if (err.readyState != null) {
                        msg = 'readyState:' + err.readyState + ';';
                    }
                    if (err.status != null) {
                        msg = msg + 'status:' + err.status + ';';
                    }
                    HoteamUI.UIManager.MsgBox('HoteamUI.CallAjax.Call Error!', msg, true);
                }
            }
            catch (e) {
                window.console && window.console.error(e);
            }
        },
        complete: function (XHR, TS) {
            XHR.abort = null;
            XHR = null;
            setTimeout(HoteamUI.Window.DataLoadPointer.Complete, 1000);
        }
    });
    //返回结果
    return resutrndata;
}

//异步调用webservice，相对于同步调用，多了个回调方法作为参数
HoteamUI.CallAjax.AsyncCall = function (servicepath, method, paras, callback, callcackpara) {
    HoteamUI.Window.DataLoadPointer.Loading();
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
    if (paras.para == undefined) { paras.para = {}; }
    paras.para = HoteamUI.ExtendPara(paras.para);

    var surl = servicepath + method;
    var sdata = JSON.stringify(paras);
    HoteamUI.Trace.Write("debug", "HoteamUI.CallAjax.AsyncCall!", { url: surl, para: sdata });

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
            HoteamUI.Trace.Write("debug", "HoteamUI.CallAjax.AsyncCall Result!", { result: data });
            callback(resutrndata, callcackpara);
        },
        error: function (err) {
            if (showErrorMessage != false) {
                //执行失败，进行错误处理
                if (err.responseText != null && err.responseText != '') {
                    var errinfo = JSON.parse(err.responseText);
                    var errtype = errinfo.ExceptionType;
                    if (errtype.match("LoginStateException") != null) {
                        HoteamUI.Trace.Write("error", "HoteamUI.CallAjax.AsyncCall Error!", { result: err });
                        HoteamUI.UIManager.LoginStateExceptionMsgBox(errinfo.Message);
                    }
                    else if (errtype.match("MsgException") != null) {
                        HoteamUI.Trace.Write("error", "HoteamUI.CallAjax.AsyncCall Error!", { result: err });
                        HoteamUI.UIManager.MsgBox(errinfo.Message, errinfo.StackTrace, false);
                    }
                    else if (errtype.match("ErrException") != null) {
                        HoteamUI.Trace.Write("error", "HoteamUI.CallAjax.AsyncCall Error!", { result: err });
                        HoteamUI.UIManager.MsgBox(errinfo.Message, errinfo.StackTrace, true);
                    }
                    else if (errtype.match("JSException") != null) {
                        if (HoteamUI.Common.IsNullOrEmpty(errinfo.StackTrace) == false) {
                            var funPara = JSON.parse(errinfo.StackTrace);
                            HoteamUI.Common.ExeFunction(errinfo.Message, funPara);
                        }
                        else
                            HoteamUI.Common.Eval(errinfo.Message);
                    } else if (errtype.match("OnlyQueryException") != null) {
                        HoteamUI.Trace.Write("error", "HoteamUI.CallAjax.Call Error!", { result: err });
                        HoteamUI.UIManager.MsgBox(errinfo.Message);
                    }
                    else {
                        HoteamUI.Trace.Write("error", "HoteamUI.CallAjax.AsyncCall Error!", { result: err });
                        HoteamUI.UIManager.MsgBox(errinfo.Message, errinfo.StackTrace, true);
                    }
                }
                else {
                    HoteamUI.Trace.Write("error", "HoteamUI.CallAjax.Call Error!", { result: err });
                    var msg = '';
                    if (err.readyState != null) {
                        msg = 'readyState:' + err.readyState + ';';
                    }
                    if (err.status != null) {
                        msg = msg + 'status:' + err.status + ';';
                    }
                    HoteamUI.UIManager.MsgBox('HoteamUI.CallAjax.Call Error!', msg, true);
                }
            }
            if (errorCallback) {
                errorCallback(err);
            }
        },
        complete: function (XHR, TS) {
            XHR.abort = null;
            XHR = null;
            HoteamUI.Window.DataLoadPointer.Complete();
        }
    });
}

HoteamUI.DataService = {};
HoteamUI.DataService.Call = function (serviceuri, paras) {
    if (paras.para == undefined) paras.para = {};
    paras.para = HoteamUI.ExtendPara(paras.para);

    var para = { para: { ServiceUri: serviceuri }, content: JSON.stringify(paras) };

    var ret = HoteamUI.CallAjax.Call(HoteamUI.BaseServicePath, "DataService", para);
    if (ret != null) { ret = JSON.parse(ret); for (var i in ret) { ret = ret[i]; break; } }
    return ret;
};

HoteamUI.DataService.AsyncCall = function (serviceuri, paras, callback, callcackpara) {
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
    paras.para = HoteamUI.ExtendPara(paras.para);
    var para = { para: { ServiceUri: serviceuri }, content: JSON.stringify(paras) };

    return HoteamUI.CallAjax.AsyncCall({
        servicepath: HoteamUI.BaseServicePath,
        method: "DataService",
        paras: para,
        callback: function (ret, callcackpara) {
            if (ret != null) {
                if (ret != null) {
                    ret = JSON.parse(ret);
                    for (var i in ret) {
                        ret = ret[i]; break;
                    }
                }
            }
            if (callback) {
                callback(ret, callcackpara);
            }
        },
        callcackpara: callcackpara,
        showErrorMessage: showErrorMessage,
        errorCallback: errorCallback
    });
};

//用户登录及安全验证接口，因为核心部分不涉及数据库和用户操作，这里仅仅提供相应的接口和虚实现，应在相应的地方进行覆盖实现
HoteamUI.Security = {};
HoteamUI.Security.LoginPara = {};
//自动登录
HoteamUI.Security.AutoLogin = function () {
    HoteamUI.Trace.Write("debug", "HoteamUI.Security.Login!", "");
    return true;
};
//根据参数进行登陆
HoteamUI.Security.Login = function (para) {
    HoteamUI.Trace.Write("debug", "HoteamUI.Security.Login!", para);
    return true;
};


//退出登陆
HoteamUI.Security.Logout = function (loginid) {
    HoteamUI.Trace.Write("debug", "HoteamUI.Security.Logout!", { lid: loginid });
    return true;
};
//退出登录逻辑执行方法
HoteamUI.Security.LogoutActive = function () {
}
//检查用户是否已经登陆，登陆界面使用
HoteamUI.Security.CheckLogin = function () {
    HoteamUI.Trace.Write("debug", "HoteamUI.Security.CheckLogin!", {});
};


//样式管理
HoteamUI.ThemeManager = {};
//当前样式
HoteamUI.ThemeManager.Theme = HoteamUI.AppSets.DefaultTheme;
//设置样式接口
HoteamUI.ThemeManager.SetTheme = function (theme) {
    if (theme == null || theme == undefined || theme == "") {
        var cookie = $.cookie("Theme");
        if (PageInit.Theme != null && PageInit.Theme != undefined && PageInit.Theme != "") {
            theme = PageInit.Theme;
        }
        else if (cookie != null && cookie != undefined && cookie != "") {
            theme = cookie;
        }
        else {
            theme = HoteamUI.AppSets.DefaultTheme;
        }
    }

    HoteamUI.Trace.Write("debug", "HoteamUI.ThemeManager.SetTheme!", { Theme: theme });

    $("link[themesource]").each(function (index, val) {
        val.href = val.getAttribute("themesource").replace("[THEME]", theme);
    });

    HoteamUI.ThemeManager.Theme = theme;
    $.cookie("Theme", theme);
};

//多语言管理
HoteamUI.Language = {};
HoteamUI.Language.Context = [];
HoteamUI.Language.GetLanguageList = function () {
    if (HoteamUI.Common.IsNullOrEmpty(HoteamUI.Language.LanguageList)) {
        HoteamUI.Language.LanguageList = HoteamUI.CallAjax.Call(HoteamUI.BaseServicePath, "GetLanguageList", {});
    }
    return HoteamUI.Language.LanguageList;
}

HoteamUI.Language.Lang = function (context, labelname, findException) {
    if (HoteamUI.Common.IsNullOrEmpty(context)) {
        return "";
    }

    if (!context) {
        return "";
    }
    if (HoteamUI.Common.IsNullOrEmpty(labelname) == true) {
        labelname = context.split(".")[1];
        context = context.split(".")[0];
    }

    //若没有传过来labelname，则返回context 解决传空报错问题
    if (HoteamUI.Common.IsNullOrEmpty(labelname)) {
        return "";
    }

    var con = null;
    $.each(DictionaryScript, function (index, val) {
        if (val.N == context) {
            con = val;
            return false;
        }
    });
    //目前采用登录缓存，不再需要服务器请求。
    if (con == null) {
        var paras = { ContextName: context };
        if (findException != undefined) {
            paras.FindException = findException;
        }
        con = HoteamUI.CallAjax.Call(HoteamUI.BaseServicePath, "GetDictionaryJson", { para: paras });
        if (!HoteamUI.Common.IsNullOrEmpty(con)) {
            con = JSON.parse(con);
            DictionaryScript[con.N] = con;
        }
    }
    if (con != undefined && con != null && con.L != undefined) {
        var lab = null;
        $.each(con.L, function (index, val) {
            if (val.N == labelname) {//名称
                lab = val;
                return false;
            }
        });

        if (lab != null && lab.LL != undefined) {//lab.LL为LocalizedLabels
            var text = null;
            var def = null;
            $.each(lab.LL, function (index, val) {
                if (val.LR == HoteamUI.Language.CurLanguage)//val.LR为val.LanguageRef
                    text = val.V; //val.V为Value
                if (val.LR == HoteamUI.AppSets.DefaultLanguage)
                    def = val.V;
            });
            if (text != null) {
                HoteamUI.Trace.Write("debug", "HoteamUI.Language.Lang Successed!", { Context: context, Label: labelname, Value: text });
                return text;
            }
            if (def != null) {
                HoteamUI.Trace.Write("debug", "HoteamUI.Language.Lang Return Default!", { Context: context, Label: labelname, Value: def });
                return def;
            }
        }
    }

    HoteamUI.Trace.Write("warn", "HoteamUI.Language.Lang Failed!", { Context: context, Label: labelname });

    return "";
};
HoteamUI.Language.CurLanguage = HoteamUI.AppSets.DefaultLanguage;
//设置多语言
HoteamUI.Language.SetLanguage = function (lanuage) {

    if (lanuage == null || lanuage == undefined || lanuage == "") {
        var cookie = $.cookie("Language");
        if (PageInit.Language != null && PageInit.Language != undefined && PageInit.Language != "") {
            lanuage = PageInit.Language;
        }
        else if (cookie != null && cookie != undefined && cookie != "") {
            lanuage = cookie;
        }
        else {
            lanuage = HoteamUI.AppSets.DefaultLanguage;
        }
    }

    HoteamUI.Trace.Write("debug", "HoteamUI.Language.SetLanguage!", { Language: lanuage });

    $("script[langsoruce]").each(function (index, val) {
        val.src = val.getAttribute("langsoruce").replace("[LANGUAGE]", lanuage);
    });

    HoteamUI.Language.CurLanguage = lanuage;
    $.cookie("Language", lanuage, { expires: 10 });

    document.title = HoteamUI.Language.Lang("Common", "SystemTitle");
};

//时区管理
HoteamUI.TimeZoneManager = {};
//当前时区
HoteamUI.TimeZoneManager.TimeZone = HoteamUI.AppSets.DefaultTimeZone;
//设置时区
HoteamUI.TimeZoneManager.SetTimeZone = function (timeZone) {
    if (timeZone == null || timeZone == undefined || timeZone == "") {
        var cookie = $.cookie("TimeZone");
        if (PageInit.TimeZone != null && PageInit.TimeZone != undefined && PageInit.TimeZone != "") {
            timeZone = PageInit.TimeZone;
        }
        else if (cookie != null && cookie != undefined && cookie != "") {
            timeZone = cookie;
        }
        else {
            timeZone = HoteamUI.AppSets.DefaultTimeZone;
        }
    }

    HoteamUI.Trace.Write("debug", "HoteamUI.TimeZoneManager.SetTimeZone!", { TimeZone: timeZone });

    $("link[timezonesource]").each(function (index, val) {
        val.href = val.getAttribute("timezonesource").replace("[TIMEZONE]", timeZone);
    });

    HoteamUI.TimeZoneManager.TimeZone = timeZone;
    $.cookie("TimeZone", timeZone);
};

//调试输出接口 ,输出控制部分太简单，以后应该做出专门的控件
HoteamUI.Trace = {};
//调试跟踪等级
HoteamUI.Trace.Level = HoteamUI.AppSets.UITraceDefaultLevel;
//输出信息到调试窗口
HoteamUI.Trace.Write = function (level, msg, detail) {
    if (window.console) {
        level = level.toUpperCase();
        if (this.LevelToInt(level) < this.LevelToInt(this.Level))
            return;

        if (!msg) msg = "";
        else if (typeof msg != "string") msg = JSON.stringify(msg);
        if (!detail) detail = "";
        else if (typeof detail != "string") detail = JSON.stringify(detail);

        var result = (new Date).toLocaleString() + ": " + msg + "\r\n" + detail + "\r\n";
        try {
            switch (level) {
                case "DEBUG":
                case "INFO":
                    console.log(result);
                    break;
                case "WARN":
                    console.warn(result);
                    break;
                case "ERROR":
                case "FATAL":
                    console.error(result);
                    break;
                default:
                    break;
            };
        }
        catch (e) {
            //兼容IE
            console.log(result);
        }
    }
};

HoteamUI.Trace.StartProfiles = function (name) {
    if (window.console) {
        console.profile(name);
    }
}
HoteamUI.Trace.EndProfiles = function () {
    if (window.console) {
        console.profileEnd();
    }
}

//调试等级转换为整型，以便进行对比
HoteamUI.Trace.LevelToInt = function (level) {
    var ret = 1;
    level = level.toUpperCase();
    switch (level) {
        case "DEBUG":
            ret = 1;
            break;
        case "INFO":
            ret = 2;
            break;
        case "WARN":
            ret = 3;
            break;
        case "ERROR":
            ret = 4;
            break;
        case "FATAL":
            ret = 5;
            break;
        default:
            break;
    };
    return ret;
};

//界面相关接口
HoteamUI.UIManager = {};

HoteamUI.UIManager.MergeUrl = function (pageName, para) {

}
//获取页面标签模板
HoteamUI.UIManager.GetTemplate = function (template) {
    HoteamUI.Trace.Write("debug", "HoteamUI.UIManager.GetTemplate!", { TemplateName: template });
    var temp = HoteamUI.CallAjax.Call(HoteamUI.BaseServicePath, "GetTemplate", { para: { Template: template } });
    HoteamUI.Trace.Write("debug", "HoteamUI.UIManager.GetTemplate OK!", { TemplateName: template, ret: temp });
    return temp;
};
//页面配置信息数组
HoteamUI.UIManager.PageConfigs = [];
//获取指定名称的页面配置信息(会自动从缓存中先检查和获取)
HoteamUI.UIManager.GetPageConfig = function (pagename, ignoreNullException) {
    HoteamUI.Trace.Write("debug", "HoteamUI.UIManager.GetPageConfig!", { PageName: pagename });
    if (pagename === undefined)
        return;
    var page = null;
    $.each(PageConfigScript, function (index, val) {
        if (val.Name == pagename) {
            page = val;
            return false;
        }
    });
    if (page != null) {
        HoteamUI.Trace.Write("debug", "HoteamUI.UIManager.GetPageConfig FromCache OK!", { PageName: pagename });
        SetPageOption();
        return page;
    }

    //是否忽略不存在页面的异常 sujingfang
    ignoreNullException = ignoreNullException ? true : false;

    page = HoteamUI.CallAjax.Call(HoteamUI.BaseServicePath, "GetPageConfig", { para: { PageName: pagename, IgnoreNullException: ignoreNullException } });
    if (page != null) {
        this.PageConfigs.push(page);
        PageConfigScript.push(page);
        HoteamUI.Trace.Write("debug", "HoteamUI.UIManager.GetPageConfig FromServer OK!", { PageName: pagename });
        //返回Before，after事件已经加载（即已经自定义过的）的列表
        var pageHandleList = HoteamUI.UIManager.GetDefinedPageHandleBefore_After(page);
        var pageHandlerScript = HoteamUI.CallAjax.Call(HoteamUI.BaseServicePath, "GetPageHandlesScript", { para: { PageName: pagename, DefinedPageHandleBeforeAfter: pageHandleList } });
        var oHead = document.getElementsByTagName('HEAD').item(0);
        var oScript = document.createElement("script");
        oScript.type = "text/javascript";
        oScript.text = pageHandlerScript;
        oHead.appendChild(oScript);
    }
    else {
        HoteamUI.Trace.Write("error", "HoteamUI.UIManager.GetPageConfig FromServer Failed!", { PageName: pagename });
        return null;
    }
    function SetPageOption() {
        if (typeof page.PageOptions === "object")
            return;
        var PageOptions = {};
        HoteamUI.Common.ConverSettings(page.Settings, PageOptions, PageOptions);
        page.PageOptions = PageOptions;

        var PageControls = page.PageControls;
        //for (var pageControl in PageControls) {
        for (var i = 0; i < PageControls.length; i++) {
            var control = PageControls[i];
            var CtrlOptions = {};
            HoteamUI.Common.ConverSettings(control.Settings, CtrlOptions, CtrlOptions);
            control.CtrlOptions = CtrlOptions;
        }
    }
    SetPageOption();
    return page;
};

HoteamUI.UIManager.GetDefinedPageHandleBefore_After = function (page) {
    //获取页面的所有事件，并判断该事件的BeforeAfter是否已经加载过（已经加载，如果再加载就覆盖了）
    var dic = [];//Key:funcName,value:true为已经加载，false为未加载
    if (page && page.PageHandlers) {
        //页面事件
        for (var i = 0; i < page.PageHandlers.length; i++) {
            var handles = page.PageHandlers[i];
            var afterfunc = "HoteamUI_PageEvent_" + (page.Name.replace("-", "") + handles.HandlerName).replace(".", "_") + "_after";
            var beforefunc = "HoteamUI_PageEvent_" + (page.Name.replace("-", "") + handles.HandlerName).replace(".", "_") + "_before";
            if (window[afterfunc] && typeof window[afterfunc] == "function") {
                dic.push(afterfunc);
            }
            if (window[beforefunc] && typeof window[beforefunc] == "function") {
                dic.push(beforefunc);
            }
        }
        //控件事件
        for (var i = 0; i < page.PageControls.length; i++) {
            var ctrl = page.PageControls[i];
            if (ctrl.PageHandlers && ctrl.PageHandlers.length > 0) {
                for (var j = 0; j < ctrl.PageHandlers.length; j++) {
                    var handles = ctrl.PageHandlers[j];

                    var beforefunc = "HoteamUI_PageEvent_" + (page.Name.replace("-", "") + ctrl.ControlID + handles.HandlerName).replace(".", "_") + "_before";
                    var afterfunc = "HoteamUI_PageEvent_" + (page.Name.replace("-", "") + ctrl.ControlID + handles.HandlerName).replace(".", "_") + "_after";
                    if (window[afterfunc] && typeof window[afterfunc] == "function") {
                        dic.push(afterfunc);
                    }
                    if (window[beforefunc] && typeof window[beforefunc] == "function") {
                        dic.push(beforefunc);
                    }
                }
            }
        }
    }
    if (dic.length > 0) {
        return JSON.stringify(dic);
    }
    else {
        return "";
    }
}

//界面层当前guid序号，使用整型数字生成伪guid
HoteamUI.UIManager.CurGUID = 0;
//获取新的伪guid。作为唯一标示，控件原有id不能保证唯一
HoteamUI.UIManager.NewGUID = function () {
    HoteamUI.UIManager.CurGUID++;
    var newid = "guid" + HoteamUI.UIManager.CurGUID;

    HoteamUI.Trace.Write("debug", "NewGUID!", newid);

    return newid;
}

//弹出信息提示窗口，可覆盖实现
HoteamUI.UIManager.MsgBox = function (msg, detialmsg, iserr, callback) {
    alert(msg + "\n\r" + detialmsg);
};
//登录异常信息提示窗口，可覆盖实现
HoteamUI.UIManager.LoginStateExceptionMsgBox = function (msg) {
    alert(msg);
};
//在指定的页面元素内已指定的参数显示指定的页面(第四个参数代表页面内部高度是否自适应)
HoteamUI.UIManager.Show = function (pid, pagename, paras, autofit) {

    HoteamUI.Trace.Write("debug", "HoteamUI.UIManager.Show!", { PageName: pagename, PID: pid, Paras: paras });
    if (pid == null || pid == undefined || pid == "") {
        pid = "PageContainer";
    }
    var select = "#" + pid;
    var old = $(select).attr('pagepagename');
    if (old != null && old != undefined && old != "") {
        if (HoteamUI.UIManager.Close(pid, {}) == false)
            return false;
    }
    var newPara = paras;
    if (paras instanceof Object) {
        var newPara = $.extend(true, {}, paras);
        //HoteamUI.UIManager.MergeUrl(pagename, newPara);
    }

    HoteamUI.Page.SetContainerParas(pid, pagename, newPara, 'true');

    var pageconfig = HoteamUI.UIManager.GetPageConfig(pagename);
    if (pageconfig == null) {
        return false;
    }

    HoteamUI.Page.CreatePageControl(pid, pageconfig, autofit);

    HoteamUI.Page.FirePageEvent(pid, "OnCreate", null, pageconfig);

    return true;
};

HoteamUI.UIManager.ShowPage = function (pid, page, paras, autofit) {

    function SetPageOption() {
        if (typeof page.PageOptions === "object")
            return;
        var PageOptions = {};
        HoteamUI.Common.ConverSettings(page.Settings, PageOptions, PageOptions);
        page.PageOptions = PageOptions;

        var PageControls = page.PageControls;
        for (var pageControl in PageControls) {
            var control = PageControls[pageControl];
            var CtrlOptions = {};
            HoteamUI.Common.ConverSettings(control.Settings, CtrlOptions, CtrlOptions);
            control.CtrlOptions = CtrlOptions;
        }
    }
    SetPageOption();
    if (page == null) {
        return false;
    }

    HoteamUI.Page.CreatePageControl(pid, page, autofit);

    HoteamUI.Page.FirePageEvent(pid, "OnCreate", null, page);

    return true;
}

HoteamUI.UIManager.Close = function (pid) {

    //自定义的页面销毁方法
    var para = HoteamUI.Page.GetContainerPara(pid);
    if (para && para.CloseEvent) {
        var ret = HoteamUI.Common.ExeFunction(para.CloseEvent, pid);
        if (ret != undefined && ret != null) {
            return false;
        }
    }

    var result = HoteamUI.Page.FirePageEvent(pid, "OnClose");
    if (result != undefined && result != null) {
        return false;
    }
    HoteamUI.Page.DisposePageControl(pid);

    var select = "#" + pid;
    $(select).removeAttr('pagepagename');
    $(select).removeAttr('paras');

    return true;
};

HoteamUI.UIManager.PopupAdjust = [];
//以对话框的形式显示指定的页面
//Popup参数使用{ pagename: "pagename", paras: {}, callback: function () { }, data: {}, size: "600*800", title: "自定义标题",modal:false }传值
HoteamUI.UIManager.Popup = function (pagename, paras, callback, data, size, title, modal, icon, afterOpen) {
    //弹出新窗口层
    var isObject = pagename instanceof Object;
    var arguLength = arguments.length;
    var argus = null;
    if (isObject == true && arguLength == 1) {
        argus = pagename;
    }
    else {
        argus = {};
        argus.pagename = pagename;
        argus.paras = paras;
        argus.callback = callback;
        argus.data = data;
        argus.size = size;
        argus.title = title;
        argus.modal = modal;
        argus.afterOpen = afterOpen;
        argus.icon = icon;
    }

    //存在显示的ocx控件，强制设定为模态类型
    if (HoteamUI.Common.OCXIframe.IsExist()) {
        argus.modal = true;
    }

    //for (var i in HoteamUI.UIManager.PopupAdjust) {
    for (var i = 0; i < HoteamUI.UIManager.PopupAdjust.length; i++) {
        HoteamUI.UIManager.PopupAdjust[i](argus);
    }

    var id = HoteamUI.UIManager.NewGUID();
    var pageConfig = HoteamUI.UIManager.GetPageConfig(argus.pagename);
    if (argus.title == null && argus.title == undefined) {
        argus.title = pageConfig.PageOptions.title;
        if (HoteamUI.Common.IsNullOrEmpty(argus.title) == true) {
            argus.title = HoteamUI.Language.Lang("Common", "DialogTitle");
        }
        else {
            argus.title = HoteamUI.Language.Lang(argus.title);
        }
    }

    if (argus.icon == null && argus.icon == undefined) {
        argus.icon = pageConfig.PageOptions.icon;
    }
    var options = $.extend({}, pageConfig.PageOptions);
    if (icon) options.icon = argus.icon;
    options.id = id;
    options.title = argus.title;
    options.data = argus.data;
    options.callback = argus.callback;
    var position = options.position;
    if (position) {
        var positionList = position.split(",");
        if (positionList.length == 2) {
            options.position = [positionList[0], positionList[1]];
        }
    }
    if (argus.size) {
        var sizeArray = argus.size.toString().split("*");
        if (sizeArray.length == 2) {
            options.width = sizeArray[0];
            options.height = sizeArray[1];
        }
    }
    if (argus.modal != undefined && argus.modal != null) {
        options.modal = argus.modal;
    }
    if ($.isFunction(argus.afterOpen)) {
        options.afterOpen = argus.afterOpen;
    }
    options.minWindow = argus.minWindow;
    options.maxWindow = argus.maxWindow;
    if (argus.paras && argus.paras.minWindow != undefined) {
        options.minWindow = argus.paras.minWindow;
    }
    if (argus.paras && argus.paras.maxWindow != undefined) {
        options.maxWindow = argus.paras.maxWindow;
    }
    options.resizable = argus.resizable;
    var ww = $(document).width();
    var wh = $(document).height();

    if (options.width && options.width > ww - 300) {
        options.width = (Math.max(ww - 300, 100)).toString();
    }
    if (options.height && options.height > wh - 100) {
        options.height = (Math.max(wh - 100, 100)).toString();
    }
    //这些页面会调用Show方法，所以会重复添加到Url中所以不需要在此合并
    //if (pagename != "ListManagement" && pagename == "TreeManagement" && pagename == "TabManagement") {
    //    HoteamUI.UIManager.MergeUrl(paras, pagename, paras.ItemName);
    //}
    $.hoteamDialog.create(options);
    $.hoteamDialog.loadPage(id, argus.pagename, argus.paras);
};

//检查是否对话框并调整部分参数
HoteamUI.UIManager.IsPopup = function (pid) {
    var obj = $("#" + pid);
    var ret = obj.hasClass("hoteamDialog");
    return ret;
};
//对话框关闭执行销毁并条用回调函数
HoteamUI.UIManager.Return = function (pid, ret) {
    if (hoteamctrl[pid]) {
        if (hoteamctrl[pid].ctrType == "sideslip") {
            $.hoteamSideslip.hide(pid);
            var callback = hoteamctrl[pid].callback;
            if (callback != null && callback != undefined) {
                hoteamctrl[pid].ret = ret;
                //等待滑块回去后再执行Callback，需优化
                setTimeout("$.hoteamSideslip.sideslipReutrn('" + pid + "')", 400);
            }
        }
        else {
            var isClose = true;
            if (ret == null || HoteamUI.Common.IsNullOrEmpty(ret.IsClose) == true || ret.IsClose == true) {
                $("#" + pid).dialog("close");
            }
            else {
                isClose = false;
            }
            var callback = hoteamctrl[pid].callback;
            if (callback != null && callback != undefined) {
                hoteamctrl[pid].ret = ret;
                setTimeout("$.hoteamDialog.diglogReutrn('" + pid + "'," + isClose + ")", 0);
            }
        }
    }
};
//表单验证机制
HoteamUI.UIManager.FormCheck = function (formId) {
    var result = true;
    if (formId) {
        ctrlObject = HoteamUI.Control.Instance(formId);
        if (ctrlObject) {
            result = ctrlObject.Check();
        }
    }
    return result;
};
//控件管理
HoteamUI.Page = {};
//设置页面容器信息，页面名称，参数等等
HoteamUI.Page.SetContainerParas = function (pid, pagename, paras, addpagename) {
    var select = "#" + pid;
    if (arguments.length == 2) {
        paras = JSON.stringify(arguments[1]);
    } else if (arguments.length == 3) {
        paras = JSON.stringify(arguments[2]);
    }
    else if (arguments.length == 4 && addpagename == 'true') {
        paras = JSON.stringify(arguments[2]);
        $(select).attr('pagepagename', arguments[1]);
    }
    $(select).attr('paras', paras);
};

//获取指定的容器参数
HoteamUI.Page.GetContainerPara = function (pid) {
    var select = "#" + pid;
    var paras = $(select).attr('paras');
    if (HoteamUI.Common.IsNullOrEmpty(paras) == false) {
        return JSON.parse(paras);
    }
    else {
        return "";
    }
};

HoteamUI.Page.ParentPage = function (curpid) {
    var select = "#" + curpid;
    var p = $(select).parents('[pagepagename]').first();

    if (p.size() > 0)
        return p.attr('id');

    return "";
};

HoteamUI.Page.FireParentPageEvent = function (curpid, name, para) {
    var pid = HoteamUI.Page.ParentPage(curpid);
    if (HoteamUI.Common.IsNullOrEmpty(pid) == false) {
        return HoteamUI.Page.FirePageEvent(pid, name, para);
    }
}
HoteamUI.Page.FirePageEvent = function (pid, name, para, pageconfig) {
    var select = "#" + pid;
    //var pagename = $(select).attr('pagepagename');
    //if (!pagename) {
    //    return;
    //}
    //HoteamUI.Trace.Write("debug", "HoteamUI.Page.FirePageEvent!", { PageName: pagename, PID: pid });
    //pageconfig = pageconfig || HoteamUI.UIManager.GetPageConfig(pagename);
    //判断参数是否传入pageconfig,如果传入则直接用，没有传入则从缓存中获取 modify by hw 
    var pagename = "";
    if (!pageconfig) {
        pagename = $(select).attr('pagepagename');
        if (!pagename) {
            return;
        }
        pageconfig = pageconfig || HoteamUI.UIManager.GetPageConfig(pagename);
    } else {
        pagename = pageconfig.Name;
    }
    HoteamUI.Trace.Write("debug", "HoteamUI.Page.FirePageEvent!", { PageName: pagename, PID: pid });

    var handlers = pageconfig.PageHandlers;
    var select = "#" + pid;

    var pageEvent = $.extend({}, para);
    pageEvent.o = HoteamUI.Page.Instance(pid);
    var result = undefined;
    //for (var i in handlers) {
    for (var i = 0; i < handlers.length; i++) {
        var val = handlers[i];
        if (val.HandlerName == name) {
            HoteamUI.Trace.Write("debug", "HoteamUI.Page.FirePageEvent Exec Script!", { Script: val.Script });
            var functionName = ["HoteamUI_PageEvent_", pagename, name].join("").replace(/-/g, "");
            var result = HoteamUI.Common.ExeFunction(functionName, pageEvent);
            HoteamUI.Trace.Write("debug", "HoteamUI.Page.FirePageEvent Exec Script OK!", { Script: val.Script });
        }
    }
    return result;
}
//创建页面控件
HoteamUI.Page.CreatePageControl = function (pid, pageconfig, autofit) {
    HoteamUI.Trace.Write("debug", "CreatePageControl Start!", pageconfig);


    $.each(pageconfig.PageControls, function (index, val) {
        if (val.ParentID == null || val.ParentID == undefined || val.ParentID == "") {
            //parentid, containerid, pagename, controlinfo, controllist,width,height
            var pelem = $("#" + pid);

            HoteamUI.Control.CreateControl({
                parentid: pid,
                containerid: pid,
                pagename: pageconfig.Name,
                controlInfo: val,
                controlList: pageconfig.PageControls,
                width: pelem.width(),
                height: pelem.height(),
                autofit: autofit,
                //增加参数，将pageconfig传递下去，便于后面循环创建控件时用，用于动态创建控件不能从缓存中获取的pageconfig的情况
                //modify by hw
                pageconfig: pageconfig
            });
        }
    });
    HoteamUI.Trace.Write("debug", "CreatePageControl Complete!", pageconfig);
}
//销毁页面控件
HoteamUI.Page.DisposePageControl = function (pid) {
    var pagename = $("#" + pid).attr('pagepagename');
    //页面已加载，则执行OnClose
    if (pagename) {
        var result = HoteamUI.Page.FirePageEvent(pid, "OnClose");
    }
    if (result === false) {
        return false;
    }

    HoteamUI.Trace.Write("debug", "DisposePageControl Start!");
    var pselect = "#" + pid;
    //ocx销毁
    $(pselect + " iframe").remove();

    $("[controltype]", pselect).each(function () {
        HoteamUI.Control.Instance(this.id).Dispose();
    });

    $(pselect).empty2().removeAttr('paras');
    HoteamUI.Trace.Write("debug", "DisposePageControl Complete!");
}

HoteamUI.Page.InstanceByName = function (pagename) {
    var pselect = "[pagepagename='" + pagename + "']";
    return HoteamUI.Page.Instance($(pselect).attr("id"));
}

HoteamUI.Page.InstanceIn = function (containerid, cid, pagename) {
    var pselect = "[containerid='" + containerid + "'][cid='" + cid + "'][pagepagename='" + pagename + "']";
    return HoteamUI.Page.Instance($(pselect).attr("id"));
}
//根据控件guid初始化控件操作类对象实例
HoteamUI.Page.Instance = function (pid) {
    HoteamUI.Trace.Write("debug", "HoteamUI.Page.Instance  return!", pid);

    var page = $.extend({}, HoteamUI.Page.BasePage);
    page.pid = pid;
    return page;
}

HoteamUI.Page.BasePage = {
    pid: "",
    PageName: function () { var select = "#" + this.pid; var pagename = $(select).attr('pagepagename'); return pagename; },
    GetPara: function () { return HoteamUI.Page.GetContainerPara(this.pid); },
    GetControl: function (cid) { return HoteamUI.Control.InstanceIn(this.pid, cid); },
    IsPopup: function () { return HoteamUI.UIManager.IsPopup(this.pid); },
    FireParentPageEvent: function (eventname) { HoteamUI.Page.FireParentPageEvent(this.ContainerID(), eventname); }
};

//控件信息
HoteamUI.Control = {};
//js控件配置信息，为null表示未初始化，将会在首次使用的时候进行初始化
HoteamUI.Control.ControlTypes = null;
//获取指定类型的js控件类型信息
HoteamUI.Control.GetControlType = function (typename) {
    HoteamUI.Trace.Write("debug", "GetControlType!", typename);

    if (HoteamUI.Control.ControlTypes == null || HoteamUI.Control.ControlTypes == undefined) {
        HoteamUI.Control.ControlTypes = HoteamUI.CallAjax.Call(HoteamUI.BaseServicePath, "GetControlTypes", {});

        HoteamUI.Trace.Write("debug", "GetControlType FromService!", HoteamUI.Control.ControlTypes);
    }
    var returntype = null;
    $.each(this.ControlTypes.ControlTypeList, function (index, val) {
        if (returntype == null && val.TypeName == typename) {
            HoteamUI.Trace.Write("debug", "GetControlType OK!", val);
            returntype = val;
        }
    });
    if (returntype == null)
        HoteamUI.Trace.Write("error", "GetControlType Failed!", typename);
    else
        HoteamUI.Trace.Write("debug", "GetControlType OK!", returntype);
    return returntype;
};

//创建控件
//parentid, containerid, pagename, controlinfo, controllist,width,height
HoteamUI.Control.CreateControl = function (options) {
    var typeName = options.controlInfo.TypeName;
    var controltype = this.GetControlType(typeName);

    HoteamUI.Trace.Write("debug", "CreateControl Start!", options.controlInfo);
    var id, pselect = $("#" + options.parentid);
    if (options.existid) {
        id = options.exisid;
    }
    else {
        id = HoteamUI.UIManager.NewGUID();
        pselect.append("<div id = '" + id + "'></div>");
    }
    var select = $("#" + id);
    select.attr("cid", options.controlInfo.ControlID);
    select.attr("controltype", options.controlInfo.TypeName);
    select.attr("containerid", options.containerid);
    select.attr('ctrlpagename', options.pagename);
    select.attr("parentid", options.parentid);
    select.addClass(options.controlInfo.TypeName + " " + options.controlInfo.ControlID + " noMargin");


    if (options.width != undefined) {
        select[0].htWidth = options.width;
    }
    if (options.height != undefined) {
        select[0].htHeight = options.height;
    }

    var control = HoteamUI.Control.Instance(id);
    var ctrlEvent = {};
    ctrlEvent.o = control;

    HoteamUI.Trace.Write("debug", "Call Control Custom CreateFun!", options.controlInfo);
    control.Create(options);
    HoteamUI.Trace.Write("debug", "Call Control Custom CreateFun!", options.controlInfo);

    var handlers = options.controlInfo.PageHandlers;
    $.each(handlers, function (index, val) {
        if (val.HandlerName == "OnCreate") {
            HoteamUI.Trace.Write("debug", "HoteamUI.Control.CreateControl Exec Oncreate Script!", { Script: val.Script });
            var functionName = ["HoteamUI_PageEvent_", options.pagename, options.controlInfo.ControlID, "OnCreate"].join("").replace(/-/g, "");
            HoteamUI.Common.ExeFunction(functionName, ctrlEvent);
            HoteamUI.Trace.Write("debug", "HoteamUI.Control.CreateControl Oncreate Script OK!", { Script: val.Script });
        }
    });

    HoteamUI.Trace.Write("debug", "CreateControl Complete!", options.controlInfo);
    return control;
};
//根据权限进行控制菜单
//HoteamUI.Control.FilterMenuControl = function (options) {
//    //获取路径关系
//    function GetParentPath(curpid, list) {
//        var pid = HoteamUI.Page.ParentPage(curpid);
//        var page = HoteamUI.Page.Instance(pid);
//        var pageName = page.PageName();
//        if (pageName == "HomePageContents") {
//            var tab = page.GetControl("HomePage_Tabs");
//            var navName = tab.GetNavName();
//            if (HoteamUI.Common.IsNullOrEmpty(navName) == false) {
//                list.push(navName);
//            }
//            return;
//        }
//        list.push(pageName);
//        GetParentPath(pid, list);
//    }
//    //删除setting
//    function DeleteSettings(setting, key) {
//        if (setting instanceof Array) {
//            for (var index = 0; index < setting.length;index++) {
//                if (setting[index].Key == key) {
//                    delete setting[index];
//                }
//            }
//        } else {
//            for (var index in setting) {
//                if (setting[index].Key == key) {
//                    delete setting[index];
//                }
//            }
//        }
//    }
//    var filterOption = $.extend(true, {}, options);
//    var ctrlOption = filterOption.controlInfo.CtrlOptions;
//    var setting = filterOption.controlInfo.Settings;
//    for (var item in ctrlOption) {
//        var ctrlItem = ctrlOption[item];
//        if (ctrlItem instanceof Object) {
//            var list = [ctrlItem.textId];
//            GetParentPath(filterOption.containerid, list);
//            var path = list.join(";");
//            //判断权限，不符合权限的删除
//            for (var infoAttr in PlatformUI.Permission) {
//                var info = PlatformUI.Permission[infoAttr];
//                if (info.Name == ctrlItem.textId && path == info.Path) {
//                    delete ctrlOption[item];
//                    DeleteSettings(setting, item);
//                    break;
//                }
//            }
//        }
//    }
//    return filterOption;
//}


//根据页面名称和父控件id获取对应页面配置信息中的所有子控件信息
HoteamUI.Control.ChildCtrlInfo = function (pagename, parentcid) {
    HoteamUI.Trace.Write("debug", "HoteamUI.Control.ChildCtrlInfo!", { PageName: pagename, PCID: parentcid });

    var pageconfig = HoteamUI.UIManager.GetPageConfig(pagename);
    var retarr = [];
    $.each(pageconfig.PageControls, function (index, val) {
        if (val.ParentID == null || val.ParentID == undefined || val.ParentID == "") {
            if (parentcid == null || parentcid == undefined || parentcid == "") {
                retarr.push(val);
            }
        }
        else {
            if (val.ParentID == parentcid) {
                retarr.push(val);
            }
        }
    });
    HoteamUI.Trace.Write("debug", "HoteamUI.Control.ChildCtrlInfo return !", retarr);
    return retarr;
}
HoteamUI.Control.CtrlInfo = function (pagename, cid) {
    HoteamUI.Trace.Write("debug", "HoteamUI.Control.CtrlInfo  !", { PageName: pagename, CID: cid });
    var pageconfig = HoteamUI.UIManager.GetPageConfig(pagename);
    var ret = null;
    $.each(pageconfig.PageControls, function (index, val) {
        if (val.ControlID == cid) {
            ret = val;
        }
    });
    HoteamUI.Trace.Write("debug", "HoteamUI.Control.CtrlInfo return !", ret);
    return ret;
}
HoteamUI.Control.InstanceIn = function (pid, cid) {
    var pselect = "[containerid='" + pid + "'][cid='" + cid + "']";
    return HoteamUI.Control.Instance($(pselect).attr("id"));
}
//根据控件guid初始化控件操作类对象实例
HoteamUI.Control.Instance = function (id) {
    HoteamUI.Trace.Write("debug", "HoteamUI.Control.Instance  !", id);
    ctrl = document.getElementById(id);
    var con = $.extend({}, HoteamUI.Control.BaseControl);
    if (!ctrl)
        return con;
    var type = ctrl.getAttribute("controltype");
    var controltype = this.GetControlType(type);
    con.id = id;

    if (controltype && controltype.OperateFun) {
        ext = eval(controltype.OperateFun);
    }
    con = $.extend(con, ext);
    HoteamUI.Trace.Write("debug", "HoteamUI.Control.Instance  return!", con);
    return con;
}

//控件操作类对象实例通用的基础属性和接口
HoteamUI.Control.BaseControl = {
    id: "",
    Resize: function () { },
    Check: function () { },
    Create: function () { },
    Disable: function () { },
    Enable: function () { },
    Dispose: function () { },
    PageName: function () {
        var select = "#" + this.id;
        return $(select).attr("ctrlpagename");;
    },
    CID: function () {
        var select = "#" + this.id;
        return $(select).attr("cid");
    },
    ControlType: function () {
        var select = "#" + this.id;
        return $(select).attr("controltype");;
    },
    ContainerID: function () {
        var select = "#" + this.id;
        return $(select).attr("containerid");
    },
    ControlInfo: function () {
        return HoteamUI.Control.CtrlInfo(this.PageName(), this.CID());
    },
    OtherControl: function (cid) {
        return HoteamUI.Control.InstanceIn(this.ContainerID(), cid);
    },
    ChildrenControl: function (cid) {
        return HoteamUI.Control.InstanceIn(this.id, cid);
    },
    FireParentPageEvent: function (eventname) {
        HoteamUI.Page.FireParentPageEvent(this.ContainerID(), eventname);
    },
    GetEventFunctionName: function (eventname) {
        var functionName = ["HoteamUI_PageEvent_", this.PageName(), this.CID().replace(/\./g, "_"), , eventname].join("").replace(/-/g, "");
        return functionName;
    }
};

HoteamUI.Window = {};
//页面初始化，根据参数设置加载页面
HoteamUI.Window.InitPage = function () {
    var autoLogin = HoteamUI.Security.AutoLogin();
    if (autoLogin == false) {
        name = HoteamUI.AppSets.LoginPage;
        HoteamUI.UIManager.Show("", name, {});
    }
};

//等待提示
HoteamUI.Window.WaitWindow = {
    Create: function () {
        var waitWindow = "<div id='hoteamWaitWindow' class='hoteam-layout-wait' style='display:none;'/>"
        $("body").append(waitWindow);
    },
    Show: function () {
        $("#hoteamWaitWindow").show();
    },
    LayoutShow: function (id) {
        var container = $("#" + id);
        var waitWindow = container.find(".hoteam-layout-wait");
        if (waitWindow.length == 0) {
            var waitWindowstr = "<div class='hoteam-layout-wait'/>";
            container.append(waitWindowstr);
        }
    },
    Hide: function () {
        $("#hoteamWaitWindow").hide();
    },
    LayoutDestory: function (id) {
        var container = $("#" + id);
        container.find(".hoteam-layout-wait").remove();
    }
}

HoteamUI.Window.DataLoadPointer = {
    Pointer: null,
    Create: function () {
        var src = PageInit.WebRootPath + "/Base/DataLoadPointer.htm";
        $("#body").append("<iframe src='" + src + "' id='hoteamDataLoad' style='z-index:999999999;width:100%;height:5px;border:0px none;position:fixed;left:0px;right:0px;bottom:1px;' frameborder=0 allowTransparency='true' />");
        HoteamUI.Window.DataLoadPointer.Pointer = window.document.all.hoteamDataLoad;
    },
    Loading: function () {
        var iframe = HoteamUI.Window.DataLoadPointer.Pointer;
        if (iframe) {
            var loading = iframe.contentWindow.Loading;
            loading ? loading() : null;
        }

    },
    Complete: function () {
        var iframe = HoteamUI.Window.DataLoadPointer.Pointer;
        if (iframe) {
            var complete = iframe.contentWindow.Complete;
            complete ? complete() : null;
        }
    }
}

HoteamUI.Window.Fixed = null;
//页面窗口大小变化时调整最外层元素，实现自适应
HoteamUI.Window.ConfSize = function () {

    //console.log('HoteamUI.Window.ConfSize ');
    var windowobj = $(window)
    var w = windowobj.width();
    var h = windowobj.height();
    var minWidth = 1000;
    var minHeight = 600;
    var width, height;
    var isChange = true;

    if (window.oldW && window.oldH && (window.oldW == w && window.oldH == h)) {
        return false;
    }

    if (HoteamUI.Window.Fixed === true && w < minWidth && h < minHeight) {
        return false;
    }

    if (w < minWidth) {
        width = minWidth;
        $('html').css('overflow-x', 'auto');
    }
    else {
        width = w;
        $('html').css('overlow-x', 'hidden');
    }

    if (h < minHeight) {
        height = minHeight;
        $('html').css('overflow-y', 'auto');
    } else {
        height = h;
        $('html').css('overlow-y', 'hidden');
    }


    if (w < minWidth && h < minHeight) {
        if (HoteamUI.Window.Fixed === true) {
            isChange = false;
        }
        HoteamUI.Window.Fixed = true;
    }
    else {
        HoteamUI.Window.Fixed = false;
    }

    if (isChange) {
        var PageContainer = $("#PageContainer");
        PageContainer.width(width);
        PageContainer.height(height);
        window.oldW = width;
        window.oldH = height;
    }

    return true;

}

HoteamUI.Window.PageContainerSize = function () {

    if (HoteamUI.Window.ConfSize() == true) {
        //重置控件大小
        $(".hoteam-rightmenu-c").hide();
        $(".hoteam-rightmenuchildren").hide();

        var id = $("div[parentid='PageContainer']").attr("id");
        var ctrlObject;
        if (id) {
            //console.log('Resize');
            HoteamUI.Window.UnBindResize();
            ctrlObject = HoteamUI.Control.Instance(id);
            ctrlObject.Resize();
            HoteamUI.Window.BindResize();
        }

    }
}

HoteamUI.Window.BindResize = function () {
    var timer = null;
    $(window).resize(function () {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(HoteamUI.Window.PageContainerSize, 100);
    });
}

HoteamUI.Window.UnBindResize = function () {
    $(window).unbind('resize');
}

//页面初始化脚本
$(document).ready(function () {
    //设置主题
    HoteamUI.ThemeManager.SetTheme("");

    //设置多语言
    HoteamUI.Language.SetLanguage("");

    //设置登录信息
    if (HoteamUI.Common.IsNullOrEmpty(PageInit.LoginID) == false) { HoteamUI.Security.LoginID = PageInit.LoginID; }

    //开始：需求43 阻止backspace回退
    $(document).keydown(function (event) {
        return HoteamUI.Window.BanBackSpace(event);
    });
    //结束
    //ocx遮盖处理
    $("body").append('<iframe id="ocxIframe" style="width:100%; height:100%; position:absolute;display:none;filter:Alpha(Opacity=1);opacity:0.01;" />');
    HoteamUI.Common.OCXIframe.Init();
    //自适应窗口大小
    HoteamUI.Window.ConfSize();

    var timer = null;
    $(window).resize(function () {
        clearTimeout(timer);
        timer = setTimeout(HoteamUI.Window.PageContainerSize, 200);
    });

    //加载数据提示
    HoteamUI.Window.DataLoadPointer.Create();

    //调用页面初始化接口
    HoteamUI.Window.InitPage();

    //给body绑定事件，主要是rightmenu控件和sideslip控件的隐藏触发
    $("body").on({
        mousedown: function (e) {
            var $target = $(e.target);
            if ($target.closest("." + $.hoteamRightMenu.css.RightMenuC).size() == 0) {
                $(".hoteam-rightmenu-c").hide();
            }
            if ($target.closest(".standard-accordion-hidden").size() == 0) {
                var ele = $(".standard-accordion-hidden");
                if (ele.length > 0) {
                    var height = parseInt(ele.css("height"));
                    var itv = setInterval(function () {
                        height = height - 15;
                        ele.css("height", height);
                        if (height <= 0) {
                            clearInterval(itv);
                        }
                    }, 5);
                    $(".standard-accordion-shade").hide();
                }
            }
            if (($target.closest("." + $.hoteamSideslip.css.sideslip).size() == 0 && $target.closest("ul.dropdown-menu").size() == 0 && $target.closest("div.dropdown-menu").size() == 0) && e.which == 1) {
                var slip = $("." + $.hoteamSideslip.css.sideslip);
                if (slip.length > 0 && parseInt(slip.css("right")) > (-slip.width())) {
                    $.hoteamSideslip.hide(slip.children(".sideslip-content").attr("id"));
                }
            }
        }
    });
});

//合并参数
HoteamUI.ExtendPara = function (para) {
    if (para == undefined) {
        para = {};
    }
    var parabak = $.extend(true, {}, HoteamUI.Security.LoginPara, para);
    return parabak;
}

//日期格式化函数
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month   
        "d+": this.getDate(),    //day   
        "h+": this.getHours(),   //hour   
        "m+": this.getMinutes(), //minute   
        "s+": this.getSeconds(), //second   
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter   
        "S": this.getMilliseconds() //millisecond   
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
            RegExp.$1.length == 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}
//由于IE8中array没有indexof方法，故欲扩展arrayof，但是由于扩展后，增加了property属性，导致代码中大量的for in 循环会出现异常，所以放弃扩展;增加一个公共方法，来替代indexof
//if (!Array.prototype.indexOf) {
// Array.prototype.indexOf = function (elt,from) {
// var len = this.length >>> 0;
//var from = Number(arguments[1]) || 0;
//from = (from < 0) ? Math.ceil(from) : Math.floor(from);
//if (from < 0) {
// from += len;
//}
//for (; from < len; from++) {
//if (from in this && this[from] === elt) {
//return from;
//}
//}
//return -1;
//}
//}
//
HoteamUI.ArrayIndexOf = function (arr, key) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        if (i in arr && arr[i] === key) {
            return i;
        }
    }
    return -1;
}
//获取ActiveX列表
HoteamUI.ActiveX = {};
HoteamUI.ActiveX.GetActiveXInfoList = function (DownLoadAll) {
    if (DownLoadAll == undefined) DownLoadAll = false;
    var data = [];
    if (DownLoadAll) {
        data = ActiveXScript;
    }
    else {
        for (var i = 0; i < ActiveXScript.length; i++) {
            var item = ActiveXScript[i];
            if (item.AutoDownLoad) {
                data.push(item);
            }
        }
    }
    if (data) {
        var result = [];
        for (var index = 0; index < data.length; index++) {
            var item = data[index];
            var url = item.Url.replace("~", PageInit.WebRootPath);
            result.push($("<object  classid='" + item.ClassId + "'  codebase='" + url + "#version=" + item.Version + "'></object>")[0]);
        }
        return $(result);
    }
    return $([]);
}
//通过ActiveXName获取ActiveX

HoteamUI.ActiveX.GetActiveXByName = function (ActiveXName) {
    var data;
    for (var i = 0; i < ActiveXScript.length; i++) {
        var item = ActiveXScript[i];
        if (item.Name == ActiveXName) {
            data = item;
        }
    }
    if (!data) {
        data = HoteamUI.CallAjax.Call(HoteamUI.BaseServicePath, "GetActiveXByName", { name: ActiveXName });
        if (data) {
            ActiveXScript.push(data);
        }
    }
    if (data) {
        var url = data.Url.replace("~", PageInit.WebRootPath);
        return $("<object  classid='" + data.ClassId + "'  codebase='" + url + "#version=" + data.Version + "' width='100%' height='100%'></object>");
    }
    return $([]);
}

//阻止Backspace回退
HoteamUI.Window.BanBackSpace = function (e) {
    var e = e || window.event,
        target = e.target || e.srcElement,
        checkType = "password text textarea",
        type = target.type || target.getAttribute('type') || "none",
        isReadOnly = !!target.getAttribute('readonly'),
        isEnabled = target.getAttribute('enabled') === false ? false : true;

    if (e.keyCode === 8) {
        if (checkType.indexOf(type.toLowerCase()) > -1) {
            if (isReadOnly || !isEnabled) {
                return false;
            }
        }
        else {
            return false;
        }
    }

}

window.onload = function () {
    setTimeout(function () {
        $("#LoginWait_Container").fadeOut("slow");
    }, 1000);
}

$.fn.htWidth = function (value) {
    var self = this;
    if (this.length > 1 && value !== undefined) {
        this.each(function () {
            _htWidth(this);
        });
    }
    else if (this.length == 1) {
        return _htWidth(this[0]);
    }
    function _htWidth(elem) {
        if (value === undefined) {
            if (elem.htWidth === undefined) {
                elem.htWidth = elem.offsetWidth;
            }
            return parseFloat(elem.htWidth);
        }
        else {
            if (elem) {
                if (value < 0) {
                    value = 0;
                }
                if (isNaN(value) == false) {
                    elem.style.width = value + "px";
                    elem.htWidth = value;
                }
                return self;
            }

        }
    }
}
$.fn.htHeight = function (value) {
    var self = this;
    if (this.length > 1 && value !== undefined) {
        this.each(function () {
            _htHeight(this);
        });
    }
    else if (this.length == 1) {
        return _htHeight(this[0]);
    }
    function _htHeight(elem) {
        if (value === undefined) {
            if (elem.htHeight === undefined) {
                elem.htHeight = elem.offsetHeight;
            }
            return parseFloat(elem.htHeight);
        }
        else {
            if (elem) {
                if (value < 0)
                    return self;
                if (isNaN(value) == false) {
                    elem.style.height = value + "px";
                    elem.htHeight = value;
                }
                return self;
            }
        }
    }
}
//noty插件入口
HoteamUI.UIManager.noty = function (params) {
    $.hoteamNoty.create(params);
}
HoteamUI.UIManager.Sideslip = function (paras) {
    paras.id = HoteamUI.UIManager.NewGUID();
    if (paras.paras && paras.paras.Size) {
        var sizeArray = paras.paras.Size.toString().split("*");
        if (sizeArray.length == 2) {
            paras.height = sizeArray[1];
        }
    }
    else {
        //for (var i in HoteamUI.UIManager.PopupAdjust) {
        for (var i = 0; i < HoteamUI.UIManager.PopupAdjust.length; i++) {
            HoteamUI.UIManager.PopupAdjust[i](paras);
        }
        if (paras.size) {
            var sizeArray = paras.size.toString().split("*");
            if (sizeArray.length == 2) {
                paras.height = sizeArray[1];
            }
        }
    }

    $.hoteamSideslip.create(paras);
    $.hoteamSideslip.loadPage(paras.id, paras.pagename, paras.paras);
    $.hoteamSideslip.setTitle(paras.id, paras.title);
    $.hoteamSideslip.show(paras.id, paras.callback);
}
//通过别名获取图片在雪碧图中的名字或者图片的路径(sta:1代表普通图片，2代表激活状态，3代表禁用状态)
//定义一个对象缓存已经获取过的图片
var ImageCache = {};
HoteamUI.Common.GetImage = function (name, size, sta) {
    var sta = sta ? (sta == 1 ? "Default" : (sta == 2 ? "Obvious" : "Disable")) : "Default";
    name = name.toLowerCase();
    ImageCache[name] = ImageCache[name] ? ImageCache[name] : {};
    ImageCache[name][size] = ImageCache[name][size] ? ImageCache[name][size] : {};
    if (ImageCache[name][size][sta]) {
        return ImageCache[name][size][sta];
    } else {
        ImageCache[name][size][sta] = {};
    }
    var restr = "";
    $.each(ImageScript, function (index, obj) {
        if (obj[HoteamUI.ThemeManager.Theme]) {
            var images = obj[HoteamUI.ThemeManager.Theme];
            $.each(images, function (index, obj) {
                if (obj[name]) {
                    var image = obj[name],
                        spsize = "Sprite_" + size,
                        imsize = "CommonImage_" + size;
                    if (image.Sprite && image.Sprite[spsize]) {
                        restr = image.Sprite[spsize][sta];
                        ImageCache[name][size][sta] = restr;
                        return false;
                    } else if (image.CommonImage && image.CommonImage[imsize]) {
                        restr = image.CommonImage[imsize][sta];
                        ImageCache[name][size][sta] = restr;
                        return false;
                    }
                }
            });
        }
    });
    return restr;
}

//获取pageName+itemName路径，并拼接成一个字符串，用来表示唯一路径
HoteamUI.Common.GetOnlyUrl = function (id, str) {
    str = str ? str : "";
    var page = HoteamUI.Page.Instance(id);
    var pageName = page.PageName(),
        pagePara = page.GetPara() || {},
        itemName = pagePara.ItemName || "";
    if (pageName == "HomePageContents") {
        return str;
    } else {
        str = pageName + itemName + str;
    }
    var parentPageId = HoteamUI.Page.ParentPage(id);
    if (parentPageId) {
        str = HoteamUI.Common.GetOnlyUrl(parentPageId, str);
    }
    return str;
}

//#region 系统设置

//系统设置类型
HoteamUI.Common.SystemSettingEnum = {
    GridView: "GridViewSetting",//用户视图
    HomePage: "HomePageSetting"//用户视图
};

//保存视图配置信息
HoteamUI.Common.SavePersonalSetting = function (moduleID, ename, settingValue, settingType, remark, canrepeat) {
    if (HoteamUI.Common.IsNullOrEmpty(ename) == false && HoteamUI.Common.IsNullOrEmpty(settingValue) == false) {
        var view = HoteamUI.Common.GetPersonalSettingObject(ename, settingType);

        var data = { ObjectType: 'INDIVIDUATIONSETTING' };
        data.TOCLIENT = true;
        data.SETTINGVALUE = settingValue;
        data.MODULEID = moduleID;
        data.SETTINGTYPE = settingType;
        data.USETYPE = "Personal";
        data.OWNER = HoteamUI.Security.LoginPara.UserID;
        data.USINGUSERSET = true;
        data.ENAME = ename;
        data.REMARK = remark;
        var isNewObject = true;
        if (HoteamUI.Common.IsNullOrEmpty(view) == false) {
            isNewObject = false;
            data.ObjectID = view.ObjectID;

            //if(HoteamUI.Common.IsNullOrEmpty(vi))

        }

        var ret = InforCenter_Platform_Object_SaveObjectData(data, isNewObject, {});
        if (isNewObject) {
            ret.ObjectID = ret.EID;
            HoteamUI.SystemSettings.push(ret);
        } else {
            $.each(HoteamUI.SystemSettings, function (i, e) {
                if (e.ENAME && e.ENAME == ename) {
                    e.SETTINGVALUE = settingValue;
                }
            })
        }
    }
}
//获取配置信息
HoteamUI.Common.GetPersonalSetting = function (ename, settingType) {
    var ret = HoteamUI.Common.GetPersonalSettingObject(ename, settingType);
    if (ret) {
        return ret.SETTINGVALUE;
    }
    return "";
}
HoteamUI.Common.GetPersonalSettingObject = function (ename, settingType) {
    var setting = [];
    $.each(HoteamUI.SystemSettings || [], function (i, e) {
        if (e.ENAME == ename && (settingType ? e.SETTINGTYPE == settingType : !settingType)) {
            setting.push(e);
            return false;
        }
    })
    var length = setting.length;
    if (length == 0) {
        return null;
    } else {
        return setting[0];
    }
}
HoteamUI.Common.GetValueBySettingKey = function (ename, settingType) {
    var setting = HoteamUI.Common.GetPersonalSetting(ename, settingType);
    var value = "";
    if (HoteamUI.Common.IsNullOrEmpty(setting)) {
        return value;
    }
    var settingValue = JSON.parse(setting);
    return settingValue.Value;
}
//#endregion

//获取滚动条宽度
HoteamUI.Common.GetScrollbarWidth = function () {
    var i, clientWidth, overflowClientWidth, scrollbarWidth;
    var p = document.createElement('p');
    var styles = {
        width: '100px',
        height: '100px'
    };
    for (i in styles) p.style[i] = styles[i];
    document.body.appendChild(p);
    clientWidth = p.clientWidth;
    p.style.overflowY = 'scroll';
    overflowClientWidth = p.clientWidth;
    scrollbarWidth = clientWidth - overflowClientWidth;
    p.parentNode.removeChild(p);
    return scrollbarWidth;
}


/*替换字符串中特殊字符*/
HoteamUI.Common.ReplaceSQLFilter = function (filter) {
    var ret = "";
    if (filter) {
        filter = filter.trim();
        //ret = filter.replace(/\\/g, '\\\\');
        ret = filter.replace(/'/g, '\'\'');
        //ret = ret.replace(/\[/g, '[[]');
        //ret = ret.replace(/]/g, '[]]');
        //ret = ret.replace(/%/g, '\\%');
        //ret = ret.replace(/_/g, '\\_');
    }
    return ret;
}


HoteamUI.Common.HtmlEscape = function (s) {
    return (s + '').replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/'/g, '&#039;')
        .replace(/"/g, '&quot;')
        .replace(/\n/g, '<br />');
}

HoteamUI.Common.HtmlUnEscape = function (s) {
    return (s + '').replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&#039;/g, '\'')
        .replace(/&quot;/g, '"')
        .replace(/<br \/>/g, '\n');
}

//浏览器及浏览器版本
HoteamUI.Browser = {
    isIE: $.browser.msie,
    version: $.browser.version
}
HoteamUI.OCX = {};

HoteamUI.OCX.ShowMask = function (ele) {
    var ocxs = $("object:visible");
    if (ocxs.length == 0) {
        return;
    }
    var elePos = ele.offset();
    var eleWidth = ele.outerWidth();
    var eleHeight = ele.outerHeight();
    ocxs.each(function () {
        var ocx = $(this);
        var ocxPos = ocx.offset();
        if (ocxPos.top >= elePos.top + eleHeight) {
            return true;
        }
        if (ocxPos.left >= elePos.left + eleWidth) {
            return true;
        }
        var iframe = ocx.siblings('iframe');
        iframe.css({
            left: elePos.left - ocxPos.left,
            top: -10,
            width: eleWidth,
            height: eleHeight - (ocxPos.top - elePos.top) + 10
        }).show();
    });
}
HoteamUI.OCX.HideMask = function () {
    var ocxs = $("object:visible");
    if (ocxs.length == 0) {
        return;
    }
    ocxs.each(function () {
        $(this).siblings('iframe').hide();
    });
}


HoteamUI.Common.OCXIframe = {};
HoteamUI.Common.OCXIframe.State = 'HIDE';
HoteamUI.Common.OCXIframe.Timer = [];
HoteamUI.Common.OCXIframe.Init = function () {
    $("body").append('<iframe id="ocxIframe-bg" frameborder="0"  style="position:absolute;display:none;filter:Alpha(Opacity=1);opacity:0.01;" />');
    var iframeBg = document.getElementById('ocxIframe-bg'),
        iframe = iframeBg.contentDocument,
        win = document;

    $(iframe).click(function () {
        $(win).trigger('mousedown');
    });
}
HoteamUI.Common.OCXIframe.Show = function () {
    var ocx = $('object:visible,applet:visible').first(),
        offset,
        top,
        left,
        width,
        height;

    if (ocx.length > 0) {

        while (HoteamUI.Common.OCXIframe.Timer.length > 0) {
            clearTimeout(HoteamUI.Common.OCXIframe.Timer.pop());
        }
        offset = ocx.offset();
        width = ocx.width();
        height = ocx.height();
        left = offset.left;
        top = offset.top;

        $('#ocxIframe-bg').css({
            top: top,
            left: left,
            width: width,
            height: height
        }).show();

        //console.log('show');
    }
}
HoteamUI.Common.OCXIframe.IsExist = function () {

    var ocx = $('object:visible,applet:visible');
    if (ocx.length > 0) {
        return true;
    }
    return false;
}
HoteamUI.Common.OCXIframe.Hide = function () {

    if (event) {
        var target = $(event.target || event.srcElement),
            exception,
            filter = [".ui-menu-item",
                ".hoteam-menu-item",
                ".hoteamTabs-tool",
                ".classicHomePage_setting_ul",
                "#homePage_history",
                "#homePage_collection"
            ].join(", ");

        if (target) {
            exception = target.closest(filter);
            if (exception.length > 0) {
                return;
            };
        }
    }

    if (HoteamUI.Common.OCXIframe.State === "SHOW") {
        return;
    }


    $('#ocxIframe-bg').hide();
    //console.log('hide');
}




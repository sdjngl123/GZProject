Hoteam_InforCenter_FileOnlineView_LoadPage = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    var selectID = null;
    if (pagePara.SelectID != null && pagePara.SelectID != undefined) {
        selectID = pagePara.SelectID;
    }
    //根据对象ID获取文件扩展名对应的TemplateName和JS
    var isMobile = false;

    var wcfPara = {};
    wcfPara.ObjectID = selectID;
    wcfPara.Column = pagePara.Column;

    wcfPara = JSON.stringify(wcfPara);

    var viewOnlineInfo = HoteamUI.DataService.Call("InforCenter.Registered.CommonUploadAndViewService.GetInfoForViewOnline", { para: { ExtendJsonInfo: wcfPara} });
    if (viewOnlineInfo) {
        viewOnlineInfo = JSON.parse(viewOnlineInfo);
        //如果有错误
        if (viewOnlineInfo.Error) {
            var template = page.GetControl("Browseframe");
            template.LoadTemplate("ViewOnlineErrorTemplate");
            var errorContainer = $("#" + template.id + " #ViewOnlineErrorContent").html(viewOnlineInfo.Error);
            return;
        } else {
            var template = page.GetControl("Browseframe");
            template.LoadTemplate(viewOnlineInfo.TemplateName);
            viewOnlineInfo.TemplateCtrlID = template.id;
            viewOnlineInfo.ObjectID = selectID;
            viewOnlineInfo.Column = pagePara.Column;
            HoteamUI.Common.ExeFunction(viewOnlineInfo.ViewTemplateJS, viewOnlineInfo);
        }
    }
}

Hoteam_InforCenter_FileOnlineView_OfficeOnlineViewLoadPage = function (templatepara) {
    if (templatepara.Url) {
        $("#" + templatepara.TemplateCtrlID + " #ViewOnlineFrame").attr("src", templatepara.Url);
    }
}

Hoteam_InforCenter_FileOnlineView_ImageViewLoadPage = function (templatepara) {
    if (templatepara.Url) {
        // templatepara.Url = "http://10.0.81.105:8887/Default/2015/12/GROUPINFO_3bb8303d82c646a0a9e6b45d80548146/liuq@system.com/p1a76vh671r2pjsk3elhbb6e81.svg";
        $("#" + templatepara.TemplateCtrlID + " .ImageView").attr("src", templatepara.Url).attr("alt", templatepara.FileName);
        //初始化控件
        $("#" + templatepara.TemplateCtrlID + " .ImageView").viewer({ inline: true, navbar: false });
    }
}

Hoteam_InforCenter_FileOnlineView_TransformViewLoadPage = function (templatepara) {
    if (templatepara.DownloadUrl) {
        //根据url截取路径
        var url = templatepara.DownloadUrl;
        url = url.replace("/DownloadFile?", "/GetBrowserInfo?");

        //轮询此方法，直到返回状态为转换后的文件信息
        $("#TransformViewContainer").data("URL", url);
        $("#TransformViewContainer").data("TemplatePara", templatepara);
        Hoteam_InforCenter_FileOnlineView_crossdomainAjax(url, {});
    }
}


//跨域调用调用，不可用平台方法
Hoteam_InforCenter_FileOnlineView_crossdomainAjax = function (url, paras) {

    var ret = undefined;
    $.ajax({
        url: url,
        data: paras,
        async: false,
        dataType: 'jsonp',
        cache: false,
        contentType: 'application/json',
        jsonpCallback: 'Hoteam_InforCenter_FileOnlineView_TransformViewCallback',
        success: function (data) {
            if (data && data.d) data = data.d;
            ret = data;
        },
        error: function (err) {
            var msg = '';
            if (err.readyState != null) {
                msg = 'readyState:' + err.readyState + ';';
            }
            if (err.status != null) {
                msg = msg + 'status:' + err.status + ';';
            }
            if (console && console.log) {
                console.log(msg + err.responseText);
            }
        },
        complete: function (XHR, TS) {
            XHR.abort = null;
            XHR = null;
        }
    });
    return ret;
}
//跨域回调
Hoteam_InforCenter_FileOnlineView_TransformViewCallback = function (data) {
    if (data && data.Success === "true" && data.Status === "Support") {
        $("#TransformViewErrorContainer").hide();
        var templatePara = $("#TransformViewContainer").data("TemplatePara");
        //获取转换后的文件路径,为了在分享后也可以调用，需要在分享页面添加全局变量HoteamUI.Security.LoginPara
        var para = {};
        var isMobile = false;
        //if (PLMMCOMMON_GetSystemType() != 'pc') {
        //    isMobile = true;
        //}
        //para.IsMobile = isMobile
        //para.objectID = templatePara.DocumentIDs;
        //para.connect = HoteamUI.Security.LoginPara.Connect;
        //para.timezone = HoteamUI.Security.LoginPara.TimeZone;
        //para.language = HoteamUI.Security.LoginPara.Lang;
        //para.companyID = HoteamUI.Security.LoginPara.CompanyID;
        //para.transformFile = data.FileList;
        //var para = JSON.stringify(para);

        //var convertUrl = Hoteam_InforCenter_FileOnlineView_WebMethod("Registered/CommonUploadAndView/TransmitFileService.asmx/GetTransformFileUrl", para);
        para.ObjectID = templatePara.ObjectID;
        para.Column = templatePara.Column;
        para.TransformFile = data.FileList;
        var convertUrl = HoteamUI.DataService.Call("InforCenter.Registered.CommonUploadAndViewService.GetTransformFileUrl", { para: { ExtendJsonInfo: JSON.stringify(para) } });
        $("#" + templatePara.TemplateCtrlID + " #TransformView").attr("src", convertUrl);
        return;
    }
    if (data && data.Status == "Trans") {
        //正在转换
        $("#TransformViewErrorContent").show().html("文件正在进行转换，请稍后...");
        setTimeout(function () {
            var url = $("#TransformViewContainer").data("URL");
            Hoteam_InforCenter_FileOnlineView_crossdomainAjax(url, {});
        }, 5000);
        return;
    }
    if (data && data.Exception) {
        //提示异常信息
        $("#TransformViewErrorContent").show().html(data.Exception);
        return;
    }
    if (data && data.Status === "TransError") {
        //转换失败
        $("#TransformViewErrorContent").show().html("文件转换发生异常，无法浏览");
        return;
    }
}
//结束:以上方法不可使用平台方法
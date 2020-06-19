var InforCenter_Platform_Export_OnCreate = function (pageEvent) {
    var page = pageEvent;
    var pagePara = page.o.GetPara();
    InforCenter_Platform_Export_Return = "Cancel";
    var ctrlPage = HoteamUI.Page.InstanceIn(page.pid, "Top_Container", "ExportCtrl");
    HoteamUI.Page.SetContainerParas(ctrlPage.pid, "Export", pagePara);
    var MessageCtrl = page.o.GetControl("ExportPage_MessageCtrl");
    if (pagePara.para.message === undefined) {
        //若没有提示信息，读取默认信息
        pagePara.para.message = HoteamUI.Language.Lang("ExportPage.Prompt");
    }

    var message = '',
        iconUrl = PageInit.WebRootPath + "/Base/Image/" + 'question' + '.png',
        messageHtml = ['<div class="confirm-message">',
            '<img src="', iconUrl, '"/>',
            '<p>', pagePara.para.message, '</p>',
            '</div>'].join('');

    MessageCtrl.AppendHtml(messageHtml);
}
//由于是模态打开通用界面，所以不需要考虑多个窗口情况
var InforCenter_Platform_Export_Return = "Cancel";

var InforCenter_Platform_Export_OKOnClick = function (ctrlEvent) {
    var ret = { confirm: "OK" };
    var exportCtrl = ctrlEvent.o.OtherControl("ExportCtrl");
    var messageCtrl = ctrlEvent.o.OtherControl("ExportPage_MessageCtrl");
    var cancelCtrl = ctrlEvent.o.OtherControl("Confirm_btnCancel");
    var containerId = exportCtrl.ContainerID();
    var pagePara = HoteamUI.Page.GetContainerPara(exportCtrl.ContainerID());

    //设置提示信息，并将确定按钮置灰
    var message = pagePara.para.exportingMessage;
    if (message === undefined) {
        message = HoteamUI.Language.Lang("ExportPage.Exporting");
    }

    iconUrl = PageInit.WebRootPath + "/Base/Image/" + 'point' + '.png',
        $('#' + messageCtrl.id + ' .confirm-message>p').text(message);
    $('#' + messageCtrl.id + ' .confirm-message>img').attr("src", iconUrl);
    ctrlEvent.o.Disable();


    var webservicename = pagePara.para.webservice;
    var paras = {};
    paras.Path = pagePara.wcfpath;
    paras.Paras = pagePara.wcfpara;
    paras.FileType = pagePara.para.filetype;
    var webServicePath = PlatformUI.WebServicePath;
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.webServicePath) == false) {
        webServicePath = pagePara.webServicePath;
    }

    var callAjaxParams = {};
    callAjaxParams.servicepath = webServicePath;
    callAjaxParams.method = webservicename;
    callAjaxParams.callback = function (ret, para) {
        var containerId = para.containerId,
            exportCtrl = para.exportCtrl,
            messageCtrl = para.messageCtrl,
            fileName = HoteamUI.Common.IsNullOrEmpty(para.fileName) ? "" : para.fileName;

        HoteamUI.Window.WaitWindow.LayoutDestory(containerId);
        if (ret) {
            //有提示信息
            if (HoteamUI.Common.IsNullOrEmpty(ret[1]) == false) {
                var OneExportPage = function (data, ret1) {
                    //if (HoteamUI.Common.IsNullOrEmpty(ret1) == false
                    //    && HoteamUI.Common.IsNullOrEmpty(ret1.confirm) == false
                    //    && ret1.confirm == 'OK') {
                    InforCenter_Platform_Export_downloadfile(ret[0], exportCtrl, messageCtrl, fileName);
                    //}
                }
                var title = HoteamUI.Language.Lang("Platform.Prompt");
                var para = { pageMode: "OK", message: ret[1] };
                HoteamUI.UIManager.Popup({ pagename: "Confirm", paras: para, callback: OneExportPage, data: {}, title: title });
            }
            else {
                InforCenter_Platform_Export_downloadfile(ret[0], exportCtrl, messageCtrl, fileName);
            }
        }
        else {
            HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), { confirm: "Cancel" });
        }
    };

    //增加自定义文件名支持 sujingfang
    callAjaxParams.paras = { para: paras };
    callAjaxParams.callcackpara = {
        containerId: containerId,
        exportCtrl: exportCtrl,
        messageCtrl: messageCtrl,
        fileName: pagePara.para.filename
    };
    callAjaxParams.errorCallback = function () {
        HoteamUI.Window.WaitWindow.LayoutDestory(containerId);
        HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), { confirm: "Cancel" });
    };

    HoteamUI.Window.WaitWindow.LayoutShow(containerId);
    HoteamUI.CallAjax.AsyncCall(callAjaxParams);


}
InforCenter_Platform_Export_downloadfile = function (fileName, exportCtrl, messageCtrl, downloadName) {
    if (fileName) {
        var extensionName = fileName.substring(fileName.indexOf('.') + 1);
        exportCtrl.LoadPage(PageInit.WebRootPath + "/Base/BaseHandler.ashx?type=downloadFile&fileName=" + fileName + "&extensionName=" + extensionName + "&downloadName=" + encodeURI(downloadName));

        iconUrl = PageInit.WebRootPath + "/Base/Image/" + 'right' + '.png',
            $('#' + messageCtrl.id + ' .confirm-message>img').attr("src", iconUrl);
        $('#' + messageCtrl.id + ' .confirm-message>p').text(HoteamUI.Language.Lang("ExportPage.Success"));

        exportCtrl.OtherControl("Confirm_Btn").HiddenPanel(["item2"])
        InforCenter_Platform_Export_Return = "OK";
        exportCtrl.OtherControl("Confirm_btnCancel").SetText(HoteamUI.Language.Lang("Common.OK"));
    }
    else {

        $('#' + messageCtrl.id + ' .confirm-message>p').text(HoteamUI.Language.Lang("ExportPage.NoFileName"));
    }
}

var InforCenter_Platform_Export_CancelOnClick = function (ctrlEvent) {
    var ret = { confirm: InforCenter_Platform_Export_Return }
    var pid = ctrlEvent.o.ContainerID();
    HoteamUI.UIManager.Return(pid, ret);
}
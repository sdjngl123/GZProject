HoteamUI.Control.OReport = {
    Create: function (options) {
        var self = this;
        options = options || {};
        //添加ActiveX

        var activeXObj = HoteamUI.ActiveX.GetActiveXByName("HoteamsoftReportViewer");
        if (!activeXObj || activeXObj == null)
            return;
        activeXObj.attr("id", self.id + "HoteamsoftReportViewer");

        //设置高度
        $("#" + self.id).height("100%");
        activeXObj[0].height = "100%";

        //事件
        var CtrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions;
        var handles = CtrlOptions.PageHandlers;
        var ctrlEvent = {};
        ctrlEvent.o = HoteamUI.Control.Instance(self.id);
        $("#" + self.id).append(activeXObj);
        $("#" + self.id).append("<iframe style='width:300px;height:300px;position:absolute;display:none;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0)' allowTransparency='true' src='/base/ocx.html'></iframe>");
        HoteamUI.Common.ExeFunction(self.GetEventFunctionName("OnCreateComplete"), ctrlEvent);
    },
    Dispose: function () {
        var activeX = document.getElementById(this.id + "HoteamsoftReportViewer");
        if (HoteamUI.Common.IsNullOrEmpty(activeX) == false && activeX.DisposeActiveX)
            activeX.DisposeActiveX();
    },
    OpenByXMLUrl: function (xmlUrl, hidetoolbar, previewmode) {
        var activeX = document.getElementById(this.id + "HoteamsoftReportViewer");
        _OpenReport(activeX, function () {
            activeX.Open(xmlUrl);
        }, function () {
            if (hidetoolbar) activeX.ShowToolbar(0);
            else activeX.ShowToolbar(1);
            if (previewmode) activeX.Preview();
        });
    },
    OpenByXMLContent: function (xmlContent, hidetoolbar, previewmode) {
        xmlContent = xmlContent.replace("[Host]", location.hostname);
        xmlContent = xmlContent.replace("[Port]", location.port);
        xmlContent = xmlContent.replace("[ApplicationPath]", PageInit.WebRootPath);

        var activeX = document.getElementById(this.id + "HoteamsoftReportViewer");
        _OpenReport(activeX, function () {
            activeX.SetXmlString(xmlContent);
        }, function () {
            if (hidetoolbar) activeX.ShowToolbar(0);
            else activeX.ShowToolbar(1);
            if (previewmode) activeX.Preview();
        });
    }
}

function _OpenReport(activeX, FunAction, callBack) {
    function StarActiveX() {
        try {
            FunAction();
            if (callBack && $.isFunction(callBack)) {
                callBack();
            }
        }
        catch (e) {
            if ($(activeX).size() > 0)
                setTimeout(StarActiveX, 2000);
        }
    }
    StarActiveX();
}
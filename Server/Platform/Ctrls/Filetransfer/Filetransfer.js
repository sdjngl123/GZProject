HoteamUI.Control.OFiletransfer = {
    Create: function (options) {
        options = options || {};
        var self = this;
        //添加ActiveX
        var activeXObj = HoteamUI.ActiveX.GetActiveXByName("HoteamsoftFileComponent");
        if (!activeXObj || activeXObj == null)
            return;
        activeXObj.attr("id", self.id + "_HoteamsoftFileComponent");

        //设置高度        
        $("#" + self.id).height("100%");
        activeXObj[0].height = "100%";

        //事件
        var ControlInfo = (options.controlInfo.controlInfo || this.ControlInfo());
        var handlers = ControlInfo.PageHandlers;
        var ctrlEvent = {};
        ctrlEvent.o = HoteamUI.Control.Instance(self.id);
        $("#" + self.id).append(activeXObj);
        $("#" + self.id).append("<iframe style='width:300px;height:300px;position:absolute;display:none;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0)' allowTransparency='true' src='/base/ocx.html'></iframe>");
        //多语言设置
        activeXObj[0].CurLanguage = HoteamUI.Language.CurLanguage;
        $.each(handlers, function (index, val) {
            if (val.HandlerName == "OnCreateComplete") {
                HoteamUI.Common.ExeFunction(self.GetEventFunctionName("OnCreateComplete"), ctrlEvent);
            }
        });
    },
    _getActiveX: function () {
        return document.getElementById(this.id + "_HoteamsoftFileComponent");
    },
    SetDescription: function (description) {
        var activeX = this._getActiveX();
        if (activeX) {
            activeX.Description = description;
        }
    },
    GetDescription: function () {
        var activeX = this._getActiveX();
        if (activeX) {
            return activeX.Description;
        }
    },
    GetClientIP: function () {
        var activeX = this._getActiveX();
        if (activeX) {
            return activeX.GetClientIP();
        }
    },
    Dispose: function () {
        var activeX = this._getActiveX();
        if (!activeX) {
            return;
        }
        if (HoteamUI.Common.IsNullOrEmpty(activeX) == false && activeX.DisposeActiveX)
            activeX.DisposeActiveX();
        try {
            //开始：修复问题29
            $("script[for='" + activeX.id + "']").remove();
            //结束
        }
        catch (e) {
            throw (e);
        }
    },
    GetDirectoryFiles: function () {
        var self = this;
        var activeX = this._getActiveX();
      
        if (activeX.isInit) {
            return;
        }
        activeX.isInit = true;
        var functionstr = "";
        var handler = document.createElement("script");
        handler.setAttribute("for", activeX.id);
        handler.event = "SelectFileListEvent(FileInfo)";

        var functionStr = "FileInfo = FileInfo.toString().replace(/\\\\/g, '\\\\\\\\');" +
                    "var self = HoteamUI.Control.Instance('" + self.id + "');" +
                    "var ctrlEvent = {};" +
                    "ctrlEvent.o = self;" +
                    "ctrlEvent.SelectSuccessData = $.parseJSON(FileInfo);" +
                    "var handlers = self.ControlInfo().PageHandlers;" +
                    "$.each(handlers, function (index, val) {" +
                        "if (val.HandlerName == \"OnSelectSuccess\") {" +
                            "HoteamUI.Common.ExeFunction(self.GetEventFunctionName(\"OnSelectSuccess\"), ctrlEvent);" +
                        "}" +
                    "});";

        handler.text = functionStr;
        document.body.appendChild(handler);

        setTimeout(function () {
            activeX.GetSelectDictoryFileList();
        }, 1);

    },
    QueiesceUpload: function (option) {
        var defaults = {
            ServerIP: "",
            ServerPort: "",
            Volumn: "",
            BasePath: "",
            SelectFileType: "",
            SingleUpload: false
        };
        var self = this;
        var activeX = this._getActiveX();

        var opt = $.extend(false, defaults, option);
        activeX.ServerIP = opt.ServerIP;
        activeX.ServerPort = opt.ServerPort;
        activeX.DistributeIP = opt.DistributeIP;
        activeX.DistributePort = opt.DistributePort;
        activeX.Volumn = opt.Volumn;
        activeX.BasePath = opt.BasePath;
        activeX.SingleUpload = opt.SingleUpload;
        activeX.SelectFileType = opt.SelectFileType;
        activeX.isInit = true;
        var functionstr = "";
        var handler = document.createElement("script");
        handler.setAttribute("for", activeX.id);
        handler.event = "UploadSuccessEvent(UploadInfo)";

        var functionStr = "UploadInfo = UploadInfo.toString().replace(/\\\\/g, '\\\\\\\\');" +
                    "var self = HoteamUI.Control.Instance('" + self.id + "');" +
                    "var ctrlEvent = {};" +
                    "ctrlEvent.o = self;" +
                    "ctrlEvent.UpLoadSuccessData = $.parseJSON(UploadInfo);" +
                    "var handlers = self.ControlInfo().PageHandlers;" +
                    "$.each(handlers, function (index, val) {" +
                        "if (val.HandlerName == \"OnUploadSuccess\") {" +
                            "HoteamUI.Common.ExeFunction(self.GetEventFunctionName(\"OnUploadSuccess\"), ctrlEvent);" +
                        "}" +
                    "});";

        handler.text = functionStr;
        document.body.appendChild(handler);

        setTimeout(function () {
            activeX.QueiesceUpload(option.UploadData, 0);
        }, 1);

    },
    UpLoad: function (option) {
        var defaults = {
            ServerIP: "",
            ServerPort: "",
            Volumn: "",
            BasePath: "",
            SelectFileType: "",
            SingleUpload: false
        };
        var self = this;
        var activeX = this._getActiveX();
        var showUploadButton = 1;
        if (!HoteamUI.Common.IsNullOrEmpty(option.showUploadButton)) {
            showUploadButton = option.showUploadButton;
        }
        var opt = $.extend(false, defaults, option);
        activeX.ServerIP = opt.ServerIP;
        activeX.ServerPort = opt.ServerPort;
        activeX.Volumn = opt.Volumn;
        activeX.BasePath = opt.BasePath;
        activeX.SingleUpload = opt.SingleUpload;
        if (opt.SelectFileType) {
            var fileExtends = opt.SelectFileType.split(',');
            var fileExtendStr = '';
            $.each(fileExtends, function (i, d) {
                if (d != '') {
                    fileExtendStr += ';*.' + d;
                }
            });
            fileExtendStr = '(' + fileExtendStr.substr(1) + ')|' + fileExtendStr.substr(1) + '||';
            activeX.SelectFileType = fileExtendStr;
        }


        if (activeX.isInit) {
            return;
        }
        activeX.isInit = true;
        //开始：修复问题29
        var functionstr = "";
        var handler = document.createElement("script");
        handler.setAttribute("for", activeX.id);
        handler.event = "UploadSuccessEvent(UploadInfo)";

        var functionStr = "UploadInfo = UploadInfo.toString().replace(/\\\\/g, '\\\\\\\\');" +
                    "var self = HoteamUI.Control.Instance('" + self.id + "');" +
                    "var ctrlEvent = {};" +
                    "ctrlEvent.o = self;" +
                    "ctrlEvent.UpLoadSuccessData = $.parseJSON(UploadInfo);" +
                    "var handlers = self.ControlInfo().PageHandlers;" +
                    "$.each(handlers, function (index, val) {" +
                        "if (val.HandlerName == \"OnUploadSuccess\") {" +
                            "HoteamUI.Common.ExeFunction(self.GetEventFunctionName(\"OnUploadSuccess\"), ctrlEvent);" +
                        "}" +
                         "if (val.HandlerName == \"OnStartUploadMessage\") {" +
                            "HoteamUI.Common.ExeFunction(self.GetEventFunctionName(\"OnStartUploadMessage\"), ctrlEvent);" +
                        "}" +
                        "if (val.HandlerName == \"OnCheckUploadStatusEvent\") {" +
                            "HoteamUI.Common.ExeFunction(self.GetEventFunctionName(\"OnCheckUploadStatusEvent\"), ctrlEvent);" +
                        "}" +
                    "});";

        handler.text = functionStr;
        document.body.appendChild(handler);

        var functionstr = "";
        var handler = document.createElement("script");
        handler.setAttribute("for", activeX.id);
        handler.event = "CheckUploadStatusEvent(UploadInfo)";

        var functionStr = "UploadInfo = UploadInfo.toString().replace(/\\\\/g, '\\\\\\\\');" +
                    "var self = HoteamUI.Control.Instance('" + self.id + "');" +
                    "var ctrlEvent = {};" +
                    "ctrlEvent.o = self;" +
                    "ctrlEvent.UpLoadSuccessData = $.parseJSON(UploadInfo);" +
                    "var handlers = self.ControlInfo().PageHandlers;" +
                    "$.each(handlers, function (index, val) {" +
                        "if (val.HandlerName == \"OnCheckUploadStatusEvent\") {" +
                            "HoteamUI.Common.ExeFunction(self.GetEventFunctionName(\"OnCheckUploadStatusEvent\"), ctrlEvent);" +
                        "}" +
                    "});";

        handler.text = functionStr;
        document.body.appendChild(handler);


        var functionstr = "";
        var handler = document.createElement("script");
        handler.setAttribute("for", activeX.id);
        handler.event = "CheckUploadStatusEvent(UploadInfo)";

        var functionStr = "UploadInfo = UploadInfo.toString().replace(/\\\\/g, '\\\\\\\\');" +
                    "var self = HoteamUI.Control.Instance('" + self.id + "');" +
                    "var ctrlEvent = {};" +
                    "ctrlEvent.o = self;" +
                    "ctrlEvent.UpLoadSuccessData = $.parseJSON(UploadInfo);" +
                    "var handlers = self.ControlInfo().PageHandlers;" +
                    "$.each(handlers, function (index, val) {" +
                        "if (val.HandlerName == \"OnCheckUploadStatusEvent\") {" +
                            "HoteamUI.Common.ExeFunction(self.GetEventFunctionName(\"OnCheckUploadStatusEvent\"), ctrlEvent);" +
                        "}" +
                    "});";

        handler.text = functionStr;
        document.body.appendChild(handler);

        //
        var functionstr = "";
        var handler = document.createElement("script");
        handler.setAttribute("for", activeX.id);
        handler.event = "DeleteVolumnFile(para)";

        var functionStr = "var ctrlEvent = {};" +
                    "ctrlEvent.FileData =para;" +
                    "var self = HoteamUI.Control.Instance('" + self.id + "');" +
                    "ctrlEvent.o = self;" +
                    "var handlers = self.ControlInfo().PageHandlers;" +
                    "$.each(handlers, function (index, val) {" +
                        "if (val.HandlerName == \"OnFileDelete\") {" +
                            "HoteamUI.Common.ExeFunction(self.GetEventFunctionName(\"OnFileDelete\"), ctrlEvent);" +
                        "}" +
                    "});";

        handler.text = functionStr;
        document.body.appendChild(handler);

        //结束

        //开始：问题44 
        setTimeout(function () {
            activeX.ShowUploadForm(showUploadButton);
        }, 1);
        //结束
    },
    DownLoad: function (files) {
        var self = this;
        var activeX = this._getActiveX();
       
        activeX.isInit = true;
        //开始：修复问题29
        var handler = document.createElement("script");
        handler.setAttribute("for", activeX.id);
        handler.event = "DownloadSuccessEvent(DownloadInfo)";

        var functionStr = "var ctrlEvent = {};" +
                    "var self = HoteamUI.Control.Instance('" + self.id + "');" +
                    "ctrlEvent.o = self;" +
                    "ctrlEvent.DownLoadSuccessData = DownloadInfo;" +
                    "var handlers = self.ControlInfo().PageHandlers;" +
                    "$.each(handlers, function (index, val) {" +
                        "if (val.HandlerName == \"OnDownloadSuccess\") {" +
                            "HoteamUI.Common.ExeFunction(self.GetEventFunctionName(\"OnDownloadSuccess\"), ctrlEvent);" +
                        "}" +
                    "});";

        handler.text = functionStr;
        document.body.appendChild(handler);
        //结束
        activeX.DownloadFilesInteractive(files);
        if (activeX.isInit) {
            return;
        }
    },
    IndirectUpload: function (files) {
        var activeX = this._getActiveX();
        activeX.IndirectUpload(files);
    },
    SelectFiles: function (multiSelect, selectFileType) {
        var activeX = this._getActiveX();
        //"(*.txt;*mp3)|*.txt;*.mp3||";
        //activeX.SelectFileType = "文本|*.txt|mp3|*.mp3|word文档|*.docx||";
        activeX.SelectFileType = selectFileType;
        return activeX.SelectFiles(multiSelect);
    },
    IndirectDownloadFiles: function (files, dir, callback) {
        var self = this;
        //开始：问题34
        setTimeout(function () {
            var activeX = self._getActiveX();
            var ret = activeX.IndirectDownloadFiles(files, dir);
            var handler = document.createElement("script");
            handler.setAttribute("for", activeX.id);
            handler.event = "DownloadSuccessEvent(DownloadInfo)";
            handler.text = "var ctrl= HoteamUI.Control.Instance('" + self.id + "');" + callback + "(ctrl,DownloadInfo);";
            document.body.appendChild(handler);
        }, 100);
        //结束
    },
    DeleteFile: function (file, callBack) {
        var activeX = this._getActiveX();
        activeX.DeleteFile(file);
        if ($.isFunction(callBack)) {
            callBack();
        }
    },
    ShowFileViewForm: function (option, onlyview) {
        var self = this;
        var opt = '{ServerIP:"' + option.ServerIP + '",ServerPort:"' + option.ServerPort + '",DistributeIP:"' + option.DistributeIP + '",DistributePort:"' + option.DistributePort +'",Volumn:"' + option.Volumn + '",Path:"' + option.Path + '"';
        if (option.SubFileList && option.SubFileList.length > 0) {
            opt += ',SubFileList:[';
            var tempStr = '';
            for (var i = 0; i < option.SubFileList.length; i++) {
                var curFile = option.SubFileList[i];
                tempStr += ',{IsDeal:"' + curFile.IsDeal + '",ServerIP:"' + curFile.ServerIP + '",ServerPort:"' + curFile.ServerPort + '",DistributeIP:"' + curFile.DistributeIP + '",DistributePort:"' + curFile.DistributePort + '",Volumn:"' + curFile.Volumn + '",Path:"' + curFile.Path + '",Srcpath:"' + curFile.Srcpath + '",User:"' + curFile.User + '",AllowPrint:"' + curFile.AllowPrint + '",ObjectID:"' + curFile.ObjectID + '",ObjectName:"' + curFile.ObjectName + '"}';
            }
            opt += tempStr.substr(1) + ']';
        }
        opt += ',User:"' + option.User + '",AllowPrint:"' + option.AllowPrint + '",ObjectID:"' + option.ObjectID + '",ObjectName:"' + option.ObjectName + '"}';

        var activeX = this._getActiveX();
        //转换bool 防止意外字符
        onlyview = !!onlyview;
        //开始：新增文件加载完成事件
        if (activeX.isInit) {
            return;
        }
        activeX.isInit = true;
        var functionstr = "";
        var handler = document.createElement("script");
        handler.setAttribute("for", activeX.id);
        handler.event = "LoadCompleteEvent(LoadInfo)";

        var functionStr = "LoadInfo = LoadInfo.toString().replace(/\\\\/g, '\\\\\\\\');" +
                    "var self = HoteamUI.Control.Instance('" + self.id + "');" +
                    "var ctrlEvent = {};" +
                    "ctrlEvent.o = self;" +
                    "ctrlEvent.LoadCompleteSuccessData = $.parseJSON(LoadInfo);" +
                    "var handlers = self.ControlInfo().PageHandlers;" +
                    "$.each(handlers, function (index, val) {" +
                        "if (val.HandlerName == \"OnLoadComplete\") {" +
                            "HoteamUI.Common.ExeFunction(self.GetEventFunctionName(\"OnLoadComplete\"), ctrlEvent);" +
                        "}" +
                    "});";

        handler.text = functionStr;
        document.body.appendChild(handler);
        //结束

        //开始：问题44 
        setTimeout(function () {
            activeX.ShowFileViewForm(opt, onlyview ? 1 : 0);
        }, 1);
        //结束
    },
    GetSviewInterface: function () {
        var activeX = this._getActiveX();
        return activeX.GetSviewInterface();
    },
    //检出
    CheckOut: function (fileInfo) {
        var activeX = this._getActiveX();
        
        if (activeX.isInit) {
            return;
        }
        activeX.isInit = true;
        //开始：修复问题29
        var handler = document.createElement("script");
        handler.setAttribute("for", activeX.id);
        handler.event = "DownloadSuccessEvent(DownloadInfo)";

        var functionStr = "";
        handler.text = functionStr;
        document.body.appendChild(handler);

        if (activeX != null && activeX != undefined) {
            activeX.CheckoutFile(fileInfo);
        }
    },
    //检入
    CheckIn: function (fileInfo) {
        var activeX = this._getActiveX();
     
        if (activeX.isInit) {
            return;
        }
        activeX.isInit = true;
        //开始：修复问题29
        var handler = document.createElement("script");
        handler.setAttribute("for", activeX.id);
        handler.event = "UploadSuccessEvent(UploadInfo)";

        var functionStr = "";
        handler.text = functionStr;
        document.body.appendChild(handler);
        if (activeX != null && activeX != undefined) {
            activeX.CheckInFile(fileInfo);
        }
    },
    //文件编辑
    EditFile: function (fileInfo, callback, downloadCallback) {

        var activeX = this._getActiveX();
        activeX.isInit = true;
        //开始：修复问题29
        var handler = document.createElement("script");
        handler.setAttribute("for", activeX.id);
        handler.event = "CheckOutSuccessEvent(FileInfo)";

        var functionStr = "var ctrl = HoteamUI.Control.Instance('" + this.id + "');" + callback + "(ctrl,FileInfo);";

        handler.text = functionStr;
        document.body.appendChild(handler);

        var handler = document.createElement("script");
        handler.setAttribute("for", activeX.id);
        handler.event = "DownloadSuccessEvent(FileInfo)";

        var functionStr = "var ctrl = HoteamUI.Control.Instance('" + this.id + "');" + downloadCallback + "(ctrl,FileInfo);";

        handler.text = functionStr;
        document.body.appendChild(handler);

        if (activeX != null && activeX != undefined) {
            activeX.EditeCheckOutFile(fileInfo);
        }
    },
    CheckFilesUpload: function () {
        var self = this;
        var activeX = this._getActiveX();
   
        activeX.isInit = true;
        var functionstr = "";
        var handler = document.createElement("script");
        handler.setAttribute("for", activeX.id);
        handler.event = "UploadSuccessEvent(UploadInfo)";

        var functionStr = "UploadInfo = UploadInfo.toString().replace(/\\\\/g, '\\\\\\\\');" +
                    "var self = HoteamUI.Control.Instance('" + self.id + "');" +
                    "var ctrlEvent = {};" +
                    "ctrlEvent.o = self;" +
                    "ctrlEvent.UpLoadSuccessData = $.parseJSON(UploadInfo);" +
                    "var handlers = self.ControlInfo().PageHandlers;" +
                    "$.each(handlers, function (index, val) {" +
                        "if (val.HandlerName == \"OnUploadSuccess\") {" +
                            "HoteamUI.Common.ExeFunction(self.GetEventFunctionName(\"OnUploadSuccess\"), ctrlEvent);" +
                        "}" +
                    "});";

        handler.text = functionStr;
        document.body.appendChild(handler);
        if (activeX != null && activeX != undefined) {
            activeX.CheckFilesUpload();
        }
    },
    CheckFileOpen: function (FilePath) {
        var activeX = this._getActiveX();
        return activeX.CheckFileOpen(FilePath);
    },
    Disable: function () {
        var id=this.id;
        var element = $("#" + id);
        var html = '<div class="formbulider_self_disable" style="width:100%;height:100%;position:absolute;top:0;left:0;cursor:no-drop;z-index:9999;"></div>';
        element.parents("td").css("position", "relative").append(html);

    },
    Enable: function () {
        var id = this.id;
        var element = $("#" + id);
        element.parents("td").find(".formbulider_self_disable").remove();
    },
    SendParaToFileServer: function (fileInfo) {
        var self = this;
        var activeX = this._getActiveX();
        activeX.isInit = true;
        var functionstr = "";
        var handler = document.createElement("script");
        handler.setAttribute("for", activeX.id);
        handler.event = "CheckUploadStatusEvent(UploadInfo)";

        var functionStr = "UploadInfo = UploadInfo.toString().replace(/\\\\/g, '\\\\\\\\');" +
                    "var self = HoteamUI.Control.Instance('" + self.id + "');" +
                    "var ctrlEvent = {};" +
                    "ctrlEvent.o = self;" +
                    "ctrlEvent.UpLoadSuccessData = $.parseJSON(UploadInfo);" +
                    "var handlers = self.ControlInfo().PageHandlers;" +
                    "$.each(handlers, function (index, val) {" +
                        "if (val.HandlerName == \"CheckUploadStatusEvent\") {" +
                            "HoteamUI.Common.ExeFunction(self.GetEventFunctionName(\"CheckUploadStatusEvent\"), ctrlEvent);" +
                        "}" +
                    "});";

        handler.text = functionStr;
        document.body.appendChild(handler);
        if (activeX != null && activeX != undefined) {
            activeX.SendParaToFileServer(fileInfo);
        }
    }
}
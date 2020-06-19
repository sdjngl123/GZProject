HoteamUI.Control.OOffice = {
    Create: function (options) {
        options = options || {};
        var self = this;
        var CtrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions;
        CtrlOptions = $.extend({}, hoteamWebOffice.options, CtrlOptions);
        CtrlOptions.parentid = self.id;
        CtrlOptions.id = self.id + "_HoteamsoftOffice";
        //事件
        var handles = (options.controlInfo || this.ControlInfo()).PageHandlers;
        var ctrlEvent = {};
        ctrlEvent.o = HoteamUI.Control.Instance(self.id);
        hoteamWebOffice.create(CtrlOptions);
    },
    CreateNewFile: function (documentType) {
        //Word文档：				“Word.Document”
        //PowerPoint幻灯片：		“PowerPoint.Show”
        //Excel工作表：				“Excel.Sheet”
        //Excel图表： 				"Excel.Chart"
        //Visio画图： 				"Visio.Drawing"
        //	MS Project项目：			"MSProject.Project"

        var id = this.id + "_HoteamsoftOffice";
        var ctrl = window.document.all[id];
        if (!ctrl.CreateNew) {
            return;
        }
        ctrl.CreateNew(documentType);
        hoteamWebOffice.changeMode({ mode: "edit", id: id });
        hoteamWebOffice.protectFile(ctrl);
    },
    OpenLocalFile: function (document) {
        var id = this.id + "_HoteamsoftOffice";
        hoteamWebOffice.openLocalFile({ id: id, document: document });
    },
    OpenFromURL: function (url) {
        var id = this.id + "_HoteamsoftOffice";
        //开始：问题33
        if (url && typeof url === "string" && url.toLowerCase().indexOf("http://") === -1) {
            url = [location.protocol, "//", window.location.host, url].join("");
            url = url.replace("~", PageInit.WebRootPath);
        }
        //结束
        hoteamWebOffice.openFromURL({ id: id, url: url });
    },
    SaveToLocal: function (document, isClearReviewMark) {
        var id = this.id + "_HoteamsoftOffice";
        hoteamWebOffice.saveToLocal({ id: id, document: document, isClearReviewMark: isClearReviewMark });
    },
    Close: function () {
        var id = this.id + "_HoteamsoftOffice";
        hoteamWebOffice.close({ id: id });
    },
    ChangeMode: function (mode, menu) {
        var id = this.id + "_HoteamsoftOffice";
        hoteamWebOffice.changeMode({ id: id, mode: mode, menu: menu });
    },
    DoHandSign: function () {
        var id = this.id + "_HoteamsoftOffice";
        hoteamWebOffice.doHandSign({ id: id, userName: HoteamUI.Security.LoginPara.UserID });
    },
    SetReviewModify: function (isEnterReview) {
        //仅对doc文档有效
        var id = this.id + "_HoteamsoftOffice";
        var loginPara = HoteamUI.Security.LoginPara;
        var useCode = [loginPara.UserName, "(", loginPara.UserCode, ")"].join("");
        hoteamWebOffice.setMarkModify({ id: id, isEnterReview: isEnterReview, useCode: useCode });
    },
    ShowRevisions: function (isShowRevisions) {
        var id = this.id + "_HoteamsoftOffice";
        hoteamWebOffice.showRevisions({ id: id, isShowRevisions: isShowRevisions });
    },
    ClearSigns: function (userID) {
        var id = this.id + "_HoteamsoftOffice";
        hoteamWebOffice.clearSigns({ id: id, userID: userID });
    },
    PrintOut: function () {
        var id = this.id + "_HoteamsoftOffice";
        hoteamWebOffice.printOut({ id: id });
    },
    PrintPreview: function () {
        var id = this.id + "_HoteamsoftOffice";
        hoteamWebOffice.printPreview({ id: id });
    },
    FullScreen: function () {
        var id = this.id + "_HoteamsoftOffice";
        document.getElementById(id).FullScreenMode = true;
    }
}


hoteamWebOffice = {
    options: {
        parentid: null,
        id: null,
        mode: "view", //对外设置属性
        document: null  
    },
    create: function (options) {
        //参数格式{id:null,mode:null}
        var o = $.extend({}, this.options, options);
        //控件初始化
        var activeXObj = "";
        activeXObj = activeXObj + '<object id="' + o.id + '" classid="clsid:C9BC4DFF-4248-4a3c-8A49-63A7D317F404"    ';
        activeXObj = activeXObj + ' width="100%" height="100%">   ';
        activeXObj = activeXObj + '<param name="ProductCaption" value="' + HoteamUI.AppSets.OfficeProductCaption + '">   ';
        activeXObj = activeXObj + '<param name="ProductKey" value="' + HoteamUI.AppSets.OfficeProductKey + '">  ';
        activeXObj = activeXObj + '<param name="BorderStyle" value="1">   ';
        activeXObj = activeXObj + '<param name="BorderColor" value="14402205">   ';
        activeXObj = activeXObj + '<param name="TitlebarColor" value="15658734">   ';
        activeXObj = activeXObj + '<param name="TitlebarTextColor" value="0">   ';
        activeXObj = activeXObj + '<param name="Caption" value="华天软件在线编辑控件">   ';
        activeXObj = activeXObj + '<param name="IsUseUTF8URL" value="-1">   ';
        activeXObj = activeXObj + '<param name="IsUseUTF8DATA" value="-1">   ';
        activeXObj = activeXObj + '<param name="MaxUploadSize" value="10000000">   ';
        activeXObj = activeXObj + '<param name="MenubarColor" value="14402205">   ';
        activeXObj = activeXObj + '<param name="MenuButtonColor" VALUE="16180947">   ';
        activeXObj = activeXObj + '<param name="MenuBarStyle" value="3">   ';
        activeXObj = activeXObj + '<param name="MenuButtonStyle" value="7">   ';
        activeXObj = activeXObj + '<param name="Titlebar" value="0">';
        activeXObj = activeXObj + '<param name="Statusbar" value="0">';
        activeXObj = activeXObj + '<param name="Menubar" value="0">';
        activeXObj = activeXObj + '<param name="IsNoCopy" value="1">';
        activeXObj = activeXObj + '<param name="Toolbars" value="0">';
        activeXObj = activeXObj + '<param name="Statusbar" value="0">';
        activeXObj = activeXObj + '<span style="color: red">不能装载文档控件。请在检查浏览器的选项中检查浏览器的安全设置。</span>';
        activeXObj = activeXObj + '</object>';

        $("#" + o.parentid).append(activeXObj);
        var activeXObj = $("#" + o.id);
        if (!activeXObj.SetReadOnly) {//判断office插件是否存在，如果不存在，则不往下运行
            return;
        }
        if (activeXObj.length > 0) {
            activeXObj = activeXObj[0];
            this.changeMode(o);
        }
    },
    changeMode: function (options) {
        //参数格式{id:null,mode:null}
        var o = $.extend({}, hoteamWebOffice.options, options);
        var activeXObj = $("#" + o.id);
        if (activeXObj.length > 0) {
            activeXObj = activeXObj[0];
            if (o.mode == "edit") {
                activeXObj.IsNoCopy = false;
                activeXObj.SetReadOnly(false, "");
                if (activeXObj.DocFileName) {
                    this.openLocalFile({ id: o.id, document: activeXObj.DocFileName });
                }
                activeXObj.Menubar = false;
                activeXObj.Toolbars = true;
                activeXObj.ReadOnly = false;
                activeXObj.Protect = false;
                activeXObj.CancelSheetRightClick = true;
                activeXObj.CancelWordRightClick = true;
            }
            else {
                activeXObj.IsNoCopy = false;
                activeXObj.ReadOnly = true;
                activeXObj.SetReadOnly(true, "");
                if (activeXObj.DocFileName) {
                    this.openLocalFile({ id: o.id, document: activeXObj.DocFileName, readonly: true });
                }
                activeXObj.Menubar = false;
                activeXObj.Toolbars = false;
            }
        }
    },
    protectFile: function (activeXObj) {
        if (activeXObj.ReadOnly) {
            /*
            //DocType
            0：没有文档；
            100： 其他类型文档；
            1:Word
            2:Excel.Sheet或者Excel.Chart
            3:PowerPoint.Show
            4:Visio.Drawing
            5:MSProject.Project
            6:WPS Doc
            7:KingSoft Sheet
            */
            if (activeXObj.DocType == 1 || activeXObj.DocType == 6) {
                activeXObj.ActiveDocument.Protect(3, false, "hoteamsoft", false, false);
            }
            else if (activeXObj.DocType == 2 || activeXObj.DocType == 7) {
                //excel 保护未找到解决方案
                //activeXObj.ActiveDocument.Protect(3, false, "hoteamsoft", false, false, false);
            }
            activeXObj.Protect = true;
        }
        else {
            if (activeXObj.Protect) {
                activeXObj.ActiveDocument.Unprotect("hoteamsoft");
                activeXObj.Protect = false;
            }
        }
    },
    openLocalFile: function (options) {
        //参数格式{id:null,mode:null,document:null}
        var o = $.extend({}, hoteamWebOffice.options, options);
        var activeXObj = $("#" + o.id);
        if (activeXObj.length > 0) {
            activeXObj = activeXObj[0];
            var document = o.document;
            var readonly = activeXObj.ReadOnly;
            activeXObj.OpenLocalFile(document, readonly);
            this.protectFile(activeXObj);

        }
    },
    openFromURL: function (options) {
        //参数格式{id:null,mode:null,url:null}
        var o = $.extend({}, hoteamWebOffice.options, options);
        var activeXObj = $("#" + o.id);
        if (activeXObj.length > 0) {
            activeXObj = activeXObj[0];
            var document = o.url;
            var readonly = activeXObj.ReadOnly;
            activeXObj.OpenFromURL(document, readonly);
            this.protectFile(activeXObj);
        }
    },
    saveToLocal: function (options) {
        //参数格式{id:null,document:null,isClearReviewMark:true}
        var o = $.extend({}, { id: null, document: null, isClearReviewMark: true }, options);
        var activeXObj = $("#" + o.id);
        if (activeXObj.length > 0) {
            activeXObj = activeXObj[0];
            var document = o.document;
            if (document == null || document == undefined) {
                document = activeXObj.DocFileName;
            }
            try {
                if (options.isClearReviewMark && activeXObj.ActiveDocuement) {
                    activeXObj.ActiveDocument.AcceptAllRevisions();
                }
                activeXObj.SaveToLocal(document, true);
            }
            catch (e) {
                alert("can't save!");
            }
        }
    },
    doHandSign: function (options) {
        //{userName:"anonymous"}
        var o = $.extend({}, { userName: "anonymous" }, options);
        var activeXObj = $("#" + o.id);
        if (activeXObj.length > 0) {
            activeXObj = activeXObj[0];
            if (!activeXObj.IsNoCopy) {
                activeXObj.SetReadOnly(false, "");
                activeXObj.DoHandSign2(o.userName);
            }
            else {
                alert("view mode,can't mark");
            }
        }
    },
    close: function (options) {
        //id
        var o = $.extend({}, hoteamWebOffice.options, options);
        var activeXObj = $("#" + o.id);
        if (activeXObj.length > 0) {
            activeXObj = activeXObj[0];
            activeXObj.Close();

        }
    },
    setMarkModify: function (options) {
        var o = $.extend({}, { isEnterReview: false }, options);
        var activeXObj = $("#" + o.id);
        if (activeXObj.length > 0) {
            activeXObj = activeXObj[0];
            if (activeXObj.ActiveDocument) {
                //设置用户名
                with (activeXObj.ActiveDocument.Application) {
                    UserName = o.useCode;
                }
                var boolvalue = o.isEnterReview;
                //打开或者关闭修订模式
                activeXObj.ActiveDocument.TrackRevisions = boolvalue;
                //允许或禁止显示修订工具栏和工具菜单
                activeXObj.ActiveDocument.CommandBars("Reviewing").Enabled = !boolvalue;
                activeXObj.ActiveDocument.CommandBars("Track Changes").Enabled = !boolvalue;
                activeXObj.IsShowToolMenu = !boolvalue;
                //打开或者关闭修订模式
                activeXObj.ActiveDocument.TrackRevisions = boolvalue;
                //显示/不显示修订文字
                activeXObj.ActiveDocument.ShowRevisions = boolvalue;
            }
        }
    },

    showRevisions: function (options) {
        //{id:null,isShowRevisions:false}
        var o = $.extend({}, { id: null, isShowRevisions: false }, options);
        var activeXObj = $("#" + o.id);
        if (activeXObj.length > 0) {
            activeXObj = activeXObj[0];
            //显示/不显示修订文字
            activeXObj.ActiveDocument.ShowRevisions = o.isShowRevisions;
        }
    },
    clearSigns: function (options) {
        //{id:null,userID:"*"}
        var o = $.extend({}, { id: null, userID: "*" }, options);
        var activeXObj = $("#" + o.id);
        if (activeXObj.length > 0) {
            activeXObj = activeXObj[0];
            activeXObj.ClearSigns(o.userID, "", 0);
        }
    },
    printOut: function (options) {
        //{id:null}
        var o = $.extend({}, { id: null }, options);
        var activeXObj = $("#" + o.id);
        if (activeXObj.length > 0) {
            activeXObj = activeXObj[0];
            activeXObj.PrintOut(true);
        }
    },
    printPreview: function (options) {
        //{id:null}
        var o = $.extend({}, { id: null }, options);
        var activeXObj = $("#" + o.id);
        if (activeXObj.length > 0) {
            activeXObj = activeXObj[0];
            activeXObj.PrintPreview();
        }
    }
}
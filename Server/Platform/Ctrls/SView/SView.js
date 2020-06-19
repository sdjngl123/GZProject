var sview0 = null;
HoteamUI.Control.OSView = {
    Create: function (options) {
        options = options || {};
        var self = this;
        var id = this.id + '_sivew';
        var parentId = this.id;
        var ctrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions;
        ctrlOptions = $.extend(true, {}, $.hoteamDropDown.defaults, ctrlOptions);
        ctrlOptions.parentId = parentId;
        ctrlOptions.id = id;
        ctrlOptions.autofit = options.autofit;
        //事件参数
        var handlers = (options.controlInfo || this.ControlInfo()).PageHandlers;
        ctrlOptions.event = {};
        ctrlOptions.o = HoteamUI.Control.Instance(parentId);
        $.hoteamSView.create(ctrlOptions);
    },
    OpenFile: function (filePath) {
        if (!HoteamUI.Common.IsNullOrEmpty(filePath)) {
            try {
                sview0.Open(filePath, true);
            }
            catch (e) {
                $("#jdzw").css("width", "100%");
                $("#jdz").html("<span style='color:red;'>无法正常打开，请检查原始模型是否正确或联系客服人员！</span>");
            }
        }
    },
    Resize: function () {
    }
};

{
    (function ($) {
        $.hoteamSView = {
            defaults: {
                isOpenCrot: false,
                animationStatus: true,
                usem2: false, //为了限制右键菜单混乱而使用的标志符
                isOpenJoystick: false,
                walkingMode: false,
                usePMI: true,
                pmiServer: "http://service.sv3d.cn/service/system",
                decryptoFile: false, // 配置加密文件密钥
            },
            create: function (o) {
                if (!Detector.webgl) {
                    Detector.addGetWebGLMessage();
                }
                var sviewHtml =
                    [" <div id='sview0' style='width: 100%; height: 100%; position: absolute; background - color: AliceBlue; z - index: 0'>"
                        + " </div> "];
                $("#" + o.parentId).append(sviewHtml);
                sview0 = initSView('sview0', o);
                sview0.SetSViewBaseUrl(jsFilePath + 'Platform/Ctrls/SView/');
                sview0.SetLicenceOptionUserId("123456");
            }
        }
    })(jQuery);
}
HoteamUI.Control.OPageContainer = {
    Create: function (options) {
        options = options || {};
        var defaults = {
            pid: null,
            pageName: null,
            paras: null
        };
        var self = this;
        //设置参数
        var CtrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions;
        var o = $.extend({}, defaults, CtrlOptions);
        o.pid = this.id;
        $("#" + o.pid).data("autofit", options.autofit);
        o.paras = o.paras ? o.paras : {};
        var para = HoteamUI.Page.Instance(options.containerid).GetPara();
        if (para) {
            o.paras.Url = options.pagepara ? options.pagepara.Url : para.Url;
        }

        //事件
        var handlers = (options.controlInfo || this.ControlInfo()).PageHandlers;
        $.each(handlers, function (index, val) {
            if (val.HandlerName == "OnFocus") {//加载数据方法
                o.OnFocus = self.GetEventFunctionName("OnFocus");
            }
        });
        if (o.borderHighLight) {
            $("#" + o.pid).addClass("pageContainer-highlight-transparent")
                .attr("borderHighLight", "borderHighLight")
                .on("mousedown", function () {
                    $(this).addClass("pageContainer-highlight");
                    HoteamUI.Common.ExeFunction(o.OnFocus, { o: self });
                });
        }
        if (o.pid && o.pageName) {
            this.LoadPage(o.pageName, o.paras);
        }
    },
    LoadPage: function (pageName, paras) {
        HoteamUI.UIManager.Show(this.id, pageName, paras);
    },
    Resize: function () {
        var childrenID = $("#" + this.id).children().attr("id");
        var ctrlObject;
        if (childrenID) {
            ctrlObject = HoteamUI.Control.Instance(childrenID);
            ctrlObject.Resize();
        }
    },
    Dispose: function () {
        $("#" + this.id).removeClass("pageContainer-highlight");
    },
    Check: function () {
        var id = this.id;
        var childrenID = $("div[parentid='" + id + "']").attr("id");
        var ctrlObject;
        if (childrenID) {
            ctrlObject = HoteamUI.Control.Instance(childrenID);
            ctrlObject.Check();
        }
    },
    CancelHighLight: function () {

    }
};
HoteamUI.Control.OIframe = {
    Create: function (options) {
        options = options || {};
        var self = this;
        var id = self.id + "_Iframe";
        var CtrlOptions = (options. ControlInfo || self.ControlInfo()).CtrlOptions;
        var width;
        if (CtrlOptions.size) {
            width = CtrlOptions.size;
        }

        var iframe = $("<iframe>");
        iframe.css({
            border: 0,
            width: "100%"
        })
        .attr("id", id);
        $("#" + self.id).append(iframe);
        iframe.height(iframe.parent().height());
        //事件
        var ctrlEvent = {};
        ctrlEvent.o = HoteamUI.Control.Instance(self.id);

        HoteamUI.Common.ExeFunction(self.GetEventFunctionName("OnCreate"), ctrlEvent);
    },
    Resize: function () {
        var self = this;
        var iframe = $("#" + self.id + "_Iframe");
        iframe.height(iframe.parent().height());
    },
    LoadPage: function (url) {
        var self = this;
        var iframe = $("#" + self.id + "_Iframe");
        iframe.attr("src", url);
    }
};
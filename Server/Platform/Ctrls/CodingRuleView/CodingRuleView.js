HoteamUI.Control.OCodingRuleView = {
    Create: function (options) {
        options = options || {};
        var self = this;
        var id = this.id;
        var handlers = (options.controlInfo || this.ControlInfo()).PageHandlers;
        var o = {};
        var ctrlEvent = {};
        ctrlEvent.o = HoteamUI.Control.Instance(id);
        ctrlEvent.Data = {};
        ctrlEvent.Data.id = id;
        $.each(handlers, function (index, val) {
            if (val.HandlerName == "OnLoadData") {
                HoteamUI.Common.ExeFunction(self.GetEventFunctionName("OnLoadData"), ctrlEvent);
            }
        });
    },
    LoadData: function (data) {
        $("#" + this.id).codingRuleView(data);
    },
    Resize: function () {
    }
}


HoteamUI.Control.OTimeline = {
    Create: function (options) {
        options = options || {};
        var self = this;
        var id = this.id;
        var handlers = (options.controlInfo || this.ControlInfo()).PageHandlers;
        var o = {};
        var ctrlEvent = {};
        ctrlEvent.o = HoteamUI.Control.Instance(id);
        $.each(handlers, function (index, val) {
            if (val.HandlerName == "OnLoadData") {
                HoteamUI.Common.ExeFunction(self.GetEventFunctionName("OnLoadData"), ctrlEvent);
            }
        });
    },
    LoadData: function (data) {

        if (data && data.legend && data.legend instanceof Array && data.legend.length > 0) {
            var legend = data.legend;
            for (var i = 0, len = legend.length; i < len; i++) {
                var item = legend[i];
                item.icon = item.icon.replace("~", PageInit.WebRootPath);
            }
        }

        if (data.data && data.data.length > 0) {

            var nodes = data.data;
            for (var i = 0, len = nodes.length; i < len; i++) {
                var node = nodes[i];
                replaceUrl(node);
                var children = node.children;
                if (children && children.length > 0) {
                    for (var j = 0, jlen = children.length; j < jlen; j++) {
                        var item = children[j];
                        replaceUrl(item);
                    }
                }
            }
        }

        function replaceUrl(item) {
            if (item.imageUrl && typeof item.imageUrl === 'string') {
                item.imageUrl = item.imageUrl.replace("~", PageInit.WebRootPath);

            }
            else if (item.imageUrl instanceof Array && item.imageUrl.length > 0) {
                for (var k = 0, icoLen = item.imageUrl.length; k < icoLen; k++) {
                    var icoItem = item.imageUrl[k];
                    item.imageUrl[k] = icoItem.replace("~", PageInit.WebRootPath);
                }
            }
        }

        $("#" + this.id).timeline(data);

    },
    Resize: function () {
    }
}

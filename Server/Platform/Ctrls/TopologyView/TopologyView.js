HoteamUI.Control.OTopologyView = {
    Create: function (options) {

        options = options || {};
        var self = this;
        var id = this.id;
        $("#" + id).height("100%");
        var handlers = (options.controlInfo || this.ControlInfo()).PageHandlers;
        var o = {};
        var ctrlEvent = {};
        ctrlEvent.o = HoteamUI.Control.Instance(id);
        ctrlEvent.Data = {};
        ctrlEvent.Data.id = id;
        $('#' + this.id).topology({});
        $.each(handlers, function (index, val) {
            if (val.HandlerName == "OnLoadData") {
                HoteamUI.Common.ExeFunction(self.GetEventFunctionName("OnLoadData"), ctrlEvent);
            }
        });
    },
    /*
     *options- text:{maxLength:8} 节点文字长度配置
     */
    LoadData: function (data, options) {
        
        var getChildrenData = data.GetChildrenData;
        var nodeData = data.data;

        if (typeof nodeData === 'object' && !(nodeData instanceof Array)) {
            nodeData = [nodeData];
        }

        function parseData(nodesData) {
            var d = nodesData,
                item,
                children;

            if (d && d.length > 0) {

                for (var i = 0, len = d.length; i < len; i++) {
                    item = d[i];
                    if (item.ico && typeof item.ico === 'string') {
                        item.ico = item.ico.replace("~", PageInit.WebRootPath);

                    }
                    else if (item.ico instanceof Array && item.ico.length > 0) {
                        for (var j = 0, icoLen = item.ico.length; j < icoLen; j++) {
                            var icoItem = item.ico[j];
                            item.ico[j] = icoItem.replace("~", PageInit.WebRootPath);
                        }
                    }

                    children = item.children;

                    if (children && children.length > 0) {
                        parseData(children);
                    }
                }
            }
        }

        parseData(nodeData);
        var ctrl = $("#" + this.id);

        var opt = $.extend(true, {
            data: nodeData,
            ondblclickLoad: typeof getChildrenData === "function" ? function (data,nodeId,elem) {
                var result = getChildrenData(data.id,nodeId,elem.id);
                parseData(result);
                return result;
            } : null
        }, options);

        ctrl.topology(opt);

    },
    GetData: function () {
        return $("#" + this.id).topology('getData');
    },
    GetSelectedNode: function () {

        var node = $("#" + this.id).topology('getSelected');
        if (node == null) {
            return null;
        }
        else {
            var nodeId = node.nodeId;
            var data = node.data;

            return {
                id: nodeId,
                objectId: data.objectID,
                text: data.text,
                value: data.value
            }
        }
    },
    SetRightMenu: function (menuid) {
        var topologyView = $("#" + this.id);
        var rightMenu = $("#" + menuid);
        topologyView.topology('bindEvent', 'onrightclick', function (e, data, nodeId) {
            $(document).on("contextmenu", function () {
                return false;
            })
            var id = data.id;
            if (id) {
                objectType = id.substring(0, id.indexOf('_'));
                HoteamUI.Control.Instance(menuid.replace('_RightMenu', '')).Show(e.pageX, e.pageY, objectType);
            }
            setTimeout(function () {
                $(document).unbind("contextmenu");
            }, 300);
        });
    },
    Resize: function () {
    }
};


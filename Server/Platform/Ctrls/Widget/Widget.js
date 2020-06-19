HoteamUI.Control.OWidget = {
    Create: function (options) {
        options = options || {};
        //设置参数
        var parentId = this.id;
        var self = this;
        var id = this.id + "_Widget";
        var controlInfo = (options.controlInfo || this.ControlInfo());
        var CtrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions;
        var o = $.extend(true, {}, $.hoteamWidget.defaluts, CtrlOptions);
        o.parentId = parentId;
        o.id = id;
        if (o.title) {
            o.title = HoteamUI.Language.Lang(o.title);
        }

        for (var i = 0; i < controlInfo.PageHandlers.length; i++) {
            var item = controlInfo.PageHandlers[i];
            switch (item.HandlerName) {
                case "OnClick":
                    o.onClick = function (tag) {
                        var fn = self.GetEventFunctionName("OnClick");
                        HoteamUI.Common.ExeFunction(fn, {
                            o: self, tag: tag
                        });
                    }
                    break;
                default: break;
            }
        };
        //创建
        $.hoteamWidget.create(o);
    },
    LoadData: function (data, tag) {
        var id = this.id + "_Widget";
        var container = $("#" + id).find(".widget-bd-count");
        container.html(data);
        container.attr("title", data);
        if (tag) {
            $("#" + id).attr("data-tag", tag);
        }
    }
};

{
    (function ($) {
        $.hoteamWidget = {
            defaluts: {
                showTitle: true,
                titleAlign: "right"
            },
            create: function (options) {
                var parentDiv = $("#" + options.parentId);
                var widgetStr = '<div class="widget" id="' + options.id + '">'
                    + '<div class="widget widget-hd"><div class="widget-hd-img"><img><div class="widget-hd-title"></div></div></div>'
                    + '<div class="widget-bd"><div class="widget-bd-count"></div><div class="widget-bd-title"></div></div>';
                parentDiv.append(widgetStr);
                var container = $("#" + options.id);
                if (options.image) {
                    container.find(".widget-hd-img img").attr("src", options.image);
                }
                var valuecontainer = container.find(".widget-bd-count");
                var value = options.value;
                if (value) {
                    valuecontainer.html(value);
                    valuecontainer.attr("title", value);
                }
                if (options.title && options.showTitle) {
                    var titlecontainer;
                    if (options.titleAlign == "right") {
                        valuecontainer.addClass("widget-value");
                        titlecontainer = container.find(".widget-bd-title");
                    }
                    else if (options.titleAlign == "left") {
                        titlecontainer = container.find(".widget-hd-title");
                        container.find(".widget-hd-img").addClass("widget-hd-img-hd");
                    }
                    titlecontainer.html(options.title);
                    titlecontainer.show();
                }
                //如果不显示数值，隐藏数值
                if (options.hideNum ) {
                    valuecontainer.css("display", "none");
                }

                parentDiv.attr("title", options.title);
                var hdcontainer = container.find(".widget-hd");
                if (options.color) {
                    hdcontainer.attr("style", "background-color:" + options.color);
                    valuecontainer.css("color", options.color);
                }

                if (options.onClick) {
                    container.click(function () {
                        options.onClick(container.attr("data-tag"));
                    });
                    container.on("mouseenter", function () {
                        container.addClass("widget-hover");
                        hdcontainer.addClass("widget-hd-hover");
                    }).on("mouseleave", function () {
                        container.removeClass("widget-hover");
                        hdcontainer.removeClass("widget-hd-hover");
                    })
                }
            }
        }
    })(jQuery);
}
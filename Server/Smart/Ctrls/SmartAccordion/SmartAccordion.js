HoteamUI.Control.OSmartAccordion = {
    Create: function () {
        var self = this;
        var parentId = this.id;
        var id = this.id + "_SmartAccordion";
        //设置参数
        var options = this.ControlInfo().CtrlOptions;
        var o = $.extend(true, {}, $.hoteamAccordion.defaults, options);
        o.parentId = parentId;
        o.id = id;
        //创建
        $.hoteamSmartAccordion.create(o);

        //事件参数
        var handlers = this.ControlInfo().PageHandlers;
        var object = {};
        object.o = HoteamUI.Control.Instance(parentId);
        $.each(handlers, function (index, val) {
            if (val.HandlerName == "OnClick") {
                object.onclick = self.GetEventFunctionName("OnClick");
                $("#" + id).data("OSmartAccordion", object);
            }
        });
    },
    LoadItems: function (data) {
        var id = this.id + "_SmartAccordion";
        var defaults = $("#" + id).data("defaults");
        $.hoteamSmartAccordion.loadListItems(id, data);
    },
    Resize: function () {
        var id = this.id + "_SmartAccordion";
        $.hoteamSmartAccordion.resizeAccordion(id);
    }
};


{
    (function ($) {
        $.hoteamSmartAccordion = {
            create: function (o) {
                var accordion = '<div id="' + o.id + '" class="hoteam-smartaccordion">' +
                                    '<div class="hoteam-smartaccordion-left"></div>' +
                                    '<div class="hoteam-smartaccordion-center"><ul></ul><div class="hoteam-smartaccordion-title-bottomline"></div></div>' +
                                    '<div class="hoteam-smartaccordion-right"></div>' +
                                '</div>';
                var $parent = $("#" + o.parentId);
                $parent.append(accordion);
            },
            loadListItems: function (id, data) {
                if (data) {
                    var title = $("#" + id).children(".hoteam-smartaccordion-center").find("ul");
                    for (var i = 0; i < data.length; i++) {
                        if (i == 0) {
                            $("#" + id).children(".hoteam-smartaccordion-left").html(data[i].Text).attr("customName", data[i].Name);
                        }
                        var select = i == 0 ? "hoteam-smartaccordion-title-select" : "";
                        var titleli = '<li class="hoteam-smartaccordion-title-container">' +
                                            '<div class="hoteam-smartaccordion-title ' + select + '" customName=' + data[i].Name + '>' + data[i].Text + '</div>' +
                                        '</li>';
                        title.append(titleli);
                    }
                    this.initHandles(id);
                    this.resizeAccordion(id);
                }
            },
            initHandles: function (id) {
                var accord = $("#" + id);
                accord.children(".hoteam-smartaccordion-center").on({
                    "click": function (e) {
                        //如果当前点击的时导航
                        if ($(e.target).hasClass("hoteam-smartaccordion-title")) {
                            var object = accord.data("OSmartAccordion");
                            var ctrlEvent = {};
                            ctrlEvent.o = object.o;
                            ctrlEvent.customname = $(e.target).attr("customname");
                            ctrlEvent.param = arguments[1];
                            HoteamUI.Common.ExeFunction(object.onclick, ctrlEvent);
                            var lis = $(e.target).parent().parent().children();
                            lis.find(".hoteam-smartaccordion-title").removeClass("hoteam-smartaccordion-title-select");
                            $(e.target).addClass("hoteam-smartaccordion-title-select");
                            //给下划线定位
                            var bottomLine = $(this).find("div.hoteam-smartaccordion-title-bottomline");
                            var li = $(e.target).parent();
                            var width = parseInt(li.css("width")) - parseInt(li.css("padding-left")) * 2 - 4;
                            var left = li.offset().left - parseInt($(".hoteam-smartaccordion-left").css("width")) + parseInt(li.css("padding-left"));
                            bottomLine.animate({
                                "left": left,
                                "width": width
                            }, 200);
                        }
                        e.stopPropagation();
                    }
                });
                //悬浮效果
                accord.find("ul").on({
                    "mouseleave": function () {
                        var selectli = $(this).find("div.hoteam-smartaccordion-title-select").parent();
                        var width = parseInt(selectli.css("width")) - parseInt(selectli.css("padding-left")) * 2 - 4;
                        var left = selectli.offset().left - parseInt($(".hoteam-smartaccordion-left").css("width")) + parseInt(selectli.css("padding-left"));
                        var line = $(this).closest("ul").next(".hoteam-smartaccordion-title-bottomline").stop(true, false);
                        line.animate({
                            "left": left,
                            "width": width
                        }, 200);
                    }
                });
                accord.find("li").on({
                    "mouseenter": function () {
                        var width = parseInt($(this).css("width")) - parseInt($(this).css("padding-left")) * 2 - 4;
                        var left = $(this).offset().left - parseInt($(".hoteam-smartaccordion-left").css("width")) + parseInt($(this).css("padding-left"));
                        var line = $(this).closest("ul").next(".hoteam-smartaccordion-title-bottomline").stop(true, false);
                        line.animate({
                            "left": left,
                            "width": width
                        }, 200);
                    }
                });
                accord.children(".hoteam-smartaccordion-left").on("click", function () {
                    accord.children(".hoteam-smartaccordion-center").find("li:first").children("div.hoteam-smartaccordion-title").click();
                });
            },
            resizeAccordion: function (id) {
                var width = $("#" + id).width();
                $("#" + id).children(".hoteam-smartaccordion-center").css("width", width - 180 * 2);
                //给下划线定位
                var bottomLine = $("#" + id).find(".hoteam-smartaccordion-title-bottomline");
                var selectli = $("#" + id).find(".hoteam-smartaccordion-title-select").parent();
                bottomLine.css({
                    "width": parseInt(selectli.css("width")) - parseInt(selectli.css("padding-left")) * 2 - 4,
                    "left": selectli.offset().left - parseInt($(".hoteam-smartaccordion-left").css("width")) + parseInt(selectli.css("padding-left"))
                });
                //
            }
        }
    })(jQuery);
}
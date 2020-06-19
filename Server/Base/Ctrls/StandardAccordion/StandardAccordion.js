/*此控件是做smart的时候模仿光联运做的一个导航，已不用。*/
HoteamUI.Control.OStandardAccordion = {
    Create: function (options) {
        var me = this;
        options = options || {};
        var parentId = this.id;
        var id = this.id + "_StardardAccordion";
        //设置参数
        var o = (options.controlInfo || this.ControlInfo()).CtrlOptions;
        o = $.extend(true, {}, $.hoteamButton.defaults, o);
        o.parentId = parentId;
        o.id = id;
        //事件参数
        var handlers = (options.controlInfo || this.ControlInfo()).PageHandlers;
        o.o = HoteamUI.Control.Instance(parentId);
        $.each(handlers, function (index, val) {
            if (val.HandlerName == "OnClick") {
                o.callback.onclick = me.GetEventFunctionName("OnClick");
            }
            if (val.HandlerName == "SaveNav") {
                o.callback.savenav = me.GetEventFunctionName("SaveNav");
            }
            if (val.HandlerName == "DeleteNav") {
                o.callback.deletenav = me.GetEventFunctionName("DeleteNav");
            }
        });
        //创建
        $.hoteamStandardAccordion.create(o);
    },
    LoadItems: function (data) {
        var id = this.id + "_StardardAccordion";
        $.hoteamStandardAccordion.loadItems(id, data);
    },
    Resize: function () {
    }
};


{
    (function ($) {
        $.hoteamStandardAccordion = {
            defaults: {
                id: null,
                parentid: null,
                callback: {
                    onclick: null,
                    savenav: null,
                    deletenav: null
                }
            },
            create: function (o) {
                var $container = $("<div id=" + o.id + " class='hoteam-standard-accordion'></div>").data("standardAccordion", o);
                $("#" + o.parentId).append($container);
            },
            loadItems: function (id, data) {
                var container = $("#" + id);
                var html = '';
                var showData = new Array(),
                    fixData = new Array(),
                    hideData = new Array();
                for (var k = 0; k < data.length; k++) {
                    if (data[k].ShowMode) {
                        if (data[k].ShowMode == "Fixed") {
                            fixData.push(data[k]);
                        } else {
                            showData.push(data[k]);
                        }
                    }
                    if (data[k].ShowMode == "Custom" || !data[k].ShowMode) {
                        hideData.push(data[k]);
                    }
                }
                for (var i = 0; i < fixData.length; i++) {
                    var select = (i == 0 ? "standard-accordion-text-select" : "");
                    html += "<div class='standard-accordion-title' val='" + fixData[i].Name + "'>"
                                + "<div class='standard-accordion-text " + select + "'>" + fixData[i].Text + "</div>"
                            + "</div>";
                }
                for (var i = 0; i < showData.length; i++) {
                    html += "<div class='standard-accordion-title' val='" + showData[i].Name + "'>"
                                + "<div class='standard-accordion-text'>" + showData[i].Text + "</div>"
                                + "<span class='standard-accordion-title-remove i i-menu-remove'></span>"
                            + "</div>";
                }
                //如果还有不需要直接显示在导航上的数据，则放到隐藏的下拉div里
                if (hideData.length > 0) {
                    html += "<div class='standard-accordion-add'><span class='standard-accordion-add-img i i-menu-add'></span></div>";
                }
                container.append(html);
                $(".standard-accordion-add-img").data("data", hideData);
                this.initHandles(id);
            },
            initHandles: function (id) {
                var me = this,
                    $container = $("#" + id),
                    o = $container.data("standardAccordion"),
                    ctrlEvent = {};
                ctrlEvent.o = o.o;
                //给加号添加注册事件
                $container.find(".standard-accordion-add-img").on("mousedown", function (e) {
                    if (e.which != 1) {
                        return true;
                    }
                    if ($(this).data("data") && $(this).data("data").length > 0) {
                        //创建隐藏的下拉div及内部元素
                        var hideData = $(this).data("data"),
                            hiddenDiv = "<div class='standard-accordion-hidden'><div class='standard-accordion-hidden-c'>";
                        for (var j = 0; j < hideData.length; j++) {
                            var img = "";
                            if (hideData[j].Icon.indexOf("~") < 0) {//是雪碧图
                                img = "<div class='standard-accordion-hidden-img i " + hideData[j].Icon + "'></div>";
                            } else {//是单个图片
                                var icon = hideData[j].Icon.replace("~", PageInit.WebRootPath);
                                img = "<img class='standard-accordion-hidden-img' src='" + icon + "'></img>";
                            }
                            hiddenDiv += "<div class='standard-accordion-hidden-div'>" + img + "<div class='standard-accordion-hidden-text' val='" + hideData[j].Name + "'>" + hideData[j].Text + "</div></div>";
                        }
                        hiddenDiv += "</div></div>";
                        //创建遮罩
                        var $shade = $("<div class='standard-accordion-shade'></div>");
                        $shade.css("height", window.innerHeight - 90);
                        $("body").append(hiddenDiv).append($shade);
                        $(this).data("data", ""); //销毁data，下次不需要重新构建
                        //点击隐藏div里面的导航注册事件
                        $(".standard-accordion-hidden-div").on("click", function () {
                            var ele = $(this).children(".standard-accordion-hidden-text");
                            //增加是否已经添加过的判断
                            var c = $("#" + id);
                            var title = c.find("div[val='" + ele.attr("val") + "']");
                            if (title.size() == 0) {
                                c.children(".standard-accordion-add").before(
                                        "<div class='standard-accordion-title' val='" + ele.attr("val") + "'>"
                                        + "<div class='standard-accordion-text'>" + ele.text() + "</div>"
                                        + "<span class='standard-accordion-title-remove i i-menu-remove'></span></div>");
                                //调用方法，保存当前选择的一级收藏导航
                                var functionPara = ctrlEvent;
                                functionPara.customname = ele.attr("val");
                                HoteamUI.Common.ExeFunction(o.callback.savenav, functionPara);
                                me.resizeAccordion(id);
                            }
                            $(".standard-accordion-shade").hide();
                            hide($(".standard-accordion-hidden"), 400, 0);
                            c.find("div[val='" + ele.attr("val") + "']").trigger("click");
                        });
                    }
                    var shade = $(".standard-accordion-shade");
                    if (shade.css("display") == "none") {
                        shade.show();
                        var top = $(".hoteam-standard-accordion").offset().top;
                        $(".standard-accordion-hidden").css("top", top + 40);
                        show($(".standard-accordion-hidden"), 0, 400);
                    } else {
                        shade.hide();
                        hide($(".standard-accordion-hidden"), 400, 0);
                    }
                    return false;
                });

                //点击导航后触发onclick事件
                $container.on("click", ".standard-accordion-title", function () {
                    $(this).parent().find(".standard-accordion-text-select").removeClass("standard-accordion-text-select");
                    $(this).children(".standard-accordion-text").addClass("standard-accordion-text-select");
                    var functionPara = ctrlEvent;
                    functionPara.customname = $(this).attr("val");
                    functionPara.param = arguments[1];
                    HoteamUI.Common.ExeFunction(o.callback.onclick, functionPara);
                });
                //鼠标滑动到导航后触发mouseenter事件
                $container.on({
                    "click": function () {
                        var functionPara = ctrlEvent;
                        functionPara.customname = $(this).attr("val");
                        functionPara.param = arguments[1];
                        HoteamUI.Common.ExeFunction(o.callback.onclick, functionPara);
                    },
                    "mouseenter": function () {
                        $(this).children(".standard-accordion-title-remove").css("display", "inline-block");
                    },
                    "mouseleave": function () {
                        $(this).children(".standard-accordion-title-remove").hide();
                    }
                }, ".standard-accordion-title");
                //关闭当前导航事件
                $container.on("click", ".standard-accordion-title-remove", function () {
                    $(this).parent().prev().click();
                    $(this).parent().remove();
                    var functionPara = ctrlEvent;
                    functionPara.customname = $(this).parent().attr("val");
                    HoteamUI.Common.ExeFunction(o.callback.deletenav, functionPara);
                    return false;
                });
                function show(ele, height, toHeight) {
                    var itv = setInterval(function () {
                        height = height + 15;
                        ele.css("height", height);
                        if (height >= toHeight) {
                            clearInterval(itv);
                        }
                    }, 5);
                }
                function hide(ele, height, toHeight) {
                    var itv = setInterval(function () {
                        height = height - 15;
                        ele.css("height", height);
                        if (height <= toHeight) {
                            clearInterval(itv);
                        }
                    }, 5);
                }
            },
            resizeAccordion: function (id) {
                var accordion = $("#" + id),
                    parentWidth = parseInt(accordion.css("width")),
                    childTitle = accordion.children(),
                    length = 0,
                    o = accordion.data("standardAccordion"),
                    ctrlEvent = {};
                for (var i = 0; i < childTitle.length; i++) {
                    length += parseInt($(childTitle[i]).css("width"));
                }
                while (true) {
                    if (length > parentWidth) {
                        var firstTitle = accordion.find(".standard-accordion-title-remove:first").parent();
                        length = length - parseInt(firstTitle.css("width"));
                        firstTitle.remove();
                        var functionPara = ctrlEvent;
                        functionPara.customname = firstTitle.attr("val");
                        HoteamUI.Common.ExeFunction(o.callback.deletenav, functionPara);
                    } else {
                        break;
                    }
                }
            }
        }
    })(jQuery);
}
HoteamUI.Control.OBreadcrumbNavigation = {
    Create: function () {
        var me = this,
            parentId = this.id,
            id = this.id + "_BreadNavigation";
        //设置参数
        var options = this.ControlInfo().CtrlOptions;
        var o = $.extend(true, {}, $.hoteamBreadNavigation.defaults, options);
        o.parentId = parentId;
        o.id = id;

        //事件参数
        var handlers = (options.controlInfo || this.ControlInfo()).PageHandlers;
        o.event = {};
        o.event.hoteamCtrl = HoteamUI.Control.Instance(parentId);
        $.each(handlers, function (index, val) {
            if (val.HandlerName == "NodeOnClick") {
                o.callback.nodeonclick = me.GetEventFunctionName("NodeOnClick");
            }
        });
        //创建
        $.hoteamBreadNavigation.create(o);
    },
    LoadData: function (data) {
        var id = this.id + "_BreadNavigation";
        $.hoteamBreadNavigation.loadData(id, data);
    },
    AppendNode: function (obj) {
        var id = this.id + "_BreadNavigation";
        $.hoteamBreadNavigation.loadData(id, obj);
    },
    Resize: function () {
        var id = this.id + "_BreadNavigation";
        $.hoteamBreadNavigation.resize(id);
    }
};


{
    (function ($) {
        $.hoteamBreadNavigation = {
            defaults: {
                id: null,
                parentid: null,
                callback: {
                    nodeonclick: null
                }
            },
            create: function (options) {
                var o = $.extend({}, $.hoteamBreadNavigation.defaults, options);
                //创建一个div  container
                var container = '<div class="hoteam-breadnavigation" id="' + o.id + '"></div>';
                var parent = $("#" + o.parentId);
                parent.append(container);
                this.initHandles(o);
            },
            //加载面包屑导航数据
            loadData: function (id, data) {
                var $nav = $("#" + id);
                $nav.empty();
                var $ul = $('<ul></ul>');
                var lis = '',
                    spclass = 'hoteam-breadnavigation-text';
                if (data.length > 1) {
                    var back = HoteamUI.Language.Lang("BreadcrumbNavigation", "Back");
                    lis += '<li><span class="hoteam-breadnavigation-text">' + back + '</span><span style="margin:0 6px;">|</span></li>';
                }
                for (var i = 0; i < data.length; i++) {
                    var obj = data[i];
                    lis += '<li>';
                    if (i != 0) {
                        lis += '<span class="basesprite b-angle-right" style="margin-bottom:-3px;"></span>';
                    }
                    if (i == data.length - 1) {
                        spclass = 'hoteam-breadnavigation-text-last';
                    }
                    var text = obj.text,
                        title = "";
                    if (text.length > 10) {
                        title = "title='" + HoteamUI.Common.HtmlEscape(text) + "' ";
                        text = text.substring(0, 10) + "...";
                    }
                    lis += '<span ' + title + ' val="' + HoteamUI.Common.HtmlEscape(obj.value) + '" class="' + spclass + '">' + HoteamUI.Common.HtmlEscape(text) + '</span></li>';
                }
                $ul.append(lis);
                $nav.append($ul);
                this.resize(id);
            },
            appendNode: function (id, obj) {
                var $nav = $("#" + id);
                var lastli = $nav.children("ul li:last").removeClass("hoteam-breadnavigation-text-last").addClass("hoteam-breadnavigation-text");
                lastli.append('<li><span>></span><span val="' + obj.value + '" class="hoteam-breadnavigation-text-last"></span></li>');
            },
            initHandles: function (o) {
                //绑定事件
                var ctrlEvent = {};
                ctrlEvent.o = o.event.hoteamCtrl;
                $("#" + o.id).on("click", ".hoteam-breadnavigation-text", function () {
                    ctrlEvent.value = $(this).attr("val");
                    if (ctrlEvent.value) {
                        HoteamUI.Common.ExeFunction(o.callback.nodeonclick, ctrlEvent);
                    } else { //如果是点击的返回上级
                        $(this).closest("ul").find(".hoteam-breadnavigation-text:last").click();
                    }
                });
            },
            resize: function (id) {
                //计算内部所有li的长度
                $("#" + id).find("li.hoteam-breadnavigation-omi").remove(); //删除省略号li
                var lis = $("#" + id).find("li").removeClass("hoteam-breadnavigation-li-hidden"); //去掉li隐藏样式
                //开始计算
                var parentWidth = $("#" + id).width() - 10;
                var width = 0;
                for (var i = 0; i < lis.length; i++) {
                    width += $(lis).eq(i).width();
                }
                if (width > parentWidth) {
                    //找到最中间的li
                    var midli = $(lis).eq(parseInt($(lis).length / 2));
                    midli.after('<li class="hoteam-breadnavigation-omi">......</li>');
                    var omiwidth = $("#" + id).find("li.hoteam-breadnavigation-omi").css("width");
                    width += parseInt(omiwidth);
                }
                while (width > 0 && width > parentWidth) {
                    //找到没有隐藏的li
                    var showlis = $("#" + id).find("li").not($("#" + id).find("li.hoteam-breadnavigation-li-hidden")).not($("#" + id).find("li.hoteam-breadnavigation-omi"));
                    if (showlis.length === 0) {
                        break;
                    }
                    var li = $(showlis).eq(parseInt($(lis).length / 2));
                    var liWidth = li.width();
                    width = width - liWidth;
                    $(showlis).eq(parseInt($(lis).length / 2)).addClass("hoteam-breadnavigation-li-hidden");
                    if (liWidth === null || liWidth === 0) {
                        width = 0;
                    }
                }
            }
        }
    })(jQuery);
}
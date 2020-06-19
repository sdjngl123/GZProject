/*此控件是做smart的时候做的侧滑，已不用。*/
$.hoteamSideslip = {
    defaults: {
        width: "500"
    },
    css: {
        sideslip: "hoteam-sideslip",
        sideslipTitle: "sideslip-title",
        sideslipContent: "sideslip-content"
    },
    create: function (options) {
        var o = $.extend({}, this.defaults, options);
        if (!o.id) {//如果传入的参数中没有id，则不继续执行
            return;
        }
        sideid = o.id;
        window.hoteamctrl = window.hoteamctrl || {};
        window.hoteamctrl[sideid] = {};
        var thissidelip = window.hoteamctrl[sideid];
        thissidelip.data = o.data;
        thissidelip.callback = o.callback;
        thissidelip.options = o;
        thissidelip.ctrType = "sideslip";

        //判断是否已经有侧滑控件，如果有，则不再创建
        var $slip = $("." + this.css.sideslip);
        if ($slip.length > 0) {
            $slip.children("." + this.css.sideslipContent).empty().attr("id", o.id).data("option", o);
        } else {
            //创建侧滑container
            var $container = $('<div class="' + this.css.sideslip + ' hoteam-sideslip-show">' +
                                '<div class="' + this.css.sideslipTitle + '"></div>' +
                                '<div id="' + o.id + '" class="' + this.css.sideslipContent + '"></div>' +
                           '</div>');
            //计算侧滑高度（当前window的高度减去首页最顶部的高度，减去一级导航高度，减去最底部的高度）
            //但是考虑到除了smart模式以外其他模式没有一级导航，而且其他模式也无法使用统一的方法找到顶部及底部元素，所以顶部及底部写死，一级导航获取
            var smartAccordHeight = $(".SmartAccordion").height() || 0;
            var height = window.innerHeight - 45 - smartAccordHeight - 20;
            $container.css({
                "height": height,
                "width": o.width,
                "top": 45 + smartAccordHeight,
                "right": -o.width
            });
            $("body").append($container);
            $("#" + o.id).data("option", o).css("height", height - 40);
        }
    },
    //显示侧滑
    show: function (id) {
        this.showing = true;
        var me = this;
        var slip = $("#" + id).parent();
        slip.stop(true, false);
        setTimeout(function () {
            me.showing = false;
            slip.animate({ right: "0px" }, function () { me.showing = false; });
        }, 1);
    },
    hide: function (id) {
        var me = this;
        var slip = $("#" + id).parent();
        var option = $("#" + id).data("option");
        slip.stop(true, false);
        setTimeout(function () {
            if (me.showing) {
                return;
            }
            slip.animate({ right: (-slip.width()) + "" });
        }, 80);
    },
    //加载内部页面
    loadPage: function (id, pagename, paras) {
        HoteamUI.UIManager.Show(id, pagename, paras);
    },
    setTitle: function (id, title) {
        var slipTitle = $("#" + id).prev();
        slipTitle.html(title);
    },
    sideslipReutrn: function (id) {
        var ctrldata = hoteamctrl[id];
        if (ctrldata) {
            ctrldata.callback(ctrldata.data, ctrldata.ret);
            delete hoteamctrl[id];
        }
    }
}

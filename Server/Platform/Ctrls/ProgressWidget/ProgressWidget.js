HoteamUI.Control.OProgressWidget = {
    Create: function (options) {
        options = options || {};
        //设置参数
        var parentId = this.id;
        var id = this.id + "_ProgressWidget";
        var CtrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions;
        var o = $.extend(true, {}, CtrlOptions);
        o.parentId = parentId;
        o.id = id;
        if (o.title) {
            o.title = HoteamUI.Language.Lang(o.title);
        }
        //创建
        $.hoteamProgressWidget.create(o);
    },
    LoadData: function (data) {
        var id = this.id + "_ProgressWidget";
        data = data + "%";
        $("#" + id).find(".progressWidget-bd-value").html(data);
        $("#" + id).find(".progressWidget-progress_innerbar").css("width", data)
    }
};

{
    (function ($) {
        $.hoteamProgressWidget = {
            create: function (options) {
                var parentDiv = $("#" + options.parentId);
                var widgetStr = '<div class="progressWidget" id="' + options.id + '">'
                    + '<div class="progressWidget-hd"><div class="progressWidget-hd-content"><img src="' + options.image + '"></div></div>'
                    + '<div class="progressWidget-bd"><div class="progressWidget-bd-content">'
                    + '<div class="progressWidget-bd-title">' + options.title + '</div>'
                    + '<div class="progressWidget-bd-value">' + options.value + '</div>'
                    + '<div class="progressWidget-progress_bar"><div class="progressWidget-progress_innerbar"></div></div></div></div></div>';
                parentDiv.append(widgetStr);
                var bar = parentDiv.find(".progressWidget-progress_innerbar");
                var valueDiv = parentDiv.find(".progressWidget-bd-value");
                var count = options.value;
                if (count) {
                    count = count + "%";
                    valueDiv.html(count);
                    bar.css("width", count);
                }
                if (options.color) {
                    valueDiv.css("color", options.color);
                    bar.attr("style", "background-color:" + options.color);
                }
            }
        }
    })(jQuery);
}
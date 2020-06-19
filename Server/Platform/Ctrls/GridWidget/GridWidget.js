HoteamUI.Control.OGridWidget = {
    Create: function (options) {
        options = options || {};
        //设置参数
        var parentId = this.id;
        var id = this.id + "_GridWidget";
        var CtrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions;
        var o = $.extend(true, {}, CtrlOptions);
        o.parentId = parentId;
        o.id = id;
        if (o.title) {
            o.title = HoteamUI.Language.Lang(o.title);
        }
        //创建
        $.hoteamGridWidget.create(o);
    },
    LoadData: function (data) {
        var id = this.id + "_GridWidget";
        data = data + "%";
        $("#" + id).find(".gridWidget-ft-content span").html(data);
        $("#" + id).find(".gridWidget-progress_innerbar").css("width", data);
    }
};

{
    (function ($) {
        $.hoteamGridWidget = {
            create: function (options) {
                var parentDiv = $("#" + options.parentId);
                var widgetStr = '<div class="gridWidget" id="' + options.id + '">'
                    + '<div class="gridWidget-hd"><div class="gridWidget-hd-content">'
                    + '<img src="' + options.image + '"><span>' + options.title + '</span></div></div>'
                    + '<div class="gridWidget-bd"><div class="gridWidget-bd-content">'
                    + '<div class="gridWidget-progress_bar"><div class="gridWidget-progress_innerbar"></div></div></div></div>'
                    + '<div class="gridWidget-ft"><div class="gridWidget-ft-content"><span></span></div></div></div>';
                parentDiv.append(widgetStr);
                var bar = parentDiv.find(".gridWidget-progress_innerbar");
                var count = options.value;
                if (count) {
                    count = count + "%";
                    parentDiv.find(".gridWidget-ft-content span").html(count);
                    bar.css("width", count);
                }
                if (options.color) {
                    bar.attr("style", "background-color:" + options.color);
                }
            }
        }
    })(jQuery);
}
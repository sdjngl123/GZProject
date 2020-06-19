HoteamUI.Control.OColorPicker = {
    Create: function (options) {
        options = options || {};
        var ctrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions;
        var o = $.extend(true, {}, $.hoteamColorPicker.defaults, ctrlOptions);
        o.parentId = this.id;
        o.id = this.GetId();
        //创建控件
        $.hoteamColorPicker.create(o);
    },
    GetColor: function () {
        return $.hoteamColorPicker.getColor(this.GetId());
    },
    SetColor: function (color) {
        $.hoteamColorPicker.setColor(this.GetId(), color);
    },
    resize: function () { },
    Dispose: function () {
        var picker = $("#" + this.GetId());
        $("#" + picker.data("colpickId")).remove();
    },
    GetId: function () {
        return this.id + "_ColorPicker";
    },
    SetPosition: function (position) {
        var $picker = $("#" + this.GetId());
        $picker.removeClass("hoteam-colPicker-left")
            .removeClass("hoteam-colPicker-right")
            .removeClass("hoteam-colPicker-center")
            .addClass("hoteam-colPicker-" + position);
    }
};


{
    (function ($) {
        $.hoteamColorPicker = {
            defaults: {
                color: '#ffffff',
                editable: true
            },
            create: function (o) {
                var ele =
                    '<div class="hoteam-colPicker-container">' +
                    '<div id="' + o.id + '" class="hoteam-colPicker hoteam-colPicker-center"></div>' +
                    '</div>';
                $("#" + o.parentId).append(ele);
                if (o.editable) {
                    //初始化
                    $("#" + o.id).colpick({
                        layout: 'rgbhex',
                        color: o.color.slice(1),
                        onSubmit: function (hsb, hex, rgb, el) {
                            $(el).css('background-color', '#' + hex);
                            $(el).colpickHide();
                        }
                    });
                } else {
                    $("#" + o.id).colpick({ showEvent: '' });
                }
                $("#" + o.id).css('background-color', o.color);
            },
            getColor: function (id) {
                var color = $("#" + id).css("backgroundColor");
                if (color.startsWith("rgb")) {
                    var arr = color.slice(4, -1).split(',');
                    return "#" + $.colpick.rgbToHex({ r: +arr[0], g: +arr[1], b: +arr[2] });
                }
                return color;
            },
            setColor: function (id, color) {
                $('#' + id).colpickSetColor(color.slice(1), color.slice(1)).css("background-color", color);
            }
        }
    })(jQuery);
}



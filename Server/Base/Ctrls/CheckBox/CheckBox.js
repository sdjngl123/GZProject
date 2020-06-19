HoteamUI.Control.OCheckBox = {
    Create: function (options) {
        var me = this;
        options = options || {};
        //设置参数
        var ContainerID = this.ContainerID();
        var parentId = this.id;
        var id = this.id + "_CheckBox";
        var CtrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions;
        var o = $.extend(true, {}, $.hoteamCheckBox.defaults, CtrlOptions);
        o.parentId = parentId;
        o.id = id;
        o.autofit = options.autofit;
        if (o.textId) {
            o.text = HoteamUI.Language.Lang(o.textId);
        }
        if (!o.text) {
            o.text = "";//当o.text为空时 页面显示字符串“null”
        }
        //事件参数
        var handlers = (options.controlInfo || this.ControlInfo()).PageHandlers;
        o.o = HoteamUI.Control.Instance(parentId);
        o.callback = {};
        $.each(handlers, function (index, val) {
            if (val.HandlerName == "OnClick") {
                o.callback.onclick = me.GetEventFunctionName("OnClick");
            }
        });
        $.hoteamCheckBox.create(o);
    },
    Resize: function () {
        var id = this.id + "_CheckBox";
        $.hoteamCheckBox.resize(id);
    },
    Check: function () {
        var id = this.id + "_CheckBox";
        var val = this.IsChecked();
        return $.hoteamToolTip.check(id, val, false);
    },
    Disable: function () {
        var select = "#" + this.id + "_CheckBox";
        $(select).attr("disabled", true);
    },
    Enable: function () {
        var select = "#" + this.id + "_CheckBox";
        $(select).attr("disabled", false);
    },
    IsChecked: function () {
        var select = "#" + this.id + "_CheckBox";
        return document.getElementById(this.id + "_CheckBox").checked;
    },
    SetChecked: function (isChecked) {
        var select = "#" + this.id + "_CheckBox";
        //处理传入的参数，if(数字0，字符串“0”，字符串“false”，布尔false):不选中，if(数字1，字符串“1”，字符串“true”，布尔true):选中
        if (isChecked == 0 || isChecked == "false" || isChecked == false) {
            isChecked = false;
        } else if (isChecked == 1 || isChecked == "true" || isChecked == true) {
            isChecked = true;
        }
        return document.getElementById(this.id + "_CheckBox").checked = isChecked;
    },
    GetText: function () {
        var select = "#" + this.id + "_CheckBox";
        var t = $(select).next()[0];
        return $(t).text();
    },
    SetText: function (value) {
        var select = "#" + this.id + "_CheckBox";
        var t = $(select).next()[0];
        return $(t).text(value);
    }
};


{
    (function ($) {
        $.hoteamCheckBox = {
            defaults: {
                parentId: null,
                id: null,
                value: null,
                text: null,
                textId: null,
                checked: false,
                position: "left",
                type: "checkbox",
                disabled: "false",
                regex: null,
                regextipId: "",
                callback: {
                    onclick: null
                }
            },
            create: function (options) {
                var o = $.extend({}, $.hoteamCheckBox.defaults, options);
                var disabled = (o.disabled == true) ? ' disabled="true" ' : " ";
                var checked = (o.checked == true) ? ' checked="checked" ' : " ";
                var checkbox = '<div  class="hoteam-checkbox"><input type="' + o.type + '" id = "' + o.id + '"' + disabled + checked + '/><span class="hoteam-checkbox-text">' + o.text + '</span></div>';
                var Container = $("#" + o.parentId);
                Container.append(checkbox);
                if (o.autofit) {
                    Container.css("height", 40);
                }
                checkbox = $("#" + o.id);
                checkbox.attr("value", o.value);
                if (o.position == "right") {
                    checkbox.parent().css("text-align", "right").css("padding-right", "5px");
                }
                else if (o.position == "center") {
                    checkbox.parent().css("left", "50%").css("margin-left", "-7px");
                }
                if (o.regex) {
                    $.hoteamToolTip.create(o);
                }
                this.initHanlder(o);
            },
            initHanlder: function (o) {
                $("#" + o.id).on("click keydown", { o: o.o, eclick: o.callback.onclick }, function (e) {
                    //支持键盘回车选择
                    if (e.type === "click" || e.which == 13 || e.keyCode == 13) {

                        if (e.type === 'keydown') {
                            $(this).click();
                        }
                        var ctrlEvent = {};
                        ctrlEvent.o = e.data.o;
                        var functionName = e.data.eclick;
                        HoteamUI.Common.ExeFunction(functionName, ctrlEvent);
                    }
                });
                $("#" + o.id).nextAll(".hoteam-checkbox-text").on("click", { o: o.o, eclick: o.callback.onclick }, function (e) {
                    //$(this).prevAll().trigger("click");
                    var input = $(this).prev();
                    if (input.prop("disabled")) {
                        return;
                    }
                    if (input.prop("checked")) {
                        input.prop("checked", false);
                    } else {
                        input.prop("checked", true);
                    }
                    var ctrlEvent = {};
                    ctrlEvent.o = e.data.o;
                    var functionName = e.data.eclick;
                    HoteamUI.Common.ExeFunction(functionName, ctrlEvent);
                });
            },
            resize: function (id) {
            } //
        }

    })(jQuery);
}
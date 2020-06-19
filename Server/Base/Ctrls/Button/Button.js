HoteamUI.Control.OButton = {
    Create: function (options) {
        //设置参数
        options = options || {};
        var self = this;
        var parentId = this.id;
        var id = this.id + "_Button";
        var ctrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions;
        var o = $.extend(true, {}, $.hoteamButton.defaults, ctrlOptions);
        o.parentid = parentId;
        o.id = id;
        o.autofit = options.autofit;
        o.title = ctrlOptions.title;
        if (o.textId) {
            o.value = HoteamUI.Language.Lang(o.textId);
        }
        //事件参数
        var handlers = (options.controlInfo || this.ControlInfo()).PageHandlers;
        o.event = {};
        o.event.hoteamCtrl = this;

        $.each(handlers, function (index, val) {
            if (val.HandlerName == "OnClick") {
                o.callback.onclick = self.GetEventFunctionName("OnClick");
            }
        });
        //创建控件
        $.hoteamButton.create(o, this);
    },
    Disable: function () {
        var select = "#" + this.id + "_Button";
        $(select).attr("disabled", true);
    },
    Enable: function () {
        var select = "#" + this.id + "_Button";
        $(select).attr("disabled", false);
    },
    SetText: function (text) {
        var select = "#" + this.id + "_Button";
        $(select).text(text);
    },
    GetText: function () {
        var select = "#" + this.id + "_Button";
        return $(select).text();
    },
    //按钮聚焦
    Focus: function () {
        $("#" + this.id + "_Button").focus();
    },
    Resize: function () {
        var obj = $("#" + this.id);
        //obj.css("width",obj.parent().width()+"px");
        if (!obj.find(".hoteamButton").html() && obj.find(".btnicon").length > 0) {
            obj.find(".btnicon").css("left", obj.innerWidth() / 2 - 8);
        }
    },
    Click: function (functionName) {
        if (functionName === undefined) {
            $("#" + this.id + "_Button").click();
        }
        else {
            $("#" + this.id + "_Button").unbind("click").click(functionName);
        }
    }

};


{
    (function ($) {
        $.hoteamButton = {
            defaults: {
                id: null,
                parentid: null,
                name: null,
                type: "button",
                value: null,
                display: true,
                disabled: false,
                icon: {
                    primary: null,
                    secondary: null
                },
                callback: {
                    onclick: null
                }
            },
            create: function (options, object) {
                var o = $.extend({}, $.hoteamButton.defaults, options);
                if (o.parentid) {
                    var title = o.title ? HoteamUI.Language.Lang(o.title) : "";
                    var button = ['<button title="' + title + '" id="', o.id, '" type="', o.type, '" value="', o.value, '"', '  hidefocus class="hoteamButton btn btn-default btn-sm" />'].join("");
                    var container = $("#" + o.parentid).append(button);
                    if (o.autofit) {
                        container.css("height", 40);
                    }
                    $("#" + o.id).hoteamButton(o, object);
                }
            }
        }

        $.fn.hoteamButton = function (options, object) {
            var defaults = {
                name: null,
                value: null,
                display: true,
                disabled: false,
                icon: {
                    primary: null,
                    secondary: null
                },
                callback: {
                    onclick: null
                }
            };
            var o = $.extend(true, {}, defaults, options);
            return this.each(function () {
                var button = $(this);
                //设置属性
                button.css("display", o.display == true ? "" : "none")
                        .html(o.value)
                        .attr("disabled", o.disabled)
                        .attr("name", o.name)
                        .attr("value", o.value);
                if (o.btnClass) {
                    button.addClass(o.btnClass);
                }
                if (o.iconClass) {
                    var iconspan = $("<span class='btnicon " + HoteamUI.Common.GetImage(o.iconClass, 16) + "'></span>");
                    $(this).parent().append(iconspan);
                    if (!o.value) {
                        iconspan.css("left", $(this).parent().innerWidth() / 2 - 8);
                    }
                }
                //绑定事件
                var ctrlEvent = {};
                ctrlEvent.o = o.event.hoteamCtrl;
                button.bind("click", { e: ctrlEvent, fun: o.callback.onclick }, function (event) {
                    var functionName = event.data.fun;
                    var functionPara = ctrlEvent;
                    HoteamUI.Common.ExeFunction(functionName, functionPara);
                })
                button.nextAll(".btnicon").on("click", { button: button }, function (e) {
                    e.data.button.trigger("click");
                });
            });
        };
    })(jQuery);
}



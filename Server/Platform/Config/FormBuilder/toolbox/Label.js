InforCenter_Platform_FormBuilder_Label = {
    title: "Label",//元组件显示名称（可配置）
    icon: "../platform/Image/FormBuilder/LabelValue.png",//元组件显示图标
    applying: function () {
        if (!this.options.value) {
            this.options.value = this.getMultiLanguage(this.options["multi-language"]);
        }
        $.formbuilder.toolbox.createControl(this.options, this.container);
    },
    options: {
        label: "",
        value: "",
        textId: "",
        copyrownumber: "",
        width: "",
        height: "",
        align: "left"
    },
    property: {
        value: {
            hidden: true
        },
        check: {
            hidden: true
        },
        className: {
            hidden: true
        },
        "textId": {
            "text": HoteamUI.Language.Lang("FormBuilder.textId"),
            type: "textbox"
        },
        "copyrownumber": {
            "text": HoteamUI.Language.Lang("FormBuilder.copyrownumber"),
            type: "textbox"
        },
        "height": {
            hidden: true
        },
    },
    applyingproperty: {
        value: {
            "text": "value",
            type: "textbox",
            update: function (value) {
                this.elem.children().html(value);
            }
        },
        "text-decoration-underline": {
            text: "text-decoration-underline",
            type: "bool",
            source: {
                text: "text-decoration-underline",
                image: "text-decoration-underline.png"
            },
            update: function (value) {
                if (value === true) {
                    this.elem.children().css("text-decoration", "underline");
                }
                else {
                    this.elem.children().css("text-decoration", "none");
                }
            }
        },
        "height": {
            text: "height",
            type: "textbox",
            after: "vertical-align",
            update: function (value) {
            }
        },
        "width": {
            text: "width",
            type: "textbox",
            after: "align",
            update: function (value) {
                if (value == "") {
                    value = "auto";
                    this.elem.children().css("width",value);
                    var width = this.elem.children().width();
                    this.elem.parent().css("width",width);

                } else {
                    this.elem.children().css("width",value);
                    this.elem.parent().css("width",value);
                }
            }
        },
        "font-size": {
            text: "font-size",
            type: "combox",
            update: function (value) {
                this.elem.children().css({ "font-size": value + "px", "height": "auto", "line-height": "inherit" });
            }
        },
        "font-family": {
            text: "font-family",
            type: "combox",
            update: function (value) {
                this.elem.children().css({ "font-family": value });
            }
        },
        "text-vertical-align": {
            update: function (value) {
                this.container.find("span").css("vertical-align", value);
            }
        },
        "word-vertical": {
            text: "word-vertical",
            type: "bool",
            after: ["text-vertical-align"],
            source: {
                text: "word-vertical",
                image: "word-vertical.png"
            },
            update: function (value, position, options) {
                var id = this.elem.attr("id"),
                    text = options.value;
                if (value) {
                    text = HoteamUI.Control.Instance(id).WritingMode(text);
                    this.elem.children().html(text);
                } else {
                    this.elem.children().html(options.value);
                }
                var containerHeight = this.elem.children().height();
                this.elem.height(containerHeight);
                this.elem.parent().height(containerHeight);
                this.elem.children().css({ "margin-top": (-containerHeight / 2) + 'px', "height": containerHeight });
            }
        },
        "text-align": {
            update: function (value) {
                this.elem.children().css("text-align", value);
            }
        },
        "vertical-align": {
            text: "vertical-align",
            type: "buttons",
            order: 1003,
            source: [
                {
                    name: "top",
                    text: "vertical-align-top",
                    image: "vertical-align-top.png",
                    selected: true
                },
                {
                    name: "middle",
                    text: "vertical-align-middle",
                    image: "vertical-align-middle.png",
                    selected: false
                },
                {
                    name: "bottom",
                    text: "vertical-align-bottom",
                    image: "vertical-align-bottom.png",
                    selected: false
                }
            ],
            update: function (value) {
                var $container = this.container,
                    cellHeight,
                    contentHeight,
                    heightValue;

                heightValue = $container.parent().attr("data-height");
                if (heightValue === "auto") {
                    value = null;
                }

                if (value !== "top") {
                    cellHeight = this.container.parent().outerHeight();
                    contentHeight = $container.attr("data-height");
                    if (!contentHeight) {
                        contentHeight = this.elem.outerHeight();
                    } else {
                        contentHeight = null;
                    }
                }

                switch (value) {
                    case "top":
                        $container.css({
                            "margin-top": 0
                        });
                        break;
                    case "middle":
                        $container.css({
                            "margin-top": Math.floor((cellHeight - contentHeight) / 2)
                        });
                        break;
                    case "bottom":
                        $container.css({
                            "margin-top": Math.floor(cellHeight - contentHeight - 2)
                        });
                        break;
                    default:
                        $container.css({
                            "margin-top": 0
                        });
                        break;
                }
            }
        },

    },
    getValue: function () {
        var id = this.options.selectGuid;
        var control = HoteamUI.Control.Instance(id);
        var value = control.GetLabelText();
        return value;
    }
}

InforCenter_Platform_FormBuilder_Label = $.extend(true, {}, $.formbuilder.toolbox.label, InforCenter_Platform_FormBuilder_Label);
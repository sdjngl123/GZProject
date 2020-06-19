InforCenter_Platform_FormBuilder_CustomLabel = {
    title: "Label",//元组件显示名称（可配置）
    icon: "../platform/Image/FormBuilder/LabelValue.png",//元组件显示图标
    applying: function () {
        $.formbuilder.toolbox.createControl(this.options, this.container);
    },
    options: {
        label: "",
        value: "",
        textId: "",
        copyrownumber: "",
        width: "",
        height: "",
        align: "left",
        indent: "5"
    },
    property: {
        className: {
            hidden: true
        },
        check: {
            hidden: true
        },
        name: {
            "text": "name",
            type: "textbox"
        },
        "textId": {
            hidden: true
        },
        "copyrownumber": {
            hidden: true,
            "text": HoteamUI.Language.Lang("FormBuilder.copyrownumber"),
            type: "textbox"
        },
        "flowTaskPermission": {
            text: HoteamUI.Language.Lang("FormBuilder.flowTaskPermission"),
            type: "textbox",
            after: "vertical-align"
        }
    },
    applyingproperty: {
        value: {
            "text": "value",
            type: "textbox",
            after:["font-size"],
            hidden: false,
            update: function (value) {
                var indent = this.options.indent;
                var id = this.options.selectGuid;
                var control = HoteamUI.Control.Instance(id);
                var elem = this.elem;
                value = control.ReplaceSpaceWidthSpan(value, indent, elem);
                this.elem.children().html(value).css({ "height": "auto", "line-height": "inherit" });
            }
        },
        "font-size": {
            text: "font-size",
            type: "combox",
            after: ["vertical-align", "text-align", "text-vertical-align","width","height","line-height","indent"],
            update: function (value) {
                this.elem.children().css("font-size", value + "px");
                this.elem.find("span").css("font-size", value + "px");
            }
        },
        "font-family": {
            text: "font-family",
            type: "combox",
            update: function (value) {
                this.elem.children().css("font-family", value);
                this.elem.find("span").css("font-family", value);
            }
        },
        "line-height": {
            update: function (value) {
                if (value) {
                    if (value.indexOf('px') > -1) {
                        value = value.split('px')[0];
                    }
                    this.elem.find("span").css("line-height", value + 'px');
                }
            }
        },
        color: {
            text: "color",
            type: "colorpicker",
            update: function (value) {
                this.container.css("color", value);
                this.container.children().css("color", value);
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
                if (this.options.indent == "auto") {
                    this.elem.width("100%");
                    this.elem.children().width("100%");
                    this.elem.parent().width("100%");
                } else {
                    if (value == "") {
                        value = "auto";
                        this.elem.children().width(value);
                        var width = this.elem.children().width();
                        this.elem.parent().width(width);

                    } else {
                        this.elem.children().width(value);
                        this.elem.parent().width(value);
                    }
                }


            }
        },
        "align": {
            text: "align",
            type: "buttons",
            order: 1002,
            source: [{
                name: "left",
                text: "align-left",
                image: "align-left.png",
                selected: false
            }, {
                name: "center",
                text: "align-center",
                image: "align-center.png",
                selected: true
            }, {
                name: "right",
                text: "align-right",
                image: "align-right.png",
                selected: false
            }],
            update: function (value) {
                var $container = this.container,
                    $elem = this.elem,
                    contentWidth,
                    css;

                contentWidth = $container.attr("data-width");
                if (!contentWidth) {
                    contentWidth = this.elem.outerWidth();
                }
                else {
                    contentWidth = null;
                }

                switch (value) {
                    case "center":
                        css = {
                            "margin-left": "auto",
                            "margin-right": "auto",
                            "float": "none"
                        };
                        if (contentWidth) {
                            css.width = contentWidth + 4;
                        }
                        $container.css(css);
                        break;
                    case "left":
                        $container.css({
                            "float": "left"
                        });
                        break;
                    case "right":
                        $container.css({
                            "float": "right"
                        });
                        break;
                    default:
                        break;
                }
            }
        },
        "flowTaskPermission": {
            text: HoteamUI.Language.Lang("FormBuilder.flowTaskPermission"),
            hidden: false,
            type: "textbox",
            after: "vertical-align",
        },
        "text-vertical-align": {
            update: function (value) {
                this.container.find("span").css("vertical-align", value);
            }
        },
        "word-vertical": {
            text: "word-vertical",
            type: "bool",
            after: ["text-vertical-align", "font-size"],
            source: {
                text: "word-vertical",
                image: "word-vertical.png"
            },
            update: function (value, position, options) {
                var id = this.elem.attr("id"),
                    text = options.value,
                    indent = this.options.indent,
                    elem = this.elem;
                if (value) {
                    text = HoteamUI.Control.Instance(id).WritingMode(text);
                }
                text = HoteamUI.Control.Instance(id).ReplaceSpaceWidthSpan(text, indent, elem);
                if (this.options.indent == "auto") {
                    elem.parent().width("100%");
                    elem.width("100%");
                    elem.children().width("100%");
                }
                this.elem.children().html(text);
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
                        contentHeight = this.elem.children().outerHeight();
                    } else {
                        contentHeight = null;
                    }
                }

                switch (value) {
                    case "top":
                        $container.css({
                            "margin-top": "12px"
                        });
                        break;
                    case "middle":
                        $container.css({
                            "margin-top": Math.floor((cellHeight - contentHeight) / 2) - 2 + 12
                        });
                        break;
                    case "bottom":
                        $container.css({
                            "margin-top": Math.floor(cellHeight - contentHeight) - 3 + 12
                        });
                        break;
                    default:
                        $container.css({
                            "margin-top": "12px"
                        });
                        break;
                }
            }
        }
    },
    getValue: function () {
        return this.options.value;
    }
}

InforCenter_Platform_FormBuilder_CustomLabel = $.extend(true, {}, $.formbuilder.toolbox.label, InforCenter_Platform_FormBuilder_CustomLabel);
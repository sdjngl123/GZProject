InforCenter_Platform_FormBuilder_TextArea = {
    applying: function (options) {
        $.formbuilder.toolbox.createControl(this.options, this.container);
    },
    view: function (value) {
        var returnLabel = $.formbuilder.toolbox.label.design.call(this, value);
        $(returnLabel[0]).css({ "word-wrap": "break-word", "white-space": "normal" });
        //Ìæ»»»Ø³µ·ûºÅ
        var labelHtml = $(returnLabel[0]).html();
        if (labelHtml && labelHtml.indexOf('\n') > -1) {
            var brHtml = labelHtml.replace(/\n/g,'</br>');
            $(returnLabel[0]).html(brHtml);
        }
        return returnLabel;
    },
    options: {
        label: "",
        value: "",
        regex: "",
        regextipId: "",
        copyrownumber: "",
        height: "",
        width: "100%",
        permissionActorInfo: "",
        permissionActorID: ""
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
        "bgText": {
            "text": HoteamUI.Language.Lang("FormBuilder.bgText"),
            "type": "textbox",
            hidden:false,
            update: function (value) {
                if (this.elem.find("textarea").length > 0) {
                    this.elem.find("textarea").attr("placeholder", value).addClass("formbuilder-tip-placeholder");
                } else {
                    this.elem.attr("placeholder", value).addClass("formbuilder-tip-placeholder");
                }
            }
        },
        "height": {
            text: "height",
            hidden: false,
            type: "textbox",
            after: "vertical-align",
            update: function (value) {
                this.container.find("textarea").css("height", value);
            }
        },
        "regex": {
            "text": HoteamUI.Language.Lang("FormBuilder.regex"),
            "type": "textbox"
        },
        "regextipId": {
            "text": HoteamUI.Language.Lang("FormBuilder.regextipId"),
            type: "textbox"
        },
        "copyrownumber": {
            "text": HoteamUI.Language.Lang("FormBuilder.copyrownumber"),
            type: "textbox"
        },
        "permissionActorInfo": {
            "text": HoteamUI.Language.Lang("FormBuilder.permissionActorInfo"),
            "type": "textbox",
            source: {
                readonly: true
            }
        },
        "flowTaskPermission": {
            text: HoteamUI.Language.Lang("FormBuilder.flowTaskPermission"),
            hidden: false,
            type: "textbox",
            after: "vertical-align"
        },
        "readOnly": {
            hidden: false,
            source: {
                text: HoteamUI.Language.Lang("FormBuilder.readOnly"),
                image: "../Base/Ctrls/FormBuilder/formbuilder/images/readonly.png",
                value: false
            },
            text: HoteamUI.Language.Lang("FormBuilder.readOnly"),
            type: "bool"
        }
    },
    applyingproperty: {
        value: {
            update: function (value) {
                var id = this.options.selectGuid;
                var control = HoteamUI.Control.Instance(id);
                control.SetText(value);
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
                    if (this.elem.find("textarea").length > 0) {
                        this.elem.find("textarea").css("text-decoration", "underline");
                    } else {
                        this.elem.find("div").css("text-decoration", "underline");
                    }
                }
                else {
                    if (this.elem.find("textarea").length > 0) {
                        this.elem.find("textarea").css("text-decoration", "none");
                    } else {
                        this.elem.find("div").css("text-decoration", "none");
                    }
                }
            }
        },
        "readOnly": {
            hidden: false,
            source: {
                text: HoteamUI.Language.Lang("FormBuilder.readOnly"),
                image: "../Base/Ctrls/FormBuilder/formbuilder/images/readonly.png",
                value: false
            },
            text: HoteamUI.Language.Lang("FormBuilder.readOnly"),
            type: "bool",
            update: function (value) {
                if (value == true) {
                    this.container.css("position", "relative");
                    var html = '<div style="width:100%;height:100%;position:absolute;top:0;left:0;cursor:no-drop;z-index:9;"></div>';
                    this.container.append(html);
                }
            }
        },
        "font-size": {
            text: "font-size",
            type: "textbox",
            update: function (value) {
                if (this.elem.find("textarea").length > 0) {
                    this.elem.find("textarea").css("font-size", value);
                } else {
                    this.elem.find("div").css("font-size", value);
                }
            }
        },
        "font-family": {
            text: "font-family",
            type: "textbox",
            update: function (value) {
                var value = value;
                var elem;
                var fontFamily = "";
                var css = "";
                if (this.elem.find("textarea").length > 0) {
                    var elem = this.elem.find("textarea");
                    fontFamily = ";font-family:" + value + "!important;";
                    css = elem.attr("style") + fontFamily;
                    elem.css("cssText", css);

                } else {
                    elem = this.elem.find("div");
                    elem.css("font-family", value);
                }

            }
        },
        width: {
            text: "width",
            type: "textbox",
            update: function (value) {
                this.container.css("width", value);
                this.container.attr("data-width", value);
                this.elem.find("textarea").css("width", "100%");
                if (value == "80%") {
                    this.container.css({ "margin-left": "10%", "left": "0" });
                }
            }
        },
        "height": {
            text: "height",
            type: "textbox",
            update: function (value) {
                if (value == "") {
                    value ="31px";
                }
                this.elem.parent().css("height", value);
                this.elem.children().css("height", value);
            }
        },
        "color": {
            text: "color",
            type: "textbox",
            update: function (value) {
                if (this.elem.find("textarea").length > 0) {
                    this.elem.find("textarea").css("color", value);
                } else {
                    this.elem.find("div").css("color", value);
                }
            }
        },
        "flowTaskPermission": {
            text: HoteamUI.Language.Lang("FormBuilder.flowTaskPermission"),
            hidden: false,
            type: "textbox",
            after: "vertical-align"
        }
    },
    getValue: function () {
        var id = this.options.selectGuid;
        var control = HoteamUI.Control.Instance(id);
        var value = control.GetText();
        return value;
    }
}
InforCenter_Platform_FormBuilder_TextArea = $.extend({}, $.formbuilder.toolbox.textarea,  InforCenter_Platform_FormBuilder_Base, InforCenter_Platform_FormBuilder_TextArea);

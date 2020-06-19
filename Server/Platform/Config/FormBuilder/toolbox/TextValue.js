InforCenter_Platform_FormBuilder_TextValue = {
    title: "TextValue",//元组件显示名称（可配置）
    icon: "../platform/Image/FormBuilder/SingleUserValue.png",//元组件显示图标
    applying: function (options) {
        $.formbuilder.toolbox.createControl(this.options, this.container);
    },
    view: function (value) {
        var returnLabel = $.formbuilder.toolbox.label.design.call(this, value);
        //if (this.options.generatorType === "FileUploadValue") {
            $(returnLabel[0]).css({ "overflow": "hidden", "text-overflow": "ellipsis" });
        //}
        return returnLabel;
    },
    options: {
        regex: "",
        regextipId: "",
        copyrownumber: "",
        width: "100%",
        height: "",
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
        "height": {
            text: "height",
            hidden: false,
            type: "textbox",
            after: "vertical-align",
            update: function (value) {
                this.container.find("input").css("height", value);
            }
        },
        "text-align": {
            text: "text-align",
            type: "buttons",
            order: 1004,
            source: [{
                name: "left",
                text: "text-align-left",
                image: "text-align-left.png",
                selected: true
            }, {
                name: "center",
                text: "align-center",
                image: "text-align-center.png",
                selected: false
            }, {
                name: "right",
                text: "align-right",
                image: "text-align-right.png",
                selected: false
            }]
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
            update: function (obj) {
                var id = this.options.selectGuid;
                var control = HoteamUI.Control.Instance(id);
                if (obj) {
                    if (typeof (obj) === "object") {
                        control.SetValue(obj.value);
                        control.SetText(obj.text);
                    } else {
                        control.SetValue(obj);
                        control.SetText(this.options.text);
                    }
                }

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
                    if (this.elem.find("input").length > 0) {
                        this.elem.find("input").css("text-decoration", "underline");
                    } else {
                        this.elem.find("div").css("text-decoration", "underline");
                    }
                }
                else {
                    if (this.elem.find("input").length > 0) {
                        this.elem.find("input").css("text-decoration", "none");
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
        "text-align": {
            text: "text-align",
            type: "buttons",
            order: 1004,
            source: [{
                name: "left",
                text: "text-align-left",
                image: "text-align-left.png",
                selected: true
            }, {
                name: "center",
                text: "align-center",
                image: "text-align-center.png",
                selected: false
            }, {
                name: "right",
                text: "align-right",
                image: "text-align-right.png",
                selected: false
            }],
            update: function (value) {
                if (this.elem.find("input").length > 0) {
                    this.elem.find("input").css("text-align", value);
                } else {
                    this.elem.find("div").css("text-align", value);
                }

            }
        },
        "font-size": {
            text: "font-size",
            type: "textbox",
            update: function (value) {
                if (this.elem.find("input").length > 0) {
                    this.elem.find("input").css("font-size", value);
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
                if (this.elem.find("input").length > 0) {
                    var elem = this.elem.find("input");
                    fontFamily = ";font-family:" + value + "!important;";
                    css = elem.attr("style") + fontFamily;
                    elem.css("cssText", css);

                } else {
                    elem = this.elem.find("div");
                    elem.css("font-family", value);
                }

            }
        },
        "width": {
            text: "width",
            type: "textbox",
            after: "align",
            update: function (value) {
                if (!value) {
                    value = "80%";
                }
                this.container.css("width",value);
                this.container.attr("data-width", value);
                this.elem.find("input").css("width", "100%");
                if (value == "80%") {
                    this.container.css({ "margin-left": "10%", "left": "0" });
                }
            }
        },
        "height": {
            text: "height",
            type: "textbox",
            after: "vertical-align",
            update: function (value) {
                if (value == "") {
                    value = this.elem.children().outerHeight() + "px";
                }
                this.elem.parent().css("height", value);
            }
        },
        "color": {
            text: "color",
            type: "textbox",
            update: function (value) {
                if (this.elem.find("input").length > 0) {
                    this.elem.find("input").css("color", value);
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
        var value = control.GetValue();
        var text = control.GetText();
        var obj = {
            value: value,
            text: text
        };
        return obj;
    }
}
InforCenter_Platform_FormBuilder_TextValue = $.extend({}, $.formbuilder.toolbox.textvalue, InforCenter_Platform_FormBuilder_Base, InforCenter_Platform_FormBuilder_TextValue);
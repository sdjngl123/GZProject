InforCenter_Platform_FormBuilder_TextBoxIDSValue = {
    title: "TextBoxIDSValue",//元组件显示名称（可配置）
    icon: "../platform/Image/FormBuilder/TextBoxIDSValue.png",//元组件显示图标
    applying: function (options) {
        $.formbuilder.toolbox.createControl(this.options, this.container);
    },
    options: {
        regex: "",
        regextipId: "",
        bgText: "",
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
        className: {
            hidden: true
        },
        check: {
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
        "bgText": {
            "text": HoteamUI.Language.Lang("FormBuilder.bgText"),
            "type": "textbox",
            update: function (value) {
                if (this.elem.find("input").length > 0) {
                    this.elem.find("input").attr("placeholder", value).addClass("formbuilder-tip-placeholder");
                } else {
                    this.elem.attr("placeholder", value).addClass("formbuilder-tip-placeholder");
                }
                
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
            after: "vertical-align",
            update: function (value) {
                if (this.elem.find("input").length > 0) {
                    this.elem.find("input").val(value);
                } else {
                    this.elem.val(value);
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
        width: {
            text: "width",
            type: "textbox",
            after: "align",
            update: function (value) {
               if (!value) {
                    value = "80%";
                }
                this.container.css("width", value);
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
            after: "vertical-align",
        }
    },
    getValue: function () {
        var id = this.options.selectGuid;
        var control = HoteamUI.Control.Instance(id);
        var value = control.GetText();
        return value;
    }
}
InforCenter_Platform_FormBuilder_TextBoxIDSValue = $.extend({}, $.formbuilder.toolbox.textbox, InforCenter_Platform_FormBuilder_Base,InforCenter_Platform_FormBuilder_TextBoxIDSValue);

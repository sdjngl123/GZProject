InforCenter_Platform_FormBuilder_DateTime = {
    title: "DateTime",//元组件显示名称（可配置）
    icon: "../platform/Image/FormBuilder/SingleUserValue.png",//元组件显示图标
    applying: function (options) {
        $.formbuilder.toolbox.createControl(this.options, this.container);
    },
    options: {
        value: "",
        regex: "",
        regextipId: "",
        copyrownumber: "",
        width: "100%",
        height: "",
        permissionActorInfo: "",
        permissionActorID: ""
    },
    property: {
        height: {
            hidden: true
        },
        check: {
            hidden: true
        },
        value: {
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
                    if (this.options.generatorType == "TimeValue") {
                        if (typeof (obj) === "object") {
                            control.SetDateTime(InforCenter_Platform_Object_IntToTimeFormat(obj.value));
                        } else {
                            control.SetDateTime(InforCenter_Platform_Object_IntToTimeFormat(obj));
                        }
                    } else {

                        if (typeof (obj) === "object") {
                            control.SetDateTimeByTicks(obj.value);
                            control.SetDateTime(obj.text);
                        } else {
                            control.SetDateTimeByTicks(obj);
                        }
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
                    this.elem.children().children().find("input").css("text-decoration", "underline");
                }
                else {
                    this.elem.children().children().find("input").css("text-decoration", "none");
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
                    var html = '<div style="width:100%;height:100%;position:absolute;top:0;left:0;cursor:no-drop;z-index:9999;"></div>';
                    this.container.append(html);
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
        width: {
            width: "width",
            type: "textbox",
            after: "align",
            update: function (value) {
                if (!value) {
                    value = "80%";
                }
                this.container.css("width",value);
                this.container.attr("data-width", value);
                var width = this.elem.width();
                this.elem.children().children().find("input").css("width", width - 28);
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
        "text-align": {
            update: function (value) {
                this.elem.find("input,.hoteam-label").css("text-align", value);
            }
        },
        "flowTaskPermission": {
            text: HoteamUI.Language.Lang("FormBuilder.flowTaskPermission"),
            hidden: false,
            type: "textbox",
            after: "vertical-align"
        }
    },
    /*view: function (value) {
        var value = this.options.value;
        var id = this.options.selectGuid;
        var control = HoteamUI.Control.Instance(id);
        control.SetDateTimeByTicks(value);
    },*/
    getValue: function () {
        var id = this.options.selectGuid,value;
        var control = HoteamUI.Control.Instance(id);
        value = control.GetTicksByDateTime() ? control.GetTicksByDateTime() : '';
        var text = control.GetDateTime();
        if (isNaN(control.GetTicksByDateTime())) {
            value = InforCenter_Platform_Object_TimeFormatToInt(text);
        }
        var obj = {
            value: value,
            text: text
        };
        return obj;

    }
}
InforCenter_Platform_FormBuilder_DateTime = $.extend({}, $.formbuilder.toolbox.date, InforCenter_Platform_FormBuilder_DateTime);
InforCenter_Platform_FormBuilder_CheckBoxList = {
    title: "CheckBoxList",//元组件显示名称（可配置）
    icon: "../platform/Image/FormBuilder/SingleUserValue.png",//元组件显示图标
    applying: function (options) {
        $.formbuilder.toolbox.createControl(this.options, this.container);
    },
    view: function () {
        this.options.disable = true;
        $.formbuilder.toolbox.createControl(this.options, this.container);
        var id = this.options.selectGuid;
        var control = HoteamUI.Control.Instance(id);
        control.SetServerData(this.options.value);
    },
    options: {
        value: "",
        regex: "",
        regextipId: "",
        textId: "",
        items: [{ text: "option", value: "option" }],
        copyrownumber: "",
        width: "",
        height: "",
        permissionActorInfo: "",
        permissionActorID: "",
        width: "100%"
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
        //width: {
        //    hidden: true
        //},
        "text-align": {
            hidden: true
        },
        "vertical-align": {
            hidden: true
        },
        //"align": {
        //    hidden: true
        //},
        "font-weight": {
            hidden: true
        },
        "font-style-italic": {
            hidden: true
        },
        "text-decoration-underline": {
            hidden: true
        },
        "regex": {
            "text": HoteamUI.Language.Lang("FormBuilder.regex"),
            "type": "textbox"
        },
        "regextipId": {
            "text": HoteamUI.Language.Lang("FormBuilder.regextipId"),
            type: "textbox"
        },
        "textId": {
            "text": HoteamUI.Language.Lang("FormBuilder.textId"),
            type: "textbox",
            hidden: true
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
        //设置列排列方式
        "ColNum": {
            hidden: false,
            text: HoteamUI.Language.Lang("FormBuilder.ColNum"),
            type: "textbox",
            checking: function (value) {
                if (value == '') {
                    return true;
                } else if (!(/(^[1-9]\d*$)/.test(value))) {
                    return false;
                }
                return true;
            }

        },
        "radioMark": {
            hidden: false,
            source: {
                text: HoteamUI.Language.Lang("FormBuilder.radioMark"),
                image: "../Base/Ctrls/FormBuilder/formbuilder/images/radio-group.png",
                value: false
            },
            text: HoteamUI.Language.Lang("FormBuilder.radioMark"),
            type: "bool"
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
                control.SetServerData(value);

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
        "font-family": {
            text: "font-family",
            type: "textbox",
            update: function (value) {
                this.elem.find("td").css("font-family", value);
            }
        },
        "font-size": {
            text: "font-size",
            type: "textbox",
            update: function (value) {
                this.elem.find("td").css("font-size", value);
            }
        },
        "color": {
            text: "color",
            type: "textbox",
            update: function (value) {
                this.elem.find("td").css("color", value);
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
        var value = control.GetSelectData();
        return value;
    }
}
InforCenter_Platform_FormBuilder_CheckBoxList = $.extend({}, $.formbuilder.toolbox.checkboxgroup, InforCenter_Platform_FormBuilder_CheckBoxList);
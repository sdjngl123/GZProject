InforCenter_Platform_FormBuilder_RadioList = {
    title: "RadioList",//元组件显示名称（可配置）
    icon: "../platform/Image/FormBuilder/SingleUserValue.png",//元组件显示图标
    applying: function (options) {
        $.formbuilder.toolbox.createControl(this.options, this.container);
    },
    options: {
        value: "",
        regex: "",
        regextipId: "",
        items: [{ text: "option1", value: "option1", selected: false },
        { text: "option2", value: "option2", selected: true }],
        copyrownumber: "",
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
                var obj = obj ? obj : '';
                if (typeof obj == "object") {
                    control.SetSelectByValue(obj.value);
                } else {
                    control.SetSelectByValue(obj);
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
                    this.elem.addClass("hoteam-formbuilder-radiolist-textunderline");
                }
                else {
                    this.elem.removeClass("hoteam-formbuilder-radiolist-textunderline");
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
            //type: "textbox",
            //after: "align",
            update: function (value) {
                var wdith=value;

                if (!value) {
                    wdith = this.container.parent().width();
                }

                this.container.css("width", wdith);
            }
        },
        "height": {
            text: "height",
            update: function (value) {
                this.elem.css("height", "100%");
                this.elem.parent().css("height", "100%");
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
        var oj = {};
        var id = this.options.selectGuid;
        var control = HoteamUI.Control.Instance(id);
        var value = control.GetValue();
        var text = control.GetText();
        obj = {
            value: value,
            text:text
        }
        return obj;
    }
}
InforCenter_Platform_FormBuilder_RadioList = $.extend({}, $.formbuilder.toolbox.radiogroup, InforCenter_Platform_FormBuilder_RadioList);
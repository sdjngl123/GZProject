InforCenter_Platform_FormBuilder_CheckBox = {
    title: "CheckBox",//元组件显示名称（可配置）
    icon: "../platform/Image/FormBuilder/SingleUserValue.png",//元组件显示图标
    applying: function (options) {
        $.formbuilder.toolbox.createControl(this.options, this.container);
    },
    view: function () {
        value = this.options.value;
        return $("<label>" + this.options.value + "</label>");
    },
    options: {
        value: [],
        regex: "",
        regextipId: "",
        textId:"",
        items: [{ text: "option", value: "option" }],
        copyrownumber: "",
        width:"",
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
             type: "textbox"
        },
        "copyrownumber": {
            "text": HoteamUI.Language.Lang("FormBuilder.copyrownumber"),
            type: "textbox"
        },
        "permissionActorInfo": {
            "text": HoteamUI.Language.Lang("FormBuilder.permissionActorInfo"),
            //19797 李金岳
            hidden: true,
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
                control.SetChecked(value);
                control.SetText("");
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
                value:false
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
                this.elem.find(".hoteam-checkbox-text").css("font-size", value);
            }
        },
        "width": {
            width: "width",
            type: "textbox",
            after: "align",
            update: function () {
                var item;
                if ($(".hoteam-checkbox").length > 0) {
                    item = this.elem.find(".hoteam-checkbox");
                    item.css("width", "initial");
                    var width = item.css("width");
                    if (width == "0px") {//IE
                        width = "20px";
                    }
                    this.container.width(width);
                }else{
                    this.elem.css("width", "20px");
                }

            }
        },
        "height": {
            text: "height",
            update: function (value) {
                var height = this.elem.children().outerHeight();
                this.elem.parent().css("height", height + "px");
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
        var value = control.IsChecked();
        var arr = [];
        arr.push(value);
        return value;
    }
}
InforCenter_Platform_FormBuilder_CheckBox = $.extend({}, $.formbuilder.toolbox.checkboxgroup, InforCenter_Platform_FormBuilder_CheckBox);
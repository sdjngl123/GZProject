InforCenter_Platform_FormBuilder_DropDown = {
    title: "DropDown",//元组件显示名称（可配置）
    icon: "../platform/Image/FormBuilder/SingleUserValue.png",//元组件显示图标
    applying: function (options) {
        var id, _this = this;
        $.formbuilder.toolbox.createControl(this.options, this.container);
        id = this.options.selectGuid;
        $("#" + id + "_DropDown").on("change", function () {
            var value = $(this).attr("data-val") || "";
            _this.cascadeEvent(value);
        });
    },
    options: {
        label: "",
        value: "",
        regex: "",
        regextipId: "",
        items: [],
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
        "readOnly": {
            hidden: false,
            source: {
                text: HoteamUI.Language.Lang("FormBuilder.readOnly"),
                image: "../Base/Ctrls/FormBuilder/formbuilder/images/readonly.png",
                value: false
            },
            text: HoteamUI.Language.Lang("FormBuilder.readOnly"),
            type: "bool"
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
        "cascade-source": {
            type: "textbox"
        },
        "cascade-control": {
            type: "textbox"
        },
        "text-align": {
            hidden: true
        }
    },
    applyingproperty: {
        value: {
            update: function (value) {
                var id = this.options.selectGuid;
                var control = HoteamUI.Control.Instance(id);
                //control.LoadItems(this.options.items);
                var value = value ? value : '';
                if (typeof value === "object") {
                    control.SetSelectedByValue(value.value);
                } else {
                    control.SetSelectedByValue(value);
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
            text: "width",
            type: "textbox",
            after: "align",
            update: function (value) {
                if (!value) {
                    value = "80%";
                }
                this.container.css("width",value);
                this.container.attr("data-width", value);
                var item = this.elem.find("input");
                item.parent().css("width", "100%");
                var width = item.css("width");
                if (HoteamUI.Browser.isIE && HoteamUI.Browser.version == "9.0") {
                    width = item.width() + 40;
                }
                setTimeout(function () {
                    $("#" + item.attr("bomenuid")).css("width", width);
                }, 200);
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
        var obj = {};
        var id = this.options.selectGuid;
        var control = HoteamUI.Control.Instance(id);
        var value = control.GetSelectedValue();
        var text = control.GetSelectedText();
        obj = {
            value: value,
            text: text
        }
        return obj;
    },
    renderItems: function () {
        var id,
            control,
            item;

        id = this.options.selectGuid,
            items = this.options.items || [];
        if (items && items.length > 0) {
            for (var i = 0, len = items.length; i < len; i++) {
                item = items[i];
                if (item.Selected) {
                    this.options.value = item.Value;
                    break;
                }
            }
        }
        control = HoteamUI.Control.Instance(id);
        control.LoadItems(items);
    }


}
InforCenter_Platform_FormBuilder_DropDown = $.extend({}, $.formbuilder.toolbox.select, InforCenter_Platform_FormBuilder_DropDown);


function data1() {
    return [
        {
            Text: "t1",
            Value: "1"
        },
        {
            Text: "t2",
            Value: "2"
        },
        {
            Text: "t3",
            Value: "3"
        }
    ];
}

function data2() {
    return [
        {
            Text: "t11",
            Value: "11"
        },
        {
            Text: "t22",
            Value: "22"
        },
        {
            Text: "t33",
            Value: "33",
            Selected: true
        }
    ];
}
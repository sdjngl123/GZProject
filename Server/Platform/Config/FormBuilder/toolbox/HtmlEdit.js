InforCenter_Platform_FormBuilder_HtmlEdit = {
    applying: function (options) {
        $.formbuilder.toolbox.createControl(this.options, this.container);
    },
    options: {
        label: "",
        value: "",
        copyrownumber: "",
        height: "100%",
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
        "font-family": {
            hidden: true
        },
        "font-size":{
            hidden: true
        },
        "font-weight": {
            hidden: true
        },
        "font-style-italic": {
            hidden: true
        },
        "text-decoration-underline": {
            hidden: true
        },
        "color": {
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
        height: {
            text: "height",
            type: "textbox",
            update: function (value) {
                this.elem.css("height", value);
            }
        },
        "flowTaskPermission": {
            text: HoteamUI.Language.Lang("FormBuilder.flowTaskPermission"),
            hidden: false,
            type: "textbox",
            after: "vertical-align"
        }
    },
    applyingproperty: {
        value: {
            update: function (value) {
                var id = this.elem.attr("id");
                var control= HoteamUI.Control.Instance(id);
                control.SetText(value);
               // this.elem.find("iframe").contents().find("body").html(value);
            }
        }
    },
    getValue: function () {
        var id = this.options.selectGuid;
        var control = HoteamUI.Control.Instance(id);
        var value = control.GetText();
        return value;
    }
}
InforCenter_Platform_FormBuilder_HtmlEdit = $.extend({}, $.formbuilder.toolbox.textarea, InforCenter_Platform_FormBuilder_HtmlEdit);

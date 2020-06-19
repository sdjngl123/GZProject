InforCenter_Platform_FormBuilder_ImageUploadValue = {
    title: "Label",//元组件显示名称（可配置）
    icon: "../platform/Image/FormBuilder/ImageValue.png",//元组件显示图标
    applying: function () {
        this.options["vertical-align"] = "top";
        $.formbuilder.toolbox.createControl(this.options, this.container);
    },
    view: function (value) {
        this.options.controlInfo.CtrlOptions.src = this.options.value;
        $.formbuilder.toolbox.createControl(this.options, this.container);
    },
    options: {
        label: "",
        value: "../platform/Image/FormBuilder/ImageValue.png",
        copyrownumber: "",
        permissionActorInfo: "",
        permissionActorID: "",
        left: 0
    },
    property: {
        "font-family": {
            hidden: true
        },
        check: {
            hidden: true
        },
        "text-align": {
            hidden: true
        },
        "font-size": {
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
        "font-weight": {
            hidden: true
        },
        "bgText": {
            "text": HoteamUI.Language.Lang("FormBuilder.bgText"),
            "type": "textbox",
            hidden: false,
            update: function (value) {
                if (value) {
                    this.container.parent().attr("title", value);
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
        },
        width: {
            hidden: true,
            update: function (value) {
                this.elem.find(">img").width(16);
            }
        },
        height: {
            hidden: true,
            update: function (value) {
                this.elem.find(">img").height(16);
            }
        },
        value: {
            hidden: true,
            "text": "image-upload",
            type: "fileupload",
            source: {
                text: "image-upload",
                image: "../platform/Image/FormBuilder/ImageValue.png",
                url: PageInit.WebRootPath + "/Base/BaseHandler.ashx?type=uploadFileBase64&fileSupport=jpg,png,jpeg,bmp,gif"
            },
            order: 9999,
            designUpdate: function (value) {
                if (!value) {
                    return;
                }
                this.elem.find(">img").attr("src", value);
            },
            applyingUpdate: function (value) {

            },
            viewUpdate: function (value) {
                this.container.css({ "width": "100%", "height": "100%", "margin-top": 0 });

                this.elem.css({ "width": "100%", "height": "100%" });
                var imgId = this.elem.attr("id");
                var imgInstance = HoteamUI.Control.Instance(imgId);
                imgInstance.Resize();
            },
            conver: function (src) {
                this.options.src = src;
                src = src || "";
                if (src.indexOf('base64|') === 0) {
                    src = src.split('|');
                    src = 'data:image/' + src[1] + ';' + src[0] + ',' + src[2];
                } else {
                    src = src.replace("~", PageInit.WebRootPath);
                }
                return src;
            },

        },
        className: {
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
        }
    },
    applyingproperty: {
        value: {
            update: function (value) {

                var id = this.elem.find("img").attr("id").split("_")[0];
                var control = HoteamUI.Control.Instance(id);
                var value = value ? value : '';
                if (typeof value === "object") {
                    control.SetValue(value.value);
                    control.SetSrc(value.text);
                } else {
                    var text = this.options.text;
                    control.SetValue(value);
                    control.SetSrc(text);
                }

                if (this.options.readOnly) {
                    var imgId = this.elem.attr("id");
                    var imgInstance = HoteamUI.Control.Instance(imgId);
                    imgInstance.HiddenPanel(["item3"]);
                }
            },
        },
        "width": {
            text: "width",
            type: "textbox",
            after: "align",
            update: function (value) {
                var id;
                value = value || this.container.parent().width();
                this.elem.width(value);
                id = this.elem.attr("id");
                HoteamUI.Control.Instance(id).Resize();
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
        "bgText": {
            "text": HoteamUI.Language.Lang("FormBuilder.bgText"),
            "type": "textbox",
            hidden: false,
            update: function (value) {
                if (value) {
                    this.container.parent().attr("title", value);
                }
            }
        },
        "height": {
            text: "height",
            type: "textbox",
            after: "vertical-align",
            update: function (value) {
                var id;
                if (this.builder.options.pattern === "applying" && this.options.readOnly !== true) {
                    value = 100;
                }
                else {
                    value = value || this.container.parent().height();
                }

                this.elem.height(value);
                this.container.parent().height(value);
                id = this.elem.attr("id");
                HoteamUI.Control.Instance(id).Resize();
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
        var id = this.elem.find("img").attr("id").split("_")[0];
        var control = HoteamUI.Control.Instance(id);
        var value = control.GetValue();
        var text = control.GetSrc();
        var obj = {
            value: value,
            text: text
        };
        return obj;
    }
}

InforCenter_Platform_FormBuilder_ImageUploadValue = $.extend({}, $.formbuilder.toolbox.image, InforCenter_Platform_FormBuilder_ImageUploadValue);
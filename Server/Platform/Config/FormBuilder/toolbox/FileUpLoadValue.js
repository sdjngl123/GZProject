InforCenter_Platform_FormBuilder_FileUpLoad = {
    title: "FileUpLoad",//Ԫ�����ʾ���ƣ������ã�
    icon: "../platform/Image/FormBuilder/FileUploadValue.png",//Ԫ�����ʾͼ��
    source: {
        "icon": "file.png",
        //TODO:ָ��ƽ̨�ϴ��ļ�url
        "uploadUrl": "",
        //TODO:ָ��ƽ̨ɾ���ļ�url
        "deleteUrl": "",
        //TODO:ָ����Ҫ�Ĳ���
        "deleteParams": {},
        "onUpload": function () { },
        "onDelete": function () { }
    },
    applying: function () {
        var containerHeight = this.options.height;
        if (containerHeight != "auto") {
            this.container.parent().css("overflow", "scroll");
        };
        $.formbuilder.toolbox.createControl(this.options, this.container);
    },
    view: function () {
        var value = this.options.value;
        var html = '';
        if (typeof value == "string" && !HoteamUI.Common.IsNullOrEmpty(value)) {
            value = JSON.parse(value);
        }
        if (value && value.length > 0) {
            for (var i = 0; i < value.length; i++) {
                html += [
                    '<div class="formbuilder-control-file-list" style="color: rgb(51, 51, 51);">',
                    '<div class="formbuilder-control-file-list-item">',
                    '<span><img src="../Platform/Ctrls/FileUpload/images/file-upload.png"></span>',
                    '<span class="formbuilder-control-file-list-item-name"> ',
                    '<a style="padding:3px 5px;" target="_blank" title="' + value[i].name + '" href="' + value[i].src + '">' + value[i].name + '</a></span>',
                    '<span>' + value[i].size + '</span></div></div>',

                ].join('');
            }
        }
        return $(html);
    },
    options: {
        label: "",
        value: [],
        copyrownumber: "",
        width: "100%",
        height: "",
        align: "left"
    },
    property: {
        className: {
            hidden: true
        },
        check: {
            hidden: true
        },
        "copyrownumber": {
            "text": HoteamUI.Language.Lang("FormBuilder.copyrownumber"),
            type: "textbox"
        },
        "flowTaskPermission": {
            text: HoteamUI.Language.Lang("FormBuilder.flowTaskPermission"),
            hidden: false,
            type: "textbox",
            after: "vertical-align",
            update: function (value) { }
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
                if (typeof value == "string" && !HoteamUI.Common.IsNullOrEmpty(value)) {
                    value = JSON.parse(value);
                }
                if (value) {
                    var id = this.options.selectGuid;
                    var control = HoteamUI.Control.Instance(id);
                    control.LoadFiles(value);
                }

            },
        },

        "flowTaskPermission": {
            text: HoteamUI.Language.Lang("FormBuilder.flowTaskPermission"),
            hidden: false,
            type: "textbox",
            after: "vertical-align",
            update: function (value) { }
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
        "height": {
            hidden: true,
            after: "vertical-align",
            update: function (value) {
                this.container.find(".formbuilder-control-file").css("padding", 0);
                this.container.find(".FileUpload").css("height", "inherit");
            }
        }
    },
    getValue: function () {
        var id = this.options.selectGuid;
        var control = HoteamUI.Control.Instance(id);
        var value = control.GetFiles();
        value = JSON.stringify(value);
        return value;
    }
}

InforCenter_Platform_FormBuilder_FileUpLoad = $.extend({}, $.formbuilder.toolbox.file, InforCenter_Platform_FormBuilder_FileUpLoad);
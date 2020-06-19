InforCenter_Platform_FormBuilder_PageContainer = {
    title: "PageContainer",//元组件显示名称（可配置）
    icon: "../platform/Image/FormBuilder/PageContainer.png",//元组件显示图标
    design: function (options) {
        return $([
            "<div class='", this.className.container, "'>",
            "<img class='", this.className["default-img"], "' ", "src='", this.icon, "'", " />",
            "</div>"
        ].join(""));
    },
    applying: function (options) {
        $.formbuilder.toolbox.createControl(this.options, this.container);
    },
    options: {
        label: "",
        value: "",
        pageName: "",
        copyrownumber: "",
        width: "100%",
        height: "100%",
        permissionActorInfo: "",
        permissionActorID: ""
    },
    //getValue: function () {
    //    var pid;
    //    pid = this.elem.attr("id");
    //    HoteamUI.Page.FirePageEvent(pid, "OnGetDataFromPage", {});
    //    return InforCenter_Platform_Object_Data;
    //},
    className: {
        container: "formbuilder-control-image",
        img: "formbuilder-control-image-img",
        "default-img": "formbuilder-control-image-img-default"
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
        "font-size": {
            hidden:true
        },
        "font-weight": {
            hidden: true
        },
        "text-decoration-underline": {
            hidden:true
        },
        "color": {
            hidden:true
        },

        "font-style-italic": {
            hidden:true
        },
        "font-family": {
            hidden:true
        },
        "align": {
            hidden:true
        },
        "vertical-align": {
            hidden:true
        },
        "text-align":{
          hidden:true  
        },
        "height": {
            hidden: true
        },
        "width": {
            hidden: true
        },
        "copyrownumber": {
            hidden:true,
            "text": HoteamUI.Language.Lang("FormBuilder.copyrownumber"),
            type: "textbox"
        },
        "permissionActorInfo": {
            hidden:true,
            "text": HoteamUI.Language.Lang("FormBuilder.permissionActorInfo"),
            "type": "textbox",
            source: {
                readonly: true
            }
        },
        "flowTaskPermission": {
            text: HoteamUI.Language.Lang("FormBuilder.flowTaskPermission"),
            hidden: true,
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
        "width": {
            text: "width",
            type: "textbox",
            after: "align",
            update: function (value) {
                var id;
                value = value || this.container.parent().parent().width();
                this.elem.width(value);
                this.container.width(value);
                this.container.parent().width(value);
                id = this.elem.attr("id");
                HoteamUI.Control.Instance(id).Resize();
            }
        },
        "height": {
            text: "height",
            type: "textbox",
            after: "vertical-align",
            update: function (value) {
                var id;
                value = value || this.container.parent().parent().height();
                this.elem.height(value);
                this.container.height(value);
                this.container.parent().height(value);
                id = this.elem.attr("id");
                HoteamUI.Control.Instance(id).Resize();
            }
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
        }
    },
    getValue: function () {
        var id = this.options.selectGuid;
        var control = HoteamUI.Control.Instance(id);
        var value = control.GetText();
        return value;
    }
}

InforCenter_Platform_FormBuilder_PageContainer = $.extend({}, $.formbuilder.toolbox.textbox, InforCenter_Platform_FormBuilder_PageContainer);

HoteamUI.Control.OEditButton = {
    Create: function (options) {
        options = options || {};
        var me = this;
        var ctrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions;

        var o = {};
        o.parentId = this.id;
        o.id = this.GetId();
        o.regex = ctrlOptions.regex;
        o.regextipId = ctrlOptions.regextipId;
        o.o = HoteamUI.Control.Instance(o.parentId);
        o.event = {};
        var handlers = (options.controlInfo || this.ControlInfo()).PageHandlers;
        $.each(handlers, function (index, val) {
            if (val.HandlerName == "OnClick") {
                o.event.OnClick = me.GetEventFunctionName("OnClick");
            }
        });
        $.hoteamEditButton.create(o);
    },
    SetTag: function (obj) {
        var id = this.GetId();
        $("#" + id).find("input").val(obj.text || obj.Text || "").data("tag", obj);
    },
    GetTag: function () {
        var id = this.GetId();
        return $("#" + id).find("input").data("tag");
    },
    GetText: function () {
        var id = this.GetId();
        return $("#" + id).find("input").val();
    },
    GetId: function () {
        return this.id + "_EditButton";
    },
    Check: function (regex, title) {
        var id = this.GetId();
        var val = this.GetText();
        if (regex) {//如果有这个参数，则说明重新对校验格式进行了赋值
            $("#" + id + "_container" + "_check")
                .data("regex", regex)
                .poshytip({
                    content: title ? title : ""
                });
        }
        //第三个参数为false，如果校验不通过，处理本控件长度由本方法处理，不由hoteamToolTip处理
        var result = $.hoteamToolTip.check(id + "_container", val, false);
        if (result) {
            $("#" + id).removeAttr("checkstatus");
            $.hoteamEditButton.resize(id, 0);
        } else {
            $("#" + id).attr("checkstatus", "N");
            $.hoteamEditButton.resize(id, 25);
        }
        return result;
    },
    Disable: function () {
        var id = this.id + "_EditButton";
        $("#" + id).find("input").attr("disabled", "disabled");
        $("#" + id).find(".input-group-addon").attr("disabled", "disabled");
    },
    Enable: function () {
        var id = this.id + "_EditButton";
        $("#" + id).find("input").removeAttr("disabled");
        $("#" + id).find(".input-group-addon").removeAttr("disabled");
    },
    DisableText: function () {
        var id = this.id + "_EditButton";
        $("#" + id).find("input").attr("disabled", "disabled");
    },
    Resize: function () {
        var id = this.GetId();
        $.hoteamEditButton.resize(id, $("#" + id).attr("checkstatus") ? 25 : 0);
    },
    HideButton: function () {
        var id = this.GetId();
        var button = $("#" + id).find(".input-group-addon");
        button.hide();
        button.parent().width("100%");
        $("#" + id).find("input").addClass("hidebutton");
    },
    ShowButton: function () {
        var id = this.GetId();
        var button = $("#" + id).find(".input-group-addon");
        button.show();
        $("#" + id).find("input").removeClass("hidebutton");
    }
}

{
    (function ($) {
        $.hoteamEditButton = {
            create: function (o) {
                var parentDiv = $("#" + o.parentId);
                var divContainer = '<div class="hoteamEditButton" id="' + o.id + '_container"></div>';
                parentDiv.append(divContainer);
                if (o.autofit) {
                    parentDiv.css("height", 40);
                }
                var disabled = o.disabled == true ? 'disabled="disabled"' : '';
                var editButton =
                '<div id="' + o.id + '" class="input-group">' +
                    '<input class="input-sm form-control" type="text" ' + disabled + '>' +
                    '<span ' + disabled + ' class="input-group-addon"><span class="basesprite b-gray-more"></span></span>' +
                '</div>'
                ;
                parentDiv.children().append(editButton);
                this.initHanlder(o);

                //添加校验
                var obak = $.extend(false, {}, o);
                obak.id = obak.id + "_container";
                if (obak.regex) {
                    $.hoteamToolTip.create(obak);
                }

                this.resize(o.id, 0);
            },
            initHanlder: function (o) {
                $("#" + o.id).on("click", ".input-group-addon", function () {
                    if ($(this).attr("disabled") === "disabled") {
                        return;
                    }
                    HoteamUI.Common.ExeFunction(o.event.OnClick, { o: o.o });
                });
            },
            resize: function (id, size) {
                var ele = $("#" + id);
                ele.parent().css("width", ele.parent().parent().width() - size);
            }
        }
    })(jQuery);
}
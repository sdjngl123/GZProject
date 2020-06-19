HoteamUI.Control.OTextValue = {
    Create: function (options) {
        options = options || {};
        //设置参数
        var self = this;
        var parentId = this.id;
        var id = this.id + "_TextValue";
        var ctrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions;
        var obak = $.extend(true, {}, $.hoteamTextBox.defaults);
        var o = $.extend(true, {}, obak, ctrlOptions);
        o.parentId = parentId;
        o.id = id;
        o.type = "text";
        o.autofit = options.autofit;
        o.disabled = o.disabled ? o.disabled : !!o.readOnly;
        o.readOnly = true;
        $.hoteamTextBox.create(o);

        //添加、设置属性
        if (o.text && o.text.split(".").length > 1) {
            o.text = HoteamUI.Language.Lang(o.text.split(".")[0], o.text.split(".")[1]);
        }
        var textValue = $("#" + id).attr("hiddenValue", o.value).attr("value", o.text).attr("title", o.text);
        var textValueParent = textValue.parent();
        textValue.addClass("hoteam-textvalue");
        if (o.disabled != true) {
            textValue.css({
                "background-color": "#fff",
                "cursor": "pointer"
            });
        } else {
            textValue.css({
                "background-color": "#ECECEC",
                "cursor": "default"
            });
        }
        if (o.canDelete != false) {

            textValueParent.append("<span title='" + HoteamUI.Language.Lang("TextValue.Clear") + "' class='basesprite b-close hoteam-textvalue-trash'/>");
            textValueParent.find(">.basesprite").click(function () {
                //$(this).siblings("input").val("").attr("hiddenValue", "").attr("title", "");

                self.SetText('');
                self.SetValue('');
            });
            if (o.disabled === true) {
                textValue.siblings(".basesprite").hide();
            }

            if (!o.disabled) {
                textValueParent.find(".hoteam-textvalue").addClass("hoteam-textvalue-trash-show");
            }
        }

        //结束
        //添加事件
        var handlers = (options.controlInfo || this.ControlInfo()).PageHandlers;
        var functionName, functionPara;
        $.each(handlers, function (index, val) {
            if (val.HandlerName == "OnClick") {
                textValue.click(function () {
                    var ctrlEvent = {};
                    ctrlEvent.o = HoteamUI.Control.Instance(parentId);

                    functionName = self.GetEventFunctionName("OnClick");
                    functionPara = ctrlEvent;
                    HoteamUI.Common.ExeFunction(functionName, functionPara);
                });
            }
            else if (val.HandlerName == "OnFocus") {

                textValue.focus(function () {
                    var ctrlEvent = {};
                    ctrlEvent.o = HoteamUI.Control.Instance(parentId);

                    functionName = self.GetEventFunctionName("OnFocus");
                    functionPara = ctrlEvent;
                    HoteamUI.Common.ExeFunction(functionName, functionPara);
                });
            }
            else if (val.HandlerName == "OnChange") {
                $("#" + id).data('OnChangeHandler', 'OnChange');
            }
        });
    },
    Resize: function () {
        var id = this.id + "_TextValue";
        var textvalue = $("#" + id);
        $.hoteamTextBox.resize(id);
        if (textvalue.attr("checkstatus")) {
            textvalue.siblings(".b-close").css("right", 33);
        } else {
            textvalue.siblings(".b-close").css("right", 8);
        }
    },
    Check: function () {
        var id = this.id + "_TextValue";
        var input = $("#" + id);
        var result = $.hoteamToolTip.check(id, input.attr("hiddenvalue"), false);
        if (result) {
            input.removeAttr("checkstatus");
            $.hoteamTextBox.resize(id, 0);
            input.siblings(".b-close").css("right", 8);
        } else {
            input.attr("checkstatus", "N");
            $.hoteamTextBox.resize(id, 25);
            input.siblings(".b-close").css("right", 33);
        }
        return result;
    },
    Disable: function () {
        var select = "#" + this.id + "_TextValue";
        //需求59：开始
        $(select).attr("disabled", true).css({
            "background": "#ECECEC",
            "cursor": "default"
        }).siblings(".basesprite").hide();
        //结束
    },
    Enable: function () {
        var select = "#" + this.id + "_TextValue";
        //需求59：开始
        $(select).removeAttr("disabled").css({
            "background": "#fff",
            "cursor": "cursor"
        }).siblings(".basesprite").show();
        //结束
    },
    Clear: function () {
        this.SetText("");
        this.SetValue("");
        $("#" + this.id + "_TextValue").nextAll(".hoteam-textbox-label").css("display", "block");
    },
    GetText: function () {
        var select = "#" + this.id + "_TextValue";
        return $(select).attr("value");
    },
    SetText: function (text) {
        var id = this.id + "_TextValue";
        var select = $("#" + id);
        select.attr("value", text).attr("title", text);
        if (text !== null && text !== undefined && text !== "") {
            select.nextAll(".hoteam-textbox-label").css("display", "none");
        }
        else {
            select.nextAll(".hoteam-textbox-label").css("display", "block");
        }
        select.removeAttr("checkstatus");
        //将校验的提示隐藏
        select.nextAll(".hoteam-form-check").children().hide();
        $.hoteamTextBox.resize(id, 0);
        select.siblings(".b-close").css("right", 8);
    },
    GetValue: function () {
        var select = "#" + this.id + "_TextValue";
        return $(select).attr("hiddenValue");
    },
    SetValue: function (value) {
        var select = "#" + this.id + "_TextValue";
        var handlerName = $(select).data('OnChangeHandler');
        var lastValue = this.GetValue();
        $(select).attr("hiddenValue", value);
        if (handlerName) {
            if (lastValue !== value) {
                this._OnChange(value);
            }
        }
    },
    _OnChange: function (value) {
        var ctrlEvent = {};
        ctrlEvent.o = HoteamUI.Control.Instance(this.id);
        ctrlEvent.value = value;
        functionName = this.GetEventFunctionName("OnChange");
        functionPara = ctrlEvent;
        HoteamUI.Common.ExeFunction(functionName, functionPara);
    }
};
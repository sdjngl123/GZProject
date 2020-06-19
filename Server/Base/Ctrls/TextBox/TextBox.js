HoteamUI.Control.OTextBox = {
    Create: function (options) {
        //设置参数
        options = options || {};
        var handlers = (options.controlInfo || this.ControlInfo()).PageHandlers;
        var parentId = this.id;
        var id = this.id + "_TextBox";
        var CtrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions;
        var o = $.extend(true, {}, $.hoteamTextBox.defaults, CtrlOptions);
        o.parentId = parentId;
        o.id = id;
        o.autofit = options.autofit;
        $.hoteamTextBox.create(o);
        //添加事件
        var self = this;
        var ctrldata = window.hoteamctrl[id];
        ctrldata.ctrl = this;
        ctrldata.handlers = {};

        for (var i = 0; i < handlers.length; i++) {
            var val = handlers[i];
            var handlerName = val.HandlerName;

            switch (handlerName) {

                case "OnClick":
                    ctrldata.handlers.click = self.GetEventFunctionName("OnClick");
                    window.hoteamctrl[id].element.onclick = function () {
                        var id = this.id;
                        var ctrldata = window.hoteamctrl[id];
                        var functionName = ctrldata.handlers.click;
                        var functionPara = { o: ctrldata.ctrl };
                        HoteamUI.Common.ExeFunction(functionName, functionPara);
                    }
                    break;

                case "OnFocusout":
                    ctrldata.handlers.focusout = self.GetEventFunctionName("OnFocusout");
                    window.hoteamctrl[id].element.onblur = function () {
                        var id = this.id;
                        var ctrldata = window.hoteamctrl[id];
                        var functionName = ctrldata.handlers.focusout;
                        var functionPara = { o: ctrldata.ctrl };
                        HoteamUI.Common.ExeFunction(functionName, functionPara);
                    }
                    break;

            }
        }
    },
    Dispose: function () {
        var id = this.id + "_TextBox";
        delete window.hoteamctrl[id];
    },
    Resize: function () {
        var id = this.id + "_TextBox";
        $.hoteamTextBox.resize(id, $("#" + id).attr("checkstatus") ? 25 : 0);
    },
    Disable: function () {
        var select = "#" + this.id + "_TextBox";
        var tagname = $(select)[0].tagName;
        if (tagname == "TEXTAREA") {
            $(select).attr("readonly", true).css("background-color", "#eee");
        } else {
            $(select).attr("disabled", true).addClass("hoteam-text-disabled");
        }
        if (HoteamUI.Browser.isIE && HoteamUI.Browser.version == "9.0") {
            $(select).parent().attr("onselectstart", "return false");
        }
    },
    Enable: function () {
        var select = "#" + this.id + "_TextBox";
        var tagname = $(select)[0].tagName;
        if (tagname == "TEXTAREA") {
            $(select).attr("readonly", false).css("background-color", "#fff");
        } else {
            $(select).attr("disabled", false).removeClass("hoteam-text-disabled");
        }
    },
    Clear: function () {
        var select = "#" + this.id + "_TextBox";
        $(select).val("").nextAll(".hoteam-textbox-label").css("display", "");
    },
    GetText: function () {
        var select = "#" + this.id + "_TextBox";
        return $(select).val();
    },
    SetText: function (text) {
        var id = this.id + "_TextBox";
        var textBox = $("#" + id);
        if (text !== null && text !== undefined && text !== "") {
            textBox.nextAll(".hoteam-textbox-label").css("display", "none");
            textBox.attr("value", text);
        }
        else {
            textBox.val("");
            textBox.nextAll(".hoteam-textbox-label").css("display", "");
        }
        //将校验的提示隐藏
        textBox.nextAll(".hoteam-form-check").children().hide();
        $.hoteamTextBox.resize(id, 0);
    },
    //重新设置regex
    SetRegex: function (regex, title) {
        var id = this.id + "_TextBox";
        if (regex) {
            $.hoteamToolTip.overload(id, regex, title);
        }
    },
    Check: function (regex, title) {
        var id = this.id + "_TextBox";
        if (regex) {
            $.hoteamToolTip.overload(id, regex, title);
        }
        var input = $("#" + id);
        var result = $.hoteamToolTip.check(id, input.val(), false);
        if (result) {
            input.removeAttr("checkstatus");
            $.hoteamTextBox.resize(id, 0);
            input.siblings('.hoteam-textbox-control').css('right', 0);
        } else {
            input.attr("checkstatus", "N");
            $.hoteamTextBox.resize(id, 25);
            input.siblings('.hoteam-textbox-control').css('right', 22);
        }
        return result;
    },
    SetPlaceholder: function (value) {
        var textbox = $("#" + this.id + "_TextBox");
        $.hoteamTextBox.setPlaceholder(textbox,value);
    },
    GetCursorPos: function () {
        var textbox = $("#" + this.id + "_TextBox");
        return $.hoteamTextBox.getCursorPos(textbox);
    },
    MoveCursorPosToEnd: function () {
        var textbox = $("#" + this.id + "_TextBox");
        $.hoteamTextBox.moveEnd(textbox[0]);
    },
    Insert: function (value) {
        var textbox = $("#" + this.id + "_TextBox");
        return $.hoteamTextBox.insertString(textbox, value);
    },
    SetPlaceHolder: function (text) {
        var textbox = $("#" + this.id + "_TextBox");
        textbox.attr('placeholder', text);
    }
};


{
    (function ($) {
        $.hoteamTextBox = {
            defaults: {
                parentId: null,
                id: null,
                height: null,
                width: null,
                margin: null,
                type: "text",
                readOnly: false,
                disabled: false,
                bgText: "",
                regex: null,
                regextipId: "",
                text: "",
                value: ""
            },
            create: function (options) {
                var o, ctrldata, html, textbox, readonlyHtml, container, type, step, fixed,placeholderText;
                o = $.extend({}, $.hoteamTextBox.defaults, options);
                window.hoteamctrl = window.hoteamctrl || {};
                ctrldata = window.hoteamctrl[o.id] = {};
                ctrldata.initOptions = o;

                container = document.getElementById(o.parentId);
                readonlyHtml = (o.readOnly == true) ? 'readOnly="true"' : " ";
                if (o.text) {
                    if (o.text.indexOf('.') > 0) {
                        o.text = HoteamUI.Language.Lang(o.text);
                    }
                }
                o.bgText ? o.bgText = HoteamUI.Language.Lang(o.bgText) : null;
                placeholderText = (o.placeholder ? "placeholder=" + o.placeholder : '');
                if (o.type == "textarea") {
                    html = ['<textarea id = "', o.id, '"', readonlyHtml, placeholderText, ' class="hoteamText-textarea form-control">', '</textarea>'].join("");
                }
                else {

                    var style = 'style="display:' + ((o.text == "" || o.text == undefined) ? "block" : "none") + ';"';
                    var type = o.type;
                    var typestr = "text";
                    if (type == "password") {
                        typestr = type;
                    }
                    html = ['<input type="', typestr, '" id = "', o.id + '"', readonlyHtml, placeholderText, ' class="hoteam-textbox form-control input-sm ', 'hoteam-textbox-', type, '"  /><label class="hoteam-textbox-label" for="' + o.id + '" ', style, ' >', o.bgText, '</label>'];

                    if (type === 'number') {
                        html.push(['<span class="hoteam-textbox-control">',
                            '<span class="hoteam-textbox-control-up">',
                            '   <span class="basesprite b-angle-up"></span>',
                            '</span>',
                            '<span class="hoteam-textbox-control-down">',
                            '   <span class="basesprite b-angle-down"></span>',
                            '</span>',
                            '</span>'].join(''));
                    }

                    html = html.join("");

                }
                container.innerHTML = html;
                if (o.autofit) {
                    container.style.height = "40px";
                }
                textbox = document.getElementById(o.id);
                textbox.value = o.text;
                ctrldata.element = textbox;

                if (o.disabled == true) {
                    if (o.type == "textarea") {
                        $("#" + o.id).attr("readonly", "true").css("background-color", "#eee");
                    } else {
                        $("#" + o.id).attr("disabled", "true");
                    }
                }
                else if (type === 'number') {
                    step = (o.step - 0) || 1;
                    fixed = (o.fixed - 0) || 0;
                    $(container).find('.hoteam-textbox-control-up').on('click', function () {
                        var number = textbox.value;
                        if (!isNaN(number)) {
                            textbox.value = (number - 0 + step).toFixed(fixed);
                        }
                    });
                    $(container).find('.hoteam-textbox-control-down').on('click', function () {
                        var number = textbox.value;
                        if (!isNaN(number)) {
                            textbox.value = (number - 0 - step).toFixed(fixed);
                        }
                    });
                }

                if (o.readOnly == true) {
                    $("#" + o.id).attr("readonly", "true");
                }
                if (o.type != "textarea" && o.bgText) {
                    textbox.onkeyup = this.handlers.keyup;
                    textbox.onkeydown = this.handlers.keydown;
                }
                if (o.regex) {
                    $.hoteamToolTip.create(o);
                }
                this.resize(o.id, 0);
            },
            handlers: {
                keyup: function () {
                    var label = $(this).siblings('.hoteam-textbox-label');
                    this.value == "" ? label.show() : label.hide();
                    return false;
                },
                keydown: function () {
                    if (event.key == "Enter" || event.which == 13 || event.keyCode == 13) {
                        return false;
                    }
                }
            },
            resize: function (id, size) {
                var textBox = $("#" + id);
                var type = hoteamctrl[textBox[0].id].initOptions.type;
                if (type == "textarea") {
                    textBox.css("height", textBox.parent().height() - 10);
                }
                var par = textBox.parent();
                textBox.css("width", (par.width() - (size ? size : 0)) + "px");
            },
            setPlaceholder: function (textbox, value) {
                var value = value ? value : '';
                textbox.attr("placeholder", value);
            },
            getCursorPos: function (textbox) {
                var e = textbox[0];
                if (e.selectionStart) {
                    return e.selectionStart;
                } else if (document.selection) {
                    e.focus();
                    var range = document.selection.createRange();
                    var value = range.duplicate();
                    value.moveToElementText(e);
                    value.setEndPoint('EndToEnd', range);
                    return value.text.length - range.text.length;
                }
                return 0;
            },
            moveEnd: function (obj) {
                obj.focus();
                var len = obj.value.length;
                if (document.selection) {
                    var sel = obj.createTextRange();
                    sel.moveStart('character', len); //设置开头的位置
                    sel.collapse();
                    sel.select();
                } else if (typeof obj.selectionStart == 'number' && typeof obj.selectionEnd == 'number') {
                    obj.selectionStart = obj.selectionEnd = len;
                }
            },
            insertString: function (textbox, value) {
                textbox.each(function () {
                    textbox.focus();
                    if (document.selection) {
                        var range = document.selection.createRange();
                        document.selection.empty();
                        range.text = value;
                        range.collapse();
                        range.select();
                    } else {
                        var newstart = textbox.get(0).selectionStart + value.length;
                        textbox.val(textbox.val().substr(0, textbox.get(0).selectionStart) +
                                value + textbox.val().substring(textbox.get(0).selectionEnd));
                        textbox.get(0).selectionStart = newstart;
                        textbox.get(0).selectionEnd = newstart;
                    }
                });
            }
        }
    })(jQuery);
}
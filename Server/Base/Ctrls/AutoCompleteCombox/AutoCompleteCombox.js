HoteamUI.Control.OAutoCompleteCombox = {
    Create: function (options) {
        options = options || {};
        //设置参数
        var self = this;
        var parentId = this.id;
        var id = this.id + "_autoCombox";
        var ctrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions;
        ctrlOptions = $.extend(true, {}, $.hoteamUIMultiSelectDropDown.defaults, ctrlOptions);
        ctrlOptions.parentId = parentId;
        ctrlOptions.id = id;
        ctrlOptions.autofit = options.autofit;
        //获取配置文件中的数据
        var data = [];
        for (var i in ctrlOptions) {
            if (!ctrlOptions.hasOwnProperty(i)) {
                continue;
            }
            if (i.indexOf("item") > -1) {
                var item = ctrlOptions[i],
                    itembak = {};
                itembak.value = item.value;
                if (item.textId) {
                    itembak.text = HoteamUI.Language.Lang(item.textId);
                }
                if (HoteamUI.Common.IsNullOrEmpty(itembak.text)) {
                    itembak.text = item.textId;
                }
                if (item.selected) {
                    ctrlOptions.selectValue = itembak.value;
                    ctrlOptions.selectText = itembak.text;
                }
                data.push(itembak);
            }
        }
        ctrlOptions.data = data;
        //事件参数
        var handlers = (options.controlInfo || this.ControlInfo()).PageHandlers;
        ctrlOptions.event = {};
        ctrlOptions.o = HoteamUI.Control.Instance(parentId);
        $.each(handlers, function (index, val) {
            if (val.HandlerName == "OnLoad") {
                ctrlOptions.callback.onload = self.GetEventFunctionName("OnLoad");
            }
            if (val.HandlerName == "OnChange") {
                ctrlOptions.callback.onchange = self.GetEventFunctionName("OnChange");
            }
        });
        $.hoteamAutoCompleteCombox.create(ctrlOptions);
    },
    LoadItems: function (data) {
        var id = this.id + "_autoCombox";
        var arr = new Array();
        if (data && data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                var o = {};
                o.Value = data[i]["Value"];
                o.Text = data[i]["Text"];

                //20947 李金岳
                o.Selected = data[i]["Selected"] || false;
                arr[i] = o;
            }
        }
        $.hoteamAutoCompleteCombox.loadItem(id, arr);
    },
    Resize: function () {
        var id = this.id + "_autoCombox";
        $.hoteamAutoCompleteCombox.resize(id, 0);
    },
    GetSelectedText: function () {
        var id = this.id + "_autoCombox";
        return $("#" + id).bsSuggest("getSelectedText");
    },
    SetText: function (text) {
        var id = this.id + "_autoCombox";
        $("#" + id).bsSuggest("setText", text);
    },
    ClearSelectData: function () {
        var id = this.id + "_autoCombox";
        $("#" + id).bsSuggest("clearSelectData");
    },
    SetSelectedByValue: function (value) {
        var id = this.id + "_autoCombox";
        $("#" + id).bsSuggest("setSelectedByValue", value);
    },
    SetSelectedByIndex: function (index) {
        var id = this.id + "_autoCombox";
        $("#" + id).bsSuggest("setSelectedByIndex", index);
    },
    GetSelectedValue: function () {
        var id = this.id + "_autoCombox";
        return $("#" + id).bsSuggest("getSelectedValue");
    },
    Disable: function () {
        var id = this.id + "_autoCombox";
        $("#" + id).bsSuggest("disable");
        $("#" + id).addClass("readonly");
    },
    Enable: function () {
        var id = this.id + "_autoCombox";
        $("#" + id).bsSuggest("enable");
        $("#" + id).removeClass("readonly");
    },
    Check: function () {
        var id = this.id + "_autoCombox";
        var val = this.GetSelectedValue();
        if (!val) {
            val = this.GetSelectedText();
        }
        //第三个参数为false，如果校验不通过，处理本控件长度由本方法处理，不由hoteamToolTip处理
        var result = $.hoteamToolTip.check(id + "_container", val, false);
        if (result) {
            $.hoteamAutoCompleteCombox.resize(id, 0);
        } else {
            $.hoteamAutoCompleteCombox.resize(id, 25);
        }
        return result;
    },
    IsInOption: function () {
        var id = this.id + "_autoCombox";
        return $("#" + id).bsSuggest("isInOption");
    },
    Dispose: function () {
        var id = this.id + "_autoCombox";
        $("#" + id).bsSuggest("destroy");
    }
};

{
    (function ($) {
        $.hoteamAutoCompleteCombox = {
            defaults: {
                parentid: null,
                id: null,
                value: null,
                data: [],
                disabled: false,
                regex: null,
                callback: {
                    onload: function () { }
                }
            },

            create: function (options) {
                var o = $.extend({}, $.hoteamAutoCompleteCombox.defaults, options);
                //创建container及下拉基本元素
                var selectDiv = '<div id="' + o.id + '_container" class="input-group hoteam-autocompletecombox-container"></div>';
                $("#" + o.parentId).append(selectDiv);
                var select = [
                    '<input type="text" id="' + o.id + '" class="form-control input-sm" autocomplete="off">',
                    '<div class="input-group-btn">',
                    '<div class="btn btn-default dropdown-toggle btn-sm" data-toggle="dropdown">',
                    '<span class="caret"></span>',
                    '</div>',
                    '</div>'
                ];
                $("#" + o.parentId).children(".input-group").append(select.join(''));

                if (o.autofit) {
                    $("#" + o.parentId).css("height", "40");
                }
                //调用插件进行下拉初始化
                $("#" + o.id).bsSuggest({ "data": o.data });
                //change事件

                $("#" + o.id).on("change", { e: { "o": o.o }, fun: o.callback.onchange }, function (e) {
                    HoteamUI.Common.ExeFunction(e.data.fun, e.data.e);
                });

                //加载onload方法
                HoteamUI.Common.ExeFunction(o.callback.onload, o);

                //添加校验
                var obak = $.extend(false, {}, o);
                obak.id = obak.id + "_container";
                if (obak.regex) {
                    $.hoteamToolTip.create(obak);
                }

                this.resize(o.id, 0);
                //是否可用
                if (o.disabled) {//不可用
                    $("#" + o.id).bsSuggest("disable");
                    $("#" + o.id).addClass("readonly");
                }
            },
            loadItem: function (id, data) {
                $("#" + id).bsSuggest("loadData", data);
            },
            resize: function (id, size) {
                var parentWidth = $("#" + id).parent().parent().width();
                $("#" + id).parent().css("width", parentWidth - size);
                $("#" + id).bsSuggest("resize");
            }
        }
    })(jQuery);
}
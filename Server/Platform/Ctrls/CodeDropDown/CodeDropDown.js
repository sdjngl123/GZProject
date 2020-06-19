HoteamUI.Control.OCodeDropDown = {
    Create: function (options) {
        options = options || {};
        //设置参数
        var self = this;
        var parentId = this.id;
        var id = this.id + "_DropDown";
        var ctrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions;
        ctrlOptions = $.extend(true, {}, $.hoteamCodeDropDown.defaults, ctrlOptions);
        ctrlOptions.parentId = parentId;
        ctrlOptions.id = id;
        ctrlOptions.autofit = options.autofit;
        ctrlOptions.label = options.label;
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
                itembak.tag = item.tag;
                if (item.textId) {
                    itembak.text = HoteamUI.Language.Lang(item.textId);
                } else {
                    itembak.text = item.textId;
                }
                itembak.selected = item.selected;
                data.push(itembak);
            }
        }
        ctrlOptions.data = data;
        //事件参数
        var handlers = (options.controlInfo || this.ControlInfo()).PageHandlers;
        ctrlOptions.event = {};
        ctrlOptions.o = HoteamUI.Control.Instance(parentId);
        $.each(handlers, function (index, val) {
            var handlerName = HoteamUI.Common.IsNullOrEmpty(val.Script) ? self.GetEventFunctionName(val.HandlerName) : val.Script;
            if (val.HandlerName == "OnLoad") {
                ctrlOptions.callback.onload = handlerName;
            }
            if (val.HandlerName == "OnChange") {
                ctrlOptions.callback.onchange = handlerName;
            }
            if (val.HandlerName == "OnRemove") {
                ctrlOptions.callback.onremove = handlerName;
            }
        });
        $.hoteamCodeDropDown.create(ctrlOptions);
    },
    Resize: function () {
        var id = this.id + "_DropDown";
        $.hoteamCodeDropDown.resize(id, $("#" + id).attr("checkstatus") ? 25 : 0);
    },
    //重新设置regex
    SetRegex: function (regex, title) {
        var id = this.id + "_DropDown";
        if (regex) {
            $.hoteamToolTip.overload(id + "_container", regex, title);
        }
    },
    Check: function (regex, title) {
        var id = this.id + "_DropDown";
        var val = this.GetSelectedText();
        if (regex) {//如果有这个参数，则说明重新对校验格式进行了赋值
            $.hoteamToolTip.overload(id + "_container", regex, title);
        }
        //第三个参数为false，如果校验不通过，处理本控件长度由本方法处理，不由hoteamToolTip处理
        var result = $.hoteamToolTip.check(id + "_container", val, false);
        if (result) {
            $("#" + id).removeAttr("checkstatus");
            $.hoteamCodeDropDown.resize(id, 0);
        } else {
            $("#" + id).attr("checkstatus", "N");
            $.hoteamCodeDropDown.resize(id, 25);
        }
        return result;
    },
    Disable: function () {
        var id = this.id + "_DropDown";
        $.hoteamCodeDropDown.disable(id);
    },
    Enable: function () {
        var id = this.id + "_DropDown";
        $("#" + id).bsSuggest("enable");
        $("#" + id).addClass("readonly");
    },
    LoadItems: function (data) {
        var id = this.id + "_DropDown";
        var arr = new Array();
        var defaultSel = {};
        var item;
        if (data && data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                var o = {};
                item = data[i];
                o.value = item["Value"];
                o.text = item["Text"];
                o.selected = item["Selected"];
                for (var j in item) {
                    if (item.hasOwnProperty(j)) {
                        o[j] = item[j];
                    }
                }
                arr[i] = o;
            }
        }
        $.hoteamCodeDropDown.loaditem(id, arr);
        this.HideWarn();
    },
    ClearSelectData: function () {
        var id = this.id + "_DropDown";
        $("#" + id).bsSuggest("clearSelectData");
    },
    GetSelectedText: function () {
        var id = this.id + "_DropDown";
        return $("#" + id).bsSuggest("getSelectedText");
    },
    SetSelectedByValue: function (value) {
        var id = this.id + "_DropDown";
        $("#" + id).bsSuggest("setSelectedByValue", value);
        this.HideWarn();
    },
    SetSelectedByIndex: function (index) {
        var id = this.id + "_DropDown";
        $("#" + id).bsSuggest("setSelectedByIndex", index);
        this.HideWarn();
    },
    GetSelectedValue: function () {
        var id = this.id + "_DropDown";
        return $("#" + id).bsSuggest("getSelectedValue");
    },
    GetSelectedData: function (filter) {
        var id = this.id + "_DropDown";
        return $.hoteamCodeDropDown.getSelectData(id, filter);
    },
    HideWarn: function (id) {
        var id = this.id + "_DropDown";
        $("#" + id + "_container").nextAll(".hoteam-form-check").children().hide();
        $.hoteamCodeDropDown.resize(id, 0);
    },
    Dispose: function () {
        var id = this.id + "_DropDown";
        $("#" + id).bsSuggest("destroy");
    },
    Change: function (option) {
        HoteamUI.Common.ExeFunction(option.fun, option);
    }
};


{
    (function ($) {
        $.hoteamCodeDropDown = {
            defaults: {
                parentid: null,
                id: null,
                data: [],
                selectValue: "",
                selectText: "",
                disabled: false,
                regex: null,
                regextipId: "",
                callback: {
                    onchange: null,
                    onload: null
                },
                label: null
            },
            create: function (options) {
                var o = $.extend({}, $.hoteamAutoCompleteCombox.defaults, options);
                var label = "<div class='hoteam-dropdown-label' title='" + options.label + "' >" + (options.label || "") + "</div>";
                $("#" + o.parentId).append(label);
                //创建container及下拉基本元素
                var selectDiv = '<div id="' + o.id + '_container" class="input-group hoteam-dropdown-container"></div>';
                $("#" + o.parentId).append(selectDiv);
                if (o.autofit) {
                    $("#" + o.parentId).css("height", 40);
                }
                var select = [
                    '<input type="text" id="' + o.id + '" class="form-control input-sm readonly" autocomplete="off" readonly>',
                    '<div class="input-group-btn">',
                        '<div  class="btn btn-default dropdown-toggle btn-sm" data-toggle="dropdown">',
                            '<span class="caret"></span>',
                        '</div>',
                    '</div>'
                ];
                $("#" + o.parentId).children(".input-group").append(select.join(''));

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
                    this.disable(o.id);
                }
            },
            loaditem: function (id, data) {
                $("#" + id).data("info", data);
                $("#" + id).bsSuggest("loadData", data);
            },
            getSelectData: function (id, filter) {
                var value = $("#" + id).bsSuggest("getSelectedValue"),
                    info = $("#" + id).data("info"),
                    item;

                if (info && info.length > 0) {
                    for (var i = 0, len = info.length; i < len; i++) {
                        item = info[i];
                        if (item.value === value) {
                            return item[filter];
                        }
                    }
                }
                return null;
            },
            disable: function (id) {
                $("#" + id).bsSuggest("disable");
                $("#" + id).removeClass("readonly");
            },
            resize: function (id, size) {
                //var parentWidth = $("#" + id).parent().parent().width();
                //$("#" + id).parent().css("width", parentWidth - size);
                //$("#" + id).bsSuggest("resize");
            }
        }
    })(jQuery);
}
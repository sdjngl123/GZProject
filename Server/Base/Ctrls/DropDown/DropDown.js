HoteamUI.Control.ODropDown = {
    Create: function (options) {
        options = options || {};
        //设置参数
        var self = this;
        var parentId = this.id;
        var id = this.id + "_DropDown";
        var ctrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions;
        ctrlOptions = $.extend(true, {}, $.hoteamDropDown.defaults, ctrlOptions);
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
            if (val.HandlerName == "OnLoad") {
                ctrlOptions.callback.onload = self.GetEventFunctionName("OnLoad");
            }
            if (val.HandlerName == "OnChange") {
                ctrlOptions.callback.onchange = self.GetEventFunctionName("OnChange");
            }
            if (val.HandlerName == "OnRemove") {
                ctrlOptions.callback.onremove = self.GetEventFunctionName("OnRemove");
            }
            if (val.HandlerName == "OnFocus") {
                ctrlOptions.callback.onfocus = self.GetEventFunctionName("OnFocus");
            }
        });
        $.hoteamDropDown.create(ctrlOptions);
    },
    Resize: function () {
        var id = this.id + "_DropDown";
        $.hoteamDropDown.resize(id, $("#" + id).attr("checkstatus") ? 25 : 0);
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
        var val = this.GetSelectedValue();
        if (regex) {//如果有这个参数，则说明重新对校验格式进行了赋值
            $.hoteamToolTip.overload(id + "_container", regex, title);
        }
        //第三个参数为false，如果校验不通过，处理本控件长度由本方法处理，不由hoteamToolTip处理
        var result = $.hoteamToolTip.check(id + "_container", val, false);
        if (result) {
            $("#" + id).removeAttr("checkstatus");
            $.hoteamDropDown.resize(id, 0);
        } else {
            $("#" + id).attr("checkstatus", "N");
            $.hoteamDropDown.resize(id, 25);
        }
        return result;
    },
    Disable: function () {
        var id = this.id + "_DropDown";
        $.hoteamDropDown.disable(id);
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
        if (data && data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                var o = {};
                o.value = data[i]["Value"];
                o.text = data[i]["Text"];
                o.selected = data[i]["Selected"];
                arr[i] = o;
            }
        }
        $.hoteamDropDown.loaditem(id, arr);
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
    HideWarn: function (id) {
        var id = this.id + "_DropDown";
        $("#" + id + "_container").nextAll(".hoteam-form-check").children().hide();
        $.hoteamDropDown.resize(id, 0);
    },
    Dispose: function () {
        var id = this.id + "_DropDown";
        $("#" + id).bsSuggest("destroy");
    }
};


{
    (function ($) {
        $.hoteamDropDown = {
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
                    onload: null,
                    onfocus: null
                }
            },
            create: function (options) {
                var o = $.extend({}, $.hoteamAutoCompleteCombox.defaults, options);
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
                
                $("#" + o.id).on("focus", { e: { "o": o.o }, fun: o.callback.onfocus }, function (e) {
                    console.log("into onfocus");
                    var $elem = $(this);
                    if (!$elem.data("executing")) {
                        //
                        $elem.data("executing", true);
                        HoteamUI.Common.ExeFunction(e.data.fun, e.data.e);
                    }
                    //IE兼容性处理
                    //在IE下会出现重复获取焦点执行的情况，阻止这种情况，不重新获取数据
                    setTimeout(function () {
                        $elem.data("executing", false);
                    }, 200);

                });

                $("#" + o.id).next(".input-group-btn").on("mousedown", { e: { "o": o.o }, fun: o.callback.onfocus }, function (e) {
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
                $("#" + id).bsSuggest("loadData", data);
            },
            disable: function (id) {
                $("#" + id).bsSuggest("disable");
                $("#" + id).removeClass("readonly");
            },
            resize: function (id, size) {
                var parentWidth = $("#" + id).parent().parent().width();
                $("#" + id).parent().css("width", parentWidth - size);
                $("#" + id).bsSuggest("resize");
            }
        }
    })(jQuery);
}
HoteamUI.Control.OMultiSelectDropDown = {
    Create: function (options) {
        options = options || {};
        //设置参数
        var self = this;
        var parentId = this.id;
        var id = this.id + "_hoteamMultiSelectDropDown";
        var ctrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions;
        ctrlOptions = $.extend(true, {}, $.hoteamUIMultiSelectDropDown.defaults, ctrlOptions);
        ctrlOptions.parentId = parentId;
        ctrlOptions.id = id;
        ctrlOptions.autofit = options.autofit;
        //事件参数
        var handlers = (options.controlInfo || this.ControlInfo()).PageHandlers;
        ctrlOptions.event = {};
        ctrlOptions.o = HoteamUI.Control.Instance(parentId);
        $.each(handlers, function (index, val) {
            if (val.HandlerName == "OnLoad") {
                ctrlOptions.callback.onload = self.GetEventFunctionName("OnLoad");
            } else if (val.HandlerName == "OnChange") {
                ctrlOptions.callback.onchange = self.GetEventFunctionName("OnChange");
            } else if (val.HandlerName == "OnHide") {
                ctrlOptions.callback.onhide = self.GetEventFunctionName("OnHide");
            }
        });
        $.hoteamUIMultiSelectDropDown.create(ctrlOptions);
    },
    LoadItems: function (data) {
        var id = this.id + "_hoteamMultiSelectDropDown";
        var arr = new Array();
        if (data && data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                arr[i] = {
                    Value: data[i]["Value"],
                    //处理第一个下拉选项为空的时候，给子元素a添加&nbsp;称高度
                    Text: data[i]["Text"] === "" ? "&nbsp;" : data[i]["Text"],
                    Selected: data[i]["Selected"]
                };
            }
        }

        $.hoteamUIMultiSelectDropDown.loadItem(id, arr);
        this.HideWarn();
    },
    GetSelectedValue: function () {
        return $("#" + this.id + "_hoteamMultiSelectDropDown").selectpicker("getSelectedValue");
    },
    GetSelectedText: function () {
        return $("#" + this.id + "_hoteamMultiSelectDropDown").selectpicker("getSelectedText");
    },
    SetSelectedByValue: function (value) {
        $("#" + this.id + "_hoteamMultiSelectDropDown").selectpicker("setSelectedByValue", value);
        this.HideWarn();
    },
    //重置清空值
    Clear:function(){
        $("#" + this.id + "_hoteamMultiSelectDropDown").selectpicker("clear");
    },
    GetSelectedLength: function () {
        var arrStr = $("#" + this.id + "_hoteamMultiSelectDropDown").selectpicker("getSelectedText");
        if(arrStr){
            return arrStr.split(";").length;
        }
        return 0;
    },
    Resize: function () {
        var id = this.id + "_hoteamMultiSelectDropDown";
        $.hoteamUIMultiSelectDropDown.resize(id, $("#" + id).attr("checkstatus")?25:0);
    },
    Check: function () {
        var id = this.id + "_hoteamMultiSelectDropDown";
        var val = this.GetSelectedValue();
        //第三个参数为false，如果校验不通过，处理本控件长度由本方法处理，不由hoteamToolTip处理
        var result = $.hoteamToolTip.check(id + "_container", val, false);
        if (result) {
            $("#" + id).removeAttr("checkstatus");
            $.hoteamUIMultiSelectDropDown.resize(id, 0);
        } else {
            $("#" + id).attr("checkstatus","N");
            $.hoteamUIMultiSelectDropDown.resize(id, 25);
        }
        return result;
    },
    HideWarn:function(){
        var id = this.id + "_hoteamMultiSelectDropDown";
        $("#" + id + "_container").nextAll(".hoteam-form-check").children().hide();
        $.hoteamUIMultiSelectDropDown.resize(id, 0);
    },
    Disable: function () {
        var select = $("#" + this.id + "_hoteamMultiSelectDropDown");
        select.selectpicker("disable");
        select.removeClass("readonly");
    },
    Enable: function () {
        var select = $("#" + this.id + "_hoteamMultiSelectDropDown");
        select.selectpicker("enable");
        select.addClass("readonly");
    },
    Dispose: function () {
        var id = this.id + "_hoteamMultiSelectDropDown";
        $("#" + id).selectpicker("destroy");
    }
}

{
    (function ($) {
        $.hoteamUIMultiSelectDropDown = {
            defaults: {
                data: [],
                regex: null,
                callback: {
                    onload: null
                }
            },
            create: function (options) {
                var o = $.extend({}, $.hoteamUIMultiSelectDropDown.defaults, options);
                //创建container及下拉基本元素
                var selectDiv = '<div id="' + o.id + '_container" class="input-group hoteam-multiSelect-container"></div>';
                var parentDiv = $("#" + o.parentId);
                parentDiv.append(selectDiv);
                if (o.autofit) {
                    parentDiv.css("height",40);
                }
                var select = [
                    '<input type="text" id="' + o.id + '" class="form-control input-sm readonly" autocomplete="off" readonly>',
                    '<div class="input-group-btn">',
                        '<div type="button" class="btn btn-default dropdown-toggle btn-sm" data-toggle="dropdown">',
                            '<span class="caret"></span>',
                        '</div>',
                    '</div>'
                ];
                parentDiv.children(".input-group").append(select.join(''));

                //调用插件进行下拉初始化
                var param = { data: o.data };
                if (o.callback.onchange) {
                    param.onchange = function (obj) {
                        var ele = $(this);
                        var ctrl = {
                            o: o.o,
                            text: obj.text,
                            value: obj.value
                        };
                        HoteamUI.Common.ExeFunction(o.callback.onchange, ctrl);
                    }
                }
                if (o.callback.onhide) {
                    param.onhide = function (obj) {
                        var ele = $(this);
                        var ctrl = {
                            o: o.o,
                            text: obj.text,
                            value: obj.value
                        };
                        HoteamUI.Common.ExeFunction(o.callback.onhide, ctrl);
                    }
                }
                $("#" + o.id).selectpicker(param);

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
                    $("#" + o.id).selectpicker("disable");
                    $("#" + o.id).removeClass("readonly");
                }
            },
            loadItem: function (id, data) {
                if (data && data instanceof Array) {
                    $("#" + id).selectpicker("loadData", data);
                }
            },
            resize: function (id, size) {
                var parentWidth = $("#" + id).parent().parent().width();
                $("#" + id).parent().css("width", parentWidth - size);
                $("#" + id).selectpicker("resize");
            }
        }
    })(jQuery);
}
HoteamUI.Control.ODateTime = {
    Create: function (options) {
        var self = this;
        options = options || {};
        //设置参数
        var parentId = this.id;
        var id = this.id + "_DateTime";
        var CtrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions;
        var o = $.extend(true, {}, $.hoteamDateTime.defaults, CtrlOptions);
        o.parentId = parentId;
        o.id = id;
        o.DateType = o.type;
        o.type = "text";
        o.autofit = options.autofit;
        //事件参数
        var handlers = (options.controlInfo || this.ControlInfo()).PageHandlers;
        o.event = {};
        o.o = HoteamUI.Control.Instance(parentId);
        $.each(handlers, function (index, val) {
            if (val.HandlerName == "OnChange") {
                o.callback.onchange = self.GetEventFunctionName("OnChange");
            }
        });
        $.hoteamDateTime.create(o);
    },
    Resize: function () {
        var id = this.id + "_DateTime";
        $.hoteamDateTime.resize(id, 0);
    },
    Check: function () {
        var id = this.id + "_DateTime";
        var val = this.GetDateTime();
        //此控件之前不支持获取time类型的值，暂时增加此判断，后续前端同事有时间再做支持
        if (this.ControlInfo().CtrlOptions.type == 'time') {
            return true;
        }
        //第三个参数为false，如果校验不通过，处理本控件长度由本方法处理，不由hoteamToolTip处理
        var result = $.hoteamDateTime.check(val);
        if (result) {
            result = $.hoteamToolTip.check(id + "_container", val, false);
        }
        else {
            $.hoteamToolTip.check(id + "_container", "", false);
        }
        if (result) {
            $.hoteamDateTime.resize(id, 0);
        } else {
            $.hoteamDateTime.resize(id, 25);
        }
        return result;
    },
    setStartDate: function (value) {
        var id = this.id + "_DateTime";
        $("#" + id).datetimepicker("setStartDate", value);
    },
    setEndDate: function (value) {
        var id = this.id + "_DateTime";
        $("#" + id).datetimepicker("setEndDate", value);
    },
    Disable: function () {
        var id = this.id + "_DateTime";
        $.hoteamDateTime.disable(id);
    },
    Enable: function () {
        var id = this.id + "_DateTime";
        $.hoteamDateTime.enable(id);
    },
    Clear: function () {
        var select = "#" + this.id + "_DateTime";
        $(select).find("input.input-sm").attr("value", "");
    },
    GetDateTime: function () {
        var select = "#" + this.id + "_DateTime";
        return $(select).find("input.input-sm").attr("value");
    },
    SetDateTime: function (dateTime) {
        var select = "#" + this.id + "_DateTime",
            $elem = $(select);

        $elem.find("input.input-sm").attr("value", dateTime);

        $elem.datetimepicker('update');
    },
    SetDateTimeByTicks: function (ticks) {
        var select = "#" + this.id + "_DateTime",
            $elem = $(select);
        var type = $(select).data("type");
        var val = $.hoteamDateTime.getDateTimeByTicks(ticks, type);
        $elem.find("input.input-sm").attr("value", val);

        $elem.datetimepicker('update');
    },
    GetTicksByDateTime: function () {
        var select = "#" + this.id + "_DateTime";
        var type = $(select).data("type");
        var val = this.GetDateTime();
        return $.hoteamDateTime.getTicksByDateTime(val, type);
    },
    Dispose: function () {
        var id = this.id + "_DateTime";
        $("#" + id).datetimepicker("remove");
    }
};


{
    (function ($) {
        $.hoteamDateTime = {
            defaults: {
                parentId: null,
                id: null,
                type: "text",
                DateType: "datetime",
                disabled: false,
                callback: {
                    onchange: ''
                }
            },
            create: function (options) {
                //设置日期时间格式
                var dateFmt = "yyyy-mm-dd hh:ii:ss";
                var startView = 2;
                //0:hour view
                //1:day view
                //2:month view
                //3:12-month overview
                //4:10-year overview
                var maxView = options.maxView === undefined ? 4 : options.maxView;
                var minView = options.minView === undefined ? 0 : options.minView;
                if (minView === "1") {
                    dateFmt = "yyyy-mm-dd hh:00:00";
                }
                var todayBtn = true;

                if (options.DateType == "year") {
                    dateFmt = 'yyyy';
                    minView = 4;
                    startView = 4;
                    todayBtn = false;
                } else if (options.DateType == "month") {
                    dateFmt = 'yyyy-mm';
                    minView = 3;
                    startView = 3;
                    todayBtn = false;
                } else if (options.DateType == "date") {
                    dateFmt = 'yyyy-mm-dd';
                    minView = 2;
                } else if (options.DateType == "time") {
                    dateFmt = 'hh:ii:ss';
                    startView = 1;
                    maxView = 1;
                    minView = 0;
                    todayBtn = false;
                }
                var params = {
                    format: dateFmt,
                    language: HoteamUI.Language.CurLanguage,
                    autoclose: true,
                    todayBtn: todayBtn,
                    forceParse: true,
                    startView: startView,
                    maxView: maxView,
                    minView: minView,
                    pickerPosition: "bottom-left"
                };
                var parentDiv = $("#" + options.parentId);
                if (!options.inline) {
                    var divContainer = '<div class="hoteamDateTime" id="' + options.id + '_container"></div>';
                    parentDiv.append(divContainer);
                    if (options.autofit) {
                        parentDiv.css("height", 40);
                    }
                    var dateTime =
                        ['<div id="' + options.id + '" class="input-group date form_datetime" data-link-field="' + options.id + '_input">',
                            '<input class="input-sm" type="text" ', (options.editable === true ? "" : 'readonly'), '>',
                            '<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>',
                            '</div>',
                        '<input type="hidden" id="' + options.id + '_input"/>'
                        ];
                }
                else {
                    params.autoclose = false;
                    var divContainer = '<div class="hoteamDateTime hoteamDateTime-inline" id="' + options.id + '_container"></div>';
                    parentDiv.append(divContainer);
                    if (options.autofit) {
                        parentDiv.css("height", 245);
                    }
                    var dateTime =
                        ['<div id="' + options.id + '" class="input-group date form_datetime" data-link-field="' + options.id + '_input">',
                            '<input class="input-sm" type="hidden" readonly>',
                            '</div>',
                        '<input type="hidden" id="' + options.id + '_input"/>'
                        ];
                }

                parentDiv.find(".hoteamDateTime").append(dateTime.join(""));

                $("#" + options.id).data("params", params);
                $("#" + options.id).data("type", options.DateType).on('changeDate', { e: { "o": options.o }, fun: options.callback.onchange }, function (e) {
                    HoteamUI.Common.ExeFunction(e.data.fun, e.data.e);
                });
                if (!options.disabled) {
                    var ele = $("#" + options.id);
                    ele.datetimepicker(params);
                    if (!options.inline) {
                        ele.append('<span class="hoteamDateTime-close basesprite b-close"></span>');
                    }
                    ele.find("input.input-sm").addClass("datetime-input");
                } else {
                    $("#" + options.id).addClass("hoteamDateTime-disabled");
                }
                this.initHanlder(options.id);
                //添加校验
                var obak = $.extend(false, {}, options);
                obak.id = obak.id + "_container";
                if (obak.regex) {
                    $.hoteamToolTip.create(obak);
                }
                this.resize(options.id, 0);

                //鼠标滚轮事件：隐藏picker
                $(document).on('mousewheel', function (event) {
                    if (ele.hasClass("hoteamDateTime-disabled")) {
                        ele.datetimepicker('remove');
                    } else {
                        ele.datetimepicker('hide');
                    }
                })
            },
            initHanlder: function (id) {
                //控制关闭的显示和隐藏
                $("#" + id).find("input").on({
                    mouseenter: function () {
                        $(this).nextAll(".hoteamDateTime-close").show();
                    },
                    mouseleave: function () {
                        $(this).nextAll(".hoteamDateTime-close").hide();
                    }
                });
                //关闭按钮的控制
                $("#" + id).on({
                    "mouseover": function () {
                        $(this).show();
                    },
                    "click": function () {
                        $(this).prevAll("input").val("");

                    }
                }, ".hoteamDateTime-close");
            },
            getTimezoneTicks: function (timezone) {
                timezone = timezone.replace("+", "").replace("-", "");
                timezone = timezone.split(":");
                var timezoneHours = $.hoteamDateTime.toNumber(timezone[0].toString());
                var timezoneMinutes = $.hoteamDateTime.toNumber(timezone[1].toString());
                var timezoneTicks = (timezoneHours * 60 + timezoneMinutes) * 60 * 1000;
                return timezoneTicks;
            },
            format: function (number) {
                if (number < 10) {
                    number = "0" + number;
                }
                return number;
            },
            toNumber: function (string) {
                if (string && string.indexOf("0") == 0) {
                    return parseInt(string.replace("0", ""));
                }
                return parseInt(string);
            },
            getDateTimeByTicks: function (ticks, type) {
                ticks = parseInt(ticks);
                if (isNaN(ticks) || ticks == 0) { return ""; }
                if (type == 'time') {
                    var second = ticks % 100;
                    if ((second + '').length == 1) second += '0';
                    return parseInt(ticks / 10000) + ':' + (ticks / 100) % 100 + ':' + second;
                }
                var date = new Date();
                ticks = (ticks - 630822816000000000) / 10000 + Date.UTC(2000, 0, 1, 0, 0, 0, 0);
                ticks = ticks + date.getTimezoneOffset() * 60 * 1000;
                var timezone = HoteamUI.TimeZoneManager.TimeZone;
                var sign = timezone.indexOf("+") > -1 ? "+" : "-";
                if (timezone) {
                    timezoneTicks = $.hoteamDateTime.getTimezoneTicks(timezone);
                    if (sign == "+") {
                        ticks = ticks + timezoneTicks;
                    }
                    else if (sign == "-") {
                        ticks = ticks - timezoneTicks;
                    }
                }
                var val;
                date.setTime(ticks);
                var year = $.hoteamDateTime.format(date.getFullYear());
                var month = $.hoteamDateTime.format(date.getMonth() + 1);
                var day = $.hoteamDateTime.format(date.getDate());
                var hours = $.hoteamDateTime.format(date.getHours());
                var minutes = $.hoteamDateTime.format(date.getMinutes());
                var seconds = $.hoteamDateTime.format(date.getSeconds());
                if (type == "datetime") {
                    val = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
                }
                else if (type == "date") {
                    val = year + "-" + month + "-" + day;
                }
                else if (type == "month") {
                    val = year + "-" + month;
                }

                return val;
            },
            getTicksByDateTime: function (datetime, type) {
                if (!type || type === "[TYPE]") {
                    type = "datetime";
                }
                if (!datetime || datetime == "" || datetime == 0) {
                    return null;
                }
                var dateArray;
                var timeArray;
                var year;
                var month;
                var day;
                var hours;
                var minutes;
                var seconds;
                var sign;
                var timezoneTicks = 0;
                var ticks = 0;
                var date = new Date();
                var val;
                if (type == "datetime") {
                    if (datetime.indexOf(":") == -1) {
                        return null;
                    }
                    val = datetime.split(" ");
                    dateArray = val[0].split("-");
                    timeArray = val[1].split(":");
                    year = $.hoteamDateTime.toNumber(dateArray[0]);
                    month = $.hoteamDateTime.toNumber(dateArray[1]) - 1;
                    day = $.hoteamDateTime.toNumber(dateArray[2]);
                    hours = $.hoteamDateTime.toNumber(timeArray[0].toString());
                    minutes = $.hoteamDateTime.toNumber(timeArray[1].toString());
                    seconds = $.hoteamDateTime.toNumber(timeArray[2].toString());
                }
                else if (type == "date") {
                    if (datetime.indexOf("-") == -1) {
                        return null;
                    }
                    dateArray = datetime.split("-");
                    year = parseInt(dateArray[0], 10);
                    month = parseInt(dateArray[1] - 1, 10);
                    day = parseInt(dateArray[2], 10);
                    hours = 0;
                    minutes = 0;
                    seconds = 0;
                }
                else if (type == "month") {
                    if (datetime.indexOf("-") == -1) {
                        return null;
                    }
                    dateArray = datetime.split("-");
                    year = parseInt(dateArray[0], 10);
                    month = parseInt(dateArray[1] - 1, 10);
                    day = 1;
                    hours = 0;
                    minutes = 0;
                    seconds = 0;
                } else if (type == "time") {
                    if (datetime.indexOf(":") == -1) {
                        return null;
                    }
                    timeArray = datetime.split(":");
                    return timeArray[0] + timeArray[1] + timeArray[2];
                }
                ticks = Date.UTC(year, month, day, hours, minutes, seconds, 0);
                var timezone = HoteamUI.TimeZoneManager.TimeZone;
                sign = timezone.indexOf("+") > -1 ? "-" : "+";
                if (timezone) {
                    timezoneTicks = $.hoteamDateTime.getTimezoneTicks(timezone);
                    if (sign == "+") {
                        ticks = ticks + timezoneTicks;
                    }
                    else if (sign == "-") {
                        ticks = ticks - timezoneTicks;
                    }
                }
                ticks = (ticks - Date.UTC(2000, 0, 1, 0, 0, 0, 0)) * 10000 + 630822816000000000;
                return ticks;
            },
            disable: function (id) {
                var ele = $("#" + id);
                ele.datetimepicker("remove");
                ele.find("input.input-sm").removeClass("datetime-input");
                ele.find(".hoteamDateTime-close").remove();
                ele.addClass("hoteamDateTime-disabled");
            },
            enable: function (id) {
                var ele = $("#" + id);
                ele.datetimepicker($("#" + id).data("params"));
                ele.find("input.input-sm").addClass("datetime-input");
                ele.append('<span class="hoteamDateTime-close basesprite b-close"></span>');
                ele.removeClass("hoteamDateTime-disabled");
            },
            resize: function (id, size) {
                var dateTime = $("#" + id);
                var parentWidth = dateTime.parent().width();
                dateTime.css("width", parentWidth - size);
                dateTime.find("input").css("width", parentWidth - size - 28);
            },
            check: function (value) {
                var result = true;
                if (value) {
                    result = moment(value).isValid();
                }
                return result;
            }
        }
    })(jQuery);
}
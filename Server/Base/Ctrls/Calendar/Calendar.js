HoteamUI.Control.OCalendar = {
    Create: function (options) {
        options = options || {};
        var self = this;
        var id = self.id + "_Calendar";
        var CtrlOptions = (options.ControlInfo || self.ControlInfo()).CtrlOptions;

        var o = $.extend(true, {}, $.hoteamButton.defaults, CtrlOptions);

        o.id = id;
        o.language = HoteamUI.Language.CurLanguage;

        //事件参数
        var handlers = (options.controlInfo || this.ControlInfo()).PageHandlers;
        o.event = {};
        o.event.hoteamCtrl = this;

        $.each(handlers, function (index, val) {
            if (val.HandlerName == "OnLoad") {
                o.callback.onload = self.GetEventFunctionName("OnLoad");
            }
        });

        var container = $('#' + self.id).append('<div id="' + id + '"></div>');

        var calendar;

        setTimeout(function () {
            calendar = new Calendar({
                id: id,
                events: function (start, end) {

                    var callback = o.callback.onload,
                        self = o.event.hoteamCtrl;
                    if (typeof window[callback] === 'function') {
                        return window[callback]({
                            o: self,
                            start: start,
                            end: end
                        })
                    }
                    return null;
                },
                height: container.parent().height() - 12
            });
            container.data('calendar', calendar);
            calendar.create();
        }, 200);

    },
    Resize: function () {
    },
    UpdateEvents: function (callback) {
        calendar = $('#' + this.id).data("calendar");
        calendar.updateEvents(callback);
    }
};

/*! fullcalendar plug
 * Includes: jquery.js, moment.js, fullcalendar.js
 * Copyright huangqing; Licensed MIT */
(function ($, window, moment) {

    //基于 fullcalendar 的 日历对象
    function Calendar(options) {
        this.opt = options;
        this.events = options.events;
        this.localeCode = options.localeCode || 'zh-cn';
        this.defaultData = moment().format();

        this.calendar = $('#' + options.id);
    }

    //初始化日历对象
    Calendar.prototype.create = function () {
        var opt = this.opt,
            calendar = this.calendar,
            self = this;

        calendar.fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                //此处根据8.1的需求将agendaWeek更改为basicWeek,agendaDay更改为basicDay
                right: 'month,basicWeek,basicDay,listMonth'
            },
            defaultDate: this.defaultDate,
            height: opt.height || null,
            locale: this.localeCode,
            //兼容2.x.x版本
            lang: this.localeCode,
            //buttonIcons: true, // show the prev/next text
            weekNumbers: true,
            navLinks: true, // can click day/week names to navigate views
            editable: false,
            eventLimit: true, // allow "more" link when too many events
            events: function (start, end, timezone, callback) {
                if (typeof self.events === 'function') {
                    start = moment(start._d).utc().format('YYYY-MM-DD HH:mm:ss');
                    end = moment(end._d).utc().format('YYYY-MM-DD HH:mm:ss');
                    var events = self.events(start, end);
                    callback(events);
                }
            },
            eventRender: function (event, element) {
                element.attr('title',event.title);
            }
        });
    }

    Calendar.prototype.locale = function (localeCode) {
        var localeCode = localeCode || 'zh-cn';
        this.opt.localeCode = localeCode;
        this.calendar.fullCalendar('option', 'locale', localeCode);
    }

    Calendar.prototype.updateEvents = function (callback) {

        if (typeof callback !== 'function') {
            console.warn('updateEvents callback is not a function!');
            return;
        }

        this.events = callback;
        this.calendar.fullCalendar('removeEvents');
        this.calendar.fullCalendar('refetchEvents');
    }
    window.Calendar = Calendar;

}(jQuery, window, moment));



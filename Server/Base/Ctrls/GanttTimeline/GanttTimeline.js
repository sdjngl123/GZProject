HoteamUI.Control.OGanttTimeline = {
    Create: function (options) {
        options = options || {};
        var self = this;
        var id = self.id + "_GanttTimeline";
        var CtrlOptions = (options.ControlInfo || self.ControlInfo()).CtrlOptions;

        var o = $.extend(true, {}, $.hoteamButton.defaults, CtrlOptions);

        o.id = id;
        o.language = HoteamUI.Language.CurLanguage;
        if (o.language === 'zhs') {
            o.language = 'zh-cn';
        }

        //事件参数
        var handlers = (options.controlInfo || this.ControlInfo()).PageHandlers;
        o.event = {};
        o.event.hoteamCtrl = this;

        $.each(handlers, function (index, val) {
            if (val.HandlerName == "OnLoad") {
                o.callback.onload = self.GetEventFunctionName("OnLoad");
            }
            if (val.HandlerName == "OnEventChange") {
                o.callback.oneventchange = self.GetEventFunctionName("OnEventChange");
            }
        });

        var container = $('#' + self.id).append('<div id="' + id + '"></div>');
        var elem = $('#' + id);

        var ganttTimeline;


        var data = {
            now: '',
            resourceLabelText: '',
            resources: '',
            events: ''
        };

        var fn = o.callback.onload;
        if (typeof window[fn] === 'function') {
            data = window[fn]({
                o: o.event.hoteamCtrl
            })
        }

        var ganttTimeline = new GanttTimeline($('#' + id), {
            now: data.now || '',
            right: data.right,
            resourceColumns: data.resourceColumns || '',
            defaultView: data.defaultView || "timelineYear",
            resourceLabelText: data.resourceLabelText || '',
            resources: data.resources || [],
            resourceColumns: data.resourceColumns || '',
            events: data.events || [],
            editable: data.editable,
            locale: o.language || 'zh-cn',
            eventChange: function (event) {
                var fn = o.callback.oneventchange;
                if (typeof window[fn] === 'function') {
                    window[fn]({
                        o: o.event.hoteamCtrl,
                        event: event
                    })
                }
            },
            height: elem.parent().height() - 12
        });

        elem.data('ganttTimeline', ganttTimeline);
        elem.data('opt', o);
    },
    LoadData: function (events) {
        var ganttTimeline = $('#' + this.GetId()).data("ganttTimeline");
        ganttTimeline.addEventSource(events);
    },
    Reinit: function (data) {
        var elem = $('#' + this.GetId()),
            ganttTimeline = elem.data("ganttTimeline"),
            o = $('#' + this.GetId()).data("opt");

        ganttTimeline.destroy();

        var ganttTimeline = new GanttTimeline(elem, {
            now: data.now || '',
            right: data.right || '',
            resourceColumns: data.resourceColumns || '',
            defaultView: data.defaultView || "timelineYear",
            resourceLabelText: data.resourceLabelText || '',
            resources: data.resources || [],
            events: data.events || [],
            editable: data.editable || '',
            locale: o.language || 'zh-cn',
            eventChange: function (event) {
                var fn = o.callback.oneventchange;
                if (typeof window[fn] === 'function') {
                    window[fn]({
                        o: o.event.hoteamCtrl,
                        event: event
                    })
                }
            },
            height: elem.parent().height() - 12
        });

        elem.data('ganttTimeline', ganttTimeline);
    },
    Resize: function () {
        var elem = $('#' + this.GetId());
        var ganttTimeline = elem.data("ganttTimeline");
        var height = elem.parent().height();

        ganttTimeline.resize(height);
    },
    UpdateEvents: function (event) {
        var ganttTimeline = $('#' + this.GetId()).data("ganttTimeline");
        ganttTimeline.updateEvent(event);
    },
    GetId: function () {
        return this.id + "_GanttTimeline";
    }
};


(function ($, window) {

    function GanttTimeline($elem, options) {
        var _options,
          self = this;

        _options = {
            resourceLabelText: options.resourceLabelText || '',
            resources: options.resources || null,
            events: options.events || null,
            resourceColumns: options.resourceColumns || '',
            locale: options.locale || 'zh-cn',
            height: options.height || null,
            resourceAreaWidth: 200,
            schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives', //license
            editable: options.editable || true, // enable draggable events
            eventResourceEditable: false, // Determines whether the user can drag events between resources.
            aspectRatio: 1.8,
            scrollTime: '00:00', // undo default 6am scrollTime
            header: {
                left: 'today prev,next',
                center: 'title',
                right: options.right || ''
            },
            defaultView: 'timelineYear', //指定视图
            eventResize: function (event, delta, revertFunc) {
                self.eventChange.call(self, event, options.eventChange);
            },
            eventDrop: function (event, delta, revertFunc) {
                self.eventChange.call(self, event, options.eventChange);
            },
            eventRender: function (eventObj, $el) {
                $el.attr('title', eventObj.description || '');
                //添加子任务
                addChildrenTask(eventObj, $el);
            },
        };

        //判断视图显示模式切换按钮指定视图
        if (_options.header.right !== '') {
            _options.defaultView = options.defaultView;
            _options.views = {
                timelineYears: {
                    type: 'timeline',
                    duration: { year: 10 }
                }
            }
        }
        if (options.now) {
            _options.now = options.now;
        }
        this.options = _options;
        this.elem = $elem;

        this.init();
        this.loaction();
    }

    //执行切换试图方法
    function addChildrenTask(event, $el) {
        var tableNowYear = $(".fc-center h2").html();
        if (tableNowYear.indexOf("–") != -1) {
            addChildrenTaskAsNYear(event, $el)
        } else {
            addChildrenTaskAsYear(event, $el);
        }
    }

    //添加第四级子任务,年为单位
    function addChildrenTaskAsYear(event, $el) {
        var tableNowYear = $(".fc-center h2").html();
        var start = event.start._i, end;
        if (event.end == null) {
            end = start;
        } else {
            end = event.end._i
        }
        var dateDays, floatHtml = '', elHtml;
        dateDays = getDaysFromDate(start, end);
        if (event.children && event.children.length > 0) {
            var children = event.children;
            var handleChildren = sameDateData(children);
            for (var j = 0; j < handleChildren.length; j++) {
                for (var i = 0, len = handleChildren[j].length; i < len; i++) {
                    var childDateDays = getDaysFromDate(handleChildren[j][i].start);
                    if (handleChildren[j][i].start.slice(0, 4) == tableNowYear && start.slice(0, 4) != tableNowYear && end.slice(0, 4) == tableNowYear) {
                        var thisTearFirstDay = getFirstDatOnThisYear(tableNowYear);
                        dateDays = getDaysFromDate(thisTearFirstDay, end);
                        childDateDays = getDaysFromDate(thisTearFirstDay, handleChildren[j][i].start);
                        var childPositionLeft = childDateDays / dateDays * 100 + "%";
                        var stylePosition = "left:" + childPositionLeft;
                        var styleMagin = "margin-left:" + i * 7 + "px";
                        floatHtml += '<div style="width:' + (100 / dateDays) + '%;' + stylePosition + ';' + styleMagin + '" class="tipBox"><p class="tipText">&nbsp;</p><img alt="" title="' + handleChildren[j][i].text + '" class="tipImg" src="../../../Base/Image/Gantt/childrentask/mark_red.png"></div>';;
                    } else if (handleChildren[j][i].start.slice(0, 4) == tableNowYear && start.slice(0, 4) == tableNowYear && end.slice(0, 4) != tableNowYear) {
                        var thisTearLastDay = getLastDatOnThisYear(tableNowYear);
                        childDateDays = getDaysFromDate(start, handleChildren[j][i].start);
                        dateDays = getDaysFromDate(start, thisTearLastDay);
                        var childPositionLeft = childDateDays / dateDays;
                        childPositionLeft = (childPositionLeft - (childPositionLeft / dateDays)) * 100 + "%";
                        var stylePosition = "left:" + childPositionLeft;
                        var styleMagin = "margin-left:" + i * 7 + "px";
                        floatHtml += '<div style="width:' + (100 / dateDays) + '%;' + stylePosition + ';' + styleMagin + '" class="tipBox"><p class="tipText">&nbsp;</p><img alt="" title="' + handleChildren[j][i].text + '" class="tipImg" src="../../../Base/Image/Gantt/childrentask/mark_red.png"></div>';;
                    } else if (handleChildren[j][i].start.slice(0, 4) == tableNowYear && start.slice(0, 4) != tableNowYear && end.slice(0, 4) != tableNowYear) {
                        var thisTearFirstDay = getFirstDatOnThisYear(tableNowYear);
                        var thisTearLastDay = getLastDatOnThisYear(tableNowYear);
                        childDateDays = getDaysFromDate(thisTearFirstDay, handleChildren[j][i].start);
                        dateDays = getDaysFromDate(thisTearFirstDay, thisTearLastDay) + 1;
                        var childPositionLeft = childDateDays / dateDays * 100 + "%";
                        var stylePosition = "left:" + childPositionLeft;
                        var styleMagin = "margin-left:" + i * 7 + "px";
                        floatHtml += '<div style="width:' + (100 / dateDays) + '%;' + stylePosition + ';' + styleMagin + '" class="tipBox"><p class="tipText">&nbsp;</p><img alt="" title="' + handleChildren[j][i].text + '" class="tipImg" src="../../../Base/Image/Gantt/childrentask/mark_red.png"></div>';;
                    } else if (handleChildren[j][i].start.slice(0, 4) == tableNowYear) {
                        var childPositionLeft = childDateDays / dateDays;
                        childPositionLeft = (childPositionLeft - (childPositionLeft / dateDays)) * 100 + "%";
                        var stylePosition = "left:" + childPositionLeft;
                        var styleMagin = "margin-left:" + i * 7 + "px";
                        floatHtml += '<div style="width:' + (100 / dateDays) + '%;' + stylePosition + ';' + styleMagin + '" class="tipBox"><p class="tipText">&nbsp;</p><img alt="" title="' + handleChildren[j][i].text + '" class="tipImg" src="../../../Base/Image/Gantt/childrentask/mark_red.png"></div>';;
                    }
                }
            }
            $el.append(floatHtml).css("marginTop", "25px");
        }

    };

    //添加第四级子任务,N年为单位
    function addChildrenTaskAsNYear(event, $el) {
        var start = event.start._i, end;
        if (event.end == null) {
            end = start;
        } else {
            end = event.end._i
        }
        var allYearArr = getAllYearsBewteenDate($(".fc-header-toolbar .fc-center h2").html());
        var dateMonths, floatHtml = '', elHtml;
        var dateMonths = getMonthsFromDate(start, end);
        if (dateMonths == 0) {
            dateMonths = 1;
        }
        if (event.children && event.children.length > 0) {
            var children = event.children;
            var handleChildren = sameMonthData(children);
            for (var j = 0; j < handleChildren.length; j++) {
                for (var i = 0, len = handleChildren[j].length; i < len; i++) {
                    if (allYearArr.indexOf(parseInt(handleChildren[j][i].start.slice(0, 4))) != -1 && allYearArr.indexOf(parseInt(start.slice(0, 4))) == -1 && allYearArr.indexOf(parseInt(end.slice(0, 4))) != -1) {
                        var thisTearFirstMonth = getFirstDatOnThisYear(allYearArr[0]);
                        dateMonths = getMonthsFromDate(thisTearFirstMonth, end);
                        var childDateMonths = getMonthsFromDate(thisTearFirstMonth, handleChildren[j][i].start);
                        var childPositionLeft = childDateMonths / dateMonths;
                        childPositionLeft = (childPositionLeft - (childPositionLeft / dateMonths)) * 100 + "%";
                        var stylePosition = "left:" + childPositionLeft;
                        var styleMagin = "margin-left:" + i * 7 + "px";
                        floatHtml += '<div style="width:' + (100 / dateMonths) + '%;' + stylePosition + ';' + styleMagin + '" class="tipBox"><p class="tipText">&nbsp;</p><img alt="" title="' + handleChildren[j][i].text + '" class="tipImg" src="../../../Base/Image/Gantt/childrentask/mark_red.png"></div>';
                    } else if (allYearArr.indexOf(parseInt(handleChildren[j][i].start.slice(0, 4))) != -1 && allYearArr.indexOf(parseInt(start.slice(0, 4))) != -1 && allYearArr.indexOf(parseInt(end.slice(0, 4))) == -1) {
                        var thisTearLastMonth = getLastDatOnThisYear(allYearArr[allYearArr.length - 1]);
                        dateMonths = getMonthsFromDate(start, thisTearLastMonth);
                        var childDateMonths = getMonthsFromDate(start, handleChildren[j][i].start);
                        var childPositionLeft = childDateMonths / dateMonths;
                        childPositionLeft = (childPositionLeft - (childPositionLeft / dateMonths)) * 100 + "%";
                        var stylePosition = "left:" + childPositionLeft;
                        var styleMagin = "margin-left:" + i * 7 + "px";
                        floatHtml += '<div style="width:' + (100 / dateMonths) + '%;' + stylePosition + ';' + styleMagin + '" class="tipBox"><p class="tipText">&nbsp;</p><img alt="" title="' + handleChildren[j][i].text + '" class="tipImg" src="../../../Base/Image/Gantt/childrentask/mark_red.png"></div>';
                    } else if (allYearArr.indexOf(parseInt(handleChildren[j][i].start.slice(0, 4))) != -1) {
                        var childDateMonths = getMonthsFromDate(start, handleChildren[j][i].start);
                        var childPositionLeft = childDateMonths / dateMonths;
                        childPositionLeft = (childPositionLeft - (childPositionLeft / dateMonths)) * 100 + "%";
                        var stylePosition = "left:" + childPositionLeft;
                        var styleMagin = "margin-left:" + i * 7 + "px";
                        floatHtml += '<div style="width:' + (100 / dateMonths) + '%;' + stylePosition + ';' + styleMagin + '" class="tipBox"><p class="tipText">&nbsp;</p><img alt="" title="' + handleChildren[j][i].text + '" class="tipImg" src="../../../Base/Image/Gantt/childrentask/mark_red.png"></div>';
                    }
                }
            }
            $el.append(floatHtml).css("marginTop", "25px");
        }
    };

    //返回两个年份之间的所有年份
    function getAllYearsBewteenDate(dateStr) {
        var dateArr = dateStr.split(" – ");
        var value = parseInt(dateArr[1]) - parseInt(dateArr[0]);
        var resultArr = [];
        for (var i = 0; i <= value; i++) {
            resultArr.push(parseInt(dateArr[0]) + i);
        }
        return resultArr;
    }

    //处理数据把同一天的放到一起
    function sameDateData(arrData) {
        var tmp = [];
        var resultData = [];
        for (var i = 0; i < arrData.length; i++) {
            tmp.push(arrData[i].start)
            tmp = uniq(tmp);
        }
        for (var j = 0; j < tmp.length; j++) {
            var arr = [];
            for (var p = 0; p < arrData.length; p++) {
                if (arrData[p].start == tmp[j]) {
                    arr.push(arrData[p]);
                }
            }
            resultData.push(arr);
        }
        return resultData
    }

    //处理数据把同一个月的放到一起
    function sameMonthData(arrData) {
        var tmp = [];
        var resultData = [];
        for (var i = 0; i < arrData.length; i++) {
            tmp.push(arrData[i].start.slice(0, 7))
            tmp = uniq(tmp);
        }
        for (var j = 0; j < tmp.length; j++) {
            var arr = [];
            for (var p = 0; p < arrData.length; p++) {
                if (arrData[p].start.slice(0, 7) == tmp[j]) {
                    arr.push(arrData[p]);
                }
            }
            resultData.push(arr);
        }
        return resultData
    }

    //数组去重
    function uniq(array) {
        var temp = [];
        for (var i = 0; i < array.length; i++) {
            if (temp.indexOf(array[i]) == -1) {
                temp.push(array[i]);
            }
        }
        return temp;
    }

    //返回当年的1月1日日期
    function getFirstDatOnThisYear(year) {
        return year + "-01-01";
    }

    //返回当年的12月31日日期
    function getLastDatOnThisYear(year) {
        return year + "-12-31";
    }

    //获取两个日期之间的天数
    function getDaysFromDate(start, end) {
        var start = start;
        var end = end;
        if (end == null) {
            return 0;
        }
        var dateSpan, tempDate, iDays;
        sDate1 = Date.parse(start);
        sDate2 = Date.parse(end);
        dateSpan = sDate2 - sDate1;
        dateSpan = Math.abs(dateSpan);
        iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
        if (start != end && iDays == 0) {
            return 1;
        }
        return iDays
    };

    //获取两个日期之间相差几个月
    function getMonthsFromDate(startDate, endDate) {
        var startDate = new Date(startDate);
        var endDate = new Date(endDate);
        var startMonth = startDate.getMonth();
        var endMonth = endDate.getMonth();
        var intervalMonth = (endDate.getFullYear() * 12 + endMonth) - (startDate.getFullYear() * 12 + startMonth);
        return intervalMonth;
    };





    GanttTimeline.prototype.init = function () {
        this.elem.fullCalendar(this.options);
    }

    GanttTimeline.prototype.destroy = function () {
        this.elem.fullCalendar('destroy');
    }

    GanttTimeline.prototype.eventChange = function (event, callback) {
        var _event;

        if (callback && typeof callback === 'function') {
            _event = this.getEvent(event);
            //console.dir(_event);
            callback(_event);
        }
    }

    GanttTimeline.prototype.getEvent = function (event) {
        return {
            id: event.id,
            resourceId: event.resourceId,
            start: event.start.format('YYYY-MM-DD'),
            end: event.end.format('YYYY-MM-DD'),
            title: event.title
            //backgroundColor: event.backgroundColor,
            //borderColor: event.borderColor
        };
    }

    GanttTimeline.prototype.setEvent = function (newEvent) {
        var id = newEvent.id || '',
          elem = this.elem,
          event;

        if (!id) {
            return null;
        }

        event = elem.fullCalendar('clientEvents', [id]);
        event = event[0];
        $.extend(event, newEvent);

        return event;
    }

    GanttTimeline.prototype.updateEvent = function (newEvent) {
        var event = this.setEvent(newEvent);
        this.elem.fullCalendar('updateEvent', event);
    }

    GanttTimeline.prototype.addEventSource = function (events) {
        this.elem.fullCalendar('addEventSource', events);
        this.loaction();
    }

    GanttTimeline.prototype.removeEvents = function (events) {
        this.elem.fullCalendar('removeEvents', events);
    }

    GanttTimeline.prototype.resize = function (height) {
        this.elem.fullCalendar('option', 'height', height);
    }

    GanttTimeline.prototype.loaction = function () {
        if (!this.options.now) {
            return;
        }

        var elem = this.elem.find('.fc-time-area.fc-widget-content .fc-scroller'),
          scrollWidth = elem[0].scrollWidth,
          range = scrollWidth / 12,
          date = new Date(this.options.now),
          month = date.getMonth() + 1,
          day = date.getDate(),
          left = range * (month - 1) + range * ((day - 3) / 30);

        elem.scrollLeft(left);
    }

    window.GanttTimeline = GanttTimeline;

})(jQuery, window);


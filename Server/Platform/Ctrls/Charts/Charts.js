HoteamUI.Control.OCharts = {
    Create: function (options) {

        options = options || {};
        var self = this;
        var id = this.id;
        var handlers = (options.controlInfo || this.ControlInfo()).PageHandlers;
        var o = {};
        var ctrlEvent = {};
        var callback = {};
        ctrlEvent.o = HoteamUI.Control.Instance(id);

        $.each(handlers, function (index, val) {
            if (val.HandlerName == "OnLoadData") {
                HoteamUI.Common.ExeFunction(self.GetEventFunctionName("OnLoadData"), ctrlEvent);
            }
            else if (val.HandlerName == "OnClick") {
                callback.click = self.GetEventFunctionName("OnClick");
            }
        });

        var ctrl = $("#" + this.id).data('callback', callback);
        //25531 李金岳
        //ctrl.height(ctrl.parent().height());
        setTimeout(HoteamUI.Control.OCharts.Resize,200)
    },
    /*
    data:平台Charts数据
    options:显示控制信息，包括：
        dataZoom:true 默认false
        tooltip：false 默认true
        xAxisLabelTilt:true x轴坐标文字是否倾斜 默认false
        xAxisLabelLength:10 x轴坐标显示的最大字数 默认10
        bottom 图表到底部的距离
        left 图表到左边的距离
        yAxisLabelUnit y轴坐标文字单位
        TooltipFormatter:饼:{a}系列名称 {b}数据项名称 {c}数值 {d}(百分比) 例："{c}({d}%)"
        canSave:true 是否显示保存为图片的按钮 默认fasle
        tooltipTrigger:axis 提示框触发类型，柱状图默认按坐标轴触发（axis）,可选择按数据项触发（item）
    */
    LoadData: function (data, options) {
        //获取原始data 并保存到另一个变量
        var rawData = this.CloneObj(data);
        var self = this,
            container = $("#" + this.id),
            chart,
            type = data.type || data.Type || "bar",
            ChartItemColorList = data.ChartItemColorList,
            legendColor = {},
            fn,
            callback = $("#" + this.id).data('callback'),
            opt = {};

        chart = echarts.init(document.getElementById(self.id), {}, {});

        if (ChartItemColorList && ChartItemColorList.length > 0) {
            for (var i = 0, len = ChartItemColorList.length; i < len; i++) {
                var item = ChartItemColorList[i];
                legendColor[item.ColValue] = item.Color;
            }
        }

        if (options && options.canSave) {
            opt.toolbox = {
                show: true,
                feature: {
                    saveAsImage: { show: true }
                }
            };
        }

        switch (type) {
            case "bar":
                self.LoadDataByBar(chart, data, legendColor, options, opt, "bar");
                break;
            case "verticalstackedbar"://纵向层叠图
                self.LoadDataByBar(chart, data, legendColor, options, opt, "verticalstackedbar");
                break;
            case "stackedbar"://横向层叠图
                self.LoadDataByStackedBar(chart, data, legendColor, options, opt);
                break;
            case "line":
                self.LoadDataByBar(chart, data, legendColor, options, opt, "line");
                break;
            case "area":
                self.LoadDataByBar(chart, data, legendColor, options, opt, "area");
                break;
            case "pie":
                self.LoadDateByPie(chart, data, legendColor, options, opt);
                break;
            default:
                break;
        }

        if (type.indexOf("$") > 0) {
            self.LoadDateByMultiType(chart, data, legendColor, options, opt);
        }

        container.data('chart', chart);

        //var fn = callback.click;

        if (callback && callback.click) {
            fn = callback.click;
            chart.on('click', function (params) {
                console.log("111");
                var name = params.name,
                    value = params.value,
                    data = params.data;
                HoteamUI.Common.ExeFunction(fn, {
                    o: self,
                    name: name,
                    value: value,
                    data: data,
                    //增加一个param参数原始数据rawData
                    params: {
                        params:params,
                        rawData: rawData
                    }
                });

            });
        }
    },
    //深度复制对象方法
    CloneObj: function (obj) {
        var str, newobj = obj.constructor === Array ? [] : {};
        if (typeof obj !== 'object') {
            return;
        } else if (window.JSON) {
            str = JSON.stringify(obj),
            newobj = JSON.parse(str);
        } else {
            for (var i in obj) {
                newobj[i] = typeof obj[i] === 'object' ? this.CloneObj(obj[i]) : obj[i];
            }
        }
        return newobj;
    },
    LoadDateByMultiType: function (chart, data, legendColorSetting, options,baseOpt) {
        if (!data.Groups) {
            return;
        }

        var opt = {
            grid: {
                x: 60,
                y: 90,
                y2: 50,
                x2: 40
            },
            xAxis: [{
                type: 'category',
                data: [],
                axisLabel: {},
                axisTick: { show: false }
            }],
            yAxis: [],
            color: ['#63b2ee', '#2ec7c9', '#f89588', '#f8cb7f', '#76da91', '#6c93d4'],
            title: {
                text: '',
                subtext: '',
                left: 'center'
            },
            tooltip: {
                show: (options && options.tooltip) === false ? false : true,
                showDelay: 80,
                formatter: {}
            },
            legend: {
                data: [],
                tooltip: {
                    show: false
                },
                selected: {},
                x: "20"
            },
            calculable: false,
            series: [],
            //去除动画
            noDataLoadingOption: {
                text: HoteamUI.Language.Lang("Platform", "NoData"),
                effect: "bubble",
                effectOption: {
                    effect: {
                        n: 0
                    }
                }
            }
        };
        opt = $.extend({}, baseOpt, opt);

        if (options && options.xAxisLabelTilt === true) {
            var xAxisLabelLength = 8;
            if (options && options.xAxisLabelLength > 0) {
                xAxisLabelLength = options.xAxisLabelLength;
            }
            opt.xAxis[0].axisLabel = {
                rotate: 45,
                interval: 'auto',
                formatter: function (value) {
                    if (value.length > xAxisLabelLength) {
                        value = value.substring(0, xAxisLabelLength) + "...";
                    }
                    return value;
                }
            }
            opt.grid.y2 = 90;
        }
        if (options && options.left > 0) {
            opt.grid.x = options.left;
        }
        if (options && options.bottom > 0) {
            opt.grid.y2 = options.bottom;
        }
        if (options && options.top > 0) {
            opt.grid.y = options.top;
        }
        if (options && options.right > 0) {
            opt.grid.x2 = options.right;
        }
        //标题
        opt.title.text = HoteamUI.Language.Lang(data.Title);
        if (opt.title.text) {
            opt.legend.y = 30;
        }

        //dataZoom
        if (options && options.dataZoom === true) {
            opt.dataZoom = {
                show: true,
                start: 0,
                end: 10
            }
        }

        var yitme = {
            type: 'value',
            axisLabel: {}
        };

        var yunit = [];
        if (options && !HoteamUI.Common.IsNullOrEmpty(options.yAxisLabelUnit)) {
            yunit = options.yAxisLabelUnit.split("$");
        }
        
        var result = GetMutiData(data, legendColorSetting);
        for (var m = 0; m < result.length; m++){
            opt.yAxis.push($.extend(true,{},yitme));
            if (yunit.length > 0) {
                opt.yAxis[m].axisLabel.formatter = "{value}" + yunit[m];
            }
            var serieType = result[m].Type;
            var group = result[m].seriesData.group;
            var t = 0;
            for (var key in group) {
                opt.legend.data.push(key);
                opt.series.push({
                    name: key,
                    type: serieType,
                    data: group[key],
                    barMaxWidth: 30,
                    itemStyle: { normal: {} },
                    yAxisIndex:m
                });
                if (serieType == "area") {
                    opt.series[t].itemStyle.normal.areaStyle = {};
                    opt.series[t].itemStyle.normal.areaStyle.type = "default";
                }
                t++;
            }
        }
       
        opt.xAxis[0].data = result[0].seriesData.xAxis;
        //判断两个图表时，是否显示右侧Y坐标
        if (options.showRightCoordinate && options.showRightCoordinate == "false") {
            opt = this.isShowRightCoordinate(opt);
        }

        $.each(opt.series, function (i, e) {
            if(e.type=="bar"){
                e.stack = "count"; 
            }
        });
            
        var color = result[0].color;
        if (color && color.length) {
            opt.color = color;
        }
        //没有数据时，显示暂无数据
        if (opt.series.length === 0) {
            opt.series.push({
                name: 'nodata',
                type: serieType,
                data: [],
                barMaxWidth: 30
            });
        }
        //置灰数据为0的图例
        var seriesData = opt.series;
        for (var len = seriesData.length, n = len - 1; n >= 0; n--) {
            var item = seriesData[n],
                data = item.data,
                name = item.name,
                isEmptyData = true;
            for (var j = 0, jLen = data.length; j < jLen; j++) {
                if (data[j] !== 0) {
                    isEmptyData = false;
                    break;
                }
            }
            if (isEmptyData) {
                opt.legend.selected[name] = false;
            }
        }

        chart.setOption(opt, true);
    },
    //是否展示右侧坐标系
    isShowRightCoordinate: function (opt) {
        var opt = opt;
        var yAxisArr = opt.yAxis;
        //获取series里面所有data的最大值 maxNumArr
        var maxNumArr = [];
        if (opt.series.length > 0) {
            for (var i = 0; i < opt.series.length; i++) {
                for (var j = 0; j < opt.series[i].data.length; j++) {
                    maxNumArr.push(opt.series[i].data[j]);
                }
            }
        }
        var max = maxNumArr[0];
        for (var i = 0; i < maxNumArr.length - 1; i++) {
            max = max < maxNumArr[i + 1] ? maxNumArr[i + 1] : max;
        }
        opt.yAxis[1].show = false;
        for (var i = 0; i < opt.yAxis.length; i++) {
            opt.yAxis[i].max = max;
        }
        return opt;

    },
    LoadDataByBar: function (chart, data, legendColorSetting, options, baseOpt, chartType) {
        if (!data.Groups) {
            return;
        }

        var opt = {
            grid: {
                x: 60,
                y: 90,
                y2: 50,
                x2: 40
            },
            xAxis: [{
                type: 'category',
                data: [],
                axisLabel: {
                    //interval:0
                },
                axisTick: {
                    show: false
                }
            }],
            yAxis: [
                {
                    type: 'value',
                    minInterval: 1,
                    //min: 0,
                    axisLabel: {}
                }
            ]
        };
        if (data.YMax) {
            opt.yAxis[0].max = data.YMax;
        }
        if (data.YMin) {
            opt.yAxis[0].min = data.YMin;
        }
        if (data.YRange) {
            opt.yAxis[0].splitNumber = data.YRange;
        }

        //20462 李金岳
        //GridX:左上横向宽度,默认：60， GridY:左上纵向宽度，默认：90
        //GridX2:右下横向宽度，默认：40， GridY2:右下纵向宽度，默认：50
        if (data.GridX) {
            opt.grid.x =Number(data.GridX);
        }
        if (data.GridY) {
            opt.grid.y = Number(data.GridY);
        }
        if (data.GridX2) {
            opt.grid.x2 = Number(data.GridX2);
        }
        if (data.GridY2) {
            opt.grid.y2 = Number(data.GridY2);
        }


        var trigger = "axis";
        if (options && options.tooltipTrigger) {
            trigger = options.tooltipTrigger;
        }
        //防止边缘的tooltip闪烁
        opt.tooltip = {
            //showDelay: 80,
            trigger: trigger,
            axisPointer: {
                type: "none"
            }
        };
        opt = $.extend({}, baseOpt, opt);

        CreatBar(chart, data, legendColorSetting, options, opt, chartType);
    },
    LoadDataByStackedBar: function (chart, data, legendColorSetting, options, baseOpt) {
        if (!data.Groups) {
            return;
        }

        var opt = {
            grid: {
                x: 90,
                y: 60,
                y2: 50,
                x2: 40
            },
            xAxis: [{
                type: 'value',
                minInterval: 1,
                min: 0
            }],
            yAxis: [{
                type: 'category',
                data: [],
                axisTick: {
                    show: false
                }
            }]
        };
        opt = $.extend({}, baseOpt, opt);

        CreatBar(chart, data, legendColorSetting, options, opt, "bar");
    },
    LoadDateByPie: function (chart, data, legendColorSetting, options, baseOpt) {
        if (!data.Groups) {
            return;
        }

        var opt,
            groupArray = data.Groups.split(";"),
            rows = data.Data.Rows || [],
            group = {},
            legend = {},
            legendColorSetting = legendColorSetting,
            colorName = data.ColorName,
            color = [],
            seriesData = [];

        opt = {
            color: ['#63b2ee', '#2ec7c9', '#f89588', '#f8cb7f', '#76da91', '#6c93d4'],
            title: {
                text: '',
                subtext: '',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{d}%",
                show: true
            },
            legend: {
                x: '20',
                data: []
            },
            calculable: false,
            series: [
                {
                    name: '',
                    type: 'pie',
                    radius: ['20%', '55%'],
                    center: ['50%', '60%'],
                    data: [],
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                formatter: '{b}({d}%)'
                            },
                            labelLine: {
                                show: true,
                                length: 2
                            }
                        }
                    }
                }
            ],
            //去除动画
            noDataLoadingOption: {
                text: HoteamUI.Language.Lang("Platform", "NoData"),
                effect: "bubble",
                effectOption: {
                    effect: {
                        n: 0
                    }
                }
            }
        };
        opt = $.extend({}, baseOpt, opt);

        if (options && options.TooltipFormatter) {
            opt.tooltip.formatter = options.TooltipFormatter;
        }

        opt.title.text = HoteamUI.Language.Lang(data.Title);
        if (opt.title.text) {
            opt.legend.y = 30;
        }

        if (rows && rows.length) {
            for (var i = 0, len = rows.length; i < len; i++) {
                var row = rows[i],
                    obj = {};

                for (var j = 0, jLen = row.length; j < jLen; j++) {
                    var item = row[j],
                        name = item["ColName"],
                        text = item["ColText"];

                    obj[name] = text;
                }

                seriesData.push(obj);
            }
        }

        for (var i = 0, len = seriesData.length; i < len; i++) {
            var item = seriesData[i],
                firstLevel = groupArray[0],
                secondLevel = groupArray[1];

            if (!group[item[firstLevel]]) {
                group[item[firstLevel]] = 0;
            }

            group[item[firstLevel]] += parseFloat(item[data.Y]);

            if (colorName && legendColorSetting && item[colorName]) {
                color.push(legendColorSetting[item[colorName]]);
            }
        }

        for (var i in group) {
            opt.legend.data.push(i);
            //值为0时，不显示
            if (group[i] !== 0) {
                opt.series[0].data.push({
                    value: group[i],
                    name: i
                });
            }
        }

        if (color && color.length > 0) {
            opt.color = color;
        }
        chart.setOption(opt);

    },
    Resize: function () {

        var container = $("#" + this.id),
            chart = container.data('chart');

        if (chart) {
            chart.resize();
        }
    },
    Clear: function () {
        var container = $("#" + this.id);
        container.html('');
    }
}
function CreatBar(chart, data, legendColorSetting, options, opt, chartType) {
    if (!data.Groups) {
        return;
    }

    var defaultOpt = {
        color: ['#63b2ee', '#2ec7c9', '#f89588', '#f8cb7f', '#76da91', '#6c93d4'],
        title: {
            text: '',
            subtext: '',
            left: 'center'
        },
        tooltip: {
            show: (options && options.tooltip) === false ? false : true,
            formatter: {}
        },
        legend: {
            data: [],
            tooltip: {
                show: false
            },
            selected: {},
            x: "20"
        },
        calculable: false,
        series: [],
        //去除动画
        noDataLoadingOption: {
            text: HoteamUI.Language.Lang("Platform", "NoData"),
            effect: "bubble",
            effectOption: {
                effect: {
                    n: 0
                }
            }
        }
    };
    opt = $.extend(true, defaultOpt, opt);

    if (options && options.xAxisLabelTilt === true) {
        var xAxisLabelLength = 8;
        if (options && options.xAxisLabelLength > 0) {
            xAxisLabelLength = options.xAxisLabelLength;
        }
        opt.xAxis[0].axisLabel = {
            rotate: 45,
            interval: 'auto',
            formatter: function (value) {
                if (value.length > xAxisLabelLength) {
                    value = value.substring(0, xAxisLabelLength) + "...";
                }
                return value;
            }
        }
        opt.grid.y2 = 90;
    }

    if (options && !HoteamUI.Common.IsNullOrEmpty(options.yAxisLabelUnit)) {
        opt.yAxis[0].axisLabel.formatter = "{value}" + options.yAxisLabelUnit;
        opt.tooltip.formatter = function (params) {
            var tip = params[0].name + "<br/>";
            for (var i = 0, l = params.length; i < l; i++) {
                tip += params[i].seriesName + ":" + params[i].value + options.yAxisLabelUnit + "<br/>"
            }
            return tip;
        }
    }
    if (options && options.left > 0) {
        opt.grid.x = options.left;
    }
    if (options && options.bottom > 0) {
        opt.grid.y2 = options.bottom;
    }
    if (options && options.top > 0) {
        opt.grid.y = options.top;
    }
    if (options && options.right > 0) {
        opt.grid.x2 = options.right;
    }
    //标题
    opt.title.text = HoteamUI.Language.Lang(data.Title);
    if (opt.title.text) {
        opt.legend.y = 30;
    }

    //dataZoom
    if (options && options.dataZoom === true) {
        opt.dataZoom = {
            show: true,
            start: 0,
            end: 10
        }
    }
    var seriesData = [],
        rows = data.Data.Rows || [];
    if (rows && rows.length) {
        for (var i = 0, len = rows.length; i < len; i++) {
            var row = rows[i],
                obj = {};

            for (var j = 0, jLen = row.length; j < jLen; j++) {
                var item = row[j],
                    name = item["ColName"],
                    text = item["ColText"];

                obj[name] = text;
            }
            seriesData.push(obj);
        }
    }
    var result = GetBarData(data, legendColorSetting, seriesData);
    var serieType = chartType;
    if (serieType == "area") {
        serieType = "line";
    } else if (serieType == "verticalstackedbar") {
        serieType = "bar";
    }
    var list = data.ChartItemColorList, lineWidth = {}, lineType = {}, lineSymbol = {};
    if (chartType == "line" && list && list.length > 0) {
        for (var i = 0, len = list.length; i < len; i++) {
            var item = list[i];
            if (item.Width) {
                lineWidth[item.ColValue] = item.Width;
            } else {
                lineWidth[item.ColValue] = 2;
            }
            if (item.Type) {
                lineType[item.ColValue] = item.Type;
            } else {
                lineType[item.ColValue] ="solid";//默认实线，虚线"dotted"
            }

            //23078 李金岳
            if (item.Symbol) {
                lineSymbol[item.ColValue] = item.Symbol;
            }
        }
    }

    var group = result.group;
    var t = 0, isstacked = false;
    for (var i in group) {
        opt.legend.data.push(i);
        opt.series.push({
            name: i,
            type: serieType,
            data: group[i],
            barMaxWidth: 30,
            itemStyle: { normal: {} }
        });
        if (chartType == "area") {
            opt.series[t].itemStyle.normal.areaStyle = {};
            opt.series[t].itemStyle.normal.areaStyle.type = "default";
        }
        if (chartType == "line") {
            opt.series[t].itemStyle.normal.lineStyle = {};

            //20462 李金岳
            opt.series[t].itemStyle.normal.lineStyle.width = lineWidth[i];
            opt.series[t].itemStyle.normal.lineStyle.type = lineType[i];

            //23078 李金岳
            opt.series[t].symbol = lineSymbol[i] ? lineSymbol[i] : "";
        }
        t++;
    }
    if (opt.xAxis[0].data) {
        opt.xAxis[0].data = result.xAxis;
    } else {
        opt.yAxis[0].data = result.xAxis;
        isstacked = true;
    }
    if (chartType == "verticalstackedbar") {
        isstacked = true;
    }
    if (isstacked) {
        $.each(opt.series, function (i, e) { opt.series[i].stack = "count"; });
    }
    var color = result.color;
    if (color && color.length) {
        opt.color = color;
    }
    //没有数据时，显示暂无数据
    if (opt.series.length === 0) {
        opt.series.push({
            name: 'nodata',
            type: serieType,
            data: [],
            barMaxWidth: 30
        });
    }
    //置灰数据为0的图例
    var seriesData = opt.series;
    for (var len = seriesData.length, i = len - 1; i >= 0; i--) {
        var item = seriesData[i],
            data = item.data,
            name = item.name,
            isEmptyData = true;
        for (var j = 0, jLen = data.length; j < jLen; j++) {
            if (data[j] !== 0) {
                isEmptyData = false;
                break;
            }
        }
        if (isEmptyData) {
            opt.legend.selected[name] = false;
        }
    }

    chart.setOption(opt, true);
}

function GetBarData(data, legendColorSetting, seriesData) {
    var tempXAxis = {},
        group = {},
        xAxis = [],
        color = [];
        titleData = data.TitleData,
        colorName = data.ColorName,
        groupArray = data.Groups.split(";");

    for (var i = 0, len = seriesData.length; i < len; i++) {
        var item = seriesData[i],
            xAxisKey = groupArray[0],
            seriesKey = groupArray[1],
            seriesKeyName,
            xItem = [],
            groupItem = [],

            //x轴
            xAxisKey = xAxisKey.split(",");
        for (var j = 0, lenJ = xAxisKey.length; j < lenJ; j++) {
            xItem.push(item[xAxisKey[j]]);
        }
        tempXAxis[xItem.join(data.JoinChar)] = true;

        //分组数据
        if (seriesKey) {
            seriesKey = seriesKey.split(",");
            for (var k = 0, lenK = seriesKey.length; k < lenK; k++) {
                groupItem.push(item[seriesKey[k]]);
                //获取legend颜色
                if (colorName && legendColorSetting && item[colorName]) {
                    color.push(legendColorSetting[item[colorName]]);
                }
            }

            seriesKeyName = groupItem.join(data.JoinChar);

            if (!group[seriesKeyName]) {
                group[seriesKeyName] = [];
            }

            group[seriesKeyName].push(parseFloat(item[data.Y]));
        }
            //标准数据
        else {
            //解析图例
            if (titleData && titleData.length > 0) {

                for (var j = 0, lenJ = titleData.length; j < lenJ; j++) {

                    var titleItem = titleData[j];
                    for (var k = 0, lenK = xAxisKey.length; k < lenK; k++) {
                        if (titleItem.Name === xAxisKey[k]) {
                            xAxisKey[k] = titleItem.Text;
                            break;
                        }
                    }
                }
                xAxisKey = xAxisKey.join(data.JoinChar || "");
            }
            //解析y轴value值
            if (!group[xAxisKey]) {
                group[xAxisKey] = [];
            }
            group[xAxisKey].push(parseFloat(item[data.Y]));
        }
    }

    for (var i in tempXAxis) {
        xAxis.push(i);
    }

    var result = {};
    result.group = group;
    result.xAxis = xAxis,
    result.color = color;
    return result;
}

function GetMutiData(data, legendColorSetting) {
    var seriesData = [],
        result = [],
        rows = data.Data.Rows || [];
    var type = data.Type.split("$");
    var yname = data.Y.split("$");
    var colorName = data.ColorName.split("$");
    var groupArray = data.Groups.split("$");
    if (rows && rows.length) {
        for (var i = 0, len = rows.length; i < len; i++) {
            var row = rows[i],
                obj = {};

            for (var j = 0, jLen = row.length; j < jLen; j++) {
                var item = row[j],
                    name = item["ColName"],
                    text = item["ColText"];

                obj[name] = text;
            }
            seriesData.push(obj);
        }
    }
    for (var n = 0; n < yname.length; n++) {
        var newdata = {}, newSeriesData = [];
        newdata.Type = type[n];
        newdata.Y = yname[n];
        newdata.ColorName = colorName[n];
        newdata.Groups = groupArray[n];
        $.each(seriesData, function (index, value) {
            if (value.ChartType == type[n]) {
                newSeriesData.push(value);
            }
        });
        if (type[n] == "bar" || type[n] == "line" || type[n] == "area") {
            newdata.seriesData = GetBarData(newdata, legendColorSetting, newSeriesData);
        }
        result.push(newdata);
    }
    return result;
}

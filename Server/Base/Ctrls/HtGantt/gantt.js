window._SFGantt_config = {
    SFGlobal: {
        weekStrs: ['SUN', 'MON', 'TUS', 'WEN', 'THU', 'FRI', 'SAT']
    },
    SFData: {
        autoCalculateTime: true,
        ignoreReadOnly: false,
        initComponents: 'SFDataCalculateTimeComponent,SFDataReadOnlyComponent',
        //这里指定那些字段不受只读属性的影响
        taskReadonlyIgnoreProperty: 'Collapse,LineHeight,Selected,Summary',
        resourceReadonlyIgnoreProperty: 'Collapse,LineHeight,Selected',
        linkReadonlyIgnoreProperty: 'LineHeight,Selected',
        assignmentReadonlyIgnoreProperty: 'LineHeight,Selected'
    },
    SFDataProject: {
        saveChange: false
    },
    SFDataXml: {
        saveChange: true
    },
    SFGantt: {
        imgPath: '../../../BASE/gantt/img/',
        listWidth: 200,
        imgType: '.gif',
        headHeight: 36,
        footHeight: 17,
        spaceWidth: 8,
        idCellWidth: 36,
        idCellBgColor: '#F4F4F4',
        listFocusColor: '#DDDDDD',
        itemHeight: 24,
        fontSize: 12,
        bodyBgColor: '#FFFFFF',
        headBgColor: '#F4F4F4',
        borderColor: '#CDCDCD',
        columnBarColor: '#F4F4F4',
        bottomBgColor: '#F4F4F4',
        viewEnlargeHeight: 32,
        viewBufferHeight: 512,
        taskFieldNames: 'StatusIcon,Name,Start,Finish',
        taskIdFieldNames: 'Empty',
        resourceFieldNames: 'StatusIcon,Name',
        resourceIdFieldNames: 'Empty',
        isTracking: false,
        menuText: {
            ZoomIn: 'Zoom in',
            ZoomOut: 'Zoom out',
            FocusIntoView: 'Focus',
            AddTask: 'Add task',
            DeleteTask: 'Delete task',
            AddTasksLinks: 'Add link',
            RemoveTasksLinks: 'Remove link',
            UpgradeTask: 'Upgrade task',
            DegradeTask: 'Degrade task',
            Print: 'Print',
            CopyTask: 'Copy Task',
            PasteTask: 'Paste Task',
            ShowChart: 'Show Chart',
            HideChart: 'Hide Chart',
            ShowList: 'Show list',
            HideList: 'Hide list',
            Help: 'Help',
            About: 'About SFGantt'
        },
        showScroller: true,
        disableMapDrag: true,
        noticeDelete: 'Do you want to delete the selected tasks? Note: All the subtasks will be deleted! ',
        noticeReadonly: 'one or more read-only tasks Selected , your operation can not be completed!',
        taskStyle: {
            TaskNormal: {
                //barStyle: { border: "solid 1px #0000FF", bgImage: "grid_1", bgColor: "#0000FF" },
                //summaryBarStyle: { backgroundColor: '#000000', border: 'solid 1px #000000' },
                barStyle: { border: "solid 1px #3284BD", bgImage: "", bgColor: "#0000FF", backgroundColor: '#90CEF5' },
                summaryBarStyle: { border: "solid 1px #013b7f", bgImage: "", bgColor: "#0000FF", backgroundColor: '#285993' },
                percentBarStyle: { backgroundColor: '#3D93D0' },
                trackBarStyle: { border: "solid 1px #d7bb7a", bgImage: "", bgColor: "#0000FF", backgroundColor: '#e2ce9e' },
                milestoneImage: 'task_head_3',
                summaryImage: 'task_head_2',
                milestoneTrackImage: 'task_head_3_hollow',
                listStyle: { backgroundColor: '#FFFFFF' },
                listSelectedStyle: { backgroundColor: '#DDDDDD' },
                networkStyle: { border: "solid 2px #0000FF", color: '#000000' },
                networkLineStyle: { borderBottom: 'solid 1px #0000FF' }
            },
            TaskImportant: {
                barStyle: { border: "solid 1px #FF0000", bgImage: "grid_2", bgColor: "#FF0000" },
                summaryBarStyle: { backgroundColor: '#000000', border: 'solid 1px #000000' },
                percentBarStyle: { backgroundColor: '#000000' },
                trackBarStyle: { border: "solid 1px #000000", bgImage: "grid_1", bgColor: "#000000" },
                milestoneImage: 'task_head_3',
                summaryImage: 'task_head_2',
                milestoneTrackImage: 'task_head_3_hollow',
                listStyle: { backgroundColor: '#FF0000' },
                listSelectedStyle: { backgroundColor: '#FFFFFF' },
                networkStyle: { border: "solid 2px #FF0000", color: '#000000' },
                networkLineStyle: { borderBottom: 'solid 1px #FF0000' }
            },
            TaskUnimportant: {
                barStyle: { border: "solid 1px #cccccc", bgImage: "grid_2", bgColor: "#cccccc" },
                summaryBarStyle: { backgroundColor: '#999999', border: 'solid 1px #999999' },
                percentBarStyle: { backgroundColor: '#999999' },
                trackBarStyle: { border: "solid 1px #999999", bgImage: "grid_1", bgColor: "#999999" },
                milestoneImage: 'task_head_3',
                summaryImage: 'task_head_2',
                milestoneTrackImage: 'task_head_3_hollow',
                listStyle: { backgroundColor: '#cccccc' },
                listSelectedStyle: { backgroundColor: '#FFFFFF' },
                networkStyle: { border: "solid 2px #cccccc", color: '#999999' },
                networkLineStyle: { borderBottom: 'solid 1px #cccccc' }
            }
        },
        resourceStyle: {
            ResourceNormal: {
                barStyle: { border: "solid 1px #0000FF", bgImage: "grid_1", bgColor: "#0000FF" },
                summaryBarStyle: { backgroundColor: '#000000', border: 'solid 1px #000000' },
                percentBarStyle: { backgroundColor: '#000000' },
                trackBarStyle: { border: "solid 1px #000000", bgImage: "grid_1", bgColor: "#000000" },
                milestoneImage: 'task_head_3',
                summaryImage: 'task_head_2',
                milestoneTrackImage: 'task_head_3_hollow',
                listStyle: { backgroundColor: '#FFFFFF' },
                listSelectedStyle: { backgroundColor: '#DDDDDD' }
            },
            ResourceImportant: {
                barStyle: { border: "solid 1px #FF0000", bgImage: "grid_2", bgColor: "#FF0000" },
                summaryBarStyle: { backgroundColor: '#000000', border: 'solid 1px #000000' },
                percentBarStyle: { backgroundColor: '#000000' },
                milestoneImage: 'task_head_3',
                summaryImage: 'task_head_2',
                listStyle: { backgroundColor: 'red' },
                listSelectedStyle: { backgroundColor: 'red' }
            }
        },
        linkStyle: {
            BlueNormal: {
                color: '#285993',
                lineStyle: { borderStyle: 'solid' }
            },
            BlueDashed: {
                color: '#0000FF',
                lineStyle: { borderStyle: 'dashed' }
            },
            RedNormal: {
                color: '#FF0000',
                lineStyle: { borderStyle: 'solid' }
            },
            RedDashed: {
                color: '#FF0000',
                lineStyle: { borderStyle: 'dashed' }
            },
            BlackNormal: {
                color: '#000000',
                lineStyle: { borderStyle: 'solid' }
            },
            BlackDashed: {
                color: '#000000',
                lineStyle: { borderStyle: 'dashed' }
            }
        }
    },
    SFGanttTasksMap: {
        tooltipTitle: { summary: 'Summary', milestone: 'Milestone', task: 'Task', progress: 'Progress', tracking: 'Baseline', link: 'Link' },
        taskStyle: 'TaskNormal',
        taskBarField: 'name',
        taskNoticeFields: 'name,Start,Finish,Duration',
        taskProgressNoticeFields: 'name,PercentComplete',
        taskTrackingNoticeFields: 'name,BaselineStart,BaselineFinish',
        linkAddNoticeFields: 'Type,FromTask,ToTask',
        taskHeight: 12,
        trackBaselineTopScale: 0.5,
        trackBaselineHeightScale: 0.5,
        trackNormalTopScale: 0,
        trackNormalHeightScale: 0.5
    },
    SFGanttResourceMap: {
        tooltipTitle: { summary: 'Summary', milestone: 'Milestone', task: 'Task', progress: 'Progress', tracking: 'Baseline', link: 'Link' },
        taskStyle: 'TaskNormal',
        taskBarField: 'name',
        taskNoticeFields: 'name,Start,Finish,Duration',
        taskProgressNoticeFields: 'name,ActualStart,ActualFinish,ActualDuration,PercentComplete',
        taskTrackingNoticeFields: 'name,BaselineStart,BaselineFinish',
        linkAddNoticeFields: 'Type,FromTask,ToTask',
        taskHeight: 12,
        resourceHeight: 12,
        trackBaselineTopScale: 0.5,
        trackBaselineHeightScale: 0.5,
        trackNormalTopScale: 0,
        trackNormalHeightScale: 0.5
    },
    SFGanttElementList: {
        elementStyle: 'TaskNormal',
        editEvent: 'click'
    },
    SFGanttLinksMap: {
        tooltipTitle: { link: 'Link' },
        linkNoticeFields: 'Type,FromTask,ToTask',
        linkStyle: 'BlueNormal'
    },
    SFGanttClipboardControl: {
        taskClipboardIgnoreProperty: "UID,Summary,ID,OutlineNumber,OutlineLevel,ReadOnly"
    },
    SFGanttNetworkControl: {
        linkStyle: 'BlueNormal',
        linkFocusStyle: 'RedNormal',
        taskStyle: 'TaskNormal',
        taskFields: 'name,Start,Finish,Resource',
        taskNoticeFields: 'name,UID,Duration,Resource,Notes',
        width: 300,
        height: 100,
        nodeWidth: 200,
        nodeHeight: 78,
        dir: 'x',
        type: 'Finish',
        combineLine: false,
        maxTimes: 64
    },
    SFGanttCalDiv: {
        calNum: 2
    },
    SFMenu: {
        tableStyle: { border: 'solid 1px #A4A4A4', backgroundColor: '#FFFFFF' }
    },
    SFTooltip: {
        divStyle: { fontSize: '12px', backgroundColor: '#F4F4F4', border: 'solid 1px #8A8A8A', 'border-radius': '3px', padding: '5px' }
    },
    SFGanttTimeSegmentation: {
        calIndex: 1,
        lineStyle: { borderLeft: 'dotted 1px #808080' }
    },
    SFGanttTimeScrollNotice: {
        divStyle: { fontSize: '13px', backgroundColor: '#F4F4F4', padding: '3px', border: 'solid 1px #8A8A8A', 'border-radius': '3px' },
        dateFormat: 'MM/dd/yyyy'
    },
    SFGanttTimeLine: {
        lineStyle: { width: '1px', borderStyle: 'solid', borderColor: 'red', borderLeftWidth: '1px', borderRightWidth: '1px', backgroundColor: '#FFFFFF' },
        tooltipFormat: 'MM/dd/yyyy'
    },
    SFGanttListScrollNotice: {
        divStyle: { backgroundColor: '#FFFFE1', padding: '0px', border: 'inset 1px #000000', fontSize: '12px' },
        taskFields: 'UID,name',
        resourceFields: 'UID,name'
    },
    SFGanttField: {
        fieldTexts: {
            UID: 'UID',
            ID: 'ID',
            TaskName: 'Name',
            ResourceName: 'Name',
            OutlineNumber: 'OutlineNumber',
            StatusIcon: 'StatusIcon',
            Duration: 'Duration',
            Start: 'Start',
            Finish: 'Finish',
            Notes: 'Notes',
            ClassName: 'ClassName',
            Critical: 'Critical',
            Selected: 'Selected',
            Resource: 'Resource',
            PercentComplete: 'PercentComplete',
            ActualStart: 'ActualStart',
            ActualFinish: 'ActualFinish',
            ActualDuration: 'ActualDuration',
            BaselineStart: 'BaselineStart',
            BaselineFinish: 'BaselineFinish',
            ConstraintType: 'ConstraintType',
            ConstraintDate: 'ConstraintType',
            LinkType: 'Type',
            FromTask: 'FromTask',
            ToTask: 'ToTask'
        },
        //linkTypes: ['Finish-Finish(FF)', 'Finish-Start(FS)', 'Start-Finish(SF)', 'Start-Start(SS)'],
        linkTypes: ['Start-Start(SS)', 'Start-Finish(SF)', 'Finish-Finish(FF)', 'Finish-Start(FS)'],
        constraintTypes: ['As Soon As Possible(ASAP) ', 'As Late As Possible (ALAP) ', 'Must Start On (MSO) ', 'Must Finish On (MFO) ', 'Start No Earlier Than (SNET) ', 'Start No Later Than (SNLT) ', 'Finish No Earlier Than (FNET) ', 'Finish No Later Than (FNLT) '],
        boolTypes: ['N', 'Y'],
        dateShowFormat: 'MM/dd/yyyy',
        dateInputFormat: 'MM/dd/yyyy',
        noticeWrongFormat: 'Incorrect format',
        durationFormat: '%0 Working days',
        tooltipConstraint: "This task has Constraint: \"%0\",Date :%1.",
        tooltipPercentComplete: "This task completed in %0 ."
    },
    SFGanttCalendarItem: {
        formats: {
            Minute15: 'mm',
            Hour: 'd/M HH',
            Hour2: 'HH',
            Hour6: 'HH',
            Dat: 'd/M(ddd)',
            Dat1: 'd',
            Day: 'ddd',
            Day3: 'd',
            Day7: 'd',
            Week: 'd/M/YYYY',
            Month: 'M/yy',
            Month1: 'M',
            Quarter: 'yyyy \\Qq',
            Quarter1: '\\Qq',
            Quarter2: '\\Hhhh',
            Year: 'yyyy',
            Year1: 'yyyy',
            Year5: 'yyyy',
            Year10: 'yyyy'
        }
    }
}
function addToConfig(obj, json, cover) {
    if (!json) { return; }
    for (var key in json) {
        switch (typeof (json[key])) {
            case "function":
                break;
            case "object":
                if (!obj[key]) {
                    obj[key] = json[key];
                    continue;
                }
                addToConfig(obj[key], json[key], cover);
                break;
            default:
                if (cover != false || !obj[key]) {
                    obj[key] = json[key];
                }
                break;

        }
    }
}
function getConfigByString(obj) {
    switch (typeof (obj)) {
        case "string":
            return "'" + obj.replace(new RegExp("\\\\", "gi"), "\\\\") + "'";
        case "object":
            var values = [], isArray = typeof (obj.length) == "number";
            for (var item in obj) {
                var str = getConfigByString(obj[item])
                values.push(isArray ? str : item + ":" + str);
            }
            return (isArray ? "[" : "{") + values.join(",") + (isArray ? "]" : "}");
    }
    return obj.toString();
}
addToConfig(window._SFGantt_config, {
    SFGantt: {
        menuText: {
            ZoomIn: '图表放大',
            ZoomOut: '图表缩小',
            FocusIntoView: '转到任务',
            AddTask: '新建任务',
            DeleteTask: '删除任务',
            AddTasksLinks: '链接任务',
            RemoveTasksLinks: '取消链接',
            UpgradeTask: '升级',
            DegradeTask: '降级',
            Print: '打印',
            CopyTask: '复制任务',
            PasteTask: '粘贴任务',
            ShowChart: '显示图表',
            HideChart: '隐藏图表',
            ShowList: '显示列表',
            HideList: '隐藏列表',
            Help: '使用帮助',
            About: '关于向日葵甘特'
        },
        noticeDelete: '确认要删除任务吗？注意：概要任务的子任务也会被删除！',
        noticeReadonly: '选中了一个或多个只读的任务，操作不能完成！'
    },
    SFGanttTasksMap: {
        tooltipTitle: { summary: '概要任务', milestone: '里程碑', task: '任务', progress: '进度', tracking: '比较基准', link: '链接' }
    },
    SFGanttLinksMap: {
        tooltipTitle: { link: '任务链接' }
    },
    SFGanttTimeScrollNotice: {
        dateFormat: 'yyyy-MM-dd'
    },
    SFGanttTimeLine: {
        tooltipFormat: 'yyyy-MM-dd'
    },
    SFGanttField: {
        fieldTexts: {
            UID: '标识号',
            ID: '索引',
            TaskName: '名称',
            ResourceName: '资源名称',
            OutlineNumber: '大纲',
            StatusIcon: '状态',
            Duration: '工期',
            Start: '开始日期',
            Finish: '完成日期',
            Notes: '备注',
            ClassName: '样式',
            Critical: '关键',
            Selected: '选中',
            Resource: '资源名称',
            PercentComplete: '完成百分比',
            ActualStart: '实际开始时间',
            ActualFinish: '完成至此时间',
            ActualDuration: '实际工期',
            BaselineStart: '基线开始时间',
            BaselineFinish: '基线结束时间',
            ConstraintType: '约束类型',
            ConstraintDate: '约束时间',
            LinkType: '链接类型',
            FromTask: '从',
            ToTask: '到',
            PredecessorTask: '前置任务',
            SuccessorTask: '后置任务'
        },
        //linkTypes: ['完成-完成(FF)', '完成-开始(FS)', '开始-完成(SF)', '开始-开始(SS)'],
        linkTypes: ['开始-开始(SS)', '开始-完成(SF)', '完成-完成(FF)', '完成-开始(FS)'],
        constraintTypes: ['越早越好', '越晚越好', '必须开始于', '必须完成于', '不得早于...开始', '不得晚于...开始', '不得早于...完成', '不得晚于...完成'],
        boolTypes: ['否', '是'],
        dateShowFormat: 'yyyy-MM-dd',
        dateInputFormat: 'yyyy-MM-dd',
        noticeWrongFormat: '格式不正确',
        noticeEmptyTaskField: '任务域%0不存在!',
        noticeEmptyLinkField: '链接域%0不存在!',
        durationFormat: '%0个工作日',
        tooltipConstraint: "此任务有限制条件: \"%0\"，日期:%1",
        tooltipPercentComplete: "此任务在 %0 完成"
    },
    SFGlobal: {
        weekStrs: ['日', '一', '二', '三', '四', '五', '六']
    },
    SFGanttCalendarItem: {
        formats: {
            Minute15: 'mm',
            Hour: 'M-d HH',
            Hour2: 'HH',
            Hour6: 'HH',
            Dat: 'M月d日（ddd）',
            Dat1: 'd',
            Day: 'ddd',
            Day3: 'd',
            Day7: 'd',
            Week: 'yyyy年M月d日',
            Month: 'yy年M月',
            Month1: 'M',
            Quarter: 'yyyy年第q季度',
            Quarter1: '\\Qq',
            Quarter2: '\\Hhhh',
            Year: 'yyyy年',
            Year1: 'yyyy',
            Year5: 'yyyy',
            Year10: 'yyyy'
        }
    }
})
/**
地图画笔功能的基类，所有的画笔都集成此类
@private
@class
*/
function SFGraphics() {
    if (arguments.length < 1) { return; }
    this.div = document.createElement("div");
}
SFGraphics.prototype = new SFGraphics();
/**
返回用来装载画笔绘制内容的HTML元素
*/
SFGraphics.prototype.getPanel = function () { return this.div; }
/**
开始绘制过程
*/
SFGraphics.prototype.start = function () { }
/**
将绘制点移动到指定的点
*/
SFGraphics.prototype.moveTo = function () { }
/**
从绘制点划线到指定的点
*/
SFGraphics.prototype.lineTo = function () { }
/**
结束绘制过程
*/
SFGraphics.prototype.finish = function () { }
/**
清除绘制的内容
*/
SFGraphics.prototype.clear = function () { }
/**
设置绘制内容的缩放比例
*/
SFGraphics.prototype.setScale = function () { }
/**
设置绘制内容的显示位置
@param {SFPoint} position
*/
SFGraphics.prototype.setPosition = function (position) {
    SFGlobal.setProperty(this.div.style, { position: 'absolute', left: position.x + "px", top: position.y + "px" });
}
/**
设置线条的颜色
*/
SFGraphics.prototype.setLineColor = function () { }
/**
设置填充区域的颜色
*/
SFGraphics.prototype.setFillColor = function () { }
/**
设置显示不透明度
*/
SFGraphics.prototype.setOpacity = function () { }
/**
设置线条显示的线宽
*/
SFGraphics.prototype.setLineWeight = function () { }
/**
设置线条显示的样式
*/
SFGraphics.prototype.setLineStyle = function () { }
window.SFGraphics = SFGraphics
/**
使用Canvas技术实现的画笔
@private
@extends SFGraphics
@class
*/
function SFGraphicsCanvas() {
    var div = this.div = document.createElement("canvas");
    SFGlobal.setProperty(div.style, { position: 'absolute', zIndex: 420 });
}
/**
返回浏览器是否支持此画笔
@returns {Bool} 如果支持返回true,否则返回false
*/
SFGraphicsCanvas.isSupport = function () {
    if (typeof (SFGraphicsCanvas._isSupport) == "undefined") {
        SFGraphicsCanvas._isSupport = !!document.createElement("canvas").getContext
    }
    return SFGraphicsCanvas._isSupport;
}
SFGraphicsCanvas.prototype = new SFGraphics();
/**
开始绘制过程
@param {SFPoint} origin 绘制的原点位置
@param {Number} scale 当前地图的缩放比例
@param {SFPoint} size 绘制区域的大小
*/
SFGraphicsCanvas.prototype.start = function (origin, scale, size) {
    SFGlobal.setProperty(this, { origin: origin, size: size, scale: scale, pathArr: [] });
}
/**
将绘制点移动到指定的点
@param {SFPoint} point
*/
SFGraphicsCanvas.prototype.moveTo = function (point) {
    var pathArr = this.pathArr, scale = this.scale, origin = this.origin;
    pathArr.push({ type: 'm', argu: [(point.x - origin.x) / scale, (point.y - origin.y) / scale] });
}
/**
从绘制点划线到指定的点
@param {SFPoint} point
*/
SFGraphicsCanvas.prototype.lineTo = function (point) {
    var pathArr = this.pathArr, scale = this.scale, origin = this.origin;
    pathArr.push({ type: 'l', argu: [(point.x - origin.x) / scale, (point.y - origin.y) / scale] });
}
/**
结束绘制过程
*/
SFGraphicsCanvas.prototype.finish = function () {
    this.lastScale = this.scale;
    this.reDraw();
}
/**
清除绘制的内容
*/
SFGraphicsCanvas.prototype.clear = function () {
    var ctx = this.div.getContext("2d");
}
/**
设置绘制内容的缩放比例
@param {Number} scale 缩放比例
*/
SFGraphicsCanvas.prototype.setScale = function (scale) {
    this.lastScale = scale;
    var size = this.size;
    SFGlobal.setProperty(this.div.style, { width: size.x / scale + "px", height: size.y / scale + "px" });
    this.reDraw();
}
/**
重绘绘制的图形
@private
*/
SFGraphicsCanvas.prototype.reDraw = function () {
    var scale = this.scale, lastScale = this.lastScale, size = this.size, div = this.div, pathArr = this.pathArr;
    if (!size || !pathArr || pathArr.length == 0) { return; }
    SFGlobal.setProperty(div, { width: size.x / lastScale, height: size.y / lastScale });
    var ctx = div.getContext("2d");
    SFGlobal.setProperty(ctx, {
        lineCap: "round",
        lineJoin: "round",
        fillStyle: this.bgcolor,
        lineWidth: this.lineWeight / scale * lastScale,
        strokeStyle: this.lineColor,
        globalAlpha: this.opacity
    });
    ctx.beginPath();
    ctx.scale(scale / lastScale, scale / lastScale);
    for (var i = 0; i < pathArr.length; i++) {
        var p = pathArr[i];
        switch (p.type) {
            case "m":
                ctx.moveTo.apply(ctx, p.argu);
                break;
            case "l":
                ctx.lineTo.apply(ctx, p.argu);
                break;
        }
    }
    if (this.bgcolor) { ctx.fill(); }
    if (this.lineColor) { ctx.stroke(); }
}
/**
设置线条的颜色
@param {String} color 颜色字符串，可以为"blue"或"#FFFF00"
*/
SFGraphicsCanvas.prototype.setLineColor = function (color) {
    if (color == "transparent") { color = "" }
    this.lineColor = color;
    this.reDraw();
}
/**
设置填充区域的颜色
@param {String} color 颜色字符串，可以为"blue"或"#FFFF00"
*/
SFGraphicsCanvas.prototype.setFillColor = function (color) {
    if (color == "transparent") { color = "" }
    this.bgcolor = color;
    this.reDraw();
}
/**
设置显示不透明度
@param {Number} opacity 不透明度(0-1的小数，0代表完全透明，1代表完全不透明)
*/
SFGraphicsCanvas.prototype.setOpacity = function (opacity) {
    this.opacity = opacity;
    this.reDraw();
}
/**
设置线条显示的线宽
@param {Number} weight 线条粗细
*/
SFGraphicsCanvas.prototype.setLineWeight = function (weight) {
    this.lineWeight = weight;
    this.reDraw();
}
window.SFGraphicsCanvas = SFGraphicsCanvas
/**
直接使用层实现的画笔，这个主要用在其他画笔技术都不支持的情况下使用，必须要引用jsGraphics对象才能使用
@private
@extends SFGraphics
@class
*/
function SFGraphicsDiv() {
    var div = this.div = document.createElement("div");
    SFGlobal.setProperty(div.style, { position: 'absolute', zIndex: 420 });
    this.ctx = new window.jsGraphics(div);
}
/**
返回浏览器是否支持此画笔
@returns {Bool} 如果支持返回true,否则返回false
*/
SFGraphicsDiv.isSupport = function () {
    return !!window.jsGraphics;
}
SFGraphicsDiv.prototype = new SFGraphics();
/**
开始绘制过程
@param {SFPoint} origin 绘制的原点位置
@param {Number} scale 当前地图的缩放比例
@param {SFPoint} size 绘制区域的大小
*/
SFGraphicsDiv.prototype.start = function (origin, scale, size) {
    SFGlobal.setProperty(this, { origin: origin, size: size, scale: scale, pathArr: [] });
}
/**
将绘制点移动到指定的点
@param {SFPoint} point
*/
SFGraphicsDiv.prototype.moveTo = function (point) {
    var pathArr = this.pathArr, scale = this.scale, origin = this.origin;
    var arr = { xPoints: [(point.x - origin.x) / scale], yPoints: [(point.y - origin.y) / scale] };
    pathArr.push(arr);
}
/**
从绘制点划线到指定的点
@param {SFPoint} point
*/
SFGraphicsDiv.prototype.lineTo = function (point) {
    var pathArr = this.pathArr, arr = pathArr[pathArr.length - 1], scale = this.scale, origin = this.origin;
    arr.xPoints.push((point.x - origin.x) / scale);
    arr.yPoints.push((point.y - origin.y) / scale);
}
/**
结束绘制过程
*/
SFGraphicsDiv.prototype.finish = function () {
    this.lastScale = this.scale;
    this.reDraw();
}
/**
设置绘制内容的缩放比例
@param {Number} scale 缩放比例
*/
SFGraphicsDiv.prototype.setScale = function (scale) {
    this.lastScale = scale;
    var size = this.size;
    SFGlobal.setProperty(this.div.style, { width: size.x / scale + "px", height: size.y / scale + "px" });
    this.reDraw();
}
/**
设置线条的颜色
@param {String} color 颜色字符串，可以为"blue"或"#FFFF00"
*/
SFGraphicsDiv.prototype.setLineColor = function (color) {
    if (color == "transparent") { color = "" }
    this.lineColor = color;
    this.reDraw();
}
/**
设置填充区域的颜色
@param {String} color 颜色字符串，可以为"blue"或"#FFFF00"
*/
SFGraphicsDiv.prototype.setFillColor = function (color) {
    if (color == "transparent") { color = "" }
    this.bgcolor = color;
    this.reDraw();
}
/**
设置显示不透明度
@param {Number} opacity 不透明度(0-1的小数，0代表完全透明，1代表完全不透明)
*/
SFGraphicsDiv.prototype.setOpacity = function (opacity) {
    SFGlobal.setProperty(this.div.style, {
        filter: "progid:DXImageTransform.Microsoft.Alpha(opacity=" + parseInt(opacity * 100) + ")",
        MozOpacity: opacity,
        opacity: opacity
    });
}
/**
设置线条显示的线宽
@param {Number} weight 线条粗细
*/
SFGraphicsDiv.prototype.setLineWeight = function (weight) {
    this.lineWeight = weight;
    this.reDraw();
}
/**
设置线条显示的样式
@param {String} style 线条样式名称，支持如下几种："solid"(实线),"dotted"(点线),"dashed"(虚线)
*/
SFGraphicsDiv.prototype.setLineStyle = function (style) {
    this.lineStyle = style.toLowerCase();
}
/**
重绘绘制的图形
@private
*/
SFGraphicsDiv.prototype.reDraw = function () {
    var scale = this.scale, lastScale = this.lastScale, size = this.size, div = this.div, pathArr = this.pathArr;
    if (!size || !pathArr || pathArr.length == 0) { return; }
    SFGlobal.setProperty(div, { width: size.x / lastScale, height: size.y / lastScale });
    var ctx = this.ctx;
    ctx.clear();
    for (var i = 0; i < pathArr.length; i++) {
        var p = pathArr[i], xPoints, yPoints;
        if (scale == lastScale) {
            xPoints = p.xPoints;
            yPoints = p.yPoints;
        }
        else {
            xPoints = new Array(p.xPoints.length);
            yPoints = new Array(p.yPoints.length);
            var s = scale / lastScale, pxs = p.xPoints, pys = p.yPoints;
            for (var j = xPoints.length - 1; j >= 0; j--) {
                xPoints[j] = pxs[j] * s
                yPoints[j] = pys[j] * s
            }
        }
        if (this.bgcolor) {
            ctx.setColor(this.bgcolor);
            ctx.fillPolygon(xPoints, yPoints);
        }
        if (this.lineColor) {
            ctx.setColor(this.lineColor);
            ctx.setStroke((this.lineStyle && this.lineStyle != "solid" && window.Stroke) ? window.Stroke.DOTTED : this.lineWeight);
            ctx.drawPolyline(xPoints, yPoints);
        }
    }
    ctx.paint();
}
window.SFGraphicsDiv = SFGraphicsDiv
/**
使用SVG技术实现的画笔
@private
@extends SFGraphics
@class
*/
function SFGraphicsSvg() {
    var svgNs = 'http://www.w3.org/2000/svg';
    var div = this.div = document.createElementNS(svgNs, 'svg');
    SFGlobal.setProperty(div.style, { position: 'absolute', zIndex: 420 });
    var path = this.path = document.createElementNS(svgNs, 'path');
    div.appendChild(path);
}
/**
返回浏览器是否支持此画笔
@returns {Bool} 如果支持返回true,否则返回false
*/
SFGraphicsSvg.isSupport = function () {
    if (typeof (SFGraphicsSvg._isSupport) == "undefined") {
        if (document.createElementNS) {
            var svgNs = 'http://www.w3.org/2000/svg';
            var div = document.createElementNS(svgNs, 'svg');
            SFGraphicsSvg._isSupport = typeof (div.ownerSVGElement) == "object";
        }
        else {
            SFGraphicsSvg._isSupport = false;
        }
    }
    return SFGraphicsSvg._isSupport;
}
SFGraphicsSvg.prototype = new SFGraphics();
/**
开始绘制过程
@param {SFPoint} origin 绘制的原点位置
@param {Number} scale 当前地图的缩放比例
@param {SFPoint} size 绘制区域的大小
*/
SFGraphicsSvg.prototype.start = function (origin, scale, size) {
    SFGlobal.setProperty(this, { origin: origin, size: size, scale: scale, pathArr: [] });
}
/**
将绘制点移动到指定的点
@param {SFPoint} point
*/
SFGraphicsSvg.prototype.moveTo = function (point) {
    var pathArr = this.pathArr, scale = this.scale, origin = this.origin;
    pathArr.push("M");
    pathArr.push((point.x - origin.x) / scale);
    pathArr.push((point.y - origin.y) / scale);
}
/**
从绘制点划线到指定的点
@param {SFPoint} point
*/
SFGraphicsSvg.prototype.lineTo = function (point) {
    var pathArr = this.pathArr, scale = this.scale, origin = this.origin;
    pathArr.push("L");
    pathArr.push((point.x - origin.x) / scale);
    pathArr.push((point.y - origin.y) / scale);
}
/**
结束绘制过程
*/
SFGraphicsSvg.prototype.finish = function () {
    var pathArr = this.pathArr;
    this.path.setAttribute("d", this.pathArr.join(" "));
    this.setScale(this.scale);
}
/**
清除绘制的内容
*/
SFGraphicsSvg.prototype.clear = function () { this.path.setAttribute("d", ""); }
/**
设置绘制内容的缩放比例
@param {Number} scale 缩放比例
*/
SFGraphicsSvg.prototype.setScale = function (scale) {
    var size = this.size, lineWeight = this.lineWeight;
    if (!size) { return; }
    SFGlobal.setProperty(this.div.style, { width: size.x / scale + lineWeight * 2 + "px", height: size.y / scale + lineWeight * 2 + "px" });
    this.path.setAttribute("transform", "scale(" + (this.scale / scale) + ") translate(" + (lineWeight) + "," + (lineWeight) + ")");
    this.lastScale = scale;
    this.path.setAttribute("style", this.getStyle());
}
/**
设置绘制内容的显示位置
@param {__Point} position
*/
SFGraphicsSvg.prototype.setPosition = function (position) {
    if (!position) { return; }
    this.lastPosition = position;
    var lineWeight = this.lineWeight;
    SFGlobal.setProperty(this.div.style, { position: 'absolute', left: (position.x - lineWeight) + "px", top: (position.y - lineWeight) + "px" });
}
/**
设置线条的颜色
@param {String} color 颜色字符串，可以为"blue"或"#FFFF00"
*/
SFGraphicsSvg.prototype.setLineColor = function (color) {
    if (color == "transparent" || !color) { color = "none" }
    this.lineColor = color;
    this.path.setAttribute("style", this.getStyle());
}
/**
设置填充区域的颜色
@param {String} color 颜色字符串，可以为"blue"或"#FFFF00"
*/
SFGraphicsSvg.prototype.setFillColor = function (color) {
    if (color == "transparent" || !color) { color = "none" }
    this.bgcolor = color;
    this.path.setAttribute("style", this.getStyle());
}
/**
设置显示不透明度
@param {Number} opacity 不透明度(0-1的小数，0代表完全透明，1代表完全不透明)
*/
SFGraphicsSvg.prototype.setOpacity = function (opacity) {
    this.opacity = opacity;
    this.path.setAttribute("style", this.getStyle());
}
/**
设置线条显示的线宽
@param {Number} weight 线条粗细
*/
SFGraphicsSvg.prototype.setLineWeight = function (weight) {
    this.lineWeight = weight;
    //这里不能直接设置scale
    this.setScale(this.lastScale);
    this.setPosition(this.lastPosition);
    //this.path.setAttribute("style",this.getStyle());
}
/**
设置线条显示的样式
@param {String} style 线条样式名称，支持如下几种："solid"(实线),"dotted"(点线),"dashed"(虚线)
*/
SFGraphicsSvg.prototype.setLineStyle = function (style) {
    var dashArray;
    switch (style.toLowerCase()) {
        case "dotted":
            dashArray = [1, 6];
            break;
        case "dashed":
            dashArray = [6, 6];
            break;
        default:
            break;
    }
    this.dashArray = dashArray;
    this.path.setAttribute("style", this.getStyle());
}
/**
根据设置获取SVG的样式字符串
@private
@returns {String}
*/
SFGraphicsSvg.prototype.getStyle = function () {
    var arr = [];
    arr.push("fill:none");
    arr.push("opacity:" + this.opacity);
    arr.push("stroke:" + this.lineColor);
    arr.push("stroke-linecap:round");
    arr.push("stroke-linejoin:round");
    arr.push("stroke-dasharray:" + this.dashArray);
    arr.push("stroke-width:" + this.lineWeight / this.scale * this.lastScale);
    arr.push("fill:" + this.bgcolor);
    return arr.join(";");
}
window.SFGraphicsSvg = SFGraphicsSvg
/**
本文件是地图上的VML画笔对象。
因为VML本身的性能和效果很不错，因此需要尽量用VML显示，因此克服了如下问题：
1.如果用户没有添加V命名空间，则自动添加
2.不需要用户在CSS之中注册VML,所有的V命名空间采用样式表直接指定
3.通过直接的测试判断能不能使用VML
@private
@extends SFGraphics
@class
*/
function SFGraphicsVml() {
    //注意，通过下面添加behavior样式表的支持，避免了强制要求页面添加VML样式的指定
    //<style type="text/css">v\:*{behavior:url(#default#VML);}</style>
    //使VML兼容性更高
    var div = this.div = document.createElement("v:shape");
    SFGlobal.setProperty(div, { unselectable: 'on', filled: 'true' });
    var stroke = this.stroke = document.createElement("v:stroke");
    SFGlobal.setProperty(stroke, { joinstyle: 'round', endcap: 'round' });
    div.appendChild(stroke);
    var fill = this.fill = document.createElement("v:fill");
    div.appendChild(fill);
    stroke.style.cssText = fill.style.cssText = div.style.cssText = "behavior:url(#default#VML)";
    stroke.style.behavior = fill.style.behavior = div.style.behavior = "url(#default#VML)";
    div.style.position = 'absolute';
    div.style.zIndex = '420';
}
/**
返回浏览器是否支持此画笔
@returns {Bool} 如果支持返回true,否则返回false
*/
SFGraphicsVml.isSupport = function () {
    //先检查VML的支持
    if (typeof (SFGraphicsVml._isSupport) == "undefined") {
        //在这里通过直接测试的方式得到浏览器是不是支持VML的最权威数据
        //如果仅仅通过浏览器类型判断是不对的，就算用户使用了IE，假如通过以下语句来禁用VML,也是不支持VML的
        //regsvr32 /u "%CommonProgramFiles%\Microsoft Shared\VGX\vgx.dll
        try {
            //如果可能，先主动给页面添加命名空间数据
            //<html xmlns:v="urn:schemas-microsoft-com:vml">
            if (document.namespaces) {
                if (!document.namespaces.v) { document.namespaces.add("v", "urn:schemas-microsoft-com:vml"); }
                var div = document.createElement("v:shape");
                div.style.cssText = "behavior:url(#default#VML)"
                div.style.behavior = "url(#default#VML)"
                document.body.appendChild(div);
                //下面判断这个对象是不是存在Path属性
                SFGraphicsVml._isSupport = typeof (div.Path) == "object";
                div.parentNode.removeChild(div);
            }
            else {
                SFGraphicsVml._isSupport = false;
            }
        }
        catch (e) { SFGraphicsVml._isSupport = false; }
    }
    return SFGraphicsVml._isSupport;
}
SFGraphicsVml.prototype = new SFGraphics();
/**
设置绘制内容的显示位置
@param {SFPoint} position
*/
SFGraphicsVml.prototype.setPosition = function (position) {
    var div = this.div;
    div.style.position = "absolute"
    div.style.left = position.x + "px"
    div.style.top = position.y + "px"
}
/**
开始绘制过程
@param {SFPoint} origin 绘制的原点位置
@param {Number} scale 当前地图的缩放比例
@param {Point} size 绘制区域的大小
*/
SFGraphicsVml.prototype.start = function (origin, scale, size) {
    SFGlobal.setProperty(this, { origin: origin, size: size, scale: scale, pathArr: [] });
    this.div.coordsize = parseInt(size.x * 256 / scale) + "," + parseInt(size.y * 256 / scale)
}
/**
将绘制点移动到指定的点
@param {SFPoint} point
*/
SFGraphicsVml.prototype.moveTo = function (point) {
    var pathArr = this.pathArr, scale = this.scale, origin = this.origin;
    pathArr.push("m");
    pathArr.push(parseInt((point.x - origin.x) * 256 / scale));
    pathArr.push(parseInt((point.y - origin.y) * 256 / scale));
}
/**
从绘制点划线到指定的点
@param {SFPoint} point
*/
SFGraphicsVml.prototype.lineTo = function (point) {
    var pathArr = this.pathArr, scale = this.scale, origin = this.origin;
    pathArr.push("l");
    pathArr.push(parseInt((point.x - origin.x) * 256 / scale));
    pathArr.push(parseInt((point.y - origin.y) * 256 / scale));
}
/**
结束绘制过程
*/
SFGraphicsVml.prototype.finish = function () {
    var pathArr = this.pathArr;
    pathArr.push("e");
    this.div.path = this.pathArr.join(" ");
    this.setScale(this.scale);
}
/**
清除绘制的内容
*/
SFGraphicsVml.prototype.clear = function () {
    this.div.style.display = 'none'
    this.div.path = "e";
    this.div.style.display = ''
}
/**
设置绘制内容的缩放比例
@param {Number} scale 缩放比例
*/
SFGraphicsVml.prototype.setScale = function (scale) {
    var div = this.div, size = this.size;
    div.style.width = size.x / scale + "px"
    div.style.height = size.y / scale + "px"
}
/**
设置线条的颜色
@param {String} color 颜色字符串，可以为"blue"或"#FFFF00"
*/
SFGraphicsVml.prototype.setLineColor = function (color) {
    var div = this.div;
    if (color == "transparent" || color == "") {
        div.stroked = false;
    }
    else {
        div.stroked = true;
        div.strokecolor = color;
    }
}
/**
设置填充区域的颜色
@param {String} color 颜色字符串，可以为"blue"或"#FFFF00"
*/
SFGraphicsVml.prototype.setFillColor = function (color) {
    var div = this.div;
    if (color == "transparent" || color == "") {
        div.filled = false;
    }
    else {
        div.filled = true;
        div.fillcolor = color;
    }
}
/**
设置显示不透明度
@param {Number} opacity 不透明度(0-1的小数，0代表完全透明，1代表完全不透明)
*/
SFGraphicsVml.prototype.setOpacity = function (opacity) {
    this.stroke.opacity = opacity;
    this.fill.opacity = opacity;
}
/**
设置线条显示的线宽
@param {Number} weight 线条粗细
*/
SFGraphicsVml.prototype.setLineWeight = function (weight) { this.div.strokeweight = weight; }
/**
设置线条显示的样式
@param {String} style 线条样式名称，支持如下几种："solid"(实线),"dotted"(点线),"dashed"(虚线)
*/
SFGraphicsVml.prototype.setLineStyle = function (style) {
    switch (style.toLowerCase()) {
        case "dotted":
            style = "ShortDot";
            break;
        case "dashed":
            style = "ShortDash";
            break;
    }
    //vml支持的线型列表(不区分大小写)：
    //Solid (default) ,ShortDash ,ShortDot ,ShortDashDot ,ShortDashDotDot ,Dot ,Dash ,LongDash ,DashDot ,LongDashDot ,LongDashDotDot
    this.stroke.dashstyle = style;
}
window.SFGraphicsVml = SFGraphicsVml
/**
甘特图之中一些公用函数，这些函数都是静态函数
@class
*/
function SFGlobal() { }
/**
将pro的所有属性设置给obj
@private
@param {Object} obj	对象
@param {Json} pro	需要设置的属性集合
*/
SFGlobal.setProperty = function (obj, pro) {
    if (typeof (obj.cssText) != 'undefined') {
        var text = [obj.cssText];
        var key;
        for (key in pro) {
            var cssKey = key.replace(new RegExp("[A-Z]", "g"), function (a) { return "-" + a.toLowerCase() });
            cssKey = cssKey.replace(/^ms-/, "-ms-");
            text.push(cssKey + ":" + pro[key]);
        }
        obj.cssText = text.join(";");
        return;
    }
    var key;
    for (key in pro) {
        obj[key] = pro[key];
    }
}
/**
判断浏览器是否是兼容性模式(这一项是临时解决方案，因此还不很清晰)
@returns {Bool} 如果是兼容性模式，返回true
@private
*/
SFGlobal.isCompatible = function () {
    if (!document.all) { return false; }
    var reg = new RegExp("MSIE\\s*([0-9]+)");
    var result;
    if (result = reg.exec(navigator.userAgent)) {
        if (parseInt(result[0]) < 7) { return false }
    }
    return true;
}
/**
根据时间字符串返回需要的时间
@param {String} str 日期时间字符串
@returns {Date} 返回JavaScript的Date对象
*/
SFGlobal.getDate = function (str) {
    var rep, result;
    rep = new RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})[ t]([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})(?:\\.[0-9]{1,3})?(?:[\\+\\-][0-9]{1,2}:[0-9]{1,2})?$", "ig");
    var result = rep.exec(str);
    if (result) {
        return new Date(result[1], result[2] - 1, result[3], result[4], result[5], result[6]);
    }
    return new Date(str);
}
/**
通过在前面添加字符的方法得到指定大小的串
@private
@param {String} str 原字符串
@param {Number} length 指定的长度
@param {String} [initStr=" "] 在前面添加的字符，默认为一个空格
@returns {Date} 返回添加后的字符串
*/
SFGlobal.getLengthStr = function (str, length, initStr) {
    if (!str) { str = ' '; }
    if (!initStr) { initStr = ""; }
    initStr = initStr.toString();
    while (initStr.length < length) {
        initStr = str + initStr;
    }
    return initStr;
}
/**
根据时间对象返回指定格式的时间字符串，通常用在事件的输出和显示上
@param {Date} time JavaScript语言的Date对象
@param {String} format 返回值格式，支持以下格式：
<ul>
    <li>	ddd	:		当前星期几的数字，从0到6，0代表星期天，如果在配置参数之中指定了weekStrs，则使用weekStrs数组的对应值；</li>
    <li>	dd	:		以有前导零的数字来显示日 (01 – 31)；</li>
    <li>	d	:		以没有前导零的数字来显示日 (1 – 31)；</li>
    <li>	yyyy:		以四位数来表示年 ，例如2009；</li>
    <li>	yy	:		以二位数来表示年 ，例如09；</li>
    <li>	MM	:		 以有前导零的数字来显示月 (01 – 12)；</li>
    <li>	M	:		 以没有前导零的数字来显示月 (1 – 12)；</li>
    <li>	hhh	:		 1代表上半年，2代表下半年。</li>
    <li>	HH	:		  以有前导零的数字来显示小时 (00– 23)；</li>
    <li>	H	:		  以没有前导零的数字来显示小时 (0 – 23)；</li>
    <li>	mm	:		  以有前导零的数字来显示分钟数 (01 – 59)；</li>
    <li>	m	:		  以没有前导零的数字来显示分钟数 (1 – 12)；</li>
    <li>	ss	:		  以有前导零的数字来显示秒 (00 – 59)；</li>
    <li>	s	:		  以没有前导零的数字来显示秒 (0 – 59)；</li>
    <li>	q	:		  将一年中的季以数值表示 (1 – 4)；</li>
    <li>	\*	:		假如要在输出结果之中直接使用上面的字符，应该在前面加反斜杠</li>
</ul>
@returns {String} 返回日期时间字符串
@param {Json} config  输出的其他配置信息
@param {Array} config.weekStrs  显示星期的替代字符串数组，例如
@example
SFGlobal.getDateString(new Date(),"yyyy-MM-dd HH:mm:ss")
SFGlobal.getDateString(new Date(),"yyyy-MM-dd HH:mm:ss 星期ddd",{weekStrs:['日','一','二','三','四','五','六']})
*/
SFGlobal.getDateString = function (time, format, config) {
    if (!time) { return ""; }
    config = config ? config : {};
    if (format == 's') { format = 'yyyy-MM-ddTHH:mm:ss'; }
    var year = time.getYear();
    if (year < 1900) { year += 1900; }

    var arr = [];
    var rep = function (str) {
        switch (str) {
            case "ddd":
                return config.weekStrs ? config.weekStrs[time.getDay()] : time.getDay();
            case "dd":
                return SFGlobal.getLengthStr('0', 2, time.getDate());
            case "d":
                return time.getDate();
            case "yyyy":
                return SFGlobal.getLengthStr('0', 4, year);
            case "yy":
                return SFGlobal.getLengthStr('0', 2, year % 100);
            case "MM":
                return SFGlobal.getLengthStr('0', 2, time.getMonth() + 1);
            case "M":
                return time.getMonth() + 1;
            case "hhh":
                return Math.ceil((time.getMonth() + 1) / 6);
            case "HH":
                return SFGlobal.getLengthStr('0', 2, time.getHours());
            case "H":
                return time.getHours();
            case "mm":
                return SFGlobal.getLengthStr('0', 2, time.getMinutes());
            case "m":
                return time.getMinutes();
            case "ss":
                return SFGlobal.getLengthStr('0', 2, time.getSeconds());
            case "s":
                return time.getSeconds();
            case "q":
                return Math.ceil((time.getMonth() + 1) / 3);
        }
        return str;
    }
    format = format.replace(new RegExp('\\\\([a-zA-Z])', 'g'), function (a, b) { arr.push(b); return '\\'; });
    format = format.replace(new RegExp('([a-zA-Z])\\1*', 'g'), rep);
    format = format.replace(new RegExp('\\\\', 'g'), function (a) { return arr.shift(); });
    return format;
}
/**
替换字符串之中的参数项，参数使用%aaa的形式指定，替换成params集合之中的aaa项的值
@private
@param {String} format 原字符串
@param {Json} params 替换的值集合
@returns {String} 返回替换后的字符串
*/
SFGlobal.formatString = function (format, params) {
    if (typeof (params) != "object") { params = [params] }
    /**
    对正则表达式结果进行替换的函数
    @ignore
    @private
    @param {String} p1 正则表达式匹配结果0
    @param {String} p2 正则表达式匹配结果1
    @returns {String} 替换后的字符串
    */
    function rep(p1, p2) { return params[p2]; }
    return format.replace(new RegExp("%([0-9a-zA-Z_]+)", "gi"), rep);
}
/**
设置层的鼠标样式
@private
@param {HtmlElement} obj 指定的层
@param {String} style 鼠标样式名称或.cur文件的路径
*/
SFGlobal.setCursor = function (obj, style) {
    if (style.indexOf(",") > 0) {
        var styles = style.split(",");
        for (var i = 0; i < styles.length; i++) {
            if (SFGlobal.setCursor(obj, styles[i])) { return true; }
        }
        return false;
    }
    try {
        if (style.toLowerCase().indexOf(".cur") > 0) {
            style = "url(" + style + "),auto";
        }
        style = style.toLowerCase();
        if (style == "hand" && !document.all) {
            style = "pointer";
        }
        obj.style.cursor = style;
        return true;
    }
    catch (e) { return false; }
}
/**
设置层的不透明度
@private
@param {HtmlElement} obj 指定的层
@param {Number} opacity 不透明度参数0-1之间的浮点数，0代表完全透明，1代表完全不透明
*/
SFGlobal.setOpacity = function (obj, opacity) {
    obj.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + parseInt(opacity * 100) + ")";
    obj.style.MozOpacity = opacity;
    obj.style.opacity = opacity;
}
/**
在数组之中查找指定的项
@private
@param {Array} array 数组
@param {Object} item 被查找的项
@param {Function} [func] 如果搜寻的时候需要使用函数处理结果再和item比较，则传递此函数
@param {Bool} [all=false] 默认只查找一项就退出，如果要查找所有符合的项，可设置为true
@returns {Object|Object[]} 在all参数为false时，返回被删除的项,否则返回找到的所有项数组
*/
SFGlobal.findInArray = function (array, item, func, all) {
    if (!array) { return }
    var result = all ? [] : null;
    /**
    比较数组之中的项是否匹配的函数
    @ignore
    @private
    @param {Object} p1 正则表达式匹配结果0
    @param {Object} p2 正则表达式匹配结果1
    @returns {Bool} 如果匹配，返回true
    */
    func = func ? func : function (a, b) { return a == b };
    for (var i = array.length - 1; i >= 0; i--) {
        if (func(array[i], item)) {
            if (all) {
                result.push(result);
            }
            else {
                return array[i];
            }
        }
    }
    return result;
}
/**
在数组之中删除指定的项
@private
@param {Array} array 数组
@param {Object} item 需要被删除的项
@param {Bool} [all=false] 默认只删除一项就退出，如果要删除所有符合的项，可设置为true
@returns {Object} 在all参数为false时，返回被删除的项
*/
SFGlobal.deleteInArray = function (array, item, all) {
    if (!array) { return }
    for (var i = array.length - 1; i >= 0; i--) {
        if (array[i] == item) {
            array.splice(i, 1)
            if (!all) { return array[i]; }
        }
    }
}
/**
设置层的大小
@private
@param {HtmlElement} obj 指定的层
@param {[x,y]} size 指定的大小
*/
SFGlobal.setElementSize = function (obj, size) {
    SFGlobal.setProperty(obj.style, { width: size[0] + "px", height: size[1] + "px" });
}
/**
获取层的显示大小
@private
@param {HtmlElement} obj 指定的层
@returns {[x,y]} 返回层的大小
*/
SFGlobal.getElementSize = function (obj) {
    var viewSize = [obj.offsetWidth, obj.offsetHeight]
    if (obj.clientHeight && !document.all) { viewSize[1] = obj.clientHeight; }
    if (!viewSize[0]) {
        viewSize[0] = obj.clientWidth;
    }
    if (!viewSize[0]) {
        viewSize[0] = parseInt(obj.style.width);
    }
    if (!viewSize[1]) {
        viewSize[1] = obj.clientHeight;
    }
    if (!viewSize[1]) {
        viewSize[1] = parseInt(obj.style.height);
    }
    if (!viewSize[0] || !viewSize[1]) {
        obj = obj.parentElement;
        while (obj) {
            if (!viewSize[0] && obj.offsetWidth) {
                viewSize[0] = obj.offsetWidth;
            }
            if (!viewSize[1] && obj.offsetHeight) {
                viewSize[1] = obj.offsetHeight;
            }
            if (viewSize[0] && viewSize[1]) {
                break;
            }
            obj = obj.parentElement;
        }
    }
    return viewSize;
}
/**
旋转HTML对象
@param {HtmlElement} div 需要旋转的层
@param {Number} rotate 旋转角度数0-360
@returns {Bool}	如果旋转成功，返回true,否则返回false
*/
SFGlobal.setRotate = function (div, rotate) {
    rotate = Math.round(rotate % 360);//先转化为0-360的整数
    var rad = rotate * Math.PI / 180, style = div.style;
    //如果支持任意类型的Transform
    var proName, typeName = "string";
    if (
        //	typeof(style[(proName="msTransform")])==typeName || 	//旋转之后不支持打印
        typeof (style[(proName = "WebkitTransform")]) == typeName ||
        typeof (style[(proName = "MozTransform")]) == typeName ||
        typeof (style[(proName = "transform")]) == typeName) {
        var transform = (rotate == 0) ? "" : "rotate(" + rotate + "deg)", obj = {};
        obj[proName] = transform
        SFGlobal.setProperty(div.style, obj);
        return true;
    }
    //如果支持滤镜(IE模式)
    if (typeof (style.filter) == "string" && document.body.filters) {
        //使用Matrix滤镜实现旋转
        SFGlobal.setProperty(div.style, { filter: (rotate == 0) ? "" : "progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand',M11=" + Math.cos(rad) + ",M12=" + (-Math.sin(rad)) + ",M21=" + Math.sin(rad) + ",M22=" + Math.cos(rad) + ")" });
        return true;
    }
    return false;
}
/**
设置层在打印时隐藏
@private
@param {HtmlElement} obj 指定的层
*/
SFGlobal.setNoPrint = function (obj) {/*
		if(!SFGlobal._NoPrint)
		{
			var style=obj.ownerDocument.createStyleSheet();
			style.media="print";
			style.addRule(".SF_NoPrint","display:none",-1);
			SFGlobal._NoPrint=style;
		}
		var claName=obj.className;
		if(!claName){claName="";}
		obj.className+=" SF_NoPrint";*/
}
/**
创建一个图片实例，提供这个方法是因为一般的Image对象在IE6以下不支持PNG透明，因此需要有一个公用的方法来以各个浏览器兼容的模式显示图片
@private
@param {String} src	图片的url地址
@param {Json} [config]	图片创建选项
@param {[x,y]} [config.spritePoint]	如果使用CSS Sprites来组合图片，这里指定图片的在整张图片上的位置
@param {[x,y]} [config.spriteSize]	如果使用CSS Sprites来组合图片，这里指定图片的在整张图片上的大小
@param {[x,y]} [config.imageSize]	如果使用CSS Sprites来组合图片，这里指定整张图片的大小
@param {[x,y]} [config.position]	图片的定位
@param {[x,y]} [config.size]	图片的大小
@returns {HtmlElement}
*/
SFGlobal.createImage = function (src, config) {
    config = config ? config : {};
    var img, doc = config.doc || document;
    if (config.spritePoint && (config.spriteSize || config.size)) {//如果使用CSS Sprites来组合图片
        if (!config.spriteSize) { config.spriteSize = config.size; }
        if (!config.size) { config.size = config.spriteSize; }
        img = doc.createElement("div");
        SFGlobal.setProperty(img.style, { overflow: 'hidden', display: 'inline-block' });
        if (img.style.position != "absolute") { img.style.position = "relative"; }
        var size = config.imageSize ? [config.imageSize[0] * config.size[0] / config.spriteSize[0], config.imageSize[1] * config.size[1] / config.spriteSize[1]] : null;
        var spriteImg = SFGlobal.createImage(src, { position: [-config.spritePoint[0] * config.size[0] / config.spriteSize[0], -config.spritePoint[1] * config.size[1] / config.spriteSize[1]], size: size, doc: doc });
        SFGlobal.setProperty(spriteImg.style, { position: 'absolute' });
        img.appendChild(spriteImg);
    }
    else {
        img = doc.createElement("img");
        //在IE7(某些版本)下，有些图片默认有hspace，因此会造成布局问题
        //所以在这里将所有图片的hspace设置为0
        img.hspace = 0;
        SFGlobal.setProperty(img.style, { border: '0px' });
    }
    if (!config.noLoad) { SFGlobal.setImageSrc(img, src); }
    if (config.position) { SFGlobal.setProperty(img.style, { left: config.position[0] + 'px', top: config.position[1] + 'px' }); }
    if (config.size) { SFGlobal.setProperty(img.style, { width: config.size[0] + 'px', height: config.size[1] + 'px' }); }
    return img;
}
/**
设置图片的src，提供这个方法是因为有些时候图片是通过div+滤镜实现的
@private
@param {HtmlElement} img 图片实例
@param {String} src url地址
*/
SFGlobal.setImageSrc = function (img, src) {
    img.src = src;
    var firstChild = img.firstChild;
    while (firstChild) {
        if (firstChild.nodeName != "IMG") {
            firstChild = firstChild.nextSibling
            continue;
        }
        firstChild.src = src;
        break;
    }
}
/**
设置层的背景图，提供这个方法是考虑到拿半透明的PNG做背景的时候部分浏览器不支持
@private
@param {HtmlElement} div 需要设置背景的层
@param {String} src 背景图片URL地址
@param {Json} [config]	背景设置选项
@param {[x,y]} [config.spritePoint]	如果使用CSS Sprites来组合图片，这里指定图片的在整张图片上的位置
@param {Bool} [config.spriteDouble]	如果需要使用两个背景交替的方式实现，则为true
@param {[x,y]} [config.imageSize]	如果使用CSS Sprites来组合图片，这里指定整张图片的大小
@param {Bool} [config.repeat]	背景的重复方法
@param {Bool} [config.canPrint=false] 是不是为了让背景在打印状态下也能显示而做处理
*/
SFGlobal.setBackgroundImage = function (div, src, config) {
    if (!src) {
        SFGlobal.setImageSrc(div, "");
        SFGlobal.setProperty(div.style, { backgroundImage: '' });
        return;
    }
    config = config ? config : {};
    if (config.canPrint) {
        var img = SFGlobal.createImage(src), sizeDiv = img;
        if (config.spritePoint && config.imageSize) {
            sizeDiv = document.createElement("div");
            var isHor = config.repeat == "repeat-x" || config.repeat == "repeat";
            var isVer = config.repeat == "repeat-y" || config.repeat == "repeat";
            SFGlobal.setProperty(img.style, { position: 'relative', border: '0px', width: (isHor ? '100%' : (config.imageSize[0] + "px")), height: (isVer ? '100%' : (config.imageSize[1] + "px")), left: (isHor ? (100 * config.spritePoint[0] / config.imageSize[0] + '%') : (-config.spritePoint[0] + "px")), top: (isVer ? (100 * config.spritePoint[1] / config.imageSize[1] + '%') : (-config.spritePoint[1] + "px")), zIndex: -1 });
            sizeDiv.appendChild(img);
        }
        SFGlobal.setProperty(sizeDiv.style, { position: 'absolute', border: '0px', width: '100%', height: '100%', left: "0px", top: "0px", zIndex: -1, overflow: 'hidden' });
        div.appendChild(sizeDiv);
    }
    else {
        SFGlobal.setProperty(div.style, { backgroundImage: 'url(' + src + ')' });
        if (config.spritePoint) {
            SFGlobal.setProperty(div.style, { backgroundPosition: (-config.spritePoint[0]) + "px " + (-config.spritePoint[1]) + "px" });
        }
    }
    if (config.spriteDouble) {
        var bar = document.createElement("div");
        SFGlobal.setProperty(bar.style, { position: 'absolute', fontSize: '0px', left: '0px', top: '0px', width: '100%', height: '100%', overflow: 'hidden' });
        SFGlobal.setBackgroundImage(bar, src, { canPrint: config.canPrint, spritePoint: (config.repeat == "repeat-x" ? { x: config.imageSize[0] / 2, y: config.spritePoint[1] } : { x: config.spritePoint[0], y: config.imageSize[1] / 2 }), imageSize: config.imageSize, repeat: config.repeat });
        div.appendChild(bar);
    }
}
/*
	SFGlobal.getBase64Char=function(code)
	{
		var ascii=code;
		if(ascii<26){ascii+=65;}//大写字母
		else if(ascii<52){ascii+=71;}//小写字母
		else if(ascii<62){ascii-=6;}//数字
		else if(ascii==63){ascii=47;}
		else{ascii=43;}
		return String.fromCharCode(ascii);
	}
	SFGlobal.getBase64Code=function(chr)
	{
		var ascii=chr.charCodeAt(0);
		if(ascii<44){return 62;}//	字符+
		if(ascii<48){return 63;}//	字符/
		if(ascii<58){return ascii+6;}//数字
		if(ascii<91){return ascii-65;}//大写字母
		return ascii-71;//小写字母
	}
	SFGlobal.getColorByRgb=function(arr)
	{
		var colorStr="#";
		for(var j=0;j<3;j++)
		{
			if(arr[j]<128){colorStr+="0";}
			colorStr+=arr[j].toString(16);
		}
		return colorStr.toUpperCase();
	}
	SFGlobal.getRgbByColor=function(colorStr)
	{
		return [parseInt(colorStr.substr(1,2),16),parseInt(colorStr.substr(3,2),16),parseInt(colorStr.substr(5,2),16)];
	}
	创建一个图片实例
	@private
	@param {String} data	图片的数据
	@param {String} url		如果浏览器不支持uri data，则需要在这里指定图片地址
	@param {String} color	如果需要进行颜色替换，在这里指定替换的颜色
	@returns {HtmlElement}

	SFGlobal.createDataImage=function(data,src,colorReg)
	{
		var img=document.createElement("img");
		if(data && false)
		{
			if(colorReg)
			{
				var width,height,flag,colorIndex,index=8,ratio;
				var code=SFGlobal.getBase64Code(data.charAt(index++));
				width=code<<2;
				code=SFGlobal.getBase64Code(data.charAt(index++));
				width+=code>>4+((code&15)<<4);
				code=SFGlobal.getBase64Code(data.charAt(index++));
				width+=(code>>2)<<8;
				height=(code>>4)<<6;
				code=SFGlobal.getBase64Code(data.charAt(index++));
				height+=code;
				code=SFGlobal.getBase64Code(data.charAt(index++));
				height+=code<<10;
				code=SFGlobal.getBase64Code(data.charAt(index++));
				height+=(code>>4)<<8;
				flag=(code&15)<<4;
				code=SFGlobal.getBase64Code(data.charAt(index++));
				flag+=code>>4;
				colorIndex=(code&3)<<6;
				code=SFGlobal.getBase64Code(data.charAt(index++));
				colorIndex+=code;
				code=SFGlobal.getBase64Code(data.charAt(index++));
				ratio=code<<2;
				code=SFGlobal.getBase64Code(data.charAt(index++));
				ratio+=(code>>4);
				if(flag>>7)//如果存在颜色表
				{
					//取得颜色表个数
					var tabSize=1<<(((flag>>4)&7)+1),colorTab=[],chr2=(code>>4);
					for(var i=0;i<tabSize;i++)
					{
						var color=[0,0,0];
						color[0]=(code&15)<<4;
						code=SFGlobal.getBase64Code(data.charAt(index));
						color[0]+=code>>2;
						color[1]=(code&3)<<6;
						code=SFGlobal.getBase64Code(data.charAt(index+1));
						color[1]+=code;
						code=SFGlobal.getBase64Code(data.charAt(index+2));
						color[2]=code<<2;
						code=SFGlobal.getBase64Code(data.charAt(index+3));
						color[2]+=(code>>4);
						colorTab.push(color);
						if(colorReg[SFGlobal.getColorByRgb(color)])
						{//如果需要替换颜色
							var rgb=SFGlobal.getRgbByColor(colorReg[SFGlobal.getColorByRgb(color)]),regStr="";
							regStr+=SFGlobal.getBase64Char((chr2<<4)+(rgb[0]>>4));
							regStr+=SFGlobal.getBase64Char(((rgb[0]&15)<<2)+(rgb[1]>>6));
							regStr+=SFGlobal.getBase64Char(rgb[1]&63);
							regStr+=SFGlobal.getBase64Char(rgb[2]>>2);
							regStr+=SFGlobal.getBase64Char(((rgb[2]&3)<<4)+(code&15));
							data=data.substr(0,index-1)+regStr+data.substr(index-1+regStr.length)
						}
						chr2=(code>>4);
						index+=4;
					}
				}
			}
			img.src="data:image/gif;base64,"+data;
		}
		else
		{
			img.src="symbol_000000.gif";
			img.style.filter="Mask(color=green)";
		}
		return img;
	}
	*/
window.SFGlobal = SFGlobal;
/**
向日葵甘特图(SFGantt JavaScript API)之中用来进行事件处理的类，该类的所有方法都是静态方法，因此不需要构造该类的实例而直接使用方法即可
@example
SFEvent.addListener(obj,event,handle);
@class
*/
function SFEvent() { }
/**
获取对obj的handle方法的回调函数
@param		{Object} obj	对象
@param	{Function} handle	对象的方法
@returns {Function}	返回一个函数，调用此函数相当于调用obj的handle方法
*/
SFEvent.getCallback = function (obj, handle) { return function () { return handle.apply(obj, arguments) }; }
/**
判断一个对象是不是需要使用浏览器集成的模式来进行事件的触发
@private
@param		{Object} obj	对象
@returns {Bool}	如果是浏览器集成的对象，则返回true,否则返回false
*/
SFEvent.isHtmlControl = function (obj) { return (obj.tagName || obj.nodeName || obj == window); }
/**
返回浏览器的事件
@private
@param		{arguments} argu	根据一个arguments数组返回当前浏览器的Event事件
@returns {Event}	返回事件
*/
SFEvent.getEvent = function (argu) {
    if (!argu) { argu = []; }
    if (!argu[0]) { argu[0] = window.event; }
    if (argu[0] && !argu[0].target && argu[0].srcElement) { argu[0].target = argu[0].srcElement }
    return argu;
}
/**
创建对hObj对象的hMethod方法的事件适配器
@private
@param		{Object} obj	对象
@param	{Function} method	对象的方法
@returns {Function}	返回事件适配器函数
*/
SFEvent.createAdapter = function (obj, method) {
    return function () { method.apply(obj, SFEvent.getEvent(arguments)); }
};
/**
中止windows集成事件处理的执行并返回false
@param		{Event} [e]	浏览器的事件对象
*/
SFEvent.cancelBubble = function (e) {
    e = e ? e : window.event;
    if (!e) { return; }
    if (e.stopPropagation) {
        e.preventDefault();
        e.stopPropagation();
    }
    else {
        e.cancelBubble = true;
        e.returnValue = false
    }
};
/**
中止windows集成事件处理的执行并返回true
@param		{Event} [e]	浏览器的事件对象
*/
SFEvent.returnTrue = function (e) {
    e = e ? e : window.event;
    if (!e) { return; }
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    else {
        e.cancelBubble = true;
        e.returnValue = true;
    }
};
/**
将hObj对象的hMethod方法绑定到obj的event事件，返回一个listener对象
@param		{Object} obj
@param	{String} event	要绑定的事件名称
@param		{Object} hObj
@param	{Function} hMethod
@returns {EventListener}	返回事件监视器
*/
SFEvent.bind = function (obj, event, hObj, hMethod, once) {
    return SFEvent.addListener(obj, event, SFEvent.isHtmlControl(obj) ? SFEvent.createAdapter(hObj, hMethod) : SFEvent.getCallback(hObj, hMethod), once);
};
/**
销毁一个HTML节点，并清除所有在节点上绑定的事件
@private
@param			{HtmlElement} node
@param	{Bool} onlyChild	如果为true则不清除node本身，而是将node所有的子节点清除
*/
SFEvent.deposeNode = function (node, onlyChild) {
    if (!node) { return; }
    if (node.parentNode && !onlyChild) { node.parentNode.removeChild(node); }
    if (!onlyChild) {
        SFEvent.clearListeners(node);
        if (node._SF_E_) { node._SF_E_ = null; }
    }
    var child;
    while (child = node.firstChild) {
        SFEvent.deposeNode(child);
    }
}
/**
根据事件监视器返回一个句柄，指定该事件监视器只会被执行一次就删除监视
@private
@param	{Function} handle
@param {EventListener}	listener 事件监视器
@returns {Function} 返回新的事件句柄
*/
SFEvent.runOnceHandle = function (handle, listener) { return function () { handle.apply(this, arguments); SFEvent.removeListener(listener); } }
/**
将handle函数绑定到obj的event事件，返回一个listener对象
@param		{Object} obj
@param	{String} event	要绑定的事件名称
@param	{Function} handle
@returns {EventListener}	返回事件监视器
*/
SFEvent.addListener = function (obj, event, handle, once) {
    var listener = [obj, event];
    if (once) { handle = SFEvent.runOnceHandle(handle, listener) }
    var type = SFEvent.isHtmlControl(obj);
    if (type) {//如果是HTML控件，则以HTML控件作为对象来运行
        handle = SFEvent.createAdapter(obj, handle);
        if (obj.addEventListener) { obj.addEventListener(event, handle, false); }
        else if (obj.attachEvent) { obj.attachEvent("on" + event, handle); }
        else {//针对onload这种事件
            var oldEvent = obj["on" + event];
            if (typeof (oldEvent) == 'function') {
                obj["on" + event] = function () { oldEvent(); handle(); };
            }
            else {
                obj["on" + event] = handle;
            }
        }
    }
    listener.push(handle);
    if (!obj._SF_E_) { obj._SF_E_ = []; }
    if (!SFGlobal.findInArray(obj._SF_E_, event)) { obj._SF_E_.push(event); }
    if (obj["_SF_E_" + event] && type != "shape") {
        obj["_SF_E_" + event].push(listener);
    }
    else {
        obj["_SF_E_" + event] = (type == "shape") ? [] : [listener];
    }
    if (!SFEvent.allEvents) { SFEvent.allEvents = []; }
    if (event != "unload") { SFEvent.allEvents.push(listener); }
    return listener;
};
/**
删除事件监视器注册
@param	{EventListener} listener	要清除的事件监视器
*/
SFEvent.removeListener = function (listener) {
    if (!listener || listener.length == 0) { return; }
    try {
        if (SFEvent.isHtmlControl(listener[0])) {
            if (listener[0].removeEventListener) {
                listener[0].removeEventListener(listener[1], listener[2], false);
            }
            else if (listener[0].detachEvent) {
                listener[0].detachEvent("on" + listener[1], listener[2]);
            }
            else {
                listener[0]["on" + listener[1]] = null;
            }
        }
    } catch (e) { }
    SFGlobal.deleteInArray(listener[0]["_SF_E_" + listener[1]], listener);
    SFGlobal.deleteInArray(SFEvent.allEvents, listener);
    while (listener.length > 0) { listener.pop() }
};
/**
删除所有事件注册
@param		{Object} obj	要清除事件的对象
@param	{String} event	如果指定了事件名称，则只清除这种事件
*/
SFEvent.clearListeners = function (obj, event) {
    if (!obj || !obj._SF_E_) { return; }
    if (!event) {
        for (var i = obj._SF_E_.length - 1; i >= 0; i--) {
            SFEvent.clearListeners(obj, obj._SF_E_[i]);
        }
        return;
    }
    var listener, listeners = obj["_SF_E_" + event];
    while (listener = listeners.pop()) { SFEvent.removeListener(listener) }
};
/**
删除所有系统之中事件注册
@private
*/
SFEvent.clearAllListeners = function () {
    var listeners = SFEvent.allEvents;
    if (listeners) {
        for (var i = listeners.length - 1; i >= 0; i--) {
            SFEvent.removeListener(listeners[i]);
        }
    }
    SFEvent.allEvents = null;
};
/**
触发obj的event事件，args是触发的参数
@param		{Object} obj	事件触发源
@param	{String} event	要触发的事件名称,如果要捕获所有事件，使用"*"
@param	{Array} args	触发事件所用的参数
@returns {Bool}	事件触发结果，一般只有before类型的事件会有事件触发结果
*/
SFEvent.trigger = function (obj, event, args) {
    if (SFEvent.isHtmlControl(obj)) {
        try {
            if (obj.fireEvent) { obj.fireEvent("on" + event); }
            if (obj.dispatchEvent) { obj.dispatchEvent(event); }
        } catch (e) { }
    }
    if (!args) { args = []; }
    var listeners = obj["_SF_E_" + event];
    if (listeners && listeners.length > 0) {
        for (var i = 0; i < listeners.length; i++) {
            var listener = listeners[i];
            if (listener && listener[2]) {
                listener[2].apply(obj, args);
            }
        }
    }
}
/**
计算层左上角相对于另一个层左上角的位置
@private
@param	{HtmlElement} obj
@param	{HtmlElement} [container=document.body] 默认为整个页面
@returns {[x,y]}
*/
SFEvent.getPageOffset = function (obj, container) {
    var point = [0, 0];
    var a = obj;
    while (a && a.offsetParent && a != container) {
        point[0] += a.offsetLeft;
        point[1] += a.offsetTop;
        a = a.offsetParent
        if (a) {
            point[0] -= a.scrollLeft;
            point[1] -= a.scrollTop;
        }
    }
    return point;
}
/**
计算事件e发生的位置相对于container层左上角的位置
@param	{Event} e
@param	{HtmlElement} container
@returns {[x,y]}
*/
SFEvent.getEventPosition = function (e, container) {
    if (typeof e.clientX != "undefined") {
        var rect = container.getBoundingClientRect();
        return [e.clientX - rect.left, e.clientY - rect.top]
    }
    /*
    if(typeof e.offsetX!="undefined")
    {
        var src=e.target||e.srcElement;
        var offset=[e.offsetX,e.offsetY];
        while(src&&src!=container)
        {
            if(!(src.clientWidth==0 && src.clientHeight==0 && src.offsetParent && src.offsetParent.nodeName=="TD"))
            {
                offset[0]+=src.offsetLeft;
                offset[1]+=src.offsetTop;
            }
            src=src.offsetParent;
            if(src)
            {
                offset[0]-=src.scrollLeft;
                offset[1]-=src.scrollTop;
            }
            else
            {
                var s=SFEvent.getPageOffset(container);
                return [offset[0]-s[0],offset[1]-s[1]];
            }
        }
        return offset;
    }*/
    if (typeof e.pageX != "undefined") {
        var offset = SFEvent.getPageOffset(container);
        return [e.pageX - offset[0], e.pageY - offset[1]];
    }
    return [0, 0];
}
/**
计算事件e发生的位置相对于container层左上角的位置
@private
@param	{Event} e
@param	{HtmlElement} container
@returns {[x,y]}
*/
SFEvent.getEventRelative = function (e, container) {
    return SFEvent.getEventPosition(e, container);
}
/**
根据鼠标事件判断鼠标按下的键
@param	{Event} e
@returns {Number}	1代表左键，2代表右键
*/
SFEvent.getEventButton = function (e) {
    return (document.all && !+'\v1') ? e.button : (e.button == 2 ? 2 : 1);
}
/**
设置HTML层的内容不允许被选中
@param {HtmlElement} obj 指定的层
@private
*/
SFEvent.setUnSelectable = function (obj) {
    if (document.all) {
        obj.unselectable = "on";
        obj.onselectstart = SFEvent.falseFunction
    }
    else {
        obj.style.MozUserSelect = "text";
    }
}
/**
一个简单的返回false的函数
@private
*/
SFEvent.falseFunction = function () {
    return false;
}
/**
初始化事件系统，主要是添加事件监视，以在页面卸载的时候清除所有的事件，避免在IE下出现事件泄漏问题
@private
*/
SFEvent.load = function () {
    if (!SFEvent._ganttUnloadListener) { SFEvent._ganttUnloadListener = SFEvent.addListener(window, "unload", SFEvent.clearAllListeners); }
}
window.SFEvent = SFEvent;
if (!window._obscure) { SFEvent.load() }
/**
向日葵甘特图(SFGantt JavaScript API)之中用用来进行Xml下载和处理的方法,包含ajax方式功能，该类的所有方法都是静态方法，因此不需要构造该类的实例而直接使用方法即可，例如
@example
SFAjax.loadXml(url,handle);
@class
*/
function SFAjax() { }
/**
以跨浏览器支持的方式创建一个HttpRequest对象。
@returns	{HTTPRequest}	返回Http请求实例
*/
SFAjax.createHttpRequest = function () {
    if (window.XMLHttpRequest) {
        return new window.XMLHttpRequest();
    }
    else if (typeof (ActiveXObject) != "undefined") {
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
}
/**
加载指定本地路径的XML文件，并在加载完成后回调handle函数，回调函数handle的参数是返回的Xml文档对象XmlDocument,该方法会通过创建XmlHttpRequest(HTTP GET )来访问XML数据，因此，当访问不在同一个域的资源时，会引起<b>跨域</b>问题，因此，确保仅仅访问和当前页面同域的资源。
@param	{String}	path	XML文件的URL地址
@param	{Function}	handle	执行成功后回调此函数。
@param	{Bool}	[async=false]	如果为true，则执行同步请求，默认为异步请求
@param	{String}	[data]	如果需要执行POST请求，此参数是POST请求的参数,用于大量数据向后台发送。
*/
SFAjax.loadXml = function (path, handle, async, data) {
    var doc;
    if (location.protocol.indexOf("http") != 0 && path.indexOf("http://") != 0) {//这种加载类型只在非http访问的时候使用

        try {
            doc = SFAjax.createDocument();
            doc.load(path);
        }
        catch (e) { }
        if (doc && doc.documentElement) {
            if (handle) {
                handle.apply(null, [doc]);
            }
            doc = null;
            return;
        }
    }
    var request = SFAjax.createHttpRequest(), triggered = false;
    var onReadyStateChange = SFEvent.getCallback(this, function () {
        triggered = true;
        if (request.readyState == 4) {
            var doc = request.responseXML;
            if (!doc.documentElement) {
                doc = SFAjax.createDocument(request.responseText);
            }
            if (!doc || !doc.documentElement) {
                handle();//不管是否成功，都调用此函数
                return;
            }
            if (handle) {
                handle.apply(null, [doc]);
            }
            doc = null;
            SFEvent.clearListeners(request);
            request = null;
        }
    });
    request.onreadystatechange = onReadyStateChange;
    request.open(data ? "POST" : "GET", path, !!async);
    request.send(data ? data : null);
    if (!async && !triggered) {
        onReadyStateChange();
    }
}
/**
通过指定Xml字符串创建Xml文档对象XmlDocument，如果没有指定字符串或者指定的字符串为空，则直接返回一个空内容的XmlDocument
@param	{String} xmlStr	xml内容字符串
@returns {XmlDocument}	返回转化后的XML文档对象
*/
SFAjax.createDocument = function (xmlStr) {
    var doc;
    if (typeof (ActiveXObject) != "undefined")//如果支持ActiveXObject(IE)
    {
        try { doc = new ActiveXObject("Msxml2.DOMDocument"); }
        catch (e) { doc = new ActiveXObject("Msxml.DOMDocument"); }//创建文档对象
        if (xmlStr) {
            doc.loadXML(xmlStr);	//加载字符串
        }
    }
    else {
        if (xmlStr) {
            if (typeof DOMParser != "undefined")	//如果存在DOMParser解析器
            {
                doc = new DOMParser().parseFromString(xmlStr, "text/xml")
            }
        }
        else {
            if (document.implementation && document.implementation.createDocument) {
                doc = document.implementation.createDocument("", "", null);
            }
        }
    }
    return doc;
}
/**
在指定节点的全部有下级节点之中检索一个xpath条件的节点，类似于IE浏览器之中的selectSingleNode,这个方法能同时在更多浏览器之中兼容
@param	{XmlNode|XmlDocument}	node	XML文档或文档节点
@param	{String}	xpath	路径字符串
@returns	{XmlNode}	返回找到的节点，如果没有找到，则返回空数组
*/
SFAjax.selectSingleNode = function (node, xpath) {
    var paths = xpath.split("/");
    for (var i = 0; i < paths.length; i++) {
        if (!node) { return node; }
        var path = paths[i];
        if (path == "..") {
            node = node.parentNode;
            continue;
        }
        var child;
        for (child = node.firstChild; child; child = child.nextSibling) { if (path == "*" || path == child.nodeName) { break; } }
        node = child;
        continue;
    }
    return node;
}
/**
获取节点的内容，例如对于&lt;node>TEXT&lt;/node>,返回字符串"TEXT",相当于IE之中的node.text,这个方法能同时在更多浏览器之中兼容
@param	{XmlNode}	node	XML节点
@returns	{String}	返回节点内容字符串
*/
SFAjax.getNodeValue = function (node) {
    if (!node || typeof (node) != "object") { return node; }
    return node.text ? node.text : (node.childNodes[0] ? node.childNodes[0].nodeValue : "");
}
/**
设置节点的内容
@param	{XmlNode}	node	XML节点
@param	{String}	value	节点内容字符串
*/
SFAjax.setNodeValue = function (node, value) {
    while (node.firstChild) { node.removeChild(node.firstChild) }
    node.appendChild(node.ownerDocument.createTextNode(value));
}
/**
获取一个XMLDocument的XML内容字符串，这个功能用在需要将XMLDocument内容发送到服务端的时候
@param	{XmlDocument}	doc XML文档
@returns {String} XML字符串
*/
SFAjax.getXmlString = function (doc) {
    return doc.xml ? doc.xml : new window.XMLSerializer().serializeToString(doc);
}
/**
在指定节点的后续统计节点之中查找指定名称的的节点，并返回第一个找到的节点
@param	{XmlNode}	child XML节点
@param	{String}	nodeName 节点名称
@returns {XmlNode} 返回找到的第一个节点
*/
SFAjax.getNextSibling = function (child, nodeName) {
    while (child) {
        if (!nodeName || nodeName == child.nodeName) {
            return child;
        }
        child = child.nextSibling;
    }
    return null;
}
/**
进行字符串编码的函数
@private
@param	{String}	str 需要编码的字符串
@param	{String}	[password] 编码的密码
@returns {String} 返回编码的结果
*/
SFAjax.encode = function (str, password) {
    password = password == false ? password : _OBS_Password;
    var passIndex, passLength;
    if (password) {
        passIndex = 0;
        passLength = password.length;
    }
    var num = 0, byt = 0;
    var len = str.length;
    var resultStr = "";
    for (var i = 0; i < len; i++) {
        var code = str.charCodeAt(i);
        if (code >= 2048)		//0800 - FFFF 1110xxxx 10xxxxxx 10xxxxxx 
        {
            byt = (byt << 24) + (((code >> 12) | 0xe0) << 16) + ((((code & 0xfff) >> 6) | 0x80) << 8) + ((code & 0x3f) | 0x80);
            num += 24;
        }
        else if (code >= 128)	//0080 - 07FF 110xxxxx 10xxxxxx 
        {
            byt = (byt << 16) + (((code >> 6) | 0xc0) << 8) + ((code & 0x3f) | 0x80);
            num += 16;
        }
        else			//0000 - 007F 0xxxxxxx 
        {
            num += 8;
            byt = (byt << 8) + code;
        }
        while (num >= 6) {
            var b = byt >> (num - 6);
            byt = byt - (b << (num - 6));
            num -= 6;
            if (password) {
                b = (b + password.charCodeAt(passIndex++)) % 64;
                passIndex = passIndex % passLength;
            }
            /*
                b	0-9		数字0-9		b+48
                b	10-35	字母A-Z		b+65-10=b+55
                b	36-61	字母a-z		b+97-36=b+61
                b	62		字符,		44
                b	63		字符_		95
            */
            var code = (b <= 9) ? (b + 48) : ((b <= 35) ? (b + 55) : ((b <= 61) ? (b + 61) : ((b == 62) ? 44 : 95)));
            resultStr += String.fromCharCode(code);
        }
    }
    if (num > 0) {
        var b = byt << (6 - num);
        if (password) {
            b = (b + password.charCodeAt(passIndex++)) % 64;
            passIndex = passIndex % passLength;
        }

        resultStr += String.fromCharCode((b <= 9) ? (b + 48) : ((b <= 35) ? (b + 55) : ((b <= 61) ? (b + 61) : ((b == 62) ? 44 : 95))));
    }
    return resultStr;
}
/**
进行字符串解码的函数
@private
@param	{String}	str 需要解码的字符串
@param	{String}	[password] 编码的密码
@returns {String} 返回解码的结果
*/
SFAjax.decode = function (str, password) {
    password = password == false ? password : _OBS_Password;
    var passIndex, passLength;
    if (password) {
        passIndex = 0;
        passLength = password.length;
    }
    var num = 0, byt = 0;
    var len = str.length;
    var resultStr = new String();
    var preNum = -1;
    var preIndex = 0;
    for (var i = 0; i < len; i++) {
        var code = str.charCodeAt(i);
        code = (code == 95) ? 63 : ((code == 44) ? 62 : ((code >= 97) ? (code - 61) : ((code >= 65) ? (code - 55) : (code - 48))));
        if (password) {
            code = (code - password.charCodeAt(passIndex++) + 128) % 64;
            passIndex = passIndex % passLength;
        }

        byt = (byt << 6) + code;
        num += 6;
        while (num >= 8) {
            var b = byt >> (num - 8);
            if (preIndex > 0) {
                preNum = (preNum << 6) + (b & (0x3f));
                preIndex--;
                if (preIndex == 0) { resultStr += String.fromCharCode(preNum); }
            }
            else {
                if (b >= 224) {
                    preNum = b & (0xf);
                    preIndex = 2;
                }
                else if (b >= 128) {
                    preNum = b & (0x1f);
                    preIndex = 1;
                }
                else {
                    resultStr += String.fromCharCode(b);
                }
            }
            byt = byt - (b << (num - 8));
            num -= 8;
        }
    }
    return resultStr;
}
window.SFAjax = SFAjax;
/**
向日葵甘特图(SFGantt JavaScript API)之中用来对甘特图进行配置的类，配置的方式可以使用Json，也可以通过类的方法进行配置。
@param {Json} [obj] 用Json格式指定的配置参数
@class
*/
function SFConfig(obj) {
    this.obj = obj ? obj : {};
    this.inited = false;
    if (!obj) { SFConfig.addConfig(this.obj, window._SFGantt_config, false); }
}
/**
根据指定的路径，读取一项配置的值，如果该值不存在，则返回通过dv参数给定的默认值
@param	{String}	path	配置项的名称
@param	{Object}	[dv]	在该项没有被配置时返回的默认值
@returns {Object} 返回配置项的值，该值的类型为任意类型
*/
SFConfig.prototype.getConfig = function (path, dv) {
    if (!this.inited) {
        this.inited = true;
        this.parseWildcard();
    }
    var obj = this.getConfigObj(path);
    return typeof (obj) != "undefined" ? obj : dv
}
/**
获得指定配置项的Json节点
@private
@param	{String}	path	配置项的名称
@returns {Json} 返回该Json节点
*/
SFConfig.prototype.getConfigObj = function (path) {
    if (!this.inited) {
        this.inited = true;
        this.parseWildcard();
    }
    var paths = path.split(new RegExp("[/\\.]"));
    var name, obj = this.obj;
    while (typeof (name = paths.shift()) == "string") {
        if (!name) { continue; }
        if (!obj || typeof (obj) != "object") { break; }
        obj = obj[name];
    }
    return obj;
}
/**
设置一项配置的值
@see <a href="../config.html">配置项列表</a>.
@param	{String}	path	配置项的名称
@param	{Object}	value	配置项的值，任意类型，请参看配置项说明
@param	{Bool}	cover	假如该项已经被配置，此参数指定是否覆盖
*/
SFConfig.prototype.setConfig = function (path, value, cover) {
    var paths = path.split(new RegExp("[/\\.]"));
    var name, obj = this.obj;
    while (name = paths.shift()) {
        if (paths[0]) {
            if (!obj[name] || typeof (obj[name]) != "object") {
                obj[name] = {};
            }
            obj = obj[name];
        }
        else {
            if (cover != false || !obj[name]) {
                obj[name] = value;
            }
        }
    }
}
/**
对内容进行通配符替换的递归函数,这是为了版本生成初始化而进行的
@private
@param	{Json}	obj	配置项的节点Json对象
*/
SFConfig.prototype.parseWildcard = function (obj) {
    if (!obj) { obj = this.obj; }
    if (!obj) { return; }
    for (var key in obj) {
        switch (typeof (obj[key])) {
            case "object":
                this.parseWildcard(obj[key]);
                break;
            case "string":
                if (obj[key].indexOf("${") >= 0) {
                    var config = this;
                    obj[key] = obj[key].replace(new RegExp("\\$\\{([^\\}]+)\\}\\$", "g"), function (a, b) { return config.getConfig(b) });
                }
                break;
        }
    }
}
/**
添加一系列的配置信息，这个函数是一个递归函数
@private
@param	{Json}	obj	配置项的节点Json对象
@param	{Json}	json	要添加的配置信息
@param	{Bool}	cover	当配置项已经存在时，是覆盖，还是忽略，如果为true,则为覆盖
*/
SFConfig.addConfig = function (obj, json, cover) {
    if (!json) { return; }
    for (var key in json) {
        switch (typeof (json[key])) {
            case "function":
                break;
            case "object":
                if (SFEvent.isHtmlControl(json[key])) {
                    obj[key] = json[key];
                    continue;
                }
                if (!obj[key]) { obj[key] = {}; }
                SFConfig.addConfig(obj[key], json[key], cover);
                break;
            default:
                if (cover != false || !obj[key]) {
                    obj[key] = json[key];
                }
                break;
        }
    }
}
/**
将某一项的配置全部应用到一个对象
@private
@param	{Json}	obj	指定的对象
@param	{Json}	json	指定的配置项节点Json对象
*/
SFConfig.applyProperty = function (obj, json) {
    if (!json) { return; }
    for (var key in json) {
        if (typeof (json[key]) == "function") { continue; }
        obj[key] = json[key];
    }
}
/**
@name SFConfig.configItems
@namespace 所有配置项
*/
window.SFConfig = SFConfig;
/**
用来加载图片的对象，在用这种模式来加载重复图片可以避免浏览器重复请求，获得更高的性能，
每个图片加载器对应一个URL
@param {String} src 图片的URL地址
@private
@class
*/
function SFImgLoader(src) {
    this.imgs = [];
    var img = new Image();
    this.img = img;
    SFEvent.bind(img, "load", this, this.onLoad);
    img.src = src;
    if (img.complete) { this.onLoad(); }
}
/**
添加一个图片实例由此对象来管理
@param {Image} img html的Img标签对象
@private
@class
*/
SFImgLoader.prototype.addImg = function (img) {
    this.imgs.push(img);
    if (this.loaded) {
        this.onLoad();
    }
}
/**
在图片加载完成时操作，设置所有标签的地址
@private
@class
*/
SFImgLoader.prototype.onLoad = function () {
    this.loaded = true;
    var img;
    while (img = this.imgs.pop()) {
        if (img.tagName.toLowerCase() == "img") {
            img.src = this.img.src;
        }
        else {
            img.style.backgroundImage = "url(" + this.img.src + ")";
        }
    }
}
/**
销毁此对象
@private
@class
*/
SFImgLoader.prototype.depose = function () {
    this.imgs.length = 0;
    SFEvent.clearListeners(this);
    for (var key in this) { this[key] = null; }
}
/**
设置img标签的src属性，让浏览器开始加载此图片
@param {Image} img html的Img标签对象
@param {String} src 图片的URL地址
@private
@class
*/
SFImgLoader.setImageSrc = function (img, src) {
    if (!SFImgLoader.objs) { SFImgLoader.objs = {}; }
    if (!SFImgLoader.objs[src]) { SFImgLoader.objs[src] = new SFImgLoader(src); }
    SFImgLoader.objs[src].addImg(img);
}
/**
根据节点和路径，销毁指定的节点
@param {Image} img html的Img标签对象
@param {String} src 图片的URL地址
@private
@class
*/
SFImgLoader.depose = function (img, src) {
    if (SFImgLoader.objs) {
        for (var key in SFImgLoader.objs) {
            if (!SFImgLoader.objs[key] instanceof SFImgLoader) { continue; }
            var loader = SFImgLoader.objs[key];
            if (loader) { loader.depose(); }
            SFImgLoader.objs[key] = null;
            delete SFImgLoader.objs[key];
        }
    }
}
window.SFImgLoader = SFImgLoader;
/**
甘特图之中的工作日历定义类
@param {Function} func 函数对象，这个函数接收一个time参数(类型为JavaScript的Date对象)，返回在该时段后的第一段工作时间
@private
@class
*/
function SFWorkingCalendar(func) {
    this.getWorkTime = func;
}
/**
根据名称获取指定的工作日历对象，当前支持以下几种日历类型
<ul>
<li>AnyDay : 不休息周末，每天工作8小时的日历</li>
<li>Standard : 每周六、日休息，每天工作8小时的日历</li>
<li>AnyTime : 没有休息时间，7*24小时工作的日历</li>
</ul>
@param {Name} name 日历类型名称，例如"Standard"
@returns {SFWorkingCalendar} 返回工作日历对象
@private
@class
*/
SFWorkingCalendar.getCalendar = function (name) {
    switch (name) {
        case "AnyDay":
            return new SFWorkingCalendar(SFWorkingCalendar.WT_WeekDay(
                [
                    [[480, 720], [780, 1020]],
                    [[480, 720], [780, 1020]],
                    [[480, 720], [780, 1020]],
                    [[480, 720], [780, 1020]],
                    [[480, 720], [780, 1020]],
                    [[480, 720], [780, 1020]],
                    [[480, 720], [780, 1020]]
                ],
                []
            ));
        case "Standard":
            return new SFWorkingCalendar(SFWorkingCalendar.WT_WeekDay(
                [
                    [],
                    [[480, 720], [780, 1020]],
                    [[480, 720], [780, 1020]],
                    [[480, 720], [780, 1020]],
                    [[480, 720], [780, 1020]],
                    [[480, 720], [780, 1020]],
                    []
                ],
                [
                    //		[new Date(2004,0,2),new Date(2004,0,3),[]],
                    //		[new Date(2004,0,3),new Date(2004,0,4),[[480,720],[780,1020]]]
                ]
            ))
        case "AnyTime":
        default:
            return new SFWorkingCalendar(function () { return [Number.MIN_VALUE, Number.MIN_VALUE]; });
    }
}
/**
根据参数返回按星期工作的日历函数
@param {Json} wds 日历的配置参数
@param {Json} exceptions 日历的配置参数工作日历之中的例外函数
@returns {Function} 返回工作日历的getWorkTime函数
@private
@class
*/
SFWorkingCalendar.WT_WeekDay = function (wds, exceptions) {
    return function (time) {
        return SFWorkingCalendar.WT_WeekDayCal(time, wds, exceptions);
    }
}
/**
在按星期工作的日历之中，根据时间和日历的配置，返回下一个工作时间段
@param {Date} time 时间
@param {Json} wds 日历的配置参数
@param {Json} exceptions 日历的配置参数工作日历之中的例外函数
@returns {Array[startTime,endTime]} 返回下一个工作时间段
@private
@class
*/
SFWorkingCalendar.WT_WeekDayCal = function (time, wds, exceptions) {
    var stv, ds = (time.valueOf() - time.getTimezoneOffset() * 60 * 1000) % (24 * 60 * 60 * 1000);
    var t = time.valueOf() - ds;
    for (var i = 0; i < exceptions.length; i++) {
        var exception = exceptions[i];
        if (exceptions[i][0].valueOf() <= t && exceptions[i][1].valueOf() > time.valueOf())//如果在例外的范围之内
        {
            if (exception[2].length == 0)//如果这段例外不工作,则直接以例外的终点开始重新计算
            {
                return SFWorkingCalendar.WT_WeekDayCal(exceptions[i][1], wds, exceptions);
            }
            //遍历例外的工作时间,如果存在下一个工作时间,则直接返回
            for (var i = 0; i < exception[2].length; i++) {
                var wd = exception[2][i];
                if (ds < wd[1] * 60 * 1000) {
                    return [new Date(t + wd[0] * 60 * 1000), new Date(t + wd[1] * 60 * 1000)];
                }
            }
            //如果没有下一个工作时间,则说明该天的工作时间都已经过去,则以第二天的开头重新开始计算
            return SFWorkingCalendar.WT_WeekDayCal(new Date(t + 24 * 60 * 60 * 1000), wds, exceptions);
        }
    }
    var day = time.getDay();
    for (var i = 0; i < wds[day].length; i++) {
        var wd = wds[day][i];
        if (ds < wd[1] * 60 * 1000) {
            return [new Date(t + wd[0] * 60 * 1000), new Date(t + wd[1] * 60 * 1000)];
        }
    }
    return SFWorkingCalendar.WT_WeekDayCal(new Date(t + 24 * 60 * 60 * 1000), wds, exceptions);
}
window.SFWorkingCalendar = SFWorkingCalendar;
/**
拖拽功能的实现类
@ignore
@private
@class
@param {HtmlElement} div 需要实现拖放的层名称
@param {Function} handle		在拖放过程之中持续调用的方法
@param {HtmlElement} [config.container]	用来计算当前层的位置的父层，默认就是当前层，
@param {Number} [config.interval=256]		触发事件的毫秒数间隔，
@param {Bool} [config.rtp=false]			是否需要即时调整层的位置
*/
function SFDragObject(div, handle, config) {
    SFGlobal.setProperty(this, { div: div, handle: handle, container: div, interval: 256 });
    SFGlobal.setProperty(this, config);
}
/**
@ignore
开始拖拽过程
@private
@param		{Event} e	拖拽开始的鼠标按下事件
*/
SFDragObject.prototype.onMouseDown = function (e) {
    SFEvent.cancelBubble(e);
    var div = this.div, doc = div.ownerDocument;
    if (div.setCapture) { div.setCapture(); }
    var point = SFEvent.getEventPosition(e, this.container);
    SFGlobal.setProperty(this, {
        ml: SFEvent.bind(doc, "mousemove", this, this.onMouseMove),
        ul: SFEvent.bind(doc, "mouseup", this, this.onMouseUp),
        sp: point,
        lp: point,
        timeout: window.setInterval(SFEvent.getCallback(this, this.onTime), this.interval)
    });
    //如果需要即时定位，则先记录下原先的位置
    if (this.rtp) {
        var style = div.style;
        this.dsp = { x: parseInt(style.left), y: parseInt(style.top) }
    }
    this.handle(point, point, "start");
}
/**
@ignore
在move事件发生的时候持续触发
@private
@param		{Event} e	拖拽过程中的鼠标移动事件
*/
SFDragObject.prototype.onMouseMove = function (e) {
    SFEvent.cancelBubble(e);
    var point = SFEvent.getEventPosition(e, this.container), rtp = this.rtp;
    this.lp = point;
    this.moveed = true;
    if (rtp)//如果需要即时定位
    {
        var dsp = this.dsp, sp = this.sp;
        var px = dsp.x + rtp.x * (point.x - sp.x), py = dsp.y + rtp.y * (point.y - sp.y);
        var rtpLimit = this.rtpLimit;
        if (rtpLimit) {
            if (rtpLimit.minX) { px = Math.max(px, rtpLimit.minX); }
            if (rtpLimit.maxX) { px = Math.min(px, rtpLimit.maxX); }
            if (rtpLimit.minY) { py = Math.max(py, rtpLimit.minY); }
            if (rtpLimit.maxY) { py = Math.min(py, rtpLimit.maxY); }
        }
        SFGlobal.setProperty(this.div.style, { left: px + "px", top: py + "px" });
    }
}
/**
@ignore
在指定间隔时间内持续触发
@private
*/
SFDragObject.prototype.onTime = function () {
    if (this.div && this.moveed) {
        this.handle(this.sp, this.lp);
        this.moveed = false;
    }
}
/**
@ignore
结束拖拽过程
@private
@param		{Event} e	拖拽结束的鼠标移动事件
*/
SFDragObject.prototype.onMouseUp = function (e) {
    this.onTime();
    var doc = this.div.ownerDocument;
    SFEvent.cancelBubble(e);
    SFEvent.removeListener(this.ml);
    SFEvent.removeListener(this.ul);
    window.clearInterval(this.timeout);
    delete this.div;
    delete this.container;
    if (doc.releaseCapture) { doc.releaseCapture(); }
    this.handle(this.sp, this.lp, "end");
}
/**
@ignore
设置div层的拖拽逻辑
@private
@param		{HtmlElement} div	允许拖拽的层
@param	{Function} handle	在拖拽开始后持续调用的函数
@param	{HtmlElement} [config.container=div]	用来计算当前层的位置的父层，默认就是当前层，
@param	{Number} [config.interval=256]		触发事件的毫秒数间隔，
@param	{Bool} [config.rtp=false]			是否需要即时调整层的位置
@returns {EventListener} 返回实现此拖拽的事件监视器，清除监视器即可取消拖拽逻辑
*/
SFDragObject.setup = function (div, handle, config) {
    return SFEvent.addListener(div, "mousedown", function (e) {
        if (SFEvent.getEventButton(e) != 1) { return; }
        var obj = new SFDragObject(div, handle, config);
        obj.onMouseDown(e);
    });
}
window.SFDragObject = SFDragObject;
/**
数据管理对象，对甘特数据的任务、资源、链接、分配进行管理
@param {SFDataAdapter} adapter 数据适配器对象，该对象实现SFData和数据源之间的访问接口
@param {SFConfig} [config] 配置参数，这些参数直接影响到数据的表现，其中的大部分设置之后在设置后不能更改
@class
*/
function SFData(adapter, config) {
    config = config ? config : new SFConfig();
    SFConfig.applyProperty(this, config.getConfigObj("SFData"));
    SFGlobal.setProperty(this, { modules: [], adapter: adapter, components: [], rootElement: {}, lastElement: {}, elementUids: {} });
    adapter.initialize();
    this.initialize();
}
/**
数据模块的初始化
@private
*/
SFData.prototype.initialize = function () {
    this.addTreeModule("Task");
    this.addTreeModule("Resource");
    this.addModule("Link");
    this.addModule("Assignment");

    /**
    在任务之间添加一个链接
    @param {SFDataTask} sucTask 链接的后置任务
    @param {SFDataTask} preTask 链接的前置任务
    @param {Number} [type=1] 链接的类型,有以下几种
        <ul>
            <li>0 : 完成-完成(FF);</li>
            <li>1 : 完成-开始(FS);</li>
            <li>2 : 开始-完成(SF);</li>
            <li>3 : 开始-开始(SS);</li>
        </ul>
    @returns {SFDataLink}
    */
    this.addLink = function (sucTask, preTask, type) {
        /**
        判断是否允许添加新链接
        @name SFData.prototype.canAddLink
        @param {SFDataTask} sucTask 链接的后置任务.
        @param {SFDataTask} preTask 链接的前置任务.
        @param {Number} type 链接的类型,有以下几种
            <ul>
                <li>0 : 完成-完成(FF);</li>
                <li>1 : 完成-开始(FS);</li>
                <li>2 : 开始-完成(SF);</li>
                <li>3 : 开始-开始(SS);</li>
            </ul>
        @returns {Bool} 如果能添加返回true,失败返回false
        @function
        */
        /** 
            @event
            @name SFData#beforelinkadd
            @description 在新建一个链接之前触发。
            @param {Json} returnObj 如果设置returnObj.returnValue=false,则代表拒绝添加此链接，此链接就不会被添加.
            @param {SFDataTask} sucTask 链接的后置任务.
            @param {SFDataTask} preTask 链接的前置任务.
            @param {Number} type 链接的类型,有以下几种
                <ul>
                    <li>0 : 完成-完成(FF);</li>
                    <li>1 : 完成-开始(FS);</li>
                    <li>2 : 开始-完成(SF);</li>
                    <li>3 : 开始-开始(SS);</li>
                </ul>
         */
        if (!this.checkEvent("beforelinkadd", [sucTask, preTask, type])) { return false; }
        var link = this.adapter.addLink(sucTask, preTask, type);
        link.PredecessorTask = preTask;
        link.SuccessorTask = sucTask;
        link.Type = type;
        this.registerLink(link);
        /** 
            @event
            @name SFData#afterlinkadd
            @description 在新建一个链接之后触发。
            @param {SFDataLink} link 代表刚刚添加的新链接.
         */
        SFEvent.trigger(this, "afterlinkadd", [link]);
        return link;
    }
    /**
    新建一个资源分配并返回该对象,如果新建失败，则返回null
    @param {SFDataTask} task 分配的任务
    @param {SFDataResource} resource 分配的资源
    @param {Number} unit 资源的占用比例，0-1的小数
    @returns {SFDataAssignment}
    */
    this.addAssignment = function (task, resource, unit) {
        /**
        判断是否允许添加新资源分配
        @name SFData.prototype.canAddAssignment
        @param {SFDataTask} task 分配的任务.
        @param {SFDataTask} resource 分配的资源.
        @param {Number} unit 资源的占用比例，0-1的小数
        @returns {Bool} 如果能添加返回true,失败返回false
        @function
        */
        /** 
            @event
            @name SFData#beforeassignmentadd
            @description 在新建一个资源分配之前触发。
            @param {Json} returnObj 如果设置returnObj.returnValue=false,则代表拒绝添加此资源分配，此资源分配就不会被添加.
            @param {SFDataTask} task 分配的任务.
            @param {SFDataTask} resource 分配的资源.
            @param {Number} unit 资源的占用比例，0-1的小数
         */
        if (!this.checkEvent("beforeassignmentadd", [task, resource, unit])) { return false; }
        var assignment = this.adapter.addAssignment(task, resource, unit);
        assignment.task = task;
        assignment.resource = resource;
        this.registerAssignment(assignment);
        /** 
            @event
            @name SFData#afterassignmentadd
            @description 在新建一个资源分配之后触发。
            @param {SFDataAssignment} assignment 代表刚刚添加的新资源分配.
         */
        SFEvent.trigger(this, "afterassignmentadd", [assignment]);
        return assignment;
    }
    /**
    @private
    注册链接，不过这个函数并不真正将链接注册，因为链接的对应任务可能还没有被读取，
    如果链接确实还有前置或后置任务没有读取，则等到读取的时候再注册链接
    @param {SFDataLink} link 需要注册的链接
    */
    this._registerLink = function (link) {
        if (!link.SuccessorTask) { link.SuccessorTask = this.getTaskByUid(link.SuccessorUID, false); }
        if (!link.PredecessorTask) { link.PredecessorTask = this.getTaskByUid(link.PredecessorUID, false); }
        if (link.SuccessorTask && link.PredecessorTask) {
            this.registerLink(link);
            return;
        }
        if (!this.afterTaskLinks) { this.afterTaskLinks = {}; }
        if (link.SuccessorUID && !link.SuccessorTask) {
            var uid = link.SuccessorUID;
            if (!this.afterTaskLinks[uid]) this.afterTaskLinks[uid] = [];
            this.afterTaskLinks[uid].push(link);
        }
        if (link.PredecessorUID && !link.PredecessorTask) {
            var uid = link.PredecessorUID;
            if (!this.afterTaskLinks[uid]) this.afterTaskLinks[uid] = [];
            this.afterTaskLinks[uid].push(link);
        }
    }
    /**
    @private
    读取指定任务的所有链接，对每个任务只会执行一次
    @param {SFDataTask} task 指定的任务
    */
    this.readTaskLinks = function (task) {
        //在这里采用新的逻辑，如果链接对应的任务没有成功下载，则记录到数组之中
        //在后面任务下载完成之后，再重新处理
        for (var link = this.adapter.readTaskFirstLink(task); link; link = this.adapter.readTaskNextLink(task, link)) {
            this._registerLink(link);
        }
    }
    /**
    @private
    读取指定任务的所有资源分配，对每个任务只会执行一次
    @param {SFDataTask} task 指定的任务
    */
    this.readTaskAssignments = function (task) {
        for (var assignment = this.adapter.readTaskFirstAssignment(task); assignment; assignment = this.adapter.readTaskNextAssignment(task, assignment)) {
            assignment.task = task;
            this.registerAssignment(assignment);
        }
    }
    /**
    @private
    读取指定资源的所有分配，对每个资源只会执行一次
    @param {SFDataResource} resource 指定的资源
    */
    this.readResourceAssignments = function (resource) {
        for (var assignment = this.adapter.readResourceFirstAssignment(resource); assignment; assignment = this.adapter.readResourceNextAssignment(resource, assignment)) {
            assignment.resource = resource;
            this.registerAssignment(assignment);
        }
    }
    //在任务注册的时候，进行链接的注册
    SFEvent.bind(this, "taskregister", this, function (task) {
        var uid = task.UID;
        if (uid && this.afterTaskLinks && this.afterTaskLinks[uid]) {
            var arr = this.afterTaskLinks[uid], link;
            this.afterTaskLinks[uid] = null;
            delete this.afterTaskLinks[uid];
            while (link = arr.pop()) {
                this._registerLink(link);
            }
        }
    });
    //在任务注销的时候，进行链接和资源分配的注销
    SFEvent.bind(this, "taskunregister", this, function (element) {
        var links = element.PredecessorLinks;
        for (var i = links.length - 1; i >= 0; i--) {
            this.unregisterLink(links[i]);
        }
        var links = element.SuccessorLinks;
        for (var i = links.length - 1; i >= 0; i--) {
            this.unregisterLink(links[i]);
        }
        var assignments = element.Assignments;
        for (var i = assignments.length - 1; i >= 0; i--) {
            this.unregisterAssignment(assignments[i]);
        }
    });
    //在资源注销的时候，进行资源分配的注销
    SFEvent.bind(this, "resourceunregister", this, function (element) {
        var assignments = element.Assignments;
        for (var i = assignments.length - 1; i >= 0; i--) {
            this.unregisterAssignment(assignments[i]);
        }
    });
    //在链接注册的时候，将链接添加到任务的链接数组之中
    SFEvent.bind(this, "linkregister", this, function (link) {
        link.SuccessorTask.PredecessorLinks.push(link);
        link.PredecessorTask.SuccessorLinks.push(link);
    });
    //在链接注销的时候，将链接从任务的链接数组之中移除
    SFEvent.bind(this, "linkunregister", this, function (link) {
        SFGlobal.deleteInArray(link.PredecessorTask.SuccessorLinks, link);
        SFGlobal.deleteInArray(link.SuccessorTask.PredecessorLinks, link);
    });
    //检查任务之间是否已经存在链接,如果已经存在链接，则不允许添加
    SFEvent.bind(this, "beforelinkadd", this, function (returnObj, sucTask, preTask) {
        if (!sucTask || !preTask) { return; }
        var links = sucTask.getPredecessorLinks();
        for (var i = links.length - 1; i >= 0; i--) {
            if (links[i].PredecessorTask == preTask) {
                returnObj.returnValue = false;
                return;
            }
        }
        var links = sucTask.getSuccessorLinks();
        for (var i = links.length - 1; i >= 0; i--) {
            if (links[i].PredecessorTask == preTask) {
                returnObj.returnValue = false;
                return;
            }
        }
    });
    //在资源分配注册的时候，将资源分配添加到对应资源的分配数组之中
    SFEvent.bind(this, "assignmentregister", this, function (assignment) {
        (assignment.task = assignment.getTask()).Assignments.push(assignment);
        if ((assignment.resource = assignment.getResource())) { assignment.resource.Assignments.push(assignment); }
    });
    //在资源分配注销的时候，将资源分配从对应资源的分配数组之中移除
    SFEvent.bind(this, "assignmentunregister", this, function (assignment) {
        if (assignment.task) {
            SFGlobal.deleteInArray(assignment.task.Assignments, assignment);
            delete assignment.task;
        }
        if (assignment.resource) {
            SFGlobal.deleteInArray(assignment.resource.Assignments, assignment);
            delete assignment.resource;
        }
    });
    //添加系统集成的插件
    if (this.initComponents) {
        var arr = this.initComponents.split(",")
        for (var i = 0; i < arr.length; i++) {
            this.addComponent(new window[arr[i]]());
        }
    }
}
/**
@private
给数据系统添加常规模块支持，如链接和资源分配
@param {String} type 模块名称
*/
SFData.prototype.addModule = function (type) {
    this.modules.push(type);
    this.elementUids[type] = {};
    this["get" + type + "ByUid"] = function (uid, force) { return this.getElementByUid(type, uid, force); }
    this["update" + type] = function (element, property, value) { return this.updateElement(type, element, property, value); }
    this["register" + type] = function (element) { return this.registerElement(type, element); }
    this["unregister" + type] = function (element) { return this.unregisterElement(type, element); }
    this["add" + type] = function () { var argu = [type]; for (var i = 0; i < arguments.length; i++) { argu.push(arguments[i]); } return this.addElement(argu); }
    this["canAdd" + type] = function () { return this.checkEvent("before" + type + "add", arguments); }
    this["delete" + type] = function (element) { return this.deleteElement(type, element); }
    this["canDelete" + type] = function () { return this.checkEvent("before" + type + "delete", arguments); }
}
/**
@private
给数据系统添加树形模块支持，如任务和资源
@param {String} type 指定的模块名称
*/
SFData.prototype.addTreeModule = function (type) {
    this.addModule(type);
    this["getRoot" + type] = function (item) { return this.getRootElement(type); }
    this["read" + type + "FirstChild"] = function (item) { return this.readElementFirstChild(type, item); }
    this["read" + type + "NextSibling"] = function (item) { return this.readElementNextSibling(type, item); }
    this["get" + type + "ByOutline"] = function (outline) { return this.getElementByOutline(type, outline); }
    this["compare" + type] = function (sItem, eItem) { return this.compareElement(sItem, eItem); }
    this["unregister" + type] = function (element) { return this.unregisterTreeElement(type, element); }
    this["add" + type] = function (parent, pElement) { return this.addTreeElement(type, parent, pElement); }
    this["delete" + type] = function (element) { return this.deleteTreeElement(type, element); }
    this["move" + type] = function (element, pElement, preElement) { return this.moveElement(type, element, pElement, preElement); }
    this["canMove" + type] = function (element, pElement, preElement) { return this.canMoveElement(type, element, pElement, preElement); }

}
/**
@private
返回所有已经加载的模块
@returns {String[]} 返回所有模块名称数组
*/
SFData.prototype.getModules = function () { return this.modules; }
/**
给数据系统添加插件
@param {SFDataAdapter} comp 需要被添加的插件
*/
SFData.prototype.addComponent = function (comp) {
    if (SFGlobal.findInArray(this.components, comp)) { return; }
    comp.initialize(this)
    this.components.push(comp);
}
/**
将插件从系统之中移除
@param {SFDataAdapter} comp 需要被删除的插件
*/
SFData.prototype.removeComponent = function (comp) {
    comp.remove(comp);
    SFGlobal.deleteInArray(this.components, comp);
}
/**
@private
返回当前数据使用的日历对象
@returns {SFWorkingCalendar} 日历对象
*/
SFData.prototype.getCalendar = function () {
    return this.adapter.getCalendar();
}
/**
@private
触发指定事件，并返回结果，通常用在before类型的事件之中
@params {String} eventName 事件名称
@params {Array} argu 事件的参数数组
@returns {Bool} 该事件的返回值
*/
SFData.prototype.checkEvent = function (eventName, argu) {
    var en = eventName;
    var returnObj = { returnValue: true };
    var eventArgu = [returnObj];
    for (var i = 0; i < argu.length; i++) { eventArgu.push(argu[i]); }
    SFEvent.trigger(this, en, eventArgu);
    if (!returnObj.returnValue) { return false; }
    return true;
}
/**
@private
销毁此实例以释放内存
*/
SFData.prototype.depose = function () {
    SFEvent.clearListeners(this);
    for (var key in this) { this[key] = null; }
}
/**
@private
将一个元素注册到数据管理系统之中
@param {String} type 数据类型
@param {SFDataElement} item 需要被添加到系统的元素
*/
SFData.prototype.registerElement = function (type, item) {
    item.data = this;
    var uid = item.UID;
    if (uid) { this.elementUids[type][uid] = item; }
    /** 
        @event
        @name SFData#taskregister
        @description 在一个任务对象注册到SFData(新建或数据读取完成)时触发。
        @param {SFDataTask} task 代表刚刚注册的任务对象.
     */
    /** 
        @event
        @name SFData#resourceregister
        @description 在一个资源对象注册到SFData(新建或数据读取完成)时触发。
        @param {SFDataResource} resource 代表刚刚注册的资源对象.
     */
    /** 
        @event
        @name SFData#linkregister
        @description 在一个链接对象注册到SFData(新建或数据读取完成)时触发。
        @param {SFDataLink} link 代表刚刚注册的链接对象.
     */
    /** 
        @event
        @name SFData#assignmentregister
        @description 在一个资源分配对象注册到SFData(新建或数据读取完成)时触发。
        @param {SFDataAssignment} assignment 代表刚刚注册的资源分配对象.
     */
    SFEvent.trigger(this, type.toLowerCase() + "register", [item]);
}
/**
@private
将一个元素从数据管理系统之中注销
@param {String} type 数据类型
@param {SFDataElement} item 需要被注销的元素
*/
SFData.prototype.unregisterElement = function (type, item) {
    var uid = item.UID;
    if (uid) {
        this.elementUids[type][uid] = null;
        delete this.elementUids[type][uid];
    }
    /** 
        @event
        @name SFData#taskunregister
        @description 在一个任务对象从SFData之中分离时触发(不再由SFData管理，在删除前会执行此操作)。
        @param {SFDataTask} task 代表已经分离的任务对象.
     */
    /** 
        @event
        @name SFData#resourceunregister
        @description 在一个资源对象从SFData之中分离时触发(不再由SFData管理，在删除前会执行此操作)。
        @param {SFDataResource} resource 代表已经分离的资源对象.
     */
    /** 
        @event
        @name SFData#linkunregister
        @description 在一个链接对象从SFData之中分离时触发(不再由SFData管理，在删除前会执行此操作)。
        @param {SFDataLink} link 代表已经分离的链接对象.
     */
    /** 
        @event
        @name SFData#assignmentunregister
        @description 在一个资源分配对象从SFData之中分离时触发(不再由SFData管理，在删除前会执行此操作)。
        @param {SFDataAssignment} assignment 代表已经分离的资源分配对象.
     */
    SFEvent.trigger(this, type.toLowerCase() + "unregister", [item]);
    item.data = null;
}
/**
@private
添加一个新的元素，添加元素的方法通常都被每个数据模块重写
@param {String} type 数据类型
@returns {SFDataElement} 添加的元素
*/
SFData.prototype.addElement = function (type) {
    var argu = [];
    for (var i = 1; i < arguments.length; i++) { argu.push(arguments[i]); }
    if (!this.checkEvent("before" + type.toLowerCase() + "add", argu)) { return false; }
    var newElement = this.adapter["add" + type].apply(this.adapter, argu);
    //因为链接和资源分配的对象都已经重写，因此，此函数实际上无效
    //没有触发任何事件
    SFEvent.trigger(this, "after" + type.toLowerCase() + "add", [newElement]);
    this.registerElement(type, newElement);
    return newElement;
}
/**
判断是否允许删除指定的链接
@name SFData.prototype.canDeleteLink
@param {SFDataLink} link 需要被删除的链接
@returns {Bool} 如果允许返回true，不允许返回false
@function
*/
/**
判断是否允许删除指定的资源分配
@name SFData.prototype.canDeleteAssignment
@param {SFDataAssignment} assignment 需要被删除的资源分配
@returns {Bool} 如果允许返回true，不允许返回false
@function
*/

/**
删除指定的链接
@name SFData.prototype.deleteLink
@param {SFDataLink} link 需要被删除的链接
@returns {Bool} 成功返回true,失败返回false
@function
*/
/**
删除指定的资源分配
@name SFData.prototype.deleteAssignment
@param {SFDataAssignment} assignment 需要被删除的资源分配
@returns {Bool} 成功返回true,失败返回false
@function
*/
/**
删除指定的元素
@private
@param {String} type 数据类型
@param {SFDataElement} element 需要被删除的元素
@returns {Bool} 成功返回true,失败返回false
*/
SFData.prototype.deleteElement = function (type, element) {
    /** 
        @event
        @name SFData#beforelinkdelete
        @description 在删除一个链接之前触发。
        @param {Json} returnObj 如果设置returnObj.returnValue=false,则代表拒绝删除此链接，此链接就不会被删除.
        @param {SFDataLink} link 代表即将删除的链接.
     */
    /** 
        @event
        @name SFData#beforeassignmentdelete
        @description 在删除一个资源分配之前触发。
        @param {Json} returnObj 如果设置returnObj.returnValue=false,则代表拒绝删除此资源分配，此资源分配就不会被删除.
        @param {SFDataLink} link 代表即将删除的资源分配.
     */
    if (!this.checkEvent("before" + type.toLowerCase() + "delete", [element])) { return false; }
    this.unregisterElement(type, element);
    this.adapter["delete" + type](element);
    /** 
        @event
        @name SFData#afterlinkdelete
        @description 在删除一个链接之后触发。
        @param {SFDataLink} link 代表已经被删除的链接对象.
     */
    /** 
        @event
        @name SFData#afterassignmentdelete
        @description 在删除一个资源分配之后触发。
        @param {SFDataAssignment} assignment 代表已经被删除的资源分配对象.
     */
    SFEvent.trigger(this, "after" + type.toLowerCase() + "delete", [element]);
    return true;
}
/**
返回文档根任务，文档根任务应该是ID=0并且在甘特图上不显示的一个任务
@name SFData.prototype.getRootTask
@returns {SFDataTask}
@function
*/
/**
返回文档根资源，文档根资源应该是ID=0并且在甘特图上不显示的一个资源
@name SFData.prototype.getRootResource
@returns {SFDataResource}
@function
*/
/**
返回文档根元素，文档根元素应该是ID=0并且在甘特图上不显示的一个元素
@private
@param {String} type 数据类型
@returns {SFDataElement}
*/
SFData.prototype.getRootElement = function (type) {
    var t = this.rootElement[type]
    if (!t) {
        t = this.rootElement[type] = this.adapter["readRoot" + type]();
        if (t) { this.registerElement(type, t); }
    }
    return t;
}
/**
@private
读取第一个子节点对象，只有在没有读取过的时候才进行读取
@param {String} type 数据类型
@param {SFDataElement} element 元素
@returns {SFDataElement} 元素的第一个子元素
*/
SFData.prototype.readElementFirstChild = function (type, element) {
    if (!element.firstChild) {
        var t = element.firstChild = this.adapter["read" + type + "FirstChild"](element);
        if (t) {
            t.parent = element;
            this.registerElement(type, t);
        }
    }
    return element.firstChild;
}
/**
@private
读取取元素的下一个兄弟元素，只有在没有读取过的时候才进行读取
@param {String} type 数据类型
@param {SFDataElement} element 元素
@returns {SFDataElement} 任务的下一个任务
*/
SFData.prototype.readElementNextSibling = function (type, element) {
    if (element == this.getRootElement(type)) { return null; }
    if (!element.nextSibling) {
        var t = element.nextSibling = this.adapter["read" + type + "NextSibling"](element);
        if (t) {
            t.previousSibling = element;
            t.parent = element.parent;
            this.registerElement(type, element.nextSibling);
        }
    }
    return element.nextSibling;
}
/**
根据指定的任务UID返回该任务
@name SFData.prototype.getTaskByUid
@param {String} uid 该任务的UID值
@param {Bool} [force=false] 是否强制查询，如果为false,只在当前已经加载的数据之中查找
@returns {SFDataTask}
@function
*/

/**
根据指定的资源UID返回该资源
@name SFData.prototype.getResourceByUid
@param {String} uid 该资源的UID值
@param {Bool} [force=false] 是否强制查询，如果为false,只在当前已经加载的数据之中查找
@returns {SFDataResource}
@function
*/

/**
根据指定的链接UID返回该链接
@name SFData.prototype.getLinkByUid
@param {String} uid 该链接的UID值
@param {Bool} [force=false] 是否强制查询，如果为false,只在当前已经加载的数据之中查找
@returns {SFDataLink}
@function
*/

/**
根据指定的资源分配记录UID返回该记录
@name SFData.prototype.getAssignmentByUid
@param {String} uid 该记录的UID值
@param {Bool} [force=false] 是否强制查询，如果为false,只在当前已经加载的数据之中查找
@returns {SFDataAssignment}
@function
*/

/**
用来实现根据UID查找元素的函数
@private
@param {String} type 数据类型
@param {String} uid 该资源的UID值
@param {Bool} [force=false] 是否强制查询，如果为false,只在当前已经加载的数据之中查找
@returns {SFDataElement}
*/
SFData.prototype.getElementByUid = function (type, uid, force) {
    var element = this.elementUids[type][uid];
    if (element || force === false) { return element; }
    if (!this.lastElement[type]) { this.lastElement[type] = this.getRootElement(type); }
    while (this.lastElement[type] = this.lastElement[type].getNext()) {
        if (this.lastElement[type].UID == uid) {
            return this.lastElement[type];
        }
    }
    return null;
}
/**
根据大纲来查找任务
@name SFData.prototype.getTaskByOutline
@param {String} outline 大纲，如"1.2.1.4"
@returns {SFDataTask}
@function
*/
/**
根据大纲来查找资源
@name SFData.prototype.getResourceByOutline
@param {String} outline 大纲，如"1.2.1.4"
@returns {SFDataResource}
@function
*/
/**
@private
根据大纲来查找元素
@param {String} type 数据类型
@param {String} outline 大纲，如"1.2.1.4"
@returns {SFDataElement} 查找到的对应元素，如果没有找到，则返回null
*/
SFData.prototype.getElementByOutline = function (type, outline) {
    var element = this.getRootElement(type);
    if (!outline) { return element; }
    return this.searchElementOutline(type, element, outline.split("."));
}
/**
@private
根据子大纲来查找子元素,这个函数用来通过递归完成getElementByOutline的方法
@param {String} type 数据类型
@param {String} outline 子大纲，如"1.4"
@returns {SFDataElement} 查找到的对应子元素，如果没有找到，则返回null
*/
SFData.prototype.searchElementOutline = function (type, element, outline) {
    if (outline.length == 0) { return element }
    var child = element.getFirstChild(), index = outline.shift();
    for (var i = 1; i < index; i++) {
        child = child.getNextSibling();
    }
    return this.searchElementOutline(type, child, outline);
}
/**
比较两个任务在任务树之中的上下顺序
@name SFData.prototype.compareTask
@param {SFDataTask} startTask 任务1
@param {SFDataTask} endTask 任务2
@returns {Number} 如果任务1确实是在任务2之前，则返回1，否则返回-1
@function
*/
/**
比较两个资源在资源树之中的上下顺序
@name SFData.prototype.compareResource
@param {SFDataResource} startResource 资源1
@param {SFDataResource} endResource 资源2
@returns {Number} 如果资源1确实是在资源2之前，则返回1，否则返回-1
@function
*/
/**
@private
比较两个元素在XML树之中的上下顺序
@param {SFDataElement} startElement 元素1
@param {SFDataElement} endElement 元素2
@returns {Number} 如果元素1确实是在元素2之前，则返回1，否则返回-1
*/
SFData.prototype.compareElement = function (startElement, endElement) {
    var sArr = startElement.getOutlineNumber(this).split(".");
    var eArr = endElement.getOutlineNumber(this).split(".");
    var min = Math.min(sArr.length, eArr.length);
    for (var i = 0; i < min; i++) {
        if (sArr[i] * 1 < eArr[i] * 1) { return 1; }
        if (sArr[i] * 1 > eArr[i] * 1) { return -1; }
    }
    if (sArr.length == eArr.length) { return 0; }
    return (sArr.length < eArr.length) ? 1 : -1;
}
/**
修改任务的属性
@name SFData.prototype.updateTask
@param {SFDataTask} 被修改的任务
@param {String} property 属性名称
@param {variant} value 修改后的新值，任意类型
@function
*/
/**
修改资源的属性
@name SFData.prototype.updateResource
@param {SFDataResource} 被修改的资源
@param {String} property 属性名称
@param {variant} value 修改后的新值，任意类型
@function
*/
/**
修改链接的属性
@name SFData.prototype.updateLink
@param {SFDataLink} 被修改的链接
@param {String} property 属性名称
@param {variant} value 修改后的新值，任意类型
@function
*/
/**
修改资源分配的属性
@name SFData.prototype.updateAssignment
@param {SFDataAssignment} 被修改的资源分配
@param {String} property 属性名称
@param {variant} value 修改后的新值，任意类型
@function
*/
/**
@private
修改元素的属性
@param {String} type 数据类型
@param {SFDataElement} 被修改的元素
@param {String} property 属性名称
@param {variant} value 修改后的新值，任意类型
*/
SFData.prototype.updateElement = function (type, element, property, value) {
    this.adapter["update" + type](element, property, value);
}
/**
在指定的位置插入一个新任务,并返回新插入的任务,如果插入失败，则返回null
@name SFData.prototype.addTask
@param {SFDataTask} parent 新任务的父任务
@param {SFDataTask} [pTask] 新任务的前一个兄弟任务,如果新任务是父任务的第一个子任务，则为null
@returns {SFDataTask}
@function
*/
/**
在指定的位置插入一个新资源,并返回新插入的资源,如果插入失败，则返回null
@name SFData.prototype.addResource
@param {SFDataResource} parent 新资源的父资源
@param {SFDataResource} [pResource] 新资源的前一个兄弟资源,如果新资源是父资源的第一个子资源，则为null
@returns {SFDataResource}
@function
*/

/**
在指定的位置插入一个新元素,并返回新插入的元素,如果插入失败，则返回null
@private
@param {String} type 数据类型
@param {SFDataTask} parent 新元素的父元素
@param {SFDataTask} [pElement] 新元素的前一个兄弟元素,如果新元素是父元素的第一个子元素，则为null
@returns {SFDataElement}
*/
SFData.prototype.addTreeElement = function (type, parent, pElement) {
    /**
    判断是否允许添加新任务
    @name SFData.prototype.canAddTask
    @param {SFDataTask} parent 新任务的父任务.
    @param {SFDataTask} pTask 新任务的前一个兄弟节点任务，如果新任务是其父任务的第一个子任务，则为null.
    @returns {Bool} 如果能添加返回true,失败返回false
    @function
    */
    /**
    判断是否允许添加新资源
    @name SFData.prototype.canAddResource
    @param {SFDataResource} parent 新资源的父资源.
    @param {SFDataResource} pResource 新资源的前一个兄弟节点资源，如果新资源是其父资源的第一个子资源，则为null.
    @returns {Bool} 如果能添加返回true,失败返回false
    @function
    */
    /** 
        @event
        @name SFData#beforetaskadd
        @description 在新建一个任务之前触发。
        @param {Json} returnObj 如果设置returnObj.returnValue=false,则代表拒绝在此处添加任务，此任务就不会被添加.
        @param {SFDataTask} parent 新任务的父任务.
        @param {SFDataTask} pTask 新任务的前一个兄弟节点任务，如果新任务是其父任务的第一个子任务，则为null.
     */
    /** 
        @event
        @name SFData#beforeresourceadd
        @description 在新建一个资源之前触发。
        @param {Json} returnObj 如果设置returnObj.returnValue=false,则代表拒绝在此处添加资源，此资源就不会被添加.
        @param {SFDataResource} parent 新资源的父资源.
        @param {SFDataResource} pResource 新资源的前一个兄弟节点资源，如果新资源是其父资源的第一个子资源，则为null.
     */
    if (!this.checkEvent("before" + type.toLowerCase() + "add", [parent, pElement])) { return false; }
    if (!parent.getFirstChild()) {
        parent.setProperty("Summary", true);
    }
    var newElement = this.adapter["add" + type](parent, pElement);
    newElement.parent = parent;
    //计算出任务之间的关系
    if (!pElement) {
        newElement.previousSibling = null;
        newElement.nextSibling = parent.getFirstChild();
        if (newElement.nextSibling) {
            newElement.nextSibling.previousSibling = newElement;
        }
        parent.firstChild = newElement;
    }
    else {
        newElement.previousSibling = pElement;
        newElement.nextSibling = pElement.getNextSibling();
        if (newElement.nextSibling) {
            newElement.nextSibling.previousSibling = newElement;
        }
        pElement.nextSibling = newElement;
    }
    this.registerElement(type, newElement);
    /** 
        @event
        @name SFData#aftertaskadd
        @description 在新建一个任务之后触发。
        @param {SFDataTask} newTask 代表刚刚添加的新任务.
     */
    /** 
        @event
        @name SFData#afterresourceadd
        @description 在新建一个资源之后触发。
        @param {SFDataResource} newResource 代表刚刚添加的新资源.
     */
    SFEvent.trigger(this, "after" + type.toLowerCase() + "add", [newElement]);
    return newElement;
}
/**
判断是否允许删除指定的任务
@name SFData.prototype.canDeleteTask
@param {SFDataTask} task 需要被删除的任务
@returns {Bool} 如果允许返回true，不允许返回false
@function
*/
/**
判断是否允许删除指定的资源
@name SFData.prototype.canDeleteResource
@param {SFDataResource} resource 需要被删除的资源
@returns {Bool} 如果允许返回true，不允许返回false
@function
*/
/**
删除指定的任务,如果该任务存在子任务，则所有的子任务也会被删除
@name SFData.prototype.deleteTask
@param {SFDataTask} task 需要被删除的任务
@returns {Bool} 成功返回true,失败返回false
@function
*/
/**
删除指定的资源,如果该资源存在子资源，则所有的子资源也会被删除
@name SFData.prototype.deleteResource
@param {SFDataResource} resource 需要被删除的资源
@returns {Bool} 成功返回true,失败返回false
@function
*/

/**
删除指定的元素,如果该元素存在子元素，则所有的子元素也会被删除
@private
@param {String} type 数据类型
@param {SFDataElement} element 需要被删除的元素
@returns {Bool} 成功返回true,失败返回false
*/
SFData.prototype.deleteTreeElement = function (type, element) {
    /** 
        @event
        @name SFData#beforetaskdelete
        @description 在删除一个任务之前触发。
        @param {Json} returnObj 如果设置returnObj.returnValue=false,则代表拒绝删除此任务，此任务就不会被删除.
        @param {SFDataTask} task 代表即将删除的任务.
     */
    /** 
        @event
        @name SFData#beforeresourcedelete
        @description 在删除一个资源之前触发。
        @param {Json} returnObj 如果设置returnObj.returnValue=false,则代表拒绝删除此资源，此资源就不会被删除.
        @param {SFDataResource} resource 代表即将删除的资源.
     */
    if (!this.checkEvent("before" + type.toLowerCase() + "delete", [element])) { return false; }
    var parent = element.getParent(), pt = element.getPreviousSibling(), nt = element.getNextSibling();//先记录下该值
    if (pt) { pt.nextSibling = nt; }
    if (nt) { nt.previousSibling = pt; }
    if (parent) {
        if (parent.getFirstChild() == element) { parent.firstChild = nt; }
        parent.setProperty("Summary", !!parent.getFirstChild());
    }
    element.previousSibling = null;
    element.nextSibling = null;
    this.adapter["delete" + type](element);
    this.unregisterTreeElement(type, element)
    /** 
        @event
        @name SFData#aftertaskdelete
        @description 在删除一个任务之后触发，第一个参数是被删除的任务对象，后两个参数是用来代表被删除任务原来的位置
        @param {SFDataTask} task 代表已经被删除任务.
        @param {SFDataTask} parent 已删除任务的父任务.
        @param {SFDataTask} pTask 已删除任务的前一个兄弟节点任务，如果被删除的任务原来是其父任务的第一个子任务，则为null.
     */
    /** 
        @event
        @name SFData#afterresourcedelete
        @description 在删除一个资源之后触发，第一个参数是被删除的资源对象，后两个参数是用来代表被删除资源原来的位置
        @param {SFDataResource} resource 代表已经被删除资源.
        @param {SFDataResource} parent 已删除资源的父资源.
        @param {SFDataResource} pResource 已删除资源的前一个兄弟节点资源，如果被删除的资源原来是其父资源的第一个子资源，则为null.
     */
    SFEvent.trigger(this, "after" + type.toLowerCase() + "delete", [element, parent, pt]);
    return true;
}
/**
@private
将树形元素从数据系统中注销
@param {String} type 数据类型
@param {SFDataElement} element 元素
*/
SFData.prototype.unregisterTreeElement = function (type, element) {
    var child = element.firstChild;
    element.firstChild = null;
    while (child) {
        this.unregisterTreeElement(type, child);
        var c = child.nextSibling;
        child.nextSibling = null;
        child.previousSibling = null;
        child.parent = null;
        child = c;
    }
    this.unregisterElement(type, element);
}
/**
移动一个任务
@name SFData.prototype.moveTask
@param {SFDataTask} task 需要被移动的任务
@param {SFDataTask} pTask 新位置的父任务
@param {SFDataTask} preTask 新位置的前一个兄弟节点任务，如果新位置是父任务的第一个子任务，则为null
@returns {Bool} 成功返回true,失败返回false
@function
*/
/**
移动一个资源
@name SFData.prototype.moveResource
@param {SFDataResource} resource 需要被移动的资源
@param {SFDataResource} pResource 新位置的父资源
@param {SFDataResource} preResource 新位置的前一个兄弟节点资源，如果新位置是父资源的第一个子资源，则为null
@returns {Bool} 成功返回true,失败返回false
@function
*/

/**
移动一个元素。升级、降级、拖动改变位置都可以使用本方法
@private
@param {String} type 数据类型
@param {SFDataElement} element 需要被移动的元素
@param {SFDataElement} pElement 新位置的父元素
@param {SFDataElement} preElement 新位置的前一个兄弟节点元素，如果新位置是父元素的第一个子元素，则为null
@returns {Bool} 成功返回true,失败返回false
*/
SFData.prototype.moveElement = function (type, element, pElement, preElement) {
    if (!this.canMoveElement(type, element, pElement, preElement)) { return false; }
    //下面切断该任务群和原有位置的所有关联
    var parent = element.getParent(), previousSibling = element.getPreviousSibling(), nextSibling = element.getNextSibling();//先记录下该值
    if (parent.getFirstChild() == element) {
        parent.firstChild = nextSibling;
        if (!nextSibling) { parent.setProperty("Summary", false); }
    }
    element.parent = null;
    if (previousSibling) {
        previousSibling.nextSibling = nextSibling;
        element.previousSibling = null;
    }
    if (nextSibling) {
        nextSibling.previousSibling = previousSibling;
        element.nextSibling = null;
    }
    //下面建立该任务群和新位置的所有关联
    element.parent = pElement;
    element.previousSibling = preElement;
    if (preElement) {
        element.nextSibling = preElement.getNextSibling();
        preElement.nextSibling = element;
    }
    else {
        element.nextSibling = pElement.getFirstChild();
        pElement.firstChild = element;
    }
    if (element.nextSibling) { element.nextSibling.previousSibling = element; }
    //下面开始更新大纲级别
    pElement.setProperty("Summary", true);
    this.adapter["move" + type](element, parent, previousSibling);
    /** 
        @event
        @name SFData#aftertaskmove
        @description 在移动一个任务之后触发
        @param {SFDataTask} task 被移动的任务.
        @param {SFDataTask} parent 原位置的父任务.
        @param {SFDataTask} pTask 原位置的前一个兄弟节点任务，如果被移动的任务原来是其父任务的第一个子任务，则为null.
     */
    /** 
        @event
        @name SFData#afterresourcemove
        @description 在移动一个资源之后触发
        @param {SFDataResource} resource 被移动的资源.
        @param {SFDataResource} parent 原位置的父资源.
        @param {SFDataResource} pResource 原位置的前一个兄弟节点资源，如果被移动的资源原来是其父资源的第一个子资源，则为null.
     */
    SFEvent.trigger(this, "after" + type.toLowerCase() + "move", [element, parent, previousSibling]);
    return true;
}

/**
检查任务是否可以移动
@param {SFDataTask} task 代表即将被移动的任务
@param {SFDataTask} [pTask] 移动至新位置的父任务
@param {SFDataTask} [preTask] 移动至新位置的前一个兄弟节点任务，如果新位置是其父任务的第一个子任务，则为null
@returns {Bool} 如果可以移动，返回true
*/
/**
检查资源是否可以移动
@param {String} type 数据类型
@param {SFDataResource} resource 代表即将被移动的资源
@param {SFDataResource} [pResource] 移动至新位置的父资源
@param {SFDataResource} [preResource] 移动至新位置的前一个兄弟节点资源，如果新位置是其父资源的第一个子资源，则为null
@returns {Bool} 如果可以移动，返回true
*/

/**
@private
检查元素是否可以移动
@param {String} type 数据类型
@param {SFDataElement} element 代表即将被移动的元素
@param {SFDataElement} [pElement] 移动至新位置的父元素
@param {SFDataElement} [preElement] 移动至新位置的前一个兄弟节点元素，如果新位置是其父元素的第一个子元素，则为null
@returns {Bool} 如果可以移动，返回true
*/
SFData.prototype.canMoveElement = function (type, element, pElement, preElement) {
    if (!pElement && preElement) { pElement = preElement.getParent(); }
    if (!pElement) { pElement = this.getRootElement(type); }
    if (preElement && preElement.getParent() != pElement) {
        return false;
    }
    //检查包含关系，如果element包含parent，不允许移动
    if (element.contains(pElement)) {
        return false;
    }
    /** 
        @event
        @name SFData#beforetaskmove
        @description 在移动一个任务之前触发。
        @param {Json} returnObj 如果设置returnObj.returnValue=false,则代表拒绝移动此任务，此任务就不会被移动.
        @param {SFDataTask} task 代表即将被移动的任务
        @param {SFDataTask} parent 移动至新位置的父任务
        @param {SFDataTask} pTask 移动至新位置的前一个兄弟节点任务，如果新位置是其父任务的第一个子任务，则为null
     */
    /** 
        @event
        @name SFData#beforeresourcemove
        @description 在移动一个资源之前触发。
        @param {Json} returnObj 如果设置returnObj.returnValue=false,则代表拒绝移动此资源，此资源就不会被移动.
        @param {SFDataResource} resource 代表即将被移动的资源
        @param {SFDataResource} parent 移动至新位置的父资源
        @param {SFDataResource} pResource 移动至新位置的前一个兄弟节点资源，如果新位置是其父资源的第一个子资源，则为null
     */
    //对此操作进行审核
    if (!this.checkEvent("before" + type.toLowerCase() + "move", [element, pElement, preElement])) { return false; }
    return true;
}
window.SFData = SFData;
/**
数据元素对象，是任务、链接、资源和资源分配等元素的基类
@class
*/
function SFDataElement() { }
/**
获取元素的属性
@param {String} name 属性的名称
@returns {variant} 返回属性的值
*/
SFDataElement.prototype.getProperty = function (name) { return this[name]; }
/**
设置元素的属性
@param {String} name 属性的名称
@param {variant} value 属性的新值
*/
SFDataElement.prototype.setProperty = function (name, value) {
    var a = (typeof (this[name]) == "object" && value) ? this[name].valueOf() : this[name];
    var b = (typeof (value) == "object" && value) ? value.valueOf() : value;
    if (a == b) { return true; }
    if (!this.canSetProperty(name, value)) { return false; }
    var beforeValue = this[name];
    this[name] = value;
    if (!this.data) { return true }//如果没有完成初始化，则直接退出
    if (this.data["update" + this.elementType]) { this.data["update" + this.elementType](this, name, value); }
    //如果是UID变化，则重新注册UID
    if (name == "UID") {
        var uids = this.data.elementUids[this.elementType];
        if (beforeValue) { delete uids[beforeValue]; }
        if (value) { uids[value] = this; }
    }
    SFEvent.trigger(this.data, "after" + this.elementType.toLowerCase() + "change", [this, name, value, beforeValue]);
    var bp = {}, ap = {};
    bp[name] = beforeValue;
    ap[name] = value
    /** 
        @event
        @name SFData#aftertaskchange
        @description 在任务属性修改之后触发
        @param {Json} returnObj 如果设置returnObj.returnValue=false,则代表修改此属性，此属性就不会被修改.
        @param {SFDataTask} task 表示被修改的任务.
        @param {String} name 修改字段的名称.
        @param {variant} value 修改后的新值，任意类型
        @param {variant} beforeValue 修改之前的旧值，任意类型
     */
    /** 
        @event
        @name SFData#afterresourcechange
        @description 在资源属性修改之后触发
        @param {Json} returnObj 如果设置returnObj.returnValue=false,则代表修改此属性，此属性就不会被修改.
        @param {SFDataResource} resource 表示被修改的资源.
        @param {String} name 修改字段的名称.
        @param {variant} value 修改后的新值，任意类型
        @param {variant} beforeValue 修改之前的旧值，任意类型
     */
    /** 
        @event
        @name SFData#afterlinkchange
        @description 在链接属性修改之后触发
        @param {Json} returnObj 如果设置returnObj.returnValue=false,则代表修改此属性，此属性就不会被修改.
        @param {SFDataLink} link 表示被修改的链接.
        @param {String} name 修改字段的名称.
        @param {variant} value 修改后的新值，任意类型
        @param {variant} beforeValue 修改之前的旧值，任意类型
     */
    /** 
        @event
        @name SFData#afterassignmentchange
        @description 在资源分配属性修改之后触发
        @param {Json} returnObj 如果设置returnObj.returnValue=false,则代表修改此属性，此属性就不会被修改.
        @param {SFDataAssignment} assignment 表示被修改的资源分配.
        @param {String} name 修改字段的名称.
        @param {variant} value 修改后的新值，任意类型
        @param {variant} beforeValue 修改之前的旧值，任意类型
     */
    SFEvent.trigger(this.data, "after" + this.elementType.toLowerCase() + "update", [this, [name], ap, bp]);
    return true;
}
/**
判断元素的指定属性是否可写，例如元素如果被设置为ReadOnly，则所有的字段都不可写
@param {String} name 属性的名称
@param {variant} [value] 如果加上这个参数，还可以判断是否将该属性可以设置为指定的值
@returns {Bool} 如果可写，则为true
*/
SFDataElement.prototype.canSetProperty = function (name, value) {
    //如果一个实例还没有完成初始化，则直接退出
    if (!this.data) { return true; }
    /** 
        @event
        @name SFData#beforetaskchange
        @description 在任务属性被修改之前触发
        @param {Json} returnObj 如果设置returnObj.returnValue=false,则代表修改此属性，此属性就不会被修改.
        @param {SFDataTask} task 表示被修改的任务.
        @param {String} name 修改字段的名称.
        @param {variant} value 修改后的新值，任意类型
     */
    /** 
        @event
        @name SFData#beforeresourcechange
        @description 在资源属性被修改之前触发
        @param {Json} returnObj 如果设置returnObj.returnValue=false,则代表修改此属性，此属性就不会被修改.
        @param {SFDataResource} resource 表示被修改的资源.
        @param {String} name 修改字段的名称.
        @param {variant} value 修改后的新值，任意类型
     */
    /** 
        @event
        @name SFData#beforelinkchange
        @description 在链接属性被修改之前触发
        @param {Json} returnObj 如果设置returnObj.returnValue=false,则代表修改此属性，此属性就不会被修改.
        @param {SFDataLink} link 表示被修改的链接.
        @param {String} name 修改字段的名称.
        @param {variant} value 修改后的新值，任意类型
     */
    /** 
        @event
        @name SFData#beforeassignmentchange
        @description 在资源分配属性被修改之前触发
        @param {Json} returnObj 如果设置returnObj.returnValue=false,则代表修改此属性，此属性就不会被修改.
        @param {SFDataAssignment} assignment 表示被修改的资源分配.
        @param {String} name 修改字段的名称.
        @param {variant} value 修改后的新值，任意类型
     */
    return this.data.checkEvent("before" + this.elementType.toLowerCase() + "change", [this, name, value]);
}
/**
树形结构数据元素对象，是任务、资源的基类
@class
@extends SFDataElement
*/
function SFDataTreeElement() { }
SFDataTreeElement.prototype = new SFDataElement();
/**
获得指定元素的第一个子元素
@returns {SFDataTreeElement}
*/
SFDataTreeElement.prototype.getFirstChild = function () {
    if (typeof (this.firstChild) == "undefined") {
        this.firstChild = this.data.readElementFirstChild(this.elementType, this);
    }
    return this.firstChild;
}
/**
获得指定元素的父元素
@returns {SFDataTreeElement}
*/
SFDataTreeElement.prototype.getParent = function () {
    return this.parent;
}
/**
获得指定元素的上一个同级元素
@returns {SFDataTreeElement}
*/
SFDataTreeElement.prototype.getPreviousSibling = function () {
    return this.previousSibling;
}
/**
获得指定元素的下一个同级元素
@param {Bool} autoUp 是否自动向上递归，如果为true,在下一个同级元素不存在的时候自动找父元素的下一个同级元素
@returns {SFDataTreeElement}
*/
SFDataTreeElement.prototype.getNextSibling = function (autoUp) {
    if (typeof (this.nextSibling) == "undefined") {
        this.nextSibling = this.data.readElementNextSibling(this.elementType, this);
    }
    if (!this.nextSibling && autoUp) {
        var parent = this.getParent();
        if (parent) {
            return parent.getNextSibling(autoUp);
        }
    }
    return this.nextSibling;
}
/**
获得元素指定级别的上级元素
@param {Number} level 级别，和OutlineNumber属性的定义一致
@returns {SFDataTreeElement}
*/
SFDataTreeElement.prototype.getAncestor = function (level) {
    var cLevel = this.getOutlineLevel();
    var element = this;
    while (cLevel > level) {
        element = element.getParent();
        cLevel--;
    }
    return element;
}
/**
获得元素的上一个元素
@returns {SFDataTreeElement}
*/
SFDataTreeElement.prototype.getPrevious = function () {
    var element = this.getPreviousSibling();
    return element ? element.getLastDescendant() : this.getParent();
}
/**
获得元素的下一个元素
@returns {SFDataTreeElement}
*/
SFDataTreeElement.prototype.getNext = function () {
    if (this == this.data.getRootElement(this.elementType)) { return this.getFirstChild(); }//
    if (this.Summary) {
        var element = this.getFirstChild();
        if (element) { return element; }
    }
    var element = this.getNextSibling();//首先考虑下一个是nextSibling的情况
    if (element) { return element; }
    //最后考虑下一个是上级的nextSibling的情况
    for (var pElement = this.getParent(); pElement; pElement = pElement.getParent()) {
        element = pElement.getNextSibling();
        if (element) { return element; }
    }
    return null;
}
/**
获得元素的最后一个子元素
@returns {SFDataTreeElement}
*/
SFDataTreeElement.prototype.getLastChild = function () {
    var lastChild = null;
    for (var child = this.getFirstChild(); child; child = child.getNextSibling()) {
        lastChild = child;
    }
    return lastChild;
}
/**
获得元素的最后一个子孙元素
@param {Bool} onlyView 是否只返回没有被上级元素的Collapse属性折叠起来的元素
@returns {SFDataTreeElement}
*/
SFDataTreeElement.prototype.getLastDescendant = function (onlyView) {
    if (!this.Summary || (onlyView && this.Collapse)) { return this; }
    var lastChild = this.getLastChild();
    return lastChild ? lastChild.getLastDescendant(onlyView) : this;
}
/**
获得当前没有被隐藏的下一个元素
@returns {SFDataTreeElement}
*/
SFDataTreeElement.prototype.getNextView = function () {
    return this.Collapse ? this.getNextSibling(true) : this.getNext();
}
/**
获得当前没有被隐藏的上一个元素
@returns {SFDataTreeElement}
*/
SFDataTreeElement.prototype.getPreviousView = function () {
    var t = this.getPreviousSibling();
    if (t) { return t.getLastDescendant(true) }
    t = this.getParent();
    if (t && t.getOutlineLevel() > 0) { return t; }
    return null;
}
/**
判断元素是否被隐藏(被上级元素的Collapse属性折叠起来)
@returns {Bool}
*/
SFDataTreeElement.prototype.isHidden = function () {
    if (!this.data) { return true; }
    for (var t = this.getParentTask(); t; t = t.getParentTask()) {
        if (t.Collapse || !t.data) {
            return true;
        }
    }
    return false;
}
/**
判断一个元素是否包含另一个元素
@param {SFDataTreeElement} element
@returns {Bool} 如果当前元素包含element元素，则返回true
*/
SFDataTreeElement.prototype.contains = function (element) {
    for (var p = element; p; p = p.getParent()) {
        if (p == this) { return true; }
    }
    return false;
}
/**
返回当前的元素在兄弟元素之中的索引，例如如果改元素是其父元素的第一个子元素，则为1，如果是第二个子元素，则为2，依次类推
@returns {Number}
*/
SFDataTreeElement.prototype.getSiblingIndex = function () {
    var index = 0, c = this;
    while (c) {
        c = c.getPreviousSibling();
        index++;
    }
    return index;
}
/**
计算并返回当前元素的大纲编号，这个返回值和OutlineNumber对应
@param {SFData} [data] 对于还没有创建完成的元素，应该传递此参数预先计算大纲
@returns {String}
*/
SFDataTreeElement.prototype.getOutlineNumber = function (data) {
    data = data ? data : this.data;
    var t = this, root = data.getRootElement(this.elementType);
    if (t == root) { return "0" }
    var arr = [];
    while (t && t != root) {
        arr.unshift(t.getSiblingIndex())
        t = t.getParent()
    }
    return arr.join(".")
}
/**
计算并返回当前元素的大纲数字，这个返回值和OutlineLevel对应
@returns {Number}
*/
SFDataTreeElement.prototype.getOutlineLevel = function () {
    var t = this, num = -1;
    while (t) {
        num++
        t = t.getParent()
    }
    return num
}
/**
任务对象的实体类型，代表数据之中的一个任务，当需要创建一个任务时，应该使用{@link SFData#addTask}而不是使用构造函数创建
@class
@extends SFDataTreeElement
*/
function SFDataTask() {
    this.elementType = "Task";
    SFGlobal.setProperty(this, { SuccessorLinks: [], PredecessorLinks: [], Assignments: [] });
    SFGlobal.setProperty(this, { getParentTask: this.getParent, getNextTask: this.getNext, getPreviousTask: this.getPrevious, getAncestorTask: this.getAncestor, getNextViewTask: this.getNextView, getPreviousViewTask: this.getPreviousView, containsTask: this.contains });
}
SFDataTask.prototype = new SFDataTreeElement();
/**
此方法已经失效，无需调用
@private
@deprecate
*/
SFDataTask.prototype.update = function () { }
/**
检查概要任务的时间是否和子任务的时间一致，如果不一致，则更新概要任务的时间
*/
SFDataTask.prototype.checkTime = function () {
    var startDate = Number.MAX_VALUE, endDate = Number.MIN_VALUE;
    for (var child = this.getFirstChild(); child; child = child.getNextSibling()) {
        if (child.Start) { startDate = Math.min(startDate, child.Start.valueOf()); }
        if (child.Finish) { endDate = Math.max(endDate, child.Finish.valueOf()); }
    }
    if (startDate == Number.MAX_VALUE)//说明已经没有子节点了
    {
        //this.setProperty("Finish",this.Start);
    }
    else {
        this.setProperty("Start", new Date(startDate));
        this.setProperty("Finish", new Date(Math.max(startDate, endDate)));
    }
}
/**
返回任务的所有前置链接数组
@returns {SFDataLink[]}
*/
SFDataTask.prototype.getPredecessorLinks = function () {
    if (!this.linksRead) {
        this.data.readTaskLinks(this);
        this.linksRead = true;
    }
    return this.PredecessorLinks;
}
/**
返回任务的所有后置链接数组
@returns {SFDataLink[]}
*/
SFDataTask.prototype.getSuccessorLinks = function () {
    if (!this.linksRead) {
        this.data.readTaskLinks(this);
        this.linksRead = true;
    }
    return this.SuccessorLinks;
}
/**
返回任务的所有前置任务数组
@returns {SFDataTask[]}
*/
SFDataTask.prototype.getPredecessorTasks = function () {
    var tasks = [], links = this.getPredecessorLinks();
    for (var i = 0; i < links.length; i++) {
        tasks.push(links[i].getPredecessorTask());
    }
    return tasks;
}
/**
返回任务的所有后置任务数组
@returns {SFDataTask[]}
*/
SFDataTask.prototype.getSuccessorTasks = function () {
    var tasks = [], links = this.getSuccessorLinks();
    for (var i = 0; i < links.length; i++) {
        tasks.push(links[i].getSuccessorTask());
    }
    return tasks;
}
/**
返回任务的所有资源分配数组
@returns {SFDataAssignment[]}
*/
SFDataTask.prototype.getAssignments = function () {
    if (this.Summary) { return []; }
    if (!this.assignmentsRead) {
        this.data.readTaskAssignments(this);
        this.assignmentsRead = true;
    }
    return this.Assignments;
}
/**
给任务添加前置链接，并返回添加的链接，如果添加失败，则返回null
@param {SFDataTask} objTask 链接的对象任务
@param {Number} type 链接的类型，可参看{@link SFDataTask#Type}
@returns {SFDataLink}
*/
SFDataTask.prototype.addPredecessorLink = function (objTask, type) {
    var link = this.data.addLink(this, objTask, type);
    return link;
}
/**
给任务添加后置链接，并返回添加的链接，如果添加失败，则返回null
@param {SFDataTask} objTask 链接的对象任务
@param {Number} type 链接的类型，可参看{@link SFDataLink#Type}
@returns {SFDataLink}
*/
SFDataTask.prototype.addSuccessorLink = function (objTask, type) {
    var link = this.data.addLink(objTask, this, type);
    return link;
}
/**
给任务添加资源分配，并返回添加的分配对象，如果添加失败，则返回null
@param {SFDataResource} resource 分配的资源
@param {Number} unit 资源的分配比例，可参看{@link SFDataAssignment#Units}
@returns {SFDataAssignment}
*/
SFDataTask.prototype.addAssignment = function (resource, unit) {
    var am = this.data.addAssignment(this, resource, unit);
    if (!am) { return; }
    if (unit) { am.setProperty("Units", unit); }
    return am;
}
/**
计算工期并返回
@param {String} [start] 任务开始时间
 @param {String} [finish] 任务结束时间
@returns {SFDataAssignment}
*/
SFDataTask.prototype.getDuration = function (start, finish) {
    start = start || this.Start;
    finish = finish || this.Finish;
    var cal = this.data.getCalendar(), startTime = start, lastDat = -1, num = 0;
    while (startTime < finish) {
        var time = cal.getWorkTime(startTime);
        if (time[0] >= finish) { break; }
        var day = [parseInt(((time[0] / 1000 / 60) - time[0].getTimezoneOffset()) / 60 / 24), parseInt(((time[1] / 1000 / 60) - time[1].getTimezoneOffset()) / 60 / 24)];
        num += day[1] - day[0] + 1;
        if (lastDat == day[0]) { num--; }
        lastDat = day[1];
        startTime = time[1];
    }
    return num;
}

/**
资源对象的实体类型，用来代表甘特数据之中的一个资源信息，当需要创建一个资源时，应该使用{@link SFData#addResource}而不是使用构造函数创建
@class
@extends SFDataTreeElement
*/
function SFDataResource() {
    this.elementType = "Resource";
    SFGlobal.setProperty(this, { getParentResource: this.getParent, getNextResource: this.getNext, getPreviousResource: this.getPrevious, getAncestorResource: this.getAncestor, getNextViewResource: this.getNextView, getPreviousViewResource: this.getPreviousView, containsResource: this.contains });
    this.Assignments = [];
}
SFDataResource.prototype = new SFDataTreeElement();
/**
返回资源的所有分配数组
@returns {SFDataAssignment[]}
*/
SFDataResource.prototype.getAssignments = function () {
    if (!this.assignmentsRead) {
        this.data.readResourceAssignments(this);
        this.assignmentsRead = true;
    }
    return this.Assignments;
}
/**
为资源添加一个分配，并返回添加的分配对象，如果添加失败，则返回null
@param {SFDataTask} task 分配的任务
@param {Number} unit 资源的分配比例，可参看{@link SFDataAssignment#Units}
@returns {SFDataAssignment}
*/
SFDataResource.prototype.addAssignment = function (task, unit) {
    var am = this.data.addAssignment(task, this);
    if (!am) { return; }
    if (unit) { am.setProperty("Units", unit); }
    return am;
}
/**
链接对象的实体类型，用来代表甘特数据之中的一个任务间链接，当需要创建一个链接时，应该使用{@link SFData#addLink}而不是使用构造函数创建
@class
@extends SFDataElement
*/
function SFDataLink() {
    this.elementType = "Link";
}
SFDataLink.prototype = new SFDataElement();
/**
获取链接的前置任务
@returns {SFDataTask}
*/
SFDataLink.prototype.getPredecessorTask = function () {
    return this.PredecessorTask;
}
/**
获取链接的后置任务
@returns {SFDataTask}
*/
SFDataLink.prototype.getSuccessorTask = function () {
    return this.SuccessorTask;
}
/**
资源分配对象的实体类型，用来代表甘特数据之中的一个资源分配信息，当需要创建一个资源分配时，应该使用{@link SFData#addAssignment}而不是使用构造函数创建
@class
@extends SFDataElement
*/
function SFDataAssignment() {
    this.elementType = "Assignment";
}
SFDataAssignment.prototype = new SFDataElement();
/**
获取分配的任务
@returns {SFDataTask}
*/
SFDataAssignment.prototype.getTask = function () {
    return this.task ? this.task : this.data.getTaskByUid(this.TaskUID);
}
/**
获取分配的资源
@returns {SFDataResource}
*/
SFDataAssignment.prototype.getResource = function () {
    return this.resource ? this.resource : this.data.getResourceByUid(this.ResourceUID);
}
window.SFDataElement = SFDataElement;
window.SFDataTreeElement = SFDataTreeElement;
window.SFDataTask = SFDataTask;
window.SFDataResource = SFDataResource;
window.SFDataLink = SFDataLink;
window.SFDataAssignment = SFDataAssignment;
/**
甘特图数据插件的基类，所有的数据插件都继承此类
@class
*/
function SFDataComponent() { }
/**
@private
数据插件的初始化，每个插件的实现都会重写此方法
@param {SFData} data
*/
SFDataComponent.prototype.initialize = function () { }
/**
@private
移除此插件
*/
SFDataComponent.prototype.remove = function () { }
/**
@private
销毁此插件以释放资源
*/
SFDataComponent.prototype.depose = function () { this.remove(); }
/**
这是一个数据插件，本数据插件用来实现在任务时间变化的时候更新父任务的时间
此插件会默认加载，不过可以通过设置"SFData/autoCalculateTime"的配置项为false来禁止此插件的加载
@extends SFDataComponent
@class
*/
function SFDataCalculateTimeComponent() { }
SFDataCalculateTimeComponent.prototype = new SFDataComponent();
/**
@private
数据插件的初始化，每个插件的实现都会重写此方法
@param {SFData} data
*/
SFDataCalculateTimeComponent.prototype.initialize = function (data) {
    /**
    是否自动计算概要任务的时间，如果这个值设置为false,拖动一个任务的时间，对应的概要任务不会自动更新
    @name SFConfig.configItems.SFData_autoCalculateTime
    @type Bool
    @default true
    */
    if (!data.autoCalculateTime) { return false; }
    this.listeners = [
        SFEvent.bind(data, "aftertaskchange", this, this.onTaskChange),
        SFEvent.bind(data, "aftertaskdelete", this, this.onTaskDelete),
        SFEvent.bind(data, "aftertaskmove", this, this.onTaskMove)
    ];
    return true;
}
/**
@private
在任务被更改时执行，假如更改了时间，则重新计算父任务的时间
@param {SFDataTask} task 被更改的任务
@param {String} name 更改的属性名称
@param {variant} value 更改后的值，任意类型
*/
SFDataCalculateTimeComponent.prototype.onTaskChange = function (task, name, value) {
    if (name != "Start" && name != "Finish") { return; }
    if (task.getParentTask()) { task.getParentTask().checkTime(); }
}
/**
@private
在任务被删除时执行，重新计算父任务的时间
@param {SFDataTask} task 被删除的任务
@param {SFDataTask} pTask 被删除任务的父任务
*/
SFDataCalculateTimeComponent.prototype.onTaskDelete = function (task, pTask) {
    if (pTask) { pTask.checkTime(); }
}
/**
@private
在任务移动时执行，重新计算父任务的时间
@param {SFDataTask} task 被移动的任务
@param {SFDataTask} pTask 被移动任务原来位置的父任务
*/
SFDataCalculateTimeComponent.prototype.onTaskMove = function (task, pTask) {
    if (pTask) { pTask.checkTime(); }
    if (task.getParentTask()) { task.getParentTask().checkTime(); }
}
/**
这是一个数据插件，本数据插件用来实现完整的大纲级别的支持，加载本组件之后，将会自动的分配和更新大纲级别
@extends SFDataComponent
@class
*/
function SFDataOutlineComponent() { }
SFDataOutlineComponent.prototype = new SFDataComponent();
/**
@private
数据插件的初始化，每个插件的实现都会重写此方法
@param {SFData} data
*/
SFDataOutlineComponent.prototype.initialize = function (data) {
    this.listeners = [];
    var modules = data.getModules();
    for (var i = modules.length - 1; i >= 0; i--) {
        if (!data["getRoot" + modules[i]]) { continue; }
        var module = modules[i].toLowerCase();
        this.listeners = this.listeners.concat(
            [
                SFEvent.bind(data, module + "register", this, this.onElementRegister),
                SFEvent.bind(data, "after" + module + "add", this, this.onElementAdd),
                SFEvent.bind(data, "after" + module + "delete", this, this.onElementDelete),
                SFEvent.bind(data, "after" + module + "move", this, this.onElementMove)
            ]
        );
    }
}
/**
@private
更新元素和子元素的大纲级别，这是一个递归执行的函数
@param {SFElement} element 元素
@param {Bool} toChild 是否还要更新子任务的大纲级别
*/
SFDataOutlineComponent.prototype.setOutline = function (element, toChild) {
    var parent = element.getParent(), number = "0", level = 0;
    if (parent) {
        number = (parent.OutlineLevel == 0) ? "" + element.getSiblingIndex() : parent.OutlineNumber + "." + element.getSiblingIndex();
        level = parent.OutlineLevel + 1;
    }
    var changed = (number != element["OutlineNumber"]);
    element.setProperty("OutlineNumber", number);
    element.setProperty("OutlineLevel", level);
    if (toChild && changed && element.Summary) {
        for (var child = element.getFirstChild(); child; child = child.getNextSibling()) {
            this.setOutline(child, true);
        }
    }
}
/**
@private
在元素被注册的时候初始化元素的大纲
@param {SFElement} element 元素
*/
SFDataOutlineComponent.prototype.onElementRegister = function (element) {//初始化大纲级别的值
    this.setOutline(element, false);
}
/**
@private
在元素被增加的时候更新后续元素的大纲
@param {SFElement} element 元素
*/
SFDataOutlineComponent.prototype.onElementAdd = function (element) {
    for (var t = element; t; t = t.getNextSibling()) {
        this.setOutline(t, true);
    }
}
/**
@private
在元素被删除的时候更新后续元素的大纲
@param {SFElement} element 元素
@param {SFElement} parent 被删除元素的父元素
@param {SFElement} pt 被删除元素的前一个兄弟元素
*/
SFDataOutlineComponent.prototype.onElementDelete = function (element, parent, pt) {
    if (!parent) { return; }
    for (var t = pt ? pt.getNextSibling() : parent.getFirstChild(); t; t = t.getNextSibling()) {
        this.setOutline(t, true);
    }
}
/**
@private
在元素被移动的时候更新原位置和新位置的大纲
@param {SFElement} element 被移动的元素
@param {SFElement} parentElement 被移动元素原位置的父元素
@param {SFElement} previousSibling 被移动元素的原位置前一个兄弟元素
*/
SFDataOutlineComponent.prototype.onElementMove = function (element, parentElement, previousSibling) {
    if (parentElement) {
        for (var t = previousSibling ? previousSibling.getNextSibling() : parentElement.getFirstChild(); t; t = t.getNextSibling()) {
            this.setOutline(t, true);
        }
    }
    for (var t = element; t; t = t.getNextSibling()) {
        this.setOutline(t, true);
    }
}
/**
这是一个数据插件，本数据插件用来实现完整的ID字段的支持，加载本组件之后，将会自动的分配和更新ID
@extends SFDataComponent
@class
*/
function SFDataIDComponent() { }
SFDataIDComponent.prototype = new SFDataComponent();
/**
@private
数据插件的初始化，每个插件的实现都会重写此方法
@param {SFData} data
*/
SFDataIDComponent.prototype.initialize = function (data) {
    this.listeners = [];
    var modules = data.getModules();
    for (var i = modules.length - 1; i >= 0; i--) {
        if (!data["getRoot" + modules[i]]) { continue; }
        var module = modules[i].toLowerCase();
        this.listeners = this.listeners.concat(
            [
                SFEvent.bind(data, module + "register", this, this.onElementRegister),
                SFEvent.bind(data, "after" + module + "add", this, this.onElementAdd),
                SFEvent.bind(data, "after" + module + "delete", this, this.onElementDelete),
                SFEvent.bind(data, "after" + module + "move", this, this.onElementMove)
            ]
        );
    }
}
/**
@private
更新元素和后续元素的ID
@param {SFElement} element 元素
*/
SFDataIDComponent.prototype.setID = function (element) {
    var id = element.getParent() ? element.getPrevious().ID + 1 : 0;
    if (!isNaN(id) && id != element.ID) {
        element.setProperty("ID", id);
        return true;
    }
    return false;
}
/**
@private
在元素被注册的时候初始化元素的ID
@param {SFElement} element 元素
*/
SFDataIDComponent.prototype.onElementRegister = function (element) {
    this.setID(element);
}
/**
@private
在元素被增加的时候更新后续元素的ID
@param {SFElement} element 元素
*/
SFDataIDComponent.prototype.onElementAdd = function (element) {
    for (var t = element.getNext(); t; t = t.getNext()) {
        if (!this.setID(t)) { break; }
    }
}
/**
@private
在元素被删除的时候更新后续元素的ID
@param {SFElement} element 元素
@param {SFElement} parent 被删除元素的父元素
@param {SFElement} pt 被删除元素的前一个兄弟元素
*/
SFDataIDComponent.prototype.onElementDelete = function (element, parent, pt) {
    if (!parent) { return; }
    for (var t = pt ? pt.getNext() : parent.getNext(); t; t = t.getNext()) {
        if (!this.setID(t)) { break; }
    }
}
/**
@private
在元素被移动的时候更新ID
@param {SFElement} element 被移动的元素
@param {SFElement} parentElement 被移动元素原位置的父元素
@param {SFElement} previousSibling 被移动元素的原位置前一个兄弟元素
*/
SFDataIDComponent.prototype.onElementMove = function (element, parentElement, previousSibling) {
    var ele, elements = [element];
    if (parentElement) { elements.push(previousSibling ? previousSibling.getLastDescendant().getNext() : parentElement.getNext()); }
    elements.sort(function (a, b) {
        if (!a || !b) { return 0; }
        return a.data.compareElement(a, b);
    });
    while (elements.length > 0) {
        for (var t = elements.pop(); t; t = t.getNext()) {
            if (!this.setID(t)) { break; }
        }
    }
}
/**
这是一个数据插件，本数据插件用来实现ReadOnly字段的支持，加载本组件之后，将会自动保护特定的字段不允许被修改,
此插件会默认加载，不过可以通过"SFData/ignoreReadOnly"的配置项为true来禁止此插件的加载,
并可以通过"SFData/taskReadonlyIgnoreProperty"等配置项来设置哪些字段的更改不受ReadOnly影响
@extends SFDataComponent
@class
*/
function SFDataReadOnlyComponent() { }
SFDataReadOnlyComponent.prototype = new SFDataComponent();
/**
@private
数据插件的初始化，每个插件的实现都会重写此方法
@param {SFData} data
*/
SFDataReadOnlyComponent.prototype.initialize = function (data) {
    if (data.ignoreReadOnly) { return false; }
    this.listeners = []
    var modules = data.getModules();
    this.ignoreFields = {};
    for (var i = modules.length - 1; i >= 0; i--) {
        var module = modules[i].toLowerCase();
        var ps = data[module + "ReadonlyIgnoreProperty"];
        this.ignoreFields[module] = ps ? ps.split(",") : [];
        this.listeners = this.listeners.concat(
            [
                SFEvent.bind(data, "before" + module + "change", this, this.onElementChange),
                SFEvent.bind(data, "before" + module + "delete", this, this.onElementAction),
                SFEvent.bind(data, "before" + module + "move", this, this.onElementAction)
            ]
        );
    }
    return true;
}
/**
@private
在元素被更改前时执行，假如该任务被设置为只读，则禁止此修改
@param {Json} returnObj 事件返回结果对象
@param {SFDataElement} element 被修改的元素
@param {String} name 被修改的字段名称
*/
SFDataReadOnlyComponent.prototype.onElementChange = function (returnObj, element, name) {
    if (SFGlobal.findInArray(this.ignoreFields[element.elementType.toLowerCase()], name)) { return; }
    if (element["ReadOnly"]) { returnObj.returnValue = false; }
}
/**
@private
在元素被删除或移动前时执行，假如该任务被设置为只读，则禁止此操作
@param {Json} returnObj 事件返回结果对象
@param {SFDataElement} element 被操作的元素
*/
SFDataReadOnlyComponent.prototype.onElementAction = function (returnObj, element) {
    if (element["ReadOnly"]) { returnObj.returnValue = false; }
}

window.SFDataComponent = SFDataComponent;
window.SFDataCalculateTimeComponent = SFDataCalculateTimeComponent;
window.SFDataOutlineComponent = SFDataOutlineComponent;
window.SFDataIDComponent = SFDataIDComponent;
window.SFDataReadOnlyComponent = SFDataReadOnlyComponent;
//window.SFDataCollapseComponent=SFDataCollapseComponent;
/**
这是一个数据插件，本数据插件用来实现甘特图更改记录的功能，加载此插件之后，甘特图会记录所有的元素增加、删除、修改、移动的信息，并可以随时获取这些信息
可以通过将这些信息发布到服务端以保证客户端信息和服务端总是同步，
目前暂时只支持对任务和链接的更新进行记录
@extends SFDataComponent
@class
*/
function SFDataLogging(data) {//data参数是为了和以前的版本保持兼容
    this.setTaskFields("Name,Start,Finish,Summary,PercentComplete,Notes")
    this.setLinkFields("Type");
    this.clear();
    if (data) { data.addComponent(this); }
}
SFDataLogging.prototype = new window.SFDataComponent();
/**
@private
数据插件的初始化，每个插件的实现都会重写此方法
@param {SFData} data
*/
SFDataLogging.prototype.initialize = function (data) {
    this.start(data);
}
/**
开始记录数据的更改记录
@param {SFData} data 参数是甘特数据对象
*/
SFDataLogging.prototype.start = function (data) {
    this.stop();
    this.listeners = [
        SFEvent.bind(data, "aftertaskadd", this, this.onTaskAdd),
        SFEvent.bind(data, "aftertaskdelete", this, this.onTaskDelete),
        SFEvent.bind(data, "aftertaskmove", this, this.onTaskMove),
        SFEvent.bind(data, "aftertaskchange", this, this.onTaskChange),

        SFEvent.bind(data, "afterlinkadd", this, this.onLinkAdd),
        SFEvent.bind(data, "afterlinkdelete", this, this.onLinkDelete),
        SFEvent.bind(data, "afterlinkchange", this, this.onLinkChange)
    ];
}
/**
清空已经记录的更改记录，例如在一批更改已经获取并发布到服务端之后，可以清空以避免重复处理
*/
SFDataLogging.prototype.clear = function () {
    SFGlobal.setProperty(this, {
        newTasks: [], updateTasks: [], moveTasks: [], deleteTasks: [],
        newLinks: [], updateLinks: [], deleteLinks: []
    });
}
/**
获得包含所有更新记录的XML文档，可用于向后台发送更改数据。
@see 关于XML文档格式请参考<a href="http://www.51diaodu.cn/sfgantt/docs/logging/schema.html">更改记录XML文档格式</a>.
@returns {XmlDocument}
*/
SFDataLogging.prototype.getXml = function () {
    var doc = SFAjax.createDocument();
    var root = doc.createElement("Log");
    doc.appendChild(root);
    //任务的添加、删除、移动、修改
    var elements = this.newTasks;
    if (elements && elements.length > 0) {
        var groupNode = this.addNode(root, "AddTasks");
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            if (!element.task.data) { continue; }
            var elementNode = this.addNode(groupNode, "Task");
            this.addPropertyNode(elementNode, element.task, ["UID"]);
            this.addPropertyNode(elementNode, element.task, element.fields);
            if (element.task.getParentTask()) { this.addNode(elementNode, "ParentUID", element.task.getParentTask().UID); }
            if (element.task.getPreviousSibling()) { this.addNode(elementNode, "PreviousUID", element.task.getPreviousSibling().UID); }
        }
    }
    var elements = this.updateTasks;
    if (elements && elements.length > 0) {
        var groupNode = this.addNode(root, "UpdateTasks");
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            if (!element.task.data) { continue; }
            var elementNode = this.addNode(groupNode, "Task");
            this.addPropertyNode(elementNode, element.task, ["UID"]);
            this.addPropertyNode(elementNode, element.task, element.fields);
        }
    }
    var elements = this.moveTasks;
    if (elements && elements.length > 0) {
        var groupNode = this.addNode(root, "MoveTasks");
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            if (!element.task.data) { continue; }
            var elementNode = this.addNode(groupNode, "Task");
            this.addPropertyNode(elementNode, element.task, ["UID"]);
            if (element.task.getParentTask()) { this.addNode(elementNode, "ParentUID", element.task.getParentTask().UID); }
            if (element.task.getPreviousSibling()) { this.addNode(elementNode, "PreviousUID", element.task.getPreviousSibling().UID); }
        }
    }
    var elements = this.deleteTasks;
    if (elements && elements.length > 0) {
        var groupNode = this.addNode(root, "DeleteTasks");
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            var elementNode = this.addNode(groupNode, "Task");
            this.addPropertyNode(elementNode, element.task, ["UID"]);
        }
    }
    //链接的添加、删除、修改
    var elements = this.newLinks;

    if (elements && elements.length > 0) {
        var groupNode = this.addNode(root, "AddLinks");
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            if (!element.link.data) { continue; }
            var elementNode = this.addNode(groupNode, "Link");
            this.addPropertyNode(elementNode, element.link, ["UID", "Type"]);
            //this.addPropertyNode(elementNode,element.link,element.fields);
            this.addPropertyNode(elementNode, element.link, element.fields);
            if (element.link.getPredecessorTask()) { this.addNode(elementNode, "PredecessorUID", element.link.getPredecessorTask().UID); }
            if (element.link.getSuccessorTask()) { this.addNode(elementNode, "SuccessorUID", element.link.getSuccessorTask().UID); }
        }
    }
    var elements = this.updateLinks;
    if (elements && elements.length > 0) {
        var groupNode = this.addNode(root, "UpdateLinks");
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            if (!element.link.data) { continue; }
            var elementNode = this.addNode(groupNode, "Link");
            this.addPropertyNode(elementNode, element.link, ["UID"]);
            if (element.link.getPredecessorTask()) { this.addNode(elementNode, "PredecessorUID", element.link.getPredecessorTask().UID); }
            if (element.link.getSuccessorTask()) { this.addNode(elementNode, "SuccessorUID", element.link.getSuccessorTask().UID); }
            this.addPropertyNode(elementNode, element.link, element.fields);
        }
    }
    var elements = this.deleteLinks;
    if (elements && elements.length > 0) {
        var groupNode = this.addNode(root, "DeleteLinks");
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            var elementNode = this.addNode(groupNode, "Link");
            this.addPropertyNode(elementNode, element.link, ["UID"]);
        }
    }

    return doc;
}
/**
只有部分属性的更改会被记录下来，这个函数用来设置任务需要记录的属性列表,
如果不进行设置，默认为"Name,Start,Finish,Summary,PercentComplete,Notes"
@param {String} fields 逗号分隔的任务属性名称列表，请参考{@link SFDataTask}的Fields项
*/
SFDataLogging.prototype.setTaskFields = function (fields) {
    this.taskFields = typeof (fields) == "string" ? fields.split(",") : fields;
}
/**
在新增加任务之后进行记录
@private
@param {SFDataTask} task 新增加的任务
*/
SFDataLogging.prototype.onTaskAdd = function (task) {
    var obj = SFGlobal.findInArray(this.deleteTasks, task, function (a, b) { return a.task == b });//支持Delete-Add模式
    if (obj) { SFGlobal.deleteInArray(this.deleteTasks, obj); return; }
    obj = SFGlobal.findInArray(this.moveTasks, task, function (a, b) { return a.task == b });//支持Move-Add模式
    if (obj) { SFGlobal.deleteInArray(this.moveTasks, obj); }
    var fields = [];
    obj = SFGlobal.findInArray(this.updateTasks, task, function (a, b) { return a.task == b });//支持Update-Add模式
    if (obj) { SFGlobal.deleteInArray(this.updateTasks, obj); fields = obj.fields; }
    this.newTasks.push({ task: task, fields: fields });
}
/**
在删除任务之后进行记录
@private
@param {SFDataTask} task 删除的任务
*/
SFDataLogging.prototype.onTaskDelete = function (task) {
    var obj = SFGlobal.findInArray(this.newTasks, task, function (a, b) { return a.task == b });//支持Add-Delete模式
    if (obj) { SFGlobal.deleteInArray(this.newTasks, obj); return; }
    obj = SFGlobal.findInArray(this.moveTasks, task, function (a, b) { return a.task == b });//支持Move-Delete模式
    if (obj) { SFGlobal.deleteInArray(this.moveTasks, obj); }
    obj = SFGlobal.findInArray(this.updateTasks, task, function (a, b) { return a.task == b });//支持Update-Delete模式
    if (obj) { SFGlobal.deleteInArray(this.updateTasks, obj); }
    this.deleteTasks.push({ task: task });
}
/**
在移动任务之后进行记录
@private
@param {SFDataTask} task 移动的任务
@param {SFDataTask} pTask 任务原位置的父任务
@param {SFDataTask} preTask 任务原位置的前置任务
*/
SFDataLogging.prototype.onTaskMove = function (task, pTask, preTask) {
    if (SFGlobal.findInArray(this.deleteTasks, task, function (a, b) { return a.task == b })) { return; }//支持Delete-Move模式
    if (SFGlobal.findInArray(this.newTasks, task, function (a, b) { return a.task == b })) { return; }//支持Add-Move模式
    if (SFGlobal.findInArray(this.moveTasks, task, function (a, b) { return a.task == b })) { return; }//支持Move-Move模式
    this.moveTasks.push({ task: task });
}
/**
在任务被更改之后进行记录
@private
@param {SFDataTask} task 更改的任务
@param {String} name 更改的属性名称
@param {variant} value 更改后的属性值
*/
SFDataLogging.prototype.onTaskChange = function (task, name, value) {
    if (SFGlobal.findInArray(this.deleteTasks, task, function (a, b) { return a.task == b })) { return; }//支持Delete-Update模式
    if (!SFGlobal.findInArray(this.taskFields, name)) { return; }
    var obj = SFGlobal.findInArray(this.newTasks, task, function (a, b) { return a.task == b });//支持Add-Update模式
    if (!obj) { obj = SFGlobal.findInArray(this.updateTasks, task, function (a, b) { return a.task == b }); }//支持Update-Update模式
    if (!obj) { this.updateTasks.push(obj = { task: task, fields: [] }); }
    if (SFGlobal.findInArray(obj.fields, name)) { return; }
    obj.fields.push(name);
}
/**
只有部分属性的更改会被记录下来，这个函数用来设置链接需要记录的属性列表,
如果不进行设置，默认为"Type"
@param {String} fields 逗号分隔的链接属性名称列表，请参考{@link SFDataLink}的Fields项
*/
SFDataLogging.prototype.setLinkFields = function (fields) {
    this.linkFields = typeof (fields) == "string" ? fields.split(",") : fields;
}
/**
在新增加链接之后进行记录
@private
@param {SFDataLink} link 新增加的链接
*/
SFDataLogging.prototype.onLinkAdd = function (link) {
    var obj = SFGlobal.findInArray(this.deleteLinks, link, function (a, b) { return a.link == b });//支持Delete-Add模式
    if (obj) { SFGlobal.deleteInArray(this.deleteLinks, obj); return; }
    var fields = [];
    obj = SFGlobal.findInArray(this.updateLinks, link, function (a, b) { return a.link == b });//支持Update-Add模式
    if (obj) { SFGlobal.deleteInArray(this.updateLinks, obj); fields = obj.fields; }
    this.newLinks.push({ link: link, fields: fields });

}
/**
在删除链接之后进行记录
@private
@param {SFDataLink} link 删除的链接
*/
SFDataLogging.prototype.onLinkDelete = function (link) {
    var obj = SFGlobal.findInArray(this.newLinks, link, function (a, b) { return a.link == b });//支持Add-Delete模式
    if (obj) { SFGlobal.deleteInArray(this.newLinks, obj); return; }
    obj = SFGlobal.findInArray(this.updateLinks, link, function (a, b) { return a.link == b });//支持Update-Delete模式
    if (obj) { SFGlobal.deleteInArray(this.updateLinks, obj); }
    this.deleteLinks.push({ link: link });
}
/**
在更改链接之后进行记录
@private
@param {SFDataLink} link 更改的链接
@param {String} name 更改的属性名称
@param {variant} value 更改后的属性值
*/
SFDataLogging.prototype.onLinkChange = function (link, name, value) {
    if (SFGlobal.findInArray(this.deleteLinks, link, function (a, b) { return a.link == b })) { return; }//支持Delete-Update模式
    if (!SFGlobal.findInArray(this.linkFields, name)) { return; }
    var obj = SFGlobal.findInArray(this.newLinks, link, function (a, b) { return a.link == b });//支持Add-Update模式
    if (!obj) { obj = SFGlobal.findInArray(this.updateLinks, link, function (a, b) { return a.link == b }); }//支持Update-Update模式
    if (!obj) { this.updateLinks.push(obj = { link: link, fields: [] }); }
    if (SFGlobal.findInArray(obj.fields, name)) { return; }
    obj.fields.push(name);
}
/**
为节点添加一个指定名称名称和值的子节点
@private
@param {XmlNode} parentNode
@param {String} name 子节点名称
@param {variant} value 子节点的值
@returns {XmlNode} 返回新增加的节点
*/
SFDataLogging.prototype.addNode = function (parentNode, name, value) {
    var child = parentNode.ownerDocument.createElement(name);
    if (value != null) {
        child.appendChild(parentNode.ownerDocument.createTextNode(this.pack(value)));
    }
    parentNode.appendChild(child);
    return child;
}
/**
添加指定元素的多个属性节点
@private
@param {XmlNode} node
@param {SFDataElement} element
@param {String[]} property 属性名称数组
*/
SFDataLogging.prototype.addPropertyNode = function (node, element, property) {
    property = property ? property : ["UID"]
    for (var i = property.length - 1; i >= 0; i--) {
        this.addNode(node, property[i], element[property[i]]);
    }
}
/**
暂停记录，暂停之后，不会自动的清空原有的更新记录
*/
SFDataLogging.prototype.stop = function () {
    if (!this.listeners) { return; }
    var listener;
    while (listener = this.listeners.pop()) { SFEvent.removeListener(listener); }
}
/**
将属性值转化为字符串以便写入到XML之中
@private
@param {variant} value 属性值
@returns {String}
*/
SFDataLogging.prototype.pack = function (value) {
    switch (typeof (value)) {
        case "boolean":
            return value ? '1' : '0';
        case "object":
            if (value.constructor == Date) {
                return SFGlobal.getDateString(value, "s");
            }
            break;
    }
    return value.toString();
}
/**
销毁此插件以释放内存
*/
SFDataLogging.prototype.depose = function () {
    this.stop();
    this.clear();
    for (var key in this) { this[key] = null; }
}
window.SFDataLogging = SFDataLogging;
/**
用来代表XML节点的读写方式的对象，每个读写方式定义了如何从XML之中读取和写入指定的属性值，通常不需要直接操作此对象，因为在{@link SFDataRender.types}之中已经定义了一些常用的读写方式
@param {Function} readFunc 从XML之中读取的节点内容成为元素属性的函数
@param {Function} writeFunc 将元素属性写入到XML节点内容的函数
@class
*/
function SFDataRender(readFunc, writeFunc) {
    this.read = readFunc;
    this.write = writeFunc;
}
/**
用来调用读取的函数
@private
@param {XmlNode} node Xml节点
returns {variant} 从节点之中读取出来的属性值，任意类型
*/
SFDataRender.read = function (node) {
    return this.read.apply(this, [node]);
}
/**
用来调用写入的函数
@private
@param {XmlNode} node Xml节点
@param {variant} value 从来写入的属性值
*/
SFDataRender.write = function (node, value) {
    return this.write.apply(this, [node, value]);
}
/**
初始化系统集成的读写方式
@private
*/
SFDataRender.init = function () {
    /**
    @name SFDataRender.types
    @namespace 所有系统预定义的读写方法，可使用  {@link SFDataRender.getType}方法来获得这些对象
    */

    SFDataRender.types = {
        /**
        将XML节点内容之中的0和1解析为Bool类型(false和true)进行操作的方式
        @name SFDataRender.types.Bool2Int
        @type SFDataRender
        */
        Bool2Int: new SFDataRender(SFDataRender.Bool2IntRead, SFDataRender.Bool2IntWrite),
        /**
        将XML节点内容之中解析为整数进行操作的方式
        @name SFDataRender.types.Int
        @type SFDataRender
        */
        Int: new SFDataRender(SFDataRender.IntRead, SFDataRender.IntWrite),
        /**
        将XML节点内容之中解析为浮点数进行操作的方式
        @name SFDataRender.types.Float
        @type SFDataRender
        */
        Float: new SFDataRender(SFDataRender.FloatRead, SFDataRender.FloatWrite),
        /**
        将XML节点内容之中解析为字符串进行操作的方式
        @name SFDataRender.types.String
        @type SFDataRender
        */
        String: new SFDataRender(SFDataRender.StringRead, SFDataRender.StringWrite),
        /**
        将XML节点内容之中解析为JavaScript Date对象进行操作的方式
        该类型的节点内容包含一个标准的时间字符串，格式应该为“2004-01-01T08:00:00”，读取之后为一个时间对象DataTime
        @name SFDataRender.types.Time
        @type SFDataRender
        */
        Time: new SFDataRender(SFDataRender.TimeRead, SFDataRender.TimeWrite)
    };
}
/**
根据读写方式名称获得指定的对象
@param {String} name 读写方式名称，参数必须是{@link SFDataRender}的一个域名称，例如"Bool2Int"
@returns {SFDataRender}
*/
SFDataRender.getType = function (name) {
    return SFDataRender.types[name];
}
/**
将XML节点内容解析为日期时间对象
@private
@param {XmlNode} node xml节点
@returns {Date}
*/
SFDataRender.TimeRead = function (node) {
    return SFGlobal.getDate(SFAjax.getNodeValue(node));
}
/**
将日期时间对象写入到XML节点之中
@private
@param {XmlNode} node xml节点
@param {Date} value 要写入的值
*/
SFDataRender.TimeWrite = function (node, value) {
    SFAjax.setNodeValue(node, SFGlobal.getDateString(value, "s"));
}
/**
将XML节点内容解析为字符串
@private
@param {XmlNode} node xml节点
@returns {String}
*/
SFDataRender.StringRead = function (node) {
    return SFAjax.getNodeValue(node);
}
/**
将字符串写入到XML节点之中
@private
@param {XmlNode} node xml节点
@param {String} value 要写入的值
*/
SFDataRender.StringWrite = function (node, value) {
    SFAjax.setNodeValue(node, value);
}
/**
将XML节点内容解析为整数
@private
@param {XmlNode} node xml节点
@returns {Number}
*/
SFDataRender.IntRead = function (node) {
    return parseInt(SFAjax.getNodeValue(node));
}
/**
将整数写入到XML节点之中
@private
@param {XmlNode} node xml节点
@param {Number} value 要写入的值
*/
SFDataRender.IntWrite = function (node, value) {
    SFAjax.setNodeValue(node, parseInt(value));
}
/**
将XML节点内容解析为布尔值
@private
@param {XmlNode} node xml节点
@returns {Bool}
*/
SFDataRender.Bool2IntRead = function (node) {
    return parseInt(SFAjax.getNodeValue(node)) > 0 ? true : false;
}
/**
将布尔值写入到XML节点之中
@private
@param {XmlNode} node xml节点
@param {Bool} value 要写入的值
*/
SFDataRender.Bool2IntWrite = function (node, value) {
    SFAjax.setNodeValue(node, value ? 1 : 0);
}
/**
将XML节点内容解析为浮点数
@private
@param {XmlNode} node xml节点
@returns {Number}
*/
SFDataRender.FloatRead = function (node) {
    return parseFloat(SFAjax.getNodeValue(node));
}
/**
将浮点数写入到XML节点之中
@private
@param {XmlNode} node xml节点
@param {Number} value 要写入的值
*/
SFDataRender.FloatWrite = function (node, value) {
    SFAjax.setNodeValue(node, parseFloat(value));
}
if (!window._obscure) { SFDataRender.init(); }
window.SFDataRender = SFDataRender;
/**
甘特图数据适配器的基类，所有的数据适配器都继承此类
@class
*/
function SFDataAdapter() { }
/**
@private
数据源的初始化，每个数据源的实现都会重写此方法
*/
SFDataAdapter.prototype.initialize = function () { }
/**
移除此数据源，移除之后，SFData对象不再访问此数据源
*/
SFDataAdapter.prototype.remove = function () { }
/**
销毁此数据源以释放内存
*/
SFDataAdapter.prototype.depose = function () {
    if (this.listeners) {
        var listenr;
        while (listenr = this.listeners.pop()) { SFEvent.removeListener(listenr) }
    }
}
/**
@private
返回数据源使用的工作日历对象，默认返回标准日历
@returns {SFWorkingCalendar}
*/
SFDataAdapter.prototype.getCalendar = function () { return SFWorkingCalendar.getCalendar("Standard"); }
/**
@private
读取并返回根任务
@returns {SFDataTask}
*/
SFDataAdapter.prototype.readRootTask = function () { }
/**
@private
读取并返回指定任务的第一个子任务，如果不存在，则返回null
@param {SFDataTask} task
@returns {SFDataTask}
*/
SFDataAdapter.prototype.readTaskFirstChild = function () { }
/**
@private
读取并返回指定任务的下一个同级任务，如果不存在，则返回null
@param {SFDataTask} task
@returns {SFDataTask}
*/
SFDataAdapter.prototype.readTaskNextSibling = function () { }
/**
@private
读取并返回根资源
@returns {SFDataResource}
*/
SFDataAdapter.prototype.readRootResource = function () { }
/**
@private
读取并返回指定资源的第一个子资源，如果不存在，则返回null
@param {SFDataResource} resource
@returns {SFDataResource}
*/
SFDataAdapter.prototype.readResourceFirstChild = function () { }
/**
@private
读取并返回指定资源的下一个同级资源，如果不存在，则返回null
@param {SFDataResource} resource
@returns {SFDataResource}
*/
SFDataAdapter.prototype.readResourceNextSibling = function () { }
/**
@private
读取并返回指定任务的第一个链接，如果不存在，则返回null
@param {SFDataTask} task
@returns {SFDataLink}
*/
SFDataAdapter.prototype.readTaskFirstLink = function () { }
/**
@private
读取并返回指定任务的下一个链接，如果不存在，则返回null
@param {SFDataTask} task
@param {SFDataLink} link
@returns {SFDataLink}
*/
SFDataAdapter.prototype.readTaskNextLink = function () { }
/**
@private
读取并返回指定任务的第一个资源分配，如果不存在，则返回null
@param {SFDataTask} task
@returns {SFDataAssignment}
*/
SFDataAdapter.prototype.readTaskFirstAssignment = function () { }
/**
@private
读取并返回指定任务的下一个资源分配，如果不存在，则返回null
@param {SFDataTask} task
@param {SFDataAssignment} assignment
@returns {SFDataAssignment}
*/
SFDataAdapter.prototype.readTaskNextAssignment = function () { }
/**
@private
读取并返回指定资源的第一个分配，如果不存在，则返回null
@param {SFDataResource} resource
@returns {SFDataAssignment}
*/
SFDataAdapter.prototype.readResourceFirstAssignment = function () { }
/**
@private
读取并返回指定资源的下一个资源分配，如果不存在，则返回null
@param {SFDataResource} resource
@param {SFDataAssignment} assignment
@returns {SFDataAssignment}
*/
SFDataAdapter.prototype.readResourceNextAssignment = function () { }
/**
@private
更新指定任务的属性
@param {SFDataTask} task
@param {String} proName 属性名称
@param {variant} value 属性的值
*/
SFDataAdapter.prototype.updateTask = function () { }
/**
@private
在指定的位置插入新任务并返回
@param {SFDataTask} parent 新任务的父任务
@param {SFDataTask} pTask 新任务的上一个同级任务，如果新任务是父任务的第一个子任务，则为null
@returns {SFDataTask}
*/
SFDataAdapter.prototype.addTask = function () { return new SFDataTask(); }
/**
@private
删除指定的任务
@param {SFDataTask} task 需要删除的任务
*/
SFDataAdapter.prototype.deleteTask = function () { }
/**
@private
移动任务到指定的位置
@param {SFDataTask} task 需要移动的任务
@param {SFDataTask} parent 新位置的父任务
@param {SFDataTask} pTask 新位置的上一个同级任务，如果新位置是父任务的第一个子任务，则为null
*/
SFDataAdapter.prototype.moveTask = function () { }
/**
@private
更新指定资源的属性
@param {SFDataResource} resource
@param {String} proName 属性名称
@param {variant} value 属性的值
*/
SFDataAdapter.prototype.updateResource = function () { }
/**
@private
在指定的位置插入新资源并返回
@param {SFDataResource} parent 新资源的父资源
@param {SFDataResource} pResource 新资源的上一个同级资源，如果新资源是父资源的第一个子资源，则为null
@returns {SFDataResource}
*/
SFDataAdapter.prototype.addResource = function () { return new SFDataResource(); }
/**
@private
删除指定的资源
@param {SFDataResource} resource 需要删除的资源
*/
SFDataAdapter.prototype.deleteResource = function () { }
/**
@private
移动资源到指定的位置
@param {SFDataResource} resource 需要移动的资源
@param {SFDataResource} parent 新位置的父资源
@param {SFDataResource} pResource 新位置的上一个同级资源，如果新位置是父资源的第一个子资源，则为null
*/
SFDataAdapter.prototype.moveResource = function () { }
/**
@private
更新指定链接的属性
@param {SFDataLink} link
@param {String} proName 属性名称
@param {variant} value 属性的值
*/
SFDataAdapter.prototype.updateLink = function () { }
/**
@private
在指定的任务之间添加链接并返回
@param {SFDataTask} selfTask 链接的后置任务
@param {SFDataTask} preTask 链接的前置任务
@param {Number} type 链接的类型，请参看{@link SFDataLink#Type}
@returns {SFDataLink}
*/
SFDataAdapter.prototype.addLink = function () { return new SFDataLink(); }
/**
@private
删除指定的链接
@param {SFDataLink} link 需要删除的链接
*/
SFDataAdapter.prototype.deleteLink = function () { }
/**
@private
更新指定资源分配的属性
@param {SFDataAssignment} assignment
@param {String} proName 属性名称
@param {variant} value 属性的值
*/
SFDataAdapter.prototype.updateAssignment = function () { }
/**
@private
添加一个资源分配并返回
@param {SFDataTask} task 分配的任务
@param {SFDataResource} resource 分配的资源
@param {Number} unit 资源的占用比例，0-1的小数
@returns {SFDataAssignment}
*/
SFDataAdapter.prototype.addAssignment = function () { return new SFDataAssignment(); }
/**
@private
删除指定的资源分配
@param {SFDataAssignment} assignment 需要删除的资源分配
*/
SFDataAdapter.prototype.deleteAssignment = function () { }
window.SFDataAdapter = SFDataAdapter;
/**
采用XML格式作为数据源的数据适配器对象基类，目前系统集成的几个格式都是采用XML格式，因此都是继承的此类；
@extends SFDataAdapter
@class
*/
function SFDataXmlBase() { }
SFDataXmlBase.prototype = new window.SFDataAdapter();
/**
@private
数据源的初始化，每个数据源的实现都会重写此方法
*/
SFDataXmlBase.prototype.initialize = function () {
    SFDataAdapter.prototype.initialize.apply(this, arguments);
}
/**
@private
返回对象的配置信息
@returns {Json} 配置信息
*/
SFDataXmlBase.prototype.getConfig = function () {
    return this.config;
}
/**
返回正在操作的XmlDocument对象
@returns {XmlDocument}
*/
SFDataXmlBase.prototype.getXml = function () {
    return this.doc;
}
/**
@private
读取calNode节点的内容，解析为工作日历对象返回
@params {XmlNode} calNode
@returns {SFWorkingCalendar}
*/
SFDataXmlBase.prototype.readCalendar = function (calNode) {
    var wds = new Array(7), exceptions = [];
    var wdsNode = SFAjax.selectSingleNode(calNode, "WeekDays");
    for (var wdNode = wdsNode.firstChild; wdNode; wdNode = wdNode.nextSibling) {
        if (wdNode.nodeName != "WeekDay") { continue; }
        var dayType = parseInt(SFAjax.getNodeValue(SFAjax.selectSingleNode(wdNode, "DayType")));
        var dayWorking = parseInt(SFAjax.getNodeValue(SFAjax.selectSingleNode(wdNode, "DayWorking")));
        var workTime = this.getCalendarTime(SFAjax.selectSingleNode(wdNode, "WorkingTimes"));
        if (dayType) {
            wds[dayType - 1] = workTime;
        }
        else {
            exceptions.push([SFGlobal.getDate(SFAjax.getNodeValue(SFAjax.selectSingleNode(wdNode, "TimePeriod/FromDate"))), SFGlobal.getDate(SFAjax.getNodeValue(SFAjax.selectSingleNode(wdNode, "TimePeriod/ToDate"))), workTime]);
        }
    }
    return new SFWorkingCalendar(SFWorkingCalendar.WT_WeekDay(wds, exceptions));
}
/**
@private
读取WorkingTimes节点内容，解析为工作时间的二维数组返回
@params {XmlNode} wtsNode
@returns {Number[][]}
*/
SFDataXmlBase.prototype.getCalendarTime = function (wtsNode) {
    var wts = [];
    if (!wtsNode) { return wts; }
    for (var wtNode = wtsNode.firstChild; wtNode; wtNode = wtNode.nextSibling) {
        if (wtNode.nodeName != "WorkingTime") { continue; }
        wts.push([this.getMinutes(SFAjax.getNodeValue(SFAjax.selectSingleNode(wtNode, "FromTime"))), this.getMinutes(SFAjax.getNodeValue(SFAjax.selectSingleNode(wtNode, "ToTime")))]);
    }
    return wts;
}
/**
@private
读取XML节点之中格式为13:24:50的度分秒内容，转化为以分钟为单位的数字
@params {String} string
@returns {Number} 以分钟为单位的数字
*/
SFDataXmlBase.prototype.getMinutes = function (string) {
    var timeReg = new RegExp("^([0-9]+):([0-9]+):([0-9]+)$");
    var result = timeReg.exec(string);
    return parseInt(result[1], 10) * 60 + parseInt(result[2], 10) + parseInt(result[3], 10) / 60;
}
/**
@private
为适配器添加默认的属性支持
*/
SFDataXmlBase.prototype.addDefaultProperty = function () {
    var renderType = SFDataRender.types;
    /**
     * 用来唯一的标识一个任务，每个任务必须有UID而且互不相同，不会改变
     * @name SFDataTask#UID
     * @type String
     */
    this.addTaskProperty('UID', 0, renderType.String);
    /**
     * 用来代表该任务是不是有子任务，有子任务时该项必须为True
     * @name SFDataTask#Summary
     * @type Bool
     */
    this.addTaskProperty('Summary', 0, renderType.Bool2Int);

    /**
     * 用来代表该任务是不是里程碑，目前在Start大于等于Finish的时候也会认为是里程碑
     * @name SFDataResource#Summary
     * @type Bool
     */
    this.addTaskProperty('Milestone', 0, renderType.Bool2Int);


    /**
     * 这个字段代表任务的顺序号，实际上，因为甘特图的内容是分块加载的，考虑到性能问题，默认情况下甘特图变化的时候并不维护此字段的更新
     * @name SFDataTask#ID
     * @type Number
     */
    this.addTaskProperty('ID', 0, renderType.Int);
    /**
     * 代表任务的大纲数字，实际上，因为甘特图的内容是分块加载的，考虑到性能问题，默认情况下甘特图变化的时候并不维护此字段的更新
     * @name SFDataTask#OutlineNumber
     * @type String
     */
    this.addTaskProperty('OutlineNumber', 0, renderType.String);
    /**
     * 代表任务的大纲级别，实际上，因为甘特图的内容是分块加载的，考虑到性能问题，默认情况下甘特图变化的时候并不维护此字段的更新
     * @name SFDataTask#OutlineLevel
     * @type Number
     */
    this.addTaskProperty('OutlineLevel', 0, renderType.Int);
    /**
     * 代表任务的起始时间，默认情况下甘特图会维护概要任务的起止时间和所有的子任务的起止时间一致，可以拖动甘特图上的任务条更改此属性
     * @name SFDataTask#Start
     * @type Date
     */
    this.addTaskProperty('Start', 0, renderType.Time);
    /**
     * 代表任务的结束时间，默认情况下甘特图会维护概要任务的起止时间和所有的子任务的起止时间一致，可以拖动甘特图上的任务条更改此属性
     * @name SFDataTask#Finish
     * @type Date
     */
    this.addTaskProperty('Finish', 0, renderType.Time);
    /**
     * 代表任务的名称，在任务甘特图列表框可以编辑更改此属性
     * @name SFDataTask#Name
     * @type String
     */
    this.addTaskProperty('Name', 0, renderType.String);
    /**
     * 代表该任务是否只读，如果设置为true,在甘特图的操作之中将会不允许对该任务进行操作
     * @name SFDataTask#ReadOnly
     * @type Bool
     */
    this.addTaskProperty('ReadOnly', 0, renderType.Bool2Int);


    /**
     * 0-100的数字，代表任务的完成进度，拖动甘特图上的任务条可以更改此属性
     * @name SFDataTask#PercentComplete
     * @type Number
     */
    this.addTaskProperty('PercentComplete', 0, renderType.Int);
    /**
     * 任务的说明文字
     * @name SFDataTask#Notes
     * @type String
     */
    this.addTaskProperty('Notes', 0, renderType.String);
    /**
     * 任务的限制类型，从0-7的整数，分别代表
        <ul>
            <li>0:	'越早越好'</li>
            <li>1:	'越晚越好'</li>
            <li>2:	'必须开始于'</li>
            <li>3:	'必须完成于'</li>
            <li>4:	'不得早于……开始'</li>
            <li>5:	'不得晚于……开始'</li>
            <li>6:	'不得早于……完成'</li>
            <li>7:	'不得晚于……完成'</li>
        </ul>
     * @name SFDataTask#ConstraintType
     * @type Number
     */
    this.addTaskProperty('ConstraintType', 0, renderType.Int);
    /**
     * 任务的限制时间，此属性和ConstraintType属性一起使用，默认会显示在甘特图的图标列里面
     * @name SFDataTask#ConstraintDate
     * @type Date
     */
    this.addTaskProperty('ConstraintDate', 0, renderType.Time);
    /**
     * 实际开始时间
     * @name SFDataTask#ActualStart
     * @type Date
     */
    this.addTaskProperty('ActualStart', 0, renderType.Time);
    /**
     * 实际结束时间
     * @name SFDataTask#ActualFinish
     * @type Date
     */
    this.addTaskProperty('ActualFinish', 0, renderType.Time);
    /**
     * 超级链接的文本，此属性默认会显示在甘特图的图标列里面
     * @name SFDataTask#Hyperlink
     * @type String
     */
    this.addTaskProperty('Hyperlink', 0, renderType.String);
    /**
     * 超级链接的URL地址，此属性默认会显示在甘特图的图标列里面
     * @name SFDataTask#HyperlinkAddress
     * @type String
     */
    this.addTaskProperty('HyperlinkAddress', 0, renderType.String);


    /**
     * 任务的显示样式，将影响任务在图中的样式，当前系统之中默认支持如下样式：
     * <ul>
     * <li>TaskNormal	:默认样式</li>
     * <li>TaskImportant	:显示为加重样式</li>
     * <li>TaskImportant	:显示为加重样式</li>
     * </ul>
     * 每一种样式之中，都已经对任务的普通显示、大纲、里程碑做了专门的样式处理，因此没有必要根据任务的类型来选择样式
     * @name SFDataTask#ClassName
     * @type String
     */
    this.addTaskProperty('ClassName', 0, renderType.String);
    /**
     * 该任务（概要任务）是否被折叠，点击概要任务名称之中的+-图标可以更改此属性
     * @name SFDataTask#Collapse
     * @type Bool
     */
    this.addTaskProperty('Collapse', 0, renderType.Bool2Int);
    /**
     * 该任务显示行高的像素值，在任务列表中拖动任务之间的分隔条可以调整该值
     * @name SFDataTask#LineHeight
     * @type Number
     */
    this.addTaskProperty('LineHeight', 0, renderType.Int);
    /**
     * 代表该任务是否是关键任务
     * @name SFDataTask#Critical
     * @type Bool
     */
    this.addTaskProperty('Critical', 0, renderType.Bool2Int);


    /**
     * 跟踪甘特图的起始时间
     * @name SFDataTask#BaselineStart
     * @type Date
     */
    this.addTaskProperty('BaselineStart', 'Baseline/Start', renderType.Time);
    /**
     * 跟踪甘特图的结束时间
     * @name SFDataTask#BaselineFinish
     * @type Date
     */
    this.addTaskProperty('BaselineFinish', 'Baseline/Finish', renderType.Time);


    /**
     * 用来唯一的标识一个资源，每个资源必须有UID而且互不相同，不会改变
     * @name SFDataResource#UID
     * @type String
     */
    this.addResourceProperty('UID', 0, renderType.String);
    /**
     * 用来代表该任务是不是有子资源，有子资源时该项必须为True
     * @name SFDataResource#Summary
     * @type Bool
     */
    this.addResourceProperty('Summary', 0, renderType.Bool2Int);
    /**
     * 该资源是否被折叠，点击资源名称之中的+-图标可以更改此属性
     * @name SFDataResource#Collapse
     * @type Bool
     */
    this.addResourceProperty('Collapse', 0, renderType.Bool2Int);
    /**
     * 该资源是否被折叠，点击资源名称之中的+-图标可以更改此属性
     * @name SFDataResource#Name
     * @type String
     */
    this.addResourceProperty('Name', 0, renderType.String);
    /**
     * 代表资源的名称，在资源甘特图列表框可以编辑更改此属性
     * @name SFDataResource#ID
     * @type Number
     */
    this.addResourceProperty('ID', 0, renderType.Int);
    /**
     * 这个字段代表资源的顺序号，实际上，因为甘特图的内容是分块加载的，考虑到性能问题，默认情况下甘特图变化的时候并不维护此字段的更新
     * @name SFDataResource#OutlineNumber
     * @type String
     */
    this.addResourceProperty('OutlineNumber', 0, renderType.String);
    /**
     * 代表资源的大纲数字，实际上，因为甘特图的内容是分块加载的，考虑到性能问题，默认情况下甘特图变化的时候并不维护此字段的更新
     * @name SFDataResource#OutlineLevel
     * @type Number
     */
    this.addResourceProperty('OutlineLevel', 0, renderType.Int);
    /**
     * 代表该资源是否只读，如果设置为true,在甘特图的操作之中将会不允许对该任务进行操作
     * @name SFDataResource#ReadOnly
     * @type Bool
     */
    this.addResourceProperty('ReadOnly', 0, renderType.Bool2Int);
    /**
     * 资源的说明文字
     * @name SFDataResource#Notes
     * @type String
     */
    this.addResourceProperty('Notes', 0, renderType.String);


    /**
     * 用来唯一的标识一个链接，每个链接必须有UID而且互不相同，不会改变
     * @name SFDataLink#UID
     * @type String
     */
    this.addLinkProperty('UID', 0, renderType.String);
    /**
     * 该链接前置任务的UID
     * @private
     * @name SFDataLink#PredecessorUID
     * @type String
     */
    this.addLinkProperty('PredecessorUID', 0, renderType.String);
    /**
     * 该链接后置任务的UID
     * @private
     * @name SFDataLink#SuccessorUID
     * @type String
     */
    this.addLinkProperty('SuccessorUID', 0, renderType.String);
    /**
     * 链接的类型,有以下几种
        <ul>
            <li>0 : 完成-完成(FF);</li>
            <li>1 : 完成-开始(FS);</li>
            <li>2 : 开始-完成(SF);</li>
            <li>3 : 开始-开始(SS);</li>
        </ul>
     * @name SFDataLink#Type
     * @type Number
     */
    this.addLinkProperty('Type', 0, renderType.Int);


    /**
     * 用来唯一的标识一个任务，每个任务必须有UID而且互不相同，不会改变
     * @name SFDataAssignment#UID
     * @type String
     */
    this.addAssignmentProperty('UID', 0, renderType.String);
    /**
     * 分配任务的UID
     * @private
     * @name SFDataAssignment#TaskUID
     * @type String
     */
    this.addAssignmentProperty('TaskUID', 0, renderType.String);
    /**
     * 所分配资源的UID
     * @private
     * @name SFDataAssignment#ResourceUID
     * @type String
     */
    this.addAssignmentProperty('ResourceUID', 0, renderType.String);
    /**
     * 0-1的小数，代表资源的分配比例
     * @name SFDataAssignment#Units
     * @type Number
     */
    this.addAssignmentProperty('Units', 0, renderType.Float);
}
/**
为适配器添加指定的任务属性支持，添加之后甘特图会将指定的属性节点读入到数据之中，并支持修改该属性
@param {String} proName 增加的属性名称，增加以后可以使用task.getProperty(proName)来读取这个属性，也可以使用task.setProperty(proName,value)来写入这个属性
@param {String} tagName 属性在XML之中的节点名称
@param {SFDataRender} type 属性的读写方式
*/
SFDataXmlBase.prototype.addTaskProperty = function (proName, tagName, type) {
    tagName = tagName ? tagName : proName
    var obj = { proName: proName, tagName: tagName, type: type };
    this.taskReader[tagName] = obj;
    this.taskWriter[proName] = obj;
    if (tagName.indexOf("/") > 0) {
        var name = tagName.split("/")[0];
        if (!this.taskReader[name]) {
            this.taskReader[name] = [];
        }
        this.taskReader[name].push(obj);
    }
}
/**
为适配器添加指定的资源属性支持，添加之后甘特图会将指定的属性节点读入到数据之中，并支持修改该属性
@param {String} proName 增加的属性名称，增加以后可以使用resource.getProperty(proName)来读取这个属性，也可以使用resource.setProperty(proName,value)来写入这个属性
@param {String} tagName 属性在XML之中的节点名称
@param {SFDataRender} type 属性的读写方式
*/
SFDataXmlBase.prototype.addResourceProperty = function (proName, tagName, type) {
    tagName = tagName ? tagName : proName
    var obj = { proName: proName, tagName: tagName, type: type };
    this.resourceReader[tagName] = obj;
    this.resourceWriter[proName] = obj;
}
/**
为适配器添加指定的链接属性支持，添加之后甘特图会将指定的属性节点读入到数据之中，并支持修改该属性
@param {String} proName 增加的属性名称，增加以后可以使用link.getProperty(proName)来读取这个属性，也可以使用link.setProperty(proName,value)来写入这个属性
@param {String} tagName 属性在XML之中的节点名称
@param {SFDataRender} type 属性的读写方式
*/
SFDataXmlBase.prototype.addLinkProperty = function (proName, tagName, type) {
    tagName = tagName ? tagName : proName
    var obj = { proName: proName, tagName: tagName, type: type };
    this.linkReader[tagName] = obj;
    this.linkWriter[proName] = obj;
}
/**
为适配器添加指定的资源分配属性支持，添加之后甘特图会将指定的属性节点读入到数据之中，并支持修改该属性
@param {String} proName 增加的属性名称，增加以后可以使用assignment.getProperty(proName)来读取这个属性，也可以使用assignment.setProperty(proName,value)来写入这个属性
@param {String} tagName 属性在XML之中的节点名称
@param {SFDataRender} type 属性的读写方式
*/
SFDataXmlBase.prototype.addAssignmentProperty = function (proName, tagName, type) {
    tagName = tagName ? tagName : proName
    var obj = { proName: proName, tagName: tagName, type: type };
    this.assignmentReader[tagName] = obj;
    this.assignmentWriter[proName] = obj;
}
/**
@private
为适配器添加扩展属性支持
@param {XmlNode} node 扩展属性定义节点
*/
SFDataXmlBase.prototype.addExtendedAttributes = function (node) {
    if (!this.extendedAttributes) { this.extendedAttributes = {}; }
    var FieldID, FieldName;
    for (var child = node.firstChild; child; child = child.nextSibling) {
        switch (child.nodeName) {
            case "FieldID":
            case "FieldName":
                FieldName = SFAjax.getNodeValue(child);
                break;
        }
    }
    this.extendedAttributes[FieldID] = { FieldID: FieldID, FieldName: FieldName };
}
/**
@private
将一个节点作为一个任务读取并返回
@param {XmlNode} node XML节点
returns {SFDataTask}
*/
SFDataXmlBase.prototype.readTask = function (node) {
    if (!node) { return null; }
    var task = new SFDataTask();
    task.node = node;
    var reader = this.taskReader;
    for (var child = node.firstChild; child; child = child.nextSibling) {
        switch (child.nodeName) {
            case "ExtendedAttribute":
                for (var c = child.firstChild; c; c = c.nextSibling) {
                    var FieldID, Value;
                    switch (c.nodeName) {
                        case "FieldID":
                            FieldID = SFAjax.getNodeValue(c);
                            break;
                        case "Value":
                            Value = SFAjax.getNodeValue(c);
                            break;
                    }
                }
                task[FieldID] = Value;
                //task.setProperty(FieldID,Value);
                break;
            default:
                var property = reader[child.nodeName];
                if (property) {
                    if (property.length) {
                        for (var c = child.firstChild; c; c = c.nextSibling) {
                            if (c.nodeName.indexOf("#") == 0) { continue; }
                            var pro = reader[child.nodeName + "/" + c.nodeName];
                            if (pro) {
                                task[pro.proName] = SFDataRender.read.apply(pro.type, [c]);
                                //task.setProperty(pro.proName,SFDataRender.read.apply(pro.type,[c]));
                            }
                        }
                    }
                    else {
                        task[property.proName] = SFDataRender.read.apply(property.type, [child]);
                        //task.setProperty(property.proName,SFDataRender.read.apply(property.type,[child]));
                    }
                }
                break;
        }
    }
    this.taskCount++;
    if (task.OutlineNumber) {
        if (!task.OutlineLevel) {
            task.OutlineLevel = task.OutlineNumber == "0" ? 0 : task.OutlineNumber.split(".").length;
        }
        task.OriginalLevel = task.OutlineLevel;
    }
    return task;
}
/**
@private
将一个节点作为一个资源读取并返回
@param {XmlNode} node XML节点
returns {SFDataResource}
*/
SFDataXmlBase.prototype.readResource = function (node) {
    if (!node) { return null; }
    var resource = new SFDataResource();
    resource.node = node;
    var reader = this.resourceReader;
    for (var child = node.firstChild; child; child = child.nextSibling) {
        var property = reader[child.nodeName];
        if (property) {
            resource[property.proName] = SFDataRender.read.apply(property.type, [child]);
            //resource.setProperty(property.proName,SFDataRender.read.apply(property.type,[child]));
        }
    }
    if (resource.OutlineNumber) {
        if (!resource.OutlineLevel) {
            resource.OutlineLevel = resource.OutlineNumber == "0" ? 0 : resource.OutlineNumber.split(".").length;
        }
        resource.OriginalLevel = resource.OutlineLevel;
    }
    return resource;
}
/**
@private
将一个节点作为一个链接读取并返回
@param {XmlNode} node XML节点
returns {SFDataLink}
*/
SFDataXmlBase.prototype.readLink = function (node) {
    if (!node) { return null; }
    var link = new SFDataLink();
    link.node = node;
    var reader = this.linkReader;
    for (var child = node.firstChild; child; child = child.nextSibling) {
        var property = reader[child.nodeName];
        if (property) {
            link[property.proName] = SFDataRender.read.apply(property.type, [child]);
        }
    }
    return link;
}
/**
@private
将一个节点作为一个任务分配读取并返回
@param {XmlNode} node XML节点
returns {SFDataAssignment}
*/
SFDataXmlBase.prototype.readAssignment = function (node) {
    if (!node) { return null; }
    var assignment = new SFDataAssignment();
    assignment.node = node;
    var reader = this.assignmentReader;
    for (var child = node.firstChild; child; child = child.nextSibling) {
        var property = reader[child.nodeName];
        if (property) {
            assignment[property.proName] = SFDataRender.read.apply(property.type, [child]);
        }
    }
    return assignment;
}
/**
@private
将一个节点作为指定任务的一个链接读取并返回
@param {SFDataTask} task 任务
@param {XmlNode} node XML节点
returns {SFDataLink}
*/
SFDataXmlBase.prototype.readTaskLink = function (task, node) {
    if (!node) { return null; }
    var link = this.readLink(node);
    link[node.nodeName == "PredecessorLink" ? "SuccessorTask" : "PredecessorTask"] = task;
    return link;
}
/**
@private
将一个节点作为指定任务的一个资源分配读取并返回
@param {SFDataTask} task 任务
@param {XmlNode} node XML节点
returns {SFDataAssignment}
*/
SFDataXmlBase.prototype.readTaskAssignment = function (task, node) {
    if (!node) { return null; }
    var assignment = this.readAssignment(node);
    assignment.task = task;
    return assignment;
}
/**
@private
将一个节点作为指定资源的一个分配读取并返回
@param {SFDataResource} resource 资源
@param {XmlNode} node XML节点
returns {SFDataAssignment}
*/
SFDataXmlBase.prototype.readResourceAssignment = function (resource, node) {
    if (!node) { return null; }
    var assignment = this.readAssignment(node);
    assignment.resource = resource;
    return assignment;
}
/**
@private
更新指定元素的属性和节点内容
@param {Json} writer 读写方式集合
@param {SFDataElement} item 元素
@param {String} proName 属性名称
@param {variant} value 属性的值
*/
SFDataXmlBase.prototype.updateItem = function (writer, item, proName, value) {
    var property = writer[proName];
    if (property) {
        var node = SFAjax.selectSingleNode(item.node, property.tagName);
        if (!node) {
            var names = property.tagName.split("/"), pNode = item.node;
            for (var i = 0; i < names.length; i++) {
                if (!names[i]) { continue; }
                node = SFAjax.selectSingleNode(pNode, names[i]);
                if (!node) {
                    node = pNode.ownerDocument.createElement(names[i]);
                    pNode.appendChild(node);
                }
                pNode = node;
            }
        }
        SFDataRender.write.apply(property.type, [node, value])
    }
    if (!writer[proName] && this.extendedAttributes && this.extendedAttributes[proName])//如果是扩展字段
    {
        for (var child = item.node.firstChild; child; child = child.nextSibling) {
            if (child.nodeName != "ExtendedAttribute") { continue; }
            var idNode = SFAjax.selectSingleNode(child, "FieldID");
            if (!idNode || SFAjax.getNodeValue(idNode) != proName) { continue; }
            var valueNode = SFAjax.selectSingleNode(child, "Value");
            if (!valueNode) {
                valueNode = child.ownerDocument.createElement("Value");
                child.appendChild(valueNode);
            }
            SFDataRender.write.apply(SFDataRender.types.String, [valueNode, value]);
            return;
        }
        var child = item.node.ownerDocument.createElement("ExtendedAttribute");
        var idNode = child.ownerDocument.createElement("FieldID");
        SFDataRender.write.apply(SFDataRender.types.String, [idNode, proName]);
        child.appendChild(idNode);
        var valueNode = child.ownerDocument.createElement("Value");
        SFDataRender.write.apply(SFDataRender.types.String, [valueNode, value]);
        child.appendChild(valueNode);
    }
}
/**
@private
更新指定任务的属性
@param {SFDataTask} task
@param {String} proName 属性名称
@param {variant} value 属性的值
*/
SFDataXmlBase.prototype.updateTask = function (task, proName, value) {
    if (!this.saveChange) { return; }
    this.updateItem(this.taskWriter, task, proName, value);
}
/**
@private
更新指定链接的属性
@param {SFDataLink} link
@param {String} proName 属性名称
@param {variant} value 属性的值
*/
SFDataXmlBase.prototype.updateLink = function (link, proName, value) {
    if (!this.saveChange) { return; }
    this.updateItem(this.linkWriter, link, proName, value);
}
/**
@private
更新指定资源的属性
@param {SFDataResource} resource
@param {String} proName 属性名称
@param {variant} value 属性的值
*/
SFDataXmlBase.prototype.updateResource = function (resource, proName, value) {
    if (!this.saveChange) { return; }
    this.updateItem(this.resourceWriter, resource, proName, value);
}
/**
@private
更新指定资源分配的属性
@param {SFDataAssignment} assignment
@param {String} proName 属性名称
@param {variant} value 属性的值
*/
SFDataXmlBase.prototype.updateAssignment = function (assignment, proName, value) {
    if (!this.saveChange) { return; }
    this.updateItem(this.assignmentWriter, assignment, proName, value);
}
window.SFDataXmlBase = SFDataXmlBase;
/**
采用向日葵甘特图指定的XML格式作为数据源的数据适配器对象，这种xml格式是在ms project的xml格式的基础上，进行一些节点的调整以提升Web性能，并支持按需下载技术；
@see 关于此格式的详细说明请参考 <a href="http://www.51diaodu.cn/sfgantt/docs/sfgantt%20xml%20introduce/sfgantt_schema.html">向日葵甘特图XML格式说明</a>.
@extends SFDataXmlBase
@class
*/
function SFDataXml(url, config) {
    SFGlobal.setProperty(this, { taskReader: {}, taskWriter: {}, resourceReader: {}, resourceWriter: {}, linkReader: {}, linkWriter: {}, assignmentReader: {}, assignmentWriter: {} });
    var doc = (typeof (url) == "string") ? this.loadUrl(url) : url;
    config = config ? config : new SFConfig();
    /**
    是否将数据的更改写入到源文件之中，如果设置为true，就可以获取最终修改后的XML文件，不过会降低性能
    @name SFDataXml#saveChange
    @type Bool
    @default false
    */
    SFConfig.applyProperty(this, config.getConfigObj("SFDataXml"));
    SFGlobal.setProperty(this, { doc: doc, config: config });
    this.addDefaultProperty();
}
SFDataXml.prototype = new window.SFDataXmlBase();
/**
@private
数据源的初始化，每个数据源的实现都会重写此方法
*/
SFDataXml.prototype.initialize = function () {
    SFDataXmlBase.prototype.initialize.apply(this, arguments);
}
/**
@private
加载指定URL的XML文档并返回，这是一个同步的加载过程，直接返回结果
@param {String} url xml文档的URL地址
@returns {XmlDocument} 返回加载完成后的XML文档
*/
SFDataXml.prototype.loadUrl = function (url) {
    var doc;
    function onXmlLoad(d) { doc = d; }
    SFAjax.loadXml(url, onXmlLoad, false);
    return doc;
}
/**
@private
返回数据源使用的工作日历对象
@returns {SFWorkingCalendar}
*/
SFDataXml.prototype.getCalendar = function () {
    var calId;
    var node = SFAjax.selectSingleNode(this.doc.documentElement, "CalendarUID");
    if (node) {
        calId = SFAjax.getNodeValue(node);
        var calsNode = SFAjax.selectSingleNode(this.doc.documentElement, "Calendars");
        for (var child = calsNode.firstChild; child; child = child.nextSibling) {
            if (child.nodeName != "Calendar") { continue; }
            if (SFAjax.getNodeValue(SFAjax.selectSingleNode(child, "UID")) == calId) {
                return this.readCalendar(child);
            }
        }
    }
    return SFWorkingCalendar.getCalendar("Standard");
}
/**
@private
读取并返回根任务
@returns {SFDataTask}
*/
SFDataXml.prototype.readRootTask = function () {
    var rootTaskNode = SFAjax.selectSingleNode(this.doc.documentElement, "Task");
    if (!rootTaskNode) {
        var task = this.addTask();
        return task;
    }
    return this.readTask(rootTaskNode);
}
/**
@private
读取并返回指定任务的第一个子任务，如果不存在，则返回null
@param {SFDataTask} task
@returns {SFDataTask}
*/
SFDataXml.prototype.readTaskFirstChild = function (task) {
    if (!task.node) { return null; }
    if (task.node.getAttribute("ChildrenDataUrl"))//如果节点是一个大纲,并且存在需要下载的数据
    {
        var doc = this.loadUrl(task.node.getAttribute("ChildrenDataUrl"));
        task.node.removeAttribute("ChildrenDataUrl");
        var tasksNode = SFAjax.selectSingleNode(task.node, "Tasks");
        if (!tasksNode) {
            tasksNode = task.node.ownerDocument.createElement("Tasks");
            task.node.appendChild(tasksNode);
        }
        while (doc.documentElement.firstChild) {
            var taskNode = doc.documentElement.firstChild;
            doc.documentElement.removeChild(taskNode);
            tasksNode.appendChild(taskNode);
        }
    }
    return this.readTask(SFAjax.selectSingleNode(task.node, "Tasks/Task"));
}
/**
@private
读取并返回指定任务的下一个同级任务，如果不存在，则返回null
@param {SFDataTask} task
@returns {SFDataTask}
*/
SFDataXml.prototype.readTaskNextSibling = function (task) {
    if (!task.node) { return null; }
    if (task.node.getAttribute("NextSiblingDataUrl"))//如果节点是一个大纲,并且存在需要下载的数据
    {
        var doc = this.loadUrl(task.node.getAttribute("NextSiblingDataUrl"));
        task.node.removeAttribute("NextSiblingDataUrl");
        var tasksNode = SFAjax.selectSingleNode(task.getParentTask().node, "Tasks");
        while (doc.documentElement.firstChild) {
            var taskNode = doc.documentElement.firstChild;
            doc.documentElement.removeChild(taskNode);
            tasksNode.appendChild(taskNode);
        }
    }
    return this.readTask(SFAjax.getNextSibling(task.node.nextSibling, "Task"));
}
/**
@private
读取并返回根资源
@returns {SFDataResource}
*/
SFDataXml.prototype.readRootResource = function () {
    var rootResourceNode = SFAjax.selectSingleNode(this.doc.documentElement, "Resource");
    if (!rootResourceNode) {
        var resource = this.addResource();
        return resource;
    }
    return this.readResource(rootResourceNode);
}
/**
@private
读取并返回指定资源的第一个子资源，如果不存在，则返回null
@param {SFDataResource} resource
@returns {SFDataResource}
*/
SFDataXml.prototype.readResourceFirstChild = function (resource) {
    if (!resource.node) { return null; }
    if (resource.node.getAttribute("ChildrenDataUrl"))//如果节点是一个大纲,并且存在需要下载的数据
    {
        var doc = this.loadUrl(resource.node.getAttribute("ChildrenDataUrl"));
        resource.node.removeAttribute("ChildrenDataUrl");
        var resourcesNode = SFAjax.selectSingleNode(resource.node, "Resources");
        if (!resourcesNode) {
            resourcesNode = resource.node.ownerDocument.createElement("Resources");
            resource.node.appendChild(resourcesNode);
        }
        while (doc.documentElement.firstChild) {
            var resourceNode = doc.documentElement.firstChild;
            doc.documentElement.removeChild(resourceNode);
            resourcesNode.appendChild(resourceNode);
        }
    }
    return this.readResource(SFAjax.selectSingleNode(resource.node, "Resources/Resource"));
}
/**
@private
读取并返回指定资源的下一个同级资源，如果不存在，则返回null
@param {SFDataResource} resource
@returns {SFDataResource}
*/
SFDataXml.prototype.readResourceNextSibling = function (resource) {
    if (!resource.node) { return null; }
    if (resource.node.getAttribute("NextSiblingDataUrl"))//如果节点是一个大纲,并且存在需要下载的数据
    {
        var doc = this.loadUrl(resource.node.getAttribute("NextSiblingDataUrl"));
        resource.node.removeAttribute("NextSiblingDataUrl");
        var resourcesNode = SFAjax.selectSingleNode(resource.getParentResource().node, "Resources");
        while (doc.documentElement.firstChild) {
            var resourceNode = doc.documentElement.firstChild;
            doc.documentElement.removeChild(resourceNode);
            resourcesNode.appendChild(resourceNode);
        }
    }
    return this.readResource(SFAjax.getNextSibling(resource.node.nextSibling, "Resource"));
}
/**
@private
读取并返回指定任务的第一个链接，如果不存在，则返回null
@param {SFDataTask} task
@returns {SFDataLink}
*/
SFDataXml.prototype.readTaskFirstLink = function (task) {
    var node, taskNode = task.node;
    if (!taskNode) { return null; }
    for (node = taskNode.firstChild; node; node = node.nextSibling) { if (node.nodeName == "PredecessorLink" || node.nodeName == "SuccessorLink") { break; } }
    if (node == null) { node = SFAjax.selectSingleNode(taskNode, "Links/*"); }
    return this.readTaskLink(task, node);
}
/**
@private
读取并返回指定任务的下一个链接，如果不存在，则返回null
@param {SFDataTask} task
@param {SFDataLink} link
@returns {SFDataLink}
*/
SFDataXml.prototype.readTaskNextLink = function (task, link) {
    var node, linkNode = link.node;
    if (!linkNode) { return null; }
    for (node = linkNode.nextSibling; node; node = node.nextSibling) { if (node.nodeName == "PredecessorLink" || node.nodeName == "SuccessorLink") { break; } }
    if (!node && linkNode.parentNode.nodeName != "Links") {
        node = SFAjax.selectSingleNode(linkNode, "../Links/*");
    }
    return this.readTaskLink(task, node);
}
/**
@private
读取并返回指定任务的第一个资源分配，如果不存在，则返回null
@param {SFDataTask} task
@returns {SFDataAssignment}
*/
SFDataXml.prototype.readTaskFirstAssignment = function (task) {
    if (!task.node) { return null; }
    return this.readTaskAssignment(task, SFAjax.selectSingleNode(task.node, "Assignments/Assignment"));
}
/**
@private
读取并返回指定任务的下一个资源分配，如果不存在，则返回null
@param {SFDataTask} task
@param {SFDataAssignment} assignment
@returns {SFDataAssignment}
*/
SFDataXml.prototype.readTaskNextAssignment = function (task, assignment) {
    if (!assignment.node) { return null; }
    return this.readTaskAssignment(task, SFAjax.getNextSibling(assignment.node.nextSibling, "Assignment"))
}
/**
@private
读取并返回指定资源的第一个分配，如果不存在，则返回null
@param {SFDataResource} resource
@returns {SFDataAssignment}
*/
SFDataXml.prototype.readResourceFirstAssignment = function (resource) {
    if (!resource.node) { return null; }
    return this.readTaskAssignment(resource, SFAjax.selectSingleNode(resource.node, "Assignments/Assignment"));
}
/**
@private
读取并返回指定资源的下一个资源分配，如果不存在，则返回null
@param {SFDataResource} resource
@param {SFDataAssignment} assignment
@returns {SFDataAssignment}
*/
SFDataXml.prototype.readResourceNextAssignment = function (resource, assignment) {
    if (!assignment.node) { return null; }
    return this.readTaskAssignment(resource, SFAjax.getNextSibling(assignment.node.nextSibling, "Assignment"))
}
/**
@private
在指定的位置插入节点
@param {XmlNode} node 需要插入的xml节点
@param {SFDataElement} parent 插入位置的父元素,如果直接在文档根节点下插入，则为null
@param {SFDataElement} previousSibling 插入位置的上一个同级元素,如果是父元素的第一个子元素，则为null
@param {String} gName 节点组名称
*/
SFDataXml.prototype.insertNode = function (node, parent, previousSibling, gName) {
    if (parent) {
        var parentNode = SFAjax.selectSingleNode(parent.node, gName);
        if (!parentNode) {
            parentNode = parent.node.ownerDocument.createElement(gName);
            parent.node.appendChild(parentNode);
        }
        if (previousSibling) {
            if (previousSibling.node.nextSibling) {
                parentNode.insertBefore(node, previousSibling.node.nextSibling);
            }
            else {
                parentNode.appendChild(node);
            }
        }
        else {
            parentNode.insertBefore(node, parentNode.firstChild);
        }
    }
    else {
        this.doc.documentElement.appendChild(node);
    }
}
/**
@private
在指定的位置插入新任务并返回
@param {SFDataTask} parent 新任务的父任务
@param {SFDataTask} pTask 新任务的上一个同级任务，如果新任务是父任务的第一个子任务，则为null
@returns {SFDataTask}
*/
SFDataXml.prototype.addTask = function (parent, pTask) {
    var task = new SFDataTask();
    if (this.saveChange) {
        var node = parent.node.ownerDocument.createElement("Task");
        this.insertNode(node, parent, pTask, "Tasks");
        task.node = node;
    }
    return task;
}
/**
@private
删除指定的任务
@param {SFDataTask} task 需要删除的任务
*/
SFDataXml.prototype.deleteTask = function (task) {
    if (!this.saveChange) { return; }
    task.node.parentNode.removeChild(task.node);
}
/**
@private
移动任务到指定的位置
@param {SFDataTask} task 需要移动的任务
@param {SFDataTask} parent 新位置的父任务
@param {SFDataTask} pTask 新位置的上一个同级任务，如果新位置是父任务的第一个子任务，则为null
*/
SFDataXml.prototype.moveTask = function (task, parentTask, pTask) {
    if (!this.saveChange) { return; }
    task.node.parentNode.removeChild(task.node);
    this.insertNode(task.node, parentTask, pTask, "Tasks");
}
/**
@private
在指定的位置插入新资源并返回
@param {SFDataResource} parent 新资源的父资源
@param {SFDataResource} pResource 新资源的上一个同级资源，如果新资源是父资源的第一个子资源，则为null
@returns {SFDataResource}
*/
SFDataXml.prototype.addResource = function (parent, pResource) {
    var resource = new SFDataResource();
    if (this.saveChange) {
        var node = parent.node.ownerDocument.createElement("Resource");
        this.insertNode(node, parent, pResource, "Resources");
        resource.node = node;
    }
    return resource;
}
/**
@private
删除指定的资源
@param {SFDataResource} resource 需要删除的资源
*/
SFDataXml.prototype.deleteResource = function (resource) {
    if (!this.saveChange) { return; }
    resource.node.parentNode.removeChild(resource.node);
}
/**
@private
移动资源到指定的位置
@param {SFDataResource} resource 需要移动的资源
@param {SFDataResource} parent 新位置的父资源
@param {SFDataResource} pResource 新位置的上一个同级资源，如果新位置是父资源的第一个子资源，则为null
*/
SFDataXml.prototype.moveResource = function (resource, parentResource, pResource) {
    if (!this.saveChange) { return; }
    resource.node.parentNode.removeChild(resource.node);
    this.insertNode(resource.node, parentResource, pResource, "Resources");
}
/**
@private
在指定的任务之间添加链接并返回
@param {SFDataTask} selfTask 链接的后置任务
@param {SFDataTask} preTask 链接的前置任务
@param {Number} type 链接的类型，请参看{@link SFDataLink#Type}
@returns {SFDataLink}
*/
SFDataXml.prototype.addLink = function (selfTask, preTask, type) {
    var link = new SFDataLink();
    if (this.saveChange) {
        var doc = selfTask.node.ownerDocument;
        var node = doc.createElement("PredecessorLink");
        var child = doc.createElement("PredecessorUID");
        SFAjax.setNodeValue(child, preTask.UID);
        node.appendChild(child);
        var child = doc.createElement("Type");
        SFAjax.setNodeValue(child, type);
        node.appendChild(child);
        link.node = node;
        link.setProperty("Type", type);
        var linksNode = SFAjax.selectSingleNode(selfTask.node, "Links");
        if (!linksNode) {
            linksNode = selfTask.node.ownerDocument.createElement("Links");
            selfTask.node.appendChild(linksNode);
        }
        linksNode.appendChild(node);
    }
    return link;
}
/**
@private
删除指定的链接
@param {SFDataLink} link 需要删除的链接
*/
SFDataXml.prototype.deleteLink = function (link) {
    if (!this.saveChange) { return; }
    link.node.parentNode.removeChild(link.node);
}
/**
@private
添加一个资源分配并返回
@param {SFDataTask} task 分配的任务
@param {SFDataResource} resource 分配的资源
@param {Number} unit 资源的占用比例，0-1的小数
@returns {SFDataAssignment}
*/
SFDataXml.prototype.addAssignment = function (task, resource, units) {
    var assignment = new SFDataAssignment();
    if (this.saveChange) {
        var doc = this.doc;
        var node = doc.createElement("Assignment");
        var child = doc.createElement("TaskUID");
        SFAjax.setNodeValue(child, task.UID);
        node.appendChild(child);
        var child = doc.createElement("ResourceUID");
        SFAjax.setNodeValue(child, resource.UID);
        node.appendChild(child);
        var child = doc.createElement("Units");
        SFAjax.setNodeValue(child, units);
        node.appendChild(child);
        assignment.node = node;
        var assignmentsNode = SFAjax.selectSingleNode(task.node, "Assignments");
        if (!assignmentsNode) {
            assignmentsNode = task.node.ownerDocument.createElement("Assignments");
            task.node.appendChild(assignmentsNode);
        }
        assignmentsNode.appendChild(node);
    }
    return assignment;
}
/**
@private
删除指定的资源分配
@param {SFDataAssignment} assignment 需要删除的资源分配
*/
SFDataXml.prototype.deleteAssignment = function (assignment) {
    if (!this.saveChange) { return; }
    assignment.node.parentNode.removeChild(assignment.node);
}
window.SFDataXml = SFDataXml;
/**
采用MS Project的XML格式作为数据源的数据适配器对象，用来处理对Project的Xml文件格式的支持
SFDataProject不支持将任务或资源的移动操作保存到XML文件；
@param {XmlDocument} [doc] 包含数据的XML对象，如果不存在，会新建一个空的XML数据对象
@extends SFDataXmlBase
@class
*/
function SFDataProject(doc, config) {
    SFGlobal.setProperty(this, { taskReader: {}, taskWriter: {}, resourceReader: {}, resourceWriter: {}, linkReader: {}, linkWriter: {}, assignmentReader: {}, assignmentWriter: {} });
    config = config ? config : new SFConfig();
    SFConfig.applyProperty(this, config.getConfigObj("SFDataProject"));
    SFGlobal.setProperty(this, { doc: doc, config: config });
    /**
    是否将数据的更改写入到源文件之中，如果设置为true，就可以获取最终修改后的XML文件，不过会降低性能
    @name SFDataProject#saveChange
    @type Bool
    @default false
    */
    this.addDefaultProperty();
}
SFDataProject.prototype = new window.SFDataXmlBase();
/**
@private
数据源的初始化，每个数据源的实现都会重写此方法
*/
SFDataProject.prototype.initialize = function () {
    SFDataXmlBase.prototype.initialize.apply(this, arguments);
}
/**
@private
初始化数据源的XML文档
@param {XmlDocument} doc
*/
SFDataProject.prototype.loadXml = function (doc) {
    if (doc) { this.doc = doc; }
    doc = this.doc;
    if (!doc) {
        this.doc = doc = SFAjax.createDocument();
    }
    if (!doc.documentElement) {
        doc.appendChild(doc.createElement("Project"));
    }
    var node = this.doc.documentElement, child = node.firstChild;
    while (child) {
        switch (child.nodeName) {
            case "Tasks":
                this.tasksNode = child;
                break;
            case "Resources":
                this.resourcesNode = child;
                break;
            case "Assignments":
                this.assignmentsNode = child;
                break;
            case "ExtendedAttributes":
                this.addExtendedAttributes(child);
                break;
        }
        child = child.nextSibling
    }
    this.loaded = true;
}
/**
@private
返回数据源使用的工作日历对象
@returns {SFWorkingCalendar}
*/
SFDataProject.prototype.getCalendar = function () {
    var calId;
    var node = SFAjax.selectSingleNode(this.doc.documentElement, "CalendarUID");
    if (node) {
        calId = SFAjax.getNodeValue(node);
        var calsNode = SFAjax.selectSingleNode(this.doc.documentElement, "Calendars");
        for (var child = calsNode.firstChild; child; child = child.nextSibling) {
            if (child.nodeName != "Calendar") { continue; }
            if (SFAjax.getNodeValue(SFAjax.selectSingleNode(child, "UID")) == calId) {
                return this.readCalendar(child);
            }
        }
    }
    return SFWorkingCalendar.getCalendar("Standard");
}
/**
@private
获得用来包含所有任务的Tasks节点，如果不存在，则创建
@returns {XmlNode}
*/
SFDataProject.prototype.getTasksNode = function () {
    if (!this.loaded) { this.loadXml() }
    if (!this.tasksNode) {
        this.tasksNode = this.doc.createElement("Tasks");
        this.doc.documentElement.appendChild(this.tasksNode);
    }
    return this.tasksNode;
}
/**
@private
获得用来包含所有资源的Resources节点，如果不存在，则创建
@returns {XmlNode}
*/
SFDataProject.prototype.getResourcesNode = function () {
    if (!this.loaded) { this.loadXml() }
    if (!this.resourcesNode) {
        this.resourcesNode = this.doc.createElement("Resources");
        this.doc.documentElement.appendChild(this.resourcesNode);
    }
    return this.resourcesNode;
}
/**
@private
获得用来包含所有资源分配的Assignments节点，如果不存在，则创建
@returns {XmlNode}
*/
SFDataProject.prototype.getAssignmentsNode = function () {
    if (!this.loaded) { this.loadXml() }
    if (!this.assignmentsNode) {
        this.assignmentsNode = this.doc.createElement("Assignments");
        this.doc.documentElement.appendChild(this.assignmentsNode);
    }
    return this.assignmentsNode;
}
/**
@private
读取并返回根任务
@returns {SFDataTask}
*/
SFDataProject.prototype.readRootTask = function () {
    var rootTaskNode = SFAjax.getNextSibling(this.getTasksNode().firstChild, "Task");
    if (!rootTaskNode) {
        var task = this.addTask();
        return task;
    }
    return this.readTask(rootTaskNode);
}
/**
@private
读取并返回指定任务的第一个子任务，如果不存在，则返回null
@param {SFDataTask} task
@returns {SFDataTask}
*/
SFDataProject.prototype.readTaskFirstChild = function (task) {
    if (!task.node) { return null; }
    var selfLevel = task.OriginalLevel;
    var node = SFAjax.getNextSibling(task.node.nextSibling, "Task");
    if (node) {
        var level = SFAjax.selectSingleNode(node, "OutlineLevel") ? SFAjax.getNodeValue(SFAjax.selectSingleNode(node, "OutlineLevel")) : SFAjax.getNodeValue(SFAjax.selectSingleNode(node, "OutlineNumber")).split(".").length;
        if (level > selfLevel) {
            return this.readTask(node);
        }
    }
    return null;
}
/**
@private
读取并返回指定任务的下一个同级任务，如果不存在，则返回null
@param {SFDataTask} task
@returns {SFDataTask}
*/
SFDataProject.prototype.readTaskNextSibling = function (task) {
    if (!task.node) { return null; }
    var selfLevel = task.OriginalLevel;
    //不停对下一个兄弟节点进行遍历
    for (var node = task.node.nextSibling; node; node = node.nextSibling) {
        if (node.nodeName != "Task") { continue; }
        //先找出大纲
        var level = SFAjax.selectSingleNode(node, "OutlineLevel") ? SFAjax.getNodeValue(SFAjax.selectSingleNode(node, "OutlineLevel")) : SFAjax.getNodeValue(SFAjax.selectSingleNode(node, "OutlineNumber")).split(".").length;
        if (level > selfLevel) { continue; }//如果是当前节点的子节点，则不理会
        if (level == selfLevel)//如果是同级节点
        {
            return this.readTask(node);
        }
        break;
    }
    return null;
}
/**
@private
读取并返回根资源
@returns {SFDataResource}
*/
SFDataProject.prototype.readRootResource = function () {
    var rootResourceNode = this.getResourcesNode().firstChild;
    if (!rootResourceNode) {
        var resource = this.addResource("0");
        return resource;
    }
    return this.readResource(rootResourceNode);
}
/**
@private
读取并返回指定资源的第一个子资源，如果不存在，则返回null
@param {SFDataResource} resource
@returns {SFDataResource}
*/
SFDataProject.prototype.readResourceFirstChild = function (resource) {
    if (!resource.node) { return null; }
    if (resource.node != SFAjax.getNextSibling(this.getResourcesNode().firstChild, "Resource")) { return null; }
    return this.readResource(SFAjax.getNextSibling(resource.node.nextSibling, "Resource"));
}
/**
@private
读取并返回指定资源的下一个同级资源，如果不存在，则返回null
@param {SFDataResource} resource
@returns {SFDataResource}
*/
SFDataProject.prototype.readResourceNextSibling = function (resource) {
    if (!resource.node) { return null; }
    if (resource.node == SFAjax.getNextSibling(this.getResourcesNode().firstChild, "Resource")) { return null; }
    return this.readResource(SFAjax.getNextSibling(resource.node.nextSibling, "Resource"));
}
/**
@private
读取并返回指定任务的第一个链接，如果不存在，则返回null
@param {SFDataTask} task
@returns {SFDataLink}
*/
SFDataProject.prototype.readTaskFirstLink = function (task) {
    var node, taskNode = task.node;
    if (!taskNode) { return null; }
    for (node = taskNode.firstChild; node; node = node.nextSibling) { if (node.nodeName == "PredecessorLink" || node.nodeName == "SuccessorLink") { break; } }
    if (node == null) { node = SFAjax.selectSingleNode(taskNode, "Links/*"); }
    return this.readTaskLink(task, node);
}
/**
@private
读取并返回指定任务的下一个链接，如果不存在，则返回null
@param {SFDataTask} task
@param {SFDataLink} link
@returns {SFDataLink}
*/
SFDataProject.prototype.readTaskNextLink = function (task, link) {
    var node, linkNode = link.node;
    if (!linkNode) { return null; }
    for (node = linkNode.nextSibling; node; node = node.nextSibling) { if (node.nodeName == "PredecessorLink" || node.nodeName == "SuccessorLink") { break; } }
    if (!node && linkNode.parentNode.nodeName != "Links") {
        node = SFAjax.selectSingleNode(linkNode, "../Links/*");
    }
    return this.readTaskLink(task, node);
}
/**
@private
读取并返回指定任务的第一个资源分配，如果不存在，则返回null
@param {SFDataTask} task
@returns {SFDataAssignment}
*/
SFDataProject.prototype.readTaskFirstAssignment = function (task) {
    var uid = task.UID;
    for (var node = this.getAssignmentsNode().firstChild; node; node = node.nextSibling) {
        if (node.nodeName != "Assignment") { continue; }
        if (SFAjax.getNodeValue(SFAjax.selectSingleNode(node, "TaskUID")) == uid) {
            return this.readTaskAssignment(task, node);
        }
    }
    return null;
}
/**
@private
读取并返回指定任务的下一个资源分配，如果不存在，则返回null
@param {SFDataTask} task
@param {SFDataAssignment} assignment
@returns {SFDataAssignment}
*/
SFDataProject.prototype.readTaskNextAssignment = function (task, assignment) {
    if (!assignment.node) { return null; }
    var uid = task.UID;
    for (var node = assignment.node.nextSibling; node; node = node.nextSibling) {
        if (node.nodeName != "Assignment") { continue; }
        if (SFAjax.getNodeValue(SFAjax.selectSingleNode(node, "TaskUID")) == uid) {
            return this.readTaskAssignment(task, node);
        }
    }
    return null;
}
/**
@private
读取并返回指定资源的第一个分配，如果不存在，则返回null
@param {SFDataResource} resource
@returns {SFDataAssignment}
*/
SFDataProject.prototype.readResourceFirstAssignment = function (resource) {
    var uid = resource.UID;
    for (var node = this.getAssignmentsNode().firstChild; node; node = node.nextSibling) {
        if (node.nodeName != "Assignment") { continue; }
        if (SFAjax.getNodeValue(SFAjax.selectSingleNode(node, "ResourceUID")) == uid) {
            return this.readResourceAssignment(resource, node);
        }
    }
    return null;
}
/**
@private
读取并返回指定资源的下一个资源分配，如果不存在，则返回null
@param {SFDataResource} resource
@param {SFDataAssignment} assignment
@returns {SFDataAssignment}
*/
SFDataProject.prototype.readResourceNextAssignment = function (resource, assignment) {
    if (!assignment.node) { return null; }
    var uid = resource.UID;
    for (var node = assignment.node.nextSibling; node; node = node.nextSibling) {
        if (node.nodeName != "Assignment") { continue; }
        if (SFAjax.getNodeValue(SFAjax.selectSingleNode(node, "ResourceUID")) == uid) {
            return this.readResourceAssignment(resource, node);
        }
    }
    return null;
}
/**
@private
在指定的位置插入新任务并返回
@param {SFDataTask} parent 新任务的父任务
@param {SFDataTask} pTask 新任务的上一个同级任务，如果新任务是父任务的第一个子任务，则为null
@returns {SFDataTask}
*/
SFDataProject.prototype.addTask = function (parent, pTask) {
    var task = new SFDataTask();
    if (this.saveChange) {
        var tasksNode = this.getTasksNode();
        var node = tasksNode.ownerDocument.createElement("Task");
        if (parent) {
            var beforeNode = pTask ? pTask.node : parent.node;
            if (beforeNode.nextSibling) {
                tasksNode.insertBefore(node, beforeNode.nextSibling);
            }
            else {
                tasksNode.appendChild(node);
            }
        }
        else {
            tasksNode.insertBefore(node, tasksNode.firstChild);
        }
        task.node = node;
    }
    return task;
}
/**
@private
删除指定的任务
@param {SFDataTask} task 需要删除的任务
*/
SFDataProject.prototype.deleteTask = function (task) {
    if (!this.saveChange) { return; }
    task.node.parentNode.removeChild(task.node);
}
/**
@private
在指定的位置插入新资源并返回
@param {SFDataResource} parent 新资源的父资源
@param {SFDataResource} pResource 新资源的上一个同级资源，如果新资源是父资源的第一个子资源，则为null
@returns {SFDataResource}
*/
SFDataProject.prototype.addResource = function (parent, pResource) {
    var resource = new SFDataResource();
    if (this.saveChange) {
        var resourcesNode = this.getResourcesNode();
        var node = resourcesNode.ownerDocument.createElement("Resource");
        var beforeNode = pResource ? pResource.node : parent.node;
        if (beforeNode.nextSibling) {
            resourcesNode.insertBefore(node, beforeNode.nextSibling);
        }
        else {
            resourcesNode.appendChild(node);
        }
        resource.node = node;
    }
    return resource;
}
/**
@private
删除指定的资源
@param {SFDataResource} resource 需要删除的资源
*/
SFDataProject.prototype.deleteResource = function (resource) {
    if (!this.saveChange) { return; }
    resource.node.parentNode.removeChild(resource.node);
}
/**
@private
在指定的任务之间添加链接并返回
@param {SFDataTask} selfTask 链接的后置任务
@param {SFDataTask} preTask 链接的前置任务
@param {Number} type 链接的类型，请参看{@link SFDataLink#Type}
@returns {SFDataLink}
*/
SFDataProject.prototype.addLink = function (selfTask, preTask, type) {
    var link = new SFDataLink();
    if (this.saveChange) {
        var doc = selfTask.node.ownerDocument;
        var node = doc.createElement("PredecessorLink");
        var child = doc.createElement("PredecessorUID");
        SFAjax.setNodeValue(child, preTask.UID);
        node.appendChild(child);
        link.node = node;
        if (type) {
            var child = doc.createElement("Type");
            SFAjax.setNodeValue(child, type);
            node.appendChild(child);
            link.setProperty("Type", type);
        }
        selfTask.node.appendChild(node);
    }
    return link;
}
/**
@private
删除指定的链接
@param {SFDataLink} link 需要删除的链接
*/
SFDataProject.prototype.deleteLink = function (link) {
    if (!this.saveChange) { return; }
    link.node.parentNode.removeChild(link.node);
}
/**
@private
添加一个资源分配并返回
@param {SFDataTask} task 分配的任务
@param {SFDataResource} resource 分配的资源
@param {Number} unit 资源的占用比例，0-1的小数
@returns {SFDataAssignment}
*/
SFDataProject.prototype.addAssignment = function (task, resource, units) {
    var assignment = new SFDataAssignment();
    if (this.saveChange) {
        var doc = this.doc;
        var node = doc.createElement("Assignment");
        var child = doc.createElement("TaskUID");
        SFAjax.setNodeValue(child, task.UID);
        node.appendChild(child);
        var child = doc.createElement("ResourceUID");
        SFAjax.setNodeValue(child, resource.UID);
        node.appendChild(child);
        if (units) {
            var child = doc.createElement("Units");
            SFAjax.setNodeValue(child, units);
            node.appendChild(child);
            assignment.setProperty("Units", units);
        }
        assignment.node = node;
        this.getAssignmentsNode().appendChild(node);
    }
    return assignment;
}
/**
@private
删除指定的资源分配
@param {SFDataAssignment} assignment 需要删除的资源分配
*/
SFDataProject.prototype.deleteAssignment = function (assignment) {
    if (!this.saveChange) { return; }
    assignment.node.parentNode.removeChild(assignment.node);
}
window.SFDataProject = SFDataProject;
/**
甘特图对象,本对象是甘特图的主体对象,代表页面上的甘特图实例，你也可以在页面上运行多个甘特图实例
@param {SFConfig} gConfig 甘特图的配置参数，这些参数直接影响到甘特图的绘制，其中的大部分设置之后在本次甘特图实例之中不能更改
@param {SFData} data 甘特图的数据对象，也就是甘特图所显示的数据的来源
@class
*/
function SFGantt(gConfig, data) {
    gConfig = this.config = gConfig ? gConfig : new SFConfig();
    this.elementType = "Task";
    SFConfig.applyProperty(this, gConfig.getConfigObj("SFGantt"));
    this.initContainer();
    this.setViewSize(SFGlobal.getElementSize(this.container));
    this.controls = [];
    var doc = this.container.ownerDocument;
    if (doc.createDocumentFragment) { this.containerFragment = doc.createDocumentFragment(); }
    var elementList;

    this.addControl(new SFGanttTooltipControl());
    this.addControl(new SFGanttContextMenuControl());
    this.addControl(new SFGanttImageControl());
    this.addControl(new SFGanttCursorControl());
    this.addControl(new SFGanttDragResizeControl());
    this.addControl(new SFGanttHelpLinkControl());
    //this.addControl(new SFGanttLogoControl());
    this.addControl(new SFGanttSizeLimitControl());
    this.addControl(new SFGanttClipboardControl());
    this.addControl(new SFGanttAutoResizeControl());
    this.addControl(new SFGanttElementSelectControl({ elementType: this.elementType }));
    this.addControl(new SFGanttChangeEventControl({ elementType: this.elementType }));
    /**
    是否网络图模式
    @name SFConfig.configItems.SFGantt_showNetwork
    @type Bool
    @default false
    */
    if (this.showNetwork) {
        this.addControl(new SFGanttNetworkControl());
    }
    else {
        this.addControl(new SFGanttLayoutControl());
        this.addControl(new SFGanttBodyHeightControl());
        /**
        任务甘特图左侧主体列表之中的各个列名称,用逗号分隔，所有系统集成任务列的定义请参看{@link SFGanttField.taskFields}
        @name SFConfig.configItems.SFGantt_taskFieldNames
        @type String
        @default StatusIcon,Name,Start,Finish,Limit
        */
        /**
        任务甘特图左侧ID列表之中的各个列名称,用逗号分隔，所有系统集成任务列的定义请参看{@link SFGanttField.taskFields}
        @name SFConfig.configItems.SFGantt_taskIdFieldNames
        @type String
        @default Empty
        */
        /**
        资源甘特图左侧主体列表之中的各个列名称,用逗号分隔，所有系统集成资源列的定义请参看{@link SFGanttField.resourceFields}
        @name SFConfig.configItems.SFGantt_resourceFieldNames
        @type String
        @default StatusIcon,Name
        */
        /**
        资源甘特图左侧ID列表之中的各个列名称,用逗号分隔，所有系统集成资源列的定义请参看{@link SFGanttField.resourceFields}
        @name SFConfig.configItems.SFGantt_resourceIdFieldNames
        @type String
        @default Empty
        */
        this.addControl(new SFGanttFieldList(this[this.elementType.toLowerCase() + "FieldNames"].split(",")));
        this.addControl(new SFGanttDrawControl());
        this.addControl(new SFGanttViewItemsControl(this.elementType));
        this.addControl(new SFGanttScrollControl());
        /**
        图片文件URL目录的路径
        @name SFConfig.configItems.SFGantt_imgPath
        @type String
        @default http://www.51diaodu.cn/sfgantt/img/
        */
        /**
        图片文件的扩展名,线上的版本因为要使用缓存，在原有扩展名后加上了.aspx
        @name SFConfig.configItems.SFGantt_imgType
        @type String
        @default .gif.aspx
        */
        /**
        甘特图中间主体部分的背景色
        @name SFConfig.configItems.SFGantt_bodyBgColor
        @type Color
        @default #FFFFFF
        */
        /**
        左侧ID列表的背景颜色
        @name SFConfig.configItems.SFGantt_idCellBgColor
        @type Color
        @default #F4F4F4
        */
        this.addControl(elementList = new SFGanttElementList({ fieldNames: this[this.elementType.toLowerCase() + "FieldNames"].split(","), bgColor: this.bodyBgColor, elementType: this.elementType }));
        this.addControl(new SFGanttElementList({ fieldNames: this[this.elementType.toLowerCase() + "IdFieldNames"].split(","), bgColor: this.idCellBgColor, mainList: elementList, elementType: this.elementType }));
        this.addControl(new SFGanttCollapseControl());
        this.addControl(new SFGanttDialogControl());
        this.addControl(new SFGanttPrintControl());
        this.addControl(new SFGanttTimeControl());
        this.addControl(new SFGanttMapPanel());
        this.addControl(new SFGanttTimePanel());
        this.addControl(new SFGanttZoomControl());
        this.addControl(new SFGanttTimeScroller());
        this.addControl(new SFGanttDivScroller());
        switch (this.elementType) {
            case "Task":
                this.addControl(new SFGanttSelectTaskOperateControl());
                this.addControl(new SFGanttTasksMap());
                this.addControl(new SFGanttLinksMap());
                break;
            case "Resource":
                this.addControl(new SFGanttResourceMap());
                break;
        }
        this.addControl(new SFGanttTimeScrollNotice());
        this.addControl(new SFGanttListScrollNotice());
        this.addControl(new SFGanttCalendarControl());
        this.addControl(new SFGanttCalDiv());
        this.addControl(new SFGanttDragZoomControl());
        this.addControl(new SFGanttTimeSegmentation());
        this.addControl(new SFGanttWorkingMask());
        this.addControl(new SFGanttTimeLine());
    }
    this.addControl(new SFGanttDefaultMenuControl());
    if (this.containerFragment) {
        this.container.appendChild(this.containerFragment);
        this.containerFragment = null;
    }
    if (data) { this.setData(data); }
}
/**
对显示甘特图的层进行初始化操作
@private
*/
SFGantt.prototype.initContainer = function () {
    var container = this.container;
    this.container = container = (typeof (container) == "object") ? container : document.getElementById(container);
    var child, doc = this.container.ownerDocument;
    //这一句要求浏览器(特别针对IE)需要缓存背景图片功能
    try { doc.execCommand("BackgroundImageCache", false, true); } catch (e) { }
    /**
    用来显示甘特图的层的ID,这个层必须已经在页面上存在
    @name SFConfig.configItems.SFGantt_container
    @type String
    */
    var style = this.container.style;
    if (style.position != "absolute") { style.position = "relative"; }
    SFGlobal.setProperty(style, { padding: '0px', margin: '0px', textAlign: "left", overflow: "hidden", backgroundColor: this.bodyBgColor, fontSize: this.fontSize + 'px' });
    while (child = container.firstChild) { container.removeChild(child) }
}
/**
向甘特图上添加一个功能控件
@param {SFGanttControl} control
@returns {Bool} 如果添加成功，返回true,否则返回false
*/
SFGantt.prototype.addControl = function (control) {
    if (!control) { return; }
    control.added = true;
    if (!control.initialize(this, this.containerFragment ? this.containerFragment : this.container)) { return false; }
    this.controls.push(control);
    return true;
}
/**
向甘特图上移除一个功能控件
@param {SFGanttControl} control 需要移除的控件实例
*/
SFGantt.prototype.removeControl = function (control) {
    if (!control) { return; }
    control.remove();
    control.added = false;
    SFGlobal.deleteInArray(control);
}
/**
甘特图的初始化，在甘特图的数据准备好之后就会进行初始化
@private
*/
SFGantt.prototype.initialize = function () {
    if (this.loaded || !this.data) { return; }
    this.loaded = true;
    /** 
        @event
        @name SFGantt#initialize
        @private
        @description 在甘特图初始化时触发
     */
    SFEvent.trigger(this, "initialize");
}
/**
返回用来显示甘特图的层
@returns {HtmlElement} 
*/
SFGantt.prototype.getContainer = function () {
    return this.container;
}
/**
设置甘特图的视图大小
@param {Number[]} size 大小数组，例如[800,600]代表宽度为800，高度为600
@returns {Bool}  如果设置成功返回true,否则返回false
*/
SFGantt.prototype.setViewSize = function (size) {
    size = size || SFGlobal.getElementSize(this.container);
    var viewSize = this.viewSize;
    if (viewSize && viewSize[0] == size[0] && viewSize[1] == size[1]) { return; }
    var returnObj = { returnValue: true }
    /** 
        @event
        @name SFGantt#beforeresize
        @description 在更改甘特图视图大小前触发
        @param {Json} returnObj 如果设置returnObj.returnValue=false,则代表拒绝更改此大小，这次大小调整就不会生效.
        @param {Number[]} size 甘特图打算更改为的目标大小
     */
    SFEvent.trigger(this, "beforeresize", [returnObj, size]);
    if (!returnObj.returnValue) { return false; }
    this.viewSize = size;
    /** 
        @event
        @name SFGantt#afterresize
        @description 在甘特图视图大小变化后触发
        @param {Number[]} size 甘特图当前的大小
     */
    SFEvent.trigger(this, "afterresize", [size]);
    return true;
}
/**
获取甘特图的视图大小
@returns {Number[]} size 大小数组，例如[800,600]代表宽度为800，高度为600
*/
SFGantt.prototype.getViewSize = function () {
    return this.viewSize;
}
/**
设置甘特图的数据源,注意，甘特图不支持在运行时更改数据源
@private
@param {SFData} data
*/
SFGantt.prototype.setData = function (data) {
    this.data = data;
    SFConfig.applyProperty(data, this.config.getConfigObj("SFData"));
    if (!this.loaded) { this.initialize(); }
}
/**
获得甘特图的数据源
@returns {SFData}
*/
SFGantt.prototype.getData = function () {
    return this.data;
}
/**
销毁此甘特图以释放内存
*/
SFGantt.prototype.depose = function () {
    //清除所有控件
    var controls = this.controls;
    for (var i = controls.length - 1; i >= 0; i--) { this.removeControl(controls[i]); }
    SFEvent.deposeNode(this.container, true);
}
window.SFGantt = SFGantt;
/**
甘特图功能控件的基类，所有的功能控件都继承此类
@class
*/
function SFGanttControl() { }
/**
@private
功能控件的初始化，每个插件的实现都会重写此方法
@param {SFGantt} gantt
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttControl.prototype.initialize = function () { return false; }
/**
@private
在功能控件被移除时执行的方法
*/
SFGanttControl.prototype.remove = function () {
    var listener, listeners = this.listeners;
    if (listeners) {
        while (listener = listeners.pop()) { SFEvent.removeListener(listener); }
    }
    SFEvent.deposeNode(this.div);
    delete this.listeners;
    delete this.gantt;
}
/**
返回该控件是否已经添加到甘特图之中
@returns {Bool} 
*/
SFGanttControl.prototype.isUsing = function () {
    return !!this.added;
}
/**
销毁此功能控件以释放内存
*/
SFGanttControl.prototype.depose = function () {
    this.remove();
    SFEvent.clearListeners(this);
    for (var key in this) { this[key] = null; }
}
window.SFGanttControl = SFGanttControl;
/**
这是一个甘特图功能控件，本控件是甘特图的布局控件，用来实现甘特图的界面布局，并为其他的控件提供支持，因此，依赖此控件的空间特别多，可以说，没有此控件，基本上甘特图是不能运行的
@private
@extends SFGanttControl
@class
*/
function SFGanttLayoutControl() {
    this.panels = {};
}
SFGanttLayoutControl.prototype = new window.SFGanttControl();
/**
功能控件的初始化，每个插件的实现都会重写此方法
@private
@param {SFGantt} gantt
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttLayoutControl.prototype.initialize = function (gantt, container) {
    this.gantt = gantt;
    this.spaceWidth = gantt.spaceWidth;
    gantt.getLayout = SFEvent.getCallback(this, this.getLayout);
    gantt.collapseMap = gantt.collapseChart = SFEvent.getCallback(this, this.collapseChart);
    gantt.collapseList = SFEvent.getCallback(this, this.collapseList);
    gantt.isListShow = SFEvent.getCallback(this, this.isListShow);
    gantt.isChartShow = SFEvent.getCallback(this, this.isChartShow);
    gantt.setListWidth = SFEvent.getCallback(this, this.setListWidth);
    this.createLayout(container);
    this.listeners = [
        SFEvent.bind(gantt, "initialize", this, this.onColumnResize),
        SFEvent.bind(gantt, "heightchange", this, this.onHeightChange),
        SFEvent.bind(gantt, "afterresize", this, this.onGanttResize)
    ]
    return true;
}
/**
获得指定名称的布局层
@private
@name SFGantt.prototype.getLayout
@function
@param {String} name
@returns {HtmlElement}
*/
SFGanttLayoutControl.prototype.getLayout = function (name) {
    return this.panels[name];
}
/**
创建各个布局层，重写该方法可以完全的更改甘特图的整个布局
@private
@param {HtmlElement} container 用来显示甘特图的层
*/
SFGanttLayoutControl.prototype.createLayout = function (container) {
    var gantt = this.gantt, panels = this.panels, doc = container.ownerDocument;
    /**
    左侧列表的宽度
    @name SFConfig.configItems.SFGantt_listWidth
    @type Number
    @default 200
    */
    /**
    左侧ID列表的宽度，实际上也就是显示LOGO的宽度
    @name SFConfig.configItems.SFGantt_idCellWidth
    @type Number
    @default 36
    */
    /**
    甘特图顶端部分的高度像素值
    @name SFConfig.configItems.SFGantt_headHeight
    @type Number
    @default 36
    */
    /**
    甘特图底端部分的高度像素值
    @name SFConfig.configItems.SFGantt_footHeight
    @type Number
    @default 17
    */
    /**
    甘特图上所有的分隔线的颜色
    @name SFConfig.configItems.SFGantt_borderColor
    @type Color
    @default #CDCDCD
    */
    var listWidth = gantt.listWidth * 1, mapWidth = gantt.getViewSize()[0] - listWidth - gantt.idCellWidth;
    if (listWidth <= 0 || mapWidth <= 0) { this.spaceWidth = 10; }
    //建立甘特图的头层
    if (gantt.headHeight > 0) {
        var headDiv = panels.head = doc.createElement('div');
        SFGlobal.setCursor(listHeadDiv, 'default');
        SFEvent.setUnSelectable(headDiv);
        SFGlobal.setProperty(headDiv.style, {
            position: 'absolute', zIndex: 100,
            //hq 0 to -1
            left: '-1px',
            top: '0px', width: '100%', height: gantt.headHeight + 'px', backgroundColor: gantt.headBgColor, borderBottom: 'solid 1px ' + gantt.borderColor
        });
        if (listWidth > 0) {
            //列表的Head头，即用来显示字段的层
            var listHeadDiv = panels.listHead = doc.createElement("div");
            SFGlobal.setProperty(listHeadDiv.style, {
                position: 'absolute', top: '0px', left: gantt.idCellWidth + 'px', height: gantt.headHeight + 'px', overflow: 'hidden'
                //hq remove borderLeft
                //borderLeft: 'solid 1px ' + gantt.borderColor
            });
            headDiv.appendChild(listHeadDiv);
        }
        if (mapWidth > 0) {
            //图表的Head头，即用来显示日历的层
            var mapHeadDiv = panels.mapHead = doc.createElement("div");
            SFGlobal.setProperty(mapHeadDiv.style, { position: 'absolute', top: '0px', height: gantt.headHeight + 'px', top: '0px', left: '0px', width: '100%', overflowX: 'hidden', borderLeft: 'solid 1px ' + gantt.borderColor, borderRight: 'solid 1px ' + gantt.borderColor });
            headDiv.appendChild(mapHeadDiv);
        }
        container.appendChild(headDiv);
    }

    //body层的全局纵向滚动条
    var bodyScrollDiv = panels.bodyScroll = doc.createElement('div');
    SFGlobal.setProperty(bodyScrollDiv.style, {
        position: 'absolute', zIndex: 100, overflowY: 'hidden', overflowX: 'hidden',
        //hq 0 to -1
        left: '-1px',
        //hq 
        top: gantt.headHeight + 'px',
        width: '100%', height: (gantt.getContainer().offsetHeight - gantt.headHeight - gantt.footHeight) + 'px'
    });
    //body层，包含list层和图表层
    var bodyDiv = panels.body = doc.createElement('div');
    if (gantt.idCellWidth > 0) {
        //list的ID列
        var listIdDiv = panels.listId = doc.createElement("div");
        SFGlobal.setProperty(listIdDiv.style, { position: 'absolute', width: gantt.idCellWidth + 'px', overflow: 'hidden' });
        bodyDiv.appendChild(listIdDiv);
    }
    if (listWidth > 0) {
        //list的内容列
        var listBodyDiv = panels.listBody = doc.createElement("div");
        SFGlobal.setProperty(listBodyDiv.style, {
            position: 'absolute', left: gantt.idCellWidth + 'px', overflow: 'hidden',
            //hq remove borderLeft
            //borderLeft: 'solid 1px ' + gantt.borderColor,
            backgroundColor: '#FFFFFF'
        });
        bodyDiv.appendChild(listBodyDiv);
    }
    if (mapWidth > 0) {
        //map的内容列
        var mapBodyDiv = panels.mapBody = doc.createElement("div");
        SFEvent.setUnSelectable(mapBodyDiv);
        if (gantt.setContextMenu) { gantt.setContextMenu(mapBodyDiv, function (menu) { menu.type = "chart"; return true }); }
        SFGlobal.setProperty(mapBodyDiv.style, { position: 'absolute', overflow: 'hidden' });
        bodyDiv.appendChild(mapBodyDiv);
    }
    bodyScrollDiv.appendChild(bodyDiv);
    container.appendChild(bodyScrollDiv);

    //建立甘特图的底部滚动条层，一共显示两个滚动条
    if (gantt.footHeight > 0) {
        var footDiv = panels.foot = doc.createElement('div');
        /**
        甘特图底端部分的背景色
        @name SFConfig.configItems.SFGantt_bottomBgColor
        @type Color
        @default #F4F4F4
        */
        SFGlobal.setProperty(footDiv.style, { position: 'absolute', zIndex: 100, left: '0px', bottom: '0px', width: '100%', height: gantt.footHeight + 'px', backgroundColor: gantt.bottomBgColor });
        if (listWidth > 0) {
            //用来显示list底部滚动条的层
            var listFootDiv = panels.listFoot = doc.createElement("div");
            SFGlobal.setProperty(listFootDiv.style, { position: 'absolute', left: '0px', height: '100%', bottom: '0px', fontSize: '0px', overflow: 'hidden' });
            footDiv.appendChild(listFootDiv);
        }
        if (mapWidth > 0) {
            //用来显示图表底部滚动条的层
            var mapFootDiv = panels.mapFoot = doc.createElement("div");
            SFGlobal.setProperty(mapFootDiv.style, { position: 'absolute', height: '100%', bottom: '0px', fontSize: '0px', overflow: 'hidden' });
            footDiv.appendChild(mapFootDiv);
        }
        container.appendChild(footDiv);
    }
    return true;
}
/**
在甘特图的左右分栏大小变化时执行的响应
@private
*/
SFGanttLayoutControl.prototype.onColumnResize = function () {
    var spaceW = this.spaceWidth, scrollWidth = 0, panels = this.panels, gantt = this.gantt, listIdWidth = gantt.idCellWidth, listWidth;
    var listDisplay = this.listHidden ? "none" : "";
    if (panels.listHead) { panels.listHead.style.display = listDisplay; }
    if (panels.listBody) { panels.listBody.style.display = listDisplay; }
    if (panels.listFoot) { panels.listFoot.style.display = listDisplay; }
    var mapDisplay = this.mapHidden ? "none" : "";
    if (panels.mapHead) { panels.mapHead.style.display = mapDisplay; }
    if (panels.mapBody) { panels.mapBody.style.display = mapDisplay; }
    if (panels.mapFoot) { panels.mapFoot.style.display = mapDisplay; }
    if (!panels.listBody || !panels.mapBody) { spaceW = 0; }

    if (!panels.listBody || this.listHidden) {
        listWidth = 0;
    }
    else if (!panels.mapBody || this.mapHidden) {
        listWidth = panels.bodyScroll.clientWidth - listIdWidth - spaceW;
    }
    else {
        listWidth = gantt.listWidth * 1;
        listWidth = Math.max(listWidth, 10);
    }
    var mapWidth = panels.bodyScroll.clientWidth - listWidth - listIdWidth - spaceW;
    if (panels.mapBody && mapWidth - scrollWidth < 10) {
        listWidth += mapWidth - scrollWidth - 10;
        mapWidth = 10 + scrollWidth;
    }

    if (!this.listHidden) {
        if (panels.listBody) { panels.listBody.style.width = listWidth + "px"; }
        if (panels.listHead) { panels.listHead.style.width = listWidth + "px"; }
        if (panels.listFoot) { panels.listFoot.style.width = listWidth + listIdWidth + "px"; }
    }
    if (!this.mapHidden) {
        if (panels.mapHead) { panels.mapHead.style.left = listIdWidth + listWidth + spaceW + "px"; }
        if (panels.mapHead) { panels.mapHead.style.width = mapWidth - scrollWidth + "px"; }
        if (panels.mapBody) { panels.mapBody.style.left = listWidth + spaceW + listIdWidth + "px"; }
        if (panels.mapBody) { panels.mapBody.style.width = mapWidth - scrollWidth + "px"; }
        if (panels.mapFoot) { panels.mapFoot.style.left = listWidth + spaceW + listIdWidth + "px"; }
        if (panels.mapFoot) { panels.mapFoot.style.width = mapWidth - scrollWidth + "px"; }//减去滚动条宽度
    }
    /** 
        @event
        @name SFGantt#layoutchange
        @private
        @description 在甘特图布局发生变化时触发
     */
    SFEvent.trigger(gantt, "layoutchange");
}
/**
在甘特图视图大小变化时执行的响应
@private
@param {Number[]} size 甘特图新的视图大小
*/
SFGanttLayoutControl.prototype.onGanttResize = function (size) {
    var gantt = this.gantt;
    this.panels.bodyScroll.style.height = (size[1] - gantt.headHeight - gantt.footHeight) + 'px';
    this.onColumnResize();
}
/**
切换甘特图左侧列表的显示\隐藏状态,默认列表是显示的
@name SFGantt.prototype.collapseList
@function
*/
SFGanttLayoutControl.prototype.collapseList = function () {
    if (!this.listHidden && this.mapHidden) {
        this.collapseChart();
    }

    this.listHidden = !this.listHidden;
    //hq
    this.gantt.listHidden = this.listHidden;
    this.onColumnResize();
}
/**
切换甘特图右侧图表的显示\隐藏状态，默认图表是显示的
@name SFGantt.prototype.collapseChart
@function
*/
SFGanttLayoutControl.prototype.collapseChart = function () {
    if (!this.mapHidden && this.listHidden) {
        this.collapseList();
    }
    this.mapHidden = !this.mapHidden;
    //hq
    this.gantt.mapHidden = this.mapHidden;
    this.onColumnResize();
}
/**
判断当前列表是否在显示状态
@name SFGantt.prototype.isListShow
@function
@returns {Bool} 如果在显示中，则返回true,如果在隐藏中，返回false
*/
SFGanttLayoutControl.prototype.isListShow = function () {
    return !this.listHidden;
}
/**
判断当前图表是否在显示状态
@name SFGantt.prototype.isChartShow
@function
@returns {Bool} 如果在显示中，则返回true,如果在隐藏中，返回false
*/
SFGanttLayoutControl.prototype.isChartShow = function () {
    return !this.mapHidden;
}
/**
设置列表的显示宽度,图表的显示宽度为甘特图的总宽度减去列表的显示宽度,因此没有直接设置图表显示宽度的方法
@name SFGantt.prototype.setListWidth
@function
@param {Number} width 宽度像素值
*/
SFGanttLayoutControl.prototype.setListWidth = function (width) {
    var gantt = this.gantt;
    width = Math.max(width, 0);
    width = Math.min(width, this.panels.bodyScroll.clientWidth - gantt.idCellWidth - 10);
    gantt.listWidth = width;
    this.onColumnResize();
}
/**
在甘特图数据总高度变化时执行的响应，设置内容层的高度
@private
@param {Number} bodyHeight 内容层的总高度
*/
SFGanttLayoutControl.prototype.onHeightChange = function (bodyHeight) {
    var panels = this.panels, height = (bodyHeight + 64) + "px";
    if (panels.mapBody) { panels.mapBody.style.height = height; }
    else if (panels.body) { panels.body.style.height = height; }
}
/**
在功能控件被移除时执行的方法
@private
*/
SFGanttLayoutControl.prototype.remove = function () {
    var gantt = this.gantt;
    delete gantt.getLayout
    delete gantt.collapseMap
    delete gantt.collapseList
    delete gantt.isListShow
    delete gantt.isChartShow
    delete gantt.setListWidth
    var panels = this.panels;
    for (var key in panels) {
        SFEvent.deposeNode(panels[key]);
    }
    this.panels = {};
    SFGanttControl.prototype.remove.apply(this, arguments);
}
window.SFGanttLayoutControl = SFGanttLayoutControl;
/**
这是一个甘特图功能控件，本控件用来管理甘特图上所有图片的加载，从而实现图片分块加载的功能
@private
@extends SFGanttControl
@class
*/
function SFGanttImageControl() {
    this.sprites = {
        icon: { imageSize: [128, 48], path: 'icon/icon_default' },
        //symbol: { imageSize: [36, 168], path: 'symbol/symbol_000000', autoColor: 1 },
        symbol: { imageSize: [36, 224], path: 'symbol/symbol_blue', autoColor: 1 },
        scroll: { imageSize: [48, 86], path: 'scroll/scroll' }
    }
    this.images = {
        tab_left: { size: [2, 23] },
        tab_right: { size: [2, 23] },
        tab_bg: { size: [1, 23] },
        tab_f_right: { size: [2, 23] },
        tab_f_bg: { size: [1, 23] },
        tab_bg: { size: [1, 23] },
        tab_bg: { size: [1, 23] },
        collapse_open: { size: [11, 11] },
        collapse_close: { size: [11, 11] },
        map_mask: { size: [4, 2] },
        scroll_barbg: { sprite: 'scroll', spritePoint: [0, 51], spriteSize: [48, 17] },
        scroll_barright: { sprite: 'scroll', spritePoint: [28, 0], spriteSize: [3, 17] },
        scroll_barcenter: { sprite: 'scroll', spritePoint: [20, 0], spriteSize: [8, 17] },
        scroll_barleft: { sprite: 'scroll', spritePoint: [17, 0], spriteSize: [3, 17] },
        scroll_barbg1: { sprite: 'scroll', spritePoint: [0, 34], spriteSize: [48, 17] },
        scroll_barright1: { sprite: 'scroll', spritePoint: [28, 17], spriteSize: [3, 17] },
        scroll_barcenter1: { sprite: 'scroll', spritePoint: [20, 17], spriteSize: [8, 17] },
        scroll_barleft1: { sprite: 'scroll', spritePoint: [17, 17], spriteSize: [3, 17] },
        scroll_left: { sprite: 'scroll', spritePoint: [0, 0], spriteSize: [17, 17] },
        scroll_right: { sprite: 'scroll', spritePoint: [31, 0], spriteSize: [17, 17] },
        scroll_left1: { sprite: 'scroll', spritePoint: [0, 17], spriteSize: [17, 17] },
        scroll_right1: { sprite: 'scroll', spritePoint: [31, 17], spriteSize: [17, 17] },
        scroll_bg: { sprite: 'scroll', spritePoint: [0, 68], spriteSize: [48, 18] },
        dragflag_right: { size: [3, 21] },
        dragflag_left: { size: [2, 21] },
        logo: { size: [36, 36] },
        task_head_1: { sprite: 'symbol', spritePoint: [0, 0], spriteSize: [11, 11] },
        task_head_2: { sprite: 'symbol', spritePoint: [12, 0], spriteSize: [11, 11] },
        task_head_3: { sprite: 'symbol', spritePoint: [24, 0], spriteSize: [11, 11] },
        task_head_3_hollow: { sprite: 'symbol', spritePoint: [0, 12], spriteSize: [11, 11] },
        task_head_4: { sprite: 'symbol', spritePoint: [12, 12], spriteSize: [11, 11] },
        task_head_5: { sprite: 'symbol', spritePoint: [24, 12], spriteSize: [11, 11] },
        task_head_6: { sprite: 'symbol', spritePoint: [0, 24], spriteSize: [11, 11] },
        task_head_7: { sprite: 'symbol', spritePoint: [12, 24], spriteSize: [11, 11] },
        task_head_8: { sprite: 'symbol', spritePoint: [24, 24], spriteSize: [11, 11] },
        task_head_9: { sprite: 'symbol', spritePoint: [0, 36], spriteSize: [11, 11] },
        task_head_10: { sprite: 'symbol', spritePoint: [12, 36], spriteSize: [11, 11] },
        task_head_11: { sprite: 'symbol', spritePoint: [24, 36], spriteSize: [11, 11] },
        task_head_12: { sprite: 'symbol', spritePoint: [0, 48], spriteSize: [11, 11] },
        task_head_13: { sprite: 'symbol', spritePoint: [12, 48], spriteSize: [11, 11] },
        task_head_14: { sprite: 'symbol', spritePoint: [24, 48], spriteSize: [11, 11] },
        task_head_15: { sprite: 'symbol', spritePoint: [0, 60], spriteSize: [11, 11] },
        task_head_16: { sprite: 'symbol', spritePoint: [12, 60], spriteSize: [11, 11] },
        task_head_17: { sprite: 'symbol', spritePoint: [24, 60], spriteSize: [11, 11] },
        task_head_18: { sprite: 'symbol', spritePoint: [0, 72], spriteSize: [11, 11] },
        task_head_19: { sprite: 'symbol', spritePoint: [12, 72], spriteSize: [11, 11] },
        task_head_19_hollow: { sprite: 'symbol', spritePoint: [24, 72], spriteSize: [11, 11] },
        task_head_20: { sprite: 'symbol', spritePoint: [0, 84], spriteSize: [11, 11] },
        arrow_down: { sprite: 'symbol', spritePoint: [13, 84], spriteSize: [9, 5] },
        arrow_left: { sprite: 'symbol', spritePoint: [24, 85], spriteSize: [5, 9] },
        arrow_right: { sprite: 'symbol', spritePoint: [30, 85], spriteSize: [5, 9] },
        arrow_up: { sprite: 'symbol', spritePoint: [13, 90], spriteSize: [9, 5] },
        grid_1: { sprite: 'symbol', spritePoint: [0, 96], spriteSize: [36, 36] },
        grid_2: { sprite: 'symbol', spritePoint: [0, 132], spriteSize: [36, 36] },
        icon_finished: { sprite: 'icon', spritePoint: [0, 16], spriteSize: [16, 16] },
        icon_constraint2: { sprite: 'icon', spritePoint: [0, 0], spriteSize: [16, 16] },
        icon_constraint3: { sprite: 'icon', spritePoint: [16, 0], spriteSize: [16, 16] },
        icon_constraint4: { sprite: 'icon', spritePoint: [32, 0], spriteSize: [16, 16] },
        icon_constraint5: { sprite: 'icon', spritePoint: [48, 0], spriteSize: [16, 16] },
        icon_constraint6: { sprite: 'icon', spritePoint: [64, 0], spriteSize: [16, 16] },
        icon_constraint7: { sprite: 'icon', spritePoint: [80, 0], spriteSize: [16, 16] },
        icon_notes: { sprite: 'icon', spritePoint: [32, 16], spriteSize: [16, 16] },
        icon_hyperlink: { sprite: 'icon', spritePoint: [16, 16], spriteSize: [16, 16] },
        icon_taskstatus: { sprite: 'icon', spritePoint: [112, 16], spriteSize: [16, 16] },
        icon_taskinfo: { sprite: 'icon', spritePoint: [80, 16], spriteSize: [16, 16] },
        icon_taskgoto: { sprite: 'icon', spritePoint: [64, 16], spriteSize: [16, 16] },
        icon_print: { sprite: 'icon', spritePoint: [48, 16], spriteSize: [16, 16] },
        icon_zoomin: { sprite: 'icon', spritePoint: [0, 32], spriteSize: [16, 16] },
        icon_zoomout: { sprite: 'icon', spritePoint: [16, 32], spriteSize: [16, 16] },
        resize: { sprite: 'icon', spritePoint: [32, 32], spriteSize: [16, 16] }
    };
}
SFGanttImageControl.prototype = new window.SFGanttControl();
/**
@private
功能控件的初始化，每个插件的实现都会重写此方法
@param {SFGantt} gantt
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttImageControl.prototype.initialize = function (gantt) {
    this.gantt = gantt;
    gantt.createImage = SFEvent.getCallback(this, SFGanttImageControl.createImage);
    gantt.setImageSrc = SFEvent.getCallback(this, SFGanttImageControl.setImageSrc);
    gantt.setBackgroundImage = SFEvent.getCallback(this, SFGanttImageControl.setBackgroundImage);
    return true;
}
/**
创建图片
@private
@name SFGantt.prototype.createImage
@function
@param {String} name
@param {Json} config
@returns {HtmlElement}
*/
SFGanttImageControl.createImage = function (name, config) {
    config = config || {};
    config.doc = this.gantt.container ? this.gantt.container.ownerDocument : document;
    var imgConfig = this.images[name], style = {};
    if (!imgConfig) { return SFGlobal.createImage(name, config); }
    if (imgConfig.sprite) {
        var sprite = this.sprites[imgConfig.sprite], path = sprite.path;
        SFGlobal.setProperty(style, sprite);
        SFGlobal.setProperty(style, imgConfig);
        SFGlobal.setProperty(style, config);
        if (sprite.autoColor && config.color) {
            path = path.replace("000000", config.color.substring(1).toUpperCase());
        }
        return SFGlobal.createImage(this.gantt.imgPath + path + this.gantt.imgType, style);
    }
    SFGlobal.setProperty(style, this.images[name]);
    SFGlobal.setProperty(style, config);
    return SFGlobal.createImage(this.gantt.imgPath + name + this.gantt.imgType, style);
}
/**
设置图片的URL地址
@private
@name SFGantt.prototype.setImageSrc
@function
@param {HtmlElement} img
@param {String} name
*/
SFGanttImageControl.setImageSrc = function (img, name) {
    var imgConfig = this.images[name];
    if (imgConfig) {
        if (imgConfig.sprite) {
            SFGlobal.setProperty(img.firstChild.style, { left: -imgConfig.spritePoint[0] + 'px', top: -imgConfig.spritePoint[1] + 'px' });
            return;
        }
        SFGlobal.setImageSrc(img, this.gantt.imgPath + name + this.gantt.imgType);
    }
}
/**
设置背景图片
@private
@name SFGantt.prototype.setBackgroundImage
@function
@param {HtmlElement} div
@param {String} name
@param {Json} config
@returns {HtmlElement}
*/
SFGanttImageControl.setBackgroundImage = function (div, name, config) {
    var imgConfig = this.images[name];
    if (imgConfig) {
        if (imgConfig.sprite) {
            var style = {}, sprite = this.sprites[imgConfig.sprite], path = sprite.path;
            SFGlobal.setProperty(style, sprite);
            SFGlobal.setProperty(style, imgConfig);
            SFGlobal.setProperty(style, config);
            if (sprite.autoColor && config && config.color) {
                path = path.replace("000000", config.color.substring(1).toUpperCase());
            }
            SFGlobal.setBackgroundImage(div, this.gantt.imgPath + path + this.gantt.imgType, style);
            return;
        }
        SFGlobal.setBackgroundImage(div, this.gantt.imgPath + name + this.gantt.imgType, this.images[name]);
    }
}
/**
@private
在功能控件被移除时执行的方法
*/
SFGanttImageControl.prototype.remove = function () {
    var gantt = this.gantt;
    delete gantt.createImage;
    delete gantt.setImageSrc;
    delete gantt.setBackgroundImage;
    delete this.gantt
}
window.SFGanttImageControl = SFGanttImageControl;
/**
这是一个甘特图功能控件，本控件是列表头表格的实现
@private
@extends SFGanttControl
@class
*/
function SFGanttFieldList(fieldNames) {
    this.fieldNames = fieldNames;
}
SFGanttFieldList.prototype = new window.SFGanttControl();
/**
@private
功能控件的初始化，每个插件的实现都会重写此方法
@param {SFGantt} gantt
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttFieldList.prototype.initialize = function (gantt) {
    if (!gantt.getLayout) { return false; }
    var container = gantt.getLayout("listHead"), doc = gantt.container.ownerDocument;
    if (!container) { return false; }
    var fields = this.fields = SFGanttField.getFields(gantt.elementType, this.fieldNames), table = doc.createElement("table");
    SFGlobal.setProperty(this, { container: container, gantt: gantt, div: table, fieldIndex: -1 });
    SFGlobal.setProperty(table, { bgColor: gantt.borderColor, border: 0, cellSpacing: 1, cellPadding: 0 });
    SFGlobal.setProperty(table.style, {
        fontSize: '0px', height: (gantt.headHeight + 2) + "px", left: '-2px',
        //hq top -1px to -2px
        top: '-2px',
        position: 'relative', tableLayout: 'fixed',
        //hq add new css for table
        backgroundColor: 'rgb(205, 205, 205)',
        borderCollapse: 'separate',
        borderSpacing: '1px'
    });
    var row = this.div.insertRow(-1);
    /**
    甘特图顶端部分的背景色
    @name SFConfig.configItems.SFGantt_headBgColor
    @type Color
    @default #F4F4F4
    */
    SFGlobal.setProperty(row, { bgColor: gantt.headBgColor });
    var cell = row.insertCell(-1);
    cell.width = 1;
    this.widths = [];
    for (var i = 0; i < fields.length; i++) {
        cell = row.insertCell(-1);
        cell.vAlign = 'middle';
        var width = fields[i].width * 1;
        SFGlobal.setProperty(cell.style, { overflow: 'hidden', fontSize: gantt.fontSize + 'px', whiteSpace: (document.compatMode ? 'nowrap' : 'pre') });
        fields[i].showHead(cell, this);
        this.widths.push(width);
    }
    container.appendChild(this.div);
    SFGlobal.setProperty(gantt, {
        getFieldsList: SFEvent.getCallback(this, this.getList),
        getFieldsWidth: SFEvent.getCallback(this, this.getWidth),
        setFieldsWidth: SFEvent.getCallback(this, this.setWidth)
    });
    this.listeners = [
        SFEvent.bind(gantt, "initialize", this, this.setWidth),
        SFDragObject.setup(table, SFEvent.getCallback(this, this.onDrag)),
        SFEvent.bind(table, "mousemove", this, this.onMouseMove),
        SFEvent.bind(container, "scroll", this, this.onScroll)
    ]
    return true;
}
/**
@private
在列表滚动条变化的时候触发列表头移动事件
*/
SFGanttFieldList.prototype.onScroll = function () {
    /** 
        @event
        @name SFGantt#listfieldsscroll
        @private
        @description 在甘特图列表头滚动时触发
        @param {Number} left 列表头的滚动位置.
     */
    SFEvent.trigger(this.gantt, "listfieldsscroll", [parseInt(this.div.style.left)]);
}
/**
@private
获取list之中各列的宽度
*/
SFGanttFieldList.prototype.getList = function () {
    return this.fields;
}
/**
@private
获取list之中各列的宽度
*/
SFGanttFieldList.prototype.getWidth = function () {
    return this.widths;
}
/**
@private
设置list层和图表层之间的大小关系
*/
SFGanttFieldList.prototype.setWidth = function (widths) {
    widths = this.widths = widths || this.widths;
    var table = this.div, cells = table.rows[0].cells, sum = 0;
    for (var i = 0; i < widths.length; i++) {
        cells[i + 1].width = widths[i];
        sum += widths[i] * 1 + 1;
    }
    table.width = sum + 3;
    /** 
        @event
        @name SFGantt#listfieldsresize
        @private
        @description 在甘特图列表头大小发生变化时触发
        @param {Number[]} widths 各个列表头的大小.
     */
    SFEvent.trigger(this.gantt, "listfieldsresize", [this.widths]);
}
/**
@private
在鼠标划过时根据鼠标的位置来确定当前的鼠标样式
@param {Event} e 浏览器鼠标事件
*/
SFGanttFieldList.prototype.onMouseMove = function (e) {
    var index = -1, left = SFEvent.getEventPosition(e, this.div)[0] - 3, widths = this.widths;
    for (var i = 0; i < widths.length; i++) {
        left -= widths[i] + 1;
        if (Math.abs(left) < 5) {
            index = i;
            break;
        }
        if (left < 0) { break; }
    }
    this.fieldIndex = index;
    SFGlobal.setCursor(this.div, index < 0 ? "default" : "col-resize,se-resize");
}
/**
@private
在拖拽更改列宽的过程之中持续触发的函数
@param {Number[]} sp 拖拽起始点位置
@param {Number[]} lp 拖拽当前点位置
@param {String} type 当前触发的类型
*/
SFGanttFieldList.prototype.onDrag = function (sp, lp, type) {
    if (type == "start") {
        SFGlobal.setCursor(this.div, "col-resize,se-resize");
        this.dragNum = this.fieldIndex;
        this.dragWidth = this.widths[this.fieldIndex];
        return;
    }
    var width = Math.max(this.dragWidth + lp[0] - sp[0], 20);
    this.widths[this.dragNum] = width;
    this.setWidth();
    if (type == "end") { SFGlobal.setCursor(this.div, "default"); }
}
window.SFGanttFieldList = SFGanttFieldList;
/**
这是一个甘特图功能控件，本控件用来扩展甘特图的一个功能，只是给甘特图附加一个setCursor的方法
只有在设置带图标文件的鼠标样式的时候，才需要调用甘特图的setCursor方法
@private
@extends SFGanttControl
@class
*/
function SFGanttCursorControl() {
}
SFGanttCursorControl.prototype = new window.SFGanttControl();
/**
@private
功能控件的初始化，每个插件的实现都会重写此方法
@param {SFGantt} gantt
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttCursorControl.prototype.initialize = function (gantt) {
    if (gantt.disableCursor) { return false; }
    this.gantt = gantt;
    gantt.setCursor = SFEvent.getCallback(gantt, SFGanttCursorControl.setCursor);
    return true;
}
/**
设置层的鼠标样式
@private
@name SFGantt.prototype.setCursor
@function
@param {HtmlElement} obj
@param {String} style 鼠标样式名称或URL
*/
SFGanttCursorControl.setCursor = function (obj, style) {
    if (style.indexOf(",") > 0) {
        var styles = style.split(",");
        for (var i = 0; i < styles.length; i++) {
            if (this.setCursor(obj, styles[i])) { return true; }
        }
        return false;
    }
    try {
        if (style.toLowerCase().indexOf(".cur") > 0) {
            style = "url(" + this.imgPath + "cursor/" + style + "),auto";
        }
        style = style.toLowerCase();
        if (style == "hand" && !document.all) {
            style = "pointer";
        }
        obj.style.cursor = style;
        return true;
    }
    catch (e) { return false; }
}
/**
@private
在功能控件被移除时执行的方法
*/
SFGanttCursorControl.prototype.remove = function () {
    var gantt = this.gantt;
    delete gantt.setCursor;
    delete this.gantt
}
window.SFGanttCursorControl = SFGanttCursorControl;
/**
这是一个甘特图功能控件，本控件用来给甘特图实现change的事件，该事件是对数据的update事件进行缓存包装以提升性能
@private
@extends SFGanttControl
@class
*/
function SFGanttChangeEventControl() {
}
SFGanttChangeEventControl.prototype = new window.SFGanttControl();
/**
@private
功能控件的初始化，每个插件的实现都会重写此方法
@param {SFGantt} gantt
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttChangeEventControl.prototype.initialize = function (gantt) {
    if (gantt.disableChangeEvent) { return false; }
    this.listeners = [
        SFEvent.bind(this.gantt = gantt, "initialize", this, this.onGanttInit)
    ]
    return true;
}
/**
@private
在甘特图初始化时绑定事件
*/
SFGanttChangeEventControl.prototype.onGanttInit = function () {
    var gantt = this.gantt;
    this.listeners = this.listeners.concat([
        SFEvent.bind(gantt.getData(), "after" + gantt.elementType.toLowerCase() + "update", this, this.onElementUpdate)
    ]);
}
/**
@private
在元素发生变化时进行操作，将操作记录下来
@param {SFDataElement} element 发生变化的元素
@param {String} name 变化的属性名称
@param {variant} value 变化后的属性值
@param {String} bValue 变化前的属性值
*/
SFGanttChangeEventControl.prototype.onElementUpdate = function (element, name, value, bValue) {
    var ele, elements;
    if (!(elements = this.changedElements)) { elements = this.changedElements = []; }
    if (ele = SFGlobal.findInArray(elements, element, function (a, b) { return a.element == b })) {
        if (!SFGlobal.findInArray(ele.fields, name)) {
            ele.fields.push(name);
        }
    }
    else {
        elements.push({ element: element, fields: [name] })
    }
    if (!this.eut) { this.eut = window.setInterval(SFEvent.getCallback(this, this.onTime), 256); }
    this.changed = true;
    this.idleTimes = 0;
}
/**
@private
在元素发生变化后延时操作
*/
SFGanttChangeEventControl.prototype.onTime = function () {
    if (!this.changed) {
        this.idleTimes++;
        if (this.idleTimes > 4) {
            window.clearInterval(this.eut);
            delete this.eut
        }
        return;
    }
    this.changed = false;
    this.triggerUpdate();
}
/**
@private
触发记录的所有元素的change事件
*/
SFGanttChangeEventControl.prototype.triggerUpdate = function () {
    var element, elements = this.changedElements;
    while (element = elements.pop()) {
        this.onElementChange(element.element, element.fields);
    }
}
/**
@private
触发指定元素的change事件
@param {SFDataElement} element 元素
@param {Array} changedFields 元素所有的更改过的记录
*/
SFGanttChangeEventControl.prototype.onElementChange = function (element, changedFields) {
    var gantt = this.gantt;
    /** 
        @event
        @name SFGantt#taskchange
        @private
        @description 在任务甘特图上的一个任务发生变化后触发
        @param {SFDataTask} task
        @param {String[]} changedFields 变化了的字段名称数组
     */
    /** 
        @event
        @name SFGantt#resourcechange
        @private
        @description 在资源甘特图上的一个资源发生变化后触发
        @param {SFDataResource} resource
        @param {String[]} changedFields 变化了的字段名称数组
     */
    SFEvent.trigger(this.gantt, gantt.elementType.toLowerCase() + "change", [element, changedFields]);
}
window.SFGanttChangeEventControl = SFGanttChangeEventControl;
/**
这是一个甘特图功能控件，本控件用来扩展甘特图的一个功能，只是给甘特图附加一个setCursor的方法
只有在设置带图标文件的鼠标样式的时候，才需要调用甘特图的setCursor方法
@private
@extends SFGanttControl
@class
*/
function SFGanttDrawControl() {
}
SFGanttDrawControl.prototype = new window.SFGanttControl();
/**
@private
功能控件的初始化，每个插件的实现都会重写此方法
@param {SFGantt} gantt
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttDrawControl.prototype.initialize = function (gantt) {
    this.gantt = gantt;
    /**
    默认的列表每一项的高度
    @name SFConfig.configItems.SFGantt_itemHeight
    @type Number
    @default 24
    */
    this.itemHeight = gantt.itemHeight;
    this.inline = gantt.inline;
    this.hideSummary = gantt.hideSummary;
    gantt.getElementDrawObj = SFEvent.getCallback(this, this.getElementDrawObj);
    gantt.removeElementDrawObj = SFEvent.getCallback(this, this.removeElementDrawObj);
    gantt.getElementHeight = SFEvent.getCallback(this, this.getElementHeight);
    this.listeners = [SFEvent.bind(gantt, gantt.elementType.toLowerCase() + "change", this, this.onElementChange)]
    return true;
}
/**
获得元素的绘制对象，一个绘制对象记录了元素在甘特图上对应的所有HTML界面元素
@name SFGantt.prototype.getElementDrawObj
@function
@private
@param {SFDataElement} element 数据元素
@returns {Json}
*/
SFGanttDrawControl.prototype.getElementDrawObj = function (element) {
    var tagName = this.getTagName();
    if (!element[tagName]) {
        //_height代表占用高度,height代表实际显示高度
        var _height = this.getElementHeight(element), height = (this.hideSummary && element.Summary) ? 0 : (this.inline ? this.itemHeight : _height);
        element[tagName] = { height: height, _height: _height };
    }
    return element[tagName];
}
/**
移除元素的绘制对象
@name SFGantt.prototype.removeElementDrawObj
@function
@private
@param {SFDataElement} element 数据元素
*/
SFGanttDrawControl.prototype.removeElementDrawObj = function (element) {
    var tagName = this.getTagName();
    delete element[tagName];
}
/**
获取元素的绘制对象属性名称，采用索引顺次增加，主要是考虑到将一份数据采用多个甘特图显示的情况
@private
@returns {String}
*/
SFGanttDrawControl.prototype.getTagName = function () {
    if (!this.tagName) {
        if (!SFGantt._tagIndex) { SFGantt._tagIndex = 0; }
        this.tagName = "drawObj_" + (SFGantt._tagIndex++);
    }
    return this.tagName;
}
/**
获得元素的绘制高度
@name SFGantt.prototype.getElementHeight
@function
@private
@param {SFDataElement} 数据元素
@returns {Number} 像素单位的元素显示高度
*/
SFGanttDrawControl.prototype.getElementHeight = function (element) {
    var itemHeight, pElement;
    if (element.Summary && this.hideSummary) { return 0; }
    if (this.inline) {
        if (!element.Summary && element.Start && element.Finish && (pElement = element.getPreviousSibling()) && !pElement.Summary && pElement.Start && pElement.Finish && pElement.Finish < element.Start) {
            var returnObj = { returnValue: true };
            SFEvent.trigger(this.gantt, "beforeinline", [returnObj, element, pElement]);
            if (returnObj.returnValue) { return 0; }
        }
        return this.itemHeight;
    }
    return (itemHeight = element.LineHeight) ? itemHeight : this.itemHeight;
}
/**
在一行显示的情况下，任务的起止时间变化时进行行列调整
@private
@param {SFDataElement} element 被更改的元素
@param {String[]} changedFields 更改的属性列表
*/
SFGanttDrawControl.prototype.onElementChange = function (element, changedFields) {
    var gantt = this.gantt;
    if (gantt.inline) {
        if (!SFGlobal.findInArray(changedFields, "Start") && !SFGlobal.findInArray(changedFields, "Finish")) { return; }
        var startElement = null;
        //如果当前任务需要重新处理

        if (gantt.getElementDrawObj(element)._height != gantt.getElementHeight(element)) {
            startElement = element;
        }
        else {
            var nextElement = element.getNextSibling();
            if (nextElement && gantt.getElementDrawObj(nextElement)._height != gantt.getElementHeight(nextElement)) {
                startElement = nextElement;
            }
        }
        for (var t = startElement; t; t = t.getNextSibling()) {
            if (gantt.getElementDrawObj(t)._height == gantt.getElementHeight(t)) { break; }
            SFEvent.trigger(gantt, "elementheightchanged", [t, gantt.getElementHeight(t), gantt.getElementDrawObj(t)._height]);
        }
    }
    if (SFGlobal.findInArray(changedFields, "LineHeight")) {
        SFEvent.trigger(gantt, "elementheightchanged", [element, element.LineHeight, gantt.getElementDrawObj(element)._height]);
    }
}
/**
@private
在功能控件被移除时执行的方法
*/
SFGanttDrawControl.prototype.remove = function () {
    var gantt = this.gantt;
    delete gantt.getElementHeight;
    delete gantt.removeElementDrawObj;
    delete gantt.getElementDrawObj;
    delete this.gantt
}
window.SFGanttDrawControl = SFGanttDrawControl;
/**
这是一个甘特图功能控件，本控件管理一组在当前视图之中的实体列表，
其实在甘特图之中，这样的列表完全可以有多个的，这样才更灵活的控制缓存，不过在现在，暂时只有一个
因为只有一个并且依赖于甘特图的大小，因此此控件暂时依赖SFGanttLayoutControl
@private
@extends SFGanttControl
@class
*/
function SFGanttViewItemsControl(elementType) {
    this.elementType = elementType;
}
SFGanttViewItemsControl.prototype = new window.SFGanttControl();
/**
@private
功能控件的初始化，每个插件的实现都会重写此方法
@param {SFGantt} gantt
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttViewItemsControl.prototype.initialize = function (gantt) {
    if (!gantt.getLayout || !gantt.getLayout("bodyScroll")) { return false; }
    SFGlobal.setProperty(this, { gantt: gantt, heightSpan: [0, 0], viewElements: [] });
    gantt.getViewTop = SFEvent.getCallback(this, this.getViewTop);
    gantt.getViewElements = SFEvent.getCallback(this, this.getViewElements);
    gantt.getViewIndex = SFEvent.getCallback(this, this.getViewIndex);
    gantt.getElementViewTop = SFEvent.getCallback(this, this.getElementViewTop);
    gantt.setScrollTop = SFEvent.getCallback(this, this.setScrollTop);
    gantt.scrollToElement = SFEvent.getCallback(this, this.scrollToElement);
    this.listeners = [
        SFEvent.bind(gantt, "initialize", this, this.onGanttInit),
        SFEvent.bind(gantt, "scroll", this, this.onScroll),
        SFEvent.bind(gantt, "afterresize", this, this.showViewElements),
        SFEvent.bind(gantt, "elementheightchanged", this, this.onHeightChange)
    ];
    return true;
}
/**
在甘特图初始化时进行必要的事件绑定操作
@private
*/
SFGanttViewItemsControl.prototype.onGanttInit = function () {
    var gantt = this.gantt, data = gantt.getData(), el = this.elementType.toLowerCase();
    this.listeners = this.listeners.concat([
        SFEvent.bind(data, "after" + el + "move", this, this.onElementMove),
        SFEvent.bind(data, "after" + el + "add", this, this.onElementAdd),
        SFEvent.bind(data, "after" + el + "delete", this, this.onElementDelete),
        SFEvent.bind(data, "after" + el + "change", this, this.onElementChange)
    ]);
    this.setScrollTop(gantt.scrollTop ? gantt.scrollTop : 0);
}
/**
设置当前甘特图的滚动高度，即纵向滚动条的位置
@param {Number} top  滚动高度的值
*/
SFGanttViewItemsControl.prototype.setScrollTop = function (top) {
    this.onScroll(top);
    var gantt = this.gantt, scrollDiv = gantt.getLayout("bodyScroll");
    if (gantt.forPrint) {
        scrollDiv.firstChild.style.position = "relative";
        scrollDiv.firstChild.style.top = -top + "px";
    }
    else {
        scrollDiv.scrollTop = top;
    }
}
/**
获取当前甘特图的滚动高度，即纵向滚动条的位置，甘特图开始的时候该值为0，随着滚动条的滚动而变化
@returns {Number}
*/
SFGanttViewItemsControl.prototype.getScrollTop = function () {
    return this.scrollTop ? this.scrollTop : 0;
}
/**
在甘特图滚动时候更新视图的显示
@private
*/
SFGanttViewItemsControl.prototype.onScroll = function (scrollTop) {
    if (scrollTop) {
        this.scrollTop = scrollTop;
    }
    else {
        var gantt = this.gantt, scrollDiv = gantt.getLayout("bodyScroll");
        this.scrollTop = gantt.forPrint ? (-parseInt(scrollDiv.firstChild.style.top)) : scrollDiv.scrollTop;
    }
    this.showViewElements();
}
/**
将一个元素加入到当前视图
@private
@param {SFDataElement} element
@param {Number} index 该元素在视图元素数组之中的索引
*/
SFGanttViewItemsControl.prototype.inViewElement = function (element, index) {
    var gantt = this.gantt;
    if (index < 0)//如果是在末尾添加
    {
        this.viewElements.push(element);
        index = this.viewElements.length - 1;
    }
    else {
        this.viewElements.splice(index, 0, element);
    }
    if (this.viewElements[1] && index == 0) {//只有在上面添加的时候，才需要向上扩充内容
        this.heightSpan[0] -= gantt.getElementHeight(element);
    }
    else {//否则向下面扩充内容
        this.heightSpan[1] += gantt.getElementHeight(element);
    }
    SFEvent.trigger(gantt, "heightspanchange", [this.heightSpan]);
    /** 
        @event
        @name SFGantt#taskinview
        @description 在一个任务进入当前甘特图视图时触发
        @param {SFDataTask} task
        @param {Number} index 此任务原来在视图任务数组之中的索引
     */
    /** 
        @event
        @name SFGantt#resourceinview
        @description 在一个资源进入当前甘特图视图时触发
        @param {SFDataResource} resource
        @param {Number} index 此任务原来在视图资源数组之中的索引
     */
    SFEvent.trigger(gantt, this.elementType.toLowerCase() + "inview", [element, index]);
}
/**
将一个元素从当前视图之中移除
@private
@param {Number} index 该元素在视图元素数组之中的索引
*/
SFGanttViewItemsControl.prototype.outViewElement = function (index) {
    if (index < 0) { index = this.viewElements.length - 1 }
    if (index < 0) { return; }
    var element = this.viewElements.splice(index, 1)[0], gantt = this.gantt, drawObj = gantt.getElementDrawObj(element);
    if (index == 0 && this.viewElements.length > 0 && !element.isHidden()) {//只有在上面移除的时候，才需要向上压缩内容,并且这个element必须不是被删除
        this.heightSpan[0] += drawObj.height;
    }
    else {
        this.heightSpan[1] -= drawObj.height;
    }
    SFEvent.trigger(gantt, "heightspanchange", [this.heightSpan]);
    /** 
        @event
        @name SFGantt#taskoutview
        @description 在一个任务从当前甘特图视图之中移出时触发
        @param {SFDataTask} task
        @param {Number} index 此任务在视图任务数组之中的索引
     */
    /** 
        @event
        @name SFGantt#resourceoutview
        @description 在一个资源从当前甘特图视图之中移出时触发
        @param {SFDataResource} resource
        @param {Number} index 此任务在视图任务数组之中的索引
     */
    SFEvent.trigger(gantt, this.elementType.toLowerCase() + "outview", [element, index]);
}
/**
根据元素获得该元素在视图元素数组之中的索引
@name SFGantt.prototype.getViewIndex
@function
@param {SFDataElement} element
@returns {Number} 如果没有找到，返回-1
*/
SFGanttViewItemsControl.prototype.getViewIndex = function (element) {
    for (var i = this.viewElements.length - 1; i >= 0; i--) {
        if (element == this.viewElements[i]) { return i; }
    }
    return -1;
}
/**
获得当前视图之中第一个元素在整个数据视图之中的位置
@name SFGantt.prototype.getViewTop
@private
@function
@returns {Number}
*/
SFGanttViewItemsControl.prototype.getViewTop = function () {
    return this.heightSpan[0];
}
/**
在发生折叠等操作无法在原来数据的基础上计算高度范围时就完全重新计算高度范围
@private
*/
SFGanttViewItemsControl.prototype.resetHeightSpan = function () {
    var firstView = this.viewElements[0], height = 0, found = false, gantt = this.gantt;
    if (firstView) {
        for (var t = gantt.getData().getRootElement(this.elementType).getFirstChild(); t; t = t.getNextView()) {
            if (t == firstView) {
                found = true;
                break;
            }
            height += gantt.getElementDrawObj(t).height;
        }
        if (found) {
            var span = this.heightSpan[0] - height;
            this.heightSpan[0] = height;
            this.heightSpan[1] -= span;
        }
    }
    else {
        this.heightSpan = [0, 0];
    }
    SFEvent.trigger(gantt, "heightspanchange", [this.heightSpan]);
}
/**
将视图的刷新延缓处理以提升性能
@private
*/
SFGanttViewItemsControl.prototype.delayShowViewElements = function () {
    if (!this.dst) { this.dst = window.setInterval(SFEvent.getCallback(this, this.onShowTime), 32); }
    this.showChanged = true;
    this.showIdleTimes = 0;
}
/**
在延缓时间到期时开始绘制视图
@private
*/
SFGanttViewItemsControl.prototype.onShowTime = function () {
    if (!this.showChanged) {
        this.showIdleTimes++;
        if (this.showIdleTimes > 4) {
            window.clearInterval(this.dst);
            delete this.dst
            this.showViewElements(true);
        }
        return;
    }
    this.showChanged = false;
}
/**
这个函数选择出当前在视图之中的任务并进行显示
@param {Bool} check 是否需要检查现有视图之中的空缺元素
@private
*/
SFGanttViewItemsControl.prototype.showViewElements = function (check) {
    var gantt = this.gantt, scrollDiv = gantt.getLayout("bodyScroll"), enlargeHeight = gantt.viewEnlargeHeight, bufferHeight = gantt.viewBufferHeight + enlargeHeight;
    var startHeight = this.getScrollTop() - enlargeHeight;
    var endHeight = startHeight + scrollDiv.clientHeight + enlargeHeight * 2;
    //如果需要做内部数据检查，则先检查是否存在需要补充的数据
    if (check && this.viewElements.length > 1) {
        var height = this.heightSpan[0];
        var j = 0;
        for (var i = 0; i < this.viewElements.length - 1; i++) {
            var startElement = this.viewElements[i], endElement = this.viewElements[i + 1];
            if (startElement.getNextView() != endElement)//如果中间需要补充数据
            {
                for (var element = startElement.getNextView(); element && element != endElement; element = element.getNextView())//补充数据直到接上
                {
                    height += gantt.getElementHeight(element);
                    this.inViewElement(element, i + (++j), true);
                    if (height > endHeight)//如果补充的数据已经达到指定高度
                    {
                        break;
                    }
                }
                i += j;
                j = 0;
            }
            else {
                height += gantt.getElementHeight(startElement);
            }
            if (height > endHeight)//如果补充的数据已经达到指定高度，则将剩下的数据清空
            {
                this.removeViewElements(i + j);
                this.heightSpan[1] = height;
                SFEvent.trigger(gantt, "heightspanchange", [this.heightSpan]);
                break;
            }
        }
    }
    while (this.viewElements[0] && this.heightSpan[0] + gantt.getElementHeight(this.viewElements[0]) < startHeight - bufferHeight)//如果有的列已经完全在视图上方，则认为移出
    {
        this.outViewElement(0);
    }
    while (this.viewElements[0] && this.heightSpan[1] - gantt.getElementHeight(this.viewElements[this.viewElements.length - 1]) > endHeight + bufferHeight)//如果有的列已经完全在视图下方，则认为移出
    {
        this.outViewElement(-1);
    }
    if (!this.viewElements[0])//如果列表为空,则初始化列表,即在其中加入第一个任务
    {
        var height = 0, element = gantt.data.getRootElement(this.elementType).getNext();
        while (height < startHeight && element) {
            if (height + gantt.getElementHeight(element) >= startHeight) { break; }
            height += gantt.getElementHeight(element);
            element = element.getNextView();
        }
        if (!element) {//如果找不到该任务，说明拖动超出范围，或者当前没有可显示的任务(列表为空时)
            if (height > 0) {//如果是拖动超出范围，则使用最大的范围重新显示
                this.setScrollTop(height);
            }
            return;
        }
        this.heightSpan = [height, height];
        SFEvent.trigger(gantt, "heightspanchange", [this.heightSpan]);
        this.inViewElement(element, -1);
    }
    while (this.heightSpan[1] < endHeight)//底端需要补充内容
    {
        var element = this.viewElements[this.viewElements.length - 1].getNextView();
        if (!element) { break }
        this.inViewElement(element, -1);
    }
    while (this.heightSpan[0] > startHeight)//顶端需要补充内容,注意，假如viewElements数组为空，顶端肯定不需要补充内容的
    {
        var element = this.viewElements[0].getPreviousView();
        if (!element) { break }
        this.inViewElement(element, 0);
    }
}
/**
获取指定元素在整个数据视图之中的位置
@name SFGantt.prototype.getElementViewTop
@private
@function
@param {SFDataElement} element
@returns {Number}
*/
SFGanttViewItemsControl.prototype.getElementViewTop = function (element) {
    var firstElement = this.viewElements[0];
    var gantt = this.gantt, dir = gantt.data.compareElement(firstElement, element) > 0, height = 0;
    for (var t = element; t; t = dir ? t.getPreviousView() : t.getNextView()) {
        if (t == element && dir) { continue; }
        if (t == firstElement && !dir) { break; }
        height += gantt.getElementHeight(t) * (dir ? 1 : -1);
        if (t == firstElement) { break; }
    }
    return this.getViewTop() + height;
}
/**
将视图元素数组之中索引为index之后的元素全部移除
@private
@param {Number} index
*/
SFGanttViewItemsControl.prototype.removeViewElements = function (index) {
    for (var i = this.viewElements.length - 1; i > index; i--) {
        this.outViewElement(-1, true);
    }
}
/**
获取当前的视图元素数组
@private
@returns {SFDataElement}
*/
SFGanttViewItemsControl.prototype.getViewElements = function () {
    return this.viewElements;
}
/**
在元素属性变化时判断属性是否会影响视图范围，并做出响应
@private
@param {SFDataElement} element
@param {String} name 更改的属性名称
@param {variant} 更改后的属性值
@param {variant} 更改前的属性值
*/
SFGanttViewItemsControl.prototype.onElementChange = function (element, name, value, bValue) {
    switch (name) {
        case "Collapse":
            //如果该任务的上级任务本来就是被折叠，则不作任何处理
            if (element.isHidden()) { return; }
            //首先判断折叠操作影响的内容是不是在当前的视图范围之上
            var needRefresh = this.viewElements[0] && this.gantt.data.compareElement(element, this.viewElements[0]) > 0;
            var collapse = element.Collapse;
            if (collapse) {
                for (var i = 0; i < this.viewElements.length; i++) {
                    if (element != this.viewElements[i] && element.contains(this.viewElements[i])) {
                        this.outViewElement(i, true);
                        i--;
                    }
                }
            }
            if (needRefresh) { this.resetHeightSpan(); }
            this.showViewElements(!collapse);
            break;
        case "LineHeight":
            break;
    }
}
/**
在元素属性变化时判断属性是否会影响视图范围，并做出响应
@private
@param {SFDataElement} element
@param {String} name 更改的属性名称
@param {variant} 更改后的属性值
@param {variant} 更改前的属性值
*/
SFGanttViewItemsControl.prototype.onHeightChange = function (element, value, bValue) {
    //如果该任务的上级任务本来就是被折叠，则不作任何处理
    if (element.isHidden()) { return; }
    //如果是在视图上方的任务在变化行高，则需要对heightSpan进行更新
    if (this.viewElements[0] && this.gantt.data.compareElement(element, this.viewElements[0]) >= 0) {
        var span = value - (bValue ? bValue : this.gantt.itemHeight);
        this.heightSpan[0] += span;
        this.heightSpan[1] += span;
        SFEvent.trigger(this.gantt, "heightspanchange", [this.heightSpan]);
    }
    var index = this.getViewIndex(element);
    this.outViewElement(index, true);
    this.gantt.removeElementDrawObj(element);
    this.delayShowViewElements();
}
/**
在新增元素时更新视图元素数组
@private
@param {SFDataElement} element 新增加的元素
*/
SFGanttViewItemsControl.prototype.onElementAdd = function (element) {
    //如果该任务的上级任务在删除之前被折叠，则不作任何处理
    if (element.isHidden()) { return; }
    var flag = false;
    //如果在视图的上方新建任务，则应将heightSpan更新
    if (this.viewElements[0] && this.gantt.data.compareElement(element, this.viewElements[0]) > 0) {
        var height = this.gantt.getElementHeight(element);
        this.heightSpan[0] += height;
        this.heightSpan[1] += height;
        /** 
            @event
            @name SFGantt#heightspanchange
            @private
            @description 在甘特图的视图范围发生变化时触发
            @param {Number[]} heightSpan 新的视图范围
         */
        SFEvent.trigger(this.gantt, "heightspanchange", [this.heightSpan]);
        flag = true;
    }
    if (flag || this.viewElements.length == 0 || SFGlobal.findInArray(this.viewElements, element.getNextView()) || SFGlobal.findInArray(this.viewElements, element.getPreviousView())) {
        this.delayShowViewElements();
    }
}
/**
在移动元素时更新视图元素数组
@private
@param {SFDataElement} element 移动的元素
@param {SFDataElement} pElement 元素原来的位置的父元素
@param {SFDataElement} preElement 元素原来的位置的前一个兄弟元素
*/
SFGanttViewItemsControl.prototype.onElementMove = function (element, pElement, preElement) {
    //这下任务的移动实现起来可就复杂了,以下三种情况必须要对视图的heightspan做处理:
    //1.把上方显示的节点移动到下方，或者隐藏
    //2.把上方隐藏的节点或下方的节点，移动到上方显示出来
    //下面根据以上分析得到确定是否需要对heightspan进行处理的参数
    var data = this.gantt.data;
    var oIsUS = (!pElement.Collapse && !pElement.isHidden()) && this.viewElements[0] && data.compareElement((preElement ? preElement.getLastDescendant(true) : pElement), this.viewElements[0]) > 0;
    var nIsUS = (!element.isHidden()) && this.viewElements[0] && data.compareElement(element, this.viewElements[0]) > 0;
    //下面将视图之中的element或者element的子任务进行移出处理
    for (var i = 0; i <= this.viewElements.length; i++) {
        if (element.contains(this.viewElements[i])) {
            var t = this.viewElements[i];
            this.outViewElement(i, true);
            this.gantt.removeElementDrawObj(t);
            i--;
        }
    }
    if (oIsUS != nIsUS) { this.resetHeightSpan(); }
    this.delayShowViewElements();
}
/**
在删除元素时更新视图元素数组
@private
@param {SFDataElement} element 删除的元素
@param {SFDataElement} pElement 元素原来的位置的父元素
@param {SFDataElement} preElement 元素原来的位置的前一个兄弟元素
*/
SFGanttViewItemsControl.prototype.onElementDelete = function (element, pElement, preElement) {
    //如果该任务的上级任务在删除之前被折叠，则不作任何处理
    if (pElement.Collapse || pElement.isHidden()) { return; }
    //首先判断删除操作影响的内容是不是在当前的视图范围之上
    var lastView = preElement ? preElement.getLastDescendant(true) : pElement, viewElements = this.viewElements;
    var needRefresh = viewElements[0] && this.gantt.data.compareElement(lastView, viewElements[0]) > 0;
    //对视图之中的所有任务进行检查，如果存在该任务的下级任务则移出视图
    for (var i = viewElements.length - 1; i >= 0; i--) {
        if (viewElements[i].isHidden()) {
            var t = viewElements[i];
            this.outViewElement(i, true);
        }
    }
    if (needRefresh) { this.resetHeightSpan(); }//这种情况下需要重新计算heightSpan的值和bodyHeight的值
    if (this.Selected) { this.removeSelectedElement(element); }
    this.delayShowViewElements();
}
/**
滚动甘特图以让指定的任务显示在视图中
@name SFGantt.prototype.scrollToElement
@function
@private
@param {SFDataElement} element 数据元素
@param {Number} [offset=0] 默认将指定任务调整到视图最上端，可以通过这个参数调整向下的偏移度，这样可以实现将指定的任务执行到视图中间
*/
SFGanttViewItemsControl.prototype.scrollToElement = function (element, offset) {
    offset = offset ? offset : 0;
    this.gantt.setScrollTop(Math.max(0, this.gantt.getElementViewTop(element) - offset));
}
/**
@private
在功能控件被移除时执行的方法
*/
SFGanttViewItemsControl.prototype.remove = function () {
    var gantt = this.gantt;
    delete gantt.getViewTop;
    delete gantt.getViewElements;
    delete gantt.getViewIndex;
    delete gantt.getElementViewTop;
    delete gantt.setScrollTop;
    delete gantt.scrollToElement;
    delete this.viewElements;
    SFGanttControl.prototype.remove.apply(this, arguments);
}
window.SFGanttViewItemsControl = SFGanttViewItemsControl;
/**
这是一个甘特图功能控件，本控件用来实现选择功能，管理甘特图之中的所有被选中的实体列表，并实现一系列方法以操作选中的列表，很多控件使用了这个功能，却通过是否支持的判断避免了对此控件的依赖
@private
@extends SFGanttControl
@class
*/
function SFGanttElementSelectControl() {
    this.selectedElements = [];
}
SFGanttElementSelectControl.prototype = new window.SFGanttControl();
/**
@private
功能控件的初始化，每个插件的实现都会重写此方法
@param {SFGantt} gantt
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttElementSelectControl.prototype.initialize = function (gantt, container) {
    if (gantt.disableSelect) { return false; }
    this.gantt = gantt;
    var elementType = gantt.elementType;
    SFGlobal.setProperty(gantt, {
        getFocusElement: gantt["getFocus" + elementType] = SFEvent.getCallback(this, this.getFocusElement),
        getSelectedElements: gantt["getSelected" + elementType + "s"] = SFEvent.getCallback(this, this.getSelectedElements),
        setSelectedElement: gantt["setSelected" + elementType] = SFEvent.getCallback(this, this.setSelectedElement),
        clearSelectedElement: gantt["clearSelected" + elementType] = SFEvent.getCallback(this, this.clearSelectedElement)
    });
    this.listeners = [
        SFEvent.bind(gantt, elementType.toLowerCase() + "mousedown", this, this.onElementClick),
        SFEvent.bind(gantt, "initialize", this, this.onGanttInit)
    ];
    return true;
}
/**
在甘特图初始化时，进行必须的事件绑定
@private
*/
SFGanttElementSelectControl.prototype.onGanttInit = function () {
    var gantt = this.gantt, data = gantt.getData(), el = gantt.elementType.toLowerCase();
    this.listeners = this.listeners.concat([
        SFEvent.bind(data, el + "register", this, this.onRegister),
        SFEvent.bind(data, el + "unregister", this, this.onUnRegister),
        SFEvent.bind(data, "after" + el + "change", this, this.onElementChange)
    ]);
}
/**
在元素被注册是判断元素是否被选中，如果是，则添加到选中的元素列表
@private
@param {SFDataElement} element
*/
SFGanttElementSelectControl.prototype.onRegister = function (element) {
    if (element.Selected) { this.selectedElements.push(element); }
}
/**
在元素被注销时将其从选中的元素列表之中删除
@private
@param {SFDataElement} element
*/
SFGanttElementSelectControl.prototype.onUnRegister = function (element) {
    if (element.Selected) { SFGlobal.deleteInArray(this.selectedElements, element); }
}
/**
在元素被单击时切换元素的选中状态
@private
@param {SFDataElement} element
@param {Event} e 浏览器的鼠标事件
*/
SFGanttElementSelectControl.prototype.onElementClick = function (element, e) {
    if (!e || SFEvent.getEventButton(e) == 2)//如果是右键
    {
        if (!element.Selected)//如果该项没有被选中
        {
            this.clearSelectedElement();
            element.setProperty("Selected", true);
        }
    }
    else {
        var selectedElements = this.selectedElements;
        if (e.shiftKey && selectedElements[0]) {
            var lastElement = selectedElements[selectedElements.length - 1]
            var flag = this.gantt.data.compareElement(lastElement, element) > 0;
            var t = lastElement;
            while (t) {
                t = flag ? t.getNextView() : t.getPreviousView();
                if (t) { t.setProperty("Selected", true); }
                if (t == element) { return; }
            }
        }
        else if (e.ctrlKey) {
            element.setProperty("Selected", !element.Selected);
        }
        else {
            this.clearSelectedElement();
            element.setProperty("Selected", true);
        }
    }
}
/**
在元素属性变化时判断是否变化了元素的选中状态，如果是，则做出响应
@private
@param {SFDataElement} element
@param {String} name 变化的属性名称
@param {variant} value 变化后的属性值
*/
SFGanttElementSelectControl.prototype.onElementChange = function (element, name, value) {
    if (name == "Selected") {
        var el = this.gantt.elementType.toLowerCase();
        /** 
            @event
            @name SFGantt#taskfocus
            @description 在任务甘特图上的一个任务被选中时触发
            @param {SFDataTask} task 被选中的任务.
         */
        /** 
            @event
            @name SFGantt#taskblur
            @description 在任务甘特图上的一个任务被取消选中时触发
            @param {SFDataTask} task 被取消选中的任务.
         */
        /** 
            @event
            @name SFGantt#resourcefocus
            @description 在资源甘特图上的一个资源被选中时触发
            @param {SFDataResource} resource 被选中的任务.
         */
        /** 
            @event
            @name SFGantt#resourceblur
            @description 在资源甘特图上的一个资源被取消选中时触发
            @param {SFDataResource} resource 被取消选中的任务.
         */
        SFEvent.trigger(this.gantt, el + (value ? "focus" : "blur"), [element]);
        if (value) { this.selectedElements.push(element); }
        else { SFGlobal.deleteInArray(this.selectedElements, element); }
    }
}
/**
获取当前的焦点元素，目前就是选中的元素的最后一个
@function
@name SFGantt.prototype.getFocusElement
@returns {SFDataElement}
*/
SFGanttElementSelectControl.prototype.getFocusElement = function () {
    return this.selectedElements[this.selectedElements.length - 1];
}
/**
返回当前所有选中的元素数组
@function
@name SFGantt.prototype.getSelectedElements
@returns {SFDataElement[]}
*/
SFGanttElementSelectControl.prototype.getSelectedElements = function () {
    return this.selectedElements;
}
/**
设置当前选中的元素，这会将其他的元素全部取消选中，而仅仅选中此元素
@function
@name SFGantt.prototype.setSelectedElement
@param {SFDataElement} element 需要被选中的元素
*/
SFGanttElementSelectControl.prototype.setSelectedElement = function (element) {
    if (this.selectedElements && this.selectedElements[0] == element && !this.selectedElements[1]) { return; }
    this.clearSelectedElement();
    element.setProperty("Selected", true);
}
/**
清空当前所有被选中的元素
@function
@name SFGantt.prototype.clearSelectedElement
*/
SFGanttElementSelectControl.prototype.clearSelectedElement = function () {
    var element, elements = this.selectedElements;
    while (element = elements.pop()) {
        element.setProperty("Selected", false);
    }
}
/**
@private
在功能控件被移除时执行的方法
*/
SFGanttElementSelectControl.prototype.remove = function () {
    var gantt = this.gantt;
    delete gantt.getFocusElement
    delete gantt.getSelectedElements
    delete gantt.setSelectedElement
    delete gantt.clearSelectedElement
    var elementType = gantt.elementType;
    delete gantt["getFocus" + elementType];
    delete gantt["getSelected" + elementType + "s"];
    delete gantt["setSelected" + elementType];
    delete gantt["clearSelected" + elementType];
    this.selectedElements = [];
    SFGanttControl.prototype.remove.apply(this, arguments);
}
window.SFGanttElementSelectControl = SFGanttElementSelectControl;
/**
这是一个甘特图功能控件，此控件代表对被选中的任务可执行的一系列操作，控件依赖选择控件SFGanttElementSelectControl
@private
@extends SFGanttControl
@class
*/
function SFGanttSelectTaskOperateControl() {
}
SFGanttSelectTaskOperateControl.prototype = new window.SFGanttControl();
/**
@private
功能控件的初始化，每个插件的实现都会重写此方法
@param {SFGantt} gantt
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttSelectTaskOperateControl.prototype.initialize = function (gantt, container) {
    if (!gantt.getSelectedElements) { return false; }
    this.gantt = gantt;
    SFGlobal.setProperty(gantt, {
        addTask: SFEvent.getCallback(this, this.addTask),
        deleteTask: SFEvent.getCallback(this, this.deleteTask),
        upgradeSelectedTasks: SFEvent.getCallback(this, this.upgradeSelectedTasks),
        degradeSelectedTasks: SFEvent.getCallback(this, this.degradeSelectedTasks),
        upgradeTask: SFEvent.getCallback(this, this.upgradeTask),
        degradeTask: SFEvent.getCallback(this, this.degradeTask),
        addTasksLinks: SFEvent.getCallback(this, this.addTasksLinks),
        removeTasksLinks: SFEvent.getCallback(this, this.removeTasksLinks),
        focusIntoView: SFEvent.getCallback(this, this.focusIntoView)
    });
    return true;
}
/**
添加任务，假如当前选中了一个任务，则在该任务处添加任务，否则，在所有任务的最后添加任务
@name SFGantt.prototype.addTask
@function
*/
SFGanttSelectTaskOperateControl.prototype.addTask = function () {
    var gantt = this.gantt, data = gantt.data, selectedTasks = gantt.getSelectedElements();
    var parent, pTask = null, beforeTask = selectedTasks[0] ? selectedTasks[selectedTasks.length - 1] : null;
    if (beforeTask) {
        if (!beforeTask.getPreviousSibling()) {
            parent = beforeTask.getParent();
        }
        else {
            pTask = beforeTask.getPreviousSibling().getLastDescendant(true);
            parent = pTask.getParent();
        }
    }
    else {
        if (!data.getRootTask().getFirstChild()) {
            parent = data.getRootTask();
        }
        else {
            pTask = data.getRootTask().getLastChild().getLastDescendant(true);
            parent = pTask.getParent();
        }
    }
    var newTask = data.addTask(parent, pTask);
    if (newTask) {
        gantt.setSelectedElement(newTask);
    }
}
/**
检查当前选中的任务之中是否存在只读任务，如果存在，则弹出提示
@private
@returns {Bool} 如果不存在返回true，否则返回false
*/
SFGanttSelectTaskOperateControl.prototype.checkReadOnly = function () {
    var selectedTasks = this.gantt.getSelectedElements();
    var len = selectedTasks.length;
    for (var i = 0; i < len; i++) {
        if (selectedTasks[i].ReadOnly) {
            var notice = this.gantt.config.getConfig("SFGantt/noticeReadonly");
            if (notice) { alert(notice); }
            return false;
        }
    }
    return true;
}
/**
对当前选中的一个或多个任务进行删除。
@name SFGantt.prototype.deleteTask
@function
*/
SFGanttSelectTaskOperateControl.prototype.deleteTask = function () {
    if (!this.checkReadOnly()) { return false; }
    var selectedTasks = this.gantt.getSelectedElements();
    var len = selectedTasks.length;
    if (!selectedTasks[0]) { return; }
    if (len == 0) { return; }
    var notice = this.gantt.config.getConfig("SFGantt/noticeDelete");
    if (notice && !window.confirm(notice)) { return }
    for (var i = selectedTasks.length - 1; i >= 0; i--) {
        var task = selectedTasks[i];
        if (!task) { continue; }
        this.gantt.data.deleteTask(task);
    }
}
/**
对当前选中的任务进行解析，剔除被其他选中的任务包含的任务，返回剔除后的数组
@private
@returns {SFDataTasks[]}
*/
SFGanttSelectTaskOperateControl.prototype.getTopSelectedTasks = function () {
    var tasks = [], selectedTasks = this.gantt.getSelectedElements();
    for (var i = 0; i < selectedTasks.length; i++) {
        var j;
        for (var j = tasks.length - 1; j >= 0; j--) {
            if (selectedTasks[i].contains(tasks[j])) {
                tasks[j] = selectedTasks[i];
                break;
            }
            else if (tasks[j].contains(selectedTasks[i])) {
                break;
            }
        }
        if (j < 0) {
            tasks.push(selectedTasks[i]);
        }
    }
    return tasks;
}
/**
对当前选中的一个或多个任务进行升级
@name SFGantt.prototype.upgradeSelectedTasks
@function
*/
SFGanttSelectTaskOperateControl.prototype.upgradeSelectedTasks = function () {
    if (!this.checkReadOnly()) { return false; }
    var tasks = this.getTopSelectedTasks();
    for (var i = 0; i < tasks.length; i++) {
        this.upgradeTask(tasks[i]);
    }
}
/**
对当前选中的一个或多个任务进行降级
@name SFGantt.prototype.degradeSelectedTasks
@function
*/
SFGanttSelectTaskOperateControl.prototype.degradeSelectedTasks = function () {
    if (!this.checkReadOnly()) { return false; }
    var tasks = this.getTopSelectedTasks();
    for (var i = 0; i < tasks.length; i++) {
        this.degradeTask(tasks[i]);
    }
}
/**
对指定任务进行升级，升级之后该任务的大纲级别减一
@name SFGantt.prototype.upgradeTask
@function
@param {SFDataTask} task
@returns {Bool} 如果成功返回true,否则返回false
*/
SFGanttSelectTaskOperateControl.prototype.upgradeTask = function (task) {
    var data = this.gantt.data, parent = task.getParent();
    if (!parent || parent == data.getRootTask()) { return false; }
    var nTask = task.getNextSibling(), result = true;
    if (!data.moveTask(task, parent.getParent(), parent)) { return false; }
    while (nTask) {
        var nnTask = nTask.getNextSibling()
        if (!data.moveTask(nTask, task, task.getLastChild())) { return false; }
        nTask = nnTask
    }
    return true;
}
/**
对该任务进行降级，升级之后该任务的大纲级别加一
@name SFGantt.prototype.degradeTask
@function
@param {SFDataTask} task
@returns {Bool} 如果成功返回true,否则返回false
*/
SFGanttSelectTaskOperateControl.prototype.degradeTask = function (task) {
    var pTask = task.getPreviousSibling();
    if (!pTask) { return false; }
    return this.gantt.data.moveTask(task, pTask, pTask.getLastChild())
}
/**
对当前选中任务按照选择的先后顺序建立链接关系，链接类型为”完成-开始“
@name SFGantt.prototype.addTasksLinks
@function
@returns {Bool} 如果成功返回true,否则返回false
*/
SFGanttSelectTaskOperateControl.prototype.addTasksLinks = function () {
    var selectedTasks = this.gantt.getSelectedElements();
    if (selectedTasks.length < 2) { return false; }
    for (var i = 1; i < selectedTasks.length; i++) {
        selectedTasks[i].addPredecessorLink(selectedTasks[i - 1], 1);
    }
    return true;
}
/**
取消当前选中任务之间的所有链接关系
@name SFGantt.prototype.removeTasksLinks
@function
@returns {Bool} 如果成功返回true,否则返回false
*/
SFGanttSelectTaskOperateControl.prototype.removeTasksLinks = function () {
    var gantt = this.gantt, data = gantt.data, selectedTasks = gantt.getSelectedElements();
    if (selectedTasks.length < 2) { return false; }
    for (var i = 0; i < selectedTasks.length; i++) {
        for (var j = 0; j < selectedTasks.length; j++) {
            if (i == j) { continue; }
            var links = selectedTasks[i].getPredecessorLinks();
            for (var k = links.length - 1; k >= 0; k--) {
                if (links[k].PredecessorTask == selectedTasks[j]) {
                    data.deleteLink(links[k]);
                    break;
                }
            }
        }
    }
    return true;
}
/**
转到,将图表定位到当前点击的任务的位置,移动甘特图的时间轴，使当前选中的焦点任务刚好能显示出来
@name SFGantt.prototype.focusIntoView
@function
*/
SFGanttSelectTaskOperateControl.prototype.focusIntoView = function () {
    var gantt = this.gantt, task = gantt.getFocusElement();
    if (!task || !task.Start || !gantt.moveTo) { return; }
    if (gantt.getViewIndex(task) < 0) { gantt.scrollToElement(task, 50); }
    gantt.moveTo(task.Start);
    gantt.move(-10);
}
/**
@private
在功能控件被移除时执行的方法
*/
SFGanttSelectTaskOperateControl.prototype.remove = function () {
    var gantt = this.gantt;
    delete gantt.addTask
    delete gantt.deleteTask
    delete gantt.upgradeSelectedTasks
    delete gantt.degradeSelectedTasks
    delete gantt.upgradeTask
    delete gantt.degradeTask
    delete gantt.addTasksLinks
    delete gantt.removeTasksLinks
    delete gantt.focusIntoView
    SFGanttControl.prototype.remove.apply(this, arguments);
}
window.SFGanttSelectTaskOperateControl = SFGanttSelectTaskOperateControl;
/**
这是一个甘特图功能控件，本控件负责管理甘特图的滚动逻辑，在滚动时，对滚动进行性能控制，并将滚动参数包装，触发scroll事件
@private
@extends SFGanttControl
@class
*/
function SFGanttScrollControl() {
}
SFGanttScrollControl.prototype = new window.SFGanttControl();
/**
@private
功能控件的初始化，每个插件的实现都会重写此方法
@param {SFGantt} gantt
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttScrollControl.prototype.initialize = function (gantt) {
    this.gantt = gantt;
    if (gantt.disableScroll || !gantt.getLayout || !gantt.showScroller) { return false; }
    var container = gantt.getLayout("bodyScroll");
    container.style.overflowY = 'scroll';
    if (!container) { return false; }
    this.listeners = [
        SFEvent.bind(container, "scroll", this, this.onScroll)
    ]
    return true;
}
/**
在甘特图滚动的时候执行的操作,实际上对列表的维护进行延缓处理
@private
@param {Event} e 浏览器的滚动事件
*/
SFGanttScrollControl.prototype.onScroll = function (e) {
    SFEvent.cancelBubble(e);
    if (!this.timeout) { this.timeout = window.setInterval(SFEvent.getCallback(this, this.onTime), 128); }
    var scrollObj = this.scrollObj ? this.scrollObj : this.getScrollObj();
    scrollObj.scrollTop = this.gantt.getLayout("bodyScroll").scrollTop;
    scrollObj.changed = true;
    scrollObj.idleTimes = 0;
}
/**
在甘特图滚动的时候延时处理的操作
@private
*/
SFGanttScrollControl.prototype.onTime = function () {
    var scrollObj = this.scrollObj, gantt = this.gantt;
    if (!scrollObj || !scrollObj.changed) {
        if (scrollObj) {
            scrollObj.idleTimes++;
            if (scrollObj.idleTimes > 8) {
                window.clearInterval(this.timeout);
                delete this.timeout
            }
        }
        return;
    }
    scrollObj.changed = false;
    if (gantt.getTooltip) { gantt.getTooltip().hidden(); }
    var scrollTop = scrollObj.scrollTop;
    this.updateScroll(scrollObj, 1, scrollTop);
    this.updateScroll(scrollObj, 3, scrollTop + this.gantt.getLayout("bodyScroll").clientHeight * 1.5);
    //如果已经定义了延缓操作,则先清除
    SFEvent.trigger(this.gantt, "scroll", [scrollTop, scrollObj]);
}
/**
计算滚动时当前视图对应的元素范围
@param {Json} scrollObj 滚动状态对象
@param {Number} index 计算的项的索引
@param {Number} scrollTop 该项的滚动高度
@private
*/
SFGanttScrollControl.prototype.updateScroll = function (scrollObj, index, scrollTop) {
    var gantt = this.gantt, element = scrollObj.spanElements[index];
    var distance = scrollTop - scrollObj.spanHeights[index];
    var dir = distance > 0;
    while (element) {
        if (!element.data) {//如果此元素被删除
            delete this.scrollObj;
            this.onScroll();
        }
        if (dir) {
            if (distance < gantt.getElementHeight(element)) { break; }
            var newElement = element.getNextView();
            if (!newElement) { break; }
            gantt.getElementDrawObj(newElement);
            element = newElement;
            distance -= gantt.getElementHeight(element);
        }
        else {
            if (distance > 0) { break; }
            var newElement = element.getPreviousView();
            if (!newElement) { break; }
            gantt.getElementDrawObj(newElement);
            element = newElement;
            distance += gantt.getElementHeight(newElement);
        }
    }
    scrollObj.spanHeights[index] = scrollTop - distance;
    scrollObj.spanElements[index] = element;
}
/**
获得或创建滚动状态对象
@returns {Json}
@private
*/
SFGanttScrollControl.prototype.getScrollObj = function () {
    var gantt = this.gantt, element = gantt.getViewElements()[0], height = gantt.getViewTop();
    return this.scrollObj = {
        lastTime: new Date().valueOf(),
        spanElements: [element, element, element, element],
        spanHeights: [height, height, height, height]
    };
}
window.SFGanttScrollControl = SFGanttScrollControl;
//	在实体被注册或显示的时候添加这个实体的高度
//	在实体被取消或隐藏的时候，减去这个实体的高度
//	在实体高度变化的时候，高度随之变化
//	目前此控件存在一个BUG，就是假如在甘特图初始化之前data已经读取了一些数据，则已经读取的数据的高度不会被计算进去
//	此控件独自管理甘特图的heightchange事件,通过此事件和其他的程序(SFGanttLayoutControl)交互,影响其滚动条的逻辑
/**
这是一个甘特图功能控件，此控件主要负责在显示内容范围变化的时候自动确定甘特图图表的高度，
@private
@extends SFGanttControl
@class
*/
function SFGanttBodyHeightControl(config) {
}
SFGanttBodyHeightControl.prototype = new window.SFGanttControl();
/**
@private
功能控件的初始化，每个插件的实现都会重写此方法
@param {SFGantt} gantt
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttBodyHeightControl.prototype.initialize = function (gantt, container) {
    this.listeners = [
        SFEvent.bind(this.gantt = gantt, "heightspanchange", this, this.onChange)
    ];
    return true;
}
/**
@private
在甘特图的显示范围发生变化时执行的响应
@param {Number[]} heightSpan 甘特图目前显示的内容范围
*/
SFGanttBodyHeightControl.prototype.onChange = function (heightSpan) {
    if (!this.timeout) { this.timeout = window.setInterval(SFEvent.getCallback(this, this.onTime), 64); }
    this.changed = true;
    this.idleTimes = 0;
    this.bodyHeight = heightSpan[1];
}
/**
@private
在甘特图显示范围持续变化时执行的响应
*/
SFGanttBodyHeightControl.prototype.onTime = function () {
    if (!this.changed) {
        this.idleTimes++;
        if (this.idleTimes > 16) {
            window.clearInterval(this.timeout);
            delete this.timeout
        }
        return;
    }
    this.changed = false;
    this.setBodyHeight();
}
/**
@private
重设甘特图图表层的高度
*/
SFGanttBodyHeightControl.prototype.setBodyHeight = function () {
    var mapBody = this.gantt.getLayout("mapBody");
    if (mapBody) { mapBody.style.height = this.bodyHeight + 100 + "px"; }
}
/**
@private
在功能控件被移除时执行的方法
*/
SFGanttBodyHeightControl.prototype.remove = function () {
    if (this.timeout) { window.clearInterval(this.timeout); }
    SFGanttControl.prototype.remove.apply(this, arguments);
}
window.SFGanttBodyHeightControl = SFGanttBodyHeightControl;
/**
这是一个甘特图功能控件，本控件用来实现图表和列表中间的横条，如果甘特图没有显示图表或者列表，则直接拒绝显示
@private
@extends SFGanttControl
@class
*/
function SFGanttCollapseControl() {
}
SFGanttCollapseControl.prototype = new window.SFGanttControl();
/**
@private
功能控件的初始化，每个插件的实现都会重写此方法
@param {SFGantt} gantt
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttCollapseControl.prototype.initialize = function (gantt, container) {
    if (!gantt.getLayout || gantt.disableCollapse || !gantt.getLayout("listBody") || !gantt.getLayout("mapBody") || gantt.spaceWidth < 4) { return false; }
    var width = this.width = gantt.spaceWidth, doc = gantt.container.ownerDocument;
    var div = this.div = doc.createElement('div');
    /**
    甘特图上图表和列表中间分隔条的背景色
    @name SFConfig.configItems.SFGantt_columnBarColor
    @type Color
    @default #F4F4F4
    */
    SFGlobal.setProperty(div.style, { position: 'absolute', zIndex: 200, top: '0px', width: width + 'px', height: '100%', backgroundColor: gantt.columnBarColor, borderLeft: 'solid 1px ' + gantt.borderColor, borderRight: 'solid 1px ' + gantt.borderColor });
    SFGlobal.setCursor(div, 'col-resize');
    var img = this.listColImg = gantt.createImage("arrow_left", { position: [(width - 5) / 2, width] });
    SFGlobal.setProperty(img.style, { position: 'absolute', zIndex: 200 });
    SFGlobal.setCursor(img, 'pointer');
    div.appendChild(img);

    var img = this.mapColImg = gantt.createImage("arrow_right", { position: [(width - 4) / 2, width + 10] });
    SFGlobal.setProperty(img.style, { position: 'absolute', zIndex: 200 });
    SFGlobal.setCursor(img, 'pointer');
    div.appendChild(img);
    container.appendChild(div);
    if (gantt.setContextMenu) { gantt.setContextMenu(div, function (menu) { menu.type = "column"; return true }); }
    this.gantt = gantt;
    this.listeners = [
        SFEvent.bind(div, "mousedown", this, this.onMouseDown),
        SFEvent.bind(gantt, "layoutchange", this, this.onLayoutChange)
    ];
    return true;
}
/**
@private
在甘特图发生变化时执行的响应，重新调整分隔条的位置，并设置折叠按钮的图标
*/
SFGanttCollapseControl.prototype.onLayoutChange = function () {
    var gantt = this.gantt, listDiv = gantt.getLayout("listBody"), mapDiv = gantt.getLayout("mapBody");
    var lp = SFEvent.getPageOffset(listDiv, gantt.getContainer()), mp = SFEvent.getPageOffset(mapDiv, gantt.getContainer());
    var left = Math.max(lp[0], mp[0]);
    if ((!gantt.isListShow() && left == lp[0]) || (!gantt.isChartShow() && left == mp[0])) {
        left = SFEvent.getPageOffset(listDiv.parentNode, gantt.getContainer())[0] + listDiv.parentNode.offsetWidth;
    }
    this.div.style.left = left - this.width + "px";
    gantt.setImageSrc(this.listColImg, listDiv.offsetWidth == 0 ? "arrow_right" : "arrow_left");
    gantt.setImageSrc(this.mapColImg, listDiv.offsetWidth == 0 ? "arrow_left" : "arrow_right");
}
/**
@private
在鼠标在分隔条上按下时执行的响应，如果点击在按钮上，则执行响应的操作，如果不是，则这行拖动分隔条的操作
@param {Event} e 鼠标按下的事件
*/
SFGanttCollapseControl.prototype.onMouseDown = function (e) {
    if (SFEvent.getEventButton(e) != 1) { return; }
    SFEvent.cancelBubble(e);
    if (this.dragObj) { this.onMouseUp(e); }
    var target = e.target;
    while (target && target != this.div) {
        if (target == this.listColImg) {
            this.gantt.collapseList();
            this.changeCursor();
            return;
        }
        if (target == this.mapColImg) {
            this.gantt.collapseMap();
            this.changeCursor();
            return;
        }
        target = target.parentNode;


    }

    new SFDragObject(this.div, SFEvent.getCallback(this, this.onMove), { container: this.gantt.getContainer() }).onMouseDown(e);
}

SFGanttCollapseControl.prototype.changeCursor = function () {
    //hq 
    if (this.gantt.listHidden || this.gantt.mapHidden) {
        this.div.style.cursor = 'default';
    }
    else {
        this.div.style.cursor = 'col-resize';
    }
}

/**
@private
在鼠标拖动分隔条时执行的操作，调整左右分栏大小
@param {Number[]} sp 鼠标拖动起始位置
@param {Number[]} lp 鼠标拖动当前位置
@param {Number[]} type 如果是开始，则为"start",是结束，则为"end"
*/
SFGanttCollapseControl.prototype.onMove = function (sp, lp, type) {
    if (type == "start") { this.startColumn = this.gantt.listWidth * 1 }
    var listWidth = this.startColumn + lp[0] - sp[0]
    this.div.style.left = listWidth + this.gantt.idCellWidth + "px";
    if (type == "end") { this.gantt.setListWidth(listWidth) }
}
window.SFGanttCollapseControl = SFGanttCollapseControl;
/**
这是一个甘特图功能控件，本控件实现右下角的更改甘特图大小的按钮,拖动之后自动更新甘特图的大小
@private
@extends SFGanttControl
@class
*/
function SFGanttDragResizeControl() {
}
SFGanttDragResizeControl.prototype = new window.SFGanttControl();
/**
@private
功能控件的初始化，每个插件的实现都会重写此方法
@param {SFGantt} gantt
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttDragResizeControl.prototype.initialize = function (gantt, container) {
    /**
    是否禁止通过甘特图右下角的图标拖动改变甘特图的大小，如果设置为true，则不会显示该三角图标
    @name SFConfig.configItems.SFGantt_disableDragResize
    @type Bool
    @default false
    */
    if (gantt.disableDragResize) { return false; }
    var resizeImg = this.div = gantt.createImage("resize");
    SFGlobal.setProperty(resizeImg.style, { position: 'absolute', right: '0px', bottom: '0px', zIndex: 200 });
    SFGlobal.setCursor(resizeImg, 'se-resize');
    this.listeners = [
        SFDragObject.setup(resizeImg, SFEvent.getCallback(this, this.onMove), { container: gantt.getContainer() })
    ];
    container.appendChild(resizeImg);
    this.gantt = gantt;
    return true;
}
/**
@private
在拖拽更改甘特图大小的过程之中持续触发的函数
@param {Number[]} startPoint 拖拽起始点位置
@param {Number[]} point 拖拽当前点位置
@param {String} type 当前触发的类型
*/
SFGanttDragResizeControl.prototype.onMove = function (startPoint, point, type) {
    var gantt = this.gantt;
    if (type == "start") { this.startSize = gantt.getViewSize(); return; }
    var size = [this.startSize[0] + point[0] - startPoint[0], this.startSize[1] + point[1] - startPoint[1]];
    if (gantt.setViewSize(size)) {
        SFGlobal.setProperty(gantt.getContainer().style, { width: size[0] + "px", height: size[1] + "px" });
    }
}
window.SFGanttDragResizeControl = SFGanttDragResizeControl;
/**
这是一个甘特图功能控件，本控件实现甘特图右上角的问号图标，用来连接到帮助文档
@private
@extends SFGanttControl
@class
*/
function SFGanttHelpLinkControl() {
}
SFGanttHelpLinkControl.prototype = new window.SFGanttControl();
/**
@private
功能控件的初始化，每个插件的实现都会重写此方法
@param {SFGantt} gantt
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttHelpLinkControl.prototype.initialize = function (gantt) {
    var container, doc = gantt.container.ownerDocument;
    /**
    是否禁止禁止帮助链接的加载
    @name SFConfig.configItems.SFGantt_disableHelpLink
    @type Bool
    @default false
    */
    if (gantt.disableHelpLink || !gantt.getLayout || !(container = gantt.getLayout("head"))) { return false; }
    var helpDiv = this.div = doc.createElement("div");
    SFGlobal.setProperty(helpDiv.style, { position: 'absolute', backgroundColor: gantt.headBgColor, width: '16px', right: '0px', top: '0px', textAlign: 'right', padding: '3px' });
    var helpLink = doc.createElement("a");
    SFGlobal.setProperty(helpLink.style, { fontSize: '24px', color: '#000000', textDecoration: 'none' });
    helpLink.appendChild(doc.createTextNode("?"));
    helpLink.title = (window.SFNS && window.SFNS.vinfo) ? SFGlobal.getDateString(SFGlobal.getDate(window.SFNS.vinfo.time), "s") : "";
    SFGlobal.setProperty(helpLink, { href: '<%HelpLink%>', target: '_blank' });
    helpDiv.appendChild(helpLink);
    container.appendChild(helpDiv);
    return true;
}
window.SFGanttHelpLinkControl = SFGanttHelpLinkControl;
/**
这是一个甘特图功能控件，本控件实现在甘特图上显示LOGO
@private
@extends SFGanttControl
@class
*/
function SFGanttLogoControl() {
}
SFGanttLogoControl.prototype = new window.SFGanttControl();
/**
功能控件的初始化，每个插件的实现都会重写此方法
@private
@param {SFGantt} gantt
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttLogoControl.prototype.initialize = function (gantt) {
    this.gantt = gantt;
    var logo = this.div = gantt.createImage("logo", { size: [gantt.idCellWidth, gantt.headHeight] });
    SFGlobal.setProperty(logo.style, { position: 'absolute', zIndex: 200 });
    if (gantt.setTooltip) { gantt.setTooltip(logo, SFEvent.getCallback(this, this.getLogoTooltip)); }
    gantt.container.appendChild(logo);
    if (gantt.setContextMenu) { gantt.setContextMenu(logo, function (menu) { menu.type = "logo"; return true }); }
    return true;
}
/**
鼠标在LOGO上滑过时显示提示信息
@private
@param {SFGanttTooltipControl} tooltip 甘特图的实时提示控件
@param {Event} e 浏览器的鼠标事件
@returns {Bool} 如果需要显示提示，返回true,否则返回false
*/
SFGanttLogoControl.prototype.getLogoTooltip = function (tooltip) {
    if (tooltip && tooltip.bindObject == this) { return false; }
    var div = this.div.ownerDocument.createElement("div")
    div.innerHTML = '<%Copyright%>';
    tooltip.setContent(div);
    tooltip.bindObject = this;
    return true;
}
window.SFGanttLogoControl = SFGanttLogoControl;
/**
这是一个甘特图功能控件，本控件是用来提供鼠标指向实时提示的功能支持
@private
@extends SFGanttControl
@class
*/
function SFGanttTooltipControl() {
}
SFGanttTooltipControl.prototype = new window.SFGanttControl();
/**
功能控件的初始化，每个插件的实现都会重写此方法
@private
@param {SFGantt} gantt
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttTooltipControl.prototype.initialize = function (gantt) {
    if (gantt.disableTooltip) { return false; }
    SFConfig.applyProperty(this, gantt.config.getConfigObj("SFTooltip"));
    var div = gantt.container.ownerDocument.createElement("div");
    SFGlobal.setProperty(div.style, { position: 'absolute', zIndex: 650 });
    SFGlobal.setProperty(div.style, this.divStyle);
    var container = gantt.container;
    SFGlobal.setProperty(this, { gantt: gantt, div: div, container: container });
    this.setEnable(true);
    SFGlobal.setProperty(gantt, {
        getTooltip: SFEvent.getCallback(this, this.getTooltip),
        setTooltip: SFEvent.getCallback(this, this.setTooltip)
    });
    return true;
}
/**
鼠标在甘特图上划过的时候进行的响应，开始准备显示提示
@private
@param {Event} e 浏览器鼠标事件
*/
SFGanttTooltipControl.prototype.onMouseOver = function (e) {
    var target = e.target;
    while (target) {
        if (target._SF_E_ && target._SF_E_.tooltip && target._SF_E_.tooltip(this, e)) {
            SFEvent.cancelBubble(e);
            this.show(SFEvent.getEventRelative(e, this.container), target);
            return;
        }
        target = target.parentNode;
    }
}
/**
启用或禁止所有tooltip响应
@private
@param {Bool} enable
*/
SFGanttTooltipControl.prototype.setEnable = function (enable) {
    if (enable && !this.listeners) {
        this.listeners = [
            SFEvent.bind(this.container, "mouseover", this, this.onMouseOver)
        ];
    }
    else if (!enable && this.listeners) {
        SFEvent.removeListener(this.listeners[0]);
        delete this.listeners;
    }
}
/**
设置提示的内容
@private
@param {HtmlElement} content
*/
SFGanttTooltipControl.prototype.setContent = function (content) {
    SFEvent.deposeNode(this.div, true);
    this.div.appendChild(content);
}
/**
获取提示的内容层
@private
@returns {HtmlElement}
*/
SFGanttTooltipControl.prototype.getContent = function () {
    return this.div;
}
/**
显示实时提示
@private
@param {Number[]} position 显示提示的位置，是相对于甘特图左上角的位置
@param {HtmlElement} div 显示的提示内容
*/
SFGanttTooltipControl.prototype.show = function (position, div) {
    div = div ? div : this.div;
    this.container.appendChild(this.div);
    var left = position[0] + 5, top = position[1] + 5;
    if (!this.position) {
        if (left + this.div.offsetWidth > this.container.offsetWidth) { left = position[0] - this.div.offsetWidth - 2; }
        if (top + this.div.offsetHeight > this.container.offsetHeight) { top = position[1] - this.div.offsetHeight - 2; }
    }
    SFGlobal.setProperty(this.div.style, { left: left + "px", top: top + "px" });
    this.container._ganttTip = this;
    this.hl = SFEvent.bind(div, "mouseout", this, function (e) {
        if (!this.listeners) { return; }//暂时设置在暂停时不允许隐藏
        this.hidden();
    })
}
/**
隐藏实时提示
@private
*/
SFGanttTooltipControl.prototype.hidden = function () {
    if (this.div.parentNode == this.container) {
        this.container.removeChild(this.div);
    }
    this.container._ganttTip = null;
    this.bindObject = null;
    SFEvent.removeListener(this.hl);
}
/**
设置在div被右键点击的时候弹出handle定义的菜单
@name SFGantt.prototype.setTooltip
@private
@function
@param {HtmlElement} div
@param {Function} handle 确定如何显示提示的函数
*/
SFGanttTooltipControl.prototype.setTooltip = function (div, handle) {
    if (!div._SF_E_) { div._SF_E_ = []; }
    div._SF_E_.tooltip = handle;
}
/**
返回甘特图的实时提示控件
@name SFGantt.prototype.getTooltip
@private
@function
@returns {SFGanttTooltipControl}
*/
SFGanttTooltipControl.prototype.getTooltip = function () {
    return this;
}
/**
在功能控件被移除时执行的方法
@private
*/
SFGanttTooltipControl.prototype.remove = function () {
    this.setEnable(false);
    this.hidden();
    var gantt = this.gantt;
    delete gantt.getTooltip
    delete gantt.setTooltip
    delete this.container
    SFGanttControl.prototype.remove.apply(this, arguments);
}
window.SFGanttTooltipControl = SFGanttTooltipControl;
/**
这是一个甘特图功能控件，本控件用来实现甘特图上的右键菜单的功能
@private
@extends SFGanttControl
@class
*/
function SFGanttContextMenuControl() {
    this.contextMenuItems = [];
}
SFGanttContextMenuControl.prototype = new window.SFGanttControl();
/**
@private
功能控件的初始化，每个插件的实现都会重写此方法
@param {SFGantt} gantt
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttContextMenuControl.prototype.initialize = function (gantt) {
    if (gantt.disableContextMenu) { return false; }
    SFConfig.applyProperty(this, gantt.config.getConfigObj("SFMenu"));
    this.gantt = gantt;
    var container = this.container = gantt.getContainer(), doc = gantt.container.ownerDocument;
    var table = this.div = doc.createElement("table");
    SFGlobal.setProperty(table, { cellSpacing: 0, border: 0, cellPadding: 0 });
    SFGlobal.setProperty(table.style, { position: 'absolute', zIndex: 700 });
    SFGlobal.setProperty(table.style, this.tableStyle);
    SFGlobal.setProperty(gantt, {
        addContextMenuItem: SFEvent.getCallback(this, this.addItem),
        getContextMenuItemById: SFEvent.getCallback(this, this.getItemById),
        removeContextMenuItem: SFEvent.getCallback(this, this.removeItem),
        setContextMenu: SFEvent.getCallback(this, this.setContextMenu)
    });
    this.listeners = [
        SFEvent.addListener(container, "contextmenu", SFEvent.cancelBubble),
        SFEvent.bind(container, "mousedown", this, this.onMouseDown),
        SFEvent.bind(table, "mousemove", this, this.onItemMouseOver),
        SFEvent.bind(table, "mousedown", this, this.onItemClick),
        SFEvent.bind(doc, "mousedown", this, this.hidden)
    ];
    return true;
}
/**
设置甘特图上的右键触发点
@private
@name SFGantt.prototype.setContextMenu
@function
@param {HtmlElement} div 能触发右键的层
@param {Function} handle 在右键点击时，用来配置右键菜单显示的句柄
*/
SFGanttContextMenuControl.prototype.setContextMenu = function (div, handle) {
    if (!div._SF_E_) { div._SF_E_ = []; }
    div._SF_E_.contextMenu = handle;
}
/**
在鼠标在右键触发点上点击时执行的操作，判断是否是右键点击，如果是，则显示菜单
@param {Event} e 右键按下事件
*/
SFGanttContextMenuControl.prototype.onMouseDown = function (e) {
    var btn = SFEvent.getEventButton(e);
    if (btn == 4) { SFEvent.returnTrue(e); }
    if (btn != 2) { return; }
    this.event = e;
    var target = e.target;
    while (target) {
        if (target._SF_E_ && target._SF_E_.contextMenu && target._SF_E_.contextMenu(this, e)) {
            SFEvent.cancelBubble(e);
            if (this.items) { this.hidden(); }
            var items = [], allItems = this.contextMenuItems;
            for (var i = 0; i < allItems.length; i++) {
                var type = allItems[i].showHandle(this, e);
                if (type == 1) { items.push(allItems[i]); }
            }
            this.items = items;
            var position = SFEvent.getEventRelative(e, this.container);
            this.show(position);
            return;
        }
        target = target.parentNode;
    }
}
/**
增加一个右键菜单项，可以指定菜单在何时显示、点击之后执行的动作、菜单显示文字和图标，用户在甘特图上点击右键的时候，系统会创建一个MenuEvent对象，该对象有如下属性：<br/>
gantt ： 当前的甘特图对象，是一个<link>SFGantt</link><br/>
type ： 右键点击的位置类型，有以下几种：column(点击在中间分隔条上),logo(点击在甘特图的logo上),map(点击在右侧图表上),list(点击在左侧列表上)<br/>
@name SFGantt.prototype.addContextMenuItem
@function
@param {Function} showHandle 这个参数指定在甘特图右键点击的时候是否应该显示该菜单项，这个参数应该是一个JavaScript function，在甘特图上右键被点击的时候，将会调用该函数，该函数返回1代表显示该菜单项，返回数字0代表不显示该菜单项，该函数的参数是MenuEvent对象
@param {Function} runHandle 这个参数指定一个JavaScript function，这个函数在用户点击该菜单项的时候执行，该函数的参数是MenuEvent对象
@param {String} text 菜单项的显示文字
@param {String} [icon] 菜单项的图标URL地址,不指定则不显示图标
@param {String} [id] 菜单项的ID，设置ID后，可以通过ID来修改或删除此菜单项
@param {Number} [index=500] 菜单项的排序索引，各个菜单项将会按照这个顺序从大到小排列
@returns {SFMenuItem} 返回刚添加的菜单项
*/
SFGanttContextMenuControl.prototype.addItem = function (showHandle, runHandle, text, icon, id, index) {
    if (id) {
        for (var i = 0; i < this.contextMenuItems.length; i++) {
            if (id == this.contextMenuItems[i].id == id) { return false; }
        }
    }
    var menuItem = new SFMenuItem(showHandle, runHandle, text, icon, id, index);
    this.contextMenuItems.push(menuItem);
    return menuItem;
}
/**
通过菜单项ID返回该菜单项,如果不存在,则返回null
@name SFGantt.prototype.getContextMenuItemById
@function
@param {String} id 菜单项的ID
@returns {SFMenuItem}
*/
SFGanttContextMenuControl.prototype.getItemById = function (id) {
    for (var i = 0; i < this.contextMenuItems.length; i++) {
        if (id == this.contextMenuItems[i].id) {
            return this.contextMenuItems[i];
        }
    }
    return null;
}
/**
通过id删除一个右键菜单项,并返回被删除的菜单项,系统集成的菜单项也可以被删除
@name SFGantt.prototype.removeContextMenuItem
@function
@param {SFMenuItem|String} item 菜单项或菜单项的ID
@returns {SFMenuItem} 返回刚删除的菜单项
*/
SFGanttContextMenuControl.prototype.removeItem = function (id) {
    if (typeof (id) == "object") { id = id.id; }
    if (id) {
        for (var i = 0; i < this.contextMenuItems.length; i++) {
            if (this.contextMenuItems[i].id == id) {
                return this.contextMenuItems.splice(i, 1);
            }
        }
    }
    return null;
}
/**
显示右键菜单
@private
@param {Number[]} position 菜单项的显示位置
*/
SFGanttContextMenuControl.prototype.show = function (position) {
    var container = this.container, table = this.div;
    //inforcenter
    if ($(container).children("table") && $(container).children("table").length > 0) {
        $(container).children("table").remove();
    }
    this.createItemContent();
    container.appendChild(table);
    var left = position[0] + 1, top = position[1] + 1;
    if (left + table.offsetWidth > container.offsetWidth) { left = position[0] - table.offsetWidth - 1; }
    if (top + table.offsetHeight > container.offsetHeight) { top = position[1] - table.offsetHeight - 1; }
    SFGlobal.setProperty(table.style, { left: left + "px", top: top + "px" });
}
/**
隐藏右键菜单
@private
*/
SFGanttContextMenuControl.prototype.hidden = function () {
    this.focusObj = null;
    var items = this.items;
    if (items) {
        for (var i = 0; i < items.length; i++) {
            items[i].row = null;
        }
        this.items = null;
    }
    SFEvent.deposeNode(this.div, true);
    if (this.div.parentNode == this.container) {
        this.container.removeChild(this.div);
    }
}
/**
创建右键菜单的显示内容
@private
*/
SFGanttContextMenuControl.prototype.createItemContent = function () {
    this.items.sort(function (a, b) { if (a.index == b.index) { return 0; } return a.index > b.index ? 1 : -1; });
    var doc = this.container.ownerDocument;
    for (var i = 0; i < this.items.length; i++) {
        var item = this.items[i];
        var row = this.div.insertRow(-1);
        var cell = row.insertCell(-1);
        SFGlobal.setProperty(cell, { width: 34, height: 24, bgColor: '#F6F6F6', align: 'center' });
        if (item.icon) {
            var img = this.gantt.createImage(item.icon, { size: [16, 16] });
            cell.appendChild(img);
        }
        cell = row.insertCell(-1);
        SFGlobal.setProperty(cell, { noWrap: 'true' });
        SFGlobal.setProperty(cell.style, { paddingLeft: '10px', paddingRight: '25px', fontSize: '13px', cursor: 'default' });
        cell.innerHTML = item.text;
        item.row = row;
    }
}
/**
获得当前鼠标在哪个菜单项上
@param {Event} e 浏览器的鼠标事件
@private
@returns {SFMenuItem}
*/
SFGanttContextMenuControl.prototype.getFocusItem = function (e) {
    if (!this.items) { return null; }
    var target = e.target, row, table = this.div;
    while (target) {
        if (target == table) { break; }
        if (target.nodeName == "TR") { row = target }
        target = target.parentNode;
    }
    if (!row) { return null; }
    for (var i = table.rows.length - 1; i >= 0; i--) {
        if (row == table.rows[i]) {
            return this.items[i];
        }
    }
    return null;
}
/**
在鼠标移动到菜单项目上方的时候执行的响应
@param {Event} e 浏览器的鼠标事件
@private
*/
SFGanttContextMenuControl.prototype.onItemMouseOver = function (e) {
    var item = this.getFocusItem(e);
    if (!item) { return; }
    var focusObj = this.focusObj;
    if (focusObj) {
        focusObj.row.style.backgroundColor = "";
        focusObj.row.cells[0].style.backgroundColor = "#F6F6F6";
    }
    this.focusObj = item;
    item.row.style.backgroundColor = "#C4E0F2";
    item.row.cells[0].style.backgroundColor = "#C4E0F2";
}
/**
在菜单项目被点击的时候执行的响应
@param {Event} e 浏览器的鼠标事件
@private
*/
SFGanttContextMenuControl.prototype.onItemClick = function (e) {
    var item = this.getFocusItem(e);
    if (!item) { return; }
    SFEvent.cancelBubble(e);
    this.hidden();
    if (item.runHandle) { item.runHandle(this); }
}
/**
@private
在功能控件被移除时执行的方法
*/
SFGanttContextMenuControl.prototype.remove = function () {
    this.hidden();
    var gantt = this.gantt;
    delete gantt.addContextMenuItem
    delete gantt.getContextMenuItemById
    delete gantt.removeContextMenuItem
    delete gantt.setContextMenu
    delete this.contextMenuItems
    SFGanttControl.prototype.remove.apply(this, arguments);
}


/**
甘特图上的右键菜单项对象，每个右键菜单项代表一个右键功能
@param {Function} showHandle 这个参数指定在甘特图右键点击的时候是否应该显示该菜单项，这个参数应该是一个JavaScript function，在甘特图上右键被点击的时候，将会调用该函数，该函数返回1代表显示该菜单项，返回数字0代表不显示该菜单项，该函数的参数是MenuEvent对象
@param {Function} runHandle 在用户点击该右键菜单时执行的操作，该函数的参数与showHandle的参数相同
@param {String} text 菜单项的显示文字
@param {String} icon 菜单项的图标URL地址
@param {String} id 菜单项的ID，设置ID后，可以通过ID来修改或删除此菜单项
@param {Number} index 菜单项的排序索引，各个菜单项将会按照这个顺序从大到小排列
@class
*/
function SFMenuItem(showHandle, runHandle, text, icon, id, index) {
    if (!id) {
        if (!SFMenuItem.idNum) { SFMenuItem.idNum = 0 }
        id = "MenuItem_" + (SFMenuItem.idNum++);
    }
    index = index ? index : 500;
    this.setIcon(icon);
    SFGlobal.setProperty(this, { showHandle: showHandle, runHandle: runHandle, text: text, id: id, index: index });
}
/**
获得菜单的显示顺序，在显示菜单时，index越大的越显示在后面
@returns {Number}
*/
SFMenuItem.prototype.getIndex = function () {
    return this.index;
}
/**
设置菜单的显示顺序，在显示菜单时，index越大的越显示在后面
@param {Number} index 一般在1-1000
*/
SFMenuItem.prototype.setIndex = function (index) {
    this.index = parseInt(index);
}
/**
获取菜单项的显示文字
@returns {String}
*/
SFMenuItem.prototype.getText = function () {
    return this.text;
}
/**
设置菜单项的显示文字
@param {String} text
*/
SFMenuItem.prototype.setText = function (text) {
    this.text = text;
}
/**
设置菜单项的显示图标
@param {String} icon 图标的URL路径,图标应该是16*16大小
*/
SFMenuItem.prototype.setIcon = function (icon) {
    this.icon = icon;
}
window.SFMenuItem = SFMenuItem;
window.SFGanttContextMenuControl = SFGanttContextMenuControl;
/**
这是一个甘特图功能控件，本控件用来给甘特图添加一系列系统集成的右键菜单设置
@private
@extends SFGanttControl
@class
*/
function SFGanttDefaultMenuControl() {
}
SFGanttDefaultMenuControl.prototype = new window.SFGanttControl();
/**
@private
功能控件的初始化，每个插件的实现都会重写此方法
@param {SFGantt} gantt
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttDefaultMenuControl.prototype.initialize = function (gantt, container) {
    if (!gantt.addContextMenuItem) { return; }
    var names = gantt.config.getConfig("SFGantt/menuText");
    /**
    @name SFGantt.ContextMenuItems
    @namespace 甘特图之中集成的右键菜单项列表，可以使用{@link SFGantt#getContextMenuItemById}来获取这些菜单项进行操作，也可以使用{@link SFGantt#removeContextMenuItem}删除对应的菜单项
    */
    /**
    放大,顺序号551，在甘特图图表或网络图上右键单击时显示
    @name SFGantt.ContextMenuItems.ZoomIn
    @type SFMenuItem
    */
    gantt.addContextMenuItem(
        function (ma) { return ((ma.type == "chart" || ma.type == "network") && ma.gantt.zoomIn) ? 1 : 0 },
        function (ma) { ma.gantt.zoomIn(ma.type == "network" ? SFEvent.getEventPosition(ma.event, ma.gantt.container) : null); },
        names.ZoomIn,
        'icon_zoomin',
        "ZoomIn",
        551);
    /**
    缩小,顺序号556，在甘特图图表或网络图上右键单击时显示
    @name SFGantt.ContextMenuItems.ZoomOut
    @type SFMenuItem
    */
    gantt.addContextMenuItem(
        function (ma) { return ((ma.type == "chart" || ma.type == "network") && ma.gantt.zoomOut) ? 1 : 0 },
        function (ma) { ma.gantt.zoomOut(ma.type == "network" ? SFEvent.getEventPosition(ma.event, ma.gantt.container) : null); },
        names.ZoomOut,
        'icon_zoomout',
        "ZoomOut",
        556);
    /**
    转到,将图表定位到当前点击的任务的位置,顺序号601，在列表上右键单击时显示
    @name SFGantt.ContextMenuItems.FocusIntoView
    @type SFMenuItem
    */
    gantt.addContextMenuItem(
        function (ma) { return (ma.type == "list" && ma.gantt.focusIntoView && ma.gantt.getFocusElement && ma.gantt.getFocusElement() && ma.gantt.getFocusElement().Start) ? 1 : 0 },
        function (ma) { ma.gantt.focusIntoView(); },
        names.FocusIntoView,
        "icon_taskgoto",
        "FocusIntoView",
        601);
    /**
    添加,在当前位置新建任务,顺序号651，在列表上右键单击时显示
    @name SFGantt.ContextMenuItems.AddTask
    @type SFMenuItem
    */
    gantt.addContextMenuItem(
        /**
        是否禁止甘特图以任何方式执行添加任务操作
        @name SFConfig.configItems.SFGantt_disableAddTask
        @type Bool
        @default false
        */
        function (ma) { return (ma.type == "list" && ma.gantt.addTask && !ma.gantt.readOnly && !ma.gantt.disableAddTask) ? 1 : 0 },
        function (ma) { ma.gantt.addTask(); },
        names.AddTask,
        null,
        "AddTask",
        651);
    /**
    删除,删除当前选中的任务,顺序号656，在列表上右键单击时显示
    @name SFGantt.ContextMenuItems.DeleteTask
    @type SFMenuItem
    */
    gantt.addContextMenuItem(
        function (ma) { return (ma.type == "list" && ma.gantt.deleteTask && !ma.gantt.readOnly && !ma.gantt.disableDeleteTask && ma.gantt.getFocusElement && ma.gantt.getFocusElement() && ma.gantt.getFocusElement().elementType == "Task") ? 1 : 0 },
        function (ma) { ma.gantt.deleteTask(); },
        names.DeleteTask,
        null,
        'DeleteTask',
        656);
    /**
    添加链接,在当前选中的多个任务之间添加链接,顺序号701，在列表上右键单击时显示
    @name SFGantt.ContextMenuItems.AddTasksLinks
    @type SFMenuItem
    */
    gantt.addContextMenuItem(
        function (ma) { return (ma.type == "list" && ma.gantt.addTasksLinks && !ma.gantt.readOnly && !ma.gantt.disableAddLink && ma.gantt.getFocusElement && ma.gantt.getFocusElement() && ma.gantt.getFocusElement().elementType == "Task") ? 1 : 0 },
        function (ma) { ma.gantt.addTasksLinks(); },
        names.AddTasksLinks,
        null,
        "AddTasksLinks",
        701);
    /**
    删除链接,删除当前选中的多个任务之间的链接,顺序号706，在列表上右键单击时显示
    @name SFGantt.ContextMenuItems.RemoveTasksLinks
    @type SFMenuItem
    */
    gantt.addContextMenuItem(
        function (ma) { return (ma.type == "list" && ma.gantt.removeTasksLinks && !ma.gantt.readOnly && !ma.gantt.disableDeleteLink && ma.gantt.getFocusElement && ma.gantt.getFocusElement() && ma.gantt.getFocusElement().elementType == "Task") ? 1 : 0 },
        function (ma) { ma.gantt.removeTasksLinks(); },
        names.RemoveTasksLinks,
        null,
        'RemoveTasksLinks',
        706);
    /**
    升级,升级当前选中的多个任务,顺序号751，在列表上右键单击时显示
    @name SFGantt.ContextMenuItems.UpgradeTask
    @type SFMenuItem
    */
    gantt.addContextMenuItem(
        function (ma) { return (ma.type == "list" && ma.gantt.upgradeSelectedTasks && !ma.gantt.readOnly && !ma.gantt.disableUpdateTask && ma.gantt.getFocusElement && ma.gantt.getFocusElement() && ma.gantt.getFocusElement().elementType == "Task") ? 1 : 0 },
        function (ma) { ma.gantt.upgradeSelectedTasks(); },
        names.UpgradeTask,
        null,
        'UpgradeTask',
        751);
    /**
    降级,降级当前选中的多个任务,顺序号756，在列表上右键单击时显示
    @name SFGantt.ContextMenuItems.DegradeTask
    @type SFMenuItem
    */
    gantt.addContextMenuItem(
        function (ma) { return (ma.type == "list" && ma.gantt.degradeSelectedTasks && !ma.gantt.readOnly && !ma.gantt.disableUpdateTask && ma.gantt.getFocusElement && ma.gantt.getFocusElement() && ma.gantt.getFocusElement().elementType == "Task") ? 1 : 0 },
        function (ma) { ma.gantt.degradeSelectedTasks(); },
        names.DegradeTask,
        null,
        'DegradeTask',
        756);
    /**
    复制任务,顺序号771，在列表上右键单击单个任务时显示
    @name SFGantt.ContextMenuItems.CopyTask
    @type SFMenuItem
    */
    gantt.addContextMenuItem(
        function (ma) { return (ma.gantt.getFocusElement && ma.gantt.getFocusElement() && ma.gantt.copyTask) ? 1 : 0 },
        function (ma) { ma.gantt.copyTask(); },
        names.CopyTask,
        null,
        "CopyTask",
        771);
    /**
    粘贴任务,顺序号772，在列表上右键单击单个任务时显示
    @name SFGantt.ContextMenuItems.PasteTask
    @type SFMenuItem
    */
    gantt.addContextMenuItem(
        function (ma) { return (ma.gantt.getFocusElement && ma.gantt.getFocusElement() && ma.gantt.canPasteTask && ma.gantt.canPasteTask()) ? 1 : 0 },
        function (ma) { ma.gantt.pasteTask(); },
        names.PasteTask,
        null,
        "PasteTask",
        771);
    /**
    打印,顺序号791，在任何区域右键单击时显示
    @name SFGantt.ContextMenuItems.Print
    @type SFMenuItem
    */
    gantt.addContextMenuItem(
        function (ma) { return (ma.gantt.showPrintDialog) ? 1 : 0 },
        function (ma) { ma.gantt.showPrintDialog(); },
        names.Print,
        "icon_print",
        "Print",
        791);
    /**
    显示图表,打开右侧的图表显示,顺序号801，在分隔条上右键单击时显示(且当前图表未显示)
    @name SFGantt.ContextMenuItems.ShowChart
    @type SFMenuItem
    */
    gantt.addContextMenuItem(
        function (ma) { return (ma.type == "column" && ma.gantt.collapseChart && !ma.gantt.isChartShow()) ? 1 : 0 },
        function (ma) { ma.gantt.collapseChart(); },
        names.ShowChart,
        null,
        'ShowChart',
        801);
    /**
    隐藏图表,关闭右侧的图表显示,顺序号806，在分隔条上右键单击时显示(且当前图表已显示)
    @name SFGantt.ContextMenuItems.HideChart
    @type SFMenuItem
    */
    gantt.addContextMenuItem(
        function (ma) { return (ma.type == "column" && ma.gantt.collapseChart && ma.gantt.isChartShow()) ? 1 : 0 },
        function (ma) { ma.gantt.collapseChart(); },
        names.HideChart,
        null,
        'HideChart',
        806);
    /**
    显示列表,打开左侧的列表显示,顺序号850，在分隔条上右键单击时显示(且当前列表未显示)
    @name SFGantt.ContextMenuItems.ShowList
    @type SFMenuItem
    */
    gantt.addContextMenuItem(
        function (ma) { return (ma.type == "column" && ma.gantt.collapseList && !ma.gantt.isListShow()) ? 1 : 0 },
        function (ma) { ma.gantt.collapseList(); },
        names.ShowList,
        null,
        'ShowList',
        850);
    /**
    隐藏列表,打开左侧的列表显示,顺序号856，在分隔条上右键单击时显示(且当前列表已显示)
    @name SFGantt.ContextMenuItems.HideList
    @type SFMenuItem
    */
    gantt.addContextMenuItem(
        function (ma) { return (ma.type == "column" && ma.gantt.collapseList && ma.gantt.isListShow()) ? 1 : 0 },
        function (ma) { ma.gantt.collapseList(); },
        names.HideList,
        null,
        'HideList',
        856);
    /**
    使用帮助,打开使用帮助链接,顺序号901，在LOGO上右键单击时显示
    @name SFGantt.ContextMenuItems.Help
    @type SFMenuItem
    */
    gantt.addContextMenuItem(
        function (ma) { return 1 },
        function (ma) { window.open("http://www.51diaodu.cn/sfgantt/help/"); },
        names.Help,
        null,
        'Help',
        901);
    /**
    关于,打开向日葵甘特图网页,顺序号951，在LOGO上右键单击时显示
    @name SFGantt.ContextMenuItems.About
    @type SFMenuItem
    */
    gantt.addContextMenuItem(
        function (ma) { return (ma.type == "logo") ? 1 : 0 },
        function (ma) { window.open("http://www.51diaodu.cn/sfgantt/"); },
        names.About,
        null,
        'About',
        951);
    return true;
}
window.SFGanttDefaultMenuControl = SFGanttDefaultMenuControl;
/**
这是一个甘特图功能控件，本控件用来实现甘特图的实体列表
@private
@extends SFGanttControl
@class
*/
function SFGanttElementList(config) {
    SFGlobal.setProperty(this, config);
}
SFGanttElementList.prototype = new window.SFGanttControl();
/**
@private
功能控件的初始化，每个插件的实现都会重写此方法
@param {SFGantt} gantt
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttElementList.prototype.initialize = function (gantt) {
    if (!gantt.getLayout) { return false; }
    var container = this.container = gantt.getLayout(this.mainList ? "listId" : "listBody"), doc = gantt.container.ownerDocument;
    if (!container) { return false; }
    this.gantt = gantt;
    this.elementStyles = gantt.config.getConfigObj("SFGantt/" + gantt.elementType.toLowerCase() + "Style")
    SFConfig.applyProperty(this, gantt.config.getConfigObj("SFGanttElementList"));
    if (!SFGanttElementList.listIndex) { SFGanttElementList.listIndex = 0; }
    this.proTag = "listRow_" + (SFGanttElementList.listIndex++);
    var table = this.div = doc.createElement("table");
    SFGlobal.setProperty(table, { bgColor: gantt.borderColor, border: 0, cellSpacing: 1, cellPadding: 0 });
    SFGlobal.setProperty(table.style, {
        fontSize: '0px', position: 'relative',
        left: '-2px', top: '-3px', tableLayout: 'fixed', zIndex: 100,
        //hq add new css for table
        backgroundColor: 'rgb(205, 205, 205)',
        borderCollapse: 'separate',
        borderSpacing: '1px'
    });
    SFEvent.setUnSelectable(table);
    //第一行，用来进行宽度定义
    var fRow = table.insertRow(-1), bgColor = this.bgColor;
    bgColor = bgColor ? bgColor : "#FFFFFF";
    SFGlobal.setProperty(fRow, { bgColor: bgColor });
    var sum = 0, fields = this.fields = SFGanttField.getFields(gantt.elementType, this.fieldNames);
    var fCell = fRow.insertCell(-1);//第一列用来进行高度定义
    SFGlobal.setProperty(fCell, { width: 1 });
    var whiteSpace = document.compatMode ? 'nowrap' : 'pre';
    SFGlobal.setProperty(fCell.style, { overflowX: 'hidden', fontSize: '0px', whiteSpace: whiteSpace });
    //没有直接通过设置列的高度而是在里面放置一个层，来设置层的高度
    //这样做是因为在IE之中打印时直接设置列高度超过1000px左右时会失效
    var div = doc.createElement("div"), widths = [];
    SFGlobal.setProperty(div.style, { position: 'relative', left: '-1px', width: "1px" });
    fCell.appendChild(div);
    for (var j = 0; j < fields.length; j++) {
        fCell = fRow.insertCell(-1);
        SFGlobal.setProperty(fCell.style, { overflow: 'hidden', fontSize: '0px', whiteSpace: whiteSpace });
        var width = fields[j].width;
        widths.push(width);
        sum += width + 1;
        SFGlobal.setProperty(fCell, { width: width });
    }
    //在最后添加一列，用来在最后添加任务
    var fRow = table.insertRow(-1);
    SFGlobal.setProperty(fRow, { bgColor: bgColor });
    var fCell = fRow.insertCell(-1);//第一行用来进行高度定义

    SFGlobal.setProperty(fCell, { height: (gantt.itemHeight - 1) * 1 });
    SFGlobal.setProperty(fCell.style, { overflow: 'hidden', whiteSpace: whiteSpace });
    for (var j = 0; j < this.fields.length; j++) {
        fCell = fRow.insertCell(-1);
        SFGlobal.setProperty(fCell.style, { overflow: 'hidden', whiteSpace: whiteSpace });
    }
    table.width = sum + 3;
    this.container.appendChild(table);
    var et = this.elementType.toLowerCase();
    var listeners = this.listeners = [
        SFEvent.bind(gantt, "resize", this, this.onResize),
        SFEvent.bind(gantt, et + "inview", this, this.drawElement),
        SFEvent.bind(gantt, et + "outview", this, this.clearElement),
        SFEvent.bind(gantt, et + "change", this, this.updateElement),
        SFEvent.bind(table, "click", this, this.onTableClick),
        SFEvent.bind(table, "dblclick", this, this.onTableDblClick)
    ];
    if (gantt.setContextMenu) { gantt.setContextMenu(table, function (menu) { menu.type = "list"; return true }); }
    listeners.push(SFEvent.bind(table, "mousedown", this, this.onTableMouseDown));
    //开始支持纵向拖拽
    if (this.mainList) {
        //为支持可变行高改变而改变鼠标样式
        if (!this.disableAdjustLineHeight && !gantt.inline) { listeners.push(SFEvent.bind(table, "mousemove", this, this.onTableMouseOver)); }
    }
    else {
        listeners.push(SFEvent.bind(container, "scroll", this, function () { if (container.scrollLeft != 0) { container.scrollLeft = 0; } }));
        listeners.push(SFEvent.bind(gantt, "listfieldsscroll", this, this.onHeadMove));
        listeners.push(SFEvent.bind(gantt, "listfieldsresize", this, this.onHeadResize));
    }
    this.onHeadResize(widths);
    if (this.disableDragOrder || gantt.inline) { this.mainList = null; }
    if (gantt.setCursor) { gantt.setCursor(table, this.mainList ? 'lineselect.cur,default' : 'fieldedit.cur,default'); }
    this.onResize();
    return true;
}
/**
@private
通过调整第一行(空白行)的高度来保持和甘特图视图高度的一致
*/
SFGanttElementList.prototype.setViewTop = function () {
    var top = this.gantt.getViewTop();
    this.div.rows[0].cells[0].firstChild.style.height = top + 1 + "px";
}
/**
@private
通过调整最后一行(空白行)的高度来保证底下不会出现空白
*/
SFGanttElementList.prototype.onResize = function () {
    var rows = this.div.rows, gantt = this.gantt;
    rows[rows.length - 1].height = Math.max(gantt.itemHeight, gantt.viewSize[1] - gantt.headHeight - gantt.footHeight) - 1;
}
/**
@private
应用行的样式
@param {HtmlElement} row html的一个表格行
@param {SFDataElement} element 该行对应的元素，将根据元素的属性来选择样式
*/
SFGanttElementList.prototype.applyRowStyle = function (row, element) {

    var className = element.ClassName,
        elementStyle = $.extend(true, {}, this.elementStyles[this.elementStyle]),
        classNames;
    //className = className ? className : this.elementStyle;
    //var elementStyle = this.elementStyles[className];
    //inforcenter hq
    if (className) {
        classNames = className.split(',');
        while (classNames.length > 0) {
            $.extend(true, elementStyle, this.elementStyles[classNames.shift()]);
        }
    }
    if (elementStyle) {
        var style = element.Selected ? elementStyle.listSelectedStyle : elementStyle.listStyle;
        if (style) {
            SFGlobal.setProperty(row.style, style);
            return;
        }
    }
    /**
    左侧list列表之中的任务被选中时的背景色
    @name SFConfig.configItems.SFGantt_listFocusColor
    @type Color
    @default #DDDDDD
    */
    var gantt = this.gantt, style = this.mainList ?
        (element.Selected ? { backgroundColor: gantt.listFocusColor } : { backgroundColor: this.gantt.idCellBgColor }) :
        (element.Selected ? { backgroundColor: gantt.listFocusColor } : { backgroundColor: "#FFFFFF" });
    SFGlobal.setProperty(row.style, style);
}
/**
@private
绘制一行
@param {SFDataElement} element 该行对应的元素，将根据元素的属性来选择样式
@param {Number} viewIndex 绘制行的位置，是在当前视图中所有行数组之中的索引
*/
SFGanttElementList.prototype.drawElement = function (element, viewIndex) {
    if (viewIndex == 0) { this.setViewTop(); }
    var gantt = this.gantt, drawObj = gantt.getElementDrawObj(element), height = drawObj.height;
    //绘制右边的详细内容
    var row = this.div.insertRow(viewIndex + 1);
    //下面针对内容偏移做处理
    if (//gantt.getElementHeight(element)<=0
        (gantt.getElementHeight(element) <= 0 && !(gantt.hideSummary && gantt.inline && element.Summary && element.getFirstChild() && !element.getFirstChild().Summary)) ||
        ((gantt.hideSummary && gantt.inline) && (!element.Summary && element.getParent() && element.getParent().getFirstChild() == element))
    ) {
        row.style.display = "none";
    }
    if (height == 0) { height = gantt.itemHeight }

    var render = true;
    if ((gantt.hideSummary && gantt.inline) && (!element.Summary && element.getParent())) { render = false }

    this.applyRowStyle(row, element);
    //如果是右侧的列,则应该显示右边箭头图标,否则是十字图标
    var cell = row.insertCell(-1);
    var whiteSpace = document.compatMode ? 'nowrap' : 'pre';
    SFGlobal.setProperty(cell, { height: (height - 1) * 1, width: 1 });
    cell.style.cssText = "overflow:hidden;white-space:" + whiteSpace + ";font-size:0px;";
    drawObj[this.proTag] = row;
    if (render) { row._Element = element; }
    var doc = this.container.ownerDocument, fields = this.fields, fontSize = gantt.fontSize;
    /**
    甘特图上显示的字体大小
    @name SFConfig.configItems.SFGantt_fontSize
    @type Number
    @default 12
    */
    for (var j = 0; j < fields.length; j++) {
        var cell = doc.createElement("td");
        var text = [];
        text.push("overflow:hidden");
        text.push("white-space:" + whiteSpace);
        text.push("font-size:" + fontSize + "px");
        if (element.Summary) { text.push("font-weight:bolder"); }
        cell.style.cssText = text.join(";");
        if (render) { fields[j].showBody(cell, element, this); }
        else {
            cell.vAlign = "top";
            var div = document.createElement("div");
            SFGlobal.setProperty(div.style, { width: '100%', position: 'relative', top: '-1px', backgroundColor: '#FFFFFF', height: '1px', fontSize: '0px', overflow: 'hidden' });
            cell.appendChild(div);
        }
        row.appendChild(cell);
    }
}
/**
@private
清除一行的内容
@param {SFDataElement} element 该行对应的元素，将根据元素的属性来选择样式
@param {Number} viewIndex 绘制行的位置，是在当前视图中所有行数组之中的索引
*/
SFGanttElementList.prototype.clearElement = function (element, viewIndex) {
    if (viewIndex == 0) { this.setViewTop(); }
    this.clearInputCell();
    var drawObj = this.gantt.getElementDrawObj(element);
    SFEvent.deposeNode(drawObj[this.proTag]);
    drawObj[this.proTag] = null;
}
/**
@private
退出当前正在进行的编辑状态
*/
SFGanttElementList.prototype.clearInputCell = function () {
    if (this.focusObj && this.focusObj.inputCell >= 0) {
        var element = this.focusObj.element, field = this.fields[this.focusObj.inputCell], drawObj = this.gantt.getElementDrawObj(element), cells = drawObj[this.proTag].cells, div = cells[this.focusObj.inputCell + 1];
        field.showBody(div, element, this);
        this.focusObj.inputCell = -1;
        /** 
            @event
            @name SFGantt#afterfieldeditend
            @description 在一个元素的域退出编辑模式后触发
            @param {SFGanttField} fiels 已被编辑的域信息.
            @param {SFDataElement} element 已被修改的元素.
            @param {HtmlElement} div 当前该域的显示层
         */
        SFEvent.trigger(this.gantt, "afterfieldeditend", [field, element, div]);
    }
}
/**
@private
在列表头移动时移动当前的列表位置
@param {Number} position 当前的列表头位置
*/
SFGanttElementList.prototype.onHeadMove = function (position) {
    this.div.style.left = position + "px";
}
/**
@private
在列表头宽度发生变化时更新各列的宽度
@param {Number[]} widths 新的表列表头各列宽度数组
*/
SFGanttElementList.prototype.onHeadResize = function (widths) {
    var table = this.div, cells = table.rows[0].cells, sum = 0;
    for (var i = 0; i < widths.length; i++) {
        cells[i + 1].width = widths[i];
        sum += widths[i] + 1;
    }
    table.width = sum + 3;
    this.widths = widths;
}
/**
@private
获得当前鼠标事件对应的行
@param {Event} e 浏览器鼠标事件
@returns {HtmlElement} 对应的行HTML元素
*/
SFGanttElementList.prototype.getEventRow = function (e) {
    var target = e.target;
    var row, node = target;
    while (node) {
        if (node.nodeName == "TR") { row = node }
        if (node == this.div) { break; }
        node = node.parentNode;
    }
    if (!row || !row._Element) { return; }
    return row;
}
/**
@private
在鼠标移动的时候判断鼠标的位置，确定是否显示可变行高的鼠标样式
@param {Event} e 浏览器鼠标事件
*/
SFGanttElementList.prototype.onTableMouseOver = function (e) {
    var row = this.getEventRow(e);
    if (!row) {//如果不是在某个行上移动，则通过位置计算出精确的行
        var height = SFEvent.getEventPosition(e, this.div)[1];
        for (row = this.div.rows[0]; row; row = row.nextSibling) {
            height -= row.offsetHeight;
            if (height < 0) { break; }
        }
        if (!row || !row._Element) { return; }
    }
    var element = row._Element, gantt = this.gantt;
    var size = 3, height = SFEvent.getEventRelative(e, row)[1];
    if (height < size || height >= gantt.getElementHeight(element) - size - 1) {
        var t = height < size ? element.getPreviousView() : element;
        if (t && t.canSetProperty("LineHeight")) {
            if (gantt.setCursor) { gantt.setCursor(this.div, 'heightChange.cur,default'); }
            this.dragMode = "itemHeight";
            return;
        }
    }
    if (gantt.setCursor) { gantt.setCursor(this.div, element.Selected ? 'orderdrag.cur,move' : 'lineselect.cur,default'); }
    this.dragMode = "";
}
/**
@private
在列鼠标被按下的时候执行的操作,即开始拖动
@param {Event} e 浏览器鼠标事件
*/
SFGanttElementList.prototype.onTableMouseDown = function (e) {
    //inforcenter 点击展开按钮不选中该行
    if (e.target.nodeName == "IMG" && e.target.src.indexOf("collapse") > 0) {
        return;
    }
    var row = this.getEventRow(e);
    //Inforcenter8.1,IE11兼容性，取消文本选中
    document.onselectstart = function () {
        return false;
    }
    if (!row) { return; }
    var element = row._Element;
    /** 
        @event
        @name SFGantt#taskmousedown
        @private
        @description 在甘特图上的一个任务被鼠标按下时触发
        @param {SFDataTask} task
        @param {Event} e 浏览器鼠标事件
     */
    SFEvent.trigger(this.gantt, this.elementType.toLowerCase() + "mousedown", [element, e]);
    if (SFEvent.getEventButton(e) != 1) { return; }
    if (this.mainList) {
        if (this.dragMode == "itemHeight") {
            if (SFEvent.getEventPosition(e, row)[1] < 3) {
                element = element.getPreviousView();
                if (!element) { return; }
                row = this.gantt.getElementDrawObj(element)[this.proTag];
            }
        }
        this.dragElement = element;
        new SFDragObject(row, SFEvent.getCallback(this, (this.dragMode == "itemHeight") ? this.onItemHeightMove : this.onTableMove)).onMouseDown(e);
    }
}
/**
@private
鼠标拖拽更改行高的过程之中持续触发，更改对应行的行高
@param {Number[]} sp 拖拽起始点位置
@param {Number[]} lp 拖拽当前点位置
@param {String} type 当前触发的类型
*/
SFGanttElementList.prototype.onItemHeightMove = function (sp, lp, type) {
    var element = this.dragElement, gantt = this.gantt;
    if (type == "start") { this.startHeight = gantt.getElementHeight(element); return; }
    var cell = gantt.getElementDrawObj(element)[this.proTag].cells[0];
    var height = Math.max(this.startHeight + lp[1] - sp[1], 10);
    if (type != "end") {
        cell.height = height - 1;
    }
    else {
        cell.height = this.startHeight - 1;
        if (this.startHeight != height) {
            element.setProperty("LineHeight", height);
        }
    }
}
/**
@private
鼠标拖拽移动任务的过程之中持续触发，判断当前移动的目标位置
@param {Number[]} sp 拖拽起始点位置
@param {Number[]} lp 拖拽当前点位置
@param {String} type 当前触发的类型
*/
SFGanttElementList.prototype.onTableMove = function (sp, lp, type) {
    if (type != "end") {
        var dir = lp[1] > sp[1];
        var gantt = this.gantt, element = this.dragElement;
        var distance = dir ? (lp[1] - gantt.getElementHeight(element)) : lp[1];
        while (element) {
            var newElement = dir ? element.getNextView() : element.getPreviousView();
            if (!newElement) { break; }
            var height = gantt.getElementHeight(newElement);
            if (newElement && newElement != this.gantt.data.getRootElement(this.elementType) && (dir ? (distance - height / 2) : (distance + height / 2)) * (dir ? 1 : -1) > 0) {
                element = newElement;
                distance = dir ? (distance - height) : (distance + height);
            }
            else {
                break;
            }
        }
        this.dragDir = dir;
        this.flagElement = element;
        this.mainList.showElementMoveFlag(element, this.dragElement, this.dragDir);
    }
    else {
        if (this.flagElement && this.flagElement != this.dragElement) {
            this.moveElement(this.dragElement, this.flagElement, this.dragDir);
        }
        this.mainList.showElementMoveFlag(this.dragElement, this.dragElement);//清除标示的显示
    }

}
/**
@private
显示元素移动的位置标志
@param {SFDataElement} element 当前拖拽位置的元素
@param {SFDataElement} dragElement 当前正在被拖拽的元素
@param {Bool} dir 当前拖拽的方向，如果是向下拖动，则为true,否则为false
*/
SFGanttElementList.prototype.showElementMoveFlag = function (element, dragElement, dir) {
    if (this.flagDiv) {
        if (element == this.flagElement) { return; }
        SFEvent.deposeNode(this.flagDiv);
        this.flagDiv = null;
        this.flagElement = element;
    }
    if (!element || dragElement.contains(element)) { return; }
    var gantt = this.gantt, height = SFEvent.getPageOffset(gantt.getElementDrawObj(element)[this.proTag], this.container)[1], doc = this.container.ownerDocument;
    height = dir ? (height + gantt.getElementHeight(element) - 14) : (height - 14);
    var table = doc.createElement("table");
    table.cellSpacing = 0;
    SFGlobal.setProperty(table.style, { position: 'absolute', width: '100%', zIndex: 200, height: '21px', left: '3px', top: height + 'px' });
    var row = table.insertRow(-1);
    var cell = row.insertCell(-1);
    cell.width = 3;
    var leftImg = doc.createElement("img");
    SFGlobal.setProperty(leftImg.style, { width: '3px', height: '21px' });
    this.gantt.setBackgroundImage(leftImg, "dragflag_left");
    cell.appendChild(leftImg);
    var cell = row.insertCell(-1);
    this.gantt.setBackgroundImage(cell, "dragflag_right");
    this.container.appendChild(table);
    this.flagDiv = table;
}
/**
@private
移动一个任务到新的位置，该位置是以flagElement来定位的
@param {SFDataElement} element 被移动的元素
@param {SFDataElement} flagElement 移动的目标位置的元素
@param {Bool} dir 此参数为true在flagElement之后创建，为false代表在flagElement之前创建，
*/
SFGanttElementList.prototype.moveElement = function (element, flagElement, dir) {
    var pElement, preElement = null, postElement = null;
    if (dir)//如果是向下添加
    {
        var nElement = flagElement.getNextView();
        if (!nElement || nElement.getOutlineLevel() < flagElement.getOutlineLevel()) {
            preElement = flagElement;
        }
        else {
            postElement = nElement;
        }
    }
    else//如果是向上添加
    {
        var pElement = flagElement.getPreviousView();
        if (!pElement || pElement.getOutlineLevel() <= flagElement.getOutlineLevel()) {
            postElement = flagElement;
        }
        else {
            preElement = pElement;
        }
    }
    var data = this.gantt.data;
    if (preElement) {
        data.moveElement(element.elementType, element, preElement.getParent(), preElement);
    }
    else {
        data.moveElement(element.elementType, element, postElement.getParent(), postElement.getPreviousSibling());
    }
}
/**
@private
在任务属性发生变化时进行响应
@param {SFDataElement} element 被更改的元素
@param {String[]} changedFields 更改的属性列表
*/
SFGanttElementList.prototype.updateElement = function (element, changedFields) {
    var gantt = this.gantt;
    if (element == gantt.getData().getRootElement(this.elementType)) { return; }
    var drawObj = gantt.getElementDrawObj(element);
    var row = drawObj[this.proTag];
    if (!row) { return; }
    if (SFGlobal.findInArray(changedFields, "Selected")) {
        var selected = element.Selected;
        if (!selected && this.focusObj && this.focusObj.element == element) { this.clearInputCell(); }
        this.applyRowStyle(row, element);
        if (this.mainList && gantt.setCursor)//如果是左侧列被选中,则应该更改图标提示用户可拖动
        {
            gantt.setCursor(row, selected ? 'orderdrag.cur,move' : 'lineselect.cur,default');
        }
    }
    if (SFGlobal.findInArray(changedFields, "ClassName")) {
        this.applyRowStyle(row, element);
    }
    for (var i = 0; i < this.fields.length; i++) {
        if (!this.fields[i].checkUpdate(changedFields)) { continue; }
        var cell = row.cells[i + 1];
        SFEvent.deposeNode(cell, true);
        var style = cell.style;
        style.fontSize = gantt.fontSize + 'px';
        this.fields[i].showBody(cell, element, this);
    }
    if (SFGlobal.findInArray(changedFields, "Summary")) {
        for (var i = 0; i < this.fields.length; i++) {
            row.cells[i + 1].style.fontWeight = element.Summary ? 'bolder' : '';
        }
    }
}
/**
@private
在列表被双击时执行的响应
@param {Event} e 浏览器鼠标事件
*/
SFGanttElementList.prototype.onTableDblClick = function (e) {
    var row = this.getEventRow(e);
    if (!row) { return; }
    var element = row._Element;
    //计算当前点击在哪一个格上
    var index = this.getFieldIndex(row, e), fields = this.fields;
    if (index < 0) { return; }
    SFEvent.trigger(this.gantt, this.elementType.toLowerCase() + "dblclick", [element, "list", fields[index].Name]);
    if (this.editEvent == "dblclick") {
        this.startInput(element, index);
    }
}
/**
@private
计算鼠标点击在第几列上，如果返回-1,则没有点击在有效的列上
@param {HtmlElement} row 点击所在的行
@param {Event} e 浏览器鼠标事件
*/
SFGanttElementList.prototype.getFieldIndex = function (row, e) {
    //计算当前点击在哪一个格上
    var j, left = SFEvent.getEventPosition(e, row)[0], fields = this.fields, widths = this.widths;
    for (j = 0; j < widths.length; j++) {
        left -= widths[j] + 1;
        if (left < 0) { break; }
    }
    if (j == fields.length) { return -1; }
    return j;
}
/**
开始对指定元素的指定列进行编辑
@param {SFDataElement} element 指定的元素
@param {Number} index 编辑的列的序号
*/
SFGanttElementList.prototype.startInput = function (element, index) {
    var gantt = this.gantt;
    /**
    是否以只读模式显示甘特图，只读模式下任何关于数据更改的操作都被禁止
    @name SFConfig.configItems.SFGantt_readOnly
    @type Bool
    @default false
    */
    if (!gantt.readOnly && !gantt.disableUpdateElement && !this.disableInput) {
        var fields = this.fields, field = fields[index];
        this.clearInputCell();
        if (field.inputFunc && !field.ReadOnly && (!field.inputData || element.canSetProperty(field.inputData))) {
            var returnObj = { returnValue: true }, div = gantt.getElementDrawObj(element)[this.proTag].cells[index + 1];
            /** 
                @event
                @name SFGantt#beforefieldeditstart
                @description 在一个元素的域进入编辑模式前触发
                @param {Json} returnObj 如果设置returnObj.returnValue=false,则代表不进入编辑模式.
                @param {SFGanttField} fiels 正在被编辑的域信息.
                @param {SFDataElement} element 正在被修改的元素.
                @param {HtmlElement} div 当前该域的显示层
             */
            SFEvent.trigger(gantt, "beforefieldeditstart", [returnObj, field, element, div]);
            if (returnObj.returnValue) {
                this.focusObj = { inputCell: index, element: element }
                field.showInput(div, element, this);
                /** 
                    @event
                    @name SFGantt#afterfieldeditstart
                    @description 在一个元素的域进入编辑模式后触发
                    @param {SFGanttField} fiels 正在被编辑的域信息.
                    @param {SFDataElement} element 正在被修改的元素.
                    @param {HtmlElement} div 当前该域的显示层
                 */
                SFEvent.trigger(gantt, "afterfieldeditstart", [field, element, div]);
            }
        }
    }
}
/**
@private
在列表被单击的时候执行的响应
@param {Event} e 浏览器鼠标事件
*/
SFGanttElementList.prototype.onTableClick = function (e) {
    var row = this.getEventRow(e), gantt = this.gantt;
    //Inforcenter8.1,IE11兼容性，取消文本选中
    document.onselectstart = null;

    if (!row) { if (gantt.clearSelectedElement) { gantt.clearSelectedElement(); } return; }
    var element = row._Element;
    SFEvent.trigger(gantt, this.elementType.toLowerCase() + "click", [element, e]);
    /**
    用户进入编辑模式的方式，"click"为左键单击，"dblclick"为左键双击，"none"为不允许用户操作进入编辑模式
    @name SFConfig.configItems.SFGanttElementList_editEvent
    @type String
    @default "click"
    */
    if (this.editEvent == "click") {
        var index = this.getFieldIndex(row, e);
        if (index > -1) {
            this.startInput(element, index);
        }
    }
}
window.SFGanttElementList = SFGanttElementList;
/**
此控件是甘特图之中的显示信息窗口的控件，加载了此控件之后就可以使用地图的打开窗口的方法，
@class
@private
*/
function SFGanttDialogControl() {
}
SFGanttDialogControl.prototype = new window.SFGanttControl();
/**
@private
功能控件的初始化，每个插件的实现都会重写此方法
@param {SFGantt} gantt
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttDialogControl.prototype.initialize = function (gantt) {
    if (this.gantt) { return false; }
    gantt.openDialog = SFEvent.getCallback(this, this.openDialog);
    gantt.closeDialog = SFEvent.getCallback(this, this.closeDialog);
    this.gantt = gantt;
    return true;
}
/**
在甘特图上显示一个浮动窗口
@name SFGantt.prototype.openDialog
@function
@param {HtmlElement|String} [content] 窗口的内容，为一个HTML元素或者字符串
@param {Json} [config] 窗口的显示参数
@param {Number[]} [config.size] 窗口内容的大小,如[500,400]代表宽度为500，高度为400，如果不设置，默认为甘特图大小的一半
@param {Bool} [config.isModal] 是否是模式窗口，如果为true,则打开此窗口时，甘特图上的项目都会被半透明的遮罩遮住，不允许操作，只能在当前的模式窗口上进行操作
@param {String} [config.title] 窗口的标题
*/
SFGanttDialogControl.prototype.openDialog = function (content, config) {
    if (this.isOpen) { this.closeDialog(); }
    config = config ? config : {};
    var gantt = this.gantt, viewSize = gantt.getViewSize(), container = this.gantt.getContainer();
    var size = config.size ? config.size : [parseInt(viewSize[0] / 2), parseInt(viewSize[1] / 2)];
    var wSize = [size[0] + 10, size[1] + 35];
    var div = this.div, contentDiv;
    if (!div) {
        var div = this.div = document.createElement("div");
        SFGlobal.setProperty(div.style, { position: 'absolute', overflow: 'hidden', zIndex: 990, border: 'solid 1px #000000', backgroundColor: '#FFFFFF' });
        var titleDiv = document.createElement("div");
        SFGlobal.setProperty(titleDiv.style, { position: 'relative', borderBottom: 'solid 1px #000000', backgroundColor: '#999999', width: '100%', height: '21px' });
        div.appendChild(titleDiv);
        var titleSpan = document.createElement("div");
        SFGlobal.setProperty(titleSpan.style, { position: 'relative', width: '100%', height: '16px', fontSize: '14px', fontWeight: 'bolder', padding: '4px', paddingLeft: '10px', cursor: 'move' });
        titleDiv.appendChild(titleSpan);
        var closeBtn = document.createElement("div")
        SFGlobal.setProperty(closeBtn.style, { position: 'absolute', right: '2px', top: '-8px', fontSize: '25px', backgroundColor: '#999999', cursor: 'pointer' });
        closeBtn.appendChild(document.createTextNode("×"));
        div.appendChild(closeBtn);
        this.listeners = [SFEvent.bind(closeBtn, "click", this, this.closeDialog)];
        var contentDiv = document.createElement("div");
        SFGlobal.setProperty(contentDiv.style, { position: 'relative', fontSize: '13px', margin: '5px' });
        div.appendChild(contentDiv);
    }
    else {
        contentDiv = div.lastChild;
    }
    SFGlobal.setProperty(div.style, { left: (viewSize[0] - wSize[0]) / 2 + 'px', top: (viewSize[1] - wSize[1]) / 2 + 'px', width: wSize[0] + 'px', height: wSize[1] + 'px' });
    SFGlobal.setProperty(contentDiv.style, { width: size[0] + 'px', height: size[1] + 'px' });
    //标题的显示
    if (config.title) {
        div.firstChild.firstChild.innerHTML = config.title;
    }
    else {
        SFEvent.deposeNode(div.firstChild.firstChild, true);
    }
    //内容的显示
    if (typeof (content) == "object") {
        contentDiv.appendChild(content);
    }
    else {
        contentDiv.innerHTML = content;
    }
    container.appendChild(div);
    //如果是模式窗口，则用透明层将甘特图遮住
    if (config.isModal) {
        //现在开始使用遮罩层
        var maskDiv = this.maskDiv;
        if (!maskDiv) {
            var maskDiv = this.maskDiv = document.createElement("div");
            SFGlobal.setProperty(maskDiv.style, { position: 'absolute', zIndex: 950, backgroundColor: '#000000' });
            SFGlobal.setOpacity(maskDiv, 0.7);
        }
        SFGlobal.setProperty(maskDiv.style, { left: '0px', top: '0px', width: viewSize[0] + 'px', height: viewSize[1] + 'px' });
        container.appendChild(maskDiv);
    }
    else {
        if (this.maskDiv) { container.removeChild(this.maskDiv); }
    }
    /** 
        @event
        @name SFGantt#dialogopen
        @param {Json} [config] 窗口的显示参数
        @description 在浮动窗口打开时触发。
     */
    this.isOpen = true;
    SFEvent.trigger(this.gantt, "dialogopen", [config]);
}
/**
关闭浮动窗口
@name SFGantt.prototype.closeDialog
@function
*/
SFGanttDialogControl.prototype.closeDialog = function () {
    var container = this.gantt.getContainer();
    if (this.maskDiv) { container.removeChild(this.maskDiv); }
    if (this.div) {
        while (this.div.lastChild.firstChild) { this.div.lastChild.removeChild(this.div.lastChild.firstChild); }
        container.removeChild(this.div);
    }
    /** 
        @event
        @name SFGantt#dialogclose
        @description 在浮动窗口被关闭时触发。
     */
    this.isOpen = false;
    SFEvent.trigger(this.gantt, "dialogclose");
}
/**
在功能控件被移除时执行的方法
@private
*/
SFGanttDialogControl.prototype.remove = function () {
    this.closeDialog();
    var gantt = this.gantt;
    delete gantt.openDialog
    delete gantt.closeDialog
    delete this.maskDiv
    SFGanttControl.prototype.remove.apply(this, arguments);
}
window.SFGanttDialogControl = SFGanttDialogControl;

/**
这是一个甘特图功能控件，本控件实现在甘特图上显示LOGO
@private
@extends SFGanttControl
@class
*/
function SFGanttPrintControl() {
}
SFGanttPrintControl.prototype = new window.SFGanttControl();
/**
功能控件的初始化，每个插件的实现都会重写此方法
@private
@param {SFGantt} gantt
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttPrintControl.prototype.initialize = function (gantt) {
    this.gantt = gantt;
    gantt.createPrintWindow = SFEvent.getCallback(this, this.createPrintWindow);
    gantt.addPrintContent = SFEvent.getCallback(this, this.addPrintContent);
    gantt.printContentWindow = SFEvent.getCallback(this, this.printContentWindow);
    gantt.showPrintDialog = SFEvent.getCallback(this, this.showPrintDialog);
    return true;
}
/**
显示打印甘特图的浮动窗口
@name SFGantt.prototype.showPrintDialog
@private
@function
*/
SFGanttPrintControl.prototype.showPrintDialog = function () {
    var gantt = this.gantt, contentDiv = this.div;
    if (!contentDiv) {
        contentDiv = this.div = document.createElement("div");
        contentDiv.style.padding = "5px";
        contentDiv.style.fontSize = "12px";
        /*
                    var div=document.createElement("div");
                    div.style.margin="5px";
                    div.appendChild(document.createTextNode("纸张类型: "));
                    contentDiv.appendChild(div);
                    var a_pageType=[
                        {name:'A0',width:841,height:1189},
                        {name:'A1',width:594,height:841},
                        {name:'A2',width:420,height:594},
                        {name:'A3',width:297,height:420},
                        {name:'A4',width:210,height:297},
                        {name:'A5',width:148,height:210},
                        {name:'A6',width:105,height:148},
                        {name:'A7',width:74,height:105},
                        {name:'A8',width:52,height:74},
                        {name:'A9',width:37,height:52},
                        {name:'A10',width:26,height:37},
                        {name:'B0',width:1000,height:1414},
                        {name:'B1',width:707,height:1000},
                        {name:'B2',width:500,height:707},
                        {name:'B3',width:353,height:500},
                        {name:'B4',width:250,height:353},
                        {name:'B5',width:176,height:250},
                        {name:'B6',width:125,height:176},
                        {name:'B7',width:88,height:125},
                        {name:'B8',width:62,height:88},
                        {name:'B9',width:44,height:62},
                        {name:'B10',width:31,height:44},
                        {name:'C0',width:917,height:1297},
                        {name:'C1',width:648,height:917},
                        {name:'C2',width:458,height:648},
                        {name:'C3',width:324,height:458},
                        {name:'C4',width:229,height:324},
                        {name:'C5',width:162,height:229},
                        {name:'C6',width:114,height:162},
                        {name:'C7',width:81,height:114},
                        {name:'C8',width:57,height:81},
                        {name:'C9',width:110,height:220},
                        {name:'C10',width:81,height:162}
                    ];
                    var s_pageType=this.s_pageType=document.createElement("select");
                    for(var i=0;i<a_pageType.length;i++)
                    {
                        var option=document.createElement("option");
                        s_pageType.appendChild(option);
                        option.text=a_pageType[i].name;
                        option.value=a_pageType[i].width+","+a_pageType[i].height;
                    }
                    div.appendChild(s_pageType);
        
                    var div=document.createElement("div");
                    div.style.margin="5px";
                    div.appendChild(document.createTextNode("纸张大小: "));
                    div.appendChild(document.createTextNode("宽度"));
                    var t_width=this.t_width=document.createElement("input");
                    t_width.type="text";
                    t_width.style.width="32px";
                    div.appendChild(t_width);
                    div.appendChild(document.createTextNode("mm"));
                    div.appendChild(document.createTextNode(" "));
                    div.appendChild(document.createTextNode("高度"));
                    var t_height=this.t_height=document.createElement("input");
                    t_height.type="text";
                    t_height.style.width="32px";
                    div.appendChild(t_height);
                    div.appendChild(document.createTextNode("mm"));
                    contentDiv.appendChild(div);
        */
        var div = document.createElement("div");
        div.style.margin = "5px";
        div.appendChild(document.createTextNode("打印方向: "));
        var cb_hor = this.cb_hor = document.createElement("input");
        cb_hor.type = "checkbox";
        div.appendChild(cb_hor);
        div.appendChild(document.createTextNode("横向打印"));
        contentDiv.appendChild(div);

        var div = document.createElement("div");
        div.style.margin = "5px";
        div.appendChild(document.createTextNode("打印内容: "));
        var cb_showList = this.cb_showList = document.createElement("input");
        cb_showList.type = "checkbox";
        div.appendChild(cb_showList);
        cb_showList.checked = true;
        div.appendChild(document.createTextNode("左侧列表"));
        var cb_showMap = this.cb_showMap = document.createElement("input");
        cb_showMap.type = "checkbox";
        div.appendChild(cb_showMap);
        cb_showMap.checked = true;
        div.appendChild(document.createTextNode("右侧图表"));
        contentDiv.appendChild(div);

        var div = document.createElement("div");
        div.style.margin = "5px";
        div.appendChild(document.createTextNode("打印范围: "));
        var cb_all = this.cb_all = document.createElement("input");
        cb_all.type = "checkbox";
        div.appendChild(cb_all);
        div.appendChild(document.createTextNode("打印整个文档"));
        contentDiv.appendChild(div);

        var div = document.createElement("div");
        div.style.margin = "5px";
        div.innerHTML = " 请打开浏览器 <strong>背景打印 </strong> 选项以优化效果 ";
        contentDiv.appendChild(div);

        var div = document.createElement("div");
        div.style.margin = "5px";
        div.align = "center";
        var bt_submit = document.createElement("input");
        bt_submit.type = "button";
        bt_submit.value = "打印";
        div.appendChild(bt_submit);
        var bt_cancel = document.createElement("input");
        bt_cancel.type = "button";
        bt_cancel.value = "取消";
        div.appendChild(bt_cancel);
        contentDiv.appendChild(div);

        this.listeners = [
            //				SFEvent.bind(s_pageType,"change",this,this.onPageTypeChange),
            SFEvent.bind(bt_submit, "click", this, this.onSubmit),
            SFEvent.bind(bt_cancel, "click", gantt, gantt.closeDialog)
        ];
    }
    gantt.openDialog(contentDiv, { isModal: true, size: [280, 120], title: '打印' });
    //		this.s_pageType.selectedIndex=4;
    //		this.onPageTypeChange();
}
/**
在纸张类型变化时更新大小字段
@private
*/
/*
	SFGanttPrintControl.prototype.onPageTypeChange=function()
	{
		var select=this.s_pageType;
		var size=select.options[select.selectedIndex].value.split(",");
		this.t_width.value=size[0];
		this.t_height.value=size[1];
	}
*/
/**
在打印开始时
@private
*/
SFGanttPrintControl.prototype.onSubmit = function () {
    //		var width=parseInt(this.t_width.value),height=parseInt(this.t_height.value);
    var width = 210, height = 297;
    var isHor = this.cb_hor.checked, isAll = this.cb_all.checked;
    var showList = this.cb_showList.checked, showMap = this.cb_showMap.checked;
    if (!showList && !showMap) { return; }
    //计算像素值
    width -= 20 + 20;
    height -= 20 + 20;
    var dpi = window.chrome ? 96 : 96, inch = 25.4;
    var gantt = this.gantt, win = gantt.createPrintWindow(), size = isHor ? [height / inch * dpi, width / inch * dpi] : [width / inch * dpi, height / inch * dpi], padding = 4;
    size = [Math.floor(size[0]), Math.floor(size[1])];
    var lastElement = gantt.getData().getRootElement(gantt.elementType).getLastDescendant(true);
    var maxHeight = gantt.getElementViewTop(lastElement) + gantt.getElementHeight(lastElement), currentHeight = isAll ? 0 : gantt.getLayout("bodyScroll").scrollTop, nextHeight = 0;
    var listWidth, mapWidth, currentTime, nextTime, maxTime = gantt.getData().getRootTask().Finish;
    for (var i = 0; ; i++) {
        if (currentHeight >= maxHeight || (!isAll && i > 0)) { break; }
        nextHeight = Math.min(currentHeight + size[1] - gantt.headHeight - padding, maxHeight);
        currentTime = isAll ? gantt.getData().getRootTask().Start : gantt.getStartTime();
        for (var j = 0; ; j++) {
            if (j == 0) {
                listWidth = (!showList) ? 0 : ((!showMap) ? size[0] : gantt.listWidth);
                mapWidth = size[0] - listWidth - 10 - gantt.idCellWidth;
            }
            else {
                listWidth = 0;
                mapWidth = size[0] - gantt.idCellWidth;
            }
            nextTime = new Date(currentTime.valueOf() + mapWidth * gantt.getScale());
            this._addPrintContent(win, [size[0], Math.min(size[1], nextHeight - currentHeight + gantt.headHeight + padding)], isHor, [listWidth, mapWidth, showList, showMap], currentTime, currentHeight);
            currentTime = nextTime;
            if (currentTime >= maxTime || !showMap || !isAll) { break; }
        }
        currentHeight = nextHeight;
    }
}
/**
创建一个用来打印甘特图的窗口，一个窗口之中可以打印多个甘特图
@name SFGantt.prototype.createPrintWindow
@private
@function
*/
SFGanttPrintControl.prototype.createPrintWindow = function () {
    if (this._win) { this.deposePrintWindow(this._win); delete this._win; }
    var iframe = document.createElement("iframe");
    SFGlobal.setProperty(iframe.style, { position: 'absolute', width: '1px', height: '1px', left: '-2px', top: '-2px', visibility: 'hidden' });
    this.gantt.getContainer().appendChild(iframe);
    var win = iframe.contentWindow;
    win.location = "about:blank";
    var doc = win.document;
    var html = "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\">\n";
    html += "<html>";
    html += "<head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=gb2312\">\n<title>SFGantt</title></head>";
    html += "<body style=\"padding:0px;margin:0px;\" bgcolor=\"#FFFFFF\"></body></html>";
    doc.writeln(html);
    doc.close();
    win.gantts = [];
    if (!document.all) { this._win = win; }
    while (doc.body.firstChild) { doc.body.removeChild(doc.body.firstChild); }
    return win;
}
/**
销毁打印内容窗口
@name SFGantt.prototype.deposePrintWindow
@private
@function
*/
SFGanttPrintControl.prototype.deposePrintWindow = function (win) {
    var g;
    while (g = win.gantts.pop()) { g.depose(); }
    SFEvent.deposeNode(win.frameElement);
}
/**
生成一个甘特图的打印内容
@name SFGantt.prototype.addPrintContent
@param {Window} win 打印内容生成的目标窗口
@param {Number[]} size 打印范围的大小
@param {Bool} isHor 是否是横向打印
@param {Number[]} widths 栏目的宽度分布
@param {Date} startTime 开始时间
@param {Number} startHeight 打印视图的起始位置
@private
@function
*/
SFGanttPrintControl.prototype._addPrintContent = function () {
    if (!this.printList) {
        this.printList = [];
        this.printTimeout = setInterval(SFEvent.getCallback(this, function () {
            var argu = this.printList.shift();
            this.addPrintContent.apply(this, argu);
            this.gantt.openDialog('<div style="font-size:15px;margin:10px;">还剩余 ' + this.printList.length + ' 张</div>', { isModal: true, size: [200, 32], title: '正在生成打印内容' });
            if (!this.printList[0]) {
                clearInterval(this.printTimeout);
                delete this.printTimeout;
                delete this.printList;
                argu[0].frameElement.style.visibility = "";
                this.printContentWindow(argu[0]);
                this.gantt.closeDialog();
            }
        }), 32);
    }
    this.printList.push(arguments);
}
/**
生成一个甘特图的打印内容
@name SFGantt.prototype.addPrintContent
@param {Window} win 打印内容生成的目标窗口
@param {Number[]} size 打印范围的大小
@param {Bool} isHor 是否是横向打印
@param {Number[]} widths 栏目的宽度分布
@param {Date} startTime 开始时间
@param {Number} startHeight 打印视图的起始位置
@private
@function
*/
SFGanttPrintControl.prototype.addPrintContent = function (win, size, isHor, widths, startTime, startHeight) {
    var doc = win.document, body = doc.body, gantt = this.gantt, div = doc.createElement("div");
    if (body.firstChild) { div.style.pageBreakBefore = "always"; }
    body.appendChild(div);
    var container = div;
    if (isHor) {
        body.style.textAlign = "right";
        SFGlobal.setElementSize(div, [size[1], size[0]]);
        container = doc.createElement("div");
        SFGlobal.setElementSize(container, size);
        div.appendChild(container);
    }
    else {
        SFGlobal.setElementSize(div, size);
    }
    container.style.border = "solid 1px #000000";
    var gtConfig = new SFConfig(), listWidth = widths[0], fieldWidth;
    SFConfig.addConfig(gtConfig, gantt.config, true);
    gtConfig.setConfig("SFGantt/container", container);	//设置用来显示甘特图的层的ID
    gtConfig.setConfig("SFGantt/readOnly", true);
    gtConfig.setConfig("SFGantt/footHeight", 0);
    /**
    打印甘特图时左侧主体列表之中的各个列名称,用逗号分隔，如果没有指定，则使用普通列表，参照SFGanttField 类的getTaskField方法的参数
    @name SFConfig.configItems.taskPrintFieldNames
    @type String
    */
    if (widths[2]) {//如果需要打印左侧列表
        var elementType = gantt.elementType.toLowerCase(), printFieldNames = gtConfig.getConfig("SFGantt/" + elementType + "PrintFieldNames")
        if (printFieldNames) {
            gtConfig.setConfig("SFGantt/" + gantt.elementType.toLowerCase() + "FieldNames", printFieldNames);
        }
        //计算打印的列宽
        var pFieldList = gantt.getFieldsList ? gantt.getFieldsList() : null,
            pFieldWidth = gantt.getFieldsWidth ? gantt.getFieldsWidth() : null,
            fieldList = SFGanttField.getTaskFields(gtConfig.getConfig("SFGantt/" + gantt.elementType.toLowerCase() + "FieldNames").split(",")),
            fieldWidth = [],
            totalWidth = 3;
        for (var i = 0; i < fieldList.length; i++) {
            var wid = fieldList[i].width;
            if (pFieldList) {
                for (var j = pFieldList.length - 1; j >= 0; j--) {
                    if (pFieldList[j] == fieldList[i]) {
                        wid = pFieldWidth[j];
                        break;
                    }
                }
            }
            fieldWidth.push(wid);
            totalWidth += wid + 1;
        }
        if (widths[3]) { listWidth = Math.min(listWidth, totalWidth); }//如果同时也显示图表，则根据列宽自动缩小列表区宽度
    }
    gtConfig.setConfig("SFGantt/listWidth", listWidth);
    gtConfig.setConfig("SFGantt/disableTooltip", true);
    gtConfig.setConfig("SFGantt/disableChangeEvent", true);
    gtConfig.setConfig("SFGantt/disableHelpLink", true);
    gtConfig.setConfig("SFGantt/disableTimeScrollNotice", true);
    gtConfig.setConfig("SFGantt/disableDragResize", true);
    gtConfig.setConfig("SFGantt/disableCursor", true);
    gtConfig.setConfig("SFGantt/disableContextMenu", true);
    gtConfig.setConfig("SFGantt/disableScroll", true);
    gtConfig.setConfig("SFGantt/disableSelect", true);
    gtConfig.setConfig("SFGantt/scrollTop", startHeight);
    gtConfig.setConfig("SFGantt/forPrint", true);
    var g = new SFGantt(gtConfig, gantt.data);
    g.showMap(startTime, gantt.getZoom());
    if (fieldWidth && g.setFieldsWidth) {
        g.setFieldsWidth(fieldWidth);
    }
    win.gantts.push(g);
    if (isHor) {
        SFGlobal.setRotate(container, 90);
        if (!container.style.filter) {
            container.style.top = (size[0] - size[1]) / 2 + "px";
            container.style.left = -(size[0] - size[1]) / 2 + "px";
        }
    }
}
/**
打印信息浮窗的内容
@name SFGantt.prototype.printContentWindow
@param {Window} win 打印内容生成的目标窗口
@private
@function
*/
SFGanttPrintControl.prototype.printContentWindow = function (win) {
    window.setTimeout(SFEvent.getCallback(this, function () {
        win.focus();
        if (win.document.execCommand && document.all) {
            win.document.execCommand('print', false, null);
        }
        else {
            win.print();
        }
        if (document.all) { this.deposePrintWindow(win); }
    }), 0);
}
/**
@private
在功能控件被移除时执行的方法
*/
SFGanttPrintControl.prototype.remove = function () {
    delete this.a_pageType;
    delete this.t_width;
    delete this.t_height;
    var gantt = this.gantt;
    delete gantt.createPrintWindow;
    delete gantt.addPrintContent;
    SFGanttControl.prototype.remove.apply(this, arguments);
}
window.SFGanttPrintControl = SFGanttPrintControl;
/**
这是一个甘特图功能控件，本控件实现对甘特图的大小进行限制的功能
@private
@extends SFGanttControl
@class
*/
function SFGanttSizeLimitControl() {
}
SFGanttSizeLimitControl.prototype = new window.SFGanttControl();
/**
@private
功能控件的初始化，每个插件的实现都会重写此方法
@param {SFGantt} gantt
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttSizeLimitControl.prototype.initialize = function (gantt) {
    this.listeners = [
        SFEvent.bind(gantt, "beforeresize", this, this.onBeforeResize)
    ]
    var maxSize = gantt.maxSize, minSize = gantt.minSize;
    maxSize = maxSize ? maxSize : [4096, 4096];
    minSize = minSize ? minSize : [200, 200];
    SFGlobal.setProperty(this, { maxSize: maxSize, minSize: minSize, gantt: gantt });
    gantt.setMaxSize = SFEvent.getCallback(this, function (size) { this.maxSize = size; });
    gantt.setMinSize = SFEvent.getCallback(this, function (size) { this.minSize = size; });
    return true;
}
/**
@private
在甘特图的大小变化之前进行检查
@param {Json} returnObj 事件控制对象
@param {Number[]} s 甘特图打算变化的目标大小
@returns {Bool} 如果没有超出限制，返回true,否则返回false
*/
SFGanttSizeLimitControl.prototype.onBeforeResize = function (returnObj, s) {
    var size = this.maxSize;
    if (size && (size[0] < s[0] || size[1] < s[1])) { returnObj.returnValue = false; }
    var size = this.minSize;
    if (size && (size[0] > s[0] || size[1] > s[1])) { returnObj.returnValue = false; }
}
/**
@private
在功能控件被移除时执行的方法
*/
SFGanttSizeLimitControl.prototype.remove = function () {
    var gantt = this.gantt;
    delete gantt.setMaxSize
    delete gantt.setMinSize
    SFGanttControl.prototype.remove.apply(this, arguments);
}
window.SFGanttSizeLimitControl = SFGanttSizeLimitControl;
/**
这是一个甘特图功能控件，本控件实现剪切板的功能
@private
@extends SFGanttControl
@class
*/
function SFGanttClipboardControl() {
}
SFGanttClipboardControl.prototype = new window.SFGanttControl();
/**
@private
功能控件的初始化，每个插件的实现都会重写此方法
@param {SFGantt} gantt
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttClipboardControl.prototype.initialize = function (gantt) {
    if (gantt.disableClipboard || !window.clipboardData) { return false; }
    SFConfig.applyProperty(this, gantt.config.getConfigObj("SFGanttClipboardControl"));
    SFGlobal.setProperty(this, { gantt: gantt });
    SFGlobal.setProperty(gantt, {
        copyTask: SFEvent.getCallback(this, this.copyTask),
        pasteTask: SFEvent.getCallback(this, this.pasteTask),
        canPasteTask: SFEvent.getCallback(this, this.canPasteTask)
    });
    return true;
}
/**
获取用来序列化XML的对象
@private
*/
SFGanttClipboardControl.prototype.getXml = function () {
    if (!this.xml) {
        var adapter = this.gantt.getData().adapter;
        if (false && (adapter instanceof SFDataXmlBase)) {
            this.xml = adapter;
        }
        else {
            this.xml = new SFDataXml(SFAjax.createDocument());
            this.xml.initialize();
        }
    }
    return this.xml;
}
/**
读取剪切板XMl文本数据
@returns {String}
*/
SFGanttClipboardControl.prototype.getData = function () {
    var data = window.clipboardData.getData("Text");
    if (!data) { return null; }
    try {
        var node = SFAjax.createDocument(data);
        if (node.documentElement) { return node.documentElement; }
    } catch (e) { }
    return null
}
/**
复制当前任务到剪切板
*/
SFGanttClipboardControl.prototype.copyTask = function () {
    var gantt = this.gantt;
    if (!gantt.getFocusElement) { return false; }
    var task = gantt.getFocusElement();
    if (!task) { return false; }
    //复制任务
    var cTask = new SFDataTask(),
        xml = this.getXml(),
        ignoreProperty = (this.taskClipboardIgnoreProperty || "").split(",");
    for (var key in task) { if (task.hasOwnProperty(key)) { cTask[key] = task[key] }; }
    cTask.node = cTask.node ? cTask.node.cloneNode(false) : xml.doc.createElement("Task");
    //序列化任务
    for (var proName in xml.taskWriter) {
        if (cTask[proName] !== undefined && !SFGlobal.findInArray(ignoreProperty, proName)) {
            xml.updateItem(xml.taskWriter, cTask, proName, cTask[proName]);
        }
    }
    window.clipboardData.setData("Text", SFAjax.getXmlString(cTask.node));
    return true;
}
/**
粘贴剪切板任务到当前任务
*/
SFGanttClipboardControl.prototype.pasteTask = function () {
    if (!this.canPasteTask()) { return false; }
    var gantt = this.gantt,
        node = this.getData(),
        xml = this.getXml(),
        cTask = xml.readTask(node),		//将剪切板临时任务
        task = gantt.getFocusElement(),
        ignoreProperty = (this.taskClipboardIgnoreProperty || "").split(",");
    //将剪切板临时任务属性设置到新任务
    for (var proName in xml.taskWriter) {
        if (cTask[proName] !== undefined && !SFGlobal.findInArray(ignoreProperty, proName)) {
            task.setProperty(proName, cTask[proName]);
        }
    }
}
/**
判断当前是否能进行任务的粘贴
@returns {Bool} 如果能粘贴，则返回true
*/
SFGanttClipboardControl.prototype.canPasteTask = function () {
    var node = this.getData(), gantt = this.gantt;
    if (!gantt.getFocusElement) { return false; }
    if (!gantt.getFocusElement()) { return false; }
    if (!node || node.nodeName != "Task") { return false; }
    return true
}
/**
@private
在功能控件被移除时执行的方法
*/
SFGanttClipboardControl.prototype.remove = function () {
    var gantt = this.gantt;
    delete gantt.copyTask
    delete gantt.pasteTask
    delete gantt.canPasteTask
    SFGanttControl.prototype.remove.apply(this, arguments);
}
window.SFGanttClipboardControl = SFGanttClipboardControl;
/**
这是一个甘特图功能控件，本控件用来实现甘特图的时间相关功能支持
@private
@extends SFGanttControl
@class
*/
function SFGanttTimeControl() {
}
SFGanttTimeControl.prototype = new window.SFGanttControl();
/**
@private
功能控件的初始化，每个插件的实现都会重写此方法
@param {SFGantt} gantt
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttTimeControl.prototype.initialize = function (gantt, container) {
    this.gantt = gantt;
    SFGlobal.setProperty(gantt, {
        getStartTime: SFEvent.getCallback(this, this.getStartTime),
        getScale: SFEvent.getCallback(this, this.getScale),
        setStartTime: SFEvent.getCallback(this, this.setStartTime),
        setScale: SFEvent.getCallback(this, this.setScale),
        move: SFEvent.getCallback(this, this.move),
        show: SFEvent.getCallback(this, this.show)
    });
    gantt.moveTo = gantt.setStartTime
    this.listeners = [
        SFEvent.bind(gantt, "initialize", this, this.onGanttInit)
    ];
    return true;
}
/**
@private
在甘特图初始化时初始化时间相关属性
*/
SFGanttTimeControl.prototype.onGanttInit = function () {
    var gantt = this.gantt;
    this.startTime = gantt.startTime;
    if (!this.startTime) {
        var task = gantt.data.getRootTask();
        if (task) { this.startTime = task.Start; }
        if (!this.startTime) { this.startTime = new Date(); }
    }
    if (!this.scale) { this.scale = 576 * 3600000 / 12; }
}
/**
将甘特图的图表内容向右移动指定的像素值,这个方法必须在地图初始化之后才能调用
@name SFGantt.prototype.move
@function
@param {Number} length 移动的像素距离，正数代表向右移动，负数代表向左移动
*/
SFGanttTimeControl.prototype.move = function (length) {
    this.setStartTime(new Date(length * this.scale + this.startTime.valueOf()));
}
/**
获取甘特图图表的显示开始时间(也就是图标最左侧对应时间)
@name SFGantt.prototype.getStartTime
@function
@returns {Date}
*/
SFGanttTimeControl.prototype.getStartTime = function () {
    return this.startTime;
}
/**
设置甘特图图表的显示开始时间(也就是图标最左侧对应时间)
@name SFGantt.prototype.setStartTime
@function
@param {Date} time
@returns {Bool} 如果设置成功，返回true,否则返回false
*/
SFGanttTimeControl.prototype.setStartTime = function (time) {
    var gantt = this.gantt, startTime = this.startTime;
    if (startTime && (startTime == time || startTime.valueOf() == time.valueOf())) { return; }
    var returnObj = { returnValue: true }
    /** 
        @event
        @name SFGantt#beforestarttimechange
        @description 在甘特图图表视图起始时间变化前触发（即移动）
        @param {Json} returnObj 如果设置returnObj.returnValue=false,则代表拒绝移动，甘特图就不会进行移动.
        @param {Date} time 欲设置的起始时间
     */
    SFEvent.trigger(gantt, "beforestarttimechange", [returnObj, time]);
    if (!returnObj.returnValue) { return false; }
    this.startTime = time;
    /** 
        @event
        @name SFGantt#afterstarttimechange
        @description 在甘特图图表视图起始时间变化后触发（即移动）
        @param {Date} time 新的视图起始时间
     */
    /** 
        @event
        @name SFGantt#move
        @description afterstarttimechange的别名，用法相同
     */
    SFEvent.trigger(gantt, "afterstarttimechange", [time]);
    SFEvent.trigger(gantt, "move", [time]);
    return true;
}
/**
返回甘特图的图表显示缩放比例
@name SFGantt.prototype.getScale
@function
@returns {Number} 返回缩放比例，实际上是一个像素对应时间的毫秒数
*/
SFGanttTimeControl.prototype.getScale = function () {
    return this.scale;
}
/**
设置甘特图的图表显示缩放比例
@name SFGantt.prototype.setScale
@function
@param {Number} scale 一个像素对应时间的毫秒数
*/
SFGanttTimeControl.prototype.setScale = function (scale) {
    if (this.scale == scale) { return; }
    var returnObj = { returnValue: true }
    /** 
        @event
        @name SFGantt#beforescalechange
        @description 在甘特图图表的缩放比例变化前触发
        @param {Json} returnObj 如果设置returnObj.returnValue=false,则代表拒绝更改，甘特图就不会进行缩放.
        @param {Number} scale 欲设置的缩放比例，即一个像素相当于多少毫秒
     */
    SFEvent.trigger(this.gantt, "beforescalechange", [returnObj, scale]);
    if (!returnObj.returnValue) { return false; }
    this.scale = scale;
    /** 
        @event
        @name SFGantt#afterscalechange
        @description 在甘特图图表的缩放比例变化后触发
        @param {Number} scale 当前的甘特图图表缩放比例，即一个像素相当于多少毫秒
     */
    SFEvent.trigger(this.gantt, "afterscalechange", [scale]);
    return true;
}
/**
甘特图的显示函数，调用这个函数开始显示甘特图
@name SFGantt.prototype.show
@private
@function
@param {Date} [time] 如果不设置，则为自动
@param {Number} [scale] 如果不设置，则为自动
*/
SFGanttTimeControl.prototype.show = function (startTime, scale) {
    var gantt = this.gantt;
    if (startTime) { gantt.setStartTime(startTime); }
    if (scale) { gantt.setScale(scale); }
}
/**
@private
在功能控件被移除时执行的方法
*/
SFGanttTimeControl.prototype.remove = function () {
    var gantt = this.gantt;
    delete gantt.moveTo
    delete gantt.getStartTime
    delete gantt.getScale
    delete gantt.setStartTime
    delete gantt.setScale
    delete gantt.move
    delete gantt.show
    SFGanttControl.prototype.remove.apply(this, arguments);
}
window.SFGanttTimeControl = SFGanttTimeControl;
/**
这是一个甘特图功能控件，本控件实现图表的绘制层
@private
@extends SFGanttControl
@class
*/
function SFGanttMapPanel() {
}
SFGanttMapPanel.prototype = new window.SFGanttControl();
/**
@private
功能控件的初始化，每个插件的实现都会重写此方法
@param {SFGantt} gantt
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttMapPanel.prototype.initialize = function (gantt) {
    if (!gantt.getLayout || !gantt.getStartTime || !gantt.getLayout("mapBody")) { return false; }
    var container = this.div = gantt.container.ownerDocument.createElement("div");
    SFGlobal.setProperty(container.style, { position: 'relative', left: '0px', top: '0px' });
    gantt.getLayout("mapBody").appendChild(container);
    if (!container) { return false; }
    this.gantt = gantt;
    gantt.getMapPanel = SFEvent.getCallback(this, this.getMapPanel)
    gantt.getMapPanelPosition = SFEvent.getCallback(this, this.getMapPanelPosition);
    gantt.getTimeByMapPanelPosition = SFEvent.getCallback(this, this.getTimeByMapPanelPosition);
    this.listeners = [
        SFEvent.bind(gantt, "initialize", this, this.onGanttInit),
        SFEvent.bind(gantt, "afterstarttimechange", this, this.onTimeChange),
        SFEvent.bind(gantt, "afterscalechange", this, this.onTimeChange)
    ];
    if (!gantt.disableMapDrag) {
        this.listeners = this.listeners.concat(SFDragObject.setup(container, SFEvent.getCallback(this, this.onMove), { container: gantt.getContainer() }));
    }
    return true;
}
/**
@private
在甘特图初始化时初始化绘制基准时间
*/
SFGanttMapPanel.prototype.onGanttInit = function () {
    this.drawStart = this.gantt.getStartTime();
    this.onTimeChange();
}
/**
@private
在甘特图起始时间变化移动图表层
@param {Date} time 当前甘特图的起始时间
*/
SFGanttMapPanel.prototype.onTimeChange = function (time) {
    this.div.style.left = -Math.round(this.gantt.getStartTime() - this.drawStart) / this.gantt.getScale() + "px";
}
/**
获得指定的时间点在甘特图图表层上的相对位置
@name SFGantt.prototype.getMapPanelPosition
@private
@function
@param {Date} time 当前甘特图的起始时间
@returns {Number} 以像素为单位的横向相对位置
*/
SFGanttMapPanel.prototype.getMapPanelPosition = function (time) {
    if (!time) { return 0; }
    return Math.round(time - this.drawStart) / this.gantt.getScale();
}
/**
根据甘特图图表层上的相对位置获取对应的时间
@name SFGantt.prototype.getTimeByMapPanelPosition
@private
@function
@param {Number} position 甘特图图表层上的横向相对位置
@returns {Date} 时间轴上对应的时间
*/
SFGanttMapPanel.prototype.getTimeByMapPanelPosition = function (position) {
    position = position ? position : 0;
    return new Date(position * this.gantt.getScale() + this.drawStart.valueOf());
}
/**
获得甘特图的图表层，图表上面所有根据时间绘制的内容都是在图表层上定位的
@name SFGantt.prototype.getMapPanel
@private
@function
@returns {HtmlElement}
*/
SFGanttMapPanel.prototype.getMapPanel = function () {
    return this.div;
}
/**
@private
在图表层被拖拽的过程之中持续触发的函数
@param {Number[]} sp 拖拽起始点位置
@param {Number[]} lp 拖拽当前点位置
@param {String} type 当前触发的类型
*/
SFGanttMapPanel.prototype.onMove = function (sp, lp, type) {
    var gantt = this.gantt, scrollDiv = gantt.getLayout("bodyScroll");
    if (type == "start") {
        this.startPosition = scrollDiv.scrollTop;
        this.startTime = gantt.getStartTime();
    }
    var scrollTop = scrollDiv.scrollTop = this.startPosition - lp[1] + sp[1];
    /** 
        @event
        @name SFGantt#scroll
        @private
        @description 在甘特图纵向滚动时触发
        @param {Number} scrollTop 甘特图当前的滚动位置.
     */
    SFEvent.trigger(gantt, "scroll", [scrollTop]);
    gantt.setStartTime(new Date(this.startTime.valueOf() + (sp[0] - lp[0]) * gantt.getScale()));
}
/**
@private
在功能控件被移除时执行的方法
*/
SFGanttMapPanel.prototype.remove = function () {
    var gantt = this.gantt;
    delete gantt.getMapPanel;
    delete gantt.getMapPanelPosition;
    delete gantt.getTimeByMapPanelPosition;
    SFGanttControl.prototype.remove.apply(this, arguments);
}
window.SFGanttMapPanel = SFGanttMapPanel;
/**
这是一个甘特图功能控件，本控件用来实现甘特图的时间层，也就是在图标滚动条拖动时跟随时间变化的层
@private
@extends SFGanttControl
@class
*/
function SFGanttTimePanel() {
}
SFGanttTimePanel.prototype = new window.SFGanttControl();
/**
@private
功能控件的初始化，每个插件的实现都会重写此方法
@param {SFGantt} gantt
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttTimePanel.prototype.initialize = function (gantt) {
    if (!gantt.getLayout || !gantt.getStartTime || !gantt.getLayout("mapBody")) { return false; }
    var container = this.div = gantt.container.ownerDocument.createElement("div");
    SFGlobal.setProperty(container.style, { position: 'absolute', left: '0px', top: '0px', width: '100%', height: '100%', zIndex: 10 });
    gantt.getContainer().appendChild(container);
    if (!container) { return false; }
    this.gantt = gantt;
    gantt.getTimePanel = SFEvent.getCallback(this, this.getTimePanel)
    gantt.getTimePanelPosition = SFEvent.getCallback(this, this.getTimePanelPosition);
    this.listeners = [
        SFEvent.bind(gantt, "initialize", this, this.onGanttInit),
        SFEvent.bind(gantt, "layoutchange", this, this.onTimeChange),
        SFEvent.bind(gantt, "afterstarttimechange", this, this.onTimeChange),
        SFEvent.bind(gantt, "afterscalechange", this, this.onTimeChange)
    ];
    return true;
}
/**
@private
在甘特图初始化时初始化时间层的显示
*/
SFGanttTimePanel.prototype.onGanttInit = function () {
    this.drawStart = this.gantt.getStartTime();
    this.onTimeChange();
}
/**
@private
在甘特图图表显示起始时间变化时移动时间层
@param {Date} time 甘特图的图表显示起始时间
*/
SFGanttTimePanel.prototype.onTimeChange = function (time) {
    if (!this.drawStart) { return; }
    var gantt = this.gantt;
    this.div.style.left = -Math.round((gantt.getStartTime() - this.drawStart) / gantt.getScale() - SFEvent.getPageOffset(gantt.getLayout("mapBody"), gantt.getContainer())[0]) + "px";
}
/**
@private
获得指定的时间相对于时间层的像素位置
@name SFGantt.prototype.getTimePanelPosition
@private
@function
@param {Date} time
@returns {Number} 像素值
*/
SFGanttTimePanel.prototype.getTimePanelPosition = function (time) {
    if (!time) { return 0; }
    return Math.round(time - this.drawStart) / this.gantt.getScale();
}
/**
@private
获得甘特图的时间层
@name SFGantt.prototype.getTimePanel
@private
@function
@returns {HtmlElement}
*/
SFGanttTimePanel.prototype.getTimePanel = function () {
    return this.div;
}
/**
@private
在功能控件被移除时执行的方法
*/
SFGanttTimePanel.prototype.remove = function () {
    var gantt = this.gantt;
    delete gantt.getTimePanel
    delete gantt.getTimePanelPosition
    SFGanttControl.prototype.remove.apply(this, arguments);
}
window.SFGanttTimePanel = SFGanttTimePanel;
/**
这是一个甘特图功能控件，本控件实现甘特图的缩放级别功能
@private
@extends SFGanttControl
@class
*/
function SFGanttZoomControl() {
}
SFGanttZoomControl.prototype = new window.SFGanttControl();
/**
功能控件的初始化，每个插件的实现都会重写此方法
@private
@param {SFGantt} gantt
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttZoomControl.prototype.initialize = function (gantt, container) {
    this.gantt = gantt;
    this.levels = [
        3 * 60000 / 6,	//每3分钟
        30 * 60000 / 6,	//每30分钟
        3600000 / 6,	//每1小时
        4 * 3600000 / 6,	//每4小时
        12 * 3600000 / 6,//每12小时
        24 * 3600000 / 6,	//每1天
        96 * 3600000 / 6,	//每4天
        192 * 3600000 / 6,	//每8天
        576 * 3600000 / 6,	//每24天
        1728 * 3600000 / 6	//每72天
    ];
    SFGlobal.setProperty(gantt, {
        setZoomLevels: SFEvent.getCallback(this, this.setZoomLevels),
        getZoomScale: SFEvent.getCallback(this, this.getZoomScale),
        zoomIn: SFEvent.getCallback(this, this.zoomIn),
        zoomOut: SFEvent.getCallback(this, this.zoomOut),
        zoomTo: SFEvent.getCallback(this, this.zoomTo),
        getZoom: SFEvent.getCallback(this, this.getZoom),
        show: SFEvent.getCallback(this, this.show)
    });
    gantt.showMap = gantt.show;
    this.listeners = [
        SFEvent.bind(gantt, "initialize", this, this.onScaleChange),
        SFEvent.bind(gantt, "afterscalechange", this, this.onScaleChange)
    ];
    return true;
}
/**
根据缩放比例返回最近的缩放级别的比例
@name SFGantt.prototype.getZoomScale
@private
@function
@param {Number} scale
@param {Number} [dir=0] 如果为-1代表只向上查找，为1代表只向下查找
@returns {Number} 返回缩放比例
*/
SFGanttZoomControl.prototype.getZoomScale = function (scale, dir) {
    return this.levels[this.getZoomIndex(scale, dir)];
}
/**
设置甘特图的缩放等级列表
@name SFGantt.prototype.setZoomLevels
@private
@function
@param {Number[]} levels
*/
SFGanttZoomControl.prototype.setZoomLevels = function (levels) {
    this.levels = levels;
}
/**
根据缩放比例返回最近的缩放级别
@private
@param {Number} scale
@param {Number} [dir=0] 如果为-1代表只向上查找，为1代表只向下查找
@returns {Number} 返回缩放级别
*/
SFGanttZoomControl.prototype.getZoomIndex = function (scale, dir) {
    dir = dir ? dir : 0;
    var levels = this.levels, len = levels.length;
    for (var i = 0; i < len; i++) {
        var level = levels[i];
        if (scale <= level)//如果已经大于此级别的倍数，则要么是这个级别，要么是上一个级别
        {
            if (i > 0 && ((dir == 1) || (dir == 0 && scale / (levels[i - 1]) < level / scale))) {
                return i - 1;
            }
            return i;
        }
    }
    return len - 1;
}
/**
在甘特图的缩放比例变化时自动更新甘特图的缩放级别
@private
*/
SFGanttZoomControl.prototype.onScaleChange = function () {
    this.zoomIndex = this.getZoomIndex(this.gantt.getScale());
}
/**
放大图表
@name SFGantt.prototype.zoomIn
@private
@function
*/
SFGanttZoomControl.prototype.zoomIn = function () { this.zoomTo(this.zoomIndex - 1); }//放大
/**
缩小图表
@name SFGantt.prototype.zoomOut
@private
@function
*/
SFGanttZoomControl.prototype.zoomOut = function () { this.zoomTo(this.zoomIndex + 1); }//缩小
/**
将图表的时间轴缩放等级变化到指定的级别
@name SFGantt.prototype.zoomTo
@param {Number} zoomIndex 甘特图显示的缩放等级，请参考{@link SFGantt#show}
@private
@function
*/
SFGanttZoomControl.prototype.zoomTo = function (zoomIndex) {
    if (!this.levels[zoomIndex]) { return; }
    var oZoom = this.zoomIndex;
    this.zoomIndex = zoomIndex;
    this.gantt.setScale(this.levels[zoomIndex]);
    /** 
        @event
        @name SFGantt#zoom
        @description 在甘特图缩放级别变化后触发
        @param {Number} zoomIndex 新缩放级别.
        @param {Number} oZoom 原缩放级别.
     */
    SFEvent.trigger(this, "zoom", [zoomIndex, oZoom]);
}
/**
返回当前甘特图的缩放级别
@name SFGantt.prototype.getZoom
@returns {Number} 甘特图显示的缩放等级，请参考{@link SFGantt#show}
@function
*/
SFGanttZoomControl.prototype.getZoom = function () {

    return this.zoomIndex;
}
/**
甘特图的显示函数，调用这个函数开始显示甘特图
@name SFGantt.prototype.show
@function
@param {Date} [time] 甘特图显示的起始时间,也就是甘特图打开的时候默认显示的时间轴最左侧的时间点。如果不设置，则自动为根任务的起始时间
@param {Number} [zoomIndex=8] 甘特图显示的缩放等级，默认甘特图支持从0-8的9个等级
    <table cellspacing="1" border="1" borderColor="Gray">
    <tr><td>编号</td><td>日历上层单位</td><td>日历下层单位</td></tr>
    <tr><td>0</td><td>1小时</td><td>15分钟</td></tr>
    <tr><td>1</td><td>1天</td><td>2小时</td></tr>
    <tr><td>2</td><td>1天</td><td>6小时</td></tr>
    <tr><td>3</td><td>1周</td><td>1天</td></tr>
    <tr><td>4</td><td>1月</td><td>3天</td></tr>
    <tr><td>5</td><td>1月</td><td>1周</td></tr>
    <tr><td>6</td><td>1季度</td><td>1月</td></tr>
    <tr><td>7</td><td>1年</td><td>1月</td></tr>
    <tr><td>8</td><td>1年</td><td>1季度</td></tr>
    </table>
*/
SFGanttZoomControl.prototype.show = function (startTime, zoomIndex) {
    var scale = this.levels[zoomIndex];
    scale = scale ? scale : zoomIndex;
    var gantt = this.gantt;
    if (startTime) { gantt.setStartTime(startTime); }
    if (scale) { gantt.setScale(scale); }
}
/**
在功能控件被移除时执行的方法
@private
*/
SFGanttZoomControl.prototype.remove = function () {
    var gantt = this.gantt;
    delete gantt.getZoomScale;
    delete gantt.showMap
    delete gantt.zoomIn
    delete gantt.zoomOut
    delete gantt.zoomTo
    delete gantt.getZoom;
    delete gantt.show
    SFGanttControl.prototype.remove.apply(this, arguments);
}
window.SFGanttZoomControl = SFGanttZoomControl;
/**
这是一个甘特图功能控件，此控件用来实现甘特图的自适应大小的功能，如果甘特图的大小不是用百分比控制的，则自动拒绝运行
@private
@extends SFGanttControl
@class
*/
function SFGanttAutoResizeControl() {
}
SFGanttAutoResizeControl.prototype = new window.SFGanttControl();
/**
@private
功能控件的初始化，每个插件的实现都会重写此方法
@param {SFGantt} gantt
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttAutoResizeControl.prototype.initialize = function (gantt) {
    var style = gantt.getContainer().style;
    if (style.width && style.width.indexOf("%") < 0 && style.height && style.height.indexOf("%") < 0) { return false }
    this.gantt = gantt;
    this.listeners = [
        //SFEvent.bind(gantt.getContainer(), "resize", this, this.onResize)
        //  infocenter hq
        //SFEvent.bind(window, "resize", this, this.onResize),
        //SFEvent.bind(window, "move", this, this.onResize),
        //SFEvent.bind(window, "load", this, this.onResize)
    ]
    return true;
}
/**
@private
在甘特图大小变化时执行的响应
*/
SFGanttAutoResizeControl.prototype.onResize = function () {

    if (!this.timeout) { this.timeout = window.setInterval(SFEvent.getCallback(this, this.onTime), 256); }
    this.changed = true;
    this.idleTimes = 0;
}
/**
@private
在甘特图大小变化过程之中持续执行的过程
*/
SFGanttAutoResizeControl.prototype.onTime = function () {
    if (!this.changed) {
        this.idleTimes++;
        if (this.idleTimes > 4) {
            window.clearInterval(this.timeout);
            delete this.timeout
        }
        return;
    }
    this.changed = false;
    this.resize();
}
/**
@private
重新设置甘特图的大小
*/
SFGanttAutoResizeControl.prototype.resize = function () {
    var gantt = this.gantt;
    gantt.setViewSize(SFGlobal.getElementSize(gantt.getContainer()));
    this.timeout = null;
}
window.SFGanttAutoResizeControl = SFGanttAutoResizeControl;
/**
这是一个甘特图功能控件，本控件实际上是一个抽象类，通过继承才能使用，用来在甘特图上显示横向滚动条
@private
@extends SFGanttControl
@class
*/
function SFGanttScrollerControl() {
}
SFGanttScrollerControl.prototype = new window.SFGanttControl();
/**
@private
功能控件的初始化，每个插件的实现都会重写此方法
@param {SFGantt} gantt
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttScrollerControl.prototype.initialize = function (gantt) {
    if (!this.layoutName || !gantt.getLayout) { return false; }
    var container = gantt.getLayout(this.layoutName);
    if (!container) { return false; }
    SFEvent.setUnSelectable(container);
    var doc = container.ownerDocument, div = doc.createElement("div");
    div._cmd = 1;
    SFGlobal.setProperty(div.style, { position: 'absolute' });

    var leftImg = gantt.createImage("scroll_left");
    SFGlobal.setProperty(leftImg.style, { position: 'absolute', left: '0px' });
    leftImg._cmd = 1
    div.appendChild(leftImg);

    var rightImg = gantt.createImage("scroll_right");
    SFGlobal.setProperty(rightImg.style, { position: 'absolute', right: '0px' });
    rightImg._cmd = 1
    div.appendChild(rightImg);

    var barDiv = doc.createElement("div");
    barDiv._cmd = 1
    SFGlobal.setProperty(barDiv.style, { position: 'absolute' });

    var barLeftImg = gantt.createImage("scroll_barleft");
    SFGlobal.setProperty(barLeftImg.style, { position: 'absolute', left: '0px' });
    barDiv.appendChild(barLeftImg);

    var barRightImg = gantt.createImage("scroll_barright");
    SFGlobal.setProperty(barRightImg.style, { position: 'absolute', right: '0px' });
    barDiv.appendChild(barRightImg);

    var barCenterDiv = document.createElement("div");
    gantt.setBackgroundImage(barCenterDiv, "scroll_barbg");
    SFGlobal.setProperty(barCenterDiv.style, { position: 'absolute', left: '3px', textAlign: 'center' });

    var barCenterImg = gantt.createImage("scroll_barcenter");
    barCenterDiv.appendChild(barCenterImg);

    barDiv.appendChild(barCenterDiv);
    div.appendChild(barDiv);
    container.appendChild(div);
    SFGlobal.setProperty(this, {
        gantt: gantt,
        container: container,
        div: div,
        leftImg: leftImg,
        rightImg: rightImg,
        barDiv: barDiv,
        barLeftImg: barLeftImg,
        barRightImg: barRightImg,
        barCenterDiv: barCenterDiv,
        barCenterImg: barCenterImg
    });
    this.listeners = [
        SFEvent.bind(div, "mousedown", this, this.onMouseDown),
        SFEvent.bind(gantt, "layoutchange", this, this.onResize)
    ];
    this.scrollLeft = 0;
    return true;
}
/**
@private
在甘特图大小变化时根据新的大小调整滚动条的显示
*/
SFGanttScrollerControl.prototype.onResize = function () {
    if (!this.container) { return; }
    var container = this.container, width = container.offsetWidth, height = container.offsetHeight, size = this.size;

    //inforcenter hq 
    if (width <= 0) {
        this.div.style.display = 'none';
        return;
    }
    else {
        this.div.style.display = '';
    }

    if (size && size[1] == height && size[0] == width) { return; }

    SFGlobal.setElementSize(this.div, [width, height]);
    this.div.style.display = width - height * 2 <= 0 ? "none" : "";
    this.size = [width, height];
    if (width - height * 2 <= 0) { return; }
    SFGlobal.setElementSize(this.barDiv, [width - height * 2, height]);
    SFGlobal.setElementSize(this.barCenterDiv, [Math.max(0, width - height * 2 - 6), height]);
    if (!size || size[1] != height) {
        SFGlobal.setElementSize(this.leftImg, [height, height]);
        SFGlobal.setElementSize(this.rightImg, [height, height]);
        SFGlobal.setElementSize(this.barLeftImg, [3, height]);
        SFGlobal.setElementSize(this.barRightImg, [3, height]);
        SFGlobal.setElementSize(this.barCenterImg, [8, height]);
    }
    this.init(this.offsetWidth, this.scrollWidth, this.scrollLeft);
}
/**
@private
初始化滚动条的显示
@param {Number} offsetWidth 滚动条的显示宽度
@param {Number} scrollWidth 滚动条所对应的内容宽度
@param {Number} scrollLeft 滚动条的滚动位置
*/
SFGanttScrollerControl.prototype.init = function (offsetWidth, scrollWidth, scrollLeft) {
    if (!offsetWidth || !scrollWidth) { return; }
    var width = this.size[0] - this.size[1] * 2;//滑动区域的大小
    this.offsetWidth = offsetWidth;
    this.scrollWidth = scrollWidth;
    this.barDiv.style.display = offsetWidth < scrollWidth ? '' : 'none'
    var bWidth = Math.max(scrollWidth ? parseInt(width * offsetWidth / scrollWidth) : 0, 14);
    SFGlobal.setProperty(this.barDiv.style, { width: bWidth + "px" });
    SFGlobal.setProperty(this.barCenterDiv.style, { width: bWidth - 6 + "px" });
    this.width = width - bWidth;//可滑动范围的大小
    this.scrollTo(scrollLeft ? scrollLeft : this.scrollLeft, false);
}
/**
@private
将滚动条滚动到指定的位置
@param {Number}  滚动条的滚动位置
@param {Bool} trigger 是否触发{@link SFGanttScrollerControl#event:scroll}事件,如果设置为false,则不会触发事件
*/
SFGanttScrollerControl.prototype.scrollTo = function (scrollLeft, trigger) {
    scrollLeft = this.scrollLeft = Math.max(Math.min(scrollLeft, this.scrollWidth - this.offsetWidth), 0);
    SFGlobal.setProperty(this.barDiv.style, { left: (this.size[1] + scrollLeft / (this.scrollWidth - this.offsetWidth) * this.width) + "px" });
    if (trigger != false) {
        /** 
            @event
            @name SFGanttScrollerControl#scroll
            @private
            @description 在滚动过程之中持续触发
            @param {Number} scrollLeft 当前的滚动位置.
         */
        SFEvent.trigger(this, "scroll", [scrollLeft]);
    }
}
/**
@private
鼠标在滚动条上的任何位置按下时执行的操作
@param {Event} e 浏览器的鼠标事件
*/
SFGanttScrollerControl.prototype.onMouseDown = function (e) {
    SFEvent.cancelBubble(e);
    if (this.pressObj || this.spaceObj) { this.onMouseUp(e); }
    var gantt = this.gantt, div = this.div, doc = div.ownerDocument, target = e.target;
    if (div.setCapture) { div.setCapture(); }
    while (target && !target._cmd) { target = target.parentNode; }
    switch (target) {
        case this.leftImg:
        case this.rightImg:
            var flag = (this.rightImg == target);
            gantt.setImageSrc(target, "scroll_" + (flag ? 'right' : 'left') + "1");
            var pressObj = this.pressObj = {
                dir: (flag ? 1 : -1),
                timeout: window.setInterval(SFEvent.getCallback(this, this.onButtonPress), 32),
                ul: SFEvent.bind(doc, "mouseup", this, this.onMouseUp)
            };
            SFEvent.trigger(this, "scrollstart", [this.scrollLeft]);
            this.onButtonPress();
            break;
        case this.div:
            var point = SFEvent.getEventPosition(e, this.div);
            var toLeft = point[0] / (this.size[0] - this.size[1] * 2) * (this.scrollWidth - this.offsetWidth);
            var spaceObj = this.spaceObj = {
                toLeft: toLeft,
                timeout: window.setInterval(SFEvent.getCallback(this, this.onSpacePress), 128),
                ul: SFEvent.bind(doc, "mouseup", this, this.onMouseUp)
            };
            SFEvent.trigger(this, "scrollstart", [this.scrollLeft]);
            this.onSpacePress();
            break;
        default:
            new SFDragObject(div, SFEvent.getCallback(this, this.onBarMove), { interval: 32 }).onMouseDown(e)
            break;
    }
}
/**
@private
鼠标在滚动条上释放时执行的操作
@param {Event} e 浏览器的鼠标事件
*/
SFGanttScrollerControl.prototype.onMouseUp = function (e) {
    SFEvent.cancelBubble(e);
    if (e && e.target && e.target.ownerDocument.releaseCapture) { e.target.ownerDocument.releaseCapture(); }
    var gantt = this.gantt;
    if (this.pressObj) {
        var pressObj = this.pressObj;
        SFEvent.trigger(this, "scrollend", [this.scrollLeft]);
        window.clearInterval(pressObj.timeout);
        SFEvent.removeListener(pressObj.ul);
        gantt.setImageSrc(this.leftImg, "scroll_left");
        gantt.setImageSrc(this.rightImg, "scroll_right");
        this.pressObj = null;
    }
    if (this.spaceObj) {
        var spaceObj = this.spaceObj;
        SFEvent.trigger(this, "scrollend", [this.scrollLeft]);
        this.scrollTo(spaceObj.toLeft);
        window.clearInterval(spaceObj.timeout);
        SFEvent.removeListener(spaceObj.ul);
        this.spaceObj = null;
    }
}
/**
@private
鼠标在左、右箭头上点击时执行的操作，滚动条向响应的方向移动一段距离
*/
SFGanttScrollerControl.prototype.onButtonPress = function () {
    if (!this.pressObj) { return; }
    this.scrollTo(this.scrollLeft + this.pressObj.dir * 8);
}
/**
@private
鼠标在滚动条空白处点击时执行的操作，滚动条移动到点击的地点
*/
SFGanttScrollerControl.prototype.onSpacePress = function () {
    if (!this.spaceObj) { return; }
    var spaceObj = this.spaceObj, toLeft = spaceObj.toLeft, point = this.scrollLeft;
    var offset = spaceObj.toLeft - this.scrollLeft;
    if (Math.abs(offset) < 64) { this.onMouseUp(); return; }
    this.scrollTo(this.scrollLeft + (offset > 0 ? 64 : -64));
}
/**
@private
在拖拽滚动条中间滑块过程之中持续触发的函数
@param {Number[]} sp 拖拽起始点位置
@param {Number[]} lp 拖拽当前点位置
@param {String} type 当前触发的类型
*/
SFGanttScrollerControl.prototype.onBarMove = function (sp, lp, type) {
    var gantt = this.gantt;
    if (type == "start") {
        gantt.setImageSrc(this.barLeftImg, "scroll_barleft1");
        gantt.setImageSrc(this.barCenterImg, "scroll_barcenter1");
        gantt.setImageSrc(this.barRightImg, "scroll_barright1");
        gantt.setBackgroundImage(this.barCenterDiv, "scroll_barbg1");
        /** 
            @event
            @name SFGanttScrollerControl#scrollstart
            @private
            @description 在一个滚动过程开始时触发
            @param {Number} scrollLeft 当前的滚动位置.
         */
        SFEvent.trigger(this, "scrollstart", [this.startDragLeft = this.scrollLeft]);
        return;
    }
    this.scrollTo(this.startDragLeft + (lp[0] - sp[0]) / this.width * (this.scrollWidth - this.offsetWidth));
    if (type == "end") {
        gantt.setImageSrc(this.barLeftImg, "scroll_barleft");
        gantt.setImageSrc(this.barCenterImg, "scroll_barcenter");
        gantt.setImageSrc(this.barRightImg, "scroll_barright");
        gantt.setBackgroundImage(this.barCenterDiv, "scroll_barbg");
        /** 
            @event
            @name SFGanttScrollerControl#scrollend
            @private
            @description 在一个滚动过程结束时触发
            @param {Number} scrollLeft 当前的滚动位置.
         */
        SFEvent.trigger(this, "scrollend", [this.scrollLeft]);
    }
}
/**
@private
在功能控件被移除时执行的方法
*/
SFGanttScrollerControl.prototype.remove = function (e) {
    delete this.leftImg;
    delete this.rightImg;
    delete this.barDiv;
    delete this.barLeftImg;
    delete this.barRightImg;
    delete this.barCenterDiv;
    delete this.barCenterImg;
    SFGanttControl.prototype.remove.apply(this, arguments);
}


/**
这是一个甘特图功能控件，本控件是左侧列表的滚动条
@private
@extends SFGanttScrollerControl
@class
*/
function SFGanttDivScroller(targetDiv) {
    this.layoutName = "listFoot";
}
SFGanttDivScroller.prototype = new SFGanttScrollerControl();
/**
@private
功能控件的初始化，每个插件的实现都会重写此方法
@param {SFGantt} gantt
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttDivScroller.prototype.initialize = function (gantt) {
    if (!gantt.getLayout) { return false; }
    var targetDiv = this.targetDiv = gantt.getLayout("listHead");
    if (!targetDiv) { return false; }
    if (!SFGanttScrollerControl.prototype.initialize.apply(this, arguments)) { return false; }
    this.startLeft = parseInt(targetDiv.firstChild.style.left);
    this.listeners.push(SFEvent.bind(this, "scroll", this, this.onScroll));
    this.listeners.push(SFEvent.bind(gantt, "listfieldsresize", this, this.onResize));
    return true;
}
/**
@private
在甘特图大小变化时根据新的大小调整滚动条的显示
*/
SFGanttDivScroller.prototype.onResize = function () {
    if (!this.container) { return; }
    SFGanttScrollerControl.prototype.onResize.apply(this, arguments);
    //hq scrollWidth取值不正确
    var child = this.targetDiv.childNodes,
        scrollWidth;

    scrollWidth = this.targetDiv.scrollWidth + this.startLeft;
    child = this.targetDiv.childNodes[0];
    if (child && child.nodeName.toUpperCase() === "TABLE") {
        scrollWidth = child.clientWidth - 4 + this.startLeft;
    }
    this.init(this.targetDiv.offsetWidth, scrollWidth);
    //this.init(this.targetDiv.offsetWidth, this.targetDiv.scrollWidth + this.startLeft);
}
/**
@private
在滚动条滚动的时候触发事件
@param {Number} scrollLeft 滚动条的当前滚动位置
*/
SFGanttDivScroller.prototype.onScroll = function (scrollLeft) {
    for (var child = this.targetDiv.firstChild; child; child = child.nextSibling) {
        if (!child.style) { continue; }
        child.style.left = -scrollLeft + this.startLeft + "px";
    }
    SFEvent.trigger(this.targetDiv, "scroll");
}


/**
这是一个甘特图功能控件，本控件是右侧图表的滚动条
@private
@extends SFGanttScrollerControl
@class
*/
function SFGanttTimeScroller() {
    this.layoutName = "mapFoot";
}
SFGanttTimeScroller.prototype = new SFGanttScrollerControl();
/**
@private
功能控件的初始化，每个插件的实现都会重写此方法
@param {SFGantt} gantt
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttTimeScroller.prototype.initialize = function (gantt) {
    if (!SFGanttScrollerControl.prototype.initialize.apply(this, arguments)) { return false; }
    this.listeners.push(SFEvent.bind(this, "scrollstart", this, this.onScrollStart));
    this.listeners.push(SFEvent.bind(this, "scroll", this, this.onScroll));
    this.listeners.push(SFEvent.bind(this, "scrollend", this, this.onScrollEnd));
    return true;
}
/**
@private
在甘特图大小变化时根据新的大小调整滚动条的显示
*/
SFGanttTimeScroller.prototype.onResize = function () {
    if (!this.container) { return; }
    SFGanttScrollerControl.prototype.onResize.apply(this, arguments);
    var width = this.gantt.getLayout("mapBody").offsetWidth;
    this.init(width, width * 9, width * 4);
}
/**
@private
在滚动条开始滚动时执行的操作
@param {Number} scrollLeft 滚动条的当前滚动位置
*/
SFGanttTimeScroller.prototype.onScrollStart = function (scrollLeft) {
    this.scrollObj = { start: scrollLeft, startTime: this.gantt.startTime };
}
/**
@private
在滚动条滚动时持续执行的操作
@param {Number} scrollLeft 滚动条的当前滚动位置
*/
SFGanttTimeScroller.prototype.onScroll = function (scrollLeft) {
    this.gantt.move(scrollLeft - this.scrollObj.start);
    this.scrollObj.start = scrollLeft;
}
/**
@private
在滚动条结束滚动时执行的操作
@param {Number} scrollLeft 滚动条的当前滚动位置
*/
SFGanttTimeScroller.prototype.onScrollEnd = function (e) {
    this.onResize();
}
window.SFGanttScrollerControl = SFGanttScrollerControl;
window.SFGanttDivScroller = SFGanttDivScroller;
window.SFGanttTimeScroller = SFGanttTimeScroller;
/**
这是一个甘特图功能控件，本控件用来实现任务横道图的绘制
@private
@extends SFGanttControl
@class
*/
function SFGanttTasksMap(config) {
    SFConfig.applyProperty(this, config);
    this.items = [];
}
SFGanttTasksMap.prototype = new window.SFGanttControl();
/**
@private
功能控件的初始化，每个插件的实现都会重写此方法
@param {SFGantt} gantt
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttTasksMap.prototype.initialize = function (gantt) {
    if (!gantt.getMapPanel) { return false; }
    SFGlobal.setProperty(this, {
        gantt: gantt,
        taskStyles: gantt.config.getConfigObj("SFGantt/taskStyle")
    });
    SFConfig.applyProperty(this, gantt.config.getConfigObj("SFGanttTasksMap"));
    if (!SFGanttTasksMap.listIndex) { SFGanttTasksMap.listIndex = 0; }
    this.proTag = "taskMap_" + (SFGanttTasksMap.listIndex++);
    if (!this.taskStyles) { this.taskStyles = {}; }
    this.taskPadding = gantt.itemHeight - this.taskHeight;
    //图表的任务显示层
    var doc = gantt.container.ownerDocument, tasksDiv = this.div = doc.createElement('div');
    SFGlobal.setProperty(this.div.style, { position: 'relative', fontSize: '0px', left: '0px', top: '-1px', zIndex: 100 });
    var firstDiv = doc.createElement('div');
    SFGlobal.setProperty(firstDiv.style, { position: 'relative', padding: '0px', margin: '0px', border: '0px' });
    tasksDiv.appendChild(firstDiv);
    gantt.getMapPanel().appendChild(tasksDiv);
    this.listeners = [
        SFEvent.bind(gantt, "initialize", this, this.onInitialize),
        SFEvent.bind(gantt, "afterscalechange", this, this.onScale),
        SFEvent.bind(gantt, "taskinview", this, this.drawTask),
        SFEvent.bind(gantt, "taskoutview", this, this.clearTask),
        SFEvent.bind(gantt, "taskchange", this, this.updateTask),
        SFEvent.bind(tasksDiv, "dblclick", this, this.onDblClick),
        SFEvent.bind(tasksDiv, "click", this, this.onClick),
        SFEvent.bind(tasksDiv, "mousedown", this, this.onMouseDown)
    ];
    if (gantt.setTooltip) {
        gantt.setTooltip(tasksDiv, SFEvent.getCallback(this, this.getTooltip))
    }
    return true;
}
/**
@private
添加一个横道图的绘制项目
@param {SFGanttMapItem} item
@returns {Bool} 如果添加成功，返回true,否则返回false
*/
SFGanttTasksMap.prototype.addItem = function (item) {
    if (!item) { return; }
    if (!item.initialize(this)) { return false; }
    this.items.push(item);
    return true;
}
/**
@private
通过调整空白元素的高度来保持和甘特图视图高度的一致
*/
SFGanttTasksMap.prototype.setViewTop = function () {
    var top = this.gantt.getViewTop();
    this.div.firstChild.style.height = top + "px";
}
/**
@private
根据任务返回任务应该使用的样式
@param {SFDataTask} task
@returns {Json} 任务的样式配置
*/
SFGanttTasksMap.prototype.getTaskStyle = function (task) {
    /**
    默认的任务显示样式
    @name SFConfig.configItems.SFGanttTasksMap_taskStyle
    @type String
    @default TaskNormal
    */
    //var className = task.ClassName, taskStyles = this.taskStyles;
    //className = className && taskStyles[className] ? className : this.taskStyle;
    //return taskStyles[className];
    //inforcenter
    var className = task.ClassName,
        taskStyle = $.extend(true, {}, this.taskStyles[this.taskStyle]),
        classNames;
    if (className) {
        classNames = className.split(',');
        while (classNames.length > 0) {
            $.extend(true, taskStyle, this.taskStyles[classNames.shift()]);
        }
    }
    return taskStyle;
}
/**
@private
绘制指定的任务
@param {SFDataTask} task
@param {Number} viewIndex 该任务在当前视图任务中的索引
*/
SFGanttTasksMap.prototype.drawTask = function (task, viewIndex) {
    var gantt = this.gantt, scale = gantt.getScale();
    if (!scale) { return; }
    if (viewIndex == 0) { this.setViewTop(); }
    var drawObj = gantt.getElementDrawObj(task);
    var mapObj = drawObj[this.proTag] = {};
    var start = task.Start, finish = task.Finish, height = gantt.getElementHeight(task);
    var taskDiv = this.div.ownerDocument.createElement('div'), childNodes = this.div.childNodes;
    taskDiv.style.cssText = "position:relative;top:" + (height - gantt.getElementDrawObj(task).height) + "px;left:" + gantt.getMapPanelPosition(start) + "px;height:" + height + "px"
    mapObj.taskDiv = taskDiv;

    if (drawObj.height > 0) {
        taskDiv._element = task;
        var items = this.items;
        if (finish && start && finish >= start) {
            for (var i = items.length - 1; i >= 0; i--) {
                items[i].show(task, mapObj, scale);
            }
        }
    }
    //inforcenter 选中行甘特图部分选中背景长度与进度条相同
    if (taskDiv.children.length == 3) {
        taskDiv.style.width = taskDiv.children[2].style.width;
        taskDiv.style.minWidth = "300px";
    }
    if (viewIndex + 1 == childNodes.length) {
        this.div.appendChild(taskDiv);
    }
    else {
        this.div.insertBefore(taskDiv, childNodes[viewIndex + 1]);
    }
}
/**
@private
在任务发生变化时进行响应，检查并在需要时重绘任务
@param {SFDataTask} task
@param {String[]} changedFields 任务更新的属性名称列表
*/
SFGanttTasksMap.prototype.updateTask = function (task, changedFields) {
    if (!this.gantt.getElementDrawObj(task)) { return; }
    var drawObj = this.gantt.getElementDrawObj(task), mapObj = drawObj[this.proTag];
    if (!mapObj) { return; }
    var start = task.Start, finish = task.Finish;
    mapObj.taskDiv.style.left = this.gantt.getMapPanelPosition(start) + "px";
    var items = this.items, canShow = (finish && start && finish >= start && drawObj.height > 0);
    if (SFGlobal.findInArray(changedFields, "Selected")) {
        mapObj.taskDiv.style.backgroundColor = task.Selected ? "#DDDDDD" : '';
    }
    for (var i = items.length - 1; i >= 0; i--) {
        if (canShow) {
            items[i].onUpdate(task, mapObj, changedFields);
        }
        else {
            items[i].remove(task, mapObj);
        }
    }
}
/**
@private
清除对指定任务的绘制
@param {SFDataTask} task
@param {Number} viewIndex 该任务在当前视图任务中的索引
*/
SFGanttTasksMap.prototype.clearTask = function (task, viewIndex) {
    if (viewIndex == 0) { this.setViewTop(); }
    var drawObj = this.gantt.getElementDrawObj(task);
    if (!drawObj) { return }
    var mapObj = drawObj[this.proTag];
    if (!mapObj) { return }
    var items = this.items;
    for (var i = items.length - 1; i >= 0; i--) {
        items[i].remove(task, mapObj);
    }
    if (mapObj) { mapObj.taskDiv._element = null; }
    SFEvent.deposeNode(mapObj.taskDiv);
    drawObj[this.proTag] = null;
}
/**
@private
获得当前鼠标事件对应的任务
@param {Event} e 浏览器鼠标事件
@returns {SFDataTask} task
*/
SFGanttTasksMap.prototype.getEventElement = function (e) {
    if (!e.target) { e.target = e.srcElement }
    for (var node = e.target; node; node = node.parentNode) {
        if (node == this.div) { return null; }
        if (node._element) { return node._element; }
    }
}
/**
@private
在鼠标双击横道图时触发对应任务的双击事件
@param {Event} e 浏览器鼠标事件
*/
SFGanttTasksMap.prototype.onDblClick = function (e) {
    var task = this.getEventElement(e);
    if (!task) { return; }
    /** 
        @event
        @name SFGantt#taskdblclick
        @description 在一个任务被双击时触发。
        @param {SFDataTask} task 被双击的任务.
     */
    SFEvent.trigger(this.gantt, "taskdblclick", [task, "chart"]);
}
/**
@private
在鼠标单击横道图时触发对应任务的单击事件
@param {Event} e 浏览器鼠标事件
*/
SFGanttTasksMap.prototype.onClick = function (e) {
    var task = this.getEventElement(e);
    if (!task) { return; }
    /** 
        @event
        @name SFGantt#taskclick
        @description 在一个任务被单击时触发。
        @param {SFDataTask} task 被单击的任务.
        @param {Event} e 浏览器鼠标事件
     */
    SFEvent.trigger(this.gantt, "taskclick", [task, e]);
}
/**
@private
在鼠标在横道图上按下的时候调用各个绘制项目的鼠标响应
@param {Event} e 浏览器鼠标事件
*/
SFGanttTasksMap.prototype.onMouseDown = function (e) {
    if (SFEvent.getEventButton(e) != 1) { return; }
    var task = this.getEventElement(e);
    if (!task) { return; }
    SFEvent.trigger(this.gantt, "taskmousedown", [task, e]);
    this.dragTask = task;
    var mapObj = this.gantt.getElementDrawObj(task)[this.proTag];
    var items = this.items;
    for (var i = items.length - 1; i >= 0; i--) {
        items[i].onMouseDown(task, mapObj, e);
    }
}
/**
@private
在地图初始化时初始化所有绘制项目
*/
SFGanttTasksMap.prototype.onInitialize = function () {
    //设置起始绘制原点
    this.addItem(new SFGanttMapMilestoneHead());
    this.addItem(new SFGanttMapSummaryHead());
    this.addItem(new SFGanttMapBarSummary());
    this.addItem(new SFGanttMapBarNormal());
    this.addItem(new SFGanttMapText());
    this.addItem(new SFGanttMapResize());
    this.addItem(new SFGanttMapPercentChange());
    this.addItem(new SFGanttMapPercent());
    this.addItem(new SFGanttMapBarTrack());
    this.addItem(new SFGanttMapMilestoneTrackHead());
    //	this.addItem(new SFGanttMapLinks());
    var gantt = this.gantt;
    if (!gantt.getScale()) { return; }
    //重新绘制所有视图内的任务
    var viewTasks = gantt.getViewElements();
    for (var i = 0; i < viewTasks.length; i++) {
        this.drawTask(viewTasks[i], i);
    }
}
/**
@private
在地图缩放等级变化时执行的操作
*/
SFGanttTasksMap.prototype.onScale = function () {
    //设置起始绘制原点
    var gantt = this.gantt, scale = gantt.getScale();
    if (!scale) { return; }
    //重新绘制所有视图内的任务
    var viewTasks = gantt.getViewElements(), items = this.items;
    for (var i = 0; i < viewTasks.length; i++) {
        var task = viewTasks[i], mapObj = this.gantt.getElementDrawObj(task)[this.proTag];
        if (!mapObj) { continue; }
        var start = task.Start;
        mapObj.taskDiv.style.left = gantt.getMapPanelPosition(start) + "px";
        for (var j = items.length - 1; j >= 0; j--) {
            items[j].onScale(task, mapObj, scale);
        }
        //inforcenter 选中行甘特图部分选中背景长度与进度条相同
        if (mapObj.taskDiv.children.length == 3) {
            mapObj.taskDiv.style.width = mapObj.taskDiv.children[2].style.width;
            mapObj.taskDiv.style.minWidth = "300px";
        }
    }
}
/**
@private
鼠标在横道图上滑过时调用各个绘制项目的响应来显示提示信息
@param {SFGanttTooltipControl} tooltip 甘特图的实时提示控件
@param {Event} e 浏览器的鼠标事件
@returns {Bool} 如果需要显示提示，返回true,否则返回false
*/
SFGanttTasksMap.prototype.getTooltip = function (tooltip, e) {
    var task = this.getEventElement(e);
    if (!task) { return; }
    var items = this.items, mapObj = this.gantt.getElementDrawObj(task)[this.proTag];
    for (var i = items.length - 1; i >= 0; i--) {
        if (items[i].getTooltip(task, mapObj, tooltip, e)) { return true; }
    }
    return false;
}
/**
@private
通过指定的属性列表返回任务的鼠标滑过提示信息层
@param {SFDataTask} task 指定的任务
@param {String} title 提示信息标题
@param {String[]} fields 需要显示的任务列名称数组，请参考{@link SFGanttField.taskFields}
@returns {HtmlElement}
*/
//inforcenter
SFGanttTasksMap.prototype.getTaskTooltipContent = function (task, title, fields) {
    var doc = this.div.ownerDocument, table = doc.createElement("table");
    table.style.fontSize = "12px";
    SFGlobal.setProperty(table, {});
    var row = table.insertRow(-1);
    var cell = row.insertCell(-1);
    SFGlobal.setProperty(cell, { align: 'center', colSpan: 2, noWrap: true });
    cell.appendChild(doc.createTextNode(title));

    fields = SFGanttField.getTaskFields(fields);
    var align;
    for (var i = 0; i < fields.length; i++) {
        var field = fields[i];
        row = table.insertRow(-1);
        cell = row.insertCell(-1);
        SFGlobal.setProperty(cell, { align: 'left', noWrap: true });
        field.showHead(cell);
        cell.style.textAlign = "right";
        cell.textContent = cell.textContent + "：";
        cell = row.insertCell(-1);
        SFGlobal.setProperty(cell, { align: 'left', noWrap: true });
        align = "";
        if (field.bodyStyle.textAlign && field.bodyStyle.textAlign != "left") {
            align = field.bodyStyle.textAlign;
            field.bodyStyle.textAlign = "left";
        }
        field.showBody(cell, task, this);
        if (field.bodyStyle.textAlign && align) {
            field.bodyStyle.textAlign = align;
        }
    }
    return table;
}
/**
@private
返回链接的鼠标滑过提示信息层
@param {SFDataLink} link 指定的任务
@returns {HtmlElement}
*/
SFGanttTasksMap.prototype.getLinkTooltipContent = function (link) {
    var doc = this.div.ownerDocument, table = doc.createElement("table");
    table.style.fontSize = "12px";
    SFGlobal.setProperty(table, {});
    var row = table.insertRow(-1);
    var cell = row.insertCell(-1);
    SFGlobal.setProperty(cell, { align: 'center', colSpan: 2, noWrap: true });
    var title = this.tooltipTitle['link'];
    cell.appendChild(doc.createTextNode(title));

    var fields = SFGanttField.getFields("Link", this.linkAddNoticeFields.split(","));

    for (var i = 0; i < fields.length; i++) {
        var field = fields[i];
        row = table.insertRow(-1);
        cell = row.insertCell(-1);
        SFGlobal.setProperty(cell, { align: 'left', noWrap: true });
        field.showHead(cell);
        cell.style.textAlign = "right";
        cell.textContent = cell.textContent + "：";
        cell = row.insertCell(-1);
        SFGlobal.setProperty(cell, { align: 'left', noWrap: true });
        field.showBody(cell, link, this);
    }
    return table;
}
window.SFGanttTasksMap = SFGanttTasksMap;
/**
这是一个甘特图功能控件，本控件用来实现任务横道图的绘制
@private
@extends SFGanttControl
@class
*/
function SFGanttResourceMap(config) {
    SFConfig.applyProperty(this, config);
    this.items = [];
}
SFGanttResourceMap.prototype = new window.SFGanttControl();
/**
@private
功能控件的初始化，每个插件的实现都会重写此方法
@param {SFGantt} gantt
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttResourceMap.prototype.initialize = function (gantt) {
    if (!gantt.getMapPanel) { return false; }
    SFConfig.applyProperty(this, gantt.config.getConfigObj("SFGanttResourceMap"));
    if (!SFGanttResourceMap.listIndex) { SFGanttResourceMap.listIndex = 0; }
    this.proTag = "resourceMap_" + (SFGanttResourceMap.listIndex++);
    SFGlobal.setProperty(this, {
        gantt: gantt,
        taskStyles: gantt.config.getConfigObj("SFGantt/taskStyle")
    });
    if (!this.taskStyles) { this.taskStyles = {}; }
    this.taskPadding = gantt.itemHeight - this.taskHeight;
    this.resourcePadding = gantt.itemHeight - this.resourceHeight;
    //图表的任务显示层
    var doc = gantt.container.ownerDocument, resourcesDiv = this.div = doc.createElement('div');
    SFGlobal.setProperty(this.div.style, { position: 'relative', fontSize: '0px', left: '0px', top: '-1px', zIndex: 100 });
    var firstDiv = doc.createElement('div');
    SFGlobal.setProperty(firstDiv.style, { position: 'relative', padding: '0px', margin: '0px', border: '0px' });
    resourcesDiv.appendChild(firstDiv);
    gantt.getMapPanel().appendChild(resourcesDiv);
    this.listeners = [
        SFEvent.bind(gantt, "initialize", this, this.onInitialize),
        SFEvent.bind(gantt, "afterscalechange", this, this.onScale),
        SFEvent.bind(gantt, "resourceinview", this, this.drawResource),
        SFEvent.bind(gantt, "resourceoutview", this, this.clearResource),
        SFEvent.bind(gantt, "resourcechange", this, this.updateResource),
        SFEvent.bind(gantt, "afterassignmentadd", this, this.drawAssignment),
        SFEvent.bind(gantt, "afterassignmentdelete", this, this.clearAssignment),
        SFEvent.bind(resourcesDiv, "dblclick", this, this.onDblClick),
        SFEvent.bind(resourcesDiv, "click", this, this.onClick),
        SFEvent.bind(resourcesDiv, "mousedown", this, this.onMouseDown)
    ];
    if (gantt.setTooltip) {
        gantt.setTooltip(resourcesDiv, SFEvent.getCallback(this, this.getTooltip))
    }
    return true;
}
/**
@private
添加一个横道图的绘制项目
@param {SFGanttMapItem} item
@returns {Bool} 如果添加成功，返回true,否则返回false
*/
SFGanttResourceMap.prototype.addItem = function (item) {
    if (!item) { return; }
    if (!item.initialize(this)) { return false; }
    this.items.push(item);
    return true;
}
/**
@private
通过调整空白元素的高度来保持和甘特图视图高度的一致
*/
SFGanttResourceMap.prototype.setViewTop = function () {
    var top = this.gantt.getViewTop();
    this.div.firstChild.style.height = top + "px";
}
/**
@private
绘制指定的资源
@param {SFDataResource} resource
@param {Number} viewIndex 该资源在当前视图任务中的索引
*/
SFGanttResourceMap.prototype.drawResource = function (resource, viewIndex) {
    var gantt = this.gantt, scale = gantt.getScale();
    if (!scale) { return; }
    if (viewIndex == 0) { this.setViewTop(); }
    var drawObj = gantt.getElementDrawObj(resource);
    var mapObj = drawObj[this.proTag] = {};

    var height = gantt.getElementHeight(resource);
    var resourceDiv = this.div.ownerDocument.createElement('div'), childNodes = this.div.childNodes;
    resourceDiv.style.cssText = "position:relative;top:" + (height - gantt.getElementDrawObj(resource).height) + "px;left:0px;height:" + height + "px"
    mapObj.resourceDiv = resourceDiv;

    if (drawObj.height > 0) {
        var assignments = resource.getAssignments();
        for (var i = 0; i < assignments.length; i++) {
            this.drawAssignment(assignments[i]);
        }
    }

    if (viewIndex + 1 == childNodes.length) {
        this.div.appendChild(resourceDiv);
    }
    else {
        this.div.insertBefore(resourceDiv, childNodes[viewIndex + 1]);
    }
}
/**
@private
在资源发生变化时进行响应，检查并在需要时重绘资源
@param {SFDataResource} resource
@param {String[]} changedFields 资源更新的属性名称列表
*/
SFGanttResourceMap.prototype.updateResource = function (resource, changedFields) {
    if (!this.gantt.getElementDrawObj(resource)) { return; }
    var drawObj = this.gantt.getElementDrawObj(resource), mapObj = drawObj[this.proTag];
    if (!mapObj) { return; }

    if (SFGlobal.findInArray(changedFields, "Selected")) {
        mapObj.resourceDiv.style.backgroundColor = resource.Selected ? "#DDDDDD" : '';
    }
}
/**
@private
清除对指定资源的绘制
@param {SFDataResource} resource
@param {Number} viewIndex 该资源在当前视图任务中的索引
*/
SFGanttResourceMap.prototype.clearResource = function (resource, viewIndex) {
    if (viewIndex == 0) { this.setViewTop(); }
    var drawObj = this.gantt.getElementDrawObj(resource);
    if (!drawObj) { return }
    var mapObj = drawObj[this.proTag];
    if (!mapObj) { return }
    var assignments = resource.getAssignments();
    for (var i = 0; i < assignments.length; i++) {
        this.clearAssignment(assignments[i]);
    }
    SFEvent.deposeNode(mapObj.resourceDiv);
    drawObj[this.proTag] = null;
}
/**
@private
绘制指定的分配
@param {SFDataAssignment} assignment
*/
SFGanttResourceMap.prototype.drawAssignment = function (assignment) {
    var gantt = this.gantt, scale = gantt.getScale();
    if (!scale) { return; }
    var resourceDiv = gantt.getElementDrawObj(assignment.getResource())[this.proTag].resourceDiv;
    if (!resourceDiv) { return; }
    var drawObj = gantt.getElementDrawObj(assignment.getTask());
    var mapObj = drawObj[this.proTag] = {};
    var taskDiv = this.div.ownerDocument.createElement('div');
    resourceDiv.appendChild(taskDiv);
    var task = assignment.getTask(), start = task.Start, finish = task.Finish, height = gantt.getElementHeight(task);
    taskDiv.style.cssText = "position:absolute;top:" + (height - gantt.getElementDrawObj(task).height) + "px;left:" + gantt.getMapPanelPosition(start) + "px;height:" + height + "px"
    mapObj.taskDiv = taskDiv;
    taskDiv._element = task;
    var items = this.items;
    if (finish && start && finish >= start) {
        for (var i = items.length - 1; i >= 0; i--) {
            items[i].show(task, mapObj, scale);
        }
    }
}
/**
@private
在分配发生变化时进行响应，检查并在需要时重绘分配
@param {SFDataAssignment} assignment
 @param {String[]} changedFields 分配更新的属性名称列表
 @param {String} changedType 分配更新的类型，task代表任务，默认是分配本身
*/
SFGanttResourceMap.prototype.updateAssignment = function (assignment, changedFields, changeType) {
    if (!this.gantt.getElementDrawObj(assignment.getTask())) { return; }
    var drawObj = this.gantt.getElementDrawObj(assignment.getTask()), mapObj = drawObj[this.proTag];
    if (!mapObj) { return; }
    var task = assignment.getTask(), start = task.Start, finish = task.Finish;
    mapObj.taskDiv.style.left = this.gantt.getMapPanelPosition(start) + "px";
    var items = this.items, canShow = (finish && start && finish >= start && drawObj.height > 0);
    for (var i = items.length - 1; i >= 0; i--) {
        if (canShow) {
            items[i].onUpdate(task, mapObj, changedFields);
        }
        else {
            items[i].remove(task, mapObj);
        }
    }
}
/**
@private
清除对指定分配的绘制
@param {SFDataAssignment} assignment
*/
SFGanttResourceMap.prototype.clearAssignment = function (assignment) {
    var drawObj = this.gantt.getElementDrawObj(assignment.getTask());
    if (!drawObj) { return }
    var mapObj = drawObj[this.proTag];
    if (!mapObj) { return }
    var items = this.items;
    for (var i = items.length - 1; i >= 0; i--) {
        items[i].remove(task, mapObj);
    }
    if (mapObj) { mapObj.taskDiv._element = null; }
    SFEvent.deposeNode(mapObj.taskDiv);
    drawObj[this.proTag] = null;
}
/**
@private
根据任务返回任务应该使用的样式
@param {SFDataTask} task
@returns {Json} 任务的样式配置
*/
SFGanttResourceMap.prototype.getTaskStyle = function (task) {
    var className = task.ClassName, taskStyles = this.taskStyles;
    className = className && taskStyles[className] ? className : this.taskStyle;
    return taskStyles[className];
}
/**
@private
在任务发生变化时进行响应，检查并在需要时重绘任务
@param {SFDataTask} task
@param {String[]} changedFields 任务更新的属性名称列表
*/
SFGanttResourceMap.prototype.updateTask = function (task, name) {
    var assignments = task.getAssignments();
    for (var i = 0; i < assignments.length; i++) {
        this.updateAssignment(assignments[i], [name], "task");
    }
}
/**
@private
获得当前鼠标事件对应的任务
@param {Event} e 浏览器鼠标事件
@returns {SFDataTask} task
*/
SFGanttResourceMap.prototype.getEventElement = function (e) {
    if (!e.target) { e.target = e.srcElement }
    for (var node = e.target; node; node = node.parentNode) {
        if (node == this.div) { return null; }
        if (node._element) { return node._element; }
    }
}
/**
@private
在鼠标双击横道图时触发对应任务的双击事件
@param {Event} e 浏览器鼠标事件
*/
SFGanttResourceMap.prototype.onDblClick = function (e) {
    var task = this.getEventElement(e);
    if (!task) { return; }
    /** 
        @event
        @name SFGantt#taskdblclick
        @description 在一个任务被双击时触发。
        @param {SFDataTask} task 被双击的任务.
     */
    SFEvent.trigger(this.gantt, "taskdblclick", [task, "chart"]);
}
/**
@private
在鼠标单击横道图时触发对应任务的单击事件
@param {Event} e 浏览器鼠标事件
*/
SFGanttResourceMap.prototype.onClick = function (e) {
    var task = this.getEventElement(e);
    if (!task) { return; }
    /** 
        @event
        @name SFGantt#taskclick
        @description 在一个任务被单击时触发。
        @param {SFDataTask} task 被单击的任务.
        @param {Event} e 浏览器鼠标事件
     */
    SFEvent.trigger(this.gantt, "taskclick", [task, e]);
}
/**
@private
在鼠标在横道图上按下的时候调用各个绘制项目的鼠标响应
@param {Event} e 浏览器鼠标事件
*/
SFGanttResourceMap.prototype.onMouseDown = function (e) {
    if (SFEvent.getEventButton(e) != 1) { return; }
    var task = this.getEventElement(e);
    if (!task) { return; }
    SFEvent.trigger(this.gantt, "taskmousedown", [task, e]);
    this.dragTask = task;
    var mapObj = this.gantt.getElementDrawObj(task)[this.proTag];
    var items = this.items;
    for (var i = items.length - 1; i >= 0; i--) {
        items[i].onMouseDown(task, mapObj, e);
    }
}
/**
@private
在地图初始化时初始化所有绘制项目
*/
SFGanttResourceMap.prototype.onInitialize = function () {
    //设置起始绘制原点
    this.addItem(new SFGanttMapMilestoneHead());
    this.addItem(new SFGanttMapSummaryHead());
    this.addItem(new SFGanttMapBarSummary());
    this.addItem(new SFGanttMapBarNormal());
    this.addItem(new SFGanttMapResize());
    this.addItem(new SFGanttMapPercentChange());
    this.addItem(new SFGanttMapPercent());
    this.addItem(new SFGanttMapBarTrack());
    this.addItem(new SFGanttMapMilestoneTrackHead());
    var gantt = this.gantt;
    if (!gantt.getScale()) { return; }
    this.listeners.push(SFEvent.bind(gantt.getData(), "aftertaskupdate", this, this.updateTask));
    //重新绘制所有视图内的任务
    var viewResources = gantt.getViewElements();
    for (var i = 0; i < viewResources.length; i++) {
        this.drawResource(viewResources[i], i);
    }
}
/**
@private
在地图缩放等级变化时执行的操作
*/
SFGanttResourceMap.prototype.onScale = function () {
    //设置起始绘制原点
    var gantt = this.gantt, scale = gantt.getScale();
    if (!scale) { return; }
    //重新绘制所有视图内的任务
    var viewResources = gantt.getViewElements(), items = this.items;
    for (var i = 0; i < viewResources.length; i++) {
        var resource = viewResources[i], mapObj = this.gantt.getElementDrawObj(resource)[this.proTag];
        if (!mapObj) { continue; }
        var assignments = resource.getAssignments();
        for (var k = 0; k < assignments.length; k++) {
            var assignment = assignments[k],
                task = assignment.getTask(),
                start = task.Start;
            var drawObj = this.gantt.getElementDrawObj(assignment.getTask());
            if (!drawObj) { return }
            var mapObj = drawObj[this.proTag];
            if (!mapObj) { return }
            mapObj.taskDiv.style.left = gantt.getMapPanelPosition(start) + "px";
            for (var j = items.length - 1; j >= 0; j--) {
                items[j].onScale(task, mapObj, scale);
            }
        }
    }
}
/**
@private
鼠标在横道图上滑过时调用各个绘制项目的响应来显示提示信息
@param {SFGanttTooltipControl} tooltip 甘特图的实时提示控件
@param {Event} e 浏览器的鼠标事件
@returns {Bool} 如果需要显示提示，返回true,否则返回false
*/
SFGanttResourceMap.prototype.getTooltip = function (tooltip, e) {
    var task = this.getEventElement(e);
    if (!task) { return; }
    var items = this.items, mapObj = this.gantt.getElementDrawObj(task)[this.proTag];
    for (var i = items.length - 1; i >= 0; i--) {
        if (items[i].getTooltip(task, mapObj, tooltip, e)) { return true; }
    }
    return false;
}
/**
@private
通过指定的属性列表返回任务的鼠标滑过提示信息层
@param {SFDataTask} task 指定的任务
@param {String} title 提示信息标题
@param {String[]} fields 需要显示的任务列名称数组，请参考{@link SFGanttField.taskFields}
@returns {HtmlElement}
*/
SFGanttResourceMap.prototype.getTaskTooltipContent = function (task, title, fields) {
    var doc = this.div.ownerDocument, table = doc.createElement("table");
    table.style.fontSize = "12px";
    SFGlobal.setProperty(table, {});
    var row = table.insertRow(-1);
    var cell = row.insertCell(-1);
    SFGlobal.setProperty(cell, { align: 'center', colSpan: 2, noWrap: true });
    cell.appendChild(doc.createTextNode(title));

    fields = SFGanttField.getTaskFields(fields);
    for (var i = 0; i < fields.length; i++) {
        var field = fields[i];
        row = table.insertRow(-1);
        cell = row.insertCell(-1);
        SFGlobal.setProperty(cell, { align: 'left', noWrap: true });
        field.showHead(cell);
        cell = row.insertCell(-1);
        SFGlobal.setProperty(cell, { align: 'left', noWrap: true });
        field.showBody(cell, task, this);
    }
    return table;
}
/**
@private
返回链接的鼠标滑过提示信息层
@param {SFDataLink} link 指定的任务
@returns {HtmlElement}
*/
SFGanttResourceMap.prototype.getLinkTooltipContent = function (link) {
    var doc = this.div.ownerDocument, table = doc.createElement("table");
    table.style.fontSize = "12px";
    SFGlobal.setProperty(table, {});
    var row = table.insertRow(-1);
    var cell = row.insertCell(-1);
    SFGlobal.setProperty(cell, { align: 'center', colSpan: 2, noWrap: true });
    var title = this.tooltipTitle['link'];
    cell.appendChild(doc.createTextNode(title));

    var fields = SFGanttField.getFields("Link", this.linkAddNoticeFields.split(","));

    for (var i = 0; i < fields.length; i++) {
        var field = fields[i];
        row = table.insertRow(-1);
        cell = row.insertCell(-1);
        SFGlobal.setProperty(cell, { align: 'left', noWrap: true });
        field.showHead(cell);
        cell = row.insertCell(-1);
        SFGlobal.setProperty(cell, { align: 'left', noWrap: true });
        field.showBody(cell, link, this);
    }
    return table;
}
window.SFGanttResourceMap = SFGanttResourceMap;
/**
这是一个甘特图功能控件，本控件实现在甘特图上显示任务之间的链接肩头的功能
@private
@extends SFGanttControl
@class
*/
function SFGanttLinksMap() {
}
SFGanttLinksMap.prototype = new window.SFGanttControl();
/**
功能控件的初始化，每个插件的实现都会重写此方法
@private
@param {SFGantt} gantt
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttLinksMap.prototype.initialize = function (gantt) {
    if (gantt.disableLinksMap || !gantt.getMapPanel) { return false; }
    SFConfig.applyProperty(this, gantt.config.getConfigObj("SFGanttTasksMap"));
    SFConfig.applyProperty(this, gantt.config.getConfigObj("SFGanttLinksMap"));
    SFGlobal.setProperty(this, {
        gantt: gantt,
        arrayPadding: 10,					//箭头和任务之间的距离(特定情况下使用)
        linkStyles: gantt.config.getConfigObj("SFGantt/linkStyle")
    });
    this.taskPadding = gantt.itemHeight - this.taskHeight;
    //图表的任务显示层
    var linksDiv = this.div = gantt.container.ownerDocument.createElement('div');
    SFGlobal.setProperty(linksDiv.style, { position: 'absolute', fontSize: '0px', top: '-1px', left: '0px', zIndex: 200 });
    gantt.getMapPanel().appendChild(linksDiv);
    this.linkNoticeFields = this.linkNoticeFields ? SFGanttField.getLinkFields(this.linkNoticeFields.split(",")) : null;
    this.listeners = [
        SFEvent.bind(gantt, "initialize", this, this.onInit),
        SFEvent.bind(gantt, "afterscalechange", this, this.onScale),
        SFEvent.bind(gantt, "taskinview", this, this.drawLinks),
        SFEvent.bind(gantt, "taskoutview", this, this.clearLinks),
        SFEvent.bind(gantt, "taskchange", this, this.updateLinks),
        SFEvent.bind(gantt, "elementheightchanged", this, this.onScale),
        SFEvent.bind(linksDiv, "click", this, this.onLinkClick),
        SFEvent.bind(linksDiv, "dblclick", this, this.onLinkDblClick)
    ];
    if (this.linkNoticeFields && gantt.setTooltip) {
        gantt.setTooltip(linksDiv, SFEvent.getCallback(this, this.getTooltip))
    }
    this.inited = false;
    this.onInit();
    return true;
}
/**
在甘特图初始化时进行必要的事件绑定
@private
*/
SFGanttLinksMap.prototype.onInit = function () {
    var data = this.gantt.getData();
    if (!data || this.inited) { return; }
    this.listeners = this.listeners.concat([
        SFEvent.bind(data, "linkregister", this, this.drawLink),
        SFEvent.bind(data, "linkunregister", this, this.clearLink),
        SFEvent.bind(data, "afterlinkchange", this, this.updateLink),
        SFEvent.bind(data, "aftertaskadd", this, this.onScale),
        SFEvent.bind(data, "aftertaskdelete", this, this.onScale)
    ]);
    this.inited = true;
    this.refresh();
}
/**
在甘特图缩放比例变化或者添加、删除任务时完全的重绘所有箭头
@private
*/
SFGanttLinksMap.prototype.onScale = function () {
    var viewTasks = this.gantt.getViewElements();
    if (!viewTasks) { return }
    for (var i = 0; i < viewTasks.length; i++) {
        this.clearLinks(viewTasks[i], 0);
    }
    this.changed = true;
    this.idleTimes = 0;
    if (!this.gantt.forPrint) {
        if (!this.refreshTimeout) { this.refreshTimeout = window.setInterval(SFEvent.getCallback(this, this.onTime), 100); }
    }
    else {
        this.refresh();
    }
}
/**
在接收到重绘请求之后的延时处理以提升性能
@private
*/
SFGanttLinksMap.prototype.onTime = function () {
    if (!this.changed) {
        this.idleTimes++;
        if (this.idleTimes > 4) {
            window.clearInterval(this.refreshTimeout);
            delete this.refreshTimeout
            this.refresh();
        }
        return;
    }
    this.changed = false;
}
/**
重绘所有链接箭头
@private
*/
SFGanttLinksMap.prototype.refresh = function () {
    //设置起始绘制原点
    var viewTasks = this.gantt.getViewElements();
    if (!viewTasks) { return }
    if (this.refreshTimeout) { window.clearTimeout(this.refreshTimeout); }
    this.refreshTimeout = null;
    for (var i = 0; i < viewTasks.length; i++) {
        this.drawLinks(viewTasks[i], i);
    }
}
/**
绘制指定任务的所有链接箭头
@param {SFDataTask} task 
@param {Number} viewIndex 该任务在视图任务数组之中的索引
@private
*/
SFGanttLinksMap.prototype.drawLinks = function (task, viewIndex) {
    var links = task.getPredecessorLinks();
    for (var i = 0; i < links.length; i++) {
        this.drawLink(links[i], true);
    }
    var links = task.getSuccessorLinks();
    for (var i = 0; i < links.length; i++) {
        this.drawLink(links[i], false);
    }
}
/**
清除指定任务的所有链接箭头
@private
@param {SFDataTask} task 
@param {Number} viewIndex 该任务在视图任务数组之中的索引
*/
SFGanttLinksMap.prototype.clearLinks = function (task, viewIndex) {
    var links = task.getPredecessorLinks();
    for (var i = 0; i < links.length; i++) {
        this.clearLink(links[i]);
    }
    var links = task.getSuccessorLinks();
    for (var i = 0; i < links.length; i++) {
        this.clearLink(links[i]);
    }
}
/**
在任务发生变化时检查并在需要时重绘箭头
@private
@param {SFDataTask} task 
@param {String[]} changedFields 更改过的属性名称数组
*/
SFGanttLinksMap.prototype.updateLinks = function (task, changedFields) {
    var redrawAllLink = false, redrawLink = false;
    for (var i = 0; i < changedFields.length; i++) {
        var field = changedFields[i];
        if (field == 'Collapse') {
            redrawAllLink = true;
            break;
        }
        if (!redrawLink && (field == 'Start' || field == 'Finish')) {
            redrawLink = true;
        }
    }
    if (redrawAllLink) {
        this.onScale();
    }
    else if (redrawLink) {
        this.clearLinks(task, 0);
        this.drawLinks(task);
    }
}
/**
在链接发生变化时检查并在需要时重绘箭头
@private
@param {SFDataLink} link
*/
SFGanttLinksMap.prototype.updateLink = function (link) {
    if (this.gantt.getElementDrawObj(link)) {
        this.clearLink(link);
        this.drawLink(link);
    }
}
/**
绘制指定的链接箭头
@private
@param {SFDataLink} link
*/
SFGanttLinksMap.prototype.drawLink = function (link) {
    if (this.refreshTimeout) { return; }
    var gantt = this.gantt, objTask = link.PredecessorTask, task = link.SuccessorTask, scale = gantt.getScale();
    if (gantt.getElementDrawObj(link).linkImg) { return; }
    //如果箭头的终点任务被隐藏，则不绘制箭头
    if (!scale || objTask.isHidden() || task.isHidden()) { return; }
    var drawObj = gantt.getElementDrawObj(link),
        objFinish = objTask.Milestone ? objTask.Start : objTask.Finish,
        finish = task.Milestone ? task.Start : task.Finish;
    if (!objTask.Start || !objFinish || !task.Start || !finish) { return; }
    var sOffset = [gantt.getMapPanelPosition(objTask.Start), gantt.getElementViewTop(objTask) + 2];
    var eOffset = [gantt.getMapPanelPosition(task.Start), gantt.getElementViewTop(task) + 2];
    //下面针对显示的纵向偏移做处理：
    var lineOffset;
    if (gantt.getElementHeight(objTask) == 0 && (lineOffset = gantt.getElementHeight(objTask) - gantt.getElementDrawObj(objTask).height) != 0) { sOffset[1] += lineOffset; }
    if (gantt.getElementHeight(task) == 0 && (lineOffset = gantt.getElementHeight(task) - gantt.getElementDrawObj(task).height) != 0) { eOffset[1] += lineOffset; }

    var sWidth = (objFinish - objTask.Start) / scale;
    var eWidth = (finish - task.Start) / scale;
    var taskTop = Math.ceil(this.taskPadding / 2 + this.taskHeight * this.trackNormalTopScale) - 1, taskHeight = Math.ceil(this.taskHeight * (gantt.isTracking ? this.trackNormalHeightScale : 1)), barTop = Math.ceil(taskTop + taskHeight / 2);
    var dir, arrowSize, position, points = [], arrowStyle = {}, lineStyle = { borderStyle: 'solid' }, color = '#000000';
    var className = link.ClassName;
    className = className ? className : this.linkStyle;
    var linkStyle = this.linkStyles[className];
    if (linkStyle) {
        if (linkStyle.color) { color = linkStyle.color; }
        if (linkStyle.lineStyle) { lineStyle = linkStyle.lineStyle; }
    }
    lineStyle.borderColor = color;
    //hoteamsoft
    switch (parseInt(link.Type)) {
        case 2://完成->完成
            dir = "left";
            arrowSize = [5, 9];
            var asLeft = sOffset[0] + sWidth;
            var asTop = sOffset[1] + barTop;
            var aeLeft = eOffset[0] + eWidth;
            var aeTop = eOffset[1] + barTop;
            var aLeft = Math.max(asLeft, aeLeft) + this.arrayPadding;
            points.push([asLeft, asTop]);
            points.push([aLeft, asTop]);
            points.push([aLeft, aeTop]);
            points.push([aeLeft, aeTop]);
            position = [aeLeft, aeTop - Math.floor(arrowSize[1] / 2)];
            break;
        case 1://开始->完成
            dir = "left";
            arrowSize = [5, 9];
            //开始计算位置
            var asLeft = sOffset[0];
            var asTop = sOffset[1] + barTop;
            var aeLeft = eOffset[0] + eWidth + arrowSize[0];
            var aeTop = eOffset[1] + barTop;
            points.push([asLeft, asTop]);
            points.push([asLeft - this.arrayPadding, asTop]);
            points.push([asLeft - this.arrayPadding, eOffset[1]]);
            points.push([eOffset[0] + eWidth + this.arrayPadding, eOffset[1]]);
            points.push([eOffset[0] + eWidth + this.arrayPadding, aeTop]);
            points.push([aeLeft, aeTop]);
            position = [aeLeft - arrowSize[0], aeTop - Math.floor(arrowSize[0] / 2)];
            break;
        case 0://开始->开始
            dir = "right";
            arrowSize = [5, 9];
            var asLeft = sOffset[0];
            var asTop = sOffset[1] + barTop;
            var aeLeft = eOffset[0];
            var aeTop = eOffset[1] + barTop;
            var aLeft = Math.min(asLeft, aeLeft) - this.arrayPadding;
            points.push([asLeft, asTop]);
            points.push([aLeft, asTop]);
            points.push([aLeft, aeTop]);
            points.push([aeLeft, aeTop]);
            position = [aeLeft - arrowSize[0], aeTop - Math.floor(arrowSize[1] / 2)];
            break;
        case 3://完成->开始
        default:
            var asLeft = sOffset[0] + sWidth;
            var asTop = sOffset[1] + barTop;
            if (objFinish <= task.Start && eOffset[1] != sOffset[1]) {
                dir = sOffset[1] > eOffset[1] ? "up" : "down";
                arrowSize = [9, 5];
                //开始计算位置
                var aeLeft = eOffset[0];
                if (objFinish.valueOf() == objTask.Start.valueOf()) { asTop -= 3; }//如果起点任务是一个大纲
                var aeTop = sOffset[1] > eOffset[1] ? (eOffset[1] + (gantt.itemHeight - taskTop - taskHeight) + this.taskHeight) : (eOffset[1] + taskTop - arrowSize[1]);
                if (finish.valueOf() - task.Start.valueOf() == 0) { aeTop -= 3; }//如果终点任务是一个大纲
                if (finish.valueOf() - task.Start.valueOf() != 0 && objFinish.valueOf() != objTask.Start.valueOf()) {
                    aeLeft = Math.max(aeLeft, asLeft + 5);
                }
                points.push([asLeft, asTop]);
                points.push([aeLeft, asTop]);
                points.push([aeLeft, aeTop]);
                position = [(aeLeft - Math.floor(arrowSize[0] / 2) - 1), aeTop];
            }
            else {
                dir = "right";
                arrowSize = [5, 9];
                //开始计算位置
                var aeLeft = eOffset[0] - arrowSize[0];
                var aeTop = eOffset[1] + barTop;
                points.push([asLeft, asTop]);
                if (eOffset[1] != sOffset[1]) {
                    points.push([asLeft + this.arrayPadding, asTop]);
                    points.push([asLeft + this.arrayPadding, eOffset[1]]);
                    points.push([eOffset[0] - this.arrayPadding, eOffset[1]]);
                    points.push([eOffset[0] - this.arrayPadding, aeTop]);
                }
                points.push([aeLeft, aeTop]);
                position = [aeLeft, aeTop - Math.floor(arrowSize[1] / 2)];
            }
            break;
    }
    drawObj.linkPaths = this.getLinkPaths(points, lineStyle, link);

    var linkImg = gantt.createImage("arrow_" + dir, { color: color, position: position });
    SFGlobal.setProperty(linkImg.style, arrowStyle);
    SFGlobal.setProperty(linkImg.style, { position: 'absolute', fontSize: "0px" });
    drawObj.linkImg = linkImg;
    linkImg._link = link;
    this.div.appendChild(linkImg);
}
/**
通过点坐标数组绘制出路径线条，并返回相应的层
@private
@param {Number[][]} points 需要绘制线条的路径数组
@param {Json} linkStyle 链接线的CSS样式对象
@param {SFDataLink} link 链接元素
@returns {HtmlElement[]} 返回绘制的所有层数组
*/
SFGanttLinksMap.prototype.getLinkPaths = function (points, linkStyle, link) {
    var paths = [], doc = this.gantt.container.ownerDocument;
    for (var i = 1; i < points.length; i++) {
        var div = doc.createElement('div');
        SFGlobal.setProperty(div.style, linkStyle);
        SFGlobal.setProperty(div.style, { position: 'absolute', fontSize: "0px", borderWidth: '0px' });
        if (points[i - 1][0] == points[i][0]) {
            SFGlobal.setProperty(div.style, { borderRightWidth: '1px', height: Math.abs(points[i][1] - points[i - 1][1]) + 'px', width: 0 + 'px', left: (points[i][0] - 1) + 'px', top: (Math.min(points[i][1], points[i - 1][1])) + 'px' });
        }
        else if (points[i - 1][1] == points[i][1]) {
            SFGlobal.setProperty(div.style, { borderTopWidth: '1px', width: Math.abs(points[i][0] - points[i - 1][0]) + 'px', height: 0 + 'px', left: (Math.min(points[i][0], points[i - 1][0])) + 'px', top: (points[i][1]) + 'px' });
        }
        this.div.appendChild(div);
        div.aaa = 'bbb'
        div._link = link;
        paths.push(div);
    }
    return paths;
}
/**
清除已经绘制的链接箭头
@private
@param {SFDataLink} link 链接元素
*/
SFGanttLinksMap.prototype.clearLink = function (link) {
    var drawObj = this.gantt.getElementDrawObj(link);
    if (!drawObj) { return }
    if (drawObj.linkImg) {
        SFEvent.deposeNode(drawObj.linkImg);
        drawObj.linkImg._link = null;
        drawObj.linkImg = null;
    }
    if (drawObj.linkPaths) {
        var p;
        while (p = drawObj.linkPaths.pop()) {
            p._link = null;
            SFEvent.deposeNode(p);
        }
        drawObj.linkPaths = null;
    }
    this.gantt.removeElementDrawObj(link)
}
/**
在链接线被点击时触发链接元素的点击事件
@private
@param {Event} e 浏览器的鼠标事件
*/
SFGanttLinksMap.prototype.onLinkClick = function (e) {
    var link = e.target._link;
    if (!link) { return; }
    /** 
        @event
        @name SFGantt#linkclick
        @description 在一个链接被单击时触发。
        @param {SFDataLink} link 被单击的链接.
        @param {Event} e 浏览器的鼠标事件
     */
    SFEvent.trigger(this.gantt, "linkclick", [link, e]);
}
/**
在链接线被双击时触发链接元素的双击事件
@private
@param {Event} e 浏览器的鼠标事件
*/
SFGanttLinksMap.prototype.onLinkDblClick = function (e) {
    var link = e.target._link;
    if (!link) { return; }
    SFEvent.cancelBubble(e);
    /** 
        @event
        @name SFGantt#linkdblclick
        @description 在一个链接被双击时触发。
        @param {SFDataLink} link 被双击的链接.
     */
    SFEvent.trigger(this.gantt, "linkdblclick", [link]);
}
/**
鼠标在链接上滑过时显示提示信息
@private
@param {SFGanttTooltipControl} tooltip 甘特图的实时提示控件
@param {Event} e 浏览器的鼠标事件
@returns {Bool} 如果需要显示提示，返回true,否则返回false
*/
SFGanttLinksMap.prototype.getTooltip = function (tooltip, e) {
    var link = e.target._link, doc = this.gantt.container.ownerDocument;
    if (!link) { return; }
    if (tooltip.bindObject == link) { return false; }
    var table = doc.createElement("table");
    table.style.fontSize = "12px";
    var row = table.insertRow(-1);
    var cell = row.insertCell(-1);
    SFGlobal.setProperty(cell, { align: 'center', colSpan: 2, noWrap: true });
    cell.appendChild(doc.createTextNode(this.tooltipTitle.link));
    for (var i = 0; i < this.linkNoticeFields.length; i++) {
        row = table.insertRow(-1);
        cell = row.insertCell(-1);
        SFGlobal.setProperty(cell, { align: 'left', noWrap: true });
        this.linkNoticeFields[i].showHead(cell);
        cell = row.insertCell(-1);
        SFGlobal.setProperty(cell, { align: 'left', noWrap: true });
        this.linkNoticeFields[i].showBody(cell, link, this);
    }
    tooltip.bindObject = link;
    tooltip.setContent(table);
    return true;
}
/**
@private
在功能控件被移除时执行的方法
*/
SFGanttLinksMap.prototype.remove = function () {
    this.onScale();
    if (this.refreshTimeout) { window.clearInterval(this.refreshTimeout); }
    SFGanttControl.prototype.remove.apply(this, arguments);
}
/**
销毁此功能控件以释放内存
*/
SFGanttLinksMap.prototype.depose = function () {
    if (this.delayTimeout) { window.clearTimeout(this.delayTimeout); }
    SFEvent.deposeNode(this.div);
    SFEvent.clearListeners(this);
    for (var key in this) { this[key] = null; }
}
window.SFGanttLinksMap = SFGanttLinksMap;
/**
这是一个甘特图功能控件，本控件实现任务甘特图进度线的显示
@extends SFGanttControl
@param {Date} [time] 进度线的时间，默认为当前时间
@param {Json} [config] 进度线的显示参数
@param {String} [config.vertexImg] 进度线的顶点图标，默认为<img src="http://www.51diaodu.cn/sfgantt/img/task_head_4_red.gif"/>
@param {Number[]} [config.vertexSize] 进度线的顶点图标大小，默认为[11,11]
@param {Number[]} [config.progressType] 进度线的类型，有normal(显示所有的进度),earlier(显示在指定时间之前的进度),later(显示在指定时间之后的进度)三种
@param {Json} [config.vertexStyle] 进度线的顶点图标CSS附加样式，例如{border:'solid 1px green'}
@param {Json} [config.lineColor='red'] 进度线的线条颜色
@param {Json} [config.lineWeight=1] 进度线的线条宽度
@class
*/
function SFGanttProgressLine(time, config) {
    this.time = time ? SFGlobal.getDate(time) : new Date();
    this.progressType = "normal";
    SFGlobal.setProperty(this, { vertexSize: [11, 11], lineColor: 'red', lineWeight: 1 });
    SFGlobal.setProperty(this, config);
}
SFGanttProgressLine.prototype = new window.SFGanttControl();
/**
功能控件的初始化，每个插件的实现都会重写此方法
@private
@param {SFGantt} gantt
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttProgressLine.prototype.initialize = function (gantt) {
    if (!gantt.getMapPanel) { return false; }
    SFConfig.applyProperty(this, gantt.config.getConfigObj("SFGanttProgressLine"));
    if (!SFGanttProgressLine.listIndex) { SFGanttProgressLine.listIndex = 0; }
    this.proTag = "progressLine_" + (SFGanttProgressLine.listIndex++);
    SFGlobal.setProperty(this, {
        gantt: gantt,
        taskHeight: 12,
        lineStyle: gantt.config.getConfigObj("SFGanttProgressLine/lineStyle")
    });
    this.taskPadding = gantt.itemHeight - this.taskHeight;
    //图表的任务显示层
    var linesDiv = this.div = gantt.container.ownerDocument.createElement('div');
    SFGlobal.setProperty(linesDiv.style, { position: 'absolute', fontSize: '0px', top: '-1px', left: '0px', zIndex: 190 });
    gantt.getMapPanel().appendChild(linesDiv);
    this.listeners = [
        SFEvent.bind(gantt, "afterscalechange", this, this.onScale),
        SFEvent.bind(gantt, "taskinview", this, this.drawLine),
        SFEvent.bind(gantt, "taskoutview", this, this.clearLine),
        SFEvent.bind(gantt, "taskchange", this, this.updateLine),
        SFEvent.bind(gantt, "elementheightchanged", this, this.onScale)
    ];
    if (this.lineNoticeFields && gantt.setTooltip) {
        gantt.setTooltip(linesDiv, SFEvent.getCallback(this, this.getTooltip))
    }
    this.onScale();
    return true;
}
/**
根据浏览器的支持得到对应的Canvas
@private
@returns {__MapGraphics}
*/
SFGanttProgressLine.prototype.getGraphics = function () {
    var graphics = [SFGraphicsSvg, SFGraphicsVml, SFGraphicsCanvas, SFGraphicsDiv];
    for (var i = 0; i < graphics.length; i++) {
        if (graphics[i].isSupport()) {
            return new graphics[i]();
        }
    }
    return new SFGraphics(true);
}
/**
在甘特图缩放比例变化或者添加、删除任务时完全的重绘所有线条
@private
*/
SFGanttProgressLine.prototype.onScale = function () {
    var viewTasks = this.gantt.getViewElements();
    if (!viewTasks) { return }
    for (var i = 0; i < viewTasks.length; i++) {
        this.clearLine(viewTasks[i], 0);
    }
    if (!this.refreshTimeout) { this.refreshTimeout = window.setInterval(SFEvent.getCallback(this, this.onTime), 100); }
    this.changed = true;
    this.idleTimes = 0;
}
/**
在接收到重绘请求之后的延时处理以提升性能
@private
*/
SFGanttProgressLine.prototype.onTime = function () {
    if (!this.changed) {
        this.idleTimes++;
        if (this.idleTimes > 4) {
            window.clearInterval(this.refreshTimeout);
            delete this.refreshTimeout
            this.refresh();
        }
        return;
    }
    this.changed = false;
}
/**
重绘所有进度线条
@private
*/
SFGanttProgressLine.prototype.refresh = function () {
    //设置起始绘制原点
    var viewTasks = this.gantt.getViewElements();
    if (!viewTasks) { return }
    if (this.refreshTimeout) { window.clearTimeout(this.refreshTimeout); }
    this.refreshTimeout = null;
    for (var i = 0; i < viewTasks.length; i++) {
        this.drawLine(viewTasks[i], i);
    }
}
/**
判断一个任务是否应该绘制顶点
@param {SFDataTask} task
@returns {Bool} 如果需要绘制，返回true
@private
*/
SFGanttProgressLine.prototype.hasVertex = function (task) {
    return task.Start &&
        task.Finish &&
        task.Start <= this.time &&
        (task.PercentComplete != 100 || (task.Finish >= this.time));
}
/**
返回一个任务的顶点对应的时间
@param {SFDataTask} task
@returns {Date}
@private
*/
SFGanttProgressLine.prototype.getVertexTime = function (task) {
    var percentComplete = task.PercentComplete ? task.PercentComplete : 0, time = task.Start.valueOf() + (task.Finish - task.Start) * percentComplete / 100;
    switch (this.progressType) {
        case "earlier":
            time = Math.min(time, this.time);
            break;
        case "later":
            time = Math.max(time, this.time);
            break;
    }
    return time;
}
/**
绘制指定任务和下一个视图任务之间的进度线
@param {SFDataTask} task 
@private
*/
SFGanttProgressLine.prototype.drawLine = function (task) {
    if (this.refreshTimeout) { return; }//如果马上要重回全部，则取消
    var gantt = this.gantt, scale = gantt.getScale();
    if (!scale) { return }//如果还没有定义缩放比例，则取消
    var drawObj = gantt.getElementDrawObj(task);
    if (drawObj[this.proTag]) { return; }//如果已经绘制完成，则取消
    if (!this.hasVertex(task)) { return; }//如果此任务处没有顶点，则取消

    //在这里寻找上一个有效顶点
    var objTask = task.getPreviousView();
    while (objTask) {
        if (this.hasVertex(objTask)) { break; }
        objTask = objTask.getPreviousView();
    }
    var sp, ep;
    if (!objTask) {//如果上一个有效顶点不存在，则从最上端指定时间线的位置处开始连线
        sp = [gantt.getMapPanelPosition(this.time), 0];
    }
    else {

        sp = [gantt.getMapPanelPosition(this.getVertexTime(objTask)), gantt.getElementViewTop(objTask) + gantt.getElementDrawObj(objTask).height / 2];
    }
    var ep = [gantt.getMapPanelPosition(this.getVertexTime(task)), gantt.getElementViewTop(task) + gantt.getElementDrawObj(task).height / 2];
    //下面开始画顶点
    var vertexSize = this.vertexSize, vImg = gantt.createImage(this.vertexImg ? this.vertexImg : "task_head_4", { color: this.vertexColor ? this.vertexColor : '#FF0000', size: this.vertexSize })
    SFGlobal.setProperty(vImg.style, { position: 'absolute', fontSize: "0px", left: (ep[0] - Math.floor(vertexSize[0] / 2)) + 'px', top: (ep[1] - Math.floor(vertexSize[1] / 2)) + 'px' });
    drawObj[this.proTag] = vImg;
    this.div.appendChild(vImg);
    //下面开始画线
    var graphics = this.getGraphics();
    graphics.setLineColor(this.lineColor);
    graphics.setLineWeight(this.lineWeight);
    drawObj[this.proTag + "_l"] = graphics.div;
    var op = { x: Math.min(sp[0], ep[0]), y: Math.min(sp[1], ep[1]) }
    graphics.setPosition(op);
    graphics.start({ x: 0, y: 0 }, 1, { x: Math.abs(sp[0] - ep[0]), y: Math.abs(sp[1] - ep[1]) });
    graphics.moveTo({ x: sp[0] - op.x, y: sp[1] - op.y });
    graphics.lineTo({ x: ep[0] - op.x, y: ep[1] - op.y });
    graphics.finish();
    graphics._task = task;
    this.div.appendChild(graphics.div);
}
/**
清除指定任务和下一个视图任务之间的进度线
@private
@param {SFDataTask} task 
@param {Number} viewIndex 该任务在视图任务数组之中的索引
*/
SFGanttProgressLine.prototype.clearLine = function (task, viewIndex) {
    var drawObj = this.gantt.getElementDrawObj(task);
    if (!drawObj) { return }
    if (drawObj[this.proTag]) {
        SFEvent.deposeNode(drawObj[this.proTag]);
        delete drawObj[this.proTag];
        SFEvent.deposeNode(drawObj[this.proTag + "_l"]);
        delete drawObj[this.proTag + "_l"];
    }
}
/**
在任务发生变化时检查并在需要时重绘进度线
@private
@param {SFDataTask} task 
@param {String[]} changedFields 更改过的属性名称数组
*/
SFGanttProgressLine.prototype.updateLine = function (task, changedFields) {
    var redrawAll = false, redraw = false;
    for (var i = 0; i < changedFields.length; i++) {
        var field = changedFields[i];
        if (field == 'Collapse') {
            redrawAll = true;
            break;
        }
        if (!redraw && (field == 'Start' || field == 'Finish' || field == 'PercentComplete')) {
            redraw = true;
        }
    }
    if (redrawAll) {
        this.onScale();
    }
    else if (redraw) {
        //在这里寻找上一个有效顶点
        var lastTask = task.getNextView();
        while (lastTask) {
            if (this.hasVertex(lastTask)) { break; }
            lastTask = lastTask.getNextView();
        }
        if (lastTask) {
            this.clearLine(lastTask);
            this.drawLine(lastTask);
        }
        this.clearLine(task);
        this.drawLine(task);
    }
}
/**
@private
在功能控件被移除时执行的方法
*/
SFGanttProgressLine.prototype.remove = function () {
    this.onScale();
    if (this.refreshTimeout) { window.clearInterval(this.refreshTimeout); }
    delete this.refreshTimeout;
    SFEvent.deposeNode(this.div);
    SFGanttControl.prototype.remove.apply(this, arguments);
}
/**
销毁此功能控件以释放内存
*/
SFGanttProgressLine.prototype.depose = function () {
    for (var key in this) { this[key] = null; }
}
window.SFGanttProgressLine = SFGanttProgressLine;
/**
这是一个甘特图功能控件，本控件用来实现甘特图图表滚动时显示当前时间提示的功能
@private
@extends SFGanttControl
@class
*/
function SFGanttTimeScrollNotice(gantt, container) {
}
SFGanttTimeScrollNotice.prototype = new window.SFGanttControl();
/**
@private
功能控件的初始化，每个插件的实现都会重写此方法
@param {SFGantt} gantt
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttTimeScrollNotice.prototype.initialize = function (gantt, container) {
    if (gantt.disableTimeScrollNotice || !gantt.getLayout) { return false; }
    SFConfig.applyProperty(this, gantt.config.getConfigObj("SFGanttTimeScrollNotice"));
    this.gantt = gantt;
    //分割条的任务显示层
    this.div = container.ownerDocument.createElement('div');
    SFGlobal.setProperty(this.div.style, { position: 'absolute', zIndex: 400, display: 'none', left: '100px' });
    SFGlobal.setProperty(this.div.style, this.divStyle);
    container.appendChild(this.div);
    this.listeners = [
        SFEvent.bind(gantt, "move", this, this.onMove),
        SFEvent.bind(gantt, "layoutchange", this, this.onResize)
    ];
    return true;
}
/**
@private
在甘特图起始时间变化的时候的响应
@param {Date} time 甘特图的起始时间
*/
SFGanttTimeScrollNotice.prototype.onMove = function (time) {
    if (!this.timeout) { this.timeout = window.setInterval(SFEvent.getCallback(this, this.onTime), 64); }
    this.lastTime = time;
    this.idleTimes = 0
    this.changed = true;
}
/**
@private
在甘特图起始时间变化的时候延时显示时间提示
*/
SFGanttTimeScrollNotice.prototype.onTime = function () {
    if (!this.changed) {
        this.idleTimes++;
        if (this.idleTimes > 4) {
            window.clearInterval(this.timeout);
            this.div.style.display = "none";
            delete this.timeout
        }
        return;
    }
    this.changed = false;
    this.div.style.display = "";
    this.div.innerHTML = SFGlobal.getDateString(this.lastTime, this.dateFormat);
}
/**
@private
在甘特图大小变化的时候调整显示提示的位置
*/
SFGanttTimeScrollNotice.prototype.onResize = function () {
    var mapDiv = this.gantt.getLayout("mapBody");
    this.div.style.left = (SFEvent.getPageOffset(mapDiv, this.gantt.getContainer())[0] + 1) + "px"
    this.div.style.bottom = this.gantt.footHeight + 5 + "px"
}
window.SFGanttTimeScrollNotice = SFGanttTimeScrollNotice;
/**
这是一个甘特图功能控件，本控件实现在甘特图纵向滚动(列表滚动)时显示实时的提示信息
@private
@extends SFGanttControl
@class
*/
function SFGanttListScrollNotice() {
}
SFGanttListScrollNotice.prototype = new window.SFGanttControl();
/**
功能控件的初始化，每个插件的实现都会重写此方法
@private
@param {SFGantt} gantt
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttListScrollNotice.prototype.initialize = function (gantt, container) {
    if (gantt.disableListScrollNotice || !gantt.getLayout) { return false; }
    SFConfig.applyProperty(this, gantt.config.getConfigObj("SFGanttListScrollNotice"));
    var elementType = gantt.elementType;
    this.fields = this[elementType.toLowerCase() + "Fields"] ? SFGanttField.getFields(elementType, this[elementType.toLowerCase() + "Fields"].split(",")) : null;
    this.gantt = gantt;
    //分割条的任务显示层
    var div = this.div = container.ownerDocument.createElement('div');
    SFGlobal.setProperty(div.style, { position: 'absolute', zIndex: 400, display: 'none' });
    SFGlobal.setProperty(div.style, this.divStyle);
    container.appendChild(div);
    this.listeners = [
        SFEvent.bind(gantt, "scroll", this, this.onScroll),
        SFEvent.bind(gantt, "afterresize", this, this.onResize)
    ];
    this.onResize();
    return true;
}
/**
在甘特图滚动条变化的时候执行的响应
@private
@param {Number} scrollTop 甘特图的滚动高度，即甘特图当前显示的内容顶部离整个数据顶部的高度差
@param {Json} scrollObj 当前滚动的位置信息
@param {SFDataElement[]} scrollObj.spanElements 当前视图的元素范围
*/
SFGanttListScrollNotice.prototype.onScroll = function (scrollTop, scrollObj) {
    if (!scrollObj || !scrollObj.spanElements[1]) { return; }
    if (!this.timeout) { this.timeout = window.setInterval(SFEvent.getCallback(this, this.onTime), 64); }
    this.scrollObj = scrollObj;
    this.changed = true;
    this.idleTimes = 0;
}
/**
在甘特图滚动条变化后的延时操作
@private
*/
SFGanttListScrollNotice.prototype.onTime = function () {
    if (!this.changed) {
        this.idleTimes++;
        if (this.idleTimes > 16) {
            this.div.style.display = 'none';
            window.clearInterval(this.timeout);
            delete this.timeout
        }
        return;
    }
    this.changed = false;

    var task = this.scrollObj.spanElements[1], fieldLength = this.fields.length, doc = this.div.ownerDocument;
    if (!this.div.firstChild) {
        var table = doc.createElement("table");
        this.div.appendChild(table);
        table.width = 160;
        table.style.fontSize = "12px";
        for (var i = 0; i < fieldLength; i++) {
            var row = table.insertRow(-1);
            var cell = row.insertCell(-1);
            cell.width = 60;
            this.fields[i].showHead(cell, this);
            var cell = row.insertCell(-1);
            if (i == 0) { cell.width = 100; }
            var div = doc.createElement("div");
            SFGlobal.setProperty(div.style, { position: "relative", overflow: "hidden", width: "100px", height: "14px" });
            cell.appendChild(div);
        }
    }
    for (var i = 0; i < fieldLength; i++) {
        var div = this.div.firstChild.rows[i].cells[1].firstChild;
        SFEvent.deposeNode(div, true);
        this.fields[i].showBody(div, task, this);
    }
    this.div.style.display = '';
}
/**
在甘特图大小变化的时候执行，更新提示的显示位置
@private
*/
SFGanttListScrollNotice.prototype.onResize = function () {
    SFGlobal.setProperty(this.div.style, { right: '30px', top: (this.gantt.headHeight + 10) + 'px' });
}
window.SFGanttListScrollNotice = SFGanttListScrollNotice;
/**
这是一个甘特图功能控件，本控件用来管理日历的显示，仅仅实现一个功能，就是在缩放等级变化的时候确定当前显示什么日历最合适，也就是实现getCalList方法
@private
@extends SFGanttControl
@class
*/
function SFGanttCalendarControl() {
}
SFGanttCalendarControl.prototype = new window.SFGanttControl();
/**
@private
功能控件的初始化，每个插件的实现都会重写此方法
@param {SFGantt} gantt
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttCalendarControl.prototype.initialize = function (gantt) {
    this.gantt = gantt;
    var formats = gantt.config.getConfig("SFGanttCalendarItem/formats");
    var items = {
        Minute15: new SFGanttCalendarItem("Minute", 15, formats.Minute15),
        Hour: new SFGanttCalendarItem("Hour", 1, formats.Hour),
        Hour2: new SFGanttCalendarItem("Hour", 2, formats.Hour2),
        Hour6: new SFGanttCalendarItem("Hour", 6, formats.Hour6),
        Dat: new SFGanttCalendarItem("Dat", 1, formats.Dat),
        Dat1: new SFGanttCalendarItem("Dat", 1, formats.Dat1),
        Day: new SFGanttCalendarItem("Day", 1, formats.Day),
        Day3: new SFGanttCalendarItem("Dat", 3, formats.Day3),
        Day7: new SFGanttCalendarItem("Day", 7, formats.Day7),
        Week: new SFGanttCalendarItem("Week", 1, formats.Week),
        Month: new SFGanttCalendarItem("Month", 1, formats.Month),
        Month1: new SFGanttCalendarItem("Month", 1, formats.Month1),
        Quarter: new SFGanttCalendarItem("Month", 3, formats.Quarter),
        Quarter1: new SFGanttCalendarItem("Month", 3, formats.Quarter1),
        Quarter2: new SFGanttCalendarItem("Month", 6, formats.Quarter2),
        Year: new SFGanttCalendarItem("Year", 1, formats.Year),
        Year1: new SFGanttCalendarItem("Year", 1, formats.Year1),
        Year5: new SFGanttCalendarItem("Year", 5, formats.Year5),
        Year10: new SFGanttCalendarItem("Year", 10, formats.Year10)
    };
    this.levels = [
        { scale: 3 * 60000 / 6, cals: [items.Minute15, items.Hour, items.Dat] },	//每3分钟
        { scale: 30 * 60000 / 6, cals: [items.Hour2, items.Dat, items.Week] },	//每30分钟
        { scale: 3600000 / 6, cals: [items.Hour6, items.Dat, items.Week] },	//每1小时
        { scale: 4 * 3600000 / 6, cals: [items.Day, items.Week, items.Month] },	//每4小时
        { scale: 12 * 3600000 / 6, cals: [items.Day3, items.Month, items.Quarter] },//每12小时
        { scale: 24 * 3600000 / 6, cals: [items.Day7, items.Month, items.Year] },	//每1天
        { scale: 96 * 3600000 / 6, cals: [items.Month1, items.Quarter, items.Year] },	//每4天
        { scale: 192 * 3600000 / 6, cals: [items.Month1, items.Year, items.Year] },	//每8天
        { scale: 576 * 3600000 / 6, cals: [items.Quarter1, items.Year, items.Year5] },	//每24天
        { scale: 1728 * 3600000 / 6, cals: [items.Quarter2, items.Year1, items.Year10] }	//每72天
    ];
    SFGlobal.setProperty(gantt, {
        getCalLevels: SFEvent.getCallback(this, this.getCalLevels),
        setCalLevels: SFEvent.getCallback(this, this.setCalLevels),
        getCalList: SFEvent.getCallback(this, this.getCalList)
    });
    this.listeners = [
        SFEvent.bind(gantt, "initialize", this, this.onScaleChange),
        SFEvent.bind(gantt, "afterscalechange", this, this.onScaleChange)
    ];
    this.onScaleChange();
    return true;
}
/**
设置甘特图的日历显示等级
@name SFGantt.prototype.setCalLevels
@private
@function
@param {Json[]} levels
*/
SFGanttCalendarControl.prototype.setCalLevels = function (levels) {
    this.levels = levels
}
/**
获取甘特图的日历显示等级
@name SFGantt.prototype.getCalLevels
@private
@function
@returns {Json[]}
*/
SFGanttCalendarControl.prototype.getCalLevels = function () {
    return this.levels
}
/**
返回当前甘特图使用的日历列表
@name SFGantt#getCalList
@private
@function
@returns {SFGanttCalendarItem[]}
*/
SFGanttCalendarControl.prototype.getCalList = function () {
    return this.calList;
}
/**
在缩放等级变化的时候自动选择当前的日历列表
@private
*/
SFGanttCalendarControl.prototype.onScaleChange = function () {
    var scale = this.gantt.getScale(), levels = this.levels, i;
    if (!scale) { return; }
    for (i = levels.length - 1; i >= 0; i--) { if (scale > levels[i].scale) { i++; break; } }
    i = Math.min(Math.max(i, 0), levels.length - 1)
    this.calList = levels[i].cals;
}
/**
@private
在功能控件被移除时执行的方法
*/
SFGanttCalendarControl.prototype.remove = function () {
    var gantt = this.gantt;
    delete gantt.getCalList
    SFGanttControl.prototype.remove.apply(this, arguments);
}

/**
这个对象代表甘特图之中的日历项，通常来讲，一个日历项代表甘特图上日历一行的显示
@private
@param {String} unit 日历项的单元名称，当前支持如下单元
<ul>
    <li>Minute	:	分钟</li>
    <li>Hour	:	小时</li>
    <li>Dat		:	日期，按月显示</li>
    <li>Day		:	日期，按星期显示</li>
    <li>Week	:	周</li>
    <li>Month	:	月</li>
    <li>Year	:	年</li>
</ul>
@param {Number} num 数目，例如这个日历是以8个小时为一段，则unit参数为"Hour",num参数为8
@param {String} format 日历段的显示格式
@class
*/
function SFGanttCalendarItem(unit, num, format) {
    this.unit = unit;
    this.number = num;
    this.format = format;
}
/**
日历段的显示文本
@param {Date} time 当前的时间戳记
@returns {String}
@private
*/
SFGanttCalendarItem.prototype.showHead = function (time) {
    var config = window._SFGantt_config.SFGlobal;
    return SFGlobal.getDateString(time, this.format, config);
}
/**
获得该时间在日历上的对应起点
@param {Date} time 当前的时间戳记
@returns {Date}
@private
*/
SFGanttCalendarItem.prototype.getFloorTime = function (time) {
    switch (this.unit) {
        case "Minute":
            var flag = time.getMinutes() % this.number;
            return new Date(time.getFullYear(), time.getMonth(), time.getDate(), time.getHours(), time.getMinutes() - flag);
        case "Hour":
            var flag = time.getHours() % this.number;
            return new Date(time.getFullYear(), time.getMonth(), time.getDate(), time.getHours() - flag);
        case "Dat":
            var flag = (time.valueOf() - time.getTimezoneOffset() * 60 * 1000) % (this.number * 24 * 60 * 60 * 1000);
            return new Date(time.valueOf() - flag);
        case "Day":
            var flag = time.getDay() % this.number;
            var newTime = new Date(time.valueOf() - flag * 24 * 60 * 60 * 1000);
            return new Date(newTime.getFullYear(), newTime.getMonth(), newTime.getDate());
        case "Week":
            var flag = time.getDay();
            var newTime = new Date(time.valueOf() - flag * 24 * 60 * 60 * 1000);
            return new Date(newTime.getFullYear(), newTime.getMonth(), newTime.getDate());
        case "Month":
            var flag = time.getMonth() % this.number;
            return new Date(time.getFullYear(), time.getMonth() - flag);
        case "Year":
            var flag = time.getFullYear() % this.number;
            return new Date(time.getFullYear() - flag);
        default:
            return time;
    }
}
/**
获得该时间在日历上的下一点
@param {Date} time 当前的时间戳记
@returns {Date}
@private
*/
SFGanttCalendarItem.prototype.getNextTime = function (time) {
    switch (this.unit) {
        case "Minute":
            return new Date(time.valueOf() + this.number * 60 * 1000);
        case "Hour":
            return new Date(time.valueOf() + this.number * 60 * 60 * 1000);
        case "Dat":
        case "Day":
            return new Date(time.valueOf() + this.number * 24 * 60 * 60 * 1000);
        case "Week":
            return new Date(time.valueOf() + this.number * 7 * 24 * 60 * 60 * 1000);
        case "Month":
            var year = time.getFullYear(), month = time.getMonth() + this.number;
            if (month == 12) {
                year++;
                month = 0;
            }
            return new Date(year, month);
        case "Year":
            var year = time.getFullYear() + this.number;
            var t = new Date(0);
            t.setYear(year);
            return t;
        default:
            return time;
    }
}
window.SFGanttCalendarControl = SFGanttCalendarControl;
window.SFGanttCalendarItem = SFGanttCalendarItem;
/**
这是一个甘特图功能控件，控件实现日历的层的显示，因为要确认显示的位置，因此，需要通过gantt.getLayout来确定显示的位置
同时还依赖{@link SFGantt#getCalList}方法，因为需要确定显示哪些日历层次
@private
@extends SFGanttControl
@class
*/
function SFGanttCalDiv() {
}
SFGanttCalDiv.prototype = new window.SFGanttControl();
/**
@private
功能控件的初始化，每个插件的实现都会重写此方法
@param {SFGantt} gantt
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttCalDiv.prototype.initialize = function (gantt) {
    if (!gantt.getLayout || !gantt.getCalList) { return false; }
    var container = gantt.getLayout("mapHead"), doc = gantt.container.ownerDocument;
    if (!container) { return false; }
    SFConfig.applyProperty(this, gantt.config.getConfigObj("SFGanttCalDiv"));
    var div = this.div = doc.createElement("div");
    SFEvent.setUnSelectable(div);
    SFGlobal.setProperty(this, { gantt: gantt, div: div, container: container, cals: {} });
    SFGlobal.setProperty(div.style, { position: 'absolute', padding: '0px', margin: '0px' });
    for (var i = 0; i < this.calNum; i++) {
        var calDiv = doc.createElement("div");
        SFGlobal.setProperty(calDiv.style, { position: 'absolute', padding: '0px', margin: '0px', left: '0px' });
        div.appendChild(calDiv);
    }
    container.appendChild(div);
    this.listeners = [
        SFEvent.bind(gantt, "initialize", this, this.onResize),
        SFEvent.bind(gantt, "layoutchange", this, this.onResize),
        SFEvent.bind(gantt, "afterscalechange", this, this.showCal),
        SFEvent.bind(gantt, "move", this, this.showCal)
    ];
    this.onResize();
    return true;
}
/**
@private
在甘特图初始化或大小发生变化时进行响应，重绘日历层
*/
SFGanttCalDiv.prototype.onResize = function () {
    var gantt = this.gantt, div = this.div, container = div.parentNode, size = this.size, s = [container.offsetWidth, container.offsetHeight];
    if (!size || size[1] != s[1]) {
        var calNum = this.calNum, height = s[1];
        for (var i = 0; i < calNum; i++) {
            SFGlobal.setProperty(div.childNodes[i].style, { top: Math.floor(height * i / calNum) + 'px', height: Math.floor(height / calNum) + 'px' });
        }
    }
    this.size = s;
    this.showCal();
}
/**
@private
显示日历层
*/
SFGanttCalDiv.prototype.showCal = function () {
    var gantt = this.gantt, startTime = gantt.getStartTime(), scale = gantt.getScale(), calList = gantt.getCalList();
    if (!startTime || !scale || !calList) { return; }
    startTime = startTime.valueOf();
    this.moveTo(scale, startTime);
    var cals = this.gantt.getCalList(), childNodes = this.div.childNodes;
    for (var i = 0; i < this.calNum; i++) {
        this.showCalItem(scale, startTime, cals[i], childNodes[this.calNum - i - 1], i);
    }
}
/**
@private
显示日历层之中的一行
@param {Number} scale 地图当前的缩放倍数
@param {Date} startTime 显示的开始时间
@param {Json} cal 当前的日历对象
@param {HtmlElement} calDiv 用来显示这一行日历的层
@param {Number} index 当前的层数索引
*/
SFGanttCalDiv.prototype.showCalItem = function (scale, startTime, cal, calDiv, index) {
    var drawObj = this.cals[index];
    if (!drawObj || drawObj.cal != cal) {
        this.clearItem(index);
        this.cals[index] = drawObj = { start: startTime, cal: cal, scale: scale };
        calDiv.style.left = (startTime - this.drawStart) / scale + "px";
    }
    else if (drawObj.scale != scale)//如果缩放等级已经变化,则设置所有大小
    {
        for (var child = calDiv.firstChild; child; child = child.nextSibling) {
            SFGlobal.setProperty(child.style, {
                left: (child.sTime - drawObj.start) / scale + "px",
                width: (child.eTime - child.sTime) / scale + "px"
            });
        }
        calDiv.style.left = (drawObj.start - this.drawStart) / scale + "px";
        drawObj.scale = scale
    }
    var endTime = startTime + this.container.offsetWidth * scale;//需要显示的结束时间
    var osTime = calDiv.firstChild ? calDiv.firstChild.sTime : Number.MAX_VALUE;
    var oeTime = calDiv.lastChild ? calDiv.lastChild.eTime : Number.MIN_VALUE;
    if (startTime > (calDiv.firstChild ? calDiv.firstChild.eTime : Number.MAX_VALUE))//说明左边可能有多余的内容，删除
    {
        while (calDiv.firstChild && calDiv.firstChild.eTime < startTime) {
            SFEvent.deposeNode(calDiv.firstChild);
        }
        osTime = calDiv.firstChild ? calDiv.firstChild.sTime : Number.MAX_VALUE
    }
    if ((calDiv.lastChild ? calDiv.lastChild.sTime : Number.MIN_VALUE) > endTime)//说明右边可能有多余的内容，删除
    {
        while (calDiv.lastChild && calDiv.lastChild.sTime > endTime) {
            SFEvent.deposeNode(calDiv.lastChild);
        }
        oeTime = calDiv.lastChild ? calDiv.lastChild.eTime : Number.MIN_VALUE
    }
    if (startTime < osTime)//说明左侧需要添加内容
    {
        this.addTimeSpans(startTime, Math.min(osTime, endTime), drawObj, calDiv, -1);
        osTime = calDiv.firstChild ? calDiv.firstChild.sTime : Number.MAX_VALUE;
        oeTime = calDiv.lastChild ? calDiv.lastChild.eTime : Number.MIN_VALUE;
    }
    if (oeTime < endTime)//说明左侧需要添加内容
    {
        this.addTimeSpans(Math.max(oeTime, startTime), endTime, drawObj, calDiv, 1);
    }
}
/**
@private
添加指定范围内的日历层
@param {Date} startTime 显示的开始时间
@param {Date} endTime 显示的结束时间
@param {Json} drawObj 当前的绘制对象
@param {HtmlElement} calDiv 用来显示这一行日历的层
@param {Number[]} position 显示的位置
*/
SFGanttCalDiv.prototype.addTimeSpans = function (startTime, endTime, drawObj, calDiv, position) {
    var cal = drawObj.cal;
    var sTime = parseInt(cal.getFloorTime(new Date(startTime)).valueOf());//需要显示的单位起始时间
    var lastAdd = null;
    while (sTime < endTime) {
        var eTime = parseInt(cal.getNextTime(new Date(sTime)).valueOf());
        var div = calDiv.ownerDocument.createElement("div");
        SFGlobal.setProperty(div, { sTime: sTime, eTime: eTime });
        var height = Math.floor(this.size[1] / this.calNum) - 1;
        SFGlobal.setProperty(div.style, { position: 'absolute', left: (sTime - drawObj.start) / drawObj.scale + 'px', top: '0px', width: (eTime - sTime) / drawObj.scale + 'px', height: height, fontSize: Math.floor(height * 0.8) + 'px', padding: '0px', lineHeight: height + 'px', borderRight: 'solid 1px ' + this.gantt.borderColor, borderBottom: 'solid 1px ' + this.gantt.borderColor, textAlign: 'center' });
        div.innerHTML = cal.showHead(new Date(sTime));
        if (position == -1) {
            if (lastAdd == null) {
                calDiv.insertBefore(div, calDiv.firstChild);
            }
            else if (lastAdd.nextSibling == null) {
                calDiv.appendChild(div);
            }
            else {
                calDiv.insertBefore(div, lastAdd.nextSibling);
            }
        }
        else {
            calDiv.appendChild(div);
        }
        lastAdd = div;
        sTime = eTime;
    }
}
/**
@private
清空所有的日历显示
*/
SFGanttCalDiv.prototype.clear = function () {
    for (var i = 0; i < this.calNum; i++) {
        this.clearItem(i);
    }
}
/**
@private
清除日历显示之中的一个层级
@param {Number} i 层级编号
*/
SFGanttCalDiv.prototype.clearItem = function (i) {
    SFEvent.deposeNode(this.div.childNodes[this.calNum - i - 1], true);
    delete this.cals[i];
}
/**
@private
缩放和移动日历到指定的位置
@param {Number} scale 当前甘特图的缩放比例
@param {Date} startTime 左侧的起始时间
*/
SFGanttCalDiv.prototype.moveTo = function (scale, startTime) {
    if (!this.drawStart) { this.drawStart = startTime; }
    var point = parseInt((this.drawStart - startTime) / scale);
    if (Math.abs(point) > 10000) {
        this.drawStart = startTime;
        var calNum = this.calNum;
        for (var i = 0; i < calNum; i++) {
            if (!this.cals[i]) { continue; }
            var p = parseInt((this.cals[i].start - this.drawStart) / scale);
            if (Math.abs(p) > 10000) {
                this.cals[i].start = this.drawStart;
                for (var child = this.div.childNodes[i].firstChild; child; child = child.nextSibling) {
                    child.style.left = parseInt(child.style.left + point) + "px";
                }
                p = 0;
            }
            this.div.childNodes[i].style.left = p + "px";
        }
        point = 0;
    }
    this.div.style.left = point + 'px';
}
window.SFGanttCalDiv = SFGanttCalDiv;
/**
这是一个甘特图功能控件，本控件实现在拖动甘特图的日历层的时候，进行甘特图图表的缩放操作
@private
@extends SFGanttControl
@class
*/
function SFGanttDragZoomControl() {
}
SFGanttDragZoomControl.prototype = new window.SFGanttControl();
/**
@private
功能控件的初始化，每个插件的实现都会重写此方法
@param {SFGantt} gantt
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttDragZoomControl.prototype.initialize = function (gantt) {
    if (gantt.disableDragZoom || !gantt.getLayout) { return false; }
    var container = gantt.getLayout("mapHead");
    if (!container) { return false; }
    SFGlobal.setCursor(container, "col-resize");
    this.gantt = gantt;
    this.container = container;
    this.listeners = [
        SFDragObject.setup(container, SFEvent.getCallback(this, this.onMove), { interval: 32 })
    ];
    return true;
}
/**
@private
在拖拽缩放图表的过程之中持续触发的函数
@param {Number[]} startPoint 拖拽起始点位置
@param {Number[]} point 拖拽当前点位置
@param {String} type 当前触发的类型
*/
SFGanttDragZoomControl.prototype.onMove = function (sp, lp, type) {
    if (type == "start") { this.startScale = this.gantt.getScale(); }
    if (lp[0] > 1) {
        var scale = this.startScale * sp[0] / lp[0];
        this.gantt.setScale(scale);
    }
}
window.SFGanttDragZoomControl = SFGanttDragZoomControl;
/**
这是一个甘特图功能控件，本控件是用来显示甘特图的日历分割线，依赖日历控件SFGanttCalendarControl、布局控件SFGanttLayoutControl
@private
@extends SFGanttControl
@class
*/
function SFGanttTimeSegmentation() {
}
SFGanttTimeSegmentation.prototype = new window.SFGanttControl();
/**
@private
功能控件的初始化，每个插件的实现都会重写此方法
@param {SFGantt} gantt
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttTimeSegmentation.prototype.initialize = function (gantt) {
    if (gantt.disableTimeSegmentation || !gantt.getTimePanel || !gantt.getCalList) { return false; }
    var container = gantt.getTimePanel();
    if (!container) { return false; }
    SFConfig.applyProperty(this, gantt.config.getConfigObj("SFGanttTimeSegmentation"));
    this.gantt = gantt;
    //分割条的任务显示层
    var div = this.div = gantt.container.ownerDocument.createElement('div');
    SFGlobal.setProperty(div.style, { position: 'absolute', fontSize: '0px', left: '0px', top: '0px', height: '100%', width: '100%', zIndex: 20 });
    container.appendChild(div);
    this.listeners = [
        SFEvent.bind(gantt, "initialize", this, this.reDraw),
        SFEvent.bind(gantt, "layoutchange", this, this.reDraw),
        SFEvent.bind(gantt, "afterscalechange", this, this.reDraw),
        SFEvent.bind(gantt, "move", this, this.reDraw)
    ];
    this.reDraw();
    return true;
}
/**
@private
在地图缩放等级变化时执行的操作
*/
SFGanttTimeSegmentation.prototype.reDraw = function () {
    var gantt = this.gantt, cals = gantt.getCalList();
    if (!cals || !cals[this.calIndex]) { return; }
    this.showSegmentations(gantt.getScale(), gantt.getStartTime().valueOf(), cals[this.calIndex]);
}
/**
@private
显示日历分隔线
@param {Number} scale 当前甘特图的缩放比例
@param {Date} startTime 当前甘特图的起始时间
@param {SFGanttCalendarItem} cal 日历项
*/
SFGanttTimeSegmentation.prototype.showSegmentations = function (scale, startTime, cal) {
    if (this.cal != cal || !this.drawStart || Math.abs(startTime - this.drawStart) / scale > 10000)//如果缩放等级已经变化或者距离绘制起点像素值大于1万像素
    {
        this.clear();
        SFGlobal.setProperty(this, { cal: cal, drawStart: startTime, scale: scale });
        this.div.style.left = this.gantt.getTimePanelPosition(startTime) + "px";
    }
    if (this.scale != scale) {
        for (var child = this.div.firstChild; child; child = child.nextSibling) {
            child.style.left = (child.sTime - this.drawStart) / scale + 1 + "px";
        }
        this.div.style.left = this.gantt.getTimePanelPosition(this.drawStart) + "px";
        this.scale = scale;
    }
    var endTime = startTime + this.div.offsetWidth * scale;//需要显示的结束时间
    var calDiv = this.div;
    var osTime = calDiv.firstChild ? calDiv.firstChild.sTime : Number.MAX_VALUE;
    var oeTime = calDiv.lastChild ? calDiv.lastChild.eTime : Number.MIN_VALUE;
    if (startTime > (calDiv.firstChild ? calDiv.firstChild.eTime : Number.MAX_VALUE))//说明左边可能有多余的内容，删除
    {
        while (calDiv.firstChild && calDiv.firstChild.eTime < startTime) {
            SFEvent.deposeNode(calDiv.firstChild);
        }
        osTime = calDiv.firstChild ? calDiv.firstChild.sTime : Number.MAX_VALUE
    }
    if ((calDiv.lastChild ? calDiv.lastChild.sTime : Number.MIN_VALUE) > endTime)//说明右边可能有多余的内容，删除
    {
        while (calDiv.lastChild && calDiv.lastChild.sTime > endTime) {
            SFEvent.deposeNode(calDiv.lastChild);
        }
        oeTime = calDiv.lastChild ? calDiv.lastChild.eTime : Number.MIN_VALUE
    }
    if (startTime < osTime)//说明左侧需要添加内容
    {
        this.addSegmentation(startTime, Math.min(osTime, endTime), cal, calDiv, scale, -1);
        osTime = calDiv.firstChild ? calDiv.firstChild.sTime : Number.MAX_VALUE;
        oeTime = calDiv.lastChild ? calDiv.lastChild.eTime : Number.MIN_VALUE;
    }
    if (oeTime < endTime)//说明左侧需要添加内容
    {
        this.addSegmentation(Math.max(oeTime, startTime), endTime, cal, calDiv, scale, 1);
    }
}
/**
@private
显示指定范围内的日历分隔线
@param {Number} scale 当前甘特图的缩放比例
@param {Date} startTime 显示范围的起始时间
@param {Date} endTime 显示范围的结束时间
@param {SFGanttCalendarItem} cal 日历项
@param {HtmlElement} calDiv 显示日历分隔线的层
@param {Number} scale 当前甘特图的缩放比例
@param {Number} position 在calDiv之中添加的方式，-1代表在前面添加，1代表在后面添加
*/
SFGanttTimeSegmentation.prototype.addSegmentation = function (startTime, endTime, cal, calDiv, scale, position) {
    var sTime = parseInt(cal.getFloorTime(new Date(startTime)).valueOf());//需要显示的单位起始时间
    var lastAdd = null;
    while (sTime < endTime) {
        var eTime = parseInt(cal.getNextTime(new Date(sTime)).valueOf());
        var div = this.div.ownerDocument.createElement("div");
        SFGlobal.setProperty(div, { sTime: sTime, eTime: eTime });
        SFGlobal.setProperty(div.style, { position: 'absolute', left: (sTime - this.drawStart) / scale + 1 + 'px', top: '0px', width: '0px', height: '100%', borderLeft: 'dotted 1px #808080' });
        SFGlobal.setProperty(div.style, this.lineStyle);
        if (position == -1) {
            if (lastAdd == null) {
                calDiv.insertBefore(div, calDiv.firstChild);
            }
            else if (lastAdd.nextSibling == null) {
                calDiv.appendChild(div);
            }
            else {
                calDiv.insertBefore(div, lastAdd.nextSibling);
            }
        }
        else {
            calDiv.appendChild(div);
        }
        lastAdd = div;
        sTime = eTime;
    }
}
/**
@private
清除所有已绘制的日历分隔线
*/
SFGanttTimeSegmentation.prototype.clear = function () {
    SFEvent.deposeNode(this.div, true);
}
window.SFGanttTimeSegmentation = SFGanttTimeSegmentation;
/**
这是一个甘特图功能控件，本控件是用来显示甘特图的工作时间阴影的控件，依赖日历控件SFGanttCalendarControl、布局控件SFGanttLayoutControl
@private
@extends SFGanttControl
@class
*/
function SFGanttWorkingMask() {
}
SFGanttWorkingMask.prototype = new window.SFGanttControl();
/**
@private
功能控件的初始化，每个插件的实现都会重写此方法
@param {SFGantt} gantt
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttWorkingMask.prototype.initialize = function (gantt) {
    if (gantt.disableWorkingMask || !gantt.getTimePanel || !gantt.getCalList) { return false; }
    var container = gantt.getTimePanel();
    if (!container) { return false; }
    SFConfig.applyProperty(this, gantt.config.getConfigObj("SFGanttWorkingMask"));
    this.gantt = gantt;
    //分割条的任务显示层
    var div = this.div = gantt.container.ownerDocument.createElement('div');
    SFGlobal.setProperty(div.style, { position: 'absolute', fontSize: '0px', left: '0px', top: '0px', height: '100%', width: '100%', zIndex: 10 });
    container.appendChild(div);
    this.listeners = [
        SFEvent.bind(gantt, "initialize", this, this.onGanttInit),
        SFEvent.bind(gantt, "layoutchange", this, this.reDraw),
        SFEvent.bind(gantt, "afterscalechange", this, this.reDraw),
        SFEvent.bind(gantt, "move", this, this.reDraw)
    ];
    this.reDraw();
    return true;
}
/**
@private
在甘特图初始化时初始化工作日历
*/
SFGanttWorkingMask.prototype.onGanttInit = function () {
    this.calendar = this.gantt.getData().getCalendar();
    this.reDraw();
}
/**
@private
重绘工作时间阴影
*/
SFGanttWorkingMask.prototype.reDraw = function () {
    var gantt = this.gantt, scale = gantt.getScale(), startTime = gantt.getStartTime(), cals = gantt.getCalList();
    if (!cals || !cals[0] || !this.calendar) { return; }
    this.showSegmentations(gantt.getScale(), gantt.getStartTime().valueOf(), cals[0]);
}
/**
@private
显示工作时间阴影
@param {Number} scale 当前甘特图的缩放比例
@param {Date} startTime 当前甘特图的起始时间
@param {SFGanttCalendarItem} cal 日历项
*/
SFGanttWorkingMask.prototype.showSegmentations = function (scale, startTime, cal) {
    if (this.cal != cal || !this.drawStart || Math.abs(startTime - this.drawStart) / scale > 10000)//如果缩放等级已经变化或者距离绘制起点像素值大于1万像素
    {
        this.clear();
        SFGlobal.setProperty(this, { scale: scale, drawStart: startTime, cal: cal });
        this.div.style.left = this.gantt.getTimePanelPosition(startTime) + "px";
    }
    if (this.scale != scale) {
        for (var child = this.div.firstChild; child; child = child.nextSibling) {
            SFGlobal.setProperty(child.style, {
                left: (child.sTime - this.drawStart) / scale + 1 + "px",
                width: (child.eTime - child.sTime) / scale + "px"
            })
        }
        this.div.style.left = this.gantt.getTimePanelPosition(this.drawStart) + "px";
        this.scale = scale;
    }
    var endTime = startTime + this.div.offsetWidth * scale;//需要显示的结束时间
    var calDiv = this.div;

    var osTime = calDiv.firstChild ? calDiv.firstChild.sTime : Number.MAX_VALUE;
    var oeTime = calDiv.lastChild ? calDiv.lastChild.eTime : Number.MIN_VALUE;
    if (startTime > (calDiv.firstChild ? calDiv.firstChild.eTime : Number.MAX_VALUE))//说明左边可能有多余的内容，删除
    {
        while (calDiv.firstChild && calDiv.firstChild.eTime < startTime) {
            SFEvent.deposeNode(calDiv.firstChild);
        }
        osTime = calDiv.firstChild ? calDiv.firstChild.sTime : Number.MAX_VALUE
    }
    if ((calDiv.lastChild ? calDiv.lastChild.sTime : Number.MIN_VALUE) > endTime)//说明右边可能有多余的内容，删除
    {
        while (calDiv.lastChild && calDiv.lastChild.sTime > endTime) {
            SFEvent.deposeNode(calDiv.lastChild);
        }
        oeTime = calDiv.lastChild ? calDiv.lastChild.eTime : Number.MIN_VALUE
    }
    if (startTime < osTime)//说明左侧需要添加内容
    {
        this.addMask(startTime, Math.min(osTime, endTime), cal, calDiv, scale, -1);
        osTime = calDiv.firstChild ? calDiv.firstChild.sTime : Number.MAX_VALUE;
        oeTime = calDiv.lastChild ? calDiv.lastChild.eTime : Number.MIN_VALUE;
    }
    if (oeTime < endTime)//说明右侧需要添加内容
    {
        this.addMask(Math.max(oeTime, startTime), endTime, cal, calDiv, scale, 1);
    }
}
//添加指定范围内的日历层
SFGanttWorkingMask.prototype.addMask = function (startTime, endTime, cal, calDiv, scale, position) {
    var sTime = parseInt(cal.getFloorTime(new Date(startTime)).valueOf()), doc = this.div.ownerDocument;//需要显示的单位起始时间
    var lastAdd = null;
    while (sTime < endTime) {
        var eTime = parseInt(cal.getNextTime(new Date(sTime)).valueOf());
        var workTime = this.calendar.getWorkTime(new Date(sTime));
        if (workTime[0] >= eTime.valueOf()) {
            var div = doc.createElement("div");
            SFGlobal.setProperty(div, { sTime: sTime, eTime: eTime });
            SFGlobal.setProperty(div.style, { position: 'absolute', left: (sTime - this.drawStart) / scale + 1 + 'px', top: '0px', width: (eTime - sTime) / scale + 'px', height: '100%' });
            this.gantt.setBackgroundImage(div, "map_mask");
            if (position == -1) {
                if (lastAdd == null) {
                    calDiv.insertBefore(div, calDiv.firstChild);
                }
                else if (lastAdd.nextSibling == null) {
                    calDiv.appendChild(div);
                }
                else {
                    calDiv.insertBefore(div, lastAdd.nextSibling);
                }
            }
            else {
                calDiv.appendChild(div);
            }
            lastAdd = div;
        }
        sTime = eTime;
    }
}
/**
@private
清除所有已绘制的工作时间阴影
*/
SFGanttWorkingMask.prototype.clear = function () {
    SFEvent.deposeNode(this.div, true);
}
window.SFGanttWorkingMask = SFGanttWorkingMask;
/**
甘特图上的时间线对象
@extends SFGanttControl
@param {Date} time 时间
@param {Bool} dragable 是否允许拖动该时间线
@param {Json} style 时间线的显示CSS样式
@class
*/
function SFGanttTimeLine(time, dragable, style) {
    SFGlobal.setProperty(this, { time: time, dragable: dragable, style: style });
}
SFGanttTimeLine.prototype = new window.SFGanttControl();
/**
@private
功能控件的初始化，每个插件的实现都会重写此方法
@param {SFGantt} gantt
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttTimeLine.prototype.initialize = function (gantt) {
    if (!gantt.getTimePanel) { return false; }
    var container = gantt.getTimePanel()
    if (!container) { return false; }
    gantt.addTimeLine = SFEvent.getCallback(gantt, SFGanttTimeLine.addTimeLine);
    if (!this.time) { return false; }
    this.gantt = gantt;
    SFConfig.applyProperty(this, gantt.config.getConfigObj("SFGanttTimeLine"));
    //分割条的任务显示层
    var div = this.div = gantt.container.ownerDocument.createElement('div');
    SFGlobal.setProperty(div.style, this.lineStyle);
    SFGlobal.setProperty(div.style, this.style);
    SFGlobal.setProperty(div.style, { position: 'absolute', fontSize: '0px', left: '-1px', top: '0px', height: '100%', zIndex: 200 });
    container.appendChild(div);
    this.listeners = [
        SFEvent.bind(gantt, "afterscalechange", this, this.onMove)
    ];
    if (this.dragable) {
        SFGlobal.setCursor(div, "col-resize");
        this.listeners.push(SFDragObject.setup(div, SFEvent.getCallback(this, this.onDrag), { container: container }));
    }
    this.onMove();
    return true;
}
/**
@private
在甘特图移动时移动时间线
*/
SFGanttTimeLine.prototype.onMove = function () {
    var gantt = this.gantt, scale = gantt.getScale(), startTime = gantt.getStartTime();
    if (!scale || !startTime) { return; }
    this.div.style.left = gantt.getTimePanelPosition(this.time) + 'px';
}
/**
设置时间线的时间，实际上就是移动时间线
@param {Date} time
*/
SFGanttTimeLine.prototype.moveTo = function (time) {
    this.time = time;
    this.onMove();
}
/**
@private
在拖拽时间线的过程之中持续触发的函数
@param {Number[]} sp 拖拽起始点位置
@param {Number[]} lp 拖拽当前点位置
@param {String} type 当前触发的类型
*/
SFGanttTimeLine.prototype.onDrag = function (sp, lp, type) {
    if (type == "start") { this.dragStart = this.time.valueOf(); }
    var gantt = this.gantt, time = new Date(this.dragStart + (lp[0] - sp[0]) * this.gantt.getScale())
    this.moveTo(time);
    if (gantt.getTooltip) {
        var tooltip = gantt.getTooltip(), tpPosition = SFEvent.getPageOffset(gantt.getTimePanel(), gantt.getContainer());
        tooltip.setContent(this.div.ownerDocument.createTextNode(SFGlobal.getDateString(time, this.tooltipFormat)));
        tooltip.show([lp[0] + tpPosition[0], lp[1] + tpPosition[1]]);
    }
}
/**
在甘特图上显示一条时间线，可以添加多条
@name SFGantt.prototype.addTimeLine
@function
@param {Date} time 时间
@param {Bool} dragable 是否允许拖动该时间线
@param {Json} style 一个简单对象，包含该时间线显示的样式，例如{borderStyle:'dashed',borderColor:'green'}
@returns {SFGanttTimeLine}
*/
SFGanttTimeLine.addTimeLine = function (time, dragable, style) {
    var line = new SFGanttTimeLine(time, dragable, style);
    this.addControl(line);
    return line;
}
window.SFGanttTimeLine = SFGanttTimeLine;
function SFGanttNetworkControl(config) {
    var container = this.container = document.createElement("div");
    SFGlobal.setProperty(container.style, { position: "absolute", overflow: 'auto', zIndex: 100, width: '100%', height: '100%' });
    var div = this.div = document.createElement("div");
    this.zoom = 1;
    this.zoomUnit = 1.6;
    SFGlobal.setProperty(div.style, { position: "relative" });
    container.appendChild(div);
    SFGlobal.setProperty(this, config);
}
SFGanttNetworkControl.prototype = new window.SFGanttControl();
/**
@private
功能控件的初始化，每个插件的实现都会重写此方法
@param {SFGantt} gantt
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttNetworkControl.prototype.initialize = function (gantt) {
    SFConfig.applyProperty(this, gantt.config.getConfigObj("SFGanttNetworkControl"));
    this.taskStyles = gantt.config.getConfigObj("SFGantt/taskStyle");
    this.linkStyles = gantt.config.getConfigObj("SFGantt/linkStyle");
    /**
    网络图默认的线条样式
    @name SFConfig.configItems.SFGanttNetworkControl_linkStyle
    @type String
    @default RedNormal
    */
    this.gantt = gantt;
    var div = this.div;
    if (gantt.setContextMenu) { gantt.setContextMenu(div, function (menu) { menu.type = "network"; return true }); }
    /**
    网络图在任务信息框之中显示的字段列表，所有系统集成任务列的定义请参看{@link SFGanttField.taskFields}
    @name SFConfig.configItems.SFGanttNetworkControl_taskFields
    @type String
    @default name,Start,Finish,Resource
    */
    this.taskFields = this.taskFields ? SFGanttField.getTaskFields(this.taskFields.split(",")) : null;
    /**
    网络图在任务鼠标提示框之中显示的字段列表，所有系统集成任务列的定义请参看{@link SFGanttField.taskFields}
    @name SFConfig.configItems.SFGanttNetworkControl_taskNoticeFields
    @type String
    @default name,UID,Duration,Resource,Notes
    */
    this.taskNoticeFields = this.taskNoticeFields ? SFGanttField.getTaskFields(this.taskNoticeFields.split(",")) : null;
    gantt.showMap = SFEvent.getCallback(this, this.draw);
    gantt.zoomIn = SFEvent.getCallback(this, this.zoomIn);
    gantt.zoomOut = SFEvent.getCallback(this, this.zoomOut);
    gantt.container.appendChild(this.container);
    if (this.taskNoticeFields && gantt.setTooltip) {
        gantt.setTooltip(div, SFEvent.getCallback(this, this.getTooltip))
    }
    this.listeners = [
        SFEvent.bind(gantt, "taskchange", this, this.updateTask),
        SFEvent.bind(div, "mousedown", this, this.onMouseDown),
        SFEvent.bind(div, "click", this, this.onClick),
        SFEvent.bind(div, "dblclick", this, this.onDblClick)
    ];
    SFDragObject.setup(this.div, SFEvent.getCallback(this, this.onDrag), { interval: 32, container: this.container });
}
SFGanttNetworkControl.prototype.updateTask = function (task, changedFields) {
    if (task._div) {
        this.drawTask(task);
    }
}
SFGanttNetworkControl.prototype.drawTaskNode = function (div, task) {
    SFEvent.deposeNode(div, true);
    var taskStyle = this.getTaskStyle(task);
    for (var i = 0; i < this.taskFields.length; i++) {
        var field = this.taskFields[i], span = document.createElement("div");
        field.showBody(span, task, this);
        if (field.bodyData == "Name") {
            SFGlobal.setProperty(span.style, { fontWeight: 'bolder' });
        }
        else {
            span.insertBefore(document.createTextNode(field.headText ? (field.headText + ":") : ""), span.firstChild);
        }
        SFGlobal.setProperty(span.style, { left: '5%', width: '90%', height: '18px', lineHeight: '18px' });
        SFGlobal.setProperty(span.style, taskStyle.networkLineStyle);
        SFGlobal.setProperty(span.style, { position: 'relative', overflow: 'hidden' });
        div.appendChild(span);
    }
}
/**
@private
应用行的样式
@param {HtmlElement} row html的一个表格行
@param {SFDataElement} element 该行对应的元素，将根据元素的属性来选择样式
*/
SFGanttNetworkControl.prototype.applyStyle = function (div, element) {
    var taskStyles = this.getTaskStyle(element);
    if (taskStyles) {
        var style = element.Selected ? taskStyles.listSelectedStyle : taskStyles.listStyle;
        if (style) {
            SFGlobal.setProperty(div.style, style);
            return;
        }
    }
}
/**
@private
获得当前鼠标事件对应的行
@param {Event} e 浏览器鼠标事件
@returns {HtmlElement} 对应的行HTML元素
*/
SFGanttNetworkControl.prototype.getEventNode = function (e) {
    var target = e.target;
    while (target && !target._task) { target = target.parentNode; }
    return target;
}
/**
@private
在列鼠标被按下的时候执行的操作,即开始拖动
@param {Event} e 浏览器鼠标事件
*/
SFGanttNetworkControl.prototype.onMouseDown = function (e) {
    var target = this.getEventNode(e);
    if (!target) { return; }
    var task = target._task;
    SFEvent.trigger(this.gantt, "taskmousedown", [task, e]);
}
/**
@private
在列表被单击的时候执行的响应
@param {Event} e 浏览器鼠标事件
*/
SFGanttNetworkControl.prototype.onClick = function (e) {
    var target = this.getEventNode(e), gantt = this.gantt;
    if (!target) { return; }
    //	if(!target){if(gantt.clearSelectedElement){gantt.clearSelectedElement();}return;}
    var task = target._task;
    SFEvent.trigger(gantt, "taskclick", [task, e]);
}
/**
@private
在列表被双击时执行的响应
@param {Event} e 浏览器鼠标事件
*/
SFGanttNetworkControl.prototype.onDblClick = function (e) {
    var target = this.getEventNode(e);
    if (!target) { return; }
    var task = target._task;
    SFEvent.trigger(this.gantt, "taskdblclick", [task, "network"]);
}
/**
根据浏览器的支持得到对应的Canvas
@private
@returns {__MapGraphics}
*/
SFGanttNetworkControl.prototype.getGraphics = function () {
    var graphics = [SFGraphicsSvg, SFGraphicsVml, SFGraphicsCanvas, SFGraphicsDiv];
    for (var i = 0; i < graphics.length; i++) {
        if (graphics[i].isSupport()) {
            return new graphics[i]();
        }
    }
    return new SFGraphics(true);
}
/**
鼠标在链接上滑过时显示提示信息
@private
@param {SFGanttTooltipControl} tooltip 甘特图的实时提示控件
@param {Event} e 浏览器的鼠标事件
@returns {Bool} 如果需要显示提示，返回true,否则返回false
*/
SFGanttNetworkControl.prototype.getTooltip = function (tooltip, e) {
    var target = this.getEventNode(e);
    if (!target) { return false; }
    var task = target._task, doc = this.gantt.container.ownerDocument;
    if (tooltip.bindObject == task) { return false; }
    var table = doc.createElement("table");
    table.width = 300;
    table.style.fontSize = "12px";
    var row = table.insertRow(-1);
    var cell = row.insertCell(-1);
    SFGlobal.setProperty(cell, { align: 'center', colSpan: 2, noWrap: true });
    cell.appendChild(doc.createTextNode("任务"));
    for (var i = 0; i < this.taskNoticeFields.length; i++) {
        row = table.insertRow(-1);
        cell = row.insertCell(-1);
        SFGlobal.setProperty(cell, { align: 'left', noWrap: true });
        this.taskNoticeFields[i].showHead(cell);
        cell = row.insertCell(-1);
        SFGlobal.setProperty(cell, { align: 'left', noWrap: true });
        this.taskNoticeFields[i].showBody(cell, task, this);
    }
    tooltip.bindObject = task;
    tooltip.setContent(table);
    return true;
}
SFGanttNetworkControl.prototype.onDrag = function (sp, lp, type) {
    var parentNode = this.container;
    if (type == "start") {
        this.dsp = [parentNode.scrollLeft, parentNode.scrollTop]
    }
    parentNode.scrollLeft = this.dsp[0] - lp[0] + sp[0]
    parentNode.scrollTop = this.dsp[1] - lp[1] + sp[1]
}
SFGanttNetworkControl.prototype.searchLink = function (task, dNode, index, maxLevel) {
    var pTasks = task.getPredecessorTasks()
    for (var i = pTasks.length - 1; i >= 0; i--) {
        if (index == i) { continue; }
        if (pTasks[i] == dNode) { return true; }
        if (task._index >= dNode._index) { return false; }
        if (maxLevel > 0 && this.searchLink(pTasks[i], dNode, -1, maxLevel - 1)) {//如果找到了替代链接
            return true;
        }
    }
    return false;
}
SFGanttNetworkControl.prototype.findLongest = function (index, list, array) {
    if (index > this.maxLevel) { return array; }
    for (var i = 0; i < list.length; i++) {
        var task = list[i], pTasks = task.getPredecessorTasks(), result;
        for (var j = pTasks.length - 1; j >= 0; j--) {
            if (pTasks[j]._level != index + 1) {
                pTasks.splice(j, 1);
            }
        }
        result = this.findLongest(index + 1, pTasks, array.concat(task));
        if (result) { return result; }
    }
    return null;
}
SFGanttNetworkControl.prototype.findLonger = function (list, array) {
    var maxLen = array.length, maxList = array;
    for (var i = 0; i < list.length; i++) {
        var task = list[i], pTasks = task.getPredecessorTasks(), result;
        //先过滤反向的任务，在此过程之中不考虑
        for (var j = pTasks.length - 1; j >= 0; j--) {
            if (pTasks[j]._level <= task._level) { pTasks.splice(j, 1); }
        }
        if (list[i]._index !== undefined) {//如果该任务已经分配位置，则不能使用，只能在后续的任务之中查找
            //先结束当前链
            if (array.length > maxLen) {
                maxLen = array.length;
                maxList = array;
            }
            //再在后续任务之中查找
            result = this.findLonger(pTasks, []);
            if (result.length > maxLen) {
                maxLen = result.length;
                maxList = result;
            }
        }
        else {//否则将当前任务加入到链条
            result = this.findLonger(pTasks, array.concat(task));
            if (result.length > maxLen) {
                maxLen = result.length;
                maxList = result;
            }
        }
    }
    return maxList;
}
//进行数据的统计和初始化
SFGanttNetworkControl.prototype.initData = function () {
    var data = this.gantt.data, taskList = this.taskList = {}, tasks = this.tasks = [], taskCount = 0;
    //初始化各个任务的级别
    for (var task = data.getRootTask(); task; task = task.getNext()) {
        if (task.Summary) { continue; }
        task._level = 0;
        tasks.push(task);
        taskCount++;
    }
    //计算各个之间的级别
    var times, maxLevel = 0, type = this.type;
    for (times = this.maxTimes; times > 0; times--) {
        var changed = false;
        for (var task = data.getRootTask(); task; task = task.getNext()) {
            if (task.Summary) { continue; }
            var pTasks = task.getPredecessorTasks();
            for (var i = 0; i < pTasks.length; i++) {
                if (type == "Finish") {
                    if (task._level + 1 > pTasks[i]._level) {
                        pTasks[i]._level = task._level + 1;
                        maxLevel = Math.max(maxLevel, pTasks[i]._level);
                        changed = true
                    }
                }
                else {
                    if (pTasks[i]._level + 1 > task._level) {
                        task._level = pTasks[i]._level + 1;
                        maxLevel = Math.max(maxLevel, task._level);
                        changed = true
                    }
                }
            }
        }
        if (!changed) { break; }
    }
    if (type != "Finish") {
        for (var task = data.getRootTask(); task; task = task.getNext()) {
            if (task.Summary) { continue; }
            task._level = maxLevel - task._level;
        }
    }
    this.maxLevel = maxLevel;
    if (times == 0) { alert('计算次数不够，可能存在循环指向1'); }
    //筛选重复链接
    for (var task = data.getRootTask(); task; task = task.getNext()) {
        if (task.Summary) { continue; }
        var pTasks = task.getPredecessorTasks(), levelOffset;
        for (var i = pTasks.length - 1; i >= 0; i--) {
            levelOffset = pTasks[i]._level - task._level + 1;
            if (levelOffset <= 0) { continue; }//如果级别正好相差1，则认为肯定不是冗余链接
            if (this.searchLink(task, pTasks[i], i, levelOffset - 2)) {//如果找到了替代链接
                var link = SFGlobal.findInArray(pTasks[i].getSuccessorLinks(), task, function (a, b) { return a.getSuccessorTask() == b });
                data.deleteLink(link);
            }
        }
    }
    //生成每个级别的任务数组
    for (var task = data.getRootTask(); task; task = task.getNext()) {
        if (task.Summary) { continue; }
        if (!taskList[task._level]) { taskList[task._level] = [] }
        taskList[task._level].push(task);
    }
    //找到最长的链条,并将其position设置为0
    var longestList = this.findLongest(0, taskList[0], []);
    for (var i = 0; i < longestList.length; i++) {
        longestList[i]._index = 0;
    }
    //在剩下的任务之中找出次长链条，并将其position设置为1
    var engaged = {};
    var cLength;
    do {
        var longer = this.findLonger(taskList[0], []);
        cLength = longer.length;
        if (cLength < 2) { break; }
        //计算这个链表加上两侧之后的长度
        var sTasks = longer[0].getSuccessorTasks(), eTasks = longer[cLength - 1].getPredecessorTasks(), minLev = maxLevel, maxLev = 0;
        for (var i = 0; i < sTasks.length; i++) {
            var ind = sTasks[i]._index
            if (ind === undefined) { continue; }
            minLev = Math.min(minLev, ind);
        }
        if (sTasks.length == 0) { minLev = 0; }
        for (var i = 0; i < eTasks.length; i++) {
            var ind = eTasks[i]._index
            if (ind === undefined) { continue; }
            maxLev = Math.max(maxLev, ind);
        }
        if (eTasks.length == 0) { maxLev = maxLevel; }
        //根据长度来计算一个合适的显示位置
        var index;
        for (var k = 1; ; k++) {
            if (!engaged[k]) { engaged[k] = {} }
            var i;
            for (var i = minLev; i <= maxLevel; i++) {
                if (engaged[k][i]) {
                    break;
                }
            }
            if (i < maxLevel) { continue; }
            index = k;
            for (i = minLev; i <= maxLev; i++) { engaged[index][i] = 1; }
            break;
        }
        for (i = 0; i < cLength; i++) {
            longer[i]._index = index;
        }

    } while (cLength > 1)

    //剩下的index的值只要找到空位即可
    for (var i = 0; i <= maxLevel; i++) {
        var list = taskList[i];
        for (var j = 0; j < list.length; j++) {
            if (list[j]._index !== undefined) { continue; }
            var index;
            for (var k = 1; ; k++) {
                if (!engaged[k]) { engaged[k] = {} }
                if (engaged[k][i]) { continue; }
                engaged[k][i] = 1;
                index = k;
                break;
            }
            list[j]._index = index;
        }
    }
    //找到最大和最小的index的值
    var minIndex = 0, maxIndex = 0;
    for (var task = data.getRootTask(); task; task = task.getNext()) {
        if (task.Summary) { continue; }
        minIndex = Math.min(minIndex, task._index);
        maxIndex = Math.max(maxIndex, task._index);
    }
    this.maxIndex = maxIndex;
    this.minIndex = minIndex;
}
SFGanttNetworkControl.prototype.getNodePosition = function (node, dir) {
    /**
    网络图每个任务的整体宽度像素值(包含周边空白区)
    @name SFConfig.configItems.SFGanttNetworkControl_width
    @type Number
    @default 300
    */
    /**
    网络图每个任务的整体高度像素值(包含周边空白区)
    @name SFConfig.configItems.SFGanttNetworkControl_height
    @type Number
    @default 100
    */
    /**
    网络图每个任务的节点内容框宽度像素值
    @name SFConfig.configItems.SFGanttNetworkControl_nodeWidth
    @type Number
    @default 200
    */
    /**
    网络图每个任务的节点内容框高度像素值
    @name SFConfig.configItems.SFGanttNetworkControl_nodeHeight
    @type Number
    @default 78
    */
    var zoom = this.zoom, unitTop = this.height * zoom, unitLeft = this.width * zoom, num = this.maxIndex - this.minIndex + 1, nodeWidth = this.nodeWidth * zoom, nodeHeight = this.nodeHeight * zoom;
    if (dir == "x") {
        return { x: (this.maxLevel - node._level) * unitLeft + (unitLeft - nodeWidth) / 2, y: node._index * unitTop + (unitTop - nodeHeight) / 2, w: nodeWidth, h: nodeHeight };
    }
    else {
        return { x: node._index * unitLeft + (unitLeft - nodeWidth) / 2, y: (this.maxLevel - node._level) * unitTop + (unitTop - nodeHeight) / 2, w: nodeWidth, h: nodeHeight };
    }
}
SFGanttNetworkControl.indexOf = function (array, item) {
    if (!array) { return }
    for (var i = array.length - 1; i >= 0; i--) {
        if (array[i] == item) {
            return i;
        }
    }
}
SFGanttNetworkControl.prototype.draw = function () {
    if (!this.inited) { this.initData(); this.inited = true; }
    var data = this.gantt.data;
    var size = (this.dir == 'x') ? { x: this.width * (this.maxLevel + 1), y: this.height * (this.maxIndex - this.minIndex + 1) } : { x: this.width * (this.maxIndex - this.minIndex + 1), y: this.height * (this.maxLevel + 1) };
    SFGlobal.setProperty(this.div.style, { width: size.x * this.zoom + 'px', height: size.y * this.zoom + 'px' })
    for (var task = data.getRootTask(); task; task = task.getNext()) {
        if (task.Summary) { continue; }
        this.drawTask(task);
    }
}
/**
@private
根据任务返回任务应该使用的样式
@param {SFDataTask} task
@returns {Json} 任务的样式配置
*/
SFGanttNetworkControl.prototype.getTaskStyle = function (task) {
    var className = task.ClassName, taskStyles = this.taskStyles;
    /**
    网络图默认的任务显示样式
    @name SFConfig.configItems.SFGanttNetworkControl_taskStyle
    @type String
    @default TaskNormal
    */
    className = className && taskStyles[className] ? className : this.taskStyle;
    return taskStyles[className];
}
SFGanttNetworkControl.prototype.drawTask = function (task) {
    var div = task._div, position = this.getNodePosition(task, this.dir), zoom = this.zoom, taskStyle = this.getTaskStyle(task);
    if (!div) {
        div = task._div = document.createElement("div");
        div._task = task;
        SFGlobal.setProperty(div.style, taskStyle.networkStyle);
        SFGlobal.setProperty(div.style, { fontSize: "12px", wordBreak: "break-all", zIndex: 100, cursor: 'pointer' });
        this.div.appendChild(div);
    }
    this.applyStyle(div, task)
    var border = parseInt(div.style.borderWidth) || 0;
    SFGlobal.setProperty(div.style, { position: "absolute", width: (position.w - border * 2) + "px", height: (position.h - border * 2) + "px", left: position.x + "px", top: position.y + "px", overflow: "hidden", zIndex: 100 });
    var links = task.getPredecessorLinks();
    for (var j = links.length - 1; j >= 0; j--) {
        this.drawLink(links[j], zoom);
    }
    links = task.getSuccessorLinks();
    for (var j = links.length - 1; j >= 0; j--) {
        this.drawLink(links[j], zoom);
    }
    this.drawTaskNode(div, task);
}
SFGanttNetworkControl.prototype.drawLink = function (link, zoom) {
    /**
    网络图的显示方向，横向x,纵向y
    @name SFConfig.configItems.SFGanttNetworkControl_dir
    @type String
    @default "x"
    */
    /**
    网络图显示时是否将箭头线条合并使图看起来更简单
    @name SFConfig.configItems.SFGanttNetworkControl_combineLine
    @type Bool
    @default false
    */
    var task = link.SuccessorTask, dNode = link.PredecessorTask, className = link.ClassName, dir = this.dir, combineLine = this.combineLine;
    var position = this.getNodePosition(task, dir);
    /**
    网络图默认的线条样式
    @name SFConfig.configItems.SFGanttNetworkControl_linkStyle
    @type String
    @default RedNormal
    */
    className = className ? className : (this.linkFocusStyle && (task.Selected || dNode.Selected) ? this.linkFocusStyle : this.linkStyle);
    if (link._paths) {
        if (link._tag == className + "_" + zoom) { return; }
        var line, paths = link._paths
        while (line = paths.pop()) {
            SFEvent.deposeNode(line)
        }
        delete link._paths;
    }
    link._tag = className + "_" + zoom;
    var linkStyle = this.linkStyles[className], positionD = this.getNodePosition(dNode, dir), points = [];
    if (this.dir != "x") {
        var unit = Math.atan((dNode._index - task._index) / 2) / Math.PI;
        unit = unit * (1 - Math.atan(Math.abs(dNode._level - task._level - 1) / 2) / Math.PI * 2);
        var sp = { x: position.x + position.w * (combineLine ? 0.5 : (0.5 + unit)), y: position.y };
        var ep = { x: positionD.x + positionD.w * (combineLine ? 0.5 : (0.5 - unit)), y: positionD.y + positionD.h };
        /*
        if(ep.y>=sp.y)
        {
            ep.y-=positionD.h;
            if(ep.y>sp.y)
            {
                sp.y+=positionD.h;
            }
        }*/
        points.push(sp);
        if (sp.x != ep.x) {
            var offset = (this.height * zoom - position.h) * (combineLine ? 0.5 : (0.5 + unit));
            points.push({ x: sp.x, y: ep.y + offset });
            points.push({ x: ep.x, y: ep.y + offset });
        }
        points.push(ep);
    }
    else {
        var unit = Math.atan((dNode._index - task._index) / 2) / Math.PI;
        unit = unit * (1 - Math.atan(Math.abs(dNode._level - task._level - 1) / 2) / Math.PI * 2);
        var sp = { x: position.x, y: position.y + position.h * (combineLine ? 0.5 : (0.5 + unit)) };
        var ep = { x: positionD.x + positionD.w, y: positionD.y + positionD.h * (combineLine ? 0.5 : (0.5 - unit)) };
        points.push(sp);
        if (sp.y != ep.y) {
            var offset = (this.width * zoom - position.w) * (combineLine ? 0.5 : (0.5 + unit));
            points.push({ x: ep.x + offset, y: sp.y });
            points.push({ x: ep.x + offset, y: ep.y });
        }
        points.push(ep);
    }
    link._paths = this.drawLine(points, linkStyle);
}
SFGanttNetworkControl.prototype.drawLine = function (points, linkStyle) {
    var paths = [], len = points.length, gantt = this.gantt, color = linkStyle.color;
    for (var i = 1; i < len; i++) {
        var div = document.createElement('div');
        SFGlobal.setProperty(div.style, { borderColor: color, zIndex: 200 });
        SFGlobal.setProperty(div.style, linkStyle.lineStyle);
        SFGlobal.setProperty(div.style, { position: 'absolute', fontSize: "0px", borderWidth: '0px' });
        if (points[i - 1].x == points[i].x) {
            SFGlobal.setProperty(div.style, { borderRightWidth: '1px', height: Math.abs(points[i].y - points[i - 1].y) + 'px', width: 0 + 'px', left: (points[i].x - 1) + 'px', top: (Math.min(points[i].y, points[i - 1].y)) + 'px' });
            if (i == 1) {//显示上下箭头
                var top = points[i - 1].y > points[i].y ? (points[i - 1].y - 5) : points[i - 1].y;
                var img = gantt.createImage("arrow_" + (points[i - 1].y > points[i].y ? "down" : "up"), { color: color, position: [points[i - 1].x - 5, top] })
                SFGlobal.setProperty(img.style, { position: 'absolute', fontSize: "0px" });
                paths.push(img);
                this.div.appendChild(img);
            }
        }
        else if (points[i - 1].y == points[i].y) {
            SFGlobal.setProperty(div.style, { borderTopWidth: '1px', width: Math.abs(points[i].x - points[i - 1].x) + 'px', height: 0 + 'px', left: (Math.min(points[i].x, points[i - 1].x)) + 'px', top: (points[i].y) + 'px' });
            if (i == 1) {//显示左右箭头
                var left = points[i - 1].x > points[i].x ? (points[i - 1].x - 5) : points[i - 1].x;
                var img = gantt.createImage("arrow_" + (points[i - 1].x > points[i].x ? "right" : "left"), { color: color, position: [left, points[i].y - 4] })
                SFGlobal.setProperty(img.style, { position: 'absolute', fontSize: "0px" });
                paths.push(img);
                this.div.appendChild(img);
            }
        }
        this.div.appendChild(div);
        paths.push(div);
    }
    return paths;
}
SFGanttNetworkControl.prototype.scrollTo = function (position, point) {
    point = point || [0, 0];
    this.container.scrollLeft = position[0] * this.zoom - point[0]
    this.container.scrollTop = position[1] * this.zoom - point[1]
}
SFGanttNetworkControl.prototype.zoomIn = function (point) {
    var zoom = this.zoom, position = [(point[0] + (this.container.scrollLeft || 0)) / zoom, (point[1] + (this.container.scrollTop || 0)) / zoom]
    this.zoom *= this.zoomUnit;
    this.draw();
    this.scrollTo(position, point);
}
SFGanttNetworkControl.prototype.zoomOut = function (point) {
    var zoom = this.zoom, position = [(point[0] + (this.container.scrollLeft || 0)) / zoom, (point[1] + (this.container.scrollTop || 0)) / zoom]
    this.zoom /= this.zoomUnit
    this.draw();
    this.scrollTo(position, point);
}
window.SFGanttNetworkControl = SFGanttNetworkControl;

/**
这是一个甘特图功能控件，本控件用来实现任务横道图的绘制
@private
@extends SFGanttControl
@class
*/
function SFGantElementSeparator(config) {
    SFConfig.applyProperty(this, config);
}
SFGantElementSeparator.prototype = new window.SFGanttControl();
/**
@private
功能控件的初始化，每个插件的实现都会重写此方法
@param {SFGantt} gantt
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGantElementSeparator.prototype.initialize = function (gantt) {
    if (!gantt.getMapPanel) { return false; }
    SFGlobal.setProperty(this, {
        gantt: gantt
    });
    SFConfig.applyProperty(this, gantt.config.getConfigObj("SFGantElementSeparator"));
    if (!SFGantElementSeparator.listIndex) { SFGantElementSeparator.listIndex = 0; }
    this.proTag = "elementSeparator_" + (SFGantElementSeparator.listIndex++);
    //图表的任务显示层
    var doc = gantt.container.ownerDocument, elementsDiv = this.div = doc.createElement('div');
    SFGlobal.setProperty(this.div.style, { position: 'absolute', fontSize: '0px', left: '0px', top: '-1px', width: '100%', height: '100%', zIndex: 100 });
    var firstDiv = doc.createElement('div'), elementType = gantt.elementType.toLowerCase();
    SFGlobal.setProperty(firstDiv.style, { position: 'relative', padding: '0px', margin: '0px', border: '0px' });
    elementsDiv.appendChild(firstDiv);
    gantt.getMapPanel().className = "MapPanel"
    gantt.getMapPanel().appendChild(elementsDiv);
    this.listeners = [
        SFEvent.bind(gantt, "initialize", this, this.onInitialize),
        SFEvent.bind(gantt, "move", this, this.onMapMove),
        SFEvent.bind(gantt, elementType + "inview", this, this.drawElement),
        SFEvent.bind(gantt, elementType + "outview", this, this.clearElement),
        SFEvent.bind(gantt, elementType + "change", this, this.updateElement)
    ];
    this.onInitialize();
    return true;
}
/**
@private
通过调整空白元素的高度来保持和甘特图视图高度的一致
*/
SFGantElementSeparator.prototype.setViewTop = function () {
    var top = this.gantt.getViewTop();
    this.div.firstChild.style.height = top + "px";
}
/**
@private
通过调整空白元素的高度来保持和甘特图视图高度的一致
*/
SFGantElementSeparator.prototype.onMapMove = function (time) {
    this.div.style.left = this.gantt.getTimePanelPosition(time) + "px";
}
/**
@private
在地图初始化时初始化所有绘制项目
*/
SFGantElementSeparator.prototype.onInitialize = function () {
    var gantt = this.gantt, viewElements = gantt.getViewElements();
    //重新绘制所有视图内的任务
    for (var i = 0; i < viewElements.length; i++) {
        this.drawElement(viewElements[i], i);
    }
}
/**
@private
绘制指定的任务
@param {SFDataElement} element
@param {Number} viewIndex 该任务在当前视图任务中的索引
*/
SFGantElementSeparator.prototype.drawElement = function (element, viewIndex) {
    if (viewIndex == 0) { this.setViewTop(); }
    var gantt = this.gantt
    drawObj = gantt.getElementDrawObj(element),
        mapObj = drawObj[this.proTag] = this.div.ownerDocument.createElement('div'),
        childNodes = this.div.childNodes,
        height = gantt.getElementHeight(element);
    mapObj.style.cssText = "position:relative;width:200%;border-bottom:dotted 1px #808080;top:0px;left:-50%;height:" + (height - 1) + "px"
    if (viewIndex + 1 == childNodes.length) {
        this.div.appendChild(mapObj);
    }
    else {
        this.div.insertBefore(mapObj, childNodes[viewIndex + 1]);
    }
}
/**
@private
在任务发生变化时进行响应，检查并在需要时重绘任务
@param {SFDataElement} element
@param {String[]} changedFields 任务更新的属性名称列表
*/
SFGantElementSeparator.prototype.updateElement = function (element, changedFields) {
    if (!this.gantt.getElementDrawObj(element)) { return; }
    var drawObj = this.gantt.getElementDrawObj(element), mapObj = drawObj[this.proTag];
    if (!mapObj) { return; }
}
/**
@private
清除对指定任务的绘制
@param {SFDataElement} element
@param {Number} viewIndex 该任务在当前视图任务中的索引
*/
SFGantElementSeparator.prototype.clearElement = function (element, viewIndex) {
    if (viewIndex == 0) { this.setViewTop(); }
    var drawObj = this.gantt.getElementDrawObj(element);
    if (!drawObj) { return }
    var mapObj = drawObj[this.proTag];
    if (!mapObj) { return }
    SFEvent.deposeNode(mapObj);
    drawObj[this.proTag] = null;
}
window.SFGantElementSeparator = SFGantElementSeparator;
/**
甘特图图表绘制项目的基类，所有的图表绘制项目都继承此类
@private
@class
*/
function SFGanttMapItem() {
}
/**
@private
图表绘制项目的初始化，每个绘制项目的实现都会重写此方法
@param {SFGanttTasksMap} control
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttMapItem.prototype.initialize = function () { return false; };
/**
@private
开始绘制指定任务
@param {SFDataTask} task 正在绘制的任务
@param {Json} mapObj 绘制记录对象
@param {Number} scale 甘特图的缩放比例
*/
SFGanttMapItem.prototype.show = function () { };
/**
@private
在地图缩放比例变化时执行的响应
@param {SFDataTask} task 正在绘制的任务
@param {Json} mapObj 绘制记录对象
@param {Number} scale 甘特图的缩放比例
*/
SFGanttMapItem.prototype.onScale = function () { };
/**
@private
在任务属性变化时执行的响应
@param {SFDataTask} task 正在绘制的任务
@param {Json} mapObj 绘制记录对象
@param {String[]} changedFields 变化的属性数组
*/
SFGanttMapItem.prototype.onUpdate = function () { };
/**
@private
鼠标在任务上按下时执行的响应
@param {SFDataTask} task 正在绘制的任务
@param {Json} mapObj 绘制记录对象
@param {Event} e 浏览器鼠标事件
*/
SFGanttMapItem.prototype.onMouseDown = function () { };
/**
@private
鼠标在任务上划过时显示的显示实时提示信息
@param {SFDataTask} task 正在绘制的任务
@param {Json} mapObj 绘制记录对象
@param {SFGanttTooltipControl} tooltip 甘特图的实时提示控件
@param {Event} e 浏览器鼠标事件
*/
SFGanttMapItem.prototype.getTooltip = function () { };
/**
@private
清除对该任务的绘制
@param {SFDataTask} task 需要清除绘制的任务
@param {Json} mapObj 绘制记录对象
*/
SFGanttMapItem.prototype.remove = function () { }
/**
@private
销毁此对象以释放资源
*/
SFGanttMapItem.prototype.depose = function () { };
window.SFGanttMapItem = SFGanttMapItem;
/**
本绘制项实现一般任务横条的显示
@private
@extends SFGanttMapItem
@class
*/
function SFGanttMapBarNormal() {
}
SFGanttMapBarNormal.prototype = new window.SFGanttMapItem();
/**
@private
图表绘制项目的初始化，每个绘制项目的实现都会重写此方法
@param {SFGanttTasksMap} control
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttMapBarNormal.prototype.initialize = function (control) {
    SFGlobal.setProperty(this, { control: control, name: 'BarNormal' });
    return true;
};
/**
@private
开始绘制指定任务
@param {SFDataTask} task 正在绘制的任务
@param {Json} mapObj 绘制记录对象
@param {Number} scale 甘特图的缩放比例
*/
SFGanttMapBarNormal.prototype.show = function (task, mapObj, scale) {

    var start = task.Start.valueOf(), finish = task.Finish.valueOf();
    if (start >= finish || task.Milestone || task.Summary) { return; }
    var control = this.control, gantt = control.gantt, div = mapObj.taskDiv.ownerDocument.createElement('div');
    scale = scale ? scale : gantt.getScale();
    mapObj[this.name] = div;
    var height = control.taskHeight * (gantt.isTracking ? control.trackNormalHeightScale : 1);
    //div.style.cssText="position:absolute;font-size:0px;z-index:100;left:0px;width:"+((finish-start)/scale)+"px;top:"+Math.ceil(control.taskPadding/2+control.taskHeight*control.trackNormalTopScale)+"px;height:"+height+"px;cursor:move;";
    //inforcenter
    div.style.cssText = "position:absolute;font-size:0px;z-index:100;left:0px;width:" + ((finish - start) / scale) + "px;top:" + Math.ceil(control.taskPadding / 2 + control.taskHeight * control.trackNormalTopScale) + "px;height:" + height + "px;cursor:move;border-radius:1px";
    var taskStyle = control.getTaskStyle(task), bStyle = taskStyle.barStyle;
    if (bStyle) {
        if (bStyle.bgImage) {
            gantt.setBackgroundImage(div, bStyle.bgImage, { color: bStyle.bgColor });
        }
        SFGlobal.setProperty(div.style, bStyle);
    }
    mapObj.taskDiv.appendChild(div);
}
/**
@private
在任务属性变化时执行的响应
@param {SFDataTask} task 正在绘制的任务
@param {Json} mapObj 绘制记录对象
@param {String[]} changedFields 变化的属性数组
*/
SFGanttMapBarNormal.prototype.onUpdate = function (task, mapObj, changedFields) {
    var gantt = this.control.gantt, start = task.Start.valueOf(), finish = task.Finish.valueOf();
    if (start >= finish || task.Summary) { this.remove(task, mapObj); return; }
    var div = mapObj[this.name];
    if (!div) {
        this.show(task, mapObj);
    }
    else {
        if (SFGlobal.findInArray(changedFields, "ClassName")) {
            this.remove(task, mapObj);
            this.show(task, mapObj);
            return;
        }
        var style = div.style;
        if (SFGlobal.findInArray(changedFields, "Start") || SFGlobal.findInArray(changedFields, "Finish")) {
            div.style.left = "0px";
            style.width = ((finish - start) / gantt.getScale()) + "px";
        }
    }
}
/**
@private
鼠标在任务上划过时显示的显示实时提示信息
@param {SFDataTask} task 正在绘制的任务
@param {Json} mapObj 绘制记录对象
@param {SFGanttTooltipControl} tooltip 甘特图的实时提示控件
@param {Event} e 浏览器鼠标事件
*/
SFGanttMapBarNormal.prototype.getTooltip = function (task, mapObj, tooltip, e) {
    if (e.target != mapObj[this.name] || !this.control.taskNoticeFields) { return false; }
    var control = this.control;
    if (tooltip && tooltip.bindObject == task && tooltip.bindType == "Task") { return false; }
    var table = control.getTaskTooltipContent(task, control.tooltipTitle.task, control.taskNoticeFields.split(","));
    tooltip.bindObject = task;
    tooltip.bindType = "Task";
    tooltip.setContent(table);
    return true;
}
/**
@private
在地图缩放比例变化时执行的响应
@param {SFDataTask} task 正在绘制的任务
@param {Json} mapObj 绘制记录对象
@param {Number} scale 甘特图的缩放比例
*/
SFGanttMapBarNormal.prototype.onScale = function (task, mapObj, scale) {
    var div = mapObj[this.name];
    if (div) { div.style.width = ((task.Finish - task.Start) / scale) + "px"; }
}
/**
@private
鼠标在任务上按下时执行的响应
@param {SFDataTask} task 正在绘制的任务
@param {Json} mapObj 绘制记录对象
@param {Event} e 浏览器鼠标事件
*/
SFGanttMapBarNormal.prototype.onMouseDown = function (task, mapObj, e) {
    if (e.target != mapObj[this.name]) { return; }
    //下面这一句我不知道是干啥，可能是无效的语句
    SFEvent.trigger(mapObj[this.name], "click", []);
    new SFDragObject(this.control.div, SFEvent.getCallback(this, this.onMove), { interval: 32 }).onMouseDown(e);
}
/**
@private
在拖拽任务条的过程之中持续触发的函数
@param {Number[]} sp 拖拽起始点位置
@param {Number[]} lp 拖拽当前点位置
@param {String} type 当前触发的类型
*/
SFGanttMapBarNormal.prototype.onMove = function (sp, lp, type) {
    var control = this.control, gantt = control.gantt, task = control.dragTask, mapObj = gantt.getElementDrawObj(task)[control.proTag];
    var span = [lp[0] - sp[0], lp[1] - sp[1]]
    if (!control.dragType) {
        if (Math.sqrt(Math.pow(span[0], 2) + Math.pow(span[1], 2)) < 5) { return; }
        if (span[0] == 0 || span[1] / span[0] > 2 && !control.gantt.readOnly && control.gantt.data.canAddLink(task) && !control.gantt.disableAddLink && !control.disableDragAddLink) {
            control.dragType = "Link";
            control.startHeight = mapObj.taskDiv.offsetTop;
            //从这里开始设置拖动时候现实的提示信息
            var link = { Type: 1, PredecessorTask: task };
            control.dragLink = link;
            if (gantt.getTooltip) {
                var tooltip = gantt.getTooltip();
                gantt.getTooltip().setEnable(false);
                tooltip.setContent(control.getLinkTooltipContent(link));
                tooltip.show([0, 0]);
            }
            mapObj[this.name].style.borderStyle = "dashed";
        }
        else if ((span[1] == 0 || span[0] / span[1] > 2) && !gantt.readOnly && task.canSetProperty("Start") && !control.gantt.disableUpdateTask && !control.disableDragMoveTask) {
            control.dragType = "Start";
            if (gantt.getTooltip) {
                var tooltip = gantt.getTooltip();
                tooltip.setContent(control.getTaskTooltipContent(task, control.tooltipTitle.task, ["Start", "Finish"]));
                gantt.getTooltip().setEnable(false);
                var position = SFEvent.getPageOffset(mapObj.taskDiv, gantt.container);
                position[1] += gantt.getElementDrawObj(task).height;
                tooltip.show(position);
            }
            /** 
                @event
                @name SFGantt#taskbardragstart
                @private
                @description 在甘特图的任务条拖动过程开始时触发，没有地方在使用
                @param {SFDataTask} task 被拖动的任务
             */
            SFEvent.trigger(gantt, "taskbardragstart", [task]);
        }
        else { return; }
    }
    if (control.dragType == "Start") {
        var offset = span[0] * gantt.getScale();
        var start = new Date(task.Start.valueOf() + offset), finish = new Date(task.Finish.valueOf() + offset);
        if (type != "end") {
            //检查是不是到达了区域的边缘
            var left = lp[0] + gantt.getMapPanel().offsetLeft;
            if (left <= 0 || left > gantt.getLayout("mapBody").offsetWidth)//如果鼠标拖拽到了左侧边界
            {
                this.dmDir = (left <= 0) ? -1 : 1;
                this.lastOffset = span[0];
                if (!this.dmt) { this.dmt = window.setInterval(SFEvent.getCallback(this, this.onTime), 32); }
            }
            else {
                if (this.dmt) {
                    window.clearInterval(this.dmt);
                    delete this.dmt;
                }
            }
            //调整位置
            mapObj[this.name].style.left = gantt.getMapPanelPosition(start) - gantt.getTimePanelPosition(task.Start) + "px";
            if (gantt.getTooltip) {
                gantt.getTooltip().setContent(control.getTaskTooltipContent({ Start: start, Finish: finish }, control.tooltipTitle.task, ["Start", "Finish"]));
                gantt.getTooltip().setEnable(false);
            }
        }
        else {
            if (this.dmt) {
                window.clearInterval(this.dmt);
                delete this.dmt;
            }
            if (task.canSetProperty("Finish", finish) && task.canSetProperty("Start", start)) {
                task.setProperty("Finish", finish);
                task.setProperty("Start", start);
                /** 
                    @event
                    @name SFGantt#taskbardragend
                    @private
                    @description 在甘特图的任务条拖动过程结束时触发，似乎已经过期，没有地方在使用
                    @param {SFDataTask} task 被拖动的任务
                 */
            }
            else {//如果不能设置，则恢复
                mapObj[this.name].style.left = "0px";
            }
            SFEvent.trigger(gantt, "taskbardragend", [task]);
            if (gantt.getTooltip) { gantt.getTooltip().setEnable(true); }
            delete control.dragType
        }
    }
    else {
        //清除所有线条
        if (control.dragFlagLine) { SFEvent.deposeNode(control.dragFlagLine); }
        if (type != "end") {
            var offset = SFEvent.getPageOffset(mapObj.taskDiv, control.div);
            var points = [];
            points.push([sp[0], sp[1]]);
            points.push([lp[0], lp[1]]);
            //开始绘制线条
            var minX = Number.MAX_VALUE, minY = Number.MAX_VALUE, maxX = 0, maxY = 0;
            for (var i = 0; i < points.length; i++) {
                minX = Math.min(minX, points[i][0])
                minY = Math.min(minY, points[i][1])
                maxX = Math.max(maxX, points[i][0])
                maxY = Math.max(maxY, points[i][1])
            }
            var graphics = this.getGraphics();
            control.div.appendChild(graphics.div);
            graphics.setLineColor("#000000")
            graphics.setLineWeight(1);
            graphics.setPosition({ x: minX, y: minY });
            graphics.start({ x: 0, y: 0 }, 1, { x: maxX - minX, y: maxY - minY });
            graphics.moveTo({ x: points[0][0] - minX, y: points[0][1] - minY });
            for (var i = 1; i < points.length; i++) {
                graphics.lineTo({ x: points[i][0] - minX, y: points[i][1] - minY });
            }
            graphics.finish();
            control.dragFlagLine = graphics.div;
            //在这里计算当前拖动到了哪个任务上
            var distance = lp[1] - control.startHeight;
            var t = task;
            if (distance < 0) { t = t.getPreviousViewTask(); }
            //首先通过循环找到对应纵向位置的第一个任务
            while (t) {
                var nextDis = distance + (distance < 0 ? 1 : -1) * gantt.getElementHeight(t);
                if (distance * nextDis <= 0) { break; }
                t = distance > 0 ? t.getNextViewTask() : t.getPreviousViewTask();
                distance = nextDis;
            }
            //在通过时间找到横向对应的任务
            var eTime = gantt.getTimeByMapPanelPosition(lp[0]);
            while (t) {
                if (t.Start <= eTime && eTime <= t.Finish) { break; }
                t = distance > 0 ? t.getNextViewTask() : t.getPreviousViewTask();
                if (gantt.getElementHeight(t) > 0) { t = null; }
            }
            if (t == task) { t = null; }
            //在这里判断是不是正好处在该甘特条上，如果不是，则退出
            if (t) {
                var objSpan = gantt.getElementDrawObj(t)[control.proTag].taskDiv;
                var objOffset = SFEvent.getPageOffset(objSpan, control.div);
                if (lp[0] < objOffset[0] - 10 || lp[0] > objOffset[0] + objSpan.offsetWidth + 10) { t = null; }
            }
            var lastLinkTask = control.dragLink.SuccessorTask, linkTaskMapObj;

            if (lastLinkTask != t) {
                if (t) {
                    linkTaskMapObj = gantt.getElementDrawObj(t)[control.proTag];
                    if (linkTaskMapObj && linkTaskMapObj[this.name]) {
                        linkTaskMapObj[this.name].style.borderStyle = "dashed";
                    }
                }
                if (lastLinkTask) {
                    linkTaskMapObj = gantt.getElementDrawObj(lastLinkTask)[control.proTag];
                    if (linkTaskMapObj && linkTaskMapObj[this.name]) {
                        linkTaskMapObj[this.name].style.borderStyle = "solid";
                    }
                }
                control.dragLink.SuccessorTask = t;
                if (gantt.getTooltip) {
                    gantt.getTooltip().setContent(control.getLinkTooltipContent(control.dragLink));
                    gantt.getTooltip().setEnable(false);
                }
            }
        }
        else {
            //如果当前任务和目标任务都存在，则添加链接
            var lastLinkTask = control.dragLink.SuccessorTask;
            if (control.dragLink && lastLinkTask) {
                lastLinkTask.addPredecessorLink(task, 1);
            }
            //清除目标任务的边框虚线
            if (lastLinkTask) {
                var linkTaskMapObj = gantt.getElementDrawObj(lastLinkTask)[control.proTag];
                if (linkTaskMapObj && linkTaskMapObj[this.name]) {
                    linkTaskMapObj[this.name].style.borderStyle = "solid";
                }
            }
            //清除当前任务的边框虚线
            mapObj[this.name].style.borderStyle = "solid";
            if (gantt.getTooltip) { gantt.getTooltip().setEnable(true); }
            delete control.dragType;
            delete control.dragTask;
        }
    }
}
/**
@private
如果鼠标在拖拽过程之中接近了边界，则自动的调整甘特的起始时间
*/
SFGanttMapBarNormal.prototype.onTime = function () {
    var control = this.control, gantt = control.gantt, task = control.dragTask, mapObj = gantt.getElementDrawObj(task)[control.proTag];
    gantt.setStartTime(new Date(gantt.getStartTime().valueOf() + gantt.getScale() * 6 * this.dmDir));
    this.lastOffset += 6 * this.dmDir
    var start = new Date(task.Start.valueOf() + this.lastOffset * gantt.getScale());
    mapObj[this.name].style.left = gantt.getMapPanelPosition(start) - gantt.getTimePanelPosition(task.Start) + "px";
}
/**
根据浏览器的支持得到对应的Canvas
@private
@returns {__MapGraphics}
*/
SFGanttMapBarNormal.prototype.getGraphics = function () {
    var graphics = [SFGraphicsSvg, SFGraphicsVml, SFGraphicsCanvas, SFGraphicsDiv];
    for (var i = 0; i < graphics.length; i++) {
        if (graphics[i].isSupport()) {
            return new graphics[i]();
        }
    }
    return new SFGraphics(true);
}
/**
@private
清除对该任务的绘制
@param {SFDataTask} task 需要清除绘制的任务
@param {Json} mapObj 绘制记录对象
*/
SFGanttMapBarNormal.prototype.remove = function (task, mapObj) {
    SFEvent.deposeNode(mapObj[this.name]);
    delete mapObj[this.name];
}
window.SFGanttMapBarNormal = SFGanttMapBarNormal;
/**
本绘制项实现概要任务横条的显示
@private
@extends SFGanttMapItem
@class
*/
function SFGanttMapBarSummary() {
}
SFGanttMapBarSummary.prototype = new window.SFGanttMapItem();
/**
@private
图表绘制项目的初始化，每个绘制项目的实现都会重写此方法
@param {SFGanttTasksMap} control
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttMapBarSummary.prototype.initialize = function (control) {
    SFGlobal.setProperty(this, { control: control, name: 'BarSummary' });
    return true;
};
/**
@private
开始绘制指定任务
@param {SFDataTask} task 正在绘制的任务
@param {Json} mapObj 绘制记录对象
@param {Number} scale 甘特图的缩放比例
*/
SFGanttMapBarSummary.prototype.show = function (task, mapObj, scale) {
    var start = task.Start.valueOf(), finish = task.Finish.valueOf();
    if ((start >= finish || task.Milestone) || !task.Summary) { return; }
    var control = this.control, gantt = control.gantt, div = mapObj.taskDiv.ownerDocument.createElement('div');
    scale = scale ? scale : gantt.getScale();
    mapObj[this.name] = div;
    div.style.cssText = "position:absolute;font-size:0px;z-index:100;left:0px;width:" + ((finish - start) / scale) + "px;top:" + Math.ceil(control.taskPadding / 2) + "px;height:" + Math.floor(control.taskHeight / 2 - 1) + "px;";
    //inforcenter hq 
    //var height = control.taskHeight * (gantt.isTracking ? control.trackNormalHeightScale : 1);
    //div.style.cssText = "position:absolute;font-size:0px;z-index:100;left:0px;width:" + ((finish - start) / scale) + "px;top:" + Math.ceil(control.taskPadding / 2) + "px;height:" + height + "px;cursor:move;border-radius:1px";
    var taskStyle = control.getTaskStyle(task);
    if (taskStyle.summaryBarStyle) { SFGlobal.setProperty(div.style, taskStyle.summaryBarStyle); }
    mapObj.taskDiv.appendChild(div);
}
/**
@private
鼠标在任务上划过时显示的显示实时提示信息
@param {SFDataTask} task 正在绘制的任务
@param {Json} mapObj 绘制记录对象
@param {SFGanttTooltipControl} tooltip 甘特图的实时提示控件
@param {Event} e 浏览器鼠标事件
*/
SFGanttMapBarSummary.prototype.getTooltip = function (task, mapObj, tooltip, e) {
    if (e.target != mapObj[this.name] || !this.control.taskNoticeFields) { return false; }
    var control = this.control;
    if (tooltip && tooltip.bindObject == task && tooltip.bindType == "Task") { return false; }
    var table = control.getTaskTooltipContent(task, control.tooltipTitle.summary, control.taskNoticeFields.split(","));
    tooltip.bindObject = task;
    tooltip.bindType = "Task";
    tooltip.setContent(table);
    return true;
}
/**
@private
在任务属性变化时执行的响应
@param {SFDataTask} task 正在绘制的任务
@param {Json} mapObj 绘制记录对象
@param {String[]} changedFields 变化的属性数组
*/
SFGanttMapBarSummary.prototype.onUpdate = function (task, mapObj, changedFields) {
    var gantt = this.control.gantt, start = task.Start.valueOf(), finish = task.Finish.valueOf();
    if (start >= finish || !task.Summary) { this.remove(task, mapObj); return; }
    var div = mapObj[this.name];
    if (!div) {
        this.show(task, mapObj, gantt.getScale());
    }
    else {
        var style = div.style;
        if (SFGlobal.findInArray(changedFields, "Start") || SFGlobal.findInArray(changedFields, "Finish")) { style.width = ((finish - start) / gantt.getScale()) + "px"; }
    }
}
/**
@private
在地图缩放比例变化时执行的响应
@param {SFDataTask} task 正在绘制的任务
@param {Json} mapObj 绘制记录对象
@param {Number} scale 甘特图的缩放比例
*/
SFGanttMapBarSummary.prototype.onScale = function (task, mapObj, scale) {
    var div = mapObj[this.name];
    if (div) { div.style.width = ((task.Finish - task.Start) / scale) + "px"; }
}
/**
@private
清除对该任务的绘制
@param {SFDataTask} task 需要清除绘制的任务
@param {Json} mapObj 绘制记录对象
*/
SFGanttMapBarSummary.prototype.remove = function (task, mapObj) {
    SFEvent.deposeNode(mapObj[this.name]);
    delete mapObj[this.name];
}
window.SFGanttMapBarSummary = SFGanttMapBarSummary;
/**
本绘制项实现任务里程碑头图标的显示
@private
@extends SFGanttMapItem
@class
*/
function SFGanttMapMilestoneHead() {
}
SFGanttMapMilestoneHead.prototype = new window.SFGanttMapItem();
/**
@private
图表绘制项目的初始化，每个绘制项目的实现都会重写此方法
@param {SFGanttTasksMap} control
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttMapMilestoneHead.prototype.initialize = function (control) {
    SFGlobal.setProperty(this, { control: control, name: 'MilestoneHead' });
    return true;
};
/**
@private
开始绘制指定任务
@param {SFDataTask} task 正在绘制的任务
@param {Json} mapObj 绘制记录对象
@param {Number} scale 甘特图的缩放比例
*/
SFGanttMapMilestoneHead.prototype.show = function (task, mapObj) {
    var start = task.Start.valueOf(), finish = task.Finish.valueOf();
    if (start < finish && !task.Milestone) { return; }
    var control = this.control, gantt = control.gantt, taskStyle = control.getTaskStyle(task);
    var img = mapObj[this.name] = gantt.createImage(taskStyle.milestoneImage || "task_head_3", { color: (taskStyle.milestoneImageColor || "#000000"), position: [(-Math.floor((control.taskHeight - 1) / 2)), Math.ceil(control.taskPadding / 2)], size: [(control.taskHeight - 1), (control.taskHeight - 1)] });
    SFGlobal.setProperty(img.style, { position: 'absolute', zIndex: 150 });
    mapObj.taskDiv.appendChild(img);
}
/**
@private
鼠标在任务上划过时显示的显示实时提示信息
@param {SFDataTask} task 正在绘制的任务
@param {Json} mapObj 绘制记录对象
@param {SFGanttTooltipControl} tooltip 甘特图的实时提示控件
@param {Event} e 浏览器鼠标事件
*/
SFGanttMapMilestoneHead.prototype.getTooltip = function (task, mapObj, tooltip, e) {
    //inforcenter
    //if (e.target != mapObj[this.name] || !this.control.taskNoticeFields) { return false; }
    if (!mapObj[this.name] || !this.control.taskNoticeFields) { return false; }
    var control = this.control;
    if (tooltip.bindObject == task && tooltip.bindType == "Task") { return false; }
    var table = control.getTaskTooltipContent(task, control.tooltipTitle.milestone, control.taskNoticeFields.split(","));
    tooltip.bindObject = task;
    tooltip.bindType = "Task";
    tooltip.setContent(table);
    return true;
}
/**
@private
在任务属性变化时执行的响应
@param {SFDataTask} task 正在绘制的任务
@param {Json} mapObj 绘制记录对象
@param {String[]} changedFields 变化的属性数组
*/
SFGanttMapMilestoneHead.prototype.onUpdate = function (task, mapObj, changedFields) {
    var gantt = this.control.gantt, start = task.Start.valueOf(), finish = task.Finish.valueOf();
    //inforcenter
    //if (start != finish) { this.remove(task, mapObj); return; }
    if (SFGlobal.findInArray(changedFields, "ClassName")) {
        this.remove(task, mapObj);
        this.show(task, mapObj);
        return;
    }
    var div = mapObj[this.name];
    if (!div) {
        this.show(task, mapObj);
    }
}
/**
@private
清除对该任务的绘制
@param {SFDataTask} task 需要清除绘制的任务
@param {Json} mapObj 绘制记录对象
*/
SFGanttMapMilestoneHead.prototype.remove = function (task, mapObj) {
    SFEvent.deposeNode(mapObj[this.name]);
    delete mapObj[this.name];
}
window.SFGanttMapMilestoneHead = SFGanttMapMilestoneHead;
/**
本绘制项实现任务百分比条的显示
@private
@extends SFGanttMapItem
@class
*/
function SFGanttMapPercent() {
}
SFGanttMapPercent.prototype = new window.SFGanttMapItem();
/**
@private
图表绘制项目的初始化，每个绘制项目的实现都会重写此方法
@param {SFGanttTasksMap} control
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttMapPercent.prototype.initialize = function (control) {
    SFGlobal.setProperty(this, { control: control, name: 'Percent' });
    return true;
};
/**
@private
开始绘制指定任务
@param {SFDataTask} task 正在绘制的任务
@param {Json} mapObj 绘制记录对象
@param {Number} scale 甘特图的缩放比例
*/
SFGanttMapPercent.prototype.show = function (task, mapObj) {

    var start = task.Start.valueOf(), finish = task.Finish.valueOf();
    if (start >= finish || task.Milestone || task.Summary) { return; }
    var control = this.control, gantt = control.gantt, div = mapObj.taskDiv.ownerDocument.createElement('div');
    var height = control.taskHeight * (gantt.isTracking ? control.trackNormalHeightScale : 1), percent = task.PercentComplete;
    percent = percent ? percent : 0;
    percent = Math.max(0, Math.min(percent, 100));
    var width = (finish - start) / gantt.getScale() * percent / 100;
    //div.style.cssText="position:absolute;font-size:0px;z-index:200;left:0px;width:"+width+"px;top:"+Math.ceil(control.taskPadding/2+control.taskHeight*control.trackNormalTopScale+height/4)+"px;height:"+Math.ceil(height/2)+"px;";
    //inforcenter
    div.style.cssText = "position:absolute;font-size:0px;z-index:200;left:0px;width:" + width + "px;top:" + Math.ceil(control.taskPadding / 2 + control.taskHeight * control.trackNormalTopScale + 1) + "px;height:" + Math.ceil(height - 2) + "px;border-top-left-radius:1px;border-bottom-left-radius:1px;";
    var taskStyle = control.getTaskStyle(task);
    if (taskStyle.percentBarStyle) { SFGlobal.setProperty(div.style, taskStyle.percentBarStyle); }
    mapObj.taskDiv.appendChild(div);
    mapObj[this.name] = div;
}
/**
@private
鼠标在任务上划过时显示的显示实时提示信息
@param {SFDataTask} task 正在绘制的任务
@param {Json} mapObj 绘制记录对象
@param {SFGanttTooltipControl} tooltip 甘特图的实时提示控件
@param {Event} e 浏览器鼠标事件
*/
SFGanttMapPercent.prototype.getTooltip = function (task, mapObj, tooltip, e) {
    if (e.target != mapObj[this.name] || !this.control.taskProgressNoticeFields) { return false; }
    var control = this.control;
    if (tooltip && tooltip.bindObject == task && tooltip.bindType == "Percent") { return false; }
    var table = control.getTaskTooltipContent(task, control.tooltipTitle.progress, control.taskProgressNoticeFields.split(","));
    tooltip.bindObject = task;
    tooltip.bindType = "Percent";
    tooltip.setContent(table);
    return true;
}
/**
@private
在任务属性变化时执行的响应
@param {SFDataTask} task 正在绘制的任务
@param {Json} mapObj 绘制记录对象
@param {String[]} changedFields 变化的属性数组
*/
SFGanttMapPercent.prototype.onUpdate = function (task, mapObj, changedFields) {
    var start = task.Start.valueOf(), finish = task.Finish.valueOf();
    if (start >= finish || task.Summary) { this.remove(task, mapObj); return; }
    var div = mapObj[this.name];
    if (!div) {
        this.show(task, mapObj);
    }
    else {
        var style = div.style;
        if (SFGlobal.findInArray(changedFields, "PercentComplete") || SFGlobal.findInArray(changedFields, "Start") || SFGlobal.findInArray(changedFields, "Finish")) {
            var percent = task.PercentComplete;
            percent = percent ? percent : 0;
            style.width = (finish - start) / this.control.gantt.getScale() * percent / 100 + "px";
        }
    }
}
/**
@private
在地图缩放比例变化时执行的响应
@param {SFDataTask} task 正在绘制的任务
@param {Json} mapObj 绘制记录对象
@param {Number} scale 甘特图的缩放比例
*/
SFGanttMapPercent.prototype.onScale = function (task, mapObj, scale) {
    var div = mapObj[this.name];
    var percent = task.PercentComplete;
    percent = percent ? percent : 0;
    if (div) { div.style.width = (task.Finish - task.Start) / this.control.gantt.getScale() * percent / 100 + "px"; }
}
/**
@private
清除对该任务的绘制
@param {SFDataTask} task 需要清除绘制的任务
@param {Json} mapObj 绘制记录对象
*/
SFGanttMapPercent.prototype.remove = function (task, mapObj) {
    SFEvent.deposeNode(mapObj[this.name]);
    delete mapObj[this.name];
}
window.SFGanttMapPercent = SFGanttMapPercent;
/**
本绘制项实现拖拽更改百分比的功能
@private
@extends SFGanttMapItem
@class
*/
function SFGanttMapPercentChange() {
}
SFGanttMapPercentChange.prototype = new window.SFGanttMapItem();
/**
@private
图表绘制项目的初始化，每个绘制项目的实现都会重写此方法
@param {SFGanttTasksMap} control
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttMapPercentChange.prototype.initialize = function (control) {
    if (control.gantt.readOnly || control.gantt.disableUpdateTask || control.disableDragChangePercent) { return false; }
    SFGlobal.setProperty(this, { control: control, name: 'PercentChange' });
    return true;
};
/**
@private
开始绘制指定任务
@param {SFDataTask} task 正在绘制的任务
@param {Json} mapObj 绘制记录对象
@param {Number} scale 甘特图的缩放比例
*/
SFGanttMapPercentChange.prototype.show = function (task, mapObj) {
    var start = task.Start.valueOf(), finish = task.Finish.valueOf(), percent = task.PercentComplete, control = this.control, gantt = control.gantt, height = control.taskHeight;
    if (start >= finish || task.Milestone || task.Summary || gantt.readOnly || !task.canSetProperty("PercentComplete")) { return; }
    percent = percent ? percent : 0;
    var left = (finish - start) / gantt.getScale() * percent / 100;
    var div = mapObj.taskDiv.ownerDocument.createElement('div');
    mapObj[this.name] = div;
    div.style.cssText = "position:absolute;width:" + (Math.floor((control.taskHeight - 1) / 2)) + "px;background-color:#FFFFFF;left:" + left + "px;top:" + Math.ceil(control.taskPadding / 2) + "px;height:" + (height + 2) + "px;z-index:250;font-size:0px;cursor:col-resize;";
    mapObj.taskDiv.appendChild(div);
    SFGlobal.setOpacity(div, 0.01);
}
/**
@private
在任务属性变化时执行的响应
@param {SFDataTask} task 正在绘制的任务
@param {Json} mapObj 绘制记录对象
@param {String[]} changedFields 变化的属性数组
*/
SFGanttMapPercentChange.prototype.onUpdate = function (task, mapObj, changedFields) {
    var start = task.Start.valueOf(), finish = task.Finish.valueOf(), percent = task.PercentComplete, control = this.control, gantt = control.gantt;
    if (start >= finish || task.Summary || gantt.readOnly || !task.canSetProperty("PercentComplete") || gantt.disableUpdateTask || control.disableDragChangePercent) { this.remove(task, mapObj); return; }
    var div = mapObj[this.name];
    if (!div) {
        this.show(task, mapObj);
    }
    else {
        var style = div.style, percent = percent ? percent : 0;
        if (SFGlobal.findInArray(changedFields, "PercentComplete") || SFGlobal.findInArray(changedFields, "Start") || SFGlobal.findInArray(changedFields, "Finish")) {
            style.left = (finish - start) / gantt.getScale() * percent / 100 + "px";
        }
    }
}
/**
@private
在地图缩放比例变化时执行的响应
@param {SFDataTask} task 正在绘制的任务
@param {Json} mapObj 绘制记录对象
@param {Number} scale 甘特图的缩放比例
*/
SFGanttMapPercentChange.prototype.onScale = function (task, mapObj, scale) {
    var div = mapObj[this.name];
    var percent = task.PercentComplete;
    percent = percent ? percent : 0;
    if (div) { div.style.left = (task.Finish - task.Start) / this.control.gantt.getScale() * percent / 100 + "px"; }
}
/**
@private
鼠标在任务上按下时执行的响应
@param {SFDataTask} task 正在绘制的任务
@param {Json} mapObj 绘制记录对象
@param {Event} e 浏览器鼠标事件
*/
SFGanttMapPercentChange.prototype.onMouseDown = function (task, mapObj, e) {
    if (e.target != mapObj[this.name]) { return; }
    var control = this.control;
    new SFDragObject(control.div, SFEvent.getCallback(this, this.onPercentMove)).onMouseDown(e);
}
/**
@private
在拖拽百分比的过程之中持续触发的函数
@param {Number[]} sp 拖拽起始点位置
@param {Number[]} lp 拖拽当前点位置
@param {String} type 当前触发的类型
*/
SFGanttMapPercentChange.prototype.onPercentMove = function (sp, lp, type) {
    var control = this.control, gantt = control.gantt, task = control.dragTask, mapObj = gantt.getElementDrawObj(control.dragTask)[control.proTag], percentDiv = mapObj.Percent;
    if (!percentDiv) { return; }
    var percent = task.PercentComplete, start = task.Start, finish = task.Finish, size = (finish - start) / gantt.getScale();
    if (!percent) { percent = 0; }
    if (type == "start") {
        if (gantt.getTooltip) {
            var tooltip = gantt.getTooltip();
            tooltip.setContent(control.getTaskTooltipContent(task, control.tooltipTitle.progress, ["name", "PercentComplete"]));
            var position = SFEvent.getPageOffset(mapObj.BarNormal, gantt.container);
            position[1] += gantt.getElementDrawObj(task).height;
            tooltip.show(position);
        }
    }
    if (type != "end") {
        percent = Math.round(percent + (lp[0] - sp[0]) * 100 / size);
        percent = Math.min(Math.max(0, percent), 100);
        percentDiv.style.width = (finish - start) / gantt.getScale() * percent / 100 + "px";
        if (gantt.getTooltip) {
            gantt.getTooltip().setContent(control.getTaskTooltipContent({ PercentComplete: percent, Name: task.Name }, control.tooltipTitle.progress, ["name", "PercentComplete"]))
        }
    }
    else {
        var p = parseInt(percent + (lp[0] - sp[0]) * 100 / size);
        p = Math.min(Math.max(0, p), 100);
        if (!task.setProperty("PercentComplete", p)) {
            percent = task.getProperty("PercentComplete");
            if (!percent) { percent = 0; }
            percentDiv.style.width = (finish - start) / gantt.getScale() * percent / 100 + "px";
        }
    }
}
/**
@private
清除对该任务的绘制
@param {SFDataTask} task 需要清除绘制的任务
@param {Json} mapObj 绘制记录对象
*/
SFGanttMapPercentChange.prototype.remove = function (task, mapObj) {
    SFEvent.deposeNode(mapObj[this.name]);
    delete mapObj[this.name];
}
window.SFGanttMapPercentChange = SFGanttMapPercentChange;
/**
本绘制项实现拖拽更改任务的结束时间的功能
@private
@extends SFGanttMapItem
@class
*/
function SFGanttMapResize() {
}
SFGanttMapResize.prototype = new window.SFGanttMapItem();
/**
@private
图表绘制项目的初始化，每个绘制项目的实现都会重写此方法
@param {SFGanttTasksMap} control
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttMapResize.prototype.initialize = function (control) {
    if (control.gantt.readOnly || control.gantt.disableUpdateTask || control.disableDragResizeTask) { return false; }
    SFGlobal.setProperty(this, { control: control, name: 'Resize' });
    return true;
};
/**
@private
开始绘制指定任务
@param {SFDataTask} task 正在绘制的任务
@param {Json} mapObj 绘制记录对象
@param {Number} scale 甘特图的缩放比例
*/
SFGanttMapResize.prototype.show = function (task, mapObj, scale) {
    var start = task.Start.valueOf(), finish = task.Finish.valueOf(), control = this.control, gantt = control.gantt, height = gantt.getElementDrawObj(task).height;
    scale = scale ? scale : gantt.getScale();
    if (start >= finish || task.Milestone || task.Summary || gantt.readOnly || !task.canSetProperty("Finish")) { return; }
    var div = mapObj.taskDiv.ownerDocument.createElement('div');
    mapObj[this.name] = div;
    div.style.cssText = "position:absolute;width:" + (control.taskHeight - 1) + "px;left:" + ((finish - start) / scale - Math.floor((control.taskHeight - 1) / 2)) + "px;top:" + Math.ceil(control.taskPadding / 2) + "px;height:" + (height / 2 + 2) + "px;z-index:150;font-size:0px;cursor:w-resize;";
    mapObj.taskDiv.appendChild(div);
}
/**
@private
在任务属性变化时执行的响应
@param {SFDataTask} task 正在绘制的任务
@param {Json} mapObj 绘制记录对象
@param {String[]} changedFields 变化的属性数组
*/
SFGanttMapResize.prototype.onUpdate = function (task, mapObj, changedFields) {
    var start = task.Start.valueOf(), finish = task.Finish.valueOf(), control = this.control, gantt = control.gantt, height = gantt.getElementHeight(task);
    if (start >= finish || task.Summary || gantt.readOnly || !task.canSetProperty("Finish") || gantt.disableUpdateTask || control.disableDragResizeTask) { this.remove(task, mapObj); return; }
    var div = mapObj[this.name];
    if (!div) {
        this.show(task, mapObj);
    }
    else {
        var style = div.style;
        if (SFGlobal.findInArray(changedFields, "Start") || SFGlobal.findInArray(changedFields, "Finish")) { style.left = ((finish - start) / gantt.getScale() - Math.floor((control.taskHeight - 1) / 2)) + "px"; }
    }
}
/**
@private
在地图缩放比例变化时执行的响应
@param {SFDataTask} task 正在绘制的任务
@param {Json} mapObj 绘制记录对象
@param {Number} scale 甘特图的缩放比例
*/
SFGanttMapResize.prototype.onScale = function (task, mapObj, scale) {
    var div = mapObj[this.name];
    if (div) { div.style.left = ((task.Finish - task.Start) / scale) + "px"; }
}
/**
@private
鼠标在任务上按下时执行的响应
@param {SFDataTask} task 正在绘制的任务
@param {Json} mapObj 绘制记录对象
@param {Event} e 浏览器鼠标事件
*/
SFGanttMapResize.prototype.onMouseDown = function (task, mapObj, e) {
    if (e.target != mapObj[this.name]) { return; }
    var control = this.control;
    new SFDragObject(control.div, SFEvent.getCallback(this, this.onResizeMove)).onMouseDown(e);
}
/**
@private
在拖拽更改大小的过程之中持续触发的函数
@param {Number[]} sp 拖拽起始点位置
@param {Number[]} lp 拖拽当前点位置
@param {String} type 当前触发的类型
*/
SFGanttMapResize.prototype.onResizeMove = function (sp, lp, type) {
    var control = this.control, gantt = control.gantt, task = control.dragTask, barDiv = gantt.getElementDrawObj(task)[control.proTag].BarNormal, scale = gantt.getScale();
    if (type == "start") {
        if (gantt.getTooltip) {
            var tooltip = gantt.getTooltip();
            tooltip.setContent(control.getTaskTooltipContent(task, control.tooltipTitle.task, ["Start", "Finish"]));
            var position = SFEvent.getPageOffset(barDiv, gantt.container);
            position[1] += gantt.getElementDrawObj(task).height;
            tooltip.show(position);
        }
    }
    var finish = task.Finish.valueOf() + [lp[0] - sp[0]] * scale;
    finish = Math.max(task.Start.valueOf(), finish)
    if (type != "end") {
        barDiv.style.width = (finish - task.Start.valueOf()) / scale + "px";
        if (gantt.getTooltip) {
            gantt.getTooltip().setContent(control.getTaskTooltipContent({ Start: task.Start, Finish: new Date(finish) }, control.tooltipTitle.task, ["Start", "Finish"]))
        }
    }
    else {
        if (!task.setProperty("Finish", new Date(finish))) {
            barDiv.style.width = (task.Finish.valueOf() - task.Start.valueOf()) / scale + "px";
        }
    }
}
/**
@private
清除对该任务的绘制
@param {SFDataTask} task 需要清除绘制的任务
@param {Json} mapObj 绘制记录对象
*/
SFGanttMapResize.prototype.remove = function (task, mapObj) {
    SFEvent.deposeNode(mapObj[this.name]);
    delete mapObj[this.name];
}
window.SFGanttMapResize = SFGanttMapResize;
/**
本绘制项实现概要任务头图标的显示
@private
@extends SFGanttMapItem
@class
*/
function SFGanttMapSummaryHead() {
}
SFGanttMapSummaryHead.prototype = new window.SFGanttMapItem();
/**
@private
图表绘制项目的初始化，每个绘制项目的实现都会重写此方法
@param {SFGanttTasksMap} control
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttMapSummaryHead.prototype.initialize = function (control) {
    SFGlobal.setProperty(this, { control: control, name: 'SummaryHead' });
    return true;
};
/**
@private
开始绘制指定任务
@param {SFDataTask} task 正在绘制的任务
@param {Json} mapObj 绘制记录对象
@param {Number} scale 甘特图的缩放比例
*/
SFGanttMapSummaryHead.prototype.show = function (task, mapObj, scale) {
    var start = task.Start.valueOf(), finish = task.Finish.valueOf(), doc = mapObj.taskDiv.ownerDocument;
    if (start >= finish || task.Milestone || !task.Summary) { return; }
    var control = this.control, gantt = control.gantt, imgs = mapObj[this.name] = [];
    scale = scale ? scale : gantt.getScale();
    var taskStyle = control.getTaskStyle(task);
    for (var i = 0; i < 2; i++) {
        var left = -Math.floor((control.taskHeight - 1) / 2);
        if (i > 0) { left += (finish - start) / scale; }
        var img = gantt.createImage(taskStyle.summaryImage || "task_head_2", { color: (taskStyle.summaryImageColor || "#000000"), position: [left, Math.ceil(control.taskPadding / 2)], size: [(control.taskHeight - 1), (control.taskHeight - 1)] });
        imgs.push(img);
        SFGlobal.setProperty(img.style, { position: 'absolute', zIndex: 150 });
        mapObj.taskDiv.appendChild(img);
    }
}
/**
@private
在任务属性变化时执行的响应
@param {SFDataTask} task 正在绘制的任务
@param {Json} mapObj 绘制记录对象
@param {String[]} changedFields 变化的属性数组
*/
SFGanttMapSummaryHead.prototype.onUpdate = function (task, mapObj, changedFields) {
    var gantt = this.control.gantt, start = task.Start.valueOf(), finish = task.Finish.valueOf(), control = this.control;
    if (start == finish || !task.Summary) { this.remove(task, mapObj); return; }
    var div = mapObj[this.name];
    if (!div) {
        this.show(task, mapObj);
    }
    else {
        if (SFGlobal.findInArray(changedFields, "Start") || SFGlobal.findInArray(changedFields, "Finish")) { mapObj[this.name][1].style.left = (-Math.floor((control.taskHeight - 1) / 2) + (finish - start) / gantt.getScale()) + "px" }
    }
}
/**
@private
在地图缩放比例变化时执行的响应
@param {SFDataTask} task 正在绘制的任务
@param {Json} mapObj 绘制记录对象
@param {Number} scale 甘特图的缩放比例
*/
SFGanttMapSummaryHead.prototype.onScale = function (task, mapObj, scale) {
    var div = mapObj[this.name];
    if (div) { div[1].style.left = (-Math.floor((this.control.taskHeight - 1) / 2) + (task.Finish - task.Start) / scale) + "px"; }
}
/**
@private
清除对该任务的绘制
@param {SFDataTask} task 需要清除绘制的任务
@param {Json} mapObj 绘制记录对象
*/
SFGanttMapSummaryHead.prototype.remove = function (task, mapObj) {
    var imgs = mapObj[this.name];
    if (imgs) {
        SFEvent.deposeNode(imgs[0]);
        SFEvent.deposeNode(imgs[1]);
    }
    delete mapObj[this.name];
}
window.SFGanttMapSummaryHead = SFGanttMapSummaryHead;
/**
本绘制项实现任务横条右侧文字的显示
@private
@extends SFGanttMapItem
@class
*/
function SFGanttMapText() {
}
SFGanttMapText.prototype = new window.SFGanttMapItem();
/**
@private
图表绘制项目的初始化，每个绘制项目的实现都会重写此方法
@param {SFGanttTasksMap} control
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttMapText.prototype.initialize = function (control) {
    //判断在什么地方需要显示文本
    var fields = this.fields = {}, needText = false, fNames = ["Center", "Top", "Bottom"], fieldStr;
    //如果不是单行显示模式，则允许在左右两侧显示字段
    if (!control.gantt.inline) {
        fNames = fNames.concat("Left", "Right");
        if ((fieldStr = control.taskBarField)) {
            fields["Right"] = SFGanttField.getTaskField(fieldStr);
            if (!needText) { needText = true; }
        }
    }
    for (var i = 0; i < fNames.length; i++) {
        if ((fieldStr = control["taskBar" + fNames[i] + "Field"])) {
            fields[fNames[i]] = SFGanttField.getTaskField(fieldStr);
            if (!needText) { needText = true; }
        }
    }
    if (!needText) { return false; }//如果一个字段都没有配置，则直接退出
    SFGlobal.setProperty(this, { control: control, name: 'Text' });
    return true;
};
SFGanttMapText.prototype.getStyle = function (task, scale, key) {
    if (!task.Start || !task.Finish) { return }
    var start = task.Start.valueOf(), finish = task.Finish.valueOf(), gantt = this.control.gantt;
    var left = 0, width = Math.max((finish - start) / scale, 1), top = Math.ceil((gantt.itemHeight - gantt.fontSize) / 2), align = "left", overflow = "hidden";
    switch (key) {
        case "Left":
            width = 1000;
            left = -1010;
            align = "right";
            break;
        case "Right":
            width = 0;
            left = (finish - start) / scale + 10
            overflow = "visible";
            break;
        case "Top":
            top -= Math.max(gantt.fontSize, gantt.itemHeight / 4) + 2;
            align = "center";
            break;
        case "Bottom":
            top += Math.max(gantt.fontSize, gantt.itemHeight / 4) + 2;
            align = "center";
            break;
        case "Center":
            align = "center";
            break;
        default: return;
    }
    return { left: left + "px", top: top + "px", width: width ? (width + "px") : "auto", textAlign: align, overflow: overflow }
}
/**
@private
开始绘制指定任务
@param {SFDataTask} task 正在绘制的任务
@param {Json} mapObj 绘制记录对象
@param {Number} scale 甘特图的缩放比例
*/
SFGanttMapText.prototype.show = function (task, mapObj, scale) {
    var control = this.control, gantt = control.gantt, height = gantt.getElementDrawObj(task).height, fields = this.fields, div;
    scale = scale ? scale : gantt.getScale();
    for (var key in fields) {
        var style = this.getStyle(task, scale, key);
        if (!style) { continue; }
        div = mapObj.taskDiv.ownerDocument.createElement('div')
        div.noWrap = true;
        mapObj[this.name + key] = div;
        fields[key].showBody(div, task, control);
        //inforcenter font-weight
        div.style.cssText = "position:absolute;white-space:nowrap;z-index:200;cursor:default;font-size:" + gantt.fontSize + "px;";
        SFGlobal.setProperty(div.style, style);
        mapObj.taskDiv.appendChild(div);
    }
}
/**
@private
在任务属性变化时执行的响应
@param {SFDataTask} task 正在绘制的任务
@param {Json} mapObj 绘制记录对象
@param {String[]} changedFields 变化的属性数组
*/
SFGanttMapText.prototype.onUpdate = function (task, mapObj, changedFields) {
    var control = this.control, gantt = control.gantt, scale = scale ? scale : gantt.getScale();
    var fields = this.fields;
    for (var key in fields) {
        var style = this.getStyle(task, scale, key);
        if (!style) { continue; }
        var div = mapObj[this.name + key];
        if (!div) {
            this.show(task, mapObj);
            return;
        }
        if (SFGlobal.findInArray(changedFields, "Start") || SFGlobal.findInArray(changedFields, "Finish")) {
            SFGlobal.setProperty(div.style, style);
        }
        if (fields[key].checkUpdate(changedFields)) {
            fields[key].showBody(div, task, control);
        }
    }
}
/**
@private
在地图缩放比例变化时执行的响应
@param {SFDataTask} task 正在绘制的任务
@param {Json} mapObj 绘制记录对象
@param {Number} scale 甘特图的缩放比例
*/
SFGanttMapText.prototype.onScale = function (task, mapObj, scale) {
    var fields = this.fields;
    for (var key in fields) {
        var style = this.getStyle(task, scale, key);
        if (!style) { continue; }
        var div = mapObj[this.name + key];
        if (!div) { continue; }
        SFGlobal.setProperty(div.style, style);
    }
}
/**
@private
清除对该任务的绘制
@param {SFDataTask} task 需要清除绘制的任务
@param {Json} mapObj 绘制记录对象
*/
SFGanttMapText.prototype.remove = function (task, mapObj) {
    var fields = this.fields;
    for (var key in fields) {
        SFEvent.deposeNode(mapObj[this.name + key]);
        delete mapObj[this.name + key];
    }
}
window.SFGanttMapText = SFGanttMapText;
/**
本绘制项实现任务跟踪横条的显示
@private
@extends SFGanttMapItem
@class
*/
function SFGanttMapBarTrack() {
}
SFGanttMapBarTrack.prototype = new window.SFGanttMapItem();
/**
@private
图表绘制项目的初始化，每个绘制项目的实现都会重写此方法
@param {SFGanttTasksMap} control
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttMapBarTrack.prototype.initialize = function (control) {
    if (!control.gantt.isTracking) { return false; }
    SFGlobal.setProperty(this, { control: control, name: 'BarTrack' });
    return true;
};
/**
@private
开始绘制指定任务
@param {SFDataTask} task 正在绘制的任务
@param {Json} mapObj 绘制记录对象
@param {Number} scale 甘特图的缩放比例
*/
SFGanttMapBarTrack.prototype.show = function (task, mapObj, scale) {
    if (!task.BaselineStart || !task.BaselineFinish) { return; }
    var start = task.BaselineStart.valueOf(), finish = task.BaselineFinish.valueOf();
    if (start >= finish || task.Milestone || task.Summary) { return; }
    var control = this.control, gantt = control.gantt, div = mapObj.taskDiv.ownerDocument.createElement('div');
    scale = scale ? scale : gantt.getScale();
    mapObj[this.name] = div;
    var height = control.taskHeight, topScale = control.trackBaselineTopScale, heightScale = control.trackBaselineHeightScale;
    div.style.cssText = "position:absolute;font-size:0px;z-index:100;left:" + (start - task.Start.valueOf()) / scale + "px;width:" + ((finish - start) / scale) + "px;top:" + (Math.ceil(control.taskPadding / 2) + height * topScale) + "px;height:" + height * heightScale + "px;";
    var taskStyle = control.getTaskStyle(task), tbStyle = taskStyle.trackBarStyle;
    if (tbStyle) {
        if (tbStyle.bgImage) {
            gantt.setBackgroundImage(div, tbStyle.bgImage, { color: tbStyle.bgColor });
        }
        SFGlobal.setProperty(div.style, tbStyle);
    }
    mapObj.taskDiv.appendChild(div);
}
/**
@private
在任务属性变化时执行的响应
@param {SFDataTask} task 正在绘制的任务
@param {Json} mapObj 绘制记录对象
@param {String[]} changedFields 变化的属性数组
*/
SFGanttMapBarTrack.prototype.onUpdate = function (task, mapObj, changedFields) {
    if (!task.BaselineStart || !task.BaselineFinish) { return; }
    var gantt = this.control.gantt, start = task.BaselineStart, finish = task.BaselineFinish;
    if (!start || !finish || start.valueOf() >= finish.valueOf() || task.Summary) { this.remove(task, mapObj); return; }
    var div = mapObj[this.name];
    if (!div) {
        this.show(task, mapObj);
    }
    else {
        if (SFGlobal.findInArray(changedFields, "ClassName")) {
            this.remove(task, mapObj);
            this.show(task, mapObj);
            return;
        }
        var style = div.style;
        if (SFGlobal.findInArray(changedFields, "BaselineStart") || SFGlobal.findInArray(changedFields, "BaselineFinish")) {
            style.width = ((finish - start) / gantt.getScale()) + "px";
        }
        if (SFGlobal.findInArray(changedFields, "Start") || SFGlobal.findInArray(changedFields, "BaselineStart")) {
            style.left = ((start - task.Start.valueOf()) / gantt.getScale()) + "px";
        }
    }
}
/**
@private
鼠标在任务上划过时显示的显示实时提示信息
@param {SFDataTask} task 正在绘制的任务
@param {Json} mapObj 绘制记录对象
@param {SFGanttTooltipControl} tooltip 甘特图的实时提示控件
@param {Event} e 浏览器鼠标事件
*/
SFGanttMapBarTrack.prototype.getTooltip = function (task, mapObj, tooltip, e) {
    if (e.target != mapObj[this.name] || !this.control.taskNoticeFields) { return false; }
    var control = this.control;
    if (tooltip && tooltip.bindObject == task && tooltip.bindType == "Task") { return false; }
    var table = control.getTaskTooltipContent(task, control.tooltipTitle.task, control.taskTrackingNoticeFields.split(","));
    tooltip.bindObject = task;
    tooltip.bindType = "Task";
    tooltip.setContent(table);
    return true;
}
/**
@private
在地图缩放比例变化时执行的响应
@param {SFDataTask} task 正在绘制的任务
@param {Json} mapObj 绘制记录对象
@param {Number} scale 甘特图的缩放比例
*/
SFGanttMapBarTrack.prototype.onScale = function (task, mapObj, scale) {
    var div = mapObj[this.name];
    if (div) {
        div.style.width = ((task.BaselineFinish - task.BaselineStart) / scale) + "px";
        div.style.left = ((task.BaselineStart - task.Start.valueOf()) / scale) + "px";
    }
}
/**
@private
清除对该任务的绘制
@param {SFDataTask} task 需要清除绘制的任务
@param {Json} mapObj 绘制记录对象
*/
SFGanttMapBarTrack.prototype.remove = function (task, mapObj) {
    SFEvent.deposeNode(mapObj[this.name]);
    delete mapObj[this.name];
}
window.SFGanttMapBarTrack = SFGanttMapBarTrack;
/**
本绘制项实现任务里程碑跟踪头图标的显示
@private
@extends SFGanttMapItem
@class
*/
function SFGanttMapMilestoneTrackHead() {
}
SFGanttMapMilestoneTrackHead.prototype = new window.SFGanttMapItem();
/**
@private
图表绘制项目的初始化，每个绘制项目的实现都会重写此方法
@param {SFGanttTasksMap} control
@returns {Bool} 如果初始化成功，返回true,否则返回false
*/
SFGanttMapMilestoneTrackHead.prototype.initialize = function (control) {
    if (!control.gantt.isTracking) { return false; }
    SFGlobal.setProperty(this, { control: control, name: 'MilestoneTrackHead' });
    return true;
};
/**
@private
开始绘制指定任务
@param {SFDataTask} task 正在绘制的任务
@param {Json} mapObj 绘制记录对象
@param {Number} scale 甘特图的缩放比例
*/
SFGanttMapMilestoneTrackHead.prototype.show = function (task, mapObj) {
    if (!task.BaselineStart || !task.BaselineFinish) { return; }
    var start = task.BaselineStart.valueOf(), finish = task.BaselineFinish.valueOf();
    if (start < finish || task.Milestone) { return; }
    var control = this.control, gantt = control.gantt, taskStyle = control.getTaskStyle(task);
    var img = mapObj[this.name] = gantt.createImage(taskStyle.milestoneTrackImage || "task_head_3_hollow", { color: (taskStyle.milestoneTrackImageColor || "#000000"), position: [(-Math.floor((control.taskHeight - 1) / 2)), Math.ceil(control.taskPadding / 2)], size: [(control.taskHeight - 1), (control.taskHeight - 1)] });
    SFGlobal.setProperty(img.style, { position: 'absolute', zIndex: 150 });
    mapObj.taskDiv.appendChild(img);
}
/**
@private
鼠标在任务上划过时显示的显示实时提示信息
@param {SFDataTask} task 正在绘制的任务
@param {Json} mapObj 绘制记录对象
@param {SFGanttTooltipControl} tooltip 甘特图的实时提示控件
@param {Event} e 浏览器鼠标事件
*/
SFGanttMapMilestoneTrackHead.prototype.getTooltip = function (task, mapObj, tooltip, e) {
    if (e.target != mapObj[this.name] || !this.control.taskNoticeFields) { return false; }
    var control = this.control;
    if (tooltip.bindObject == task && tooltip.bindType == "Task") { return false; }
    var table = control.getTaskTooltipContent(task, control.tooltipTitle.milestone, control.taskTrackingNoticeFields.split(","));
    tooltip.bindObject = task;
    tooltip.bindType = "Task";
    tooltip.setContent(table);
    return true;
}
/**
@private
在任务属性变化时执行的响应
@param {SFDataTask} task 正在绘制的任务
@param {Json} mapObj 绘制记录对象
@param {String[]} changedFields 变化的属性数组
*/
SFGanttMapMilestoneTrackHead.prototype.onUpdate = function (task, mapObj, changedFields) {
    if (!task.BaselineStart || !task.BaselineFinish) { return; }
    var gantt = this.control.gantt, start = task.BaselineStart, finish = task.BaselineFinish;
    if (!start || !finish || start.valueOf() != finish.valueOf()) { this.remove(task, mapObj); return; }
    if (SFGlobal.findInArray(changedFields, "ClassName")) {
        this.remove(task, mapObj);
        this.show(task, mapObj);
        return;
    }
    var div = mapObj[this.name];
    if (!div) {
        this.show(task, mapObj);
    }
}
/**
@private
清除对该任务的绘制
@param {SFDataTask} task 需要清除绘制的任务
@param {Json} mapObj 绘制记录对象
*/
SFGanttMapMilestoneTrackHead.prototype.remove = function (task, mapObj) {
    SFEvent.deposeNode(mapObj[this.name]);
    delete mapObj[this.name];
}
window.SFGanttMapMilestoneTrackHead = SFGanttMapMilestoneTrackHead;
/**
用来代表甘特图之中一个显示列定义的类，其他所有的列定义都是继承此类，甘特图左侧列表之中的各列和右侧图标之中的相关信息的显示都是通过一个或多个域来完成的，SFGanttField类管理这些域
@param {Json} obj 列的定义信息
@param {Number} [obj.width=100] 列的显示宽度，默认为100像素
@param {String} [obj.headText=''] 列的表头内容，例如"起始时间"
@param {Function} [obj.headFunc] 列的表头绘制方法
@param {Function} [obj.bodyFunc] 列的表内容绘制方法
@param {Function} [obj.inputFunc] 如果该列支持编辑，列的编辑模式绘制方法
@param {String} [obj.inputData] 如果该列支持编辑，列的所编辑的属性字段名称，例如"Start"
@param {String} [obj.bodyData] 该列的表内容对应的属性字段名称，例如"Start"，如果有多个，用逗号分隔，当这些字段变化时，将会重绘此列
@param {Bool} [obj.ReadOnly=false] 该列是否只读
@class
*/
function SFGanttField() {
    if (arguments.length <= 0) { return; }
    SFGlobal.setProperty(this, { width: 100, headText: '', headStyle: { textAlign: 'center' }, bodyStyle: { textAlign: 'left' }, inputStyle: {} });
    var obj = arguments[0];
    if (typeof (obj) != "object") {
        var argu = arguments;
        obj = {};
        if (argu[0]) { obj.width = argu[0]; }
        if (argu[1]) { obj.headText = argu[1]; }
        if (argu[2]) { obj.headFunc = argu[2]; }
        if (argu[3]) { obj.bodyFunc = argu[3]; }
        if (argu[4]) { obj.inputFunc = argu[4]; }
        if (argu[5]) { obj.inputData = argu[5]; }
        if (argu[6]) { obj.bodyData = argu[6]; }
    }
    SFGlobal.setProperty(this, obj);
}
/**
根据列名称和类型获得指定的列对象
@private
@param {String} type 列类型，例如"Task","Link","Resource"或"Assignment"
@param {String} name 列名称，例如"Start"
@returns {SFGanttField}
*/
SFGanttField.getField = function (type, name) {
    var fields = SFGanttField["_Fields_" + type];
    if (!fields || !fields[name]) { SFGanttField.setField(type, name, new SFGanttField(100, name)); }
    if (!fields) { fields = SFGanttField["_Fields_" + type]; }
    return fields[name];
}
/**
根据列名称数组和类型获得指定的列对象数组
@private
@param {String} type 列类型，例如"Task","Link","Resource"或"Assignment"
@param {String[]} name 列名称数组，例如["Start","Finish"]
@returns {SFGanttField[]}
*/
SFGanttField.getFields = function (type, names) {
    var fields = [];
    for (var i = 0; i < names.length; i++) {
        if (!names[i]) { continue; }
        fields.push(SFGanttField.getField(type, names[i]));
    }
    return fields;
}
/**
注册指定类型和名称的列
@private
@param {String} type 列类型，例如"Task","Link","Resource"或"Assignment"
@param {String} name 列名称，例如"myProperty"
@param {SFGanttField} 列对象
*/
SFGanttField.setField = function (type, name, field) {
    var fields = SFGanttField["_Fields_" + type];
    if (!fields) { fields = SFGanttField["_Fields_" + type] = {}; }
    fields[name] = field;
    field.Name = name;
}
/**
根据列名称数组获得对应的任务列对象数组
@private
@param {String[]} name 列名称数组，例如["Start","Finish"]
@returns {SFGanttField[]}
*/
SFGanttField.getTaskFields = function (names) { return SFGanttField.getFields("Task", names); }
/**
根据列名称数组获得对应的资源列对象数组
@private
@param {String[]} name 列名称数组，例如["Name","Notes"]
@returns {SFGanttField[]}
*/
SFGanttField.getResourceFields = function (names) { return SFGanttField.getFields("Resource", names); }
/**
根据列名称数组获得对应的链接列对象数组
@private
@param {String[]} name 列名称数组，例如["FromTask","ToTask"]
@returns {SFGanttField[]}
*/
SFGanttField.getLinkFields = function (names) { return SFGanttField.getFields("Link", names); }
/**
根据列名称获得对应的任务列对象
@param {String} name 列名称，例如"Start"，所有系统集成任务列的定义请参看 {@link SFGanttField.taskFields}
@returns {SFGanttField} 返回对应的列对象
*/
SFGanttField.getTaskField = function (name) { return SFGanttField.getField("Task", name); }
/**
根据列名称获得对应的资源列对象
@param {String} name 列名称，例如"Name"，所有系统集成任务列的定义请参看 {@link SFGanttField.resourceFields}
@returns {SFGanttField} 返回对应的列对象
*/
SFGanttField.getResourceField = function (name) { return SFGanttField.getField("Resource", name); }
/**
根据列名称获得对应的链接列对象
@param {String} name 列名称，例如"FromTask"，所有系统集成链接列的定义请参看 {@link SFGanttField.linkFields}
@returns {SFGanttField} 返回对应的列对象
*/
SFGanttField.getLinkField = function (name) { return SFGanttField.getField("Link", name); }
/**
注册指定名称的任务列
@param {String} name 列名称，例如"myProperty"
@param {SFGanttField} field 列对象
*/
SFGanttField.setTaskField = function (name, field) { return SFGanttField.setField("Task", name, field); }
/**
注册指定名称的资源列
@param {String} name 列名称，例如"myProperty"
@param {SFGanttField} field 列对象
*/
SFGanttField.setResourceField = function (name, field) { return SFGanttField.setField("Resource", name, field); }
/**
注册指定名称的链接列
@param {String} name 列名称，例如"myProperty"
@param {SFGanttField} field 列对象
*/
SFGanttField.setLinkField = function (name, field) { return SFGanttField.setField("Link", name, field); }
/**
添加指定的任务列，此函数是为了和以前的版本兼容，现在已经过期
@private
@deprecated
*/
SFGanttField.addTaskField = function (name, width, headText, headFunc, bodyFunc, inputFunc, inputData, bodyData) { SFGanttField.setField("Task", name, new SFGanttField({ width: width, headText: headText, headFunc: headFunc, bodyFunc: bodyFunc, inputFunc: inputFunc, inputData: inputData, bodyData: bodyData })); }


/**
设置列宽度
@param {Number} width 列宽度的像素值
*/
SFGanttField.prototype.setWidth = function (width) { this.width = parseInt(width); }
/**
设置列的表格头文字
@param {String} text 表格头文字，支持HTML
*/
SFGanttField.prototype.setHeadText = function (text) { this.headText = text; }
/**
设置列的表格头对齐方式
@param {String} align 对齐方式，有"left","center","right"三种对齐方式
*/
SFGanttField.prototype.setHeadAlign = function (align) { this.setHeadStyle({ textAlign: align }); }
/**
设置列的表格头显示字体颜色
@param {String} color 颜色值，例如"red"或者"#FF0000"
*/
SFGanttField.prototype.setHeadColor = function (color) { this.setHeadStyle({ color: color }) }
/**
设置列的表格头显示背景色
@param {String} color 颜色值，例如"red"或者"#FF0000"
*/
SFGanttField.prototype.setHeadBgColor = function (color) { this.setHeadStyle({ backgroundColor: color }); }
/**
以CSS方式直接设置列的表格头显示样式表
@param {Json} style 需要设置的样式表集合，例如{backgroundColor:'#666600',fontSize:'13px'}
*/
SFGanttField.prototype.setHeadStyle = function (obj) { SFGlobal.setProperty(this.headStyle, obj); }
/**
设置列的表格内容对齐方式
@param {String} align 对齐方式，有"left","center","right"三种对齐方式
*/
SFGanttField.prototype.setBodyAlign = function (align) { this.setBodyStyle({ textAlign: align }); }
/**
设置列的表格内容显示字体颜色
@param {String} color 颜色值，例如"red"或者"#FF0000"
*/
SFGanttField.prototype.setBodyColor = function (color) { this.setBodyStyle({ color: color }); }
/**
设置列的表格内容显示背景颜色
@param {String} color 颜色值，例如"red"或者"#FF0000"
*/
SFGanttField.prototype.setBodyBgColor = function (color) { this.setBodyStyle({ backgroundColor: color }); }
/**
以CSS方式直接设置列的表格内容显示样式表
@param {Json} style 需要设置的样式表集合，例如{backgroundColor:'#666600',fontSize:'13px'}
*/
SFGanttField.prototype.setBodyStyle = function (obj) { SFGlobal.setProperty(this.bodyStyle, obj); }
/**
设置列的编辑模式绘制方法
@private
@param {Function} handle编辑模式绘制方法的函数
*/
SFGanttField.prototype.setInputHandle = function (handle) { this.inputFunc = handle; }
/**
以CSS方式直接设置列的表格标记模式样式表
@param {Json} style 需要设置的样式表集合，例如{backgroundColor:'#666600',fontSize:'13px'}
*/
SFGanttField.prototype.setInputStyle = function (obj) { SFGlobal.setProperty(this.inputStyle, obj); }
/**
设置列是否只读，如果设置为只读,则在点击一列的时候该列不会进入编辑状态，如果设置为false(默认为false)，必须指定编辑状态的绘制句柄
@param {Bool} ReadOnly
*/
SFGanttField.prototype.setReadOnly = function (ReadOnly) { this.ReadOnly = ReadOnly; }
/**
显示表格头
@private
@param {HtmlElement} cell 用来显示表格头的容器
@param {SFGanttControl} list 当前调用显示的控件对象
*/
SFGanttField.prototype.showHead = function (cell, list) {
    SFEvent.deposeNode(cell, true);
    SFGlobal.setProperty(cell.style, this.headStyle);
    return this.headFunc(cell, list);
}
/**
显示表格内容
@private
@param {HtmlElement} cell 用来显示表格内容的容器
@param {SFDataElement} element 当前行对应的数据元素
@param {SFGanttControl} list 当前调用显示的控件对象
*/
SFGanttField.prototype.showBody = function (cell, element, list) {
    SFEvent.deposeNode(cell, true);
    SFGlobal.setProperty(cell.style, this.bodyStyle);
    return this.bodyFunc(cell, element, list);
}
/**
显示编辑界面
@private
@param {HtmlElement} cell 用来显示编辑界面的容器
@param {SFDataElement} element 当前行对应的数据元素
@param {SFGanttControl} list 当前调用显示的控件对象
*/
SFGanttField.prototype.showInput = function (cell, element, list) {
    SFEvent.deposeNode(cell, true);
    SFGlobal.setProperty(cell.style, this.bodyStyle);
    SFGlobal.setProperty(cell.style, this.inputStyle);
    return this.inputFunc(cell, element, list);
}
/**
在元素被更新时，检查所当前列是否需要重绘
@private
@param {Json} changedFields 元素的更新字段列表
returns {Bool} 如果需要重绘，返回true
*/
SFGanttField.prototype.checkUpdate = function (changedFields) {
    if (!this.bodyData) { return false; }
    var datas = this.bodyData.split(",");
    for (var j = 0; j < datas.length; j++) {
        for (var k = 0; k < changedFields.length; k++) {
            if (changedFields[k] == datas[j]) {
                return true;
            }
        }
    }
    return false;
}
/**
默认的表格头绘制方法，将列的headText内容直接显示在表格头之中，支持HTML语法
@private
@param {HtmlElement} cell 用来显示表格头的容器
*/
SFGanttField.prototype.headFunc = function (cell) {
    cell.innerHTML = this.headText;
}
/**
默认的表格内容绘制方法，将bodyData字段的内容直接显示在表格内容之中
@private
@param {HtmlElement} cell 用来显示表格内容的容器
@param {SFDataElement} element 当前行对应的数据元素
@param {SFGanttControl} list 当前调用显示的控件对象
*/
SFGanttField.prototype.bodyFunc = function (cell, element, list) {
    var value = element[this.bodyData];
    value = (typeof (value) != "undefined") ? value : "";
    cell.appendChild(cell.ownerDocument.createTextNode(value));
}
/**
创建编辑的默认输入框
@private
@param {HtmlElement} div 用来显示输入框的容器
@returns {HtmlElement} 创建完成的输入框HTML元素
*/
SFGanttField.prototype.createInput = function (div) {
    var input = div.ownerDocument.createElement("input");
    SFGlobal.setProperty(input.style, { width: "100%", height: "100%", border: 'solid 2px #000000', overflow: 'hidden' });
    SFEvent.addListener(input, "click", SFEvent.returnTrue);
    SFEvent.addListener(input, "mouseup", SFEvent.returnTrue);
    SFEvent.addListener(input, "mousedown", function (e) {
        SFEvent.removeListener(input.cml);
        input.cml = SFEvent.addListener(input, "contextmenu", SFEvent.returnTrue);
        SFEvent.returnTrue(e);
    });
    SFEvent.addListener(input, "selectstart", SFEvent.returnTrue);
    input.cml = SFEvent.addListener(input, "contextmenu", SFEvent.cancelBubble);
    return input;
}
/**
默认的表格编辑模式绘制方法，以单行文本框方式输入
@private
@param {HtmlElement} cell 用来显示编辑界面的容器
@param {SFDataElement} element 当前行对应的数据元素
@param {SFGanttControl} list 当前调用显示的控件对象
*/
SFGanttField.prototype.inputFunc = function (cell, element, list) {
    var inputData = this.inputData, field = this;
    var value = element[this.inputData];
    var input = this.createInput(cell, field, list);
    input.value = (typeof (value) != "undefined") ? value : "";
    SFEvent.addListener(input, "keydown", function (e) {
        if (e.keyCode == 27) {
            var value = element[inputData];
            input.value = (typeof (value) != "undefined") ? value : "";
        }
        if (e.keyCode == 13) {
            element.setProperty(inputData, input.value);
            SFEvent.deposeNode(cell, true);
            field.showBody(cell, element, list);
        }
    });
    SFEvent.addListener(input, "change", function () {
        element.setProperty(inputData, input.value);
    });
    cell.appendChild(input);
    input.focus();
}

/**
用来对Bool值进行显示和编辑的列定义
@param {Json} obj 列的定义信息
@param {Number} [obj.width=100] 列的显示宽度，默认为100像素
@param {String} [obj.headText=''] 列的表头内容，例如"关键"
@param {String} [obj.bodyData] 该列对应的属性字段名称，例如"Critical"
@param {Bool} [obj.ReadOnly=false] 该列是否只读
@class
@extends SFGanttField
*/
function SFGanttFieldBool() {
    if (arguments.length <= 0) { return }
    SFGanttField.apply(this, arguments);
    this.inputData = this.bodyData;
}
SFGanttFieldBool.prototype = new SFGanttField();
/**
将Bool值显示为"是\否"的绘制方法
@private
@param {HtmlElement} cell 用来显示表格内容的容器
@param {SFDataElement} element 当前行对应的数据元素
@param {SFGanttControl} list 当前调用显示的控件对象
*/
SFGanttFieldBool.prototype.bodyFunc = function (cell, element, list) {
    if (!this.ReadOnly) {
        this.inputFunc(cell, element, list);
        return;
    }
    var value = element[this.bodyData];
    var boolTypes = list.gantt.config.getConfig("SFGanttField/boolTypes")
    cell.appendChild(cell.ownerDocument.createTextNode(value ? boolTypes[1] : boolTypes[0]));
}
/**
将Bool值使用复选框来编辑的绘制方法
@private
@param {HtmlElement} cell 用来显示编辑界面的容器
@param {SFDataElement} element 当前行对应的数据元素
@param {SFGanttControl} list 当前调用显示的控件对象
*/
SFGanttFieldBool.prototype.inputFunc = function (cell, element, list) {
    var inputData = this.inputData, field = this;
    var value = element[this.bodyData];
    var input = cell.ownerDocument.createElement("input");
    input.type = "checkbox";
    cell.appendChild(input);
    input.checked = !!value;
    SFEvent.addListener(input, "click", function (e) {
        var btn = SFEvent.getEventButton(e);
        if (btn && btn != 1) { return; }
        element.setProperty(inputData, input.checked);
        SFEvent.returnTrue(e);
    });
}

/**
用来对百分比数字进行显示和编辑的列定义
@param {Json} obj 列的定义信息
@param {Number} [obj.width=100] 列的显示宽度，默认为100像素
@param {String} [obj.headText=''] 列的表头内容，例如"完成百分比"
@param {String} [obj.bodyData] 该列对应的属性字段名称，例如"PercentComplete"
@param {Bool} [obj.ReadOnly=false] 该列是否只读
@class
@extends SFGanttField
*/
function SFGanttFieldPercent() {
    SFGanttField.apply(this, arguments);
    this.inputFunc = this.bodyFunc;
}
SFGanttFieldPercent.prototype = new SFGanttField();
/**
将Bool值显示为一个可拖动横条的绘制方法，此方法同时也是编辑界面绘制方法
@private
@param {HtmlElement} cell 用来显示表格内容的容器
@param {SFDataElement} element 当前行对应的数据元素
@param {SFGanttControl} list 当前调用显示的控件对象
*/
SFGanttFieldPercent.prototype.bodyFunc = function (cell, element, list) {
    //inforcenter 根据PercentHidden属性值判断是否显示百分比进度条
    if (element.PercentHidden == "true") {
        return;
    }
    var value = element[this.bodyData], doc = cell.ownerDocument;
    value = (typeof (value) != "undefined") ? value : 0;
    value = Math.max(0, Math.min(value, 100));
    var div = doc.createElement("div");
    //inforcenter
    SFGlobal.setProperty(div.style, { position: 'relative', width: '90%', textAlign: 'center', 'border-radius': '2px', 'margin-left': '5%' });
    cell.appendChild(div);
    var span = doc.createElement("div");
    SFGlobal.setProperty(span.style, { position: 'absolute', left: '0px', top: '0px', width: value + '%', height: '100%', backgroundColor: '#90CEF5', zIndex: 2 });
    div.appendChild(span);
    if (!this.ReadOnly) {
        var bar = doc.createElement("div");
        //inforcenter
        SFGlobal.setProperty(bar.style, { position: 'absolute', left: value + '%', top: '0px', width: '2px', height: '100%', backgroundColor: 'blue', zIndex: 3, display: 'none' });
        SFGlobal.setCursor(bar, 'col-resize');
        SFDragObject.setup(bar, SFEvent.getCallback(this, this.onBarMove(element, div)), { container: div });
        div.appendChild(bar);
    }
    var text = doc.createElement("span");
    SFGlobal.setProperty(text.style, { position: 'relative', zIndex: 4 });
    text.appendChild(doc.createTextNode(value + "%"));
    div.appendChild(text);
}
/**
生成在用户拖动百分比条时执行的函数的回调函数
@private
@param {SFDataElement} element 当前元素
@param {HtmlElement} div 当前显示百分比条的层
@returns {Function}
*/
SFGanttFieldPercent.prototype.onBarMove = function (element, div) {
    return function (sp, lp, type) {
        var width = Math.min(Math.max(lp[0], 0), div.offsetWidth - 2);
        var percent = Math.round(100 * width / (div.offsetWidth - 2));
        if (type != "end") {
            div.firstChild.style.width = width + "px";
            div.firstChild.nextSibling.style.left = width + "px";
            div.lastChild.nodeValue = percent + "%";
        }
        else {
            element.setProperty(this.bodyData, percent);
        }
    }
}
/**
用来显示一个实体信息的列定义,列一定只读
@param {Json} obj 列的定义信息
@param {Number} [obj.width=100] 列的显示宽度，默认为100像素
@param {String} [obj.headText=''] 列的表头内容，例如"完成百分比"
@param {String} [obj.bodyData] 该列对应的属性字段名称，例如"PercentComplete"
@class
@extends SFGanttField
*/
function SFGanttFieldElement() {
    SFGanttField.apply(this, arguments);
    this.ReadOnly = true;
}
SFGanttFieldElement.prototype = new SFGanttField();
/**
显示对应的元素信息的绘制方法
@private
@param {HtmlElement} cell 用来显示表格内容的容器
@param {SFDataElement} element 当前行对应的数据元素
@param {SFGanttControl} list 当前调用显示的控件对象
*/
SFGanttFieldElement.prototype.bodyFunc = function (cell, element, list) {
    var target = element[this.bodyData];
    if (!target) { return; }
    var info = "(" + SFGanttField.getField(target.elementType, "UID").headText + " " + target.UID + ") " + target.Name;
    cell.appendChild(cell.ownerDocument.createTextNode(info));
}

/**
用来显示一个实体是否被选中的列定义，列的bodyData被强制为"Selected"，并且列的ReadOnly无效
@param {Json} obj 列的定义信息
@param {Number} [obj.width=100] 列的显示宽度，默认为100像素
@param {String} [obj.headText=''] 列的表头内容，例如"完成百分比"
@class
@extends SFGanttFieldBool
*/
function SFGanttFieldSelected() {
    SFGanttFieldBool.apply(this, arguments);
    this.bodyData = "Selected";
}
SFGanttFieldSelected.prototype = new SFGanttFieldBool();
/**
将可点击直接选中的复选框用来更改元素的选中状态
@private
@param {HtmlElement} cell 用来显示编辑界面的容器
@param {SFDataElement} element 当前行对应的数据元素
@param {SFGanttControl} list 当前调用显示的控件对象
*/
SFGanttFieldSelected.prototype.inputFunc = function (cell, element, list) {
    var inputData = this.inputData, field = this;
    var value = element[this.bodyData];
    var input = cell.ownerDocument.createElement("input");
    input.type = "checkbox";
    //region inforcenter
    input.id = "gantt_check_" + element.ID;
    SFGlobal.setProperty(input.style, { display: 'none' });
    //endregion
    cell.appendChild(input);
    input.checked = !!value;
    //region inforcenter
    cell.style.textAlign = "center";
    var label = cell.ownerDocument.createElement("label");
    label.htmlFor = input.id;
    label.className = "htgrid-row-check";
    SFGlobal.setProperty(label.style, { margin: '0', cursor: 'default' });

    if (input.checked == true) {
        label.className += " htgrid-check-true";
    } else {
        label.className += " htgrid-check-false";
    }
    cell.appendChild(label);
    SFEvent.addListener(label, "mouseup", SFEvent.returnTrue);
    SFEvent.addListener(label, "mousedown", SFEvent.returnTrue);
    SFEvent.addListener(label, "click", function (e) {
        SFEvent.returnTrue(e);
        element.setProperty("Selected", input.checked);
    });
    //endregion
    SFEvent.addListener(input, "mouseup", SFEvent.returnTrue);
    SFEvent.addListener(input, "mousedown", SFEvent.returnTrue);
    SFEvent.addListener(input, "click", function (e) {
        SFEvent.returnTrue(e);
        element.setProperty("Selected", input.checked);
    });
}

/**
用来对比较长的文本进行显示和编辑的列定义
@param {Json} obj 列的定义信息
@param {Number} [obj.width=100] 列的显示宽度，默认为100像素
@param {String} [obj.headText=''] 列的表头内容，例如"完成百分比"
@param {String} [obj.bodyData] 该列对应的属性字段名称，例如"PercentComplete"
@param {Bool} [obj.ReadOnly=false] 该列是否只读
@class
@extends SFGanttField
*/
function SFGanttFieldLongText() {
    SFGanttField.apply(this, arguments);
    this.inputData = this.bodyData;
}
SFGanttFieldLongText.prototype = new SFGanttField();
/**
提供长段的文本显示和编辑的方法
@private
@param {HtmlElement} cell 用来显示内容或编辑界面的容器
@param {SFDataElement} element 当前行对应的数据元素
@param {SFGanttControl} list 当前调用显示的控件对象
*/
SFGanttFieldLongText.prototype.inputFunc = function (cell, element, list) {
    var inputData = this.inputData, field = this;
    var value = element[inputData];
    var position = SFEvent.getPageOffset(cell, list.container);
    var input = cell.ownerDocument.createElement("textarea");
    SFGlobal.setProperty(input.style, { position: 'absolute', left: position[0] + 'px', top: position[1] + 'px', width: (this.width - 2) + "px", height: "100px", border: 'solid 1px #000000', overflow: 'hidden', zIndex: 100 });
    SFEvent.addListener(input, "click", SFEvent.returnTrue);
    SFEvent.addListener(input, "mouseup", SFEvent.returnTrue);
    SFEvent.addListener(input, "mousedown", function (e) {
        SFEvent.removeListener(input.cml);
        input.cml = SFEvent.addListener(input, "contextmenu", SFEvent.returnTrue);
        SFEvent.returnTrue(e);
    });
    SFEvent.addListener(input, "selectstart", SFEvent.returnTrue);
    input.cml = SFEvent.addListener(input, "contextmenu", SFEvent.cancelBubble);
    input.value = (typeof (value) != "undefined") ? value : "";
    if (!this.ReadOnly) {//如果不为只读，则加入事件支持
        SFEvent.addListener(input, "keydown", function (e) {
            if (e.keyCode == 27) {
                var value = element[inputData];
                input.value = (typeof (value) != "undefined") ? value : "";
            }
        });
        SFEvent.addListener(input, "change", function () {
            element.setProperty(inputData, input.value);
        });
    }
    else {
        input.disabled = true;
    }
    SFEvent.addListener(input, "blur", function () {
        SFEvent.deposeNode(input);
    });
    list.container.appendChild(input);
    input.focus();
}
/**
用来对日期时间格式进行显示和编辑的列定义，需要说明的是，这个列定义并没有提供日期的可视化输入界面
实际上甘特图自身并不提供日期的可视化输入功能，不过可以加载其他JS类型的可视化日期界面，详细使用方法可参照范例
@param {Json} obj 列的定义信息
@param {Number} [obj.width=100] 列的显示宽度，默认为100像素
@param {String} [obj.headText=''] 列的表头内容，例如"起始时间"
@param {String} [obj.bodyData] 该列对应的属性字段名称，例如"Start"
@param {Bool} [obj.ReadOnly=false] 该列是否只读
@class
@extends SFGanttField
*/
function SFGanttFieldDateTime() {
    SFGanttField.apply(this, arguments);
    this.inputData = this.bodyData;
}
SFGanttFieldDateTime.prototype = new SFGanttField();
/**
提供日期显示的方法，将日期显示为在 {@link SFConfig.SFGanttField/dateShowFormat}配置项之中指定的格式
@private
@param {HtmlElement} cell 用来显示内容或编辑界面的容器
@param {SFDataElement} element 当前行对应的数据元素
@param {SFGanttControl} list 当前调用显示的控件对象
*/
SFGanttFieldDateTime.prototype.bodyFunc = function (cell, element, list) {
    var v = element[this.bodyData];
    var str = (v && v > 0) ? SFGlobal.getDateString(element[this.bodyData], list.gantt.config.getConfig("SFGanttField/dateShowFormat")) : "";
    cell.appendChild(cell.ownerDocument.createTextNode(str));
}
/**
提供日期时间编辑的方法，仅仅提输入检查，不提供可视化输入日期的方式
@private
@param {HtmlElement} cell 用来显示内容或编辑界面的容器
@param {SFDataElement} element 当前行对应的数据元素
@param {SFGanttControl} list 当前调用显示的控件对象
*/
SFGanttFieldDateTime.prototype.inputFunc = function (cell, element, list) {
    if (this.disableSummaryEdit && element.Summary) {
        SFEvent.deposeNode(cell, true);
        this.showBody(cell, element, list);
        return;
    }
    var inputData = this.inputData, field = this;
    var value = element[field.inputData];
    value = (typeof (value) != "undefined") ? value : new Date();
    var input = SFGanttField.createInput(cell, field, list);
    var config = list.gantt.config.getConfig("SFGanttField");
    input.value = SFGlobal.getDateString(value, config.dateInputFormat);
    SFEvent.addListener(input, "keydown", function (e) {
        if (e.keyCode == 27) {
            var value = element[field.inputData];
            input.value = SFGlobal.getDateString(value, config.dateInputFormat);
        }
        if (e.keyCode == 13) {
            if (input.value) {
                var value = SFGlobal.getDate(input.value);
                if (value && !isNaN(value)) {
                    element.setProperty(inputData, value);
                    SFEvent.deposeNode(cell, true);
                    field.showBody(cell, element, list);
                }
                else {
                    if (config.noticeWrongFormat) { alert(config.noticeWrongFormat); }
                    input.focus();
                }
            }
            else {
                element.setProperty(inputData, null);
            }
        }
    });
    SFEvent.addListener(input, "change", function () {
        if (input.value) {
            var value = SFGlobal.getDate(input.value);
            if (value && !isNaN(value)) {
                element.setProperty(inputData, value);
            }
            else {
                if (config.noticeWrongFormat) { alert(config.noticeWrongFormat); }
                input.focus();
            }
        }
        else {
            element.setProperty(inputData, null);
        }
    });

    cell.appendChild(input);
    input.focus();
}
/**
用来显示两个日期字段之间工期的列定义，这个列被强制为只读，不允许编辑,
该列会使用数据的工作日历来计算工期
@param {Json} obj 列的定义信息
@param {Number} [obj.width=100] 列的显示宽度，默认为100像素
@param {String} [obj.headText=''] 列的表头内容，例如"工期"
@param {String} [obj.bodyData] 该列对应的起始和结束属性字段名称，以逗号分隔，例如"Start,Finish"
@class
@extends SFGanttField
*/
function SFGanttFieldDuration() {
    SFGanttField.apply(this, arguments);
    this.ReadOnly = true;
}
SFGanttFieldDuration.prototype = new SFGanttField();
/**
提供工期显示的方法
@private
@param {HtmlElement} cell 用来显示内容或编辑界面的容器
@param {SFDataElement} element 当前行对应的数据元素
@param {SFGanttControl} list 当前调用显示的控件对象
*/
SFGanttFieldDuration.prototype.bodyFunc = function (cell, element, list) {
    var data = this.bodyData.split(","), start = element[data[0]], finish = element[data[1]], num = 0;
    if (!start || !finish) { return; }
    cell.appendChild(cell.ownerDocument.createTextNode(SFGlobal.formatString(list.gantt.config.getConfig("SFGanttField/durationFormat"), element.getDuration(start, finish))));
}
/**
用来使用一个自定义的转换表进行显示和选择的列的定义,例如可能需要定义将数据源之中的"Student"显示为"学生"，"Teacher"显示为"老师"，
可以使用此列定义来实现，在编辑的时候，将会显示下拉选单改变此列的内容
@param {Json} obj 列的定义信息
@param {Number} [obj.width=100] 列的显示宽度，默认为100像素
@param {String} [obj.headText=''] 列的表头内容，例如"类型"
@param {String} [obj.bodyData] 该列对应的起始和结束属性字段名称，以逗号分隔，例如"Start,Finish"
@param {Bool} [obj.ReadOnly=false] 该列是否只读
@param {Json} obj.options 定义转换表，例如{Student:'学生',Teacher:'老师'}
@class
@extends SFGanttField
*/
function SFGanttFieldSelecter() {
    SFGanttField.apply(this, arguments);
    this.inputData = this.bodyData;
}
SFGanttFieldSelecter.prototype = new SFGanttField();
/**
获得转换表数组，目前没有支持根据元素不同而改变转换表的功能
@private
@param {SFDataElement} element 当前行对应的数据元素
@param {SFGanttControl} list 当前调用显示的控件对象
@returns {Array}
*/
SFGanttFieldSelecter.prototype._getOptions = function (element, list) {
    var options = this.getOptions(element, list);
    if (options) {
        if (!options.length) {
            var item, opts = options;
            options = [];
            for (item in opts) {
                if (typeof (opts[item]) == "string") {
                    options.push([item, opts[item]]);
                }
            }
        }
    }
    return options;
}
/**
返回转换表配置
@private
@returns {Json}
*/
SFGanttFieldSelecter.prototype.getOptions = function () {
    return this.options;
}
/**
提供根据转换表映射显示内容的方法
@private
@param {HtmlElement} cell 用来显示内容或编辑界面的容器
@param {SFDataElement} element 当前行对应的数据元素
@param {SFGanttControl} list 当前调用显示的控件对象
*/
SFGanttFieldSelecter.prototype.bodyFunc = function (cell, element, list) {
    var inputData = this.inputData, field = this, options = this._getOptions(element, list), doc = cell.ownerDocument;
    var value = element[inputData];
    for (var i = 0; i < options.length; i++) {
        if (typeof (options[i]) == "object" && options[i].length > 1 && options[i][0] == value) {
            cell.appendChild(doc.createTextNode(options[i][1]));
            return;
        }
        if (typeof (options[i]) != "object" && i == value) {
            cell.appendChild(doc.createTextNode(options[i]));
            return;
        }
    }
    cell.appendChild(doc.createTextNode((typeof (value) != "undefined") ? value : ""));
}
/**
提供根据转换表映射显示下拉选单进行编辑的方法
@private
@param {HtmlElement} cell 用来显示内容或编辑界面的容器
@param {SFDataElement} element 当前行对应的数据元素
@param {SFGanttControl} list 当前调用显示的控件对象
*/
SFGanttFieldSelecter.prototype.inputFunc = function (cell, element, list) {
    var inputData = this.inputData, field = this, options = this._getOptions(element, list);
    var value = element[inputData];
    var input = cell.ownerDocument.createElement("select");
    SFEvent.addListener(input, "click", SFEvent.returnTrue);
    SFEvent.addListener(input, "mouseup", SFEvent.returnTrue);
    SFEvent.addListener(input, "mousedown", function (e) {
        SFEvent.removeListener(input.cml);
        input.cml = SFEvent.addListener(input, "contextmenu", SFEvent.returnTrue);
        SFEvent.returnTrue(e);
    });
    SFEvent.addListener(input, "selectstart", SFEvent.returnTrue);
    input.cml = SFEvent.addListener(input, "contextmenu", SFEvent.cancelBubble);
    for (var i = 0; i < options.length; i++) {
        var oi = options[i];
        if (typeof (oi) != "object") { oi = [i, oi]; }
        input.options.add(new Option(oi[1], oi[0]));
    }
    input.value = (typeof (value) != "undefined") ? value : "";
    SFEvent.addListener(input, "change", function () {
        element.setProperty(inputData, input.value);
    });
    cell.appendChild(input);
    input.focus();
}
/**
用来显示树形层次结构名称的列定义,此列将元素的名称根据元素的大纲以树形的结构显示，
该列可以编辑，编辑的内容为元素的名称字段内容
该列的bodyData和inputData都被强制指定，不允许配置
@param {Json} obj 列的定义信息
@param {Number} [obj.width=100] 列的显示宽度，默认为100像素
@param {String} [obj.headText=''] 列的表头内容，例如"名称"
@param {Bool} [obj.ReadOnly=false] 该列是否只读
@class
@extends SFGanttField
*/
function SFGanttFieldTreeName() {
    SFGanttField.apply(this, arguments);
    this.bodyData = "Name,Summary,Collapse";
    this.inputData = "Name";
}
SFGanttFieldTreeName.prototype = new SFGanttField();
/**
将名称按照大纲显示为树形结构的方法
@private
@param {HtmlElement} cell 用来显示内容或编辑界面的容器
@param {SFDataElement} element 当前行对应的数据元素
@param {SFGanttControl} list 当前调用显示的控件对象
*/
SFGanttFieldTreeName.prototype.bodyFunc = function (cell, element, list) {
    var doc = cell.ownerDocument;
    if (list) {
        for (var p = element; p; p = p.getParent()) {
            if (p == element && element.Summary) { continue; }
            cell.appendChild(doc.createTextNode("　"));
        }
    }
    if (element.Summary && list && !(list.gantt.hideSummary && list.gantt.inline))//如果是大纲，则允许折叠
    {
        var img = this.getCollapseImg(list.gantt, element.Collapse);
        cell.appendChild(img);
        SFEvent.addListener(img, "click", function (e) { SFEvent.returnTrue(e); element.setProperty("Collapse", !element.Collapse); });
    }
    cell.appendChild(doc.createTextNode((element.Name ? element.Name : '')));
}
/**
创建一个折叠按钮图片并返回
@private
@param {SFGantt} gantt 甘特图对象
@param {Bool} collapse 如果是关闭按钮，则为true,否则为false
@returns {HtmlElement} 返回HTML的IMG元素
*///inforcenter
SFGanttFieldTreeName.prototype.getCollapseImg = function (gantt, collapse) {
    var img = gantt.createImage("collapse_" + (collapse ? "close" : "open"));
    SFGlobal.setProperty(img.style, { margin: '1px', cursor: 'pointer', 'margin': '0px 5px 3px 0px' });
    return img;
}
/**
用来显示一个Icon列表的列定义,此列根据元素的属性在表格之中显示一系列状态图标，
该列不可以编辑
该列的bodyData和inputData都根据图标指定，不允许直接配置
@param {Json} obj 列的定义信息
@param {Number} [obj.width=100] 列的显示宽度，默认为100像素
@param {String} [obj.headText=''] 列的表头内容，例如"状态"
@class
@extends SFGanttField
*/
function SFGanttFieldIcon() {
    SFGanttField.apply(this, arguments);
    this.ReadOnly = true;
    this.bodyDatas = [];
    this.icons = [];
}
SFGanttFieldIcon.prototype = new SFGanttField();
/**
表格头绘制方法，此列在表格头之中也会显示一个图标
@private
@param {HtmlElement} cell 用来显示表格头的容器
*/
SFGanttFieldIcon.prototype.headFunc = function (cell, list) {
    var img = list.gantt.createImage("icon_taskstatus");
    SFGlobal.setProperty(img.style, { position: "relative" });
    cell.appendChild(img);
}
/**
将在表格之中显示状态图标的方法
@private
@param {HtmlElement} cell 用来显示内容或编辑界面的容器
@param {SFDataElement} element 当前行对应的数据元素
@param {SFGanttControl} list 当前调用显示的控件对象
*/
SFGanttFieldIcon.prototype.bodyFunc = function (cell, element, list) {
    cell.vAlign = "middle";
    var img;
    for (var i = 0; i < this.icons.length; i++) {
        if (img = this.icons[i].showHandle.apply(this, [element, list.gantt])) {
            cell.appendChild(img);
        }
    }
}
/**
创建一个HTML图标对象
@private
@param {SFGantt} gantt 甘特图对象
@param {String} name 图片名称
@returns {HtmlElement} 返回HTML IMG对象
*/
SFGanttFieldIcon.prototype.createImage = function (gantt, name) {
    var img = gantt.createImage(name);
    SFGlobal.setProperty(img.style, { position: "relative" });
    return img;
}
/**
新添加一种图标定义
@param {Function} showHandle 定义如何显示图标的函数
@param {String} data 定义在元素的哪些字段变化之后需要重新绘制图标
*/
SFGanttFieldIcon.prototype.addIcon = function (showHandle, data) {
    if (data) {
        var datas = data.split(",");
        for (var i = datas.length - 1; i >= 0; i--) { if (!SFGlobal.findInArray(this.bodyDatas, datas[i])) { this.bodyDatas.push(datas[i]); } }
        this.bodyData = this.bodyDatas.join(",");
    }
    this.icons.push({ showHandle: showHandle });
}
/**
初始化系统预先定义的列
@private
*/
SFGanttField.init = function () {
    if (SFGanttField.inited) { return; }
    SFGanttField.inited = true;
    //下面的这些函数是为了和以前的机制兼容
    SFGanttField.NormalHead = SFGanttField.prototype.headFunc;
    SFGanttField.NormalBody = SFGanttField.prototype.bodyFunc;
    SFGanttField.BoolBody = SFGanttFieldBool.prototype.bodyFunc
    SFGanttField.BoolInput = SFGanttFieldBool.prototype.inputFunc
    SFGanttField.BoolCheckbox = SFGanttFieldBool.prototype.inputFunc
    SFGanttField.createInput = SFGanttField.prototype.createInput
    SFGanttField.NormalInput = SFGanttField.prototype.inputFunc;
    SFGanttField.DateBody = SFGanttFieldDateTime.prototype.bodyFunc;
    SFGanttField.DateInput = SFGanttFieldDateTime.prototype.inputFunc;
    var config = window._SFGantt_config.SFGanttField;
    var names = config.fieldTexts;
    /**
    @name SFGanttField.taskFields
    @namespace 所有系统预定义的任务列，可使用  {@link SFGanttField.getTaskField}方法来获得这些列
    */
    /**
    空的任务列，不显示任何内容，
    默认宽度 36,只读
    @name SFGanttField.taskFields.Empty
    @type SFGanttField
    */
    SFGanttField.setTaskField("Empty", new SFGanttField({ width: 36, ReadOnly: true }));
    /**
    显示 {@link SFDataTask#UID}的列，
    默认宽度 36,只读
    @name SFGanttField.taskFields.UID
    @type SFGanttField
    */
    SFGanttField.setTaskField("UID", new SFGanttField({ width: 36, bodyData: 'UID', headText: names.UID, ReadOnly: true, bodyStyle: { textAlign: 'center' } }));
    /**
    显示 {@link SFDataTask#ID}的列，
    默认宽度 36,只读
    @name SFGanttField.taskFields.ID
    @type SFGanttField
    */
    SFGanttField.setTaskField("ID", new SFGanttField({ width: 36, bodyData: 'ID', headText: names.ID, ReadOnly: true, bodyStyle: { textAlign: 'center' } }))
    /**
    只显示和编辑名称 {@link SFDataTask#Name}的列，和下面的Name列大小写不同，也显示不同的内容，
    默认宽度 120
    @name SFGanttField.taskFields.name
    @type SFGanttField
    */
    SFGanttField.setTaskField("name", new SFGanttField({ width: 120, bodyData: 'Name', headText: names.TaskName }));
    /**
    用任务的大纲将 {@link SFDataTask#Name}显示为树形的列，请注意大小写，
    默认宽度 120
    @name SFGanttField.taskFields.Name
    @type SFGanttFieldTreeName
    */
    SFGanttField.setTaskField("Name", new SFGanttFieldTreeName({ width: 200, headText: names.TaskName }));
    /**
    显示大纲数字( {@link SFDataTask#OutlineNumber})的列，
    默认宽度 100，只读
    @name SFGanttField.taskFields.OutlineNumber
    @type SFGanttField
    */
    SFGanttField.setTaskField("OutlineNumber", new SFGanttField({ width: 100, bodyData: 'OutlineNumber', headText: names.OutlineNumber, ReadOnly: true }));
    /**
    显示任务状态图标的列，可以使用该列的 {@link SFGanttFieldIcon#addIcon}方法来自定义图标，
    默认宽度 100，只读
    系统之中默认支持了以下图标
    <ul>
        <li><img src="http://www.51diaodu.cn/sfgantt/img/icon_finished.gif"/> 当任务已完成时( {@link SFDataTask#PercentComplete}属性为100)显示</li>
        <li><img src="http://www.51diaodu.cn/sfgantt/img/icon_constraint2.gif"/> 当任务有限制类型( {@link SFDataTask#ConstraintType}为2,3,5,7)时显示</li>
        <li><img src="http://www.51diaodu.cn/sfgantt/img/icon_constraint4.gif"/> 当任务有限制类型( {@link SFDataTask#ConstraintType}为4,6)时显示</li>
        <li><img src="http://www.51diaodu.cn/sfgantt/img/icon_notes.gif"/> 当任务有备注信息( {@link SFDataTask#Notes})时显示</li>
        <li><img src="http://www.51diaodu.cn/sfgantt/img/icon_hyperlink.gif"/> 当任务有链接地址( {@link SFDataTask#HyperlinkAddress})时显示</li>
    </ul>
    @name SFGanttField.taskFields.StatusIcon
    @type SFGanttFieldIcon
    */
    var field = new SFGanttFieldIcon({ width: 32, headText: names.StatusIcon });
    field.addIcon(function (element, gantt) {
        if (!element.PercentComplete || element.PercentComplete < 100) { return; }
        var img = this.createImage(gantt, "icon_finished");
        if (gantt.setTooltip) {
            gantt.setTooltip(img, function (tooltip) {
                if (tooltip.bindObject == img) { return false; }
                tooltip.bindObject = img;
                tooltip.setContent(gantt.container.ownerDocument.createTextNode(SFGlobal.formatString(config.tooltipPercentComplete, SFGlobal.getDateString(element.Finish, config.dateShowFormat))))
                return true;
            });
        }
        return img;
    }, "PercentComplete");
    field.addIcon(function (element, gantt) {
        if (!element.ConstraintType || element.ConstraintType <= 1) { return; }
        var img = this.createImage(gantt, "icon_constraint" + element.ConstraintType);
        if (gantt.setTooltip) {
            gantt.setTooltip(img, function (tooltip) {
                if (tooltip.bindObject == img) { return false; }
                tooltip.bindObject = img;
                var str = SFGlobal.formatString(config.tooltipConstraint, [config.constraintTypes[element.ConstraintType], SFGlobal.getDateString(element.ConstraintDate, config.dateShowFormat)])
                tooltip.setContent(gantt.container.ownerDocument.createTextNode(str));
                return true
            });
        }
        return img;
    }, "ConstraintType,ConstraintDate");
    field.addIcon(function (element, gantt) {
        if (!element.Notes) { return; }
        var img = this.createImage(gantt, "icon_notes")
        if (gantt.setTooltip) {
            gantt.setTooltip(img, function (tooltip) {
                if (tooltip.bindObject == img) { return false; }
                tooltip.bindObject = img;
                var str = SFGanttField.getField(element.elementType, "Notes").headText + ": \"" + element.Notes + "\"";
                tooltip.setContent(gantt.container.ownerDocument.createTextNode(str));
                return true;
            });
        }
        return img;
    }, "Notes");
    field.addIcon(function (element, gantt) {
        if (!element.HyperlinkAddress) { return; }
        var link = gantt.container.ownerDocument.createElement("a");
        link.href = element.HyperlinkAddress;
        link.target = "_blank";
        var img = this.createImage(gantt, "icon_hyperlink");
        link.appendChild(img)
        if (gantt.setTooltip) {
            gantt.setTooltip(img, function (tooltip) {
                if (tooltip.bindObject == img) { return false; }
                tooltip.bindObject = img;
                var str = element.Hyperlink ? element.Hyperlink : element.HyperlinkAddress;
                tooltip.setContent(gantt.container.ownerDocument.createTextNode(str));
                return true;
            });
        }
        return link;
    }, "HyperlinkAddress,Hyperlink");
    SFGanttField.setTaskField("StatusIcon", field);
    /**
    显示任务工期的列，根据 {@link SFDataTask#Start}和 {@link SFDataTask#Finish}的时间间隔根据工作日历定义显示工期的天数
    默认宽度 60
    @name SFGanttField.taskFields.Duration
    @type SFGanttFieldDuration
    */
    SFGanttField.setTaskField("Duration", new SFGanttFieldDuration({ width: 60, bodyData: 'Start,Finish', headText: names.Duration }));
    /**
    显示和编辑任务的开始时间 {@link SFDataTask#Start}
    默认宽度 100
    @name SFGanttField.taskFields.Start
    @type SFGanttFieldDateTime
    */
    SFGanttField.setTaskField("Start", new SFGanttFieldDateTime({ width: 100, bodyData: 'Start', headText: names.Start, disableSummaryEdit: true, bodyStyle: { textAlign: 'center' } }));
    /**
    显示和编辑任务的结束时间 {@link SFDataTask#Finish}
    默认宽度 100
    @name SFGanttField.taskFields.Finish
    @type SFGanttFieldDateTime
    */
    SFGanttField.setTaskField("Finish", new SFGanttFieldDateTime({ width: 100, bodyData: 'Finish', headText: names.Finish, disableSummaryEdit: true, bodyStyle: { textAlign: 'center' } }));
    /**
    显示和编辑任务的备注信息 {@link SFDataTask#Notes}
    默认宽度 100
    @name SFGanttField.taskFields.Notes
    @type SFGanttFieldLongText
    */
    SFGanttField.setTaskField("Notes", new SFGanttFieldLongText({ width: 100, bodyData: 'Notes', headText: names.Notes }));
    /**
    显示和更改任务的样式 {@link SFDataTask#ClassName}
    默认宽度 120
    @name SFGanttField.taskFields.ClassName
    @type SFGanttFieldSelecter
    */
    SFGanttField.setTaskField("ClassName", new SFGanttFieldSelecter({ width: 120, bodyData: 'ClassName', headText: names.ClassName }));
    SFGanttField.getTaskField("ClassName").getOptions = true ? (function (element, list) {
        return { TaskNormal: 'TaskNormal', TaskImportant: 'TaskImportant', TaskUnimportant: 'TaskUnimportant' };
    }) : null;
    /**
    显示和更改任务的限制类型 {@link SFDataTask#ConstraintType}
    默认宽度 120
    @name SFGanttField.taskFields.ConstraintType
    @type SFGanttFieldSelecter
    */
    SFGanttField.setTaskField("ConstraintType", new SFGanttFieldSelecter({ width: 120, bodyData: 'ConstraintType', headText: names.ConstraintType, options: window._SFGantt_config.SFGanttField.constraintTypes }));
    /**
    显示和更改任务的限制时间 {@link SFDataTask#ConstraintDate}
    默认宽度 100
    @name SFGanttField.taskFields.ConstraintDate
    @type SFGanttFieldDateTime
    */
    SFGanttField.setTaskField("ConstraintDate", new SFGanttFieldDateTime({ width: 100, bodyData: 'ConstraintDate', headText: names.ConstraintDate }));
    /**
    显示和更改任务是否是关键任务 {@link SFDataTask#Critical}
    默认宽度 30
    @name SFGanttField.taskFields.Critical
    @type SFGanttFieldBool
    */
    SFGanttField.setTaskField("Critical", new SFGanttFieldBool({ width: 30, bodyData: 'Critical', headText: names.Critical }));
    /**
    显示任务是否被选中，也可以点击选中该任务
    默认宽度 30
    @name SFGanttField.taskFields.Selected
    @type SFGanttFieldSelected
    */
    SFGanttField.setTaskField("Selected", new SFGanttFieldSelected({ width: 30, headText: names.Selected }));
    /**
    显示任务的前置任务，该列只读
    默认宽度 100
    @name SFGanttField.taskFields.PredecessorTask
    @type SFGanttField
    */
    SFGanttField.setTaskField("PredecessorTask", new SFGanttField({
        width: 100, headText: names.PredecessorTask, bodyFunc: function (cell, task, list) {
            var ans = [], tasks = task.getPredecessorTasks();
            for (var i = 0; i < tasks.length; i++) {
                ans.push(tasks[i].Name);
            }
            cell.appendChild(cell.ownerDocument.createTextNode(ans.join(",")));
        }, ReadOnly: true
    }));
    /**
    显示任务的后置任务，该列只读
    默认宽度 100
    @name SFGanttField.taskFields.SuccessorTask
    @type SFGanttField
    */
    SFGanttField.setTaskField("SuccessorTask", new SFGanttField({
        width: 100, headText: names.SuccessorTask, bodyFunc: function (cell, task, list) {
            var ans = [], tasks = task.getSuccessorTasks();
            for (var i = 0; i < tasks.length; i++) {
                ans.push(tasks[i].Name);
            }
            cell.appendChild(cell.ownerDocument.createTextNode(ans.join(",")));
        }, ReadOnly: true
    }));
    /**
    显示任务的资源，该列只读
    默认宽度 100
    @name SFGanttField.taskFields.Resource
    @type SFGanttField
    */
    SFGanttField.setTaskField("Resource", new SFGanttField({
        width: 100, bodyData: 'Resource', headText: names.Resource, bodyFunc: function (cell, task, list) {
            var ans = [], assignments = task.getAssignments();
            for (var i = 0; i < assignments.length; i++) {
                var resource = assignments[i].getResource();
                if (resource) {
                    var name = resource.Name;
                    if (assignments[i].Units != 1) {
                        name += '[' + (assignments[i].Units * 100) + '%]';
                    }
                    ans.push(name);
                }
            }
            cell.appendChild(cell.ownerDocument.createTextNode(ans.join(",")));
        }, ReadOnly: true
    }));
    /**
    显示和更改任务的完成百分比 {@link SFDataTask#PercentComplete}
    默认宽度 100
    @name SFGanttField.taskFields.PercentComplete
    @type SFGanttFieldPercent
    */
    SFGanttField.setTaskField("PercentComplete", new SFGanttFieldPercent({ width: 100, bodyData: 'PercentComplete', headText: names.PercentComplete }));
    /**
    显示和更改任务的实际开始时间 {@link SFDataTask#ActualStart}
    默认宽度 100
    @name SFGanttField.taskFields.ActualStart
    @type SFGanttFieldDateTime
    */
    SFGanttField.setTaskField("ActualStart", new SFGanttFieldDateTime({ width: 100, bodyData: 'ActualStart', headText: names.ActualStart, disableSummaryEdit: true }));
    /**
    显示和更改任务的实际结束时间 {@link SFDataTask#ActualFinish}
    默认宽度 100
    @name SFGanttField.taskFields.ActualFinish
    @type SFGanttFieldDateTime
    */
    SFGanttField.setTaskField("ActualFinish", new SFGanttFieldDateTime({ width: 100, bodyData: 'ActualFinish', headText: names.ActualFinish, disableSummaryEdit: true }));
    /**
    显示任务的实际工期 {@link SFDataTask#ActualDuration}
    默认宽度 60 只读
    @name SFGanttField.taskFields.ActualDuration
    @type SFGanttFieldDuration
    */
    SFGanttField.setTaskField("ActualDuration", new SFGanttFieldDuration({ width: 60, bodyData: 'ActualStart,ActualFinish', headText: names.ActualDuration }));
    /**
    显示任务的基准开始时间 {@link SFDataTask#BaselineStart}
    默认宽度 100
    @name SFGanttField.taskFields.BaselineStart
    @type SFGanttFieldDateTime
    */
    SFGanttField.setTaskField("BaselineStart", new SFGanttFieldDateTime({ width: 100, bodyData: 'BaselineStart', headText: names.BaselineStart, disableSummaryEdit: true }));
    /**
    显示任务的基准结束时间 {@link SFDataTask#BaselineFinish}
    默认宽度 100
    @name SFGanttField.taskFields.BaselineFinish
    @type SFGanttFieldDateTime
    */
    SFGanttField.setTaskField("BaselineFinish", new SFGanttFieldDateTime({ width: 100, bodyData: 'BaselineFinish', headText: names.BaselineFinish, disableSummaryEdit: true }));


    /**
    @name SFGanttField.resourceFields
    @namespace 所有系统预定义的资源列，可使用  {@link SFGanttField.getResourceField}方法来获得这些列
    */
    /**
    空的资源列，不显示任何内容，
    默认宽度 36,只读
    @name SFGanttField.resourceFields.Empty
    @type SFGanttField
    */
    SFGanttField.setResourceField("Empty", new SFGanttField({ width: 36, ReadOnly: true }));
    /**
    显示 {@link SFDataResource#UID}的列，
    默认宽度 36,只读
    @name SFGanttField.resourceFields.UID
    @type SFGanttField
    */
    SFGanttField.setResourceField("UID", new SFGanttField({ width: 36, bodyData: 'UID', headText: names.UID, ReadOnly: true, bodyStyle: { textAlign: 'center' } }));
    /**
    显示 {@link SFDataResource#ID}的列，
    默认宽度 36,只读
    @name SFGanttField.resourceFields.ID
    @type SFGanttField
    */
    SFGanttField.setResourceField("ID", new SFGanttField({ width: 36, bodyData: 'ID', headText: names.ID, ReadOnly: true, bodyStyle: { textAlign: 'center' } }))
    /**
    只显示和编辑名称 {@link SFDataResource#Name}的列，和下面的Name列大小写不同，也显示不同的内容，
    默认宽度 120
    @name SFGanttField.resourceFields.name
    @type SFGanttField
    */
    SFGanttField.setResourceField("name", new SFGanttField({ width: 120, bodyData: 'Name', headText: names.ResourceName }));
    /**
    用资源的大纲将 {@link SFDataResource#Name}显示为树形的列，请注意大小写，
    默认宽度 120
    @name SFGanttField.resourceFields.Name
    @type SFGanttFieldTreeName
    */
    SFGanttField.setResourceField("Name", new SFGanttFieldTreeName({ width: 120, headText: names.ResourceName }));
    /**
    显示大纲数字( {@link SFDataResource#OutlineNumber})的列，
    默认宽度 100，只读
    @name SFGanttField.resourceFields.OutlineNumber
    @type SFGanttField
    */
    SFGanttField.setResourceField("OutlineNumber", new SFGanttField({ width: 100, bodyData: 'OutlineNumber', headText: names.OutlineNumber, ReadOnly: true }));
    /**
    显示资源状态图标的列，可以使用该列的 {@link SFGanttFieldIcon#addIcon}方法来自定义图标，
    默认宽度 100，只读
    系统之中默认支持了以下图标
    <ul>
        <li><img src="http://www.51diaodu.cn/sfgantt/img/icon_notes.gif"/> 当资源有备注信息( {@link SFDataResource#Notes})时显示</li>
        <li><img src="http://www.51diaodu.cn/sfgantt/img/icon_hyperlink.gif"/> 当资源有链接地址( {@link SFDataResource#HyperlinkAddress})时显示</li>
    </ul>
    @name SFGanttField.resourceFields.StatusIcon
    @type SFGanttFieldIcon
    */
    var field = new SFGanttFieldIcon({ width: 32, headText: names.StatusIcon });
    field.addIcon(function (element, gantt) {
        if (!element.Notes) { return; }
        var img = this.createImage(gantt, "icon_notes");
        if (gantt.setTooltip) {
            gantt.setTooltip(img, function (tooltip) {
                if (tooltip.bindObject == img) { return false; }
                tooltip.bindObject = img;
                var str = SFGanttField.getField(element.elementType, "Notes").headText + ": \"" + element.Notes + "\"";
                tooltip.setContent(gantt.container.ownerDocument.createTextNode(str));
                return true;
            });
        }
        return img;
    }, "Notes");
    field.addIcon(function (element, gantt) {
        if (!element.HyperlinkAddress) { return; }
        var link = gantt.container.ownerDocument.createElement("a");
        link.href = element.HyperlinkAddress;
        link.target = "_blank";
        var img = this.createImage(gantt, "icon_hyperlink");
        link.appendChild(img)
        if (gantt.setTooltip) {
            gantt.setTooltip(img, function (tooltip) {
                if (tooltip.bindObject == img) { return false; }
                tooltip.bindObject = img;
                var str = element.Hyperlink ? element.Hyperlink : element.HyperlinkAddress;
                tooltip.setContent(gantt.container.ownerDocument.createTextNode(str));
                return true;
            });
        }
        return link;
    }, "HyperlinkAddress,Hyperlink");
    SFGanttField.setResourceField("StatusIcon", field);
    /**
    显示和编辑资源的备注信息 {@link SFDataResource#Notes}
    默认宽度 100
    @name SFGanttField.resourceFields.Notes
    @type SFGanttFieldLongText
    */
    SFGanttField.setResourceField("Notes", new SFGanttFieldLongText({ width: 100, bodyData: 'Notes', headText: names.Notes }));
    /**
    显示和更改资源的样式 {@link SFDataResource#ClassName}
    默认宽度 120
    @name SFGanttField.resourceFields.ClassName
    @type SFGanttFieldSelecter
    */
    SFGanttField.setResourceField("ClassName", new SFGanttFieldSelecter({ width: 120, bodyData: 'ClassName', headText: names.ClassName }));
    SFGanttField.getResourceField("ClassName").getOptions = true ? (function (element, list) {
        return { ResourceNormal: 'ResourceNormal', ResourceImportant: 'ResourceImportant' };
    }) : null;
    /**
    显示和更改资源是否是关键资源 {@link SFDataResource#Critical}
    默认宽度 30
    @name SFGanttField.resourceFields.Critical
    @type SFGanttFieldBool
    */
    SFGanttField.setResourceField("Critical", new SFGanttFieldBool({ width: 30, bodyData: 'Critical', headText: names.Critical }));
    /**
    显示资源是否被选中，也可以点击选中该资源
    默认宽度 30
    @name SFGanttField.resourceFields.Selected
    @type SFGanttFieldSelected
    */
    SFGanttField.setResourceField("Selected", new SFGanttFieldSelected({ width: 30, headText: names.Selected }));
    /**
    显示资源的任务，该列只读
    默认宽度 100
    @name SFGanttField.resourceFields.Task
    @type SFGanttField
    */
    SFGanttField.setResourceField("Task", new SFGanttField({
        width: 100, bodyData: 'Resource', headText: names.Resource, bodyFunc: function (cell, resource, list) {
            var ans = [], assignments = resource.getAssignments();
            for (var i = 0; i < assignments.length; i++) {
                var res = assignments[i].getResource();
                if (res) {
                    var name = res.Name;
                    if (assignments[i].Units != 1) {
                        name += '[' + (assignments[i].Units * 100) + '%]';
                    }
                    ans.push(name);
                }
            }
            cell.appendChild(cell.ownerDocument.createTextNode(ans.join(",")));
        }, ReadOnly: true
    }));



    /**
    @name SFGanttField.linkFields
    @namespace 所有系统预定义的链接列，可使用  {@link SFGanttField.getLinkField}方法来获得这些列
    */
    SFGanttField.linkFields = {};
    /**
    显示和更改链接的类型 {@link SFDataLink#Type}
    默认宽度 100
    @name SFGanttField.linkFields.Type
    @type SFGanttFieldSelecter
    */
    SFGanttField.setLinkField("Type", new SFGanttFieldSelecter({ width: 100, bodyData: 'Type', headText: names.LinkType, options: window._SFGantt_config.SFGanttField.linkTypes }));
    /**
    显示链接的起始任务信息
    默认宽度 100，只读
    @name SFGanttField.linkFields.FromTask
    @type SFGanttFieldElement
    */
    SFGanttField.setLinkField("FromTask", new SFGanttFieldElement({ width: 100, bodyData: 'PredecessorTask', headText: names.FromTask }));
    /**
    显示链接的目标任务信息
    默认宽度 100，只读
    @name SFGanttField.linkFields.ToTask
    @type SFGanttFieldElement
    */
    SFGanttField.setLinkField("ToTask", new SFGanttFieldElement({ width: 100, bodyData: 'SuccessorTask', headText: names.ToTask }));
}
if (!window._obscure) { SFGanttField.init(); }
window.SFGanttField = SFGanttField;
window.SFGanttFieldBool = SFGanttFieldBool;
window.SFGanttFieldPercent = SFGanttFieldPercent;
window.SFGanttFieldElement = SFGanttFieldElement;
window.SFGanttFieldSelected = SFGanttFieldSelected;
window.SFGanttFieldLongText = SFGanttFieldLongText;
window.SFGanttFieldDateTime = SFGanttFieldDateTime;
window.SFGanttFieldDuration = SFGanttFieldDuration;
window.SFGanttFieldSelecter = SFGanttFieldSelecter;
window.SFGanttFieldTreeName = SFGanttFieldTreeName;
window.SFGanttFieldIcon = SFGanttFieldIcon;
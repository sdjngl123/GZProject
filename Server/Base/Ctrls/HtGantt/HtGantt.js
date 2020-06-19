HoteamUI.Control.OHtGantt = {
    Create: function (options) {
        optios = options || {};
        var parentId = this.id;
        var id = this.GetId();
        $("#" + parentId).height("100%");
        var CtrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions;
        var o = $.extend({}, $.hoteamHtmlEdit.defaults, CtrlOptions);
        o.parentId = parentId;
        o.id = id;
        o.lang = HoteamUI.Language.CurLanguage;
        o.handlers = {};
        o.ctrlEvent = {};
        o.ctrlEvent.o = this;
        //记录事件
        var handlers = (options.controlInfo || this.ControlInfo()).PageHandlers;
        for (var i = 0; i < handlers.length; i++) {
            var item = handlers[i];
            switch (item.HandlerName) {
                case "OnRowClick":
                    o.handlers.OnRowClick = this.GetEventFunctionName("OnRowClick");
                    break;
                case "OnRowDblClick":
                    o.handlers.OnRowDblClick = this.GetEventFunctionName("OnRowDblClick");
                    break;
                default: break;
            }
        }
        $.hoteamHtGantt.create(o);
    },
    LoadNormalXml: function (opt) {
        opt.id = this.GetId();
        $.hoteamHtGantt.loadnormalxml(opt);
    },
    //获取当前选中行
    GetSelectedRow: function () {
        var sfgantt = this.GetGanttMap();
        return sfgantt.getSelectedElements();
    },
    //选中指定任务，并在图表中显示
    ScrollToTask: function (task) {
        var sfgantt = this.GetGanttOpt();
        //指定任务不存在，展开父节点
        if (sfgantt.gtData.getTaskByUid(task.UID) == null) {
            task = task.parent;
        }
        task.setProperty("Collapse", false);
        task.update();
        sfgantt.gtMap.scrollToElement(task, 100);
    },
    SetTaskTextColor: function (tasks, color) {
        var id = this.GetId();
        $("#" + id + " tr").css("color", "black");
        var gtMap = this.GetGanttMap();
        var drobj, row;
        for (i = 0; i < tasks.length; i++) {
            drobj = gtMap.getElementDrawObj(tasks[i]);
            $.each(drobj, function (i, e) {
                if (i.indexOf("listRow") >= 0) {
                    row = drobj[i];
                    return false;
                }
            });
            SFGlobal.setProperty(row.style, { color: color });
        }
    },
    //切换甘特图图表的显示\隐藏状态
    CollapseChart: function () {
        var sfgantt = this.GetGanttMap();
        return sfgantt.collapseChart();
    },
    //切换甘特图列表的显示\隐藏状态
    CollapseList: function () {
        var sfgantt = this.GetGanttMap();
        return sfgantt.collapseList();
    },
    GetId: function () {
        return this.id + "_HtGantt";
    },
    GetGanttOpt: function () {
        var id = this.GetId();
        var opt = $("#" + id).data("opt");
        return opt;
    },
    GetGanttMap: function () {
        var id = this.GetId();
        var opt = $("#" + id).data("opt");
        return opt.gtMap;
    },
    Resize: function () {
        var sfgantt = this.GetGanttMap();
        if (sfgantt) {
            sfgantt.setViewSize();
        }
    }
};


{
    (function ($) {
        $.hoteamHtGantt = {
            defaults: {
                parentId: null,
                gtConfig: (function () {
                    gtConfig = new SFConfig(); //初始化一个页面上的配置对象
                    gtConfig.setConfig("SFGantt/imgPath", PageInit.WebRootPath + "/Base/Image/Gantt/");  //设置用到的图片路径
                    gtConfig.setConfig("SFGantt/readOnly", true); //设置甘特图为只读
                    gtConfig.setConfig("SFGantt/listWidth", "900"); //设置甘特图列表的宽度
                    gtConfig.setConfig("SFGantt/disableHelpLink", true); //设置甘特图不显示帮助链接 
                    gtConfig.setConfig("SFGantt/disableClipboard", true); //设置甘特图不显示复制粘贴功能
                    gtConfig.setConfig("SFGanttElementList/disableDragOrder", true); //设置甘特图为不可拖动改变顺序
                    gtConfig.setConfig("SFGanttElementList/disableAdjustLineHeight", true); //设置甘特图为不可拖动改变行高
                    gtConfig.setConfig("SFGanttTasksMap/disableDragAddLink", true); //设置甘特图为不可拖动添加链接
                    gtConfig.setConfig("SFGantt/disableListScrollNotice", true);//设置不显示滚动条提示
                    gtConfig.setConfig("SFGantt/taskIdFieldNames", "ID");
                    gtConfig.setConfig("SFGanttField/dateShowFormat", "yyyy-MM-dd");

                    gtConfig.setConfig("SFGantt/taskStyle/TaskBlue", {
                        listStyle: { backgroundColor: '#D9E5EF' },
                        listSelectedStyle: { backgroundColor: '#ADD0F1' },
                    });
                    gtConfig.setConfig("SFGantt/taskStyle/TaskGreen", {
                        listStyle: { backgroundColor: '#DCF6F9' },
                        listSelectedStyle: { backgroundColor: '#A5E1E8' },
                    });
                    gtConfig.setConfig("SFGantt/taskStyle/TaskRed", {
                        listStyle: { backgroundColor: '#f9c9cb' },
                        listSelectedStyle: { backgroundColor: '#ef797c' },
                    });
                    gtConfig.setConfig("SFGantt/taskStyle/TaskFontWeight", {
                        listStyle: { fontWeight: 'bolder' }
                    });
                    gtConfig.setConfig("SFGantt/taskStyle/CriticalTask", {
                        barStyle: { border: "solid 1px #e9474b", bgImage: "", bgColor: "#0000FF", backgroundColor: '#ef797c' },
                        percentBarStyle: { backgroundColor: '#e84348' },
                    });
                    return gtConfig;
                })(),
                columns: ["ID", "Name", "PercentComplete", "Start", "Finish"],//控件默认列
                isTracking: false,//是否显示基线对比模式
                multiselect: false
            },
            create: function (options) {
                var o = $.extend(true, {}, $.hoteamHtGantt.defaults, options);
                var id = o.id;
                var container = $("#" + o.parentId);
                container.append("<div class='ganttContainer' id='" + o.id + "'></div>");
                o.gtConfig.setConfig("SFGantt/container", o.id);
                o.gtConfig.setConfig("SFGantt/isTracking", o.isTracking);
                $("#" + o.id).data("opt", o);
            },
            loadnormalxml: function (opt) {
                var option = $("#" + opt.id).data("opt");
                opt = $.extend(true, {}, option, opt);
                opt.gtConfig.setConfig("SFGantt/container", opt.id);
                var doc = $.hoteamHtGantt.createxmlelement(opt.XmlData);
                var gtProject = new SFDataProject(doc);
                var newColumnsList = "", titleList = "";
                $(opt.TitleOptions).each(function (i) {
                    var dataItem = opt.TitleOptions[i],
                        name = dataItem.Name;
                    if (name != "ID" && name != "ProgressIcon" && dataItem.Hidden != true) {
                        titleList += name + ",";
                    }
                    //判断若不是控件默认列，需定义自定义列
                    if (HoteamUI.ArrayIndexOf($.hoteamHtGantt.defaults.columns, name) >= 0) return;
                    gtProject.addTaskProperty(name, name, SFDataRender.types.String);
                    var colItem = new SFGanttField({
                        width: dataItem.Width ? dataItem.Width : 100,
                        bodyData: name,
                        inputData: name,
                        headText: dataItem.Text,

                        //22308 李金岳
                        headStyle: dataItem.HeadTextAlign ? { textAlign: dataItem.HeadTextAlign } : { textAlign: 'center' },
                        bodyStyle: dataItem.BodyTextAlign ? { textAlign: dataItem.BodyTextAlign } : { textAlign: 'center' }
                    });
                    SFGanttField.setTaskField(name, colItem);
                    newColumnsList += name + ",";
                });
                titleList = titleList.substring(0, titleList.length - 1);
                newColumnsList = newColumnsList.substring(0, newColumnsList.length - 1);
                var selectstr = "";
                if (opt.multiselect == true) {
                    selectstr = "Selected,";
                }
                SFGanttField.addTaskField("MyTaskIcon", 35, "状态", SFGanttField.NormalHead, $.hoteamHtGantt.myiconbody, null, "", newColumnsList);
                opt.gtConfig.setConfig("SFGantt/taskFieldNames", selectstr + "MyTaskIcon," + titleList);
                //将doc对象初始化为一个甘特数据对象
                var gtData = new SFData(gtProject);
                var tasks = opt.openTask;
                if (!HoteamUI.Common.IsNullOrEmpty(tasks)) {
                    var taskitem, taskid;
                    for (var i = 0; i < tasks.length; i++) {
                        taskitem = opt.openTask[i];
                        taskid = taskitem.UID;
                        if (gtData.getTaskByUid(taskid) == null) {
                            taskitem = taskitem.parent;
                        }
                        for (var t = taskitem; t; t = t.parent) {
                            var curTask = gtData.getTaskByUid(t.UID);
                            if (curTask) {
                                curTask.setProperty("Collapse", false);
                            }
                        }
                    }
                    opt.openTask = null;
                }
                gtData.addComponent(new SFDataIDComponent());
                //用相应的数据对象和配置对象创建甘特对象
                var gtMap = new SFGantt(opt.gtConfig, gtData);
                gtMap.removeContextMenuItem("Help"); //移除帮助菜单
                gtMap.removeContextMenuItem("Print"); //移除关于菜单
                gtMap.showMap(null, 4); 	//显示甘特图
                opt.gtMap = gtMap;
                opt.gtData = gtData;
                $("#" + opt.id).data("opt", opt);
                this.initHanlder(opt);
            },
            myiconbody: function (cell, task) {
                var ProgressIcon = task.getProperty("ProgressIcon");
                if (!HoteamUI.Common.IsNullOrEmpty(ProgressIcon)) {
                    var img = $("<img src=" + ProgressIcon.replace("~/", "") + " style='margin-left: 10px'/>");
                    $(cell).append(img);
                }
            },
            createxmlelement: function (doc) {
                var xml;
                if (typeof (ActiveXObject) != "undefined") {
                    try {
                        xml = new ActiveXObject("Msxml2.DOMDocument");
                    }
                    catch (e) {
                        xml = new ActiveXObject("Msxml.DOMDocument");
                    }
                    if (doc) {
                        xml.loadXML(doc);
                    }
                }
                else {
                    if (doc) {
                        if (typeof DOMParser != "undefined") {
                            xml = new DOMParser().parseFromString(doc, "text/xml");
                        }
                    }
                    else {
                        if (document.implementation && document.implementation.createDocument) {
                            xml = document.implementation.createDocument("", "", null);
                        }
                    }
                }
                return xml;
            },
            initHanlder: function (opt) {
                SFEvent.addListener(opt.gtMap, "taskclick", function (task, type, field) {
                    var last = $.hoteamHtGantt.timestamp;
                    var now = (new Date()).getTime();
    
                    if (now - last <= 300) {
                        clearTimeout($.hoteamHtGantt.TimeoutId);
                        $.hoteamHtGantt.timestamp = null;
                        $.hoteamHtGantt.TimeoutId = null;
       
                        HoteamUI.Common.ExeFunction(opt.handlers.OnRowDblClick, { task: task, taskname: task.getProperty("Name"), o: opt.ctrlEvent.o });
                    }
                    else {
                        $.hoteamHtGantt.TimeoutId = setTimeout(function () {
                            HoteamUI.Common.ExeFunction(opt.handlers.OnRowClick, { task: task, taskname: task.getProperty("Name"), o: opt.ctrlEvent.o });
                        }, 500);
                    }
                    $.hoteamHtGantt.timestamp = now;
                });

            },
            timestamp: null,
            TimeoutId: null
        }
    })(jQuery);
}
HMUI_Mobile_WorkPromptPropertyPage_PageInit = function (pageEvent) {
  
    var pid = pageEvent.o.pid;
    var container = $("#" + pid);
    var resultDataList = HMUI.MobileCommon.GetWorkPromptData().WorkPromptGroupDataList;
    var divCount = resultDataList.length;
    var WorkPrompt = $(".workprompt");
    var ListContent = $(".listcontent");
    var result = "";
    var workpanelBoxContainer;

    HMUI.MobileCommon.SetHeaderText(HMUI.Language.Lang("WorkPromptPropertyPage", "Title"));
    container.find(".workpanelbox").html("");

    /*工作看板标题*/
    if (HMUI.AppSets.MobileDevice == "Pad") {
        $("#rightheader").css({ "width": "0px" });
        $("#header").css({ "width": "100%", "display": "block" });
    }
    else {
        $(".ui-page-container").removeClass("ui-page-hasfilterable");
    }

    for (var i = 0; i < divCount; i++) {
        resultDataList[i].ItemData = JSON.parse(resultDataList[i].ItemData);
        var item = resultDataList[i];

        var ViewType = item.ViewType.split(';');
        var Name = item.Text;
        var JsMethod = item.JsMethod;
        var IsActive = "ui-btn-active";

        //逐个拼接看板标题
        var theme = $(".ui-page-active").attr("data-theme");
        result += "<div class=\"workpanel ui-bar-" + theme + "\" >";
        result += "<div class=\"workpaneltitle ui-navbar-header ui-header ui-bar-inherit\">"
        + '<svg class="icon"><use xlink:href="' + HMUI.LoadImages.ImagesBaseUrl + 'icon-unified_tag"></use></svg><span>' + Name + "</span></div>";

        //拼接标签
        result += "<ul class=\"workprompt\">";

        if (ViewType.indexOf('Pie') > -1 || ViewType.indexOf('Graph') > -1) {
            result += "<li onclick=\"HMUI_Mobile_WorkPromptPropertyPage_OnClick(this)\">";
            result += "<a class=\"ui-btn " + IsActive + "\">图例</a>";
            result += "</li>";
            IsActive = "";
        }
        if (ViewType.indexOf('List') > -1) {
            result += "<li onclick=\"HMUI_Mobile_WorkPromptPropertyPage_OnClick(this)\">";
            result += "<a class=\"ui-btn " + IsActive + "\">列表</a>";
            result += "</li>";
        }
        result += "</ul>";

        //拼接图表容器
        if (ViewType.indexOf('Pie') > -1 || ViewType.indexOf('Graph') > -1) {
            var divID = "canvas_" + pid + "_" + i.toString();
            result += "<ul class=\"workpanelcontent\">";
            result += "<div class=\"canvas\" id=\"" + divID + "\" >";
            result += "浏览器不支持canvas";
            result += "</div>";
            result += "</ul>";
        }

        //拼接列表数据
        if (ViewType.indexOf('List') > -1) {
            result += "<ul class=\"workpanelcontent listcontent\" >";

            for (var j = 0; j < item.ItemData.GroupItemData.length; j++) {
                var objectText;
                var showValue;
                var itemID = item.ItemData.GroupItemData[j].ItemID;
                var objectID = item.ItemData.GroupItemData[j].ChildObjectID;
                //饼状图
                if (ViewType.indexOf('Pie') > -1) {
                    var text = item.ItemData.GroupItemData[j].Text;
                    var count = item.ItemData.GroupItemData[j].Count;
                    objectText = text;
                    showValue = text + "(" + count + ")";
                }
                //柱状图
                else if (ViewType.indexOf('Graph') > -1) {
                    var objectName = item.ItemData.GroupItemData[j].ObjectName;
                    var createTime = item.ItemData.GroupItemData[j].CreateTime;
                    objectText = objectName;
                    showValue = objectName + "  " + createTime;
                }

                result += "<li JsMethod='" + JsMethod + "' ObjectText='" + objectText + "' ItemID='" + itemID + "' ObjectID='" + objectID + "' onclick='HMUI_Mobile_WorkPromptPropertyPage_ListClick(this);'>"
                result += "<a class='ui-nodisc-icon ui-btn' href='#'>" + showValue + "</a>";
                result += "</li>";
            }
            result += "</ul>";
        }
        result += "</div>";
    }
    container.find(".workpanelbox").html(result);

    //加载图表
    for (var i = 0; i < divCount; i++) {
        var item = resultDataList[i];
        var optiondata = item.ItemData.option;
        var ViewType = item.ViewType.split(';');
        var divID = document.getElementById("canvas_" + pid + "_" + i.toString());
        var option;
        if (ViewType.indexOf('Pie') > -1) {
            option = optionPie;
        }
        else if (ViewType.indexOf('Graph') > -1) {
            option = optionBar;
        }

        HMUI_Mobile_WorkPromptPropertyPage_BindEchart(optiondata, option, divID);
    }

    if (HMUI.MobileCommon.IsPhone()) {

        setTimeout(function () {
            var scrollheight = HMUI.MobileCommon.DeviceHeight - 110; //取安卓设备的高度
            workpanelBoxContainer = container.find(".workpanelbox-container");
            workpanelBoxContainer.height(scrollheight);
        }, 200);

        setTimeout(function () {
            var opt = {
                useTransition: false,
                hScrollbar: false,
                vScrollbar: false,
                hideScrollbar: true,
                topOffset: 0,
                onScrollMove: function () { }
            }
   
            HMUI_Mobile_WorkPromptPropertyPage_IScroll = new iScroll(container.find(workpanelBoxContainer)[0], opt);
        }, 500);
    }

};

HMUI_Mobile_WorkPromptPropertyPage_IScroll = null;

HMUI_Mobile_WorkPromptPropertyPage_ListClick = function (obj) {
    var JsMethod = $(obj).attr("JsMethod");
    var ItemID = $(obj).attr("ItemID");
    var ObjectText = $(obj).attr("ObjectText");
    var ObjectID = $(obj).attr("ObjectID");
    if (HMUI.Common.IsNullOrEmpty(JsMethod) == false) {
        var para = {};
        para.ItemID = ItemID;
        para.ObjectText = ObjectText;
        para.ObjectID = ObjectID;
        
        HMUI.Common.ExeFunction(JsMethod, para);
    }
};

//点击标签事件
HMUI_Mobile_WorkPromptPropertyPage_OnClick = function (obj) {
    $(obj).parent().find("a").removeClass("ui-btn-active");
    $(obj).find("a").addClass("ui-btn-active");

    var index = $(obj).index();

    var workpanelcontent = $(obj).parent().parent().find(".workpanelcontent");
    workpanelcontent.hide();
    workpanelcontent.eq(index).show();

    if (HMUI_Mobile_WorkPromptPropertyPage_IScroll) {
        setTimeout(function () {
            HMUI_Mobile_WorkPromptPropertyPage_IScroll.refresh();
        }, 200);
    }
};

/*工作看板链接点击事件*/
HMUI_Mobile_ShowWorkPromptData = function (pagePara) {
    var para = {};
    para.ListName = "DataSearchList";
    para.Filters = [pagePara.ItemID];
    if (HMUI.Common.IsNullOrEmpty(pagePara.ObjectID) == false) {
        para.ChildObjectID = pagePara.ObjectID;
    }
    para.ChildObjectType = pagePara.ItemID.split('_')[0];
    para.ExceQuery = "true";

    para.fromWorkPrompt = true;
    para.ObjectText = HMUI.Language.Lang("MobileNavigation", "DataSearch") + "(" + pagePara.ObjectText + ")";
    $("#rightcontent").html("");
    $("#rightheader div>ul:first").html("");

    $(".workpanel").css("width", "48.6%");
    HMUI.UIManager.ShowInLeft("MobileList", para, "slide", false);

};

//柱状图
var optionBar = {
    tooltip: {
        trigger: 'axis',
        show: false
    },
    legend: {
        orient: 'horizontal',
        x: 'left',
        itemWidth: 20,
        itemGap: 12,
        selectedMode: false
    },
    calculable: false,
    grid: {
        x: '10%',
        y: '15%',
        x2: '10%',
        y2: '15%',
        itemStyle: {
            normal: {
                borderWidth: 0,
                containLabel: true
            }
        }
    },
    xAxis: [{
        type: 'category',
        axisLine: {
            lineStyle: {
                color: '#ccc',
                width: 1,
                type: 'solid'
            }
        }
    }],
    yAxis: [{
        type: 'value',
        axisLine: {
            lineStyle: {
                color: '#ccc',
                width: 1,
                type: 'solid'
            }
        }
    }]
};

//饼状图
var optionPie = {
    animation: false,
    legend: {
        orient: 'horizontal',
        x: 'left',
        itemWidth: 20,
        itemGap: 12,
        selectedMode: false,
        formatter:
                 function (name) {
                     var length = name.length;
                     if (length < 5) {
                         for (var i = 0; i < 5 - length; i++) {
                             name += "    "
                         }
                     }
                     return name;
                 }
    },
    series: [{
        radius: ['40%', '65%'],
        center: ['50%', '60%'],
        itemStyle: {
            normal: {
                label: {
                    show: false,
                    position: 'center'
                },
                labelLine: { show: false }
            }
        }
    }]
};

//绑定图表
HMUI_Mobile_WorkPromptPropertyPage_BindEchart = function (optiondata, option, divID) {
    if (HMUI.Common.IsNullOrEmpty(divID) == false) {
        //初始化图标容器
        var canvas = echarts.init(divID);

        //图例换行
        var legendData = [];
        for (var j = 0; j < optiondata.legend.data.length; j++) {
            if (j % 3 == 0 && j > 0) {
                legendData.push('');
            }

            legendData.push(optiondata.legend.data[j]);
        }
        optiondata.legend.data = legendData;

        //合并图表数据与样式
        var option = $.extend(true, {}, optiondata, option);

        //单击事件
        //饼状图点击显示标签
        if (optiondata.series[0].type == "pie") {
            canvas.on(echarts.config.EVENT.CLICK, function (param, canvas) {
                var seriesData = canvas.getSeries()[0].data;
                for (var i = 0; i < seriesData.length; i++) {
                    if (i == param.dataIndex) {
                        seriesData[i].itemStyle.normal.label.show = true;
                    }
                    else {
                        seriesData[i].itemStyle.normal.label.show = false;
                    }

                }
                var option = canvas.getOption();
                option.series[0].data = seriesData;
                canvas.setOption(option);
            });
        }

        canvas.setOption(option);
    }
}









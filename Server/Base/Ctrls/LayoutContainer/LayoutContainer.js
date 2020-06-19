/*
 * ！底层逻辑错误，折叠隐藏后会改变原始的配置信息，窗口改变时Resize不正确
 * 尝试调整为正确的逻辑，但关联接口及后续处理逻辑都需要调整，无法保证稳定性，且相当耗时，全部接口需要重新梳理测试
 * 由于时间的问题bug的修复按照现在的逻辑处理，能解决现有的部分问题
 * ShowPanel HiddenPanel 在代码逻辑中自行处理是否恢复原始配置
 * huangqing 
 */
HoteamUI.Control.OLayoutContainer = {
    Create: function (options) {
        options = options || {};
        var me = this;
        var CtrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions;

        var o = {},
            pagename = this.PageName(),
            pageInstance,
            pagePara,
            controlRules;
        pageInstance = HoteamUI.Page.Instance(options.containerid);
        if (pageInstance) {
            pagePara = pageInstance.GetPara();
            if (pagePara) {
                controlRules = pagePara.ControlRules;
            }
        }
        o.o = this;
        o.autofit = options.autofit != undefined ? options.autofit : $("#" + options.containerid).data("autofit");
        o.type = CtrlOptions.type || undefined;
        o.padding = CtrlOptions.padding || "";
        o.groupName = CtrlOptions.groupName || "";
        o.backgroundColor = CtrlOptions.backgroundColor;//背景色设置
        o.border = CtrlOptions.border;//边框设置（格式：1px 1px 1px 1px）(顺序是：上右下左)
        o.borderHighLight = CtrlOptions.borderHighLight;//（关注）激活时，边框高亮提示
        o.id = this.id;
        o.items = {};
        for (var i in CtrlOptions) {
            if (!CtrlOptions.hasOwnProperty(i)) {
                continue;
            }
            if (i.indexOf("item") > -1) {
                if (controlRules && controlRules.length > 0) {
                    if (HoteamUI.ArrayIndexOf(controlRules, CtrlOptions[i].childid) > -1) {
                        continue;
                    }
                }
                o.items[i] = $.extend(true, {}, $.hoteamLayoutContainer.itemDefaults, CtrlOptions[i]);
                o.items[i].name = i;
            }
        }
        //记录事件
        var handlers = (options.controlInfo || this.ControlInfo()).PageHandlers;
        $.each(handlers, function (index, val) {
            if (val.HandlerName == "OnFocus") {//关注当前的容器时
                o.OnFocus = me.GetEventFunctionName("OnFocus");
            }
        });
        o = $.hoteamLayoutContainer.create(o);

        //创建子集
        for (var i in o.items) {
            if (!o.items.hasOwnProperty(i)) {
                continue;
            }
            var item = o.items[i];
            var val = undefined;
            if (item.childid) {
                if (options.controlList) {

                    //先从参数中寻找子集的信息
                    //for (var j in options.controlList) {
                    for (var j = 0; j < options.controlList.length; j++) {
                        if (options.controlList[j].ControlID == item.childid) {
                            val = options.controlList[j];
                            break;
                        }
                    }
                }
                //val = val || HoteamUI.Control.CtrlInfo(pagename, item.childid);
                //判断是否自定义页面，如果是自定义页面直接从参数中获取pageconfig,如果不是则按以前的方法走 modify by hw
                var ctrlInfoval = null;
                if (options.pageconfig.hasOwnProperty("IsCustomPage")) {
                    $.each(options.pageconfig.PageControls, function (index, val) {
                        if (val.ControlID == item.childid) {
                            ctrlInfoval = val;
                        }
                    });
                    val = val || ctrlInfoval;
                } else {
                    val = val || HoteamUI.Control.CtrlInfo(pagename, item.childid);
                }

                if (val) {
                    var ctrlInfo = {
                        parentid: item.id,
                        containerid: this.ContainerID(),
                        pagename: pagename,
                        controlInfo: val,
                        controlList: CtrlOptions.controlList,
                        autofit: (o.autofit && o.type != "vertical") || (o.autofit && (item.size == "auto" || item.size.indexOf('%') != -1) && o.type == "vertical"),
                        width: o.itemWidth || item.realSize,
                        height: o.itemHeight || item.realSize,
                        //增加参数传递，用于动态创建控件 modify by hw
                        pageconfig: options.pageconfig
                    }
                    if (val.TypeName == "PageContainer") {
                        ctrlInfo.pagepara = pagePara;
                    }
                    HoteamUI.Control.CreateControl(ctrlInfo);
                }
            }
        }
    },
    Resize: function (isReset) {
        var container = $("#" + this.id);
        $.hoteamLayoutContainer.resize(container, isReset);
        var entrust = container[0].resizeEntrust;
        if ($.isFunction(entrust)) {
            entrust();
        }
    },
    Check: function () {
        var result = true;
        var container = $("#" + this.id);
        var options = container.data("LayOutOptions");
        var items = options.items;
        for (var i in items) {
            if (!items.hasOwnProperty(i)) {
                continue;
            }
            var item = items[i];
            var id = item.id;
            var childrenID = $("div[parentid='" + id + "']").attr("id");
            if (childrenID) {
                var currentResult = HoteamUI.Control.Instance(childrenID).Check();
                if (currentResult == false) {
                    result = false;
                }
            }
        }
        return result;
    },
    //第一个变量是drag的item，第二个是包含page的cid，第三个是pageName,第四个是参数
    ShowPage: function (item, cid, pagename, para) {
        var drag = $("#" + this.id + "_" + item);
        if (drag.hasClass($.hoteamLayoutContainer.css.dragItem)) {
            if (drag.attr("data-open") == "true") {
                HoteamUI.UIManager.Show(cid, pagename, para);
            }
            else {
                HoteamUI.Page.SetContainerParas(cid, pagename, para);
                $("#" + this.id).attr("data-delayShowid", cid);
            }
        }
    },
    //增加配置，不改变原始配置
    ShowPanel: function (panelNamesArray, isReset) {
        var container = $("#" + this.id);
        var options = container.data("LayOutOptions");
        var items = options.items;
        var neadResize = false;
        for (var i = 0; i < panelNamesArray.length; i++) {
            var item = items[panelNamesArray[i]];
            var itemobj = $("#" + item.id);
            if (item.visible == false) {
                neadResize = true;
                item.visible = true;
                itemobj.show();
                itemobj.attr("data-size", itemobj.attr("data-oldSize"));
            }
        }
        if (neadResize)
            this.Resize(isReset);
    },
    //增加配置，不改变原始配置
    HiddenPanel: function (panelNamesArray,isReset) {
        var container = $("#" + this.id);
        var options = container.data("LayOutOptions");
        var items = options.items;
        var neadResize = false;
        for (var i = 0; i < panelNamesArray.length; i++) {
            var item = items[panelNamesArray[i]];
            var itemobj = $("#" + item.id);
            var size = itemobj.attr("data-size");
            if (item.visible != false) {//如果当前的未隐藏
                item.visible = false;
                neadResize = true;
                itemobj.attr("data-oldSize", size);
                itemobj.hide();
                itemobj.attr("data-size", 0);
            }
        }
        if (neadResize) {
            this.Resize(isReset);
        }
    },
    HiddenItem: function (dragArray) {
        var container = $("#" + this.id);
        if ($.isArray(dragArray) == false) dragArray = [dragArray];
        for (var i = 0; i < dragArray.length; i++) {
            var drag = $("#" + this.id + "_" + dragArray[i]);
            if (drag.attr("data-open") == "true") {
                drag.find(".ui-state-active").click();
            }
        }
    },
    ShowItem: function (dragArray) {
        var container = $("#" + this.id);
        if ($.isArray(dragArray) == false) dragArray = [dragArray];

        for (var i = 0; i < dragArray.length; i++) {
            var drag = $("#" + this.id + "_" + dragArray[i]);
            if (drag.attr("data-open") == "false") {
                drag.find(".ui-state-active").click();
            }
        }
    },
    GetPanelStatus: function (panel) {
        var div = $("#" + this.id + "_" + panel);
        if (div.length > 0) {
            return div.css("display") == "none" ? "hidden" : "show";
        }
        return "";
    },
    GetItemStatus: function (item) {
        var div = $("#" + this.id + "_" + item);
        if (div.length > 0) {
            return div.attr("data-size") == 0 ? "close" : "open";
        }
        return "";
    },
    ResetPanelSize: function (panelOptions) {
        var container = $("#" + this.id);
        var options = container.data("LayOutOptions");
        var items = options.items;
        for (var i in panelOptions) {
            if (!panelOptions.hasOwnProperty(i)) {
                continue;
            }
            items[i].size = panelOptions[i];
        }
        container.data("LayOutOptions", options);
        this.Resize(true);
    },
    OpenAllPanels: function () {
        var container = $("#" + this.id);
        var dragItems = container.find("." + $.hoteamLayoutContainer.css.dragItem);
        dragItems.each(function () {
            if ($(this).attr("data-open") == "false") {
                var dragBtn = $(this).find(".ui-state-active");
                dragBtn.click();
            }
        });
    },
    CloseAllPanels: function () {
        var container = $("#" + this.id);
        var dragItems = container.find("." + $.hoteamLayoutContainer.css.dragItem);
        dragItems.each(function () {
            if ($(this).attr("data-open") == "true") {
                var dragBtn = $(this).find(".ui-state-active");
                dragBtn.click();
            }
        });
    },
    SetHightLight: function () {
        var container = $("#" + this.id);
        container.removeClass("layout-highlight-transparent").addClass("layout-highlight");
    },
    CancelHightLight: function () {
        var container = $("#" + this.id);
        container.addClass("layout-highlight-transparent").removeClass("layout-highlight");
    }
}

{
    (function ($, undefined) {
        $.hoteamLayoutContainer = {
            defaults: {
                type: "horizontal",
                id: null,
                items: {}
            },
            itemDefaults: {
                id: null,
                type: "container",
                childid: null,
                size: "100%",
                realSize: undefined,
                realWidth: undefined,
                realHeight: undefined,
                resizable: true,
                closable: true,
                direction: "prev"
            },
            opt: {
                type: "horizontal",
                id: null,
                items: {},
                container: null,
                //用于记录每一项的宽度和高度的固定值，例如横向布局高度为固定值。
                itemWidth: null,
                itemHeight: null
            },
            css: {
                dragContainer: "hoteam-layout-container",
                dragContainer_horizontal: "hoteam-lauout-horizontal",
                dragContainer_vertical: "hoteam-layout-vertical",
                dragItem: "hoteam-layout-drag",
                mindraggSize: 20
            },
            create: function (options) {
                this.opt = $.extend(true, {}, this.defaults, options);
                //内部padding配置
                this.opt.container = $("#" + this.opt.id).css("padding", options.padding);
                //增加颜色配置
                if (options.backgroundColor) {
                    this.opt.container.css("background-color", options.backgroundColor);
                }
                //增加边框设置
                if (options.border) {
                    this.opt.container.css(function (border) {
                        var arr = border.split(' ');
                        var isNumber = true;
                        $.each(arr, function (i, e) {
                            if (!HoteamUI.Common.IsNullOrEmpty(e) && isNaN(e)) {
                                isNumber = false;
                                return false;
                            }
                        })
                        if (isNumber == false) {
                            return {
                                "border": options.border
                            };
                        } else if (arr.length == 1 && arr[0] == 1) {
                            return {
                                "border": "1px solid #ccc"
                            };
                        } else if (arr.length == 2) {
                            var lr = arr[1] == 1 ? "1px solid #ccc" : "";
                            var tb = arr[0] == 1 ? "1px solid #ccc" : "";
                            return {
                                borderLeft: lr,
                                borderTop: tb,
                                borderRight: lr,
                                borderBottom: tb,
                            };
                        } else if (arr.length == 3) {
                            return {
                                borderLeft: arr[0] == 1 ? "1px solid #ccc" : "",
                                borderTop: arr[0] == 1 ? "1px solid #ccc" : "",
                                borderRight: arr[1] == 1 ? "1px solid #ccc" : "",
                                borderBottom: arr[2] == 1 ? "1px solid #ccc" : "",
                            };
                        } else {
                            return {
                                borderLeft: arr[3] == 1 ? "1px solid #ccc" : "",
                                borderTop: arr[0] == 1 ? "1px solid #ccc" : "",
                                borderRight: arr[1] == 1 ? "1px solid #ccc" : "",
                                borderBottom: arr[2] == 1 ? "1px solid #ccc" : "",
                            };
                        }
                        return {};
                    }(options.border));
                }
                //增加（关注）高亮配置
                if (options.borderHighLight) {
                    this.opt.container.addClass("layout-highlight-transparent");
                }

                //需求：增加layoutcontainer的展现方式（分组且增加组名）
                if (options.groupName) {
                    if (!options.padding) {
                        this.opt.container.css("padding", "10px 0 0 0");
                    }
                    this.opt.container.append(
                        '<div class="hoteam-layout-group-container">' +
                        '<div class="hoteam-layout-group">' +
                        '<span class="hoteam-layout-group-text">' + HoteamUI.Language.Lang(options.groupName) + '</span>' +
                        '</div>' +
                        '</div>'
                    );
                }
                //根据当前配置信息将size进行转换。
                this.__itemInfoTransform__();

                this._createContainer();
                this._initHandlers(this.opt);
                this.opt.container.data("LayOutOptions", this.opt);
                return this.opt;
            },
            resize: function (container, isReset) {
                var self = this,
                    opt = container.data("LayOutOptions") || this.opt,
                    cwidth = container.width(),
                    cheight = container.height(),
                    childrens;
                if (cwidth == 0 || cheight == 0) return;
                if (opt.autofit) {
                    if (opt.type == "horizontal") {
                        childrens = container.children().children().children().children().not(".hoteam-layout-group-container");
                    } else {
                        childrens = container.children().not(".hoteam-layout-group-container");
                    }
                } else {
                    childrens = container.children().not(".hoteam-layout-group-container");
                }
                var items = opt.items;
                childrens.each(function () {
                    var item = $(this);
                    var itemInfo = items[item.attr("data-itemName")];
                    if (itemInfo) {
                        if (isReset === true) {
                            item.attr("data-size", itemInfo.size);
                        }
                        else {
                            itemInfo.size = item.attr("data-size");
                        }
                    }
                });
                this.__itemInfoTransform__(opt);

                childrens.each(function () {
                    var item = $(this);
                    var itemInfo = items[item.attr("data-itemName")];
                    if (itemInfo) {
                        //设置单项的尺寸
                        if (item.hasClass(self.css.dragContainer_horizontal)) {
                            if (opt.auto) {
                                item.width(itemInfo.realSize);
                            } else {
                                item.width(itemInfo.realSize);
                            }
                        }
                        else {
                            if (itemInfo.realSize != "auto") {
                                item.height(itemInfo.realSize);
                            }
                            item.width(opt.itemWidth);
                            if (opt.groupName) {
                                item.width(opt.itemWidth - 2);
                            }
                        }
                        //隐藏列不需要重新绘制。
                        if (+itemInfo.realSize != 0 || itemInfo.realSize == "auto") {
                            var childrenId = $("div[parentid='" + item.attr("id") + "']").attr("id");
                            if (childrenId) {
                                HoteamUI.Control.Instance(childrenId).Resize(isReset);
                            }
                        }
                    }
                });
            },
            _createContainer: function () {
                var result = [];
                for (var i in this.opt.items) {
                    if (!this.opt.items.hasOwnProperty(i)) {
                        continue;
                    }
                    result.push(this.__createItems__(this.opt.items[i]));
                }
                //如果是纵向分布，且是自适应高度
                if (this.opt.type == "horizontal" && this.opt.autofit) {
                    result.unshift('<table class="hoteam-layout-table"><tr class="hoteam-layout-tr">');
                    result.push('</tr></table>');
                }
                this.opt.container.append(result.join(''));
                var lastItem = this.opt.container.children("div:last");
                if (this.opt.type != "horizontal") {
                    this.opt.container.css("overflow-y", "auto");
                }
            },
            _initHandlers: function (opt) {
                var self = this;
                if (opt.autofit && opt.type == "horizontal") {
                    opt.container.find(">table>tbody>tr>td." + self.css.dragItem + " div.ui-state-active").on("click", function () {
                        var dragBtn = $(this);
                        var dragItem = dragBtn.closest("." + self.css.dragItem);
                        var prevItem = dragItem.prev();
                        var nextItem = dragItem.next();
                        var direction = dragItem.attr("direction");
                        var type = opt.type;
                        self.__closableButton__(prevItem, nextItem, dragItem, direction, opt);
                    });

                    opt.container.find(">table>tbody>tr>td." + self.css.dragItem + "." + self.css.dragContainer_horizontal + "[resizable='true']").draggable({
                        axis: "x",
                        helper: function (event) { return "<div style='height:100%;width:3px; background:#BCF5EA'></div>" },
                        containment: opt.container,
                        revert: false,
                        stop: function (event, ui) {
                            self.__draggableStop__($(this), ui, opt);
                        }

                    });
                } else {
                    opt.container.find(">div." + self.css.dragItem + " div.ui-state-active").on("click", function () {
                        var dragBtn = $(this);
                        var dragItem = dragBtn.closest("." + self.css.dragItem);
                        var prevItem = dragItem.prev();
                        var nextItem = dragItem.next();
                        var direction = dragItem.attr("direction");
                        var type = opt.type;
                        self.__closableButton__(prevItem, nextItem, dragItem, direction, opt);
                    });

                    opt.container.find(">div." + self.css.dragItem + "." + self.css.dragContainer_horizontal + "[resizable='true']").draggable({
                        axis: "x",
                        helper: function (event) { return "<div style='height:100%;width:3px; background:#BCF5EA'></div>" },
                        containment: opt.container,
                        revert: false,
                        stop: function (event, ui) {
                            self.__draggableStop__($(this), ui, opt);
                        }

                    });
                    opt.container.find(">div." + self.css.dragItem + "." + self.css.dragContainer_vertical + "[resizable='true']").draggable({
                        axis: "y",
                        helper: function (event) { return "<div style='height:3px; width:100%;background:#BCF5EA'></div>" },
                        containment: opt.container,
                        revert: false,
                        stop: function (event, ui) {
                            self.__draggableStop__($(this), ui, opt);
                        }
                    });
                }
                if (opt.borderHighLight) {//如果有关注高亮功能
                    opt.container.on("mousedown", function () {
                        var ctrlEvent = { o: opt.o };
                        var ret = HoteamUI.Common.ExeFunction(opt.OnFocus, ctrlEvent);
                        if (!(ret === false)) {
                            $(this).removeClass("layout-highlight-transparent").addClass("layout-highlight");
                        }
                    });
                }
            },
            _showPage: function (container) {
                var showid = container.attr("data-delayShowid");
                var page = $("#" + showid);
                if (showid && page.length) {
                    var para = HoteamUI.Page.GetContainerPara(showid);
                    var pagename = page.attr("pagepagename");
                    HoteamUI.UIManager.Show(showid, pagename, para);
                    container.removeAttr("data-delayShowid");
                }
            },
            __draggableStop__: function (dragItem, ui, opt) {
                var type = opt.type;
                var position = ui.position;
                var prevItem = dragItem.prev();
                var nextItem = dragItem.next();
                var prevMinSize = parseInt(prevItem.attr("data-minSize") || 0);
                var nextMinSize = parseInt(nextItem.attr("data-minSize") || 0);
                //首先判断传递进来的两个item是否有隐藏的，如果有其中之一是隐藏的，则需要寻找其余的item
                if (prevItem.css("display") == "none" && nextItem.css("display") == "none") {
                    return;
                }
                if (prevItem.css("display") == "none") {
                    prevItem = prevItem.prevAll().not(".hoteam-layout-drag").first();
                }
                if (nextItem.css("display") == "none") {
                    nextItem = nextItem.nextAll().not(":hidden").not(".hoteam-layout-drag").first();
                }
                if (prevItem.length == 0 || nextItem.length == 0) {
                    return;
                }
                var direction = dragItem.attr("direction");
                if (type == "horizontal") {
                    var value = position.left;
                    var maxValue = nextItem.position().left + nextItem.width() - nextMinSize - dragItem.width();
                    var minValue = prevItem.position().left + prevMinSize;
                }
                else {
                    var value = position.top;
                    var maxValue = nextItem.position().top + nextItem.height() - nextMinSize - dragItem.height();
                    var minValue = prevItem.position().top + prevMinSize;
                }

                if (value > maxValue) {
                    value = maxValue;
                }
                if (value < minValue) {
                    value = minValue;
                }

                //若拖动到最小值则相当于隐藏
                if (direction == "prev") {
                    if (value < minValue + this.css.mindraggSize) {
                        value = minValue;
                        dragItem.attr("data-open", "false");
                    }
                    else {
                        dragItem.attr("data-open", "true");
                    }
                }
                else {
                    if (value > maxValue - this.css.mindraggSize) {
                        //若超过最大值，则应让前一个容器的宽度为容器尺寸减去拖动条尺寸
                        value = maxValue - (type == "horizontal" ? dragItem.outerWidth(true) : dragItem.outerHeight(true));
                        dragItem.attr("data-open", "false");
                    }
                    else {
                        dragItem.attr("data-open", "true");
                    }
                }
                if (type == "horizontal") {
                    var prevItemWidth = parseInt(value - prevItem.position().left);
                    var nextItemWidth = parseInt(nextItem.width() - (prevItemWidth - prevItem.width()));
                    prevItem.width(prevItemWidth);
                    prevItem.attr("data-realsize", prevItemWidth);
                    nextItem.width(nextItemWidth);
                    nextItem.attr("data-realsize", nextItemWidth);
                }
                else {
                    var prevItemHeight = parseInt(value - prevItem.position().top);
                    var nextItemHeight = parseInt(nextItem.height() - (prevItemHeight - prevItem.height()));
                    prevItem.height(prevItemHeight);
                    prevItem.attr("data-realsize", prevItemHeight);
                    nextItem.height(nextItemHeight);
                    nextItem.attr("data-realsize", nextItemHeight);
                    //修改拖动之后在点击，状态和箭头方向错乱问题
                    nextItem.attr("data-size", nextItemHeight);
                    if (nextItemHeight <= 0) {
                        if (nextItem.prev().find(".b-state-bottom").length > 0) {
                            nextItem.prev().find(".b-state-bottom").removeClass("b-state-bottom").addClass("b-state-top");
                        }
                    } else {
                        if (nextItem.prev().find(".b-state-top").length > 0) {
                            nextItem.prev().find(".b-state-top").removeClass("b-state-top").addClass("b-state-bottom");
                        }
                    }
                    
                }

                //加载延时界面
                this._showPage(opt.container);
                this.__resuzeByItem__(prevItem);
                this.__resuzeByItem__(nextItem);

            },
            setFixSize: function ($item) {
                var dataSize = Number($item.attr("data-size")),
                    dataFixSize = $item.attr("data-fix-size");
                if (dataFixSize === undefined && !isNaN(dataSize)) {
                    $item.attr("data-fix-size", dataSize);
                }
            },
            getFixSize: function ($item) {
                var size = Number($item.attr("data-fix-size"));
                return isNaN(size) ? undefined : size;
            },
            __closableButton__: function (prevItem, nextItem, dragItem, direction, opt) {
                var type = opt.type, dataOpen = null, toopTip = "", itemName = "", itemOpt;
                //首先判断传递进来的两个item是否有隐藏的，如果有其中之一是隐藏的，则需要寻找其余的item
                if (prevItem.css("display") == "none" && nextItem.css("display") == "none") {
                    return;
                }
                if (prevItem.css("display") == "none") {
                    prevItem = prevItem.prevAll().not(".hoteam-layout-drag").first();
                }
                if (nextItem.css("display") == "none") {
                    nextItem = nextItem.nextAll().not(".hoteam-layout-drag").first();
                }
                if (prevItem.length == 0 || nextItem.length == 0) {
                    return;
                }
                if (type == "horizontal") {
                    var nextItemWidth = nextItem.width();
                    var prevItemWidth = prevItem.width();
                    if (direction == "next") {
                        if (nextItemWidth) {
                            this.setFixSize(prevItem);
                            this.setFixSize(nextItem);
                            prevItem.width(prevItemWidth + nextItemWidth);
                            nextItem.width(0);
                            nextItem.attr("data-size", 0);
                            dragItem.attr("data-open", "false");
                            dataOpen = false;
                        }
                        else {
                            var nextFixSize = this.getFixSize(nextItem);
                            var prevFixSize = this.getFixSize(prevItem);
                            //var oldNextItemWidth = +(this.getFixSize(nextItem) || nextItem.attr("data-realSize"));
                            var oldNextItemWidth = 0;

                            if (nextFixSize) {
                                oldNextItemWidth = nextFixSize;
                            }
                            else if (prevFixSize) {
                                oldNextItemWidth = prevItemWidth - prevFixSize;
                            }
                            else {
                                oldNextItemWidth = nextItem.attr("data-realSize");
                            }
                            prevItem.width(prevItemWidth - oldNextItemWidth);
                            nextItem.width(oldNextItemWidth);
                            nextItem.attr("data-size", oldNextItemWidth);
                            dragItem.attr("data-open", "true");
                            dataOpen = true;
                            //加载延时页面
                            this._showPage(opt.container);
                        }
                    }
                    else {
                        if (prevItemWidth) {
                            nextItem.width(nextItemWidth + prevItemWidth);
                            prevItem.width(0);
                            prevItem.attr("data-size", 0);
                            dragItem.attr("data-open", "false");
                            dataOpen = false;
                        }
                        else {
                            var oldPrevItemWidth = +prevItem.attr("data-realSize");
                            nextItem.width(nextItemWidth - oldPrevItemWidth);
                            prevItem.width(oldPrevItemWidth);
                            prevItem.attr("data-size", oldPrevItemWidth);
                            dragItem.attr("data-open", "true");
                            dataOpen = true;
                            //加载延时页面
                            this._showPage(opt.container);
                        }
                    }
                    if (dragItem.find(".b-state-left").length > 0) {
                        dragItem.find(".b-state-left").removeClass("b-state-left").addClass("b-state-right");
                    } else {
                        dragItem.find(".b-state-right").removeClass("b-state-right").addClass("b-state-left");
                    }
                }
                else {
                    var nextItemHeight = nextItem.height();
                    var prevItemHeight = prevItem.height();
                    if (direction == "next") {
                        if (nextItemHeight) {
                            prevItem.height(prevItemHeight + nextItemHeight);
                            nextItem.height(0);
                            nextItem.attr("data-size", 0);
                            dragItem.attr("data-open", "false");
                            dataOpen = false;
                        }
                        else {
                            var oldNextItemHeight = +nextItem.attr("data-realSize");
                            prevItem.height(prevItemHeight - oldNextItemHeight);
                            nextItem.height(oldNextItemHeight);
                            nextItem.attr("data-size", oldNextItemHeight);
                            dragItem.attr("data-open", "true");
                            dataOpen = true;
                            //加载延时页面
                            this._showPage(opt.container);
                        }

                    }
                    else {
                        if (prevItemHeight) {
                            nextItem.height(nextItemHeight + prevItemHeight);
                            //更新prevItem的height为起始高度
                            prevItem.attr("data-realSize", prevItem.height());

                            prevItem.height(0);
                            prevItem.attr("data-size", 0);
                            dragItem.attr("data-open", "false");
                            dataOpen = false;
                        }
                        else {
                            var oldPrevItemHeight = +prevItem.attr("data-realSize");
                            nextItem.height(nextItemHeight - oldPrevItemHeight);
                            prevItem.height(oldPrevItemHeight);
                            prevItem.attr("data-size", oldPrevItemHeight);
                            dragItem.attr("data-open", "true");
                            dataOpen = true;
                            //加载延时页面
                            this._showPage(opt.container);
                        }
                    }
                    if (dragItem.find(".b-state-top").length > 0) {
                        dragItem.find(".b-state-top").removeClass("b-state-top").addClass("b-state-bottom");
                    } else {
                        dragItem.find(".b-state-bottom").removeClass("b-state-bottom").addClass("b-state-top");
                    }
                }
                this.__resuzeByItem__(prevItem);
                this.__resuzeByItem__(nextItem);
                //开始：需求46
                itemName = dragItem.attr("data-itemname");
                itemOpt = opt.items[itemName];
                if (itemOpt.openStateTooltipId && dataOpen === true) {
                    toopTip = HoteamUI.Language.Lang(itemOpt.openStateTooltipId);
                }
                else if (itemOpt.closeStateTooltipId && dataOpen === false) {
                    toopTip = HoteamUI.Language.Lang(itemOpt.closeStateTooltipId);
                }
                if (toopTip) {
                    dragItem.find(".ui-state-active").attr("title", toopTip);
                }
                //结束
            },
            __resuzeByItem__: function (item) {
                var childrenId = $("div[parentid='" + item.attr("id") + "']").attr("id");
                if (childrenId) {
                    HoteamUI.Control.Instance(childrenId).Resize();
                }
            },
            __createItems__: function (item) {
                var attrsArray = [], cssArray = [], styleArray = [], content = "", offsetValue = 0, tooltip = "";
                cssArray.push(this.css.dragContainer);
                //增加颜色配置
                if (item.backgroundColor) {
                    styleArray.push("background-color:" + item.backgroundColor);
                }
                //如果是拖动条则加上拖动条样式
                if (item.type == "drag") {
                    //是否可以拖动
                    attrsArray.push("resizable='" + item.resizable + "'");
                    //是否显示关闭按钮
                    attrsArray.push("closable='" + item.closable + "'");
                    //方向
                    attrsArray.push("direction='" + item.direction + "'");
                    //默认打开状态
                    attrsArray.push("data-open='true'");
                    if (item.resizable) {
                        cssArray.push(this.css.dragItem);
                    }
                    if (this.opt.type == "horizontal") {
                        cssArray.push("ui-state-horizontal");
                    } else {
                        cssArray.push("ui-state-vertical");
                    }
                    if (item.closable) {
                        //开始：需求46
                        tooltip = item.openStateTooltipId ? HoteamUI.Language.Lang(item.openStateTooltipId) : "";
                        var picClass = "";
                        if (this.opt.type == "horizontal") {
                            if (item.direction == "prev") {
                                picClass = "b-state-left";
                            } else {
                                picClass = "b-state-right";
                            }
                        } else {
                            if (item.direction == "prev") {
                                picClass = "b-state-top";
                            } else {
                                picClass = "b-state-bottom";
                            }
                        }
                        content = "<div><div class='" + picClass + " ui-state-active basesprite' title='" + tooltip + "'></div></div>";
                        //结束
                    }
                }
                attrsArray.push("data-size='" + item.size + "'");
                attrsArray.push("data-realSize='" + item.realSize + "'");
                attrsArray.push("data-itemName='" + item.name + "'");
                if (item.minSize) {
                    attrsArray.push("data-minSize='" + item.minSize + "'");
                }
                if (item.maxSize) {
                    attrsArray.push("data-maxSize='" + item.maxSize + "'");
                }

                //根据方向生成样式及size
                if (this.opt.type == "horizontal") {
                    if (this.opt.autofit) {
                        cssArray.push("hoteam-lauout-horizontal-auto");
                    }
                    cssArray.push(this.css.dragContainer_horizontal);
                    styleArray.push("width:" + item.realSize + "px");
                }
                else {
                    if (item.realSize == "auto") {
                        cssArray.push(this.css.dragContainer_vertical);
                        styleArray.push("height:auto");
                    } else {
                        cssArray.push(this.css.dragContainer_vertical);
                        styleArray.push("height:" + item.realSize + "px");
                        if (this.opt.itemWidth) {
                            styleArray.push("width:" + this.opt.itemWidth + "px");
                        }
                    }
                }
                attrsArray = attrsArray.join(' ');
                cssArray = cssArray.join(' ');
                styleArray = styleArray.join(';');
                if (this.opt.type == "horizontal" && this.opt.autofit) {
                    return "<td id='" + item.id + "' class='" + cssArray + "' " + attrsArray + " style='" + styleArray + "'>" + content + "</td>";
                } else {
                    return "<div id='" + item.id + "' class='" + cssArray + "' " + attrsArray + " style='" + styleArray + "'>" + content + "</div>";
                }
            },
            __itemInfoTransform__: function (opt) {
                opt = opt || this.opt;
                var containerSize, notSizeItems = [], hasSizeSum = 0;

                var containerWidth = opt.container.width();
                var containerHeight = opt.container.height();
                opt.itemWidth = containerWidth;
                if (opt.groupName) {
                    containerWidth = containerWidth - 2;
                    containerHeight = containerHeight - 2;
                    opt.itemWidth = containerWidth - 2;
                }

                if (opt.type == "horizontal") {
                    containerSize = containerWidth;
                }
                else {
                    containerSize = containerHeight;
                }

                for (var i in opt.items) {
                    if (!opt.items.hasOwnProperty(i)) {
                        continue;
                    }
                    var item = opt.items[i];
                    item.id = opt.id + "_" + i;
                    //如果当前item是隐藏
                    if (item.visible != undefined && !item.visible) {
                        item.realSize = 0;
                        continue;
                    }
                    if (item.size == null) {
                        item.size = '100';
                    }
                    if (item.size.toString().indexOf("%") == -1) {
                        //解决问题：为了让item随着里面的列表内容多少而高度变化，给item设定size为auto（只对内容是列表控件有效）
                        if (item.size == "auto") {
                            item.realSize = item.size;
                        } else {
                            hasSizeSum += +item.size;
                            item.realSize = item.size;
                        }
                    }
                    else {
                        if (opt.type == "vertical" && opt.autofit) {
                            item.realSize = "auto";
                            item.size == "auto";
                        } else {
                            notSizeItems.push(i);
                        }
                    }
                }
                var notSizeValue = containerSize - hasSizeSum;
                if (notSizeValue < 0) {
                    opt.itemWidth = opt.itemWidth - HoteamUI.Common.GetScrollbarWidth();
                }
                //结束
                for (var i = 0; i < notSizeItems.length; i++) {
                    var item = opt.items[notSizeItems[i]];
                    //如果是最后一个则填充剩余位置
                    if (i == notSizeItems.length - 1) {
                        item.realSize = containerSize - hasSizeSum;
                        if (item.maxSize && (item.realSize > item.maxSize)) {//增加最大值设置，如果超过，则按最大值来设置
                            item.realSize = item.maxSize;
                        }
                    }
                    else {
                        item.realSize = parseInt(notSizeValue * (parseInt(item.size) / 100));
                        if (item.maxSize && (item.realSize > item.maxSize)) {//增加最大值设置，如果超过，则按最大值来设置
                            item.realSize = item.maxSize;
                        }
                        hasSizeSum += item.realSize;
                    }
                }
            },
            //通过padding属性获取宽占位和高站位
            __getSize__: function (padding, type) {
                if (!padding) {
                    return 0;
                }
                var arr = padding.split(" ");
                if (arr.length == 1) {
                    return 2 * parseInt(padding);
                } else if (arr.length == 2) {
                    if (type == "vertical") {
                        return 2 * parseInt(arr[0]);
                    } else {
                        return 2 * parseInt(arr[1]);
                    }
                } else if (arr.length == 3) {
                    if (type == "vertical") {
                        return parseInt(arr[0]) + parseInt(arr[2]);
                    } else {
                        return parseInt(arr[1]);
                    }
                } else if (arr.length == 4) {
                    if (type == "vertical") {
                        return parseInt(arr[0]) + parseInt(arr[2]);
                    } else {
                        return parseInt(arr[1]) + parseInt(arr[3]);
                    }
                }
            },
            //通过border给容器设置边框
            __setBorder__: function (border, container) {
                var arr = border.split(" ");
                if (arr.length == 1) {
                    arr = [arr[0], arr[0], arr[0], arr[0]];
                } else if (arr.length == 2) {
                    arr = [arr[0], arr[1], arr[0], arr[1]];
                } else if (arr.length == 3) {
                    arr = [arr[0], arr[1], arr[2]];
                } else if (arr.length == 4) {
                    arr = [arr[0], arr[1], arr[2], arr[3]];
                }
                container.css({
                    borderTop: arr[0] + " border #ccc",
                    borderRight: arr[1] + " border #ccc",
                    borderBottom: arr[2] + " border #ccc",
                    borderLeft: arr[3] + " border #ccc"
                });
            }
        }
    })(jQuery);
}
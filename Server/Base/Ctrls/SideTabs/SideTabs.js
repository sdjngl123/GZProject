HoteamUI.Control.OSideTabs = {
    Create: function (options) {
        options = options || {};
        var me = this;
        var ctrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions;

        var o = {};
        o.parentId = this.id;
        o.id = this.GetId();
        o.items = [];
        o.width = ctrlOptions.width || $.hoteamSideTabs.defaults.width;
        for (var i in ctrlOptions) {
            if (!ctrlOptions.hasOwnProperty(i)) {
                continue;
            }
            if (i.indexOf("item") > -1) {
                o.items.push(ctrlOptions[i]);
            }
        }
        o.ctrl = HoteamUI.Control.Instance(o.parentId);
        o.event = {};
        var handlers = (options.controlInfo || this.ControlInfo()).PageHandlers;
        $.each(handlers, function (index, val) {
            if (val.HandlerName == "OnShow") {
                o.event.OnShow = me.GetEventFunctionName("OnShow");
            } else if (val.HandlerName == "OnHide") {
                o.event.OnHide = me.GetEventFunctionName("OnHide");
            }
        });
        $.hoteamSideTabs.create(o);
    },
    SetWidth: function (width) {
        $("#" + this.GetId()).attr("oldWidth", width).data("option").width = width;
    },
    AddTab: function (info) {
        $.hoteamSideTabs.addTab(this.GetId(), info);
    },
    UpdateTab: function (tabIndex, info) {
        $.hoteamSideTabs.updateTab(this.GetId(), tabIndex, info);
    },
    RemoveTab: function (index) {
        var id = this.GetId(),
            li = $("#" + this.GetId()).children("ul").children("li:eq('" + index + "')"),
            contentid = li.attr("contentid");
        if (li.prev().length > 0) {
            li.prev().click();
        } else {
            li.next().click();
        }
        li.remove();
        $("#" + contentid).click();
    },
    GetTabInfoList: function () {
        return $.hoteamSideTabs.getTabInfoList(this.GetId());
    },
    GetIndexByTabId: function (tabId) {
        return $("#" + this.GetId()).children("ul").children("[tabid='" + tabId + "']").index();
    },
    ShowTabByTabId: function (tabId) {
        var li = $("#" + this.GetId()).children("ul").children("[tabid='" + tabId + "']");
        if (!li.hasClass("sideTabs-li-selected")) {
            li.click();
        }
    },
    Resize: function () {
        $.hoteamSideTabs.resize(this.GetId());
    },
    GetId: function () {
        return this.id + "_SideTabs";
    }
}

{
    (function ($) {
        $.hoteamSideTabs = {
            defaults: {
                width: 200
            },
            create: function (o) {
                var containter = $("#" + o.parentId);
                containter.append('<div class="hoteam-sideTabs-containter" id="' + o.id + '"></div>');
                //创建右侧标签tab
                containter.children().append(this.createTabs(o.id, o.items));
                this.initHanlder(o);
                //记录容器宽度和高度
                var con = $("#" + o.id);
                con.data("option", o).attr("oldWidth", o.width).attr("oldHeight", con.height());
            },
            createTabs: function (id, items) {
                var me = this;
                var $ul = $("#" + id).children(".hoteam-sideTabs-ul");
                if ($ul.length == 0) {
                    $ul = $('<ul class="hoteam-sideTabs-ul"></ul>');
                }
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var contentID = HoteamUI.UIManager.NewGUID();
                    var $li = $('<li tabid="' + item.tabId + '" contentid="' + contentID + '">' + me.getTabText(item) + '</li>').data("info", item);
                    $ul.append($li);
                }
                return $ul;
            },
            addTab: function (id, info) {
                this.createTabs(id, [info]);
            },
            updateTab: function (id, index, info) {
                var ul = $("#" + id).children("ul.hoteam-sideTabs-ul"),
                    li = ul.children(":eq('" + index + "')"),
                    contentid = li.attr("contentid"),
                    oldInfo = li.data("info"),
                    isChanged = false,
                    selected = false;
                if ($("#" + contentid).css("display") == "block") {
                    selected = true;
                }
                if (li.length == 0) {
                    return;
                }
                if (info.tabId) {//传递过来的info有pageId
                    isChanged = info.tabId != oldInfo.tabId;
                } else {
                    isChanged = info.pageName != oldInfo.pageName;
                }
                oldInfo.pageParas = info.pageParas;
                if (isChanged) {//发生改变
                    li.text(this.getTabText(info)).attr("tabid", info.tabId);
                    HoteamUI.Page.DisposePageControl(contentid);
                    $("#" + contentid).remove();
                    li.data("info", $.extend(true, oldInfo, info, { pageParas: { Refresh: false } }));
                    if (selected) {
                        this.loadPage(id, li);
                    } else {
                        if (info.delayLoadPage == false) {
                            li.click();
                        }
                    }
                } else {
                    if (oldInfo.pageParas === undefined) {
                        oldInfo.pageParas = {};
                    }
                    oldInfo.pageParas.Refresh = true;
                    //已经加载
                    HoteamUI.Page.SetContainerParas(contentid, oldInfo.pageName, oldInfo.pageParas);
                    if (selected) {
                        HoteamUI.Page.FirePageEvent(contentid, "OnCreate", {});
                    }
                    else {
                        li.attr("neadOnCreate", true);
                    }
                }
            },
            initHanlder: function (o) {
                var me = this,
                    event = o.event,
                    ctrlEvent = { o: o.ctrl },
                    con = $("#" + o.id),
                    ul = con.children("ul");
                ul.on("click", "li", function () {
                    var li = $(this);
                    //判断当前是否是打开状态
                    if (li.hasClass("sideTabs-li-selected")) {//已经打开
                        //调用外部打开事件（事件中需要将控件外部的宽度增大）
                        ctrlEvent.width = 20;
                        HoteamUI.Common.ExeFunction(event.OnHide, ctrlEvent);
                        $(this).removeClass("sideTabs-li-selected");
                        $(this).parent().siblings().hide();
                    } else {//未打开
                        $(this).addClass("sideTabs-li-selected");
                        $(this).siblings().removeClass("sideTabs-li-selected");
                        ctrlEvent.width = parseInt(o.width) + 20;
                        //调用外部打开事件（事件中需要将控件外部的宽度增大）
                        HoteamUI.Common.ExeFunction(event.OnShow, ctrlEvent);
                        //加载page
                        me.loadPage(o.id, li);
                    }
                });
            },
            loadPage: function (id, li) {
                var con = $("#" + id),
                    info = li.data("info"),
                    linkid = li.attr("contentid"),
                    needOnCreat = li.attr("neadOnCreate");
                //判断是否已经加载过page
                var page = con.children('#' + linkid);
                con.children().not(page).not("ul").hide();
                if (page.length == 0) {
                    con.append('<div id="' + linkid + '" class="sideTabs-page"></div>');
                    HoteamUI.UIManager.Show(linkid, info.pageName, info.pageParas);
                }
                page.show();
                if (needOnCreat) {
                    HoteamUI.Page.FirePageEvent(linkid, "OnCreate", {});
                    li.removeAttr("neadOnCreate");
                }
                if (page.attr("needResize")) {
                    var childrenId = $("div[parentid='" + linkid + "']").attr("id");
                    if (childrenId) {
                        HoteamUI.Control.Instance(childrenId).Resize();
                    }
                    page.removeAttr("needResize");
                }
            },
            getTabInfoList: function (id) {
                var list = [];
                var lis = $("#" + id).children("ul").children();
                lis.each(function () {
                    var li = $(this);
                    var info = li.data("info");
                    list.push({
                        pageName: info.pageName,
                        pageParas: info.pageParas,
                        tabId: info.tabId,
                        text: info.text,
                        pid: li.attr("contentid")
                    });
                });
                return list;
            },
            getTabText: function (info) {
                //设置标题
                if (info.text) {
                    return info.text;
                }
                else if (info.textId) {
                    return HoteamUI.Language.Lang(info.textId);
                }
                else if (info.pageName) {
                    //若没有textId按照PageName读取标题内容
                    var pageConfig = HoteamUI.UIManager.GetPageConfig(info.pageName);
                    var pageTitleId = pageConfig.PageOptions.title;
                    if (pageTitleId) {
                        return HoteamUI.Language.Lang(pageTitleId);
                    }
                }
            },
            resize: function (pid) {
                var con = $("#" + pid),
                    o = con.data("option"),
                    oldWidth = con.attr("oldWidth"),
                    oldHeight = con.attr("oldHeight"),
                    width = con.width(),
                    height = con.height();
                if (width == 0 || (oldWidth == width && oldHeight == height)) {
                    return;
                }
                con.attr("oldWidth", width).attr("oldHeight", height);
                o.width = width;
                con.children("div.sideTabs-page").each(function () {
                    var id = $(this).attr("id");
                    var child = $(this).children("div[parentid='" + id + "']");
                    $(this).css("width", width);
                    $(this).css("height", height);
                    if ($(this).css("display") != "none") {
                        if (child.length > 0) {
                            ctrlObject = HoteamUI.Control.Instance(child.attr("id"));
                            ctrlObject.Resize();
                        }
                    } else {
                        $(this).attr("needResize", "true");
                    }
                });
            }
        }
    })(jQuery);
}
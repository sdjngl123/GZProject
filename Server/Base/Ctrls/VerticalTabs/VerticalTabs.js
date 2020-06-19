HoteamUI.Control.OVerticalTabs = {
    Create: function (options) {
        var me = this;
        options = options || {};
        var parentId = this.id;
        var id = this.GetId();
        //设置参数
        var ctrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions;
        var o = {};
        o.info = [];
        o.parentId = parentId;
        o.id = id;
        o.hideTitle = ctrlOptions.hideTitle;
        o.autofit = options.autofit;
        for (var i in ctrlOptions) {
            if (!ctrlOptions.hasOwnProperty(i)) {
                continue;
            }
            if (i.indexOf("item") > -1) {
                o.info.push(ctrlOptions[i]);
            }
        }
        $.hoteamVerticalTabs.create(o);
    },
    AddTab: function (option) {
        $.hoteamVerticalTabs._addTab(this.GetId(), option);
    },
    UpdateTab: function (tabIndex, info) {
        $.hoteamVerticalTabs._updateTab(this.GetId(), tabIndex, info);
    },
    ShowAllTitle: function () {
        var id = this.id + "_verticaltab";
        var c = $("#" + id);
        var tab = $("#" + id + "_tab").show();
        var pages = $("#" + id + "_page");
        pages.css("height", c.height() - tab.height());
    },
    HideAllTitle: function () {
        var id = this.id + "_verticaltab";
        var c = $("#" + id);
        var tab = $("#" + id + "_tab").hide();
        var pages = $("#" + id + "_page");
        pages.css("height", c.height() - tab.height());
    },
    HideTab: function (index) {
        if (index == undefined) {
            var len = $("#" + this.GetId() + "_page").children().length;
            for (var i = 0; i < len; i++) {
                $.hoteamVerticalTabs.hideTab(this.GetId(), i);
            }
        } else {
            $.hoteamVerticalTabs.hideTab(this.GetId(), index);
        }
    },
    ShowTab: function (index) {
        if (index == undefined) {
            var len = $("#" + this.GetId() + "_page").children().length;
            for (var i = 0; i < len; i++) {
                $.hoteamVerticalTabs.showTab(this.GetId(), i);
            }
        } else {
            $.hoteamVerticalTabs.showTab(this.GetId(), index);
        }
    },
    HideTabContent: function (index) {
        if (index === undefined) {
            return;
        }

        $.hoteamVerticalTabs.hideTabContent(this.GetId(), index);
    },
    HideTabContent: function (index) {
        if (index === undefined) {
            return;
        }

        $.hoteamVerticalTabs.hideTabContent(this.GetId(), index);
    },
    ShowTabContent: function (index) {
        if (index === undefined) {
            return;
        }

        $.hoteamVerticalTabs.showTabContent(this.GetId(), index);
    },
    LocationTab: function (index) {
        var page = $("#" + this.GetId() + "_page");
        var top = page.children(':eq(' + index + ')')[0].offsetTop;
        page.scrollTop(top);
    },
    RemoveTab: function (index) {
        var id = this.GetId(),
            title = $("#" + id + "_tab"),
            page = $("#" + id + "_page"),
            text = title.children(".hoteam-multipage-tab-text").eq(index);
        text.prev().remove();
        text.remove();
        page.children().eq(index).remove();
    },
    GetTabInfoList: function () {
        return $.hoteamVerticalTabs._getTabInfoList(this.GetId());
    },
    GetIndexByTabId: function (tabId) {
        return $("#" + tabId).index();
    },
    GetId: function () {
        return this.id + "_verticaltab";
    },
    Resize: function () {
        $.hoteamVerticalTabs.resize(this.GetId());
    },
    SelectTab: function (index) {
        $.hoteamVerticalTabs.selectTab(this.GetId(), index);
    }
};

{
    (function ($) {
        $.hoteamVerticalTabs = {
            defaults: {
                parentid: null,
                id: null
            },
            defaultsInfo: {
                delayLoadPage: true,//默认延时加载
                showLine: true,//默认有边线包围内部内容
                hideFoldBtn: false //默认不隐藏折叠按钮
            },
            create: function (options) {
                var o = $.extend({}, $.hoteamVerticalTabs.defaults, options),
                    titleStyle = '';
                if (o.hideTitle) {
                    titleStyle = 'style="display:none;height:0px;"';
                }
                var $container = $(
                    '<div id="' + o.id + '" class="hoteam-multipagecontainer">' +
                    '<div class="hoteam-multipage-tab" id="' + o.id + "_tab" + '" ' + titleStyle + '></div>' +
                    '<div class="hoteam-multipage-page" id="' + o.id + "_page" + '"></div>' +
                    '</div>');
                $("#" + o.parentId).append($container.data("multipage", o));
                $container.attr("oldwidth", $container.width());
                //计算page容器的高度
                if (!options.autofit) {
                    $("#" + o.id + "_page").css("height", $container.height() - $("#" + o.id + "_tab").outerHeight());
                }
                //加载page页面中配置的page
                this._loadTab(o.id);
                this._initHanlder(o.id);
            },
            _loadTab: function (id) {
                var o = $("#" + id).data("multipage");
                for (var i = 0; i < o.info.length; i++) {
                    this._addTab(id, o.info[i]);
                }
            },
            _addTab: function (id, info) {
                info = $.extend({}, this.defaultsInfo, info);
                var text = this._getTabText(info);
                //头部添加元素
                var tab = $("#" + id + "_tab");
                if (tab.children().length != 0) {
                    tab.append('<span>|</span>');
                }
                tab.append('<span class="hoteam-multipage-tab-text" linkid="' + info.tabId + '">' + text + '</span>');
                var parent = $("#" + id + "_page"),
                    parWidth = parent.width(),
                    childWidth = parWidth - HoteamUI.Common.GetScrollbarWidth();//给纵向滚动条预留位置
                //内容添加
                var pageid = HoteamUI.UIManager.NewGUID(),
                    nodeClass = '',
                    lineClass = '',
                    contentLineClass = '',
                    nodeStyle = '';
                if (info.hideFoldBtn) {
                    nodeStyle = 'style="display:none;"';
                }
                if (!info.delayLoadPage) {
                    nodeClass = 'b-node-open';
                } else {
                    nodeClass = 'b-node-close';
                }
                if (!info.showLine) {
                    lineClass = 'hoteam-multipage-c-noline';
                    contentLineClass = 'hoteam-multipage-content-line';
                }
                var heightAttr = 'bheight="auto"', isAuto = true;
                
                if (info.height) {
                    var height;
                    if (info.height.indexOf("%") > -1) {
                        //通过百分比计算实际值
                        height = parent.height() * parseInt(info.height) / 100;
                    }
                    else {
                        height = info.height;
                    }
                    heightAttr = 'bheight="' + (parseInt(height) - 6) + 'px"';//6是margin-bottom的值
                    isAuto = false;
                } else {
                    //20199  李金岳 经多次测试 auto 去掉后未发现影响，暂认为 auto 无实际作用，注释。
                   // parent.height('auto');
                }
                

                var $pagehtml = $('<div style="width:' + childWidth + 'px;" ' + heightAttr + ' class="hoteam-multipage" id="' + (info.tabId || "") + '">' +
                    '<div class="hoteam-multipage-c hoteam-multipage-c-line ' + lineClass + '">' +
                    '<div class="hoteam-multipage-title">' +
                    '<span ' + nodeStyle + ' class="basesprite ' + nodeClass + '"></span>' +
                    '<div class="hoteam-multipage-text">' + text + '</div>' +
                    '</div>' +
                    '<div class="hoteam-multipage-content-c ' + contentLineClass + '">' +
                    '<div id="' + pageid + '" class="hoteam-multipage-content" controltype="PageContainer"></div>' +
                    '</div>' +
                    '</div>' +
                    '</div>');
                parent.append($pagehtml);
                $("#" + pageid).data("info", info);
                if (!info.delayLoadPage) {
                    $pagehtml.css("height", $pagehtml.attr("bheight"));
                    $pagehtml.children(".hoteam-multipage-title").find(".hoteam-multipage-img").addClass("b-angle-up");
                    HoteamUI.UIManager.Show(pageid, info.pageName, info.pageParas, isAuto);
                    $("#" + pageid).attr("load", "true").attr("show", "true");
                } else {
                    $("#" + pageid).parent().hide();
                }
            },
            _updateTab: function (id, tabIndex, info) {
                info = $.extend({}, this.defaultsInfo, info);
                var container = $("#" + id + "_page"),
                    title = $("#" + id + "_tab"),
                    pageContent = container.children().eq(tabIndex),
                    page = pageContent.children().children(".hoteam-multipage-content-c").children(".hoteam-multipage-content"),
                    oldInfo = page.data("info"),
                    text = this._getTabText(info),
                    isChanged = false;
                if (page.length == 0) {
                    return;
                }
                if (info.tabId) {//传递过来的info有pageId
                    isChanged = info.tabId != oldInfo.tabId;
                } else {
                    isChanged = info.pageName != oldInfo.pageName;
                }
                //如果发生了变化
                if (isChanged) {
                    var contentid = page.attr("id");
                    //改变当前的title
                    title.children(".hoteam-multipage-tab-text").eq(tabIndex).attr("linkid", info.tabId).text(text);
                    page.parent().prev()
                        .children(".hoteam-multipage-text").text(text);
                    HoteamUI.Page.DisposePageControl(contentid);

                    if (page.attr("load") == "true" && page.attr("show") == "true") {//如果已经加载过且打开了
                        info.pageParas.refresh = false;
                        HoteamUI.UIManager.Show(contentid, info.pageName, info.pageParas, true);
                        page.data("info", info);
                    } else if (page.attr("load") != "true") {//如果是未加载的(那意味着肯定是隐藏的)
                        info.pageParas.refresh = false;
                        page.data("info", info);
                    } else if (page.attr("load") == "true" && page.attr("show") != "true") {//如果是加载过且隐藏的
                        info.pageParas.refresh = false;
                        page.attr("changepage", "true").data("info", info);
                    }
                } else {//没发生变化
                    var contentid = page.attr("id");
                    if (page.attr("load") == "true" && page.attr("show") == "true") {//如果已经加载过且打开了
                        info.pageParas.Refresh = true;
                        //已经加载
                        HoteamUI.Page.SetContainerParas(contentid, info.pageName, info.pageParas);
                        HoteamUI.Page.FirePageEvent(contentid, "OnCreate", {});
                    } else if (page.attr("load") != "true") {//如果是未加载的(那意味着肯定是隐藏的)
                        //HoteamUI.Page.SetContainerParas(contentid, info.pageName, info.pageParas);
                        info.pageParas.refresh = false;
                        page.data("info", info);
                    } else if (page.attr("load") == "true" && page.attr("show") != "true") {//如果是加载过且隐藏的
                        HoteamUI.Page.SetContainerParas(contentid, info.pageName, info.pageParas);
                        page.attr("refresh", "true");//下次打开时执行oncreat
                    }
                }
            },
            _getTabInfoList: function (id) {
                var result = [];
                $("#" + id + "_page").children().each(function () {
                    var content = $(this).children().children().children(".hoteam-multipage-content");
                    var info = content.data("info");
                    result.push({
                        pageName: info.pageName,
                        pageParas: info.pageParas,
                        tabId: info.tabId,
                        text: info.text,
                        pid: content.attr("id")
                    });
                });
                return result;
            },
            _initHanlder: function (id) {
                //收缩展开点击
                $("#" + id).on("click", ">.hoteam-multipage-page>.hoteam-multipage>.hoteam-multipage-c>.hoteam-multipage-title>.basesprite", function () {
                    var ele = $(this).parent().next().children();
                    if (ele.attr("show") == "true") {//当前为打开
                        ele.closest(".hoteam-multipage").css("height", "auto");
                        ele.attr("show", "false").parent().hide();
                        $(this).removeClass("b-node-open").addClass("b-node-close");
                    } else { //当前为关闭
                        var pagec = ele.closest(".hoteam-multipage");
                        pagec.css("height", pagec.attr("bheight"));
                        if (ele.attr("load") == "true") {//当前为page已经加载过的
                            ele.attr("show", "true").parent().show();
                            if (ele.attr("changepage") == "true") {//当前页面发生了变化（被update了
                                var info = ele.data("info");
                                ele.removeAttr("resize");
                                HoteamUI.UIManager.Show(ele.attr("id"), info.pageName, info.pageParas, !info.height);
                            } else if (ele.attr("refresh") == "true") {//如果没有变化但是需要执行oncreat
                                HoteamUI.Page.FirePageEvent(ele.attr("id"), "OnCreate", {});
                            }
                            if (ele.attr("resize") == "true") {
                                HoteamUI.Control.Instance(ele.children().attr("id")).Resize();
                            }
                        } else {//当前page未加载过 
                            ele.attr("load", "true");
                            var info = ele.data("info");
                            ele.attr("show", "true").parent().show();
                            HoteamUI.UIManager.Show(ele.attr("id"), info.pageName, info.pageParas, !info.height);
                        }
                        ele.removeAttr("changepage").removeAttr("refresh").removeAttr("resize");
                        $(this).removeClass("b-node-close").addClass("b-node-open");
                    }
                });
                //头部索引点击事件
                $("#" + id).on("click", ".hoteam-multipage-tab-text", function () {
                    var top = $("#" + $(this).attr("linkid"))[0].offsetTop;
                    $(this).parent().next()[0].scrollTop = top;
                });
            },
            hideTab: function (id, index) {
                var page = $("#" + id + "_page").children().eq(index);
                if (page.length > 0) {
                    page.children().children().children(".hoteam-multipage-content").removeAttr("show").parent().hide();
                }
            },
            hideTabContent: function (id, index) {
                var page = $("#" + id + "_page").children().eq(index);
                page.css("height", "auto");

                if (page.length > 0) {
                    page.children().children().children(".hoteam-multipage-content").removeAttr("show").parent().hide();
                }
            },
            showTabContent: function (id, index) {
                var page = $("#" + id + "_page").children().eq(index);
                page.css("height", page.attr("bheight"));

                if (page.length > 0) {
                    page.children().children().children(".hoteam-multipage-content").attr("show", "true").parent().show();
                }
            },
            showTab: function (id, index) {
                var page = $("#" + id + "_page").children().eq(index);
                if (page.length > 0) {
                    page.children().children().children(".hoteam-multipage-content").attr("show", "true").parent().show();
                }
            },
            _getTabText: function (info) {
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
            selectTab: function (id, index) {
                var $tab,
                    top;

                $tab = $("#" + id + ">.hoteam-multipage-tab>.hoteam-multipage-tab-text").eq(index);
                if ($tab && $tab.length === 1) {
                    top = $("#" + $tab.attr("linkid"))[0].offsetTop;
                    $tab.parent().next()[0].scrollTop = top;
                }
            },
            resize: function (id) {
                var containter = $("#" + id);
                var oldWidth = containter.attr("oldwidth");
                var heightFlag = false;//默认没有%
                var contents = containter.find(".hoteam-multipage-content");
                var page = $("#" + id + "_page");
                page.height(containter.height() - $("#" + id + "_tab").outerHeight());
                for (var i = 0; i < contents.length; i++) {
                    var height = $(contents[i]).data("info").height;
                    if (height && height.toString().indexOf('%') > -1) {
                        heightFlag = true;
                        break;
                    }
                }
                if (oldWidth != $("#" + id).width() || heightFlag) {//宽度发生变化或者高度是百分比设置，需要resize
                    $("#" + id).attr("oldwidth", $("#" + id).width());
                    //获取内部page容器
                    var pageHeight = page.height(),
                        pagec = page.children(),
                        pageWidth = page.width() - HoteamUI.Common.GetScrollbarWidth(); //18为滚动条宽度
                    pagec.css("width", pageWidth);
                    //遍历所有页面并resize所有页面
                    for (var i = 0; i < pagec.length; i++) {
                        var $pagec = $(pagec[i]);
                        var pagecPLeft = parseInt($pagec.css("paddingLeft"));
                        var $page = $pagec.find(".hoteam-multipage-content:first");
                        $page.width(pageWidth - (pagecPLeft == 0 ? 0 : (pagecPLeft + 2)) - 2);//border 2px
                        var info = $page.data("info");
                        if ($page.attr("show") == "true") {
                            var height;
                            if (info.height && info.height.indexOf("%") !== -1) {
                                height = pageHeight * parseInt(info.height) / 100 - 18;
                            }
                            else {
                                height = info.height;
                            }
                            $pagec.height(height).attr("bheight", height);
                            var children = $page.children('[parentid="' + $page.attr("id") + '"]'),
                                childrenId = children.attr("id");
                            if (childrenId) {
                                HoteamUI.Control.Instance(childrenId).Resize();
                            }
                        } else {
                            //6px为margin-bottom值和padding-top
                            $pagec.attr("bheight", pageHeight * parseInt(info.height) / 100 - 18);
                            $page.attr("resize", "true");
                        }
                    }
                }
            }
        }
    })(jQuery);
}
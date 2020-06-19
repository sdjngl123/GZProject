HoteamUI.Control.OTabs = {
    Create: function (options) {
        var that = this;
        options = options || {};
        var parentId = this.id;
        var id = this.GetId();

        //设置参数
        var CtrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions;
        var o = {};
        o.tabsInfo = {};
        o.parentId = parentId;
        o.id = id;
        o.cid = this.CID();
        o.showTitle = CtrlOptions.showTitle;
        o.showClosed = CtrlOptions.showClosed;
        o.autofit = options.autofit;
        o.showSwitchBar = CtrlOptions.showSwitchBar;
        o.showMenu = CtrlOptions.showMenu;
        o.titleType = CtrlOptions.titleType;
        o.hasBorder = CtrlOptions.hasBorder;
        o.selectedTab = CtrlOptions.selectedTab;
        for (var i in CtrlOptions) {
            if (!CtrlOptions.hasOwnProperty(i)) {
                continue;
            }
            if (i.indexOf("item") > -1) {
                o.tabsInfo[i] = CtrlOptions[i];
            }
        }

        //事件参数
        var handlers = (options.controlInfo || this.ControlInfo()).PageHandlers; 
        if (handlers && handlers.length > 0) {
            o.event = {};
            o.callback = {};
            o.event.hoteamCtrl = HoteamUI.Control.Instance(parentId);
            $.each(handlers, function (index, val) {
                if (val.HandlerName == "OnClose") {
                    o.callback.onclose = that.GetEventFunctionName("OnClose");
                }
                else if (val.HandlerName == "OnBeforeToggle") {
                    o.callback.onbeforeToggle = that.GetEventFunctionName("OnBeforeToggle");
                }
                //26429 李金岳
                else if (val.HandlerName == "OnAfterToggle") {
                    o.callback.onafterToggle = that.GetEventFunctionName("OnAfterToggle");
                }
            });
            
        }
        $("#" + parentId).data("initOpt", o);
        $.hoteamTabs.create(o);

        if ($.browser.msie && $.browser.version == 8.0) {

            //if (o.titleType === 'standard') {
            //    setTimeout(function () {
            //        $("#" + id).find(">.head>.middle").css('line-height', '26px');
            //    }, 200);
            //}

            setTimeout(function () {
                $("#" + id).find(">.head>.middle").css('line-height', '26px');
            }, 200);

        }
    },
    AddTab: function (options, index) {
        options.tabs = $("#" + this.GetId());
        options.containerObj = $("#" + this.id);
        $.hoteamTabs.addTab(options, index);
    },
    UpdateTab: function (tabIndex, tabInfo) {
        var tabs = $("#" + this.GetId());
        $.hoteamTabs.updateTab(tabs, tabIndex, tabInfo);
    },
    GetNavName: function () {
        var tabs = $("#" + this.GetId());
        return $.hoteamTabs.getNavName(tabs);
    },
    GetTabInfoList: function () {
        var tabs = $("#" + this.GetId());
        return $.hoteamTabs.getTabInfoList(tabs);
    },
    GetTabIndexByTabId: function (tabId) {
        var tabs = $("#" + this.GetId());
        return $.hoteamTabs.getTabIndexByTabId(tabs, tabId);
    },
    RemoveTab: function (index, flag) {
        var tabs = $("#" + this.GetId());
        if (isNaN(index)) {
            //不是数字索引
            index = this.GetTabIndexByTabId(index.tabId);
        }
        $.hoteamTabs.removeTab(tabs, index, null, flag);
    },
    SelectTab: function (index) {
        var tabs = $("#" + this.GetId());
        if (isNaN(index)) {
            index = this.GetTabIndexByTabId(index.tabId);
        }
        $.hoteamTabs.selectTab(tabs, index);
    },
    GetSelectedTab: function () {
        var tabs = $("#" + this.GetId());
        return $.hoteamTabs.getSelectedTabIndex(tabs);
    },
    GetLoadStatusByIndex: function (index) {
        var tabs = $("#" + this.GetId());
        $.hoteamTabs.getLoadStatusByIndex(tabs, index);
    },
    HideAllTitle: function () {
        var tabs = $("#" + this.GetId());
        $("#" + this.id).data("initOpt").showTitle = false;
        $.hoteamTabs.setTabsHead(tabs, false);
    },
    ShowAllTitle: function () {
        var tabs = $("#" + this.GetId());
        $("#" + this.id).data("initOpt").showTitle = true;
        $.hoteamTabs.setTabsHead(tabs, true);
    },
    Resize: function () {
        var tabs = $("#" + this.GetId());
        $.hoteamTabs.resize(tabs);
    },
    Dispose: function () {
        var id = this.GetId();
        $.hoteamTabs.dispose($("#" + id));
    },
    GetId: function () {
        return this.id + "_Tabs";
    },
    ReInit: function (opt) {
        var tabs = $("#" + this.id);
        tabs.empty();
        opt = $.extend({}, tabs.data("initOpt"), opt);

        tabs.data("initOpt", opt);
        $.hoteamTabs.create(opt);
    }
}

{
    (function ($, undefined) {
        $.hoteamTabs = {
            defaults: {
                parentId: null,
                id: null,
                delayLoadPage: true,
                tabs: null,
                showTitle: true,
                showClosed: true,
                selectedTab: 0,
                showSwitchBar: false,
                showMenu: false,
                menuSelect:false,
                //标准:standard , 胶囊:capsule,简单胶囊:capsule sample
                titleType: "standard",
                hasBorder: false
            },
            defaultTab: {
                id: null,
                text: null,
                textId: null,
                pageName: null,
                pageParas: null,
                isSelected: false
            },
            css: {
                container: "hoteamTabs",
                container_head: "head",
                head_left: "left",
                head_middle: "middle",
                head_middle_li_selected: "active",
                head_middle_li_hideclose: "hideclose",
                head_right: "right",
                head_menu: "menu",
                toolcommon: "hoteamTabs-tool",
                toolhover: "ui-state-hover",
                container_content: "content",
                headHeight: 26,
                capsuleHeadHeight: 26,
                toolswidth: 28.5,
                menuwidth:64,
                menudisabled: "ui-state-disabled",
                buttonclass: "ui-pg-button ui-corner-all",
                commonicon: "",
                previcon: "basesprite b-chevron-left",
                menuicon: "basesprite b-chevron-circle-down",
                nexticon: "basesprite b-chevron-right",
                menurefresh: "hoteam-tabs-menu-refresh",
                menuremoveselected: "hoteam-tabs-menu-removeselected",
                menuremoveall_E: "hoteam-tabs-menu-removeall-E",
                tabmovevalue: 0.5,
                border: "hoteam-tabs-border",
                type: {
                    standard: "hoteam-tabs-standard",
                    capsule: "hoteam-tabs-capsule"
                }
            },
            language: {
                zhs: {
                    refresh: "重新加载",
                    close: "关闭当前",
                    trans: "关闭其他"
                },
                en: {
                    refresh: "refresh",
                    close: "close",
                    trans: "close other"
                }
            },
            opt: {
                containerid: null,
                parentId: null,
                parentObj: null,
                tabs: null,
                tabsHead: null,
                tabsHeadUl: null,
                id: null,
                delayLoadPage: true,
                tabs: null,
                showTitle: true,
                showClosed: true,
                selectedTab: 0,
                showSwitchBar: false,
                showMenu: false
            },
            create: function (options) {
                this.opt = $.extend(true, {}, $.hoteamTabs.defaults, options);
                this.opt.parentObj = $("#" + this.opt.parentId);
                this.opt.containerid = this.opt.parentObj.attr("containerid");
                //创建主框架
                //25198 李金岳
                this.opt.tabs = this._createContainer(options.menuSelect);
                this.opt.tabsHead = this.opt.tabs.children("." + this.css.container_head);
                this.opt.tabsHeadUl = this.__getTabsUl__(this.opt.tabs);
                //绑定事件
                this._initHandlers(this.opt.tabs, this.opt.tabsHeadUl);
                //加载tabs列
                this._createTabs();
                this.resize(this.opt.tabs);
            },
            removeTab: function (tabs, index, tabUl, flag) {
                tabUl = tabUl || this.__getTabsUl__(tabs);
                //if (tabUl.children("li").size() == 1) { return; }
                var li = tabUl.children("li:eq(" + index + ")");
                var contentid = li.attr("data-for");
                var contentObj = $("#" + contentid);
                var opt = this.opt;
                var result = HoteamUI.Page.DisposePageControl(contentid);
                var prev = li.prev().find('>span.nav-tabs-item-border-right');
                if (result == false) {
                    return;
                }
                prev.removeClass('nav-tabs-item-border-right-active');
                li.remove();

                if (tabUl.children().length === index) {
                    prev.addClass('nav-tabs-item-border-right-last');
                }
                contentObj.remove();
                //判断flag，来确认是否需要选中一个tab
                if (!flag) {
                    this.__selectNextTab__(tabs, tabUl, index);
                }
            },
            getNavName: function (tabs) {
                var tabUl = this.__getTabsUl__(tabs);
                return tabUl.children("li.active").attr("navName");
            },
            selectTab: function (tabs, index, tabUl) {
                var opt = tabs.data("defaultOptions");
                tabUl = tabUl || this.__getTabsUl__(tabs);
                var li = tabUl.children("li:eq(" + index + ")");
                //26239 李金岳
                var autoResize = li.attr("autoResize");
                var contentid = li.attr("data-for");
                var contentObj = $("#" + contentid);
                //选中tabli
                if (li.hasClass(this.css.head_middle_li_selected) == false) {
                    if (tabUl.closest(".nav-tabs").children("li").length > 1 && opt.callback && opt.callback.onbeforeToggle) {
                        var oldli = li.closest(".nav-tabs").find("li.active"),
                            oldcontentid = oldli.attr("data-for"),
                            oldcontentObj = $("#" + oldcontentid),
                            functionName = opt.callback.onbeforeToggle,
                            obj = opt.event.hoteamCtrl,
                            para,
                            result

                        //传入切换前tab页的信息
                        para = {
                            o: obj,
                            tabid: oldcontentObj.attr("tabid"),
                            pagename: oldcontentObj.attr("pagepagename"),
                            currenttabid: contentObj.attr("tabid"),
                            currentpagename: contentObj.attr("pagepagename")
                        };
                        result = HoteamUI.Common.ExeFunction(functionName, para) === false ? false : true;

                        if (!result) {
                            //return false;
                            return;
                        }
                    }

                    tabUl.children("li").removeClass(this.css.head_middle_li_selected);
                    li.addClass(this.css.head_middle_li_selected);
                }

                //若初始化没有内容容器则不执行
                if (contentObj.length == 0) return;

                //若只剩下一个tab，则隐藏关闭按钮
                var lis = tabUl.children("li");
                if (lis.length == 1) {
                    lis.addClass(this.css.head_middle_li_hideclose);
                }
                else {
                    lis.first().removeClass(this.css.head_middle_li_hideclose);
                }

                lis.find(".nav-tabs-item-border-right").removeClass("nav-tabs-item-border-right-active");
                var preItem = li.prev();
                if (preItem.length > 0) {
                    preItem.find(".nav-tabs-item-border-right").addClass("nav-tabs-item-border-right-active");
                }

                //将选中标签位置进行调整
                this.__setTabliPosition__(tabs, index, tabUl);

                //显示选中内容容器
                var oldStatus = false;
                if (contentObj.css("display") == "none") {
                    tabs.children("." + this.css.container_content).hide();
                    contentObj.show();
                    oldStatus = true;
                }

                //内容页面已经加载
                if (contentObj.attr("isLoad")) {
                    //如果大小发生改变
                    var pagepagename = contentObj.attr("pagepagename");
                    //26239 李金岳
                    if (this.__checkResize__(contentObj, opt.autofit) || autoResize === "true") {
                        var childrenId = $("div[parentid='" + contentid + "']").attr("id");
                        if (childrenId) {
                            HoteamUI.Control.Instance(childrenId).Resize();
                        }
                    }

                    //若需要更新内容时会触发oncreate
                    //问题60：开始
                    if (contentObj.attr("neadOnCreate") || (contentObj.attr("data-active-refresh") && oldStatus)) {
                        HoteamUI.Page.FirePageEvent(contentid, "OnCreate", {});
                        contentObj.removeAttr("neadOnCreate");
                    }
                        //结束

                        //刷新页面，先销毁页面然后在执行创建
                    else if (contentObj.attr("neadrefresh")) {
                        HoteamUI.Page.DisposePageControl(contentid);
                        var pageInfo = contentObj.data("pageInfo");
                        if (pageInfo && pageInfo.pageName) {

                            //设置refresh属性，用户列表和树的刷新。
                            pageInfo.pageParas = pageInfo.pageParas || {};
                            pageInfo.pageParas.Refresh = false;
                            HoteamUI.UIManager.Show(contentid, pageInfo.pageName, pageInfo.pageParas);
                        }
                        contentObj.removeAttr("neadrefresh");
                    }
                }
                else {
                    //检验内容容器大小是否改变，若改变设置初始值。
                    this.__checkResize__(contentObj, opt.autofit);
                    //加载页面
                    var pageInfo = contentObj.data("pageInfo");
                    if (pageInfo && pageInfo.pageName) {
                        var autofit = tabs.data("defaultOptions").autofit;
                        HoteamUI.UIManager.Show(contentid, pageInfo.pageName, pageInfo.pageParas, autofit);
                    }
                    contentObj.attr("isLoad", true);
                }
                //26429 李金岳
                if (tabUl.closest(".nav-tabs").children("li").length > 1 && opt.callback && opt.callback.onafterToggle) {
                    var oldli = li.closest(".nav-tabs").find("li.active"),
                        oldcontentid = oldli.attr("data-for"),
                        oldcontentObj = $("#" + oldcontentid),
                        functionName = opt.callback.onafterToggle,
                        obj = opt.event.hoteamCtrl,
                        para,
                        result

                    //传入切换前tab页的信息
                    para = {
                        o: obj,
                        tabid: oldcontentObj.attr("tabid"),
                        pagename: oldcontentObj.attr("pagepagename"),
                        currenttabid: contentObj.attr("tabid"),
                        currentpagename: contentObj.attr("pagepagename")
                    };
                    HoteamUI.Common.ExeFunction(functionName, para);
                }
            },
            getLoadStatusByIndex: function (tabs, index) {
                var li = this.__getTabsUl__(tabs).children("li:eq(" + index + ")");
                var contentid = li.attr("data-for");
                var contentObj = $("#" + contentid);
                if (contentObj.attr("isLoad")) {
                    return true;
                }
                return false;
            },
            addTab: function (tabinfo, index) {
                this.__setTabText__(tabinfo);
                var tabs = tabinfo.tabs;
                var tabsUl = this.__getTabsUl__(tabs);
                if (index === undefined) {
                    var index = tabsUl.children("ul li").length;
                }
                tabinfo = $.extend(true, {}, tabs.data("defaultOptions"), tabinfo);
                tabinfo.id = this.__getNewTabId__(tabs);
                this.__createTabHead(tabinfo, tabsUl, index);
                this.__createTabContent(tabinfo, tabs, index);

                this._setStandHeadStyle(tabs);
                //是否立即加载该页面
                if (tabinfo.isSelected || !tabinfo.delayLoadPage) {
                    this.selectTab(tabs, index, tabsUl);
                }
            },
            updateTab: function (tabs, index, tabInfo) {
                this.__setTabText__(tabInfo);
                tabInfo = $.extend(true, {}, this.defaultTab, tabInfo);
                var tabsoption = tabs.data("defaultOptions");
                var tabsUl = this.__getTabsUl__(tabs);
                var aimTab = tabsUl.children("li:eq(" + index + ")");
                var content = $("#" + aimTab.attr("data-for"));
                var tabcontentoption = content.data("pageInfo");
                var contentid = content.attr("id");
                var oldTabId = content.attr("tabId");
                //判断参数
                var isSelected = content.css("display") == "block";
                var isLoad = content.attr("isLoad");
                //开始：问题35 未加载的页面不使用刷新方式
                if (!isLoad) {
                    tabInfo.pageParas.Refresh = false;
                }
                //结束
                var isChanged;
                if (tabInfo.tabId) {
                    isChanged = oldTabId != tabInfo.tabId;
                    if (isChanged) {
                        content.attr("tabId", tabInfo.tabId);

                    }
                    else {
                        isChanged = tabcontentoption.pageName != tabInfo.pageName;
                    }

                }
                else {
                    isChanged = tabcontentoption.pageName != tabInfo.pageName;
                }

                if (!isChanged && tabcontentoption.pageParas && tabcontentoption.pageParas.SelectID !== tabInfo.pageParas.SelectID) {
                    //修复多层树结构右侧树不刷新问题 
                    tabInfo.pageParas.ConstraintRefresh = true;
                }

                if (isChanged) {
                    content.removeAttr("isLoad");
                    isLoad = false;
                    tabInfo.pageParas.Refresh = false;
                }

                var isDelay = tabInfo.delayLoadPage;

                //页面配置参数更新
                tabcontentoption.pageName = tabInfo.pageName;
                tabcontentoption.pageParas = tabInfo.pageParas;
                content.data("pageInfo", tabcontentoption);

                //若标题改变则改变相应的tab头
                if (tabInfo.text) {
                    tabcontentoption.text = tabInfo.text;
                    tabsUl.find(">li:eq(" + index + ")" + " a>div>span.text").html(tabInfo.text);
                }

                if (isChanged && (isSelected || isDelay == false)) {
                    //地址发生改变并（被选中或者需要立即显示）
                    HoteamUI.Page.DisposePageControl(contentid);
                    content.removeAttr("isLoad");
                    this.selectTab(tabs, index, tabsUl);
                }
                else if (isChanged && isDelay) {
                    //地址发生改变并且不需要立即加载
                    HoteamUI.Page.DisposePageControl(contentid);
                    content.removeAttr("isLoad");
                }
                else {
                    //没有改变
                    if (isLoad) {
                        if (tabcontentoption.pageParas === undefined) {
                            tabcontentoption.pageParas = {};
                        }

                        tabcontentoption.pageParas.Refresh = true;
                        //已经加载
                        HoteamUI.Page.SetContainerParas(contentid, tabcontentoption.pageName, tabcontentoption.pageParas);
                        if (isSelected) {
                            HoteamUI.Page.FirePageEvent(contentid, "OnCreate", {});
                        }
                        else {
                            //添加标识，当下次选中时执行onCreate
                            content.attr("neadOnCreate", true);
                        }
                    }
                }
            },
            getTabInfoList: function (tabs) {
                var result = [];
                tabs.children("." + this.css.container_content).each(function () {
                    var pageinfo = $(this).data("pageInfo");
                    result.push({
                        pageName: pageinfo.pageName,
                        pageParas: pageinfo.pageParas,
                        tabId: pageinfo.tabId,
                        text: pageinfo.text,
                        pid: this.id
                    });
                });
                return result;
            },
            getTabIndexByTabId: function (tabs, tabId) {
                var index = -1;
                index = tabs.children("." + this.css.container_content + "[tabId='" + tabId + "']").index();
                //index要么大于0 要么等于-1，不可能会等于0，因为有tab头
                if (index > 0) {
                    //由于同级内有一个tab头 所以要减一
                    index = index - 1;
                }
                return index;
            },
            getSelectedTabIndex: function (tabs) {
                var tabsUl = this.__getTabsUl__(tabs);
                return tabsUl.children("." + this.css.head_middle_li_selected).index();
            },
            setTabsHead: function (tabs, isShow) {
                var opt = tabs.data("defaultOptions");
                var tabhead = tabs.children("." + this.css.container_head);
                var contents = tabs.children("." + this.css.container_content);
                var container = tabs.parent();
                if (isShow) {
                    if (tabhead.css("display") == "block")
                        return;
                    else {
                        tabhead.show();
                        tabs.removeClass('hoteam-tabs-head-hidden');
                        contents.height(container.height() - opt.titleType == "standard" ? this.css.headHeight : this.css.capsuleHeadHeight);
                    }
                }
                else {
                    if (tabhead.css("display") == "none")
                        return;
                    else {
                        tabhead.hide();
                        tabs.addClass('hoteam-tabs-head-hidden');
                        contents.height(container.height() - 2);
                    }
                }
            },
            resize: function (tabs) {
                var opt = tabs.data("defaultOptions");
                var tabhead = tabs.children("." + this.css.container_head);
                var tabheadheight = tabhead.css("display") == "block" ? (opt.titleType == "standard" ? this.css.headHeight : this.css.capsuleHeadHeight) : 0;

                //设置内容容器高宽
                var contents = tabs.children("." + this.css.container_content);
                if (!opt.autofit) {
                    //2px为内容的border宽度
                    contents.height(tabs.height() - tabheadheight - 2);
                }
                contents.width(tabs.width() - 2);

                //设置tab列宽度
                var tabUl = this.__getTabsUl__(tabs);
                //25198 李金岳
                var toolLength = tabhead.find(">." + this.css.toolcommon + ":visible").length - (opt.menuSelect ? 0 : 1);
                tabUl.parent().width(tabs.width() - 2 - this.css.toolswidth * toolLength - (opt.menuSelect ? 0 : this.css.menuwidth));

                var selectedIndex = this.getSelectedTabIndex(tabs);
                if (selectedIndex < 0) {
                    return;
                }
                //设置当前选择页内部控件大小
                var li = tabUl.children("li:eq(" + selectedIndex + ")");
                var contentid = li.attr("data-for");
                var contentObj = $("#" + contentid);
                //如果大小发生改变
                if (this.__checkResize__(contentObj, opt.autofit)) {
                    var childrenId = $("div[parentid='" + contentid + "']").attr("id");
                    if (childrenId) {
                        HoteamUI.Control.Instance(childrenId).Resize();
                    }
                }

            },
            dispose: function (tabs) {
                tabs.children("." + this.css.container_content).each(function () {
                    HoteamUI.Page.DisposePageControl(this.id);
                });
            },
            _createContainer: function (menuSelect) {
                var self = this;
                //25198 李金岳
                var tabs = [
                    '<div id="' + this.opt.id + '" class="' + this.css.container + ' ' + (this.opt.hasBorder ? this.css.border : "") + ' ' + (this.opt.titleType || "") + '">',
                    '   <div class="' + this.css.container_head + '" style="height:' + (this.opt.titleType == "standard" ? this.css.headHeight : this.css.capsuleHeadHeight) + 'px">',
                    '         <div class="' + this.css.head_left + " " + this.css.toolcommon + '" style="border-left:none;">',
                    '               <div class="' + this.css.menudisabled + " " + this.css.buttonclass + '">',
                    '                   <span class="' + this.css.commonicon + " " + this.css.previcon + '"></span>',
                    '               </div>',
                    '         </div>',
                    '         <div class="' + this.css.head_middle + '">',
                    '             <ul class="nav nav-tabs"></ul>',
                    '         </div>',
                    '         <div class="' + this.css.head_menu + " " + this.css.toolcommon + '">',
                    menuSelect?'               <div class="' + this.css.buttonclass + '">':"",
                    menuSelect?'                   <span class="' + "fa " + " " + this.css.menuicon + '"></span>':"",
                    menuSelect?'               </div>':"",
                    '         </div>',
                    '         <div class="' + this.css.head_right + " " + this.css.toolcommon + '">',
                    '               <div class="' + this.css.menudisabled + " " + this.css.buttonclass + '">',
                    '                   <span class="' + this.css.commonicon + " " + this.css.nexticon + '"></span>',
                    '               </div>',
                    '         </div>',
                    '   </div>',
                    '</div>'
                ].join('');
                var $tabs = $(tabs);
                var tabUl = this.__getTabsUl__($tabs);
                var toolslength = 0;
                if (this.opt.showTitle) {
                    if (this.opt.showMenu || this.opt.showSwitchBar) {
                        var nextobj = $tabs.find("." + this.css.head_right);
                        var prevobj = $tabs.find("." + this.css.head_left);
                        var menuobj = $tabs.find("." + this.css.head_menu);
                        if (this.opt.showSwitchBar) {
                            nextobj.add(prevobj).show().on({
                                mouseenter: function () { $(this).children().addClass(self.css.toolhover); },
                                mouseleave: function () { $(this).children().removeClass(self.css.toolhover); },
                                click: function () {
                                    if ($(this).hasClass(self.css.head_left)) {
                                        //向前
                                        self.__setTabliPosition__($tabs, "left", tabUl);
                                    }
                                    else if ($(this).hasClass(self.css.head_right)) {
                                        //向后
                                        self.__setTabliPosition__($tabs, "right", tabUl);
                                    }
                                }
                            });
                            toolslength += 2;
                        }
                        if (this.opt.showMenu) {
                            if (menuSelect) {
                                menuobj.show().on({
                                    mouseenter: function () { $(this).children("div").addClass(self.css.toolhover); },
                                    mouseleave: function () { $(this).children("div").removeClass(self.css.toolhover); }
                                });
                                toolslength += 1;
                            } else {
                                menuobj.show();
                                menuobj.width(this.css.menuwidth)
                            }
                            self._createMenu(menuobj, $tabs, tabUl,menuSelect);  
                        }
                    }
                }
                else {
                    $tabs.find("." + this.css.container_head).hide();
                }
                this.opt.parentObj.append($tabs);
                //设置tabUl的初始宽度
                tabUl.parent().width(this.opt.parentObj.width() - this.css.toolswidth * toolslength - (menuSelect? 0 :this.css.menuwidth));
                return $tabs;
            },
            _setStandHeadStyle: function (tabs) {
                tabs.find('>.head .nav-tabs-item-border-right').removeClass("nav-tabs-item-border-right-last nav-tabs-item-border-right-active").filter(":last").addClass("nav-tabs-item-border-right-last");
                tabs.find('>.head li>a:first').addClass('nav-tabs-item-border-left');
            },
            _createTabs: function () {
                if (this.opt.tabsInfo) {
                    //设置默认设置参数
                    this.opt.tabs.data("defaultOptions", this.opt);
                    var index = 0;
                    for (var i in this.opt.tabsInfo) {
                        if (!this.opt.tabsInfo.hasOwnProperty(i)) {
                            continue;
                        }
                        var tab = $.extend({}, this.defaultTab, this.opt.tabsInfo[i]);
                        tab.id = this.opt.id + "_" + i;
                        this.__setTabText__(tab);

                        //创建
                        this.__createTabHead(tab, null, index);

                        this.__createTabContent(tab, null, index);
                        ++index;
                    }

                    this._setStandHeadStyle(this.opt.tabs);
                    //选择默认标签
                    this.selectTab(this.opt.tabs, this.opt.selectedTab, this.opt.tabsHeadUl);
                }
            },
            _createMenu: function (menuContainer, tabs, tabUl,menuSelect) {
                var self = this;
                //25198 李金岳
                var menuHtml = menuSelect? [
                        '<ul>',
                        '   <li class="ui-state-default ' + this.css.menurefresh + '">',
                        '       <span class="basesprite b-refresh" style="float:left;margin-top:5px;margin-right:5px;"></span>' + this.language[HoteamUI.Language.CurLanguage].refresh,
                        '   </li>',
                        '   <li class="ui-state-default ' + this.css.menuremoveselected + '">',
                        '       <span class="basesprite b-close" style="float:left;margin-top:5px;margin-right:5px;"></span>' + this.language[HoteamUI.Language.CurLanguage].close,
                        '   </li>',
                        '   <li class="ui-state-default ' + this.css.menuremoveall_E + '">',
                        '       <span class="basesprite b-trash" style="float:left;margin-top:5px;margin-right:5px;"></span>' + this.language[HoteamUI.Language.CurLanguage].trans,
                        '   </li>',
                        '</ul>',
                    ].join('')
                    :[
                        '<span class="ui-state-default ' + this.css.menurefresh + ' basesprite b-refresh" style="float:left;margin-top:5px;margin-right:5px;cursor:pointer;" title="' + this.language[HoteamUI.Language.CurLanguage].refresh + '"></span>',
                        '<span class="ui-state-default ' + this.css.menuremoveselected + ' basesprite b-close" style="float:left;margin-top:5px;margin-right:5px;cursor:pointer;" title="' + this.language[HoteamUI.Language.CurLanguage].close + '"></span>',
                        '<span class="ui-state-default ' + this.css.menuremoveall_E + ' basesprite b-trash" style="float:left;margin-top:5px;margin-right:5px;cursor:pointer;" title="' + this.language[HoteamUI.Language.CurLanguage].trans + '"></span>',
                    ].join('');
                var menu = $(menuHtml);
                menuContainer.append(menu);
                var clickFun = function (self,_this) {
                    var obj = $(_this);
                    //刷新当前选中页
                    if (obj.hasClass(self.css.menurefresh)) {
                        var selectedcontent = tabs.children("." + self.css.container_content + ":visible");
                        selectedcontent.attr("neadrefresh", true);
                        self.selectTab(tabs, self.getSelectedTabIndex(tabs), tabUl);
                    }
                        //关闭当前选中页
                    else if (obj.hasClass(self.css.menuremoveselected)) {
                        if (tabUl.children("li").size() == 1) { return; }
                        self.removeTab(tabs, self.getSelectedTabIndex(tabs), tabUl);
                    }
                        //关闭其他页面
                    else if (obj.hasClass(self.css.menuremoveall_E)) {
                        var selectedindex = self.getSelectedTabIndex(tabs);
                        var tabullicount = tabUl.children("li").length;
                        var neadremovelist = [];
                        for (var i = 0; i < tabullicount; i++) {
                            var li = tabUl.children("li:eq(" + i + ")");
                            if (i != selectedindex && li.find("span.b-close").length > 0) {
                                neadremovelist.push(tabUl.children("li:eq(" + i + ")"));
                            }
                        }
                        for (var i = 0; i < neadremovelist.length; i++) {
                            self.removeTab(tabs, neadremovelist[i].index(), tabUl, true);
                        }

                        tabUl.parent().scrollLeft(0);
                    }
                }
                if (menuSelect) {
                    menuContainer.on({
                        mouseenter: function () {
                            menu.show();
                            HoteamUI.Common.OCXIframe.Show();
                        },
                        mouseleave: function () {
                            menu.hide();
                            HoteamUI.Common.OCXIframe.Hide();
                        }
                    });
                    menu.on({
                        mouseenter: function () {
                            var index = $(this).index();
                            var removeClass = (index == 0 ? "b-refresh" : (index == 1 ? "b-close" : "b-trash")),
                                addClass = (index == 0 ? "b-blue-refresh" : (index == 1 ? "b-blue-close" : "b-blue-trash"));
                            $(this).children("span").removeClass(removeClass).addClass(addClass);
                        },
                        mouseleave: function () {
                            var index = $(this).index();
                            var addClass = (index == 0 ? "b-refresh" : (index == 1 ? "b-close" : "b-trash")),
                                removeClass = (index == 0 ? "b-blue-refresh" : (index == 1 ? "b-blue-close" : "b-blue-trash"));
                            $(this).children("span").removeClass(removeClass).addClass(addClass);
                        },
                        click: function () {
                            var _this = this;
                            clickFun(self,_this);
                        }
                    }, "li")
                } else {
                    menu.show();
                    menu.on("click", function () {
                        var _this = this;
                        clickFun(self,_this);
                    })
                }
            },
            _initHandlers: function (tabs, tabUl) {
                var self = this,
                    obj = null,
                    fun = null,
                    beforeToggle = null;

                if (self.opt && self.opt.event && self.opt.callback) {
                    obj = self.opt.event.hoteamCtrl;
                    fun = self.opt.callback.onclose;
                    beforeToggle = self.opt.callback.onbeforeToggle
                }

                //点击关闭按钮
                tabUl.on("click", ">li span.nav-tabs-item-close", { obj: obj, fun: fun }, function (event) {

                    var li = $(this).parent().parent().parent(),
                        index = li.index(),
                        contentid = li.attr("data-for"),
                        contentObj = $("#" + contentid),
                        functionName = event.data.fun,
                        obj = event.data.obj;

                    var isCloseClick = event.originalEvent ? true : false;
                    if (isCloseClick) {
                        var result = HoteamUI.Page.FirePageEvent(contentid, "OnBeforeClose", {});
                        if (result && result.close == false) {
                            return false;
                        }
                    }

                    if (functionName && obj) {
                        var functionName = event.data.fun,
                            para = {
                                o: obj,
                                tabid: contentObj.attr("tabid"),
                                pagename: contentObj.attr("pagepagename")
                            };
                        HoteamUI.Common.ExeFunction(functionName, para);
                    }

                    self.removeTab(tabs, index, tabUl);
                });

                //点击tabli事件
                tabUl.on({
                    click: function (e) {
                        //如果点击的是close按钮 则不执行选中。
                        if ($(e.target).hasClass("nav-tabs-item-close")) {
                            return;
                        }
                        //beforeToggle事件selectTab里处理
                        var index = $(this).index();
                        self.selectTab(tabs, index, tabUl);
                        //return false;
                        return;
                    },
                    dblclick: function () {
                        var index = $(this).index();
                        if (tabs.data("defaultOptions").showClosed && tabs.children("li").length > 1)
                            self.removeTab(tabs, index, tabUl);
                    },
                    mousedown: function (e) {
                        if (e.which == 2) {
                            var index = $(this).index();
                            if (tabs.data("defaultOptions").showClosed)
                                self.removeTab(tabs, index, tabUl);
                        }
                    },
                    mouseover: function (e) {
                        var ul = $(this).parent();
                        if (ul.find("li").length > 1) {
                            $(this).find(".nav-tabs-item-close").css("display", "block");
                        }
                    },
                    mouseout: function () {
                        $(this).find(".nav-tabs-item-close").css("display", "none");
                    }
                }, ">li", { obj: obj, beforeToggle: beforeToggle });
            },
            __createTabHead: function (tabinfo, tabUl, index) {
                tabUl = tabUl || this.opt.tabsHeadUl;
                //26239 李金岳
                var tab = [
                    '<li data-for="' + tabinfo.id + '" navName="' + (tabinfo.pageParas ? (tabinfo.pageParas.navName || "") : "") + '"' + '" autoResize="' + (tabinfo.pageParas ? (tabinfo.pageParas.autoResize || "") : (tabinfo.autoResize || "")) + '">',
                    '   <a href="javascript:void(0)"><div>', "<span class='text'>" + tabinfo.text, "</span>",
                    tabinfo.showClosed ? "<span class='basesprite b-close nav-tabs-item-close'></span>" : "",
                    '</div>',
                    '</a>',
                    '<span class="nav-tabs-item-border-right ', (index === 0 ? "nav-tabs-item-border-first" : ""), ' " />',
                    '</li>'
                ].join('');

                if (index === 0) {
                    tabUl.append(tab);
                }
                else {
                    tabUl.find(">li").eq(index - 1).after(tab);
                }
            },
            __createTabContent: function (tabinfo, tabs, index) {
                tabs = tabs || this.opt.tabs;
                var container = tabs.parent();
                var containerid = container.attr("containerid");
                //问题60：开始
                var activeRefresh = tabinfo.activeRefresh ? 'data-active-refresh=\"true\"' : "";
                var tabContent = [
                    '<div id="' + tabinfo.id + '" class="' + this.css.container_content + '" tabId="' + tabinfo.tabId + '"  containerid="' + containerid + '" controltype="PageContainer" ' + activeRefresh + '>',
                    '</div>'
                ].join('');
                //结束
                var $tabContent = $(tabContent);
                var tabhead = tabs.children("." + this.css.container_head);
                var tabheadheight = tabhead.css("display") == "none" ? 0 : tabhead.outerHeight(true);
                var tabContentHeight = tabs.height() - tabheadheight;
                var tabContentWidth = tabs.width();

                //记录原始大小 作用：判断resize
                $tabContent[0].oldHeight = tabContentHeight;
                $tabContent[0].oldWidth = tabContentWidth;

                $tabContent.data("pageInfo", {
                    pageName: tabinfo.pageName,
                    pageParas: tabinfo.pageParas,
                    tabId: tabinfo.tabId,
                    text: tabinfo.text
                })
                if (tabs.data("defaultOptions").autofit) {
                    $tabContent.css("height", "auto").width(tabContentWidth);
                }
                else {
                    $tabContent.height(tabContentHeight).width(tabContentWidth);
                }

                if (index === 0) {
                    tabs.append($tabContent);
                }
                else {
                    tabs.find(">div.content").eq(index - 1).after($tabContent);
                }
            },
            __checkResize__: function (tabcontent, autofit) {

                var h = tabcontent.height();
                var w = tabcontent.width();
                if (autofit) {
                    if (tabcontent[0].oldWidth == w) {
                        return false;
                    }
                    else {
                        tabcontent[0].oldWidth = w;
                        return true;
                    }
                } else {
                    if (tabcontent[0].oldHeight == h && tabcontent[0].oldWidth == w) {
                        return false;
                    }
                    else {
                        tabcontent[0].oldHeight = h;
                        tabcontent[0].oldWidth = w;
                        return true;
                    }
                }
            },
            __setTabText__: function (tabinfo) {
                //设置标题
                if (tabinfo.text) {
                    return;
                }
                else if (tabinfo.textId) {
                    //如果存在textId 按textId读取标题内容
                    tabinfo.text = HoteamUI.Language.Lang(tabinfo.textId);
                }
                else if (tabinfo.pageName) {
                    //若没有textId按照PageName读取标题内容
                    var pageConfig = HoteamUI.UIManager.GetPageConfig(tabinfo.pageName);
                    var pageTitleId = pageConfig.PageOptions.title;
                    if (pageTitleId) {
                        tabinfo.text = HoteamUI.Language.Lang(pageTitleId);
                    }
                }
            },
            __selectNextTab__: function (tabs, tabUl, index) {
                if (index) {
                    this.selectTab(tabs, index - 1, tabUl);
                }
                else {
                    //如果选择第一个index：“0”则还是选择第一个
                    this.selectTab(tabs, 0, tabUl);
                }
            },
            __getTabsUl__: function (tabs) {
                return tabs.find(">." + this.css.container_head + " ." + this.css.head_middle + " ul");
            },
            __getNewTabId__: function (tabs) {
                var startIndex = tabs.children("." + this.css.container_content).length;
                var tabid = tabs.attr("id");
                function GetNewIndex(_tabs, _id, index) {
                    var newid = _id + "_item" + index;
                    if (_tabs.children("#" + newid).length) {
                        return GetNewIndex(_tabs, _id, index + 1);
                    }
                    else
                        return newid;
                }

                return GetNewIndex(tabs, tabid, startIndex);
            },
            __setTabliPosition__: function (tabs, type, tabUl) {
                tabUl = tabUl || this.__getTabsUl__(tabs);
                var prevTool = tabs.find(">." + this.css.container_head + " ." + this.css.head_left + " >div");
                var nextTool = tabs.find(">." + this.css.container_head + " ." + this.css.head_right + " >div");
                var tabmiddle = tabUl.parent();
                var tabmiddlewidth = tabmiddle.width();
                var nowScrollLeft = tabmiddle.scrollLeft();
                var lastLi = tabUl.children("li:last");
                var lastLiPosition = lastLi.position();
                if (isNaN(type)) {
                    //按照操作类型转到位置
                    var movevalue = tabmiddlewidth * this.css.tabmovevalue;
                    switch (type) {
                        case "left":
                            var newScrollLeft = nowScrollLeft - movevalue;
                            newScrollLeft = newScrollLeft < 0 ? 0 : newScrollLeft;
                            tabmiddle.scrollLeft(newScrollLeft);
                            break;
                        case "right":
                            var newScrollLeft = nowScrollLeft + movevalue;
                            if (lastLiPosition.left + lastLi.width() > tabmiddlewidth) {
                                tabmiddle.scrollLeft(newScrollLeft);
                            }
                            break;
                        default: break;
                    }
                }
                else if (type !== undefined) {
                    //按index转到tabli
                    //tabmiddle.scrollLeft(0);
                    //nowScrollLeft = 0;
                    var index = type;
                    var aimTabli = tabUl.children("li:eq(" + index + ")");
                    var aimTabWidth = aimTabli.outerWidth();
                    var aimTabliPosition = aimTabli.position();
                    var left = aimTabliPosition.left;
                    var newScrollLeft = undefined;
                    if (tabmiddlewidth < left + aimTabWidth) {
                        //隐藏在右侧
                        newScrollLeft = nowScrollLeft + (left + aimTabWidth - tabmiddlewidth);
                    }
                    if (tabmiddlewidth > left) {
                        if (left < 0) {
                            newScrollLeft = nowScrollLeft + left - this.css.toolswidth;
                        }
                    }
                    if (newScrollLeft)
                        tabmiddle.scrollLeft(newScrollLeft);
                }

                //设置prev按钮的可用
                if (tabmiddle.scrollLeft() == 0) {
                    prevTool.addClass(this.css.menudisabled);
                }
                else {
                    prevTool.removeClass(this.css.menudisabled);
                }

                //设置next按钮的可用
                lastLiPosition = lastLi.position();
                if (lastLiPosition.left + lastLi.outerWidth() <= tabmiddlewidth) {
                    nextTool.addClass(this.css.menudisabled);
                }
                else {
                    nextTool.removeClass(this.css.menudisabled);
                }

            }
        }
    })(jQuery);
};
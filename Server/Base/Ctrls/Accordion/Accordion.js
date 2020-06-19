HoteamUI.Control.OAccordion = {
    Create: function () {
        var self = this;
        var parentId = this.id;
        var id = this.id + "_Accordion";
        //设置参数
        var options = this.ControlInfo().CtrlOptions;
        var o = $.extend(true, {}, $.hoteamAccordion.defaults, options);
        var parent = $("#" + parentId);

        o.parentId = parentId;
        o.id = id;
        o.width = parent.width();

        //创建
        $.hoteamAccordion.create(o);
        //事件参数
        var handlers = this.ControlInfo().PageHandlers;
        var object = {};
        object.o = HoteamUI.Control.Instance(parentId);
        $.each(handlers, function (index, val) {
            if (val.HandlerName == "OnClick") {
                object.script = self.GetEventFunctionName("OnClick");
            }
            else if (val.HandlerName == "LastIconOnClick") {
                object.script2 = self.GetEventFunctionName("LastIconOnClick");

            }
            else if (val.HandlerName == "RemoveOnClick") {
                object.script3 = self.GetEventFunctionName("RemoveOnClick");
            }
        });

        $("#" + id).data("OAccordion", object);

        $.hoteamAccordion.resizeAccordion(id, o.width);
    },
    LoadItems: function (data) {
        var id = this.id + "_Accordion";
        var defaults = $("#" + id).data("defaults");
        $.hoteamAccordion.loadListItems(id, data);
    },
    Resize: function () {
        var id = this.id + "_Accordion",
            width = $("#" + this.id).width();

        $.hoteamAccordion.resizeAccordion(id, width);
    },
    Dispose: function () {
        var id = this.GetId();

        $(document).find("[data-belong='" + id + "']").remove();
    },
    GetId: function () {
        return this.id + "_Accordion";
    },
    HideSlideItems: function () {
        $.hoteamAccordion.hideSlideItems();
    },
    AddTopItem: function (item, index) {
        var id = this.id + "_Accordion",
            accordion = $("#" + id),
            children = accordion.children().children("[name='" + item.Name + "']"),
            $li;
        //判断是否已经添加
        if (children.length > 0) {
            return false;
        }
        $li = $.hoteamAccordion.createListItem(accordion, item, 1);
        accordion.find(">ul>.ui-accordion-header").eq(index).before($li);
        $.hoteamAccordion.bindItemEvent(accordion, id);
        return true;
    }
};


{
    (function ($) {
        $.hoteamAccordion = {
            defaults: {
                parentId: null,
                id: null,
                type: "standard",
                typeTransformThreshold: 60
            },
            defaultItem: {
                name: null,
                value: null,
                icon: null,
                text: null
            },
            newIndex: function () {
                var index = 0;
                return function () {
                    return ++index;
                }
            }(),
            create: function (options) {

                var o = $.extend({}, $.hoteamAccordion.defaults, options),
                    accordion,
                    parent,
                    className;

                if (o.width && o.width <= o.typeTransformThreshold) {
                    o.type = "slide";
                    className = "hoteam-accordion hoteam-accordion-slide hoteam-accordion-slide-scroll";
                }
                else {
                    className = "hoteam-accordion";
                }

                accordion = ['<div ', 'id="', o.id, '"', ' class="', className, '"  >', '</div>'].join("");
                parent = $("#" + o.parentId);
                parent.append($(accordion).data("accordion", o));
            },
            loadListItems: function (id, data) {
                if (data) {
                    //转换数据
                    data = this.analyseItems([], data);
                    var accordion = $("#" + id).empty();
                    var $ul = $("<ul></ul>");
                    var itemIndex = 0;
                    var level = 1;

                    for (var i = 0; i < data.length; i++) {
                        var $li = this.createListItem(accordion, data[i], level);
                        $ul.append($li);
                    }
                    accordion.append($ul);
                    this.initHandles(accordion, id);
                }
            },
            createListItem: function (accordion, item, level) {
                var iconStyle = '', iconClass = '', iconObvious = "";

                if (item.Icon) {
                    //如果有~，则是单独图片，否则则是class，代表的是雪碧图
                    if (item.Icon.indexOf("~") < 0) {

                        iconClass = HoteamUI.Common.GetImage(item.Icon, 16);
                        iconObvious = HoteamUI.Common.GetImage(item.Icon, 16, 2);
                    } else {
                        iconStyle = "style='background:url(" + item.Icon.replace("~", PageInit.WebRootPath) + ") center no-repeat'";
                    }
                }

                var li = '<li class="ui-accordion-header">' +
                                '<div class="ui-accordion-header-left"></div>' +
                                '<div class="ui-accordion-header-title">' +
                                    '<div class="ui-accordion-header-img">' +
                                        '<div class="ui-accordion-header-title-img ' + iconClass + '" ' + iconStyle + ' data-icon="' + (iconObvious || '') + '"></div>' +
                                    '</div>' +
                                    '<div class="ui-accordion-header-title-text">' + item.Text +
                                    '</div>' +
                                    (item.ShowMode === "CustomNav" ? '<span class="basesprite b-close-b hoteam-accordion-item-close" ></span>' : "") +
                                '</div>' +
                          '</li>';

                var $li = $(li);
                $li.data("opt", item);
                $li.attr("name", item.Name);
                $li.data("value", item.Value);
                //新增模式：slide
                $li.data("mode", item.ShowMode);
                $li.data("pageName", item.PageName);

                if (item.children && item.children.length > 0) {
                    $li.find("div.ui-accordion-header-title").append('<span class="ui-li-position basesprite b-angle-down"></span>');
                    this.loadChildItems(item.children, $li, accordion.data("accordion"), true, level);
                }

                return $li;
            },
            initHandles: function (accordion, id) {

                this.bindItemEvent(accordion, id);
                this.bindChlidItemEvent(accordion);
                this.bindTopItemEvent(accordion);
                this.bindItemLastIconEvent(accordion);
                this.bindDocumentEvent();
            },
            bindItemEvent: function (accordion, id) {
                //注册展开收缩及打开tab事件及收藏
                var self = this;
                accordion.find("li").unbind("click").on("click", function (e, params) {
                    //折叠、展开动画过程中点击无效
                    var animating = accordion.data('animating');
                    //存在params时认为是使用trigger方式通过代码触发
                    if (animating && !params) {
                        return;
                    }
                    var target = $(e.target),
                        elem = $(this);

                    //隐藏mode:slide 的popup侧滑窗口
                    $(".ui-accordion-content-slide-popup").hide();
                    var type = accordion.data("accordion").type;

                    ////判断点击的是否是收藏
                    if (target.hasClass("hoteam-accordion-collection")) {
                        var object = $("#" + id).data("OAccordion");
                        var li = elem;
                        var ctrlEvent = {};
                        ctrlEvent.o = object.o;
                        ctrlEvent.name = li.attr("name");
                        HoteamUI.Common.ExeFunction(object.script2, ctrlEvent);
                        //e.stopPropagation();
                        return false;
                    }

                    //判断点击的是否是移除按钮
                    if (target.hasClass("hoteam-accordion-item-close")) {
                        var object = $("#" + id).data("OAccordion");
                        var li = elem;
                        var ctrlEvent = {};
                        ctrlEvent.o = object.o;
                        ctrlEvent.name = li.attr("name");
                        HoteamUI.Common.ExeFunction(object.script3, ctrlEvent);
                        //e.stopPropagation();
                        target.closest(".ui-accordion-header").remove();
                        return false;
                    }

                    //关闭除了当前点击之外的同级目录
                    var brotherli = elem.parent().children("li").not(elem);
                    for (var i = 0; i < brotherli.length; i++) {
                        var cul = brotherli.eq(i).children("ul");
                        if (cul.css("display") == "block") {

                            accordion.data('animating', true);
                            $(cul).animate({
                                height: 'toggle'
                            }, function () {
                                accordion.data('animating', false);
                            });
                            brotherli.eq(i).children(".ui-accordion-header-title").children(".ui-li-position")
                                .removeClass("b-angle-up").addClass("b-angle-down");
                        }
                    }

                    var leftFlag = elem.children(".ui-accordion-header-left");
                    var img = elem.find('>.ui-accordion-header-title .ui-accordion-header-title-img');

                    img.addClass(img.attr('data-icon'));
                    elem.siblings("li").find('>.ui-accordion-header-title .ui-accordion-header-title-img').each(function () {
                        var elem = $(this);
                        elem.removeClass(elem.attr('data-icon'));
                    });


                    //如果点击的是一级菜单
                    if (leftFlag.length > 0) {
                        var lis = elem.parent().children();
                        $(lis).removeClass("ui-accordion-header-select-pre").removeClass("ui-accordion-header-select");
                        //$(lis).children(".ui-accordion-header-left").hide();
                        //$(this).children(".ui-accordion-header-left").show();
                        elem.prev().addClass("ui-accordion-header-select-pre");
                        elem.addClass("ui-accordion-header-select");
                    }

                    //关闭或打开当前点击的目录
                    var ul = elem.children("ul");

                    //存在下级节点
                    if (ul.length > 0) {

                        if (type === "slide") {

                            var slideHeight = accordion.parent().height(),
                                slideId = ul.attr("id") + "_slide",
                                slide = $("#" + slideId),
                                divideLineId = slideId + "_divideLine",
                                divideLine = $("#" + divideLineId),
                                parent = ul.parent(),
                                level = parseInt(ul.attr("data-level")),
                                levelCounter = level,
                                li = li || elem;

                            //选中项高亮
                            if (level && !isNaN(level)) {
                                ul.closest(".ui-accordion-content-slide").find(".hoteam-accordion-list-border-show").removeClass("hoteam-accordion-list-border-show");
                                li.find(">.hoteam-accordion-list").addClass("hoteam-accordion-list-border-show");
                                li.prev().find(">.hoteam-accordion-list").addClass("hoteam-accordion-list-border-show");
                            }
                            //隐藏下级导航
                            do {
                                var item = $(".ui-accordion-content-slide[data-level=" + levelCounter + "]");
                                if (item.length === 0) {
                                    break;
                                }
                                else {
                                    item.hide();
                                }
                            } while (++levelCounter);


                            //未创建下级导航
                            if (slide.length === 0) {
                                divideLine = $("<li class='ui-accordion-content-slide-divideLine' id='" + divideLineId + "'></li>");
                                slide = ul.clone(true).attr({
                                    "id": slideId,
                                    "data-belong": id
                                }).addClass("ui-accordion-content-slide").append(divideLine).appendTo("body").on("mouseenter", "li", function (event) {
                                    var elem = $(this),
                                        img = elem.find('>.ui-accordion-header-title .ui-accordion-header-title-img,>.hoteam-accordion-list .ui-accordion-header-title-img');

                                    img.addClass(img.attr('data-icon'));
                                }).on("mouseleave", "li", function (event) {
                                    var elem = $(this),
                                        img = elem.find('>.ui-accordion-header-title .ui-accordion-header-title-img,>.hoteam-accordion-list .ui-accordion-header-title-img');

                                    img.removeClass(img.attr('data-icon'));
                                });;

                            }
                            var accordionOffset = accordion.offset(),
                                currentItem = $(e.target);

                            //目标元素为图片时，重新定位容器
                            if (currentItem.hasClass("ui-accordion-header-title-img")) {
                                currentItem = currentItem.closest(".ui-accordion-header-title");
                            }

                            divideLine.css({ top: currentItem.offset().top - accordionOffset.top });
                            slide.find(".hoteam-accordion-list").removeClass("hoteam-accordion-list-border-show hoteam-accordion-list-select");
                            slide.css({
                                height: slideHeight,
                                top: accordionOffset.top,
                                left: parent.offset().left + parent.width() + 1,
                            }).show();

                        }
                        else {
                            //非下级菜单执行
                            if ($(e.target).closest(".ui-accordion-content").length === 0 ||
                               $(e.target).closest("li").find(".ui-accordion-content").length > 0) {
                                accordion.data('animating', true);
                                $(ul).animate({
                                    height: 'toggle'
                                }, function () {
                                    accordion.data('animating', false);
                                });
                                //改变箭头方向
                                var po = elem.children(".ui-accordion-header-title").children(".ui-li-position");
                                if (po.hasClass("b-angle-down")) {
                                    po.removeClass("b-angle-down").addClass("b-angle-up");
                                } else if (po.hasClass("b-angle-up")) {
                                    po.removeClass("b-angle-up").addClass("b-angle-down");
                                }
                            }
                        }

                    }
                    else {
                        //打开当前点击的功能
                        var object = $("#" + id).data("OAccordion"),
                            ctrlEvent = {},
                            me = elem,
                            slidePopupId = id + "_slidePopup",
                            slidePopup = $("#" + slidePopupId),
                            accordionOffset = accordion.offset(),
                            parent = $(e.target).closest(".Accordion");

                        ctrlEvent.o = object.o;
                        //value值
                        ctrlEvent.value = me.data("value");
                        ctrlEvent.text = me.text();
                        ctrlEvent.param = arguments[1];
                        ctrlEvent.mode = me.data("mode");
                        ctrlEvent.pageName = me.data("pageName");
                        ctrlEvent.opt = me.data("opt");
                        ctrlEvent.name = me.attr("name");

                        //slide侧滑窗口模式
                        if (ctrlEvent.mode === "Slide") {
                            if (slidePopup.length === 0) {
                                slidePopup = $("<div class='ui-accordion-content-slide-popup' [data-belong='" + id + "'] id='" + slidePopupId + "'></div>").appendTo("body");
                            }

                            self.hideSlideItems();
                            slidePopup.css({
                                height: accordion.parent().height(),
                                top: accordionOffset.top,
                                left: parent.offset().left + parent.width() + 1,
                            }).show();

                            HoteamUI.UIManager.Show(slidePopupId, ctrlEvent.pageName, ctrlEvent);
                            //e.stopPropagation();
                            return;
                        }
                        HoteamUI.Common.ExeFunction(object.script, ctrlEvent);

                        //添加点击样式,去除其余元素的点击样式
                        $(".hoteam-accordion-list").removeClass("hoteam-accordion-list-select");
                        $(this).children(".hoteam-accordion-list").addClass("hoteam-accordion-list-select");

                        if (type === "slide") {
                            self.hideSlideItems();
                        }
                    }

                    //e.stopPropagation();
                });
            },
            bindChlidItemEvent: function (accordion) {
                accordion.find(".ui-accordion-content").children("li").on("mouseenter", function (e) {
                    $(this).children(".hoteam-accordion-list").addClass("hoteam-accordion-list-hover");
                }).on("mouseleave", function (e) {
                    $(this).children(".hoteam-accordion-list").removeClass("hoteam-accordion-list-hover");
                });
            },
            bindTopItemEvent: function (accordion) {
                //添加一级导航悬浮效果
                accordion.children("ul").on("mouseenter", ">li", function (event) {

                    var elem = $(this);
                    elem.addClass("ui-accordion-header-hover");
                    //添加title
                    if (accordion.hasClass("hoteam-accordion-slide")) {
                        elem.attr("title", $(this).children(".ui-accordion-header-title").children(".ui-accordion-header-title-text").text());
                    }
                }).on("mouseleave", ">li", function (event) {

                    var elem = $(this);
                    elem.removeClass("ui-accordion-header-hover");
                    elem.removeAttr("title");
                });


                //导航项浮动动画
                accordion.children("ul").on("mouseenter", "li", function (event) {

                    var img = $(this).find('>.ui-accordion-header-title .ui-accordion-header-title-img,>.hoteam-accordion-list .ui-accordion-header-title-img');
                    img.addClass(img.attr('data-icon'));
                }).on("mouseleave", "li", function (event) {
                    var elem = $(this);
                    if (!elem.hasClass('ui-accordion-header-select')) {
                        var img = $(this).find('>.ui-accordion-header-title .ui-accordion-header-title-img,>.hoteam-accordion-list .ui-accordion-header-title-img');
                        img.removeClass(img.attr('data-icon'));
                    }
                });
            },
            bindItemLastIconEvent: function (accordion) {

                ////判断点击的是否是收藏
                //if (target.hasClass("hoteam-accordion-collection")) {
                //    //var object = $("#" + id).data("OAccordion");
                //    var object = accordion.data("OAccordion");
                //    var li = $(this);
                //    var ctrlEvent = {};
                //    ctrlEvent.o = object.o;
                //    ctrlEvent.name = li.attr("name");
                //    HoteamUI.Common.ExeFunction(object.script2, ctrlEvent);
                //    e.stopPropagation();
                //    return false;
                //}

                //收藏按钮鼠标悬浮
                accordion.find(".hoteam-accordion-collection").on({
                    "mouseenter": function () {
                        $(this).addClass("b-star").removeClass("b-star-o");
                    },
                    "mouseleave": function () {
                        $(this).addClass("b-star-o").removeClass("b-star");
                    }
                });
            },
            bindDocumentEvent: function () {
                var self = this;
                $(document).click(function (e) {
                    var target = $(e.target);

                    if (!target.hasClass("ui-accordion-content-slide-popup") &&
                        target.closest(".hoteam-accordion-slide").length === 0 &&
                        target.closest(".ui-accordion-content-slide").length === 0 &&
                         target.closest(".ui-accordion-content-slide-popup").length === 0) {

                        self.hideSlideItems();

                    }

                });
            },
            //加载二级及二级以下的目录，第四个参数为是否为2级目录（因为二级目录左侧有特殊样式）
            loadChildItems: function (data, liStr, accordion, isSecond, level) {

                var hiddenCollection = accordion.hiddenCollection,
                    id = accordion.id,
                    $ul = $("<ul class='ui-accordion-content' id='" + (id + "_ui-accordion-content" + this.newIndex()) + "' data-level='" + level + "'></ul>");

                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        var iconStyle = '',
                            iconClass = '',
                            item = data[i],
                            iconObvious = "";

                        if (item.Icon) {
                            //如果有~，则是单独图片，否则则是class，代表的是雪碧图
                            if (item.Icon.indexOf("~") < 0) {
                                iconClass = HoteamUI.Common.GetImage(item.Icon, 16);
                                iconObvious = HoteamUI.Common.GetImage(item.Icon, 16, 2);
                            } else {
                                iconStyle = "style='background:url(" + item.Icon.replace("~", PageInit.WebRootPath) + ") center no-repeat'";
                            }
                        }
                        var li = '<li><div class="hoteam-accordion-list">';
                        li += '<div class="liaccordion-left"></div>';
                        if (isSecond) {
                            //li += '<div class="liaccordion-left"></div>' 
                            li += '<div class="liaccordion-middle"><div class="liaccordion-middle-buck"></div></div>';
                        }
                        li += '<div class="ui-accordion-header-img">' +
                                '<div class="ui-accordion-header-title-img ' + iconClass + '" ' + iconStyle + ' data-icon="' + (iconObvious || "") + '"></div>' +
                             '</div>';

                        li += '<div class="liaccordion-right">' + item.Text + '</div>' +
                        '</div>' +
                        '</li>';

                        var $li = $(li);
                        if (item.children && item.children.length > 0) {
                            //如果还有下级
                            $li.attr("name", item.Name);
                            this.loadChildItems(item.children, $li, accordion, null, level + 1);
                        }
                        else {
                            //如果没有下级
                            $li.data("opt", item);
                            $li.attr("lastli", true);
                            $li.attr("name", item.Name);
                            $li.data("value", item.Value);
                            if (!hiddenCollection || hiddenCollection == "false") {
                                //如果配置为显示收藏图片
                                var addColletion = HoteamUI.Language.Lang("Accordion", "AddQuickMenu");
                                $li.find(".hoteam-accordion-list")
                                    .append('<span title="' + addColletion + '" class="hoteam-accordion-collection basesprite b-star-o"></span>');
                            }
                        }
                        $ul.append($li);
                        liStr.append($ul);
                    }
                }


            },
            analyseItems: function (items, data) {
                for (var index = 0; index < data.length; index++) {
                    var item = data[index];
                    var currentItem = {};
                    //设定值
                    //this.converItems(currentItem, item);
                    $.extend(currentItem, $.hoteamAccordion.defaultItem, item);
                    items.push(currentItem);
                    if (item.Children != null && item.Children.length > 0) {
                        items[index].children = [];
                        this.analyseItems(items[index].children, item.Children);
                    }
                }
                return items;
            },
            resizeAccordion: function (id, width) {

                var obj = $("#" + id),
                opt = obj.data("accordion"),
                self = this,
                containerHeight,
                itemsHeight,
                currentPager = 1,
                pagerCount;

                self.hideSlideItems();

                obj.find(">ul").css("margin-top", "0px").data("currentPager", currentPager);

                if (width && width <= opt.typeTransformThreshold) {
                    opt.type = "slide";

                    if (!obj.hasClass("hoteam-accordion-slide")) {
                        obj.addClass("hoteam-accordion-slide");
                    }

                    obj.find(".ui-accordion-header-title>.b-angle-up").removeClass('b-angle-up').addClass('b-angle-down');
                    obj.find(".ui-accordion-content").hide();

                    containerHeight = Math.floor((obj.height() - 40) / 41) * 41;
                    itemsHeight = obj.find(">ul").height();
                    pagerCount = Math.ceil(itemsHeight / containerHeight);

                    if (containerHeight < itemsHeight) {
                        obj.addClass("hoteam-accordion-slide-scroll");
                        //创建翻页按钮组
                        if (obj.find(".hoteam-accordion-slide-pre").length === 0) {

                            obj.append('<div class="hoteam-accordion-slide-pre " >' +
                                        '<span class="basesprite icon-arrow-pre disable" />' +
                                      '</div>' +
                                      '<div class="hoteam-accordion-slide-next" >' +
                                        '<span class="basesprite icon-arrow-next" />' +
                                      '</div>');
                            //绑定翻页事件
                            obj.find(".hoteam-accordion-slide-pre,.hoteam-accordion-slide-next").click(function () {

                                var self = $(this),
                                    preItem = obj.find(".hoteam-accordion-slide-pre"),
                                    nextItem = obj.find(".hoteam-accordion-slide-next"),
                                    items = self.siblings("ul"),
                                    currentPager = items.data("currentPager"),
                                    type = self.hasClass("hoteam-accordion-slide-pre") ? "pre" : "next",
                                    marginTop,
                                    marginTopOffset;

                                //首页或末页直接退出
                                if ((type === "pre" && currentPager === 1) || (type === "next" && currentPager === pagerCount)) {
                                    return;
                                }

                                //计算偏移量
                                marginTop = parseInt(items.css("margin-top"));
                                marginTopOffset = (type === "pre") ? containerHeight : -containerHeight;

                                items.css({ "margin-top": (marginTop + marginTopOffset) + "px" });

                                type === "pre" ? --currentPager : ++currentPager;
                                items.data("currentPager", currentPager)

                                if (currentPager === 1) {
                                    preItem.find(">span").addClass("disable");
                                }
                                if (currentPager === pagerCount) {
                                    nextItem.find(">span").addClass("disable");
                                }
                                if (currentPager > 1) {
                                    preItem.find(">span").removeClass("disable");
                                }
                                if (currentPager < pagerCount) {
                                    nextItem.find(">span").removeClass("disable");
                                }
                            });
                        }
                        else {
                            //重置
                            obj.find(".hoteam-accordion-slide-pre>span").addClass("disable");
                            obj.find(".hoteam-accordion-slide-next>span").removeClass("disable");
                        }

                    }
                    else {
                        obj.removeClass("hoteam-accordion-slide-scroll");
                        obj.find(">ul").css("margin-top", "0px");
                    }
                }
                else {
                    opt.type = "standard";
                    obj.removeClass("hoteam-accordion-slide hoteam-accordion-slide-scroll");
                }

                obj.data("accordion", opt);

            },
            initLastIcon: function (tree, treeNodes) {
                var quickMenu = HoteamUI.Language.Lang("Accordion", "AddQuickMenu");
                var title = " title='" + quickMenu + "' ";
                for (var i = 0; i < treeNodes.length; i++) {
                    var treeNode = treeNodes[i];
                    var isParent = treeNode.isParent;
                    if (isParent != true) {
                        var tId = treeNode.tId;
                        var a = $("#" + tId + "_a");
                        a.append("<span class=' ui-icon ui-icon-star hoteam-accordion-tree-lasticon '  " + title + "/>").hover(
                        function () {
                            $(this).find(".hoteam-accordion-tree-lasticon").css("display", "block");
                        },
                        function () {
                            $(this).parent().find(".hoteam-accordion-tree-lasticon").css("display", "none");
                        });
                        var lastIcon = a.find(".hoteam-accordion-tree-lasticon").click(function () {
                            var tId = $(this).parent().parent().attr("id");
                            var treeId = tree.attr("id");
                            var treeObj = $.fn.zTree.getZTreeObj(treeId);
                            var treeNode = treeObj.getNodeByTId(tId);
                            var object = {};
                            var ctrlEvent = {};
                            var id = treeId.split("_");
                            id = id[0] + "_" + id[1];
                            object = $("#" + id).data("OAccordion");
                            ctrlEvent.o = object.o;
                            ctrlEvent.value = treeNode.value;
                            ctrlEvent.text = treeNode.text;
                            ctrlEvent.name = treeNode.customName;
                            ctrlEvent.treeNode = treeNode;
                            ctrlEvent.treeId = treeId;
                            ctrlEvent.icon = treeNode.icon;
                            HoteamUI.Common.ExeFunction(object.script2, ctrlEvent);
                            return false;
                        });
                    }
                }
            },
            hideSlideItems: function () {

                $(document).find(".ui-accordion-content-slide,.ui-accordion-content-slide-popup").hide().
                    find(".hoteam-accordion-list-border-show").removeClass("hoteam-accordion-list-border-show");
            }
        }
    })(jQuery);
}
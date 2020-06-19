HoteamUI.Control.ORightMenu = {
    Create: function (options) {
        options = options || {};
        var me = this;
        var ctrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions;
        var menuItems = [];
        $.each(ctrlOptions, function (index, item) {
            if (index.indexOf("item") > 1) {
                menuItems.push(item);
            }
        });
        var o = {};
        o.parentId = this.id;
        o.id = me.GetId();
        o.items = menuItems;
        var handlers = (options.controlInfo || this.ControlInfo()).PageHandlers;
        o.callback = {};
        o.o = me;
        $.each(handlers, function (index, val) {
            if (val.HandlerName = "OnClick") {
                o.callback.onclick = me.GetEventFunctionName("OnClick");
            }
        });
        $.hoteamRightMenu.create(o);
    },
    GetId: function () {
        return this.id + "_RightMenu";
    },
    Show: function (x, y, objType) {
        var id = this.id + "_RightMenu",
            winHeight = $(window).height() - 30,
            winWidth = $(window).width(),
            ul = $("#" + id),
            ulC = ul.closest(".hoteam-rightmenu-c");
        ul.parent().css("max-height", $(window).height() - 30);
        //通过objType控制li的现实和隐藏
        ul.children("li").hide();
        if (!(objType instanceof Array)) {
            if (ul.children("li[objType='" + objType + "']").show().length == 0) {
                ul.children("li[objType='']").show();
            }
        } else {
            //获取数组中第一个objType的所有li
            var mlis = ul.children("li[multiMenu='Y'][objType='" + objType[0] + "']");
            var mjss = function (lis) {
                var arr = [];
                lis.each(function (i) {
                    arr.push($(this).attr("js"));
                });
                return arr;
            }(mlis);
            for (var i = 1; i < objType.length; i++) {
                var clis = ul.children("li[multiMenu='Y'][objType='" + objType[i] + "']");
                var cjss = function (lis) {
                    var arr = [];
                    lis.each(function (i) {
                        arr.push($(this).attr("js"));
                    });
                    return arr;
                }(clis);
                for (var j = mjss.length - 1; j >= 0 ; j--) {
                    if ($.inArray(mjss[j], cjss) == -1) {
                        mjss.splice(j, 1);
                        mlis.splice(j, 1);
                    }
                }
            }
            mlis.show();
        }
        ulC.show().find('.hoteam-rightMenu-more').hide();
        ulC.children("div").css({
            //"padding-bottom": "0px",
            "height": "auto"
        });
        var ulWidth = ulC.width(),
            bakX;
        if (x + ulWidth > winWidth) {
            bakX = x - ulWidth;
            ulC.css("left", bakX);
        } else {
            bakX = x;
            ulC.css("left", x);
        }
        var showLis = ul.children("li").not(":hidden");
        var ulHeight = showLis.outerHeight(true) * showLis.length;
        if (ulHeight + y < winHeight) {
            ulC.css({
                top: y
            });
        } else if (ulHeight <= winHeight) {
            ulC.css({
                top: winHeight - ulHeight
            });
        } else if (ulHeight > winHeight) {
            ulC.css("top", "0px");
            var moreLi = ulC.find('.hoteam-rightMenu-more');
            ulC.children("div").css({
                "padding-bottom": "17px",
                "height": "99999px"
            });
            if (moreLi.length == 0) {
                ulC.children().append(
                    '<div class="hoteam-rightMenu-more">' +
                        '<div><span class="basesprite b-blue-angle-up"></span></div>' +
                        '<div><span class="basesprite b-blue-angle-down"></span></div>' +
                    '</div>');
                moreLi = ulC.find('.hoteam-rightMenu-more');
                moreLi.on("click", ">div", function () {
                    if ($(this).index() == 0) {
                        var top = ul.scrollTop();
                        ul.scrollTop(top - 200);
                    } else {
                        var top = ul.scrollTop();
                        ul.scrollTop(top + 200);
                    }
                });
            }
            moreLi.show();
        }
    },
    LoadItems: function (data, objType, menuName) {
        var id = this.GetId();
        $.hoteamRightMenu.loadMenuForServer(id, objType, data, menuName);
    },
    Dispose: function () {
        var id = this.id + "_RightMenu";
        $("#" + id).closest(".hoteam-rightmenu-c").remove();
        $("[id^='" + id + "']").remove();
    },
    RemoveAllItems: function () {
        var id = this.id + "_RightMenu";
        $("#" + id).empty();
    }
};

{
    (function ($) {
        $.hoteamRightMenu = {
            css: {
                RightMenuC: "hoteam-rightmenu-c",
                RightMenu: "hoteam-rightmenu",
                RightMenuChildren: "hoteam-rightmenuchildren",
                RightMenuGrandSon: "hoteam-rightmenugrandson",
                HasChildrenMenu: "hoteam-rightmenu-haschildrenIco",
                RightMenu_a: "hoteam-menu-text",
                RightMenu_icon: "ui-icon"
            },
            defaultItem: {
                text: null,
                textId: null,
                TextId: null,
                value: null,
                icon: null,
                js: null,
                children: null
            },
            create: function (o) {
                var menu =
                    '<div class="' + this.css.RightMenuC + '">' +
                        '<div>' +
                            '<ul id="' + o.id + '" class="' + this.css.RightMenu + '"></ul>' +
                        '</div>' +
                    '</div>';
                $("body").append(menu);
                var ul = $('#' + o.id);
                ul.data("o", o);
                this.initHanlder(ul);
            },
            loadMenuForServer: function (id, objType, data, menuName) {
                if (data) {
                    var ul = $("#" + id);
                    var items = this._analyseItems(data, objType);
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        if (item.CtrlType === 'Line') {
                            ul.find('li:last').addClass('hoteam-rightmenu-item-line');
                            continue;
                        }
                        ul.append(this._returnItemsHtml(objType, item, menuName));
                    }
                }
            },
            _returnItemsHtml: function (objType, item, menuName) {
                item = $.extend(false, this.defaultItem, item);
                var itemChildren = item.children;
                var text;
                if (item.textId) {
                    if (item.textId.indexOf('.') == -1) {
                        var textId = menuName + "." + item.textId;
                        text = HoteamUI.Language.Lang(textId);
                    } else {
                        text = HoteamUI.Language.Lang(item.textId);
                    }
                } else {
                    text = item.text;
                }
                var js = "";
                if (item.js) {
                    js = item.js.replace(/\'/g, "\"");
                }
                var iconClass = '',
                        iconStyle = '',
                        iconAttr = '';
                if (item.icon) {
                    if (item.icon.indexOf("~") < 0) {//如果有~，则是单独图片，否则则是class，代表的是雪碧图
                        iconClass = HoteamUI.Common.GetImage(item.icon, 16);
                        iconAttr = item.icon;
                    } else {
                        iconStyle = 'style="background:url(' + item.icon.replace("~", PageInit.WebRootPath) + ') no-repeat"';
                    }
                }
                var rightAngle = '';
                if (itemChildren && itemChildren.length > 0) {
                    rightAngle = '<span class="' + this.css.HasChildrenMenu + ' ui-icon basesprite b-angle-right"></span>';
                }
                var multiMenu = '';
                if (item.multiMenu) {
                    multiMenu = ' multiMenu="Y"';
                }
                var addMenuStr = $(
                    '<li menuName="' + menuName + '" objType="' + objType + '" icon="' + iconAttr + '" val="' + item.value + '" js="' + js + '" textId="' + item.textId + '" ' + multiMenu + '>' +
                        '<a class="' + this.css.RightMenu_a + '">' +
                            '<span ' + iconStyle + ' class="' + this.css.RightMenu_icon + " " + iconClass + '"></span>' +
                            text +
                        '</a>' +
                        rightAngle +
                    '</li>');
                if (itemChildren && itemChildren.length > 0) addMenuStr.data("child", itemChildren)
                return addMenuStr;
            },
            initHanlder: function (ul) {
                var me = this;
                ul.on("mouseenter", ">li", function (e) {
                    var li = $(this);
                    if (li.children(".hoteam-rightmenu-haschildrenIco").length > 0) {
                        me.loadChildItems(li);
                    }
                }).on("mouseleave", ">li", function () {
                    var li = $(this);
                    if (li.children(".hoteam-rightmenu-haschildrenIco").length > 0) {
                        me.hideChildItems(li);
                    }
                }).on("click", ">li", function () {
                    var li = $(this);
                    var par = li.parent();
                    var o = par.data("o");
                    var node = par.data("treenode");
                    var menuName = li.attr("menuName");
                    var ctrlEvent = {
                        o: o.o,
                        value: li.attr("val"),
                        textId: li.attr("textId"),
                        menuType: "rightmenu",
                        menuName: menuName,
                        node: node
                    };
                    var js = li.attr("js");
                    if (js) {
                        (typeof window[js] === "function") ? window[js](ctrlEvent) : eval(js);
                        $(".hoteam-rightmenu-c").hide();
                        $(".hoteam-rightmenuchildren").hide();
                        $(".hoteam-rightmenugrandson").hide();
                    }
                }).on("mousedown", function () {
                    return false;
                }).on("mousewheel", function (e) {
                    var distance = e.originalEvent.wheelDelta;
                    var top = $(this).scrollTop();
                    var pos = top - distance;
                    $(this).scrollTop(pos);
                });

                ul.closest('.hoteam-rightmenu-c').on('contextmenu', function (e) {
                    return false;
                })
            },
            loadChildItems: function (li) {
                var me = this,
                    items = li.data("child"),
                    objType = li.attr("objType"),
                    par = li.parent(),
                    parId = par.attr("id"),
                    menuName = li.attr("menuName"),
                    index = li.index();
                var childUl = $("#" + parId + "child" + index);
                if (childUl.length == 0) {
                    var ul = $('<ul id="' + parId + "child" + index + '" class="' + this.css.RightMenuChildren + '" parId="' + parId + '"></ul>');
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        if (item.CtrlType === 'Line') {
                            ul.find('li:last').addClass('hoteam-rightmenu-item-line');
                            //continue;
                        }
                        ul.append(this._returnItemsHtml(objType, item, menuName));
                    }
                    $("body").append(ul);
                    childUl = $("#" + parId + "child" + index);
                    me.initChildHanlder(childUl, menuName);
                }
                childUl.show();
                var winHeight = $(window).height(),
                    winWidth = $(window).width(),
                    offset = li.offset(),
                    liWidth = li.width(),
                    ulHeight = childUl.height(),
                    ulWidth = childUl.width();
                if (liWidth + offset.left + ulWidth > winWidth) {
                    childUl.css("left", offset.left - ulWidth).attr("r", "left");
                } else {
                    childUl.css("left", liWidth + offset.left).attr("r", "right");
                }
                if (offset.top + ulHeight > winHeight) {
                    childUl.css("top", winHeight - ulHeight);
                } else {
                    childUl.css("top", offset.top);
                }
            },
            hideChildItems: function (li) {
                var par = li.parent(),
                    parId = par.attr("id"),
                    index = li.index();
                $("#" + parId + "child" + index).hide();
            },
            initChildHanlder: function (ul, menuName) {
                var me = this;
                ul.on("mouseleave", function () {
                    $(this).hide();
                }).on("mouseenter", ">li", function (e) {
                    var li = $(this);
                    li.parent().show();
                    if (li.children(".hoteam-rightmenu-haschildrenIco").length > 0) {
                        me.loadGrandSonItems(li, menuName);
                    }
                }).on("mouseleave", ">li", function () {
                    var li = $(this);
                    if (li.children(".hoteam-rightmenu-haschildrenIco").length > 0) {
                        me.hideGrandSonItems(li, menuName);
                    }
                }).on("click", ">li", function () {
                    var li = $(this);
                    var par = li.closest(".hoteam-rightmenuchildren");
                    var parId = par.attr("parId");
                    var parUI = $("#" + parId);
                    var menuName = li.attr("menuName");
                    var o = parUI.data("o");
                    var ctrlEvent = {
                        o: o.o,
                        value: li.attr("val"),
                        textId: li.attr("textId"),
                        menuType: "rightmenu",
                        menuName: menuName
                    };
                    var js = li.attr("js");
                    if (js) {
                        (typeof window[js] === "function") ? window[js](ctrlEvent) : eval(js);
                        $(".hoteam-rightmenu-c").hide();
                        $(".hoteam-rightmenuchildren").hide();
                        $(".hoteam-rightmenugrandson").hide();
                    }
                }).on("mousedown", function () {
                    return false;
                });
            },
            loadGrandSonItems: function (li, menuName) {
                var me = this,
                    items = li.data("child"),
                    objType = li.attr("objType");
                var childUl = li.children("ul");
                if (childUl.length == 0) {
                    var ul = $('<ul class="' + this.css.RightMenuGrandSon + '"></ul>');
                    for (var i = 0; i < items.length; i++) {
                        ul.append(this._returnItemsHtml(objType, items[i], menuName));
                    }
                    li.append(ul);
                    childUl = li.children("ul");
                    me.initChildHanlder(childUl, menuName);
                }
                childUl.show();
                var winHeight = $(window).height(),
                    winWidth = $(window).width(),
                    par = li.parent(),
                    r = par.attr("r"),
                    offset = li.offset(),
                    liWidth = li.width(),
                    ulHeight = childUl.height(),
                    ulWidth = childUl.width();
                if (r == "right") {
                    if (liWidth + offset.left + ulWidth > winWidth) {
                        childUl.css("left", -ulWidth).attr("r", "left");
                    } else {
                        childUl.css("left", liWidth).attr("r", "right");
                    }
                } else {
                    if (offset.left < ulWidth) {
                        childUl.css("left", liWidth).attr("r", "right");
                    } else {
                        childUl.css("left", -ulWidth).attr("r", "left");
                    }
                }
                if (offset.top + ulHeight > winHeight) {
                    childUl.css("top", winHeight - offset.top - ulHeight);
                } else {
                    childUl.css("top", 0);
                }
            },
            hideGrandSonItems: function (li) {
                li.children("ul").hide();
            },
            _analyseItems: function (data, objType) {
                var items = [];
                //for (var index in data) {
                for (var index = 0; index < data.length; index++) {
                    var item = data[index];
                    var currentItem = {};
                    //设定值
                    this.converItems(currentItem, item, objType);
                    items.push(currentItem);
                    if (item.Children != null && item.Children.length > 0) {
                        items[index].children = this._analyseItems(item.Children)
                    }
                }
                return items;
            },
            converItems: function (clientItem, serverItem, objType) {
                $.extend(clientItem, serverItem);
                clientItem.text = serverItem.Text;
                clientItem.textId = serverItem.TextId;
                clientItem.multiMenu = serverItem.MultiMenu;
                if (!objType) clientItem.multiMenu = true;
                clientItem.value = serverItem.Value;
                clientItem.icon = serverItem.Icon;
                clientItem.js = serverItem.Script;
            }
        }
    })(jQuery);
}
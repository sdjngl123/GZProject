HoteamUI.Control.OMenu = {
    Create: function (options) {
        options = options || {};
        var self = this;
        var parentId = this.id;
        var id = this.id + "_Menu";
        //设置参数
        var CtrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions;
        //获取菜单列表信息
        var menuItems = [];
        $.each(CtrlOptions, function (index, item) {
            if (index.indexOf("item") > -1) {
                menuItems.push(item);
            }
        });
        var o = {};
        o.parentId = parentId;
        o.id = id;
        o.items = menuItems;
        o.issplit = CtrlOptions.issplit === undefined ? false : CtrlOptions.issplit;
        o.type = CtrlOptions.type;
        //事件参数
        var handlers = (options.controlInfo || this.ControlInfo()).PageHandlers;
        var object = {};
        object.o = HoteamUI.Control.Instance(parentId);
        $.each(handlers, function (index, val) {
            if (val.HandlerName == "OnClick") {
                object.onclick = self.GetEventFunctionName("OnClick");
            }
        });
        o.OMenu = object;
        //创建
        $.hoteamMenu.create(o);
    },
    LoadItems: function (data, type, issplit) {
        var id = this.id + "_Menu",
            opt = $("#" + id).data("opt");
        opt.type = (type ? type : opt.type).toLowerCase();
        opt.issplit = issplit;
        $("#" + id).empty();
        $.hoteamMenu.loadMenu(id, data, opt);
    },
    //菜单中有下拉，此方法是重置下拉的数据源。which是创建下拉的时候的value。
    ReloadSelectData: function (which, data) {
        $.hoteamMenu.reloadSelectData(this.id + "_Menu", which, data);
    },
    Resize: function () {
        //重新加载menu
        var id = this.id + "_Menu",
            opt = $("#" + id).data("opt");
        $("body").children().filter("[id^='" + id + "']").remove();
        $("#" + id).children(".ui-menu-item").remove();
        var arr = [];
        //for (var i in opt.items) {
        for (var i = 0; i < opt.items.length; i++) {
            if (opt.items[i].CtrlType != "DropDownList") {
                arr.push(opt.items[i]);
            }
        }
        $.hoteamMenu.loadMenu(id, arr, opt);
        $.hoteamMenu.resize(id);
    },
    Dispose: function () {
        var id = this.id + "_Menu";
        $("body").children().filter("[id^='" + id + "']").remove();
        //清理下拉控件的冗余元素
        var sels = $("#" + id).find(".form-control");
        for (var i = 0; i < sels.length; i++) {
            $("#" + $(sels[i]).attr("bomenuid")).remove();
        }
    }
};


{
    (function ($) {
        $.hoteamMenu = {
            defaults: {
                parentId: null,
                id: null,
                items: null,
                type: "button",//默认是只显示图片模式，还有另外一个模式：button（显示文字和图片，类似按钮）
                OMenu: {
                    onclick: null
                }
            },
            create: function (options) {
                var o = $.extend(true, {}, $.hoteamMenu.defaults, options);
                var menu = '<ul id="' + o.id + '"  class="hoteam-menu"></ul>';
                var parent = $("#" + o.parentId);
                if (o.autofit) {
                    parent.css("height", 30);
                }
                parent.append(menu);
                menu = $("#" + o.id).data("OMenu", o.OMenu).data("opt", o);

                var items = o.items;
                //加载菜单项
                this.loadMenu(o.id, items, o);

                this.initHanlder(o.id, o);
            },
            //加载第一级菜单
            loadMenu: function (id, items, opt) {
                var self = this,
                    disabled = false,
                    type = opt.type;
                opt.items = items;
                if (type == "single" || opt.isSingle) {
                    opt.type = "button";
                    opt.isSingle = true;
                    //调整为始终显示
                    //if (items.length == 0) {
                    //    return;
                    //}
                    if (!opt.items || opt.items.length === 0) {
                        disabled = true;
                    }
                    items = [{ icon: "p_more", textId: "Menu.Menu", children: items, disabled: disabled }];
                }
                if (type == "image") {
                    opt.issplit = true;
                }
                if (items.length == 0) {
                    return;
                }
                var $menu = $("#" + id);
                if (opt.issplit == false) {
                    $menu.addClass("hoteam-menu-group");
                } else {
                    $menu.removeClass("hoteam-menu-group");
                }
                $("body").children().filter("[id^='" + id + "']").remove();
                var ctrlEvent = {};
                var obj = $menu.data("OMenu").o;
                ctrlEvent.o = obj;

                for (var i = 0; i < items.length; i++) {
                    var item = items[i], children = self.converItems(items[i].children || items[i].Children),
                        iconClass = '', iconStyle = '', iconAttr = '',
                        icon = item.icon || item.Icon, caret = '',
                        sptext = '', aclass = '', title = '',
                        js = item.js || item.Script || "";
                    if (item.MenuSize)
                        item.Width = item.MenuSize;
                    js = js.replace(/\'/g, "\"");
                    if (item.CtrlType && item.CtrlType == "DropDownList")//如果是下拉菜单
                    {
                        this.createDropdownListItem(item, i, $menu, id, ctrlEvent);
                        continue;
                    }
                    if (icon) {
                        if (icon.indexOf("~") < 0) {
                            //是雪碧图，不是单独图片
                            iconClass = HoteamUI.Common.GetImage(icon, 16);
                            iconAttr = icon;
                        } else {
                            iconStyle = 'style="background:url(' + icon.replace("~", PageInit.WebRootPath) + ') center no-repeat"';
                        }
                    }
                    var imgspan = '<span icon="' + iconAttr + '" class="hoteam-menu-icon ' + iconClass + '" ' + iconStyle + ' data-icon="' + icon + '"  ' + ' ></span>',
                        isParent = 'false';
                    if (children && children.length > 0) {//如果有子菜单
                        caret = '<span class="basesprite b-caret-down"></span>';
                        isParent = 'true';
                    }
                    sptext = (item.Text || item.text || HoteamUI.Language.Lang(item.textId || item.TextId));
                    //如果是button模式
                    if (type == "image") {
                        aclass = 'hoteam-menu-img';
                        title = ' title="' + sptext + '" ';
                    }
                    var other = "val='" + (item.value || item.Value) + "' " + " js='" + js + "' "
                            + " textId='" + (item.textId || item.TextId) + "' ";
                    li = '<li class="ui-menu-item" ' + other + '><a class="hoteam-menu-text ' + aclass + '"' + title + (item.disabled ? "disabled" : "") + '>'
                            + imgspan
                            + '<span class="hoteam-menu-text-sp">' + sptext + '</span>'
                            + caret
                            + '</a></li>';
                    $menu.append($(li).data("item", item).attr("isParent", isParent));
                }
                $menu.children("li.ui-menu-item:first").addClass("ui-menu-item-first");
                $menu.children("li.ui-menu-item:last").addClass("ui-menu-item-last");
                this.resize(id);
            },
            //创建下拉控件的方法
            createDropdownListItem: function (item, itemIndex, $menu, id, ctrlEvent) {
                var js = (item.js || item.Script || "").replace(/\'/g, "\""),
                    removejs = (item.DropDownItemRemoveJs || "").replace(/\'/g, "\""),
                     buttonjs = (item.DropDownItemButtonJs || "").replace(/\'/g, "\""),
                    otherattr = 'js="' + js + '" buttonjs="' + buttonjs + '" removejs="' + removejs + '" name="' + (item.value || item.Value) + '" textId="' + (item.textId || item.TextId) + '"',
                    html;

                html = '<li class="ui-menu-sleitem">' +
                    (item.Width == "0" ? '<div class="input-group"' + (' style="display:none" ') + '>' :
                    '<div class="input-group"' + (item.Width ? (' style="width:' + item.Width + 'px"') : "") + '>') +
                       (item.Text ? ('<label >' + item.Text + '</label>') : "") +
                        '<input ' + otherattr + ' type="text" id="' + id + "sel" + itemIndex + '"' +
                        'class="form-control input-sm readonly" autocomplete="off" readonly>' +
                        '<div class="input-group-btn">' +
                            '<div  class="btn btn-default dropdown-toggle btn-sm" data-toggle="dropdown">' +
                                '<span class="caret"></span>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                 '</li>';
                $menu.append($(html));
                var selData,
                    flag = true;
                selData = (typeof window[item.LoadMenuCtrlData] === "function") ? window[item.LoadMenuCtrlData](ctrlEvent, item) : eval(item.LoadMenuCtrlData);

                for (var k = 0; k < selData.length; k++) {
                    if (selData[k].Selected || selData[k].selected) {
                        flag = false;
                    }
                }
                if (flag) {
                    selData[0].Selected = true;
                }
                $("#" + id + "sel" + itemIndex).bsSuggest({ "data": selData });
                //change事件
                $("#" + id + "sel" + itemIndex).on("change", { o: ctrlEvent }, function (e) {
                    var js = $(this).attr("js");
                    if (js) {
                        var ctrlEvent = e.data.o;
                        ctrlEvent.DropDownListValue = $(this).attr("data-val");
                        ctrlEvent.value = $(this).attr("name");
                        ctrlEvent.textId = $(this).attr("textId");
                        (typeof window[js] === "function") ? window[js](ctrlEvent) : eval(js);
                    }
                }).on("removeClick", { o: ctrlEvent }, function (e) {

                    var js = $(this).attr("removejs");
                    if (js) {
                        var ctrlEvent = e.data.o;
                        ctrlEvent.value = $(this).attr("name");
                        ctrlEvent.textId = $(this).attr("textId");
                        ctrlEvent.objectId = arguments[1].objectId;
                        ctrlEvent.removeData = arguments[1].value;
                        (typeof window[js] === "function") ? window[js](ctrlEvent) : eval(js);
                    }
                }).on("btnClick", { o: ctrlEvent }, function (e) {

                    var js = $(this).attr("buttonjs");
                    if (js) {
                        var ctrlEvent = e.data.o;
                        ctrlEvent.value = $(this).attr("name");
                        ctrlEvent.textId = $(this).attr("textId");
                        ctrlEvent.objectId = arguments[1].objectId;
                        ctrlEvent.Data = arguments[1].value;
                        (typeof window[js] === "function") ? window[js](ctrlEvent) : eval(js);
                    }
                });

            },
            reloadSelectData: function (id, which, data) {
                $("#" + id).find("input[name='" + which + "']").bsSuggest({ "data": data });
            },
            //给一级菜单绑定事件
            initHanlder: function (id, opt) {
                var me = this;
                var $menu = $("#" + id);
                var object = $menu.data("OMenu");

                $menu.on("mouseenter", ">li", { o: object }, function (e) {
                
                    var elem = $(this);
                    if (elem.hasClass("ui-menu-sleitem")) {
                        return;
                    }
                    var item = elem.data("item");
                    var children = me.converItems(item.children || item.Children);
                    if (!(children.length > 0)) {
                        return;
                    }
                    var ulid = id + "_menu" + elem.index();
                    me.loadPopItems(ulid, children, e.data.o);
                    var pos = elem.offset();
                    //先判断要打开的下拉是否能在右侧展开
                    var ulc = $("#" + ulid).show();
                    var ul = ulc.children().children("ul.hoteam-menu-item");
                    var width = ul.outerWidth();
                    ul.css("width", width + "px");
                    var height = ul.children("li").length * 30;
                    var top = pos.top + parseInt(elem.outerHeight());
                    var winHeight = $(window).height();
                    var winWidth = $(window).width();
                    if (pos.left - 3 + width > winWidth) {//超出了
                        ulc.css("left", pos.left - width + elem.width()).css("top", top);
                    } else {
                        ulc.css("left", pos.left).css("top", top);
                    }
                    if (height + 25 + top > winHeight) {//25是底部预留高度，使窗口不会触底
                        //如果高度不够，则需要将过多的li隐藏起来一部分，使之不会超长
                        //计算需要多少个展示的li正好够高度
                        var num = parseInt((winHeight - top - 25) / 30);
                        //将ul中num序号之后的li都隐藏
                        ul.children().each(function (i) {
                            if (i + 1 > num) {
                                $(this).hide();
                            } else {
                                $(this).show();
                            }
                        });
                        ulc.children().css({ "padding-bottom": "17px" }).find(".hoteam-menu-more").show();
                        var cloneUI = ulc.find(".hoteam-menu-clone");
                        if (cloneUI.length == 0) {
                            cloneUI = ul.clone().addClass("hoteam-menu-clone").removeClass("hoteam-menu-item");
                            var ulPos = ul.offset();

                            ulc.children().append(cloneUI);
                        }
                        cloneUI.scrollTop(0).css({ height: ul.outerHeight() + "px" }).children().show();;
                    } else {
                        ul.children().show();
                        ulc.children().css({ "padding-bottom": "0px" }).find(".hoteam-menu-more").hide();
                    }
                    if (opt.type == "image") {
                        elem.attr("title", elem.children().children(".hoteam-menu-text-sp").text());
                    }
                    var image = elem.children().children(".hoteam-menu-icon"),
                        icon = image.attr("icon");
                    if (icon) {
                        image.addClass(HoteamUI.Common.GetImage(icon, 16, 2));
                    }
                    HoteamUI.OCX.ShowMask(ulc);
                    HoteamUI.Common.OCXIframe.Show();
                }).on("mouseleave", ">li", function (e) {
                   
                    var id = $(this).parent().attr("id") + "_menu" + $(this).index();
                    var ul = $("#" + id);
                    setTimeout(function () {
                        if (!ul.attr("show")) {
                            $("#" + id).hide();
                            HoteamUI.OCX.HideMask();
                            HoteamUI.Common.OCXIframe.Hide();
                        }
                    });
                    $(this).removeAttr("title");
                    var image = $(this).children().children(".hoteam-menu-icon"),
                        icon = image.attr("icon");
                    if (icon) {
                        image.removeClass(HoteamUI.Common.GetImage(icon, 16, 2));
                    }
                }).on("click", ">li", function () {
                    var js = $(this).attr("js"),
                        textId = $(this).attr("textId"),
                        isParent = $(this).attr("isParent");
                    if (isParent == "true") return;
                    var value = $(this).attr("val"),
                        object = $(this).closest(".hoteam-menu").data("OMenu"),
                        ctrlEvent = {};
                    ctrlEvent.o = object.o;
                    ctrlEvent.value = value;
                    ctrlEvent.textId = textId;
                    if (js) {
                        eval(js);
                    } else {
                        HoteamUI.Common.ExeFunction(object.onclick, ctrlEvent);
                    }
                });
            },
            loadPopItems: function (ulid, items, OMenuEvent) {
                var me = this;
                var children = items;
                if (children && children.length > 0) {
                    if ($("#" + ulid).size() == 0) {
                        var $ul = $('<div class="hoteam-menu-c" id="' + ulid + '" >' +
                                        '<div>' +
                                            '<ul class="hoteam-menu-item"></ul>' +
                                            '<div class="hoteam-menu-more">' +
                                                '<div><span class="basesprite b-blue-angle-up"></span></div>' +
                                                '<div><span class="basesprite b-blue-angle-down"></span></div>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>');
                        for (var i = 0; i < children.length; i++) {
                            var item = children[i],
                                childrenItem = me.converItems(item.children || item.Children),
                                iconClass = '', iconStyle = '',
                                icon = item.icon || item.Icon, caret = '';

                            if (item.CtrlType === 'Line') {
                                $ul.find('ul>li:last').addClass('hoteam-menu-item-li-line');
                                continue;
                            }
                            if (icon) {
                                if (icon.indexOf("~") < 0) {
                                    //是雪碧图，不是单独图片
                                    iconClass = HoteamUI.Common.GetImage(icon, 16);
                                } else {
                                    iconStyle = 'style="background:url(' + icon.replace("~", PageInit.WebRootPath) + ') center no-repeat"';
                                }
                            }
                            var imgspan = '<span class="hoteam-menu-item-icon ' + iconClass + '" ' + iconStyle + ' ></span>',
                                isParent = 'false';
                            if (childrenItem && childrenItem.length > 0) {
                                //如果有子菜单
                                caret = '<span class="basesprite b-caret-right"></span>';
                                isParent = "true";
                            }
                            var js = item.js || item.Script || "";
                            js = js.replace(/\'/g, "\"");
                            var other = "val='" + (item.value || item.Value) + "' " + " js='" + js + "' "
                                    + " textId='" + (item.textId || item.TextId) + "' ";
                            li = '<li class="hoteam-menu-item-li" ' + other + '><a class="hoteam-menu-item-text">'
                                    + imgspan
                                    + '<span class="hoteam-menu-text-sp">' + (item.Text || item.text || HoteamUI.Language.Lang(item.textId || item.TextId)) + '</span>'
                                    + caret
                                    + '</a></li>';

                            $ul.find('ul').append($(li).data("children", childrenItem).attr("isParent", isParent));
                        }
                        me.bindPopItemsEvent($ul, OMenuEvent);
                        $("body").append($ul);
                    }
                }
            },
            bindPopItemsEvent: function ($ul, OMenuEvent) {
                var me = this;
                $ul.on("mouseover", function () {
                    //注册enter事件
                    $(this).attr("show", "true").show();
                }).on("mouseleave", function () {
                    //注册leave事件
                    $(this).hide().removeAttr("show");
                    HoteamUI.OCX.HideMask();
                    HoteamUI.Common.OCXIframe.Hide();
                });

                $ul.on("mouseenter", '.hoteam-menu-item>li', function (e) {
                    var elem = $(this);
                    var newulid = elem.closest(".hoteam-menu-c").attr("id") + elem.index();
                    me.loadChildItem(newulid, elem, OMenuEvent);
                    me.showChildItem(newulid, elem);
                }).on("mouseleave", "li", function () {
                    $(this).children("ul").hide();
                }).on("click", ".hoteam-menu-item>li", function (e) {
                    if ($(this).attr("isParent") == "true") {
                        return;
                    }
                    me.hideItem($(this));
                    HoteamUI.Common.OCXIframe.Hide();
                    var object = OMenuEvent;
                    var js = $(this).attr("js"),
                        textId = $(this).attr("textId"),
                        value = $(this).attr("val"),
                        ctrlEvent = {};
                    ctrlEvent.o = object.o;
                    ctrlEvent.value = value;
                    ctrlEvent.textId = textId;
                    setTimeout(function () {
                        if (js) {
                            eval(js);
                        } else {
                            HoteamUI.Common.ExeFunction(object.onclick, ctrlEvent);
                        }
                    }, 1);
                }).on("click", ".hoteam-menu-more>div", function () {
                    var sul = $(this).parent().next();
                    var itemheight = sul[0].offsetHeight;
                    if ($(this).index() == 0) {
                        var top = sul.scrollTop();
                        sul.scrollTop(top - itemheight);
                    } else {
                        var top = sul.scrollTop();
                        sul.scrollTop(top + itemheight);
                    }
                    //operateLi(sul.scrollTop(), $(this).parent().prev());
                }).on("mousewheel", "ul.hoteam-menu-clone", function (e) {
                    //var distance = e.originalEvent.wheelDelta;
                    var distance = ((e.deltaY > 0) ? 1 : -1) * 120;
                    //滚动的距离必须是li高度的整数倍
                    var cdis = distance + distance % 30;
                    var top = $(this).scrollTop();
                    $(this).scrollTop(top - cdis);
                    //底部被覆盖的ul里面li控制隐藏和展示
                    operateLi($(this).scrollTop(), $(this).prevAll("ul"));
                }).on("mouseenter", "ul.hoteam-menu-clone li", function () {
                    var ele = $(this);
                    var index = ele.index();
                    var ul = ele.parent().prevAll("ul");
                    var newulid = ul.closest(".hoteam-menu-c").attr("id") + index;
                    var li = ul.children(":eq(" + index + ")");
                    me.loadChildItem(newulid, li, OMenuEvent);
                    me.showChildItem(newulid, li);
                }).on("mouseleave", "ul.hoteam-menu-clone li", function () {
                    var ele = $(this);
                    var index = ele.index();
                    var ul = ele.parent().prevAll("ul");
                    ul.children(":eq(" + index + ")").children('ul').hide();
                }).on("click", "ul.hoteam-menu-clone li", function () {
                    var ele = $(this).parent().prevAll('ul').children(':eq(' + $(this).index() + ')');
                    if (ele.attr("isParent") == "true") {
                        return;
                    }
                    me.hideItem($(this));
                    var object = OMenuEvent;
                    var js = ele.attr("js"),
                        textId = ele.attr("textId"),
                        value = ele.attr("val"),
                        ctrlEvent = {};
                    ctrlEvent.o = object.o;
                    ctrlEvent.value = value;
                    ctrlEvent.textId = textId;
                    setTimeout(function () {
                        if (js) {
                            eval(js);
                        } else {
                            HoteamUI.Common.ExeFunction(object.onclick, ctrlEvent);
                        }
                    }, 1);
                });
                function operateLi(top, ul) {
                    //底部被覆盖的ul里面li控制隐藏和展示
                    var startIndex = parseInt(top / 30);
                    var showNum = parseInt(ul.outerHeight() / 30);
                    ul.children().each(function (i) {
                        if (i < startIndex) {
                            $(this).hide();
                        } else if (i < startIndex + showNum) {
                            $(this).show();
                        } else {
                            $(this).hide();
                        }
                    });
                }
            },
            converItems: function (source) {
                var source, result = [];
                if (source && !(source instanceof Array)) {
                    for (var i in source) {
                        if (!source.hasOwnProperty(i)) {
                            continue;
                        }
                        result.push(source[i]);
                    }
                }
                else {
                    result = source ? source : result;
                }
                return result;
            },
            //展示三级及三级以下的元素
            showChildItem: function (id, li) {
                var ul = li.children('ul').show();
                if (ul.length == 0) {
                    return;
                }
                var liWidth = li.outerWidth(true);
                var ulWidth = ul.width();
                var ulHeight = ul.height();
                var winHeight = $(window).height();
                var winWidth = $(window).width();
                var offset = li.offset();
                if (offset.left + liWidth + ulWidth > winWidth) {
                    ul.css("left", -ulWidth);
                } else {
                    ul.css("left", liWidth - 2);
                }
                if (offset.top + ulHeight + 25 > winHeight) {
                    var top = winHeight - 25 - offset.top - ulHeight;
                    ul.css("top", top - top % 30);
                } else {
                    ul.css("top", 0);
                }
            },
            //加载三级以及三级以下的html
            loadChildItem: function (id, ele, obj) {
                var me = this;
                var children = ele.data("children");
                if (children && children.length > 0) {
                    var ulid = id + ele.index();
                    if ($("#" + ulid).size() == 0) {
                        var $ul = $('<ul id="' + ulid + '" class="hoteam-menu-childitem"></ul>');
                        console.log(ulid);
                        for (var i = 0; i < children.length; i++) {
                            var item = children[i], childrenItem = me.converItems(item.children || item.Children),
                                iconClass = '', iconStyle = '',
                                icon = item.icon || item.Icon, caret = '';

                            if (item.CtrlType === 'Line') {
                                $ul.find('ul>li:last').addClass('hoteam-menu-item-li-line');
                                continue;
                            }

                            if (icon) {
                                if (icon.indexOf("~") < 0) {//是雪碧图，不是单独图片
                                    iconClass = HoteamUI.Common.GetImage(icon, 16);
                                } else {
                                    iconStyle = 'style="background:url(' + icon.replace("~", PageInit.WebRootPath) + ') center no-repeat"';
                                }
                            }
                            var imgspan = '<span class="hoteam-menu-item-icon ' + iconClass + '" ' + iconStyle + ' ></span>',
                                isParent = 'false';
                            if (childrenItem && childrenItem.length > 0) {//如果有子菜单
                                caret = '<span class="basesprite b-caret-right"></span>';
                                isParent = 'true';
                            }
                            var js = item.js || item.Script || "";
                            js = js.replace(/\'/g, "\"");
                            var other = "val='" + (item.value || item.Value) + "' " + " js='" + js + "' "
                                        + " textId='" + (item.textId || item.TextId) + "' ";
                            var li = '<li class="hoteam-menu-childitem-li"' + other + '><a class="hoteam-menu-item-text">'
                                        + imgspan
                                        + '<span class="hoteam-menu-text-sp">' + (item.Text || item.text || HoteamUI.Language.Lang(item.textId || item.TextId)) + '</span>'
                                        + caret
                                        + '</a></li>';
                            $ul.append($(li).data("children", childrenItem).attr("isParent", isParent));
                        }
                        me.bindChildItemEvent($ul, obj);
                        ele.append($ul);
                    }
                }
            },
            bindChildItemEvent: function ($ul, obj) {
                var me = this;
                $ul.on("mouseenter", function () {
                    $(this).show();
                }).on("mouseenter", ">li", { o: obj }, function (e) {
                    var elem = $(this);
                    var id = elem.parent().attr("id") + elem.index();
                    me.loadChildItem(id, elem, e.data.o);
                    me.showChildItem(id, elem);
                }).on("mouseleave", ">li", function () {
                    $(this).children("ul").hide();
                }).on("click", ">li", { o: obj }, function (e) {
                    if ($(this).attr("isParent") == "true") {
                        return;
                    }
                    var object = e.data.o;
                    var js = $(this).attr("js"),
                        textId = $(this).attr("textId"),
                        value = $(this).attr("val"),
                        ctrlEvent = {};
                    ctrlEvent.o = object.o;
                    ctrlEvent.value = value;
                    ctrlEvent.textId = textId;
                    me.hideItem($(this));
                    if (js) {
                        eval(js);
                    } else {
                        HoteamUI.Common.ExeFunction(object.onclick, ctrlEvent);
                    }
                });
            },
            hideItem: function (ele) {
                var ul = ele.closest(".hoteam-menu-c");
                ul.hide().find("ul.hoteam-menu-childitem").hide();
                HoteamUI.OCX.HideMask();
                HoteamUI.Common.OCXIframe.Hide();
            },
            //如果容器宽度不够，则需要在菜单后面添加更多按钮来扩展展示不开的菜单
            resize: function (id) {
                var ul = $("#" + id),
                    ulWidth = ul.width(),
                    o = $("#" + id).data("opt"),
                    type = o.type,
                    lis = ul.children(),
                    width = 0;
                if (ulWidth <= 0) {
                    return;
                }
                lis.each(function () {
                    width += $(this).outerWidth(true);
                });
                if (width > ulWidth) {//如果超出ul容器的宽度
                    //判断是否已经有代表更多的li
                    var lastLi = ul.children(":last");
                    if (lastLi.attr("icon") != "p_more") {
                        var aclass = '',
                        moreClass = HoteamUI.Common.GetImage("p_more", 16);
                        if (type == "image") {
                            aclass = 'hoteam-menu-img';
                        }
                        ul.append(
                            '<li class="ui-menu-item ui-menu-item-last"><a class="hoteam-menu-text ' + aclass + '">' +
                                '<span icon="p_more" class="hoteam-menu-icon basesprite ' + moreClass + '"></span>' +
                                '<span class="hoteam-menu-text-sp">' + HoteamUI.Language.Lang("Menu.More") + '</span>' +
                            '</a></li>'
                        );
                        width += ul.children(":last").outerWidth(true);
                        lastLi = ul.children(":last");
                    }
                    //从倒数第二个li开始，依次减少，同时判断宽度是否足够
                    var data = [];
                    operateLi(ulWidth, width, data, lastLi.prev());
                    lastLi.data("item", { children: data });
                    function operateLi(ulWidth, width, data, li) {
                        if (li.length == 0 || li.hasClass("ui-menu-sleitem")) {
                            return;
                        }
                        if (width > ulWidth) {
                            width = width - li.outerWidth(true);
                            operateLi(ulWidth, width, data, li.prev());
                            data.push(li.data("item"));
                            li.remove();
                        }
                    }
                }
                $("body").children().filter("[id^='" + id + "']").remove();
            }
        }
    })(jQuery);
}




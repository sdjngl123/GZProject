; (function ($) {
    /* 搜索建议插件 */
    $.fn.bsSuggest = function (opts) {
        //方法判断
        if (typeof opts === 'string' && methods[opts]) {
            //如果是方法，则参数第一个为函数名，从第二个开始为函数参数
            return methods[opts].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof opts === 'object' || !opts) {
            //调用初始化方法
            return methods.init.apply(this, arguments);
        }
    };
    var methods = {
        init: function (opts) {
            //参数设置
            var me = this,
                oldWidth,
            options = $.extend({
                data: {},                       //下拉数据
                keyUp: 38,                      //向上方向键
                keyDown: 40,                    //向下方向键
                keyEnter: 13,                   //回车键
                ulstyle: {
                    "background-color": "#ffffff",
                    "border": "1px solid #ccc",
                    "-webkit-box-shadow": "0 6px 12px rgba(0,0,0,.175)",
                    "box-shadow": "0 6px 12px rgba(0,0,0,.175)",
                    "width": "auto",
                    "padding": "0px",
                    "position": "absolute",
                    "display": "none",
                    "border-radius": "3px",
                    "list-style": "none",
                    "z-index": "99999",
                    "max-height": "200px",
                    "overflow-y": "auto"
                },
                listyle: {
                    "padding": "6px 10px",
                    "border-bottom": "0px solid #ccc",
                    "background-color": "#ffffff",
                    "white-space": "nowrap",
                    "overflow": "hidden",
                    "text-overflow": "ellipsis",
                    "position": "relative"
                }
            }, opts);
            if ($(this).attr("bomenuid")) {
                $(this).bsSuggest("destroy");
            }
            var menuid = jsGuid(),
            	bomenuid = menuid + "bottom";
            $(this).attr("bomenuid", bomenuid);
            var data = options.data;

            //创建位于input下面的下拉框
            var ul = "<ul id=" + bomenuid + " class='dropdown-menu dropdown-menu-suggest'></ul>";
            var $ul = $(ul);
            var li;
            if (!data) data = [];
            for (var i = 0; i < data.length; i++) {
                var livalue = data[i].value == undefined ? data[i].Value : data[i].value;
                var litext = data[i].text == undefined ? data[i].Text : data[i].text;
                //特例
                var objectId = data[i].ObjectID == undefined ? data[i].objectId : data[i].ObjectID;
                var canRemove = data[i].canRemove == undefined ? (data[i].CanRemove == undefined ? false : data[i].CanRemove) : data[i].canRemove;
                var removeEle = '',
                    btnEle = '';
                if (data[i].canRemove) {//如果此数据可以删除
                    removeEle = '<span class="dropdown-menu-remove basesprite b-less-remove" style="display:none;"></span>';
                }
                if (data[i].ButtonImage) {
                    btnEle = '<span class="dropdown-menu-btn basesprite b-less-btn ' + HoteamUI.Common.GetImage(data[i].ButtonImage, 16) + '" style="display:none;"></span>';
                }
                li = '<li class="bootstrap-suggest-li" style="height:26px;" data-value="' + livalue + '" title="' + HoteamUI.Common.HtmlEscape(litext) + '" objectId="' + objectId + '">' + litext + btnEle + removeEle + '</li>';
                $li = $(li).css(options.listyle).on("mouseenter", function () {
                    $(this).parent().children().css("background-color", "#ffffff").removeClass("bootstrap-suggest-select");
                    $(this).css("background-color", "#eee").addClass("bootstrap-suggest-select");
                    $ul.attr("data-value", $(this).attr("data-value")).attr("data-text", $(this).text());
                    $(this).find(".b-less-remove").show();
                    $(this).find(".b-less-btn").show();
                }).on("mouseleave", function () {
                    $(this).css("background-color", "#ffffff").removeClass("bootstrap-suggest-select");
                    $(this).find(".b-less-remove").hide();
                    $(this).find(".b-less-btn").hide();
                });

                //设定默认值
                if (data[i].selected || data[i].Selected) {
                    $(me).attr("data-val", (data[i].value || data[i].Value));
                    $(me).val(data[i].text || data[i].Text);
                }


                $ul.append($li).css(options.ulstyle);

            }

            var _this = $(this);
            setTimeout(function () {
                oldWidth = _this.parent().width();
                $ul.css("width", oldWidth);
            }, 100);

            $("body").append($ul);
            $ul.on("mousedown", function () {
                if ((event.srcElement && event.srcElement.tagName == "LI") || (event.target && event.target.tagName == "LI")) {
                    setValue();
                    $(me).bsSuggest("hide");
                } else {
                    return;
                }
            }).on("mouseenter", function () {
                $(me).attr("close", "close");
                setTimeout(function () {
                    $(me).blur();
                }, 1);
            }).on("mouseleave", function () {
                $(me).focus();
            }).on("mousedown", ".dropdown-menu-remove", function () {
                var ele = $(this).parent();
                var ui = ele.parent();
                if (ele.attr("data-value") == $(me).attr("data-val")) {
                    var li = ui.children(":first");
                    ui.attr("data-value", li.attr("data-value")).attr("data-text", li.text());
                    ele.remove();
                    setValue();
                } else {
                    ele.remove();
                }
                $(me).trigger("removeClick", { value: ele.attr("data-value"), objectId: ele.attr("objectId") });
                return false;
            }).on("mousedown", ".dropdown-menu-btn", function () {
                var ele = $(this).parent();

                $(me).trigger("btnClick", { value: ele.attr("data-value"), objectId: ele.attr("objectId") });
                $(me).bsSuggest("hide");
                return false;
            });
            //注册事件
            $(this).on("click", function () {
                var newWidth = $(this).parent().width();
                //26177  李金岳
                if (newWidth !== oldWidth) {
                    $ul.css("width", newWidth);
                    oldWidth = newWidth;
                }
                $(this).bsSuggest("show");
            }).on("blur", function () {
                if ($(me).attr("close")) {
                    setTimeout(function () {
                        $(me).removeAttr("close");
                    }, 80);
                    return;
                }
                $(this).bsSuggest("hide");
            }).on("keydown", function (e) {
                var bomenuid = $(this).attr("bomenuid"),
                    tomenu = $("#" + bomenuid);
                if (e.keyCode === 8 && $(this).hasClass('readonly')) {
                    return false;
                }
                if (e.keyCode == options.keyDown) {
                    var selectli = tomenu.children(".bootstrap-suggest-select");
                    tomenu.children().removeClass("bootstrap-suggest-select").css("background-color", "#ffffff");
                    if (selectli.length == 0) {
                        $(tomenu.children().not(":hidden")[0]).addClass("bootstrap-suggest-select").css("background-color", "#eee");
                    } else {
                        var nextAllLi = selectli.nextAll().not(selectli.nextAll(":hidden"));
                        if (nextAllLi.length == 0) {
                            $(tomenu.children().not(":hidden")[0]).addClass("bootstrap-suggest-select").css("background-color", "#eee");
                        } else {
                            $(nextAllLi[0]).addClass("bootstrap-suggest-select").css("background-color", "#eee");
                        }
                    }
                } else if (e.keyCode == options.keyUp) {
                    var selectli = tomenu.children(".bootstrap-suggest-select");
                    tomenu.children().removeClass("bootstrap-suggest-select").css("background-color", "#ffffff");
                    if (selectli.length == 0) {
                        var lis = tomenu.children().not(":hidden");
                        $(lis[lis.length - 1]).addClass("bootstrap-suggest-select").css("background-color", "#eee");
                    } else {
                        var prevAllLi = selectli.prevAll().not(":hidden");
                        if (prevAllLi.length == 0) {
                            var lis = tomenu.children().not(":hidden");
                            $(lis[lis.length - 1]).addClass("bootstrap-suggest-select").css("background-color", "#eee");
                        } else {
                            $(prevAllLi[0]).addClass("bootstrap-suggest-select").css("background-color", "#eee");
                        }
                    }
                } else if (e.keyCode == options.keyEnter) {
                    var selli = tomenu.children(".bootstrap-suggest-select");
                    if (selli.length > 0) {
                        tomenu.attr("data-value", $(selli).attr("data-value")).attr("data-text", $(selli).text());
                        setValue();
                        $(me).bsSuggest("hide");
                        return false;
                    }
                }
            });
            if (this[0].addEventListener) {
                var inputFun = function () {
                    var input = $(me);
                    input.bsSuggest("show");
                    input.attr("data-val", "");
                    var val = input.val();
                    var menu = $("#" + input.attr("bomenuid"));
                    menu.hide();
                    var lis = menu.children().hide();
                    for (var i = 0; i < lis.length; i++) {
                        if ($(lis[i]).text().indexOf(val) > -1) {
                            menu.show();
                            $(lis[i]).show();
                            if ($(lis[i]).text() == val) {
                                input.attr("data-val", $(lis[i]).attr("data-value"));
                            }
                        }
                    }
                    //重新计算下拉列表高度
                    computeUlPosition(_this, menu);
                }
                $(this).data("inputFun", inputFun);
                this[0].addEventListener('input', inputFun, false);
                //ie9浏览器的input无法监控delete和删除以及剪切,所以自行处理
                if (HoteamUI.Browser.isIE && HoteamUI.Browser.version == "9.0") {
                    this.on("keyup", function (e) {
                        var key = e.keyCode;
                        if (key == 8 || key == 46) {
                            inputFun();
                        }
                    });
                    this.on('cut', function () {
                        inputFun();
                    });
                }
            } else {
                var properChange = function (argu) {
                    var input = $(argu.srcElement);
                    if (argu.propertyName != "value" || (argu.propertyName == "value" && input.data("jsSetValue"))) {
                        if (input.data("jsSetValue")) {
                            input.data("jsSetValue", "");
                        }
                        return;
                    }
                    $(me).bsSuggest("show");
                    input.attr("data-val", "");
                    var val = input.val();
                    var menu = $("#" + input.attr("bomenuid"));
                    var lis = menu.children().hide();
                    for (var i = 0; i < lis.length; i++) {
                        if ($(lis[i]).text().indexOf(val) > -1) {
                            $(lis[i]).show();
                            if ($(lis[i]).text() == val) {
                                input.attr("data-val", $(lis[i]).attr("data-value"));
                            }
                        }
                    }
                }
                $(this).data("properChange", properChange);
                this[0].attachEvent("onpropertychange", properChange)
            }
            $(this).nextAll(".input-group-btn").on("mouseup", function () {
                if ($(this).children(".btn").attr("disabled") == "disabled") {
                    return;
                }
                setTimeout(function () {
                    //26177  李金岳
                    var newWidth = me.parent().width();
                    if (newWidth !== oldWidth) {
                        $ul.css("width", newWidth);
                        oldWidth = newWidth;
                    }
                    $(me).focus();
                    $(me).bsSuggest("show");
                }, 10);
            })
            //当下拉列表显示在上方时，用marginTop修正ul的top值
            function computeUlPosition(_this, menu) {
                var marginTop;
                var liLen = 7 - menu.children().not(":hidden").length;
                //首先检测当前的ul显示在input的上侧还是下侧，如果下侧显示不开，则自动显示到上侧
                //获取当前的input的位置
                var inputposition = $(_this).offset();
                var menuTop = menu.css("top");
                menuTopInt = parseInt(menuTop.slice(0, menuTop.indexOf("x") - 1));

                if (inputposition.top > menuTopInt && liLen > 0 && liLen != 7) {//显示input上面的ul
                    marginTop = liLen * 26 + 15;
                    menu.css("margin-top", marginTop);
                } else {
                    menu.css("margin-top", 0);
                }
            };
            //生成一个随机id
            function jsGuid(bool_divide) {
                var guid = "";
                for (var i = 1; i <= 32; i++) {
                    var n = Math.floor(Math.random() * 16.0).toString(16).toUpperCase();
                    guid += n;
                    if (!(bool_divide == false)) {
                        if ((i == 8) || (i == 12) || (i == 16) || (i == 20)) {
                            guid += "-";
                        }
                    }
                }
                return guid;
            }
            //给input赋值
            function setValue() {
                var ul = $("#" + $(me).attr("bomenuid")),
                    text = ul.attr("data-text");

                $(me).attr("data-val", ul.attr("data-value"));
                $(me).data("jsSetValue", "true").val(text).attr('title', text);
                $(me).trigger("change");
            }

            //鼠标滚轮事件：隐藏suggest
            $(document).on('mousewheel', function (event) {
                var target = $(event.target),
                     isSuggest = target.hasClass('bootstrap-suggest-li') || target.hasClass("dropdown-menu-suggest");

                if (!isSuggest) {
                    $(me).bsSuggest("hide");
                }
            })
        },
        loadData: function (data) {
            $(this).bsSuggest({ "data": data });
        },
        getSelectedText: function () {
            return $(this).val();
        },
        setText: function (text) {
            var lis = $("#" + $(this).attr("bomenuid")).children();
            var isOption = false;
            for (var i = 0; i < lis.length; i++) {
                var li = $(lis[i]);
                if (li.text() == text) {
                    $(this).attr("data-val", li.attr("data-value"));
                    $(this).data("jsSetValue", "true").val(text);
                    isOption = true;
                }
            }
            if (!isOption) {
                $(this).attr("data-val", "");
                $(this).data("jsSetValue", "true").val(text);
            }
        },
        setSelectedByValue: function (val) {
            var lis = $("#" + $(this).attr("bomenuid")).children();
            for (var i = 0; i < lis.length; i++) {
                if ($(lis[i]).attr("data-value") == val) {
                    $(this).attr("data-val", val);
                    $(this).data("jsSetValue", "true").val($(lis[i]).text());
                }
            }
        },
        setSelectedByIndex: function (index) {
            var lis = $("#" + $(this).attr("bomenuid")).children();
            if (index < lis.length) {
                $(this).attr("data-val", $(lis[index]).attr("data-value"));
                $(this).data("jsSetValue", "true").val($(lis[index]).text());
            }
        },
        clearSelectData: function () {
            $(this).attr("data-val", "").data("jsSetValue", "true").val("");
        },
        clearData: function () {
            $(this).attr("data-val", "").data("jsSetValue", "true").val("");
        },
        getSelectedValue: function () {
            return $(this).attr("data-val") || "";
        },
        isInOption: function () {
            var text = $(this).val();
            var lis = $("#" + $(this).attr("bomenuid")).children();
            for (var i = 0; i < lis.length; i++) {
                if ($(lis[i]).text() == text) {
                    return true;
                }
            }
            return false;
        },
        show: function () {

            var bomenuid = $(this).attr("bomenuid");
            if ($("#" + bomenuid).css("display") != "none") {
                return;
            }
            //获取ul的高度
            var $tul = $("#" + bomenuid);
            $tul.children().show();
            var ulheight = $tul.height();
            //首先检测当前的ul显示在input的上侧还是下侧，如果下侧显示不开，则自动显示到上侧
            //获取当前的input的位置
            var inputposition = $(this).offset();
            var h = $(window).height() - $(this).offset().top + $(document).scrollTop();
            //还需要减去input的高度,及减去空余的2px
            h = h - $(this).outerHeight() - 2;
            if (h < ulheight) {//如果小于，则显示input上面的ul
                $tul.css("left", inputposition.left).css("top", inputposition.top - ulheight - 2);
            } else {
                $tul.css("left", inputposition.left).css("top", inputposition.top + $(this).outerHeight() + 0);
            }
            var screenWidth = window.screen.width;
            if ((screenWidth - inputposition.left) < $tul.outerWidth()) {
                $tul.css("left", inputposition.left - ($tul.outerWidth() - $(this).outerWidth() - 30)).css("display", "block");
            } else {
                $tul.css("left", inputposition.left).css("display", "block");
            }
        },
        hide: function () {
            //恢复初始margin-top值0
            $("#" + $(this).attr("bomenuid")).css({ "display": "none", "margin-top": 0 });
            //$("#" + $(this).attr("bomenuid")).css("display", "none");


        },
        disable: function (e) {
            $(this).attr("disabled", true).parent().find(".input-group-btn>.btn").attr("disabled", "true").css({
                "background": "#ececec", "cursor": "default"
            });
        },
        enable: function () {
            $(this).attr("disabled", false).parent().find(".input-group-btn>.btn").removeAttr("disabled").css({
                "background": "#fff", "cursor": "pointer"
            });
        },
        resize: function () {
            var width = $(this).parent().width();
            $("#" + $(this).attr("bomenuid")).css("width", width);
        },
        destroy: function () {
            var bomenuid = $(this).attr("bomenuid");
            if (this[0].removeEventListener) {
                this[0].removeEventListener("input", $(this).data("inputFun"));
            } else {
                this[0].detachEvent("onpropertychange", $(this).data("properChange"));
            }
            $(this).off("click blur keydown keyup cut").val("");
            $(this).nextAll(".input-group-btn").off();
            $("#" + bomenuid).remove();
            $(this).attr("data-val", "");
        }
    };
})(window.jQuery);
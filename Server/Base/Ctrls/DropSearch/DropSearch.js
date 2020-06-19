HoteamUI.Control.ODropSearch = {
    Create: function (options) {
        options = options || {};
        //设置参数
        var me = this;
        var parentId = this.id;
        var id = this.id + "_dropSearch";
        var ctrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions;
        ctrlOptions = $.extend(true, {}, $.hoteamDropSearch.defaults, ctrlOptions);
        ctrlOptions.parentId = parentId;
        ctrlOptions.id = id;
        ctrlOptions.autofit = options.autofit;
        //事件参数
        var handlers = (options.controlInfo || this.ControlInfo()).PageHandlers;
        ctrlOptions.callback = {};
        ctrlOptions.o = HoteamUI.Control.Instance(parentId);
        $.each(handlers, function (index, val) {
            if (val.HandlerName == "OnClick") {
                ctrlOptions.callback.onclick = me.GetEventFunctionName("OnClick");
            }
            if (val.HandlerName == "OnChange") {
                ctrlOptions.callback.onchange = me.GetEventFunctionName("OnChange");
            }
            if (val.HandlerName == "OnFocusout") {
                ctrlOptions.callback.OnFocusout = me.GetEventFunctionName("OnFocusout");
            }
        });
        $.hoteamDropSearch.create(ctrlOptions);
    },
    //加载需要过滤的数据（请求到所有数据，控件负责进行过滤）
    //参数data:是需要过滤的数据；ifFilterData：是否立刻进行过滤数据并显示
    LoadData: function (data, ifFilterData) {
        var input = $("#" + this.id + "_dropSearch");
        input.data("data", data);
        if (ifFilterData != false) {
            this.LoadFilteredData($.hoteamDropSearch.getFilterData(input.val(), data));
        }
    },
    //加载过滤之后的数据
    LoadFilteredData: function (data) {
        if (data) {
            var id = this.id + "_dropSearch";
            $.hoteamDropSearch.loadItems(id, data);
        }
    },
    //设置输入框内容
    SetData: function (obj) {
        $("#" + this.id + "_dropSearch").data("jssetvalue", "true").val(obj.text || obj.Text || "").attr("data-val", obj.Value || obj.value || "");
    },
    GetSelectedText: function () {
        var id = this.id + "_dropSearch";
        return $("#" + id).val();
    },
    GetSelectedValue: function () {
        var id = this.id + "_dropSearch";
        return $("#" + id).attr("data-val") || "";
    },
    Dispose: function () {
        var id = this.id + "_dropSearch";
        $("#" + id + "_ul").remove();
    },
    Resize: function () {
        var id = this.id + "_dropSearch";
        $.hoteamDropSearch.resize(id);
    },
    Check: function (regex, title) {
        var id = this.id + "_dropSearch";
        var val = this.GetSelectedText();
        var result = $.hoteamToolTip.check(id, val, false);
        if (result) {
            $("#" + id).removeAttr("checkstatus");
            $.hoteamDropSearch.resize(id, 0);
        } else {
            $("#" + id).attr("checkstatus", "N");
            $.hoteamDropSearch.resize(id, 25);
        }
        return result;
    }
};

{
    (function ($) {
        $.hoteamDropSearch = {
            defaults: {
                parentid: null,
                id: null,
                data: [],
                callback: {
                    onload: function () { }
                }
            },
            create: function (options) {
                var o = $.extend({}, $.hoteamDropSearch.defaults, options);
                var selectDiv = '<div class="hoteam-dropsearch-container"></div>';
                $("#" + o.parentId).append(selectDiv);
                var $input = $('<input id="' + o.id + '" type="text" class="form-control" autocomplete="off"/>' +
                                '<span class="basesprite b-search dropsearch-search"></span>' +
                                '<span class="basesprite b-close dropsearch-close"></span>');
                $("#" + o.parentId).children("div").append($input.data("option", o));
                if (o.autofit) {
                    $("#" + o.parentId).css("height", 40);
                }
                if (options.height) {//增加高度控制(个性需求)
                    $("#" + o.parentId).children("div").css({
                        height: options.height,
                        marginTop: -options.height / 2
                    });
                    $("#" + o.id).css("height", options.height);
                    $("#" + o.id).nextAll().css("top", (options.height - 16) / 2);
                }
                //下拉ul
                var $ul = $('<ul id="' + o.id + "_ul" + '" class="hoteam-dropsearch-ul"></ul>');
                $("body").append($ul);
                this.initHanlder(o.id);
                if (o.regex) {
                    $.hoteamToolTip.create(o);
                }
                this.resize(o.id);
                //增加下拉列表高度控制(个性需求)
                if (options.maxheight) {
                    var maxheight = options.maxheight + "px";
                    $("#" + o.id + "_ul").css("max-height", maxheight);
                }
            },
            loadItems: function (id, data) {
                var input = $("#" + id);
                var text = input.val();
                var $dropul = $("#" + id + "_ul").empty();
                if (data.length == 0) {
                    
                    $dropul.hide();
                    return;
                }
                for (var i = 0; i < data.length; i++) {
                    var selClass = "";
                    if (i == 0) {
                        selClass = "hoteam-dropsearch-li-sel";
                    }
                    var $li = $('<li val="' + HoteamUI.Common.HtmlEscape(data[i].value) + '" class="' + selClass + '">' + data[i].text + '</li>').data("d", data[i]);
                    $dropul.append($li);
                    if (text == data[i].text) {
                        input.attr("data-val", data[i].value);
                    }
                }
                this.resize(id);
                $dropul.show();
            },
            getFilterData: function (str, data) {
                var filterData = [];
                var reg = new RegExp(str);
                for (var i = 0; i < data.length; i++) {
                    if (reg.test(data[i].text)) {//如果符合条件
                        filterData.push(data[i]);
                    }
                }
                return filterData;
            },
            initHanlder: function (id) {
                var me = this;
                var o = $("#" + id).data("option");
                $("#" + id).on("keydown", function (e) {
                    if (e.keyCode == 38) {//如果是向上按键
                        //获取当前选中的选中的li
                        var lisel = $("#" + id + "_ul").children("li.hoteam-dropsearch-li-sel");
                        if (lisel.length > 0) {
                            var prevli = lisel.prev();
                            if (prevli.length == 0) {
                                $("#" + id + "_ul").children("li:last").addClass("hoteam-dropsearch-li-sel");
                            } else {
                                prevli.addClass("hoteam-dropsearch-li-sel");
                            }
                            lisel.removeClass("hoteam-dropsearch-li-sel");
                        }
                    } else if (e.keyCode == 40) {//如果是向下按键
                        //获取当前选中的选中的li
                        var lisel = $("#" + id + "_ul").children("li.hoteam-dropsearch-li-sel");
                        if (lisel.length > 0) {
                            var nextli = lisel.next();
                            if (nextli.length == 0) {
                                $("#" + id + "_ul").children("li:first").addClass("hoteam-dropsearch-li-sel");
                            } else {
                                nextli.addClass("hoteam-dropsearch-li-sel");
                            }
                            lisel.removeClass("hoteam-dropsearch-li-sel");
                        }
                    } else if (e.keyCode == 13) {//如果是enter键
                        //获取当前选中的选中的li
                        var lisel = $("#" + id + "_ul").children("li.hoteam-dropsearch-li-sel");
                        lisel.trigger("mousedown");
                        return false;
                    }
                }).on("input", { e: { "o": o.o }, fun: o.callback.onchange }, function (e) {
                    inputChange(e, $(this));
                }).on("propertychange", { e: { "o": o.o }, fun: o.callback.onchange }, function (e) {
                    var input = $(this);
                    if (e.originalEvent.propertyName != "value" || (e.originalEvent.propertyName == "value" && input.data("jsSetValue"))) {
                        if (input.data("jsSetValue")) {
                            input.data("jsSetValue", "");
                        }
                        return;
                    }
                    inputChange(e, input);
                }).on("blur", { e: { "o": o.o }, fun: o.callback.OnFocusout }, function (e) {
                    
                    var dropsearchUl = $("#" + id + "_ul");
                    if ($.browser.msie || (/Trident\/7./).test(navigator.userAgent)) {
                        var isDropsearchUlMousedown = dropsearchUl.data('dropsearch-ul-mousedown');
                        if (isDropsearchUlMousedown) {
                            dropsearchUl.data('dropsearch-ul-mousedown', null);
                            return false;
                        }
                    }
                    dropsearchUl.hide();
                    $(this).nextAll("span.dropsearch-close").hide();
                    var ctrl = e.data.e;
                    ctrl.value = $(this).attr("value");
                    HoteamUI.Common.ExeFunction(e.data.fun, ctrl);
                }).on("focus", function () {
                    if ($(this).val()) {
                        $(this).nextAll("span.dropsearch-close").show();
                    }
                    if ($(this).val() && $("#" + id + "_ul").children("li").length > 0) {
                        me.resize(id);
                        $("#" + id + "_ul").show();
                    }
                });
                //ie9浏览器的input无法监控delete和删除以及剪切,所以自行处理
                if (HoteamUI.Browser.isIE && HoteamUI.Browser.version == "9.0") {
                    $("#" + id).on("keyup", { e: { "o": o.o }, fun: o.callback.onchange }, function (e) {
                        var key = e.keyCode;
                        if (key == 8 || key == 46) {
                            inputChange(e, $(this));
                        }
                    });
                    $("#" + id).on('cut', { e: { "o": o.o }, fun: o.callback.onchange }, function (e) {
                        inputChange(e, $(this));
                    });
                }
                var inputChange = function (e, input) {
                    var value = input.val();
                    input.attr("data-val", "");
                    if (!value) {
                        
                        $("#" + id + "_ul").empty().hide();
                        input.nextAll("span.dropsearch-close").hide();
                        return;
                    }
                    input.nextAll("span.dropsearch-close").show();
                    var data = input.data("data");
                    if (data) {//如果已经加载过需要过滤的数据了，则不需要再次请求
                        me.loadItems(id, me.getFilterData(value, data));
                    } else {
                        var ctrl = e.data.e;
                        ctrl.value = value;
                        HoteamUI.Common.ExeFunction(e.data.fun, ctrl);
                    }
                }

                if ($.browser.msie || (/Trident\/7./).test(navigator.userAgent)) {
                    $("#" + id + "_ul").on("mousedown", function (e) {
                        
                        $(this).data('dropsearch-ul-mousedown', true);
                    }).on("mouseleave", function (e) {
                        if ($(this).css("display") !== "none") {
                            $("#" + id).focus();
                        }
                    });
                }

                $("#" + id + "_ul").on("mousedown", "li", { e: { "o": o.o }, fun: o.callback.onclick }, function (e) {
                    
                    $("#" + id).data("jssetvalue", "true").val($(this).text()).attr("data-val", $(this).attr("val"));
                    $(this).parent().hide();
                    var ctrl = e.data.e;
                    ctrl.value = $(this).attr("val");
                    ctrl.text = $(this).text();
                    ctrl.data = $(this).data("d");
                    HoteamUI.Common.ExeFunction(e.data.fun, ctrl);
                }).on("mouseenter", "li", function () {
                    $(this).parent().children().removeClass("hoteam-dropsearch-li-sel");
                    $(this).addClass("hoteam-dropsearch-li-sel");
                });
                //删除按钮事件
                $("#" + id).nextAll("span.dropsearch-close").mousedown(function () {
                    //25535 李金岳
                    $("#" + id).data("jssetvalue", "").val("").attr("data-val", "").text("");
                    $(this).hide();
                    $("#" + id + "_ul").hide();
                });
            },
            resize: function (id) {
                var width = $("#" + id).parent().outerWidth();
                var position = $("#" + id).parent().offset();
                var height = $("#" + id).height();
                $("#" + id + "_ul").css({
                    "min-width": width,
                    "left": position.left,
                    "top": position.top + height + 4
                });
            }
        }
    })(jQuery);
}

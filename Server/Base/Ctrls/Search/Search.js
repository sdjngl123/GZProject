HoteamUI.Control.OSearch = {
    Create: function (options) {
        //设置参数
        options = options || {};
        var me = this;
        var parentId = this.id;
        var id = this.id + "_Search";
        var CtrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions;
        var o = $.extend(true, {}, $.hoteamButton.defaults, CtrlOptions);
        o.parentId = parentId;
        o.id = id;

        //事件参数
        var handlers = (options.controlInfo || this.ControlInfo()).PageHandlers;
        o.event = {};
        o.event.hoteamCtrl = HoteamUI.Control.Instance(parentId);

        $.each(handlers, function (index, val) {
            if (val.HandlerName == "OnClick") {
                o.callback.onclick = me.GetEventFunctionName("OnClick");
            }
        });
        //创建控件
        $.hoteamSearch.create(o);
    },
    GetText: function () {
        var id = this.id + "_Search";
        return $("#" + id).find(".hoteam-search-input").val();
    },
    SetText: function (text) {
        var id = this.id + "_Search";
        $("#" + id).find(".hoteam-search-input").val(text);
    },
    SetBackgroundWord: function (text) {
        var id = this.id + "_Search";
        $("#" + id).find(".hoteam-search-placeholder").text(text);
    },
    Resize: function () {
        var id = this.id + "_Search";
        $.hoteamSearch.resize(id);
    }
};


{
    (function ($) {
        $.hoteamSearch = {
            defaults: {
                id: null,
                parentid: null,
                display: true,
                disabled: false,
                callback: {
                    onclick: null
                }
            },
            create: function (options) {
                var o = $.extend({}, $.hoteamButton.defaults, options);
                var $container = $('<div id="' + o.id + '" class="hoteam-search-container"></div>');
                var searchPlaceHoder = HoteamUI.Language.Lang("Search", "SearchFile"),
                    searchBtn = HoteamUI.Language.Lang("Search", "SearchBtn");
                var search =
                    '<div class="hoteam-search-icon">' +
                        '<span class="basesprite b-gray-search" style="margin-top:3px;"></span>' +
                    '</div>' +
                    '<div class="hoteam-search-input-c">' +
                        '<input class="hoteam-search-input"/>' +
                        '<span class="hoteam-search-placeholder">' + searchPlaceHoder + '</span>' +
                        '<span class="basesprite b-close hoteam-search-trash" style="display:none;"></span>' +
                        '<div class="hoteam-search-split"></div>' +
                        '<span class="basesprite b-angle-down hoteam-search-select"></span>' +
                    '</div>' +
                    '<div class="hoteam-search-btn">' + searchBtn + '</div>';
                $container.append(search);
                $("#" + o.parentId).append($container);
                this.initHandler(o);
                this.resize(o.id);
            },
            initHandler: function (o) {
                function SaveSearchHistory(key, searchText, limitCount) {
                    if (HoteamUI.Common.IsNullOrEmpty(searchText)) {
                        return;
                    }
                    var cookieName = "searchhistory_" + key;
                    var histories = JSON.parse($.cookie(cookieName));
                    if (HoteamUI.Common.IsNullOrEmpty(histories)) {
                        histories = [];
                    }
                    histories.unshift(searchText);
                    var result = [];
                    $.each(histories, function (i, el) {
                        if ($.inArray(el, result) === -1) {
                            result.push(el);
                        }
                    })
                    if (result.length > limitCount) {
                        result = result.slice(0, limitCount);
                    }
                    $.cookie(cookieName, JSON.stringify(result));
                }
                //绑定事件
                var ctrlEvent = {};
                ctrlEvent.o = o.event.hoteamCtrl;
                $("#" + o.id).find(".hoteam-search-btn").bind("click", { e: ctrlEvent, fun: o.callback.onclick }, function (event) {
                    var functionName = event.data.fun;
                    var functionPara = ctrlEvent;
                    functionPara.text = $(this).parent().find("input").val();
                    if (functionPara.text.length > 200) {
                        var msg = HoteamUI.Language.Lang("Search", "InputCharError");
                        HoteamUI.UIManager.noty({ text: msg, type: 'success', layout: 'topCenter' });
                        return;
                    }
                    HoteamUI.Common.ExeFunction(functionName, functionPara);
                    SaveSearchHistory(o.id, functionPara.text, 10);
                })
                $("#" + o.id).find("input.hoteam-search-input").on({
                    focus: function () {
                        $(this).next().hide();
                    },
                    blur: function () {
                        if ($(this).val()) {
                            $(this).next().hide();
                        } else {
                            $(this).next().show();
                        }
                    },
                    keydown: function (e) {
                        if(e.which == 13){
                            $(this).parent().next().click();
                        }
                    },
                    keyup: function () {
                        if ($(this).val()) {
                            $(this).siblings(".hoteam-search-trash").show();
                        } else {
                            $(this).siblings(".hoteam-search-trash").hide();
                        }
                    }
                });
                $("#" + o.id).find("span.hoteam-search-placeholder").on({
                    click: function () {
                        $(this).hide();
                        $(this).prev().click().focus();
                    }
                });
                $("#" + o.id).find("span.hoteam-search-trash").on({
                    click: function () {
                        $(this).siblings("input").val("").focus();
                        $(this).hide();
                    }
                });

                var ulID = o.id + "_SearchHistoryUI";
                var ul = $("#" + ulID);
                $(document).on("mousedown", function (e) {
                    ul.hide();
                })

                var selectbtn= $("#" + o.id).find("span.hoteam-search-select");
                selectbtn.on({
                    mouseenter: function () {
                        $(this).addClass("b-blue-angle-down");
                    },
                    mouseleave: function () {
                        $(this).removeClass("b-blue-angle-down");
                    },
                    click: function () {
                        var ulStr, position, items = "";
                        var input = $(this).siblings("input");
                        var ret = JSON.parse($.cookie("searchhistory_" + o.id));

                        if (ul.length == 0) {
                            ulStr = '<ul class="hoteam-search-historycontainer" id="' + ulID + '"></ul>';
                            $("body").append(ulStr);
                        }
                        if (!HoteamUI.Common.IsNullOrEmpty(ret) && ret.length > 0) {
                            for (var i = 0; i < ret.length; i++) {
                                items += '<li title="' + ret[i] + '">' + ret[i] + '</li>';
                            }
                            items += '<li class="hoteam-search-historyclear">清除历史</li>';
                        }
                        else {
                            items = '<li></li>';
                        }
                        ul = $("#" + ulID);
                        ul.html("").append(items);
                        ul.on("click", "li", function () {
                            if ($(this).attr("class") == "hoteam-search-historyclear") {
                                $.cookie("searchhistory_" + o.id, "[]");
                            }
                            else {
                                var str = $(this).html();
                                input.click();
                                input.val(str).focus();
                                if (str) {
                                    input.siblings(".b-close").show();
                                }
                            }
                            ul.hide();
                        }).on("mousedown", function () {
                            return false;
                        });

                        position = input.offset();
                        ul.show().css({
                            top: position.top + 22,
                            left: position.left - 22,
                            width: $("#" + o.id).css("width"),
                            "z-index": 10000
                        });
                    }
                });
            },
            resize: function (id) {
                var pwidth = $("#" + id).css("width");
                $("#" + id).find(".hoteam-search-input-c").css("width", pwidth.substring(0, pwidth.length - 2) - 71);
            }
        }
    })(jQuery);
}



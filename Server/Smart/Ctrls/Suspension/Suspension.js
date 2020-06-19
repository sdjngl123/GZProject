HoteamUI.Control.OSuspension = {
    Create: function (options) {
        options = options || {};
        var self = this;
        var parentId = this.id;
        var id = this.id + "_Suspension";
        var cid = this.CID();
        var CtrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions;
        var susItems = [];
        $.each(CtrlOptions, function (index, item) {
            if (index.indexOf("item") > 1) {
                susItems.push(item);
            }
        });
        var o = {};
        o.parentId = parentId;
        o.id = id;
        o.items = susItems;
        o.OSuspension = HoteamUI.Control.Instance(parentId);
        $.hoteamSuspension.creat(o);
    },
    Resize: function () {
        $(".hoteam-suspension").hide();
    },
    LoadItems: function (data, objType, suspensionName) {
        var id = this.id + "_Suspension";
        $.hoteamSuspension.loadDataForServer($("#" + id), data, objType, suspensionName);
    },
    Dispose: function () {
        var id = this.id + "_Suspension";
        $("#" + id).remove();
    },
    RemoveAllItems: function () {
        var id = this.id + "_Suspension";
        $("#" + id).find("span").not($("#" + id).find("span.hoteam-suspension-more")).remove();
        $("#" + id).find("ul li").remove();
    }
};

{
    (function ($) {
        $.hoteamSuspension = {
            defaults: {
                parentId: null,
                id: null,
                items: null,
                OSuspension: {}
            },
            defaultItem: {
                text: null,
                textId: null,
                TextId: null,
                value: null,
                icon: null,
                js: null
            },
            creat: function (options) {
                var o = $.extend(false, this.defaults, options);
                var more = HoteamUI.Language.Lang("Suspension", "more");
                var moreSvg = '<span title="' + more + '" class="hoteam-suspension-more basesprite b-blue-more"></span>';
                var suspension = $('<div id="' + o.id + '" class="hoteam-suspension"><div class="hoteam-suspension-container">' + moreSvg + '<ul class="hoteam-suspension-ul"></ul></div></div>');
                //$("body").append(suspension);
                suspension.data("suspension", o).appendTo("body");
                this._bindHandlers(o);
            },
            _loadData: function (suspension, items, objtype, suspensionName) {
                var id = suspension.attr("id");
                objtype = objtype || "suspensionCommon";
                this._createItems(id, items, objtype, suspensionName);
            },
            _createItems: function (id, items, objtype, suspensionName) {
                var suspensionHtml = this._returnItemsHtml(items, objtype, suspensionName);
                var suspension = $(suspensionHtml.suspension);
                $("#" + id).find("span.hoteam-suspension-more").before(suspension);
                $("#" + id).find("ul").append(suspensionHtml.lis);
            },
            loadDataForServer: function (suspension, data, objtype, suspensionName) {
                if (data) {
                    var items = this._analyseItems([], data);
                    this._loadData(suspension, items, objtype, suspensionName);
                }
            },
            _bindHandlers: function (o) {
                var ctrlEvent = {};
                ctrlEvent.o = o.OSuspension;
                var suspension = $("#" + o.id);
                suspension.find("ul").on({
                    mouseenter: function () {
                        $(this).show();
                    },
                    mouseleave: function () {
                        $(this).hide();
                    }
                });
                suspension.on("click", "li", function (e) {
                    var sus = $(this).closest("div.hoteam-suspension");
                    var grid = $("#" + $(sus).data("gridid"));
                    $.hoteamSmartGrid.resetSelectedRow(grid);
                    ctrlEvent.menuType = "rightmenu";
                    ctrlEvent.menuName = $(this).attr("suspensionName");
                    ctrlEvent.value = $(this).attr("val");
                    $.hoteamSmartGrid.setSelectedRow(grid, sus.data("index"));
                    var js = $(this).attr("js");
                    eval(js);
                    sus.hide().find("ul").hide();
                    e.stopPropagation();
                });
                suspension.on("click", "span", function (e) {
                    if ($(this).hasClass("hoteam-suspension-more")) {
                        //判断当前的ul展开后会不会超过页面底部，如果会，则向上展示，否则向下
                        var ul = $(this).nextAll("ul"),
                            ulheight = $(ul).outerHeight(),
                            spanposition = $(this).offset(),
                            winheight = $(window).height(),
                            spanheight = $(this).outerHeight();
                        if (ulheight + spanposition.top + spanheight > winheight) {
                            $(ul).addClass("suspension-ul-t").removeClass("suspension-ul-b").show();
                        } else {
                            $(ul).addClass("suspension-ul-b").removeClass("suspension-ul-t").show();
                        }
                    } else {
                        var sus = $(this).closest("div.hoteam-suspension");
                        var grid = $("#" + $(sus).data("gridid"));
                        $.hoteamSmartGrid.resetSelectedRow(grid);
                        $.hoteamSmartGrid.setSelectedRow(grid, sus.data("index"));
                        ctrlEvent.menuType = "rightmenu";
                        ctrlEvent.menuName = $(this).attr("suspensionName");
                        ctrlEvent.value = $(this).attr("val");
                        var js = $(this).attr("js");
                        eval(js);
                        sus.hide().find("ul").hide();
                    }
                    e.stopPropagation();
                });
            },
            _returnItemsHtml: function (items, objtype, suspensionName) {
                var objtype = " objtype='" + objtype + "'", suspensionName = " suspensionname='" + suspensionName + "'";
                var suspension = '';
                if (items) {
                    var m = 0, lis = "";
                    //items有多少个内部对象
                    var num = items.length;
                    for (var i = 0; i < items.length; i++) {
                        var item = $.extend(false, this.defaultItem, items[i]);
                        var text = item.text;
                        if (item.js) {
                            var js = item.js.replace(/\"/g, "\"").replace(/\'/g, "\"");
                        }
                        if (m > 2 && num > 4) {
                            lis += '<li ' + objtype + suspensionName + ' js="' + js + '" val=' + item.value + '>' + text + '</li>';
                        } else {
                            var iconStyle = '', iconClass = '';
                            if (item.icon) {
                                if (item.icon.indexOf("~") < 0) {//如果有~，则是单独图片，否则则是class，代表的是雪碧图
                                    iconClass = HoteamUI.Common.GetImage(item.icon, 16);
                                } else {
                                    iconStyle = "style='background:url(" + item.icon.replace("~", PageInit.WebRootPath) + ") no-repeat'";
                                }
                            }
                            suspension += '<span ' + iconStyle + ' class="' + iconClass + '" val="' + item.value + '" js="' + js + '" ' + objtype + suspensionName + ' title="' + text + '"></span>';
                        }
                        m++;
                    }
                }
                return { suspension: suspension, lis: lis };
            },
            //转化数据
            _analyseItems: function (items, data) {
                for (var index in data) {
                    var item = data[index];
                    var currentItem = {};
                    //设定值
                    this.converItems(currentItem, item);
                    items.push(currentItem);
                }
                return items;
            },
            converItems: function (clientItem, serverItem) {
                $.extend(clientItem, serverItem);
                clientItem.text = serverItem.Text;
                clientItem.textId = serverItem.TextId;
                clientItem.value = serverItem.Value;
                clientItem.icon = serverItem.Icon;
                clientItem.js = serverItem.Script;
            }
        }
    })(jQuery);
}
HoteamUI.Control.OSelectedList = {
    Css: {
        ul: "HoteamUI_SelectedList_UL",
        icon: "HoteamUI_SelectedList_UL_ICON",
        selected: "HoteamUI_SelectedList_UL_Selected",
        hiddenRemove: "HoteamUI_SelectedList_UL_HiddenRemove"
    },
    Create: function (options) {
        var self = this;
        options = options || {};
        var pid = self.id;
        var id = pid + "_SelectedList";
        var handlers = options.controlInfo.PageHandlers;
        var o = options.controlInfo.CtrlOptions;
        o.o = HoteamUI.Control.Instance(pid);
        o.hiddenMove = o.hiddenMove == undefined ? false : o.hiddenMove;
        o.callback = {};
        $.each(handlers, function (index, val) {
            if (val.HandlerName == "OnRemove") {
                o.callback.onremove = self.GetEventFunctionName("OnRemove");
            } else if (val.HandlerName == "OnClick") {
                o.callback.onclick = self.GetEventFunctionName("OnClick");
            } else if (val.HandlerName == "OnDbClick") {
                o.callback.ondblcLick = self.GetEventFunctionName("OnDbClick");
            }
        });
        var container = $("<ul id='" + id + "' class='" + self.Css.ul + "'>").data("o", o);
        if (o.canRemove == false) {//如果行不能删除
            container.addClass(self.Css.hiddenRemove);
        }
        $("#" + pid).append(container);
        self._defaultHandlers_(o);
    },
    //批量添加数据
    AddRows: function (data) {
        var self = this;
        var container = $("#" + self.id + "_SelectedList");
        var o = container.data("o");
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            var title = obj.title || obj.Title || obj.text || obj.Text;
            var value = obj.value || obj.Value;
            var icon = obj.icon || obj.Icon;
            var nodeId = obj.nodeId || obj.NodeId;
            var pathName = obj.pathName || obj.PathName;
            if (self.CheckExistByValue(value)) continue;
            var li = $("<li>");
            li.data("d", obj).attr("data-value", value);
            var iconClass = "", iconStyle = "";
            if (icon) {
                if (icon.indexOf("~") < 0) {//是雪碧图，不是单独图片
                    iconClass = HoteamUI.Common.GetImage(icon, 16);
                } else {
                    iconStyle = 'style="background:url(' + icon.replace("~", PageInit.WebRootPath) + ') center no-repeat"';
                }
            }
            var spanicon = $("<span class='" + iconClass + "' " + iconStyle + "></span>");
            spanicon.addClass(self.Css.icon);

            var content = $("<span>");
            content.html(title).attr("title", title);

            li.append(spanicon.add(content));
            if (!o.hiddenMove) {
                li.append(
                '<span class="hoteam-selectlist-top"></span>' +
                '<span class="hoteam-selectlist-down"></span>');
                li.attr("style", "padding-right:80px");
            }
            li.append('<span class="HoteamUI_SelectedList_UL_delete basesprite b-gray-remove"></span>');
            container.append(li);
        }
    },
    //添加一条数据
    AddRow: function (obj) {
        this.AddRows([obj]);
    },
    //获取选中项的index
    GetSelectedIndex: function () {
        return $("#" + this.id + "_SelectedList li." + this.Css.selected).index();
    },
    //通过index设置项选中
    SetSelectByIndex: function (index) {
        if (index < 0) {
            return;
        }
        var id = this.id + "_SelectedList";
        var ul = $("#" + id);
        var o = ul.data("o");
        var li = ul.children(":eq(" + index + ")");
        if (li.length == 0) {
            return;
        }
        li.addClass(this.Css.selected);
        if (o.canRemove == false) {//如果不可以删除，则是互斥的
            li.siblings().removeClass(this.Css.selected);
        }
        ul.scrollTop(ul.scrollTop() + li.position().top - 5);
    },
    CheckExistByValue: function (val) {
        if ($("#" + this.id + "_SelectedList li[data-value='" + val + "']").length)
            return true;
        else
            return false;
    },
    RemoveSelected: function () {
        $("#" + this.id + "_SelectedList li." + this.Css.selected).remove();
    },
    RemoveAll: function () {
        $("#" + this.id + "_SelectedList").empty();
    },
    //此方法是获取内容区域的所有数据
    GetSelected: function () {
        var result = {
            titles: [],
            texts: [],
            values: [],
            nodeIds: [],
            pathNames: [],
            icons: []
        };
        $("#" + this.id + "_SelectedList li").each(function () {
            var obj = $(this).data("d");
            result.titles.push(obj.title || obj.Title);
            result.texts.push(obj.text || obj.Text);
            result.values.push(obj.value || obj.Value);
            result.nodeIds.push(obj.NodeId || obj.nodeId);
            result.pathNames.push(obj.pathName || obj.PathName);
            result.icons.push(obj.icon || obj.Icon);
        });
        return result;
    },
    //此方法是获取内容区域的选中的数据
    getCurrentSelected: function () {
        var result = {
            titles: [],
            texts: [],
            values: [],
            nodeIds: [],
            pathNames: [],
            icons: []
        };
        $("#" + this.id + "_SelectedList li." + this.Css.selected).each(function () {
            var obj = $(this).data("d");
            result.titles.push(obj.title || obj.Title);
            result.texts.push(obj.text || obj.Text);
            result.values.push(obj.value || obj.Value);
            result.nodeIds.push(obj.NodeId || obj.nodeId);
            result.pathNames.push(obj.pathName || obj.PathName);
            result.icons.push(obj.icon || obj.Icon);
        });
        return result;
    },
    _defaultHandlers_: function (o) {
        //绑定默认事件  单选
        var self = this;
        var ctrlEvent = { o: o.o };
        $("#" + this.id + "_SelectedList").on("click", "li", function () {
            if (o.rowrejection || o.canRemove == false) {
                if (!$(this).hasClass(self.Css.selected)) {
                    $(this).addClass(self.Css.selected);
                    $(this).siblings().removeClass(self.Css.selected);
                }
            } else {
                $(this).toggleClass(self.Css.selected);
            }
            if (o.callback.onclick) {
                var obj = $(this).data("d");
                ctrlEvent.text = obj.Text || obj.text;
                ctrlEvent.title = obj.title || obj.Title;
                ctrlEvent.value = obj.value || obj.Value;
                ctrlEvent.nodeId = obj.NodeId || obj.nodeId;
                ctrlEvent.pathName = obj.pathName || obj.PathName;
                ctrlEvent.icon = obj.icon || obj.Icon;
                HoteamUI.Common.ExeFunction(o.callback.onclick, ctrlEvent);
            }
        }).on("mouseenter", "li", function () {
            $(this).find(".hoteam-selectlist-top").css("display", "inline-block");
            $(this).find(".hoteam-selectlist-down").css("display", "inline-block");
        }).on("mouseleave", "li", function () {
            $(this).find(".hoteam-selectlist-top").hide();
            $(this).find(".hoteam-selectlist-down").hide();
        }).on("mouseenter", ".hoteam-selectlist-top", function () {
            $(this).css("display", "inline-block");
            $(this).next().css("display", "inline-block");
        }).on("mouseenter", ".hoteam-selectlist-down", function () {
            $(this).css("display", "inline-block");
            $(this).prev().css("display", "inline-block");
        }).on("click", ".hoteam-selectlist-top", function () {
            var li = $(this).parent();
            var prevLi = li.prev();
            if (prevLi.length == 0) {
                return;
            }
            var liclone = li.clone();
            liclone.data("d", li.data("d"));
            liclone.children(".hoteam-selectlist-top").hide();
            liclone.children(".hoteam-selectlist-down").hide();
            prevLi.before(liclone);
            li.remove();
            return false;
        }).on("click", ".hoteam-selectlist-down", function () {
            var li = $(this).parent();
            var nextLi = li.next();
            if (nextLi.length == 0) {
                return;
            }
            var liclone = li.clone();
            liclone.data("d", li.data("d"));
            liclone.children(".hoteam-selectlist-top").hide();
            liclone.children(".hoteam-selectlist-down").hide();
            nextLi.after(liclone);
            li.remove();
            return false;
        })

        //绑定默认双击移除事件
        $("#" + this.id + "_SelectedList").on("dblclick", "li", function () {
            if (o.canRemove != false) {
                if (o.callback.onremove) {
                    var obj = $(this).data("d");
                    ctrlEvent.text = obj.Text || obj.text;
                    ctrlEvent.title = obj.title || obj.Title;
                    ctrlEvent.value = obj.value || obj.Value;
                    ctrlEvent.nodeId = obj.NodeId || obj.nodeId;
                    ctrlEvent.pathName = obj.pathName || obj.PathName;
                    ctrlEvent.icon = obj.icon || obj.Icon;
                    HoteamUI.Common.ExeFunction(o.callback.onremove, ctrlEvent);
                    $(this).remove();
                }
            } else {
                $(this).addClass(self.Css.selected);
                $(this).siblings().removeClass(self.Css.selected);
            }
            if (o.callback.ondblcLick) {
                var obj = $(this).data("d");
                ctrlEvent.text = obj.Text || obj.text;
                ctrlEvent.title = obj.title || obj.Title;
                ctrlEvent.value = obj.value || obj.Value;
                ctrlEvent.nodeId = obj.NodeId || obj.nodeId;
                ctrlEvent.pathName = obj.pathName || obj.PathName;
                ctrlEvent.icon = obj.icon || obj.Icon;
                HoteamUI.Common.ExeFunction(o.callback.ondblcLick, ctrlEvent);
            }
        });
        $("#" + this.id + "_SelectedList").on({
            click: function () {
                var li = $(this).parent();
                if (o.callback.onremove) {
                    var obj = li.data("d");
                    ctrlEvent.text = obj.Text || obj.text;
                    ctrlEvent.title = obj.title || obj.Title;
                    ctrlEvent.value = obj.value || obj.Value;
                    ctrlEvent.nodeId = obj.NodeId || obj.nodeId;
                    ctrlEvent.pathName = obj.pathName || obj.PathName;
                    ctrlEvent.icon = obj.icon || obj.Icon;
                    HoteamUI.Common.ExeFunction(o.callback.onremove, ctrlEvent);
                }
                li.remove();
                return false;
            },
            mouseenter: function () {
                $(this).addClass("b-gray-remove-hover");
            },
            mouseleave: function () {
                $(this).removeClass("b-gray-remove-hover");
            }
        }, ".HoteamUI_SelectedList_UL_delete");
    }
}
HoteamUI.Control.OSelectedPagingList = {
    Css: {
        ul: "HoteamUI_SelectedList_UL HoteamUI_SelectedPagingList_UL",
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
        var container = $("<div class='HoteamUI_SelectedList_Prev'>" + HoteamUI.Language.Lang("Grid", "Prev") + "</div>" +
            "<ul id='" + id + "' class='" + self.Css.ul + "'></ul>" +
            "<div class='HoteamUI_SelectedList_Next'>" + HoteamUI.Language.Lang("Grid", "Next") + "<span class='HoteamUI_SelectedList_PagingInfo'></span></div>")
        $ul = $(container[1]);
        $ul.data("o", o);
        if (o.canRemove == false) {//如果行不能删除
            $ul.addClass(self.Css.hiddenRemove);
        }
        $("#" + pid).append(container);
        self._initPaging_();
        self._defaultHandlers_(o);
    },
    //批量添加数据
    AddRows: function (data) {
        this._updatePagingByAddRows_(data);
        var data = this._getCurrentPageRows_();
        var paging = this._getPaging_();
        this._RenderRows_(data, paging);

        this.UpdatePaging();
    },
    _RenderRows_: function (data, paging) {
        var self = this;
        var container = $("#" + self.id + "_SelectedList");
        container.empty();
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
            li.attr("data-index", (paging.currentIndex - 1) * paging.count + i);
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
            //if (!o.hiddenMove) {
            //    li.append(
            //        '<span class="hoteam-selectlist-top"></span>' +
            //        '<span class="hoteam-selectlist-down"></span>');
            //    li.attr("style", "padding-right:80px");
            //}
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
        var index = parseInt($("#" + this.id + "_SelectedList li." + this.Css.selected).attr("data-index"));
        if (isNaN(index)) {
            index = -1;
        }
        return index;
    },
    //通过index设置项选中
    SetSelectByIndex: function (index) {
        if (index < 0) {
            return;
        }
        var id = this.id + "_SelectedList";
        var ul = $("#" + id);

        var paging = this._getPaging_();
        var currentIndex = Math.ceil((index + 1) / paging.count);
        paging.currentIndex = currentIndex;
        this._RenderRows_(this._getCurrentPageRows_(), paging);
        var o = ul.data("o");
        var li = ul.find("li[data-index='" + index + "']");
        if (li.length == 0) {
            return;
        }
        li.addClass(this.Css.selected);
        if (o.canRemove == false) {//如果不可以删除，则是互斥的
            li.siblings().removeClass(this.Css.selected);
        }
        ul.scrollTop(ul.scrollTop() + li.position().top - 5);
        this.UpdatePaging();
    },
    CheckExistByValue: function (val) {
        if ($("#" + this.id + "_SelectedList li[data-value='" + val + "']").length)
            return true;
        else
            return false;
    },
    RemoveSelected: function () {
        var $selected = $("#" + this.id + "_SelectedList li." + this.Css.selected),
            index;
        this._removeRowByElem_($selected);
    },
    RemoveAll: function () {
        $("#" + this.id + "_SelectedList").empty();
        var paging = this._getPaging_();
        paging.data = [];
        paging.currentIndex = 1;
        paging.total = 0;
        this.UpdatePaging();
    },
    _removeRowByElem_: function ($elem) {
        var index = parseInt($elem.attr("data-index"));

        if (!isNaN(index)) {
            this._updatePagingByRemoveRows_([index]);
            this.UpdatePaging();
            var paging = this._getPaging_();
            var data = this._getCurrentPageRows_();
            this._RenderRows_(data, paging);
        }
    },
    //此方法是获取内容区域的所有数据
    GetSelected: function () {
        var result = {
            titles: [],
            texts: [],
            values: [],
            nodeIds: [],
            pathNames: [],
            icons: [],
            codes: []
        };
        var paging = this._getPaging_();
        var data = paging.data;
        $.each(data, function (i, obj) {
            result.titles.push(obj.title || obj.Title);
            result.texts.push(obj.text || obj.Text);
            result.values.push(obj.value || obj.Value);
            result.nodeIds.push(obj.NodeId || obj.nodeId);
            result.pathNames.push(obj.pathName || obj.PathName);
            result.icons.push(obj.icon || obj.Icon);
            result.codes.push(obj.code || obj.Code);
        });
        return result;
    },
    UpdatePaging: function () {
        var paging = this._getPaging_(),
            pageCount = Math.ceil(paging.total / paging.count),
            $prve = $("#" + this.id).find(".HoteamUI_SelectedList_Prev"),
            $next = $("#" + this.id).find(".HoteamUI_SelectedList_Next"),
            $pageInfo = $("#" + this.id).find(".HoteamUI_SelectedList_PagingInfo"),
            recordText = HoteamUI.Language.Lang("Grid", "RecordText");

        if (paging.currentIndex <= 1 || paging.total === 0) {
            $prve.removeClass("Active");
        }
        else {
            $prve.addClass("Active");
        }

        if (paging.currentIndex >= pageCount || paging.total === 0) {
            $next.removeClass("Active");
        }
        else {
            $next.addClass("Active");
        }

        if (paging.total) {
            recordText = recordText
                .replace(/\{0\}/, (paging.currentIndex - 1) * paging.count + 1)
                .replace(/\{1\}/, paging.currentIndex * paging.count < paging.total ? paging.currentIndex * paging.count : paging.total)
                .replace(/\{2\}/, paging.total);
        }
        else {
            recordText = "";
        }

        $pageInfo.text(recordText);

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
            debugger;
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

                    //var index = parseInt($(this).attr("data-index"));

                    //if (!isNaN(index)) {
                    //    self._updatePagingByRemoveRows_([index]);
                    //    self.UpdatePaging();
                    //    var paging = self._getPaging_();
                    //    var data = self._getCurrentPageRows_();
                    //    self._RenderRows_(data, paging);
                    //}
                    //$(this).remove();
                    self._removeRowByElem_($(this));
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
                debugger;
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
                //var index = parseInt(li.attr("data-index"));
                //if (!isNaN(index)) {
                //    self._updatePagingByRemoveRows_([index]);
                //    self.UpdatePaging();
                //    var paging = self._getPaging_();
                //    var data = self._getCurrentPageRows_();
                //    self._RenderRows_(data, paging);
                //}
                //li.remove();
                self._removeRowByElem_(li);
                return false;
            },
            mouseenter: function () {
                $(this).addClass("b-gray-remove-hover");
            },
            mouseleave: function () {
                $(this).removeClass("b-gray-remove-hover");
            }
        }, ".HoteamUI_SelectedList_UL_delete");

        var $prve = $("#" + this.id).find(".HoteamUI_SelectedList_Prev");
        var $next = $("#" + this.id).find(".HoteamUI_SelectedList_Next");

        $prve.on("click", function () {
            paging = self._getPaging_(),
                index = paging.currentIndex;

            --index;
            if (index <= 1) {
                index = 1;
            }

            paging.currentIndex = index;
            self._RenderRows_(self._getCurrentPageRows_(), paging);
            self.UpdatePaging();
        });
        $next.on("click", function () {
            paging = self._getPaging_(),
                index = paging.currentIndex,
                pageCount = Math.ceil(paging.total / paging.count);

            ++index;
            if (index >= pageCount) {
                index = pageCount;
            }

            paging.currentIndex = index;

            self._RenderRows_(self._getCurrentPageRows_(), paging);
            self.UpdatePaging();
        });
    },
    _initPaging_: function () {
        var container = $("#" + this.id + "_SelectedList");
        container.data("paging", {
            data: [],
            currentIndex: 1,
            total: 0,
            count: 12
        });
    },
    _getPaging_: function () {
        var container = $("#" + this.id + "_SelectedList"),
            paging = container.data("paging");

        return paging;
    },
    _getCurrentPageRows_: function () {
        var paging = this._getPaging_(),
            index = paging.currentIndex,
            start = (index - 1) * paging.count,
            end = start + paging.count,
            rows = paging.data.slice(start, end);

        return rows;
    },
    _setCurrentPageIndex_: function (index) {
        var paging = this._getPaging_();
        paging.currentIndex = index;
    },
    _updatePagingByAddRows_: function (data) {
        return this._addUniqRows_(data);
    },
    _updatePagingByRemoveRows_: function (data) {
        var paging = this._getPaging_(),
            rows = paging.data,
            pageCount;

        data = data || [];
        data = data.sort(function (a, b) { return b - a });
        for (var len = data.length - 1, i = len; i >= 0; i--) {
            rows.splice(data[i], 1);
        }
        paging.total = rows.length;
        pageCount = Math.ceil(paging.total / paging.count);
        if (paging.currentIndex > pageCount) {
            paging.currentIndex = pageCount || 1;
        }
        return rows;
    },
    _addUniqRows_: function (data) {
        var paging = this._getPaging_(),
            rows = paging.data,
            isExist = false;

        for (var i = 0, len = data.length; i < len; i++) {
            var item = data[i];
            isExist = false;
            for (var j = 0, lenj = rows.length; j < lenj; j++) {
                var row = rows[j];
                if ((row.value || row.Value) === (item.value || item.Value)) {
                    isExist = true;
                }
            }
            if (!isExist) {
                rows.push(item);
            }
        }
        paging.total = rows.length;

        return rows;
    }
}
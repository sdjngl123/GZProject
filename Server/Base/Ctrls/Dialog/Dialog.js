$.hoteamDialog = {
    defaults: {
        id: null,
        height: "60%",
        width: "60%",
        title: "",
        modal: true,
        position: "center",
        display: "none",
        autoClosedTime: null,
        draggable: true,
        resizable: true,
        callback: null,
        data: {},
        minWindow: false,
        maxWindow: false,
        minHideAll: false,
        afterOpen: null,
        afterClose: null,
        icon: HoteamUI.AppSets.DefaultIcon,
        name: ""
    },
    defaultAfterMaxHandler: function (dialogContainer) {

    },
    create: function (options) {
        var o = $.extend({}, this.defaults, options);
        //设置参数
        var dialogId = o.id;
        window.hoteamctrl = window.hoteamctrl || {};
        window.hoteamctrl[dialogId] = {};
        var thisdialog = window.hoteamctrl[dialogId];
        thisdialog.data = o.data;
        thisdialog.callback = o.callback;
        thisdialog.options = o;
        var height = o.height;
        var width = o.width;
        if (height && height.indexOf("%") > 0) {
            var bodyHeight = $(document).height();
            o.height = Math.round(bodyHeight * (parseInt(height) / 100));
        }
        if (width && width.indexOf("%") > 0) {
            var bodyWidth = $(document).width();
            o.width = Math.round(bodyWidth * (parseInt(width) / 100));
        }
        if (height === "100%" && width === "100%") {
            o.height = o.height - 10;
        }
        o.beforeClose = function (event, ui) {
            var canClose = true;
            //点击关闭按钮处理
            var isCloseClick = event.originalEvent ? true : false;
            if (isCloseClick) {
                var result = HoteamUI.Page.FirePageEvent(o.id, "OnDialogCloseClick", { data: o.data });
                if (result && result.close == false) {
                    canClose = false;
                }
                else if (result && result.close != false && $.isFunction(o.callback)) {
                    o.callback(o.data, result.result);
                    delete window.hoteamctrl[o.id];
                }
                else {
                    if ($.isFunction(o.callback))
                        o.callback(o.data, undefined);
                    delete window.hoteamctrl[o.id];
                }
            }
            //通用关闭处理
            if (canClose != false) {
                if (o.display != "none") {
                    $("#" + o.id).parent().hide('slide', { direction: o.display }, function () {
                        var result = HoteamUI.UIManager.Close(o.id);
                        if (result && result == false) {
                            return;
                        }
                        $.hoteamDialog.destory(o.id, o.afterClose);
                    });
                }
                else {
                    var result = HoteamUI.UIManager.Close(o.id);
                    if (result && result == false) {
                        return;
                    }
                    $.hoteamDialog.destory(o.id, o.afterClose);
                }
            }
            return false;
        }
        //设置页面标题
        $("#PageContainer").append('<div id="' + dialogId + '"  title="' + HoteamUI.Common.HtmlEscape(o.title) + '"  class="hoteamDialog"><div class="hoteam-dialog-overlay"/></div>');
        //绑定信息和事件
        var dialog = $("#" + dialogId);
        dialog.dialog(o)
            .attr("data-modulename", o.name)
            .bind("dialogresizestart", function (event, ui) {
                dialog.find(".hoteam-dialog-overlay").show();

            })
            .bind("dialogresizestop", { id: dialogId }, function (event, ui) {
                var bodyHeight = $("body").height();
                var id = event.data.id;
                var bottomY = ui.position.top + ui.size.height;
                var content = $("#" + id);
                content.find(".hoteam-dialog-overlay").hide();
                if (bodyHeight < bottomY) {
                    var title = content.prev();
                    var container = content.parent();
                    content.height(container.height() - title.height() - 15);
                }
                $("#" + id).data("resized", true);
                $.hoteamDialog.resize(id, 100);
            });
        dialog.prev().find(">a").attr("tabIndex", "-1");
        //因为dialog最外层添加了两个1px的边框，将dialog向上移动2px
        dialog.parent().css("top", parseInt(dialog.parent().css("top")) - 2).css("position", "absolute");
        //桌面模式最大化处理
        if (height === "100%" && width === "100%") {
            $.hoteamDialog.defaultAfterMaxHandler(dialog.parent(), dialog);
        }

        if (o.minWindow == true) {
            dialog.prev().append('<a tabIndex="-1" class="ui-dialog-titlebar-hide" role="button" href="javascript:void(0)" ><span class="basesprite b-dialog-min"  /></a>');

            var hidebutton = dialog.prev().find(".ui-dialog-titlebar-hide");
            hidebutton.click(function () {
                if (dialog.parent().attr("data-ismin") == "true")
                    $.hoteamDialog.show(dialogId);
                else
                    $.hoteamDialog.hide(dialogId, o.minHideAll);
            }).hover(function () {
                $(this).children("span").removeClass("b-dialog-min").addClass("b-dialog-min-focus");
            }, function () {
                $(this).children("span").removeClass("b-dialog-min-focus").addClass("b-dialog-min");
            });
        }

        if (o.maxWindow == true) {
            dialog.prev().append('<a tabIndex="-1" class="ui-dialog-titlebar-max" style="outline:none;" role="button" href="javascript:void(0)" ><span class="basesprite b-dialog-max"  /></a>');

            var hidebutton = dialog.prev().find(".ui-dialog-titlebar-max");
            hidebutton.click(function () {
                $.hoteamDialog.maxWindow(dialogId, o.afterMax);
            }).hover(function () {
                $(this).children("span").removeClass("b-dialog-max").addClass("b-dialog-max-focus");
            }, function () {
                $(this).children("span").removeClass("b-dialog-max-focus").addClass("b-dialog-max");
            });

            dialog.prev().on("dblclick", function (e) {
                if ($(e.target).closest("a").length) {
                    return;
                }
                $.hoteamDialog.maxWindow(dialogId, o.afterMax);
            });
        }

        //将关闭按钮样式替换
        dialog.prev().find(".ui-icon-closethick")
            .addClass("basesprite").addClass("b-dialog-close")
            .hover(function () {
                $(this).removeClass("b-dialog-close").addClass("b-dialog-close-focus");
            }, function () {
                $(this).removeClass("b-dialog-close-focus").addClass("b-dialog-close");
            }).html("");

        if (o.display != "none") {
            dialog.parent().hide().show('slide', { direction: o.display });
        }
        if (o.autoClosedTime != null) {
            var time = parseInt(o.autoClosedTime) * 1000;
            this.autoClosed(o.id, time);
        }
        //ocx遮盖处理
        if (o.modal) {
            $("object:visible").addClass("ocxhideid" + o.id).hide();
            $("embed:visible").addClass("ocxhideid" + o.id).hide();
            $("applet:visible").addClass("ocxhideid" + o.id).hide();
        }
        dialog.parent().addClass("hoteam-dialog");

        if ($.isFunction(o.afterOpen)) {
            o.afterOpen(dialog.parent());
        }
        dialogocx();
        dialog.parent().mousedown(function () {
            dialogocx();
        });

        function dialogocx() {
            //24178 李金岳
            var ocxs = dialog.find("object,applet");
            $(".ui-dialog object:visible,.ui-dialog embed:visible,.ui-dialog applet:visible").not(ocxs).hide();
            ocxs.filter("*:hidden").show();
        }
    },
    //销毁Dialog
    destory: function (id, afterClose) {
        //ocx遮盖处理
        $("object.ocxhideid" + id).removeClass("ocxhideid" + id).show();
        $("embed.ocxhideid" + id).removeClass("ocxhideid" + id).show();
        $("applet.ocxhideid" + id).removeClass("ocxhideid" + id).show();
        $("#" + id).dialog("destroy").remove2();
        if ($.isFunction(afterClose)) {
            afterClose(id);
        }
    },
    loadPage: function (id, pagename, paras) {
        HoteamUI.UIManager.Show(id, pagename, paras);
        var firstInput = $("#" + id).find("input[type='text']").not("[readonly],[disabled]").eq(0);
        if (firstInput.length > 0) {
            setFocusLast(firstInput);
        }
        function setFocusLast(ele) {
            if (ele.length > 0) {//如果存在ele
                ele.focus();
                if (window.getSelection) {//ie11,10,9,ff,sa
                    var maxLen = ele.val().length;
                    ele[0].setSelectionRange(maxLen, maxLen);
                } else if (document.selection) {//ie10,9,8,7,6,5
                    var range = ele[0].createTextRange();
                    range.collapse(false);
                    range.select();
                }
            }
        }
    },
    show: function (id, minHideAll) {
        var dialog = $("#" + id);
        var dialogContainer = dialog.parent();
        dialog.dialog("option", "resizable", true);
        var dialogContainerHeight = dialog.data("dialogContainerHeight");
        var bottom = dialogContainerHeight + parseFloat(dialogContainer.css("top"));
        var bodyHeight = $(window).height();
        if (bottom > bodyHeight) {
            dialogContainer.css("top", (bodyHeight - dialogContainerHeight - 10) + "px");
        }

        if (minHideAll) {
            dialogContainer.show();

        }
        else {
            dialog.show();
        }

        dialogContainer.width(dialog.width());
        dialogContainer.removeAttr("data-ismin");
    },
    hide: function (id, minHideAll) {
        var dialog = $("#" + id);
        var dialogContainer = dialog.parent();
        if (minHideAll) {

            dialogContainer.hide();
        }
        else {
            if (dialog.data("dialogContainerBeforMaxSize"))
                return;
            dialog.dialog("option", "resizable", false);
            dialog.data("dialogContainerHeight", dialogContainer.height());

            var height = dialogContainer.height();
            dialog.data("resizeHeight", height);
            dialogContainer.height("auto");

            dialog.hide();

        }
        dialogContainer.attr("data-ismin", "true");
    },
    maxWindow: function (id, afterMax) {

        var dialog = $("#" + id);
        var dialogContainer = dialog.parent();
        if (dialogContainer.attr("data-ismin") == "true") {
            return;
        }
        if (dialog.data("dialogContainerBeforMaxSize")) {
            dialog.dialog("option", { resizable: true, draggable: true });
            var size = dialog.data("dialogContainerBeforMaxSize");
            var position = dialog.data("dialogContainerBeforMaxPosition");

            dialog.width(size.width);
            dialog.height(size.height);

            dialogContainer.css("width", size.width + 2);
            dialogContainer.css({
                top: position.top,
                left: position.left
            });
            dialog.removeData("dialogContainerBeforMaxSize");
            dialog.removeData("dialogContainerBeforMaxPosition");
        }
        else {
            dialog.dialog("option", { resizable: false, draggable: false });
            dialog.data("dialogContainerBeforMaxSize", { height: dialog.height(), width: dialog.width() });
            dialog.data("dialogContainerBeforMaxPosition", dialogContainer.position());

            dialog.width($(window).width() - 8);
            dialog.height($(window).height() - 50);
            dialogContainer.width($(window).width() - 8);
            dialogContainer.css({
                top: 0,
                left: 0
            });
            $.hoteamDialog.defaultAfterMaxHandler(dialogContainer, dialog);

        }

        $.hoteamDialog.resize(id, false);
    },
    autoClosed: function (id, time) {
        function autoClosed(id) {
            $("#" + id).dialog("close");
        }
        function _autoClosed(id) {
            return function () { autoClosed(id); }
        }

        if (time == 0 || !time) {
            autoClosed(id);
        }
        else {
            window.setTimeout(_autoClosed(id), time);
        }
    },
    resize: function (id, resetPosition) {

        var childrenID = $("div[parentid='" + id + "']").attr("id");
        var obj = $("#" + id);

        var dialogContainer = obj.parent();
        var title = $(".ui-dialog-titlebar", dialogContainer);


        //padding值
        obj.height(dialogContainer.height() - 35);
        obj.width(dialogContainer.width());

        obj.parent().css({
            height: "auto"
        });

        //重新设置子容器的大小
        var ctrlObject;
        if (childrenID) {
            ctrlObject = HoteamUI.Control.Instance(childrenID);
            ctrlObject.Resize();
        }


        if (resetPosition == true) {
            var position = hoteamctrl[id].options.position;
            obj.dialog("option", "position", position);

        }
    },
    setTitle: function (CObj, title) {
        var dialogTitle = CObj.prev();
        if (dialogTitle.hasClass("ui-dialog-titlebar")) {
            dialogTitle.children("span").append(title);
        }
    },
    diglogReutrn: function (id, isClose) {
        var ctrldata = hoteamctrl[id];
        if (ctrldata) {
            ctrldata.callback(ctrldata.data, ctrldata.ret);
            if (isClose) {
                delete hoteamctrl[id];
            }
        }
    }
};




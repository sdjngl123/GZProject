HoteamUI.Control.OPageGrid = {
    Create: function (options) {
        options = options || {};
        var ctrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions;
        var o = {};
        o.pId = this.id;
        o.id = this.GetId();
        o.height = ctrlOptions.height;
        o.cols = ctrlOptions.cols;
        $.hoteamPageGrid.create(o);
    },
    LoadPages: function (obj) {
        var id = this.GetId();
        var divC = $("#" + id);
        var o = divC.data("o");
        if (obj.cols) o.cols = obj.cols;
        if (obj.height) o.height = obj.height;
        o.data = obj.data;
        o.setting = obj.setting;
        $.hoteamPageGrid.extendData(o);
        $.hoteamPageGrid.loadPages(o);
    },
    ResetPageGrid: function (setting) {
        var o = $("#" + this.GetId()).data("o");
        o.setting = setting;
        $.hoteamPageGrid.extendData(o);
        $.hoteamPageGrid.loadPages(o);
    },
    GetChildPageIDByName: function (name) {
        var id;
        var divParent = $("#" + this.GetId());
        var page = divParent.find("[name='" + name + "']")[0];
        if (page !== 'undefined') {
            id = page.id;
        }
        return id;
    },
    GetId: function () {
        return this.id + "_PageGrid";
    },
    Resize: function () {
        $.hoteamPageGrid.resize(this.GetId());
    }
};
{
    (function ($) {
        $.hoteamPageGrid = {
            defaults: {
                height: 300,
                cols: 3
            },
            create: function (o) {
                o = $.extend({}, this.defaults, o);
                $("#" + o.pId).append('<div class="hoteam-pageGrid" id="' + o.id + '"></div>');
                $("#" + o.id).data("o", o);
            },
            loadPages: function (o) {
                var id = o.id,
                    divC = $("#" + id).empty(),
                    data = o.data,
                    num = data.length;
                var everyWidth = this.getEveryWidth(o);
                var conStr = '';
                for (var i = 0; i < num; i++) {
                    var guid = HoteamUI.UIManager.NewGUID();
                    var obj = data[i];
                    var displayStyle = '';
                    if (obj.isHidden == true) {
                        displayStyle = 'display:none;';
                    }
                    conStr += '<div class="pageGrid-ele-v" style="width:' + everyWidth + 'px;height:' + o.height + 'px;' + displayStyle + '" oldWidth="' + everyWidth + '">' +
                            '<div class="pageGrid-ele-v-title">' + obj.title + '</div>' +
                            '<div id="' + guid + '" name="' + obj.name + '" class="pageGrid-ele-v-content"></div>' +
                        '</div>';
                }
                divC.append(conStr);
                var divs = divC.find("div.pageGrid-ele-v-content");
                for (var i = 0; i < num; i++) {
                    var div = $(divs[i]),
                        divId = div.attr("id");
                    if (div.closest(".pageGrid-ele-v").css("display") !== "none") {
                        div.attr("hasLoaded", "Y");
                        HoteamUI.UIManager.Show(divId, data[i].pageName, data[i].pageParas);
                    }
                }
            },
            //resetPageGrid: function (o) {
            //    var id = o.id,
            //        divC = $("#" + id),
            //        data = o.data,
            //        everyWidth = this.getEveryWidth(o),
            //        divEles = divC.children();
            //    divEles.css("width", everyWidth);
            //    //for (var i in data) {
            //    for (var i = 0; i < data.length; i++) {
            //        var obj = data[i];
            //        var divEle = $(divEles[i]);
            //        if (obj.isHidden == true && divEle.css("display") != "none") {
            //            divEle.hide();
            //        }
            //        if (obj.isHidden != true && divEle.css("display") == "none") {
            //            divEle.show().attr("needResize", (divEle.attr("oldWidth") == everyWidth ? 'N' : 'Y'));
            //            divEle.attr("oldWidth", everyWidth);
            //        }
            //    }
            //    divEles.each(function (i) {
            //        var ele = $(this);
            //        var obj = data[i];
            //        if (ele.css("display") != "none") {
            //            var child = ele.children(".pageGrid-ele-v-content");
            //            if (!child.attr("hasLoaded")) {
            //                child.attr("hasLoaded", 'Y');
            //                HoteamUI.UIManager.Show(child.attr("id"), obj.pageName, obj.pageParas);
            //            }
            //        }
            //        if (ele.attr("needResize")) {
            //            ele.removeAttr("needResize");
            //            HoteamUI.Control.Instance(child.children().attr("id")).Resize();
            //        }
            //    });
            //},
            extendData: function (o) {
                var setting = HoteamUI.Common.GetPersonalSetting(o.setting);
                if (setting) {
                    setting = JSON.parse(setting);
                    o.cols = setting.cols;
                    var newData = [];
                    $.each(setting.data, function (j) {
                        $.each(o.data, function (i) {
                            if (o.data[i].name == setting.data[j].id) {
                                o.data[i].isHidden = setting.data[j].hidden;
                                newData.push(o.data[i]);
                                return;
                            }
                        });
                    });

                    if (newData.length > 0) {
                        o.data = newData;
                    }
                }
            },
            getEveryWidth: function (o) {
                var id = o.id,
                    divC = $("#" + id),
                    divCHeight = divC.height(),
                    divCWidth = divC.width(),
                    data = o.data,
                    cols = parseInt(o.cols),
                    rowHeight = o.height + 2,
                    num = data.length,
                    rowNum = parseInt(num / cols) + (num % cols == 0 ? 0 : 1),
                    scrollWidth = 0;
                if (rowNum * rowHeight > divCHeight) {
                    scrollWidth = HoteamUI.Common.GetScrollbarWidth();
                }
                return parseInt((divCWidth - scrollWidth - cols * 4) / cols);
            },
            resize: function (id) {
                var divC = $("#" + id);
                var o = divC.data("o");
                var everyWidth = this.getEveryWidth(o);
                var divEles = divC.children().css("width", everyWidth);
                divEles.each(function () {
                    var ele = $(this);
                    if (ele.css("display") != "none") {
                        var child = ele.children(".pageGrid-ele-v-content").children();
                        HoteamUI.Control.Instance(child.attr("id")).Resize();
                    }
                });
            }
        }
    })(jQuery);
}
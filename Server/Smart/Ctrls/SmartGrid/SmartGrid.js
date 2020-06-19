/*\
*   对外开放接口层
*   HoteaUI控件连接层
*   不负责数据转换和实际业务处理
\*/
HoteamUI.Control.OSmartGrid = {
    Create: function (options) {
        options = options || {};
        var controlInfo = (options.controlInfo || this.ControlInfo());
        var opt = $.extend(true, {}, $.hoteamSmartGrid.defaults);
        $.hoteamSmartGrid.setGridRowTitleFromPageConfig(opt, controlInfo.CtrlOptions);

        opt.parentId = this.id;
        opt.id = this.GetId();
        opt.ctrlEvent = {};
        opt.ctrlEvent.o = this;
        for (var i in controlInfo.PageHandlers) {
            var item = controlInfo.PageHandlers[i];
            switch (item.HandlerName) {
                case "OnLoadRows":
                    opt.handlers.OnLoadRows = this.GetEventFunctionName("OnLoadRows");
                    break;
                case "OnColImageClick":
                    opt.handlers.OnColImageClick = this.GetEventFunctionName("OnColImageClick");
                    break;
                case "OnColLinkClick":
                    opt.handlers.OnColLinkClick = this.GetEventFunctionName("OnColLinkClick");
                    break;
                case "OnRowDblClick":
                    opt.handlers.OnRowDblCLick = this.GetEventFunctionName("OnRowDblClick");
                    break;
                case "OnRowClick":
                    opt.handlers.OnRowClick = this.GetEventFunctionName("OnRowClick");
                    break;
                default: break;
            }
        }
        $.hoteamSmartGrid.create(opt);

    },
    LoadColTitle: function (gridOptions) {
        if (gridOptions.data) {
            var gridContainer = $("#" + this.id);
            var opt = gridContainer.data("gridOptions");
            $.hoteamSmartGrid.setGridRowTitleFromServer(opt, gridOptions);
            $.hoteamSmartGrid.create(opt);
        }
    },
    GetPagerInfo: function () {
        return $.hoteamSmartGrid.getPagerInfo($("#" + this.id));
    },
    SetPagerInfo: function (pageInfo) {
        $.hoteamSmartGrid.setPagerInfo($("#" + this.id), pageInfo);
    },
    LoadGridRows: function (data) {
        var grid = $("#" + this.GetId());
        return $.hoteamSmartGrid.loadRowData(grid, data);
    },
    ClearGridRows: function () {
        var grid = $("#" + this.GetId());
        return $.hoteamSmartGrid.loadRowData(grid, { RecordsTotal: 0, Rows: [] });
    },
    GetSelectedRows: function () {
        var gridContainer = $("#" + this.id);
        return $.hoteamSmartGrid.getSelectedRow(gridContainer);
    },
    SetSelectedRow: function (rows) {
        var gridContainer = $("#" + this.id);
        $.hoteamSmartGrid.setSelectedRow(gridContainer, rows);
    },
    GetCurrentPageRows: function () {
        var gridContainer = $("#" + this.id);
        return $.hoteamSmartGrid.getCurrentPageRow(gridContainer);
    },
    RemoveSelectedRows: function () {
        var gridContainer = $("#" + this.id);
        $.hoteamSmartGrid.removeSelectedRows(gridContainer);
    },
    ShowButton: function (btnName) {
        var gridContainer = $("#" + this.id);
        $.hoteamSmartGrid.showButton(gridContainer, btnName);
    },
    HideButton: function (btnName) {
        var gridContainer = $("#" + this.id);
        $.hoteamSmartGrid.hideButton(gridContainer, btnName);
    },
    AddRows: function (data) {
        var gridContainer = $("#" + this.id);
        $.hoteamSmartGrid.addRows(gridContainer, data);
    },
    SetListRightMenu: function (rightmenuid) {
        /*\
        *  右键菜单单独处理业务。
        \*/
        var grid = $("#" + this.GetId());
        var gridContainer = $("#" + this.id);
        var rightMenu = $("#" + rightmenuid);
        var self = this;
        grid.find("div." + $.htGrid.css.girdBody + " table").on({
            mousedown: function (e) {
                if (e.which == 3) {
                    $.hoteamRightMenu.clearTimeOutIdList();
                    $("body").on({ contextmenu: function () { return false; } });
                    $("ul.hoteam-rightmenu").hide();
                    //问题51：开始
                    var windowHeight = $(window).height();
                    var rightmenuHeight = 0;
                    var x = e.pageX,
                        y = e.pageY;
                    //结束
                    $.hoteamSmartGrid.resetSelectedRow(gridContainer);
                    self.SetSelectedRow($(this).index());
                    var selectedrow = self.GetSelectedRows();
                    var objectType = selectedrow[0].EID;
                    if (objectType) {
                        objectType = selectedrow[0].EID.substring(0, selectedrow[0].EID.indexOf('_'));
                        rightMenu.find("li[objtype!='" + objectType + "']").hide();

                        if (rightMenu.find("li[objtype='" + objectType + "']").show().size() > 0) {
                            rightMenu.show();
                        }
                        else if (rightMenu.find("li[objtype='rightMenuCommon']").show().size() > 0) {
                            rightMenu.show();
                        }
                    }
                    //问题51：开始
                    rightmenuHeight = rightMenu.height();
                    if (e.pageY + rightmenuHeight > windowHeight) {
                        y = -rightmenuHeight + windowHeight;
                    }
                    rightMenu.css({
                        top: y,
                        left: x
                    });
                    //结束
                    $.hoteamRightMenu.pushTimeOutId(window.setTimeout(function () {
                        $("body").off("contextmenu");
                    }, 500));

                }
            }
        }, "tr");
    },
    SetSuspension: function (suspensionid) {
        var grid = $("#" + this.GetId());
        var gridid = this.id;
        var gridContainer = $("#" + this.id);
        var osuspension = $("#" + suspensionid);
        grid.find(".htGrid_body").on({
            mouseenter: function (e) {
                if (gridContainer.find(".htGrid_body").attr("model") == "image") {
                    return;
                }
                var td = $(this).find("td[showrowoperate='showrowoperate']");
                if (td.length < 1) {
                    return;
                }
                //将已经渲染好的suspension复制到td里去
                var suspension = td.children("div").children(".hoteam-suspension");
                if (suspension.length == 0) {//如果里面已经渲染了则不进入下面{}的代码
                    td.children("div").append(osuspension.clone(true).removeAttr("id"));
                    suspension = td.children("div").children(".hoteam-suspension");
                }
                var eid = $(this).find("td[data-colname='EID']").text();
                if (eid) {
                    objectType = eid.substring(0, eid.indexOf('_'));
                    suspension.find("span[objtype='" + objectType + "']").show();
                    suspension.find("span[objtype!='" + objectType + "']").hide();
                    var ul = suspension.find("ul");
                    ul.find("li[objtype!='" + objectType + "']").hide();
                    if (ul.find("li[objtype='" + objectType + "']").show().size() > 0) {
                        suspension.find("span.hoteam-suspension-more").show();
                    } else {
                        suspension.find("span.hoteam-suspension-more").hide();
                    }
                    var tdPosition = td.offset();
                    suspension.show();
                    suspension.data("index", $(this).index());
                    suspension.data("gridid", gridid);
                }
            },
            mouseleave: function () {
                var td = $(this).find("td[showrowoperate='showrowoperate']");
                td.find(".hoteam-suspension").hide();
            }
        }, "tr");
    },
    Resize: function () {
        $.hoteamSmartGrid.resize($("#" + this.id));
    },
    GetId: function () {
        return this.id + "_Grid";
    },
    ChangeModel: function (model) {
        $.hoteamSmartGrid.changeModel(this.id, model);
    }
}


/*\
*   中间数据转换层
*   控件接口调用层
*   不负责实际业务处理
\*/
{
    (function ($, undefined) {
        "user strict";
        $.hoteamSmartGrid = {
            defaults: {
                parentId: null,
                id: null,
                ctrlEvent: null,
                setting: {
                    datatype: 'local',
                    rowNum: 10000000,
                    autoLoadData: true,
                    autowidth: true,
                    viewrecords: true,
                    sortable: false,
                    height: 0,
                    minWidth: null,
                    multiselect: true,
                    pager: null,
                    showPageBar: true,
                    rownumbers: true,
                    topLine: true,
                    leftLine: true,
                    colNames: [],
                    colModel: [],
                    rowList: [20, 50, 100, 200]
                },
                handlers: {
                    OnLoadRows: null,
                    OnColImageClick: null,
                    OnColLinkClick: null,
                    OnRowDblCLick: null,
                    OnRowClick: null
                }
            },
            colModelDefaults: {
                name: null,
                sortable: false,
                hidden: false,
                width: null,
                resizable: false,
                textalign: "left"
            },
            serverTitleDefaults: {
                data: null,
                multiselect: true,
                autoLoadData: true,
                showPageBar: true,
                minWidth: true,
                rowList: null,
                id: null
            },
            create: function (option) {
                $.htSmartGrid.create(option);
            },
            loadRowData: function (grid, data) {
                if (data.RecordsTotal == 0) {
                    data.RecordsTotal = data.Rows.length;
                }
                $.htSmartGrid.loadRowData(grid, data);
            },
            getPagerInfo: function (gridContainer) {
                return $.htSmartGrid.getPageInfo(gridContainer);
            },
            resetSelectedRow: function (gridContainer) {
                $.htSmartGrid.resetSelectedRow(gridContainer);
            },
            setPagerInfo: function (gridContainer, pageInfo) {
                $.htSmartGrid.setPageInfo(gridContainer, pageInfo);
            },
            getSelectedRow: function (gridContainer) {
                return $.htSmartGrid.getSelectedRow(gridContainer);
            },
            setSelectedRow: function (gridContainer, rows) {
                $.htSmartGrid.setSelectedRow(gridContainer, rows);
            },
            resize: function (gridContainer) {
                $.htSmartGrid.resize(gridContainer);
            },
            getCurrentPageRow: function (gridContainer) {
                return $.htSmartGrid.getCurrentPageRow(gridContainer);
            },
            removeSelectedRows: function (gridContainer) {
                $.htSmartGrid.removeSelectedRows(gridContainer);
            },
            showButton: function (gridContainer, btnName) {
                $.htSmartGrid.showButton(gridContainer, btnName, true);
            },
            hideButton: function (gridContainer, btnName) {
                $.htSmartGrid.showButton(gridContainer, btnName, false);
            },
            showTitleButton: function (gridContainer, btnName, show) {
                $.htSmartGrid.showTitleButton(gridContainer, btnName, show);
            },
            addRows: function (gridContainer, data) {
                $.htSmartGrid.addRows(gridContainer, data);
            },
            setGridRowTitleFromPageConfig: function (defaults, options) {
                var colNames = [], colModel = [];

                this.__baseOptionTransform__(defaults, options);
                defaults.setting.addButton = $.extend(true, {}, options.addButton, defaults.setting.addButton);
                defaults.setting.titleButton = $.extend(true, {}, options.titleButton, defaults.setting.titleButton);
                for (var i in options) {
                    if (i.indexOf("item") > -1) {
                        var model = $.extend(true, {}, this.colModelDefaults);
                        var col = options[i];

                        //添加标题列名
                        if (col.textId) {
                            colNames.push(HoteamUI.Language.Lang(col.textId));
                        }

                        //设置model值
                        model.name = col.name || "null";
                        model.width = col.width === undefined ? model.width : col.width;
                        model.sortable = col.sortable === undefined ? model.sortable : col.sortable;
                        model.resizable = col.resizable === undefined ? model.resizable : col.resizable;
                        model.textalign = col.textalign == undefined ? model.textalign : col.textalign;
                        model.colType = col.colType;
                        model.jsmethod = col.jsmethod;
                        colModel.push(model);
                    }
                }
                defaults.setting.colModel = colModel;
                defaults.setting.colNames = colNames;
            },
            setGridRowTitleFromServer: function (defaults, options) {
                options = $.extend(true, {}, this.serverTitleDefaults, options);

                this.__baseOptionTransform__(defaults, options);
                var colNames = [], colModel = [];
                for (var i in options.data) {
                    var item = options.data[i];
                    //添加标题列
                    colNames.push(item.Text);

                    //设置model值
                    var model = $.extend(true, {}, this.colModelDefaults);
                    model.name = item.Name;
                    model.sortable = item.Sortable;
                    model.resizable = item.Resizable;
                    model.textalign = item.TextAlign;
                    model.showmode = item.ShowMode;
                    model.jsmethod = item.JSMethod;
                    model.suspensionmenufield = options.SuspensionMenuField;
                    if (item.Width > -1) {
                        model.width = item.Width;
                    }
                    switch (item.ColType) {
                        case 1:
                            model.colType = "hidden";
                            break;
                        case 2:
                            model.colType = "image";
                            break;
                        case 3:
                            model.colType = "link";
                            break;
                        case 4:
                            model.colType = "progress";
                            break;
                        default: break;
                    }
                    colModel.push(model);
                }
                defaults.setting.colModel = colModel;
                defaults.setting.colNames = colNames;
            },
            __baseOptionTransform__: function (defaults, options) {
                defaults.setting.multiselect = options.multiselect === undefined ? defaults.setting.multiselect : options.multiselect;
                defaults.setting.rowrejection = options.rowrejection === undefined ? defaults.setting.rowrejection : options.rowrejection;
                defaults.setting.autoLoadData = options.autoLoadData === undefined ? defaults.setting.autoLoadData : options.autoLoadData;
                defaults.setting.showPageBar = options.showPageBar === undefined ? defaults.setting.showPageBar : options.showPageBar;
                defaults.setting.leftLine = options.leftLine === undefined ? defaults.setting.leftLine : options.leftLine;
                defaults.setting.topLine = options.topLine === undefined ? defaults.setting.topLine : options.topLine;
                //转换页码设置
                if (options.rowList) {
                    defaults.setting.rowList = eval("[" + options.rowList + "]");
                }
            },
            changeModel: function (id, model) {
                $.htSmartGrid.changeDisplayStyle(id, model);
            }
        }
    })(jQuery);
}
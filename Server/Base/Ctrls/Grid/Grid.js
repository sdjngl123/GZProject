/*\
*   对外开放接口层
*   HoteaUI控件连接层
*   不负责数据转换和实际业务处理
\*/
HoteamUI.Control.OGrid = {
    Create: function (options) {
        options = options || {};
        var controlInfo = (options.controlInfo || this.ControlInfo());
        var opt = $.extend(true, {}, $.hoteamGrid.defaults);
        $.hoteamGrid.setGridRowTitleFromPageConfig(opt, controlInfo.CtrlOptions);
        opt.parentId = this.id;
        opt.id = this.GetId();
        opt.autofit = options.autofit;
        opt.containerid = options.containerid;
        opt.ctrlEvent = {};
        opt.ctrlEvent.o = this;
        //for (var i in controlInfo.PageHandlers) {
        for (var i = 0; i < controlInfo.PageHandlers.length; i++) {
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
                case "OnLoadSuccess":
                    opt.handlers.OnLoadSuccess = this.GetEventFunctionName("OnLoadSuccess");
                    break;
                case "OnSelectedStatusChange":
                    opt.handlers.OnSelectedStatusChange = this.GetEventFunctionName("OnSelectedStatusChange");
                    break;
                case "OnSort":
                    opt.handlers.OnSort = this.GetEventFunctionName("OnSort");
                    break;
                default: break;
            }
        }
        $.hoteamGrid.create(opt);
    },
    //加载列表头信息
    //特别说明1：titleOptions7.4.0版本格式：{data:{ColumnData:[],ColumnLink:...},....(列表属性)}
    //2 老版本格式：{data:[],.....(列表属性)}
    LoadColTitle: function (titleOptions) {
        var opt = $("#" + this.GetId()).data("option");
        $("#" + this.GetId()).htGrid("destroy");
        //处理并合并参数
        $.hoteamGrid.setGridRowTitleFromServer(opt, titleOptions);
        if (titleOptions.data instanceof Array) {//如果传递进来的时数组（兼容7.4.0之前的版本）
            $.hoteamGrid.create(opt);
        } else {//如果不是数组
            $.hoteamGrid.create(opt, titleOptions.data.ColumnLink);
        }
    },
    //加载数据(第二个参数代表是否清空列表，如果是true，则清空后再添加，如果是false，则追加)
    //参数格式：
    LoadGridRows: function (data, ifClear) {
        ifClear = ifClear == undefined ? true : ifClear;
        var id = this.GetId();
        if (ifClear) {
            $.hoteamGrid.loadRowData(id, $.hoteamGrid.mergeData(id, data), data.RecordsTotal);
        } else {
            $("#" + id).htGrid("addRows", $.hoteamGrid.mergeData(id, data));
        }
    },
    //通过行号来update此行数据
    UpdateDataByRowID: function (rowId, data) {
        var id = this.GetId();
        $("#" + id).htGrid("updateDataByRowID", rowId, data);
    },
    //获取分页信息
    GetPagerInfo: function () {
        return $.hoteamGrid.getPagerInfo(this.GetId());
    },
    //获取选中行的主键
    GetSelectedRowIds: function () {
        return $("#" + this.GetId()).htGrid("getSelectedRowIds");
    },
    //通过主键设置选中行
    SetSelectedRowByIds: function (ids) {
        $("#" + this.GetId()).htGrid("setSelectedRowByIds", ids);
    },
    //通过主键定位到其所在行
    GoRowById: function (id) {
        $("#" + this.GetId()).htGrid("goRowById", id);
    },
    //设置分页信息
    SetPagerInfo: function (pageInfo) {
        var info = {};
        if (pageInfo.CurrentPager) {
            info.currentpage = pageInfo.CurrentPager;
        };
        if (pageInfo.RowNumber) {
            info.rowNum = pageInfo.RowNumber;
        };
        if (pageInfo.SortOrder) {
            info.sortorder = pageInfo.SortOrder;
        };
        if (pageInfo.SortName) {
            info.sortname = pageInfo.SortName;
        }
        $("#" + this.GetId()).htGrid("setPagerInfo", info);
    },
    //隐藏列接口（如果列表调用了此接口，则该列表不能使用保存列设置功能）
    HideColumns: function (columns) {
        $("#" + this.GetId()).htGrid("hideColumns", columns);
    },
    //移动选中的列表行(参数可选值：first,last,before,after)（此方法命名有点问题，应该命名为MoveSelectedGridRow,但是为了往下兼容，只能命名MoveGridRow）  返回值>0：已经在最上或者最下 1：成功移动 2：不可选中多行移动
    MoveGridRow: function (position) {
        var id = this.GetId();
        var num = $("#" + id).htGrid("getSelectedNum");
        var allNum = $("#" + this.GetId())[0].p.data.length;

        //如果选中行数目为1的时候往下进行
        if (num == 1) {
            var rowNum = $("#" + id).htGrid("getSelectedRowNum")[0];

            if (position == "first") {
                if (rowNum == 1) {
                    return 0;
                }
            }
            else if (position == "last") {
                if (rowNum == allNum) {
                    return 0;
                }
            }
            else if (position == "before") {
                if (rowNum == 1) {
                    return 0;
                }
            }
            else if (position == "after") {
                if (rowNum == allNum) {
                    return 0;
                }
            }

            $("#" + id).htGrid("moveGridRow", rowNum, position);
            return 1;
        }
        else {
            return 2;
        }
    },
    //清空数据
    ClearGridRows: function () {
        return $.hoteamGrid.loadRowData(this.GetId(), [], 0);
    },
    //获取当前列表共多少条数据
    GetRowsCount: function () {
        return $("#" + this.GetId())[0].p.data.length;
    },
    //获取全选按钮状态
    IsSelectedAll: function () {
        return $.hoteamGrid.isSelectedAll(this.GetId());
    },
    //获取选中行数据
    GetSelectedRows: function () {
        return $.hoteamGrid.getSelectedRow(this.GetId());
    },
    //通过行号获取行数据
    GetRowByRowID: function (rowId) {
        var id = this.GetId();
        var table = $("#" + id);
        return $.hoteamGrid.convertSelectData(id, [table.htGrid("getRowByIndex", rowId)])[0];
    },
    GetRecordRows: function () {
        var id = this.GetId(),
            $elem = $("#" + id),
            opt,
            data;

        opt = $elem[0].p;
        data = $.hgrid.getRecordRows(opt);
        return {
            selected: $.hoteamGrid.convertSelectData(this.GetId(), data.selected),
            cancelSelected: $.hoteamGrid.convertSelectData(this.GetId(), data.cancelSelected)
        }
    },
    //获取选中行的主键id
    GetSelectRowsIds: function () {
        return $("#" + this.GetId()).htGrid("getSelectRowsIds");
    },
    //获取列表列属性集合
    GetColModel: function () {
        return $("#" + this.GetId()).htGrid("getOption").colModel;
    },
    //设置选中行
    SetSelectedRow: function (rows) {
        $("#" + this.GetId()).htGrid("setSelectedRow", rows);
    },
    //设置选中所有
    SetSelectAll: function () {
        $("#" + this.GetId()).htGrid("setSelectAll");
    },
    //设置行不选中
    SetUnSelectRow: function (rows) {
        $("#" + this.GetId()).htGrid("setUnSelectRow", rows);
    },
    //设置取消所有选中
    UnSelectAll: function () {
        $("#" + this.GetId()).htGrid("resetSelectedRow");
    },
    //获取当前页数据
    GetCurrentPageRows: function () {
        return $.hoteamGrid.getCurrentPageRow(this.GetId());
    },
    //移除选中行
    RemoveSelectedRows: function () {
        $("#" + this.GetId()).htGrid("deleteSelectedRows");
    },
    //根据行号移除行
    DeleteDataByRowNums: function (rowNums, isPaging) {
        $("#" + this.GetId()).htGrid("removeRows", rowNums, isPaging);
    },
    //设置单元格的text值
    SetCellContent: function (rowid, colName, text) {
        $("#" + this.GetId()).htGrid("setCellData", rowid, colName, {
            ColText: text
        }, false);
    },
    //给行设置颜色
    SetRowColor: function (rowId, color) {
        $("#" + this.GetId()).htGrid("setRowColor", rowId, color);
    },
    ResetRowsColor: function () {
        $("#" + this.GetId()).htGrid("resetRowsColor");
    },
    //给单元格设置颜色
    SetCellColor: function (rowId, colName, color) {
        $("#" + this.GetId()).htGrid("setCellColor", rowId, colName, color);
    },
    //给单元格文字设置颜色
    SetCellTextColor: function (rowId, colName, color) {
        $("#" + this.GetId()).htGrid("setCellTextColor", rowId, colName, color);
    },
    //给列设置颜色
    SetColumnColor: function (colName, color) {
        $("#" + this.GetId()).htGrid("setColumnColor", colName, color);
    },
    //设置行文字有划改效果
    SetRowLineThrough: function (rowId, color) {
        var id = this.GetId(),
            tbody = $("#" + id + "_body").children(),
            ftbody = $("#" + id + "_fbody").children().children();
        tbody.children("tr:eq(" + rowNum + ")").addClass("htgrid-tr-lineThrough").css("color", color);
        ftbody.children("tr:eq(" + rowNum + ")").addClass("htgrid-tr-lineThrough").css("color", color);
    },
    //设置行文字大小及粗细
    SetRowFont: function (rowNum, fontSize, fontWeight) {
        $("#" + this.GetId()).htGrid("setRowFont", rowNum, fontSize, fontWeight);
    },
    //设置行字体颜色（参数rowNums:行号（可以是字符串或者数组），color:字体颜色）
    SetRowTextColor: function (rowNums, color) {
        $("#" + this.GetId()).htGrid("setRowTextColor", rowNums, color);
    },
    //设置取消所有选中
    ResetSelectedRow: function () {
        $("#" + this.GetId()).htGrid("resetSelectedRow");
    },
    ShowButton: function (btnName) {
        $.hoteamGrid.showButton(this.GetId(), btnName);
    },
    HideButton: function (btnName) {
        $.hoteamGrid.hideButton(this.GetId(), btnName);
    },
    //添加数据（仅支持不分页的模式）
    AddRows: function (data, index, isPaging) {
        //遍历data，将value值为字符串的转化为对象,且转换为插件所要求格式
        var arr = [];
        $.each(data, function (i) {
            $.each(data[i], function (key, value) {
                if (typeof value === "string") {
                    data[i][key] = { ColText: data[i][key] };
                }
            });
            arr.push({
                rowattr: {},
                cellattr: data[i]
            });
        });
        $("#" + this.GetId()).htGrid("addRows", arr, index, isPaging);
    },
    //列表tr右键功能
    SetListRightMenu: function (menuid) {
        var grid = $("#" + this.GetId());
        var rightMenu = $("#" + menuid).parent();
        var me = this;
        grid.parent().on({
            contextmenu: function (e) {
                var tr = $(this);
                //判断当前行是否是选中状态
                var flag = $(this).hasClass("htgrid-row-select");
                if (!flag) {
                    me.UnSelectAll();
                    me.SetSelectedRow($(this).index());
                }
                var selRows = me.GetSelectedRows();
                var EID, objType;
                if (selRows.length == 1) {
                    EID = selRows[0].EID;
                    objectType = EID.substring(0, EID.indexOf('_'));
                } else {
                    objectType = function (rows) {
                        var arr = [];
                        for (var i = 0; i < rows.length; i++) {
                            var eid = rows[i].EID;
                            arr.push(eid.substring(0, eid.indexOf('_')));
                        }
                        return arr;
                    }(selRows);
                }
                HoteamUI.Control.Instance(menuid.replace('_RightMenu', '')).Show(e.pageX, e.pageY, objectType);
                return false;
            }
        }, "tr.htgrid-tr");
    },
    //重置大小
    Resize: function () {
        $("#" + this.GetId()).htGrid("resize", true);
    },
    //删除列设置弹框和查询弹框
    Dispose: function () {
        var id = this.GetId();
        $("#" + id + "_tree").closest(".hoteam-grid-dialog").remove();
        $("#" + id + "_LocalSearch").remove();
        $("#" + id + "_extendul").remove();
        $("#" + id + "_dragline").remove();
    },
    //获取id
    GetId: function () {
        return this.id + "_Grid";
    }
}

{
    (function ($) {
        $.hoteamGrid = {
            defaults: {
                parentId: null,
                id: null,
                ctrlEvent: null,
                describe: null, // 列表头部的一行描述信息
                autoLoadData: true, //true:创建列表后直接调用loaddata；false:反之
                isShowSearch: false, //是否有搜索功能
                isLayoutSave: false, //是否有方案保存
                isColumnSetting: false, //是否有行设置功能
                addButton: null, //列表左下角自定义添加的按钮
                searchState: false, //当前列表是否处于搜索状态
                setting: {
                    id: "",//列表主键
                    showPageBar: true, //是否显示分页信息(分页按钮和分页下拉)
                    showListTail: true,//是否显示列表尾部部分区域
                    multiselect: true, //是否显示checkbox选中框
                    multiselectWidth: 26, //定义checkbox选中框的宽度
                    rowrejection: false,//当行点击时是否行互斥
                    dblClickSelect: true,//双击时是否选中当前行
                    sortorder: "asc", //排序方式
                    sortname: "", //排序name
                    rownumbers: true, //列表第一列是否显示行数
                    colNames: [], //列表头name
                    colModel: [], //列表头属性
                    loadMore: false,//是否有加载更多的功能(分页功能必须是关闭的即showPageBar==false)
                    loadMoreText: '', //加载更多的提示文字
                    noMore: '',//配合加载更多使用，如果已经加载所有，则显示此文字
                    rowList: [50, 100, 200], //分页下拉设置
                    rowNum: 50 //每页默认显示条数
                },
                handlers: {
                    OnLoadRows: null,
                    OnColImageClick: null,
                    OnColLinkClick: null,
                    OnRowDblCLick: null,
                    OnRowClick: null,
                    OnLoadSuccess: null,
                    OnLoadMore: null
                }
            },
            colModelDefaults: {
                name: null, //名称
                sortable: false, //是否可排序
                width: null, //宽度
                colType: 'text',
                resizable: false, //是否可拖动改变列宽
                frozen: false, //是否冻结
                hidden: false, //列是否隐藏
                align: "left", //文字居左
                backgroundColor: "", //列背景色
                rowSpan: false //是否行合并
            },
            //创建列表
            create: function (opt, groupData) {
                if ($("#" + opt.id).length == 0) {
                    var tableEle = $('<table id="' + opt.id + '" class="hoteam-grid"></table>');
                    $("#" + opt.parentId).append(tableEle.data("option", opt).data("autofit", opt.autofit));
                    this.initHanlder(opt.id); //绑定事件
                }
                //给列表创建唯一标示
                var url = $("#" + opt.id).data("url");
                if (!url) {
                    url = HoteamUI.Common.GetOnlyUrl(opt.containerid, "");
                    $("#" + opt.id).data("url", url);
                }

                //根据当前语言，设置分页提示文字,根据是否分页，设置提示文字格式   
                if (opt.setting.showPageBar == false) {
                    opt.setting.recordText = HoteamUI.Language.Lang("Grid", "RecordCount");
                }
                else {
                    opt.setting.recordText = HoteamUI.Language.Lang("Grid", "RecordText");
                }
                opt.setting.onPageChange = this.onPaging; //分页变化事件
                opt.setting.onSort = this.onSort;
                opt.setting.onRowClick = this.onRowClick;
                opt.setting.onSelectedStatusChange = this.onSelectedStatusChange;
                opt.setting.onLoadMore = this.onLoadMore;
                opt.setting.onCellClick = this.onCellClick;
                if (opt.handlers.OnRowDblCLick) {
                    opt.setting.onRowdblClick = this.onRowdblClick;
                }
                opt.setting.onLoadSuccess = this.onLoadSuccess;
                //获取布局信息，并覆盖当前传入的布局信息
                var layoutParam = HoteamUI.Common.GetPersonalSetting(url);
                if (layoutParam) {
                    this.mergeLayoutParam(opt.setting, JSON.parse(layoutParam));
                }
                $("#" + opt.id).htGrid(opt.setting); //初始化
                this.initTitleGroup(opt.id, groupData); //列分组
                this.initColFrozen(opt, groupData); //列冻结设置
                if (opt.autoLoadData && opt.handlers.OnLoadRows && opt.setting.colModel.length > 0) {//如果自动加载数据
                    var ctrlEvent = opt.ctrlEvent;
                    HoteamUI.Common.ExeFunction(opt.handlers.OnLoadRows, ctrlEvent);
                }
                //在列表头的行号列td中添加图片，点击图片出现下拉（列设置，保存及搜索功能）
                this.creatExtendOperate(opt);
                //在page分页区域创建列设置按钮，保存按钮及搜索按钮
                this.creatPageBtns(opt);
                this.creatdrag(opt);
            },
            //加载数据
            loadRowData: function (id, data, records) {
                var grid = $("#" + id);
                //通过total和每页的行数计算页数
                var rownum = grid.htGrid("getOption").rowNum;
                if (!(rownum > 0)) {
                    return;
                }
                grid.htGrid("loadData", data, records);
                this.creatExtendOperate(grid.data("option"));
            },
            //创建分页左侧区域功能按钮
            creatPageBtns: function (opt) {
                var page = $("#" + opt.id + "_page"); //分页区域
                var lpage = page.children(".htgrid-page-l"); //左侧区域
                //var columnSetting = opt.isColumnSetting ?
                //    '<span class="hoteam-page-btn basesprite b-grid-setting" ' +
                //        'title="' + HoteamUI.Language.Lang("Grid", "ColumnSetting") + '"></span>' : '';
                //var search = opt.isShowSearch ?
                //    '<span class="hoteam-page-btn basesprite b-grid-search" ' +
                //        'title="' + HoteamUI.Language.Lang("LocalSearch", "Title") + '"></span>' +
                //    '<span class="hoteam-page-btn basesprite b-grid-cancelsearch" ' +
                //        'title="' + HoteamUI.Language.Lang("Grid", "CancelSearch") + '"></span>' : '';
                //var save = opt.isLayoutSave ?
                //    '<span class="hoteam-page-btn basesprite b-grid-save" ' +
                //        'title="' + HoteamUI.Language.Lang("Grid", "SaveLayout") + '"></span>' : '';
                var customBtns = this.getCustomButtons(opt);
                lpage.
                    //append(columnSetting).append(search).append(save).
                    append(customBtns);
            },
            //在列表头行号列td中添加图片，点击图片出现下拉（列设置，保存及搜索功能）
            creatExtendOperate: function (opt) {
                if (opt.isColumnSetting || opt.isLayoutSave) {
                    var me = this, td, head, titleImg;
                    //找到列表头行号td
                    //判断是否有冻结列
                    if ($("#" + opt.id + "_fhead").css("display") != "none") {
                        head = $("#" + opt.id + "_fhead");
                    } else {
                        head = $("#" + opt.id + "_head");
                    }
                    td = getTd(head.find("tr:last"));
                    if (td.length > 0 && td.children(".hoteam-title-extendimg").length == 0) {
                        titleImg = $('<span class="hoteam-title-extendimg basesprite b-grid-angle-down"></span>');
                        td.append(titleImg);
                        titleImg.on("mouseenter", function () {
                            var pos = $(this).offset();
                            var ul = $("#" + opt.id + "_extendul");
                            ul.css({
                                left: pos.left - 5,
                                top: pos.top + 16
                            }).show();
                        }).on("mouseleave", function () {
                            $("#" + opt.id + "_extendul").hide();
                        });
                    }

                    //创建下拉
                    if ($("#" + opt.id + "_extendul").length > 0) {
                        $("#" + opt.id + "_extendul").remove();
                    }
                    var ul = $('<ul class="hoteam-grid-extend-ul" id="' + opt.id + "_extendul" + '"></ul>');
                    var columnSetting = opt.isColumnSetting ?
                        '<li>' +
                        '<span class="basesprite b-grid-setting"></span>' +
                        '<span class="hoteam-grid-extend-text">' + HoteamUI.Language.Lang("Grid", "ColumnSetting") + '</span>' +
                        '</li>'
                        : "";
                    //var search = opt.isShowSearch ?
                    //        '<li>' +
                    //            '<span class="basesprite b-grid-search"></span>' +
                    //            '<span class="hoteam-grid-extend-text">' + HoteamUI.Language.Lang("LocalSearch", "Title") + '</span>' +
                    //        '</li>'
                    //        : "";
                    //var cancleSearch = opt.isShowSearch ?
                    //        '<li>' +
                    //            '<span class="basesprite b-grid-cancelsearch"></span>' +
                    //            '<span class="hoteam-grid-extend-text">' + HoteamUI.Language.Lang("Grid", "CancelSearch") + '</span>' +
                    //        '</li>'
                    //        : "";
                    var save = opt.isLayoutSave ?
                        '<li>' +
                        '<span class="basesprite b-grid-save"></span>' +
                        '<span class="hoteam-grid-extend-text">' + HoteamUI.Language.Lang("Grid", "SaveLayout") + '</span>' +
                        '</li>'
                        : "";
                    ul.append(columnSetting).append(save);
                    $("body").append(ul);
                    ul.on("mouseleave", function () {
                        $(this).hide();
                    }).on("mouseenter", function () {
                        $(this).show();
                    });
                    ul.children("li").on("click", function () {
                        var span = $(this).children('span:eq(0)');
                        if (span.hasClass("b-grid-setting")) {
                            me.colsetting(opt.id);
                        } else if (span.hasClass("b-grid-save")) {
                            //获取布局参数
                            var layoutParam = JSON.stringify(me.getCurrentLayoutParam(opt.id));
                            //调用全局函数，保存布局
                            HoteamUI.Common.SavePersonalSetting(
                                null,
                                $("#" + opt.id).data("url"), layoutParam, HoteamUI.Common.SystemSettingEnum.GridView);
                        } else if (span.hasClass("b-grid-search")) {
                            me.localSearch({ id: opt.id });
                        } else if (span.hasClass("b-grid-cancelsearch")) {
                            me.cancelSearch({ id: opt.id });
                        }
                        $(this).parent().hide();
                    });
                } else {
                    $("#" + opt.id + "_head").find("tr:last").children("td:first").empty();
                    $("#" + opt.id + "_fhead").find("tr:last").children("td:first").empty();
                }
                function getTd(tr) {
                    var td = tr.children("td:first");
                    if (td.css("display") == "none") {
                        return getTd(tr.prev());
                    } else {
                        return td;
                    }
                }
            },
            //绑定事件
            initHanlder: function (id) {
                var me = this;
                var par = $("#" + id).parent();
                //分页区域功能按钮点击事件
                par.on("click", ".hoteam-page-btn", function (e) {
                    var btn = $(this);
                    if (btn.attr("data-click")) {
                        var option = $("#" + id).data("option"),
                            ctrlEvent = option.ctrlEvent,
                            js = btn.attr("data-click");
                        var rows = me.getSelectedRow(id);
                        if (rows.length <= 0) {
                            rows = me.getCurrentPageRow(id);
                        }
                        var rowsIndexList = [];
                        var pager = me.getPagerInfo(id);
                        var startIndex = (pager.CurrentPager - 1) * pager.RowNumber;
                        //for (var i in rows) {
                        for (var i = 0; i < rows.length; i++) {
                            var value = +rows[i]["row_number"];
                            value = value - startIndex;
                            rowsIndexList.push(value);
                        }
                        ctrlEvent.rows = rows;
                        ctrlEvent.rowsIndexList = rowsIndexList;
                        ctrlEvent.Columns = me.getColumnPara(id);
                        eval(js);
                    } else {
                        if (btn.hasClass("b-grid-setting")) {
                            me.colsetting(id);
                        } else if (btn.hasClass("b-grid-save")) {
                            //获取布局参数
                            var layoutParam = JSON.stringify(me.getCurrentLayoutParam(id));
                            //调用全局函数，保存布局
                            HoteamUI.Common.SavePersonalSetting(
                                HoteamUI.Common.SystemSettingEnum.GridView,
                                $("#" + id).data("url"), layoutParam);
                        } else if (btn.hasClass("b-grid-search")) {
                            me.localSearch({ id: id });
                        } else if (btn.hasClass("b-grid-cancelsearch")) {
                            me.cancelSearch({ id: id });
                        }
                    }
                });
            },
            //初始化列表头分组
            initTitleGroup: function (id, groupData) {
                if (groupData && groupData.length > 0) {
                    for (var i = groupData.length - 1; i > -1; i--) {
                        var arr = [], itemArr = groupData[i];
                        for (var j = 0; j < itemArr.length; j++) {
                            arr.push({
                                startColumnName: itemArr[j].StartColumnName,
                                numberOfColumns: itemArr[j].ColumnCount,
                                titleText: itemArr[j].MergeName
                            });
                        }
                        $("#" + id).htGrid("setGroupHeaders", arr);
                    }
                }
                //记录groupData
                $("#" + id).data("groupData", groupData);
            },
            //处理冻结列
            initColFrozen: function (opt, groupData) {
                var table = $("#" + opt.id);
                //进行冻结处理，考虑到列表头可以分组，冻结列必须以合并之后的最高级列为基准；
                //例如：A1，A2合并为A，那么必须A1，A2都必须为冻结列，如果其一为冻结，另外一个不冻结，则冻结无效
                if (groupData && groupData.length > 0) {
                    var topgroup = groupData[0]; //获取最顶层的分组列
                    for (var i = 0; i < topgroup.length; i++) {
                        var childColArr = topgroup[i].ChildItem; //获取第一个分组的合并列的子列数组
                        for (var k = 0; k < childColArr.length; k++) {
                            if (!childColArr[k].Frozen) {//检测到其中有未冻结的列，则将所有列置为不能冻结 
                                for (var m = 0; m < childColArr.length; m++) {
                                    if (childColArr[m].Frozen) {//如果冻结为true
                                        table.htGrid("setColProp", childColArr[m].Name, { frozen: false });
                                    }
                                }
                                break;
                            }
                        }
                    }
                }
            },
            //分页变化事件
            onPaging: function (flag, ele) {
                var option = $(this).data("option");
                var ctrlEvent = { o: option.ctrlEvent.o };
                HoteamUI.Common.ExeFunction(option.handlers.OnLoadRows, ctrlEvent);
            },
            //排序事件
            onSort: function (col, sort) {
                var opt = $(this).data("option");
                var ctrlEvent = { o: opt.ctrlEvent.o };
                ctrlEvent.colName = col;
                ctrlEvent.sortorder = sort;
                HoteamUI.Common.ExeFunction(opt.handlers.OnLoadRows, ctrlEvent);
            },
            //加载更多点击事件
            onLoadMore: function () {
                var opt = $(this).data("option");
                var ctrlEvent = { o: opt.ctrlEvent.o };
                ctrlEvent.ifClear = false;
                HoteamUI.Common.ExeFunction(opt.handlers.OnLoadRows, ctrlEvent);
            },
            //行点击
            onRowClick: function (rowid, checked, rowObj, colName, modelObj) {
                var opt = $(this).data("option");
                var ctrlEvent = { o: opt.ctrlEvent.o };
                //是否选中
                ctrlEvent.rowselected = checked;
                //行号
                ctrlEvent.rowid = rowid;
                //行数据
                ctrlEvent.rowobject = $.hoteamGrid.convertSelectData(opt.id, [rowObj])[0];
                ctrlEvent.colName = colName;
                ctrlEvent.modelObj = modelObj;
                HoteamUI.Common.ExeFunction(opt.handlers.OnRowClick, ctrlEvent);
            },
            onSelectedStatusChange: function (rowid, checked, rowObj) {

                if (rowObj instanceof Array === false) {
                    rowObj = [rowObj];
                }
                if (rowid instanceof Array === false) {
                    rowid = [rowid];
                }
                var opt = $(this).data("option");
                var ctrlEvent = { o: opt.ctrlEvent.o };
                //是否选中
                ctrlEvent.rowselected = checked;
                //行号
                ctrlEvent.rowid = rowid;
                //行数据
                ctrlEvent.rowobject = $.hoteamGrid.convertSelectData(opt.id, rowObj);
                HoteamUI.Common.ExeFunction(opt.handlers.OnSelectedStatusChange, ctrlEvent);
            },
            //单元格点击
            onCellClick: function (rowid, columnName, e) {

                var event = e || event;
                if (!event) {
                    console.war('grid oncellclick has no event');
                    return;
                }
                var target = $(event.target || event.srcElement);
                var table = $(this);
                var opt = table.data("option");
                var o = table.htGrid("getOption");
                var td = target.closest("td");
                if (target.hasClass("htgrid_col_a")) {//链接点击
                    //判断是否传递进来jsmethod，如果有，则优先执行
                    var colModel = opt.setting.colModel,
                        jsmethod = "",
                        ctrlEvent = { o: opt.ctrlEvent.o };
                    ctrlEvent.rowid = td.parent("tr").index();
                    ctrlEvent.rowobject = $.hoteamGrid.convertSelectData(opt.id, [table.htGrid("getRowByIndex", ctrlEvent.rowid + o.rowNum * (o.currentpage - 1))])[0];
                    ctrlEvent.colName = columnName;
                    $.each(colModel, function (i) {
                        if (colModel[i].name == columnName) {
                            jsmethod = colModel[i].jsmethod;
                            return;
                        }
                    });
                    if (jsmethod) {
                        HoteamUI.Common.ExeFunction(jsmethod, ctrlEvent);
                    } else {
                        HoteamUI.Common.ExeFunction(opt.handlers.OnColLinkClick, ctrlEvent);
                    }
                    return false;
                } else if (target.hasClass("htgrid_col_button")) {
                    //判断是否传递进来jsmethod，如果有，则优先执行
                    var colModel = opt.setting.colModel,
                        jsmethod = "",
                        ctrlEvent = opt.ctrlEvent;
                    ctrlEvent.rowid = td.parent("tr").index();
                    ctrlEvent.rowobject = $.hoteamGrid.convertSelectData(opt.id, [table.htGrid("getRowByIndex", ctrlEvent.rowid + o.rowNum * (o.currentpage - 1))])[0];
                    ctrlEvent.colName = columnName;
                    $.each(colModel, function (i) {
                        if (colModel[i].name == columnName) {
                            jsmethod = colModel[i].jsmethod;
                            return;
                        }
                    });
                    if (jsmethod) {
                        HoteamUI.Common.ExeFunction(jsmethod, ctrlEvent);
                    } else {
                        HoteamUI.Common.ExeFunction(opt.handlers.OnColImageClick, ctrlEvent);
                    }
                    //HoteamUI.Common.ExeFunction(opt.handlers.OnColImageClick, ctrlEvent);
                    return false;
                }
                return true;
            },
            //行双击
            onRowdblClick: function (rowid, checked, rowObj) {
                var opt = $(this).data("option");
                var ctrlEvent = { o: opt.ctrlEvent.o };
                //是否选中
                ctrlEvent.rowselected = checked;
                //行号
                ctrlEvent.rowid = rowid;
                //行数据
                ctrlEvent.rowobject = $.hoteamGrid.convertSelectData(opt.id, [rowObj])[0];
                HoteamUI.Common.ExeFunction(opt.handlers.OnRowDblCLick, ctrlEvent);
            },
            //加载结束
            onLoadSuccess: function () {
                var opt = $(this).data("option");
                var ctrlEvent = { o: opt.ctrlEvent.o };
                HoteamUI.Common.ExeFunction(opt.handlers.OnLoadSuccess, ctrlEvent);
            },
            //获取页数及sort信息
            getPagerInfo: function (id) {
                var opt = $("#" + id).htGrid("getOption");
                return {
                    CurrentPager: opt.currentpage,
                    RowNumber: opt.rowNum,
                    SortOrder: opt.sortorder,
                    SortName: opt.sortname,
                    Records: opt.records
                };
            },
            //获取选中行信息
            getSelectedRow: function (id) {
                return this.convertSelectData(id, $("#" + id).htGrid("getSelectedRows"));
            },
            //获取当前页所有行信息
            getCurrentPageRow: function (id) {
                return this.convertSelectData(id, $("#" + id).htGrid("getCurrentPageRows"));
            },
            //合并服务器端传递过来的基础数据和属性数据
            mergeData: function (id, data) {
                var bakarr = [];
                var bakdata = { Rows: [] };
                if (!data.RowSettings) {
                    bakdata.RowSettings = [];
                } else {
                    bakdata.RowSettings = data.RowSettings;
                }
                //对data.Rows里面的数组进行遍历，转化成{}
                var disableEditColumns = this.getDisableEditColumns(id);
                $.each(data.Rows, function (i) {
                    var obj = {};
                    $.each(data.Rows[i], function (j) {
                        var editable = data.Rows[i][j].Editable;
                        if (editable == 0) {//不可编辑
                            data.Rows[i][j].Editable = false;
                        } else if (editable == 1) {
                            data.Rows[i][j].Editable = true;
                        } else if (editable == 2) {
                            delete data.Rows[i][j].Editable;
                        }
                        if (HoteamUI.ArrayIndexOf(disableEditColumns, data.Rows[i][j].ColName) >= 0) {
                            //if (disableEditColumns.indexOf(data.Rows[i][j].ColName) >= 0) {
                            data.Rows[i][j].Editable = false;
                        }
                        delete data.Rows[i][j].editType;
                        delete data.Rows[i][j].regexStatus;
                        obj[data.Rows[i][j].ColName] = data.Rows[i][j];
                    });
                    bakdata.Rows[i] = obj;
                });
                //合并
                $.each(bakdata.Rows, function (i) {
                    var item = {};
                    item.rowattr = bakdata.RowSettings[i] ? bakdata.RowSettings[i] : {};
                    item.cellattr = bakdata.Rows[i];
                    bakarr.push(item);
                });
                return bakarr;
            },
            //合并布局参数信息
            mergeLayoutParam: function (opt, paramObj) {
                var colModel = paramObj.colModel;
                var newColModel = opt.colModel;
                var colNames = [];
                var extendColModel = []; //合并之后的colModel
                var colIDs = [], colAdd = [];
                for (var i = 0; i < colModel.length; i++) {
                    colIDs.push(colModel[i].name);
                }
                for (var i = 0; i < newColModel.length; i++) {
                    var index = HoteamUI.ArrayIndexOf(colIDs, newColModel[i].name);
                    if (index == -1) {
                        colAdd.push(opt.colModel[i]);
                    } else {
                        if (opt.colModel[i].hidden == true) {
                            extendColModel[index] = $.extend({}, opt.colModel[i], colModel[index]);
                            extendColModel[index].hidden = true;
                        } else {
                            extendColModel[index] = $.extend({}, opt.colModel[i], colModel[index]);
                        }
                        colNames[index] = opt.colModel[i].text;
                    }
                }
                //删除数组中undified的内容（这些是删除的列）
                for (var i = extendColModel.length - 1; i >= 0; i--) {
                    if (!extendColModel[i]) {
                        extendColModel.splice(i, 1);
                        colNames.splice(i, 1);
                    }
                }
                //将新增的添加到后面
                for (var i = 0; i < colAdd.length; i++) {
                    extendColModel.push(colAdd[i]);
                    colNames.push(colAdd[i].text);
                }
                opt.colNames = colNames;
                opt.colModel = extendColModel;
            },

            //根据每列的类型不同，创建不同的formatter
            setColFormatter: function (col) {
                if (col.colType == "hidden" || col.colType == 1) {
                    col.hidden = true;
                }
                else if (col.colType == "thumbnail") {
                    col.sortable = false;
                    col.editable = false;

                    col.formatter = function (value) {
                        var src = "";

                        if (value.ColIcon) {
                            src = value.ColIcon;//.replace("~", PageInit.WebRootPath);
                        }

                        if (src.indexOf('base64|') === 0) {
                            src = src.split('|');
                            src = 'data:image/' + src[1] + ';' + src[0] + ',' + src[2];
                        } else {
                            src = src.replace("~", PageInit.WebRootPath);
                        }

                        content = ["<div class='htgrid_col_thumbnail'>",
                            "<img src='", src, "'/>",
                            "</div>",
                            "</div>"].join("");
                        return content;
                    }
                }
                else if (col.colType == "image" || col.colType == 2) {
                    if (!col.width) {
                        col.width = 32;
                    }
                    col.colType = "image";
                    //col.showTitle = false;
                    col.formatter = function (value) {
                        var iconClass = '', iconStyle = '';
                        if (value.ColIcon) {
                            if (value.ColIcon.indexOf("~") < 0) {//雪碧图
                                iconClass = HoteamUI.Common.GetImage(value.ColIcon, 16);
                            } else {
                                if (HoteamUI.Browser.isIE && HoteamUI.Browser.version == "8.0") {
                                    iconStyle = "style=\"background:url(#);filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + value.ColIcon.replace("~", PageInit.WebRootPath) + "', sizingMethod='scale');\"";
                                } else {
                                    iconStyle = "style='background:url(" + value.ColIcon.replace("~", PageInit.WebRootPath) + ") no-repeat;background-size:100% 100%;'";
                                }
                            }
                        }
                        content = "<div " + iconStyle + " class='htgrid_col_button " + iconClass + "'>" +
                            "</div>";
                        return content;
                    }
                }
                else if (col.colType == "link" || col.colType == 3) {
                    col.formatter = function (value) {
                        var content = '<a class="htgrid_col_a">' + (escapeHtml(value.ColText || "")) + '</a>';
                        return content;
                    }
                } else if (col.colType == "progress" || col.colType == 4) {
                    col.formatter = function (value) {
                        var width = value.ColText + "%";
                        var content = '<div class="htgrid_col_progress"><div style="background-color:' + value.ColColor + ';width:' + width + '"></div><span>' + width + '</span></div>';
                        return content;
                    }
                }
                function escapeHtml(str) {
                    var entityMap = {
                        "&": "&amp;",
                        "<": "&lt;",
                        ">": "&gt;",
                        "'": "&#39;",
                        '"': '&quot;',
                        "/": '&#x2F;'
                    };
                    return String(str).replace(/[&<>"'\/]/g, function (s) {
                        return entityMap[s];
                    });
                }
            },
            //提取option中的列表设置信息
            setTitleOption: function (opt, titleOptions) {
                //提取列表属性信息
                opt.setting.id = titleOptions.keyField === undefined ? opt.setting.id : titleOptions.keyField;
                opt.setting.isRecordSelectedRow = titleOptions.isRecordSelectedRow === undefined ? opt.setting.isRecordSelectedRow : titleOptions.isRecordSelectedRow;
                opt.setting.multiselect = titleOptions.multiselect === undefined ? opt.setting.multiselect : titleOptions.multiselect;

                //18986 李金岳
                //配置文件ShowPaging对应控件Grid里的showPageBar
                //配置文件里的ShowPageBar对应控件Grid里的showListTail
                opt.setting.showPageBar = titleOptions.showPageBar === undefined ? opt.setting.showPageBar : titleOptions.showPageBar;
                opt.setting.showListTail = titleOptions.showListTail === undefined ? opt.setting.showListTail : titleOptions.showListTail;

                opt.setting.dblClickSelect = titleOptions.dblClickSelect === undefined ? opt.setting.dblClickSelect : titleOptions.dblClickSelect;
                opt.setting.sortorder = titleOptions.sortorder === undefined ? opt.setting.sortorder : titleOptions.sortorder;
                opt.setting.sortname = titleOptions.sortname === undefined ? opt.setting.sortname : titleOptions.sortname;
                opt.setting.rowrejection = titleOptions.rowrejection === undefined ? opt.setting.rowrejection : titleOptions.rowrejection;
                opt.setting.rownumbers = titleOptions.rownumbers === undefined ? opt.setting.rownumbers : titleOptions.rownumbers;
                opt.setting.describe = titleOptions.describe === undefined ? opt.setting.describe : titleOptions.describe;
                opt.setting.loadMore = titleOptions.loadMore === undefined ? opt.setting.loadMore : titleOptions.loadMore;
                
                if (opt.setting.loadMore) {
                    opt.setting.loadMoreText = HoteamUI.Language.Lang("Grid", "LoadMore");
                    opt.setting.noMore = HoteamUI.Language.Lang("Grid", "NoMore");
                }

                opt.setting.zebraList = titleOptions.zebraList === undefined ? opt.setting.zebraList : titleOptions.zebraList;
                opt.setting.hoverLight = titleOptions.hoverLight === undefined ? opt.setting.hoverLight : titleOptions.hoverLight;
                opt.setting.border = titleOptions.border === undefined ? opt.setting.border : titleOptions.border;

                opt.setting.isSelectCheckbox = titleOptions.isSelectCheckbox === undefined ? opt.setting.isSelectCheckbox : titleOptions.isSelectCheckbox;

                opt.isShowSearch = titleOptions.isShowSearch === undefined ? opt.isShowSearch : titleOptions.isShowSearch;
                opt.isLayoutSave = titleOptions.isLayoutSave === undefined ? opt.isLayoutSave : titleOptions.isLayoutSave;
                opt.isColumnSetting = titleOptions.isColumnSetting === undefined ? opt.isColumnSetting : titleOptions.isColumnSetting;
                opt.autoLoadData = titleOptions.autoLoadData === undefined ? opt.autoLoadData : titleOptions.autoLoadData;
                opt.addButton = titleOptions.addButton === undefined ? opt.addButton : titleOptions.addButton;

                if (titleOptions.rowList) {
                    if (titleOptions.rowList instanceof Array) {//如果是数组
                        opt.setting.rowList = titleOptions.rowList;
                    } else {//如果是字符串（从page页中设置的）
                        opt.setting.rowList = titleOptions.rowList.split(',');
                    }
                }
            },
            //将服务器端传递过来的有关列表头信息及列属性信息提取到opt对象中
            setGridRowTitleFromServer: function (opt, titleOptions) {
                this.setTitleOption(opt, titleOptions);
                var colNames = [], colModel = [];
                var data = null;
                if (titleOptions.data instanceof Array) {//向下兼容，如果data是数组，则代表当前传递过来的信息没有列表头合并信息
                    data = titleOptions.data;
                } else {
                    data = titleOptions.data.ColumnData;
                }
                //for (var i in data) {
                for (var i = 0; i < data.length; i++) {
                    var item = data[i];
                    colNames.push(item.Text);
                    //设置model值
                    var model = $.extend(true, {}, this.colModelDefaults);
                    model.text = item.Text;
                    model.name = item.Name;
                    model.sortable = item.Sortable;
                    model.resizable = item.Resizable;
                    model.align = item.TextAlign;
                    model.jsmethod = item.JSMethod;
                    model.rowSpan = item.RowSpan;
                    model.backgroundColor = item.BackgroundColor;
                    //Width：如果-1，空字符串或者null或者undifined，那么就是自适应；如果是大于等于0的数字，则是固定宽度
                    if (item.Width == undefined) {
                        model.width = "";//自适应
                    } else if (isNaN(item.Width)) {
                        model.width = "";//自适应
                    } else if (item.Width < 0) {
                        model.width = "";//自适应
                    } else {
                        model.width = item.Width;
                    }
                    model.colType = item.ColType;
                    model.frozen = item.Frozen;
                    this.setColFormatter(model);
                    colModel.push(model);
                }
                opt.setting.colModel = this.setFrozenCols(colModel);
                opt.setting.colNames = colNames;
            },
            //将.page页中设置的有关列表头信息及列属性信息提取到opt对象中
            setGridRowTitleFromPageConfig: function (opt, titleOptions) {
                this.setTitleOption(opt, titleOptions);
                //提取列表头信息
                var colNames = [], colModel = [];
                for (var o in titleOptions) {
                    if (!titleOptions.hasOwnProperty(o)) {
                        continue;
                    }
                    if (o.indexOf("item") > -1) {
                        var model = $.extend(true, {}, this.colModelDefaults);
                        var col = titleOptions[o];
                        var text = '';
                        //设置colNames
                        if (col.textId) {
                            text = HoteamUI.Language.Lang(col.textId);
                            colNames.push(text);
                        }
                        //设置colModel值
                        model.name = col.name || "null";
                        //width:如果-1或者undifined,那么就是自适应；如果是大于等于0的数字，则是固定宽度
                        if (col.width == undefined) {
                            model.width = "";//自适应
                        } else if (isNaN(col.width)) {
                            model.width = "";//自适应
                        } else if (col.width < 0) {
                            model.width = "";//自适应
                        } else {
                            model.width = col.width;
                        }
                        model.sortable = col.sortable;
                        model.resizable = col.resizable;
                        model.align = col.textalign;
                        model.jsmethod = col.jsmethod;
                        model.rowSpan = col.rowSpan;
                        model.backgroundColor = col.backgroundColor;
                        model.colType = col.colType;
                        model.frozen = col.frozen;
                        model.hidden = col.hidden;
                        model.text = text;
                        this.setColFormatter(model);
                        colModel.push(model);
                    }
                }
                opt.setting.colNames = colNames;
                opt.setting.colModel = this.setFrozenCols(colModel);
            },
            //对colModel进行处理，以最后一个冻结列为基准，将之前的列全部设为冻结
            setFrozenCols: function (colModel) {
                var flag = false;
                for (var i = colModel.length - 1; i >= 0; i--) {
                    if (flag) {
                        colModel[i].frozen = true;
                    } else {
                        if (colModel[i].colType == 'image') {
                            colModel[i].frozen = false;
                        } else if ((!colModel[i].hidden || (colModel[i].hidden && colModel[i].userHidden)) && colModel[i].frozen) {
                            flag = true;
                        }
                    }
                }
                return colModel;
            },
            //转换获取到的数据
            convertSelectData: function (id, data) {
                //获取列的coltype，主要是图片列和进度条列
                var opt = $("#" + id).htGrid("getOption"), colModel = opt.colModel;
                var imgarr = [], proarr = [];
                $.each(colModel, function (i) {
                    if (colModel[i].colType == "image" || colModel[i].colType == 2) {
                        imgarr.push(colModel[i].name);
                    }
                    if (colModel[i].colType == "progress" || colModel[i].colType == 4) {
                        proarr.push(colModel[i].name);
                    }
                });
                var arr = [];
                $.each(data, function (i) {
                    var row = data[i];
                    var obj = {};
                    $.each(row, function (key, value) {
                        if (typeof value === "object" && value !== null) {
                            if (HoteamUI.ArrayIndexOf(imgarr, key) >= 0) {
                                //if (imgarr.indexOf(key) >= 0) {
                                obj[key] = { ColText: value.ColText, ColIcon: value.ColIcon };
                            } else if (HoteamUI.ArrayIndexOf(proarr, key) >= 0) {
                                //} else if (proarr.indexOf(key) >= 0) {
                                obj[key] = { ColText: value.ColText, ColColor: value.ColColor };
                            } else {
                                obj[key] = value.ColText;
                            }
                        } else if (key == "row_number") {
                            obj.row_number = value;
                        }
                    });
                    arr.push(obj);
                });
                return arr;
            },
            //转换需要添加的数据
            convertAddData: function (id, data) {
                $.each(data, function (i) {
                    $.each(data[i], function (key, value) {
                        if (typeof value === "string") {
                            data[i][key] = { ColText: value };
                        }
                    });
                });
            },
            //获取当前布局参数
            getCurrentLayoutParam: function (id) {
                var opt = $("#" + id).htGrid("getOption");
                var colModel = opt.colModel;
                //获取列宽
                var headTable = $("#" + id + "_head").find("tbody");
                var tds = headTable.children("tr:eq(0)").children("td:gt(1):lt(" + colModel.length + ")");
                $.each(tds, function (i) {
                    var td = $(this);
                    var name = td.attr("data-name");
                    if (td.attr("nowidth") == "N") {
                        for (var k = 0; k < colModel.length; k++) {
                            if (name == colModel[k].name) {
                                colModel[k].width = parseInt(td.css("width"));
                            }
                        }
                    }
                });
                //抽取宽度，冻结，隐藏属性
                var colModelArr = [];
                $.each(colModel, function (i, obj) {
                    colModelArr.push({
                        name: obj.name,
                        hidden: obj.hidden,
                        userHidden: obj.userHidden,
                        frozen: obj.frozen,
                        width: obj.width
                    });
                });
                return { colModel: colModelArr };
            },
            //获取可以在列设置中展示的列及将这些数据组织成树需要的格式
            getColTreeData: function (colModel, colNames, groupData) {
                function isInGroupData(colName) {
                    for (var i = 0; i < groupData.length; i++) {
                        if (colName == groupData[i].StartColumnName) {
                            return groupData[i];
                        }
                    }
                    return false;
                }
                if (groupData && groupData[0]) {
                    groupData = groupData[0];
                } else {
                    groupData = [];
                }
                var arr = [];
                for (var i = 0; i < colModel.length; i++) {
                    if (colModel[i].colType == "image" || colModel[i].colType == 2) {//如果是图片列
                        continue;
                    }
                    if (colModel[i].hidden && !colModel[i].userHidden) {//判断当前隐藏列且不是用户设置的隐藏（是开发者设置的隐藏）
                        continue;
                    }
                    var isGroupData = isInGroupData(colModel[i].name);
                    if (!isGroupData) {//不是分组列
                        arr.push({
                            id: colModel[i].name,
                            name: colNames[i],
                            frozen: colModel[i].frozen,
                            userHidden: colModel[i].userHidden == true//如果为true，则是用户隐藏的
                        });
                    } else {//如果是
                        var children = [];
                        var num = isGroupData.ColumnCount;
                        var titleText = isGroupData.MergeName;
                        var k = 0;
                        for (k; k < num; k++) {
                            if (colModel[i + k].colType == "image" || colModel[i + k].colType == 2) {//如果是图片列
                                continue;
                            }
                            if (colModel[i + k].hidden && !colModel[i + k].userHidden) {//判断当前隐藏列且不是用户设置的隐藏（是开发者设置的隐藏）
                                continue;
                            }
                            children.push({
                                id: colModel[i + k].name,
                                name: colNames[i + k],
                                frozen: colModel[i + k].frozen,
                                userHidden: colModel[i + k].userHidden == true//如果为true，则是用户隐藏的
                            });
                        }
                        arr.push({
                            id: colModel[i].name,
                            name: titleText,
                            frozen: colModel[i].frozen,
                            userHidden: colModel[i].userHidden == true, //如果为true，则是用户隐藏的
                            children: children
                        });
                        i = i + k - 1; //跳过被合并的列
                    }
                }
                return arr;
            },
            //列设置功能
            colsetting: function (id) {
                var me = this;
                var table = $("#" + id);
                var opt = table.htGrid("getOption");
                var colNames = opt.colNames;
                var colModel = opt.colModel;
                var groupData = table.data("groupData");
                var arr = this.getColTreeData(colModel, colNames, groupData);
                //添加遮罩
                var height = $(window).height() + "px";
                var width = $(window).width() + "px";
                $("body").append('<div class="hoteam-grid-overlay" style="z-index:9999;height:' + height + ';width:' + width + '"></div>');
                //判断是否已经有了弹框元素
                var ul = $("#" + id + "_tree");
                if (ul.length == 0) {
                    //创建悬浮的ul
                    var dialog = $(
                        '<div class="hoteam-grid-dialog" id="' + id + "_settingDialog" + '">' +
                        '<div class="hoteam-grid-d-title">' +
                        '<span class="hoteam-grid-d-text">' + HoteamUI.Language.Lang("Grid", "ColumnSetting") + '</span>' +
                        '<span class="hoteam-grid-d-close basesprite b-dialog-close"></span>' +
                        '</div>' +
                        '<div class="hoteam-grid-d-content">' +
                        '<ul class="ztree hoteam-grid-tree" id="' + id + "_tree" + '"></ul>' +
                        '<div class="hoteam-grid-d-btns">' +
                        '<button class="btn btn-default btn-sm">' + HoteamUI.Language.Lang("Common", "OK") + '</button>' +
                        '<button class="btn btn-default btn-sm">' + HoteamUI.Language.Lang("Common", "Cancel") + '</button>' +
                        '</div>' +
                        '</div>' +
                        '</div>');
                    $("body").append(dialog);
                    $("#" + id + "_settingDialog").draggable({
                        containment: "document",
                        handle: ".hoteam-grid-d-title"
                    });
                    initHanlder(me, id);
                    ul = $("#" + id + "_tree");
                } else {
                    $.fn.zTree.destroy(ul);
                    ul.closest(".hoteam-grid-dialog").css({
                        left: '50%',
                        top: '50%'
                    }).show();
                }
                //创建ztree初始化的setting
                var setting = {
                    view: {
                        showIcon: true,
                        showLine: false,
                        addDiyDom: zTreeaddDiyDom
                    }
                };
                var tree = $.fn.zTree.init(ul, setting);
                tree.addNodes(null, arr);
                function zTreeaddDiyDom(treeID, treeNode) {
                    var spaceWidth = 15;
                    var switchObj = $("#" + treeNode.tId + "_switch"),
                        checkObj = $("#" + treeNode.tId + "_check"),
                        iconObj = $("#" + treeNode.tId + "_ico"),
                        spanObj = $("#" + treeNode.tId + "_span");
                    spanObj.addClass("hoteam-grid-node-text");
                    switchObj.remove();
                    checkObj.remove();
                    iconObj.before(switchObj);
                    iconObj.before(checkObj);
                    //添加两个checkbox，是否冻结和是否隐藏
                    var frozen = treeNode.frozen ? "checked" : "";
                    var hidden = treeNode.userHidden ? "checked" : "";
                    var frozenInput = treeNode.level == 1 ? "" : '<input frozencheck="frozen" type="checkbox" ' + frozen + '/><span>' + HoteamUI.Language.Lang("Grid", "Frozen") + '</span>';
                    var hiddenInput = treeNode.level == 1 ? "" : '<input hiddencheck="hidden" type="checkbox" ' + hidden + '/><span>' + HoteamUI.Language.Lang("Grid", "Hidden") + '</span>';
                    //定义上移下移图片元素
                    var moveEle = "";
                    if (treeNode.level == 0) {
                        moveEle = '<span class="hoteam-grid-column-img hoteam-grid-tree-up"></span>' +
                            '<span class="hoteam-grid-column-img hoteam-grid-tree-down"></span>';
                    }
                    iconObj.parent().append(
                        '<div class="hoteam-grid-tree-d">' +
                        moveEle +
                        frozenInput +
                        hiddenInput +
                        '</span>' +
                        '</div>'
                    );
                    if (treeNode.level > 0) {
                        var spaceStr = "<span style='display:inline-block;width:" + spaceWidth * treeNode.level + "px'></span>";
                        switchObj.before(spaceStr);
                    }
                }
                //给当前弹框注册事件
                function initHanlder(me, id) {
                    var treeId = id + "_tree";
                    var dialog = $("#" + treeId).closest(".hoteam-grid-dialog");
                    //关闭弹框
                    dialog.find(".hoteam-grid-d-close").on("click", function (e) {
                        $(this).closest(".hoteam-grid-dialog").hide();
                        $(".hoteam-grid-overlay").remove();
                    });
                    //弹框中按钮点击事件
                    dialog.find(".hoteam-grid-d-btns>button").on("click", function () {
                        var ztree = $.fn.zTree.getZTreeObj(treeId);
                        var index = $(this).index();
                        if (index == 0) {//保存当前设置
                            //获取设置后的所有参数
                            var colModel = [];
                            var colIds = [];
                            var colNames = [];
                            var nodes = ztree.getNodes();
                            $.each(nodes, function (i) {
                                var node = nodes[i];
                                if (node.children && node.children.length > 0) {//有子节点
                                    //遍历所有子节点
                                    $.each(node.children, function (i) {
                                        var cnode = node.children[i];
                                        colModel.push({
                                            name: cnode.id,
                                            frozen: cnode.frozen,
                                            hidden: cnode.userHidden,
                                            userHidden: cnode.userHidden
                                        });
                                        colIds.push(cnode.id);
                                        colNames.push(cnode.name);
                                    });
                                } else {//无子节点 
                                    colModel.push({
                                        name: node.id,
                                        frozen: node.frozen,
                                        hidden: node.userHidden,
                                        userHidden: node.userHidden
                                    });
                                    colIds.push(node.id);
                                    colNames.push(node.name);
                                }
                            });
                            //关闭当前弹框
                            $("#" + treeId).closest(".hoteam-grid-dialog").hide();
                            $(".hoteam-grid-overlay").remove();
                            //获取到colModel，colNames，然后对列表进行重新渲染
                            me.resetGrid(id, { colModel: colModel, colIds: colIds, colNames: colNames });
                        } else if (index == 1) {//关闭弹框 
                            $(this).closest(".hoteam-grid-dialog").hide();
                            $(".hoteam-grid-overlay").remove();
                        }
                    });
                    //点击树列表中的checkbox事件
                    $("#" + treeId)
                        .on("click", "input", function (e) {
                            var check = $(this);
                            var ztree = $.fn.zTree.getZTreeObj(treeId);
                            var nodeId = check.closest("li").attr("id");
                            var node = ztree.getNodeByParam("tId", nodeId);
                            if (check.attr("frozencheck")) {//冻结设置
                                node.frozen = check.prop("checked");
                                //将子节点所有设为和父节点相同
                                var childNodes = node.children;
                                if (childNodes) {
                                    $.each(childNodes, function (i) {
                                        childNodes[i].frozen = node.frozen;
                                    });
                                }
                                //如果是取消冻结，则将后续的所有列均置为不冻结
                                if (node.frozen == false) {
                                    while (true) {
                                        node = node.getNextNode();
                                        if (node) {
                                            node.frozen = false;
                                            childNodes = node.children;
                                            $("#" + node.tId).find("input[frozencheck='frozen']").prop("checked", false);
                                            if (childNodes) {
                                                $.each(childNodes, function (i) {
                                                    childNodes[i].frozen = false;
                                                });
                                            }
                                        } else {
                                            break;
                                        }
                                    }
                                }
                            } else {//隐藏设置
                                node.userHidden = check.prop("checked");
                                if (node.level == 1) {//如果不是父节点
                                    //获取所有同级节点
                                    var friendNodes = node.getParentNode().children;
                                    //遍历所有同级节点，如果全部隐藏，则父节点也为隐藏，如果不是全部隐藏，则父节点不为隐藏
                                    var hiddenflag = true;
                                    $.each(friendNodes, function (i) {
                                        if (!friendNodes[i].userHidden) {
                                            hiddenflag = false;
                                        }
                                    });
                                    //将父元素隐藏checkbox置为hiddenflag
                                    $("#" + node.getParentNode().tId).children("a").find("input[hiddencheck='hidden']").prop("checked", hiddenflag);
                                } else { //如果是父节点
                                    var hiddenflag = check.prop("checked");
                                    node.userHidden = hiddenflag;
                                    //将子节点所有设为和父节点相同
                                    var childNodes = node.children;
                                    if (childNodes) {
                                        $.each(childNodes, function (i) {
                                            childNodes[i].hidden = childNodes[i].userHidden = hiddenflag;
                                            $("#" + childNodes[i].tId).find("input[hiddencheck='hidden']").prop("checked", hiddenflag);
                                        });
                                    }
                                }
                            }
                            e.stopPropagation();
                        })
                        //18911  李金岳  
                        //上移下移事件
                        .on("click", "span.hoteam-grid-column-img", function () {
                            var ztree = $.fn.zTree.getZTreeObj(treeId);
                            var nodeId = $(this).closest("li").attr("id");
                            var node = ztree.getNodeByParam("tId", nodeId);
                            var nodes = ztree.getNodes();
                            var index = node.getIndex();
                            //上移
                            if ($(this).hasClass("hoteam-grid-tree-up")) {
                                if (index > 0) {//如果不是第一个
                                    ztree.moveNode(nodes[index - 1], nodes[index], "prev");
                                }
                            } else {
                                nextNode = node.getNextNode();
                                if (nextNode) {//如果不是最后一个
                                    ztree.moveNode(nodes[index], nodes[index + 1], "prev");
                                }
                            }
                            return false;
                        }).on("mouseenter", "a", function () {
                            $(this).find(".hoteam-grid-column-img").css("display", "inline-block");
                        }).on("mouseleave", "a", function () {
                            $(this).find(".hoteam-grid-column-img").css("display", "none");
                        });
                }
            },
            //获取页面底部自定义的按钮元素
            getCustomButtons: function (opt) {
                var buttonHtml = [];
                var addButton = opt.addButton;
                if (addButton) {
                    for (var item in addButton) {
                        if (!addButton.hasOwnProperty(item)) {
                            continue;
                        }
                        var button = addButton[item];
                        var style = '';
                        if (button.hide) {
                            style = 'style="display:none;"';
                        }
                        buttonHtml.push(
                            '<span name="' + item + '" class="hoteam-page-btn ' + HoteamUI.Common.GetImage(button.iconClass, 16) + '" ' + style +
                            ' title="' + HoteamUI.Language.Lang(button.textId) + '" data-click="' + button.js + '"></span>');
                    }
                }
                return buttonHtml.join('');
            },
            //显示按钮
            showButton: function (id, btnName) {
                var page = $("#" + id + "_page");
                page.find("[name='" + btnName + "']").css("display", "inline-block");
                page.show();
                var btn = $("#" + id).data("option").addButton;
                if (btn) {
                    $.each(btn, function (key) {
                        if (key == btnName) {
                            btn[key].hide = false;
                        }
                    });
                }

            },
            //隐藏按钮
            hideButton: function (id, btnName) {
                var page = $("#" + id + "_page");
                page.find("[name='" + btnName + "']").css("display", "none");
                
                //18986 李金岳
                //var btn = $("#" + id).data("option").addButton;
                //var isAllHide = true;
                //if (btn) {
                //    $.each(btn, function (key) {
                //        if (key == btnName) {
                //            btn[key].hide = true;
                //        }
                //        if (!btn[key].hide) {
                //            isAllHide = false;
                //        }
                //    });
                //}
                //if (isAllHide) {
                //    if (page.find(">.htgrid-page-m>.htgrid-page-btn").length === 0 && !page.find(">.htgrid-page-r").text())
                //        page.hide();
                //}
            },
            //获取不能编辑的列，返回数组
            getDisableEditColumns: function (id) {
                var option = $("#" + id).data("option"),
                    colModel = option.setting.colModel,
                    arr = [];
                $.each(colModel, function (i) {
                    if (colModel[i].colType == "image") {
                        arr.push(colModel[i].name);
                    }
                });
                return arr;
            },
            //重置当前列表布局
            resetGrid: function (id, opt) {
                var table = $("#" + id);
                var newColModel = opt.colModel;
                var newColIds = opt.colIds;
                var newColNames = opt.colNames;
                //合并opt
                var oldopt = $("#" + id).htGrid("getOption");
                var colModelArr = []; //定义数组用来放无效字段(图片列及开发者隐藏列)
                var colNamesArr = []; //定义数组用来放无效字段(图片列及开发者隐藏列)
                var mergeColModelArr = []; //定义列属性合并数组
                var mergeColNamesArr = []; //定义列名合并数组
                $.each(oldopt.colModel, function (i) {
                    var colModel = oldopt.colModel[i];
                    var colName = oldopt.colNames[i];
                    if (colModel.colType == "image" || colModel.colType == 2) {//图片列
                        colModelArr.push({ value: colModel, key: i });
                        colNamesArr.push(colName);
                        return;
                    }
                    if (colModel.hidden && !colModel.userHidden) {//判断当前隐藏列且不是用户设置的隐藏（是开发者设置的隐藏）
                        colModelArr.push({ value: colModel, key: i });
                        colNamesArr.push(colName);
                        return;
                    }
                    //var index = newColIds.indexOf(colModel.name); //在新的设置中数组的位置
                    var index = HoteamUI.ArrayIndexOf(newColIds, colModel.name); //在新的设置中数组的位置
                    mergeColModelArr[index] = $.extend(colModel, newColModel[index]);
                    mergeColNamesArr[index] = newColNames[index];
                });
                $.each(colModelArr, function (i) {
                    mergeColModelArr.splice(colModelArr[i].key, 0, colModelArr[i].value); //将无效字段放入到合并数组中
                    mergeColNamesArr.splice(colModelArr[i].key, 0, colNamesArr[i]);
                });
                oldopt.colModel = mergeColModelArr;
                oldopt.colNames = mergeColNamesArr;
                //破坏Grid
                table.htGrid("destroy");
                //处理冻结列
                oldopt.colModel = this.setFrozenCols(oldopt.colModel);
                //重新初始化
                table.htGrid(oldopt);
                //重新设置多级列表头
                this.initTitleGroup(id, table.data("groupData"));
                this.initColFrozen(oldopt, table.data("groupData"));
                //加载数据
                table.htGrid("loadData", oldopt.data, oldopt.records);
                //在page分页区域创建列设置按钮，保存按钮及搜索按钮
                this.creatPageBtns(table.data("option"));
                this.creatExtendOperate(table.data("option"));
                this.creatdrag(table.data("option"));
            },
            localSearch: function (opt) {
                var table = $("#" + opt.id);
                var options = table.htGrid("getOption");
                var colNames = options.colNames;
                var colModel = options.colModel;
                opt.Fields = [];
                for (var i = 0, len = colNames.length; i < len; i++) {
                    var col = colModel[i];
                    if (col.colType != 1 && col.colType != 2 && col.colType != 'hidden' && col.colType != 'image') {//1为隐藏列；2为图片列
                        opt.Fields.push({ Value: col.name, Text: colNames[i] });
                    }
                }
                function callback(result) {
                    //隐藏分页区域
                    table.htGrid("hidePageBtns");
                    //禁用排序
                    table.htGrid("disableSort");
                }
                opt.data = options.data;
                opt.searchcallback = callback;
                opt.table = table;
                $.hoteamLocalSearch.create(opt);
            },
            cancelSearch: function (opt) {
                var id = opt.id;
                var table = $("#" + opt.id);
                var options = table.htGrid("getOption");
                //显示分页区域
                table.htGrid("showPageBtns");
                //启用排序
                table.htGrid("enableSort");
                if (id.indexOf("_EditTreeGrid") == -1) {
                    var showArr = [];
                    for (var r = 1, rLen = options.data.length; r <= rLen; r++) {
                        showArr.push(r);
                    }
                    table.htGrid("showTrs", showArr);
                    table.htGrid("setRowMerge"); //设置行合并 
                } else {
                    table.htGrid("resetSelectedRow");
                }
                this.creatExtendOperate(table.data("option"));
            },
            getColumnPara: function (id) {
                var opt = $("#" + id).htGrid("getOption"),
                    colModel = opt.colModel,
                    arr = [];
                $.each(colModel, function (i) {
                    if (colModel[i].hidden == false && colModel[i].userHidden != true) {
                        arr.push({
                            ColumnName: colModel[i].name
                        });
                    }
                });
                return arr;
            },
            //拖拽功能
            creatdrag: function (opt) {
                //添加自适应布局时的拖动元素
                if (opt.autofit) {
                    if ($("#" + opt.id + "_dragline").length > 0) {
                        return;
                    }
                    $("#" + opt.parentId).append('<div class="htgrid-drag-line"></div>');
                    $("body").append('<div class="htgrid-drag-moveline" id="' + opt.id + "_dragline" + '"></div>');
                    //拖动条注册事件
                    $("#" + opt.parentId).children(".htgrid-drag-line").draggable({
                        axis: "y",
                        helper: "clone",
                        revert: true,
                        drag: function (e, ui) {
                            var drag = $("#" + opt.id + "_dragline").show(),
                                target = $(e.target),
                                top = target.offset().top,
                                height = target[0].offsetTop,
                                left = target.offset().left,
                                width = target.width();
                            if (ui.position.top < 0) {
                                drag.css({
                                    top: top - height,
                                    left: left,
                                    width: width
                                });
                            } else {
                                drag.css({
                                    top: top + ui.position.top - height,
                                    left: left,
                                    width: width
                                });
                            }
                        },
                        stop: function (e, ui) {
                            var drag = $("#" + opt.id + "_dragline").hide(),
                                target = $(e.target),
                                dragtop = parseInt(drag.css("top")),
                                top = target.offset().top,
                                containter = $("#" + opt.parentId),
                                body = containter.children(".htgrid-body-c"),
                                bheight = body.height(),
                                fbody = containter.children(".htgrid-frozen-b"),
                                fheight = fbody.height();
                            body.css("height", bheight + (dragtop - top));
                            fbody.css("height", fheight + (dragtop - top));
                        }
                    });
                }
            }
        }
    })(jQuery);
}


//以下代码是列表数据查询功能代码，由于此功能设计不合理已取消，所以代码废弃
{
    (function ($, undefined) {
        var Compare = {
            Equal: function (value, result) {
                if (value == result) {
                    return true;
                };
                return false;
            },
            NotEqual: function (value, result) {
                if (value != result) {
                    return true;
                }
                return false;
            },
            LeftContain: function (value, result) {
                if (value.indexOf(result) == 0) {
                    return true;
                }
                return false;
            },
            RightContain: function (value, result) {
                var ret = value.lastIndexOf(result);
                if (value.length - result.length == ret) {
                    return true;
                }
                return false;
            },
            Contain: function (value, result) {
                var ret = value.indexOf(result);
                if (ret >= 0) {
                    return true;
                }
                return false;
            },
            GreaterThan: function (value, result) {
                if (value > result) {
                    return true;
                };
                return false;
            },
            GreaterEqualThan: function (value, result) {
                if (value >= result) {
                    return true;
                };
                return false;
            },
            LessThan: function (value, result) {
                if (value < result) {
                    return true;
                };
                return false;
            },
            LessEqualThan: function (value, result) {
                if (value <= result) {
                    return true;
                };
                return false;
            }
        };
        var searchWindow = {
            createContainer: function (opt) {
                var height = $(window).height() + "px";
                var width = $(window).width() + "px";
                var id = opt.id;
                $("body").append('<div class="hoteam-grid-overlay" style="z-index:8;height:' + height + ';width:' + width + '"></div>');
                //判断是否已经有了弹框元素
                var searchObj = $("#" + id + "_LocalSearch");
                if (searchObj.length == 0) {
                    var dialog = $(
                        '<div class="hoteam-localsearch-dialog" id="' + id + '_LocalSearch">' +
                        '<div class="hoteam-localsearch-d-title hoteam-localsearch-title">' +
                        '<span class="hoteam-localsearch-d-text">' + HoteamUI.Language.Lang("LocalSearch", "Title") + '</span>' +
                        '<span class="hoteam-localsearch-d-close basesprite b-dialog-close"></span>' +
                        '</div>' +
                        '<div class="hoteam-localsearch-d-content" id="' + id + '_LocalSearchContent">' + //Content
                        '<div class="localSearch-container">' +
                        '<div class="localSearch-container-row">' +
                        '<div class="field">' +
                        '  <select class="w100 field-select">' +
                        '  </select>' +
                        '</div>' +
                        '<div class="condition">' +
                        '  <select class="w100 condition-select">' +
                        '  </select>' +
                        '</div>' +
                        '<div class="result">' +
                        '  <input type="text" class="w100 form-control input-sm"/>' +
                        '</div>' +
                        '<div class="connect">' +
                        '  <select class="w100 connect-select">' +
                        '  </select>' +
                        '</div>' +
                        '<div class="add">' +
                        '</div>' +
                        '<div class="subduct">' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<hr class="hoteam-localsearch-split"/>' +
                        '<div class="hoteam-localsearch-d-btns hoteam-localsearch-center">' +
                        '<button class="btn btn-default btn-sm localquery">' + HoteamUI.Language.Lang("Common", "Query") + '</button>' +
                        '<button class="btn btn-default btn-sm localcancel">' + HoteamUI.Language.Lang("Common", "Cancel") + '</button>' +
                        '</div>' +
                        '</div>');
                    $("body").append(dialog);
                    var container = $("#" + opt.id + "_LocalSearchContent");
                    $("#" + id + "_LocalSearch").draggable({
                        containment: $("body"),
                        handle: ".hoteam-localsearch-title"
                    });
                    this.initControlData(opt, container);
                    this.initCondition(container);
                    this.initConnect(container);
                    this.eventBind(container);
                    this.initHandler(opt);
                    container.find(".subduct").hide();
                } else {
                    searchObj.show();
                }
            },
            eventBind: function (container) {
                var that = this;
                function addEvent(btn) {
                    var row = $(btn).closest(".localSearch-container-row");
                    var clone = $(row).clone();
                    $(clone).insertAfter($(row));
                    that.eventBind(clone);
                };
                function remove(btn) {
                    var row = $(btn).closest(".localSearch-container-row");
                    row.remove();
                };
                var add = container.find(".add");
                var subduct = container.find(".subduct").show();
                add.on("click", function () {
                    addEvent(this);
                })
                subduct.on("click", function () {
                    remove(this);
                })
            },
            initControlData: function (opt, container) {
                if (opt.Fields && opt.Fields.length > 0) {
                    //初始化字段下拉框
                    var fieldDom = container.find(".field-select");
                    fieldDom.children().remove();
                    var fieldDom = container.find(".field-select");
                    for (var i = 0, len = opt.Fields.length; i < len; i++) {
                        fieldDom.append("<option value='" + opt.Fields[i].Value + "'>" + opt.Fields[i].Text + "</option>");
                    }
                }
            },
            initCondition: function (container) {
                var condition = container.find(".condition-select");
                condition.children().remove();
                condition.append("<option value='Equal'>" + HoteamUI.Language.Lang("LocalSearch", "Equal") + "</option>");
                condition.append("<option value='NotEqual'>" + HoteamUI.Language.Lang("LocalSearch", "NotEqual") + "</option>");
                condition.append("<option value='LeftContain'>" + HoteamUI.Language.Lang("LocalSearch", "LeftContain") + "</option>");
                condition.append("<option value='RightContain'>" + HoteamUI.Language.Lang("LocalSearch", "RightContain") + "</option>");
                condition.append("<option value='Contain'>" + HoteamUI.Language.Lang("LocalSearch", "Contain") + "</option>");
                condition.append("<option value='GreaterThan'>" + HoteamUI.Language.Lang("LocalSearch", "GreaterThan") + "</option>");
                condition.append("<option value='GreaterEqualThan'>" + HoteamUI.Language.Lang("LocalSearch", "GreaterEqualThan") + "</option>");
                condition.append("<option value='LessThan'>" + HoteamUI.Language.Lang("LocalSearch", "LessThan") + "</option>");
                condition.append("<option value='LessEqualThan'>" + HoteamUI.Language.Lang("LocalSearch", "LessEqualThan") + "</option>");
            },
            initConnect: function (container) {
                var connect = container.find(".connect-select");
                connect.children().remove();
                connect.append("<option value='And'>" + HoteamUI.Language.Lang("LocalSearch", "And") + "</option>");
                connect.append("<option value='Or'>" + HoteamUI.Language.Lang("LocalSearch", "Or") + "</option>");
            },
            initHandler: function (opt) {
                var that = this;
                var container = $("#" + opt.id + "_LocalSearch");
                var close = container.find(".b-dialog-close");
                close.on("click", function () {
                    $(this).closest(".hoteam-localsearch-dialog").hide();
                    $(".hoteam-grid-overlay").remove();
                })
                var search = container.find(".localquery");
                search.on("click", function () {
                    var result = that.searchFilter(container, opt);
                    if (typeof opt.searchcallback == "function") {
                        opt.searchcallback(result);
                        close.click();
                    }
                });
                var cancel = container.find(".localcancel");
                $(cancel).on("click", function () {
                    $(this).closest(".hoteam-localsearch-dialog").hide();
                    $(".hoteam-grid-overlay").remove();
                })
            },
            searchFilter: function (container, opt) {
                var id = opt.table.attr("id");
                var rows = container.find(".localSearch-container-row");
                var filters = [];
                var arr = [];
                $.each(rows, function (i, e) {
                    var row = $(e);
                    var filter = {};
                    filter.Field = row.find('.field-select').val();
                    filter.Condition = row.find('.condition-select').val();
                    filter.Result = row.find(".input-sm").val();
                    filter.Link = row.find('.connect-select').val();
                    //每次遇到Or连接就重新创建一个数组
                    //这样就能把所有And连接组合在一起判断
                    //所有的And连接的arr中的任何一个判断通过就算通过
                    arr.push(filter);
                    if (filter.Link == "Or") {
                        filters.push(arr);
                        arr = [];
                    } else if (i == rows.length - 1) {
                        filters.push(arr);
                    }
                })
                var result = [];
                var hideArr = [];
                var showArr = [];
                for (var r = 0, rLen = opt.data.length; r < rLen; r++) {
                    //用来记录Or判断的结果
                    var rowRet = false;
                    //遍历里面的每个数组
                    for (var i = 0, iLen = filters.length; i < iLen; i++) {
                        //用来记录所有and条件结果
                        var ret = true;
                        //遍历里面的数组里面的每个And条件
                        for (var j = 0, jLen = filters[i].length; j < jLen; j++) {
                            ret = this.CompareValue(filters[i][j].Condition, opt.data[r].cellattr[filters[i][j].Field].ColText, filters[i][j].Result);
                            //And判断结果：只要有一个为false就算不通过
                            if (ret == false) {
                                break;
                            }
                        }
                        //Or判断结果：只要有一个为true就算通过
                        if (ret == true) {
                            rowRet = true;
                            break;
                        }
                    }
                    if (rowRet == true) {
                        //result.push(opt.data[r]);
                        showArr.push(r + 1);
                    } else {
                        hideArr.push(r + 1);
                    }
                }
                opt.table.htGrid("cancelRowMerge"); //设置取消行合并
                if (id.indexOf("_EditTreeGrid") == -1) {
                    opt.table.htGrid("hideTrs", hideArr);
                    opt.table.htGrid("showTrs", showArr);
                } else {
                    $.hoteamEditTreeGrid.openParentNode(id, showArr);
                }
                return result;
            },
            CompareValue: function (condation, value, result) {
                switch (condation) {
                    case "Equal":
                        return Compare.Equal(value, result);
                        break;
                    case "NotEqual":
                        return Compare.NotEqual(value, result);
                        break;
                    case "LeftContain":
                        return Compare.LeftContain(value, result);
                        break;
                    case "RightContain":
                        return Compare.RightContain(value, result);
                        break;
                    case "Contain":
                        return Compare.Contain(value, result);
                        break;
                    case "GreaterThan":
                        return Compare.GreaterThan(value, result);
                        break;
                    case "GreaterEqualThan":
                        return Compare.GreaterEqualThan(value, result);
                        break;
                    case "LessThan":
                        return Compare.LessThan(value, result);
                        break;
                    case "LessEqualThan":
                        return Compare.LessEqualThan(value, result);
                        break;
                }
            }
        }
        $.hoteamLocalSearch = {
            defaults: {
                id: null,
                parentId: null,
                data: [],
                table: {},
                searchcallback: function () { }
            },
            create: function (options) {
                var opt = $.extend(true, {}, this.defaults, options);
                searchWindow.createContainer(opt);
            }
        }
    }(jQuery))
}
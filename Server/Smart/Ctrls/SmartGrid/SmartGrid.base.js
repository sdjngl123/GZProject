//列表当前展示模式
(function ($, undefined) {
    "user strict";
    $.htSmartGrid = {
        version: "1.0.0",
        defaults: {
            parentId: null,
            id: null,
            grid: null,
            gridTitle: null,
            gridBody: null,
            gridPager: null,
            gridDrager: null,
            gridContainer: null,
            ctrlEvent: null,
            setting: {
                addButton: null,
                datatype: 'local',
                rowNum: 10000000,
                autowidth: true,
                viewrecords: true,
                sortable: false,
                height: 0,
                minWidth: null,
                multiselect: true,
                pager: null,
                showPageBar: false,
                rownumbers: true,
                colNames: [],
                colModel: []
            },
            handlers: {
                OnLoadRows: null,
                OnColImageClick: null,
                OnColLinkClick: null,
                OnRowDblCLick: null,
                OnRowClick: null
            }
        },
        defaultPager: function () {
            return {
                CurrentPager: 1, //当前页
                RowNumber: null, //每页条数
                SortOrder: null, //排序模式
                SortName: null,  //排序依据列
                PagerTotal: 0   //总页数
            }
        },
        opt: {
            parentId: null,
            id: null,
            grid: null,
            gridTitle: null,
            gridBody: null,
            gridPager: null,
            gridDrager: null,
            gridContainer: null,
            ctrlEvent: null,
            setting: {
                addButton: null,
                datatype: 'local',
                rowNum: 10000000,
                autowidth: true,
                viewrecords: true,
                sortable: false,
                height: 0,
                minWidth: null,
                multiselect: true,
                pager: null,
                showPageBar: false,
                rownumbers: true,
                colNames: [],
                colModel: []
            },
            handlers: {
                OnLoadRows: null,
                OnColImageClick: null,
                OnColLinkClick: null,
                OnRowDblCLick: null,
                OnRowClick: null
            }
        },
        css: {
            gridContainer: "htGrid",
            gridTitle: "htGrid_Title",
            girdBody: "htGrid_body",
            gridCommon: "htGrid_common",
            gridPager: "htGrid_Pager",
            gridPager_button: "htGrid_Pager_Button",
            gridPager_page: "htGrid_Pager_page",
            gridCommon_top: "htGrid_common_top",
            gridCommon_left: "htGrid_common_left",
            gridPager_pageinfo: "htGrid_Pager_pageinfo",
            gridhtBox: "htGridhtBox", //右侧padding值 空出滚动条
            gridRowDataRow: "dataRow", //数据列
            gridRowEven: "even", //隔行换色
            gridColRowIndex: "rowIndex", //行号列
            gridPagerTotal: "pagerTotal",
            gridPagerText: "htGridPageText",
            gridTitle_Resize: "htgrid-resize",
            gridDrager: "drager",
            gridTitle_Sortable: "htgrid_sortable",
            gridTitle_Th_Sortable: "htgrid_th_sortable",
            gridBody_Row_Selected: "htgrid_tr_selected",
            gridBody_Col_Checkbox: "htgrid_col_checked",
            gridBody_Col_button: "htgrid_col_img",
            gridBody_Col_Progress: "htgrid_col_progress",
            grid_auto_td: "gridautotd",
            gridPager_page_width: 300,
            rowNumberWidth: 30,
            rowCheckBoxWidth: 40,
            rowImageWidth: 40,
            autoColMinWidth: 100,
            gridColPadding: 8, //单元格左右padding和边框总和
            rowHeight: 44,
            dragerMinWidth: 50,
            gridScrollPadding: 20,
            gridTitleAutoColWidth: 18
        },
        create: function (options) {
            this.opt = $.extend(true, {}, this.defaults, options);
            this.opt.gridContainer = $("#" + this.opt.parentId);

            //记录基本设置
            this.opt.gridContainer.data("gridOptions", this.opt);
            if (this.opt.setting.colModel.length == 0)
                return;

            //创建表格容器--表头、表身、表底分页
            var grid = $("#" + this.opt.id);
            //是否已经创建，若创建则不再创建框架
            var isExist = false;
            if (grid.length) {
                this.opt.grid = grid;
                isExist = true;
            }
            else {
                this.opt.grid = this._createGrid(this.opt.setting.showPageBar);
            }
            this.opt.gridTitle = this.opt.grid.children("." + this.css.gridTitle);
            this.opt.gridBody = this.opt.grid.children("." + this.css.girdBody);
            this.opt.gridPager = this.opt.grid.children("." + this.css.gridPager);
            this.opt.gridDrager = this.opt.gridBody.children("." + this.css.gridDrager);
            //更新基本配置信息
            this.opt.gridContainer.data("gridOptions", this.opt);

            var newTemplate = this.__createRowTemplate__();
            var oldTemplate = this.opt.grid.data("rowTemplate");

            //如果存在但是模板数据不一致，则重置grid
            if (isExist && newTemplate != oldTemplate) {
                //创建表头
                this._createTitleAndDefaultRow();
                //绑定基础事件
                this._initHandlers(this.opt);
                this.opt.grid.data("rowTemplate", newTemplate);
            }

            if (isExist == false) {
                //创建表头
                this._createTitleAndDefaultRow();
                this._createPager();
                this.opt.grid.data("rowTemplate", newTemplate);

                //绑定基础事件
                this._initHandlers(this.opt);
            }
            //加载数据，如果默认需要加载数据则自动执行loadRowData
            if (this.opt.setting.autoLoadData && this.opt.handlers.OnLoadRows) {
                var ctrlEvent = this.opt.ctrlEvent;
                HoteamUI.Common.ExeFunction(this.opt.handlers.OnLoadRows, ctrlEvent);
            }

            //进行初次页面布局
            this.__resize__(this.opt.gridContainer, this.opt.gridTitle, this.opt.gridBody, this.opt.gridPager);
            //清除临时的Opt
            this.opt = undefined;
        },
        loadRowData: function (grid, rowData) {
            var self = this;
            var gridContainer = grid.parent();
            var gridDefaultOptions = gridContainer.data("gridOptions");
            var rowTotal = rowData.RecordsTotal;

            //清空数据
            this.clearGrid(gridDefaultOptions);

            //将全选checkbox复位
            grid.find(".htGrid_Title").find(".htgrid_col_checked").removeClass("b-checkboxsel").addClass("b-checkboxunsel");
            //如果有悬浮框，将悬浮框隐藏
            $(".hoteam-suspension").hide();

            var pageInfo = this._setPageInfo(gridDefaultOptions.gridPager, rowTotal);

            //用于清空数据
            if (pageInfo.PagerTotal === 0) {
                return;
            }

            //若非法请求超过最大页码的信息时，按照尾页刷新数据
            if (pageInfo.CurrentPager > pageInfo.PagerTotal) {
                pageInfo.CurrentPager = pageInfo.PagerTotal;
                var ctrlEvent = gridDefaultOptions.ctrlEvent;
                HoteamUI.Common.ExeFunction(gridDefaultOptions.handlers.OnLoadRows, ctrlEvent);
                return;
            }
            var startRowIndex = (pageInfo.CurrentPager - 1) * pageInfo.RowNumber + 1;

            this._loadRowData_(gridDefaultOptions, rowData.Rows, startRowIndex);

            this.changeDisplayStyle(grid.attr('id'), grid.find(".htGrid_body").attr("model"));
        },
        resize: function (gridContainer) {
            var gridDefaultOptions = gridContainer.data("gridOptions");
            if (gridDefaultOptions.gridBody) {  //若表框架没有创建出来则不进行重绘
                this.__resize__(gridContainer, gridDefaultOptions.gridTitle, gridDefaultOptions.gridBody, gridDefaultOptions.gridPager, gridDefaultOptions.setting.showStaticticalInformation);
            }
        },
        clearGrid: function (opt) {
            //清空数据
            opt.gridBody.find("table tr:gt(0)").remove();
            opt.gridTitle.find("span." + this.css.gridBody_Col_Checkbox).removeAttr("checked");
        },
        getPageInfo: function (gridContainer) {
            var gridDefaultOptions = gridContainer.data("gridOptions");
            if (gridDefaultOptions.gridPager) {
                return this._getPageInfo(gridDefaultOptions.gridPager);
            }
        },
        setPageInfo: function (gridContainer, pageInfo) {
            var gridDefaultOptions = gridContainer.data("gridOptions");
            if (gridDefaultOptions.gridPager) {
                gridDefaultOptions.gridPager.data("PageInfo", pageInfo);
                return this._setPageInfo(gridDefaultOptions.gridPager, 0);
            }
        },
        getSelectedRow: function (gridContainer) {
            var gridDefaultOptions = gridContainer.data("gridOptions");
            var result = [];
            if (gridDefaultOptions.gridBody) {
                var selectedRows = gridDefaultOptions.gridBody.find("tr." + this.css.gridBody_Row_Selected);
                result = this.__getRowData__(gridDefaultOptions, selectedRows);
            }
            return result;
        },
        setSelectedRow: function (gridContainer, rows) {
            var gridDefaultOptions = gridContainer.data("gridOptions");
            var gridBody = gridDefaultOptions.gridBody;
            var rowIdList = rows;
            var self = this;
            if ((rows).length == undefined) {
                rowIdList = [rows];
            }
            if (gridDefaultOptions.setting.multiselect) {
                for (var i in rowIdList) {
                    var rowid = rowIdList[i];
                    if (rowid > 0) {
                        gridBody.find("tr:eq(" + rowid + ")")
                        .addClass(this.css.gridBody_Row_Selected)
                        .find("span." + self.css.gridBody_Col_Checkbox).attr("checked", "checked").removeClass("b-checkboxunsel").addClass("b-checkboxsel");
                    }
                }
            }
            else {
                var rowid = rowIdList[0];
                if (rowid > 0) {
                    gridBody.find("tr").removeClass(this.css.gridBody_Row_Selected);
                    gridBody.find("tr:eq(" + rowid + ")")
                    .addClass(this.css.gridBody_Row_Selected)
                    .find("span." + self.css.gridBody_Col_Checkbox).attr("checked", "checked").removeClass("b-checkboxunsel").addClass("b-checkboxsel");
                }
            }
        },
        getCurrentPageRow: function (gridContainer) {
            var gridDefaultOptions = gridContainer.data("gridOptions");
            var result = [];
            if (gridDefaultOptions.gridBody) {
                //去除样式行 gt（0）
                var trs = gridDefaultOptions.gridBody.find("tr:gt(0)");
                result = this.__getRowData__(gridDefaultOptions, trs);
            }
            return result;
        },
        removeSelectedRows: function (gridContainer) {
            var gridDefaultOptions = gridContainer.data("gridOptions");
            if (gridDefaultOptions.gridBody) {
                gridDefaultOptions.gridBody.find("tr." + this.css.gridBody_Row_Selected).remove();
                this._resetRowIndex(gridDefaultOptions.gridBody);
            }
        },
        showButton: function (gridContainer, btnName, show) {
            var gridDefaultOptions = gridContainer.data("gridOptions");
            if (gridDefaultOptions.gridPager) {
                var btn = gridDefaultOptions.gridPager.find("td." + this.css.gridPager_button + " table td." + btnName);
                if (show)
                    btn.show();
                else
                    btn.hide();
            }
        },
        showTitleButton: function (gridContainer, btnName, show) {
            var gridDefaultOptions = gridContainer.data("gridOptions");
            var display = show ? "block" : "none";
            if (gridDefaultOptions.gridTitle) {
                if (btnName == "refreshButton") {
                    gridDefaultOptions.gridTitle.find(".gridTitleRefresh").css("display", display);
                } else if (btnName == "treeButton") {
                    gridDefaultOptions.gridTitle.find(".gridTitleTreeOperation").css("display", display);
                } else if (btnName == "modelButton") {
                    gridDefaultOptions.gridTitle.find(".gridTitleListModel").css("display", display);
                    gridDefaultOptions.gridTitle.find(".gridTitleImgModel").css("display", display);
                }
            }
        },
        addRows: function (gridContainer, data) {
            var gridDefaultOptions = gridContainer.data("gridOptions");
            if (gridDefaultOptions.gridBody) {
                var startRowIndex = gridDefaultOptions.gridBody.find("tr").size();
                this._loadRowData_(gridDefaultOptions, data, startRowIndex);
            }
        },
        resetSelectedRow: function (gridContainer) {
            var gridDefaultOptions = gridContainer.data("gridOptions");
            if (gridDefaultOptions.gridBody) {
                gridDefaultOptions.gridBody.find("tr." + this.css.gridBody_Row_Selected)
                .removeClass(this.css.gridBody_Row_Selected)
                .find("span." + this.css.gridBody_Col_Checkbox).removeAttr("checked").addClass("b-checkboxunsel").removeClass("b-checkboxsel");
            }
        },
        _resetRowIndex: function (gridBody) {
            var self = this;
            gridBody.find("tr:gt(0)").each(function (i) {
                var rowIndx = $(this).find("td." + self.css.gridColRowIndex);
                rowIndx.html(i + 1);
            });
        },
        _getPageInfo: function (pager) {
            var pagerInfo = pager.data("PageInfo") || new this.defaultPager();
            pagerInfo.RowNumber = pager.find("select").val();
            return pagerInfo;
        },
        _setPageInfo: function (pager, rowTotal) {
            var pageInfo = pager.data("PageInfo") || new this.defaultPager();
            pageInfo.RowNumber = pageInfo.RowNumber || pager.find("select").val();
            pageInfo.PagerTotal = rowTotal;
            pageInfo.PagerTotal = rowTotal / pageInfo.RowNumber;
            if (pageInfo.PagerTotal.toString().indexOf('.') > -1) {
                pageInfo.PagerTotal = +pageInfo.PagerTotal.toString().split('.')[0] + 1;
            }

            var startRowNum = (pageInfo.CurrentPager - 1) * pageInfo.RowNumber + 1;
            var endRowNum = pageInfo.CurrentPager * pageInfo.RowNumber;

            endRowNum = endRowNum > rowTotal ? rowTotal : endRowNum;
            if (startRowNum > endRowNum) {
                startRowNum = endRowNum;
            }
            //更改分页信息
            $(pager.find(".paging_statistics span").eq(0)).html(startRowNum + "-" + endRowNum);
            $(pager.find(".paging_statistics span").eq(1)).html(HoteamUI.Common.Format(this.__getLanguage__("RecordText"), rowTotal));
            $(pager.find(".paging_statistics span").eq(2)).html(HoteamUI.Common.Format(this.__getLanguage__("PageText"), pageInfo.PagerTotal));

            //设置分页按钮
            var contentbtns = pager.find("div.paging_content div.paging-btn"),
                pageBtn = $(contentbtns).not($(contentbtns).eq(0)).not($(contentbtns).eq(6)),
                startPage = 0, endPage = 0;
            var n = (pageInfo.CurrentPager / 5).toString();
            if (n.indexOf(".") > 0) {
                startPage = parseInt(pageInfo.CurrentPager / 5) * 5 + 1;
            } else {
                startPage = parseInt(pageInfo.CurrentPager) - 4;
            }
            for (var i = 0; i <= 4; i++) {
                if ((startPage + i) <= pageInfo.PagerTotal) {
                    $(pageBtn).eq(i).show().html(startPage + i);
                    if ((startPage + i) == pageInfo.CurrentPager) {
                        $(pageBtn).eq(i).addClass("paging-btn-sel");
                    } else {
                        $(pageBtn).eq(i).removeClass("paging-btn-sel");
                    }
                    endPage = startPage + i;
                } else {
                    $(pageBtn).eq(i).hide();
                }
            }
            pageInfo.startPage = startPage;
            //设置方向按钮的状态
            if (startPage > 1) {
                $(contentbtns).eq(0).children(".paging-direction")
                .removeClass("b-double-angle-left").addClass("b-blue-double-angle-left");
            } else {
                $(contentbtns).eq(0).children(".paging-direction").
                addClass("b-double-angle-left").removeClass("b-blue-double-angle-left");
            }
            if (endPage < pageInfo.PagerTotal) {
                $(contentbtns).eq(6).children(".paging-direction")
                .removeClass("b-double-angle-right").addClass("b-blue-double-angle-right");
            } else {
                $(contentbtns).eq(6).children(".paging-direction")
                .addClass("b-double-angle-right").removeClass("b-blue-double-angle-right");
            }
            pager.data("PageInfo", pageInfo);
            return pageInfo;
        },
        _initHandlers: function (opt) {
            var self = this;
            //清除所有事件
            opt.gridBody
            .off("scroll")
            .off("click")
            .off("dblclick");
            opt.gridPager
            .off("click")
            .off("change")
            .off("keydown");
            opt.gridTitle
            .off("click");

            //滚动条事件，用于同步表头位置
            opt.gridBody.on({
                scroll: function () {
                    var bodyScrollLeft = $(this).scrollLeft();
                    opt.gridTitle.find(".htGridhtBox").scrollLeft(bodyScrollLeft);
                }
            });

            //分页区域事件处理
            opt.gridPager.on({
                click: function () {
                    if ($(this).hasClass("paging-btn-sel")) {
                        return;
                    }
                    var pageInfo = opt.gridPager.data("PageInfo");
                    if ($(this).find("span.basesprite").length > 0 && $(this).prev().length == 0) {
                        pageInfo.CurrentPager = pageInfo.startPage - 5;
                    } else if ($(this).find("span.basesprite").length > 0 && $(this).prev().length > 0) {
                        pageInfo.CurrentPager = pageInfo.startPage + 5;
                    } else {
                        pageInfo.CurrentPager = $(this).text();
                    }
                    var ctrlEvent = opt.ctrlEvent;
                    HoteamUI.Common.ExeFunction(opt.handlers.OnLoadRows, ctrlEvent);
                }
            }, "div.paging_content div.paging-btn");

            //一页多少条 select change
            opt.gridPager.find("div.paging_sel_c select").on({
                change: function () {
                    var value = $(this).val();
                    var pageInfo = opt.gridPager.data("PageInfo");
                    pageInfo.RowNumber = value;
                    opt.gridPager.data("PageInfo", pageInfo);
                    var ctrlEvent = opt.ctrlEvent;
                    HoteamUI.Common.ExeFunction(opt.handlers.OnLoadRows, ctrlEvent);
                }
            });

            //表头排序
            opt.gridTitle.on({
                click: function (e) {
                    var pageOptions = opt.gridPager.data("PageInfo") || {};
                    var colName = $(this).attr("data-colname");
                    if (pageOptions.SortOrder && pageOptions.SortName == colName && pageOptions.SortOrder == "asc") {
                        //如果排序依据就是该列，则应按照当前排序的反向排序
                        pageOptions.SortOrder = "desc";
                        //给当前点击的th添加排序样式
                        $(this).find("span.htgrid_th_sortable").removeClass("b-sort-down").addClass("b-sort-top");
                    }
                    else {
                        pageOptions.SortOrder = "asc";
                        //去掉其余的排序样式,给当前点击的th添加排序样式
                        $(this).closest("tr").find("span.htgrid_th_sortable").removeClass("b-sort-top").removeClass("b-sort-down");
                        $(this).find("span.htgrid_th_sortable").addClass("b-sort-down");
                    }
                    pageOptions.SortName = colName;
                    opt.gridPager.data("PageInfo", pageOptions);

                    //重新读取数据
                    var ctrlEvent = opt.ctrlEvent;
                    HoteamUI.Common.ExeFunction(opt.handlers.OnLoadRows, ctrlEvent);
                }
            }, "table th." + this.css.gridTitle_Sortable);

            //表头check全选
            opt.gridTitle.find("span." + self.css.gridBody_Col_Checkbox).parent().click(function () {
                //如果是已经选中，则取消全选状态
                var check = $(this).children("." + self.css.gridBody_Col_Checkbox);
                if ($(check).hasClass("b-checkboxsel")) {
                    $(check).removeClass("b-checkboxsel").addClass("b-checkboxunsel"); //移除样式
                    var checkboxs = opt.gridBody.find("tr span." + self.css.gridBody_Col_Checkbox); //查找所有的checkbox
                    var isImg = opt.gridBody.attr("model") == "img";
                    for (var i = 0; i < checkboxs.length; i++) {
                        var checkbox = $(checkboxs[i]);
                        //将所有选中的取消选中状态
                        if (checkbox.hasClass("b-checkboxsel")) {
                            checkbox.removeClass("b-checkboxsel").addClass("b-checkboxunsel").removeAttr("checked");
                            checkbox.closest("tr").removeClass(self.css.gridBody_Row_Selected);
                            if (isImg) {//如果是缩略图模式，需要将之隐藏
                                checkbox.hide();
                            }
                        }
                    }
                } else {//如果是未选中状态
                    $(check).addClass("b-checkboxsel").removeClass("b-checkboxunsel"); //移除样式
                    var checkboxs = opt.gridBody.find("tr span." + self.css.gridBody_Col_Checkbox); //查找所有的checkbox
                    var isImg = opt.gridBody.attr("model") == "img";
                    for (var i = 0; i < checkboxs.length; i++) {
                        var checkbox = $(checkboxs[i]);
                        //将所有未选中的置为选中状态
                        if (!checkbox.hasClass("b-checkboxsel")) {
                            checkbox.removeClass("b-checkboxunsel").addClass("b-checkboxsel").attr("checked", "checked");
                            checkbox.closest("tr").addClass(self.css.gridBody_Row_Selected);
                            if (isImg) {//如果是缩略图模式，需要将之展示
                                checkbox.css("display", "inline-block");
                            }
                        }
                    }
                }
                //下面执行点击事件
                var ctrlEvent = opt.ctrlEvent;
                HoteamUI.Common.ExeFunction(opt.handlers.OnRowClick, ctrlEvent);
            });

            //表身数据checkbox点击
            opt.gridBody.on({
                click: function (e) {
                    var checkbox = $($(this).children("span." + self.css.gridBody_Col_Checkbox));
                    if (checkbox.length == 0) {
                        return;
                    }
                    //如果是点击的checkbox控件，那么则不考虑行是否互斥
                    //如果当前是选中状态，则取消选中状态
                    var tr = checkbox.closest("tr");
                    if (checkbox.attr("checked")) {
                        checkbox.removeAttr("checked").removeClass("b-checkboxsel").addClass("b-checkboxunsel");
                        tr.removeClass(self.css.gridBody_Row_Selected); //取消行选中样式
                        opt.gridTitle.find("span." + self.css.gridBody_Col_Checkbox).removeAttr("checked").removeClass("b-checkboxsel").addClass("b-checkboxunsel"); //取消列表头的全选选中状态
                    } else {
                        checkbox.attr("checked", "checked").removeClass("b-checkboxunsel").addClass("b-checkboxsel");
                        tr.addClass(self.css.gridBody_Row_Selected); //取消行选中样式
                    }
                    //下面执行点击事件
                    var ctrlEvent = opt.ctrlEvent;
                    ctrlEvent.rowobject = self.__getRowData__(opt, tr)[0];
                    ctrlEvent.rowid = tr.index();
                    ctrlEvent.rowselected = tr.find("span.htgrid_col_checked").attr("checked") ? true : false;
                    HoteamUI.Common.ExeFunction(opt.handlers.OnRowClick, ctrlEvent);
                    e.stopPropagation();
                }
            }, "tr td");

            //图片或者a元素点击事件
            opt.gridBody.on({
                click: function (e) {
                    //隐藏悬浮框
                    $(".hoteam-suspension").hide();
                    var button = $(this);
                    var td = button.closest("td");
                    var tr = button.closest("tr");
                    var ctrlEvent = opt.ctrlEvent;
                    ctrlEvent.rowobject = self.__getRowData__(opt, tr)[0];
                    ctrlEvent.colName = td.attr("data-colname");
                    ctrlEvent.rowid = tr.index();
                    if (this.tagName.toLocaleLowerCase() == 'a') {
                        if ($(this).attr("jsmethod")) {
                            HoteamUI.Common.ExeFunction($(this).attr("jsmethod"), ctrlEvent);
                        } else {
                            HoteamUI.Common.ExeFunction(opt.handlers.OnColLinkClick, ctrlEvent);
                        }
                    } else if (this.tagName.toLocaleLowerCase() == "div") {
                        HoteamUI.Common.ExeFunction(opt.handlers.OnColImageClick, ctrlEvent);
                    }
                    e.stopPropagation();
                }
            }, "." + this.css.gridBody_Col_button);

            //自定义按钮
            opt.gridPager.find("table td." + this.css.gridPager_button + " table").on({
                click: function () {
                    var ctrlEvent = opt.ctrlEvent;
                    var js = $(this).attr("data-click");
                    var rows = self.getSelectedRow(opt.gridContainer);
                    if (rows.length <= 0) {
                        rows = self.getCurrentPageRow(opt.gridContainer);
                    }
                    var rowsIndexList = [];
                    var pager = self.getPageInfo(opt.gridContainer);
                    var startIndex = (pager.CurrentPager - 1) * pager.RowNumber;

                    for (var i in rows) {
                        var value = +rows[i]["__rowIndex__"];
                        value = value - startIndex;
                        rowsIndexList.push(value);
                    }
                    ctrlEvent.rows = rows;
                    ctrlEvent.rowsIndexList = rowsIndexList;
                    eval(js);

                }
            }, "td");

            //行事件
            opt.gridBody.on({
                click: function (e) {
                    var tr = $(this),
                            selected = false,
                            checked = tr.find("span." + self.css.gridBody_Col_Checkbox);
                    //如果当前选中行本身是未选中，则需进行以下，如果本身是选中状态，则不需要进入if代码
                    if (!checked.attr("checked")) {
                        //如果没有checkbox控件,则肯定是只能选择一条||有checkbox，但是行互斥，那么也是只能选择一条
                        if (!opt.setting.multiselect || (opt.setting.multiselect && opt.setting.rowrejection)) {
                            //将其余的tr都设置为未选中
                            //1首先替换checkbox图片,删除checked属性，如果是缩略图模式，需要隐藏checkbox
                            var isImg = opt.gridBody.attr("model") == "img";
                            if (isImg) {
                                opt.gridBody.find("tr." + self.css.gridBody_Row_Selected).find(".htgrid_col_checked").removeAttr("checked").removeClass("b-checkboxsel").addClass("b-checkboxunsel").hide();
                            } else {
                                opt.gridBody.find("tr." + self.css.gridBody_Row_Selected).find(".htgrid_col_checked").removeAttr("checked").removeClass("b-checkboxsel").addClass("b-checkboxunsel");
                            }
                            //2然后移除选中颜色,并判断当前模式
                            opt.gridBody.find("tr." + self.css.gridBody_Row_Selected).removeClass(self.css.gridBody_Row_Selected);
                        }
                    }
                    //如果当前点击的行本来是选中状态，则移除选中颜色；否则添加选中颜色，并将selected参数设为true
                    if (tr.hasClass(self.css.gridBody_Row_Selected)) {
                        tr.removeClass(self.css.gridBody_Row_Selected);
                    }
                    else {
                        tr.addClass(self.css.gridBody_Row_Selected);
                        selected = true;
                    }
                    //通过selected，来改变checkbox控件；如果true，则选中，反之。。。。
                    if (selected) {
                        checked.attr("checked", "checked");
                        checked.addClass("b-checkboxsel").removeClass("b-checkboxunsel");
                    }
                    else {
                        checked.removeAttr("checked");
                        checked.removeClass("b-checkboxsel").addClass("b-checkboxunsel");
                    }

                    //selected为false，那么表头全选的checkbox肯定是未选
                    if (!selected) {
                        opt.gridTitle.find("span." + self.css.gridBody_Col_Checkbox).removeAttr("checked").removeClass("b-checkboxsel").addClass("b-checkboxunsel");
                    }

                    //下面执行点击事件
                    var ctrlEvent = opt.ctrlEvent;
                    ctrlEvent.rowobject = self.__getRowData__(opt, tr)[0];
                    ctrlEvent.rowid = tr.index();
                    ctrlEvent.rowselected = tr.find("span.htgrid_col_checked").attr("checked") ? true : false;
                    HoteamUI.Common.ExeFunction(opt.handlers.OnRowClick, ctrlEvent);
                },
                mouseenter: function () {
                    var model = $(this).closest(".htGrid_body").attr("model");
                    if (model == "image") {
                        $(this).find("span.checkboximgModel").css("display", "inline-block");
                    }
                },
                mouseleave: function () {
                    var model = $(this).closest(".htGrid_body").attr("model");
                    if (model == "image") {
                        var check = $(this).find("span.checkboximgModel");
                        if (!check.attr("checked")) {
                            check.hide();
                        }
                    }
                }
            }, "tr");

            //行 双击
            if (opt.handlers.OnRowDblCLick) {
                opt.gridBody.on({
                    dblclick: function () {
                        var ctrlEvent = opt.ctrlEvent;

                        var tr = $(this);
                        ctrlEvent.rowobject = self.__getRowData__(opt, tr)[0];
                        ctrlEvent.rowid = tr.index();

                        $(this).addClass(self.css.gridBody_Row_Selected);
                        $(this).find("span." + self.css.gridBody_Col_Checkbox).attr("checked", "checked");
                        HoteamUI.Common.ExeFunction(opt.handlers.OnRowDblCLick, ctrlEvent);
                    }
                }, "tr");
            }

        },
        _createGrid: function (showPageBar) {
            var gridPager = (showPageBar ? '<div class="' + this.css.gridPager + '">' : '');
            var gridHtml = [
            '<div id="' + this.opt.id + '" class="' + this.css.gridContainer + '">',
            '   <div class="' + this.css.gridTitle + '">',
            '       <div class="' + this.css.gridhtBox + '"></div>',
            '   </div>',
            '   <div class="' + this.css.girdBody + '">',
            '       <table cellspacing="0" cellpadding="0" border="0">',
            '       </table>',
            '       <div class="' + this.css.gridDrager + '"></div>',
            '   </div>',
            gridPager,
            '   </div>',
            '</div>'
            ].join('');

            var grid = $(gridHtml);
            this.opt.gridContainer.append(grid);
            return grid;
        },
        _createTitleAndDefaultRow: function () {
            var gridTitleHtml = [
                "<table cellspacing='0'  cellpadding='0' border='0'>",
                "    <thead>",
                "        <tr>",
                "        </tr>",
                "    </thead>",
                "</table>"
                ].join('');
            var gridTitle = $(gridTitleHtml);
            var DefaultOption = this.__createTitleAndDefaultRow__();
            gridTitle.find("tr").append(DefaultOption.th);
            gridTitle.css("width", DefaultOption.gridWidth + this.css.gridTitleAutoColWidth);
            this.opt.gridTitle.children("div").empty().append(gridTitle);
            gridTitle.addClass(this.css.gridCommon);
            if (this.opt.setting.topLine) {
                gridTitle.addClass(this.css.gridCommon_top);
            }
            if (this.opt.setting.leftLine) {
                gridTitle.addClass(this.css.gridCommon_left);
            }
            var gridBody = this.opt.gridBody.children("table");
            gridBody.css("width", DefaultOption.gridWidth);
            gridBody.empty().append(DefaultOption.defaultRow);
        },
        _createPager: function () {
            var pagerHtml = [
                '<div class="paging_statistics">',
                    '<span style="margin:0 10px;"></span>',
                    '<span style="margin:0 5px;"></span>',
                    '<span style="margin:0 10px 0 0;"></span>',
                '</div>',
                '<div class="paging_content">',
                    '<div class="paging-btn"><span class="paging-direction basesprite b-double-angle-left"></span></div>',
                    '<div class="paging-btn"></div>', '<div class="paging-btn"></div>',
                    '<div class="paging-btn"></div>', '<div class="paging-btn"></div>',
                    '<div class="paging-btn"></div>',
                    '<div class="paging-btn" style="border-right:1px solid #dcdcdc;"><span class="paging-direction basesprite b-double-angle-right"></span></div>',
                    '<div class="paging_sel_c"><select class="paging_sel">' + this.__getRowListHtml__() + '</select></div>',
                '</div>',
            ].join('');
            var pager = $(pagerHtml);
            this.opt.gridPager.append(pager);
        },
        _loadRowData_: function (opt, rowData, startRowIndex) {
            var gridRowHtml = [];
            var rowTemplate = opt.grid.data("rowTemplate");
            var rowIndex = startRowIndex;

            for (var i in rowData) {
                var rowHtml = rowTemplate;
                var exceptLable = {};
                var isOnLoad = true; //是否是第一次加载时得到的数据。

                //隔行换色
                if ((rowIndex / 2).toString().indexOf('.') > -1) {
                    rowHtml = rowHtml.replace(this.__getReplaceLable__("__rowEven__"), "");
                }
                else {
                    rowHtml = rowHtml.replace(this.__getReplaceLable__("__rowEven__"), this.css.gridRowEven);
                }

                //替换行号
                rowHtml = rowHtml.replace(this.__getReplaceLable__("__rowIndex__"), rowIndex++);

                isOnLoad = rowData[i].length !== undefined;

                if (isOnLoad) {
                    //第一次加载时得到的数据
                    for (var j in rowData[i]) {

                        var col = rowData[i][j];
                        var text = this.__getReplaceLable__(col.ColName);
                        var content = "";
                        var isimg = false;
                        if (col.ColIcon) {
                            isimg = true;
                            var iconClass = '', iconStyle = '';
                            if (col.ColIcon.indexOf("~") < 0) {//如果有~，则是单独图片，否则则是class，代表的是雪碧图
                                iconClass = HoteamUI.Common.GetImage(col.ColIcon, 24);
                            } else {
                                iconStyle = "style='background:url(" + col.ColIcon.replace("~", PageInit.WebRootPath) + ") no-repeat;background-size:100% 100%;'";
                            }
                            content = "<div " + iconStyle + " class='listModel " + this.css.gridBody_Col_button + " " + iconClass +
                                            "' title='" + col.ColText + "' icon='" + col.ColIcon + "'>" +
                                        "</div>";
                        }
                        else {
                            content = col.ColText;
                            //20140916 bug
                            if (typeof content === "string") {
                                content = content.replace(/</g, '&lt;').replace(/>/g, "&gt;");
                            }
                        }
                        if (typeof content == "string" && content.indexOf("'") > -1 && isimg == false) {
                            var exptext = this.__getReplaceTitleLable__(col.ColName);
                            rowHtml = rowHtml.replace("title='" + text + "'", "title='" + exptext + "'");
                            exceptLable[exptext] = content;
                        }
                        rowHtml = rowHtml.replace(eval("/" + text + "/g"), content);

                        //添加颜色
                        var color = col.ColColor || "";
                        rowHtml = rowHtml.replace(eval("/" + this.__getReplaceLableColor__(col.ColName) + "/g"), color);
                    }

                }
                else {
                    //自定义添加行
                    for (var name in rowData[i]) {
                        var value;
                        var isimg = false;
                        var text = this.__getReplaceLable__(name);
                        if (name == "IMGICONTYPE") {
                            isimg = true;
                            var iconClass = '', iconStyle = '';
                            if (rowData[i].IMGICONPATH.indexOf("~") < 0) {//如果有~，则是单独图片，否则则是class，代表的是雪碧图
                                iconClass = HoteamUI.Common.GetImage(rowData[i].IMGICONPATH, 24);
                            } else {
                                iconStyle = "style='background:url(" + rowData[i].IMGICONPATH.replace("~", PageInit.WebRootPath) + ") no-repeat;background-size:100% 100%;'";
                            }
                            value = "<div " + iconStyle + " class='listModel " + this.css.gridBody_Col_button + " " + iconClass +
                                            "' title='" + rowData[i].IMGICONTYPE + "' icon='" + rowData[i].IMGICONPATH + "'>" +
                                        "</div>";
                        }
                        else {
                            value = rowData[i][name];
                        }
                        if (typeof value == "string" && value.indexOf("'") > -1 && isimg == false) {
                            var exptext = this.__getReplaceTitleLable__(name);
                            rowHtml = rowHtml.replace("title='" + text + "'", "title='" + exptext + "'");
                            exceptLable[exptext] = value;
                        }
                        rowHtml = rowHtml.replace(eval("/" + text + "/g"), value);
                    }

                    //自定义添加列，暂无法设置颜色。除非扩展__getRowData__方法。
                }
                if (HoteamUI.Common.HasProperty(exceptLable)) {
                    var rowObj = $(rowHtml);
                    for (var item in exceptLable) {
                        rowObj.find("[title='" + item + "']").attr("title", exceptLable[item]);
                    }
                    gridRowHtml.push(rowObj[0].outerHTML);
                }
                else {
                    gridRowHtml.push(rowHtml);
                }

            }
            gridRowHtml = gridRowHtml.join('');
            var gridBodyTable = opt.gridBody.children("table");
            gridRowHtml = $(gridRowHtml);

            gridBodyTable.append(gridRowHtml);
            gridBodyTable.addClass(this.css.gridCommon);
            if (opt.setting.leftLine) {
                gridBodyTable.addClass(this.css.gridCommon_left);
            }
        },
        __createRowTemplate__: function () {
            var rowHtml = [];
            rowHtml.push("<tr class='" + this.css.gridRowDataRow + " " + this.__getReplaceLable__("__rowEven__") + "'>");

            //创建checkbox选中列
            if (this.opt.setting.multiselect) {
                rowHtml.push("<td style='text-align: center;padding-left:0;'><span class='" + this.css.gridBody_Col_Checkbox + " basesprite b-checkboxunsel'></span></td>");
            }
            for (var i in this.opt.setting.colModel) {
                var model = this.opt.setting.colModel[i];
                var colName = " data-colName='" + model.name + "'";
                var showMode = " showMode='" + model.showmode + "' ";
                var text = this.__getReplaceLable__(model.name);
                switch (model.colType) {
                    case "image":
                        rowHtml.push("<td " + colName + " " + showMode + " style='text-align: center;padding-left:0;'>" + text + "</td>");
                        break;
                    case "hidden":
                        rowHtml.push("<td style='display:none' " + colName + "  " + showMode + " >" + text + "</td>");
                        break;
                    case "link":
                        var rowoperate = (model.suspensionmenufield == model.name) ? "showrowoperate='showrowoperate'" : "",
                            linkClass = (model.suspensionmenufield == model.name) ? "show-rowOperation" : "";
                        var a =
                    "<div class='smartlinkcontainer'><a href='javascript:void(0)' jsmethod='" + (model.jsmethod || '') + "' title='" + text +
                        "' class='" + this.css.gridBody_Col_button + "' style='color:" + this.__getReplaceLableColor__(model.name) + "'>" +
                        "<span class='gridthspan " + linkClass + "'>" + text + "</span>" +
                    "</a></div>";
                        rowHtml.push("<td style='overflow:visible'" + rowoperate + colName + "  " + showMode + "  style='text-align:" + model.textalign + "'>" + a + "</td>");
                        break;
                    case "progress":
                        rowHtml.push("<td " + colName + "  " + showMode + "  class='" + this.css.gridBody_Col_Progress + "'><a href='javascript:void(0)' title='" + text + "%'><span  style='background:" + this.__getReplaceLableColor__(model.name) + "; width:" + text + "%' ></span></a></td>");
                        break;
                    default:
                        var rowoperate = (model.suspensionmenufield == model.name) ? "showrowoperate='showrowoperate'" : "",
                            spanclass = (model.suspensionmenufield == model.name) ? "show-rowOperation" : "";
                        rowHtml.push(
                            "<td style='overflow:visible' " + rowoperate + " " + colName + "  " + showMode +
                                "  style='color:" + this.__getReplaceLableColor__(model.name) + "; text-align:" +
                                model.textalign + "' title='" + text + "'>" +
                                "<span class='gridthspan " + spanclass + "'>" + text + "</span>" +
                            "</td>");
                        break;
                }
            }
            rowHtml.push("<td class='" + this.css.grid_auto_td + "'></td>");
            rowHtml.push("</tr>");
            return rowHtml.join('');
        },
        __resize__: function (parent, gridTitle, gridBody, gridPager, showStaticticalInformation) {
            var jsParent = parent[0];
            var gridWidth = parent.width() - this.css.gridTitleAutoColWidth;
            var gridHeight = parent.height();
            if (jsParent.oldWidth == gridWidth && jsParent.oldHeight == gridHeight) {
                return;
            }

            //计算表身高度
            var bottomHeight = 0;
            gridBody.height(parent.height() - gridTitle.height() - parseInt(gridPager.css("height") || 0));

            //列宽resize
            //等于undefined 则证明是第一次初始化列表，在创建列表时，已经将列宽进行了设置
            if (jsParent.oldWidth != gridWidth && jsParent.oldWidth !== undefined) {
                this.__resizeColWidth__(gridTitle, gridBody, gridWidth);
            }
            jsParent.oldWidth = gridWidth;
            jsParent.oldHeight = gridHeight;

            var bodyScrollLeft = gridBody.scrollLeft();
            gridTitle.scrollLeft(bodyScrollLeft);
        },
        __resizeColWidth__: function (gridTitle, gridBody, gridWidth) {
            var notHidden = gridTitle.find("th[data-notwidth!='true']:visible").not("th." + this.css.grid_auto_td);
            var notHiddenWidth = 0;
            var self = this;
            notHidden.each(function () {
                notHiddenWidth += $(this).outerWidth(true);
            });
            var notWidthCol = gridTitle.find("th[data-notwidth]");

            if (notWidthCol.length == 0) {
                gridTitle.find("table").css("width", gridWidth + this.css.gridTitleAutoColWidth);
                gridBody.find("table").css("width", gridWidth);
            } else {
                var notWidthColWidth = (gridWidth - notHiddenWidth) / notWidthCol.length;
                var autoColWidth = notWidthColWidth;
                if (autoColWidth < self.css.autoColMinWidth) {
                    autoColWidth = self.css.autoColMinWidth;
                }
                autoColWidth = parseInt(autoColWidth);
                var newGridWidth = notHiddenWidth + (autoColWidth * notWidthCol.length);
                notWidthCol.css("width", autoColWidth);
                gridTitle.find("table").css("width", newGridWidth + this.css.gridTitleAutoColWidth);
                gridBody.find("table").css("width", newGridWidth);
                gridBody.find("tr:first").find("td[data-notwidth]").css("width", autoColWidth);
            }
        },
        __getRowListHtml__: function () {
            var options = [];
            for (var i in this.opt.setting.rowList) {
                var value = this.opt.setting.rowList[i];
                options.push('<option role="option" value="' + value + '">' + value + '</option>');
            }
            return options.join('');
        },
        __createTitleAndDefaultRow__: function () {
            var titleHtml = [];  //表头数据
            var defaultRowHtml = ["<tr border='0'>"]; //数据默认行 主要为表身做宽度设置
            var notWidthColNumber = 0;
            var allhavewidthColWidth = 0;

            //创建checkbox选中列
            if (this.opt.setting.multiselect) {
                titleHtml.push("<th style='width:" + this.css.rowCheckBoxWidth + "px;text-align:center;padding-left:0;'>");
                titleHtml.push("    <span class='" + this.css.gridBody_Col_Checkbox + " basesprite b-checkboxunsel'></span>");
                titleHtml.push("</th>");

                defaultRowHtml.push("<td style='width:" + this.css.rowCheckBoxWidth + "px; height:0px;'></td>");
                allhavewidthColWidth += this.css.rowCheckBoxWidth;
            }

            for (var i in this.opt.setting.colModel) {
                var model = this.opt.setting.colModel[i];
                var name = this.opt.setting.colNames[i];
                var colName = " data-colName='" + model.name + "'";

                switch (model.colType) {
                    case "hidden":
                        titleHtml.push("<th style='display:none' " + colName + ">" + name + "</th>");
                        defaultRowHtml.push("<td style='display:none'></td>");
                        break;
                    case "image":
                        var imageWidth = model.width === null ? this.css.rowImageWidth : model.width;
                        titleHtml.push("<th style=' width:" + imageWidth + "px' " + colName + "><div class='htgrid_th_title'>" + name + "</div></th>");
                        defaultRowHtml.push("<td style=' width:" + imageWidth + "px'></td>");
                        allhavewidthColWidth += +imageWidth;
                        break;
                    default:
                        var colStyle = "style='text-align:" + model.textalign;
                        var attrs = "";
                        attrs += "";
                        if (model.width) {
                            colStyle += ";width:" + model.width + "px'";
                            allhavewidthColWidth += +model.width;
                        }
                        else {
                            notWidthColNumber++;
                            colStyle += "'";
                            attrs = " data-notWidth='true'";
                        }

                        if (model.sortable) {
                            attrs += " class='" + this.css.gridTitle_Sortable + "'";
                        }

                        titleHtml.push("<th " + colStyle + colName + attrs + " >");
                        titleHtml.push('<div class="htgrid_th_title">' + name);
                        if (model.sortable) {
                            titleHtml.push('<span class="basesprite ' + this.css.gridTitle_Th_Sortable + '"></span>');
                        }
                        titleHtml.push('</div>');
                        titleHtml.push("</th>");

                        defaultRowHtml.push("<td " + colStyle + attrs + "></td>");
                        break;
                }
            }

            //添加默认自适应列，防止没有自适应列时，布局出错。
            titleHtml.push("<th style='border-right: none;' class='" + this.css.grid_auto_td + "'></th>");
            titleHtml.push("<th style='width:" + this.css.gridTitleAutoColWidth + "px;border-right: none;' class='" + this.css.grid_auto_td + "'></th>");
            defaultRowHtml.push("<td style='border-right: none;' class='" + this.css.grid_auto_td + "'></td>");
            defaultRowHtml.push("</tr>");

            titleHtml = titleHtml.join('');
            defaultRowHtml = defaultRowHtml.join('');
            var title = $(titleHtml);
            var defaultRow = $(defaultRowHtml);
            var autoColWidth = 0;
            var tableWidth = this.opt.gridContainer.width() - this.css.gridTitleAutoColWidth;
            var defaultRowTd = defaultRow.children();
            if (notWidthColNumber) {
                //设置自适应列宽度
                autoColWidth = (tableWidth - allhavewidthColWidth) / notWidthColNumber;
                if (autoColWidth < this.css.autoColMinWidth) {
                    autoColWidth = this.css.autoColMinWidth;
                }
                autoColWidth = parseInt(autoColWidth);
                title.filter("[data-notWidth]").width(autoColWidth);
                defaultRowTd.filter("[data-notWidth]").width(autoColWidth);
                //为表头计算初始宽度
                var gridWidth = allhavewidthColWidth + autoColWidth * notWidthColNumber;
            } else {
                if (allhavewidthColWidth > tableWidth) {
                    //为表头计算初始宽度
                    var gridWidth = allhavewidthColWidth;
                } else {
                    var gridWidth = tableWidth;
                }
            }
            return { th: title, gridWidth: gridWidth, defaultRow: defaultRow };
        },
        __getReplaceLable__: function (name) {
            return "#H#T#" + name + "#G#R#I#D#";
        },
        __getReplaceLableColor__: function (name) {
            return "#H#T#" + name + "C#O#L#O#R#G#R#I#D#";
        },
        __getReplaceTitleLable__: function (name) {
            return "#H#T#" + name + "T#I#T#L#E#G#R#I#D#";
        },
        __getLanguage__: function (name) {
            return HoteamUI.Language.Lang("SmartGrid." + name);
        },
        __getRowData__: function (gridOption, tr) {
            var firstIndex = gridOption.setting.multiselect ? 1 : 0;
            var title = gridOption.setting.colModel;
            var result = [];
            var self = this;
            tr.each(function () {
                var td = $(this).children("td");
                var Obj = {};
                Obj["__rowIndex__"] = $(this).children("td." + self.css.gridColRowIndex).html();
                for (var i in title) {
                    var item = title[i];
                    var aimTd = td.eq(+i + firstIndex);
                    switch (item.colType) {
                        case "image":
                            var img = aimTd.children();
                            Obj["IMGICONTYPE"] = img.attr("title");
                            Obj["IMGICONPATH"] = img.attr("icon");
                            break;
                        case "link":
                            Obj[item.name] = aimTd.children("div").children("a").children("span").html();
                            break;
                        case "progress":
                            var a = aimTd.children();
                            Obj[item.name] = (a.attr("title") || "0").replace("%", "");
                            break;
                        default:
                            Obj[item.name] = aimTd.text();
                            break;
                    }
                }
                result.push(Obj);
            });
            return result;
        },
        __getButtons__: function () {
            var buttonHtml = [];
            for (var item in this.opt.setting.addButton) {
                var button = this.opt.setting.addButton[item];
                var text = HoteamUI.Language.Lang(button.textId);
                buttonHtml.push('<td class="ui-pg-button ui-corner-all ' + item + '" title="' + text + '" data-click="' + button.js + '"><span class="ui-icon ' + button.iconClass + '"></span></td>');
            }
            return buttonHtml.join('');
        },
        changeDisplayStyle: function (listDivId, mode) {
            var table = $('#' + listDivId),
                tabletitle = table.find(".htGrid_Title"),
                tablebody = table.find(".htGrid_body");
            if (mode == 'image') {//转换为缩略图模式
                //记录模式到tablebody
                tablebody.attr("model", "image");
                //表头要隐藏除了功能按钮之外的所有，这里直接隐藏文字，然后在排序功能里进行处理是否是列表状态
                var ths = tabletitle.find("th");
                for (var i = 0; i < ths.length; i++) {
                    //如果有排序功能，记录下排序功能并删掉排序样式
                    if ($(ths[i]).hasClass("htgrid_sortable")) {
                        $(ths[i]).attr("sort", "sort").removeClass("htgrid_sortable");
                    }
                    //修改拖动样式
                    $(ths[i]).children(".htgrid-resize").css("cursor", "default");
                    //隐藏文字
                    $(ths[i]).children(".htgrid_th_title").hide();
                }

                //表格数据内容：将大图片展示出来，其余（除了选择框）全部隐藏
                var trs = tablebody.find("tr");
                for (var m = 0; m < trs.length; m++) {
                    if (m == 0) {
                        $(trs[m]).addClass("hiddentr");
                        continue;
                    }
                    var tr = $(trs[m]),
                        tds = tr.find("td");
                    //改变tr样式
                    tr.addClass("imgtrModel");
                    //定义一个参数，用来表示已经有图片转化为大图片了（默认缩略图只显示第一个图片）
                    var ishasimg = false;
                    for (var n = 0; n < tds.length; n++) {
                        var td = $(tds[n]);
                        if (td.children("span.htgrid_col_checked").length > 0) {//如果当前是checkbox
                            var check = td.children("span.htgrid_col_checked");
                            td.addClass("checkboxtdModel");
                            check.addClass("checkboximgModel");
                            if (!check.attr("checked")) {
                                check.hide();
                            }
                            continue;
                        }
                        if (td.attr("data-colname") == "IMGICONTYPE") {//如果是缩略图所需大图片列
                            if (ishasimg) {
                                td.hide().attr("list", "list");
                                continue;
                            }
                            ishasimg = true;
                            var imgbtn = td.children(".htgrid_col_img"),
                                icon = imgbtn.attr("icon");
                            td.addClass("imgtdModel");
                            imgbtn.addClass("bigimgModel").removeClass("listModel");
                            if (icon.indexOf("~") < 0) {//如果有~，则是单独图片，否则则是class，代表的是雪碧图
                                imgbtn.addClass(HoteamUI.Common.GetImage(icon, 64))
                                    .removeClass(HoteamUI.Common.GetImage(icon, 24));
                            }
                        }
                        if (td.css("display") != "none") {
                            if (td.attr("showmode") == "img") {
                                td.addClass("titleimgModel").show();
                            } else {
                                if (td.attr("data-colname") == "IMGICONTYPE" || td.hasClass("checkboxtdModel")) {
                                    continue;
                                } else {
                                    td.hide().attr("list", "list");
                                }
                            }
                        }
                    }
                }
            }
            else if (mode == "list") {//转换为列表模式
                tablebody.attr("model", "list");
                //恢复表头样式
                var ths = tabletitle.find("th");
                for (var i = 0; i < ths.length; i++) {
                    if ($(ths[i]).attr("sort")) {
                        $(ths[i]).addClass("htgrid_sortable");
                    }
                    //修改拖动样式
                    $(ths[i]).children(".htgrid-resize").css("cursor", "pointer");
                    //隐藏文字
                    $(ths[i]).children(".htgrid_th_title").show();
                }

                //表格数据内容恢复
                var trs = tablebody.find("tr");
                for (var m = 0; m < trs.length; m++) {
                    if (m == 0) {
                        $(trs[m]).removeClass("hiddentr");
                        continue;
                    }
                    var tr = $(trs[m]),
                        tds = tr.find("td");

                    tr.removeClass("imgtrModel");
                    for (var n = 0; n < tds.length; n++) {
                        var td = $(tds[n]);
                        if (td.children("span.htgrid_col_checked").length > 0) {//如果当前是checkbox
                            td.removeClass("checkboxtdModel");
                            td.children("span.htgrid_col_checked").removeClass("checkboximgModel").css("display", "inline-block");
                            continue;
                        }
                        if (td.attr("data-colname") == "IMGICONTYPE") {//如果是图片列
                            var imgbtn = td.children(".htgrid_col_img"),
                                icon = imgbtn.attr("icon");
                            td.removeClass("imgtdModel");
                            imgbtn.removeClass("bigimgModel").addClass("listModel");
                            if (icon.indexOf("~") < 0) {//如果有~，则是单独图片，否则则是class，代表的是雪碧图
                                imgbtn.addClass(HoteamUI.Common.GetImage(icon, 24))
                                    .removeClass(HoteamUI.Common.GetImage(icon, 64));
                            }
                        }
                        if (td.attr("showmode") == "img") {
                            td.removeClass("titleimgModel");
                        }
                        if (td.attr("list")) {
                            td.show();
                        }
                    }
                }
            }
        }
    };
})(jQuery);

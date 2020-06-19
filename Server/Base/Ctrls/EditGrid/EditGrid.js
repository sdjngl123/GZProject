HoteamUI.Control.OEditGrid = {
    //创建EditGrid
    Create: function (options) {
        options = options || {};
        var self = this;
        var parentId = this.id;
        var id = this.id + "_EditGrid";
        var ctrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions;
        var opt = $.extend(true, {}, $.hoteamEditGrid.defaults);
        opt.autofit = options.autofit;
        opt.containerid = options.containerid;
        opt.ctrlEvent = {};
        opt.ctrlEvent.o = this;
        $.hoteamEditGrid.setEditGridRowTitle(opt, ctrlOptions, false);
        opt.parentId = parentId;
        opt.id = id;

        //记录事件
        var handlers = (options.controlInfo || this.ControlInfo()).PageHandlers;

        for (var i = 0; i < handlers.length; i++) {
            var item = handlers[i];
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
                case "OnRowClick":
                    opt.handlers.OnRowClick = this.GetEventFunctionName("OnRowClick");
                    break;
                case "OnRowDblClick":
                    opt.handlers.OnRowDblCLick = this.GetEventFunctionName("OnRowDblClick");
                    break;
                case "OnLoadSuccess":
                    opt.handlers.OnLoadSuccess = this.GetEventFunctionName("OnLoadSuccess");
                    break;
                case "OnSort":
                    opt.handlers.OnSort = this.GetEventFunctionName("OnSort");
                    break;
                case "OnBeforeEdit":
                    opt.handlers.OnBeforeEdit = this.GetEventFunctionName("OnBeforeEdit");
                    break;
                case "OnAfterEdit":
                    opt.handlers.OnAfterEdit = this.GetEventFunctionName("OnAfterEdit");
                    break;
                case "OnLoadMore":
                    opt.handlers.OnLoadMore = this.GetEventFunctionName("OnLoadMore");
                    break;
                default: break;
            }
        }
        $.hoteamEditGrid.create(opt);
    },
    //加载列表头信息(格式与普通列表不同的原因是：老版本的格式就不同)
    //特别说明1：titleOptions7.4.0版本格式：{data:{ColumnData:[表头数据],ColumnLink:[]},....(列表属性)}
    //2 老版本格式：[表头数据]
    LoadColTitle: function (titleOptions) {
        var opt = $("#" + this.GetId()).data("option");
        $("#" + this.GetId()).htGrid("destroy");
        //处理并合并参数
        $.hoteamEditGrid.setEditGridRowTitle(opt, titleOptions, true);
        if (titleOptions instanceof Array) {//如果传递进来的时数组（兼容7.4.0之前的版本）
            $.hoteamEditGrid.create(opt);
        } else {//如果不是数组,是7.4.0版本
            $.hoteamEditGrid.create(opt, titleOptions.data.ColumnLink);
        }
    },
    //加载数据(第二个参数代表是否清空列表，如果是true，则清空后再添加，如果是false，则追加)
    LoadGridRows: function (data, ifClear) {
        ifClear = ifClear == undefined ? true : ifClear;
        var id = this.GetId();
        if (ifClear) {
            $.hoteamEditGrid.loadRowData(id, $.hoteamGrid.mergeData(id, data), data.RecordsTotal || "");
        } else {
            $("#" + id).htGrid("addRows", $.hoteamGrid.mergeData(id, data));
        }
    },
    ResetGrid: function (opt) {

        var _opt = $("#" + this.GetId()).data("option") || {};
        //高度自适应
        //opt.setting.bheight = 'auto';
        opt = $.extend(true, _opt, opt);
        $.hoteamEditGrid.create(opt);
    },
    //清空数据
    ClearGridRows: function () {
        return $.hoteamEditGrid.loadRowData(this.GetId(), [], 0);
    },
    //保存编辑列表处于编辑状态的数据，并返回当前所有的数据（返回数据的格式按照传递进来的数据格式返回）
    SaveGridRowsByServerFormat: function () {
        var id = this.GetId();
        var table = $("#" + id);
        var opt = $("#" + id).htGrid("getOption");
        var modelObj = opt.modelObj;
        //先将状态置为未编辑
        if (table.htGrid("saveEditCell")) {
            //返回所有编辑之后的数据
            var data = table.htGrid("getGridRows");
            //将对象转化成数组
            for (var i = 0; i < data.length; i++) {
                var newData = [];
                for (var key in data[i]) {
                    if (!data[i].hasOwnProperty(key)) {
                        continue;
                    }
                    if (key == "row_number") {
                        continue;
                    }
                    if (data[i][key].Editable == true) {
                        data[i][key].Editable = 1;
                    } else if (data[i][key].Editable == false) {
                        data[i][key].Editable = 0;
                    }
                    newData.push(data[i][key]);
                    //转换时间
                    var cell = data[i][key];
                    var colType = modelObj[cell.ColName].colType;
                    if ((colType == "datetime" || colType == "date") && cell.ColText.indexOf("-") > 0) {
                        cell.ColValue = $.hoteamDateTime.getTicksByDateTime(cell.ColText, colType);
                    }
                }


                data[i] = newData;
            }
            return { success: true, Rows: data };
        }
    },
    //保存编辑列表处在编辑状态的数据,并且返回当前的所有数据(此方法名是沿用7.3.3的方法名)
    SaveGridRows: function () {
        var id = this.GetId();
        var table = $("#" + id);
        var opt = $("#" + id).htGrid("getOption");
        var modelObj = opt.modelObj;
        //先将状态置为未编辑
        if (table.htGrid("saveEditCell")) {
            //设置一个默认返回值
            var flag = true;
            //返回所有编辑之后的数据
            var data = table.htGrid("getGridRows");
            //验证数据格式,修改flag值
            for (var i = 0, len = data.length; i < len; i++) {
                $.each(data[i], function (index, val) {
                    var model = modelObj[index] || {};
                    var value = val.Regex || model.regex || "";
                    var regex = "";
                    if (value) {//如果单元格有校验格式数据
                        //regex = val.Regex;
                        regex = value;
                        flag = $.hgrid.checkRegExp(regex, val, model);
                        if (flag === false) {
                            return false;
                        }
                    }

                });
            }

            //处理data，将之转化为平台所需格式
            return { success: flag, rowsObject: $.hoteamEditGrid.convertGridData(id, data) };
        }
    },
    //验证每行是否有不符合要求的数据

    //获取当前选中行信息
    GetSelectedRows: function () {
        var id = this.GetId();
        var table = $("#" + id);
        //if (table.htGrid("saveEditCell")) {
        //获取所有选中的行
        var data = table.htGrid("getSelectedRows");
        //转换data为平台所需格式(调整add方法后再写)
        return $.hoteamEditGrid.convertGridData(id, data);
        //}
    },
    //获取当前选中单元格信息
    GetSelectedCells: function () {
        var id = this.GetId();
        var table = $("#" + id);
        //获取所有选中的单元格
        var data = table.htGrid("getSelectedCells");
        //转换data为平台所需格式(调整add方法后再写)
        return $.hoteamEditGrid.convertGridData(id, data);
        //}
    },
    //设置选中行
    SetSelectedRow: function (rowNums) {
        $("#" + this.GetId()).htGrid("setSelectedRow", rowNums);
    },
    //设置选中所有
    SetSelectAll: function () {
        $("#" + this.GetId()).htGrid("setSelectAll");
    },
    //设置取消所有选中
    UnSelectAll: function () {
        $("#" + this.GetId()).htGrid("resetSelectedRow");
    },
    //设置取消所有选中单元格
    UnSelectAllCells: function () {
        $("#" + this.GetId()).htGrid("resetSelectedCell");
    },
    //新增一行(position:"first"||"last",isSelect:是否选中;data:新增的这行的默认数据)
    AddGridRow: function (position, isSelect, obj) {
        isSelect = (isSelect == undefined ? false : isSelect);
        if (!obj) obj = {};
        var id = this.GetId(),
            table = $("#" + id),
            opt = table.htGrid("getOption"),
            modelObj = opt.modelObj;
        //var addRowData = { cellattr: data || {} };

        for (var colName in modelObj) {
            if (!modelObj.hasOwnProperty(colName)) {
                continue;
            }
            //如果是下拉列，且下拉列没有值
            if ((modelObj[colName].colType == "dropdown" || modelObj[colName].colType == "multiselectdropdown") && (obj[colName] == undefined || obj[colName].ColValue == undefined || obj[colName].ColText == undefined)) {
                if (obj[colName] == undefined) obj[colName] = {};
                //获取数据源(此时单元格是新增的，所以是没有定义数据源的)
                var dataSource = modelObj[colName].dataSource,
                    colValue = obj[colName].ColValue;
                if (dataSource && dataSource.length > 0) {
                    var text = '', value = '';
                    for (var i = 0; i < dataSource.length; i++) {
                        if (colValue) {
                            if (dataSource[i].Value == colValue) {
                                value = colValue;
                                text = dataSource[i].Text;
                                break;
                            }
                        } else {
                            if (dataSource[i].Selected) {
                                text = dataSource[i].Text;
                                value = dataSource[i].Value;
                                break;
                            }
                        }
                    }
                    if (!text) {
                        for (var i = 0; i < dataSource.length; i++) {
                            if (dataSource[i].Selected || dataSource[i].selected) {
                                text = dataSource[i].Text;
                                value = dataSource[i].Value;
                                break;
                            }
                        }
                        if (!text) {
                            text = dataSource[0].Text;
                            value = dataSource[0].Value;
                        }
                    }
                    obj[colName].ColText = text;
                    obj[colName].ColValue = value;
                }
            }
            //默认取属性的默认值
            else if (modelObj[colName].defaultValue && modelObj[colName].colType == "text" && (obj[colName] == undefined || obj[colName].ColValue == undefined || obj[colName].ColText == undefined)) {
                if (obj[colName] == undefined) obj[colName] = {};
                obj[colName].ColText = modelObj[colName].defaultValue;
            }
        }
        table.htGrid("addEditRow", position, isSelect, { cellattr: obj });
    },
    //添加数据多行
    AddRows: function (data) {
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
        $("#" + this.GetId()).htGrid("addRows", arr);
    },

    //通过行号来update此行数据
    UpdateDataByRowID: function (rowId, data) {
        var id = this.GetId();
        $("#" + id).htGrid("updateDataByRowID", rowId, data);
    },
    //删除选中的行（此方法命名有点问题，应该命名为DeleteSelectedGridRows,但是为了往下兼容，只能命名DeleteGridRow）
    DeleteGridRow: function () {
        $("#" + this.GetId()).htGrid("removeSelectedRows");
    },
    //通过行号删除数据
    DeleteDataByRowNums: function (rowNums) {
        var id = this.GetId();
        $("#" + id).htGrid("removeRows", rowNums);
    },
    //移动选中的列表行(参数可选值：first,last,before,after)（此方法命名有点问题，应该命名为MoveSelectedGridRow,但是为了往下兼容，只能命名MoveGridRow） 返回值 0：已经在最上或者最下 1：成功移动 2：不可选中多行移动
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
    //保存处于编辑状态的数据
    SaveEditCell: function () {
        return $("#" + this.GetId()).htGrid("saveEditCell");
    },
    GetEditCellContent: function () {
        return $("#" + this.GetId()).htGrid("getEditCellContent");
    },
    //获取选中行的rowid
    GetSelectedRowsID: function () {
        return $("#" + this.GetId()).htGrid("getSelectedRowNum");
    },
    //获取所有行的行号
    GetAllRowsID: function () {
        return $("#" + this.GetId()).htGrid("getAllRowsNum");
    },
    //获取正在编辑的行的行号
    GetEditRowID: function () {
        return $("#" + this.GetId()).htGrid("getEditRowNum");
    },
    //通过行号获取该行数据
    GetRowContent: function (rowid) {
        var id = this.GetId();
        var table = $("#" + id);
        //获取数据
        var rowData = $("#" + id).htGrid("getRowContentByIndex", rowid);
        return $.hoteamEditGrid.convertArrToObject(id, rowData);
    },
    //通过行号及列名获取列内容
    GetCellContent: function (rowid, colName) {
        var obj = $("#" + this.GetId()).htGrid("getCellContent", rowid, colName);
        if (typeof obj == "object") {
            obj.value = obj.ColValue;
            obj.text = obj.ColText;
        }
        return obj;
    },
    //获取当前列表共多少条数据
    GetRowsCount: function () {
        return $("#" + this.GetId())[0].p.data.length;
    },
    //获取选中行的主键
    GetSelectedRowIds: function () {
        return $("#" + this.GetId()).htGrid("getSelectedRowIds");
    },
    //通过主键设置选中行
    SetSelectedRowByIds: function (ids) {
        $("#" + this.GetId()).htGrid("setSelectedRowByIds", ids);
    },
    //获取列表列属性集合
    GetColModel: function () {
        return $("#" + this.GetId()).htGrid("getOption").colModel;
    },
    //使单元格进入编辑状态
    SetCellEdit: function (rowNum, colName) {
        $("#" + this.GetId()).htGrid("setCellEdit", rowNum, colName);
    },
    //设置单元格是否允许编辑
    SetCellEditable: function (rowNum, colName, editable) {
        $("#" + this.GetId()).htGrid("setCellEditable", rowNum, colName, editable);
    },
    //设置单元格的value值和text值（设置后的值不是编辑状态）
    SetCellContent: function (rowid, colName, text, value, isEdit, colType) {
        var id = this.GetId(),
            table = $("#" + id),
            opt = table.htGrid("getOption"),
            modelObj = opt.modelObj,
            model = modelObj[colName],
            options;

        if (!model) return;

        if ((model.colType == "dropdown" || model.colType == "multiselectdropdown") && (!text)) {
            //先获取单元格的数据源、
            var data = opt.data;
            var obj = data[rowid - 1].cellattr[colName];
            var source;
            if (obj.DataSource) {
                source = obj.DataSource;
            } else if (obj.Databind) {
                source = eval(value.Databind);
                if (source instanceof Function) {
                    model.databind += '()';
                    source = eval(model.databind);
                }
            } else if (model.dataSource) {//其次选择列表头中传递过来的数据源
                source = model.dataSource;
            }
            for (var i = 0; i < source.length; i++) {
                if (source[i].Value == value) {
                    text = source[i].Text;
                }
            }
        }

        options = {
            ColText: text,
            ColValue: value
        };
        if (model.colType == "image" && value) {
            options.ColIcon = value;
        }
        $("#" + this.GetId()).htGrid("setCellData", rowid, colName, options, isEdit);
    },
    //给行设置颜色
    SetRowColor: function (rowId, color) {
        $("#" + this.GetId()).htGrid("setRowColor", rowId, color);
    },
    //给单元格设置颜色
    SetCellColor: function (rowId, colName, color) {
        $("#" + this.GetId()).htGrid("setCellColor", rowId, colName, color);
    },
    //给列设置颜色
    SetColumnColor: function (colName, color) {
        $("#" + this.GetId()).htGrid("setColumnColor", colName, color);
    },
    //设置行字体颜色（参数rowNums:行号（可以是字符串或者数组），color:字体颜色）
    SetRowTextColor: function (rowNums, color) {
        $("#" + this.GetId()).htGrid("setRowTextColor", rowNums, color);
    },
    //设置列的编辑类型
    SetColType: function (colName, colType) {
        $("#" + this.GetId()).htGrid("setColProp", colName, { colType: colType });
    },
    //设置单元格文字颜色
    SetCellTextColor: function (rowNum, columnName, color) {
        $("#" + this.GetId()).htGrid("setCellTextColor", rowNum, columnName, color);
    },
    //设置警告颜色（如果保存的时候验证通不过）
    //参数格式：[{rowId:"",colName:""},{rowId:"",colName:""},{rowId:"",colName:""}]
    SetWarningColor: function (arr) {
        var table = $("#" + this.GetId()),
            me = this;
        if (table.data("warningCell")) {
            var bakarr = table.data("warningCell");
            arr.concat(bakarr);
        } else {
            table.data("warningCell", arr);
        }
        for (var i = 0; i < arr.length; i++) {
            me.SetCellColor(arr.rowId, arr.colName, "red");
        }
    },
    //取消警告
    CancelWarningColor: function () {
        var table = $("#" + this.GetId()),
            me = this;
        var arr = table.data("warningCell") || [];
        for (var i = 0; i < arr.length; i++) {
            me.SetCellColor(arr.rowId, arr.colName, "");
        }
        table.data("warningCell", null);
    },
    //获取编辑过的数据
    GetEditData: function () {
        var id = this.GetId();
        var data = $("#" + id).htGrid("getEditData");
        return {
            "add": $.hoteamEditGrid.convertGridData(id, data.add),
            "edit": $.hoteamEditGrid.convertGridData(id, data.edit),
            "remove": $.hoteamEditGrid.convertGridData(id, data.remove)
        };
    },
    //设置数据源（主要是针对下拉）
    SetDataSource: function (rowId, colName, dataSource) {
        var id = this.GetId();
        $("#" + id).htGrid("setCellData", rowId, colName, { DataSource: dataSource });
    },
    //将列表数据的编辑状态置为正常状态,保存到客户端（即将编辑的数据的标示位等去掉）
    SaveEditData: function () {
        $("#" + this.GetId()).htGrid("saveEditData");
    },
    //获取当前列表是否处于编辑状态(是否有编辑过的但还未保存的数据)
    GetEditStatus: function () {
        return $("#" + this.GetId()).htGrid("getEditStatus");
    },
    //获取当前列表是否有校验未通过的数据
    GetRegexStatus: function () {
        return $("#" + this.GetId()).htGrid("getRegexStatus");
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
    //显示分页区域的自定义按钮
    ShowButton: function (btnName) {
        $.hoteamGrid.showButton(this.GetId(), btnName);
    },
    //隐藏分页区域的自定义按钮
    HideButton: function (btnName) {
        $.hoteamGrid.hideButton(this.GetId(), btnName);
    },
    //隐藏列接口（如果列表调用了此接口，则该列表不能使用保存列设置功能）
    HideColumns: function (columns) {
        $("#" + this.GetId()).htGrid("hideColumns", columns);
    },
    EnableEdit: function () {
        $("#" + this.GetId()).htGrid("enableEdit");
    },
    DisableEdit: function () {
        $("#" + this.GetId()).htGrid("disableEdit");
    },
    //获取id
    GetId: function () {
        return this.id + "_EditGrid";
    },
    //获取当前页数据
    GetCurrentPageRows: function () {
        return $.hoteamGrid.getCurrentPageRow(this.GetId());
    },
    //获取分页信息
    GetPagerInfo: function () {
        return $.hoteamGrid.getPagerInfo(this.GetId());
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
    }
};


{
    (function ($) {
        $.hoteamEditGrid = {
            defaults: {
                parentId: null,
                id: null,
                describe: null, // 列表头部的一行描述信息
                autoLoadData: true, //creat之后是否立刻调用加载数据的方法
                isShowSearch: false, //是否行搜索功能
                isLayoutSave: false, //是否有方案保存
                searchState: false, //当前列表是否处于搜索状态
                isColumnSetting: false, //是否行设置功能
                addButton: null, //列表左下角自定义添加的按钮
                setting: {
                    id: "",//列表主键
                    showPageBar: false, //是否显示分页的按钮及分页下拉
                    showListTail: true,//是否显示列表尾部部分区域
                    multiselect: true, //是否显示checkbox选中框
                    multiselectWidth: 26, //定义checkbox选中框的宽度
                    rowrejection: false,//当行点击时是否行互斥
                    check: false,//节点位置是否有checkbox
                    checkType: false, //节点的checkbox选中是否级联
                    rowLinkCheck: true, //行点击选中时是否同时选中节点的checkbox
                    sortorder: "asc", //排序方式
                    sortname: "", //排序name
                    rownumbers: true, //列表第一列是否显示行数
                    cellEdit: true, //启用编辑功能
                    colNames: [], //列表头name
                    colModel: [], //列表头属性
                    loadMore: false//是否有加载更多的功能(分页功能必须是关闭的即showPageBar==false)
                },
                handlers: {
                    OnLoadRows: ""
                }
            },
            colModelDefaults: {
                name: null, //名称
                colType: "text",
                sortable: false, //是否可排序
                width: null, //宽度
                resizable: false, //是否可拖动改变列宽
                frozen: false, //是否冻结
                align: "left", //文字居左
                treeNode: "",//树节点名称
                backgroundColor: "", //列背景色
                rowSpan: false, //是否行合并
                hidden: false, //列是否隐藏
                sorttype: "text", //列排序类型
                editable: true, //列是否可以编辑
                defaultValue: "",//默认值
                editOption: {}//列编辑属性参数
            },
            checkboxImg: {
                empty: "hoteam-editgrid-custom-cell button chk checkbox_false_full customelement",
                full: "hoteam-editgrid-custom-cell button chk checkbox_true_full customelement",
                part: "hoteam-editgrid-custom-cell button chk checkbox_true_part customelement",
                blank: "hoteam-editgrid-custom-cell button chk checkbox_false_empty customelement",
                empty_focus: "hoteam-editgrid-custom-cell button chk checkbox_false_full_focus customelement",
                full_focus: "hoteam-editgrid-custom-cell button chk chk checkbox_true_full_focus customelement",
                part_focus: "hoteam-editgrid-custom-cell button chk checkbox_true_part_focus customelement",
                blank_focus: "hoteam-editgrid-custom-cell button chk checkbox_false_empty_focus customelement"
            },
            create: function (opt, groupData) {
                if ($("#" + opt.id).length == 0) {
                    var tableEle = $('<table id="' + opt.id + '" class="hoteam-grid"></table>');

                    $("#" + opt.parentId).append(tableEle.data("option", opt).data("autofit", opt.autofit));
                    $.hoteamGrid.initHanlder(opt.id); //绑定事件
                }
                //给列表创建唯一标示
                var url = $("#" + opt.id).data("url");
                if (!url) {
                    url = HoteamUI.Common.GetOnlyUrl(opt.containerid, "");
                    $("#" + opt.id).data("url", url);
                }
                //根据当前语言，设置分页提示文字
                if (opt.setting.showPageBar == false) {
                    opt.setting.recordText = HoteamUI.Language.Lang("Grid", "RecordCount");
                }
                else {
                    opt.setting.recordText = HoteamUI.Language.Lang("Grid", "RecordText");
                }
                opt.setting.onPageChange = this.onPaging; //分页变化事件
                opt.setting.onAfterEdit = this.onAfterEdit;
                opt.setting.onBeforeEdit = this.onBeforeEdit;
                opt.setting.onLoadSuccess = this.onLoadSuccess;
                opt.setting.onCellClick = $.hoteamGrid.onCellClick;
                opt.setting.onRowClick = $.hoteamGrid.onRowClick;
                opt.setting.onRowdblClick = $.hoteamGrid.onRowdblClick;
                opt.setting.onSort = $.hoteamGrid.onSort;
                opt.setting.onLoadMore = $.hoteamGrid.onLoadMore;
                //获取布局信息，并覆盖当前传入的布局信息
                var layoutParam = HoteamUI.Common.GetPersonalSetting(url);
                if (layoutParam) {
                    $.hoteamGrid.mergeLayoutParam(opt.setting, JSON.parse(layoutParam));
                }
                $("#" + opt.id).htGrid(opt.setting); //初始化
                $.hoteamGrid.initTitleGroup(opt.id, groupData); //列分组
                $.hoteamGrid.initColFrozen(opt, groupData); //列冻结
                if (opt.autoLoadData && opt.handlers.OnLoadRows && opt.setting.colModel.length > 0) {//如果自动加载数据
                    var ctrlEvent = opt.ctrlEvent;
                    HoteamUI.Common.ExeFunction(opt.handlers.OnLoadRows, ctrlEvent);
                }
                //在page分页区域创建列设置按钮，保存按钮及搜索按钮
                $.hoteamGrid.creatExtendOperate(opt);
                $.hoteamGrid.creatPageBtns(opt);
                $.hoteamGrid.creatdrag(opt);
            },
            loadRowData: function (id, data, records) {
                var table = $("#" + id);
                table.htGrid("loadData", data, records);
                $.hoteamGrid.creatExtendOperate(table.data("option"));
            },
            //加载结束
            onLoadSuccess: function () {
                var opt = $(this).data("option");
                var ctrlEvent = { o: opt.ctrlEvent.o };
                HoteamUI.Common.ExeFunction(opt.handlers.onLoadSuccess, ctrlEvent);
            },
            //编辑前事件
            onBeforeEdit: function (rowNumber, colName, rowObj) {
                var opt = $(this).data("option");
                var colModel = opt.setting.colModel;
                var ctrlEvent = { o: opt.ctrlEvent.o };
                ctrlEvent.rowid = rowNumber;
                ctrlEvent.colName = colName;
                ctrlEvent.rowobject = $.hoteamEditGrid.convertArrToObject(opt.id, rowObj);
                return HoteamUI.Common.ExeFunction(opt.handlers.OnBeforeEdit, ctrlEvent);
            },
            //编辑后事件
            onAfterEdit: function (rowNumber, colName, oldData, newData, rowObj) {
                function convertData(colType, obj) {
                    if (colType == "datetime" || colType == "date" || obj.text.indexOf("-") > 0) {
                        return $.hoteamDateTime.getTicksByDateTime(obj.text, colType);
                    }
                    if (!colType || colType == "text") {
                        return obj.text;
                    }
                }
                var opt = $(this).data("option");
                var colModel = opt.setting.colModel;
                var ctrlEvent = { o: opt.ctrlEvent.o };
                ctrlEvent.oldData = $.hoteamEditGrid.convertArrToObject(opt.id, oldData);
                ctrlEvent.newData = $.hoteamEditGrid.convertArrToObject(opt.id, newData);
                ctrlEvent.rowid = rowNumber;
                ctrlEvent.colName = colName;
                ctrlEvent.rowobject = $.hoteamEditGrid.convertArrToObject(opt.id, rowObj);
                return HoteamUI.Common.ExeFunction(opt.handlers.OnAfterEdit, ctrlEvent);
            },
            //处理列表头参数，转化为插件所需要的内容
            setEditGridRowTitle: function (defaults, titleOptions, isSeverData) {
                var options = null;
                if (titleOptions instanceof Array) {//兼容老版本，传递进来的是数组
                    options = titleOptions;
                } else {//如果是对象，说明是7.4.0版本
                    if (isSeverData) {
                        options = titleOptions.data.ColumnData;
                    } else {
                        options = titleOptions;
                    }
                    defaults.setting.id = titleOptions.id = titleOptions.id === undefined ? (titleOptions.KeyField === undefined ? defaults.setting.id : titleOptions.KeyField) : titleOptions.id;
                    defaults.setting.id = titleOptions.id = titleOptions.id === undefined ? defaults.setting.id : titleOptions.KeyField;
                    defaults.setting.multiselect = titleOptions.multiselect === undefined ? defaults.setting.multiselect : titleOptions.multiselect;
                    defaults.setting.showPageBar = titleOptions.showPageBar === undefined ? defaults.setting.showPageBar : titleOptions.showPageBar;
                    defaults.setting.sortorder = titleOptions.sortorder === undefined ? defaults.setting.sortorder : titleOptions.sortorder;
                    defaults.setting.sortname = titleOptions.sortname === undefined ? defaults.setting.sortname : titleOptions.sortname;
                    defaults.setting.rowrejection = titleOptions.rowrejection === undefined ? defaults.setting.rowrejection : titleOptions.rowrejection;
                    defaults.setting.rownumbers = titleOptions.rownumbers === undefined ? defaults.setting.rownumbers : titleOptions.rownumbers;
                    defaults.setting.dblClickSelect = titleOptions.dblClickSelect === undefined ? defaults.setting.dblClickSelect : titleOptions.dblClickSelect;
                    defaults.setting.describe = titleOptions.describe === undefined ? defaults.setting.describe : titleOptions.describe;
                    defaults.setting.treeNode = titleOptions.treeNode === undefined ? defaults.setting.treeNode : titleOptions.treeNode;
                    defaults.setting.check = titleOptions.check === undefined ? defaults.setting.check : titleOptions.check;
                    defaults.setting.checkType = titleOptions.checkType === undefined ? defaults.setting.checkType : titleOptions.checkType;
                    defaults.setting.rowLinkCheck = titleOptions.rowLinkCheck === undefined ? defaults.setting.rowLinkCheck : titleOptions.rowLinkCheck;
                    defaults.setting.showListTail = titleOptions.showListTail === undefined ? defaults.setting.showListTail : titleOptions.showListTail;
                    defaults.setting.loadMore = titleOptions.loadMore === undefined ? defaults.setting.loadMore : titleOptions.loadMore;

                    defaults.isShowSearch = titleOptions.isShowSearch === undefined ? defaults.isShowSearch : titleOptions.isShowSearch;
                    defaults.isLayoutSave = titleOptions.isLayoutSave === undefined ? defaults.isLayoutSave : titleOptions.isLayoutSave;
                    defaults.isColumnSetting = titleOptions.isColumnSetting === undefined ? defaults.isColumnSetting : titleOptions.isColumnSetting;
                    defaults.autoLoadData = titleOptions.autoLoadData === undefined ? defaults.autoLoadData : titleOptions.autoLoadData;
                    defaults.addButton = titleOptions.addButton === undefined ? defaults.addButton : titleOptions.addButton;
                }
                var ctrlEvent = defaults.ctrlEvent;
                var colNames = [];
                var colModel = [];
                var editOption = {};
                for (var index in options) {
                    if (!options.hasOwnProperty(index)) {
                        continue;
                    }
                    if (index.indexOf("item") != -1 || isSeverData) {
                        var model = $.extend({}, $.hoteamEditGrid.colModelDefaults);
                        var col = options[index];
                        if (isSeverData) {
                            colNames.push(col.Text);
                            model.text = col.Text;
                            model.name = col.Name ? col.Name : "";
                            //width:如果-1或者undifined,那么就是自适应；如果是大于等于0的数字，则是固定宽度
                            if (col.Width == undefined) {
                                model.width = "";//自适应
                            } else if (isNaN(col.Width)) {
                                model.width = "";//自适应
                            } else if (col.Width < 0) {
                                model.width = "";//自适应
                            } else {
                                model.width = col.Width;
                            }
                            model.sortable = col.Sortable === null ? model.sortable : col.Sortable;
                            model.resizable = col.Resizable === null ? model.resizable : col.Resizable;
                            model.editable = col.Editable === null ? model.editable : col.Editable;
                            model.icon = col.Icon;
                            model.rowSpan = col.RowSpan === null ? model.rowSpan : col.RowSpan;
                            model.backgroundColor = col.BackgroundColor;
                            model.colType = col.ColType === null ? model.colType : col.ColType;
                            model.frozen = col.Frozen === null ? model.frozen : col.Frozen;
                            //是否允许手动输入时间
                            model.readOnly = col.ReadOnly === null ? model.readOnly : col.ReadOnly;
                            //0:hour view
                            //1:day view
                            //2:month view
                            //3:12-month overview
                            //4:10-year overview
                            model.minView = col.MinView === null ? model.minView : col.MinView;
                            model.regex = col.Regex;
                            model.numberStep = col.NumberStep;
                            model.numberFixed = col.NumberFixed;
                            model.regexTitle = col.RegexTitle;
                            model.databind = col.Databind;
                            model.eventbind = function (eventBind) {
                                if (eventBind) {
                                    var obj = {};
                                    for (var i = 0; i < eventBind.length; i++) {
                                        obj[eventBind[i].Key] = eventBind[i].Value;
                                    }
                                    return obj;
                                } else {
                                    return null;
                                }
                            }(col.Eventbind);
                            //model.eventbind = col.Eventbind;
                            model.dataSource = col.DataSource;
                            model.defaultValue = col.DefaultValue;
                            this.setColFormatter(model);
                        }
                        else {
                            var colText = "",
                                text = "";
                            if (col.textId) {
                                text = col.textId;
                                if (text) {
                                    text = HoteamUI.Language.Lang(text);
                                    model.textId = text;
                                }
                            }
                            colNames.push(text);
                            model.text = text;
                            model.name = col.name ? col.name : "";
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
                            model.sortable = col.sortable === undefined ? model.sortable : col.sortable;
                            model.resizable = col.resizable === undefined ? model.resizable : col.resizable;
                            model.editable = col.editable === undefined ? model.editable : col.editable;
                            model.icon = col.icon ? col.icon : model.icon;
                            model.rowSpan = col.rowSpan === undefined ? model.rowSpan : col.rowSpan;
                            model.backgroundColor = col.backgroundColor;
                            model.colType = col.colType === undefined ? model.colType : col.colType;
                            model.frozen = col.frozen === undefined ? model.frozen : col.frozen;
                            model.readOnly = col.readOnly === null ? model.readOnly : col.readOnly;
                            model.minView = col.minView === null ? model.minView : col.minView;
                            model.regex = col.regex;
                            model.regexTitle = col.regexTitleId ? HoteamUI.Language.Lang(col.regexTitleId) : col.regexTitle;
                            model.databind = col.databind;
                            model.eventbind = col.eventbind;
                            model.dataSource = eval(col.dataSource);
                            model.defaultValue = eval(col.defaultValue);
                            this.setColFormatter(model);
                        }
                        //针对下拉控件，单独处理下拉数据源
                        if (model.colType == "dropdown" || model.colType == "multiselectdropdown" || model.colType == "autocompletecombox") {
                            if (!model.dataSource) {
                                if (model.databind) {
                                    var data = eval(model.databind);
                                    if (data instanceof Function) {
                                        model.databind += '(ctrlEvent)';
                                        data = eval(model.databind);
                                    }
                                    if (data) {
                                        model.dataSource = data;
                                    }
                                }
                            }
                        }
                        colModel.push(model);
                    }
                }
                defaults.setting.editOption = $.hoteamEditGrid.setEditFormatter(editOption, ctrlEvent);
                defaults.setting.colModel = $.hoteamGrid.setFrozenCols(colModel);
                defaults.setting.colNames = colNames;

                defaults.setting.zebraList = titleOptions.zebraList === undefined ? defaults.setting.zebraList : titleOptions.zebraList;
                defaults.setting.hoverLight = titleOptions.hoverLight === undefined ? defaults.setting.hoverLight : titleOptions.hoverLight;
                defaults.setting.border = titleOptions.border === undefined ? defaults.setting.border : titleOptions.border;
            },
            //根据列的colType不同，创建不同的editOption
            setEditFormatter: function (editOption, cevent) {
                var self = this;
                return {
                    checkbox: {//checkbox编辑div
                        custom_element: function (value, model) {
                            var me = $(this);
                            var checkboxImg = $.hoteamEditGrid.checkboxImg;
                            var spanCls = value.ColValue == "1" ? checkboxImg.full_focus : checkboxImg.blank_focus; //1为选中,0为不选中
                            var editContent = $('<span tabindex="0" class="' + spanCls + '"></span>');
                            editContent.on("click", function (e) {
                                $(this).toggleClass("checkbox_true_full_focus");
                                $(this).toggleClass("checkbox_false_empty_focus");
                                e.stopPropagation();
                            }).on("keydown", function (event) {
                                if (event.keyCode == 9) {
                                    var td = $(this).closest("td"),
                                        rowNum = td.parent().index();
                                    var cell = me.htGrid("getNextEditCell", rowNum, td.attr("data-name"));
                                    if (cell) {
                                        me.htGrid("setCellEdit", cell.rowNum, cell.colName);
                                    }
                                    return false;
                                }
                            });
                            return editContent;
                        },
                        custom_value: function (ele) {
                            var obj = {};
                            if (ele.hasClass("checkbox_true_full_focus")) {
                                obj.ColText = "1";
                                obj.ColValue = '1';
                            } else {
                                obj.ColText = "0";
                                obj.ColValue = '0';
                            }
                            return obj;
                        }
                    },
                    checkboxthirdstate: {
                        custom_element: function (value, model) {
                            var me = $(this);
                            //0代表未选中，1代表选中，2代表中间状态
                            var checkboxImg = $.hoteamEditGrid.checkboxImg;
                            value.ColValue = value.ColValue ? value.ColValue : "1"; //默认1
                            var spanCls = value.ColValue == "1" ? checkboxImg.full_focus :
                                (value.ColValue == "2" ? checkboxImg.part_focus : checkboxImg.empty_focus);
                            //创建checkbox
                            var editContent = $('<span tabindex="0" class="' + spanCls + '"></span>');
                            editContent.on("click", function (e) {
                                if ($(this).hasClass("checkbox_true_full_focus")) {
                                    $(this).removeClass("checkbox_true_full_focus");
                                    $(this).addClass("checkbox_false_full_focus");
                                } else if ($(this).hasClass("checkbox_true_part_focus")) {
                                    $(this).removeClass("checkbox_true_part_focus");
                                    $(this).addClass("checkbox_true_full_focus");
                                } else if ($(this).hasClass("checkbox_false_full_focus")) {
                                    $(this).removeClass("checkbox_false_full_focus");
                                    $(this).addClass("checkbox_true_part_focus");
                                }
                                e.stopPropagation();
                            }).on("keydown", function (event) {
                                if (event.keyCode == 9) {
                                    var td = $(this).closest("td"),
                                        rowNum = td.parent().index();
                                    var cell = me.htGrid("getNextEditCell", rowNum, td.attr("data-name"));
                                    if (cell) {
                                        me.htGrid("setCellEdit", cell.rowNum, cell.colName);
                                    }
                                    return false;
                                }
                            });
                            return editContent;
                        },
                        custom_value: function (ele) {
                            var obj = {};
                            if (ele.hasClass("checkbox_true_full_focus")) {
                                obj.ColText = "1";
                                obj.ColValue = '1';
                            } else if (ele.hasClass("checkbox_true_part_focus")) {
                                obj.ColText = "2";
                                obj.ColValue = '2';
                            } else {
                                obj.ColText = "0";
                                obj.ColValue = '0';
                            }
                            return obj;
                        }
                    },
                    dropdown: {
                        custom_element: function (value, model) {
                            var me = $(this);
                            var select = $('<select tabindex="0"></select>');
                            //获取数据源
                            var data;
                            if (value.DataSource) {//优先选择数据中传递过来的数据源
                                data = value.DataSource;
                            } else if (value.Databind) {//如果单元格中有设置
                                data = eval(value.Databind);
                                if (data instanceof Function) {
                                    model.databind += '()';
                                    data = eval(model.databind);
                                }
                            } else if (model.dataSource) {//其次选择列表头中传递过来的数据源
                                data = model.dataSource;
                            }
                            if (data) {
                                var selectedIndex = 0;
                                for (var i = 0; i < data.length; i++) {
                                    if (data[i].Selected) {
                                        selectedIndex = i;
                                    }
                                    var selected = data[i].Selected ? 'selected="selected"' : '';
                                    select.append('<option ' + selected
                                        + ' title="' + $.hgrid.escapeHtml(data[i].Text) + '"'
                                        // + ' style="display:none;"'
                                        + ' value="' + $.hgrid.escapeHtml(data[i].Value) + '">'
                                        + $.hgrid.escapeHtml(data[i].Text)
                                        + '</option>');
                                }
                                if (!value.ColValue && data.length > 0) {
                                    value.ColValue = data[selectedIndex].Value;
                                    value.ColText = data[selectedIndex].Text;
                                }
                                select.val(value.ColValue);
                            }
                            select.on("click", function (e) {
                                e.stopPropagation();
                            }).on("change", function (e) {
                                var event;
                                if (value.Eventbind) {
                                    event = function (eventBind) {
                                        if (eventBind) {
                                            var obj = {};
                                            for (var i = 0; i < eventBind.length; i++) {
                                                obj[eventBind[i].Key] = eventBind[i].Value;
                                            }
                                            return obj;
                                        } else {
                                            return null;
                                        }
                                    }(value.Eventbind);
                                } else {
                                    event = model.eventbind;
                                }
                                if (event) {
                                    var ctrlEvent = cevent;
                                    ctrlEvent.value = $(this).val();
                                    for (var i in event) {
                                        if (!event.hasOwnProperty(i)) {
                                            continue;
                                        }
                                        var js = event[i];
                                        eval(js);
                                    }
                                    delete ctrlEvent.value;
                                }
                            }).on("keydown", function (event) {
                                if (event.keyCode == 9) {
                                    var td = $(this).closest("td"),
                                        rowNum = td.parent().index();
                                    var cell = me.htGrid("getNextEditCell", rowNum, td.attr("data-name"));
                                    if (cell) {
                                        me.htGrid("setCellEdit", cell.rowNum, cell.colName);
                                    }
                                    return false;
                                }
                            });
                            return select;
                        },
                        custom_value: function (ele) {
                            var obj = {};
                            obj.ColValue = ele.val();
                            obj.ColText = ele.children("option:selected").text();
                            return obj;
                        }
                    },
                    multiselectdropdown: {
                        custom_element: function (value, model) {
                            var me = this;
                            //获取数据源
                            var data = [];
                            if (value.DataSource) {//优先选择数据中传递过来的数据源
                                data = value.DataSource;
                            } else if (value.Databind) {//如果单元格中有设置
                                data = eval(value.Databind);
                                if (data instanceof Function) {
                                    model.databind += '()';
                                    data = eval(model.databind);
                                }
                            } else if (model.dataSource) {//其次选择列表头中传递过来的数据源
                                data = model.dataSource;
                            }
                            var content =
                                $('<div tabindex="0" class="hoteam-editgrid-editbutton-edit">' +
                                    '<input class="hoteam-editgrid-autocomplete-text" value="' + (value.ColText || "") + '"/>' +
                                    '</div>');
                            var inputCon = content.find("input");
                            inputCon.on("change", function (e) {
                                var event;
                                if (value.Eventbind) {
                                    event = function (eventBind) {
                                        if (eventBind) {
                                            var obj = {};
                                            for (var i = 0; i < eventBind.length; i++) {
                                                obj[eventBind[i].Key] = eventBind[i].Value;
                                            }
                                            return obj;
                                        } else {
                                            return null;
                                        }
                                    }(value.Eventbind);
                                } else {
                                    event = model.eventbind;
                                }
                                if (event) {
                                    var ctrlEvent = cevent;
                                    ctrlEvent.value = $(this).val();
                                    for (var i in event) {
                                        if (!event.hasOwnProperty(i)) {
                                            continue;
                                        }
                                        var js = event[i];
                                        eval(js);
                                    }
                                    delete ctrlEvent.value;
                                }
                            }).on("keydown", function (event) {
                                if (event.keyCode == 9) {
                                    var td = $(this).closest("td"),
                                        rowNum = td.parent().index();
                                    var cell = me.htGrid("getNextEditCell", rowNum, td.attr("data-name"));
                                    if (cell) {
                                        me.htGrid("setCellEdit", cell.rowNum, cell.colName);
                                    }
                                    return false;
                                }
                            }).selectpicker({
                                "data": data
                            });
                            inputCon.selectpicker("setSelectedByValue", value.ColValue);
                            return content;
                        },
                        custom_value: function (ele, value) {
                            var obj = {};
                            var input = ele.find("input");
                            obj.ColText = input.val();
                            obj.ColValue = input.attr("val");
                            input.selectpicker("destroy");
                            return obj;
                        }
                    },
                    datetime: {
                        custom_element: function (value, model) {         
                            var me = $(this);
                            var html = '<div tabindex="0" style="position:relative;">' +
                                '<input tabindex="0" type="text" style="width:100%;" ' + (model.readOnly == false ? "" : 'readonly') + '/>' +
                                '</div>' +
                                '<span class="hgrid-datetime-close basesprite b-close"></span>';
                            var inputC = $(html);
                            var lang = HoteamUI.Language.CurLanguage;
                            var dateFmt = 'yyyy-mm-dd hh:ii:ss';
                            inputC.on("keydown", function () {
                                $(this).children().datetimepicker("hide");
                                if (event.keyCode == 9) {
                                    var td = $(this).closest("td"),
                                        rowNum = td.parent().index();
                                    var cell = me.htGrid("getNextEditCell", rowNum, td.attr("data-name"));
                                    if (cell) {
                                        me.htGrid("setCellEdit", cell.rowNum, cell.colName);
                                    }
                                }
                                //return false;
                            });
                            var input = inputC.children("input");
                            if (model.minView === "1") {
                                dateFmt = "yyyy-mm-dd hh:00:00";
                            }
                            input.datetimepicker({
                                format: dateFmt,
                                language: lang,
                                autoclose: true,
                                todayBtn: true,
                                forceParse: true,
                                startView: 2,
                                maxView: 4,
                                minView: model.minView || 0
                            }).on("show", function (e) {
                                //$(this).parent().focus();
                            }).on("hide", function (e) {
                                //$(this).parent().focus();
                            }).on("mouseenter", function () {
                                $(this).nextAll(".b-close").show();
                            }).on("mouseleave", function () {
                                $(this).nextAll(".b-close").hide();
                            }).on("keydown", function (event) {
                                if (event.keyCode == 9) {
                                    var td = $(this).closest("td"),
                                        rowNum = td.parent().index();
                                    var cell = me.htGrid("getNextEditCell", rowNum, td.attr("data-name"));
                                    if (cell) {
                                        me.htGrid("setCellEdit", cell.rowNum, cell.colName);
                                    }
                                    return false;
                                }
                            });
                            inputC.next(".b-close").on("mouseenter", function () {
                                $(this).show();
                            }).on("click", function () {
                                $(this).prev().find('input').val("");
                                //return false;
                            })
                            var text = value.ColText;
                            var arr = text.split(" ");
                            if (arr.length == 2 && arr[0].split("-").length == 3 && arr[1].split(":").length == 3) {//如果是时间格式
                                input.val(value.ColText);
                            } else { //如果是秒数
                                if (!isNaN(text)) {//是数字
                                    text = $.hoteamDateTime.getDateTimeByTicks(text, "datetime");
                                    input.val(text);
                                }
                            }
                            return inputC;
                        },
                        custom_value: function (ele) {
                            var obj = {
                            };
                            obj.ColText = ele.children().val();
                            return obj;
                        }
                    },
                    date: {
                        custom_element: function (value, model) {
                            var me = $(this);
                            var inputC = $(
                                '<div tabindex="0" style="position:relative;">' +
                                '<input tabindex="0" type="text" style="width:100%;" readonly/>' +
                                '</div>' +
                                '<span class="hgrid-datetime-close basesprite b-close"></span>');
                            var lang = HoteamUI.Language.CurLanguage;
                            var dateFmt = 'yyyy-mm-dd';
                            inputC.on("keydown", function () {
                                $(this).children().datetimepicker("hide");
                                if (event.keyCode == 9) {
                                    var td = $(this).closest("td"),
                                        rowNum = td.parent().index();
                                    var cell = me.htGrid("getNextEditCell", rowNum, td.attr("data-name"));
                                    if (cell) {
                                        me.htGrid("setCellEdit", cell.rowNum, cell.colName);
                                    }
                                }
                                return false;
                            });
                            var input = inputC.children();
                            input.datetimepicker({
                                format: dateFmt,
                                language: lang,
                                autoclose: true,
                                todayBtn: true,
                                forceParse: true,
                                startView: 2,
                                maxView: 4,
                                minView: 2
                            }).on("show", function (e) {
                                $(this).parent().focus();
                            }).on("hide", function (e) {
                                $(this).parent().focus();
                            }).on("mouseenter", function () {
                                $(this).nextAll(".b-close").show();
                            }).on("mouseleave", function () {
                                $(this).nextAll(".b-close").hide();
                            }).on("keydown", function (event) {
                                if (event.keyCode == 9) {
                                    var td = $(this).closest("td"),
                                        rowNum = td.parent().index();
                                    var cell = me.htGrid("getNextEditCell", rowNum, td.attr("data-name"));
                                    if (cell) {
                                        me.htGrid("setCellEdit", cell.rowNum, cell.colName);
                                    }
                                    return false;
                                }
                            });
                            inputC.next(".b-close").on("mouseenter", function () {
                                $(this).show();
                            }).on("click", function () {
                                $(this).prev().find('input').val("");
                                return false;
                            })
                            input.val(value.ColText);
                            return inputC;
                        },
                        custom_value: function (ele) {
                            var obj = {
                            };
                            obj.ColText = ele.children().val();
                            return obj;
                        }
                    },
                    time: {
                        custom_element: function (value, model) {
                            var me = $(this);
                            var inputC = $(
                                '<div tabindex="0" style="position:relative;">' +
                                '<input tabindex="0" type="text" style="width:100%;" readonly/>' +
                                '</div>' +
                                '<span class="hgrid-datetime-close basesprite b-close"></span>');
                            var lang = HoteamUI.Language.CurLanguage;
                            var dateFmt = 'hh:ii:ss';
                            inputC.on("keydown", function () {
                                $(this).children().datetimepicker("hide");
                                if (event.keyCode == 9) {
                                    var td = $(this).closest("td"),
                                        rowNum = td.parent().index();
                                    var cell = me.htGrid("getNextEditCell", rowNum, td.attr("data-name"));
                                    if (cell) {
                                        me.htGrid("setCellEdit", cell.rowNum, cell.colName);
                                    }
                                }
                                return false;
                            });
                            var input = inputC.children();
                            input.datetimepicker({
                                format: dateFmt,
                                language: lang,
                                autoclose: true,
                                todayBtn: false,
                                forceParse: true,
                                startView: 1,
                                maxView: 1,
                                minView: 0
                            }).on("show", function (e) {
                                $(this).parent().focus();
                            }).on("hide", function (e) {
                                $(this).parent().focus();
                            }).on("mouseenter", function () {
                                $(this).nextAll(".b-close").show();
                            }).on("mouseleave", function () {
                                $(this).nextAll(".b-close").hide();
                            }).on("keydown", function (event) {
                                if (event.keyCode == 9) {
                                    var td = $(this).closest("td"),
                                        rowNum = td.parent().index();
                                    var cell = me.htGrid("getNextEditCell", rowNum, td.attr("data-name"));
                                    if (cell) {
                                        me.htGrid("setCellEdit", cell.rowNum, cell.colName);
                                    }
                                    return false;
                                }
                            });
                            inputC.next(".b-close").on("mouseenter", function () {
                                $(this).show();
                            }).on("click", function () {
                                $(this).prev().find('input').val("");
                                return false;
                            })
                            input.val(value.ColText);
                            return inputC;
                        },
                        custom_value: function (ele) {
                            var obj = {
                            };
                            obj.ColText = ele.children().val();
                            return obj;
                        }
                    },
                    textvalue: {
                        custom_element: function (value, model, rowid) {
                            var me = $(this);
                            var opt = me.data("option");
                            var icon = model.icon;
                            var textClass = "hoteam-editgrid-textvalue-textimg";
                            var classname = "";

                            var contentstr = '<div tabindex="0" class="hoteam-editgrid-textvalue-edit">';

                            if (icon) {
                                var iconClass = '';
                                var iconStyle = '';
                                if (icon.indexOf("~") < 0) {//雪碧图
                                    iconClass = HoteamUI.Common.GetImage(icon, 16);
                                } else {
                                    iconStyle = "style='background:url(" + icon.replace("~", PageInit.WebRootPath) + ") no-repeat;background-size:100% 100%;'";
                                }
                                contentstr += '<span class="hoteam-editgrid-textvalue-img ' + iconClass + '" ' + iconStyle + '></span>';
                                textClass = "hoteam-editgrid-textvalue-textimgdouble";
                                classname = "hoteam-editgrid-textvalue-close";
                            }
                            contentstr += '<span class="hoteam-editgrid-textvalue-text ' + textClass + '" val="' + self.escapeHtml(value.ColValue) + '">' + self.escapeHtml(value.ColText) + '</span>' +
                                "<span title='" + HoteamUI.Language.Lang("TextValue.Clear") + "' class='basesprite b-close hoteam-textvalue-trash " + classname + "' style='z-index:10;'/></div>";
                            var content = $(contentstr);
                            content.on("click", function (e) {
                                var self = this;
                                if ($(e.target).hasClass("basesprite") > 0) {
                                    $(self).children(".hoteam-editgrid-textvalue-text").text("").attr("val", "");
                                    return false;
                                }

                                var setContent = function (result) {
                                    $(self).children(".hoteam-editgrid-textvalue-text").text(result.text).attr("val", result.value);
                                };
                                var ctrlEvent = {
                                    textValue: this,
                                    text: $(self).children(".hoteam-editgrid-textvalue-text").text(),
                                    value: $(self).children(".hoteam-editgrid-textvalue-text").attr("val"),
                                    o: opt.ctrlEvent.o,
                                    setContent: setContent,
                                    rowid: rowid
                                };
                                var bind;
                                if (value.Databind) {//如果单元格中存在此属性（优先）
                                    bind = value.Databind;
                                } else {
                                    bind = model.databind;
                                }
                                //此处为了兼容低版本，以及为了兼容编辑列表及树编辑列表两种不同的形式（低版本的两个控件），做了以下处理
                                //将（ctrlEvent）截取掉
                                var index = bind.indexOf('(ctrlEvent)');
                                if (index > 0) {
                                    bind = bind.substring(0, index);
                                }
                                if (bind) {
                                    window[bind](ctrlEvent, setContent);
                                }
                                e.stopPropagation();
                            }).on("keydown", function (event) {
                                if (event.keyCode == 9) {
                                    var td = $(this).closest("td"),
                                        rowNum = td.parent().index();
                                    var cell = me.htGrid("getNextEditCell", rowNum, td.attr("data-name"));
                                    if (cell) {
                                        me.htGrid("setCellEdit", cell.rowNum, cell.colName);
                                    }
                                    return false;
                                }
                            });
                            content[0].setTextValue = function (text, value) {
                                $(this).children(".hoteam-editgrid-textvalue-text").text(text).attr("val", value);
                            }
                            content[0].getText = function () {
                                return $(this).children(".hoteam-editgrid-textvalue-text").text();
                            }
                            content[0].getValue = function () {
                                return $(this).children(".hoteam-editgrid-textvalue-text").attr("val");
                            }
                            return content;
                        },
                        custom_value: function (ele) {
                            var obj = {
                            };
                            obj.ColValue = ele[0].getValue();
                            obj.ColText = ele[0].getText();
                            return obj;
                        }
                    },
                    editbutton: {
                        custom_element: function (value, model) {
                            var me = $(this);
                            var opt = me.data("option");
                            //26141 李金岳
                            var content =
                                $('<div tabindex="0" class="hoteam-editgrid-editbutton-edit">' +
                                    '<input class="hoteam-editgrid-editbutton-text" value="' + self.escapeHtml(value.ColText) + '" val="' + self.escapeHtml(value.ColValue) + '"' + ((model.readOnly === true || model.textEnable === false) ? " readonly" : "") + '/>' +
                                    '<div class="hoteam-editgrid-editbutton-img basesprite b-gray-more"></div>' +
                                    '</div>');
                            if (model.readOnly !== true && model.buttonEnable !== false) {
                                content.children(".hoteam-editgrid-editbutton-img").click(function (e) {
                                    var _opt = me[0].p,
                                        index = $(this).closest('tr').index(),
                                        rowObject = $(me).htGrid("getRowByIndex", index + _opt.rowNum * (_opt.currentpage - 1));
                                    rowData = $.hoteamGrid.convertSelectData(opt.id, [rowObject])[0];

                                    var input = $(this).parent().find("input.hoteam-editgrid-editbutton-text");
                                    var ctrlEvent = {

                                        o: opt.ctrlEvent.o,
                                        text: input.val(),
                                        value: input.attr('val'),
                                        setContent: function (result) {
                                            input.val(result.text || '');
                                            input.attr('val', result.value || '');
                                        },
                                        colModel: model,
                                        rowData: rowData
                                    };
                                    //此处为了兼容低版本，以及为了兼容编辑列表及树编辑列表两种不同的形式（低版本的两个控件），做了以下处理
                                    //将（ctrlEvent）截取掉
                                    var index = model.databind.indexOf('(ctrlEvent)');
                                    if (index > 0) {
                                        model.databind = model.databind.substring(0, index);
                                    }
                                    if (model.databind) {
                                        window[model.databind](ctrlEvent);
                                    }
                                    e.stopPropagation();
                                });
                            }
                            content.children("input").on("keydown", function (event) {
                                if (event.keyCode == 9) {
                                    var td = $(this).closest("td"),
                                        rowNum = td.parent().index();
                                    var cell = me.htGrid("getNextEditCell", rowNum, td.attr("data-name"));
                                    if (cell) {
                                        me.htGrid("setCellEdit", cell.rowNum, cell.colName);
                                    }
                                    return false;
                                }
                            });
                            return content;
                        },
                        custom_value: function (ele, value) {
                            var obj = {
                            };
                            var input = ele.find("input");
                            obj.ColText = input.val();
                            obj.ColValue = input.attr("val");
                            return obj;
                        }
                    },
                    autocompletecombox: {
                        custom_element: function (value, model) {
                            var me = this;
                            //获取数据源
                            var data = [];
                            if (value.DataSource) {//优先选择数据中传递过来的数据源
                                data = value.DataSource;
                            } else if (value.Databind) {//如果单元格中有设置
                                data = eval(value.Databind);
                                if (data instanceof Function) {
                                    model.databind += '()';
                                    data = eval(model.databind);
                                }
                            } else if (model.dataSource) {//其次选择列表头中传递过来的数据源
                                data = model.dataSource;
                            }
                            var content =
                                $('<div tabindex="0" class="hoteam-editgrid-editbutton-edit">' +
                                    '<input class="hoteam-editgrid-autocomplete-text" value="' + (value.ColText || "") + '"/>' +
                                    '</div>');
                            content.find("input").on("keydown", function (event) {
                                if (event.keyCode == 9) {
                                    var td = $(this).closest("td"),
                                        rowNum = td.parent().index();
                                    var cell = me.htGrid("getNextEditCell", rowNum, td.attr("data-name"));
                                    if (cell) {
                                        me.htGrid("setCellEdit", cell.rowNum, cell.colName);
                                    }
                                    return false;
                                }
                            }).bsSuggest({ "data": data });
                            return content;
                        },
                        custom_value: function (ele, value) {
                            var obj = {
                            };
                            var input = ele.find("input");
                            obj.ColText = input.val();
                            obj.ColValue = input.attr("data-val");
                            input.bsSuggest("destroy");
                            return obj;
                        }
                    },
                    textarea: {
                        custom_element: function (value, model) {
                            var me = this;
                            var input = $("<textarea type='text' class='htgrid-edit-input' style='width:100%'></textarea>");
                            input.val(value.ColText).on("keydown", function (event) {
                                if (event.keyCode == 9) {
                                    var td = $(this).closest("td"),
                                        rowNum = td.parent().index();
                                    var cell = me.htGrid("getNextEditCell", rowNum, td.attr("data-name"));
                                    if (cell) {
                                        me.htGrid("setCellEdit", cell.rowNum, cell.colName);
                                    }
                                    return false;
                                }
                            });
                            return input;
                        },
                        custom_value: function (ele, value) {
                            var obj = {
                            };
                            obj.ColText = ele.val();
                            return obj;
                        }
                    },
                    number: {
                        custom_element: function (value, model) {

                            var me = this;
                            html = ["<div class='htgrid-edit-number-container'>",
                                "<input type='text' class='htgrid-edit-input htgrid-eidt-input-number' style='width:100%'/>",
                                '<span class="hoteam-textbox-control">',
                                '<span class="hoteam-textbox-control-up">',
                                '   <span class="basesprite b-angle-up"></span>',
                                '</span>',
                                '<span class="hoteam-textbox-control-down">',
                                '   <span class="basesprite b-angle-down"></span>',
                                '</span>',
                                '</span>',
                                '</div>'].join('');
                            var inputContainer = $(html),
                                textbox = inputContainer.find('>input'),
                                controlUp = inputContainer.find('.hoteam-textbox-control-up'),
                                controlDown = inputContainer.find('.hoteam-textbox-control-down'),
                                step = (model.numberStep - 0) || 1,
                                fixed = (model.numberFixed - 0) || 0;


                            textbox.val(value.ColText).on("keydown", function (event) {
                                if (event.keyCode == 9) {
                                    var td = $(this).closest("td"),
                                        rowNum = td.parent().index();
                                    var cell = me.htGrid("getNextEditCell", rowNum, td.attr("data-name"));
                                    if (cell) {
                                        me.htGrid("setCellEdit", cell.rowNum, cell.colName);
                                    }
                                    return false;
                                }
                            });

                            controlUp.on('click', function () {
                                var number = textbox.val();
                                if (!isNaN(number)) {
                                    textbox.val((number - 0 + step).toFixed(fixed));
                                }
                            });

                            controlDown.on('click', function () {
                                var number = textbox.val();
                                if (!isNaN(number)) {
                                    textbox.val((number - 0 - step).toFixed(fixed));
                                }
                            });


                            return inputContainer;
                        },
                        custom_value: function (ele, value) {
                            var obj = {
                            };
                            obj.ColText = ele.find('input').val();
                            return obj;
                        }
                    }
                };
            },
            //根据列的colType不同，创建不同的formatter
            setColFormatter: function (col) {
                var me = this;
                if (col.colType.toLowerCase() == "hidden") {
                    col.hidden = true;

                }
                else if (col.colType.toLowerCase() == "image") {
                    if (!col.width) {
                        col.width = 32;
                    }
                    col.sortable = false;
                    col.editable = false;
                    //col.showTitle = false;
                    col.formatter = function (value) {//展示图片
                        var iconClass = '', iconStyle = '';
                        if (value.ColIcon) {
                            if (value.ColIcon.indexOf("~") < 0) {//雪碧图
                                iconClass = HoteamUI.Common.GetImage(value.ColIcon, 16);
                            } else {
                                iconStyle = "style='background:url(" + value.ColIcon.replace("~", PageInit.WebRootPath) + ") no-repeat;background-size:100% 100%;'";
                            }
                        }
                        content = "<div " + iconStyle + " class='htgrid_col_button " + iconClass + "'>" +
                            "</div>";
                        return content;
                    }
                }
                else if (col.colType.toLowerCase() == "checkbox") {//展示checkbox
                    col.showTitle = false;
                    col.formatter = function (value) {
                        var checkboxImg = $.hoteamEditGrid.checkboxImg;
                        if (value.ColValue == true || (typeof value.ColValue == "string" && value.ColValue.toLowerCase() == "true")) {
                            value.ColValue = 1;
                        } else if (value.ColValue == false || (typeof value.ColValue == "string" && value.ColValue.toLowerCase() == "false")) {
                            value.ColValue = 0;
                        }
                        value.ColValue = value.ColValue == undefined ? "1" : value.ColValue; //默认1
                        value.ColText = value.ColValue;
                        var spanCls = value.ColValue == "1" ? checkboxImg.full : checkboxImg.blank; //1为选中,0为不选中
                        //创建checkbox
                        var content = '<span class=" ' + spanCls + '"></span>';
                        return content;
                    }
                }
                else if (col.colType.toLowerCase() == "checkboxthirdstate") {//展示多态checkbox
                    col.showTitle = false;
                    col.formatter = function (value, column) {
                        //0代表未选中，1代表选中，2代表中间状态
                        var checkboxImg = $.hoteamEditGrid.checkboxImg;
                        //26152 李金岳
                        value.ColValue = value.ColValue ? value.ColValue : ((column&&column.defaultValue)?column.defaultValue:"1"); //默认为1
                        value.ColText = value.ColValue;
                        var spanCls = value.ColValue == "1" ? checkboxImg.full :
                            (value.ColValue == "2" ? checkboxImg.part : checkboxImg.empty); //1为选中,0为不选中
                        //创建checkbox
                        var content = '<span class="' + spanCls + '"></span>';
                        return content;
                    }
                }
                else if (col.colType.toLowerCase() == "datetime") {//展示时间
                    col.formatter = function (value) {
                        //判断当前传递过来的是秒数还是时间格式（yyyy-MM-dd hh：MM：ss）
                        value.ColText = value.ColText ? value.ColText : "";
                        var text = value.ColText;
                        var arr = text.split(" ");
                        if (arr.length == 2 && arr[0].split("-").length == 3 && arr[1].split(":").length == 3) {//如果是时间格式
                            return '<span>' + text + '</span>';
                        } else { //如果是秒数
                            if (!isNaN(text)) {//是数字
                                text = $.hoteamDateTime.getDateTimeByTicks(text, "datetime");
                                value.ColText = text;
                            }
                            return '<span>' + text + '</span>';
                        }
                    }
                }
                else if (col.colType.toLowerCase() == "date") {//展示日期
                    col.formatter = function (value) {
                        //判断当前传递过来的是秒数还是日期格式（yyyy-MM-dd）
                        value.ColText = value.ColText ? value.ColText : "";
                        var text = value.ColText;
                        if (text.indexOf('-') != -1) {//如果是时间格式
                            return '<span>' + text + '</span>';
                        } else { //如果是秒数
                            if (!isNaN(text)) {//是数字
                                text = $.hoteamDateTime.getDateTimeByTicks(text, "date");
                                value.ColText = text;
                            }
                            return '<span>' + text + '</span>';
                        }
                    }
                }
                else if (col.colType.toLowerCase() == "textvalue") {
                    col.formatter = function (value, model) {
                        //背景图
                        var icon = model.icon;
                        value.ColText = value.ColText ? value.ColText : "";
                        var content = '<div class="hoteam-editgrid-textvalue">';
                        var textClass = "";
                        if (icon) {
                            textClass = "hoteam-editgrid-textvalue-textimg";
                            var iconClass = '';
                            var iconStyle = '';
                            if (icon.indexOf("~") < 0) {//雪碧图
                                iconClass = HoteamUI.Common.GetImage(icon, 16);
                            } else {
                                iconStyle = "style='background:url(" + icon.replace("~", PageInit.WebRootPath) + ") no-repeat;background-size:100% 100%;'";
                            }
                            content += '<span class="hoteam-editgrid-textvalue-img ' + iconClass + '" ' + iconStyle + '></span>';
                        }
                        content += '<span class="hoteam-editgrid-textvalue-text ' + textClass + '">' + me.escapeHtml(value.ColText) + '</span></div>';
                        return content;
                    }
                }
                else if (col.colType.toLowerCase() == "number") {
                    col.sortType = "number";
                    if (!col.regex) {
                        col.regex = "^[0-9]*$";
                        col.regexTitle = HoteamUI.Language.Lang("EditGrid", "NumberRegexTitle");
                    }
                }
                else if (col.colType.toLowerCase() == "thumbnail") {
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
                } else if (col.colType.toLowerCase() == "link") {
                    col.formatter = function (value) {
                        var content = '<a class="htgrid_col_a">' + ($.hgrid.escapeHtml(value.ColText || "")) + '</a>';
                        return content;
                    }
                }
            },
            escapeHtml: function (str) {
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
            },
            //将获取到的数据进行转化成平台所需格式
            convertGridData: function (id, data) {
                var me = this;
                var rowsArr = [];
                $.each(data, function (i) {
                    var rowData = data[i];
                    rowsArr.push(me.convertArrToObject(id, rowData));
                });
                return rowsArr;
            },
            //将每行数据由数组转换为对象
            convertArrToObject: function (id, rowData) {
                var rowObj = {};
                var opt = $("#" + id).htGrid("getOption");
                var modelObj = opt.modelObj;
                $.each(rowData, function (key, obj) {
                    if (key == "parentNodeData" || key == "children") {
                        rowObj[key] = obj;
                        return;
                    }
                    if (typeof obj === "object") {
                        if (modelObj[key]) {
                            var colType = obj.CellType ? obj.CellType : modelObj[key].colType;
                            if ((colType == "dropdown") || (colType == "multiselectdropdown") || (colType == "textValue") || (colType == "autocompletecombox")) {
                                rowObj[key] = {
                                    text: obj.ColText == 'undefined' ? "" : obj.ColText,
                                    value: obj.ColValue == "undefined" ? "" : obj.ColValue
                                };
                            } else {
                                //如果是日期时间,且是‘yyyy-MM-dd’格式
                                if ((colType == "datetime" || colType == "date") && obj.ColText.indexOf("-") > 0) {
                                    rowObj[key] = {
                                        value: $.hoteamDateTime.getTicksByDateTime(obj.ColText, colType),
                                        text: obj.ColText
                                    };
                                } else if (colType == "image") {//如果是图片
                                    rowObj[key] = {
                                        text: obj.ColText == 'undefined' ? "" : obj.ColText,
                                        icon: obj.ColIcon == "undefined" ? "" : obj.ColIcon
                                    };
                                } else if (colType == "number") {
                                    rowObj[key] = obj.ColText;
                                } else if (colType == "checkbox") {
                                    rowObj[key] = obj.ColText;
                                } else {
                                    rowObj[key] = obj.ColText;
                                }
                            }
                        } else {
                            rowObj[key] = obj.ColText || "";
                        }
                    } else if (key == "row_number") {
                        rowObj.row_number = obj;
                    }
                });
                return rowObj;
            },
            localSearch: function (id, opt) {
                var table = $("#" + id);
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
                    table.htGrid("loadFilterData", result);
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
            cancelSearch: function (id, opt) {
                var table = $("#" + id);
                var options = table.htGrid("getOption");
                //显示分页区域
                table.htGrid("showPageBtns");
                //启用排序
                table.htGrid("enableSort");
                table.htGrid("loadData", options.data, options.records);
                this.creatExtendOperate(table.data("option"));
            },
            //分页变化事件
            onPaging: function (flag, ele) {
                var option = $(this).data("option");
                var ctrlEvent = { o: option.ctrlEvent.o };
                HoteamUI.Common.ExeFunction(option.handlers.OnLoadRows, ctrlEvent);
            }
        }

        //全局监控
        //此功能比较消耗性能
        $(document).on("mousedown", function (e) {
            var $target = $(e.target);
            var popup = $(document).find(".ui-dialog");
            //排除弹出框
            if (popup.length > 0) {
                return;
            }
            //排除下拉
            if ($target.closest(".dropdown-menu").length > 0 || $target.closest(".EditGrid").length) {
                return;
            }
            var $elems = $(document).find(".EditGrid:visible");
            $elems.each(function () {
                var $elem = $(this);
                var id = $elem.attr("id");
                var instance = HoteamUI.Control.Instance(id);
                if (instance.id) {
                    instance.SaveEditCell();
                };
            });
        });

    })(jQuery);
}


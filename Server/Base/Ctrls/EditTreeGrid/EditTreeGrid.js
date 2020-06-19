HoteamUI.Control.OEditTreeGrid = {
    //创建编辑树列表
    Create: function (options) {
        var controlInfo,
            opt,
            ctrlOptions,
            col,
            titleOptions;
        //从配置文件中获取相关参数
        options = options || {};
        controlInfo = $.extend(true, {}, (options.controlInfo || this.ControlInfo()));
        opt = $.extend(true, {}, $.hoteamEditGrid.defaults);
        ctrlOptions = controlInfo.CtrlOptions;
        //生成树列表头
        titleOptions = $.hoteamEditTreeGrid.converEditTreeGridRowTitle(ctrlOptions, false);
        $.hoteamEditGrid.setEditGridRowTitle.call($.hoteamEditTreeGrid, opt, titleOptions, false);
        //绑定事件
        opt.parentId = this.id;
        opt.containerid = options.containerid;
        opt.id = this.GetId();
        opt.autofit = options.autofit;
        opt.ctrlEvent = {};
        opt.ctrlEvent.o = this;
        opt.handlers = {};
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
                case "OnOpenRow":
                    opt.handlers.OnOpenRow = this.GetEventFunctionName("OnOpenRow");
                    break;
                case "OnRowClick":
                    opt.handlers.OnRowClick = this.GetEventFunctionName("OnRowClick");
                    break;
                case "OnRowDblClick":
                    opt.handlers.OnRowDblCLick = this.GetEventFunctionName("OnRowDblClick");
                    break;
                case "OnCheckboxClick":
                    opt.handlers.OnCheckboxClick = this.GetEventFunctionName("OnCheckboxClick");
                    break;
                case "OnTreeNodeImageClick":
                    opt.handlers.OnTreeNodeImageClick = this.GetEventFunctionName("OnTreeNodeImageClick");
                    break;
                case "OnLoadSuccess":
                    opt.handlers.OnLoadSuccess = this.GetEventFunctionName("OnLoadSuccess");
                    break;
                case "OnBeforeEdit":
                    opt.handlers.OnBeforeEdit = this.GetEventFunctionName("OnBeforeEdit");
                    break;
                case "OnAfterEdit":
                    opt.handlers.OnAfterEdit = this.GetEventFunctionName("OnAfterEdit");
                    break;
                default: break;
            }
        }
        //创建树列表
        $.hoteamEditTreeGrid.create(opt);
    },
    //加载列表头
    LoadColTitle: function (titleOptions) {
        var opt = $("#" + this.GetId()).data("option"),
            isOldAPI = titleOptions.data && titleOptions.data instanceof Array;

        $("#" + this.GetId()).htGrid("destroy");
        //兼容上一版本，允许重设autoLoadData，multiselect。新版废弃
        if (isOldAPI) {
            titleOptions = titleOptions.data;
        }

        $.hoteamEditTreeGrid.converEditTreeGridRowTitle(titleOptions, true);

        //处理并合并参数
        $.hoteamEditGrid.setEditGridRowTitle.call($.hoteamEditTreeGrid, opt, titleOptions, true);

        isOldAPI ? $.hoteamEditGrid.create(opt) : $.hoteamEditGrid.create(opt, titleOptions.data.ColumnLink);

        $("#" + this.GetId()).htGrid("resize", true, false);
    },
    //根据行号获取当前行节点的展开状态
    GetNodeStatus: function (rowNum) {
        return $("#" + this.GetId()).htGrid("getNodeStatus", rowNum);
    },
    //加载数据
    LoadGridRows: function (data) {
        data = { Rows: data };
        var rows = $.hoteamEditTreeGrid.mergeData(this.GetId(), data, 0, true);
        return $.hoteamEditGrid.loadRowData(this.GetId(), rows, rows.length);
    },
    //移除子节点 
    DeleteChildRows: function (parentNum) {
        if (parentNum) {
            $("#" + this.GetId()).htGrid("removeChildRows", parentNum);
        }
    },
    GetRowsByParam: function (column, value) {
        var id = this.GetId();
        var arr = $("#" + id).htGrid("getRowsByParam", column, value);
        return $.hoteamEditGrid.convertGridData(id, arr);
    },
    GetRootRows: function () {
        var id = this.GetId();
        var arr = $("#" + id).htGrid("getRootRows");
        return $.hoteamEditGrid.convertGridData(id, arr);
    },
    //清除数据
    ClearGridRows: function () {
        return $.hoteamEditGrid.loadRowData(this.GetId(), [], 0);
    },
    //[已弃用]此接口应该是加载下级节点用的，命名不正确。使用新的API：LoadChildRows
    AddRow: function (data, rowid) {
        this.LoadChildRows(rowid, data);
    },
    //树节点下添加数据(这个方式是删除当前的子节点(不是追加！)，然后再加载数据)
    LoadChildRows: function (rowNum, data) {
        data = { Rows: data };
        var id = this.GetId(),
            table = $("#" + id),
            option = table.htGrid("getOption"),
            parentNode = table.htGrid("getRowByIndex", rowNum),
            nodeCellName = option.treeNode,
            level = parentNode[nodeCellName].level;
        this.DeleteChildRows(rowNum);
        if (data && data.Rows && data.Rows.length > 0) {
            data = $.hoteamEditTreeGrid.mergeData(id, data, level + 1, true);
            table.htGrid("addRows", data, rowNum);
        }
    },
    //获取子节点数据
    GetChildRows: function (rowNum) {
        var id = this.GetId();
        var arr = $("#" + id).htGrid("getChildRows", rowNum);
        return $.hoteamEditGrid.convertGridData(id, arr);
    },
    //新增一行(parentNum:父节点行号；isSelect:新增的这条数据是否选中；obj:新增的这行的默认数据;（position:"last"，不给值默认从顶部插入))
    AddGridRow: function (parentNum, isSelect, obj, position) {
        isSelect = (isSelect == undefined ? false : isSelect);
        if (!obj) obj = {};
        var id = this.GetId(),
            table = $("#" + id),
            opt = table.htGrid("getOption"),
            modelObj = opt.modelObj;
        for (var colName in modelObj) {
            if (!modelObj.hasOwnProperty(colName)) {
                continue;
            }
            //如果是下拉列，且下拉列没有值
            if (modelObj[colName].colType == "dropdown" && (obj[colName] == undefined || obj[colName].ColValue == undefined || obj[colName].ColText == undefined)) {
                if (obj[colName] == undefined) obj[colName] = {};
                //获取数据源(此时单元格是新增的，所以是没有定义数据源的)
                var dataSource = modelObj[colName].dataSource,
                    colValue = obj[colName].ColValue;
                if (dataSource && dataSource.length > 0) {
                    var text, value;
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
                        text = dataSource[0].Text;
                        value = dataSource[0].Value;
                    }
                    obj[colName].ColText = text;
                    obj[colName].ColValue = value;
                }
            }
        }
        table.htGrid("addEditChildRow", parentNum, isSelect, { cellattr: obj }, position);
    },
    //更新子节点数据
    UpdateChildrenNodes: function (parentNum, data) {
        this.DeleteChildRows(parentNum);
        this.LoadChildRows(parentNum, data);
    },
    //通过行号来update此行数据
    UpdateDataByRowID: function (rowId, data) {
        var id = this.GetId();
        var arr = data.ColDatas;
        var obj = {};
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            obj[item.ColName] = {
                ColText: item.ColText,
                ColValue: item.ColValue
            }
            if (item.Editable != undefined && item.Editable != 2) {
                if (obj[item.ColName]) {
                    obj[item.ColName].Editable = item.Editable;
                }
            }
        }
        $("#" + id).htGrid("updateDataByRowID", rowId, obj);
        //更新图片
        if (data.Icons) {
            this.UpdateNodeImage(rowId, data.Icons);
        }
    },
    //获取当前页信息
    GetCurrentPageRows: function () {
        var id = this.GetId();
        return $.hoteamGrid.convertSelectData(id, $("#" + id).htGrid("getCurrentPageRows"));
    },
    //获取上一个节点数据
    GetPreNodeRow: function (rowNum) {
        var id = this.GetId();
        var obj = $("#" + id).htGrid("getPreNodeRow", rowNum);
        return $.hoteamEditGrid.convertArrToObject(id, obj);
    },
    //获取下一个节点数据
    GetNextNodeRow: function (rowNum) {
        var id = this.GetId();
        var obj = $("#" + id).htGrid("getNextNodeRow", rowNum);
        return $.hoteamEditGrid.convertArrToObject(id, obj);
    },
    //获取节点index
    GetNodeIndex: function (rowNum) {
        return $("#" + this.GetId()).htGrid("getNodeIndex", rowNum);
    },
    //展开/折叠节点
    ExpandNode: function (rowNum, flag) {
        $("#" + this.GetId()).htGrid("expandNode", rowNum, flag);
    },
    //展开、关闭全部节点(此方法仅适用于数据全部请求过来的时候，异步加载的数据需要另外做处理，暂时不考虑)
    ExpandAll: function (flag) {
        $("#" + this.GetId()).htGrid("expandAll", flag);
    },
    //根据行号（数组）设置选中行
    SetSelectedRow: function (rows) {
        $("#" + this.GetId()).htGrid("setSelectedRow", rows);
    },
    //设置行不选中
    SetUnSelectRow: function (rows) {
        $("#" + this.GetId()).htGrid("setUnSelectRow", rows);
    },
    SetSelectAll: function () {
        $("#" + this.GetId()).htGrid("setSelectAll");
    },
    //设置取消所有选中
    UnSelectAll: function () {
        $("#" + this.GetId()).htGrid("resetSelectedRow");
    },
    //获取选中行的主键
    GetSelectedRowIds: function () {
        return $("#" + this.GetId()).htGrid("getSelectedRowIds");
    },
    //通过主键设置选中行
    SetSelectedRowByIds: function (ids) {
        $("#" + this.GetId()).htGrid("setSelectedRowByIds", ids);
    },
    //获取当前选中行信息(获取之前先将列表编辑的置为未编辑)
    GetSelectedRows: function () {
        return HoteamUI.Control.OEditGrid.GetSelectedRows.call(this);
    },
    //获取所有选中项的顶层节点（前提是顶层节点也是选中的）
    GetTopSelectedRows: function () {
        var id = this.GetId();
        return $.hoteamEditGrid.convertGridData(id, $("#" + id).htGrid("getTopSelectedRows"));
    },
    //保存处于编辑状态的数据
    SaveEditCell: function () {
        return HoteamUI.Control.OEditGrid.SaveEditCell.call(this);
    },
    //保存编辑列表处在编辑状态的数据
    SaveGridRows: function () {
        return HoteamUI.Control.OEditGrid.SaveGridRows.call(this);
    },
    //将列表数据的编辑状态置为正常状态,保存到客户端（即将编辑的数据的标示位等去掉）
    SaveEditData: function () {
        $("#" + this.GetId()).htGrid("saveEditData");
    },
    //获取当前列表是否有校验未通过的数据
    GetRegexStatus: function () {
        return $("#" + this.GetId()).htGrid("getRegexStatus");
    },
    //通过行号删除行
    DeleteGridRows: function (rowNums, isDeleteChild) {
        //如果传递进来的不是数组
        if (!(rowNums instanceof Array)) {
            rowNums = [rowNums];
        }
        if (isDeleteChild == undefined) {
            isDeleteChild = true;
        }
        var id = this.GetId(),
            table = $("#" + id),
            option = table.htGrid("getOption"),
            nodeCellName = option.treeNode,
            data = option.data;
        for (var i = 0; i < rowNums.length; i++) {
            var level = data[rowNums[i] - 1].cellattr[nodeCellName].level;
            for (var k = rowNums[i]; k < data.length; k++) {
                if (data[k].cellattr[nodeCellName].level <= level) {
                    break;
                } else if (data[k].cellattr[nodeCellName].level > level && isDeleteChild) {
                    rowNums.push(data[k].cellattr.row_number);
                }
            }
        }
        $("#" + this.GetId()).htGrid("removeRows", rowNums);
    },
    //删除选中的行
    DeleteSelectedGridRows: function () {
        var id = this.GetId(),
            table = $("#" + id),
            option = table.htGrid("getOption"),
            nodeCellName = option.treeNode,
            data = option.data;
        var rowNums = table.htGrid("getSelectedRowNum");
        for (var i = 0; i < rowNums.length; i++) {
            var level = data[rowNums[i] - 1].cellattr[nodeCellName].level;
            for (var k = rowNums[i]; k < data.length; k++) {
                if (data[k].cellattr[nodeCellName].level <= level) {
                    break;
                } else if (data[k].cellattr[nodeCellName].level > level) {
                    rowNums.push(data[k].cellattr.row_number);
                }
            }
        }
        $("#" + this.GetId()).htGrid("removeRows", rowNums);
    },
    //获取选中行的rowid
    GetSelectedRowsID: function () {
        return HoteamUI.Control.OEditGrid.GetSelectedRowsID.call(this);
    },
    //获取所有行的行号
    GetAllRowsID: function () {
        return HoteamUI.Control.OEditGrid.GetAllRowsID.call(this);
    },
    //获取正在编辑的行的行号
    GetEditRowID: function () {
        return HoteamUI.Control.OEditGrid.GetEditRowID.call(this);
    },
    //通过行号获取该行数据
    GetRowByRowID: function (rowid) {
        return HoteamUI.Control.OEditGrid.GetRowContent.call(this, rowid);
    },
    //获取父节点数据
    GetParentRow: function (rowid) {
        var id = this.GetId();
        var table = $("#" + id);
        //获取数据
        var rowData = $("#" + id).htGrid("getParentRowContent", rowid);
        return $.hoteamEditGrid.convertArrToObject(id, rowData);
    },
    //获取列表列属性集合
    GetColModel: function () {
        return $("#" + this.GetId()).htGrid("getOption").colModel;
    },
    //通过行号及列名获取列内容
    GetCellContent: function (rowid, colName) {
        return HoteamUI.Control.OEditGrid.GetCellContent.call(this, rowid, colName);
    },
    //获取编辑过的数据
    GetEditData: function () {
        var id = this.GetId(),
            obj = $("#" + id).htGrid("getTreeEditData"),
            addData = obj.add,
            editData = obj.edit,
            removeData = obj.remove;
        function convertData(id, arr) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].children && arr[i].children.length > 0) {
                    convertData(id, arr[i].children);
                }
                arr[i] = $.hoteamEditGrid.convertArrToObject(id, arr[i], true);
            }
        }
        //遍历所有的数据，调整格式为平台需要的
        for (var i = 0; i < addData.length; i++) {
            //处理父节点数据格式
            var parentData = addData[i].parentNodeData;
            if (parentData) {
                addData[i].parentNodeData = $.hoteamEditGrid.convertArrToObject(id, addData[i].parentNodeData);
            }
            //处理子节点数据格式
            convertData(id, addData[i].children || []);
            //处理当前的节点数据格式
            addData[i] = $.hoteamEditGrid.convertArrToObject(id, addData[i], true);
        }
        return {
            "add": addData,
            "edit": $.hoteamEditGrid.convertGridData(id, editData),
            "remove": $.hoteamEditGrid.convertGridData(id, removeData)
        }
    },
    //设置数据源（主要是针对下拉）
    SetDataSource: function (rowid, colName, dataSource) {
        HoteamUI.Control.OEditGrid.SetDataSource.call(this, rowid, colName, dataSource);
    },
    //更新节点图片
    UpdateNodeImage: function (rowid, imgArr) {
        var id = this.GetId();
        $("#" + id).htGrid("updateNodeImage", rowid, imgArr);
    },
    //设置单元格的value值和text值
    SetCellContent: function (rowid, colName, text, value) {
        HoteamUI.Control.OEditGrid.SetCellContent.call(this, rowid, colName, text, value);
    },

    //给行设置颜色
    SetRowColor: function (rowid, color) {
        HoteamUI.Control.OEditGrid.SetRowColor.call(this, rowid, color);
    },
    //给单元格设置颜色
    SetCellColor: function (rowId, colName, color) {
        HoteamUI.Control.OEditGrid.SetCellColor.call(this, rowId, colName, color);
    },
    //给列设置颜色
    SetColumnColor: function (colName, color) {
        HoteamUI.Control.OEditGrid.SetColumnColor.call(this, colName, color);
    },
    SetRowTextColor: function (rowNums, color) {
        $("#" + this.GetId()).htGrid("setRowTextColor", rowNums, color);
    },
    //重置大小
    Resize: function () {
        HoteamUI.Control.OEditGrid.Resize.call(this);
    },
    //删除列设置弹框和查询弹框
    Dispose: function () {
        HoteamUI.Control.OEditGrid.Dispose.call(this);
    },
    GetId: function () {
        return this.id + "_EditTreeGrid";
    }
};

{
    (function ($, undefined) {
        $.hoteamEditTreeGrid = {
            defaultOption: {
                check: false,//节点位置是否有checkbox
                checkType: false, //节点的checkbox选中是否级联
                rowLinkCheck: true //行点击选中时是否同时选中节点的checkbox
            },
            create: function (option) {
                option.setting = $.extend({}, this.defaultOption, option.setting || {});
                option.setting.onCellClick = this.onCellClick;
                option.setting.onAfterOpenNode = this.onAfterOpenNode;
                option.setting.OnCheckboxClick = this.OnCheckboxClick;
                option.setting.onTreeNodeImageClick = this.OnTreeNodeImageClick;
                $.hoteamEditGrid.create(option);
            },
            //进行数据转换合并
            mergeData: function (id, data, level, parentIsOpen) {
                var nodeCellName = $("#" + id).data("option").setting.treeNode,
                    disableEditColumns = $.hoteamGrid.getDisableEditColumns(id);
                //转换合并数据信息
                function mergeEditTreeData(data, level, nodeCellName, parentIsOpen) {
                    var rowsData = data.Rows,
                        rowsSetting = data.RowSettings || [],
                        tempRow,
                        row,
                        childRows,
                        tempChildRows,
                        tempCells,
                        cell,
                        rowSetting = {},
                        rowAttribute,
                        cellsAttribute,
                        cellSetting,
                        result = [],
                        rowParentIsOpen;

                    if (!rowsData || !rowsData.length) {
                        return result;
                    }
                    //遍历树列表行信息
                    for (var i = 0, rowsLength = rowsData.length; i < rowsLength; i++) {
                        row = {};
                        tempRow = rowsData[i] || [];
                        tempCells = tempRow.ColDatas || [];
                        icons = tempRow.Icons || [];
                        rowAttribute = rowsSetting[i] || {};
                        //遍历转换行数据信息，将数单元格数组转换为对象
                        for (var j = 0, cellsLength = tempCells.length; j < cellsLength; j++) {
                            cell = tempCells[j];
                            if (cell.Editable == 0) {//不可编辑
                                cell.Editable = false;
                            } else if (cell.Editable == 1) {
                                cell.Editable = true;
                            } else if (cell.Editable == 2) {
                                delete cell.Editable;
                            }
                            if (HoteamUI.ArrayIndexOf(disableEditColumns, cell.ColName) >= 0) {
                                cell.Editable = false;
                            }
                            row[cell.ColName] = cell;
                        }
                        tempChildRows = tempRow.Children;
                        //合并转换前行数据，加入队列中
                        result.push({
                            rowattr: $.extend(true, {
                                hidden: !parentIsOpen
                            }, rowAttribute),
                            cellattr: $.extend(true, function () {
                                var attr = {},
                                    isShowExpandIcon = tempRow.IsShowExpandIcon,
                                    isOpenTreeNode = tempRow.IsOpenTreeNode,
                                    hasChildren = tempChildRows && tempChildRows.length > 0 ? true : false,
                                    treeNodeState = "hidden";

                                if (!nodeCellName) {
                                    return attr;
                                }
                                //修正重置树节点参数
                                if (!isShowExpandIcon && hasChildren) {
                                    isShowExpandIcon = true;
                                    isOpenTreeNode = false;
                                }
                                if (isShowExpandIcon && isOpenTreeNode) {
                                    treeNodeState = "open";
                                }
                                else if (isShowExpandIcon && !isOpenTreeNode) {
                                    treeNodeState = "close";
                                }
                                else {
                                    treeNodeState = "hidden";
                                }
                                attr[nodeCellName] = {
                                    IsOpenTreeNode: isOpenTreeNode,
                                    IsShowExpandIcon: isShowExpandIcon,
                                    RowID: tempRow.RowID,
                                    level: level,
                                    loaded: hasChildren,
                                    treeNodeState: treeNodeState,
                                    parentIsOpen: parentIsOpen,
                                    Icons: icons
                                };
                                rowParentIsOpen = treeNodeState === "open" ? true : false;
                                return attr;
                            }(), row)
                        });

                        //对树列表的下级信息进行转换合并
                        childRows = mergeEditTreeData({
                            Rows: tempChildRows,
                            RowSettings: rowAttribute.Children
                        } || [], level + 1, nodeCellName, rowParentIsOpen);

                        result = result.concat(childRows);
                    }
                    return result;
                }

                if (!nodeCellName) {
                    throw "the editTreeGrid has not exit tree colType";
                    return;
                }
                return mergeEditTreeData(data, level, nodeCellName, parentIsOpen);
            },
            //对列表头数据进行处理，查找是否存在ColType为tree的类型。不存在，将第一个非隐藏的文本列类型调整为tree类型列
            converEditTreeGridRowTitle: function (titleOptions, isSeverData) {
                var columnData,
                    nodeCell,
                    col,
                    colType,
                    colTypeName,
                    hasNodeCell = false;
                function converColType(colType) {
                    if (typeof colType === "number") {
                        switch (colType) {
                            case 0:
                                return "text";
                                break;
                            case 1:
                                return "hidden";
                                break;
                            case 2:
                                return "image";
                                break;
                            case 3:
                                return "link";
                                break;
                            case 4:
                                return "number";
                                break;
                            case 5:
                                return "datetime";
                                break;
                            case 6:
                                return "date";
                                break;
                            case 7:
                                return "time";
                                break;
                            case 8:
                                return "dropDown";
                                break;
                            case 9:
                                return "textValue";
                                break;
                            case 10:
                                return "checkBox";
                                break;
                            case 11:
                                return "checkBoxThirdState";
                                break;
                            case 100:
                                return "tree";
                                break;
                            default:
                                return "text";
                        }
                    }
                    else {
                        return colType || "text";
                    }
                }
                if (isSeverData) {
                    if (titleOptions instanceof Array) {
                        columnData = titleOptions;
                    }
                    //如果不是数组,是7.4.0版本
                    else {
                        columnData = titleOptions.data.ColumnData;
                    }
                }
                else {
                    columnData = titleOptions;
                }
                for (var i in columnData) {
                    if (!columnData.hasOwnProperty(i)) {
                        continue;
                    }
                    if (i.indexOf("item") != -1 || isSeverData) {
                        col = columnData[i];
                        //将第一个非隐藏的文本列类型调整为tree类型列
                        colType = isSeverData ? "ColType" : "colType";
                        colTypeName = converColType(col[colType]);
                        col[colType] = colTypeName;
                        if (!hasNodeCell) {
                            if ((colTypeName === "text" || colTypeName === "link") && !titleOptions.treeNode) {
                                nodeCell = col;
                                titleOptions.treeNode = col.Name || col.name;
                            }
                            else if (colTypeName === "tree") {
                                col[colType] = "text";
                                titleOptions.treeNode = col.Name || col.name;
                                hasNodeCell = true;
                            }
                        }
                        if (!isSeverData) {//为向下兼容
                            col.databind = col.editMethod;
                            col.sortable = false;
                        } else {
                            col.Sortable = false;
                        }
                    }
                }
                return titleOptions;

            },
            //创建tree colType 编辑格式
            setEditFormatter: function (col) {
                $.hoteamEditGrid.setEditFormatter(col);
            },
            //创建tree colType 浏览格式
            setColFormatter: function (col) {
                //在编辑列表中查找对应的列类型
                $.hoteamEditGrid.setColFormatter(col);
                //如果还是没找到对应类型，再从列表中查找对应类型
                if (!col.formatter) {
                    $.hoteamGrid.setColFormatter(col);
                }
            },
            onAfterOpenNode: function (node, rowNum) {
                if (!node.loaded) {
                    var table = $(this),
                        options = table.data("option");
                    if (options.handlers.OnOpenRow) {
                        HoteamUI.Common.ExeFunction(options.handlers.OnOpenRow, $.extend({}, options.ctrlEvent, { rowid: rowNum }));
                    }
                    node.loaded = true;
                }
            },
            OnCheckboxClick: function (rowid, checked, rowObj) {

                var opt = $(this).data("option");
                var ctrlEvent = { o: opt.ctrlEvent.o };
                //是否选中
                ctrlEvent.rowselected = checked;
                //行号
                ctrlEvent.rowid = rowid;
                //行数据
                ctrlEvent.rowobject = $.hoteamGrid.convertSelectData(opt.id, [rowObj])[0];
                HoteamUI.Common.ExeFunction(opt.handlers.OnCheckboxClick, ctrlEvent);
            },
            OnTreeNodeImageClick: function (rowid, rowObj) {

                var opt = $(this).data("option");
                var ctrlEvent = { o: opt.ctrlEvent.o };
                //行号
                ctrlEvent.rowid = rowid;
                //行数据
                ctrlEvent.rowobject = $.hoteamGrid.convertSelectData(opt.id, [rowObj])[0];
                HoteamUI.Common.ExeFunction(opt.handlers.OnTreeNodeImageClick, ctrlEvent);

                return !!opt.handlers.OnTreeNodeImageClick;
            }
        }
    }(jQuery, undefined));
};
HoteamUI.Control.OBOMTreeGrid = {
    Create: function (options) {
        options = options || {};
        var self = this;
        var parentId = this.id;
        var id = this.id + "_BomTreeGrid";
        var ctrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions;
        var opts = $.extend(true, {}, $.hoteamEditGrid.defaults);
        opts.containerid = options.containerid;
        opts.ctrlEvent = {};
        opts.ctrlEvent.o = this;
        opts.parentId = parentId;
        opts.id = id;

        var handlers = (options.controlInfo || this.ControlInfo()).PageHandlers;

        for (var i = 0; i < handlers.length; i++) {
            var item = handlers[i];
            switch (item.HandlerName) {
                case "OnAsyncLoadData":
                    opts.handlers.OnAsyncLoadData = this.GetEventFunctionName("OnAsyncLoadData");
                    break;
                case "OnSyncLoadData":
                    opts.handlers.OnSyncLoadData = this.GetEventFunctionName("OnSyncLoadData");
                    break;
                case "OnLoadTreeData":
                    opts.handlers.OnLoadTreeData = this.GetEventFunctionName("OnLoadTreeData");
                    break;
                case "OnLoadFieldsData":
                    opts.handlers.OnLoadFieldsData = this.GetEventFunctionName("OnLoadFieldsData");
                    break;
                case "OnBeforeEdit":
                    opts.handlers.OnBeforeEdit = this.GetEventFunctionName("OnBeforeEdit");
                    break;
                case "OnAfterEdit":
                    opts.handlers.OnAfterEdit = this.GetEventFunctionName("OnAfterEdit");
                    break;
                case "OnColImageClick":
                    opts.handlers.OnColImageClick = this.GetEventFunctionName("OnColImageClick");
                    break;
                case "OnColLinkClick":
                    opts.handlers.OnColLinkClick = this.GetEventFunctionName("OnColLinkClick");
                    break;
                case "OnRowClick":
                    opts.handlers.OnRowClick = this.GetEventFunctionName("OnRowClick");
                    break;
                case "OnRowUpdated":
                    opts.handlers.OnRowUpdated = this.GetEventFunctionName("OnRowUpdated");
                    break;
                case "OnGoto":
                    opts.handlers.OnGoto = this.GetEventFunctionName("OnGoto");
                    break;

                default: break;
            }
        }
        var grid = $('<div id="' + id + '"></div>').appendTo("#" + parentId);
        grid.data('opt', opts);
        grid.hqGrid({
            editing: true,
            autoResize: false,
            pageSize: 200,
            rollingload: true,
            selectingAll: false,
            rowSingleSelect: true,
            fieldsResizable:true,
            config: {
                render: {
                    text: {
                        valueTransform: function (value) {
                            if (typeof value === 'object') {
                                if (!value.value) {
                                    value.value = value.text ? value.text : "";
                                }
                                value.text = "";
                            }
                            return value;
                        },
                        editTemplate: function (item, field) {
                            var fieldName = $.hqGrid.htmlEncode(field.name),
                                fieldText = $.hqGrid.htmlEncode(field.text),
                                value = item.text || item.value;

                            return ['<input data-name="', fieldName, '" ',' type="text" value="', value, '"',  ' />'].join('');
                        }
                    },
                    tree: {
                        valueTransform: function (value) {
                            if (typeof value === 'object' && value.icons) {
                                var len = value.icons.length;
                                for (var i = 0; i < len; i++) {
                                    value.icons[i].Icon = value.icons[i].src;
                                    value.icons[i].src = value.icons[i].src.replace("~", PageInit.WebRootPath);
                                    value.icons[i].Title = value.icons[i].title;
                                }
                            }
                            return value;
                        }
                    },
                    date: {
                        valueTransform: function (value) {
                            if (typeof value === 'object') {
                                value.value = value.value?$.hoteamDateTime.getDateTimeByTicks(value.value, "date"):"";
                                value.text = "";
                            }
                            return value ;
                        }
                    },
                    datetime: {
                        valueTransform: function (value) {
                            if (typeof value === 'object') {
                                value.value = value.value?$.hoteamDateTime.getDateTimeByTicks(value.value, "datetime"):"";
                                value.text = "";
                            }
                            return value;
                        }
                    }
                }
            },
            data: function (opt, resolve) {
                var ctrlEvent = {
                    o: self,
                    opt: opt,
                    resolve: resolve
                }
                window[opts.handlers.OnAsyncLoadData](ctrlEvent);
            },
            tree: function (opt, resolve) {
                var ctrlEvent = {
                    o: self,
                    opt: opt,
                    resolve: resolve
                };

                window[opts.handlers.OnLoadTreeData](ctrlEvent);
            },
            fields: function (opt, resolve) {

                var ctrlEvent = {
                    o: self,
                    opt: opt,
                    resolve: function (result) {
                        //处理数据绑定、事件绑定

                        var _fields = {
                            editbutton: {
                                editEvent: function (field, row, index, get, set) {
                                    var fn = field._ptEditEvent,
                                        data = get();
                                    var ctrlEvent = {
                                        o: self,
                                        text: data.text,
                                        value: data.value,
                                        setContent: set,
                                        colModel: field,
                                        rowData: row
                                    };
                                    if (fn) {
                                        mergeFn(fn, ctrlEvent);
                                    }
                                }
                            },
                            select: {
                                items: function (field, row, index) {
                                    return field._ptItems;
                                }
                            },
                            textvalue: {
                                editEvent: function (field, row, index, get, set) {
                                    var fn = field._ptEditEvent,
                                        data = get();
                                    var ctrlEvent = {
                                        o: self,
                                        textValue: this,
                                        text: data.text,
                                        value: data.value,
                                        setContent: set,
                                        //colModel: field,
                                        rowid: index
                                    };
                                    if (fn) {
                                        mergeFn(fn, ctrlEvent);
                                    }
                                }
                            }
                        }
                        var mergeFn = function (fn, ctrlEvent) {
                            var index = fn.indexOf('(ctrlEvent)');
                            if (index > 0) {
                                fn = fn.substring(0, index);
                            }
                            if (fn) {
                                window[fn](ctrlEvent);
                            }
                        }

                        var data = result.data,
                            len = data.length,
                            fieldAttribute = {};
                        for (var i = 0; i < len; i++) {
                            field = data[i];
                            fieldAttribute[data[i].name] = data[i].type;
                            if (field.type === "tree") {
                                $("#" + id).data("treeName", field.name);
                            }
                            if (_fields[field.type]) {
                                if (_fields[field.type].editEvent) {
                                    field._ptEditEvent = field.editEvent;
                                    field.editEvent = _fields[field.type].editEvent;
                                } else if (_fields[field.type].items) {
                                    field._ptItems = field.items;
                                    field.items = _fields[field.type].items;
                                }
                            }

                            $.hoteamBOMTreeGrid.addFieldRegex(field);
                        }
                        $("#" + id).data("fieldAttribute", fieldAttribute);
                        resolve(result);
                    }
                };
                window[opts.handlers.OnLoadFieldsData](ctrlEvent);
            },
            events: {
                beforeEdit: function (field, row, index, selected) {
                    var ctrlEvent = {
                        o: self,
                        rowid: index,
                        rowobject: $.hoteamBOMTreeGrid.convertObjectData(row, $("#" + id)),
                        colName: field.name
                    };
                    ctrlEvent.rowobject.row_number = index;
                    window[opts.handlers.OnBeforeEdit](ctrlEvent);
                },
                changed: function (field, prev, current, index, selected) {
                    var grid = $("#" + id);
                    var fieldAttribute = grid.data("fieldAttribute");
                    var ctrlEvent = {
                        o: self,
                        rowid: index,
                        newData: current[field.name],
                        oldData: prev[field.name],
                        rowobject: $.hoteamBOMTreeGrid.convertObjectData(prev, $("#" + id)),
                        colName: field.name
                    };
                    if (fieldAttribute[field.name] === "datetime" || fieldAttribute[field.name] === "date" || fieldAttribute[field.name] === "time") {
                        ctrlEvent.newData.text = ctrlEvent.newData.value;
                        ctrlEvent.oldData.text = ctrlEvent.oldData.value;
                        if (fieldAttribute[field.name] === "time") {
                            ctrlEvent.newData.value = $.hoteamDateTime.getTicksByDateTime("1970-01-01 " + ctrlEvent.newData.value +":00", "datetime");
                            ctrlEvent.oldData.value = ctrlEvent.oldData.value ? $.hoteamDateTime.getTicksByDateTime("1970-01-01 " + ctrlEvent.oldData.value +":00", "datetime") : "";
                        } else {
                            ctrlEvent.newData.value = $.hoteamDateTime.getTicksByDateTime(ctrlEvent.newData.value, fieldAttribute[field.name]);
                            ctrlEvent.oldData.value = ctrlEvent.oldData.value ? $.hoteamDateTime.getTicksByDateTime(ctrlEvent.oldData.value, fieldAttribute[field.name]) : "";
                        }
                    }
                    ctrlEvent.rowobject.row_number = index;
                    window[opts.handlers.OnAfterEdit](ctrlEvent);
                },
                treeIconClick: function (field, row, index, selected) {
                    var ctrlEvent = {
                        o: self,
                        rowid: index,
                        rowobject: $.hoteamBOMTreeGrid.convertObjectData(row, $("#" + id)),
                        rowselected: selected
                    };
                    ctrlEvent.rowobject.row_number = index;
                    window[opts.handlers.OnColImageClick](ctrlEvent);
                },
                colLinkClick: function (field, row,index, selected) {
                    var ctrlEvent = {
                        o: self,
                        rowid: index,
                        rowselected: selected
                    };
                    ctrlEvent.rowobject.row_number = index;
                    window[opts.handlers.OnColLinkClick](ctrlEvent);
                },
                rowClick: function (field, row, index, selected) {
                    var ctrlEvent = {
                        o: self,
                        rowid: index,
                        rowobject: $.hoteamBOMTreeGrid.convertObjectData(row, $("#"+id)),
                        rowselected: selected
                    };
                    ctrlEvent.rowobject.row_number = index;
                    window[opts.handlers.OnRowClick](ctrlEvent);
                },
                updated: function (rows) {
                    var ctrlEvent = {
                        o: self,
                        rows:rows
                    }
                    window[opts.handlers.OnRowUpdated](ctrlEvent);
                },
                goto: function (row, index, selected) {
                    var ctrlEvent = {
                        o: self,
                        rowid: index,
                        rowobject: $.hoteamBOMTreeGrid.convertObjectData(row, $("#" + id)),
                        rowselected: selected
                    };
                    ctrlEvent.rowobject.row_number = index;
                    window[opts.handlers.OnGoto](ctrlEvent);
                }
            }
        });
    },

    //获取根节点
    GetRootRows: function () {
        var grid = this.GetTree();
        var data = grid.hqGrid('getRows',null, 'root');
        return $.hoteamBOMTreeGrid.judgeData(data, this, grid);
    },

    GetSelectedRows: function () {
        var grid = this.GetTree(),
            data = grid.hqGrid('selected'),
            len = data.length;
            nodes = [];
        for (var j = 0; j < len; j++) {
            nodes.push(data[j].node)
        }
        var rows = $.hoteamBOMTreeGrid.judgeData(data, this, grid);  
        for (var i = 0; i < len; i++) {
            rows[i].node = nodes[i];
        }
        return rows;
    },

    //获取选中行的rowid
    GetSelectedRowsID: function () {
        var data = this.GetSelectedRows();
        var rowid = [];
        var len = data.length;
        for (var i = 0; i < len; i++) {
            rowid[i] = data[i].row_number;
        }
        return rowid;
    },

    //获取父节点数据
    GetParentRow: function (rowid) {
        var grid = this.GetTree();
        var retArr = true;
        if (typeof rowid === "number") {
            var id = [];
            id.push(rowid);
            rowid = id;
            retArr = false;
        }
        var data = grid.hqGrid('getRowsByIndex', rowid, 'parent');
        var ret = $.hoteamBOMTreeGrid.judgeData(data, this, grid)[0];
        if (ret == undefined) {
            ret = {};
        }
        return ret;
    },


    //刷新子节点数据 
    //expandParam可以放expand来控制及节点是否展开
    UpdateChildrenNodes: function (rowid, param) {
        var grid = this.GetTree();
        if (typeof rowid === "number") {
            var id = [];
            id.push(rowid);
            rowid = id;
        }
        var row = grid.hqGrid('getRowsByIndex', rowid, 'self');
        if (row.length == 1) {
            grid.hqGrid('load', row[0], 'tree', param)
        }
    },

    //重新加载
    Reload: function () {
        var grid = this.GetTree();
        grid.hqGrid('refresh');
    },

    //重置大小
    Resize: function () {
        var grid = this.GetTree();
        grid.hqGrid('resize');
    },
    //获取所有选中项的顶层节点
    GetTopSelectedRows: function () {
        var grid = this.GetTree();
        var data = grid.hqGrid('getSelected', 'top');
        return $.hoteamBOMTreeGrid.judgeData(data, this, grid);
    },
    //通过行号获取该行数据
    GetRowContent: function (rowid) {
        var grid = this.GetTree();
        if (typeof rowid === "number") {
            var id = [];
            id.push(rowid);
            rowid = id;
        }
        var data = grid.hqGrid('getRowsByIndex', rowid, 'self');
        return $.hoteamBOMTreeGrid.judgeData(data, this, grid);
    },
    //通过行号及列名获取列内容
    GetCellContent: function (rowid, colName) {
        var grid = this.GetTree(),
            data,
            result;
        var fieldAttribute = grid.data("fieldAttribute");
        if (typeof rowid === "number") {
            var id = [];
            id.push(rowid);
            rowid = id;
        }
        data = grid.hqGrid('getRowsByIndex', rowid, 'self');
        result = data[0].row[colName];
        if(typeof result !=="object"){
            var text = result;
            result = {};
            result.text = text;
        }
        if (fieldAttribute[colName] === "datetime" || fieldAttribute[colName] === "date") {
            result.text = result.value;
            result.value = result.value?$.hoteamDateTime.getTicksByDateTime(result.value, fieldAttribute[colName]):"";
        } else if (fieldAttribute[colName] === "time") {
            result.text = result.value;
            result.value = result.value ? $.hoteamDateTime.getTicksByDateTime("1970-01-01 " + result.value + ":00", "datetime") : "";
        }
        if (result.icons) {
            result.Icons = result.icons;
        }
        result.ColText = result.text;
        result.ColValue = result.value?result.value:result.text;
        result.Editable = result.editable?result.editable:false;

        return result;
    },
    //更新节点图片
    UpdateNodeImage: function (rowid, imgArr) {
        var grid = this.GetTree(),
            treeName = grid.data("treeName"),
            len = imgArr.length,
            icons = [];

        for (var i = 0; i < len; i++) {
            var src = imgArr[i].Icon.replace("~", PageInit.WebRootPath);
            var title = imgArr[i].Title;
            icons.push({
                src: src,
                title: title
            });
        }
        grid.hqGrid('update', rowid, { icons: icons }, treeName);
    },
    //设置单元格的value值和text值
    SetCellContent: function (rowid, colName, text, value) {
        var grid = this.GetTree();
        var data = {};
        data.text = text;
        data.value = value;
        grid.hqGrid('update', rowid, data, colName);
    },
    SetCellContentByObject: function (rowid, colName,object) {
        var grid = this.GetTree();
        grid.hqGrid('update', rowid, object, colName);
    },
    //获取子节点数据
    GetChildRows: function (rowid) {
        var grid = this.GetTree();
        if (typeof rowid === "number") {
            var id = [];
            id.push(rowid);
            rowid = id;
        }
        var data = grid.hqGrid('getRowsByIndex', rowid, 'children');
        data = data[0] || null;
        return $.hoteamBOMTreeGrid.judgeData(data, this, grid);
    },
    //通过行号来update此行数据
    UpdateDataByRowID: function (rowid) {
        var grid = this.GetTree();
        grid.hqGrid('update', rowid);
    },
    //保存编辑列表处在编辑状态的数据
    SaveGridRows: function () {
        var grid = this.GetTree(),
            flag = true,
            stateData = grid.hqGrid('save');
        if (stateData && stateData.invalidation.length > 0) {
            flag = false;
        }
        return { success:flag,rowsObject: ""};
    },
    //获取当前列表是否有校验未通过的数据
    GetRegexStatus: function () {
        var grid = this.GetTree(),
            flag=true,
            stateData = grid.hqGrid('save');
        if (stateData && stateData.invalidation.length>0) {
            flag = false;
        }
        return flag;
    },
    //保存处于编辑状态的数据
    SaveEditCell: function () {
        var grid = this.GetTree(),
            flag=true,
            stateData = grid.hqGrid('save');
        if (stateData && stateData.invalidation.length > 0) {
            flag = false;
        }
        return flag;
    },
    //设置选中行
    SetSelectedRow: function (rowNums) {
        var grid = this.GetTree();
        if (typeof rowNums === "number") {
            var id = [];
            id.push(rowNums);
            rowNums = id;
        }
        grid.hqGrid('selected',rowNums)
    },
    GotoRow:function(treeNodeId){
        var grid = this.GetTree();
        grid.hqGrid('gotoRow', treeNodeId);
    },
    //设置行文本颜色
    SetRowTextColor: function (rowid,color) {
        var grid = this.GetTree(),
            fieldAttribute = grid.data("fieldAttribute"),
            attribute = {}
        attribute.style = {};
        attribute.style.color = color;
        for (var i in fieldAttribute) {
            grid.hqGrid('update', rowid, attribute, i);
        } 
    },
    //获取id
    GetId: function () {
        return this.id + "_BomTreeGrid";
    },
    GetTree: function () {
        var id = this.GetId();
        var grid = $('#' + id);
        return grid;
    }
};

(function ($) {
    //var render = $.hqGrid._Render;

    //render.icon.valueTransform = function (item) {
    //    if (item && item.value) {
    //        return item.value.replace("~", PageInit.WebRootPath);
    //    }
    //    return item;
    //};

    //render.image = render.icon;
    //render.dropdown = render.select;


    $.hoteamBOMTreeGrid = {

        //将获取到的数据进行转化成兼容平台BOM功能模块的特定数据结构
        convertGridData: function (data, grid) {
            var rowData = $.hoteamBOMTreeGrid.convertObjectData(data.row, grid);
            rowData.row_number = data.index;
            rowData.selected = data.selected;
            return rowData;
        },
        //将平台BOM功能模块的特定数据结构转换成控件所需数据结构
        convertData: function (data) {
            var rowData = [];
            var len = data.length;
            for (var i = 0; i < len; i++) {
                rowData[i] = {};
                rowData[i].row = data[i];
                rowData[i].index = data[i].row_number;
                rowData[i].selected = data[i].selected;
            }
            return rowData;
        },
        //对象类型的数据取其value
        convertObjectData: function (data, grid) {
            var fieldAttribute = grid.data("fieldAttribute");
            data = $.extend(true, {}, data);
            for (var i in data) {
                if (typeof data[i] === "object") {
                    if (fieldAttribute[i] === "select") {
                        continue;
                    } else if (fieldAttribute[i] === "datetime" || fieldAttribute[i] === "date") {
                        data[i].text = data[i].value;
                        data[i].value = data[i].value?$.hoteamDateTime.getTicksByDateTime(data[i].value, fieldAttribute[i]):"";
                    } else if (fieldAttribute[i] === "time") {
                        data[i].text = data[i].value;
                        data[i].value = data[i].value ? $.hoteamDateTime.getTicksByDateTime("1970-01-01 " + data[i].value + ":00", "datetime") : "";
                    }else {
                        data[i] = data[i].value ? data[i].value : (data[i].text ? data[i].text : "");
                    } 
                } 
            }
            return data;
        },

        //判断data对象中row是否存在
        //如果存在调用转换方法convertGridData将data转换为平台BOM功能模块的特定数据结构
        //若不存在则同步获取数据(syncGetData)后再转换为平台BOM功能模块的特定数据结构
        judgeData: function (data, self, grid) {
            var len = data.length,
                result,
                indexLen,
                nodes = [],
                nodeName = [],
                index = [];
            for (var i = 0; i < len; i++) {
                if (data[i].row) {
                    data[i] = $.hoteamBOMTreeGrid.convertGridData(data[i], grid);
                } else {
                    nodes.push(data[i].node);
                    nodeName.push(data[i].nodeName)
                    index.push(i);
                }
            }
            if (nodes.length > 0) {
                result = $.hoteamBOMTreeGrid.syncGetData(nodes, self, grid);
                if (result) {
                    resultLen = result.length
                    for (var j = 0; j < resultLen; j++) {
                        data[index[j]].row = result[j];
                        data[index[j]].row[nodeName[j]] = data[index[j]].node;
                        data[index[j]] = $.hoteamBOMTreeGrid.convertGridData(data[index[j]], grid);
                    }
                }
            }
            return data;
        },
        //同步获取数据，同步请求会造成UI界面的锁死
        syncGetData: function (nodes, self, grid) {
            var result,
                len,
                ctrlEvent = {},
                opts = $("#" + self.id + "_BomTreeGrid").data("opt");
            ctrlEvent.o = self;
            ctrlEvent.opt = {};
            ctrlEvent.opt.query = nodes;
            result = grid.hqGrid('rowsTransform', window[opts.handlers.OnSyncLoadData](ctrlEvent));
            return result;
        },
        addFieldRegex: function (field) {
            if (field.regex && field.regexTitle) {
                field.validate = [{
                    validator: function (field,value,row) {
                      return  $.hoteamBOMTreeGrid.checkRegExp(field.regex,value);
                    },
                    message: function (field) {
                        return field.regexTitle.replace(/<\/br>/g, "\n");
                    }
                }];
            }
        },
        checkRegExp: function (regex, value, model) {
            //首先判断regex是否是多个AND拼接而成的，如果是，说明是多个正则
            var regexArr = regex.split('AND'),
                flag = true,
                text;

            for (var k = 0; k < regexArr.length; k++) {
                var reg = new RegExp($.trim(regexArr[k]));
                //text = $.trim(value.ColText || "");
                text = value;
                if (!reg.test(text)) {//没有验证通过
                    flag = false;
                    break;
                }
            }
            //对datetime时间控件特殊处理
            //if (text !== "" && flag && model && model.colType === "datetime" && model.readOnly === false) {
            //    flag = moment(text).isValid();
            //}

            return flag;
        } 
    }
})($);


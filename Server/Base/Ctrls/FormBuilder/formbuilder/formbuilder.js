/* global jQuery, window, console, _ */
(function ($, _, window) {

    /**
     * @alias jQuery
     * @namespace jQuery
     * @description jQuery
     */

    /**
     * @alias jQuery.formbuilder
     * @static
     * @description 全局静态对象
     * @memberof jQuery
     * @namespace jQuery.formbuilder
     * @type {object}
     *
     * @property {Config} config  全局默认配置
     * @property {object<string,ToolBox>} toolbox  全局基础元件配置项
     * @property {object<string,Language>}  language  全局多语言配置
     * @property {object<string,Property>}  proerty  全局属性元件配置项
     * @property {object<string,Contextmenu>} contextmenu  全局右键菜单配置项
     * @property {object<string,ToolBox>} toolbox  全局基础元件配置项
     */
    $.formbuilder = {
        config: {},
        toolbox: {},
        language: {},
        property: {},
        contextmenu: {},
        shortcutKey: {},
        menu: {},
        menucontrol: {},
        debugger: false,
        log: function (info, display) {
            if (this.debugger || display) {
                return window.console.log(info);
            }
        },
        PATTERN: {
            DESIGN: "design",
            APPLYING: "applying",
            VIEW: "view"
        },
        HORIZONTAL: "horizontal",
        VERTICAL: "vertical",
        ELEMTYPE: {
            CONTAINER: "container",
            ELEM: "elem"
        },
        DATATYPE: {
            ROWS: "rows",
            COLUMNS: "columns",
            CELLS: "cells",
            CONTROLS: "controls",
            TABLE: "table",
            COLUMN: "column",
            ROWSINDEX: "rowsIndex",
            COLUMNSINDEX: "columnsIndex",
            TABLEINDEX: "tableIndex"
        },
        DATASETUPDATETYPE: {
            RESET: "reset",
            REPLACE: "replace",
            INSERT: "insert",
            DELETE: "delete"
        },
        PAGING: {
            DISPLAY: "anchoring"
        },
        REGEX: {
            NUMBER: "^[0-9]*$",
            CHINESE: "^[\\u4e00-\\u9fa5]{0,}$",
            EMAIL: "^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$",
            INTERNETURL: "[a-zA-z]+://[^\\s]* 或 ^http://([\\w-]+\\.)+[\\w-]+(/[\\w-./?%&=]*)?$",
            PHONE: "^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$",
            DATE: "^\\d{4}-\\d{1,2}-\\d{1,2}",
        },
        "FONT-FAMILY": [
            {
                text: "微软雅黑",
                value: "微软雅黑"
            },
            {
                text: "黑体",
                value: "黑体"
            },
            {
                text: "新宋体",
                value: "新宋体"
            },
            {
                text: "仿宋",
                value: "仿宋"
            },
            {
                text: "楷体",
                value: "楷体"
            },
            {
                text: "华文楷体",
                value: "华文楷体"
            },
            {
                text: "华文宋体",
                value: "华文宋体"
            },
            {
                text: "华文宋体",
                value: "华文宋体"
            },
            {
                text: "方正舒体",
                value: "方正舒体"
            },
            {
                text: "方正姚体",
                value: "方正姚体"
            },
            {
                text: "华文隶书",
                value: "华文隶书"
            },
            {
                text: "华文行楷",
                value: "华文行楷"
            },
            {
                text: "华文新魏",
                value: "华文新魏"
            },
            {
                text: "Arial",
                value: "Arial"
            },
            {
                text: "Lucida",
                value: "Lucida"
            },
            {
                text: "Grande",
                value: "Grande"
            },
            {
                text: "Arial Black",
                value: "Arial Black"
            },
            {
                text: "Arial Narrow",
                value: "Arial Narrow"
            },
            {
                text: "Verdana",
                value: "Verdana"
            },
            {
                text: "Georgia",
                value: "Georgia"
            },
            {
                text: "Times New Roman",
                value: "Times New Roman"
            },
            {
                text: "Trebuchet MS",
                value: "Trebuchet MS"
            },
            {
                text: "Tahoma",
                value: "Tahoma"
            },
            {
                text: "Courier",
                value: "Courier"
            },
            {
                text: "Lucida Sans Unicode",
                value: "Lucida Sans Unicode"
            },
            {
                text: "Trebuchet MS",
                value: "Trebuchet MS"
            },
            {
                text: "Symbol",
                value: "Symbol"
            }
        ],
        "FONT-SIZE": [
            {
                text: 12,
                value: 12
            },
            {
                text: 14,
                value: 14
            },
            {
                text: 16,
                value: 16
            },
            {
                text: 18,
                value: 18
            },
            {
                text: 20,
                value: 20
            },
            {
                text: 22,
                value: 22
            },
            {
                text: 24,
                value: 24
            },
            {
                text: 26,
                value: 26
            },
            {
                text: 28,
                value: 28
            },
            {
                text: 36,
                value: 36
            },
            {
                text: 48,
                value: 48
            },
            {
                text: 72,
                value: 72
            }
        ],
        "BORDER-TABLE-STYLE": [
            {
                name: "border-table-solid",
                text: "border-solid",
                image: "border-solid.png"
            },
            {
                name: "border-table-none",
                text: "border-none",
                image: "border-none.png"
            },
            {
                name: "border-table-solid-heavy",
                text: "border-solid-heavy",
                image: "border-solid-heavy.png"
            }
        ],
        "BORDER-STYLE": [
            {
                name: "border-solid",
                text: "border-solid",
                image: "border-solid.png"
            },
            {
                name: "border-none",
                text: "border-none",
                image: "border-none.png"
            },
            {
                name: "border-solid-heavy",
                text: "border-solid-heavy",
                image: "border-solid-heavy.png"
            }
        ],
        "BORDER-POSITION": [
            {
                name: "all",
                text: "border-all",
                image: "border-all.png"
            },
            {
                name: "left",
                text: "border-left",
                image: "border-left.png"
            },
            {
                name: "right",
                text: "border-right",
                image: "border-right.png"
            },
            {
                name: "top",
                text: "border-top",
                image: "border-top.png"
            },
            {
                name: "bottom",
                text: "border-bottom",
                image: "border-bottom.png"
            }
        ],
        BORDERSTYLEITEMS: {
            "border-table-solid": "solid",
            "border-table-none": "none",
            "border-table-solid-heavy": "solid",
            "border-solid": "solid",
            "border-none": "none",
            "border-solid-heavy": "solid"
        },
        BORDERWIDTHITEMS: {
            "border-table-solid": "1px",
            "border-table-none": "1px",
            "border-table-solid-heavy": "2px",
            "border-solid": "1px",
            "border-none": "1px",
            "border-solid-heavy": "2px"
        },
        DESIGNBORDERSTYLEITEMS: {
            "border-table-solid": "solid",
            "border-table-none": "dashed",
            "border-table-solid-heavy": "solid",
            "border-solid": "solid",
            "border-none": "dashed",
            "border-solid-heavy": "solid"
        },
        DESIGNBORDERWIDTHITEMS: {
            "border-table-solid": "1px",
            "border-table-none": "1px",
            "border-table-solid-heavy": "2px",
            "border-solid": "1px",
            "border-none": "1px",
            "border-solid-heavy": "2px"
        },
        "OBLIQUELINE-STYLE": [
            {
                name: "obliqueline-none",
                text: "",
                image: "obliqueline-none.png"
            },
            {
                name: "obliqueline-left-one",
                text: "",
                image: "obliqueline-left-one.png"
            }
        ],
        "PRINT-SIZE": [
            {
                name: "print-none",
                text: "none",
                image: "print-none.png"
            },
            {
                name: "A3",
                text: "a3",
                image: "print-a3.png"
            },
            {
                name: "A4",
                text: "a4",
                image: "print-a4.png"
            }
        ],
        "PRINT-DIRECTION": [
            {
                name: "vertical",
                text: "print-direction-v",
                image: "print-direction-v.png"
            },
            {
                name: "horizontal",
                text: "print-direction-h",
                image: "print-direction-h.png"
            }
        ],
        "SYNMOVEPROPERTYS": {
            "cell": [],
            "control": ["cascade-control", "relation-position"]
        },
        getId: (function () {
            var i = 1,
                timestamp = new Date().getTime();
            return function () {
                return timestamp + "-" + i++;
            };
        })(),
        getTimestamp: function () {
            return new Date().getTime();
        },
        getZindex: (function () {
            var index = 1,
                cache = {
                    t: 0
                };

            return function (timestamp) {
                var i;

                timestamp = timestamp || "t";
                if (cache.hasOwnProperty(timestamp || "t")) {
                    return cache[timestamp];
                } else {
                    if (!timestamp) {
                        timestamp = timestamp || "t";
                        i = 0;
                    } else {
                        i = index++;
                    }

                    cache[timestamp] = i;
                }

                return i;
            };
        })(),
        getValue: function (value) {
            if (_.isObject(value)) {
                return value.value;
            } else {
                return value;
            }
        },
        /**
         * @alias getImage
         * @static
         * @memberof jQuery.formbuilder
         * @description 全局多语言配置
         * @function
         * @param {string} path - 默认路径
         * @param {string} name - 图片名称或路径
         * @return {string} - 图片地址
         */
        getImage: function (path, name) {
            var result;
            if (name.indexOf("/") === -1) {
                result = path + name;
            } else {
                result = name;
            }
            return result;
        },
        getPosition: function ($elem) {
            var p = JSON.parse($elem.attr("data-position")) || [null, null];
            return {
                x: p[0],
                y: p[1]
            };
        },
        setPosition: function (x, y, $elem) {
            if ($elem) {
                $elem.attr("data-position", ["[", x, ",", y, "]"].join(""));
            }
        },
        formatPositionToObject: function (position) {
            if (position && typeof position === "string") {
                position = position.split(":");
                return { x: Number(position[0]), y: Number(position[1]) };
            }
            return position;
        },
        formatPositionToString: function (position) {
            if (position && typeof position !== "string") {
                return position.x + ":" + position.y;
            }
            return position;
        },
        formatMovePosition: function (position, move) {
            var p = this.formatPositionToObject(position);
            p.x = p.x + move.x;
            p.y = p.y + move.y;

            p = this.formatPositionToString(p);

            return p;
        },
        updateProperty: function (pattern, name, element, data, properties) {
            var value,
                property,
                beforeUpdate,
                afterUpdate,
                update,
                position,
                names,
                afterChecking,
                self = this,
                checked = true;

            if (!name) {
                return;
            }

            value = data[name];
            property = properties[name];
            update = property[pattern + "Update"] || property.update;
            beforeUpdate = property["before" + _.upperFirst(pattern) + "Update"] || property.beforeUpdate;
            afterUpdate = property["after" + _.upperFirst(pattern) + "Update"] || property.afterUpdate;
            afterChecking = property.afterChecking;

            if (typeof update !== "function") {
                return;
            }

            position = { x: data.x, y: data.y };
            if (!property.excludePattern || property.excludePattern.indexOf(pattern) === -1) {
                if (typeof property.conver === "function") {
                    value = property.conver.call(element, value, position, data);
                }

                if (typeof beforeUpdate === "function") {
                    beforeUpdate.call(element, value, position, data);
                }
                update.call(element, value, position, data);
                if (typeof afterUpdate === "function") {
                    afterUpdate.call(element, value, position, data);
                }

                if (typeof afterChecking === "function") {
                    checked = afterChecking.call(element, value, position, data);
                }

                //属性更新后其他需要更新的相关属性
                if (property.after && checked) {
                    names = property.after;
                    if (!_.isArray(names)) {
                        names = [names];
                    }
                    _.each(names, function (name) {
                        self.updateProperty(pattern, name, element, data, properties);
                    });
                }
            }
        },
        updateValue: function (control, data, name, value, properties, timestamp, zIndex) {
            var property = properties[name],
                i = data[name];

            if (typeof property.conver === "function") {
                value = property.conver.call(control, value, { x: data.x, y: data.y }, data);
            }
            if (property.timestamp) {
                if (value === "" || value === null || value === undefined) {
                    timestamp = "t";
                }
                i = {
                    value: value,
                    timestamp: timestamp,
                    zIndex: zIndex || this.getZindex(timestamp)
                };
            } else {
                i = value;
            }

            data[name] = i;
        },
        updateProperties: function (pattern, control, data, names, values, properties, timestamp) {
            var i, len, name, value, property;

            if (!(names instanceof Array)) {
                names = [names];
            }

            for (i = 0, len = names.length; i < len; i++) {
                name = names[i];
                value = values instanceof Array && typeof values[i] !== undefined ? values[i] : values;

                property = properties ? properties[name] : null;
                if (!property) {
                    return;
                }

                if (timestamp !== "timestamp-refresh") {
                    //传值为undefined时执行刷新
                    if (value === undefined) {
                        value = data[name];
                    }
                    if (data.hasOwnProperty(name) || properties.hasOwnProperty(name)) {
                        this.updateValue(control, data, name, value, properties, timestamp);
                    }
                }
                this.updateProperty(pattern, name, control, data, properties);
            }
        },
        updatePropertiesBySelected: function (pattern, grid, selected, names, values, timestamp) {
            var type, field, position, control, data, property;

            if (!selected || !selected.length) {
                return;
            }

            type = selected.attr("data-type");
            field = selected.attr("data-property-field");
            position = grid.getPosition(selected);
            control = grid.getPropertyControl(type, position);
            data = grid.getPropertyData(type, field, position);
            property = grid.getPropertyItems(type, field, position);

            this.updateProperties(pattern, control, data, names, values, property, timestamp);
        },
        updatePropertiesBySelecteds: function (pattern, grid, names, values, elems, timestamp) {
            var _this = this;
            timestamp = timestamp || this.getTimestamp();

            _.forEach(elems, function (elem) {
                _this.updatePropertiesBySelected(pattern, grid, $(elem), names, values, timestamp);
            });
        },
        updatePropertiesByOptions: function (pattern, grid, names, options, elems) {
            var _this = this;
            if (typeof options === "undefined") {
                return;
            }
            _.forEach(names, function (name) {
                var value = options[name],
                    _value = value,
                    timestamp;

                if (value && value.hasOwnProperty("timestamp")) {
                    _value = value.value;
                    timestamp = value.timestamp;
                }

                _this.updatePropertiesBySelecteds(pattern, grid, name, _value, elems, timestamp);
            });
        },
        refreshPropertiesBySelecteds: function (pattern, grid, names, elems) {
            var _this = this,
                values,
                timestamp = timestamp || this.getTimestamp();

            _.forEach(elems, function (elem) {
                _this.updatePropertiesBySelected(pattern, grid, $(elem), names, values, "timestamp-refresh");
            });
        },
        isTwoDimensionalArray: function (collect) {
            return _.isArray(collect) && _.isArray(collect[0]);
        },
        findObj: function (collect, x, y) {
            var result = null;

            if (this.isTwoDimensionalArray(collect)) {
                if (_.isNumber(x) && _.isNumber(y)) {
                    --x;
                    --y;
                    result = collect[x] ? collect[x][y] : null;
                } else if (_.isNumber(x)) {
                    result = collect[--x];
                } else if (_.isNumber(y)) {
                    result = [];
                    --y;
                    if (collect[0].length < y) {
                        result = null;
                    } else {
                        _.each(collect, function (items) {
                            result.push(items[y]);
                        });
                    }
                }
            } else {
                result = collect[_.isNumber(x) && x !== -1 ? x - 1 : y - 1];
            }

            return result;
        },
        updateSignObj: function (collect, x, y, newObj) {
            var oldObj, n;
            if (this.isTwoDimensionalArray(collect)) {
                --x;
                --y;
                if (!collect[x]) {
                    collect[x] = [];
                }
                oldObj = collect[x][y];
                collect[x][y] = newObj;
            } else {
                n = x === -1 ? --y : --x;
                oldObj = collect[n];
                collect[n] = newObj;
            }

            return newObj || oldObj;
        },
        pushSingleObj: function (collect, obj) {
            var _obj = obj.options || obj,
                x = _obj.x,
                y = _obj.y;

            return this.updateSignObj(collect, x, y, obj.options || obj);
        },
        pushMultiObj: function (collect, objs) {
            var self = this;
            _.each(objs, function (obj) {
                self.pushSingleObj(collect, obj);
            });
        },
        pullSingObj: function (collect, obj) {
            var _obj = obj.options || obj,
                x = _obj.x,
                y = _obj.y;

            return this.updateSignObj(collect, x, y, {});
        },
        updateObjAttribute: function (collect, x, y, attributes) {
            var obj = this.findObj(collect, x, y),
                _obj = obj;

            if (!_obj) {
                this.log("can't find obj" + "{" + x + "," + y + "} in updateobjattribute");
                return;
            }
            _obj = obj.options || obj;
            _.each(attributes, function (value, key) {
                _obj[key] = value;
            });

            return obj;
        },
        removeObj: function (collect, x, y) {
            var index, obj;
            index = _.findIndex(collect, function (obj) {
                return obj.x === x && obj.y === y;
            });
            obj = _(collect)
                .pullAt(index)
                .head();

            return obj;
        },
        insertRowObjs: function (collect, x, offsetX, y1, y2, defaultObjs) {
            var DATATYPE = this.DATATYPE,
                range,
                self = this,
                table = collect[DATATYPE.TABLE],
                rows = collect[DATATYPE.ROWS],
                cells = collect[DATATYPE.CELLS],
                controls = collect[DATATYPE.CONTROLS],
                length;

            length = table[DATATYPE.ROWS];
            range = _.rangeRight(x, length + 1);
            //倒序移动
            this.moveRowObjs(collect, x, offsetX, range);
            //加入新增的行
            _.each(_.range(x, x + offsetX), function (x1) {
                var obj;
                obj = $.extend({}, defaultObjs.row, { x: x1 });
                self.updateSignObj(rows, x1, -1, obj);
                _.each(_.range(1, table[DATATYPE.COLUMNS] + 1), function (y1) {
                    obj = $.extend({}, defaultObjs.cell, { x: x1, y: y1 });
                    self.updateSignObj(cells, x1, y1, obj);
                    self.updateSignObj(controls, x1, y1, { x: x1, y: y1 });
                });
            });

            table[DATATYPE.ROWS] += offsetX;
        },
        removeRowObjs: function (collect, x, offsetX, y1, y2, defaultObjs) {
            var DATATYPE = this.DATATYPE,
                range,
                table = collect[DATATYPE.TABLE],
                length;

            length = table[DATATYPE.ROWS];
            range = _.range(x, length + 1);
            this.moveRowObjs(collect, x, -offsetX, range);

            table[DATATYPE.ROWS] -= offsetX;
        },
        moveRowObjs: function (collect, x, offsetX, range) {
            var DATATYPE = this.DATATYPE,
                self = this,
                rows = collect[DATATYPE.ROWS],
                cells = collect[DATATYPE.CELLS],
                controls = collect[DATATYPE.CONTROLS],
                length = rows.length,
                count = Math.abs(offsetX);

            _.each(range, function (x1) {
                var row;
                row = self.findObj(rows, x1, -1);
                row.x = x1 + offsetX;
                self.updateSignObj(rows, x1, -1, null);
                self.updateSignObj(rows, x1 + offsetX, -1, row);

                _.each(cells[x1 - 1], function (cell, y) {
                    ++y;
                    //调整单元格位置
                    cell.x = x1 + offsetX;
                    //调整合并单元格指向位置
                    if (cell.x1 && cell.x1 >= x) {
                        cell.x1 = cell.x1 + offsetX;
                    }
                    self.updateSignObj(cells, x1 + offsetX, y, cell);
                    self.updateSignObj(cells, x1, y, null);
                });

                _.each(controls[x1 - 1], function (control, y) {
                    var obj;
                    ++y;
                    obj = control.options || control;
                    obj.x = x1 + offsetX;

                    self.synMoveProperties(obj, { x: offsetX, y: 0 }, "control");
                    self.updateSignObj(controls, x1 + offsetX, y, control);
                    self.updateSignObj(controls, x1, y, { x: x1, y: y });
                });
            });

            if (offsetX < 0) {
                rows.splice(length - count, count);
                cells.splice(length - count, count);
                controls.splice(length - count, count);
            }
        },
        insertColumnObjs: function (collect, y, offsetY, x1, x2, defaultObjs) {
            var DATATYPE = this.DATATYPE,
                self = this,
                table = collect[DATATYPE.TABLE],
                columns = collect[DATATYPE.COLUMNS],
                cells = collect[DATATYPE.CELLS],
                controls = collect[DATATYPE.CONTROLS],
                length = table[DATATYPE.COLUMNS],
                rowRange = _.range(1, table[DATATYPE.ROWS] + 1),
                columnRange = _.rangeRight(y, length + 1);

            //倒序移动
            this.moveColumnObjs(collect, y, offsetY, rowRange, columnRange);
            //加入新增的列
            _.each(_.range(y, y + offsetY), function (y1) {
                var obj;
                obj = $.extend({}, defaultObjs.column, { y: y1 });
                self.updateSignObj(columns, -1, y1, obj);
                _.each(rowRange, function (x1) {
                    var obj;
                    obj = $.extend({}, defaultObjs.cell, { x: x1, y: y1 });
                    self.updateSignObj(cells, x1, y1, obj);
                    self.updateSignObj(controls, x1, y1, { x: x1, y: y1 });
                });
            });

            table[DATATYPE.COLUMNS] += offsetY;
        },
        removeColumnObjs: function (collect, y, offsetY, x1, x2) {
            var DATATYPE = this.DATATYPE,
                table = collect[DATATYPE.TABLE],
                length = table[DATATYPE.COLUMNS],
                rowRange = _.range(1, table[DATATYPE.ROWS] + 1),
                columnRange = _.range(y, length + 1);

            this.moveColumnObjs(collect, y, -offsetY, rowRange, columnRange);
            table[DATATYPE.COLUMNS] -= offsetY;
        },
        moveColumnObjs: function (collect, y, offsetY, rowRange, columnRange) {
            var DATATYPE = this.DATATYPE,
                self = this,
                columns = collect[DATATYPE.COLUMNS],
                cells = collect[DATATYPE.CELLS],
                controls = collect[DATATYPE.CONTROLS],
                count = Math.abs(offsetY),
                length = columns.length;

            _.each(columnRange, function (y1) {
                var column;
                column = self.findObj(columns, -1, y1);
                column.x = y1 + offsetY;
                self.updateSignObj(columns, -1, y1, null);
                self.updateSignObj(columns, -1, y1 + offsetY, column);

                _.each(rowRange, function (x1) {
                    var cell, y2, control, obj;

                    y2 = y1 + offsetY;
                    //单元格数据
                    cell = self.findObj(cells, x1, y1);
                    cell.y = y2;
                    //调整合并单元格指向位置
                    if (cell.y1 && cell.y1 >= y) {
                        cell.y1 = cell.y1 + offsetY;
                    }
                    self.updateSignObj(cells, x1, y2, cell);
                    self.updateSignObj(cells, x1, y1, null);
                    //控件数据
                    control = self.findObj(controls, x1, y1);
                    obj = control.options || control;
                    obj.y = y2;
                    self.synMoveProperties(obj, { x: 0, y: offsetY }, "control");
                    self.updateSignObj(controls, x1, y2, control);
                    self.updateSignObj(controls, x1, y1, { x: x1, y: y1 });
                });
            });

            if (offsetY < 0) {
                columns.splice(length - count, count);
                _.each(cells, function (row) {
                    row.splice(length - count, count);
                });
                _.each(controls, function (row) {
                    row.splice(length - count, count);
                });
            }
        },
        makeTwoDimensionalArray: function (collect, x, y, defaultObj) {
            var result = [],
                self = this;

            if (this.isTwoDimensionalArray(collect)) {
                //二维数组间的数据初始化工作，一般在编辑中改变行、列个数时使用
                result = _.take(collect, x);
                _.each(_.range(0, x), function (x1) {
                    var items = _.take(result[x1] || [], y);
                    result[x1] = items;
                    _.each(_.range(0, y), function (y1) {
                        items[y1] = $.extend({}, defaultObj, items[y1], { x: x1 + 1, y: y1 + 1 });
                    });
                });
            } else {
                //将数据转换为二维数组，一般在首次加载数据初始化时使
                _.each(_.range(0, x), function (x) {
                    var items = [],
                        x1,
                        y1;
                    result[x] = items;
                    _.each(_.range(0, y), function (y) {
                        var obj;
                        x1 = x + 1;
                        y1 = y + 1;
                        obj = self.removeObj(collect, x1, y1);
                        items[y] = $.extend({}, defaultObj, obj, { x: x1, y: y1 });
                    });
                });
            }

            return result;
        },
        makeOneDimensionalArray: function (collect, x, y, defaultObj) {
            var result = [],
                self = this;

            _.each(_.range(0, x === -1 ? y : x), function (n) {
                var x1, y1, obj;

                if (x === -1) {
                    x1 = -1;
                    y1 = n + 1;
                } else if (y === -1) {
                    x1 = n + 1;
                    y1 = -1;
                }
                obj = self.removeObj(collect, x1, y1);
                result[n] = $.extend({}, defaultObj, obj, { x: x1, y: y1 });
            });

            return result;
        },
        getMax: function (n1, n2) {
            return Math.max(n1, n2);
        },
        getMaxPoint: function (collect) {
            var x = -1,
                y = -1,
                getMax = function (x1, x2) {
                    return x1 > x2 ? x1 : x2;
                };

            _.each(collect, function (items) {
                if (_.isArray(items)) {
                    _.each(items, function (obj) {
                        x = getMax(x, obj.x);
                        y = getMax(y, obj.y);
                    });
                } else {
                    x = getMax(x, items.x);
                    y = getMax(y, items.y);
                }
            });

            return {
                x: x,
                y: y
            };
        },
        makeElementTwoDimensionalArray: function ($table, filters) {
            var result = {
                table: $table,
                rows: [],
                columns: [],
                cells: [[]],
                controls: [],
                rowsIndex: [],
                columnsIndex: [],
                tableIndex: null
            },
                self = this;

            this.addTableIndexElement(result, $table.find(filters.tableIndex));
            $table.find(filters.rowIndex).each(function (x) {
                ++x;
                self.addRowIndexElement(x, result, $(this));
            });
            $table.find(filters.columnIndex).each(function (y) {
                ++y;
                self.addColumnIndexElement(y, result, $(this));
            });
            $table.find(filters.row).each(function (x) {
                ++x;
                var $row = $(this);
                self.addRowElement(x, result, $row);
                $row.find(filters.column).each(function (y) {
                    ++y;
                    self.addCellElement(x, y, result, $(this));
                });
            });

            return result;
        },
        updateSignElement: function (collect, x, y, newElement) {
            var oldElement, n;
            if (this.isTwoDimensionalArray(collect)) {
                --x;
                --y;
                if (!collect[x]) {
                    collect[x] = [];
                }
                oldElement = collect[x][y];
                collect[x][y] = newElement;
            } else {
                n = x === -1 ? y : x;
                --n;
                oldElement = collect[n];
                collect[n] = newElement;
            }

            return newElement || oldElement;
        },
        addCellElement: function (x, y, elements, $elem) {
            this.updateSignElement(elements[this.DATATYPE.CELLS], x, y, $elem);
        },
        addRowElement: function (x, elements, $elem) {
            this.updateSignElement(elements[this.DATATYPE.ROWS], x, -1, $elem);
        },
        addColumnElement: function (y, elements, $elem) {
            this.updateSignElement(elements[this.DATATYPE.COLUMNSINDEX], -1, y, $elem);
        },
        addTableIndexElement: function (elements, $elem) {
            elements[this.DATATYPE.TABLEINDEX] = $elem;
        },
        addRowIndexElement: function (x, elements, $elem) {
            this.updateSignElement(elements[this.DATATYPE.ROWSINDEX], x, -1, $elem);
        },
        addColumnIndexElement: function (y, elements, $elem) {
            this.updateSignElement(elements[this.DATATYPE.COLUMNSINDEX], -1, y, $elem);
        },
        findElements: function (x, y, elements, type) {
            var elems = elements[type];
            return this.findObj(elems, x, y);
        },
        findCellElement: function (x, y, elements) {
            return this.findElements(x, y, elements, this.DATATYPE.CELLS);
        },
        findRowCellElements: function (x, elements) {
            return this.findElements(x, null, elements, this.DATATYPE.CELLS);
        },
        findColumnCellElements: function (y, elements) {
            return this.findElements(null, y, elements, this.DATATYPE.CELLS);
        },
        findRowControlElements: function (x, collect, type) {
            var items;

            type = type || this.ELEMTYPE.CONTAINER;
            items = this.findObj(collect[this.DATATYPE.CONTROLS], x, null);
            items = _.map(items, function (item) {
                return item ? item[type] : null;
            });
            return items;
        },
        findColumnControlElements: function (y, elements) {
            return this.findElements(null, y, elements, this.DATATYPE.CONTROLS);
        },
        findControlElement: function (x, y, collect, type) {
            var item;
            type = type || this.ELEMTYPE.CONTAINER;
            item = this.findObj(collect[this.DATATYPE.CONTROLS], x, y);
            return item[type];
        },
        findRowIndexElement: function (x, elements) {
            return this.findElements(x, -1, elements, this.DATATYPE.ROWSINDEX);
        },
        findColumnIndexElement: function (y, elements) {
            return this.findElements(-1, y, elements, this.DATATYPE.COLUMNSINDEX);
        },
        findRowElement: function (x, elements) {
            return this.findElements(x, null, elements, this.DATATYPE.ROWS);
        },
        removeCellElement: function (x, y, elements) {
            var $elem = this.updateSignElement(elements[this.DATATYPE.CELLS], x, y, undefined);
            if ($elem && $elem.length > 0) {
                return $elem.remove();
            }
        },
        insertRowElements: function (elements, filters, $rows, x, y1, y2) {
            var $elems = _.isArray($rows) ? $rows : [$rows],
                offsetX = $elems.length,
                self = this,
                length,
                range,
                x1 = x;

            length = elements[this.DATATYPE.ROWS].length;
            range = _.rangeRight(x, length + 1);
            //倒序移动
            this.moveRowElements(elements, offsetX, range);
            //加入新增的行
            _.each($elems, function ($row, i) {
                var x = x1 + i;
                self.addRowIndexElement(x, elements, $row.find(filters.rowIndex));
                self.addRowElement(x, elements, $row);
                $row.find(filters.column).each(function (y) {
                    ++y;
                    self.addCellElement(x, y, elements, $(this));
                });
            });
        },
        removeRowElements: function (elements, count, x, y1, y2) {
            var offsetX = -count,
                length,
                range;

            length = elements[this.DATATYPE.ROWS].length;
            range = _.range(x, length + 1);
            this.moveRowElements(elements, offsetX, range);
        },
        moveRowElements: function (elements, offsetX, range) {
            var self = this,
                indexes = elements.rowsIndex,
                rows = elements.rows,
                length = indexes.length,
                count = Math.abs(offsetX),
                cells = elements[this.DATATYPE.CELLS];

            _.each(range, function (x1) {
                var $elem, $elems;

                $elem = self.findRowElement(x1, elements);
                self.addRowElement(x1, elements, null);
                self.addRowElement(x1 + offsetX, elements, $elem);

                $elem = self.findRowIndexElement(x1, elements);
                self.addRowIndexElement(x1, elements, null);
                self.addRowIndexElement(x1 + offsetX, elements, $elem);

                $elems = self.findRowCellElements(x1, elements);
                _.each($elems, function ($elem, y) {
                    y = y + 1;
                    self.addCellElement(x1 + offsetX, y, elements, $elem);
                    self.addCellElement(x1, y, elements, null);
                });
            });

            //向前移动删除多余的行
            if (offsetX < 0) {
                indexes.splice(length - count, count);
                cells.splice(length - count, count);
                rows.splice(length - count, count);
            }

        },
        insertColumnElements: function (elements, filters, $columns, y, x1, x2) {
            var $elems = $columns,
                rows = $elems[0].length - 1,
                offsetY = $elems.length,
                length = (elements[this.DATATYPE.CELLS][0] || []).length,
                self = this,
                rowRange = _.range(1, rows + 1),
                columnRange = _.rangeRight(y, length + 1);
            //倒序移动
            this.moveColumnElements(elements, offsetY, rowRange, columnRange);
            //加入新增的列
            _.each(_.range(y, y + offsetY), function (y1) {
                var y2 = y1 - y,
                    $cells = $elems[y2];

                self.addColumnIndexElement(y1, elements, $cells[0]);
                _.each(rowRange, function (x1) {
                    self.addCellElement(x1, y1, elements, $cells[x1]);
                });
            });
        },
        removeColumnElements: function (elements, count, y, x1, x2) {
            var offsetY = -count,
                rows = elements[this.DATATYPE.ROWS].length,
                length = (elements[this.DATATYPE.CELLS][0] || []).length,
                rowRange = _.range(1, rows + 1),
                columnRange = _.range(y, length + 1);

            this.moveColumnElements(elements, offsetY, rowRange, columnRange);
        },
        moveColumnElements: function (elements, offsetY, rowRange, columnRange) {
            var self = this,
                indexes = elements.columnsIndex,
                length = indexes.length,
                count = Math.abs(offsetY),
                row;

            _.each(columnRange, function (y1) {
                var $elem;
                $elem = self.findColumnIndexElement(y1, elements);
                self.addColumnIndexElement(y1 + offsetY, elements, $elem);
                self.addColumnIndexElement(y1, elements, undefined);
            });
            if (offsetY < 0) {
                indexes.splice(length - count, count);
            }

            _.each(rowRange, function (x1) {
                row = self.findRowCellElements(x1, elements);
                _.each(columnRange, function (y1) {
                    var $elem;
                    $elem = self.findCellElement(x1, y1, elements);
                    self.addCellElement(x1, y1 + offsetY, elements, $elem);
                    self.addCellElement(x1, y1, elements, undefined);
                });
                if (offsetY < 0) {
                    row.splice(length - count, count);
                }
            });
        },
        getSortMapByOrder: function (collect) {
            return _(collect)
                .chain()
                .map(function (o, i) {
                    o.key = i;
                    return o;
                })
                .orderBy("order")
                .value();
        },
        getDatasetTemplate: function (data, isLoad) {
            var _this = this,
                datasetArray,
                dataset = {},
                controls = data.controls,
                ids = [],
                items;

            //映射数据
            controls = _(controls)
                .flatten()
                .compact()
                .map(function (obj) {
                    return $.extend(true, {}, obj.options || obj);
                })
                .value();

            //获取数据集标识对象
            items = _(controls)
                .map(function (obj) {
                    if (obj["extension-direction"] && !obj["relation-position"]) {
                        return obj;
                    }
                })
                .compact()
                .value();

            //映射数据集
            datasetArray = _(items)
                .map(function (item, i) {
                    var next = item,
                        result = [];

                    while (next) {
                        //记录全部的数据集类型元件id
                        ids.push(next.id);
                        result.push(next);
                        //推算数据集关联元件：兄弟关系
                        next = _(controls)
                            .filter(function (obj) {
                                var p, x, y;
                                //通过 x:y 坐标描述获取下一个关联的元件数据
                                p = _this.formatPositionToObject(obj["relation-position"]);
                                if (p) {
                                    x = p.x;
                                    y = p.y;
                                    if (x == next.x && y == next.y) {
                                        return true;
                                    }
                                }
                            })
                            .head();
                    }
                    return result;
                })
                .value();

            //移除模版元件
            if (isLoad) {
                _.each(ids, function (id) {
                    _.pullAllBy(data.controls, [{ id: id }], "id");
                });
            }

            //转换数据格式 id:[{元件数据},{元件数据}...]
            _.each(datasetArray, function (items) {
                dataset[items[0].id] = items;
            });

            return dataset;
        },
        getDatasetCellTemplate: function (template, data, defaultObj) {
            var _template = template;

            template = {};
            _.each(_template, function (items, key) {
                template[key] = [];
                _.each(items, function (item) {
                    var p = { "x": item.x, "y": item.y },
                        obj = $.extend(true, {}, defaultObj, _.find(data.cells, p), p);
                    template[key].push(obj);
                });
            });

            return template;
        },
        formatDatasetsPage: function (pages, index, template) {
            var page = pages.datasets[index - 1] || {};

            _.each(template, function (value, id) {
                if (!page[id]) {
                    page[id] = {
                        id: id,
                        rows: 1
                    };
                }
            });
            pages.datasets[index - 1] = page;
            return page;
        },
        updateTableRows: function (template, newDatasets, data) {
            var rows = _.orderBy(data.rows, ["x"]),
                items = {};

            //获取数据集插入行相关信息
            _.each(newDatasets, function (dataset, id) {
                if (dataset && dataset.length > 1) {
                    var x,
                        row = dataset[0],
                        obj = row[0],
                        datasetId;

                    if (obj["extension-direction"] === $.formbuilder.VERTICAL) {
                        datasetId = obj["dataset-block"];
                        x = template[datasetId][0].x;
                        row = _.find(rows, { x: x });
                        if (row) {
                            //row.x = obj.x;
                            items[id] = {
                                id: datasetId,
                                row: row,
                                //x: obj.x,
                                x: x,
                                count: dataset.length
                            };
                        }
                    }
                }
            });

            //设置插入行格式
            _(items)
                .chain()
                .orderBy(["x"], ["desc"])
                .each(function (item) {
                    var x = item.x,
                        index = _.findIndex(rows, { x: x }),
                        length = rows.length,
                        offsetX = item.count - 1,
                        row;

                    if (index === -1) {
                        $.formbuilder.log("not find row obj", true);
                        return;
                    }

                    _.each(_.range(index + 1, length), function (i) {
                        row = rows[i];
                        row.x = row.x + offsetX;
                    });

                    _.each(_.rangeRight(1, item.count), function (i) {
                        var obj = $.extend(true, {}, item.row, { x: item.row.x + i });
                        rows.splice(index + 1, 0, obj);
                    });
                }).value();

            data.rows = rows;
        },
        formatTable: function (data) {
            //遍历元件的位置重新计算行列
            var max = this.getMaxPoint(data.controls);
            data.table.rows = Math.max(data.table.rows, max.x);
            data.table.columns = Math.max(data.table.columns, max.y);
        },
        synMoveProperties: function (obj, move, type) {
            var _this = this;
            _.each(_this.SYNMOVEPROPERTYS[type], function (key) {
                var p = obj[key];
                if (p) {
                    obj[key] = _this.formatMovePosition(p, move);
                }
            });
        },
        changePosition: function (type, count, p1, p2, obj, objType) {
            var _obj = obj.options || obj,
                x = 0,
                y = 0;
            //垂直扩展，大于填充行索引的控件全部位移
            if (type === this.VERTICAL && _obj.x >= p1.x) {
                x = count;
            } else if (type === this.HORIZONTAL && _obj.y >= p1.y && _obj.x >= p1.x && _obj.x <= p2.x) {
                y = count;
            }
            _obj.x = _obj.x + x;
            _obj.y = _obj.y + y;
            if (objType) {
                this.synMoveProperties(_obj, { x: x, y: y }, objType);
            }
        },
        changeDatasetTemplatePosition: function (type, moveInfo, template) {
            var _this = this;
            _.each(template, function (items, key) {
                if (key === moveInfo.datasetId) {
                    return;
                }
                _.each(items, function (obj) {
                    _this.changePosition(type, moveInfo.count, moveInfo.p1, moveInfo.p2, obj);
                });
            });
        },
        getDatasetMoveInfo: function (data, index, type) {
            var p1,
                p2,
                count = 0,
                columns = data[0].length,
                o1 = data[0][0],
                o2 = data[0][columns - 1];

            //获取起始插入值坐标范围
            p1 = { x: o1.x, y: o1.y };
            p2 = { x: o2.x, y: o2.y };

            if (type === "insert") {
                count = data.length;
            }
            else if (type === "remove") {
                count = -data.length;
            }
            else if (index === 1) {
                count = data.length - 1;
            }


            //返回起始的坐标和位移量
            return {
                p1: p1,
                p2: p2,
                count: count,
                datasetId: o1["dataset-block"]
            };
        },
        getDatasetInfoById: function (id, template) {
            var dataset, x, y, type, head;

            dataset = template[id];
            head = dataset[0];
            x = head.x;
            y = head.y;
            type = head["extension-direction"];

            return {
                id: id,
                type: type,
                x: x,
                y: y,
                length: dataset.length
            };
        },
        getDatasetRows: function (id, rows, type, position, index, template) {
            var _this = this,
                count,
                data = [],
                isNumber;

            if (!rows) {
                return null;
            }

            index = index || 1;
            if (rows instanceof Array && rows.length === 0) {
                rows = 1;
            }
            isNumber = _.isNumber(rows);
            count = isNumber ? rows : rows.length;

            template = template[id];
            _.each(_.range(0, count), function (i) {
                data[i] = [];
                _.each(template, function (obj, j) {
                    var control,
                        options;

                    control = isNumber ? {} : rows[i][j];
                    options = $.extend(true, {}, obj, {
                        "dataset-block": id
                    }, control);
                    if (!(i === 0 && j === 0 && index === 1)) {
                        options.id = _this.getId();
                    }
                    if (type === _this.VERTICAL) {
                        //纵向扩展
                        options.x = position.x + i + (index - 1);
                    } else {
                        //横向扩展
                        options.y = position.y + i + (index - 1);
                    }
                    data[i].push(options);
                });
            });

            return data;
        },
        changeInfoByDataset: function (type, dataset, index, data, cellTemplate, datasetTemplate) {
            var controls = data.controls,
                cells = data.cells,
                _this = this,
                moveInfo;

            index = index || 1;

            moveInfo = this.getDatasetMoveInfo(dataset, index);
            //调整单元格位置
            _.each(cells, function (obj, i, array) {
                _this.changePosition(type, moveInfo.count, moveInfo.p1, moveInfo.p2, obj, "cell");
            });
            //调整元件位置
            _.each(controls, function (obj) {
                _this.changePosition(type, moveInfo.count, moveInfo.p1, moveInfo.p2, obj, "control");
            });
            //调整数据集模版开始位置
            this.changeDatasetTemplatePosition(type, moveInfo, datasetTemplate);

            _(dataset)
                .each(function (items) {
                    _.each(items, function (obj, i) {
                        var cell;
                        //复制模版信息,例如：colspan,rowspan
                        if (obj["dataset-block"]) {
                            cell = cellTemplate[obj["dataset-block"]];
                            if (type === _this.VERTICAL) {
                                cells.push($.extend(true, {}, cell[i], { x: obj.x, y: obj.y }));
                            }
                        }
                    });
                });

            //新增数据集元件
            _(dataset)
                .flatten()
                .each(function (obj) {
                    controls.push(obj);
                });
        },
        updateDatasetById: function (id, rows, index, data, datasetCellTemplate, datasetTemplate) {
            var dataset = [],
                info;

            if (!rows) {
                return;
            }

            info = this.getDatasetInfoById(id, datasetTemplate);
            dataset = this.getDatasetRows(id, rows, info.type, { x: info.x, y: info.y }, index, datasetTemplate);

            if (!dataset || dataset.length === 0) {
                return;
            }

            this.changeInfoByDataset(info.type, dataset, index, data, datasetCellTemplate, datasetTemplate);
            return dataset;
        },
        updateDatasets: function (rows, data, template, cellTemplate) {
            var _this = this,
                newDatasets = {};

            if (!rows) {
                return {};
            }

            _.each(rows, function (obj) {
                if (template.hasOwnProperty(obj.id)) {
                    newDatasets[obj.id] = _this.updateDatasetById(obj.id, obj.rows, 1, data, cellTemplate, template);
                }
            });

            this.formatTable(data);

            return newDatasets;
        },
        initDatasets: function (data) {
            var datasetPage = [],
                max = 0;

            _.each(data, function (item) {
                var rows = item.rows;

                if (_.isNumber(rows)) {
                    rows = [rows];
                }

                _.each(rows, function (row, i) {
                    max = Math.max(max, i);
                    if (!datasetPage[i]) {
                        datasetPage[i] = {};
                    }
                    datasetPage[i][item.id] = {
                        id: item.id,
                        rows: row
                    };
                });
            });

            return {
                datasets: datasetPage,
                count: max + 1
            };

        },
        deleteEmptyProperty: function (obj) {
            for (var i in obj) {
                if (!obj[i]) {
                    delete obj[i];
                }
            }
        },
        export: function (data) {
            if (!data) {
                return null;
            }

            var _this = this,
                _data = data,
                _template = this.getDatasetTemplate(data, true),
                _cellDefaultObj = $.extend(true, {}, $.formbuilder.toolbox._table.propertyField.cell),
                _cellTemplate = this.getDatasetCellTemplate(_template, data, _cellDefaultObj),
                _datasetsData = data.datasets.data,
                newDatasets,
                pages,
                range,
                result = [];

            pages = this.initDatasets(_datasetsData);
            range = _.range(1, pages.count + 1);
            _.each(range, function (i) {
                _this.formatDatasetsPage(pages, i, _template);
            });
            _.each(range, function (i) {
                var rows = pages.datasets[i - 1],
                    data = $.extend(true, {}, _data),
                    template = $.extend(true, {}, _template),
                    cellTemplate = $.extend(true, {}, _cellTemplate);

                newDatasets = _this.updateDatasets(
                    rows,
                    data,
                    template,
                    cellTemplate
                );
                _this.updateTableRows(_template, newDatasets, data);

                delete data.datasets;
                _.each(data.cells, function (cell) {
                    $.formbuilder.deleteEmptyProperty(cell);
                });
                result.push(data);
            });

            return result;
        }
    };
})(jQuery, _, window);
/*!
 * formbuilder v2.0.0 -  jQuery  plug
 *
 * Includes jquery.js (version>1.7)
 * Includes jquery-ui.js
 * Includes dragula.js
 *
 * Copyright © 2018-2019 huangqing
 * Released under the MIT license
 *
 * Date: 2019-08-08
 * v2.0
 */

/* global jQuery, dragula, window, console, _ */
(function ($, _, dragula, window) {
    "use strict";

    var formbuilder = $.formbuilder;

    function Workspace() {
        this.className;
        this.builder;
        this.toolbox;
        this.control;
        this.menu;
        this.data;
        this.$elements = {};
        this.grid;
        this.elem;
        this.$wrap;
        this.datasetTemplate;
        this.datasetRows;
        this.page = {
            datasets: [],
            current: 1,
            last: 1,
            count: 1
        };
    }

    Workspace.prototype.create = function (elem, builder) {
        this.init(elem, builder);
        this.elem.addClass(this.className.layout);
        this.createGrid();
    };

    Workspace.prototype.init = function (elem, builder) {
        this.className;
        this.builder = builder;
        this.toolbox = builder.options.toolbox;
        this.control = builder.options.control;
        this.elem = elem;
        this.$wrap;
        this.grid;
        this.pattern = this.builder.options.pattern;
        this.data = $.extend(true,
          {
              table: $.extend(true, {}, formbuilder.toolbox._table.propertyField.table),
              rows: [],
              columns: [],
              cells: [],
              controls: []
          },
          builder.options.data
        );
    };

    Workspace.prototype.formatData = function () {
        this.formatRows();
        this.formatColumns();
        this.formatCells();
        this.formatControls();
        this.grid.options = this.data;
    };

    Workspace.prototype.formatTable = function () {
        formbuilder.formatTable(this.data);
    };

    Workspace.prototype.formatRows = function () {
        //一维散点转换为二维坐标
        this.data.rows = formbuilder.makeOneDimensionalArray(
          this.data.rows,
          this.data.table.rows,
          -1,
          this.grid.propertyField.row
        );
    };

    Workspace.prototype.formatColumns = function () {
        this.data.columns = formbuilder.makeOneDimensionalArray(
          this.data.columns,
          -1,
          this.data.table.columns,
          this.grid.propertyField.column
        );
    };

    Workspace.prototype.formatCells = function () {
        this.data.cells = formbuilder.makeTwoDimensionalArray(
          this.data.cells,
          this.data.table.rows,
          this.data.table.columns,
          this.grid.propertyField.cell
        );
    };

    Workspace.prototype.formatControls = function () {
        this.data.controls = formbuilder.makeTwoDimensionalArray(
          this.data.controls,
          this.data.table.rows,
          this.data.table.columns,
          null
        );
    };

    Workspace.prototype.initGrid = function () {
        var elem;

        elem = $("<div class=" + this.className.itemswrap + "></div>");
        this.$wrap = elem;
        //为了支持全局的id查找，先加入到DOM树中
        elem.appendTo(this.elem);

        this.grid = $.extend(true, {}, this.toolbox._table, {
            container: this.elem,
            workspace: this,
            pattern: this.builder.options.pattern
        });
        this.initTimestamp();
    };

    Workspace.prototype.cacheElements = function () {
        //缓存HTMLElements
        this.$elements = formbuilder.makeElementTwoDimensionalArray(this.elem, this.grid.filters);
    };

    Workspace.prototype.createGrid = function () {
        this.initGrid();
        this.renderGrid();
    };

    Workspace.prototype.renderGrid = function () {
        this.formatData();
        this.grid.update();
        this.cacheElements();
        this.grid.bindEvent();
        this.updatePropertyMapItems();
        this.addNewItems();
    };

    Workspace.prototype.initDatasets = function () {
        var data = this.data ? this.data.datasets.data : [],
          pages;

        pages = formbuilder.initDatasets(data);
        this.page.datasets = pages.datasets;
        this.page.count = pages.count;
        this.formatDatasetsPage(1);
    };

    Workspace.prototype.formatDatasetsPage = function (index) {
        var template = $.extend(true, {}, this._datasetTemplate);

        return formbuilder.formatDatasetsPage(this.page, index, template);
    };

    Workspace.prototype.getDatasetsByPageIndex = function (index) {
        var datasets = this.page.datasets[index - 1];

        datasets = $.extend({}, datasets, this.getHorizontalDatasets());
        return datasets;
    };

    Workspace.prototype.getHorizontalDatasets = function () {
        var datasets = {},
          _this = this;

        _.each(this._datasetTemplate, function (item) {
            item = item[0];
            if (item) {
                if (item["extension-direction"] === formbuilder.HORIZONTAL) {
                    datasets[item.id] = _this.page.datasets[0][item.id];
                }
            }

        });

        return datasets;
    };

    Workspace.prototype.renderByPageIndex = function (index) {
        this.saveCurrentPageData();
        this.recoverTable();
        this.page.last = this.page.current;
        this.page.current = index;
        this.loadPage(index);
    };

    Workspace.prototype.updateDatasets = function () {
        var self = this,
          newDatasets = {},
          datasetRows = this.getDatasetsByPageIndex(this.page.current);

        if (!datasetRows) {
            return {};
        }

        _.each(datasetRows, function (obj) {
            if (self.datasetTemplate.hasOwnProperty(obj.id)) {
                newDatasets[obj.id] = self.updateDatasetById(obj.id, obj.rows, 1, self.data, self._datasetCellTemplate, self.datasetTemplate);
            }
        });

        this.formatTable();

        return newDatasets;
    };

    Workspace.prototype.updateTableRows = function (template, newDatasets) {
        formbuilder.updateTableRows(template, newDatasets, this.data);
    };

    Workspace.prototype.saveData = function () { };

    Workspace.prototype.insertDatasetRows = function (data) {
        var _this = this,
          id = data.id,
          index = data.index || 1,
          info,
          rows,
          fillDynamicData;

        info = this.getDatasetInfoById(id, this.datasetTemplate);
        rows = this.getInsertDatasetRows(data, info, index);
        //动态数据，允许在插入新的数据集行前，通过执行配置的js方法脚本返回初始化值的信息，作为插入行各元件的默认值
        fillDynamicData = rows[0][0]["fill-dynamic-data"];
        fillDynamicData = fillDynamicData ? window[fillDynamicData] : null;
        if (typeof fillDynamicData === "function") {
            fillDynamicData.call(_this.builder.elem, rows[0], index, function (row) {
                _this.renderInsertDatasetRows([row], info, index);
            });
        }
        else {
            this.renderInsertDatasetRows(rows, info, index);
        }

    };

    Workspace.prototype.getInsertDatasetRows = function (data, info, index) {
        var id = info.id,
          dataRows = data.rows,
          rows;

        if (!this.datasetTemplate.hasOwnProperty(id)) {
            return;
        }
        this.saveData();
        //获取插入数据集
        rows = this.getDatasetRows(id, dataRows, info.type, { x: info.x, y: info.y }, index + 1, this.datasetTemplate);

        return rows;
    };

    Workspace.prototype.renderInsertDatasetRows = function (data, info, index) {
        var id = info.id,
          newDatasets = {},
          controls = [],
          moveInfo,
          flattenData,
          count = data.length;

        if (!data || data.length === 0 || !data[0][0]) {
            return;
        }
        //获取位移信息
        moveInfo = this.getDatasetMoveInfo(data, index, "insert");
        //转换为一维数组
        flattenData = _(data).flatten().value();
        //调整数据集模版开始位置
        this.changeDatasetTemplatePosition(info.type, moveInfo, this.datasetTemplate);
        //获取需要移动的元件
        controls = this.getMoveControls(info, index);
        //设置元件位移
        this.changeMoveControlsPosition(data, controls, info);
        //插入行列
        this.addNewDatasetRows(info, index, count, controls);
        //渲染元件
        this.renderControls(controls, flattenData);
        //插入数据集回调事件
        newDatasets[id] = data;
        this.triggerDatasetEvent(newDatasets);
        this.formatDatasetRows();
    };

    Workspace.prototype.getDatasetRow = function (id, type, position) {
        var template = this.datasetTemplate[id],
          items,
          _this = this;

        if (template) {
            items = _.map(template, function (item) {
                var x,
                  y,
                  obj;

                if (type === "vertical") {
                    x = position.x;
                    y = item.y;
                    obj = _this.findControlObj(x, y);
                    obj.options.value = obj.getValue();

                    return {
                        $elem: obj.elem,
                        id: obj.elem.attr("id") || null,
                        options: $.extend(true, {}, obj.options)
                    };
                }
                return null;
            });
        }

        return items;
    };

    Workspace.prototype.loadPageDatasets = function (data) {
        var id = data.id,
          rows = data.rows,
          rowlength = rows instanceof Array ? rows.length : rows,
          x,
          index = data.index || 1,
          newDatasets = {},
          controls = [],
          info,
          moveInfo,
          flattenData;

        if (!this.datasetTemplate.hasOwnProperty(id)) {
            return;
        }

        //获取插入数据集
        info = this.getDatasetInfoById(id, this.datasetTemplate);
        if (rows instanceof Array) {
            data = rows;
        }
        else {
            data = this.getDatasetRows(id, rowlength, info.type, { x: info.x, y: info.y }, 1, this.datasetTemplate);
        }

        //重新计算数据集横向扩展元件坐标
        if (info.type === formbuilder.HORIZONTAL && rows instanceof Array) {
            x = this.datasetTemplate[id][0].x;
            _.each(data, function (row) {
                _.each(row, function (obj, i) {
                    obj.x = x + i;
                });
            });
        }

        if (!data || data.length === 0 || !data[0][0]) {
            return;
        }
        //获取位移信息
        moveInfo = this.getDatasetMoveInfo(data, index);
        //转换为一维数组
        flattenData = _(data).flatten().value();
        //调整数据集模版开始位置
        this.changeDatasetTemplatePosition(info.type, moveInfo, this.datasetTemplate);
        //获取需要移动的元件
        controls = this.getMoveControls(info, index);
        //设置元件位移
        this.changeMoveControlsPosition(rowlength - 1, controls, info);
        //插入行列
        this.addNewDatasetRows(info, index, rowlength - 1, controls);
        //渲染元件
        this.renderControls(controls, flattenData);
        //插入数据集回调事件
        newDatasets[id] = data;
        this.triggerDatasetEvent(newDatasets);
        this.formatDatasetRows();
    };

    Workspace.prototype.removeDatasetRows = function (data) {
        var id = data.id,
          dataRows = data.rows,
          index = data.index || 1,
          //newDatasets = {},
          controls = [],
          info,
          moveInfo;

        if (!this.datasetTemplate.hasOwnProperty(id)) {
            return;
        }
        this.saveData();
        //获取插入数据集
        info = this.getDatasetInfoById(id, this.datasetTemplate);
        data = this.getDatasetRows(id, dataRows, info.type, { x: info.x, y: info.y }, index + 1, this.datasetTemplate);
        if (!data || data.length === 0 || !data[0][0]) {
            return;
        }
        //获取位移信息
        moveInfo = this.getDatasetMoveInfo(data, index, "remove");
        //调整数据集模版开始位置
        this.changeDatasetTemplatePosition(info.type, moveInfo, this.datasetTemplate);
        //获取需要移动的元件
        controls = this.getMoveControls(info, index);
        //设置元件位移
        this.changeMoveControlsPosition(dataRows, controls, info);
        //删除行列
        this.removeSelectDatasetRows(info, index, controls, id);
        //渲染元件
        this.renderControls(controls, []);
        //删除数据集回调事件
        // newDatasets[id] = data;
        // this.triggerDatasetEvent(newDatasets);
        this.formatDatasetRows();
    };

    Workspace.prototype.getMoveControls = function (info, index) {
        var controls = [],
          tableRows = this.data.table.rows,
          tableColumns = this.data.table.columns,
          self = this;

        if (info.type === formbuilder.VERTICAL) {
            _.each(_.range(info.x + index, tableRows + 1), function (x1) {
                _.each(_.range(1, tableColumns + 1), function (y1) {
                    var obj = self.removeControl(x1, y1);
                    if (obj && obj.type) {
                        controls.push(obj);
                    }
                });
            });
        } else {
            _.each(_.range(info.y + index, tableColumns + 1), function (y1) {
                _.each(_.range(info.x, info.x + info.length + 1), function (x1) {
                    var obj = self.removeControl(x1, y1);
                    if (obj) {
                        controls.push(obj);
                    }
                });
            });
        }

        return controls;
    };

    Workspace.prototype.changeMoveControlsPosition = function (dataRows, controls, info) {
        var length = _.isNumber(dataRows) ? dataRows : dataRows.length,
          _this = this;
        //计算移动元件位置
        _.each(controls, function (obj) {
            var p,
              len = length,
              x,
              y;
            if (info.type === formbuilder.VERTICAL) {
                x = len;
                y = 0;
            } else {
                x = 0;
                y = len;
            }
            p = { x: obj.x + x, y: obj.y + y };
            obj.x = p.x;
            obj.y = p.y;
            _this.synMoveProperties(obj, { x: x, y: y }, "control");
        });
    };

    Workspace.prototype.synMoveProperties = function (obj, move, type) {
        formbuilder.synMoveProperties(obj, move, type);
    };

    Workspace.prototype.renderControls = function (common, datasets) {
        var self = this;

        if (common) {
            _.each(common, function (obj) {
                self.addNewItem(obj, { x: obj.x, y: obj.y });
            });
        }

        if (datasets) {
            _.each(datasets, function (options) {
                self.addNewItem(options, { x: options.x, y: options.y });
            });
        }
    };

    Workspace.prototype.addNewDatasetRows = function (info, index, count, controls) {
        var self = this,
          max,
          tableColumns,
          x = info.x + index;

        if (info.type === formbuilder.VERTICAL) {
            this.grid.insertRows(info.x + index, count, this.findRowObj(info.x));
            //单元格跨列
            _.each(_.range(x, x + count), function (x1) {
                _.each(self.findRowCellsObj(info.x), function (cell) {
                    formbuilder.updatePropertiesByOptions(
                      self.pattern,
                      self.grid,
                      _.keys(self.grid.propertyField.cell),
                      cell,
                      [self.findCell(x1, cell.y)]
                    );
                });
            });
        }
        else {
            max = _.maxBy(controls, "y");
            max = max ? max.y : 0;
            tableColumns = this.data.table.columns;
            if (max > tableColumns) {
                this.grid.insertColumns(tableColumns + 1, 1);
            }
        }
    };

    Workspace.prototype.removeSelectDatasetRows = function (info, index, controls, id) {
        var _this = this,
          oldLength = this._data.table.columns,
          newLength = this.data.table.columns,
          items,
          max;

        if (info.type === formbuilder.VERTICAL) {
            this.grid.removeRows(info.x + index - 1, 1);
        }
        else {
            //删除元件
            _.each(this.datasetTemplate[id], function (item) {
                var x = item.x,
                  y = item.y + index - 1;
                _this.removeControl(x, y);
            });

            //判断删除冗余的列
            items = _(this.data.controls)
              .chain()
              .flatten()
              .filter(function (item) {
                  return !!item.type;
              })
              .concat(controls)
              .value();
            max = _.maxBy(items, "y");
            max = max ? max.y : 0;

            if (max < newLength && newLength > oldLength) {
                this.grid.removeColumns(newLength, 1);
            }

        }
    };

    Workspace.prototype.saveCurrentPageData = function () {
        var data,
          datasets_save,
          datasets,
          controls;

        data = this.getCurrentPageData();
        controls = data.controls;

        _.each(this._data.controls, function (obj) {
            var id = obj.id,
              item;
            item = _.find(controls, { id: id });
            if (item) {
                obj.value = item.value;
            }
        });
        datasets_save = data.datasets;
        datasets = this.getDatasetsByPageIndex(this.page.current);
        _.each(datasets_save, function (item) {
            datasets[item.id].rows = item.rows;
        });
    };

    Workspace.prototype.cleanControls = function () {
        var table = this.data.table,
          self = this;

        _.each(_.range(1, table.rows + 1), function (x) {
            _.each(_.range(1, table.columns + 1), function (y) {
                self.removeControl(x, y);
            });
        });
    };

    Workspace.prototype.recoverTable = function () {
        var datasets = this.getDatasetsByPageIndex(this.page.current),
          _this = this;

        //恢复原始行列数
        _(datasets)
          .chain()
          //按x坐标从大到小排序
          .sortBy(function (item) {
              var obj;
              if (item.rows && item.rows.length > 0) {
                  obj = item.rows[0][0];
                  return obj.x;
              }
              return -1;
          })
          .reverse()
          .each(function (item) {
              var obj,
                x,
                length = item.rows.length || 0;
              //删除插入的纵向数据集
              if (item.rows && item.rows.length > 1) {
                  obj = item.rows[0][0];
                  if (obj && obj["extension-direction"] === formbuilder.VERTICAL) {
                      x = obj.x;
                      _this.grid.removeRows(x + 1, length - 1);
                  }
              }
          }).value();

        //恢复模版配置项
        this.datasetTemplate = $.extend(true, {}, this._datasetTemplate);
    };

    Workspace.prototype.loadPage = function (index) {
        var self = this,
          page;

        //清除全部元件
        this.cleanControls();
        //渲染通用控件
        _(this._data.controls)
          .chain()
          .map(function (obj) {
              return $.extend(true, {}, obj);
          })
          .each(function (obj) {
              //分页只显示锚定的元件
              if (index !== 1 && obj[formbuilder.PAGING.DISPLAY] === false) {
                  return;
              }
              self.addNewItem(obj, { x: obj.x, y: obj.y });
          })
          .value();
        //渲染数据集页面数据
        page = this.getDatasetsByPageIndex(index);
        _.each(page, function (item, id) {
            self.loadPageDatasets({ id: id, rows: item.rows, index: 1 });
        });
    };

    Workspace.prototype.getDatasetMoveInfo = function (data, index, type) {
        return formbuilder.getDatasetMoveInfo(data, index, type);
    };

    Workspace.prototype.getDatasetRows = function (id, rows, type, position, index, template) {
        return formbuilder.getDatasetRows(id, rows, type, position, index, template);
    };

    Workspace.prototype.formatDatasetRows = function () { };

    Workspace.prototype.changeDatasetTemplatePosition = function (type, moveInfo, template) {
        formbuilder.changeDatasetTemplatePosition(type, moveInfo, template);
    };

    Workspace.prototype.changeInfoByDataset = function (type, dataset, index, data, cellTemplate, datasetTemplate) {
        formbuilder.changeInfoByDataset(type, dataset, index, data, cellTemplate, datasetTemplate);
    };

    Workspace.prototype.changePosition = function (type, count, p1, p2, obj, objType) {
        formbuilder.changePosition(type, count, p1, p2, obj, objType);
    };

    Workspace.prototype.getDatasetInfoById = function (id, template) {
        return formbuilder.getDatasetInfoById(id, template);
    };

    Workspace.prototype.updateDatasetById = function (id, rows, index, data, _datasetCellTemplate, datasetTemplate) {
        return formbuilder.updateDatasetById(id, rows, index, data, _datasetCellTemplate, datasetTemplate);
    };

    Workspace.prototype.getDatasetTemplate = function (isLoad) {
        return $.formbuilder.getDatasetTemplate(this.data, isLoad);
    };

    Workspace.prototype.getDatasetCellTemplate = function () {
        return formbuilder.getDatasetCellTemplate(
          this._datasetTemplate,
          this.data,
          this.grid.propertyField.cell);
    };

    Workspace.prototype.triggerDatasetEvent = function (newDatasets) {
        var self = this,
          update = self.events.updateDatasets;

        if (typeof update !== "function") {
            return;
        }

        _.each(newDatasets, function (rows, id) {
            _.each(rows, function (row, x) {
                _.each(row, function (obj, i) {
                    obj = self.grid.findControlObj(obj.x, obj.y);
                    row[i] = obj.options || obj;
                });
            });
        });
        _.each(newDatasets, function (rows, id) {
            update.call(self.builder.elem, id, rows);
        });
    };

    Workspace.prototype.addNewItems = function () {
        var self = this,
          controls = this.grid.options.controls;

        _.each(controls, function (items) {
            _.each(items, function (obj) {
                var options;
                if (!obj) {
                    return;
                }
                //通过判断是否存在elem元素获取参数值
                if (obj.options) {
                    options = obj.options;
                } else {
                    options = obj;
                }
                if (options.type) {
                    self.addNewItem(options, { x: options.x, y: options.y });
                }
            });
        });
    };

    Workspace.prototype.addNewItem = function (options, position) {
        var $elem, $parent;

        if (!options.type) {
            return;
        }
        $parent = this.findCell(position.x, position.y);
        if (!$parent) {
            return;
        }
        $elem = $("<div></div>");
        if ($parent.length > 0) {
            $elem.appendTo($parent);
            this.addControl($elem, options, position);
        }
    };

    Workspace.prototype.addControl = function ($elem, options, position) {
        var titleBox,
          _options = options || {},
          type = _options.type || $elem.attr("data-type"),
          contentBox = $.extend(true, {}, this.toolbox[type] || this.toolbox.textbox, {
              options: _options,
              builder: this.builder
          }),
          opt = contentBox.options,
          $label,
          $item,
          $control,
          pattern = this.builder.options.pattern;

        $control = $("<div></div>")
          .addClass(this.className.controlContainer)
          .addClass(this.className.relateProperty)
          .attr("data-position", JSON.stringify([position.x, position.y]))
          .attr("data-type", opt.type)
          .attr("data-contextmenu", contentBox.contextmenu);

        $elem
          .attr("class", "")
          .empty()
          .addClass(this.className.item)
          .append($control);

        contentBox.container = $control;

        if (opt.label) {
            titleBox = $.extend(true, {}, this.toolbox["_title"], { options: { label: opt.label } });
            $label = titleBox[pattern]();
        }
        $control.append($label);
        //控件生成有两种方式
        //1.在design方法创建游离的元素，返回元素，方法会自动添加的elem中
        //2.使用elem作为容器，在design方法内直接添加在dom树中
        $item = contentBox[pattern]();
        if ($item) {
            $control.append($item);
        } else {
            $item = contentBox.container.children();
        }
        contentBox.elem = $item;

        this.addControlObj(position.x, position.y, contentBox);
        this.updatePropertyItems(contentBox, contentBox.options, contentBox.property, position);
    };

    Workspace.prototype.getProperySortMap = function () {
        return formbuilder.getSortMapByOrder(this.grid.propertyMap);
    };

    Workspace.prototype.initTimestamp = function () {
        var items = this.getProperySortMap(),
          options = this.data,
          data,
          timestamps = [];

        _.each(items, function (item) {
            //获取数据信息并递归为一维数组
            data = [options[item.map]];
            data = _.flattenDeep(data);
            _.each(data, function (obj) {
                _.each(obj, function (value, key) {
                    //遍历查找timestamp
                    if (_.isObject(value) && value.hasOwnProperty("timestamp")) {
                        timestamps.push(value);
                    }
                });
            });
        });

        timestamps = _.sortBy(timestamps, ["timestamp"]);

        _.each(timestamps, function (obj) {
            obj.zIndex = formbuilder.getZindex(obj.timestamp);
        });
    };

    Workspace.prototype.updatePropertyMapItems = function () {
        var grid = this.grid,
          items = this.getProperySortMap(),
          property = grid.property,
          options = grid.options,
          self = this;

        _.forEach(items, function (item) {
            var fieldName = item.key,
              data = options[item.map],
              properties = property[fieldName];

            self.updatePropertyItem(grid, data, properties);
        });
    };

    Workspace.prototype.updatePropertyForArrayType = function (contentBox, data, properties) {
        var self = this;

        _.each(data, function (obj) {
            self.updatePropertyItem(contentBox, obj, properties);
        });
    };

    Workspace.prototype.updatePropertyItems = function (contentBox, data, properties) {
        var pattern = this.builder.options.pattern,
          self = this,
          items;

        items = this.sortProperties(properties);
        _.forEach(items, function (name) {
            self.updatePropertyInLoad(pattern, name, contentBox, data, properties);
        });
    };

    Workspace.prototype.sortProperties = function (properties) {
        return _(properties)
          .chain()
          .map(function (item, key) {
              return {
                  name: key,
                  order: item.order || 0
              };
          })
          .orderBy(function (o) {
              return o.order || 0;
          })
          .map("name")
          .value();
    };

    Workspace.prototype.updatePropertyItem = function (contentBox, data, properties) {
        if (data instanceof Array) {
            this.updatePropertyForArrayType(contentBox, data, properties);
        } else {
            this.updatePropertyItems(contentBox, data, properties);
        }
    };

    Workspace.prototype.updatePropertyInLoad = function (pattern, name, element, data, properties) {
        var property = properties[name];
        if (property && property.updateInLoad !== false) {
            formbuilder.updateProperty(pattern, name, element, data, properties);
        }
    };

    Workspace.prototype.getData = function () {
        return _(this.data.controls)
          .flatten()
          .map(function (control) {
              var obj;
              if (control) {
                  obj = control.options ? $.extend(true, {}, control.options) : $.extend(true, {}, control);
                  if (obj.type) {
                      return obj;
                  }
              }
              return null;
          })
          .compact()
          .value();
    };

    Workspace.prototype.getDataByCell = function (cell) {
        var position = this.getPosition($(cell));

        return position ? this.getDataByPosition(position.x, position.y) : null;
    };

    Workspace.prototype.getDataByPosition = function (x, y) {
        var grid = this.grid,
          control = grid.findControlObj(x, y);

        return control.options ? $.extend(true, {}, control.options) : $.extend(true, {}, control);
    };

    Workspace.prototype.findCell = function (x, y) {
        return formbuilder.findCellElement(x, y, this.$elements);
    };

    Workspace.prototype.findRowCells = function (x, isCompact) {
        var result;

        result = formbuilder.findRowCellElements(x, this.$elements);
        if (_.isArray(result) && isCompact !== false) {
            result = _.compact(result);
        }

        return result;
    };

    Workspace.prototype.findColumnCells = function (y, isCompact) {
        var result;

        result = formbuilder.findColumnCellElements(y, this.$elements);
        if (_.isArray(result) && isCompact !== false) {
            result = _.compact(result);
        }

        return result;
    };

    Workspace.prototype.findRowControls = function (x, isCompact) {
        var result;

        result = formbuilder.findRowControlElements(x, this.data);
        if (_.isArray(result) && isCompact !== false) {
            result = _.compact(result);
        }

        return result;
    };

    Workspace.prototype.findColumnControls = function (y, isCompact) {
        var result;

        result = formbuilder.findColumnControlElements(y, this.data);
        if (_.isArray(result) && isCompact !== false) {
            result = _.compact(result);
        }

        return result;
    };

    Workspace.prototype.findControl = function (x, y) {
        return formbuilder.findControlElement(x, y, this.data) || null;
    };

    Workspace.prototype.findRowIndex = function (x) {
        return formbuilder.findRowIndexElement(x, this.$elements);
    };

    Workspace.prototype.findColumnIndex = function (y) {
        return formbuilder.findColumnIndexElement(y, this.$elements);
    };

    Workspace.prototype.findAllRowIndex = function () {
        return _.compact(this.$elements[formbuilder.DATATYPE.ROWSINDEX]);
    };

    Workspace.prototype.findAllColumnIndex = function () {

        return _.compact(this.$elements[formbuilder.DATATYPE.COLUMNSINDEX]);
    };

    Workspace.prototype.findRow = function (x) {
        return formbuilder.findRowElement(x, this.$elements);
    };

    Workspace.prototype.removeCell = function (x, y, x1, y1) {
        var attr = {
            colspan: 1,
            rowspan: 1
        };

        if (_.isNumber(x1) && _.isNumber(y1)) {
            attr.x1 = x1;
            attr.y1 = y1;
        }
        //移除控件
        formbuilder.updateSignObj(this.data[formbuilder.DATATYPE.CONTROLS], x, y, { x: x, y: y });
        //移除HTMLELEMENT
        formbuilder.removeCellElement(x, y, this.$elements);
        //更新单元格信息
        this.updateCellObjAttribute(x, y, attr);
    };

    Workspace.prototype.removeControl = function (x, y) {
        var obj = this.findControlObj(x, y),
          $elem;

        if (obj && obj.type) {
            $elem = this.findCell(x, y);
            if ($elem) {
                $elem.find(">." + this.className.item).remove();
            }
            formbuilder.updateSignObj(this.data[formbuilder.DATATYPE.CONTROLS], x, y, { x: x, y: y });
            return obj.options || obj;
        }
    };

    Workspace.prototype.insertRows = function ($elems, x, y1, y2) {
        formbuilder.insertRowElements(this.$elements, this.grid.filters, $elems, x, y1, y2);
        formbuilder.insertRowObjs(this.data, x, $elems.length, y1, y2, this.grid.propertyField);
    };

    Workspace.prototype.removeRows = function (count, x, y1, y2) {
        formbuilder.removeRowElements(this.$elements, count, x, y1, y2);
        formbuilder.removeRowObjs(this.data, x, count, y1, y2);
    };

    Workspace.prototype.insertColumns = function ($elems, y, x1, x2) {
        formbuilder.insertColumnElements(this.$elements, this.grid.filters, $elems, y, x1, x2);
        formbuilder.insertColumnObjs(this.data, y, $elems.length, x1, x2, this.grid.propertyField);
    };

    Workspace.prototype.removeColumns = function (count, y, x1, x2) {
        formbuilder.removeColumnElements(this.$elements, count, y, x1, x2);
        formbuilder.removeColumnObjs(this.data, y, count, x1, x2);
    };

    Workspace.prototype.addCell = function (x, y, $elem) {
        var obj = $.extend({}, this.grid.propertyField.cell, { x: x, y: y });
        this.addCellObj(x, y, obj);
        formbuilder.addCellElement(x, y, this.$elements, $elem);
    };

    Workspace.prototype.updateCellObjAttribute = function (x, y, attr) {
        formbuilder.updateObjAttribute(this.data[formbuilder.DATATYPE.CELLS], x, y, attr);
    };

    Workspace.prototype.findRowObj = function (x) {
        return formbuilder.findObj(this.data[formbuilder.DATATYPE.ROWS], x, -1);
    };

    Workspace.prototype.findRowCellsObj = function (x) {
        return formbuilder.findObj(this.data[formbuilder.DATATYPE.CELLS], x, null);
    };

    Workspace.prototype.findColumnCellsObj = function (y) {
        var cells = [],
          DATATYPE = formbuilder.DATATYPE,
          self = this;

        _.each(_.range(1, this.data[DATATYPE.TABLE][DATATYPE.ROWS] + 1), function (x) {
            cells.push(formbuilder.findObj(self.data[formbuilder.DATATYPE.CELLS], x, y));
        });
        return cells;
    };

    Workspace.prototype.findCellObj = function (x, y) {
        return formbuilder.findObj(this.data[formbuilder.DATATYPE.CELLS], x, y);
    };

    Workspace.prototype.addCellObj = function (x, y, obj) {
        formbuilder.updateSignObj(this.data[formbuilder.DATATYPE.CELLS], x, y, obj);
    };

    Workspace.prototype.findControlObj = function (x, y) {
        return formbuilder.findObj(this.data[formbuilder.DATATYPE.CONTROLS], x, y);
    };

    Workspace.prototype.addControlObj = function (x, y, obj) {
        var _obj = obj.options || obj;

        if (!_obj.id) {
            _obj.id = formbuilder.getId();
        }
        _obj.x = x;
        _obj.y = y;
        formbuilder.updateSignObj(this.data[formbuilder.DATATYPE.CONTROLS], x, y, obj);
    };

    Workspace.prototype.checkValue = function () {
        var checked = true;

        _(this.data.controls)
          .flatten()
          .each(function (item) {
              var check = item.checkValue;
              if (typeof check === "function") {
                  if (!check.call(item)) {
                      checked = false;
                  }
              }
          });
        return checked;
    };

    Workspace.prototype.verify = function () {
        if (this.builder.options.verification && this.checkValue() === false) {
            return false;
        }

        return true;
    };

    Workspace.prototype.exportData = function () {
        var data,
          verified = true;

        verified = this.verify();
        this.saveCurrentPageData();
        data = $.extend(true, {}, this.data);
        data.cells = _(data.cells).flatten().value();
        data.controls = _(data.controls)
          .flatten()
          .map(function (item) {
              if (item.type) {
                  return item.options || item;
              }
              return null;
          })
          .compact()
          .value();
        data.verified = verified;
        delete data.datasets;

        return data;
    };

    Workspace.prototype.destroy = function () {
        this.$wrap = null;
        this.builder = null;
        this.grid = null;
        this.toolbox = null;
        this.control = null;
        this.shortcutKey = null;
        this.data = null;
        this.elem.remove();
        this.elem = null;
    };

    DesignWorkspace.prototype = new Workspace();

    function DesignWorkspace() {
        this.className = {
            layout: "formbuilder-design-workspace",
            itemswrap: "formbuilder-design-workspace-grid",
            item: "formbuilder-design-workspace-item",
            itemContainer: "formbuilder-design-workspace-item-container",
            relateProperty: "formbuilder-design-workspace-relate-property",
            enableDrop: "formbuilder-design-workspace-enable-drop",
            controlContainer: "formbuilder-workspace-control-container"
        };

        this.recordNumber = 20;
        this.cache = {
            recovery: [],
            retroversion: []
        };
    }

    DesignWorkspace.prototype.getData = function () {
        var options,
          data = this.data,
          cells;

        cells = $.extend(
          true,
          [],
          _(data.cells)
            .flatten()
            .value()
        );

        _.each(cells, function (cell) {
            $.formbuilder.deleteEmptyProperty(cell);
        });

        options = {
            table: $.extend(true, {}, data.table),
            rows: $.extend(true, [], data.rows),
            columns: _.map(data.columns, function (column) {
                column = $.extend(true, {}, column);
                delete column._width;
                return column;
            }),
            cells: cells,
            controls: $.extend(
              true,
              [],
              _(data.controls)
                .flatten()
                .map(function (control) {
                    var obj = control ? control.options || control : {};
                    if (obj.type) {
                        return obj;
                    }
                    return null;
                })
                .compact()
                .value()
            ),
            datasets: {
                template: this.getDatasetTemplate(),
                data: []
            }
        };

        return options;
    };

    DesignWorkspace.prototype.destroy = function () {
        Workspace.prototype.destroy.call(this);
        this.recordNumber = null;
        this.className = null;
        this.cache = null;
    };

    function ApplyingWorkspace() {
        Workspace.call(this);
        this.className = {
            layout: "formbuilder-workspace formbuilder-applying-workspace",
            itemswrap: "formbuilder-applying-workspace-grid",
            item: "formbuilder-applying-workspace-item",
            controlContainer: "formbuilder-workspace-control-container"
        };
        this._datasetTemplate;
        this._data;
    }
    ApplyingWorkspace.prototype = new Workspace();
    ApplyingWorkspace.prototype.constructor = ApplyingWorkspace;

    ApplyingWorkspace.prototype.init = function (elem, builder) {
        Workspace.prototype.init.call(this, elem, builder);
        this.events = this.builder.options.events;
    };

    ApplyingWorkspace.prototype.createGrid = function () {
        var newDatasets;

        this.setAutoFitMeta();
        this.initGrid();
        //保存原始数据
        this._datasetTemplate = this.datasetTemplate || this.getDatasetTemplate(true);
        this._datasetCellTemplate = this.getDatasetCellTemplate();
        //填报模式中数据集模版只计算一次
        this.datasetTemplate = $.extend(true, {}, this._datasetTemplate);
        this._data = $.extend(true, {}, this.data);
        //填充数据集数据
        this.initDatasets();
        newDatasets = this.updateDatasets();
        this.updateTableRows(this._datasetTemplate, newDatasets);
        //创建网格，缓存数据
        this.renderGrid();
        this.triggerDatasetEvent(newDatasets);
        this.formatDatasetRows();
        //自适应全屏
        this.autoFitFullScreen();
    };

    ApplyingWorkspace.prototype.autoFitFullScreen2 = function () {
        if (!this.builder.options.autoFitFullScreen) {
            return;
        }
        var metaToShrink = "<meta name=\"viewport\" content=\"width=device-width, initial-scale=0.0\"></meta>",
          metaToEnlarge = "<meta name=\"viewport\" content=\"initial-scale=1.0\"></meta>",
          meta,
          $meta,
          deviceWidth = $(document).width(),
          screenWidth = window.screen.width,
          width = this.grid.getWidth(),
          content,
          scaleToShrink = Number((screenWidth / width).toFixed(2)) - 0.02,
          scaleToEnlarge = Number((deviceWidth / width).toFixed(2)) - 0.02;

        $meta = $(document).find("head meta[name='viewport']");
        if ($meta.length === 0) {
            meta = screenWidth < width ? metaToShrink : metaToEnlarge;
            $meta = $(meta);
            $(document).find("head").append($meta);
        }
        content = screenWidth < width ?
          "width=device-width, initial-scale=" + scaleToShrink :
          "initial-scale=" + scaleToEnlarge;

        setTimeout(function () {
            $meta.attr("content", content);
        }, 320);

    };

    ApplyingWorkspace.prototype.setAutoFitMeta = function () {
        if (!this.builder.options.autoFitFullScreen) {
            return;
        }

        var meta = "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"></meta>",
          $meta;

        $meta = $(document).find("head meta[name='viewport']");
        if ($meta.length === 0) {
            $meta = $(meta);
            $(document).find("head").append($meta);
        }

        this.$meta = $meta;
    };

    ApplyingWorkspace.prototype.autoFitFullScreen = function () {
        if (!this.builder.options.autoFitFullScreen) {
            return;
        }

        var $meta = this.$meta,
          screenWidth = window.screen.width,
          width = this.grid.getWidth(),
          content,
          scaleToShrink = Number((screenWidth / width).toFixed(2)) - 0.02;

        if (screenWidth < width) {
            content = "width=device-width, initial-scale=" + scaleToShrink;
            $meta.attr("content", content);
        }

    };

    ApplyingWorkspace.prototype.getDataByPosition = function (x, y) {
        var control = this.findControlObj(x, y),
          clone,
          result;

        if (control.options) {
            clone = $.extend(true, {}, control.options);
            clone.value = control.getValue() || null;
            result = clone;
        } else if (control.type) {
            clone = $.extend(true, {}, control);
            result = clone;
        }

        return result;
    };

    ApplyingWorkspace.prototype.saveData = function () {
        var data = this.data,
          controls = data[formbuilder.DATATYPE.CONTROLS];

        _(controls)
          .flatten()
          .each(function (control) {
              var obj, getValue;

              if (!control || !control.type) {
                  return;
              }
              obj = control.options || control;
              getValue = control.getValue;
              if (typeof getValue === "function") {
                  obj.value = control.getValue();
              }
          });
    };

    ApplyingWorkspace.prototype.getCurrentPageData = function () {
        var controls,
          data = { controls: null, datasets: [] };

        this.saveData();
        controls = Workspace.prototype.getData.call(this);
        _(controls)
          .sortBy(["x", "y"])
          .groupBy(function (obj) {
              return obj["dataset-block"] || "_common";
          })
          .each(function (items, key) {
              var head, groupKey;
              if (key === "_common") {
                  data.controls = items;
              } else {
                  head = items[0];
                  if (head["extension-direction"] === formbuilder.VERTICAL) {
                      groupKey = "x";
                  } else {
                      groupKey = "y";
                  }
                  items = _(items)
                    .groupBy(function (obj) {
                        return obj[groupKey];
                    })
                    .map(function (items) {
                        return items;
                    })
                    .value();

                  data.datasets.push({
                      id: key,
                      rows: items
                  });
              }
          });

        return data;
    };

    ApplyingWorkspace.prototype.getData = function () {
        var data,
          datasetRows = {},
          verified = true;

        //验证
        verified = this.verify();
        //组织数据  
        this.saveCurrentPageData();
        data = $.extend(true, {}, this._data);
        //数据集模版
        data.datasets.template = $.extend(true, {}, this._datasetTemplate);
        //数据集数据
        _($.extend(true, [], this.page.datasets))
          .each(function (page) {
              _(page).each(function (item) {
                  if (!datasetRows[item.id]) {
                      datasetRows[item.id] = [item.rows];
                  }
                  else {
                      datasetRows[item.id].push(item.rows);
                  }
              });
          });
        data.datasets.data = _.map(datasetRows, function (rows, id) {
            return { id: id, rows: rows };
        });

        data.verified = verified;
        return data;
    };

    ApplyingWorkspace.prototype.formatDatasetRows = function () {
        var self = this,
          data = this.getCurrentPageData(),
          datasets = data.datasets,
          types = {
              vertical: [],
              horizontal: []
          },
          result = {
              vertical: {},
              horizontal: {}
          };

        //获取数据集分类
        _(this.datasetTemplate).each(function (item, id) {
            var info = self.getDatasetInfoById(id, self.datasetTemplate);
            if (info.type === formbuilder.VERTICAL) {
                types.vertical.push(id);
            } else {
                types.horizontal.push(id);
            }
        });

        if (datasets && datasets.length > 0) {
            _(types.vertical).each(function (id) {
                var item = _.find(datasets, { id: id }),
                  rows = item ? item.rows : [];
                _.each(rows, function (row, index) {
                    var obj = row[0];
                    result.vertical[obj.x] = { x: obj.x, y: obj.y, id: id, index: index + 1, type: formbuilder.VERTICAL };
                });
            });

            _(types.horizontal).each(function (id) {
                var item = _.find(datasets, { id: id }),
                  rows = item ? item.rows : [];

                _.each(rows, function (row, index) {
                    var obj = row[0];
                    if (!result.horizontal[obj.x]) {
                        result.horizontal[obj.x] = {
                            type: formbuilder.HORIZONTAL
                        };
                    }
                    result.horizontal[obj.x][obj.y] = { x: obj.x, y: obj.y, id: id, index: index + 1, type: formbuilder.HORIZONTAL };
                });
            });
        }
        this.datasetRows = result;
    };

    function ViewWorkspace() {
        Workspace.call(this);
        this.className = {
            layout: "formbuilder-workspace formbuilder-view-workspace",
            itemswrap: "formbuilder-view-workspace-grid",
            item: "formbuilder-view-workspace-item",
            controlContainer: "formbuilder-workspace-control-container"
        };
    }
    ViewWorkspace.prototype = new Workspace();
    ViewWorkspace.prototype.constructor = ViewWorkspace;

    ViewWorkspace.prototype.init = function (elem, builder) {
        ApplyingWorkspace.prototype.init.call(this, elem, builder);
    };

    ViewWorkspace.prototype.createGrid = function () {
        ApplyingWorkspace.prototype.createGrid.call(this);
    };

    ViewWorkspace.prototype.setAutoFitMeta = function () {
        ApplyingWorkspace.prototype.setAutoFitMeta.call(this);
    };

    ViewWorkspace.prototype.autoFitFullScreen = function () {
        ApplyingWorkspace.prototype.autoFitFullScreen.call(this);
    };

    ViewWorkspace.prototype.getCurrentPageData = function () {
        return ApplyingWorkspace.prototype.getCurrentPageData.call(this);
    };

    ViewWorkspace.prototype.getDataByPosition = function (x, y) {
        return ApplyingWorkspace.prototype.getDataByPosition.call(this, x, y);
    };

    ViewWorkspace.prototype.getData = function () {
        return $.extend(true, {}, this._data);
    };

    /**
     * Property
     */
    function Property() {
        this.className = {
            layout: "formbuilder-property",
            itemswrap: "formbuilder-property-items-wrap",
            hidden: "formbuilder-property-hidden",
            title: "formbuilder-property-title",
            items: "formbuilder-property-items",
            item: "formbuilder-property-item",
            blockItem: "formbuilder-property-item-block",
            itemTitle: "formbuilder-property-item-label",
            itemControl: "formbuilder-property-item-control",
            field: "formbuilder-property-title-field"
        };

        this.template = {
            wrap: function (opt) {
                return ["<div class='", opt.className, "'></div>"].join("");
            },
            field: function (opt) {
                return ["<a class='", opt.className, "'>", opt.title, "</a>"].join("");
            },
            title: function (opt) {
                return ["<div class='", opt.className, "'>", opt.path, " ", opt.title, " ", "[", opt.x, ",", opt.y, "] </div>"].join("");
            }
        };

        this.builder = null;
        this.language = null;
        this.elementTypes = null;
        this.items = null;
        this.owner = null;
        this.$wrap = null;
        this.elem = null;
    }

    Property.prototype.create = function (elem, builder) {
        var $wrap, $field;

        this.builder = builder;
        this.language = builder.options.language;
        this.localLanguage = formbuilder.language[this.language].property;
        this.elementTypes = builder.options.property;
        this.elem = elem;

        $wrap = $(this.template.wrap({ className: this.className.itemswrap }));
        $field = $(
          this.template.field({
              className: this.className.field,
              title: this.localLanguage.title
          })
        );

        this.elem
          .append($wrap)
          .append($field)
          .addClass(this.className.layout);

        this.$wrap = $wrap;
    };

    Property.prototype.addTitle = function () {
        var html,
          ownerElement = this.owner.element,
          position = this.owner.position,
          path = ownerElement.options.path || [];

        html = this.template.title({
            className: this.className.title,
            path: path.join(""),
            title: ownerElement.getLocalText(ownerElement.title),
            x: position.x,
            y: position.y
        });
        this.$wrap.append(html);
    };

    Property.prototype.addItems = function () {
        var html,
          items = this.items,
          item;

        html = $("<div class='" + this.className.items + "' >");
        for (var i in items) {
            item = items[i];
            if (item) {
                if (item.hidden) {
                    continue;
                }
                html.append(this.addItem(i, item));
            }
        }

        this.$wrap.append(html);
    };

    Property.prototype.addItem = function (name, item) {
        var labelbox,
          contentbox,
          $container,
          $label,
          $content,
          itemClass;

        // 创建标题实例
        labelbox = this.createElement(this.elementTypes.label, name, item);
        // 创建属性控件实例
        contentbox = this.createElement(this.elementTypes[item.type] || this.elementTypes.textbox, name, item);

        itemClass = this.className.item;
        if (contentbox.display === "block") {
            itemClass += " " + this.className.blockItem;
        }
        $container = $("<div " + "class='" + itemClass + "' " + "/>");
        $label = $("<div " + "class='" + this.className.itemTitle + "' " + "/>");
        $content = $("<div " + "class='" + this.className.itemControl + "' " + "/>");

        $label.append(labelbox.create());
        //生成属性显示控件
        contentbox.elem = contentbox.create();
        //绑定事件
        contentbox.bindEvent && contentbox.bindEvent();

        this.bindElementUpdateEvent(contentbox);
        $content.append(contentbox.elem);
        $container.append($label).append($content);

        return $container;
    };

    Property.prototype.createElement = function (elementType, name, prop) {
        var element;

        element = $.extend(true, {}, elementType, {
            builder: this.builder
        });
        element.options.value = this.owner.data[name];
        element.options.source = prop.source;
        element.options.name = name;
        element.options.text = prop.text;
        element.options["extend-params"] = prop["extend-params"];

        return element;
    };

    Property.prototype.bindElementUpdateEvent = function (element) {
        var elem = element.elem,
          events = element.updateEvent && element.updateEvent(),
          event,
          self = this,
          owner = this.owner,
          items = this.items;

        if (!events) {
            return;
        }

        for (var i = 0, len = events.length; i < len; i++) {
            event = events[i];
            elem.on(event.name, event.filter, function () {
                self.updateElement(owner.element, owner.position, owner.data, element, items);
            });
        }
    };

    Property.prototype.updateElement = function (ownerElement, position, data, propertyElement, properties) {
        var name = propertyElement.options.name,
          property = properties[name],
          checking = property.checking,
          pattern = this.builder.options.pattern,
          value = propertyElement.getValue();

        //更新当前属性项
        if (checking && typeof checking === "function" && !checking.call(ownerElement, value, position)) {
            //重置为原始值
            if (typeof propertyElement.setValue === "function") {
                propertyElement.setValue(data[name]);
                return;
            }
        }

        formbuilder.updateValue(ownerElement, data, name, value, properties, formbuilder.getTimestamp());
        formbuilder.updateProperty(pattern, name, ownerElement, data, properties);
    };

    Property.prototype.clearItems = function () {
        this.elem.find("." + this.className.itemswrap).empty();
        this.owner = null;
        this.items = null;
    };

    Property.prototype.show = function (items, data, position, control) {
        this.clearItems();
        this.owner = {
            element: control,
            data: data,
            position: position
        };
        this.items = items;
        this.addTitle();
        this.addItems();
    };

    Property.prototype.destroy = function () {
        this.elem.remove();
        this.elem = null;
        this.$wrap = null;
        this.elementTypes = null;
        this.woner = null;
        this.items = null;
        this.className = null;
    };

    /**
     * 控件工具箱
     * @param {*} elem
     */
    function ToolBox() {
        this.className = {
            layout: "formbuilder-toolbox",
            hidden: "formbuilder-toolbox-hidden",
            itemswrap: "formbuilder-toolbox-items-wrap",
            items: "formbuilder-toolbox-items",
            item: "formbuilder-toolbox-item",
            group: "formbuilder-toolbox-group",
            groupTitle: "formbuilder-toolbox-group-title",
            groupIcon: "formbuilder-toolbox-group-icon",
            groupText: "formbuilder-toolbox-group-text",
            itemContent: "formbuilder-toolbox-content",
            itemIcon: "formbuilder-toolbox-item-icon",
            itemTitle: "formbuilder-toolbox-item-title",
            field: "formbuilder-toolbox-title-field"
        };

        this.template = {
            container: function (opt) {
                return ["<div class='", opt.className.wrap, "'>", opt.items, "</div>",
                  "<a class='", opt.className.field, "'>", opt.title, "</a>"].join("");
            },
            group: function (opt) {
                return [
                  "<div class='", opt.className.group, "' >",
                  "  <div class='", opt.className.title, "'>",
                  "    <img class='", opt.className.icon, "' src='", opt.icon, "' ", opt.expand, "/>",
                  "    <span class='", opt.className.text, "'> ", opt.text, "</span>",
                  "  </div>",
                  "  ", opt.items,
                  "</div>"
                ].join("");
            },
            item: function (opt) {
                return [
                  "<div class='", opt.className.content, "'>",
                  "  <div class='", opt.className.item, "' data-type='", opt.type, "' data-path='", opt.path, "'>",
                  "    <img class='", opt.className.icon, "' src='", opt.icon, "'/>",
                  "    <span class='", opt.className.title, "'>", opt.text, "</span>",
                  "  </div>",
                  "</div>"
                ].join("");
            }
        };

        this.builder = null;
        this.items = null;
        this.language = null;
        this.order = null;
        this.showLabel = null;
        this.localLanguage = null;
        this.elem = null;
        this.expandImage = "expand.png";
        this.collapseImage = "collapse.png";
    }

    ToolBox.prototype.create = function (elem, builder) {
        var html;

        this.builder = builder;
        this.items = builder.options.toolbox;
        this.language = builder.options.language;
        this.control = builder.options.control;
        this.order = this.control.order;
        this.showLabel = this.control.showLabel;
        this.expandImage = this.control.expandImage;
        this.collapseImage = this.control.collapseImage;
        this.localLanguage = formbuilder.language[this.language].toolbox;
        this.elem = elem;

        html = this.template.container({
            className: {
                wrap: this.className.itemswrap,
                field: this.className.field
            },
            title: this.localLanguage.title,
            items: this.createItems(this.order, 0, [])
        });
        this.elem.addClass(this.className.layout).append(html);

        this.bindExpandEvent();
    };

    ToolBox.prototype.createItems = function (controls, level, path, isHide) {
        var html = [],
          control,
          style = isHide ? "style='display:none;'" : "";

        html.push("<div class='" + this.className.items + "' " + style + " >");
        for (var i = 0, len = controls.length; i < len; i++) {
            control = controls[i];
            html.push(this.createItem(control, level, path.slice()));
        }
        html.push("</div>");

        return html.join("");
    };

    ToolBox.prototype.createItem = function (control, level, path) {
        var item,
          html,
          _path = path.slice(),
          image,
          expand;

        if (typeof control === "string") {
            item = this.items[control];
            if (!item) {
                formbuilder.log("toolbox not find " + control, true);
                return "";
            }

            html = this.template.item({
                className: {
                    content: this.className.itemContent,
                    item: this.className.item,
                    icon: this.className.itemIcon,
                    title: this.className.itemTitle
                },
                type: item.type,
                path: _path.join(" "),
                icon: this.builder.getImage(item.icon),
                text: item.getLocalText()
            });
        } else if (typeof control === "object") {
            path.push(control.text);
            control.path = path;
            image = this.builder.getImage(!control.expand ? this.collapseImage : this.expandImage);
            expand = !control.expand ? " data-collapse='true' " : "";

            html = this.template.group({
                className: {
                    group: this.className.group,
                    title: this.className.groupTitle,
                    icon: this.className.groupIcon,
                    text: this.className.groupText
                },
                expand: expand,
                icon: image,
                text: control.text,
                items: this.createItems(control.children, ++level, path, !control.expand)
            });
        }

        return html;
    };

    ToolBox.prototype.getItem = function (type) {
        return this.items[type] || {};
    };

    ToolBox.prototype.bindExpandEvent = function () {
        var self = this;

        this.elem.find("." + this.className.groupIcon).click(function () {
            var $elem = $(this),
              isExpand = !$elem.attr("data-collapse"),
              $content = $elem.parent().next();

            if (isExpand) {
                $elem.attr("src", self.builder.getImage(self.collapseImage));
                $elem.attr("data-collapse", true);
                $content.hide();
            } else {
                $elem.attr("src", self.builder.getImage(self.expandImage));
                $elem.removeAttr("data-collapse");
                $content.show();
            }
        });
    };

    ToolBox.prototype.destroy = function () {
        this.className = null;
        this.builder = null;
        this.items = null;
        this.language = null;
        this.order = null;
        this.showLabel = null;
        this.localLanguage = null;

        this.elem.remove();
        this.elem = null;
    };

    /**
     * 右键菜单
     */
    function ContextMenu() {
        this.className = {
            container: "formbuilder-contextmenu",
            items: "formbuilder-contextmenu-items",
            item: "formbuilder-contextmenu-item",
            text: "formbuilder-contextmenu-item-text",
            image: "formbuilder-contextmenu-item-image"
        };

        this.template = {
            container: function (opt) {
                return ["<div class='", opt.className.container, "'><ul class='", opt.className.items, "'></ul></div>"].join("");
            },
            item: function (opt) {
                return [
                  "<li class='", opt.className.item, "' >",
                  "  <img class='", opt.className.image, "' src='", opt.image, "' />",
                  "  <a class='", opt.className.text, "' >", opt.text, " </a>",
                  "</li>"
                ].join("");
            }
        };

        this.elem;
        this.wrapElem;
        this.builder;
        this.design;
        this.container;
        this.grid;
        this.contextmenus = formbuilder.contextmenu;
    }

    ContextMenu.prototype.create = function (builder) {
        var html,
          className = this.className;

        this.builder = builder;
        this.design = builder.workspace;
        this.container = this.design.elem;
        this.grid = this.design.grid;

        html = this.template.container({
            className: {
                container: className.container,
                items: className.items
            }
        });

        this.elem = $(html);
        this.wrapElem = this.elem.find(">." + className.items);

        this.elem.appendTo("body");

        this.bindEvent();
    };

    ContextMenu.prototype.createItems = function ($cell) {
        var item,
          grid = this.grid,
          className = this.className,
          checkingCount = 0,
          $item,
          order = this.builder.options.contextmenu.order,
          contextmenus = this.contextmenus,
          html;

        for (var i = 0, len = order.length; i < len; i++) {
            item = contextmenus[order[i]];

            if (!item) {
                continue;
            }

            if (!item.checking($cell, grid)) {
                continue;
            }

            ++checkingCount;
            html = this.template.item({
                className: {
                    item: className.item,
                    image: className.image,
                    text: className.text
                },
                image: this.builder.getImage(item.image),
                text: item.getLocalText(item.text)
            });
            $item = $(html);

            this.wrapElem.append($item);
            this.bindItemEvent(item.fn, $item, $cell, grid);
        }

        if (checkingCount) {
            return true;
        }

        return false;
    };

    ContextMenu.prototype.bindItemEvent = function (fn, elem, target, grid) {
        var self = this;

        elem.on("click", function () {
            fn(target, grid);
            self.hide();
        });
    };

    ContextMenu.prototype.bindEvent = function () {
        var self = this,
          className = $.extend({}, this.design.className, self.grid.className),
          filter = [".", className.cell, ",.", className.index];

        this.container.on("contextmenu", filter, function (e) {
            var $cell = $(e.target).closest("td." + className.relateProperty),
              $document = $(document),
              p,
              checking;

            self.hide();
            self.grid.setSelectedCell($cell);
            checking = self.createItems($cell);
            if (!checking) {
                return false;
            }

            p = {
                top: e.clientY + $document.scrollTop() - 5,
                left: e.clientX + $document.scrollLeft() - 10
            };

            self.show(p);
            return false;
        });

        this.elem.on("mouseleave", function () {
            self.hide();
        });
        this.elem.on("contextmenu", function () {
            return false;
        });
    };

    ContextMenu.prototype.show = function (offset) {
        var elem = this.elem;

        elem.css({
            left: offset.left,
            top: offset.top
        });

        this.elem.show();
    };

    ContextMenu.prototype.hide = function () {
        this.elem.hide();
        this.wrapElem.empty();
    };

    ContextMenu.prototype.destroy = function () {
        this.className = null;
        this.builder = null;
        this.design = null;
        this.container = null;
        this.grid = null;
        this.wrapElem = null;
        this.contextmenus = null;
        this.elem.remove();
        this.elem = null;
    };

    /**
     * 分页栏
     */
    function Paging() {
        this.className = {
            "container": "formbuilder-paging",
            "wrap": "formbuilder-paging-wrap",
            "button": "formbuilder-paging-button",
            "btn-first": "formbuilder-paging-button-first",
            "btn-last": "formbuilder-paging-button-last",
            "btn-prev": "formbuilder-paging-button-prev",
            "btn-next": "formbuilder-paging-button-next",
            "btn-add": "formbuilder-paging-button-add",
            "btn-index": "formbuilder-paging-index",
            "btn-index-container": "formbuilder-paging-index-container",
            "btn-selected": "formbuilder-paging-button-selected"
        };

        this.IMAGES = {
            DEFAULT: {
                ADD: "paging-btn-add.png",
                FIRST: "paging-btn-first.png",
                LAST: "paging-btn-last.png",
                PREV: "paging-btn-prev.png",
                NEXT: "paging-btn-next.png"
            }
        };

        this.template = {
            container: function (opt) {
                var c = opt.className,
                  i = opt.images;

                return [
                  "<div class='", c["container"], "'>",
                  "<div class='", c["wrap"], "'>",
                  "  <div class='", c["button"], " ", c["btn-add"], "' style='background-image: url(", i.ADD, ")'>", "</div>",
                  "  <div class='", c["button"], " ", c["btn-first"], "' style='background-image: url(", i.FIRST, ")'>", "</div>",
                  "    <div class='", c["button"], " ", c["btn-prev"], "' style='background-image: url(", i.PREV, ")'>", "</div>",
                  "    <div class='", c["btn-index-container"], "'>",
                  "    </div>",
                  "    <div class='", c["button"], " ", c["btn-next"], "' style='background-image: url(", i.NEXT, ")'>", "</div>",
                  "    <div class='", c["button"], " ", c["btn-last"], "' style='background-image: url(", i.LAST, ")'>", "</div>",
                  "  </div>",
                  "</div>"
                ].join("");
            },
            index: function (opt) {
                return ["<div class='", opt.className["button"], " ", opt.className["btn-index"], " ",
                  (opt.index === opt.current ? opt.className["btn-selected"] : ""), "' ",
                  "data-index='", opt.index, "' ", ">", opt.index, "</div>"
                ].join("");
            }
        };

        this.elem;
        this.$pageCount;
        this.builder;
        this.pagesize;
        this.current = 1;
        this.count = 1;
    }

    Paging.prototype.create = function (elem, builder) {
        var html,
          self = this,
          images = {};

        this.builder = builder;
        this.workspace = builder.workspace;
        this.container = elem;

        this.count = this.workspace.page.count || 1;
        _.each(this.IMAGES.DEFAULT, function (img, i) {
            images[i] = self.builder.getImage(img);
        });
        html = this.template.container({
            className: this.className,
            images: images
        });
        this.elem = $(html);
        this.$pageCount = this.elem.find("." + this.className["btn-index-container"]);
        this.renderPageCount();
        this.elem.appendTo(elem);
        this.bindEvent();
    };

    Paging.prototype.renderPageCount = function () {
        var html,
          self = this;

        html = _.map(_.range(1, this.count + 1), function (i) {
            return self.template.index({
                className: self.className,
                index: i,
                current: self.current
            });
        });
        this.$pageCount.empty().append(html.join(""));
    };

    Paging.prototype.bindEvent = function () {
        var self = this;
        this.elem.on("click", "." + this.className["button"], function (e) {
            var $elem = $(this),
              current;

            if ($elem.hasClass(self.className["btn-add"])) {
                self.addNewPaging();
            }
            else if ($elem.hasClass(self.className["btn-first"])) {
                self.goPaging(1);
            }
            else if ($elem.hasClass(self.className["btn-last"])) {
                self.goPaging(self.count);
            }
            else if ($elem.hasClass(self.className["btn-prev"])) {
                current = self.current - 1;
                current = current < 1 ? 1 : current;
                self.goPaging(current);
            }
            else if ($elem.hasClass(self.className["btn-next"])) {
                current = self.current + 1;
                current = current >= self.count ? self.count : current;
                self.goPaging(current);
            }
            else if ($elem.hasClass(self.className["btn-index"])) {
                current = $elem.attr("data-index");
                current = Number(current);
                if (!isNaN(current)) {
                    self.goPaging(current);
                }
            }
        });

    };

    Paging.prototype.addNewPaging = function () {
        ++this.count;
        this.renderPageCount();
        this.goPaging(this.count);
    };

    Paging.prototype.goPaging = function (index) {
        if (this.builder.workspace.verify && this.builder.workspace.verify() === false) {
            return;
        }
        var $elem = this.elem;
        if (index === this.current) {
            return;
        }
        this.current = index;
        $elem.find("." + this.className["btn-index"]).removeClass(this.className["btn-selected"]);
        $elem.find("[data-index='" + index + "']").addClass(this.className["btn-selected"]);
        this.workspace.renderByPageIndex(index);
    };

    /**
     * 快捷方式
     */
    function ShortcutKey(builder) {
        this.items = formbuilder.shortcutKey;
        this.order = builder.options.shortcutKey.order;
        this.builder = builder;
        this.design = builder.workspace;
        this.grid = this.design.grid;
        this.keydownEvent;

        this.bindEvent();
    }

    ShortcutKey.prototype.bindEvent = function () {
        var self = this,
          items = this.items || [],
          order = this.order,
          item,
          className = $.extend({}, this.design.className, self.grid.className),
          grid = this.grid;

        $(document).on(
          "keydown",
          (this.keydownEvent = function (e) {
              var i, len, fn, selected;
              for (i = 0, len = order.length; i < len; i++) {
                  item = items[order[i]];
                  if (!item) {
                      continue;
                  }
                  // shiftKey altKey ctrlKey keyCode
                  if (
                    e.shiftKey === item.shiftKey &&
                    e.altKey === item.altKey &&
                    e.ctrlKey === item.ctrlKey &&
                    e.keyCode === item.keyCode
                  ) {
                      selected = grid.getSelected();

                      if (selected.length > 0 && item.targetType === "control") {
                          selected = selected.find("." + className.relateProperty);
                      }
                      if (item.checking.call(item, selected, grid)) {
                          fn = item.fn;
                          fn.call(item, selected, grid);
                          //e.preventDefault();
                      }
                  }
              }
          })
        );
    };

    ShortcutKey.prototype.destroy = function () {
        $(document).unbind("keydown", this.keydownEvent);
    };

    /**
     * 菜单
     */
    function Menu() {
        this.className = {
            container: "formbuilder-menu",
            items: "formbuilder-menu-items",
            item: "formbuilder-menu-item",
            split: "formbuilder-menu-split",
            arrowsdown: "formbuilder-menu-arrows-down",
            submenu: "formbuilder-menu-submenu",
            prev: "formbuilder-menu-btn-prev",
            next: "formbuilder-menu-btn-next"
        };

        this.image = {
            arrowsdown: "arrows-down.png"
        };

        this.menu = formbuilder.menu;
        this.menucontrol = formbuilder.menucontrol;
        this.order = [];
        this.items = [];

        this.builder;
        this.workspace;
        this.proerty;
        this.grid;

        this.$elem;
        this.$wrap;
        this.$container;
        this.$prev;
        this.$next;
    }

    Menu.prototype.create = function (container, builder) {
        this.builder = builder;
        this.workspace = builder.workspace;
        this.proerty = this.builder.proerty;
        this.grid = this.workspace.grid;
        this.order = builder.options.menu.order;
        this.$container = container;
        this.$wrap = $(["<div class='", this.className.container, "'>", "</div>"].join(""));
        this.$elem = $(["<div class='", this.className.items, "'>", "</div>"].join(""));

        this.$container.append(this.$wrap);
        this.$wrap.append(this.$elem);
        //test
        this.$elem.before(["<div class='", this.className.prev, "'>", "</div>"].join(""));
        this.$elem.after(["<div class='", this.className.next, "'>", "</div>"].join(""));
        this.createItems(this.order, "top", this.$elem);
    };

    Menu.prototype.createItems = function (order, level, $container, parentItem) {
        var menu = this.menu,
          menucontrol = this.menucontrol,
          item,
          _order;

        for (var i = 0, len = order.length; i < len; i++) {
            _order = order[i];

            if (_order instanceof Array) {
                this.createItems(_order, level, $container);
                this.createSplitItem(level, i, len);
            } else {
                if (typeof _order === "string") {
                    item = menucontrol[_order];
                } else {
                    item = menucontrol[_order.name];
                }
                if (item && menu[item.type]) {
                    this.createItem(item, _order, level, $container, parentItem);
                }
            }
        }
    };

    Menu.prototype.createSplitItem = function (level, index, length) {
        if (level === "top" && index !== length - 1) {
            this.$elem.append(["<div class='", this.className.split, "' ><div></div></div>"].join(""));
        }
    };

    Menu.prototype.createItem = function (item, order, level, $container, parentItem) {
        var element,
          menu = this.menu,
          options = item.options,
          type = item.type;

        //初始化参数
        element = $.extend(true, {}, menu[type], {
            options: options,
            builder: this.builder,
            config: item,
            container: $container,
            level: level
        });
        element.parent = parentItem || null;
        //创建元素及绑定事件
        element.elem = element.create();
        element.elem.addClass(this.className.item);
        element.bindEvent && element.bindEvent();
        //绑定更新事件
        this.bindElementUpdateEvent(element);
        $container.append(element.elem);
        //创建下级菜单
        this.createSubmenu(item, order, element);

        this.items.push(element);

        return element;
    };

    Menu.prototype.createSubmenu = function (item, order, element) {
        var $container = element.elem,
          $top = $container.children(),
          $arrowsDown,
          $submenu,
          self = this;

        if (order.children && order.children.length > 0) {
            $top.attr("href", "javascript:void(0)");
            $submenu = $(["<div class='", this.className.submenu, "'>", "<div></div>", "</div>"].join(""));

            //针对submenu容器内的input类型html元素,特殊处理
            //1.禁止隐藏submenu
            //2.失去焦点时隐藏
            $submenu.mousedown(function (e) {
                if (e.target.nodeName.toUpperCase() === "INPUT") {
                    $top.attr("data-stop-blur-event", true);
                } else {
                    e.preventDefault();
                }
            });

            $submenu.on("blur", "input", function () {
                self.hideSubmenu($submenu, $arrowsDown);
            });

            $arrowsDown = $(
              [
                "<span class='",
                this.className.arrowsdown,
                "'>",
                "<img src='",
                this.builder.getImage(this.image.arrowsdown),
                "'",
                "/>",
                "</span>"
              ].join("")
            ).mousedown(function (e) {
                var elem = $(this),
                  setTimeoutId;

                if (elem.attr("data-open")) {
                    self.hideSubmenu($submenu, elem);
                    $top.removeAttr("data-stop-blur-event");
                } else {
                    $top[0].focus();
                    $top.attr("data-stop-blur-event", true);
                    self.showSubmenu($submenu, elem);

                    setTimeoutId = $top.attr("data-setTimeoutId");
                    if (setTimeoutId) {
                        clearTimeout(setTimeoutId);
                    }
                    setTimeoutId = setTimeout(function () {
                        if ($arrowsDown.attr("data-open")) {
                            $top.removeAttr("data-stop-blur-event");
                        }
                    }, 200);
                    $top.attr("data-setTimeoutId", setTimeoutId);
                }

                e.preventDefault();
            });

            $top.on("blur", function () {
                setTimeout(function () {
                    if ($top.attr("data-stop-blur-event")) {
                        $top.removeAttr("data-stop-blur-event");
                        return;
                    }
                    self.hideSubmenu($submenu, $arrowsDown);
                }, 200);
            });

            $container.append($arrowsDown);
            $container.append($submenu);
            element.arrows = $arrowsDown;
            this.createSubmenuItems(element, order.children, $submenu);
        }
    };

    Menu.prototype.createSubmenuItems = function (parentItem, order, $container) {
        this.createItems(order, "sub", $container, parentItem);
    };

    Menu.prototype.showSubmenu = function ($submenu, $arrows) {
        $submenu.show();
        $arrows.attr("data-open", "true");
    };

    Menu.prototype.hideSubmenu = function ($submenu, $arrows) {
        $arrows.removeAttr("data-open");
        $submenu.hide();
    };

    Menu.prototype.hideAllSubmenu = function () {
        this.$elem.find(">div>a,>div>input").each(function () {
            this.blur();
        });
    };

    Menu.prototype.bindElementUpdateEvent = function (element) {
        var elem = element.elem,
          events = element.updateEvent && element.updateEvent(),
          event,
          self = this;

        if (!events) {
            return;
        }

        for (var i = 0, len = events.length; i < len; i++) {
            event = events[i];
            elem.on(event.name, event.filter, function () {
                var parent;
                self.updateSelectedRange(element);
                //二级菜单自动关闭
                if (element.level === "sub") {
                    self.hideSubmenu(element.container, element.parent.arrows);
                    parent = element.parent;
                    if (parent && parent.config.keepSubmenu && parent.config.type === element.config.type) {
                        self.updateTopMenu(parent, element);
                    }
                }
                return false;
            });
        }
    };

    Menu.prototype.updateTopMenu = function (parentElement, currentElement) {
        var newOpt = currentElement.options;

        $.extend(parentElement.config.options, newOpt);
        $.extend(parentElement.options, newOpt);

        parentElement.updateImage(newOpt.image);
    };

    Menu.prototype.updateSelectedRange = function (element) {
        var grid = this.grid,
          cells,
          config = element.config,
          elems;

        cells = grid.getSelected();
        if (cells.length === 0 && config.target) {
            return;
        }

        elems = this.getSelectedRange(config, cells);
        this.updatePropertiesBySelectedRange(element, elems);
        this.updateSelectedRangeByCustomer(element, elems);
    };

    Menu.prototype.getSelectedRange = function (config, cells) {
        var elems;

        if (config.target === "cell") {
            elems = cells;
        } else if (config.target === "control") {
            elems = cells.find("." + this.workspace.className.relateProperty);
        }

        return elems;
    };

    Menu.prototype.updatePropertiesBySelectedRange = function (element, elems) {
        var self = this,
          config = element.config,
          pattern = this.builder.options.pattern,
          params = {
              names: element.options.name,
              values: element.options.value
          };

        if (config.property === true) {
            if (typeof config.fn === "function") {
                //菜单控件配置fn配置项中传入更新属性callback方法
                //方法体中，更改value值后，可以执行callback()方法，执行刷新属性操作
                config.fn.call(element, function callback() {
                    formbuilder.updatePropertiesBySelecteds(pattern, self.grid, params.names, params.values, elems);
                });
            } else {
                formbuilder.updatePropertiesBySelecteds(pattern, self.grid, params.names, params.values, elems);
            }
        }
    };

    Menu.prototype.updateSelectedRangeByCustomer = function (element, elems) {
        var config = element.config;

        if (config.property === false && typeof config.fn === "function") {
            config.fn.call(element, elems, this.grid);
        }
    };

    Menu.prototype.updateItems = function ($cell) {
        var i,
          len,
          item,
          items = this.items,
          grid = this.grid,
          type = $cell.attr("data-type"),
          field = $cell.attr("data-property-field"),
          position = formbuilder.getPosition($cell),
          cell = grid.getPropertyData(type, field, position),
          control = grid.getPropertyData(null, null, position),
          info,
          value,
          parent;

        for (i = 0, len = items.length; i < len; i++) {
            info = null;
            item = items[i];
            if (item.config.property) {
                if (item.config.target === "cell") {
                    info = cell;
                } else if (item.config.target === "control" && control) {
                    info = control;
                }
            }

            if (info !== null) {
                value = info[item.config.options.name];
                parent = item.parent;
                if (parent && parent.config.keepSubmenu) {
                    if (item.options.value === value) {
                        this.updateTopMenu(item.parent, item);
                    }
                }
                item.setActive(value);
            } else {
                item.setActive(null);
            }
        }
    };

    Menu.prototype.destroy = function () {
        this.className = null;

        this.menu = null;
        this.menucontrol = null;
        this.order = null;
        this.builder = null;
        this.workspace = null;
        this.proerty = null;
        this.grid = null;

        this.$elem = null;
        this.$wrap = null;
        this.$container = null;

        this.$wrap.remove();
    };

    /**
     * 表单设计器
     * @param {*} elem
     * @param {*} options
     */
    function Formbuilder(elem, options) {
        this.className = {
            builder: "formbuilder",
            design: "formbuilder-design",
            applying: "formbuilder-applying",
            view: "formbuilder-view",
            autoHeight: "formbuilder-height-auto",
            hasPaging: "formbuilder-has-paging",
            dragging: "formbuilder-item-dragging"
        };

        this.elem = elem;
        this.toolbox;
        this.workspace;
        this.contextmenu;
        this.paging;
        this.drake;
        this.options;
        this.autoResize = true;

        this.init(options);
        this.create();
    }

    Formbuilder.prototype.init = function (options) {
        var _toolbox = options.toolbox,
          toolbox = {},
          property = {},
          config;

        config = $.extend(true, {}, formbuilder.config);
        //toolbox
        if (_toolbox && typeof _toolbox === "object") {
            for (var i in _toolbox) {
                toolbox[i] = formbuilder.toolbox._add(i, _toolbox[i]);
            }
            toolbox = $.extend(true, {}, formbuilder.toolbox, toolbox);
        } else {
            toolbox = $.extend(true, {}, formbuilder.toolbox);
        }
        options.toolbox = {};
        //property
        property = $.extend(true, {}, formbuilder.property);
        //menu
        if (options.menu && options.menu.order && options.menu.order.length > 0) {
            if (options.menu.type === "replace") {
                config.menu.order = options.menu.order;
            }
            else {
                config.menu.order = config.menu.order.concat(options.menu.order);
            }

            delete options.menu.order;
        }
        //control
        if (options.control && options.control.order && options.control.order.length > 0) {
            config.control.order = options.control.order;
            delete options.control.order;
        }
        //合并参数
        this.options = $.extend(true, config, options, {
            toolbox: toolbox,
            property: property
        });

        if (!this.options.data) {
            this.options.data = {};
        }

        if (this.options.autoResize === false) {
            this.autoResize = false;
        }
    };

    Formbuilder.prototype.create = function () {
        var pattern = this.options.pattern,
          className = [this.className.builder, this.className[pattern]].join(" ");

        this.resize(this.options.width, this.options.height);
        this.elem.addClass(className);

        switch (pattern) {
            case "design":
                this.createDesignWorkspace();
                this.createMenu();
                break;
            case "applying":
                this.createApplyingWorkspace();
                break;
            case "view":
                this.createViewWorkspace();
                break;
            default:
                break;
        }

        this.bindReisze();
    };

    Formbuilder.prototype.createMenu = function () {
        this.menu = new Menu();
        this.menu.create(this.elem, this);
    };

    Formbuilder.prototype.createDesignWorkspace = function () {
        var container = this.elem,
          $design = $("<div></div>"),
          $toolbox = $("<div></div>"),
          $proerty = $("<div></div>");

        this.toolbox = new ToolBox();
        this.toolbox.create($toolbox, this);
        this.proerty = new Property();
        this.proerty.create($proerty, this);

        this.elem.append($toolbox);
        this.elem.append($design);
        this.elem.append($proerty);

        this.workspace = new DesignWorkspace();
        this.workspace.create($design, this);
        this.proerty.grid = this.workspace.grid;

        this.bindDrag();

        this.contextmenu = new ContextMenu();
        this.contextmenu.create(this);

        this.shortcutKey = new ShortcutKey(this);

        this.showProperty("_table", "table", { x: -1, y: -1 });

        container.on("contextmenu", function () {
            return false;
        });

    };

    Formbuilder.prototype.createApplyingWorkspace = function () {
        var $applying = $("<div></div>");
        //options=this.options;

        this.elem.append($applying);
        this.workspace = new ApplyingWorkspace();
        this.workspace.create($applying, this);
        this.createPaging();
    };

    Formbuilder.prototype.createViewWorkspace = function () {
        var $view = $("<div></div>");

        this.elem.append($view);
        this.workspace = new ViewWorkspace();
        this.workspace.create($view, this);
        this.createPaging();
    };

    Formbuilder.prototype.createPaging = function () {
        var options = this.options;

        if (options && this.options.data.table.paging) {
            this.elem.addClass(this.className.hasPaging);
            this.paging = new Paging();
            this.paging.create(this.elem, this);
        }
    };

    Formbuilder.prototype.showProperty = function (type, field, position) {
        var workspace = this.workspace,
          grid = workspace.grid,
          control = grid.getPropertyControl(type, position),
          data = grid.getPropertyData(type, field, position),
          items = grid.getPropertyItems(type, field, position);

        this.proerty.show(items, data, position, control);
    };

    Formbuilder.prototype.getDrakeContainers = function () {
        var workspace = this.workspace,
          toolbox = this.toolbox,
          $toolbox = toolbox.elem.find("." + toolbox.className.itemContent).toArray(),
          $design = workspace.elem.find("." + workspace.className.enableDrop).toArray(),
          container = $design.concat($toolbox);

        return container;
    };

    Formbuilder.prototype.bindDrag = function () {
        var builder = this,
          design = this.workspace,
          toolbox = this.toolbox,
          containers = this.getDrakeContainers();

        var drake = dragula(containers, {
            moves: function (el, source, handle) {
                var className = "." + toolbox.className.itemContent,
                  $elem;

                formbuilder.log("into moves");
                $elem = $(handle).closest(className);

                return $elem.length > 0;
            },
            copy: function (el) {
                return $(el).hasClass(toolbox.className.item);
            },
            accepts: function (el, target) {
                var container = $(target),
                  checked;

                checked =
                  container.hasClass(design.className.enableDrop) && container.find("." + design.className.item).length === 0;

                return checked;
            }
        });

        drake.on("cloned", function (clone) {
            $(clone).addClass(builder.className.dragging);
        });

        drake.on("drop", function (el, target, source) {
            var $el, $elParent, $source, className, position, path;

            formbuilder.log("into drop");
            $el = $(el);
            $elParent = $el.parent();
            $source = $(source);
            className = design.className;

            if (!target && $elParent.length === 0) {
                return;
            }

            position = formbuilder.getPosition($elParent);

            if (!$source.hasClass(className.enableDrop)) {
                //从工具栏中拖拽至网格
                path = ($el.attr("data-path") || "").split(" ");
                design.addControl($el, { path: path }, position);
            }

            formbuilder.log("moves: " + drake.dragging);
        });

        drake.on("dragend", function () {
            formbuilder.log("into dragend");
        });

        drake.on("drag", function () {
            formbuilder.log("into drag");
        });

        drake.on("cancel", function () {
            formbuilder.log("into cancel");
        });

        this.drake = drake;
    };

    Formbuilder.prototype.updateProperty = function ($elem) {
        var type = $elem.attr("data-type"),
          field = $elem.attr("data-property-field"),
          position = formbuilder.getPosition($elem);

        this.contextmenu.hide();
        this.showProperty(type, field, position);
    };

    Formbuilder.prototype.isDraging = function () {
        return $("body>div." + this.className.dragging).length > 0;
    };

    Formbuilder.prototype.loadData = function (data) {
        var workspace = this.workspace,
          grid = workspace.grid;

        this.options.data = data;
        this.workspace.data = data;
        grid.options = data;

        grid.update();
        workspace.renderGrid();
        this.showProperty("_table", "table", { x: -1, y: -1 });
    };

    Formbuilder.prototype.getData = function () {
        return this.workspace.getData();
    };

    Formbuilder.prototype.export = function () {
        return this.workspace.exportData();
    };

    Formbuilder.prototype.check = function () {
        return this.workspace.checkValue();
    };

    Formbuilder.prototype.resize = function (width, height) {
        var parent = this.elem.parent(),
          pattern = this.options.pattern,
          _height;

        _height = height || parent.height();
        if (!height && (_height <= 0 || parent[0].nodeName.toUpperCase() === "BODY")) {
            //_height = this.options._height;
            _height = "auto";
            this.elem.addClass(this.className.autoHeight);
        }
        else {
            this.elem.removeClass(this.className.autoHeight);
        }
        width = width || "100%";

        this.elem.width(width);
        if (pattern === "design" && _height === "auto") {
            _height = $(window).height() - 12;
        }

        this.elem.height(_height);
    };

    Formbuilder.prototype.resizeControls = function () {
        var controls,
          rowLength,
          cellsLength,
          i,
          j,
          cells,
          control,
          properties,
          pattern = this.options.pattern,
          data;

        if (!this.workspace) {
            return;
        }

        controls = this.workspace.grid.options.controls;

        for (i = 0, rowLength = controls.length; i < rowLength; i++) {
            cells = controls[i];
            for (j = 0, cellsLength = cells.length; j < cellsLength; j++) {
                control = cells[j];

                if (control && control.options) {
                    properties = control.property;
                    data = control.options;
                    if (data.width !== null) {
                        formbuilder.updateProperty(pattern, "width", control, data, properties);
                    }
                    if (data.height !== null) {
                        formbuilder.updateProperty(pattern, "height", control, data, properties);
                    }
                }
            }
        }
    };

    Formbuilder.prototype.resizeAll = function (width, height) {
        this.resize(width, height);
        this.resizeControls();
    };

    Formbuilder.prototype.bindReisze = function () {
        var self = this;

        if (!this.autoResize) {
            return;
        }

        $(window).resize(function () {
            self.resizeAll();
        });
    };

    Formbuilder.prototype.getImage = function (name) {
        return formbuilder.getImage(this.options.url.images, name);
    };

    Formbuilder.prototype.destroy = function () {
        var workspace,
          pattern = this.options.pattern;

        if (pattern === "design") {
            this.drake.destroy();
            this.elem.unbind();
            this.toolbox.destroy();
            this.proerty.destroy();
            this.contextmenu.destroy();
            this.shortcutKey.destroy();
        }

        workspace = this.workspace;
        workspace.elem.unbind();
        workspace = workspace.grid;
        workspace.grid = null;
        workspace.destroy();
        workspace = null;

        this.elem.empty();
        this.elem.removeAttr("style class");

        this.options = null;
        this.applying = null;
        this.toolbox = null;
        this.proerty = null;
        this.design = null;
        this.contextmenu = null;
        this.drake = null;
        this.elem = null;
    };

    /**
     * PUBLIC API
     */
    /**
     * @memberof jQuery
     * @namespace jQuery.fn
     * @alias jQuery.fn.formbuilder
     * @description jQuery 实例
     */
    /**
     * @memberof  jQuery.fn
     * @namespace jQuery.fn.formbuilder
     * @alias jQuery.fn.formbuilder
     * @description formbuilder API formbilder控件API
     */
    var methods = {
        /**
         * @memberof  jQuery.fn.formbuilder
         * @instance
         * @function
         * @alias formbuilder
         * @param {string} ['init'='init']
         * @param {Config} options 初始化创建参数
         * @description 创建formbuilder实例
         * @example
         *
         * $(element).formbuilder('init',options);
         * //或者
         * $(element).formbuilder(options);
         */
        init: function (options, $elem) {
            if (arguments.length === 1) {
                $elem = arguments[0];
                options = {};
            }
            $elem.empty();
            $elem.removeClass("formbuilder formbuilder-applying");
            $elem.data("formbuilder", new Formbuilder($elem, options));

            return $elem;
        },
        /**
         * @memberof  jQuery.fn.formbuilder
         * @instance
         * @function
         * @alias formbuilder
         * @param {string} 'resize'='resize'
         * @param {Size} size  高度和宽度
         * @description 重置大小
         * @example
         *
         * $(element).formbuilder('resize',{width:1200,height:600});
         */
        resize: function (size, $elem) {
            /**
             * @class Size
             * @alias Size
             * @description 控件尺寸
             * @type {object}
             */
            this.resizeAll(
              /**
               * @memberof Size
               * @member
               * @alias width
               * @type {number|string}
               * @description 宽度
               */
              size.width,
              /**
               * @memberof Size
               * @member
               * @alias height
               * @type {number|string}
               * @description 高度
               */
              size.height
            );

            return $elem;
        },
        /**
         * @memberof  jQuery.fn.formbuilder
         * @instance
         * @function
         * @alias formbuilder
         * @param {string} 'data'='data'
         * @param {Data} [data=data]  数据信息
         * @description 获取、加载数据
         * @example
         *
         * // 加载数据
         * $(element).formbuilder('data',data);
         *
         * // 获取数据
         * $(element).formbuilder('data');
         */
        data: function (data) {
            if (arguments.length === 2) {
                this.loadData(data);
            } else {
                return this.getData();
            }
        },
        export: function () {
            return this.export();
        },
        check: function () {
            return this.check();
        },
        /**
         * @memberof  jQuery.fn.formbuilder
         * @instance
         * @function
         * @alias formbuilder
         * @param {string} 'getDataByCell'='getDataByCell'
         * @param {HTMLElement} cell  单元格
         * @description 获取数据
         * @example
         *
         *
         * // 获取数据
         * $(element).formbuilder('getDataByCell',cell);
         */
        getDataByCell: function (cell) {
            return this.workspace.getDataByCell(cell);
        },
        insertDatasetRows: function (data) {
            return this.workspace.insertDatasetRows(data);
        },
        /**
         * @memberof  jQuery.fn.formbuilder
         * @instance
         * @function
         * @alias formbuilder
         * @param {string} 'destroy'='destroy'
         * @description 销毁formbuilder实例
         * @example
         *
         * $(element).formbuilder('destroy');
         */
        destroy: function ($elem) {
            //先删除内存数据，防止内存泄漏
            $elem.removeData("formbuilder");
            this.destroy();
            return $elem;
        }
    };

    /**
     *
     * @description 使用formbuilder
     * @alias $(element).formbuilder()
     */
    jQuery.fn.formbuilder = function () {
        var method = arguments[0],
          arg = arguments,
          instance = this.data("formbuilder");

        if (methods[method]) {
            method = methods[method];
            arg = Array.prototype.slice.call(arguments, 1);
        } else if (typeof method === "object" || !method) {
            arg = Array.prototype.slice.call(arguments);
            method = methods.init;
        } else {
            $.error("Method " + method + " does not exist on jQuery.formbuilder");
            return this;
        }

        if (!instance && method !== methods.init) {
            $.error("jQuery.formbuilder not instance");
            return this;
        }

        arg.push(this);
        return method.apply(instance, arg);
    };
})(jQuery, _, dragula, window);

/* global jQuery */

(function ($) {
    "use strict";

    /**
     * @memberof jQuery.formbuilder
     * @class Language
     * @alias Language
     * @description 工具栏多语言配置对象
     */

    $.formbuilder.language["en"] = {
        /**
         * @memberof Language
         * @instance
         * @description 工具栏多语言配置
         * @type {object<string,string>}
         */
        toolbox: {
            table: "Table",
            label: "Label",
            textbox: "TextBox",
            hidden: "HiddenInput",
            textarea: "TextArea",
            date: "Date",
            time: "Time",
            checkboxgroup: "ChecBoxGroup",
            radiogroup: "RadioGroup",
            select: "Select",
            button: "Button",
            textvalue: "TextValue",
            image: "Image",
            fileupload: "FileUpload",
            delete: "Delete",
            link: "Link",
            "unchecked": "Unchecked",
            "multipleSelect": "Multipe Select"
        },
        /**
         * @memberof Language
         * @instance
         * @description 属性栏多语言配置
         * @type {object<string,string>}
         */
        property: {
            "language": "English",
            "multi-language": "Multi Language",
            //基本类型
            "label": "Label",
            "name": "Name",
            "value": "Value",
            "check": "Check",
            "className": "ClassName",
            "operate": "Operate",
            "placeholder": "Placeholder",
            "options": "Options",
            "items": "Options",
            "removeOption": "Remove Option",
            "text": "Text",
            "addOption": "Add Option",
            "regex": "Regular Expression",
            "width": "Width",
            "height": "Height",
            "none":"None",
            //网格容器
            "table-width": "Table Width",
            "table-height": "Table Height",
            "table-rows": "Table Rows",
            "table-columns": "Table Columns",
            "table-row-height": "Row Height",
            "table-column-width": "Column Width",
            "table-center": "Table Center",
            "print-size":"Print Size",
            "print-direction":"Print Direction",
            "print-direction-v":"Vertical",
            "print-direction-h":"Horizontal",
            "a3":"A3",
            "a4":"A4",
            //跨行
            "table-cell-rowspan": "RowSpan",
            "table-cell-colspan": "ColSpan",
            //单元格合并
            "table-cells-merge": "Merge",
            "table-cells-split": "Split",
            "table-cells-operate": "Cells Operate",
            //边框
            "table-border": "Table Border",
            "border-solid": "Solid",
            "border-dashed": "Dashed",
            "border-solid-heavy": "Heavy Solid",
            "border-solid-double": "Double Solid",
            "border-none": "None",
            "background-color": "Background Color",
            "border-color": "Border Color",
            "border-all":"Border All",
            "border-left":"Border Left",
            "border-right":"Border Right",
            "border-top":"Border Top",
            "border-bottom":"Border Bottom",
            "cell-border-position":"Cell Border Position",
            //斜线
            "obliqueline": "Oblique Line",
            //对齐
            "align": "Align",
            "align-left": "Left",
            "align-center": "Center",
            "align-right": "Right",
            "vertical-align": "Vertical Align",
            "vertical-align-top": "Top",
            "vertical-align-middle": "Middle",
            "vertical-align-bottom": "Bottom",
            "text-align": "Text Align",
            "text-vertical-align": "Text Vertical Align",
            //字体
            "font-family": "Font Family",
            "font-size": "Font Size",
            "font-weight": "Font Weight",
            "font-style-italic": "Italic",
            "color": "Color",
            //文本
            "text-decoration-underline": "Underline",
            "line-height": "Line Height",
            "indent": "Indent",
            "word-vertical": "Word Vertical",
            //边框
            "cell-border-style": "Border Style",
            "cell-border-display": "Border Display",
            "image-upload": "Image Upload",
            "rows": "Rows",
            "ok": "Ok",
            "overflow": "overflow",
            "field": "bind field",
            "id": "id",
            "top-parent": "Top Parent",
            "left-parent": "Left Parent",
            //数据集
            "relation-position": "Relation Position",
            "relation-type": "Relation Type",
            "filed-relation": "Field Relation",
            "direction-horizontal": "Direction Horizontal",
            "direction-vertical": "Direction Vertical",
            "extension-direction": "Extension Direction",
            "fill-dynamic-data":"Fill Dynamic Data",
            //分页
            "anchoring": "Anchoring",
            "paging": "Paging",
            //级联
            "cascade-source": "Cascade Source",
            "cascade-control": "Cascade Control",
            "row-and-col": "row:col",
            //图片
            "equal-ratio": "Equal Ratio",
            "equal-ratio-width": "Equal Ratio By Width",
            "equal-ratio-height": "Equal Ratio By Height",
            "fixed-value": "Fixed Value",
            "remove-all": "Remove All"
        },
        /**
         * @memberof Language
         * @instance
         * @description 右键菜单多语言配置
         * @type {object<string,string>}
         */
        contextmenu: {
            "remove": "Remove",
            "merge": "Merge Cells",
            "canel-merge": "Split Cell",
            "cut": "Cut",
            "copy": "Copy",
            "paste": "Paste",
            "insert-row": "Insert Row",
            "insert-column": "Insert Column",
            "remove-row": "Remove Row",
            "remove-column": "Remove Column"
        },
        menu: {
            "table-cells-merge": "Merge",
            "table-cells-split": "Split",
            "table-cells-operate": "Cells Operate",
            "table-border": "Table Border",
            "border-solid": "Solid",
            "border-dashed": "Dashed",
            "border-none": "None",
            "align": "Align",
            "align-left": "Left",
            "align-center": "Center",
            "align-right": "Right",
            "vertical-align": "Vertical Align",
            "vertical-align-top": "Top",
            "vertical-align-middle": "Middle",
            "vertical-align-bottom": "Bottom",
            "font-family": "Font Family",
            "font-size": "Font Size",
            "font-weight": "Font Weight",
            "font-style-italic": "Italic",
            "color": "Color",
            "cell-border-color": "Cell Border Color",
            "cell-background-color": "Cell Background Color",
            "text-decoration-underline": "Underline",
            "cell-border-style": "Border Style",
            "cell-border-display": "Border Display",
            "image-upload": "Image Upload",
            "remove": "Remove",
            "merge": "Merge Cells",
            "canel-merge": "Split Cell",
            "cut": "Cut",
            "copy": "Copy",
            "paste": "Paste",
            "ok": "Ok"
        }
    };
})(jQuery);

/* global jQuery */

(function ($) {
    $.formbuilder.language["zh-CN"] = {
        toolbox: {
            title: "工具栏",
            table: "网格",
            label: "标签",
            textbox: "文本框",
            hidden: "隐藏文本框",
            textarea: "多行文本框",
            date: "日期",
            time: "时间",
            checkboxgroup: "多选按钮组",
            radiogroup: "单选按钮组",
            select: "下拉选择",
            button: "功能按钮",
            textvalue: "自定义选择按钮",
            image: "图片",
            fileupload: "文件上传",
            delete: "删除",
            link: "超链接",
            "unchecked": "未通过验证",
            "multipleSelect": "多选标签组",
            "remove-all": "清空"
        },
        property: {
            "language": "中文",
            "multi-language": "默认多语言",
            "title": "属性",
            "label": "标签",
            "name": "名称",
            "text": "显示值",
            "value": "值",
            "check": "验证",
            "className": "样式名称",
            "placeholder": "占位符",
            "options": "选项",
            "items": "选项",
            "operate": "操作",
            "removeOption": "删除选项",
            "addOption": "添加选项",
            "regex": "正则验证",
            "width": "宽度",
            "height": "高度",
            "none": "无",
            //网格容器
            "table-width": "网格宽度",
            "table-height": "网格高度",
            "table-rows": "网格行数",
            "table-columns": "网格列数",
            "table-row-height": "行高",
            "table-column-width": "列宽",
            "table-center": "网格居中",
            "table-cell-rowspan": "跨行",
            "table-cell-colspan": "跨列",
            "table-cells-operate": "单元格操作",
            "table-cells-merge": "合并",
            "table-cells-split": "拆分",
            "print-size": "打印纸张",
            "print-direction":"打印方向",
            "print-direction-v":"纵向",
            "print-direction-h":"横向",
            "a3": "A3",
            "a4": "A4",
            //边框
            "table-border": "边框",
            "border-solid": "实线",
            "border-dashed": "虚线",
            "border-solid-heavy": "粗实线",
            "border-solid-double": "双实线",
            "border-none": "无",
            "background-color": "背景色",
            "border-color": "边框颜色",
            "border-all": "全部",
            "border-left": "左边",
            "border-right": "右边",
            "border-top": "上边",
            "border-bottom": "下边",
            "cell-border-position": "边框位置",
            "obliqueline": "斜线",
            //对齐
            "align": "水平对齐",
            "align-left": "居左",
            "align-center": "居中",
            "align-right": "居右",
            "vertical-align": "垂直对齐",
            "vertical-align-top": "居上",
            "vertical-align-middle": "居中",
            "vertical-align-bottom": "居下",
            "text-align": "文字水平",
            "text-vertical-align": "垂直对齐",
            //字体
            "font-family": "字体类型",
            "font-size": "字体大小",
            "font-weight": "字体加粗",
            "font-style-italic": "斜体",
            "color": "字体颜色",
            //文本
            "text-decoration-underline": "下划线",
            "line-height": "行高",
            "indent": "文本缩进",
            "cell-border-style": "边框类型",
            "cell-border-display": "边框显示",
            "word-vertical": "纵向文字",

            "image-upload": "图片上传",
            "rows": "行数",
            "ok": "确定",
            "overflow": "滚动条",
            "field": "绑定字段",
            "id": "编号",
            //数据集
            "top-parent": "上父",
            "left-parent": "左父",
            "filed-relation": "字段关联",
            "relation-type": "关联类型",
            "relation-position": "关联位置",
            "direction-horizontal": "横向扩展",
            "direction-vertical": "纵向扩展",
            "extension-direction": "扩展方向",
            "fill-dynamic-data": "动态数据",
            //分页
            "anchoring": "分页锚定",
            "paging": "分页栏",
            //级联
            "cascade-source": "数据源",
            "cascade-control": "级联元件",
            "row-and-col": "行:列",
            //图片
            "equal-ratio": "等比缩放",
            "equal-ratio-width": "按宽度等比缩放",
            "equal-ratio-height": "按高度等比缩放",
            "fixed-value": "固定值"
        },
        contextmenu: {
            "remove": "删除",
            "merge": "合并单元格",
            "canel-merge": "取消合并单元格",
            "cut": "剪切",
            "copy": "拷贝",
            "paste": "粘贴",
            "insert-row": "插入行",
            "insert-column": "插入列",
            "remove-row": "删除行",
            "remove-column": "删除列"
        },
        menu: {
            "table-cells-merge": "合并",
            "table-cells-split": "拆分",
            "table-border": "边框",
            "border-solid": "实线",
            "border-dashed": "虚线",
            "border-solid-heavy": "粗实线",
            "border-solid-double": "双实线",
            "border-none": "无",
            "align": "水平对齐",
            "align-left": "居左",
            "align-center": "居中",
            "align-right": "居右",
            "vertical-align": "垂直对齐",
            "vertical-align-top": "居上",
            "vertical-align-middle": "居中",
            "vertical-align-bottom": "居下",
            "font-family": "字体类型",
            "font-size": "字体大小",
            "font-weight": "字体加粗",
            "font-style-italic": "斜体",
            "color": "字体颜色",
            "cell-border-color": "边框颜色",
            "cell-background-color": "背景颜色",
            "text-decoration-underline": "下划线",
            "cell-border-style": "边框类型",
            "cell-border-display": "边框显示",
            "image-upload": "图片上传",
            "remove": "删除",
            "merge": "合并单元格",
            "canel-merge": "取消合并单元格",
            "cut": "剪切",
            "copy": "拷贝",
            "paste": "粘贴",
            "ok": "确定"
        }
    };
})(jQuery);

/* global jQuery _ */
(function ($, _) {
    /**
     * @memberof jQuery.formbuilder
     * @class ToolBox
     * @alias ToolBox
     * @description 元件配置对象
     */

    $.formbuilder.toolbox._base = {
        /**
         * @memberof ToolBox
         * @instance
         * @type {string}
         * @description 元件类型，唯一 （设计、填报、浏览模式使用）
         */
        type: "",
        /**
         * @memberof ToolBox
         * @instance
         * @type {string}
         * @description 工具栏元件的显示名称 （设计模式使用）
         */
        title: "",
        /**
         * @memberof ToolBox
         * @instance
         * @type {string}
         * @description 工具栏元件的图标 （设计模式使用）
         */
        icon: "",
        /**
         * @memberof ToolBox
         * @instance
         * @type {jQueryElement}
         * @description 当前创建的DOM元素：代码自动赋值
         */
        elem: null,
        /**
         * @memberof ToolBox
         * @instance
         * @type {string}
         * @description 右键菜单配置名称 （设计模式使用）
         */
        contextmenu: "control",
        /**
         * @memberof ToolBox
         * @instance
         * @type {jQueryElement}
         * @description 当前创建的DOM元素的容器 （设计、填报、浏览模式使用）
         */
        language: "zh-CN",
        className: "",
        /**
         * @memberof ToolBox
         * @instance
         * @type {jQueryElement}
         * @description 当前创建的DOM元素的容器：代码自动赋值
         */
        container: null,
        /**
         * @class Data-Control
         * @alias Data-Control
         * @description 元件数据结构
         * @instance
         */
        /**
         * @memberof ToolBox
         * @alias options
         * @instance
         * @type {Data-Control}
         * @description 元件的信息 （对象中会自动添加type属性，即元件的类型）（设计、填报、浏览模式使用）
         */
        options: {
            /**
             * @description 控件类型（唯一标识符）
             * @memberof  Data-Control
             * @type {string}
             * @instance
             * */
            type: null,
            /**
             * @description 水平对齐方式
             * @memberof  Data-Control
             * @type {'left'|'center'|'right'}
             * @instance
             * @default
             * */
            align: "left",
            /**
             * @description 垂直对齐方式
             * @memberof  Data-Control
             * @type {'top'|'middle'|'bottom'}
             * @instance
             * @default
             * */
            "vertical-align": "middle",
            /**
             * @description 文字对齐方式
             * @memberof  Data-Control
             * @type {'left'|'center'|'right'}
             * @instance
             * @default
             * */
            "text-align": "left",
            /**
             * @description 文字对齐方式
             * @memberof  Data-Control
             * @type {'left'|'center'|'right'}
             * @instance
             * @default
             * */
            "text-vertical-align": "middle",
            /**
             * @description 宽度
             * @memberof  Data-Control
             * @type {?number}
             * @instance
             * */
            width: null,
            /**
             * @description 高度
             * @memberof  Data-Control
             * @type {?number}
             * @instance
             * */
            height: null,
            /**
             * @description 宽度
             * @memberof  Data-Control
             * @type {?number}
             * @instance
             * */
            "font-family": "微软雅黑",
            /**
             * @description 字体大小
             * @memberof  Data-Control
             * @type {?number}
             * @instance
             * */
            "font-size": 12,
            /**
             * @description 字体加粗
             * @memberof  Data-Control
             * @type {?number}
             * @instance
             * */
            "font-weight": false,
            /**
             * @description 斜体
             * @memberof  Data-Control
             * @type {bool}
             * @instance
             * */
            "font-style-italic": false,
            /**
             * @description 下滑线
             * @memberof  Data-Control
             * @type {bool}
             * @instance
             * @default
             * */
            "text-decoration-underline": false,
            /**
             * @description 字体颜色
             * @memberof  Data-Control
             * @type {?string}
             * @instance
             * */
            color: "#333333",
            id: null,
            x: null,
            y: null,
            "relation-position": null,
            "extension-direction": null,
            "fill-dynamic-data": null,
            "anchoring": true,
            "check": null,
            "check-tooltip": ""
        },
        /**
         * @memberof ToolBox
         * @instance
         * @function
         * @description 获取多语言：继承的方法
         * @param {string} text - 文本或名称
         * @returns {string} - 本地的语言
         */
        getLocalText: function (text) {
            var language = $.formbuilder.language[this.language] || $.formbuilder.language["zh-CN"];
            return language.toolbox[text] || language.toolbox[this.title] || this.title || "";
        },
        /**
         * @memberof ToolBox
         * @instance
         * @function
         * @description 创建设计模式中控件的展示 （设计模式使用）
         * @returns {jQueryElement} 创建的DOM元素
         */
        design: function () { },
        /**
         * @memberof ToolBox
         * @instance
         * @function
         * @description 创建填报模式中控件的展示 （填报模式使用）
         * @returns {jQueryElement} 创建的DOM元素
         */
        applying: function () { },
        /**
         * @memberof ToolBox
         * @instance
         * @function
         * @description 创建浏览模式中控件的展示 （浏览模式使用）
         * @returns {jQueryElement} 创建的DOM元素
         */
        view: function () {
            var value = this.options.value;
            if (value === null || value === undefined) {
                value = "";
            }
            return $("<label class='forbuilder-control-view-lable'>" + value + "</label>");
        },
        /**
         * @memberof ToolBox
         * @instance
         * @function
         * @description 获取控件值 （填报模式使用）
         * @returns {object} 当前控件的值
         */
        getValue: function () { },
        /**
         * @memberof ToolBox
         * @instance
         * @function
         * @description 设置控件值 （填报模式使用）
         * @param   值
         */
        setValue: function (value) {
            this.options.value = value;
        },
        checkValue: function () {
            var value = this.getValue(),
              check = this.options.check,
              tooltip = this.options["check-tooltip"] || this.getLocalText("unchecked"),
              regex,
              result = true,
              css;

            if (check && typeof window[check] === "function") {
                result = window[check](value);
            }
            else if (check) {
                regex = new RegExp(check);
                result = regex.test(value);
            }

            if (result === false) {
                css = {
                    outline: "1px solid #D93025",
                    "background-color": "rgba(253,239,240,.5)"
                };
            }
            else {
                css = {
                    outline: "none",
                    "background-color": "initial"
                };
                tooltip = "";
            }
            this.elem.css(css);

            this.elem.attr({ "title": tooltip });

            return result;
        },
        /**
         * @memberof ToolBox
         * @instance
         * @type {object<string,ToolBox-Property>}
         * @alias property
         * @description 元件信息属性栏展示配置，结构与options属性结构一致 （设计模式使用）
         */
        property: {
            /**
             * @memberof jQuery.formbuilder
             * @class ToolBox-Property
             * @alias ToolBox-Property
             * @description 控件属性栏显示配置
             */
            value: {
                type: "textbox"
            },
            check: {
                type: "textbox"
            },
            className: {
                type: "textbox",
                update: function (value) {
                    this.elem.addClass(value);
                }
            },
            "font-family": {
                text: "font-family",
                type: "combox",
                conver: function (value) {
                    value = value || "";
                    return value;
                },
                source: $.formbuilder["FONT-FAMILY"],
                update: function (value) {
                    this.elem.css("font-family", value);
                }
            },
            "font-size": {
                text: "font-size",
                type: "combox",
                after: "vertical-align",
                source: $.formbuilder["FONT-SIZE"],
                conver: function (value) {
                    value = value || "";
                    return value;
                },
                update: function (value) {
                    this.elem.css("font-size", value + "px");
                }
            },
            "font-weight": {
                text: "font-weight",
                type: "bool",
                source: {
                    text: "font-weight",
                    image: "font-weight.png"
                },
                update: function (value) {
                    var weight = value ? "bolder" : "normal";
                    this.elem.css("font-weight", weight);
                }
            },
            "font-style-italic": {
                text: "font-style-italic",
                type: "bool",
                source: {
                    text: "font-style-italic",
                    image: "font-style-italic.png"
                },
                update: function (value) {
                    if (value === true) {
                        this.elem.css("font-style", "italic");
                    } else {
                        this.elem.css("font-style", "normal");
                    }
                }
            },
            "text-decoration-underline": {
                text: "text-decoration-underline",
                type: "bool",
                source: {
                    text: "text-decoration-underline",
                    image: "text-decoration-underline.png"
                },
                update: function (value) {
                    if (value === true) {
                        this.elem.css("text-decoration", "underline");
                    } else {
                        this.elem.css("text-decoration", "none");
                    }
                }
            },
            color: {
                text: "color",
                type: "colorpicker",
                update: function (value) {
                    this.container.css("color", value);
                    this.container.find("*").css("color", value);
                }
            },
            "height-container": {
                hidden: true,
                order: 999,
                after: "vertical-align",
                update: function (value, position) {
                    var $container = this.container,
                      $td = $container.closest("td"),
                      $wrap = $container.parent(),
                      rowspan = parseInt($td.attr("rowspan")),
                      height;

                    if (rowspan > 1) {
                        $container.css({
                            "margin-top": 0
                        });
                        //$wrap.height("100%");
                        $wrap.height($td.height() - 2);
                    } else {
                        height = $td.attr("data-height");

                        if (_.isNumber(height)) {
                            height = height - 1;
                        }
                        $wrap.height(height);
                        $wrap.attr("data-height", height);
                    }
                }
            },
            width: {
                text: "width",
                type: "textbox",
                after: "align",
                order: 1000,
                conver: function (value) {
                    if (!isNaN(value) && value) {
                        return Number(value);
                    }
                    return value || "";
                },
                update: function (value) {
                    this.container.outerWidth(value);
                    this.container.attr("data-width", value);
                }
            },
            height: {
                text: "height",
                hidden: true,
                type: "textbox",
                after: "vertical-align",
                order: 1001,
                conver: function (value) {
                    if (!isNaN(value) && value) {
                        return Number(value);
                    }
                    return value || "";
                },
                update: function (value) {
                    this.container.height(value);
                    this.container.attr("data-height", value);
                }
            },
            align: {
                text: "align",
                type: "buttons",
                order: 1002,
                source: [
                  {
                      name: "left",
                      text: "align-left",
                      image: "align-left.png",
                      selected: false
                  },
                  {
                      name: "center",
                      text: "align-center",
                      image: "align-center.png",
                      selected: true
                  },
                  {
                      name: "right",
                      text: "align-right",
                      image: "align-right.png",
                      selected: false
                  }
                ],
                update: function (value) {
                    var $container = this.container,
                      contentWidth,
                      css;

                    contentWidth = $container.attr("data-width");
                    if (!contentWidth) {
                        contentWidth = this.elem.outerWidth();
                    } else {
                        contentWidth = null;
                    }

                    switch (value) {
                        case "center":
                            css = {
                                "margin-left": "auto",
                                "margin-right": "auto",
                                float: "none"
                            };
                            if (contentWidth) {
                                //TODO
                                //19500 李金岳
                                css.width = contentWidth// + 4;
                            }
                            $container.css(css);
                            break;
                        case "left":
                            $container.css({
                                float: "left"
                            });
                            break;
                        case "right":
                            $container.css({
                                float: "right"
                            });
                            break;
                        default:
                            break;
                    }
                }
            },
            "vertical-align": {
                text: "vertical-align",
                type: "buttons",
                order: 1003,
                source: [
                  {
                      name: "top",
                      text: "vertical-align-top",
                      image: "vertical-align-top.png",
                      selected: true
                  },
                  {
                      name: "middle",
                      text: "vertical-align-middle",
                      image: "vertical-align-middle.png",
                      selected: false
                  },
                  {
                      name: "bottom",
                      text: "vertical-align-bottom",
                      image: "vertical-align-bottom.png",
                      selected: false
                  }
                ],
                update: function (value) {
                    var $container = this.container,
                      cellHeight,
                      contentHeight,
                      heightValue;

                    heightValue = $container.parent().attr("data-height");
                    if (heightValue === "auto") {
                        value = null;
                    }

                    if (value !== "top") {
                        cellHeight = this.container.parent().outerHeight();
                        contentHeight = $container.attr("data-height");
                        if (!contentHeight) {
                            contentHeight = this.elem.outerHeight();
                        } else {
                            contentHeight = null;
                        }
                    }

                    switch (value) {
                        case "top":
                            $container.css({
                                "margin-top": 0
                            });
                            break;
                        case "middle":
                            $container.css({
                                "margin-top": Math.floor((cellHeight - contentHeight) / 2)
                            });
                            break;
                        case "bottom":
                            $container.css({
                                //TODO
                                //19500 李金岳
                                "margin-top": Math.floor(cellHeight - contentHeight)// - 2)
                            });
                            break;
                        default:
                            $container.css({
                                "margin-top": 0
                            });
                            break;
                    }
                }
            },
            "text-align": {
                text: "text-align",
                type: "buttons",
                order: 1004,
                source: [
                  {
                      name: "left",
                      text: "align-left",
                      image: "text-align-left.png",
                      selected: true
                  },
                  {
                      name: "center",
                      text: "align-center",
                      image: "text-align-center.png",
                      selected: false
                  },
                  {
                      name: "right",
                      text: "align-right",
                      image: "text-align-right.png",
                      selected: false
                  }
                ],
                update: function (value) {
                    this.container.css("text-align", value);
                }
            },
            overflow: {
                text: "overflow",
                type: "bool",
                source: {
                    text: "overflow",
                    image: "overflow.png"
                },
                update: function (value) {
                    this.container.parent().css({ overflow: value ? "auto" : "hidden" });
                }
            },
            id: {
                text: "id",
                type: "textbox",
                source: {
                    readonly: true
                }
            },
            "extension-direction": {
                text: "extension-direction",
                type: "combox",
                source: [
                  {
                      text: "direction-vertical",
                      value: "vertical"
                  },
                  {
                      text: "direction-horizontal",
                      value: "horizontal"
                  }
                ]
            },
            "relation-position": {
                text: "relation-position",
                type: "textbox",
                source: {
                    placeholder: "row-and-col"
                }
            },
            "fill-dynamic-data":{
                text: "fill-dynamic-data",
                type: "textbox"
            },
            "anchoring": {
                text: "anchoring",
                type: "bool",
                source: {
                    text: "anchoring",
                    image: "anchoring.png"
                },
                update: function (value) { }
            }
        },
        updateProperties: function () {
            var workspace = this.builder.workspace;
            workspace.updatePropertyItems.call(workspace, this, this.property, this.options, this.position);
        }
    };

    /**
     * @memberof jQuery.formbuilder
     * @namespace jQuery.formbuilder.toolbox
     * @description formbuilder元件静态类
     */

    /**
     * @memberof jQuery.formbuilder.toolbox
     * @static
     * @function
     * @alias add
     * @description 添加新的控件元件
     * @param {string} type 控件元件类型
     * @param {ToolBox} options 控件元件配置对象
     */
    $.formbuilder.toolbox.add = function (type, options) {
        this[type] = $.formbuilder.toolbox._add(type, options);
    };

    $.formbuilder.toolbox._add = function (type, options) {
        var newToolbox = $.extend(true, {}, this._base, options, {
            type: type,
            options: {
                type: type
            }
        });

        return newToolbox;
    };
})(jQuery, _);

/* global jQuery */
(function ($) {
    "use strict";
    $.formbuilder.toolbox.add("_title", {
        title: "title",
        icon: "icon-title",
        design: function () {
            return $("<div><label>" + this.text(this.options.label) + "</label></div>")
                .addClass(this.className);
        },
        applying: function () {
            return this.design();
        },
        className: "formbuilder-control-title",
        options: {
            label: "",
            value: "label",
            className: ""
        }
    });
})(jQuery);
/* global jQuery _*/
(function ($, _) {
    "use strict";
    $.formbuilder.toolbox.add("label", {
        title: "label",
        icon: "label.png",
        cache: {
            indent: []
        },
        design: function () {
            return $("<label class='" + this.className.container + "'>" + this.options.value + "</label>");
        },
        applying: function () {
            return this.design();
        },
        view: function () {
            return this.design();
        },
        getMultiLanguage: function (type) {
            var value = "",
              _this = this;

            if (type === "i18n") {
                _(this.property["multi-language"].source)
                  .chain()
                  .map(function (item) {
                      return item.name;
                  })
                  .each(function (lan) {
                      var _value;
                      _value = _this.options.i18n[lan];
                      if (_value) {
                          value = value ? (value + "\n" + _value) : _value;
                      }

                  }).value();
            }
            else {
                value = this.options.i18n[type];
            }

            value = value || "";

            return value;
        },
        getValue: function () {
            return this.options.value;
        },
        className: {
            container: "formbuilder-control-label",
            vertical: "formbuilder-control-label-vertical",
            space: "formbuilder-control-label-space"
        },
        options: {
            label: "",
            value: "label",
            className: "",
            "multi-language": "zh-CN",
            i18n: {
                "zh-CN": "",
                "en": ""
            }
        },
        property: {
            height: {
                hidden: false
            },
            value: {
                text: "value",
                type: "textarea",
                after: ["font-size"],
                //after: ["font-size", "text-align", "text-vertical-align", "width", "height", "line-height", "indent"],
                update: function (value, position, options) {
                    var _value,
                      items,
                      html,
                      textV,
                      self;

                    _value = value;
                    if (!value) {
                        _value = this.getMultiLanguage(this.options["multi-language"]);
                        this.options.value = _value;
                    }
                    items = _value.split("\n");
                    html = [];
                    textV = options["word-vertical"];
                    self = this;

                    this.cache.indent = [];
                    _.each(items, function (item) {
                        var trimString,
                          tempString,
                          signString = "[--]",
                          splitArray,
                          leftTrim,
                          rightTrim;

                        if (textV) {
                            item = _.map(item.split(""), function (char) {
                                return char + "<br/>";
                            });

                            item = item.join("");
                        }
                        //计算缩进量
                        trimString = $.trim(item);
                        tempString = item.replace(trimString, signString);
                        splitArray = tempString.split(signString);
                        leftTrim = splitArray[0] ? splitArray[0].length : 0;
                        rightTrim = splitArray[1] ? splitArray[1].length : 0;
                        self.cache.indent.push({ left: leftTrim, right: rightTrim });

                        item = tempString.replace(/ /g, "<span class='" + self.className.space + "'></span>")
                          .replace(signString, trimString);

                        html.push("<p>" + item + "</p>");
                    });
                    this.elem.html(html.join(""));

                    textV ? this.elem.addClass(this.className.vertical) : this.elem.removeClass(this.className.vertical);
                }
            },
            "text-vertical-align": {
                text: "text-vertical-align",
                type: "buttons",
                order: 1004,
                updateInLoad: false,
                source: [
                  {
                      name: "top",
                      text: "vertical-align-top",
                      image: "text-align-top.png",
                      selected: true
                  },
                  {
                      name: "middle",
                      text: "vertical-align-middle",
                      image: "text-align-middle.png",
                      selected: false
                  },
                  {
                      name: "bottom",
                      text: "vertical-align-bottom",
                      image: "text-align-bottom.png",
                      selected: false
                  }
                ],
                update: function (value) {
                    this.container.find("p").css("vertical-align", value);
                }
            },
            "word-vertical": {
                text: "word-vertical",
                type: "bool",
                after: ["value"],
                updateInLoad: false,
                source: {
                    text: "word-vertical",
                    image: "word-vertical.png"
                },
                update: function (value, position, options) { }
            },
            "font-size": {
                text: "font-size",
                order: 1003,
                type: "combox",
                after: ["vertical-align", "text-align", "text-vertical-align", "width", "height", "line-height", "indent"],
                updateInLoad: false,
                source: $.formbuilder["FONT-SIZE"],
                conver: function (value) {
                    value = value || "";
                    return value;
                },
                update: function (value) {
                    this.elem.find("p").css("font-size", value + "px");
                }
            },
            "font-family": {
                update: function (value) {
                    this.elem.find("p").css("font-family", value);
                }
            },
            "line-height": {
                text: "line-height",
                type: "text",
                updateInLoad: false,
                update: function (value, position, options) {
                    if (value) {
                        this.elem.find("p").css("line-height", value + "px");
                    }
                }
            },
            "indent": {
                text: "indent",
                type: "text",
                updateInLoad: false,
                conver: function (value) {
                    if (isNaN(value) === false) {
                        return Number(value);
                    }
                    return value;
                },
                update: function (value, position, options) {
                    if (!value) {
                        return;
                    }
                    var self = this,
                      $space = this.elem.find("." + this.className.space),
                      $p = this.elem.find("p");

                    $p.css({
                        "text-align": "left",
                        "padding-left": "0"
                    });
                    $space.css({
                        "margin-left": 0,
                        "text-align": "left"
                    });
                    if (_.isNumber(value)) {
                        $space.css("margin-left", value + "px");
                    }
                    else if (value === "auto") {
                        this.container.outerWidth("100%");
                        this.elem.width("100%");
                        //强制调整容器宽度为100%
                        this.options.width = "100%";

                        $p.each(function (i) {
                            var indent;
                            indent = self.cache.indent[i];
                            if (indent) {
                                if (indent.left > 0 && indent.right === 0) {
                                    $(this).css("text-align", "right");
                                }
                                else if (indent.left > 0 && indent.right > 0) {
                                    $(this).css("padding-left", Math.floor(indent.left / (indent.left + indent.right) * 100) + "%");
                                }
                            }
                        });
                    }
                }
            },
            "multi-language": {
                text: "multi-language",
                type: "buttons",
                after: ["value"],
                //order: 1004,
                updateInLoad: false,
                source: [
                  {
                      name: "zh-CN",
                      text: "language",
                      image: "i18n-zh-CN.png",
                      selected: true
                  },
                  {
                      name: "en",
                      text: "language",
                      image: "i18n-en.png",
                      selected: false
                  },
                  {
                      name: "i18n",
                      text: "multi-language",
                      image: "i18n.png",
                      selected: false
                  }
                ],
                update: function (value) {
                    var _value = this.getMultiLanguage(value);
                    this.options.value = _value;
                }
            }
        }
    });
})(jQuery, _);

/* global jQuery */
(function ($) {
    "use strict";
    $.formbuilder.toolbox.add("button", {
        title: "button",
        icon: "button.png",
        design: function () {
            var elem = ["<div class=\"", this.className, "\">",
                "<a></a>",
                "</div>"].join(""),
                $elem;

            $elem = $(elem).attr({
                name: this.options.name,
                type: this.options.type
            }).addClass(this.className);

            $elem.find(">a").text(this.options.text || this.title);

            return $elem;
        },
        applying: function () {
            return this.design();
        },
        className: "formbuilder-control-button",
        options: {
            label: "",
            name: "",
            value: "button",
            className: ""
        },
        property: {
            text: {
                "text": "value",
                type: "textbox",
                update: function (value) {
                    this.elem.find(">a").text(value);
                }
            },
            "text-align": {
                hidden: true
            }
        }
    });

})(jQuery);
/* global jQuery */
(function ($) {
    "use strict";
    $.formbuilder.toolbox.add("checkboxgroup", {
        title: "checkboxgroup",
        icon: "checkbox.png",
        design: function () {
            return this.create(false);
        },
        applying: function () {
            return this.create(true);
        },
        view: function () {
            var items = this.options.items,
                item,
                value = this.options.value || [],
                text = "";

            if (typeof value === "string") {
                value = [value];
            }
            for (var i = 0, len = items.length; i < len; i++) {
                item = items[i];
                if (value.indexOf(item.value) !== -1) {
                    text += " " + item.text;
                }
            }

            return $("<label>" + text + "</label>");
        },
        create: function (enableEdit) {
            var elem,
                items;

            elem = $("<div />")
                .attr({
                    type: this.options.type,
                    name: this.options.name
                })
                .addClass(this.className);

            items = this.options.items;

            elem.append(this.createItems(items, enableEdit));

            return elem;
        },
        createItems: function (items, enableEdit) {
            var item,
                html = [],
                readonly = enableEdit ? "" : "disabled='disabled'  readonly='readonly' ",
                value = this.options.value || [];

            for (var i = 0, len = items.length; i < len; i++) {
                item = items[i];
                html.push(["<div class='formbuilder-control-checkbox'>",
                    "<input name='", this.options.name, "' class='' id='' value='", item.value, "' type='checkbox' ", readonly,
                    (value.indexOf(item.value) !== -1 ? "checked='checked'" : ""), ">",
                    "<label for=''>", item.text, "</label></div>"
                ].join(""));
            }

            return html.join("");
        },
        className: "formbuilder-control-checkboxgroup",
        options: {
            required: false,
            name: "",
            value: [],
            className: "",
            items: [{ text: "option", value: "option" }]
        },
        getValue: function () {
            var items = [],
                self = this;

            this.elem.find("input:checkbox").each(function (i) {
                if (this.checked) {
                    items.push(self.options.items[i].value);
                }

            });

            return items;
        },
        property: {
            value: {
                hidden: true
            },
            "name": {
                "text": "name",
                "type": "textbox",
                update: function (value) {
                    this.elem.find("input:checkbox").attr("name", value);
                }
            },
            "font-family": {
                update: function (value) {
                    this.elem.find("label").css("font-family", value);
                }
            },
            "font-size": {
                update: function (value) {
                    this.elem.find("label").css("font-size", value + "px");
                }
            },
            "text-align": {
                //hidden: true
            },
            "font-weight": {
                text: "font-weight",
                type: "bool",
                source: {
                    text: "font-weight",
                    image: "font-weight.png"
                },
                update: function (value) {
                    var weight = value ? "bolder" : "normal";
                    this.elem.find("label").css("font-weight", weight);
                }
            },
            items: {
                type: "options",
                updateInLoad: false,
                excludePattern: ["applying", "view"],
                update: function (value) {
                    var items = value;
                    this.elem.html(this.createItems(items));
                    this.updateProperties();
                }
            }
        }
    });

})(jQuery);
/* global jQuery */
(function ($) {
    "use strict";
    $.formbuilder.toolbox.add("date", {
        title: "date",
        icon: "date.png",
        design: function () {
            return $("<input />")
                .attr({
                    readonly: "readonly",
                    type: "date",
                    name: this.options.name,
                    placeholder: this.options.placeholder
                })
                .addClass(this.className)
                .val(this.options.value);
        },
        applying: function () {
            var elem = this.design();
            elem.removeAttr("readonly");

            return elem;
        },
        className: "formbuilder-control-date",
        options: {
            required: false,
            name: "",
            value: "",
            className: "",
        },
        getValue: function () {
            return this.elem.val() || "";
        },
        setValue: function (value) {
            this.options.value = value;
        },
        property: {
            value: {
                "text": "value",
                excludePattern: ["view"],
                type: "textbox",
                source: {
                    //readonly: true
                },
                update: function (value) {
                    this.elem.val(value);
                }
            },
            "text-align": {
                update: function (value) {
                    var render, pattern;

                    render = {
                        view: function (value) {
                            this.container.css("text-align", value);
                        },
                        applying: function (value) {
                            this.container.css("text-align", value);
                        },
                        design: function (value) {
                            this.elem.css("text-align", value);
                        }
                    };
                    pattern = this.builder.options.pattern;

                    render[pattern].call(this, value);
                }
            }
        }
    });

})(jQuery);
/* global jQuery */
(function ($) {
    "use strict";
    $.formbuilder.toolbox.add("time", {
        title: "time",
        icon: "time.png",
        design: function () {
            return $("<input />")
                .attr({
                    readonly: "readonly",
                    type: "time",
                    name: this.options.name,
                    placeholder: this.options.placeholder
                })
                .addClass(this.className)
                .val(this.options.value);
        },
        applying: function () {
            var elem = this.design();
            elem.removeAttr("readonly");

            return elem;
        },
        className: "formbuilder-control-time",
        options: {
            required: false,
            name: "",
            value: "",
            className: ""
        },
        getValue: function () {
            return this.elem.val() || "";
        },
        setValue: function (value) {
            this.options.value = value;
        },
        property: {
            value: {
                "text": "value",
                type: "textbox",
                source: {
                },
                excludePattern: ["view"],
                update: function (value) {
                    this.elem.val(value);
                }
            }
        }
    });

})(jQuery);
/* global jQuery */
(function ($) {
    "use strict";
    $.formbuilder.toolbox.add("hidden", {
        title: "hidden",
        icon: "hidden.png",
        design: function () {
            return $("<div />")
                .attr({
                    "data-type": this.options.type,
                    "data-name": this.options.name,
                    "data-value": this.options.value
                })
                .addClass(this.className)
                .text(this.options.name || this.title);
        },
        applying: function () {
            return $("<input />")
                .attr({
                    type: this.options.type,
                    name: this.options.name
                })
                .addClass(this.className)
                .val(this.options.value);
        },
        getValue: function () {
            return this.elem.attr("data-value");
        },
        className: "formbuilder-control-hidden",
        options: {
            //label: "",
            name: "",
            value: "",
            //type: "hidden",
            className: "",
        },
        property: {
            value: {
                "text": "value",
                type: "textbox",
                update: function (value) {
                    this.elem.attr("data-value", value);
                }
            },
            "text-align": {
                hidden: true
            }
        }
    });

})(jQuery);
/* global jQuery */
(function ($) {
    "use strict";
    $.formbuilder.toolbox.add("radiogroup", {
        title: "radiogroup",
        icon: "radio-group.png",
        create: function (enableEdit) {
            var elem,
                items;

            elem = $("<div />")
                .attr({
                    type: this.options.type,
                    name: this.options.name
                })
                .addClass(this.className);

            items = this.options.items;

            elem.append(this.createItems(items, enableEdit));

            return elem;
        },
        design: function () {
            return this.create(false);
        },
        applying: function () {
            return this.create(true);
        },
        view: function () {
            var items = this.options.items,
                item,
                value = this.options.value || "";

            for (var i = 0, len = items.length; i < len; i++) {
                item = items[i];
                if (item.value === value) {
                    value = item.text;
                    break;
                }
            }

            return $("<label>" + value + "</label>");
        },
        getValue: function () {
            var item,
                self = this;

            this.elem.find("input:radio").each(function (i) {
                if (this.checked) {
                    //item = $.extend({}, self.options.items[i]);
                    item = self.options.items[i].value;
                    return false;
                }
            });

            return item;
        },
        // setValue: function (value) {
        //     var items = this.options.items,
        //         item;

        //     for (var i = 0, len = items.length; i < len; i++) {
        //         item = items[i];
        //         item.selected = value[i].selected;
        //     }
        // },
        createItems: function (items, enableEdit) {
            var item,
                html = [],
                readonly = enableEdit ? "" : "disabled=\"disabled\"  readonly=\"readonly\" ";

            for (var i = 0, len = items.length; i < len; i++) {
                item = items[i];
                html.push(["<div class=\"formbuilder-control-checkbox\">",
                    "<input name=\"", this.options.name, "\" class=\"\" id=\"\" value=\"", item.value, "\" type=\"radio\" ", readonly,
                    (item.selected ? "checked=\"checked\"" : ""), ">",
                    "<label for=\"\">", item.text, "</label></div>"
                ].join(""));
            }

            return html.join("");
        },
        className: "formbuilder-control-radiogroup",
        options: {
            required: false,
            name: "",
            value: "",
            className: "",
            items: [{ text: "option", value: "option" }]
        },
        property: {
            value: {
                hidden: true
            },
            "name": {
                "text": "name",
                "type": "textbox",
                update: function (value) {
                    this.elem.find("input:radio").attr("name", value);
                }
            },
            "font-family": {
                update: function (value) {
                    this.elem.find("label").css("font-family", value);
                }
            },
            "font-size": {
                update: function (value) {
                    this.elem.find("label").css("font-size", value + "px");
                }
            },
            "font-weight": {
                text: "font-weight",
                type: "bool",
                source: {
                    text: "font-weight",
                    image: "font-weight.png"
                },
                update: function (value) {
                    var weight = value ? "bolder" : "normal";
                    this.elem.find("label").css("font-weight", weight);
                }
            },
            items: {
                type: "options",
                multi: false,
                excludePattern: ["applying", "view"],
                updateInLoad: false,
                update: function (value) {
                    var items = value;
                    this.elem.html(this.createItems(items));
                    this.updateProperties();
                }
            },
            "text-align": {
                //hidden: true
            }
        }
    });

})(jQuery);
/* global jQuery */
(function ($) {
    "use strict";
    $.formbuilder.toolbox.add("select", {
        title: "select",
        icon: "select.png",
        creatItems: function () {
            var html = [],
                items = this.options.items,
                item,
                select;

            if (items && items.length > 0) {
                for (var i = 0, len = items.length; i < len; i++) {
                    item = items[i];
                    select = item.value === this.options.value;
                    html.push(["<option name=\"", this.options.name,
                        "\" class=\"\" id=\"\" value=\"", item.value, "\" ",
                        (select ? "selected=\"selected\"" : ""), ">"
                        , item.text,
                        "</option>",
                    ].join(""));
                }
                if (!this.options.value) {
                    this.options.value = items[0].value;
                }
            }
            return html.join("");
        },
        design: function () {
            var elem;

            elem = $("<select />")
                .attr({
                    type: this.options.type,
                    name: this.options.name
                })
                .addClass(this.className);

            elem.html(this.creatItems());

            return elem;
        },
        applying: function () {
            var $elem = this.design(),
                _this = this,
                parentId;

            parentId = this.options["cascade-parentId"];
            if (parentId) {
                this.cascadeItems(parentId, $elem);
            }
            $elem.on("change", function (e) {
                var value = $(this).val();

                _this.cascadeEvent(value);
            });
            return $elem;
        },
        view: function () {
            var items,
                item,
                value;

            this.cascadeItems(this.options["cascade-parentId"]);
            items = this.options.items;
            value = this.options.value || "";

            for (var i = 0, len = items.length; i < len; i++) {
                item = items[i];
                if (item.value === value) {
                    value = item.text;
                }
            }

            if (typeof value === "object") {
                value = value.text;
            }

            return $("<label>" + value + "</label>");
        },
        className: "formbuilder-control-select",
        options: {
            required: false,
            name: "",
            value: null,
            className: "",
            items: [],
            "cascade-parentId": "",
            "cascade-source": "",
            "cascade-control": ""
        },
        getValue: function () {
            return this.elem.val();
        },
        cascadeEvent: function (value) {
            var grid,
                control,
                p = this.options["cascade-control"];

            if (!p) {
                return;
            }
            grid = this.builder.workspace.grid;
            p = $.formbuilder.formatPositionToObject(p);
            control = grid.findControlObj(p.x, p.y) || {};
            if (control.type && typeof control.cascadeItems === "function") {
                control.cascadeItems(value, control.elem);
                control.cascadeEvent(control.options.value);
            }
        },
        cascadeItems: function (parentValue, $elem) {
            var fn = window[this.options["cascade-source"]],
                items;
            //value = this.options.value || "",
            //_value,
            //pass = false;
            if (this.options["cascade-parentId"] !== parentValue) {
                this.options["cascade-parentId"] = parentValue;
                this.options.value = "";
            }
            if (typeof fn === "function") {
                items = fn(parentValue) || [];
                // if (items && items.length > 0) {
                //     value = items[0].value;
                // }
                this.options.items = items;
                //this.options.value = value;
                if ($elem) {
                    this.renderItems($elem);
                }
            }
        },
        renderItems: function ($elem) {
            var _$elem = $elem || this.elem;
            var items = this.creatItems();
            _$elem.html(items);
        },
        property: {
            value: {
                hidden: true
            },
            name: {
                type: "textbox",
                update: function (value) {

                    this.elem.attr("name", value);
                }
            },
            items: {
                type: "options",
                excludePattern: ["applying", "view"],
                update: function (value) {
                    var items = value;
                    this.elem.html(this.creatItems(items));
                }
            },
            "text-align": {
                hidden: true
            },
            "cascade-source": {
                type: "textbox"
            },
            "cascade-control": {
                type: "textbox",
                source: {
                    placeholder: "row-and-col"
                }
            }
        }
    });

})(jQuery);
/* global jQuery */
(function ($) {
    "use strict";
    $.formbuilder.toolbox.add("textarea", {
        title: "textarea",
        icon: "textarea.png",
        design: function () {
            return $("<textarea />")
                .attr({
                    readonly: "readonly",
                    name: this.options.name,
                    placeholder: this.options.placeholder
                })
                .addClass(this.className)
                .val(this.options.value);
        },
        applying: function () {
            var elem = this.design();
            elem.removeAttr("readonly");

            return elem;
        },
        view: function () {
            var value = this.options.value;
            if (value === null || value === undefined) {
                value = "";
            }
            value = value.replace(/\n/g, "<br/>");
            return $("<label>" + value + "</label>");
        },
        className: "formbuilder-control-textarea",
        options: {
            name: "",
            label: "",
            value: "",
            rows: 2,
            className: ""
        },
        getValue: function () {
            return this.elem.val() || "";
        },
        setValue: function (value) {
            this.options.value = value;
        },
        property: {
            value: {
                type: "textarea",
                excludePattern: ["view"],
                update: function (value) {
                    this.elem.val(value);
                }
            },
            rows: {
                type: "textbox",
                update: function (value) {
                    this.elem.attr("rows", value);
                }
            },
            "text-align": {
                update: function (value) {
                    var render, pattern;

                    render = {
                        view: function (value) {
                            this.container.css("text-align", value);
                        },
                        applying: function (value) {
                            this.container.css("text-align", value);
                        },
                        design: function (value) {
                            this.elem.css("text-align", value);
                        }
                    };
                    pattern = this.builder.options.pattern;

                    render[pattern].call(this, value);
                }
            }
        }
    });

})(jQuery);
/* global jQuery */
(function ($) {
    "use strict";
    $.formbuilder.toolbox.add("textbox", {
        title: "textbox",
        icon: "text.png",
        design: function () {
            return $("<input />")
                .attr({
                    readonly: "readonly",
                    type: this.options.type,
                    name: this.options.name,
                    placeholder: this.options.placeholder
                })
                .addClass(this.className)
                .val(this.options.value);
        },
        applying: function () {
            var elem = this.design();
            elem.removeAttr("readonly");

            return elem;
        },
        getValue: function () {
            return this.elem.val() || "";
        },
        setValue: function (value) {
            this.options.value = value;
        },
        className: "formbuilder-control-textbox",
        options: {
            label: "",
            required: false,
            placeholder: "",
            name: "",
            value: "",
            className: "",
            readonly: true,
            "text-align": "left"
        },
        property: {
            "name": {
                "text": "name",
                "type": "textbox",
                update: function (value) {
                    this.elem.attr("name", value);
                }
            },
            "placeholder": {
                "text": "placeholder",
                "type": "textbox",
                update: function (value) {
                    this.elem.attr("placeholder", value);
                }
            },
            value: {
                "text": "value",
                type: "textbox",
                excludePattern: ["view"],
                update: function (value) {
                    this.elem.val(value);
                }
            },
            "text-align": {
                designUpdate: function (value) {
                    this.elem.css("text-align", value);
                },
                applyingUpdate: function (value) {
                    this.container.css("text-align", value);
                },
                viewUpdate: function (value) {
                    this.container.css("text-align", value);
                },
            }
        }
    });

})(jQuery);
/* global jQuery */
(function ($) {
    "use strict";
    $.formbuilder.toolbox.add("textvalue", {
        title: "textvalue",
        icon: "enable-click-text.png",
        design: function () {
            return $("<input />")
                .attr({
                    type: this.options.type,
                    name: this.options.name,
                    readonly: true
                })
                .addClass(this.className)
                .val(this.options.value);
        },
        applying: function () {
            return this.design();
        },
        className: "formbuilder-control-textvalue",
        options: {
            name: "",
            label: "",
            value: "",
            items: function () {

            },
            className: ""
        },
        property: {
            value: {
                "text": "value",
                type: "textbox",
                excludePattern: ["view"],
                update: function (value) {
                    this.elem.val(value);
                }
            }
        },
        "text-align": {
            hidden: true
        }
    });


})(jQuery);
/* global jQuery _*/
(function ($) {
    "use strict";
    $.formbuilder.toolbox._table = {
        type: "_table",
        title: "table",
        icon: "icon-table",
        filters: {
            tableIndex: "td.formbuilder-table-cells-all-index",
            rowIndex: "td.formbuilder-table-row-index",
            columnIndex: "td.formbuilder-table-column-index,col.formbuilder-table-column-index",
            row: "tr.formbuilder-table-row",
            column: "td.formbuilder-table-cell",
            indexText: "formbuilder-table-index-text"
        },
        id: "layout",
        elem: null,
        contextmenu: "cells",
        /**
         * @class
         * @alias defaultOptions
         * @description 默认参数格式
         * @instance
         */
        defaultOptions: {
            /**
             * @instance
             * @memberof Data
             * @description 网格行信息
             * @type {Data-Row[]}
             */
            rows: [],
            /**
             * @instance
             * @memberof Data
             * @description 网格单元格信息
             * @type {Data-Cell[]}
             */
            cells: [],
            /**
             * @instance
             * @memberof Data
             * @description 网格列信息
             * @type {Data-Column[]}
             */
            columns: [],
            /**
             * @instance
             * @memberof Data
             * @description 网格行信息
             * @type {Data-Control[]}
             */
            controls: [],
            /**
             * @instance
             * @memberof Data
             * @description 网格行信息
             * @type {Data-Table}
             */
            table: {}
        },
        options: {
            type: "_table"
        },
        propertyField: {
            /**
             * @class
             * @memberof Data
             * @alias Data-Table
             * @description 网格行信息
             * @type {object}
             */
            table: {
                /**
                 * @instance
                 * @memberof Data-Table
                 * @description 网格宽度
                 * @type {(number|string)}
                 * @default
                 */
                width: "100%",
                /**
                 * @instance
                 * @memberof Data-Table
                 * @description 网格高度
                 * @type {(number|string)}
                 * @default
                 */
                height: "100%",
                /**
                 * @instance
                 * @memberof Data-Table
                 * @description 网格行数
                 * @type {number}
                 * @default
                 */
                rows: 16,
                /**
                 * @instance
                 * @memberof Data-Table
                 * @description 网格列数
                 * @type {number}
                 * @default
                 */
                columns: 10,
                className: "",
                /**
                 * @instance
                 * @memberof Data-Table
                 * @description 网格边框
                 * @type {string}
                 * @default
                 */
                "border-style": "border-solid",
                "border-color": "#ccc",
                paging: false,
                center: true,
                "print-size": ""
            },
            /**
             * @class
             * @memberof Data
             * @alias Data-Row
             * @description 网格行对象
             * @type {object}
             */
            row: {
                /**
                 * @instance
                 * @memberof Data-Row
                 * @description 网格行高度
                 * @type {(number|string)}
                 */
                height: 32,
                x: null,
                y: -1
            },
            /**
             * @class
             * @memberof Data
             * @alias Data-Column
             * @description 网格列对象
             * @type {object}
             */
            column: {
                /**
                 * @instance
                 * @memberof Data-Column
                 * @description 网格行高度
                 * @type {(number|string)}
                 */
                width: 100,
                x: -1,
                y: null
            },
            cells: {},
            /**
             * @class
             * @memberof Data
             * @alias Data-Cell
             * @description 网格行对象
             * @type {object}
             */
            cell: {
                /**
                 * @instance
                 * @memberof Data-Cell
                 * @description 单元格跨行
                 * @type {object}
                 * @default
                 */
                rowspan: 1,
                /**
                 * @instance
                 * @memberof Data-Cell
                 * @description 单元格跨列
                 * @type {object}
                 * @default
                 */
                colspan: 1,
                /**
                 * @instance
                 * @memberof Data-Cell
                 * @description 单元格背景
                 * @type {string}
                 * @default
                 */
                "background-color": "",
                /**
                 * @instance
                 * @memberof Data-Cell
                 * @description 单元格边框类型
                 * @type {string}
                 * @default
                 */
                // "border-style": {
                //   value: "",
                //   timestamp: null
                // },
                "border-style": "",
                /**
                 * @instance
                 * @memberof Data-Cell
                 * @description 单元格边框颜色
                 * @type {string}
                 * @default
                 */
                // "border-color": {
                //   value: "",
                //   timestamp: null
                // },
                "border-color": "",
                // "border-position": "border-all",
                // "oblique-line":"obliqueline-none",
                x: null,
                y: null,
                x1: null,
                y1: null
            }
        },
        propertyMap: {
            table: {
                map: "table",
                order: 1
            },
            row: {
                map: "rows",
                position: {
                    x: null,
                    y: -1
                },
                order: 2
            },
            column: {
                map: "columns",
                position: {
                    x: -1,
                    y: null
                },
                order: 3
            },
            cell: {
                map: "cells",
                position: {
                    x: null,
                    y: null
                },
                order: 4
            }
        },
        property: {
            table: {
                width: {
                    /**
                     * @memberof ToolBox-Property
                     * @instance
                     * @description 属性栏控件名称
                     * @type {string}
                     */
                    text: "table-width",
                    /**
                     * @memberof ToolBox-Property
                     * @instance
                     * @description 属性栏控件类型
                     * @type {string}
                     */
                    type: "textbox",
                    /**
                     * @memberof ToolBox-Property
                     * @instance
                     * @description 属性栏控件所属分组
                     * @type {string}
                     */
                    group: "table",
                    /**
                     * @memberof ToolBox-Property
                     * @instance
                     * @description 指定模式，不进行自动更新
                     * @type {string[]}
                     */
                    excludePattern: null,
                    /**
                     * @memberof ToolBox-Property
                     * @instance
                     * @description 加载（创建）元件时，是否执行属性自动更新
                     * @type {bool}
                     */
                    updateInLoad: true,
                    /**
                     * @memberof ToolBox-Property
                     * @instance
                     * @description 对应属性值更改执行的更新方法
                     * @function
                     * @param {object} value 更改的值
                     */
                    update: function (value) {
                        this.elem.find("." + this.className.tbodyContent).css("width", value);
                    },
                    conver: function (value) {
                        if (!isNaN(value) && value) {
                            return Number(value);
                        }
                        return value;
                    }
                },
                height: {
                    text: "table-height",
                    type: "textbox",
                    group: "table",
                    updateInLoad: true,
                    conver: function (value) {
                        if (!isNaN(value) && value) {
                            return Number(value);
                        }
                        return value;
                    },
                    update: function (value) {
                        this.elem.css("height", value);
                    }
                },
                rows: {
                    text: "table-rows",
                    type: "textbox",
                    group: "table",
                    updateInLoad: false,
                    checking: function (value) {
                        if (isNaN(value)) {
                            return false;
                        }
                        return true;
                    },
                    conver: function (value) {
                        return parseInt(value);
                    },
                    update: function (value) {
                        this.workspace.renderGrid();
                    }
                },
                columns: {
                    text: "table-columns",
                    type: "textbox",
                    group: "table",
                    updateInLoad: false,
                    after: ["center"],
                    checking: function (value) {
                        if (isNaN(value)) {
                            return false;
                        }
                        return true;
                    },
                    conver: function (value) {
                        return parseInt(value);
                    },
                    update: function (value) {
                        this.workspace.renderGrid();
                    }
                },
                "border-style": {
                    text: "table-border",
                    type: "buttons",
                    group: "table",
                    updateInLoad: false,
                    source: $.formbuilder["BORDER-STYLE"],
                    "extend-params": {
                        "rows": 2,
                        multiple: true
                    },
                    update: function (value) {
                        var $cells = this.elem.find("." + this.className.cell),
                          self = this;

                        _.each($cells, function (cell) {
                            self.updateProperties($(cell), "border-style", value, "border-table-style");
                        });
                    }
                },
                "border-color": {
                    text: "border-color",
                    type: "colorpicker",
                    updateInLoad: false,
                    source: {
                        defaultValue: "#ccc"
                    },
                    group: "table-cell",
                    update: function (value) {
                        var $cells = this.elem.find("." + this.className.cell),
                          self = this;
                        _.each($cells, function (cell) {
                            self.updateProperties($(cell), "border-color", value, "border-table-color");
                        });
                    }
                },
                paging: {
                    text: "paging",
                    type: "bool",
                    hidden: true,
                    updateInLoad: false,
                    source: {
                        text: "paging",
                        image: "paging.png"
                    },
                    update: function (value) { }
                },
                center: {
                    text: "table-center",
                    type: "bool",
                    source: {
                        text: "center",
                        image: "center.png"
                    },
                    after: ["print-size"],
                    update: function (value) {
                        var _value = "auto";
                        if (value === false) {
                            _value = 0;
                        }

                        this.elem.find("." + this.className.tbodyContent).css("margin", _value);
                    }
                },
                "print-size": {
                    text: "print-size",
                    type: "buttons",
                    group: "table",
                    //updateInLoad: false,
                    source: $.formbuilder["PRINT-SIZE"],
                    designUpdate: function (value, position, data) {
                        var direction = data["print-direction"] || "vertical",
                          zoom = 4,
                          A3 = {
                              width: 297,
                              height: 420
                          },
                          A4 = {
                              width: 210,
                              height: 297
                          },
                          SIZES = {
                              A3: {
                                  width: A3.width * zoom,
                                  height: A3.height * zoom
                              },
                              A4: {
                                  width: A4.width * zoom,
                                  height: A4.height * zoom
                              }
                          },
                          offset = {
                              top: 22,
                              left: 32
                          },
                          left = 0,
                          _size,
                          size,
                          html,
                          $container,
                          $table,
                          $elem;

                        $elem = this.elem.find(".formbuilder-print-size");
                        if (!value || value === "print-none") {
                            $elem.hide();
                            return;
                        }

                        $elem.show();
                        $container = this.elem.find("." + this.className.tbodyContainer);
                        $table = this.elem.find("." + this.className.tbodyContent);
                        if ($elem.length === 0) {
                            html = "\
              <div class='formbuilder-print-size'>\
                <div class='formbuilder-print-size-top'></div>\
                <div class='formbuilder-print-size-bottom'></div>\
                <div class='formbuilder-print-size-left'></div>\
                <div class='formbuilder-print-size-right'></div>\
              </div>";
                            $elem = $(html);
                            $container.append($elem);
                        }

                        size = SIZES[value];
                        if (direction === "horizontal") {
                            _size = size;
                            size = {
                                width: _size.height,
                                height: _size.width
                            };
                        }
                        //居中偏移
                        if (data.center) {
                            left = ($container.width() - $table.width()) / 2;
                            left = left < 0 ? 0 : Math.ceil(left);
                        }

                        $elem.find(".formbuilder-print-size-top").css({
                            width: size.width,
                            top: offset.top,
                            left: offset.left + left
                        });
                        $elem.find(".formbuilder-print-size-bottom").css({
                            width: size.width,
                            top: size.height + offset.top,
                            left: offset.left + left
                        });
                        $elem.find(".formbuilder-print-size-left").css({
                            height: size.height,
                            top: offset.top,
                            left: offset.left + left
                        });
                        $elem.find(".formbuilder-print-size-right").css({
                            height: size.height,
                            top: offset.top,
                            left: size.width + offset.left + left
                        });
                    }
                },
                "print-direction": {
                    text: "print-direction",
                    type: "buttons",
                    group: "table",
                    updateInLoad: false,
                    after: ["print-size"],
                    source: $.formbuilder["PRINT-DIRECTION"],
                    designUpdate: function (value, position, data) { }
                }
            },
            row: {
                height: {
                    text: "table-row-height",
                    type: "textbox",
                    group: "table-row",
                    updateInLoad: false,
                    checking: function (value) {
                        if (value === "auto") {
                            return true;
                        }

                        if (isNaN(value)) {
                            return false;
                        }

                        value = Number(value);
                        if (typeof value === "number") {
                            if (value >= 1) {
                                return true;
                            }
                        }

                        return false;
                    },
                    conver: function (value) {
                        if (!isNaN(value) && value) {
                            value = Number(value);
                        }
                        return value;
                    },
                    update: function (value, position, data, elems) {
                        var timestamp = $.formbuilder.getTimestamp(),
                          self = this,
                          $index,
                          $row,
                          cellElems;

                        elems = elems || this.getRowSelectedCells(position.x);
                        $index = elems.$index;
                        cellElems = elems.cells;
                        $row = elems.$row;

                        $row.css("height", value);
                        if ($index) {
                            $index.css("height", value);
                            $index.find(">div:first").css({
                                height: value,
                                "line-height": value === "auto" ? "normal" : value + "px",
                                overflow: "hidden"
                            });
                        }

                        _.each(cellElems, function (elem) {
                            var $elem = $(elem),
                              p = self.getPosition($elem),
                              cell = self.findObj(self.options.cells, p.x, p.y),
                              $control;

                            $elem.attr("data-height", value).css("height", value);
                            $control = $elem.find("." + self.workspace.className.relateProperty);
                            self.updateProperties($control, "height-container", undefined, timestamp);

                            $.formbuilder.updatePropertiesByOptions(self.pattern, self, ["border-style"], cell, [$elem]);
                        });
                    },
                    afterDesignUpdate: function (value, position, data, $elems) {
                        this.resizeRangeHighlight(this.workspace.findRowIndex(position.x), position.x, "row");
                    }
                }
            },
            column: {
                width: {
                    text: "table-column-width",
                    type: "textbox",
                    group: "table-column",
                    updateInLoad: false,
                    checking: function (value) {
                        if (typeof value === "string") {
                            value = value.replace(/%/, "");
                        }
                        if (!isNaN(value)) {
                            value = Number(value);
                        }

                        if (typeof value === "number") {
                            if (value >= 1) {
                                return true;
                            }
                        }

                        return false;
                    },
                    conver: function (value) {
                        if (!isNaN(value) && value) {
                            return Number(value);
                        }
                        return value;
                    },
                    update: function (value, position, data, $elems) {
                        var $elem = $elems || this.workspace.findColumnIndex(position.y);
                        if ($elem) {
                            $elem.css("width", value);
                        }
                    },
                    afterDesignUpdate: function (value, position, data, $elems) {
                        this.resizeRangeHighlight(this.workspace.findColumnIndex(position.y), position.y, "column");
                    }
                }
            },
            cell: {
                rowspan: {
                    text: "table-cell-rowspan",
                    type: "textbox",
                    group: "table-cell",
                    after: ["border-style", "oblique-line"],
                    order: 1,
                    checking: function (value, position) {
                        var reg = /^[1-9]+$/,
                          rows = this.options.table.rows;

                        if (isNaN(value)) {
                            return false;
                        }
                        value = Number(value);
                        if (typeof value === "number") {
                            if (reg.test(value)) {
                                //判断是否超出范围
                                if (position.x + value <= rows) {
                                    return true;
                                }
                            }
                        }

                        return false;
                    },
                    conver: function (value) {
                        if (!isNaN(value) && value) {
                            return Math.floor(Number(value));
                        }
                        return 1;
                    },
                    update: function (value, position) {
                        var _value, elem, last, current;

                        elem = this.findCell(position.x, position.y);
                        if (!elem) {
                            return;
                        }

                        _value = parseInt(value) || 1;
                        last = {
                            rowspan: parseInt(elem.attr("rowspan")) || 1,
                            colspan: parseInt(elem.attr("colspan")) || 1
                        };
                        current = {
                            rowspan: parseInt(_value) || 1,
                            colspan: parseInt(elem.attr("colspan")) || 1
                        };

                        if (_.isEqual(last, current)) {
                            return;
                        }

                        elem.attr({
                            colspan: current.colspan,
                            rowspan: current.rowspan
                        });
                        this.updateCell(position, last, current);
                    }
                },
                colspan: {
                    text: "table-cell-colspan",
                    type: "textbox",
                    group: "table-cell",
                    order: 1,
                    after: ["border-style", "oblique-line"],
                    checking: function (value, position) {
                        var reg = /^[1-9]+$/,
                          columns = this.options.table.columns;

                        if (isNaN(value)) {
                            return false;
                        }
                        value = Number(value);
                        if (typeof value === "number") {
                            if (reg.test(value)) {
                                //判断是否超出范围
                                if (position.y + value <= columns) {
                                    return true;
                                }
                            }
                        }

                        return false;
                    },
                    conver: function (value) {
                        if (!isNaN(value) && value) {
                            return Math.floor(Number(value));
                        }
                        return 1;
                    },
                    update: function (value, position) {
                        var _value, elem, last, current;

                        elem = this.findCell(position.x, position.y);
                        if (!elem) {
                            return;
                        }

                        _value = parseInt(value) || 1;
                        last = {
                            rowspan: parseInt(elem.attr("rowspan")) || 1,
                            colspan: parseInt(elem.attr("colspan")) || 1
                        };
                        current = {
                            rowspan: parseInt(elem.attr("rowspan")) || 1,
                            colspan: parseInt(_value) || 1
                        };

                        if (_.isEqual(last, current)) {
                            return;
                        }

                        elem.attr({
                            colspan: current.colspan,
                            rowspan: current.rowspan
                        });
                        this.updateCell(position, last, current);
                    }
                },
                "border-style": {
                    text: "cell-border-style",
                    type: "buttons",
                    group: "table-cell",
                    order: 3,
                    timestamp: true,
                    source: $.formbuilder["BORDER-STYLE"],
                    update: function (value, position, data) {
                        var x = position.x,
                          y = position.y,
                          $elem = this.findCell(x, y),
                          style = ["border-solid", "border-none", "border-solid-heavy"],
                          _value;

                        if (!$elem) {
                            return;
                        }

                        value = data["border-style"];
                        if (!_.isObject(value)) {
                            value = {
                                value: value || "",
                                timestamp: null,
                                zIndex: 0
                            };
                        }
                        if (!value.value) {
                            value.value = this.options.table["border-style"] || this.propertyField.table["border-style"];
                            value.timestamp = "border-table-style";
                        }
                        _value = value.value;
                        $elem.removeClass(style.join(" ")).addClass(_value);

                        this.adjustBorderWidth($elem, 0, position, data);
                        this.adjustBorder($elem, position, data);
                        this.adjustSpanBorderWidth($elem, position, data);
                    }
                },
                "border-color": {
                    text: "border-color",
                    type: "colorpicker",
                    updateInLoad: false,
                    timestamp: true,
                    source: {
                        defaultValue: "#ccc"
                    },
                    group: "table-cell",
                    after: ["border-style"],
                    update: function (value, position, data) { }
                },
                "border-position": {
                    text: "cell-border-position",
                    type: "buttons",
                    updateInLoad: false,
                    group: "table-cell",
                    hidden: true,
                    //order: 3,
                    //timestamp: false,
                    source: $.formbuilder["BORDER-POSITION"],
                    update: function (value, position, data) { }
                },
                "background-color": {
                    text: "background-color",
                    type: "colorpicker",
                    source: {
                        defaultValue: "#fff"
                    },
                    group: "table-cell",
                    update: function (value, position) {
                        if (!value) {
                            return;
                        }
                        var elem = this.findCell(position.x, position.y);
                        if (elem) {
                            elem.css("background-color", value);
                        }
                    }
                },
                "oblique-line": {
                    text: "obliqueline",
                    type: "buttons",
                    group: "table-cell",
                    updateInLoad: false,
                    defaultValue: "#ccc",
                    //timestamp: true,
                    source: $.formbuilder["OBLIQUELINE-STYLE"],
                    update: function (value, position, data) {
                        if (!value) {
                            return;
                        }
                        var $cell,
                          $container,
                          $items,
                          width,
                          height,
                          obliqueline,
                          deg,
                          style = {
                              "NONE": "obliqueline-none",
                              "LEFT-ONE": "obliqueline-left-one"
                          },
                          hasContainer = true;

                        $cell = this.findCell(position.x, position.y);
                        if (!$cell) {
                            return;
                        }
                        $container = $cell.find("." + this.className.obliquelineContainer);
                        value = value || style["NONE"];
                        if ($container.length > 0) {
                            $container.empty();
                        }

                        if (value !== style["NONE"]) {
                            if ($container.length === 0) {
                                hasContainer = false;
                                $container = $("<div class='" + this.className.obliquelineContainer + "'></div>");
                            }
                            if (value === style["LEFT-ONE"]) {
                                $items = $("<div class='" + this.className.obliqueline + "'></div>");
                                width = $cell.width() + 2;
                                height = $cell.height() + 2;
                                obliqueline = Math.ceil(Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)));
                                //将正切值转换为角度
                                deg = Math.floor(Math.atan(height / width) / (Math.PI / 180));
                                $items.css({
                                    width: obliqueline + "px",
                                    top: 0,
                                    left: 0,
                                    transform: "rotate(" + deg + "deg)",
                                    "transform-origin": "top left"
                                });
                            }

                            $items.appendTo($container);
                            //首次创建
                            if (!hasContainer) {
                                $container.appendTo($cell);
                            }
                        }
                    }
                }
            }
        },
        workspace: null,
        getLocalText: function () {
            var language = $.formbuilder.language[this.language] || $.formbuilder.language["zh-CN"];
            return language.toolbox[this.title] || this.title || "";
        },
        update: function () {
            var container = this.container.find(">div");
            container.html("");

            this.formatColumnsWidth();
            this.elem = this.render();
            container.append(this.elem);
            //选择范围
            this.cacheRangeElements();
        },
        bindEvent: function () {
            this.bindSelectCells();
            // 重置拖拽容器
            this.updateDrakeContainers();
            // 绑定行列拖拽事件
            this.bindResizeIndexCell();
            // 绑定数据集插入事件
            this.bindDatasetRowEvent();
        },
        className: {
            table: "formbuilder-table",
            row: "formbuilder-table-row",
            cell: "formbuilder-table-cell",
            indexAllCell: "formbuilder-table-cells-all-index",
            indexRow: "formbuilder-table-row-index",
            indexColumn: "formbuilder-table-column-index",
            indexCell: "formbuilder-table-cell-index",
            indexText: "formbuilder-table-index-text",
            indexCellActive: "formbuilder-table-cell-index-active",
            extendCell: "formbuilder-table-cell-extend",
            cellSelect: "formbuilder-table-cell-selected",
            cellSelectStart: "formbuilder-table-cell-selected-start",
            cellSelectEnd: "formbuilder-table-cell-selected-end",
            colResize: "formbuilder-table-cell-index-col-resize",
            rowResize: "formbuilder-table-cell-index-row-resize",
            resizing: "formbuilder-table-cell-index-resizing",
            colIndexResizing: "formbuilder-table-cell-index-col-resizing",
            rowIndexResizing: "formbuilder-table-cell-index-row-resizing",
            borderSolid: "formbuilder-table-border-solid",
            borderSolidHeavy: "formbuilder-table-border-solid-heavy",
            borderDashed: "formbuilder-table-border-dashed",
            borderNone: "formbuilder-table-border-none",
            controlCut: "formbuilder-table-cell-cut",
            obliquelineContainer: "formbuilder-table-cell-obliqueline-conatiner",
            obliqueline: "formbuilder-table-cell-obliqueline",
            buttons: "formbuilder-dataset-buttons",
            button: "formbuilder-table-button",
            datasetRemoveButton: "formbuilder-dataset-button-remove",
            datasetInsertButton: "formbuilder-dataset-button-insert",
            selectedRange: "frombuilder-table-select-range",
            selectedRangeBorderH: "frombuilder-table-select-range-border-h",
            selectedRangeBorderV: "frombuilder-table-select-range-border-v",
            selectedRangeBorderLeft: "frombuilder-table-select-range-border-left",
            selectedRangeBorderRight: "frombuilder-table-select-range-border-right",
            selectedRangeBorderTop: "frombuilder-table-select-range-border-top",
            selectedRangeBorderBottom: "frombuilder-table-select-range-border-bottom",
            selectedRangeRow: "frombuilder-table-select-range-row",
            selectedRangeCell: "frombuilder-table-select-range-cell",
            tbodyContainer: "frombuilder-table-tbody-container",
            tbodyContent: "frombuilder-table-tbody-content",
            cellBorderContainer: "frombuilder-table-cell-border-container",
            cellBorder: "frombuilder-table-cell-border",
            cellBorderLeft: "frombuilder-table-cell-border-left",
            cellBorderRight: "frombuilder-table-cell-border-right",
            cellBorderTop: "frombuilder-table-cell-border-top",
            cellBorderBottom: "frombuilder-table-cell-border-bottom"
        },
        coverElem: null,
        rangeElem: {
            top: null,
            bottom: null,
            left: null,
            right: null
        },
        cache: {
            "cut-control": null,
            "copy-control": null,
            //IE
            which: null,
            selected: {},
            startSelect: null,
            range: {
                left: 0,
                top: 0,
                width: 0,
                height: 0,
                firstWidth: 0,
                firstHeight: 0,
                endWidth: 0,
                endHeight: 0,
                row: {
                    start: null,
                    end: null
                },
                col: {
                    start: null,
                    end: null
                },
                position: null,
                $cell: null
            },
            max: {
                x: 0,
                y: 0
            }
        },
        //渲染模版的基类
        currentRender: {
            head: {
                row: null,
                column: null
            },
            body: {
                rows: function (rows, columns, startRowIndex) {
                    var html = [],
                      self = this,
                      rowCount = rows.length,
                      columnCount = columns.length;

                    startRowIndex = startRowIndex || 1;
                    _.each(_.range(startRowIndex, (rowCount || 0) + startRowIndex), function (x) {
                        html.push(self.currentRender.body.row.call(self, x, rows[x - 1], columnCount));
                    });

                    return html.join("");
                },
                row: function (x, row, count, template) {

                    return this.template.row({
                        className: {
                            row: this.className.row
                        },
                        height: row.height,
                        index: x,
                        columns: this.currentRender.body.columns.call(this, count, x, row, template)
                    });
                },
                columns: null,
                column: null
            }
        },
        template: {
            container: function (opt) {
                return [
                  "<div>",
                  "  <div class='", opt.className.tbodyContainer, "' >",
                  "    <table class='", opt.className.tbodyContent, "'>",
                  "     ", opt.headHtml,
                  "     ", opt.bodyHtml,
                  "    </table>",
                  "    <div class='", opt.className.range, "'>",
                  "      <div class='", opt.className.borderH, " ", opt.className.borderT, "' ></div>",
                  "      <div class='", opt.className.borderH, " ", opt.className.borderB, "' ></div>",
                  "      <div class='", opt.className.borderV, " ", opt.className.borderL, "' ></div>",
                  "      <div class='", opt.className.borderV, " ", opt.className.borderR, "' ></div>",
                  "    </div>",
                  "  </div>",
                  "</div>"
                ].join("");
            },
            row: function (opt) {

                return ["<tr class='", opt.className.row,
                  "' height='", opt.height, "' data-rowIndex='", opt.index, "'>",
                  opt.columns,
                  "</tr>"].join("");
            },
            design: {
                head: {
                    row: function (opt) {

                        return [
                          "<tr class='", opt.className, "'>",
                          opt.columns,
                          "<td/>",
                          "</tr>"].join("");
                    },
                    column: function (opt) {
                        return [
                          "<td class='", opt.className.td, "' ",
                          "width='", opt.width, "' ",
                          "data-position='[", opt.x, ",", opt.y, "]' ",
                          "data-type='", opt.type, "' ",
                          "data-property-field='", opt.field, "' >",
                          " <div class='", opt.className.text, "'>", opt.index, "</div>",
                          " <div class='", opt.className.resize, "'></div>",
                          "</td > "
                        ].join("");
                    }
                },
                body: {
                    index: function (opt) {
                        return [
                          "<td class='", opt.className.td, "' ",
                          "style='height:", opt.height, "px;' ",
                          " data-position='[", opt.x, ",", opt.y, "]' ",
                          "data-type='", opt.type, "' ",
                          "data-property-field='", opt.field, "'>",
                          "   <div class='", opt.className.text, "' style='overflow:hidden;height:", opt.height, "px;line-height:", opt.line_height, "'>", opt.index, "</div>",
                          "   <div class='", opt.className.resize, "'></div>",
                          "</td> "
                        ].join("");
                    },
                    column: function (opt) {
                        return [
                          "<td class='", opt.className.cell, " ", opt.className.enableDrop, " ", opt.className.relateProperty, "' data-height='", opt.height, "' ",
                          "data-position='[", opt.x, ",", opt.y, "]' ",
                          "data-type='", opt.type, "' ",
                          "data-property-field='cell' ",
                          "data-contextmenu='cells'>",
                          "</td>"
                        ].join("");
                    }
                }
            },
            applying: {
                head: {
                    column: function (opt) {
                        return ["<col class='", opt.className, "' data-position='[", opt.x, ",", opt.y, "]' width='", opt.width, "' ></col>"].join("");
                    }
                },
                body: {
                    column: function (opt) {
                        return [
                          "<td class='", opt.className.cell, " ", opt.className.relateProperty, "' ",
                          "data-height='", opt.height, "'",
                          "data-position='[", opt.x, ",", opt.y, "]' ",
                          "data-type='", opt.type, "' ",
                          "data-property-field='cell' ",
                          "data-contextmenu='cells'>",
                          "</td>"
                        ].join("");
                    }
                }
            }
        },
        //渲染模版
        renderTemplate: {
            design: {
                head: {
                    row: function (columns) {
                        return this.template.design.head.row({
                            className: this.className.indexCell + " " + this.className.indexRow,
                            columns: this.currentRender.head.columns.call(this, columns)
                        });
                    },
                    columns: function (columns) {
                        var html = [],
                          self = this,
                          count = columns.length;

                        //左上角表格全选按钮
                        html.push(self.currentRender.head.column.call(self, -1, -1, count, {}));
                        _.each(_.range(1, (count || 0) + 1), function (y) {
                            html.push(self.currentRender.head.column.call(self, -1, y, count, columns[y - 1]));
                        });

                        return html.join("");
                    },
                    column: function (x, y, count, column) {
                        var index = y,
                          className = this.className.indexCell + " " + this.className.indexColumn,
                          workspaceClassName = this.workspace.className,
                          isAll = x === -1 && y === -1,
                          resizeClassName = "",
                          propertyField;

                        if (isAll) {
                            index = "";
                            className = this.className.indexCell + " " + this.className.indexAllCell;
                            propertyField = "table";
                        } else {
                            propertyField = "column";
                            resizeClassName = this.className.colResize;
                        }

                        className += " " + workspaceClassName.relateProperty;

                        return this.template.design.head.column({
                            className: {
                                td: className,
                                // 最后一列不允许拖拽
                                resize: count !== y ? resizeClassName : "",
                                text: this.className.indexText
                            },
                            x: x,
                            y: y,
                            type: this.type,
                            field: propertyField,
                            index: index,
                            width: column.width || ""
                        });
                    }
                },
                body: {
                    columns: function (count, x, row, template) {
                        var html = [];

                        if (count) {
                            html.push(this.currentRender.body.index.call(this, x, -1, row));
                            for (var i = 1; i < count + 1; i++) {
                                if (_.isArray(template) && !template[i - 1]) {
                                    continue;
                                }
                                html.push(this.currentRender.body.column.call(this, x, i, row));
                            }
                        }

                        return html.join("");
                    },
                    index: function (x, y, row) {
                        var index = x,
                          className = this.className.indexCell + " " + this.className.indexRow,
                          workspaceClassName = this.workspace.className,
                          resizeClassName = this.className.rowResize,
                          propertyField = "row";

                        className += " " + workspaceClassName.relateProperty;
                        return this.template.design.body.index({
                            className: {
                                td: className,
                                resize: resizeClassName,
                                text: this.className.indexText
                            },
                            type: this.type,
                            x: x,
                            y: y,
                            field: propertyField,
                            index: index,
                            height: row.height,
                            line_height: row.height === "auto" ? "normal" : row.height + "px"
                        });
                    },
                    column: function (x, y, row) {
                        var wClassName = this.workspace.className;
                        if (!row) {
                            return "";
                        }
                        return this.template.design.body.column({
                            className: {
                                cell: this.className.cell,
                                enableDrop: wClassName.enableDrop,
                                relateProperty: wClassName.relateProperty
                            },
                            x: x,
                            y: y,
                            type: this.type,
                            height: row.height
                        });
                    }
                }
            },
            applying: {
                head: {
                    row: function (columns) {
                        return this.currentRender.head.columns.call(this, columns);
                    },
                    columns: function (columns) {
                        var html = [],
                          count = columns.length,
                          self = this;

                        if (count) {
                            html.push("<colgroup>");
                            _.each(_.range(1, (count || 0) + 1), function (y) {
                                html.push(self.currentRender.head.column.call(self, -1, y, count, columns[y - 1]));
                            });
                            html.push("<col/>");
                            html.push("</colgroup>");
                        }

                        return html.join("");
                    },
                    column: function (x, y, count, column) {
                        if (y === -1) {
                            return "";
                        }

                        return this.template.applying.head.column({
                            className: this.className.indexCell + " " + this.className.indexColumn,
                            x: x,
                            y: y,
                            width: column.width || ""
                        });
                    }
                },
                body: {
                    columns: function (count, x, row) {
                        var html = [];

                        if (count) {
                            for (var i = 1; i < count + 1; i++) {
                                html.push(this.currentRender.body.column.call(this, x, i, row));
                            }
                        }
                        return html.join("");
                    },
                    column: function (x, y, row) {
                        var wClassName = this.workspace.className;
                        return this.template.applying.body.column({
                            className: {
                                cell: this.className.cell,
                                relateProperty: wClassName.relateProperty
                            },
                            x: x,
                            y: y,
                            type: this.type,
                            height: row.height
                        });
                    }
                }
            }
        },
        render: function () {
            var pattern = {
                design: "design",
                applying: "applying",
                view: "applying"
            },
              renderTemplate = this.renderTemplate,
              $elem,
              html;

            pattern = pattern[this.pattern];
            // 动态创建模版实例
            $.extend(true, this.currentRender, renderTemplate[pattern]);
            html = this.template.container({
                className: {
                    tbodyContainer: this.className.tbodyContainer,
                    tbodyContent: this.className.tbodyContent,
                    range: this.className.selectedRange,
                    button: this.className.button,
                    borderH: this.className.selectedRangeBorderH,
                    borderT: this.className.selectedRangeBorderTop,
                    borderB: this.className.selectedRangeBorderBottom,
                    borderR: this.className.selectedRangeBorderRight,
                    borderL: this.className.selectedRangeBorderLeft,
                    borderV: this.className.selectedRangeBorderV
                },
                headHtml: this.currentRender.head.row.call(this, this.options.columns),
                bodyHtml: this.currentRender.body.rows.call(this, this.options.rows, this.options.columns)
            });
            // 创建网格布局
            $elem = $(html).addClass(this.className.table);

            return $elem;
        },
        formatColumnsWidth: function () {
            var columns = this.options.columns,
              item,
              sum = 0,
              width,
              items = [],
              i,
              len;

            for (i = 0, len = columns.length; i < len; i++) {
                item = columns[i];

                if (item._width !== undefined) {
                    item.width = item._width;
                } else {
                    item._width = item.width;
                }

                if (!item.width) {
                    items.push(item);
                } else if (isNaN(item.width) && item.width.indexOf("%") !== -1) {
                    sum += parseInt(item.width);
                }
            }

            len = items.length;
            width = Math.floor((100 - sum) / len);
            for (i = 0; i < len; i++) {
                item = items[i];
                item.width = width + "%";
            }
        },
        cacheRangeElements: function () {
            this.coverElem = this.elem.find("." + this.className.selectedRange);
            this.rangeElem.top = this.elem.find("." + this.className.selectedRangeBorderTop);
            this.rangeElem.bottom = this.elem.find("." + this.className.selectedRangeBorderBottom);
            this.rangeElem.left = this.elem.find("." + this.className.selectedRangeBorderLeft);
            this.rangeElem.right = this.elem.find("." + this.className.selectedRangeBorderRight);
        },
        updateCell: function (position, last, current) {
            // 复原单元格
            this.cancelMergeCell(last.colspan, last.rowspan, position);
            // 合并单元格
            this.mergeCell(current.colspan, current.rowspan, position);
            // [TODO：性能优化]
            this.updateDrakeContainers();
        },
        cancelMergeCell: function (colspan, rowspan, position) {
            var x, y, $cell, $before, $next, $row, cellObj;

            if (colspan > 1 || rowspan > 1) {
                for (var i = colspan; i > 0; i--) {
                    for (var j = rowspan; j > 0; j--) {
                        x = position.x + j - 1;
                        y = position.y + i - 1;
                        //判断是否超出总行、列数，超出调整跨行、列个数
                        if (x > this.options.table.rows || y > this.options.table.columns) {
                            cellObj = this.findCellObj(position.x, position.y);
                            if (cellObj.rowspan > j) {
                                --cellObj.rowspan;
                            }
                            if (cellObj.colspan > i) {
                                --cellObj.colspan;
                            }
                            continue;
                        }

                        $cell = $(
                          this.findCell(x, y) ||
                          this.currentRender.body.column.call(this, x, y, this.workspace.findRowObj(x))
                        );
                        // 单元格之后存在兄弟单元格
                        $next = this.findCell(position.x + j - 1, position.y + i);
                        if ($next && $next.length === 1) {
                            if (j === 1 && i === 1) {
                                //首个单元格存在，不用添加
                                continue;
                            }
                            $next.before($cell);
                            this.workspace.addCell(x, y, $cell);
                            $.formbuilder.refreshPropertiesBySelecteds(this.pattern, this, ["border-style"], $cell);
                            continue;
                        }
                        // 单元格之后不存在兄弟单元格
                        if (j === 1) {
                            if (colspan === 1) {
                                //首个单元格存在，不用添加
                                continue;
                            }
                            $before = this.findCell(position.x, position.y);
                        } else {
                            $before = this.findCell(position.x + j - 1, position.y - 1);
                        }
                        //如果仍没有找到，说明整行的单元格都进行了合并
                        if (!$before) {
                            $row = this.workspace.findRow(position.x + j - 1);
                            $row.append($cell);
                        }
                        else {
                            $before.after($cell);
                        }

                        this.workspace.addCell(x, y, $cell);
                        //[TODO:重构，支持配置]
                        $.formbuilder.refreshPropertiesBySelecteds(this.pattern, this, ["border-style"], $cell);
                    }
                }
                //重置元件高度
                //[TODO:重构，支持配置：单元格-元件]
                this.updateControlProperty(position.x, position.x, position.y, position.y, ["height-container"]);
            }
        },
        mergeCell: function (colspan, rowspan, p) {
            var p1,
              controls = {
                  "start": null,
                  "top-left": null,
                  "middle": null
              },
              startP,
              $elem,
              control,
              obj;

            if (colspan > 0 || rowspan > 0) {
                //选取保留元件位置的优先级是：选中单元格的开始位置>选中单元格范围的左上角>选中单元格范围中间
                //如果不存在$elem，代表在表单加载状态
                $elem = this.getStartSelected();
                $elem = $elem.length ? $elem : null;
                startP = $elem ? $.formbuilder.getPosition($elem) : p;

                for (var i = 0; i < colspan; i++) {
                    for (var j = 0; j < rowspan; j++) {
                        if (i === 0 && j === 0) {
                            //保存选择区域左上角单元格中的元件
                            if ($elem) {
                                obj = this.findControlData(p.x, p.y);
                                controls["top-left"] = obj;
                                this.workspace.removeControl(p.x, p.y);
                            }
                            //保留当前单元格
                            continue;
                        }

                        p1 = { x: p.x + j, y: p.y + i };

                        if ($elem) {
                            //保存选择区域起始单元格中的元件
                            if (startP.x === p1.x && startP.y === p1.y) {
                                obj = this.findControlData(p1.x, p1.y);
                                controls["start"] = obj;
                            }
                                //保存选择区域中间离左上角较近单元格中的元件
                            else if (!(controls["start"] || controls["top-left"] || controls["middle"])) {
                                obj = this.findControlData(p1.x, p1.y);
                                controls["middle"] = obj;
                            }
                            this.workspace.removeControl(p1.x, p1.y);
                        }
                        this.workspace.removeCell(p1.x, p1.y, p.x, p.y);
                    }
                }

                //重新添加元件
                if ($elem) {
                    control = controls["start"] || controls["top-left"] || controls["middle"];
                    if (control) {
                        this.renderControl(control, p);
                    }
                }
            }
        },
        mergeCells: function ($cells) {
            var $elems = $cells,
              $elem = $($elems.first()),
              p = this.getPosition($elem),
              cell,
              control,
              $item,
              p2,
              rowspan,
              colspan,
              borderStyle,
              rowspanTotal = 0,
              colspanTotal = 0,
              x = p.x,
              y = p.y;

            for (var i = 0, len = $elems.length; i < len; i++) {
                $item = $($elems[i]);
                p2 = this.getPosition($item);
                //计算单元格合并的跨行和跨列
                colspan = parseInt($item.attr("colspan")) || 1;
                rowspan = parseInt($item.attr("rowspan")) || 1;
                if (p2.x === x) {
                    colspanTotal += colspan;
                }
                if (p2.y === y) {
                    rowspanTotal += rowspan;
                }
            }

            cell = this.findCellObj(x, y);
            //合并单元格
            cell.rowspan = rowspanTotal;
            cell.colspan = colspanTotal;
            this.property.cell.rowspan.update.call(this, rowspanTotal, p);
            this.property.cell.colspan.update.call(this, colspanTotal, p);

            this.clearAllState();
            this.setSelectedRange($elem, $elem);
            borderStyle = cell["border-style"];
            borderStyle = borderStyle ? (borderStyle.value || borderStyle) : this.options.table["border-style"];
            this.updateProperties(
              $elem,
              "border-style",
              borderStyle,
              $.formbuilder.getTimestamp());

            control = this.findControlObj(x, y);
            if (control && control.type) {
                //重新计算元件容器高度
                this.updateProperties(control.container, "height-container");
            }
        },
        cancelMergeCells: function ($cells, $target) {
            var $elems = $cells,
              $elem,
              start,
              end,
              $start,
              $end,
              colspan,
              rowspan,
              position,
              positions = [],
              cell,
              i,
              len,
              getRange = function (x, y) {
                  if (!start) {
                      start = { x: x, y: y };
                  }
                  if (!end) {
                      end = { x: x, y: y };
                  }

                  if (x <= start.x) {
                      start.x = x;
                  }
                  if (y <= start.y) {
                      start.y = y;
                  }
                  if (x >= end.x) {
                      end.x = x;
                  }
                  if (y >= end.y) {
                      end.y = y;
                  }
              };

            //在选择范围内查找
            if ($elems.length > 1) {
                for (i = 0, len = $elems.length; i < len; i++) {
                    $elem = $($elems[i]);
                    colspan = parseInt($elem.attr("colspan") || 1);
                    rowspan = parseInt($elem.attr("rowspan") || 1);
                    position = this.getPosition($elem);
                    if (colspan > 1 || rowspan > 1) {
                        positions.push(position);
                    }
                    getRange(position.x, position.y);
                }
            } else {
                $elem = $target;
                position = this.getPosition($elem);
                positions.push(position);
                getRange(position.x, position.y);
            }

            //取消合并
            for (i = 0, len = positions.length; i < len; i++) {
                position = positions[i];
                cell = this.findObj(this.options.cells, position.x, position.y);
                getRange(position.x + (cell.rowspan - 1), position.y + (cell.colspan - 1));
                cell.rowspan = 1;
                cell.colspan = 1;
                this.property.cell.rowspan.update.call(this, 1, position);
                this.property.cell.colspan.update.call(this, 1, position);
            }

            this.clearAllState();
            //选中操作的单元格
            $start = this.findCell(start.x, start.y);
            $end = this.findCell(end.x, end.y);
            this.setSelectedRange($start, $end);
            //设置边框
            this.updateBorderStyle(start.x - 1, end.x + 1, start.y - 1, end.y + 1, cell);
        },
        getCellsByRange: function (startRow, endRow, startCol, endCol) {
            var elems = [],
              self = this;

            _.forEach(_.range(startRow, endRow + 1), function (x) {
                _.forEach(_.range(startCol, endCol + 1), function (y) {
                    elems.push(self.findCell(x, y));
                });
            });

            return elems;
        },
        getPropertyControl: function (type, position) {
            return type === "_table" ? this : this.findControlObj(position.x, position.y);
        },
        getPropertyItems: function (type, field, position) {
            return type === "_table"
              ? field
                ? this.property[field]
                : this.property
              : this.findControlObj(position.x, position.y).property;
        },
        getPropertyData: function (type, field, position) {
            var data = this.options,
              propertyMap = this.propertyMap,
              obj,
              options;

            if (!data) {
                return null;
            }

            if (type === "_table" && field) {
                options = data[propertyMap[field].map];
                if (_.isArray(options)) {
                    options = this.findObj(options, position.x, position.y);
                }
            } else {
                //控件属性数据
                obj = this.findControlObj(position.x, position.y) || null;
                options = obj && obj.elem && obj.type ? obj.options : obj;
            }

            return options;
        },
        getControl: function (type, position) {
            var control;

            switch (type) {
                case "_table":
                    control = this;
                    break;
                default:
                    if (position) {
                        control = this.findControlObj(position.x, position.y);
                    }
                    break;
            }

            return control;
        },
        removeControls: function () {
            var self = this,
              p,
              elems = self.getSelected();

            elems.each(function () {
                p = self.getPosition($(this));
                self.removeControl(p);
            });
        },
        removeControl: function (position) {
            this.workspace.removeControl(position.x, position.y);
        },
        cancelCutControlActive: function () {
            var controls = this.cache["cut-control"],
              $elem;

            if (controls && controls.length > 0) {
                for (var i = 0, len = controls.length; i < len; i++) {
                    $elem = controls[i].elem;
                    $elem.removeClass(this.className.controlCut);
                }
            }
        },
        cutControls: function () {
            var self = this,
              position,
              elems = self.getSelected();

            this.cancelCutControlActive();
            this.cache["cut-control"] = [];
            this.cache["copy-control"] = null;

            elems.each(function () {
                var $elem = $(this);
                position = self.getPosition($elem);
                self.cutControl($elem, position);
            });
        },
        cutControl: function (elem, position) {
            this.cache["cut-control"].push({
                elem: elem,
                position: position
            });
            elem.addClass(this.className.controlCut);
        },
        copyControls: function () {
            var self = this,
              position,
              $elems = self.getSelected();

            this.cancelCutControlActive();
            this.cache["cut-control"] = null;
            this.cache["copy-control"] = [];

            $elems.each(function () {
                var $elem = $(this);
                position = self.getPosition($elem);
                self.copyControl($elem, position);
            });
        },
        copyControl: function (elem, position) {
            this.cache["copy-control"].push({
                elem: elem,
                position: position
            });
        },
        pasteControls: function () {
            var self = this,
              type = this.cache["cut-control"] ? "cut" : "copy",
              cache,
              control,
              $startElem,
              $endElem,
              startP,
              endP,
              p,
              offsetX,
              offsetY,
              fn;

            this.cancelCutControlActive();
            if (type === "cut") {
                cache = this.cache["cut-control"];
                this.cache["cut-control"] = null;
                fn = this.pasteCutControl;
            } else {
                cache = this.cache["copy-control"];
                fn = this.pasteCopyControl;
            }

            if (cache && cache.length > 0) {
                $startElem = this.getStartSelected();
                startP = this.getPosition($startElem);
                endP = startP;

                p = _.clone(cache[0].position);
                offsetX = startP.x - p.x;
                offsetY = startP.y - p.y;

                //调整行及单元格样式
                _.chain(cache)
                  .each(function (item) {
                      var p1 = item.position,
                        p2 = {
                            x: p1.x + offsetX,
                            y: p1.y + offsetY
                        },
                        cell,
                        $cell;

                      cell = self.findCellObj(p1.x, p1.y);
                      $cell = self.findCell(p2.x, p2.y);
                      self.updateProperties($cell, ["rowspan", "colspan"], [cell.rowspan, cell.colspan]);
                  })
                  .map(function (item) {
                      return item.position.x;
                  })
                  .uniq()
                  .each(function (x) {
                      var x1 = x,
                        x2 = x + offsetX,
                        row = self.workspace.findRowObj(x1),
                        $index = self.workspace.findRowIndex(x2);

                      self.updateProperties($index, "height", row.height);
                  })
                  .value();
                //粘贴元件
                for (var i = 0, len = cache.length; i < len; i++) {
                    control = cache[i];
                    p.x = control.position.x + offsetX;
                    p.y = control.position.y + offsetY;
                    fn.call(this, control.position, p);

                    if (p.x > endP.x && this.options.table.rows - 1 >= p.x) {
                        endP[0] = p[0];
                    }
                    if (p.y > endP.y && this.options.table.columns - 1 >= p.y) {
                        endP.y = p.y;
                    }
                }

                $endElem = this.findCell(p.x, p.y);
                this.setSelectedRange($startElem, $endElem);
            }
        },
        pasteCutControl: function (lastP, curP) {
            var obj = this.findControlObj(lastP.x, lastP.y),
              options = $.extend(true, {}, obj.options);

            if (!obj.type) {
                return;
            }
            this.removeControl(lastP);
            this.removeControl(curP);
            this.renderControl(options, curP);
        },
        pasteCopyControl: function (lastP, curP) {
            var obj = this.findControlObj(lastP.x, lastP.y),
              options = $.extend(true, {}, obj.options);

            if (!obj.type) {
                return;
            }
            options.id = null;
            options["extension-direction"] = null;
            options["relation-position"] = null;
            this.removeControl(curP);
            this.renderControl(options, curP);
        },
        clearAllState: function () {
            this.elem
              .find("td")
              .removeClass(
                [
                  this.className.cellSelect,
                  this.className.cellSelectStart,
                  this.className.cellSelectEnd,
                  this.className.indexCellActive
                ].join(" ")
              );
        },
        clearSelectedState: function () {
            this.elem.find("." + this.className.cellSelect).removeClass([this.className.cellSelect].join(" "));

            this.elem.find("." + this.className.indexCellActive).removeClass(this.className.indexCellActive);
        },
        getStartSelected: function () {
            return this.elem.find("td." + this.className.cellSelectStart);
        },
        getEndSelected: function () {
            return this.elem.find("td." + this.className.cellSelectEnd);
        },
        getSelected: function () {
            return this.elem.find("td." + this.className.cellSelect);
        },
        getSelectedControl: function () {
            return this.elem.find("td." + this.className.cellSelect + " ." + this.workspace.className.item);
        },
        setIndexCellActive: function ($elem) {
            $elem.addClass(this.className.indexCellActive);
        },
        setColumnActive: function (y) {
            var self = this,
              $cells,
              $indexes;

            $cells = this.workspace.findColumnCells(y);
            if (!$cells || $cells.length === 0) {
                return [];
            }

            _.each($cells, function ($elem) {
                $elem.addClass(self.className.cellSelect);
            });

            $indexes = this.workspace.findAllRowIndex();

            _.each($indexes, function ($index) {
                if ($index && $index.length > 0) {
                    $index.addClass(self.className.indexCellActive);
                }
            });

            return $indexes.length ? $indexes[$indexes.length - 1] : null;
        },
        setRowActive: function (x) {
            var self = this,
              $cells,
              $indexes;

            $cells = this.workspace.findRowCells(x);
            if (!$cells || $cells.length === 0) {
                return [];
            }
            //设置选中的单元格
            _.each($cells, function ($elem) {
                $elem.addClass(self.className.cellSelect);
            });

            $indexes = this.workspace.findAllColumnIndex();

            _.each($indexes, function ($index) {
                if ($index && $index.length > 0) {
                    $index.addClass(self.className.indexCellActive);
                }
            });

            return $indexes.length ? $indexes[$indexes.length - 1] : null;
        },
        setSelectdState: function ($elem) {
            $elem.addClass([this.className.cellSelect].join(" "));
        },
        setSelectdStartState: function ($elem, cancel) {
            var className = [this.className.cellSelect, this.className.cellSelectStart].join(" ");
            if (!cancel) {
                $elem.addClass(className);
            } else {
                $elem.removeClass(className);
            }
        },
        setSelectdEndState: function ($elem, cancel) {
            var className = [this.className.cellSelect, this.className.cellSelectEnd].join(" ");
            if (!cancel) {
                $elem.addClass(className);
            } else {
                $elem.removeClass(className);
            }
        },
        setSelectedCell: function ($elem) {
            if (this.isInSelectedRang($elem)) {
                return;
            }
            this.clearAllState();
            this.setSelectdStartState($elem);
            this.setSelectdEndState($elem);
            this.setSelectedRange($elem, $elem);
        },
        isInSelectedRang: function ($elem) {
            var selected = this.getSelected(),
              p;

            if (selected.length > 1) {
                p = this.getPosition($elem);
                selected = this.filterCells(p.x, p.y, "", selected);
                if (selected.length === 1) {
                    return true;
                }
            }
        },
        setSelectedRange: function ($startElem, $endElem) {
            var p1, p2, x1, y1, x2, y2, temp, cell, rowspan, colspan, i, j;

            // 获取开始的单元格
            if ($startElem && $startElem.length > 0) {
                p1 = this.getPosition($startElem) || null;
            }
            // 获取结束的单元格
            if ($endElem && $endElem.length > 0) {
                p2 = this.getPosition($endElem) || null;
            }

            if (!p1 || !p2) {
                return;
            }
            //选择了一个单元格
            if (_.isEqual(p1, p2)) {
                cell = this.findCellObj(p1.x, p1.y) || {};
                x1 = p1.x;
                y1 = p1.y;
                x2 = p1.x + (cell.rowspan || 1) - 1;
                y2 = p1.y + (cell.colspan || 1) - 1;
            }
                //选择了多个单元格
            else {
                // 计算开始和结束的行列坐标值
                x1 = p1.x;
                y1 = p1.y;
                x2 = p2.x;
                y2 = p2.y;
                // 排序开始、结束坐标
                if (x1 > x2) {
                    temp = x1;
                    x1 = x2;
                    x2 = temp;
                }
                if (y1 > y2) {
                    temp = y1;
                    y1 = y2;
                    y2 = temp;
                }
                // 选择范围区域内存在合并的单元格
                for (i = x1; i <= x2; i++) {
                    for (j = y1; j <= y2; j++) {
                        cell = this.findCellObj(i, j);
                        if (!cell.rowspan && !cell.colspan) {
                            if (x1 > cell.x1) {
                                x1 = cell.x1;
                            }
                            if (y1 > cell.y1) {
                                y1 = cell.y1;
                            }
                        }
                        rowspan = cell.rowspan;
                        colspan = cell.colspan;
                        if (colspan > 1 && j + colspan - 1 > y2) {
                            y2 = j + colspan - 1;
                        }
                        if (rowspan > 1 && i + rowspan - 1 > x2) {
                            x2 = i + rowspan - 1;
                        }
                    }
                }
            }
            // 设置选择范围高亮
            this.setRangeHighlight(x1, x2, y1, y2);
        },
        renderRangeHighlight: function (left, right, top, bottom) {
            this.rangeElem.top.css({
                left: top.left,
                top: top.top,
                width: top.width
            });
            this.rangeElem.bottom.css({
                left: bottom.left,
                top: bottom.top,
                width: bottom.width
            });
            this.rangeElem.left.css({
                left: left.left,
                top: left.top,
                height: left.height
            });
            this.rangeElem.right.css({
                left: right.left,
                top: right.top,
                height: right.height
            });

            this.rangeElem.top.show();
            this.rangeElem.bottom.show();
            this.rangeElem.left.show();
            this.rangeElem.right.show();
        },
        displayRangeHighlight: function (startRow, endRow, startCol, endCol, position, $cell) {
            var offset,
              x = position.x,
              y = position.y,
              cell,
              cache = this.cache;

            if (!$cell || $cell.length === 0) {
                return;
            }

            //设置起始位置
            if (x === startRow && y === startCol) {
                offset = $cell.position();
                cache.selected = {};
                cache.range.left = offset.left;
                cache.range.top = offset.top;
            }
            //结束位置
            if (x === endRow && y === endCol) {
                if ($cell.length === 0) {
                    cell = this.findCellObj(position.x, position.y);
                    position = { x: cell.x1, y: cell.y1 };
                    $cell = this.findCell(position.x, position.y);
                }
                offset = $cell.position();
                cache.range.endWidth = $cell.outerWidth();
                cache.range.endHeight = $cell.outerHeight();
                cache.range.right = offset.left + cache.range.endWidth - 1;
                cache.range.bottom = offset.top + cache.range.endHeight;
                cache.range.width = cache.range.right - cache.range.left;
                cache.range.height = cache.range.bottom - cache.range.top + 2;

                //绘制框线
                this.renderRangeHighlight(
                  {
                      left: cache.range.left,
                      top: cache.range.top,
                      height: cache.range.height
                  },
                  {
                      left: cache.range.right,
                      top: cache.range.top,
                      height: cache.range.height
                  },
                  {
                      left: cache.range.left,
                      top: cache.range.top,
                      width: cache.range.width
                  },
                  {
                      left: cache.range.left,
                      top: cache.range.bottom,
                      width: cache.range.width
                  });
            }
        },
        displayRowRangeHeighlight: function ($rowIndex, index) {
            var $endColIndex = this.setRowActive(index),
              p1 = $rowIndex.position(),
              p2 = $endColIndex.position(),
              height = $rowIndex.outerHeight(),
              left = p1.left + $rowIndex.outerWidth(),
              top = p1.top,
              bottom = p1.top + height,
              right = p2.left + $endColIndex.outerWidth(),
              width = right - left + 2;

            this.renderRangeHighlight(
              {
                  top: top,
                  left: left,
                  height: height,
              },
              {
                  top: top,
                  left: right,
                  height: height,
              },
              {
                  top: top,
                  left: left,
                  width: width
              },
              {
                  top: bottom,
                  left: left,
                  width: width
              }
            );
        },
        displayColRangeHeighlight: function ($colIndex, index) {
            var $endRowIndex = this.setColumnActive(index),
              p1 = $colIndex.position(),
              p2 = $endRowIndex.position(),
              width = $colIndex.outerWidth(),
              left = p1.left,
              right = p1.left + width,
              top = p1.top + $colIndex.outerHeight(),
              bottom = p2.top + $endRowIndex.outerHeight(),
              height = bottom - top + 2;


            this.renderRangeHighlight(
              {
                  top: top,
                  left: left,
                  height: height,
              },
              {
                  top: top,
                  left: right,
                  height: height,
              },
              {
                  top: top,
                  left: left,
                  width: width
              },
              {
                  top: bottom,
                  left: left,
                  width: width
              }
            );
        },
        hideRangeHighlight: function () {
            this.rangeElem.top.hide();
            this.rangeElem.bottom.hide();
            this.rangeElem.left.hide();
            this.rangeElem.right.hide();
        },
        setRangeHighlight: function (startRow, endRow, startCol, endCol) {
            var i, j, position, $index, $cell, cell;

            for (i = startRow; i <= endRow; i++) {
                // 索引行位置高亮
                if (i !== -1) {
                    $index = this.workspace.findRowIndex(i);
                    this.setIndexCellActive($index);
                }

                for (j = startCol; j <= endCol; j++) {
                    // 索引列位置高亮
                    if (j !== -1) {
                        $index = this.workspace.findColumnIndex(j);
                        this.setIndexCellActive($index);
                    }
                    if (i === -1 || j === -1) {
                        return;
                    }
                    // 选中的单元格高亮
                    $cell = this.findCell(i, j);
                    if ($cell && $cell.length) {
                        this.setSelectdState($cell);
                    } else {
                        //查找合并的单元格
                        cell = this.findCellObj(i, j);
                        position = { x: cell.x1, y: cell.y1 };
                        $cell = this.findCell(position.x, position.y);
                    }
                    this.displayRangeHighlight(startRow, endRow, startCol, endCol, { x: i, y: j }, $cell);
                }
            }
        },
        resizeRangeHighlight: function ($index, index, type) {
            if (type === "row") {
                this.displayRowRangeHeighlight($index, index);
            }
            else if (type === "column") {
                this.displayColRangeHeighlight($index, index);
            }
        },
        bindSelectCells: function () {
            if (this.pattern === $.formbuilder.PATTERN.DESIGN) {
                this.bindSelectRange();
                this.bindActiveIndexCell();
            }
        },
        bindSelectRange: function () {
            var self = this;

            this.elem.on("mousedown", "." + this.className.cell, function selectRangeMousedown(e) {
                var $cell = $(this),
                  $target = $(e.target);

                if (
                  e.which !== 1 ||
                    //IE 10 及以上
                  (e.button === 0 && e.buttons === 0)
                ) {
                    return;
                }
                //console.log("mousedown cell");
                self.clearAllState();
                //IE阻止文字的选中
                document.onselectstart = function () {
                    return false;
                };

                self.cache.which = 1;
                //console.log("mousedown:" + self.cache.which);
                self.cache.startSelect = $target;
                self.setSelectdStartState($cell);
            });

            this.elem.on("mouseover", "." + this.className.cell, function selectRangeMouseover(e) {
                var cell = $(this);
                //console.log("mouseover cell");

                if (self.cache.which !== 1) {
                    return;
                }
                //console.log("mouseover:" + self.cache.which);
                if (self.isControlInDrag()) {
                    return;
                }
                self.clearSelectedState();
                self.setSelectedRange(self.getStartSelected(), cell);
            });

            this.elem.on("mouseup", "." + this.className.cell, function selectRangeMouseup(e) {
                var $end = $(this),
                  $start,
                  $target;

                //IE恢复文字的选中
                document.onselectstart = function () {
                    return true;
                };

                //console.log("mouseup:" + self.cache.which);
                if (self.cache.which !== 1) {
                    return;
                }
                self.cache.which = null;
                //console.log("mouseup cell");
                if (self.isControlInDrag()) {
                    return;
                }

                $start = self.getStartSelected();
                self.setSelectdEndState($end);
                self.setSelectedRange($start, $end);

                if ($start.length > 0) {
                    $target = self.cache.startSelect.closest("." + self.workspace.className.relateProperty);
                    self.showGridProperty($target);
                }
            });
        },
        bindActiveIndexCell: function () {
            var self = this;

            this.elem.on("click", "td." + this.className.indexCell, function (e) {
                var $cell = $(this),
                  position = self.getPosition($cell),
                  columnIndex = position.y,
                  rowIndex = position.x;

                self.clearAllState();
                self.setIndexCellActive($cell);
                self.hideRangeHighlight();
                self.workspace.builder.updateProperty($cell);

                if (rowIndex === -1 && columnIndex !== -1) {
                    self.displayColRangeHeighlight($cell, columnIndex);
                } else if (columnIndex === -1 && rowIndex !== -1) {
                    self.displayRowRangeHeighlight($cell, rowIndex);
                }
            });
        },
        bindResizeIndexCell: function () {
            if (this.pattern === $.formbuilder.PATTERN.DESIGN) {
                this.bindColResize();
                this.bindRowResize();
            }
        },
        renderDatasetButtons: function (opt) {
            return [
              "<div class='", opt.className.buttons, "' style='top:2px;left:2px;'>",
              "<div class='", opt.className.button, " ", opt.className.insertButton, "' style='background-image:url(", opt.insertIcon, ");'></div>",
              opt.removeIcon ?
                ["<div class='", opt.className.button, " ", opt.className.removeButton, "' style='background-image:url(", opt.removeIcon, ");'></div>"].join("") : "",
              "</div>"
            ].join("");
        },
        getDatasetRowInfo: function ($elem) {
            var dataset,
              vertical,
              horizontal,
              index,
              item,
              items,
              position;

            dataset = this.workspace.datasetRows;
            if (!dataset) {
                return null;
            }
            vertical = dataset.vertical;
            horizontal = dataset.horizontal;
            position = $.formbuilder.getPosition($elem);
            index = position.x;
            item = vertical[index] || horizontal[index];
            if (item && item.type === "horizontal") {
                items = item;
                item = item[position.y];
            }
            else {
                items = vertical;
            }

            return {
                items: items,
                item: item
            };
        },
        bindDatasetRowEvent: function () {
            if (this.pattern !== $.formbuilder.PATTERN.APPLYING) {
                return;
            }

            var self = this,
              $elem = $(this.elem),
              $buttons,
              buttons,
              info;

            $elem.on("mouseenter", "td." + this.className.cell, function (e) {
                var $elem = $(this),
                  //dataset,
                  //vertical,
                  //horizontal,
                  //index,
                  item,
                  items,
                  x,
                  y,
                  $cell,
                  //position,
                  image = {
                      insert_horizontal: "insert-column.png",
                      insert_vertical: "insert-row.png",
                      remove_horizontal: "remove-column.png",
                      remove_vertical: "remove-row.png",
                  },
                  insertIcon,
                  removeIcon,
                  count;

                // dataset = self.workspace.datasetRows;
                // if (!dataset) {
                //   return;
                // }
                // vertical = dataset.vertical;
                // horizontal = dataset.horizontal;
                // position = $.formbuilder.getPosition($elem);
                // index = position.x;
                // item = vertical[index] || horizontal[index];
                // if (item && item.type === "horizontal") {
                //   items = item;
                //   item = item[position.y];
                // }
                // else {
                //   items = vertical;
                // }

                info = self.getDatasetRowInfo($elem) || {};
                items = info.items;
                item = info.item;

                if (item) {
                    count = _.filter(items || [], function (o) { return item.id === o.id; }).length;
                    x = item.x;
                    y = item.y;
                    $cell = self.findCell(x, y);

                    insertIcon = self.workspace.builder.getImage(image["insert_" + item.type]);
                    removeIcon = self.workspace.builder.getImage(image["remove_" + item.type]);
                    info = item;

                    if ($buttons) {
                        $buttons.remove();
                    }

                    buttons = self.renderDatasetButtons({
                        className: {
                            buttons: self.className.buttons,
                            button: self.className.button + " " + self.className.button + "-" + item.type,
                            insertButton: self.className.datasetInsertButton,
                            removeButton: self.className.datasetRemoveButton
                        },
                        insertIcon: insertIcon,
                        removeIcon: count > 1 ? removeIcon : false
                    });
                    $buttons = $(buttons);
                    $cell.append($buttons);
                }
            });

            $elem.on("mouseleave", "tr." + this.className.row, function (e) {
                info = null;
                if ($buttons) {
                    $buttons.remove();
                }
            });

            $elem.on("click", "." + this.className.button, function (e) {
                var type = $(this).hasClass(self.className.datasetInsertButton) ? "insert" : "remove";
                if (info) {
                    if (type === "insert") {
                        self.workspace.insertDatasetRows({ id: info.id, rows: 1, index: info.index });
                    }
                    else {
                        self.workspace.removeDatasetRows({ id: info.id, rows: -1, index: info.index });
                        $buttons.remove();
                    }
                }
            });

            //数据集行点击事件
            $elem.on("dblclick", "td." + this.className.cell, function (e) {
                var event = self.workspace.events.datasetsRowSelect,
                  $elem,
                  info,
                  item,
                  row,
                  position;

                if (!(event && typeof event === "function")) {
                    return;
                }

                $elem = $(this);
                info = self.getDatasetRowInfo($elem) || {};
                item = info.item;

                if (!item) {
                    return;
                }
                position = $.formbuilder.getPosition($elem);
                row = self.workspace.getDatasetRow(item.id, item.type, { x: item.x, y: item.y });
                event.call(self.workspace.builder.elem, item.id, row, item.index, position);
            });

        },
        bindColResize: function () {
            var elem = this.elem,
              _this = this,
              cell,
              nextCell,
              siblingsCells,
              width,
              nextWidth,
              position,
              columns = _this.options.columns,
              columnItem,
              nextColumnItem,
              update = _this.property.column.width.update,
              sum = 0,
              getWidthPairs = function (oldWidthPairs, newWidthPairs) {
                  var sum, percentSum, current, next;

                  current = oldWidthPairs.current;
                  next = oldWidthPairs.next;

                  if (isNaN(current) && isNaN(next)) {
                      percentSum = parseInt(oldWidthPairs.current) + parseInt(oldWidthPairs.next);
                      sum = newWidthPairs.current + newWidthPairs.next;
                      current = Math.floor((percentSum * newWidthPairs.current) / sum);
                      next = percentSum - current;

                      return {
                          current: current + "%",
                          next: next + "%"
                      };
                  } else {
                      return newWidthPairs;
                  }
              };

            elem.find("." + this.className.colResize).draggable({
                axis: "x",
                helper: "clone",
                containment: _this.elem,
                revert: true,
                start: function (e, ui) {
                    cell = $(e.target).closest("td");
                    nextCell = cell.next();
                    position = _this.getPosition(cell);
                    siblingsCells = cell.siblings();

                    columnItem = _this.findObj(columns, -1, position.y);
                    nextColumnItem = _this.findObj(columns, -1, position.y + 1);
                    width = cell.outerWidth();
                    nextWidth = nextCell.outerWidth();
                    sum = width + nextWidth;
                    cell.width(width);
                    nextCell.width(nextWidth);
                    cell.addClass([_this.className.resizing, _this.className.colIndexResizing].join(" "));
                    siblingsCells.addClass(_this.className.colIndexResizing);
                },
                drag: function (e, ui) {
                    var newWidth, newNextWidth, oldWidthPairs, newWidthPairs, widthPairs;

                    newWidth = ui.position.left;
                    if (newWidth <= 1) {
                        newWidth = 1;
                    } else if (newWidth >= sum) {
                        newWidth = sum - 1;
                    }

                    newNextWidth = nextWidth - (newWidth - width);
                    oldWidthPairs = {
                        current: columnItem.width,
                        next: nextColumnItem.width
                    };
                    newWidthPairs = {
                        current: newWidth,
                        next: newNextWidth
                    };

                    widthPairs = getWidthPairs(oldWidthPairs, newWidthPairs);
                    columnItem.width = widthPairs.current;
                    nextColumnItem.width = widthPairs.next;

                    update.call(_this, newNextWidth, null, null, nextCell);
                    update.call(_this, newWidth, null, null, cell);
                    _this.resizeRangeHighlight(cell, position.y, "column");
                    _this.updateCellProperty(position.x, _this.options.table.rows, position.y, position.y + 1, ["oblique-line"]);
                },
                stop: function (e, ui) {
                    //console.log("stop");
                    cell.removeClass([_this.className.resizing, _this.className.colIndexResizing].join(" "));
                    siblingsCells.removeClass(_this.className.colIndexResizing);
                    _this.showGridProperty(cell);
                }
            });
        },
        bindRowResize: function () {
            var elem = this.elem,
              _this = this,
              cell,
              siblingsCells,
              row,
              rowCells,
              update = _this.property.row.height.update,
              position,
              rows = _this.options.rows,
              rowItem;

            elem.find("." + this.className.rowResize).draggable({
                axis: "y",
                helper: "clone",
                containment: _this.elem,
                revert: true,
                start: function (e, ui) {
                    //[TODO]
                    cell = $(e.target).closest("td");
                    position = _this.getPosition(cell);
                    rowItem = _this.findObj(rows, position.x, -1);
                    row = cell.closest("tr");
                    rowCells = _this.getRowSelectedCells(position.x);
                    siblingsCells = row.siblings("." + _this.className.row).find("." + _this.className.indexCell);

                    cell.addClass([_this.className.resizing, _this.className.rowIndexResizing].join(" "));
                    siblingsCells.addClass(_this.className.rowIndexResizing);
                },
                drag: function (e, ui) {
                    var newHeight = ui.position.top;

                    if (newHeight <= 1) {
                        newHeight = 1;
                    }
                    rowItem.height = newHeight;

                    update.call(_this, newHeight, null, null, rowCells);
                    _this.resizeRangeHighlight(cell, position.x, "row");
                    _this.updateCellProperty(position.x, position.x, 1, _this.options.table.columns, ["oblique-line"]);
                },
                stop: function (e, ui) {
                    cell.removeClass([_this.className.resizing, _this.className.rowIndexResizing].join(" "));
                    siblingsCells.removeClass(_this.className.rowIndexResizing);
                    _this.showGridProperty(cell);
                }
            });
        },
        getRowSelectedCells: function (x) {
            return {
                $index: this.workspace.findRowIndex(x),
                cells: this.workspace.findRowCells(x),
                $row: this.workspace.findRow(x)
            };
        },
        updateMoveRows: function (x1, offsetX) {
            var self = this,
              tableRows = this.options.table.rows;

            if (x1 <= tableRows) {
                _.each(_.range(x1, tableRows + 1), function (x) {
                    var $row,
                      $index,
                      $cells,
                      $controls,
                      x3 = x + offsetX,
                      y3;

                    //更新DOM序号
                    $index = self.workspace.findRowIndex(x);
                    if ($index) {
                        $.formbuilder.setPosition(x3, -1, $index);
                        $index.find("." + self.className.indexText).text(x3);
                    }
                    //更新行号
                    $row = self.workspace.findRow(x);
                    $row.attr("data-rowIndex", x3);
                    //更新DOM单元格信息
                    $cells = self.workspace.findRowCells(x, false);
                    _.each($cells, function ($cell, y) {
                        y3 = y + 1;
                        if ($cell) {
                            $.formbuilder.setPosition(x3, y3, $cell);
                        }
                    });
                    //更新控件DOM信息
                    $controls = self.workspace.findRowControls(x, false);
                    _.each($controls, function ($control, y) {
                        y3 = y + 1;
                        if ($control) {
                            $.formbuilder.setPosition(x3, y3, $control);
                        }
                    });
                });
            }
        },
        updateMergeBeforeRemove: function (index, count, type) {
            var _this = this,
              x1,
              y1,
              spanA,
              items = {},
              name,
              range = _.range(index, index + count),
              findCells;

            findCells = type === "rowspan" ?
              _this.workspace.findRowCellsObj :
              _this.workspace.findColumnCellsObj;

            _.each(range, function (i) {
                var cells = findCells.call(_this.workspace, i),
                  last = {};
                _.each(cells, function (cell) {
                    spanA = cell[type];
                    if (spanA > 1 || (cell.x1 && cell.y1)) {
                        if (spanA > 1) {
                            x1 = cell.x;
                            y1 = cell.y;
                        }
                        else {
                            x1 = cell.x1;
                            y1 = cell.y1;
                        }

                        cell = _this.findCellObj(x1, y1);
                        name = [x1, y1].join("-");
                        items[name] = items[name] || {
                            x: x1,
                            y: y1,
                            colspan: cell.colspan,
                            rowspan: cell.rowspan,
                            top: false
                        };
                        if (spanA > 1) {
                            items[name].top = true;
                        }
                        //删除行中，指向同一个合并行单元格的减少数只计算一次
                        if (x1 !== last.x || y1 !== last.y) {
                            --items[name][type];
                        }

                        last = { x: x1, y: y1 };
                    }

                });

            });

            _.each(items, function (item) {
                var $cell = _this.findCell(item.x, item.y);
                _this.updateProperties($cell, type, 1);
            });

            return items;
        },
        updateMergeAfterRemove: function (cells, type) {
            var _this = this;

            _.each(cells, function (cell) {
                var x = cell.x,
                  y = cell.y,
                  $cell,
                  span = cell[type];

                if (span > 1) {
                    $cell = _this.findCell(x, y);
                    _this.updateProperties($cell, type, span);
                }
            });
        },
        updatePropertyByType: function (x1, x2, y1, y2, names, options, type) {
            var pattern = this.pattern,
              $elems = this.getCellsByRange(x1, x2, y1, y2),
              _this = this;

            if (type === "control") {
                $elems = _($elems)
                  .chain()
                  .map(function ($elem) {
                      var _$elem = $elem.find("." + _this.workspace.className.controlContainer);
                      if (_$elem.length > 0) {
                          return _$elem;
                      }
                  })
                  .compact()
                  .value();
            }
            if (options) {
                $.formbuilder.updatePropertiesByOptions(pattern, this, names, options, $elems);
            }
            else {
                $.formbuilder.refreshPropertiesBySelecteds(pattern, this, names, $elems);
            }
        },
        updateCellProperty: function (x1, x2, y1, y2, names, cell) {
            this.updatePropertyByType(x1, x2, y1, y2, names, cell, "cell");
        },
        updateControlProperty: function (x1, x2, y1, y2, names, control) {
            this.updatePropertyByType(x1, x2, y1, y2, names, control, "control");
        },
        updateBorderStyle: function (x1, x2, y1, y2, cell) {
            this.updateCellProperty(x1, x2, y1, y2, ["border-style"], cell);
        },
        insertRows: function (x, count, rowTemplate) {
            var self = this,
              $row,
              row = $.extend({}, this.propertyField.row, rowTemplate),
              $rows = [],
              tableRows = this.options.table.rows,
              x1,
              x2,
              x3,
              options = this.options;

            if (count < 1) {
                return;
            }
            this.hideRangeHighlight();
            x1 = x;
            x2 = x1 + count;
            _.each(_.range(x1, x2), function (x) {
                var $cells = $(self.currentRender.body.row.call(self, x, row, options.table.columns));
                $rows.push($cells);
            });
            x3 = x1 < tableRows ? x1 : tableRows;
            $row = this.workspace.findRow(x3);
            if (!$row) {
                return;
            }
            //尾部插入
            if (x1 > tableRows) {
                $row.after($rows);
            } else {
                //中间插入
                $row.before($rows);
            }

            this.updateInsertRows(x1, $rows);
            this.updateInsertRowsMerge(x1, count);
            this.updateBorderStyle(x1 - 1, this.options.table.rows, 1, this.options.table.columns);
            this.updateDrakeContainers();
        },
        updateInsertRows: function (x1, $rows) {
            var offsetX = $rows.length;
            //更新DOM
            this.updateMoveRows(x1, offsetX);
            //更新缓存
            this.workspace.insertRows($rows, x1, null, null);
        },
        updateInsertRowsMerge: function (x, count) {
            var self = this,
              rowCells = this.workspace.findRowCellsObj(x + count),
              mergeCells = [];

            _.each(rowCells, function (item) {
                var x1 = item.x1,
                  y1 = item.y1;

                //行合并,起始跨行单元格在插入行之前
                if (x1 && y1 && x1 < x) {
                    mergeCells.push({ x1: x1, y1: y1 });
                }
            });

            _(mergeCells)
              .uniqWith(_.isEqual)
              .each(function (item) {
                  var rowspan = 1,
                    x1 = item.x1,
                    y1 = item.y1,
                    cell,
                    $cell,
                    control;

                  $cell = self.findCell(x1, y1);
                  control = self.findControlObj(x1, y1);
                  if (x1 !== item.x) {
                      cell = self.findCellObj(x1, y1);
                      rowspan = cell.rowspan + count;
                  }
                  self.updateProperties($cell, "rowspan", rowspan);
                  if (control && control.type) {
                      //重新计算元件容器高度
                      self.updateProperties(control.container, "height-container");
                  }

              });

        },
        removeRows: function (x, count) {
            var _this = this,
              $row,
              x1,
              x2,
              mergeCells;

            count = count || 1;
            this.hideRangeHighlight();
            x1 = x;
            x2 = x1 + count;

            mergeCells = _this.updateMergeBeforeRemoveRows(x1, count);
            _.each(_.rangeRight(x1, x2), function (x) {
                $row = _this.workspace.findRow(x);
                $row.remove();
            });

            this.updateRemoveRows(x1, count);
            this.updateMergeAfterRemoveRows(mergeCells);
            this.updateBorderStyle(x1 - 1, this.options.table.rows, 1, this.options.table.columns);
        },
        updateRemoveRows: function (x1, count) {
            var offsetX = -count;
            //更新DOM
            x1 = x1 + Math.abs(count);
            this.updateMoveRows(x1, offsetX);
            //更新缓存
            this.workspace.removeRows(count, x1, null, null);
        },
        updateMergeBeforeRemoveRows: function (x, count) {
            return this.updateMergeBeforeRemove(x, count, "rowspan");
        },
        updateMergeAfterRemoveRows: function (cells) {
            this.updateMergeAfterRemove(cells, "rowspan");
        },
        insertColumns: function (y, count) {
            var self = this,
              tableRows = this.options.table.rows,
              tableColumns = this.options.table.columns,
              y1,
              y2,
              y3,
              y4,
              cell,
              cells,
              $column,
              $columns = [],
              $cell,
              $index,
              $row,
              $cells = [],
              column = $.extend({}, this.propertyField.column);

            this.hideRangeHighlight();

            count = count || 1;
            y1 = y;
            y2 = y1 + count;
            _.each(_.range(y1, y2), function (y) {
                var $newColumn = [];
                //列序号
                $index = $(self.currentRender.head.column.call(self, -1, y, tableColumns, column));
                $cells[0] = $cells[0] || [];
                $cells[0].push($index);
                $newColumn.push($index);
                //单元格
                _.each(_.range(1, tableRows + 1), function (x1) {
                    $column = $(self.currentRender.body.column.call(self, x1, y, self.options.rows[x1 - 1]));
                    $cells[x1] = $cells[x1] || [];
                    $cells[x1].push($column);
                    $newColumn.push($column);
                });
                $columns.push($newColumn);
            });
            //插入DOM
            _.each(_.range(0, tableRows + 1), function (x) {
                y3 = y1 < tableColumns ? y1 : tableColumns;
                //索引
                if (x === 0) {
                    $index = self.workspace.findColumnIndex(y3);
                    y1 <= tableColumns ? $index.before($cells[0]) : $index.after($cells[0]);
                    return;
                }
                //内容
                $cell = self.workspace.findCell(x, y3);
                //普通的单元格
                if ($cell) {
                    y1 <= tableColumns ? $cell.before($cells[x]) : $cell.after($cells[x]);
                    return;
                }
                //存在合并单元格的情况
                cell = self.workspace.findCellObj(x, y3);
                y4 = y3 - 1;
                //合并单元格在非首列的情况
                if (y4 > 1) {
                    $cell = self.workspace.findCell(x, y4);
                    if ($cell) {
                        $cell.after($cells[x]);
                        return;
                    }
                }
                //合并单元格在首列的情况
                cells = self.workspace.findRowCellsObj(x);
                cell = _.find(cells, function (cell) {
                    return !cell.x1 && !cell.y1;
                });
                //全列合并的情况
                if (!cell) {
                    $row = self.workspace.findRow(x);
                    $row.append($cells[x]);
                }
                else {
                    $cell = self.workspace.findCell(cell.x, cell.y);
                    $cell.after($cells[x]);
                }

            });

            this.updateInsertColumns(y1, tableColumns, $columns);
            this.updateInsertColumnsMerge(y1, count);
            this.updateBorderStyle(1, this.options.table.rows, y1 - 1, this.options.table.columns);
            this.updateDrakeContainers();
        },
        updateMoveColumns: function (y1, y2, offsetY) {
            var self = this,
              rows = this.options.table.rows;

            //更新DOM
            _.each(_.range(1, rows + 1), function (x3) {
                _.each(_.range(y1, y2 + 1), function (y3) {
                    var $index,
                      $cell,
                      $control,
                      y4 = y3 + offsetY;

                    //更新DOM序号
                    $index = self.workspace.findColumnIndex(y3);
                    if ($index) {
                        $.formbuilder.setPosition(-1, y4, $index);
                        $index.find("." + self.className.indexText).text(y4);
                    }
                    //更新单元格DOM信息
                    $cell = self.workspace.findCell(x3, y3);
                    if ($cell) {
                        $.formbuilder.setPosition(x3, y4, $cell);
                    }
                    //更新控件DOM信息
                    $control = self.workspace.findControl(x3, y3);
                    if ($control) {
                        $.formbuilder.setPosition(x3, y4, $control);
                    }
                });
            });
        },
        updateInsertColumns: function (y1, y2, $news) {
            var offsetY = $news.length;
            //更新DOM
            this.updateMoveColumns(y1, y2, offsetY);
            //更新缓存
            this.workspace.insertColumns($news, y1, null, null);
        },
        updateInsertColumnsMerge: function (y, count) {
            var self = this,
              columnCells = this.workspace.findColumnCellsObj(y + count),
              mergeCells = [];

            _.each(columnCells, function (item) {
                if (!item) {
                    return;
                }
                var x1 = item.x1,
                  y1 = item.y1;
                //列合并,起始跨列单元格在插入列之前
                if (x1 && y1 && y1 < y) {
                    mergeCells.push({ x1: x1, y1: y1 });
                }
            });

            _(mergeCells)
              .uniqWith(_.isEqual)
              .each(function (item) {
                  var colspan = 1,
                    x1 = item.x1,
                    y1 = item.y1,
                    cell,
                    $cell;

                  $cell = self.findCell(x1, y1);
                  if (y1 !== item.y) {
                      cell = self.findCellObj(x1, y1);
                      colspan = cell.colspan + count;
                      self.updateProperties($cell, "colspan", colspan);
                  }
              });
        },
        removeColumns: function (y, count) {
            var self = this,
              tableRows = this.options.table.rows,
              tableColumns = this.options.table.columns,
              y1,
              y2,
              $cell,
              $index,
              mergeCells;

            this.hideRangeHighlight();

            count = count || 1;
            y1 = y;
            y2 = y1 + count;

            mergeCells = self.updateMergeBeforeRemoveColumns(y1, count);
            _.each(_.range(y1, y2), function (y) {
                //单元格
                _.each(_.range(1, tableRows + 1), function (x1) {
                    $cell = self.findCell(x1, y);
                    if ($cell) {
                        $cell.remove();
                    }

                });

                $index = self.workspace.findColumnIndex(y);
                $index.remove();
            });

            y1 = y1 + Math.abs(count);
            this.updateRemoveColumns(y1, tableColumns, count);
            this.updateMergeAfterRemoveColumns(mergeCells);
            this.updateBorderStyle(1, this.options.table.rows, this.options.table.columns, this.options.table.columns);
        },
        updateRemoveColumns: function (y1, y2, count) {
            var offsetY = -count;

            //更新DOM
            this.updateMoveColumns(y1, y2, offsetY);
            //更新缓存
            this.workspace.removeColumns(count, y1, null, null);
        },
        updateMergeBeforeRemoveColumns: function (y, count) {
            return this.updateMergeBeforeRemove(y, count, "colspan");
        },
        updateMergeAfterRemoveColumns: function (cells) {
            this.updateMergeAfterRemove(cells, "colspan");
        },
        isControlInDrag: function () {
            return $("body>div." + this.workspace.className.dragging).length > 0;
        },
        showGridProperty: function ($target, $cell) {
            if (!$cell) {
                $cell = $target;
            }
            this.workspace.builder.updateProperty($target);
            this.workspace.builder.menu.updateItems($cell);
        },
        updateDrakeContainers: function () {
            var builder = this.workspace.builder;
            //[TODO:性能优化]
            //if (this.enableEdit && builder.drake) {
            if (this.pattern === $.formbuilder.PATTERN.DESIGN && builder.drake) {
                builder.drake.containers = builder.getDrakeContainers();
            }
        },
        renderControl: function (options, position) {
            options.x = position.x;
            options.y = position.y;
            this.workspace.addNewItem(options, position);
        },
        findCell: function (x, y) {
            return this.workspace.findCell(x, y);
        },
        filterCells: function (x, y, tag, $doc) {
            var query = (tag || "") + "[data-position='[" + x + "," + y + "]']";
            return ($doc || this.elem).filter(query);
        },
        findObj: function (collect, x, y) {
            return $.formbuilder.findObj(collect, x, y);
        },
        findControlObj: function (x, y) {
            return this.workspace.findControlObj(x, y);
        },
        findControlData: function (x, y) {
            var obj;

            obj = this.workspace.findControlObj(x, y);
            obj = obj.elem ? obj.options : obj;
            obj = obj.type ? obj : null;
            return obj;
        },
        findCellObj: function (x, y) {
            return this.workspace.findCellObj(x, y);
        },
        getPosition: function ($elem) {
            return $elem.length ? $.formbuilder.getPosition($elem) : { x: null, y: null };
        },
        pullObj: function (collect, x, y) {
            $.formbuilder.updateSignObj(collect, x, y, undefined);
        },
        // renderBorder: function ($elem, zIndex, type, value) {
        //   var fun = this["renderBorder" + _.upperFirst(type)];
        //   fun.call(self, $elem, zIndex, ["top", "bottom", "left", "right"], value);
        // },
        isPropertyChange: function (current, next, property) {
            var zIndex1, zIndex2;

            zIndex1 = ((current || {})[property] || {}).zIndex || 0;
            zIndex2 = ((next || {})[property] || {}).zIndex || 0;

            return zIndex1 >= zIndex2;
        },
        getRealCell: function (x, y) {
            var cell, x1, y1;

            cell = this.findCellObj(x, y) || {};
            x1 = cell.x1;
            y1 = cell.y1;
            if (x1 && y1) {
                cell = this.findCellObj(x1, y1);
            }

            return cell;
        },
        getBorderState: function (data, x, y, name) {
            var isLeftChange = this.isPropertyChange(data, this.getRealCell(x, y - 1), name),
              isRightChange = this.isPropertyChange(data, this.getRealCell(x, y + 1), name),
              isTopChange = this.isPropertyChange(data, this.getRealCell(x - 1, y), name),
              isBottomChange = this.isPropertyChange(data, this.getRealCell(x + 1, y), name);

            return {
                left: isLeftChange,
                right: isRightChange,
                top: isTopChange,
                bottom: isBottomChange
            };
        },
        renderChangeBorder: function ($elem, x, y, name, value, isChange) {
            if (isChange) {
                $elem = $elem || this.findCell(x, y);
                if ($elem) {
                    $elem.css(name, value);
                }
            }
        },
        setBorderStyle: function (css, positions, style, zIndex) {
            _.each(positions, function (position) {
                css["border-" + position + "-style"] = style;
            });
        },
        setBorderWidth: function (css, positions, width, zIndex) {
            _.each(positions, function (position) {
                css["border-" + position + "-width"] = width;
            });
        },
        setBorderColor: function (css, positions, color, zIndex) {
            _.each(positions, function (position) {
                css["border-" + position + "-color"] = color;
            });
        },
        renderBorder: function (elem_p, css, position, state) {
            var _css = {},
              $elem;

            if (!elem_p) {
                return;
            }

            if (state === true || state.color) {
                this.setBorderColor(_css, [position], css.color);
            }
            if (state === true || state.width) {
                this.setBorderWidth(_css, [position], css.width);
            }
            if (state === true || state.style) {
                this.setBorderStyle(_css, [position], css.style);
            }

            $elem = elem_p.x !== undefined ?
              this.findCell(elem_p.x, elem_p.y) : elem_p;

            if ($elem) {
                $elem.css(_css);
            }

        },
        renderLeftBorder: function ($elem, css, state) {
            this.renderBorder($elem, css, "left", state);
        },
        renderRightBorder: function ($elem, css, state) {
            this.renderBorder($elem, css, "right", state);
        },
        renderTopBorder: function ($elem, css, state) {
            this.renderBorder($elem, css, "top", state);
        },
        renderBottomBorder: function ($elem, css, state) {
            this.renderBorder($elem, css, "bottom", state);
        },
        getCellBorderState: function (style, color, width, position) {
            return {
                color: color[position],
                style: style[position],
                width: width[position]
            };
        },
        adjustBorderWidth: function ($elem, width, position, data) {
            var style = {},
              x = position.x,
              y = position.y,
              x2 = this.options.table.rows,
              y2 = this.options.table.columns,
              //position = data["border-position"] || "all",
              items = [];

            if (y % 2 === 1) {
                if (y !== 1) {
                    items.push("left");
                }
                if (y !== y2) {
                    items.push("right");
                }
            }
            if (x % 2 === 1) {
                if (x !== 1) {
                    items.push("top");
                }
                if (x !== x2) {
                    items.push("bottom");
                }

            }
            _.each(items, function (item) {
                style["border-" + item + "-width"] = width;
            });

            $elem.css(style);
        },
        adjustBorder: function ($elem, position, data) {
            var _color = data["border-color"] || {},
              _style = data["border-style"] || {},
              borderStyleItems = $.formbuilder[this.pattern.toUpperCase() + "BORDERSTYLEITEMS"] || $.formbuilder.BORDERSTYLEITEMS,
              borderWidthItems = $.formbuilder[this.pattern.toUpperCase() + "BORDERWIDTHITEMS"] || $.formbuilder.BORDERWIDTHITEMS,
              style = _style.value || this.options.table["border-style"],
              color = _color.value || this.options.table["border-color"],
              width = borderWidthItems[style],
              x = position.x,
              y = position.y,
              x2 = this.options.table.rows,
              y2 = this.options.table.columns,
              styleState,
              colorState,
              PASSSTATE = {
                  top: true,
                  left: true,
                  right: true,
                  bottom: true
              },
              css = {},
              _this = this,
              getState = function (position) {
                  return _this.getCellBorderState(styleState, colorState, styleState, position);
              };

            if (!color && !style) {
                return;
            }
            style = borderStyleItems[style];

            styleState = _style.timestamp === "border-table-style" ?
                PASSSTATE : this.getBorderState(data, x, y, "border-style");

            colorState = _color.timestamp === "border-table-color" ?
                PASSSTATE : this.getBorderState(data, x, y, "border-color");
            //[TODO]
            css = {
                style: style,
                color: color,
                width: width
            };
            //左、右边框
            if (y === 1 && $elem) {
                this.renderLeftBorder($elem, css, true);
            }
            else if (y === y2 && $elem) {
                this.renderRightBorder($elem, css, true);
            }

            if (y % 2 === 1) {
                //当前单元格的左边框
                this.renderRightBorder({ x: x, y: y - 1 }, css, getState("left"));
                //当前单元格的右边框
                this.renderLeftBorder({ x: x, y: y + 1 }, css, getState("right"));
            }
            else {
                this.renderLeftBorder($elem, css, getState("left"));
                this.renderRightBorder($elem, css, getState("right"));
            }

            //当前单元格的上、下边框
            if (x === 1 && $elem) {
                this.renderTopBorder($elem, css, true);
            }
            else if (x === x2 && $elem) {
                this.renderBottomBorder($elem, css, true);
            }

            if (x % 2 === 1) {
                //当前单元格的上边框
                this.renderBottomBorder({ x: x - 1, y: y }, css, getState("top"));
                //当前单元格的下边框
                this.renderTopBorder({ x: x + 1, y: y }, css, getState("bottom"));
            }
            else {
                this.renderTopBorder($elem, css, getState("top"));
                this.renderBottomBorder($elem, css, getState("bottom"));
            }

            if (_style.timestamp === "border-table-style") {
                delete data["border-style"];
            }
            if (_color.timestamp === "border-table-color") {
                delete data["border-color"];
            }
        },
        adjustSpanBorderWidth: function ($elem, position, data) {
            var x = position.x,
              y = position.y,
              x2 = this.options.table.rows,
              y2 = this.options.table.columns,
              colspan = data.colspan,
              rowspan = data.rowspan,
              borderStyleItems = $.formbuilder[this.pattern.toUpperCase() + "BORDERSTYLEITEMS"] || $.formbuilder.BORDERSTYLEITEMS,
              borderWidthItems = $.formbuilder[this.pattern.toUpperCase() + "BORDERWIDTHITEMS"] || $.formbuilder.BORDERWIDTHITEMS,
              borderStyle = data["border-style"] ? data["border-style"].value : this.options.table["border-style"],
              width = borderWidthItems[borderStyle],
              style = borderStyleItems[borderStyle],
              color = (data["border-color"] || {}).value || this.options.table["border-color"],
              _this = this;

            if (!(rowspan > 1 || colspan > 1)) {
                return;
            }

            //设置跨行、列范围内单元格的边框样式
            _.each(_.range(x, x + rowspan), function (x1) {
                _.each(_.range(y, y + colspan), function (y1) {
                    var $elem;
                    if (x === x1 && y === y1) {
                        return;
                    }
                    $elem = _this.findCell(x1, y1);
                    _this.adjustBorder($elem, { x: x1, y: y1 }, data);
                });
            });

            if (rowspan > 1) {
                // 1.列为奇数、行为奇数、跨行为奇数
                if ((y % 2 === 1 && rowspan % 2 === 1 && x % 2 === 1) ||
                  (x % 2 === 0 && rowspan % 2 === 0 && (x + rowspan - 1) < x2)) {
                    $elem.css("border-bottom-width", 0);
                }
                    // 1.行是奇数、跨行是偶数
                    // 2.列是奇数、跨行是奇数
                else if ((x % 2 === 1 && rowspan % 2 === 0) ||
                  (y % 2 === 1 && rowspan % 2 === 1)) {
                    $elem.css("border-bottom-width", width);
                    $elem.css("border-bottom-style", style);
                    $elem.css("border-bottom-color", color);
                }
            }

            if (colspan > 1) {
                if (y % 2 === 0 && colspan % 2 === 0 && (y + colspan - 1) < y2) {
                    $elem.css("border-right-width", 0);
                }
                    //1. 列为奇数且跨列为偶数
                    //2. 列为奇数且跨列到最后一列
                else if ((y % 2 === 1 && colspan % 2 === 0) ||
                  (y % 2 === 1 && (y + colspan - 1) === y2)) {
                    $elem.css("border-right-width", width);
                    $elem.css("border-right-style", style);
                    $elem.css("border-right-color", color);
                }
            }
        },
        updateProperties: function ($elem, properties, values, timestamp) {
            $.formbuilder.updatePropertiesBySelected(this.pattern, this, $elem, properties, values, timestamp);
        },
        getWidth: function () {
            return this.elem.find("." + this.className.tbodyContent).width();
        },
        destroy: function () {
            this.options = null;
            this.container = null;
            this.elem.off();
            // sizzle会缓存筛选元素，造成不能立刻释放元素，导致内存泄漏，不能立即释放
            // this.elem元素中绑定了大量的事件，因此使用empty()清除子元素，释放大部分table元素占用内存
            this.elem.empty();
            this.elem.remove();
            this.elem = null;
        }
    };
})(jQuery, _);

/* global jQuery */
(function ($) {
    "use strict";
    $.formbuilder.toolbox.add("image", {
        title: "image",
        icon: "image.png",
        design: function () {

            return $([
                "<div class='", this.className.container, "'>",
                "<img class='", this.className["default-img"], "' />",
                "</div>"
            ].join(""));
        },
        applying: function () {
            return this.design();
        },
        view: function () {
            return this.design();
        },
        getValue: function () {
            return this.options.value;
        },
        setValue: function (value) {
            this.options.value = value;
        },
        className: {
            container: "formbuilder-control-image",
            img: "formbuilder-control-image-img",
            "default-img": "formbuilder-control-image-img-default"
        },
        options: {
            label: "",
            value: "image.png",
            width: 16,
            height: 16
        },
        property: {
            value: {
                "text": "image-upload",
                type: "fileupload",
                source: {
                    text: "image-upload",
                    image: "imageupload.png",
                    //url: "property-image-upload-url",
                    url: ""
                },
                update: function (value) {
                    if (!value) {
                        return;
                    }

                    this.elem.find(">img").attr("src", value);
                },
                conver: function (value) {
                    var baseb4Image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJRJREFUeNpi/P//PwMlgImBQsACItLT08lyxsyZMxlZkPiMJOr/T6oXWoH4KxB3khsGRUDMBcR55BrQA3VBP0YgEglqoZhgNIYAcT256UAEiKcCcQOSIfZAPB/qf+zpAAlMB2IxKLsBSjtAsQkQRwDxVXwuCEHjN0A1g4AOEJ8C4gR8LmAkKykjpyxSAeOA50aAAAMATvIa90OAUacAAAAASUVORK5CYII=";
                    if (value && value.indexOf("base64") === -1) {
                        value = this.builder.getImage(this.options.value);
                    }
                    else {
                        value = baseb4Image;
                    }

                    return value;
                }
            },
            "font-family": {
                hidden: true
            },
            "font-size": {
                hidden: true,
                update: function (value) {
                    this.elem.css("font-size", "0px");
                }
            },
            "font-weight": {
                hidden: true
            },
            "font-style-italic": {
                hidden: true
            },
            "text-decoration-underline": {
                hidden: true
            },
            "color": {
                hidden: true
            },
            //TODO
            //19500 李金岳
            "width": {
                hidden: false,
                after: ["height"],
                //afterChecking: function (value) {
                //    return !value;
                //},
                update: function (value, position, data) {
                    return;
                }
            },
            //TODO
            //19500 李金岳
            "height": {
                hidden: false,
                //after: ["vertical-align","align"],
                update: function (value, position, data) {
                    var self = this,
                        $img = self.elem.find(">img"),
                        width = self.options.width,
                        height = value;

                    var computeImgValue = function (self, $img, width, height) {
                        var tableCell = $(self.container).parents(".formbuilder-table-cell"),
                            cellWidth = tableCell.width(),
                            cellHeight = tableCell.height(),
                            naturalHeight = $img[0].naturalHeight,
                            naturalWidth = $img[0].naturalWidth;

                        //判断width和height是否为百分比值
                        if (typeof (width) == "string" && width.indexOf("%") > -1) {
                            width = Math.floor(width.split("%")[0]/100 * cellWidth);
                        }
                        if (typeof (height) == "string" && height.indexOf("%") > -1) {
                            height = Math.floor(height.split("%")[0]/100 * cellHeight);
                        }
                        //判断并计算width和height值的情况
                        if (!width && !height) {
                            height = naturalHeight;
                            width = height * naturalWidth / naturalHeight;
                        } else if (width && !height) {
                            height = width * naturalHeight / naturalWidth;
                        } else {
                            width = width ? width : height * naturalWidth / naturalHeight;
                        }

                        return compareValue(width, height, cellWidth, cellHeight, naturalHeight, naturalWidth);
                    }
                    
                    var compareValue = function (width,height,cellWidth,cellHeight,naturalHeight,naturalWidth) {
                        var imageValue = {};
                        var isWidthLonger = cellWidth > cellHeight ? true : false;
                        if (height > cellHeight || width > cellWidth) {
                            if (isWidthLonger) {
                                height = cellHeight;
                                width = height * naturalWidth / naturalHeight;
                                if (width > cellWidth) {
                                    width = cellWidth;
                                    height = width * naturalHeight / naturalWidth;
                                }
                            } else {
                                width = cellWidth;
                                height = width * naturalHeight / naturalWidth;
                                if (height > cellHeight) {
                                    height = cellHeight;
                                    width = height * naturalWidth / naturalHeight;
                                }
                            }
                        }
                        imageValue.height = Math.floor(height);
                        imageValue.width = Math.floor(width);
                        return imageValue;
                    }

                    var setImgValue = function (self, $img, imageValue, data) {
                        var Align = data["align"],
                            verticalAlign = data["vertical-align"];
                        self.container.css("padding", "0");
                        self.container.width(imageValue.width);
                        self.elem.width(imageValue.width);
                        $img.width(imageValue.width);
                        self.container.height(imageValue.height);
                        self.elem.height(imageValue.height);
                        $img.height(imageValue.height);

                        self.property["align"].update.call(self, Align, data);
                        self.property["vertical-align"].update.call(self, verticalAlign, data);
                    }

                    var setImage = function (obj, $img, width, height, fun, callback, data) {
                        var imageValue = fun(obj, $img, width, height);
                        callback(obj,$img,imageValue, data);
                    }

                    if ($img[0].naturalWidth) {
                        setImage(self,$img,width,height, computeImgValue, setImgValue, data);
                        return;
                    } 

                    $img.one("load",function () {
                        setImage(self, $img,width,height,computeImgValue, setImgValue, data);
                    }) 
            }
        },
        "text-align": {
                hidden: true
        }
    }
});

})(jQuery);
/* global jQuery _  console*/
(function ($) {
    "use strict";
    $.formbuilder.toolbox.add("file", {
        title: "fileupload",
        icon: "file-upload.png",
        source: {
            "icon": "file.png",
            "uploadUrl": "",
            "deleteUrl": "",
            "deleteParams": {},
            "onUpload": function () { },
            "onDelete": function () { }
        },
        design: function () {
            return $([
                "<div class='", this.className.container, "'>",
                this["_html-img"](),
                "</div>"
            ].join(""));
        },
        applying: function () {
            var text = this.getLocalText(),
                $elem;

            $elem = $([
                "<div class='", this.className.container, "'>",
                "   <a class='", this.className["file-button-upload"], "' ", "title=\"", text, "\">",
                "       ", this["_html-img"](),
                "       ", "<input type=\"file\" >",
                "       ", "<span>", text, "</span>",
                "   </a>",
                "   ", this["_html-list"](this.options.value),
                "</div>"
            ].join(""));

            this["_bind-applying-event"]($elem);

            return $elem;
        },
        view: function () {
            return $([
                "<div class='", this.className.container, " ", this.className.view, "'>",
                this["_html-list"](this.options.value, true),
                "</div>"
            ].join(""));
        },
        "_html-img": function () {
            var src = this.builder.getImage("file-upload.png");
            return ["<img class='", this.className["img"], "' ", "src='", src, "'", " />"].join("");
        },
        "_html-list": function (items, isView) {
            var html;

            html = [
                "<div class='", this.className.list, "'>",
                this["_html-list-items"](items, isView),
                "</div>"
            ].join("");

            return html;
        },
        "_html-list-items": function (items, isView) {
            var html = [],
                self = this;

            if (items && items.length > 0) {
                _.forEach(items, function (item) {
                    html.push([
                        "<div class='", self.className["list-item"], "'>",
                        "   <span>", "<img src='", self.getImage(item.icon || self.source.icon), "' />", "</span>",
                        "   <span class='", self.className["list-item-name"], "'", ">",
                        "       <a title='", item.name, "'", "href='", item.src, "' ", "target=\"_blank\"", ">", item.name, "</a>",
                        "   </span>",
                        "   <span>", item.size, "</span>",
                        (isView ? "" : ["   <span class='", self.className["list-item-button-delete"], "'>", self.getLocalText("delete"), "</span>"].join("")),
                        "</div>"
                    ].join(""));
                });
            }

            return html.join("");
        },
        getImage: function (img) {
            if (!img || img.indexOf("/") === -1) {
                return this.builder.getImage(img);
            }
            return img;
        },
        "_bind-applying-event": function ($elem) {
            var self = this;
            //上传按钮
            $elem.find("input[type=\"file\"]").fileupload({
                url: this.source.uploadUrl || this.builder.options.url.fileupload,
                done: function (e, data) {
                    var result = data.result || [],
                        items = self.options.value || [],
                        html;

                    if (_.isArray(result)) {
                        html = self["_html-list-items"](result, true);
                        $elem.find("." + self.className.list).append(html);
                    }

                    items = _.flatten(items.push(result));
                    self.options.value = items;

                    if (typeof self.source.onUpload === "function") {
                        try {
                            self.source.onUpload.call(self, result);
                        }
                        catch (e) {
                            // eslint-disable-next-line no-console
                            console.error("formbuilder file onUpload function error!");
                        }
                    }

                },
                error: function (e, data) {

                },
                complete: function (e, data) {

                }
            });
            //删除按钮
            $elem.on("click", "." + self.className["list-item-button-delete"], function () {
                var $elem = $(this),
                    $item = $elem.closest("." + self.className["list-item"]),
                    index = $item.index("." + self.className["list-item"]),
                    items = self.options.value,
                    item = items[index],
                    params = $.extend(true, {}, self.source.deleteParams || {}, { id: item.id });

                $.post(self.source.deleteUrl, params, function (data) {
                    // eslint-disable-next-line no-console
                    console.warn("formbuilder file delete success");
                    $item.remove();
                    _.remove(items, function (o, i) {
                        return !i === index;
                    });

                    if (typeof self.source.onDelete === "function") {
                        try {
                            self.source.onDelete.call(self, item);
                        }
                        catch (e) {
                            // eslint-disable-next-line no-console
                            console.error("formbuilder file onDelete function error!");
                        }
                    }
                }).success(function (data) {
                    // eslint-disable-next-line no-console
                    console.log("second success");
                }).error(function (data) {
                    // eslint-disable-next-line no-console
                    console.log("error");
                }).complete(function (data) {
                    // eslint-disable-next-line no-console
                    console.log("complete");
                });
            });
        },
        getValue: function () {
            return this.options.value;
        },
        setValue: function (value) {
            this.options.value = value;
        },
        className: {
            "container": "formbuilder-control-file",
            "view": "formbuilder-control-file-view",
            "file-button-upload": "formbuilder-control-file-button-upload",
            "img": "formbuilder-control-file-img",
            "list": "formbuilder-control-file-list",
            "list-item": "formbuilder-control-file-list-item",
            "list-item-name": "formbuilder-control-file-list-item-name",
            "list-item-button-delete": "formbuilder-control-file-list-item-delete"
        },
        options: {
            label: "",
            value: []
            //width: 40
        },
        property: {
            value: {
                hidden: true
            },
            "font-family": {
                hidden: true
            },
            "font-size": {
                hidden: true,
                update: function (value) {
                    this.elem.css("font-size", "0px");
                }
            },
            "font-weight": {
                hidden: true,
                update: function (value) { }
            },
            "font-style-italic": {
                hidden: true,
                update: function (value) { }
            },
            "text-decoration-underline": {
                hidden: true,
                update: function (value) { }
            },
            "color": {
                hidden: true,
                update: function (value) { }
            },
            "height": {
                hidden: true
            },
            "width": {
                hidden: true
            },
            "text-align": {
                hidden: true
            },
            "align": {
                hidden: true
            },
            "vertical-align": {
                hidden: true
            }
        }
    });

})(jQuery, _);
/* global jQuery _  console*/
(function ($) {
    "use strict";
    $.formbuilder.toolbox.add("link", {
        title: "link",
        icon: "link.png",
        design: function () {
            return $([
                "<div class='", this.className.container, "'>",
                this.renderImg(),
                "</div>"
            ].join(""));
        },
        applying: function () {
            return this.view();
        },
        view: function () {
            var $elem = $([
                "<div class='", this.className.container, " ", this.className.view, "'>",
                this.renderList(this.options.value),
                "</div>"
            ].join(""));

            this.bindViewEvent($elem);

            return $elem;
        },
        renderImg: function () {
            var src = this.builder.getImage("link.png");
            return ["<img class='", this.className["img"], "' ", "src='", src, "'", " />"].join("");
        },
        renderList: function (items) {
            var html;

            html = [
                "<div class='", this.className.list, "'>",
                "</div>"
            ].join("");

            return html;
        },
        getListItems: function (items) {
            var html = [],
                self = this;

            if (items && items.length > 0) {
                _.forEach(items, function (item, i) {
                    html.push([
                        "<div class='", self.className["list-item"], "' ", "data-index='", i, "'", ">",
                        "  <a title='", item.text, "' href='javascript:void(0);' >", item.text, "</a>",
                        "</div>"
                    ].join(""));
                });
            }

            return html.join("");
        },
        bindViewEvent: function ($elem) {
            var self = this;
            $elem.on("click", "." + self.className["list-item"], function () {
                var $elem = $(this),
                    index = Number($elem.attr("data-index")),
                    item = self.options.value[index];

                self.linkEvent(item);
            });
        },
        linkEvent: function (item) {
            var onclick = this.options.onclick;

            onclick = typeof onclick === "string" ? window[onclick] : onclick;
            if (typeof onclick === "function") {
                onclick.call(this.builder.elem, item);
            }
        },
        getImage: function (img) {
            if (!img || img.indexOf("/") === -1) {
                return this.builder.getImage(img);
            }
            return img;
        },
        getValue: function () {
            return this.options.value;
        },
        setValue: function (value) {
            this.options.value = value;
        },
        className: {
            "container": "formbuilder-control-link",
            "list": "formbuilder-control-link-list",
            "list-item": "formbuilder-control-link-item"
        },
        options: {
            label: "",
            value: [],
            width: "100%",
            "vertical-align": "top"
        },
        property: {
            value: {
                hidden: true,
                excludePattern: ["design"],
                update: function (value) {
                    var items = this.getListItems(value);
                    this.elem.empty().append(items);
                }
            },
            "font-family": {
                hidden: true
            },
            "font-size": {
                hidden: true,
                update: function (value) {
                    this.elem.css("font-size", "0px");
                }
            },
            "font-weight": {
                hidden: true,
                update: function (value) { }
            },
            "font-style-italic": {
                hidden: true,
                update: function (value) { }
            },
            "text-decoration-underline": {
                hidden: true,
                update: function (value) { }
            },
            "height": {
                hidden: true
            },
            "width": {
                hidden: true
            },
            "text-align": {
                hidden: true
            },
            "align": {
                hidden: true
            },
            "vertical-align": {
                hidden: true
            },
            "onclick": {
                type: "textbox",
            }
        }
    });

})(jQuery, _);
/* global jQuery _ */
(function ($) {
    "use strict";
    $.formbuilder.toolbox.add("multipleselectlabel", {
        title: "multipleSelect",
        icon: "muli-select-label.png",
        design: function () {
            return $([
                "<div class='", this.className.container, "'>",
                this.renderImg(),
                "</div>"
            ].join(""));
        },
        applying: function () {
            var $elem = $([
                "<div class='", this.className.container, " ", this.className.view, "'>",
                this.renderRemoveAll(),
                "</div>"
            ].join(""));

            this.bindViewEvent($elem);

            return $elem;
        },
        view: function () {
            var item,
                items = this.options.value || [],
                text = [];

            for (var i = 0, len = items.length; i < len; i++) {
                item = items[i];
                text.push(item.text);
            }

            return $("<label class='" + this.className.view + "'>" + text.join("; ") + "</label>");
        },
        renderRemoveAll: function () {
            return this.renderItem(
                {
                    //text: this.getLocalText("remove-all"),
                    text: "",
                    value: "remove-all"
                },
                null,
                "remove-all");
        },
        renderImg: function () {
            var src = this.builder.getImage(this.icon);
            return ["<img class='", this.className["img"], "' ", "src='", src, "'", " />"].join("");
        },
        renderList: function () {
            return [
                "<div class='", this.className.list, "'>",
                "</div>"
            ].join("");
        },
        renderItem: function (item, index, itemType) {
            return [
                "<div class='", this.className[itemType], "' ", "data-index='", index, "'", ">",
                "  <a href='javascript:void(0);' >", item.text, "</a>",
                "  <span class='", this.className["list-item-remove"], "'>x</span>",
                "</div>"
            ].join("");
        },
        renderListItems: function () {
            var html = [],
                items = this.options.value,
                self = this;

            this.elem.find("." + this.className["list-item"]).remove();
            if (items && items.length > 0) {
                _.forEach(items, function (item, i) {
                    html.push(self.renderItem(item, i, "list-item"));
                });
            }

            this.elem.append(html.join(""));
        },
        bindViewEvent: function () {
            var self = this;
            this.container.on("click", function (e) {
                var $target = $(e.target),
                    $item;

                if ($target.hasClass(self.className["list-item-remove"])) {
                    $item = $target.parent();
                    if ($item.hasClass(self.className["remove-all"])) {
                        self.removeAllEvent();
                    }
                    else {
                        self.removeItemEvent($item);
                    }
                }
                else {
                    self.selectEvent();
                }
            });
        },
        removeAllEvent: function () {
            this.options.value = [];
            this.elem.find("." + this.className["list-item"]).remove();
        },
        removeItemEvent: function ($item) {
            var index = Number($item.attr("data-index"));
            this.options.value.splice(index, 1);
            this.renderListItems();
        },
        selectEvent: function () {
            var onclick = this.options.onclick,
                items = this.options.value,
                self = this;

            onclick = typeof onclick === "string" ? window[onclick] : onclick;
            if (typeof onclick === "function") {
                onclick.call(this.builder.elem, items, function (items) {
                    self.options.value = items;
                    self.renderListItems();
                });

            }
        },
        getImage: function (img) {
            if (!img || img.indexOf("/") === -1) {
                return this.builder.getImage(img);
            }
            return img;
        },
        getValue: function () {
            return this.options.value;
        },
        setValue: function (value) {
            this.options.value = value;
        },
        className: {
            "container": "formbuilder-control-multipleselectlabel",
            "list": "formbuilder-control-multipleselectlabel-list",
            "list-item": "formbuilder-control-multipleselectlabel-item",
            "list-item-remove": "formbuilder-control-multipleselectlabel-item-remove",
            "remove-all": "formbuilder-control-multipleselectlabel-remove-all",
            "view": "formbuilder-control-multipleselectlabel-view"
        },
        options: {
            label: "",
            value: [],
            width: "100%"
        },
        property: {
            value: {
                hidden: true,
                excludePattern: ["design", "view"],
                update: function (value) {
                    this.renderListItems();
                }
            },
            "font-family": {
                hidden: true
            },
            "font-size": {
                hidden: true,
                excludePattern: ["view"],
                update: function (value) {
                    this.elem.css("font-size", "0px");
                }
            },
            "font-weight": {
                hidden: true,
                update: function (value) { }
            },
            "font-style-italic": {
                hidden: true,
                update: function (value) { }
            },
            "text-decoration-underline": {
                hidden: true,
                update: function (value) { }
            },
            "height": {
                hidden: true
            },
            "width": {
                hidden: true
            },
            "text-align": {
                hidden: true
            },
            "align": {
                hidden: true
            },
            "vertical-align": {
                hidden: true
            },
            "onclick": {
                type: "textbox",
            }
        }
    });


})(jQuery);
/* global jQuery */
(function ($) {
    "use strict";

    /**
     * @memberof jQuery.formbuilder
     * @class Property
     * @alias Property
     * @description 属性配置对象
     */

    $.formbuilder.property._base = {
        /**
         * @memberof Property
         * @instance
         * @function
         * @description 创建属性元件元素
         * @return {(jQueryElement|null)} - jQueryElement对象或在方法中自行追加dom对象
         */
        create: function () { },
        /**
         * @memberof Property
         * @instance
         * @type {jQueryElement}
         * @description 当前创建的DOM元素
         */
        elem: null,
        /**
         * @memberof Property
         * @instance
         * @type {string}
         * @description 多语言：代码自动调整
         * @default
         */
        language: "zh-CN",
        /**
         * @memberof Property
         * @instance
         * @type {jQueryElement}
         * @description 当前创建的DOM元素的容器
         */
        container: null,
        /**
         * @memberof Property
         * @instance
         * @function
         * @description 获取多语言
         * @param {string} text - 文本或名称
         * @returns {string} - 本地的语言
         */
        getLocalText: function (text) {
            var language = $.formbuilder.language[this.language] || $.formbuilder.language["zh-CN"];
            return language.property[text] || text || "";
        },
        /**
         * @memberof Property
         * @instance
         * @type {object}
         * @description 属性元件的数据信息
         */
        options: {
            name: "",
            value: ""
        },
        /**
         * @memberof Property
         * @instance
         * @type {string}
         * @description 展示方式 inline-block block
         */
        display: "inline-block",
        /**
         * @memberof Property
         * @instance
         * @function
         * @description 绑定属性元件的自定义事件
         */
        bindEvent: function () { },
        /**
         * @memberof Property
         * @instance
         * @function
         * @description 配置更新触发事件
         * @return {UpdateEvent[]} 事件配置类
         */
        updateEvent: function () { },
        /**
         * @memberof Property
         * @instance
         * @function
         * @description 获取值
         * @returns {?object|?string} 值
         */
        getValue: function () { },
        /**
         * @memberof Property
         * @instance
         * @function
         * @description 设置值
         * @param {object|string|number} value 当前的值
         */
        setValue: function (value) { }

    };

    /**
     * @memberof jQuery.formbuilder
     * @namespace jQuery.formbuilder.property
     * @description formbuilder属性静态类
     */

    /**
     * @memberof jQuery.formbuilder.property
     * @static
     * @function
     * @alias add
     * @description 添加新的属性元件
     * @param {string} type 元件类型
     * @param {Property} options 属性元件配置对象
     */
    $.formbuilder.property.add = function (type, options) {
        var control = $.extend(true, {}, this._base, options);
        /**
         * @description 属性元件类型：代码自动生成
         * @memberof  Property
         * @type {string}
         * @alias type
         * @instance
         * */
        this[type] = control;
    };
})(jQuery);
/* global jQuery */
(function ($) {
    "use strict";
    $.formbuilder.property.add("buttons", {
        create: function () {
            var options = this.options,
                source = options.source,
                value = options.value;

            return $(["<div>",
                this.createItems(source, value),
                "</div>"].join(""));
        },
        createItems: function (items, value) {
            var html = [],
                item,
                positionName;

            if (!items) {
                return;
            }
            for (var i = 0, len = items.length; i < len; i++) {
                item = items[i];
                positionName = "";
                if (i == 0) {
                    positionName += " first";
                }
                if (i == len - 1) {
                    positionName += " last";
                }
                html.push(this.createItem(item, value, positionName));
            }

            return html.join("");
        },
        createItem: function (item, value, positionName) {
            var className = " ";

            className += this.className.item + " " + positionName;
            if (value === item.name) {
                item.selected = true;
                className += " " + this.className.active;
            }
            else {
                item.selected = false;
            }

            return ["<div class=\"", className, "\"", " name=\"\" type=\"button\" ", ">",
                "   <a title=\"", this.getLocalText(item.text), "\">",
                "       <img src=\"", this.builder.getImage( item.image), "\" />",
                "   </a>",
                "</div>"].join("");
        },
        className: {
            item: "formbuilder-property-button",
            active: "formbuilder-property-button-active"
        },
        options: {},
        bindEvent: function () {
            var self = this,
                elem = this.elem;

            elem.on("click", "." + self.className.item, function () {
                var elem = $(this),
                    index = elem.index(),
                    options = self.options,
                    source = options.source,
                    item;

                elem.parent().find("." + self.className.item).removeClass(self.className.active);
                elem.addClass(self.className.active);

                for (var i = 0, len = source.length; i < len; i++) {
                    item = source[i];
                    if (i === index) {
                        options.value = item.name;
                        item.selected = true;
                    }
                    else {
                        item.selected = false;
                    }
                }

            });
        },
        updateEvent: function () {
            return [{
                name: "click",
                filter: "." + this.className.item
            }];
        },
        getValue: function () {
            return this.options.value;
        }
    });

})(jQuery);
/* global jQuery */
(function ($) {
    "use strict";
    $.formbuilder.property.add("label", {
        create: function () {
            return $(["<label ", " class='", this.options.className, "' ", ">",
                this.getLocalText(this.options.text || this.options.name),
                "</label>"].join(""));
        },
        options: {
            className: "formbuilder-property-label"
        }
    });
})(jQuery);
/* global jQuery _*/
(function ($, _) {
    "use strict";
    $.formbuilder.property.add("textbox", {
        elem: null,
        options: {
            value: ""
        },
        className: {
            textbox: "formbuilder-property-textbox"
        },
        template: function (opt) {
            return ["<input type='textbox' class='", opt.className, "' value='", opt.value, "' />"].join("");
        },
        create: function () {
            var $elem, source;

            $elem = $(
              this.template({
                  className: this.className.textbox,
                  value: this.options.value
              })
            );
            source = this.options.source;

            if (source) {
                if (source.readonly) {
                    $elem.attr("readonly", "readonly");
                }
                if (source.placeholder) {
                    $elem.attr("placeholder", this.getLocalText(source.placeholder));
                }
            }
 
            $elem.on("keydown", function (e) {
                e.stopPropagation();
            });

            return $elem;
        },
        /**
         * @class
         * @alias UpdateEvent
         * @description 事件配置类
         */
        updateEvent: function () {
            return [
              {
                  /**
                   * @memberof UpdateEvent
                   * @instance
                   * @description DOM元素绑定事件名称
                   * @type {string}
                   */
                  name: "change",
                  /**
                   * @memberof UpdateEvent
                   * @instance
                   * @description DOM元素筛选（使用jQuery筛选器）
                   * @type {string}
                   * @example "input[type=text]"
                   */
                  filter: ""
              }
            ];
        },
        getValue: function () {
            return this.elem.val();
        },
        setValue: function (value) {
            this.elem.val(value);
        }
    });
})(jQuery, _);

/* global jQuery */
(function ($) {
    "use strict";
    $.formbuilder.property.add("textarea", {
        options: {
            className: "formbuilder-property-textarea",
            rows: 4
        },
        create: function () {
            var $elem = $(["<textarea ",
                " class='", this.options.className, "' ", "rows='", this.options.rows, "'", " >",
                this.options.value,
                " </textarea>"].join(""));

            $elem.on("keydown", function (e) {
                e.stopPropagation();
            });

            return $elem;
        },
        getValue: function () {
            return this.elem.val();
        },
        updateEvent: function () {
            return [{
                name: "change",
                filter: ""
            }];
        }
    });

})(jQuery);
/* global jQuery */
(function ($) {
    "use strict";
    $.formbuilder.property.add("options", {
        display: "block",
        create: function () {
            var className = this.className,
                options = this.options;

            var elem = $(["<div class=\"", className.wrap, "\">",
                "   <ul class=\"", className.options, "\">",
                this.createItems(options.value),
                "   </ul>",
                "   <div class=\"", className.actions, "\">",
                "       <a class=\"", className.addOpt, "\">", this.getLocalText("addOption"), " +</a>",
                "   </div>",
                "</div>"].join(""));

            return elem;
        },
        createItems: function (items) {
            var html = [],
                item;

            if (!items || items.length === 0) {
                items = [{
                    text: "",
                    value: "",
                    selected: false
                }];
            }
            if (items && items.length > 0) {
                for (var i = 0, len = items.length; i < len; i++) {
                    item = items[i];
                    html.push(this.createItem(item.text, item.value, item.selected));
                }
            }

            return html.join("");
        },
        createItem: function (text, value, selected) {
            var className = this.className;

            return ["<li class=\"", className.option, "\">",
                "  <input type=\"checkbox\" class=\"", className.check, " ", (selected ? className.selected : ""), "\"  name=\"\" placeholder=\"\" ", (selected ? " checked=\"true\" " : ""), ">",
                "  <input type=\"text\" class=\"", className.label, "\" value=\"", text, "\" name=\"\" placeholder=\"", this.getLocalText("text"), "\">",
                "  <input type=\"text\" class=\"", className.value, "\" value=\"", value, "\" name=\"\" placeholder=\"", this.getLocalText("value"), "\">",
                "  <a class=\"", className.remove, "\" title=\"", this.getLocalText("removeOption"), "\">×</a>",
                "</li>"].join("");
        },
        bindEvent: function () {
            var self = this,
                elem = this.elem;

            elem.find("." + self.className.addOpt).on("click", function () {
                elem.find("." + self.className.options).append(
                    self.createItem("", "", false)
                );
            });

            if (this.multi === false) {
                elem.on("click", "." + self.className.check, function () {
                    $(this).closest("." + self.className.option)
                        .siblings()
                        .find("." + self.className.check)
                        .each(function () {
                            this.checked = false;
                        });
                });
            }

            elem.on("click", "." + self.className.remove, function () {
                $(this).closest("." + self.className.option).remove();
            });
        },
        className: {
            wrap: "formbuilder-property-sortable-options-wrap",
            options: "formbuilder-property-sortable-options",
            option: "formbuilder-property-option",
            check: "formbuilder-property-check",
            remove: "formbuilder-property-option-remove",
            selected: "formbuilder-property-option-selected",
            label: "formbuilder-property-option-label",
            value: "formbuilder-property-option-value",
            actions: "formbuilder-property-option-actions",
            addOpt: "formbuilder-property-add-opt"
        },
        options: {
            value: []
        },
        updateEvent: function () {
            return [{
                name: "change",
                filter: "input"
            }, {
                name: "click",
                filter: "." + this.className.remove
            }];
        },
        getValue: function () {
            var items = [],
                className = this.className;

            this.elem.find("." + this.className.option).each(function () {
                var elem = $(this),
                    selected = elem.find("." + className.check)[0].checked,
                    text = elem.find("." + className.label).val(),
                    value = elem.find("." + className.value).val();

                if (text || value) {
                    items.push({
                        text: text,
                        value: value,
                        selected: selected
                    });
                }
            });

            return items;
        }
    });

})(jQuery);
/* global jQuery _*/
(function ($, _) {
    "use strict";
    $.formbuilder.property.add("bool", {
        create: function () {
            var options, text, image, value;

            if (!this.options.source) {
                console.warn("please config the source");
                return;
            }
            options = this.options;
            text = options.source.text;
            image = options.source.image;
            value = options.value;

            return $(this.createItem(text, image, value));
        },
        createItem: function (text, image, value) {
            var className = this.className.item;

            if (value === true) {
                className += " " + this.className.active;
            }

            return this.template({
                className: {
                    item: className
                },
                text: this.getLocalText(text),
                image: this.builder.getImage(image)
            });
        },
        template: function (opt) {
            return [
              "<div class='", opt.className.item, "' name='' type='button' >",
              "   <a title='", opt.text, "'>",
              "       <img src='", opt.image, "' />",
              "   </a>",
              "</div>"
            ].join("");
        },
        className: {
            item: "formbuilder-property-bool",
            active: "formbuilder-property-bool-active"
        },
        options: {},
        bindEvent: function () {
            var self = this,
              elem = this.elem;

            elem.on("click", function () {
                var $elem = $(this),
                  options = self.options,
                  value = options.value;

                if (value === true) {
                    options.value = false;
                    $elem.removeClass(self.className.active);
                } else {
                    options.value = true;
                    $elem.addClass(self.className.active);
                }
            });
        },
        updateEvent: function () {
            return [
              {
                  name: "click",
                  filter: ""
              }
            ];
        },
        getValue: function () {
            return this.options.value;
        }
    });
})(jQuery, _);

/* global jQuery */
(function ($) {
    "use strict";
    $.formbuilder.property.add("fileupload", {
        create: function () {
            var options = this.options,
                text = options.source.text,
                image = options.source.image,
                value = options.value;

            return $(this.createItem(text, image, value));
        },
        createItem: function (text, image, value) {
            var className = this.className.item;

            if (value === true) {
                className += " " + this.className.active;
            }

            return ["<div class=\"", className, "\"", " name=\"\" type=\"button\" ", ">",
                "   <a title=\"", this.getLocalText(text), "\">",
                "       <img src=\"", this.builder.getImage(image), "\" />",
                "       <input type=\"file\" >",
                "   </a>",
                "</div>"].join("");
        },
        className: {
            item: "formbuilder-property-fileupload",
            active: "formbuilder-property-fileupload-active",
            error: "formbuilder-property-fileupload-error"
        },
        options: {},
        bindEvent: function () {
            var self = this,
                elem = this.elem;

            elem.find("input[type=\"file\"]").fileupload({
                url: this.options.source.url || this.builder.options.url.imageupload,
                done: function (e, data) {
                    self.options.value = data.result;
                    elem.trigger("finishUpload");
                    elem.find("a").removeClass(self.className.error);
                },
                error: function (e, data) {
                    elem.find("a").addClass(self.className.error);
                },
                complete: function (e, data) {
                    //elem.trigger("finishUpload");
                }
            });
        },
        updateEvent: function () {
            return [{
                name: "finishUpload",
                filter: ""
            }];
        },
        getValue: function () {
            return this.options.value;
        }
    });

})(jQuery);
/* global jQuery _*/
(function ($, _) {
    "use strict";
    $.formbuilder.property.add("colorpicker", {
        create: function () {
            var html;

            html = this.template({
                className: {
                    container: this.className.container,
                    color: this.className.color,
                    picker: this.className.picker
                }
            });
            return $(html);
        },
        template: function (opt) {
            return [
              "<div class='", opt.className.container, "'>",
              "  <div class='", opt.className.color, "'><span></span></div>",
              "  <div class='", opt.className.picker, "'></div>",
              "</div>"
            ].join("");
        },
        className: {
            container: "formbuilder-property-colorpicker",
            color: "formbuilder-property-colorpicker-color",
            picker: "formbuilder-property-colorpicker-picker"
        },
        options: {},
        bindEvent: function () {
            var $elem = this.elem,
              $picker = $elem.find("." + this.className.picker),
              $color = $elem.find("." + this.className.color),
              value = $.formbuilder.getValue(this.options.value),
              self = this;

            value = value || this.options.source.defaultValue || "#333333";
            $color.css("background", value);
            $color.click(function () {
                if ($color.attr("data-show")) {
                    $picker.hide();
                    $color.removeAttr("data-show");
                } else {
                    $picker.show();
                    $color.attr("data-show", true);
                }
            });

            $picker.colpick({
                flat: true,
                layout: "hex",
                //submit: 0,
                color: value.value || value,
                submitText: this.getLocalText("ok"),
                onSubmit: function (hsb, hex, rgb, el) {
                    var color = "#" + hex;
                    $(el).css("background-color", color);
                    $color.css("background", "#" + hex);
                    $picker.hide();
                    $color.removeAttr("data-show");
                    self.options.value = color;
                    $elem.trigger("colorchange");
                }
            });

            $picker.on("keydown", "input", function (e) {
                e.stopPropagation();
            });
        },
        updateEvent: function () {
            return [
              {
                  name: "colorchange",
                  filter: ""
              }
            ];
        },
        getValue: function () {
            return this.options.value;
        }
    });
})(jQuery, _);

/* global jQuery _*/
(function ($, _) {
    "use strict";
    $.formbuilder.property.add("combox", {
        elem: null,
        options: {
            value: ""
        },
        image: {
            arrowsdown: "arrows-down.png"
        },
        className: {
            combox: "formbuilder-property-combox",
            textbox: "formbuilder-property-combox-textbox",
            arrowsdown: "formbuilder-property-combox-arrowsdown",
            items: "formbuilder-property-combox-items",
            item: "formbuilder-property-combox-item"
        },
        template: {
            item: function (opt) {
                return [
                  "<div class='", opt.className, "'>",
                  "   <a title='", opt.text, "' data-index='", opt.index, "'>",
                  "  ", opt.text,
                  "   </a>",
                  "</div>"
                ].join("");
            },
            main: function (opt) {
                return [
                  "<div class='", opt.className.combox, "'>",
                  "   <input type='textbox' class='", opt.className.textbox, "' value='", opt.value, "'  ", opt.readonly, " />",
                  "   <span class='", opt.className.arrowsdown, "'>",
                  "       <img src='", opt.icon, "'/>",
                  "   </span>",
                  "   ", opt.items,
                  "</div>"
                ].join("");
            }
        },
        create: function () {
            var options = this.options,
              readonly = options.readonly,
              items = options.source,
              obj = options.value || "",
              arrowsdownImage = this.image.arrowsdown,
              html,
              $elem;

            if (typeof obj !== "object") {
                obj = {
                    text: obj || "",
                    value: obj || ""
                };
                _.each(items, function (item) {
                    if (item.value === obj.value) {
                        obj.text = item.text;
                    }
                });
            }

            html = this.template.main({
                className: {
                    combox: this.className.combox,
                    textbox: this.className.textbox,
                    arrowsdown: this.className.arrowsdown
                },
                value: this.getLocalText(obj.text),
                readonly: readonly ? "readonly='readonly'" : "",
                icon: this.builder.getImage(arrowsdownImage),
                items: this.createItems(items)
            });

            $elem = $(html);

            $elem.on("keydown", function (e) {
                e.stopPropagation();
            });

            return $elem;
        },
        createItems: function (items) {
            var html = [];

            html.push(["<div class='", this.className.items, "'>"].join(""));
            if (items instanceof Array && items.length > 0) {
                for (var i = 0, len = items.length; i < len; i++) {
                    html.push(this.createItem(items[i], i));
                }
            }
            html.push("</div>");

            return html.join("");
        },
        createItem: function (item, index) {
            return this.template.item({
                className: this.className.item,
                text: this.getLocalText(item.text) || item.text,
                index: index
            });
        },
        bindEvent: function () {
            var self = this,
              $elem = this.elem,
              $items = $elem.find("." + this.className.items),
              $textbox = $elem.find("." + this.className.textbox);

            $elem.on("mousedown", "." + this.className.arrowsdown, function (e) {
                var setTimeoutId;

                if ($items.attr("data-open")) {
                    self.hideSubContent();
                    $items.removeAttr("data-stop-blur-event");
                } else {
                    $textbox[0].focus();
                    $items.attr("data-stop-blur-event", true);
                    self.showSubContent();

                    setTimeoutId = $items.attr("data-setTimeoutId");
                    if (setTimeoutId) {
                        clearTimeout(setTimeoutId);
                    }
                    setTimeoutId = setTimeout(function () {
                        if ($items.attr("data-open")) {
                            $items.removeAttr("data-stop-blur-event");
                        }
                    }, 200);
                    $items.attr("data-setTimeoutId", setTimeoutId);
                }

                e.preventDefault();
            });

            $items.on("click", "." + this.className.item + ">a", function () {
                var $elem = $(this),
                  index = $elem.attr("data-index"),
                  selected = self.options.source[index];

                self.options.value = selected;
                self.hideSubContent();
                $textbox.val(self.getLocalText(selected.text));
                self.update();
            });

            $textbox.on("change", function () {
                var $elem = $(this),
                  value = $elem.val();

                self.options.value = value;
                self.hideSubContent();
                self.update();
            });

            $textbox.on("blur", function (e) {
                setTimeout(function () {
                    if ($items.attr("data-stop-blur-event")) {
                        $items.removeAttr("data-stop-blur-event");
                        return;
                    }
                    self.hideSubContent();
                }, 250);
            });
            //IE需要对滚动条兼容处理
            if (!!window.ActiveXObject || "ActiveXObject" in window) {
                $items.on("mousedown click", function (e) {
                    $items.attr("data-stop-blur-event", true);
                    setTimeout(function () {
                        $textbox[0].focus();
                    }, 1);
                });
            }
        },
        showSubContent: function () {
            var $items = this.elem.find("." + this.className.items);
            $items.show();
            $items.attr("data-open", true);
        },
        hideSubContent: function () {
            var $items = this.elem.find("." + this.className.items);
            $items.hide();
            $items.removeAttr("data-open");
        },
        update: function () {
            this.elem.trigger("comboxUpdate");
        },
        updateEvent: function () {
            return [
              {
                  name: "comboxUpdate"
              }
            ];
        },
        getValue: function () {
            var value = this.options.value;
            if (_.isObject(value)) {
                value = value.value;
            }
            return value;
        }
    });
})(jQuery, _);

/* global jQuery */
(function ($) {
    "use strict";


    /**
     * @memberof jQuery.formbuilder
     * @class Contextmenu
     * @alias Contextmenu
     * @description 右键菜单配置对象
     */

    $.formbuilder.contextmenu._base = {
        /**
         * @memberof Contextmenu
         * @instance
         * @type {string}
         * @description 多语言：代码自动调整
         * @default
         */
        language: "zh-CN",
        /**
         * @memberof Contextmenu
         * @instance
         * @function
         * @description 获取多语言
         * @param {string} text - 文本或名称
         * @returns {string} - 本地的语言
         */
        getLocalText: function (text) {
            var language = $.formbuilder.language[this.language] || $.formbuilder.language["zh-CN"];
            return language.contextmenu[text] || text || "";
        },
        /**
         * @memberof Contextmen-Item
         * @instance
         * @member
         * @description 目标类型 cells control
         */
        targetType: null,
        /**
         * @memberof Contextmen-Item
         * @instance
         * @member
         * @description 多语言名称
         */
        text: null,
        /**
         * @memberof Contextmen-Item
         * @instance
         * @member
         * @description 图片名称或完整的图片地址
         */
        image: null,
        /**
         * @memberof Contextmen-Item
         * @instance
         * @method
         * @description 验证菜单是否显示
         * @param {jQueryElement} target 右键选中的单元格或控件元素
         * @param {Grid} grid 网格对象实例
         * @returns {bool} 是否显示此配置菜单
         */
        checking: function (target, grid) { },
        /**
         * @memberof Contextmen-Item
         * @instance
         * @method
         * @description 点击执行菜单项时执行的脚本
         * @param {jQueryElement} target 右键选中的单元格或控件元素
         * @param {Grid} grid 网格对象实例
         */
        fn: function (target, grid) { }
    };


    /**
     * @memberof jQuery.formbuilder
     * @namespace jQuery.formbuilder.contextmenu
     * @alias $.formbuilder.contextmenu
     * @description formbuilder右键菜单静态类
     */

    /**
     * @memberof jQuery.formbuilder.contextmenu
     * @static
     * @function
     * @alias add
     * @description 添加新的右键菜单项
     * @param {string} type 右键菜单类型
     * @param {Property} options 右键菜单的内容选项
     */
    $.formbuilder.contextmenu.add = function (type, options) {
        this[type] = $.extend(true, {
            type: type
        }, this._base, options);
    };
})(jQuery);
/* global jQuery _ */
(function($, _) {
    "use strict";
    $.formbuilder.contextmenu.add("merge", {
        text: "merge",
        targetType: "cells",
        image: "merge-cells.png",
        checking: function($target, grid) {
            var elems = grid.getSelected(),
              $elem,
              p1,
              p2;

            if (elems.length > 1) {
                for (var i = 0, len = elems.length; i < len; i++) {
                    $elem = $(elems[i]);
                    p1 = $.formbuilder.getPosition($target);
                    p2 = $.formbuilder.getPosition($elem);
                    if (_.isEqual(p1, p2)) {
                        return true;
                    }
                }
            }

            return false;
        },
        fn: function($target, grid) {
            var $elems = grid.getSelected();
            grid.mergeCells($elems);
        }
    });
})(jQuery, _);

/* global jQuery _ */
(function($, _) {
    "use strict";

    $.formbuilder.contextmenu.add("canel-merge", {
        text: "canel-merge",
        targetType: "cells",
        image: "split-cells.png",
        checking: function($target, grid) {
            var elems = grid.getSelected(),
              $elem,
              colspan,
              rowspan,
              hasCancelMergeElem,
              isTargetInSelectedRange,
              p = $.formbuilder.getPosition($target),
              p2; // $target.attr("data-position");

            //在选择范围内查找
            if (elems.length > 1) {
                for (var i = 0, len = elems.length; i < len; i++) {
                    $elem = $(elems[i]);
                    p2 = $.formbuilder.getPosition($elem);
                    //if (p === $elem.attr("data-position")) {
                    if (_.isEqual(p, p2)) {
                        isTargetInSelectedRange = true;
                    }
                    colspan = parseInt($elem.attr("colspan") || 1);
                    rowspan = parseInt($elem.attr("rowspan") || 1);
                    if (colspan > 1 || rowspan > 1) {
                        hasCancelMergeElem = true;
                    }
                }

                if (isTargetInSelectedRange && hasCancelMergeElem) {
                    return true;
                }
            }
                //当前触发的单元格是否执行取消合并
            else if ($target.length === 1) {
                colspan = parseInt($target.attr("colspan") || 1);
                rowspan = parseInt($target.attr("rowspan") || 1);
                if (colspan > 1 || rowspan > 1) {
                    return true;
                }
            }

            return false;
        },
        fn: function($target, grid) {
            var $elems = grid.getSelected();
            grid.cancelMergeCells($elems, $target);
        }
    });
})(jQuery, _);

/* global jQuery */
(function ($) {
    "use strict";

    $.formbuilder.contextmenu.add("cut", {
        targetType: "control",
        text: "cut",
        image: "cut.png",
        checking: function (target, grid) {
            var selected = grid.getSelectedControl();
            if (selected.length === 0) {
                return false;
            }

            return true;
        },
        fn: function (target, grid) {
            grid.cutControls();
        }
    });

})(jQuery);
/* global jQuery */
(function ($) {
    "use strict";

    $.formbuilder.contextmenu.add("copy", {
        targetType: "control",
        text: "copy",
        image: "copy.png",
        checking: function (target, grid) {
            var selected = grid.getSelectedControl();
            if (selected.length === 0) {
                return false;
            }

            return true;
        },
        fn: function (target, grid) {
            grid.copyControls();
        }
    });

})(jQuery);
/* global jQuery */
(function ($) {
    "use strict";
    $.formbuilder.contextmenu.add("remove", {
        targetType: "control",
        text: "remove",
        image: "remove.png",
        checking: function (target, grid) {
            var selected = grid.getSelectedControl();
            if (selected.length === 0) {
                return false;
            }

            return true;
        },
        fn: function (target, grid) {
            grid.removeControls();
        }
    });

})(jQuery);
/* global jQuery */
(function($) {
    "use strict";
    $.formbuilder.contextmenu.add("paste", {
        text: "paste",
        targetType: "cells",
        image: "paste.png",
        checking: function(target, grid) {
            var cache = grid.cache,
              $elems = grid.getSelected(),
              p1;

            if ($elems.length === 1) {
                p1 = $.formbuilder.getPosition($($elems[0]));
                if (p1.x === -1 || p1.y === -1) {
                    return false;
                }
            }

            return cache["cut-control"] || cache["copy-control"];
        },
        fn: function(target, grid) {
            grid.pasteControls();
        }
    });
})(jQuery);

/* global jQuery _ */
(function($, _) {
    "use strict";
    $.formbuilder.contextmenu.add("insert-row", {
        text: "insert-row",
        targetType: "cells",
        image: "insert-row.png",
        checking: function($target, grid) {
            var $elems = grid.getSelected(),
              p1;

            if ($elems.length === 1) {
                p1 = $.formbuilder.getPosition($target);
                if (p1.y === -1) {
                    return true;
                }
            }
            return false;
        },
        fn: function($target, grid) {
            var $elems = grid.getSelected(),
              p;

            if ($elems.length === 1) {
                p = $.formbuilder.getPosition($target);
                grid.insertRows(p.x,1);
            }
        }
    });
})(jQuery, _);

/* global jQuery _ */
(function($, _) {
    "use strict";
    $.formbuilder.contextmenu.add("insert-column", {
        text: "insert-column",
        targetType: "cells",
        image: "insert-column.png",
        checking: function($target, grid) {
            var $elems = grid.getSelected(),
              p1;

            if ($elems.length === 1) {
                p1 = $.formbuilder.getPosition($target);
                if (p1.x === -1) {
                    return true;
                }
            }
            return false;
        },
        fn: function($target, grid) {
            var $elems = grid.getSelected(),
              p;

            if ($elems.length === 1) {
                p = $.formbuilder.getPosition($target);
                grid.insertColumns(p.y,1);
            }
        }
    });
})(jQuery, _);

/* global jQuery _ */
(function($, _) {
    "use strict";
    $.formbuilder.contextmenu.add("remove-column", {
        text: "remove-column",
        targetType: "cells",
        image: "remove-column.png",
        checking: function($target, grid) {
            var $elems = grid.getSelected(),
              p1;

            if ($elems.length === 1) {
                p1 = $.formbuilder.getPosition($target);
                if (p1.x === -1) {
                    return true;
                }
            }
            return false;
        },
        fn: function($target, grid) {
            var $elems = grid.getSelected(),
              p;

            if ($elems.length === 1) {
                p = $.formbuilder.getPosition($target);
                grid.removeColumns(p.y);
            }
        }
    });
})(jQuery, _);

/* global jQuery _ */
(function($, _) {
    "use strict";
    $.formbuilder.contextmenu.add("remove-row", {
        text: "remove-row",
        targetType: "cells",
        image: "remove-row.png",
        checking: function($target, grid) {
            var $elems = grid.getSelected(),
              p1;

            if ($elems.length === 1) {
                p1 = $.formbuilder.getPosition($target);
                if (p1.y === -1) {
                    return true;
                }
            }
            return false;
        },
        fn: function($target, grid) {
            var $elems = grid.getSelected(),
              p;

            if ($elems.length === 1) {
                p = $.formbuilder.getPosition($target);
                grid.removeRows(p.x);
            }
        }
    });
})(jQuery, _);

/* global jQuery */
(function ($) {
    "use strict";

    /**
     * @memberof jQuery.formbuilder
     * @class Menu
     * @alias Menu
     * @description 菜单类型配置对象
     */
    $.formbuilder.menu._base = {
        /**
         * @memberof Menu
         * @instance
         * @function
         * @description 创建菜单元素
         * @return {(jQueryElement|null)} - jQueryElement对象或在方法中自行追加dom对象
         */
        create: function () { },
        /**
         * @memberof Menu
         * @instance
         * @type {jQueryElement}
         * @description 当前创建的DOM元素
         */
        elem: null,
        /**
         * @memberof Menu
         * @instance
         * @type {string}
         * @description 多语言：代码自动调整
         * @default
         */
        language: "zh-CN",
        /**
         * @memberof Menu
         * @instance
         * @type {jQueryElement}
         * @description 当前创建的DOM元素的容器
         */
        container: null,
        /**
         * @memberof Menu
         * @instance
         * @function
         * @description 获取多语言
         * @param {string} text - 文本或名称
         * @returns {string} - 本地的语言
         */
        getLocalText: function (text) {
            var language = $.formbuilder.language[this.language] || $.formbuilder.language["zh-CN"];
            return language.menu[text] || text || "";
        },
        /**
         * @memberof Menu
         * @instance
         * @type {object}
         * @description 菜单的数据信息
         */
        options: {
            name: "",
            value: ""
        },
        /**
         * @memberof Menu
         * @instance
         * @function
         * @description 绑定菜单的自定义事件
         */
        bindEvent: function () { },
        /**
         * @memberof Menu
         * @instance
         * @function
         * @description 配置更新触发事件
         * @return {UpdateEvent[]} 事件配置类
         */
        updateEvent: function () { },
        update: function () { },
        /**
         * @memberof Menu
         * @instance
         * @function
         * @description 获取值
         * @returns {?object|?string} 值
         */
        getValue: function () {
            return this.options.value;
        },
        /**
         * @memberof Menu
         * @instance
         * @function
         * @description 设置值
         * @param {object|string|number} value 当前的值
         */
        setValue: function (value) { },
        /**
         * @memberof Menu
         * @instance
         * @function
         * @description 设置显示
         * @param {object|string|number} value 当前的值
         */
        setActive: function (value) { }

    };

    /**
     * @memberof jQuery.formbuilder
     * @namespace jQuery.formbuilder.menu
     * @description formbuilder属性静态类
     */

    /**
     * @memberof jQuery.formbuilder.menu
     * @static
     * @function
     * @alias add
     * @description 添加新的菜单控件
     * @param {string} type 菜单控件类型
     * @param {Menu} options 菜单配置对象
     */
    $.formbuilder.menu.add = function (type, options) {
        var control = $.extend(true, {}, this._base, options);
        /**
         * @description 菜单类型：代码自动生成
         * @memberof  Menu
         * @type {string}
         * @alias type
         * @instance
         * */
        this[type] = control;
    };
})(jQuery);
/* global jQuery */
(function ($) {
    "use strict";
    $.formbuilder.menu.add("button", {
        create: function () {
            var options = this.options,
                text = options.text,
                image = options.image,
                value = options.value;

            return $(this.createItem(text, image, value));
        },
        createItem: function (text, image, value) {
            var className = this.className.item;

            if (value === true) {
                className += " " + this.className.active;
            }

            return ["<div class=\"", className, "\"", " name=\"\" type=\"button\" ", ">",
                "   <a title=\"", this.getLocalText(text), "\">",
                "       <img  class=\"", this.className.image, "\"", " src=\"", this.builder.getImage(image), "\" />",
                "   </a>",
                "</div>"].join("");
        },
        className: {
            item: "formbuilder-menu-button",
            image: "formbuilder-menu-button-image",
            active: "formbuilder-menu-button-active"
        },
        options: {},
        bindEvent: function () {
            var self = this,
                elem = this.elem;

            elem.find(">a").on("click", function () {
                var options = self.options,
                    value = options.value,
                    selectValue = true,
                    cancelValue = false,
                    isActive = null;

                if (value === selectValue) {
                    options.value = cancelValue;
                    isActive = cancelValue;
                }
                else if (value === cancelValue) {
                    options.value = selectValue;
                    isActive = selectValue;
                }
               
                self.setActive(isActive);

                self.update();
            });
        },
        updateEvent: function () {
            return [{
                name: "buttonUpdate"
            }];
        },
        update: function () {
            this.elem.trigger("buttonUpdate");
        },
        updateImage: function (image) {
            this.elem.find(">a img." + this.className.image).attr("src", this.builder.getImage(image));
        },
        setActive: function (value) {
            var $elem = this.elem;

            if (value === true) {
                $elem.addClass(this.className.active);
            }
            else if (value === false) {
                $elem.removeClass(this.className.active);
            }
        }
    });

})(jQuery);
/* global jQuery */
(function ($) {
    "use strict";
    $.formbuilder.menu.add("image", {
        create: function () {
            var options = this.options,
                text = options.text,
                image = options.image,
                value = options.value;

            return $(this.createItem(text, image, value));
        },
        createItem: function (text, image, value) {
            var className = this.className.item;

            if (value === true) {
                className += " " + this.className.active;
            }

            return ["<div class=\"", className, "\"", " name=\"\" type=\"button\" ", ">",
                "   <a title=\"", this.getLocalText(text), "\">",
                "       <img src=\"", this.builder.getImage(image), "\" />",
                "       <input type=\"file\" >",
                "   </a>",
                "</div>"].join("");
        },
        className: {
            item: "formbuilder-menu-image",
            active: "formbuilder-menu-image-active",
            error: "formbuilder-menu-image-error"
        },
        options: {},
        bindEvent: function () {
            var self = this,
                elem = this.elem;

            elem.find("input[type=\"file\"]").fileupload({
                url: this.options.url || this.builder.options.url.imageupload,
                done: function (e, data) {
                    self.options.value = data.result;
                    self.update();
                    elem.find("a").removeClass(self.className.error);
                },
                error: function (e, data) {
                    elem.find("a").addClass(self.className.error);
                },
                complete: function (e, data) {
                    //elem.trigger("finishUpload");
                }
            });
        },
        update: function () {
            this.elem.trigger("imageUpdate");
        },
        updateEvent: function () {
            return [{
                name: "imageUpdate",
                filter: ""
            }];
        }
    });

})(jQuery);
/* global jQuery _*/
(function($, _) {
    "use strict";
    $.formbuilder.menu.add("combox", {
        create: function() {
            var options = this.options,
              readonly = options.readonly,
              text = options.value.text || "",
              arrowsdownImage = options.image.arrowsdown,
              items = options.items,
              width = options.width || "",
              html;

            if (width) {
                width = "style='width:" + width + "px'";
            }

            html = [
              "<div class='",
              this.className.combox,
              "' ",
              "",
              ">",
              "   <input type='textbox' ",
              "class='",
              this.className.textbox,
              "' ",
              "value='",
              text,
              "' ",
              readonly ? "readonly='readonly'" : "",
              " ",
              width,
              "/>",
              "   <span class='",
              this.className.arrowsdown,
              "'>",
              "       <img src='",
              this.builder.getImage(arrowsdownImage),
              "'",
              "/>",
              "   </span>",
              "   ",
              this.createItems(items),
              "</div>"
            ].join("");

            return $(html);
        },
        createItems: function(items) {
            var html = [];

            html.push(["<div class='", this.className.items, "'>"].join(""));
            if (items instanceof Array && items.length > 0) {
                for (var i = 0, len = items.length; i < len; i++) {
                    html.push(this.createItem(items[i], i));
                }
            }
            html.push("</div>");

            return html.join("");
        },
        createItem: function(item, index) {
            return [
              "<div class='",
              this.className.item,
              "'",
              ">",
              "   <a title='",
              item.text,
              "' ",
              "data-index='",
              index,
              "' ",
              ">",
              "  ",
              item.text,
              "   </a>",
              "</div>"
            ].join("");
        },
        className: {
            combox: "formbuilder-menu-combox",
            textbox: "formbuilder-menu-combox-textbox",
            arrowsdown: "formbuilder-menu-combox-arrowsdown",
            items: "formbuilder-menu-combox-items",
            item: "formbuilder-menu-combox-item"
        },
        options: {
            image: {
                arrowsdown: "arrows-down.png"
            }
        },
        bindEvent: function() {
            var self = this,
              $elem = this.elem,
              $items = $elem.find("." + this.className.items),
              $textbox = $elem.find("." + this.className.textbox);

            $elem.on("mousedown", "." + this.className.arrowsdown, function(e) {
                var setTimeoutId;

                if ($items.attr("data-open")) {
                    self.hideSubContent();
                    $items.removeAttr("data-stop-blur-event");
                } else {
                    $textbox[0].focus();
                    $items.attr("data-stop-blur-event", true);
                    self.showSubContent();

                    setTimeoutId = $items.attr("data-setTimeoutId");
                    if (setTimeoutId) {
                        clearTimeout(setTimeoutId);
                    }
                    setTimeoutId = setTimeout(function() {
                        if ($items.attr("data-open")) {
                            $items.removeAttr("data-stop-blur-event");
                        }
                    }, 200);
                    $items.attr("data-setTimeoutId", setTimeoutId);
                }

                e.preventDefault();
            });

            $items.on("click", "." + this.className.item + ">a", function() {
                var $elem = $(this),
                  index = $elem.attr("data-index"),
                  selected = self.options.items[index];

                self.options.value = selected.value;
                self.hideSubContent();
                $textbox.val(selected.text);
                self.update();
            });

            $textbox.on("change", function() {
                var $elem = $(this),
                  value = $elem.val();

                self.options.value = value;
                self.hideSubContent();
                self.update();
            });

            $textbox.on("blur", function() {
                setTimeout(function() {
                    if ($items.attr("data-stop-blur-event")) {
                        $items.removeAttr("data-stop-blur-event");
                        return;
                    }
                    self.hideSubContent();
                }, 250);
            });

            //IE需要对滚动条兼容处理
            if (!!window.ActiveXObject || "ActiveXObject" in window) {
                $items.on("mousedown click", function(e) {
                    $items.attr("data-stop-blur-event", true);
                    setTimeout(function() {
                        $textbox[0].focus();
                    }, 1);
                });
            }
        },
        showSubContent: function() {
            var $items = this.elem.find("." + this.className.items);
            $items.show();
            $items.attr("data-open", true);
        },
        hideSubContent: function() {
            var $items = this.elem.find("." + this.className.items);
            $items.hide();
            $items.removeAttr("data-open");
        },
        update: function() {
            this.elem.trigger("comboxUpdate");
        },
        setActive: function(value) {
            var $elem = this.elem,
              $textbox = $elem.find("." + this.className.textbox),
              text;

            if (!value) {
                return;
            }

            if (typeof value === "object") {
                text = value.text;
            } else {
                text = value;
            }
            $textbox.val(text);
        },
        updateEvent: function() {
            return [
              {
                  name: "comboxUpdate"
              }
            ];
        },
        getValue: function() {
            var value = this.options.value;
            if (_.isObject(value)) {
                value = value.value;
            }
            return value;
        }
    });
})(jQuery, _);

/* global jQuery */
(function ($) {
    "use strict";
    $.formbuilder.menu.add("colorpicker", {
        create: function () {
            var $elem = $(["<div  class='", this.className.container, "'>",
                "<div class='", this.className.picker, "'></div>",
                "</div>"].join(""));

            return $elem;
        },
        className: {
            container: "formbuilder-menu-colorpicker",
            picker: "formbuilder-menu-colorpicker-picker"
        },
        options: {},
        bindEvent: function () {
            var $elem = this.elem,
                $picker = $elem.find("." + this.className.picker),
                value = this.options.value || "#333333",
                self = this;

            $picker.colpick({
                flat: true,
                layout: "hex",
                //submit: 0,
                color: value,
                submitText: this.getLocalText("ok"),
                onSubmit: function (hsb, hex, rgb, el) {
                    var color = "#" + hex;
                    self.options.value = color;
                    self.update();
                }
            });

            $picker.on("keydown", "input", function (e) {
                e.stopPropagation();
            });
        },
        update: function () {
            this.elem.trigger("colorpickerUpdate");
        },
        updateEvent: function () {
            return [{
                name: "colorpickerUpdate",
                filter: ""
            }];
        }
    });

})(jQuery);
/* global jQuery */
(function ($) {
    "use strict";


    /**
     * @memberof jQuery.formbuilder
     * @class ShortcutKey
     * @alias ShortcutKey
     * @description 键盘快捷方式配置对象
     */

    $.formbuilder.shortcutKey._base = {
        shiftKey: false,
        altKey: false,
        ctrlKey: true,
        /**
         * @memberof ShortcutKey
         * @instance
         * @type {array}
         * @description 快捷键
         * @default
         */
        keyCode: null,
        /**
         * @memberof ShortcutKey
         * @instance
         * @type {string}
         * @description 选中目标类型
         * @default
         */
        targetType: "control",
        /**
         * @memberof ShortcutKey
         * @instance
         * @function
         * @description 验证
         * @param {string} target - 目标元素
         * @param {string} grid - 网格实例
         * @returns {bool} - 是否通过验证
         */
        checking: function (target, grid) {
            return true;
        },
        /**
         * @memberof ShortcutKey
         * @instance
         * @function
         * @description 执行的代码
         * @param {string} target - 目标元素
         * @param {string} grid - 网格实例
         */
        fn: function (target, grid) {
        }
    };


    /**
     * @memberof jQuery.formbuilder
     * @namespace jQuery.formbuilder.shortcutKey
     * @alias $.formbuilder.shortcutKey
     * @description formbuilder属性静态类
     */

    /**
     * @memberof jQuery.formbuilder.shortcutKey
     * @static
     * @function
     * @alias add
     * @description 添加新的快捷方式
     * @param {string} name 名称
     */
    $.formbuilder.shortcutKey.add = function (name, item) {
        this[name] = $.extend(true, {}, this._base, item);
    };

})(jQuery);
/* global jQuery */
(function ($) {
    "use strict";

    $.formbuilder.shortcutKey.add("copy", {
        keyCode: 67,
        targetType: "control",
        checking: function (target, grid) {
            return target && target.length > 0;
        },
        fn: function (target, grid) {
            grid.copyControls();
        }
    });

})(jQuery);
/* global jQuery */
(function ($) {
    "use strict";

    $.formbuilder.shortcutKey.add("cut", {
        keyCode: 88,
        targetType: "control",
        checking: function (target, grid) {
            return target && target.length > 0;
        },
        fn: function (target, grid) {
            grid.cutControls();
        }
    });

})(jQuery);
/* global jQuery */
(function ($) {
    "use strict";

    $.formbuilder.shortcutKey.add("paste", {
        keyCode: 86,
        targetType: "cell",
        checking: function (target, grid) {
            var cache = grid.cache;

            return cache["cut-control"] || cache["copy-control"];
        },
        fn: function (target, grid) {
            grid.pasteControls();
        }
    });

})(jQuery);
/* global jQuery */
(function($) {
    "use strict";

    /**
     * @memberof jQuery.formbuilder
     * @class MenuControl
     * @alias MenuControl
     * @description 菜单项类型配置对象
     */
    $.formbuilder.menucontrol["add-image"] = {
        /**
         * @memberof MenuControl
         * @instance
         * @type {(object)}
         * @alias options
         * @description 创建菜单项使用的参数
         */
        options: {
            name: "value",
            value: "image.png",
            text: "image-upload",
            image: "imageupload.png",
            //url: "please-replace-image-upload-server-url-in-image-menucontrol",
            url: ""
        },
        /**
         * @memberof MenuControl
         * @instance
         * @type {(string)}
         * @alias type
         * @description 创建菜单项的类型
         */
        type: "image",
        /**
         * @memberof MenuControl
         * @instance
         * @type {('cell'|'control')}
         * @alias target
         * @description 选中的目标元素
         */
        target: "cell",
        /**
         * @memberof MenuControl
         * @instance
         * @type {(bool)}
         * @alias target
         * @description 调整是否为元件的属性项
         */
        property: false,
        /**
         * @memberof MenuControl
         * @instance
         * @function
         * @description 执行的自定义方法
         * @param {jqueryElement} $elem 选中的目标dom元素
         * @param {object} grid 当前网格实例
         * @return {(null)}
         */
        fn: function($elem, grid) {
            var value = this.options.value,
              workspace = grid.workspace,
              position;

            if ($elem.length === 1) {
                position = $.formbuilder.getPosition($elem); //JSON.parse($elem.attr("data-position"));
                workspace.addNewItem(
                  {
                      type: this.config.controlType,
                      label: "",
                      value: value || "image.png"
                  },
                  position
                );
            }
        },
        controlType: "image"
    };
})(jQuery);

/* global jQuery */
(function ($) {
    "use strict";

    $.formbuilder.menucontrol["align-center"] = {
        options: {
            name: "align",
            value: "center",
            text: "align-center",
            image: "align-center.png"
        },
        type: "button",
        target: "control",
        property: true
    };

})(jQuery);

/* global jQuery */
(function ($) {
    "use strict";

    $.formbuilder.menucontrol["align-left"] = {
        options: {
            name: "align",
            value: "left",
            text: "align-left",
            image: "align-left.png"
        },
        type: "button",
        target: "control",
        property: true
    };

})(jQuery);

/* global jQuery */
(function ($) {
    "use strict";

    $.formbuilder.menucontrol["align-right"] = {
        options: {
            name: "align",
            value: "right",
            text: "align-right",
            image: "align-right.png"
        },
        type: "button",
        target: "control",
        property: true
    };

})(jQuery);

/* global jQuery */
(function ($) {
    "use strict";

    $.formbuilder.menucontrol["align"] = {
        options: {
            name: "align",
            value: "left",
            text: "align-left",
            image: "align-left.png"
        },
        type: "button",
        target: "control",
        property: true,
        keepSubmenu: true
    };

})(jQuery);

/* global jQuery */
(function ($) {
    "use strict";

    $.formbuilder.menucontrol["cancel-merge-cells"] = {
        options: {
            name: null,
            value: false,
            text: "canel-merge",
            image: "split-cells.png"
        },
        type: "button",
        target: "cell",
        property: false,
        fn: function (elems, grid) {
            grid.cancelMergeCells(elems, elems);
        }

    };

})(jQuery);

/* global jQuery */
(function ($) {
    "use strict";

    $.formbuilder.menucontrol["cell-background-color-display"] = {
        options: {
            name: ["background-color"],
            value: ["red"],
            image: "background-color.png",
            text: "cell-background-color"
        },
        type: "button",
        target: "cell",
        property: true,
        fn: function (update) {
            //update();
        }
    };

})(jQuery);
/* global jQuery */
(function ($) {
    "use strict";

    $.formbuilder.menucontrol["cell-background-color-picker"] = {
        options: {
            name: ["background-color"],
            value: "#ffffff",
        },
        type: "colorpicker",
        target: "cell",
        property: true
    };

})(jQuery);
/* global jQuery */
(function ($) {
    "use strict";

    $.formbuilder.menucontrol["cell-border-color-display"] = {
        options: {
            name: ["border-color"],
            value: ["red"],
            image: "border-color.png",
            text: "cell-border-color"
        },
        type: "button",
        target: "cell",
        property: true,
        fn: function (update) {
            //update();
        }
    };

})(jQuery);
/* global jQuery */
(function ($) {
    "use strict";

    $.formbuilder.menucontrol["cell-border-color-picker"] = {
        options: {
            name: ["border-color"],
            value: "#ffffff",
        },
        type: "colorpicker",
        target: "cell",
        property: true
    };

})(jQuery);
/* global jQuery */
(function ($) {
    "use strict";

    $.formbuilder.menucontrol["cell-border-dashed"] = {
        options: {
            name: "border-style",
            value: "border-dashed",
            text: "border-dashed",
            image: "border-dashed.png"
        },
        type: "button",
        target: "cell",
        property: true
    };

})(jQuery);

/* global jQuery */
(function ($) {
    "use strict";

    $.formbuilder.menucontrol["cell-border-none"] = {
        options: {
            name: "border-style",
            value: "border-none",
            text: "border-none",
            image: "border-none.png"
        },
        type: "button",
        target: "cell",
        property: true
    };

})(jQuery);

/* global jQuery */
(function ($) {
    "use strict";

    $.formbuilder.menucontrol["cell-border-solid-heavy"] = {
        options: {
            name: "border-style",
            value: "border-solid-heavy",
            text: "border-solid-heavy",
            image: "border-solid-heavy.png"
        },
        type: "button",
        target: "cell",
        property: true
    };

})(jQuery);

/* global jQuery */
(function ($) {
    "use strict";

    $.formbuilder.menucontrol["cell-border-solid"] = {
        options: {
            name: "border-style",
            value: "border-solid",
            text: "border-solid",
            image: "border-solid.png"
        },
        type: "button",
        target: "cell",
        property: true
    };

})(jQuery);

/* global jQuery */
(function ($) {
    "use strict";

    $.formbuilder.menucontrol["cell-border-style"] = {
        options: {
            name: "border-style",
            value: "border-solid",
            text: "border-solid",
            image: "border-solid.png"
        },
        type: "button",
        target: "cell",
        property: true,
        keepSubmenu: true
    };

})(jQuery);

/* global jQuery */
(function ($) {
    "use strict";

    $.formbuilder.menucontrol["copy-control"] = {
        options: {
            name: null,
            value: false,
            text: "copy",
            image: "copy.png"
        },
        type: "button",
        target: "control",
        property: false,
        fn: function ($elem, grid) {
            grid.copyControls();
        }
    };

})(jQuery);

/* global jQuery */
(function ($) {
    "use strict";

    $.formbuilder.menucontrol["cut-control"] = {
        options: {
            name: null,
            value: false,
            text: "cut",
            image: "cut.png"
        },
        type: "button",
        target: "control",
        property: false,
        fn: function ($elem, grid) {
            grid.cutControls();
        }

    };

})(jQuery);

/* global jQuery */
(function ($) {
    "use strict";

    $.formbuilder.menucontrol["font-color-display"] = {
        options: {
            name: ["color"],
            value: ["red"],
            image: "color.png",
            text: "color"
        },
        type: "button",
        target: "control",
        property: true,
        fn: function (update) {
            //update();
        }
    };

})(jQuery);
/* global jQuery */
(function ($) {
    "use strict";

    $.formbuilder.menucontrol["font-color-picker"] = {
        options: {
            name: ["color"],
            value: "#333333",
        },
        type: "colorpicker",
        target: "control",
        property: true
    };

})(jQuery);
/* global jQuery */
(function ($) {
    "use strict";

    $.formbuilder.menucontrol["font-color"] = {
        options: {
            name: ["color"],
            value: ["#333333"],
            image: "color.png",
            text: "color"
        },
        type: "button",
        target: "control",
        property: true,
        fn: function (callback) {
            callback();
        }
    };

})(jQuery);
/* global jQuery */
(function ($) {
    "use strict";

    $.formbuilder.menucontrol["font-family"] = {
        options: {
            name: "font-family",
            value: {
                text: "微软雅黑",
                value: "微软雅黑"
            },
            items: $.formbuilder["FONT-FAMILY"],
            readonly: false,
            width: 70
        },
        type: "combox",
        target: "control",
        property: true
    };
})(jQuery);

/* global jQuery */
(function($) {
    "use strict";

    $.formbuilder.menucontrol["font-size"] = {
        options: {
            name: "font-size",
            value: {
                text: 12,
                value: 12
            },
            items: $.formbuilder["FONT-SIZE"],
            readonly: false,
            width: 22
        },
        type: "combox",
        target: "control",
        property: true
    };
})(jQuery);

/* global jQuery */
(function ($) {
    "use strict";

    $.formbuilder.menucontrol["font-style-italic"] = {
        options: {
            name: "font-style-italic",
            value: false,
            text: "font-style-italic",
            image: "font-style-italic.png"
        },
        type: "button",
        target: "control",
        property: true
    };

})(jQuery);

/* global jQuery */
(function ($) {
    "use strict";

    $.formbuilder.menucontrol["font-weight"] = {
        options: {
            name: "font-weight",
            value: false,
            text: "font-weight",
            image: "font-weight.png"
        },
        type: "button",
        target: "control",
        property: true
    };

})(jQuery);

/* global jQuery */
(function ($) {
    "use strict";

    $.formbuilder.menucontrol["merge-cells"] = {
        options: {
            name: null,
            value: false,
            text: "merge",
            image: "merge-cells.png"
        },
        type: "button",
        target: "cell",
        property: false,
        fn: function (elems, grid) {
            grid.mergeCells(elems);
        }
    };

})(jQuery);

/* global jQuery */
(function ($) {
    "use strict";

    $.formbuilder.menucontrol["paste-control"] = {
        options: {
            name: null,
            value: false,
            text: "paste",
            image: "paste.png"
        },
        type: "button",
        target: "cell",
        property: false,
        fn: function ($elem, grid) {
            grid.pasteControls();
        }
    };

})(jQuery);

/* global jQuery */
(function($) {
    "use strict";
    $.formbuilder.menucontrol["remove-controls"] = {
        options: {
            name: null,
            value: false,
            text: "remove",
            image: "remove.png"
        },
        type: "button",
        target: "control",
        property: false,
        fn: function($elems, grid) {
            grid.removeControls();
        }
    };
})(jQuery);

/* global jQuery */
(function ($) {
    "use strict";

    $.formbuilder.menucontrol["text-align-center"] = {
        options: {
            name: "text-align",
            value: "center",
            text: "align-center",
            image: "text-align-center.png"
        },
        type: "button",
        target: "control",
        property: true
    };

})(jQuery);

/* global jQuery */
(function ($) {
    "use strict";

    $.formbuilder.menucontrol["text-align-left"] = {
        options: {
            name: "text-align",
            value: "left",
            text: "align-left",
            image: "text-align-left.png"
        },
        type: "button",
        target: "control",
        property: true
    };

})(jQuery);

/* global jQuery */
(function ($) {
    "use strict";

    $.formbuilder.menucontrol["text-align-right"] = {
        options: {
            name: "text-align",
            value: "right",
            text: "align-right",
            image: "text-align-right.png"
        },
        type: "button",
        target: "control",
        property: true
    };

})(jQuery);

/* global jQuery */
(function ($) {
    "use strict";

    $.formbuilder.menucontrol["text-align"] = {
        options: {
            name: "text-align",
            value: "left",
            text: "align-left",
            image: "text-align-left.png"
        },
        type: "button",
        target: "control",
        property: true,
        keepSubmenu: true
    };

})(jQuery);

/* global jQuery */
(function ($) {
    "use strict";

    $.formbuilder.menucontrol["text-decoration-underline"] = {
        options: {
            name: "text-decoration-underline",
            value: false,
            text: "text-decoration-underline",
            image: "text-decoration-underline.png"
        },
        type: "button",
        target: "control",
        property: true
    };

})(jQuery);

/* global jQuery */
(function ($) {
    "use strict";

    $.formbuilder.menucontrol["vertical-align-bottom"] = {
        options: {
            name: "vertical-align",
            value: "bottom",
            text: "vertical-align-bottom",
            image: "vertical-align-bottom.png",
            selectValue: false,
            cancelValue: false
        },
        type: "button",
        target: "control",
        property: true
    };

})(jQuery);

/* global jQuery */
(function ($) {
    "use strict";

    $.formbuilder.menucontrol["vertical-align-middle"] = {
        options: {
            name: "vertical-align",
            value: "middle",
            text: "vertical-align-middle",
            image: "vertical-align-middle.png",
            selectValue:false,
            cancelValue: false
        },
        type: "button",
        target: "control",
        property: true
    };

})(jQuery);

/* global jQuery */
(function ($) {
    "use strict";

    $.formbuilder.menucontrol["vertical-align-top"] = {
        options: {
            name: "vertical-align",
            value: "top",
            text: "vertical-align-top",
            image: "vertical-align-top.png",
            selectValue: false,
            cancelValue: false
        },
        type: "button",
        target: "control",
        property: true
    };

})(jQuery);

/* global jQuery */
(function ($) {
    "use strict";

    $.formbuilder.menucontrol["vertical-align"] = {
        options: {
            name: "vertical-align",
            value: "top",
            text: "vertical-align-top",
            image: "vertical-align-top.png"
        },
        type: "button",
        target: "control",
        property: true,
        keepSubmenu: true
    };

})(jQuery);

/* global jQuery */

(function ($, window) {
    "use strict";

    $.formbuilder = $.formbuilder || {};

    /**
     * @class Config
     * @alias Config
     * @static
     * @description 全局初始化配置参数
     * @static
     * @type {object}
     * @property {Data}  data  - 加载的数据.
     * @property {string}  [pattern='desing'|'applying'|'view']  - 工作模式:设计、填报、浏览
     * @property {string}  [language='zh-CN'|'en']  - 加载的数据.
     * @property {object<string,ToolBox>}  toolbox  - 工具箱元件配置.
     * @property {Config-Control}  control  - 工具箱加载配置.
     * @property {Config-Menu}  menu  - 工具箱加载配置.
     *
     */
    $.formbuilder.config = {
        _height: 450,
        data: {},
        pattern: "design",
        language: "zh-CN",
        toolbox: {},
        /**
         * @class
         * @description 工具箱元件配置
         * @alias Config-Control
         * @type {object}
         * */
        control: {
            /**
             * @description 是否显示标签
             * @memberof  Config-Control
             * @type {bool}
             * @instance
             * @default false
             * */
            showLabel: false,
            expandImage: "expand.png",
            collapseImage: "collapse.png",
            /**
             * @description 工具栏元件排序显示
             * @memberof  Config-Control
             * @instance
             * @type {string[]}
             * @default
             * */
            order: [
              "label",
              "textbox",
              "hidden",
              "textarea",
              "date",
              "time",
              "button",
              "select",
              "textvalue",
              "radiogroup",
              "checkboxgroup",
              "image",
              "file",
              "link",
              "multipleselectlabel"
            ]
        },
        menu: {
            order: [
              ["merge-cells", "cancel-merge-cells"],
              ["cut-control", "copy-control", "paste-control", "remove-controls"],
              ["font-family", "font-size"],
              [
                "font-weight",
                "font-style-italic",
                "text-decoration-underline",
                {
                    name: "font-color-display",
                    children: ["font-color-picker"]
                },
                {
                    name: "cell-background-color-display",
                    children: ["cell-background-color-picker"]
                },
                {
                    name: "cell-border-color-display",
                    children: ["cell-border-color-picker"]
                }
              ],
              [
                {
                    name: "align",
                    children: ["align-left", "align-center", "align-right"]
                },
                {
                    name: "vertical-align",
                    children: ["vertical-align-top", "vertical-align-middle", "vertical-align-bottom"]
                },
                {
                    name: "text-align",
                    children: ["text-align-left", "text-align-center", "text-align-right"]
                }
              ],
              {
                  name: "cell-border-style",
                  children: ["cell-border-solid", "cell-border-none", "cell-border-solid-heavy"]
              },
              {
                  name: "add-image",
                  children: []
              }
            ],
            type: "concat"// concat replace
        },
        url: {
            images: "src/images/",
            imageupload: "please-replace-image-upload-server-url-in-config",
            fileupload: "please-replace-file-upload-server-url-in-config"
        },
        shortcutKey: {
            order: ["cut", "copy", "paste"]
        },
        contextmenu: {
            order: [
              "cut",
              "copy",
              "paste",
              "remove",
              "merge",
              "canel-merge",
              "insert-row",
              "insert-column",
              "remove-row",
              "remove-column"
            ]
        },
        events: {
            // updateDatasets: function (id, rows) {
            //   console.dir(rows);
            // }
            updateDatasets:null
        },
        paging: false,
        verification: true,
        autoResize:true,
        autoFitFullScreen: true
    };
})(jQuery, window);

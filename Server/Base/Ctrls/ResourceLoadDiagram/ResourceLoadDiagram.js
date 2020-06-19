HoteamUI.Control.OResourceLoadDiagram = {
    Create: function (options) {
        options = options || {};
        var self = this;
        var parentId = this.id;
        var id = this.id + "_ResourceLoadDiagram";
        var controlInfo = (options.controlInfo || this.ControlInfo());
        var ctrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions;
        var opt = $.extend(true, {}, $.hoteamEditGrid.defaults);
        opt.containerid = options.containerid;
        opt.ctrlEvent = {};
        opt.ctrlEvent.o = this;
        opt.parentId = parentId;
        opt.id = id;

        var grid = $('<div id="' + id + '"></div>').appendTo("#" + parentId);

        grid.data('opt', opt);

        var gridOptions = {
            //26604 李金岳
            autoResize: false,
            inserting: false,
            editing: false,
            sorting: false,
            filtering: false,
            paging: false,
            selecting: false,
            //defaultField: {
            //    fieldType: {
            //        'stacklevebar': {
            //            width: 40,
            //            level: [{
            //                color: '#2AB452',
            //                min: 0,
            //                max: 8,
            //                line: '#F9CC9D'
            //            }, {
            //                color: '#DB3E3E',
            //                min: 8,
            //                max: 24
            //            }]
            //        }
            //    }
            //},
            language: 'zh'
        }

        for (var i = 0; i < controlInfo.PageHandlers.length; i++) {
            var item = controlInfo.PageHandlers[i];
            switch (item.HandlerName) {
                case "OnRowClick":
                    //opt.handlers.OnRowClick = this.GetEventFunctionName("OnRowClick");
                    gridOptions.rowClick = function (field, rowIndex, row) {
                        var fn = self.GetEventFunctionName("OnRowClick");
                        HoteamUI.Common.ExeFunction(fn, {
                            o: self,
                            field: field,
                            rowIndex: rowIndex,
                            row: row
                        });
                    }
                    break;
                default: break;
            }
        };


        grid.hqGrid(gridOptions);
    },

    LoadColTitle: function (fields) {
        var grid = this.GetGrid();
        grid.hqGrid('fields', fields);
        var opt = grid.data('opt');
    },

    LoadGridRows: function (data) {
        var grid = this.GetGrid();
        grid.hqGrid('data', data);
    },

    ResetGrid: function (opt) {
        var grid = this.GetGrid();
        grid.hqGrid('reset', opt);
    },
    //重置大小
    Resize: function () {
        var grid = this.GetGrid();
        grid.hqGrid('resize');
    },
    //删除列设置弹框和查询弹框
    Dispose: function () {
        var grid = this.GetGrid();
        grid.hqGrid('destroy');
    },
    //获取id
    GetId: function () {
        return this.id + "_ResourceLoadDiagram";
    },
    GetGrid: function () {
        var id = this.GetId();
        var grid = $('#' + id);
        return grid;
    }
};
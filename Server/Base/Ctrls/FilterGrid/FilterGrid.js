HoteamUI.Control.OFilterEditGrid = {
    Create: function (options) {
        options = options || {};
        var self = this;
        var parentId = this.id;
        var id = this.id + "_FilterEditGrid";
        var ctrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions;
        var opt = $.extend(true, {}, $.hoteamEditGrid.defaults);
        opt.containerid = options.containerid;
        opt.ctrlEvent = {};
        opt.ctrlEvent.o = this;
        opt.parentId = parentId;
        opt.id = id;

        var handlers = (options.controlInfo || this.ControlInfo()).PageHandlers;

        for (var i = 0; i < handlers.length; i++) {
            var item = handlers[i];
            switch (item.HandlerName) {
                case "OnLoadRows":
                    opt.handlers.OnLoadRows = this.GetEventFunctionName("OnLoadRows");
                    break;
                default: break;
            }
        }

        var grid = $('<div id="' + id + '"></div>').appendTo("#" + parentId);

        grid.data('opt', opt);
        grid.hqGrid({
            autoload: false,
            autoResize: false,
            data: function () {
                var ctrlEvent = opt.ctrlEvent;
                HoteamUI.Common.ExeFunction(opt.handlers.OnLoadRows, opt.ctrlEvent);
            }
        });
    },

    LoadColTitle: function (titleOptions) {
        var fields = titleOptions.data.Fields,
            field;

        for (var i = 0, len = fields.length; i < len; i++) {
            field = fields[i];
            if (field.width === -1) {
                field.width = 'auto';
            } else if (field.width === 0 || field.type === 'hidden') {
                field.hidden = true;
            }

            field.editable = field.Editable;

            //if (field.index === -1) {
            //    field.index = null;
            //}
        }
        var grid = this.GetGrid();
        grid.hqGrid('fields', fields);
        var opt = grid.data('opt');
        HoteamUI.Common.ExeFunction(opt.handlers.OnLoadRows, opt.ctrlEvent);
    },

    LoadGridRows: function (data, count) {
        var grid = this.GetGrid();
        data = JSON.parse(data);
        count = data.recordsTotal;
        data = data.rows;
        grid.hqGrid('data', data, count);
    },

    ResetGrid: function (opt) {
        var grid = this.GetGrid();
        grid.hqGrid('reset', opt);
    },
    //清空数据
    ClearGridRows: function () {
        // return $.hoteamEditGrid.loadRowData(this.GetId(), [], 0);
    },
    SaveGridRows: function () {
        var grid = this.GetGrid();
        grid.hqGrid('save');
    },
    //获取当前选中行信息
    GetSelectedRows: function () {
        var result = [],
            temp;

        var id = this.GetId();
        var grid = $('#' + id);
        temp = grid.hqGrid('selected');

        if (temp instanceof Object) {
            for (var i in temp) {
                result.push(temp[i]);
            }
        } else {
            result = temp;
        }

        return result;
    },
    //设置选中行
    SetSelectedRow: function (rowNums) {
        var id = this.GetId();
        var grid = $('#' + id);
        return grid.hqGrid('selected', rowNums);
    },
    //设置选中所有
    SetSelectAll: function () {

    },
    //设置取消所有选中
    UnSelectAll: function () {

    },
    AddGridRow: function () {

    },
    DeleteGridRow: function () {

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
        return this.id + "_FilterEditGrid";
    },
    GetPagerInfo: function () {
        var grid = this.GetGrid();
        var info = grid.hqGrid('paging');

        return {
            SortName: null,
            SortOrder: null,
            CurrentPager: info.pageIndex,
            RowNumber: info.pageCount
        };
    },
    SetPagerInfo: function (pageInfo) {
        var grid = this.GetGrid();
        var info = {};
        if (pageInfo.CurrentPager) {
            info.pageIndex = pageInfo.CurrentPager;
        };
        grid.hqGrid('paging', info.pageIndex);
    },
    GetGrid: function () {
        var id = this.GetId();
        var grid = $('#' + id);
        return grid;
    }
};

(function ($) {
    var render = $.hqGrid._Render;

    render.icon.valueTransform = function (item) {
        if (item && item.value) {
            return item.value.replace("~", PageInit.WebRootPath);
        }
        return item;
    };

    render.image = render.icon;
    render.dropdown = render.select;
    render.stacklevebar = render.stacklevelbar;

})($);

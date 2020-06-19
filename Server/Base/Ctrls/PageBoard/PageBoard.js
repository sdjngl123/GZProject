HoteamUI.Control.OPageBoard = {
    Create: function (options) {
        options = options || {};
        var ctrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions;

        $("#" + this.id).board({
            render: {
                //绘制图形
                canvas: function (elem, item) {
                    var guid = HoteamUI.UIManager.NewGUID();
                    var div = elem;
                    $(div).attr("id", guid).attr("name", item.name);
                    HoteamUI.UIManager.Show(guid, item.pageName, item.pageParas);
                },
                resize: function (elem, item) {
                    //TODO 补充一下完成个子页面的大小重置
                    var id = $(elem).children().attr('id');
                    HoteamUI.Control.Instance(id).Resize();
                }
            },
            layout: [],
            resize: false
        })
    },
    LoadPages: function (layout) {
        $("#" + this.id).board('load', layout);
    },
    // ResetPageBoard: function (setting) {
    //     var o = $("#" + this.id).data("o");
    //     o.setting = setting;
    //     $.hoteamPageBoard.extendData(o);
    //     $.hoteamPageBoard.loadPages(o);
    // },
    GetPageId: function (id) {
        var elem = $("#" + this.id).board('getCanvasContent', id);
        return elem.attr('id');
    },
    // GetId: function () {
    //     return this.id + "_PageBoard";
    // },
    Resize: function () {
        $("#" + this.id).board('resize');
    }
};
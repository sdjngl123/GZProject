HoteamUI.Control.OMenuToolbar = {
    Create: function (options) {
        options = options || {};
        var self = this;
        var parentId = this.id;
        var id = this.id + "_Menu";
        //设置参数
        var CtrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions;
        //获取菜单列表信息
        //$.each(CtrlOptions, function (index, item) {
        //    if (index.indexOf("item") > -1) {
        //        menuItems.push(item);
        //    }
        //});
        var o = {};
        o.parentId = parentId;
        o.id = id;
        //事件参数
        var handlers = (options.controlInfo || this.ControlInfo()).PageHandlers;
        var object = {};
        object.o = HoteamUI.Control.Instance(parentId);
        $.each(handlers, function (index, val) {
            if (val.HandlerName == "OnClick") {
                object.onclick = self.GetEventFunctionName("OnClick");
            }
        });

        var menubar = $("<div id='" + this.id + "_Menu' />");
        menubar.data("opt", object);
        $("#" + this.id).append(menubar);
    },
    LoadItems: function (data) {

        var id = this.id + "_Menu",
            settings = {
                onclick: null,
                items: [],
                autoLayout:false
            },
            items = settings.items;

        settings.onclick = function (text, value, other) {
            var opt = $("#" + id).data("opt"),
                onclick = opt.onclick,
                obj = opt.object,
                ctrlEvent;

            onclick = other || onclick;

            if (onclick) {
                opt.text = text;
                opt.value = value;
                ctrlEvent = opt;
                if (typeof window[onclick] === 'function') {

                    HoteamUI.Common.ExeFunction(onclick, opt);
                }
                else {
                    eval(onclick);
                }

            }

        }
        this.ParseItems(data, items);


        $("#" + id).menubar(settings);

    },
    ParseItems: function (data, menuItems) {

        if (data && data.length > 0) {
            for (var i = 0, len = data.length; i < len; i++) {
                var item = data[i],
                    menuItem = {};

                menuItem = {
                    text: (item.Text || HoteamUI.Language.Lang(item.TextId)),
                    value: item.Value,
                    style: (item.MenuSize || 'small').toLocaleString(),
                    icon: {
                        sprite: {
                            'default': {
                                small: '',
                                big: ''
                            },
                            hover: {
                                small: '',
                                big: ''
                            }
                        },
                        url: {
                            'default': {
                                small: '',
                                big: ''
                            },
                            hover: {
                                small: '',
                                big: ''
                            }
                        }
                    },
                    other: item.Script,
                    children: []
                }

                if (item.Icon) {
                    if (item.Icon.indexOf("~") === -1) {
                        menuItem.icon.sprite['default'].small = HoteamUI.Common.GetImage(item.Icon, 16);
                        menuItem.icon.sprite['default'].big = HoteamUI.Common.GetImage(item.Icon, 24);
                        menuItem.icon.sprite['hover'].small = HoteamUI.Common.GetImage(item.Icon, 16, 2);
                        menuItem.icon.sprite['hover'].big = HoteamUI.Common.GetImage(item.Icon, 24, 2);
                        delete menuItem.icon.url;
                    }
                    else {
                        menuItem.icon.url['default'].small = item.Icon.replace("~", PageInit.WebRootPath);
                        menuItem.icon.url['default'].big = item.Icon.replace("~", PageInit.WebRootPath);
                    }
                }

                menuItems.push(menuItem);

                if (item.Children && item.Children.length) {
                    this.ParseItems(item.Children, menuItem.children);
                }
            }
        }
    },
    Resize: function () {
        var id = this.id + "_Menu";
        $("#" + id).menubar('layout');
    },
    Dispose: function () {
        var id = this.id + "_Menu";
        $("#" + id).menubar('destroy');
    }
};
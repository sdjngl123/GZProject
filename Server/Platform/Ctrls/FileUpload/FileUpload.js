HoteamUI.Control.OFileUpload = {
    Create: function (options) {
        var self = this;
        options = options || {};
        //设置参数
        var parentId = this.id;
        var id = this.id + "_FileUpload";
        var CtrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions;
        var o = $.extend(true, {}, $.hoteamFileUpload.defaults, CtrlOptions);
        o.parentId = parentId;
        o.id = id;

        o.autofit = options.autofit;
        //事件参数
        var handlers = (options.controlInfo || this.ControlInfo()).PageHandlers;
        o.event = {};
        o.event.hoteamCtrl = this;

        o.uploadUrl = PageInit.WebRootPath + "/Base/BaseHandler.ashx?type=uploadFileToIIS&uploadPath=../Files/";
        //o.uploadUrl = PageInit.WebRootPath + "/Base/BaseHandler.ashx?type=uploadFileToIIS&fileSupport=*&uploadPath=../Files/";
        o.deleteUrl = PageInit.WebRootPath + "/Base/BaseHandler.ashx?type=deleteFile&filePath="
        $.each(handlers, function (index, val) {
            if (val.HandlerName == "OnUpload") {
                o.onUpload = self.GetEventFunctionName("OnUpload");
            }
            else if (val.HandlerName == "OnDelete") {
                o.onDelete = self.GetEventFunctionName("OnDelete");
            }
        });
        $.hoteamFileUpload.create($("#" + o.parentId), o);
    },
    LoadFiles: function (items) {
        var $container = $("#" + this.id);
        $.hoteamFileUpload.loadItems($container, items);
        $.hoteamFileUpload.setValue($container, items);
    },
    GetFiles: function () {
        var $container = $("#" + this.id);
        return $.hoteamFileUpload.getValue($container);
    },
    Disable: function () {
        var select = "#" + this.id;
        $.hoteamFileUpload.disable(select);
    },
    Enable: function () {
        var select = "#" + this.id;
        $.hoteamFileUpload.enable(select);
    }
};

{
    (function ($) {
        $.hoteamFileUpload = {
            defaults: {
                uploadText: HoteamUI.Language.Lang("Common", "Upload"),
                deleteText: HoteamUI.Language.Lang("Common", "Delete"),
                "icon": "file.png",
                "uploadUrl": "",
                "deleteUrl": "",
                "deleteParams": {},
                "onUpload": function () { },
                "onDelete": function () { }
            },
            create: function ($container, options) {
                var text = this.defaults.uploadText,
                    id = options.id,
                    $elem;

                $elem = $([
                    "<div class='", this.className.container, "'>",
                    "   <a class='", this.className["file-button-upload"], "' ", "title=\"", text, "\">",
                    "       ", this.createImage(),
                    "       ", "<span>", text, "</span>",
                    "       ", "<input type=\"file\" >",
                    "   </a>",
                    "   ", this["createList"](this.options.items),
                    "</div>"
                ].join(""));

                this.bindEvent($elem, $container, options);

                $container.append($elem);
                this.setValue($container, this.options.items);
            },
            createImage: function () {
                var src = "../Platform/Ctrls/FileUpload/images/file-upload.png";
                return ["<img class='", this.className["img"], "' ", "src='", src, "'", " />"].join("");
            },
            createList: function (items) {
                var html;

                html = [
                    "<div class='", this.className.list, "'>",
                    this.createItems(items),
                    "</div>"
                ].join("");

                return html;
            },
            loadItems: function ($container, items) {
                $container.find("." + this.className.list).html(this.createItems(items));
            },
            createItems: function (items) {
                var html = [],
                    self = this;
                if (items && typeof (items) == "string") {
                    //var re = new RegExp("\\\\", "g");
                    //items = items.replace(re,'');
                    items = JSON.parse(items || null);
                };

                if (items && items.length > 0) {
                    _.forEach(items, function (item) {
                        html.push([
                            "<div class='", self.className["list-item"], "'>",
                            "   <span>", "<img src='", item.icon || "../Platform/Ctrls/FileUpload/images/file-upload.png", "' />", "</span>",
                            "   <span class='", self.className["list-item-name"], "'", ">",
                            "       <a title='", item.name, "'", "href='", item.src, "' ", "target=\"_blank\"", ">", item.name, "</a>",
                            "   </span>",
                            "   <span>", item.size, "</span>",
                            ["   <span class='", self.className["list-item-button-delete"], "'>", self.defaults.deleteText, "</span>"].join(""),
                            "</div>"
                        ].join(""));
                    });
                }

                return html.join("");
            },
            bindEvent: function ($elem, $contaienr, options) {
                var self = this;
                //上传按钮
                $elem.find("input[type=\"file\"]").fileupload({
                    url: options.uploadUrl,
                    done: function (e, data) {
                        var result = JSON.parse(data.result || null) || [],
                            items = self.getValue($contaienr) || [],
                            html;

                        if (_.isArray(result)) {
                            html = self["createItems"](result, true);
                            $elem.find("." + self.className.list).append(html);
                            items.push(result)
                            items = _.flatten(items);
                            self.setValue($contaienr, items);

                            if (typeof options.onUpload === "function") {
                                try {
                                    options.onUpload.call(self, result);
                                }
                                catch (e) {
                                    // eslint-disable-next-line no-console
                                    console.error("formbuilder file onUpload function error!");
                                }
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
                        items = self.getValue($contaienr),
                        item = items[index],
                        params = $.extend(true, {}, options.deleteParams || {}, { id: item.id });

                    $.post(options.deleteUrl + item.src, params, function (data) {
                        // eslint-disable-next-line no-console
                        console.warn("formbuilder file delete success");
                        $item.remove();
                        _.remove(items, function (o, i) {
                            return i === index;
                        });
                        self.setValue($contaienr, items);

                        if (typeof options.onDelete === "function") {
                            try {
                                options.onDelete.call(self, item);
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
            getValue: function ($container) {
                return $container.data("items");
            },
            setValue: function ($container, items) {
                if (typeof (items) == "string") {
                    items = JSON.parse(items || null);
                }
                $container.data("items", items);
            },
            disable: function (element) {
                element.parent().css("position", "relative");
                var html = '<div style="width:100%;height:100%;position:absolute;top:0;left:0;cursor:no-drop;z-index:9999;"></div>';
                element.parent().append(html);
            },
            enable: function (element) {
                element.next("div").remove();
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
                value: [],
                width: "100%"
            }
        }
    })(jQuery);
}
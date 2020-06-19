(function ($) {

    $.fn.htFileUpload = function (options) {
        return this.each(function () {
            var _opt = $.extend(true, {
                language: "zhs",
                i18n: {
                    "zhs": {
                        buttonText: "上传",
                        deleteText: "删除",
                    },
                    "en": {
                        buttonText: "upload",
                        deleteText: "delete",
                    }
                },
                data: [],
                readOnly: false,
                convertItem: function (item) {
                    return item;
                },
                convertImage: function (src) {
                    return src;
                },
                onUpload: function () { },
                onUploadSuccess: function (result) { },
                onUploadError: function (message) { },
                onDelete: function (item) { }
            }, options),
                elem = $(this),
                template = {
                    button: function (options) {
                        var html,
                            buttonText = _opt.i18n[_opt.language].buttonText;

                        html = [
                            "<div class='ht-file-upload-button'>",
                            "   <span class='ht-file-upload-button-upload-image'></span> ",
                            "   <span class='ht-file-upload-button-text' title='", buttonText, "'>", buttonText, "</span>",
                            "</div>"
                        ].join("");

                        return html;
                    },
                    listItem: function (options) {
                        var image = options.image,
                            text = options.text,
                            size = options.size,
                            src = typeof _opt.convertImage === "function" ? _opt.convertImage(options.src) : options.src,
                            html,
                            deleteText = _opt.i18n[_opt.language].deleteText,
                            readyOnly = _opt.readOnly;

                        html = [
                            "<div class='ht-file-upload-list-item'>",
                            "   <div class='ht-file-upload-list-item-image'>",
                            "       <img src='", image, "' />",
                            "   </div>",
                            "   <div class='ht-file-upload-list-item-text'>",
                            "       <a href='", src, "'>", text, "</a>",
                            "   </div>",
                            "   <div class='ht-file-upload-list-item-size'>", size, "</div>",
                            "   <div class='ht-file-upload-list-item-delete'>",
                            "       <span>", deleteText, "</span>",
                            "   </div>",
                            "</div>"
                        ].join("");

                        return html;
                    },
                    lists: function (items) {
                        var item,
                            html = [];

                        html.push("<div class='ht-file-upload-list'>");
                        if (items && items.length) {
                            for (var i = 0, len = items.length; i < len; i++) {
                                item = items[i];
                                html.push(template.listItem(item));
                            }
                        }
                        html.push("</div>");

                        return html.join("");
                    },
                    render: function (items) {
                        return [
                            "<div class='ht-file-upload ", !_opt.readOnly ? "" : "ht-file-upload-readOnly", "'>",
                            _opt.readOnly === true ? "" : template.button(),
                            template.lists(items),
                            "</div>"
                        ].join("");
                    }
                };

            _opt.data = _opt.data || [];
            $(this).data("data", _opt.data);

            elem.append(template.render(options.data));
            if (!_opt.readOnly === true) {
                elem.find(".ht-file-upload-button").on("click", function (e) {
                    var onUploadSuccess = function (result) {
                        if (result && result instanceof Array) {
                            for (var i = 0, len = result.length; i < len; i++) {
                                var item = result[i];
                                if (item) {
                                    if (typeof _opt.convertItem === "function") {
                                        item = _opt.convertItem(item);
                                    }
                                    elem.find(".ht-file-upload-list").append($(template.listItem(item)));
                                    _opt.data.push(item);
                                }
                            }

                        }

                        if (typeof _opt.onUploadSuccess === "function") {
                            _opt.onUploadSuccess(result);
                        }
                    },
                        onUploadError = function (message) {
                            if (typeof _opt.onUploadError === "function") {
                                _opt.onUploadError(message);
                            }
                        };

                    if (typeof _opt.onUpload === "function") {
                        _opt.onUpload(onUploadSuccess, onUploadError);
                    }
                });

                elem.find(".ht-file-upload-list").on("click", ".ht-file-upload-list-item-delete", function (e) {
                    var $elem = $(this).closest(".ht-file-upload-list-item"),
                        index = $elem.index(),
                        data = _opt.data,
                        item;

                    try {
                        item = data[index];
                        if (typeof _opt.onDelete === "function") {
                            _opt.onDelete(item);
                        }
                        data.splice(index, 1);
                        $elem.remove();
                    }
                    catch (e) {
                        throw e;
                    }

                });
            }
        });

    };

    $.fn.getHtFileUploadData = function () {
        return this.data("data");
    }

}(jQuery));
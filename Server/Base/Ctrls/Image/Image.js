HoteamUI.Control.OImage = {
    Create: function (options) {
        options = options || {};
        //设置参数
        var parentId = this.id,
            id = this.id + "_Image",
            self = this,
            ctrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions,
            ctrldata = { "initOptions": ctrlOptions },
            parentContainer = $("#" + parentId);

        var border = ctrlOptions.border == "true" || ctrlOptions.border == true ? "style='border:1px solid #ccc;'" : "";
        var imageClass = "hoteam-ctrl-image-container";
        if (ctrlOptions.type === "icon") {
            imageClass += " hoteam-ctrl-icon-container";
        }
        parentContainer.append("<div class='" + imageClass + "'><div " + border + " ><img num='0' class='hoteam-ctrl-image hoteam-ctrl-image-show' id='" + id + "' alt='' /></div></div>");

        var image;
        image = ctrldata.element = $("#" + id);
        if (ctrlOptions && ctrlOptions.src) {
            //处理src，src是使用多个分号来分割的字符串
            var srcArr = ctrlOptions.src.split(';');
            if (!srcArr[srcArr.length - 1]) {
                srcArr.pop();
            }
            //image.attr("src", srcArr[0].replace("~", PageInit.WebRootPath)).parent().data("src", srcArr);
            image.attr("src", $.hoteamImage.getImage(srcArr[0])).parent().data("src", srcArr);

        } else {
            image.parent().data("src", []);
            image.hide();
        }
        image.data('option', ctrlOptions);
        image.attr("data-type", ctrlOptions.type);

        //19500 李金岳
        if (!(options.isAutoZoom === false)) {
            $.hoteamImage.autoZoom(image, ctrlOptions.position);
        }

        //增加图片悬浮事件
        $.hoteamImage.handlers.onMouseEnter(ctrldata);
        //事件参数
        var handlers = (options.controlInfo || this.ControlInfo()).PageHandlers;

        var hoteamCtrl = HoteamUI.Control.Instance(parentId);

        //19500 李金岳
        hoteamCtrl.isAutoZoom = options.isAutoZoom;

        $.each(handlers, function (index, val) {
            if (val.HandlerName == "OnClick") {
                $("#" + parentId).click(function () {
                    HoteamUI.Common.ExeFunction(self.GetEventFunctionName("OnClick"), { o: hoteamCtrl });
                });
            }
        });
    },
    Resize: function () {
        var id = this.id + "_Image",
            option = $('#' + this.GetId()).data('option') || {};

        $.hoteamImage.autoZoom($("#" + id), option.position);
    },
    SetSrc: function (src, isAutoZoom) {
        src = (src ? src : "");
        var id = this.id + "_Image",
            img = $("#" + id),
            srcArr = src.split(';'),
            option = $('#' + this.GetId()).data('option') || {};

        img.show();
        //首先判断srcArr的长度；如果是大于1则全部替换，如果是1，只替换当前展示的图片
        if (srcArr.length > 1) {
            img.attr("num", "0").attr("src", $.hoteamImage.getImage(srcArr[0])).parent().data("src", srcArr);
        } else if (srcArr.length == 1) {
            var srcArrBak = img.parent().data("src"),
                num = parseInt(img.attr("num"));
            srcArrBak[num] = srcArr[0];
            img.attr("src", $.hoteamImage.getImage(src));
        } else {
            img.hide();
        }
        if (!(isAutoZoom=== false)) {
            $.hoteamImage.autoZoom(img, option.position);
        }      
    },
    GetSrc: function (src) {
        var id = this.id + "_Image",
            img = $("#" + id),
            srcArr = $(img).parent().data("src");
        return srcArr.join(';');
    },
    GetValue: function () {
        var select = $("#" + this.id + "_Image");
        return $(select).data("fileinfo");
    },
    SetValue: function (value) {
        var select = $("#" + this.id + "_Image");
        $(select).data("fileinfo", value);
    },
    Dispose: function () {

    },
    GetId: function () {
        return this.id + "_Image";
    },
    GetImage: function (img) {
        return $.hoteamImage.getImage(img);
    }
};

{
    (function ($) {
        $.hoteamImage = {
            defaults: {
                //position: "left"
            },
            handlers: {
                onMouseEnter: function (ctrldata) {
                    var image = ctrldata.element;
                    var parEle = image.parent();
                    parEle.on("mouseenter", function () {
                        var par = $(this);
                        var srcArr = par.data("src");
                        if (par.children(".hoteam-ctrl-image-placeholder").length == 0) {
                            par.append('<div class="hoteam-ctrl-image-placeholder"></div>');
                            var preview;
                            //如果不允许预览
                            if (ctrldata.initOptions.preview == false || ctrldata.initOptions.preview == "false") {
                                preview = '';
                            } else {
                                preview = '<span title=' + HoteamUI.Language.Lang("Image", "Preview") + ' class="basesprite b-img-preview"></span>';
                            }
                            par.children(".hoteam-ctrl-image-placeholder").append(preview);
                            //如果有多个图片
                            if (srcArr && srcArr.length > 1) {
                                par.children(".hoteam-ctrl-image-placeholder").append(
                                    '<span title=' + HoteamUI.Language.Lang("Image", "NextImage") + ' class="basesprite b-white-caret-right"></span>' +
                                    '<span title=' + HoteamUI.Language.Lang("Image", "PreviousImage") + ' class="basesprite b-white-caret-left"></span>'
                                );
                            }
                            par.find(".basesprite").click(function () {
                                //如果是预览
                                var basp = $(this);
                                if (basp.hasClass("b-img-preview")) {
                                    $.hoteamImage._previewImg(basp.parent().siblings("img"));
                                } else if (basp.hasClass("b-white-caret-left")) {//如果是上一张图片
                                    changeImg(basp, "prev");
                                } else if ($(this).hasClass("b-white-caret-right")) {//如果是下一张图片
                                    changeImg(basp, "next");
                                }
                                function changeImg(ele, type) {
                                    var caretPar = ele.parent(),
                                        img = caretPar.siblings("img"),
                                        num = img.attr("num"),
                                        srcArr = img.parent().data("src"),
                                        changeNum = type == "prev" ? (parseInt(num) - 1) : (parseInt(num) + 1);
                                    if (changeNum < 0 || changeNum > srcArr.length - 1) {
                                        return;
                                    }
                                    img.attr("src", srcArr[changeNum].replace("~", PageInit.WebRootPath));
                                    if (img[0].naturalHeight) {
                                        $.hoteamImage._autoZoomDefault(img);
                                    } else {//不支持的话，采用另外一个方式设置
                                        $.hoteamImage._autoZoomLessIE9(img);
                                    }
                                    img.attr("num", changeNum);
                                    caretPar.find(".basesprite").show();
                                    if (changeNum == 0) {
                                        caretPar.find(".b-white-caret-left").hide();
                                        caretPar.find(".b-white-caret-left").show();
                                    } else if (changeNum == srcArr.length - 1) {
                                        caretPar.find(".b-white-caret-right").hide();
                                        caretPar.find(".b-white-caret-left").show();
                                    }
                                }
                            });
                        }
                        if (par.find(".basesprite").length > 0) {
                            $(this).children(".hoteam-ctrl-image-placeholder").show();
                        }
                        var showImg = par.find("img"),
                            num = showImg.attr("num");
                        if (num == 0) {
                            par.find(".b-white-caret-left").hide();
                            par.find(".b-white-caret-right").show();
                        } else if (num == srcArr.length - 1) {
                            par.find(".b-white-caret-right").hide();
                            par.find(".b-white-caret-left").show();
                        }
                    }).on("mouseleave", function () {
                        $(this).find(".basesprite").parent().hide();
                    });
                }
            },
            autoZoom: function (img, position) {
                if (!img.attr("src")) {
                    img.hide();
                    return;
                }
                //如果有naturalHeight属性，说明是现代浏览器（支持此属性的浏览器）
                if (img[0].naturalHeight) {
                    this._autoZoomDefault(img, position);
                } else {//不支持的话，采用另外一个方式设置
                    this._autoZoomLessIE9(img, position);
                }
            },
            _autoZoomDefault: function (image, position) {
                var parHeight = image.parent().innerHeight(),
                    parWidth = image.parent().innerWidth();
                this._setImage(image, parHeight, parWidth, image[0].naturalHeight, image[0].naturalWidth);
                this._autoZoomSet(image, position);
            },
            _autoZoomLessIE9: function (image, position) {
                var temp = new Image();
                temp.onload = function () {
                    var naturalHeight = this.height,
                        naturalWidth = this.width,
                        parHeight = image.parent().innerHeight(),
                        parWidth = image.parent().innerWidth();
                    $.hoteamImage._setImage(image, parHeight, parWidth, naturalHeight, naturalWidth);
                    $.hoteamImage._autoZoomSet(image, position);
                }
                temp.src = image.attr("src");
            },
            _setImage: function (image, parHeight, parWidth, naturalHeight, naturalWidth) {
                //分四种情况，1 图片的实际像素没有父元素(不做处理)； 2 只有图片的像素高超出父元素高度 3 只有图片像素宽超出父元素宽度 4 都超出
                if (parWidth >= naturalWidth && parHeight >= naturalHeight) {
                    image.data("bak", {
                        marginLeft: -naturalWidth / 2,
                        marginTop: -naturalHeight / 2,
                        height: naturalHeight,
                        width: naturalWidth
                    });
                } else if (parWidth >= naturalWidth && parHeight <= naturalHeight) {
                    image.data("bak", {
                        height: parHeight,
                        width: (parHeight / naturalHeight) * naturalWidth,
                        marginLeft: -((parHeight / naturalHeight) * naturalWidth) / 2,
                        marginTop: -parHeight / 2
                    });
                } else if (parWidth <= naturalWidth && parHeight >= naturalHeight) {
                    image.data("bak", {
                        height: (parWidth / naturalWidth) * naturalHeight,
                        width: parWidth,
                        marginLeft: -parWidth / 2,
                        marginTop: -((parWidth / naturalWidth) * naturalHeight) / 2
                    });
                } else if (parWidth <= naturalWidth && parHeight <= naturalHeight) {
                    var height = parHeight,
                        width = (parHeight / naturalHeight) * naturalWidth;
                    if (width > parWidth) {
                        width = parWidth;
                        height = (parWidth / naturalWidth) * naturalHeight;
                    }
                    image.data("bak", {
                        height: height,
                        width: width,
                        marginLeft: -width / 2,
                        marginTop: -height / 2
                    });
                }

            },
            _autoZoomSet: function (image, position) {
                var bak = image.data("bak"),
                    type = image.attr("data-type"),
                    container = image.parent(),
                    containerWidth = container.width(),
                    containerHeight = container.height(),
                    css = {
                        height: bak.height,
                        width: bak.width,
                        marginLeft: type !== "icon" ? bak.marginLeft : 0,
                        marginTop: bak.marginTop,
                        top: "50%",
                        left: "50%"
                    };

                if (containerHeight < bak.height) {
                    css.top = 0;
                    css.marginTop = 0;
                }
                if (containerWidth < bak.width) {
                    css.marginLeft = 0;
                    css.left = 0;
                }

                if (position === 'left') {
                    css.left = 0;
                }

                image.css(css);
            },
            //预览图片
            _previewImg: function (img) {
                var num = parseInt(img.attr("num")),
                    parImg = img.parent(),
                    srcArr = parImg.data("src");
                if (srcArr.length == 0) {
                    return;
                }
                var previewDiv = $(
                    '<div class="hoteam-image-preview-c">' +
                    '<div class="hoteam-image-preview-f">' +
                    '<div class="image-preview-top">' +
                    '<span class="basesprite b-img-close"></span>' +
                    '<span class="basesprite b-img-lessen"></span>' +
                    '<span class="basesprite b-img-magnify"></span>' +
                    '</div>' +
                    '<div class="image-preview-left">' +
                    '<span class="basesprite b-img-left"></span>' +
                    '</div>' +
                    '<div class="image-preview-right">' +
                    '<span class="basesprite b-img-right"></span>' +
                    '</div>' +
                    '<div class="hoteam-image-preview-s">' +
                    //'<img num="' + num + '" src="' + srcArr[num].replace("~", PageInit.WebRootPath) + '"/>' +
                    '<img num="' + num + '" src="' + this.getImage(srcArr[num]) + '"/>' +
                    '</div>' +
                    '</div>' +
                    '</div>').data("src", srcArr);
                $("body").append(previewDiv.css("height", $(window).height()));
                //计算图片高度，并重新设定位置
                var img = $(".hoteam-image-preview-c").find("img");
                //如果有naturalHeight属性，说明是现代浏览器（支持此属性的浏览器）
                if (img[0].naturalHeight) {
                    this._autoZoomDefault(img);
                } else {//不支持的话，采用另外一个方式设置
                    this._autoZoomLessIE9(img);
                }
                //绑定事件
                this._initPreviewHanlder(previewDiv);
                //控制上一个下一个的显示和隐藏
                this._setArrowStatus(previewDiv, img);
                if (!img.attr("src")) {
                    img.hide();
                }
            },
            _setArrowStatus: function (previewDiv, img) {
                var num = parseInt(img.attr("num")),
                    srcArr = previewDiv.data("src");
                previewDiv.find(".basesprite").show();
                if (num == 0) {
                    previewDiv.find(".b-img-left").hide();
                }
                if (num == srcArr.length - 1) {
                    previewDiv.find(".b-img-right").hide();
                }
            },
            _initPreviewHanlder: function (previewDiv) {
                var me = this;
                previewDiv.on("click", ".basesprite", function () {
                    if ($(this).hasClass("b-img-left")) {//上一张
                        changeImg(previewDiv, $(this), "prev");
                    } else if ($(this).hasClass("b-img-right")) {
                        changeImg(previewDiv, $(this), "next");
                    } else if ($(this).hasClass("b-img-close")) {
                        previewDiv.remove();
                    } else if ($(this).hasClass("b-img-magnify")) {
                        var img = $(this).closest(".hoteam-image-preview-c").find("img"),
                            width = img.width(),
                            height = img.height();
                        var newWidth = width * 1.5,
                            newHeight = height * 1.5;
                        img.data("bak", {
                            marginLeft: -newWidth / 2,
                            marginTop: -newHeight / 2,
                            height: newHeight,
                            width: newWidth
                        });
                        //me._setImage(img, parEle.innerHeight(), parEle.innerWidth(), newHeight, newWidth);
                        me._autoZoomSet(img);
                    } else if ($(this).hasClass("b-img-lessen")) {
                        var img = $(this).closest(".hoteam-image-preview-c").find("img"),
                            width = img.width(),
                            height = img.height();
                        var newWidth = width / 1.5,
                            newHeight = height / 1.5;
                        img.data("bak", {
                            marginLeft: -newWidth / 2,
                            marginTop: -newHeight / 2,
                            height: newHeight,
                            width: newWidth
                        });
                        //me._setImage(img, parEle.innerHeight(), parEle.innerWidth(), newHeight, newWidth);
                        me._autoZoomSet(img);
                    }
                    function changeImg(previewDiv, ele, type) {
                        var img = ele.parent().siblings().children("img"),
                            num = parseInt(img.attr("num")),
                            nextNum = type == "prev" ? num - 1 : num + 1,
                            srcArr = previewDiv.data("src");
                        if (nextNum < 0 || nextNum > srcArr.length - 1) {
                            return;
                        }
                        img[0].src = srcArr[nextNum].replace("~", PageInit.WebRootPath);
                        //如果有naturalHeight属性，说明是现代浏览器（支持此属性的浏览器）
                        if (img[0].naturalHeight) {
                            me._autoZoomDefault(img);
                        } else {//不支持的话，采用另外一个方式设置
                            me._autoZoomLessIE9(img[0]);
                        }
                        img.attr("num", nextNum);
                        me._setArrowStatus(previewDiv, img);
                    }
                });
            },
            getImage: function (src) {
                src = src || "";
                if (src.indexOf('base64|') === 0) {
                    src = src.split('|');
                    src = 'data:image/' + src[1] + ';' + src[0] + ',' + src[2];
                } else {
                    src = src.replace("~", PageInit.WebRootPath);
                }

                return src;
            }
        }
    })(jQuery);
}
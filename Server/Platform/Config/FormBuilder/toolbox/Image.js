InforCenter_Platform_FormBuilder_Image = {
    title: "Label",//元组件显示名称（可配置）
    icon: "../platform/Image/FormBuilder/ImageValue.png",//元组件显示图标
    applying: function () {
        this.options.isAutoZoom = false;
        $.formbuilder.toolbox.createControl(this.options, this.container);
    },
    options: {
        label: "",
        value: "../platform/Image/FormBuilder/ImageValue.png",
        copyrownumber: "",
        permissionActorInfo: "",
        permissionActorID: "",
        left: 0,
        width: 16,
        height: 16
    },
    property: {
        "font-family": {
            hidden: true
        },
        "font-size": {
            hidden: true
        },
        check: {
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
        "font-weight": {
            hidden: true
        },
        value: {
            hidden: true,
            "text": "image-upload",
            type: "fileupload",
            source: {
                text: "image-upload",
                image: "../platform/Image/FormBuilder/ImageValue.png",
                url: PageInit.WebRootPath + "/Base/BaseHandler.ashx?type=uploadFileBase64&fileSupport=jpg,png,jpeg,bmp,gif"
            },
            update: function (value) {
                if (!value) {
                    return;
                }
                this.elem.find("img").attr("src", value);
            },
            conver: function (src) {
                this.options.src = src;
                src = src || "";
                if (src.indexOf('base64|') === 0) {
                    src = src.split('|');
                    src = 'data:image/' + src[1] + ';' + src[0] + ',' + src[2];
                } else {
                    src = src.replace("~", PageInit.WebRootPath);
                }
                return src;
            }
        },
        //"width": {
        //    text: "width",
        //    type: "textbox",
        //    after: "align",
        //    hidden: true,
        //    update: function (value) {
        //        var item, itemwidth;
        //        var item = this.elem.find("img");
        //        var itemwidth = item[0].naturalWidth;
        //        if (!value) {
        //            value = itemwidth;
        //        }
        //        item.width(value);
        //        item.css({ "top": 0, "left": 0 });
        //        this.container.width(value);
        //        this.container.attr("data-width", value);
        //        this.elem.width(value);
        //        this.elem.find(".hoteam-ctrl-image-container").css("padding", 0);
        //    }
        //},
        //width: {
        //    hidden:false
        //},
        //height: {
        //    hidden:false
        //},
        height: {

        },
        className: {
            hidden: true
        },
        "copyrownumber": {
            "text": HoteamUI.Language.Lang("FormBuilder.copyrownumber"),
            type: "textbox"
        },
        "permissionActorInfo": {
            "text": HoteamUI.Language.Lang("FormBuilder.permissionActorInfo"),
            "type": "textbox",
            source: {
                readonly: true
            }
        },
        "flowTaskPermission": {
            text: HoteamUI.Language.Lang("FormBuilder.flowTaskPermission"),
            hidden: false,
            type: "textbox",
            after: "vertical-align"
        }
    },
    applyingproperty: {
        value: {
            "text": "image-upload",
            type: "fileupload",
            source: {
                text: "image-upload",
                image: "../platform/Image/FormBuilder/CustomFormImageUploadValue.png",
                url: PageInit.WebRootPath + "/Base/BaseHandler.ashx?type=uploadFileHttp&fileSupport=jpg,png,jpeg,bmp,gif&uploadPath=../Image/FormBuilder"
            },
            update: function (value) {
                if (!value) {
                    return;
                }
                this.elem.find("img").attr("src", value);

            },
            conver: function (src) {
                this.options.src = src;
                src = src || "";
                if (src.indexOf('base64|') === 0) {
                    src = src.split('|');
                    src = 'data:image/' + src[1] + ';' + src[0] + ',' + src[2];
                } else {
                    src = src.replace("~", PageInit.WebRootPath);
                }
                return src;
            }
        },
        //19500 李金岳
        "width": {
            text: "width",
            type: "textbox",
            after: "height",
            update: function (value, position, data) {
                return;
            }
        },
        "height": {
            text: "height",
            type: "textbox",
            //after: "vertical-align",
            update: function (value, position, data) {
                var self = this,
                    $img = self.elem.find("img"),
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
                        width = Math.floor(width.split("%")[0] / 100 * cellWidth);
                    }
                    if (typeof (height) == "string" && height.indexOf("%") > -1) {
                        height = Math.floor(height.split("%")[0] / 100 * cellHeight);
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

                var compareValue = function (width, height, cellWidth, cellHeight, naturalHeight, naturalWidth) {
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
                    imageValue.height =Math.floor(height);
                    imageValue.width = Math.floor(width);
                    return imageValue;
                }

                var setImgValue = function (self, $img, imageValue, data) {
                    var Align = data["align"],
                        verticalAlign = data["vertical-align"];
                    self.container.width(imageValue.width);
                    self.elem.width(imageValue.width);
                    $img.width(imageValue.width);
                    self.container.height(imageValue.height);
                    self.elem.height(imageValue.height);
                    $img.height(imageValue.height);
                    $img.parents(".hoteam-ctrl-image-container").css("padding", "0");
                    $.hoteamImage._setImage($img, imageValue.height, imageValue.width, imageValue.height, imageValue.width);
                    $.hoteamImage._autoZoomSet($img, "left");

                    self.property["align"].update.call(self, Align, data);
                    self.property["vertical-align"].update.call(self, verticalAlign, data);
                }

                var setImage = function (obj, $img, width, height, fun, callback, data) {
                    var imageValue = fun(obj, $img, width, height);
                    callback(obj, $img, imageValue, data);
                }

                if ($img[0].naturalWidth) {
                    setImage(self, $img, width, height, computeImgValue, setImgValue, data);
                    return;
                }
                $img.unbind("load");
                $img.load(function () {
                    setImage(self, $img, width, height, computeImgValue, setImgValue, data);
                })
            }
        },
        "vertical-align": {
            text: "vertical-align",
            type: "buttons",
            order: 1003,
            source: [{
                name: "top",
                text: "vertical-align-top",
                image: "vertical-align-top.png",
                selected: true
            }, {
                name: "middle",
                text: "vertical-align-middle",
                image: "vertical-align-middle.png",
                selected: false
            }, {
                name: "bottom",
                text: "vertical-align-bottom",
                image: "vertical-align-bottom.png",
                selected: false
            }],
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
                            "margin-top": Math.floor(cellHeight - contentHeight - 2)
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
        "flowTaskPermission": {
            text: HoteamUI.Language.Lang("FormBuilder.flowTaskPermission"),
            hidden: false,
            type: "textbox",
            after: "vertical-align"
        }
    },
    getValue: function () {
        //var id = this.options.selectGuid;
        var value = this.elem.find("img").attr("src");
        return value;
    }
}

InforCenter_Platform_FormBuilder_Image = $.extend(true, {}, $.formbuilder.toolbox.image, InforCenter_Platform_FormBuilder_Image);
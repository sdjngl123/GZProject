; InforCenter_Platform_FormBuilder_CustomFormImageUpload = {
    title: "Label",
    icon: "../platform/Image/FormBuilder/CustomFormImageUploadValue.png",
    options: {
        label: "",
        value: "../platform/Image/FormBuilder/CustomFormImageUploadValue.png",
        copyrownumber: "",
        permissionActorInfo: "",
        permissionActorID: "",
        left: 0
    },
    property: {
        "font-family": {
            hidden: true
        },
        check: {
            hidden: true
        },
        "font-size": {
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
        //19500 李金岳
        "height": {
            text: "height",
            hidden: false,
            type: "textbox",
            //after: "vertical-align",
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
                        width = Math.floor(width.split("%")[0] / 100 * cellWidth);
                    }
                    if (typeof (height) == "string" && height.indexOf("%") > -1) {
                        height = Math.floor(height.split("%")[0] / 100 * cellHeight);
                    }
                    //判断width和height值的情况
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
                    callback(obj, $img, imageValue, data);
                }

                if ($img[0].naturalWidth) {
                    setImage(self, $img, width, height, computeImgValue, setImgValue, data);
                    return;
                }

                $img.one("load", function () {
                    setImage(self, $img, width, height, computeImgValue, setImgValue, data);
                })
            }
        },
        //19500 李金岳
        "width": {
            text: "width",
            hidden: false,
            type: "textbox",
            after: "height",
            update: function (value, position, data) {
                return;
            }
        },
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
                this.elem.find(">img").attr("src", value);
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
                this.elem.find(">img").attr("src", value);
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
        "flowTaskPermission": {
            text: HoteamUI.Language.Lang("FormBuilder.flowTaskPermission"),
            hidden: false,
            type: "textbox",
            after: "vertical-align"
        }
    },
    getValue: function () {
        var value = this.elem.find("img").attr("src");
        return value;
    }
};

InforCenter_Platform_FormBuilder_CustomFormImageUpload = $.extend({}, $.formbuilder.toolbox.image, InforCenter_Platform_FormBuilder_CustomFormImageUpload);
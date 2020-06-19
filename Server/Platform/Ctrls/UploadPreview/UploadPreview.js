HoteamUI.Control.OUploadPreview = {
    Create: function (options) {
        var me = this;
        options = options || {};
        //设置参数
        var parentId = this.id;
        var id = this.id + "_hoteamUploadPreview";
        var CtrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions;
        var o = $.extend(true, {}, CtrlOptions);
        o.parentId = parentId;
        o.id = id;
        o.handlers = {};
        o.ctrlEvent = {};
        o.ctrlEvent.o = this;
        $.hoteamUploadPreview.create(o);
    },
    GetValue: function () {
        var retData = '';
        var id = this.id + "_hoteamUploadPreview";
        var _data = $("#" + id).data("result");

        //21021 李金岳
        var data = [];
        if (_data) {
            var _dataLen = _data.length;
            for (var i = 0; i < _dataLen; i++) {
                if (_data[i] != null) {
                    data.push(_data[i]);
                }
            }
        }

        if (!HoteamUI.Common.IsNullOrEmpty(data)) {
            retData = JSON.stringify(data);
        }
        return retData;
    },
    LoadImages: function (data) {
        var id = this.id + "_hoteamUploadPreview";
        $.hoteamUploadPreview.loadImages(id, data);
    },
    HideUploadBtn: function () {
        $(".status_bar").hide();
        $(".upload_preview").css("border-top", "0");
        var height = $(".UploadPreview").height() - 2;
        $(".upload_preview").css("height", height);
    }
};


{
    (function ($) {
        $.hoteamUploadPreview = {
            defaults: {
                swf: "uploadpreview/uploader.swf",
                url: PageInit.WebRootPath + "/Base/BaseHandler.ashx?type=uploadFileToIIS&uploadPath=../Files/"
            },
            create: function (options) {
                var o = $.extend(true, {}, $.hoteamUploadPreview.defaults, options);
                var Container = $("#" + o.parentId);
                var upload = '<div class="upload_main" id="' + o.id + '"><div class="status_bar"><div class="btns">';
                upload += '<div class="choose-file" id="' + o.id + '_pick">' + HoteamUI.Language.Lang("UploadPreview.ChooseFile") + '</div>';
                upload += '<div class="upload_btn" id="' + o.id + '_upload">' + HoteamUI.Language.Lang("UploadPreview.Upload") + '</div></div></div>';
                upload += '<div class="upload_preview" id="' + o.id + '_preview"></div></div>';

                Container.append(upload);
                var height = Container.height() - 45 - 2;
                $(".upload_preview").css("height", height);
                var uploadPreview = new UploadPreview({
                    swf: o.swf,
                    url: o.url,
                    previewInfo: {
                        previewWrap: $("#" + o.id + "_preview")
                    },
                    btns: {
                        chooseBtn: $("#" + o.id + "_pick"),
                        uploadBtn: $("#" + o.id + "_upload"),
                    },
                    uploadSuccess: function (file,response){
                        var data = $("#" + o.id).data("result");
                        if (!data) {
                            data = [];
                        }

                        //21021 李金岳
                        var imgIndex = data.length;
                        $("#" + file.file.id).attr("data-index", imgIndex);

                        data.push(response[0]);
                        $("#" + o.id).data("result", data);
                    },

                    //21021 李金岳
                    onDel: function () { },
                    onDelUploaded: function (id, index) {
                        var data = $("#" + o.id).data("result");
                        if (data) {
                            var delId = index;
                            data[delId] = null;
                            $("#" + o.id).data("result", data);
                        }
                    }
                });

                o.uploadPreview = uploadPreview;
                $("#" + o.id).data("opt", o);

            },
            loadImages: function (id,data) {
                var uploadPreview = $("#" + id).data("opt").uploadPreview;
                uploadPreview.options.previewInfo.previewWrap.html("");
                $.each(data, function (i, imgUrl) {
                    uploadPreview.loadImage(imgUrl,i);
                });
            }
        }
    })(jQuery);
}


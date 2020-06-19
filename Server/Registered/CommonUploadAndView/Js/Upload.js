InforCenter_Registered_CommonUploadFilePage_OnCreate = function (ctrlEvent) {

    ctrlEvent.o.LoadTemplate("CommonUploadFilePage");
    var pid = ctrlEvent.o.ContainerID();
    var chunk = true;
    var paras = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID()).GetPara();
    if (paras) {
        var encrypt = paras.Encrypt;
    }

    var vaultData = HoteamUI.DataService.Call("InforCenter.Organization.FileManageService.GetVaultForUpload", {});
    if (HoteamUI.Common.IsNullOrEmpty(vaultData) == false && HoteamUI.Common.IsNullOrEmpty(vaultData.InnerIP) == false
        && HoteamUI.Common.IsNullOrEmpty(vaultData.InnerPort) == false && HoteamUI.Common.IsNullOrEmpty(vaultData.Volumn) == false
        && HoteamUI.Common.IsNullOrEmpty(vaultData.BasePath) == false) {

        var url = PageInit.WebRootPath + "/Registered/CommonUploadAndView/TransmitFileHandler.ashx?ip=" + vaultData.InnerIP + "&port=" + vaultData.InnerPort + "&volumn=" + vaultData.Volumn + "&fileGuid=" + vaultData.FileGuid + "&path=" + vaultData.BasePath + "&encrypt=" + encrypt;

        var filters = { title: "office、pdf、SVL、图片", extensions: HoteamUI.AppSets.CommonUploadFileExtend }; //zip,doc,docx,xls,xlsx,ppt,pptx

        $("#uploader").pluploadQueue($.extend({
            // General settings
            runtimes: 'html5,flash', // 这里是说用什么技术引擎
            url: url, // 服务端上传路径
            max_file_size: '500mb', // 文件上传最大限制。
            file_data_name: 'file',
            multipart: true,
            paras: paras,
            unique_names: true, // 上传的文件名是否唯一
            filters: [filters],
            flash_swf_url: PageInit.WebRootPath + '/Registered/CommonUploadAndView/Ctrls/plupload2.1.8/Moxie.swf',
            resize: { quality: 99, preserve_headers: true, crop: false },
            init: {
                FileUploaded: function (uploader, file, response) {
                    if (response.response) {
                        var rs = $.parseJSON(response.response);
                        if (rs.status) {
                            fileSuffix.push(rs.fileSuffix);
                            sourceFileNames.push(rs.sourceFileName);
                            fileNames.push(rs.filename);
                            filesizes.push((file.size / 1024 / 1024).toFixed(2) + "M");
                        } else {
                            errors.push(file.name);
                        }
                    }
                },
                UploadComplete: function (uploader, fs) {
                    var checkValue = $('#checkPermission').attr('checked');
                    fs.inheritPermission = true;
                    if (checkValue == undefined) {
                        fs.inheritPermission = false;
                    }
                    HoteamUI.UIManager.Return(pid, { confirm: "OK", files: fs });
                },
                BeforeUpload: function (uploader, file) {

                    $.cookie("UploadFileName", file.name); //记录当前上传文档的名称
                    this.settings.url = url + "&runtime=" + this.runtime;

                },
                FilesAdded: function (uploader, files) {
                    var fileNames = "";
                    var fileArray = [];
                    var removeFileArray = [];
                    $.each(uploader.files, function (index, file) {
                        if (file.size == 0 || file.size == undefined) {
                            removeFileArray.push(file);
                            var msg = HoteamUI.Language.Lang("CommonUpload.FileSizeZero");
                            msg = msg.replace("[name]", file.name);
                            HoteamUI.UIManager.noty({ text: msg, type: 'infomation', layout: 'center' });
                        }
                        if (fileNames.indexOf(file.name) != -1) {
                            fileArray.push(file);
                            var msg = HoteamUI.Language.Lang("CommonUpload.FileExisted");
                            HoteamUI.UIManager.noty({ text: msg, type: 'infomation', layout: 'center' });
                        }
                        fileNames += file.name + ",";
                    });
                    $.each(removeFileArray, function (index, file) {
                        uploader.removeFile(file);
                    })
                    $.each(fileArray, function (index, file) {
                        uploader.removeFile(file);
                    })
                }
            }
        }, (true ? { chunk_size: '3mb' } : {})));

    }
}

InforCenter_Registered_CommonUploadFilePage_CancelOnClick = function (ctrlEvent) {
    var ret = { confirm: "Cancel" }
    var pid = ctrlEvent.o.ContainerID();
    HoteamUI.UIManager.Return(pid, ret);
}

InforCenter_Registered_CommonUploadFile_FileUploadCtrlClick = function (ctrlEvent, objType, infoName) {
    var ppara = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID()).GetPara();
    if (ppara) {
        var encrypt = ppara.Encrypt;
    }
    var callback = function (data, ret) {
        if (ret != null) {
            var files = ret.files;
            if (files[0].hint != undefined) {
                var msg = HoteamUI.Language.Lang("CommonUpload", "UploadError")
                HoteamUI.UIManager.MsgBox(msg);
            } else {
                if (ret.files != null) {
                    var fileList = [];
                    var text = "";
                    $(files).each(function (i, file) {
                        var fileInfo = {};
                        fileInfo.FileName = file.name;
                        fileInfo.FileType = file.name.substring(file.name.lastIndexOf("."), file.name.length);
                        fileInfo.FileSize = file.size;
                        fileInfo.UploadUser = HoteamUI.Security.LoginPara.UserID;
                        fileInfo.VaultName = data.Name;
                        fileInfo.Path = data.BasePath + "\\" + file.target_name;
                        fileList.push(fileInfo);
                        text += ";" + file.name;
                    });
                    if (text.length > 0)
                        text = text.substring(1);
                    ctrlEvent.o.SetText(text);
                    ctrlEvent.o.SetValue(JSON.stringify(fileList));
                }
            }
        }
    }
    var vaultData = HoteamUI.DataService.Call("InforCenter.Organization.FileManageService.GetVaultForUpload", {});
    var path = vaultData.BasePath;
    //var path = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + HoteamUI.Security.LoginPara.UserGroup + "/" + HoteamUI.Security.LoginPara.UserCode;

    HoteamUI.UIManager.Popup({ pagename: "CommonUploadFilePage", paras: { "path": path, Encrypt: encrypt }, data: vaultData, callback: callback });

}

InforCenter_Registered_CommonDownloadFile_DownloadMenu = function (para) {
    var selectid = para[1].SelectID;
    var column = para[1].Column;
    var servicePara = {
        para: {
            ExtendJsonInfo: JSON.stringify({ ObjectID: selectid, Column: column })
        }
    };
    var urls = HoteamUI.DataService.Call("Hoteam.PLMCommon.CommonUploadAndViewService.GetDownloadUrlByObjIDAndColumn", servicePara);
    if (urls) {
        urls = JSON.parse(urls);
        for (var i = 0; i < urls.length; i++) {
            var url = urls[i];
            window.open(url);
        }
        InforCenter_Platform_MenuCtrl_InnerReceiveServerData(para[0], { confirm: "OK" });
    } else {
        HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("CommonUpload.DownloadUrlIsNull"));
    }
}



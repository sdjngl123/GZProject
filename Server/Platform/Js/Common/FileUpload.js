//点击控件弹出页面
InforCenter_Platform_FileUpload_Click = function (ctrlEvent, objectType, infoName) {
    var callback = function (data, ret) {
        if (ret != null) {
            var o = HoteamUI.Control.Instance(data.id);
            o.SetText(ret.UploadFileText);
            o.SetValue(ret.UploadFileValue);
            var functionName = "InforCenter_" + objectType + "_" + infoName + "_FileUploadValue";
            if (window[functionName] && typeof window[functionName] == "function") {
                return window[functionName](ctrlEvent, ret);
            }
        }
    }
    var para = {};
    //获取页面参数
    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    //获取页面参数
    para = page.GetPara();
    HoteamUI.UIManager.Popup("FileUploadPage", para, callback, { id: ctrlEvent.o.id });
}

//初始化控件参数
InforCenter_Platform_FileUploadCtrl_OnCreateComplete = function (ctrlEvent) {
    var vaultData = HoteamUI.DataService.Call("InforCenter.Organization.FileManageService.GetVaultForUpload", {});
    if (HoteamUI.Common.IsNullOrEmpty(vaultData) == false
        && HoteamUI.Common.IsNullOrEmpty(vaultData.IP) == false
        && HoteamUI.Common.IsNullOrEmpty(vaultData.Port) == false
        && HoteamUI.Common.IsNullOrEmpty(vaultData.Volumn) == false
        && HoteamUI.Common.IsNullOrEmpty(vaultData.BasePath) == false) {
        //获取文档柜信息成功
        var ret = {};
        ret.ServerIP = vaultData.IP;
        ret.ServerPort = vaultData.Port;
        ret.DistributeIP = vaultData.DistributeIP;
        ret.DistributePort = vaultData.DistributePort;
        ret.Volumn = vaultData.Volumn;
        ret.BasePath = vaultData.BasePath;
        ret.Description = "UploadUser:" + HoteamUI.Security.LoginPara.UserID
            + "\nUploadTime:" + new Date().format("yyyy-MM-dd hh:mm:ss") + "\n";

        var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
        var pagePara = page.GetPara();
        if (HoteamUI.Common.IsNullOrEmpty(pagePara) == true) {
            pagePara = {};
        }
        pagePara.VaultName = vaultData.Name;
        var singleUpload = false;
        if (pagePara.SingleUpload) {
            if (pagePara.SingleUpload == true || pagePara.SingleUpload == 'true' || pagePara.SingleUpload == 'True') {
                singleUpload = true;
            }
        } else {
            ret.SingleUpload = false;
        }
        ret.SingleUpload = singleUpload;
        ret.SelectFileType = pagePara.SelectFileType;
        HoteamUI.Page.SetContainerParas(ctrlEvent.o.ContainerID(), "FileUploadPage", pagePara);
        ctrlEvent.o.UpLoad(ret);
    }
    else {
        //未找到符合条件的文档柜信息
        var callback = function (data, ret) {
            HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), null);
        }
        var msgPara = { pageMode: "OK", context: "FileUploadPage", labelName: "NoVaultFound" };
        HoteamUI.UIManager.Popup("Confirm", msgPara, callback, {});
    }
}

//文件上传完成
InforCenter_Platform_FileUploadCtrl_OnUploadSuccess = function (ctrlEvent) {
    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    if (HoteamUI.Common.IsNullOrEmpty(ctrlEvent.UpLoadSuccessData) == false
        && ctrlEvent.UpLoadSuccessData.Success == "true"
        && HoteamUI.Common.IsNullOrEmpty(ctrlEvent.UpLoadSuccessData.FileList) == false
        && ctrlEvent.UpLoadSuccessData.FileList.length > 0) {
        var stateCtrl = page.GetControl('StateCtrl');
        stateCtrl.SetText('true');
        var fileList = ctrlEvent.UpLoadSuccessData.FileList;
        var pagePara = page.GetPara();
        if (HoteamUI.Common.IsNullOrEmpty(pagePara) == true) {
            pagePara = {};
        }
        pagePara.UploadData = null;
        pagePara.UploadDataText = "";

        var vaultName = "";
        if (HoteamUI.Common.IsNullOrEmpty(pagePara.VaultName) == false) {
            vaultName = pagePara.VaultName;
        }
        var newFileDataArray = new Array(0);
        for (var i = 0; i < fileList.length; i++) {
            var file = fileList[i];
            var temp = {};
            var index = file.File.lastIndexOf(".");
            var fileType = "";
            if (index >= 0 && index + 1 < file.File.length) {
                fileType = file.File.substring(index + 1);
            }
            temp.FileType = fileType;
            temp.FileSize = file.FileSize;
            temp.UploadTime = new Date().format("yyyy-MM-dd hh:mm:ss");
            temp.UploadUser = HoteamUI.Security.LoginPara.UserID;
            temp.VaultName = vaultName;
            temp.Path = file.DesPath;
            newFileDataArray[i] = temp;
            var tempFileName = file.File;
            if (tempFileName.lastIndexOf('\\') > 0 && tempFileName.lastIndexOf('\\') + 1 <= tempFileName.length) {
                tempFileName = tempFileName.substring(tempFileName.lastIndexOf('\\') + 1);
            }
            temp.FileName = tempFileName;
            pagePara.UploadDataText += ";" + tempFileName;
        }
        pagePara.UploadData = newFileDataArray;
        if (pagePara.UploadDataText.length > 0) {
            pagePara.UploadDataText = pagePara.UploadDataText.substring(1);
        }
        //将数据设置到页面参数中
        HoteamUI.Page.SetContainerParas(ctrlEvent.o.ContainerID(), "FileUploadPage", pagePara);
        ctrlEvent.o.OtherControl("btnOK").Enable();
        //TODO:弹出消息有可能会被控件挡住，暂时注释掉
        //                var msgPara = { pageMode: "OK", context: "FileUploadPage", labelName: "UploadSuccess" };
        //                HoteamUI.UIManager.Popup("Confirm", msgPara, null, null);
    }
}

InforCenter_Platform_FileUploadCtrl_OnCreate = function (pageEvent) {
    //只有上传成功后才允许点击确定按钮
    pageEvent.o.GetControl("btnOK").Disable();
}

//页面确定返回
InforCenter_Platform_FileUploadPage_OnOK = function (ctrlEvent) {
    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    var pagePara = page.GetPara();

    if (HoteamUI.Common.IsNullOrEmpty(pagePara) == false
        && HoteamUI.Common.IsNullOrEmpty(pagePara.UploadData) == false
        && HoteamUI.Common.IsNullOrEmpty(pagePara.UploadDataText) == false) {
        var ret = {};
        //返回文件详细信息串
        ret.UploadFileValue = JSON.stringify(pagePara.UploadData);
        //返回文件名信息
        ret.UploadFileText = pagePara.UploadDataText;
        ret.confirm = "OK";
        HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), ret);
    }
    else {
        //TODO:弹出消息有可能会被控件挡住，暂时注释掉
        //未上传文件

        var msgPara = { pageMode: "OK", context: "FileUploadPage", labelName: "NoFileUpload" };


        HoteamUI.UIManager.Popup("Confirm", msgPara, null, null);
        //HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), null);
    }
}

//页面取消操作
InforCenter_Platform_FileUploadPage_OnCancel = function (ctrlEvent) {
    var stateCtrl = ctrlEvent.o.OtherControl('StateCtrl');
    var stateValue = stateCtrl.GetText();
    if (HoteamUI.Common.IsNullOrEmpty(stateValue)) {
        var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
        var pagePara = page.GetPara();
        HoteamUI.DataService.Call("Inforcenter.FileManage.FileManageService.DeleteFile", { fileString: JSON.stringify(pagePara.UploadData) });
        HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), null);
    } else {
        var callback = function (data, ret) {
            if (ret && ret.confirm == "OK") {
                var page = HoteamUI.Page.Instance(data.ctrl.ContainerID());
                var pagePara = page.GetPara();
                HoteamUI.DataService.Call("Inforcenter.FileManage.FileManageService.DeleteFile", { fileString: JSON.stringify(pagePara.UploadData) });
                HoteamUI.UIManager.Return(data.ctrl.ContainerID(), null);
            }
        }
        if (stateValue == 'false') {
            var msgPara = { pageMode: "OkCancel", context: "FileUploadPage", labelName: "UnComplateCancelInfo" };
            HoteamUI.UIManager.Popup("Confirm", msgPara, callback, { ctrl: ctrlEvent.o });
        } else {
            var msgPara = { pageMode: "OkCancel", context: "FileUploadPage", labelName: "ComplateCancelInfo" };
            HoteamUI.UIManager.Popup("Confirm", msgPara, callback, { ctrl: ctrlEvent.o });
        }
    }
}


//删除已上传附件
InforCenter_Platform_FileUploadPage_OnDeleteFile = function (ctrlEvent) {

    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    var pagePara = page.GetPara();
    if (HoteamUI.Common.IsNullOrEmpty(pagePara) == true) {
        pagePara = {};
    }
    pagePara.UploadData = null;
    pagePara.UploadDataText = "";

    var vaultName = "";
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.VaultName) == false) {
        vaultName = pagePara.VaultName;
    }

    var FileData = JSON.parse(ctrlEvent.FileData);

    //删除文档柜中的文件
    if (FileData.FileList.length > 0) {
        var delFileDataArray = new Array(0);
        for (var i = 0; i < FileData.FileList.length; i++) {
            var file = FileData.FileList[i];
            var temp = {};
            temp.VaultName = vaultName;
            temp.Path = file.DeleteFile;
            delFileDataArray[i] = temp;
        }
        HoteamUI.DataService.Call("Inforcenter.FileManage.FileManageService.DeleteFile", { fileString: JSON.stringify(delFileDataArray) });
    }

    //更新已上传的文件信息
    var newFileDataArray = new Array(0);
    for (var i = 0; i < FileData.FinalList.length; i++) {
        var file = FileData.FinalList[i];
        var temp = {};
        var index = file.File.lastIndexOf(".");
        var fileType = "";
        if (index >= 0 && index + 1 < file.File.length) {
            fileType = file.File.substring(index + 1);
        }
        temp.FileType = fileType;
        temp.FileSize = file.FileSize;
        temp.UploadTime = new Date().format("yyyy-MM-dd hh:mm:ss");
        temp.UploadUser = HoteamUI.Security.LoginPara.UserID;
        temp.VaultName = vaultName;
        temp.Path = file.DesPath;
        newFileDataArray[i] = temp;
        var tempFileName = file.File;
        if (tempFileName.lastIndexOf('\\') > 0 && tempFileName.lastIndexOf('\\') + 1 <= tempFileName.length) {
            tempFileName = tempFileName.substring(tempFileName.lastIndexOf('\\') + 1);
        }
        temp.FileName = tempFileName;
        pagePara.UploadDataText += ";" + tempFileName;
    }
    pagePara.UploadData = newFileDataArray;
    if (pagePara.UploadDataText.length > 0) {
        pagePara.UploadDataText = pagePara.UploadDataText.substring(1);
    }
    //将数据设置到页面参数中
    HoteamUI.Page.SetContainerParas(ctrlEvent.o.ContainerID(), "FileUploadPage", pagePara);
}

//页面关闭操作
InforConter_Platform_FileUploadPage_OnDialogCloseClick = function (pageEvent) { }

//Base64
Hoteam_InferCenter_ImageUploadBase64_OnCreate = function (ctrlEvent, uploadInput, fileSupport) {
    var para = {},
        obj = ctrlEvent.o,
        file,
        accept;

    if (HoteamUI.Common.IsNullOrEmpty(fileSupport)) {
        fileSupport = "jpg,png,jpeg,bmp,gif";
    }

    var uploadError = HoteamUI.Language.Lang("Import.FileUpLoadError");
    var cid = obj.OtherControl(uploadInput);
    // multiple 加上此属性可多选上传
    accept = fileSupport && typeof fileSupport === "string" ?
        "image/" + (fileSupport || '').split(',').join(',image/')
        : "image/*";
    accept = accept.replace(/dwg/g, 'vnd.dwg');
    file = $("input[type='file']", "#" + cid.id)
        .attr("ctrlId", ctrlEvent.o.id)
        .attr("accept", accept)
        .attr("data-url", PageInit.WebRootPath + "/Base/BaseHandler.ashx?type=uploadFileBase64&fileSupport=" + encodeURI(fileSupport))
        .fileupload({
            replaceFileInput: false,
            add: function (e, data) {
                if (data.files[0]) {
                    var temp = data.files[0].name.split(".");
                    var type = temp[temp.length - 1] || '';
                    if (fileSupport.indexOf(type.toLowerCase()) === -1) {
                        HoteamUI.UIManager.MsgBox("请选择上传图片文件！");
                        return;
                    }
                }

                data.submit();
            },
            done: function (e, data) {
                var result;
                if (data.result == undefined) {
                    HoteamUI.UIManager.MsgBox(uploadError);
                    return;
                }
                if (typeof data.result == "string") {
                    result = data.result;
                }
                else {
                    result = data.result[0].body ? data.result[0].body.innerHTML : data.result;
                }

                if (result) {
                    var ctrl = HoteamUI.Control.Instance($(this).attr("ctrlId"));
                    var imageName = ctrl.CID().replace("UploadBtn", "Image");
                    var imageCtrl = ctrl.OtherControl(imageName);
                    var displaySrc = HoteamUI.Common.GetBase64DisplayImage(result);
                    imageCtrl.SetValue(result);
                    imageCtrl.SetSrc(displaySrc);
                }
                else {
                    HoteamUI.UIManager.MsgBox(uploadError);
                }
            },
            fail: function (e, data) {
                HoteamUI.UIManager.MsgBox(uploadError);
            }
        });

    file.closest(".hoteam-layout-container").css({
        position: "absolute",
        "z-index": 9999
    });
}

Hoteam_InferCenter_ImageUploadBase64_OnDownload = function (ctrlEvent, ctrID) {
    var imageCtrl = ctrlEvent.o.OtherControl(ctrID);
    var base64 = imageCtrl.GetValue();
    if (base64) {
        var url = PageInit.WebRootPath + "/Base/BaseHandler.ashx?type=downloadFileBase64";
        $.post(url, { base64: base64 }, function (ret) {
            if (ret) {
                window.open(PageInit.WebRootPath + "/" + ret);
            }
        });
    }
}

Hoteam_InferCenter_ImageUploadHttp_OnDownload = function (ctrlEvent, ctrID) {
    var imageCtrl = ctrlEvent.o.OtherControl(ctrID);
    var ret = imageCtrl.GetValue();
    if (ret) {
        var url = ret.replace("~", PageInit.WebRootPath);
        window.open(url);
    }
}


Hoteam_InferCenter_ImageUploadHttp_OnCreate = function (ctrlEvent, uploadInput, uploadPath, fileSupport) {
    var para = {},
        obj = ctrlEvent.o,
        file,
        accept;

    if (HoteamUI.Common.IsNullOrEmpty(fileSupport)) {
        fileSupport = "jpg,png,jpeg,bmp,gif";
    }

    var uploadError = HoteamUI.Language.Lang("Import.FileUpLoadError");
    var cid = obj.OtherControl(uploadInput);
    // multiple 加上此属性可多选上传
    accept = fileSupport && typeof fileSupport === "string" ?
        "image/" + (fileSupport || '').split(',').join(',image/')
        : "image/*";
    accept = accept.replace(/dwg/g, 'vnd.dwg');
    file = $("input[type='file']", "#" + cid.id)
        .attr("ctrlId", ctrlEvent.o.id)
        .attr("accept", accept)
        .attr("data-url", PageInit.WebRootPath + "/Base/BaseHandler.ashx?type=uploadFileHttp&fileSupport=" + encodeURI(fileSupport) + "&uploadPath=" + encodeURI(uploadPath))
        .fileupload({
            replaceFileInput: false,
            add: function (e, data) {
                if (data.files[0]) {
                    var temp = data.files[0].name.split(".");
                    var type = temp[temp.length - 1] || '';
                    if (fileSupport.indexOf(type.toLowerCase()) === -1) {
                        HoteamUI.UIManager.MsgBox("请选择上传图片文件！");
                        return;
                    }
                }

                data.submit();
            },
            done: function (e, data) {
                var result;
                if (data.result == undefined) {
                    HoteamUI.UIManager.MsgBox(uploadError);
                    return;
                }
                if (typeof data.result == "string") {
                    result = data.result;
                }
                else {
                    result = data.result[0].body ? data.result[0].body.innerHTML : data.result;
                }

                if (result) {
                    var ctrl = HoteamUI.Control.Instance($(this).attr("ctrlId"));
                    var imageName = ctrl.CID().replace("UploadBtn", "Image");
                    var imageCtrl = ctrl.OtherControl(imageName);
                    var displaySrc = HoteamUI.Common.GetDefaultDisplayImage(null, result);
                    imageCtrl.SetValue(result);
                    imageCtrl.SetSrc(displaySrc);
                }
                else {
                    HoteamUI.UIManager.MsgBox(uploadError);
                }
            },
            fail: function (e, data) {
                HoteamUI.UIManager.MsgBox(uploadError);
            }
        });

    file.closest(".hoteam-layout-container").css({
        position: "absolute",
        "z-index": 9999
    });
}

Hoteam_InferCenter_ImageUploadHttp_OnDelete = function (deletePara) {
    var ret = undefined;
    var url = PageInit.WebRootPath + "/Base/BaseHandler.ashx?type=deleteFile&filePath=" + encodeURI(deletePara.ImagePath);
    $.ajax({
        url: url,
        data: {},
        async: false,
        dataType: 'json',
        cache: false,
        contentType: 'application/json',
        success: function (data) {
            if (data && data.d) data = data.d;
            ret = data;
        },
        error: function (err) {
            var msg = '';
            if (err.readyState != null) {
                msg = 'readyState:' + err.readyState + ';';
            }
            if (err.status != null) {
                msg = msg + 'status:' + err.status + ';';
            }
            if (console && console.log) {
                console.log(msg + err.responseText);
            }
        },
        complete: function (XHR, TS) {
            XHR.abort = null;
            XHR = null;
        }
    });
    return ret;
}

//创建绑定图片上传控件
Hoteam_InferCenter_ImageUpload_OnClick = function (ctrlEvent, fileSupport) {
    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    var pagePara = page.GetPara();
    var fileExtendStr = '';
    if (HoteamUI.Common.IsNullOrEmpty(fileSupport)) {
        //默认值
        fileSupport = "jpg,png,jpeg,bmp,gif";
    }

    if (!HoteamUI.Common.IsNullOrEmpty(fileSupport)) {
        var fileExtends = fileSupport.split(',');
        $.each(fileExtends, function (i, d) {
            if (d != '') {
                fileExtendStr += ';*.' + d;
            }
        });
        fileExtendStr = '(' + fileExtendStr.substr(1) + ')|' + fileExtendStr.substr(1) + '||';
    }
    var fpCtrlId = ctrlEvent.o.ControlInfo().ControlID.split('_')[0] + '_FileUpLoadCtrl';
    var fileTransfer = page.GetControl(fpCtrlId);
    var filePath = fileTransfer.SelectFiles(1, fileExtendStr);

    var uploadData = {
    };
    uploadData.FileList = [];
    var tempFile = {
    };
    tempFile.Path = filePath.substr(0, filePath.length - 1);
    uploadData.FileList.push(tempFile);

    var vaultData = HoteamUI.DataService.Call("InforCenter.Organization.FileManageService.GetVaultForUpload", {
    });
    pagePara.VaultName = vaultData.Name;
    HoteamUI.Page.SetContainerParas(page.pid, page.PageName(), pagePara);
    var ret = {};
    ret.ServerIP = vaultData.IP;
    ret.ServerPort = vaultData.Port;
    ret.DistributeIP = vaultData.DistributeIP;
    ret.DistributePort = vaultData.DistributePort;
    ret.Volumn = vaultData.Volumn;
    ret.BasePath = vaultData.BasePath;
    if (fileTransfer.id != '') {
        ret.UploadData = JSON.stringify(uploadData);
        fileTransfer.QueiesceUpload(ret);
    }
}

Hoteam_InferCenter_ImageUpload_OnUploadSuccess = function (ctrlEvent, infoName) {
    if (HoteamUI.Common.IsNullOrEmpty(ctrlEvent.UpLoadSuccessData) == false
        && ctrlEvent.UpLoadSuccessData.Success == "true"
        && HoteamUI.Common.IsNullOrEmpty(ctrlEvent.UpLoadSuccessData.FileList) == false
        && ctrlEvent.UpLoadSuccessData.FileList.length > 0) {

        var ctrl = ctrlEvent.o;
        var page = HoteamUI.Page.Instance(ctrl.ContainerID());
        var pagePara = page.GetPara();
        var vaultName = "";
        if (HoteamUI.Common.IsNullOrEmpty(pagePara.VaultName) == false) {
            vaultName = pagePara.VaultName;
        }
        var fileList = ctrlEvent.UpLoadSuccessData.FileList;
        var file = fileList[0];
        var temp = {};
        var index = file.File.lastIndexOf(".");
        var fileType = "";
        if (index >= 0 && index + 1 < file.File.length) {
            fileType = file.File.substring(index + 1);
        }
        temp.FileType = fileType;
        temp.FileSize = file.FileSize;
        temp.UploadTime = new Date().format("yyyy-MM-dd hh:mm:ss");
        temp.UploadUser = HoteamUI.Security.LoginPara.UserID;
        temp.VaultName = vaultName;
        temp.Path = file.DesPath;
        var tempFileName = file.File;
        if (tempFileName.lastIndexOf('\\') > 0 && tempFileName.lastIndexOf('\\') + 1 <= tempFileName.length) {
            tempFileName = tempFileName.substring(tempFileName.lastIndexOf('\\') + 1);
        }
        temp.FileName = tempFileName;

        var url = InforCenter_Platform_GetFileUrl(temp.VaultName, temp.Path);
        var src = url + '?time=' + new Date().getTime();

        var imageCtrl = page.GetControl(infoName + "_Value_Image");
        if (imageCtrl.id != "") {
            imageCtrl.SetValue(JSON.stringify(temp));
            imageCtrl.SetSrc(src);
        }

    }
    else {
        HoteamUI.UIManager.MsgBox(ctrlEvent.UpLoadSuccessData.Error);
    }
}

InforCenter_Platform_FileUploadCtrl_OnStartUploadMessage = function (ctrlEvent) {
    var state = ctrlEvent.o.OtherControl('StateCtrl');
    state.SetText('false');
}

InforCenter_Platform_FileUploadCtrl_OnCheckUploadStatusEvent = function (ctrlEvent) {
    var status = ctrlEvent.UpLoadSuccessData.Status;
    if (status != '' && ctrlEvent.UpLoadSuccessData.Success != 'true' && ctrlEvent.UpLoadSuccessData.Status != 'Complete') {
        var state = ctrlEvent.o.OtherControl('StateCtrl');
        if (status == "Clear") {
            state.SetText('');
        }
        else {
            state.SetText('false');
        }
    }
}
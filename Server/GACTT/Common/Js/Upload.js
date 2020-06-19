InforCenter_Platform_UploadFile_OnCreate = function (ctrlEvent) {

    ctrlEvent.o.LoadTemplate("UploadFilePage");
    var pid = ctrlEvent.o.ContainerID();
    var chunk = true;
    var paras = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID()).GetPara();
    var vaultData = HoteamUI.DataService.Call("InforCenter.Organization.FileManageService.GetVaultForUpload", {});

    if (HoteamUI.Common.IsNullOrEmpty(vaultData) == false && HoteamUI.Common.IsNullOrEmpty(vaultData.InnerIP) == false
        && HoteamUI.Common.IsNullOrEmpty(vaultData.InnerPort) == false && HoteamUI.Common.IsNullOrEmpty(vaultData.Volumn) == false
        && HoteamUI.Common.IsNullOrEmpty(vaultData.BasePath) == false) {
        var url = PageInit.WebRootPath + "/GACTT/Common/Config/TransmitFileHandler.ashx?ip=" + vaultData.InnerIP + "&port=" + vaultData.InnerPort + "&volumn=" + vaultData.Volumn + "&fileGuid=" + vaultData.FileGuid + "&path=" + vaultData.BasePath;
        var titleFilter = HoteamUI.Language.Lang("GACCommon.FilterTitle");
        var filters = { title: titleFilter, extensions: HoteamUI.AppSets.UploadFileExtend };
        $("#uploader").pluploadQueue($.extend({
            runtimes: 'html5,flash', // 这里是说用什么技术引擎
            url: url, // 服务端上传路径
            max_file_size: '15mb', // 文件上传最大限制。500mb
            file_data_name: 'file',
            multipart: true,
            paras: paras,
            unique_names: true, // 上传的文件名是否唯一
            filters: [filters],
            flash_swf_url: PageInit.WebRootPath + '/GACTT/Common/Js/plupload/Moxie.swf',  
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
                    if (paras.TDCode && paras.TDCode != "") {
                        if (paras.existFileList instanceof Array) {
                            for (var k = 0; k < paras.existFileList.length; k++) {
                                if (paras.existFileList[k].FileName.toLowerCase() == file.name.toLowerCase()) {
                                    //如果重复，则改名
                                    var potIndex = file.name.indexOf('.');
                                    if (potIndex > 0 && potIndex < file.name.length - 1) {
                                        file.name = file.name.substring(0, potIndex) + "_(" + Math.floor(Math.random() * 10000) + ")" + file.name.substring(potIndex, file.name.length);
                                    }
                                }
                            }
                        }
                    }
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
                            var msg = HoteamUI.Language.Lang("GACCommon.FileSizeZero");
                            msg = msg.replace("[name]", file.name);
                            HoteamUI.UIManager.noty({ text: msg, type: 'infomation', layout: 'center' });
                        }
                        if (fileNames.indexOf(file.name) != -1) {
                            fileArray.push(file);
                            var msg = HoteamUI.Language.Lang("GACCommon.FileExisted");
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

InforCenter_Platform_UploadFile_CancelOnClick = function (ctrlEvent) {
    var ret = { confirm: "Cancel" }
    var pid = ctrlEvent.o.ContainerID();
    HoteamUI.UIManager.Return(pid, ret);
}

HoteamUI.Control.OFiletransfer.NetworkUpload = function (activeX) {
    if (activeX) {
        var clientIP = activeX.getClientIP();
        if (clientIP.indexOf("10") == 0 || /*clientIP.indexOf("172.16") == 0 || clientIP.indexOf("172.31") == 0 ||*/ clientIP.indexOf("192.168") == 0) {
            var msg = HoteamUI.Language.Lang("GACCommon.InnerNetUpload");
            HoteamUI.UIManager.MsgBox(msg);
            return false;
        }
    }
    return true;
}


InforCenter_GAC_Document_Create = function (para) {
    var callback = function (data, ret) {
        if (ret != null) {
            var files = ret.files;
            if (files[0].hint != undefined) {
                var msg = HoteamUI.Language.Lang("Common", "UploadError")
                HoteamUI.UIManager.MsgBox(msg);
            } else {
                if (ret.files != null) {
                    var vaultData = HoteamUI.DataService.Call("InforCenter.Organization.FileManageService.GetVaultForUpload", {});
                    $(files).each(function (i, file) {
                        file.path = vaultData.BasePath;
                        file.vault = vaultData.Name;
                    });
                    var resultData = HoteamUI.DataService.Call("Hoteam.smartPdm.PLMDocumentService.SaveDocumentData", { para: { FileList: files, SelectNode: treeNodeId, AuthorizeFormParent: files.inheritPermission } });
                    var result = false;
                    if (resultData != "") {
                        //如果传进来了树节点ID则加关系
                        if (treeNodeId != "" && treeNodeId != undefined && treeNodeId != null && linkTypeName != "") {
                            result = HoteamUI.DataService.Call("Hoteam.smartPdm.PLMDocumentService.AddDocumentLink", { para: { DocumentID: resultData, LinkName: linkTypeName, TreeParentNodeObjectID: treeNodeId } });
                        }
                    }
                    if (result == true || result == "") {
                        var retDatas = [];
                        var retData = {};
                        retData.EID = resultData;
                        retDatas.push(retData);
                        InforCenter_Platform_MenuCtrl_InnerReceiveServerData(para[0], retDatas);
                    }
                }
            }
        }
    }

    HoteamUI.UIManager.Popup({ pagename: "UploadFilePage", paras: para, callback: callback });
}


InforCenter_GAC_PLUpload_Click = function (ctrlEvent, objectType, infoName) {
    var callback = function (data, ret) {
        if (ret != null) {
            var files = ret.files;
            if (files[0].hint != undefined) {
                var msg = HoteamUI.Language.Lang("Common", "UploadError")
                HoteamUI.UIManager.MsgBox(msg);
            } else {
                var fileText = '';
                var fileValue = [];
                for (var i in files) {
                    var curFile = files[i];
                    if (typeof curFile == 'string' || typeof curFile == "boolean") continue;
                    var tempFileInFo = {};
                    tempFileInFo.FileSize = curFile.size;
                    tempFileInFo.FileName = curFile.name;
                    tempFileInFo.FileType = curFile.name.substr(curFile.name.lastIndexOf('.') + 1);
                    tempFileInFo.Path = data.path + "//" + curFile.target_name;
                    tempFileInFo.VaultName = data.vault;
                    tempFileInFo.UploadUser = '';
                    tempFileInFo.UploadTime = '';
                    fileValue.push(tempFileInFo);
                    fileText += ';' + curFile.name;
                }
                if (fileText != '') {
                    var o = HoteamUI.Control.Instance(data.id);
                    o.SetText(fileText.substr(1));
                    o.SetValue(JSON.stringify(fileValue));
                    var functionName = "InforCenter_" + objectType + "_" + infoName + "_PLUploadValue";
                    if (window[functionName] && typeof window[functionName] == "function") {
                        return window[functionName](ctrlEvent, ret);
                    }
                }
            }
        }
    }
    var para = {};
    //获取页面参数
    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    //获取页面参数
    para = page.GetPara();
    var vaultData = HoteamUI.DataService.Call("InforCenter.Organization.FileManageService.GetVaultForUpload", {});
    HoteamUI.UIManager.Popup("UploadFilePage", para, callback, { id: ctrlEvent.o.id, path: vaultData.BasePath, vault: vaultData.Name });

}


Hoteam_MES_AttachFile_OnUpload = function (para) {
    var callback = function (data, ret) {
        if (ret != null) {
            var files = ret.files;
            if (files[0].hint != undefined) {

            } else {
                var fileText = '';
                var fileValue = [];
                for (var i in files) {
                    var curFile = files[i];
                    if (typeof curFile == 'string' || typeof curFile == "boolean") continue;
                    var tempFileInFo = {};
                    tempFileInFo.FileSize = curFile.size;
                    tempFileInFo.FileName = curFile.name;
                    tempFileInFo.FileType = curFile.name.substr(curFile.name.lastIndexOf('.') + 1);
                    tempFileInFo.Path = data.path + "//" + curFile.target_name;
                    tempFileInFo.VaultName = data.vault;
                    tempFileInFo.UploadUser = '';
                    tempFileInFo.UploadTime = '';
                    fileValue.push(tempFileInFo);
                    fileText += ';' + curFile.name;
                }
                if (fileText != '') {
                    var uploadFileValue = JSON.stringify(fileValue);
                    var retStr = HoteamUI.DataService.Call("Hoteam.InforCenter.EXCService.UploadArrachFileToQuantity",
                              { para: { ObjectID: data[1].ObjectID, Content: uploadFileValue, Type: data[1].Type } });
                    if (!HoteamUI.Common.IsNullOrEmpty(retStr)) {
                        InforCenter_Platform_MenuCtrl_InnerReceiveServerData(data[0], { confirm: "OK", EID: retStr });
                    }
                }
            }
        }
    }
    var vaultData = HoteamUI.DataService.Call("InforCenter.Organization.FileManageService.GetVaultForUpload", {});
    para.path = vaultData.BasePath;
    para.vault = vaultData.Name;
    HoteamUI.UIManager.Popup({ pagename: "UploadFilePage", paras: para, callback: callback, data: para });

}

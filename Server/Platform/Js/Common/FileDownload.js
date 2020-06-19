//控件加载完成
InforCenter_Platform_FileDownloadCtrl_OnCreateComplete = function (ctrlEvent) {

}

//整理下载文件格式
InforCenter_Platform_FileDownloadPage_GetFilesInfo = function (data) {
    if (HoteamUI.Common.IsNullOrEmpty(data) == false
        && data.length > 0) {
        var newFileInfo = new Array(0);

        InforCenter_Platform_FileDownloadPage_GetFileInfoByData(data, newFileInfo);
        if (newFileInfo.length > 0) {
            var returnFileInfo = { FileList: newFileInfo };
            return JSON.stringify(returnFileInfo);
        }
        else {
            return null;
        }
    }
    else {
        return null;
    }
};

InforCenter_Platform_FileDownloadPage_GetFileInfoByData = function (data, newFileInfo) {
    var index = 0;
    for (var i = 0; i < data.length; i++) {
        var fileInfo = data[i];
        if (HoteamUI.Common.IsNullOrEmpty(fileInfo) == false
            && HoteamUI.Common.IsNullOrEmpty(fileInfo.File) == false
            && HoteamUI.Common.IsNullOrEmpty(fileInfo.Vault) == false) {
            newFileInfo[index] = {};
            newFileInfo[index].ServerIP = fileInfo.Vault.IP;
            newFileInfo[index].ServerPort = fileInfo.Vault.Port;
            newFileInfo[index].DistributeIP = fileInfo.Vault.DistributeIP;
            newFileInfo[index].DistributePort = fileInfo.Vault.DistributePort;
            newFileInfo[index].Volumn = fileInfo.Vault.Volumn;
            newFileInfo[index].Srcpath = fileInfo.File.Path;
            if (fileInfo.ChildFileList != null && fileInfo.ChildFileList.length > 0) {
                newFileInfo[index].ChildFiles = new Array(0);
                InforCenter_Platform_FileDownloadPage_GetFileInfoByData(fileInfo.ChildFileList, newFileInfo[index].ChildFiles);
            }
            newFileInfo[index].IsFolder = fileInfo.IsFolder;
            newFileInfo[index].Path = "~\\\\" + fileInfo.File.FileName;
            index++;
        }
    }
}

InforCenter_Platform_FileDownloadPage_GetFileInfoByData = function (data, newFileInfo) {
    var index = 0;
    for (var i = 0; i < data.length; i++) {
        var fileInfo = data[i];
        if (HoteamUI.Common.IsNullOrEmpty(fileInfo) == false
            && HoteamUI.Common.IsNullOrEmpty(fileInfo.File) == false
            && HoteamUI.Common.IsNullOrEmpty(fileInfo.Vault) == false) {
            newFileInfo[index] = {};
            newFileInfo[index].ServerIP = fileInfo.Vault.IP;
            newFileInfo[index].ServerPort = fileInfo.Vault.Port;
            newFileInfo[index].DistributeIP = fileInfo.Vault.DistributeIP;
            newFileInfo[index].DistributePort = fileInfo.Vault.DistributePort;
            newFileInfo[index].Volumn = fileInfo.Vault.Volumn;
            newFileInfo[index].Srcpath = fileInfo.File.Path;
            if (fileInfo.ChildFileList != null && fileInfo.ChildFileList.length > 0) {
                newFileInfo[index].ChildFiles = new Array(0);
                InforCenter_Platform_FileDownloadPage_GetFileInfoByData(fileInfo.ChildFileList, newFileInfo[index].ChildFiles);
            }
            newFileInfo[index].IsFolder = fileInfo.IsFolder;
            newFileInfo[index].Path = "~\\\\" + fileInfo.File.FileName;
            index++;
        }
    }
}

//文件下载完成
InforCenter_Platform_FileDownloadCtrl_OnDownloadSuccess = function (ctrlEvent) {
    var btnOkCtrl = ctrlEvent.o.OtherControl('btnOK');
    btnOkCtrl.Enable();
}

//页面确定返回
InforCenter_Platform_FileDownloadPage_OnOK = function (ctrlEvent) {
    var ret = {};
    ret.confirm = "OK";
    HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), ret);
}


InforCenter_Platform_FileDownloadPage_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var btnOkCtrl = page.GetControl('btnOK');
    btnOkCtrl.Disable();
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    var files = InforCenter_Platform_FileDownloadPage_GetFilesInfo(pagePara.data);

    if (HoteamUI.Common.IsNullOrEmpty(files) == false) {
        //下载数据
        var fileDownloadCtrl = pageEvent.o.GetControl("FileDownloadCtrl");
        fileDownloadCtrl.DownLoad(files);
    }
    else {
        //未找到符合条件的下载数据
        var callback = function (data, ret) {
            HoteamUI.UIManager.Return(page.pid, null);
        }
        var msgPara = { pageMode: "OK", context: "FileDownloadPage", labelName: "NoFileFound" };
        HoteamUI.UIManager.Popup("Confirm", msgPara, callback, {});
    }
}
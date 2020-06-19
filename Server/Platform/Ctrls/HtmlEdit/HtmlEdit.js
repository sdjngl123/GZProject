//重写HtmlEdit控件的Upload方法
$.hoteamHtmlEdit.upload = function (kindeditor) {
    var callback = function (data, ret) {
        if (HoteamUI.Common.IsNullOrEmpty(data) == true || HoteamUI.Common.IsNullOrEmpty(ret) == true || ret.confirm != 'OK') {
            return;
        }
        var fileInformation = JSON.parse(ret.UploadFileValue);
        if (fileInformation) {
            if (fileInformation[0]) {
                fileInformation = fileInformation[0];
                var vault = HoteamUI.DataService.Call('InforCenter.FileManage.FileManageService.GetVaultForUpload', {});
                htmlEdit_urlRet = 'http://' + vault.IP + ':' + vault.Port + '/' + vault.Volumn + '/' + fileInformation.Path;
                kindeditor.exec('insertimage', htmlEdit_urlRet);
            }
        }
    }
    HoteamUI.UIManager.Popup('FileUploadPage', { SingleUpload: true }, callback, {});
    
}


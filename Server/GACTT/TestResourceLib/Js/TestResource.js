HoteamUI_PageEvent_EXTERNALLYRESOURCECREATEOnCreate_after = function (pageEvent) {


}

HoteamUI_PageEvent_TESTEXTORGCREATEOnGetDataFromPage_after = function (pageEvent) {
    InforCenter_Platform_Object_Data.ENAME = InforCenter_Platform_Object_Data.UNIT;
}

HoteamUI_PageEvent_EXTERNALLYRESOURCECREATEOnSetInfoDataSource_after = function (pageEvent) {
    var page = pageEvent.o;
    var para = page.GetPara();
    var nameCtrl = page.GetControl('ENAME_Value');
    if (nameCtrl.id != '') {
        var objectId = nameCtrl.GetValue();
        var data = InforCenter_Platform_Object_GetObjectData(objectId, para);
        var typeCtrl = page.GetControl('TYPE_Value');
        var codeCtrl = page.GetControl('ECODE_Value');
        typeCtrl.SetSelectedByValue(data.TYPE);
        codeCtrl.SetText(data.ECODE);
        typeCtrl.Disable();
        codeCtrl.Disable();
    }
}

HoteamUI_PageEvent_EXTERNALLYRESOURCEEDITOnSetInfoDataSource_after = function (pageEvent) {
    var page = pageEvent.o;
    var para = page.GetPara();
    var nameCtrl = page.GetControl('ENAME_Value');
    if (nameCtrl.id != '') {
        var objectId = nameCtrl.GetValue();
        var data = InforCenter_Platform_Object_GetObjectData(objectId, para);
        var typeCtrl = page.GetControl('TYPE_Value');
        var codeCtrl = page.GetControl('ECODE_Value');
        typeCtrl.SetSelectedByValue(data.TYPE);
        codeCtrl.SetText(data.ECODE);
        typeCtrl.Disable();
        codeCtrl.Disable();
    }
}

Hoteam_TestResourceLib_AttachFile_OnUpload = function (para) {
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
                    var retStr = HoteamUI.DataService.Call("Hoteam.InforCenter.TestResourceLibService.UploadAttachFileToResource",
                        { para: { ObjectID: data[1].ObjectID, Content: uploadFileValue } });
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

Hoteam_TestResourceLib_AttachFile_Download = function (para) {
    var data = InforCenter_Platform_Object_GetObjectData(para[1].ObjectID, null);
    if (data) {
        var vaultData = HoteamUI.DataService.Call("InforCenter.Organization.FileManageService.GetVaultForUpload", {});
        var fileData = JSON.parse(data.FILEINFO);
        if (isArray(fileData)) {
            fileData = fileData[0];
        }
        var url = 'http://' + vaultData.IP + ':' + vaultData.Port + '/' + vaultData.Volumn + '/' + fileData.Path;
        window.open(url);
    }
}

HoteamUI_PageEvent_TESTKNOWLEDGECREATEOnCreate_after = function (pageEvent) {
    var page = pageEvent.o;
    var para = page.GetPara();
    var typeCtrl = page.GetControl('TYPE_Value');
    typeCtrl.SetSelectedByValue(para.TypeId);
    typeCtrl.Disable();
}

HoteamUI_PageEvent_TESTKNOWLEDGEEDITOnCreate_after = function (pageEvent) {
    var page = pageEvent.o;
    var typeCtrl = page.GetControl('TYPE_Value');
    typeCtrl.Disable();
}
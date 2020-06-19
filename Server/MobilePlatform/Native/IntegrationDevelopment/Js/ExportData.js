InforCenter_IntegrationDevelopment_MobilePageDev_ExportData = function (para) {
    var queryId = para[1].SelectID;
    var paras = { ObjectID: queryId };
    PlatformUI.UIManager.ExportFile.Call("InforCenter.Common.ObjectService.ExportTableRecords", paras, { filetype: "dbdata" });
    var ret = { confirm: "OK", EID: queryId };
    return ret;
};

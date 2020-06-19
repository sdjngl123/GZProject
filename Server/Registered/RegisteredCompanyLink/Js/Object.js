InforCenter_Platform_Object_GetForeignKeyObjectData = function (id, para) {
    if (HoteamUI.Common.IsNullOrEmpty(para)) {
        para = {};
    }
    var service = "InforCenter.Common.ObjectService.GetForeignKeyObject";
    if (HoteamUI.Common.IsNullOrEmpty(para.InitService) == false) {
        service = para.InitService;
    }

    para.ObjectID = id;
    if (para.OwnCompanyID) {
        para.ExtendJsonInfo = JSON.stringify({ OwnCompanyID: para.OwnCompanyID, ObjectID: id });
        service = "InforCenter.Common.RegisteredCompanyLinkService.GetForeignKeyObject";
    }
    var data = HoteamUI.DataService.Call(service, { para: para });
    var ret = JSON.parse(data)
    return ret;
}
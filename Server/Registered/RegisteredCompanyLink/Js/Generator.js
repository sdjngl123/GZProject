InforCenter_Registered_RelationCompanyValueGenerator_SetRelationCompanyValue = function (o, infoName, objType, fillEmpty) {
    var ret = HoteamUI.DataService.Call("InforCenter.Registered.RegisteredCompanyLinkService.GetRelationCompanyInfo", { });
    if (ret == null) {
        return;
    }
    
    o.LoadItems(ret);
}
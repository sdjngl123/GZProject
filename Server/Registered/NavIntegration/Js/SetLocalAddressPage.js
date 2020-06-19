InforCenter_NavIntegration_SetLocalAddressPage_OnCreate = function (pageEvent) {
    var companyID = pageEvent.o.GetPara().SelectID;
    if (companyID) {
        var company = InforCenter_Platform_Object_GetObjectData(companyID);
        if (company) {
            if (company.LOCALSOFTWAREADDRESS) {
                pageEvent.o.GetControl("LocalAddress_Value").SetText(company.LOCALSOFTWAREADDRESS);
            } else {
                pageEvent.o.GetControl("LocalAddress_Value").SetText("http://");
            }
        }
    }
}

InforCenter_NavIntegration_SetLocalAddressPage_OnOK = function (ctrlEvent) {
    var ctrl = ctrlEvent.o.OtherControl("LocalAddress_Value");
    if (ctrl.Check() == false) {
        return;
    }
    var companyID = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID()).GetPara().SelectID;
    var data = {};
    data.LOCALSOFTWAREADDRESS = ctrl.GetText();
    data.ObjectID = companyID;
    data.SelectID = companyID;

    var ret = InforCenter_Platform_Object_SaveObjectData(data, false, {});
    if (ret != null) {
        HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), new Array(ret));
    }
}
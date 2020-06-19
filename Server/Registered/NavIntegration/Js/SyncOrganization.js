InforCenter_Registered_NavIntegration_SyncOrganization = function (para) {
    var ret = HoteamUI.DataService.Call("InforCenter.Registered.NavIntegrationService.SyncOrganizaiton", {});
    if (ret == true) {
        HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("Registered.SyncOrganizaitonSuccess"));
    }
}
InforCenter_ThreeRolePlatformManagement_LockUnlock_LockUser = function (para) {
    var ret = HoteamUI.DataService.Call("InforCenter.ThreeRolePlatformManagement.ThreeRoleAuthPlatformService.LockUser", { para: { ExtendJsonInfo: JSON.stringify({ LockUserID: para[1].LockUserID }) } });
    if (ret == true) {
        InforCenter_Platform_MenuCtrl_InnerReceiveServerData(para[0], { confirm: "OK" });
    }
}
InforCenter_ThreeRolePlatformManagement_LockUnlock_UnLockUser = function (para) {
    var ret = HoteamUI.DataService.Call("InforCenter.ThreeRolePlatformManagement.ThreeRoleAuthPlatformService.UnLockUser", { para: { ExtendJsonInfo: JSON.stringify({ LockUserID: para[1].LockUserID }) } });
    if (ret == true) {
        InforCenter_Platform_MenuCtrl_InnerReceiveServerData(para[0], { confirm: "OK" });
    }
}


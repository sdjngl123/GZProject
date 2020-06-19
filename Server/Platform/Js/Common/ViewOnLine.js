//控件加载完成
InforCenter_Platform_ViewOnLineCtrl_OnCreateComplete = function (ctrlEvent) {
    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    var pagePara = page.GetPara();
    var data = pagePara.data[0];

    //获取当前用户
    var curUser = data.User;
    if (curUser == undefined || curUser == null || curUser == "") {
        curUser = HoteamUI.DataService.Call("InforCenter.Organization.OrganizationDataService.GetUserName", {});
    }

    ctrlEvent.o.ShowFileViewForm({
        ServerIP: data.Vault.IP,
        ServerPort: data.Vault.Port,
        DistributeIP: data.Vault.DistributeIP,
        DistributePort: data.Vault.DistributePort,
        Volumn: data.Vault.Volumn,
        Path: data.File.Path,
        User: curUser,
        AllowPrint: data.AllowPrint
    }, data.OnlyView);
}


//重写新建 编辑组织时 文档柜显示
InforCenter_Platform_Object_SetVaultList = function (o, fillEmpty) {
    //判断是本地文档柜还是自动分配的文档柜
    var companyVault = HoteamUI.DataService.Call("InforCenter.Platform.RegisteredDataService.GetCompanyVaultInfoList", {});
    if (!companyVault) {
        return;
    }
    companyVault = JSON.parse(companyVault);
    if (companyVault != null && companyVault != undefined) {
        o.LoadItems(companyVault);

    } else {
        var ret = HoteamUI.DataService.Call("InforCenter.Platform.FileManageService.GetVaultList", {});
        if (ret == null) {
            return;
        }
        var empty = new Array(0);
        var step = 0;
        if (fillEmpty) {
            if (ret.length > 0 && ret[0].Value && ret[0].Value != "") {
                empty[0] = { Value: "", Text: "" };
                step = 1;
            }
        }
        for (var x = 0; x < ret.length; x++) {
            empty[x + step] = { Value: ret[x].Key, Text: ret[x].Value };
        }
        o.LoadItems(empty);
    }
}

InforCenter_Registered_SetLocalFileServiceAddress_OnCreate = function (pageEvent) {
    //判断是否是自动分配的，自动分配的不需要自动添加IP和端口号
    var data = HoteamUI.DataService.Call("InforCenter.Registered.RegisteredDataService.GetCompanyFileServiceInfo", {});
    if (!data) {
        return data;
    }
    data = JSON.parse(data);
    if (data.IsLocal == true && data.Info) {
        pageEvent.o.GetControl("IP_Value").SetText(data.Info.IP);
        pageEvent.o.GetControl("Port_Value").SetText(data.Info.Port);
        pageEvent.o.GetControl("Volumn_Value").SetText(data.Info.Volumn);
    }
}

InforCenter_Registered_SetLocalFileServiceAddress_OnOK = function (ctrlEvent) {
    var ctrl = ctrlEvent.o.OtherControl("Info_Container");
    if (ctrl.Check() == false) {
        return;
    }
    var ip = ctrlEvent.o.OtherControl("IP_Value").GetText();
    var port = ctrlEvent.o.OtherControl("Port_Value").GetText();
    var volumn = ctrlEvent.o.OtherControl("Volumn_Value").GetText();
    var para = {};
    para.IP = ip;
    para.Port = port;
    para.Volumn = volumn;

    var success = HoteamUI.DataService.Call("InforCenter.Registered.RegisteredDataService.SaveLocalFileService", { para: { ExtendJsonInfo: JSON.stringify(para) } });
    if (success == true) {
        HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), { confirm: "OK" });
    }

}

InforCenter_Registered_SetLocalFileServiceAddress_Check = function (para) {
    var isLocal = HoteamUI.DataService.Call("InforCenter.Registered.RegisteredDataService.CompanySetFileServiceOrNot", {});
    if (isLocal == false) {
        //没有设置过
        var callback = function (data, ret) {
            if (ret && ret.confirm == "OK") {
                InforCenter_Platform_MenuCtrl_InnerReceiveServerData(para[0], { confirm: "OK" });
            }
        }
        var msg = HoteamUI.Language.Lang("AuditRegisterUser.NoSetLocalFileService");
        HoteamUI.UIManager.Popup("Confirm", { pageMode: "OkCancel", message: msg }, callback);
    } else if (isLocal == true) {
        InforCenter_Platform_MenuCtrl_InnerReceiveServerData(para[0], { confirm: "OK" });
    }
}
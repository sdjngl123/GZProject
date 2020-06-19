InforCenter_Platform_Registered_AuditPass = function (para) {
    var datapara = {};
    datapara.AuditCompanyID = para[1].SelectID;
    datapara.AuditResult = para[1].AuditResult;
    datapara.IsRootCompany = para[1].IsRootCompany;
    datapara.IncludeExtend = para[1].IncludeExtend; 

    var extendcallback = function (ret) {
        var pageID = HoteamUI.Page.ParentPage(HoteamUI.Page.ParentPage(para[0].ContainerID));
        var callback = function (result, data) {
            HoteamUI.Window.WaitWindow.LayoutDestory(pageID);
            if (result == true) {
                HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("AuditRegisterUser.AuditPassSuccess"));
                InforCenter_Platform_MenuCtrl_InnerReceiveServerData(para[0], { confirm: "OK" });
            }
        }
        if (ret && ret.ExtendInfo) {
            datapara.ExtendInfo = ret.ExtendInfo;
        }
        var pageDataService = {};
        pageDataService.serviceuri = "Hoteam.Platform.RegisteredDataService.SetUserRegisterAudit";
        pageDataService.callback = callback;
        pageDataService.paras = {
            para: {
                ExtendJsonInfo: JSON.stringify(datapara)
            }
        };

        pageDataService.errorCallback = function () {
            HoteamUI.Window.WaitWindow.LayoutDestory(pageID);
        };
        HoteamUI.Window.WaitWindow.LayoutShow(pageID);
        HoteamUI.DataService.AsyncCall(pageDataService);
    }
    if (datapara.IncludeExtend == "true") {
        InforCenter_Platform_Registered_ExecAuditExtend(datapara, extendcallback);
    } else {
        var ret = {};
        extendcallback(ret);
    }
}

InforCenter_Platform_Registered_ExecAuditExtend = function (datapara, callback) {
    //在自己组件进行实现
    var ret = {};
    callback(ret);
}

InforCenter_Platform_Registered_CheckDeleteRegisterUser = function (para) {
    //验证是否可以删除，只有审核状态为未审核的，才允许删除
    var companyID = para[1].SelectID;
    var canDelete = HoteamUI.DataService.Call("Hoteam.Platform.RegisteredDataService.CheckDeleteRegisterUser", { para: { ExtendJsonInfo: JSON.stringify({ DeleteCompanyID: companyID }) } });
    if (canDelete == true) {
        InforCenter_Platform_MenuCtrl_InnerReceiveServerData(para[0], { confirm: "OK" });
    }
}

InforCenter_Platform_Registered_AuditUnPassCheck = function (para) {
    //设置不通过前 验证是否审核通过 已经通过的，不允许设置不通过
    var companyID = para[1].SelectID;
    var canDelete = HoteamUI.DataService.Call("Hoteam.Platform.RegisteredDataService.CheckAuditUnPass", { para: { ExtendJsonInfo: JSON.stringify({ CheckCompanyID: companyID }) } });
    if (canDelete == true) {
        InforCenter_Platform_MenuCtrl_InnerReceiveServerData(para[0], { confirm: "OK" });
    }
}
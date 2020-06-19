InforCenter_Platfrom_Registered_AddCompanyFriendPageOnOk = function (ctrlEvent) {
    var bCheck = true;
    var data = {};
    var companyFriend = ctrlEvent.o.OtherControl('CompanyFriend_Value');
    if (companyFriend.id != '') {
        if (companyFriend.Check() == false)
            bCheck = false;
        data.FriendCompanyID = companyFriend.GetSelectedValue();
        data.FriendCompanyName = companyFriend.GetSelectedText();

    }
    var c = ctrlEvent.o.OtherControl('DESCRIPTION_Value');
    if (c.id != '') {
        if (c.Check() == false)
            bCheck = false;
        data.Description = c.GetText().trim();
    }
    if (bCheck == false)
        return;

    var companyData = HoteamUI.DataService.Call("Hoteam.Platform.RegisteredCompanyLinkService.GetCompanyFriendDataByName", { para: { ExtendJsonInfo: JSON.stringify({ CompanyName: data.FriendCompanyName }) } });
    if (companyData == null || companyData == undefined) {
        return;
    }

    if (!data.FriendCompanyID) {
        HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("AuditRegisterUser.CompanyIsNull"))
        return;
    }
    
    var success = HoteamUI.DataService.Call("InforCenter.Registered.RegisteredCompanyLinkService.SaveCompanyFriendLink", { para: { ExtendJsonInfo: JSON.stringify(data) } });
    if (success == true) {
        HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), data);
    }
}

InforCenter_Platfrom_Registered_AddCompanyFriendPageCompanyFriendValueOnClick = function (ctrlEvent) {
    var value = ctrlEvent.o.GetValue();
    var callback = function (data, ret) {
        if (ret && ret.length > 0) {
            var eid = ret[0].EID;
            //验证关系是否可以添加
            var success = HoteamUI.DataService.Call("InforCenter.Registered.RegisteredCompanyLinkService.CheckCompanyFriendLink", { para: { ExtendJsonInfo: JSON.stringify({ FriendCompanyID: eid }) } });
            if (success == true) {
                ctrlEvent.o.SetText(ret[0].ENAME);
                ctrlEvent.o.SetValue(eid);
            }
        }
    }
    HoteamUI.UIManager.Popup("ListCommonQuery", { Value: value, ItemName: "SingleCompanyFriendLinkListQuery" }, callback, {}, "960*600");
}

InforCenter_Platform_Registered_AuditCompanyLink = function (para) {
    var datapara = {};
    datapara.AuditCompanyLinkID = para[1].SelectID;
    datapara.ApplyCompanyID = para[1].ApplyCompanyID;
    datapara.AcceptCompanyID = para[1].AcceptCompanyID;
    datapara.AuditResult = para[1].AuditResult;

    var pageID = HoteamUI.Page.ParentPage(HoteamUI.Page.ParentPage(para[0].ContainerID));
    var callback = function (result, data) {
        HoteamUI.Window.WaitWindow.LayoutDestory(pageID);
        if (result == true) {
            HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("AuditRegisterUser.AuditPassSuccess"));
            InforCenter_Platform_MenuCtrl_InnerReceiveServerData(para[0], { confirm: "OK" });
        }
    }
    var pageDataService = {};
    pageDataService.serviceuri = "Hoteam.Platform.RegisteredCompanyLinkService.AuditCompanyLink";
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

InforCenter_Platform_Registered_CheckCurrentIsRootCompany = function (para) {    
    var company = InforCenter_Platform_Object_GetObjectData(HoteamUI.Security.LoginPara.CompanyID);
    //判断是否为根企业(去掉根企业的判断)
    //if (company && (company.ISROOTCOMPANY == 1 || company.ISROOTCOMPANY == true)) {
    //    HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("AuditRegisterUser.RootCompanyCannotAddFriend"));
    //    return;
    //}
    if (company && (company.DATABASECONNECT == null || company.DATABASECONNECT == undefined)) {
        HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("AuditRegisterUser.SystemCompanyCannotAddFriend"));
        return;
    }
    InforCenter_Platform_MenuCtrl_InnerReceiveServerData(para[0], { confirm: "OK" });
}

InforCenter_Platfrom_Registered_AddCompanyFriendPageCompanyFriendValueOnFocusout = function (ctrlEvent) {
    var val = ctrlEvent.value;
    if (!val) {
        return;
    }
    var companyName = val;
    var companyData = HoteamUI.DataService.Call("Hoteam.Platform.RegisteredCompanyLinkService.GetCompanyFriendDataByName", { para: { ExtendJsonInfo: JSON.stringify({ CompanyName: companyName }) } });
    if (companyData != null && companyData != undefined) {
        var data = JSON.parse(companyData)
        ctrlEvent.o.SetData({ Text: data.ENAME, Value: data.EID });
    } else {
        ctrlEvent.o.SetData({ Text: val, Value: "" });
    }
}
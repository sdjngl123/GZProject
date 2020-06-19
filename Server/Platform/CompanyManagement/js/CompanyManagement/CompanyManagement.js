InforCenter_Platform_CompanyManagement_LookAtOrganizationOnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var pagepara = page.GetPara();

    var treePage = HoteamUI.Page.InstanceIn(page.pid, "TreeViewPage", "TreeViewCtrl");
    var treeCtrl = treePage.GetControl("TreeView");

    var para = {};
    para.TreeGuid = treeCtrl.id;
    para.PagePID = page.pid;
    var treepara = {};
    $.extend(true, treepara, para, pagepara);
    var data = InforCenter_Platform_TreeViewCtrl_LoadTreeView(treePage, treepara);
}

InforCenter_Platform_CompanyManagement_SetSystemPasswordOnOK = function (ctrlEvent) {
    //data获取页面数据
    var pwd = null;
    var txtNewPWD = ctrlEvent.o.OtherControl("NewPWD_Txt");
    var txtConfirmPWD = ctrlEvent.o.OtherControl("ConfirmPWD_Txt");

    var txtNewPWDTextboxCtrlId = txtNewPWD.id + "_TextBox",
        txtConfirmPWDTextboxCtrlId = txtConfirmPWD.id + "_TextBox",
        txtNewPWDTextboxCtrl = $("#" + txtNewPWDTextboxCtrlId),
        txtNewPWDTextboxCheckCtrl = $("#" + txtNewPWDTextboxCtrlId + "_check"),
        txtConfirmPWDTextboxCtrl = $("#" + txtConfirmPWDTextboxCtrlId),
        txtConfirmPWDTextboxCheckCtrl = $("#" + txtConfirmPWDTextboxCtrlId + "_check");

    if (HoteamUI.Common.IsNullOrEmpty(txtNewPWD) == false) {
        var newPWD = txtNewPWD.GetText();
    }
    if (HoteamUI.Common.IsNullOrEmpty(txtConfirmPWD) == false) {
        var confirmPWD = txtConfirmPWD.GetText();
    }

    var confirmPara = {};
    var newPDWChecked = false;
    var newPDWIsNull = true;
    var newPDWLengthChecked = false;
    var newPDWChecked = false;
    var controlID = null;
    var confirmChecked = false;
    var newPDWMessage = "";
    var confirmMessage = "";

    //验证新密码
    var regLength = new RegExp(/^[\S]{6,20}$/);
    if (regLength.test(newPWD) === false) {
        newPDWLengthChecked = true;
        newPDWMessage = HoteamUI.Language.Lang("ModifyPassword.NewPWDErr");
        txtNewPWDTextboxCheckCtrl.poshytip('update', newPDWMessage);
        $.hoteamToolTip.show(txtNewPWDTextboxCtrl, txtNewPWDTextboxCheckCtrl);
    }
    else {
        newPDWChecked = true;
        $.hoteamToolTip.hide(txtNewPWDTextboxCtrl, txtNewPWDTextboxCheckCtrl);
    }

    //确认新密码
    if (newPWD == confirmPWD) {
        confirmChecked = true;
        $.hoteamToolTip.hide(txtConfirmPWDTextboxCtrl, txtConfirmPWDTextboxCheckCtrl);
    }
    else {
        confirmMessage = HoteamUI.Language.Lang("ModifyPassword.ConfirmPWDErr");
        txtConfirmPWDTextboxCheckCtrl.poshytip('update', confirmMessage);
        $.hoteamToolTip.show(txtConfirmPWDTextboxCtrl, txtConfirmPWDTextboxCheckCtrl);
    }

    //保存新的密码
    if (newPDWChecked && confirmChecked) {
        //修改密码并加密

        var pagePara = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID()).GetPara();
        var companyInfo = InforCenter_Platform_Object_GetObjectData(pagePara.SelectID);
        if (!companyInfo) {
            var para = { pageMode: "OK", context: "SetSystemPassword", labelName: "CompanyNull" }
            HoteamUI.UIManager.Popup("Confirm", para, null, {});
            rturn;
        }
        pwd = EncryptDecrypt.Encrypt(newPWD, companyInfo.SYSTEMUSERID);
        var para = {
            para: {
                Password: pwd,
                SelectedCompanyID: pagePara.SelectID
            }
        }
        var result = HoteamUI.DataService.Call("Hoteam.InforCenter.CompanyRuleService.SetSystemPassword", para);
        var result = true;
        if (result == true) {
            var pid = ctrlEvent.o.ContainerID();
            HoteamUI.UIManager.Return(pid, null);
        }
        else {
            var para = { pageMode: "OK", context: "ModifyPassword", labelName: "Fail" }
            HoteamUI.UIManager.Popup("Confirm", para, null, {});
        }
    }
    else {
        if (!confirmChecked) {
            $("[cid='ConfirmPWD_Txt']>input").attr("value", "");
        }
        if (!newPDWChecked) {
            $("[cid='NewPWD_Txt']>input").attr("value", "");
        }

    }
}
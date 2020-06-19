//修改密码 确定
InforCenter_Platform_ModifyPassword_OKOnClick = function (ctrlEvent) {
    //data获取页面数据
    var pwd = null;
    var txtOriginalPDW = ctrlEvent.o.OtherControl("OriginalPWD_Txt");
    var txtNewPWD = ctrlEvent.o.OtherControl("NewPWD_Txt");
    var txtConfirmPWD = ctrlEvent.o.OtherControl("ConfirmPWD_Txt");

    var txtOriginalPDWTextboxCtrlId = txtOriginalPDW.id + "_TextBox",
        txtNewPWDTextboxCtrlId = txtNewPWD.id + "_TextBox",
        txtConfirmPWDTextboxCtrlId = txtConfirmPWD.id + "_TextBox",
        txtOriginalPDWTextboxCtrl = $("#" + txtOriginalPDWTextboxCtrlId),
        txtOriginalPDWTextboxCheckCtrl = $("#" + txtOriginalPDWTextboxCtrlId + "_check"),
        txtNewPWDTextboxCtrl = $("#" + txtNewPWDTextboxCtrlId),
        txtNewPWDTextboxCheckCtrl = $("#" + txtNewPWDTextboxCtrlId + "_check"),
        txtConfirmPWDTextboxCtrl = $("#" + txtConfirmPWDTextboxCtrlId),
        txtConfirmPWDTextboxCheckCtrl = $("#" + txtConfirmPWDTextboxCtrlId + "_check");

    if (HoteamUI.Common.IsNullOrEmpty(txtOriginalPDW) == false) {
        var originalPDW = txtOriginalPDW.GetText();
    }
    if (HoteamUI.Common.IsNullOrEmpty(txtNewPWD) == false) {
        var newPWD = txtNewPWD.GetText();
    }
    if (HoteamUI.Common.IsNullOrEmpty(txtConfirmPWD) == false) {
        var confirmPWD = txtConfirmPWD.GetText();
    }

    var confirmPara = {};
    var originalChecked = false;
    var originalPDWIsNull = true;
    var originalPDWIsSuccess = "";
    var newPDWChecked = false;
    var newPDWIsNull = true;
    var newPDWLengthChecked = false;
    var newPDWChecked = false;
    var controlID = null;
    var confirmChecked = false;
    var originalPDWMessage = "";
    var newPDWMessage = "";
    var confirmMessage = "";

    //验证旧密码
    if (HoteamUI.Common.IsNullOrEmpty(originalPDW) == false) {
        var userID = HoteamUI.Security.LoginPara.UserID;
        var dbPassword = EncryptDecrypt.Encrypt(originalPDW, userID);
        originalPDWIsNull = false;
        originalPDWIsSuccess = HoteamUI.DataService.Call("InforCenter.Organization.OrganizationDataService.CheckPassword", { para: { Password: dbPassword } });
    }

    if (originalPDWIsNull === true) {
        originalPDWMessage = HoteamUI.Language.Lang("ModifyPassword.OriginalPWDNull");
        txtOriginalPDWTextboxCheckCtrl.poshytip('update', originalPDWMessage);
        $.hoteamToolTip.show(txtOriginalPDWTextboxCtrl, txtOriginalPDWTextboxCheckCtrl);
    }
    else if (originalPDWIsSuccess == "") {
        originalPDWMessage = HoteamUI.Language.Lang("ModifyPassword.OriginalPWDErr");
        txtOriginalPDWTextboxCheckCtrl.poshytip('update', originalPDWMessage);
        $.hoteamToolTip.show(txtOriginalPDWTextboxCtrl, txtOriginalPDWTextboxCheckCtrl);
    }
    else {
        originalChecked = true;
        $.hoteamToolTip.hide(txtOriginalPDWTextboxCtrl, txtOriginalPDWTextboxCheckCtrl);
    }

    //获取密码策略
    var policy = HoteamUI.DataService.Call("InforCenter.ThreeRolePlatformManagement.ThreeRoleAuthPlatformService.GetUserNameAndPasswordPolicy", {});
    if (policy) {
        policy = JSON.parse(policy);
        var length = policy.PasswordLength;
        if (length > 0 && newPWD.length < length) {
            newPDWMessage += ";" + policy.PasswordLengthError;
        }
        if (policy.PasswordCombin) {
            var validate = HoteamUI.DataService.Call("InforCenter.ThreeRolePlatformManagement.ThreeRoleAuthPlatformService.ValidatePassowrdCombin", { para: { ExtendJsonInfo: JSON.stringify({ PasswordCombin: policy.PasswordCombin, Password: newPWD }) } });
            if (validate != true) {
                newPDWMessage += ";" + policy.PasswordCombinError;
            }
        }
        if (newPDWMessage.length > 0) {
            newPDWMessage = newPDWMessage.substring(1);
            txtNewPWDTextboxCheckCtrl.poshytip('update', newPDWMessage);
            $.hoteamToolTip.show(txtNewPWDTextboxCtrl, txtNewPWDTextboxCheckCtrl);
        } else {
            newPDWChecked = true;
            $.hoteamToolTip.hide(txtNewPWDTextboxCtrl, txtNewPWDTextboxCheckCtrl);
        }
    } else {
        //使用原来的方式验证新密码
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
    if (originalChecked && newPDWChecked && confirmChecked) {
        //修改密码并加密
        pwd = EncryptDecrypt.Encrypt(newPWD, userID);
        var para = {
            para: {
                Password: pwd
            }
        }
        var result = HoteamUI.DataService.Call("InforCenter.ThreeRolePlatformManagement.ThreeRoleAuthPlatformService.SavePassword", { para: { ExtendJsonInfo: JSON.stringify({ Password: pwd }) } });
        if (result == true) {
            var pid = ctrlEvent.o.ContainerID();
            HoteamUI.UIManager.Return(pid, { confirm: "OK" });
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
        if (!originalChecked) {
            $("[cid='OriginalPWD_Txt']>input").attr("value", "").focus();
        }
    }
}

var changed = false;
Hoteam_Mobile_MobileUserInfo_Init = function (pageEvent) {
    if (HMUI.AppSets.MobileDevice == "Phone") {
        HMUI.MobileCommon.SetHeaderText(HMUI.Language.Lang("MobileUserInfo", "Title"));
        HMUI.MobileCommon.ShowHeaderBackButton();
    }
};

Hoteam_Mobile_MobileUserInfo_CheckRePassword = function () {
    var usernewpassword = $('#usernewpassword').val();
    var userrenewpassword = $('#userrenewpassword').val();

    if (usernewpassword != userrenewpassword) {
        $("#userrenewpasswordtip").html("两次密码输入不一致!");
        return;
    }
};

/*修改密码*/
Hoteam_Mobile_MobileUserInfo_UpdatePassword = function () {
    $('#useroldpasswordtip').html("");
    $('#usernewpasswordtip').html("");
    $("#userrenewpasswordtip").html("");

    if (HMUI.Window.CheckIsOffLine()) {
        HMUI.UIManager.MsgBox(HMUI.Language.Lang("MobileLogin.OfflineDisableOperate"));
        return;
    }
    var useroldpassword = $('#useroldpassword').val();
    var usernewpassword = $('#usernewpassword').val();
    var userrenewpassword = $('#userrenewpassword').val();
    var UserId = HMUI.MobileCommon.GetAppSetting("MobileLoginUserID");

    if (!HMUI.Common.IsNullOrEmpty(UserName)) {
        UserName = UserName.toLowerCase();
    }
    if (HMUI.Common.IsNullOrEmpty(useroldpassword)) {
        $('#useroldpasswordtip').html("请输入旧密码!");
        return;
    }
    var flag = HMUI.DataService.Call("Hoteam.Mobile.SettingService.CheckPassword", { para: { Password: EncryptDecrypt.Encrypt(useroldpassword, UserId.toLowerCase()), ID: UserId} });
    if (!flag) {
        $('#useroldpasswordtip').html("旧密码错误，不允许修改!");
        return;
    }
    if (HMUI.Common.IsNullOrEmpty(usernewpassword)) {
        $('#usernewpasswordtip').html("请输入新密码!");
        return;
    }
    if (usernewpassword.length < 3) {
        $("#usernewpasswordtip").html("密码长度应大于等于3!");
        return;
    }
    if (usernewpassword.length > 45) {
        $("#usernewpasswordtip").html("密码长度最大为45!");
        return;
    }
    if (HMUI.Common.IsNullOrEmpty(userrenewpassword)) {
        $('#userrenewpasswordtip').html("请输入确认密码!");
        return;
    }
    if (usernewpassword != userrenewpassword) {
        $("#userrenewpasswordtip").html("两次密码输入不一致!");
        return;
    }

    var flag = HMUI.DataService.Call("Hoteam.Mobile.SettingService.SavePersonalSetting", { para: { Password: EncryptDecrypt.Encrypt(usernewpassword, UserId.toLowerCase()), ID: UserId} });
    if (flag) {
        $("#userrenewpasswordtip").html("修改成功");
        $('#useroldpassword').val("");
        $('#usernewpassword').val("");
        $('#userrenewpassword').val("");
        changed = true;
    }
    else {
        $("#userrenewpasswordtip").html("修改失败");
    }
};


Hoteam_Mobile_MobileUserInfo_CheckInputValueOnblur = function (len, isrequired, obj, tip, ismsgbox) {

    setTimeout(function () {
        if (obj) {
            HMUI.CheckInputValue(len, isrequired, obj, tip, ismsgbox);
        }
    }, 0);
};

Hoteam_Mobile_MobileUserInfo_UpdatePasswordOnblur = function (len, isrequired, obj, tip, ismsgbox) {

    setTimeout(function () {
        if (obj && changed == false) {
            HMUI.CheckInputValue(len, isrequired, obj, tip, ismsgbox);
            Hoteam_Mobile_MobileUserInfo_CheckRePassword();
        }
    }, 0);
};






InforCenter_ThreeRolePlatformManagement_ThreeRoleAuthTabs_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var para = page.GetPara();
    var mode = para.Mode;
    if (mode != 'Global') {
        var selectID = para.SelectID;
    }
    var types = HoteamUI.DataService.Call("InfroCenter.ThreeRolePlatformManagement.ThreeRoleAuthPlatformService.GetThreeRoleAuthTypePage", { para: { ExtendJsonInfo: JSON.stringify({ Mode: mode, SelectID: selectID }) } });
    if (types) {
        types = JSON.parse(types);
        var tabs = page.GetControl("Tabs");
        //获取认证策略Tab
        tabs.AddTab({
            pageName: "ThreeRoleAuthSelect",
            text: HoteamUI.Language.Lang("ThreeRoleAuthSelect.Title"),
            pageParas: { Auth: types.Auth },
            isSelected: true,
            delayLoadPage: false,
            tabId: "ThreeRoleAuthSelect"
        });

        tabs.AddTab({
            pageName: "ThreeRoleAuthTypeCombin",
            text: HoteamUI.Language.Lang("ThreeRoleAuthTypeCombin.Title"),
            pageParas: { AuthType: types.AuthType },
            isSelected: true,
            delayLoadPage: false,
            tabId: "ThreeRoleAuthTypeCombin"
        });

        for (var i = 0; i < types.DataList.length; i++) {
            tabs.AddTab({
                pageName: types.DataList[i].PageName,
                text: types.DataList[i].Text,
                pageParas: { Name: types.DataList[i].Value, Data: types.DataList[i].Data },
                isSelected: true,
                delayLoadPage: false,
                tabId: types.DataList[i].PageName
            });
        }
    }

}

InforCenter_ThreeRolePlatformManagement_ThreeRoleAuthSelect_OnCreate = function (pageEvent) {
    var types = HoteamUI.DataService.Call("InfroCenter.ThreeRolePlatformManagement.ThreeRoleAuthPlatformService.GetThreeRoleAuth", {});
    pageEvent.o.GetControl("Select_Value").LoadItems(types);

    var para = pageEvent.o.GetPara();
    if (para && para.Auth) {
        pageEvent.o.GetControl("Select_Value").SetSelectedByValue(para.Auth);
    }
}

InforCenter_ThreeRolePlatformManagement_ThreeRoleAuthTypeCombin_Create = function (pageEvent) {
    var types = HoteamUI.DataService.Call("InfroCenter.ThreeRolePlatformManagement.ThreeRoleAuthPlatformService.GetThreeRoleAuthType", {});
    if (types && types.length > 0) {
        pageEvent.o.GetControl("ThreeRoleAuthTypeCombin_CheckboxPad").LoadData(types);

        var para = pageEvent.o.GetPara();
        var data = [];
        if (para && para.AuthType) {
            var authTypes = para.AuthType.split(';');
            for (var i = 0; i < authTypes.length; i++) {
                var item = {};
                item.Name = authTypes[i];
                item.Value = "1";
                data.push(item);
            }
            pageEvent.o.GetControl("ThreeRoleAuthTypeCombin_CheckboxPad").SetData(data);
        } else {
            //未设置时用户名密码默认选中
            pageEvent.o.GetControl("ThreeRoleAuthTypeCombin_CheckboxPad").SetData([{ Name: "UserNameAndPassword", Value: "1" }]);
        }
    }
}

InforCenter_ThreeRolePlatformManagement_ThreeRoleAuthTabs_OnOK = function (ctrlEvent) {
    var para = {};
    var pagePara = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID()).GetPara();
    var mode = pagePara.Mode;
    if (mode != 'Global') {
        var selectID = pagePara.SelectID;
    }

    //获取认证策略
    var tabs = ctrlEvent.o.OtherControl("Tabs");
    //获取认证方式组合
    var infos = tabs.GetTabInfoList();
    var selectvalue = HoteamUI.Page.Instance(infos[0].pid).GetControl("Select_Value").GetSelectedValue();
    if (!selectvalue || selectvalue.length <= 0) {
        HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("ThreeRoleAuthSelect.SelectIsNull"));
        return;
    }
    
    para.Auth = selectvalue;

    var authTypecheckbox = HoteamUI.Page.Instance(infos[1].pid).GetControl("ThreeRoleAuthTypeCombin_CheckboxPad").GetData("1");
    //获取各个配置项
    if (!authTypecheckbox || authTypecheckbox.length <= 0) {
        HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("ThreeRoleAuthTypeCombin.AuthTypeIsNull"));
        return;
    }
    if ((selectvalue == 'CombinAuth' || selectvalue == 'MultiAuth') && authTypecheckbox.length <= 1) {
        HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("ThreeRoleAuthTypeCombin.AuthTypeIsNotSingle"));
        return;
    }
    if (selectvalue == 'SingleAuth' && authTypecheckbox.length > 1) {
        HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("ThreeRoleAuthTypeCombin.AuthTypeIsSingle"));
        return;
    }

    var authType = "";
    for (var i = 0; i < authTypecheckbox.length; i++) {
        authType += ";" + authTypecheckbox[i].Name;
    }
    if (authType.length > 0) {
        authType = authType.substring(1);
    }
    para.AuthType = authType;

    para.TypeData = [];
    for (var i = 2; i < infos.length; i++) {
        //判断该策略是否选中，选中的才进行验证
        var exist = false
        for (var j = 0; j < authTypecheckbox.length; j++) {
            if (infos[i].pageParas && infos[i].pageParas.Name) {
                if (infos[i].pageParas.Name == authTypecheckbox[j].Name) {
                    exist = true;
                }
            }
        }
        if (exist == true) {
            if (HoteamUI.Page.FirePageEvent(infos[i].pid, "OnCheck", {})) {
                var data = {};
                data.AuthType = infos[i].pageParas.Name;
                data.Data = HoteamUI.Page.FirePageEvent(infos[i].pid, "OnGetData", {});
                para.TypeData.push(data);

            } else {
                HoteamUI.UIManager.MsgBox(infos[i].text + HoteamUI.Language.Lang("ThreeRoleAuthTabs.ExistInvalid"));
                return;
            }
        }

    }

    var ret = HoteamUI.DataService.Call("InforCenter.ThreeRolePlatformManagement.ThreeRoleAuthPlatformService.SaveThreeRoleAuth", { para: { ExtendJsonInfo: JSON.stringify({ Data: JSON.stringify(para), Mode: mode, SelectID: selectID }) } });
    if (ret == true) {
        HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), { confirm: "OK" });
    }

}

InforCenter_ThreeRolePlatformManagement_ThreeRoleAuthDomain_OnCheck = function (pageEvent) {
    return pageEvent.o.GetControl("Info_Container").Check();
}
InforCenter_ThreeRolePlatformManagement_ThreeRoleAuthKey_OnCheck = function (pageEvent) {
    return pageEvent.o.GetControl("Info_Container").Check();
}
InforCenter_ThreeRolePlatformManagement_ThreeRoleAuthPasswordPolicy_Create = function (pageEvent) {
    var ret = HoteamUI.DataService.Call("InforCenter.Enumeration.EnumerationService.GetEnumerationItem", { para: { EnumerationName: "ThreeRolePasswordPolicyCombin" } });
    if (ret == null) {
        return;
    }
    var empty = new Array(0);
    var step = 0;

    for (var x = 0; x < ret.length; x++) {
        x = parseInt(x);
        empty[x + step] = { Value: ret[x].Key, Text: ret[x].Value };
    }
    pageEvent.o.GetControl("PasswordCombinContent").LoadItems(empty);
    pageEvent.o.GetControl("PasswordLengthContent").SetText('6');

    var para = pageEvent.o.GetPara();
    if (para && para.Data) {
        var data = JSON.parse(para.Data);
        if (data.PasswordStroncy) {
            if (data.PasswordStroncy.PasswordLength) {
                pageEvent.o.GetControl("PasswordLengthContent").SetText(data.PasswordStroncy.PasswordLength);
            }
            if (data.PasswordStroncy.PasswordCombin) {
                pageEvent.o.GetControl("PasswordCombinContent").SetSelectedByValue(data.PasswordStroncy.PasswordCombin);
            }
        }
        if (data.PasswordCircle) {
            if (data.PasswordCircle.CircleType) {
                pageEvent.o.GetControl("UpdateCircleRadio").SetSelectByValue(data.PasswordCircle.CircleType);
                if (data.PasswordCircle.CircleType == "1" || data.PasswordCircle.CircleType == 1) {
                    pageEvent.o.GetControl("UpdateCircleDaysContent").Disable();
                }
            }
            if (data.PasswordCircle.Days) {
                pageEvent.o.GetControl("UpdateCircleDaysContent").SetText(data.PasswordCircle.Days);
            }
            if (data.PasswordCircle.IsFirstLoginChangePassword == true || data.PasswordCircle.IsFirstLoginChangePassword == "1") {
                pageEvent.o.GetControl("FirstLoginChangePassword").SetChecked(true);
            }
            if (data.PasswordCircle.IsNextLoginChangePassword == true || data.PasswordCircle.IsNextLoginChangePassword == "1") {
                pageEvent.o.GetControl("NextLoginChangePassword").SetChecked(true);
            }
        }
    }
}
InforCenter_ThreeRolePlatformManagement_ThreeRoleAuthPasswordPolicy_OnCheck = function (pageEvent) {
    var check = true;
    if (!pageEvent.o.GetControl("PasswordLengthContent").Check()) {
        check = false;
    }
    var val = pageEvent.o.GetControl("UpdateCircleRadio").GetValue();
    if (val == "2" || val == 2) {
        if (!pageEvent.o.GetControl("UpdateCircleDaysContent").Check()) {
            check = false;
        }
    }
    return check;
}
InforCenter_ThreeRolePlatformManagement_ThreeRoleAuthPasswordPolicy_RadioListOnClick = function (ctrlEvent) {
    var val = ctrlEvent.o.GetValue();
    if (val == "2" || val == 2) {
        ctrlEvent.o.OtherControl("UpdateCircleDaysContent").Enable();
    } else {
        ctrlEvent.o.OtherControl("UpdateCircleDaysContent").Disable();
    }
}
InforCenter_ThreeRolePlatformManagement_ThreeRoleAuthPasswordPolicy_OnGetData = function (pageEvent) {
    var data = {};
    data.PasswordStroncy = {};
    data.PasswordCircle = {};
    var passwordLength = pageEvent.o.GetControl("PasswordLengthContent").GetText();
    var combin = pageEvent.o.GetControl("PasswordCombinContent").GetSelectedValue();
    data.PasswordStroncy.PasswordLength = passwordLength;
    data.PasswordStroncy.PasswordCombin = combin;

    data.PasswordCircle.CircleType = pageEvent.o.GetControl("UpdateCircleRadio").GetValue();
    if (data.PasswordCircle.CircleType == "2" || data.PasswordCircle.CircleType == 2) {
        data.PasswordCircle.Days = pageEvent.o.GetControl("UpdateCircleDaysContent").GetText();
    }
    data.PasswordCircle.IsFirstLoginChangePassword = pageEvent.o.GetControl("FirstLoginChangePassword").IsChecked();
    data.PasswordCircle.IsNextLoginChangePassword = pageEvent.o.GetControl("NextLoginChangePassword").IsChecked();

    return JSON.stringify(data);
}
InforCenter_ThreeRolePlatformManagement_ThreeRoleAuthDomain_OnGetData = function (pageEvent) {
    var path = pageEvent.o.GetControl("DomainPath_Value").GetText();
    return JSON.stringify({ Path: path });
}
InforCenter_ThreeRolePlatformManagement_ThreeRoleAuthKey_OnGetData = function (pageEvent) {
    var path = pageEvent.o.GetControl("UKey_Value").GetText();
    return JSON.stringify({ UKey: path });
}


InforCenter_ThreeRolePlatformManagement_ThreeRoleAuthDomain_OnCreate = function (pageEvent) {
    var para = pageEvent.o.GetPara();
    if (para && para.Data) {
        var data = JSON.parse(para.Data);
        pageEvent.o.GetControl("DomainPath_Value").SetText(data.Path);
    }
}

InforCenter_ThreeRolePlatformManagement_ThreeRoleAuthKey_OnCreate = function (pageEvent) {
    var para = pageEvent.o.GetPara();
    if (para && para.Data) {
        var data = JSON.parse(para.Data);
        pageEvent.o.GetControl("UKey_Value").SetText(data.UKey);
    }
}
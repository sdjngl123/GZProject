InforCenter_ThreeRolePlatformManagement_ThreeRoleLoginLimitTabs_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var para = {};
    var pagePara = pageEvent.o.GetPara();
    var mode = pagePara.Mode;
    if (mode != 'Global') {
        var selectID = pagePara.SelectID;
    }

    var tabs = page.GetControl("Tabs");

    var types = HoteamUI.DataService.Call("InfroCenter.ThreeRolePlatformManagement.ThreeRoleAuthPlatformService.GetThreeRoleLoginLimitPage", { para: { ExtendJsonInfo: JSON.stringify({ Mode: mode, SelectID: selectID }) } });
    if (types) {
        types = JSON.parse(types);
        for (var i = 0; i < types.length; i++) {
            tabs.AddTab({
                pageName: types[i].PageName,
                text: types[i].Text,
                pageParas: { Name: types[i].Value, Data: types[i].Data },
                isSelected: true,
                delayLoadPage: false,
                tabId: types[i].PageName
            });
        }
    }

}


InforCenter_ThreeRolePlatformManagement_ThreeRoleLoginTimeLimit_OnCreate = function (pageEvent) {
    var ret = HoteamUI.DataService.Call("InforCenter.Enumeration.EnumerationService.GetEnumerationItem", { para: { EnumerationName: "ThreeRoleAllowWeek" } });
    if (ret) {
        var empty = [];
        var step = 0;

        for (var x = 0; x < ret.length; x++) {
            x = parseInt(x);
            empty[x + step] = { Value: ret[x].Key, Text: ret[x].Value };
        }
        pageEvent.o.GetControl("AllowWeek_Value").LoadItems(empty);
    }
    ret = HoteamUI.DataService.Call("InforCenter.Enumeration.EnumerationService.GetEnumerationItem", { para: { EnumerationName: "ThreeRoleAllowTime" } });
    if (ret) {
        empty = [];
        step = 0;
        for (var x = 0; x < ret.length; x++) {
            x = parseInt(x);
            empty[x + step] = { Value: ret[x].Key, Text: ret[x].Value };
        }
        pageEvent.o.GetControl("AllowTime_Value").LoadItems(empty);
    }

    var para = pageEvent.o.GetPara();
    if (para && para.Data) {
        var data = JSON.parse(para.Data);
        pageEvent.o.GetControl("IsEnable_Value").SetChecked(data.IsEnable);
        pageEvent.o.GetControl("AllowWeek_Value").SetSelectedByValue(data.AllowWeek);
        pageEvent.o.GetControl("AllowTime_Value").SetSelectedByValue(data.AllowTime);
        if (data.IsEnable === false || data.IsEnable === "false") {
            pageEvent.o.GetControl("AllowWeek_Value").Disable();
            pageEvent.o.GetControl("AllowTime_Value").Disable();
        }
    }
    else {
        pageEvent.o.GetControl("AllowWeek_Value").Disable();
        pageEvent.o.GetControl("AllowTime_Value").Disable();
    }
}
InforCenter_ThreeRolePlatformManagement_ThreeRoleLoginTimeLimit_IsEnableOnClick = function (ctrlEvent) {
    var enable = ctrlEvent.o.IsChecked();
    if (enable === false || enable === "false") {
        ctrlEvent.o.OtherControl("AllowWeek_Value").Disable();
        ctrlEvent.o.OtherControl("AllowTime_Value").Disable();
    } else {
        ctrlEvent.o.OtherControl("AllowWeek_Value").Enable();
        ctrlEvent.o.OtherControl("AllowTime_Value").Enable();
    }
}
InforCenter_ThreeRolePlatformManagement_ThreeRoleLoginTimeLimit_OnCheck = function (pageEvent) {
    return pageEvent.o.GetControl("Info_Container").Check();
}
InforCenter_ThreeRolePlatformManagement_ThreeRoleLoginTimeLimit_OnGetData = function (pageEvent) {
    var data = {};
    data.IsEnable = pageEvent.o.GetControl("IsEnable_Value").IsChecked();
    data.AllowWeek = pageEvent.o.GetControl("AllowWeek_Value").GetSelectedValue();
    data.AllowTime = pageEvent.o.GetControl("AllowTime_Value").GetSelectedValue();
    return JSON.stringify(data);
}

InforCenter_ThreeRolePlatformManagement_ThreeRoleLoginAddressLimit_OnCreate = function (pageEvent) {
    var para = pageEvent.o.GetPara();
    if (para && para.Data) {
        var data = JSON.parse(para.Data);
        pageEvent.o.GetControl("IPAddressStart_Value").SetText(data.IPAddressStart);
        pageEvent.o.GetControl("IPAddressEnd_Value").SetText(data.IPAddressEnd);
    }
}
InforCenter_ThreeRolePlatformManagement_ThreeRoleLoginAddressLimit_OnCheck = function (pageEvent) {
    return pageEvent.o.GetControl("Info_Container").Check();
}
InforCenter_ThreeRolePlatformManagement_ThreeRoleLoginAddressLimit_OnGetData = function (pageEvent) {
    var data = {};
    data.IPAddressStart = pageEvent.o.GetControl("IPAddressStart_Value").GetText();
    data.IPAddressEnd = pageEvent.o.GetControl("IPAddressEnd_Value").GetText();
    return JSON.stringify(data);
}

InforCenter_ThreeRolePlatformManagement_ThreeRoleExceptionLock_OnCreate = function (pageEvent) {
    var para = pageEvent.o.GetPara();
    if (para && para.Data) {
        var data = JSON.parse(para.Data);
        pageEvent.o.GetControl("IsEnable_Value").SetChecked(data.IsEnable);
        pageEvent.o.GetControl("CountTop_Value").SetText(data.CountTop);
        pageEvent.o.GetControl("LockTime_Value").SetText(data.LockTime);
        if (data.IsEnable === false || data.IsEnable === "false") {
            pageEvent.o.GetControl("CountTop_Value").Disable();
            pageEvent.o.GetControl("LockTime_Value").Disable();
        }
    } else {
        pageEvent.o.GetControl("CountTop_Value").Disable();
        pageEvent.o.GetControl("LockTime_Value").Disable();
    }
}
InforCenter_ThreeRolePlatformManagement_ThreeRoleExceptionLock_IsEnableOnClick = function (ctrlEvent) {
    var enable = ctrlEvent.o.IsChecked();
    if (enable === false || enable === "false") {
        ctrlEvent.o.OtherControl("CountTop_Value").Disable();
        ctrlEvent.o.OtherControl("LockTime_Value").Disable();
    } else {
        ctrlEvent.o.OtherControl("CountTop_Value").Enable();
        ctrlEvent.o.OtherControl("LockTime_Value").Enable();
    }
}
InforCenter_ThreeRolePlatformManagement_ThreeRoleExceptionLock_OnCheck = function (pageEvent) {
    if (pageEvent.o.GetControl("IsEnable_Value").IsChecked() == true) {
        return pageEvent.o.GetControl("Info_Container").Check();
    }
    return true;
}
InforCenter_ThreeRolePlatformManagement_ThreeRoleExceptionLock_OnGetData = function (pageEvent) {
    var data = {};
    data.IsEnable = pageEvent.o.GetControl("IsEnable_Value").IsChecked();
    if (data.IsEnable == true) {
        data.CountTop = pageEvent.o.GetControl("CountTop_Value").GetText();
        data.LockTime = pageEvent.o.GetControl("LockTime_Value").GetText();
    }

    return JSON.stringify(data);
}

InforCenter_ThreeRolePlatform_ThreeRoleLoginValidity_RadioOnChange = function (ctrlEvent) {
    var val = ctrlEvent.o.GetValue();
    InforCenter_ThreeRolePlatform_ThreeRoleLoginValidity_SetRadio(ctrlEvent.o, val);
}

InforCenter_ThreeRolePlatform_ThreeRoleLoginValidity_SetRadio = function (ctrl, val) {
    switch (val) {
        case "None":
            ctrl.OtherControl("DateTimeStart_Value").Disable();
            ctrl.OtherControl("DateTimeEnd_Value").Disable();
            break;
        case "SetStart":
            ctrl.OtherControl("DateTimeEnd_Value").Disable();
            ctrl.OtherControl("DateTimeStart_Value").Enable();
            break;
        case "SetEnd":
            ctrl.OtherControl("DateTimeStart_Value").Disable();
            ctrl.OtherControl("DateTimeEnd_Value").Enable();
            break;
        case "SetStartAndEnd":
            ctrl.OtherControl("DateTimeEnd_Value").Enable();
            ctrl.OtherControl("DateTimeStart_Value").Enable();
            break;
    }
}

InforCenter_ThreeRolePlatformManagement_ThreeRoleLoginValidity_OnCreate = function (pageEvent) {
    var para = pageEvent.o.GetPara();
    if (para && para.Data) {
        var data = JSON.parse(para.Data);
        pageEvent.o.GetControl("LimitType_Value").SetSelectByValue(data.ValidityType);
        InforCenter_ThreeRolePlatform_ThreeRoleLoginValidity_SetRadio(pageEvent.o.GetControl("LimitType_Value"), data.ValidityType);
        if (data.StartDate) {
            pageEvent.o.GetControl("DateTimeStart_Value").SetDateTimeByTicks(data.StartDate);
        }
        if (data.EndDate) {
            pageEvent.o.GetControl("DateTimeEnd_Value").SetDateTimeByTicks(data.EndDate);
        }
    } else {
        InforCenter_ThreeRolePlatform_ThreeRoleLoginValidity_SetRadio(pageEvent.o.GetControl("LimitType_Value"), "None");
    }

}
InforCenter_ThreeRolePlatformManagement_ThreeRoleLoginValidity_OnCheck = function (pageEvent) {

    var ret = pageEvent.o.GetControl("Info_Container").Check();
    if (!ret) {
        return ret;
    }
    var val = pageEvent.o.GetControl("LimitType_Value").GetValue();
    //如果
    switch (val) {
        case "None":
            break;
        case "SetStart":
            var datatime = pageEvent.o.GetControl("DateTimeStart_Value").GetTicksByDateTime();
            if (!datatime) {
                HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("ThreeRoleLoginValidity.StartTimeIsNull"));
                return false;
            }
            //开始时间大于当前时间
            break;
        case "SetEnd":
            var datatime = pageEvent.o.GetControl("DateTimeEnd_Value").GetTicksByDateTime();
            if (!datatime) {
                HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("ThreeRoleLoginValidity.EndTimeIsNull"));
                return false;
            }
            //结束时间大于当前时间
            break;
        case "SetStartAndEnd":
            var datatime = pageEvent.o.GetControl("DateTimeStart_Value").GetTicksByDateTime();
            if (!datatime) {
                HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("ThreeRoleLoginValidity.StartTimeIsNull"));
                return false;
            }
            datatime = pageEvent.o.GetControl("DateTimeEnd_Value").GetTicksByDateTime();
            if (!datatime) {
                HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("ThreeRoleLoginValidity.EndTimeIsNull"));
                return false;
            }
            //开始时间大于当前时间
            //结束时间大于开始时间
            break;
    }
    return true;
}
InforCenter_ThreeRolePlatformManagement_ThreeRoleLoginValidity_OnGetData = function (pageEvent) {
    var data = {};
    var val = pageEvent.o.GetControl("LimitType_Value").GetValue();
    data.ValidityType = val;
    switch (val) {
        case "None":
            break;
        case "SetStart":
            data.StartDate = pageEvent.o.GetControl("DateTimeStart_Value").GetTicksByDateTime();
            break;
        case "SetEnd":
            data.EndDate = pageEvent.o.GetControl("DateTimeEnd_Value").GetTicksByDateTime();
            break;
        case "SetStartAndEnd":
            data.StartDate = pageEvent.o.GetControl("DateTimeStart_Value").GetTicksByDateTime();
            data.EndDate = pageEvent.o.GetControl("DateTimeEnd_Value").GetTicksByDateTime();
            break;
    }
    return JSON.stringify(data);
}

InforCenter_ThreeRolePlatformManagement_ThreeRoleLoginLimitTabs_OnOK = function (ctrlEvent) {
    var para = {};
    var pagePara = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID()).GetPara();
    var mode = pagePara.Mode;
    if (mode != 'Global') {
        var selectID = pagePara.SelectID;
    }

    //获取认证策略
    var tabs = ctrlEvent.o.OtherControl("Tabs");
    var infos = tabs.GetTabInfoList();
    para.LoginLimitTypeData = [];
    for (var i = 0; i < infos.length; i++) {
        if (HoteamUI.Page.FirePageEvent(infos[i].pid, "OnCheck", {})) {
            var data = {};
            data.LoginLimitType = infos[i].pageParas.Name;
            data.Data = HoteamUI.Page.FirePageEvent(infos[i].pid, "OnGetData", {});
            para.LoginLimitTypeData.push(data);

        } else {
            HoteamUI.UIManager.MsgBox(infos[i].text + HoteamUI.Language.Lang("ThreeRoleAuthTabs.ExistInvalid"));
            return;
        }
    }

    var ret = HoteamUI.DataService.Call("InforCenter.ThreeRolePlatformManagement.ThreeRoleAuthPlatformService.SaveThreeRoleLoginLimitData", { para: { ExtendJsonInfo: JSON.stringify({ Data: JSON.stringify(para), Mode: mode, SelectID: selectID }) } });
    if (ret == true) {
        HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), { confirm: "OK" });
    }
}
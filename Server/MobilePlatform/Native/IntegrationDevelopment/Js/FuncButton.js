InforCenter_IntegrationDevelopment_FuncButtonCreate_OnCreate = function (pageEvent) {
    var para = pageEvent.o.GetPara();
    var data = InforCenter_Platform_Object_GetObjectInitData('FUNCBUTTON', para);

    var o = pageEvent.o.GetControl('ICON_Value');
    if (o.id != '') {
        var src = data.ICON;
        if (HoteamUI.Common.IsNullOrEmpty(src)) {
            if ('ICON' == 'ICON') {
                src = '~/Base/Image/Entity.gif?time=' + new Date().getTime();
            } else {
                src = '~/Platform/Image/Common/nopic16.png';
            }
        }
        o.SetSrc(src);
    }

    var o = pageEvent.o.GetControl('BUTTONTEXT_Value');
    if (o.id != '') {
        o.SetValue(data.BUTTONTEXT);
        o.SetText(data.BUTTONTEXT_DisplayValue);
    }

    var o = pageEvent.o.GetControl('CALLPAGE_Value');
    if (o.id != '') {
        //InforCenter_Platform_Object_SetEnumList(o, 'CALLPAGE', 'FUNCBUTTON', true);
        var pageList = HoteamUI.DataService.Call("Hoteam.InforCenter.MobilePageDevService.GetMobilePageDevName", {});
        var arr = [];
        for (var x = 0; x < pageList.length; x++) {
            arr[x] = { Value: pageList[x].Key, Text: pageList[x].Value };
        }
        o.LoadItems(arr);
    }


    var functionName = 'InforCenter_FUNCBUTTON_CreatePage_OnCreate';
    if (window[functionName] && typeof window[functionName] == 'function')
        return window[functionName](pageEvent, data);
}

InforCenter_IntegrationDevelopment_FuncButtonCreate_OnGetData = function (pageEvent) {
    InforCenter_Platform_Object_Data = null; var bCheck = true;
    var data = { ObjectType: 'FUNCBUTTON' };
    var c = pageEvent.o.GetControl('ENAME_Value');
    if (c.id != '') {
        if (c.Check() == false) bCheck = false;
        data.ENAME = c.GetText().trim();
    }

    var c = pageEvent.o.GetControl('ICON_Value');
    if (c.id != '') {
        if (c.Check() == false) bCheck = false;
        data.ICON = c.GetSrc();
    }

    var c = pageEvent.o.GetControl('BUTTONTEXT_Value');
    if (c.id != '') {
        if (c.Check() == false) bCheck = false;
        data.BUTTONTEXT = c.GetValue();
    }

    var c = pageEvent.o.GetControl('CALLPAGE_Value');
    if (c.Check() == false) bCheck = false;
    data.CALLPAGE = c.GetSelectedValue();

    var c = pageEvent.o.GetControl('MAINCONFIG_Value');
    if (c.id != '') {
        if (c.Check() == false) bCheck = false;
        data.MAINCONFIG = c.GetSelectedValue()
    }
    var c = pageEvent.o.GetControl('SEQUENCE_Value');
    if (c.id != '') {
        if (c.Check() == false) bCheck = false;
        data.SEQUENCE = c.GetText().trim();
    }
    if (bCheck) InforCenter_Platform_Object_Data = data;
}

InforCenter_IntegrationDevelopment_FuncButtonCreate_OnSaveCheck = function (pageEvent) {
    InforCenter_Platform_Object_SaveCheck = true;
    var functionName = 'InforCenter_FUNCBUTTON_CreatePage_OnOK';
    if (window[functionName] && typeof window[functionName] == 'function')
        InforCenter_Platform_Object_SaveCheck = window[functionName](pageEvent);
}

InforCenter_IntegrationDevelopment_FuncButtonCreate_CallPageOnChange = function (ctrlEvent) {
    ctrlEvent.o.OtherControl("MAINCONFIG_Value").LoadItems([]);
    var pagename = ctrlEvent.o.GetSelectedValue();
    var mainConfig = HoteamUI.DataService.Call("Hoteam.InforCenter.MobilePageDevService.GetMainConfigPage", { para: { PageName: pagename } });
    if (mainConfig) {
        ctrlEvent.o.OtherControl("MAINCONFIG_Value").LoadItems(mainConfig);
    }

}

InforCenter_IntegrationDevelopment_FuncButtonEdit_OnCreate = function (pageEvent) {
    var para = pageEvent.o.GetPara();
    var data = InforCenter_Platform_Object_GetObjectData(para.ObjectID, para);

    var c = pageEvent.o.GetControl('ENAME_Value');
    if (c.id != '') {
        c.SetText(data.ENAME);
    }

    var o = pageEvent.o.GetControl('ICON_Value');
    if (o.id != '') {
        var src = data.ICON;
        if (HoteamUI.Common.IsNullOrEmpty(src)) {
            if ('ICON' == 'ICON') {
                src = '~/Base/Image/Entity.gif?time=' + new Date().getTime();
            } else {
                src = '~/Platform/Image/Common/nopic16.png';
            }
        }
        o.SetSrc(src);
    }

    var o = pageEvent.o.GetControl('BUTTONTEXT_Value');
    if (o.id != '') {
        o.SetValue(data.BUTTONTEXT);
        o.SetText(data.BUTTONTEXT_DisplayValue);
    }

    var o = pageEvent.o.GetControl('CALLPAGE_Value');
    if (o.id != '') {
        var pageList = HoteamUI.DataService.Call("Hoteam.InforCenter.MobilePageDevService.GetMobilePageDevName", {});
        var arr = [];
        for (var x = 0; x < pageList.length; x++) {
            arr[x] = { Value: pageList[x].Key, Text: pageList[x].Value };
        }
        o.LoadItems(arr);
        o.SetSelectedByValue(data.CALLPAGE);
    }

    var c = pageEvent.o.GetControl('MAINCONFIG_Value');
    if (c.id != '') {
        c.LoadItems([]);
        var pagename = pageEvent.o.GetControl('CALLPAGE_Value').GetSelectedValue();
        var mainConfig = HoteamUI.DataService.Call("Hoteam.InforCenter.MobilePageDevService.GetMainConfigPage", { para: { PageName: pagename } });
        if (mainConfig) {
            c.LoadItems(mainConfig);
        }

        c.SetSelectedByValue(data.MAINCONFIG);
    }

    var o = pageEvent.o.GetControl('SEQUENCE_Value');
    if (o.id != '') {
        o.SetText(data.SEQUENCE);
    }

    var functionName = 'InforCenter_FUNCBUTTON_EditPage_OnCreate';
    if (window[functionName] && typeof window[functionName] == 'function')
        return window[functionName](pageEvent, data);
}

InforCenter_IntegrationDevelopment_FuncButtonEdit_OnGetData = function (pageEvent) {
    InforCenter_Platform_Object_Data = null; var bCheck = true;
    var data = { ObjectType: 'FUNCBUTTON' };
    var c = pageEvent.o.GetControl('ENAME_Value');
    if (c.id != '') {
        if (c.Check() == false) bCheck = false;
        data.ENAME = c.GetText().trim();
    }

    var c = pageEvent.o.GetControl('ICON_Value');
    if (c.id != '') {
        if (c.Check() == false) bCheck = false;
        data.ICON = c.GetSrc();
    }

    var c = pageEvent.o.GetControl('BUTTONTEXT_Value');
    if (c.id != '') {
        if (c.Check() == false) bCheck = false;
        data.BUTTONTEXT = c.GetValue();
    }

    var c = pageEvent.o.GetControl('CALLPAGE_Value');
    if (c.Check() == false) bCheck = false;
    data.CALLPAGE = c.GetSelectedValue();

    var c = pageEvent.o.GetControl('MAINCONFIG_Value');
    if (c.id != '') {
        if (c.Check() == false) bCheck = false;
        data.MAINCONFIG = c.GetSelectedValue()
    }

    var c = pageEvent.o.GetControl('SEQUENCE_Value');
    if (c.id != '') {
        if (c.Check() == false) bCheck = false;
        data.SEQUENCE = c.GetText().trim();
    }
    if (bCheck) InforCenter_Platform_Object_Data = data;
}

InforCenter_IntegrationDevelopment_FuncButtonEdit_OnSaveCheck = function (pageEvent) {
    InforCenter_Platform_Object_SaveCheck = true;
    var functionName = 'InforCenter_FUNCBUTTON_EditPage_OnOK';
    if (window[functionName] && typeof window[functionName] == 'function')
        InforCenter_Platform_Object_SaveCheck = window[functionName](pageEvent);
}


InforCenter_IntegrationDevelopment_SelectedImage_OnClick = function (ctrlEvent) {
    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    var pagePara = page.GetPara();

    if (!pagePara) {
        pagePara = {};
    }

    pagePara.ObjectType = "IntegrationDevelopment";

    var callback = function (data, ret) {
        if (ret && ret.ReturnValue) {
            data.ctrl.SetSrc(ret.ReturnValue);
        }
    }
    HoteamUI.UIManager.Popup("WorkflowSelectImage", pagePara, callback, { ctrl: ctrlEvent.o }, "520*280");

}
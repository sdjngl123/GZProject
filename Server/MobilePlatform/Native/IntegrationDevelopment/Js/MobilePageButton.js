InforCenter_IntegrationDevelopment_CreateMobilePageButton_OnCreate = function (pageEvent) {
    var para = pageEvent.o.GetPara();
    var data = InforCenter_Platform_Object_GetObjectInitData('MOBILEPAGEBUTTON', para);


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

    var o = pageEvent.o.GetControl('BUTTONITEMTYPE_Value');
    if (o.id != '') {
        InforCenter_Platform_Object_SetEnumList(o, 'BUTTONITEMTYPE', 'MOBILEPAGEBUTTON', true);
        o.SetSelectedByValue(data.BUTTONITEMTYPE);
    }


    var functionName = 'InforCenter_MOBILEPAGEBUTTON_CreatePage_OnCreate';
    if (window[functionName] && typeof window[functionName] == 'function')
        return window[functionName](pageEvent, data);
}

InforCenter_IntegrationDevelopment_CreateMobilePageButton_OnGetData = function (pageEvent) {
    InforCenter_Platform_Object_Data = null;
    var bCheck = true; var data = { ObjectType: 'MOBILEPAGEBUTTON' }; {
        var c = pageEvent.o.GetControl('ENAME_Value');
        if (c.id != '') {
            if (c.Check() == false) bCheck = false;
            data.ENAME = c.GetText().trim();
        }
    } {
        var c = pageEvent.o.GetControl('ICON_Value');
        if (c.id != '') {
            if (c.Check() == false) bCheck = false;
            data.ICON = c.GetSrc();
        }
    } {
        var c = pageEvent.o.GetControl('TITLE_Value');
        if (c.id != '') {
            if (c.Check() == false) bCheck = false;
            data.TITLE = c.GetValue();
        }
    } {
        var c = pageEvent.o.GetControl('BUTTONITEMTYPE_Value');
        if (c.Check() == false) bCheck = false;
        data.BUTTONITEMTYPE = c.GetSelectedValue();
    } {
        var c = pageEvent.o.GetControl('BACKGROUNDCOLOR_Value');
        if (c.id != '') {
            if (c.Check() == false) bCheck = false;
            data.BACKGROUNDCOLOR = c.GetText().trim();
        }
    } {
        var c = pageEvent.o.GetControl('URL_Value');
        if (c.id != '') {
            if (c.Check() == false) bCheck = false;
            data.URL = c.GetText().trim();
        }
    };
    var pagepara = pageEvent.o.GetPara();
    if (pagepara.ButtonItemTypeExtend) {
        data.BUTTONITEMTYPEEXTEND = pagepara.ButtonItemTypeExtend;
    } else {
        data.BUTTONITEMTYPEEXTEND = "";
    }
    if (bCheck) InforCenter_Platform_Object_Data = data;
}

InforCenter_IntegrationDevelopment_CreateMobilePageButton_OnSaveCheck = function (pageEvent) {
    InforCenter_Platform_Object_SaveCheck = true;
    var functionName = 'InforCenter_MOBILEPAGEBUTTON_CreatePage_OnOK';
    if (window[functionName] && typeof window[functionName] == 'function')
        InforCenter_Platform_Object_SaveCheck = window[functionName](pageEvent);
}

InforCenter_IntegrationDevelopment_MobilePageButton_ButtonItemTypeOnchange = function (ctrlEvent) {
    var value = ctrlEvent.o.GetSelectedValue();
    var pagePara = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID()).GetPara();

    var callback = function (data, ret) {
        if (ret && ret.Confirm == "OK") {
            if (pagePara.ButtonItemTypeExtend) {
                delete pagePara.ButtonItemTypeExtend;
            }
            var para = $.extend({}, pagePara, { ButtonItemTypeExtend: ret.ButtonItemTypeExtend });
            HoteamUI.Page.SetContainerParas(ctrlEvent.o.ContainerID(), para);
        }
    }
    var extend = "";
    if (pagePara.ButtonItemTypeExtend) {
        extend = pagePara.ButtonItemTypeExtend;
    }
    HoteamUI.UIManager.Popup("MobilePageButtonTypePage", { ButtonItemTypeExtend: extend, Type: ctrlEvent.o.GetSelectedValue() }, callback);


}

InforCenter_IntegrationDevelopment_EditMobilePageButton_OnCreate = function (pageEvent) {

    var para = pageEvent.o.GetPara();
    var data = InforCenter_Platform_Object_GetObjectData(para.ObjectID, para); {
        var c = pageEvent.o.GetControl('ENAME_Value');
        if (c.id != '') {
            c.SetText(data.ENAME);
        }
    }

    {
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
    }
    {
        var o = pageEvent.o.GetControl('TITLE_Value');
        if (o.id != '') {
            o.SetValue(data.TITLE);
            o.SetText(data.TITLE_DisplayValue);
        }
    }

    {
        var o = pageEvent.o.GetControl('BUTTONITEMTYPE_Value');
        if (o.id != '') {
            InforCenter_Platform_Object_SetEnumList(o, 'BUTTONITEMTYPE', 'MOBILEPAGEBUTTON', true);
            o.SetSelectedByValue(data.BUTTONITEMTYPE);
        }
    } {
        var c = pageEvent.o.GetControl('BACKGROUNDCOLOR_Value');
        if (c.id != '') {
            c.SetText(data.BACKGROUNDCOLOR);
        }
    }
    {
        var c = pageEvent.o.GetControl('URL_Value');
        if (c.id != '') {
            c.SetText(data.URL);
        }
    }

    para = $.extend({}, { ButtonItemTypeExtend: data.BUTTONITEMTYPEEXTEND }, para);
    HoteamUI.Page.SetContainerParas(pageEvent.o.pid, para);
    var functionName = 'InforCenter_MOBILEPAGEBUTTON_EditPage_OnCreate';
    if (window[functionName] && typeof window[functionName] == 'function')
        return window[functionName](pageEvent, data);
}

InforCenter_IntegrationDevelopment_EditMobilePageButton_OnGetData = function (pageEvent) {
    InforCenter_Platform_Object_Data = null;
    var bCheck = true;
    var para = pageEvent.o.GetPara();
    var data = { ObjectID: para.ObjectID }; {
        var c = pageEvent.o.GetControl('ENAME_Value');
        if (c.id != '') {
            if (c.Check() == false) bCheck = false;
            data.ENAME = c.GetText().trim();
        }
    } {
        var c = pageEvent.o.GetControl('ICON_Value');
        if (c.id != '') {
            if (c.Check() == false) bCheck = false;
            data.ICON = c.GetSrc();
        }
    } {
        var c = pageEvent.o.GetControl('TITLE_Value');
        if (c.id != '') {
            if (c.Check() == false) bCheck = false;
            data.TITLE = c.GetValue();
        }
    } {
        var c = pageEvent.o.GetControl('BUTTONITEMTYPE_Value');
        if (c.Check() == false) bCheck = false;
        data.BUTTONITEMTYPE = c.GetSelectedValue();
    } {
        var c = pageEvent.o.GetControl('BACKGROUNDCOLOR_Value');
        if (c.id != '') {
            if (c.Check() == false) bCheck = false;
            data.BACKGROUNDCOLOR = c.GetText().trim();
        }
    } {
        var c = pageEvent.o.GetControl('URL_Value');
        if (c.id != '') {
            if (c.Check() == false) bCheck = false;
            data.URL = c.GetText().trim();
        }
    };
    var pagepara = pageEvent.o.GetPara();
    if (pagepara.ButtonItemTypeExtend) {
        data.BUTTONITEMTYPEEXTEND = pagepara.ButtonItemTypeExtend;
    } else {
        data.BUTTONITEMTYPEEXTEND = "";
    }
    if (bCheck) InforCenter_Platform_Object_Data = data;
}

InforCenter_IntegrationDevelopment_EditMobilePageButton_OnSaveCheck = function (pageEvent) {
    InforCenter_Platform_Object_SaveCheck = true;
    var functionName = 'InforCenter_MOBILEPAGEBUTTON_EditPage_OnOK';
    if (window[functionName] && typeof window[functionName] == 'function')
        InforCenter_Platform_Object_SaveCheck = window[functionName](pageEvent);
}
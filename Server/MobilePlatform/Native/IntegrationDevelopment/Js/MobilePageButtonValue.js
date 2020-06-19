InforCenter_IntegrationDevelopment_MobilePageButtonValue_OnClick = function (ctrlEvent) {
    var val = ctrlEvent.o.GetValue();

    var callback = function (data, ret) {
        if (ret && ret.Confirm == "OK") {
            ctrlEvent.o.SetText(ret.ENAME);
            ctrlEvent.o.SetValue(JSON.stringify(ret));
        }
    }
    HoteamUI.UIManager.Popup("MobilePageButtonValue", { ObjectInfo: val }, callback);
}

InforCenter_IntegrationDevelopment_MobilePageButtonValue_OnCreate = function (pageEvent) {
    var para = pageEvent.o.GetPara();

    var o = pageEvent.o.GetControl('BUTTONITEMTYPE_Value');
    if (o.id != '') {
        InforCenter_Platform_Object_SetEnumList(o, 'BUTTONITEMTYPE', 'MOBILEPAGEBUTTON', true);
    }

    if (!para.ObjectInfo) {
        var o = pageEvent.o.GetControl('ICON_Value');
        if (o.id != '') {
            var src = '~/Base/Image/Entity.gif?time=' + new Date().getTime();
            o.SetSrc(src);
        }
        return;
    }
    var data = {};

    try {
        //objectinfo为数据对象时
        data = JSON.parse(para.ObjectInfo);
    } catch (e) {
        //objectinfo为数据ID时
        data = InforCenter_Platform_Object_GetObjectData(para.ObjectInfo, para);
    }

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
            }
        }
        o.SetSrc(src);
    }

    var o = pageEvent.o.GetControl('TITLE_Value');
    if (o.id != '') {
        o.SetValue(data.TITLE);
        if (data.TITLE) {
            try {
                var multiData = JSON.parse(data.TITLE);
                var lang = multiData[HoteamUI.Security.LoginPara.Lang];
                o.SetText(lang);
            } catch (e) { }
        }
    }

    var o = pageEvent.o.GetControl('BUTTONITEMTYPE_Value');
    if (o.id != '') {
        InforCenter_Platform_Object_SetEnumList(o, 'BUTTONITEMTYPE', 'MOBILEPAGEBUTTON', true);
        o.SetSelectedByValue(data.BUTTONITEMTYPE);
    }

    var c = pageEvent.o.GetControl('BACKGROUNDCOLOR_Value');
    if (c.id != '') {
        c.SetText(data.BACKGROUNDCOLOR);
    }

    var c = pageEvent.o.GetControl('URL_Value');
    if (c.id != '') {
        c.SetText(data.URL);
    }


    para = $.extend({}, { ButtonItemTypeExtend: data.BUTTONITEMTYPEEXTEND }, para);
    HoteamUI.Page.SetContainerParas(pageEvent.o.pid, para);
}

InforCenter_IntegrationDevelopment_MobilePageButtonValue_OnGetData = function (pageEvent) {
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
InforCenter_IntegrationDevelopment_MobilePageButtonValue_OnSaveCheck = function (pageEvent) {
    InforCenter_Platform_Object_SaveCheck = true;
    var functionName = 'InforCenter_MOBILEPAGEBUTTON_CreatePage_OnOK';
    if (window[functionName] && typeof window[functionName] == 'function')
        InforCenter_Platform_Object_SaveCheck = window[functionName](pageEvent);
}

InforCenter_IntegrationDevelopment_MobilePageButtonValue_OnOK = function (ctrlEvent) {
    var data = InforCenter_Platform_Object_GetDataFromPage(ctrlEvent.o.ContainerID());
    if (data != null) {
        data.Confirm = "OK";
        HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), data);
    }
}
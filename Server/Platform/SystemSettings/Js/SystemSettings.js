
//新建页面初始化事件
InforCenter_SystemSettings_SystemSettings_CreatePageOnLoadData = function (pageEvent) {
    var para = pageEvent.o.GetPara();
    var data = InforCenter_Platform_Object_GetObjectInitData('INDIVIDUATIONSETTING', para);
    pageEvent.o.GetControl('ENAME_Value').SetText(data.ENAME);
    pageEvent.o.GetControl('REMARK_Value').SetText(data.REMARK);
    pageEvent.o.GetControl('USINGUSERSET_Value').SetChecked(data.USINGUSERSET);
    pageEvent.o.GetControl('TOCLIENT_Value').SetChecked(data.TOCLIENT);

    //获取值类型数据以及显示的page信息
    var settingsData = HoteamUI.DataService.Call("InforCenter.SystemSetting.SystemSettingsService.GetSystemSettings", { para: para });
    if (HoteamUI.Common.IsNullOrEmpty(settingsData) == false && settingsData.length > 0) {
        var empty = new Array();
        for (var i = 0; i < settingsData.length; i++) {
            empty[i] = { Value: settingsData[i].Name, Text: settingsData[i].Title };
        }
        pageEvent.o.GetControl('SETTINGTYPE_Value').LoadItems(empty);
        para.SettingsData = settingsData;
        HoteamUI.Page.SetContainerParas(pageEvent.o.pid, pageEvent.o.PageName(), para);
    }
    var functionName = 'InforCenter_INDIVIDUATIONSETTING_CreatePage_OnCreate';
    if (window[functionName] && typeof window[functionName] == 'function')
        return window[functionName](pageEvent, data);

}

//值类型修改时触发
InforCenter_SystemSettings_SystemSettings_OnSettingTypeChange = function (ctrlEvent) {
    var selectValue = ctrlEvent.o.GetSelectedValue();
    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    var para = page.GetPara();
    if (HoteamUI.Common.IsNullOrEmpty(para.SettingsData) == false) {
        var loadPageName = "";
        for (var i = 0; i < para.SettingsData.length; i++) {
            if (selectValue == para.SettingsData[i].Name) {
                loadPageName = para.SettingsData[i].PageName;
                break;
            }
        }
        if (HoteamUI.Common.IsNullOrEmpty(loadPageName) == false) {
            var pageContainer = page.GetControl("PageContainerValue_Container");
            para.Type = 'New';
            pageContainer.LoadPage(loadPageName, para);
        }
    }

}

//新建页面获取数据
InforCenter_SystemSettings_SystemSettings_CreatePageGetDataFromPage = function (pageEvent) {
    InforCenter_Platform_Object_Data = null; var bCheck = true;
    var data = { ObjectType: 'INDIVIDUATIONSETTING' };
    {
        var pagePara = pageEvent.o.GetPara();
    }
    {
        var c = pageEvent.o.GetControl('ENAME_Value');
        if (c.Check() == false) bCheck = false;
        data.ENAME = c.GetText();
    }
    {
        var c = pageEvent.o.GetControl('SETTINGTYPE_Value');
        var setValueType = c.GetSelectedValue();
        if (c.Check() == false) {
            bCheck = false;
        }
        data.SETTINGTYPE = setValueType;

    }

    {
        var c = pageEvent.o.GetControl('REMARK_Value');
        if (c.Check() == false) bCheck = false;
        data.REMARK = c.GetText();
    }

    {
        var c = pageEvent.o.GetControl('USETYPE_Value');
        data.USETYPE = c.GetValue();
    }
    {
        var c = pageEvent.o.GetControl('USINGUSERSET_Value');
        if (c.Check() == false) bCheck = false;
        if (c.IsChecked() == true) {
            data.USINGUSERSET = true;
        } else {
            data.USINGUSERSET = false;
        }
    }
    {
        var c = pageEvent.o.GetControl('TOCLIENT_Value');
        if (c.Check() == false) bCheck = false;
        if (c.IsChecked() == true) {
            data.TOCLIENT = true;
        } else {
            data.TOCLIENT = false;
        }
    }
    var infoContainer = pageEvent.o.GetControl("PageContainerValue_Container");
    var containerData = InforCenter_Platform_Object_GetDataFromPage(infoContainer.id);
    if (HoteamUI.Common.IsNullOrEmpty(containerData) == false) {
        data.SETTINGVALUE = JSON.stringify(containerData);
    } else {
        bCheck = false;
    }
    if (bCheck) InforCenter_Platform_Object_Data = data;
}

//编辑页面确定按钮事件
InforCenter_Platform_SystemSettingPage_OnOK = function (ctrlEvent) {
    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    var bCheck = true;
    var data = { ObjectType: 'INDIVIDUATIONSETTING' };

    var para = page.GetPara();

    {
        var c = page.GetControl('ENAME_Value');
        if (c.Check() == false) bCheck = false;
        data.ENAME = c.GetText();
    }
    {
        var c = page.GetControl('SETTINGTYPE_Value');
        var setValueType = c.GetSelectedValue();
        if (c.Check() == false) {
            bCheck = false;
        }
        data.SETTINGTYPE = setValueType;

    }

    {
        var c = page.GetControl('REMARK_Value');
        if (c.Check() == false) bCheck = false;
        data.REMARK = c.GetText();
    }

    {
        var c = page.GetControl('USETYPE_Value');
        data.USETYPE = c.GetValue();
    }
    {
        var c = page.GetControl('USINGUSERSET_Value');
        if (c.Check() == false) bCheck = false;
        if (c.IsChecked() == true) {
            data.USINGUSERSET = true;
        } else {
            data.USINGUSERSET = false;
        }
    }
    {
        var c = page.GetControl('TOCLIENT_Value');
        if (c.Check() == false) bCheck = false;
        if (c.IsChecked() == true) {
            data.TOCLIENT = true;
        } else {
            data.TOCLIENT = false;
        }
    }

    var infoContainer = page.GetControl("PageContainerValue_Container");
    var containerData = InforCenter_Platform_Object_GetDataFromPage(infoContainer.id);
    if (HoteamUI.Common.IsNullOrEmpty(containerData) == false) {
        data.SETTINGVALUE = JSON.stringify(containerData);
    } else {
        bCheck = false;
    }
    if (bCheck) {
        if (data != null) {

            if (para.CreatePersonalData && para.CreatePersonalData == true) {
                data.OWNER = HoteamUI.Security.LoginPara.UserID;
                data.MODULEID = para.MODULEID;
                data = $.extend(true, {}, para, data);
                data = InforCenter_Platform_Object_SaveObjectData(data, true, para);
            } if (para.CreateSystemData && para.CreateSystemData == true)
            {
                data.ISCOMPANY = 0;
                data = $.extend(true, {}, para, data);
                data = InforCenter_Platform_Object_SaveObjectData(data, true, para);
            }
            else {
                data = $.extend(true, {}, para, data);
                data = InforCenter_Platform_Object_SaveObjectData(data, false, para);
            }
            if (data != null) {
                HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), new Array(data));
            }

            var callBack = function (systemsettings) {
                if (systemsettings && systemsettings.SystemSettings)
                    HoteamUI.SystemSettings = systemsettings.SystemSettings;
            }

            HoteamUI.DataService.AsyncCall("InforCenter.SystemSetting.SystemSettingsService.GetClientSetting", { para: para }, callBack);

        }
    }
}
//编辑页面初始化数据
InforCenter_SystemSettings_SystemSettings_EditPageOnLoadData = function (pageEvent) {
    var para = pageEvent.o.GetPara();
    var data = InforCenter_Platform_Object_GetObjectData(para.ObjectID, para);
    //如果当前应用类型为“Personal”（个人设置）,如果当前OWNER为空，则当前对象保存时需要创建一条新数据
    if (para.UserType == "Personal") {
        pageEvent.o.GetControl('REMARK_Value').Disable();
        pageEvent.o.GetControl('USINGUSERSET_Value').Disable();
        pageEvent.o.GetControl('TOCLIENT_Value').Disable();
        if (HoteamUI.Common.IsNullOrEmpty(data.OWNER) == true) {
            para.CreatePersonalData = true;
        }
    } else
        if (para.UserType == "System" && data.ISCOMPANY == true) {
            para.CreateSystemData = true;
        }
    pageEvent.o.GetControl('ENAME_Value').SetText(data.ENAME);
    pageEvent.o.GetControl('REMARK_Value').SetText(data.REMARK);
    pageEvent.o.GetControl('USINGUSERSET_Value').SetChecked(data.USINGUSERSET);
    pageEvent.o.GetControl('USETYPE_Value').SetSelectByValue(data.USETYPE);
    pageEvent.o.GetControl('TOCLIENT_Value').SetChecked(data.TOCLIENT);
    //获取值类型数据以及显示的page信息
    var settingsData = HoteamUI.DataService.Call("InforCenter.SystemSetting.SystemSettingsService.GetSystemSettings", { para: para });
    if (HoteamUI.Common.IsNullOrEmpty(settingsData) == false && settingsData.length > 0) {
        var empty = new Array();
        var loadPageName = "";
        for (var i = 0; i < settingsData.length; i++) {
            empty[i] = { Value: settingsData[i].Name, Text: settingsData[i].Title };
            if (HoteamUI.Common.IsNullOrEmpty(data.SETTINGTYPE) == false) {
                if (data.SETTINGTYPE == settingsData[i].Name) {
                    loadPageName = settingsData[i].PageName;
                }
            }
        }
        var typeControl = pageEvent.o.GetControl('SETTINGTYPE_Value');
        typeControl.LoadItems(empty);
        typeControl.SetSelectedByValue(data.SETTINGTYPE);
        para.SettingsData = settingsData;

        if (HoteamUI.Common.IsNullOrEmpty(loadPageName) == false) {
            para.ChildPageData = $.parseJSON(data.SETTINGVALUE);
            var pageContainer = pageEvent.o.GetControl("PageContainerValue_Container");
            para.Type = 'Edit';
            pageContainer.LoadPage(loadPageName, para);
        }
    }
    HoteamUI.Page.SetContainerParas(pageEvent.o.pid, pageEvent.o.PageName(), para);
}

//浏览页面初始化数据
InforCenter_SystemSettings_SystemSettings_ViewPageOnLoadData = function (pageEvent) {
    var para = pageEvent.o.GetPara();
    var data = InforCenter_Platform_Object_GetObjectData(para.ObjectID, para);
    pageEvent.o.GetControl('ENAME_Value').SetText(data.ENAME);
    pageEvent.o.GetControl('REMARK_Value').SetText(data.REMARK);
    pageEvent.o.GetControl('USINGUSERSET_Value').SetChecked(data.USINGUSERSET);
    pageEvent.o.GetControl('USETYPE_Value').SetSelectByValue(data.USETYPE);
    pageEvent.o.GetControl('TOCLIENT_Value').SetChecked(data.TOCLIENT);
    //获取值类型数据以及显示的page信息
    var settingsData = HoteamUI.DataService.Call("InforCenter.SystemSetting.SystemSettingsService.GetSystemSettings", { para: para });
    if (HoteamUI.Common.IsNullOrEmpty(settingsData) == false && settingsData.length > 0) {
        var empty = new Array();
        var loadPageName = "";
        for (var i = 0; i < settingsData.length; i++) {
            empty[i] = { Value: settingsData[i].Name, Text: settingsData[i].Title };
            if (HoteamUI.Common.IsNullOrEmpty(data.SETTINGTYPE) == false) {
                if (data.SETTINGTYPE == settingsData[i].Name) {
                    loadPageName = settingsData[i].PageName;
                }
            }
        }
        var typeControl = pageEvent.o.GetControl('SETTINGTYPE_Value');
        typeControl.LoadItems(empty);
        typeControl.SetSelectedByValue(data.SETTINGTYPE);
        para.SettingsData = settingsData;
        HoteamUI.Page.SetContainerParas(pageEvent.o.pid, pageEvent.o.PageName(), para);

        if (HoteamUI.Common.IsNullOrEmpty(loadPageName) == false) {
            para.ChildPageData = $.parseJSON(data.SETTINGVALUE);
            var pageContainer = pageEvent.o.GetControl("PageContainerValue_Container");
            para.Type = 'View';
            pageContainer.LoadPage(loadPageName, para);
        }
    }
}

//没有登录不允许获取
Hoteam_Paltform_SystemSettings_Check = function () {
    if (HoteamUI.Common.IsNullOrEmpty(HoteamUI.Security.LoginPara.UserID) == false) {
        return true;
    }
    return false;
}

Hoteam_Paltform_SystemSettings_CallBack = function (ret) {
    if (ret) {
        var data = JSON.parse(ret);
        HoteamUI.SystemSettings = data;
    }
}

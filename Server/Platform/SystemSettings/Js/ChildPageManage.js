
//String子页面处理
//页面初始化事件
InforCenter_SystemSettings_SystemSettings_StringPageLoadData = function (pageEvent) {
    var para = pageEvent.o.GetPara();
    var strControl = pageEvent.o.GetControl("VALUE_Value");
    if (HoteamUI.Common.IsNullOrEmpty(para.ChildPageData) == false) {
        var data = para.ChildPageData;
        if (HoteamUI.Common.IsNullOrEmpty(data.Value) == false) {
            strControl.SetText(data.Value);
        }
    }
    if (para.Type == "View") {
        strControl.Disable();
    }
}

//获取string子页面数据
InforCenter_SystemSettings_SystemSettings_StringPageGetData = function (pageEvent) {
    InforCenter_Platform_Object_Data = null;
    var bCheck = true;
    var data = {};
    {
        var c = pageEvent.o.GetControl('VALUE_Value');
        if (c.Check() == false) bCheck = false;
        data.Value = c.GetText();
    }
    if (bCheck) {
        InforCenter_Platform_Object_Data = data;
    }
}


//Bool子页面处理
//页面初始化事件
InforCenter_SystemSettings_SystemSettings_BoolPageLoadData = function (pageEvent) {
    var para = pageEvent.o.GetPara();
    var boolControl = pageEvent.o.GetControl("Bool_Value");
    if (HoteamUI.Common.IsNullOrEmpty(para.ChildPageData) == false) {
        var data = para.ChildPageData;
        if (HoteamUI.Common.IsNullOrEmpty(data.Value) == false) {
            boolControl.SetSelectByValue(data.Value);
        }
    }
    if (para.Type == "View") {
        boolControl.Disable();
    }
}

//获取子页面数据
InforCenter_SystemSettings_SystemSettings_BoolPageGetData = function (pageEvent) {
    InforCenter_Platform_Object_Data = null;
    var bCheck = true;
    var data = {};
    {
        var c = pageEvent.o.GetControl('Bool_Value');
        if (c.Check() == false) bCheck = false;
        data.Value = c.GetValue();
    }
    if (bCheck) {
        InforCenter_Platform_Object_Data = data;
    }
}

//枚举页面处理

//页面初始化事件
InforCenter_SystemSettings_SystemSettings_DropDownPageLoadData = function (pageEvent) {
    var para = pageEvent.o.GetPara();
    var dropDownControl = pageEvent.o.GetControl("DropDownList_Value");
    var enumNameControl = pageEvent.o.GetControl("ENUMERATIONNAME_Value");
    if (HoteamUI.Common.IsNullOrEmpty(para.ChildPageData) == false) {
        var data = para.ChildPageData;
        if (HoteamUI.Common.IsNullOrEmpty(data.Value) == false) {
            enumNameControl.SetText(data.EnumName);
            InforCenter_SystemSettings_SystemSettings_LoadEnum(dropDownControl, data.EnumName);
            dropDownControl.SetSelectedByValue(data.Value);
        }
    }
    if (para.Type == "Edit" || para.Type == "View") {
        enumNameControl.Disable();
        if (para.Type == "View")
            dropDownControl.Disable();
    }
}

//获取页面数据
InforCenter_SystemSettings_SystemSettings_DropDownPageGetData = function (pageEvent) {
    InforCenter_Platform_Object_Data = null;
    var bCheck = true;
    var data = {};
    {
        var c = pageEvent.o.GetControl('ENUMERATIONNAME_Value');
        if (c.Check() == false) bCheck = false;
        data.EnumName = c.GetText();
    }
    {
        var c = pageEvent.o.GetControl('DropDownList_Value');
        if (c.Check() == false) bCheck = false;
        data.Value = c.GetSelectedValue();
    }
    if (bCheck) {
        InforCenter_Platform_Object_Data = data;
    } else {
        return false;
    }
}

//枚举名称失去焦点事件
InforCenter_SystemSettings_SystemSettings_OnEnumNameFocusout = function (ctrlEvent) {
    var enumName = ctrlEvent.o.GetText();
    InforCenter_SystemSettings_SystemSettings_LoadEnum(ctrlEvent.o, enumName);
}

InforCenter_SystemSettings_SystemSettings_LoadEnum = function (ctrl, enumName) {
    if (HoteamUI.Common.IsNullOrEmpty(enumName) == false) {
        var para = { EnumName: enumName };
        var enumDic = HoteamUI.DataService.Call("InforCenter.SystemSetting.SystemSettingsService.GetEnumByName", { para: para });

        var empty = new Array();
        var dropDownCtl = ctrl.OtherControl("DropDownList_Value");

        if (enumDic == null || enumDic.length == 0) {
            empty[0] = { Value: "", Text: "" };
        } else {
            for (x in enumDic) {
                x = parseInt(x);
                empty[x] = { Value: enumDic[x].Key, Text: enumDic[x].Value };
            }
        }
        dropDownCtl.LoadItems(empty);
        dropDownCtl.SetSelectedByValue(empty[0].Value);
    }
}

InforCenter_SystemSettings_ObjectPage_OnLoadData = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    var queryPageCtrl = page.GetControl('QueryContainer_Value');
    var itemNameCtrl = page.GetControl('OBJECTSELECT_Value');
    var QueryPageItemName = 'TreeCommonQuery';
    var positionQueryItemName = 'WorkSpacePositionQuery';
    if (pagePara.ChildPageData) {
        positionQueryItemName = pagePara.ChildPageData.ItemName;
        QueryPageItemName = pagePara.ChildPageData.QueryPageName;
        var objectValueCtrl = page.GetControl('ObjectValue_Value');
        objectValueCtrl.SetText(pagePara.ChildPageData.Text);
        objectValueCtrl.SetValue(pagePara.ChildPageData.Value);
    }
    queryPageCtrl.SetText(QueryPageItemName);
    itemNameCtrl.SetText(positionQueryItemName);
}

InforCenter_SystemSettings_ObjectPage_OnGetData = function (pageEvent) {
    InforCenter_Platform_Object_Data = null;
    var bCheck = true;
    var data = {};
    {
        var c = pageEvent.o.GetControl('ObjectValue_Value');
        if (c.Check() == false) bCheck = false;
        data.Value = c.GetValue();
        data.Text = c.GetText();
    }
    {
        var c = pageEvent.o.GetControl('OBJECTSELECT_Value');
        if (c.Check() == false) bCheck = false;
        data.ItemName = c.GetText();
    }
    {
        var c = pageEvent.o.GetControl('QueryContainer_Value');
        if (c.Check() == false) bCheck = false;
        data.QueryPageName = c.GetText();
    }
    if (bCheck) {
        InforCenter_Platform_Object_Data = data;
    }
}
InforCenter_SystemSettings_ObjectSelectId_OnClick = function (ctrlEvent) {
    var callback = function (data, ret) {
        if (ret != null && ret.length > 0) {
            var ctrl = HoteamUI.Control.Instance(data.id);
            if (ctrl.id != '') {
                var ids = '';
                var texts = '';
                for (var i = 0; i < ret.length; i++) {
                    var tempData = ret[i];
                    ids += ';' + tempData.value;
                    texts += ';' + tempData.text;
                }
                if (ids.length > 0) {
                    ids = ids.substr(1);
                }
                if (texts.length > 0) {
                    texts = texts.substr(1);
                }
                ctrl.SetValue(ids);
                ctrl.SetText(texts);
            }
        }
    }
    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    var itemNameCtrl = page.GetControl('OBJECTSELECT_Value');
    var itemName = itemNameCtrl.GetText();
    var positionQueryItemName = 'WorkSpacePositionQuery';
    if (!HoteamUI.Common.IsNullOrEmpty(itemName)) {
        positionQueryItemName = itemName;
    }
    var queryContainerCtrl = page.GetControl('QueryContainer_Value');
    var queryItemName = 'TreeCommonQuery';
    var queryItemText = queryContainerCtrl.GetText();
    if (!HoteamUI.Common.IsNullOrEmpty(queryItemText)) {
        queryItemName = queryItemText;
    }
    HoteamUI.UIManager.Popup(queryItemName, { Value: ctrlEvent.o.GetValue(), ItemName: positionQueryItemName, CommitJS: 'InforCenter_PLM_PositionSelect_OnCommit' }, callback, { id: ctrlEvent.o.id }, "500*560");
}
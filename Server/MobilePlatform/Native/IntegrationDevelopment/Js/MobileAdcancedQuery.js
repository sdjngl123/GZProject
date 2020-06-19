//修改下拉列表内容
var HoteamUI_PageEvent_MOBILEADVANCEDQUERYCREATEOBJECTTYPE_ValueOnChange_after = function (ctrlEvent) {
    var ctrl = ctrlEvent.o;
    var infoNameCtl = ctrl.OtherControl("INFONAME_Value");
    HoteamUI_PageMobile_AdvancedQuery_ReloadInfoList(ctrl, infoNameCtl);
};

//修改下拉列表内容
var HoteamUI_PageEvent_MOBILEADVANCEDQUERYEDITOBJECTTYPE_ValueOnChange_after = function (ctrlEvent) {
    var ctrl = ctrlEvent.o;
    var infoNameCtl = ctrl.OtherControl("INFONAME_Value");
    HoteamUI_PageMobile_AdvancedQuery_ReloadInfoList(ctrl, infoNameCtl);
};

//修改下拉列表内容
var HoteamUI_PageMobile_AdvancedQuery_ReloadInfoList = function (ctrl, infoNameCtl) {
    if (ctrl.id && infoNameCtl.id) {
        var value = ctrl.GetSelectedValue();
        if (value && value != "") {
            InforCenter_Platform_Object_SetInfoTypeList(infoNameCtl, value, false);
        }
    }
};

var InforCenter_MOBILEADVANCEDQUERY_EditPage_OnCreate = function (pageEvent, data) {
    var o1 = pageEvent.o.GetControl('OBJECTTYPE_Value');
    var o = pageEvent.o.GetControl('INFONAME_Value');
    HoteamUI_PageMobile_AdvancedQuery_ReloadInfoList(o1, o);
    if (o1.id != '' && o.id != '') {
        o.SetSelectedByValue(data.INFONAME);
    }
}

var HoteamUI_PageEvent_MOBILEADVANCEDQUERYVIEWOnCreate_after = function (pageEvent) {
    var para = pageEvent.o.GetPara();
    var data = InforCenter_Platform_Object_GetObjectData(para.ObjectID, para);
    {
        var o = pageEvent.o.GetControl('OBJECTTYPE_Value');
        if (o.id != '') {
            if (data.OBJECTTYPE != data.OBJECTTYPE_DisplayValue) {
                o.SetText(data.OBJECTTYPE + ' (' + data.OBJECTTYPE_DisplayValue + ')');
            }
            else {
                o.SetText(data.OBJECTTYPE_DisplayValue);
            }
        }
    }
    {
        var o = pageEvent.o.GetControl('INFONAME_Value');
        if (o.id != '') {
            var ret = HoteamUI.DataService.Call("InforCenter.Platform.ObjectService.GetInfoTypeList", { para: { ObjectType: data.OBJECTTYPE } });
            if (ret && ret.length > 0) {
                for (var x = 0; x < ret.length; x++) {
                    if (ret[x].Key == data.INFONAME) {
                        o.SetText(ret[x].Key + ' (' + ret[x].Value + ')');
                        return;
                    }
                }
            }

            var text = data.INFONAME_DisplayValue ? data.INFONAME_DisplayValue : '';
            o.SetText(text);
        }
    }
}
InforCenter_IntegrationDevelopment_MobilePageListItemCreate_OnCreate = function (pageEvent) {
    var para = pageEvent.o.GetPara();
    var data = InforCenter_Platform_Object_GetObjectInitData('MOBILEPAGELISTITEM', para);
    var o = pageEvent.o.GetControl('OBJECTTYPE_Value');
    if (o.id != '') {
        InforCenter_Platform_Object_ObjectTypeListValue(o, 'OBJECTTYPE', 'MOBILEPAGELISTITEM', true);
        o.SetSelectedByValue(data.OBJECTTYPE);
    }
    var c = pageEvent.o.GetControl('OBJECTSTATE_Value');
    if (c.id != '') {
        c.SetText(data.OBJECTSTATE);
    }

    var functionName = 'InforCenter_MOBILEPAGELISTITEM_CreatePage_OnCreate';
    if (window[functionName] && typeof window[functionName] == 'function')
        return window[functionName](pageEvent, data);
}

InforCenter_IntegrationDevelopment_MobilePageListItemCreate_OnGetData = function (pageEvent) {
    InforCenter_Platform_Object_Data = null; var bCheck = true; var data = { ObjectType: 'MOBILEPAGELISTITEM' };
    var c = pageEvent.o.GetControl('OBJECTTYPE_Value');
    if (c.id != '') {
        if (c.Check() == false) bCheck = false;
        if (c.IsInOption() == false) {
            var infoName = pageEvent.o.GetControl('OBJECTTYPE_Label').GetText();
            var msg = HoteamUI.Language.Lang('Platform.DorpdownIsnotInOption').replace('[ColText]', infoName);
            HoteamUI.UIManager.MsgBox(msg);
            bCheck = false;
        }
        data.OBJECTTYPE = c.GetSelectedValue();
    }

    var c = pageEvent.o.GetControl('ENAME_Value');
    if (c.id != '') {
        if (c.Check() == false) bCheck = false;
        data.TAB = data.ENAME = c.GetText().trim();
    };

    var c = pageEvent.o.GetControl('OBJECTSTATE_Value');
    if (c.id != '') {
        if (c.Check() == false) bCheck = false;
        data.OBJECTSTATE = c.GetText().trim();
    };
    var singleButton = pageEvent.o.GetControl('SINGLEBUTTON_Value');
    data.SingleButton = singleButton.GetValue();
    var listContent = pageEvent.o.GetControl('LISTCONTENT_Value');
    data.ListContent = listContent.GetValue();

    var slideButtonGrid = pageEvent.o.GetControl("Grid");
    var select = slideButtonGrid.SaveGridRows();
    if (select && select.success && select.rowsObject.length > 0) {
        var slidebuttonvalue = [];
        for (var i = 0; i < select.rowsObject.length; i++) {
            slidebuttonvalue.push(select.rowsObject[i].Value);
        }
        data.SlideButton = JSON.stringify(slidebuttonvalue);
    }
    if (bCheck) InforCenter_Platform_Object_Data = data;
}

InforCenter_IntegrationDevelopment_MobilePageListItemCreate_OnSaveCheck = function (pageEvent) {
    InforCenter_Platform_Object_SaveCheck = true;
    var functionName = 'InforCenter_MOBILEPAGELISTITEM_CreatePage_OnOK';
    if (window[functionName] && typeof window[functionName] == 'function')
        InforCenter_Platform_Object_SaveCheck = window[functionName](pageEvent);
}

InforCenter_IntegrationDevelopment_MobilePageListItemEdit_OnCreate = function (pageEvent) {
    var para = pageEvent.o.GetPara();
    var data = InforCenter_Platform_Object_GetObjectData(para.ObjectID, para);
    var ename = pageEvent.o.GetControl('ENAME_Value');
    if (ename.id != '') {
        ename.SetText(data.ENAME);
    }
    var o = pageEvent.o.GetControl('OBJECTTYPE_Value');
    if (o.id != '') {
        InforCenter_Platform_Object_ObjectTypeListValue(o, 'OBJECTTYPE', 'MOBILEPAGELISTITEM', true);
        o.SetSelectedByValue(data.OBJECTTYPE);
    }

    var c = pageEvent.o.GetControl('OBJECTSTATE_Value');
    if (c.id != '') {
        c.SetText(data.OBJECTSTATE);
    }
    if (data.SINGLEBUTTON) {
        var single = InforCenter_Platform_Object_GetObjectData(data.SINGLEBUTTON);
        if (single) {
            pageEvent.o.GetControl('SINGLEBUTTON_Value').SetText(single.ENAME);
            pageEvent.o.GetControl('SINGLEBUTTON_Value').SetValue(JSON.stringify(single));
        }
    }

    if (data.LISTCONTENT) {
        var content = InforCenter_Platform_Object_GetObjectData(data.LISTCONTENT);
        if (content) {
            pageEvent.o.GetControl('LISTCONTENT_Value').SetText(content.ENAME);
            pageEvent.o.GetControl('LISTCONTENT_Value').SetValue(JSON.stringify(content));
        }
    }


    if (data.SLIDEBUTTON) {
        var list = data.SLIDEBUTTON.split(';');
        var editgrid = pageEvent.o.GetControl("Grid");
        for (var i = 0; i < list.length; i++) {
            var slide = InforCenter_Platform_Object_GetObjectData(list[i]);
            if (slide) {
                var griddata = {};
                griddata.ButtonName = { ColText: slide.ENAME };
                griddata.Value = { ColText: JSON.stringify(slide) };
                editgrid.AddGridRow(0, false, griddata);
            }
        }
    }

    var functionName = 'InforCenter_MOBILEPAGELISTITEM_EditPage_OnCreate';
    if (window[functionName] && typeof window[functionName] == 'function')
        return window[functionName](pageEvent, data);
}

InforCenter_IntegrationDevelopment_MobilePageListItemEdit_OnGetData = function (pageEvent) {
    InforCenter_Platform_Object_Data = null;
    var bCheck = true;
    var para = pageEvent.o.GetPara();
    var data = { ObjectID: para.ObjectID }
    var c = pageEvent.o.GetControl('OBJECTTYPE_Value');
    if (c.id != '') {
        if (c.Check() == false) bCheck = false;
        if (c.IsInOption() == false) {
            var infoName = pageEvent.o.GetControl('OBJECTTYPE_Label').GetText();
            var msg = HoteamUI.Language.Lang('Platform.DorpdownIsnotInOption').replace('[ColText]', infoName);
            HoteamUI.UIManager.MsgBox(msg);
            bCheck = false;
        }
        data.OBJECTTYPE = c.GetSelectedValue();
    }
    var c = pageEvent.o.GetControl('ENAME_Value');
    if (c.id != '') {
        if (c.Check() == false) bCheck = false;
        data.ENAME = c.GetText().trim();
    };
    var c = pageEvent.o.GetControl('OBJECTSTATE_Value');
    if (c.id != '') {
        if (c.Check() == false) bCheck = false;
        data.OBJECTSTATE = c.GetText().trim();
    }

    var singleButton = pageEvent.o.GetControl('SINGLEBUTTON_Value');
    data.SingleButton = singleButton.GetValue();
    var listContent = pageEvent.o.GetControl('LISTCONTENT_Value');
    data.ListContent = listContent.GetValue();

    var slideButtonGrid = pageEvent.o.GetControl("Grid");
    var select = slideButtonGrid.SaveGridRows();
    if (select && select.success && select.rowsObject.length > 0) {
        var slidebuttonvalue = [];
        for (var i = 0; i < select.rowsObject.length; i++) {
            slidebuttonvalue.push(select.rowsObject[i].Value);
        }
        data.SlideButton = JSON.stringify(slidebuttonvalue);
    }
    if (bCheck) InforCenter_Platform_Object_Data = data;
}

InforCenter_IntegrationDevelopment_MobilePageListItemEdit_OnSaveCheck = function (pageEvent) {
    InforCenter_Platform_Object_SaveCheck = true;
    var functionName = 'InforCenter_MOBILEPAGELISTITEM_EditPage_OnOK';
    if (window[functionName] && typeof window[functionName] == 'function')
        InforCenter_Platform_Object_SaveCheck = window[functionName](pageEvent);
}
InforCenter_IntegrationDevelopment_MobilePageListItem_MenuClick = function (ctrlEvent) {
    var val = ctrlEvent.value;
    switch (val) {
        case "Create":
            var callback = function (data, ret) {
                if (ret && ret.Confirm == "OK") {
                    var editgrid = ctrlEvent.o.OtherControl("Grid");
                    var griddata = {};
                    griddata.ButtonName = { ColText: ret.ENAME };
                    griddata.Value = { ColText: JSON.stringify(ret) };
                    editgrid.AddGridRow(0, false, griddata);
                }
            }
            HoteamUI.UIManager.Popup("MobilePageButtonValue", {}, callback);
            break;
        case "Edit":
            var editgrid = ctrlEvent.o.OtherControl("Grid");
            var select = editgrid.GetSelectedRows();
            if (select.length != 1) {
                HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("Platform.NotSingleSelectionException"));
                return;
            }
            var row = select[0]
            var editcallback = function (data, ret) {
                if (ret && ret.Confirm == "OK") {
                    editgrid.SetCellContent(row.row_number, "ButtonName", ret.ENAME, ret.ENAME);
                    editgrid.SetCellContent(row.row_number, "Value", JSON.stringify(ret), JSON.stringify(ret));
                }
            }
            HoteamUI.UIManager.Popup("MobilePageButtonValue", { ObjectInfo: row.Value }, editcallback);
            break;
        case "Delete":
            var editgrid = ctrlEvent.o.OtherControl("Grid");
            var rows = editgrid.GetSelectedRowsID();
            if (rows && rows.length > 0) {
                editgrid.DeleteGridRow(rows);
            }
            break;
    }
}
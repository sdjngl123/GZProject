InforCenter_IntegrationDevelopment_MobilePageButtonTypePage_OnCreate = function (pageEvent) {
    var pagePara = pageEvent.o.GetPara();
    var action = pageEvent.o.GetControl("Action_Value");
    pageEvent.o.GetControl("Info_Container").HiddenPanel(["item31", "item32", "item4"]);
    var ret = HoteamUI.DataService.Call("InforCenter.Enumeration.EnumerationService.GetEnumerationItem", { para: { EnumerationName: "MobilePageExecScriptAction" } });
    if (ret == null) {
        return;
    }
    var empty = [];
    var step = 0;

    for (var x = 0; x < ret.length; x++) {
        x = parseInt(x);
        empty[x + step] = { Value: ret[x].Key, Text: ret[x].Value };
    }
    action.LoadItems(empty);

    var extend = undefined;

    if (pagePara && pagePara.ButtonItemTypeExtend) {
        try {
            extend = JSON.parse(pagePara.ButtonItemTypeExtend);
        } catch (e) {
            return;
        }
    }
    if (pagePara.Type == "ExecScript" || pagePara.Type == "PopupPage") {
        pageEvent.o.GetControl("Info_Container").ShowPanel(["item31", "item32", "item4"]);
    }
    var o = pageEvent.o.GetControl('PageType_Value');
    if (o.id != '') {
        InforCenter_IntegrationDevelopment_MobilePageValue_SetPageList(o, 'PAGETYPE', 'MOBILEPAGEDEV', true);
        if (extend && extend.PageType) {
            o.SetSelectedByValue(extend.PageType);
        }
    }
    var o = pageEvent.o.GetControl('PageName_Value');
    if (o.id != '') {
        InforCenter_Platform_Object_SetObjectEnumList(o, 'CALLPAGE', 'FUNCBUTTON', true);
        if (extend && extend.PageID) {
            o.SetSelectedByValue(extend.PageID);
        }
    }
    if (extend) {
        if (extend.PagePara) {
            try {
                var extendpagePara = JSON.parse(extend.PagePara);
                var editgrid = pageEvent.o.GetControl("Grid");
                for (var i = 0; i < extendpagePara.length; i++) {
                    var griddata = {};
                    griddata.ParaName = { ColText: extendpagePara[i].ParaName };
                    griddata.ParaValue = { ColText: extendpagePara[i].ParaValue };
                    editgrid.AddGridRow(0, false, griddata);
                }

            } catch (e) {

            }
        }
        if (pagePara.Type == "ExecScript" || pagePara.Type == "PopupPage") {
            if (extend.AssemblyName) {
                pageEvent.o.GetControl("Assembly_Value").SetText(extend.AssemblyName);
            }
            if (extend.ClassName) {
                pageEvent.o.GetControl("Class_Value").SetText(extend.ClassName);
            }
            if (extend.Action) {
                action.SetSelectedByValue(extend.Action);
            }
        }
    }
}

InforCenter_IntegrationDevelopment_MobilePageButtonTypePage_OnOK = function (ctrlEvent) {

    var pagepara = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID()).GetPara();
    var ret = {};
    var c = ctrlEvent.o.OtherControl('PageType_Value');
    if (c.Check() == false)
        bCheck = false;
    ret.PageType = c.GetSelectedValue();
    var c = ctrlEvent.o.OtherControl('PageName_Value');
    if (c.Check() == false)
        bCheck = false;
    ret.PageID = c.GetSelectedValue();
    var pageParaCtrl = ctrlEvent.o.OtherControl('Grid');
    if (pageParaCtrl.id != '') {
        var select = pageParaCtrl.SaveGridRows();
        if (select && select.success && select.rowsObject.length > 0) {
            var paralist = [];
            for (var i = 0; i < select.rowsObject.length; i++) {
                paralist.push({ ParaName: select.rowsObject[i].ParaName, ParaValue: select.rowsObject[i].ParaValue });
            }
            ret.PagePara = JSON.stringify(paralist);
        }
    }

    if (pagepara && pagepara.Type == "ExecScript" || pagepara.Type == "PopupPage") {
        var c = ctrlEvent.o.OtherControl('Assembly_Value');
        if (c.id != '') {
            if (c.Check() == false) {
                return;
            }
            ret.AssemblyName = c.GetText();
        }

        var c = ctrlEvent.o.OtherControl('Class_Value');
        if (c.id != '') {
            if (c.Check() == false) {
                return;
            }
            ret.ClassName = c.GetText();
        }
        var action = ctrlEvent.o.OtherControl('Action_Value');
        if (action.id != '') {
            ret.Action = action.GetSelectedValue();
        }
    }
    HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), { Confirm: "OK", ButtonItemTypeExtend: JSON.stringify(ret) });
}

InforCenter_IntegrationDevelopment_MobilePageButtonTypePage_MenuClick = function (ctrlEvent) {
    var val = ctrlEvent.value;
    switch (val) {
        case "Create":
            var editgrid = ctrlEvent.o.OtherControl("Grid");
            editgrid.AddGridRow(0, false);
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

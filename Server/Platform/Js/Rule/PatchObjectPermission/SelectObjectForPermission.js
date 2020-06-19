InforCenter_Platform_SelectObjectForPermission_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    if (pagePara && pagePara.SelectID) {
        var data = HoteamUI.DataService.Call("Hoteam.InforCenter.RulePageService.GetGridDataByPatchObjectPermission", { para: { SelectID: pagePara.SelectID } });
        if (data) {
            page.GetControl("ObjectList").LoadColTitle(data.TitleData);
            page.GetControl("ObjectList").LoadGridRows(data.GridObjectData);
        }
    }
}

InforCenter_Platform_SelectObjectForPermission_MenuClick = function (ctrlEvent) {

    switch (ctrlEvent.value) {
        case "Paste":
            InforCenter_Platform_SelectObjectForPermission_Paste(ctrlEvent);
            break;
        case "Remove":
            var grid = ctrlEvent.o.OtherControl("ObjectList");
            var selectrows = grid.GetSelectedRows();
            if (!selectrows || selectrows.length <= 0) {
                HoteamUI.UIManager.Popup({ pagename: "Confirm", paras: { pageMode: "OK", message: HoteamUI.Language.Lang("Platform.EmptySelectionException") } });
                return;
            }
            grid.DeleteGridRow();
            break;
        case "AddChild":
            var grid = ctrlEvent.o.OtherControl("ObjectList");
            var selectrows = grid.GetSelectedRows();
            if (!selectrows || selectrows.length <= 0) {
                HoteamUI.UIManager.Popup({ pagename: "Confirm", paras: { pageMode: "OK", message: HoteamUI.Language.Lang("Platform.EmptySelectionException") } });
                return;
            }
            InforCenter_Platform_SelectObjectForPermission_AddChild(ctrlEvent, selectrows);
            break;
    }
}


InforCenter_Platform_SelectObjectForPermission_Paste = function (ctrlEvent) {
    if (ClipBoard.IsEmpty == true || ClipBoard.ObjIDArr.length == 0) {
        HoteamUI.UIManager.Popup({ pagename: "Confirm", paras: { pageMode: "OK", message: HoteamUI.Language.Lang("ClipBoard.ClipBoardEmpty") } });
        return;
    }
    var rows = ctrlEvent.o.OtherControl("ObjectList").SaveGridRows();
    var existArr = [];
    var notExistArr = [];

    for (var i = 0; i < ClipBoard.ObjIDArr.length; i++) {
        var copy = ClipBoard.ObjIDArr[i];
        var exist = false;
        for (var j = 0; j < rows.rowsObject.length; j++) {
            var row = rows.rowsObject[j];
            if (row.EID == copy) {
                exist = true;
                break;
            }
        }
        if (exist == true) {
            existArr.push(copy);
        } else {
            notExistArr.push(copy);
        }
    }

    if (existArr.length > 0) {
        var existstring = HoteamUI.DataService.Call("Hoteam.InforCenter.RulePageService.GetPatchPermissionExistData", { para: { SelectID: existArr.join(';') } });
        if (existstring) {
            HoteamUI.UIManager.Popup({ pagename: "Confirm", paras: { pageMode: "OK", message: existstring } });
        }
    }
    if (notExistArr.length > 0) {
        var objectids = notExistArr.join(';');
        var data = HoteamUI.DataService.Call("Hoteam.InforCenter.RulePageService.GetGridDataByPatchObjectPermission", { para: { SelectID: objectids } });

        if (data && data.GridObjectData) {
            ctrlEvent.o.OtherControl("ObjectList").LoadGridRows(data.GridObjectData, false);
        }
        //没权限的给出提示
        if (data && data.NonPermission && data.NonPermission.length > 0) {
            var detail = "";
            for (var i = 0; i < data.NonPermission.length; i++) {
                var non = data.NonPermission[i];
                var eid = non.Key;
                detail += non.Value + "\r\n";
            }
            HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("ObjectPermissionPage.NonPermission"), detail);
        }
    }

}

InforCenter_Platform_SelectObjectForPermission_AddChild = function (ctrlEvent, selectrows) {
    var selectids = [];
    for (var i = 0; i < selectrows.length; i++) {
        selectids.push(selectrows[i].EID);
    }
    var callback = function (data, ret) {
        if (ret && ret.SelectRows) {
            //原来列表中的数据
            var gridctrl = data.o.OtherControl("ObjectList");
            var oldData = gridctrl.SaveGridRows();
            var grid = {};
            grid.Rows = [];
            for (var i = 0; i < ret.SelectRows.length; i++) {
                var row = ret.SelectRows[i];
                //判断是否存在
                var exist = false;
                for (var e = 0; e < oldData.rowsObject.length; e++) {
                    var existrow = oldData.rowsObject[e];
                    if (existrow.EID == row.EID) {
                        exist = true;
                        break;
                    }
                }
                if (exist == true) {
                    continue;
                }
                var serverRow = [];
                for (var item in row) {
                    if (!row.hasOwnProperty(item)) {
                        continue;
                    }
                    var col = {};
                    col.ColName = item;

                    var value = row[item];
                    if (typeof (value) == "string") {
                        col.ColText = value;
                    } else {
                        col.ColIcon = value.icon;
                        col.ColText = value.text;
                    }
                    serverRow.push(col);
                }
                grid.Rows.push(serverRow);

            }
            data.o.OtherControl("ObjectList").LoadGridRows(grid, false);
        }
    }
    var paras = {};
    paras.SelectID = selectids.join(';');
    HoteamUI.UIManager.Popup("ChildObjectListForPermission", paras, callback, ctrlEvent);
}


InforCenter_Platform_PatchObjectPermissionGuide_SaveSelectObject = function (pages, currentpage) {
    var grid = currentpage.GetControl("ObjectList").SaveGridRows();
    if (!grid || grid.rowsObject.length <= 0) {
        HoteamUI.UIManager.Popup({ pagename: "Confirm", paras: { pageMode: "OK", message: HoteamUI.Language.Lang("SelectObjectForPermission.RowEmpty") } });
        return false;
    }
    return true;
}
InforCenter_Platform_PatchObjectPermissionGuide_PermissionPageInit = function (prepage, allpages) {
    var ret = {};
    ret.DisableMultiPermission = true;

    var grid = prepage.GetControl("ObjectList").SaveGridRows();
    var selectid = "";
    for (var i = 0; i < grid.rowsObject.length; i++) {
        selectid += ";" + grid.rowsObject[i].EID;
    }
    if (selectid.length > 0) {
        selectid = selectid.substring(1);
    }
    ret.SelectID = selectid;
    ret.IsPatchPermission = true;
    return ret;
}

InforCenter_Platform_PatchObjectPermissionGuide_SaveObjectPermissionOnCheck = function (pages, currentpage) {
    var pagepara = currentpage.GetPara();
    return HoteamUI.Page.FirePageEvent(currentpage.pid, "OnCheck", pagepara);
}

InforCenter_Platform_PatchObjectPermissionGuide_InitJS = function (curPage, prePage,allpages) {
    var pagePara = curPage.GetPara();
    if (pagePara)
    {
        if (pagePara.GuidePagePID)
        {
            var enable = HoteamUI.DataService.Call("Hoteam.InforCenter.RuleDataService.IsEnableObjectPermission", {});
            if (!enable) {
                HoteamUI.UIManager.Popup("Confirm", { pageMode: "OK", context: "ObjectPermission", labelName: "EnableObjectPermission" })
                HoteamUI.UIManager.Return(pagePara.GuidePagePID, null);
                return false;
            }
        }
    }
}
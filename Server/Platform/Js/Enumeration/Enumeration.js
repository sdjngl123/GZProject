InforCenter_Platform_Enumeration_Check = function (ctrlEvent) {

    var errmsg = HoteamUI.Language.Lang("EnumerationGrid", "ENAMEExistError");
    return InforCenter_Platform_Enumeration_CheckData(ctrlEvent, errmsg);
}
InforCenter_Platform_EnumerationCateGory_Check = function (ctrlEvent) {
    var errmsg = HoteamUI.Language.Lang("EnumerationGrid", "ENAMEExistError");
    return InforCenter_Platform_Enumeration_CheckData(ctrlEvent, errmsg);
}

InforCenter_Platform_EnumerationItem_Check = function (ctrlEvent) {
    var errmsg = HoteamUI.Language.Lang("EnumerationGrid", "ENAMEORECODEExistError");
    return InforCenter_Platform_Enumeration_CheckData(ctrlEvent, errmsg);
}

InforCenter_Platform_EnumerationItem_GetMaxSerialNum = function (para) {
    var editgrid = para[1].ListID;
    if (editgrid) {
        editgrid = HoteamUI.Control.Instance(editgrid);
        var data = editgrid.SaveGridRows();
        var serNums = [];
        if (data && data.success == true) {
            for (var i = 0; i < data.rowsObject.length; i++) {
                var ser = data.rowsObject[i].SEQUENCE;
                if (ser) {
                    serNums.push(parseInt(ser));
                }
            }
        } else {
            return [{ MaxNum: editgrid.GetRowsCount() + 1 }];
        }
        //serNums.sort(); sort是按照字母顺序，即使是数字
        for (var i = 0; i < serNums.length - 1; i++) {
            if (serNums[i] > serNums[i + 1]) {
                var tmp = serNums[i];
                serNums[i] = serNums[i + 1];
                serNums[i + 1] = tmp;
            }
        }
        var max = 1;
        if (serNums.length > 0) {
            var max = serNums[serNums.length - 1];
            max++;
        }
        return [{ MaxNum: max }];
    }
}

InforCenter_Platform_Enumeration_CheckData = function (ctrlEvent, errmsg) {

    //判断当前列表数据是否存在重复，防止在没保存时添加两个相同的值
    var rowids = ctrlEvent.o.GetAllRowsID()
    for (var i = 0; i < rowids.length; i++) {
        var rowNum = rowids[i];
        if (rowNum != ctrlEvent.rowid) {
            var obj = ctrlEvent.o.GetCellContent(rowNum, ctrlEvent.colName);
            var text = ctrlEvent.newData[ctrlEvent.colName];
            if (text instanceof Object) {
                text = text.text;
            }
            if (obj && obj.text && $.trim(obj.text) == $.trim(text)) {
                HoteamUI.UIManager.MsgBox(errmsg);
                return false;
            }
        }
    }
    //从数据库中获取
    var para = {};

    var content = ctrlEvent.o.GetRowContent(ctrlEvent.rowid);
    if (content) {
        para.ID = content.EID;
    }

    para.ColName = ctrlEvent.colName;
    var value = ctrlEvent.newData[ctrlEvent.colName];
    if (value instanceof Object) {
        value = value.value;
    }
    para.Value = value;
    if (ctrlEvent.TreeGuid) {
        var tree = HoteamUI.Control.Instance(ctrlEvent.TreeGuid);
        para.TreeEID = tree.GetSelectedNode().value1;
    }
    var result = HoteamUI.DataService.Call("Hoteam.InforCenter.EnumerationService.CheckEnum", { para: para });
    if (result != true) {
        return false;
    }

}

InforCenter_Platform_Enumeration_Chenge = function (ctrlEvent) {
    var data = new Array();
    data.push({ Text: "可选项1", Value: "option1" });
    data.push({ Text: "可选项2", Value: "option2" });
    data.push({ Text: "可选项3", Value: "option3" });
    return data;
}

InforCenter_Platform_EnumerationItem_Up = function (para) {
    var editgrid = para[1].ListID;
    if (editgrid) {
        editgrid = HoteamUI.Control.Instance(editgrid);
        var select = editgrid.GetSelectedRows();
        var selectrowids = editgrid.GetSelectedRowsID();
        if (select && select.length == 1) {
            //与上一个进行交换
            var selectrow = select[0];
            var sequence = selectrow.SEQUENCE;
            var rowNum = selectrowids[0] - 1;
            if (rowNum > 0) {
                var nextRow = editgrid.GetRowContent(rowNum);
                var nextsequence = nextRow.SEQUENCE;
                //如果两个值一样，上一个加1
                if (sequence == nextsequence) {
                    nextsequence++;
                }
                if (parseInt(sequence) > parseInt(nextsequence)) {
                    editgrid.SetCellContent(selectrowids[0], "SEQUENCE", nextsequence, "", true);
                    editgrid.SetCellContent(rowNum, "SEQUENCE", sequence, "", true);
                }

                editgrid.MoveGridRow("before");
            }
            else {
                HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("Platform", "AlreadyMoveToTop"));
                return;
            }
        }
        else {
            var para = { pageMode: "OK", context: "Platform", labelName: "NotSingleSelectionException" }
            HoteamUI.UIManager.Popup("Confirm", para);
            return;
        }
    }
}
InforCenter_Platform_EnumerationItem_Down = function (para) {
    var editgrid = para[1].ListID;
    if (editgrid) {
        editgrid = HoteamUI.Control.Instance(editgrid);
        var select = editgrid.GetSelectedRows();
        var selectrowids = editgrid.GetSelectedRowsID();
        if (select && select.length == 1) {
            //与上一个进行交换
            var selectrow = select[0];
            var sequence = selectrow.SEQUENCE;
            var rowNum = selectrowids[0] + 1;
            var length = editgrid.GetAllRowsID().length;
            if (rowNum <= length) {
                var nextRow = editgrid.GetRowContent(rowNum);
                var nextsequence = nextRow.SEQUENCE;
                //如果两个值一样，上一个加1
                if (sequence == nextsequence) {
                    nextsequence++;
                }
                if (parseInt(sequence) < parseInt(nextsequence)) {
                    editgrid.SetCellContent(selectrowids[0], "SEQUENCE", nextsequence, "", true);
                    editgrid.SetCellContent(rowNum, "SEQUENCE", sequence, "", true);
                }

                editgrid.MoveGridRow("after");
            } else {
                HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("Platform", "AlreadyMoveToBottom"));
                return;
            } 
        }
        else {
            var para = { pageMode: "OK", context: "Platform", labelName: "NotSingleSelectionException" }
            HoteamUI.UIManager.Popup("Confirm", para);
            return;
        }
    }
}

InforCenter_Platform_EnumerationItem_ChangeEnumerationType = function (para) {
    var editgrid = para[1].ListID;
    var objecttype = para[1].ObjectType;
    var icon = "";
    if (objecttype == "ENUMERATION") {
        icon = "~/Platform/Image/Enumeration/p_enumeration_system_value.png";
    }
    if (editgrid) {
        editgrid = HoteamUI.Control.Instance(editgrid);
        var select = editgrid.GetSelectedRows();
        var selectrowids = editgrid.GetSelectedRowsID();
        if (select.length > 0) {
            for (var i = 0; i < select.length; i++) {
                var row = select[i];
                var type = row.LOVTYPE.value;
                if (type == "System") {
                    editgrid.SetCellContent(selectrowids[i], "LOVTYPE", HoteamUI.Language.Lang("Enumerations.LovTypeCustom"), "Custom", true);
                    editgrid.SetCellContent(selectrowids[i], "ICON", "", "", true);
                } else {
                    editgrid.SetCellContent(selectrowids[i], "LOVTYPE", HoteamUI.Language.Lang("Enumerations.LovTypeSystem"), "System", true);
                    editgrid.SetCellContent(selectrowids[i], "ICON", icon, icon, true);
                }
            }
        } else {
            var paras = { pageMode: "OK", context: "Platform", labelName: "EmptySelectionException" }
            HoteamUI.UIManager.Popup("Confirm", paras);
            return;
        }
    }
}

InforCenter_Platform_Enumeration_CheckDeleteRow = function (para) {
    var editgrid = para[1].ListID;
    if (editgrid) {
        var cannotdelete = false;
        editgrid = HoteamUI.Control.Instance(editgrid);
        var select = editgrid.GetSelectedRows();
        if (select.length > 0) {
            for (var i = 0; i < select.length; i++) {
                var row = select[i];
                if (row.LOVTYPE) {
                    var type = row.LOVTYPE.value;
                    if (type == "System") {
                        HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("EnumerationGrid.SystemLovCannotDeleteError"));
                        cannotdelete = true;
                        break;
                    }
                }
            }
        } else {
            var para = { pageMode: "OK", context: "Platform", labelName: "EmptySelectionException" }
            HoteamUI.UIManager.Popup("Confirm", para);
            return;
        }
        if (cannotdelete == false) {
            InforCenter_Platform_MenuCtrl_InnerReceiveServerData(para[0], { confirm: "OK" });
        }
    }
}

InforCenter_Platform_Enumeration_CheckDeleteTree = function (para) {
    var lovType = para[1].LovType;
    var enumobj = InforCenter_Platform_Object_GetObjectData(para[1].SelectID);
    lovType = enumobj.LOVTYPE;
    if (lovType == "System") {
        HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("EnumerationGrid.SystemLovCannotDeleteError"));
    } else {
        InforCenter_Platform_MenuCtrl_InnerReceiveServerData(para[0], { confirm: "OK" });
    }
}
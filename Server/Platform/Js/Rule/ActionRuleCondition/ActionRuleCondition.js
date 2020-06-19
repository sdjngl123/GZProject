//弹出条件编辑页面
InforCenter_Platform_ActionRuleCondition_ShowConditionValuePage = function (ctrlEvent) {
    var callback = function (data, ret) {
        if (ret != null) {
            var o = HoteamUI.Control.Instance(data.id);
            o.SetText(ret.ConditionValueText);
            o.SetValue(ret.ConditionValue);
        }
    }
    var para = {};
    //获取页面参数
    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    para = page.GetPara();
    //获取条件值参数
    var conditionValue = ctrlEvent.o.GetValue();
    if (HoteamUI.Common.IsNullOrEmpty(conditionValue) == false) {
        para.ConditionValue = JSON.parse(conditionValue);
    }
    HoteamUI.UIManager.Popup("ActionRuleConditionValue", para, callback, { id: ctrlEvent.o.id });
}

InforCenter_Platform_ActionRuleCondition_ShowConditionValuePageOnEditGrid = function (ctrlEvent) {
    var callback = function (data, ret) {
        if (ret != null) {
            //var o = HoteamUI.Control.Instance(data.id);
            //o.SetText(ret.ConditionValueText);
            //o.SetValue(ret.ConditionValue);
            ctrlEvent.setContent({ text: ret.ConditionValueText, value: ret.ConditionValue });
        }
    }
    var para = {};
    para.ConditionUseBy = InforCenter_Platform_ActionRuleCondition_GetConditionUseBy(ctrlEvent.o);
    //获取页面参数
    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    para = $.extend(para, page.GetPara());
    //获取条件值参数
    var conditionValue = ctrlEvent.value;
    if (HoteamUI.Common.IsNullOrEmpty(conditionValue) == false) {
        para.ConditionValue = JSON.parse(conditionValue);
    }
    HoteamUI.UIManager.Popup("ActionRuleConditionValue", para, callback, {});
}

InforCenter_Platform_ActionRuleCondition_Up = function (para) {
    //获取列表中所有数据
    var editgrid = para[1].ListID;
    if (editgrid) {
        editgrid = HoteamUI.Control.Instance(editgrid);
        var select = editgrid.GetSelectedRows();
        var selectrowids = editgrid.GetSelectedRowsID();
        if (select && select.length == 1) {
            
            //与上一个进行交换
            var selectrow = select[0];
            var selectRowsNumber = selectrow.row_number;
            if (selectRowsNumber == 1) {
                HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("Platform.AlreadyMoveToTop"));
                return;
            }
            var sequence = selectrow.SERIALNUMBER;
            var rowNum = selectrowids[0] - 1;
            if (rowNum > 0) {
                var nextRow = editgrid.GetRowContent(rowNum);
                var nextsequence = nextRow.SERIALNUMBER;
                //如果两个值一样，上一个加1
                if (sequence == nextsequence) {
                    nextsequence++;
                }
                if (parseInt(sequence) > parseInt(nextsequence)) {
                    editgrid.SetCellContent(selectrowids[0], "SERIALNUMBER", nextsequence, "",true);
                    editgrid.SetCellContent(rowNum, "SERIALNUMBER", sequence, "",true);
                }
                editgrid.MoveGridRow("before");
            }

        }
        else {
            var para = { pageMode: "OK", context: "Platform", labelName: "NotSingleSelectionException" }
            HoteamUI.UIManager.Popup("Confirm", para);
            return;
        }
    }
}
InforCenter_Platform_ActionRuleCondition_Down = function (para) {
    var editgrid = para[1].ListID;
    if (editgrid) {
        editgrid = HoteamUI.Control.Instance(editgrid);
        var select = editgrid.GetSelectedRows();
        var selectrowids = editgrid.GetSelectedRowsID();
        if (select && select.length == 1) {
            //与上一个进行交换
            var selectrow = select[0];

            var totalRowsCount = editgrid.GetRowsCount();
            var selectRowsNumber = selectrow.row_number;
            if (selectRowsNumber >= totalRowsCount) {
                HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("Platform.AlreadyMoveToBottom"));
                return;
            }

            var sequence = selectrow.SERIALNUMBER;
            var rowNum = selectrowids[0] + 1;
            var length = editgrid.GetAllRowsID().length;
            if (rowNum <= length) {
                var nextRow = editgrid.GetRowContent(rowNum);
                var nextsequence = nextRow.SERIALNUMBER;
                //如果两个值一样，上一个加1
                if (sequence == nextsequence) {
                    nextsequence++;
                }
                if (parseInt(sequence) < parseInt(nextsequence)) {
                    editgrid.SetCellContent(selectrowids[0], "SERIALNUMBER", nextsequence, "",true);
                    editgrid.SetCellContent(rowNum, "SERIALNUMBER", sequence, "",true);
                }
                editgrid.MoveGridRow("after");
            }
        }
        else {
            var para = { pageMode: "OK", context: "Platform", labelName: "NotSingleSelectionException" }
            HoteamUI.UIManager.Popup("Confirm", para);
            return;
        }
    }
}

InforCenter_Platform_ActionRuleCondition_GetMaxSerialNum = function (para) {
    var editgrid = para[1].ListID;
    if (editgrid) {
        editgrid = HoteamUI.Control.Instance(editgrid);
        var data = editgrid.SaveGridRows();
        var serNums = [];
        if (data && data.success == true) {
            for (var i = 0; i < data.rowsObject.length; i++) {
                var ser = data.rowsObject[i].SERIALNUMBER;
                if (ser) {
                    serNums.push(parseInt(ser));
                }
            }
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

//获取该条件是用在实体上还是关系上
InforCenter_Platform_ActionRuleCondition_GetConditionUseBy = function (editGrid) {
    var para = HoteamUI.Page.GetContainerPara(editGrid.OtherControl("ListView_Container").id);
    if (para && para.TreeGuid) {
        var selectNode = HoteamUI.Control.Instance(para.TreeGuid).GetSelectedNode();
        if (selectNode) {
            return selectNode.tag.USEBY;
        }
    }
}
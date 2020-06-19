//任务执行人OnCreate
InforCenter_Platform_SelectedTaskActorInfo_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    //保存上一个页面的数据
    InforCenter_Platform_WorkflowTemplateEdit_SavePreviousPageData(page);

    var template = WebDesignerWorkflowInfo.Template;
    var currInfo = WebDesignerWorkflowInfo.CurrSelectInfo;
    if (!currInfo || !currInfo.NodeID || !template) {
        return;
    }
    var node = currInfo;
    var data = node.AuditActor;
    var editGrid = page.GetControl("SelectedTaskActorInfoEditGrid");
    InforCenter_Platform_SelectedTaskActorInfo_InitEditGrid(editGrid, data);

}
InforCenter_Platform_SelectedTaskActorInfo_InitEditGrid = function (editGridCtrl, data) {
    //页面初始化时下拉框显示值不能确定，在此处获取一下，在设值是遍历
    var allItem = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateService.GetWorkflowActorItemList", { para: { TemplateType: WebDesignerWorkflowInfo.Template.TemplateType, ActorList: data } });

    var rows = new Array();
    if (!data) {
        return;
    }
    for (var i = 0; i < data.length; i++) {
        //组装EditGrid数据
        var cols = new Array();
        var actor = data[i];

        var typeCol = {};
        typeCol.ColName = "UserType";
        typeCol.ColValue = actor.Name;
        typeCol.ColText = HoteamUI.Language.Lang("WorkflowActorItems", actor.Name);
        cols.push(typeCol);

        var resultCol = {};
        resultCol.ColName = "Result";
        resultCol.ColValue = actor.Actors;
        for (var j = 0; j < allItem.length; j++) {
            if (allItem[j].Name == actor.Name) {
                if (HoteamUI.Common.IsNullOrEmpty(allItem[j].InitDataJSMethod) == false) {
                    //resultCol.ColText = eval(allItem[j].InitDataJSMethod);
                    var initPara = {};
                    initPara.Text = actor.Actors;
                    initPara.Value = actor.Name;
                    resultCol.ColText = HoteamUI.Common.ExeFunction(allItem[j].InitDataJSMethod, initPara);
                }
                else {
                    resultCol.ColText = actor.Actors;
                }
                break;
            }
        }
        cols.push(resultCol);
        rows.push(cols);
    }
    var editdata = {};
    editdata.Rows = rows;
    editGridCtrl.LoadGridRows(editdata);
}



//新建
InforCenter_Platform_SelectedTaskActorInfo_CreateMenu = function (ctrlEvent) {
    var editGrid = ctrlEvent.o.OtherControl("SelectedTaskActorInfoEditGrid");
    editGrid.AddGridRow("last", false);
}
//删除
InforCenter_Platform_SelectedTaskActorInfo_DeleteMenu = function (ctrlEvent) {
    var editGrid = ctrlEvent.o.OtherControl("SelectedTaskActorInfoEditGrid");
    if (InforCenter_Platform_Workflow_GridCheck(editGrid, true)) {
        editGrid.DeleteGridRow();
    }
}
//上移
InforCenter_Platform_SelectedTaskActorInfo_MoveUpMenu = function (ctrlEvent) {
    var editGrid = ctrlEvent.o.OtherControl("SelectedTaskActorInfoEditGrid");
    if (InforCenter_Platform_Workflow_GridCheck(editGrid)) {
        var selectRowsNumber = editGrid.GetSelectedRows()[0].row_number;
        if (selectRowsNumber == 1) {
            HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("Platform.AlreadyMoveToTop"));
            return;
        }
        editGrid.MoveGridRow("before");
    }
}
//下移
InforCenter_Platform_SelectedTaskActorInfo_moveDownMenu = function (ctrlEvent) {
    var editGrid = ctrlEvent.o.OtherControl("SelectedTaskActorInfoEditGrid");
    if (InforCenter_Platform_Workflow_GridCheck(editGrid)) {
        var totalRowsCount = editGrid.GetRowsCount();
        var selectRowsNumber = editGrid.GetSelectedRows()[0].row_number;
        if (selectRowsNumber >= totalRowsCount) {
            HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("Platform.AlreadyMoveToBottom"));
            return;
        }
        editGrid.MoveGridRow("after");
    }
}

InforCenter_Platform_Workflow_GridCheck = function (editGrid, isDelete) {
    var rows = editGrid.GetSelectedRows();
    if (rows.length == 0) {
        HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("Platform.NotSingleSelectionException"));
        return false;
    }
    if (!isDelete && rows.length > 1) {
        HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("Platform.NotSingleSelectionException"));
        return false;
    }
    return true;
}

//可编辑列表下拉框绑定
InforCenter_Platform_SelectedTaskActorInfo_BindingActorDropdown = function (ctrlEvent) {
    return HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateService.GetSelectedNodeActorforBindingDroupdown", { para: { TemplateType: WebDesignerWorkflowInfo.Template.TemplateType } });
}
//可编辑列表下拉框change
InforCenter_Platform_SelectedTaskActorInfo_ActorDropdownChanged = function (ctrlEvent) {
    var rowID = ctrlEvent.o.GetEditRowID();
    if (rowID) {
        ctrlEvent.o.SetCellContent(rowID, "Result", "", "");
    }
    InforCenter_Platform_SelectedTaskActorInfo_SetActors(ctrlEvent.o, ctrlEvent.value, "", "");
}

InforCenter_Platform_SelectedTaskActorInfo_SetActors = function (editGrid, type, value, text, callback) {
    var rowIDs = editGrid.GetEditRowID();
    if (rowIDs) {

        //获取执行人类型列表，根据选择的执行人类型，执行相应的JSMethod
        var item = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateService.GetWorkflowActorItem", { para: { Name: type } });
        if (item != null) {
            if (HoteamUI.Common.IsNullOrEmpty(item.PageName) == false) {
                var callback = function (data, ret) {
                    if (HoteamUI.Common.IsNullOrEmpty(ret) == false && ret.length > 0) {
                        editGrid.SetCellContent(rowIDs, "Result", ret[0].Text, ret[0].Value);
                    }
                }
                HoteamUI.UIManager.Popup(item.PageName, { Value: value, Text: text }, callback, null);
            } else if (HoteamUI.Common.IsNullOrEmpty(item.SetDataJSMethod) == false) {
                var setpara = {};
                setpara.Text = text;
                setpara.Value = value;
                setpara.ActorType = type;
                setpara.RowID = rowIDs;
                setpara.ActorType = type;
                setpara.EditGrid = editGrid;
                setpara.CallBack = callback;
                HoteamUI.Common.ExeFunction(item.SetDataJSMethod, setpara);
            }
        }
    }
}

//textValue点击事件
InforCenter_Platform_SelectedTaskActorInfo_SelectActorOnClick = function (ctrlEvent) {
    var rowIDs = ctrlEvent.o.GetEditRowID();
    var type = ctrlEvent.o.GetCellContent(rowIDs, "UserType").value;
    var callback = function (data, ret) {
        if (ret && ret.length > 0) {
            var value = "";
            var text = "";
            for (var i = 0; i < ret.length; i++) {
                text = text + ";" + ret[i].ENAME;
                value = value + ";" + ret[i].EID;
            }
            if (HoteamUI.Common.IsNullOrEmpty(text) == false) {
                text = text.substring(1);
                value = value.substring(1);
            }
            ctrlEvent.setContent({ text: text, value: value });
        }

    }
    InforCenter_Platform_SelectedTaskActorInfo_SetActors(ctrlEvent.o, type, ctrlEvent.value, ctrlEvent.text, callback);
}

//任务执行人OnGetData
InforCenter_Platform_SelectedTaskActorInfo_OnGetData = function (pageEvent) {
    if (pageEvent.currSelectInfoIsNull) {
        return;
    }
    var page = pageEvent.o;
    var editGrid = page.GetControl("SelectedTaskActorInfoEditGrid");
    var data = editGrid.SaveGridRows();

    var actorsList = new Array();
    for (var i = 0; i < data.rowsObject.length; i++) {
        var actor = {};
        actor.Actors = data.rowsObject[i].Result.value;
        actor.Name = data.rowsObject[i].UserType.value;
        actorsList.push(actor);
    }
    WebDesignerWorkflowInfo.CurrSelectInfo.AuditActor = actorsList;
}

InforCenter_Platform_SelectedTaskActorInfo_OnCheck = function (pageEvent) {
    var page = pageEvent.o;
    var grid = page.GetControl("SelectedTaskActorInfoEditGrid");
    var gridrow = grid.SaveGridRows();
    if (gridrow.rowsObject.length <= 0) {
        var message = HoteamUI.Language.Lang("SelectedTaskActorInfo.EmptyError");
        var errorpara = { pageMode: "OK", context: "SelectedTaskActorInfo", labelName: "EmptyError" };
        HoteamUI.UIManager.Popup("Confirm", errorpara);
        return false;
    }
    if (!grid.GetRegexStatus()) {
        return false;
    }
    return true;
}

InforCenter_Platform_SelectedTaskActorInfo_InitGroupData = function (nodeActor) {
    return HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateExtendService.GetGroupActorText", { para: { Actors: nodeActor.Text} });
}

InforCenter_Platform_SelectedTaskActorInfo_SelectGroupOnClick = function (setPara) {
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
            setPara.EditGrid.SetCellContent(setPara.RowID, "Result", text, value);
        }
    }
    if (setPara.CallBack) {
        callback = setPara.CallBack;
    }
    HoteamUI.UIManager.Popup("TreeCommonQuery", { Value: setPara.Value, ItemName: "GroupToGroup", LoadAndSelectType: "SingleLevel_MultiSelect" }, callback, {}, "500*400");
}
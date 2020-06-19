﻿InforCenter_Platform_SelectedTaskActorInfo_SelectUserOnClick = function (setPara) {
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
    HoteamUI.UIManager.Popup("TreeCommonQuery", { Value: setPara.Value, ItemName: "GroupToRoleToUser", LoadAndSelectType: "SingleLevel_MultiSelect", AllQuery: true }, callback, {}, "500*400");
}
InforCenter_Platform_SelectedTaskActorInfo_InitUserData = function (nodeActor) {
    return HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateExtendService.GetUserActorText", { para: { Actors: nodeActor.Text} });
}
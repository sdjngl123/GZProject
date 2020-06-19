
InforCenter_Platform_SelectedTaskActorInfo_InitCreatorData = function (nodeActor) {
    return HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateExtendService.GetCreatorActorText", { para: { Actors: nodeActor.Text} });
}

InforCenter_Platform_SelectedTaskActorInfo_SelectCreatorOnClick = function (setPara) {
    var text = HoteamUI.Language.Lang("SelectedTaskActorInfo.Creator");
    setPara.EditGrid.SetCellContent(setPara.RowID, "Result", text, "Creator");
}


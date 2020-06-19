//
InforCenter_Platform_SelectedTaskActorInfo_InitAdminData = function (nodeActor) {
    return HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateExtendService.GetAdminActorText", { para: { Actors: nodeActor.Text} });
}

InforCenter_Platform_SelectedTaskActorInfo_SelectAdminOnClick = function (setPara) {
    var text = HoteamUI.Language.Lang("SelectedTaskActorInfo.Admin");
    setPara.EditGrid.SetCellContent(setPara.RowID, "Result", text, "Admin");
}

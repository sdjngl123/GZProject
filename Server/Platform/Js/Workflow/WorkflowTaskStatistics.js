InforCenter_Platform_WorkflowTaskStatistics_LoadRows = function (ctrlEvent) {
    var data = HoteamUI.DataService.Call("InforCenter.Common.WorkflowService.GetWorkflowTaskStatistics", {});
    if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
        ctrlEvent.o.LoadGridRows(data);
    }
}
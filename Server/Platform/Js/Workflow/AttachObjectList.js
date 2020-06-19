InforCenter_Platform_AttachObjectList_LoadPage = function (pageEvent) {
    var page = pageEvent.o;
    var para = page.GetPara();
    var listPage = HoteamUI.Page.InstanceIn(page.pid, "ObjectListViewPageContainer", "ListViewCtrl");
    var listCtrl = listPage.GetControl("ListView");
    para.ListGuid = listCtrl.id;
    para.ListViewName = "WORKFLOWATTACHINFOVIEW";
    para.OnePageDataService = "InforCenter.Workflow.WorkflowService.GetWorkflowObjectData";
    para.ListTitleDataService = "InforCenter.Workflow.WorkflowService.GetWorkflowObjectTitle";
    para.AllowCheckBox = true;
    para.ShowPaging = false;
    var listTitleData = InforCenter_Platform_ListViewCtrl_LoadListView(listPage, para);
    if (listTitleData == null) {
        return false;
    }
    var topContainer = page.GetControl("AttachObjectList_Container");
    HoteamUI.Page.SetContainerParas(topContainer.id, "AttachObjectList", para);
}

InforCenter_Platform_AttachObjectList_OnGetData = function (pageEvent) {
    var pageContainer = pageEvent.o.GetControl("AttachObjectList_Container");
    var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
    var ids = "";
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.ListGuid) == false) {
        var grid = HoteamUI.Control.Instance(pagePara.ListGuid);
        var gridSelectData = grid.GetSelectedRows();
        for (var row = 0; row < gridSelectData.length;row++){
            var rowItem = gridSelectData[row];
            ids += ";" + rowItem.EID;
        }
    }
    if (HoteamUI.Common.IsNullOrEmpty(ids) == false) {
        ids = ids.substring(1);
    }
    return ids;
}


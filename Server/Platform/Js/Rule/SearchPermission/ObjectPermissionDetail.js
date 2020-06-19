InforCenter_Platform_ObjectPermissionDetail_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var para = page.GetPara();

    if (para && para.SelectID) {
        HoteamUI.Page.FirePageEvent(pageEvent.o.pid, "OnQuery", para);
    }
}

InforCenter_Platform_ObjectPermissionDetail_OnQuery = function (pageEvent) {
    if (pageEvent.SelectID) {
        var page = pageEvent.o;
        var grid = HoteamUI.DataService.Call("Hoteam.InforCenter.RulePageService.GetPermissionGrid", { para: { SelectID: pageEvent.SelectID, PermissionUserID: pageEvent.UserID, PermissionGroupID: pageEvent.GroupID } });
        if (grid) {
            page.GetControl("PermissionDetailGrid").LoadColTitle(grid.TitleData);
            page.GetControl("PermissionDetailGrid").LoadGridRows(grid.GridObjectData);
        }
    }
}


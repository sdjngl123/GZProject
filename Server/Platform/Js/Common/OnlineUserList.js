////初始化页面
//InforCenter_Platform_OnlineUserList_LoadGridData = function (ctrlEvent) {
//    var pager = ctrlEvent.o.GetPagerInfo();
//    var data = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GetOnlineUserGridData", { para: { Pager: pager} });
//    if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
//        ctrlEvent.o.LoadGridRows(data);
//    }
//}

//初始化页面
InforCenter_Platform_OnlineUserList_LoadGridData = function (pageEvent) {
    var ctrl = pageEvent.o.GetControl("DataListContainer");
    var pager = ctrl.GetPagerInfo();
    var type = pageEvent.o.GetPara().Type;

    var data = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GetOnlineUserGridData", { para: { Pager: pager, OnlineUserType: type } });
    if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
        ctrl.LoadGridRows(data);
    }
}

InforCenter_Platform_OnlineUserList_Onload = function (ctrlEvent) {
    var pager = ctrlEvent.o.GetPagerInfo();
    var type = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID()).GetPara().Type;
    var data = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GetOnlineUserGridData", { para: { Pager: pager, OnlineUserType: type } });
    if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
        ctrlEvent.o.LoadGridRows(data);
    }
}

InforCenter_Platform_OnlineUserList_MenuClick = function (ctrlEvent) {
    var value = ctrlEvent.value;
    var grid = ctrlEvent.o.OtherControl('DataListContainer');
    //EditGridExample:请求服务器获取列标头
    if (value == "LogOut") {
        var rows = grid.GetSelectedRows();
        for (var i = 0; i < rows.length; i++) {
            var userID = rows[i].UserID;
            var loginID = rows[i].LoginID;
            var deviceType = rows[i].LoginDeviceType;
            var loginIp = rows[i].LoginIP;
            HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "RemoveOnlineUserByLoginID", { para: { UserID: userID, LoginDeviceType: deviceType, LoginID: loginID, LoginIP: loginIp } });
        }
    }
    if (value == "LogOutAll") {
        HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "RemoveOnlineAllUser", { para: { } });
    }
    var pager = grid.GetPagerInfo();
    var type = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID()).GetPara().Type;
    var data = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GetOnlineUserGridData", { para: { Pager: pager, OnlineUserType: type} });
    if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
        grid.LoadGridRows(data);
    }
}
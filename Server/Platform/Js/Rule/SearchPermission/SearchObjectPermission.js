InforCenter_Platform_SearchObjectPermission_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    var currentUser = HoteamUI.Security.LoginPara.UserID;
    var currentGroup = HoteamUI.Security.LoginPara.UserGroup
    var user = InforCenter_Platform_Object_GetObjectData(currentUser);
    if (user) {
        page.GetControl("User_Value").SetText(user.ENAME);
        page.GetControl("User_Value").SetValue(user.EID);
    }

    var groupInfo = HoteamUI.DataService.Call("HoteamUI.InforCenter.RulePageService.GetGroupInfoByUser", { para: { PermissionUserID: currentUser, PermissionGroupID: currentGroup } });
    if (groupInfo) {
        page.GetControl("Group_Value").LoadItems(groupInfo);
    }

    if (pagePara && pagePara.SelectID) {
        var groupID = page.GetControl("Group_Value").GetSelectedValue();
        var data = HoteamUI.DataService.Call("HoteamUI.InforCenter.RulePageService.GetPermissionByUser", { para: { PermissionUserID: currentUser, PermissionGroupID: groupID, SelectID: pagePara.SelectID } });
        if (data) {
            page.GetControl("PermissionGrid").LoadColTitle(data.TitleData);
            page.GetControl("PermissionGrid").LoadGridRows(data.GridObjectData);
        }
    }
}

InforCenter_Platform_SearchObjectPermission_UserOnClick = function (ctrlEvent) {
    var pagepara = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID()).GetPara();
    var selectid = pagepara.SelectID;
    var callback = function (data, ret) {
        var o = HoteamUI.Control.Instance(data.id);
        if (ret != null && ret.length > 0) {
            o.SetText(ret[0].ENAME);
            o.SetValue(ret[0].EID);
            var groupInfo = HoteamUI.DataService.Call("HoteamUI.InforCenter.RulePageService.GetGroupInfoByUser", { para: { PermissionUserID: ret[0].EID } });
            if (groupInfo) {
                o.OtherControl("Group_Value").LoadItems(groupInfo);
            }

            var groupID = o.OtherControl("Group_Value").GetSelectedValue();
            if (data.SelectID) {
                var griddata = HoteamUI.DataService.Call("HoteamUI.InforCenter.RulePageService.GetPermissionByUser", { para: { PermissionUserID: ret[0].EID, PermissionGroupID: groupID, SelectID: data.SelectID } });
                if (griddata) {
                    o.OtherControl("PermissionGrid").LoadGridRows(griddata.GridObjectData);
                }
            }
            //激活父页面查询
            pagepara.UserID = ret[0].EID;
            pagepara.GroupID = groupID;
            var parentPageid = HoteamUI.Page.ParentPage(ctrlEvent.o.ContainerID());
            HoteamUI.Page.FireParentPageEvent(parentPageid, "OnQuery", pagepara);
        }
    }
    HoteamUI.UIManager.Popup("TreeCommonQuery", { Value: ctrlEvent.o.GetValue(), ItemName: "GroupToRoleToUser", AllQuery: true }, callback, { id: ctrlEvent.o.id, SelectID: selectid }, "400*500");
}

InforCenter_Platform_SearchObjectPermission_GroupOnChange = function (ctrlEvent) {
    var groupID = ctrlEvent.o.GetSelectedValue();
    var userid = ctrlEvent.o.OtherControl("User_Value").GetValue();
    var pagepara = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID()).GetPara();
    var selectid = pagepara.SelectID;

    var griddata = HoteamUI.DataService.Call("HoteamUI.InforCenter.RulePageService.GetPermissionByUser", { para: { PermissionUserID: userid, PermissionGroupID: groupID, SelectID: selectid } });
    if (griddata) {
        ctrlEvent.o.OtherControl("PermissionGrid").LoadGridRows(griddata.GridObjectData);
    }

    pagepara.UserID = userid;
    pagepara.GroupID = groupID;
    var parentPageid = HoteamUI.Page.ParentPage(ctrlEvent.o.ContainerID());
    HoteamUI.Page.FireParentPageEvent(parentPageid, "OnQuery", pagepara);
}
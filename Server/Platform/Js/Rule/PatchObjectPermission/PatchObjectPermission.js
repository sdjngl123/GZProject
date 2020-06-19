InforCenter_Platform_PatchObjectPermission_OnSave = function (pages, guidePage) {
    var page = {};

    for (var i = 0; i < pages.length; i++) {
        if (pages[i].PageName() == "ObjectPermissionPage") {
            page = pages[i];
            break;
        }
    }
    if (page && page.pid) {
        var grid = page.GetControl("PermissionListEditGrid");
        if (grid && grid.id != "") {
            var rowcount = grid.GetRowsCount();

            var callback = function (data, ret) {
                if (ret) {
                    var savePara = page.GetPara();
                    if (!savePara) {
                        savePara = {};
                    }
                    savePara.SuccessMessage = HoteamUI.Language.Lang("PatchObjectPermission.Success");
                    savePara.PermissionPageID = guidePage.pid;
                    //默认清除权限
                    savePara.ClearPermission = true;
                    if (ret.confirm == "OK" || ret.confirm == "Yes") {
                        HoteamUI.Page.FirePageEvent(page.pid, "OnSave", savePara);

                    } else if (ret.confirm == "Yes") {
                        //清空已有权限
                        HoteamUI.Page.FirePageEvent(page.pid, "OnSave", savePara);
                    } else if (ret.confirm == "No") {
                        //不清空已有权限
                        savePara.ClearPermission = false;
                        HoteamUI.Page.FirePageEvent(page.pid, "OnSave", savePara);
                    }
                }

            }
            if (rowcount > 0) {
                HoteamUI.UIManager.Popup({ pagename: "Confirm", paras: { pageMode: "YesNo", message: HoteamUI.Language.Lang("PatchObjectPermission.ClearConfirm") }, callback: callback });
                return { CancelClosed: true };
            } else {
                HoteamUI.UIManager.Popup({ pagename: "Confirm", paras: { pageMode: "OkCancel", message: HoteamUI.Language.Lang("PatchObjectPermission.NullConfirm") }, callback: callback });
                return { CancelClosed: true };;
            }
        }

    }
}

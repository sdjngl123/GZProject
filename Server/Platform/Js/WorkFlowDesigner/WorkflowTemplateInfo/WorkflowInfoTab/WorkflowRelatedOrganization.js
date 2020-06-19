InforCenter_Platform_WorkflowRelatedOrganization_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    if (pagePara) {
        var value = pagePara.Value;
        value = JSON.parse(value);
        var editGrid = page.GetControl("SelectedTaskActorInfoEditGrid");
        InforCenter_Platform_SelectedTaskActorInfo_InitEditGrid(editGrid, value);
    }
}

InforCenter_Platform_WorkflowRelatedOrganization_OnOK = function (ctrlEvent) {
    var editGrid = ctrlEvent.o.OtherControl("SelectedTaskActorInfoEditGrid");
    var data = editGrid.SaveGridRows();

    var ret = {};
    var text = "";
    var actorsList = new Array();
    if (!data.rowsObject || data.rowsObject.length <= 0) {
        var msg = HoteamUI.Language.Lang("WorkflowRelatedOrganization.None");
        HoteamUI.UIManager.Popup("Confirm", { pageMode: "OK", message: msg });
        return;
    }
    for (var i = 0; i < data.rowsObject.length; i++) {
        var actor = {};
        if (!data.rowsObject[i].Result.value) {
            editGrid.UnSelectAll();
            editGrid.SetSelectedRow(i + 1);
            var msg = HoteamUI.Language.Lang("WorkflowRelatedOrganization.NoneResult");
            HoteamUI.UIManager.Popup("Confirm", { pageMode: "OK", message: msg });
            return;
        }
        actor.Actors = data.rowsObject[i].Result.value;
        actor.Name = data.rowsObject[i].UserType.value;
        text += "、" + data.rowsObject[i].UserType.text + ":" + data.rowsObject[i].Result.text;

        var exist = false;
        for (var j = 0; j < actorsList.length; j++) {
            var row = actorsList[j];
            if (row.Actors == actor.Actors && row.Name == actor.Name) {
                exist = true;
                editGrid.UnSelectAll();
                editGrid.SetSelectedRow(i + 1);
                var msg = HoteamUI.Language.Lang("WorkflowRelatedOrganization.ResultSame");
                HoteamUI.UIManager.Popup("Confirm", { pageMode: "OK", message: msg });
                return;
            }
        }
        if (exist == false) {
            actorsList.push(actor);
        }
    }
    ret.success = true;
    ret.actorsList = actorsList;
    if (text.length > 0) {
        text = text.substring(1);
    }
    ret.text = text;
    HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), ret);
}

InforCenter_Platform_WorkflowRelatedOrganization_BindingActorDropdown = function (ctrlEvent) {
    var ret = InforCenter_Platform_SelectedTaskActorInfo_BindingActorDropdown(ctrlEvent);
    if (ret) {
        //只选择用户、组和角色
        var dropdownlist = [];
        for (var i = 0; i < ret.length; i++) {
            if (ret[i].Value.toLowerCase() == "user"
                || ret[i].Value.toLowerCase() == "role"
                || ret[i].Value.toLowerCase() == "group"
                || ret[i].Value.toLowerCase() == "grouprole"
            ) {
                dropdownlist.push(ret[i]);
            }
        }
        return dropdownlist;
    }

}
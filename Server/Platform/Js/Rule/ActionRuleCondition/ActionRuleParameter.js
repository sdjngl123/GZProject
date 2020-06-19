InforCenter_Platform_ActionRuleParameter_LoadPage = function (pageEvent) {
    var page = pageEvent.o;
    var para = page.GetPara();
    if (para && para.TreeGuid) {
        var tree = HoteamUI.Control.Instance(para.TreeGuid);
        var selectNode = tree.GetSelectedNode();
        var actionRuleID = selectNode.value1;
        var enable = HoteamUI.DataService.Call("Hoteam.InforCenter.RulePageService.GetPermissionEnable", { para: { ActionRuleID: actionRuleID } });
        if (enable == true) {
            page.GetControl("ParameterCheckBox").SetChecked(enable);
        } else {
            page.GetControl("ParameterCheckBox").SetChecked(false);
        }
    }
}

InforCenter_Platform_ActionRuleParameter_OnSave = function (ctrlEvent) {
    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    var para = page.GetPara();
    if (para && para.TreeGuid) {
        var tree = HoteamUI.Control.Instance(para.TreeGuid);
        var selectNode = tree.GetSelectedNode();
        var actionRuleID = selectNode.value1;
        var checked = page.GetControl("ParameterCheckBox").IsChecked();
        var success = HoteamUI.DataService.Call("Hoteam.InforCenter.RulePageService.SavePermissionEnable", { para: { ActionRuleID: actionRuleID, Enable: checked } });
        if (success == true) {
            HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("ActionRuleParameter.Success"));
        }
    }
}
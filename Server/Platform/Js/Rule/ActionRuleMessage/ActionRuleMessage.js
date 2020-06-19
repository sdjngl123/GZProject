//显示授权操作页面
InforCenter_Platform_ActionRuleMessage_ShowMessageActionValuePage = function (ctrlEvent) {
    var callback = function (data, ret) {
        if (ret != null) {
            var o = HoteamUI.Control.Instance(data.id);
            o.SetText(ret.MessageActionValueText);
            o.SetValue(ret.MessageActionValue);
        }
    }
    var para = {};
    //获取页面参数
    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    para = page.GetPara();
    //获取授权操作参数
    var MessageActionValue = ctrlEvent.o.GetValue();
    if (HoteamUI.Common.IsNullOrEmpty(MessageActionValue) == false) {
        para.MessageActionValue = JSON.parse(MessageActionValue);
    }
    HoteamUI.UIManager.Popup("MessageAction", para, callback, { id: ctrlEvent.o.id });
}

InforCenter_Platform_ActionRuleMessage_ShowMessageActorTypeDLL = function (ctrlEvent) {
    var data = HoteamUI.DataService.Call("InforCenter.Rule.RuleDataService.GetPermissionTypeList", { para: { UseBy: "ActionRuleMessage" } });
    if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
        return data;
    }
}

InforCenter_Platform_ActionRuleMessage_ShowLinkMessageActorTypeDLL = function (ctrlEvent) {

    var data = HoteamUI.DataService.Call("InforCenter.Rule.RuleDataService.GetPermissionTypeList", { para: { UseBy: "Link" } });
    if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
        return data;
    }
}

InforCenter_Platform_ActionRuleMessage_ShowCreateMessageActorTypeDLL = function (ctrlEvent) {
    var data = HoteamUI.DataService.Call("InforCenter.Rule.RuleDataService.GetPermissionTypeList", { para: { UseBy: "Common" } });
    if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
        return data;
    }
}

InforCenter_Platform_ActionRuleMessage_ShowMessageActorTypeDLLChange = function (ctrlEvent) {
    var editRow = ctrlEvent.o.GetEditRowID();
    //var actorType = ctrlEvent.o.GetCellContent(editRow, "PERMISSIONACTORTYPE");
    var actorType = ctrlEvent.value;
    ctrlEvent.o.SetCellContent(editRow, "MESSAGEACTORVALUE", "", "", true);
    //判断是否是弹窗
    var plugin = HoteamUI.DataService.Call("InforCenter.Rule.RulePageService.GetActionRulePermissionTypePlugin", { para: { PermissionType: actorType } });
    if (plugin && plugin.JSMethod) {
        var para = {};
        para.ActorValue = ctrlEvent.o.GetCellContent(editRow, "MESSAGEACTORVALUE").value;
        para.PermissionType = actorType;
        para.ctrlEvent = ctrlEvent;
        para.UseBy = plugin.Group;
        if (plugin.IsPopup) {
            var callback = function (data, ret) {
                ctrlEvent.o.SetCellContent(editRow, "MESSAGEACTORVALUE", ret.Text, ret.Value, true);
            }

            para.ctrlEvent.Callback = callback;

            HoteamUI.Common.ExeFunction(plugin.JSMethod, para);
        } else {
            var ret = HoteamUI.Common.ExeFunction(plugin.JSMethod, para);
            ctrlEvent.o.SetCellContent(editRow, "MESSAGEACTORVALUE", ret.Text, ret.Value, true);
        }
    }
}

InforCenter_Platform_ActionRuleMessage_ShowMessageActorValueOnEditGridWithoutType = function (ctrlEvent) {
    var editRow = ctrlEvent.o.GetEditRowID();
    var actorType = ctrlEvent.o.GetCellContent(editRow, "MESSAGEACTORTYPE").value;

    var plugin = HoteamUI.DataService.Call("InforCenter.Rule.RulePageService.GetActionRulePermissionTypePlugin", { para: { PermissionType: actorType } });
    if (plugin && plugin.IsPopup == true) {

        var para = {};
        para.ActorValue = ctrlEvent.value;
        para.PermissionType = actorType;
        para.ctrlEvent = ctrlEvent;
        para.UseBy = plugin.Group;

        var callback = function (data, ret) {
            if (ret) {
                ctrlEvent.setContent({ text: ret.Text, value: ret.Value });
            }
        }
        para.ctrlEvent.Callback = callback;
        HoteamUI.Common.ExeFunction(plugin.JSMethod, para);
    }
}

InforCenter_Platform_ActionRuleMessage_SavePermission = function (para) {

}
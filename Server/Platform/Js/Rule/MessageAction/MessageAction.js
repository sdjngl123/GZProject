//加载授权操作页面
InforCenter_Platform_MessageAction_LoadPage = function (pageEvent) {
    var page = pageEvent.o;
    var para = page.GetPara();
    if (HoteamUI.Common.IsNullOrEmpty(para) == false
        && HoteamUI.Common.IsNullOrEmpty(para.MessageActionValue) == false) {
        var actionListCtrl = page.GetControl("ActionListControl");
        if (HoteamUI.Common.IsNullOrEmpty(actionListCtrl) == false) {
            var index = 0;
            var data = new Array();
            if (HoteamUI.Common.IsNullOrEmpty(para.MessageActionValue.AllowActions) == false) {
                var allowActions = para.MessageActionValue.AllowActions.split(';');
                if (HoteamUI.Common.IsNullOrEmpty(allowActions) == false
                    && allowActions.length > 0) {
                    for (var i = 0; i < allowActions.length; i++) {
                        var item = { "Name": allowActions[i], "Value": 1 };
                        data[index++] = item;
                    }
                }
            }
            if (data.length > 0) {
                actionListCtrl.SetData(data);
            }
        }
    }
}

//加载操作列表
InforCenter_Platform_MessageAction_LoadActionList = function (ctrlEvent) {
    var data = HoteamUI.DataService.Call("InforCenter.Rule.RuleDataService.GetActionListData", {});
    if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
        ctrlEvent.o.LoadData(data);
    }
}

//获取页面设置参数
InforCenter_Platform_MessageAction_GetMessageActionValue = function (ctrlEvent) {
    var actionListCtrl = ctrlEvent.o.OtherControl("ActionListControl");
    if (HoteamUI.Common.IsNullOrEmpty(actionListCtrl) == false) {
        var data = {};
        //允许列表
        var selectedData = actionListCtrl.GetData("1");
        if (HoteamUI.Common.IsNullOrEmpty(selectedData) == false) {
            data.AllowActions = {};
            var selectedDataString = "";
            for (var i = 0; i < selectedData.length; i++) {
                selectedDataString += ";" + selectedData[i].Name;
            }
            if (HoteamUI.Common.IsNullOrEmpty(selectedDataString) == false) {
                data.AllowActions = selectedDataString.substring(1);
            }
        }

        var ret = {};
        ret.MessageActionValue = JSON.stringify(data);
        ret.MessageActionValueText = HoteamUI.DataService.Call("InforCenter.Rule.RuleDataService.GetMessageActionValueText", { para: data });

        HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), ret);
    }
}
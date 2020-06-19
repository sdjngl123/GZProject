InforCenter_Platform_MyWorkflowSmartStatistics_OnCreate = function (pageEvent) {

    var callback = function (ret,data) {
        if (HoteamUI.Common.IsNullOrEmpty(ret) == false
            && HoteamUI.Common.IsNullOrEmpty(ret.Rows) == false
            && ret.Rows.length >= 4) {
            var myTaskCtrl = pageEvent.o.GetControl("MyTaskLabel");
            if (HoteamUI.Common.IsNullOrEmpty(myTaskCtrl) == false) {
                myTaskCtrl.SetText(myTaskCtrl.GetText() + '(' + ret.Rows[0][3].ColText + ')');
            }
            var depositTaskCtrl = pageEvent.o.GetControl("DepositTaskLabel");
            if (HoteamUI.Common.IsNullOrEmpty(depositTaskCtrl) == false) {
                depositTaskCtrl.SetText(depositTaskCtrl.GetText() + '(' + ret.Rows[1][3].ColText + ')');
            }
            var deliveryTaskCtrl = pageEvent.o.GetControl("DeliveryTaskLabel");
            if (HoteamUI.Common.IsNullOrEmpty(deliveryTaskCtrl) == false) {
                deliveryTaskCtrl.SetText(deliveryTaskCtrl.GetText() + '(' + ret.Rows[2][3].ColText + ')');
            }
            var unComplateWorkflowCtrl = pageEvent.o.GetControl("UnComplateWorkflowLabel");
            if (HoteamUI.Common.IsNullOrEmpty(unComplateWorkflowCtrl) == false) {
                unComplateWorkflowCtrl.SetText(unComplateWorkflowCtrl.GetText() + '(' + ret.Rows[3][3].ColText + ')');
            }
        }
    }
    HoteamUI.DataService.AsyncCall("InforCenter.Common.WorkflowService.GetWorkflowSmartStatistics", {}, callback);
}

InforCenter_Platform_TaskLabel_OnCreate = function (ctrlEvent) {
    var id = ctrlEvent.o.id;
    var obj = $("#" + id).find(".hoteam-label");
    obj.css("cursor", "pointer");
    obj.click(function () {
        var title = HoteamUI.Language.Lang("NavigationItems", "MyFlowTask");
        InforCenter_Platform_MainTabs_AddTab("TreeManagement", { ItemName: "MyFlowTask" }, title, false);
    });
}

InforCenter_Platform_WorkflowLabel_OnCreate = function (ctrlEvent) {
    var id = ctrlEvent.o.id;
    var obj = $("#" + id).find(".hoteam-label");
    obj.css("cursor", "pointer");
    obj.click(function () {
        var title = HoteamUI.Language.Lang("NavigationItems", "WorkFlowManagement");
        InforCenter_Platform_MainTabs_AddTab("TreeManagement", { ItemName: "WorkFlowManagement" }, title, false);
    });
}
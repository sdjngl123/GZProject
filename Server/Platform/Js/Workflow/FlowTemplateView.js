InforCenter_Platform_WorkflowView_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var para = page.GetPara();
    var data;

    if (para.TreeGuid) {
        var treeCtrl = HoteamUI.Control.Instance(para.TreeGuid);
        var node = treeCtrl.GetSelectedNode();
        data = node.Value1;

    }
    else if (para.Template) {
        data = para.Template;
    }
    else if (para.ID) {
        data = para.ID;
    }
    else return false;
    var info = HoteamUI.DataService.Call("InforCenter.Common.WorkflowService.GetFlowTemplateView", { para: { ID: data } });
    if (info == null)
        return;
    var content = pageEvent.o.GetControl("WorkflowView");

    var option = {
        pid: page.pid,
        restore: info,
        editable: false,
        padding: 500
    }

    $("#" + content.id).workflow(option);


}

InforCenter_Platform_FlowTemplateValue_OnEditGridColDataBind = function (ctrlEvent) {
    var callback = function (data, ret) {
        var o = HoteamUI.Control.Instance(data.id);
        if (ret && ret.length > 0) {
            ctrlEvent.o.SetTextValueData(ctrlEvent.id, { value: ret[0].XMLNAME, text: ret[0].ENAME });
        }
    }

    HoteamUI.UIManager.Popup("TreeCommonQuery", { ItemName: "WorkFlowTemplateTreeQuery" }, callback, { id: ctrlEvent.o.id }, "400*500");
}
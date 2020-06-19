//流程条件扩展
InforCenter_Platform_WorkflowParameterCondition_OnCreate = function (pageEvent) {
    //TODO:在可编辑列表中弹出的页面，不能将可编辑列表的ctrlEvent传入（也可能是所有参数都不能传递）    
    var page = pageEvent.o;
    var pagePara = page.GetPara();

    var paraCtrl = page.GetControl("Parameter_Value");
    InforCenter_Platform_WorkflowParameterCondition_ParaInit(paraCtrl);
    var operatorCtrl = page.GetControl("Operator_Value");
    InforCenter_Platform_WorkflowParameterCondition_operatorInit(operatorCtrl);
    var valueCtrl = page.GetControl("Value_Value");
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.Value) == false) {
        var condition = JSON.parse(pagePara.Value);
        paraCtrl.SetSelectedByValue(condition.Name);
        operatorCtrl.SetSelectedByValue(condition.Operate);
        valueCtrl.SetText(condition.Value);
    }
}
//参数初始化化
InforCenter_Platform_WorkflowParameterCondition_ParaInit = function (ctrl) {
    var paraList = WebDesignerWorkflowInfo.Template.ParameterList;
    var dataList = [];
    for(var i=0;i<paraList.length;i++){
        var data = {};
        data.Text = paraList[i].Name;
        data.Value = paraList[i].Name;
        if (i == 0)
        {
            data.Selected = true;
        }
        dataList.push(data);
    }
    ctrl.LoadItems(dataList);

}

//操作初始化
InforCenter_Platform_WorkflowParameterCondition_operatorInit = function (ctrl) {
    var dataList = [
        { Text: "==", Value: "==" },
        { Text: ">", Value: ">" },
        { Text: ">=", Value: ">=" },
        { Text: "<", Value: "<" },
        { Text: "<=", Value: "<=" },
        { Text: "!=", Value: "!=" }
    ];
    ctrl.LoadItems(dataList);
}
//确定
InforCenter_Platform_WorkflowParameterCondition_OnOK = function (ctrlEvent) {
    var paraCtrl = ctrlEvent.o.OtherControl("Parameter_Value");
    var operatorCtrl = ctrlEvent.o.OtherControl("Operator_Value");
    var valueCtrl = ctrlEvent.o.OtherControl("Value_Value");
    if (!valueCtrl.Check())
    {
        return;
    }
    var text = paraCtrl.GetSelectedValue() + " " + operatorCtrl.GetSelectedValue() + " " + valueCtrl.GetText();
    var value = {};
    value.Name = paraCtrl.GetSelectedValue();
    value.Operate = operatorCtrl.GetSelectedValue();
    value.Value = valueCtrl.GetText();
    HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), [{ Text: text, Value: JSON.stringify(value)}]);
}

//初始化数据
InforCenter_Platform_WorkflowParameterCondition_InitData = function (condition) {
    if (condition && condition.Value) {
        try {
            var expObj = JSON.parse(condition.Value);
        } catch (e) {
            console.error(e.toString());
            return "";
        }
        return expObj.Name + " " + expObj.Operate + " " + expObj.Value;
    }
}

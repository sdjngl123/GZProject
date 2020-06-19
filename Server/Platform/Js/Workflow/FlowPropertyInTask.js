//开始 2013-04-10 刘强 添加在任务属性对话框添加流程属性页
InforCenter_Platform_FlowPropertyInTask_OnCreate = function (pageEvent) {
    var para = pageEvent.o.GetPara();
    var taskPara = {};
    if (HoteamUI.Common.IsNullOrEmpty(para) == false
        && HoteamUI.Common.IsNullOrEmpty(para.ObjectID) == false) {
        taskPara.TaskID = para.ObjectID;
        //根据任务ID获得流程ID
        var flowID = HoteamUI.DataService.Call("InforCenter.Common.WorkflowService.GetFlowIDByTaskID", { para: taskPara });
        if (HoteamUI.Common.IsNullOrEmpty(flowID) == true) {
            return;
        }
        para.ObjectID = flowID;
        var ctrl = pageEvent.o.GetControl('FlowPropertyContainer');
        var ObjectType = para.ObjectID.split("_")[0];
        var pagename = ObjectType + "-VIEW";
        ctrl.LoadPage(pagename, para);
    }
}
//结束
//流程全局变量
var WebDesignerWorkflowInfo = {};
WebDesignerWorkflowInfo.Template = {};
WebDesignerWorkflowInfo.CurrSelectInfo = {};
WebDesignerWorkflowInfo.PreSelectInfo = {};
//向流程设计面板传入的右侧信息页pid
WebDesignerWorkflowInfo.Pid = "";
//保存时需要保存到全局变量的页面pid，在页面OnCreate时，向改页面发送OnGetData事件，并重新设值
WebDesignerWorkflowInfo.GetDataPid = "";

//通过显示名称和流程模板类型得到流程模板，实际是新建一个带有开始和结束节点的流程模板，赋值到全局变量中
InforCenter_Platform_InitGlobalTemplatByTemplateDisplayNameAndType = function (templateDisplayName, templateType) {
    WebDesignerWorkflowInfo.Template = {};

    var templateStr = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateService.GetWorkflowTemplate", { para: { TemplateDisplayName: templateDisplayName, TemplateType: templateType} });
    if (HoteamUI.Common.IsNullOrEmpty(templateStr) == false) {
        WebDesignerWorkflowInfo.Template = templateStr.Template;
        WebDesignerWorkflowInfo.Guid = templateStr.Guid;
    }
}

//通过流程模板名称获取流程模板，赋值到全局变量中
InforCenter_Platform_InitGlobalTemplatByTemplateName = function (templateName) {
    WebDesignerWorkflowInfo.Template = {};

    var templateStr = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateService.GetWorkflowTemplate", { para: { TemplateName: templateName} });
    if (HoteamUI.Common.IsNullOrEmpty(templateStr) == false) {
        WebDesignerWorkflowInfo.Template = templateStr.Template;
        WebDesignerWorkflowInfo.Guid = templateStr.Guid;
    }
}

//初始化全局变量，在弹出流程编辑页面前要进行初始化，如果得不到流程模板，返回空
InforCenter_Platform_InitGlobalTemplate = function (para) {
    //如果是编辑已有的流程模板,初始化全局变量
    WebDesignerWorkflowInfo = {};
    WebDesignerWorkflowInfo.Template = {};
    WebDesignerWorkflowInfo.CurrSelectInfo = {};
    WebDesignerWorkflowInfo.PreSelectInfo = {};
    WebDesignerWorkflowInfo.Pid = "";

    if (HoteamUI.Common.IsNullOrEmpty(para[1].TemplateName) == false) {
        InforCenter_Platform_InitGlobalTemplatByTemplateName(para[1].TemplateName);

    } else if (HoteamUI.Common.IsNullOrEmpty(para[1].TemplateDisplayName) == false) {//如果是新建流程模板，初始化全局变量
        var type =  para[1].TemplateType;
        if (para[1].TemplateType == "Default") { 
            type = "";
        }
        InforCenter_Platform_InitGlobalTemplatByTemplateDisplayNameAndType(para[1].TemplateDisplayName, type);
    } else {
        return null;
    }
    return { Confirm: "OK" };
}


InforCenter_Platform_WorkflowDesigner_IsLastVersionTemplate = function (para) {
    //判断是否是最新版的模板
    var isLast = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateService.TemplateIsLastVersion", { para: { ExtendJsonInfo: JSON.stringify({ TemplateID: para[1].TemplateID }) } });
    if (isLast != true) {
        HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("Workflow.TemplateIsNotLastVersion"));
        return;
    }
    InforCenter_Platform_MenuCtrl_InnerReceiveServerData(para[0], { confirm: "OK" });
}

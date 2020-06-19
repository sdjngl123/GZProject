
//通过显示名称和流程模板类型得到流程模板，实际是新建一个带有开始和结束节点的流程模板，赋值到全局变量中
InforCenter_Platform_InitGlobalLifeCycleTemplatByTemplateDisplayName = function (templateDisplayName, type) {
    WebDesignerWorkflowInfo.Template = {};

    var templateStr = HoteamUI.DataService.Call("InforCenter.LifeCycle.LifeCycleService.GetLifeCycleTemplate", { para: { LifeCycleName: templateDisplayName, LifeCycleType: type } });
    if (HoteamUI.Common.IsNullOrEmpty(templateStr) == false) {
        WebDesignerWorkflowInfo.Template = templateStr.Template;
        WebDesignerWorkflowInfo.Guid = templateStr.Guid;
    }
}

//通过流程模板名称获取流程模板，赋值到全局变量中
InforCenter_Platform_InitGlobalLifeCycleTemplatByTemplateName = function (objectId) {
    WebDesignerWorkflowInfo.Template = {};

    var templateStr = HoteamUI.DataService.Call("InforCenter.LifeCycle.LifeCycleService.GetLifeCycleTemplate", { para: { LifeCycleObjectID: objectId } });
    if (HoteamUI.Common.IsNullOrEmpty(templateStr) == false) {
        WebDesignerWorkflowInfo.Template = templateStr.Template;
        WebDesignerWorkflowInfo.Guid = templateStr.Guid;
    }
}

//初始化全局变量，在弹出流程编辑页面前要进行初始化，如果得不到流程模板，返回空
InforCenter_Platform_InitGlobalLifeCycleTemplate = function (para) {
    //如果是编辑已有的流程模板,初始化全局变量
    WebDesignerWorkflowInfo = {};
    WebDesignerWorkflowInfo.Template = {};
    WebDesignerWorkflowInfo.CurrSelectInfo = {};
    WebDesignerWorkflowInfo.PreSelectInfo = {};
    WebDesignerWorkflowInfo.Pid = "";

    if (HoteamUI.Common.IsNullOrEmpty(para[1].ObjectID) == false) {
        InforCenter_Platform_InitGlobalLifeCycleTemplatByTemplateName(para[1].ObjectID);
    } else if (HoteamUI.Common.IsNullOrEmpty(para[1].TemplateDisplayName) == false) {//如果是新建流程模板，初始化全局变量
        InforCenter_Platform_InitGlobalLifeCycleTemplatByTemplateDisplayName(para[1].TemplateDisplayName, para[1].TemplateType);
    } else {
        return null;
    }
    return { Confirm: "OK" };
}

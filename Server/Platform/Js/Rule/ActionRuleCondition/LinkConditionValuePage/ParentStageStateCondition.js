//加载页面
InforCenter_Platform_ParentStageStateCondition_LoadPage = function (pageEvent) {
    var page = pageEvent.o;
    var para = page.GetPara();

    var modelData = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateExtendService.GetStageStateEntityTypeList", {});
    page.GetControl("ParentObjectTypeValueDDL").LoadItems(modelData);


    if (HoteamUI.Common.IsNullOrEmpty(para.ConditionValue.Parameter1) == false) {
        page.GetControl("ParentObjectTypeValueDDL").SetSelectedByValue(para.ConditionValue.Parameter1);

        var data = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateExtendService.GetLifeCircleListforBindingDroupdown", { para: { StateType: "Stage", ModelName: para.ConditionValue.Parameter1 } });
        page.GetControl("ParentStageStateValueDll").LoadItems(data);
        if (HoteamUI.Common.IsNullOrEmpty(para.ConditionValue.Parameter2) == false)
            page.GetControl("ParentStageStateValueDll").SetSelectedByValue(para.ConditionValue.Parameter2);
    }

}

InforCenter_Platform_ParentStageStateCondition_ChangeParentObjectTypeValue = function (ctrlEvent) {
    var ctrl = ctrlEvent.o;
    ctrl.OtherControl("ParentStageStateValueDll").LoadItems([]);
    var model = ctrl.OtherControl("ParentObjectTypeValueDDL").GetSelectedValue();
    if (model) {
        var data = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateExtendService.GetLifeCircleListforBindingDroupdown", { para: { StateType: "Stage", ModelName: model } });
        ctrl.OtherControl("ParentStageStateValueDll").LoadItems(data);
    }
}


//获取页面保存数据
InforCenter_Platform_ParentStateCondition_OnGetDataFromPage = function (pageEvent) {
    InforCenter_Platform_Object_Data = null;
    var bCheck = true;
    var data = {};
    {
        var c = pageEvent.o.GetControl('ParentObjectTypeValueDDL');
        if (c.Check() == false) {
            bCheck = false;
            return;
        }

        data.Parameter1 = c.GetSelectedValue();
    }
    {
        var c = pageEvent.o.GetControl('ParentStageStateValueDll');
        if (c.Check() == false) {
            bCheck = false;
            return;
        }
        data.Parameter2 = c.GetSelectedValue();
    }
    if (bCheck) {
        InforCenter_Platform_Object_Data = data;
    }
}

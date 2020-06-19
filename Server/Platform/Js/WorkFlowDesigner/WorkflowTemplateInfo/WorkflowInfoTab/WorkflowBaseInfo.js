//工作流基本信息OnCreate
InforCenter_Platform_WorkflowBaseInfo_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    //保存上一个页面的数据
    InforCenter_Platform_WorkflowTemplateEdit_SavePreviousPageData(page);
    //添加流程扩展并设置高度
    var templateTypeList = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateService.GetWorkflowTemplateTypeList", {});
    var tempIndex = 1;
    var layout = page.GetControl("Info_Container");
    for (var i = 0; i < templateTypeList.length; i++) {
        var type = templateTypeList[i];
        if (type.Name == WebDesignerWorkflowInfo.Template.TemplateType && HoteamUI.Common.IsNullOrEmpty(type.PageName) == false) {
            var itemName = "item1" + tempIndex.toString();
            layout.ShowPanel([itemName]);
            for (var p = 0; p < PageConfigScript.length; p++) {
                if (PageConfigScript[p].Name == type.PageName) {
                    if (PageConfigScript[p].PageOptions && PageConfigScript[p].PageOptions.height) {
                        var heightJson = '{"' + itemName + '":"' + PageConfigScript[p].PageOptions.height + '"}';
                        layout.ResetPanelSize($.parseJSON(heightJson));
                    }
                    break;
                }
            }
            page.GetControl("WorkFlowSettingExtend_Value" + tempIndex.toString()).LoadPage(type.PageName, page.GetPara());
            tempIndex++;
        }
    }

    var template = WebDesignerWorkflowInfo.Template;

    switch (template.TemplateType) {
        case "ExampleTemplateDemo":
            InforCenter_Platform_WorkflowBaseInfo_LoadExampleTemplateDemoPage(page, template);
            break;
        default:
            InforCenter_Platform_WorkflowBaseInfo_LoadDefaultTypePage(page, template);
            break;
    }
}
//加载扩展模板类型页
InforCenter_Platform_WorkflowBaseInfo_LoadExampleTemplateDemoPage = function (page, template) {
    //显示扩展设置模块
    var layout = page.GetControl("Info_Container");
    //如果CommonManagement为false隐藏相关模型控件
    var type = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateService.GetWorkflowTemplateTypeList", {});
    for (var i = 0; i < type.length; i++) {
        if (type[i].Name == "ExampleTemplateDemo" && type[i].CommonManagement == false) {
            layout.HiddenPanel(["item6"]);
        }
    }
    //加载通用信息
    InforCenter_Platform_WorkflowBaseInfo_LoadCommonBaseInfo(page, template);
}
//加载默认类型页
InforCenter_Platform_WorkflowBaseInfo_LoadDefaultTypePage = function (page, template) {
    //显示相关模型控件
    var layout = page.GetControl("Info_Container");
    layout.ShowPanel(["item6"]);
    //加载通用信息
    InforCenter_Platform_WorkflowBaseInfo_LoadCommonBaseInfo(page, template);
    //从流程模板上加载相关模型信息
    var modelCtrl = page.GetControl("Model_Value");
    var relateModel = template.RelatedModel;
    var text = "";
    if (relateModel) {
        modellist = relateModel.split(';');
        if (modellist && modellist.length > 0) {
            for (var i = 0; i < modellist.length; i++) {
                if (HoteamUI.Common.IsNullOrEmpty(modellist[i])) {
                    continue;
                }
                var list = modellist[i].split(':');
                var modelName = list[0];
                var textItem = HoteamUI.Language.Lang(modelName + "Model", modelName + "Header");
                for (var j = 1; j < list.length; j++) {
                    textItem += ":" + HoteamUI.Language.Lang("LifeCircleState", list[j] + "Header");
                }
                text += textItem + ";";
            }
        }
    }
    modelCtrl.SetText(text);
    modelCtrl.SetValue(template.RelatedModel);

}
//加载默认和扩展都存在的控件
InforCenter_Platform_WorkflowBaseInfo_LoadCommonBaseInfo = function (page, template) {
    //加载类型
    var typeCtrl = page.GetControl("Type_Value");
    typeCtrl.SetValue(template.TemplateType);
    if (HoteamUI.Common.IsNullOrEmpty(template.TemplateType) == false)
        typeCtrl.SetText(HoteamUI.Language.Lang("WorkflowTemplateTypes", template.TemplateType));
    //加载名称
    var nameCtrl = page.GetControl("Name_Value");
    nameCtrl.SetText(template.DisplayName);
    //加载是否启用
    var isRunCtrl = page.GetControl("IsRun_Value");
    isRunCtrl.SetChecked(template.IsRun);
    //加载流程管理员

    var workflowManagerCtrl = page.GetControl("WorkflowManager_Value");
    workflowManagerCtrl.SetValue(template.FlowAdministrator);
    var userName = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateExtendService.GetUserActorText", { para: { Actors: template.FlowAdministrator } });
    if (userName != null) {
        workflowManagerCtrl.SetText(userName);
    }
    else {
        workflowManagerCtrl.SetText(template.FlowAdministrator);
    }
    //    var data = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateService.GetWorkflowManagerList", {});
    //    workflowManagerCtrl.LoadItems(data);
    //    workflowManagerCtrl.SetSelectedByValue(template.FlowAdministrator);
    //加载修改执行人
    var changeActor_ManagerCtrl = page.GetControl("ChangeActor_Manager");
    changeActor_ManagerCtrl.SetChecked(template.ChangeUserByAdmin);
    var changeActor_StartCtrl = page.GetControl("ChangeActor_Start");
    changeActor_StartCtrl.SetChecked(template.ChangeUserByCreator);
    var changeActor_ActorCtrl = page.GetControl("ChangeActor_Actor");
    changeActor_ActorCtrl.SetChecked(template.ChangeUserByActor);
    //加载描述
    var descriptionCtrl = page.GetControl("Description_Value");
    descriptionCtrl.SetText(template.Description);

    //加载相关组织结构
    InforCenter_Platform_WorkflowBaseInfo_LoadRelateOrganizations(page, template)
    //加载更改节点执行人
    var changeNodeActor = page.GetControl("ChangeNodeActor_Value");
    var rows = new Array();
    for (var i = 0; i < template.NodeList.length; i++) {
        var item = template.NodeList[i];
        if (item.NodeType == "FlowExecute" || item.NodeType == "FlowAudit" || item.NodeType == "FlowCheck") {

            var cols = new Array();

            var nameCol = {};
            nameCol.ColName = "Node";
            nameCol.ColText = item.NodeText;
            cols.push(nameCol);
            var exist = false;
            if (template.ChangeActorNodeList) {
                for (var j = 0; j < template.ChangeActorNodeList.length; j++) {
                    if (template.ChangeActorNodeList[j].Name == item.NodeID) {
                        var allowChangeCol = {};
                        allowChangeCol.ColName = "AllowChange";
                        allowChangeCol.ColText = template.ChangeActorNodeList[j].IsAllowChange == true ? "1" : "0";
                        allowChangeCol.ColValue = template.ChangeActorNodeList[j].IsAllowChange == true ? "1" : "0";
                        cols.push(allowChangeCol);

                        //var validateNullCol = {};
                        //validateNullCol.ColName = "ValidateNull";
                        //validateNullCol.ColText = template.ChangeActorNodeList[j].IsValidateNull == true ? "1" : "0";
                        //validateNullCol.ColValue = template.ChangeActorNodeList[j].IsValidateNull == true ? "1" : "0";
                        //cols.push(validateNullCol);

                        var allocateNullCol = {};
                        allocateNullCol.ColName = "AllocateNull";
                        allocateNullCol.ColText = template.ChangeActorNodeList[j].IsValidateCustomNull == true ? "1" : "0";
                        allocateNullCol.ColValue = template.ChangeActorNodeList[j].IsValidateCustomNull == true ? "1" : "0";
                        cols.push(allocateNullCol);

                        var hiddenCol = {};
                        hiddenCol.ColName = "ID";
                        hiddenCol.ColText = template.ChangeActorNodeList[j].Name;
                        cols.push(hiddenCol);
                        exist = true;
                        break;
                    }
                }
            }
            //说明是新增节点
            if (exist == false) {
                var allowChangeCol = {};
                allowChangeCol.ColName = "AllowChange";
                allowChangeCol.ColText = "1";
                allowChangeCol.ColValue = "1";
                cols.push(allowChangeCol);

                //var validateNullCol = {};
                //validateNullCol.ColName = "ValidateNull";
                //validateNullCol.ColText = "0"
                //cols.push(validateNullCol);

                var allocateNullCol = {};
                allocateNullCol.ColName = "AllocateNull";
                allocateNullCol.ColText = "0";
                allocateNullCol.ColValue = "0";
                cols.push(allocateNullCol);

                var hiddenCol = {};
                hiddenCol.ColName = "ID";
                hiddenCol.ColText = item.NodeID;
                cols.push(hiddenCol);
            }
            rows.push(cols);
        }
    }
    var data = {};
    data.Rows = rows;
    changeNodeActor.LoadGridRows(data);
}

////工作流基本信息OnGetData
InforCenter_Platform_WorkflowBaseInfo_OnGetData = function (pageEvent) {
    var page = pageEvent.o;
    WebDesignerWorkflowInfo.Template.DisplayName = page.GetControl("Name_Value").GetText();
    WebDesignerWorkflowInfo.Template.IsRun = page.GetControl("IsRun_Value").IsChecked();
    WebDesignerWorkflowInfo.Template.FlowAdministrator = page.GetControl("WorkflowManager_Value").GetValue();
    WebDesignerWorkflowInfo.Template.ChangeUserByActor = page.GetControl("ChangeActor_Actor").IsChecked();
    WebDesignerWorkflowInfo.Template.ChangeUserByAdmin = page.GetControl("ChangeActor_Manager").IsChecked();
    WebDesignerWorkflowInfo.Template.ChangeUserByCreator = page.GetControl("ChangeActor_Start").IsChecked();
    WebDesignerWorkflowInfo.Template.Description = page.GetControl("Description_Value").GetText();

    var type = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateService.GetWorkflowTemplateTypeList", {});
    var flag = false;
    for (var i = 0; i < type.length; i++) {
        if (type[i].Name == WebDesignerWorkflowInfo.Template.TemplateType && type[i].CommonManagement == false) {
            flag = true;
            break;
        }
    }
    if (flag == false) {
        WebDesignerWorkflowInfo.Template.RelatedModel = page.GetControl("Model_Value").GetValue();
    }
    var editGridCtrl = page.GetControl("ChangeNodeActor_Value");
    var data = editGridCtrl.SaveGridRows();
    var changeNodeActorList = new Array();
    for (var i in data.rowsObject) {
        var changeNodeActor = {};
        changeNodeActor.Name = data.rowsObject[i].ID;
        changeNodeActor.IsAllowChange = data.rowsObject[i].AllowChange == "1" ? true : false;
        changeNodeActor.IsValidateCustomNull = data.rowsObject[i].AllocateNull == "1" ? true : false;
        //changeNodeActor.IsValidateNull = data.rowsObject[i].ValidateNull == "1" ? true : false;
        changeNodeActorList.push(changeNodeActor);
    }
    try {
        var orgValue = page.GetControl("Organization_Value").GetValue();
        if (!orgValue) {
            orgValue = "[]";
        }
        WebDesignerWorkflowInfo.Template.RelatedOrganization = JSON.parse(orgValue);

    } catch (e) {
        if (window.console) {
            console.log(e.message);
        }
    }
    WebDesignerWorkflowInfo.Template.ChangeActorNodeList = changeNodeActorList;


    //保存扩展信息
    var templateTypeList = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateService.GetWorkflowTemplateTypeList", {});
    var tempIndex = 1;
    var layout = page.GetControl("Info_Container");
    for (var i = 0; i < templateTypeList.length; i++) {
        var temptype = templateTypeList[i];
        if (temptype.Name == WebDesignerWorkflowInfo.Template.TemplateType && HoteamUI.Common.IsNullOrEmpty(temptype.PageName) == false) {
            var itemName = "item1" + tempIndex.toString();
            var extendPage = HoteamUI.Page.InstanceIn(page.pid, "WorkFlowSettingExtend_Value" + tempIndex.toString(), temptype.PageName);
            HoteamUI.Page.FirePageEvent(extendPage.pid, "OnGetData");
        }
    }
}

//基本信息验证
InforCenter_Platform_WorkflowBaseInfo_OnCheck = function (pageEvent) {
    var success = false;
    var page = pageEvent.o;
    //验证页面控件
    var control = page.GetControl("Info_Container");
    if (control && control.id != "") {
        success = control.Check();
    }
    //如果允许修改过执行人 验证手动指定为空勾选，发起人必须勾选，否则可能发起时不能修改执行人 导致报错
    var allowActorGrid = page.GetControl("ChangeNodeActor_Value");
    var gridData = allowActorGrid.SaveGridRows();
    var allChange = false;
    if (gridData.rowsObject.length > 0) {
        for (var i = 0; i < gridData.rowsObject.length; i++) {
            var row = gridData.rowsObject[i];
            if (row.AllocateNull == 1 || row.AllowChange == 1) {
                allChange = true;
                break;
            }
        }
    }
    if (allChange == true && page.GetControl("ChangeActor_Start").IsChecked() != true) {
        var allChangemessage = { pageMode: "OK", context: "WorkflowBaseInfo", labelName: "ChangeActorError" };
        HoteamUI.UIManager.Popup("Confirm", allChangemessage);
        success = false;
    }
    if (success == true) {
        //保存扩展信息
        var templateTypeList = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateService.GetWorkflowTemplateTypeList", {});
        var tempIndex = 1;
        var layout = page.GetControl("Info_Container");
        for (var i = 0; i < templateTypeList.length; i++) {
            var temptype = templateTypeList[i];
            if (temptype.Name == WebDesignerWorkflowInfo.Template.TemplateType && HoteamUI.Common.IsNullOrEmpty(temptype.PageName) == false) {
                var itemName = "item1" + tempIndex.toString();
                var extendPage = HoteamUI.Page.InstanceIn(page.pid, "WorkFlowSettingExtend_Value" + tempIndex.toString(), temptype.PageName);
                var result = HoteamUI.Page.FirePageEvent(extendPage.pid, "OnCheck");
                if (result == false) {
                    success = false;
                    break;
                }
            }
        }
    }
    return success;
}

//相关模型点击事件
InforCenter_Platform_WorkflowBaseInfo_RelateModelOnClick = function (ctrlEvent) {
    var relateModel = ctrlEvent.o.GetValue();
    var callback = function (data, ret) {
        if (ret && ret.Success == true) {
            data.OtherControl("Model_Value").SetText(ret.ReturnText);
            data.OtherControl("Model_Value").SetValue(ret.ReturnValue);
        }
    }
    HoteamUI.UIManager.Popup("WorkflowRelatedModel", { RelatedModel: relateModel }, callback, ctrlEvent.o);
}

//更改流程责任人
InforCenter_Platform_WorkflowBaseInfo_WorkflowManagerOnClick = function (ctrlEvent) {
    var callback = function (data, ret) {
        var o = HoteamUI.Control.Instance(data.id);
        if (ret != null && ret.length > 0) {
            o.SetText(ret[0].ENAME);
            o.SetValue(ret[0].EID);
        }
    }
    HoteamUI.UIManager.Popup("TreeCommonQuery", { Value: ctrlEvent.o.GetValue(), ItemName: "GroupToRoleToUser", AllQuery: true }, callback, { id: ctrlEvent.o.id }, "400*500");
}

//设置关联组织结构
InforCenter_Platform_WorkflowBaseInfo_RelateOrganizationOnClick = function (ctrlEvent) {
    var value = ctrlEvent.o.GetValue();
    var callback = function (data, ret) {
        if (ret && ret.success == true) {
            data.SetText(ret.text);
            if (ret.actorsList.length > 0) {
                data.SetValue(JSON.stringify(ret.actorsList));
            } else {
                data.SetValue("");
            }
        }
    }
    HoteamUI.UIManager.Popup("WorkflowRelatedOrganization", { Value: value }, callback, ctrlEvent.o);
}

InforCenter_Platform_WorkflowBaseInfo_LoadRelateOrganizations = function (page, template) {
    var data = template.RelatedOrganization;
    if (!data) {
        return;
    }
    var allItem = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateService.GetWorkflowActorItemList", { para: { TemplateType: WebDesignerWorkflowInfo.Template.TemplateType, ActorList: data } });

    var rows = new Array();

    var text = "";

    for (var i = 0; i < data.length; i++) {
        //组装EditGrid数据
        var cols = new Array();
        var actor = data[i];
        var key = HoteamUI.Language.Lang("WorkflowActorItems", actor.Name);
        var value = "";
        for (var j = 0; j < allItem.length; j++) {
            if (allItem[j].Name == actor.Name) {
                if (HoteamUI.Common.IsNullOrEmpty(allItem[j].InitDataJSMethod) == false) {
                    //resultCol.ColText = eval(allItem[j].InitDataJSMethod);
                    var initPara = {};
                    initPara.Text = actor.Actors;
                    initPara.Value = actor.Name;
                    value += ";" + HoteamUI.Common.ExeFunction(allItem[j].InitDataJSMethod, initPara);
                }
                else {
                    value = ";" + actor.Actors;
                }
                break;
            }
        }
        if (value.length > 0) {
            value = value.substring(1);
        }
        text += "、" + key + ":" + value;
    }
    if (text.length > 0) {
        text = text.substring(1);
    }

    try {
        page.GetControl("Organization_Value").SetText(text);
        page.GetControl("Organization_Value").SetValue(JSON.stringify(data));
    } catch (e) {
        if (window.console) {
            console.log(e.message);
        }
    }

}
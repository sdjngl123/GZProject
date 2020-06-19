InforCenter_ModelGenerator_FormInfo_LoadPage = function (pageEvent) {
    var para = pageEvent.o.GetPara();
    if (HoteamUI.Common.IsNullOrEmpty(para.WORKFLOWID))
        return;
    para.WorkflowId = para.WORKFLOWID;
    para.AttachType = 'main';
    var retObjId = HoteamUI.DataService.Call("InforCenter.WorkFlow.WorkflowService.GetObjIDForWorkflowId", {
        para: para
    });
    if (retObjId) {
        var objType = InforCenter_Platform_GTypeFromID(retObjId);
        var pagename = objType + "-EDIT";
        var execPara = {
            pageType: "EDIT",
            objectID: retObjId
        };
        var ret = HoteamUI.Common.ExeFunction("InforCenter_ModelGenerator_FormBuilder_GetPageName", execPara);
        if (ret) {
            pagename = pagename + "-" + ret;
        }
        pageEvent.o.GetControl("CustomFormPageContainer").LoadPage(pagename, {
            ObjectType: objType, ObjectID: retObjId
        });
    }
}


InforCenter_ModelGenerator_FormInfo_OnGetData = function (pageEvent) {
    var ctrl = pageEvent.o.GetControl('CustomFormPageContainer');
    var data = InforCenter_Platform_Object_GetDataFromPage(ctrl.id);
    if (data) {
        return JSON.stringify(data);
    }
}

InforCenter_ModelGenerator_GetFormType_TreeListCommonQuery_OnOK = function (ctrlEvent) {
    var control = HoteamUI.Control.Instance(ctrlEvent.o.id);
    var page = HoteamUI.Page.Instance(control.ContainerID());
    var pagePara = page.GetPara();
    var ids = '';
    var ctrl = page.GetControl('TreeViewSelectedPage');
    var selectItem = ctrl.GetSelected();
    var value = selectItem.values;
    $.each(value, function (i, d) {
        ids += ';' + d;
    });
    if (ids.length > 0) {
        ids = ids.substr(1);
        var result = HoteamUI.DataService.Call("Hoteam.InforCenter.ModelGeneratorService.AddFormTypeToFormClassify", { para: { ObjectID: ids, PEID: pagePara.PEID } });
        if (result) {
            HoteamUI.UIManager.Return(control.ContainerID(), { confirm: "OK" });
        }
    } else {
        HoteamUI.UIManager.Return(control.ContainerID(), { confirm: "Cancel" });
    }
}

InforCenter_ModelGenerator_GetFormType_TreeListCommonQuery_OnSelected = function (ctrlEvent) {
    var control = HoteamUI.Control.Instance(ctrlEvent.o.id);
    var page = HoteamUI.Page.Instance(control.ContainerID());
    var pagePara = page.GetPara();
    var treePage = HoteamUI.Page.InstanceIn(page.pid, "TreeViewPage", "TreeViewCtrl");
    var treeCtrl = treePage.GetControl("TreeView");
    var node = treeCtrl.GetSelectedNode();
    var selectpageContainer = page.GetControl('TreeViewSelectedPage');
    selectpageContainer.AddRow({
        title: node.Text,
        value: node.Value1,
        icon: node.IconOpen,
        pathName: node.Text
    });
}

InforCenter_ModelGenerator_CirculationOpinion_LoadPage = function (pageEvent) {
    var para = pageEvent.o.GetPara();
    if (HoteamUI.Common.IsNullOrEmpty(para.WORKFLOWID))
        return;
    para.ObjectID = para.WORKFLOWID;
    var retData = HoteamUI.DataService.Call("Hoteam.InforCenter.ModelGeneratorService.GetFlowTaskInfoByWorkflowID", {
        para: para
    });
    if (retData) {
        var opinionCtrl = pageEvent.o.GetControl('CirculationOpinionContainer');
        opinionCtrl.LoadData(retData);
    }
}

InforCenter_ModelGenerator_CirculationOpinion_OnGetData = function (pageEvent) {

}

//保存对象信息,newobj 标示是否为新增对象
InforCenter_ModelGenerator_FormBuilder_GetCreatePageName = function (para) {
    var service = "InforCenter.ModelGenerator.ModelGeneratorService.GetFormBuilderVersion";
    var data = HoteamUI.DataService.Call(service, { para: { ObjType: para.objType, Type: para.pageType } });
    return data;
}

InforCenter_ModelGenerator_FormBuilder_GetPageName = function (para) {
    var ret = InforCenter_Platform_Object_GetObjectData(para.objectID);
    if (ret && ret.FORMBUILDERID) {
        var builer = JSON.parse(decodeURI(ret.FORMBUILDERID));
        pagename = "V" + builer[para.pageType];
        return pagename;
    }
}
//模板编辑页OnCreate
InforCenter_Platform_WorkflowTemplateEdit_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();

    var tabPage = HoteamUI.Page.InstanceIn(page.pid, "WorkflowDesignInfo", "WorkflowTemplateInfo");
    //获取右侧tab页pid
    var pid = tabPage.pid;
    pagePara.WorkflowDesignID = page.GetControl("WorkflowDesignDrawing").id;
    //初始化CustomerContainer，并将右侧tab页pid传入
    InforCenter_Platform_WorkflowTemplateEdit_InitWorkFlowEditor(pagePara.WorkflowDesignID, pid);
    var ctrlObject = pageEvent.o.GetControl("Btn_Container");
    var cid = null;
    if (HoteamUI.Common.IsNullOrEmpty(ctrlObject) == false) {
        cid = ctrlObject.id;
    }
    if (HoteamUI.Common.IsNullOrEmpty(pagePara) == false) {
        HoteamUI.Page.SetContainerParas(cid, "WorkflowTemplateEdit", pagePara);
    }
}

//保存
InforCenter_Platform_WorkflowTemplateEdit_OnOK = function (ctrlEvent) {
    var ctrlObject = ctrlEvent.o.OtherControl("Btn_Container");

    if (HoteamUI.Common.IsNullOrEmpty(WebDesignerWorkflowInfo.GetDataPid) == false) {
        var checkresult = HoteamUI.Page.FirePageEvent(WebDesignerWorkflowInfo.GetDataPid, "OnCheck");
        if (checkresult === false) {
            return false;
        }
    }
    var pagePara = null;
    if (HoteamUI.Common.IsNullOrEmpty(ctrlObject) == false) {
        pagePara = HoteamUI.Page.GetContainerPara(ctrlObject.id);
    }


    var template = WebDesignerWorkflowInfo.Template;

    //验证流程模板（采用后台验证）

    var validateContent = $("#" + pagePara.WorkflowDesignID + "_hoteamflow").workflow("validate");
    //启用状态的才进行验证
    if (validateContent != null && validateContent.length > 0 && template.IsRun) {
        return;
    }
    if (template.IsRun) {
        var errorMsgList = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateService.CheckTemplateInfo", { para: { Template: template } });
        if (errorMsgList && errorMsgList.length > 0) {
            var para = { pageMode: "OK", message: errorMsgList.join('；') };
            para.MessageIcon = 'close';
            HoteamUI.UIManager.Popup("Confirm", para);
            return;
        }
    }
    //判断流程模板是否已经使用
    var isUsing = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateService.CheckTemplateIsUsing", { para: { TemplateName: template.Name } });
    if (isUsing == true) {
        //弹出另存为页面
        var callback = function (data, ret) {
            if (HoteamUI.Common.IsNullOrEmpty(ret) == false) {
                if (ret.confirm == "OK") {
                    //保存流程模板
                    HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateService.WorkflowTemplateSave", { para: { Template: template, ClassifyID: data.ClassifyID } });
                }
                else if (ret.confirm == "SaveAs") {
                    //保存流程模板
                    template.DisplayName = ret.TemplateDisplayName;
                    template.TemplateType = ret.TemplateType;
                    template.ClassifyID = ret.ClassifyID;
                    var strTemplate = JSON.stringify(template);
                    HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateService.WorkflowTemplateSaveAs", { para: { Template: template, ClassifyID: ret.ClassifyID } });
                } else if (ret.confirm == "Emend") {
                    var templatepagePara = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID()).GetPara();
                    if (templatepagePara && templatepagePara.SelectID) {
                        template.ClassifyID = data.ClassifyID;
                        var strTemplate = JSON.stringify(template);
                        HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateService.WorkflowTemplateEmend", { para: { Template: template, ClassifyID: data.ClassifyID, WorkflowTemplateObjectID: templatepagePara.SelectID } });
                    }
                }
                if (ret.confirm != "Cancel") {
                    var ret = { confirm: "OK" };
                    var pid = ctrlEvent.o.ContainerID();
                    HoteamUI.UIManager.Return(pid, ret);
                }
            }
        }
        var para = {};
        para.TemplateDisplayName = template.DisplayName;
        para.TemplateType = template.TemplateType;
        para.ClassifyID = pagePara.ClassifyID
        HoteamUI.UIManager.Popup("WorkflowTemplateSavePrompt", para, callback, para);
    }
    else {
        //保存流程模板
        var isCreate = false;
        if (pagePara.IsCreate == true || pagePara.IsCreate == "true") {
            isCreate = true
        }
        if (HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateService.WorkflowTemplateSave", { para: { Template: template, IsCreate: isCreate, ClassifyID: pagePara.ClassifyID } })) {
            var ret = { confirm: "OK" };
            var pid = ctrlEvent.o.ContainerID();
            HoteamUI.UIManager.Return(pid, ret);
        }
    }

}



///用于激活绘图区右侧WorkflowTemplateInfo页面的OnSelectChange事件，以切换tab页
InforCenter_Platform_WorkflowTemplateEdit_FirePageOnSelectChange = function (pid, preSelectInfo, currSelectInfo, template) {
    if (HoteamUI.Common.IsNullOrEmpty(WebDesignerWorkflowInfo.GetDataPid) == false) {
        //记住当前页PageName，用于在同种节点切换时记住选中的页
        WebDesignerWorkflowInfo.SelectedNodePageName = HoteamUI.Page.Instance(WebDesignerWorkflowInfo.GetDataPid).PageName();
        var checkresult = HoteamUI.Page.FirePageEvent(WebDesignerWorkflowInfo.GetDataPid, "OnCheck");
        if (checkresult === false) {
            return false;
        }
        HoteamUI.Page.FirePageEvent(WebDesignerWorkflowInfo.GetDataPid, "OnGetData", { currSelectInfoIsNull: currSelectInfo == null });
    }
    WebDesignerWorkflowInfo.Template = template;
    WebDesignerWorkflowInfo.CurrSelectInfo = currSelectInfo;
    WebDesignerWorkflowInfo.PreSelectInfo = preSelectInfo;
    WebDesignerWorkflowInfo.Pid = pid;
    WebDesignerWorkflowInfo.IsNodeSelectChanged = true;
    HoteamUI.Page.FirePageEvent(pid, "OnSelectChanged", {});
}

///用于激活绘图区右侧WorkflowTemplateInfo页面的OnSelectChange事件，以切换tab页
InforCenter_Platform_WorkflowTemplateEdit_SavePreviousPageData = function (page) {
    //保存上一个页面的数据
    if (HoteamUI.Common.IsNullOrEmpty(WebDesignerWorkflowInfo.GetDataPid) == false && WebDesignerWorkflowInfo.IsNodeSelectChanged == false && HoteamUI.Common.IsNullOrEmpty(HoteamUI.Page.Instance(WebDesignerWorkflowInfo.GetDataPid).PageName()) == false) {
        HoteamUI.Page.FirePageEvent(WebDesignerWorkflowInfo.GetDataPid, "OnGetData");
    }
    //获取当前页PID，用于发送onGetData事件保存当前页数据
    WebDesignerWorkflowInfo.GetDataPid = page.pid;
    WebDesignerWorkflowInfo.IsNodeSelectChanged = false;
}
InforCenter_Platform_WorkflowTemplateEdit_ValidateTemplate = function (pid, props) {
    //保存当前选中tab页数据
    if (HoteamUI.Common.IsNullOrEmpty(WebDesignerWorkflowInfo.GetDataPid) == false) {
        HoteamUI.Page.FirePageEvent(WebDesignerWorkflowInfo.GetDataPid, "OnGetData");
    }
    var ret = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateService.WorkflowTemplateSaveValidate", { para: { Template: props } });
    return ret;
}


InforCenter_Platform_WorkflowTemplateEdit_OnClose = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    var id = page.GetControl("WorkflowDesignDrawing").id;
    $("#" + id + "_hoteamflow").workflow("destroy");
}

InforCenter_Platform_WorkflowTemplateEdit_LineMoveEnd = function (pid, currProps, props, sameDirection) {
    //当节点切换后，添加默认的条件，暂时不做处理
    return;
    if (HoteamUI.Common.IsNullOrEmpty(currProps.StartNodeID) == true || HoteamUI.Common.IsNullOrEmpty(currProps.EndNodeID) == true || currProps.StartNodeID == 'StartNode') {
        return;
    }
    var auditNode = null;
    for (var i = 0; i < props.NodeList.length; i++) {
        var tnode = props.NodeList[i];
        if (tnode.NodeID == currProps.StartNodeID) {
            auditNode = tnode;
            break;
        }
    }

    if (auditNode == null)
        return;
    if (auditNode.ResultList == null) {
        auditNode.ResultList = [];
    }

    var maxValue = 0;
    var newResultName = "";
    if (sameDirection || sameDirection == null) {
        newResultName = HoteamUI.Language.Lang("WorkflowEditForm", "Agree");
    }
    else {
        newResultName = HoteamUI.Language.Lang("WorkflowEditForm", "Return");
        maxValue = 1;
    }
    var tmp = -1;
    var isSame = false;
    if (auditNode.ResultList) {
        for (var i = 0; i < auditNode.ResultList.length; i++) {
            var result = auditNode.ResultList[i];
            if (result.Name == newResultName) {
                isSame = true;
                maxValue = result.ParameterValue;
                break;
            }
        }
    }
    if (isSame == false) {
        var newResult = {};
        newResult.Name = newResultName;
        newResult.ParameterName = "Result";
        newResult.ParameterValue = maxValue;
        auditNode.ResultList.push(newResult);
    }
    if (currProps.Conditions == null || currProps.Conditions.length == 0) {
        var condition = {};
        condition.LeftParenthesis = "";
        condition.ConditionType = "WorkflowParameter";
        condition.RightParenthesis = "";
        condition.Operator = "And";
        condition.Expression = "{\"Name\":\"Result\",\"Operate\":\"==\",\"Value\":\"" + maxValue + "\"}";
        if (currProps.Conditions == null)
            currProps.Conditions = [];
        currProps.Conditions.push(condition);
    }
    WebDesignerWorkflowInfo.Template = props;
    WebDesignerWorkflowInfo.CurrSelectInfo = currProps;
    WebDesignerWorkflowInfo.IsNodeSelectChanged = true;
    HoteamUI.Page.FirePageEvent(pid, "OnSelectChanged", {});
}

InforCenter_Platform_WorkflowTemplateEdit_SelectTemplate = function (pid, prevProps, props) {
    if (HoteamUI.Common.IsNullOrEmpty(WebDesignerWorkflowInfo.GetDataPid) == false) {
        HoteamUI.Page.FirePageEvent(WebDesignerWorkflowInfo.GetDataPid, "OnGetData");
    }
    HoteamUI.Page.FirePageEvent(pid, "OnSelectTemplate", {});
}


InforCenter_Platform_WorkflowTemplateEdit_InitWorkFlowEditor = function (id, pid) {
    var opt, states = {}, data, i, len, node, href;

    //初始化工具栏
    href = window.location.href;

    $.workflow.config.basePath = href.slice(0, href.lastIndexOf("/")) + "/" + "Platform/Js/WorkFlowDesigner/WorkflowEditor/";
    $.workflow.config.guid = WebDesignerWorkflowInfo.Guid;
    $.workflow.config.event.toggle = InforCenter_Platform_WorkflowTemplateEdit_FirePageOnSelectChange;
    $.workflow.config.event.validate = InforCenter_Platform_WorkflowTemplateEdit_ValidateTemplate;
    $.workflow.config.event.lineMoveEnd = InforCenter_Platform_WorkflowTemplateEdit_LineMoveEnd;
    $.workflow.config.event.selectTemplate = InforCenter_Platform_WorkflowTemplateEdit_SelectTemplate;
    data = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateService.GetWorkflowToolBar", {});
    if (data) {
        //扩展选项
        for (i = 0, len = data.length; i < len; i++) {
            node = data[i];
            states[node.Name] = {
                type: node.Name,
                name: node.Name,
                text: { text: node.Text },
                // img: { src: node.Image.replace(/~\\/, ""), width: 16, height: 16 },
                img: { src: node.Image },
                nodeType: node.Type,
                showType: 'image',
                props: JSON.parse(node.props)
            };

            if (node.Type === "relaterect") {
                states[node.Name].text.start = HoteamUI.Language.Lang("GraphEditor", "SwitchStartText");
                states[node.Name].text.end = HoteamUI.Language.Lang("GraphEditor", "SwitchEndText");
            }
        }
        $.workflow.config.tools.states = states;
    }
    //初始化流程编辑器创建参数
    opt = {
        pid: pid,
        restore: WebDesignerWorkflowInfo.Template
    }
    canvas = $("<div style=\"overflow:hidden;position:absolute;top:0px;left:0px;right:0px;bottom:0px;\" class=\"flow-pager\" id=\"" + id + "_hoteamflow\"></div>").appendTo("#" + id).workflow(opt);
}


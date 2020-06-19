//模板编辑页OnCreate
InforCenter_Platform_LifeCycleEdit_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();

    var tabPageContainer = page.GetControl('LifeCycleDesignInfo')
    tabPageContainer.LoadPage('LifeCycleInfo', pagePara);
    var tabPage = HoteamUI.Page.InstanceIn(page.pid, "LifeCycleDesignInfo", "LifeCycleInfo");
    //获取右侧tab页pid
    var pid = tabPage.pid;
    pagePara.LifeCycleDesignID = page.GetControl("LifeCycleDrawing").id;
    //初始化CustomerContainer，并将右侧tab页pid传入
    InforCenter_Platform_LifeCycleEdit_InitLifeCycleEditor(pagePara.LifeCycleDesignID, pid);

    var ctrlObject = pageEvent.o.GetControl("Btn_Container");
    var cid = null;
    if (HoteamUI.Common.IsNullOrEmpty(ctrlObject) == false) {
        cid = ctrlObject.id;
    }
    if (HoteamUI.Common.IsNullOrEmpty(pagePara) == false) {
        HoteamUI.Page.SetContainerParas(cid, "LifeCycleEdit", pagePara);
    }
}

//保存
InforCenter_Platform_LifeCycleEdit_OnOK = function (ctrlEvent) {
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
    var validateContent = $("#" + pagePara.LifeCycleDesignID + "_hoteamflow").workflow("validate");
    if (validateContent != null && validateContent.length > 0) {
        return;
    }
    var isCreate = false;
    if (pagePara.IsCreate == true || pagePara.IsCreate == "true") {
        isCreate = true;
    }
    if (HoteamUI.DataService.Call("InforCenter.LifeCycle.LifeCycleService.SaveLifeCycleData", { para: { Template: template, LifeCycleType: template.TemplateType, InitState: WebDesignerWorkflowInfo.InitState, IsCreate: isCreate } })) {
        var ret = { confirm: "OK" };
        var pid = ctrlEvent.o.ContainerID();
        HoteamUI.UIManager.Return(pid, ret);
    }
}

///用于激活绘图区右侧WorkflowTemplateInfo页面的OnSelectChange事件，以切换tab页
InforCenter_Platform_LifeCycleEdit_FirePageOnSelectChange = function (pid, preSelectInfo, currSelectInfo, template) {
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
InforCenter_Platform_LifeCycleEdit_SavePreviousPageData = function (page) {
    //保存上一个页面的数据
    if (HoteamUI.Common.IsNullOrEmpty(WebDesignerWorkflowInfo.GetDataPid) == false && WebDesignerWorkflowInfo.IsNodeSelectChanged == false && HoteamUI.Common.IsNullOrEmpty(HoteamUI.Page.Instance(WebDesignerWorkflowInfo.GetDataPid).PageName()) == false) {
        HoteamUI.Page.FirePageEvent(WebDesignerWorkflowInfo.GetDataPid, "OnGetData");
    }
    //获取当前页PID，用于发送onGetData事件保存当前页数据
    WebDesignerWorkflowInfo.GetDataPid = page.pid;
    WebDesignerWorkflowInfo.IsNodeSelectChanged = false;
}
InforCenter_Platform_LifeCycleEdit_ValidateTemplate = function (pid, props) {
    //保存当前选中tab页数据
    if (HoteamUI.Common.IsNullOrEmpty(WebDesignerWorkflowInfo.GetDataPid) == false) {
        HoteamUI.Page.FirePageEvent(WebDesignerWorkflowInfo.GetDataPid, "OnGetData");
    }
    var ret = HoteamUI.DataService.Call("InforCenter.LifeCycle.LifeCycleService.LifeCycleSaveValidate", { para: { Template: props } });
    return ret;
}


InforCenter_Platform_LifeCycleEdit_OnClose = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    var id = page.GetControl("LifeCycleDrawing").id;
    $("#" + id + "_hoteamflow").workflow("destroy");
}

InforCenter_Platform_LifeCycleEdit_LineMoveEnd = function (pid, currProps, props, sameDirection) {
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

InforCenter_Platform_LifeCycleEdit_SelectTemplate = function (pid, prevProps, props) {
    if (HoteamUI.Common.IsNullOrEmpty(WebDesignerWorkflowInfo.GetDataPid) == false) {
        HoteamUI.Page.FirePageEvent(WebDesignerWorkflowInfo.GetDataPid, "OnGetData");
    }
    HoteamUI.Page.FirePageEvent(pid, "OnSelectTemplate", {});
}


InforCenter_Platform_LifeCycleEdit_InitLifeCycleEditor = function (id, pid) {
    var opt, states = {}, data, i, len, node, href;

    //初始化工具栏
    href = window.location.href;

    $.workflow.config.basePath = href.slice(0, href.lastIndexOf("/")) + "/" + "Platform/Js/WorkFlowDesigner/WorkflowEditor/";
    $.workflow.config.guid = WebDesignerWorkflowInfo.Guid;
    $.workflow.config.event.toggle = InforCenter_Platform_LifeCycleEdit_FirePageOnSelectChange;
    $.workflow.config.event.validate = InforCenter_Platform_LifeCycleEdit_ValidateTemplate;
    $.workflow.config.event.lineMoveEnd = InforCenter_Platform_LifeCycleEdit_LineMoveEnd;
    $.workflow.config.event.selectTemplate = InforCenter_Platform_LifeCycleEdit_SelectTemplate;
    data = HoteamUI.DataService.Call("InforCenter.LifeCycle.LifeCycleService.GetLifeCycleToolBar", {});
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
                showType: 'image'
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

InforCenter_Platform_CreateLifeCycle_OnCreate = function (pageEvent) {
    var para = pageEvent.o.GetPara();
    var ctrl = pageEvent.o.GetControl('Info_Container');
    var pagename = para.ObjectType + "-CREATE";
    ctrl.LoadPage(pagename, para);
}

InforCenter_Platform_CreateLifeCycle_OnOK = function (ctrlEvent) {

    var ctrl = ctrlEvent.o.OtherControl('Info_Container');
    var data = InforCenter_Platform_Object_GetDataFromPage(ctrl.id);
    if (data != null) {
        var returnValue = {};
        for (var item in data) {
            if (!data.hasOwnProperty(item)) {
                continue;
            }
            returnValue[item] = data[item];
        }
        if (!HoteamUI.DataService.Call("InforCenter.LifeCycle.LifeCycleService.CheckLifeCycleNameExist", { para: { LifeCycleName: returnValue.ENAME, IsCreate: true } }) == true) {
            HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("WorkflowTemplateSaveAs.NameExit"));
            return;
        }
        HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), new Array(returnValue));
    }
}
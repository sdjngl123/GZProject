/*********************************
出差代理页面相关处理
dyc 2016年4月29日
*********************************/

//出差代理页面初始化数据
InforCenter_Platform_WorkFlowAgent_PageLoad = function (pageEvent) {
    var userStr = HoteamUI.DataService.Call("InforCenter.Organization.OrganizationDataService.GetUserInfoForPersonalSetting", {});
    if (HoteamUI.Common.IsNullOrEmpty(userStr)) {
        return;
    }
    var user = JSON.parse(userStr);
    var startDateCtl = pageEvent.o.GetControl('AGENTSTARTDATETIME_Value');
    var endDateCtl=pageEvent.o.GetControl('AGENTENDDATETIME_Value');
   
    if (HoteamUI.Common.IsNullOrEmpty(user.AGENTSTARTDATETIME_DisplayValue) == false) {
        startDateCtl.SetDateTime(user.AGENTSTARTDATETIME_DisplayValue);
        endDateCtl.setStartDate(user.AGENTSTARTDATETIME_DisplayValue);
    }
    if (HoteamUI.Common.IsNullOrEmpty(user.AGENTENDDATETIME_DisplayValue) == false) {
        endDateCtl.SetDateTime(user.AGENTENDDATETIME_DisplayValue);
        startDateCtl.setEndDate(user.AGENTENDDATETIME_DisplayValue);
    }
    pageEvent.o.GetControl('AGENTID_Value').SetText(user.AGENTID_DisplayValue);
    if (HoteamUI.Common.IsNullOrEmpty(user.AGENTID) == false) {
        pageEvent.o.GetControl('AGENTID_Value').SetValue(user.AGENTID);
    }
}

//保存代理设置
InforCenter_Platform_WorkFlowAgent_SaveWorkFlowAgent = function (ctrlEvent) {
    var data = { AGENTID: '', AGENTSTARTDATETIME: '', AGENTENDDATETIME: '' };
    var checkData = true;
    var agentCtrl = ctrlEvent.o.OtherControl('AGENTID_Value');
    if (agentCtrl.Check()) {
        data.AGENTID = agentCtrl.GetValue();
    } else {
        checkData = false;
    }

    var startDateCtrl = ctrlEvent.o.OtherControl('AGENTSTARTDATETIME_Value');
    if (startDateCtrl.Check()) {
        data.AGENTSTARTDATETIME = startDateCtrl.GetTicksByDateTime();
    } else {
        checkData = false;
    }
    var endDateCtrl = ctrlEvent.o.OtherControl('AGENTENDDATETIME_Value');
    if (endDateCtrl.Check()) {
        data.AGENTENDDATETIME = endDateCtrl.GetTicksByDateTime();
    } else {
        checkData = false;
    }
    if (checkData) {
        var result = HoteamUI.DataService.Call("InforCenter.Organization.OrganizationDataService.SaveWorkAgentDate", { para: data });
        if (result == true) {
            InforCenter_Platform_WorkFlowAgent_ReLoadWorkFlowAgentData(ctrlEvent);
            var msg = HoteamUI.Language.Lang("WorkflowEvectionAgent", "SaveSuccess");
            HoteamUI.UIManager.MsgBox(msg);
            //关闭页面
            HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), {});
            //顶部显示出差代理用户名称
            InforCenter_Platform_ShowAgentUser();
        }
    }
}
//取消代理设置按钮操作
InforCenter_Platform_WorkFlowAgent_CancelWorkFlowAgent = function (ctrlEvent) {
    var result = HoteamUI.DataService.Call("InforCenter.Organization.OrganizationDataService.CancelWorkAgentDate", {});
    if (result == true) {
        InforCenter_Platform_WorkFlowAgent_ReLoadWorkFlowAgentData(ctrlEvent);
        var msg = HoteamUI.Language.Lang("WorkflowEvectionAgent", "CancelSuccess");
        HoteamUI.UIManager.MsgBox(msg);
        //关闭页面
        HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), {});
        //顶部显示出差代理用户名称
        InforCenter_Platform_ShowAgentUser();
    }
}
//重新加载出差代理数据
InforCenter_Platform_WorkFlowAgent_ReLoadWorkFlowAgentData = function (ctrlEvent) {
    var userStr = HoteamUI.DataService.Call("InforCenter.Organization.OrganizationDataService.GetUserInfoForPersonalSetting", {});
    if (HoteamUI.Common.IsNullOrEmpty(userStr)) {
        return;
    }
    var user = JSON.parse(userStr);
    ctrlEvent.o.OtherControl('AGENTSTARTDATETIME_Value').SetDateTime(user.AGENTSTARTDATETIME_DisplayValue);
    ctrlEvent.o.OtherControl('AGENTENDDATETIME_Value').SetDateTime(user.AGENTENDDATETIME_DisplayValue);

    if (HoteamUI.Common.IsNullOrEmpty(user.AGENTSTARTDATETIME_DisplayValue) == false) {
        ctrlEvent.o.OtherControl('AGENTENDDATETIME_Value').setStartDate(user.AGENTSTARTDATETIME_DisplayValue);
    }
    if (HoteamUI.Common.IsNullOrEmpty(user.AGENTENDDATETIME_DisplayValue) == false) {
        ctrlEvent.o.OtherControl('AGENTSTARTDATETIME_Value').setEndDate(user.AGENTENDDATETIME_DisplayValue);
    }

    ctrlEvent.o.OtherControl('AGENTID_Value').SetText(user.AGENTID_DisplayValue);
    if (HoteamUI.Common.IsNullOrEmpty(user.AGENTID) == false) {
        ctrlEvent.o.OtherControl('AGENTID_Value').SetValue(user.AGENTID);
    } else {
        ctrlEvent.o.OtherControl('AGENTID_Value').SetValue("");
    }
}
//为结束时间设置最小开始时间
InforCenter_Platform_WorkFlowAgent_EndDateChange = function (ctrlEvent) {
    var startDate = ctrlEvent.o.OtherControl('AGENTENDDATETIME_Value').GetDateTime()
    if (HoteamUI.Common.IsNullOrEmpty(startDate)==false) {
        ctrlEvent.o.OtherControl('AGENTSTARTDATETIME_Value').setEndDate(startDate);
    }
}

//为结束时间设置最小开始时间
InforCenter_Platform_WorkFlowAgent_StratDateChange = function (ctrlEvent) {
    var startDate = ctrlEvent.o.OtherControl('AGENTSTARTDATETIME_Value').GetDateTime()
    if (HoteamUI.Common.IsNullOrEmpty(startDate)==false) {
        ctrlEvent.o.OtherControl('AGENTENDDATETIME_Value').setStartDate(startDate);
    }
}
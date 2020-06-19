InforCenter_Platform_ClassicHomePageTop_AgentSetting = function () {
    //如果别人设置自己为出差代理，只要不在同一时间段，是可以设置的，此处的判断去掉

    //var canSetAgence = HoteamUI.DataService.Call("InforCenter.Organization.OrganizationDataService.CanSetAsAgence", {});
    //if (canSetAgence == false) {
    //    //别人已经设置自己为代理人
    //    var p = { pageMode: "OK", context: "PersonalSetting", labelName: "CannotSetAgency" }
    //    HoteamUI.UIManager.Popup("Confirm", p, null, {});
    //    return;
    //}
    HoteamUI.UIManager.Popup("AgentSetting");
}

InforCenter_Platform_AgentSetting_OnCreate = function (pageEvent) {
    var data = InforCenter_Platform_Object_GetObjectData(HoteamUI.Security.LoginPara.UserID);
    if (data) {
        var page = pageEvent.o;
        page.GetControl("Agent_Txt").SetText(data.AGENTID_DisplayValue);
        page.GetControl("Agent_Txt").SetValue(data.AGENTID);

        page.GetControl("StartTime_Txt").SetDateTimeByTicks(data.AGENTSTARTDATETIME);
        page.GetControl("EndTime_Txt").SetDateTimeByTicks(data.AGENTENDDATETIME);

    }
}

InforCenter_Platform_AgentSetting_AgentOnClick = function (ctrlEvent) {
    var callback = function (data, ret) {
        if (ret != null && ret.length > 0) {
            ctrlEvent.o.SetValue(ret[0].EID);
            ctrlEvent.o.SetText(ret[0].ENAME);
        }
    }
    HoteamUI.UIManager.Popup("TreeCommonQuery", { Value: ctrlEvent.o.GetValue(), ItemName: "GroupToRoleToUser", AllQuery: true }, callback, {}, "400*500");
}

InforCenter_Platform_AgentSetting_OnOK = function (ctrlEvent) {
    var agent = ctrlEvent.o.OtherControl("Agent_Txt").GetValue();
    var startTime = ctrlEvent.o.OtherControl("StartTime_Txt").GetTicksByDateTime();
    var endTime = ctrlEvent.o.OtherControl("EndTime_Txt").GetTicksByDateTime();
    var para = {};
    para.AGENTID = agent;
    para.AGENTSTARTDATETIME = startTime;
    para.AGENTENDDATETIME = endTime;
    var data = HoteamUI.DataService.Call("InforCenter.Plarform.OrganizationDataService.SaveWorkAgentDate", { para: para });
    if (data == true) {
        HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), null);
    }
}
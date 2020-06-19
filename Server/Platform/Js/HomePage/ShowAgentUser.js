
//在页头显示代理人
InforCenter_Platform_ShowAgentUser = function () {
    if (HoteamUI.Security.LoginPara && HoteamUI.Security.LoginPara.LoginID) {
        var service = "InforCenter.Organization.OrganizationDataService.GetAgentUser";
        var para = {};
        var result = HoteamUI.DataService.Call(service, { para: para });
        if (HoteamUI.Common.IsNullOrEmpty(result) == false && HoteamUI.Common.IsNullOrEmpty(result.UserName) == false) {
            $("#SmartHomePage_AgentUser").html("代理人：" + result.UserName);
            $("#SmartHomePage_AgentUser").show();
        } else {
            $("#SmartHomePage_AgentUser").hide();
        }
    }
}
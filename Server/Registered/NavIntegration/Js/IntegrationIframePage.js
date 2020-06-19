InforCenter_NavIntegration_IntegrationIframePage_OnCreate = function (pageEvent) {
    var para = pageEvent.o.GetPara();
    if (para) {
        var localsoftwareaddress = para.LocalSoftwareAddress;
        var pageName = para.PageName;
        para.CompanyID = HoteamUI.Security.LoginPara.CompanyID;
        var url = para.LocalSoftwareAddress + "/IntegrationBasePage.aspx?IsIntegration=true&pageName=" + pageName + "&pagePara=" + encodeURIComponent(JSON.stringify(para));
        pageEvent.o.GetControl("Page_Iframe").LoadPage(url);
    }
}


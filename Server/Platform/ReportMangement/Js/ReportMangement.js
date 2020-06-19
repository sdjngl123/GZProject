InforCenter_ReportMangement_ShowReportPage_OnCreate = function (pageEvent) {

    var page = pageEvent.o;

    var para = page.GetPara();
    var tree = HoteamUI.Control.Instance(para.TreeGuid);
    if (tree.id != '') {
        var lang = HoteamUI.Security.LoginPara.Lang;
        var connect = HoteamUI.Security.LoginPara.Connect;
        var userID = HoteamUI.Security.LoginPara.UserID;
        var loginID = HoteamUI.Security.LoginPara.LoginID;
        var LoginDeviceType = HoteamUI.Security.LoginPara.LoginDeviceType;
        var companyId = HoteamUI.Security.LoginPara.CompanyID;
        var timezone = HoteamUI.Security.LoginPara.TimeZone;
        var select = tree.GetSelectedNode();
        var url = PageInit.WebRootPath + "/Platform/ReportMangement/aspx/ViewReport.aspx?TemplateName=" + select.Text + "&" + InforCenter_ReportManagement_ReportParameter_Get();
        ctrl = page.GetControl("ReportView_Iframe")
        ctrl.LoadPage(url);
    }

}

InforCenter_ReportMangement_ReportManagementDesign_OnCreate = function (ctrlEvent) {

    var ctrl = ctrlEvent.o,
        url = PageInit.WebRootPath + "/Platform/ReportMangement/aspx/DesignReport.aspx?" + InforCenter_ReportManagement_ReportParameter_Get();

    ctrl.LoadPage(url);
}

InforCenter_ReportManagement_ReportParameter_Get = function () {
    var lang = HoteamUI.Security.LoginPara.Lang;
    var connect = HoteamUI.Security.LoginPara.Connect;
    var userID = HoteamUI.Security.LoginPara.UserID;
    var loginID = HoteamUI.Security.LoginPara.LoginID;
    var LoginDeviceType = HoteamUI.Security.LoginPara.LoginDeviceType;
    var companyId = HoteamUI.Security.LoginPara.CompanyID;
    var timezone = HoteamUI.Security.LoginPara.TimeZone;
    return "LoginID=" + loginID + "&UserID=" + userID + "&Connect=" + connect + "&Lang=" + lang + "&LoginDeviceType=" + LoginDeviceType + "&CompanyID=" + companyId + "&TimeZone=" + timezone;
}

InforCenter_ReportMangement_ReportManagementShowPage_OnCreate = function (pageEvent) {
    //var template = ["Eitem.mrt", "Report.mrt"];
    var template = HoteamUI.CallAjax.Call("/Platform/ReportMangement/ReportServices.asmx/", "GetReportPath", {});
    var tab = pageEvent.o.GetControl("Tab");
    var para = {};
    if (template && template.length > 0) {
        for (var i = 0; i < template.length; i++) {
            para.TemplateName = template[i];
            tab.AddTab(
                {
                    pageName: "ShowReportPage",
                    pageParas: para,
                    isSelected: i === 0 ? true : false,
                    text: template[i]
                }
            )
        }
    }
}
InforCenter_Platform_ReportManagement_AddReport = function (para) {
    var callback = function (data, ret) {
        if (ret && ret.length > 0) {
            var fileNames = [];
            for (var i = 0; i < ret.length; i++) {
                fileNames.push(ret[i].FileName);
            }
            var result = HoteamUI.DataService.Call("Hoteam.InforCenter.ReportService.SaveSelectReport", { para: { FileName: fileNames.join(';'), ClassifyID: para[1].ClassifyID } });
            if (result == true) {
                InforCenter_Platform_MenuCtrl_InnerReceiveServerData(para[0], { conform: "OK" });
            }
        }
    }
    var pagePara = {};
    pagePara.ClassifyID = para[1].ClassifyID;
    pagePara.ItemName = "ReportObjectFileListQuery";

    HoteamUI.UIManager.Popup("ListCommonQuery", pagePara, callback, {}, "960*600");
}
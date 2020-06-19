InforCenter_Platform_CompanyRulePermission_PermissionToOwnCompanyActorValueOnClick = function (para) {
    if (para) {
        para.QueryItemName = "SingleCompanyIgnoreCompanyID";
        InforCenter_Platform_ActionRulePermission_PermissionToOrgActorValueOnClick(para);
    }
}

InforCenter_Platform_CompanyRulePermission_ShowPermissionActorTypeDLL = function (ctrlEvent) {
    var pid = ctrlEvent.o.ContainerID();
    var para = HoteamUI.Page.GetContainerPara(pid);
    if (!para) {
        para = {};
    }
    para.IgnoreCompanyID = true;
    var pageName = HoteamUI.Page.Instance(pid).PageName();
    HoteamUI.Page.SetContainerParas(pid, pageName, para);

    var data = HoteamUI.DataService.Call("InforCenter.Rule.RuleDataService.GetPermissionTypeList", { para: { UseBy: "Company" } });
    if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].Value == "PermissionToOwnCompany") {
                return [data[i]];
            }
        }
        return data;
    }

}
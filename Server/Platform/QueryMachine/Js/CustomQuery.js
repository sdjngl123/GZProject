
var InforCenter_Platform_CustomQuery_PageLoadData = function (pageEvent) {
    var pagePara = pageEvent.o.GetPara();
    var treeCtrl = HoteamUI.Control.Instance(pagePara.TreeGuid);
    var selectedNode = treeCtrl.GetSelectedNode();
    var para = {};
    para.ObjectID = "";
    if (selectedNode) {
        para.ObjectID = selectedNode.Value1;
    }

    var btnSave = pageEvent.o.GetControl("btnSave");
    if (para.ObjectID == "CustomRootNode") {
        btnSave.Disable();
    } else {
        btnSave.Enable();
    }

    var ret = HoteamUI.DataService.Call("InforCenter.Platform.QueryMachineService.GetCustomQueryDataForID", { para: para });
    if (ret) {
        pageEvent.o.GetControl("ENAME_Value").SetText(ret.Name);
        pageEvent.o.GetControl("Sql_Value").SetText(ret.SqlString);
        if (ret.OrganizationRole) {
            var c = pageEvent.o.GetControl('ORGANIZATIONROLE_Value');
            c.SetText(ret.OrganizationRole.text);
            c.SetValue(ret.OrganizationRole.value);
        } else {
            var c = pageEvent.o.GetControl('ORGANIZATIONROLE_Value');
            c.SetText("");
            c.SetValue("");
        }
    }
}

//保存数据
var InforCenter_Platform_CustomQuery_BtnSave = function (ctrlEvent) {
    var ctrl = ctrlEvent.o;
    var containerCtrl = HoteamUI.Page.Instance(ctrl.ContainerID());
    var pagePara = HoteamUI.Page.GetContainerPara(containerCtrl.pid);
    var leftTreeCtrl = HoteamUI.Control.Instance(pagePara.TreeGuid);
    var para = {};
    var selectNode = leftTreeCtrl.GetSelectedNode();
    if (selectNode) {
        para.Name = selectNode.Value1;
        para.ID = selectNode.Value5;
    }
    if (HoteamUI.Common.IsNullOrEmpty(para.Name) == false && para.Name != "CustomRootNode") {
        para.OrgainzationRole = ctrlEvent.o.OtherControl('ORGANIZATIONROLE_Value').GetValue();
        var action = "EDIT";
        var actionType = "AUTO";
       
        var actionRet = InforCenter_Platform_EditListViewCtrl_ActionChecker(action, actionType, para.ID);
        if (actionRet == false) {
            HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("QueryMachine.NoPower"));
            return false;
        }
        var ret = HoteamUI.DataService.Call("InforCenter.Platform.QueryMachineService.SaveCustomQueryOrganizationRole", { para: para });
        if (ret) {
            HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("QueryMachine.SaveSuccess"));
        }
    }
}
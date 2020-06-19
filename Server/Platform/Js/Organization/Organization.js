InforCenter_Platform_Organization_RefreshGroup = function (para) {
    if (para[1].TreeID) {
        var treeCtrl = HoteamUI.Control.Instance(para[1].TreeID);
        var node = treeCtrl.GetSelectedNode();
        var rootNode = treeCtrl.GetTreeRootNodes();
        if (rootNode.length > 0) {
            var data = InforCenter_Platform_TreeViewCtrl_GetChildrenData(treeCtrl, rootNode[0]);
            if (data == null) {
                return;
            }
            treeCtrl.ReplaceChildrenNodes(rootNode[0], data);
            return { confirm: "OK" };
        }
    }
}

InforCenter_Platform_Organization_MoveForTree = function (para) {
    var treeId = para && para[1].TreeID;
    var moveType = para && para[1].MoveType;
    if (treeId) {
        var treeCtrl = HoteamUI.Control.Instance(treeId);
        if (treeCtrl) {
            var selectedNode = treeCtrl.GetSelectedNode();
            var moveToNode, parentNode, grandfatherNode;
            if (selectedNode) {
                moveToNode = (moveType == "UP") ? treeCtrl.GetPreNode(selectedNode) : treeCtrl.GetNextNode(selectedNode);
                if (!moveToNode) {
                    var msg = (moveType == "UP") ? HoteamUI.Language.Lang("OrganizationCommon", "AlreadyMoveToTop") : HoteamUI.Language.Lang("OrganizationCommon", "AlreadyMoveToBottom");
                    HoteamUI.UIManager.MsgBox(msg, null, false);
                    return;
                }
                if (moveToNode.Value3 !== selectedNode.Value3) {
                    var msg = (moveType == "UP") ? HoteamUI.Language.Lang("OrganizationCommon", "AlreadyMoveToTop") : HoteamUI.Language.Lang("OrganizationCommon", "AlreadyMoveToBottom");
                    HoteamUI.UIManager.MsgBox(msg, null, false);
                    return;
                }
                if (selectedNode && moveToNode) {
                    var selectedNodeEid, moveToNodeEid, parentNodeEid, type;
                    selectedNodeEid = selectedNode.Value2;
                    moveToNodeEid = moveToNode.Value2;
                    var movePara = { Value1: selectedNodeEid, Value2: moveToNodeEid };
                    var result = HoteamUI.DataService.Call("InforCenter.Platform.OrganizationDataService.MoveOrganization", { para: movePara });
                    if (result) {
                        return { confirm: "OK" };
                    }
                }
            }
        }
    }

}

//执行 移入菜单项
InforCenter_Platform_Organization_MoveToOther = function (para) {
    var treeId = para && para[1].TreeID;
    if (!treeId) {
        return;
    }
    var ReturnValueType = "GROUPINFO;COMPANY";
    var treeCtrl = HoteamUI.Control.Instance(treeId);
    if (!treeCtrl) { return; }
    var selectedNode, parentNode, selectedNodeEid, parentNodeEid;
    //获取选中组织节点
    var selectedNode = treeCtrl.GetSelectedNode();
    if (!selectedNode) { return; }
    selectNodeText = selectedNode.Text;
    selectedNodeEid = selectedNode.Value1;
    parentNode = treeCtrl.GetParentNode(selectedNode);
    parentNodeEid = parentNode.Value1;

    if (!selectedNodeEid || !parentNodeEid) { return; }

    //弹出人员选择框，选择移入的节点
    HoteamUI.UIManager.Popup("TreeCommonQuery", {
        ItemName: "GroupToGroupForMoveToOther", LoadAndSelectType: "SingleLevel_SingleSelect",
        ReturnValueType: ReturnValueType, CommitJS: "InforCenter_Platform_Organization_MoveToOtherPageOKClick", SelectedGroupName: selectNodeText, SelectedGroupId: selectedNodeEid, SelectedGroupParentId: parentNodeEid, OrganizationTreeId: treeId
    }, null, null, "400*500");
}

//执行移入操作确定按钮
InforCenter_Platform_Organization_MoveToOtherPageOKClick = function (ctrlEvent) {
    //获取参数
    var ctrl = ctrlEvent.o;
    var page = HoteamUI.Page.Instance(ctrl.ContainerID());
    var para = page.GetPara();
    if (para != null && para != undefined) {
        var treePage = HoteamUI.Page.InstanceIn(page.pid, "TreeViewPage", "TreeViewCtrl");
        var treeCtrl = treePage.GetControl("TreeView");
        var moveToGroupId;
        if (treeCtrl) {
            var selectedContainer = page.GetControl("SingleSelectContainer");
            var moveToGroupId = selectedContainer.GetContentVal().value;
            if (HoteamUI.Common.IsNullOrEmpty(moveToGroupId)) {
                var labelName = "";
                if (para.AllowReturnEmptyValue == false) {
                    labelName = "NotSelectObject";
                }
                if (HoteamUI.Common.IsNullOrEmpty(labelName) == false) {
                    InforCenter_Platform_ListQueryCtrl_AlertToSelect(labelName);
                    return;
                }
            }
            var types = para.ReturnValueType.split(";");
            var type = InforCenter_Platform_GTypeFromID(moveToGroupId);
            var flag = false;
            for (var i = 0, len = types.length; i < len; i++) {
                if (type == types[i]) {
                    flag = true;
                }
            }
            if (flag == false) {
                return;
            }
        }

        //var treeCtrl = HoteamUI.Control.Instance(treeCtrl.id);
        //获取移入节点信息
        var selectedGroupId = para.SelectedGroupId;
        var selectedGroupParentId = para.SelectedGroupParentId;
        //移入操作相关信息不完整，终止操作
        if (!selectedGroupId || !selectedGroupParentId || !moveToGroupId) { return; }
        //组织结构未改变，不需要执行移入操作
        if (selectedGroupParentId == moveToGroupId) {
            var msg = HoteamUI.Language.Lang("OrganizationCommon", "OrganizationNotChange");
            HoteamUI.UIManager.MsgBox(msg, null, false);
            return;
        }
        //执行移入操作，更新组织结构
        var movePara = { Value1: selectedGroupId, Value2: selectedGroupParentId, Value3: moveToGroupId };
        var resultPath = HoteamUI.DataService.Call("InforCenter.Platform.OrganizationDataService.MoveToOther", { para: movePara });

        if (HoteamUI.Common.IsNullOrEmpty(resultPath)) {
            //返回null代表校验未通过已给出提示
            return;
        }

        para[1] = {};
        para[1].TreeID = para.OrganizationTreeId;
        para[1].Path = resultPath;
        HoteamUI.UIManager.Return(page.pid, null);
        //刷新组织结构树列表
        InforCenter_Platform_Organization_SetGroupSequenceIn(para);
    }
}

function InforCenter_Platform_Organization_SetGroupSequenceIn(para) {
    var treeCtrl = HoteamUI.Control.Instance(para[1].TreeID);
    var nodes = treeCtrl.GetTreeRootNodes();
    var selectNode = treeCtrl.GetSelectedNode();
    treeCtrl.RemoveNode(selectNode);
    if (nodes.length > 0) {
        var node = nodes[0];
        if (para[1].Path == "") {
            return;
        }
        else if (para[1].Path == "0") {
            treeCtrl.ClearTreeNodes();
            var pageContainer = treeCtrl.OtherControl("TreeView_Container");
            var pagePara = HoteamUI.Page.GetContainerPara(pageContainer.id);
            InforCenter_Platform_TreeViewCtrl_LoadRootData(treeCtrl, pagePara);
        }
        else {
            var values = para[1].Path.split('.');
            //  for (var index in values) {
            for (var index = 0; index < values.length; index++) {
                var item = values[index];
                var cnodes = treeCtrl.GetChildrenNodes(node);
                if (HoteamUI.Common.IsNullOrEmpty(cnodes) == true) {
                    var data = InforCenter_Platform_TreeViewCtrl_GetChildrenData(treeCtrl, node);
                    treeCtrl.LoadNodes(node, data);
                    cnodes = treeCtrl.GetChildrenNodes(node);
                }
                if (cnodes.length > 0) {
                    node = cnodes[item];
                }
            }
            var cnodes = treeCtrl.GetChildrenNodes(node);
            if (cnodes && cnodes.length > 0) {
                var data = InforCenter_Platform_TreeViewCtrl_GetChildrenData(treeCtrl, node);
                var childNodes = data.ChildData;
                treeCtrl.ReplaceChildrenNodes(node, childNodes);
            }
            else {
                var data = InforCenter_Platform_TreeViewCtrl_GetChildrenData(treeCtrl, node);
                var childNodes = data.ChildData;
                treeCtrl.LoadNodes(node, childNodes);
            }
            treeCtrl.SelectNode(node);
            treeCtrl.ExpandNode(node, true);
            InforCenter_Platform_TreeManagement_OnNodeChange({ ctrl: treeCtrl });
        }
    }
}

InforCenter_Platform_Organization_ImportOrganization = function (para) {
    var service = "InforCenter.Platform.OrganizationDataService.SaveOrganizationData";
    PlatformUI.UIManager.ImportFile.Call(service, para[1], { filetype: "Excel" }, function () {
        InforCenter_Platform_MenuCtrl_InnerReceiveServerData(para[0], { confirm: "OK" });
    });
}

InforCenter_Platform_Organization_DownloadOrganizationTemplate = function (para) {
    var url = HoteamUI.AppSets.DownloadOrganizationTemplateUrl;
    if (url) {
        url = url.replace('~', PageInit.WebRootPath);
        window.open(url);
    } else {
        HoteamUI.UIManager.MsgBox("ImportOrganization.NULLTemplate");
    }
}
//#region 组织结构导航
InforCenter_Platform_OrganizationSelect_LoadPage = function (pageEvent) {
    var page = pageEvent.o;
    var para = page.GetPara();
    if (para.OnCreate && typeof window[para.OnCreate] == "function") {
        window[para.OnCreate](pageEvent);
    }
}
InforCenter_Platform_Organization_OnOrganizationSelect = function (ctrlEvent) {
    var ctrl = ctrlEvent.o;
    var page = HoteamUI.Page.Instance(ctrl.ContainerID());
    var para = page.GetPara();
    function callback(ret, data) {
        if (ret && data) {
            var eidList = [], enameList = [];
            for (var i = 0, len = data.length; i < len; i++) {
                eidList.push(data[i].EID);
            }
            //去除已包含的EID
            var eids = HoteamUI.DataService.Call("InforCenter.Platform.OrganizationDataService.RemoveExistEID",
                { para: { Value1: eidList.join(';'), Value2: para.addLink.PEID, Value3: para.initData.GROUPID, Value4: para.addLink.PGROUPID } });
            eidList = [];
            for (var i = 0, len = data.length; i < len; i++) {
                var eid = data[i].EID;
                var contain = false;
                for (var j = 0, _len = eids.length; j < _len; j++) {
                    if (eids[j] == eid) {
                        contain = true;
                        break;
                    }
                }
                if (contain == true) {
                    eidList.push(data[i].EID);
                    enameList.push(data[i].ENAME);
                }
            }
            ctrlEvent.o.SetText(enameList.join(";"));
            ctrlEvent.o.SetValue(eidList.join(";"));
            if (eidList.length == 0) {
                HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("Organization", "ObjectUsed"), null, false);
            }
        }
    }
    var itemName = "CompanyListSearchIgnoreCompanyID";
    switch (para.SelectType) {
        case "Company":
            itemName = "CompanyListSearchIgnoreCompanyID";
            break;
        case "Group":
            itemName = "MultiGroupListQuery";
            break;
        case "Role":
            itemName = "MultiRoleListSearch";
            break;
        case "User":
            itemName = "UserListSearch";
            break;
        default:
            break;
    }
    HoteamUI.UIManager.Popup("ListCommonQuery", { ItemName: itemName }, callback, {}, "960*600");
}
InforCenter_Platform_OrganizationCreate_LoadPage = function (pageEvent) {

}

InforCenter_Platform_OrganizationGuidTwo_OnCreate = function (curpage, prePage) {
    var val = "";
    var modeCtrl = prePage.GetControl("Radio");
    if (HoteamUI.Common.IsNullOrEmpty(modeCtrl.id) == false)
        val = modeCtrl.GetValue();
    var container = curpage.GetControl("Info_Container");
    var para = curpage.GetPara();
    para.SelectMode = val;
    HoteamUI.Page.SetContainerParas(curpage.pid, curpage.PageName(), para);
    var pageName = para.PageName;
    if (val == "exist") {
        para.HiddenButton = true;
        pageName = "ListCommonQuery";
        var itemName = "CompanyListSearchIgnoreCompanyID";
        switch (para.SelectType) {
            case "Company":
                para.ItemName = "CompanyListSearchIgnoreCompanyID";
                break;
            case "Group":
                para.ItemName = "MultiGroupListQuery";
                break;
            case "Role":
                para.ItemName = "MultiRoleListSearch";
                break;
            case "User":
                para.ItemName = "UserListSearch";
                break;
            default:
                break;
        }
    }
    var pageContainer = curpage.GetControl("OrganizationContainer");
    pageContainer.LoadPage(pageName, para);
    if (para.SelectType == "Group" && val != "exist") {
        var newPage = HoteamUI.Page.InstanceIn(curpage.pid, "OrganizationContainer", pageName);
        var o = newPage.GetControl('PARENTGROUPEID_Value');
        if (o.id != '') {
            o.SetValue(para.addLink.PEID);
            o.SetText(para.addLink.PENAME);
            o.Disable();
        }
    }
}
InforCenter_Platform_Organization_SelectSave = function (allPages, currentPage) {
    var companyCtrl = currentPage.GetControl("Radio");
    if (companyCtrl.Check()) {
        return true;
    }
    return false;
}
//#endregion

//#region Company
InforCenter_Platform_CompanySelect_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var radio = page.GetControl("Radio");
    radio.Clear();
    radio.AddRadio({ value: "exist", text: HoteamUI.Language.Lang("OrganizationGuide.SelectExistCompany") });
    radio.AddRadio({ value: "create", text: HoteamUI.Language.Lang("OrganizationGuide.CreateCompany"), checked: true });
}
InforCenter_Platform_Organization_CreateSave = function (allPages) {
    var currentPage = allPages[allPages.length - 1];
    var para = currentPage.GetPara();
    var tree = HoteamUI.Control.Instance(para.TreeGuid);
    var selectNode = tree.GetSelectedNode();
    var allPath = InforCenter_Platform_Organization_GetAllParentPath(tree, selectNode);
    if (para.SelectMode == "exist") {

        var queryPage = HoteamUI.Page.InstanceIn(currentPage.pid, "OrganizationContainer", "ListCommonQuery");
        var queryPagePara = queryPage.GetPara();
        var grid = HoteamUI.Control.Instance(queryPagePara.SelectedListGuid);
        var groupid = "";
        if (grid) {
            var gridSelectData = grid.GetCurrentPageRows();
            var ceids = "";
            var cename = "";
            for (var i = 0; i < gridSelectData.length; i++) {
                ceids += ";" + gridSelectData[i].EID;
                cename += ";" + gridSelectData[i].ENAME;
            }
            ceids = ceids.substring(1);
            switch (para.SelectType) {

                case "Group":
                    para.addLink.CEID = ceids;
                    para.addLink.GROUPID = para.initData.GROUPID;
                    var result = HoteamUI.DataService.Call("InforCenter.Platform.OrganizationDataService.CompanyAddGroup", { para: para, addLink: para.addLink });
                    if (result != null) {
                        if (HoteamUI.Common.IsNullOrEmpty(result.Message) == false) {
                            HoteamUI.UIManager.MsgBox(result.Message, result.Detaile, false);
                        }
                        HoteamUI.DataService.Call("InforCenter.Platform.OrganizationDataService.RecordOrganizationTreeLog", { para: { ExtendJsonInfo: JSON.stringify({ SelectID: result.AddIDs, Path: allPath, Operator: "Create" }) } });
                        if (HoteamUI.Common.IsNullOrEmpty(result.AddIDs) == false) {
                            return { confirm: "OK", EID: result.AddIDs };
                        }
                    }
                    break;
                case "User":
                    para.addLink.CEID = ceids;
                    para.addLink.CENAME = cename.substring(1);
                    para.addLink.GROUPID = para.initData.GROUPID;
                    var treeCtrl = HoteamUI.Control.Instance(para.TreeGuid);
                    if (treeCtrl) {
                        var node = treeCtrl.GetSelectedNode();
                        while (HoteamUI.Common.IsNullOrEmpty(node) == false) {
                            var t = InforCenter_Platform_GTypeFromID(node.Value1);
                            if (t == "COMPANY") {
                                para.addLink.ToCompanyID = node.Value1;
                                break;
                            }
                            node = treeCtrl.GetParentNode(node);
                        }
                    }
                    var result = HoteamUI.DataService.Call("InforCenter.Platform.OrganizationDataService.GroupRoleAddUser", { para: para, addLink: para.addLink });
                    if (result != null) {
                        if (HoteamUI.Common.IsNullOrEmpty(result.Message) == false) {
                            HoteamUI.UIManager.MsgBox(result.Message, result.Detaile, false);
                        }
                        HoteamUI.DataService.Call("InforCenter.Platform.OrganizationDataService.RecordOrganizationTreeLog", { para: { ExtendJsonInfo: JSON.stringify({ SelectID: result.AddIDs, Path: allPath, Operator: "Create" }) } });
                        if (HoteamUI.Common.IsNullOrEmpty(result.AddIDs) == false) {
                            return { confirm: "OK", EID: result.AddIDs };
                        }
                    }
                    break;
                default:
                    var addLink = $.extend(true, { CEID: ceids }, para.addLink);
                    var paraList = [{}, { para: para, addLink: addLink, initData: para.initData }];
                    var ret = InforCenter_Platform_Object_AddLinkObject(paraList);
                    if (ret && ret.confirm == "OK") {
                        HoteamUI.DataService.Call("InforCenter.Platform.OrganizationDataService.RecordOrganizationTreeLog", { para: { ExtendJsonInfo: JSON.stringify({ SelectID: ret.EID, Path: allPath, Operator: "Create" }) } });
                    }
                    break;
            }
        }
        else {
            HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("Organization", "ObjectSelected"));
            return { IsClose: false, confirm: "Cancel" };
        }
    } else {
        var container = currentPage.GetControl("OrganizationContainer");
        HoteamUI.Page.FirePageEvent(container.id, "OnGetDataFromPage", {});
        if (InforCenter_Platform_Object_Data) {
            //添加addLink到对象里面
            InforCenter_Platform_Object_Data = $.extend(true, InforCenter_Platform_Object_Data, para);
            InforCenter_Platform_Object_Data.IsPrompt = "true";
            if (para.SelectType == "Group")
                delete InforCenter_Platform_Object_Data.addLink;
            var ret = InforCenter_Platform_Object_SaveObjectData(InforCenter_Platform_Object_Data, true, para)
            if (ret == null) {
                return { IsClose: false, confirm: "Cancel" };
            } else {
                HoteamUI.DataService.Call("InforCenter.Platform.OrganizationDataService.RecordOrganizationTreeLog", { para: { ExtendJsonInfo: JSON.stringify({ SelectID: ret.EID, Path: allPath, Operator: "Create" }) } });
            }
        }
    }
    return { confirm: "OK" };
}

InforCenter_Platform_Organization_GetAllParentPath = function (tree, selectNode) {
    var text = selectNode.Text;
    var parentNode = tree.GetParentNode(selectNode);
    if (parentNode) {
        return InforCenter_Platform_Organization_GetAllParentPath(tree, parentNode) + "/" + text;
    }
    return text;
}

InforCenter_Platform_Organization_LastPageSave = function (allPages, currentPage) {
    var para = currentPage.GetPara();
    var ret = false;
    if (para.SelectMode == "exist") {
        var queryPage = HoteamUI.Page.InstanceIn(currentPage.pid, "OrganizationContainer", "ListCommonQuery");
        var queryPagePara = queryPage.GetPara();
        //gridSelectData在内部使用，不能传空
        var gridSelectData = [];
        if (InforCenter_Platform_ListCommonQuery_CheckData(queryPage, queryPagePara, gridSelectData) == "") {
            ret = true;
        }
        else {
            HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("Organization", "ObjectSelected"));
        }
    } else {
        var container = currentPage.GetControl("OrganizationContainer");
        HoteamUI.Page.FirePageEvent(container.id, "OnGetDataFromPage", {});
        if (HoteamUI.Common.IsNullOrEmpty(InforCenter_Platform_Object_Data) == false) {
            ret = true;
        }
    }
    return ret;
}

//#endregion

//#region Group
InforCenter_Platform_GroupSelect_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var radio = page.GetControl("Radio");
    radio.Clear();
    radio.AddRadio({ value: "exist", text: HoteamUI.Language.Lang("OrganizationGuide.SelectExistGroup") });
    radio.AddRadio({ value: "create", text: HoteamUI.Language.Lang("OrganizationGuide.CreateGroup"), checked: true });
}
//#endregion

//#region Role
InforCenter_Platform_RoleSelect_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var radio = page.GetControl("Radio");
    radio.Clear();
    radio.AddRadio({ value: "exist", text: HoteamUI.Language.Lang("OrganizationGuide.SelectExistRole") });
    radio.AddRadio({ value: "create", text: HoteamUI.Language.Lang("OrganizationGuide.CreateRole"), checked: true });
}
//#endregion

InforCenter_Platform_UserSelect_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var radio = page.GetControl("Radio");
    radio.Clear();
    radio.AddRadio({ value: "exist", text: HoteamUI.Language.Lang("OrganizationGuide.SelectExistUser") });
    radio.AddRadio({ value: "create", text: HoteamUI.Language.Lang("OrganizationGuide.CreateUser"), checked: true });
}

InforCenter_Platform_Organization_RemoveOrganizeLinkCheck = function (paraList) {
    var obj = {};
    obj.Value1 = paraList[1].CEID;
    obj.Value2 = paraList[1].PEID;
    obj.Value3 = paraList[1].GROUPID;
    obj.Value4 = paraList[1].ENAME;
    obj.Value5 = paraList[1].LID;
    obj.Text = paraList[1].Text;
    var result = HoteamUI.DataService.Call("InforCenter.Platform.OrganizationDataService.RemoveOrganizeLinkCheck", { para: obj });
    if (result) {
        InforCenter_Platform_MenuCtrl_InnerReceiveServerData(paraList[0], { confirm: "OK" });
    }
}
InforCenter_Platform_Organization_RemoveOrganizeLink = function (paraList) {
    var tree = HoteamUI.Control.Instance(paraList[1].TreeGuid);
    var selectNode = tree.GetSelectedNode();
    var allPath = InforCenter_Platform_Organization_GetAllParentPath(tree, selectNode);
    var para = {};
    para.Path = allPath;
    para.Operator = "Remove";
    para.CEID = paraList[1].CEID;
    para.Path = allPath;
    paraList[1].ExtendJsonInfo = JSON.stringify(para);

    var ret = HoteamUI.DataService.Call("InforCenter.Platform.OrganizationDataService.RemoveOrganizeLink", { para: paraList[1] });
    if (ret == true) {
        InforCenter_Platform_MenuCtrl_InnerReceiveServerData(paraList[0], { confirm: "OK" });
    }
}
InforCenter_Platform_Organization_OrganizeDeleteCheck = function (paraList) {
    var ret = HoteamUI.DataService.Call("InforCenter.Platform.OrganizationDataService.OrganizeDeleteCheck", { para: paraList[1] });
    if (ret == true) {
        InforCenter_Platform_MenuCtrl_InnerReceiveServerData(paraList[0], { confirm: "OK" });
    }
}

InforCenter_Platform_Organization_ComanyGroupUserDeleteCheck = function (paraList) {
    var ret = HoteamUI.DataService.Call("InforCenter.Platform.OrganizationDataService.ComanyGroupUserDeleteCheck", { para: paraList[1] });
    if (ret == true) {
        InforCenter_Platform_MenuCtrl_InnerReceiveServerData(paraList[0], { confirm: "OK" });
    }
}

//检测用户ID
InforCenter_Platform_Organization_DeletePersonCheck = function (paraList) {
    var ret = HoteamUI.DataService.Call("InforCenter.Platform.OrganizationDataService.PersonDeleteCheck", { para: paraList[1] });
    if (ret == true) {
        InforCenter_Platform_MenuCtrl_InnerReceiveServerData(paraList[0], { confirm: "OK" });
    }
}

//检测用户ID
InforCenter_Platform_Organization_TransferOwnership = function (ctrlEvent) {
    var pageContainer = ctrlEvent.o.OtherControl("Btn_Container");
    var para = HoteamUI.Page.GetContainerPara(pageContainer.id);
    var treeCtrl = HoteamUI.Control.Instance(para.TreeGuid);
    if (treeCtrl) {
        var node = treeCtrl.GetSelectedNode();
        var userID = node.Value1;
        if (node == null || HoteamUI.Common.IsNullOrEmpty(userID) || InforCenter_Platform_GTypeFromID(userID) != "USERINFO") {
            HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("OrganizationCommon.OnlySelectUserTransferOwnership"));
            return;
        }
        if (userID == para.SelectID) {
            HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("OrganizationCommon.TransferOwnerSame"));
            return;
        }
        var toUserID = "";
        var toGroupID = "";
        var toCompanyID = "";
        while (HoteamUI.Common.IsNullOrEmpty(node) == false) {
            var t = InforCenter_Platform_GTypeFromID(node.Value1);
            if (t == "USERINFO")
                toUserID = node.Value1;
            else if (t == "GROUPINFO" && toGroupID == "")
                toGroupID = node.Value1;
            else if (t == "COMPANY")
                toCompanyID = node.Value1;
            node = treeCtrl.GetParentNode(node);
        }
        var requestPara = { para: { FromID: para.SelectID, ToUserID: toUserID, ToGroupID: toGroupID, ToCompanyID: toCompanyID } };
        if (para.TransferType != "User") {
            var ret = HoteamUI.DataService.Call("InforCenter.Common.OrganizationDataService.ObjectTransferOwnership", requestPara);
            if (HoteamUI.Common.IsNullOrEmpty(ret) == false) {
                function callback1() {
                    HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), { confirm: "OK" });
                }
                var para = { pageMode: "OK", message: ret }
                HoteamUI.UIManager.Popup("Confirm", para, callback1);
            }
        }
        else {
            HoteamUI.DataService.AsyncCall("InforCenter.Common.OrganizationDataService.UserTransferOwnership", requestPara);
            function callback2() {
                HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), null);
            }
            var para = { pageMode: "OK", context: "OrganizationCommon", labelName: "StartUserTransferOwnership" }
            HoteamUI.UIManager.Popup("Confirm", para, callback2);
        }
    }
};


InforCenter_Platform_Organization_RecallOwnership = function (para) {
    var ret = HoteamUI.DataService.Call("InforCenter.Common.OrganizationDataService.TakeBackObjectOwnership", { para: { FromID: para[1].SelectID } });
    if (HoteamUI.Common.IsNullOrEmpty(ret) == false) {
        HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("OrganizationCommon.RecallOwnership"), ret);
    }
}








InforCenter_Platform_PersonGuid_LoadPage = function (curpage, prePage) {
    var para = curpage.GetPara();
    if (para.SelectType == "User") {
        var prePara = prePage.GetPara();
        if (HoteamUI.Common.IsNullOrEmpty(prePara.Data) == false) {
            var personName = prePara.Data.ENAME;
            var personIdCtrl = curpage.GetControl("PERSONEID_Value");
            if (personIdCtrl.id != "") {
                personIdCtrl.SetText(personName);
                personIdCtrl.SetValue(personName);
                personIdCtrl.Disable();
            }

            var personEnameCtrl = curpage.GetControl("ENAME_Value");
            if (personEnameCtrl.id != "") {
                personEnameCtrl.SetText(personName);
            }
        }
    }
}

InforCenter_Platform_PersonGuid_Save = function (allPages, curpage) {
    var ret = false;
    HoteamUI.Page.FirePageEvent(curpage.pid, "OnGetDataFromPage", {});
    if (HoteamUI.Common.IsNullOrEmpty(InforCenter_Platform_Object_Data) == false) {
        //校验是否重复
        var para = curpage.GetPara();
        para.Data = InforCenter_Platform_Object_Data;
        var checkpara = { NewObject: true, Data: JSON.stringify(para.Data), ObjectID: "", ObjectType: para.Data.ObjectType };
        var checkRet = HoteamUI.DataService.Call("Hoteam.InforCenter.ObjectService.CheckObjectUnique", { para: checkpara });
        if (checkRet == false) {
            ret = true;
            HoteamUI.Page.SetContainerParas(curpage.pid, curpage.PageName(), para);
        }
    }
    return ret;
}

InforCenter_Platform_PersonGuid_CreateSave = function (allPages) {
    var data = {};
    for (var i = 0; i < allPages.length; i++) {
        var currentPage = allPages[i];
        var para = currentPage.GetPara();
        if (para.SelectType == "Person") {
            data.PersonData = para.Data;
        }
        else if (para.SelectType == "User") {
            data.UserData = para.Data;
        }
    }

    if (HoteamUI.Common.IsNullOrEmpty(data.PersonData) == false) {
        var paraData = { PersonData: JSON.stringify(data.PersonData), UserData: JSON.stringify(data.UserData) };
        var result = HoteamUI.DataService.Call("Hoteam.InforCenter.OrganizationDataService.SavePersonAndUser", { para: paraData });
        if (result != true) {
            return { confirm: "Cancel" };
        }
        else {
            return { confirm: "OK" };
        }
    }
}

//页面初始化事件处理
InforCenter_Platform_QueryMachine_PageLoadData = function (pageEvent) {
    var pagePara = pageEvent.o.GetPara();
    var treeCtrl = HoteamUI.Control.Instance(pagePara.TreeGuid);
    var selectedNode = treeCtrl.GetSelectedNode();
    var para = {};
    para.ObjectID = "";
    if (selectedNode) {
        para.ObjectID = selectedNode.Value1;
    }
    var ret = HoteamUI.DataService.Call("InforCenter.Platform.QueryMachineService.GetQueryMachineDataForID", { para: para });

    if (ret) {
        //选中根节点，设置保存和删除按钮状态为置灰
        if (HoteamUI.Common.IsNullOrEmpty(ret.ENAME)) {
            pageEvent.o.GetControl("btnSave").Disable();
            pageEvent.o.GetControl("btnDelete").Disable();
        }
        else {
            pageEvent.o.GetControl("btnSave").Enable();
            pageEvent.o.GetControl("btnDelete").Enable();
        }

        //判断是否有新建权限
        var isPermission = HoteamUI.DataService.Call(" InforCenter.InforCenter.QueryMachineService.CheckPermission", { para: {} });
        if (isPermission) {
            pageEvent.o.GetControl("btnCreate").Enable();
        } else {
            pageEvent.o.GetControl("btnCreate").Disable();
        }

        pageEvent.o.GetControl("ENAME_Value").SetText(ret.ENAME);
        pageEvent.o.GetControl("DESCRIPTION_Value").SetText(ret.DESCRIPTION);
        if (ret.RootPOMData) {
            var rootPomCtrl = pageEvent.o.GetControl("ROOTPOM_Value");
            rootPomCtrl.SetText(ret.RootPOMData.text);
            rootPomCtrl.SetValue(ret.RootPOMData.value);
        }
        if (ret.DataLinkModel) {
            var dataLinkModelCtrl = pageEvent.o.GetControl("DataLinkModel_Value");
            dataLinkModelCtrl.SetText(ret.DataLinkModel.text);
            dataLinkModelCtrl.SetValue(ret.DataLinkModel.value);
        }
        if (ret.FieldKeyData) {
            var FieldKeyDataCtrl = pageEvent.o.GetControl("FIELDKEY_Value");
            FieldKeyDataCtrl.LoadItems(ret.FieldKeyData);
        }
        if (ret.ShowViewData) {
            pageEvent.o.GetControl("SHOWVIEW_Value").SetText(ret.ShowViewData.text);
            pageEvent.o.GetControl("SHOWVIEW_Value").SetValue(ret.ShowViewData.value);
        }
        if (ret.OrganizationRole) {
            var c = pageEvent.o.GetControl('ORGANIZATIONROLE_Value');
            c.SetText(ret.OrganizationRole.text);
            c.SetValue(ret.OrganizationRole.value);
        }
        if (ret.POMAttributeTreeData) {
            //将关联关系转换为对象，保持一致
            for (var i = 0; i < ret.POMAttributeTreeData.length; i++) {
                if (ret.POMAttributeTreeData[i].Tag.length > 0) {
                    for (var j = 0; j < ret.POMAttributeTreeData[i].Tag.length; j++) {
                        if (ret.POMAttributeTreeData[i].Tag[j].Key == "LinkData") {
                            ret.POMAttributeTreeData[i].Tag[j].Value = $.parseJSON(ret.POMAttributeTreeData[i].Tag[j].Value)
                        }
                    }
                }
            }
            pageEvent.o.GetControl("POMAttributeTree").LoadNodes(null, ret.POMAttributeTreeData);
        }
        if (ret.QueryRoleData) {
            pageEvent.o.GetControl("QueryRoleGrid").LoadGridRows(ret.QueryRoleData);
        }
    }
}

//表格形式控件点击事件
InforCenter_Platform_QueryMachine_ShouViewCtrlLink = function (ctrlEvent) {

    var rootPomDataCtrl = ctrlEvent.o.OtherControl("ROOTPOM_Value");
    var linkModelCtrl = ctrlEvent.o.OtherControl("DataLinkModel_Value");
    var rootPomData = rootPomDataCtrl.GetValue();
    var childData = linkModelCtrl.GetValue();
    if (HoteamUI.Common.IsNullOrEmpty(rootPomData) == true) {
        HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("QueryMachine.RootPOMIsNull"));
    } else {
        var callback = function (data, ret) {
            if (HoteamUI.Common.IsNullOrEmpty(ret)) {
                return;
            }
            var values = "";
            var texts = "";
            for (var i = 0; i < ret.value.length; i++) {
                if (i == 0) {
                    values = ret.value[i];
                    texts = ret.title[i];
                } else {
                    values += ";" + ret.value[i];
                    texts += ";" + ret.title[i];

                }
            }
            ctrlEvent.o.SetValue(values);
            ctrlEvent.o.SetText(texts);
        }

        HoteamUI.UIManager.Popup("TreeCommonQuery", { Value: JSON.stringify({ text: ctrlEvent.o.GetText(), value: ctrlEvent.o.GetValue() }), ItemName: "QueryMachineShowViewTreeQuery", ObjectName: rootPomData + ";" + childData }, callback, null, "500*500");
    }
}


QueryMachine_TreeSelectedListInit = function (ctrlEvent) {
    var selectedValue = JSON.parse(ctrlEvent.Value);
    var Objects = [];
    if (!HoteamUI.Common.IsNullOrEmpty(selectedValue) && selectedValue.text && selectedValue.value) {
        var texts = selectedValue.text.split(';');
        var values = selectedValue.value.split(';');
        for (var i = 0; i < texts.length; i++) {
            var tempObj = {};
            tempObj.ENAME = texts[i];
            tempObj.EID = values[i];
            tempObj.IMGICONTYPE = '~/Platform/Image/Model/collapsefolder.png';
            Objects.push(JSON.stringify(tempObj));
        }
    }
    return { Objects: Objects };
};


//获取表格形式数据方法
InforCenter_Platform_QueryMachine_TreeQueryCommit = function (ctrlEvent) {
    var selectedlist = ctrlEvent.o.OtherControl("TreeViewSelectedPage");
    var returnValue = selectedlist.GetSelected().values;
    var returnText = selectedlist.GetSelected().titles;
    HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), {
        value: returnValue, title: returnText
    });
}


//主模型点击事件 通过修改主POM获取数据相关模型数据
InforCenter_Platform_QueryMachine_RootPomCtrlLink = function (ctrlEvent) {
    var callback = function (data, retValue) {
        if (HoteamUI.Common.IsNullOrEmpty(retValue) == false) {
            if (HoteamUI.Common.IsNullOrEmpty(retValue.value) == false) {
                var ret = HoteamUI.DataService.Call("InforCenter.Platform.QueryMachineService.GetFieldKeyData", { para: { ObjectName: retValue.value } });
                if (ret) {
                    if (ret.FieldKeyData) {
                        var dataLinkModelCtrl = ctrlEvent.o.OtherControl("FIELDKEY_Value");
                        dataLinkModelCtrl.LoadItems(ret.FieldKeyData);
                    }
                    if (ret.TreeNodeData) {
                        ret.TreeNodeData[0].Value4 = "RootPOM";
                        ret.TreeNodeData[0].Text = ret.TreeNodeData[0].Text + '(' + HoteamUI.Language.Lang("QueryMachine.RootModel") + ')';
                        var pomTreeCtr = ctrlEvent.o.OtherControl("POMAttributeTree");
                        var pomTreeData = pomTreeCtr.GetTreeRootNodes();
                        if (pomTreeData && pomTreeData.length > 0) {
                            pomTreeData = JSON.parse(JSON.stringify(pomTreeData));
                            var add = true;
                            var removeTypeName = "";
                            for (var i = 0; i < pomTreeData.length; i++) {
                                if (pomTreeData[i].Value4 == "RootPOM") {
                                    if (pomTreeData[i].Value1 != ret.TreeNodeData[0].Value1) {
                                        //移除搜索规则
                                        var queryRoleGridCtrl = ctrlEvent.o.OtherControl("QueryRoleGrid");
                                        InforCenter_Platform_QueryMachine_POMGridRemoveRows(pomTreeData[i].Value1, queryRoleGridCtrl);
                                        //去掉所有与当前对象有关的设置关联
                                        removeTypeName = pomTreeData[i].Value1;
                                    }
                                    pomTreeData[i] = ret.TreeNodeData[0];
                                    add = false;
                                }
                                if (pomTreeData[i].Value4 != "RootPOM" && pomTreeData[i].Value1 == ret.TreeNodeData[0].Value1) {
                                    pomTreeData.splice(i, 1);
                                }
                            }
                            if (add) {
                                var newData = [];
                                newData.push(ret.TreeNodeData[0]);
                                for (var i = 0; i < pomTreeData.length; i++) {
                                    newData.push(pomTreeData[i]);
                                }
                                pomTreeData = newData;
                            }
                            if (HoteamUI.Common.IsNullOrEmpty(removeTypeName) == false) {
                                //去掉所有与当前对象有关的设置关联
                                for (var i = 0; i < pomTreeData.length; i++) {
                                    var tagData = pomTreeData[i].Tag;
                                    if (tagData && tagData.length > 0) {
                                        var linkData = {};
                                        for (var j = 0; j < tagData.length; j++) {
                                            if (tagData[j].Type == "LinkData" && tagData[j].BTypeName == removeTypeName) {
                                                pomTreeData[i].Tag = [];
                                                pomTreeData[i].Text = pomTreeData[i].Text.split('(')[0];
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (HoteamUI.Common.IsNullOrEmpty(pomTreeData) == true) {
                            pomTreeData = ret.TreeNodeData;
                        }
                        pomTreeCtr.LoadNodes(null, pomTreeData);

                        ctrlEvent.o.SetValue(retValue.value);
                        ctrlEvent.o.SetText(retValue.title);
                    }
                }
            }
        }
    }


    HoteamUI.UIManager.Popup("TreeCommonQuery", {
        Value: JSON.stringify({
            text: ctrlEvent.o.GetText(), value: ctrlEvent.o.GetValue()
        }), ItemName: "QueryMachineRootModelTreeQuery"
    }, callback, null, "400*500");
}


//选中主模型树确认事件
InforCenter_Platform_QueryMachineRootPOM_TreeQueryCommit = function (ctrlEvent) {
    var pageContainer = ctrlEvent.o.OtherControl("Btn_Container");
    var para = HoteamUI.Page.GetContainerPara(pageContainer.id);
    var treeCtrl = HoteamUI.Control.Instance(para.TreeGuid);
    var node = treeCtrl.GetSelectedNode();
    if (node) {
        HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), {
            value: node.Value1, title: node.Text
        });
    }
}

//数据相关模型
InforCenter_Platform_QueryMachine_DataModelCtrlLink = function (ctrlEvent) {
    var rootPomDataCtrl = ctrlEvent.o.OtherControl("ROOTPOM_Value");
    var rootPomData = rootPomDataCtrl.GetValue();

    if (HoteamUI.Common.IsNullOrEmpty(rootPomData) == true) {
        HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("QueryMachine.RootPOMIsNull"));
    } else {
        var callback = function (data, ret) {
            if (HoteamUI.Common.IsNullOrEmpty(ret)) {
                return;
            }
            var values = "";
            var texts = "";
            for (var i = 0; i < ret.value.length; i++) {
                if (i == 0) {
                    values = ret.value[i];
                    texts = ret.title[i];
                } else {
                    values += ";" + ret.value[i];
                    texts += ";" + ret.title[i];

                }
            }
            ctrlEvent.o.SetValue(values);
            ctrlEvent.o.SetText(texts);
        }

        HoteamUI.UIManager.Popup("TreeCommonQuery", {
            Value: JSON.stringify({
                text: ctrlEvent.o.GetText(), value: ctrlEvent.o.GetValue()
            }), ItemName: "QueryMachineLinkModelTreeQuery", ObjectName: rootPomData
        }, callback, null, "500*500");
    }
};


//POM属性按钮点击事件
InforCenter_Platform_QueryMachine_POMAttributeMenuClick = function (ctrlEvent) {
    if (ctrlEvent.value == "AddPOM") {
        var callback = function (data, ret) {
            if (ret) {
                var retTreeNode = HoteamUI.DataService.Call("InforCenter.Platform.QueryMachineService.GetObjectTreeNode", { para: { ObjectName: ret.value } });
                var pomTreeCtr = ctrlEvent.o.OtherControl("POMAttributeTree");
                var pomTreeData = pomTreeCtr.GetTreeRootNodes();
                if (pomTreeData && pomTreeData.length > 0) {
                    pomTreeData = JSON.parse(JSON.stringify(pomTreeData));
                    var ck = true;
                    for (var i = 0; i < pomTreeData.length; i++) {
                        if (pomTreeData[i].Value1 == retTreeNode[0].Value1) {
                            ck = false;
                        }
                    }
                    if (ck) {
                        pomTreeData.push(retTreeNode[0])
                        pomTreeCtr.LoadNodes(null, pomTreeData);
                    }
                }
                if (HoteamUI.Common.IsNullOrEmpty(pomTreeData) == true) {
                    pomTreeData = retTreeNode;
                    pomTreeCtr.LoadNodes(null, pomTreeData);
                }
            }
        }
        HoteamUI.UIManager.Popup("TreeCommonQuery", { ItemName: "QueryMachineRootModelTreeQuery" }, callback, null, "400*500");
    } else if (ctrlEvent.value == "RemovePOM") {
        var pomTreeCtr = ctrlEvent.o.OtherControl("POMAttributeTree");
        var queryRoleGridCtrl = ctrlEvent.o.OtherControl("QueryRoleGrid");
        var selectNode = pomTreeCtr.GetSelectedNode();
        var parentNode = pomTreeCtr.GetParentNode(selectNode);
        if (selectNode == null) {
            HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("QueryMachine.NoneSelect"));
        } else if ((parentNode != null && parentNode.Value4 == "RootPOM") || (selectNode.Value4 == "RootPOM")) {
            HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("QueryMachine.CanNotRemoveRoot"));
        } else {
            if (parentNode != null) {
                pomTreeCtr.RemoveNode(parentNode);
                InforCenter_Platform_QueryMachine_POMGridRemoveRows(parentNode.Value1, queryRoleGridCtrl);
            } else {
                pomTreeCtr.RemoveNode(selectNode);
                InforCenter_Platform_QueryMachine_POMGridRemoveRows(selectNode.Value1, queryRoleGridCtrl);
            }
        }
    } else if (ctrlEvent.value == "AddLink") {
        InforCenter_Platform_QueryMachine_AddAttributeLink(ctrlEvent);
    }
}
//设置关联按钮事件处理
InforCenter_Platform_QueryMachine_AddAttributeLink = function (ctrlEvent) {
    var pomTreeCtr = ctrlEvent.o.OtherControl("POMAttributeTree");
    var selectNode = pomTreeCtr.GetSelectedNode();
    var parentNode = pomTreeCtr.GetParentNode(selectNode);
    if (selectNode == null) {
        HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("QueryMachine.NoneSelect"));
    } else if (parentNode == null) {
        HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("QueryMachine.OnlyCanSelectedAttributeNode"));
    } else if (parentNode.Value4 == "RootPOM") {
        HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("QueryMachine.CanNotAddRootModel"));
    } else {
        var callback = function (data, ret) {
            if (!HoteamUI.Common.IsNullOrEmpty(ret)) {
                var newNode = JSON.parse(JSON.stringify(parentNode));
                var showText = parentNode.Text.split('(')[0] + '.' + selectNode.Text + '--' + ret.Text;
                ret.Value.ATypeName = parentNode.Value1;
                ret.Value.AColName = selectNode.Value1;
                newNode.Text = parentNode.Text.split('(')[0] + '(' + showText + ')';
                newNode.Tag = new Array();
                var tagData = {};
                tagData.Key = "LinkData";
                tagData.Value = ret.Value;
                newNode.Tag.push(tagData);
                pomTreeCtr.UpdateNode(parentNode, newNode);
            }
        }
        var para = {};
        para.SelectNode = selectNode;
        para.ParentNode = parentNode;
        para.TreeNode = pomTreeCtr.GetTreeRootNodes();
        HoteamUI.UIManager.Popup("QueryMachineAddLink", para, callback);

    }
}
//移除POM时移除对应的搜索规则
InforCenter_Platform_QueryMachine_POMGridRemoveRows = function (objectName, gridCtrl) {
    var newData = {};
    newData.Rows = [];
    var oldData = gridCtrl.SaveGridRowsByServerFormat();
    var rows = oldData.Rows;
    for (var i = 0; i < rows.length; i++) {
        for (var j = 0; j < rows[i].length; j++) {
            if (rows[i][j].ColName == "OBJECTTYPENAME" && rows[i][j].ColText != objectName) {
                newData.Rows.push(rows[i]);
            }
        }
    }
    gridCtrl.LoadGridRows(newData);
}
//双击树节点事件
InforCenter_Platform_QueryMachine_POMTreeOnDbClick = function (ctrlEvent) {
    var node = ctrlEvent.GetSelectedNode();
    var gridCtrl = ctrlEvent.OtherControl("QueryRoleGrid");
    var selectNode = ctrlEvent.GetSelectedNode();
    var parentNode = ctrlEvent.GetParentNode(selectNode);
    if (parentNode == null) {
        return false;
    } else {
        InforCenter_Platform_QueryMachine_POMGridOneRow(selectNode, gridCtrl, ctrlEvent, node);
    }
}

//为搜索规则添加一行数据
InforCenter_Platform_QueryMachine_POMGridOneRow = function (selectNodeData, gridCtrl, treeCtrl, selectNode) {
    var objectTypeName = "";
    var colText = "";
    var resultCellData = {};
    var parentNode = treeCtrl.GetParentNode(selectNode);
    if (parentNode) {
        objectTypeName = parentNode.Value1;
        colText = parentNode.Text.split('(')[0];
    }
    var ret = HoteamUI.DataService.Call("InforCenter.Platform.QueryMachineService.GetEditGridColDataByObjectName", { para: { ObjectTypeName: selectNode.Value5, ColName: selectNodeData.Value1, ObjectName: objectTypeName } });
    if (ret) {
        resultCellData = ret;
    }

    var data = {};
    data.OBJECTTYPENAME = { ColText: objectTypeName, Editable: false };
    data.COLNAME = { ColText: selectNodeData.Value1, Editable: false };
    data.COLTEXT = { ColText: selectNodeData.Text, Editable: true };
    data.COLTYPE = { ColText: selectNode.Value5, Editable: false };
    data.RESULTVALUE = resultCellData;
    gridCtrl.AddGridRow("last", true, data);
    if (ret.CellType == "datetime" || ret.CellType == "date") {
        gridCtrl.SetDataSource(gridCtrl.GetRowsCount(), "CONDITION", InforCenter_Platform_QueryMachine_GetDateTimeConditionDownColData());
    }
}

//添加POM树查询页面自定义获取数据方法
InforCenter_Platform_QueryMachineAddPOM_TreeQueryCommit = function (ctrlEvent) {
    var pageContainer = ctrlEvent.o.OtherControl("Btn_Container");
    var para = HoteamUI.Page.GetContainerPara(pageContainer.id);
    var treeCtrl = HoteamUI.Control.Instance(para.TreeGuid);
    var node = treeCtrl.GetSelectedNode();
    if (node) {
        HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), node.Value1);
    }
}

//规则权限控件点击事件
InforCenter_Platform_QueryMachine_OrganizationValueOnClick = function (ctrlEvent) {
    var callback = function (data, ret) {
        if (HoteamUI.Common.IsNullOrEmpty(ret)) {
            return;
        }
        var value = "";
        var text = "";
        for (var i = 0; i < ret.length; i++) {
            if (i == ret.length - 1) {
                value += ret[i].EID;
                text += ret[i].ENAME;
                continue;
            }
            value += ret[i].EID + ";";
            text += ret[i].ENAME + ";";
        }
        ctrlEvent.o.SetText(text);
        ctrlEvent.o.SetValue(value);
    }
    InforCenter_Platform_OrganizationSelecter(ctrlEvent.o.GetValue(), "GroupToRoleToUserAndRole", "SingleLevel_MultiSelect", callback, ctrlEvent.o.id);

}

//保存数据
InforCenter_Platform_QueryMachine_BtnCreate = function (ctrlEvent) {
    InforCenter_Platform_QueryMachine_BtnSaveData(ctrlEvent, "New");
}

//修改数据
InforCenter_Platform_QueryMachine_BtnUpdateSave = function (ctrlEvent) {
    InforCenter_Platform_QueryMachine_BtnSaveData(ctrlEvent, "Update");
}

//删除数据
InforCenter_Platform_QueryMachine_BtnDeleteSave = function (ctrlEvent) {
    var ctrl = ctrlEvent.o;
    var containerCtrl = HoteamUI.Page.Instance(ctrl.ContainerID());
    var pagePara = HoteamUI.Page.GetContainerPara(containerCtrl.pid);
    var leftTreeCtrl = HoteamUI.Control.Instance(pagePara.TreeGuid);
    var para = {};
    var selectNode = leftTreeCtrl.GetSelectedNode();
    if (selectNode && selectNode.Value1 != "RootNode") {
        para.QueryID = selectNode.Value1;
        var action = "DELETE";
        var actionType = "AUTO";
        var actionRet = InforCenter_Platform_EditListViewCtrl_ActionChecker(action, actionType, para.QueryID);
        if (!actionRet) {
            return false;
        }
        var callback = function (data, ret) {
            if (ret.confirm == "OK") {
                var ret = HoteamUI.DataService.Call("InforCenter.Platform.QueryMachineService.DeleteQueryMachine", {
                    para: data.delPara
                });
                if (ret) {
                    InforCenter_Platform_TreeViewCtrl_RefreshRootStructureAndTab(pagePara.TreeGuid);
                }
            }
        };
        //弹出提示框，是否要删除
        HoteamUI.UIManager.Popup(
                 "Confirm",
            {
                pageMode: "OkCancel",
                message: HoteamUI.Language.Lang("QueryMachine.DeteleText")
            },
        callback,
        {
            delPara: para

        }
         );

    }
}

//新建、编辑时进行保存数据
InforCenter_Platform_QueryMachine_BtnSaveData = function (ctrlEvent, type) {
    var ctrl = ctrlEvent.o;
    var containerCtrl = HoteamUI.Page.Instance(ctrl.ContainerID());
    var pagePara = HoteamUI.Page.GetContainerPara(containerCtrl.pid);
    var leftTreeCtrl = HoteamUI.Control.Instance(pagePara.TreeGuid);
    var selectID = "QUERYMACHINEBASEINFO_sssssssssssss01";//虚拟一个对象ID
    var action = "CREATE";
    var actionType = "AUTO";
    var para = {};
    para.Type = type;
    var selectNode = leftTreeCtrl.GetSelectedNode();
    if (selectNode) {
        para.ObjectID = selectNode.Value1;
        if (type == "Update") {
            selectID = selectNode.Value1;
            action = "EDIT";
            actionType = "AUTO";
        }
    }

    //获取基础信息
    var baseData = InforCenter_Platform_QueryMachine_GetBaseInfoData(ctrl);
    if (baseData == false) {
        return false;
    }
    if (baseData.ROOTPOM != baseData.DATALINKMODEL && baseData.FIELDKEY == "") {
        HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("QueryMachine.NoKeyWord"));
        return false;
    }
    para.BaseData = JSON.stringify(baseData);
    //获取POM信息和关联信息
    var pomAndLinkData = InforCenter_Platform_QueryMachine_GetPOMAndLinkData(ctrl);
    if (pomAndLinkData == false) {

        return false;
    }
    para.POMData = JSON.stringify(pomAndLinkData.POMData);
    para.LinkData = JSON.stringify(pomAndLinkData.LinkData);
    //获取搜索规则信息
    var queryRoleData = InforCenter_Platform_QueryMachine_GetQueryRoleData(ctrl);
    if (queryRoleData == false) {

        return false;
    }

    para.QueryRoleData = JSON.stringify(queryRoleData);

    //验证权限
    var actionRet = InforCenter_Platform_EditListViewCtrl_ActionChecker(action, actionType, selectID);
    if (!actionRet) {
        return false;
    }

    var ret = HoteamUI.DataService.Call("InforCenter.Platform.QueryMachineService.SaveQueryMachineData", { para: para });
    if (ret) {
        if (type == "Update") {
            InforCenter_Platform_TreeViewCtrl_RefreshParentStructureAndTab(pagePara.TreeGuid);
        }
        else {
            InforCenter_Platform_TreeViewCtrl_RefreshRootStructureAndTab(pagePara.TreeGuid);
        }
    }
}

//获取查询构建器基础字段信息
InforCenter_Platform_QueryMachine_GetBaseInfoData = function (ctrl) {
    var data = {};
    var bCheck = true;
    {
        var c = ctrl.OtherControl('ENAME_Value');
        if (c.id != '') {
            if (c.Check() == false) bCheck = false;
            data.ENAME = c.GetText().trim();
        }
    } {
        var c = ctrl.OtherControl('DESCRIPTION_Value');
        if (c.id != '') {
            if (c.Check() == false) bCheck = false;
            data.DESCRIPTION = c.GetText();
        }
    } {
        var c = ctrl.OtherControl('ROOTPOM_Value');
        if (c.id != '') {
            if (c.Check() == false) bCheck = false;
            data.ROOTPOM = c.GetValue();
        }
    } {
        var c = ctrl.OtherControl('DataLinkModel_Value');
        if (c.id != '') {
            if (c.Check() == false) bCheck = false;
            data.DATALINKMODEL = c.GetValue();
        }
    } {
        var c = ctrl.OtherControl('FIELDKEY_Value');
        if (c.id != '') {
            if (c.Check() == false) bCheck = false;
            data.FIELDKEY = c.GetSelectedValue();
        }
    } {
        var c = ctrl.OtherControl('ORGANIZATIONROLE_Value');
        if (c.id != '') {
            if (c.Check() == false) bCheck = false;
            data.ORGANIZATIONROLE = c.GetValue();
        }
    } {
        var c = ctrl.OtherControl('SHOWVIEW_Value');
        if (c.id != '') {
            if (c.Check() == false) bCheck = false;
            data.SHOWVIEW = c.GetValue();
        }
    }
    if (bCheck == false) {
        return false;
    } else {
        return data;
    }
}

//获取POM属性和关联属性数据
InforCenter_Platform_QueryMachine_GetPOMAndLinkData = function (ctrl) {
    var data = {};
    data.POMData = [];
    data.LinkData = [];
    var pomTreeCtrl = ctrl.OtherControl('POMAttributeTree');
    var allNode = pomTreeCtrl.GetTreeRootNodes();
    if (allNode && allNode.length > 0) {
        for (var i = 0; i < allNode.length; i++) {
            data.POMData.push(allNode[i].Value1);
            if (allNode[i].Tag.length > 0) {
                for (var j = 0; j < allNode[i].Tag.length; j++) {
                    if (allNode[i].Tag[j].Key == "LinkData") {
                        data.LinkData.push(allNode[i].Tag[j].Value);
                        break;
                    }
                }
            }
        }
    } else {
        return false;
    }
    return data;
}

//获取搜索规则数据
InforCenter_Platform_QueryMachine_GetQueryRoleData = function (ctrl) {
    var data = [];
    var queryRoleGridCtrl = ctrl.OtherControl('QueryRoleGrid');
    if (!queryRoleGridCtrl.SaveEditCell()) {
        return false;
    }
    //获取当前列表是否有校验未通过的数据
    if (queryRoleGridCtrl.GetRegexStatus() == false) {
        return false;
    }

    var rowData = queryRoleGridCtrl.SaveGridRows();
    if (rowData.success == true && rowData.rowsObject.length > 0) {
        for (var i = 0; i < rowData.rowsObject.length; i++) {
            var newRowData = {};
            newRowData.COLNAME = rowData.rowsObject[i].COLNAME;
            newRowData.COLTEXT = rowData.rowsObject[i].COLTEXT;
            newRowData.COLTYPE = rowData.rowsObject[i].COLTYPE;
            newRowData.CONDITION = rowData.rowsObject[i].CONDITION;
            newRowData.OBJECTTYPENAME = rowData.rowsObject[i].OBJECTTYPENAME;
            newRowData.OPERATETYPE = rowData.rowsObject[i].OPERATETYPE;
            newRowData.row_number = rowData.rowsObject[i].row_number;
            if (rowData.rowsObject[i].RESULTVALUE.value != undefined) {
                newRowData.RESULTVALUE = rowData.rowsObject[i].RESULTVALUE.value.toString();
            } else {
                newRowData.RESULTVALUE = rowData.rowsObject[i].RESULTVALUE.toString();
            }
            data.push(newRowData);
        }
    } else {
        HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("QueryMachine.NoQueryRule"));
        return false;
    }
    return data;
}

//搜索规则按钮事件
InforCenter_Platform_QueryMachine_QueryRoleMenuClick = function (ctrlEvent) {

    var gridCtrl = ctrlEvent.o.OtherControl("QueryRoleGrid");
    if (ctrlEvent.value == "Up" || ctrlEvent.value == "Down") {
        var selectRows = gridCtrl.GetSelectedRows();
        if (selectRows.length != 1) {
            HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("QueryMachine.SelectOneRows"));
        } else {
            if (ctrlEvent.value == "Up") {
                gridCtrl.MoveGridRow("before");
            } else {
                gridCtrl.MoveGridRow("after");
            }
        }
    } else if (ctrlEvent.value == "Delete") {
        var selectRows = gridCtrl.GetSelectedRows();
        if (selectRows.length == 0) {
            HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("QueryMachine.SelectRows"));
            return;
        }
        gridCtrl.DeleteGridRow();
    }
}

//获取操作类型下拉框
InforCenter_Platform_QueryMachine_GetOperateTypeDownColData = function (ctrlEvent) {
    var data = new Array();
    data.push({ Text: "AND", Value: "AND" });
    data.push({ Text: "OR", Value: "OR" });
    return data;
}

//获取条件下拉框
InforCenter_Platform_QueryMachine_GetConditionDownColData = function (ctrlEvent) {
    var data = new Array();
    data.push({ Text: "=", Value: "=" });
    data.push({ Text: "<", Value: "<" });
    data.push({ Text: "<=", Value: "<=" });
    data.push({ Text: ">", Value: ">" });
    data.push({ Text: ">=", Value: ">=" });
    data.push({ Text: "<>", Value: "<>" });
    data.push({ Text: "LIKE", Value: "LIKE" });
    data.push({ Text: "is null", Value: "is null" });
    data.push({ Text: "is not null", Value: "is not null" });
    return data;
}

InforCenter_Platform_QueryMachine_GetDateTimeConditionDownColData = function (ctrlEvent) {
    var data = new Array();
    data.push({ Text: "<", Value: "<" });
    data.push({ Text: "<=", Value: "<=" });
    data.push({ Text: ">", Value: ">" });
    data.push({ Text: ">=", Value: ">=" });
    data.push({ Text: "<>", Value: "<>" });
    return data;
}

InforCenter_InforCenter_QueryMachine_OperateTypeDownChange = function (ctrlEvent) {
    var value = ctrlEvent.value;
    var rowIndex = ctrlEvent.o.GetEditRowID();
    if (value == "is null" || value == "is not null") {
        ctrlEvent.o.SetCellEditable(rowIndex, "RESULTVALUE", false);
    }
    else {
        ctrlEvent.o.SetCellEditable(rowIndex, "RESULTVALUE", true);
    }
    ctrlEvent.o.SetCellContent(rowIndex, "RESULTVALUE", "", "", false);
}

InforCenter_InforCenter_QueryMachine_QueryStructureMoveForTree = function (para) {
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
                    var msg = (moveType == "UP") ? HoteamUI.Language.Lang("MenuItems", "AlreadyMoveToTop") : HoteamUI.Language.Lang("MenuItems", "AlreadyMoveToBottom");
                    HoteamUI.UIManager.MsgBox(msg, null, false);
                    return;
                }
                if (moveToNode.Value3 !== selectedNode.Value3) {
                    var msg = (moveType == "UP") ? HoteamUI.Language.Lang("MenuItems", "AlreadyMoveToTop") : HoteamUI.Language.Lang("MenuItems", "AlreadyMoveToBottom");
                    HoteamUI.UIManager.MsgBox(msg, null, false);
                    return;
                }
                if (selectedNode && moveToNode) {
                    var selectedNodeEid, moveToNodeEid, parentNodeEid, type;
                    selectedNodeEid = selectedNode.Value1;
                    moveToNodeEid = moveToNode.Value1;
                    var movePara = { Value1: selectedNodeEid, Value2: moveToNodeEid };
                    var result = HoteamUI.DataService.Call("InforCenter.Platform.QueryMachineService.MoveQueryMachineBaseInfo", { para: movePara });
                    if (result) {
                        return { confirm: "OK" };
                    }
                }
            }
        }
    }

}

//设置关联页面初始化页面
InforCenter_Platform_QueryMachine_AddLinkPageOnLoad = function (pageEvent) {
    
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    var currentNode = pagePara.SelectNode;
    var allNode = pagePara.TreeNode;
    var currentParentNode = pagePara.ParentNode;
    var pomClassItems = [];
    var attributeItems = [];
    var selectPomName = "";
    for (var i = 0; i < allNode.length; i++) {
        if (allNode[i].Value1 != currentParentNode.Value1) {
            pomClassItems.push({ Text: allNode[i].Text, Value: allNode[i].Value1 });
            if (allNode[i].Value4 == "RootPOM") {
                selectPomName = allNode[i].Value1;
            }
        }
    }
    if (pomClassItems.length > 0) {
        var pomClassDropCtrl = page.GetControl("POMClass_Value");
        pomClassDropCtrl.LoadItems(pomClassItems);
        if (selectPomName == "") {
            selectPomName = pomClassItems[0].Value;
        }
        pomClassDropCtrl.SetSelectedByValue(selectPomName);
    }
    var attributeNodeData = [];
    for (var i = 0; i < allNode.length; i++) {
        if (allNode[i].Value1 == selectPomName) {
            attributeNodeData = allNode[i].children;
            break;
        }
    }
    if (attributeNodeData.length > 0) {
        for (var i = 0; i < attributeNodeData.length; i++) {
            attributeItems.push({ Text: attributeNodeData[i].Text, Value: attributeNodeData[i].Value1 });
        }
        if (attributeItems.length > 0) {
            var attributeDropCtrl = page.GetControl("Attribute_Value");
            attributeDropCtrl.LoadItems(attributeItems);
        }
    }
}

//POM类改变事件
InforCenter_Platform_QueryMachine_AddLinkPOMClassChange = function (ctrlEvent) {
    var ctrl = ctrlEvent.o;
    var listCtrl = HoteamUI.Page.Instance(ctrl.ContainerID());
    var para = HoteamUI.Page.GetContainerPara(listCtrl.pid);
    var allNode = para.TreeNode;
    var value = ctrlEvent.o.GetSelectedValue();
    var attributeNodeData = [];
    var attributeItems = [];
    for (var i = 0; i < allNode.length; i++) {
        if (allNode[i].Value1 == value) {
            attributeNodeData = allNode[i].children;
            break;
        }
    }
    if (attributeNodeData.length > 0) {
        for (var i = 0; i < attributeNodeData.length; i++) {
            attributeItems.push({ Text: attributeNodeData[i].Text, Value: attributeNodeData[i].Value1 });
        }
        if (attributeItems.length > 0) {
            var attributeDropCtrl = ctrl.OtherControl("Attribute_Value");
            attributeDropCtrl.LoadItems(attributeItems);
        }
    }
}

//页面确定按钮事件
InforCenter_Platform_QueryMachine_AddLinkBtnClick = function (ctrlEvent) {
    var ctrl = ctrlEvent.o;
    var attributeDropCtrl = ctrl.OtherControl("Attribute_Value");
    var pomClassDropCtrl = ctrl.OtherControl("POMClass_Value");
    var bCheck = true;
    if (attributeDropCtrl.Check() == false) bCheck = false;
    if (pomClassDropCtrl.Check() == false) bCheck = false;
    if (bCheck == true) {
        var ret = {};
        ret.Text = pomClassDropCtrl.GetSelectedText().split('(')[0] + '.' + attributeDropCtrl.GetSelectedText()
        ret.Value = { BTypeName: pomClassDropCtrl.GetSelectedValue(), BColName: attributeDropCtrl.GetSelectedValue() }
        HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), ret);
    }
}
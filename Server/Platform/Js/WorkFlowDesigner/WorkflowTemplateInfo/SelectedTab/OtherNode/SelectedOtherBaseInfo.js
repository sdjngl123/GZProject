//其他节点基本信息OnCreate
InforCenter_Platform_SelectedOtherBaseInfo_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    //保存上一个页面的数据
    InforCenter_Platform_WorkflowTemplateEdit_SavePreviousPageData(page);

    var template = WebDesignerWorkflowInfo.Template;
    var currInfo = WebDesignerWorkflowInfo.CurrSelectInfo;
    if (!currInfo || !currInfo.NodeID || !template) {
        return;
    }
    var node = currInfo;
    //显示文本
    page.GetControl("ShowText_Value").SetText(node.NodeText);
    //节点图片
    page.GetControl("NodeImage_Value").SetText(node.ImagePath);

}

//其他节点基本信息OnGetData
InforCenter_Platform_SelectedOtherBaseInfo_OnGetData = function (pageEvent) {
    if (pageEvent.currSelectInfoIsNull) {
        return;
    }
    var page = pageEvent.o;
    WebDesignerWorkflowInfo.CurrSelectInfo.NodeText = page.GetControl("ShowText_Value").GetText();
    WebDesignerWorkflowInfo.CurrSelectInfo.ImagePath = page.GetControl("NodeImage_Value").GetText();
}

//更改节点图片
InforCenter_Platform_SelectedOtherBaseInfo_SelectedImageOnClick = function (ctrlEvent) {
    var callback = function (data, ret) {
        if (ret && ret.ReturnValue) {
            data.ctrl.SetText(ret.ReturnValue);
            data.ctrl.SetValue(ret.ReturnValue);
        }
    }
    HoteamUI.UIManager.Popup("WorkflowSelectImage", { ObjectType: "WORKFLOWTEMPLATE" }, callback, { ctrl: ctrlEvent.o },"520*280");
}


InforCenter_Platform_SelectedOtherBaseInfo_OnCheck = function (pageEvent) {
    var page = pageEvent.o;
    //验证页面控件
    var control = page.GetControl("Info_Container");
    if (control && control.id != "") {
        return control.Check();
    }
}
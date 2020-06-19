//业务节点基本信息OnCreate
InforCenter_Platform_SelectedBusinessBaseInfo_OnCreate = function (pageEvent) {
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

//业务节点基本信息OnGetData
InforCenter_Platform_SelectedBusinessBaseInfo_OnGetData = function (pageEvent) {
    if (pageEvent.currSelectInfoIsNull) {
        return;
    }
    var page = pageEvent.o;
    WebDesignerWorkflowInfo.CurrSelectInfo.NodeText = page.GetControl("ShowText_Value").GetText();
    WebDesignerWorkflowInfo.CurrSelectInfo.ImagePath = page.GetControl("NodeImage_Value").GetText();
}
InforCenter_Platform_SelectedBusinessBaseInfo_OnCheck = function (pageEvent) {
    var page = pageEvent.o;
    //验证页面控件
    var control = page.GetControl("Info_Container");
    if (control && control.id != "") {
        return control.Check();
    }
}
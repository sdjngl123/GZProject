//开始 2013-04-10 刘强 添加属性页面流程图显示
InforCenter_Platform_PropertyPageTemplate_OnCreate = function (pageEvent) {
    var para = pageEvent.o.GetPara();
    if (para.ObjectID) {
        var ctrl = pageEvent.o.GetControl('TemplateContainer');
        var pagename = 'FlowTemplateView';
        var pagePara = {}
        pagePara.ID = para.ObjectID;
        ctrl.LoadPage(pagename, pagePara);
    }
}
//结束
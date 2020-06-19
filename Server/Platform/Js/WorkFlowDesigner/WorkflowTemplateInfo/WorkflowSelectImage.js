//更改节点图片OnCreate
InforCenter_Platform_WorkflowSelectImage_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    var templateCtrl = page.GetControl("SelectImageContainer");
    var template = '<div id = "WebDesignerSelectImageTemplate" style="height:100%;overflow:auto;">'
    var imageList = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateService.GetWorkflowImageList", { para: { TemplateType: pagePara.ObjectType } });
    var imageItems = [];
    if (imageList && imageList.length > 0) {
        for (var i = 0; i < imageList.length; i++) {
            //19118 李金岳
            template += '<div id = "SelectImageTemplate' + i + '" class = "WebDesignerSelectImage" data-index="' + i + '">';

            template += '<img align="middle" width="16px" height="16px" src = "' + imageList[i].replace("~", PageInit.WebRootPath) + '"/>';
            template += '</div>';
            imageItems[i] = imageList[i].replace(/\\/g, '\\\\');
        }
    }
    template += '</div>';
    templateCtrl.AppendHtml(template);

    //19118 李金岳
    $("#WebDesignerSelectImageTemplate").on("click", '.WebDesignerSelectImage', function () {
        var $elem = $(this);
        var index = Number($elem.attr("data-index"));
        var o = {};
        o.ReturnValue = imageItems[index];
        HoteamUI.UIManager.Return(page.pid, o);
    });
}
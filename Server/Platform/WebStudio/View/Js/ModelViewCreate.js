//保存视图
InforCenter_Platform_ModelListViewInfo_ModelViewCreate_Save = function (ctrlEvent) {
    debugger;
    var pid = ctrlEvent.o.ContainerID();
    var page = HoteamUI.Page.Instance(pid);
    var pagePara = page.GetPara();
    //创建树对象
    var treeID = pagePara.TreeID;
   var rootNode= HoteamUI.Control.Instance(treeID).GetTreeRootNodes()[0];
    //模型名称
    var objType = rootNode.Value3;
    //视图名称
    var viewName = ctrlEvent.o.OtherControl("ViewName_Value").GetText();
    //视图类型
    var viewType = ctrlEvent.o.OtherControl("ViewType_Value").GetText();
   
    //调用创建视图的接口[思路：根据模型名称获取所有的属性并设置默认格式,组成前台Json格式传入保存视图的方法中]
    var servicePara = {
        ObjType: objType,
        ViewName: viewName,
        ViewType: viewType,
        UseBy:""
    };
    var result = HoteamUI.DataService.Call("Hoteam.InforCenter.WebStudioViewService.CreateModelWebView", {
        para: { ExtendJsonInfo: JSON.stringify(servicePara) }
    });
    InforCenter_Platform_TreeViewCtrl_RefreshRootStructure(treeID);
    HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), null);
}
//删除视图节点
InforCenter_Platform_ModelListViewInfo_ModelViewCreate_Delete = function (ctrlEvent) {
    
    var viewName = ctrlEvent[1].ViewName;
    var treeID = ctrlEvent[1].TreeID;
    var modelName = ctrlEvent[1].ModelName;
    if (viewName == "ROOTMODELVIEW") {
   
        HoteamUI.UIManager.Popup({
            pagename: "Confirm",
            paras: {
                pageMode: "OK",
                message: HoteamUI.Language.Lang("Platform.EmptySelectionException")
            }
        });
    }
    else {
        HoteamUI.UIManager.Popup({
            pagename: "Confirm",
            paras: {
                pageMode: "OkCancel",
                message: HoteamUI.Language.Lang("DeleteObject.Text")
            },
            callback: function (data, ret) {
                if (ret) {
                    if (ret.confirm == "OK") {
                        var result = HoteamUI.DataService.Call("Hoteam.InforCenter.WebStudioViewService.DeleteModelWebView", {
                            para: {
                                ExtendJsonInfo: JSON.stringify({
                                    ViewName: viewName
                                })
                            }
                        });
                        //刷新树级根节点和Tab页
                        InforCenter_Platform_TreeViewCtrl_RefreshRootStructureAndTab(treeID);
                    }
                }
            }
        });

       
    }
  
}
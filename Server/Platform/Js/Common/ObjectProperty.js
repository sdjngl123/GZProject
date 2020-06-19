InforCenter_Platform_ObjectProperty_OnCreate = function (pageEvent) {
    var para = pageEvent.o.GetPara();
    if (para.ObjectID) { 
    }
    else {
        if (para.TreeGuid) {
            var tree = HoteamUI.Control.Instance(para.TreeGuid);
            selectNode = tree.GetSelectedNode();
            if (selectNode != null) {
                para.ObjectID = selectNode.value1;
            }
        }
    }
    if (para.ObjectID) {
        var ctrl = pageEvent.o.GetControl('Info_Container');
        var ObjectType = para.ObjectID.split("_")[0];
        var pagename = ObjectType + "-VIEW";
        ctrl.LoadPage(pagename, para);
    }
}
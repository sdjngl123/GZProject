InforCenter_Platform_CopyObject_OnCreate = function (pageEvent) {
    var para = pageEvent.o.GetPara();
    if (para.SelectID) {
        var objectType = para.SelectID.split('_')[0];
        var ctrl = pageEvent.o.GetControl('Info_Container');
        var pagename = objectType + "-COPY";
        para.ObjectID = para.SelectID;
        para.ObjectType = objectType;
        ctrl.LoadPage(pagename, para);
        
        var pageContainer = pageEvent.o.GetControl('Btn_Container');
        HoteamUI.Page.SetContainerParas(pageContainer.id, "CopyObject", para);
    }
}
InforCenter_Platform_CopyObject_OnOK = function (ctrlEvent) {
    var ctrl = ctrlEvent.o.OtherControl('Info_Container');
    var data = InforCenter_Platform_Object_GetDataFromPage(ctrl.id);
    if (data != null) {
        var pageContainer = ctrlEvent.o.OtherControl('Btn_Container');
        para = HoteamUI.Page.GetContainerPara(pageContainer.id);
        if (para.initData) {
            var initData = para.initData;
            for (var key in initData) {
                if (!initData.hasOwnProperty(key)) {
                    continue;
                }
                var item = initData[key];
                var str = "data." + key + "=item";
                eval("(" + str + ")");
            }
        }
        data = $.extend(true, {}, para, data);
        data = InforCenter_Platform_Object_SaveObjectData(data, true, para);
        if (data != null) {
            HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), new Array(data));
        }
    }
}
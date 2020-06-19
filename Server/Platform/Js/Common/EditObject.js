InforCenter_Platform_EditObject_OnCreate = function (pageEvent) {
    var para = pageEvent.o.GetPara();
    var ctrl = pageEvent.o.GetControl('Info_Container');
    var ObjectID = para.SelectID;
    var ObjectType = ObjectID.split("_")[0];
    if (HoteamUI.Common.IsNullOrEmpty(para.ObjectType) == false) {
        ObjectType = para.ObjectType;
    }

    var pagename = ObjectType + "-EDIT";
    if (para.FormBuilder == "true") {
        var execPara = {
            pageType: "EDIT",
            objectID: ObjectID
        };
        var ret = HoteamUI.Common.ExeFunction("InforCenter_ModelGenerator_FormBuilder_GetPageName", execPara);
        if (ret) {
            pagename = pagename + "-" + ret;
        }
        para.ObjectType = ObjectType;
    }

    para.ObjectID = para.SelectID;
    ctrl.LoadPage(pagename, para);
    var pageContainer = pageEvent.o.GetControl('Btn_Container');
    HoteamUI.Page.SetContainerParas(pageContainer.id, "EditObject", para);
}
InforCenter_Platform_EditObject_OnOK = function (ctrlEvent) {
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
        data = InforCenter_Platform_Object_SaveObjectData(data, false, para);
        if (data != null) {
            HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), new Array(data));
        }
    }
}

InforCenter_Platform_EditObject_OpenEditPage = function (para) {
    if (para && para.length > 1) {
        var selectID = para[1].SelectID;
        var type = InforCenter_Platform_GTypeFromID(selectID);
        for (var i in para[1]) {
            if (!para[1].hasOwnProperty(i)) {
                continue;
            }
            if (type == i) {
                var func = para[1][i];
                delete para[1][i];
                HoteamUI.Common.ExeFunction(func, para);
            }
        }
    }
}
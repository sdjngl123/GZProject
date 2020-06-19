InforCenter_Platform_CreateObject_OnCreate = function (pageEvent) {
    var para = pageEvent.o.GetPara();
    var ctrl = pageEvent.o.GetControl('Info_Container');

    var pagename = para.ObjectType + "-CREATE";
    if (para.FormBuilder == "true") {
        //如果是表单则需要找到最新版本
        var exePara = {
            objType: para.ObjectType,
            pageType: 'CREATE'
        };
        var ret = HoteamUI.Common.ExeFunction("InforCenter_ModelGenerator_FormBuilder_GetCreatePageName", exePara);
        if (ret) {
            pagename = pagename + "-" + ret;
        }
    }

    ctrl.LoadPage(pagename, para);
    var pageContainer = pageEvent.o.GetControl('Btn_Container');
    HoteamUI.Page.SetContainerParas(pageContainer.id, "CreateObject", para);
}
InforCenter_Platform_CreateObject_OnOK = function (ctrlEvent) {
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
            data.IsClose = !para.IsLoopExec;
            HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), data);
        } else {
            //说明保存报错，页面会给出提示，不再处理
            return;
        }
        if (para.IsLoopExec) {
            var pagename = para.ObjectType + "-CREATE";
            ctrl.LoadPage(pagename, para);
        }
    }
}

InforCenter_Platform_CreateObject_OnCancel = function (ctrlEvent) {
    var ctrl = ctrlEvent.o.OtherControl('Info_Container');
    if (ctrl.id != '') {
        HoteamUI.Page.FirePageEvent(ctrl.id, "OnClose");
    }
    HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), null);
}

HoteamUI_PageEvent_FORMDATACREATEOnGetDataFromPage_after = function (pageEvent) {
    if (InforCenter_Platform_Object_Data) {
        var pagePara = pageEvent.o.GetPara();
        InforCenter_Platform_Object_Data.MODELTYPE = pagePara.ObjType;
    }
}

//保存时通过formbuilder接口获取动态子对象数据
InforCenter_Platform_SaveObject_GetChildFormData = function (pageEvent, data, formbuilderId) {
    InforCenter_Platform_Object_Data = null;
    var para = pageEvent.o.GetPara();
    var fbCtrl = pageEvent.o.GetControl('FormBuilderCtrl');
    var childDataArray = fbCtrl.getControlsValue();
    //正则验证
    if (childDataArray.verified === false) {
        return false;
    }
    childDataArray = childDataArray.data
    //多个从对象类型集合
    for (var i = 0; i < childDataArray.length; i++) {
        var curChildData = childDataArray[i];
        //当前从对象类型集合
        for (var j = 0; j < curChildData.length; j++) {
            var curChild = curChildData[j];
            var curType = curChild.ObjType;
            if (childDataArray.length == 1 && (curType == para.ObjectType || curType == para.ParentObjectType)) {
                for (var property in curChild) {
                    if (property == 'ObjType') continue;
                    data[property] = curChild[property];
                }
            } else {
                if (curType == para.ObjectType || curType == para.ParentObjectType) {
                    if (!data[curType]) data[curType] = {};
                    for (var property in curChild) {
                        if (property == 'ObjType') continue;
                        data[curType][property] = curChild[property];
                    }
                } else {
                    if (!data[curType]) data[curType] = [];
                    var tempObj = {};
                    //遍历当前对象属性
                    for (var property in curChild) {
                        if (property == 'ObjType') continue;
                        tempObj[property] = curChild[property];
                    }
                    data[curType].push(tempObj);
                }
            }
        }
    }
    var objCount = 0;
    data['FORMBUILDERID'] = formbuilderId;
    var mainType = '';
    for (var i in data) {
        if (i == 'CommonTool' || i == 'ObjectType') {
            continue;
        }
        if (data[i] != null && typeof data[i] == 'object') {
            //主对象
            if (i == data['ObjectType']) {
                data[i]['ObjectType'] = data['ObjectType'];
            }
            data[i]['FORMBUILDERID'] = formbuilderId;
            objCount++;
        }
    }
    if (objCount == 1) {
        data = data[data['ObjectType']];
    }
    return true;
}
//初始化时 传过去的数据要保证EID一直存在
//保存数据 获取数据时要formbuilder把开始的EID传回来

//转换单个主对象及从对象
InforCenter_Platform_InitData_Transition = function (data, formBuilderId) {
    var retData = {};
    var childFirstCtrlIds = {};
    if (!HoteamUI.Common.IsNullOrEmpty(formBuilderId)) {
        var fbData = InforCenter_Platform_Object_GetObjectData(formBuilderId, null);
        if (fbData && !HoteamUI.Common.IsNullOrEmpty(fbData.ASSISTANTGID)) {
            childFirstCtrlIds = JSON.parse(fbData.ASSISTANTGID);
        }
    }
    for (var objType in data) {
        var item = data[objType];
        if (objType != 'mainObjType') {
            if (isArray(item)) {
                if (!retData.children) {
                    retData.children = [];
                }
                var curChildData = {};
                curChildData.option = {};
                curChildData.option['ChildObjType'] = objType;
                curChildData.option['StartPosition'] = childFirstCtrlIds[objType];
                if (item.length && item.length > 0) {
                    curChildData.line = [];
                    //从对象集合
                    for (var childIndex in item) {
                        var childList = item[childIndex];
                        if (typeof childList != 'object') {
                            childList = JSON.parse(childList);
                        }
                        var tempChildObj = {};
                        for (var child in childList) {
                            tempChildObj[child] = childList[child];
                        }
                        curChildData.line.push(tempChildObj);
                    }
                }
                retData.children.push(curChildData);
            } else if (typeof item == 'object') {
                retData['ObjType'] = objType;
                //主对象
                for (var property in item) {
                    retData[property] = item[property];
                }
            }
        }
    }
    //InforCenter_Platform_Object_GetControlPermissionData
    return retData;
}

function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}


InforCenter_Platform_CustomForm_Export = function (para) {
    if (!HoteamUI.Common.IsNullOrEmpty(para[1].ObjectID)) {
        InforCenter_Platform_CustomForm_ExportByObjectId(para[1].ObjectID, para[1].ObjectData)
    }
}

InforCenter_Platform_CustomForm_ExportByObjectId = function (objectID, objectData) {
    if (!HoteamUI.Common.IsNullOrEmpty(objectID)) {
        var execPara = {
            pageType: "VIEW",
            objectID: objectID
        };
        var ret = HoteamUI.Common.ExeFunction("InforCenter_ModelGenerator_FormBuilder_GetPageName", execPara);
        if (ret) {
            var objType = InforCenter_Platform_GTypeFromID(objectID);
            var pagename = objType + "-VIEW";
            pagename = pagename + "-" + ret;
            var pageConfig = HoteamUI.UIManager.GetPageConfig(pagename);
            if (pageConfig) {
                var fbCtrl = null;
                for (var i = 0; i < pageConfig.PageControls.length; i++) {
                    var ctrl = pageConfig.PageControls[i];
                    if (ctrl.ControlID == "FormBuilderCtrl") {
                        fbCtrl = ctrl;
                        break;
                    }
                }
                if (fbCtrl) {
                    var option = {};
                    option.handlers = {};
                    option.ctrlEvent = {};
                    option.ObjectID = objectID;
                    option.controlInfo = fbCtrl;
                    option.controlInfo.pagename = option.pagename = pagename;
                    option.pageconfig = pageConfig;
                    option.ctrlEvent.ObjData = objectData;
                    option.ctrlEvent.export = true;
                    option.ctrlEvent.ObjectID = option.ObjectID;
                    for (var i = 0; i < fbCtrl.PageHandlers.length; i++) {
                        var curHandler = fbCtrl.PageHandlers[i];
                        option.handlers[curHandler.HandlerName] = curHandler.Script;
                    }
                    for (var i = 0; i < fbCtrl.Settings.length; i++) {
                        var curSetting = fbCtrl.Settings[i];
                        option[curSetting.Key] = curSetting.Value;
                    }
                    var formData = $.hoteamFormBuilder.export(option);
                    formData[0].table.printdirection = formData[0].table["print-direction"];
                    formData[0].table.printsize = formData[0].table["print-size"];
                    var wcf = "InforCenter.Platform.ModelGeneratorService.ExportFromFormData";
                    PlatformUI.UIManager.ExportFile.Call(wcf, { Data: JSON.stringify(formData), PageSize: 'A4' }, { filetype: "Excel" }, function () { });
                    PlatformUI.UIManager.ExportPdfFile.Call(wcf, { Data: JSON.stringify(formData), PageSize: 'A4'  }, { filetype: "Excel" }, function () { });
                }
            }
        }
    }
}




InforCenter_Platform_FormBuilder_PrintForm = function (para) {
    var objectID = para[1].ObjectID;
    var objectData = para[1].ObjectData;
    if (!HoteamUI.Common.IsNullOrEmpty(objectID)) {
        var execPara = {
            pageType: "VIEW",
            objectID: objectID
        };
        var ret = HoteamUI.Common.ExeFunction("InforCenter_ModelGenerator_FormBuilder_GetPageName", execPara);
        if (ret) {
            var objType = InforCenter_Platform_GTypeFromID(objectID);
            var pagename = objType + "-VIEW";
            pagename = pagename + "-" + ret;
            var pageConfig = HoteamUI.UIManager.GetPageConfig(pagename);
            if (pageConfig) {
                var fbCtrl = null;
                for (var i = 0; i < pageConfig.PageControls.length; i++) {
                    var ctrl = pageConfig.PageControls[i];
                    if (ctrl.ControlID == "FormBuilderCtrl") {
                        fbCtrl = ctrl;
                        break;
                    }
                }
                if (fbCtrl) {
                    var option = {};
                    option.handlers = {};
                    option.ctrlEvent = {};
                    option.ObjectID = objectID;
                    option.controlInfo = fbCtrl;
                    option.controlInfo.pagename = option.pagename = pagename;
                    option.pageconfig = pageConfig;
                    option.ctrlEvent.ObjData = objectData;
                    option.ctrlEvent.export = true;
                    option.ctrlEvent.ObjectID = option.ObjectID;
                    for (var i = 0; i < fbCtrl.PageHandlers.length; i++) {
                        var curHandler = fbCtrl.PageHandlers[i];
                        option.handlers[curHandler.HandlerName] = curHandler.Script;
                    }
                    for (var i = 0; i < fbCtrl.Settings.length; i++) {
                        var curSetting = fbCtrl.Settings[i];
                        option[curSetting.Key] = curSetting.Value;
                    }
                    var formData = $.hoteamFormBuilder.export(option);
                    formData[0].table.printdirection = formData[0].table["print-direction"];
                    formData[0].table.printsize = formData[0].table["print-size"];
                    var callAjaxParams = {};
                    var paras = {};
                    paras.Path = "InforCenter.Platform.ModelGeneratorService.ExportFromFormData";
                    paras.Paras = JSON.stringify({ Data: JSON.stringify(formData), PageSize: 'A4' });
                    paras.FileType = "Excel";
                    callAjaxParams.paras = { para: paras };
                    callAjaxParams.servicepath = PlatformUI.WebServicePath;
                    callAjaxParams.method = "PrintFile";
                    callAjaxParams.callback = function (ret, para) {
                    };
                    callAjaxParams.paras = { para: paras };
                    callAjaxParams.errorCallback = function () {
                    };
                    HoteamUI.CallAjax.AsyncCall(callAjaxParams);
                }
            }
        }
    }
}


InforCenter_Platform_FormBuilder_GetAddRowsDataId = function (ctrlEvent, formBuilderId) {
    var returnData = "";
    if (ctrlEvent.ObjectID) {
        returnData = ctrlEvent.ObjectID ? ctrlEvent.ObjectID + "|" + formBuilderId : "|" + formBuilderId;
    } else {
        var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
        var pagePara = page.GetPara();
        returnData = pagePara.ObjectID ? pagePara.ObjectID + "|" + formBuilderId : "|" + formBuilderId;
    }
    return returnData;
};
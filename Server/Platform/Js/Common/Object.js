//获取对象信息,编辑对象时使用
InforCenter_Platform_Object_GetObjectData = function (id, para) {
    if (HoteamUI.Common.IsNullOrEmpty(para)) {
        para = {};
    }
    var service = "InforCenter.Common.ObjectService.GetObjectData";
    if (HoteamUI.Common.IsNullOrEmpty(para.InitService) == false) {
        service = para.InitService;
    }

    para.ObjectID = id;
    var data = HoteamUI.DataService.Call(service, { para: para });
    var ret = JSON.parse(data)
    return ret;
}
//获取对象初始化信息,新建对象时使用
InforCenter_Platform_Object_GetObjectInitData = function (type, para) {
    if (HoteamUI.Common.IsNullOrEmpty(para)) {
        para = {};
    }
    var service = "InforCenter.Common.ObjectService.GetObjectInitData";
    if (HoteamUI.Common.IsNullOrEmpty(para.InitService) == false) {
        service = para.InitService;
    }
    para.ObjectType = type;
    var data = HoteamUI.DataService.Call(service, { para: para });
    var ret = JSON.parse(data)
    return ret;
}

InforCenter_Platform_Object_GetForeignKeyObjectInitData = function (type, para) {
    if (HoteamUI.Common.IsNullOrEmpty(para)) {
        para = {};
    }
    var service = "InforCenter.Common.ObjectService.GetForeignKeyObjectInitData";
    if (HoteamUI.Common.IsNullOrEmpty(para.InitService) == false) {
        service = para.InitService;
    }
    para.ObjectType = type;
    var data = HoteamUI.DataService.Call(service, { para: para });
    var ret = JSON.parse(data)
    return ret;
}

InforCenter_Platform_Object_GetForeignKeyObjectData = function (id, para) {
    if (HoteamUI.Common.IsNullOrEmpty(para)) {
        para = {};
    }
    var service = "InforCenter.Common.ObjectService.GetForeignKeyObject";
    if (HoteamUI.Common.IsNullOrEmpty(para.InitService) == false) {
        service = para.InitService;
    }

    para.ObjectID = id;
    var data = HoteamUI.DataService.Call(service, { para: para });
    var ret = JSON.parse(data)
    return ret;
}

InforCenter_Platform_Object_GetControlPermissionData = function (type, para) {
    if (HoteamUI.Common.IsNullOrEmpty(para)) {
        para = {};
    }
    var service = "InforCenter.Common.ObjectService.GetControlPermissionByObjType";
    if (HoteamUI.Common.IsNullOrEmpty(para.PermissionService) == false) {
        service = para.PermissionService;
    }
    para.ObjectType = type;
    var data = HoteamUI.DataService.Call(service, { para: para });
    var ret = null;
    if (data) {
        ret = JSON.parse(data);
    }
    return ret;
}

//从编辑或新建界面上获取对象信息
var InforCenter_Platform_Object_Data = null;
InforCenter_Platform_Object_SaveCheck = true;
InforCenter_Platform_Object_GetDataFromPage = function (pid) {
    var data = null;
    InforCenter_Platform_Object_SaveCheck = true;
    HoteamUI.Page.FirePageEvent(pid, "OnSaveCheck");
    if (InforCenter_Platform_Object_SaveCheck) {
        InforCenter_Platform_Object_Data = null;
        HoteamUI.Page.FirePageEvent(pid, "OnGetDataFromPage");
        data = InforCenter_Platform_Object_Data;
        InforCenter_Platform_Object_Data = null;
    }
    return data;
}
//保存对象信息,newobj 标示是否为新增对象
InforCenter_Platform_Object_SaveObjectData = function (data, newobj, para) {
    var sdata = JSON.stringify(data);
    //var service = "InforCenter.Common.ObjectService.SaveObjectData";
    var service = "InforCenter.Common.ObjectService.SaveFkObjectData";
    if (HoteamUI.Common.IsNullOrEmpty(para.SaveService) == false) {
        service = para.SaveService;
    }
    var para = { NewObject: newobj, Data: sdata, ObjectID: data.ObjectID, ObjectType: data.ObjectType };
    var data = HoteamUI.DataService.Call(service, { para: para });
    var ret = JSON.parse(data)
    return ret;
}

//通用数据保存处理，通过传入json数据自动更新对象
InforCenter_Platform_Object_CommonSaveData = function (data) {
    var sdata = JSON.stringify(data);
    var service = "InforCenter.Common.ObjectService.CommonSaveData";
    var para = { Data: sdata };
    var ret = HoteamUI.DataService.Call(service, { para: para });
    return ret;
}

var InforCenter_Platform_Object_NewGuidList = new Array();
//创建GuidList
InforCenter_Platform_Object_GetNewGuid = function (para) {
    if (InforCenter_Platform_Object_NewGuidList.length == 0) {
        var service = "InforCenter.Common.ObjectService.CreateGuidList";
        var para = { Data: 1000 }
        var ret = HoteamUI.DataService.Call(service, { para: para });
        InforCenter_Platform_Object_NewGuidList = JSON.parse(ret);
    }
    var guid = InforCenter_Platform_Object_NewGuidList[0];
    InforCenter_Platform_Object_NewGuidList.splice(0, 1);
    return guid;
}

//通用数据对象检查，根据cmdsql进行检查处理并返回结果和信息
//CommandName验证脚本名称、ConditionStr验证脚本条件、
//SucessMsgDic成功提示信息、FailMsgDic失败提示信息
//IsSucessConfirm成功是否弹窗询问、IsFailConfirm失败是否弹窗询问
//IsFailContinue 不询问的话失败是否继续
InforCenter_Platform_Object_CustomCmdsqlCheck = function (para) {
    var sucessMsgDic = "";
    var failMsgDic = "";
    if (para[1].SucessMsgDic != null) {
        sucessMsgDic = HoteamUI.Language.Lang(para[1].SucessMsgDic);
    }
    if (para[1].FailMsgDic != null) {
        failMsgDic = HoteamUI.Language.Lang(para[1].FailMsgDic);
    }
    //弹窗提示信息 回调
    var confirmCallback = function (data, ret) {
        if (ret) {
            if (ret.confirm == "OK") {
                //确定继续，取消不继续
                InforCenter_Platform_MenuCtrl_InnerReceiveServerData(para[0], { confirm: "OK" });
            } else {
                InforCenter_Platform_MenuCtrl_InnerReceiveServerData(para[0], { confirm: "Cancel" });
            }
        }
    }

    //组织返回数据信息
    var ret = HoteamUI.DataService.Call("InforCenter.Common.WebActionService.CustomCmdsqlCheck", {
        para: {
            ConditionStr: para[1].ConditionStr,
            ConditionStr1: para[1].ConditionStr1,
            ConditionStr2: para[1].ConditionStr2,
            CommandName: para[1].CommandName
        }
    });
    var retData = JSON.parse(ret);
    var msgReturn = "";
    for (var i = 0; i < retData.length; i++) {
        var keys = Object.keys(retData[i]);
        for (var j = 0; j < keys.length; j++) {
            var key = keys[j];
            if (key != "RESULT") {
                msgReturn += retData[i][key];
                if (j != keys.length - 1) {
                    msgReturn += "/";
                }
            }
        }
        if (i != retData.length - 1) {
            msgReturn += ",";
        }
    }
    //是否询问

    if (retData[0].RESULT.toUpperCase() == "TRUE") {
        //成功是否询问
        if (para[1].IsSucessConfirm == "1" && !HoteamUI.Common.IsNullOrEmpty(sucessMsgDic)) {
            HoteamUI.UIManager.Popup("Confirm", { pageMode: "OkCancel", message: HoteamUI.Common.Format(sucessMsgDic, msgReturn) }, confirmCallback, {}, para[1].Size);
        } else {
            InforCenter_Platform_MenuCtrl_InnerReceiveServerData(para[0], { confirm: "OK" });
        }
    } else {
        //失败是否询问
        if (para[1].IsFailConfirm == "1" && !HoteamUI.Common.IsNullOrEmpty(failMsgDic)) {
            HoteamUI.UIManager.Popup("Confirm", { pageMode: "OkCancel", message: HoteamUI.Common.Format(failMsgDic, msgReturn) }, confirmCallback, {}, para[1].Size);
        } else {
            //失败是否继续执行后续操作
            if (para[1].IsFailContinue == "1") {
                InforCenter_Platform_MenuCtrl_InnerReceiveServerData(para[0], { confirm: "OK" });
            } else {
                HoteamUI.UIManager.MsgBox(HoteamUI.Common.Format(failMsgDic, msgReturn));
                InforCenter_Platform_MenuCtrl_InnerReceiveServerData(para[0], { confirm: "Cancel" });
            }
        }
    }
}

//根据传入的cmdsql数据查询，并返回结果，查询sql有固定格式 CONTENTSTR、CONDITIONSTR
InforCenter_Platform_Object_CommonGetDataByCmdSql = function (data) {
    var sdata = JSON.stringify(data);
    var service = "InforCenter.Common.ObjectService.CommonGetDataByCmdSql";
    var para = { Data: sdata };
    var ret = HoteamUI.DataService.Call(service, { para: para });
    return ret;
}

//根据传入Filter查询对象数据
InforCenter_Platform_Object_CommonGetObjectDataByFilter = function (data) {
    var sdata = JSON.stringify(data);
    var service = "InforCenter.Common.ObjectService.CommonGetObjectDataByFilter";
    var para = { Data: sdata };
    var ret = HoteamUI.DataService.Call(service, { para: para });
    return ret;
}


//检查对象某个属性数据是否为空，为空时，禁止对象编辑
InforCenter_Platform_Object_CheckNotNullAndDisable = function (pageEvent, data, infoname, hasInfoDataSource) {
    if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
        {
            pageEvent.o.GetControl(infoname + '_Value').Disable();
        }
    }
}
//对象属性执行InfoDataSource
InforCenter_Platform_Object_GetValueFromTextValueCtrl = function (value) {
    var ret = "";
    if (HoteamUI.Common.IsNullOrEmpty(value) == false) {
        var data = JSON.parse(value);
        if (data != null) {
            //  for (var v in data) {
            for (var i = 0; i < data.length; i++) {
                if (HoteamUI.Common.IsNullOrEmpty(data[i].Value) == false) {
                    ret += ";" + data[i].Value;
                }
            }
            if (HoteamUI.Common.IsNullOrEmpty(ret) == false) {
                ret = ret.substring(1);
            }
        }
    }
    return ret;
}
//对象属性执行InfoDataSource
InforCenter_Platform_Object_ExecInfoDataSource = function (flagname, objtype, infoname, pid, value, showwhenquery) {
    var para = { para: { FlagName: flagname, ObjectType: objtype, InfoName: infoname, PID: pid, Value: value, ShowWhenQuery: !!showwhenquery } };
    HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "ExecInfoDataSource", para);
}
//对象属性执行InfoDataSource，弹出对话框
InforCenter_Platform_Object_InfoDataSourceDialog = function (pagepara) {
    var callback = function (data, ret) {
        if (HoteamUI.Common.IsNullOrEmpty(ret) == false) {
            var pid = data.PID;
            var para = $.extend({}, data);
            para.data = ret;
            HoteamUI.Page.FirePageEvent(pid, "OnSetInfoDataSource", para, pageconfig);
        }
    }
    var pageconfig = HoteamUI.Page.Instance(HoteamUI.Control.Instance(pagepara.PID).ContainerID()).GetPara().PageConfig;
    var data = pagepara;
    var para = JSON.parse(pagepara.sPara);
    para.pagename = pagepara.PageName;
    para.callback = callback;
    para.data = data;
    para.paras = JSON.parse(pagepara.sPara);
    HoteamUI.UIManager.Popup(para);
}
//拼接查询字符串
InforCenter_Platform_Object_GetQueryFilter = function (andor, column, operator, value, unquoted) {
    var returnValue = '';
    if (HoteamUI.Common.IsNullOrEmpty(value) == false) {
        value = value.toString();
        if (HoteamUI.Security.LoginPara.Connect != "ORACLE") {
            value = value.replace(/[[]/g, "[[]");
        }
        value = value.replace(/'/g, "''");
        if (operator == "LIKE" || operator == "NOT LIKE") {
            value = "%%" + value + "%%";
        }

        //增加S-LIKE的处理
        if (operator == "S-LIKE") {
            var tempValue = '';
            //or条件拆分
            var valueList = value.trim().split(' ');
            if (valueList != null && valueList.length > 0) {
                var tempOrValue = '';
                for (var i = 0; i < valueList.length; i++) {
                    var tempAndValue = '';
                    //and条件拆分
                    var valueListAnd = valueList[i].split('+');
                    if (valueListAnd != null && valueListAnd.length > 0) {
                        if (valueListAnd.length == 1) {
                            if (valueListAnd[0].trim() != '') {
                                tempAndValue += " " + column + " LIKE N'%" + valueListAnd[0] + "%' ";
                            }
                        }
                        else {
                            //多个and条件拼接
                            for (var j = 0; j < valueListAnd.length; j++) {
                                if (valueListAnd[j].trim() != '') {
                                    tempAndValue += " AND " + column + " LIKE N'%" + valueListAnd[j] + "%' ";
                                }
                            }
                            if (tempAndValue.length > 0) {
                                tempAndValue = " ( " + tempAndValue.substring(4) + " )";
                            }
                        }
                    }
                    if (tempAndValue.length > 0) {
                        //各个or条件拼接
                        tempOrValue += " OR " + tempAndValue;
                    }
                }
                if (tempOrValue.length > 0) {
                    tempOrValue = " (" + tempOrValue.substring(3) + " )";
                    returnValue = " " + andor + "  " + tempOrValue;
                }
            }
        }
        else if (operator == "C-LIKE") {
            var tempAndValue = '';
            var valueList = value.trim().split(';');
            if (valueList != null && valueList.length > 0) {
                if (valueList.length == 1) {
                    if (valueList[0].trim() != '') {
                        tempAndValue += " " + column + " LIKE N'%" + valueList[0] + "%' ";
                    }
                }
                else {
                    for (var j = 0; j < valueList.length; j++) {
                        if (valueList[j].trim() != '') {
                            tempAndValue += " AND " + column + " LIKE N'%" + valueList[j] + "%' ";
                        }
                    }
                    if (tempAndValue.length > 0) {
                        tempAndValue = " ( " + tempAndValue.substring(4) + " )";
                    }
                }
            }

            if (tempAndValue.length > 0) {
                returnValue = " " + andor + "  " + tempAndValue;
            }
        }
        else if (unquoted) {
            returnValue = " " + andor + "  " + column + " " + operator + " " + value + " ";
        }
        else {
            returnValue = " " + andor + "  " + column + " " + operator + " N'" + value + "' ";
        }
    }
    return returnValue;
}

//处理编辑多语言，用于支持多语言编辑属性
InforCenter_Platform_Object_OnEditMutilLanguage = function (ctrlEvent) {
    var callback = function (data, ret) {
        if (ret != null) {
            var o = HoteamUI.Control.Instance(data.id);
            o.SetText(ret.MutilLangText);
            o.SetValue(ret.MutilLangValue);
        }
    }
    HoteamUI.UIManager.Popup("MutilLangInput", { MutilLangValue: ctrlEvent.o.GetValue() }, callback, { id: ctrlEvent.o.id });
}

//处理选择用户，用于支持单一用户属性
InforCenter_Platform_Object_OnEditSingleUserValue = function (ctrlEvent) {
    var objectType = ctrlEvent.objectType;
    var infoType = ctrlEvent.infoName;
    var functionName = "InforCenter_" + objectType + "_" + infoType + "_SingleUserValueOnClick";

    //如果定义了自定义方法 执行自定义点击事件
    if (window[functionName] && typeof window[functionName] == "function") {
        HoteamUI.Common.ExeFunction(functionName, ctrlEvent);
    } else {
        var callback = function (data, ret) {
            var o = HoteamUI.Control.Instance(data.id);
            if (ret != null && ret.length > 0) {
                o.SetText(ret[0].ENAME);
                o.SetValue(ret[0].EID);
            }
        }
        HoteamUI.UIManager.Popup("TreeCommonQuery", { Value: ctrlEvent.o.GetValue(), ItemName: "GroupToRoleToUser", AllQuery: true }, callback, { id: ctrlEvent.o.id }, "400*500");
    }

}
//处理选择用户，用于支持多用户用户属性
InforCenter_Platform_Object_OnEditMutliUserValue = function (ctrlEvent) {
    var callback = function (data, ret) {
        var o = HoteamUI.Control.Instance(data.id);
        if (ret != null && ret.length > 0) {
            var value = "";
            var text = "";
            // for (var i in ret) {
            for (var i = 0; i < ret.length; i++) {
                text = text + ";" + ret[i].ENAME;
                value = value + ";" + ret[i].EID;
            }
            if (HoteamUI.Common.IsNullOrEmpty(text) == false) {
                text = text.substring(1);
                value = value.substring(1);
            }
            o.SetText(text);
            o.SetValue(value);
        }
    }
    HoteamUI.UIManager.Popup("TreeCommonQuery", { Value: ctrlEvent.o.GetValue(), ItemName: "GroupToRoleToUser", LoadAndSelectType: "SingleLevel_MultiSelect", AllQuery: true }, callback, { id: ctrlEvent.o.id }, "700*500");
}

//处理选择用户，用于支持多用户用户属性 忽略集团
InforCenter_Platform_Object_OnEditMultiUserValueIgnoreCompany = function (ctrlEvent) {
    var callback = function (data, ret) {
        var o = HoteamUI.Control.Instance(data.id);
        if (ret != null && ret.length > 0) {
            var value = "";
            var text = "";
            // for (var i in ret) {
            for (var i = 0; i < ret.length; i++) {
                text = text + ";" + ret[i].ENAME;
                value = value + ";" + ret[i].EID;
            }
            if (HoteamUI.Common.IsNullOrEmpty(text) == false) {
                text = text.substring(1);
                value = value.substring(1);
            }
            o.SetText(text);
            o.SetValue(value);
        }
    }
    HoteamUI.UIManager.Popup("TreeCommonQuery", { Value: ctrlEvent.o.GetValue(), ItemName: "GroupToRoleToUserIgnoreCompanyID", LoadAndSelectType: "SingleLevel_MultiSelect" }, callback, { id: ctrlEvent.o.id }, "700*500");
}

//处理选择组，用于支持单一组属性
InforCenter_Platform_Object_OnEditSingleGroupValue = function (ctrlEvent) {
    var objectType = ctrlEvent.objectType;
    var infoType = ctrlEvent.infoName;
    var functionName = "InforCenter_" + objectType + "_" + infoType + "_SingleGroupValueOnClick";

    //如果定义了自定义方法 执行自定义点击事件
    if (window[functionName] && typeof window[functionName] == "function") {
        HoteamUI.Common.ExeFunction(functionName, ctrlEvent);
    } else {
        var callback = function (data, ret) {
            var o = HoteamUI.Control.Instance(data.id);
            if (ret != null && ret.length > 0) {
                o.SetText(ret[0].ENAME);
                o.SetValue(ret[0].EID);
            }
        }
        HoteamUI.UIManager.Popup("TreeCommonQuery", { Value: ctrlEvent.o.GetValue(), ItemName: "GroupToGroup" }, callback, { id: ctrlEvent.o.id }, "400*500");
    }
}

InforCenter_Platform_Object_SingleUserAutoComboxValueOnCreate = function (o, objtype, infoname, fillEmpty, data) {
    var functionName = "InforCenter_" + objtype + "_" + infoname + "_SingleUserAutoComboxValueOnCreate";
    if (window[functionName] && typeof window[functionName] == "function") {
        HoteamUI.Common.ExeFunction(functionName, ctrlEvent);
    } else {
        HoteamUI.DataService.AsyncCall({
            serviceuri: "InforCenter.Organization.OrganizationDataService.GetUserDropdownList",
            paras: {
                para: { ExtendJsonInfo: JSON.stringify({ FillEmpty: fillEmpty }) }
            },
            callback: function (ret) {
                if (ret) {
                    o.LoadItems(ret);
                    o.SetSelectedByValue(data);
                }
            }
        });
    }

}

InforCenter_Platform_Object_SingleRoleAutoComboxValueOnCreate = function (o, objtype, infoname, fillEmpty, data) {
    var functionName = "InforCenter_" + objtype + "_" + infoname + "_SingleRoleAutoComboxValueOnCreate";
    if (window[functionName] && typeof window[functionName] == "function") {
        HoteamUI.Common.ExeFunction(functionName, ctrlEvent);
    } else {
        HoteamUI.DataService.AsyncCall({
            serviceuri: "InforCenter.Organization.OrganizationDataService.GetRoleDropdownList",
            paras: {
                para: { ExtendJsonInfo: JSON.stringify({ FillEmpty: fillEmpty }) }
            },
            callback: function (ret) {
                if (ret) {
                    o.LoadItems(ret);
                    o.SetSelectedByValue(data);
                }
            }
        });
    }
}

InforCenter_Platform_Object_SingleGroupAutoComboxValueOnCreate = function (o, objtype, infoname, fillEmpty, data) {
    var functionName = "InforCenter_" + objtype + "_" + infoname + "_SingleGroupAutoComboxValueOnCreate";
    if (window[functionName] && typeof window[functionName] == "function") {
        HoteamUI.Common.ExeFunction(functionName, ctrlEvent);
    } else {
        HoteamUI.DataService.AsyncCall({
            serviceuri: "InforCenter.Organization.OrganizationDataService.GetGroupDropdownList",
            paras: {
                para: { ExtendJsonInfo: JSON.stringify({ FillEmpty: fillEmpty }) }
            },
            callback: function (ret) {
                if (ret) {
                    o.LoadItems(ret);
                    o.SetSelectedByValue(data);
                }
            }
        });
    }
}

InforCenter_Platform_GenerateScript_SingleUserAutoComboxValueOnChange = function (ctrlEvent) {
    var objectType = ctrlEvent.objectType;
    var infoType = ctrlEvent.infoName;
    var functionName = "InforCenter_" + objectType + "_" + infoType + "_SingleUserAutoComboxValueOnChange";
    HoteamUI.Common.ExeFunction(functionName, ctrlEvent);
}

InforCenter_Platform_GenerateScript_SingleRoleAutoComboxValueOnChange = function (ctrlEvent) {
    var objectType = ctrlEvent.objectType;
    var infoType = ctrlEvent.infoName;
    var functionName = "InforCenter_" + objectType + "_" + infoType + "_SingleRoleAutoComboxValueOnChange";
    HoteamUI.Common.ExeFunction(functionName, ctrlEvent);
}

InforCenter_Platform_GenerateScript_SingleGroupAutoComboxValueOnChange = function (ctrlEvent) {
    var objectType = ctrlEvent.objectType;
    var infoType = ctrlEvent.infoName;
    var functionName = "InforCenter_" + objectType + "_" + infoType + "_SingleGroupAutoComboxValueOnChange";
    HoteamUI.Common.ExeFunction(functionName, ctrlEvent);
}

//处理选择组，用于支持单一组属性
InforCenter_Platform_Object_OnEditMutliGroupValue = function (ctrlEvent) {
    var callback = function (data, ret) {
        var o = HoteamUI.Control.Instance(data.id);
        if (ret != null && ret.length > 0) {
            var value = "";
            var text = "";
            //  for (var i in ret) {
            for (var i = 0; i < ret.length; i++) {
                text = text + ";" + ret[i].ENAME;
                value = value + ";" + ret[i].EID;
            }
            if (HoteamUI.Common.IsNullOrEmpty(text) == false) {
                text = text.substring(1);
                value = value.substring(1);
            }
            o.SetText(text);
            o.SetValue(value);
        }
    }
    HoteamUI.UIManager.Popup("TreeCommonQuery", { Value: ctrlEvent.o.GetValue(), ItemName: "GroupToGroup", LoadAndSelectType: "SingleLevel_MultiSelect" }, callback, { id: ctrlEvent.o.id }, "700*500");
}
//处理选择组，用于支持单一公司组属性
InforCenter_Platform_Object_OnEditSingleCompanyGroupValue = function (ctrlEvent) {
    var callback = function (data, ret) {
        var o = HoteamUI.Control.Instance(data.id);
        if (ret != null && ret.length > 0) {
            o.SetText(ret[0].ENAME);
            o.SetValue(ret[0].EID);
        }
    }
    HoteamUI.UIManager.Popup("TreeCommonQuery", { Value: ctrlEvent.o.GetValue(), ItemName: "CompanyGroupToGroup" }, callback, { id: ctrlEvent.o.id }, "400*500");
}
//处理选择组，用于支持单一公司组属性
InforCenter_Platform_Object_OnEditMutliCompanyGroupValue = function (ctrlEvent) {
    var callback = function (data, ret) {
        var o = HoteamUI.Control.Instance(data.id);
        if (ret != null && ret.length > 0) {
            var value = "";
            var text = "";
            //  for (var i in ret) {
            for (var i = 0; i < ret.length; i++) {
                text = text + ";" + ret[i].ENAME;
                value = value + ";" + ret[i].EID;
            }
            if (HoteamUI.Common.IsNullOrEmpty(text) == false) {
                text = text.substring(1);
                value = value.substring(1);
            }
            o.SetText(text);
            o.SetValue(value);
        }
    }
    HoteamUI.UIManager.Popup("TreeCommonQuery", { Value: ctrlEvent.o.GetValue(), ItemName: "CompanyGroupToGroup", LoadAndSelectType: "SingleLevel_MultiSelect" }, callback, { id: ctrlEvent.o.id }, "700*500");
}
//处理选择角色，用于支持单一角色属性
InforCenter_Platform_Object_OnEditSingleRoleValue = function (ctrlEvent) {
    var callback = function (data, ret) {
        var o = HoteamUI.Control.Instance(data.id);
        if (ret != null && ret.length > 0) {
            o.SetText(ret[0].ENAME);
            o.SetValue(ret[0].EID);
        }
    }
    HoteamUI.UIManager.Popup("TreeCommonQuery", { Value: ctrlEvent.o.GetValue(), ItemName: "RolesToRole" }, callback, { id: ctrlEvent.o.id }, "400*500");
}
//处理选择角色，用于支持多角色属性
InforCenter_Platform_Object_OnEditMutliRoleValue = function (ctrlEvent) {
    var callback = function (data, ret) {
        var o = HoteamUI.Control.Instance(data.id);
        if (ret != null && ret.length > 0) {
            var value = "";
            var text = "";
            //        for (var i in ret) {
            for (var i = 0; i < ret.length; i++) {
                text = text + ";" + ret[i].ENAME;
                value = value + ";" + ret[i].EID;
            }
            if (HoteamUI.Common.IsNullOrEmpty(text) == false) {
                text = text.substring(1);
                value = value.substring(1);
            }
            o.SetText(text);
            o.SetValue(value);
        }
    }
    HoteamUI.UIManager.Popup("TreeCommonQuery", { Value: ctrlEvent.o.GetValue(), ItemName: "RolesToRole", LoadAndSelectType: "SingleLevel_MultiSelect" }, callback, { id: ctrlEvent.o.id }, "700*500");
}
//设置状态列表的可选项，支持状态列表属性
InforCenter_Platform_Object_SetStatesSelList = function (o, objType) {
    var ret = HoteamUI.DataService.Call("InforCenter.Common.ObjectService.GetStatesList", { para: { ObjectType: objType } });;
    if (ret == null) {
        return;
    }

    var empty = new Array(0);
    empty[0] = { Value: "", Text: "" };
    for (var x = 0; x < ret.length; x++) {
        x = parseInt(x);
        empty[x + 1] = { Value: ret[x].Value, Text: ret[x].Text };
    }
    o.LoadItems(empty);
}

InforCenter_Platform_Object_SetLanguageSelList = function (o) {
    var ret = HoteamUI.Language.GetLanguageList();
    if (ret == null) {
        return;
    }

    var empty = new Array(0);
    empty[0] = { Value: "", Text: "" };
    for (var x = 0; x < ret.length; x++) {
        x = parseInt(x);
        empty[x + 1] = { Value: ret[x].Name, Text: ret[x].Text };
    }
    o.LoadItems(empty);
}


InforCenter_Platform_Object_IntToDateFormat = function (value) {

    if (HoteamUI.Common.IsNullOrEmpty(value) || value == 0 || value == "0") {
        return "";
    }
    value = parseInt(value, 10).toString();
    while (value.length < 8) value = "0" + value;

    var result = value.substr(0, 4) + "-" + value.substr(4, 2) + "-" + value.substr(6, 2);


    return result;
}
InforCenter_Platform_Object_DateFormatToInt = function (value) {

    if (HoteamUI.Common.IsNullOrEmpty(value)) {
        return "";
    }

    value = value.toString();

    var year = value.substr(0, 4) - 0;
    var month = value.substr(5, 2) - 0;
    var day = value.substr(8, 2) - 0;

    return year * 10000 + month * 100 + day;
}
InforCenter_Platform_Object_IntToTimeFormat = function (value) {
    if (HoteamUI.Common.IsNullOrEmpty(value)) {
        return "";
    }

    value = parseInt(value).toString();
    while (value.length < 6) value = "0" + value;

    var result = value.substr(0, 2) + ":" + value.substr(2, 2) + ":" + value.substr(4, 2);

    return result;
}
InforCenter_Platform_Object_TimeFormatToInt = function (value) {

    if (HoteamUI.Common.IsNullOrEmpty(value)) {
        return "";
    }

    value = value.toString();

    var h = value.substr(0, 2) - 0;
    var m = value.substr(3, 2) - 0;
    var s = value.substr(6, 2) - 0;

    return h * 10000 + m * 100 + s;
}
InforCenter_Platform_Object_SetVersionSelList = function (o, versionType) {
    var ret = HoteamUI.DataService.Call("InforCenter.Platform.ObjectService.GetMajorMinorVersionList", { para: { VersionType: versionType } });
    if (ret == null) {
        return;
    }
    var empty = new Array(0);
    var step = 0;
    for (var x = 0; x < ret.length; x++) {
        empty[x + step] = { Value: ret[x].Key, Text: ret[x].Value };
    }
    o.LoadItems(empty);
}
//获取枚举列表
InforCenter_Platform_Object_SetEnumList = function (o, infoName, objType, fillEmpty) {
    var ret = HoteamUI.DataService.Call("InforCenter.Enumeration.EnumerationService.GetEnumerationItemFromObj", { para: { InfoName: infoName, ObjType: objType } });
    if (ret == null) {
        return;
    }
    var empty = new Array(0);
    var step = 0;
    if (fillEmpty) {
        if (ret.length > 0 && ret[0].Value && ret[0].Value != "") {
            empty[0] = { Value: "", Text: "" };
            step = 1;
        }
    }
    for (var x = 0; x < ret.length; x++) {
        empty[x + step] = { Value: ret[x].Key, Text: ret[x].Value };
    }
    o.LoadItems(empty);
}

InforCenter_Platform_Object_SetCheckBoxPad = function (o, infoName, objType) {
    var ret = HoteamUI.DataService.Call("InforCenter.Enumeration.EnumerationService.GetLovListItemFromObj", { para: { InfoName: infoName, ObjType: objType } });
    if (ret == null) {
        return;
    }
    var data = [];
    for (var x = 0; x < ret.length; x++) {
        data.push({ Value: "0", Text: ret[x].Value, Name: ret[x].Key });
    }
    o.LoadData(data);
}
//获取枚举列表
InforCenter_Platform_Object_SetVaultList = function (o, fillEmpty) {
    var ret = HoteamUI.DataService.Call("InforCenter.Platform.FileManageService.GetVaultList", {});
    if (ret == null) {
        return;
    }
    var empty = new Array(0);
    var step = 0;
    if (fillEmpty) {
        if (ret.length > 0 && ret[0].Value && ret[0].Value != "") {
            empty[0] = { Value: "", Text: "" };
            step = 1;
        }
    }
    for (var x = 0; x < ret.length; x++) {
        empty[x + step] = { Value: ret[x].Key, Text: ret[x].Value };
    }
    o.LoadItems(empty);
}

//获取枚举列表
InforCenter_Platform_Object_SetInfoTypeList = function (o, objType, fillEmpty) {
    var ret = HoteamUI.DataService.Call("InforCenter.Platform.ObjectService.GetInfoTypeList", { para: { ObjectType: objType } });
    if (ret == null) {
        return;
    }
    var empty = new Array(0);
    var step = 0;
    if (fillEmpty) {
        if (ret.length > 0 && ret[0].Value && ret[0].Value != "") {
            empty[0] = { Value: "", Text: "" };
            step = 1;
        }
    }
    for (var x = 0; x < ret.length; x++) {
        empty[x + step] = { Value: ret[x].Key, Text: ret[x].Value };
    }
    o.LoadItems(empty);
}
//获取枚举列表
InforCenter_Platform_Object_SetSubDataModels = function (o, infoName, objType, fillEmpty) {
    var ret = HoteamUI.DataService.Call("InforCenter.Platform.ObjectService.GetSubDataModelList", { para: { InfoName: infoName, ObjType: objType } });
    if (ret == null) {
        return;
    }
    var empty = new Array(0);
    var step = 0;
    if (fillEmpty) {
        empty[0] = { Value: "", Text: "" };
        step = 1;
    }
    for (var x = 0; x < ret.length; x++) {
        x = parseInt(x);
        empty[x + step] = { Value: ret[x].Key, Text: ret[x].Value };
    }
    o.LoadItems(empty);
}

//获取枚举列表
InforCenter_Platform_Object_SetUnionDataModels = function (o, infoName, objType, unionName, fillEmpty) {
    var ret = HoteamUI.DataService.Call("InforCenter.Platform.ObjectService.GetUnionDataModelList", { para: { InfoName: infoName, ObjType: objType, UnionName: unionName } });
    if (ret == null) {
        return;
    }
    var empty = new Array(0);
    var step = 0;
    if (fillEmpty) {
        empty[0] = { Value: "", Text: "" };
        step = 1;
    }
    for (var x = 0; x < ret.length; x++) {
        x = parseInt(x);
        empty[x + step] = { Value: ret[x].Key, Text: ret[x].Value };
    }
    o.LoadItems(empty);
}

InforCenter_Platform_Object_SetLinkChildDataModels = function (o, objType, fillEmpty) {
    var ret = HoteamUI.DataService.Call("InforCenter.Platform.ObjectService.GetLinkChildDataModelList", { para: { ObjType: objType } });
    if (ret == null) {
        return;
    }
    var empty = new Array(0);
    var step = 0;
    if (fillEmpty) {
        empty[0] = { Value: "", Text: "" };
        step = 1;
    }
    for (var x = 0; x < ret.length; x++) {
        x = parseInt(x);
        empty[x + step] = { Value: ret[x].Key, Text: ret[x].Value };
    }
    o.LoadItems(empty);
}

//获取模型的所有下级模型
InforCenter_Platform_Object_SetDataModelsExtend = function (o, objType, fillEmpty) {
    var ret = HoteamUI.DataService.Call("InforCenter.Platform.ObjectService.GetDataModelsExtendList", { para: { ObjType: objType } });
    if (ret == null) {
        return;
    }
    var empty = new Array(0);
    var step = 0;
    if (fillEmpty) {
        empty[0] = { Value: "", Text: "" };
        step = 1;
    }
    for (var x = 0; x < ret.length; x++) {
        x = parseInt(x);
        empty[x + step] = { Value: ret[x].Key, Text: ret[x].Value };
    }
    o.LoadItems(empty);
}

//获取枚举列表
InforCenter_Platform_Object_SetObjectEnumList = function (o, infoName, objType, fillEmpty) {
    var functionName = "InforCenter_" + objType + "_" + infoName + "_ObjectEnumValue";
    if (window[functionName] && typeof window[functionName] == "function") {
        return window[functionName](o);
    }
    else {
        var ret = HoteamUI.DataService.Call("InforCenter.Enumeration.EnumerationService.GetOjbectEnumerationItem", { para: { InfoName: infoName, ObjType: objType } });
        if (ret == null) {
            return;
        }
        var empty = new Array(0);
        var step = 0;
        if (fillEmpty) {
            empty[0] = { Value: "", Text: "" };
            step = 1;
        }
        for (var x = 0; x < ret.length; x++) {
            x = parseInt(x);
            empty[x + step] = { Value: ret[x].Key, Text: ret[x].Value };
        }
        o.LoadItems(empty);
    }
}
//流程模板加载内容
InforCenter_Platform_Object_SetFlowTemplate = function (o, infoName, objType, fillEmpty) {
    var ret = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowService.GetAllWorkflowTemplate", { para: {} });
    if (ret == null) {
        return;
    }
    var empty = new Array(0);
    var step = 0;
    if (fillEmpty) {
        empty[0] = { Value: "", Text: "" };
        step = 1;
    }
    for (var x = 0; x < ret.length; x++) {
        x = parseInt(x);
        empty[x + step] = { Value: ret[x].Value, Text: ret[x].Text };
    }
    o.LoadItems(empty);
}

//流程模板加载内容
InforCenter_Platform_Object_SetFlowTemplateEUID = function (o, fillEmpty) {
    var ret = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowService.GetAllWorkflowTemplateEUID", { para: {} });
    if (ret == null) {
        return;
    }
    var empty = new Array(0);
    var step = 0;
    if (fillEmpty) {
        empty[0] = { Value: "", Text: "" };
        step = 1;
    }
    for (var x = 0; x < ret.length; x++) {
        x = parseInt(x);
        empty[x + step] = { Value: ret[x].Value, Text: ret[x].Text };
    }
    o.LoadItems(empty);
}

InforCenter_Platform_Object_SetEnumListbyName = function (o, filterName, selectFirst, fillEmpty) {
    var ret = HoteamUI.DataService.Call("InforCenter.Enumeration.EnumerationService.GetEnumerationItem", { para: { EnumerationName: filterName } });
    if (ret == null) {
        return;
    }
    var empty = new Array(0);
    var step = 0;
    if (fillEmpty) {
        empty[0] = { Value: "", Text: "" };
        step = 1;
    }
    for (var x = 0; x < ret.length; x++) {
        x = parseInt(x);
        empty[x + step] = { Value: ret[x].Key, Text: ret[x].Value };
    }
    o.LoadItems(empty);
    if (selectFirst && empty.length > 0) {
        o.SetSelectedByValue(empty[0].Value);
    }
}

InforCenter_Platform_Object_SetFileUploadValue = function (o, file) {
    var vault = HoteamUI.DataService.Call('InforCenter.FileManage.FileManageService.GetVaultForUpload', {});
    var arr = file.Path.split('.');
    if (arr.indexOf("gif") > 0 || arr.indexOf("png") > 0 || arr.indexOf("jpg") > 0 || arr.indexOf("jpeg") > 0) {
        //var src = 'http://' + vault.IP + ':' + vault.Port + '/' + vault.Volumn + '/' + arr[0] + '/thumbnial.gif';
        var src = 'http://' + vault.IP + ':' + vault.Port + '/' + vault.Volumn + '/' + file.Path;
        o.SetSrc(src);
        o.SetValue(file);
    }
}

///设置值列表，不可编辑
InforCenter_Platform_Object_SetLovList = function (o, infoName, objType, fillEmpty) {
    var ret = HoteamUI.DataService.Call("InforCenter.Enumeration.EnumerationService.GetLovListItemFromObj", { para: { InfoName: infoName, ObjType: objType } });
    if (ret == null) {
        return;
    }
    var empty = new Array(0);
    var step = 0;
    if (fillEmpty) {
        empty[0] = { Value: "", Text: "" };
        step = 1;
    }
    for (var x = 0; x < ret.length; x++) {
        x = parseInt(x);
        empty[x + step] = { Value: ret[x].Key, Text: ret[x].Value };
    }
    o.LoadItems(empty);
}

///设置值列表的列表
InforCenter_Platform_Object_SetLov = function (o, fillEmpty) {
    var ret = HoteamUI.DataService.Call("InforCenter.Enumeration.EnumerationService.GetLov", {});
    if (ret == null) {
        return;
    }
    var empty = new Array(0);
    var step = 0;
    if (fillEmpty) {
        empty[0] = { Value: "", Text: "" };
        step = 1;
    }
    for (var x = 0; x < ret.length; x++) {
        x = parseInt(x);
        empty[x + step] = { Value: ret[x].Key, Text: ret[x].Value };
    }
    o.LoadItems(empty);
}

InforCenter_Platform_Object_SetLovListRadio = function (o, infoName, objType, readonly) {
    var ret = HoteamUI.DataService.Call("InforCenter.Enumeration.EnumerationService.GetLovListItemFromObj", { para: { InfoName: infoName, ObjType: objType } });
    if (ret == null) {
        return;
    }
    o.Clear();
    for (var i = 0; i < ret.length; i++) {
        var item = ret[i];
        o.AddRadio({ value: item.Key, text: item.Value });
    }
    if (readonly) {
        o.Disable();
    }
}
InforCenter_Platform_Object_SetEnumRadioValue = function (o, infoName, objType, readonly) {
    var ret = HoteamUI.DataService.Call("InforCenter.Enumeration.EnumerationService.GetEnumerationItemFromObj", { para: { InfoName: infoName, ObjType: objType } });
    if (ret == null) {
        return;
    }
    o.Clear();
    for (var i = 0; i < ret.length; i++) {
        var item = ret[i];
        o.AddRadio({ value: item.Key, text: item.Value });
    }
    if (readonly) {
        o.Disable();
    }
}

InforCenter_Platform_Object_SetExhaustionLovListValue = function (o, infoName, objType, fillEmpty) {
    var ret = HoteamUI.DataService.Call("InforCenter.Enumeration.EnumerationService.GetLovListItemFromObj", { para: { InfoName: infoName, ObjType: objType } });
    if (ret == null) {
        return;
    }
    var empty = new Array(0);
    var step = 0;
    if (fillEmpty) {
        empty[0] = { Value: "", Text: "" };
        step = 1;
    }
    for (var x = 0; x < ret.length; x++) {
        x = parseInt(x);
        empty[x + step] = { Value: ret[x].Key, Text: ret[x].Value };
    }
    o.LoadItems(empty);
}

//在下拉框change after事件后调用
InforCenter_Platform_GenerateScript_SubDataModelValue = function (ctrlEvent) {
    var objectType = ctrlEvent.objectType;
    var infoType = ctrlEvent.infoName;
    var functionName = "InforCenter_" + objectType + "_" + infoType + "_SubDataModelValue";
    HoteamUI.Common.ExeFunction(functionName, ctrlEvent);
}

//在下拉框change after事件后调用
InforCenter_Platform_GenerateScript_UnionDataModelValue = function (ctrlEvent) {
    var objectType = ctrlEvent.objectType;
    var infoType = ctrlEvent.infoName;
    var functionName = "InforCenter_" + objectType + "_" + infoType + "_UnionDataModelValue";
    HoteamUI.Common.ExeFunction(functionName, ctrlEvent);
}

//在下拉框change after事件后调用
InforCenter_Platform_GenerateScript_LinkChildDataModelValue = function (ctrlEvent) {
    var objectType = ctrlEvent.objectType;
    var infoType = ctrlEvent.infoName;
    var functionName = "InforCenter_" + objectType + "_" + infoType + "_LinkChildDataModel";
    HoteamUI.Common.ExeFunction(functionName, ctrlEvent);
}

InforCenter_Platform_GenerateScript_LovListValue = function (ctrlEvent) {
    var objectType = ctrlEvent.objectType;
    var infoType = ctrlEvent.infoName;
    var functionName = "InforCenter_" + objectType + "_" + infoType + "_LovListValue";
    HoteamUI.Common.ExeFunction(functionName, ctrlEvent);
}

InforCenter_Platform_GenerateScript_DateValueOnChange = function (ctrlEvent) {
    var objectType = ctrlEvent.objectType;
    var infoType = ctrlEvent.infoName;
    var functionName = "InforCenter_" + objectType + "_" + infoType + "_DateValue";
    HoteamUI.Common.ExeFunction(functionName, ctrlEvent);
}

InforCenter_Platform_GenerateScript_DefaultObjectValueOnChange = function (ctrlEvent) {
    var objectType = ctrlEvent.objectType;
    var infoType = ctrlEvent.infoName;
    var functionName = "InforCenter_" + objectType + "_" + infoType + "_DefaultObjectValue";
    HoteamUI.Common.ExeFunction(functionName, ctrlEvent);
}

InforCenter_Platform_GenerateScript_EnumValueOnChange = function (ctrlEvent) {
    var objectType = ctrlEvent.objectType;
    var infoType = ctrlEvent.infoName;
    var functionName = "InforCenter_" + objectType + "_" + infoType + "_EnumValueOnChange";
    HoteamUI.Common.ExeFunction(functionName, ctrlEvent);
}

InforCenter_Platform_GenerateScript_ExhaustionObjectEnumValueOnChange = function (ctrlEvent) {
    var objectType = ctrlEvent.objectType;
    var infoType = ctrlEvent.infoName;
    var functionName = "InforCenter_" + objectType + "_" + infoType + "_ExhaustionObjectEnumValueChange";
    HoteamUI.Common.ExeFunction(functionName, ctrlEvent);
}

InforCenter_Platform_GenerateScript_MultiObjectEnumValueOnChange = function (ctrlEvent) {
    var objectType = ctrlEvent.objectType;
    var infoType = ctrlEvent.infoName;
    var functionName = "InforCenter_" + objectType + "_" + infoType + "_MultiObjectEnumValueOnChange";
    HoteamUI.Common.ExeFunction(functionName, ctrlEvent);
}

InforCenter_Platform_GenerateScript_ObjectEnumValueOnChange = function (ctrlEvent) {
    var objectType = ctrlEvent.objectType;
    var infoType = ctrlEvent.infoName;
    var functionName = "InforCenter_" + objectType + "_" + infoType + "_ObjectEnumValueOnChange";
    HoteamUI.Common.ExeFunction(functionName, ctrlEvent);
}

InforCenter_Platform_Object_ObjectTypeListValue = function (o, infoName, objType, fillEmpty, isAll, onlyStartFlow) {
    var ret = HoteamUI.DataService.Call("InforCenter.Platform.ObjectService.GetObjectTypeList", { para: { IsAllObjectType: isAll, OnlyStartFlow: onlyStartFlow } });
    if (ret == null) {
        return;
    }
    var empty = new Array(0);
    var step = 0;
    if (fillEmpty) {
        empty[0] = { Value: "", Text: "" };
        step = 1;
    }
    for (var x = 0; x < ret.length; x++) {
        x = parseInt(x);
        empty[x + step] = { Value: ret[x].Key, Text: ret[x].Value };
    }
    o.LoadItems(empty);
}
/// <summary>
/// 获取指定模型的指定字段值集合  王天岭
/// </summary>
/// <param name="para"></param>
/// <returns></returns>
InforCenter_Platform_Object_ObjectFieldData = function (o, infoName, objType, fillEmpty) {
    var ret = HoteamUI.DataService.Call("InforCenter.Platform.ObjectService.GetObjTypeFieldData", { para: { InfoType: infoName, ObjectType: objType } });
    if (ret == null) {
        return;
    }
    var empty = new Array(0);
    var step = 0;
    if (fillEmpty) {
        empty[0] = { Value: "", Text: "" };
        step = 1;
    }
    for (var x = 0; x < ret.length; x++) {
        x = parseInt(x);
        empty[x + step] = { Value: ret[x].Key, Text: ret[x].Value };
    }
    o.LoadItems(empty);
}
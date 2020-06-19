InforCenter_Platform_CreateInternalMail_OnCreate = function (pageEvent) {
    var para = pageEvent.o.GetPara();
    var data = InforCenter_Platform_Object_GetObjectInitData('INTERNALMAIL', para);

    {
        var o = pageEvent.o.GetControl('IMPORTANT_Value');
        if (o.id != '') {
            InforCenter_Platform_Object_SetEnumRadioValue(o, 'IMPORTANT', 'INTERNALMAIL', false);
            o.SetSelectByValue(data.IMPORTANT);
        }
    }
    if (para.SelectID) {
        var pluginGrid = pageEvent.o.GetControl('ObjectListGrid');
        if (pluginGrid.id != '') {
            var gridStr = HoteamUI.DataService.Call("Hoteam.InforCenter.InternalMailService.GetInternalMailPluginByPluginID", { para: { ObjectID: para.SelectID } });
            pluginGrid.ClearGridRows();
            if (!HoteamUI.Common.IsNullOrEmpty(gridStr)) {
                var gridData = JSON.parse(gridStr);
                var objArray = [];
                $.each(gridData, function (i, d) {
                    objArray.push(JSON.parse(d));
                });
                pluginGrid.AddRows(objArray);
            }
        }
    }
    var functionName = 'InforCenter_INTERNALMAIL_CreatePage_OnCreate';
    if (window[functionName] && typeof window[functionName] == 'function')
        return window[functionName](pageEvent, data);
}

InforCenter_Platform_EditInternalMail_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.ObjectID)) {
        return;
    }
    var data = InforCenter_Platform_Object_GetObjectData(pagePara.ObjectID, pagePara);
    if (HoteamUI.Common.IsNullOrEmpty(data)) {
        return;
    }
    var reciverCtrl = page.GetControl('RECIVER_Value');
    if (reciverCtrl.id != '') {
        reciverCtrl.SetValue(data.RECIVER);
        reciverCtrl.SetText(data.RECIVER_DisplayValue);
    }
    var copytoUserCtrl = page.GetControl('COPYTOUSER_Value');
    if (copytoUserCtrl.id != '') {
        copytoUserCtrl.SetValue(data.COPYTOUSER);
        copytoUserCtrl.SetText(data.COPYTOUSER_DisplayValue);
    }
    var mailTitleCtrl = page.GetControl('MAILTITLE_Value');
    if (mailTitleCtrl.id != '') {
        mailTitleCtrl.SetText(data.MTITLE);
    }
    var mailContentCtrl = page.GetControl('MAILCONTENT_Value');
    if (mailContentCtrl.id != '') {
        mailContentCtrl.SetText(data.MCONTENT);
    }
    var ImportantCtrl = page.GetControl('IMPORTANT_Value');
    if (ImportantCtrl.id != '') {
        InforCenter_Platform_Object_SetEnumRadioValue(ImportantCtrl, 'IMPORTANT', 'INTERNALMAIL', false);
        ImportantCtrl.SetSelectByValue(data.IMPORTANT);
    }
    var secretuserCtrl = page.GetControl('SECRETUSER_Value');
    if (secretuserCtrl.id != '') {
        secretuserCtrl.SetValue(data.SECRETUSER);
        secretuserCtrl.SetText(data.SECRETUSER_DisplayValue);
    }
    var pluginGrid = page.GetControl('ObjectListGrid');
    if (pluginGrid.id != '') {
        pluginGrid.ClearGridRows();
        var gridStr = HoteamUI.DataService.Call("Hoteam.InforCenter.InternalMailService.GetInternalMailPluginByMailID", { para: { ObjectID: pagePara.ObjectID } });
        if (!HoteamUI.Common.IsNullOrEmpty(gridStr)) {
            var gridData = JSON.parse(gridStr);
            var objArray = [];
            $.each(gridData, function (i, d) {
                objArray.push(JSON.parse(d));
            });
            pluginGrid.AddRows(objArray);
        }
    }
}

InforCenter_Platform_InternalMail_AddPluginGridData = function (ctrlEvent) {
    if (HoteamUI.Common.IsNullOrEmpty(ClipBoard) == false
        && HoteamUI.Common.IsNullOrEmpty(ClipBoard.ObjIDArr) == false
        && ClipBoard.ObjIDArr.length > 0) {
        var objectIDs = ClipBoard.ObjIDArr.toString().replace(/,/g, ";");
        var result = HoteamUI.DataService.Call('InforCenter.DocTemplate.DocTemplateService.GetGridDataFromObjectIds', { para: { ObjectId: objectIDs } });

        if (!HoteamUI.Common.IsNullOrEmpty(result)) {
            var gridData = JSON.parse(result);
            var objArray = [];
            $.each(gridData, function (i, d) {
                var data = JSON.parse(d);
                var objectType = InforCenter_Platform_GTypeFromID(data.EID.ColText);
                var objTypeCol = {};
                objTypeCol.ColName = 'OBJECTTYPE';
                objTypeCol.ColText = HoteamUI.Language.Lang(objectType + "Model", objectType + "Header");
                data.OBJECTTYPE = objTypeCol;
                objArray.push(data);
            });
            var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
            var grid = page.GetControl("ObjectListGrid");
            if (grid.id != '') {
                var needPasteObjs = [];
                var existsObjs = grid.GetCurrentPageRows();
                for (var i = 0; i < objArray.length; i++) {
                    var exists = false;

                    for (var j = 0; j < existsObjs.length; j++) {
                        if (existsObjs[j].EID == objArray[i].EID.ColText) {
                            exists = true;
                            break;
                        }
                    }
                    if (exists == false) {
                        needPasteObjs.push(objArray[i]);
                    }
                }
                grid.AddRows(needPasteObjs);
                if (needPasteObjs.length == 0) {
                    HoteamUI.UIManager.Popup({ pagename: "Confirm", paras: { pageMode: "OK", message: HoteamUI.Language.Lang("MenuItems.PasteNonAttach") } });
                } else if (needPasteObjs.length == objArray.length) {


                } else {
                    var message = HoteamUI.Language.Lang("MenuItems.PastePartialAttach");
                    message = message.replace("{0}", needPasteObjs.length)
                    HoteamUI.UIManager.Popup({ pagename: "Confirm", paras: { pageMode: "OK", message: message } });
                }

            }
        }

    }
    else {
        //剪切板内没信息
        HoteamUI.UIManager.Popup({ pagename: "Confirm", paras: { pageMode: "OK", message: HoteamUI.Language.Lang("ClipBoard.ClipBoardEmpty") } });
        return;
    }
}

InforCenter_Platform_InternalMail_RemovePluginGridData = function (ctrlEvent) {
    try {
        var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
        var grid = page.GetControl("ObjectListGrid");
        if (HoteamUI.Common.IsNullOrEmpty(grid) == false) {
            var rows = grid.GetSelectedRows();
            if (HoteamUI.Common.IsNullOrEmpty(rows) || rows.length == 0) {
                HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("InternalMail", "selectObjectEmpty"));
                return;
            }
            grid.RemoveSelectedRows();

            InforCenter_Platform_StartWorkflow_GridDataChange(page);
        }
    } catch (e) { }
}


InforCenter_Platform_InternalMailBody_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.ObjectID)) {
        return;
    }
    var data = InforCenter_Platform_Object_GetObjectData(pagePara.ObjectID, pagePara);
    if (HoteamUI.Common.IsNullOrEmpty(data)) {
        return;
    }
    var reciveTimeCtrl = page.GetControl('RECIVERTIME_Value');
    var sendUserCtrl = page.GetControl('SENDUSER_Value');
    var titleCtrl = page.GetControl('MAILTITLE_Value');
    var reciveUserCtrl = page.GetControl('RECIVEUSER_Value');
    var copytoUserCtrl = page.GetControl('COPYTOUSER_Value');
    var contentCtrl = page.GetControl('MAILCONTENT_Value');
    var importantCtrl = page.GetControl('IMPORTANT_Value');
    if (reciveTimeCtrl.id != '') {
        reciveTimeCtrl.SetText(data.RECIVETIME_DisplayValue);
    }
    if (sendUserCtrl.id != '') {
        sendUserCtrl.SetText(data.SENDUSER_DisplayValue);
    }
    if (titleCtrl.id != '') {
        titleCtrl.SetText(data.MTITLE_DisplayValue);
    }
    if (reciveUserCtrl.id != '') {
        reciveUserCtrl.SetText(data.RECIVER_DisplayValue);
    }
    if (copytoUserCtrl.id != '') {
        copytoUserCtrl.SetText(data.COPYTOUSER_DisplayValue);
    }
    if (contentCtrl.id != '') {
        contentCtrl.SetText(data.MCONTENT_DisplayValue);
    }
    if (importantCtrl.id != '') {
        importantCtrl.SetText(data.IMPORTANT_DisplayValue);
    }
    //设置邮件已读。
    InforCenter_Platform_InternalMailSetRead(data);
}

InforCenter_Platform_InternalMailPlugin_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.ObjectID)) {
        return;
    }
    var data = InforCenter_Platform_Object_GetObjectData(pagePara.ObjectID, pagePara);
    if (HoteamUI.Common.IsNullOrEmpty(data)) {
        return;
    }
    var reciveTimeCtrl = page.GetControl('RECIVERTIME_Value');
    var sendUserCtrl = page.GetControl('SENDUSER_Value');
    var titleCtrl = page.GetControl('MAILTITLE_Value');
    var reciveUserCtrl = page.GetControl('RECIVEUSER_Value');
    var copytoUserCtrl = page.GetControl('COPYTOUSER_Value');
    var pluginGrid = page.GetControl('MAILPLUGIN_Value');
    var importantCtrl = page.GetControl('IMPORTANT_Value');
    if (reciveTimeCtrl.id != '') {
        reciveTimeCtrl.SetText(data.RECIVETIME_DisplayValue);
    }
    if (sendUserCtrl.id != '') {
        sendUserCtrl.SetText(data.SENDUSER_DisplayValue);
    }
    if (titleCtrl.id != '') {
        titleCtrl.SetText(data.MTITLE_DisplayValue);
    }
    if (reciveUserCtrl.id != '') {
        reciveUserCtrl.SetText(data.RECIVER_DisplayValue);
    }
    if (copytoUserCtrl.id != '') {
        copytoUserCtrl.SetText(data.COPYTOUSER_DisplayValue);
    }
    if (importantCtrl.id != '') {
        importantCtrl.SetText(data.IMPORTANT_DisplayValue);
    }


    if (pluginGrid.id != '') {
        var gridStr = HoteamUI.DataService.Call("Hoteam.InforCenter.InternalMailService.GetInternalMailPluginByMailID", {
            para: {
                ObjectID: pagePara.ObjectID
            }
        });
        pluginGrid.ClearGridRows();
        if (!HoteamUI.Common.IsNullOrEmpty(gridStr)) {
            var gridData = JSON.parse(gridStr);
            var objArray = [];
            $.each(gridData, function (i, d) {
                objArray.push(JSON.parse(d));
            });
            pluginGrid.AddRows(objArray);
        }
    }
    //设置邮件已读。
    InforCenter_Platform_InternalMailSetRead(data);
}
InforCenter_Platform_InternalMailSetRead = function (data) {
    if (data.MSTATE == null || data.MSTATE.toLowerCase() == 'unread') {
        HoteamUI.DataService.Call('InforCenter.Platform.InternalMailService.MarkReadOrUnRead', {
            para: {
                ObjectID: data.EID, State: 'Read'
            }
        });
    }
};

InforCenter_Platform_InternalMail_Send = function (ctrlEvent) {
    InforCenter_Platform_CreateInternalMail_OnGetDataFromPage(ctrlEvent);
    if (InforCenter_Platform_Object_Data == null) {
        return;
    }

    if (HoteamUI.Common.IsNullOrEmpty(InforCenter_Platform_Object_Data.MTITLE)) {
        var msg = HoteamUI.Language.Lang('InternalMail', 'mTitleEmpty');
        HoteamUI.UIManager.MsgBox(msg);
        return;
    }
    if (HoteamUI.Common.IsNullOrEmpty(InforCenter_Platform_Object_Data.RECIVER)) {
        var msg = HoteamUI.Language.Lang('InternalMail', 'reciverEmpty');
        HoteamUI.UIManager.MsgBox(msg);
        return;
    }
    var para = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID()).GetPara();
    var data = InforCenter_Platform_Object_Data;
    data.MTYPE = 'Normal';
    data = $.extend(true, {}, para, data);
    var isNew = true;
    if (para.ObjectID) {
        isNew = false;
    }
    var sdata = JSON.stringify(data);
    var para = { Data: sdata, ObjectID: data.ObjectID, ObjectType: data.ObjectType };
    var data = HoteamUI.DataService.Call("Hoteam.InforCenter.InternalMailService.SendInternalMail", { para: para });
    if (data != null) {
        var obj = JSON.parse(data);
        var content = HoteamUI.Language.Lang("InternalMail.Common");
        var action = HoteamUI.Language.Lang("InternalMail.SendMail");
        content = content.replace("[UserName]", HoteamUI.Security.LoginPara.UserName)
            .replace("[ActionName]", action)
            .replace("[ObjectName]", obj.ENAME);
        //记录查看对象查看器操作，用于统计最近访问
        var para = { RecordLog: { OperateType: 'SaveMail', ObjID: obj.ObjectID, ObjName: obj.ENAME, ObjCode: '', Description: content, IP: HoteamUI.Security.LoginPara.LoginIP } }
        HoteamUI.DataService.AsyncCall('InforCenter.Common.OperateLogService.RecordLog', { para: para }, function () { });

        data.IsClose = !para.IsLoopExec;
        HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), data);
    }
}

InforCenter_Platform_InternalMail_Save = function (ctrlEvent) {
    InforCenter_Platform_CreateInternalMail_OnGetDataFromPage(ctrlEvent);
    if (InforCenter_Platform_Object_Data == null) {
        return;
    }
    var para = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID()).GetPara();
    var data = InforCenter_Platform_Object_Data;
    data.MTYPE = 'Drafts';
    data = $.extend(true, {}, para, data);
    var isNew = true;
    if (para.ObjectID) {
        isNew = false;
    }
    var sdata = JSON.stringify(data);
    var para = { Data: sdata, ObjectID: data.ObjectID, ObjectType: data.ObjectType };
    var data = HoteamUI.DataService.Call("Hoteam.InforCenter.InternalMailService.SaveInternalMail", { para: para });

    if (data != null) {
        var obj = JSON.parse(data);
        var content = HoteamUI.Language.Lang("InternalMail.Common");
        var action = HoteamUI.Language.Lang("InternalMail.SaveMail");
        content = content.replace("[UserName]", HoteamUI.Security.LoginPara.UserName)
            .replace("[ActionName]", action)
            .replace("[ObjectName]", obj.ENAME);
        //记录查看对象查看器操作，用于统计最近访问
        var para = { RecordLog: { OperateType: 'SaveMail', ObjID: obj.ObjectID, ObjName: obj.ENAME, ObjCode: '', Description: content, IP: HoteamUI.Security.LoginPara.LoginIP } }
        HoteamUI.DataService.AsyncCall('InforCenter.Common.OperateLogService.RecordLog', { para: para }, function () { });

        data.IsClose = !para.IsLoopExec;
        HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), data);
    }
}


InforCenter_Platform_CreateInternalMail_OnGetDataFromPage = function (ctrlEvent, notNeedCheck) {
    InforCenter_Platform_Object_Data = null;
    var bCheck = true;
    var data = { ObjectType: 'INTERNALMAIL' };
    {
        var c = ctrlEvent.o.OtherControl('RECIVER_Value');
        if (c.id != '') {
            if (!notNeedCheck && c.Check() == false) bCheck = false;
            data.RECIVER = c.GetValue();
        }
    }
    {
        var c = ctrlEvent.o.OtherControl('COPYTOUSER_Value');
        if (c.id != '') {
            if (!notNeedCheck && c.Check() == false) bCheck = false;
            data.COPYTOUSER = c.GetValue();
        }
    }
    {
        var c = ctrlEvent.o.OtherControl('MAILTITLE_Value');
        if (c.id != '') {
            if (!notNeedCheck && c.Check() == false) bCheck = false;
            data.MTITLE = c.GetText();
        }
    }
    {
        var c = ctrlEvent.o.OtherControl('MAILCONTENT_Value');
        if (c.id != '') {
            if (!notNeedCheck && c.Check() == false) bCheck = false;
            data.MCONTENT = c.GetText();
        }
    }
    {
        var c = ctrlEvent.o.OtherControl('IMPORTANT_Value');
        if (!notNeedCheck && c.Check() == false) bCheck = false;
        data.IMPORTANT = c.GetValue();
    }
    {
        var c = ctrlEvent.o.OtherControl('SECRETUSER_Value');
        if (c.id != '') {
            if (!notNeedCheck && c.Check() == false) bCheck = false;
            data.SECRETUSER = c.GetValue();
        }
    }
    {
        var grid = ctrlEvent.o.OtherControl('ObjectListGrid');
        var rows = grid.GetCurrentPageRows();
        var ids = '';
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            ids += ";" + row.EID;
        }
        if (ids.length > 0) {
            data.PLUGINID = ids.substr(1);
        }
    };
    if (bCheck) InforCenter_Platform_Object_Data = data;
}

//附件列表数据图标点击进入对象查看器
InforCenter_Platform_InternalMail_PluginInspector = function (ctrlEvent) {
    var paras = {};
    paras.Data = ctrlEvent.rowobject;
    paras.ObjectID = paras.TabId = paras.SelectID = ctrlEvent.rowobject.EID;

    //权限判断
    var check = HoteamUI.DataService.Call('InforCenter.Common.WebActionService.CheckActionPermission', { para: { ActionType: "AUTO", ActionName: "BROWSE", SelectID: paras.ObjectID } });
    if (check == null) {
        return;
    }

    var objectType = InforCenter_Platform_GTypeFromID(paras.ObjectID);

    var customObjectType = "";
    if (objectType == "PMTASK") {
        var data = InforCenter_Platform_Object_GetObjectData(paras.ObjectID, null);
        customObjectType = data.TASKTYPE;
    }

    paras.ObjectType = HoteamUI.Common.IsNullOrEmpty(customObjectType) ? objectType : customObjectType;
    var objectInspectorConfig = null;
    $.each(ObjectInspectorsScript, function (index, val) {
        if (val.ObjectType == paras.ObjectType)
            objectInspectorConfig = JSON.parse(JSON.stringify(val));
    });
    if (objectInspectorConfig != null) {
        if (ctrlEvent.rowobject.EUID)
            paras.SelectEUID = ctrlEvent.rowobject.EUID;
        paras.ObjectInspectorConfig = objectInspectorConfig;
        InforCenter_Platform_ObjectInspector_AddMainTab(paras);
    }
}

InforCenter_Platform_InternalMail_OpenModule = function (para) {
    var pageName = "";
    var pagePara = {};
    var pageText = "";
    for (var item in para) {
        if (item == "PageName") {
            pageName = para[item];
        }
        else if (item == "PageText") {
            if (para[item].indexOf('.') > 0) {
                pageText = HoteamUI.Language.Lang(para[item]);
            }
            else {
                pageText = para[item];
            }
        }
        else {
            pagePara[item] = para[item];
        }
    }
    InforCenter_Platform_MainTabs_AddTab(pageName, pagePara, pageText, false);
    InforCenter_Platform_InstantMessage_MessageLinkClick();
}

InforCenter_Platform_InternalMail_OpenObject = function (para) {
    HoteamUI.UIManager.Popup({
        pagename: "ViewObject",
        paras: { SelectID: para.ObjID },
        size: "960*420"
    });
    InforCenter_Platform_InstantMessage_MessageLinkClick();
}

InforCenter_Platform_AnswerInternalMail_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var para = page.GetPara();
    var data = InforCenter_Platform_Object_GetObjectData(para.ObjectID, para);
    if (HoteamUI.Common.IsNullOrEmpty(data)) {
        return;
    }
    if (para.Mode && para.Mode == "all") {
        var copytoUserCtrl = page.GetControl('COPYTOUSER_Value');
        if (copytoUserCtrl.id != '') {
            var copyUserValue = data.RECIVER;
            if (data.COPYTOUSER != '') {
                copyUserValue = data.COPYTOUSER + ';' + copyUserValue;
            }
            var copyUserText = data.RECIVER_DisplayValue;
            if (data.COPYTOUSER_DisplayValue != '') {
                copyUserText = data.COPYTOUSER_DisplayValue + ";" + copyUserText;
            }

            var copyUserValueArr = [];
            var copyUserTextArr = [];
            var tmpCopyUserValueArr = copyUserValue.split(';');
            var tmpCopyUserTextArr = copyUserText.split(';');
            $.each(tmpCopyUserValueArr, function (index, value) {
                if (value != HoteamUI.Security.LoginPara.UserID) {
                    copyUserValueArr.push(value);
                    copyUserTextArr.push(tmpCopyUserTextArr[index]);
                }
            });

            copyUserValue = copyUserValueArr.join(';').replace(';;', ';');
            copyUserText = copyUserTextArr.join(';').replace(';;', ';');
            copytoUserCtrl.SetValue(copyUserValue);
            copytoUserCtrl.SetText(copyUserText);
        }
    }
    var reciverCtrl = page.GetControl('RECIVER_Value');
    if (reciverCtrl.id != '') {
        var reciverValue = data.SENDUSER;
        var reciverText = data.SENDUSER_DisplayValue;

        var reciverUserValueArr = [];
        var reciverUserTextArr = [];
        var tmpReciverUserValueArr = reciverValue.split(';');
        var tmpReciveUserTextArr = reciverText.split(';');
        $.each(tmpReciverUserValueArr, function (index, value) {
            //if (value != HoteamUI.Security.LoginPara.UserID) {
            reciverUserValueArr.push(value);
            reciverUserTextArr.push(tmpReciveUserTextArr[index]);
            //}
        });

        reciverValue = reciverUserValueArr.join(';').replace(';;', ';');
        reciverText = reciverUserTextArr.join(';').replace(';;', ';');
        reciverCtrl.SetValue(reciverValue);
        reciverCtrl.SetText(reciverText);
    }
    var mailTitleCtrl = page.GetControl('MAILTITLE_Value');
    if (mailTitleCtrl.id != '') {
        mailTitleCtrl.SetText("[" + HoteamUI.Language.Lang('AnswerInternalMali', 'Answer') + "]" + data.MTITLE);
    }
    var ImportantCtrl = page.GetControl('IMPORTANT_Value');
    if (ImportantCtrl.id != '') {
        InforCenter_Platform_Object_SetEnumRadioValue(ImportantCtrl, 'IMPORTANT', 'INTERNALMAIL', false);
        ImportantCtrl.SetSelectByValue(data.IMPORTANT);
    }

    //获取系统配置，根据配置决定主内容和附件是否带过来
    var IsHaveOldContent = HoteamUI.Common.GetValueBySettingKey("HaveOldContent");
    if (IsHaveOldContent != undefined && (IsHaveOldContent == true || IsHaveOldContent == 'true')) {
        var mailContentCtrl = page.GetControl('MAILCONTENT_Value');
        if (mailContentCtrl.id != '') {
            mailContentCtrl.SetText(data.MCONTENT_DisplayValue);
        }
        var pluginGrid = page.GetControl('ObjectListGrid');
        if (pluginGrid.id != '') {
            var gridStr = HoteamUI.DataService.Call("Hoteam.InforCenter.InternalMailService.GetInternalMailPluginByMailID", { para: { ObjectID: para.ObjectID } });
            pluginGrid.ClearGridRows();
            if (!HoteamUI.Common.IsNullOrEmpty(gridStr)) {
                var gridData = JSON.parse(gridStr);
                var objArray = [];
                $.each(gridData, function (i, d) {
                    objArray.push(JSON.parse(d));
                });
                pluginGrid.AddRows(objArray);
            }
        }
    }
    para.ObjectID = null;
    HoteamUI.Page.SetContainerParas(page.pid, page.PageName(), para);
}
//转发
InforCenter_Platform_TansferInternalMail_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var para = page.GetPara();
    var data = InforCenter_Platform_Object_GetObjectData(para.ObjectID, para);
    if (HoteamUI.Common.IsNullOrEmpty(data)) {
        return;
    }
    var reciverCtrl = page.GetControl('RECIVER_Value');
    if (reciverCtrl.id != '') {
        //reciverCtrl.SetValue(data.RECIVER);
        //reciverCtrl.SetText(data.RECIVER_DisplayValue);
    }
    var copytoUserCtrl = page.GetControl('COPYTOUSER_Value');
    if (copytoUserCtrl.id != '') {
        //copytoUserCtrl.SetValue(data.COPYTOUSER);
        //copytoUserCtrl.SetText(data.COPYTOUSER_DisplayValue);
    }
    var mailTitleCtrl = page.GetControl('MAILTITLE_Value');
    if (mailTitleCtrl.id != '') {
        mailTitleCtrl.SetText("[" + HoteamUI.Language.Lang('TransferInternalMali', 'Transfer') + "]" + data.MTITLE);
    }
    var ImportantCtrl = page.GetControl('IMPORTANT_Value');
    if (ImportantCtrl.id != '') {
        InforCenter_Platform_Object_SetEnumRadioValue(ImportantCtrl, 'IMPORTANT', 'INTERNALMAIL', false);
        ImportantCtrl.SetSelectByValue(data.IMPORTANT);
    }

    //获取系统配置，根据配置决定主内容和附件是否带过来
    var mailContentCtrl = page.GetControl('MAILCONTENT_Value');
    if (mailContentCtrl.id != '') {
        mailContentCtrl.SetText(data.MCONTENT_DisplayValue);
    }
    var pluginGrid = page.GetControl('ObjectListGrid');
    if (pluginGrid.id != '') {
        var gridStr = HoteamUI.DataService.Call("Hoteam.InforCenter.InternalMailService.GetInternalMailPluginByMailID", { para: { ObjectID: para.ObjectID } });
        pluginGrid.ClearGridRows();
        if (!HoteamUI.Common.IsNullOrEmpty(gridStr)) {
            var gridData = JSON.parse(gridStr);
            var objArray = [];
            $.each(gridData, function (i, d) {
                objArray.push(JSON.parse(d));
            });
            pluginGrid.AddRows(objArray);
        }
    }
    para.ObjectID = null;
    HoteamUI.Page.SetContainerParas(page.pid, page.PageName(), para);
}

InforCenter_Platform_InternalMail_OnCreate = function (pageEvent) {
    var para = pageEvent.o.GetPara();
    var msg = para.content;
    //处理当有多个提示弹窗情况
    var InternalMailContent_model_arr = $(".InternalMailContent");
    var InternalMailContent_model_arr_length = InternalMailContent_model_arr.length;
    $(InternalMailContent_model_arr[InternalMailContent_model_arr_length - 1]).html(msg);
    //$("#InternalMailContent").html(msg);
    var interval = 20 * 1000;
    if (HoteamUI.AppSets.MailWindowCloseInterval) {
        interval = parseInt(HoteamUI.AppSets.MailWindowCloseInterval) * 1000;
    }
    setTimeout(function () {
        HoteamUI.UIManager.Return(pageEvent.o.pid, null);
    }, interval);
}

InforCenter_Platform_InternalMail_OnClose = function (pageEvent) {
}
InforCenter_Platform_InternalMail_Read = function (ctrlEvent) {
    var pid = ctrlEvent.o.ContainerID();
    HoteamUI.UIManager.Return(pid, null);
    HoteamUI.DataService.AsyncCall("Hoteam.InforCenter.InternalMailService.MakeAllRead", {}, function (resutrndata, callcackpara) {
        InforCenter_Platform_InternalMail_UpdateMailManagePage();
    }, {});
}

InforCenter_Platform_InternalMail_MessageManage = function (ctrlEvent) {
    var pid = ctrlEvent.o.ContainerID();
    HoteamUI.UIManager.Return(pid, null);
    var itemName = "MailManagement";
    var title = HoteamUI.Language.Lang("NavigationItems.InternalMail");

    var result = HoteamUI.DataService.Call("Hoteam.InforCenter.InternalMailService.GetUnreadInfoType", {});
    var companyId = HoteamUI.Security.LoginPara.CompanyID.split('_')[1];
    var fixedId = "INTERNALMAILNODE_" + companyId + "RECIVE";
    if (result == "2") {
        fixedId = "INTERNALMAILNODE_" + companyId + "SYSTEM";
    }
    InforCenter_Platform_MainTabs_AddTab("TreeManagement", { ItemName: itemName, FixedEID: fixedId }, title, false);
}

//更新消息管理页面内容
InforCenter_Platform_InternalMail_UpdateMailManagePage = function () {
    var itemName = "MailManagement";
    var guid = $("[cid='HomePage_Content']").attr("id");
    var pageObject = HoteamUI.Page.Instance(guid);
    if (HoteamUI.Common.IsNullOrEmpty(itemName) == false) {
        tabsCtrl = pageObject.GetControl("HomePage_Tabs");
        if (tabsCtrl.GetTabIndexByTabId) {
            var tabIndex = tabsCtrl.GetTabIndexByTabId(itemName);
            if (tabIndex != -1) {
                tabsCtrl.UpdateTab(tabIndex, {
                    pageName: "TreeManagement",
                    tabId: itemName
                });
            }
        }
    }
}


InforCenter_Platform_InternalMail_ShowDetailPage = function (rowEvent) {
    var paras = {};
    paras.Data = rowEvent.rowobject;
    paras.ObjectID = paras.TabId = paras.SelectID = rowEvent.rowobject.EID;

    //权限判断
    var check = HoteamUI.DataService.Call('InforCenter.Common.WebActionService.CheckActionPermission', { para: { ActionType: "AUTO", ActionName: "BROWSE", SelectID: paras.ObjectID } });
    if (check == null) {
        return;
    }

    paras.ObjectType = InforCenter_Platform_GTypeFromID(paras.ObjectID);
    var objectInspectorConfig = null;
    $.each(ObjectInspectorsScript, function (index, val) {
        if (val.ObjectType == paras.ObjectType)
            objectInspectorConfig = JSON.parse(JSON.stringify(val));
    });
    if (objectInspectorConfig != null) {
        if (rowEvent.rowobject.EUID)
            paras.SelectEUID = rowEvent.rowobject.EUID;
        paras.ObjectInspectorConfig = objectInspectorConfig;
        InforCenter_Platform_ObjectInspector_AddMainTab(paras);
        isHave = true;
        InforCenter_Platform_ListViewCtrl_GetOnePageGridData(HoteamUI.Control.Instance(rowEvent.o.id), {});
    }
}

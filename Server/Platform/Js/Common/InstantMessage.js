InforCenter_Platform_InstantMessage_OnCreate = function (pageEvent) {
    var para = pageEvent.o.GetPara();
    var msg = para.content;
    $("#InstantMessageContent").html(msg);
}

InforCenter_Platform_InstantMessage_OnClose = function (pageEvent) {
    //var page = pageEvent.o;
    //if (page) {

    //}
    //alert("页面被关闭了");

    //HoteamUI.DataService.AsyncCall("InforCenter.Common.CommunicationService.ClearMessageShow", {}, function (resutrndata, callcackpara) {
    //    InforCenter_Platform_InstantMessage_UpdateMessageManagePage();
    //}, {});
}

InforCenter_Platform_InstantMessage_Read = function (ctrlEvent) {
    var pid = ctrlEvent.o.ContainerID();
    HoteamUI.UIManager.Return(pid, null);
    HoteamUI.DataService.AsyncCall("InforCenter.Common.CommunicationService.MakeAllRead", {}, function (resutrndata, callcackpara) {
        InforCenter_Platform_InstantMessage_UpdateMessageManagePage();
    }, {});
}

InforCenter_Platform_InstantMessage_MessageLinkClick = function () {
    var containerID = HoteamUI.Control.Instance($("#InstantMessageContent").parent().attr("id")).ContainerID();
    HoteamUI.UIManager.Return(containerID, null);
    HoteamUI.DataService.AsyncCall("InforCenter.Common.CommunicationService.MakeAllRead", {}, function (resutrndata, callcackpara) {
        InforCenter_Platform_InstantMessage_UpdateMessageManagePage();
    }, {});
}


InforCenter_Platform_InstantMessage_MessageManage = function (ctrlEvent) {
    var pid = ctrlEvent.o.ContainerID();
    HoteamUI.UIManager.Return(pid, null);
    var itemName = "MessageManagement";
    var title = HoteamUI.Language.Lang("NavigationItems.MessageManagement");
    InforCenter_Platform_MainTabs_AddTab("ListManagement", { ItemName: itemName }, title, false);
}

//更新消息管理页面内容
InforCenter_Platform_InstantMessage_UpdateMessageManagePage = function () {
    var itemName = "MessageManagement";
    var guid = $("[cid='HomePage_Content']").attr("id");
    var pageObject = HoteamUI.Page.Instance(guid);
    if (HoteamUI.Common.IsNullOrEmpty(itemName) == false) {
        tabsCtrl = pageObject.GetControl("HomePage_Tabs");
        if (tabsCtrl.GetTabIndexByTabId) {
            var tabIndex = tabsCtrl.GetTabIndexByTabId(itemName);
            if (tabIndex != -1) {
                tabsCtrl.UpdateTab(tabIndex, {
                    pageName: "ListManagement",
                    tabId: itemName
                });
            }
        }
    }
}
var userMessageLastUpdateTime = 0;
//登陆调用
//消息推送用的这个方法
InforCenter_Platform_ShowInstantMessage = function () {
    var exist = $("div[pagepagename='InstantMessage']").length > 0 ? true : false;
    if (exist != true) {
        if (HoteamUI.Security.LoginPara && HoteamUI.Security.LoginPara.LoginID) {
            HoteamUI.CallAjax.AsyncCall({
                servicepath: PlatformUI.WebServicePath,
                method: "CheckUserUnReadMessage",
                paras: {},
                showErrorMessage: false,
                callback: function (resutrndata, callcackpara) {
                    if (resutrndata.result == true && resutrndata.time && (resutrndata.time > userMessageLastUpdateTime || userMessageLastUpdateTime === 0)) {
                        userMessageLastUpdateTime = resutrndata.time;
                        HoteamUI.DataService.AsyncCall({
                            serviceuri: "InforCenter.Common.CommunicationService.UnreadInfo",
                            paras: {},
                            callback: function (resutrndata, callcackpara) {
                                try {
                                    var message = resutrndata;
                                    var number = parseInt(message.Num);
                                    if (number > 0 && $("#SmartHomePage_Message_Num").length > 0) {
                                        $("#SmartHomePage_Message_Num").html(number).show();
                                    } else if (number < 1 && $("#SmartHomePage_Message_Num").length > 0) {
                                        $("#SmartHomePage_Message_Num").empty().hide();
                                    }
                                    var content = HoteamUI.Language.Lang("InternalMail.Content");
                                    if (number == 1) {
                                        if (message.Link) {
                                            content = "<a href='javascript:" + message.Link + "\'>" + message.Content + "</a>";
                                        }
                                        else {
                                            content = message.Content;
                                        }
                                    }
                                    if (number > 0 && !$("#SmartHomePage_Message_Num").length > 0) {
                                        //页面存在ocx，不弹出
                                        if (HoteamUI.Common.OCXIframe.IsExist()) {
                                            return;
                                        }
                                        HoteamUI.UIManager.Popup({ pagename: "InternalMail", paras: { content: content }, afterOpen: function (dialogcontain) { dialogcontain.attr("data-dialogtype", "message"); } });
                                    }
                                }
                                catch (e) {
                                    HoteamUI.UIManager.MsgBox(e.name, "In Function-InforCenter_Platform_ShowInstantMessage:" + e.message, true);
                                }
                            },
                            callcackpara: null,
                            showErrorMessage: false
                        });

                    }
                }
            });
        }

    }
    else {
        HoteamUI.CallAjax.AsyncCall({
            servicepath: PlatformUI.WebServicePath,
            method: "UpdateUserLastConnectionTime",
            paras: {},
            showErrorMessage: false,
            callback: function () { }
        });
    }
    //定时读取
    var interval = parseInt(HoteamUI.AppSets.InstantMessageInterval) * 1000;
    if (interval != null && interval != undefined && !isNaN(interval)) {
        setTimeout(function () {
            InforCenter_Platform_ShowInstantMessage();
        }, interval);
    }

}

InforCenter_Platform_InstantMessage_Return = false;

Hoteam_Paltform_InstantMessage_Check = function () {
    var exist = $("div[pagepagename='InstantMessage']").length > 0 ? true : false;
    if (exist != true) {
        if (HoteamUI.Security.LoginPara && HoteamUI.Security.LoginPara.LoginID) {
            HoteamUI.CallAjax.AsyncCall({
                servicepath: PlatformUI.WebServicePath,
                method: "CheckUserUnReadMessage",
                paras: {},
                showErrorMessage: false,
                callback: function (resutrndata, callcackpara) {
                    if (resutrndata.result == true && resutrndata.time && (resutrndata.time > userMessageLastUpdateTime || userMessageLastUpdateTime === 0)) {
                        userMessageLastUpdateTime = resutrndata.time;
                        InforCenter_Platform_InstantMessage_Return = true;
                    }
                    else {
                        InforCenter_Platform_InstantMessage_Return = false;
                    }
                }
            });
        }
    }
    else {
        HoteamUI.CallAjax.AsyncCall({
            servicepath: PlatformUI.WebServicePath,
            method: "UpdateUserLastConnectionTime",
            paras: {},
            showErrorMessage: false,
            callback: function () { }
        });
    }
    return InforCenter_Platform_InstantMessage_Return;
}

Hoteam_Paltform_InstantMessage_CallBack = function (ret) {
    if (ret) {
        var resutrndata = JSON.parse(ret);
        try {
            var message = resutrndata;
            var number = parseInt(message.Num);
            if (number > 0 && $("#SmartHomePage_Message_Num").length > 0) {
                $("#SmartHomePage_Message_Num").html(number).show();
            } else if (number < 1 && $("#SmartHomePage_Message_Num").length > 0) {
                $("#SmartHomePage_Message_Num").empty().hide();
            }
            var content = HoteamUI.Language.Lang("InternalMail.Content");
            if (number == 1) {
                if (message.Link) {
                    content = "<a href='javascript:" + message.Link + "\'>" + message.Content + "</a>";
                }
                else {
                    content = message.Content;
                }
            }
            if (number > 0 && !$("#SmartHomePage_Message_Num").length > 0) {
                //读配置DefaultAlertType
                var alertType = "InternalMail";
                if (!HoteamUI.Common.IsNullOrEmpty(HoteamUI.AppSets.DefaultAlertType)) {
                    alertType = HoteamUI.AppSets.DefaultAlertType;
                }
                HoteamUI.UIManager.Popup({ pagename: alertType, paras: { content: content }, afterOpen: function (dialogcontain) { dialogcontain.attr("data-dialogtype", "message"); } });
            }
        }
        catch (e) {
            HoteamUI.UIManager.MsgBox(e.name, "In Function-InforCenter_Platform_ShowInstantMessage:" + e.message, true);
        }
    }
}

InforCenter_Platform_InstantMessage_OpenModule = function (para) {
    var pageName = "";
    var pagePara = {};
    var pageText = "";
    for (var item in para) {
        if (!para.hasOwnProperty(item)) {
            continue;
        }
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

InforCenter_Platform_InstantMessage_OpenObject = function (para) {
    HoteamUI.UIManager.Popup({
        pagename: "ViewObject",
        paras: { SelectID: para.ObjID },
        size: "960*420"
    });
    InforCenter_Platform_InstantMessage_MessageLinkClick();
}
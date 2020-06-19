/******************************************************************************
*    Copyright (c) 2012,山东山大华天软件有限公司
*    All rights reserved.
*
*    文件名称： MainTabs.js
*
*    创 建 人： 李士利
*    创建日期： 2013-01-01
*    初始版本： 1.0
*
*    修 改 人： 李士利
*    修改日期： 2013-01-01
*    当前版本： 1.0
******************************************************************************/

//添加主框架Tab页
InforCenter_Platform_MainTabs_AddTab = function (pageName, pagePara, pageText, isAdd, size, model, defaultmax) {
    if (HoteamUI.Security.LoginPara.HomePageMode == "DesktopHomePage") {
        PlatformUI_Desktop_OpenWindow({ pagename: pageName, paras: pagePara, size: size, title: pageText, model: model, defaultmax: defaultmax });
    } else {
        var guid = $("[cid='HomePage_Content']").attr("id");
        var pageObject = HoteamUI.Page.Instance(guid);
        if (HoteamUI.Common.IsNullOrEmpty(pageName) == false) {
            tabsCtrl = pageObject.GetControl("HomePage_Tabs");
            tabid = pageName;
            if (pagePara.TabId) {
                tabid = pagePara.TabId;
            } else if (pagePara.ItemName) {
                tabid = pagePara.ItemName;
            }
            var tabIndex = tabsCtrl.GetTabIndexByTabId(tabid);
            pagePara.HPTablsID = tabsCtrl.id;
            if (tabIndex == -1 || isAdd == true) {
                var index = tabsCtrl.GetSelectedTab();
                if (index === -1) {
                    index = 0;
                }
                else if (index >= 0) {
                    ++index;
                }
                tabsCtrl.AddTab({
                    pageName: pageName,
                    pageParas: pagePara,
                    isSelected: true,
                    text: pageText,
                    tabId: tabid
                }, index);
            } else {
                tabsCtrl.SelectTab(tabIndex);
                //更新页面内容
                tabsCtrl.UpdateTab(tabIndex, {
                    pageName: pageName,
                    tabId: tabid,
                    text: pageText,
                    pageParas: pagePara
                });
            }
        }
    }
};
InforCenter_Platform_MainTabs_RemoveTab = function (tabId, objectid, flag) {
    var guid = $("[cid='HomePage_Content']").attr("id");
    var pageObject = HoteamUI.Page.Instance(guid);
    tabsCtrl = pageObject.GetControl("HomePage_Tabs");
    var tabinfos = tabsCtrl.GetTabInfoList();
    var isRemove = false;
    for (var j = 0; j < tabinfos.length; j++) {
        var tabinfo = tabinfos[j];
        if (tabinfo.tabId == tabId) {
            if (tabinfo.pageParas.ObjectID == objectid || !tabinfo.pageParas.ObjectID) {
                var index = tabsCtrl.GetTabIndexByTabId(tabinfo.tabId);
                tabsCtrl.RemoveTab(index, flag);
                isRemove = true;
            }
        }
    }
    return isRemove;
}

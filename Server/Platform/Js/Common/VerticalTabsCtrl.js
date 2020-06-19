/***********************************
纵向Tab页相关处理
dyc 2016年4月23日
************************************/

//列表页面加载事件
InforCenter_Platform_VerticalTabsCtrl_LoadTabs = function (tabsPage, para, pageLinksName, objectType, sourceData) {
    var data = null
    if (sourceData != null) {
        //自定义PageLink配置项
        data = sourceData;
    }
    else {
        if (HoteamUI.Common.IsNullOrEmpty(pageLinksName) == false) {
            //根据PageLinksName获取一组PageLink
            data = InforCenter_Platform_GetTreeManagePageLinksByName(pageLinksName);
        }
        else if (HoteamUI.Common.IsNullOrEmpty(objectType) == false) {
            //根据对象类型获取一组PageLink
            data = InforCenter_Platform_GetTreeManagePageLinksByObjType(objectType);
        }
    }
    if (data != null) {
        tabCtrl = tabsPage.GetControl("Tabs");
        InforCenter_Platform_VerticalTabsCtrl_UpdateTabs(tabCtrl, data, para)
    }
    return data;
};

InforCenter_Platform_VerticalTabsCtrl_AddTabs = function (tabCtrl, tabId, pageName, pageParas, isSelected, text, isDelayLoadPage, isActiveRefresh, isShowLine) {
    if (pageName) {
        tabCtrl.AddTab({
            pageName: pageName,
            pageParas: pageParas,
            isSelected: isSelected,
            showContent: isSelected,
            text: text,
            tabId: tabId,
            delayLoadPage: isDelayLoadPage,
            activeRefresh: isActiveRefresh,
            showLine: isShowLine,
        });
    }
};
InforCenter_Platform_VerticalTabsCtrl_GetUrlPara = function (item, para) {
    var tmp = {};
    HoteamUI.Common.RemoveObjectField(para, "MenuName");
    if (HoteamUI.Common.IsNullOrEmpty(item.PagePara) == true) {
        tmp = JSON.parse(JSON.stringify(para));

    }
    else {
        tmp = item.PagePara;
        if (typeof item.PagePara === "string") {
            tmp = eval("(" + item.PagePara + ")");
            item.PagePara = tmp;
        }
        var tmpPara = JSON.parse(JSON.stringify(para));
        tmp = $.extend(tmpPara, tmp);
    }
    return tmp;
};

InforCenter_Platform_VerticalTabsCtrl_UpdateTabs = function (tabCtrl, currPageLinks, para, pageLinksName) {
    var tabs = tabCtrl.GetTabInfoList();
    if (currPageLinks != null
     && tabs.length > 0) {
        if (currPageLinks.length == tabs.length) {
            //   for (var index in currPageLinks) {
            for (var index = 0; index < currPageLinks.length; index++) {
                var item = currPageLinks[index];
                var pagePara = InforCenter_Platform_VerticalTabsCtrl_GetUrlPara(item, para);
                tabCtrl.UpdateTab(index, {
                    pageName: item.PageName,
                    pageParas: pagePara,
                    text: item.Text,
                    tabId: (pageLinksName || "") + item.Name
                });
            }
        }
        else if (currPageLinks.length > tabs.length) {
            // for (var index in tabs) {
            for (var index = 0; index < tabs.length; index++) {
                var item = currPageLinks[index];
                var pagePara = InforCenter_Platform_VerticalTabsCtrl_GetUrlPara(item, para);
                tabCtrl.UpdateTab(index, {
                    pageName: item.PageName,
                    pageParas: pagePara,
                    text: item.Text,
                    tabId: (pageLinksName || "") + item.Name
                });
            }
            //   for (var index in currPageLinks) {
            for (var index = 0; index < currPageLinks.length; index++) {
                if (index >= tabs.length) {
                    var item = currPageLinks[index];
                    var pagePara = InforCenter_Platform_VerticalTabsCtrl_GetUrlPara(item, para);
                    InforCenter_Platform_VerticalTabsCtrl_AddTabs(tabCtrl, item.Name, item.PageName, pagePara, false, item.Text, item.IsDelayLoadPage, item.ActiveRefresh, item.IsShowLine);
                }
            }
        }
        else {
            // for (var index in currPageLinks) {
            for (var index = 0; index < currPageLinks.length; index++) {
                var item = currPageLinks[index];
                var pagePara = InforCenter_Platform_VerticalTabsCtrl_GetUrlPara(item, para);
                tabCtrl.UpdateTab(index, {
                    pageName: item.PageName,
                    pageParas: pagePara,
                    text: item.Text,
                    tabId: (pageLinksName || "") + item.Name
                });
            }
            for (var i = tabs.length - 1; i >= currPageLinks.length; i--) {
                tabCtrl.RemoveTab(i);
            }
        }
        //选中指定的Tab页
        if (!isNaN(para.TabSelectedIndex)) {
            tabCtrl.SelectTab(para.TabSelectedIndex);
        }
    }
    else if (currPageLinks == null
    && tabs.length > 0) {
        //  for (var index in tabs) {
        for (var index = 0; index < tabs.length; index++) {
            tabCtrl.RemoveTab(index);
        }
    }
    else if (currPageLinks != null
    && tabs.length == 0) {
        var idx = 0;
        if (para.TabSelectedIndex) {
            idx = parseInt(para.TabSelectedIndex);
        }
        //  for (var index in currPageLinks) {
        for (var index = 0; index < currPageLinks.length; index++) {
            var item = currPageLinks[index];
            var isSelected = false;
            if (index == idx) {
                isSelected = true;
            }
            var pagePara = InforCenter_Platform_VerticalTabsCtrl_GetUrlPara(item, para);
            InforCenter_Platform_VerticalTabsCtrl_AddTabs(tabCtrl, item.Name, item.PageName, pagePara, isSelected, item.Text);
        }
    }
};


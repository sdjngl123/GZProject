//列表页面加载事件
InforCenter_Platform_TabsCtrl_LoadTabs = function (tabsPage, para, pageLinksName, objectType, sourceData) {
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
        if (HoteamUI.Common.IsNullOrEmpty(data.GetLinksItemJS) == false) {
            para.LinksData = data;
            data = HoteamUI.Common.ExeFunction(data.GetLinksItemJS, para);
        }
        var tabCtrl = tabsPage.GetControl("Tabs");
        if (para.TabOptions) {
            if (tabCtrl.ReInit) {
                tabCtrl.ReInit(para.TabOptions);
            }
        }
        if ((para.HideTitle || data.HideTitle) && tabCtrl.HideAllTitle) {
            tabCtrl.HideAllTitle();
        }
        //支持Js定位tab页
        if (!HoteamUI.Common.IsNullOrEmpty(para.FixedTab)) {
            InforCenter_Platform_TabsCtrl_SetSelectedLinkByFixedTab(tabCtrl, data, para.FixedTab);
        }
        InforCenter_Platform_TabsCtrl_UpdateTabs(tabCtrl, data, para, pageLinksName);
    }
    return data;
};

InforCenter_Platform_TabsCtrl_SetSelectedLinkByFixedTab = function (tabCtrl, pageLinksData, fixedTabName) {
    for (var i = 0; i < pageLinksData.PageLinks.length; i++) {
        pageLinksData.PageLinks[i].IsDelayLoadPage = true;
        pageLinksData.PageLinks[i].IsSelected = false;
        if (pageLinksData.PageLinks[i].Name == fixedTabName) {
            tabCtrl.SelectTab(i);
            pageLinksData.PageLinks[i].IsDelayLoadPage = false;
            pageLinksData.PageLinks[i].IsSelected = true;
        }
    }
}

InforCenter_Platform_TabsCtrl_AddTabs = function (tabCtrl, tabId, pageName, pageParas, isSelected, text, isDelayLoadPage, isActiveRefresh, isShowLine) {
    if (pageName) {
        tabCtrl.AddTab({
            pageName: pageName,
            pageParas: pageParas,
            isSelected: isSelected,
            text: text,
            tabId: tabId,
            delayLoadPage: isDelayLoadPage,
            activeRefresh: isActiveRefresh,
            showLine: isShowLine,
            height: pageParas.Height
        });
    }
};
InforCenter_Platform_TabsCtrl_GetUrlPara = function (item, para) {
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
        var tmpPagePara = JSON.parse(JSON.stringify(item.PagePara));
        var reg = /^\[.*?\]$/;
        for (var i in tmpPagePara) {
            if (!tmpPagePara.hasOwnProperty(i)) {
                continue;
            }
            var item = tmpPagePara[i];
            if (typeof item === "string" && reg.test(item)) {
                item = item.slice(1, item.length - 1);
                var result = InforCenter_Platform_MenuCtrl_GetParameters({ ParaList: [item] }, tmpPara);
                var retValue = result[item];
                if (retValue && retValue.length > 0) {
                    var ret = "";
                    // for (var v in retValue) {
                    for (var v = 0; v < retValue.length; v++) {
                        if (HoteamUI.Common.IsNullOrEmpty(retValue[v]) == false) {
                            ret += ";" + retValue[v];
                        }
                    }
                    if (HoteamUI.Common.IsNullOrEmpty(ret) == false) {
                        ret = ret.substring(1);
                    }
                    tmpPagePara[i] = ret;
                }

            }
        }
        tmp = $.extend(tmpPara, tmpPagePara);
    }
    return tmp;
};
InforCenter_Platform_TabsCtrl_UpdateTabs = function (tabCtrl, data, para, pageLinksName) {

    var tabs = tabCtrl.GetTabInfoList();
    var selectedidx = -1;
    var selectText = "";
    if (tabCtrl.GetSelectedTab) {
        selectedidx = tabCtrl.GetSelectedTab();
        if (selectedidx > -1)
            selectText = tabs[selectedidx].text;
    }
    var currPageLinks = [];
    for (var i = 0; i < data.PageLinks.length; i++) {
        var item = data.PageLinks[i];
        var pagePara = InforCenter_Platform_TabsCtrl_GetUrlPara(item, para);
        HoteamUI.UIManager.MergeUrl(item.Name, pagePara);
        var deney = InforCenter_Platform_TabsCtrl_CheckTabs(item, pagePara);
        if (deney != true) {
            currPageLinks.push(item);
        }
    }
    if (currPageLinks != null
     && tabs.length > 0) {
        var idx = -1;
        if (currPageLinks.length == tabs.length) {
            // for (var index in currPageLinks) {
            for (var index = 0; index < currPageLinks.length; index++) {
                var item = currPageLinks[index];
                var pagePara = InforCenter_Platform_TabsCtrl_GetUrlPara(item, para);
                HoteamUI.UIManager.MergeUrl(item.Name, pagePara);
                tabCtrl.UpdateTab(index, {
                    pageName: InforCenter_Platform_TabsCtrl_GetTabPageName(para, item),
                    pageParas: pagePara,
                    text: item.Text,
                    tabId: (pageLinksName || "") + item.Name,
                    delayLoadPage: item.IsDelayLoadPage,
                    activeRefresh: item.ActiveRefresh,
                    showLine: item.IsShowLine
                });
                if (item.Text == selectText)
                    idx = index;
            }
        }
        else if (currPageLinks.length > tabs.length) {
            // for (var index in tabs) {
            for (var index = 0; index < tabs.length; index++) {
                var item = currPageLinks[index];
                var pagePara = InforCenter_Platform_TabsCtrl_GetUrlPara(item, para);
                HoteamUI.UIManager.MergeUrl(item.Name, pagePara);
                tabCtrl.UpdateTab(index, {
                    pageName: InforCenter_Platform_TabsCtrl_GetTabPageName(para, item),
                    pageParas: pagePara,
                    text: item.Text,
                    tabId: (pageLinksName || "") + item.Name,
                    delayLoadPage: item.IsDelayLoadPage,
                    activeRefresh: item.ActiveRefresh,
                    showLine: item.IsShowLine
                });
                if (item.Text == selectText)
                    idx = index;
            }

            //for (var index in currPageLinks) {
            for (var index = tabs.length; index < currPageLinks.length; index++) {
                if (index >= tabs.length) {
                    var item = currPageLinks[index];
                    var pagePara = InforCenter_Platform_TabsCtrl_GetUrlPara(item, para);
                    HoteamUI.UIManager.MergeUrl(item.Name, pagePara);
                    InforCenter_Platform_TabsCtrl_AddTabs(tabCtrl, (pageLinksName || "") + item.Name, InforCenter_Platform_TabsCtrl_GetTabPageName(para, item), pagePara, false, item.Text, item.IsDelayLoadPage, item.ActiveRefresh, item.IsShowLine);
                }
                if (item.Text == selectText)
                    idx = index;
            }
        }
        else {
            //  for (var index in currPageLinks) {
            for (var index = 0; index < currPageLinks.length; index++) {
                var item = currPageLinks[index];
                var pagePara = InforCenter_Platform_TabsCtrl_GetUrlPara(item, para);
                HoteamUI.UIManager.MergeUrl(item.Name, pagePara);
                tabCtrl.UpdateTab(index, {
                    pageName: InforCenter_Platform_TabsCtrl_GetTabPageName(para, item),
                    pageParas: pagePara,
                    text: item.Text,
                    tabId: (pageLinksName || "") + item.Name,
                    delayLoadPage: item.IsDelayLoadPage,
                    activeRefresh: item.ActiveRefresh,
                    showLine: item.IsShowLine
                });
                if (item.Text == selectText)
                    idx = index;
            }
            for (var i = tabs.length - 1; i >= currPageLinks.length; i--) {
                //不自动选中
                tabCtrl.RemoveTab(i, true);
            }

            if (selectedidx >= currPageLinks.length)
                idx = currPageLinks.length - 1;
        }
        if (idx > -1) {
            if (tabCtrl.SelectTab) {
                tabCtrl.SelectTab(idx);
            }
        }
    }
    else if (currPageLinks == null
    && tabs.length > 0) {
        // for (var index in tabs) {
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
        else if (data.TabSelectedIndex) {
            idx = parseInt(data.TabSelectedIndex);
        }
        // for (var index in currPageLinks) {
        for (var index = 0; index < currPageLinks.length; index++) {
            var item = currPageLinks[index];

            var pagePara = InforCenter_Platform_TabsCtrl_GetUrlPara(item, para);
            HoteamUI.UIManager.MergeUrl(item.Name, pagePara);
            var isSelected = false;
            if (index == idx) {
                isSelected = true;
            }
            InforCenter_Platform_TabsCtrl_AddTabs(tabCtrl, (pageLinksName || "") + item.Name, InforCenter_Platform_TabsCtrl_GetTabPageName(para, item), pagePara, isSelected, item.Text, item.IsDelayLoadPage, item.ActiveRefresh, item.IsShowLine);
        }
    }
};
InforCenter_Platform_TabsCtrl_CheckTabs = function (tab, para) {
    var pathUrl = para.Url.slice(0);
    var path = pathUrl.reverse().join(";");
    var flag = false;
    for (var i = 0; i < PlatformUI.Permission.length; i++) {
        var curPermission = PlatformUI.Permission[i];
        if (curPermission.Path == path && curPermission.Name == tab.Name) {
            flag = true;
            break;
        }
    }
    return flag;
}

InforCenter_Platform_TabsCtrl_GetTabPageName = function (para, item) {
    var pn = item.PageName;
    if (item.CheckContentPermission == true && para.ContentPermission == false) {
        pn = PlatformUI.UIManager.NoPermission;
    }
    return pn;
};
InforCenter_Platform_TabsCtrl_OnQuery = function (pageEvent) {
    HoteamUI.Page.FireParentPageEvent(pageEvent.o.pid, 'OnQuery', pageEvent);
};
InforCenter_Platform_TabsCtrl_OnNodeChange = function (pageEvent) {
    HoteamUI.Page.FireParentPageEvent(pageEvent.o.pid, 'OnNodeChange', pageEvent);
};

InforCenter_Platform_TabsCtrl_OnTabChange = function (ctrlEvent) {
    var functionName = 'InforCenter_TabPage_' + ctrlEvent.tabid + '_OnChanged';
    if (window[functionName] && typeof window[functionName] == "function") {
        var change = HoteamUI.Common.ExeFunction(functionName, ctrlEvent);
        if (change == false) {
            //禁止更换，切换回来
            var ctrl = ctrlEvent.o;
            var tabIndex = ctrl.GetTabIndexByTabId(ctrlEvent.tabid);
            setTimeout(ctrl.SelectTab(tabIndex), 10);
            return false;
        }
    }

    HoteamUI.Page.FireParentPageEvent(ctrlEvent.o.ContainerID(), 'OnTabChange', ctrlEvent);
    //加载后激发父页面的加载成功事件
    var pid = ctrlEvent.o.ContainerID();
    HoteamUI.Page.FireParentPageEvent(pid, "OnLoadSuccess", { listcid: HoteamUI.Page.Instance(HoteamUI.Page.ParentPage(pid)).GetControl("ListViewPage").id });
};


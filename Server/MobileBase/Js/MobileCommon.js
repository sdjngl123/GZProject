HMUI.MobileList = {};
//获取列表数据信息
HMUI.MobileList.RefreshMobileListData = function (pagePara, switchType, isRefreshParentMenu) {

    if (switchType == "self") {
        var last = HMUI.UIManager.GetLastPagePathValue();
        var listName = last.Paras.ListName;
        if (pagePara != null) {
            listName = pagePara.ListName;
        }
        var listConfig = HMUI.UIManager.GetMobileListConfig(listName);
        HMUI.MobileList.LoadList(last.PID, listConfig, pagePara);
        if ((isRefreshParentMenu === undefined) == false) {
            //父对象生成菜单
            var defaultMSort = HMUI.MobileList.BuildParentObjectBar($("#PageContainer .footernav"), listConfig, pagePara);
        }
    }
    else {
        pagePara.SwitchType = switchType;
        HMUI.UIManager.ShowInLeft("MobileList", pagePara, "slide", false);
    }
};
//调整列表加载方式为异步方式,且在首次加载时使用
HMUI.MobileList.LoadList = function (pid, listConfig, pagePara, isAppend) {

    HMUI.MobileList.CacheData = null;
    HMUI.MobileList.CacheDataType = null;
    HMUI.MobileList.LastData = null;

    HMUI.LoadingScreen.Show();

    var callback = function (data, para) {

        var pid = para.pid,
            listConfig = para.listConfig,
            pagePara = para.pagePara,
            isAppend = para.isAppend,
            lists = data,
            listCacheData,
            cacheListData;

        lists.PageIndex = pagePara.PageIndex;
        //载入列表分页数据缓存
        if ((!lists.RefreshDirection || lists.RefreshDirection !== "NULL") && lists && lists.ListItemDataList && lists.ListItemDataList.length > 0) {
            //获取每页实际显示的数据
            cacheListData = lists.ListItemDataList.splice(HMUI.MobileList.RowCount);
            HMUI.MobileList.ShowList(pid, listConfig, pagePara, isAppend, lists);

            HMUI.MobileList.CacheData = lists;
            HMUI.MobileList.CacheData.ListItemDataList = cacheListData;
            HMUI.MobileList.CacheDataType = "NextPageCache";
        }
        else {
            HMUI.MobileList.ShowList(pid, listConfig, pagePara, isAppend, lists);
        }



        if (lists != null && lists.DefaultMSort != null) {
            ret = lists.DefaultMSort;
        }

        HMUI.LoadingScreen.Hide();
    };

    pagePara.MaxRowCount = HMUI.AppSets.MaxRowCount;

    if (pagePara.MasterItemDefaultView === undefined) {
        pagePara.MasterItemDefaultView = HMUI.AppSets.MasterItemDefaultView;
    }
    var callbackpara = {
        pid: pid,
        listConfig: listConfig,
        pagePara: pagePara,
        isAppend: isAppend
    };

    HMUI.WebService.AsyncCallData(HMUI.BaseServicePath, "GetListData", { para: pagePara }, callback, callbackpara);
}



//列表缓存分页数据
HMUI.MobileList.CacheData = {};

HMUI.MobileList.CacheDataType = null;

//每页加载的数据量
HMUI.MobileList.RowCount = 20;

HMUI.MobileList.LastData = null;

//异步加载列表数据
HMUI.MobileList.AsyncLoadList = function (option) {

    var pid = option.pid,
        listConfig = option.listConfig,
        pagePara = option.pagePara,
        isAppend = option.isAppend,
        scrollObj = option.scrollObj,
        scrollContainer = option.scrollContainer,
        pushType = option.pushType,
        callback = option.callback;

    pagePara.MaxRowCount = HMUI.AppSets.MaxRowCount;
    if (pagePara.MasterItemDefaultView === undefined) {
        pagePara.MasterItemDefaultView = HMUI.AppSets.MasterItemDefaultView;
    }
    var callbackpara = {
        pid: pid,
        listConfig: listConfig,
        pagePara: pagePara,
        scrollContainer: scrollContainer,
        scrollObj: scrollObj,
        isAppend: isAppend
    };

    HMUI.WebService.AsyncCallData(HMUI.BaseServicePath, "GetListData", { para: pagePara }, callback, callbackpara);

}


HMUI.MobileList.ShowList = function (pid, listConfig, pagePara, isAppend, lists, bindScroll) {
    var isSelectFirst = false;
    if (HMUI.AppSets.MobileDevice != "Phone") {
        if (lists != null && lists.ListItemDataList != null && lists.ListItemDataList.length > 0
             && lists.ListItemDataList[0].IsExtend == false
             && lists.ListItemDataList[0].IsCancelSelect == false) {
            var item = lists.ListItemDataList[0];

            var para = {};
            para.ObjectType = item.ObjectType;
            para.ObjectID = item.ObjectID;
            para.ObjectText = item.Text;
            para.ListName = pagePara.ListName;
            HMUI.MobileList.OpenObjectPropertyPage(para, item.IsExtend ? "true" : "false");
            isSelectFirst = true;
        }
        else {
            if (!isAppend) {
                $("#rightcontent").html("");
                $("#rightheader div>ul:first").html("");
            }
        }
    }
    if (lists != null && lists.ListItemDataList != null) {
        lists.PageIndex = pagePara.PageIndex;
        HMUI.MobileList.BuildList($("#" + pid + " .pagelistview-conatiner"), lists, listConfig, pagePara.ListName, isSelectFirst, isAppend, bindScroll);
    }
}

//返回上一页
HMUI.MobileList.GetPreviousOpenPath = function () {
    var ret = HMUI.UIManager.GetToOpenPath("previous");
    if (ret != null && ret.openPage != null && ret.openPage.PID) {
        if (ret.IsFirst) {
            HMUI.MobileCommon.ShowHeaderNavButton();
            HMUI.MobileCommon.HideHeaderBackButton();
        }
        else {
            HMUI.MobileCommon.ShowHeaderNavButton();
            HMUI.MobileCommon.ShowHeaderBackButton();
        }

        return true;
    }

    return false;
};

HMUI.MobileList.GetToOpenPath = function (index) {
    var ret = HMUI.UIManager.GetToOpenPath(index);
    if (ret != null && ret.openPage != null) {
        if (ret.IsFirst) {
            HMUI.MobileCommon.HideHeaderBackButton();
            HMUI.MobileCommon.ShowHeaderNavButton();
        }
        else {
            HMUI.MobileCommon.ShowHeaderNavButton();
            HMUI.MobileCommon.ShowHeaderBackButton();
        }
    }
};

HMUI.MobileList.GotParentListPage = function () {
    var index = -1;
    if (HMUI.AppSets.MobileDevice == "Phone") {
        index = -2;
    }
    var ret = HMUI.UIManager.GetToOpenPath(index);
    if (ret != null && ret.openPage != null) {
        if (ret.IsFirst) {
            HMUI.MobileCommon.HideHeaderBackButton();
            HMUI.MobileCommon.ShowHeaderNavButton();
        }
        else {
            HMUI.MobileCommon.ShowHeaderNavButton();
            HMUI.MobileCommon.ShowHeaderBackButton();
        }
    }
};

HMUI.MobileList.RefreshCurrentPage = function () {

    if (HMUI.Window.CheckIsOffLine()) {
        HMUI.UIManager.MsgBox(HMUI.Language.Lang("MobileLogin.OfflineDisableOperate"));
    }
    else {
        var ret = HMUI.UIManager.GetToOpenPath("last");
        if (ret != null && ret.openPage != null) {
            if (ret.IsFirst) {
                HMUI.MobileCommon.HideHeaderBackButton();
                HMUI.MobileCommon.ShowHeaderNavButton();
            }
            else {
                HMUI.MobileCommon.ShowHeaderNavButton();
                HMUI.MobileCommon.ShowHeaderBackButton();
            }
        }
    }
};

//生成整个列表
HMUI.MobileList.BuildList = function (ctrl, lists, listConfig, listName, isSelectFirst, isAppend, bindScroll) {

    var listview = "";
    var listviewItemHteml = [];
    var showPager = false;

    //重新实现列表显示
    var cacheData = HMUI.MobileList.CacheData ? HMUI.MobileList.CacheData.ListItemDataList : null,
        cacheDataType = HMUI.MobileList.CacheDataType,
        lastData = HMUI.MobileList.LastData ? HMUI.MobileList.LastData.ListItemDataList : null,
        pageIndex = lists.PageIndex,
        item,
        preItem;

    for (var i = 0; i < lists.ListItemDataList.length; i++) {
        item = lists.ListItemDataList[i];
        if (HMUI.Common.IsNullOrEmpty(item.GroupName) == false) {

            //首次加载首页第一项存在分组,显示分组
            if (i === 0 && !lastData) {
                listview += "<li data-role='list-divider'>" + item.GroupName + " </li>";
            }
            //本次加载的列表项对比，与前一个不同，显示分组
            else if (i > 0) {
                preItem = lists.ListItemDataList[i - 1];
                if (preItem.GroupName !== item.GroupName) {
                    listview += "<li data-role='list-divider'>" + item.GroupName + " </li>";
                }
            }
            else if (i === 0 && pageIndex > 1 && lastData && lastData.length > 0 && cacheDataType === "NextPageCache") {
                preItem = lastData[lastData.length - 1];
                if (preItem.GroupName !== item.GroupName) {
                    listview += "<li data-role='list-divider'>" + item.GroupName + " </li>";
                }
            }
            //在列表缓存中向上翻页时，加载项为首页首个，显示分组
            else if (pageIndex === 1 && cacheDataType === "PrePageCache" && cacheData && (cacheData.length < 1)) {
                listview += "<li data-role='list-divider'>" + item.GroupName + " </li>";
            }
            //在列表缓存中向上翻页时，加载项为首页首个，显示分组
            else if (cacheDataType === "PrePageCache" && cacheData && (cacheData.length > 0)) {
                preItem = cacheData[cacheData.length - 1];
                if (preItem.GroupName !== item.GroupName) {
                    listview += "<li data-role='list-divider'>" + item.GroupName + " </li>";
                }
            }

            listview += HMUI.MobileList.BuildListSingleItem(listName, listConfig, item, isSelectFirst);
        }
        else {
            listview += HMUI.MobileList.BuildListSingleItem(listName, listConfig, item, isSelectFirst);
        }
    }

    var list = ctrl.find(".pagelistview"),
        refreshDirection = lists.RefreshDirection,
        nodataMsg = ctrl.find(".pagelistview-nodata");



    if (isAppend === true) {
        list.append(listview);
    }
    else if (isAppend == "prepend") {
        list.prepend(listview);
    }
    else {

        if (!listview && nodataMsg.length === 0) {
            ctrl.prepend("<div class='pagelistview-nodata'>未查询到信息</div>");
        }
        else if (listview) {
            nodataMsg.remove();
        }

        list.html(listview);

    }

    list.listview('refresh').find("[data-role='controlgroup']").controlgroup();
    if (isSelectFirst) {
        list.find("a:first").addClass("ui-btn-active");
    }

    if (bindScroll !== false) {

        //列表下拉重新加载，上拉加载分页
        if (refreshDirection && refreshDirection !== "NULL") {
            showPager = true;
        }

        HMUI.MobileList.BindingScroll(ctrl, showPager);
    }

    HMUI.MobileList.LastData = JSON.parse(JSON.stringify(lists));
};


HMUI.MobileList.IScroll = null;

//绑定加载、分页功能
HMUI.MobileList.BindingScroll = function (ctrl, showPager) {

    //已经创建滚动插件，则执行刷新，更新控制数据
    if (HMUI.MobileList.IScroll) {
        HMUI.MobileList.IScroll.scrollTo(0, 0);
        HMUI.MobileList.IScroll.refresh();
        return;
    }

    //未创建滚动插件，则根据分页控制标记showPager创建滚动插件
    var container = ctrl[0],
        scrollContainer = $(container).find(".pagelistview"),
        pullDownEl = container.querySelector('.pullDown'),
        pullDownOffset = 0,
        pullUpEl = container.querySelector('.pullUp'),
        pullUpOffset = 0,
        scroll = null,
        opt = {};

    opt = {
        useTransition: false,
        hScrollbar: false,
        vScrollbar: false,
        hideScrollbar: true,
        topOffset: pullDownOffset,
        onScrollMove: function () {
            var pullDownFlip = !!pullDownEl.className.match('flip'),
                pullUpFlip = !!pullUpEl.className.match('flip');

            if (this.y > 5 && !pullDownFlip) {

                this.minScrollY = 0;

            } else if (this.y < 5 && pullDownFlip) {

                this.minScrollY = -pullDownOffset;

            } else if (this.y < (this.maxScrollY - 5) && !pullUpFlip) {

                this.maxScrollY = this.maxScrollY;

            } else if (this.y > (this.maxScrollY + 5) && pullUpFlip) {

                this.maxScrollY = pullUpOffset;
            }
        }
    };

    if (showPager) {
        $.extend(opt, {
            pageIndex: -1,
            onScrollStart: function () {
                var last = HMUI.UIManager.GetLastPagePathValue();
                if (last.Paras && last.Paras.PageIndex) {
                    pageIndex = last.Paras.PageIndex;
                }
            },
            onRefresh: function () {
                if (pullDownEl.className.match('loading')) {
                    pullDownEl.className = 'pullDown';
                } else if (pullUpEl.className.match('loading')) {
                    pullUpEl.className = 'pullUp';
                }
            },
            onScrollMove: function () {
                //console.log("-------------------------------------");
                var pullDownSign = !!pullDownEl.className.match('flip'),
                    pullUpSign = !!pullUpEl.className.match('flip'),
                    hasContent = scrollContainer.height() > 8 ? true : false;

                if (this.y > 5 && !pullDownSign && !pullUpSign && hasContent) {

                    pullDownEl.className = 'pullDown flip';
                    if (pageIndex > 1 || (pageIndex <= 1 && HMUI.MobileList.CacheDataType == "PrePageCache" && HMUI.MobileList.CacheData.ListItemDataList && HMUI.MobileList.CacheData.ListItemDataList.length > 0)) {
                        pullDownEl.querySelector('.pullDownLabel').innerText = '加载上一页';
                    }
                    else {
                        pullDownEl.querySelector('.pullDownLabel').innerText = "重新加载";
                    }

                    pullDownEl.style.display = "block";
                    this.minScrollY = 0;
                    //window.console.log("【重新加载】：pullDown-start-maxScrollY:" + this.maxScrollY);

                } else if (this.y < 5 && pullDownSign) {

                    //pullDownEl.className = 'pullDown flip';
                    this.minScrollY = -pullDownOffset;
                    //window.console.log("重新加载：pullDown-other-maxScrollY:" + this.maxScrollY);

                } else if (this.y > 5 && pullDownSign && hasContent && (pageIndex > 1 || (pageIndex <= 1 && HMUI.MobileList.CacheDataType == "PrePageCache" && HMUI.MobileList.CacheData.ListItemDataList && HMUI.MobileList.CacheData.ListItemDataList.length > 0))) {

                    pullDownEl.querySelector('.pullDownLabel').innerText = '松手加载上一页';


                } else if (this.y < (this.maxScrollY - 5) && this.y < 0 && !pullDownSign && !pullUpSign && hasContent) {

                    pullUpEl.className = 'pullUp flip';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载下一页';
                    pullUpEl.style.visibility = "visible";
                    this.maxScrollY = this.maxScrollY;
                    //window.console.log("pullUp-【加载下一页】-maxScrollY:" + this.maxScrollY);

                } else if (this.y > (this.maxScrollY + 5) && pullUpSign && !pullDownSign) {

                    pullUpEl.className = 'pullUp';
                    this.maxScrollY = pullUpOffset;
                    //window.console.log("pullUp-加载下一页other-maxScrollY:" + this.maxScrollY);

                }
                else if (this.y < 0 && pullUpSign && !pullDownSign) {

                    //                    window.console.log("松手加载下一页");
                    pullUpEl.querySelector('.pullUpLabel').innerText = '松手加载下一页';
                }


                //                window.console.log("pullDownSign:" + pullDownSign);
                //                window.console.log("pullUpSign:" + pullUpSign);
                //                window.console.log("y:" + this.y)
                //                window.console.log("minScrollY:" + this.minScrollY);
                //                window.console.log("maxScrollY:" + this.maxScrollY);

            },
            onScrollEnd: function () {

                if (pullDownEl.className.match('flip')) {
                    pullDownEl.className = 'pullDown loading';
                    pullDownEl.querySelector('.pullDownLabel').innerText = '刷新中...';
                    HMUI_InforCenter_MobileList_RefreshPage(container, scroll);
                    //window.console.log("log:刷新中...完成");
                } else if (pullUpEl.className.match('flip')) {
                    pullUpEl.className = 'pullUp loading';
                    pullUpEl.querySelector('.pullUpLabel').innerText = '加载中...';
                    HMUI_InforCenter_MobileList_LoadNextPage(container, scroll);
                    //window.console.log("log:加载中完成");
                }
            }
        });
    }

    scroll = new iScroll($(container).find(".scroller")[0], opt);

    HMUI.MobileList.IScroll = scroll;

    setTimeout(function () {
        if (HMUI.MobileList.IScroll) {
            HMUI.MobileList.IScroll.refresh();
        }
    }, 500);

}

//生成单个列表项
HMUI.MobileList.BuildListSingleItem = function (listName, listConfig, item, isSelectFirst) {
    var itemwidth;
    if (HMUI.AppSets.MobileDevice == "Phone") {
        itemwidth = $(window).width() - 38 * 2 - 70; /*实际文本宽度*/
    }
    else {
        itemwidth = $(window).width() * 0.3 - 38 * 2 - 70; /*实际文本宽度*/
    }

    var isExtend = item.IsExtend;
    var listObjectType = item.ObjectType;
    if (isExtend) {
        isExtend = "";
    }
    else {
        isExtend = "data-icon='false'";
    }
    var listicons = "", listSp = ""; /*列表图标和js方法*/
    if (listConfig && listConfig.MobileObjectMenus && listConfig.MobileObjectMenus.length > 0) {
  
        for (var j = 0; j < listConfig.MobileObjectMenus.length; j++) {
            var menus = listConfig.MobileObjectMenus[j];
            if (menus.IsHide == true) {
                continue;
            }
            //列表配置项
            if (menus.Position == "ListItem") {
                var flag = true;
                if (HMUI.Common.IsNullOrEmpty(item.NextRequestPara) == false && item.NextRequestPara != "null") {
                    var tempPara = JSON.parse(item.NextRequestPara);
                    if (menus.Condition && HMUI.MobileList.CheckCondition(tempPara, menus.Condition) == false) {
                        flag = false;
                    }
                }
                if (flag) {

                    var configObjectType = menus.ObjectType;
                    if (listObjectType == configObjectType) {
                        if (menus.Image && !menus.BackgroundColor) {
                            var param = ' JsMethod="' + menus.JsMethod + '"  OfflineDisable="' + menus.OfflineDisable + '" onclick="HMUI.MobileList.ListViewImageClick(this);return false;"',
                        imageUrl = (menus.Image).toLowerCase(),
                        icon = ['<span class="ui-btn ui-corner-all ui-btn-icon-notext" ' + param + '>',
                                                    '<svg class="icon"><use xlink:href="' + HMUI.LoadImages.ImagesBaseUrl + imageUrl + '"></use></svg>',
                                '</span>'].join("");

                            listicons += icon;
                        } else if (menus.BackgroundColor) {
                            var param = ' JsMethod="' + menus.JsMethod + '"  OfflineDisable="' + menus.OfflineDisable + '" onclick="HMUI.MobileList.ListViewImageClick(this);return false;"',
                        span = '<span' + param + ' class="ui-li-operTitle" style="background-color:' + menus.BackgroundColor + '">' + menus.Text + '</span>';
                            listSp += span;
                        }
                    }
                }
            }
        }
    }

    //列表图像
    var image = "";
    if (!HMUI.Common.IsNullOrEmpty(item.Image)) {
        image = (item.Image).toLowerCase();
    }
    var objectText = item.Text.replace(/'/g, "").replace(/</g, "").replace(/>/g, "");
    var param = isExtend +
                " ObjectID='" + item.ObjectID +
                "' ObjectType='" + item.ObjectType +
                "' ObjectText='" + objectText +
                "' ListName='" + listName +
                "' NextRequestPara='" + item.NextRequestPara +
                "' IsExtend='" + item.IsExtend + "'",
        imageUrl = image,
        titel = item.Text,
        descript = item.Describe;

    var singleItemHtml = ['<li ' + param + ' class="ui-li-has-thumb" >',
                            '<div class="ui-li-operDiv">',
                                listSp,
                            '</div>',
                             '<a href="#" class="ui-nodisc-icon ui-alt-icon">',
                                 '<svg class="icon"><use xlink:href="' + HMUI.LoadImages.ImagesBaseUrl + imageUrl + '"></use></svg>',
                                '<h2 style="width:' + itemwidth + 'px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;">' + titel + '</h2>',
                                '<p style="width:' + itemwidth + 'px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;">' + descript + '</p>',
                                '<div data-role="controlgroup" data-type="horizontal">',
                                    listicons,
                                '</div>',
                            '</a>',
                        '</li>'].join("");

    return singleItemHtml;
};

//生成当前对象的操作菜单接口
HMUI.MobileList.BuildObjectBar = function (ctrl, listConfig, pagePara) {
    if (HMUI.Common.IsNullOrEmpty(pagePara.ObjectType) == true) {
        pagePara.ObjectType = "ListRoot";
    }
    var listview = "";
    if (listConfig && listConfig.MobileObjectMenus && listConfig.MobileObjectMenus.length > 0) {
        for (var j = 0; j < listConfig.MobileObjectMenus.length; j++) {
            
            var menu = listConfig.MobileObjectMenus[j];
            if (menu.IsHide == true) {
                continue;
            }
            if (menu.ObjectType == pagePara.ObjectType && menu.Position == "ObjectBar") {


                var onclick = " onclick = 'HMUI.MobileList.ObjectBarClick(this);return false;' ",
                    param = " ObjectID='" + pagePara.ObjectID + "' ObjectType='" + pagePara.ObjectType + "' ObjectText='" + pagePara.ObjectText + "' ListName='" + pagePara.ListName + "' JsMethod='" + menu.JsMethod + "' SwitchType='" + pagePara.SwitchType + "' OfflineDisable='" + menu.OfflineDisable + "' ",
                    text = menu.Text,
                    imgUrl = ('icon-' + menu.Image).toLowerCase();
                if (HMUI.AppSets.MobileDevice == "Phone") {
                    listview += '<li class="ui-block-b">';
                    listview += '<a href="#" class="ui-link ui-btn ui-btn-icon-top"  ' + onclick + param + ' ><svg class="icon"><use xlink:href="' + HMUI.LoadImages.ImagesBaseUrl + imgUrl + '"></use></svg><span>' + text + '</span></a>';
                    listview += '</li>';
                }
                else {
                    listview += '<li class="ui-block-b">';
                    listview += '<a href="#" class="ui-link ui-btn ui-btn-icon-left"  ' + onclick + param + ' ><svg class="icon"><use xlink:href="' + HMUI.LoadImages.ImagesBaseUrl + imgUrl + '"></use></svg><span>' + text + '</span></a>';
                    listview += '</li>';
                }
            }

        }
    }
    ctrl.html(listview);
};
//生成父级对象的操作菜单接口
HMUI.MobileList.BuildParentObjectBar = function (ctrl, listConfig, pagePara) {

    if (HMUI.Common.IsNullOrEmpty(pagePara.ObjectType) == true) {
        pagePara.ObjectType = "ListRoot";
    }
    var listview = "";
    if (listConfig && listConfig.MobileObjectMenus && listConfig.MobileObjectMenus.length > 0) {
        for (var j = 0; j < listConfig.MobileObjectMenus.length; j++) {
            var menu = listConfig.MobileObjectMenus[j];
            if (menu.IsHide == true) {
                continue;
            }
            if (menu.ObjectType == pagePara.ObjectType && menu.Position == "ParentObjectBar") {

                if (!menu.Condition || HMUI.MobileList.CheckCondition(pagePara, menu.Condition)) {

                    var onclick = " onclick = 'HMUI.MobileList.ObjectBarClick(this);return false;' ",
                    param = " ObjectID='" + pagePara.ObjectID + "' ObjectType='" + pagePara.ObjectType + "' ObjectText='" + pagePara.ObjectText + "' ListName='" + pagePara.ListName + "' JsMethod='" + menu.JsMethod + "' SwitchType='" + pagePara.SwitchType + "' OfflineDisable='" + menu.OfflineDisable + "' ",
                    text = menu.Text,
                    imgUrl = ("icon-" + menu.Image).toLowerCase();

                    listview += '<li class="ui-block-b">';
                    listview += '<a href="#" class="ui-link ui-btn ui-btn-icon-top"  ' + onclick + param + ' >' + text + '<svg class="icon"><use xlink:href="' + HMUI.LoadImages.ImagesBaseUrl + imgUrl + '"></use></svg></a>';
                    listview += '</li>';
                }
            }
        }
    }
    ctrl.html(listview);
};
HMUI.MobileList.CheckCondition = function (pagePara, condition) {

    return Function.constructor("pagePara", "return pagePara." + condition + ";")(pagePara);
};
//列表过滤生成
HMUI.MobileList.BuildListFilterOrSort = function (ctrl, listName, items, objectType, selected) {

    if (HMUI.Common.IsNullOrEmpty(objectType) == true) {
        objectType = "ListRoot";
    }

    var listview = "";
    var listviewItemHteml = [];

    for (var i = 0; i < items.length; i++) {
        var item = items[i];

        if (HMUI.Common.IsNullOrEmpty(objectType) == false && item.ParentObjectType.indexOf(objectType) > -1) {
            if (HMUI.Common.IsNullOrEmpty(item.GroupName) == false) {
                var group = null;
                $.each(listviewItemHteml, function (index, val) {
                    if (val.GroupName == item.GroupName) {
                        group = val;
                    }
                });
                var groupHtml = "";
                if (group == null) {

                    groupHtml = '<li data-role="list-divider">';
                    groupHtml += "  <h4>" + item.GroupName + "</h4>";
                    groupHtml += "</li>";
                    groupHtml += "<li class='list-content'>";
                    groupHtml += '  <form data-role="controlgroup" data-inset="false">';

                }
                else {
                    groupHtml = group.GroupHtml;
                    listviewItemHteml.pop(group);
                }
                groupHtml += HMUI.MobileList.BuildListSingleFilterOrSort(listName, item, selected);
                listviewItemHteml.push({ GroupName: item.GroupName, GroupHtml: groupHtml });
            }
            else {
                listview += HMUI.MobileList.BuildListSingleFilterOrSort(listName, item, selected);
            }
        }
    }

    for (var i = 0; i < listviewItemHteml.length; i++) {
        var item = listviewItemHteml[i];
        listview += item.GroupHtml;
        listview += "   </form>";
        listview += "</li>";
    }

    ctrl.html(listview);
    ctrl.listview();
    ctrl.find('[data-role="controlgroup"]').controlgroup();

    //遍历已经选中的值
    if (HMUI.Common.IsNullOrEmpty(selected) == false) {
        for (var i = 0; i < selected.length; i++) {
            $("label[name='" + selected[i] + "']").next().attr("checked", true).checkboxradio("refresh");
        }
    }
};

var index = 0;
//生成单个列表项
HMUI.MobileList.BuildListSingleFilterOrSort = function (listName, item, selected) {
    index++;
    var type = "checkbox";

    var singleItemHtml = "<input  type=\"" + type + "\" onclick='Hoteam_InforCenter_MobileListFilterOrSort_CheckBoxClick(this)' groupname='" + item.GroupName + "' selectmode='" + item.SelectMode + "' jsmethod='" + item.JsMethod + "'  name=\"checkbox-h-6a\" id=\"checkbox-h-" + index.toString() + "\"><label name='" + item.Name + "' jsmethod='" + item.JsMethod + "' groupname='" + item.GroupName + "' selectmode='" + item.SelectMode + "' for=\"checkbox-h-" + index.toString() + "\">" + item.Text + "</label>";
    return singleItemHtml;
};

HMUI.UIManager.MsgBox = function (message, stackTrace, callback, data) {
    var pageMode = "OK";
    $("#popupMobilePage-screen").unbind();
    HMUI.UIManager.Popup("MobileConfirm", { message: message, stackTrace: stackTrace, pageMode: pageMode }, { position: "center" }, "", "", callback, data);
}

HMUI.MobileList.ListViewItemClick = function (event) {

    //window.console.log("INTO:HMUI.MobileList.ListViewItemClick ");
    /*获得到li对象*/
    event = event || e;
    var target = $(event.target);
    //window.console.log("TARGET:" + event.target.outerHTML);
    var controlgroup = target.parent();
    if (controlgroup.hasClass("ui-controlgroup-controls") || controlgroup.parent().hasClass("ui-controlgroup-controls")) {
        //window.console.log("STOP:HMUI.MobileList.ListViewItemClick ");
        return;
    }
    //window.console.log("PASS:HMUI.MobileList.ListViewItemClick ");
    var obj = target.closest("li");
    if (obj.length === 0 || obj.attr("data-role") === "list-divider") {
        return false;
    }

    $(".ui-listview").find(".ui-btn").removeClass("ui-btn-active");
    $(obj).find(".ui-btn").addClass("ui-btn-active");
    var objectID = $(obj).attr("ObjectID");
    var objectType = $(obj).attr("ObjectType");
    var listName = $(obj).attr("ListName");
    var objectText = $(obj).attr("ObjectText");
    var isExtend = $(obj).attr("IsExtend");
    var nextRequestPara = $(obj).attr("NextRequestPara");
    var pagePara = {};
    pagePara.ObjectID = objectID;
    pagePara.ObjectType = objectType;
    pagePara.ObjectText = objectText;
    pagePara.ListName = listName;
    pagePara.NextRequestPara = nextRequestPara;
    var nextRequestPara = JSON.parse(pagePara.NextRequestPara);
    $.extend(pagePara, nextRequestPara);
    HMUI.MobileList.OpenObjectPropertyPage(pagePara, isExtend);
    if (HMUI.AppSets.MobileDevice == "Phone") {
        HMUI.MobileCommon.ShowHeaderBackButton();
    }
};

HMUI.MobileList.OpenObjectPropertyPage = function (pagePara, isExtend) {
    if (isExtend == "false") {
        var listConfig = HMUI.UIManager.GetMobileListConfig(pagePara.ListName);
        var obj = null;
        for (var i = 0; i < listConfig.MobileObjectTypes.length; i++) {
            var item = listConfig.MobileObjectTypes[i];
            if (item.Name == pagePara.ObjectType) {
                obj = item;
                break;
            }
        }
        if (obj != null) {
            pagePara.PropertyPage = obj.PropertyPage;
            pagePara.PropertyDataService = obj.PropertyDataService;
            HMUI.UIManager.ShowInRight("MobilePropertyPage", pagePara, "slide", false);


        }
    }
    else {
        HMUI.MobileList.RefreshMobileListData(pagePara, "Sub");
    }
    if (typeof event !== 'undefined' || typeof e !== 'undefined') {
        event = event || e;
        event.preventDefault();
    }

}

HMUI.MobileList.ListViewImageClick = function (elem) {
    //window.console.log("into ListViewImageClick");
    //上一次执行未完成，禁止重复执行
    if (HMUI.MobileList.ListViewImageClick.IsRuning) {
        HMUI.StopEventBubble();
        //$(elem).closest("a.ui-btn").removeClass("ui-btn-active");
        return false;
    }

    HMUI.MobileList.ListViewImageClick.IsRuning = true;
    //window.console.log("exe ListViewImageClick");
    var obj = $(elem);

    if (HMUI.Window.CheckIsOffLine() && obj.attr("OfflineDisable") == "true") {
        HMUI.UIManager.MsgBox(HMUI.Language.Lang("MobileLogin.OfflineDisableOperate"));
    }
    else {
        var jsMethod = obj.attr("JsMethod");
        if (HMUI.Common.IsNullOrEmpty(jsMethod) == false) {
            obj = obj.closest("li");
            var para = {};
            para.ListName = obj.attr("ListName");
            para.ObjectID = obj.attr("ObjectID");
            para.ObjectType = obj.attr("ObjectType");
            para.ObjectText = obj.attr("ObjectText");
            HMUI.Common.ExeFunction(jsMethod, para);
        }
    }

    //500毫秒内阻止事件重复执行
    setTimeout(function () {
        //window.console.log("HMUI.MobileList.ListViewImageClick.IsRuning=false");
        HMUI.MobileList.ListViewImageClick.IsRuning = false;
    }, 200);

    var activeItem = obj.closest("a").addClass("ui-btn-active");
    activeItem.parent().siblings().find("a").removeClass("ui-btn-active");
    event.stopPropagation();
};

HMUI.MobileList.ListViewImageClick.IsRuning = false;

HMUI.MobileList.ObjectBarClick = function (elem) {

    var obj = $(elem);
    if (HMUI.Window.CheckIsOffLine() && obj.attr("OfflineDisable") == "true") {
        HMUI.UIManager.MsgBox(HMUI.Language.Lang("MobileLogin.OfflineDisableOperate"));
    }
    else {
        var jsMethod = $(obj).attr("JsMethod");
        if (HMUI.Common.IsNullOrEmpty(jsMethod) == false) {
            var para = {};
            para.ListName = $(obj).attr("ListName");
            para.ObjectID = $(obj).attr("ObjectID");
            para.ObjectType = $(obj).attr("ObjectType");
            para.ObjectText = $(obj).attr("ObjectText");
            para.SwitchType = $(obj).attr("SwitchType");
            para.target = obj;
            HMUI.Common.ExeFunction(jsMethod, para);
        }
    }
};

HMUI.MobileList.ShowHistory = function (event) {
    event = event || e;
    var datas = HMUI.UIManager.GetActiveNavigation();
    if (datas.OpenPages.length <= 1) {
        return;
    }
    var ctrl = $("#popupMobileArrowPage");
    var content = $("#popupMobileContent");
    var listview = "";
    for (var j = 0; j < datas.OpenPages.length; j++) {
        var d = datas.OpenPages[j];

        var txtwidth = "";
        var txtLength = HMUI.GetStrLength(d.Paras.ObjectText);
        if (txtLength < 8) {
            txtwidth = "width:64px";
        }
        if (j == 0) {
            listview += "<a onclick='HMUI.MobileList.GetToOpenPath(" + j + ")' style='cursor:pointer;height: 40px;line-height: 40px;text-align: center;" + txtwidth + "' class='datanav'>" + d.Paras.ObjectText + "</a>";
        }
        else {
            listview += "<a style='margin-left:2px;margin-right:2px;height: 40px;line-height: 40px;'>|</a><a onclick='HMUI.MobileList.GetToOpenPath(" + j + ")' style='cursor:pointer;height: 40px;line-height: 40px;text-align: center;" + txtwidth + "' class='datanav'>" + d.Paras.ObjectText + "</a>";
        }
    }
    content.html("<p style='overflow: hidden;margin: 0;'>" + listview + "</p>");
    ctrl.popup("open", { x: event.pageX, y: event.pageY });
    event.preventDefault();
};

HMUI.MobileList.OpenNav = function () {

};

HMUI.MobileList.SetMessageRead = function (itemElement) {
    itemElement.find(">a>img:first").attr("src", "Mobile/Image/ObjectType/ObjectType_Message_read.gif");
};

HMUI.MobilePropertyPage = {};

HMUI.MobilePropertyPage.ShowHtml = function (ctrl, data) {
    var theme = $(".ui-page-active").attr("data-theme");
    var listview = "";
    var htmls = [];
    if (data != null && data.ReturnObjectInfoList != null) {

        for (var i = 0; i < data.ReturnObjectInfoList.length; i++) {
            var item = data.ReturnObjectInfoList[i];
            if (HMUI.Common.IsNullOrEmpty(item.GroupName) == false) {
                var group = null;
                $.each(htmls, function (index, val) {
                    if (val.GroupName == item.GroupName) {
                        group = val;
                    }
                });
                var groupHtml = "";
                if (group == null) {
                    groupHtml += "<table data-role='table' class='PropertyPageTable' cellspacing='0'>";
                    groupHtml += "<tr><th class='ui-bar-" + theme + "'  style='width:33.3%;padding: .4em 1em;font-weight: bold;font-size:1em;'>" + item.Name +
                                  "</th><th class='ui-bar-" + theme + "'   style='width:66.7%;padding: .4em 1em;font-weight: bold;font-size:1em;'>" + item.Value + "</th></tr>";
                    groupHtml += "</table>";
                }
                else {
                    groupHtml = group.GroupHtml;
                    htmls.pop(group);
                    groupHtml += "<table data-role='table' class='PropertyPageTable' cellspacing='0'>";
                    if (item.Type === "image") {

                        if (HMUI.MobileCommon.IsPhone()) {
                            groupHtml += "<tr>" +
                                        "<td colspan='2' style='height: 17px;line-height: 17px;font-size:14px;text-align: center;'>" +
                                            "<img src='data:image/png;base64," + item.Value + "' />" +
                                        "</td>" +
                                    "</tr>";
                        }
                        else {
                            groupHtml += "<tr><td style='width:33.3%;height: 17px;line-height: 17px;font-size:14px'>" + item.Name +
                                    "</td><td style='width:66.7%;height: 17px;line-height: 17px;font-size:14px'>" +
                                    "<img src='data:image/png;base64," + item.Value + "' />" +
                                    "</td></tr>";
                        }
                    }
                    else if (item.Type === "progress") {
                        var width = item.Value + "%";
                        groupHtml += "<tr><td style='width:33.3%;height: 17px;line-height: 17px;font-size:14px'>" + item.Name +
                                "</td><td style='width:66.7%;height: 17px;line-height: 17px;font-size:14px'>" +
                                "<div class='propertyPageTable_progress'><div style='background-color:#5FBDF8;width:" + width + "%'><span>" + width + "</span></div></div>" +
                                "</td></tr>";
                    }
                    else {
                        groupHtml += "<tr><td style='width:33.3%;height: 17px;line-height: 17px;font-size:14px'>" + item.Name + "</td><td style='width:66.7%;height: 17px;line-height: 17px;font-size:14px'>" + item.Value + "</td></tr>";
                    }
                    groupHtml += "</table>";
                }

                htmls.push({ GroupName: item.GroupName, GroupHtml: groupHtml });
            }
            else {
                listview += "<div class='ui-block-a'><div class='ui-bar ui-bar-a' style='font-size: 14px;font-weight: normal;padding-left: 16px;background: none;'>" + item.Name + "</div></div><div class='ui-block-b'><div class='ui-bar ui-bar-a' style='font-size: 14px;font-weight: normal;padding-left: 16px;background: none;'>" + item.Value + "</div></div>";
            }
        }
        for (var i = 0; i < htmls.length; i++) {
            var item = htmls[i];
            listview += item.GroupHtml;
            listview += "</div>";
        }
    }
    ctrl.html(listview);
};

HMUI.MobileNavigation = {};
//获取导航信息
HMUI.MobileNavigation.GetMobileNavigation = function () {
    var config = HMUI.WebService.CallConfig(HMUI.BaseServicePath, "GetMobileNavigation", {});
    var navs = config.Navs;
    var navslist = "";
    if (HMUI.AppSets.MobileDevice == "Phone") {
        for (var i = 0; i < navs.length; i++) {
            var nav = navs[i],
                param = " NavName='" + nav.Name + "' PageName='" + nav.PageName + "' PagePara='" + nav.PagePara + "' JsMethod='" + nav.JsMethod + "' Text='" + nav.Text + "'",
               imgUrl = ("icon-" + nav.Image).toLowerCase(),
                text = nav.Text,
                onclick = " onclick = 'HMUI.MobileNavigation.NavigationClick(this);'";

            navslist += '<li data-icon="carat-r">';
            navslist += '   <a  data-rel="close" class="ui-background-inherit"  ' + param + onclick + '>';

            navslist += '<svg class="icon"><use xlink:href="' + HMUI.LoadImages.ImagesBaseUrl + imgUrl + '"></use></svg>' + '<span>' + text + '</span>';
            navslist += '   </a>';
            navslist += '</li>';
        }
        $("#slidenavlistview").html(navslist);
        $("#slidenavlistview").listview("refresh");
        $("#SlideNav").panel();
    }
    else {
        for (var i = 0; i < navs.length; i++) {
            var nav = navs[i],
            onclick = " onclick = 'HMUI.MobileNavigation.NavigationClick(this);return false;'",
            param = " NavName='" + nav.Name + "' PageName='" + nav.PageName + "' PagePara='" + nav.PagePara + "' JsMethod='" + nav.JsMethod + "' Text='" + nav.Text + "'",
            text = nav.Text,
            imgUrl = ("icon-" + nav.Image).toLowerCase();

            navslist += '<li class="ui-block-b">';
            navslist += '<a href="#" class="ui-link ui-btn ui-btn-icon-top ' + '' + '"  ' + onclick + param + ' >' + text + '<svg class="icon"><use xlink:href="' + HMUI.LoadImages.ImagesBaseUrl + imgUrl + '"></use></svg></a>';
            navslist += '</li>';
        }
        $("#rightfooter>.ui-navbar>ul").html(navslist);
    }
    if (navs.length > 0) {
        var messageType = HMUI.MobileCommon.GetAppSetting("MessageType");
        if (HMUI.Common.IsNullOrEmpty(messageType) == false) {
            HMUI.MobileNavigation.ActivateModule(messageType, navs);
            //HMUI.MobileCommon.SetAppSetting("MessageType", "");
        }
        else {
            var fisrtNav = navs[0];
            HMUI.MobileNavigation.NavigationShowHomePage(fisrtNav.Name, fisrtNav.PageName, fisrtNav.JsMethod, fisrtNav.PagePara, fisrtNav.Text);
        }
    }
};

HMUI.MobileNavigation.ActivateModule = function (messageType, navs) {
    for (var i = 0; i < navs.length; i++) {
        var nav = navs[i];
        if (nav.Name == messageType) {
            HMUI.MobileNavigation.NavigationShowHomePage(nav.Name, nav.PageName, nav.JsMethod, nav.PagePara, nav.Text);
            break;
        }
    }
};

HMUI.MobileNavigation.NavigationClick = function (elem) {
    var obj = $(elem);
    HMUI.MobileCommon.SetHeaderText($(obj).attr("Text"));

    /*高亮显示*/
    obj.parent().parent().find("a").removeClass("ui-btn-active");
    obj.addClass("ui-btn-active");

    HMUI.MobileNavigation.NavigationShowHomePage($(obj).attr("NavName"), $(obj).attr("PageName"), $(obj).attr("JsMethod"), $(obj).attr("PagePara"), $(obj).attr("Text"));

    setTimeout(function () {
        $(".pagelistview-nodata").remove();
    }, 200);
};

HMUI.MobileNavigation.NavigationShowHomePage = function (navName, pName, jsMethod, pPara, text) {
    HMUI.UIManager.CurrentNavigation = navName;
    HMUI.UIManager.ReSetNavigation();
    HMUI.MobileCommon.ShowHeaderNavButton();
    var pageName = "MobileList";
    if (HMUI.Common.IsNullOrEmpty(pName) == false) {
        pagePara = pName;
        pageName = pName;
    }
    var pagePara = {};
    if (HMUI.Common.IsNullOrEmpty(pPara) == false) {
        pagePara = JSON.parse(pPara);
    }
    pagePara.ObjectText = text;
    if (jsMethod != "undefined" && HMUI.Common.IsNullOrEmpty(jsMethod) == false) {
        $("#rightcontent").html("");
        $("#rightheader div>ul:first").html("");
        HMUI.Common.ExeFunction(jsMethod, pagePara);
    }
    else {
        HMUI.UIManager.ShowInLeft(pageName, pagePara, "slide", false);
    }
    HMUI.MobileCommon.HideHeaderBackButton();

};

HMUI.MobileCommon = {};

HMUI.MobileCommon.DeviceHeight = (function () {
    setTimeout(function () {
        var systemType = HMUI.Window.GetSystemType();
        if (systemType === "android") {
            if (typeof bridge !== "undefined") {
                HMUI.MobileCommon.DeviceHeight = bridge.getScreenHeight();
            }
        }
        else {

            HMUI.MobileCommon.DeviceHeight = $(window).height();
        }

    }, 200);

})();

HMUI.MobileCommon.HeaderHeight = (function () {
    if (!HMUI.Common.IsNullOrEmpty(HMUI.MobileCommon.HeaderHeight)) {
        return;
    }
    setTimeout(function () {
        HMUI.MobileCommon.HeaderHeight = $('#header').height();
    }, 200);

})();

HMUI.MobileCommon.FooterHeight = (function () {
    if (!HMUI.Common.IsNullOrEmpty(HMUI.MobileCommon.FooterHeight)) {
        return;
    }
    setTimeout(function () {
        HMUI.MobileCommon.FooterHeight = $('#footer').height();
    }, 200);

})();

HMUI.MobileCommon.SetHeaderText = function (text) {
    var dispalyText = "";
    if (HMUI.Common.IsNullOrEmpty(text) == false) {
        dispalyText = HMUI.CutStr(text, 14);
    }
    $("#PageContainer .mobilelisttitle").text(dispalyText);
    if (HMUI.AppSets.MobileDevice == "Pad") {
        $("#rightheader").css({ "width": "70%" });
        $("#header").css({ "width": "30%" });
    }
};

HMUI.MobileCommon.ShowHeaderNavButton = function () {
    $("#PageContainer .headernavbtn").css("display", "block");
};
HMUI.MobileCommon.HideHeaderNavButton = function () {
    $("#PageContainer .headernavbtn").css("display", "none");
};
HMUI.MobileCommon.ShowHeaderBackButton = function () {
    $("#PageContainer .headerbackbtn").css("display", "block");
};
HMUI.MobileCommon.HideHeaderBackButton = function () {
    $("#PageContainer .headerbackbtn").css("display", "none");
};
HMUI.MobileCommon.ShowRefreshButton = function () {
    $("#PageContainer .btnrefresh").css("display", "block");
};
HMUI.MobileCommon.HideRefreshButton = function () {
    $("#PageContainer .btnrefresh").css("display", "none");
};
HMUI.MobileCommon.ShowHighlightRefreshButton = function () {
    $("#PageContainer .btnrefresh>a").addClass("ui-alt-icon");
};
HMUI.MobileCommon.ShowCommonRefreshButton = function () {
    $("#PageContainer .btnrefresh>a").removeClass("ui-alt-icon");
};

//获取列表配置信息
HMUI.MobileCommon.GetWorkPromptData = function (UserID) {
    var list = HMUI.DataService.Call("Hoteam.Mobile.CommonService.GetWorkPromptData", {});
    return list;
};


HMUI.MobileCommon.CheckIsCanOperate = function () {
    if (HMUI.Window.CheckIsOffLine()) {
        HMUI.UIManager.MsgBox(HMUI.Language.Lang("MobileLogin.OfflineDisableOperate"));
        return false;
    }
    return true;
}

//属性页绑定iScroll实现拖动功能
HMUI.MobileCommon.InitScroll = function (container, enablehScroll, scrollheight) {
    setTimeout(function () {
        if (HMUI.Common.IsNullOrEmpty(scrollheight)) {
            scrollheight = HMUI.MobileCommon.DeviceHeight - HMUI.MobileCommon.HeaderHeight - HMUI.MobileCommon.FooterHeight; //取安卓设备的高度
        }
        container.height(scrollheight);
    }, 200);

    setTimeout(function () {
        var opt = {
            hScroll: false,
            vScroll: true,
            useTransition: false,
            hScrollbar: false,
            vScrollbar: false,
            hideScrollbar: true,
            topOffset: 0,
            onScrollMove: function () { }
        }
        if (enablehScroll == true) {
            opt.hScroll = true;
        }

        new iScroll(container[0], opt);
    }, 200);
}

//根据参数进行登陆
HMUI_InforCenter_MobileList_PageInit = function (pageEvent) {
   
    HMUI.MobileList.IScroll = null;

    var pagePara = pageEvent.o.GetPara();
    var pid = pageEvent.o.pid;
    var contaienr = $("#" + pid + " .pagelistview-conatiner");

    HMUI.MobileCommon.ShowHeaderNavButton();
    HMUI.MobileCommon.ShowHeaderBackButton();
    HMUI.MobileCommon.SetHeaderText(pagePara.ObjectText);

    var listConfig = HMUI.UIManager.GetMobileListConfig(pagePara.ListName);
    HMUI.MobileList.LoadList(pid, listConfig, pagePara);

    //父对象生成菜单
    var defaultMSort = HMUI.MobileList.BuildParentObjectBar($("#PageContainer .footernav"), listConfig, pagePara);
    //控制查询显示、隐藏
    HMUI_InforCenter_MobileList_ListSearchVisible(pid, listConfig, pagePara);
    var last = HMUI.UIManager.GetLastPagePathValue();
    if (defaultMSort != null) {
        last.Paras.Sorts = [defaultMSort];
    }
    if (HMUI.Common.IsNullOrEmpty(last.Paras.Filters) == false) {
        $("#" + pid).find("#listfilter").addClass("ui-btn-active");
    }
    if (HMUI.Common.IsNullOrEmpty(last.Paras.Sorts) == false) {
        $("#" + pid).find("#listsort").addClass("ui-btn-active");
    }
    HMUI.MobileCommon.ShowRefreshButton();
    if (HMUI.Window.CheckIsOffLine()) {
        HMUI.MobileCommon.ShowCommonRefreshButton();
    }
    else {
        HMUI.MobileCommon.ShowHighlightRefreshButton();
    }

    $("#" + pid + " .searchinput").val(last.Paras.QueryValue);


    //绑定清除事件
    $("#" + pid + " #listsearch .ui-input-clear").on("click", function () {

        //清除查询参数
        var last = HMUI.UIManager.GetLastPagePathValue();
        if (last.Paras == null) {
            last.Paras = {};
        }
        last.Paras.QueryValue = "";
        last.Paras.ChildObjectID = "";
        last.Paras.ChildObjectType = "";
    });

    //给列表注册滑动事件
    contaienr.on({
        "touchstart": function (e) {
            var operDiv = $(this).prev().find("span"); //查找操作元素
            var width = 0;
            //计算元素的宽度
            for (var i = 0; i < operDiv.length; i++) {
                width = width + parseInt($(operDiv[i]).innerWidth());
            }
            $(this).data("startX", e.originalEvent.targetTouches[0].pageX).data("operWidth", width);
        },
        "touchmove": function (e) {
            if ($(this).data("operWidth") == 0) {
                return;
            }
            var change = e.originalEvent.targetTouches[0].pageX - $(this).data("startX");
            if (change > 0) {
                change = parseInt($(this).css("left")) + (change / 20);
                $(this).data("state", "hide");
            } else {
                change = Math.min(Math.max(-300, change), 0);
                $(this).data("state", "show");
            }
            if (change < 0) {
                change = (change < (-$(this).data("operWidth")) ? (-$(this).data("operWidth")) : change);
                $(this).css("left", change);
            } else if (change > 0) {
                $(this).css("left", 0);
            }
        },
        "touchend": function (e) {
            if ($(this).data("operWidth") == 0) {
                return;
            }
            if ($(this).data("state") == "hide") {
                $(this).animate({ left: 0 }, 200);
            } else {
                var left = parseInt($(this).css("left"));
                var newLeft;
                if (left < -30) {
                    newLeft = -($(this).data("operWidth"));
                } else {
                    newLeft = '0px';
                }
                $(this).animate({ left: newLeft }, 200);
            }
        }
    }, ".ui-li-has-thumb a.ui-nodisc-icon");
    contaienr.on({
        "touchstart": function (e) {
            var operDiv = $(this).closest(".ui-li-operDiv").find("span"); //查找操作元素
            var width = 0;
            //计算元素的宽度
            for (var i = 0; i < operDiv.length; i++) {
                width += parseInt($(operDiv[i]).innerWidth());
            }
            var $li = $(this).closest(".ui-li-operDiv").next();
            $li.data("startX", e.originalEvent.targetTouches[0].pageX).data("operWidth", width);
        },
        "touchmove": function (e) {
            var $li = $(this).closest(".ui-li-operDiv").next();
            var change = e.originalEvent.targetTouches[0].pageX - $li.data("startX");
            if (change > 0) {
                change = parseInt($li.css("left")) + (change / 20);
                $li.data("state", "hide");

                if (change > $li.data("operWidth")) {

                    $li.css("left", 0);
                }
                else {
                    if (parseInt($li.css("left")) >= 0) {
                        $li.css("left", 0);
                    }
                    else {
                        $li.css("left", change);
                    }
                }

            } else {
                $li.data("state", "show");
            }
        },
        "touchend": function (e) {
            var $li = $(this).closest(".ui-li-operDiv").next();
            if ($li.data("state") == "hide") {
                $li.animate({ left: 0 }, 200);
            }
        }
    }, ".ui-li-operTitle");
};

//控制查询显示、隐藏
HMUI_InforCenter_MobileList_ListSearchVisible = function (pid, listConfig, pagePara) {

    if (HMUI.Common.IsNullOrEmpty(pagePara.ObjectType) == true) {
        pagePara.ObjectType = "ListRoot";
    }
    //是否有检索
    var searchFlag = false;
    var qrcodeFlag = false;
    for (var i = 0; i < listConfig.MobileSearchs.length; i++) {

        var item = listConfig.MobileSearchs[i];
        if (HMUI.Common.IsNullOrEmpty(pagePara.ObjectType) == false && (";" + item.ParentObjectType).indexOf(";" + pagePara.ObjectType) > -1) {
            searchFlag = true;
            if (item.HasQRCode) {
                qrcodeFlag = true;
            }
            break;
        }
    }
    //是否存在过滤
    var filterFlag = false;
    for (var i = 0; i < listConfig.MobileFilters.length; i++) {
        var item = listConfig.MobileFilters[i];
        if (HMUI.Common.IsNullOrEmpty(pagePara.ObjectType) == false && (";" + item.ParentObjectType).indexOf(";" + pagePara.ObjectType) > -1) {
            filterFlag = true;
            break;
        }
    }

    //是否存在排序
    var sortFlag = false;
    for (var i = 0; i < listConfig.MobileSorts.length; i++) {
        var item = listConfig.MobileSorts[i];
        if (HMUI.Common.IsNullOrEmpty(pagePara.ObjectType) == false && (";" + item.ParentObjectType).indexOf(";" + pagePara.ObjectType) > -1) {
            sortFlag = true;
            break;
        }
    }

    var btnNumber = 3;

    if (searchFlag && !qrcodeFlag) {
        $("#" + pid + " #listQRcode").hide();
        --btnNumber;
    }
    //过滤按钮隐藏
    if (filterFlag === false || pagePara.fromWorkPrompt === true) {
        $("#" + pid + " #listfilter").hide();
        --btnNumber;
    }
    //排序按钮隐藏
    if (searchFlag == false || sortFlag == false) {
        $("#" + pid + " #listsort").hide();
        --btnNumber;
    }

    if (searchFlag && btnNumber === 0) {
        $("#" + pid + " #listsearch").width('98%');
        $(".ui-page-container").addClass("ui-page-hasfilterable");
    }
    else if (searchFlag && btnNumber > 0) {
        if (btnNumber < 3) {
            $("#" + pid + " #listsearch").width((100 - btnNumber * 15) + "%");
            $("#" + pid + " #listsearch-btns").width((btnNumber * 15) + "%");
        }

        $(".ui-page-container").addClass("ui-page-hasfilterable");
    }
    else {
        $(".ui-page-container").removeClass("ui-page-hasfilterable");
    }

}

//二维码扫描事件
HMUI_InforCenter_MobileList_QRCodeOnClick = function (elem) {

    //debugger;
    if (HMUI.Window.CheckIsOffLine()) {
        HMUI.UIManager.MsgBox(HMUI.Language.Lang("MobileLogin.OfflineDisableOperate"));
        return;
    }

    HMUI.MobileCommon.GetQRCode("HMUI_InforCenter_MobileList_SearchByQRCode");
}

//二维码扫描结果查询
//测试：HMUI_InforCenter_MobileList_SearchByQRCode('编号:HB047B256RZM100001_copy;名称:47')
HMUI_InforCenter_MobileList_SearchByQRCode = function (data) {

    var barcode = false,
        qrcode = false,
        searchInfo = {};

    //判断是否有扫描信息
    if (!data) {
        HMUI.UIManager.MsgBox("无效的扫描信息！");
        return;
    }
    //条码信息
    else if (data.indexOf("OBJECTCODE") === 0) {
        barcode = true;
        searchInfo.name = data.replace(/OBJECTCODE:/, '');
    }
    //二维码信息
    else {

        if (!data || data.indexOf(";") === -1) {
            HMUI.UIManager.MsgBox("无效的扫描信息！");
            return;
        }
        data = data.split(";");

        var info = {},
        name;

        for (var i = 0, len = data.length; i < len; i++) {
            var item = data[i].split(":");
            if (item && item.length > 0) {
                info[item[0]] = item[1];
                if (!name && item[0].indexOf("名称") > -1) {
                    name = item[1];
                }
            }
        }

        searchInfo = {
            id: info["ID"] || "",
            name: name || "",
            type: info["OBJECTTYPE"] || ""
        };

        if (!searchInfo.id || !searchInfo.name || !searchInfo.type) {
            HMUI.UIManager.MsgBox("无效的扫描信息！");
            return;
        }

        qrcode = true;

    }

    var pid = $.mobile.activePage.attr("id");
    var obj = $("#" + pid + " .searchinput");
    var SearchContent = obj.val(searchInfo.name);

    var last = HMUI.UIManager.GetLastPagePathValue();
    if (last.Paras == null) {
        last.Paras = {};
    }

    if (barcode === true) {
        last.Paras.ChildObjectID = "";
        last.Paras.ChildObjectType = "";
        last.Paras.ChildObjectCode = searchInfo.name;
        last.Paras.QueryValue = searchInfo.name;
    }
    else {
        last.Paras.ChildObjectID = searchInfo.id
        last.Paras.ChildObjectType = searchInfo.type;
        last.Paras.ChildObjectCode = "";
        last.Paras.QueryValue = searchInfo.name;
    }


    var listConfig = HMUI.UIManager.GetMobileListConfig(last.Paras.ListName);
    HMUI.MobileList.LoadList(last.PID, listConfig, last.Paras);
}

//列表设置过滤条件按钮事件
HMUI_InforCenter_MobileList_FilterOnClick = function (elem) {
    
    if (HMUI.Window.CheckIsOffLine()) {
        HMUI.UIManager.MsgBox(HMUI.Language.Lang("MobileLogin.OfflineDisableOperate"));
        return;
    }

    var paras = HMUI.Page.GetContainerPara($.mobile.activePage.attr("id"));
    var target = $(elem);
    var offset = target.offset();
    var callback = function (data, ret) {

        var last = HMUI.UIManager.GetLastPagePathValue();
        if (last.Paras == null) {
            last.Paras = {};
        }
        last.Paras.Filters = ret.Filters;

        if (HMUI.Common.IsNullOrEmpty(ret.Filters) == false) {
            target.addClass("ui-btn-active");
        }
        else {
            target.removeClass("ui-btn-active");
        }
        var listConfig = HMUI.UIManager.GetMobileListConfig(last.Paras.ListName);
        last.Paras.PageIndex = 1;
        last.Paras.ChildObjectType = "";
        last.Paras.ChildObjectID = "";
        HMUI.MobileList.LoadList(last.PID, listConfig, last.Paras);
    }
    var data = paras;
    data.PageType = "Filter";
    HMUI.UIManager.Popup('MobileListFilterOrSort', data, { target: target, direction: "bottom" }, false, true, callback, data);

}

//列表设置排序按钮事件
HMUI_InforCenter_MobileList_SortOnClick = function (elem) {

    if (HMUI.Window.CheckIsOffLine()) {
        HMUI.UIManager.MsgBox(HMUI.Language.Lang("MobileLogin.OfflineDisableOperate"));
        return;
    }

    var target = $(elem);
    var paras = HMUI.Page.GetContainerPara($.mobile.activePage.attr("id"));
    var callback = function (data, ret) {

        var last = HMUI.UIManager.GetLastPagePathValue();
        if (last.Paras == null) {
            last.Paras = {};
        }
        last.Paras.Sorts = ret.Sorts;

        if (HMUI.Common.IsNullOrEmpty(ret.Sorts) == false) {
            target.addClass("ui-btn-active");
        }
        else {
            target.removeClass("ui-btn-active");
        }

        var listConfig = HMUI.UIManager.GetMobileListConfig(last.Paras.ListName);
        last.Paras.PageIndex = 1;
        HMUI.MobileList.LoadList(last.PID, listConfig, last.Paras);
    }
    var data = paras;
    data.PageType = "Sort";
    HMUI.UIManager.Popup("MobileListFilterOrSort", data, { target: $(elem), direction: "bottom" }, true, true, callback, data);
}

//回车事件
HMUI_InforCenter_MobileList_KeyDown = function (e) {
    var currKey = 0, e = e || event;
    currKey = e.keyCode || e.which || e.charCode;

    var pid = $.mobile.activePage.attr("id");
    var obj = $("#" + pid + " .searchinput");
    var SearchContent = obj.val();

    if (currKey == 13) {
        HMUI_InforCenter_MobileList_Search();
    }

    if (HMUI.Common.IsNullOrEmpty(SearchContent) == true) {
        var last = HMUI.UIManager.GetLastPagePathValue();
        if (last.Paras == null) {
            last.Paras = {};
        }
        last.Paras.QueryValue = "";
        last.Paras.ChildObjectID = "";
        last.Paras.ChildObjectType = "";
        last.Paras.PageIndex = 1;
    }
}

//列表搜索按钮事件
HMUI_InforCenter_MobileList_Search = function () {
    var pid = $.mobile.activePage.attr("id");
    var obj = $("#" + pid + " .searchinput");
    var SearchContent = obj.val();

    var CheckResult = HMUI.CheckInputValue(50, 'false', obj, '搜索内容', 'true');
    if (CheckResult) {
        if (HMUI.Window.CheckIsOffLine()) {
            HMUI.UIManager.MsgBox(HMUI.Language.Lang("MobileLogin.OfflineDisableOperate"));
            return;
        }
        var last = HMUI.UIManager.GetLastPagePathValue();
        if (last.Paras == null) {
            last.Paras = {};
        }
        last.Paras.QueryValue = SearchContent;
        last.Paras.PageIndex = 1;
        var listConfig = HMUI.UIManager.GetMobileListConfig(last.Paras.ListName);
        HMUI.MobileList.LoadList(last.PID, listConfig, last.Paras);
    }
}

HMUI_InforCenter_MobileList_ShowPropertyPage = function (pagePara) {
    HMUI.MobileList.OpenObjectPropertyPage(pagePara, "false");
};

//下拉加载上一页
HMUI_InforCenter_MobileList_RefreshPage = function (container, scrollObj) {

    var last = HMUI.UIManager.GetLastPagePathValue(),
        listConfig;

    if (last.Paras == null) {
        last.Paras = {};
    }

    listConfig = HMUI.UIManager.GetMobileListConfig(last.Paras.ListName);

    //下拉分页中存在缓存的数据，直接从缓存数据中加载
    if (HMUI.MobileList.CacheDataType === "PrePageCache" && HMUI.MobileList.CacheData && HMUI.MobileList.CacheData.ListItemDataList && HMUI.MobileList.CacheData.ListItemDataList.length > 0) {

        var currentListData = HMUI.MobileList.CacheData.ListItemDataList.splice(-HMUI.MobileList.RowCount),
            cacheListData = HMUI.MobileList.CacheData.ListItemDataList;

        HMUI.MobileList.CacheData.ListItemDataList = null;
        var list = JSON.parse(JSON.stringify(HMUI.MobileList.CacheData));
        list.ListItemDataList = currentListData;
        HMUI.MobileList.CacheData.ListItemDataList = cacheListData;

        HMUI.MobileList.ShowList(last.PID, listConfig, last.Paras, "prepend", list, false);

        $(container).find(".pullDown").hide();

        setTimeout(function () {
            scrollObj.refresh();
        }, 200);

        return;
    }

    //列表数据缓存中没有数据，请求服务器读取
    if (last.Paras && last.Paras.PageIndex && last.Paras.PageIndex !== -1) {
        if (last.Paras.PageIndex > 1) {
            last.Paras.PageIndex = last.Paras.PageIndex - 1;
            HMUI.MobileList.CacheDataType = "PrePageCache";
        }
        else {
            last.Paras.PageIndex = 1;
            HMUI.MobileList.CacheDataType = "NextPageCache";
            HMUI.MobileList.LastData = null;
        }
    }

    var opt = {
        callback: function (data, para) {

            var scrollObj = para.scrollObj,
                pagePara = para.pagePara,
                scrollContainer = para.scrollContainer,
                pushType = "pullDown";

            if (data && data.ListItemDataList) {

                //如果是首页首个数据项，数据重新加载
                if (pagePara.PageIndex <= 1 && HMUI.MobileList.CacheDataType === "NextPageCache") {
                    HMUI.MobileList.LastData = null;
                    cacheListData = data.ListItemDataList.splice(HMUI.MobileList.RowCount);
                    HMUI.MobileList.ShowList(para.pid, para.listConfig, para.pagePara, false, data, false);

                    HMUI.MobileList.CacheData = data;
                    HMUI.MobileList.CacheData.ListItemDataList = cacheListData;
                    HMUI.MobileList.CacheDataType = "NextPageCache";
                    pagePara.PageIndex = 1;
                }
                else {
                    HMUI.MobileList.CacheData = null;
                    var currentListData = data.ListItemDataList.splice(-HMUI.MobileList.RowCount),
                    cacheListData = data.ListItemDataList;

                    data.ListItemDataList = currentListData;
                    HMUI.MobileList.ShowList(para.pid, para.listConfig, para.pagePara, false, data, false);
                    HMUI.MobileList.CacheData = data;
                    HMUI.MobileList.CacheData.ListItemDataList = cacheListData;
                    HMUI.MobileList.CacheDataType = "PrePageCache";
                }


                $(scrollContainer).find("." + pushType).hide();

                setTimeout(function () {
                    scrollObj.refresh();
                }, 500);
            }

        },
        pid: last.PID,
        listConfig: listConfig,
        pagePara: last.Paras,
        isAppend: true,
        scrollObj: scrollObj,
        scrollContainer: container,
        pushType: "pullDown"
    }

    HMUI.MobileList.AsyncLoadList(opt);
}

//上拉加载分页页面
HMUI_InforCenter_MobileList_LoadNextPage = function (container, scrollObj) {

    var last = HMUI.UIManager.GetLastPagePathValue(),
        listConfig;

    if (last.Paras == null) {
        last.Paras = {};
    }

    listConfig = HMUI.UIManager.GetMobileListConfig(last.Paras.ListName);

    //上拉分页中存在缓存的数据，直接从缓存数据中加载
    if (HMUI.MobileList.CacheDataType === "NextPageCache" && HMUI.MobileList.CacheData && HMUI.MobileList.CacheData.ListItemDataList && HMUI.MobileList.CacheData.ListItemDataList.length > 0) {

        var cacheListData = HMUI.MobileList.CacheData.ListItemDataList.splice(HMUI.MobileList.RowCount);
        HMUI.MobileList.ShowList(last.PID, listConfig, last.Paras, true, HMUI.MobileList.CacheData, false);

        HMUI.MobileList.CacheData.ListItemDataList = cacheListData;

        $(container).find(".pullUp").css({ "visibility": "hidden" });

        setTimeout(function () {
            scrollObj.refresh();
        }, 200);

        return;
    }

    //列表数据缓存中没有数据，请求服务器读取
    if (!last.Paras || !last.Paras.PageIndex || last.Paras.PageIndex === -1) {

        $(container).find(".pullUp").css({ "visibility": "visible" });
        return;
    }
    else {
        last.Paras.PageIndex = last.Paras.PageIndex + 1;
    }

    var opt = {
        callback: function (data, para) {

            var scrollObj = para.scrollObj,
                pagePara = para.pagePara,
                scrollContainer = para.scrollContainer,
                pushType = "pullUp",
                cacheListData;

            if (data && data.ListItemDataList && data.ListItemDataList.length > 0) {

                //载入列表分页数据缓存
                cacheListData = data.ListItemDataList.splice(HMUI.MobileList.RowCount);
                HMUI.MobileList.ShowList(para.pid, para.listConfig, para.pagePara, false, data, false);

                HMUI.MobileList.CacheData = data;
                HMUI.MobileList.CacheData.ListItemDataList = cacheListData;
                HMUI.MobileList.CacheDataType = "NextPageCache";


                $(scrollContainer).find("." + pushType).css({ "visibility": "hidden" });

                setTimeout(function () {
                    scrollObj.refresh();
                }, 500);
            }
            else {

                //未加载数据时页码回退一页
                if (pagePara.PageIndex > 1 && pagePara.PageIndex !== -1) {
                    pagePara.PageIndex = pagePara.PageIndex - 1;
                }

                //提示无数据更新，并在约1.5秒后恢复上拉加载状态        
                $(scrollContainer).find("." + pushType).addClass("loading-stop");
                $(scrollContainer).find("." + pushType + "Label").text("无数据更新！");
                //console.log("无数据更新！")
                setTimeout(function () {
                    $(scrollContainer).find("." + pushType).css({ "visibility": "hidden" });
                    scrollObj.refresh();
                    scrollObj = null;
                }, 500);
            }

        },
        pid: last.PID,
        listConfig: listConfig,
        pagePara: last.Paras,
        isAppend: true,
        scrollObj: scrollObj,
        scrollContainer: container,
        pushType: "pullUp"
    }

    HMUI.MobileList.AsyncLoadList(opt);
}


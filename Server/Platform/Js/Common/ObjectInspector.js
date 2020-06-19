//对象查询器管理页面加载事件
InforCenter_Platform_ObjectInspector_LoadPage = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.ObjectInspectorConfig) == true) {
        $.each(ObjectInspectorsScript, function (index, val) {
            if (val.ObjectType == pagePara.ObjectType)
                pagePara.ObjectInspectorConfig = JSON.parse(JSON.stringify(val));
        });
    }
    if (pagePara.ObjectInspectorConfig == null) {
        return;
    }
    pagePara = $.extend(pagePara, pagePara.ObjectInspectorConfig);

    var tabsPage = HoteamUI.Page.InstanceIn(page.pid, "TabsCtrlPage", "TabsCtrl");
    var tabsCtrl = tabsPage.GetControl("Tabs");
    var tabPara = tabsPage.GetPara();
    pagePara.TabsGuid = tabsCtrl.id;
    pagePara.PagePID = page.pid;
    pagePara.Url = [];
    pagePara.Url.push("ObjectInspector");
    HoteamUI.UIManager.MergeUrl(pagePara.ObjectType, pagePara);
    HoteamUI.Page.SetContainerParas(page.pid, page.PageName(), pagePara);

    if (pagePara.IsHideTop == false) {
        var menuPage = HoteamUI.Page.InstanceIn(page.pid, "MenuCtrlPage", "MenuCtrl");

        InforCenter_Platform_ObjectInspector_SetTitle(page, pagePara);
        InforCenter_Platform_ObjectInspector_LoadMenu(page, menuPage, pagePara);
    }
    else {
        var container = page.GetControl("ObjectInspector_Container");
        container.HiddenPanel(["item1"]);
    }

    //加载自定义JS
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.ObjectInspectorConfig.LoadJS) == false) {
        HoteamUI.Common.ExeFunction(pagePara.ObjectInspectorConfig.LoadJS, pagePara);
    }

    var pageLinksName = pagePara.PageLinksName;
    var data = InforCenter_Platform_GetTreeManagePageLinksByName(pageLinksName);
    if (data != null) {
        if (HoteamUI.Common.IsNullOrEmpty(data.GetLinksItemJS) == false) {
            pagePara.LinksData = data;
            data = HoteamUI.Common.ExeFunction(data.GetLinksItemJS, pagePara);
        }
        //如果是再次打开同一个对象，则进行刷新tab页面标签
        if (tabPara.OldObjectID == pagePara.ObjectID && (pagePara.Refresh && pagePara.Refresh == true || pageEvent.Refresh && pageEvent.Refresh == true) && pagePara.TabsGuid) {
            InforCenter_Platform_TabsCtrl_UpdateTabs(tabsCtrl, data, pagePara, "");
        }
        else {
            //第一进行加载tab页面标签
            InforCenter_Platform_TabsCtrl_LoadTabs(tabsPage, pagePara, "", "", data);
            //记录查看对象查看器操作，用于统计最近访问
            var para = { SelectID: pagePara.ObjectID, OperateType: "Browse", TemplateLabel: "MessageAndLoggerDescription.Common", ActionCheckerActions: "BROWSE", WriteLogger: true, SendMessage: true };
            HoteamUI.DataService.AsyncCall("InforCenter.Common.WebActionService.ExecuteMessageAndLoggerMethod", { para: para }, null);
        }
    }

    //加载自定义JS
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.ObjectInspectorConfig.LoadedJS) == false) {
        HoteamUI.Common.ExeFunction(pagePara.ObjectInspectorConfig.LoadedJS, pagePara);
    }

    HoteamUI.Page.SetContainerParas(tabsPage.pid, "TabsCtrl", { OldObjectID: pagePara.ObjectID });
};
InforCenter_Platform_ObjectInspector_LoadMenu = function (page, menuPage, pagePara) {
    //第一次打开时，进行菜单加载，如果没有配置菜单，则进行隐藏
    var topContainer = page.GetControl("Top_Container")
    if (HoteamUI.Common.IsNullOrEmpty(pagePara.MenuName) == false) {
        var tempurl = pagePara.Url;
        InforCenter_Platform_MenuCtrl_LoadMenus(menuPage, pagePara, pagePara.MenuName);
        pagePara.Url = tempurl;
        if (HoteamUI.Common.IsNullOrEmpty(topContainer) == false) {
            topContainer.ShowPanel(["item1"]);
        }
    }
    else {
        if (HoteamUI.Common.IsNullOrEmpty(topContainer) == false) {
            topContainer.HiddenPanel(["item1"]);
        }
    }
};
InforCenter_Platform_ObjectInspector_SetTitle = function (page, pagePara) {
    var ctrl = page.GetControl("TitleContainer");
    pagePara.ParentID = ctrl.id;
    var replaces = [{ key: "ParentID", value: pagePara.ParentID }];
    if (page.TitleTemplate) {
        ctrl.LoadTemplate(pagePara.TitleTemplate, replaces);
        if (pagePara.TitleTemplateJs)
            HoteamUI.Common.ExeFunction(pagePara.TitleTemplateJs, pagePara);
    }
    else {
        ctrl.LoadTemplate("ObjectInspectorTitle", replaces);
        HoteamUI.Common.ExeFunction("InforCenter_Platform_ObjectInspector_DefaultTitleTemplate", pagePara);
    }
};

InforCenter_Platform_ObjectInspector_DefaultTitleTemplate = function (pagePara) {
    var objectType = pagePara.ObjectType;
    //显示标题信息
    var icon = "";
    objInfo = pagePara.ObjectInfo;
    if (objInfo.ICON) {
        objInfo
        icon = objInfo.ICON;
    } else {
        icon = objInfo.IMGICONTYPE;
    }
    if (icon) {
        var img = $("#" + pagePara.ParentID + "TitleImage");
        img.attr("src", icon.replace("~", PageInit.WebRootPath));
        img.css({ height: 16, width: 16 });
    }

    var objtypeName = HoteamUI.Language.Lang(objectType + "Model." + objectType + "Header");
    if (!objtypeName) {
        objtypeName = objectType;
    }
    objtypeName += ":";
    $("#" + pagePara.ParentID + "OjbectType").text(objtypeName);

    var formatStr = pagePara.TitleFormat;
    for (var item in objInfo) {
        if (!objInfo.hasOwnProperty(item)) {
            continue;
        }
        var idx = item.lastIndexOf("_DisplayValue");
        if (idx > 0) {
            var name = item.substring(0, idx);
            var reg = new RegExp("\\[" + name + "\\]", 'g');
            formatStr = formatStr.replace(reg, objInfo[item]);
        }
    }
    if (!formatStr) {
        formatStr = objInfo.ENAME_DisplayValue;
    }
    else {
        var reg = new RegExp(/\/\//g);
        formatStr = formatStr.replace(reg, "/");
    }
    pagePara.ObjectTitle = formatStr;
    $("#" + pagePara.ParentID + "TitleValue").text(formatStr).attr('title', formatStr);;
};
InforCenter_Platform_ObjectInspector_AddMainTab = function (pagePara) {

    var title = HoteamUI.Language.Lang("ObjectInspector.Title");
    var objectID = pagePara.ObjectID;
    var objectType = HoteamUI.Common.IsNullOrEmpty(pagePara.ObjectType) ? InforCenter_Platform_GTypeFromID(objectID) : pagePara.ObjectType;
    if (HoteamUI.Common.IsNullOrEmpty(objectID) == false) {
        var objInfo = HoteamUI.DataService.Call("InforCenter.Common.ObjectService.GetObjectData", { para: { ObjectID: objectID } });
        if (objInfo && HoteamUI.Common.IsNullOrEmpty(objectType) == false) {
            pagePara.ObjectInfo = JSON.parse(objInfo);
            title = HoteamUI.Language.Lang(objectType + "Model." + objectType + "Header") + title;

            var objectInspectorConfig = null;
            if (!HoteamUI.Common.IsNullOrEmpty(pagePara.ObjectInspectorConfig)) {
                objectInspectorConfig = pagePara.ObjectInspectorConfig;
            }
            if (objectInspectorConfig != null && objectInspectorConfig.OnlyObjectInspector != null && objectInspectorConfig.OnlyObjectInspector.toLowerCase() == "false" && !HoteamUI.Common.IsNullOrEmpty(objectInspectorConfig.TitleFormat)) {

                var regMiddle = /\[.+?\]/g;
                var titleFormt = objectInspectorConfig.TitleFormat;

                var titleFormatArr = titleFormt.match(regMiddle);
                var titleArr = [];
                for (var i = 0; i < titleFormatArr.length; i++) {
                    var propertyName = titleFormatArr[i].replace("[", "").replace("]", "");
                    titleFormt = titleFormt.replace(titleFormatArr[i], pagePara.ObjectInfo[propertyName + "_DisplayValue"]);
                }
                title = titleFormt;
            }
            pagePara.TabId = objectType + "ObjectInspector";

            var onlyObjectInspector = HoteamUI.AppSets.OnlyObjectInspector.toLowerCase();
            if (objectInspectorConfig != null && !HoteamUI.Common.IsNullOrEmpty(objectInspectorConfig.OnlyObjectInspector)) {
                onlyObjectInspector = objectInspectorConfig.OnlyObjectInspector.toLowerCase();
            }
            if (onlyObjectInspector == "false") {
                pagePara.TabId = objectID + "ObjectInspector";
            }
            pagePara.ObjectType = objectType;

            pagePara.IsHideTop = false;
            InforCenter_Platform_MainTabs_AddTab("ObjectInspector", pagePara, title, false);
        }
    }
};
InforCenter_Platform_ObjectInspector_AddPage = function (pageContainer, pagePara) {
    var objectID = pagePara.ObjectID;
    var objectType = HoteamUI.Common.IsNullOrEmpty(pagePara.ObjectType) ? InforCenter_Platform_GTypeFromID(objectID) : pagePara.ObjectType;
    if (HoteamUI.Common.IsNullOrEmpty(objectID) == false) {
        pagePara.TabId = objectType + "ObjectInspector";
        pagePara.ObjectType = objectType;
        pagePara.IsHideTop = true;
        pageContainer.LoadPage("ObjectInspector", pagePara);
    }
};
InforCenter_Platform_ObjectInspector_DeleteObjectCheckMainTab = function (objectid, flag) {
    var ids = objectid.split(';');
    var removeObjectTypes = [];
    for (var i = 0; i < ids.length; i++) {
        var id = ids[i];
        var objectType = InforCenter_Platform_GTypeFromID(id);
        var isRemove = false;
        $.each(removeObjectTypes, function (m, val) {
            if (val == objectType)
                isRemove = true;
        });
        if (isRemove == true)
            continue;

        var tabId = objectType + "ObjectInspector";
        if (InforCenter_Platform_MainTabs_RemoveTab(tabId, objectid, flag)) {
            removeObjectTypes.push(objectType);
        }
    }
};

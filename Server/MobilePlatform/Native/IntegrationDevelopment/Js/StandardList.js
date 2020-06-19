InforCenter_MobilePlatform_StandardList_CreateFormInit = function (curpage, prePage) {
    var para = curpage.GetPara();
    var pageControl = curpage.GetControl("ItemFormPageContainer");

    if (prePage) {
        var prePagePara = prePage.GetPara();
        var data = prePagePara.Data;
        var ProjectType = data.DATASOURCETYPE;
        var pageName = ProjectType + "-CREATE";
        para.DataObjectType = data.RESULTOBJECTTYPE;
        curpage.GetControl("ItemFormPageContainer").LoadPage(pageName, para);
        para.pageName = pageName;
        HoteamUI.Page.SetContainerParas(curpage.pid, curpage.PageName(), para);
    }
}
InforCenter_MobilePlatform_StandardList_EditFormInit = function (curpage, prePage) {
    var para = curpage.GetPara();
    var pageControl = curpage.GetControl("ItemFormPageContainer");

    if (prePage) {
        var prePagePara = prePage.GetPara();
        var data = prePagePara.Data;
        var ProjectType = data.DATASOURCETYPE;
        var pageName = ProjectType + "-EDIT";
        para.DataObjectType = data.RESULTOBJECTTYPE;
        curpage.GetControl("ItemFormPageContainer").LoadPage(pageName, para);
        para.pageName = pageName;
        HoteamUI.Page.SetContainerParas(curpage.pid, curpage.PageName(), para);
    }
}

InforCenter_MobilePlatform_StandardList_GetBaseInfo = function (pages, curpage) {
    HoteamUI.Page.FirePageEvent(curpage.pid, "OnGetDataFromPage", {});
    if (!InforCenter_Platform_Object_Data) {
        return false;
    }
    var para = curpage.GetPara();
    var pid = curpage.pid;
    var pname = curpage.PageName();
    para.Data = InforCenter_Platform_Object_Data;
    HoteamUI.Page.SetContainerParas(pid, pname, para);
    InforCenter_Platform_Object_Data = null;
    return true;
}
InforCenter_MobilePlatform_StandardList_GetFormInfo = function (pages, curpage) {
    var pageName = curpage.GetPara().pageName;
    var page = HoteamUI.Page.InstanceIn(curpage.pid, "ItemFormPageContainer", pageName);
    HoteamUI.Page.FirePageEvent(page.pid, "OnGetDataFromPage", {});
    if (!InforCenter_Platform_Object_Data) {
        return false;
    }
    var para = curpage.GetPara();
    var pid = curpage.pid;
    var pname = curpage.PageName();
    para.Data = InforCenter_Platform_Object_Data;
    HoteamUI.Page.SetContainerParas(pid, pname, para);
    InforCenter_Platform_Object_Data = null;
    return true;
}

InforCenter_MobilePlatform_StandardList_SaveForm = function (pages, curpage) {
    var formdata = null;
    var para = null;
    for (var i = 0; i < pages.length; i++) {
        page = pages[i];
        para = page.GetPara();
        if (formdata == null) {
            formdata = para.Data;
        }
        else {
            if (para.Data != null) {
                var data = para.Data;
                for (var key in data) {
                    if (!data.hasOwnProperty(key)) {
                        continue;
                    }
                    if (key != "ObjectType" && data[key] != undefined)
                        formdata[key] = data[key];
                }
            }
        }
    }
    if (para.initData) {
        var initData = para.initData;
        for (var key in initData) {
            if (!initData.hasOwnProperty(key)) {
                continue;
            }
            if (initData[key] != undefined)
                formdata[key] = initData[key];
        }
    }
    var isnew = true;
    if (para.ObjectID)
        isnew = false;
    var ret = InforCenter_Platform_Object_SaveObjectData(formdata, isnew, para);
    if (ret) {
        return [ret];
    }
}

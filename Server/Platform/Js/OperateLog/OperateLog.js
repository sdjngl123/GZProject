var InforCenter_Common_OperateLogSearch_PageOnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    if (pagePara.ActualQueryPageName) {
        var queryPageCtrl = page.GetControl("Info_Container");
        queryPageCtrl.LoadPage(pagePara.ActualQueryPageName, pagePara);
    }
}


InforCenter_Common_OperateLogSearch_PageOnQuery = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    if (!pagePara.ActualQueryPageName) {
        return;
    }

    //获取页面数据
    var queryPage = HoteamUI.Page.InstanceIn(page.pid, "Info_Container", pagePara.ActualQueryPageName);
    var queryData = HoteamUI.Page.FirePageEvent(queryPage.pid, 'GetQueryData');
    if (!queryData) {
        queryData = [];
    }

    HoteamUI.Page.FireParentPageEvent(page.pid, 'OnQuery', {
        FilterString: pageEvent.FilterString,
        EntityFilterString: pageEvent.EntityFilterString,
        QueryData: queryData,
        ButtonType: pageEvent.ButtonType
    });
}


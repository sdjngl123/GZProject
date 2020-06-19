InforCenter_Platform_WebViewCommonQuery_LoadPage = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    var currentQueryBaseData = HoteamUI.DataService.Call("InforCenter.Platform.WebListViewService.GetWebViewQueryBaseData", { para: { ViewName: pagePara.ListViewName } });
    if (currentQueryBaseData) {
        var queryMachineCtrl = page.GetControl("Info_Container");
        queryMachineCtrl.LoadFilterData(currentQueryBaseData);
    }
}

InforCenter_Platform_WebViewCommonQuery_QueryClick = function (ctrlEvent) {
    var bCheck = true;
    var FilterString = '';
    var EntityFilterString = '';
    var c = ctrlEvent.o.OtherControl('Info_Container');
    if (c.id != '') {
        var valid = c.Check();
        if (valid) {
            var data = c.GetFilterData();
            //TODO:添加实际查询处理
            $.each(data, function (i, item) {
                var setting = JSON.parse(item.setting);
                if (HoteamUI.Common.IsNullOrEmpty(item.value) == false) {
                    FilterString += InforCenter_Platform_Object_GetQueryFilter(setting.andorflag, item.id, setting.operation, item.value, false);
                }
            });
        }
    }

    if (bCheck) {
        FilterString = FilterString.substring(4);
        EntityFilterString = EntityFilterString.substring(4);
        HoteamUI.Page.FireParentPageEvent(ctrlEvent.o.ContainerID(),
            'OnQuery',
            {
                FilterString: FilterString,
                EntityFilterString: EntityFilterString,
                ButtonType: 'Query'
            });
    }
}
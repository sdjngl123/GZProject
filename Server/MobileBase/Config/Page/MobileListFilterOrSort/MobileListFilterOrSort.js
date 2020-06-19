Hoteam_InforCenter_MobileListFilterOrSort_Init = function (pageEvent) {

    var pagePara = pageEvent.o.GetPara();
    var pid = pageEvent.o.pid;
    var listConfig = HMUI.UIManager.GetMobileListConfig(pagePara.ListName);
    var items = null;
    var selected = null;
    var last = HMUI.UIManager.GetLastPagePathValue();
    var ctrl = $("#" + pid + " #listfilter");

    if (pagePara.PageType == "Filter") {
        if (HMUI.Common.IsNullOrEmpty(listConfig.MobileFilterDataService) == false) {
            items = HMUI.DataService.Call(listConfig.MobileFilterDataService, {});
        }
        else {
            items = listConfig.MobileFilters;
        }
        selected = last.Paras.Filters;
    }
    else {
        items = listConfig.MobileSorts;
        selected = last.Paras.Sorts;
    }


    //限定筛选弹出框列表内容最大高度
    ctrlContainer = $("#" + pid + " #listfilterContainer");
    ctrlContainer.css({ "max-height": $(window).height() * 0.6 + "px", "overflow": "hidden" });

    HMUI.MobileList.BuildListFilterOrSort(ctrl, pagePara.ListName, items, pagePara.ObjectType, selected);

    //限定筛选弹出框列表内容最大高度
    ctrlContainer = $("#" + pid + " #listfilterContainer");
    ctrlContainer.css("max-height", $(window).height() * 0.6 + "px");

    //使用滚动插件，解决安卓系统中此弹出界面滚动内容消失bug
    setTimeout(function () {
        var opt = {
            useTransition: false,
            hScrollbar: false,
            vScrollbar: false,
            hideScrollbar: true,
            topOffset: 0,
            onScrollMove: function () { }
        }
        new iScroll(ctrlContainer[0], opt);
    }, 500);
};
Hoteam_InforCenter_MobileListFilterOrSort_CheckBoxClick = function (obj) {

    var object = $(obj),
        checkboxes = null,
        groupname = object.attr("groupname"),
        jsmethod = object.attr("jsmethod"),
        selectmode = object.attr("selectmode");

    checkboxes = !groupname ? $("#listfilter input[type='checkbox']") : $("#listfilter input[groupname=" + groupname + "]");

    if (!jsmethod) {

        if (selectmode === "ALL") {

            var checked = object[0].checked;
            checkboxes.each(function () {
                this.checked = checked;
            });
        }
        else if (selectmode === "MULTI") {

            var len = 0,
                checkedlen = 0,
                selectAll;

            checkboxes.each(function (i) {

                if (this.getAttribute("selectmode") === "ALL") {
                    selectAll = this;
                }
                else {
                    ++len;
                    if (this.checked) {
                        ++checkedlen;
                    }
                }
            });

            (len === checkedlen) ? selectAll.checked = true : selectAll.checked = false;

        }
        else if (selectmode === "SINGLE") {
            checkboxes.each(function (i) {
                if (this.id !== obj.id && this.checked) {
                    this.checked = !obj.checked;
                }
            })
        }

        object.closest(".ui-controlgroup").controlgroup("refresh");
    }

};
Hoteam_InforCenter_MobileListFilterOrSort_OkClick = function () {

    var page = HMUI.Page.InstanceByName("MobileListFilterOrSort");
    var pagePara = page.GetPara();
    var ret = {};
    var selected = [];

    $("#" + page.pid + " #listfilter label").each(function () {
        var classstr = $(this).attr("class");
        if (classstr.indexOf('ui-checkbox-on') > -1) {
            selected.push($(this).attr("name"));
        }
    })
    if (pagePara.PageType == "Filter") {
        ret.Filters = selected;
    }
    else {
        ret.Sorts = selected;
    }
    HMUI.UIManager.Return(page.pid, "MobileListFilterOrSort", ret);
};

//页面顶部初始化
InforCenter_Platform_SmartHomePageTop_Init = function (ctrlEvent) {
    var pageDom = $("[cid='SmartHomePage_Top']")[0];
    ctrlEvent.o.LoadTemplate("SmartHomePageTop");
    $("#HomePage_SystemLabel").html(HoteamUI.Language.Lang("Common.SystemTitle"));
    var userName = HoteamUI.DataService.Call("InforCenter.Organization.OrganizationDataService.GetUserName", {});
    $("#SmartHomePage_User").html(userName);
    //$.hoteamDialog.defaultAfterMaxHandler = function (dialogContainer) { };
    //创建点击登录人名后的下拉
    var $ul = $('<ul class="SmartHomePage_User_ul" id="smart_homepage_userul">' +
                    '<li><div class="SmartHomePage_User_Arrow"></div><a href="javascript:InforCenter_Platform_ClassicHomePageTop_Setting();">个人设置</a></li>' +
                    '<li><a href="javascript:InforCenter_Platform_ClassicHomePageTop_AgentSet();">代理设置</a></li>' +
                    '<li><a href="javascript:InforCenter_Platform_ClassicHomePageTop_ModifyPWD();">修改密码</a></li>' +
                    '<li><a href="javascript:InforCenter_Platform_ClassicHomePageTop_Logout();">注销</a></li>' +
                '</ul>');
    $("body").append($ul);
    //注册事件
    $("#SmartHomePage_User").parent().on({
        "mouseover": function () {
            var position = $(this).offset();
            $("#smart_homepage_userul").css("right", 5).css("top", position.top + 38).show();
        },
        "mouseout": function () {
            $("#smart_homepage_userul").hide();
        }
    });
    $("#smart_homepage_userul").on({
        "mouseover": function () {
            $(this).show();
        },
        "mouseout": function () {
            $(this).hide();
        }
    });
    //给消息注册事件
    $("#SmartHomePage_Message").on("click", function () {
        InforCenter_Platform_TriggerNavigationClick(['SelfWorkArea', 'MyMessage']);
    });
    //显示出差代理
    InforCenter_Platform_ShowAgentUser();
}


//加载一级精简导航
InforCenter_Platform_SmartHomePage_LoadAccordion = function (ctrlEvent) {
    var data = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GetNavigationItems", {});
    PlatformUI.NavigationData = data;
    //处理PlatformUI.NavigationData，将二级导航的第一个添加Select=true
    for (var i = 0; i < PlatformUI.NavigationData.length; i++) {
        PlatformUI.NavigationData[i].Children[0].Select = true;
    }
    if (data) {
        ctrlEvent.o.LoadItems(data);
    }
}
//一级导航点击事件，刷新二级导航
InforCenter_Platform_SmartHomePage_AccordionOnClick = function (ctrlEvent) {
    var nav = $("[cid=SmartHomePage_Navigation]");
    var data = PlatformUI.NavigationData;
    for (var i = 0; i < data.length; i++) {
        if (data[i].Name == ctrlEvent.customname) {
            //更改左上角一级导航提示
            $('.hoteam-smartaccordion-left').html(data[i].Text);
            var childData = data[i].Children;
            ctrlEvent.o.OtherControl("SmartHomePage_Navigation").LoadItems(childData);
            InforCenter_Platform_ClassicHomePageNavigation_SelectChildNav(PlatformUI.NavigationData[i].Children, $(nav.children(".hoteam-accordion").find(".ui-accordion-header")), ctrlEvent.param);
        }
    }
}
//加载二级精简导航
InforCenter_Platform_SmartHomePageNavigation_LoadNavigationItems = function (ctrlEvent) {
    var data = PlatformUI.NavigationData;
    if (data) {
        $("#" + ctrlEvent.o.id).data("navigationData", data);
        var firstChildData = data[0].Children;
        ctrlEvent.o.LoadItems(firstChildData, "smart");
    }
}
//点击导航，加载当前点击的导航的页面
InforCenter_Platform_SmartHomePageNavigation_NavigationOnClick = function (ctrlEvent) {
    var pageUrl = ctrlEvent.value;
    var pageText = ctrlEvent.text;
    var pageName = null;
    var para = {};
    if (pageUrl) {
        var values = pageUrl.split('?');
        pageName = values[0];
        if (values.length > 1) {
            para = eval("(" + values[1] + ")");
        }
        para = $.extend(true, para, ctrlEvent.param);
        InforCenter_Platform_MainTabs_AddTab(pageName, para, pageText);
    }
}

//加载默认第一个导航的page页面
InforCenter_Platform_SmartHomePage_LoadContent = function (pageEvent) {
    //获取导航元素
    var accordionEle = $("[cid=SmartHomePage_Navigation]").eq(0);
    var firstAccordion = $(accordionEle).children(".hoteam-accordion").children("ul").children("li:first");
    //InforCenter_Platform_SmartHomePage_LoadPage(pageEvent.o.GetControl("SmartHomePage_Content"), firstAccordion.data("value"));
    childAccordion(firstAccordion);
    //定义一个方法，用来触发各级导航内部第一个子级导航
    function childAccordion(ele) {
        $(ele).trigger("click");
        var li = ele.children("ul").children("li");
        if (li.length > 0) {
            childAccordion($(li).eq(0));
        }
    }
}

InforCenter_Platform_Message_Read = function (para) {
    var data = InforCenter_Platform_Object_GetObjectData(para[1].SelectID);
    if (data.MSTATE == "Unread") {
        var number = $('#SmartHomePage_Message_Num').text();
        if (number > 0) {
            number = number - 1;
        }
        if (number > 0 && $("#SmartHomePage_Message_Num").length > 0) {
            $("#SmartHomePage_Message_Num").html(number).show();
        } else if (number < 1 && $("#SmartHomePage_Message_Num").length > 0) {
            $("#SmartHomePage_Message_Num").empty().hide();
        }
    }
    InforCenter_Platform_MenuCtrl_InnerReceiveServerData(para[0], { confirm: "OK" });
}

InforCenter_Platform_MessageCount_Remove = function (para) {
    var number = $('#SmartHomePage_Message_Num').text();
    if (number > 0) {
        number = number - 1;
    }
    if (number > 0 && $("#SmartHomePage_Message_Num").length > 0) {
        $("#SmartHomePage_Message_Num").html(number).show();
    } else if (number < 1 && $("#SmartHomePage_Message_Num").length > 0) {
        $("#SmartHomePage_Message_Num").empty().hide();
    }
    InforCenter_Platform_MenuCtrl_InnerReceiveServerData(para[0], { confirm: "OK" });
}



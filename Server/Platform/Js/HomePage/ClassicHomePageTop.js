//页面顶部初始化
InforCenter_Platform_ClassicHomePageTop_Init = function (ctrlEvent) {
    var pageDom = $("[cid='ClassicHomePage_Top']")[0];
    if (HoteamUI.Common.IsNullOrEmpty(pageDom) == false) {
        ctrlEvent.o.LoadTemplate("ClassicHomePageTop");
        var userName = HoteamUI.DataService.Call("InforCenter.Organization.OrganizationDataService.GetUserName", {});
        InforCenter_Platform_ClassicHomePageTop_SetLang("PersonalSetting");
        InforCenter_Platform_ClassicHomePageTop_SetLang("ModifyPassword");
        //InforCenter_Platform_ClassicHomePageTop_SetLang("ThemeSetting");
        InforCenter_Platform_ClassicHomePageTop_SetLang("Logout");
        $("#homePageSearchPlaceHolder").html(HoteamUI.Language.Lang("ClassicHomePageTop", "SearchPlaceHolder"));
        $("#homePageSearchTypePlaceHolder").html(HoteamUI.Language.Lang("ClassicHomePageTop", "SearchTypePlaceHolder"));
        //设置欢迎登陆语言
        var welspans = $("#welcomeWord").children("span");
        $(welspans.eq(0)).html(HoteamUI.Language.Lang("ClassicHomePageTop", "WelcomeWord"));
        $(welspans.eq(1)).html(HoteamUI.DataService.Call("InforCenter.Organization.OrganizationDataService.GetUserName", {}));
        $("#mycollectionbtn").text(HoteamUI.Language.Lang("ClassicHomePageTop", "MyCollection"));
        var homePageMunuDic = HoteamUI.Language.Lang("QuickNavigation", "HomePage");
        $("#MainPageMenu").attr("title", homePageMunuDic);
        $("#MainPageMenu").click(function () {
            var mainFlatPara = {};
            if (HoteamUI.Common.IsNullOrEmpty(AppSets.DefaultMainFlatPara) == false)
                mainFlatPara = JSON.parse(AppSets.DefaultMainFlatPara);
            InforCenter_Platform_MainTabs_AddTab(AppSets.DefaultMainFlat, mainFlatPara, homePageMunuDic);
        });

        var data = HoteamUI.DataService.Call("InforCenter.Organization.OrganizationDataService.GetAgentID", {});
        if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
            var agentStr = data.split(':');
            if (agentStr.length > 1 && HoteamUI.Common.IsNullOrEmpty(agentStr[1]) == false) {
                InforCenter_Platform_ClassicHomePageTop_SetLang("ShowAgent");
                if (agentStr[0] == "0") {
                    $("#ShowAgent").attr("title", agentStr[1] + " " + HoteamUI.Language.Lang("ClassicHomePageTop.Agented"));
                } else if (agentStr[0] == "1") {
                    $("#ShowAgent").attr("title", HoteamUI.Language.Lang("ClassicHomePageTop.Agent") + agentStr[1]);
                }
                $("#ShowAgent").css("cursor", "pointer");
            }
        }
        //第一次登录时 值可能不存在，使用上面已经查询出的UserName
        //var username = HoteamUI.Security.LoginPara.UserName;
        var username = userName;
        $("#homePageUserName").attr("title", username);
        if (username && username.length > 20) {
            username = username.substring(0, 20) + "...";
        }
        $("#homePageUserName").text(username);
    }
    $("#homePageSearchType").attr('readonly', true);
    $.hoteamDialog.defaultAfterMaxHandler = function (dialogContainer) { };

    //注册点击事件 
    if ($("#homePage_collectionBtn").length != 0) {
        var favoriteTitle = HoteamUI.Language.Lang("Favorite.Title");
        $("#homePage_collectionBtn").attr('title', favoriteTitle)
            .click(function () {
                HoteamUI.Common.OCXIframe.Show(1500);
                if ($("#homePage_collection").length == 0) {
                    var topH = $("[cid='ClassicHomePageTop_Layout']").height();
                    var bottomH = $("[cid='ClassicHomePageBottom_Layout']").height();
                    var winHeight = $(window).height();
                    var divH = winHeight - topH - bottomH;
                    $("body").append('<div id="homePage_collection" ></div>');
                    $("#homePage_collection").css({
                        height: divH + "px",
                        top: topH + "px"
                    });
                }
                var divEle = $("#homePage_collection");

                var width = $("#PageContainer").width();
                divEle.css({ left: width + 'px' });

                width = width - 300;
                divEle.show();

                divEle.animate({
                    left: width + "px"
                }, 500, function () {
                    showPage(divEle);
                });

                function showPage(divEle) {
                    if (divEle.children().length == 0) {
                        HoteamUI.UIManager.Show("homePage_collection", "Favorite");
                    } else {
                        HoteamUI.Page.FirePageEvent("homePage_collection", "RefreshData");
                    }
                }
            });
    }

    if ($("#homePage_historyBtn").length != 0) {
        var historyTitle = HoteamUI.Language.Lang("AccessRecord.Title");
        $("#homePage_historyBtn").attr('title', historyTitle)
            .click(function () {
                HoteamUI.Common.OCXIframe.Show(1500);
                if ($("#homePage_history").length == 0) {
                    var topH = $("[cid='ClassicHomePageTop_Layout']").height();
                    var bottomH = $("[cid='ClassicHomePageBottom_Layout']").height();
                    var winHeight = $(window).height();
                    var divH = winHeight - topH - bottomH;
                    $("body").append('<div id="homePage_history" ></div>');
                    $("#homePage_history").css({
                        height: divH + "px",
                        top: topH + "px"
                    });
                }
                var divEle = $("#homePage_history");

                var width = $("#PageContainer").width();
                divEle.css({ left: width + 'px' });

                width = width - 300;
                divEle.show();

                divEle.animate({
                    left: width + "px"
                }, 500, function () {
                    showPage(divEle);
                });


                function showPage(divEle) {
                    if (divEle.children().length == 0) {
                        HoteamUI.UIManager.Show("homePage_history", "AccessRecord");
                    } else {
                        HoteamUI.Page.FirePageEvent("homePage_history", "RefreshData");
                    }
                }
            });
    }
    $(document).on("mousedown", function (e) {
        var target = $(e.target);
        if (target.closest(".ui-dialog").length != 0) {
            return;
        }
        if (target.closest("#homePage_collection").length == 0) {
            if (target.attr("id") == "homePage_collectionBtn") {
            } else {
                if ((HoteamUI.Browser.isIE && HoteamUI.Browser.version == "18.0") || HoteamUI.Common.OCXIframe.IsExist()) {
                    $("#homePage_collection").hide();
                    HoteamUI.Common.OCXIframe.Hide();
                    //console.log("#homePage_collection");
                } else {
                    $("#homePage_collection").animate({ "right": "-300px" }, function () {
                        setTimeout(function () {
                            $("#homePage_collection").hide();
                            //HoteamUI.Common.OCXIframe.Hide();
                            //console.log("#homePage_collection setTimeout");
                        }, 1000);
                    });
                }
            }
        }
        if (target.closest("#homePage_history").length == 0) {
            if (target.attr("id") == "homePage_historyBtn") {
            } else {
                if ((HoteamUI.Browser.isIE && HoteamUI.Browser.version == "18.0") || HoteamUI.Common.OCXIframe.IsExist()) {
                    $("#homePage_history").hide();
                    HoteamUI.Common.OCXIframe.Hide();
                    //console.log("homePage_history");
                } else {
                    $("#homePage_history").animate({ "right": "-300px" }, function () {
                        setTimeout(function () {
                            $("#homePage_history").hide();
                            //HoteamUI.Common.OCXIframe.Hide();
                            //console.log("homePage_history setTimeout");
                        }, 1000);

                    });
                }
            }
        }
    })


    $(document).resize(function () {
        $("#homePage_collection").remove();
        $("#homePage_history").remove();
    })

    //搜索功能
    $("#homePageSearch").on("click", function () {
        $("#homePageSearchPlaceHolder").hide();
    }).on("blur", function () {
        if (!$(this).val()) {
            $("#homePageSearchPlaceHolder").show();
        }
    }).on("keyup", function (e) {
        if ($(this).val()) {
            $("#homePageSearchDelete").show();
        }
        else {
            $("#homePageSearchDelete").hide();
        }
        if (e.which == 13) {
            InforCenter_Platform_ClassicHomePageTop_Search($(this).val());
            $(this).blur();
        }
    });
    $("#homePageSearchPlaceHolder").click(function () {
        $("#homePageSearch").focus();
        $(this).hide();
    });
    $("#homePageSearchDelete").click(function () {
        $("#homePageSearch").val("").focus();
        $(this).hide();
    });
    $("#homePageSearchBtn").click(function () {
        InforCenter_Platform_ClassicHomePageTop_Search($("#homePageSearch").val());
        $("#homePageSearch").blur();
    });

    InforCenter_Platform_ShowSearchHistory($("#homePageSearchHistoryBtn"), $("#homePageSearch"), "homepage");

    $("#homePageSearchType").click(function (e) {
        var pos = $(this).offset();
        HoteamUI.Common.OCXIframe.Show();
        showTypeUI(pos.top + 22, pos.left - 2);
    });
    $("#homePageSearchTypePlaceHolder").click(function () {
        $("#homePageSearchType").click();
    });
    $("#homePageSearchTypeBtn").click(function () {
        $("#homePageSearchType").click();
    });
    $("#homePageMutiSelectDelete").click(function () {
        $("#homePageSearchType").val("").attr("val", "");
        $("#homePageSearchTypePlaceHolder").show();
        var ul = $('.HomePage-SearchTypeUI');
        ul.children().find(".HomePage-SearchTypeUI-Checkbox").css("display", "none");
        ul.hide();
        $(this).hide();
    });
    $(document).on("mousedown", function (e) {
        $('.HomePage-SearchTypeUI').hide();
        HoteamUI.Common.OCXIframe.Hide();
        //console.log('document');
    })
    var showTypeUI = function (top, left) {
        var ul = $('.HomePage-SearchTypeUI');
        if (ul.length == 0) {
            var ret = HoteamUI.DataService.Call("InforCenter.Platform.ObjectService.GetObjectTypeListByModelGroup", { para: { ModelGroup: 'SampleQuery' } });
            var html = '<ul class="HomePage-SearchTypeUI">';
            if (!HoteamUI.Common.IsNullOrEmpty(ret) && ret.length > 0) {
                for (var i = 0; i < ret.length; i++) {
                    html += '<li val="' + ret[i].Key + '" title="' + ret[i].Value + '">' + ret[i].Value +
                        '<span class="HomePage-SearchTypeUI-Checkbox basesprite b-checkbox-true-full"></span>' +
                        '</li>';
                }
            }
            html += '</ul>';
            $("body").append(html);
            ul = $('.HomePage-SearchTypeUI');
            ul.on("click", "li", function () {
                var check = $(this).children('span');
                if (check.css("display") == "none") {
                    check.show();
                } else {
                    check.hide();
                }
                setValue();
            }).on("click", "span", function () {
                $(this).hide();
                setValue();
                return false;
            }).on("mousedown", function () {
                return false;
            });
            function setValue() {
                var checks = ul.find(".HomePage-SearchTypeUI-Checkbox");
                var str = '', strVal = '';
                checks.each(function () {
                    var check = $(this);
                    if (check.css("display") != "none") {
                        var li = check.parent();
                        str += li.text() + ";";
                        strVal += li.attr("val") + ";";
                    }
                });
                $("#homePageSearchType").val(str.slice(0, -1)).attr("val", strVal.slice(0, -1));
                if (str) {
                    $("#homePageSearchTypePlaceHolder").hide();
                    $("#homePageMutiSelectDelete").show();
                } else {
                    $("#homePageSearchTypePlaceHolder").show();
                    $("#homePageMutiSelectDelete").hide();
                }
            }
        }
        ul.show().css({
            top: top,
            left: left
        });
    }

    InforCenter_Platform_ClassicHomePage_Setting();
}
InforCenter_Platform_ClassicHomePageTop_SetLang = function (label) {
    var dom = $("#" + label);
    if (HoteamUI.Common.IsNullOrEmpty(label) == false && HoteamUI.Common.IsNullOrEmpty(dom) == false) {
        var lang = HoteamUI.Language.Lang("ClassicHomePageTop", label);
        dom.attr("title", lang);
    }
}

//设置按钮悬浮事件
InforCenter_Platform_ClassicHomePage_Setting = function () {
    ele = $("#ClassicHomePage_Setting");
    if ($(".classicHomePage_setting_ul").length == 0) {
        var $ul = $('<ul class="classicHomePage_setting_ul">' +
            '<li ><a href="javascript:InforCenter_Platform_ClassicHomePageTop_AgentSetting();"><span class="basesprite b-bussiness-agent"></span><span>' + HoteamUI.Language.Lang("ClassicHomePageTop", "BussinessAgent") + '</span></a></li>' +
            '<li ><a href="javascript:InforCenter_Platform_ClassicHomePageTop_Setting();"><span class="basesprite b-person-setting"></span><span>' + HoteamUI.Language.Lang("ClassicHomePageTop", "PersonalSetting") + '</span></a></li>' +
            '<li ><a href="javascript:InforCenter_Platform_ClassicHomePageTop_ModifyPWD();"><span class="basesprite b-password-setting"></span><span>' + HoteamUI.Language.Lang("ClassicHomePageTop", "ModifyPassword") + '</span></a></li>' +
            '<li ><a href="javascript:InforCenter_Platform_ClassicHomePageTop_HomePageSetting();"><span class="basesprite b-homepage-setting"></span><span>' + HoteamUI.Language.Lang("ClassicHomePageTop", "HomePageSetting") + '</span></a></li>' +
            '<li  style="border:none;"><a href="javascript:InforCenter_Platform_ClassicHomePageTop_Logout();"><span class="basesprite b-logout"></span><span>' + HoteamUI.Language.Lang("ClassicHomePageTop", "Logout") + '</span></a></li>' +
            '</ul>');
        $ul.on("mouseenter", function () {
            if (timer) {
                clearTimeout(timer);
            }
            $ul.show();
            HoteamUI.Common.OCXIframe.Show();
        }).on("mouseleave", function () {

            $ul.hide();
            HoteamUI.Common.OCXIframe.Hide();
        });
        $ul.children("li").on("mouseenter", function () {
            $(this).addClass("classicHomePage_setting_li_hover");
        }).on("mouseleave", function () {
            $(this).removeClass("classicHomePage_setting_li_hover");
        });

        $ul.children("li").click(function () {

            $ul.hide();
            HoteamUI.Common.OCXIframe.Hide();
        });
        $("body").append($ul);
    }
    var timer;
    ele.mouseleave(function () {

        timer = setTimeout(function () {
            $ul.hide();
            HoteamUI.Common.OCXIframe.Hide();
        }, 500);

        HoteamUI.Common.OCXIframe.Timer.push(timer);
    });

    //$(document).mousedown(function () {
    //    $ul.hide();
    //    //HoteamUI.Common.OCXIframe.Hide();
    //});

    ele.click(function () {
        HoteamUI.Common.OCXIframe.Show();
        //计算下拉的位置
        var position = $(ele).offset();
        $(".classicHomePage_setting_ul").css({
            top: position.top + 34,
            left: position.left - 54
        }).show();
    });

}
//首页设置
InforCenter_Platform_ClassicHomePageTop_HomePageSetting = function () {
    HoteamUI.UIManager.Popup("HomePageSetting", {}, null, {});
}
//个人设置
InforCenter_Platform_ClassicHomePageTop_Setting = function () {
    HoteamUI.UIManager.Popup("PersonalSetting", {}, null, {});
}

//修改密码
InforCenter_Platform_ClassicHomePageTop_ModifyPWD = function () {
    HoteamUI.UIManager.Popup("ModifyPassword", {}, null, {});
}
//代理设置
InforCenter_Platform_ClassicHomePageTop_AgentSet = function () {
    HoteamUI.UIManager.Popup("WorkflowEvectionAgent", { minWindow: false, maxWindow: false }, null, {}, "750*260");
}
//取消
InforCenter_Platform_ClassicHomePageTop_RetCancel = function (ctrlEvent) {
    var pid = ctrlEvent.o.ContainerID();
    HoteamUI.UIManager.Return(pid, {});
}
//注销
InforCenter_Platform_ClassicHomePageTop_Logout = function () {
    var callback = function (data, ret) {
        if (ret && ret.confirm == "OK") {
            HoteamUI.Security.Logout();

        }
    }
    var para = { pageMode: "OkCancel", message: HoteamUI.Language.Lang("ClassicHomePageTop", "ConfirmLogout") }

    HoteamUI.UIManager.Popup("Confirm", para, callback, {});

}

//搜索事件
InforCenter_Platform_ClassicHomePageTop_Search = function () {
    var searchType = $("#homePageSearchType").attr("val");
    var searchText = $("#homePageSearch").val();
    if (HoteamUI.Common.IsNullOrEmpty(searchText)) {
        var msg = HoteamUI.Language.Lang("Platform", "InputQueryCondition");
        HoteamUI.UIManager.MsgBox(msg);
        return;
    }
    var title = HoteamUI.Language.Lang("QueryMachine", "SampleQuery");
    var pagePara = { ItemName: "SampleQueryMachineQueryList", SearchType: searchType, SearchText: searchText, Url: ['SampleQuery'] };
    InforCenter_Platform_MainTabs_AddTab("ListManagement", pagePara, title, false);
    InforCenter_Platform_SaveSearchHistory("homepage", searchText, 10);
}
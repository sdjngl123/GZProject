
HoteamUI.Control.OMenuPreview = {

    Create: function () {
        var parentId = this.id;
        var id = this.id + "_MenuPreview";
    },
    Resize: function () {
        MenuPreviewGroupPage();
    },
    LoadItemsFromServer: function (data, quickdata) {

        //清除以前生成的html
        $("#" + parentId).html("");
        $(".hoteam-MenuPreview-Menu-sub").remove();

        var parentId = this.id;
        var id = this.id + "_MenuPreview";

        //将data加入缓存
        $("#" + parentId).data("OMenuPreview", data);

        var menuHtml = "";
        var subMenuHtml = "";

        //添加分页  moveup
        menuHtml += "<img id='MenuPreviewPageMoveUp' onclick='MenuPreviewPageMoveClick(\"up\")'  class='MenuPreviewPageMove' src='" + PageInit.WebRootPath + "/Platform/Image/Common/MoveUp.png' />";

        //添加总预览
        var allMenuText = HoteamUI.Language.Lang("OriginalityHomePageNavigation", "AllMenu"); // “所有菜单”
        menuHtml += "<div id='MenuPreviewGroupMenu_all' class='hoteam-MenuPreview-Menu' title='" + allMenuText + "'>";
        menuHtml += "<img src='" + PageInit.WebRootPath + "/Platform/Image/Common/global.gif' style='display:block; margin:2px; margin-top:5px;'/>";
        menuHtml += "</div>";
        subMenuHtml += "<div id='MenuPreviewGroupMenu_all" + "_sub' class='hoteam-MenuPreview-Menu-sub'>";

        for (var i in data) {
            subMenuHtml += "<table border='0' cellpadding='0' cellspacing='0' width='97%' class='MenuPreview-allMenu-sub-table ui-hoteam-font-title'><tr valign='middle'>";
            subMenuHtml += "<td style='width:80px; text-align:center;'><b>" + data[i].Text + "</b></td>";
            subMenuHtml += "<td ><hr /></td>";
            subMenuHtml += "</tr></table>"
            for (var j in data[i].Children) {
                subMenuHtml += MenuPreviewCreateMenuItem(data[i].Children[j], parentId, i, j);
            }
        }

        subMenuHtml += "</div>";


        var QuickNavText = HoteamUI.Language.Lang("OriginalityHomePageNavigation", "QuickNavName");

        menuHtml += "<div id='QuickNav_all' class='hoteam-MenuPreview-Menu' title='" + QuickNavText + "'>";
        menuHtml += "<img src='" + PageInit.WebRootPath + "/Platform/Image/Common/star.png' style='display:block; margin:2px; margin-top:5px;'/>";
        menuHtml += "</div>";
        subMenuHtml += "<div id='QuickNav_all_sub' class='hoteam-MenuPreview-Menu-sub'>";


        subMenuHtml += "</div>";


        //添加分组预览
        for (var i in data) {
            //根目录
            menuHtml += "<div id='" + id + "_" + data[i].Name + "' title='" + data[i].Text + "' class='hoteam-MenuPreview-Menu'>";
            menuHtml += "<img src='" + data[i].Icon.substring(2) + "' alt='" + data[i].Text + "' style='display:block; margin:2px;height:17px; width:17px;'/>";
            menuHtml += data[i].Text;
            menuHtml += "</div>";

            //子目录
            subMenuHtml += "<div id='" + id + "_" + data[i].Name + "_sub' class='hoteam-MenuPreview-Menu-sub'>";
            subMenuHtml += "<div style='height:5px;'>&nbsp;</div>"; //占空
            for (var j in data[i].Children) {
                subMenuHtml += MenuPreviewCreateMenuItem(data[i].Children[j], parentId, i, j);
            }
            subMenuHtml += "</div>";

        }

        //添加分页 movedown
        menuHtml += "<img id='MenuPreviewPageMoveDown' onclick='MenuPreviewPageMoveClick(\"down\")' class='MenuPreviewPageMove' src='" + PageInit.WebRootPath + "/Platform/Image/Common/MoveDown.png' />";

        $("#" + parentId).html(menuHtml);
        $("body").append(subMenuHtml);



        //添加快捷导航

        if (quickdata && quickdata.length > 0) {
            for (var i in quickdata) {
                var item = quickdata[i];
                MenuPreviewCreateQuickNav(item);
            }
        }


        //左侧导航组分页
        MenuPreviewGroupPage();

        //预览效果
        DoMenuPreview();

        var container = $("#" + parentId);
        $(" .hoteam-MenuPreview-Menu", container)
        .addClass("ui-state-default ui-corner-all")
        .click(function () {
            var items = $(this).siblings().removeClass("ui-state-active");
            $(this).addClass("ui-state-active");
        })
        .hover(function () {
            $(this).addClass("ui-state-hover");
        },
        function () {
            $(this).removeClass("ui-state-hover");
        });
        $("body .hoteam-MenuPreview-Menu-sub").addClass("ui-widget-content ui-corner-all ui-hoteam-border-color");
        $("body .hoteam-MenuPreview-Menu-sub-Menu").css("border", "none").hover(function () {
            $(this).addClass("ui-state-hover");
        }, function () {
            $(this).removeClass("ui-state-hover");
        });
    }
};

function MenuPreviewCreateQuickNav(dataItem) {
    var deleteQuickNavText = HoteamUI.Language.Lang("OriginalityHomePageNavigation", "DeleteQuickNavText");
    var quickitem = $(["<div class='hoteam-MenuPreview-Menu-sub-Menu' data-id='" + dataItem.ID + "'>",
     "<img src='" + PageInit.WebRootPath + "/Base/Image/delete.png' title='" + deleteQuickNavText + "' class='hoteam-MenuPreview-Menu-sub-Menu-quickNav' onclick=\"MenuPreviewItemRemoveQuickNav('" + dataItem.ID + "',this)\"/>",
     "<a href='javascript:void(0)'>",
     "<br />",
   "<img src='" + dataItem.ImageSrc.substring(2) + "' alt='" + dataItem.Text + "' style='width:45px; height:45px;'/>",
   "<br />",
   dataItem.Text,
   "</a>",
   "</div>"].join(''));
    $("#QuickNav_all_sub").append(quickitem);
    $("a", quickitem).on({
        click: function () {
            if (dataItem.QuickType == "Module") {
                InforCenter_Platform_Navigation_AddTab(dataItem.Url, dataItem.Text);
            }
            else {
                InforCenter_Platform_OpenQuick(dataItem);
            }
            $(".hoteam-MenuPreview-Menu-sub").hide();
            $(".hoteam-MenuPreview-Menu").removeClass("hoteam-MenuPreview-Menu-hover");
            //ocx遮盖处理
            $("iframe:not(#ocxIframe)").css("display", "block");
        },
        mousedown: function (e) {
            $("body").on({ contextmenu: function () { return false; } });
            $("ul.hoteam-rightmenu").hide();
            var position = {
                top: e.pageY,
                left: e.pageX
            };
            InforCenter_Platform_QuickRightMenu(dataItem, position);
            window.setTimeout(function () { $("body").off("contextmenu") }, 100);
        }
    });

}


//生成单个按钮
function MenuPreviewCreateMenuItem(dataItem, parentId, i, j) {

    var addQuickNavText = HoteamUI.Language.Lang("OriginalityHomePageNavigation", "AddQuickNavText");

    var html = "";
    html += "<div class='hoteam-MenuPreview-Menu-sub-Menu'>";
    html += "<img src='" + PageInit.WebRootPath + "/Base/Image//addQuickNav.gif' title='" + addQuickNavText + "' class='hoteam-MenuPreview-Menu-sub-Menu-quickNav' onclick=\"MenuPreviewItemAddQuickNav('" + parentId + "'," + i + "," + j + ")\"/>";
    html += "<a onclick=\"MenuPreviewItemClick('" + parentId + "'," + i + "," + j + ")\">";
    html += "<br />";
    html += "<img src='" + dataItem.Icon.substring(2) + "' alt='" + dataItem.Text + "' style='width:45px; height:45px;'/>";
    html += "<br />";
    html += dataItem.Text;
    html += "</a>";
    html += "</div>";
    return html;
}

//点击事件
function MenuPreviewItemClick(id, i, j) {
    var data = $("#" + id).data("OMenuPreview");
    var dataItem = data[i].Children[j];
    InforCenter_Platform_Navigation_AddTab(dataItem.Value, dataItem.Text);
    $(".hoteam-MenuPreview-Menu-sub").hide();
    $(".hoteam-MenuPreview-Menu").removeClass("hoteam-MenuPreview-Menu-hover");
    //ocx遮盖处理
    $("iframe:not(#ocxIframe)").css("display", "block");
}

//添加快捷方式
function MenuPreviewItemAddQuickNav(id, i, j) {
    var data = $("#" + id).data("OMenuPreview");
    var dataItem = data[i].Children[j];
    InforCenter_Platform_QuickNavigation_AddQuickNavigation(dataItem.Name, function (navdata) {
        MenuPreviewCreateQuickNav({
            ImageSrc: navdata.Image,
            Text: dataItem.Text,
            Url: dataItem.Value,
            ID: dataItem.Name
        });
        $("body .hoteam-MenuPreview-Menu-sub-Menu").css("border", "none").hover(function () {
            $(this).addClass("ui-state-hover");
        }, function () {
            $(this).removeClass("ui-state-hover");
        });
    });
}

//移除快捷方式
function MenuPreviewItemRemoveQuickNav(name, obj) {
    InforCenter_Platform_QuickNavigation_RemoveQuickNavigation(name, function () {
        var quickitme = $(obj).closest(".hoteam-MenuPreview-Menu-sub-Menu");
        quickitme.remove();
    });
}

//分页
function MenuPreviewPageMoveClick(type) {
    var pageIndex = $("#MenuPreviewPageMoveUp").data("OMenuPreviewPageIndex");
    if (type == "up") {
        pageIndex--;
        $("#MenuPreviewPageMoveDown").show();
    }
    if (type == "down") {
        pageIndex++;
        $("#MenuPreviewPageMoveUp").show();
    }

    var menuCount = $(".hoteam-MenuPreview-Menu[page=" + pageIndex + "]").length;
    if (menuCount > 0) {
        $(".hoteam-MenuPreview-Menu").hide();
        $(".hoteam-MenuPreview-Menu[page=" + pageIndex + "]").fadeIn(500);
        $(".hoteam-MenuPreview-Menu[id='MenuPreviewGroupMenu_all']").show();

        var nextPageIndex = 0;
        if (type == "up") {
            nextPageIndex = pageIndex - 1;
            var nextMenuCount = $(".hoteam-MenuPreview-Menu[page=" + nextPageIndex + "]").length;
            if (nextMenuCount == 0) {
                $("#MenuPreviewPageMoveUp").hide();
            }
        }
        if (type == "down") {
            nextPageIndex = pageIndex + 1;
            var nextMenuCount = $(".hoteam-MenuPreview-Menu[page=" + nextPageIndex + "]").length;
            if (nextMenuCount == 0) {
                $("#MenuPreviewPageMoveDown").hide();
            }
        }
    }

    //保存当前pageindex
    $("#MenuPreviewPageMoveUp").data("OMenuPreviewPageIndex", pageIndex);
}

//左侧导航组分页
function MenuPreviewGroupPage() {
    $(".hoteam-MenuPreview-Menu-sub").width($("body").width() - $("#MenuPreviewGroupMenu_all").parent().outerWidth() - 10);
    //获取导航栏中高度（去除“全部菜单”, 上下分页）
    var parentHeight = $("#MenuPreviewGroupMenu_all").parent().parent().height();
    parentHeight = parentHeight - $("#MenuPreviewGroupMenu_all").outerHeight();
    parentHeight = parentHeight - $("#MenuPreviewPageMoveUp").outerHeight() - 6;
    parentHeight = parentHeight - $("#MenuPreviewPageMoveDown").outerHeight() - 6;

    //为menu设置page参数，从1开始递增
    var menuSumHeight = 0;
    var menuPageIndex = 1;
    $(".hoteam-MenuPreview-Menu").each(function () {
        if ($(this).attr("id") != "MenuPreviewGroupMenu_all") {

            menuSumHeight += $(this).outerHeight();
            if (menuSumHeight >= parentHeight) {
                menuPageIndex++;
                menuSumHeight = $(this).outerHeight();
            }

            $(this).attr("page", menuPageIndex);
        }
    });

    //初始化，只显示第一页
    if (menuPageIndex > 1) {
        $(".hoteam-MenuPreview-Menu").hide();
        $(".hoteam-MenuPreview-Menu[page=1]").show();
        $(".hoteam-MenuPreview-Menu[id='MenuPreviewGroupMenu_all']").show();

        $("#MenuPreviewPageMoveDown").show();


        //保存当前页数
        $("#MenuPreviewPageMoveUp").data("OMenuPreviewPageIndex", 1);
    }
    else {
        $(".hoteam-MenuPreview-Menu").show();
        $(".MenuPreviewPageMove").hide();

        //清空当前页数
        $("#MenuPreviewPageMoveUp").data("OMenuPreviewPageIndex", 0);
    }
}

//预览效果实现
function DoMenuPreview() {
    $(".hoteam-MenuPreview-Menu").bind("click", function () {
        //ocx遮盖处理
        $("iframe:not(#ocxIframe)").css("display", "none");
        var thisId = $(this).attr("id");
        var subId = "#" + thisId + "_sub";

        var bodyWidth = $("body").width();
        var parentHeight = $(this).parent().parent().height();

        var topValue = $(this).offset().top;
        var leftValue = $(this).offset().left;
        var widthValue = $(this).outerWidth();

        //sub层接触到底部，处理
        var subHeight = $(subId).outerHeight();
        var beyondBottom = topValue - $("#MenuPreviewGroupMenu_all").offset().top + subHeight - parentHeight;
        if (beyondBottom > 0) {
            var tempTopVlue = topValue - beyondBottom;
            if (tempTopVlue > 0) {
                topValue = tempTopVlue;
            }

            //考虑顶部翻页的箭头
            if ($("#MenuPreviewPageMoveUp").css("display") != "none") {
                topValue = topValue - $("#MenuPreviewPageMoveUp").outerHeight() - 5;
            }
        }

        if (subId.indexOf("_all") >= 0) {
            $(subId).height(parentHeight - 10);

            //考虑顶部翻页的箭头
            if ($("#MenuPreviewPageMoveUp").css("display") != "none") {
                topValue = topValue - $("#MenuPreviewPageMoveUp").outerHeight() - 5;
            }
        }

        $(subId).css({ "top": topValue, "left": leftValue + widthValue });
        $(subId).width(bodyWidth - widthValue - 10);

        if ($(subId).css("display") == "none") {
            $(".hoteam-MenuPreview-Menu-sub").hide();
            $(".hoteam-MenuPreview-Menu").removeClass("hoteam-MenuPreview-Menu-hover");
        }

        var animateTime = $(subId).height(); //动画时间等于高度（并控制在300-10000ms之内）
        if (animateTime < 300) {
            animateTime = 300;
        }
        if (animateTime > 1000) {
            animateTime = 1000;
        }

        $(subId).slideToggle(animateTime, function () {
            var self = $(this);
            //ocx遮盖处理
            var display = self.css("display");
            if (display == "none") {
                $("iframe:not(#ocxIframe)").css("display", "block");
            }
        });
        $(this).toggleClass("hoteam-MenuPreview-Menu-hover");

        return false;
    });

    $("body").on({
        mouseenter: function () {
            $(this).children().first().show();
        },
        mouseleave: function () {
            $(this).children().first().hide();
        }
    }, ".hoteam-MenuPreview-Menu-sub-Menu");


    //实现：sub菜单层弹出后，点击别处，该层隐藏
    $(".hoteam-MenuPreview-Menu-sub").click(function () {
        return false
    });
    $(body).click(function () {
        $(".hoteam-MenuPreview-Menu-sub").hide("normal", function () {
            //ocx遮盖处理
            $("iframe:not(#ocxIframe)").css("display", "block");
        });
    });
}
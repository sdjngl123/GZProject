//帮助内容中超链接处理方法
InforCenter_Platform_Help_LinkClick = function (linkName, type, document) {
    var pageid = InforCenter_Platform_Help_GetRequest(document, "pageid");
    if (pageid) {
        HoteamUI.Page.FirePageEvent(pageid, "OnCreate", { LinkName: linkName, Type: type });
    }
}
//获取Url参数
InforCenter_Platform_Help_GetRequest = function (document, strName) {
    var strHref = document.location.href;
    var intPos = strHref.indexOf("?");
    var strRight = strHref.substr(intPos + 1);
    var arrTmp = strRight.split("&");
    for (var i = 0; i < arrTmp.length; i++) {
        var arrTemp = arrTmp[i].split("=");
        if (arrTemp[0].toUpperCase() == strName.toUpperCase())
            return arrTemp[1];
    }
    return "";
}
//加载页面
InforCenter_Platform_Help_PageLoad = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    var tabCtrl = page.GetControl("Help_Tab");
    var tabItems = tabCtrl.GetTabInfoList();
    var treeCtrl = HoteamUI.Control.InstanceIn(tabItems[0].pid, "HelpTabCatalogTree");
    if (pageEvent.Type == "Link") {
        var node = InforCenter_Platform_HelpGetLinkToNode(treeCtrl.GetTreeRootNodes(), pageEvent.LinkName);
        if (node != null) {
            treeCtrl.SelectNode(node);
            treeCtrl.ExpandNode(node,true);
            var iframeCtrl = page.GetControl("Help_Right");
            if (node.Value2 == "true") {
                iframeCtrl.LoadPage(PageInit.WebRootPath + "/" + node.Value4 + "?pageid=" + page.pid + "&time=" + new Date().getTime());
            }
            else { //无内容的赋空
                iframeCtrl.LoadPage("");
            }
        }
    }
    else if (pagePara.Type == "NavToHelp") {
        var data = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GetHelpTreeData", {});
        if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
            treeCtrl.LoadNodes(null, data);
        }
        var node = InforCenter_Platform_HelpGetNavToNode(treeCtrl.GetTreeRootNodes(), pagePara.TitleID);
        if (node != null && data != null && data.length > 0) {
            treeCtrl.SelectNode(node);
            treeCtrl.ExpandNode(node,true);
            var iframeCtrl = page.GetControl("Help_Right");
            if (node.Value2 == "true") {
                iframeCtrl.LoadPage(PageInit.WebRootPath + "/" + node.Value4 + "?pageid=" + page.pid + "&time=" + new Date().getTime());
            }
            else { //无内容的赋空
                iframeCtrl.LoadPage("");
            }
        }
    }
    else {
        var data = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GetHelpTreeData", {});
        if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
            treeCtrl.LoadNodes(null, data);
        }
        if (pagePara.SelectTabID)
        {
            //根据SelectTabID获取选中项
            var node = InforCenter_Platform_HelpTabIDToNode(treeCtrl.GetTreeRootNodes(), pagePara.SelectTabID);
            if (node != null && data != null && data.length > 0) {
                treeCtrl.SelectNode(node);
                treeCtrl.ExpandNode(node, true);
                var iframeCtrl = page.GetControl("Help_Right");
                if (node.Value2 == "true") {
                    iframeCtrl.LoadPage(PageInit.WebRootPath + "/" + node.Value4 + "?pageid=" + page.pid + "&time=" + new Date().getTime());
                }
                else { //无内容的赋空
                    iframeCtrl.LoadPage("");
                }
            }
        }
    }
}
//节点点击事件
InforCenter_Platform_HelpGetLinkToNode = function (nodes, linkName) {
    var selectnode = null;
    if (HoteamUI.Common.IsNullOrEmpty(nodes) == false) {
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (HoteamUI.Common.IsNullOrEmpty(node.value3) == false && node.value3 == linkName) {
                selectnode = node;
                break;
            }
            else {
                selectnode = InforCenter_Platform_HelpGetLinkToNode(node.children, linkName);
                if (selectnode != null) {
                    break;
                }
            }
        }
    }
    return selectnode;
}

//节点点击事件
InforCenter_Platform_HelpGetNavToNode = function (nodes, titleID) {
    var selectnode = null;
    if (HoteamUI.Common.IsNullOrEmpty(nodes) == false) {
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (HoteamUI.Common.IsNullOrEmpty(node.value1) == false && node.value1 == titleID) {
                selectnode = node;
                break;
            }
            else {
                selectnode = InforCenter_Platform_HelpGetNavToNode(node.children, titleID);
                if (selectnode != null) {
                    break;
                }
            }
        }
    }
    return selectnode;
}

///获取导航名称获取树节点
InforCenter_Platform_HelpTabIDToNode = function (nodes, tabID) {
    var selectnode = null;
    if (HoteamUI.Common.IsNullOrEmpty(nodes) == false) {
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (HoteamUI.Common.IsNullOrEmpty(node.value5) == false && node.value5 == tabID) {
                selectnode = node;
                break;
            }
            else {
                selectnode = InforCenter_Platform_HelpTabIDToNode(node.children, tabID);
                if (selectnode != null) {
                    break;
                }
            }
        }
    }
    return selectnode;
}

//节点点击事件
InforCenter_Platform_Help_TreeNodeOnClick = function (ctrlEvent) {
    var containerid = ctrlEvent.o.ContainerID();
    var pid = HoteamUI.Control.Instance(containerid).ContainerID();
    var leftpage = HoteamUI.Page.Instance(pid);
    var iframeCtrl = leftpage.GetControl("Help_Right");
    if (ctrlEvent.o.GetSelectedNode().Value2 == "true") {  //只显示有内容的节点
        iframeCtrl.LoadPage(PageInit.WebRootPath + "/" + ctrlEvent.o.GetSelectedNode().Value4 + "?pageid=" + pid + "&time=" + new Date().getDate());
    }
    else { //无内容的赋空
        iframeCtrl.LoadPage("");
    }
}
//标题搜索

var flag = 0;
InforCenter_Platform_Help_TitleSearchClick = function (ctrlEvent) {
    //获取右侧iframe的ID和输入的搜索词
    var containerID = ctrlEvent.o.ContainerID();
    var parentContainerID = containerID.substring(0, containerID.indexOf("_"));
    var iframeID = HoteamUI.Control.Instance(parentContainerID).OtherControl("Help_Right").id + "_Iframe";
    $("#HelpSearchResultListDiv").html("");
    var resultHtml = "";
    var keywords = ctrlEvent.o.OtherControl("HelpTabSearchTitleTextbox").GetText();

    if ($.trim(keywords) == "") {
        var alertInfo = HoteamUI.Language.Lang("HelpTabSearch", "EmptyKeywordsAlert");
        resultHtml += "<center>" + alertInfo + "</center>";
    }
    else {
        //获取标题类似的项
        var datas = FJC.WebService.Call("GetHelpTreeData", {});
        var listTitle = new Array();
        for (var i = 0; i < datas.length; i++) {
            InforCenter_Platform_Help_GetLoopSearchTitle(datas[i], keywords, listTitle);
        }
        if (listTitle.length == 0) {
            var alertInfo = HoteamUI.Language.Lang("HelpTabSearch", "NoResultAlert");
            resultHtml = "<center>" + alertInfo + "</center>";
        }
        else {
            for (var i in listTitle) {
                resultHtml += "<div>";

                resultHtml += "<a href='" + listTitle[i].Url + "?time=" + new Date().getTime() + "' target='" + iframeID + "' onclick='InforCenter_Platform_Help_SearchResult(\"" + iframeID + "\",\"" + keywords + "\");' style=' color:Blue; font-weight:bold;'>";

                resultHtml += listTitle[i].Title;
                resultHtml += "</a>";

                resultHtml += "</div>";

                resultHtml += "<hr />";
            }
        }
    }
    $("#HelpSearchResultListDiv").html(resultHtml);
}
function InforCenter_Platform_Help_GetLoopSearchTitle(data, keywords, listTitle) {

    if (data.Children != null) {
        for (var i = 0; i < data.Children.length; i++) {
            InforCenter_Platform_Help_GetLoopSearchTitle(data.Children[i], keywords, listTitle);
        }
    }
    if (data.Text.indexOf(keywords) >= 0) {
        var tempdata = {};
        tempdata.Title = data.Text;
        tempdata.Url = data.Value4;
        listTitle[flag++] = tempdata;
    }
}
//搜索
InforCenter_Platform_Help_SearchClick = function (ctrlEvent) {

    var containerID = ctrlEvent.o.ContainerID();
    var parentContainerID = containerID.substring(0, containerID.indexOf("_"));
    var iframeID = HoteamUI.Control.Instance(parentContainerID).OtherControl("Help_Right").id + "_Iframe";
    $("#HelpSearchResultListDiv").html("");
    var resultHtml = "";

    var keywords = ctrlEvent.o.OtherControl("HelpTabSearchTitleTextbox").GetText();
    if ($.trim(keywords) == "") {
        var alertInfo = HoteamUI.Language.Lang("HelpTabSearch", "EmptyKeywordsAlert");
        resultHtml += "<center>" + alertInfo + "</center>";
    }
    else {
        var ret = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "HelpSearch", { para: { Keywords: keywords} });

        if (ret.length == 0) {
            var alertInfo = HoteamUI.Language.Lang("HelpTabSearch", "NoResultAlert");
            resultHtml = "<center>" + alertInfo + "</center>";
        }

        for (var i in ret) {
            resultHtml += "<div>";

            //标题 链接
            if (ret[i].IsHaveContent == "true") {
                resultHtml += "<a href='" + ret[i].Url + "?time=" + new Date().getTime() + "' target='" + iframeID + "' onclick='InforCenter_Platform_Help_SearchResult(\"" + iframeID + "\",\"" + keywords + "\");' style=' color:Blue; font-weight:bold;'>";
            }
            else {
                resultHtml += "<a href='#' style=' color:#333333; font-weight:bold;'>";
            }
            resultHtml += ret[i].Title;
            resultHtml += "</a>";

            //内容
            resultHtml += "<div>";
            resultHtml += "<span style='color:#666666;'>";
            resultHtml += ret[i].Content;
            resultHtml += "</span>";
            resultHtml += "</div>";

            resultHtml += "</div>";

            resultHtml += "<hr />";
        }
    }
    $("#HelpSearchResultListDiv").html();
    $("#HelpSearchResultListDiv").html(resultHtml);
}
//关键词高亮
function InforCenter_Platform_Help_SearchResult(iframeId, keywords) {
    var iframe = $("#" + iframeId);
    iframe.unbind().load(function () {
        var frame = iframe.get(0);
        var text = frame.contentDocument.body.innerHTML;
        var spans = $('.helpCenterColorHighLight');
        frame.contentDocument.body.innerHTML = text.replace(eval("/" + keywords + "/g"), "<span class='helpCenterColorHighLight' style='background-color:yellow'>" + keywords + "</span>");
    });
}

function InforCenter_Platform_Help_SearchOnCreate(ctrlEvnet) {
    var textCtrlId = ctrlEvnet.o.OtherControl("HelpTabSearchTitleTextbox").id;
    var searchBtnId = ctrlEvnet.o.id;
    $("#" + textCtrlId).on("keydown", function (e) {
        if (e.which == 13) {
            $("#" + searchBtnId + "_Button").click();
            return false;
        }
    });

}

//导航帮助设置
InforCenter_Platform_Help_SettingIconOnClick = function (ctrlEvent) {
    InforCenter_Platform_Help_Setting(ctrlEvent.name);
}
InforCenter_Platform_Help_Setting = function (name) {
    var callback = function (data, ret) {
        if (ret != null) {
            var data = {};
            data.NAVNAME = name;
            data.TITLEID = ret[0].value;
            var sdata = JSON.stringify(data);
            var para = { Data: sdata };
            HoteamUI.DataService.Call("Fjc.BaseServices.HelpService.SaveHelpLink", { para: para });
        }
    }
    HoteamUI.UIManager.Popup("HelpTreeQuery", { ID: name }, callback, {}, "450*500");
}

//导航跳转到帮助中心
InforCenter_Platform_Help_HelpIconOnClick = function (ctrlEvent) {
    InforCenter_Platform_Help_ToHelp(ctrlEvent.name);
}
InforCenter_Platform_Help_ToHelp = function (name) {
    var titleID = HoteamUI.DataService.Call("Fjc.BaseServices.HelpService.GetHelpLink", { para: { ObjectID: name} });

    if (HoteamUI.Common.IsNullOrEmpty(titleID) == false) {
        if (FJC.WebService.Call("HelpIsExist", { para: { Keywords: titleID} })) {
            var pageText = HoteamUI.Language.Lang("Help.Title") + "--" + HoteamUI.Language.Lang("NavigationItems." + name);
            InforCenter_Platform_MainTabs_AddTab("Help", { ItemName: "Help" + name, TitleID: titleID, Type: "NavToHelp" }, pageText, false);     
        }
    }
}
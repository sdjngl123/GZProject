InforCenter_Platform_MainFlat_MainFlatInit = function (pageEvent) {
    var data = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GetMainFlatItems", {});
    if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
        CtrlObject = pageEvent.o.GetControl("MainFlat_LayoutContainerV");
        InforCenter_Platform_MainFlat_SetPageHeight(data, CtrlObject);
        InforCenter_Platform_MainFlat_GetMainFlatContent(data);
    }
}


InforCenter_Platform_MainFlat_GetMainFlatContent = function (data) {
    var mainFlat = HoteamUI.UIManager.GetTemplate("MainFlat");
    var pageDomA = $("[cid='MainFlat_A']>div").empty2();
    var pageDomB = $("[cid='MainFlat_B']>div").empty2();
    var pageDomC = $("[cid='MainFlat_C']>div").empty2();
    var location = "";
    var flats = [];
    //  for (var item in data) {
    for (var item = 0; item < data.length; item++) {
        if (HoteamUI.Common.IsNullOrEmpty(mainFlat) == false) {
            if (data[item].Position == "A") {
                pageDomA.append(mainFlat);
                var location = data[item].Position + data[item].Sequence;
            } else if (data[item].Position == "B") {
                pageDomB.append(mainFlat);
                var location = data[item].Position + data[item].Sequence;
            } else {
                pageDomC.append(mainFlat);
                var location = data[item].Position + data[item].Sequence;
            }
            var newFrame = "MainFlat_Frame" + location;
            var newCenter = "MainFlat_Center" + location;
            var newFlatId = "Flat" + location;
            var newTitle = "MainFlat_Title" + location;
            var newMore = "MainFlat_More" + location;
            $("#MainFlat_Frame").attr("id", newFrame);
            $("#MainFlat_Center").attr("id", newCenter);
            $("#Flat").attr("id", newFlatId);
            $("#MainFlat_Title").attr("id", newTitle);
            $("#MainFlat_More").attr("id", newMore);
            if (HoteamUI.Common.IsNullOrEmpty(data[item].Height) == false) {
                $("#" + newFlatId).css({ height: data[item].Height });
            }
            if (HoteamUI.Common.IsNullOrEmpty(data[item].Url) == false) {
                var values = data[item].Url.split('?');
                var pageName = values[0];
                if (values.length > 1) {
                    var pagePara = eval("(" + values[1] + ")");
                }
                var title = HoteamUI.Language.Lang("NavigationItems", pageName);
                if (HoteamUI.Common.IsNullOrEmpty(title) == true) {
                    title = HoteamUI.Language.Lang(data[item].PageText);
                }
                $("#" + newTitle)[0].innerHTML = title;
                var pageText = title;
                if (HoteamUI.Common.IsNullOrEmpty(data[item].MoreUrl) == false) {
                    var moreOnclick = 'javascript:InforCenter_Platform_Navigation_AddTab("' + data[item].MoreUrl + '","' + pageText + '");';
                    $("#" + newMore)[0].innerHTML = '<a  onclick=' + moreOnclick + ' style="cursor:pointer;">more...</a>';
                }

                HoteamUI.UIManager.Show(newFlatId, pageName, pagePara);
                flats.push(newFlatId);
            }

        }
    }
    //由于有padding值，造成出现滚动条，通过第二次调用resize，取消不必要的滚动条
    //延时等待样式中的padding加载完成
    setTimeout(function () { HoteamUI.Control.Instance($("[cid='MainFlat_LayoutContainerV']")[0].id).Resize() }, 100);
    if (flats.length) {
        $("div[cid='MainFlat_LayoutContainer']")[0].resizeEntrust = function () {
            for (var i, len = flats.length; i < len; i++) {
                var item = flats[i];
                var flat = $("#" + item);
                if (flat.size() == 0) {
                    delete entrustWindowResize.MainFlatResize;
                    return;
                }
                flat[0].htWidth = flat.width();
                var id = flat.children()[0].id;
                var ctrlObject = HoteamUI.Control.Instance(id);
                ctrlObject.Resize();
            }
        }
    }
}

InforCenter_Platform_MainFlat_SetPageHeight = function (data, ctrlObject) {
    var aHeight = 0;
    var bHeight = 0;
    var cHeight = 0;
    var offset = 38;
    //for (var item in data) {
    for (var item = 0; item < data.length; item++) {
        if (HoteamUI.Common.IsNullOrEmpty(data[item].Position) == false) {
            if (data[item].Position == "A") {
                aHeight += (parseInt(data[item].Height) + offset);
            }
            if (data[item].Position == "B") {
                bHeight += (parseInt(data[item].Height) + offset);
            }
            if (data[item].Position == "C") {
                cHeight += (parseInt(data[item].Height) + offset);
            }
        }
        var max = (aHeight > bHeight ? aHeight : bHeight) > cHeight ? (aHeight > bHeight ? aHeight : bHeight) : cHeight;
    }
    ctrlObject.ResetPanelSize({ item1: max + 10 });
}
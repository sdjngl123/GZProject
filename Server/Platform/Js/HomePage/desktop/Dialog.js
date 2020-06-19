var PlatformUI_Desktop_DialogInit = function () {
    $.hoteamDialog.defaultAfterMaxHandler = function (dialogContainer, dialog) {
        var desktop = $(PlatformUI.Desktop.defaults.desktop);
        dialog.css({
            width: desktop.width() - 8,
            height: desktop.height() - 50
        });
        dialogContainer.css({
            top: desktop.position().top,
            left: desktop.position().left,
            width: desktop.width() - 8
        });
    }
}

PlatformUI_Desktop_OpenWindow = function (data) {
    var argus = data;
    var pagename = argus.pagename;
    var paras = argus.paras;
    var callback = argus.callback;
    var data = argus.data;
    var size = HoteamUI.Common.IsNullOrEmpty(argus.size) ? PlatformUI_Desktop_GetDefaultSize() : argus.size;
    var title = argus.title;
    var modal = false;
    var name = argus.model ? argus.model.name : "";
    var defaultmax = argus.defaultmax;
    var icon = (argus.model && argus.model.icon) ? argus.model.icon : HoteamUI.AppSets.DefaultIcon;
    if (name != "" && $(".hoteamDialog[data-modulename='" + name + "']").length) {
        var openeddialogcontainer = $(".hoteamDialog[data-modulename='" + name + "']").parent();
        openeddialogcontainer.show().mousedown();
        return;
    }
    var id = HoteamUI.UIManager.NewGUID();
    var pageConfig = HoteamUI.UIManager.GetPageConfig(pagename);
    if (title == null && title == undefined) {
        title = pageConfig.PageOptions.title;
        if (HoteamUI.Common.IsNullOrEmpty(title) == true) {
            title = HoteamUI.Language.Lang("Common", "DialogTitle");
        }
        else {
            title = HoteamUI.Language.Lang(title);
        }
    }
    var options = $.extend({}, pageConfig.PageOptions);
    options.id = id;
    options.title = title;
    options.data = data;
    options.callback = callback;

    var position = options.position;
    if (position) {
        var positionList = position.split(",");
        if (positionList.length == 2) {
            options.position = [positionList[0], positionList[1]];
        }
    }
    if (size) {
        var sizeArray = size.toString().split("*");
        if (sizeArray.length == 2) {
            options.width = sizeArray[0];
            options.height = sizeArray[1];
        }
    }
    if (modal != undefined && modal != null) {
        options.modal = modal;
    }
    if (icon)
        options.icon = icon;
    options.maxWindow = true;
    options.minHideAll = true;
    options.afterClose = function (id) {
        PlatformUI.Nav.remove(id);
    }


    //    options.afterOpen = function (dialogContainer) {
    //        var preindex = parseInt(dialogContainer.css("z-index")) - 1;
    //        $(".ui-dialog[data-ismin!='true'][data-dialogtype!='message']").each(function () {
    //            if (parseInt($(this).css("z-index")) == preindex) {
    //                dialogContainer.css({
    //                    top: parseInt($(this).css("top")) + 30,
    //                    left: parseInt($(this).css("left")) + 30
    //                });
    //                return;
    //            }
    //        });
    //    }
    options.name = name;
    $.hoteamDialog.create(options);
    $.hoteamDialog.loadPage(id, pagename, paras);
    if (defaultmax)
        $.hoteamDialog.maxWindow(id, options.afterMax);
    PlatformUI.Nav.add({
        icon: icon,
        text: title,
        dialog: $("#" + id).parent(),
        id: id
    });
};
PlatformUI_Desktop_GetDefaultSize = function () {
    var ww = document.documentElement.clientWidth;
    var wh = document.documentElement.clientHeight;
    var neww, newh;
    neww = ww * 0.8;
    neww = neww < 100 ? 100 : neww;
    newh = neww / 1.6;
    if (newh > wh) {
        newh = wh - 10;
    }
    if (newh < 100) {
        newh = 100;
    }
    return neww + "*" + newh;
}
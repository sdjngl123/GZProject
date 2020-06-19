HoteamUI.Window.ConfSize = function () {

    //console.log('HoteamUI.Window.ConfSize ');
    var windowobj = $(window)
    var w = windowobj.width();
    var h = windowobj.height();
    var minWidth = 0;
    var minHeight = 0;
    var width, height;
    var isChange = true;

    if (window.oldW && window.oldH && (window.oldW == w && window.oldH == h)) {
        return false;
    }

    if (HoteamUI.Window.Fixed === true && w < minWidth && h < minHeight) {
        return false;
    }

    if (w < minWidth) {
        width = minWidth;
        $('html').css('overflow-x', 'auto');
    }
    else {
        width = w;
        $('html').css('overlow-x', 'hidden');
    }

    if (h < minHeight) {
        height = minHeight;
        $('html').css('overflow-y', 'auto');
    } else {
        height = h;
        $('html').css('overlow-y', 'hidden');
    }


    if (w < minWidth && h < minHeight) {
        if (HoteamUI.Window.Fixed === true) {
            isChange = false;
        }
        HoteamUI.Window.Fixed = true;
    }
    else {
        HoteamUI.Window.Fixed = false;
    }

    if (isChange) {
        var PageContainer = $("#PageContainer");
        PageContainer.width(width);
        PageContainer.height(height);
        window.oldW = width;
        window.oldH = height;
    }

    return true;

}

//初始化页面
HoteamUI.Window.InitPage = function () {
    $.extend(HoteamUI.Security.LoginPara, PageInit);
    if (PageInit.PageName) {
        HoteamUI.UIManager.Show('', PageInit.PageName, PageInit);
    }
    else {
        console.log("PageName Empty!");
    }
};
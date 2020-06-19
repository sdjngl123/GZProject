
function PlatformUI_Desktop_initBackImg(url,callBack) {
    
    var wWidth = $(window).width();
    var wHeight = $(window).height();

    var backImg;
    if ($(".backImg img").size() > 0) {
        backImg = $(".backImg img");
        initBackImgSize();
    }
    else {
        var backimgdiv = $("<div class=backImg>");
        $("#PageContainer").append(backimgdiv);
        backimgdiv.css({
            position: "fixed",
            top: 0,
            left: 0,
            width: wWidth,
            height: wHeight,
            "z-index": -1
        });
        var Img = new Image();
        Img.src = url;
        Img.onload = function () {
            backImg = $("<img>");
            backimgdiv.append(backImg);
            backImg.attr({
                "data-height": Img.height,
                "data-width": Img.width
            });
            backImg.attr("src", Img.src);
            initBackImgSize();
            if ($.isFunction(callBack))
                callBack();
        }
    }

    function initBackImgSize() {
        var newHeight = 0;
        var newWidth = 0;
        var imgHeight = backImg.attr("data-height");
        var imgWidth = backImg.attr("data-width");

        if (imgHeight < wHeight) {
            if (imgWidth < wWidth) {
                //双方都小于屏幕
                var gapW = wWidth - imgWidth;
                var gapH = wHeight - imgHeight;

                if (gapW - gapH > 0) {
                    //宽度差 最小

                    newWidth = wWidth;
                    var k = newWidth / imgWidth;

                    newHeight = imgHeight * k;

                    var mt = (wHeight - newHeight) / 2;
                    backImg.css({
                        width: newWidth,
                        height: newHeight,
                        "margin-top": mt,
                        "margin-left": 0
                    });
                }
                else {
                    newHeight = wHeight;
                    var k = newHeight / imgHeight;
                    newWidth = imgWidth * k;

                    if (newWidth > wWidth) {
                        var ml = (wWidth - newWidth) / 2;
                        backImg.css({
                            width: newWidth,
                            height: newHeight,
                            "margin-top": ml,
                            "margin-left":0
                        });
                    }
                    else {
                        backImg.css({
                            width: newWidth,
                            height: newHeight
                        });
                    }
                }

            }
            else {
                //只有高度小于屏幕
                newHeight = wHeight;
                var k = newHeight / imgHeight;
                newWidth = imgWidth * k;
                var ml = (wWidth - newWidth) / 2;
                backImg.css({
                    width: newWidth,
                    height: newHeight,
                    "margin-left": ml,
                     "margin-top": 0
                });
            }
        }
        else {
            if (imgWidth > wWidth) {
                //双方都大于屏幕

                backImg.css({
                    width: imgWidth,
                    height: imgHeight,
                    "margin-top": (imgHeight-wHeight)/2*-1,
                    "margin-left": (imgWidth-wWidth)/2*-1
                });
            }
            else {
                //只有宽度小于屏幕
                newWidth = wWidth;
                var k = newWidth / imgWidth;
                newHeight = imgHeight * k;
                var mt = (wHeight - newHeight) / 2;

                backImg.css({
                    width: newWidth,
                    height: newHeight,
                    "margin-top": ml,
                    "margin-left":0
                });
            }
        }
    }
}
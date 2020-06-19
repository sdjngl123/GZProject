$.hoteamNoty = {
    defaults: {
        layout: 'center',
        theme: 'relax',
        type: 'alert',
        text: '',
        dismissQueue: true,
        animation: {
            open: { height: 'toggle' },
            close: { height: 'toggle' },
            easing: 'swing',
            speed: 500
        },
        timeout: 3000,
        force: false,
        modal: false,
        maxVisible: 2,
        killer: true,
        //closeWith: ['click'],
        closeWith:[],
        callback: {
            onShow: function () { },
            afterShow: function () { },
            onClose: function () { },
            afterClose: function () { }
        },
        buttons: false
    },
    create: function (options) {
        var o = $.extend({}, this.defaults, options);
        noty(o);
    }
};

$.noty.layouts.topCenterByOCX = {
    name: 'topCenterByOCX',
    options: { // overrides options

    },
    container: {
        object: '<ul id="noty_topCenterByOCX_layout_container" />',
        selector: 'ul#noty_topCenterByOCX_layout_container',
        style: function () {
            var contentWidth = 0,
                windowWidth = 0;

            $(this).css({
                top: 60,
                left: 0,
                position: 'fixed',
                //width: '310px',
                height: 'auto',
                margin: 0,
                padding: 0,
                listStyleType: 'none',
                zIndex: 10000000
            });

            contentWidth = $(this).find('.noty_text:last').text().length * 16 + 22;

            windowWidth = $(window).width();

            //console.log('-----topCenterByOCX-----');

            //console.dir({
            //    text:$(this).find('.noty_text').text(),
            //    length:$(this).find('.noty_text').text().length,
            //    contentWidth: contentWidth,
            //    windowWidth:windowWidth
            //});

            if (contentWidth < windowWidth) {
                $(this).children("li:last").css({
                    width: contentWidth,
                    "margin-left": (windowWidth - contentWidth) / 2 + 'px'
                });
            } else {
                $(this).children("li:last").css({
                    width: windowWidth - 10,
                    "margin-left": '5px'
                });
            }

        }
    },
    parent: {
        object: '<li />',
        selector: 'li',
        css: {}
    },
    css: {
        display: 'none'
        //width: '310px'
    },
    addClass: ''
};
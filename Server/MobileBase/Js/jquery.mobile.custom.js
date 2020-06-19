$.widget("mobile.selectmenu", $.mobile.selectmenu, {

    _decideFormat: function () {

        var self = this,
			$window = this.window,
			selfListParent = self.list.parent(),
			menuHeight = selfListParent.outerHeight(),
			scrollTop = $window.scrollTop(),
			btnOffset = self.button.offset().top,
			screenHeight = $window.height();

        if (menuHeight > screenHeight - 80 || !$.support.scrollTop) {
            //使用设备高度计算
            selfListParent.css({ "max-height": HMUI.MobileCommon.DeviceHeight - 80 + "px", "overflow": "auto" });
        }
        selfListParent.css({ "width": self.button.parent().width() + "px" });
        self.menuType = "overlay";

        self.listbox.one({ popupafteropen: $.proxy(this, "_focusMenuItem") });
    }


});
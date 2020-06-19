function PlatformUI_Desktop_InitStartMenu() {
    var menu = $("#StartMenu").remove();
    $(body).append(menu);
    $(body).click(function (e) {
        if ($(e.target).closest(".menu").size() == 0 && !$(e.target).hasClass(".menu")) {
            $(".menu").hide();

            var maxindexdialog = undefined;
            var maxindex = 0;
            $(".ui-dialog[data-ismin!='true'][data-dialogtype!='message']").each(function () {
                if (parseInt($(this).css("z-index")) > maxindex) {
                    maxindexdialog = $(this);
                    maxindex = parseInt($(this).css("z-index"));
                }
            });

            if (maxindexdialog) {
                maxindexdialog.find("object").show();
            }
        }
    });

    var data = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GetNavigationItemsForPreview", {});
    if (data) {
        PlatformUI.StartMenu.init({ menuData: data });
    }
}

(function ($) {
    PlatformUI.StartMenu = {
        defaults: {
            menuData: null,
            startMenu: "#StartMenu",
            content: "#StartMenu .content"
        },
        css: {
            menu: "menuitem",
            firstMenu: "firstmenu",
            secondMenu: "secondmenu",
            app: "app",
            left:".leftcontent ul li a"
        },
        init: function (option) {
            $.extend(this.defaults, option);
            this._createMenu();
            this._initHandlers();
        },
        _createMenu: function () {
            for (var i = 0; i < this.defaults.menuData.length; i++) {
                var menu = this.defaults.menuData[i];
                var fMenu = $("<div>");
                fMenu.addClass(this.css.firstMenu).addClass(this.css.menu);

                fMenu.html([
                '<span class="ui-accordion-header-icon ui-icon ui-icon-triangle-1-e"></span>',
                '<img src="' + menu.Icon.replace("~", PageInit.WebRootPath) + '"/>',
                '<a>' + menu.Text + '</a>'
              ].join(''));
                $(this.defaults.content).append(fMenu);
                this.__createSecondMenu(menu.Children);
            }
        },
        _initHandlers: function () {
            this.__initFold();
            this.__initAppMove();
            this.__initAppClick();
            this.__initMenuLeftClick();
        },
        __initFold: function () {
            var self = this;
            $(this.defaults.content).on("click", "." + this.css.firstMenu, function () {
                var fmenu = $(this);
                var smenu = $(this).next();
                if (smenu.css("display") == "none") {
                    $("span.ui-icon", $(this)).removeClass("ui-icon-triangle-1-e").addClass("ui-icon-triangle-1-se");
                    smenu.slideDown();
                }
                else {
                    $("span.ui-icon", $(this)).removeClass("ui-icon-triangle-1-se").addClass("ui-icon-triangle-1-e");
                    smenu.slideUp();
                }
            });

            $("." + this.css.firstMenu, this.defaults.content).first().click();
        },
        __initAppClick:function(){
            var self=this;
            $(this.defaults.content).on("click","."+this.css.app,function(){
                var app = $(this).data("appinfo");
                 InforCenter_Platform_MainTabs_AddTab (app.Value.split('?')[0],JSON.parse( app.Value.split('?')[1]),app.Text,"",undefined,{name:app.Name,text:app.Text,icon:app.Icon});

                 $(self.defaults.startMenu).hide();
            });
        },
         __initMenuLeftClick:function(){
            var self=this;
            $(this.css.left,$(self.defaults.startMenu)).on("click",function(){
                 $(self.defaults.startMenu).hide();
            });
        },
        __createSecondMenu: function (data) {
            var ul = $("<ul>").addClass(this.css.secondMenu).addClass(this.css.menu);
            for (var i = 0; i < data.length; i++) {
                var menu = $("<li>").addClass(this.css.app);
                menu.html([
                    '<img src="' + data[i].Icon.replace("~", PageInit.WebRootPath) + '"/>',
                    '<a>' + data[i].Text + '</a>'
                  ].join(''));
                data[i].type = "menu";
                menu.data("appinfo", data[i]);
                ul.append(menu);
            }
            $(this.defaults.content).append(ul);
        },
        __initAppMove: function () {
            var self = this;
            $("." + this.css.app, this.defaults.content).draggable({
                revent: "invalid",
                helper: function (event) {
                    var app = $(this).data("appinfo");
                    var appObject = $([
                         '<div class="' + PlatformUI.Desktop.css.appcontent + '">',
                         '  <div class="' + PlatformUI.Desktop.css.app + '">',
                         '     <div class="imgdiv" style="background:url('+app.Icon.replace("~", PageInit.WebRootPath)+') no-repeat center center"></div>',
                         '     <p>',
                         '             ' + app.Text,
                         '     </p>',
                         '  </div>',
                         '</div>'
                       ].join(''));
                    return appObject;
                },
                cursor: "move",
                distance: 20,
                appendTo: PlatformUI.Desktop.defaults.desktop,
                start: function () {
                    $(self.defaults.startMenu).hide();
                    $(".ui-dialog[data-ismin!='true']").hide();
                },
                stop:function(){
                    $(".ui-dialog[data-ismin!='true']").show();
                }
            });
        }
    };
})(jQuery);
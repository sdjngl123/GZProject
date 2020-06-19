function PlatformUI_Desktop_LoadDesktopApp() {
    var userQuickNavigationList = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GetUserQuickNavigationList", {});
    if (userQuickNavigationList.length)
        PlatformUI.Desktop.init({ appData: userQuickNavigationList });
    else {
        PlatformUI.Desktop.init();
    }


    //指定刷新方法
    InforCenter_Platform_QuickRefeshData = function () {
        var userQuickNavigationList = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GetUserQuickNavigationList", {});
        $("#desktop").empty();
        PlatformUI.Desktop.init({ appData: userQuickNavigationList });
    }
}


(function ($) {
    PlatformUI.Desktop = {
        defaults: {
            appData: [],
            size: "default",
            desktop: "#desktop"
        },
        css: {
            appcontent: "appcontent",
            app: "app",
            haveapp: "haveapp",
            appcontenthover: "appcontenthover",
            remove:"removeapp"
        },
        init: function (option) {
            if(!option)
                this.defaults.appData=[];
            $.extend(this.defaults, option);
            this._initApp();
            this._initAppHandlers();
            $(this.defaults.desktop).disableSelection();
        },
        resize:function(){
        
        },
        _initApp: function () {
            for (var i = 0; i < this.defaults.appData.length; i++) {
                var app = this.defaults.appData[i];
                this.__createApp(app);
            }
        },
        _initAppHandlers: function () {
            this.__initAppReceive();
            this.__initAppClick();
            this.__initAppRemove();
            this.__initAppRightMenu();
        },
        __initAppRemove:function(){
            var self=this;
            $(this.defaults.desktop).on({
               click:function(){
                   var appcontent=$(this).closest("div."+self.css.appcontent);
                   var appinfo= appcontent.data("appinfo");
                   InforCenter_Platform_QuickNavigation_RemoveQuickNavigation(appinfo.ID,function(){
                        appcontent.remove();
                   });
                   
               }
            },"div."+this.css.remove);
        },
        __initAppClick:function(){
            $(this.defaults.desktop).off("dblclick").off("click");
             var self=this;
            $(this.defaults.desktop).on("dblclick","div."+this.css.appcontent,function(){
                var appinfo=$(this).data("appinfo");
               
               InforCenter_Platform_OpenQuick(appinfo);
            });
             $(this.defaults.desktop).on("click","div."+this.css.appcontent,function(){
                $("div."+self.css.remove,$(self.defaults.desktop)).hide();
                $("div."+self.css.remove,$(this)).show();
            });
        },
        __initAppRightMenu:function(){
            $(this.defaults.desktop).off("mousedown");
            $(this.defaults.desktop).on("mousedown","div."+this.css.appcontent,function(e){
            $("body").on({ contextmenu: function () { return false; } });
             var appinfo=$(this).data("appinfo");
                    $("ul.hoteam-rightmenu").hide();
                    var position = {
                        top: e.pageY,
                        left: e.pageX
                    };
                    InforCenter_Platform_QuickRightMenu(appinfo, position);
                    window.setTimeout(function () { $("body").off("contextmenu") }, 100);
            });
        },
        __initAppReceive: function () {
            var self = this;
            $(this.defaults.desktop).droppable({
                accept: ".app",
                drop: function (event, ui) {
                    var otherAppInfo = $(ui.draggable).data("appinfo");

                    var x = $("div:last", self.defaults.desktop).offset().left - $(self.defaults.desktop).offset().left;
                    var y = $("div:last", self.defaults.desktop).offset().top - $(self.defaults.desktop).offset().top;
                    switch (otherAppInfo.type) {
                        case "menu":
                            var appinfo = {
                                ID: otherAppInfo.Name,
                                ImageSrc: otherAppInfo.Icon,
                                PageName: otherAppInfo.Value.split('?')[0],
                                PagePara: otherAppInfo.Value.split('?')[1],
                                Text: otherAppInfo.Text,
                                Url: otherAppInfo.Value,
                                UserID: HoteamUI.Security.LoginPara.UserID
                            };
                            if ($("div[data-appid='" + appinfo.ID + "']", self.defaults.desktop).length) {
                                 self.__movebase__(x, y, $("div[data-appid='" + appinfo.ID + "']", self.defaults.desktop));
                            }
                            else {
                                var app = self.__returnApp(appinfo, 0, 0);
                                self.__movebase__(x, y, app);
                                self.__initAppMove(app);
                            }
                            break;
                    }
                }
            });
        },
        
        __initAppMove: function (app) {
            var self = this;
            if (!app)
                app = $("." + this.css.appcontent, this.defaults.desktop);
            app.draggable({
                distance: 20,
                containment: self.defaults.desktop,
                revert: false,
                start:function(){
                    $(".ui-dialog[data-ismin!='true']").hide();
                },
                stop: function (event, ui) {
                    var x = $(".imgdiv", this).offset().left - $(self.defaults.desktop).offset().left;
                    var y = $(".imgdiv", this).offset().top - $(self.defaults.desktop).offset().top;

                    self.__movebase__(x, y, $(this));

                    $(".ui-dialog[data-ismin!='true']").show();
                }
            });
        },
        __searchNextEmpty: function (column, row) {
            var wHeight = $(window).height();
            var wWidth = $(window).width();
            var size = this.__getSize__();
            while (true) {
                if ((row + 1) * size[0] > wHeight) {
                    column++;
                    row = 0;
                }
                if ($("div[data-row='" + row + "'][data-column='" + column + "']").size() == 0) {
                    return { column: column, row: row };
                }
                row++;
            }
        },
        __createApp: function (app) {
            var column = 0, row = 0;
            var wHeight = $(window).height();
            var wWidth = $(window).width();
            var size = PlatformUI.Desktop.__getSize__();
            if (app.Row!=undefined && app.Column!=undefined) {
                column=app.Column; row=app.Row;
            }
        
                while (true) {
                    if ((row + 1) * size[0] > wHeight) {
                        column++;
                        row = 0;
                    }
                    if ($("div[data-row='" + row + "'][data-column='" + column + "']").size() == 0) {
                       var app=  PlatformUI.Desktop.__returnApp(app, column, row);
                       PlatformUI.Desktop.__initAppMove(app);
                        return;
                    }
                    row++;
                }
            
        },
        __returnApp: function (app, column, row) {
            var size = this.__getSize__();
            var src="";
            if(app.ImageSrc){
             src=app.ImageSrc.replace("~", PageInit.WebRootPath);
             }
            var appObject = $([
                     '<div class="' + this.css.appcontent + '">',
                     '  <div class="' + this.css.app + '">',
                     '     <div class="imgdiv" style="background:url('+src+') no-repeat center center"></div>',
                     '     <p>',
                     '             ' + app.Text,
                     '     </p>',
                     '  </div>',
                     '  <div class="'+this.css.remove+'"></div>',
                     '</div>'
                 ].join('')).data("appinfo", app);

            $(this.defaults.desktop).append(appObject.css({
                top: row * size[0],
                left: column * size[1],
                width: size[1],
                height: size[0]
            }).attr({
                "data-row": row,
                "data-column": column,
                "data-appid": app.ID
            }));
            app.Row = row;
            app.Column = column;
            this.__editAppInfo(app,appObject,true);
            return appObject;
        },
        __editAppInfo: function (newinfo,app,add) {
            if(!add){
                //TODO:待扩展其他类型
                for (var i = 0; i < this.defaults.appData.length; i++) {
                    if (this.defaults.appData[i].ID == newinfo.ID) {
                   
                            this.defaults.appData[i] = newinfo;

                            //修改
                            InforCenter_Platform_QuickNavigation_UpdateQuickNavigation({
                                NavigationID:newinfo.ID,
                                Row:newinfo.Row,
                                Column:newinfo.Column,
                                Content:newinfo.PagePara,
                                Text:newinfo.Text,
                                Image:newinfo.ImageSrc
                            });
                     
                            return;
                    }
                }
            }
            else{
                var exist=false;
                for (var i = 0; i < this.defaults.appData.length; i++) {
                    if (this.defaults.appData[i].ID == newinfo.ID) {
                        exist=true;
                        break;
                    }
                }
                if(!exist){
                    this.defaults.appData.push(newinfo);
                    app.data("appinfo",newinfo);
                    //新增
                    InforCenter_Platform_QuickNavigation_AddQuickNavigation({
                        NavigationID:newinfo.ID,
                        Row:newinfo.Row,
                        Column:newinfo.Column
                    });
                }
            }
        },
        __getSize__: function () {
            //TODO：预留 可以更改桌面布局大小
            switch (this.defaults.size) {
                case "small": return [80, 80];
                case "big": return [150, 150];
                default:
                    return [100, 100];
            }
        },
        __movebase__: function (x, y, app) {
            var size = this.__getSize__();
            var row = Math.round(y / size[0]);
            var column = Math.round(x / size[1]);
            //先重置位置，踢出空位
            app.attr({
                "data-column": -1,
                "data-row": -1
            });
            if ($("div[data-row='" + row + "'][data-column='" + column + "']").size() != 0) {
                var otherApp = $("div[data-row='" + row + "'][data-column='" + column + "']");
                var newposition = this.__searchNextEmpty(column, row);
                otherApp.css({
                    top: newposition.row * size[0],
                    left: newposition.column * size[1]
                })
                     .attr({
                         "data-column": newposition.column,
                         "data-row": newposition.row
                     });
                     var newotherappinfo=otherApp.data("appinfo");
                     newotherappinfo.Column=newposition.column;
                     newotherappinfo.Row=newotherappinfo.row;
                     this.__editAppInfo(newotherappinfo,otherApp);
            }
            app.css({
                top: row * size[0],
                left: column * size[1]
            });
            app.attr({
                "data-column": column,
                "data-row": row
            });
            var appinfo = app.data("appinfo");
            appinfo.Column = column,
            appinfo.Row = row;
            this.__editAppInfo(appinfo,app);
        }
    }
})(jQuery);
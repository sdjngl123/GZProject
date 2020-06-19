function PlatformUI_Desktop_LoadNav(direction) {
    switch (direction) {
        case "left":
            var nav = $("#leftNav");
            if (nav.css("display") == "none")
                nav.append('<div class="start"></div>');
            $("#desktop").css({
                top: 0,
                left: nav.outerWidth(true),
                height: "100%",
                width: $(window).width() - nav.outerWidth(true)
            });
            nav.show();
            $(document).on("click", ".start", function () {
                setTimeout(function () {
                    $("#StartMenu").css({
                        left: 10,
                        top: 60
                    }).show();

                    var maxindexdialog = undefined;
                    var maxindex = 0;
                    $(".ui-dialog[data-ismin!='true'][data-dialogtype!='message']").each(function () {
                        if (parseInt($(this).css("z-index")) > maxindex) {
                            maxindexdialog = $(this);
                            maxindex = parseInt($(this).css("z-index"));
                        }
                    });

                    if (maxindexdialog) {
                        maxindexdialog.find("object:visible").hide();
                    }
                }, 100);
            });
            break;
    }

    PlatformUI_Desktop_InitTaskBar(direction);
}


function PlatformUI_Desktop_InitTaskBar(direction) {
    var task = $("<div>");
    task.addClass("taskbar");
    switch (direction) {
        case "left":
            var start = $("#" + direction + "Nav .start");
          
            task.css("height", $("#" + direction + "Nav").height() - start.outerHeight(true));
            $(".start").after(task);
            PlatformUI.Nav.init(null);
            break;
    }
}

(function ($) { 
    PlatformUI.Nav={
        defaults:{
            direction:"left",
            taskbar:" .taskbar"
        },
        Model:{
            icon:"",
            text:"",
            dialog:"",
            id:""
        },
        timehandler:null,
        init:function(option){
            $.extend(this.defaults,option);
            this._taskbarsortable();
            this._initHandlers();
        },
        resize:function(){
        var nav=$("#" + this.defaults.direction + "Nav");
             switch (this.defaults.direction) {
                case "left":
                    var start = $("#" + this.defaults.direction + "Nav .start");
                 
                    var task=$("#" + this.defaults.direction + "Nav "+this.defaults.taskbar);
                    task.css("height", $("#" + this.defaults.direction + "Nav").height()- start.outerHeight(true));
                    $("#desktop").css({
                        top: 0,
                        left: nav.outerWidth(true),
                        height: "100%",
                        width: $(window).width() - nav.outerWidth(true)
                    });
                    break;
            }
        },
        changeDicection:function(dicection){
           this.defaults.direction=dicection;
           //未完成待续
        },
        add:function(model){
           var self=this;
           var appmodel=$.extend(false,this.Model,model);
           var obj=$([
                '<div data-taskbar-appid="'+appmodel.dialog.children(".hoteamDialog")[0].id+'">',
                '   <img src="'+appmodel.icon.replace("~",PageInit.WebRootPath)+'" />',
                '   <p>'+appmodel.text+'</p>',
                '</div>'
            ].join(''));
            obj.data("taskappinfo",appmodel);
            $("#" + this.defaults.direction + "Nav "+this.defaults.taskbar).append(obj);
            obj.on({
                mouseenter:function(){
                
                self.timehandler=setTimeout(function(){
                   
                    var tip=$([
                        '<div id="taskbartip">',
                        '   <div>',
                        '       <p>'+appmodel.text+'</p>',
                        '       <img src="'+appmodel.icon.replace("~",PageInit.WebRootPath)+'"/>',
                        '   </div>',
                        '</div>'
                    ].join(''));
                    $("body").append(tip);
                    var offset=  obj.offset();
                    switch(self.defaults.direction){
                        case "left":
                            tip.css({
                                top:offset.top,
                                left:80
                            });
                        break;
                    }
                    },600);
                },
                mouseleave:function(){
                    window.clearTimeout(self.timehandler);
                    $("#taskbartip").remove();
                }
            });
        
        },
        remove:function(id){
             $("#" + this.defaults.direction + "Nav "+this.defaults.taskbar+" div[data-taskbar-appid='"+id+"']").remove();
        },
        _initHandlers:function(){
            var self=this;
            $("#" + this.defaults.direction + "Nav "+this.defaults.taskbar).on("click"," div",function(){
                var taskmodel=$(this).data("taskappinfo");
              $.hoteamDialog.show(taskmodel.id,true);
              taskmodel.dialog.mousedown();
            });
        },
        _taskbarsortable:function(){
            var self=this;
            $("#" + this.defaults.direction + "Nav "+this.defaults.taskbar).sortable({
                distance: 10,
                start:function(){
                   window.clearTimeout(self.timehandler);
                    $("#taskbartip").remove();
                },
                containment:this.defaults.taskbar 
            });
        }
    };
})(jQuery);
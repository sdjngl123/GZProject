function PlatformUI_Desktop_InitWindowPlug() {
    var data = [{
        Height: "150",
        Width: "150",
        MoreUrl: "",
        PageText: "MyWorkflowSmartStatistics.Title",
        Position: "A",
        Sequence: "1",
        Url: "MyWorkflowSmartStatistics"
    }];

    //PlatformUI.Desktop.Plug.init({data:data});
}

(function ($) { 
    PlatformUI.Desktop.Plug={
        defaults:{
            data:[],
            plughead:"Platform_plug_",
            titleheight:25
        },
        css:{
            plug:"Platform_Desktop_Plug",
            title:"title",
            content:"content",
            close:"close"
        },
        init:function(option){
            $.extend(this.defaults,option);
            this._create();
            this._initHandlers();
        },
        _create:function(){
            for(var i in this.defaults.data){
                var item=this.defaults.data[i];
                if(i==0){
                    this.__returnPlug(item,20,20);
                }
                else{
                    this.__returnPlug(item,250,20);
                }
            }
        },
        _initHandlers:function(){
            this.__closeHandler();
            this.__moveHandler();
        },
        __closeHandler:function(){
            var self=this;
           $(PlatformUI.Desktop.defaults.desktop).on("click","."+this.css.plug+" ."+this.css.title+" ."+this.css.close,function(){
                $(this).closest("."+self.css.plug).remove();
           });
        },
        __moveHandler:function(){
            $("."+this.css.plug,$(PlatformUI.Desktop.defaults.desktop)).draggable({
                handle:"div."+this.css.title,
                containment:PlatformUI.Desktop.defaults.desktop
            });
        },
        __returnPlug:function(item,top,right){
            var plugcontainer=$("<div>");
            plugcontainer.css({
                width:item.Width,
                height:item.Height,
                right:right,
                top:top
            })
            .addClass(this.css.plug);
            var  id=this.defaults.plughead+item.Position+item.Sequence;

//          close  <span class="'+this.css.close+' ui-icon ui-icon-closethick"></span>
            plugcontainer.html([
                '<div class="'+this.css.title+'">'+HoteamUI.Language.Lang(item.PageText)+'</div>',
                '<div class="'+this.css.content+'" id="'+id+'">',
                '<div>'
            ].join(''));
            $(PlatformUI.Desktop.defaults.desktop).append(plugcontainer);
            $("."+this.css.title,plugcontainer).height(this.defaults.titleheight);
            $("."+this.css.content,plugcontainer).height(parseInt(item.Height)-this.defaults.titleheight);
            var values=item.Url.split('?');
            var pageName = values[0];
            var pagePara=null;
            if (values.length > 1) {
                pagePara = eval("(" + values[1] + ")");
            }
            HoteamUI.UIManager.Show(id, pageName, pagePara);
        }

    };
})(jQuery);
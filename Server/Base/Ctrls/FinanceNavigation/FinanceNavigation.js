HoteamUI.Control.OFinanceNavigation = {
    Create: function (options) {
        var self = this;
        options = options || {};
        //设置参数
        var parentId = this.id;
        var id = this.id + "_FinanceNavigation";
        var CtrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions;
        var o = $.extend(true, {}, $.hoteamNavigation.defaults, CtrlOptions);
        o.parentId = parentId;
        o.id = id;
        o.DateType = o.type;
        o.type = "text";
        o.autofit = options.autofit;
        //事件参数
        var handlers = (options.controlInfo || this.ControlInfo()).PageHandlers;
        o.event = {};
        //o.o = HoteamUI.Control.Instance(parentId);
        o.event.hoteamCtrl = this;
        o.callback = {};
        $.each(handlers, function (index, val) {
            if (val.HandlerName == "OnClick") {
                o.callback.onclick = self.GetEventFunctionName("OnClick");
            }
        });
        $.hoteamNavigation.create(o);
    },
    Click: function (functionName) {
        if (functionName === undefined) {
            $("#" + this.id + "_Navigator").click();
        }
        else {
            $("#" + this.id + "_Navigator").unbind("click").click(functionName);
        }
    },
    LoadData: function (options) {
        options.parentId = this.id;
        $.hoteamNavigation.load(options.items);
    },

};

{
    (function ($) {
        $.hoteamNavigation = {
            defaults: {
                config:{
                    defaultColor:{
                        color:"",
                        bgcolor:"",
                        iconColor:""
                    },
                    activeColor:{
                        color:"",
                        bgcolor:"",
                        iconColor:""            
                    },
                    hoverColor:{
                        color:"",
                        bgcolor:"",
                        iconColor:""     
                    },
                    width:'280',
                    height:'450'
                },
                parentId:null
            },
            //处理传入数据的格式
            returnObjOptions:function(options){
                if(typeof(options)=="string"){
                    options=JSON.parse(options);
                }
                return options;

            },
            //把传入配置数据合并进来
            config:function(options){
                var _this=this;
                _this.defaults.config=$.extend(true,_this.defaults.config,options.config);
            },
            //创建页面
            create: function (options) {
                var options=options,allHtml='',
                    contentHtml='',containerHtml='',
                    htmlHead='<div class="hoteam-navigation cl">',
                    htmlEnd='</div>',
                    width,
                    height,
                    _this=this;
                if(typeof(options)=="string"){
                    options=JSON.parse(options);
                }
                this.config(options);
                this.defaults.parentId=options.parentId;
                
                this.handlers();
                this.bindClick(options);
            },
            load: function (options) {
                var _this = this, containerHtml = '', allHtml = '', contentHtml='';
                var container = $("#" + _this.defaults.parentId);
                container.empty();
                container.data('items',options);
                //for (var list in options) {
                    for (var j=0,lenj=options.length;j<lenj;j++) {
                    var headHtml = '';
                    //循环添加container
                    for (var item in options[j]) {
                        var itemHtml = '';
                        //添加标题
                        if (typeof (options[j][item]) == "string") {
                            headHtml = [
                                '<div class="hoteam-navigation-title">',
                                options[j][item],
                                '</div>'
                            ].join('');
                        }
                        //添加内容                       
                        if (options[j][item] instanceof Array) {
                            for (var i = 0, leni = options[j][item].length; i < leni; i++) {
                                itemHtml += [
                                    '<a class="hoteam-navigation-item" title="',
                                    options[j][item][i].text,
                                    '">',
                                    '<div class="hoteam-navigation-item-img">',
                                    //'<img src="images/'+_this.changeImgSrc(options[list][item][i])+'.png" alt="">',
									'<span style="font-size:' + _this.iconfontSize() + ';" class="iconfont icon-' + options[j][item][i].image + '"></span>',// _this.changeImgClass(options[j][item][i])
                                    '</div>',
                                    '<div class="hoteam-navigation-item-title" style="color:',
                                    _this.defaults.config.defaultColor.color + ';background:' + _this.defaults.config.defaultColor.bgColor + '">' + options[j][item][i].text,
                                    '</div></a>'
                                ].join('');
                            }
                        }
                        contentHtml = [
                            '<div class="hoteam-navigation-content cl" data=' + j + '>',
                            itemHtml,
                            '</div>'
                        ].join('');
                    }
                    
                    width = _this.width(_this.defaults.config.width);
                    height = _this.height(_this.defaults.config.height);
                    containerHtml += '<div class="hoteam-navigation-container" style="width:' + width + ';height:' + height + '">' + headHtml + contentHtml + '</div>';
                }
                allHtml += containerHtml;
                container.append('<div id=' + _this.defaults.parentId + "_Navigator" + ' class="hoteam-navigation cl" >' + allHtml + '</div>');

                _this.changeCarentContainerHeight();
            },
            //修改父级容器高度100%；
            changeCarentContainerHeight: function () {
                var parentContainer = $("#" + this.defaults.parentId);
                parentContainer.css("height", "100%");
            },
            //返回传入控件设置的高度
            height:function(value){
                var contentHeight;
                if(value !="" && value !=null && value !=undefined ){
                    if (value.toString().indexOf("px") > -1 || value.toString().indexOf("%") > -1) {
                        contentHeight=value;
                    }else {
                        contentHeight=value+"px";
                    }
                    
                }else{
                    contentHeight="450px";
                }
                return contentHeight;
            },
            //返回传入控件设置的宽度
            width:function(value){
                var contentWidth;
                if (value != "" && value != null && value != undefined || value.toString().indexOf("%") > -1) {
                    if(value.toString().indexOf("px")> -1){
                        contentWidth=value;
                    }else {
                        contentWidth=value+"px";
                    }
                    
                }else{
                    contentWidth="300px";
                }
                return contentWidth;
            },
            //给items绑定效果
            handlers:function(){
                var _this=this;
                $(".hoteam-navigation-item").on("mouseover",function(){
                    $(this).find(".hoteam-navigation-item-title").css({"backgroundColor":_this.defaults.config.hoverColor.bgcolor,"color":_this.defaults.config.hoverColor.color});
                    //修改字体图标颜色
                    $(this).find(".hoteam-navigation-item-img span").css("color", _this.defaults.config.hoverColor.iconColor);
                });
                $(".hoteam-navigation-item").on("mouseleave",function(){
                    $(this).find(".hoteam-navigation-item-title").css({"backgroundColor":'',"color":''});
                    //修改字体图标颜色
                    $(this).find(".hoteam-navigation-item-img span").css("color",'');
                });
                //激活的样式需要单独一个方法
                var activTitleStyle=[
                    '<style>.hoteam-navigation-item:active .hoteam-navigation-item-title{color:',
                    this.defaults.config.activeColor.color,
                    ';background:',
                    _this.defaults.config.activeColor.bgcolor,
                    '}.hoteam-navigation-item:active .hoteam-navigation-item-img span{color:',
                    this.defaults.config.activeColor.iconcolor,
                    ';}</style>'
                ].join('');
                $("head").append(activTitleStyle);
            },
            //单机触发的事件
            bindClick: function (o) {
                //var o = this;
                var ctrlEvent = {};
                var parentId = o.parentId;
                var id = "#" + parentId + "_FinanceNavigation";
               // var items = $(id).find(".hoteam-navigation-item");
                var container = $("#"+parentId);
                ctrlEvent.o = o.event.hoteamCtrl;
                //取消父级容器点击的向下冒泡事件
                $(document).on("click", "#" + parentId ,function (event) {
                    event.stopPropagation();
                });
                $("#" + parentId).on("click", ".hoteam-navigation-item", { e: ctrlEvent, fun: o.callback.onclick }, function (event) {
                    var functionName = event.data.fun;
                    var functionPara = ctrlEvent;
                    var index = $(this).index();
                    var dataName = $(this).parents(".hoteam-navigation-content").attr("data");
                    var items = container.data("items");
                    ctrlEvent.item = items[dataName]["content"][index];
                    HoteamUI.Common.ExeFunction(functionName, functionPara);
                });
            },
            //计算字体图标大小
            iconfontSize: function () {
                var widthNum='';
                if (this.defaults.config.width && this.defaults.config.width != '') {
                    var widthStr = this.defaults.config.width + '';
                    widthNum = parseInt(widthStr) / 5.6+"px";
                } 
                return widthNum;
            },
            resizeImgHeight:function(){
                var imgArr=$(".hoteam-navigation-item img");
                if(imgArr && imgArr.length>0){
                    for(var i=0,leni=imgArr.length;i<leni;i++){
                        var width = $(imgArr[i]).width();
                        $(imgArr[i]).height(width);
                    }
                }
                
            }
            

        }

    })(jQuery);
}
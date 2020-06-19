;(function ($) {
    $.fn.selectpicker = function (opts) {
        //方法判断
        if (typeof opts === 'string' && methods[opts]) {
            //如果是方法，则参数第一个为函数名，从第二个开始为函数参数
            return methods[opts].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof opts === 'object' || !opts) {
            //调用初始化方法
            return methods.init.apply(this, arguments);
        }
    };
    var methods = {
        opts: {
            onchange:null
        },
        init: function (options) {
            var me = this;
            if($(this).attr("bomenuid")){
                $(this).selectpicker("destroy");
            }
            //创建一个随机id
            var menuid = jsGuid(),
                bomenuid = menuid + "bottom";
            $(this).attr("bomenuid", bomenuid).data("o", options);
        
            var data = options.data;
            //创建向下展示的下拉元素
            createDrop(data,bomenuid,me);

            $(this).on("click",function(){
                $(this).selectpicker("show");
                $(this).focus();
            }).on("blur",me,function(e){
                if(e.data.allowHide==false){
                    e.data.allowHide = true;
                    return;
                }
                $(this).selectpicker("hide");
            });
            //给按钮注册事件
            $(me).parent().find(".btn").on("mouseup", me, function (e) {
                setTimeout(function () {
                    if ($(me).nextAll(".input-group-btn").find(".btn").attr("disabled") == "disabled") {
                        return false;
                    }
                    $(me).selectpicker("show");
                    $(me).focus();
                });
            });
            function jsGuid(bool_divide) {
                var guid = "";
                for (var i = 1; i <= 32; i++) {
                    var n = Math.floor(Math.random() * 16.0).toString(16).toUpperCase();
                    guid += n;
                    if (!bool_divide) {
                        if ((i == 8) || (i == 12) || (i == 16) || (i == 20)) {
                            guid += "-";
                        }
                    }
                }
                return guid;
            }
            function createDrop(data,menuid,me){
                //创建下拉元素
                var dropul =
                      '<ul class="dropdown-menu multiSelect-dropdown-menu dropdown-select-inner inner" id="' + menuid + '" role="menu">' +
                      '</ul>';
                var width = $(me).css("width");
                $dropul = $(dropul).attr("id", menuid).
                    css({
                        "width": width,
                        "z-index": "999999",
                        "display": "none",
                        "padding": "0",
                        "max-height": '300px',
                        "overflow-y": "auto"
                    });
                $("body").append($dropul);
                //给下拉元素添加内部内容
                for (var i = 0; i < data.length; i++) {
                    var li =
                        '<li style="height:30px;line-height:30px;" class="dropdown-select-li">' +
                        '<a style="padding-right:30px;position:relative" ' +
                        'title="' + (data[i].text || data[i].Text) + '"' +
                        '>' +
                            '<span val="' + (data[i].value || data[i].Value) + '">' + (data[i].text || data[i].Text) + '</span>' +
                            '<span class="basesprite b-checkbox-true-full"></span>' +
                        '</a>' +
                        '</li>';
                    var $li = $(li);
                    var liDisplay = data[i].Selected == undefined ? (data[i].selected ? "block" : "none") : (data[i].Selected ? "block" : "none");
                    $li.find(".basesprite").css({
                        position:"absolute",
                        right:"10px",
                        top:"4px",
                        display: liDisplay
                    });
                    $li.on("mousedown",me,function(e){
                        var ele = e.data;
                        ele.allowHide = false;
                        var dis = "none";
                        if($(this).find(".basesprite").css("display")=="none"){
                            $(this).find(".basesprite").css("display", "block");
                            dis = "block";
                        }else{
                            $(this).find(".basesprite").css("display", "none");
                        }
                        //改变value
                        setValue(ele);
                        //触发值变化事件
                        if (options.onchange) {
                            options.onchange.call(ele, {
                                text: ele.val(),
                                value:ele.attr("val")
                            });
                        }
                    });
                    $dropul.append($li);
                }
                setValue(me);
                $dropul.on("mouseleave",function(){
                    me.allowHide = true;
                    $(me).focus();
                });
                //inforcenter IE滚动条问题
                $dropul.on("mousedown", function () {
                    me.allowHide = false;
                });
            }
            function setValue(ele){
                var menuid = $(ele).attr("bomenuid");
                var lis = $("#"+menuid).children();
                var val='',text='';
                for(var i=0;i<lis.length;i++){
                    if ($(lis[i]).find(".basesprite").css("display") != "none") {
                        var sp = $(lis[i]).find("span:first");
                        val += sp.attr("val")+";";
                        text += sp.text()+";";
                    }
                }
                $(ele).attr("val",val.substring(0,val.length-1));
                $(ele).val(text.substring(0,text.length-1));
            }
        },
        loadData:function(data){
            $(this).selectpicker("destroy");
            var o = $(this).data("o");
            $(this).selectpicker($.extend(o,{"data":data}));
        },
        show:function(){
            var bomenuid = $(this).attr("bomenuid"),
                $bul = $("#"+bomenuid);
            if($bul.css("display")!="none"){
                return;
            }
            //首先检测当前的ul显示在input的上侧还是下侧，如果下侧显示不开，则自动显示到上侧
            //获取当前的input的位置
            var inputposition = $(this).offset();
            var h = $(window).height()-$(this).offset().top+$(document).scrollTop();
            //还需要减去input的高度,及减去空余的2px
            h = h-$(this).outerHeight()-2;
            //获取ul的高度
            var ulheight = $bul.height();
            if(h<ulheight){//如果小于，则显示input上面的ul
                $bul.css("left",inputposition.left).css("top",inputposition.top-ulheight-16).css("display","block");
            }else{
                $bul.css("left",inputposition.left).css("top",inputposition.top+$(this).outerHeight()).css("display","block");
            }
        },
        hide:function(){
            var bomenuid = $(this).attr("bomenuid");
            $("#" + bomenuid).css("display", "none");
        },
        getSelectedValue: function (val) {
            return $(this).attr("val");
        },
        getSelectedText:function(){
            return $(this).val();
        },
        setSelectedByValue: function (val) {
            if (!val) {
                return;
            }
            var arr = val.split(";");
            var bomenuid = $(this).attr("bomenuid"),
                $bomenu = $("#"+bomenuid);
            var bolis = $bomenu.children();
            var value="",text="";
            bolis.find(".basesprite").css("display", "none");
            for(var j=0;j<arr.length;j++){
                for(var i=0;i<bolis.length;i++){
                    var firstspan = $(bolis[i]).find("span:first"),
                        lastspan = $(bolis[i]).find("span:last");
                    if(arr[j]==firstspan.attr("val")){
                        value += firstspan.attr("val")+";";
                        text += firstspan.text()+";";
                        lastspan.css("display","block");
                    }
                }
            }
            $(this).attr("val",value.substring(0,value.length-1));
            $(this).val(text.substring(0,text.length-1));
        },
        clear:function(){
            $(this).attr("val", "").val("");
            var bomenuid = $(this).attr("bomenuid"),
                $bomenu = $("#" + bomenuid);
            var bolis = $bomenu.children();
            bolis.find(".basesprite").css("display", "none");
        },
        resize: function () {
            var width = $(this).css("width");
            var bomenuid = $(this).attr("bomenuid");
            $("#" + bomenuid).css("width", width);
        },
        disable: function () {
            $(this).attr("disabled",true).nextAll(".input-group-btn").find(".btn").attr("disabled",true);
        },
        enable: function () {
            $(this).attr("disabled",false).nextAll(".input-group-btn").find(".btn").attr("disabled",false);
        },
        destroy:function(){
            var bomenuid = $(this).attr("bomenuid");
            $(this).off("click blur");
            $(this).nextAll(".input-group-btn").find(".btn").off();
            $("#" + bomenuid).remove();
        }
};
})(window.jQuery);
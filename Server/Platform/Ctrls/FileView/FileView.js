HoteamUI.Control.OFileView = {
    Create: function (options) {
        var self = this;
        options = options || {};
        //设置参数
        var parentId = this.id;
        var id = this.id + "_FileView";
        var CtrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions;
        var o = $.extend(true, {}, $.hoteamFileView.defaults, CtrlOptions);
        o.parentId = parentId;
        o.id = id;
        o.DateType = o.type;
        o.type = "text";
        o.autofit = options.autofit;
        //事件参数
        var handlers = (options.controlInfo || this.ControlInfo()).PageHandlers;
        o.event = {};
        o.event.hoteamCtrl = this;
        $.each(handlers, function (index, val) {
            if (val.HandlerName == "Onclick") {
                o.callback.onclick = self.GetEventFunctionName("click");
            }
        });
        //$.hoteamFileView.load(o);
    },
    LoadFiles: function (options) {
        var parentId = this.id;
        $.hoteamFileView.load(options, parentId);
    }

};

{
    (function ($) {
        $.hoteamFileView = {
            load: function (options, parentId) {
                var items;
                if (options) {
                    items = JSON.parse(options);
                } else {
                    return;
                }
				
                var _this = this;
                var container = $("#" + parentId);
                container.empty();
				var html='';
				var allHtml='';
				for(var i=0,leni=items.length;i<leni;i++){
					html+=[
							'<a target="_blank" href="',
							items[i].src,
							'" title="',
							items[i].name,
							'" class="platform-file-item cl">',
							'<div class="platform-file-img fl"><img src="',
							items[i].icon || "../Platform/Ctrls/FileUpload/images/file-upload.png",
							'" title=""></div>',
							'<p class="platform-file-name fl">',
							items[i].name,
                            "&nbsp;&nbsp;",
                            items[i].size,
							'</p></a>'
					].join('');
				}
				allHtml='<div class="platform-file-container">'+html+'</div>';
				container.append(allHtml);
            }

        }

    })(jQuery);
}
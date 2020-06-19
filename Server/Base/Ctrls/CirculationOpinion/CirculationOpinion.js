HoteamUI.Control.OCirculationOpinion = {
    Create: function (options) {
        var self = this;
        options = options || {};
        //设置参数
        var parentId = this.id;
        var id = this.id + "_CirculationOpinion";
        var CtrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions;
        var o = $.extend(true, {}, $.hoteamDateTime.defaults, CtrlOptions);
        o.parentId = parentId;
        o.id = id;
        o.DateType = o.type;
        o.type = "text";
        o.autofit = options.autofit;
        //事件参数
        var handlers = (options.controlInfo || this.ControlInfo()).PageHandlers;
        o.event = {};
        o.o = HoteamUI.Control.Instance(parentId);
        $.each(handlers, function (index, val) {
            if (val.HandlerName == "OnChange") {
                o.callback.onchange = self.GetEventFunctionName("OnChange");
            }
        });
        //$.hoteamDateTime.create(o);
        $.hoteamCirculationOpinion.create(options);
    },
    LoadData: function (options) {
        options.parentId = this.id;
        $.hoteamCirculationOpinion.create(options);
    },
    Resize: function () {
        var id = this.id + "_CirculationOpinion";
        $.hoteamCirculationOpinion.resize(id, 0);
    }
};

{
    (function ($) {
        $.hoteamCirculationOpinion = {
            defaults: {
                parentId: null,
                id: null,
                value: null,
                text: null,
                textId: null,
            },
            create: function (options) {
                var parentId = options.parentId;
				var data = options.data;
				var html='';
				var titleHtml='';
				var tableStartHtml='<table border="0" cellspacing="0" cellpadding="0" class="hoteam-formbuilder-option-table"><tbody>';
				var tableEndHtml = '</tbody></table>';

				if(options.data){
					if(typeof(data)=="string"){
						data=JSON.parse(data);
					}
					if(options.title!==''){
						titleHtml=[
							'<div class="hoteam-formbuilder-option-title hoteam-formbuilder-option-color-blue"><p>',
							options.title,
							'</p></div>'
							].join('');					
					}					
					for(var i=0,datalen=data.length;i<datalen;i++){
					    html += [
					        '<tr><td><div class="hoteam-formbuilder-option-cl"><div class="hoteam-formbuilder-option-fl"><p class="hoteam-formbuilder-option-color-blue">',
                            data[i].name,
                            '</p><p class="hoteam-formbuilder-option-color-gray">',
                            data[i].partment,
                            '</p></div></div></td>',
					        '<td width="60%"><p>',
                            data[i].text,
                            '</p><p class="hoteam-formbuilder-option-resaveName hoteam-formbuilder-option-color-gray">接收人：',
                            data[i].resaveName,
                            '</p></td>',
					        '<td><p class="hoteam-formbuilder-option-color-gray">',
                            data[i].dateTime,
                            '</p><p class="hoteam-formbuilder-option-color-blue">[',
                            data[i].state,
                            ']</p></td></tr>'
					    ].join('');
					}
					html = "<div class='hoteam-formbuilder-option-parentContainer'>" + titleHtml + tableStartHtml + html + tableEndHtml + "</div>";
					$("#"+parentId).html('').append(html);
				}

            },

            resize: function (id) {
	
            } 
        }

    })(jQuery);
}
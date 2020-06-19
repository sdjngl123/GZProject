HoteamUI.Control.ORadioList = {
    Create: function (options) {
        //设置参数
        var self = this;
        options = options || {};
        var ContainerID = this.ContainerID();
        var parentId = this.id;
        var id = this.id + "_RadioList";
        var CtrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions;
        var o = {};
        o.items = {};
        o.parentId = parentId;
        o.id = id;
        o.autofit = options.autofit;
        o.position = CtrlOptions.position;
        o.regex = CtrlOptions.regex;
        o.regextipId = CtrlOptions.regextipId;
        for (var i in CtrlOptions) {
            if (!CtrlOptions.hasOwnProperty(i)) {
                continue;
            }
            if (i.indexOf("item") > -1) {
                var item = CtrlOptions[i];
                if (item.textId) {
                    item.text = HoteamUI.Language.Lang(item.textId);
                }
                item.group = id;
                item.id = id + "_" + i;
                o.items[i] = item;
            }
        }

        //事件参数
        var handlers = (options.controlInfo || this.ControlInfo()).PageHandlers;
        o.event = {};
        o.event.hoteamCtrl = HoteamUI.Control.Instance(parentId);
        o.callback = {};
        $.each(handlers, function (index, val) {
            if (val.HandlerName == "OnLoad") {
                o.callback.onload = self.GetEventFunctionName("OnLoad");
            }
            if (val.HandlerName == "OnChange") {
                o.callback.onchange = self.GetEventFunctionName("OnChange");
            }
        });
        o.o = HoteamUI.Control.Instance(parentId);
        $.hoteamRadioList.create(o);
    },
    Resize: function () {
        var id = this.id + "_RadioList";
        $.hoteamCheckBox.resize(id);
    },
    Check: function () {
        var radioList = $("#" + this.id + "_RadioList");
        var id = radioList.find(".hoteam-form-check").siblings(".hoteam-radio-text").attr("id");
        var val = this.GetValue();
        return $.hoteamToolTip.check(id, val, false);
    },
    Disable: function () {
        var select = "#" + this.id + "_RadioList";
        $("input", select).attr("disabled", true);
    },
    Enable: function () {
        var select = "#" + this.id + "_RadioList";
        $("input", select).attr("disabled", false);
    },
    GetValue: function () {
        var select = "#" + this.id + "_RadioList";
        return $("input:checked", select).attr("value");
    },
    GetText: function () {
        var select = "#" + this.id + "_RadioList";
        return $("input:checked", select).parent().text();
    },
    SetValue: function (index, value) {
        var select = "#" + this.id + "_RadioList";
        $($("input", select)[index]).attr("value", value);
    },
    SetSelectByValue: function (value) {
        var select = "#" + this.id + "_RadioList";
        var checkbox = $($("input", select)).filter("[value='" + value + "']");
        checkbox.attr("checked", "true");
        //如果通过此方法给radio赋值，则需要修改lastId
        $(select).attr("lastId", checkbox.parent().attr("id"));
    },
    AddRadio: function (options) {
        ///	<summary>
        ///		添加新的Radio
        ///	</summary>
        ///	<param name="options" type="json">
        ///		1.disabled:是否禁用，布尔类型
        ///        2.checked:是否选中，布尔类型
        ///        3.text:显示值
        ///     4.value:value值 
        ///	</param>

        var id = this.id + "_RadioList";
        $.hoteamRadioList.addRadio(id, options);
    },
    Clear: function () {
        ///	<summary>
        ///	    清空RadioList
        ///	</summary>

        var id = this.id + "_RadioList";
        $("#" + id).empty2();
    }
};


{
    (function ($) {
        $.hoteamRadioList = {
            defaults: {
                parentId: null,
                id: null,
                items: null,
                position: "horizontal",
                regex: null,
                regextipId: ""
            },
            itemDefaults: {
                parentId: null,
                id: null,
                text: null,
                textId: null,
                value: null,
                margin: null,
                checked: false,
                type: "radio",
                disabled: false,
                group: null
            },
            create: function (options) {
                var o = $.extend({}, $.hoteamRadioList.defaults, options);
                var id = ' id="' + o.id + '" ';
                var radioList = '<ul  class="hoteamRadioList" ' + id + '></ul>';
                var container = $("#" + o.parentId);
                container.append(radioList);
                if(o.autofit){
                    container.css("height",40);
                }
                radioList = $("#" + o.id);
                if (o.position == "horizontal") {
                    radioList.addClass("hoteamRadioListHorizontal");
                    radioList.css({
                        top: "50%",
                        marginTop: "-12px"
                    });
                }
                else if (o.position == "vertical") {
                    radioList.addClass("hoteamRadioListVertical");
                }
                if (o.fontsize) {
                    radioList.css("font-size", o.fontsize)
                }

                for (var i in o.items) {
                    if (!o.items.hasOwnProperty(i)) {
                        continue;
                    }
                    var item = o.items[i];
                    item = $.extend({}, $.hoteamRadioList.itemDefaults, item);
                    var disabled = (item.disabled == true) ? ' disabled="true" ' : " ";
                    var checked = (item.checked == true) ? ' checked="true" ' : " ";
                    var group = ' name="' + item.group + '" ';
                    var value = 'value="' + item.value + '"';
                    var radio = '<li class="hoteamRadio"><span class="hoteam-radio-text" id="' + item.id + '" ><input type="' + item.type + '" id = "' + '"' + disabled + group + checked + value + '  style="margin-top:-2px;"/>' + item.text + '</span></li>';
                    radioList.append(radio);
                }
                if (o.callback && o.callback.onchange) {
                    radioList.click(function (e) {
                        var srcElement = e.srcElement;
                        if (srcElement.tagName == "INPUT") {
                            var radio = $(srcElement);
                            var id = radio.parent().attr("id");
                            var radioList = $(e.currentTarget);
                            var lastId = radioList.attr("lastId");
                            if (id != lastId) {
                                var functionName = o.callback.onchange;
                                var functionPara = { o: o.event.hoteamCtrl };
                                HoteamUI.Common.ExeFunction(functionName, functionPara);
                                radioList.attr("lastId", id);
                            }
                        }
                    });
                }
                //加载onload方法
                HoteamUI.Common.ExeFunction(o.callback.onload, o);

                if (o.regex) {
                    var checkCtrlOptions = $.extend({}, o);
                    if (o.position == "vertical") {
                        checkCtrlOptions.id = radioList.find(">li:first .hoteam-radio-text").attr("id");
                        $.hoteamToolTip.create(checkCtrlOptions);
                    }
                    else {
                        checkCtrlOptions.id = radioList.find(">li:last .hoteam-radio-text").attr("id");
                        $.hoteamToolTip.create(checkCtrlOptions);
                    }
                }
                this.resize(o.id);
            },
            addRadio: function (parentid, options) {
                var radioList = $("#" + parentid);
                var item = $.extend({}, $.hoteamRadioList.itemDefaults, options);
                var newid = radioList.data("new_radio_id");
                newid = (newid != undefined && newid != null) ? ++newid : 1;
                radioList.data("new_radio_id", newid);
                newid = parentid + "_add_" + newid;
                var disabled = (item.disabled == true) ? ' disabled="true" ' : " ";
                var checked = (item.checked == true) ? ' checked="true" ' : " ";
                var group = ' name="' + parentid + '" ';
                var value = 'value="' + item.value + '"';
                var radio = '<li class="hoteamRadio"><span  class="hoteam-radio-text" id="' + newid + '" ><input type="' + item.type + '" id = "' + '"' + disabled + group + checked + value + '  />' + item.text + '</span></li>';
                radioList.append(radio);
            },
            resize: function (id) {
                var radioList = $("#" + id);
                var check = radioList.find(".hoteam-form-check");
                var width = check.siblings(".hoteam-radio-text").width();
                check.css({
                    left: (width + 16) + "px",
                    right: "auto"
                });
            } //

        }
    })(jQuery);
}
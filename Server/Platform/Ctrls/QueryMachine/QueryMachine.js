HoteamUI.Control.OQueryMachine = {
    Create: function (options) {
        options = options || {};
        //设置参数
        var me = this;
        var parentId = me.id;
        var id = this.id + "_QueryMachine";
        var ctrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions;
        var o = {};
        o.o = HoteamUI.Control.Instance(parentId);
        o.parentId = parentId;
        o.id = id;
        o.allowOperate = ctrlOptions.allowOperate;
        o.required = ctrlOptions.required;
        var items = [];
        $.each(ctrlOptions, function (index, item) {
            if (index.indexOf("item") > -1) {
                items.push(item);
            }
        });
        o.items = items;
        //事件参数
        var handlers = (options.controlInfo || this.ControlInfo()).PageHandlers;
        o.callback = {};
        ctrlOptions.o = HoteamUI.Control.Instance(parentId);
        $.each(handlers, function (index, val) {
            if (val.HandlerName == "OnAdd") {
                o.callback.onadd = me.GetEventFunctionName("OnAdd");
            }
        });
        $.hoteamQueryMachine.create(o);
    },
    LoadFilterData: function (data) {
        this.Clear();
        this.AddFilterData(data);
    },
    AddFilterData: function (data) {
        $.hoteamQueryMachine.addQueryFilter(this.id + "_QueryMachine", data);
    },
    GetFilterData: function () {
        return $.hoteamQueryMachine.getFilterData(this.id + "_QueryMachine");
    },
    SetTextValueData: function (filterid, obj) {
        $.hoteamQueryMachine.setTextValueData(this.id + "_QueryMachine", filterid, obj);
    },
    ResetFilterData: function () {
        return $.hoteamQueryMachine.resetFilterData(this.id + "_QueryMachine");
    },
    Clear: function () {
        var id = this.id + "_QueryMachine";
        $.hoteamQueryMachine.dispose(id);
        $("#" + id).empty();
        $.hoteamQueryMachine.addQueryFilter(id, []);
    },
    Check: function () {
        var id = this.id + "_QueryMachine";
        return $.hoteamQueryMachine.check(id);
    },
    Resize: function () {
        var id = this.id + "_QueryMachine";
        $.hoteamQueryMachine.resize(id);
    },
    Dispose: function () {
        var id = this.id + "_QueryMachine";
        $.hoteamQueryMachine.dispose(id);
    }
}

{
    (function ($) {
        $.hoteamQueryMachine = {
            create: function (o) {
                //创建容器
                var containter =
                    '<div class="hoteam-QueryMachine">' +
                        '<div class="hoteam-QueryMachine-c" id="' + o.id + '"></div>' +
                    '</div>';
                $("#" + o.parentId).append(containter);
                //留出滚动条位置
                var query = $("#" + o.id).data("option", o),
                    queryParent = query.parent(),
                    pWidth = queryParent.width();
                query.css("width", pWidth);
                //创建新增查询条件
                this.addQueryFilter(o.id, o.items);
                //注册点击事件
                this.initHandler(o);
            },
            addQueryFilter: function (id, data) {
                var me = this,
                    con = $("#" + id),
                    o = con.data("option"),
                    width = con.width(),
                    filter = con.children(),
                    length = filter.length;
                //如果data数组长度为0
                if (data.length == 0 && length == 0 && o.allowOperate != false) {
                    con.append('<div class="querymachine-filter"><span class="basesprite b-node-close"></span></div>');
                }
                for (var i = 0; i < data.length; i++) {
                    var guid = HoteamUI.UIManager.NewGUID();
                    //如果当前查询控件仅仅初始化过，但是还未加载任何条件
                    if (length == 1 && $(filter[0]).children("span.querymachine-filter-label").length == 0) {
                        $(filter[0]).empty().attr("filterid", data[i].id).attr("type", data[i].type).attr("setting", JSON.stringify(data[i])).append(getFilterHtml(o, data[i], width, guid));
                        this.initCreat(id, data[i], guid, o);
                        continue;
                    }
                    var ele = $('<div class="querymachine-filter" filterid="' + data[i].id + '" type="' + data[i].type + '" setting="' + encodeURI(JSON.stringify(data[i])) + '"></div>');
                    //找到上次点击的那个新增按钮，在此条查询条件下面新增
                    var selectAdd = con.find("span.querymachine-add-focus:last");
                    ele.append(getFilterHtml(o, data[i], width, guid));
                    if (selectAdd.length == 0) {//如果没找到,直接在最后面新增
                        con.append(ele);
                    } else {
                        selectAdd.parent().after(ele);
                    }
                    //初始化下拉等
                    this.initCreat(id, data[i], guid, o);
                }
                //删除记录的class
                con.children().find(".querymachine-add-focus").removeClass("querymachine-add-focus");
                me.resize(id);
                function getFilterHtml(o, obj, width, i) {
                    var html = '';
                    var inputWidth = width - 80 - 6;//80是lable的宽度，6是lable与input的间隔
                    if (o.allowOperate != false) {
                        inputWidth = inputWidth - 20 * 2;//80是lable的宽度，6是lable与input的间隔，20*2是两个图片的宽度
                    }
                    if (o.allowOperate != false) {
                        html += '<span class="basesprite b-node-open"></span>' +
                            '<span class="basesprite b-node-close querymachine-add-focus"></span>';
                    }
                    if (o.required == true) {
                        inputWidth = inputWidth - 16;
                        if (obj.required == true) {
                            obj.regex = obj.regex ? obj.regex + " AND [\\S]+" : '[\\S]+';
                            var oldRegexText = '';
                            if (obj.regexText) {
                                oldRegexText = obj.regexText + '且';
                            }
                            obj.regexText = oldRegexText + '不允许为空';
                            html += '<span class="querymachine-filter-required">*</span>';
                        } else {
                            html += '<span class="querymachine-filter-required">&nbsp;</span>';
                        }
                    }
                    html += '<div class="querymachine-filter-containter" style="width:' + inputWidth + 'px;">' +
                                getHtmlByType(obj, i, o.id) +
                            '</div>';
                    var label = getLableText(obj);
                    html += '<span class="querymachine-filter-label" title="' + label + '"><span>' + label + '</span></span>';
                    return $(html);
                }
                function getLableText(obj) {
                    var text = "";
                    if (obj.labelText) {
                        text = obj.labelText;
                    } else if (obj.labelId) {
                        text = HoteamUI.Language.Lang(obj.labelId);
                    }

                    return HoteamUI.Common.HtmlEscape(text);
                }
                function getHtmlByType(obj, i, cid) {
                    var html, id = cid + "item" + i;
                    if (obj.type == "TextBox") {
                        html = '<input id="' + id + '" regex="' + (obj.regex || "") + '" regexText="' + (obj.regexText || "") + '" type="text" class="form-control input-sm querymachine-filter-input" autocomplete="off"/>';
                    } else if (obj.type == "TextValue") {
                        html = '<input id="' + id + '" readonly js="' + (obj.click || "") + '" regex="' + (obj.regex || "") + '" regexText="' + (obj.regexText || "") + '" type="text" class="form-control input-sm querymachine-filter-input querymachine-filter-textValue" autocomplete="off"/>' +
                                '<span class="basesprite b-close querymachine-trash"></span>';
                    } else if (obj.type == "AutoCompleteCombox") {
                        html = '<div class="input-group">' +
                                    '<input id="' + id + '" type="text" regex="' + (obj.regex || "") + '" regexText="' + (obj.regexText || "") + '" class="form-control input-sm querymachine-filter-autoCompleteCombox" autocomplete="off">' +
                                    '<div class="input-group-btn">' +
                                        '<div style="height:26px;" class="btn btn-default dropdown-toggle btn-sm" data-toggle="dropdown">' +
                                            '<span class="caret" style="margin-top: 5px;"></span>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>'
                        ;
                    } else if (obj.type == "DropDown") {
                        html = '<div class="input-group">' +
                                    '<input id="' + id + '" type="text" regex="' + (obj.regex || "") + '" regexText="' + (obj.regexText || "") + '" class="form-control input-sm querymachine-filter-dropDown" autocomplete="off" readonly>' +
                                    '<div class="input-group-btn">' +
                                        '<div style="height:26px;" class="btn btn-default dropdown-toggle btn-sm" data-toggle="dropdown">' +
                                            '<span class="caret" style="margin-top: 5px;"></span>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>'
                        ;
                    } else if (obj.type == "DateTime") {
                        html = '<div id="' + id + '" class="input-group date form_datetime" datetype="' + obj.dateType + '" data-link-field="' + id + '_input">' +
                                    '<input class="form-control input-sm querymachine-filter-dateTime" type="text" regex="' + (obj.regex || "") + '" regexText="' + (obj.regexText || "") + '" readonly>' +
                                    '<span class="input-group-addon" style="padding:0 6px;"><span style="font-size:12px;" class="glyphicon glyphicon-calendar"></span></span>' +
                                    '<span class="hoteamDateTime-close basesprite b-close"></span>' +
                                '</div>' +
                                '<input type="hidden" id="' + id + '_input"/>'
                        ;
                    } else if (obj.type == "MultiSelectDropDown") {
                        html =
                    '<div class="input-group">' +
                        '<input type="text" id="' + id + '" class="form-control input-sm readonly querymachine-filter-multiSelectDropDown" autocomplete="off" readonly regex="' + (obj.regex || "") + '" regexText="' + (obj.regexText || "") + '">' +
                        '<div class="input-group-btn">' +
                            '<button style="height:26px;" type="button" class="btn btn-default dropdown-toggle btn-sm" data-toggle="dropdown">' +
                                '<span class="caret"></span>' +
                            '</button>' +
                        '</div>' +
                    '</div>'
                    } else if (obj.type == "CheckBox") {
                        html = '<input id="' + id + '" type="checkbox" class="querymachine-filter-checkBox"/>';
                    } else if (obj.type == "RadioList") {
                        html = '<div class="querymachine-filter-radioList-c" id="' + id + '"></div>';
                    }
                    //20430 李金岳
                    //添加EditButton 
                    else if (obj.type == "EditButton") {
                        var disabled = o.disabled == true ? 'disabled="disabled"' : '';
                        html = '<div id="' + id + '" class="input-group">' +
                                    '<input class="input-sm form-control   querymachine-filter-editButton" type="text" ' + disabled + '>' +
                                    '<span ' + disabled + ' class="input-group-addon" style="padding: 0 6px;cursor: pointer;"><span class="basesprite b-gray-more"></span></span>' +
                                '</div>'
                    } else {
                        html = '<div class="querymachine-filter-text-c" id="' + id + '">' + obj.text + '</div>';
                    }
                    return html;
                }
            },
            initCreat: function (id, obj, i, o) {
                id = id + "item" + i;
                if (obj.type == "AutoCompleteCombox" || obj.type == "DropDown") {
                    var data = obj.data;
                    if (!(data instanceof Array)) {
                        data = eval(data);
                    }
                    if (!data) {
                        if (obj.databind) {
                            data = eval(obj.databind);
                        }
                    }
                    $("#" + id).bsSuggest({ "data": data });
                    if (obj.value) {
                        $("#" + id).bsSuggest("setSelectedByValue", obj.value);
                    }

                    if (obj.onchange) {
                        //change事件
                        $("#" + id).on("change", { e: { "o": o.o, filterid: obj.id }, fun: obj.onchange }, function (e) {
                            var param = e.data.e,
                                elem = $(this);

                            param.value = elem.attr('data-val');
                            param.text = elem.val();

                            HoteamUI.Common.ExeFunction(e.data.fun, { o: o.o });
                        });
                    }
                } else if (obj.type == "TextValue") {
                    if (obj.text != undefined) {
                        $("#" + id).val(obj.text);
                    }
                    if (obj.value != undefined) {
                        $("#" + id).attr("hiddenValue", obj.value);
                    }
                } else if (obj.type == "TextBox") {
                    if (obj.text != undefined) {
                        $("#" + id).val(obj.text);
                    }
                    if (obj.value != undefined) {
                        $("#" + id).val(obj.value);
                    }
                    if (obj.readonly) {
                        $("#" + id).attr("readonly", true).css("background-color", "#eee");
                    }
                } else if (obj.type == "DateTime") {
                    var dateFmt = "yyyy-mm-dd hh:ii:ss";
                    var startView = 2;
                    var maxView = 4;
                    var minView = 0;
                    var todayBtn = true;
                    if (obj.dateType == "date") {
                        dateFmt = 'yyyy-mm-dd';
                        minView = 2;
                    } else if (obj.dateType == "time") {
                        dateFmt = 'hh:ii:ss';
                        startView = 1;
                        maxView = 1;
                        minView = 0;
                        todayBtn = false;
                    }
                    $("#" + id).datetimepicker({
                        format: dateFmt,
                        language: HoteamUI.Language.CurLanguage,
                        autoclose: true,
                        todayBtn: todayBtn,
                        forceParse: true,
                        startView: startView,
                        maxView: maxView,
                        minView: minView,
                        pickerPosition: "bottom-left"
                    });
                    if (obj.text != undefined) {
                        $("#" + id).find("input").val(obj.text);
                    }
                    if (obj.value != undefined) {
                        if (obj.dateType == "time") {
                            $("#" + id).find("input").val(obj.text);
                        } else {
                            $("#" + id).find("input").val($.hoteamDateTime.getDateTimeByTicks(obj.value, obj.dateType || "datetime"));
                        }
                    }
                } else if (obj.type == "MultiSelectDropDown") {
                    var data = obj.data;
                    if (!(data instanceof Array)) {
                        data = eval(data);
                    }
                    $("#" + id).selectpicker({ "data": data });
                    if (obj.value) {
                        $("#" + id).selectpicker("setSelectedByValue", obj.value);
                    }
                } else if (obj.type == "CheckBox") {
                    if (obj.value != undefined) {
                        $("#" + id).attr("checked", obj.value);
                    }
                } else if (obj.type == "RadioList") {
                    var ele = $("#" + id);
                    var data = obj.data;
                    if (!(data instanceof Array)) {
                        data = eval(data);
                    }
                    for (var k = 0; k < data.length; k++) {
                        var item = data[k];
                        var checked = '';
                        if (item.selected || item.Selected) {
                            checked = 'checked="checked"';
                        }
                        if ((item.value || item.Value) == obj.value) {
                            checked = 'checked="checked"';
                        }
                        ele.append('<input ' + checked + ' name="' + id + '" val="' + (item.value || item.Value) + '" type="radio" class="querymachine-filter-radioList"/><span style="margin-right:10px;">' + getText(item) + '</span>');
                    }
                }
                //20430 李金岳
                //为EditButton绑定click事件 
                else if (obj.type == "EditButton") {
                    if (obj.onclick) {
                        $("#" + id).children(".input-group-addon").on("click", { e: { "o": o.o, filterid: obj.id }, fun: obj.onclick }, function (e) {
                            var param = e.data.e;
                            param.editButton = {};
                            param.editButton.id = id;
                            param.editButton.GetTag = function () { return $("#" + id).find("input").data("tag"); }
                            param.editButton.SetTag = function (obj) { return $("#" + id).find("input").val(obj.text || obj.Text || "").data("tag", obj); }
                            param.editButton.GetText = function () { return $("#" + id).find("input").val(); }
                            HoteamUI.Common.ExeFunction(e.data.fun, param);
                        });
                    }
                    $("#" + id).find("input").val(obj.value || obj.Value || "");
                }
                function getText(item) {
                    if (item.textId || item.TextId) {
                        return HoteamUI.Language.Lang(item.textId || item.TextId);
                    } else {
                        return item.text || item.Text;
                    }
                }
            },
            initHandler: function (o) {
                var me = this;
                $("#" + o.id).on("click", ".basesprite", function () {
                    if ($(this).hasClass("b-node-open")) {//删除
                        var brother = $(this).parent().siblings();
                        $(this).parent().remove();
                        if (brother.length == 0) {
                            me.addQueryFilter(o.id, []);
                        }
                    } else if ($(this).hasClass("b-node-close")) {//添加
                        $(this).addClass("querymachine-add-focus");
                        HoteamUI.Common.ExeFunction(o.callback.onadd, { o: o.o });
                    } else if ($(this).hasClass("querymachine-trash")) {
                        $(this).siblings("input").val("").attr("hiddenvalue", "");
                    } else if ($(this).hasClass("hoteamDateTime-close")) {
                        $(this).siblings("input").val("");
                    }
                });
                $("#" + o.id).on("click", ".querymachine-filter-input", function () {
                    if ($(this).attr("js")) {
                        var ctrlEvent = {};
                        ctrlEvent.o = o.o;
                        var input = $(this);
                        ctrlEvent.text = input.val();
                        ctrlEvent.value = input.attr("hiddenValue");
                        ctrlEvent.id = input.closest(".querymachine-filter").attr("filterid");
                        eval($(this).attr("js"));
                    }
                });
                $("#" + o.id).on("mouseenter", ".hoteamDateTime-close", function () {
                    $(this).show();
                });
                $("#" + o.id).on("mouseenter", ".querymachine-filter-dateTime", function () {
                    $(this).nextAll(".hoteamDateTime-close").show();
                });
                $("#" + o.id).on("mouseleave", ".querymachine-filter-dateTime", function () {
                    $(this).nextAll(".hoteamDateTime-close").hide();
                });
            },
            resetFilterData: function (id) {
                var filter = $("#" + id).children();
                $(filter).each(function () {
                    var ele = $(this),
                        type = ele.attr("type"),
                        con = ele.children(".querymachine-filter-containter");
                    if (type == "TextBox") {
                        con.find("input").val("");
                    } else if (type == "DropDown" || type == "AutoCompleteCombox") {
                        $("#" + con.find("input").attr("id")).bsSuggest("clearData");
                    } else if (type == "MultiSelectDropDown") {
                        $("#" + con.find("input").attr("id")).selectpicker("clear");
                    } else if (type == "TextValue") {
                        var inputId = con.find("input").attr("id");
                        $("#" + inputId).val("").attr("hiddenValue", "");
                    } else if (type == "DateTime") {
                        con.find("input").val("");
                    } else if (type == "CheckBox") {
                        con.find("input").prop("checked", false);
                    } else if (type == "EditButton") {
                        con.find("input").val("");
                    }
                    else if (type == "RadioList") {
                        var input = con.find("input");
                        input.prop("checked", false);
                    }
                })
            },
            getFilterData: function (id) {
                var filter = $("#" + id).children(),
                    arr = [];
                $(filter).each(function () {
                    var obj = {},
                        con = $(this).children(".querymachine-filter-containter"),
                        type = $(this).attr("type");
                    obj.id = $(this).attr("filterid");
                    obj.setting = decodeURI($(this).attr("setting"));
                    obj.label = $(this).children(".querymachine-filter-label").text();
                    if (type == "TextBox") {
                        obj.text = con.find("input").val();
                        obj.value = obj.text;
                    } else if (type == "DropDown" || type == "AutoCompleteCombox") {
                        var inputId = con.find("input").attr("id");
                        obj.text = $("#" + inputId).bsSuggest("getSelectedText");
                        obj.value = $("#" + inputId).bsSuggest("getSelectedValue");
                    } else if (type == "MultiSelectDropDown") {
                        var inputId = con.find("input").attr("id");
                        obj.text = $("#" + inputId).selectpicker("getSelectedText");
                        obj.value = $("#" + inputId).selectpicker("getSelectedValue");
                    } else if (type == "TextValue") {
                        var inputId = con.find("input").attr("id");
                        obj.text = $("#" + inputId).val();
                        obj.value = $("#" + inputId).attr("hiddenValue");
                    } else if (type == "DateTime") {
                        obj.text = con.find("input").val();
                        if (con.children().attr("dateType") == "time") {
                            obj.value = obj.text;
                        } else {
                            obj.value = $.hoteamDateTime.getTicksByDateTime(obj.text, con.children().attr("dateType"));
                        }
                    } else if (type == "CheckBox") {
                        obj.value = con.find("input").prop("checked");
                    } else if (type == "RadioList") {
                        var input = con.find("input:checked");
                        if (input.length > 0) {
                            obj.value = input.attr("val");
                            obj.text = input.next().text();
                        }
                    }
                    //20430 李金岳
                    //获取EditButton的数据
                    else if (type == "EditButton") {
                        if (con.find("input").val()) {
                            obj.text = con.find("input").val();
                        } else {
                            obj.text = "";
                        }
                        if (con.find("input").data("tag")) {
                            obj.value = con.find("input").data("tag").value || con.find("input").data("tag").Value || "";
                        } else {
                            obj.value = obj.text;
                        }
                    }
                    arr.push(obj);
                });
                return arr;
            },
            setTextValueData: function (id, filterid, obj) {
                var textValue = $("#" + id).children("[filterid='" + filterid + "']").find("input");
                textValue.attr("hiddenValue", obj.value || obj.Value).val(obj.text || obj.Text);
                textValue.attr("data-val", obj.value || obj.Value);
            },
            check: function (id) {
                var me = this,
                    con = $("#" + id),
                    filter = con.children('.querymachine-filter'),
                    flag = true;
                $(filter).each(function () {
                    var type = $(this).attr("type"),
                        regex, regexText,
                        input = $(this).find("input");
                    if (input.length > 0) {
                        regex = input.attr("regex");
                        regexText = input.attr("regexText");
                        if (!regexFun(input.val(), regex)) {//校验未通过
                            showError($(this).children(".querymachine-filter-containter"), regexText);
                            flag = false;
                        } else {
                            hideError($(this).children(".querymachine-filter-containter"));
                        }
                    }
                });
                function showError(ele, text) {
                    if (ele.prev(".b-warn").length == 0) {
                        var width = parseInt(ele.css("width"));
                        ele.before($('<span class="basesprite b-warn"></span>').poshytip({
                            content: text,
                            alignTo: 'target',
                            alignX: 'inner-left',
                            slide: false,
                            offsetX: -16,
                            offsetY: 1
                        }));
                        ele.css("width", width - 16);
                        me.resizeFilter(ele);
                    }
                }
                function hideError(ele) {
                    if (ele.prev(".b-warn").length > 0) {
                        var width = parseInt(ele.css("width"));
                        ele.prev(".b-warn").remove();
                        ele.css("width", width + 16);
                        me.resizeFilter(ele);
                    }
                }
                function regexFun(value, regex) {
                    if (regex) {
                        var regArray = regex.split("AND");
                        for (var i = 0; i < regArray.length; i++) {
                            var currentReg = $.trim(regArray[i]);
                            var reg = new RegExp(currentReg);
                            if (reg.test(value)) {
                                continue;
                            } else {
                                return false;
                            }
                        }
                    }
                    return true;
                }
                return flag;
            },
            resizeFilter: function (ele) {
                var type = ele.attr("type");
                if (type == "DropDown" || type == "AutoCompleteCombox") {
                    var id = ele.find("input").attr("id");
                    $("#" + id).bsSuggest("resize");
                } else if (type == "MultiSelectDropDown") {
                    var id = ele.find("input").attr("id");
                    $("#" + id).selectpicker("resize");
                }
            },
            dispose: function (id) {
                var filters = $("#" + id).children();
                filters.each(function () {
                    var type = $(this).attr("type");
                    if (type == "AutoCompleteCombox" || type == "DropDown") {
                        var inputid = $(this).find("input").attr("id");
                        $("#" + inputid).bsSuggest("destroy");
                    } else if (type == "DateTime") {
                        $(this).find("input").parent().datetimepicker("remove");
                    } else if (type == "MultiSelectDropDown") {
                        var inputid = $(this).find("input").attr("id");
                        $("#" + inputid).selectpicker("destroy");
                    }
                });
            },
            resize: function (id) {
                var me = this,
                    query = $("#" + id),
                    o = query.data("option"),
                    par = query.parent(),
                    parWidth = par.width(),
                    parHeight = par.height(),
                    child = query.children(),
                    queryHeight = query.height(),
                    inputWidth, scrollWidth = 0;
                if (parHeight < queryHeight) scrollWidth = this.getScrollbarWidth() + 2;
                query.css("width", parWidth - scrollWidth);
                inputWidth = parWidth - scrollWidth - 80;//80是lable的宽度
                if (o.allowOperate != false) {
                    inputWidth = inputWidth - 16 * 2;//80是lable的宽度，16*2是两个图片的宽度
                }
                if (o.required == true) {
                    inputWidth = inputWidth - 16;
                }
                $(child).each(function () {
                    var error = $(this).children(".b-warn");
                    if (error.length > 0 && error.css("display") != "none") {
                        $(this).children(".querymachine-filter-containter").css("width", inputWidth - 16);
                    } else {
                        $(this).children(".querymachine-filter-containter").css("width", inputWidth);
                    }
                    me.resizeFilter($(this));
                });
            },
            //获取浏览器滚动条宽度
            getScrollbarWidth: function () {
                var i, clientWidth, overflowClientWidth, scrollbarWidth;
                var p = document.createElement('p');
                var styles = {
                    width: '100px',
                    height: '100px'
                };
                for (i in styles) p.style[i] = styles[i];
                document.body.appendChild(p);
                clientWidth = p.clientWidth;
                p.style.overflowY = 'scroll';
                overflowClientWidth = p.clientWidth;
                scrollbarWidth = clientWidth - overflowClientWidth;
                p.parentNode.removeChild(p);
                return scrollbarWidth;
            }
        }
    })(jQuery);
}
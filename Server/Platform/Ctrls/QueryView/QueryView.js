HoteamUI.Control.OQueryView = {
    Create: function (opt) {
        $.QueryView.create(opt);
    },
    //Edit: function (opt) {
    //    //debugger;
    //    opt.feildData = $.QueryView.getFilterBySql(opt.feildData);
    //    $.QueryView.create(opt);
    //},
    GetQueryString: function (id) {
        var container = $("#" + id + "_QueryView");
        return $.QueryView.searchFilter(container);
    }
}

{
    (function ($) {
        $.QueryView = {
            create: function (opt) {
                var height = $(window).height() + "px";
                var width = $(window).width() + "px";
                var id = opt.id;
                if (HoteamUI.Common.IsNullOrEmpty(opt.hideTitle)) {
                    //20593 李金岳
                    $("body").append('<div class="hoteam-grid-overlay" style="z-index:1000;height:' + height + ';width:' + width + '"></div>');
                }
                //判断是否已经有了弹框元素
                var searchObj = $("#" + id + "_QueryView");
                if (searchObj.length == 0) {
                    var dialog = $(
                        //20593 李金岳
                        '<div class="hoteam-localsearch-dialog" id="' + id + '_QueryView" style="z-index:1001">' +

                        '<div class="hoteam-localsearch-d-title hoteam-localsearch-title" ' + (opt.hideTitle ? 'style="display:none">' : '>') +
                        '<span class="hoteam-localsearch-d-text">' + HoteamUI.Language.Lang("QueryView", "Title") + '</span>' +
                        '<span class="hoteam-localsearch-d-close basesprite b-dialog-close"></span>' +
                        '</div>' +
                        '<div class="hoteam-localsearch-d-content" id="' + id + '_QueryViewContent">' +
                        '<div class="viewnamecontainer" ' + (opt.hideTitle ? 'style="display:none">' : '>') + HoteamUI.Language.Lang("Common", "Name") + '  <input class="hoteam-queryView-name form-control input-sm" type="text" id="viewName"/></div>' +
                        '<hr style="margin:2px 0px;"' + (opt.hideTitle ? 'style="display:none"/>' : '/>') +
                        '<div class="localSearch-container">' +
                        '<div class="localSearch-container-row">' +
                        '<div class="field">' +
                        '  <select class="w100 field-select" onchange="$.QueryView.fieldSelectOnChange(this)">' +
                        '  </select>' +
                        '</div>' +
                        '<div class="condition">' +
                        '  <select class="w100 condition-select">' +
                        '  </select>' +
                        '</div>' +
                        '<div class="result" id="' + HoteamUI.UIManager.NewGUID() + '">' +
                        '</div>' +
                        '<div class="connect">' +
                        '  <select class="w100 connect-select">' +
                        '  </select>' +
                        '</div>' +
                        '<div class="add">' +
                        '</div>' +
                        '<div class="subduct">' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="hoteam-localsearch-d-btns hoteam-localsearch-center" ' + (opt.hideTitle ? 'style="display:none">' : '>') +
                        '<button class="btn btn-default btn-sm localsave">' + HoteamUI.Language.Lang("Common", "Save") + '</button>' +
                        '<button class="btn btn-default btn-sm localquery">' + HoteamUI.Language.Lang("Common", "Query") + '</button>' +
                        '<button class="btn btn-default btn-sm localcancel">' + HoteamUI.Language.Lang("Common", "Cancel") + '</button>' +
                        '</div>' +
                        '</div>');
                    if (opt.hideTitle == true) {
                        $("#" + id + "_QueryView").css("z-index", 0);
                        $("#" + id).append(dialog);//.empty()
                    } else {
                        $("body").append(dialog);
                    }
                    var container = $("#" + opt.id + "_QueryViewContent");
                    $("#" + id + "_QueryView").draggable({
                        containment: "document",
                        handle: ".hoteam-localsearch-title"
                    });
                    this.initHandler(opt);
                    this.initControlData(opt, container);
                    this.initCondition(container);
                    this.initConnect(container);
                    this.initResult(opt, container);
                    this.eventBind(opt, container);
                    container.find(".subduct").hide();
                } else {
                    searchObj.show();
                }
                //设置值
                //if (opt.feildData && opt.feildData.length > 0) {
                //    //debugger;
                //    for (var i = 0, len = opt.feildData.length - 1; i < len; i++) {
                //        container.find(".localSearch-container-row:first .add").click();
                //    }

                //    container.find(".localSearch-container-row").each(function (i) {
                //        var filter = opt.feildData[i],
                //            row = $(this);
                //        var fildSelect = row.find(">.field>select");
                //        fildSelect.val(filter.field);
                //        $.QueryView.fieldSelectOnChange(fildSelect);
                //        row.find(">.condition>select").val(filter.condition);
                //        row.find(">.result input").val(filter.result);
                //        row.find(">.connect>select").val(filter.concat);
                //    });

                //}
                setTimeout(function () {
                    $("#viewName")[0].focus();
                }, 800);
            },
            //edit: function (opt) {
            //    var height = $(window).height() + "px";
            //    var width = $(window).width() + "px";
            //    var id = opt.id;
            //    if (HoteamUI.Common.IsNullOrEmpty(opt.hideTitle)) {
            //        $("body").append('<div class="hoteam-grid-overlay" style="z-index:8;height:' + height + ';width:' + width + '"></div>');
            //    }
            //    //判断是否已经有了弹框元素
            //    var searchObj = $("#" + id + "_QueryView");
            //},
            eventBind: function (opt, container) {
                var that = this;
                function addEvent(btn) {
                    var row = $(btn).closest(".localSearch-container-row");
                    var fieldVal = row.find(".field-select").val();
                    var conditionVal = row.find(".condition-select").val();
                    var connectVal = row.find(".connect-select").val();
                    var clone = $(row).clone();
                    $(clone).find(".field-select").val(fieldVal);
                    $(clone).find(".condition-select").val(conditionVal);
                    $(clone).find(".connect-select").val(connectVal);
                    clone.find(".result").attr("id", HoteamUI.UIManager.NewGUID()).data("opt", opt);
                    $(clone).insertAfter($(row));
                    that.eventBind(opt, clone);
                    $(clone).find(".field-select")[0].onchange();
                };
                function remove(btn) {
                    var row = $(btn).closest(".localSearch-container-row");
                    //20619 李金岳
                    if (row.find("[controltype='DropDown']").length>0) {
                        var id = row.find("[controltype='DropDown']")[0].id;
                        if (id) {
                            HoteamUI.Control.Instance(id).Dispose();
                        }     
                    } 
                    row.remove();
                };
                var add = container.find(".add");
                var subduct = container.find(".subduct").show();
                add.on("click", function () {
                    addEvent(this);
                })
                subduct.on("click", function () {
                    remove(this);
                })
            },
            initCondition: function (container) {
                var condition = container.find(".condition-select");
                condition.children().remove();
                condition.append("<option value='Equal'>" + HoteamUI.Language.Lang("LocalSearch", "Equal") + "</option>");
                condition.append("<option value='NotEqual'>" + HoteamUI.Language.Lang("LocalSearch", "NotEqual") + "</option>");
                condition.append("<option value='LeftContain'>" + HoteamUI.Language.Lang("LocalSearch", "LeftContain") + "</option>");
                condition.append("<option value='RightContain'>" + HoteamUI.Language.Lang("LocalSearch", "RightContain") + "</option>");
                condition.append("<option value='Contain'>" + HoteamUI.Language.Lang("LocalSearch", "Contain") + "</option>");
                condition.append("<option value='GreaterThan'>" + HoteamUI.Language.Lang("LocalSearch", "GreaterThan") + "</option>");
                condition.append("<option value='GreaterEqualThan'>" + HoteamUI.Language.Lang("LocalSearch", "GreaterEqualThan") + "</option>");
                condition.append("<option value='LessThan'>" + HoteamUI.Language.Lang("LocalSearch", "LessThan") + "</option>");
                condition.append("<option value='LessEqualThan'>" + HoteamUI.Language.Lang("LocalSearch", "LessEqualThan") + "</option>");
            },
            initHandler: function (opt) {
                var that = this;
                var id = "#" + opt.id + "_QueryView";
                var container = $(id);
                var close = container.find(".b-dialog-close");
                close.on("click", function () {
                    $("[controltype]", id).each(function () {
                        HoteamUI.Control.Instance(this.id).Dispose();
                    });
                    container.remove();
                    $(".hoteam-grid-overlay").remove();
                })
                var search = container.find(".localquery");
                search.css({
                    left: "0px"
                });
                search.on("click", function () {
                    //TODO:查询获取数据
                    var result = that.searchFilter(container, opt);
                    close.click();
                    if (typeof opt.searchcallback == "function") {
                        opt.searchcallback(result);
                    }
                });
                var cancel = container.find(".localcancel");
                $(cancel).on("click", function () {
                    $("[controltype]", id).each(function () {
                        HoteamUI.Control.Instance(this.id).Dispose();
                    });
                    container.remove();
                    $(".hoteam-grid-overlay").remove();
                });
                //TODO:保存视图
                var save = container.find(".localsave");
                save.css({
                    left: "-100px", width: "100px"
                });
                $(save).on("click", function () {
                    that.saveView(container, opt);
                })
            },
            initControlData: function (opt, container) {
                var fieldDom = container.find(".field-select");
                if (opt.data && opt.data.length > 0) {
                    //初始化字段下拉框
                    fieldDom.children().remove();
                    var fieldDom = container.find(".field-select");
                    for (var i = 0, len = opt.data.length; i < len; i++) {
                        fieldDom.append("<option value='" + opt.data[i].ColumnName + "'>" + opt.data[i].ColumnText + "</option>");
                    }
                    //初始化条件下拉框
                    var condition = container.find(".condition-select");

                }
            },
            initConnect: function (container) {
                var connect = container.find(".connect-select");
                connect.children().remove();
                connect.append("<option value='And'>" + HoteamUI.Language.Lang("LocalSearch", "And") + "</option>");
                connect.append("<option value='Or'>" + HoteamUI.Language.Lang("LocalSearch", "Or") + "</option>");
            },
            initResult: function (opt, container) {
                var info = opt.data[0];
                var result = container.find(".result").data("opt", opt).attr("pagepagename", info.PageConfig.Name);
                var pageConfig = info.PageConfig;
                //result.height((info.ContainerHeight || 40) + "px");
                HoteamUI.UIManager.ShowPage(result.attr("id"), pageConfig);
                var script = $("<script>" + info.PageHandleScript + "</script>")
                $(result).append(script);
            },
            fieldSelectOnChange: function (obj) {
                var name = $(obj).val();
                var result = $(obj).closest(".localSearch-container-row").find(".result").empty();
                var opt = result.data("opt");
                var info;
                for (var i = 0, len = opt.data.length; i < len; i++) {
                    if (opt.data[i].ColumnName == name) {
                        info = opt.data[i];
                        break;
                    }
                }
                var pageConfig = info.PageConfig;
                result.attr("pagepagename", pageConfig.Name);
                var script = $("<script>" + info.PageHandleScript + "</script>");
                $(result).append(script);
                HoteamUI.UIManager.ShowPage(result.attr("id"), pageConfig);

            },
            searchFilter: function (container, opt) {
                var rows = container.find(".localSearch-container-row");
                var sql;
                var arr = [], filters = [];
                var combine = false;
                if (opt && opt.data && opt.data.length > 0) {
                    combine = opt.data[0].IsCombineColumn;
                }
                $.each(rows, function (i, e) {
                    var row = $(e);
                    var filter = {
                    };
                    filter.Field = row.find('.field-select').val();
                    filter.Condition = row.find('.condition-select').val();
                    var resultDom = row.find(".result");
                    var ctrlId = resultDom.attr("id");
                    var pagename = resultDom.attr("pagepagename");
                    var functionName = ["HoteamUI_PageEvent_", pagename, "OnGetData"].join("").replace(/-/g, "");
                    var pageEvent = {
                    };
                    pageEvent.o = HoteamUI.Page.Instance(ctrlId);
                    var result = HoteamUI.Common.ExeFunction(functionName, pageEvent);
                    if (result && typeof (result[filter.Field]) === "boolean") {
                        result[filter.Field] = result[filter.Field] == true ? "1" : "0";
                    }
                    if (combine) {
                        var typeColumn = filter.Field.split(".");
                        if (typeColumn.length == 2) {
                            result[filter.Field] = result[typeColumn[1]];
                        }
                    }
                    filter.Result = result;
                    filter.Link = row.find('.connect-select').val();
                    arr.push(filter);
                    if (filter.Link == "Or") {
                        filters.push(arr);
                        arr = [];
                    } else if (i == rows.length - 1) {
                        filters.push(arr);
                    }
                })
                if (filters && filters.length > 0) {
                    var sentenceList = [];
                    for (var i = 0, len = filters.length; i < len; i++) {
                        var sentence = [];
                        for (var j = 0, _len = filters[i].length; j < _len; j++) {
                            var filter = filters[i][j];
                            sentence.push(this.convertOperation(filter));
                        }

                        var sentenseStr = " ( " + sentence.join(" AND ") + " ) ";
                        sentenceList.push(sentenseStr);
                    }
                    sql = " ( " + sentenceList.join(" OR ") + " ) ";
                }
                return sql;
            },
            convertOperation: function (filter) {
                var ret = [];
                var field = filter.Field;
                var result = filter.Result[field];
                if (isNaN(result)) {
                    result = result.replace(/'/g, "''").replace(/"/g, "\\\"");
                    result = HoteamUI.Common.HtmlEscape(result);
                }
                switch (filter.Condition) {
                    case "Equal":
                        ret = [field, "=N'", result, "'"];
                        break;
                    case "NotEqual":
                        ret = [field, "!=N'", result, "'"];
                        break;
                    case "LeftContain":
                        ret = [field, " like N'", result, "%'"];
                        break;
                    case "RightContain":
                        ret = [field, " like N'%", result, "'"];
                        break;
                    case "Contain":
                        ret = [field, " like N'%", result, "%'"];
                        break;
                    case "GreaterThan":
                        ret = [field, " > N'", result, "'"];
                        break;
                    case "GreaterEqualThan":
                        ret = [field, " >= N'", result, "'"];
                        break;
                    case "LessThan":
                        ret = [field, " < N'", result, "'"];
                        break;
                    case "LessEqualThan":
                        ret = [field, " <= N'", result, "'"];
                        break;
                }
                return ret.join("");
            },
            saveView: function (container, opt) {
                var that = this;
                var callback = function (data, ret) {
                    if (ret && ret.confirm == "OK") {
                        var obj = {
                        };
                        obj.Name = $("#viewName").val();
                        if (HoteamUI.Common.IsNullOrEmpty(obj.Name)) {
                            HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("QueryView.NameEmpty"));
                            return;
                        }
                        obj.Name = HoteamUI.Common.HtmlEscape(obj.Name);
                        obj.queryString = that.searchFilter(container, opt);
                        if (HoteamUI.Common.IsNullOrEmpty(obj.queryString)) {
                            HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("QueryView.QueryEmpty"));
                            return;
                        }
                        var ename = (opt.pagePara && opt.pagePara.Url) ? opt.pagePara.Url.join(";") : "";
                        var value = HoteamUI.Common.GetPersonalSettingObject(ename);
                        var settingArr = [];;
                        if (value) {
                            obj.ObjectID = value.ObjectID;
                            var data = JSON.parse(value.SETTINGVALUE);
                            if (opt.canRepeat) {
                                for (var i = 0, len = data.length; i < len; i++) {
                                    if (data[i].Name == obj.Name) {
                                        var info = HoteamUI.Language.Lang("QueryView.ViewHasExist");
                                        info = info.replace("[VIEWNAME]", obj.Name);
                                        HoteamUI.UIManager.noty({
                                            timeout: 3000, text: info, type: 'success', layout: 'topCenter'
                                        });
                                        return;
                                    }
                                }
                            }
                            data.push(obj);
                            settingArr = data;
                        } else {
                            settingArr.push(obj)
                        }
                        var settingValue = JSON.stringify(settingArr);
                        HoteamUI.Common.SavePersonalSetting("CustomView", ename, settingValue);

                        var menuCtrl = HoteamUI.Control.Instance(opt.pagePara.MenuGuid);
                        if (menuCtrl) {
                            var newData = [];
                            var listData = InforCenter_Platform_GetMenuDropDownData(opt.pagePara.WebAtionName);
                            var selectValue = '';
                            if (listData) {
                                for (var i = 0, len = listData.DropDownDataItemList.length; i < len; i++) {
                                    var info = listData.DropDownDataItemList[i];
                                    var obj = {
                                        text: info.Name && info.Name.indexOf(".") > 0 ? HoteamUI.Language.Lang(info.Name) : info.Name,
                                        value: info.Value,
                                        custom: false
                                    };
                                    if (info.hasOwnProperty("IsSelect")) {
                                        obj.Selected = info.IsSelect;
                                        if (info.IsSelect) {
                                            selectValue = info.Value;
                                        }
                                    }
                                    newData.push(obj);
                                }
                            }
                            var custom = { text: HoteamUI.Language.Lang("QueryView.Custom"), value: "Custom", custom: true, Selected: false };
                            newData.push(custom);
                            for (var i = 0, len = settingArr.length; i < len; i++) {
                                var obj = {
                                    text: settingArr[i].Name,
                                    value: settingArr[i].queryString,
                                    custom: false,
                                    Selected: false,
                                    ObjectID: settingArr[i].ObjectID,
                                    canRemove: true
                                }
                                newData.push(obj);
                            }
                            menuCtrl.ReloadSelectData(opt.pagePara.WebAtionName, newData);
                        }
                    }
                }
                HoteamUI.UIManager.Popup({
                    pagename: "Confirm", paras: { pageMode: "OkCancel", message: HoteamUI.Language.Lang("QueryView", "Save") }, callback: callback
                });

            },
            getFilterBySql: function (sqlFilter) {
                var filterAnd = [],
                    filterOr = [],
                    temp,
                    itemForOr,
                    itemForAnd,
                    filter = [],
                    filterItem,
                    filterArray,
                    parseSql = function (sql) {
                        var filterItem,
                            condition,
                            temp;

                        temp = sql.split(/=|!=|like|>|>=|<|<=/);

                        filterItem = {
                            field: temp[0],
                            condition: "",
                            result: temp[temp.length - 1],
                            concat: "AND"
                        };

                        condition = sql.replace(filterItem.field, "").replace(filterItem.result, "");

                        filterItem.condition = condition;
                        filterItem.result = $.trim(filterItem.result).slice(2, -1);
                        filterItem.field = $.trim(filterItem.field);

                        switch (filterItem.condition) {
                            case "=":
                                filterItem.condition = "Equal";
                                break;
                            case "!=":
                                filterItem.condition = "NotEqual";
                                break;
                            case ">":
                                filterItem.condition = "GreaterThan";
                                break;
                            case ">=":
                                filterItem.condition = "GreaterEqualThan";
                                break;
                            case "<":
                                filterItem.condition = "LessThan";
                                break;
                            case "<=":
                                filterItem.condition = "LessEqualThan";
                                break;
                            case "like":
                                var result = filterItem.result;
                                var len = result.length,
                                    leftChar = result.slice(0, 1),
                                    rightChar = result.slice(len - 1, len);

                                if (leftChar === "%" && rightChar === "%") {
                                    filterItem.condition = "Contain";
                                    filterItem.result = result.slice(1, -1);
                                }
                                else if (leftChar !== "%" && rightChar === "%") {
                                    filterItem.condition = "LeftContain";
                                    filterItem.result = result.slice(0, -1);
                                }
                                else if (leftChar === "%" && rightChar !== "%") {
                                    filterItem.condition = "RightContain";
                                    filterItem.result = result.slice(1, len);
                                }
                                break;
                        }

                        return filterItem;
                    }

                if (sqlFilter) {
                    //去除括号
                    sqlFilter = sqlFilter.slice(1, -1);
                    //解析OR的分组
                    filterArray = sqlFilter.split(" OR ");
                    if (filterArray.length > 0) {
                        for (var i = 0, len = filterArray.length; i < len; i++) {
                            temp = filterArray[i];
                            if (temp.indexOf("(") === 0) {
                                filterArray[i] = temp.slice(1, -1);
                            }
                        }
                    }
                    //解析条件
                    filterOr = filterArray;
                    for (var i = 0, len = filterOr.length; i < len; i++) {
                        //解析AND的分组
                        itemForOr = filterOr[i];
                        filterAnd = itemForOr.split(" AND ");
                        if (filterAnd && filterAnd.length > 0) {
                            for (var j = 0, lenJ = filterAnd.length; j < lenJ; j++) {
                                itemForAnd = filterAnd[j];

                                filterItem = parseSql(itemForAnd);

                                if (j === lenJ - 1 && lenJ > 1) {
                                    filterItem.concat = "OR";
                                }

                                filter.push(filterItem);
                            }
                        }
                    }
                }
                return filter;
            }

        }
    })(jQuery)
}
(function (factory) {
    factory(jQuery);
}(function ($) {
    $.hgrid = $.hgrid || {};
    //公用方法
    $.extend($.hgrid, {
        //将$.hgrid的方法合并到jquery对象中
        extend: function (methods) {
            $.extend($.fn.htGrid, methods);
        },
        //获取方法名为name的function
        getMethod: function (name) {
            return $.fn.htGrid[name];
        },
        //处理option，将colModel变成modelObj对象，并和默认的colModel合并
        formatopt: function (opt) {
            if (opt.treeNode) {
                opt.multiselect = false;//如果是树列表，则肯定没有行前面的checkbox，取而代之的是节点后面的checkbox
                if (!opt.check) {//没有树节点checkbox
                    opt.rowrejection = true;
                    opt.rowLinkCheck = false;
                    opt.checkType = false;
                }
            }
            opt.modelObj = {};
            $(opt.colModel).each(function (i) {
                opt.colModel[i] = $.extend({}, $.hgrid.colModel, opt.colModel[i]);
                opt.modelObj[opt.colModel[i].name] = opt.colModel[i];
            });
            //合并普通（text）编辑类型
            $.extend(opt.editOption, {
                text: {
                    custom_element: function (value, model) {
                        var me = this;
                        var input = $("<input type='text' class='htgrid-edit-input' style='width:100%'/>");
                        input.val(value.ColText).on("keydown", function (event) {
                            if (event.keyCode == 9) {
                                var td = $(this).closest("td"),
                                    rowNum = td.parent().index();
                                var cell = me.htGrid("getNextEditCell", rowNum, td.attr("data-name"));
                                if (cell) {
                                    me.htGrid("setCellEdit", cell.rowNum, cell.colName);
                                }
                                return false;
                            }
                        });
                        return input;
                    },
                    custom_value: function (ele, value) {
                        var obj = {};
                        obj.ColText = ele.val();
                        return obj;
                    }
                }
            });
        },
        //根据不同类型排序对象数组
        sortData: function (type, colName, sortType, data) {
            //排序类型分为字符串(text)排序和数字(number)排序
            if (type = "text") {
                data.sort(function (a, b) {
                    if (sortType == "asc") {//升序
                        return a.cellattr[colName].ColText < b.cellattr[colName].ColText ? -1 : 1;
                    } else if (sortType == "desc") {
                        return a.cellattr[colName].ColText < b.cellattr[colName].ColText ? 1 : -1;
                    }
                });
            } else if (type == "number") {
                data.sort(function (a, b) {
                    if (sortType == "asc") {//升序
                        return parseInt(a.cellattr[colName].ColText) - parseInt(b.cellattr[colName].ColText);
                    } else if (sortType == "desc") {
                        return parseInt(b.cellattr[colName].ColText) - parseInt(a.cellattr[colName].ColText);
                    }
                });
            }
        },
        //替换拼接html中的特殊字符串
        escapeHtml: function (str) {
            var entityMap = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                "'": "&#39;",
                '"': '&quot;',
                "/": '&#x2F;'
            };
            return String(str).replace(/[&<>"'\/]/g, function (s) {
                return entityMap[s];
            });
        },
        //数组去重
        removeRepeat: function (arr) {
            for (var i = arr.length - 1; i >= 0; i--) {
                if (arr[i] == arr[i - 1]) {
                    arr.splice(i, 1);
                }
            }
        },
        //默认参数
        "defaultsOption": {
            id: null,
            describe: null,
            hheight: 24, //列表头tr高度
            bheight: 24, //bodytr高度
            showPageBar: true, //是否显示分页按钮及下拉
            showListTail: true,//是否显示列表尾部部分区域
            multiselect: true, //是否有checkbox选项
            multiselectWidth: 26, //checkbox td的宽度
            currentpage: 1, //分页的当前页
            sortorder: "asc", //排序方式
            sortname: "", //排序列名称
            rownumbers: true, //是否显示行号
            colNames: [], //列名称格式：["","",""],内部为列名
            colModel: [], //列属性格式：[{name:"",frozen:"",width:""......},{name:"",frozen:"",width:""......}]
            rowList: [50, 100, 200], //分页下拉内容
            rowNum: 50, //每页数据数量
            records: 0, //总数
            data: [], //列表中加载的数据
            removeData: [],//编辑列表删除的数据
            treeNode: "",//树列表的节点列名称
            check: false,////节点位置是否有checkbox
            checkType: false, //节点的checkbox选中是否级联
            rowLinkCheck: true, //行点击选中时是否同时选中节点的checkbox
            dblClickSelect: true,//默认双击选中
            cellEdit: false, //是否启用了编辑功能
            onSort: null, //当点击列表头进行排序时触发事件
            rowrejection: false,//当行点击时是否行互斥
            onPageChange: null, //当分页改变触发事件
            onRowClick: null, //当行点击时事件
            onTreeNodeImageClick: null,
            OnCheckboxClick: null,
            onCellClick: null, //单元格点击事件
            onRowdblClick: null, //当行双击时事件
            onLoadSuccess: null, //当数据加载结束后事件
            onBeforeEdit: null,//编辑前事件
            onAfterEdit: null, //编辑后事件（由编辑状态转换为查看状态时调用的方法）
            onAfterOpenNode: null,//树列表节点展开事件
            onLoadMore: null,//加载更多点击事件
            defaultAlign: "left",
            loadMore: false, //是否有加载更多的功能(分页功能必须是关闭的即showPageBar==false)
            loadMoreText: '加载更多', //加载更多的提示文字
            noMore: '没有更多了。。。',//配合加载更多使用，如果已经加载所有，则显示此文字
            zebraList: true,//隔行换色
            hoverLight: true,
            border: false,
            isRecordSelectedRow: false,
            isSelectCheckbox: true//点击行默认选中checkbox
        },
        //列属性默认
        colModel: {
            sortable: true, //是否支持列排序
            sortType: "text", //默认按照字符串排序
            resizable: true, //是否支持列宽拖动
            width: null, //列宽设置
            showTitle: true,//是否显示title
            rowSpan: false, //是否行合并
            backgroundColor: "", //列颜色
            hidden: false, //列是否隐藏
            frozen: false //是否是冻结列
        },
        //重置行号
        resetNum: function (id) {
            var me = $("#" + id);
            var opt = me[0].p;
            var body = $("#" + id + "_body");
            var fbody = $("#" + id + "_fbody");
            var trs = body.find("tr.htgrid-tr");
            var ftrs = fbody.find("tr.htgrid-tr");
            var startRowNum = (opt.currentpage - 1) * opt.rowNum + 1,
                fstartRowNum = (opt.currentpage - 1) * opt.rowNum + 1;
            if (opt.loadMore) {
                startRowNum = 1;
                fstartRowNum = 1;
            }
            $(trs).each(function (i) {
                $(this).find("td[rownum='rownum']").html(startRowNum++).attr("title", startRowNum - 1);
                if ((startRowNum % 2) != 0) {
                    $(this).addClass("htgrid-tr-old");
                } else {
                    $(this).removeClass("htgrid-tr-old");
                }
            });
            $(ftrs).each(function (i) {
                $(this).find("td[rownum='rownum']").html(fstartRowNum++).attr("title", fstartRowNum - 1);
                if ((fstartRowNum % 2) != 0) {
                    $(this).addClass("htgrid-tr-old");
                } else {
                    $(this).removeClass("htgrid-tr-old");
                }
            });
            //判断列表滚动条状态是否发生了变化，如果发生了，则需要重新计算宽度
            var scroll = body.attr("scroll");
            var currentScroll = (body.height() + body.next().height()) > body.parent().height() ? "scroll" : "";
            if (currentScroll != scroll) {
                body.attr("scroll", currentScroll);
                me.htGrid("resize", true, false);
            }
        },
        //重置内存中数据的行号
        resetDataNum: function (id, startNumber) {
            var opt = $("#" + id)[0].p;
            var data = opt.data;
            $.each(data, function (i) {
                data[i].cellattr.row_number = (startNumber || 0) + i + 1;
            });
        },
        getTR: function (opt, obj, i, rowNum, frozenColumns, trHeight) {
            var modelObj = opt.modelObj,
                trattr = obj.rowattr,
                cellattr = obj.cellattr,
                trbackgroundColor = trattr.BackgroundColor ? trattr.BackgroundColor : "",
                trFontSize = trattr.FontSize ? "font-size:" + trattr.FontSize + "px;" : "",
                trFontWeight = trattr.FontWeight ? "font-weight:" + trattr.FontWeight + ";" : "",
                trDisplay = trattr.hidden ? "display:none;" : "",
                trClass = i % 2 == 0 ? "" : "htgrid-tr-old";
            var btr = '<tr class="htgrid-tr ' + trClass + '" style="' + trDisplay + 'height:' + (trHeight ? trHeight : opt.bheight) + 'px;' + 'line-height:' + ((trHeight ? trHeight : opt.bheight)-2) + 'px;' + trFontSize + trFontWeight + '">';
            //定义行号td
            var rownumtd = opt.rownumbers ?
                '<td title="' + rowNum + '" class="htgrid-row-td htgrid-row-pretd" nowidth="N" rownum="rownum" style="background-color:' + trbackgroundColor + ';">' + rowNum + '</td>' :
                '<td class="htgrid-row-td" rownum="rownum" style="display:none;">' + rowNum + '</td>';
            //定义checkboxtd
            var rowcheck = opt.multiselect ?
                '<td class="htgrid-row-td htgrid-row-pretd" style="background-color:' + trbackgroundColor + ';">' +
                '<span class="htgrid-row-check htgrid-check-false"></span>' +
                '</td>' :
                '<td class="htgrid-row-td" style="display:none;">' +
                '<span class="htgrid-row-check htgrid-check-false"></span>' +
                '</td>';
            btr += rownumtd;
            btr += rowcheck;
            $(opt.colModel).each(function (i) {
                var col = opt.colModel[i],
                    name = col.name;
                if (!cellattr[name]) cellattr[name] = {};
                var value = cellattr[name],
                    align = col.align ? col.align : opt.defaultAlign,
                    backgroundColor = value.BackgroundColor ? value.BackgroundColor : (col.backgroundColor ? col.backgroundColor : ""),
                    color = value.Color || '';
                if (!backgroundColor) {
                    backgroundColor = trbackgroundColor;
                }

                if (value.ColText == undefined || value.ColText == null) value.ColText = '';
                if (value.ColValue == undefined || value.ColText == null) value.ColValue = '';
                if (frozenColumns && HoteamUI.ArrayIndexOf(frozenColumns, name) < 0) return;
                if (!(col.hidden || col.width === 0)) {//如果不是隐藏列
                    var content = $.hgrid.getFormatTd(opt, name, value);
                    var title = modelObj[name].showTitle == false ? "" : "title='" + ($.hgrid.escapeHtml(value.ColText) || "") + "'";
                    btr += '<td ' + title + ' data-name="' + $.hgrid.escapeHtml(name) + '" style="text-align:' + align + ';background-color:' + backgroundColor + ';color:' + color + '">' +
                        content +
                        '</td>';
                }
                value.OldColText = value.ColText;
                value.OldColValue = value.ColValue;
            });
            if (frozenColumns) {
                btr += '</tr>';
            } else {
                btr += '<td class="htgrid-row-lasttd"></td></tr>';
            }
            return btr;
        },
        getFormatTd: function (opt, name, value) {
            var modelObj = opt.modelObj;
            var nodeDiv = '';
            if (name == opt.treeNode) {//如果是树节点列
                //创建树节点的html
                var level = value.level,
                    span = '<span class="htgrid-treeNode-space" style="width:' + (value.level * 16) + "px" + '"></span>',
                    nodeImg = '<span class="htgrid-treeNode-img basesprite htgrid-teeeNode-' + (value.treeNodeState || "hidden") + '"></span>',
                    checkboxImg = '',
                    images = '', icons = value.Icons;
                if (opt.check) { //如果有节点checkbox
                    checkboxImg = '<span class="htgrid-treeNode-checkbox-container">';
                    if (value.checked == true) {
                        checkboxImg += '<span class="htgrid-treeNode-checkbox htgrid-check-true" checked="checked"/></span>';
                    }
                    else {
                        checkboxImg += '<span class="htgrid-treeNode-checkbox htgrid-check-false"/></span>';
                    }
                }
                if (icons && icons.length > 0) {//如果节点列还存在图片
                    for (var i = 0; i < icons.length; i++) {
                        var icon = icons[i].Icon,
                            iconTitle = icons[i].Title,
                            iconStyle = '', iconClass = '';
                        if (icon.indexOf("~") == 0) {//路径
                            //26082 李金岳
                            iconStyle = 'style="background:url(' + icon.replace("~", PageInit.WebRootPath) + ') center no-repeat;background-size: 100% 100%"';
                        } else {//雪碧图
                            iconClass = HoteamUI.Common.GetImage(icon, 16);
                        }
                        images += '<span title="' + iconTitle + '" class="htgrid-treeNode-aimg basesprite ' + iconClass + '" ' + iconStyle + '></span>';
                    }
                }
                nodeDiv = '<div class="htgrid-node-td">' + span + nodeImg + checkboxImg + images + '</div>';
            }
            var regexDiv = '';
            if (value.regexStatus == false) {
                var retitle = ""; //验证提示信息
                if (value.Regex != null) {//如果单元格有校验格式数据
                    retitle = value.RegexTitle;
                } else if (modelObj[name].regex) {//如果列上有校验格式数据
                    retitle = modelObj[name].regexTitle || "";
                }
                retitle = retitle.replace(/<\/br>/g, '\r\n').replace(/<br\/>/g, '\r\n');
                regexDiv = '<span title="' + retitle + '" style="display:inline-block;" class="htgrid-edit-error basesprite b-warn"></span>';
            }
            if (value.ColText == undefined || value.ColText == null) {
                value.ColText = '';
            }
            if (value.ColValue == undefined || value.ColText == null) {
                value.ColValue = '';
            }
            var tdHtml = '';
            if (regexDiv || value.editType) {
                tdHtml += '<div class="htgrid-td-changed">';
            }
            if (modelObj[name].colType === "checkbox") {
                tdHtml = tdHtml.replace("htgrid-td-changed", "htgrid-td-changed htgrid-td-changed-checkbox");
            }
            tdHtml = tdHtml + nodeDiv +
                (modelObj[name].formatter ? modelObj[name].formatter(value, modelObj[name]) : ($.hgrid.escapeHtml(value.ColText) || '&nbsp;')) +
                regexDiv +
                (value.editType ? '<span class="htgrid-td-editing" style="' + ($.browser.msie && $.browser.version == "8.0" ? "top:1px;" : "") + '"></span>' : '');
            if (regexDiv || value.editType) {
                tdHtml += '</div">';
            }
            return tdHtml;
        },
        //处理行状态
        setTrStatus: function (tr, checkbox, flag, opt) {
            if (flag) {//要置成选中状态
                checkbox.attr("checked", "checked").addClass("htgrid-check-true").removeClass("htgrid-check-false");
                if (tr.length > 0) {
                    tr.addClass("htgrid-row-select");
                }
            } else {
                checkbox.removeAttr("checked").addClass("htgrid-check-false").removeClass("htgrid-check-true");
                if (tr.length > 0) {
                    tr.removeClass("htgrid-row-select");
                }
            }
            //记录选中的行
            $.hgrid.recordSelectedRow(tr, flag, opt);
        },
        //记录全部选择的行
        recordSelectedRow: function (tr, checked, opt) {
            var data = opt.data,
                row,
                key = opt.id,
                selected,
                cancelSelected;

            if (!opt.isRecordSelectedRow || !key) {
                return;
            }
            if (!opt.recordRows) {
                opt.recordRows = {
                    selected: {},
                    cancelSelected: {}
                };
            }

            selected = opt.recordRows.selected;
            cancelSelected = opt.recordRows.cancelSelected;
            $.each(tr, function (i) {
                var index, row, id;
                index = $(this).index();
                row = data[index - 1].cellattr;
                id = row[key].ColText;
                if (checked) {
                    selected[id] = row;
                    if (cancelSelected[id]) {
                        delete cancelSelected[id];
                    }
                }
                else {
                    cancelSelected[id] = row;
                    if (selected[id]) {
                        delete selected[id];
                    }
                }
            });
        },
        //获取全部选择的行
        getRecordRows: function (opt) {
            var recordRows = opt.recordRows,
                selected = [],
                cancelSelected = [],
                i,
                row;

            if (!opt.isRecordSelectedRow || !opt.id) {
                return null;
            }

            for (i in recordRows.selected) {
                row = recordRows.selected[i];
                selected.push(row);
            }

            for (i in recordRows.cancelSelected) {
                row = recordRows.cancelSelected[i];
                cancelSelected.push(row);
            }

            return {
                selected: selected,
                cancelSelected: cancelSelected
            }
        },
        //设置树节点状态
        setCheckStatus: function (tr, check, flag) {
            if (flag) {//置为选中
                check.attr("checked", "checked").addClass("htgrid-check-true").removeClass("htgrid-check-false");
                if (tr.length > 0) {
                    tr.find(".htgrid-treeNode-checkbox").attr("checked", "checked").addClass("htgrid-check-true").removeClass("htgrid-check-false");
                }
            } else {
                check.removeAttr("checked").addClass("htgrid-check-false").removeClass("htgrid-check-true");
                if (tr.length > 0) {
                    tr.find(".htgrid-treeNode-checkbox").removeAttr("checked").addClass("htgrid-check-false").removeClass("htgrid-check-true");
                }
            }
        },
        //获取冻结列，返回数组
        getFrozenColumns: function (colModel) {
            var frozenColumns = [];
            $.each(colModel, function (i) {
                if (colModel[i].frozen && !(colModel[i].width === 0 || colModel[i].hidden)) {
                    frozenColumns.push(colModel[i].name);
                } else {
                    return;
                }
            });
            return frozenColumns;
        },
        //关闭所有下级节点
        closeChildNodes: function (table, index, data, treeNode) {
            var currentNode = data[index].cellattr[treeNode],
                level = currentNode.level,
                rowNumArr = [];
            currentNode.treeNodeState = "close";
            for (var i = index + 1; i < data.length; i++) {
                var childNode = data[i].cellattr[treeNode];
                if (childNode.level > level) {
                    if (childNode.hidden != true) {
                        childNode.hidden = true;
                        rowNumArr.push(i + 1);
                    }
                } else {
                    break;
                }
            }
            //隐藏rowNumArr记录的所有节点行
            table.htGrid("hideTrs", rowNumArr);
        },
        //打开应该展开的下级节点
        openChildNodes: function (table, index, data, treeNode) {
            var rowNumArr = [];
            function openChildNodes(index, data, treeNode, rowNumArr) {
                var currentNode = data[index].cellattr[treeNode],
                    level = currentNode.level;
                currentNode.treeNodeState = "open";
                index++;
                for (index; index < data.length; index++) {
                    var childNode = data[index].cellattr[treeNode];
                    if (childNode.level == level + 1) {
                        childNode.hidden = false;
                        rowNumArr.push(index + 1);
                        //判断当前节点是否是展开状态，如果当前节点仍旧是展开状态，则需把它的直属子级也展开
                        var treeState = childNode.treeNodeState;
                        if (treeState == "open") {
                            openChildNodes(index, data, treeNode, rowNumArr);
                        }
                    } else if (childNode.level == level) {
                        break;
                    }
                }
            }
            openChildNodes(index, data, treeNode, rowNumArr);
            //隐藏rowNumArr记录的所有节点行
            table.htGrid("showTrs", rowNumArr);
        },
        //处理下级选中及父级选中
        setStatus: function (tr, ftr, opt, flag) {
            var index = tr.index(),
                data = opt.data,
                treeNode = opt.treeNode,
                cellattr = data[index - 1].cellattr[treeNode],
                nextTr = tr,
                nextFTr = ftr,
                parentTr, parentFTr, tbody, ftbody;
            //查找到所有的子级并处理选中效果
            for (var i = index; i < data.length; i++) {
                var obj = data[i].cellattr[treeNode];
                if (obj.level > cellattr.level) {
                    nextTr = nextTr.next();
                    $.hgrid.setTrStatus(nextTr, nextTr.find("span.htgrid-row-check"), flag, opt);
                    if (ftr) {
                        nextFTr = ftr.next();
                        $.hgrid.setTrStatus(nextFTr, nextFTr.find("span.htgrid-row-check"), flag, opt);
                    }
                } else {
                    break;
                }
            }
            if (cellattr.level == 0) return;
            //查找父级节点
            var parentNode, parentNodeIndex,
                parentArr = [],
                m = 1;
            for (var i = index - 2; i >= 0; i--) {
                var obj = data[i].cellattr[treeNode];
                if (obj.level == cellattr.level - m) {
                    if (m == 1) {
                        parentNode = obj;
                        parentNodeIndex = i;
                    } else {
                        parentArr.push({
                            node: obj,
                            index: i
                        });
                    }
                    if (obj.level == 0) {
                        break;
                    }
                    m++;
                }
            }
            tbody = tr.parent();
            parentTr = tbody.children(":eq(" + (parentNodeIndex + 1) + ")");
            if (ftr) {
                ftbody = ftr.parent();
            }
            if (flag) {//如果是选中
                var k = 0;
                setParentNodeStatus(parentNode, parentNodeIndex);
                function setParentNodeStatus(parentNode, parentNodeIndex) {
                    var isAllCheck = true;
                    for (var i = parentNodeIndex + 1; i < data.length; i++) {
                        var obj = data[i].cellattr[treeNode];
                        if (obj.level == parentNode.level + 1) {
                            isAllCheck = tbody.children(":eq(" + (i + 1) + ")").hasClass("htgrid-row-select");
                            if (!isAllCheck) {
                                break;
                            }
                        } else if (obj.level <= parentNode.level) {
                            break;
                        }
                    }
                    if (isAllCheck) {
                        var tr = tbody.children(":eq(" + (parentNodeIndex + 1) + ")");
                        $.hgrid.setTrStatus(tr, tr.find("span.htgrid-row-check"), flag, opt);
                        if (ftbody) {
                            var ftr = ftbody.children(":eq(" + (parentNodeIndex + 1) + ")");
                            $.hgrid.setTrStatus(ftr, ftr.find("span.htgrid-row-check"), flag, opt);
                        }
                        if (parentArr[k]) {
                            var item = parentArr[k++];
                            setParentNodeStatus(item.node, item.index);
                        }
                    }
                }
            } else {//不是选中,直接将父节点置为非选中状态
                $.hgrid.setTrStatus(parentTr, parentTr.find("span.htgrid-row-check"), flag, opt);
                if (ftr) {
                    parentFTr = ftbody.children(":eq(" + (parentNodeIndex + 1) + ")");
                    $.hgrid.setTrStatus(parentFTr, parentFTr.find("span.htgrid-row-check"), flag, opt);
                }
                for (var i = 0; i < parentArr.length; i++) {
                    var item = parentArr[i];
                    var ptr = tbody.children(":eq(" + (item.index + 1) + ")");
                    $.hgrid.setTrStatus(ptr, ptr.find("span.htgrid-row-check"), flag, opt);
                    if (ftr) {
                        pFTr = ftbody.children(":eq(" + (item.index + 1) + ")");
                        $.hgrid.setTrStatus(pFTr, pFTr.find("span.htgrid-row-check"), flag, opt);
                    }
                }
            }
        },
        //获取当前td是否是编辑单元格，如果是，返回td，如果不是，递归获取下一个td是否是
        getEditTd: function (td, modelObj, data, index) {
            var nextTd = td.next();
            if (nextTd.length == 0) {
                var tr = td.parent().next();
                if (tr.length == 0) {
                    return null;
                } else {
                    index++;
                    nextTd = tr.children("td:first");
                }
            }
            var colName = nextTd.attr("data-name");
            if (!colName) {
                nextTd = $.hgrid.getEditTd(nextTd, modelObj, data, index);
            } else {
                if (data[index].cellattr[colName].Editable == false) {
                    nextTd = $.hgrid.getEditTd(nextTd, modelObj, data, index);
                } else {
                    if (data[index].cellattr[colName].Editable == true) {
                        return nextTd;
                    }
                    if (modelObj[colName].editable == false) {
                        nextTd = $.hgrid.getEditTd(nextTd, modelObj, data, index);
                    }
                }
            }
            return nextTd;
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
        },
        //获取表头，表内容的table的隐藏tr及tr模板
        getTemplate: function (opt, ele) {
            if (opt.colNames.length == 0 || opt.colModel.length == 0) {//如果colNames和colModel长度有一个为0
                return [];
            }
            if (opt.colNames.length != opt.colModel.length) {//如果colNames和colModel长度不一致
                return [];
            }
            var parwidth = $(ele).parent().innerWidth(); //获取父元素宽度
            var tdwidth = 0; //定义初始td的总宽度为0
            var htr = '<tr style="height:' + opt.hheight + "px" + '">'; //定义head的tr模板
            var hdtr = '<tr class="trhidden">'; //定义head的隐藏的tr
            var dtr = '<tr class="btrhidden">'; //定义body的隐藏的的tr
            //定义行号td
            var rownumtd = opt.rownumbers ?
                '<td class="htgrid-row-td htgrid-row-pretd" nowidth="N" rownum="rownum"></td>' :
                '<td class="htgrid-row-td" rownum="rownum" style="display:none;"></td>';
            //定义checkboxtd
            var rowcheck = opt.multiselect ?
                '<td class="htgrid-row-td htgrid-row-pretd" style="width:' + opt.multiselectWidth + "px;" + '">' +
                '<span class="htgrid-row-check htgrid-check-false"></span>' +
                '</td>' :
                '<td class="htgrid-row-td" style="display:none;">' +
                '<span class="htgrid-row-check htgrid-check-false"></span>' +
                '</td>';
            //拼接htr
            htr += rownumtd;
            htr += rowcheck;
            //拼接hdtr
            hdtr += rownumtd;
            hdtr += opt.multiselect ?
                '<td nowidth="N" style="width:' + opt.multiselectWidth + "px" + '" class="htgrid-row-td"></td>' :
                '<td nowidth="N" style="display:none;" class="htgrid-row-td"></td>';
            //拼接dtr
            dtr += rownumtd;
            dtr += opt.multiselect ?
                '<td nowidth="N" style="width:' + opt.multiselectWidth + "px" + '" class="htgrid-row-td"></td>' :
                '<td nowidth="N" style="display:none;" class="htgrid-row-td"></td>';
            //增加tdwidth
            tdwidth += parseInt(opt.rownumbers ? 25 : 0); //25为行号td的宽度
            tdwidth += parseInt(opt.multiselect ? opt.multiselectWidth : 0);
            //遍历colModel
            $(opt.colModel).each(function (i) {
                var col = opt.colModel[i];
                var align = col.align ? col.align : "left";
                //列宽拖拽元素
                var reele = col.resizable ? '<span class="htgrid-resize"></span>' : '';
                if (!(col.hidden || col.width === 0)) {//如果不是是隐藏列
                    var sc = col.sortable ? "htgrid-sort" : ""; //定义排序class
                    var title = col.showTitle == false ? "" : "title='" + ($.hgrid.escapeHtml(opt.colNames[i]) || "") + "'";
                    htr += '<td ' + title + ' colname="' + $.hgrid.escapeHtml(col.name) + '" class="' + sc + '" style="text-align:' + "left" + '">' + opt.colNames[i] + reele + '</td>';
                    hdtr += '<td ' + title + ' colname="' + $.hgrid.escapeHtml(col.name) + '" nowidth="' + (col.width !== "" ? "N" : "Y") + '" style="text-align:' + align + ';width:' + (col.width) + "px" + '"></td>';
                    dtr += '<td data-name="' + $.hgrid.escapeHtml(col.name) + '" nowidth="' + (col.width !== "" ? "N" : "Y") + '" style="width:' + (col.width) + "px" + '"></td>';
                    tdwidth += parseInt(col.width || 0);
                }
            });
            htr += '<td class="htgrid-td-lasttd"></td><td style="padding:0px;"></td>'; //列表头预留一个内容td,一个滚动条td
            hdtr += '<td class="htgrid-td-lasttd"></td ><td class="htgrid-td-scroll"></td>'; //列表头预留一个内容td,一个滚动条td
            htr += '</tr>';
            hdtr += '</tr>';
            dtr += '<td class="htgrid-row-lasttd"></td></tr>';
            //拼接结束
            //计算没有定义宽度的列宽
            var $hdtr = $(hdtr);
            var noWidthTd = $hdtr.children('td[nowidth="Y"]');
            var nowidthnum = $hdtr.children('td[nowidth="Y"]').length; //没有定义列宽的td个数
            var decNum = 0;
            if (nowidthnum > 0) {
                var $dtr = $(dtr);
                var lw = parwidth - tdwidth; //父元素宽度减去已知宽度的td的宽度总和=剩余宽度
                var w = lw / nowidthnum;
                w = w < 80 ? 80 : w; //td最小宽度为80
                decNum += (w - parseInt(w)) * nowidthnum;
                w = parseInt(w);
                noWidthTd.css("width", w);
                $(noWidthTd[nowidthnum - 1]).css("width", w + decNum);
                $dtr.children('td[nowidth="Y"]').css("width", w);
                $dtr.children('td[nowidth="Y"]:last').css("width", w + decNum);
                var tw = tdwidth + w * nowidthnum + decNum; //计算body的table的宽度
                //将模板、宽度等返回
                return { htr: htr, dtr: $dtr[0], hdtr: $hdtr[0], width: tw };
            }
            //如果已知td宽度大于父元素宽度，则table宽度为tdwidth - 滚动条宽度，否则为父元素宽度-滚动条宽度
            var tw = tdwidth > parwidth ? tdwidth : parwidth;
            return { htr: htr, dtr: dtr, hdtr: hdtr, width: tw };
        },
        resetSelectedRow: function (id) {
            var container = $("#" + id);
            var opt = container[0].p;
            var body = $("#" + id + "_body");
            var fbody = $("#" + id + "_fbody");
            var head = $("#" + id + "_head");
            var fhead = $("#" + id + "_fhead");
            var trs = body.find("tr.htgrid-tr");
            var ftrs = fbody.find("tr.htgrid-tr");
            $.hgrid.setTrStatus(trs, trs.find("span.htgrid-row-check"), false, opt);
            $.hgrid.setTrStatus(ftrs, ftrs.find("span.htgrid-row-check"), false, opt);
            $.hgrid.setTrStatus([], head.find("span.htgrid-row-check"), false, opt);
            $.hgrid.setTrStatus([], fhead.find("span.htgrid-row-check"), false, opt);
            if (container[0].p.treeNode) {
                container.parent().find(".htgrid-treeNode-checkbox").removeAttr("checked").addClass("htgrid-check-false").removeClass("htgrid-check-true");
            }
        },
        resetSelectedCell: function (id) {
            var body = $("#" + id + "_body");
            var fbody = $("#" + id + "_fbody");
            var tds = body.find("td.htgrid-td-select");
            var ftds = fbody.find("td.htgrid-td-select");
            $.each(tds, function () {
                $(this).removeClass("htgrid-td-select");
            });
            $.each(ftds, function () {
                $(this).removeClass("htgrid-td-select");
            });
        },
        //正则验证表达式
        checkRegExp: function (regex, value, model) {
            //首先判断regex是否是多个AND拼接而成的，如果是，说明是多个正则
            var regexArr = regex.split('AND'),
                flag = true,
                text;

            for (var k = 0; k < regexArr.length; k++) {
                var reg = new RegExp($.trim(regexArr[k]));
                text = $.trim(value.ColText || "");
                if (!reg.test(text)) {//没有验证通过
                    flag = false;
                    break;
                }
            }
            //对datetime时间控件特殊处理
            if (text !== "" && flag && model && model.colType === "datetime" && model.readOnly === false) {
                 flag = moment(text).isValid();
            }

            return flag;
        }
    });
    //初始化方法
    $.fn.htGrid = function (pin) {
        if (typeof pin === 'string') {
            var fn = $.hgrid.getMethod(pin);
            if (!fn) {
                return;
            }
            var args = $.makeArray(arguments).slice(1);
            return fn.apply(this, args);
        }
        return this.each(function () {
            //隐藏table
            $(this).hide();
            //定义变量
            var me = this;

            var opt = $.extend(true, {}, $.hgrid.defaultsOption, pin);
            var par = $(this).parent();
            var id = $(this).attr("id");
            $.hgrid.formatopt(opt); //处理opt的colModel的formatter
            $(this)[0].p = opt; //保存opt到dom元素中
            //创建列表的title（对列表的说明）

            if (opt.zebraList === false) {
                par.addClass('htgrid-zebralist-none');
            }

            if (opt.hoverLight === false) {
                par.addClass('htgrid-hover-light-none');
            }

            if (opt.border === true) {
                par.addClass('htgrid-border-all');
            }

            if (opt.describe) {
                var gridTitle = '<div class="htgrid-title-c" style="height:' + opt.hheight + ';line-height:' + opt.hheight + '">' + opt.describe + '</div>';
                par.append(gridTitle);
            }

            //创建列表的表头head及内容body元素
            var chead = $(
                '<div class="htgrid-head-c">' +
                '<table id="' + id + "_head" + '" cellspacing="0" cellpadding="0" border="0"></table>' +
                '</div>'
            );
            var cbody = $(
                '<div class="htgrid-body-c ' + (opt.bheight === 'auto' ? 'htgrid-body-c-row-auto' : '') + '">' +
                '<table id="' + id + "_body" + '" cellspacing="0" cellpadding="0" border="0"></table>' +
                //((opt.loadMore && opt.showPageBar == false) ?
                ((opt.loadMore) ?
                    '<div class="htgrid-load-more-c" style="height:' + opt.bheight + 'px;line-height:' + opt.bheight + 'px">' +
                    '<span class="htgrid-load-more" style="left:' + (par.width() / 2 - 8) + 'px">' + opt.loadMoreText + '</span>' +
                    '</div>' : '') +
                '</div>'
            );
            par.append(chead);
            par.append(cbody);
            //获取列表头及列表内容的隐藏tr，展示tr的模板
            var tmp = $.hgrid.getTemplate(opt, me);
            if (tmp.length == 0) {
                return;
            };
            chead.children()
                .css("width", tmp.width)
                .append(tmp.hdtr)
                .append(tmp.htr);
            //将隐藏的tr添加到body中
            cbody.children("table").css("width", tmp.width).append(tmp.dtr);
            cbody.children(".htgrid-load-more-c").css("width", tmp.width);
            if (opt.showListTail) {//如果显示列表尾部区域
                par.append(creatPage(opt, id));
                $("#" + id).htGrid("resetPage", {
                    currentPage: opt.currentpage,
                    records: 0,
                    rowNum: opt.rowNum
                });
            }
            //添加冻结的div
            par.append(
                '<div class="htgrid-frozen-h" id="' + id + "_fhead" + '">' +
                '<table cellspacing="0" cellpadding="0" border="0"></table>' +
                '</div>');
            par.append(
                '<div class="htgrid-frozen-b" tabindex="0" id="' + id + "_fbody" + '">' +
                '<table cellspacing="0" cellpadding="0" border="0"></table>' +
                '</div>');
            //添加拖拽条
            par.append('<div class="htgrid-drager"></div>');
            //初始化高度
            $("#" + id).htGrid("resize", false, true);
            //绑定事件
            initHanlder(id, opt);
            //如果是树列表，记录节点列的宽度，方便以后计算内部宽度用
            opt.treeNodeWidth = cbody.find("td[data-name='" + opt.treeNode + "']").width();

            //获取page页的内容
            function creatPage(opt, id) {
                var me = $("#" + id);
                var select = ''; //分页下拉
                var btns = ''; //分页按钮
                var go = '';
                if (opt.showPageBar && opt.showPageBar&&!opt.loadMore) {//如果显示分页按钮和分页下拉
                    var select = '<select class="hrgrid-page-sel">'; //定义下拉元素
                    for (var i = 0; i < opt.rowList.length; i++) {
                        var row = opt.rowList[i];
                        select += '<option value="' + row + '">' + row + '</option>';
                    }
                    select += '</select>';
                    btns = [
                        '<span class="htgrid-page-btn page-btn-first">',
                        '<span class="basesprite b-blue-double-angle-first"></span>',
                        '</span>',

                        '<span class="htgrid-page-btn page-btn-l">',
                        '<span class="basesprite b-blue-double-angle-left"></span>',
                        '</span>',

                        '<span class="htgrid-page-btn page-btn-r" ',
                        'style="border-right:1px solid #e1e1e1">',
                        '<span class="basesprite b-blue-double-angle-right"></span>',
                        '</span>',

                        '<span class="htgrid-page-btn page-btn-end" ',
                        'style="border-right:1px solid #e1e1e1">',
                        '<span class="basesprite b-blue-double-angle-end"></span>',
                        '</span>'
                    ].join("");

                    go = '<input type="text" class="form-control input-sm htgrid-page-goinput"><span class="htgrid-page-go">' + HoteamUI.Language.Lang("Grid.Go") + '</span>';
                }
                //定义page分页元素
                var $page = $(
                    '<div class="htgrid-page-c" id="' + id + "_page" + '">' +
                    '<div class="htgrid-page-l"></div>' +
                    '<div class="htgrid-page-m">' +
                    btns +
                    select +
                    go +
                    '</div>' +
                    '<div class="htgrid-page-r"></div>' +
                    '</div>'
                );
                $page.find("select").val(opt.rowNum);

                return $page;
            }
            function initHanlder(id, opt) {
                var me = $("#" + id),
                    head = $("#" + id + "_head"),
                    body = $("#" + id + "_body"),
                    page = $("#" + id + "_page"),
                    fhead = $("#" + id + "_fhead"),
                    fbody = $("#" + id + "_fbody");
                //body的滚动条监测
                body.parent().on({
                    scroll: function () {
                        var left = $(this).scrollLeft();
                        $("#" + id + "_head").parent().scrollLeft(left);
                        var top = $(this).scrollTop();
                        var frd = $("#" + id).parent().children(".htgrid-frozen-b");
                        if (frd.length == 1) {
                            frd.scrollTop(top);
                        }
                        var loadMoreC = $(this).children(".htgrid-load-more-c");
                        if (loadMoreC.length > 0) {
                            loadMoreC.children().css("left", $(this).width() / 2 - 8 + left);
                        }
                    }
                });
                fbody.on({
                    mousewheel: function (e) {
                        var distance = e.originalEvent.wheelDelta;
                        var top = $(this).scrollTop();
                        var pos = top - distance;
                        $(this).scrollTop(pos);
                        body.parent().scrollTop(pos);
                    }
                });
                head.parent().on("click", function () {
                    $(me).htGrid("saveEditCell");
                });
                fhead.on("click", function () {
                    $(me).htGrid("saveEditCell");
                });
                body.parent().on("click", function () {
                    $(me).htGrid("saveEditCell");
                });
                fbody.on("click", function () {
                    $(me).htGrid("saveEditCell");
                });
                page.on("click", function () {
                    $(me).htGrid("saveEditCell");
                });
                //排序事件
                head.on("click", ".htgrid-sort", function (e) {
                    //先保存编辑数据
                    $(me).htGrid("saveEditCell");
                    //排除拖拽的时候受到的影响
                    if ($(e.target).hasClass("htgrid-resize")) {
                        return false;
                    }
                    //如果启用了不允许排序功能
                    if ($(this).hasClass("htgrid-sort-disable")) {
                        return true;
                    }
                    var opt = $("#" + id)[0].p;
                    var colname = $(this).attr("colname");
                    var sort = "asc";
                    var sorta = $(this).children(".htgrid-sort-c"); //找到标示方向的箭头元素
                    if (sorta.length == 0) {//如果没有此箭头元素
                        $("#" + id + "_head").find(".htgrid-sort-c").remove(); //移除其余的所有箭头元素
                        $("#" + id + "_fhead").find(".htgrid-sort-c").remove(); //移除其余的所有箭头元素
                        $(this).append('<span class="htgrid-sort-c basesprite b-sort-top"></span>');
                    } else {
                        if (sorta.hasClass("b-sort-top")) {
                            sorta.removeClass("b-sort-top").addClass("b-sort-down");
                            sort = "desc";
                        } else {
                            sorta.removeClass("b-sort-down").addClass("b-sort-top");
                        }
                    }
                    opt.sortname = colname;
                    opt.sortorder = sort;
                    if (opt.cellEdit || opt.showPageBar == false || opt.showListTail == false) {//编辑列表或者没有分页的列表
                        var data = opt.data;
                        var type = opt.modelObj[colname].sortType;
                        $.hgrid.sortData(type, colname, sort, data);
                        me.htGrid("loadData", data, opt.records);
                        $.hgrid.resetNum(id);
                    } else if (opt.onSort) {
                        opt.onSort.call(me, colname, sort);
                    }
                    return false;
                });
                //冻结列表头排序事件
                fhead.on("click", ".htgrid-sort", function (e) {
                    //先保存编辑数据
                    $(me).htGrid("saveEditCell");
                    //排除拖拽的时候受到的影响
                    if ($(e.target).hasClass("htgrid-resize")) {
                        return false;
                    }
                    //如果启用了不允许排序功能
                    if ($(this).hasClass("htgrid-sort-disable")) {
                        return true;
                    }
                    var opt = $("#" + id)[0].p;
                    var colname = $(this).attr("colname");
                    var sort = "asc";
                    var sorta = $(this).children(".htgrid-sort-c"); //找到标示方向的箭头元素
                    var index = $(this).index();
                    var trindex = $(this).parent().index();
                    //点击的td覆盖的td
                    var btd = $("#" + id + "_head").find("tr:eq(" + trindex + ")").children("td:eq(" + index + ")");
                    if (sorta.length == 0) {//如果没有此箭头元素
                        $("#" + id + "_head").find(".htgrid-sort-c").remove(); //移除其余的所有箭头元素
                        $("#" + id + "_fhead").find(".htgrid-sort-c").remove(); //移除其余的所有箭头元素
                        $(this).append('<span class="htgrid-sort-c basesprite b-sort-top"></span>'); //给当前的td添加箭头元素
                        //给被覆盖的层处理排序箭头
                        btd.append('<span class="htgrid-sort-c basesprite b-sort-top"></span>');
                    } else {//如果有此箭头元素
                        if (sorta.hasClass("b-sort-top")) {
                            sorta.removeClass("b-sort-top").addClass("b-sort-down");
                            btd.children(".htgrid-sort-c").removeClass("b-sort-top").addClass("b-sort-down");
                            sort = "desc";
                        } else {
                            sorta.removeClass("b-sort-down").addClass("b-sort-top");
                            btd.children(".htgrid-sort-c").removeClass("b-sort-down").addClass("b-sort-top");
                        }
                    }
                    opt.sortname = colname;
                    opt.sortorder = sort;
                    if (opt.cellEdit || opt.showPageBar == false || opt.showListTail == false) {//编辑列表或者没有分页的列表
                        var data = opt.data;
                        var type = opt.modelObj[colname].sortType;
                        $.hgrid.sortData(type, colname, sort, data);
                        me.htGrid("loadData", data, opt.records);
                        $.hgrid.resetNum(id);
                    } else if (opt.onSort) {
                        opt.onSort.call(me, colname, sort);
                    }
                    return false;
                });
                //表头宽度拖动事件
                head.find(".htgrid-resize").draggable({
                    axis: "x",
                    helper: "clone",
                    containment: $("#" + id + "_head"),
                    revert: true,
                    drag: function (e, ui) {
                        var drag = $("#" + id).parent().children(".htgrid-drager");
                        var th = $(e.target).parent();
                        var pos = th.position();
                        drag.css("left", pos.left + ui.position.left).show();
                    },
                    stop: function (e, ui) {
                        var table = $("#" + id);
                        table.parent().children(".htgrid-drager").hide().css("left", "-3");
                        var newWidth = ui.position.left;
                        newWidth = newWidth < 80 ? 80 : parseInt(newWidth);
                        var th = $(e.target).parent();
                        var colName = th.attr("colname");
                        var index = th.index();
                        var bth = $("#" + id + "_body").find("tr:first").children("td:eq(" + index + ")");
                        bth.css("width", newWidth).attr("nowidth", "N");
                        $(e.target).closest("tbody").children("tr:first")
                            .children("td:eq(" + index + ")").css("width", newWidth).attr("nowidth", "N");
                        //改变内存中记录的列宽
                        var opt = table[0].p;
                        opt.modelObj[colName].width = newWidth;
                        table.htGrid("resizeWidth");
                        table.htGrid("resizeFrozenWidth");
                    }
                });
                //表头checkbox点击事件
                head.on("click", "span.htgrid-row-check", function () {
                    $.hgrid.resetSelectedCell(id);
                    var flag = $(this).attr("checked") != "checked",
                        $checks = body.find("span.htgrid-row-check:not(.htgrid-row-check-mergehide)"),
                        trs = $checks.closest("tr.htgrid-tr");

                    $.hgrid.setTrStatus(trs, $checks, flag, opt);
                    $.hgrid.setTrStatus([], $(this), flag, opt);

                    if (opt.onSelectedStatusChange) {
                        var ids = [],
                            objs = [];

                        objs = $(me).htGrid("getCurrentPageRows");
                        opt.onSelectedStatusChange.call(me, ids, flag, objs);
                    }

                });

                function onRowClick(e) {
                    if (e.ctrlKey == true) { return false; }
                    var self = $(this),
                        opt = me[0].p,
                        checkbox = self.find("span.htgrid-row-check:not(.htgrid-row-check-mergehide)"),
                        tr = checkbox.closest("tr"),
                        index = self.index(),
                        brother = e.data.brother,
                        ftr = brother.find("tr").eq(index),
                        fcheckbox = ftr.find("span.htgrid-row-check:not(.htgrid-row-check-mergehide)"),
                        flag = checkbox.attr("checked") != "checked",
                        time = 0,
                        siblings, fsiblings;

                    //点击单元格的信息
                    var target = e.target,
                        td;
                    if (e.target.tagName.toUpperCase() === 'td') {
                        td = e.target;
                    } else {
                        td = $(target).closest('td');
                    }
                    td = $(td);

                    $.hgrid.resetSelectedCell(id);
                    if (opt.onRowdblClick) {
                        time = 300;
                    }
                    setTimeout(function () {
                        if (self.attr("dblclick")) {
                            return;
                        }
                        //如果是树结构
                        if (opt.treeNode) {
                            //如果行互斥
                            if (opt.rowrejection) {
                                //将其余行设置为不选中
                                siblings = self.siblings("tr.htgrid-row-select");
                                $.hgrid.setTrStatus(siblings, siblings.find("span.htgrid-check-true"), false, opt);
                                //处理冻结的行
                                fsiblings = fcheckbox.closest("tr").siblings("tr.htgrid-row-select");
                                $.hgrid.setTrStatus(fsiblings, fsiblings.find("span.htgrid-check-true"), false, opt);
                                if (opt.rowLinkCheck) {//如果行选和节点checkbox选一体
                                    $.hgrid.setTrStatus(fsiblings, siblings.find("span.htgrid-treeNode-checkbox"), false, opt);
                                }
                            }
                            $.hgrid.setTrStatus(self, checkbox, flag, opt);
                            $.hgrid.setTrStatus(ftr, fcheckbox, flag, opt);
                            if (opt.rowLinkCheck) { //如果行点击关联节点的checkbox
                                $.hgrid.setCheckStatus(ftr, self.find(".htgrid-treeNode-checkbox"), flag);
                                if (opt.checkType) {//如果父子级关联

                                }
                            }

                        } else {
                            if (opt.isSelectCheckbox) {
                                //如果当前行是未选中的
                                if (flag) {
                                    //如果没有checkbox或者行互斥是true，则都默认为行互斥
                                    if (opt.multiselect === false || opt.rowrejection) {
                                        //将其余的行选中都取消
                                        siblings = self.siblings("tr.htgrid-row-select");
                                        $.hgrid.setTrStatus(siblings, siblings.find("span.htgrid-check-true"), false, opt);

                                        //处理行
                                        fsiblings = fcheckbox.closest("tr").siblings("tr.htgrid-row-select");
                                        $.hgrid.setTrStatus(fsiblings, fsiblings.find("span.htgrid-check-true"), false, opt);
                                    }
                                    //处理当前点击行
                                    $.hgrid.setTrStatus(tr, checkbox, flag, opt);
                                    $.hgrid.setTrStatus(ftr, fcheckbox, flag, opt);
                                } else {//如果当前行已经选中
                                    //取消选中状态
                                    $.hgrid.setTrStatus(tr, checkbox, flag, opt);
                                    $.hgrid.setTrStatus(ftr, fcheckbox, flag, opt);
                                }
                            }
                        }
                        //重置表头的选中状态
                        resetCheckbox();
                        if (opt.onRowClick) {
                            var colName = td.attr("data-name"),
                                modelObj = opt.modelObj;

                            var obj = $(me).htGrid("getRowByIndex", index + opt.rowNum * (opt.currentpage - 1));
                            opt.onRowClick.call(me, index, flag, obj, colName, modelObj);
                        }
                        //checkboxclick
                        if (opt.OnCheckboxClick) {
                            var obj = $(me).htGrid("getRowByIndex", index + opt.rowNum * (opt.currentpage - 1));
                            opt.OnCheckboxClick.call(me, index, flag, obj);
                        }

                        if (opt.onSelectedStatusChange) {
                            var obj = $(me).htGrid("getRowByIndex", index + opt.rowNum * (opt.currentpage - 1));
                            opt.onSelectedStatusChange.call(me, index, flag, obj);
                        }

                    }, time);

                };

                body.on("click", "tr", { brother: fbody }, onRowClick);
                fbody.on("click", "tr", { brother: body }, onRowClick);

                //body行双击(将双击行置为选中，其余行全部置为未选中)
                body.on("dblclick", "tr", function (e) {
                    var self = $(this),
                        index = $(this).index(),
                        ftr = fbody.children().children("tr:eq(" + index + ")"),
                        opt = me[0].p;
                    $.hgrid.resetSelectedCell(id);
                    if (opt.onRowdblClick) {
                        $(this).attr("dblclick", "dblclick");
                        //将当前行置为选中
                        if (opt.dblClickSelect && opt.multiselect) {
                            $.hgrid.setTrStatus($(this), $(this).find("span.htgrid-row-check"), true, opt);
                            $.hgrid.setTrStatus(ftr, ftr.find("span.htgrid-row-check"), true, opt);
                            if (opt.treeNode && opt.rowLinkCheck) {
                                $.hgrid.setCheckStatus(ftr, $(this).find("span.htgrid-treeNode-checkbox"), true);
                            }
                        }
                        //执行双击事件
                        var obj = $(me).htGrid("getRowByIndex", index + opt.rowNum * (opt.currentpage - 1));
                        opt.onRowdblClick.call(me, index, true, obj);
                        setTimeout(function () {
                            self.removeAttr("dblclick");
                        }, 800);
                    }
                });
                //body内部的checkbox点击
                body.on("click", "span.htgrid-row-check", function (e) {
                    $.hgrid.resetSelectedCell(id);
                    var flag = $(this).attr("checked") != "checked";

                    var opt = me[0].p,
                        tr = $(this).closest('tr'),
                        index = tr.index();
                    if (opt.onSelectedStatusChange) {
                        var obj = $(me).htGrid("getRowByIndex", index + opt.rowNum * (opt.currentpage - 1));
                        opt.onSelectedStatusChange.call(me, index, flag, obj);
                    }

                    $.hgrid.setTrStatus($(this).closest("tr"), $(this), flag, opt);
                    resetCheckbox();
                    e.stopPropagation();
                });
                //冻结表头的checkbox点击
                fhead.on("click", "span.htgrid-row-check", function () {
                    var $checks = body.find("span.htgrid-row-check:not(.htgrid-row-check-mergehide)"),
                        trs = $checks.closest("tr.htgrid-tr");
                    var opt = me[0].p;
                    $.hgrid.resetSelectedCell(id);
                    var flag = $(this).attr("checked") != "checked";
                    $.hgrid.setTrStatus([], $(this), flag, opt);
                    $.hgrid.setTrStatus([], head.find("span.htgrid-row-check"), flag, opt);

                    $checks = body.find("span.htgrid-row-check:not(.htgrid-row-check-mergehide)");
                    trs = $checks.closest("tr.htgrid-tr");
                    $.hgrid.setTrStatus(trs, $checks, flag, opt);

                    $checks = fbody.find("span.htgrid-row-check:not(.htgrid-row-check-mergehide)");
                    trs = $checks.closest("tr.htgrid-tr");
                    $.hgrid.setTrStatus(trs, $checks, flag, opt);

                    if (opt.onSelectedStatusChange) {
                        var ids = [],
                            objs = [];

                        //ids = $(me).htGrid("getSelectRowsIds");
                        objs = $(me).htGrid("getCurrentPageRows");
                        opt.onSelectedStatusChange.call(me, ids, flag, objs);
                    }
                });

                //冻结body的双击
                fbody.on("dblclick", "tr", function (e) {
                    var self = $(this),
                        index = $(this).index(),
                        tr = body.children().children("tr:eq(" + index + ")"),
                        opt = me[0].p;
                    $.hgrid.resetSelectedCell(id);
                    if (opt.onRowdblClick) {
                        $(this).attr("dblclick", "dblclick");
                        //将所有行置为未选中(包含未冻结的)
                        $.hgrid.setTrStatus([], head.find("span.htgrid-row-check"), false, opt);
                        $.hgrid.setTrStatus([], fhead.find("span.htgrid-row-check"), false, opt);
                        $.hgrid.setTrStatus(body.children().children("tr"), body.find("span.htgrid-row-check"), false, opt);
                        $.hgrid.setTrStatus(fbody.children().children("tr"), fbody.find("span.htgrid-row-check"), false, opt);
                        //将当前行置为选中
                        $.hgrid.setTrStatus($(this), $(this).find("span.htgrid-row-check"), true, opt);
                        $.hgrid.setTrStatus(tr, tr.find("span.htgrid-row-check"), true, opt);
                        if (opt.treeNode && opt.rowLinkCheck) {
                            $.hgrid.setCheckStatus(tr, $(this).find("span.htgrid-treeNode-checkbox"), true);
                        }
                        //执行双击事件
                        var obj = $(me).htGrid("getRowByIndex", index + opt.rowNum * (opt.currentpage - 1));
                        opt.onRowdblClick.call(me, index, true, obj);
                        setTimeout(function () {
                            self.removeAttr("dblclick");
                        }, 800);
                    }
                });
                //冻结body的checkbox点击
                fbody.on("click", "span.htgrid-row-check", function (e) {
                    $.hgrid.resetSelectedCell(id);
                    frozenCheckClick($(this));
                    var opt = me[0].p,
                        tr = $(this).closest('tr'),
                        index = tr.index();
                    if (opt.onSelectedStatusChange) {
                        var obj = $(me).htGrid("getRowByIndex", index + opt.rowNum * (opt.currentpage - 1));
                        opt.onSelectedStatusChange.call(me, index, flag, obj);
                    }
                    e.stopPropagation();
                });
                //冻结行的checkbox点击处理方法
                function frozenCheckClick(check) {
                    var flag = check.attr("checked") != "checked",
                        tr = check.closest("tr"),
                        index = tr.index(),
                        btr = body.find("tr").eq(index),
                        bcheck = btr.find("span.htgrid-row-check");
                    var opt = me[0].p;
                    $.hgrid.setTrStatus(tr, check, flag, opt);
                    $.hgrid.setTrStatus(btr, bcheck, flag, opt);
                    resetCheckbox();
                }
                //分页区域下拉select变化事件
                page.find("select").on("change", function () {
                    var opt = me[0].p;
                    opt.currentpage = 1;
                    opt.rowNum = parseInt($(this).val());
                    if (opt.onPageChange) {
                        opt.onPageChange.call(me, opt.currentpage, parseInt($(this).val()));
                        setRecordSelected(opt);
                    }
                });
                //分页按钮点击事件
                page.on("click", ".htgrid-page-btn", function (e) {
                    var $elem = $(this);

                    if ($elem.hasClass("hrgrid-page-btn-disable")) {
                        return;
                    }

                    if ($elem.hasClass("page-btn-l")) {
                        opt.currentpage = opt.currentpage - 5;
                        //定位到各组分页页码的首个页码数
                        opt.currentpage = Math.floor((opt.currentpage - 1) / 5) * 5 + 1;
                    } else if ($elem.hasClass("page-btn-r")) {
                        opt.currentpage = (opt.currentpage + 5) > opt.total ? opt.total : (opt.currentpage + 5);
                        opt.currentpage = Math.floor((opt.currentpage - 1) / 5) * 5 + 1;
                    } else if ($elem.hasClass("page-btn-first")) {
                        opt.currentpage = 1;
                    } else if ($elem.hasClass("page-btn-end")) {
                        opt.currentpage = opt.total;
                    } else {
                        opt.currentpage = parseInt($elem.text());
                    }
                    if (opt.onPageChange) {
                        opt.onPageChange.call(me, opt.currentpage, parseInt($elem.nextAll("select").val()));
                        setRecordSelected(opt);
                    }
                });
                //分页go功能
                page.on("click", ".htgrid-page-go", function (e) {
                    var currentpage = parseInt($(this).prev().val());
                    if (currentpage && !isNaN(currentpage) && currentpage > 0) {
                        if (currentpage > opt.total) {
                            //超出页码，提示
                            HoteamUI.UIManager.noty({ text: HoteamUI.Language.Lang("Grid.BeyondPageNumber").replace(/xxx/, opt.total), type: 'error', layout: 'topCenter' });
                            return;
                        }
                        opt.currentpage = currentpage > opt.total ? opt.total : currentpage;
                        if (opt.onPageChange) {
                            opt.onPageChange.call(me, opt.currentpage, parseInt($(this).nextAll("select").val()));
                            setRecordSelected(opt);
                        }
                    }
                });
                //按住ctrl键点击单元格，取消所有行选中，完成所有编辑中的单元格保存，更新该单元格状态
                function setCellsStatus(tds, table, opt) {
                    var seltrs = body.find("tr.htgrid-row-select");
                    if (seltrs.length > 0) {
                        $.hgrid.resetSelectedRow(id);
                    }
                    if (opt.cellEdit) {
                        var preEditTd = table.parent().find('td.htgrid-editing');
                        if (preEditTd.length > 0) {
                            me.htGrid("saveEditCell");
                        }
                    }
                    var selectTd = opt.mouseDownTd.hasClass("htgrid-td-select");
                    if (selectTd == false) {
                        $.each(tds, function () {
                            $(this).addClass("htgrid-td-select");
                        });
                    } else {
                        $.each(tds, function () {
                            $(this).removeClass("htgrid-td-select");
                        });
                    }
                }

                //单元格点击事件
                var onCellClick = function (e) {

                    var td = $(this),
                        tr = td.parent(),
                        index = tr.index();
                    if (index == 0) return;
                    var table = $("#" + id),
                        opt = table[0].p,
                        data = opt.data,
                        colName = td.attr("data-name"),
                        modelObj = opt.modelObj,
                        value = data[index - 1].cellattr[colName],
                        editable = false;
                    function callback(opt, td) {
                        if (opt.onCellClick) {
                            var rowId = td.parent().index();
                            var columnName = td.attr("data-name");
                            return opt.onCellClick.call(me, rowId, columnName, e);
                        } else {
                            return true;
                        }
                    }

                    if (td.hasClass("htgrid-row-pretd")) {//如果当前点击的td是行号列或者checkbox列
                        var check = td.find("span.htgrid-row-check");
                        if (check.length > 0) {
                            check.click();
                            return false;
                        }
                    }
                    if (e.ctrlKey == true) {
                        setCellsStatus(td, table, opt);
                        return false;
                    }
                    //判断当前列表是否启用编辑
                    if (opt.cellEdit) {
                        //判断有没有编辑了但是没有置为未编辑状态的td
                        var preEdittd = table.parent().find('td.htgrid-editing');
                        if (preEdittd.length > 0) {//如果存在
                            //先将上次编辑过的td置为未编辑
                            me.htGrid("saveEditCell")
                        }
                        if (!callback(opt, td)) {
                            return false;
                        }
                        if (!value) {
                            return true;
                        }
                        if (value.Editable === undefined) {//如果未定义，则以列设置为准
                            editable = modelObj[colName].editable;
                        } else {
                            editable = value.Editable;
                        }
                        if (editable && !modelObj[colName].rowSpan) {//如果可以编辑且当前列不是行合并列
                            //执行编辑前事件
                            if (opt.onBeforeEdit) {
                                var rowObj = {};
                                $.each(data[index - 1].cellattr, function (key, value) {
                                    rowObj[key] = value;
                                });
                                var ret = opt.onBeforeEdit.call(me, index, colName, rowObj);
                                if (ret == false) {
                                    return false;
                                }
                            }
                            //将当前编辑的td保存下来,便于下次点击别的td时，将这次的td置为未编辑
                            td.addClass("htgrid-editing");
                            var colType = value.CellType ? value.CellType : (modelObj[colName].colType || "text");
                            var editOption = opt.editOption[colType.toLowerCase()] || opt.editOption["text"];
                            var editcontent = editOption.custom_element.call(me, value, modelObj[colName], index);
                            var editDiv = $('<div class="htgrid-edit-td"></div>')
                                .append(editcontent);
                            td.empty().append(editDiv);
                            setFocusLast(editDiv);
                            return false;
                        }
                    }
                    return callback(opt, td);
                };
                body.on("click", "td", onCellClick);
                fbody.on("click", "td", onCellClick);
                body.on("mousedown", "td", function (e) {
                    if (e.ctrlKey) {
                        var td = $(this),
                            tr = td.parent(),
                            index = tr.index();
                        if (index == 0) return;
                        var table = $("#" + id),
                            opt = table[0].p;
                        opt.mouseDownTd = td;
                        opt.mouseDownFlag = true;
                    }
                });
                body.on("mouseup", "td", function (e) {
                    if (e.ctrlKey) {
                        var td = $(this),
                            tr = td.parent(),
                            index = tr.index();
                        if (index == 0) return;
                        var table = $("#" + id),
                            opt = table[0].p,
                            tds = [];
                        opt.mouseDownFlag = false;
                        //2018.4.8 含冻结列的列表不支持滑动选中需求
                        var fbody = $("#" + id).parent().children(".htgrid-frozen-h").find("tbody");
                        if (fbody.length > 0) {
                            return;
                        }
                        if (!opt.mouseDownTd || opt.mouseDownTd[0] == td[0]) {
                            return;
                        }
                        var sIndex = opt.mouseDownTd.parent().index();
                        var startCellIndex = opt.mouseDownTd[0].cellIndex;
                        var endCellIndex = td[0].cellIndex;
                        var tbody = tr.parent();

                        var top = sIndex + 1;
                        var bottom = index + 1;
                        var max = tr.children().length;
                        var left, right, cindex;
                        if (top > bottom) {
                            top = index + 1;
                            bottom = sIndex + 1;
                            cindex = startCellIndex;
                            startCellIndex = endCellIndex;
                            endCellIndex = cindex;
                        }
                        for (var i = top; i <= bottom; i++) {
                            if (i != top && i != bottom) {
                                $.each($(tbody.children()[i - 1]).children(), function () {
                                    tds.push($(this)[0]);
                                });
                            } else {
                                if (top == bottom) {
                                    if (startCellIndex > endCellIndex) {
                                        left = endCellIndex + 1;
                                        right = startCellIndex + 1;
                                    } else {
                                        left = startCellIndex + 1;
                                        right = endCellIndex + 1;
                                    }
                                }
                                else if (i == top) {
                                    left = startCellIndex + 1;
                                    right = max;
                                }
                                else if (i == bottom) {
                                    left = 0;
                                    right = endCellIndex + 1;
                                }
                                for (var j = left; j <= right; j++) {
                                    tds.push(tbody.find("tr:nth-child(" + i + ") td:nth-child(" + j + ")")[0]);
                                }
                            }
                        }

                        setCellsStatus(tds, table, opt);
                    }
                });

                //编辑内容点击
                var onEidtCellClick = function (e) {
                    return false; //防止冒泡，触发行选中事件和td点击事件
                };
                body.on("click", "td>.htgrid-edit-td", onEidtCellClick);
                fbody.on("click", "td>.htgrid-edit-td", onEidtCellClick);

                //树列表节点点击事件
                if (opt.treeNode) {
                    body.on("click", ".htgrid-treeNode-img", function () {
                        var td = $(this).closest("td"),
                            tr = td.parent(),
                            index = tr.index(),
                            cellData = opt.data[index - 1].cellattr[opt.treeNode],
                            treeNodeState = cellData.treeNodeState;
                        if (treeNodeState == "open") {
                            //折叠所有下级数据
                            $.hgrid.closeChildNodes(me, index - 1, opt.data, opt.treeNode);
                            //处理当前节点图片
                            td.find(".htgrid-treeNode-img").removeClass("htgrid-teeeNode-open").addClass("htgrid-teeeNode-close");
                        } else if (treeNodeState == "close") {
                            //展开当前节点直属子级，且展开其折叠前展开的非其直属子级
                            $.hgrid.openChildNodes(me, index - 1, opt.data, opt.treeNode);
                            //处理当前节点图片
                            td.find(".htgrid-treeNode-img").removeClass("htgrid-teeeNode-close").addClass("htgrid-teeeNode-open");
                            //调用展开后事件
                            me[0].p.onAfterOpenNode.call(me, cellData, index);
                        }
                        return false;
                    });
                    fbody.on("click", ".htgrid-treeNode-img", function () {
                        var ftd = $(this).closest("td"),
                            ftr = ftd.parent("tr"),
                            fimg = ftd.find(".htgrid-treeNode-img"),
                            index = ftr.index(),
                            img = body.children().children(":eq(" + index + ")").find(".htgrid-treeNode-img");
                        img.click();
                        if (fimg.hasClass("htgrid-teeeNode-open")) {
                            fimg.removeClass("htgrid-teeeNode-open").addClass("htgrid-teeeNode-close");
                        } else {
                            fimg.removeClass("htgrid-teeeNode-close").addClass("htgrid-teeeNode-open");
                        }
                        return false;
                    });

                    function oncheckboxclick(event) {
                        $.hgrid.resetSelectedCell(id);
                        var check = $(this).find('>.htgrid-treeNode-checkbox'),
                            flag = check.attr("checked") != "checked",
                            tr = check.closest("tr"),
                            index = tr.index(),
                            brotherBody = event.data.brother,
                            //26266 李金岳
                            brotherTr = brotherBody.children().children("tr:eq(" + index + ")")
                        var result = OnCheckWithShift(tr, brotherTr, flag);
                        if (result == false) {
                            OnCheck(tr, brotherTr, flag);
                            //oncheckboxclick
                            if (opt.OnCheckboxClick) {
                                var obj = $(me).htGrid("getRowByIndex", index + opt.rowNum * (opt.currentpage - 1));
                                opt.OnCheckboxClick.call(me, index, flag, obj);
                            }
                        }
                        //如果关联父子级
                        if (opt.checkType) {
                        }
                        if (opt.rowLinkCheck) {
                            //重置表头的选中状态
                            resetCheckbox();
                        }


                        return false;
                    }

                    body.on("click", ".htgrid-treeNode-checkbox-container", { brother: fbody }, oncheckboxclick);
                    fbody.on("click", ".htgrid-treeNode-checkbox-container", { brother: body }, oncheckboxclick);

                    //处理shift键多节点勾选
                    function OnCheckWithShift(selectTr, selectFTr, flag) {
                        var event = window.event || event;
                        if (event.shiftKey == false) {
                            opt.preClickedTr = selectTr;
                            opt.preClickedFTr = selectFTr;
                            opt.preClickedFlag = flag;
                            return false;
                        }

                        var preClickedTr = opt.preClickedTr;
                        var preClickedFTr = opt.preClickedFTr;
                        var preClickedFlag = opt.preClickedFlag;

                        if (!preClickedTr) {
                            preClickedTr = $(selectTr.parent().find('.htgrid-tr')[0]);
                            preClickedFTr = $(selectFTr.parent().find('.htgrid-tr')[0]);
                            preClickedFlag = preClickedTr.hasClass('htgrid-row-select');
                        }
                        var nextTr = preClickedTr;
                        var nextFTr = preClickedFTr;
                        var count = selectTr.index() - preClickedTr.index();
                        if (count > 0) {
                            for (var i = 0; i < count; i++) {
                                nextTr = nextTr.next();
                                nextFTr = nextFTr.next();
                                if (!nextTr) {
                                    break;
                                }
                                OnCheck(nextTr, nextFTr, preClickedFlag);
                            }
                        }
                        else if (count < 0) {
                            for (var j = 0; j < -count; j++) {
                                nextTr = nextTr.prev();
                                nextFTr = nextFTr.prev();
                                if (!nextTr) {
                                    break;
                                }
                                OnCheck(nextTr, nextFTr, preClickedFlag);
                            }
                        }
                        else {
                            return false;
                        }
                    }

                    function OnCheck(tr, ftr, flag) {
                        $.hgrid.setCheckStatus(ftr, tr.find(' .htgrid-treeNode-checkbox'), flag);
                        //如果行点击和节点checkbox关联
                        if (opt.rowLinkCheck) {
                            $.hgrid.setTrStatus(tr, tr.find("span.htgrid-row-check"), flag, opt);
                            if (ftr.length > 0) {
                                $.hgrid.setTrStatus(ftr, ftr.find("span.htgrid-row-check"), flag, opt);
                            }
                        }
                    }
                    //树节点图片点击事件
                    function onImageclick(event) {
                        var img = $(this),
                            tr = img.closest("tr"),
                            index = tr.index(),
                            brotherBody = event.data.brother,
                            brotherTr = brotherBody.children().children().children("tr:eq(" + index + ")")

                        if (opt.onTreeNodeImageClick) {
                            var obj = $(me).htGrid("getRowByIndex", index + opt.rowNum * (opt.currentpage - 1));
                            var result = opt.onTreeNodeImageClick.call(me, index, obj);
                            if (result) {
                                return false;
                            }
                        }

                    }

                    body.on("click", ".htgrid-treeNode-aimg", { brother: fbody }, onImageclick);
                    fbody.on("click", ".htgrid-treeNode-aimg", { brother: body }, onImageclick);
                }
                //鼠标悬浮的tr上的时候，添加悬浮样式
                body.on("mouseenter", "tr", function () {
                    var index = $(this).index();
                    var ftr = fbody.find("tr").eq(index);
                    $(this).addClass("htgrid-tr-hover");
                    ftr.addClass("htgrid-tr-hover");
                }).on("mouseleave", "tr", function () {
                    var index = $(this).index();
                    var ftr = fbody.find("tr").eq(index);
                    $(this).removeClass("htgrid-tr-hover");
                    ftr.removeClass("htgrid-tr-hover");
                });
                fbody.on("mouseenter", "tr", function () {
                    var index = $(this).index();
                    var tr = body.find("tr").eq(index);
                    $(this).addClass("htgrid-tr-hover");
                    tr.addClass("htgrid-tr-hover");
                }).on("mouseleave", "tr", function () {
                    var index = $(this).index();
                    var tr = body.find("tr").eq(index);
                    $(this).removeClass("htgrid-tr-hover");
                    tr.removeClass("htgrid-tr-hover");
                });
                //加载更多
                if (opt.loadMore) {
                    body.next().click(function () {
                        if (opt.records == opt.data.length) {
                            body.next().children().text(opt.noMore);
                        } else if (opt.onLoadMore) {
                            opt.currentpage = opt.currentpage + 1;
                            opt.onLoadMore.call(me);
                            if (opt.records == opt.data.length) {
                                body.next().children().text(opt.noMore);
                            }
                        }
                    });
                }
                function resetCheckbox() {
                    var isAllChecked = body.find("span.htgrid-row-check").not(body.find("span.htgrid-check-true")).length == 0;
                    $.hgrid.setTrStatus([], head.find("span.htgrid-row-check"), isAllChecked, opt);
                    $.hgrid.setTrStatus([], fhead.find("span.htgrid-row-check"), isAllChecked, opt);
                }
                //使光标位于input最后
                function setFocusLast(editDiv) {
                    var ele = editDiv.find("input.htgrid-edit-input");
                    if (ele.length == 0) {
                        ele = editDiv.find("input.hoteam-editgrid-editbutton-text");
                    }
                    if (ele.length > 0) {
                        ele.focus();
                        if (window.getSelection) {//ie11,10,9,ff,sa
                            var maxLen = ele.val().length;
                            ele[0].setSelectionRange(maxLen, maxLen);
                        } else if (document.selection) {//ie10,9,8,7,6,5
                            var range = ele[0].createTextRange();
                            range.collapse(false);
                            range.select();
                        }
                    } else {
                        editDiv.children().focus();
                    }
                }
            }

            function setRecordSelected(opt) {
                var data = opt.data,
                    record = opt.recordRows,
                    selected,
                    row,
                    arr = [];

                if (!opt.isRecordSelectedRow || !opt.id) {
                    return;
                }
                if (data && data.length > 0) {
                    selected = record.selected;
                    for (var i = 0, len = data.length; i < len; i++) {
                        row = data[i];
                        if (selected[row.cellattr[opt.id].ColText]) {
                            arr.push(i + 1);
                        }
                    }
                    $(me).htGrid("setSelectedRow", arr);
                }
            }
        });
    };
    //普通列表给外部提供的接口
    $.hgrid.extend({
        //加载数据
        loadData: function (data, records) {
            var me = this;
            var id = $(this).attr("id");
            var opt = $(this)[0].p;
            var modelObj = opt.modelObj; //model对象
            var body = $("#" + id + "_body");
            body.parent().scrollTop(0);
            $("#" + id + "_body").scrollTop(0);
            var tbody = body.children();
            var startRowNum = (opt.currentpage - 1) * opt.rowNum + 1;
            $("#" + id + "_fbody").hide();
            $("#" + id + "_fhead").hide();
            //记录data和records
            opt.records = records;
            opt.data = data;
            //清理数据
            tbody.children().not(tbody.children().eq(0)).remove();
            //处理表头的选中状态，置为不选中
            $("#" + id + "_head").find("span.htgrid-row-check").removeAttr("checked").addClass("htgrid-check-false").removeClass("htgrid-check-true");
            //遍历data，添加数据
            var trs = '';
            $(data).each(function (i) {
                var o = data[i];
                trs += $.hgrid.getTR(opt, o, i, startRowNum);
                //设置内存中数据的行号
                o.cellattr.row_number = startRowNum++;
            });
            tbody.append(trs);

            //重置分页
            $(this).htGrid("resetPage", {
                currentPage: opt.currentpage,
                records: records,
                rowNum: opt.rowNum
            });
            //列表内容高度
            var lheight = tbody.height();
            //处理加载更多是否显示
            if (opt.loadMore == true) {
                if (records > data.length) {
                    body.next().show();
                    body.next().children().text(opt.loadMoreText);
                    lheight += opt.bheight;
                } else {
                    body.next().hide();
                }
            }
            if (lheight > body.parent().height()) {//如果高度大于外部div的高度,代表会有滚动条
                //记录是否有滚动条状态
                body.attr("scroll", "scroll");
                //重新计算列表宽度
                $(me).htGrid("resize", true, false);
            }
            //处理冻结
            $(this).htGrid("setFrozen");
            //处理同列的行合并(按列表头配置，文本相同的自动合并)
            $(this).htGrid("setRowMerge");
            //处理同列合并（按数据中指定的rowspan合并）
            $(this).htGrid("setRowspanMerge");

            //缩略图支持
            //现有列表生成方式无法支持缩略图的展示，无法使用配置的方式实现，需要重构代码，工作量较大
            //后续如果同意重构，将调整实现方案
            //现在使用的方式是临时解决方案,IE css兼容性bug，必须获取单元格容器高度，设置固定值
            var thumbnails = $(this).parent().find('.htgrid_col_thumbnail');
            thumbnails.each(function () {
                var thumbnail = $(this);
                thumbnail.height(thumbnail.parent().height())
                    .css('position', 'static');
            });
            if (opt.onLoadSuccess) {//加载成功后
                opt.onLoadSuccess.call(me);
            }
        },
        //获取选中行的主键
        getSelectedRowIds: function () {
            var me = this;
            var id = $(this).attr("id");
            var opt = $(this)[0].p;
            if (!opt.id) {
                return;
            }
            var data = opt.data;
            var tbody = $("#" + id + "_body").children();
            var seltrs = tbody.children("tr.htgrid-row-select");
            var arr = [];
            $.each(seltrs, function (i) {
                var index = $(this).index();
                arr.push(data[index - 1].cellattr[opt.id].ColText);
            });
            return arr;
        },
        //通过主键设置选中行
        setSelectedRowByIds: function (ids) {
            var me = this;
            var id = $(this).attr("id");
            var opt = $(this)[0].p;
            if (!opt.id) {
                return;
            }
            var data = opt.data;
            var arr = [];
            for (var i = 0; i < data.length; i++) {
                if (ids.length == 0) {
                    break;
                }
                var index = $.inArray(data[i].cellattr[opt.id].ColText, ids);
                if (index > -1) {
                    arr.push(parseInt(data[i].cellattr.row_number));
                    ids.splice(index, 1);
                }
            }
            $(me).htGrid("setSelectedRow", arr);
        },
        goRowById: function (id) {
            var me = this;
            var elemId = $(this).attr("id");
            var opt = $(this)[0].p;
            var index;

            if (!opt.id) {
                return;
            }

            var data = opt.data;
            var arr = [];
            for (var i = 0; i < data.length; i++) {
                var objectId = data[i].cellattr[opt.id].ColText;
                if (objectId === id) {
                    index = i;
                    break;
                }
            }

            var body = $("#" + elemId + "_body");
            var tr = $(body.find("tr.htgrid-tr")[i]);
            var position = tr.position();
            if (position.top) {
                body.parent().scrollTop(position.top);
            }
        },
        hideColumns: function (columns) {
            if (!(columns instanceof Array)) {
                columns = [columns];
            }
            var id = this.attr("id");
            var opt = $(this)[0].p;
            //处理传递进来的columns隐藏状态为true
            for (var i = 0; i < opt.colModel.length; i++) {
                if ($.inArray(opt.colModel[i].name, columns) > -1) {
                    opt.colModel[i].hidden = true;
                }
            }
            var head = $("#" + id + "_head");
            var body = $("#" + id + "_body");
            //重新加载头部
            var tmp = $.hgrid.getTemplate(opt, this);
            if (tmp.length == 0) {
                return;
            }
            head.empty()
                .css("width", tmp.width)
                .append(tmp.hdtr)
                .append(tmp.htr);
            //将隐藏的tr添加到body中
            body.empty().css("width", tmp.width).append(tmp.dtr);
            body.next().css("width", tmp.width);
            //重新加载数据
            $(this).htGrid("loadData", opt.data, opt.records);
        },
        //重置分页区域，参数：{currentPage:"",records:"",rowNum:""}
        resetPage: function (info) {
            var me = this;
            var opt = $(me)[0].p;
            var records = info.records;
            var rowNum = info.rowNum;
            var total = parseInt(records / rowNum) + (records % rowNum == 0 ? 0 : 1);
            var currentPage = info.currentPage > total ? total : info.currentPage;
            var page = $(me).nextAll(".htgrid-page-c");
            var rbtn = page.find(".page-btn-r"); //左移按钮
            var lbtn = page.find(".page-btn-l"); //右移按钮
            var sbtn = page.find(".page-btn-first");
            var ebtn = page.find(".page-btn-end");
            var recordEle = page.children(".htgrid-page-r"); //右侧文字提示区域
            opt.total = total;
            //右侧提示信息
            var text = "";
            if (opt.showPageBar) {
                //如果有分页
                //移除数字按钮
                page.find(".htgrid-page-btn").not(lbtn).not(rbtn).not(sbtn).not(ebtn).remove();
                if (total == 0) {
                    lbtn.addClass("hrgrid-page-btn-disable").children().addClass("b-double-angle-left");
                    rbtn.addClass("hrgrid-page-btn-disable").children().addClass("b-double-angle-right");

                    sbtn.addClass("hrgrid-page-btn-disable").children().addClass("b-double-angle-first");
                    ebtn.addClass("hrgrid-page-btn-disable").children().addClass("b-double-angle-end");

                    recordEle.empty();
                    return;
                }
                //计算start分页数字和end分页数字
                var y = currentPage % 5;
                if (y != 0) {
                    var start = currentPage - y + 1,
                        end = (start + 4) > total ? total : start + 4;
                } else {
                    var start = currentPage - 4,
                        end = currentPage;
                }
                lbtn.removeClass("hrgrid-page-btn-disable").children().removeClass("b-double-angle-left");
                rbtn.removeClass("hrgrid-page-btn-disable").children().removeClass("b-double-angle-right");
                sbtn.removeClass("hrgrid-page-btn-disable").children().removeClass("b-double-angle-first");
                ebtn.removeClass("hrgrid-page-btn-disable").children().removeClass("b-double-angle-end");
                //添加分页数字按钮
                for (var i = start; i <= end; i++) {
                    var btnclass = (i == currentPage) ? "hrgrid-page-btn-disable hrgrid-page-btn-select" : "";
                    rbtn.before('<span class="htgrid-page-btn ' + btnclass + '">' + i + '</span>');
                }
                if (start == 1) {
                    lbtn.addClass("hrgrid-page-btn-disable").children().addClass("b-double-angle-left");
                    //sbtn.addClass("hrgrid-page-btn-disable").children().addClass("b-double-angle-first");
                }
                if (end == total) {
                    rbtn.addClass("hrgrid-page-btn-disable").children().addClass("b-double-angle-right");
                    //ebtn.addClass("hrgrid-page-btn-disable").children().addClass("b-double-angle-end");
                }
                text = opt.recordText
                    .replace("{0}", (currentPage - 1) * rowNum + 1)
                    .replace("{1}", currentPage * rowNum)
                    .replace("{2}", records);
            } else {
                if (total == 0) {
                    recordEle.empty();
                    return;
                }
                text = opt.recordText
                    .replace("{0}", "1")
                    .replace("{1}", records)
                    .replace("{2}", records);
            }
            recordEle.text(text);
        },
        //此方法用于列表添加行数据，且数据是传递进来的;rows:添加的数据，rowNum:添加的位置(默认在最后面添加)
        addRows: function (rows, rowNum, isPaging) {
            var me = this;
            var id = $(this).attr("id");
            var opt = $(this)[0].p;
            var data = opt.data;
            var modelObj = opt.modelObj;
            var tbody = $("#" + id + "_body").children();
            var ftbody = $("#" + id + "_fbody").children().children();
            var tr = $(me)[0].tr;
            var num = data.length;
            rowNum = rowNum ? rowNum : num;
            var bakRowNum = rowNum;
            var trs = '';
            var ftrs = '';
            var frozenCol = $.hgrid.getFrozenColumns(opt.colModel);
            var startNum = ((opt.currentpage || 1) - 1) * opt.rowNum;

            $(rows).each(function (i) {
                var o = rows[i];
                if (isPaging === true) {
                    data.splice(rowNum - startNum, 0, o);
                }
                else {
                    data.splice(rowNum, 0, o);
                }

                trs += $.hgrid.getTR(opt, o, i, 0);
                if (frozenCol.length > 0) {
                    ftrs += $.hgrid.getTR(opt, o, i, 0, frozenCol);
                }
                rowNum++;
            });

            if (isPaging === true) {
                bakRowNum = bakRowNum - startNum;
            }
            var bakTr = tbody.children(":eq(" + bakRowNum + ")");
            var fbakTr = ftbody.children(":eq(" + bakRowNum + ")");
            bakTr.after(trs);
            fbakTr.after(ftrs);
            if (opt.treeNode) {//如果是树列表
                bakTr.find(".htgrid-treeNode-img").removeClass("htgrid-teeeNode-close").addClass("htgrid-teeeNode-open");
                fbakTr.find(".htgrid-treeNode-img").removeClass("htgrid-teeeNode-close").addClass("htgrid-teeeNode-open");
                data[bakRowNum - 1].cellattr[opt.treeNode].treeNodeState = "open";
            }

            $.hgrid.resetNum(id);
            if (isPaging === true) {
                $.hgrid.resetDataNum(id, (opt.currentpage - 1) * opt.rowNum || 0);
            }
            else {
                $.hgrid.resetDataNum(id, 0);
            }
            //重置分页
            if (!opt.loadMore) {
                if (isPaging === true) {
                    opt.records = opt.records + rows.length;
                }
                else {
                    opt.records = data.length;
                }
            }


            if (isPaging === true) {
                var page = $(me).nextAll(".htgrid-page-c");
                var recordEle = page.children(".htgrid-page-r"); //右侧文字提示区域
                var recordText = opt.recordText;
                var text = recordText.replace("{0}", startNum + 1)
                    .replace("{1}", startNum + data.length)
                    .replace("{2}", opt.records);
                recordEle.html(text);
            }
            else {
                $(this).htGrid("resetPage", {
                    currentPage: opt.currentpage,
                    records: opt.records,
                    rowNum: opt.rowNum
                });
            }

        },
        //获取选中行的数据
        getSelectedRows: function () {
            var id = $(this).attr("id");
            var opt = $(this)[0].p;
            var data = opt.data;
            var tbody = $("#" + id + "_body").children();
            var seltrs = tbody.children("tr.htgrid-row-select").not("tr.btrhidden");
            var arr = [];
            $.each(seltrs, function (i) {
                var index = $(this).index();
                arr.push(data[index - 1].cellattr);
            });
            return arr;
        },
        //获取全选按钮状态
        isSelectedAll: function () {
            var checkAllState = false;
            var id = $(this).attr("id");
            var checkAllInput = $("#" + id).find("input[type='checkbox']").first();
            if (checkAllInput.prop('checked') === true) {
                checkAllState = true;
            }
            return checkAllState;
        },
        //获取选中单元格的数据
        getSelectedCells: function () {
            var id = $(this).attr("id");
            var opt = $(this)[0].p;
            var tds = $(this).parent().find("td.htgrid-td-select");
            var arr = [], item = {};
            $.each(tds, function () {
                var index = $(this).parent().index(); //该行的索引值
                var colName = $(this).attr("data-name");
                var modelObj = opt.modelObj;
                var model = modelObj[colName];
                var rowData = opt.data;
                var value = rowData[index - 1].cellattr[colName];
                item = {};
                item[colName] = value;
                arr.push(item);
            });
            return arr;
        },
        getSelectRowsIds: function () {
            var id = $(this).attr("id");
            var opt = $(this)[0].p;
            var data = opt.data;
            var tbody = $("#" + id + "_body").children();
            var seltrs = tbody.children("tr.htgrid-row-select");
            var arr = [];
            $.each(seltrs, function (i) {
                var index = $(this).index();
                arr.push(data[index - 1].cellattr[opt.id].ColText);
            });
            return arr;
        },
        //通过行号获取行数据
        getRowByIndex: function (rowNum) {
            var opt = $(this)[0].p;
            var data = opt.data;
            rowNum = rowNum - opt.rowNum * (opt.currentpage - 1);
            if (data[rowNum - 1]) {
                return data[rowNum - 1].cellattr;
            }
            else {
                return {};
            }
        },
        //获取当前页所有数据
        getCurrentPageRows: function () {
            var opt = $(this)[0].p;
            var data = opt.data;
            var arr = [];
            $.each(data, function (i) {
                arr.push(data[i].cellattr);
            });
            return arr;
        },
        //resize此列表，colresize为true会重新计算列宽，false不计算(默认为true);heightresize为true时重新计算高度，默认为true
        resize: function (colresize, heightresize) {
            var me = this;
            colresize = colresize == undefined ? true : colresize;
            heightresize = heightresize == undefined ? true : heightresize;
            if (heightresize) {
                $(me).htGrid("resizeHeight");
            }
            if (colresize) {
                $(me).htGrid("resizeWidth");
            }
            var par = $(this).parent();
            var fbody = par.children(".htgrid-frozen-b");
            var body = par.children(".htgrid-body-c");
            var pagewidth = par.children(".htgrid-page-c").width();
            var btnwidth = par.find(".htgrid-page-m").width();
            par.find(".htgrid-page-l").width((pagewidth - btnwidth) / 2);
            if (fbody.css("display") == "none") {
                return;
            };
            if (colresize) {
                $(me).htGrid("resizeFrozenWidth");
            }
        },
        //重新计算高度
        resizeHeight: function () {
            var me = this;
            var par = $(this).parent();
            var pheight = par.innerHeight(); //父元素高度
            var opt = $(this)[0].p;
            var hh = par.children(".htgrid-head-c").outerHeight(); //表头高度
            if (!me.data("autofit")) {
                var bh = pheight - hh - (opt.describe ? opt.hheight : 0) - (opt.showListTail ? 32 : 0); //分页区域，减去32（默认）
                par.children(".htgrid-body-c").css("height", bh);
            }
        },
        //重新计算列宽
        resizeWidth: function () {
            var id = $(this).attr("id");
            var par = $(this).parent();
            var body = $("#" + id + "_body");
            var head = $("#" + id + "_head");
            var parwidth = par.innerWidth(); //父元素宽度
            var fixWidth = 0; //定义固定列宽的宽度之和
            var tr = body.find("tr:first");
            //var scroll = body.attr("scroll");
            //var scrollWidth = scroll ? ($.hgrid.getScrollbarWidth()) : 0;
            var scrollWidth = $.hgrid.getScrollbarWidth();
            var fixtds = tr.children("[nowidth='N']");
            fixtds.each(function () {
                if ($(this).css("display") != "none") {
                    fixWidth += parseInt($(this).css("width"));
                }
            });
            var nofixtds = tr.children("[nowidth='Y']");
            var hnofixtds = head.find("tr:first").children("[nowidth='Y']");
            var num = nofixtds.length;
            var ew = 0, decNum = 0;//decNum小数点后的总和
            if (num > 0) {
                ew = (parwidth - scrollWidth - fixWidth) / num;
                ew = ew < 80 ? 80 : ew; //列最小宽度为80（默认）
                decNum += (ew - parseInt(ew)) * num;
                ew = parseInt(ew);
            }
            nofixtds.css("width", ew);
            $(nofixtds[num - 1]).css("width", ew + decNum);
            hnofixtds.css("width", ew);
            $(hnofixtds[num - 1]).css("width", ew + decNum);
            //最后一列（滚动条列td宽度）
            head.find("tr:first").children("td.htgrid-td-scroll").width(scrollWidth);
            if ((fixWidth + decNum + ew * num + scrollWidth) >= parwidth) {
                body.css("width", ew * num + fixWidth + decNum);
                body.next().css("width", ew * num + fixWidth + decNum);
                head.css("width", ew * num + fixWidth + scrollWidth + decNum);
            } else {
                body.css("width", parwidth - scrollWidth);
                body.next().css("width", parwidth - scrollWidth);
                head.css("width", parwidth);
            }
        },
        //重新计算冻结列宽
        resizeFrozenWidth: function () {
            if ($(this).nextAll(".htgrid-frozen-h").css("display") == "none") {
                return;
            };
            var opt = $(this)[0].p;
            var colModel = opt.colModel;
            var par = $(this).parent();
            var fnum = $.hgrid.getFrozenColumns(colModel).length; //冻结列数目
            if (fnum > 0) {
                fnum += 2; //添加行号列及checkbox列
                var $frt = par.children(".htgrid-frozen-h");
                var htable = $frt.children(); //冻结head的table
                var ftds = htable.find("tr:first").children("td");
                var $frb = par.children(".htgrid-frozen-b");
                var btable = $frb.children(); //冻结body的table
                var fbtds = btable.find("tr:first").children("td");
                var tds = par.children(".htgrid-head-c").find("tr:first").children("td");
                var tw = 0; //定义冻结列宽度
                for (var k = 0; k < fnum; k++) {
                    var td = $(tds[k]);
                    $(ftds[k]).css("width", td.css("width"));
                    $(fbtds[k]).css("width", td.css("width"));
                    tw += parseInt(td.css("display") == "none" ? 0 : td.css("width"));
                }
                htable.css("width", tw);
                btable.css("width", tw);
                $frt.css("width", tw);
                $frb.css("width", tw);
                //重置高度
                var tb = par.children(".htgrid-body-c");
                $frb.css("height", tb.outerHeight() - (tb[0].scrollWidth == tb[0].clientWidth ? 0 : $.hgrid.getScrollbarWidth()));
            }
        },
        //列表头合并
        setGroupHeaders: function (group) {
            var me = this;
            var hb = $(me).parent().children(".htgrid-head-c"); //表头div
            var opt = $(me)[0].p;
            var $tr = hb.find("tr:last"); //获取隐藏的tr
            var $ctr = $tr.clone().css("height", opt.hheight); //复制tr
            $ctr.children("td").removeClass("htgrid-td-hide");
            $.each(group, function (i) {//遍历group
                var td = $ctr.find("td[colname='" + group[i].startColumnName + "']");
                if (td.length == 0) {
                    return;
                }
                td.attr("colspan", group[i].numberOfColumns)
                    .text(group[i].titleText).css("display", "table-cell");
                var index = td.index();
                for (var k = index + 1; k < index + group[i].numberOfColumns; k++) {
                    var at = $ctr.children().eq(k);
                    at.hide();
                }
            });
            hb.find("tr:first").after($ctr);
            $(me).htGrid("resize");
            extendRow(hb, $(this).attr("id"));
            //将新增的这行与这行下面的一行进行比较合并
            function extendRow(hb, id) {
                var trs = hb.find("tbody").children("tr");
                //当前的tr
                var currTr = $(trs[2]);
                var currTds = currTr.children("td");
                //上一个tr
                var prevTr = $(trs[1]);
                var prevTds = prevTr.children("td");
                for (var j = 0; j < currTds.length; j++) {
                    var td = $(currTds[j]),
                        colspan = td.attr("colspan") || 1,
                        text = td.text();
                    var prevTd = $(prevTds[td.index()]),
                        prevColspan = prevTd.attr("colspan") || 1,
                        prevText = prevTd.text();
                    //如果是有效列
                    if (td.attr("colname") && !(td.css("display") == "none")) {
                        if (prevTd.attr("colname") && !(prevTd.css("display") == "none") && colspan == prevColspan && prevText == text) {
                            td.addClass("htgrid-td-hide");
                            prevTd.attr("rowspan", parseInt(td.attr("rowspan") || 1) + 1).text(td.text());
                            //如果该列有排序
                            if (td.hasClass("htgrid-sort")) {
                                prevTd.addClass("htgrid-sort");
                            }
                            //如果该列有拖动列宽
                            if (td.children(".htgrid-resize").length > 0) {
                                prevTd.append('<span class="htgrid-resize ui-draggable"></span>');
                            }
                        }
                    } else {
                        td.addClass("htgrid-td-hide");
                        prevTd.attr("rowspan", parseInt(td.attr("rowspan") || 1) + 1);
                    }
                }
                //定义拖动事件
                $ctr.find(".htgrid-resize").draggable({
                    axis: "x",
                    helper: "clone",
                    containment: $("#" + id + "_head"),
                    revert: true,
                    drag: function (e, ui) {
                        var drag = $("#" + id).parent().children(".htgrid-drager");
                        var th = $(e.target).parent();
                        var pos = th.position();
                        drag.css("left", pos.left + ui.position.left).show();
                    },
                    stop: function (e, ui) {
                        $("#" + id).parent().children(".htgrid-drager").hide().css("left", "-3");
                        var newWidth = ui.position.left;
                        newWidth = newWidth < 80 ? 80 : parseInt(newWidth);
                        var th = $(e.target).parent();
                        var index = th.index();
                        var bth = $("#" + id + "_body").find("tr:first").children("td:eq(" + index + ")");
                        bth.css("width", newWidth).attr("nowidth", "N");
                        $(e.target).closest("tbody").children("tr:first")
                            .children("td:eq(" + index + ")").css("width", newWidth).attr("nowidth", "N");
                        $("#" + id).htGrid("resizeWidth");
                        $("#" + id).htGrid("resizeFrozenWidth");
                    }
                });
            }
        },
        //设置列属性
        setColProp: function (colname, colAttr) {
            var p = $(this)[0].p;
            var colModel = p.colModel;
            $(colModel).each(function (i) {
                if (colModel[i].name == colname) {
                    $.extend(colModel[i], colAttr);
                }
            });
        },
        //冻结列表
        setFrozen: function () {
            var opt = $(this)[0].p,
                //缓存起来的数据
                data = opt.data,
                colModel = opt.colModel,
                modelObj = opt.modelObj,
                //记录冻结列
                frozenColumns = $.hgrid.getFrozenColumns(colModel),
                fnum = frozenColumns.length;
            var par = $(this).parent().css({ "position": "relative" });
            var id = $(this).attr("id");
            if (frozenColumns.length > 0) {
                //处理选中行
                $(this).htGrid("resetSelectedRow");
                //表头冻结div
                fnum += 2; //增加行号列及checkbox列
                var $frt = par.children(".htgrid-frozen-h"); //冻结表头div
                var htable = $frt.children().empty();
                var htr = par.children(".htgrid-head-c").find("tr"); //获取表头所有tr
                var tw = 0; //定义冻结列宽度和
                for (var i = 0; i < htr.length; i++) {
                    var tds = $(htr[i]).children(); //获取所有td
                    var trh = i == 0 ? 0 : opt.hheight; //定义tr高度
                    var trc = i == 0 ? "trhidden" : ""; //定义tr的class
                    var $ctr = $('<tr class="' + trc + '" style="height:' + trh + "px" + '"></tr>');
                    for (var k = 0; k < fnum; k++) {
                        var td = $(tds[k]);
                        if (k == 0) {
                            $ctr.append(td.clone().empty());
                        } else {
                            $ctr.append(td.clone());
                        }
                        if (i == 0) {
                            tw += parseInt(td.css("display") == "none" ? 0 : td.css("width"));
                        }
                    }
                    htable.append($ctr);
                }
                htable.css("width", tw);
                //冻结列列宽拖动事件
                $frt.find(".htgrid-resize").draggable({
                    axis: "x",
                    helper: "clone",
                    containment: $("#" + id + "_head"),
                    revert: true,
                    drag: function (e, ui) {
                        //显示拖动条并定义拖动条位置
                        var drag = $("#" + id).parent().children(".htgrid-drager");
                        var th = $(e.target).parent();
                        var pos = th.position();
                        drag.css("left", pos.left + ui.position.left).show();
                    },
                    stop: function (e, ui) {
                        //拖动结束后重新定义拖动列宽度
                        var table = $("#" + id);
                        table.parent().children(".htgrid-drager").hide().css("left", "-3");
                        var newWidth = ui.position.left;
                        newWidth = newWidth < 80 ? 80 : parseInt(newWidth); //列最小宽度为80
                        var th = $(e.target).parent();
                        var colName = th.attr("colname");
                        var oldWidth = parseInt(th.css("width"));
                        var defferWidth = newWidth - oldWidth;
                        var index = th.index();
                        var bth = $("#" + id + "_body").find("tr:first").children("td:eq(" + index + ")");
                        bth.css("width", newWidth).attr("nowidth", "N");
                        var hth = $("#" + id + "_head").find("tr:first").children("td:eq(" + index + ")");
                        hth.css("width", newWidth).attr("nowidth", "N");
                        //改变内存中记录的列宽
                        var opt = table[0].p;
                        opt.modelObj[colName].width = newWidth;
                        //定义结束后，重新其余列计算宽度
                        table.htGrid("resizeWidth");
                        table.htGrid("resizeFrozenWidth");
                    }
                });
                var pos = par.children(".htgrid-head-c").position();
                $frt.css({ width: tw, left: pos.left, top: pos.top }).show();
                //数据冻结div
                var $frb = par.children(".htgrid-frozen-b"); //数据冻结div
                var btable = $frb.children().empty();
                var btrs = par.children(".htgrid-body-c").find("tr"); //获取所有数据tr
                var btw = 0; //定义冻结列宽度之和
                var ftrs = '';
                for (var i = 0; i < btrs.length; i++) {
                    var btr = $(btrs[i]);
                    if (i == 0) {//复制隐藏行(第一个tr)
                        var tds = btr.children();
                        var $ctr = $('<tr class="btrhidden" style="height:1px;"></tr>');
                        for (var k = 0; k < fnum; k++) {
                            var td = $(tds[k]);
                            var tdClone = td.clone();
                            $ctr.append(tdClone);
                            btw += parseInt(td.css("display") == "none" ? 0 : td.css("width"));
                        }
                        btable.append($ctr);
                    } else {//数据行冻结tr创建
                        var trHeight = btr.height();
                        ftrs += $.hgrid.getTR(opt, data[i - 1], i - 1, data[i - 1].cellattr.row_number, frozenColumns, trHeight);
                    }
                }
                btable.append(ftrs);
                btable.css("width", btw);
                var tb = par.children(".htgrid-body-c");
                var pos = tb.position();
                $frb.css({
                    width: btw,
                    left: pos.left,
                    top: pos.top,
                    height: tb.outerHeight() - (tb[0].scrollWidth == tb[0].clientWidth ? 0 : $.hgrid.getScrollbarWidth()) - (opt.loadMore ? (tb.children(".htgrid-load-more-c").css("display") == "none" ? 0 : opt.bheight) : 0)
                }).show();
            }
        },
        //通过indexRows设置选中行
        setSelectedRow: function (rowNums) {
            var id = $(this).attr("id");
            var opt = $(this)[0].p;
            var body = $("#" + id + "_body");
            var head = $("#" + id + "_head");
            var fhead = $("#" + id + "_fhead");
            var fbody = $("#" + id + "_fbody");
            if (!(rowNums instanceof Array)) {//如果传递进来的不是数组
                rowNums = [rowNums];
            };
            var trs = body.find("tr.htgrid-tr");
            var ftrs = fbody.find("tr.htgrid-tr");
            $(rowNums).each(function (i) {//循环rowNums，设置选中行
                var tr = $(trs[rowNums[i] - 1]); //获取需要选中的行
                var ftr = $(ftrs[rowNums[i] - 1]); //获取需要选中的冻结行
                $.hgrid.setTrStatus(tr, tr.find("span.htgrid-row-check"), true, opt);
                $.hgrid.setTrStatus(ftr, ftr.find("span.htgrid-row-check"), true, opt);
                if (opt.treeNode && opt.rowLinkCheck) {
                    $.hgrid.setCheckStatus(ftr, tr.find("span.htgrid-treeNode-checkbox"), true, opt);
                }
                //自动调整至可见位置
                var top = $(tr).position().top,
                    scrollContainer = body.parent(),
                    bodyHeight = scrollContainer.height();
                if (top + 30 > bodyHeight) {
                    scrollContainer.scrollTop(top);
                }

            });
            //处理表头的checkbox
            var isAllChecked = body.find("span.htgrid-row-check").not(body.find("span.htgrid-check-true")).length == 0;
            $.hgrid.setTrStatus([], head.find("span.htgrid-row-check"), isAllChecked, opt);
            $.hgrid.setTrStatus([], fhead.find("span.htgrid-row-check"), isAllChecked, opt);
        },
        //通过行号设置行不选中
        setUnSelectRow: function (rowNums) {
            var id = $(this).attr("id");
            var opt = $(this)[0].p;
            var body = $("#" + id + "_body");
            var fbody = $("#" + id + "_fbody");
            var head = $("#" + id + "_head");
            var fhead = $("#" + id + "_fhead");
            if (!(rowNums instanceof Array)) {//如果传递进来的不是数组
                rowNums = [rowNums];
            };
            var trs = body.find("tr.htgrid-tr");
            var ftrs = fbody.find("tr.htgrid-tr");
            $(rowNums).each(function (i) {//循环rowNums，设置选中行
                var tr = $(trs[rowNums[i] - 1]); //获取需要选中的行
                var ftr = $(ftrs[rowNums[i] - 1]); //获取需要选中的冻结行
                $.hgrid.setTrStatus(tr, tr.find("span.htgrid-row-check"), false, opt);
                $.hgrid.setTrStatus(ftr, ftr.find("span.htgrid-row-check"), false, opt);
                if (opt.treeNode && opt.rowLinkCheck) {
                    $.hgrid.setCheckStatus(ftr, tr.find("span.htgrid-treeNode-checkbox"), false);
                }
            });
            //处理表头的checkbox
            var isAllChecked = body.find("span.htgrid-row-check").not(body.find("span.htgrid-check-true")).length == 0;
            $.hgrid.setTrStatus([], head.find("span.htgrid-row-check"), isAllChecked, opt);
            $.hgrid.setTrStatus([], fhead.find("span.htgrid-row-check"), isAllChecked, opt);
        },
        //设置选中所有
        setSelectAll: function () {
            var id = $(this).attr("id");
            var opt = $(this)[0].p;
            var body = $("#" + id + "_body");
            var head = $("#" + id + "_head");
            var fbody = $("#" + id + "_fbody");
            var fhead = $("#" + id + "_fhead");
            var trs = body.find("tr.htgrid-tr");
            var ftrs = fbody.find("tr.htgrid-tr");
            $.hgrid.setTrStatus(trs, trs.find("span.htgrid-row-check"), true, opt);
            $.hgrid.setTrStatus(ftrs, ftrs.find("span.htgrid-row-check"), true, opt);
            $.hgrid.setTrStatus(trs, trs.find("span.htgrid-treeNode-checkbox"), true, opt);
            $.hgrid.setTrStatus(ftrs, ftrs.find("span.htgrid-treeNode-checkbox"), true, opt);
            $.hgrid.setTrStatus([], head.find("span.htgrid-row-check"), true, opt);
            $.hgrid.setTrStatus([], fhead.find("span.htgrid-row-check"), true, opt);
        },
        //重置选中状态
        resetSelectedRow: function () {
            var id = $(this).attr("id");
            $.hgrid.resetSelectedRow(id);
        },
        //重置选中单元格状态
        resetSelectedCell: function () {
            var id = $(this).attr("id");
            $.hgrid.resetSelectedCell(id);
        },
        //破坏掉htGrid
        destroy: function () {
            var par = $(this).parent();
            par.children().not($(this)).remove();
        },
        //获取option
        getOption: function () {
            return $(this)[0].p;
        },
        //设置pageinfo信息
        setPagerInfo: function (info) {
            var p = $(this)[0].p;
            $.extend(p, info);
        },
        //隐藏分页区域
        hidePageBtns: function () {
            var id = $(this).attr("id");
            var page = $("#" + id + "_page");
            page.children(".htgrid-page-m").children().hide();
        },
        //显示分页区域
        showPageBtns: function () {
            var id = $(this).attr("id");
            var page = $("#" + id + "_page");
            page.children(".htgrid-page-m").children().show();
        },
        //禁用所有排序功能
        disableSort: function () {
            var id = $(this).attr("id");
            var head = $("#" + id + "_head");
            var fhead = $("#" + id + "_fhead");
            head.find("td.htgrid-sort").addClass("htgrid-sort-disable");
            fhead.find("td.htgrid-sort").addClass("htgrid-sort-disable");
        },
        //启用排序功能
        enableSort: function () {
            var id = $(this).attr("id");
            var head = $("#" + id + "_head");
            var fhead = $("#" + id + "_fhead");
            head.find("td.htgrid-sort").removeClass("htgrid-sort-disable");
            fhead.find("td.htgrid-sort").removeClass("htgrid-sort-disable");
        },
        //通过行号隐藏行
        hideTrs: function (rowIds) {
            var id = $(this).attr("id");
            var tbody = $("#" + id + "_body").children();
            var ftbody = $("#" + id + "_fbody").children().children();
            var trs = tbody.children("tr");
            var ftrs = ftbody.children("tr");
            //修改内存中保存的data，将rowattr置为隐藏
            if (rowIds instanceof Array) {
                $.each(rowIds, function (i, val) {
                    //隐藏dom树中的tr
                    $(trs[val]).css("display", "none");
                    $(ftrs[val]).css("display", "none");
                });
            }
        },
        //通过行号显示行
        showTrs: function (rowIds) {
            var id = $(this).attr("id");
            var tbody = $("#" + id + "_body").children();
            var ftbody = $("#" + id + "_fbody").children().children();
            var trs = tbody.children("tr");
            var ftrs = ftbody.children("tr");
            //修改内存中保存的data，将rowattr置为隐藏
            if (rowIds instanceof Array) {
                $.each(rowIds, function (i, val) {
                    //隐藏dom树中的tr
                    $(trs[val]).css("display", "table-row");
                    $(ftrs[val]).css("display", "table-row");
                });
            }
        },
        //设置行颜色
        setRowColor: function (rowNum, color) {
            var id = $(this).attr("id"),
                opt = $(this)[0].p,
                data = opt.data,
                tbody = $("#" + id + "_body").children(),
                ftbody = $("#" + id + "_fbody").children().children();
            tbody.children("tr:eq(" + rowNum + ")").children("td").css("backgroundColor", color);
            ftbody.children("tr:eq(" + rowNum + ")").children("td").css("backgroundColor", color);
            //更新缓存数据中行背景色设置
            data[rowNum - 1].rowattr.BackgroundColor = color;
        },
        resetRowsColor: function () {
            var id = $(this).attr("id");
            $("#" + id).parent().find("tr").children("td").css("backgroundColor", "");
        },
        //设置单元格颜色
        setCellColor: function (rowNum, columnName, color) {
            var id = $(this).attr("id"),
                opt = $(this)[0].p,
                data = opt.data,
                tbody = $("#" + id + "_body").children(),
                ftbody = $("#" + id + "_fbody").children().children();
            tbody.children("tr:eq(" + rowNum + ")").find("td[data-name='" + columnName + "']").css("backgroundColor", color);
            ftbody.children("tr:eq(" + rowNum + ")").find("td[data-name='" + columnName + "']").css("backgroundColor", color);
            //更新缓存数据中行背景色设置
            data[rowNum - 1].cellattr[columnName].BackgroundColor = color;
        },
        setCellTextColor: function (rowNum, columnName, color) {
            var id = $(this).attr("id"),
                opt = $(this)[0].p,
                data = opt.data,
                tbody = $("#" + id + "_body").children(),
                ftbody = $("#" + id + "_fbody").children().children();
            tbody.children("tr:eq(" + rowNum + ")").find("td[data-name='" + columnName + "']").css("color", color);
            ftbody.children("tr:eq(" + rowNum + ")").find("td[data-name='" + columnName + "']").css("color", color);
            //更新缓存数据中行背景色设置
            data[rowNum - 1].cellattr[columnName].Color = color;
        },
        //设置列颜色
        setColumnColor: function (columnName, color) {
            var id = $(this).attr("id"),
                opt = $(this)[0].p,
                data = opt.data,
                tbody = $("#" + id + "_body").children(),
                ftbody = $("#" + id + "_fbody").children().children();
            tbody.find("td[data-name='" + columnName + "']").css("backgroundColor", color);
            ftbody.find("td[data-name='" + columnName + "']").css("backgroundColor", color);
            //更新缓存数据中行背景色设置
            data[rowNum - 1].cellattr[columnName].BackgroundColor = color;
        },
        //设置行字体
        setRowFont: function (rowNum, fontSize, fontWeight) {
            var id = $(this).attr("id"),
                opt = $(this)[0].p,
                data = opt.data,
                tbody = $("#" + id + "_body").children(),
                ftbody = $("#" + id + "_fbody").children().children();
            if (fontSize) {
                tbody.children("tr:eq(" + rowNum + ")").css("font-size", fontSize);
                //更新缓存数据中行背景色设置
                data[rowNum - 1].rowattr.FontSize = fontSize;
            }
            if (fontWeight) {
                tbody.children("tr:eq(" + rowNum + ")").css("font-weight", fontWeight);
                data[rowNum - 1].rowattr.FontWeight = fontWeight;
            }
        },
        //设置行字体颜色（参数rowNums:行号（可以是字符串或者数组），color:字体颜色）
        setRowTextColor: function (rowNums, color) {
            if (color && rowNums) {
                if (!(rowNums instanceof Array)) rowNums = [rowNums];
                var id = $(this).attr("id"),
                    opt = $(this)[0].p,
                    data = opt.data,
                    tbody = $("#" + id + "_body").children(),
                    ftbody = $("#" + id + "_fbody").children().children();
                for (var i = 0; i < rowNums.length; i++) {
                    var rowNum = rowNums[i] - opt.rowNum * (opt.currentpage - 1);
                    tbody.children("tr:eq(" + rowNum + ")").css("color", color);
                    ftbody.children("tr:eq(" + rowNum + ")").css("color", color);
                    data[rowNum - 1].rowattr.FontColor = color;
                }
            }
        },
        //同列进行行合并
        setRowMerge: function () {
            var id = $(this).attr("id");
            var opt = $(this)[0].p;
            //遍历colModal,记录设置行合并的列
            var mergeCol = [];
            $.each(opt.colModel, function (i) {
                if (opt.colModel[i].rowSpan && opt.colModel[i].editable != true) {
                    mergeCol.push(opt.colModel[i].name);
                }
            });
            if (mergeCol.length == 0) return;
            var data = opt.data;
            var tbody = $("#" + id + "_body").children();
            var ftbody = $("#" + id + "_fbody").children().children();
            var trs = tbody.children("tr.htgrid-tr");
            var ftrs = ftbody.children("tr.htgrid-tr");
            for (var m = 0; m < mergeCol.length; m++) {
                var name = mergeCol[m];
                //遍历所有数据，如果相同，则进行合并
                for (var i = trs.length - 1; i > 0; i--) {
                    var colText = data[i].cellattr[name].ColText;
                    var preColText = data[i - 1].cellattr[name].ColText;
                    if (colText == preColText) {
                        var tr = $(trs[i]);
                        var prevtr = tr.prev();
                        var td = tr.children("td[data-name='" + name + "']");
                        var pretd = prevtr.children("td[data-name='" + name + "']");
                        td.hide();
                        pretd.attr("rowspan", parseInt(td.attr("rowspan") || 1) + 1);
                        if (ftrs.length > 0) {
                            var ftr = $(ftrs[i]);
                            var prevftr = ftr.prev();
                            var ftd = ftr.children("td[data-name='" + name + "']");
                            var preftd = prevftr.children("td[data-name='" + name + "']");
                            ftd.hide();
                            preftd.attr("rowspan", parseInt(td.attr("rowspan") || 1) + 1);
                        }
                    }
                }
            }
        },
        //取消同列的行合并
        cancelRowMerge: function () {
            var id = $(this).attr("id");
            var opt = $(this)[0].p;
            var tbody = $("#" + id + "_body").children();
            var ftbody = $("#" + id + "_fbody").children().children();
            //遍历colModal,记录设置行合并的列
            var mergeCol = [];
            $.each(opt.colModel, function (i) {
                if (opt.colModel[i].rowSpan) {
                    mergeCol.push(opt.colModel[i].name);
                }
            });
            if (mergeCol.length != 0) {//如果有合并列设置
                //遍历所有数据，如果相同，则进行合并
                var trs = tbody.children("tr");
                var ftrs = ftbody.children("tr");
                for (var i = trs.length; i > 0; i--) {
                    var tr = $(trs[i]);
                    var ftr = $(ftrs[i]);
                    var tds = tr.children("td");
                    var ftds = ftr.children("td");
                    $(tds).each(function (i) {//遍历所有tds
                        //如果设置了行合并且是隐藏的
                        //if (mergeCol.indexOf($(this).attr("data-name")) >= 0) {
                        if (HoteamUI.ArrayIndexOf(mergeCol, $(this).attr("data-name")) >= 0) {
                            $(this).css("display", "table-cell").attr("rowspan", 1);
                            $(ftds[i]).css("display", "table-cell").attr("rowspan", 1);
                        }
                    });
                }
            }
        },
        setRowspanMerge: function () {
            var id = $(this).attr("id");
            var opt = $(this)[0].p;
            var data = opt.data;
            var tbody = $("#" + id + "_body").children();
            var ftbody = $("#" + id + "_fbody").children().children();
            var trs = tbody.children("tr.htgrid-tr");
            var ftrs = ftbody.children("tr.htgrid-tr");
            for (var i = 0, len = data.length; i < len; i++) {
                var cells = data[i].cellattr;
                for (var name in cells) {
                    if (cells.hasOwnProperty(name)) {
                        var cell = cells[name];
                        var rowspan = cell.RowSpan;
                        var tr, ftr;
                        if (typeof rowspan === 'number' && rowspan > 1) {
                            tr = $(trs[i]);
                            tr.addClass("htgrid-row-merge-select");
                            var td = tr.children("td[data-name='" + name + "']");
                            td.attr('rowspan', rowspan);

                            var checkboxTd = td.prev();
                            checkboxTd = checkboxTd.hasClass("htgrid-row-pretd") ? checkboxTd : null;
                            if (checkboxTd) {
                                checkboxTd.attr('rowspan', rowspan);
                            }

                            ftr = $(ftrs[i]);
                            ftr.addClass("htgrid-row-merge-select");
                            var ftd = ftrs.children("td[data-name='" + name + "']");
                            ftd.attr('rowspan', rowspan);

                            var checkboxFtd = ftd.prev();
                            checkboxFtd = checkboxFtd.hasClass("htgrid-row-pretd") ? checkboxFtd : null;
                            if (checkboxFtd) {
                                checkboxFtd.attr('rowspan', rowspan);
                            }

                            while (--rowspan) {

                                data[i + rowspan].cellattr[name].RowSpan = 1;
                                tr = $(trs[i + rowspan]);
                                td = tr.children("td[data-name='" + name + "']");
                                td.hide();
                                if (checkboxTd) {
                                    tr.find("td.htgrid-row-pretd>.htgrid-row-check").addClass("htgrid-row-check-mergehide").parent().hide();
                                }

                                ftr = $(ftrs[i + rowspan]);
                                ftd = ftr.children("td[data-name='" + name + "']");
                                ftd.hide();
                                if (checkboxFtd) {
                                    ftr.find("td.htgrid-row-pretd>.htgrid-row-check").addClass("htgrid-row-check-mergehide").parent().hide();
                                }
                            }
                        }
                    }
                }
            }
        },
        //清空数据
        clearGridRows: function () {
            $(this).htGrid("loadData", [], 0);
        },
        disableEdit: function () {
            var id = $(this).attr("id");
            var opt = $(this)[0].p;
            opt.cellEdit = false;
        },
        //删除选中的行
        deleteSelectedRows: function () {
            //获取选中行
            var me = this;
            var opt = $(this)[0].p;
            var data = opt.data;
            var id = $(this).attr("id");
            var head = $("#" + id + "_head");
            var fhead = $("#" + id + "_fhead");
            var body = $("#" + id + "_body");
            var fbody = $("#" + id + "_fbody");
            var seltrs = body.find("tr.htgrid-row-select");
            var fseltrs = fbody.find("tr.htgrid-row-select");
            var bodyRows;

            for (var i = seltrs.length - 1; i >= 0; i--) {
                var index = $(seltrs[i]).index();
                //先删除数据缓存中的数据
                data.splice(index - 1, 1);
                //删除dom中元素
                $(seltrs[i]).remove();
                $(fseltrs[i]).remove();
            }
            bodyRows = body.find("tr.htgrid-tr");
            if (bodyRows.length === 0) {
                $.hgrid.setTrStatus([], head.find("span.htgrid-row-check"), false, opt);
                $.hgrid.setTrStatus([], fhead.find("span.htgrid-row-check"), false, opt);
            }

            //重新处理行号
            $.hgrid.resetNum(id);
            $.hgrid.resetDataNum(id);
            //修改分页处的显示信息
            var page = $(this).nextAll(".htgrid-page-c");
            var recordEle = page.children(".htgrid-page-r"); //右侧文字提示区域
            var recordText = opt.recordText;
            if (data.length == 0) {
                recordEle.empty();
            } else {
                var text = recordText.replace("{0}", "1")
                    .replace("{1}", data.length)
                    .replace("{2}", data.length);
                recordEle.html(text);
            }
        },
        enableEdit: function () {
            var id = $(this).attr("id");
            var opt = $(this)[0].p;
            opt.cellEdit = true;
        }
    });

    //编辑列表给外部提供的接口
    $.hgrid.extend({
        //重置option
        reset: function (opt) {
            var me = $(this);
            var id = me.attr("id");
            var _opt = me[0].p;
            $.extend(_opt, opt);
        },
        //将编辑的td置为未编辑状态
        saveEditCell: function () {
            var me = this;
            var par = $(this).parent();
            var id = $(this).attr("id");
            var opt = me[0].p;
            var td = par.find("td.htgrid-editing");
            var editWarn;
            if (td.length == 0) {//如果不存在td
                return true;
            }
            var index = td.parent().index(); //该行的索引值
            var rowData = opt.data;
            var modelObj = opt.modelObj;
            var colName = td.attr("data-name");
            var model = modelObj[colName];
            var frozen = model.frozen;
            var formatter = model.formatter;
            var value = rowData[index - 1].cellattr[colName];
            var colType = value.CellType ? value.CellType : (modelObj[colName].colType || "text");
            var editOption = opt.editOption[colType.toLowerCase()] || opt.editOption["text"];
            var flag = true;
            if (frozen) {
                var btr = $("#" + id + "_body").children().children(":eq(" + index + ")");
                var btd = btr.children("td[data-name='" + colName + "']");
            }
            //执行saveedit方法时，有时会出现非编辑状态，这时忽略当前的操作
            if (td.children(".htgrid-edit-td").length === 0) {
                return;
            }
            //获取编辑后的数据
            var data = editOption.custom_value(td.children(".htgrid-edit-td").children());
            //先进行数据校验
            var regex = "";
            var retitle = ""; //验证提示信息
            if (value.Regex != null) {//如果单元格有校验格式数据
                regex = value.Regex;
            } else if (model.regex) {//如果列上有校验格式数据
                regex = model.regex;
            }
            if (regex) {//如果有校验数据格式,则进行校验
                //首先判断regex是否是多个AND拼接而成的，如果是，说明是多个正则
                var regexArr = regex.split('AND');
                for (var k = 0; k < regexArr.length; k++) {
                    var reg = new RegExp($.trim(regexArr[k]));
                    if (!reg.test($.trim(data.ColText))) {//没有验证通过
                        flag = false;
                        break;
                    }
                }
            }
            if (flag) {//如果通过了，则调回调方法
                if (opt.onAfterEdit) {//如果定义了编辑后事件
                    var oldData = {};
                    oldData[colName] = {
                        ColValue: value.ColValue,
                        ColText: value.ColText,
                        CellType: value.CellType
                    };
                    var newData = {};
                    newData[colName] = {
                        ColValue: data.ColValue || "",
                        ColText: data.ColText,
                        CellType: value.CellType
                    };
                    var rowObj = {};
                    $.each(rowData[index - 1].cellattr, function (key, value) {
                        rowObj[key] = value;
                    });
                    var rtn = opt.onAfterEdit.call(me, index, colName, oldData, newData, rowObj);
                    if (rtn == false) {//回调方法阻止修改
                        td.empty().removeClass("htgrid-editing").append($.hgrid.getFormatTd(opt, colName, value));
                        return;
                    }
                }
                value.regexStatus = true;
            } else {
                value.regexStatus = false;
            }

            //判断当前的td是否改变了值
            if ((data.ColText != undefined ? (value.OldColText == data.ColText) : true) && (data.ColValue != undefined ? (value.OldColValue == data.ColValue) : true)) {//如果没改变
                value.editType = false;
            } else {
                value.editType = true;
            }
            //处理dom
            $.extend(value, data); //将编辑后的数据合并到value中
            if (colName == opt.treeNode) {
                if (td.parent().hasClass('htgrid-row-select')) {
                    value.checked = true;
                }
                else {
                    value.checked = false;
                }
            }
            var newContent = $.hgrid.getFormatTd(opt, colName, value);
            td.removeClass("htgrid-editing")
                .attr("title", model.showTitle ? value.ColText : "")
                .empty().append(newContent);
            if (frozen) {
                btd.attr("title", model.showTitle ? value.ColText : "")
                    .empty().append(newContent);
            }
            if (rowData[index - 1].type != "add") {
                //判断该行是否是修改过的行
                var type = "";
                for (var key in rowData[index - 1].cellattr) {
                    if (!rowData[index - 1].cellattr.hasOwnProperty(key)) {
                        continue;
                    }
                    var obj = rowData[index - 1].cellattr[key];
                    if (obj.editType) {
                        type = "edit";
                        break;
                    }
                }
                rowData[index - 1].type = type;
            }
            return flag;
        },
        //获取编辑单元格的数据
        getEditCellContent: function () {
            var me = this;
            var par = $(this).parent();
            var id = $(this).attr("id");
            var opt = me[0].p;
            var td = par.find("td.htgrid-editing");
            var editWarn;
            if (td.length == 0) {//如果不存在td
                return null;
            }
            var index = td.parent().index(); //该行的索引值
            var rowData = opt.data;
            var modelObj = opt.modelObj;
            var colName = td.attr("data-name");
            var model = modelObj[colName];
            var frozen = model.frozen;
            var formatter = model.formatter;
            var value = rowData[index - 1].cellattr[colName];
            var colType = value.CellType ? value.CellType : (modelObj[colName].colType || "text");
            var editOption = opt.editOption[colType.toLowerCase()] || opt.editOption["text"];
            var flag = true;
            if (frozen) {
                var btr = $("#" + id + "_body").children().children(":eq(" + index + ")");
                var btd = btr.children("td[data-name='" + colName + "']");
            }
            //执行saveedit方法时，有时会出现非编辑状态，这时忽略当前的操作
            if (td.children(".htgrid-edit-td").length === 0) {
                return null;
            }
            //获取编辑后的数据
            var data = editOption.custom_value(td.children(".htgrid-edit-td").children()) || {};

            return {
                text: data.ColText,
                value: data.ColValue,
                col: $.extend(true, {}, model)
            }
        },
        //触发单元格点击
        setCellEdit: function (rowNum, colName) {
            var id = $(this).attr("id"),
                body = $("#" + id + "_body"),
                fbody = $("#" + id + "_fbody");
            var ftd = fbody.find("tr:eq('" + rowNum + "')").find("td[data-name='" + colName + "']");
            if (ftd.length > 0) {
                ftd.click();
            } else {
                body.find("tr:eq('" + rowNum + "')").find("td[data-name='" + colName + "']").click();
            }
        },
        setCellEditable: function (rowNum, colName, editable) {
            var id = $(this).attr("id"),
                table = $("#" + id),
                opt = table[0].p,
                data = opt.data,
                value = data[rowNum - 1].cellattr[colName],
                editable = !!editable;

            value.Editable = editable;
        },
        //获取下一个可以编辑的单元格
        getNextEditCell: function (rowNum, colName) {
            var me = $(this);
            var id = me.attr("id");
            var opt = me[0].p;
            var data = opt.data;
            var modelObj = opt.modelObj;
            var colModel = opt.colModel;
            var body = $("#" + id + "_body");
            var td = body.find("tr:eq('" + rowNum + "')").find("td[data-name='" + colName + "']");
            var ctd = $.hgrid.getEditTd(td, modelObj, data, rowNum - 1);
            if (ctd) {
                return { rowNum: ctd.parent().index(), colName: ctd.attr("data-name") };
            }
            return null;
        },
        //获取当前编辑列表所有数据
        getGridRows: function () {
            var opt = $(this)[0].p;
            var rowData = opt.data;
            var arr = [];
            $.each(rowData, function (i) {
                var rowObj = {};
                $.each(rowData[i].cellattr, function (key, value) {
                    rowObj[key] = value;
                });
                arr.push(rowObj);
            });
            return arr;
        },
        //编辑列表新增一行(position:新增行的位置[默认first,可选值："last"，"first"]，isSelect：是否选中,默认不选中)
        addEditRow: function (position, isSelect, addRowData) {
            var self = this;
            var id = $(this).attr("id");
            var opt = $(this)[0].p;
            var tbody = $("#" + id + "_body").children();
            var ftbody = $("#" + id + "_fbody").children().children();
            var modelObj = opt.modelObj;
            var data = opt.data;
            var colModel = opt.colModel;
            //定义cellattr对象
            var cellattr = {};
            $.each(colModel, function (i) {
                if (addRowData && addRowData.cellattr[colModel[i].name]) {
                    cellattr[colModel[i].name] = $.extend({ ColName: colModel[i].name }, addRowData.cellattr[colModel[i].name]);
                } else {
                    cellattr[colModel[i].name] = { ColName: colModel[i].name };
                }
            });
            var length = data.length;
            var index = position ? (position == "first" ? 1 : (position == "last" ? (length + 1) : position)) : 1;
            //opt绑定的data数据新增一条
            data.splice(index - 1, 0, {
                rowattr: {},
                cellattr: cellattr,
                type: "add"
            });
            $.hgrid.resetDataNum(id);
            //列表dom树新增一条数据
            var tr = $.hgrid.getTR(opt, data[index - 1], 0, 0);
            tbody.children(":eq(" + (index - 1) + ")").after(tr);
            var frozenCol = $.hgrid.getFrozenColumns(colModel);
            if (frozenCol.length > 0) {
                var ftr = $.hgrid.getTR(opt, data[index - 1], 0, 0, frozenCol);
                ftbody.children(":eq(" + (index - 1) + ")").after(tr);
            }
            //重置行号
            $.hgrid.resetNum(id);
            if (isSelect == undefined) isSelect = true;
            if (isSelect) {//选中当前行
                var selTr = tbody.children(":eq(" + index + ")"),
                    fselTr = ftbody.children(":eq(" + index + ")");
                $.hgrid.setTrStatus(selTr, selTr.find("span.htgrid-row-check"), isSelect, opt);
                $.hgrid.setTrStatus(fselTr, fselTr.find("span.htgrid-row-check"), isSelect, opt);
            }
            //修改分页处的显示信息
            var page = $(this).nextAll(".htgrid-page-c");
            var recordEle = page.children(".htgrid-page-r"); //右侧文字提示区域
            var recordText = opt.recordText;
            var text = recordText.replace("{0}", "1")
                .replace("{1}", data.length)
                .replace("{2}", data.length);
            recordEle.html(text);
            var addTr = tbody.children("tr:eq(" + index + ")"),
                addFrozenTr = ftbody.children("tr:eq(" + index + ")");
            //校验新增的数据是否符合校验规则
            $.each(addTr.children("td"), function () {
                var td = $(this),
                    colName = td.attr("data-name"),
                    value = cellattr[colName],
                    model = modelObj[colName];
                if (colName && !model.frozen &&
                    (value.editable || (value.editable === undefined && model.editable))) {
                    var regex = "";
                    var retitle = ""; //验证提示信息
                    if (value.Regex) {//如果单元格有校验格式数据
                        regex = value.Regex;
                    } else if (model.regex) {//如果列上有校验格式数据
                        regex = model.regex;
                    }
                    if (regex) {//如果有校验数据格式,则进行校验
                        //进行正则验证
                        var flag = true;
                        //pdz
                        flag = $.hgrid.checkRegExp(regex, value, model);
                        if (!flag) {//没有验证通过
                            value.regexStatus = false;
                            td.empty().append($.hgrid.getFormatTd(opt, colName, value));
                        }
                    }
                }
            });
            $.each(addFrozenTr.children("td"), function () {
                var td = $(this),
                    colName = td.attr("data-name"),
                    value = cellattr[colName],
                    model = modelObj[colName];
                if (colName &&
                    (value.editable || (value.editable === undefined && model.editable))) {
                    var regex = "";
                    if (value.Regex) {//如果单元格有校验格式数据
                        regex = value.Regex;
                    } else if (model.regex) {//如果列上有校验格式数据
                        regex = model.regex;
                    }
                    if (regex) {//如果有校验数据格式,则进行校验
                        //首先判断regex是否是多个AND拼接而成的，如果是，说明是多个正则
                        var flag = true;
                        flag = $.hgrid.checkRegExp(regex, value, model);
                        if (!flag) {//没有验证通过
                            value.regexStatus = false;
                            td.empty().append($.hgrid.getFormatTd(opt, colName, value));
                        }
                    }
                }
            });
            //进行聚焦第一个编辑td且使这个td进入编辑状态
            //获取第一个可以编辑的列名
            var editName;
            for (var i = 0; i < colModel.length; i++) {
                var name = colModel[i].name;
                if (cellattr[name] && cellattr[name].editable == true && !modelObj[name].hidden) {//先判断数据里面是否已经设置为可以编辑
                    editName = name;
                    break;
                }
                //数据里面没设置是否能编辑且列里面设置能编辑
                if (((cellattr[name] && cellattr[name].editable != false) || (!cellattr[name])) && modelObj[name].editable == true && !modelObj[name].hidden) {
                    editName = name;
                    break;
                }
            }
            if (editName) {
                var ftd = addFrozenTr.children("[data-name='" + editName + "']");
                if (ftd.length > 0) {
                    addFrozenTr.children("[data-name='" + editName + "']").click();
                } else {
                    addTr.children("[data-name='" + editName + "']").click();
                }
            }
            return index;
        },
        //通过行号来update此行数据
        updateDataByRowID: function (rowNum, data) {
            var me = $(this);
            for (var key in data) {
                if (!data.hasOwnProperty(key)) {
                    continue;
                }
                me.htGrid("setCellData", rowNum, key, data[key]);
            }
        },
        //在编辑列表中移除选中行
        removeSelectedRows: function () {
            //获取选中行
            var me = this;
            var opt = $(this)[0].p;
            var data = opt.data;
            var id = $(this).attr("id");
            var body = $("#" + id + "_body");
            var fbody = $("#" + id + "_fbody").children();
            var seltrs = body.find("tr.htgrid-row-select");
            for (var i = seltrs.length - 1; i >= 0; i--) {
                var tr = $(seltrs[i]);
                var rowNum = parseInt(tr.find("td[rownum='rownum']").text());
                //给缓存中的数据添加type
                var type = data[rowNum - 1].type;
                var removeData = data.splice(rowNum - 1, 1);
                if (type != "add") {
                    opt.removeData.push(removeData[0].cellattr);
                }
            }
            seltrs.remove();
            fbody.find("tr.htgrid-row-select").remove();
            //处理head上的checkbox显示
            var head = $("#" + id + "_head");
            var checkbox = head.find(".htgrid-row-pretd>.htgrid-check-true");
            if (checkbox.length > 0) {
                checkbox.removeClass("htgrid-check-true").addClass("htgrid-check-false").removeAttr('checked');
            }
            //重新处理行号
            $.hgrid.resetNum(id);
            $.hgrid.resetDataNum(id);
            //修改分页处的显示信息
            var page = $(me).nextAll(".htgrid-page-c");
            var recordEle = page.children(".htgrid-page-r"); //右侧文字提示区域
            var recordText = opt.recordText;
            if (data.length == 0) {
                recordEle.empty();
            } else {
                var text = recordText.replace("{0}", "1")
                    .replace("{1}", data.length)
                    .replace("{2}", data.length);
                recordEle.html(text);
            }
        },
        //通过行号删除行
        removeRows: function (rows, isPaging) {
            //如果传递进来的是数组
            if (rows instanceof Array) {
                //需要将rows进行排序，从大到小
                rows.sort(function (a, b) { if (parseInt(a) > parseInt(b)) { return -1 } else { return 1; } })
            } else {
                rows = [rows];
            }
            $.hgrid.removeRepeat(rows);
            var me = this;
            var opt = $(this)[0].p;
            var data = opt.data;
            var id = $(this).attr("id");
            var body = $("#" + id + "_body").children();
            var fbody = $("#" + id + "_fbody").children().children();
            var startNum = ((opt.currentpage || 1) - 1) * opt.rowNum;
            for (var i = 0; i < rows.length; i++) {
                var rowNum = rows[i];
                //删除内存数据中的数据
                if (isPaging === true) {
                    var type = data[rowNum - startNum - 1].type;
                }
                else {
                    var type = data[rowNum - 1].type;
                }

                if (isPaging === true) {
                    var removeData = data.splice(rowNum - startNum - 1, 1);
                }
                else {
                    var removeData = data.splice(rowNum - 1, 1);
                }

                if (type != "add") {
                    opt.removeData.push(removeData[0].cellattr);
                }

                if (isPaging === true) {
                    body.children(":eq(" + (rowNum - startNum) + ")").remove();
                    fbody.children(":eq(" + (rowNum - startNum) + ")").remove();
                }
                else {
                    body.children(":eq(" + rowNum + ")").remove();
                    fbody.children(":eq(" + rowNum + ")").remove();
                }
            }
            //重新处理行号
            $.hgrid.resetNum(id);
            if (isPaging === true) {
                $.hgrid.resetDataNum(id, startNum || 0);
            }
            else {
                $.hgrid.resetDataNum(id, 0);
            }
            //修改分页处的显示信息
            var page = $(me).nextAll(".htgrid-page-c");
            var recordEle = page.children(".htgrid-page-r"); //右侧文字提示区域
            var recordText = opt.recordText;
            if (data.length == 0) {
                recordEle.empty();
            } else {
                if (isPaging === true) {
                    var text = recordText.replace("{0}", startNum + 1)
                        .replace("{1}", startNum + data.length)
                        .replace("{2}", opt.records - (rows.length || 0));
                    recordEle.html(text);
                }
                else {
                    var text = recordText.replace("{0}", "1")
                        .replace("{1}", data.length)
                        .replace("{2}", data.length);
                    recordEle.html(text);
                }

            }
        },
        //移动行（参数rowNum:行号;position：first,last,before,after）
        moveGridRow: function (rowNum, position) {
            $(this).htGrid("saveEditCell");
            var id = $(this).attr("id");
            var opt = $(this)[0].p;
            var modelObj = opt.modelObj;
            var data = opt.data;
            var tbody = $("#" + id + "_body").children();
            var ftbody = $("#" + id + "_fbody").children().children();
            rowNum = rowNum - opt.rowNum * (opt.currentpage - 1);
            var seltr = tbody.children(":eq(" + rowNum + ")");
            var fseltr = ftbody.children(":eq(" + rowNum + ")");
            var selData = data[rowNum - 1];
            var postion;
            if (position == "first") {
                if (rowNum == 1) {
                    return;
                }
                position = 0;
            } else if (position == "before") {
                if (rowNum == 1) {
                    return;
                }
                position = rowNum - 2;
            } else if (position == "last") {
                if (rowNum == data.length) {
                    return;
                }
                position = data.length - 1;
            } else if (position == "after") {
                if (rowNum == data.length) {
                    return;
                }
                position = rowNum;
            }
            //处理数据
            data.splice(rowNum - 1, 1);
            data.splice(position, 0, selData);
            //处理dom
            var copytr = seltr.clone(),
                fcopytr = fseltr.clone();
            seltr.remove();
            fseltr.remove();
            //在新位置添加
            tbody.children(":eq(" + position + ")").after(copytr);
            ftbody.children(":eq(" + position + ")").after(fcopytr);
            //重置行号
            $.hgrid.resetNum(id);
            $.hgrid.resetDataNum(id);

            //如果有滚动条，则将滚动条自动滚动到选中行那里
            var top = copytr[0].offsetTop;
            $("#" + id + "_body").parent()[0].scrollTop = top;
            $("#" + id + "_fbody")[0].scrollTop = top;
        },
        //获取选中行的个数
        getSelectedNum: function () {
            var id = $(this).attr("id");
            var body = $("#" + id + "_body");
            var seltrs = body.find("tr.htgrid-row-select");
            return seltrs.length;
        },
        //获取选中行的行号
        getSelectedRowNum: function () {
            var id = $(this).attr("id");
            var body = $("#" + id + "_body");
            var seltrs = body.find("tr.htgrid-row-select");
            var arr = [];
            $.each(seltrs, function () {
                arr.push(parseInt($(this).find("td[rownum='rownum']").text()));
            });
            return arr;
        },
        //获取所有行的行号
        getAllRowsNum: function () {
            var id = $(this).attr("id");
            var body = $("#" + id + "_body");
            var trs = body.find("tr:gt(0)");
            var arr = [];
            $.each(trs, function () {
                arr.push(parseInt($(this).find("td[rownum='rownum']").text()));
            });
            return arr;
        },
        //获取正在编辑行的行号
        getEditRowNum: function () {
            var edittd = $(this).parent().find("td.htgrid-editing");
            if (edittd.length > 0) {
                return parseInt(edittd.parent().find("td[rownum='rownum']").text());
            } else {
                return "";
            }
        },
        //通过行号获取行数据
        getRowContentByIndex: function (rowNum) {
            var opt = $(this)[0].p;
            rowNum = rowNum - opt.rowNum * (opt.currentpage - 1);
            var data = opt.data;
            return data[rowNum - 1].cellattr;
        },
        //通过行号和列名获取单元格内容
        getCellContent: function (rowNum, column) {
            var opt = $(this)[0].p;
            rowNum = rowNum - opt.rowNum * (opt.currentpage - 1);
            var data = opt.data;
            return data[rowNum - 1].cellattr[column];
        },
        //获取编辑过的数据，且返回类型（编辑，删除或者新增）
        getEditData: function () {
            var opt = $(this)[0].p;
            var data = opt.data;
            var removeData = opt.removeData;
            var editData = [];
            var addData = [];
            $.each(data, function (i) {
                var obj = data[i];
                if (obj.type && obj.type == "add") {
                    addData.push(obj.cellattr);
                } else if (obj.type && obj.type == "edit") {
                    editData.push(obj.cellattr);
                }
            });
            return {
                "add": addData,
                "edit": editData,
                "remove": removeData
            };
        },
        //将列表数据的编辑状态置为正常状态,保存到客户端（即将编辑的数据的标示位等去掉）
        saveEditData: function () {
            var opt = $(this)[0].p;
            var data = opt.data;
            $.each(data, function (i) {
                data[i].type = '';
            });
            opt.removeData = [];
        },
        //获取当前列表是否处于编辑状态(是否有编辑过的但还未保存的数据)
        getEditStatus: function () {
            var opt = $(this)[0].p;
            var data = opt.data;
            var flag = false; //默认不是编辑状态
            $.each(data, function (i) {
                if (data[i].type == "add" || data[i].type == "edit") {
                    flag = true;
                    return false;
                }
            });
            if (opt.removeData.length > 0) {
                flag = true;
            }
            return flag;
        },
        //给单元格赋值
        setCellData: function (rowNum, colName, newObj, isEdit) {
            var id = $(this).attr("id");
            var opt = $(this)[0].p;
            var modelObj = opt.modelObj;
            var model = modelObj[colName];
            if (!model) {
                return;
            }
            var data = opt.data;
            rowNum = rowNum - opt.rowNum * (opt.currentpage - 1);
            if (rowNum > data.length) {
                return;
            }
            var value = $.extend(data[rowNum - 1].cellattr[colName], newObj);
            //dom修改
            var fbody = $("#" + id + "_fbody").children().children(),
                ftd = fbody.children("tr:eq(" + rowNum + ")").children("td[data-name='" + colName + "']"),
                body, td;
            if (ftd.length > 0) {
                td = ftd;
            } else {
                body = $("#" + id + "_body").children();
                td = body.children("tr:eq(" + rowNum + ")").children("td[data-name='" + colName + "']");
            }
            //进行数据校验
            var regex = "";
            var flag = true;
            if (value.Regex != null) {//如果单元格有校验格式数据
                regex = value.Regex;
            } else if (model.regex) {//如果列上有校验格式数据
                regex = model.regex;
            }
            if (regex) {//如果有校验数据格式,则进行校验
                //正则校验
                flag = $.hgrid.checkRegExp(regex, value, model);
                if (!flag) {//没有验证通过
                    value.regexStatus = false;
                } else {
                    value.regexStatus = true;
                }
            }
            //设置为编辑状态
            if (opt.cellEdit && isEdit == true && data[rowNum - 1].type != "add") {
                //if (value.OldColText != value.ColText) {
                if ((newObj.ColText != undefined ? (value.OldColText == newObj.ColText) : true) && (newObj.ColValue != undefined ? (value.OldColValue == newObj.ColValue) : true)) {
                    value.editType = false;
                } else {
                    value.editType = true;
                }
                var type = "";
                for (var key in data[rowNum - 1].cellattr) {
                    if (!data[rowNum - 1].cellattr.hasOwnProperty(key)) {
                        continue;
                    }
                    var obj = data[rowNum - 1].cellattr[key];
                    if (obj.editType) {
                        type = "edit";
                        break;
                    }
                }
                data[rowNum - 1].type = type;
            }
            //重新绘制当前单元格内容
            var newContent = $.hgrid.getFormatTd(opt, colName, value);
            td.empty().css({
                "background-color": value.BackgroundColor,
                'color': value.Color
            })
                .attr("title", model.showTitle ? value.ColText : "")
                .removeClass('htgrid-editing')
                .append(newContent);
            //如果是树节点td更新（且更新前是选中状态），还需还原节点选中状态
            var tr = td.parent();
            if (colName == opt.treeNode && tr.hasClass("htgrid-row-select")) {
                var check = td.find(".htgrid-treeNode-checkbox");
                var ptr = ftd.length > 0 ? $("#" + id + "_body").children().children("tr:eq(" + rowNum + ")").children("td[data-name='" + colName + "']") : [];
                $.hgrid.setCheckStatus(ptr, check, true);
            }
        },
        getRegexStatus: function () {
            var c = $(this).parent();
            return c.find(".htgrid-edit-error").length == c.find(".htgrid-edit-error:hidden").length ? true : false;
        },
    });


    $.hgrid.extend({
        getParentRowContent: function (rowNum) {
            var opt = $(this)[0].p,
                data = opt.data,
                level = data[rowNum - 1].cellattr[opt.treeNode].level;
            if (level == 0) {
                return {};
            }
            var obj;
            for (var i = rowNum - 2; i >= 0; i--) {
                if (data[i].cellattr[opt.treeNode].level == level - 1) {
                    obj = data[i].cellattr;
                    break;
                }
            }
            return obj;
        },
        addEditChildRow: function (parentNum, isSelect, obj, position) {
            var id = $(this).attr("id"),
                opt = $(this)[0].p,
                tbody = $("#" + id + "_body").children(),
                ftbody = $("#" + id + "_fbody").children().children(),
                modelObj = opt.modelObj,
                treeNode = opt.treeNode,
                data = opt.data,
                length = data.length,
                colModel = opt.colModel,
                parentTr, nodeImg, parentNode, treeNodeState, level;
            if (parentNum) {//如果有parentNum
                parentTr = tbody.children("tr:eq(" + parentNum + ")");
                nodeImg = parentTr.find(".htgrid-treeNode-img");
                parentNode = data[parentNum - 1].cellattr[treeNode];
                treeNodeState = parentNode.treeNodeState;
                level = parentNode.level;
                if (treeNodeState == "close") {//如果是关闭的
                    nodeImg.click();
                } else if (treeNodeState == "hidden") {
                    data[parentNum - 1].cellattr[treeNode].treeNodeState = "open";
                    nodeImg.removeClass("htgrid-teeeNode-close htgrid-teeeNode-hidden").addClass("htgrid-teeeNode-open");
                }
            } else {
                parentNum = 0;
                level = -1;
            }
            //定义cellattr对象
            var cellattr = {};
            $.each(colModel, function (i) {
                if (obj && obj.cellattr[colModel[i].name]) {
                    cellattr[colModel[i].name] = $.extend({ ColName: colModel[i].name, teeeNodeState: "hidden", level: level + 1 }, obj.cellattr[colModel[i].name]);
                } else {
                    cellattr[colModel[i].name] = { ColName: colModel[i].name, teeeNodeState: "hidden", level: level + 1 };
                }
            });

            var insertNum = parentNum;

            if (position == "last") {
                var isbottom = true;
                var nextBrotherTrs = data.slice(parentNum);
                $.each(nextBrotherTrs, function (i, item) {
                    var itemLevel = item.cellattr[treeNode].level;
                    if (itemLevel <= level) {
                        insertNum = item.cellattr.row_number - 1;
                        isbottom = false;
                        return false;
                    }
                });
                if (isbottom) {
                    insertNum = length;
                }
            }

            //opt绑定的data数据新增一条
            data.splice(insertNum, 0, {
                rowattr: {},
                cellattr: cellattr,
                type: "add"
            });
            $.hgrid.resetDataNum(id);
            //列表dom树新增一条数据
            var tr = $.hgrid.getTR(opt, data[insertNum], 0, 0);
            tbody.children(":eq(" + insertNum + ")").after(tr);
            var frozenCol = $.hgrid.getFrozenColumns(colModel);
            if (frozenCol.length > 0) {
                var ftr = $.hgrid.getTR(opt, data[insertNum], 0, 0, frozenCol);
                ftbody.children(":eq(" + insertNum + ")").after(tr);
            }
            //重置行号
            $.hgrid.resetNum(id);
            if (isSelect == undefined) isSelect = true;
            if (isSelect) {//选中当前行
                var selTr = tbody.children(":eq(" + (insertNum + 1) + ")"),
                    fselTr = ftbody.children(":eq(" + (insertNum + 1) + ")");
                $.hgrid.setTrStatus(selTr, selTr.find("span.htgrid-row-check"), false, opt);
                $.hgrid.setTrStatus(fselTr, fselTr.find("span.htgrid-row-check"), false, opt);
            }
            //修改分页处的显示信息
            var page = $(this).nextAll(".htgrid-page-c");
            var recordEle = page.children(".htgrid-page-r"); //右侧文字提示区域
            var recordText = opt.recordText;
            var text = recordText.replace("{0}", "1")
                .replace("{1}", data.length)
                .replace("{2}", data.length);
            recordEle.html(text);

            var addTr = tbody.children("tr:eq(" + (insertNum + 1) + ")"),
                addFrozenTr = ftbody.children("tr:eq(" + (insertNum + 1) + ")");
            //校验新增的数据是否符合校验规则
            $.each(addTr.children("td"), function () {
                var td = $(this),
                    colName = td.attr("data-name"),
                    value = cellattr[colName],
                    model = modelObj[colName];
                if (colName && !model.frozen &&
                    (value.editable || (value.editable === undefined && model.editable))) {
                    var regex = "";
                    if (value.Regex) {//如果单元格有校验格式数据
                        regex = value.Regex;
                    } else if (model.regex) {//如果列上有校验格式数据
                        regex = model.regex;
                    }
                    if (regex) {//如果有校验数据格式,则进行校验
                        //首先判断regex是否是多个AND拼接而成的，如果是，说明是多个正则
                        var regexArr = regex.split('AND');
                        var flag = true;
                        flag = $.hgrid.checkRegExp(regex, value, model);
                        if (!flag) {//没有验证通过
                            value.regexStatus = false;
                            td.empty().append($.hgrid.getFormatTd(opt, colName, value));
                        }
                    }
                }
            });
            $.each(addFrozenTr.children("td"), function () {
                var td = $(this),
                    colName = td.attr("data-name"),
                    value = cellattr[colName],
                    model = modelObj[colName];
                if (colName &&
                    (value.editable || (value.editable === undefined && model.editable))) {
                    var regex = "";
                    if (value.Regex) {//如果单元格有校验格式数据
                        regex = value.Regex;
                    } else if (model.regex) {//如果列上有校验格式数据
                        regex = model.regex;
                    }
                    if (regex) {//如果有校验数据格式,则进行校验
                        //首先判断regex是否是多个AND拼接而成的，如果是，说明是多个正则
                        var regexArr = regex.split('AND');
                        var flag = true;
                        for (var k = 0; k < regexArr.length; k++) {
                            var reg = new RegExp($.trim(regexArr[k]));
                            if (!reg.test($.trim(value.ColText))) {//没有验证通过
                                flag = false;
                                break;
                            }
                        }
                        if (!flag) {//没有验证通过
                            value.regexStatus = false;
                            td.empty().append($.hgrid.getFormatTd(opt, colName, value));
                        }
                    }
                }
            });
            //进行聚焦第一个编辑td且使这个td进入编辑状态
            //获取第一个可以编辑的列名
            var editName;
            for (var i = 0; i < colModel.length; i++) {
                var name = colModel[i].name;
                if (cellattr[name] && cellattr[name].editable == true && !modelObj[name].hidden) {//先判断数据里面是否已经设置为可以编辑
                    editName = name;
                    break;
                }
                //数据里面没设置是否能编辑且列里面设置能编辑
                if (((cellattr[name] && cellattr[name].editable != false) || (!cellattr[name])) && modelObj[name].editable == true && !modelObj[name].hidden) {
                    editName = name;
                    break;
                }
            }
            if (editName) {
                var ftd = addFrozenTr.children("[data-name='" + editName + "']");
                if (ftd.length > 0) {
                    addFrozenTr.children("[data-name='" + editName + "']").click();
                } else {
                    addTr.children("[data-name='" + editName + "']").click();
                }
            }
        },
        getTreeEditData: function () {
            var me = $(this),
                id = me.attr("id"),
                opt = me[0].p,
                data = opt.data,
                removeData = opt.removeData || [],
                editData = [],
                addData = [],
                nodeName = opt.treeNode;
            for (var i = 0; i < data.length; i++) {
                var level, obj;
                if (data[i].type && data[i].type == "add") {
                    obj = data[i].cellattr;
                    level = obj[nodeName].level;
                    obj.parentNodeData = getParentNodeData(i, data, level, nodeName);
                    i = getChildren(i, data, level, obj, nodeName);
                    addData.push(obj);
                } else if (data[i].type && data[i].type == "edit") {
                    editData.push(data[i].cellattr);
                }
            }
            function getParentNodeData(i, data, level, nodeCellName) {
                if (level == 0) {
                    return null;
                }
                for (var k = i; k > -1; k--) {
                    if (data[k].cellattr[nodeCellName].level == level - 1) {
                        return data[k].cellattr;
                    }
                }
            }
            function getChildren(i, data, level, obj, nodeCellName) {
                var k;
                for (k = i + 1; k < data.length; k++) {
                    if (data[k].cellattr[nodeCellName].level == (level + 1)) {
                        i++;
                        var newobj = data[k].cellattr;
                        k = getChildren(k, newobj[nodeCellName].level, newobj, nodeCellName);
                        obj.children = (obj.children || []);
                        obj.children.push(newobj);
                    } else {
                        break;
                    }
                }
                return i;
            }
            return {
                "add": addData,
                "edit": editData,
                "remove": removeData
            }
        },
        removeChildRows: function (parentNum) {
            //获取选中行
            var me = this,
                opt = $(this)[0].p,
                data = opt.data,
                id = $(this).attr("id"),
                treeNode = opt.treeNode,
                parentNode = data[parentNum - 1].cellattr[treeNode],
                body = $("#" + id + "_body"),
                fbody = $("#" + id + "_fbody").children(),
                childArr = [];
            //获取parentNum的子数据
            for (var i = parentNum; i < data.length; i++) {
                var child = data[i].cellattr[treeNode];
                if (child.level > parentNode.level) {
                    childArr.unshift(i);
                } else {
                    break;
                }
            }
            if (childArr.length == 0) return;
            for (var i = 0; i < childArr.length; i++) {
                var index = childArr[i];
                var type = data[index].type;
                var removeData = data.splice(index, 1);
                if (type != "add") {
                    opt.removeData.push(removeData[0].cellattr);
                }
                //处理dom
                body.children().children(":eq(" + (index + 1) + ")").remove();
                fbody.children().children(":eq(" + (index + 1) + ")").remove();
            }
            //重新处理行号
            $.hgrid.resetNum(id);
            $.hgrid.resetDataNum(id);
            //修改分页处的显示信息
            var page = $(me).nextAll(".htgrid-page-c");
            var recordEle = page.children(".htgrid-page-r"); //右侧文字提示区域
            var recordText = opt.recordText;
            var text = recordText.replace("{0}", "1")
                .replace("{1}", data.length)
                .replace("{2}", data.length);
            recordEle.html(text);
        },
        getRowsByParam: function (column, text) {
            var opt = $(this)[0].p,
                data = opt.data,
                arr = [];
            for (var i = 0; i < data.length; i++) {
                var obj = data[i].cellattr;
                for (var key in obj) {
                    if (!obj.hasOwnProperty(key)) {
                        continue;
                    }
                    if (key == column && text == obj[key].ColText) {
                        arr.push(obj);
                    }
                }
            }
            return arr;
        },
        getRootRows: function () {
            var opt = $(this)[0].p,
                data = opt.data,
                treeNode = opt.treeNode,
                arr = [];
            for (var i = 0; i < data.length; i++) {
                var obj = data[i].cellattr;
                if (obj[treeNode].level == 0) {
                    arr.push(obj);
                }
            }
            return arr;
        },
        expandNode: function (rowNum, flag) {
            var me = $(this),
                id = me.attr("id"),
                opt = me[0].p,
                data = opt.data,
                node = data[rowNum - 1].cellattr[opt.treeNode],
                nodeImg;
            if ((flag && node.treeNodeState == "close") || (!flag && node.treeNodeState == "open")) {//要展开且当前节点是折叠的
                nodeImg = $("#" + id + "_body").children().children(":eq(" + rowNum + ")").find(".htgrid-treeNode-img");
                nodeImg.click();
            }
        },
        expandAll: function (flag) {
            var me = $(this),
                id = me.attr("id"),
                opt = me[0].p,
                treeNode = opt.treeNode,
                data = opt.data,
                body = $("#" + id + "_body").children(),
                fbody = $("#" + id + "_body").children().children();
            if (flag) {//如果全部展开
                for (var i = 0; i < data.length; i++) {
                    var teeeNodeState = data[i].cellattr[treeNode].teeeNodeState;
                    if (teeeNodeState == "close") {
                        data[i].cellattr[treeNode].teeeNodeState = "open";
                    }
                }
                body.find(".htgrid-teeeNode-close").addClass("htgrid-teeeNode-open").removeClass("htgrid-teeeNode-close");
                fbody.find(".htgrid-teeeNode-close").addClass("htgrid-teeeNode-open").removeClass("htgrid-teeeNode-close");
                body.children().css("display", "table-row");
                fbody.children().css("display", "table-row");
            } else {
                var trs = body.children();
                var ftrs = fbody.children();
                for (var i = 0; i < data.length; i++) {
                    var node = data[i].cellattr[treeNode];
                    if (node.teeeNodeState == "open") {
                        data[i].cellattr[treeNode].teeeNodeState = "close";
                    }
                    if (node.level > 0) {
                        $(trs[i + 1]).css("display", "none");
                        $(ftrs[i + 1]).css("display", "none");
                    }
                }
                body.find(".htgrid-teeeNode-open").addClass("htgrid-teeeNode-close").removeClass("htgrid-teeeNode-open");
                fbody.find(".htgrid-teeeNode-open").addClass("htgrid-teeeNode-close").removeClass("htgrid-teeeNode-open");
            }
        },
        getPreNodeRow: function (rowNum) {
            var me = $(this),
                id = me.attr("id"),
                opt = me[0].p,
                data = opt.data,
                treeNode = opt.treeNode,
                node = data[rowNum - 1].cellattr[treeNode],
                obj = null;
            if (rowNum == 1) {
                return obj;
            }
            var robj = data[rowNum - 2].cellattr[treeNode];
            if (robj.level == node.level) {
                obj = robj;
            }
            return obj;
        },
        getNextNodeRow: function (rowNum) {
            var me = $(this),
                id = me.attr("id"),
                opt = me[0].p,
                data = opt.data,
                length = data.length,
                treeNode = opt.treeNode,
                node = data[rowNum - 1].cellattr[treeNode],
                obj = null;
            if (rowNum == length) {
                return obj;
            }
            var robj = data[rowNum].cellattr[treeNode];
            if (robj.level == node.level) {
                obj = robj;
            }
            return obj;
        },
        getNodeIndex: function (rowNum) {
            var me = $(this),
                opt = me[0].p,
                treeNode = opt.treeNode,
                data = opt.data,
                node = data[rowNum - 1].cellattr[treeNode];
            if (rowNum == 1) {
                return 0;
            }
            var index = 0;
            for (var i = rowNum - 2; i >= 0; i--) {
                var preNode = data[i].cellattr[treeNode];
                if (preNode.level == node.level - 1) {
                    break;
                }
                if (preNode.level == node.level) {
                    index++;
                }
            }
            return index;
        },
        getChildRows: function (rowNum) {
            var me = $(this),
                id = me.attr("id"),
                opt = me[0].p,
                data = opt.data,
                length = data.length,
                treeNode = opt.treeNode,
                node = data[rowNum - 1].cellattr[treeNode],
                arr = [];
            for (var i = rowNum; i < length; i++) {
                var preNode = data[i].cellattr[treeNode];
                if (preNode.level == node.level + 1) {
                    arr.push(data[i].cellattr);
                }
                if (preNode.level == node.level) {
                    break;
                }
            }
            return arr;
        },
        getNodeStatus: function (rowNum) {
            var opt = $(this)[0].p;
            return opt.data[rowNum - 1].cellattr[opt.treeNode].treeNodeState;
        },
        updateNodeImage: function (rowNum, iconArr) {
            var me = $(this),
                id = me.attr("id"),
                opt = me[0].p,
                treeNode = opt.treeNode,
                icons = opt.data[rowNum - 1].cellattr[treeNode].Icons,
                td = $("#" + id + "_body").children().children("tr:eq(" + rowNum + ")").children("td[data-name='" + treeNode + "']"),
                ftd = $("#" + id + "_fbody").children().children().children("tr:eq(" + rowNum + ")").children("td[data-name='" + treeNode + "']");
            var node = td.children(".htgrid-node-td");
            var fnode = ftd.children(".htgrid-node-td");
            var oldImgNum = node.find(".htgrid-treeNode-aimg").length;
            node.find(".htgrid-treeNode-aimg").remove();
            fnode.find(".htgrid-treeNode-aimg").remove();
            for (var i = 0; i < iconArr.length; i++) {
                var icon = iconArr[i].Icon,
                    iconTitle = iconArr[i].Title,
                    iconStyle = '', iconClass = '';
                if (icon.indexOf("~") == 0) {//路径
                    //26082 李金岳
                    iconStyle = 'style="background:url(' + icon.replace("~", PageInit.WebRootPath) + ') center no-repeat;background-size: 100% 100%"';
                } else {//雪碧图
                    iconClass = HoteamUI.Common.GetImage(icon, 16);
                }
                var img = '<span title="' + iconTitle + '" class="htgrid-treeNode-aimg basesprite ' + iconClass + '" ' + iconStyle + '></span>';
                node.append(img);
                if (fnode && fnode.length > 0) {
                    fnode.append(img);
                }
            }
            opt.data[rowNum - 1].cellattr[treeNode].Icons = iconArr;
        },
        getTopSelectedRows: function () {
            var getTopNum = function (index) {
                var level = data[index - 1].cellattr[treeNode].level;
                while (level > 0) {
                    var node = getParentNode(index, level--);
                    if ($(trs[node.row_number]).hasClass("htgrid-row-select")) {
                        index = node.row_number;
                    }
                }
                return index;
            }

            var getParentNode = function (index, level) {
                for (var i = index - 2; i >= 0; i--) {
                    if (data[i].cellattr[treeNode].level == level - 1) {
                        return data[i].cellattr;
                    }
                }
            }

            var id = $(this).attr("id");
            var opt = $(this)[0].p;
            var treeNode = opt.treeNode;
            var data = opt.data;
            var tbody = $("#" + id + "_body").children();
            var trs = tbody.children();
            var selTrs = tbody.children("tr.htgrid-row-select");
            var arr = [];
            selTrs.each(function (i) {
                var index = $(this).index();
                if (index == 1) {
                    arr.push(index);
                } else {
                    arr.push(getTopNum(index));
                }
            });
            $.hgrid.removeRepeat(arr.sort());
            var rtnArr = [];
            for (var i = 0; i < arr.length; i++) {
                rtnArr.push(data[arr[i] - 1].cellattr);
            }

            return rtnArr;
        }
    });
}));

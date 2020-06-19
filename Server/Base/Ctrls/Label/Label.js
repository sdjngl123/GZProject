HoteamUI.Control.OLabel = {
    Create: function (options) {
        var me = this;
        options = options || {};
        //设置参数 
        var parentId = this.id;
        var id = this.id + "_Label";
        var CtrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions;
        var o = $.extend(true, {}, $.hoteamLabel.defaults, CtrlOptions);
        o.parentId = parentId;
        o.autofit = options.autofit;
        o.id = id;
        if (o.textId) {
            //o.value = HoteamUI.Language.Lang(o.textId);
            //判断标签label是否能获取到多语言，获取不到则取textId的值 modify by hw
            var lbtext = HoteamUI.Language.Lang(o.textId, "", false);
            o.value = lbtext != "" ? lbtext : o.textId;
        }
        if (o.prefix) {
            o.prefix = HoteamUI.Language.Lang(o.prefix);
        }
        if (o.suffix) {
            o.suffix = HoteamUI.Language.Lang(o.suffix);
        }
        //事件参数
        var handlers = (options.controlInfo || this.ControlInfo()).PageHandlers;
        o.event = {};
        o.event.hoteamCtrl = this;
        $.each(handlers, function (index, val) {
            if (val.HandlerName == "OnClick") {
                o.onclick = me.GetEventFunctionName("OnClick");
            }
        });
        //创建
        $.hoteamLabel.create(o);
    },
    SetText: function (text, prefix, suffix) {
        var id = this.id + "_Label";
        var Label = $("#" + id);
        var wrap = Label.data("wrap");

        text = (prefix || "") + (text || "") + (suffix || "");

        Label.attr("title", text);
        if (wrap == true) {
            $.hoteamLabel.setTextForWrap(Label, text);
        }
        else {
            text = text.replace(/\r\n/g, "").replace(/\n/g, "");
            $("#" + id).text(text);
        }

    },
    GetText: function () {
        var id = this.id + "_Label";
        return $("#" + id).attr("title");
    },
    GetLabelText: function () {
        var id = this.id + "_Label";
        return $("#" + id).text();
    },
    Resize: function () {

    },
    SetCss: function (key, value) {
        var id = this.id + "_Label";
        $("#" + id).css(key, value);
    },
    WritingMode: function (text) {
        return $.hoteamLabel.writingMode(text);
    },
    ReplaceSpaceWidthSpan: function (text, indent, elem) {
        return $.hoteamLabel.replaceSpaceWidthSpan(text, indent, elem);
    }
};


{
    (function ($) {
        $.hoteamLabel = {
            defaults: {
                parentId: null,
                value: null,
                id: null,
                position: "left",
                color: undefined,
                wrap: false,
                bold: false,
                prefix: "",
                suffix: ""
            },
            create: function (options) {
                var o = $.extend({}, $.hoteamLabel.defaults, options);
                var Label, labelCla = '';
                if (o.onclick) {
                    labelCla = "label-line";
                }
                if (o.wrap == true) {
                    Label = '<div  id = "' + o.id + '"' + ' class="hoteam-label hoteam-label-wrap ' + labelCla + '" ></div>';
                }
                else {
                    Label = '<div  id = "' + o.id + '"' + ' class="hoteam-label hoteam-label-nowrap ' + labelCla + '" ></div>';
                }
                if (o.autofit) {
                    $("#" + o.parentId).css("height", 40);
                }
                //设置文本及定位
                document.getElementById(o.parentId).innerHTML += Label;

                Label = $("#" + o.id);
                var position = o.position.split(',');
                Label.css("text-align", position[0]);
                if (position[1] == "top") {
                    Label.css("top", "0").css("margin-top", "0");
                }

                if (o.bold === "true" || o.bold) {
                    Label.css("font-weight", "bold");
                }

                if (o.fontSize) {
                    Label.css("font-size", o.fontSize);
                }

                if (o.color) {
                    Label.css("color", o.color);
                }

                var text = (o.prefix || "") + (o.value || "") + (o.suffix || "");
                if (o.wrap) {
                    Label.data("wrap", true);
                    this.setTextForWrap(Label, text);
                }
                else {
                    text = text.replace(/\r\n/g, "").replace(/\n/g, "");
                    Label.text(text);
                }

                Label.attr("title", o.value || "");
                if (o) {
                    Label.on("click", function () {
                        HoteamUI.Common.ExeFunction(o.onclick, { o: o.event.hoteamCtrl });
                    });
                }

            }, //
            setTextForWrap: function (label, text) {
                if (text == null || text == undefined) {
                    text = "";
                }
                var textList = text.split("\\n");
                if (textList.length > 1) {
                    for (var i = 0; i < textList.length; i++) {
                        label[0].innerHTML += "<span></span>";
                        label.find("span:last").text(textList[i]);
                        label[0].innerHTML += "</br>";
                    }
                }
                else {
                    label.text(text);
                }
            },
            //竖排换行文字
            writingMode: function (text) {
                var valueText = text;
                var childTextArr = valueText.split('\n');
                if (childTextArr && childTextArr.length > 0) {
                    for (var j = 0; j < childTextArr.length; j++) {
                        childTextArr[j] = childTextArr[j].split('').join('<br/>');
                        childTextArr[j] = '<p>' + childTextArr[j] + '</p>';
                    }
                    valueText = childTextArr.join('');
                }

                return valueText;
            },
            //替换空格为span
            replaceSpaceWidthSpan: function (text, indent, elem) {
                var returnText = '';
                if (indent != "auto") {
                    if (indent) {
                        indent = indent + '';
                        if (indent.indexOf("px") > -1) {
                            indent = indent.split("px")[0];
                        }
                    } 
                    var spanHtml = '<span style="margin-left:' + indent + 'px"></span>';
                    //如果有竖排则不替换，没有竖排则替换
                    if (text.indexOf('<br/>') < 0) {
                        //var returnText = text.replace(/\n/g, '<br/>').replace(/\s{1}/g, spanHtml);
                        var returnText = text.replace(/\n/g, '<br/>');
                        var returnTextArr = returnText.split("<br/>");
                        for (var t = 0; t < returnTextArr.length; t++) {
                            var returnTextArrt = returnTextArr[t];
                            var returnTextArrtLeft = returnTextArrt.split('');
                            for (var w = 0; w < returnTextArrtLeft.length; w++) {
                                if (returnTextArrtLeft[w] == ' ') {
                                    returnTextArrtLeft[w] = spanHtml;
                                } else {
                                    break;
                                }
                            }
                            var returnTextArrtRight = returnTextArrtLeft.reverse();
                            for (var r = 0; r < returnTextArrtRight.length; r++) {
                                if (returnTextArrtRight[r] == ' ') {
                                    returnTextArrtLeft[r] = spanHtml;
                                } else {
                                    break;
                                }
                            }
                            returnTextArr[t] = '<span style="display:block;">' + returnTextArrtRight.reverse().join('') + '</span>';

                        }


                        /*for (var q = 0; q < returnTextArr.length; q++) {
                            returnTextArr[q] = '<span style="display:block;">' + returnTextArr[q] + '</span>';
                        }*/
                        returnText = returnTextArr.join('');
                    } else {
                        returnText = text;
                    }
                } else {
                    var textLineArr = text.split('\n'), leftNum = 0, rightNum = 0, muchLine = false;
                    var parentWidth = elem.parent().parent().parent().width(), elemChildWidth;
                    elem.children().css({ "width": parentWidth + 'px',"position":"relative" });
                    if (textLineArr.length > 1) {
                        muchLine = true;
                    }
                    //elem.parent().parent().parent().css({ "position": "relative" });
                    for (var j = 0; j < textLineArr.length; j++) {
                        textArr = textLineArr[j].split('');
                        //计算左边空格数
                        leftNum = returnNotIsEmpty(textArr);
                        textArr.splice(0, leftNum);
                        //计算右边空格数
                        var reverseTextArr = textArr.reverse();
                        rightNum = returnNotIsEmpty(reverseTextArr);
                        reverseTextArr.splice(0, rightNum);
                        text = textArr.reverse().join('');
                        //分三种情况
                        //左有右无，直接定位到右侧
                        if (leftNum != 0 && rightNum == 0) {
                            text = '<span style="display:inline-block;position:relative;right:0;">' + text + '</span>';
                            
                        } else if (leftNum == 0 && rightNum != 0) {//左无右有，不处理
                            text = '<span>' + text + '</span>';
                        } else if (leftNum != 0 && rightNum != 0) {//左有右有，按百分比
                                var leftPersent = leftNum / (leftNum + rightNum)*100+'%';
                                /*setTimeout(function () {
                                    elemChildWidth = elem.find("span").eq(j).width();
                                    elem.find("span").eq(j).css({ "position": "relative", "left": (parentWidth - elemChildWidth) * leftPersent + 'px' });
                                }, 600)*/
                                text = '<span style="display:inline-block;position:relative;padding-left:' + leftPersent + '">' + text + '</span>';
                            

                        }
                        returnText += text;
                    }

                }
                return returnText;

                //返回数组第一个不为空的下标
                function returnNotIsEmpty(arr) {
                    var returnIndex = 0;
                    if (arr && arr.length > 0) {
                        for (var i = 0; i < arr.length; i++) {
                            if (arr[i] != ' ') {
                                returnIndex = i;
                                break;
                            }
                        }
                    }
                    return returnIndex;
                }
            }
        }
    })(jQuery);
}
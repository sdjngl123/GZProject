
HoteamUI.Control.OCheckboxPad = {
    Create: function (options) {
        options = options || {};
        var self = this;
        var parentId = this.id;
        $("#" + parentId).parent().css("overflow", "auto");
        var ctrlEvent = {};
        ctrlEvent.o = this;
        //记录事件
        var handlers = (options.controlInfo || this.ControlInfo()).PageHandlers;
        //判断参数里面有没有单选标记
        if (options.radioMark) {
            checkBoxPadIsRadio.isRadio = true;
        }

        $("#" + this.id).data("disable", options.disable);
        $.each(handlers, function (index, val) {

            if (val.HandlerName == "OnClick" && !(options.disable === true)) {
                var onClick = self.GetEventFunctionName("OnClick");
                $("#" + parentId).on("click", ".button", function () {
                    ctrlEvent.value = $(this).attr("value");
                    ctrlEvent.name = $(this).attr("id");
                    HoteamUI.Common.ExeFunction(onClick, ctrlEvent);
                });
            } else if (val.HandlerName == "OnCreate") {
                HoteamUI.Common.ExeFunction(self.GetEventFunctionName("OnCreate"), ctrlEvent);
            }
        });
    },
    Disable: function () {
        var parentId = this.id;
        $("#" + parentId).data("checkboxpadEnable", false);
        $("#" + parentId).find(".chk").each(function () {
            var currentObject = $(this);
            var currentValue = currentObject.attr("value");
            if (currentValue == 1 || currentValue == "1") {
                currentObject.attr("class", "button chk checkbox_true_full_disable");
            }
            else if (currentValue == 2 || currentValue == "2") {

                currentObject.attr("class", "button chk checkbox_true_part_disable");
            }
            else if (currentValue == 0 || currentValue == "0") {
                currentObject.attr("class", "button chk checkbox_false_full_disable");
            }
        });
    },
    Enable: function () {
        var parentId = this.id;
        $("#" + parentId).data("checkboxpadEnable", true);
        $("#" + parentId).find(".chk").each(function () {
            var currentObject = $(this);
            var currentValue = currentObject.attr("value");
            if (currentValue == 1 || currentValue == "1") {
                currentObject.attr("class", "button chk checkbox_true_full");
            }
            else if (currentValue == 2 || currentValue == "2") {

                currentObject.attr("class", "button chk checkbox_true_part");
            }
            else if (currentValue == 0 || currentValue == "0") {
                currentObject.attr("class", "button chk checkbox_false_full");
            }
        });
    },
    //加载数据
    LoadData: function (data) {

        //data.Name    标识  字符串
        //data.Text    文本  字符串
        //data.Value   值    字符串（0  1  2）

        var parentId = this.id;
        var disable = $("#" + this.id).data("disable");
        //配置信息
        var options = this.ControlInfo().CtrlOptions;
        var colNum = options.ColNum; //列数
        $("#" + parentId).data("OCheckboxPad_changeMode", options.ChangeMode); //三态  两态（缓存）
        var defaultCheckState = options.DefaultCheckState;  //默认选中状态

        if (!data) {
            return;
        }

        //计算数据长度
        var dataLength = data.length;

        //遍历数据
        var htmlStr = "";

        htmlStr += "<table id='OCheckboxPadTable" + this.id + "' width='100%' " + (disable ? " class='CheckboxPad-disable' " : "") + " >";

        var flag = 0;
        for (i in data) {
            var dataName = data[i].Name;
            var dataText = data[i].Text;
            var dataValue = data[i].Value;

            //生成td内容
            var tdHtml = ""
            tdHtml += "<span id='" + dataName + "'";
            if (dataValue == "") {
                dataValue = defaultCheckState;  //data[i].Value如果没有值，则赋值为默认值
            }
            if (dataValue == 1 || dataValue == "1") {
                tdHtml += " class='button basesprite b-checkbox-true-full' value='1' ";
            }
            else if (dataValue == 2 || dataValue == "2") {
                tdHtml += " class='button basesprite b-checkbox-true-part' value='2' ";
            }
            else if (dataValue == 0 || dataValue == "0") {
                tdHtml += " class='button basesprite b-checkbox-false-full' value='0' ";
            }

            if (!(disable === true)) {
                tdHtml += " onclick='CheckboxPadCheckboxChangeClick(\"" + dataName + "\",\"" + parentId + "\")' ";
            }
            tdHtml += "></span > ";
            tdHtml += dataText;


            //第一个
            if (flag == 0) {
                htmlStr += "<tr><td>";
                htmlStr += tdHtml;
                htmlStr += "</td>";
            }
            //一列
            else if (colNum === 1 || colNum === "1") {
                htmlStr += "</tr><tr>";
                htmlStr += "<td>";
                htmlStr += tdHtml;
                htmlStr += "</td>";
                htmlStr += "</tr><tr>";
            }
            //最后一个
            else if (flag == dataLength - 1) {
                htmlStr += "<td>";
                htmlStr += tdHtml;
                htmlStr += "</td>";

                //补齐这一行
                for (var j = 0; j < colNum - (flag + 1) % colNum; j++) {
                    htmlStr += "<td>&nbsp;</td>";
                }

                htmlStr += "</tr>";
            }
            //换行节点
            else if ((flag + 1) % colNum == 0) {
                htmlStr += "<td>";
                htmlStr += tdHtml;
                htmlStr += "</td></tr><tr>";
            }
            //普通节点
            else {
                htmlStr += "<td>";
                htmlStr += tdHtml;
                htmlStr += "</td>";
            }

            flag++;

        }
        htmlStr += "</table>";

        //添加
        $("#" + parentId).html(htmlStr);
    },

    //设置数据
    SetData: function (data) {

        //data.Name    标识  字符串
        //data.Value   值    字符串（0  1  2）

        for (i in data) {
            var currentObject = $('[id="' + this.id + '"]').find('[id="' + data[i].Name + '"]');
            var currentValue = data[i].Value;

            if (currentValue == 1 || currentValue == "1") {
                currentObject.attr("class", "button basesprite b-checkbox-true-full");
                currentObject.attr("value", "1");
            }
            else if (currentValue == 2 || currentValue == "2") {
                currentObject.attr("class", "button basesprite b-checkbox-true-part");
                currentObject.attr("value", "2");
            }
            else if (currentValue = 0 || currentValue == "0") {
                currentObject.attr("class", "button basesprite b-checkbox-false-full");
                currentObject.attr("value", "0");
            }
        }
    },

    //返回数据
    GetData: function (values) {

        //values  格式如：“0,1,2”、“0,1”、“0”

        var resultArray = new Array();

        var i = 0;
        $("#OCheckboxPadTable" + this.id + " span").each(function () {

            var currentName = $(this).attr("id");
            var currentValue = $(this).attr("value");

            if (values.indexOf(currentValue) >= 0) {
                var currentResult = { "Name": currentName, "Value": currentValue };
                resultArray[i] = currentResult;

                i++;
            }
        });

        return resultArray;
    },//获取选中的项
    GetSelectData: function () {
        var resultArray = new Array();
        var i = 0;
        $("#OCheckboxPadTable" + this.id + " span").each(function () {
            var currentName = $(this).attr("id");
            var currentValue = $(this).attr("value");

            if (currentValue == '1') {
                var currentResult = { "Name": currentName, "Value": currentValue };
                resultArray[i] = currentResult;
                i++;
            }
        });
        return JSON.stringify(resultArray);
    },
    SetServerData: function (serverData) {
        if (serverData && serverData.length > 0) {
            var data = JSON.parse(serverData);
            for (i in data) {
                var currentObject = $('[id="' + this.id + '"]').find('[id="' + data[i].Name + '"]');
                var currentValue = data[i].Value;

                if (currentValue == 1 || currentValue == "1") {
                    currentObject.attr("class", "button basesprite b-checkbox-true-full");
                    currentObject.attr("value", "1");
                }
                else if (currentValue == 2 || currentValue == "2") {
                    currentObject.attr("class", "button basesprite b-checkbox-true-part");
                    currentObject.attr("value", "2");
                }
                else if (currentValue = 0 || currentValue == "0") {
                    currentObject.attr("class", "button basesprite b-checkbox-false-full");
                    currentObject.attr("value", "0");
                }
            }
        }
    }

};
var checkBoxPadIsRadio = {
    //单选还是多选标记
    isRadio: false,
};

//checkbox 三态转换
function CheckboxPadCheckboxChangeClick(id, parentId) {
    var currentObject = $("#" + parentId).find('[id="' + id + '"]');
    var currentValue = currentObject.attr("value");
    var enable = $("#" + parentId).data("checkboxpadEnable");
    if (enable === false) {
        return;
    }
    //两态 三态
    var changeMode = $("#" + parentId).data("OCheckboxPad_changeMode");

    if (currentValue == 1 || currentValue == "1") {
        currentObject.attr("class", "button basesprite b-checkbox-false-full");
        currentObject.attr("value", "0");
    }
    else if (currentValue == 2 || currentValue == "2") {
        currentObject.attr("class", "button basesprite b-checkbox-true-full");
        currentObject.attr("value", "1");
    }
    else if (currentValue == 0 || currentValue == "0") {
        if (changeMode == "3") {
            currentObject.attr("class", "button basesprite b-checkbox-true-part");
            currentObject.attr("value", "2");
        }
        else if (changeMode == "2") {
            currentObject.attr("class", "button basesprite b-checkbox-true-full");
            currentObject.attr("value", "1");
        }
    }
    //增加判断是单选还是多选
    if (checkBoxPadIsRadio.isRadio == true) {
        var currentObjectArr = currentObject.parents("tr").siblings().find(currentObject[0].tagName);
        var selfLine = currentObject.parent().siblings().find(currentObject[0].tagName);
        for (var j = 0, lenj = selfLine.length; j < lenj; j++) {
            currentObjectArr.push(selfLine[j]);
        }
        if (currentObjectArr && currentObjectArr.length > 0) {
            for (var i = 0, leni = currentObjectArr.length; i < leni; i++) {
                $(currentObjectArr[i]).attr("class", "button basesprite b-checkbox-false-full");
                $(currentObjectArr[i]).attr("value", "0");
            }
        }
    }
}
{
    (function ($) {
        $.hoteamToolTip = {
            defaults: {
                id: null,
                text: null,
                regex: null
            },
            create: function (options) {
                var id = options.id;
                var checkCtrl = $("#" + id);
                var checkSignId = id + "_check";

                checkCtrl.after('<span class="ui-state-error hoteam-form-check" style="border:0px;"><span style="color:red" class="basesprite b-warn" id="' + checkSignId + '"/></span>');
                var regex = options.regex;
                //var text = options.regextipId ? HoteamUI.Language.Lang(options.regextipId) : "";
                //增加判断从多语言获取，如果没有获取到则取regextipId的值
                var dic = HoteamUI.Language.Lang(options.regextipId);
                var text = dic != "" ? dic : options.regextipId;

                var checkSign = $("#" + checkSignId)
                .data("regex", regex)
                .data("show", false)
                .poshytip({
                    content: text,
                    alignTo: 'target',
                    alignX: 'inner-left',
                    slide: false,
                    offsetX: -16,
                    offsetY: 1
                })
                .hide();
            },
            check: function (id, inputText, changeSize) {
                if (inputText == null || inputText == undefined) {
                    inputText = "";
                }
                var check = true;
                var checkCtrl = $("#" + id);
                var checkSign = $("#" + id + "_check");
                var regex = checkSign.data("regex");
                if (regex && regex != "") {
                    var regArray = regex.split("AND");
                    //for (var i in regArray) {
                    for (var i = 0; i < regArray.length;i++){
                        var currentReg = $.trim(regArray[i]);
                        if (currentReg && currentReg != "") {
                            var reg = new RegExp(currentReg);
                            if (!reg.test(inputText)) {
                                this.show(checkCtrl, checkSign, changeSize);
                                check = false;
                                return check;
                            }
                            else {
                                this.hide(checkCtrl, checkSign, changeSize);
                            }
                        }
                    }
                }
                return check;
            },
            show: function (checkCtrl, checkSign, changeSize) {
                var show = checkSign.data("show");
                if (show != true) {
                    if (changeSize != false) {
                        checkCtrl.css("width", checkCtrl.parent().width() - 25);
                    }
                    
                }
                checkSign.data("show", true).css("display", "block");
            },
            hide: function (checkCtrl, checkSign, changeSize) {
                var show = checkSign.data("show");
                checkSign.hide();
                if (show && show == true) {
                    if (changeSize != false) {
                        checkCtrl.css("width", checkCtrl.parent().width());
                    }
                    checkSign.data("show", false);
                }
            },
            resize: function (id, changeSize) {
                var checkCtrl = $("#" + id);
                var checkSign = $("#" + id + "_check");
                var show = checkSign.data("show");
                if (show && show == true) {
                    checkCtrl.css("width",checkCtrl.parent().width() - 25);
                }
            },
            overload: function (id, regex, title) {
                $("#" + id + "_check")
                    .data("regex", regex)
                    .poshytip("destroy")
                    .poshytip({
                        content: title ? title : "",
                        alignTo: 'target',
                        alignX: 'inner-left',
                        slide: false,
                        offsetX: -16,
                        offsetY: 1
                    });
            }
        }
    })(jQuery);
}
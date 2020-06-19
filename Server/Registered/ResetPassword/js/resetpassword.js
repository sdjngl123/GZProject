//校验是否符合规范及为空
function regexCheck(ele) {
    //找到所有的ele下面的input
    var flag = true;
    var inputs = ele.find("input.reset-password-input");
    for (var i = 0; i < inputs.length; i++) {
        var input = $(inputs[i]);
        var error = input.nextAll(".reset-password-error");
        var title = input.next().html();
        if (!input.val() && input.attr("required")) {
            error.html(title + "不能为空").show();
            flag = false;
        } else if (input.val().length > 50) {
            error.html("不能超过50位").show();
            flag = false;
        } else if (input.val() && input.attr("regex")) {
            var reg = new RegExp(input.attr("regex"));
            if (!reg.test(input.val())) {//验证不通过
                error.html(title + "不符合规范").show();
                flag = false;
            } else {
                error.hide();
            }
        } else {
            error.hide();
        }
    }
    return flag;
}
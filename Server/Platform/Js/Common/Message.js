InforCenter_Platform_Message_OnCreate = function (pageEvent) {

    var para = pageEvent.o.GetPara();
    if (HoteamUI.Common.IsNullOrEmpty(para) == false) {
        var msg = para.msg;
        msg = HoteamUI.Common.HtmlEscape(msg);
        var detailmsg = para.detailmsg;
        var iserr = para.iserr;
        var iconName = 'point';
        var iconUrl;

        pageEvent.o.GetControl("Message_Textbox").SetText(detailmsg);
        if (iserr == true) {
            $("[cid='Message_Textbox']>TEXTAREA").addClass("Message_Err");
            iconName = 'close';
        }

        iconUrl = PageInit.WebRootPath + "/Base/Image/" + iconName + '.png';
        var messageHtml = ['<div class="confirm-message">',
         '<img src="', iconUrl, '"/>',
         '<p>', msg, '</p>',
      '</div>'].join('');
        pageEvent.o.GetControl("Message_Label").AppendHtml(messageHtml);
    }
    if (!("ActiveXObject" in window)) {
        //给复制按钮初始化，然后使用插件使其有复制功能
        var $copybtn = $("[cid='Message_btnCopy']").find("button").attr("data-clipboard-text", ("[" + msg + "]" + detailmsg));
        var errormesclip = new ZeroClipboard($copybtn[0], { moviePath: "Base/js/ZeroClipboard.swf" });
        $("#global-zeroclipboard-html-bridge").children().css("display", "block");
    }
}
InforCenter_Platform_Message_Copy = function (ctrlEvent) {
    if ("ActiveXObject" in window) {
        window.clipboardData.setData("text", "[" + $("#" + ctrlEvent.o.OtherControl("Message_Label").id + " .confirm-message>p").text() + "]" + ctrlEvent.o.OtherControl("Message_Textbox").GetText());
    }
}

InforCenter_Platform_Message_OKOnClick = function (ctrlEvent) {
    var pid = ctrlEvent.o.ContainerID();
    HoteamUI.UIManager.Return(pid, null);
}

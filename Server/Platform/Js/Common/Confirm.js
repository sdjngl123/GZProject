InforCenter_Platform_Confirm_OnCreate = function (pageEvent) {

    var para = pageEvent.o.GetPara(),
        message = '',
        messageHtml = ['<div class="confirm-message">',
                         '<img src="[confirm-message-icon]"/>',
                         '<p>[confirm-message-text]</p>',
                      '</div>'].join(''),
        contentCtrl = pageEvent.o.GetControl("Confirm_Content"),
        iconName = 'right',
        iconUrl;

    if (HoteamUI.Common.IsNullOrEmpty(para) == false) {
        if (para.pageMode == "OK") {
            //显示第一种
            iconName = para.MessageIcon || 'right';
            //pageEvent.o.GetControl("Confirm_Content").ControlInfo().CtrlOptions.text="Confirom.TextMode";
            if (HoteamUI.Common.IsNullOrEmpty(para.message) == false) {
                //pageEvent.o.GetControl("Confirm_Content").SetText(para.message);

                message = para.message;
            } else {
                if (HoteamUI.Common.IsNullOrEmpty(para.context) == false && HoteamUI.Common.IsNullOrEmpty(para.labelName) == false) {
                    //pageEvent.o.GetControl("Confirm_Content").SetText(HoteamUI.Language.Lang(para.context, para.labelName));
                    message = HoteamUI.Language.Lang(para.context, para.labelName);
                }
            }
            pageEvent.o.GetControl("Confirm_Btn").HiddenPanel(["item3", "item4", "item5", "item11", "item12", "item13"]);
            setTimeout(function () {
                pageEvent.o.GetControl("Confirm_btnOK").Focus();
            },1);
        } else if (para.pageMode == "OkCancel") {
            //显示第二种
            iconName = para.MessageIcon || 'question';
            if (HoteamUI.Common.IsNullOrEmpty(para.message) == false) {
                //pageEvent.o.GetControl("Confirm_Content").SetText(para.message);
                message = para.message;
            } else {
                if (HoteamUI.Common.IsNullOrEmpty(para.context) == false && HoteamUI.Common.IsNullOrEmpty(para.labelName) == false) {
                    //pageEvent.o.GetControl("Confirm_Content").SetText(HoteamUI.Language.Lang(para.context, para.labelName));
                    message = HoteamUI.Language.Lang(para.context, para.labelName);
                }
            }
            pageEvent.o.GetControl("Confirm_Btn").HiddenPanel(["item3", "item4", "item12", "item13"]);
        } else if (para.pageMode == "YesNo") {
            
            //显示第三种
            iconName = para.MessageIcon || 'question';
            if (HoteamUI.Common.IsNullOrEmpty(para.message) == false) {
                //pageEvent.o.GetControl("Confirm_Content").SetText(para.message);
                message = para.message;
            } else {
                if (HoteamUI.Common.IsNullOrEmpty(para.context) == false && HoteamUI.Common.IsNullOrEmpty(para.labelName) == false) {
                    //pageEvent.o.GetControl("Confirm_Content").SetText(HoteamUI.Language.Lang(para.context, para.labelName));

                    message = HoteamUI.Language.Lang(para.context, para.labelName);
                }
            }
            pageEvent.o.GetControl("Confirm_Btn").HiddenPanel(["item2", "item5", "item11", "item13"]);
        } else if (para.pageMode == "YesNoCancel") {
            //显示第四种
            iconName = para.MessageIcon || 'close';
            if (HoteamUI.Common.IsNullOrEmpty(para.message) == false) {
                //pageEvent.o.GetControl("Confirm_Content").SetText(para.message);
                message = para.message;
            } else {
                if (HoteamUI.Common.IsNullOrEmpty(para.context) == false && HoteamUI.Common.IsNullOrEmpty(para.labelName) == false) {
                    //pageEvent.o.GetControl("Confirm_Content").SetText(HoteamUI.Language.Lang(para.context, para.labelName));
                    message = HoteamUI.Language.Lang(para.context, para.labelName);
                }
            }
            pageEvent.o.GetControl("Confirm_Btn").HiddenPanel(["item2", "item11"]);
        } else {
            //pageEvent.o.GetControl("Confirm_Content").SetText(HoteamUI.Language.Lang("Confirm", "Error"));
            iconName = para.MessageIcon || 'close';
            message = HoteamUI.Language.Lang("Confirm", "Error");
            pageEvent.o.GetControl("Confirm_Btn").HiddenPanel(["item2", "item3", "item4", "item5"]);
        }

        iconUrl = PageInit.WebRootPath + "/Base/Image/" + iconName + '.png';
        contentCtrl.AppendHtml(messageHtml.replace(/\[confirm-message-icon\]/g, iconUrl).replace(/\[confirm-message-text\]/g, message));
    }
}

InforCenter_Platform_Confirm_OKOnClick = function (ctrlEvent) {
    var ret = { confirm: "OK" }
    var pid = ctrlEvent.o.ContainerID();
    HoteamUI.UIManager.Return(pid, ret);
}

InforCenter_Platform_Confirm_YesOnClick = function (ctrlEvent) {
    var ret = { confirm: "Yes" }
    var pid = ctrlEvent.o.ContainerID();
    HoteamUI.UIManager.Return(pid, ret);
}

InforCenter_Platform_Confirm_NoOnClick = function (ctrlEvent) {
    var ret = { confirm: "No" }
    var pid = ctrlEvent.o.ContainerID();
    HoteamUI.UIManager.Return(pid, ret);
}

InforCenter_Platform_Confirm_CancelOnClick = function (ctrlEvent) {
    var ret = { confirm: "Cancel" }
    var pid = ctrlEvent.o.ContainerID();
    HoteamUI.UIManager.Return(pid, ret);
}
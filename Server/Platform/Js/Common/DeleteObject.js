InforCenter_Platform_DeleteObject_OnCreate = function (pageEvent) {
    var para = pageEvent.o.GetPara(),
     message = '',
     messageHtml = ['<div class="confirm-message">',
                      '<img src="[confirm-message-icon]"/>',
                      '<p>[confirm-message-text]</p>',
                   '</div>'].join(''),
     contentCtrl = pageEvent.o.GetControl("DeleteObject_Content"),
     iconName = 'question',
     iconUrl;
    var result = 0;
    para.IsPrompt = false;
    var paras = {
        para: para
    }
    if (para.ValidateObject) {
        result = HoteamUI.DataService.Call("InforCenter.Common.ObjectService.DeleteObjCheckObjToObj", paras);
    }
    if (result == 0 && (para.ValidateParentLink ||
             para.ValidateParentLink == "" ||
             para.ValidateChildLink ||
             para.ValidateChildLink == "")) {
        result = HoteamUI.DataService.Call("InforCenter.Common.ObjectService.DeleteObjCheckLink", paras);
    }
    var text = "DeleteObject.Text";
    if (para.IsReplaceText) {
        text = HoteamUI.Common.IsNullOrEmpty(para.Text) ? "DeleteObject.Text" : para.Text;
    }
    var existDenyDelete = "false";
    if (para.ExistDenyDelete) {
        existDenyDelete = para.ExistDenyDelete;
    }
    if (result) {
        if (result == 1) {
            if (existDenyDelete == "true") {
                text = HoteamUI.Common.IsNullOrEmpty(para.DenyText) ? "Platform.ExistSubObjNotDelete" : para.DenyText;
            }
            else {
                text = HoteamUI.Common.IsNullOrEmpty(para.Text) ? "DeleteObject.ExistSubObjMsg" : para.Text;
            }
        }
        else if (result == 2) {
            if (existDenyDelete == "true") {
                text = HoteamUI.Common.IsNullOrEmpty(para.DenyText) ? "Platform.ExistReferenceNotDelete" : para.DenyText;
            }
            else {
                text = HoteamUI.Common.IsNullOrEmpty(para.Text) ? "DeleteObject.ExistReferenceMsg" : para.Text;
            }
        }
        else if (result == 3) {
            if (existDenyDelete == "true") {
                text = HoteamUI.Common.IsNullOrEmpty(para.DenyText) ? "Platform.ExistSubObjAndReferenceNotDelete" : para.DenyText;
            }
            else {
                text = HoteamUI.Common.IsNullOrEmpty(para.Text) ? "DeleteObject.ExistSubObjAndReferenceMsg" : para.Text;
            }
        }
    }
    if (text != "") {
        message = HoteamUI.Language.Lang(text);
    }
    if (existDenyDelete == "true" && result != 0) {
        iconName = 'close';
        pageEvent.o.GetControl("DeleteObject_Btn").HiddenPanel(["item2", "item3", "item4", "item5", "item54", "item53", "item52", "item51"]);
    }
    else {
        var ctrlObject = pageEvent.o.GetControl("DeleteObject_Btn");
        var pid = null;
        if (HoteamUI.Common.IsNullOrEmpty(ctrlObject) == false) {
            pid = ctrlObject.id;
        }
        if (HoteamUI.Common.IsNullOrEmpty(para) == false) {
            HoteamUI.Page.SetContainerParas(pid, "DeleteObject", para);
            if (para.PageMode == "DeleteObjectAll") {
                pageEvent.o.GetControl("DeleteObject_Btn").HiddenPanel(["item4", "item53", "item6", "item51"]);
            }
            if (para.PageMode == "DeleteObject") {
                pageEvent.o.GetControl("DeleteObject_Btn").HiddenPanel(["item2", "item3", "item6", "item54", "item53", "item51"]);
            }
        }
    }
    iconUrl = PageInit.WebRootPath + "/Base/Image/" + iconName + '.png';
    contentCtrl.AppendHtml(messageHtml.replace(/\[confirm-message-icon\]/g, iconUrl).replace(/\[confirm-message-text\]/g, message));
}
InforCenter_Platform_DeleteObject_DeleteObjectAll = function (ctrlEvent) {
    var ctrlObject = ctrlEvent.o.OtherControl("DeleteObject_Btn");
    var pagePara = null;
    if (HoteamUI.Common.IsNullOrEmpty(ctrlObject) == false) {
        pagePara = HoteamUI.Page.GetContainerPara(ctrlObject.id);
    }
    var para = {
        para: {
            EIDStr: pagePara.SelectID
        }
    }
    if (pagePara.LoggerData && pagePara.LoggerData.PEID) {
        para.para.PEIDStr = pagePara.LoggerData.PEID;
    }
    if (pagePara.LoggerData && pagePara.LoggerData.ActionLabel) {
        para.para.ActionLabel = pagePara.LoggerData.ActionLabel;
    }
    if (pagePara.LoggerData && pagePara.LoggerData.TemplateLabel) {
        para.para.TemplateLabel = pagePara.LoggerData.TemplateLabel;
    }
    if (HoteamUI.Common.IsNullOrEmpty(para) == false) {
        var result = HoteamUI.DataService.Call("InforCenter.Common.ObjectService.DeleteAllVersionObjectData", para);
        if (result == "true") {
            var ret = { confirm: "OK" };
            var pid = ctrlEvent.o.ContainerID();
            HoteamUI.UIManager.Return(pid, ret);
        } else {
            var callback = function (data, ret) {
                var ret = { confirm: "null" };
                var pid = ctrlEvent.o.ContainerID();
                HoteamUI.UIManager.Return(pid, ret);
            }
            var para = { pageMode: "OK", context: "DeleteObject", labelName: "Fail" }
            HoteamUI.UIManager.Popup("Confirm", para, callback, {});
        }
    }

}
InforCenter_Platform_DeleteObject_DeleteObjectCurrent = function (ctrlEvent) {
    var ctrlObject = ctrlEvent.o.OtherControl("DeleteObject_Btn");
    var pagePara = null;
    if (HoteamUI.Common.IsNullOrEmpty(ctrlObject) == false) {
        pagePara = HoteamUI.Page.GetContainerPara(ctrlObject.id);
    }
    var para = {
        para: {
            EIDStr: pagePara.SelectID
        }
    }
    if (pagePara.LoggerData && pagePara.LoggerData.PEID) {
        para.para.PEIDStr = pagePara.LoggerData.PEID;
    }
    if (pagePara.LoggerData && pagePara.LoggerData.ActionLabel) {
        para.para.ActionLabel = pagePara.LoggerData.ActionLabel;
    }
    if (pagePara.LoggerData && pagePara.LoggerData.TemplateLabel) {
        para.para.TemplateLabel = pagePara.LoggerData.TemplateLabel;
    }
    if (HoteamUI.Common.IsNullOrEmpty(para) == false) {
        var result = HoteamUI.DataService.Call("InforCenter.Common.ObjectService.DeleteObjectData", para);

        var ret = { confirm: "OK" };
        var pid = ctrlEvent.o.ContainerID();
        HoteamUI.UIManager.Return(pid, ret);

        //        if (result == true) {
        //            var ret = { confirm: "OK" };Men
        //            var pid = ctrlEvent.o.ContainerID();
        //            HoteamUI.UIManager.Return(pid, ret);
        //        }

        //        else {
        //            var ret = { confirm: "OK" };
        //            var pid = ctrlEvent.o.ContainerID();
        //            HoteamUI.UIManager.Return(pid, ret);

        //         
        //        
        //        }
    }
}

InforCenter_Platform_DeleteObject_DeleteObject = function (ctrlEvent) {
    InforCenter_Platform_DeleteObject_DeleteObjectCurrent(ctrlEvent);
}

InforCenter_Platform_DeleteObject_Cancel = function (ctrlEvent) {
    var ret = { confirm: "Cancel" };
    var pid = ctrlEvent.o.ContainerID();
    HoteamUI.UIManager.Return(pid, ret);
}

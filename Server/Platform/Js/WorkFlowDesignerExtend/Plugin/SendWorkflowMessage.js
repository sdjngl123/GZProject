//发送流程消息OnCreate
InforCenter_Platform_SendWorkflowMessage_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var para = page.GetPara();
    var layout = page.GetControl("Info_Container");
    var template = WebDesignerWorkflowInfo.Template;
    //初始化消息类型
    var messageType = HoteamUI.DataService.Call("InforCenter.Workflow.WorkflowTemplateExtendService.GetPluginItemListByType", { para: { PluginType: "Message" } });
    var data = [];
    for (var i = 0; i < messageType.length; i++) {
        var item = {};
        item.Name = messageType[i].Name;
        item.Text = HoteamUI.Language.Lang("Plugins", messageType[i].Name);
        if (item.Name == 'InternalMail') {
            item.Value = "1";
        } else {
            item.Value = "0";
        }
        data.push(item);
    }
    var messageTypeCtrl = page.GetControl("SendType_Value");
    messageTypeCtrl.LoadData(data);


    //为checkboxpad赋值
    var currPlugin = {};
    if (para.Plugin) {
        currPlugin = para.Plugin;
    }
    if (currPlugin.Content) {
        var content = JSON.parse(currPlugin.Content);
        for (var i in content.MessageType) {
            if (!content.MessageType.hasOwnProperty(i)) {
                continue;
            }
            messageTypeCtrl.SetData([{ Name: i, Value: content.MessageType[i] == true ? "1" : "0" }]);
        }
    }

    if (para.ShowType != "Workflow") {
        var userType = HoteamUI.DataService.Call("InforCenter.Enumeration.EnumerationService.GetEnumerationItem", { para: { EnumerationName: "WorkFlowMessage" } });
        var usertypeCtrl = page.GetControl("UserType_Value");
        var data = [];
        for (var i = 0; i < userType.length; i++) {
            var item = {};
            item.Name = userType[i].Key;
            item.Text = userType[i].Value;
            if (item.Name == "CURRENTUSER") {
                item.Value = "1"
            } else {
                item.Value = "0";
            }
            data.push(item);
        }
        usertypeCtrl.LoadData(data);

        if (currPlugin.Content) {
            var content = JSON.parse(currPlugin.Content);
            for (var i in content.SendUser) {
                if (!content.SendUser.hasOwnProperty(i)) {
                    continue;
                }
                usertypeCtrl.SetData([{ Name: i, Value: content.SendUser[i] == true ? "1" : "0" }]);
            }
        }

    } else {
        layout.HiddenPanel(["item4"]);
    }
}

//发送流程消息OnGetData
InforCenter_Platform_SendWorkflowMessage_OnGetData = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();

    var plugin = {};
    plugin.Name = "SendFlowMessage";
    plugin.BeforeExec = pageEvent.BeforeExec == true ? true : false;
    var content = {};
    content.MessageType = {};
    var sendtype = page.GetControl("SendType_Value");
    var values = sendtype.GetData("0,1");
    for (var i = 0; i < values.length; i++) {
        if (values[i].Name == "RTX") {
            content.MessageType.RTX = values[i].Value == 0 ? false : true;
        }
        if (values[i].Name == "Email") {
            content.MessageType.Email = values[i].Value == 0 ? false : true;
        }
        if (values[i].Name == "InstantMessage") {
            content.MessageType.InstantMessage = values[i].Value == 0 ? false : true;
        }
        if (values[i].Name == "InternalMail") {
            content.MessageType.InternalMail = values[i].Value == 0 ? false : true;
        }
        if (values[i].Name == "WeChat") {
            content.MessageType.WeChat = values[i].Value == 0 ? false : true;
        }
        if (values[i].Name == "QYWeiXin") {
            content.MessageType.QYWeiXin = values[i].Value == 0 ? false : true;
        }
    }
    content.SendUser = {};
    if (pagePara.ShowType != "Workflow") {
        var usertype = page.GetControl("UserType_Value");
        var values = usertype.GetData("0,1");
        for(var i=0;i<values.length;i++){
            if (values[i].Name == "CURRENTUSER") {
                content.SendUser.CURRENTUSER = values[i].Value == 0 ? false : true;
            }
            if (values[i].Name == "PROMOTER") {
                content.SendUser.PROMOTER = values[i].Value == 0 ? false : true;
            }
        }
        var contentStr = JSON.stringify(content);
        plugin.Content = contentStr;

        WebDesignerWorkflowInfo.CurrSelectInfo.PluginList.push(plugin);

    } else {
        content.SendUser.CURRENTUSER = false;
        content.SendUser.PROMOTER = false;

        var contentStr = JSON.stringify(content);
        plugin.Content = contentStr;

        WebDesignerWorkflowInfo.Template.PluginList.push(plugin);
    }


}


InforCenter_Platform_Object_AddLinkObject = function (paras) {
    var result = null;
    var dataService = "InforCenter.Common.ObjectService.AddLinkObject";
    var para = paras[1];
    if (para.DataService) {
        //for (var key in pagePara.DataService) {
        for (var i = 0; i < pagePara.DataService.length; i++) {
            var item = pagePara.DataService[i];
            if (item.Name == objectType) {
                dataService = item.Value;
                break;
            }
        }
    }
    var initList = [];
    //如果是数组
    if (para.initData && Object.prototype.toString.call(para.initData) == "[object Array]") {
        for (var i = 0; i < para.initData.length ; i++) {
            var initPara = {};
            initPara.Name = para.initData[i].Name;
            initPara.Value = para.initData[i].Value;
            initList.push(initPara);
        }
    } else if (para.initData && Object.prototype.toString.call(para.initData) == "[object Object]") {//如果是对象
        for (var i in para.initData) {
            if (!para.initData.hasOwnProperty(i)) {
                continue;
            }
            var initPara = {};
            initPara.Name = i;
            initPara.Value = para.initData[i];
            initList.push(initPara);
        }
    }
    var ret = { confirm: "cancel" };
    result = HoteamUI.DataService.Call(dataService, { para: para.para, initData: initList, addLink: para.addLink });
    if (result != null) {
        if (HoteamUI.Common.IsNullOrEmpty(result.Message) == false) {
            HoteamUI.UIManager.MsgBox(result.Message, result.Detaile, false);
        }

        if (HoteamUI.Common.IsNullOrEmpty(result.AddIDs) == false) {
            ret = { confirm: "OK", EID: result.AddIDs };
        }
    }
    return ret;
};

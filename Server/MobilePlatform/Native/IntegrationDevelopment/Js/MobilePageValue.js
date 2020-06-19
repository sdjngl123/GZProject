InforCenter_IntegrationDevelopment_MobilePageValue_SetPageList = function (o, infoName, objecttype, unique) {
    if (o.id != '') {
        var ret = HoteamUI.DataService.Call("Hoteam.InforCenter.MobilePageDevService.GetPageName", {});

        var arr = new Array(0);
        var step = 0;
        if (unique) {
            arr[0] = { Value: "", Text: "" };
            step = 1;
        }
        for (var x = 0; x < ret.length; x++) {
            x = parseInt(x);
            arr[x + step] = { Value: ret[x].Key, Text: ret[x].Value };
        }
        o.LoadItems(arr);
    }
}
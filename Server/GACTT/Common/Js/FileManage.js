InforCenter_GAC_Document_DownLoadFile = function (para) {
    var servicePara = { para: { ObjectID: para[1].ObjectID } };
    var url = null;
    url = HoteamUI.DataService.Call(para[1].wcfpath, servicePara);
    if (url) {
        var urls = JSON.parse(url);
        for (var i in urls) {
            var link = urls[i];
            window.open(link);
        }
    }
}

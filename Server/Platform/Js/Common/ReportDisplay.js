//初始化控件参数
InforCenter_Platform_ReportDisplay_OnCreateComplete = function (ctrlEvent) {
    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    var pagePara = page.GetPara();
    var arrayPara = [];
    for (var key in pagePara.DataSourcePara) {
        if (!pagePara.DataSourcePara.hasOwnProperty(key)) {
            continue;
        }
        arrayPara.push({ Name: key, Value: pagePara.DataSourcePara[key] });
    }

    var data = HoteamUI.DataService.Call("InforCenter.Common.ReportService.GetReportXmlDocument", { para: { TemplateID: pagePara.TemplateID, DisplayType: pagePara.DisplayType, DataSourcePara: arrayPara } });
    if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
        ctrlEvent.o.OpenByXMLContent(data);
    }
}
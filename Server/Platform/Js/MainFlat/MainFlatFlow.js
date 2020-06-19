InforCenter_Platform_MainFlatFlow_MainFlatInit = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();
    var tabsCtrl = page.GetControl("PageGridCtrl");
    var obj = MainFlatFlowScript[0];
    if (obj != null) {
        obj.data = obj.Data;
        obj.name = obj.Name;
        obj.cols = obj.Cols;
        obj.height = obj.Height;
        var data = obj.data;
        for (var i = 0; i < data.length; i++) {
            var robj = data[i];
            robj.name = robj.Name;
            robj.isHidden = robj.IsHidden;
            robj.pageName = robj.PageName;
            robj.pageParas = JSON.parse(robj.PageParas);
            robj.title = HoteamUI.Language.Lang("MainFlatFlows", robj.Name);
        }
        obj.setting = HoteamUI.Common.SystemSettingEnum.HomePage;
        tabsCtrl.LoadPages(obj);
    }
};
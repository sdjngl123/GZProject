InforCenter_Platform_MutilLangInput_OnCreate = function (pageEvent) {
    var languagelist = HoteamUI.Language.GetLanguageList();
    if (languagelist == null) {
        return;
    }
    var ctrl = pageEvent.o.GetControl("MutilLang_Container");
    InforCenter_Platform_MutilLangInput_LoadTemplete(languagelist, ctrl);

    var para = pageEvent.o.GetPara();
    if (HoteamUI.Common.IsNullOrEmpty(para) == false && HoteamUI.Common.IsNullOrEmpty(para.MutilLangValue) == false) {
        var MutilLangValue = JSON.parse(para.MutilLangValue);
        if (HoteamUI.Common.IsNullOrEmpty(MutilLangValue) == false) {
            for (x in languagelist) {
                var lan = languagelist[x];
                var input = $("#" + lan.Name)[0];
                input.value = MutilLangValue[lan.Name];
            }
        }
    }
}

InforCenter_Platform_MutilLangInput_LoadTemplete = function (languagelist, o) {
    var Begin = HoteamUI.UIManager.GetTemplate("MutilLangInputS");
    var Content = HoteamUI.UIManager.GetTemplate("MutilLangInput");
    var End = HoteamUI.UIManager.GetTemplate("MutilLangInputE");
    var container = $("#" + o.id)[0];
    var innerhtml = Begin;
    //  for (var x in languagelist) {
    for (var i = 0; i < languagelist.length; i++) {
        var lan = languagelist[i];
        var inner = Content.replace("[NAME]", lan.Name).replace("[TEXT]", lan.Text);
        innerhtml = innerhtml + inner;
    }
    innerhtml = innerhtml + End;
    container.innerHTML = innerhtml;
}

InforCenter_Platform_MutilLangInput_OnOK = function (ctrlEvent) {
    var languagelist = HoteamUI.Language.GetLanguageList();
    if (languagelist == null) {
        return;
    }
    var data = {};
    //  for (var x in languagelist) {
    for (var i = 0; i < languagelist.length; i++) {
        var lan = languagelist[i];
        var input = $("#" + lan.Name)[0];
        data[lan.Name] = input.value;
    }
    var ret = {};
    ret.MutilLangText = data[HoteamUI.Language.CurLanguage];
    ret.MutilLangValue = JSON.stringify(data);

    HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), ret);
}
InforCenter_GACTT_TestResourceLib_SetObjectDbValue = function (para) {
    var result = HoteamUI.DataService.Call("Inforcenter.GACTT.CommonService.SetObjectValueByFiledName",
        { para: { ObjectID: para[1].ObjectID, FieldName: para[1].FieldName, Value: para[1].Value } });

    if (result) {
        var msg = HoteamUI.Language.Lang("TestResourceLib.SetSuccess");
        HoteamUI.UIManager.MsgBox(msg);
        InforCenter_Platform_MenuCtrl_InnerReceiveServerData(para[0], { confirm: "OK" });
    }
}
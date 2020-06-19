
/* global jQuery */
(function ($) {
    "use strict";

    $.formbuilder.menucontrol["selectFormUI"] = {
        options: {
            name: null,
            value: "",
            text: HoteamUI.Language.Lang("FormBuilder.selectFormUI"),
            image: "../platform/Image/FormBuilder/selectFormUI.png",
            selectValue: "",
            cancelValue: ""
        },
        type: "button",
        target: null,
        property: false,
        fn: function ($elem, grid) {
            var callbackdata = {};
            var callback = function (options, ret) {
                if (ret) {
                    var designData = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GetObjectTypeGeneratorData", {
                        para: {
                            ObjectID: ret[0].EID,
                            ServiceUri: "InforCenter.Platform.ModelGeneratorService.GetFormThemData"
                        }
                    });
                    var result = JSON.parse(designData), resultLayoutData;
                    if (result.LayoutData && result.LayoutData != '') {
                        resultLayoutData = JSON.parse(result.LayoutData);
                    } else {
                        resultLayoutData = '';
                    }
                    grid.workspace.builder.loadData(resultLayoutData);
                }
            }
            HoteamUI.UIManager.Popup("ListCommonQuery", { ItemName: "ThemDataListQuery" }, callback, callbackdata, "700*500");
        }
    }

}(jQuery));

/* global jQuery */
(function ($) {
    "use strict";

    $.formbuilder.menucontrol["setpermission"] = {
        options: {
            name: null,
            value: "",
            text: HoteamUI.Language.Lang("FormBuilder.permissionActorInfo"),
            image: "../platform/Image/FormBuilder/PermissionActionValue.png",
            selectValue: "",
            cancelValue: ""
        },
        type: "button",
        target: "control",
        property: false,
        fn: function ($elem, grid) {
            var positionList = [], position, option, permissionValue = "", isFirst = true, isSame = true, permissionOptionArr = [];
            var controls = grid.options.controls;
            $.each($elem, function (i, e) {
                if ($(e).children().length > 0) {
                    position = JSON.parse($(e).attr("data-position"));
                    option = controls[position[0] - 1][position[1] - 1].options;
                    permissionOptionArr.push(option);

                    if (option.generatorType != "LabelValue" && option.generatorType != "CustomLabel") {
                        positionList.push(position);
                        if (isFirst) {
                            permissionValue = option.permissionActorID;
                            isFirst = false;
                        } else if (isSame && permissionValue != option.permissionActorID) {
                            isSame = false;
                        }
                    }
                }
            });
            if (!isSame) {
                permissionValue = "";
            }

            var callbackdata = {};
            //callbackdata.positionList = positionList;
            callbackdata.permissionOptionArr = permissionOptionArr;
            //callbackdata.controls = controls;

            var callback = function (data, ret) {
                var value = "", text = "";
                if (ret != null) {
                    for (var i = 0; i < ret.length; i++) {
                        text = text + ";" + ret[i].ENAME;
                        value = value + ";" + ret[i].EID;
                    }
                    if (HoteamUI.Common.IsNullOrEmpty(text) == false) {
                        text = text.substring(1);
                        value = value.substring(1);
                    }
                    $.each(data.permissionOptionArr, function (i, options) {
                        //data.controls[e[0]][e[1]].options.permissionActorID = value;
                        //data.controls[e[0]][e[1]].options.permissionActorInfo = text;
                        options["permissionActorID"] = value;
                        options["permissionActorInfo"] = text;
                    });
                }
            }

            HoteamUI.UIManager.Popup("TreeCommonQuery", { Value: permissionValue, ItemName: "GroupToRoleToUserAndRole", LoadAndSelectType: "SingleLevel_MultiSelect", AllowReturnEmptyValue: true }, callback, callbackdata, "700*500");
        }
    };

}(jQuery));


/* global jQuery */
(function ($) {
    "use strict";

    $.formbuilder.menucontrol["setflowtaskpermission"] = {
        options: {
            name: null,
            value: "",
            text: HoteamUI.Language.Lang("FormBuilder.flowTaskPermission"),
            image: "../platform/Image/FormBuilder/PermissionActorValue.png",
            selectValue: "",
            cancelValue: ""
        },
        type: "button",
        target: "control",
        property: false,
        fn: function ($elem, grid) {
            var positionList = [], position, option, permissionValue = "", isFirst = true, isSame = true, optionArr = [];
            var controls = grid.options.controls;
            $.each($elem, function (i, e) {
                if ($(e).children().length > 0) {
                    position = JSON.parse($(e).attr("data-position"));
                    option = controls[position[0]-1][position[1]-1].options;
                    optionArr.push(option);

                    if (option.flowTaskPermission) {
                        var value = "", text = "";
                        for (var j = 0; j < option.flowTaskPermission.length; j++) {
                            if (optionArr[j].flowTaskPermissionActorID == '' && optionArr[j].flowTaskPermissionActorInfo == '') {
                                text = text + ";" + option.flowTaskPermission[j].ENAME;
                                value = value + ";" + option.flowTaskPermission[j].EID;
                                if (HoteamUI.Common.IsNullOrEmpty(text) == false) {
                                    text = text.substring(1);
                                    value = value.substring(1);
                                }
                                option["flowTaskPermissionActorID"] = value;
                                option["flowTaskPermissionActorInfo"] = text;
                            }

                        }
                    }

                    //if (option.generatorType != "LabelValue" && option.generatorType != "CustomLabel") {
                    //    positionList.push(position);
                    //    if (isFirst) {
                    //        permissionValue = option.permissionActorID;
                    //        isFirst = false;
                    //    } else if (isSame && permissionValue != option.permissionActorID) {
                    //        isSame = false;
                    //    }
                    //}
                }
            });
            //if (!isSame) {
            //    permissionValue = "";
            //}

            var callbackdata = {};
            // callbackdata.positionList = positionList;
            callbackdata.optionArr = optionArr;
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
                    //$.each(data.positionList, function (i, options) {
                    //    //data.controls[e[0]][e[1]].options.permissionActorID = value;
                    //    //data.controls[e[0]][e[1]].options.permissionActorInfo = text;
                    //    options["quanxian"] = ret;
                    //});
                    $.each(data.optionArr, function (i, options) {
                        //data.controls[e[0]][e[1]].options.permissionActorID = value;
                        //data.controls[e[0]][e[1]].options.permissionActorInfo = text;
                        options["flowTaskPermissionActorID"] = value;
                        options["flowTaskPermissionActorInfo"] = text;
                        //options["flowTaskPermission"] = ret;
                    });
                }
            }

            HoteamUI.UIManager.Popup("SetFlowTaskPermission", {
                Text: callbackdata.optionArr[0].flowTaskPermissionActorInfo,
                Value: callbackdata.optionArr[0].flowTaskPermissionActorID
            }, callback, callbackdata, "700*500");
        }
    }

}(jQuery));

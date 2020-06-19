//流程条件扩展
InforCenter_Platform_WorkflowModelCondition_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();

    var operatorCtrl = page.GetControl("Operator_Value");
    InforCenter_Platform_WorkflowModelCondition_operatorInit(operatorCtrl);

    var objTypeCtrl = page.GetControl("ObjectType_Value");
    InforCenter_Platform_Object_ObjectTypeListValue(objTypeCtrl, null, null, false, true, true);

    if (HoteamUI.Common.IsNullOrEmpty(pagePara.Value) == false) {
        var condition = JSON.parse(pagePara.Value);
        operatorCtrl.SetSelectedByValue(condition.Operate);

        objTypeCtrl.SetSelectedByValue(condition.ObjectType);
        if (HoteamUI.Common.IsNullOrEmpty(condition.ObjectType) == false) {
            var infoTypeCtrl = page.GetControl("InfoType_Value");
            InforCenter_Platform_Object_SetInfoTypeList(infoTypeCtrl, condition.ObjectType, false);
            infoTypeCtrl.SetSelectedByValue(condition.InfoType);
            if (HoteamUI.Common.IsNullOrEmpty(condition.ObjectType) == false
                && HoteamUI.Common.IsNullOrEmpty(condition.InfoType) == false) {

                InforCenter_Platform_WorkflowModelCondition_OnInfoTypeSelectChangeOption(infoTypeCtrl);
            }
        }
    }
}

InforCenter_Platform_WorkflowModelCondition_OnObjectTypeChange = function (ctrlEvent) {
    var infoTypeCtrl = ctrlEvent.o.OtherControl("InfoType_Value");
    var objTypeCtrl = ctrlEvent.o;
    var objTypeName = objTypeCtrl.GetSelectedValue();
    InforCenter_Platform_Object_SetInfoTypeList(infoTypeCtrl, objTypeName, false);
}

//操作初始化
InforCenter_Platform_WorkflowModelCondition_operatorInit = function (ctrl) {
    var dataList = [
        { Text: "==", Value: "==" },
        { Text: ">", Value: ">" },
        { Text: ">=", Value: ">=" },
        { Text: "<", Value: "<" },
        { Text: "<=", Value: "<=" },
        { Text: "!=", Value: "!=" },
        { Text: "in", Value: "in" },
        { Text: "not in", Value: "not in" }
    ];
    ctrl.LoadItems(dataList);
}

InforCenter_Platform_WorkflowModelCondition_OnOK = function (ctrlEvent) {
    var objTypeCtrl = ctrlEvent.o.OtherControl("ObjectType_Value");
    var operatorCtrl = ctrlEvent.o.OtherControl("Operator_Value");
    var infoTypeCtrl = ctrlEvent.o.OtherControl("InfoType_Value");

    if (!objTypeCtrl.Check() || !operatorCtrl.Check() || !infoTypeCtrl.Check()) {
        return;
    }

    var infoContainer = ctrlEvent.o.OtherControl("ConditionValue_Container");
    var data = infoContainer.GetFilterData();
    if (!data) {
        return;
    }

    var ctDt = {
        Text: data[0].text,
        Value: data[0].value
    };

    var value = {};
    value.ObjectType = objTypeCtrl.GetSelectedValue();
    value.InfoType = infoTypeCtrl.GetSelectedValue();
    value.ObjectTypeText = objTypeCtrl.GetSelectedText();
    value.InfoTypeText = infoTypeCtrl.GetSelectedText();
    value.Operate = operatorCtrl.GetSelectedValue();
    value.Data = ctDt;

    var text = value.ObjectTypeText + "(" + value.ObjectType + ")." + value.InfoTypeText + "(" + value.InfoType + ")" + " " + value.Operate + " " + value.Data.Text;

    HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), [{ Text: text, Value: JSON.stringify(value) }]);
}

//初始化数据
InforCenter_Platform_WorkflowModelCondition_InitData = function (condition) {
    if (condition && condition.Value) {
        try {
            var expObj = JSON.parse(condition.Value);
        } catch (e) {
            console.error(e.toString());
            return "";
        }
        return expObj.ObjectTypeText + "(" + expObj.ObjectType + ")." + expObj.InfoTypeText + "(" + expObj.InfoType + ")" + " " + expObj.Operate + " " + expObj.Data.Text;
    }
}

InforCenter_Platform_WorkflowModelCondition_OnInfoTypeChange = function (ctrlEvent) {
    InforCenter_Platform_WorkflowModelCondition_OnInfoTypeSelectChangeOption(ctrlEvent.o);
}

//下拉列表改变调用方法
InforCenter_Platform_WorkflowModelCondition_OnInfoTypeSelectChangeOption = function (ctrl) {
    if (HoteamUI.Common.IsNullOrEmpty(ctrl) == false) {
        var objTypeCtrl = ctrl.OtherControl("ObjectType_Value");
        var objTypeValue = objTypeCtrl.GetSelectedValue();
        var selectedValue = ctrl.GetSelectedValue();

        var objTypeValueText = objTypeCtrl.GetSelectedText();
        var selectedValueText = ctrl.GetSelectedText();
        if (HoteamUI.Common.IsNullOrEmpty(selectedValue) == false && HoteamUI.Common.IsNullOrEmpty(objTypeValue) == false) {
            var infoContainer = ctrl.OtherControl("ConditionValue_Container");
            if (HoteamUI.Common.IsNullOrEmpty(infoContainer) == false) {
                var page = HoteamUI.Page.Instance(ctrl.ContainerID());
                var para = page.GetPara();
                if (HoteamUI.Common.IsNullOrEmpty(para.Value)) {
                    var obj = { ObjectType: objTypeValue, ObjectTypeText: objTypeValueText, InfoType: selectedValue, InfoTypeText: selectedValueText };
                    para.Value = JSON.stringify(obj);
                }

                var ret = HoteamUI.DataService.Call("InforCenter.Common.ObjectService.GetObjectInfoControlData", { para: { ObjectType: objTypeValue, InfoType: selectedValue } });;
                if (ret && ret.length > 0) {
                    var qctrl = ctrl.OtherControl("ConditionValue_Container");
                    qctrl.LoadFilterData(ret);

                    var vl = JSON.parse(para.Value);
                    if (vl && vl.ObjectType == objTypeValue && vl.InfoType == selectedValue) {
                        qctrl.SetTextValueData(ret[0].id, vl.Data);
                    }
                }
                else {
                    qctrl.Clear();
                }
            }
        }
    }
}

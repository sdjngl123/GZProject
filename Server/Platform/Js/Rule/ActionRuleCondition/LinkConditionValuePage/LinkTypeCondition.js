//加载页面
InforCenter_Platform_LinkTypeCondition_LoadPage = function (pageEvent) {
    var page = pageEvent.o;
    var para = page.GetPara();
    if (HoteamUI.Common.IsNullOrEmpty(para.ConditionValue) == false
        && HoteamUI.Common.IsNullOrEmpty(para.ConditionValue.Parameter1) == false
        && HoteamUI.Common.IsNullOrEmpty(para.ConditionValue.Parameter2) == false) {
        var linkTypeDDL = page.GetControl("LinkTypeValueDDL");
        if (HoteamUI.Common.IsNullOrEmpty(linkTypeDDL) == false) {
            linkTypeDDL.SetSelectedByValue(para.ConditionValue.Parameter1);
            var relation = page.GetControl("RelationValueDDL");
            InforCenter_Platform_LinkTypeCondition_InitRelation(relation, para.ConditionValue.Parameter1, para.ConditionValue.Parameter2);

        }
    }
}

//初始化对象类型下拉框
InforCenter_Platform_LinkTypeCondition_InitLinkType = function (ctrlEvent) {
    var data = HoteamUI.DataService.Call("InforCenter.Rule.RuleDataService.GetObjectTypeList", { para: { Type: "Link" } });
    if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
        ctrlEvent.o.LoadItems(data);
    }
}

InforCenter_Platform_LinkTypeCondition_LinkTypeChange = function (ctrlEvent) {
    var linkType = ctrlEvent.o.GetSelectedValue();
    if (linkType) {
        InforCenter_Platform_LinkTypeCondition_InitRelation(ctrlEvent.o.OtherControl("RelationValueDDL"), linkType);
    }
}

InforCenter_Platform_LinkTypeCondition_InitRelation = function (o, linkType, defaultvalue) {
    if (linkType) {
        var data = HoteamUI.DataService.Call("InforCenter.Rule.RuleDataService.GetLinkTypeRelationList", { para: { Type: linkType } });
        if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
            o.LoadItems(data);
            if (defaultvalue) {
                o.SetSelectedByValue(defaultvalue);
            } else if (data.length > 0) {
                o.SetSelectedByValue(data[0].Value);
            }
        }

    }
}

//页面数据获取统一方法，每个页面必须实现
InforCenter_Platform_LinkTypeCondition_OnGetDataFromPage = function (pageEvent) {
    InforCenter_Platform_Object_Data = null;
    var bCheck = true;
    var data = {};
    {
        var c = pageEvent.o.GetControl('ConditionValue_Container');
        if (c.Check() == false) {
            bCheck = false;
            return;
        }
        if (pageEvent.o.GetControl("LinkTypeValueDDL").IsInOption() == false) {
            HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("LinkTypeCondition.IsNotInOption"));
            return;
        }
        data.Parameter1 = pageEvent.o.GetControl("LinkTypeValueDDL").GetSelectedValue();
        data.Parameter2 = pageEvent.o.GetControl("RelationValueDDL").GetSelectedValue();
    }
    if (bCheck) {
        InforCenter_Platform_Object_Data = data;
    }
}
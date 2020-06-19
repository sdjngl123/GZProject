InforCenter_Platform_ChildObjectListForPermission_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var para = page.GetPara();

    if (para && para.SelectID) {
        var callback = function (data, ret) {
            if (data) {
                try {
                    //���ز�ѯ����
                    if (data.CreatorList) {
                        page.GetControl("CREATEUID_Value").LoadItems(data.CreatorList);
                    }
                    if (data.OwnList) {
                        page.GetControl("OWNUID_Value").LoadItems(data.OwnList);
                    }
                    //����checkboxpad
                    if (data.ObjectTypeCheckBoxPad) {
                        page.GetControl("CheckboxPadExample_CheckboxPad").LoadData(data.ObjectTypeCheckBoxPad);
                    }
                    page.GetControl("Top_Container").ShowPanel(["item1"]);
                    page.GetControl("Top_Container").HiddenPanel(["item2"]);
                    HoteamUI.Window.WaitWindow.LayoutDestory(page.pid);

                    //�����б�
                    var grid = page.GetControl("ObjectList");
                    if (data.TitleData) {
                        grid.LoadColTitle(data.TitleData);
                    }
                    if (data.GridObjectData) {
                        grid.LoadGridRows(data.GridObjectData);
                        var gridData = grid.SaveGridRows();
                        para = $.extend(para, { gridData: gridData });
                        HoteamUI.Page.SetContainerParas(page.pid, "ChildObjectListForPermission", para);
                    }
                    grid.SetSelectAll();

                } catch (e) {
                    if (window.console) {
                        console.log(e.message);
                    }
                }
            }
        }

        var data = HoteamUI.DataService.AsyncCall("InforCenter.Platform.RulePageService.GetChildObjectData", { para: { SelectID: para.SelectID } }, callback, {});
        page.GetControl("Top_Container").HiddenPanel(["item1"]);
        HoteamUI.Window.WaitWindow.LayoutShow(page.pid);

    }
}

InforCenter_Platform_ChildObjectListForPermission_CreateUIDDOnChange = function (ctrlEvent) {
    var ctrl = ctrlEvent.o;
    InforCenter_Platform_ChildObjectListForPermission_SetGridDataByFilter(ctrl, ctrl.OtherControl("OWNUID_Value"), ctrl.OtherControl("CheckboxPadExample_CheckboxPad"))
}

InforCenter_Platform_ChildObjectListForPermission_OwnUIDOnChange = function (ctrlEvent) {
    var ctrl = ctrlEvent.o;
    InforCenter_Platform_ChildObjectListForPermission_SetGridDataByFilter(ctrl.OtherControl("CREATEUID_Value"), ctrl, ctrl.OtherControl("CheckboxPadExample_CheckboxPad"))
}

InforCenter_Platform_ChildObjectListForPermission_CheckBoxClick = function (ctrlEvent) {
    var ctrl = ctrlEvent.o;
    InforCenter_Platform_ChildObjectListForPermission_SetGridDataByFilter(ctrl.OtherControl("CREATEUID_Value"), ctrl.OtherControl("OWNUID_Value"), ctrl);

}

//����������ѯ�����ϵ�����
InforCenter_Platform_ChildObjectListForPermission_SetGridDataByFilter = function (creatorCtrl, ownCtrl, checkboxCtrl) {

    var createrValue = creatorCtrl.GetSelectedValue();
    if (createrValue) {
        createrValue = createrValue.split(';');
    } else {
        createrValue = [];
    }
    var ownCtrlValue = ownCtrl.GetSelectedValue();
    if (ownCtrlValue) {
        ownCtrlValue = ownCtrlValue.split(';');
    } else {
        ownCtrlValue = [];
    }
    //��ȡδѡ�е�����
    var checkedValue = checkboxCtrl.GetData("1");
    var para = HoteamUI.Page.Instance(creatorCtrl.ContainerID()).GetPara();
    if (para.gridData) {
        var grid = para.gridData;
        //��Ų�ѯ���������
        var data = [];
        //����������
        for (var i = 0; i < createrValue.length; i++) {
            var creater = createrValue[i];
            for (var j = 0; j < grid.rowsObject.length; j++) {
                var row = grid.rowsObject[j];
                if (row.CREATEUID == creater) {
                    data.push(row);
                }
            }
        }
        //ӵ��������
        if (data.length > 0) {// �����߲�Ϊ�գ��Ӵ����������в���ӵ����
            var exist = [];
            for (var i = 0; i < ownCtrlValue.length; i++) {
                var own = ownCtrlValue[i];
                for (var j = 0; j < data.length; j++) {
                    var row = data[j];
                    if (row.OWNUID == own) {
                        exist.push(row);
                    }
                }
            }
            if (ownCtrlValue.length != 0)
                data = exist;
        } else {//������Ϊ��
            for (var i = 0; i < ownCtrlValue.length; i++) {
                var own = ownCtrlValue[i];
                for (var j = 0; j < grid.rowsObject.length; j++) {
                    var row = grid.rowsObject[j];
                    if (row.OWNUID == own) {
                        data.push(row);
                    }
                }
            }
        }
        //������������
        if (data.length > 0) {//�����ߣ�ӵ���߲���Ϊ��
            if (!checkedValue || checkedValue.length == 0) {//һ��Ҳû��ѡ��
                data = [];
            } else {
                var exist = [];
                for (var i = 0; i < checkedValue.length; i++) {
                    var check = checkedValue[i].Name;
                    for (var j = 0; j < data.length; j++) {
                        var row = data[j];
                        if (row._OBJECTTYPE == check) {
                            exist.push(row);
                        }
                    }
                }
                if (checkedValue.length > 0)
                    data = exist;
            }

        } else if (createrValue.length == 0 && ownCtrlValue.length == 0) {//�����ߣ�ӵ���߶�Ϊ��
            if (!checkedValue || checkedValue.length == 0) {//һ��Ҳû��ѡ��
                data = [];
            } else {
                for (var i = 0; i < checkedValue.length; i++) {
                    var check = checkedValue[i].Name;
                    for (var j = 0; j < grid.rowsObject.length; j++) {
                        var row = grid.rowsObject[j];
                        if (row._OBJECTTYPE == check) {
                            data.push(row);
                        }
                    }
                }
            }
        } else {//�����ߣ�ӵ����������ƥ��
            data = [];
        }
        var grdiData = {};
        grdiData.Rows = [];
        for (var i = 0; i < data.length; i++) {
            var row = data[i];
            var serverRow = [];
            for (var item in row) {
                if (!row.hasOwnProperty(item)) {
                    continue;
                }
                var col = {};
                col.ColName = item;

                var value = row[item];
                if (typeof (value) == "string") {
                    col.ColText = value;
                } else {
                    col.ColIcon = value.icon;
                    col.ColText = value.text;
                }
                serverRow.push(col);
            }
            grdiData.Rows.push(serverRow);
        }
        creatorCtrl.OtherControl("ObjectList").LoadGridRows(grdiData, true);
        creatorCtrl.OtherControl("ObjectList").SetSelectAll();
    }

}


InforCenter_Platform_ChildObjectListForPermission_BtnClick = function (ctrlEvent) {
    var grid = ctrlEvent.o.OtherControl("ObjectList");
    var select = grid.GetSelectedRows();
    if (!select || select.length <= 0) {
        HoteamUI.UIManager.Popup({ pagename: "Confirm", paras: { pageMode: "OK", message: HoteamUI.Language.Lang("ChildObjectListForPermission.RowEmpty") } });
        return false;
    }
    var objs = "";
    for (var i = 0; i < select.length; i++) {
        var row = select[i];
        objs += ";" + row.EID;
    }
    //�ж��Ƿ���Ȩ��
    var nonPermissionInfo = HoteamUI.DataService.Call("InforCenter.Platform.RuleDataService.CheckNonPermission", { para: { ObjectIDs: objs } });
    if (nonPermissionInfo && nonPermissionInfo.length > 0) {
        var detail = "";
        for (var i = 0; i < nonPermissionInfo.length; i++) {
            var non = nonPermissionInfo[i];
            var eid = non.Key;
            detail += non.Value + "\r\n";
            for (var j = 0; j < select.length; j++) {
                var row = select[j];
                if (row.EID == eid) {
                    select.splice(j, 1);
                    break;
                }
            }
        }
        HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("ObjectPermissionPage.NonPermission"), detail);
    }
    
    HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), { SelectRows: select });
}
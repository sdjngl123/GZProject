var ClipBoard = {};
ClipBoard.ObjIDArr = new Array();
ClipBoard.Objects = new Array();
ClipBoard.Mode = null;
ClipBoard.ParentID = null;
ClipBoard.LIDArr = new Array();
ClipBoard.IsEmpty = true;
ClipBoard.TreeNodeID = "";
ClipBoard.TreeNodeData = "";
ClipBoard.CutIsDeleteLink = false;
var linkTypeName = new Array();
InforCenter_Platform_ClipBoard_Copy = function (copyPara) {
    if (InforCenter_Platform_ClipBoard_ToClipBoard(copyPara)) {
        ClipBoard.Mode = "COPY";
    }
    return { confirm: "OK" };
};
InforCenter_Platform_ClipBoard_Cut = function (cutPara) {
    if (InforCenter_Platform_ClipBoard_ToClipBoard(cutPara)) {
        ClipBoard.Mode = "CUT";
        //如果断关系需要自定义，需要配置CutDataServicePara和CutDataService
        if (cutPara[1].CutDataServicePara && cutPara[1].CutDataService) {
            ClipBoard.CutDataService = {};
            ClipBoard.CutDataService.Service = cutPara[1].CutDataService.Service;
            ClipBoard.CutDataService.Para = { para: cutPara[1].CutDataServicePara };
        }
        var pagePara = cutPara[1];
        if (pagePara.DeleteLink && pagePara.DeleteLink == "true") {
            ClipBoard.CutIsDeleteLink = true;
            var selectID = null;
            var linkTypeName = null
            if (cutPara.length > 1) {
                pagePara =
                    ClipBoard.ParentID = pagePara.PEID;
                parentID = pagePara.PEID;
                if (HoteamUI.Common.IsNullOrEmpty(pagePara.LinkTypeName) == false) {
                    linkTypeName = cutPara[1].LinkTypeName.split(';')
                }
            }
            var para = {
                ObjIDArr: ClipBoard.ObjIDArr,
                Mode: ClipBoard.Mode,
                LinkTypeName: linkTypeName,
                ParentID: parentID,
                LIDArr: ClipBoard.LIDArr
            }
            var curObjectID = ClipBoard.ObjIDArr[0];
            var objectType = curObjectID.split('_')[0];
            var jsMethod = "";
            if (pagePara.JsMethod) {
                // for (var key in pagePara.JsMethod) {
                for (var index = 0; index < pagePara.JsMethod.length; index++) {
                    var item = pagePara.JsMethod[index];
                    if (item.Name == objectType) {
                        dataService = item.Value;
                        break;
                    }
                }
            }
            var result = "true";
            if (jsMethod != "") {
                HoteamUI.Common.ExeFunction(jsMethod, para);
            }
            else {
                var dataService = "InforCenter.Common.ObjectService.Cut";
                if (pagePara.DataService) {
                    //  for (var key in pagePara.DataService) {
                    for (var index = 0; index < pagePara.DataService.length; index++) {
                        var item = pagePara.DataService[index];
                        if (item.Name == objectType) {
                            dataService = item.Value;
                            break;
                        }
                    }
                }
                var result = HoteamUI.DataService.Call(dataService, { para: para });
            }
            if (result == "true" || result == true) {
                //刷新列表
                return { confirm: "OK" };
            }
        }
        else {
            ClipBoard.CutIsDeleteLink = false;
            var paras = cutPara[0];
            var paraValues = HoteamUI.Page.GetContainerPara(paras.ContainerID);
            var id, ctrl, selectObjects;
            if (!HoteamUI.Common.IsNullOrEmpty(paraValues.ListGuid)) {
                id = paraValues.ListGuid;
                ctrl = HoteamUI.Control.Instance(id);
                selectObjects = ctrl.GetSelectedRows();
                if (selectObjects) {
                    for (var i = 0; i < selectObjects.length; i++) {
                        ctrl.SetRowTextColor(selectObjects[i].row_number, '#ABABAB');
                        if (i > 0) {
                            ClipBoard.TreeNodeID += ";";
                            ClipBoard.TreeNodeData += ";";
                        }

                        ClipBoard.TreeNodeID += selectObjects[i].row_number;
                        ClipBoard.TreeNodeData += InforCenter_Platform_ClipBoard_GetUniqueFlag(selectObjects[i], "ListGuid");
                    }
                }

            } else if (!HoteamUI.Common.IsNullOrEmpty(paraValues.TreeListGuid)) {
                id = paraValues.TreeListGuid;
                ctrl = HoteamUI.Control.Instance(id);
                selectObjects = ctrl.GetSelectedRows();
                if (selectObjects) {
                    for (var i = 0; i < selectObjects.length; i++) {
                        ctrl.SetRowTextColor(selectObjects[i].row_number, '#ABABAB');
                        if (i > 0) {
                            ClipBoard.TreeNodeID += ";";
                            ClipBoard.TreeNodeData += ";";
                        }
                        ClipBoard.TreeNodeID += selectObjects[i].row_number;
                        ClipBoard.TreeNodeData += InforCenter_Platform_ClipBoard_GetUniqueFlag(selectObjects[i], "TreeListGuid");
                    }
                }
            } else {
                if (!HoteamUI.Common.IsNullOrEmpty(paraValues.TreeGuid)) {
                    id = paraValues.TreeGuid;
                    ctrl = HoteamUI.Control.Instance(id);
                    selectObjects = ctrl.GetSelectedNodes();
                    if (selectObjects) {
                        for (var i = 0; i < selectObjects.length; i++) {
                            ctrl.SetNodeFontColor(selectObjects[i], '#ABABAB');
                            if (i > 0) {
                                ClipBoard.TreeNodeID += ";";
                                ClipBoard.TreeNodeData += ";";
                            }
                            ClipBoard.TreeNodeID += selectObjects[i].tId;
                            ClipBoard.TreeNodeData += InforCenter_Platform_ClipBoard_GetUniqueFlag(selectObjects[i], "TreeGuid");
                        }
                    }
                }
            }
            return { confirm: "OK" };
        }
    }
};
InforCenter_Platform_ClipBoard_GetUniqueFlag = function (node, nodeType) {
    if (nodeType == "ListGuid") {
        return node.LID ? node.LID : "";
    }
    else if (nodeType == "TreeListGuid" || nodeType == "TreeGuid") {
        return node.value2 ? node.value2 : "";
    }
}
InforCenter_Platform_ClipBoard_RemoveListGridRow = function (ctrlData, gridDatas, tags) {
    if (ctrlData && !HoteamUI.Common.IsNullOrEmpty(ctrlData.id)) {
        var needDelete = [];
        for (i = 0; i < gridDatas.length; i++) {
            try {
                var row = ctrlData.GetRowByRowID(gridDatas[i]);
                if (row) {
                    var rowData = InforCenter_Platform_ClipBoard_GetUniqueFlag(row, tags);
                    if (datas.indexOf(rowData) > -1) {
                        needDelete.push(gridDatas[i]);
                    }
                }
            } catch (ex) {
                //console.log(ex);
            }
        }

        if (needDelete.length > 0) {
            try {
                ctrlData.DeleteDataByRowNums(needDelete);
            } catch (ex) {
                //console.log(ex);
            }
        }
    }
}
InforCenter_Platform_ClipBoard_Paste = function (pastePara) {
    var result = InforCenter_Platform_ClipBoard_PasteReturn(pastePara);
    if (result != null) {

        if (HoteamUI.Common.IsNullOrEmpty(result.Message) == false) {
            var callback = function (data, ret) {
                if (HoteamUI.Common.IsNullOrEmpty(result.AddIDs) == false) {
                    if (ClipBoard.Mode == "CUT") {
                        InforCenter_Platform_ClipBoard_ClearCutObject(pastePara);
                        InforCenter_Platform_ClipBoard_Clear();
                    }
                    InforCenter_Platform_MenuCtrl_InnerReceiveServerData(pastePara[0], { confirm: "OK", EID: result.AddIDs });
                }
            }
            HoteamUI.UIManager.MsgBox(result.Message, result.Detaile, false, callback);
        }
        else {
            if (HoteamUI.Common.IsNullOrEmpty(result.AddIDs) == false) {
                if (ClipBoard.Mode == "CUT") {
                    InforCenter_Platform_ClipBoard_ClearCutObject(pastePara);
                    InforCenter_Platform_ClipBoard_Clear();
                }
                InforCenter_Platform_MenuCtrl_InnerReceiveServerData(pastePara[0], { confirm: "OK", EID: result.AddIDs });
            }
        }
    }
};
InforCenter_Platform_ClipBoard_PasteReturn = function (pastePara) {
    if (ClipBoard.IsEmpty == true || ClipBoard.ObjIDArr.length == 0) {
        HoteamUI.UIManager.Popup({ pagename: "Confirm", paras: { pageMode: "OK", message: HoteamUI.Language.Lang("ClipBoard.ClipBoardEmpty") } });
        return;
    }
    var selectIDs = null;
    var pagePara = null;
    var sequenceFilter = "";
    if (pastePara.length > 1) {
        pagePara = pastePara[1];
        selectIDs = pagePara.SelectID;
        if (HoteamUI.Common.IsNullOrEmpty(pagePara.LinkTypeName) == false) {
            linkTypeName = pagePara.LinkTypeName.split(';')
        }
        if (HoteamUI.Common.IsNullOrEmpty(pagePara.SequenceFilter) == false) {
            sequenceFilter = pagePara.SequenceFilter;
        }
    }
    var para = {
        ObjIDArr: ClipBoard.ObjIDArr,
        Mode: ClipBoard.Mode,
        LinkTypeName: linkTypeName,
        SelectID: selectIDs,
        ParentID: ClipBoard.ParentID,
        LIDArr: ClipBoard.LIDArr,
        CutIsDeleteLink: ClipBoard.CutIsDeleteLink,
        Objects: ClipBoard.Objects,
        SequenceFilter: sequenceFilter
    }
    if (pastePara[1].CustomPara) {
        para = $.extend(true, {}, para, pastePara[1].CustomPara);
    }
    var curObjectID = ClipBoard.ObjIDArr[0];
    var objectType = curObjectID.split('_')[0];
    var jsMethod = "";
    if (pagePara.JsMethod) {
        // for (var key in pagePara.JsMethod) {
        for (var index = 0; index < pagePara.JsMethod.length; index++) {
            var item = pagePara.JsMethod[index];
            if (item.Name == objectType) {
                dataService = item.Value;
                break;
            }
        }
    }
    var result = "true";
    //判断剪切时是否需要自定义断关系
    if (ClipBoard.Mode == "CUT" && ClipBoard.CutDataService) {
        if (ClipBoard.CutDataService.Service && ClipBoard.CutDataService.Para) {
            HoteamUI.DataService.Call(ClipBoard.CutDataService.Service, ClipBoard.CutDataService.Para);
            ClipBoard.CutDataService = undefined;
            delete ClipBoard.CutDataService;
        }
    }
    if (jsMethod != "") {
        HoteamUI.Common.ExeFunction(jsMethod, para);
    }
    else {
        var dataService = "InforCenter.Common.ObjectService.Paste";
        if (pagePara.DataService) {
            // for (var key in pagePara.DataService) {
            for (var index = 0; index < pagePara.DataService.length; index++) {
                var item = pagePara.DataService[index];
                if (item.Name == objectType) {
                    dataService = item.Value;
                    break;
                }
            }
        }
        // 处理InitData
        var initList = [];
        var initData = pastePara[1].initData;
        if (initData) {
            for (var i in initData) {
                if (!initData.hasOwnProperty(i)) {
                    continue;
                }
                var initPara = {};
                initPara.Name = i;
                initPara.Value = pastePara[1].initData[i];
                initList.push(initPara);
            }
        }
        result = HoteamUI.DataService.Call(dataService, { para: para, initData: initList });
    }
    return result;

};
InforCenter_Platform_ClipBoard_ClearCutObject = function (pastePara) {
    //剪切未端关系模式，粘贴后清除已剪切节点
    if (ClipBoard.CutIsDeleteLink == false) {
        if (HoteamUI.Common.IsNullOrEmpty(ClipBoard.TreeNodeID)) {
            return;
        }

        var ids = ClipBoard.TreeNodeID.split(';');
        var datas = ClipBoard.TreeNodeData.split(';');

        var paraValues = ClipBoard.ParaValues;
        var ctrlid, ctrl;

        var curParaValues = {};
        if (pastePara && pastePara.length > 0 && pastePara[0].ContainerID) {
            curParaValues = HoteamUI.Page.GetContainerPara(pastePara[0].ContainerID);
        }

        if (!HoteamUI.Common.IsNullOrEmpty(paraValues.ListGuid)) {
            ctrlid = paraValues.ListGuid;
            if (!(curParaValues && curParaValues.ListGuid && ctrlid == curParaValues.ListGuid)) {
                //当前粘贴的控件与之前剪切的控件不是一个则移除数据
                ctrl = HoteamUI.Control.Instance(ctrlid);
                InforCenter_Platform_ClipBoard_RemoveListGridRow(ctrl, ids, "ListGuid");
            }

            //剪贴来源为列表的，处理一遍 列表在处理一遍树
            if (!HoteamUI.Common.IsNullOrEmpty(paraValues.TreeGuid)) {
                ctrlid = paraValues.TreeGuid;
                ctrl = HoteamUI.Control.Instance(ctrlid);
                if (ctrl && !HoteamUI.Common.IsNullOrEmpty(ctrl.id)) {
                    for (i = 0; i < datas.length; i++) {
                        try {
                            var nodes = ctrl.GetNodesByParam("value2", datas[i]);
                            if (nodes) {
                                for (var j = 0; j < nodes.length; j++) {
                                    if (nodes[j]) {
                                        ctrl.RemoveNode(nodes[j]);
                                    }
                                }
                            }
                        } catch (ex) {
                            //console.log(ex);
                        }
                    }
                }
            }
        }
        else if (!HoteamUI.Common.IsNullOrEmpty(paraValues.TreeListGuid)) {
            ctrlid = paraValues.TreeListGuid;
            ctrl = HoteamUI.Control.Instance(ctrlid);
            InforCenter_Platform_ClipBoard_RemoveListGridRow(ctrl, ids, "TreeListGuid");

        } else {
            if (!HoteamUI.Common.IsNullOrEmpty(paraValues.TreeGuid)) {
                ctrlid = paraValues.TreeGuid;
                ctrl = HoteamUI.Control.Instance(ctrlid);
                if (ctrl && !HoteamUI.Common.IsNullOrEmpty(ctrl.id)) {
                    for (var i = 0; i < ids.length; i++) {
                        try {
                            var nodes = ctrl.GetNodesByParam("tId", ids[i]);
                            if (nodes) {
                                for (var j = 0; j < nodes.length; j++) {
                                    if (nodes[j]) {
                                        var rowData = InforCenter_Platform_ClipBoard_GetUniqueFlag(nodes[j], "TreeGuid");
                                        if (datas.indexOf(rowData) > -1) {
                                            ctrl.RemoveNode(nodes[j]);
                                        }
                                    }
                                }
                            }
                        } catch (ex) {
                            //console.log(ex);
                        }
                    }
                }
            }
        }
        ClipBoard.TreeNodeID = null;
    }
}
InforCenter_Platform_ClipBoard_Clear = function () {
    ClipBoard.ObjIDArr.length = 0;
    ClipBoard.Mode = null;
    ClipBoard.ParentID = null;
    ClipBoard.LIDArr.length = 0;
    ClipBoard.IsEmpty = true;
    ClipBoard.TreeNodeID = "";
    ClipBoard.TreeNodeData = "";
    ClipBoard.CutIsDeleteLink = false;
    ClipBoard.Objects.length = 0;
    ClipBoard.ParaValues = null;
};
InforCenter_Platform_ClipBoard_ToClipBoard = function (para) {
    if (HoteamUI.Common.IsNullOrEmpty(para) == true) {
        return false;
    }
    if (para.length < 2) {
        return false;
    }

    //自定义复制的校验
    var isCheck = true;
    var functionName = 'InforCenter_Platform_ClipBoard_ToClipBoardCheck';
    if (window[functionName] && typeof window[functionName] == 'function')
        isCheck = window[functionName](para);
    if (!isCheck) {
        return;
    }

    //清除原剪切效果
    if (HoteamUI.Common.IsNullOrEmpty(ClipBoard.TreeNodeID) == false) {
        var paraValues = HoteamUI.Page.GetContainerPara(para[0].ContainerID);
        if (!HoteamUI.Common.IsNullOrEmpty(paraValues.TreeGuid)) {
            var ctrl = HoteamUI.Control.Instance(paraValues.TreeGuid);
            var ids = ClipBoard.TreeNodeID.split(';');
            for (var i = 0; i < ids.length; i++) {
                var nodes = ctrl.GetNodesByParam("tId", ids[i]);
                if (nodes) {
                    for (var j = 0; j < nodes.length; j++) {
                        ctrl.SetNodeFontColor(nodes[j], '#333');
                    }
                }
            }
        }
    }
    var state = true;
    InforCenter_Platform_ClipBoard_Clear();
    if (HoteamUI.Common.IsNullOrEmpty(para[1].EID) == false) {
        var str = para[1].EID.split(';');
        // for (var item in str) {
        for (var index = 0; index < str.length; index++) {
            ClipBoard.ObjIDArr[index] = str[index];
        }
        state = false;
    }
    if (HoteamUI.Common.IsNullOrEmpty(para[1].LID) == false) {
        var lids = para[1].LID.split(';');
        // for (var item in lids) {
        for (var index = 0; index < lids.length; index++) {
            ClipBoard.LIDArr[index] = lids[index];
        }
        state = false;
    }
    if (HoteamUI.Common.IsNullOrEmpty(para[1].PEID) == false) {
        ClipBoard.ParentID = para[1].PEID;
        state = false;
    }
    var i = 0;
    for (var p in para[1]) {
        if (!para[1].hasOwnProperty(p)) {
            continue;
        }
        if (typeof (para[1][p]) === "string") {
            ClipBoard.Objects[i] = {
                Key: p, Value: para[1][p]
            };
            i++;
        }
    }
    ClipBoard.IsEmpty = state;

    if (para && para.length > 0 && para[0].ContainerID) {
        var paraValues = HoteamUI.Page.GetContainerPara(para[0].ContainerID);
        ClipBoard.ParaValues = paraValues;
    }

    return true;
};
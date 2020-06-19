InforCenter_Platform_Import_OnCreate = function (ctrlEvent) {
    ctrlEvent.o.LoadTemplate("ImportPage");
    var pid = ctrlEvent.o.ContainerID();
    var paras = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID()).GetPara();

    var fileSupport = AppSets[paras.para.filetype + "_Import_Filter"];

    var message = HoteamUI.Language.Lang("ImportExport.ImportFilter");
    message = message.replace("[type]", fileSupport);

    $(".importFileTip", "#" + pid).html(HoteamUI.Language.Lang("Import.FileUpLoadTip")).next().html(message);
    $(".importFileUpLoad", "#" + pid).html(HoteamUI.Language.Lang("Import.FileUpLoadCtrl"));


    $("input[type='file']", "#" + pid)
        .focus()
        .attr("data-url", PageInit.WebRootPath + "/Base/BaseHandler.ashx?type=uploadFile&fileSupport=" + fileSupport)
        .fileupload({
            replaceFileInput: false,
            done: function (e, data) {
                var fileName;
                if (data.result == undefined) {
                    HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("Import.FileUpLoadError"));
                    return;
                }
                if (typeof data.result == "string") {
                    fileName = data.result;
                }
                else {
                    fileName = data.result[0].body ? data.result[0].body.innerHTML : data.result;
                }

                if (fileName) {
                    var dataparas = {};
                    dataparas.Path = paras.wcfpath;
                    dataparas.FileName = fileName;
                    dataparas.Paras = JSON.stringify(paras.wcfpara);
                    dataparas.FileType = paras.para.filetype;

                    var ret = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "ImportFile", { para: dataparas });

                    if (ret) {
                        ret = JSON.parse(ret).d;
                        if (ret) {
                            HoteamUI.UIManager.MsgBox(ret);
                            HoteamUI.UIManager.Return(pid, { confirm: "Cancel" });
                        }
                        else {
                            HoteamUI.UIManager.Return(pid, { confirm: "OK" });
                        }
                    }
                    else {
                        HoteamUI.UIManager.Return(pid, { confirm: "Cancel" });
                    }
                }
                else {

                    HoteamUI.UIManager.MsgBox(message);
                }
            },
            fail: function (e, data) {
                HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("Import.FileUpLoadError"));
            }
        });
}

InforCenter_Platform_Import_CancelOnClick = function (ctrlEvent) {
    var ret = { confirm: "Cancel" }
    var pid = ctrlEvent.o.ContainerID();
    HoteamUI.UIManager.Return(pid, ret);
}

InforCenter_Platform_Import_CommonImportCheck = function (importExistsData, importNewData, dataKeys, columnRegEx) {
    var datapara = {};
    datapara.ImportExistsData = importExistsData;
    datapara.ImportNewData = importNewData;
    datapara.DataKeys = dataKeys;
    datapara.ColumnRegEx = columnRegEx;
    var ret = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "CommonImportCheck", { para: datapara });
    return ret;
}

InforCenter_Platform_Import_CommonImportOnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var editListPage = page.GetControl("EditListContainer");
    var pagePara = page.GetPara();
    var listPage = HoteamUI.Page.InstanceIn(page.pid, "ListViewPageContainer", "EditListViewCtrl");
    var editlistGrid = listPage.GetControl("ListView");
    var oldPagePara = HoteamUI.Page.GetContainerPara(listPage.pid);
    if (oldPagePara != null && oldPagePara.AutoLoadData == false) {
        return;
    }
    var importCtrl = page.GetControl('ImportFileCtrl');
    var ctrlEvent = {};
    ctrlEvent.o = importCtrl;
    InforCenter_Platform_Import_CommonImportSelectFile(ctrlEvent, editlistGrid);
    pagePara = InforCenter_Platform_EditListManagement_LoadListMangementPage(pageEvent, page, listPage, editlistGrid, pagePara);
    var uploadCtrl = page.GetControl('BtnUpload');
    uploadCtrl.Disable();
}

//导入页面加载-----oncreate
InforCenter_Platform_Import_CommonImportSelectFile = function (ctrlEvent, grid, isShowPaging) {
    ctrlEvent.o.LoadTemplate("ImportPage");
    var pid = ctrlEvent.o.ContainerID();
    var page = HoteamUI.Page.Instance(pid);
    var uploadCtrl = page.GetControl('BtnImport');
    if (uploadCtrl.id != "")
        uploadCtrl.Disable();
    var paras = page.GetPara();
    var fileSupport = AppSets["Excel_Import_Filter"];
    var message = HoteamUI.Language.Lang("ImportExport.ImportFilter");
    message = message.replace("[type]", fileSupport);

    $(".importFileTip", "#" + pid).html(HoteamUI.Language.Lang("Import.FileUpLoadTip")).next().html(message);
    $(".importFileUpLoad", "#" + pid).html(HoteamUI.Language.Lang("Import.FileUpLoadCtrl"));
    var ele = $("input[type='file']", "#" + pid);
    ele
        .click(function () {
            //if (HoteamUI.Browser.isIE && (HoteamUI.Browser.version == '8.0' || HoteamUI.Browser.version == '9.0' || HoteamUI.Browser.version == '10.0')) {
            //    ele.select();
            //    document.selection.clear();
            //} else { ele.val(''); }
        })
        .focus()
        .attr("data-url", PageInit.WebRootPath + "/Base/BaseHandler.ashx?type=uploadFile&fileSupport=" + fileSupport)
        .fileupload({
            replaceFileInput: true,
            done: function (e, data) {
                var uploadCtrl = page.GetControl('BtnUpload');
                uploadCtrl.Disable();
                var fileName;
                if (data.result == undefined) {
                    HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("Import.FileUpLoadError"));
                    return;
                }
                if (typeof data.result == "string") {
                    fileName = data.result;
                }
                else {
                    fileName = data.result[0].body ? data.result[0].body.innerHTML : data.result;
                }

                if (fileName) {
                    var dataparas = {};
                    //dataparas.Path = paras.wcfpath;
                    dataparas.Path = "InforCenter.ImportExport.ImportExportService.GetImportExcelContent"
                    dataparas.FileName = fileName;
                    dataparas.Paras = JSON.stringify(paras.wcfpara);
                    dataparas.FileType = "Excel";

                    var ret = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "ImportFile", { para: dataparas });
                    if (ret) {
                        var excelData = JSON.parse(ret);
                        if (excelData.d == undefined) {
                            paras.excelData = JSON.stringify(excelData);
                        }
                        else {
                            paras.excelData = excelData.d;
                        }
                        HoteamUI.Page.SetContainerParas(pid, page.PageName(), paras);
                        var gridTitleData = InforCenter_Platform_Import_GetGridTitleData(paras);
                        paras.gridwcfpath = "InforCenter.ImportExport.ImportExportService.GetImportExcelData"
                        var gridData = HoteamUI.DataService.Call(paras.gridwcfpath, { para: { Content: paras.excelData, ObjectID: paras.Tree_Current_Tag_EID, GridTitleData: JSON.stringify(gridTitleData) } });
                        if (gridData) {
                            gridData.RecordsTotal = gridData.Rows.length;

                            //判断是否分页 
                            if (!isShowPaging) {
                                grid.LoadGridRows(gridData, true);
                                grid.SetSelectAll();
                            } else {
                                var pager = grid.GetPagerInfo();
                                pager.CurrentPager = 1;
                                grid.SetPagerInfo(pager);
                                var startIndex = (pager.CurrentPager - 1) * pager.RowNumber;
                                var endIndex = pager.CurrentPager * pager.RowNumber;

                                var pageRow = new Array();
                                for (var i = 0; i < gridData.Rows.length; i++) {
                                    if (i >= startIndex && i < endIndex) {
                                        pageRow.push(gridData.Rows[i]);
                                    }
                                }

                                var pageData = {};
                                pageData.RecordsTotal = gridData.Rows.length;
                                pageData.RowSettings = gridData.RowSettings;
                                pageData.Rows = pageRow;
                                grid.LoadGridRows(pageData, true);
                                grid.SetSelectAll();

                                var gridPara = {};
                                gridPara.AllData = gridData;
                                gridPara.SelectRows = new Array();
                                for (var i = 0; i < gridData.Rows.length; i++) {
                                    gridPara.SelectRows.push(true);
                                }
                                HoteamUI.Page.SetContainerParas(grid.id, gridPara);
                            }
                        }
                    }
                    else {
                        HoteamUI.UIManager.Return(pid, { confirm: "Cancel" });
                    }
                }
                else {
                    HoteamUI.UIManager.MsgBox(message);
                }
            },
            fail: function (e, data) {
                HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("Import.FileUpLoadError"));
            }
        });
}

//数据校验-----oncreate
InforCenter_Platform_Import_CommonOnDataCheck = function (ctrlEvent) {
    //根据按钮控件取到页面、页面参数、并实例化父窗体列表控件获取数据
    var containerID = ctrlEvent.o.ContainerID();
    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    //每次数据校验前先设置导入按钮初始状态不可用
    var uploadCtrl = page.GetControl('BtnUpload');
    uploadCtrl.Disable();
    var paras = page.GetPara();

    var listPage = HoteamUI.Page.InstanceIn(page.pid, "ListViewPageContainer", "EditListViewCtrl");
    var ImportGridCtrl = listPage.GetControl("ListView");
    var ImportRows = ImportGridCtrl.GetCurrentPageRows();
    paras.CurrentGrid = ImportGridCtrl;
    if (!paras.hasOwnProperty("excelData") || ImportRows.length == 0) {

        HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("ImportExport.NoImportFile"));
        return;
    }
    paras.ImportRows = ImportRows;
    var result = null;
    if (paras.CheckDataInitJs) {//支持传入校验数据，系统进行校验

        var checkInitData = HoteamUI.Common.ExeFunction(paras.CheckDataInitJs, paras)
        if (!checkInitData) {
            return;
        }
        var ImportNewData = JSON.stringify(ImportRows);
        var ImportExistsData;

        //如果没有传入需要比对的数据，则默认取当前父窗体列表数据
        if (checkInitData.ImportExistsData != null && checkInitData.ImportExistsData != "") {
            ImportExistsData = JSON.stringify(checkInitData.ImportExistsData);
        }
        
        var DataKeys = "";
        if (checkInitData.DataKeys != null) {
            DataKeys = checkInitData.DataKeys;
        }
        var ColumnRegEx = "";
        if (checkInitData.ColumnRegEx != null) {
            ColumnRegEx = checkInitData.ColumnRegEx;
        }
        result = InforCenter_Platform_Import_CommonImportCheck(ImportExistsData, ImportNewData, DataKeys, ColumnRegEx);
    } else {//支持自定义的校验
        //自定义校验 直接将校验抛给业务，业务校验只返回校验信息resultMsg，空则表示成功，失败则resultMsg不为空
        //result["Result"]="true"  校验成功  result["Message"] 提示信息
        result = HoteamUI.Common.ExeFunction(paras.CheckDataJs, paras)
    }
    callback = function (data, ret) {
        if (ret != undefined) {
            paras["ImportConfirm"] = ret.confirm;
            if (ret.confirm != "Cancel") {
                var uploadCtrl = page.GetControl('BtnUpload');
                uploadCtrl.Enable();
                HoteamUI.Page.SetContainerParas(page.pid, paras);
            }
        }
    }
    result = JSON.parse(result);
    paras.RepeatRowIndexs = result["RepeatRowIndexs"];
    paras.ImportRows = result["ImportRows"];
    HoteamUI.Page.SetContainerParas(page.pid, paras);
    if (HoteamUI.Common.IsNullOrEmpty(result["Message"])) {
        var uploadCtrl = page.GetControl('BtnUpload');
        uploadCtrl.Enable();
        HoteamUI.UIManager.MsgBox(HoteamUI.Language.Lang("ImportExport.ImportCheckSucess"));
    } else {
        HoteamUI.UIManager.Popup("ImportPopUpMessage", { result: result["Result"], message: result["Message"], msgTitle: HoteamUI.Language.Lang("CommonImport.ImportPopUpMessageTitle") }, callback, {});
    }
}

//导入校验信息弹出页面-----oncreate
InforCenter_Platform_ImportPopUpMessage_OnCreate = function (pageEvent) {
    var page = pageEvent.o;
    var pagePara = page.GetPara();

    var msg = pagePara.msgTitle;
    var detailmsg = pagePara.message;
    var iconName = 'point';
    var iconUrl;
    pageEvent.o.GetControl("Text_Box").SetText(detailmsg);
    iconUrl = PageInit.WebRootPath + "/Base/Image/" + iconName + '.png';
    var messageHtml = ['<div class="confirm-message">',
        '<img src="', iconUrl, '"/>',
        '<p>', msg, '</p>',
        '</div>'].join('');
    pageEvent.o.GetControl("Message_Label").AppendHtml(messageHtml);

    var textBox = page.GetControl("Text_Box");
    var Btn_Skip = page.GetControl("Btn_Skip");
    var Btn_Update = page.GetControl("Btn_Update");
    if (pagePara.result == "false") {
        Btn_Skip.Disable();
        Btn_Update.Disable();
    } else {
        Btn_Skip.Enable();
        Btn_Update.Enable();
    }
    //textBox.SetText(pagePara.message);
}

//获取列表标题通用方法,获取到表头数据传递给后台根据表头拼Excel数据，返回GridData形成列表界面
InforCenter_Platform_Import_GetGridTitleData = function (para, oldPara) {
    var titleDataService = "InforCenter.Common.EditWebListViewService.GetEditGridRowTitle";
    if (HoteamUI.Common.IsNullOrEmpty(para.EditListTitleDataService) == false) {
        titleDataService = para.EditListTitleDataService;
    }
    var gridTitleData;
    $.each(EditListManagementScript, function (index, val) {
        if (val.Name == para.ItemName)
            gridTitleData = JSON.parse(JSON.stringify(val));
    });
    if (gridTitleData == null) {
        gridTitleData = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GetEditListManagement", { para: { Name: para.ItemName } });
        if (gridTitleData != null)
            EditListManagementScript.push(gridTitleData);
    }
    para.ListViewName = gridTitleData.ListViewName;
    if (para.gridTitle == undefined) {
        var execPara = {};
        if (oldPara != undefined && oldPara != "" && HoteamUI.Common.IsNullOrEmpty(oldPara.RefreshTitle) == false && oldPara.RefreshTitle == "true") {
            var returnData = InforCenter_Platform_MenuCtrl_GetParameters(oldPara, oldPara);
            returnData = JSON.stringify(returnData);
            execPara.para = { ViewName: para.ListViewName, ParaList: returnData };
        }
        else {
            var sParaList = JSON.stringify(para);
            execPara.para = { ViewName: para.ListViewName, ParaList: sParaList };
        }
        para.gridTitle = HoteamUI.DataService.Call(titleDataService, execPara);
    }
    return para.gridTitle;
}

InforCenter_Platform_Import_CommonOnUpload = function (ctrlEvent) {
    var containerId = ctrlEvent.o.ContainerID();

    var curpage = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    var pagepara = curpage.GetPara();
    var editGrid = HoteamUI.Page.InstanceIn(curpage.pid, "ListViewPageContainer", "EditListViewCtrl").GetControl("ListView");
    if (!editGrid.SaveEditCell()) {
        return false;
    }
    var gridRows = editGrid.SaveGridRows();
    gridRows = editGrid.GetSelectedRows();
    if (gridRows == undefined) {
        return false;
    }
    pagepara.GridRows = gridRows;
    var callback = function (ret) {
        if (!ret) {
            HoteamUI.UIManager.Popup({ pagename: "Confirm", paras: { pageMode: "OK", message: HoteamUI.Language.Lang("ImportExport.UpLoadDataError") } });
            return;
        }
        HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), { confirm: 'OK' });
        var list = HoteamUI.Control.Instance(pagepara.ListID);
        //InforCenter_Platform_ListViewCtrl_GetOnePageGridData(list, pagepara);
        InforCenter_Platform_MenuCtrl_InnerReceiveServerData(pagepara, { confirm: "OK" });
    }
    pagepara.CallBack = callback;
    pagepara.ImportPageId = containerId;
    HoteamUI.Common.ExeFunction(pagepara.ImportUploadJs, pagepara);
}

InforCenter_Platform_Import_DownTemplete = function (ctrlEvent) {
    var page = HoteamUI.Page.Instance(ctrlEvent.o.ContainerID());
    var editListPage = page.GetControl("EditListContainer");
    var listPage = HoteamUI.Page.InstanceIn(page.pid, "ListViewPageContainer", "EditListViewCtrl");
    var editlistGrid = listPage.GetControl("ListView");
    var colModels = editlistGrid.GetColModel();
    var pager = editlistGrid.GetPagerInfo();
    var columns = new Array();
    var rowData = new Array();
    var exportCol = [];
    var emptyRow = {};
    for (var k = 0; k < colModels.length; k++) {
        if (colModels[k].colType === "image" || colModels[k].colType === "hidden")
            continue;
        var col = {};
        col.ColumnName = colModels[k].name;
        col.ColumnText = colModels[k].text;
        col.ColumnType = colModels[k].colType;
        columns.push(JSON.stringify(col));
        exportCol.push({ "ColumnName": col.ColumnName });
        emptyRow[col.ColumnName] = '';
    }
    rowData.push(JSON.stringify(emptyRow));
    exportFrontColumn = columns;
    var pagePara = page.GetPara();
    var data = null;
    $.each(EditListManagementScript, function (index, val) {
        if (val.Name == pagePara.ItemName)
            data = JSON.parse(JSON.stringify(val));
    });
    pagePara = $.extend(data, pagePara);
    var paras = {
        Pager: pager, Columns: exportCol, ViewName: pagePara.ListViewName, ParaList: "", FilterString: pagePara.FilterString, EntityFilterString: pagePara.EntityFilterString, IsAll: "0", RowsIndexList: [],
        ReplaceName: pagePara.ReplaceName, IsFrontExporting: true, FrontListData: rowData, FrontListColumn: exportFrontColumn
    };
    PlatformUI.UIManager.ExportFileFromGrid.Call("", paras);
}

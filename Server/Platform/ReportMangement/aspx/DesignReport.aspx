<%@ Page Language="C#" AutoEventWireup="true" CodeFile="DesignReport.aspx.cs" Inherits="Platform_ReportManagement_DesignReport" %>

<%@ Register Namespace="Stimulsoft.Report.Web" TagPrefix="cc2" Assembly="Stimulsoft.Report.WebDesign" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <div>
                <cc2:StiWebDesigner ID="StiWebDesigner_Item" runat="server" LocalizationDirectory="/Localization/" Localization="zh-CHS" OnSaveReport="StiWebDesigner1_SaveReport" OnOpenReport="StiWebDesigner1_OpenReport" OnDataBinding="StiWebDesigner1_DataBinding" OnPreRender="StiWebDesigner1_PreRender" OnPreviewReport="StiWebDesigner1_PreviewReport" OnSaveReportAs="StiWebDesigner_Item_SaveReportAs" Theme="Office2013LightGrayBlue" UseCompression="True" />
            </div>
        </div>
    </form>
    <div id="openReportDialogX" style="display: none; margin: 0 auto; padding: 0; z-index: 10001; position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; background-color: rgba(99, 99, 99,0.5);">
        <div style="margin: 0 auto; background: #fff; width: 200px; margin-top: 100px; padding: 10px  10px 10px 10px; border-radius: 5px; text-align: center;">
            <span id="openReportClose" style="position: relative; width: 10px; height: 10px; background-color: red; display: block; margin-left: 190px; cursor: pointer; /* font-size: 10px; */"></span>
            <h3 style="margin: 0 auto; margin-bottom: 10px;">打开报表设计</h3>
            <select id="openReportMrt" style="width: 100%; height: 30px; border-color: #5596d6;">
            </select>
            <input type="button" id="openReportOK" value="打开" style="width: 200px; height: 30px; border-style: solid; border-radius: 5px; background-color: #5596d6; color: #fff; margin-top: 10px;" />
        </div>
    </div>
    <script src="../../../Base/Js/jquery.js"></script>
    <script>
        var Hoteam_InforCenter_ReportManage_OpenReportFileJObject;
        //
        var Hoteam_InforCenter_ReportManage_CallAjax = function (method, data, callBack, errCall) {
            $.ajax({
                url: '../ReportServices.asmx/' + method,
                type: 'post',
                data: JSON.stringify(data),
                dataType: 'json',
                cache: false,
                contentType: 'application/json',
                success: function (data) {
                    resutrndata = data;
                    if (resutrndata.d != undefined) {
                        resutrndata = resutrndata.d;

                        if (resutrndata && callBack) {
                            callBack(resutrndata);
                        }
                    }
                },
                error: function (err) {
                    if (errCall) {
                        errCall(err)
                    }

                    window.console && window.console.error(err);
                },
                complete: function (XHR, TS) {
                    XHR.abort = null;
                    XHR = null;
                }
            });
        }

        Hoteam_InforCenter_ReportManage_OpenReportFile = function () {
            $('#openReportDialogX').show();

            var callFunc = function (data) {
                $("#openReportMrt").empty();
                $.each(data, function (i, item) {
                    $("#openReportMrt").append("<option value='" + item + "'>" + item + "</option>");
                });
            }

            Hoteam_InforCenter_ReportManage_CallAjax('GetReportPath', {}, callFunc);
        }

        $('#openReportOK').click(function () {
            var callFunc = function (result) {
                var fileName = $("#openReportMrt").val() + ".mrt";
                if (Hoteam_InforCenter_ReportManage_OpenReportFileJObject) {
                    Hoteam_InforCenter_ReportManage_OpenReportFileJObject.OpenReport(fileName, "data:application/octet-stream;base64," + result, fileName);
                    Hoteam_InforCenter_ReportManage_OpenReportFileJObject.ReturnFocusToDesigner();

                    $('#openReportDialogX').hide();
                }
            }

            Hoteam_InforCenter_ReportManage_CallAjax('GetReportBase64', { name: $("#openReportMrt").val() }, callFunc);
        });

        $("#openReportClose").click(function () {
            $('#openReportDialogX').hide();
        });

        //Open Report
        StiMobileDesigner.prototype.StiHandleOpenReport = function (evt) {
            Hoteam_InforCenter_ReportManage_OpenReportFile();
        }

        StiMobileDesigner.prototype.InitializeOpenDialog = function (nameDialog, actionFunction, fileMask) {
            var inputFile = {};
            inputFile.jsObject = this;
            inputFile.action = function () {
                actionFunction();
            }

            this.options.openDialogs[nameDialog] = inputFile;

            Hoteam_InforCenter_ReportManage_OpenReportFileJObject = this;
            return inputFile;
        }
    </script>
</body>
</html>

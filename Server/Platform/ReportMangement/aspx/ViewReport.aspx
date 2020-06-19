<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ViewReport.aspx.cs" Inherits="Platform_ReportManagement_ViewReport" %>
<%@ Register  Namespace="Stimulsoft.Report.Web" TagPrefix="cc1"  Assembly="Stimulsoft.Report.Web"%>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
             <div>
            <cc1:StiWebViewer ID="StiWebViewer_Item" runat="server"  GlobalizationFile="Localization/zh-CHS.xml" ShowDesignButton="True" 
          BackColor="#e8e8e8" OnDataBinding="StiWebViewer1_DataBinding" 
                OnGetReportData="StiWebViewer1_GetReportData" OnInteraction="StiWebViewer1_Interaction" OnPrintReport="StiWebViewer_Item_PrintReport"/>
            
        </div>
        </div>
    </form>
</body>
</html>

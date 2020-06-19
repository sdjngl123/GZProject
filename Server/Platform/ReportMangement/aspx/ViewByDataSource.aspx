<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ViewByDataSource.aspx.cs" Inherits="Platform_TestReport_aspx_ViewByDataSource" %>
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
             <cc1:StiWebViewer ID="StiWebViewer1" runat="server"  GlobalizationFile="Localization/zh-CHS.xml" ShowDesignButton="True" onreportdesign="StiWebViewer1_ReportDesign"  BackColor="#e8e8e8"/>
            
        </div>
    </form>
</body>
</html>

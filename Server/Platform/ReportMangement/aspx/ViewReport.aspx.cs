using System;
using Hoteam.InforCenter.Report.Management;

public partial class Platform_ReportManagement_ViewReport : ViewReport
{
    protected void Page_Load(object sender, EventArgs e)
    {
        base.StiWebViewer1 = StiWebViewer_Item;
        base.Page_Load(sender, e);
    }

    protected void StiWebViewer1_DataBinding(object sender, EventArgs e)
    {
        base.StiWebViewer1 = StiWebViewer_Item;
        base.StiWebViewer1_DataBinding(sender, e);
    }

    protected void StiWebViewer1_GetReportData(object sender, Stimulsoft.Report.Web.StiReportDataEventArgs e)
    {
        base.StiWebViewer1 = StiWebViewer_Item;
        base.StiWebViewer1_GetReportData(sender, e);
    }

    protected void StiWebViewer1_Interaction(object sender, Stimulsoft.Report.Web.StiReportDataEventArgs e)
    {
        base.StiWebViewer1 = StiWebViewer_Item;
        base.StiWebViewer1_GetReportData(sender, e);
    }

    protected void StiWebViewer_Item_PrintReport(object sender, Stimulsoft.Report.Web.StiPrintReportEventArgs e)
    {
        base.StiWebViewer1 = StiWebViewer_Item;
        base.StiWebViewer1_PrintReport(sender, e);
    }
}
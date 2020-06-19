using Hoteam.InforCenter.Service.Interface.Parameter;
using Hoteam.InforCenter.ServiceManage.Business;
using Hoteam.InforCenter.UI.Base.Base;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Stimulsoft.Report;
using Stimulsoft.Report.Components;
using System;
using Hoteam.InforCenter.Report.Management;
using Stimulsoft.Report.Web;
using System.Web.Services;
using System.Collections.Generic;
using System.IO;
using System.Linq;

public partial class Platform_ReportManagement_DesignReport : DesignReport
{
    protected void Page_Load(object sender, EventArgs e)
    {
        base.StiWebDesigner1 = StiWebDesigner_Item;
        base.Page_Load(sender, e);
    }

    protected void StiWebDesigner1_SaveReport(object sender, StiSaveReportEventArgs e)
    {
        base.StiWebDesigner1 = StiWebDesigner_Item;
        base.StiWebDesigner1_SaveReport(sender, e);
    }

    protected void StiWebDesigner1_OpenReport(object sender, StiReportDataEventArgs e)
    {
        base.StiWebDesigner1 = StiWebDesigner_Item;
        base.StiWebDesigner1_OpenReport(sender, e);
    }

    protected void StiWebDesigner1_PreviewReport(object sender, StiReportDataEventArgs e)
    {
        base.StiWebDesigner1 = StiWebDesigner_Item;
        base.StiWebDesigner1_PreviewReport(sender, e);
    }

    protected void StiWebDesigner1_PreRender(object sender, EventArgs e)
    {
        base.StiWebDesigner1 = StiWebDesigner_Item;
        base.StiWebDesigner1_PreRender(sender, e);
    }

    protected void StiWebDesigner1_DataBinding(object sender, EventArgs e)
    {
        base.StiWebDesigner1 = StiWebDesigner_Item;
        base.StiWebDesigner1_DataBinding(sender, e);
    }


    protected void StiWebDesigner_Item_SaveReportAs(object sender, StiSaveReportEventArgs e)
    {
        base.StiWebDesigner1 = StiWebDesigner_Item;
        base.StiWebDesigner_Item_SaveReportAs(sender, e);
    }
}

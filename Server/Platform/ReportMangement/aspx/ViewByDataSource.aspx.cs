using Stimulsoft.Report;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Platform_TestReport_aspx_ViewByDataSource : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        var report = GetReport();
        
        this.StiWebViewer1.Report = report;
    }

    private StiReport GetReport()
    {
        var report = new StiReport();
        
        //根据路径加载报表文件
        report.Load(GetReportPath());
        //动态改变数据库连接
        //设置参数等
        report.Dictionary.Databases.Clear();
        report.RegData(GetDataSource());
        report.Compile();
        SetReportParamaters(report);

        return report;
    }

    private void SetReportParamaters(StiReport report)
    {
        var dataSource = report.CompiledReport.DataSources;
        foreach (Stimulsoft.Report.Dictionary.StiDataSource ds in dataSource)
        {
            var param = Request.QueryString;
            foreach (string key in param.Keys)
            {
                if (!ds.Parameters.Contains(key)) continue;
                var p = ds.Parameters[key];
                var v = param[key];
                p.ParameterValue = v;
            }
        }
    }

    private string GetReportPath()
    {
        var path = Server.MapPath("~/platform/TestReport/aspx/Eitem.mrt");
        return path;
    }

    private void ChangeConnectString(StiReport report)
    {
        foreach (Stimulsoft.Report.Dictionary.StiSqlDatabase item in report.Dictionary.Databases)
        {
            var prefix = item.Name.Split('_')[0];
            // item.ConnectionString = ConfigurationManager.ConnectionStrings["sqlConnection"].ConnectionString;
        }
    }

    protected void StiWebViewer1_ReportDesign(object sender, EventArgs e)
    {
        //StiWebDesigner1.Design(GetReport());

        //StiWebDesigner1.
    }

    private DataTable GetDataSource()
    {
        DataTable dt = new DataTable();
        SqlConnection sql = new SqlConnection(@"server=.\WANGCHAO;Trusted_Connection=false;database=InforCenter8.1;uid=sa;pwd=sa;MultipleActiveResultSets=true;Max Pool Size=1000;");
        sql.Open();

        var command = sql.CreateCommand();
        command.CommandText = "select * from pseitem";
        var data = command.ExecuteReader();
        dt.Load(data);
        sql.Close();
        return dt;
    }
}
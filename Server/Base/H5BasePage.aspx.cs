using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;
using Hoteam.InforCenter.UI.Base.Base;
using Hoteam.InforCenter.UI.Base.Config;
using Hoteam.InforCenter.Service.Interface.Config;

public partial class H5_BasePage : H5BasePage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        lbWait.Text= AppSettings.Instance.GetAppSetValue("WaitPageText");
    }
}
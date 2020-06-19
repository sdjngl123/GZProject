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

public partial class Base_IntegrationBasePage : Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Server.Transfer("/Base/BasePage.aspx");
    }
}
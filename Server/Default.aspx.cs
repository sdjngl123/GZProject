using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Hoteam.InforCenter.Service.Interface.Config;

public partial class _Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPC(this))
        {
            if (Request["IsApp"] != null && Request["IsApp"] == "true")
            {
                if (AppSettings.Instance.GetAppSetValue("EnableWebPageCache") == "true")
                {
                    Server.Transfer("MobileBase/MobileBasePage.aspx");
                }
                else
                {
                    Server.Transfer("MobileBase/MobileBasePageNoCache.aspx");
                }

            }
            else
            {
                var download = AppSettings.Instance.GetAppSetValue("AppDownLoadPage");
                if (string.IsNullOrEmpty(download))
                {
                    download = "MobileBase/AppDownload.html";
                }
                Server.Transfer(download);
            }
        }
        else
        {
            Server.Transfer("Base/BasePage.aspx");
        }
    }

    public bool IsPC(System.Web.UI.Page p)
    {
        bool isPC = true;
        string agent = p.Request.UserAgent.ToString();
        string[] Agents = new string[] { "Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod" };
        for (int i = 0; i < Agents.Length; i++)
        {
            if (agent.IndexOf(Agents[i]) > -1)
            {
                isPC = false;

            }
        }
        return isPC;
    }
}
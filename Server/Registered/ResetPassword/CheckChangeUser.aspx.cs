using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Hoteam.InforCenter.UI.Base.Base;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using Hoteam.InforCenter.ServiceManage.Business;

public partial class Registered_CheckChangeUser : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string checkCode = Request["CheckCode"];
        if (checkCode.ToLower().Trim() != Session["ValidateCode"].ToString().ToLower().Trim())
        {
            Response.ContentType = "application/json";
            Response.Write("{\"Key\":\"ValidateCode\",\"Value\":\"输入的校验码错误\"}");

            return;
        }

        string userName = Request["UserName"];
        string type = "email";
        if (userName.Contains("@") == false)
        {
            type = "phone";
        }
        string json = "{Connect:\"" + "" + "\",ServiceUri:\"" + "Hoteam.Registered.RegisteredDataService.CheckMailOrCompanyNameExist" + "\"}";
        string content = "{\"para\":{" + "\"RegisterEmail\":\"" + userName + "\",\"ValidateType\":\"" + type + "\",\"Connect\":\"" + "" + "\",\"TimeZone\":\"" + "+08:00" + "\"}}";
        string ret = CallDataServer(json, content);
        if (string.IsNullOrEmpty(ret))
        {
            Response.ContentType = "application/json";
            Response.Write("{\"Key\":\"ValidateCode\",\"Value\":\"邮箱或手机号没有注册\"}");
        }
        else
        {
            //判断是否已经审核通过
            json = "{Connect:\"" + "" + "\",ServiceUri:\"" + "Hoteam.Registered.RegisteredDataService.CheckMailOrCompanyNameExistAudited" + "\"}";
            ret = CallDataServer(json, content);
            if (string.IsNullOrEmpty(ret) == false)
            {
                Response.ContentType = "application/json";
                Response.Write("{\"Key\":\"ValidateCode\",\"Value\":\"邮箱或手机号没有审核通过\"}");
            }
            else
            {
                Session["ResetPassword_RegisterEmail"] = userName;
            }

        }
    }

    private string CallDataServer(string dataparaJson, string contentJson)
    {
        string ret = "";

        DataPara dataPara = (DataPara)(JsonConvert.DeserializeObject(dataparaJson, typeof(DataPara)));

        BaseService bs = new BaseService();
        string returnValue = string.Empty;
        returnValue = bs.DataService(dataPara, contentJson);
        JObject jdata = JObject.Parse(returnValue);
        JToken jtoken = null;
        if (jdata != null)
        {
            if (jdata.TryGetValue("d", out jtoken) == true)
            {
                ret = ((JValue)jtoken).Value.ToString();
            }
        }
        return ret;
    }
}
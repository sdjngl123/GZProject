using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Hoteam.InforCenter.Service.Interface.Config;
using Hoteam.InforCenter.UI.Base.Config;
using System.Net.Mail;
using System.Text;
using Hoteam.InforCenter.Registered.WebService.Organization.Business;
using System.Net;
using System.IO;
using System.Security.Cryptography;
using Hoteam.InforCenter.UI.Base.Base;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Top.Api;
using Top.Api.Request;
using Top.Api.Response;
using Hoteam.InforCenter.Registered.WebService;
using Hoteam.InforCenter.ServiceManage.Business;

public partial class Registered_ResetPassword_IdentityVerification : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        var type = Request["Method"].ToString();
        if (Session["ResetPassword_RegisterEmail"] == null || Session["ResetPassword_RegisterEmail"] == "")
        {
            Session.Add("ResetPassword_RegisterEmail", Request["Email"].ToString());
        }
        switch (type)
        {
            case "CheckValidateCode":
                CheckValidateCode();
                break;
            case "SavePassword":
                SavePassword();
                break;
        }
    }


    private void CheckValidateCode()
    {
        string validate = Request["ValidateCode"].ToString();
        var list = RegisteredWebService.ObtainPasswordValidateCodeList;
        if (list != null && list.Count > 0)
        {
            var validateCode = list.Where(o => o.eMailAddress == Session["ResetPassword_RegisterEmail"].ToString() && o.ValidateCode == validate.Trim()).FirstOrDefault();
            if (validateCode != null)
            {
                list.Remove(validateCode);
                //验证成功后,本次验证码则失效
                var timespan = DateTime.Now - validateCode.RegisteTime;
                if (timespan.Minutes > 30)
                {
                    Response.ContentType = "application/json";
                    Response.Write("{\"Key\":\"ValidateCode\",\"Value\":\"验证码已过期,请重新获取\"}");
                    return;
                }
            }
            else
            {
                Response.ContentType = "application/json";
                Response.Write("{\"Key\":\"ValidateCode\",\"Value\":\"验证码输入错误.\"}");
                return;
            }
        }
        else
        {
            Response.ContentType = "application/json";
            Response.Write("{\"Key\":\"ValidateCode\",\"Value\":\"验证码已过期.\"}");
            return;
        }
        //验证成功
        Response.ContentType = "application/json";
        string token = getToken(); ;
        Session["ResetPassword_Token"] = getToken();
        Response.Write("{\"Success\":\"true\",\"Token\":\"" + HttpUtility.UrlEncode(token) + "\"}");

    }

    private string getToken()
    {
        //生成Token的key值
        string KEY = AppSettings.Instance.GetAppSetValue("OWAHmacKey");
        byte[] keyByte;
        int saltLength = 8;

        //使用加密服务提供程序 (CSP) 提供的实现来实现加密随机数生成器 (RNG)
        RNGCryptoServiceProvider s_rngCsp = new RNGCryptoServiceProvider();
        keyByte = Encoding.UTF8.GetBytes(KEY);

        byte[] salt = new byte[saltLength];
        s_rngCsp.GetBytes(salt);

        var saltStr = Convert.ToBase64String(salt);

        HMACSHA256 hmac = new HMACSHA256(keyByte);
        var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(saltStr + Session["ResetPassword_RegisterEmail"]));
        var rv = Convert.ToBase64String(hash);
        return saltStr + rv;

    }

    private void SavePassword()
    {
        string token = Request["Token"].ToString();
        token = HttpUtility.UrlDecode(token);
        string password = Request["Password"].ToString();
        if (Validate(token))
        {
            //保存密码
            string json = "{Connect:\"" + "" + "\",ServiceUri:\"" + "Hoteam.Registered.RegisteredDataService.ChangePassword" + "\"}";
            string content = "{\"para\":{" + "\"RegisterEmail\":\"" + Session["ResetPassword_RegisterEmail"].ToString() + "\",\"Password\":\"" + password + "\",\"Connect\":\"" + "" + "\",\"TimeZone\":\"" + "+08:00" + "\"}}";
            string ret = CallDataServer(json, content);
            if (ret.ToLower() == "ok")
            {
                Response.ContentType = "application/json";
                Response.Write("{\"Key\":\"Success\",\"Value\":\"修改密码成功\"}");
                //session置空                
                Session["ResetPassword_RegisterEmail"] = "";
            }
            else
            {
                Response.ContentType = "application/json";
                Response.Write("{\"Key\":\"Error\",\"Value\":\"修改密码失败\"}");
            }

        }
        else
        {
            Response.ContentType = "application/json";
            Response.Write("{\"Key\":\"Error\",\"Value\":\"没有权限修改密码\"}");
            return;
        }
    }

    public bool Validate(string access_token)
    {
        //生成Token的key值
        string KEY = AppSettings.Instance.GetAppSetValue("OWAHmacKey");
        byte[] keyByte;
        keyByte = Encoding.UTF8.GetBytes(KEY);
        int saltLength = 8;
        string saltStr = access_token.Substring(0, saltLength + 4);

        //使用加密服务提供程序 (CSP) 提供的实现来实现加密随机数生成器 (RNG)
        RNGCryptoServiceProvider s_rngCsp = new RNGCryptoServiceProvider();


        HMACSHA256 hmac = new HMACSHA256(keyByte);
        var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(saltStr + Session["ResetPassword_RegisterEmail"]));
        var rv = Convert.ToBase64String(hash);
        if (access_token == (saltStr + rv))
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    public void GetToken()
    {
        Response.ContentType = "application/json";
        string token = Session["ResetPassword_Token"] as string;
        Response.Write("{\"Key\":\"Success\",\"Value\":\"" + token + "\"}");
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
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Drawing;
using Hoteam.InforCenter.Registered.WebService;

public partial class Registered_CodeGif : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        GenGifCode gencode = new GenGifCode();
        string randomcode = "";
        byte[] bytes = gencode.GetCodeImage(out randomcode);
        Session["ValidateCode"] = randomcode;
        Response.ClearContent();
        Response.ContentType = "image/gif";
        Response.BinaryWrite(bytes);
    }
}
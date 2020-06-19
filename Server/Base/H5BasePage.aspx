<%@ Page Language="C#" AutoEventWireup="true" CodeFile="H5BasePage.aspx.cs" Inherits="H5_BasePage" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!- [if lt IE 9]> 
    <script src="Base/Js/es5-shim.min.js"></script>
    <script src="Base/Js/html5shiv.min.js"></script>
    <script src="Base/Js/respond.min.js"></script>
    <script src='Base/Js/IE9.shim.js'></script>
    <![endif] ->

</head>
<body id="body" onunload="HoteamUI.Security.LogoutActive()">
    <form id="BaseForm" action="" runat="server">
        <div id="LoginWait_Container">
            <div id="LoginWait">
                <div class="Waite_Logo"></div>
                <div class="text">
                    <asp:Label ID="lbWait" runat="server" Text="Label"></asp:Label>
                </div>
            </div>
        </div>
        <div id="PageContainer">
        </div>
    </form>
</body>
<!--[if lte IE 8]>
    <script type="text/javascript">
        $("body").append("<div style='width: 100%;height: 28px;line-height: 28px;position: absolute;z-index: 10000;text-align: center;border-bottom: 1px solid #F5F5BF;background-color: #ffffe1;color: red;'>您正在使用的浏览器使用了兼容模式或版本过低，为了更好的浏览体验，建议您取消兼容模式或升级当前版本(IE9及以上)！<span id='closeIEError' class='basesprite b-close' style='float:right;margin-top:5px;margin-right:10px;cursor:pointer;'></span></div>");
        $("#closeIEError").click(function(){
            $(this).parent().remove();
        });
    </script>
    <![endif]-->
</html>

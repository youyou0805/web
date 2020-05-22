<%@ Page Language="C#" AutoEventWireup="true" CodeFile="login.aspx.cs" Inherits="login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <style type="text/css">
       body {background-image:url('images/1.jpg');}
        #form1 {
            width: 850px;
            height: 300px;
        }
        .auto-style1 {
            font-weight: bold;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server" style="font-family: 华文彩云; font-size: 45pt; font-weight: 600; font-style: inherit; color: #FFFFFF">

        <br />
        <br />

        <strong>&nbsp;&nbsp; 欢迎登录学生成绩管理系统</strong>
    <div style="border: medium double #FFFFFF; height: 335px; width: 617px; background-color: #3D5F8F; text-align: center; background-image: inherit; clip: rect(auto, auto, auto, auto); float: left; margin-left: 100px; font-family: 幼圆; font-size: 20pt; font-weight: 600; color: #FFFFFF; margin-top: 100px;">
    
        <br />
        <b style="font-size: 20pt">用户登录<br />
        <br />
        用户名：</b><asp:TextBox ID="TextBox1" runat="server" CssClass="auto-style1" Height="20px" Width="157px"></asp:TextBox><b><br />
        
        密&nbsp; 码：</b><asp:TextBox ID="TextBox2" runat="server" CssClass="auto-style1" Height="20px"></asp:TextBox><b><br />
        用户类型：<asp:RadioButton ID="RadioButton1" runat="server" Text="学生" Checked="True" GroupName="1" /><asp:RadioButton ID="RadioButton2" runat="server" Text="教师" GroupName="1" /><asp:RadioButton ID="RadioButton3" runat="server" Text="管理员" GroupName="1" /><br />
        验证码：<asp:TextBox ID="TextBox3" runat="server" Height="19px" Width="76px"></asp:TextBox><asp:Image ID="Image1" runat="server"  src="ImgPng.aspx" style="cursor:pointer" onclick="this.src=this.src+'?'" align="middle"  alt="看不清楚，点击换一张！"   />
        <br />
        </b><br />
        <asp:Button ID="Button1" runat="server" Text="登录" Font-Names="幼圆" Font-Size="Medium" Height="32px" OnClick="Button1_Click" Width="68px" />&nbsp;&nbsp;&nbsp; <asp:Button ID="Button2" runat="server" Text="重置" Font-Bold="False" Font-Names="幼圆" Font-Size="Medium" Height="30px" Width="67px" OnClick="Button2_Click" />
    </div>

    </form>
    </body>
</html>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using WebSite2;

public partial class login : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void Button1_Click(object sender, EventArgs e)
    {
        string user = TextBox1.Text.Trim();
        string pass = TextBox2.Text.Trim();
        if (user != pass) ClientScript.RegisterStartupScript(GetType(), "message", "<script>alert('用户名或密码错误！');</script>");
        string sf;
        if (RadioButton1.Checked) sf = "学生";
        else if (RadioButton2.Checked) sf = "教师";
        else sf = "管理员";
        if (new Class1().Exist(user, sf))
        {
            ClientScript.RegisterStartupScript(GetType(), "message", "<script>alert('用户不存在！');</script>");
        }
        else
        {
            string vCode = Session["CheckCode"].ToString();
            if (TextBox3.Text.Trim().ToUpper() != vCode.ToUpper())
            {
                ScriptManager.RegisterStartupScript(this.Page, this.GetType(), "Startup", "alert('验证码错误!');", true);
            }
            else
            {
                switch (sf)
                {
                    case "学生": 
                        {
                            Session["用户名"]=user;
                            Session["权限"] = 1;
                            ClientScript.RegisterStartupScript(GetType(), "message", "<script>alert('学生登录成功！');</script>");
                        }break;
                    case "教师":
                        {
                            Session["用户名"] = user;
                            Session["权限"] = 2;
                            ClientScript.RegisterStartupScript(GetType(), "message", "<script>alert('教师登录成功！');</script>");
                        } break;
                    case "管理员":
                        {
                            Session["用户名"] = user;
                            Session["权限"] = 3;
                            ClientScript.RegisterStartupScript(GetType(), "message", "<script>alert('管理员登录成功！');</script>");
                        } break;
                    default:break;
                }
            }

        }

    }
    protected void Button2_Click(object sender, EventArgs e)
    {
        Response.Redirect("login.aspx");
    }
}
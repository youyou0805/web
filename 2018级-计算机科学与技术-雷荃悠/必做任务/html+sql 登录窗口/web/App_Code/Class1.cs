using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;
using System.Web.UI.WebControls;

/// <summary>
/// Class1 的摘要说明
/// </summary>
namespace WebSite2
{ 
public class Class1
{
		private  string cnstr = "server=LAPTOP-JV7IAKVA;database=学生成绩管理系统;uid=sa;pwd=990805;";

        public void noquery(string sql)
        {
            SqlConnection cn = new SqlConnection(cnstr);
            cn.Open();
            SqlCommand cmd = new SqlCommand(sql, cn);
            cmd.ExecuteNonQuery();
            cn.Close();
            cmd.Clone();
        }

        public   DataTable gettable(string sql)
        {
            string cnstr = "server=LAPTOP-JV7IAKVA;database=学生成绩管理系统;uid=sa;pwd=990805;";
            SqlConnection cn = new SqlConnection(cnstr);
            cn.Open();
            DataSet ds = new DataSet();
            SqlDataAdapter sda = new SqlDataAdapter(sql, cn);
            sda.Fill(ds, "t1");
            cn.Close();
            return  ds.Tables["t1"];
        }
        public bool Exist(string xh, string sf)
        {
            string cnstr = "server=LAPTOP-JV7IAKVA;database=学生成绩管理系统;uid=sa;pwd=990805;";
            SqlConnection cn = new SqlConnection(cnstr);
            cn.Open();
            string sql;
            if (sf == "学生")
                sql = "select * from 学生表 where 学号='" + xh + "' ";
            else if (sf == "教师")
                sql = "select * from 教师表 where 教师号='" + xh + "' ";
            else if (sf == "管理员")
                sql = "select * from 管理员表 where 管理员号='" + xh + "' ";
            else if (sf=="课程")
                sql = "select * from 课程表 where 课程编号='" + xh + "' ";
            else
                sql = "select * from 学生选课信息表 where id='" + xh + "' ";
            SqlCommand cmd = new SqlCommand(sql, cn);
            SqlDataReader dr;
            dr = cmd.ExecuteReader();
            if (dr.HasRows)
                return false;
            else return true;
        }
        public int count(string sql)
        {
            int count=0;
            string cnstr = "server=LAPTOP-JV7IAKVA;database=学生成绩管理系统;uid=sa;pwd=990805;";
            SqlConnection cn = new SqlConnection(cnstr);
            cn.Open();
            SqlCommand cmd = new SqlCommand(sql, cn);
            SqlDataReader dr;
            dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                count++;
            }
            return count;
        }
    public void  filltable(DataTable t1,Table t,int del,int modi)//del =1标识有删除连接，modi=1表示有修改
     {
         TableRow tr0 = new TableRow();
         for (int j = 0; j < t1.Columns.Count; j++)
             {
                 TableCell td = new TableCell();
             if(j==0)
                 td.Text = "学号";
             else if(j==1)
                 td.Text = "姓名";
             else if(j==2)
                 td.Text = "性别";
             else if(j==3)
                 td.Text = "专业编码";
             else if(j==4)
                 td.Text = "出生日期";
             else
                 td.Text = "";
                 tr0.Cells.Add(td);
             }
             t.Rows.Add(tr0);
        for(int i=0;i<t1.Rows.Count;i++)
        {
         TableRow tr=new TableRow();
            for(int j=0;j<t1.Columns.Count;j++)
            {
                TableCell td=new TableCell();
                td.Text=t1.Rows[i][j].ToString().Trim();
                tr.Cells.Add(td);
            }
            if (del == 1)
            {
                TableCell tdm = new TableCell();
                tdm.Text = "<a href=delexs.aspx?id=" + t1.Rows[i]["学号"].ToString() + ">删除</a>";
                tr.Cells.Add(tdm);
            }
            if (modi == 1)
            {
                TableCell tdm = new TableCell();
                tdm.Text="<a href=modidata1.aspx?id="+t1.Rows[i]["学号"].ToString()+">修改</a>";
                tr.Cells.Add(tdm);
            }
            t.Rows.Add(tr);
        }
     }
    public void filltable2(DataTable t1, Table t, int del, int modi)//del =1标识有删除连接，modi=1表示有修改
    {
        TableRow tr0 = new TableRow();
        for (int j = 0; j < t1.Columns.Count; j++)
        {
            TableCell td = new TableCell();
            if (j == 0)
                td.Text = "教师号";
            else if (j == 1)
                td.Text = "姓名";
            else if (j == 2)
                td.Text = "性别";
            else if (j == 3)
                td.Text = "专业编码";
            else if (j == 4)
                td.Text = "出生日期";
            else if (j == 5)
                td.Text = "手机号码";
            else
                td.Text = "";
            tr0.Cells.Add(td);
        }
        t.Rows.Add(tr0);
        for (int i = 0; i < t1.Rows.Count; i++)
        {
            TableRow tr = new TableRow();
            for (int j = 0; j < t1.Columns.Count; j++)
            {
                TableCell td = new TableCell();
                td.Text = t1.Rows[i][j].ToString().Trim();
                tr.Cells.Add(td);
            }
            if (del == 1)
            {
                TableCell tdm = new TableCell();
                tdm.Text = "<a href=delexs.aspx?id=" + t1.Rows[i]["教师号"].ToString() + ">删除</a>";
                tr.Cells.Add(tdm);
            }
            if (modi == 1)
            {
                TableCell tdm = new TableCell();
                tdm.Text = "<a href=modidata1.aspx?id=" + t1.Rows[i]["教师号"].ToString() + ">修改</a>";
                tr.Cells.Add(tdm);
            }
            t.Rows.Add(tr);
        }
    }
    public void filltable3(DataTable t1, Table t, int del, int modi)//del =1标识有删除连接，modi=1表示有修改
    {
        TableRow tr0 = new TableRow();
        for (int j = 0; j < t1.Columns.Count; j++)
        {
            TableCell td = new TableCell();
            if (j == 0)
                td.Text = "id";
            else if (j == 1)
                td.Text = "学号";
            else if (j == 2)
                td.Text = "姓名";
            else if (j == 3)
                td.Text = "课程编号";
            else if (j == 4)
                td.Text = "课程名称";
            else if (j == 5)
                td.Text = "成绩";
            else if (j == 6)
                td.Text = "学期";
            else
                td.Text = "";
            tr0.Cells.Add(td);
        }
        t.Rows.Add(tr0);
        for (int i = 0; i < t1.Rows.Count; i++)
        {
            TableRow tr = new TableRow();
            for (int j = 0; j < t1.Columns.Count; j++)
            {
                TableCell td = new TableCell();
                td.Text = t1.Rows[i][j].ToString().Trim();
                tr.Cells.Add(td);
            }
            if (del == 1)
            {
                TableCell tdm = new TableCell();
                tdm.Text = "<a href=delexs.aspx?id=" + t1.Rows[i]["id"].ToString() + ">删除</a>";
                tr.Cells.Add(tdm);
            }
            if (modi == 1)
            {
                TableCell tdm = new TableCell();
                tdm.Text = "<a href=modidataclass.aspx?id=" + t1.Rows[i]["id"].ToString() + ">修改</a>";
                tr.Cells.Add(tdm);
            }
            t.Rows.Add(tr);
        }
    }
	}
}

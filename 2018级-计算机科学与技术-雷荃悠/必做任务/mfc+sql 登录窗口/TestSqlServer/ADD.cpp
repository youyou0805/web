// ADD.cpp : 实现文件
//

#include "stdafx.h"
#include "TestSqlServer.h"
#include "TestSqlServerDlg.h"
#include "ADD.h"
#include "afxdialogex.h"


// CADD 对话框

IMPLEMENT_DYNAMIC(CADD, CDialogEx)

CADD::CADD(CWnd* pParent /*=NULL*/)
	: CDialogEx(CADD::IDD, pParent)
	, username(_T(""))
	, pass(_T(""))
{

}

CADD::~CADD()
{
}

void CADD::DoDataExchange(CDataExchange* pDX)
{
	CDialogEx::DoDataExchange(pDX);
	DDX_Text(pDX, IDC_EDIT1, username);
	DDX_Text(pDX, IDC_EDIT2, pass);
}


BEGIN_MESSAGE_MAP(CADD, CDialogEx)
	ON_BN_CLICKED(IDC_BUTTON1, &CADD::OnBnClickedButton1)
	ON_BN_CLICKED(IDCANCEL, &CADD::OnBnClickedCancel)
END_MESSAGE_MAP()


// CADD 消息处理程序


void CADD::OnBnClickedButton1()
{
	// TODO: 在此添加控件通知处理程序代码
	UpdateData(true);
	CString m_command;
	m_command=_T("insert into 账号表(用户名,密码) values('" +username+ _T("','") + pass +_T("')"));
	m_pRecordset.CreateInstance(__uuidof(Recordset)); //创建实例
	HRESULT hr=m_pRecordset->Open(m_command.GetBuffer(0),_variant_t(m_pConnection,true),adOpenDynamic,adLockPessimistic,adCmdText);
	if(SUCCEEDED(hr))
		AfxMessageBox(_T("添加成功"));
	else
	{
		AfxMessageBox(_T("添加错误"));
		SendMessage(WM_CLOSE);
	}
}


BOOL CADD::OnInitDialog()
{
	CDialogEx::OnInitDialog();

	// TODO:  在此添加额外的初始化
		 AfxOleInit();
    HRESULT hr;
    hr=m_pConnection.CreateInstance("ADODB.Connection");
    m_pConnection->ConnectionTimeout = 8;
    try
    {
        _bstr_t strConnect = "Provider=SQLOLEDB.1;Persist Security Info=False;User ID=sa;Password=990805;Initial Catalog=学生管理;Data Source=LAPTOP-JV7IAKVA";//初始化连接  
        hr = m_pConnection->Open(strConnect, "", "", adModeUnknown);//打开数据库
        if (FAILED(hr))
        {
            AfxMessageBox(_T("不能连接数据库!"));
            return 1;
        }
        else
            AfxMessageBox(_T("连接数据库成功!"));
    }
    catch (_com_error e)
    {
        AfxMessageBox(e.Description());

        return 0;
    }
	
	// 异常: OCX 属性页应返回 FALSE
}


void CADD::OnBnClickedCancel()
{
	// TODO: 在此添加控件通知处理程序代码
	CDialogEx::OnCancel();
	
}


// TestSqlServerDlg.cpp : 实现文件
//

#include "stdafx.h"
#include "TestSqlServer.h"
#include "TestSqlServerDlg.h"
#include "afxdialogex.h"
#include "Add.h"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif


// 用于应用程序“关于”菜单项的 CAboutDlg 对话框

class CAboutDlg : public CDialogEx
{
public:
	CAboutDlg();

// 对话框数据
	enum { IDD = IDD_ABOUTBOX };

	protected:
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV 支持

// 实现
protected:
	DECLARE_MESSAGE_MAP()
};

CAboutDlg::CAboutDlg() : CDialogEx(CAboutDlg::IDD)
{
}

void CAboutDlg::DoDataExchange(CDataExchange* pDX)
{
	CDialogEx::DoDataExchange(pDX);
}

BEGIN_MESSAGE_MAP(CAboutDlg, CDialogEx)
END_MESSAGE_MAP()


// CTestSqlServerDlg 对话框



CTestSqlServerDlg::CTestSqlServerDlg(CWnd* pParent /*=NULL*/)
	: CDialogEx(CTestSqlServerDlg::IDD, pParent)
	, m_acount(_T(""))
	, m_password(_T(""))
{
	m_hIcon = AfxGetApp()->LoadIcon(IDR_MAINFRAME);
}

void CTestSqlServerDlg::DoDataExchange(CDataExchange* pDX)
{
	CDialogEx::DoDataExchange(pDX);
	DDX_Text(pDX, IDC_EDIT1, m_acount);
	//  DDX_Text(pDX, IDC_EDIT2, m_passward);
	DDX_Text(pDX, IDC_EDIT2, m_password);
}

BEGIN_MESSAGE_MAP(CTestSqlServerDlg, CDialogEx)
	ON_WM_SYSCOMMAND()
	ON_WM_PAINT()
	ON_WM_QUERYDRAGICON()
	ON_BN_CLICKED(IDC_BUTTON2, &CTestSqlServerDlg::OnBnClickedButton2)
	ON_BN_CLICKED(IDC_BUTTON3, &CTestSqlServerDlg::OnBnClickedButton3)
	ON_BN_CLICKED(IDC_BUTTON4, &CTestSqlServerDlg::OnBnClickedButton4)
END_MESSAGE_MAP()


// CTestSqlServerDlg 消息处理程序

BOOL CTestSqlServerDlg::OnInitDialog()
{
	CDialogEx::OnInitDialog();

	// 将“关于...”菜单项添加到系统菜单中。

	// IDM_ABOUTBOX 必须在系统命令范围内。
	ASSERT((IDM_ABOUTBOX & 0xFFF0) == IDM_ABOUTBOX);
	ASSERT(IDM_ABOUTBOX < 0xF000);

	CMenu* pSysMenu = GetSystemMenu(FALSE);
	if (pSysMenu != NULL)
	{
		BOOL bNameValid;
		CString strAboutMenu;
		bNameValid = strAboutMenu.LoadString(IDS_ABOUTBOX);
		ASSERT(bNameValid);
		if (!strAboutMenu.IsEmpty())
		{
			pSysMenu->AppendMenu(MF_SEPARATOR);
			pSysMenu->AppendMenu(MF_STRING, IDM_ABOUTBOX, strAboutMenu);
		}
	}

	// 设置此对话框的图标。当应用程序主窗口不是对话框时，框架将自动
	//  执行此操作
	SetIcon(m_hIcon, TRUE);			// 设置大图标
	SetIcon(m_hIcon, FALSE);		// 设置小图标

	// TODO: 在此添加额外的初始化代码
	return TRUE;  // 除非将焦点设置到控件，否则返回 TRUE
}

void CTestSqlServerDlg::OnSysCommand(UINT nID, LPARAM lParam)
{
	if ((nID & 0xFFF0) == IDM_ABOUTBOX)
	{
		CAboutDlg dlgAbout;
		dlgAbout.DoModal();
	}
	else
	{
		CDialogEx::OnSysCommand(nID, lParam);
	}
}

// 如果向对话框添加最小化按钮，则需要下面的代码
//  来绘制该图标。对于使用文档/视图模型的 MFC 应用程序，
//  这将由框架自动完成。

void CTestSqlServerDlg::OnPaint()
{
	if (IsIconic())
	{
		CPaintDC dc(this); // 用于绘制的设备上下文

		SendMessage(WM_ICONERASEBKGND, reinterpret_cast<WPARAM>(dc.GetSafeHdc()), 0);

		// 使图标在工作区矩形中居中
		int cxIcon = GetSystemMetrics(SM_CXICON);
		int cyIcon = GetSystemMetrics(SM_CYICON);
		CRect rect;
		GetClientRect(&rect);
		int x = (rect.Width() - cxIcon + 1) / 2;
		int y = (rect.Height() - cyIcon + 1) / 2;

		// 绘制图标
		dc.DrawIcon(x, y, m_hIcon);
	}
	else
	{
		CDialogEx::OnPaint();
	}
}

//当用户拖动最小化窗口时系统调用此函数取得光标
//显示。
HCURSOR CTestSqlServerDlg::OnQueryDragIcon()
{
	return static_cast<HCURSOR>(m_hIcon);
}

static int a=1;
void CTestSqlServerDlg::OnBnClickedButton2()
{
	
	if(a==1)
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
            return;
        }
        else
            AfxMessageBox(_T("连接数据库成功!"));
    }
    catch (_com_error e)
    {
        AfxMessageBox(e.Description());
        return;
    }

	UpdateData(true);
	CString m_command,password;

	m_command=_T("select * from 账号表 where 用户名='"+m_acount+_T("'"));
	m_pRecordset.CreateInstance(__uuidof(Recordset)); //创建实例

	m_pRecordset->Open(m_command.GetBuffer(0),_variant_t(m_pConnection,true),adOpenDynamic,adLockPessimistic,adCmdText);
	password=(LPCSTR)_bstr_t(m_pRecordset->GetCollect("密码"));
	password.Trim();
	if(m_password == password)
		AfxMessageBox(_T("欢迎回来"));
	else
	{
		AfxMessageBox(_T("密码错误"));
		SendMessage(WM_CLOSE);
	}
	m_pRecordset->Close();
}


void CTestSqlServerDlg::OnBnClickedButton3()
{
	// TODO: 在此添加控件通知处理程序代码
	SendMessage(WM_CLOSE);
}


void CTestSqlServerDlg::OnBnClickedButton4()
{
	// TODO: 在此添加控件通知处理程序代码
	a=0;
	CADD add;
	add.DoModal();	
}

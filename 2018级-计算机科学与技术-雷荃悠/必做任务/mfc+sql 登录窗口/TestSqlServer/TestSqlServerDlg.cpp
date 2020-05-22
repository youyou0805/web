
// TestSqlServerDlg.cpp : ʵ���ļ�
//

#include "stdafx.h"
#include "TestSqlServer.h"
#include "TestSqlServerDlg.h"
#include "afxdialogex.h"
#include "Add.h"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif


// ����Ӧ�ó��򡰹��ڡ��˵���� CAboutDlg �Ի���

class CAboutDlg : public CDialogEx
{
public:
	CAboutDlg();

// �Ի�������
	enum { IDD = IDD_ABOUTBOX };

	protected:
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV ֧��

// ʵ��
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


// CTestSqlServerDlg �Ի���



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


// CTestSqlServerDlg ��Ϣ�������

BOOL CTestSqlServerDlg::OnInitDialog()
{
	CDialogEx::OnInitDialog();

	// ��������...���˵�����ӵ�ϵͳ�˵��С�

	// IDM_ABOUTBOX ������ϵͳ���Χ�ڡ�
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

	// ���ô˶Ի����ͼ�ꡣ��Ӧ�ó��������ڲ��ǶԻ���ʱ����ܽ��Զ�
	//  ִ�д˲���
	SetIcon(m_hIcon, TRUE);			// ���ô�ͼ��
	SetIcon(m_hIcon, FALSE);		// ����Сͼ��

	// TODO: �ڴ���Ӷ���ĳ�ʼ������
	return TRUE;  // ���ǽ��������õ��ؼ������򷵻� TRUE
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

// �����Ի��������С����ť������Ҫ����Ĵ���
//  �����Ƹ�ͼ�ꡣ����ʹ���ĵ�/��ͼģ�͵� MFC Ӧ�ó���
//  �⽫�ɿ���Զ���ɡ�

void CTestSqlServerDlg::OnPaint()
{
	if (IsIconic())
	{
		CPaintDC dc(this); // ���ڻ��Ƶ��豸������

		SendMessage(WM_ICONERASEBKGND, reinterpret_cast<WPARAM>(dc.GetSafeHdc()), 0);

		// ʹͼ���ڹ����������о���
		int cxIcon = GetSystemMetrics(SM_CXICON);
		int cyIcon = GetSystemMetrics(SM_CYICON);
		CRect rect;
		GetClientRect(&rect);
		int x = (rect.Width() - cxIcon + 1) / 2;
		int y = (rect.Height() - cyIcon + 1) / 2;

		// ����ͼ��
		dc.DrawIcon(x, y, m_hIcon);
	}
	else
	{
		CDialogEx::OnPaint();
	}
}

//���û��϶���С������ʱϵͳ���ô˺���ȡ�ù��
//��ʾ��
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
        _bstr_t strConnect = "Provider=SQLOLEDB.1;Persist Security Info=False;User ID=sa;Password=990805;Initial Catalog=ѧ������;Data Source=LAPTOP-JV7IAKVA";//��ʼ������  
        hr = m_pConnection->Open(strConnect, "", "", adModeUnknown);//�����ݿ�
        if (FAILED(hr))
        {
            AfxMessageBox(_T("�����������ݿ�!"));
            return;
        }
        else
            AfxMessageBox(_T("�������ݿ�ɹ�!"));
    }
    catch (_com_error e)
    {
        AfxMessageBox(e.Description());
        return;
    }

	UpdateData(true);
	CString m_command,password;

	m_command=_T("select * from �˺ű� where �û���='"+m_acount+_T("'"));
	m_pRecordset.CreateInstance(__uuidof(Recordset)); //����ʵ��

	m_pRecordset->Open(m_command.GetBuffer(0),_variant_t(m_pConnection,true),adOpenDynamic,adLockPessimistic,adCmdText);
	password=(LPCSTR)_bstr_t(m_pRecordset->GetCollect("����"));
	password.Trim();
	if(m_password == password)
		AfxMessageBox(_T("��ӭ����"));
	else
	{
		AfxMessageBox(_T("�������"));
		SendMessage(WM_CLOSE);
	}
	m_pRecordset->Close();
}


void CTestSqlServerDlg::OnBnClickedButton3()
{
	// TODO: �ڴ���ӿؼ�֪ͨ����������
	SendMessage(WM_CLOSE);
}


void CTestSqlServerDlg::OnBnClickedButton4()
{
	// TODO: �ڴ���ӿؼ�֪ͨ����������
	a=0;
	CADD add;
	add.DoModal();	
}

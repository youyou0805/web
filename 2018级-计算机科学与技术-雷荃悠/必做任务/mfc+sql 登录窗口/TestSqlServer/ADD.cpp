// ADD.cpp : ʵ���ļ�
//

#include "stdafx.h"
#include "TestSqlServer.h"
#include "TestSqlServerDlg.h"
#include "ADD.h"
#include "afxdialogex.h"


// CADD �Ի���

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


// CADD ��Ϣ�������


void CADD::OnBnClickedButton1()
{
	// TODO: �ڴ���ӿؼ�֪ͨ����������
	UpdateData(true);
	CString m_command;
	m_command=_T("insert into �˺ű�(�û���,����) values('" +username+ _T("','") + pass +_T("')"));
	m_pRecordset.CreateInstance(__uuidof(Recordset)); //����ʵ��
	HRESULT hr=m_pRecordset->Open(m_command.GetBuffer(0),_variant_t(m_pConnection,true),adOpenDynamic,adLockPessimistic,adCmdText);
	if(SUCCEEDED(hr))
		AfxMessageBox(_T("��ӳɹ�"));
	else
	{
		AfxMessageBox(_T("��Ӵ���"));
		SendMessage(WM_CLOSE);
	}
}


BOOL CADD::OnInitDialog()
{
	CDialogEx::OnInitDialog();

	// TODO:  �ڴ���Ӷ���ĳ�ʼ��
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
            return 1;
        }
        else
            AfxMessageBox(_T("�������ݿ�ɹ�!"));
    }
    catch (_com_error e)
    {
        AfxMessageBox(e.Description());

        return 0;
    }
	
	// �쳣: OCX ����ҳӦ���� FALSE
}


void CADD::OnBnClickedCancel()
{
	// TODO: �ڴ���ӿؼ�֪ͨ����������
	CDialogEx::OnCancel();
	
}

#pragma once


// CADD 对话框

class CADD : public CDialogEx
{
	DECLARE_DYNAMIC(CADD)

public:
	CADD(CWnd* pParent = NULL);   // 标准构造函数
	virtual ~CADD();

// 对话框数据
	enum { IDD = IDD_DIALOG1 };

protected:
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV 支持

	DECLARE_MESSAGE_MAP()
public:
	CString username;
	CString pass;	
	_ConnectionPtr m_pConnection;//连接access数据库的链接对象  
    _RecordsetPtr m_pRecordset;//结果集对象
	afx_msg void OnBnClickedButton1();
	virtual BOOL OnInitDialog();
	afx_msg void OnBnClickedCancel();
};

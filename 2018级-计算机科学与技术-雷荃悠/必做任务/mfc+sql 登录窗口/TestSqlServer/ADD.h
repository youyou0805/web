#pragma once


// CADD �Ի���

class CADD : public CDialogEx
{
	DECLARE_DYNAMIC(CADD)

public:
	CADD(CWnd* pParent = NULL);   // ��׼���캯��
	virtual ~CADD();

// �Ի�������
	enum { IDD = IDD_DIALOG1 };

protected:
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV ֧��

	DECLARE_MESSAGE_MAP()
public:
	CString username;
	CString pass;	
	_ConnectionPtr m_pConnection;//����access���ݿ�����Ӷ���  
    _RecordsetPtr m_pRecordset;//���������
	afx_msg void OnBnClickedButton1();
	virtual BOOL OnInitDialog();
	afx_msg void OnBnClickedCancel();
};

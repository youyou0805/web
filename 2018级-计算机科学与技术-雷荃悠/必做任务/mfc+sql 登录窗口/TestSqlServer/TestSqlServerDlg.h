
// TestSqlServerDlg.h : ͷ�ļ�
//

#include "stdafx.h"
#pragma once


// CTestSqlServerDlg �Ի���
class CTestSqlServerDlg : public CDialogEx
{
// ����
public:
	CTestSqlServerDlg(CWnd* pParent = NULL);	// ��׼���캯��

// �Ի�������
	enum { IDD = IDD_TESTSQLSERVER_DIALOG };

	protected:
	virtual void DoDataExchange(CDataExchange* pDX);	// DDX/DDV ֧��


// ʵ��
protected:
	HICON m_hIcon;

	// ���ɵ���Ϣӳ�亯��
	virtual BOOL OnInitDialog();
	afx_msg void OnSysCommand(UINT nID, LPARAM lParam);
	afx_msg void OnPaint();
	afx_msg HCURSOR OnQueryDragIcon();
	DECLARE_MESSAGE_MAP()
public:
	afx_msg void OnBnClickedButton1();
	_ConnectionPtr m_pConnection;//����access���ݿ�����Ӷ���  
    _RecordsetPtr m_pRecordset;//���������
	afx_msg void OnBnClickedButton2();
	CString m_acount;
	CString m_password;
	afx_msg void OnBnClickedButton3();
	afx_msg void OnBnClickedButton4();
};


// TestSqlServerDlg.h : 头文件
//

#include "stdafx.h"
#pragma once


// CTestSqlServerDlg 对话框
class CTestSqlServerDlg : public CDialogEx
{
// 构造
public:
	CTestSqlServerDlg(CWnd* pParent = NULL);	// 标准构造函数

// 对话框数据
	enum { IDD = IDD_TESTSQLSERVER_DIALOG };

	protected:
	virtual void DoDataExchange(CDataExchange* pDX);	// DDX/DDV 支持


// 实现
protected:
	HICON m_hIcon;

	// 生成的消息映射函数
	virtual BOOL OnInitDialog();
	afx_msg void OnSysCommand(UINT nID, LPARAM lParam);
	afx_msg void OnPaint();
	afx_msg HCURSOR OnQueryDragIcon();
	DECLARE_MESSAGE_MAP()
public:
	afx_msg void OnBnClickedButton1();
	_ConnectionPtr m_pConnection;//连接access数据库的链接对象  
    _RecordsetPtr m_pRecordset;//结果集对象
	afx_msg void OnBnClickedButton2();
	CString m_acount;
	CString m_password;
	afx_msg void OnBnClickedButton3();
	afx_msg void OnBnClickedButton4();
};

package com.inv.mgmt.model;

public class ErrorMsgModel {
	
	public String message;
	public String code;
	
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public ErrorMsgModel() {
		super();
		// TODO Auto-generated constructor stub
	}
	public ErrorMsgModel(String message, String code) {
		super();
		this.message = message;
		this.code = code;
	}
	
	
	

}

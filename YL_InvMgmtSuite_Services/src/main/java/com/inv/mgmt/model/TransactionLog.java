package com.inv.mgmt.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "TRANSACTION_LOGS")
public class TransactionLog {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column(name="skuId")
	private String skuId;
	
	@Column(name="masterId")
	private String masterId;
	
	@Column(name="date")
	private Date date;
	
	@Column(name="transaction")
	private String transaction;
	
	@Column(name="type")
	private String type;
	
	@Column(name="user")
	private String user;
	
	
	
	public long getId() {
		return id;
	}



	public void setId(long id) {
		this.id = id;
	}



	public String getSkuId() {
		return skuId;
	}



	public void setSkuId(String skuId) {
		this.skuId = skuId;
	}



	public String getMasterId() {
		return masterId;
	}



	public void setMasterId(String masterId) {
		this.masterId = masterId;
	}



	public Date getDate() {
		return date;
	}



	public void setDate(Date date) {
		this.date = date;
	}



	public String getTransaction() {
		return transaction;
	}



	public void setTransaction(String transaction) {
		this.transaction = transaction;
	}



	public String getType() {
		return type;
	}



	public void setType(String type) {
		this.type = type;
	}



	public String getUser() {
		return user;
	}



	public void setUser(String user) {
		this.user = user;
	}



	public TransactionLog() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}



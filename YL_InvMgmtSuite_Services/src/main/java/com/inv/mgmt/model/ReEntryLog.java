package com.inv.mgmt.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "RE_ENTRY_LOGS")
public class ReEntryLog {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column(name="skuId")
	private String skuId;
	
	@Column(name="masterId")
	private String masterId;
	
	@Column(name="reEntryDate")
	private Date reEntryDate;
	
	@Column(name="lastCheckInDate")
	private Date lastCheckInDate;
	
	@Column(name="lastCheckOutDate")
	private Date lastCheckOutDate;
	
	@Column(name="lastCheckInType")
	private String lastCheckInType;
	
	@Column(name="lastCheckOutType")
	private String lastCheckOutType;
	
	@Column(name="rentryCount")
	private long rentryCount;
	
	
	public long getId() {
	return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	

	public String getMasterId() {
		return masterId;
	}

	public void setMasterId(String masterId) {
		this.masterId = masterId;
	}

	public String getSkuId() {
		return skuId;
	}

	public void setSkuId(String skuId) {
		this.skuId = skuId;
	}

	public Date getReEntryDate() {
		return reEntryDate;
	}

	public void setReEntryDate(Date reEntryDate) {
		this.reEntryDate = reEntryDate;
	}

	public Date getLastCheckInDate() {
		return lastCheckInDate;
	}

	public void setLastCheckInDate(Date lastCheckInDate) {
		this.lastCheckInDate = lastCheckInDate;
	}

	

	public Date getLastCheckOutDate() {
		return lastCheckOutDate;
	}

	public void setLastCheckOutDate(Date lastCheckOutDate) {
		this.lastCheckOutDate = lastCheckOutDate;
	}

	public String getLastCheckOutType() {
		return lastCheckOutType;
	}

	public void setLastCheckOutType(String lastCheckOutType) {
		this.lastCheckOutType = lastCheckOutType;
	}

	public String getLastCheckInType() {
		return lastCheckInType;
	}

	public void setLastCheckInType(String lastCheckInType) {
		this.lastCheckInType = lastCheckInType;
	}

	public long getRentryCount() {
		return rentryCount;
	}

	public void setRentryCount(long rentryCount) {
		this.rentryCount = rentryCount;
	}

	
	public ReEntryLog() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}



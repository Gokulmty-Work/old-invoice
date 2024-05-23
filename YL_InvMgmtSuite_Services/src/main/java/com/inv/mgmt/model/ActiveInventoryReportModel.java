package com.inv.mgmt.model;

import java.util.ArrayList;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonInclude;


public class ActiveInventoryReportModel {

	private long id;
		
	private String masterId;

	private String skuId;

	private Date checkInDate;
	
	private String checkInType;
	
	private long entryCount;

	private boolean checkedIn;
	
	private String locationCode;
	
	



	public long getId() {
		return id;
	}


	public void setId(long id) {
		this.id = id;
	}


	
	

	public Date getCheckInDate() {
		return checkInDate;
	}


	public void setCheckInDate(Date checkInDate) {
		this.checkInDate = checkInDate;
	}


	public String getCheckInType() {
		return checkInType;
	}


	public void setCheckInType(String checkInType) {
		this.checkInType = checkInType;
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



	public long getEntryCount() {
		return entryCount;
	}


	public void setEntryCount(long entryCount) {
		this.entryCount = entryCount;
	}


	public String getLocationCode() {
		return locationCode;
	}


	public void setLocationCode(String locationCode) {
		this.locationCode = locationCode;
	}


	public boolean isCheckedIn() {
		return checkedIn;
	}


	public void setCheckedIn(boolean checkedIn) {
		this.checkedIn = checkedIn;
	}


	public ActiveInventoryReportModel() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}



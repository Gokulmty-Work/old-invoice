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

@Entity
@Table(name = "PRODUCT_INVENTORY")
public class ProductInventory {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

		
	@Column(name="masterId")
	private String masterId;
	
	@Column(name="skuId")
	private String skuId;

	@Column(name="entryType")
	private String entryType;
	
	@Column(name="checkInDate")
	private Date checkInDate;
	
	@Column(name="checkInType")
	private String checkInType;
	
	@Column(name="checkOutDate")
	private Date checkOutDate;
	
	@Column(name="checkOutType")
	private String checkOutType;
	
	@Column(name="entryCount")
	private long entryCount;

	@Column(name="checkedIn")
	private boolean checkedIn;
	
	@Column(name="locationCode")
	private String locationCode;
	
	@JsonInclude()
	@javax.persistence.Transient
	private String user;
	
	@JsonInclude()
	@javax.persistence.Transient
	private ArrayList<ReEntryLog> reEntryLogs;
		
	public ArrayList<ReEntryLog> getReEntryLogs() {
		return reEntryLogs;
	}


	public void setReEntryLogs(ArrayList<ReEntryLog> reEntryLogs) {
		this.reEntryLogs = reEntryLogs;
	}


	public String getUser() {
		return user;
	}


	public void setUser(String user) {
		this.user = user;
	}


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


	public Date getCheckOutDate() {
		return checkOutDate;
	}


	public String getEntryType() {
		return entryType;
	}


	public void setEntryType(String entryType) {
		this.entryType = entryType;
	}


	public void setCheckOutDate(Date checkOutDate) {
		this.checkOutDate = checkOutDate;
	}


	public String getCheckOutType() {
		return checkOutType;
	}


	public void setCheckOutType(String checkOutType) {
		this.checkOutType = checkOutType;
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


	public ProductInventory() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}



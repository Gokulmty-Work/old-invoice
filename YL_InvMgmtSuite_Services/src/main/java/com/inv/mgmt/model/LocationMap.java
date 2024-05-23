package com.inv.mgmt.model;

import java.util.Date;
import java.util.HashSet;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonInclude;


@Entity
@Table(name = "LOCATION_MAP")
public class LocationMap {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column(name="locationCode")
	private String locationCode;
	
	@Column(name="locationRef_1") // Room
	private String locationRef_1;
	
	@Column(name="locationRef_2") // Rack
	private String locationRef_2;
	
	@Column(name="locationRef_3") // Shelf
	private String locationRef_3;
	
	@JsonInclude()
	@javax.persistence.Transient
	private HashSet<String> skuIds = new HashSet<>();
	
	
	
	public LocationMap(String locationCode) {
		super();
		this.locationCode = locationCode;
	}



	public long getId() {
		return id;
	}



	public void setId(long id) {
		this.id = id;
	}



	public String getLocationCode() {
		return locationCode;
	}



	public void setLocationCode(String locationCode) {
		this.locationCode = locationCode;
	}



	public String getLocationRef_1() {
		return locationRef_1;
	}



	public void setLocationRef_1(String locationRef_1) {
		this.locationRef_1 = locationRef_1;
	}



	public String getLocationRef_2() {
		return locationRef_2;
	}



	public void setLocationRef_2(String locationRef_2) {
		this.locationRef_2 = locationRef_2;
	}



	public String getLocationRef_3() {
		return locationRef_3;
	}



	public void setLocationRef_3(String locationRef_3) {
		this.locationRef_3 = locationRef_3;
	}



	public HashSet<String> getSkuIds() {
		return skuIds;
	}



	public void setSkuIds(HashSet<String> skuIds) {
		this.skuIds = skuIds;
	}



	public LocationMap() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}



package com.inv.mgmt.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonInclude;

@Entity
@Table(name = "PRODUCT_MASTER")
public class ProductMaster {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name="masterId")
	private String masterId;
	
	@Column(name="name")
	private String name;
	
	//
	@Column(name="description")
	private String description;
	
	@Column(name="category")
	private String category;
	
	@Column(name="variantId")
	private long variantId;
	
	@Column(name="variantDesc")
	private String variantDesc;
	
	@Column(name="initDate")
	private Date initDate;
	
	@Column(name = "active")
	private boolean active;
	
	@JsonInclude()
	@javax.persistence.Transient
	private long inventory;
	
	@Column(name="reorderThreshold")
	private long reorderThreshold;

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

	
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public long getVariantId() {
		return variantId;
	}

	public void setVariantId(long variantId) {
		this.variantId = variantId;
	}

	public String getVariantDesc() {
		return variantDesc;
	}

	public void setVariantDesc(String variantDesc) {
		this.variantDesc = variantDesc;
	}

	public Date getInitDate() {
		return initDate;
	}

	public void setInitDate(Date initDate) {
		this.initDate = initDate;
	}

	
	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public long getInventory() {
		return inventory;
	}

	public void setInventory(long inventory) {
		this.inventory = inventory;
	}

	public long getReorderThreshold() {
		return reorderThreshold;
	}

	public void setReorderThreshold(long reorderThreshold) {
		this.reorderThreshold = reorderThreshold;
	}

	public ProductMaster() {
		super();
		// TODO Auto-generated constructor stub
	}

}



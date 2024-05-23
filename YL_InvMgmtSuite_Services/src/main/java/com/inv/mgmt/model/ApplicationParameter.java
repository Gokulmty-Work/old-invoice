package com.inv.mgmt.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonInclude;

@Entity
@Table(name = "applicationParameters")
public class ApplicationParameter {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	public ApplicationParameter(String keyField, String options, String unit_type, long value) {
		super();
		this.keyField = keyField;
		this.options = options;
		this.unit_type = unit_type;
		this.value = value;
	}

	@Column(name = "keyField")  
	private String keyField;    
	
	@Column(name = "options",length=2000)  
	private String options;    
	
	@Column(name = "unit_type")  
	private String unit_type; 
	
	@Column(name = "value")
	private long value;

	public ApplicationParameter() {
		super();
		// TODO Auto-generated constructor stub
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getKeyField() {
		return keyField;
	}

	public void setKeyField(String keyField) {
		this.keyField = keyField;
	}

	public String getOptions() {
		return options;
	}

	public void setOptions(String options) {
		this.options = options;
	}

	public String getUnit_type() {
		return unit_type;
	}

	public void setUnit_type(String unit_type) {
		this.unit_type = unit_type;
	}

	public long getValue() {
		return value;
	}

	public void setValue(long value) {
		this.value = value;
	}
	
	  
 	
}
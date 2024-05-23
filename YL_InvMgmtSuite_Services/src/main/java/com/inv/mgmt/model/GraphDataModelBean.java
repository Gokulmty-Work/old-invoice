package com.inv.mgmt.model;

import java.io.Serializable;

public class GraphDataModelBean implements Serializable {

	private String type;
	private long count;
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public long getCount() {
		return count;
	}
	public void setCount(long count) {
		this.count = count;
	}
	public GraphDataModelBean(String type, long count) {
		super();
		this.type = type;
		this.count = count;
	}
	
	
	
}

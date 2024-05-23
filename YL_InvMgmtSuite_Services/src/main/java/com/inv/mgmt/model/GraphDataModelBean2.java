package com.inv.mgmt.model;

import java.util.Date;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

public class GraphDataModelBean2 {
	
	@Temporal(TemporalType.DATE)
	private Date type;
	private long count;
	
	public Date getType() {
		return type;
	}
	public void setType(Date type) {
		this.type = type;
	}
	public long getCount() {
		return count;
	}
	public void setCount(long count) {
		this.count = count;
	}
	public GraphDataModelBean2(Date type, long count) {
		super();
		this.type = type;
		this.count = count;
	}
	
	
	
}

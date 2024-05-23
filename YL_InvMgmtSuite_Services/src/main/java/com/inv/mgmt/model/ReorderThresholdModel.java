package com.inv.mgmt.model;

import java.util.ArrayList;
import java.util.Date;

public class ReorderThresholdModel {
	
	private static ReorderThresholdModel single_instance = null; 
	
	private long count;
	private Date fetchDate;
	
	private ArrayList<ProductMaster> details;
	public long getCount() {
		return count;
	}
	public void setCount(long count) {
		this.count = count;
	}
	public ArrayList<ProductMaster> getDetails() {
		return details;
	}
	public void setDetails(ArrayList<ProductMaster> details) {
		this.details = details;
	}
	
	
	
	public Date getFetchDate() {
		return fetchDate;
	}
	public void setFetchDate(Date fetchDate) {
		this.fetchDate = fetchDate;
	}
	private ReorderThresholdModel() {
		super();
		// TODO Auto-generated constructor stub
	}
	// static method to create instance of Singleton class 
    public static ReorderThresholdModel getInstance() 
    { 
        if (single_instance == null) 
            single_instance = new ReorderThresholdModel(); 
  
        return single_instance; 
    } 

}


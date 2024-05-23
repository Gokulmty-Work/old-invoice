package com.inv.mgmt.model;

import java.util.ArrayList;
import java.util.Date;

public class DashboardCountModel {
	
	private static DashboardCountModel single_instance = null; 
	
	private long productCategoryCount;
	private long activeProductCount;
	private long checkedInItemCount;
	private long reEnteredItemsCount;
	private Date fetchDate;
	
	
		
	
	public long getReEnteredItemsCount() {
		return reEnteredItemsCount;
	}
	public void setReEnteredItemsCount(long reEnteredItemsCount) {
		this.reEnteredItemsCount = reEnteredItemsCount;
	}
	public long getProductCategoryCount() {
		return productCategoryCount;
	}
	public void setProductCategoryCount(long productCategoryCount) {
		this.productCategoryCount = productCategoryCount;
	}
	public long getActiveProductCount() {
		return activeProductCount;
	}
	public void setActiveProductCount(long activeProductCount) {
		this.activeProductCount = activeProductCount;
	}
	public long getCheckedInItemCount() {
		return checkedInItemCount;
	}
	public void setCheckedInItemCount(long checkedInItemCount) {
		this.checkedInItemCount = checkedInItemCount;
	}
	public Date getFetchDate() {
		return fetchDate;
	}
	public void setFetchDate(Date fetchDate) {
		this.fetchDate = fetchDate;
	}
	private DashboardCountModel() {
		super();
		// TODO Auto-generated constructor stub
	}
	// static method to create instance of Singleton class 
    public static DashboardCountModel getInstance() 
    { 
        if (single_instance == null) 
            single_instance = new DashboardCountModel(); 
  
        return single_instance; 
    } 

}


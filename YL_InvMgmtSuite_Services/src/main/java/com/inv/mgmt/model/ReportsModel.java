package com.inv.mgmt.model;

import java.util.ArrayList;
import java.util.Date;

public class ReportsModel {
	
	private static ReportsModel single_instance = null; 
	
	private ArrayList<ProductMaster> productMasterList;
	private ArrayList<ActiveInventoryReportModel> productInventoryList;
	private Date fetchDate;
	
	
		
	
	public ArrayList<ProductMaster> getProductMasterList() {
		return productMasterList;
	}
	public void setProductMasterList(ArrayList<ProductMaster> productMasterList) {
		this.productMasterList = productMasterList;
	}
	public ArrayList<ActiveInventoryReportModel> getProductInventoryList() {
		return productInventoryList;
	}
	public void setProductInventoryList(ArrayList<ActiveInventoryReportModel> productInventoryList) {
		this.productInventoryList = productInventoryList;
	}
	public Date getFetchDate() {
		return fetchDate;
	}
	public void setFetchDate(Date fetchDate) {
		this.fetchDate = fetchDate;
	}
	private ReportsModel() {
		super();
		// TODO Auto-generated constructor stub
	}
	// static method to create instance of Singleton class 
    public static ReportsModel getInstance() 
    { 
        if (single_instance == null) 
            single_instance = new ReportsModel(); 
  
        return single_instance; 
    } 

}


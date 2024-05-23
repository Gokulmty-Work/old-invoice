package com.inv.mgmt.model;

import java.util.ArrayList;
import java.util.Date;

public class DashboardCheckInModel {
	
	private static DashboardCheckInModel single_instance = null; 
	
	
	private Date fetchDate;
	
	private LineGraphResponse last30DaysData;
	private LineGraphResponse last12MonthsData;
				
	public static DashboardCheckInModel getSingle_instance() {
		return single_instance;
	}
	public static void setSingle_instance(DashboardCheckInModel single_instance) {
		DashboardCheckInModel.single_instance = single_instance;
	}
	
		
	public LineGraphResponse getLast30DaysData() {
		return last30DaysData;
	}
	public void setLast30DaysData(LineGraphResponse last30DaysData) {
		this.last30DaysData = last30DaysData;
	}
	public LineGraphResponse getLast12MonthsData() {
		return last12MonthsData;
	}
	public void setLast12MonthsData(LineGraphResponse last12MonthsData) {
		this.last12MonthsData = last12MonthsData;
	}
	public Date getFetchDate() {
		return fetchDate;
	}
	public void setFetchDate(Date fetchDate) {
		this.fetchDate = fetchDate;
	}
	private DashboardCheckInModel() {
		super();
		// TODO Auto-generated constructor stub
	}
	// static method to create instance of Singleton class 
    public static DashboardCheckInModel getInstance() 
    { 
        if (single_instance == null) 
            single_instance = new DashboardCheckInModel(); 
  
        return single_instance; 
    } 

}


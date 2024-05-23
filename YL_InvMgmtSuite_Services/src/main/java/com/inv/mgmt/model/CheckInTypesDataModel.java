package com.inv.mgmt.model;

import java.util.ArrayList;
import java.util.Date;

public class CheckInTypesDataModel {
	
	private static CheckInTypesDataModel single_instance = null; 
	
	
	private Date fetchDate;
	
	private PieGraphResponse last7DaysData;
	private PieGraphResponse last30DaysData;
	private PieGraphResponse last180DaysData;
	private PieGraphResponse last365DaysData;
	
				
	public static CheckInTypesDataModel getSingle_instance() {
		return single_instance;
	}
	public static void setSingle_instance(CheckInTypesDataModel single_instance) {
		CheckInTypesDataModel.single_instance = single_instance;
	}
	public PieGraphResponse getLast7DaysData() {
		return last7DaysData;
	}
	public void setLast7DaysData(PieGraphResponse last7DaysData) {
		this.last7DaysData = last7DaysData;
	}
	public PieGraphResponse getLast30DaysData() {
		return last30DaysData;
	}
	public void setLast30DaysData(PieGraphResponse last30DaysData) {
		this.last30DaysData = last30DaysData;
	}
	public PieGraphResponse getLast180DaysData() {
		return last180DaysData;
	}
	public void setLast180DaysData(PieGraphResponse last180DaysData) {
		this.last180DaysData = last180DaysData;
	}
	public PieGraphResponse getLast365DaysData() {
		return last365DaysData;
	}
	public void setLast365DaysData(PieGraphResponse last365DaysData) {
		this.last365DaysData = last365DaysData;
	}
	public Date getFetchDate() {
		return fetchDate;
	}
	public void setFetchDate(Date fetchDate) {
		this.fetchDate = fetchDate;
	}
	private CheckInTypesDataModel() {
		super();
		// TODO Auto-generated constructor stub
	}
	// static method to create instance of Singleton class 
    public static CheckInTypesDataModel getInstance() 
    { 
        if (single_instance == null) 
            single_instance = new CheckInTypesDataModel(); 
  
        return single_instance; 
    } 

}


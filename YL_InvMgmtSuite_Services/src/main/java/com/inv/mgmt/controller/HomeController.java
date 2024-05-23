package com.inv.mgmt.controller;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.inv.mgmt.model.ApplicationParameter;
import com.inv.mgmt.model.CheckInTypesDataModel;
import com.inv.mgmt.model.CheckOutTypesDataModel;
import com.inv.mgmt.model.DashboardCheckInModel;
import com.inv.mgmt.model.DashboardCountModel;
import com.inv.mgmt.model.DashboardCheckOutModel;
import com.inv.mgmt.model.Datasets;
import com.inv.mgmt.model.LineGraphResponse;
import com.inv.mgmt.model.GraphDataModelBean;
import com.inv.mgmt.model.GraphDataModelBean2;
import com.inv.mgmt.model.PieGraphResponse;
import com.inv.mgmt.model.ProductMaster;

import com.inv.mgmt.model.ReorderThresholdModel;
import com.inv.mgmt.repo.ApplicationParameterRepository;
import com.inv.mgmt.repo.ProductInventoryRepo;
import com.inv.mgmt.repo.ProductMasterRepo;
import com.inv.mgmt.repo.TransactionLogRepo;




//@CrossOrigin(origins = "http://localhost:4200")
@CrossOrigin
@RestController
@RequestMapping("/api/home")
public class HomeController {
	
	@Autowired
	ProductMasterRepo productRepo;
	
	@Autowired 
	ProductInventoryRepo inventoryRepo;
	
	@Autowired 
	TransactionLogRepo transactionRepo;
	
	
	@Autowired 
	ApplicationParameterRepository appParameterRepo;

	private static ReorderThresholdModel reorderObj = ReorderThresholdModel.getInstance();
	private static DashboardCountModel countObj = DashboardCountModel.getInstance();
	private static CheckOutTypesDataModel checkoutObj = CheckOutTypesDataModel.getInstance();
	private static CheckInTypesDataModel checkinObj = CheckInTypesDataModel.getInstance();
	private static DashboardCheckOutModel lineGraphCheckOutObj = DashboardCheckOutModel.getInstance();
	private static DashboardCheckInModel lineGraphCheckInObj = DashboardCheckInModel.getInstance();
	
	
	private static boolean reorderObjActive = false;
	private static boolean countObjActive = false;
	private static boolean checkOutObjActive = false;
	private static boolean checkInObjActive = false;
	private static boolean lineGraphCheckOutObjActive = false;
	private static boolean lineGraphCheckInObjActive = false;
	
	
	@GetMapping(value = "/getCheckOutTypes")
	public ResponseEntity<CheckOutTypesDataModel> getCheckOutTypes() {
		
		do {
			if(checkOutObjActive)
			return new ResponseEntity<CheckOutTypesDataModel>(checkoutObj,HttpStatus.OK);
		  
			try {
				Thread.sleep(1000);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			}while(!checkOutObjActive);
		
		return new ResponseEntity<CheckOutTypesDataModel>(HttpStatus.NOT_ACCEPTABLE);		
		}
	
	@GetMapping(value = "/getCheckInTypes")
	public ResponseEntity<CheckInTypesDataModel> getCheckInTypes() {
		
		do {
			if(checkInObjActive)
			return new ResponseEntity<CheckInTypesDataModel>(checkinObj,HttpStatus.OK);
		  
			try {
				Thread.sleep(1000);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			}while(!checkInObjActive);
		
		return new ResponseEntity<CheckInTypesDataModel>(HttpStatus.NOT_ACCEPTABLE);		
		}
	
	
	
	@GetMapping(value = "/getNotifications")
	public ResponseEntity<ReorderThresholdModel> getNotifications() {
		
		do {
			if(reorderObjActive)
			return new ResponseEntity<ReorderThresholdModel>(reorderObj,HttpStatus.OK);
		  
			try {
				Thread.sleep(1000);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			}while(!reorderObjActive);
		
		return new ResponseEntity<ReorderThresholdModel>(HttpStatus.NOT_ACCEPTABLE);		
		}
		
	
	@GetMapping(value = "/getCounts")
	public ResponseEntity<DashboardCountModel> getCounts() {
		
		do {
			if(countObjActive)
			return new ResponseEntity<DashboardCountModel>(countObj,HttpStatus.OK);
		  
			try {
				Thread.sleep(1000);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			}while(!countObjActive);
		
		return new ResponseEntity<DashboardCountModel>(HttpStatus.NOT_ACCEPTABLE);		
		}
	
	@GetMapping(value = "/getCheckOutLineGraphData")
	public ResponseEntity<DashboardCheckOutModel> getCheckOutLineGraphData() {
		
		do {
			if(lineGraphCheckOutObjActive)
			return new ResponseEntity<DashboardCheckOutModel>(lineGraphCheckOutObj,HttpStatus.OK);
			
			try {
				Thread.sleep(1000);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			}while(!lineGraphCheckOutObjActive);
		
		return new ResponseEntity<DashboardCheckOutModel>(HttpStatus.NOT_ACCEPTABLE);		
		}
	
	@GetMapping(value = "/getCheckInLineGraphData")
	public ResponseEntity<DashboardCheckInModel> getCheckInLineGraphData() {
		
		do {
			if(lineGraphCheckInObjActive)
			return new ResponseEntity<DashboardCheckInModel>(lineGraphCheckInObj,HttpStatus.OK);
		  
			try {
				Thread.sleep(1000);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			}while(!lineGraphCheckInObjActive);
		
		return new ResponseEntity<DashboardCheckInModel>(HttpStatus.NOT_ACCEPTABLE);		
		}
	
	
	public void calculateReorderNotifications()
	{
		reorderObjActive = false;
		ArrayList<ProductMaster> reorderLogs = new ArrayList<ProductMaster>();
		ArrayList<ProductMaster> products = (ArrayList<ProductMaster>) productRepo.findAll();
	        
	   	for(ProductMaster entry : products)
	       {
	      long inventory = inventoryRepo.findInventoryCount(entry.getMasterId());
	      if(inventory <= entry.getReorderThreshold())
	      {
	    	  entry.setInventory(inventory);
	    	  
	    	  reorderLogs.add(entry);
	      }
	      
	      reorderObj.setDetails(reorderLogs);
	      reorderObj.setCount(reorderLogs.size());
	      reorderObj.setFetchDate(new Date());
	      reorderObjActive = true;
	   }
		
	   	
	}

	public void calculateCount()
	{
	countObjActive = false;
	String tempCategoryString = appParameterRepo.findByKeyField("Product_Categories").getOptions();
	
	countObj.setProductCategoryCount(Arrays.asList(tempCategoryString.split(",", -1)).size());
	countObj.setActiveProductCount(productRepo.countByActiveTrue());
	countObj.setCheckedInItemCount(inventoryRepo.countByCheckedInTrue());
	countObj.setReEnteredItemsCount(inventoryRepo.countReEnteredItemsCount());
	
	countObjActive = true;
	
	
	}
	
	
	public void calculateCheckOutTypes()
	{
		checkOutObjActive = false;
		checkoutObj.setLast7DaysData(getPieData(-7,"CHECK_OUT"));
		
//		ArrayList<String> labels = new ArrayList();
//		labels.add("One");
//		labels.add("two");
//		labels.add("three");
//		ArrayList<Long> count = new ArrayList();
//		count.add((long) 1000);
//		count.add((long) 2340);
//		count.add((long) 4567);
//		checkoutObj.setLast30DaysData(new PieGraphResponse(labels,count));
		
		checkoutObj.setLast30DaysData(getPieData(-30,"CHECK_OUT"));
		checkoutObj.setLast180DaysData(getPieData(-180,"CHECK_OUT"));
		checkoutObj.setLast365DaysData(getPieData(-365,"CHECK_OUT"));
		checkoutObj.setFetchDate(new Date());
		checkOutObjActive = true;
		
	}
	
	public void calculateCheckInTypes()
	{
		checkInObjActive = false;
		checkinObj.setLast7DaysData(getPieData(-7,"CHECK_IN"));

		checkinObj.setLast30DaysData(getPieData(-30,"CHECK_IN"));
		checkinObj.setLast180DaysData(getPieData(-180,"CHECK_IN"));
		checkinObj.setLast365DaysData(getPieData(-365,"CHECK_IN"));
		checkinObj.setFetchDate(new Date());
		checkInObjActive = true;
		
	}
	
	public void calculateLineGraphCheckOutData()
	{
		lineGraphCheckOutObjActive = false;
		
		LineGraphResponse lineGraphResponse = new LineGraphResponse();
		ArrayList<String> labels = new ArrayList<String>();
		ArrayList<Datasets> datasets = new ArrayList<Datasets>();;
		
		labels.add("CHECK_OUT");
		datasets.add(getLineGraphData(-30, "CHECK_OUT"));
		
		lineGraphResponse.setDatasets(datasets);
		lineGraphResponse.setLabels(labels);
		
		//labels.add("CHECK_IN");
		//datasets.add(getLineGraphData(-30, "CHECK_IN"));
		
		lineGraphCheckOutObj.setFetchDate(new Date());
		lineGraphCheckOutObj.setLast30DaysData(lineGraphResponse);
		
		
		lineGraphCheckOutObjActive = true;
		
		
	}
	
	public void calculateLineGraphCheckInData()
	{
		lineGraphCheckInObjActive = false;
		
		LineGraphResponse lineGraphResponse = new LineGraphResponse();
		ArrayList<String> labels = new ArrayList<String>();
		ArrayList<Datasets> datasets = new ArrayList<Datasets>();;
		
		labels.add("CHECK_IN");
		datasets.add(getLineGraphData(-30, "CHECK_IN"));
		
		lineGraphResponse.setDatasets(datasets);
		lineGraphResponse.setLabels(labels);
		
		//labels.add("CHECK_IN");
		//datasets.add(getLineGraphData(-30, "CHECK_IN"));
		
		lineGraphCheckInObj.setFetchDate(new Date());
		lineGraphCheckInObj.setLast30DaysData(lineGraphResponse);
		
		
		lineGraphCheckInObjActive = true;
		
		
	}
	
	
	public PieGraphResponse getPieData(int daysBefore,String operation)
	{
		Date endDate = new Date(); 
		Calendar cal = Calendar.getInstance();
		cal.setTime(endDate);
			
		
	cal.add(Calendar.DATE, daysBefore);
	Date previousDate = cal.getTime();
	
	
	List<GraphDataModelBean> data = transactionRepo.findCheckOutTypesPieGraphData(previousDate,endDate,operation);
		
		
	ArrayList<String> legendList = (ArrayList<String>) data.stream().map(GraphDataModelBean::getType).collect(Collectors.toList());
	ArrayList<Long> pieData = (ArrayList<Long>) data.stream().map(GraphDataModelBean::getCount).collect(Collectors.toList());

	return new PieGraphResponse(legendList,pieData);
		
	}
	
	
	public Datasets getLineGraphData(int daysBefore,String operation)
	{
		
	Datasets dataset = new Datasets();
	dataset.setLabel(operation);
		
	Date endDate = new Date(); 
	Calendar cal = Calendar.getInstance();
	cal.setTime(endDate);
	cal.add(Calendar.DATE, daysBefore);
	Date previousDate = cal.getTime();
	
	List<Object[]> queryData = transactionRepo.findDateData(previousDate,endDate,operation);
	
	
	ArrayList<String> labels = new ArrayList<String>();
	ArrayList<Long> datum = new ArrayList<Long>();
		
    if(queryData != null && !queryData.isEmpty()){
       for (Object[] object : queryData) {
      labels.add((String)object[0]);
      datum.add(((BigInteger) object[1]).longValue());
       }
    }

    
    dataset.setData(datum);
    dataset.setDataLabels(labels);

	
	return dataset;

	}
	}
	
	


package com.inv.mgmt;

import java.util.Date;
import java.util.concurrent.ScheduledFuture;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.Trigger;
import org.springframework.scheduling.annotation.EnableScheduling;

import com.inv.mgmt.controller.HomeController;
import com.inv.mgmt.controller.ProductInventoryController;
import com.inv.mgmt.controller.ProductMasterController;
import com.inv.mgmt.controller.UserProfileController;
import com.inv.mgmt.repo.ProductMasterRepo;


@SpringBootApplication
@EnableScheduling
public class InventoryMgmtApplication extends SpringBootServletInitializer {

	
	@Autowired
	HomeController homeController;
	
	@Autowired
	ProductMasterController productController;
	
	@Autowired
	ProductInventoryController inventoryController;
	
	@Autowired
	UserProfileController userProfileController;

	@PostConstruct
    public void init() {
		// Initial Check at the time of Deployment
		userProfileController.initialProcessing();
		
		homeController.calculateReorderNotifications();
		homeController.calculateCount();
		homeController.calculateCheckOutTypes();
	    homeController.calculateCheckInTypes();
	    homeController.calculateLineGraphCheckOutData();
	    homeController.calculateLineGraphCheckInData();
	    
	    productController.setProductMasterReport();
	    inventoryController.setInventoryReport();
	    
	}
	
	
	public static void main(String[] args) {
		SpringApplication.run(InventoryMgmtApplication.class, args);
    
	}

}

package com.inv.mgmt.scheduller;

import org.h2.tools.RunScript;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.inv.mgmt.controller.HomeController;
import com.inv.mgmt.controller.Processor;
import com.inv.mgmt.controller.ProductInventoryController;
import com.inv.mgmt.controller.ProductMasterController;
import com.inv.mgmt.model.ProductMaster;
import com.inv.mgmt.repo.ProductMasterRepo;

import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.concurrent.TimeUnit;



import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;

import java.nio.charset.Charset;
import java.sql.SQLException;
import org.springframework.core.env.Environment;




@Component
public class TaskScheduller {
	
	@Autowired
	HomeController homeController;
	
	@Autowired
	ProductMasterController productMasterController;
	
	@Autowired
	ProductInventoryController inventoryController;
	
	@Autowired
	Processor processor;
	
	@Autowired
	Environment env;
	
	
	    private static final Logger logger = LoggerFactory.getLogger(TaskScheduller.class);
	    private static final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("HH:mm:ss");

	    
//	@Scheduled(fixedRate = 600000)
//	@Scheduled(fixedRate = 1200000)
//	public void scheduleTaskWithFixedRate() {
//	logger.info("Fixed Rate Task :: Execution Time - {}", dateTimeFormatter.format(LocalDateTime.now()) );
//	}

	    public void scheduleTaskWithFixedDelay() {}

	    public void scheduleTaskWithInitialDelay() {}

	    @Scheduled(cron = "0 0 0 * * ?")
	    public void dailyDashbordPrepareService() {
	    	logger.info("Dashboard Processor :: Execution Time - {}", dateTimeFormatter.format(LocalDateTime.now()) );
	    	homeController.calculateReorderNotifications();
		    homeController.calculateCount();
		    homeController.calculateCheckOutTypes();
		    homeController.calculateCheckInTypes();
		    homeController.calculateLineGraphCheckOutData();
		    homeController.calculateLineGraphCheckInData();
		    
		    productMasterController.setProductMasterReport();
		    inventoryController.setInventoryReport();
		    
	    }
	    
	    // To write DB Backup Once a Week 2 AM Every Saturday
	    @Scheduled(cron = "0 0 2 * * SAT") 
	      public void backupH2() {

	        try {
	        	RunScript.execute(env.getProperty("spring.datasource.url"),env.getProperty("spring.datasource.username"), env.getProperty("spring.datasource.password"),env.getProperty("backupFileLocation"), Charset.defaultCharset(), true);
	            logger.info("H2 is backed up from the cron scheduller");
	        } catch (SQLException e) {
	        	logger.info("Cannot backup H2. Cause: {}", e.getMessage());
	        }
	    }
	    
	}
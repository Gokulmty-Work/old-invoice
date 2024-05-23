package com.inv.mgmt.controller;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

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

import com.inv.mgmt.model.ActiveInventoryReportModel;
import com.inv.mgmt.model.LocationMap;
import com.inv.mgmt.model.ProductInventory;
import com.inv.mgmt.model.ProductMaster;
import com.inv.mgmt.model.ReEntryLog;
import com.inv.mgmt.model.ReportsModel;
import com.inv.mgmt.model.TransactionLog;
import com.inv.mgmt.repo.LocationMapRepo;
import com.inv.mgmt.repo.ProductInventoryRepo;
import com.inv.mgmt.repo.ProductMasterRepo;
import com.inv.mgmt.repo.ReEntryLogsRepo;
import com.inv.mgmt.repo.TransactionLogRepo;


//@CrossOrigin(origins = "http://localhost:4200")
@CrossOrigin
@RestController
@RequestMapping("/api/productInventory")
public class ProductInventoryController {
	
	@Autowired
	ProductInventoryRepo repository;

	@Autowired
	ProductMasterRepo productRepo;

	
	@Autowired
	ReEntryLogsRepo reEntryRepo;
	
	@Autowired
	LocationMapRepo locationRepo;
	
	@Autowired
	TransactionLogRepo logRepo;
	
	private static ReportsModel reports = ReportsModel.getInstance();
	
	
	private static boolean reportsObjActive = false;
	
	
	@GetMapping("/getInventoryReport")
	public ResponseEntity<ArrayList<ActiveInventoryReportModel>> getProductReport() {
  
		do {
			if(reportsObjActive)
			return new ResponseEntity<ArrayList<ActiveInventoryReportModel>>(reports.getProductInventoryList(),HttpStatus.OK);
			
			try {
				Thread.sleep(1000);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			}while(!reportsObjActive);
		
		return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
	
	}

	
		public void setInventoryReport() {
  
		reportsObjActive = false;	
		ArrayList<ProductInventory> items = new ArrayList<>();
		ActiveInventoryReportModel inventory = new ActiveInventoryReportModel();
		ArrayList<ActiveInventoryReportModel> inventoryReport = new ArrayList<>();
		
		
		repository.findByCheckedInTrue().forEach(items::add);
		
		for(ProductInventory item: items)
		{
			inventory = new ActiveInventoryReportModel();
			inventory.setCheckedIn(item.isCheckedIn());
			inventory.setCheckInDate(item.getCheckInDate());
			inventory.setCheckInType(item.getCheckInType());
			inventory.setEntryCount(item.getEntryCount());
			inventory.setId(item.getId());
			inventory.setLocationCode(item.getLocationCode());
			inventory.setMasterId(item.getMasterId());
			inventory.setSkuId(item.getSkuId());
			
			inventoryReport.add(inventory);
		}
					
		this.reports.setProductInventoryList(inventoryReport);
		reportsObjActive = true;
	}
	
	@GetMapping("/listPagedEntries")
	public List<ProductInventory> getPagedEntries(@RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "60") int size) {
  
		    Pageable paging = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC,"id"));
	        Page<ProductInventory> pagedResult = repository.findAll(paging);
	        
	
	        if(pagedResult.hasContent()) {
	        	
	        	List<ProductInventory> entries = pagedResult.getContent();
	        		        	
	        	return pagedResult.getContent();
	        } else {
	            return null;
	        }
		  }

	@GetMapping("/listPagedInventory/{masterId}")
	public List<ProductInventory> getPagedInventory(@RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "60") int size,@PathVariable String masterId) {
  
		    Pageable paging = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC,"id"));
	        Page<ProductInventory> pagedResult = repository.findByMasterIdAndCheckedInTrue(masterId, paging);
	              
	        if(pagedResult.hasContent()) {
	        	
	        	List<ProductInventory> entries = pagedResult.getContent();
	        		        	
	        	return pagedResult.getContent();
	        } else {
	            return null;
	        }
		  }
	
	
	@GetMapping("/search/{searchField}")
	public ArrayList<ProductInventory> searchString(@PathVariable("searchField") String searchField) {
		
		ArrayList<ProductInventory> entries = new ArrayList<>();
		repository.searchAvailableInventory(searchField).forEach(entries::add);

		return entries;
	}
	
	
	
	@GetMapping("/listAll")
	public List<ProductInventory> getAllEntries() {
	//	System.out.println("Get all Customers...");

		List<ProductInventory> products = new ArrayList<>();
		repository.findAll().forEach(products::add);

		return products;
	}
	
	
	@GetMapping(value = "/getEntry/{id}")
	public ResponseEntity<ProductInventory> findEntryById(@PathVariable long id) {

		Optional<ProductInventory> data = repository.findById(id);
		if (data.isPresent())
		{
			ProductInventory product = data.get();
			
			return new ResponseEntity<ProductInventory>(product, HttpStatus.OK); 
		}
		
		else {
			  return new ResponseEntity<>(HttpStatus.NOT_FOUND); 
			  } 
		}
	
	@GetMapping(value = "/getEntryBySKUId/{skuId}")
	public ResponseEntity<ProductInventory> findEntryById(@PathVariable String skuId) {

		Optional<ProductInventory> data = repository.findBySkuId(skuId);
		if (data.isPresent())
		{
			ProductInventory product = data.get();
			if(product.getEntryCount()>0)
			{
				product.setReEntryLogs(reEntryRepo.findAllBySkuId(product.getSkuId()));
			}
			
			return new ResponseEntity<ProductInventory>(product, HttpStatus.OK); 
		}
		
		else {
			  return new ResponseEntity<>(HttpStatus.NOT_FOUND); 
			  } 
		}
	
		
	@PostMapping(value = "/create")
	public ResponseEntity<ProductInventory> postEntry(@RequestBody ProductInventory product) {

		Optional<ProductInventory> productData = repository.findBySkuId(product.getSkuId());

		if (productData.isPresent()) {
			ProductInventory inventory = productData.get();
			if(inventory.isCheckedIn())
			return new ResponseEntity<ProductInventory>(inventory,HttpStatus.NOT_FOUND);
			else
			{
				long entryCount = inventory.getEntryCount() + 1;
					
				ReEntryLog rentryLog = new ReEntryLog();
				rentryLog.setSkuId(inventory.getSkuId());
				rentryLog.setLastCheckInDate(inventory.getCheckInDate());
				rentryLog.setLastCheckInType(inventory.getCheckInType());
				rentryLog.setLastCheckOutDate(inventory.getCheckOutDate());
				rentryLog.setLastCheckOutType(inventory.getCheckOutType());
				rentryLog.setMasterId(inventory.getMasterId());
				rentryLog.setReEntryDate(new Date());
				rentryLog.setRentryCount(entryCount);
				
				reEntryRepo.save(rentryLog);
				
				inventory.setCheckedIn(true);
				inventory.setCheckInDate(product.getCheckInDate());
				inventory.setCheckInType(product.getCheckInType());
				inventory.setCheckOutDate(null);
				inventory.setCheckOutType(null);
				inventory.setEntryCount(entryCount);
				inventory.setEntryType(inventory.getEntryType());
				inventory.setLocationCode(product.getLocationCode());
				inventory.setMasterId(product.getMasterId());
				inventory.setLocationCode(product.getLocationCode());
				
				addTransactionLogAndLocationCheck(inventory);
				
				repository.save(inventory);
				
				return new ResponseEntity<ProductInventory>(inventory, HttpStatus.OK);
			}
		}
		
		// whether product masterId is valid or not
		Optional<ProductMaster> productMasterId = productRepo.findByMasterId(product.getMasterId());

		if (productMasterId.isPresent()) {
			ProductInventory _product = repository.save(product);
			addTransactionLogAndLocationCheck(product);
			return new ResponseEntity<ProductInventory>(product, HttpStatus.OK);	
			
		}
		else
		{
			return new ResponseEntity<ProductInventory>(product,HttpStatus.NOT_FOUND);
		}
		
		
		
		
	}

	public void addTransactionLogAndLocationCheck(ProductInventory inventory)
	{
		TransactionLog log = new TransactionLog();
		log.setDate(inventory.getCheckInDate());
		log.setMasterId(inventory.getMasterId());
		log.setSkuId(inventory.getSkuId());
		log.setTransaction("CHECK_IN");
		log.setType(inventory.getCheckInType());
		log.setUser(inventory.getUser());
		
		logRepo.save(log);
		
		if(inventory.getLocationCode() != null && inventory.getLocationCode() !="")
		{
		
		Optional<LocationMap> data = locationRepo.findByLocationCode(inventory.getLocationCode());
		if (!data.isPresent())
		{
			
			locationRepo.save(new LocationMap(inventory.getLocationCode()));
		}	
		}
		
	}
	
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteEntry(@PathVariable("id") long id) {
	
		repository.deleteById(id);

		return new ResponseEntity<>("Entry has been deleted!", HttpStatus.OK);
	}

	@DeleteMapping("/deleteAll")
	public ResponseEntity<String> deleteAllEntries() {
		
		repository.deleteAll();
		return new ResponseEntity<>("All entries have been deleted!", HttpStatus.OK);
	}

	@PutMapping("/checkOut/{id}")
	public ResponseEntity<ProductInventory> checkOut(@PathVariable("id") long id, @RequestBody ProductInventory product) {
	
		Optional<ProductInventory> productData = repository.findById(id);

		if (productData.isPresent()) {
			ProductInventory _product = productData.get();
		
			TransactionLog log = new TransactionLog();
			log.setDate(product.getCheckOutDate());
			log.setMasterId(product.getMasterId());
			log.setSkuId(product.getSkuId());
			log.setTransaction("CHECK_OUT");
			log.setType(product.getCheckOutType());
			log.setUser(product.getUser());
			
			logRepo.save(log);
			
			return new ResponseEntity<>(repository.save(product), HttpStatus.OK);
		} 
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		
	}
	
	
	@PutMapping("/update/{id}")
	public ResponseEntity<ProductInventory> updateEntry(@PathVariable("id") long id, @RequestBody ProductInventory product) {
	
		Optional<ProductInventory> productData = repository.findById(id);

		if (productData.isPresent()) {
			ProductInventory _product = productData.get();
			
			if(_product.getLocationCode() != null && _product.getLocationCode() !="")
			{
				Optional<LocationMap> data = locationRepo.findByLocationCode(_product.getLocationCode());
				if (!data.isPresent())
				{
					locationRepo.save(new LocationMap(_product.getLocationCode()));
				}
				
			}
			
			return new ResponseEntity<>(repository.save(product), HttpStatus.OK);
		} 
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		
	}
	

}

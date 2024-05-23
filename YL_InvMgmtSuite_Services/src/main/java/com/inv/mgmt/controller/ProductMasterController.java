package com.inv.mgmt.controller;
import java.util.ArrayList;
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

import com.inv.mgmt.model.CheckInTypesDataModel;
import com.inv.mgmt.model.CheckOutTypesDataModel;
import com.inv.mgmt.model.DashboardCheckInModel;
import com.inv.mgmt.model.DashboardCheckOutModel;
import com.inv.mgmt.model.DashboardCountModel;
import com.inv.mgmt.model.ProductMaster;
import com.inv.mgmt.model.ReportsModel;
import com.inv.mgmt.repo.ProductInventoryRepo;
import com.inv.mgmt.repo.ProductMasterRepo;

//@CrossOrigin(origins = "http://localhost:4200")
@CrossOrigin
@RestController
@RequestMapping("/api/productMaster")
public class ProductMasterController {
	
	@Autowired
	ProductMasterRepo repository;
	
	@Autowired 
	ProductInventoryRepo inventoryRepo;
	
	
	private static ReportsModel reports = ReportsModel.getInstance();
	
	
	private static boolean reportsObjActive = false;
	

	@GetMapping("/listPagedEntries")
	public List<ProductMaster> getPagedEntries(@RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "40") int size) {
  
		    Pageable paging = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC,"id"));
	        Page<ProductMaster> pagedResult = repository.findAll(paging);
	        
	        if(pagedResult.hasContent()) {
	        	
	        	List<ProductMaster> entries = pagedResult.getContent();
	        	for(ProductMaster entry : entries)
	        	{
	        		entry.setInventory(inventoryRepo.findInventoryCount(entry.getMasterId()));
	        	}
	        	
	        	return pagedResult.getContent();

	        } else {
	            return null;
	        }
		  }
	

	
	@GetMapping("/getProductMasterReport")
	public ResponseEntity<ArrayList<ProductMaster>> getProductReport() {
  
		do {
			if(reportsObjActive)
			return new ResponseEntity<ArrayList<ProductMaster>>(reports.getProductMasterList(),HttpStatus.OK);
		  
			try {
				Thread.sleep(1000);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			}while(!reportsObjActive);
		
		return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
	
	}

	
	
		public void setProductMasterReport() {
  
		reportsObjActive = false;	
		ArrayList<ProductMaster> products = new ArrayList<>();
		repository.findAll().forEach(products::add);

		for(ProductMaster product : products)
		{
			product.setInventory(inventoryRepo.findInventoryCount(product.getMasterId()));
		}
		
		this.reports.setProductMasterList(products);
		reportsObjActive = true;
	}
	
	
	@GetMapping("/search/{searchField}")
	public ArrayList<ProductMaster> searchString(@PathVariable("searchField") String searchField) {
		
		ArrayList<ProductMaster> entries = new ArrayList<>();
		repository.search(searchField).forEach(entries::add);

		return entries;
	}
	
	@GetMapping("/listAll/withoutInventory")
	public List<ProductMaster> getAllEntries() {
	
		List<ProductMaster> products = new ArrayList<>();
		repository.findAll().forEach(products::add);

		return products;
	}
	
	@GetMapping(value = "/getEntry/{id}")
	public ResponseEntity<ProductMaster> findEntryById(@PathVariable long id) {

		Optional<ProductMaster> data = repository.findById(id);
		if (data.isPresent())
		{
			ProductMaster product = data.get();
			
			return new ResponseEntity<ProductMaster>(product, HttpStatus.OK); 
		}
		
		else {
			  return new ResponseEntity<>(HttpStatus.NOT_FOUND); 
			  } 
		}
	
	
	
	@PostMapping(value = "/create")
	public ResponseEntity<ProductMaster> postEntry(@RequestBody ProductMaster product) {

		try {
		Optional<ProductMaster> productData = repository.findByMasterId(product.getMasterId());

		if (!productData.isPresent()) { 
		ProductMaster _product = repository.save(product);	
		return new ResponseEntity<>(_product, HttpStatus.OK);
		}
		else
		return new ResponseEntity<ProductMaster>(HttpStatus.NOT_ACCEPTABLE);
		}
		catch(Exception e)
		{
		 return new ResponseEntity<ProductMaster>(HttpStatus.NOT_ACCEPTABLE);
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

	@PutMapping("/update/{id}")
	public ResponseEntity<ProductMaster> updateEntry(@PathVariable("id") long id, @RequestBody ProductMaster product) {
	
		Optional<ProductMaster> productData = repository.findById(id);

		if (productData.isPresent()) {
		//	ProductMaster _product = productData.get();
			return new ResponseEntity<>(repository.save(product), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	

}

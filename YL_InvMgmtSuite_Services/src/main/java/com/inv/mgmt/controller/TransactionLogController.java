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

import com.inv.mgmt.model.LocationMap;
import com.inv.mgmt.model.TransactionLog;
import com.inv.mgmt.model.ProductMaster;
import com.inv.mgmt.model.ReEntryLog;
import com.inv.mgmt.repo.LocationMapRepo;
import com.inv.mgmt.repo.TransactionLogRepo;
import com.inv.mgmt.repo.ProductMasterRepo;
import com.inv.mgmt.repo.ReEntryLogsRepo;


//@CrossOrigin(origins = "http://localhost:4200")
@CrossOrigin
@RestController
@RequestMapping("/api/TransactionLog")
public class TransactionLogController {
	
	@Autowired
	TransactionLogRepo repository;
	
	@Autowired
	ReEntryLogsRepo reEntryRepo;
	
	@Autowired
	LocationMapRepo locationRepo;
	
	
	@GetMapping("/listPagedEntries")
	public List<TransactionLog> getPagedEntries(@RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "60") int size) {
  
		    Pageable paging = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC,"id"));
	        Page<TransactionLog> pagedResult = repository.findAll(paging);
	        
	
	        if(pagedResult.hasContent()) {
	        	
	        	List<TransactionLog> entries = pagedResult.getContent();
	        		        	
	        	return pagedResult.getContent();
	        } else {
	            return null;
	        }
		  }

	
	
	
	@GetMapping("/listAll")
	public List<TransactionLog> getAllEntries() {
	//	System.out.println("Get all Customers...");

		List<TransactionLog> products = new ArrayList<>();
		repository.findAll().forEach(products::add);

		return products;
	}
	
	
	@GetMapping(value = "/getEntry/{id}")
	public ResponseEntity<TransactionLog> findEntryById(@PathVariable long id) {

		Optional<TransactionLog> data = repository.findById(id);
		if (data.isPresent())
		{
			TransactionLog product = data.get();
			
			return new ResponseEntity<TransactionLog>(product, HttpStatus.OK); 
		}
		
		else {
			  return new ResponseEntity<>(HttpStatus.NOT_FOUND); 
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

	
}

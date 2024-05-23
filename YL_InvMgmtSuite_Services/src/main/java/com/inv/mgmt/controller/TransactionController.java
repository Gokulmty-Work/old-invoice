package com.inv.mgmt.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
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
import com.inv.mgmt.model.ProductInventory;
import com.inv.mgmt.model.ProductMaster;
import com.inv.mgmt.model.TransactionLog;
import com.inv.mgmt.model.LocationMap;
import com.inv.mgmt.repo.ApplicationParameterRepository;
import com.inv.mgmt.repo.LocationMapRepo;
import com.inv.mgmt.repo.ProductInventoryRepo;
import com.inv.mgmt.repo.TransactionLogRepo;


//@CrossOrigin(origins = "http://localhost:4200")
@CrossOrigin
@RestController
@RequestMapping("/api/transaction")
public class TransactionController {

		
	@Autowired
	TransactionLogRepo repo;
	
			
	@GetMapping(value = "/getTransactions")
	public ResponseEntity<ArrayList<TransactionLog>> findTransactions(@RequestParam("startDate") @DateTimeFormat(pattern="yyyy-MM-dd") Date startDate,
			@RequestParam("endDate") @DateTimeFormat(pattern="yyyy-MM-dd") Date endDate) {

		Optional<ArrayList<TransactionLog>> _data = repo.findTransactionsBetween(startDate,endDate);
		if (_data.isPresent())
		{
			ArrayList<TransactionLog> data = _data.get();
			
			return new ResponseEntity<ArrayList<TransactionLog>>(data, HttpStatus.OK); 
		}
		
		
			  return new ResponseEntity<>(HttpStatus.NOT_FOUND); 
		 
	}
	
		
}

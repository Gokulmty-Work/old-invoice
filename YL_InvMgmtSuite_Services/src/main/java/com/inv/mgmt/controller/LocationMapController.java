package com.inv.mgmt.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.web.bind.annotation.RestController;

import com.inv.mgmt.model.LocationMap;
import com.inv.mgmt.model.ProductInventory;
import com.inv.mgmt.model.ProductMaster;
import com.inv.mgmt.model.LocationMap;
import com.inv.mgmt.repo.ApplicationParameterRepository;
import com.inv.mgmt.repo.LocationMapRepo;
import com.inv.mgmt.repo.ProductInventoryRepo;


//@CrossOrigin(origins = "http://localhost:4200")
@CrossOrigin
@RestController
@RequestMapping("/api/location")
public class LocationMapController {

		
	@Autowired
	LocationMapRepo repo;
	
	@Autowired
	ProductInventoryRepo inventoryRepo;
	
	
	@GetMapping("/")
	public List<LocationMap> getAllEntries() {
	
		
		ArrayList<LocationMap> locations = (ArrayList<LocationMap>) repo.findAll();
		
	//	System.out.println(locations.size());
		
		for(LocationMap location: locations)
		{
		location.setSkuIds(getInventoryCount(location.getLocationCode()));
		}
		//	System.out.println(locations.size());
		return locations;
	}
	
	
	public HashSet<String> getInventoryCount(String locationCode)
	{
		
		HashSet<String> skuIds = inventoryRepo.getSkuIdsByLocationCode(locationCode);
		return skuIds;
		
	}
	
	@GetMapping("/search/{searchField}")
	public ArrayList<LocationMap> searchString(@PathVariable("searchField") String searchField) {
		
		ArrayList<LocationMap> entries = new ArrayList<>();
		repo.search(searchField).forEach(entries::add);

		return entries;
	}
	
	
	@GetMapping(value = "/findByLocationCode/{locationCode}")
	public ResponseEntity<LocationMap> findByLocationCode(@PathVariable String locationCode) {

		Optional<LocationMap> data = repo.findByLocationCode(locationCode);
		if (data.isPresent())
		{
			LocationMap location = data.get();
			
			return new ResponseEntity<LocationMap>(location, HttpStatus.OK); 
		}
		
		
			  return new ResponseEntity<>(HttpStatus.NOT_FOUND); 
		 
	}
	
	
	
	@PutMapping("/{id}")
	public ResponseEntity<LocationMap> updateResource(@PathVariable("id") long id, @RequestBody LocationMap entry) {
		
	//	System.out.println("Update Resource without tasks with ID = " + id + "...");
		Optional<LocationMap> resourceData = repo.findById(id);

		if (resourceData.isPresent()) {
			LocationMap _resource = resourceData.get();
			_resource.setLocationCode(entry.getLocationCode());
			_resource.setLocationRef_1(entry.getLocationRef_1());
			_resource.setLocationRef_1(entry.getLocationRef_2());
			_resource.setLocationRef_1(entry.getLocationRef_3());
	
			
			return new ResponseEntity<>(repo.save(_resource), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		}
	
	@DeleteMapping("/delete")
	public ResponseEntity<String> deleteAllEntries() {
	//	System.out.println("Delete All Enteries...");

		repo.deleteAll();

		return new ResponseEntity<>("All entries have been deleted!", HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteEntry(@PathVariable("id") long id) {
	//	System.out.println("Delete Rate Card with ID = " + id + "...");

		repo.deleteById(id);

		return new ResponseEntity<>("Entry has been deleted!", HttpStatus.OK);
	}
	
	@PostMapping(value = "/create")
	public ResponseEntity<LocationMap> postEntry(@RequestBody LocationMap resource) {
		
		try {
		Optional<LocationMap> productData = repo.findByLocationCode(resource.getLocationCode());

		if (!productData.isPresent()) { 
			LocationMap locationMap = repo.save(resource);	
		return new ResponseEntity<>(locationMap, HttpStatus.OK);
		}
		else
		return new ResponseEntity<LocationMap>(HttpStatus.NOT_ACCEPTABLE);
		}
		catch(Exception e)
		{
		 return new ResponseEntity<LocationMap>(HttpStatus.NOT_ACCEPTABLE);
		}
		
	}
}

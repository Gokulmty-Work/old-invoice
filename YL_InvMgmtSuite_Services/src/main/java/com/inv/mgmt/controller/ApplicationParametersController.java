package com.inv.mgmt.controller;

import java.util.ArrayList;
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

import com.inv.mgmt.model.ApplicationParameter;
import com.inv.mgmt.repo.ApplicationParameterRepository;


//@CrossOrigin(origins = "http://localhost:4200")
@CrossOrigin
@RestController
@RequestMapping("/api")
public class ApplicationParametersController {

		
	@Autowired
	ApplicationParameterRepository applicationParametersRepository;
	
	
	@GetMapping("/appParameter")
	public List<ApplicationParameter> getAllEntries() {
	//	System.out.println("Get all Rate Card Entries...");

		List<ApplicationParameter> entries = new ArrayList<>();
		applicationParametersRepository.findAll().forEach(entries::add);

		return entries;
	}
	
	@PutMapping("/appParameter/{id}")
	public ResponseEntity<ApplicationParameter> updateResource(@PathVariable("id") long id, @RequestBody ApplicationParameter entry) {
		
	//	System.out.println("Update Resource without tasks with ID = " + id + "...");
		Optional<ApplicationParameter> resourceData = applicationParametersRepository.findById(id);

		if (resourceData.isPresent()) {
			ApplicationParameter _resource = resourceData.get();
			_resource.setKeyField(entry.getKeyField());
			_resource.setOptions(entry.getOptions());
			_resource.setUnit_type(entry.getUnit_type());
			_resource.setValue(entry.getValue());
	
			
			return new ResponseEntity<>(applicationParametersRepository.save(_resource), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		}
	
	@DeleteMapping("/appParameter/delete")
	public ResponseEntity<String> deleteAllEntries() {
	//	System.out.println("Delete All Enteries...");

		applicationParametersRepository.deleteAll();

		return new ResponseEntity<>("All entries have been deleted!", HttpStatus.OK);
	}
	
	@DeleteMapping("/appParameter/delete/{id}")
	public ResponseEntity<String> deleteEntry(@PathVariable("id") long id) {
	//	System.out.println("Delete Rate Card with ID = " + id + "...");

		applicationParametersRepository.deleteById(id);

		return new ResponseEntity<>("Entry has been deleted!", HttpStatus.OK);
	}
	
	@PostMapping(value = "/appParameter/create")
	public ApplicationParameter postEntry(@RequestBody ApplicationParameter resource) {
		ApplicationParameter _resource = applicationParametersRepository.save(resource);
		return _resource;
	}
}

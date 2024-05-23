package com.inv.mgmt.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.inv.mgmt.model.ApplicationParameter;


@Repository
public interface ApplicationParameterRepository extends CrudRepository<ApplicationParameter, Long> {

	ApplicationParameter findByKeyField(String string);

	
	
	
}

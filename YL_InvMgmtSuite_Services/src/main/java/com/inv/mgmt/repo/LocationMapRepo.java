package com.inv.mgmt.repo;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.inv.mgmt.model.LocationMap;
import com.inv.mgmt.model.ProductInventory;
import com.inv.mgmt.model.ProductMaster;



public interface LocationMapRepo extends PagingAndSortingRepository<LocationMap, Long> {

	Optional<LocationMap> findByLocationCode(String locationCode);
	
	
	public static final String SEARCH_QUERY = "SELECT * FROM LOCATION_MAP WHERE LOWER(CONCAT(LOCATION_CODE, ' ', lOCATION_REF_1, ' ', lOCATION_REF_2, ' ', lOCATION_REF_3,' ' )) LIKE LOWER(concat('%', ?1, '%'))";
 	@Query(value = SEARCH_QUERY, nativeQuery = true)
 	public ArrayList<LocationMap> search(String searchField);

}

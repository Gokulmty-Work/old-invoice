package com.inv.mgmt.repo;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.inv.mgmt.model.ProductInventory;
import com.inv.mgmt.model.ProductMaster;


public interface ProductMasterRepo extends PagingAndSortingRepository<ProductMaster, Long> {

	public static final String SEARCH_QUERY = "SELECT * FROM PRODUCT_MASTER WHERE LOWER(CONCAT(NAME, ' ', DESCRIPTION, ' ', MASTER_ID, ' ', CATEGORY,' ' )) LIKE LOWER(concat('%', ?1, '%'))";
 	@Query(value = SEARCH_QUERY, nativeQuery = true)
 	public ArrayList<ProductMaster> search(String searchField);
	public Optional<ProductMaster> findByMasterId(String masterId);
	public long countByActiveTrue();
	

}

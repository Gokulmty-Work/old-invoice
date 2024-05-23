package com.inv.mgmt.repo;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.inv.mgmt.model.LocationMap;
import com.inv.mgmt.model.ProductInventory;
import com.inv.mgmt.model.ProductMaster;


public interface ProductInventoryRepo extends PagingAndSortingRepository<ProductInventory, Long> {

	
	public static final String FIND_NAME_BY_TASKID = "SELECT COUNT(*) FROM PRODUCT_INVENTORY where MASTER_ID=:masterId AND CHECKED_IN=true";
 	@Query(value = FIND_NAME_BY_TASKID, nativeQuery = true)
	long findInventoryCount(String masterId);
	
 	Optional<ProductInventory> findBySkuId(String skuId);

	Page<ProductInventory> findByCheckedInTrue(Pageable paging);
		
	ArrayList<ProductInventory> findByCheckedInTrue();

	Page<ProductInventory> findByMasterIdAndCheckedInTrue(String masterId, Pageable paging);
	
	public static final String SEARCH_QUERY = "SELECT * FROM PRODUCT_INVENTORY WHERE LOWER(CONCAT(SKU_ID, ' ', ENTRY_TYPE, ' ', LOCATION_CODE, ' ', CHECK_IN_DATE,' ','CHECK_IN_TYPE', ' ' )) LIKE LOWER(concat('%', ?1, '%')) AND CHECKED_IN=true";
 	@Query(value = SEARCH_QUERY, nativeQuery = true)
 	public ArrayList<ProductInventory> searchAvailableInventory(String searchField);

 	
 	
 	public static final String GET_SKUIDS_BY_LOC_CODE = "SELECT DISTINCT SKU_ID FROM PRODUCT_INVENTORY where LOCATION_CODE=:locationCode AND CHECKED_IN=true";
 	@Query(value = GET_SKUIDS_BY_LOC_CODE, nativeQuery = true)
	HashSet<String> getSkuIdsByLocationCode(String locationCode);

 	public long countByCheckedInTrue();
 	
 	public static final String GET_REENTRY_COUNT = "SELECT COUNT(*) FROM PRODUCT_INVENTORY where ENTRY_COUNT > 0 AND CHECKED_IN=true";
 	@Query(value = GET_REENTRY_COUNT, nativeQuery = true)
	public long countReEnteredItemsCount();
 	
 	
}




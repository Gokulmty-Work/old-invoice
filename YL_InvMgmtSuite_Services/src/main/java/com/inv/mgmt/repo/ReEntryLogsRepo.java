package com.inv.mgmt.repo;

import java.util.ArrayList;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.inv.mgmt.model.ProductInventory;
import com.inv.mgmt.model.ReEntryLog;



public interface ReEntryLogsRepo extends PagingAndSortingRepository<ReEntryLog, Long> {

	ArrayList<ReEntryLog> findAllBySkuId(String skuId);



}

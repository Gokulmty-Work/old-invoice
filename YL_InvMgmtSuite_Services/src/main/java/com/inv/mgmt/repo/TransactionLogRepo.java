package com.inv.mgmt.repo;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Temporal;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.inv.mgmt.model.GraphDataModelBean;
import com.inv.mgmt.model.GraphDataModelBean2;
import com.inv.mgmt.model.ProductInventory;
import com.inv.mgmt.model.ReEntryLog;
import com.inv.mgmt.model.TransactionLog;



public interface TransactionLogRepo extends PagingAndSortingRepository<TransactionLog, Long> {

//	public static final String SEARCH_QUERY = "SELECT * FROM TRANSACTION_LOGS WHERE DATE BETWEEN :startDate AND :endDate";
	public static final String SEARCH_QUERY = "SELECT * FROM TRANSACTION_LOGS WHERE DATE BETWEEN :startDate AND DATEADD(day, 1,:endDate)";
	//DATEADD(day, 1, @EnteredEndDate)
	
 	@Query(value = SEARCH_QUERY, nativeQuery = true)
 	Optional<ArrayList<TransactionLog>> findTransactionsBetween(Date startDate, Date endDate);
	
 	 @Query("SELECT " +
 	           "    new com.inv.mgmt.model.GraphDataModelBean(v.type, COUNT(v)) " +
 	           "FROM TransactionLog v " +
 	           " WHERE v.transaction = :operation AND v.date BETWEEN :startDate AND :endDate" +
 	           " GROUP BY v.type" 
 	           )
 	ArrayList<GraphDataModelBean> findCheckOutTypesPieGraphData(Date startDate, Date endDate, String operation);

 	 //SELECT to_char(date, 'yyyy-mm-dd'), COUNT(DATE) from transaction_logs GROUP BY to_char(date, 'yyyy-mm-dd');
 	 
 
 	 /*
 	  * SELECT to_char(date, 'yyyy-mm-dd'), COUNT(DATE) from transaction_logs GROUP BY to_char(date, 'yyyy-mm-dd');
 	  */
 	 
 	 
 	public static final String DATE_QUERY = "SELECT to_char(date, 'yyyy-mm-dd'), COUNT(DATE) from transaction_logs"
 			+ " WHERE transaction = :operation AND date BETWEEN :startDate AND :endDate "
 			+ " GROUP BY to_char(date, 'yyyy-mm-dd')";
 	@Query(value = DATE_QUERY, nativeQuery = true)
 	List<Object[]> findDateData(Date startDate, Date endDate,String operation);
	
 	 
 	 
 	 
// 	 
//// 	@Query("SELECT new com.inv.mgmt.model.GraphDataModelBean(to_char(v.date, 'yyyy-mm-dd'), COUNT(v))" + 
//// 			" FROM TransactionLog v " + 
//// 			" WHERE v.transaction = :operation AND v.date BETWEEN :startDate AND :endDate " + 
//// 			" GROUP BY v.type")
//
// 	@Query("SELECT " +
//	           " new com.inv.mgmt.model.GraphDataModelBean(to_char(date, 'yyyy-mm-dd'), COUNT(date)) " +
//	           "FROM TransactionLog  " +
//	           " WHERE transaction = :operation AND date BETWEEN :startDate AND :endDate" +
//	           " GROUP BY to_char(date, 'yyyy-mm-dd')" 
//	           )
//List<GraphDataModelBean> findCheckOutData( Date startDate, Date endDate,String operation );
	}
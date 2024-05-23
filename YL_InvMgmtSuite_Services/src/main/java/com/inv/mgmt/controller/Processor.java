package com.inv.mgmt.controller;

import java.io.Serializable;
import java.math.BigInteger;
import java.nio.channels.NonWritableChannelException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Month;
import java.time.Year;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.math.BigDecimal;

import javax.persistence.Entity;

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

import com.inv.mgmt.model.ProductMaster;



@RestController
public class Processor {

	@Autowired
	ProductMasterController productMasterController;
	
	@Autowired
	EmailController emailController;
	
 	
	public void sendPasswordChangeEmail(String emailId, String changedPassword)
	{
		   String subject = "Password Change Request - Inventory Management";
		   String messageBody = "<html><body>"
			        +"<P>Dear User,</p>"
			        + "<p> You have requested for password change on the inventory management. If its not you who requested, please connect with your administrator</P>"
			        + "<P>Your new password is :"+changedPassword+"</P>"
			        + "</body></html>";
		   emailController.sendMimeEmail(new String[] {emailId},new String[] {}, subject, messageBody,null);
	}
	

	
//	
//	public void sendTaskCreationEmail(boolean isExternal, String externalEmail, Task task)
//	{
//		ArrayList<UserProfile> userProfiles = (ArrayList<UserProfile>) userProfileRepo.findAll();
//		String subject = (isExternal) ? "MW Intake Form Submitted Successfully !! " : "Task Created : "+task.getName();
//		String message = prepareHTMLMessageForTaskCreation(isExternal, task);
//	
//		if(isExternal)
//		{
//		HashMap<String,String> entries = new HashMap<String,String>(); 
//		entries.put("MWIntakeProcessImage", "\\image\\MWIntakeProcess.png"); 
//		emailController.sendMimeEmail(new String[] {externalEmail}, getEscalationList(userProfiles), subject, message,entries);
//		
//		}
//		else
//		emailController.sendMimeEmail(getEscalationList(userProfiles),new String[] {}, subject, message,null);
//			
//	}
//	
//	public String prepareHTMLMessageForTaskCreation(boolean isExternal,Task task)
//	{
//		String messageBody="";
//        
//		String taskNumber = (task.getTaskNumber() != null && !task.getTaskNumber().isEmpty()) ? task.getTaskNumber() : "NA";
//		String taskDescription = (task.getDescription() != null && !task.getDescription().isEmpty()) ? task.getDescription() : "NA";
//		String taskStartDate = (task.getStartDate() != null && !task.getStartDate().isEmpty()) ? task.getStartDate() : "NA";
//		String taskEndDate = (task.getEndDate() != null && !task.getEndDate().isEmpty()) ? task.getEndDate() : "NA";
//		
//		String messageTableBody = 	
//		"<table border-left: 2px #000000 solid;border-right: 2px #000000 solid;>"
//        +"<tr>"
//        +"<td> TaskName </td>"
//        +"<td>"
//        +task.getName()
//        +"</td>"
//		+ "</tr>"
//		+"<tr>"
//	    +"<td> Ref Number </td>"
//	    +"<td>"
//	    +taskNumber
//	    +"</td>"
//		+ "</tr>"
//		+"<tr>"
//	    +"<td> Description </td>"
//	    +"<td>"
//	    +taskDescription
//	    +"</td>"
//		+ "</tr>"	
//		+"<tr>"
//	    +"<td> StartDate </td>"
//	    +"<td>"
//	    +taskStartDate
//	    +"</td>"
//		+ "</tr>"
//		+"<tr>"
//	    +"<td> EndDate </td>"
//	    +"<td>"
//	    +taskEndDate
//	    +"</td>"
//		+ "</tr>"
//		+"<tr>"
//	    +"<td> Requestor </td>"
//	    +"<td>"
//	    +task.getCreator()
//	    +"</td>"
//		+ "</tr>"
//		+ "</table>";
//		
//        
//		if(isExternal)
//		{
//			messageBody = "<html>"
//					+"<style>" + 
//					" table, th, td { " + 
//					"  border: 1px solid black; " + 
//					"}" + 
//					"</style>"
//					+ "<body>"
//			        +"<P>Dear Requestor,</p>"
//			        +"<P>Thank You for your submission ! Your Project request has been submitted to the Middleware team. A tech lead will reach out to you and go through the next steps. You may contact Sumit Khera/Abhishek Aggarwal marked on this email for any further information.</P>"
//			        + "<P>Please find below the summary of the details provided :</P>"	
//			        +messageTableBody
//			        +"<P>Middleware Project Execution Process has been explained in the following diagram: </P>"	
//			        +"<img src=\"cid:MWIntakeProcessImage\" />"
//					+ "</body></html>";
//		}
//		else
//		{
//		messageBody ="<html>"
//				+"<style>" + 
//				" table, th, td { " + 
//				"  border: 1px solid black; " + 
//				"}" + 
//				"</style>"
//				+ "<body>"
//		        +"<P>Hello,</p>"
//		        +"<P>A new demand has been created on the capacity planner board by one of our team member ! Kindly assign resources.</P>"
//		        + "<P>Please find below the summary of the details provided :</P>"	
//		        +messageTableBody
//				+ "</body></html>";
//		}
//		
//        return messageBody;
//		
//	}
//		
//	public String[] getEscalationList(ArrayList<UserProfile> userProfiles )
//	{
//		List<UserProfile> supervisorList = userProfiles.stream()
//				.filter(item -> item.getRole().equals("ADMIN") || item.getRole().equals("MANAGER")).collect(Collectors.toList());
//		
//		List<String> ccList = supervisorList.stream()
//				.map(UserProfile::getEmail).collect(Collectors.toList());	
//		String[] ccMailListArray = ccList.toArray(new String[ccList.size()]);
//		
//		return ccMailListArray;
//		
//	}
//	
//	public String[] getAuditRoleList(ArrayList<UserProfile> userProfiles )
//	{
//		List<UserProfile> supervisorList = userProfiles.stream()
//				.filter(item -> item.getRole().equals("AUDIT")).collect(Collectors.toList());
//		
//		List<String> ccList = supervisorList.stream()
//				.map(UserProfile::getEmail).collect(Collectors.toList());	
//		String[] ccMailListArray = ccList.toArray(new String[ccList.size()]);
//		
//		return ccMailListArray;
//		
//	}
//    
	
	
}	

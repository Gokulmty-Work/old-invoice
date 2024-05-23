package com.inv.mgmt.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;

import javax.mail.Message;
import javax.mail.Message.RecipientType;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMailMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/mail")
public class EmailController {

		
	@Autowired
    private JavaMailSender javaMailSender;
	
	@Autowired
	private Environment env;

    @GetMapping(value = "/sendmail")
    public String sendmail() {

        sendMail("abhishek.aggarwal1@stryker.com", "Test Subject", "Test mail");

        return "emailsent";
    }
    
 public void sendMail(String toEmail, String subject, String message) {

    	
    	
        SimpleMailMessage mailMessage = new SimpleMailMessage();

        mailMessage.setTo(toEmail);
        mailMessage.setSubject(subject);
        mailMessage.setText(message);

        mailMessage.setFrom("Integration@Stryker.com");
        System.out.println(mailMessage);
        System.out.println(javaMailSender);
        
        javaMailSender.send(mailMessage);
    }
 
 public void sendSimpleEmail(String[] toEmail, String[] ccEmail, String subject, String message) {

	 if(toEmail.length >0)
	 {
	 	 
     SimpleMailMessage mailMessage = new SimpleMailMessage();

     mailMessage.setTo(toEmail);
     mailMessage.setSubject(subject);
     mailMessage.setText(message);
     
     if(ccEmail.length>0)
    	 mailMessage.setCc(ccEmail);
     
     
     mailMessage.setFrom(env.getProperty("emailFrom"));
     
     
     javaMailSender.send(mailMessage);
	 }
 }
 
 public void sendMimeEmail(String[] toEmail, String[] ccEmail, String subject, String message,HashMap<String,String> inlineEntries) {

	 if(toEmail.length >0)
	 {
	 
		 MimeMessagePreparator preparator = new MimeMessagePreparator() 
		    {
		        public void prepare(MimeMessage mimeMessage) throws Exception 
		        {
		        	InternetAddress[] toRecipientAddresses = new InternetAddress[toEmail.length];
		        	for(int i=0;i<toEmail.length;i++)
		        	{
		        		toRecipientAddresses[i] = new InternetAddress(toEmail[i].trim());
		        	}
		        
		        	mimeMessage.setRecipients(RecipientType.TO, toRecipientAddresses);
		        		        	
		        	if(ccEmail.length>0)
		        	{
		        		InternetAddress[] ccRecipientAddresses = new InternetAddress[ccEmail.length];
		        		for(int i=0;i<ccEmail.length;i++)
			        	{
		        			ccRecipientAddresses[i] = new InternetAddress(ccEmail[i].trim());
			        	}
		        		mimeMessage.setRecipients(RecipientType.CC, ccRecipientAddresses);
		        	}
		        	
		        			            
		            mimeMessage.setFrom(env.getProperty("emailFrom"));
		            
		            mimeMessage.setSubject(subject);
		             
		            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
		            
		            helper.setText(message,true);
		             
		          
		            if(inlineEntries != null && inlineEntries.size()>0)
		            {
		            	for (HashMap.Entry<String,String> entry : inlineEntries.entrySet())  
		            	{
		                 //   System.out.println("Key = " + entry.getKey() +", Value = " + entry.getValue()); 
		            		helper.addInline(entry.getKey(), new ClassPathResource(entry.getValue()));
		            	}
		            }
		            
		            
		       //    FileSystemResource res = new FileSystemResource(new File("image/MWIntakeProcessImage.png"));
		       //     System.out.println(res);
		            
		        //      helper.addAttachment("MWIntakeProcessImage", new ClassPathResource("\\image\\MWIntakeProcess.png"));
		        //      helper.addInline("MWIntakeProcessImage", new ClassPathResource("\\image\\MWIntakeProcess.png"));
		            
//		            MimeBodyPart imagePart = new MimeBodyPart();
//		            imagePart.setHeader("Content-ID", "MWIntakeProcessImage");
//		            imagePart.setDisposition(MimeBodyPart.INLINE);
//		            // attach the image file
//		         //   ClassPathResource imgFile = new ClassPathResource("image/MWIntakeProcessImage.png");
//		            imagePart.attachFile(new File("image/MWIntakeProcessImage.png"));
		            
		            
		        }
		    };
		     
		    try {
		    	javaMailSender.send(preparator);
		    }
		    catch (MailException ex) {
		        // simply log it and go on...
		        System.err.println(ex.getMessage());
		    }
	 }
  
 }
 
 
 
 
 
 
}

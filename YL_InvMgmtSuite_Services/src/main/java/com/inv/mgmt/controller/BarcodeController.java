package com.inv.mgmt.controller;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.imageio.ImageIO;

import org.apache.tools.ant.types.resources.Files;
import org.krysalis.barcode4j.impl.code128.Code128Bean;
import org.krysalis.barcode4j.impl.code128.Code128Constants;
import org.krysalis.barcode4j.output.bitmap.BitmapCanvasProvider;
import org.krysalis.barcode4j.tools.UnitConv;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inv.mgmt.model.LocationMap;
import com.inv.mgmt.model.ProductInventory;
import com.inv.mgmt.repo.LocationMapRepo;



//@CrossOrigin(origins = "http://localhost:4200")
@CrossOrigin
@RestController
@RequestMapping("/api/barcode")
public class BarcodeController {

	@Autowired
	LocationMapRepo locationRepo;
	
	
	

	@PostMapping(value = "/printLocCodes")
	public byte[] printLocationBarcodes(@RequestBody ArrayList<String> codes) {

		
		ArrayList<String> barcodesList = new ArrayList<String>();
						
		for(int i=0;i<codes.size();i++)
		{
			barcodesList.add(codes.get(i));
		}
		if(barcodesList.size()>0)
		
		{
			byte[] bytes = getBarCodeFile(barcodesList);
			return bytes;	
		}
		else
			return null;
		
	}

	
	
	
	@PostMapping(value = "/getLocationCodes")
	public byte[] getLocationCodes(@RequestBody ArrayList<LocationMap> locations) {

		ArrayList<String> barcodesList = new ArrayList<String>();
						
		for(int i=0;i<locations.size();i++)
		{
			
			String locCode = "LC_" + locations.get(i).getLocationRef_1()+"_"+locations.get(i).getLocationRef_2()+"_"+locations.get(i).getLocationRef_3();   
			barcodesList.add(locations.get(i).getLocationCode());

			try {
			Optional<LocationMap> locationData = locationRepo.findByLocationCode(locations.get(i).getLocationCode());
			if (!locationData.isPresent()) 
			locationRepo.save(locations.get(i));	
			}
				catch(Exception e)
				{
					e.printStackTrace();
				}
			
		}
		byte[] bytes = getBarCodeFile(barcodesList);
		return bytes;
	
	}
		
	@GetMapping(value = "/{masterId}/{startCount}/{endCount}")
	public byte[] generateFile(@PathVariable String masterId,
			@PathVariable int startCount, @PathVariable int endCount) {
	
		ArrayList<String> barcodesList = new ArrayList<String>();
		
//		Date currentDate = new Date();
//		SimpleDateFormat DateFor = new SimpleDateFormat("ddMM");
//		String stringDate= DateFor.format(currentDate);
		
		for(int i=startCount;i<=endCount;i++)
		{
			String masterPart = (masterId.length()>8)?masterId.substring(0,8):masterId;
			String partId = String.format("%03d",i);			
			barcodesList.add(masterPart+partId);
		}
		
		byte[] bytes = getBarCodeFile(barcodesList);
		return bytes;
		
	}
	
	
	public byte[] getBarCodeFile(ArrayList<String> barcodesList) {
		
		byte[] bytes = null;
		
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
	
		final int dpi = 300;
		BitmapCanvasProvider canvas = new BitmapCanvasProvider(baos, "image/x-png", dpi, BufferedImage.TYPE_BYTE_BINARY, false, 0);
        List<BufferedImage> bufferedImageList = new ArrayList<>(); // list for bufferedImages
        int sumHeight = 0;
        int sumWhide = 0;
        int columns = 3;
        int rows = 0;
      
        for (int i = 0; i < barcodesList.size(); i++) {
            try {
                Code128Bean code128 = new Code128Bean();
                code128.setCodeset(Code128Constants.CODESET_B);

              //Configure the barcode generator  //adjust barcode width here
              
                code128.setModuleWidth(UnitConv.in2mm(4.0f / dpi)); 
                code128.setHeight(12f);
               
                // code128.setModuleWidth(0.3);
                
                code128.setQuietZone(15);
               	
                code128.doQuietZone(true);
               
               code128.generateBarcode(canvas, (String) barcodesList.get(i));
               sumHeight = sumHeight + canvas.getBufferedImage().getHeight();
               sumWhide = sumWhide + canvas.getBufferedImage().getWidth();
               bufferedImageList.add(canvas.getBufferedImage()); // collect images of barcode in cycle
               canvas.finish();

            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        double dbl = barcodesList.size() / (double) columns;
        rows = (int)Math.ceil(dbl);

        int oneWhide = sumWhide / barcodesList.size();
        int imgWhide = oneWhide * columns;


        int oneHeight = sumHeight / barcodesList.size();
        int imgHeight = oneHeight * rows + (21*rows);


        BufferedImage bigImage = new BufferedImage(imgWhide, imgHeight, BufferedImage.TRANSLUCENT);
        
        Graphics g = bigImage.getGraphics();
       
        int x = 0;
        int y = 20;
        for (BufferedImage bufferedImage : bufferedImageList) {

            g.drawImage(bufferedImage, x, y, null);
            x += oneWhide ;
            if(x >= bigImage.getWidth())
            {
                x = 0;
                y = bufferedImage.getHeight() + y + 20 ;
            }
            
        }
        
        try { 
        
        	File file = new File("barcodes.png");
        	
        	ImageIO.write(bigImage,"png",file);
            
        	bytes = new byte[(int) file.length()];
           
            try(FileInputStream fis = new FileInputStream(file)){
                fis.read(bytes);
            }
        	
			baos.flush();
        	baos.close();
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
      		
		return bytes;
	}
	
}
	
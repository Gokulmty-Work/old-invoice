package com.inv.mgmt.logic;

import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;

import javax.imageio.ImageIO;

import org.krysalis.barcode4j.impl.code128.Code128Bean;
import org.krysalis.barcode4j.impl.code128.Code128Constants;
import org.krysalis.barcode4j.output.bitmap.BitmapCanvasProvider;
import org.krysalis.barcode4j.tools.UnitConv;

public class BarCodeUtility2 {

	public static void main(String[] args) {
		
		
		ArrayList<String> barcodesList = new ArrayList<String>();
		
		for(int i=0;i<50;i++)
		{
			barcodesList.add("SHOEBLACK01_"+i);
		}
		
		
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		final int dpi = 100;
		BitmapCanvasProvider canvas = new BitmapCanvasProvider(baos, "image/x-png", dpi, BufferedImage.TYPE_BYTE_BINARY, false, 0);
        List<BufferedImage> bufferedImageList = new ArrayList<>(); // list for bufferedImages
        int sumHeight = 0;
        int sumWhide = 0;
        int columns = 4;
        int rows = 0;
      
        
        for (int i = 0; i < barcodesList.size(); i++) {

            try {
                Code128Bean code128 = new Code128Bean();
                
                
                code128.setCodeset(Code128Constants.CODESET_B);
                

              //Configure the barcode generator
              //adjust barcode width here
                code128.setModuleWidth(UnitConv.in2mm(1.0f / dpi)); 
                code128.doQuietZone(false);
                
                code128.setHeight(15f);
             //   code128.setModuleWidth(0.3);
               code128.setQuietZone(20);
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
        int imgHeight = oneHeight * rows;


        BufferedImage bigImage = new BufferedImage(imgWhide, imgHeight, BufferedImage.TYPE_BYTE_BINARY);
        Graphics g = bigImage.getGraphics();
        int x = 0;
        int y = 0;
        for (BufferedImage bufferedImage : bufferedImageList) {

            g.drawImage(bufferedImage, x, y, null);
            x += oneWhide;
            if(x >= bigImage.getWidth()){
                x = 0;
                y += bufferedImage.getHeight();
            }
        }
    //    ImageIO.write(bigImage,"png",new File(barcodePath.toString()));
        try {
			ImageIO.write(bigImage,"png",new File("C:\\\\Personal_Self/abc.png"));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        


    } 

	}



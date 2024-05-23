package com.inv.mgmt.model;

import java.util.ArrayList;

public class Datasets {
	
		
		String label;
		ArrayList<Long> data;
		ArrayList<String> dataLabels;
				
		public ArrayList<String> getDataLabels() {
			return dataLabels;
		}
		public void setDataLabels(ArrayList<String> dataLabels) {
			this.dataLabels = dataLabels;
		}
		public String getLabel() {
			return label;
		}
		public void setLabel(String label) {
			this.label = label;
		}
		public ArrayList<Long> getData() {
			return data;
		}
		public void setData(ArrayList<Long> data) {
			this.data = data;
		}
		public Datasets() {
			super();
		}
		
	
}

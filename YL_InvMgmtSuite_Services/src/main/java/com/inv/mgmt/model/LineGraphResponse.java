package com.inv.mgmt.model;

import java.util.ArrayList;

public class LineGraphResponse {

		ArrayList<String> labels;
		ArrayList<Datasets> datasets;
		
						
		public ArrayList<Datasets> getDatasets() {
			return datasets;
		}


		public void setDatasets(ArrayList<Datasets> datasets) {
			this.datasets = datasets;
		}


		public LineGraphResponse() {
			
		}

		
		public ArrayList<String> getLabels() {
			return labels;
		}

		public void setLabels(ArrayList<String> labels) {
			this.labels = labels;
		}

	}
	
//class Datasets{
//	
//	String label;
//	ArrayList<Long> data;
//	public String getLabel() {
//		return label;
//	}
//	public void setLabel(String label) {
//		this.label = label;
//	}
//	public ArrayList<Long> getData() {
//		return data;
//	}
//	public void setData(ArrayList<Long> data) {
//		this.data = data;
//	}
//	public Datasets() {
//		super();
//	}
//	
//	
//}


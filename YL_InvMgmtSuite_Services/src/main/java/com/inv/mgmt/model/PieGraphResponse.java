package com.inv.mgmt.model;

import java.util.ArrayList;

public class PieGraphResponse {

		ArrayList<String> labels;
		ArrayList<Long> pieChartData;
		
		public ArrayList<String> getLabels() {
			return labels;
		}

		public void setLabels(ArrayList<String> labels) {
			this.labels = labels;
		}

		public ArrayList<Long> getPieChartData() {
			return pieChartData;
		}

		public void setPieChartData(ArrayList<Long> pieChartData) {
			this.pieChartData = pieChartData;
		}

		public PieGraphResponse() {
			super();
		}

		public PieGraphResponse(ArrayList<String> labels, ArrayList<Long> pieChartData) {
			super();
			this.labels = labels;
			this.pieChartData = pieChartData;
		}


	}
	


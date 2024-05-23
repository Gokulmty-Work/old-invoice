import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AppConstants } from 'src/app/AppConstants';
import { AppParameterService } from 'src/app/services/app-parameter.service';
import { AuthService } from 'src/app/services/auth.service';
import { HomeService } from 'src/app/services/home.service';
import { ProductInventoryService } from 'src/app/services/product-inventory.service';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Label, ThemeService,Color } from 'ng2-charts';
import { ScannerComponent } from '../scanner/scanner.component';
import { SearchComponent } from '../search/search.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  notificationData: any;
  notificationCount:number;
  showNotifications: boolean= false;
  countData: any;
  showCounts: boolean= false;
  checkOutData:any;
  showCheckOutData: boolean = false;
  skuId:string;
  locationCode: string;

  dataReady:boolean = false;

  checkInData:any;
  showCheckInData: boolean = false;

  checkOutLineGraphData:any;
  showCheckOutLineGraph:boolean = false;

  checkInLineGraphData:any;
  showCheckInLineGraph:boolean = false;


  // Pie Graph Data
pieChartDataCheckOut;
pieChartLabelsCheckOut: Label[];
pieChartTypeCheckOut;
pieChartOptionsCheckOut;
pieGraphSetCheckOut: boolean = false;

pieChartDataCheckIn;
pieChartLabelsCheckIn: Label[];
pieChartTypeCheckIn;
pieChartOptionsCheckIn;
pieGraphSetCheckIn: boolean = false;



lineChartCheckOutData: ChartDataSets[];
lineChartCheckOutLabels: Label[];
lineChartCheckOutOptions:any;

lineChartCheckOutColors: Color[];
lineChartCheckOutLegend:boolean = true;
lineChartCheckOutPlugins = [];
lineChartCheckOutType = 'line';

lineChartCheckInData: ChartDataSets[];
lineChartCheckInLabels: Label[];
lineChartCheckInOptions:any;

lineChartCheckInColors: Color[];
lineChartCheckInLegend:boolean = true;
lineChartCheckInPlugins = [];
lineChartCheckInType = 'line';


  constructor(private productInventoryService: ProductInventoryService, 
    public authService :AuthService, 
    public dialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar, 
    private appParameterService : AppParameterService,
    private activatedRoute :ActivatedRoute,
    private homeService: HomeService,
    ) { 
      if(!this.authService.isUserLoggedIn())
      {
        this.router.navigate(['login']);
      }
      this.homeService.getNotifications()
      .subscribe(data => {
        console.log(data); 
       if(data !=null)
        {
        this.notificationData = data;
        this.notificationCount = data.details.length;
        AppConstants.notificationProducts = data.details;
        this.showNotifications = true;
        this.dataReady = true;
        }
    
      }, error => {
        console.log(error);
        let snackBarRef = this._snackBar.open("NotificationsDataRecieveError", "ERROR :"+error.status, {duration: 3000,});
        snackBarRef.onAction().subscribe(() => {
          this._snackBar.dismiss();
        });
      });  
     

      this.homeService.getCounts()
      .subscribe(data => {
        console.log(data); 
       if(data !=null)
        {
        this.countData = data;
        this.showCounts = true;
        this.dataReady = true;
        }
    
      }, error => {
        console.log(error);
        let snackBarRef = this._snackBar.open("CountsDataRecieveError", "ERROR :"+error.status, {duration: 3000,});
        snackBarRef.onAction().subscribe(() => {
          this._snackBar.dismiss();
        });
      });  
      
      this.homeService.getCheckOutTypes()
      .subscribe(data => {
        console.log("CheckIn")
        console.log(data); 
       if(data !=null)
        {
        this.checkOutData = data;
        this.pieChartTypeCheckOut = 'pie';
        this.pieChartOptionsCheckOut= {
       responsive: true,
       title: {
         display: true,
         position: "top",
         text: "CheckOutTypes",
         fontSize: 8,
         fontColor: "#111"
       },
       legend: {
         display: true,
         position: "bottom",
         labels: {
           fontColor: "#333",
           fontSize: 7
         }
       }
     };
     
           this.pieChartLabelsCheckOut = this.checkOutData.last7DaysData.labels;
           this.pieChartDataCheckOut = this.checkOutData.last7DaysData.pieChartData;
           this.showCheckOutData = true;
           this.dataReady = true;
  
        }
    
      }, error => {
        console.log(error);
        let snackBarRef = this._snackBar.open("CheckOutDataRecieveError", "ERROR :"+error.status, {duration: 3000,});
        snackBarRef.onAction().subscribe(() => {
          this._snackBar.dismiss();
        });
      });  
     
      this.homeService.getCheckInTypes()
      .subscribe(data => {
        console.log("CheckInData"); 
        console.log(data); 
       if(data !=null)
        {
        this.checkInData = data;
        this.pieChartTypeCheckIn = 'pie';
        this.pieChartOptionsCheckIn= {
       responsive: true,
       title: {
         display: true,
         position: "top",
         text: "CheckInTypes",
         fontSize: 8,
         fontColor: "#111"
       },
       legend: {
         display: true,
         position: "bottom",
         labels: {
           fontColor: "#333",
           fontSize: 6
         }
       }
     };
     
           this.pieChartLabelsCheckIn = this.checkInData.last7DaysData.labels;
           this.pieChartDataCheckIn = this.checkInData.last7DaysData.pieChartData;
           this.showCheckInData = true;
           this.dataReady = true;
  
        }
    
      }, error => {
        console.log(error);
        let snackBarRef = this._snackBar.open("CheckInDataRecieveError", "ERROR :"+error.status, {duration: 3000,});
        snackBarRef.onAction().subscribe(() => {
          this._snackBar.dismiss();
        });
      });  
     
      this.homeService.getCheckOutLineGraphData()
      .subscribe(data => {
        console.log("CheckOutLineGraphData"); 
        console.log(data); 
       if(data !=null)
        {
        this.checkOutLineGraphData = data;

        this.lineChartCheckOutData = [
          { data: this.checkOutLineGraphData.last30DaysData.datasets[0].data, 
            label: this.checkOutLineGraphData.last30DaysData.datasets[0].label },
        ];
      
        this.lineChartCheckOutLabels = this.checkOutLineGraphData.last30DaysData.datasets[0].dataLabels;
      
        this.lineChartCheckOutOptions = {
          responsive: true,
        };
      
        this.lineChartCheckOutColors = [
          {
            borderColor: 'black',
            backgroundColor: 'rgba(255,255,0,0.28)',
          },
        ];
      
        this.lineChartCheckOutLegend = true;
        this.lineChartCheckOutPlugins = [];
        this.lineChartCheckOutType = 'line';
        
        this.showCheckOutLineGraph = true;
        this.dataReady = true;


        }
    
      }, error => {
        console.log(error);
        let snackBarRef = this._snackBar.open("CheckOutLineGraphDataRecieveError", "ERROR :"+error.status, {duration: 3000,});
        snackBarRef.onAction().subscribe(() => {
          this._snackBar.dismiss();
        });
      });  
     

      this.homeService.getCheckInLineGraphData()
      .subscribe(data => {
        console.log("CheckInLineGraphData"); 
        console.log(data); 
       if(data !=null)
        {
        this.checkInLineGraphData = data;

        this.lineChartCheckInData = [
          { data: this.checkInLineGraphData.last30DaysData.datasets[0].data, 
            label: this.checkInLineGraphData.last30DaysData.datasets[0].label },
        ];
      
        this.lineChartCheckInLabels = this.checkInLineGraphData.last30DaysData.datasets[0].dataLabels;
      
        this.lineChartCheckInOptions = {
          responsive: true,
        };
      
        this.lineChartCheckInColors = [
          {
            borderColor: 'black',
            backgroundColor: 'blue',
          },
        ];
      
        this.lineChartCheckInLegend = true;
        this.lineChartCheckInPlugins = [];
        this.lineChartCheckInType = 'line';
        
        this.showCheckInLineGraph = true;
        this.dataReady = true;


        }
    
      }, error => {
        console.log(error);
        let snackBarRef = this._snackBar.open("CheckOutLineGraphDataRecieveError", "ERROR :"+error.status, {duration: 3000,});
        snackBarRef.onAction().subscribe(() => {
          this._snackBar.dismiss();
        });
      });  






 

      
    }

    breakpoint:any;
    breakpoint6:any;
    breakpoint4:any;
  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 4;
    this.breakpoint6 = (window.innerWidth <= 600) ? 1 : 6;
    this.breakpoint4 = (window.innerWidth <= 600) ? 1 : 4;
}

onResize(event) {
  this.breakpoint = (event.target.innerWidth <= 600) ? 1 : 4;
  this.breakpoint6 = (event.target.innerWidth <= 600) ? 1 : 6;
  this.breakpoint4 = (event.target.innerWidth <= 600) ? 1 : 4;
}

  reorderNotifications()
  {
  //  event.preventDefault();
   // this.router.navigate(['productMasterList']);

 this.router.navigate(['productMasterList'], { queryParams: { fromComponent: 'home', 
  message: "showNotifications"} });
  }

  onButtonGroupClickCheckIn(event)
  {
    switch(event.target.id)
    {
   case '7':{
     this.showCheckInData = false;
     this.pieChartLabelsCheckIn = this.checkInData.last7DaysData.labels;
     this.pieChartDataCheckIn = this.checkInData.last7DaysData.pieChartData;
     this.showCheckInData = true;
   
   
   
     break;
   }
    case '30':{
   
     this.showCheckInData = false;
     this.pieChartLabelsCheckIn = this.checkInData.last30DaysData.labels;
     this.pieChartDataCheckIn = this.checkInData.last30DaysData.pieChartData;
     this.showCheckInData = true;
     break;
   }
   case '180':{
     this.showCheckInData = false;
     this.pieChartLabelsCheckIn = this.checkInData.last180DaysData.labels;
     this.pieChartDataCheckIn = this.checkInData.last180DaysData.pieChartData;
     this.showCheckInData = true;
   
     break;
   }
   case '365':{
   
     this.showCheckInData = false;
     this.pieChartLabelsCheckIn = this.checkInData.last365DaysData.labels;
     this.pieChartDataCheckIn = this.checkInData.last365DaysData.pieChartData;
     this.showCheckInData = true;
   
     break;
   }
   
  }
  }





onButtonGroupClickCheckOut(event)
  {
switch(event.target.id)
 {
case '7':{
  this.showCheckOutData = false;
  this.pieChartLabelsCheckOut = this.checkOutData.last7DaysData.labels;
  this.pieChartDataCheckOut = this.checkOutData.last7DaysData.pieChartData;
  this.showCheckOutData = true;



  break;
}
 case '30':{

  this.showCheckOutData = false;
  this.pieChartLabelsCheckOut = this.checkOutData.last30DaysData.labels;
  this.pieChartDataCheckOut = this.checkOutData.last30DaysData.pieChartData;
  this.showCheckOutData = true;
  break;
}
case '180':{
  this.showCheckOutData = false;
  this.pieChartLabelsCheckOut = this.checkOutData.last180DaysData.labels;
  this.pieChartDataCheckOut = this.checkOutData.last180DaysData.pieChartData;
  this.showCheckOutData = true;

  break;
}
case '365':{

  this.showCheckOutData = false;
  this.pieChartLabelsCheckOut = this.checkOutData.last365DaysData.labels;
  this.pieChartDataCheckOut = this.checkOutData.last365DaysData.pieChartData;
  this.showCheckOutData = true;

  break;
}

 }

  console.log(event);
  console.log(event.srcElement.classList)
 // console.log(event.srcElement.siblings)
 
  event.srcElement.classList.removeClass('active');
  console.log(event.srcElement.classList)

 // event.target.siblings.classList.removeClass('active');
}



captureComplete(obj: string)
{
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  dialogConfig.autoFocus = false;
  
  const dialogRef = this.dialog.open(SearchComponent,{
    data: { searchField: obj, requestingComponent: 'DashBoardComponent',id: (obj == 'skuId') ? this.skuId : this.locationCode},
    height: '80%',
    width:  '80%',
  });
 dialogRef.afterClosed().subscribe(result => {
  this.skuId ="";
  this.locationCode="";
  });
}


scanObject(obj: string)
{
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  dialogConfig.autoFocus = false;
  
  const dialogRef = this.dialog.open(ScannerComponent,{
    data: { scannedField: obj, requestingComponent: 'DashBoardComponent'},
    height: '100%',
    width:  '100%',
    
  });
 dialogRef.afterClosed().subscribe(result => {
  
     if(result.responseMessage =='success' && result.code != undefined)
     {
     if(obj == 'skuId')
     this.skuId = result.code;
     if(obj =='locationCode')
     this.locationCode = result.code;
     }
  });
}

  }



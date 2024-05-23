import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TransactionModel } from 'src/app/models/transaction-model';
import { AuthService } from 'src/app/services/auth.service';
import { ExcelService } from 'src/app/services/excel.service';
import { ProductInventoryService } from 'src/app/services/product-inventory.service';
import { ProductMasterService } from 'src/app/services/product-master.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { ExcelImportExportComponent } from '../excel-import-export/excel-import-export.component';

@Component({
  selector: 'app-transaction-report',
  templateUrl: './transaction-report.component.html',
  styleUrls: ['./transaction-report.component.css']
})
export class TransactionReportComponent implements OnInit {

  startDate: Date;
  endDate : Date;
  dataReady: boolean= false;
  transactions:TransactionModel[];
  
  constructor(private transactionService : TransactionService,
    private productMasterService: ProductMasterService,
    private inventoryService: ProductInventoryService,
    private excelService: ExcelService,
    private router: Router,public dialog: MatDialog
    ,private _snackBar: MatSnackBar,
    private authService: AuthService)  
     {  

      if(!this.authService.isUserLoggedIn() )
    {
      this.router.navigate(['login']);
    }
    } 

  ngOnInit(): void {
  }

  submit()
  {
    console.log(this.startDate);
    console.log(this.endDate);
  //  console.log(this.startDate.toDateString());
    console.log(this.startDate.toString());
    this.transactionService.getTransactions(this.startDate,this.endDate)
    .subscribe(data => {
    console.log(data); 
    this.transactions = data;
    this.dataReady = true;

  // generate excel
  let fileName = "transactions"+this.startDate.toString()+"_To_"+this.endDate.toString()+".xlsx";
   this.excelService.exportJSONDataToFile(fileName,"Transactions",data);
    }, 
    error => {
      console.log(error)
      this.router.navigate(['error'], { queryParams: { fromComponent: 'TransactionReport', 
      message: "While generating transaction report", code:error.status+"_"+error.statusText+"_"+error.message}  });

    });
  }


 
generateProductReport()
{
  this.productMasterService.getProductMasterReport()
  .subscribe(data => {console.log(data);
      // generate excel


  let fileName = "productMasterReport"+".xlsx";
  this.excelService.exportJSONDataToFile(fileName,"ProductsListing",data);
    
  
   }, error => {
    console.log(error);
    let snackBarRef = this._snackBar.open("Error", error.message, {duration: 1000,});
    snackBarRef.onAction().subscribe(() => {
      this._snackBar.dismiss();
    });
    this.router.navigateByUrl('error');
  });

}


getInventoryReport()
{
  this.inventoryService.getInventoryReport()
  .subscribe(data => {console.log(data);
      // generate excel
  let fileName = "activeInventoryReport"+".xlsx";
  this.excelService.exportJSONDataToFile(fileName,"Inventory",data);
    
  
   }, error => {
    console.log(error);
    let snackBarRef = this._snackBar.open("Error", error.message, {duration: 1000,});
    snackBarRef.onAction().subscribe(() => {
      this._snackBar.dismiss();
    });
    this.router.navigateByUrl('error');
  });

}





}

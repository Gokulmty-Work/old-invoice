import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AppConstants } from 'src/app/AppConstants';
import { ProductInventory } from 'src/app/models/product-inventory';
import { ProductMaster } from 'src/app/models/product-master';
import { AppParameterService } from 'src/app/services/app-parameter.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProductInventoryService } from 'src/app/services/product-inventory.service';
import { ProductMasterService } from 'src/app/services/product-master.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ScannerComponent } from '../scanner/scanner.component';

@Component({
  selector: 'app-check-in-product',
  templateUrl: './check-in-product.component.html',
  styleUrls: ['./check-in-product.component.css']
})
export class CheckInProductComponent implements OnInit {

  productMaster: ProductMaster;
  productInventory: ProductInventory;
  barcodeValue;
  viewOperation: String;
  checkInTypes:String[];
  codeCaptured:boolean = false;
  locationCaptured: boolean = false;
  appParameterData:any;
  
  constructor(private productInventoryService: ProductInventoryService, 
    public dialogRef: MatDialogRef<CheckInProductComponent>,
    public authService :AuthService, 
    public dialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar, 
    private appParameterService : AppParameterService,
    private activatedRoute :ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      
      if(!this.authService.isUserLoggedIn())
    {
      this.router.navigate(['login']);
    }

    // this.appParameterService.getAppParameters().subscribe(data => 
    //   {
    //   this.appParameterData = data;
    //   this.checkInTypes = this.appParameterData.find(o => o.keyField == 'CheckInTypes').options.split(',');
  
    // }, error => {
    //   console.log(error)
    //  this.router.navigate(['error'], { queryParams: { fromComponent: 'checkInProduct', 
    //  message: "While loading App Parameters", code:error.status+"_"+error.statusText+"_"+error.message}  });
    // });

    this.checkInTypes = this.authService.getAppParameterData().find(o => o.keyField == 'CheckInTypes').options.split(',');
  
      this.viewOperation = data.operation;
      this.productMaster = data.productMaster;
      this.productInventory = new ProductInventory();

    }

  ngOnInit(): void {
  }
  

  scanSkuId()
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    
    const dialogRef = this.dialog.open(ScannerComponent,{
      data: { scannedField: 'skuId', requestingComponent: 'CheckInProductComponent'},
      height: '100%',
      width:  '100%',
      
    });
   dialogRef.afterClosed().subscribe(result => {
    
       if(result.responseMessage =='success' && result.code != undefined)
       {
       this.productInventory.skuId = result.code;
       this.codeCaptured = true;
       }
       else{
        this.productInventory.skuId = null;
        this.codeCaptured = false;
       }
    });
  }
 
selectEntryType()
{

  // if(this.productInventory.entryType =='image')
  // {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = false;
  //   dialogConfig.autoFocus = false;
    
  //   const dialogRef = this.dialog.open(ScannerComponent,{
  //     data: { scannedField: 'skuId', requestingComponent: 'CheckInProductComponent'},
  //     height: '100%',
  //     width:  '100%',
      
  //   });
  //  dialogRef.afterClosed().subscribe(result => {
    
  //      if(result.responseMessage =='success' && result.code != undefined)
  //      {
  //      this.productInventory.skuId = result.code;
  //      this.codeCaptured = true;
  //      }
  //      else{
  //       this.productInventory.skuId = null;
  //       this.codeCaptured = false;
  //      }
  //   });
  //}
}

scanLocation(){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  dialogConfig.autoFocus = false;
  
  const dialogRef = this.dialog.open(ScannerComponent,{
    data: { scannedField: 'locationCode', requestingComponent: 'CheckInProductComponent'},
    height: '100%',
    width:  '100%',
    
  });
 dialogRef.afterClosed().subscribe(result => {
  
     if(result.responseMessage =='success' && result.code != undefined)
     {
     this.productInventory.locationCode = result.code;
     this.locationCaptured = true;
     }
     else{
      this.productInventory.locationCode = null;
     // this.codeCaptured = false;
     }
  });
}


// captureLocation(event) {

//   if(event.target.checked)
//   {

//   const dialogConfig = new MatDialogConfig();
//     dialogConfig.disableClose = false;
//     dialogConfig.autoFocus = false;
    
//     const dialogRef = this.dialog.open(ScannerComponent,{
//       data: { scannedField: 'locationCode', requestingComponent: 'CheckInProductComponent'},
//       height: '100%',
//       width:  '100%',
      
//     });
//    dialogRef.afterClosed().subscribe(result => {
    
//        if(result.responseMessage =='success' && result.code != undefined)
//        {
//        this.productInventory.locationCode = result.code;
//        this.locationCaptured = true;
//        }
//        else{
//         this.productInventory.locationCode = null;
//         this.codeCaptured = false;
//        }
//     });
  
// }
// else
// {
//   this.productInventory.locationCode = null;
//   this.locationCaptured = false;
// }

 
// }

codeCaptureCompleted()
{
  if(this.productInventory.skuId !="" && this.productInventory.skuId !=null && this.productInventory.skuId != undefined)
  this.codeCaptured = true;
}

// scanCode(scannedField:string): Observable<any>  {
 
//   const dialogConfig = new MatDialogConfig();
//   dialogConfig.disableClose = false;
//   dialogConfig.autoFocus = false;
//   let responseCode:string;
//   let responseObj: ResponseObj

//   const dialogRef = this.dialog.open(ScannerComponent,{
//     data: { scannedField: scannedField, requestingComponent: 'CheckInProductComponent'},
//     height: '100%',
//     width:  '100%',
//    });
  
//   dialogRef.afterClosed().subscribe(result => {
//      if(result.responseMessage =='success')
//      responseObj.code = result.code;
//      responseObj.responseStatus = 'success';
//      responseObj.scannedField = scannedField;
//      });
   
//   return responseObj;   
     
//   }
 
cancel()
{
 // this.dialogRef.close({ responseMessage: 'returned' });
  this.dialogRef.close({ responseMessage: 'returned', masterId: this.productMaster.masterId, inventory: this.productMaster.inventory });
   
}


submit()
{

if(this.productInventory.checkInType && this.productInventory.skuId)
{

  this.productInventory.masterId = this.productMaster.masterId;
  this.productInventory.checkInDate = new Date();
  this.productInventory.checkedIn = true;

  let author = this.authService.getLoggedInUserName();
  this.productInventory.user = this.authService.getLoggedInUserName();

  this.productInventoryService.createEntry(this.productInventory)
  .subscribe(data => {
    console.log(data); 
    this.productInventory = data;
    this.productMaster.inventory = Number(this.productMaster.inventory) + 1;
    let snackBarRef = this._snackBar.open("CheckedIn", "OK", {duration: 3000,});
    snackBarRef.onAction().subscribe(() => {
      this._snackBar.dismiss();
    });
   }, error => {
    console.log(error);
    let snackBarRef = this._snackBar.open(error.message, "ERROR :"+error.status, {duration: 3000,});
    snackBarRef.onAction().subscribe(() => {
      this._snackBar.dismiss();
    });
  //  this.dialogRef.close({ responseMessage: error, status: 'error' });
  });

  const dialogRefLocal = this.dialog.open(ConfirmationDialogComponent, {
    data: {
      message: 'Do you want to checkIn more items?',
      buttonText: {
        ok: 'Yes',
        cancel: 'No'
      }
    }
});
  dialogRefLocal.afterClosed().subscribe((confirmed: boolean) => {
    if (confirmed) {
      // StartOver
      this.codeCaptured = false;
     this.locationCaptured = false;
     this.productInventory = new ProductInventory();
    }
    else{
      this.dialogRef.close({ responseMessage: 'success', masterId: this.productMaster.masterId, inventory: this.productMaster.inventory });
    }
  });

}
else{
  alert("Please Fill in all values");
}

}


captureLocationManually()
{
  this.locationCaptured = true;
}

}


export interface ResponseObj{
  code: string;
  scannedField: string;
  responseStatus: string;
}
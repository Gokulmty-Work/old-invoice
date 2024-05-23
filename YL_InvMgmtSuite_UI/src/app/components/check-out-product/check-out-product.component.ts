import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { ScanDetected } from 'ngx-scanner-detection';
import { AppConstants } from 'src/app/AppConstants';
import { ProductInventory } from 'src/app/models/product-inventory';
import { AppParameterService } from 'src/app/services/app-parameter.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProductInventoryService } from 'src/app/services/product-inventory.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ScannerComponent } from '../scanner/scanner.component';
//import {barcodeListener} from 'angular-barcode-listener';

@Component({
  selector: 'app-check-out-product',
  templateUrl: './check-out-product.component.html',
  styleUrls: ['./check-out-product.component.css']
})
export class CheckOutProductComponent implements OnInit {
  // @ViewChild('input') input: ElementRef;

  // handle(event: Event) {
  //   alert("I am Here")
  //   console.log(event);
  //   this.input.nativeElement.value = "event.barcode";
  // }

  // // dummy
  // simulateScanner() {
  //   document.dispatchEvent(new Event('click'));
  //   }





//
  productInventory: ProductInventory;
  skuId : String;
  entryType: String;
  checkOutTypes:String[];
  codeCaptured:boolean = false;
  recordFound: boolean = false;
  eligibleForCheckout: boolean = false;
  appParameterData:any;
  
  constructor(private productInventoryService: ProductInventoryService, 
    public authService :AuthService, 
    public dialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar, 
    private appParameterService : AppParameterService,
    private activatedRoute :ActivatedRoute,
    ) { 
      
  //    console.log(getDevices());

      if(!this.authService.isUserLoggedIn())
    {
      this.router.navigate(['login']);
    }

    this.checkOutTypes = this.authService.getAppParameterData().find(o => o.keyField == 'CheckOutTypes').options.split(',');
   
//     var Hidstream = require('../../../../node_modules/node-hid-stream').Hidstream;
//     var hidstream = new Hidstream({ vendorId: 3233, productId: 3233 });
 
//   hidstream.on("data", function(data) {
//   console.log(data); // Raw buffer from HDI device.
// });

     
    
  }

  ngOnInit(): void {
  }
  scanSkuId(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    
    const dialogRef = this.dialog.open(ScannerComponent,{
      data: { scannedField: 'skuId', requestingComponent: 'CheckOutProductComponent'},
      height: '100%',
      width:  '100%',
      
    });
   dialogRef.afterClosed().subscribe(result => {
    
       if(result.responseMessage =='success' && result.code != undefined)
       {
       this.skuId = result.code;
       this.codeCaptured = true;
       }
       else{
        this.productInventory.skuId = null;
        this.codeCaptured = false;
       }
    });



  }
 


codeCaptureCompleted()
{
  if(this.skuId !="" && this.skuId !=null && this.skuId != undefined)
  this.codeCaptured = true;
  this.submit();
}

cancel()
{
 this.router.navigateByUrl('dashboard');
}


checkOut()
{
  this.productInventory.checkOutDate = new Date();
  this.productInventory.checkedIn = false;
  
  let author = this.authService.getLoggedInUserName();
  this.productInventory.user = this.authService.getLoggedInUserName();

  this.productInventoryService.checkOut(this.productInventory.id,this.productInventory)
  .subscribe(data => {
    console.log(data); 
    let snackBarRef = this._snackBar.open("Checked Out", "OK", {duration: 3000,});
    snackBarRef.onAction().subscribe(() => {
      this._snackBar.dismiss();
    });

    const dialogConfig = new MatDialogConfig();
  const dialogRefLocal = this.dialog.open(ConfirmationDialogComponent, {
    data: {
      message: 'Do you want to checkOut more items?',
      buttonText: {
        ok: 'Yes',
        cancel: 'No'
      }
    }
});
  dialogRefLocal.afterClosed().subscribe((confirmed: boolean) => {
    if (confirmed) {
     // Do Nothing
     this.codeCaptured = false;
     this.recordFound = false;
     this.skuId = null;
     this.entryType = null;
     this.eligibleForCheckout = false;
     this.productInventory = new ProductInventory();
     
    }
    else{
      this.router.navigateByUrl('dashboard');
    }
  });


  }, error => {
    console.log(error);
    let snackBarRef = this._snackBar.open(error.error, "ERROR :"+error.status, {duration: 3000,});
    snackBarRef.onAction().subscribe(() => {
      this._snackBar.dismiss();
    });
  });

}

startOver()
{
  this.codeCaptured = false;
  this.recordFound = false;
  this.skuId = null;
  this.entryType = null;
  this.eligibleForCheckout = false;
  this.productInventory = new ProductInventory();
}

submit()
{
  this.productInventoryService.getEntryBySKUId(this.skuId)
  .subscribe(data => {
    console.log(data); 

    if(data !=null)
    {
    this.productInventory = data;
    this.recordFound = true;

    if(this.productInventory.checkedIn)
    {
     this.eligibleForCheckout = true;
    }


    let snackBarRef = this._snackBar.open("Product Fetched", "OK", {duration: 3000,});
    snackBarRef.onAction().subscribe(() => {
      this._snackBar.dismiss();
    });

  }

  }, error => {
    console.log(error);
    let snackBarRef = this._snackBar.open("Not Found", "ERROR :"+error.status, {duration: 3000,});
    snackBarRef.onAction().subscribe(() => {
      this._snackBar.dismiss();
    });
  });

}



}



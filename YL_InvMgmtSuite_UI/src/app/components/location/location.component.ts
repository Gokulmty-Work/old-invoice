import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { BarecodeScannerLivestreamComponent } from 'ngx-barcode-scanner';
import { Observable } from 'rxjs';
import { AppConstants } from 'src/app/AppConstants';
import { LocationMap } from 'src/app/models/location-map';
import { ProductInventory } from 'src/app/models/product-inventory';
import { ProductMaster } from 'src/app/models/product-master';
import { AppParameterService } from 'src/app/services/app-parameter.service';
import { AuthService } from 'src/app/services/auth.service';
import { LocationMapService } from 'src/app/services/location-map.service';
import { ProductInventoryService } from 'src/app/services/product-inventory.service';
import { ProductMasterService } from 'src/app/services/product-master.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ScannerComponent } from '../scanner/scanner.component';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  locationMap : LocationMap;
  newLocationMap: LocationMap;
  productMaster: ProductMaster;
  productInventory: ProductInventory;
  
  entryType: string;
  locationValid: boolean = false;
  codeCaptured:boolean = false;
  locationCaptured: boolean = false;
  recapture: boolean = true;
  newLocationCode: string;
  newLocationCodeValid:boolean = false;
  newCodeSearchComplete: boolean = false;
  

  locationRef1Const : string;
  locationRef2Const : string;
  locationRef3Const : string;
  
  constructor(private productInventoryService: ProductInventoryService,
    private locationService: LocationMapService, 
    public dialogRef: MatDialogRef<LocationComponent>,
    public authService :AuthService, 
    public dialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar, 
    private appParameterService : AppParameterService,
    private activatedRoute :ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      
      if(!this.authService.isUserLoggedIn() )
    {
      this.router.navigate(['login']);
    }


      this.productInventory = data.inventory;
      
      if(this.productInventory == null || this.productInventory == undefined)
     {
      this.dialogRef.close({ responseMessage: 'error' });
      //result.responseMessage =='success' && result.inventory
     }


     this.locationRef1Const = this.authService.config.locationRef1;
     this.locationRef2Const = this.authService.config.locationRef2;
     this.locationRef3Const = this.authService.config.locationRef3;
     
     
    }

  ngOnInit(): void {

    this.locationService.findByLocationCode(this.productInventory.locationCode)
    .subscribe(data => {
      
      if(data !=null && data !=undefined)
      {
        this.locationMap = data;
        this.locationValid = true;
        this.recapture = false;
      }
  
    }, error => {
      console.log(error);
      let snackBarRef = this._snackBar.open(error.error, "ERROR :"+error.status, {duration: 1000,});
      snackBarRef.onAction().subscribe(() => {
        this._snackBar.dismiss();
      });
    });
  }
  
  captureNewCode()
  {
    this.recapture = true;
  }
 
  scanLocation(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    
    const dialogRef = this.dialog.open(ScannerComponent,{
      data: { scannedField: 'locationCode', requestingComponent: 'location'},
      height: '100%',
      width:  '100%',
      
    });
   dialogRef.afterClosed().subscribe(result => {
    
       if(result.responseMessage =='success' && result.code != undefined)
       {
       this.newLocationCode = result.code;
       this.locationCaptured = true;
       }
       else{
        this.newLocationCode = null;
        this.codeCaptured = false;
       }
    });


  }

// selectEntryType()
// {

//   if(this.productInventory.entryType =='image')
//   {
//     const dialogConfig = new MatDialogConfig();
//     dialogConfig.disableClose = false;
//     dialogConfig.autoFocus = false;
    
//     const dialogRef = this.dialog.open(ScannerComponent,{
//       data: { scannedField: 'skuId', requestingComponent: 'CheckInProductComponent'},
//       height: '100%',
//       width:  '100%',
      
//     });
//    dialogRef.afterClosed().subscribe(result => {
    
//        if(result.responseMessage =='success' && result.code != undefined)
//        {
//        this.productInventory.skuId = result.code;
//        this.codeCaptured = true;
//        }
//        else{
//         this.productInventory.skuId = null;
//         this.codeCaptured = false;
//        }
//     });
//   }
// }

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
  if(this.newLocationCode !="" && this.newLocationCode !=null && this.newLocationCode != undefined)
  this.codeCaptured = true;
}


cancel()
{
  this.dialogRef.close({ responseMessage: 'returned' });
  
}


updateCode()
{
  this.productInventory.locationCode = this.newLocationCode;

  this.productInventoryService.updateEntry(this.productInventory.id,this.productInventory)
  .subscribe(data => {
    console.log(data); 
    this.productInventory = data;

    let snackBarRef = this._snackBar.open("Updated", "OK", {duration: 1000,});
    snackBarRef.onAction().subscribe(() => {
      this._snackBar.dismiss();


    });
   this.dialogRef.close({ responseMessage: 'success', inventory: this.productInventory }); 
  
  }, error => {
    console.log(error);
    let snackBarRef = this._snackBar.open(error.error, "ERROR :"+error.status, {duration: 1000,});
    snackBarRef.onAction().subscribe(() => {
      this._snackBar.dismiss();
    });
  this.dialogRef.close({ responseMessage: 'error' });
  });
}

searchNewCode()
{
  this.locationService.findByLocationCode(this.newLocationCode)
  .subscribe(data => {
      this.newCodeSearchComplete = true;
      this.newLocationCodeValid = true;
      this.newLocationMap = data;
    
  }, error => {
    console.log(error);
    this.newCodeSearchComplete = true;
    this.newLocationCodeValid = false;
    let snackBarRef = this._snackBar.open(error.message, "ERROR :"+error.status, {duration: 1000,});
    snackBarRef.onAction().subscribe(() => {
      this._snackBar.dismiss();
    });
  });
}


}


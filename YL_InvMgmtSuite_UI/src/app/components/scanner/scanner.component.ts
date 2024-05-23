import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { BarecodeScannerLivestreamComponent } from 'ngx-barcode-scanner';
import { window } from 'rxjs/operators';
import { ProductMaster } from 'src/app/models/product-master';
import { AppParameterService } from 'src/app/services/app-parameter.service';
import { AuthService } from 'src/app/services/auth.service';
import { HostListener } from "@angular/core";
import { ChangeDetectorRef,  Input, EventEmitter, Output, OnDestroy} from '@angular/core';
import { AppConstants } from 'src/app/AppConstants';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit {
  scannedField: String;
  requestingComponent: String;
  barcodeValue: String;
  wideScreen: boolean = false;
  // Declare height and width variables



  constructor(
    public dialogRef: MatDialogRef<ScannerComponent>,
    public authService :AuthService, 
    public dialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar, 
    private appParameterService : AppParameterService,
    private activatedRoute :ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      
      if(!this.authService.isUserLoggedIn()  )
      {
        this.router.navigate(['login']);
      }

    if(AppConstants.wideScreen)
    {
      this.wideScreen = true;
    }
    console.log(this.wideScreen);
      this.scannedField = data.operation;
      this.requestingComponent = data.component;


     }

  ngOnInit(): void {
  }

  @ViewChild(BarecodeScannerLivestreamComponent)
  barecodeScanner: BarecodeScannerLivestreamComponent;
 
   ngAfterViewInit() {

    this.barecodeScanner.start();
   }
 
  onValueChanges(result) {
    
    this.barcodeValue = result.codeResult.code;
      
    var r = confirm("Confirm Value: "+this.barcodeValue);
    if (r == true) {
    this.dialogRef.close({ responseMessage: "success", code: this.barcodeValue});
    } else {
     // do nothing
    }
    
   }
 
    onStarted(started) {
    console.log(started);
  }

submit()
{
  console.log("Returning :"+this.barcodeValue);
  this.dialogRef.close({ responseMessage: "success", code: this.barcodeValue});
}


  cancel()
{
  this.dialogRef.close({ responseMessage: "returned", code: 'undefined' });
}

}

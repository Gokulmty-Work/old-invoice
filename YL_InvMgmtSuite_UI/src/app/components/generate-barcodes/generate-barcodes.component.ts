import { CompileMetadataResolver } from '@angular/compiler';
import { Component, OnInit} from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AppConstants } from 'src/app/AppConstants';
import { LocationMap } from 'src/app/models/location-map';
import { LocationMapModel } from 'src/app/models/location-map-model';
import { ProductInventory } from 'src/app/models/product-inventory';
import { ProductMaster } from 'src/app/models/product-master';
import { ProductMasterImportModel } from 'src/app/models/product-master-import-model';
import { AppParameterService } from 'src/app/services/app-parameter.service';
import { AuthService } from 'src/app/services/auth.service';
import { ExcelService } from 'src/app/services/excel.service';
import { GenerateBarcodeService } from 'src/app/services/generate-barcode.service';
import { LocationMapService } from 'src/app/services/location-map.service';
import { ProductInventoryService } from 'src/app/services/product-inventory.service';
import { ProductMasterService } from 'src/app/services/product-master.service';
import { createFalse } from 'typescript';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ScannerComponent } from '../scanner/scanner.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-generate-barcodes',
  templateUrl: './generate-barcodes.component.html',
  styleUrls: ['./generate-barcodes.component.css']
})
export class GenerateBarcodesComponent implements OnInit {

  // Variables
  sub:any;
  fromComponent: string;
  completedStatus: boolean= false;
  finalStatus: string ='';
  masterId : string;
  systemId : string;
  startCount: number;
  endCount: number;
  image: any;

  constructor(private barcodeService: GenerateBarcodeService,
    private router: Router,public dialog: MatDialog
    ,private _snackBar: MatSnackBar,
    private activatedRoute :ActivatedRoute,
    private sanitizer : DomSanitizer ,
    private authService : AuthService
    ) { 

      if(!this.authService.isUserLoggedIn())
      {
        this.router.navigate(['login']);
      }

this.sub = this.activatedRoute
.queryParams
.subscribe(params => {
  this.fromComponent = params['fromComponent'];
  this.masterId = params['masterId'];
  this.systemId = params['systemId'];
});

//  if(this.fromComponent !='ProductMasterComponent')
//  this.ngOnDestroy();

}
  ngOnDestroy() {
 //  throw new Error('Not properly routed');
  }

  ngOnInit(): void {
  }

 

  generateBarcodes()
  {
    this.barcodeService.getBarcodes(this.systemId,this.startCount,this.endCount)
    .subscribe((response) => { 
     console.log(response);
    
         
   var downloadURL = window.URL.createObjectURL(response);
   console.log(downloadURL);
   var link = document.createElement('a');
   console.log(link)
   link.href = downloadURL;
   link.download = this.masterId+"_barcodes.png";
   link.click();

   let snackBarRef = this._snackBar.open("File Downloaded", "Success", {duration: 2000,});
   snackBarRef.onAction().subscribe(() => {
      this._snackBar.dismiss();
    });


  }
   
      , error => {
      console.log(error);
      let snackBarRef = this._snackBar.open(error.message, "ERROR", {duration: 2000,});
      snackBarRef.onAction().subscribe(() => {
         this._snackBar.dismiss();
       });
      
    });
}



}


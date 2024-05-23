import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  skuId:string;
  locationCode: string;

  searchField: string;
  requestingComponent :string;
  id: string;


  responseCaptured: boolean = false;
  notFound: boolean = false;
  productInventoryMode:boolean = false;

  productInventory: ProductInventory;
  locationMap : LocationMap;
  dataFound:boolean = false;

  viewOperation: String;
  checkInTypes:String[];
  codeCaptured:boolean = false;
  locationCaptured: boolean = false;
  appParameterData:any;
  
  constructor(private productInventoryService: ProductInventoryService, 
    private locationService: LocationMapService,
    public dialogRef: MatDialogRef<SearchComponent>,
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
 
      
      this.searchField = data.searchField;
      this.requestingComponent = data.requestingComponent;
      this.id = data.id;
      
      this.productInventory = new ProductInventory();
      this.locationMap = new LocationMap();

      switch(this.searchField)
      {
        case 'skuId':
          {
            this.searchSkuId(this.id);
            this.productInventoryMode = true;
            break;
          }
          case 'locationCode':
          {
            this.searchLocationCode(this.id);
            break;
          }
          default:
            {
              
            }
      }


    }

  ngOnInit(): void {
  }

 searchSkuId(skuId:string)
 {
  this.productInventoryService.getEntryBySKUId(skuId)
  .subscribe(data => {
    console.log(data); 
    this.productInventory = data;
    this.dataFound = true;
    
    let snackBarRef = this._snackBar.open("Entry Found", "OK", {duration: 3000,});
    snackBarRef.onAction().subscribe(() => {
      this._snackBar.dismiss();
    });
   }, error => {
    console.log(error);
    let snackBarRef = this._snackBar.open("Not Found", "ERROR :"+error.status, {duration: 3000,});
    snackBarRef.onAction().subscribe(() => {
      this._snackBar.dismiss();
      this.dialogRef.close();
    });
    this.dialogRef.close();
  });
 }

 searchLocationCode(locationCode:string)
 {
  this.locationService.findByLocationCode(locationCode)
  .subscribe(data => {
    console.log(data); 
    this.locationMap = data;
    this.productInventoryMode = false;
    this.dataFound = true;
    let snackBarRef = this._snackBar.open("Entry Found", "OK", {duration: 3000,});
    snackBarRef.onAction().subscribe(() => {
      this._snackBar.dismiss();
    });
   }, error => {
    console.log(error);
    let snackBarRef = this._snackBar.open("Not Found", "ERROR :"+error.status, {duration: 3000,});
    snackBarRef.onAction().subscribe(() => {
      this._snackBar.dismiss();
      this.dialogRef.close();
    });
    this.dialogRef.close();
  });
 }

cancel()
{
  this.dialogRef.close();
 }

}



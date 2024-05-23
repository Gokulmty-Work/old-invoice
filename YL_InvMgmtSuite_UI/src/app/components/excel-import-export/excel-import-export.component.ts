import { CompileMetadataResolver } from '@angular/compiler';
import { Component, OnInit} from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AppConstants } from 'src/app/AppConstants';
import { LocationMap } from 'src/app/models/location-map';
import { LocationMapModel } from 'src/app/models/location-map-model';
import { ProductInventory } from 'src/app/models/product-inventory';
import { ProductInventoryImportModel } from 'src/app/models/product-inventory-import-model';
import { ProductMaster } from 'src/app/models/product-master';
import { ProductMasterImportModel } from 'src/app/models/product-master-import-model';
import { AppParameterService } from 'src/app/services/app-parameter.service';
import { AuthService } from 'src/app/services/auth.service';
import { ExcelService } from 'src/app/services/excel.service';
import { LocationMapService } from 'src/app/services/location-map.service';
import { ProductInventoryService } from 'src/app/services/product-inventory.service';
import { ProductMasterService } from 'src/app/services/product-master.service';
import { createFalse } from 'typescript';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ScannerComponent } from '../scanner/scanner.component';

@Component({
  selector: 'app-excel-import-export',
  templateUrl: './excel-import-export.component.html',
  styleUrls: ['./excel-import-export.component.css']
})
export class ExcelImportExportComponent implements OnInit {

  // Variables
  sub:any;
  fromComponent: string;
  importedProducts : ProductMasterImportModel[];
  importedLocations : LocationMapModel[];
  importedItems : ProductInventoryImportModel[];
  importedData: any;
  model: string;
  modelObject: any;
  fileParsed: boolean=false;
  categories: String[];
  checkInTypes: String[];
  errors: CustomError[] = new Array();
  completedStatus: boolean= false;
  finalStatus: string ='';

  constructor(private locationService: LocationMapService, 
    private productMasterService :ProductMasterService,
    private productInventoryService :ProductInventoryService,
    private excelSrv : ExcelService,
    private router: Router,public dialog: MatDialog
    ,private _snackBar: MatSnackBar,
    private activatedRoute :ActivatedRoute,
    private authService: AuthService
    ) { 
      if(!this.authService.isUserLoggedIn())
      {
        this.router.navigate(['login']);
      }

this.sub = this.activatedRoute
.queryParams
.subscribe(params => {
  this.fromComponent = params['fromComponent'];
});

this.categories = this.authService.getAppParameterData().find(o => o.keyField == 'Product_Categories').options.split(',');
this.checkInTypes = this.authService.getAppParameterData().find(o => o.keyField == 'CheckInTypes').options.split(',');


// if(this.fromComponent !='ProductMasterComponent')
 // this.ngOnDestroy();

}
  ngOnDestroy() {
  //  throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }

  onFileChange(evt: any) {
  //  alert("I am Here1");
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {

      const bstr: string = e.target.result;
      this.importedData = <any[]>this.excelSrv.importFromFile(bstr);
  //    this.importedData = data.slice(1);
      this.fileParsed = true;
    }
  };

  compareObjects(a:string[],b:string[])
  {
    for (let i = 0; i < a.length; i++) {
      console.log("Checking :"+a[i]+ " With "+b[i])
      if(a[i] != b[i])
      {
        console.log("Returning false");
        return false;
      }
           }
    return true;
  }


  importObjects()
  {
  //  alert("I am Here2");
    switch(this.model)
    {
      case 'master':
      {
       this.insertProductMasters();
       break;
    }

      case 'location':
        {
        this.insertLocations();       
        break;
        }

        case 'inventory':
          {
          this.insertInventory();       
          break;
          }
  
        default:
          {
          //  this.ngOnDestroy();
          }
    }
  }

  
insertInventory()
  {

    let headerDataFromFile = this.importedData.slice(0,1);
     
    const header: string[] = Object.getOwnPropertyNames(new ProductInventoryImportModel());
         
     if(this.compareObjects(headerDataFromFile[0],header))
     {
     this.importedData = this.importedData.slice(1);

       this.importedItems = this.importedData.map(arr => {
         const obj = {};
         for (let i = 0; i < header.length; i++) {
           const k = header[i];
           obj[k] = arr[i];
         }
         return <ProductInventoryImportModel>obj;
        });
     

        if(this.importedItems.length ==0)
        {
          alert("No values in file");
        }
        else
        {

          let author = this.authService.getLoggedInUserName();


          this.importedItems.forEach(item =>{
    
           let inventory = new ProductInventory();
    
           inventory.checkInType = item.checkInType;
           inventory.checkedIn = true;
           inventory.entryType = "File";
           inventory.locationCode = item.locationCode;
           inventory.masterId = item.masterId;
           inventory.skuId = item.skuId;
           inventory.user = author;
    
           if(this.checkInTypes.indexOf(inventory.checkInType) == -1)
           {
             this.errors.push(new CustomError(inventory.skuId, "No Valid CheckInType","NA"))
           }
           else
           {
            this.productInventoryService.createEntry(inventory)
           .subscribe(data => {
             }, error => {
             console.log(error);
             this.errors.push(new CustomError(inventory.skuId, error.error,error.status))
             });
           }
         });
         this.completedStatus = true;
         this.finalStatus = 'Processing Completed';
        }
   }
   else
   {
     this.errors.push(new CustomError("Entire File", "Invalid File Headers","NA"));
     this.completedStatus = true;
     this.finalStatus = 'Invalid File';
   }
  }

  insertProductMasters()
  {
 //   alert("I am Here3");
    let headerDataFromFile = this.importedData.slice(0,1);
    // console.log(headerData[0].length);
     
     const header: string[] = Object.getOwnPropertyNames(new ProductMasterImportModel());

         
     if(this.compareObjects(headerDataFromFile[0],header))
     {
     this.importedData = this.importedData.slice(1);

       this.importedProducts = this.importedData.map(arr => {
         const obj = {};
         for (let i = 0; i < header.length; i++) {
           const k = header[i];
           obj[k] = arr[i];
         }
         return <ProductMasterImportModel>obj;
        });
     
        if(this.importedProducts.length ==0)
        {
          alert("No values in file");
        }
else{
  this.importedProducts.forEach(item =>{

    let productMaster = new ProductMaster();
    productMaster.active = true;
    productMaster.category = item.category;
    productMaster.description = item.description;
    productMaster.initDate = new Date();
    productMaster.masterId = item.masterId;
    productMaster.name = item.name;
    productMaster.reorderThreshold = item.reorderThreshold;

    if(this.categories.indexOf(productMaster.category) == -1)
    {
      this.errors.push(new CustomError(productMaster.masterId, "No Valid Category","NA"))
    }
    else
    {
     this.productMasterService.createEntry(productMaster)
    .subscribe(data => {
      }, error => {
      console.log(error);
      this.errors.push(new CustomError(productMaster.masterId, error.error,error.status))
      
    });
    }
  });
  this.completedStatus = true;
  this.finalStatus = 'Processing Completed';

}


      
   }
   else
   {
     this.errors.push(new CustomError("Entire File", "Invalid File Headers","NA"));
     this.completedStatus = true;
     this.finalStatus = 'Invalid File';
   }
  }

  insertLocations()
  {
    let headerDataFromFile = this.importedData.slice(0,1);
    // console.log(headerData[0].length);
     
     const header: string[] = Object.getOwnPropertyNames(new LocationMapModel());
       
     if(this.compareObjects(headerDataFromFile[0],header))
     {
     this.importedData = this.importedData.slice(1);

       this.importedLocations = this.importedData.map(arr => {
         const obj = {};
         for (let i = 0; i < header.length; i++) {
           const k = header[i];
           obj[k] = arr[i];
         }
         return <LocationMapModel>obj;
        });
     

        if(this.importedLocations.length ==0)
        {
          alert("No values in file");
        }
        else
        {
          this.importedLocations.forEach(item =>{

          let location = new LocationMap(item.location_Ref1,item.location_Ref2,item.location_Ref3);
            //  location.locationCode = item.locationCode;
            //  location.locationRef_1 = item.location_Ref1;
            //  location.locationRef_2 = item.location_Ref2;
            //  location.locationRef_3 = item.location_Ref3;
     
           
            this.locationService.create(location)
            .subscribe(data => {
              }, error => {
              console.log(error);
              this.errors.push(new CustomError(location.locationCode, error.error,error.status))
              
            });
            
          });
          this.completedStatus = true;
          this.finalStatus = 'Processing Completed';

        }

      
   }
   else
   {
     this.errors.push(new CustomError("Entire File", "Invalid File Headers","NA"));
     this.completedStatus = true;
     this.finalStatus = 'Invalid File';
   }

  }

}

export class CustomError{

  errorKey : string;
  errorDescription:string;
  errorCode: string;

  constructor(errorKey,errorDescription,errorCode)
  {
    this.errorKey = errorKey;
    this.errorDescription = errorDescription;
    this.errorCode = errorCode;

  }

}
  import { Component, OnInit } from '@angular/core';
  import {FormGroup,FormControl,FormBuilder, Validators} from '@angular/forms'; 
  import {AppConstants} from '../../AppConstants';
  import { Router } from '@angular/router';
  import {MatSnackBar} from '@angular/material/snack-bar';
  import { AppParameterService } from '../../services/app-parameter.service';
  import { AppParameterEntry } from '../../models/AppParameterEntry';
  import {MatDialogModule, MatDialogConfig} from '@angular/material/dialog';
  import {MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
  import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { LocationMapService } from 'src/app/services/location-map.service';
import { LocationMap } from 'src/app/models/location-map';
import { AuthService } from 'src/app/services/auth.service';
import { GenerateBarcodeService } from 'src/app/services/generate-barcode.service';
import { GenerateLocCodesComponent } from '../generate-loc-codes/generate-loc-codes.component';
  
  @Component({
    selector: 'app-location-master',
    templateUrl: './location-master.component.html',
    styleUrls: ['./location-master.component.css']
  })
  export class LocationMasterComponent implements OnInit {
  
    createLocationForm:FormGroup;  
    locationMap: LocationMap;
    locations: LocationMap[];
    locations_bk: LocationMap[];
    editMode:Boolean;
    searchString : string;
    createEditMode: boolean = false;
    dataReady:boolean = false
    

    page:number = 1;
    pageSize: number = 10;
    selectedKeys: string[] = new Array();

    locationRef1Const : string;
  locationRef2Const : string;
  locationRef3Const : string;

   constructor(private formbuilder:FormBuilder, private locationService : LocationMapService
    ,private router: Router,private _snackBar: MatSnackBar,private dialog: MatDialog,
    private authService: AuthService, private barcodeService: GenerateBarcodeService)  
     {  

      if(!this.authService.isUserLoggedIn()  )
    {
      this.router.navigate(['login']);
    }

    this.locationRef1Const = this.authService.config.locationRef1;
    this.locationRef2Const = this.authService.config.locationRef2;
    this.locationRef3Const = this.authService.config.locationRef3;


      this.createLocationForm = this.createFormGroup();
     } 
  
  
   ngOnInit() {  
  
     this.locationService.getAll()
        .subscribe(data => {console.log(data); 
        this.locations = data;
        this.locations_bk = data;
        this.dataReady = true;
        }, 
        error => {
          console.log(error)
        this.router.navigateByUrl('error');
        });
    } 
  
  createFormGroup() {
  
      return this.formbuilder.group({
  
       //   locationCode: ['', Validators.required ],
          locationRef_1: ['', Validators.required ],
          locationRef_2: ['', ],
          locationRef_3: ['',  ],
    
      })
    }

   
    onSubmit() {
   
  
    if(this.editMode)
    {
    const updateResult: LocationMap = Object.assign({}, this.createLocationForm.value);
    
    this.locationMap.locationRef_1 = updateResult.locationRef_1;
    this.locationMap.locationRef_2 = updateResult.locationRef_2;
    this.locationMap.locationRef_3 = updateResult.locationRef_3;
    this.locationMap.locationCode = LocationMap.generateLocationCode(updateResult.locationRef_1,updateResult.locationRef_2,updateResult.locationRef_3); 
      
      this.locationService.update(this.locationMap.id,this.locationMap)
      .subscribe(data => {
        console.log(data)
        let snackBarRef = this._snackBar.open("Entry Updated", "OK", {duration: 3000,});
        snackBarRef.onAction().subscribe(() => {
          this._snackBar.dismiss();
        });
      }, error => {
        console.log(error)
        this.router.navigate(['error'], { queryParams: { fromComponent: 'LocationMasterComponent', 
        message: "While loading locations", code:error.status+"_"+error.statusText+"_"+error.message}  });

     // this.router.navigateByUrl('error');
      }
        );
  
        
      this.createLocationForm = this.createFormGroup();
      this.editMode=false;
      this.createEditMode = false;
    }
   
    else{
    console.log(this.createLocationForm.value);
    const result: LocationMap = Object.assign({}, this.createLocationForm.value);
  
    this.locationMap = new LocationMap(result.locationRef_1,result.locationRef_2,result.locationRef_3);
       
    this.locationService.create(this.locationMap)
        .subscribe(data => { console.log(data);
       
          let newEntry = Object.assign(new LocationMap(), data);
          this.locations.push(newEntry);
          newEntry = new LocationMap();
          this.createLocationForm = this.createFormGroup();
          let snackBarRef = this._snackBar.open("Entry Created", "OK", {duration: 3000,});
          snackBarRef.onAction().subscribe(() => {
          this._snackBar.dismiss();
        });

        this.createLocationForm = this.createFormGroup();
        this.editMode=false;
        this.createEditMode = false;

  
        }, error =>{
          console.log(error);
         this.router.navigateByUrl('error');
         
        });
      }
   
      }
   
   
    deleteEntry(entry: LocationMap)
    {
    
      const dialogConfig = new MatDialogConfig();
      const dialogRefLocal = this.dialog.open(ConfirmationDialogComponent,{
        data: {
          message: 'Are you sure, you want to delete?',
          buttonText: {
            ok: 'Yes',
            cancel: 'No'
          }}
       
      });
      
        dialogRefLocal.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
  
          this.locationService.delete(entry.id)
          .subscribe(data => {console.log(data);
    
          this.locations.splice(this.locations.indexOf(entry), 1);
          let snackBarRef = this._snackBar.open("Entry marked for deletion", "OK", {duration: 3000,});
          snackBarRef.onAction().subscribe(() => {
           this._snackBar.dismiss();
          }, error => {
            console.log(error);
            let snackBarRef = this._snackBar.open(error, "OK", {duration: 3000,});
            snackBarRef.onAction().subscribe(() => {
            this._snackBar.dismiss();
            });
          });
  
        
        }, error => {
          console.log(error);
          });
        }
      });
  
     
    }
  
    editEntry(entry: LocationMap)
    {
      this.editMode = true;
      this.createEditMode = true;
      this.createLocationForm = this.formbuilder.group({
  
  
      //  locationCode: entry.locationCode,
        locationRef_1: entry.locationRef_1,
        locationRef_2: entry.locationRef_2,
        locationRef_3: entry.locationRef_3,
  
             
      })
      this.locationMap = entry;
    }
    addButtonSubmit()
    {
    this.createEditMode = true;
    }
    cancelCreateEditMode()
    {
      this.createLocationForm = this.createFormGroup();
      this.createEditMode = false; 
    
    }


    checked(index: number,keyValue: LocationMap,e)
    {
    
    if (e.target.checked) {
  
  
      if(this.selectedKeys.indexOf(keyValue.locationCode) < 0)
           {
          this.selectedKeys.push(keyValue.locationCode);
         
           }
  
    
    }
    // Unchecked
    else
    {
      this.selectedKeys = this.selectedKeys.filter(item => item !== keyValue.locationCode);
     
    }
  }
  
   checkPage(e, page:number)
    {
      
     let startIndex: number = ((page - 1) * (this.pageSize));
     let endIndex: number = startIndex + this.pageSize - 1;
     const check: number = (this.locations.length - 1) - endIndex;
     
     if (check < 0) {
       endIndex = (this.locations.length - 1);
     }
  
     if (e.target.checked) {
         for (let i = startIndex; i <= endIndex; i++) {
  
         if (this.selectedKeys.indexOf(this.locations[i].locationCode) < 0) {
           this.selectedKeys.push(this.locations[i].locationCode);
         }
        
        (<HTMLInputElement>document.getElementById('checkPage_' + page)).checked = true;
       }
  
      
  
     }
     else {
       for (let i = startIndex; i <= endIndex; i++) {
         this.selectedKeys = this.selectedKeys.filter(item => item != this.locations[i].locationCode);
  
        (<HTMLInputElement>document.getElementById('checkPage_' + page)).checked = false;
     
       }
     }

  // // Cosmetics to ensure that the checkboxes are shown as checked
  //     for (let i = 0; i < this.pageSize; i++) {
  //       (<HTMLInputElement>document.getElementById('checkbox_' + i)).checked = e.target.checked;
  //     }
      
  
    }


 isSelected(val: LocationMap)
{
  if(this.selectedKeys.indexOf(val.locationCode) > -1)
  return true;
  else
  return false;
}

emptySelection(){
  this.selectedKeys = new Array();
}

print()
{
  if(this.selectedKeys.length !=0)
  {
    

    this.barcodeService.printBarCodes(this.selectedKeys)
    .subscribe((response) => { 
    
   
         
   var downloadURL = window.URL.createObjectURL(response);
   console.log(downloadURL);
   var link = document.createElement('a');
   console.log(link)
   link.href = downloadURL;
   link.download = "_barcodes.png";
   link.click();

   let snackBarRef = this._snackBar.open("File Downloaded", "Success", {duration: 2000,});
   snackBarRef.onAction().subscribe(() => {
      this._snackBar.dismiss();
     
    });
    this.selectedKeys = new Array();

  }
   
      , error => {
      console.log(error);
      let snackBarRef = this._snackBar.open(error.message, "ERROR", {duration: 2000,});
      snackBarRef.onAction().subscribe(() => {
         this._snackBar.dismiss();
       });
      
    });


  //   this.barcodeService.printLocationBarcodes(this.selectedKeys)
  //     .subscribe(response => { 
  //      this.selectedKeys = new Array();

               
  //  var downloadURL = window.URL.createObjectURL(response);
  //  console.log(downloadURL);
  //  var link = document.createElement('a');
  //  console.log(link)
  //  link.href = downloadURL;
  //  link.download = "LocationCodes.png";
  //  link.click();

  //  let snackBarRef = this._snackBar.open("File Downloaded", "Success", {duration: 2000,});
  //  snackBarRef.onAction().subscribe(() => {
  //     this._snackBar.dismiss();
  //   });
  // }
  //     , error => {
  //     console.log(error);
  //     let snackBarRef = this._snackBar.open(error.message, "ERROR", {duration: 2000,});
  //     snackBarRef.onAction().subscribe(() => {
  //        this._snackBar.dismiss();
  //      });
      
  //   });


}
else
alert("Select Locations to Print Bar Codes");

}
 

onChangePage(currentPage, lastPage) {
  

  console.log(currentPage);
  console.log(lastPage);
  
    //(<HTMLInputElement>document.getElementById('checkPage_' + currentPage)).checked = false;
  // On Page Change ensure checkAll button is checked if all the items are in selected list
     let startIndex: number = ((currentPage - 1) * (this.pageSize));
     let endIndex: number = startIndex + this.pageSize - 1;
     const check: number = (this.locations.length - 1) - endIndex;
     let flag:boolean = true; 
  
     console.log(startIndex);
     console.log(endIndex);
  
  
     if (check < 0) {
       endIndex = (this.locations.length - 1);
     }
     
      for (let i = startIndex; i <= endIndex; i++) {
        if (this.selectedKeys.indexOf(this.locations[i].locationCode) < 0) 
  
        flag = false;
      }
  //console.log((<HTMLInputElement>document.getElementById('checkPage_' + currentPage)));
  //console.log((<HTMLInputElement>document.getElementById('checkPage_' + lastPage)));
  
    (<HTMLInputElement>document.getElementById('checkPage_' + lastPage)).checked = flag; 
    }


    search()
{
 
 this.dataReady = false;
 
 if(this.searchString != null && this.searchString != "")
 {
    this.locationService.searchString(this.searchString)
    .subscribe(data => {console.log(data); 
      if(data != null)
      { 
       this.locations = data;           
      }
      this.page = 1;
     // this.fetchFlag = false;
      this.dataReady = true;
  
     }, error => {
      console.log(error);
      this.router.navigateByUrl('error');
    });

 }
 else
 {
    this.locations = this.locations_bk;
    this.page = 1;
    this.dataReady = true;

 }



} 



}
  
  
  
  
  
  
  
  
   
  
   
   
  
    
  
  
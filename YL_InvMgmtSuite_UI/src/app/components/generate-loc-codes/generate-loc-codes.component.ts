import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ThemeService } from 'ng2-charts';
import { LocationMap } from 'src/app/models/location-map';
import { AuthService } from 'src/app/services/auth.service';
import { GenerateBarcodeService } from 'src/app/services/generate-barcode.service';
import { LocationMapService } from 'src/app/services/location-map.service';

@Component({
  selector: 'app-generate-loc-codes',
  templateUrl: './generate-loc-codes.component.html',
  styleUrls: ['./generate-loc-codes.component.css']
})
export class GenerateLocCodesComponent implements OnInit {

  newEntry: LocationMap = new LocationMap();
  locations : LocationMap[];
  locationRef1Const : string;
  locationRef2Const : string;
  locationRef3Const : string;

  constructor(private barcodeService: GenerateBarcodeService,
    private router: Router,public dialog: MatDialog
    ,private _snackBar: MatSnackBar,
    private activatedRoute :ActivatedRoute,
    private sanitizer : DomSanitizer ,
    private authService : AuthService
    ) { 
    
      

      if(!this.authService.isUserLoggedIn() )
      {
        this.router.navigate(['login']);
      }
      this.locations = new Array();

      this.locationRef1Const = this.authService.config.locationRef1;
      this.locationRef2Const = this.authService.config.locationRef2;
      this.locationRef3Const = this.authService.config.locationRef3;

    }

  ngOnInit(): void {
  }

  addLine()
  {
    if(this.newEntry.locationRef_1 !="" && this.newEntry.locationRef_2 !="" && this.newEntry.locationRef_3 !="")
  {
    this.newEntry = new LocationMap(this.newEntry.locationRef_1,this.newEntry.locationRef_2,this.newEntry.locationRef_3);
    this.locations.push(this.newEntry);
    this.newEntry = new LocationMap();
  }
  }

  submit()
  {
    this.barcodeService.getLocationBarcodes(this.locations)
    .subscribe((response) => { 
     console.log(response);
             
   var downloadURL = window.URL.createObjectURL(response);
   console.log(downloadURL);
   var link = document.createElement('a');
   console.log(link)
   link.href = downloadURL;
   link.download = "LocationBarcodes.png";
   link.click();

   let snackBarRef = this._snackBar.open("File Downloaded", "Success", {duration: 2000,});
   snackBarRef.onAction().subscribe(() => {
      this._snackBar.dismiss();
    });

    this.locations = new Array();
    this.newEntry = new LocationMap();


  }
   
      , error => {
      console.log(error);
      let snackBarRef = this._snackBar.open(error.message, "ERROR", {duration: 2000,});
      snackBarRef.onAction().subscribe(() => {
         this._snackBar.dismiss();
       });
      
    });
}

deleteLine(entry: LocationMap,index: number)
{

  this.locations = this.locations.splice(index);
}

}



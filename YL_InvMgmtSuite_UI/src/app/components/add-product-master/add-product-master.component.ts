import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstants } from 'src/app/AppConstants';
import { ProductMaster } from 'src/app/models/product-master';
import { AppParameterService } from 'src/app/services/app-parameter.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProductMasterService } from 'src/app/services/product-master.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-add-product-master',
  templateUrl: './add-product-master.component.html',
  styleUrls: ['./add-product-master.component.css']
})
export class AddProductMasterComponent implements OnInit {
  objectValues: any;
  appParameterData: any;
  product: ProductMaster;
  categories: String[];
  sub:any;
  viewOperation: string;
  
  
 
  constructor(private productMasterService: ProductMasterService, 
    public dialogRef: MatDialogRef<AddProductMasterComponent>,
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
      
     this.categories = this.authService.getAppParameterData().find(o => o.keyField == 'Product_Categories').options.split(',');
   

      this.viewOperation = data.operation;
      this.product = data.product;

      switch(this.viewOperation) { 
        case 'edit': { 
         this.product = data.product;
           break; 
        } 
        case 'new': { 
         this.product = new ProductMaster();
           break; 
        }
        
        default: { 
          this.dialogRef.close({ responseMessage: "dataIssues", status: 'error' });
           break; 
        } 
     }

    
}

ngOnInit(): void {
  }

submit()
{
 if(this.viewOperation =='new')
 {
  this.productMasterService.createEntry(this.product)
  .subscribe(data => {
    console.log(data); 
    this.product = data;

    let snackBarRef = this._snackBar.open("Created", "OK", {duration: 1000,});
    snackBarRef.onAction().subscribe(() => {
      this._snackBar.dismiss();
    });
    this.dialogRef.close({ responseMessage: this.viewOperation, status: 'success', product:this.product });


  }, error => {
    console.log(error);
    let snackBarRef = this._snackBar.open("Error", error.message, {duration: 1000,});
    snackBarRef.onAction().subscribe(() => {
      this._snackBar.dismiss();
    });

    this.dialogRef.close({ responseMessage: error, status: 'error' });
  });
 }
else{
  
  this.productMasterService.updateEntry(this.product.id,this.product)
  .subscribe(data => {
    console.log(data); 
    this.product = data;

    let snackBarRef = this._snackBar.open("Updated", "OK", {duration: 1000,});
    snackBarRef.onAction().subscribe(() => {
      this._snackBar.dismiss();
    });
    this.dialogRef.close({ responseMessage: this.viewOperation, status: 'success', product:this.product });


  }, error => {
    console.log(error);
    let snackBarRef = this._snackBar.open("Error", error.message, {duration: 1000,});
    snackBarRef.onAction().subscribe(() => {
      this._snackBar.dismiss();
    });

    this.dialogRef.close({ responseMessage: error, status: 'error' });
  });
}
}

cancel()
{
  this.dialogRef.close({ responseMessage: "returned", status: 'success' });
}

delete() {
  if (this.product.id) {
    const dialogConfig = new MatDialogConfig();
    const dialogRefLocal = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure, you want to delete?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
 });
    dialogRefLocal.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.productMasterService.deleteEntry(this.product.id)
          .subscribe(data => {
            let snackBarRef = this._snackBar.open("Entry Deleted", "OK", {duration: 1000,});
            snackBarRef.onAction().subscribe(() => {
              this._snackBar.dismiss();
            });
            this.dialogRef.close({ responseMessage: "deleted", status: this.product.id});

          }, error => console.log(error));
      }
    });
    }
  }


}

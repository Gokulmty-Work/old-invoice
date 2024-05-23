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
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-application-parameters',
  templateUrl: './application-parameters.component.html',
  styleUrls: ['./application-parameters.component.css']
})
export class ApplicationParametersComponent implements OnInit {

  createAppParameterForm:FormGroup;  
  appParameter: AppParameterEntry;
  appParameters: AppParameterEntry[];
  editMode:Boolean;
  searchString : string;
  createEditMode: boolean = false;
  dataReady:boolean = false


 constructor(private formbuilder:FormBuilder, private appParameterService : AppParameterService
  ,private router: Router,private _snackBar: MatSnackBar,private dialog: MatDialog,
  private authService : AuthService)  
   {  
    
    if(!this.authService.isUserLoggedIn() )
    {
      this.router.navigate(['login']);
    }


    this.createAppParameterForm = this.createFormGroup();
   } 


 ngOnInit() {  

  this.appParameterService.getAppParameters().subscribe(data => 
    {
    this.appParameters = data;
    this.dataReady = true;  
  }, error => {
    console.log(error)
   this.router.navigate(['error'], { queryParams: { fromComponent: 'checkOutProduct', 
   message: "While loading App Parameters", code:error.status+"_"+error.statusText+"_"+error.message}  });
  });

    
/*
   this.appParameterService.getAppParameters()
      .subscribe(data => {console.log(data); 
      this.appParameters = data;
      this.dataReady = true;
      }, 
      error => {
        console.log(error)
      this.router.navigateByUrl('error');
      });
  */
  
    } 

createFormGroup() {

    return this.formbuilder.group({

        keyField: ['', Validators.required ],
        options: ['', Validators.required ],
        unit_type: ['', Validators.required ],
        value: ['', Validators.required ],
        

    })
  }
  onSubmit() {
 

  if(this.editMode)
  {
  const updateResult: AppParameterEntry = Object.assign({}, this.createAppParameterForm.value);
  
    this.appParameter.keyField = updateResult.keyField;
    this.appParameter.options = updateResult.options;
    this.appParameter.unit_type = updateResult.unit_type ;
    this.appParameter.value = updateResult.value ;
    
    this.appParameterService.updateAppParameter(this.appParameter.id,this.appParameter)
    .subscribe(data => {
      console.log(data)
      let snackBarRef = this._snackBar.open("Entry Updated", "OK", {duration: 3000,});
      snackBarRef.onAction().subscribe(() => {
        this._snackBar.dismiss();
      });
    }, error => {
      console.log(error)
   // this.router.navigateByUrl('error');
    }
      );

      
    this.createAppParameterForm = this.createFormGroup();
    this.editMode=false;
    this.createEditMode = false;
  }
 
  else{
  
  const result: AppParameterEntry = Object.assign({}, this.createAppParameterForm.value);
  this.appParameter = result;
  this.appParameterService.createAppParameter(this.appParameter)
      .subscribe(data => { console.log(data);
     
        let newEntry = Object.assign(new AppParameterEntry(), data);
        this.appParameters.push(newEntry);
        newEntry = new AppParameterEntry();
         this.createAppParameterForm = this.createFormGroup();
        let snackBarRef = this._snackBar.open("Entry Created", "OK", {duration: 3000,});
      snackBarRef.onAction().subscribe(() => {
        this._snackBar.dismiss();
      });

      }, error =>{
        console.log(error);
       this.router.navigateByUrl('error');
       
      });
    }
 
    }
 
 
  deleteEntry(entry: AppParameterEntry)
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

        this.appParameterService.deleteAppParameter(entry.id)
        .subscribe(data => {console.log(data);
  
        this.appParameters.splice(this.appParameters.indexOf(entry), 1);
        let snackBarRef = this._snackBar.open("Task marked for deletion", "OK", {duration: 3000,});
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

  editEntry(entry: AppParameterEntry)
  {
    this.editMode = true;
    this.createEditMode = true;
    this.createAppParameterForm = this.formbuilder.group({


      keyField: entry.keyField,
      options: entry.options,
      unit_type: entry.unit_type,
      value: entry.value,

      
    })
    this.appParameter = entry;
  }

addButtonSubmit()
{
this.createEditMode = true;
}
cancelCreateEditMode()
{
  this.createAppParameterForm = this.createFormGroup();
  this.createEditMode = false; 

}

}










 

 
 

  


import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder, Validators} from '@angular/forms'; 
import { UserProfile } from '../../models/userProfile';
import { UserService } from '../../services/user.service';
import {AppConstants} from '../../AppConstants';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { resource } from 'selenium-webdriver/http';
import {MatDialogModule, MatDialogConfig} from '@angular/material/dialog';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {


createUserForm:FormGroup;  
user:UserProfile;
users:UserProfile[];
editMode:Boolean;
userRoles:string[];
page:number =1;
pageSize: number = 12;
dataReady: boolean=false;
collectionSize: number;

createEditMode: boolean = false;


createFormGroup() {

    return this.formbuilder.group({
        name: ['', Validators.required ],
        email: ['', Validators.required ],
        role: ['', Validators.required ],
    })
  }
 
constructor(private formbuilder:FormBuilder, private userService :UserService
  ,private router: Router,private _snackBar: MatSnackBar,private dialog: MatDialog,
  private authService : AuthService)  
   {  

    if(!this.authService.isUserLoggedIn() )
    {
      this.router.navigate(['login']);
    }

    this.createUserForm = this.createFormGroup();
    this.userRoles = AppConstants.userRoles;
     }  
     
ngOnInit() {  

   this.userService.getUsersList()
      .subscribe(data => {console.log(data); this.users = data;
      this.dataReady = true}, 
      error => {
        console.log(error)
        this.router.navigate(['error'], { queryParams: { fromComponent: 'ManageUsers', 
        message: "While loading Users", code:error.status+"_"+error.statusText+"_"+error.message}  });

      });

  }  
  
  onSubmit() {
 

  if(this.editMode)
  {
  const updateResult: UserProfile = Object.assign({}, this.createUserForm.value);
  
    this.user.name = updateResult.name;
    this.user.role = updateResult.role;
    this.user.email = updateResult.email.toLowerCase();
   //  this.user.password = updateResult.password;
  
   
      
    this.userService.updateUser(this.user.userId, this.user)
    .subscribe(data => {
      console.log(data)
      let snackBarRef = this._snackBar.open("User Updated", "OK", {duration: 3000,});
      snackBarRef.onAction().subscribe(() => {
        this._snackBar.dismiss();
      });
    }, error => {
      console.log(error)
   // this.router.navigateByUrl('error');
       let snackBarRef = this._snackBar.open(error, "OK", {duration: 3000,});
          snackBarRef.onAction().subscribe(() => {
          this._snackBar.dismiss();
          });
    }
      );
    this.createUserForm = this.createFormGroup();
    this.editMode=false;
    this.createEditMode = false;
    
  }
 
  else{
  
  const result: UserProfile = Object.assign({}, this.createUserForm.value);
  this.user = result;
  this.user.password= AppConstants.defaultPassword;
  this.user.email = this.user.email.toLowerCase();

  this.userService.createUser(this.user)
      .subscribe(data => { console.log(data);
        let newUser = Object.assign(new UserProfile(), data);
        this.users.push(newUser);
        this.createUserForm = this.createFormGroup();
        let snackBarRef = this._snackBar.open("User Created", "OK", {duration: 3000,});
        snackBarRef.onAction().subscribe(() => {
        this._snackBar.dismiss();
      });
      this.createEditMode = false;
      }, error =>{
        console.log(error);
   //    this.router.navigateByUrl('error');
       let snackBarRef = this._snackBar.open(error, "OK", {duration: 3000,});
          snackBarRef.onAction().subscribe(() => {
          this._snackBar.dismiss();
          });
       
      });
    }
 
    }
 
 resetPassword(_user: UserProfile)
 {
  _user.password = AppConstants.defaultPassword;
   this.userService.resetPassword(_user.userId,_user)
    .subscribe(data => {
      console.log(data)
      let snackBarRef = this._snackBar.open("Password Reset Done", "OK", {duration: 3000,});
      snackBarRef.onAction().subscribe(() => {
        this._snackBar.dismiss();
      });
    }, error => {
      console.log(error);
          let snackBarRef = this._snackBar.open(error, "OK", {duration: 3000,});
          snackBarRef.onAction().subscribe(() => {
          this._snackBar.dismiss();
          });
   
    }
      );
 }
 
  deleteUser(user: UserProfile)
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

         this.userService.deleteUser(user.userId)
        .subscribe(data => {console.log(data);
  
         this.users.splice(this.users.indexOf(user), 1);
        let snackBarRef = this._snackBar.open("User marked for deletion", "OK", {duration: 3000,});
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

  editUser(user: UserProfile)
  {
    this.editMode = true;
    this.createEditMode = true;
    this.createUserForm = this.formbuilder.group({
        name: user.name,
        email: user.email,
        role: user.role,
    })
    this.user = user;
  }

  onChangePage(e) {
   
  }

  addButtonSubmit()
    {
    this.createEditMode = true;
    }
    cancelCreateEditMode()
    {
      this.createUserForm = this.createFormGroup();
      this.createEditMode = false; 
    
    }

}

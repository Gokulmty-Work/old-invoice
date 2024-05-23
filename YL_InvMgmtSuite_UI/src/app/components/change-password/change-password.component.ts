import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AppConstants } from '../../AppConstants';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private userService: UserService,private _snackBar: MatSnackBar,
   private authService: AuthService,
   private router: Router ) {

    if(!this.authService.isUserLoggedIn())
    {
      this.router.navigate(['login']);
    }


    }

  ngOnInit(): void {
  }
  user: string;
  id: number;
  change_password: FormGroup = new FormGroup({
    old_password: new FormControl('', [ Validators.required ]),
    new_password: new FormControl('', [Validators.required ]),
    confirm_new_password: new FormControl('', [Validators.required ])
  });
  hideOldPassword = true;
  hideNewPassword = true;
  hideNewConfirmPassword = true;

  get old_passwordInput()  { return this.change_password.get('old_password'); }
  get new_passwordInput()  { return this.change_password.get('new_password');}
  get confirm_new_passwordInput()  { return this.change_password.get('confirm_new_password');}

  changePassword()
  {
    if(this.new_passwordInput.value === this.confirm_new_passwordInput.value)
    {

      
      this.userService.changePassword(this.authService.getLoggedInUserId(),this.old_passwordInput.value,this.new_passwordInput.value)
    .subscribe(data =>{
       console.log(data);
       let snackBarRef = this._snackBar.open("Password Changed", "OK", {duration: 3000,});
       snackBarRef.onAction().subscribe(() => {
        this._snackBar.dismiss();
      });

    }, error => {
      console.log(error)
     let snackBarRef = this._snackBar.open("Sorry !! Errors, try again", "OK", {duration: 3000,});
       snackBarRef.onAction().subscribe(() => {
       this._snackBar.dismiss();
      });
    
  });

    }
    else{
      let snackBarRef = this._snackBar.open("New Password and Confirm Password Doesnt Match", "OK", {duration: 3000,});
       snackBarRef.onAction().subscribe(() => {
       this._snackBar.dismiss();
      });
    }

  }

}


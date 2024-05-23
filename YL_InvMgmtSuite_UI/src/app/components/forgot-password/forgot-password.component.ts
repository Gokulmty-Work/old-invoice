import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {


  email: string;
  responseError: boolean = false;
  responseRecieved: boolean = false;


  ResponseResetForm: FormGroup;
  
  resetToken: null;
  CurrentState: any;
  IsResetFormValid = true;
  msg:boolean = false;

 
  RequestResetForm: FormGroup;
  forbiddenEmails: any;
  message: string;

  IsvalidForm = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    public dialogRef: MatDialogRef<ForgotPasswordComponent>,
    private _snackBar: MatSnackBar
   ) {

  }


  ngOnInit() {

    this.RequestResetForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
    });
  }


  RequestResetUser(form) {
   this.msg = false;
    if (form.valid) {
      this.IsvalidForm = true;
      this.authService.resetPasswordRequest(this.RequestResetForm.value.email).subscribe(
        data => {
          
          this.RequestResetForm.reset();
          this.message = "Reset password link send to email successfully, Please login with the password provided over email";
         
          let snackBarRef = this._snackBar.open(this.message, "OK", {duration: 3000,});
          snackBarRef.onAction().subscribe(() => {
          this._snackBar.dismiss();
           });
          
          this.dialogRef.close();

        },
        err => {
        console.log(err);
        this.RequestResetForm.reset();
            this.msg = true;
            this.message = err.error;
          
        }
      );
    } else {
      this.IsvalidForm = false;
    }
  }


}



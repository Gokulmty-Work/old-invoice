import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AppConstants } from '../../AppConstants';
import { UserProfile } from '../../models/userProfile';
import { UserService } from '../../services/user.service';
import { AppParameterService } from 'src/app/services/app-parameter.service';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password : string;
  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;

  userProfile :UserProfile;
  
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private authenticationService: AuthService, private userService: UserService,
    private appParameterService: AppParameterService) { 
      this.userProfile = new UserProfile;

       if(this.authenticationService.isUserLoggedIn())
      {
        if(this.authenticationService.getLoggedInUserRole() == 'RESOURCE')
        {
        this.router.navigate(['checkout']);
        }
        else
        {
        this.router.navigate(['dashboard']);
        }
      }
      
      }

  ngOnInit() {
    // this.authenticationService.initialCheck()
    // .subscribe(data => {
    //   console.log(data); 
    //   }, 
    //  error => {
    //   console.log(error);
    // });
  }

  handleLogin() {

      this.invalidLogin = false;
      this.loginSuccess = true;
  // Converting email to lower case to ensure we work always with email in lower cases
      this.userProfile.email = this.email.toLowerCase();
      this.userProfile.password = this.password; 
      this.authenticationService.validateProfile(this.userProfile)
      .subscribe(data => {
        console.log(data); 
        this.userProfile = data
        this.successMessage = 'Login Successful';
       

        this.appParameterService.getAppParameters().subscribe(data => 
          {
         this.authenticationService.registerSuccessfulLogin(this.userProfile,data);
          if(this.authenticationService.isUserLoggedIn)
          {
          if(this.authenticationService.getLoggedInUserRole() == 'RESOURCE')
          {
          this.router.navigate(['checkout']);
          }
          else
          {
          this.router.navigate(['dashboard']);
          }}
          }, error => {
          console.log(error)
         this.router.navigate(['error'], { queryParams: { fromComponent: 'checkOutProduct', 
         message: "While loading App Parameters", code:error.status+"_"+error.statusText+"_"+error.message}  });
        });
    

      }, 
      error => {
        console.log(error.errorMessage)
        this.invalidLogin = true;
        this.loginSuccess = false;
      });

    }

    forgotPassword()
    {
      const dialogConfig = new MatDialogConfig();
      const dialogRef = this.dialog.open(ForgotPasswordComponent,{
        height: '80%',
        width:  '80%',
        
      });
  
  
      dialogRef.afterClosed().subscribe(result => {
     console.log(`Dialog result: ${result}`);
      });
     }

    }
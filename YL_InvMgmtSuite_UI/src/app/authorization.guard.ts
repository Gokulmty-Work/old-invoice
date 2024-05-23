import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
  
  constructor(private authService: AuthService,
    private _snackBar: MatSnackBar){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      console.log(next);
      console.log(state);

      let roles = next.data["roles"] as Array<string>;
      console.log(roles);

    if(this.authService.isUserLoggedIn() && roles.indexOf(this.authService.getLoggedInUserRole()) != -1)
     return true;
    else 
    {
      let snackBarRef = this._snackBar.open("Not Authorized To Access", "OK", {duration: 3000,});
      snackBarRef.onAction().subscribe(() => {
      this._snackBar.dismiss();
      return false;
    });  
    }
    
   
  }
  
}

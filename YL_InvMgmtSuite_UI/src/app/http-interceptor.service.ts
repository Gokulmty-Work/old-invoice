import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { AppConstants } from './AppConstants';
import { Router } from '@angular/router';

@Injectable()
export class HttpInterceptorService {

    constructor(private authenticationService: AuthService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
  
   //   if (this.authenticationService.isUserLoggedIn() || req.url.indexOf('basicauth') !== -1) {
        if(true){
                const authReq = req.clone({
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${window.btoa(AppConstants.applicationMachineId + ":" + AppConstants.applicationCredential)}`,
                     })
            });
            return next.handle(authReq);
        } else {
     
        return next.handle(req);
        }
    }
}

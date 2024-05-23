import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,pipe } from 'rxjs';
import {AppConstants} from '../AppConstants';
import { map } from 'rxjs/operators';
import { UserProfile } from '../models/userProfile';
import { UserService } from '../services/user.service';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AppConfiguration } from '../models/app-configuration';

const SETTINGS_LOCATION:string = "assets/appConf/invmgmt.json";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public config:AppConfiguration = new AppConfiguration();
  
 // private baseUrl = AppConstants.servicesURL+'basicauth';
  private baseUrl; 

  constructor(private http: HttpClient) {
//   console.log("Constructor of auth service"); 
//  this.baseUrl = AppConstants.servicesURL+'basicauth';
  }
  
  async load(url:string) { 
  console.log("In Config Service laod function");
  return await new Promise((resolve) => {
    this.http.get(url)
      .subscribe(config => {
        console.log(config);
        Object.assign(this.config,config);
        this.baseUrl = this.config.servicesURL+'basicauth';
        AppConstants.servicesURL = this.config.servicesURL;
        resolve();
      });
});
}


  getSettings(): Observable<any> {
    return this.http.get(SETTINGS_LOCATION)
  }


  resetPasswordRequest(email: String): Observable<any> {
    return this.http.post(`${this.baseUrl}` + `/resetPasswordRequest`, email,
     /*  { headers: { authorization: this.createBasicAuthToken(AppConstants.applicationMachineId, AppConstants.applicationCredential),
          } } */
    );
  }



      initialCheck(): Observable<any> {
      return this.http.get(`${this.baseUrl}` + `/initialCheck`);
    }

    validateProfile(user: UserProfile): Observable<any> {
    return this.http.post(`${this.baseUrl}` + `/validate`, user,
     /*  { headers: { authorization: this.createBasicAuthToken(AppConstants.applicationMachineId, AppConstants.applicationCredential),
          } } */
          );
  }


 /*  authenticationService(machineId: String, credential: String) {
    return this.http.get(`${this.baseUrl}`,
      { headers: 
        { authorization: this.createBasicAuthToken(machineId, credential),
          } })
        .pipe(map((res) => {
        this.machineId = machineId;
        this.password = credential;
        this.registerSuccessfulLogin(res as UserProfile);
      }));
  } */

  createBasicAuthToken(machineId: String, credential: String) {
    return 'Basic ' + window.btoa(machineId + ":" + credential)
  }

  registerSuccessfulLogin(user: UserProfile,appParameterData:any) {
    sessionStorage.setItem(AppConstants.USER_NAME_SESSION_ATTRIBUTE_NAME, user.name);
    sessionStorage.setItem(AppConstants.USER_ROLE_SESSION_ATTRIBUTE_NAME,user.role);
    sessionStorage.setItem(AppConstants.USER_PROFILEID_SESSION_ATTRIBUTE_NAME, String(user.userId));
    sessionStorage.setItem(AppConstants.INVMGMTAPP_PARAMETERS,JSON.stringify(appParameterData))
  }

  logout() {
    sessionStorage.removeItem(AppConstants.USER_NAME_SESSION_ATTRIBUTE_NAME);
    sessionStorage.removeItem(AppConstants.USER_ROLE_SESSION_ATTRIBUTE_NAME);
    sessionStorage.removeItem(AppConstants.USER_PROFILEID_SESSION_ATTRIBUTE_NAME);
    sessionStorage.removeItem(AppConstants.INVMGMTAPP_PARAMETERS);
   
  }

  isUserLoggedIn() {
    let profileId = sessionStorage.getItem(AppConstants.USER_PROFILEID_SESSION_ATTRIBUTE_NAME)
    let appData = sessionStorage.getItem(AppConstants.INVMGMTAPP_PARAMETERS)
    
    if (profileId === null || appData === null ) return false
    return true
  }

  // isAppDataLoaded() {
  //   let appData = AppConstants.appParameterData;
  //   if (appData == null || appData == undefined || appData=="") return false
  //   return true
  // }

  
  getLoggedInUserName() {
    let name = sessionStorage.getItem(AppConstants.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (name === null) return ''
    return name
  }

  getLoggedInUserRole() {
    let name = sessionStorage.getItem(AppConstants.USER_ROLE_SESSION_ATTRIBUTE_NAME)
    if (name === null) return ''
    return name
  }


     getLoggedInUserId() {
    let userId = sessionStorage.getItem(AppConstants.USER_PROFILEID_SESSION_ATTRIBUTE_NAME)
    if (userId === null) return ''
    return userId
  }

  getAppParameterData() {
    let appData = sessionStorage.getItem(AppConstants.INVMGMTAPP_PARAMETERS)
    if (appData === null) return ''
    return JSON.parse(appData);
  }

  setAppParameterData(appParameterData:any) {
    sessionStorage.setItem(AppConstants.INVMGMTAPP_PARAMETERS,JSON.stringify(appParameterData))
    }

  isLoggedUserRoleEqualsResource()
  {
    if(this.getLoggedInUserRole() == 'RESOURCE')
    return true;
    else
    return false;
  }

}

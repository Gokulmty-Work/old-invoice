import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AppConstants} from '../AppConstants';

@Injectable({
  providedIn: 'root'
})
export class AppParameterService {

    private baseUrl = AppConstants.servicesURL+'appParameter';

    constructor(private http: HttpClient) { }

     getAppParameter(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }


  createAppParameter(appParameter: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/create`, appParameter);
  }

   getAppParameters(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

   updateAppParameter(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

 
   deleteAppParameter(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
  }
 

}


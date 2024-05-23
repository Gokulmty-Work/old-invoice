import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AppConstants} from '../AppConstants';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

      private baseUrl = AppConstants.servicesURL+'home';
  
      constructor(private http: HttpClient) { }
  
      getNotifications(): Observable<any> {
      return this.http.get(`${this.baseUrl}/getNotifications`);
      }

      getCounts(): Observable<any> {
        return this.http.get(`${this.baseUrl}/getCounts`);
        }
     
        getCheckOutTypes(): Observable<any> {
          return this.http.get(`${this.baseUrl}/getCheckOutTypes`);
          }
       
          getCheckInTypes(): Observable<any> {
            return this.http.get(`${this.baseUrl}/getCheckInTypes`);
            }
         
            getCheckOutLineGraphData(): Observable<any> {
              return this.http.get(`${this.baseUrl}/getCheckOutLineGraphData`);
              }

              getCheckInLineGraphData(): Observable<any> {
                return this.http.get(`${this.baseUrl}/getCheckInLineGraphData`);
                }
            

  }
  
  
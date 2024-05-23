import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AppConstants} from '../AppConstants';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {
 
      private baseUrl = AppConstants.servicesURL+'transaction';
  
      constructor(private http: HttpClient) { }
  
     getTransactions(startDate: Date, endDate:Date): Observable<any> {
      let params = new HttpParams();
      params = params.append("startDate", startDate.toString());
      params = params.append("endDate", endDate.toString());
      return this.http.get(`${this.baseUrl}/getTransactions`,{params:params});
    }
  
  }
  
  
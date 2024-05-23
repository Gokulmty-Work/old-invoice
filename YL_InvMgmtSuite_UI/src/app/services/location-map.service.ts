
  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import {AppConstants} from '../AppConstants';
import { LocationMap } from '../models/location-map';

@Injectable({
  providedIn: 'root'
})
export class LocationMapService {

      private baseUrl = AppConstants.servicesURL+'location';
  
      constructor(private http: HttpClient) { }
  
       get(id: number): Observable<any> {
      return this.http.get(`${this.baseUrl}/${id}`);
    }
  
    findByLocationCode(locationCode: String): Observable<any> {
      return this.http.get(`${this.baseUrl}/findByLocationCode/${locationCode}`);
    }


    searchString(searchField: string): Observable<any> {
      return this.http.get(`${this.baseUrl}/search/${searchField}`);
  }
      
    create(locationMap: LocationMap): Observable<any> {
      return this.http.post(`${this.baseUrl}` + `/create`, locationMap);
    }
  
     getAll(): Observable<any> {
      return this.http.get(`${this.baseUrl}/`);
    }
  
     update(id: number, value: any): Observable<any> {
      return this.http.put(`${this.baseUrl}/${id}`, value);
    }
  
   
     delete(id: number): Observable<any> {
      return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
    }
   
  
  }
  
  
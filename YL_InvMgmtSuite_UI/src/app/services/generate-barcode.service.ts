
  import { Injectable } from '@angular/core';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import {AppConstants} from '../AppConstants';
import { LocationMap } from '../models/location-map';


@Injectable({
  providedIn: 'root'
})
export class GenerateBarcodeService {

  private baseUrl = AppConstants.servicesURL+'barcode';
  httpHeaders: HttpHeaders | { [header: string]: string | string[]; };
  
  constructor(private http: HttpClient) { }

  getBarcodes(masterId: String,startCount:number,endCount: number):Observable<any>{
        
    return   this.http.get(`${this.baseUrl}/${masterId}/${startCount}/${endCount}`,
{ headers: this.httpHeaders, responseType: 'blob' });
}


printBarCodes(codes: String[]):Observable<any>{
        
  return   this.http.post(`${this.baseUrl}/printLocCodes`, codes,
{ headers: this.httpHeaders, responseType: 'blob' }); }



getLocationBarcodes(locations: LocationMap[]):Observable<any>{
        
  return   this.http.post(`${this.baseUrl}/getLocationCodes`, locations,
{ headers: this.httpHeaders, responseType: 'blob' });
}








}
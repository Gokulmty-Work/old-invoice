import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AppConstants} from '../AppConstants';
import { ProductInventory } from '../models/product-inventory';

@Injectable({
  providedIn: 'root'
})
export class ProductInventoryService {
  
  constructor(private http: HttpClient) { }


private baseUrl = AppConstants.servicesURL+'productInventory';


getPagedList(page:number,size:number): Observable<any> {
  let params = new HttpParams();
  params = params.append("page", page.toFixed());
  params = params.append("size", size.toFixed());
 return this.http.get(`${this.baseUrl}/listPagedEntries`,{params:params});
}

getPagedInventory(page:number,size:number,systemId:number): Observable<any> {
  let params = new HttpParams();
  params = params.append("page", page.toFixed());
  params = params.append("size", size.toFixed());
 return this.http.get(`${this.baseUrl}/listPagedInventory/${systemId}`,{params:params});
}


getAll(): Observable<any> {
  return this.http.get(`${this.baseUrl}/listAll`);
}

getEntry(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/getEntry/${id}`);
}

getEntryBySKUId(skuId: String): Observable<any> {
  return this.http.get(`${this.baseUrl}/getEntryBySKUId/${skuId}`);
}


createEntry(resource: ProductInventory): Observable<any> {
    return this.http.post(`${this.baseUrl}` + `/create`, resource);
}

updateEntry(id: number, value: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, value);
}

checkOut(id: number, value: any): Observable<any> {
  return this.http.put(`${this.baseUrl}/checkOut/${id}`, value);
}


deleteEntry(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/deleteAll`, { responseType: 'text' });
  }

  searchString(searchField: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search/${searchField}`);
}

getInventoryReport(): Observable<any> {
  return this.http.get(`${this.baseUrl}/getInventoryReport`);
}


}

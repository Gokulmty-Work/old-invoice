import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AppConstants} from '../AppConstants';
import { ProductMaster } from '../models/product-master';

@Injectable({
  providedIn: 'root'
})
export class ProductMasterService {
  constructor(private http: HttpClient) { }


private baseUrl = AppConstants.servicesURL+'productMaster';


getPagedList(page:number,size:number): Observable<any> {
  let params = new HttpParams();
  params = params.append("page", page.toFixed());
  params = params.append("size", size.toFixed());
 return this.http.get(`${this.baseUrl}/listPagedEntries`,{params:params});
}

getAllWithoutInventory(): Observable<any> {
  return this.http.get(`${this.baseUrl}/listAll/withoutInventory`);
}

getProductMasterReport(): Observable<any> {
  return this.http.get(`${this.baseUrl}/getProductMasterReport`);
}

getEntry(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/getEntry/${id}`);
}

createEntry(resource: ProductMaster): Observable<any> {
    return this.http.post(`${this.baseUrl}` + `/create`, resource);
}

updateEntry(id: number, value: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, value);
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


}

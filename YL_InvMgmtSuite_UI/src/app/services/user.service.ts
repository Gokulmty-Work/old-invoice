import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../models/userProfile';
import {AppConstants} from '../AppConstants';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
 
 
 private baseUrl = AppConstants.servicesURL+'users'; 
 //private baseUrl = this.config+'users';
 
  constructor(private http: HttpClient,private config: AuthService) { 
 }


  getUser(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createUser(user: UserProfile): Observable<any> {
    return this.http.post(`${this.baseUrl}` + `/create`, user);
  }

  updateUser(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

    resetPassword(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/resetPassword/${id}`, value);
  }

  deleteUser(id: number): Observable<any> {
     return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getUsersList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`);
  }

  changePassword(userId: string, oldPassword: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.baseUrl}` + `/changePassword`, [userId, oldPassword, newPassword]);
  }

}

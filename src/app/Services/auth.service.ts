import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'https://routeegypt.herokuapp.com/'
  constructor(private _HttpClient: HttpClient) { }

  signUp(data: any):Observable<any> {
    return this._HttpClient.post(this.baseUrl + 'signup', data)
  }
  
  signIn(data: any):Observable<any> {
    return this._HttpClient.post(this.baseUrl + 'signin', data)
  }
  
  signOut(data: any):Observable<any> {
    return this._HttpClient.post(this.baseUrl + 'signOut', data)
  }


  isLoggedIn(){
    return !!localStorage.getItem('token')
  }
}

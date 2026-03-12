import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  registerUser(name:string,email:string,password:string){
    const body={name,email,password}
    return this.http.post(`${environment.apiUrl}/auth/register`,body);
  }
  loginUser(email:string,password:string){
    const body={email,password};
    return this.http.post(`${environment.apiUrl}/auth/login`,body);
  }
  logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
  isLoggedIn():boolean{
    if(localStorage.getItem('token')){
      return true
    }
    else{
      return false
    }
  }
  getToken():string|null{
    return localStorage.getItem('token');

  }
}

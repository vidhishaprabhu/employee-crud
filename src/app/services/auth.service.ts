import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logoutTimer: any;

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
  startSessionTimer() {

    const token = this.getToken();

    if (!token) return;

    const decoded: any = jwtDecode(token);

    const expiryTime = decoded.exp * 1000; // convert seconds → ms
    const currentTime = new Date().getTime();

    const timeout = expiryTime - currentTime;

    if (timeout > 0) {

      this.logoutTimer = setTimeout(() => {
        this.logout();
      }, timeout);

    } else {
      this.logout();
    }
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  register(name:string,email:string,password:string){
    const body={name,email,password}
    return this.http.post(`${environment.apiUrl}/auth/register`,body);
  }
  login(email:string,password:string){
    const body={email,password};
    return this.http.post(`${environment.apiUrl}/auth/login`,body);
  }
}

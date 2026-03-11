import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) {}

  getEmployee(){
    return this.http.get(`${environment.apiUrl}`);
  }
  createEmployee(formData:any){
    return this.http.post(`${environment.apiUrl}`,formData)
  }
}

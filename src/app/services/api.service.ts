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
  deleteEmployee(id:string){
    return this.http.delete(`${environment.apiUrl}/${id}`);
  }
  getEmployeeById(id:string){
    return this.http.get(`${environment.apiUrl}/${id}`);
  }
  updateEmployee(id:string,formData:any){
    return this.http.put(`${environment.apiUrl}/${id}`,formData);
  }
}

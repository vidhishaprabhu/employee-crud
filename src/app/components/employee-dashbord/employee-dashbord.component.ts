import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employee-dashbord',
  imports: [DatePipe],
  templateUrl: './employee-dashbord.component.html',
  styleUrl: './employee-dashbord.component.css',
})
export class EmployeeDashbordComponent {
  employee:any=[]
  constructor(private apiService: ApiService) {}
  ngOnInit() {
    this.getEmp();
  }
  getEmp() {
    this.apiService.getEmployee().subscribe((res: any) => {
      if (res) {
        this.employee=res.employee
      } else {
        console.error('There is some error');
      }
    });
  }
}

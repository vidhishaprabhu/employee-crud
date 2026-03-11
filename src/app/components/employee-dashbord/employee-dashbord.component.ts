import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-dashbord',
  imports: [DatePipe,RouterLink],
  templateUrl: './employee-dashbord.component.html',
  styleUrl: './employee-dashbord.component.css',
})
export class EmployeeDashbordComponent {
  employee: any = [];
  selectedEmp:any=null
  constructor(private apiService: ApiService) {
    
  }
  ngOnInit() {
    this.getEmp();
  }
  getEmp() {
    this.apiService.getEmployee().subscribe((res: any) => {
      if (res) {
        this.employee = res.employee;
      } else {
        console.error('There is some error');
      }
    });
  }
  deleteEmp(id: string) {
    this.apiService.deleteEmployee(id).subscribe((res: any) => {
      if (res) {
        alert(res.message);
        this.getEmp();
      } else {
        console.error('There is some error');
      }
    });
  }
  
}

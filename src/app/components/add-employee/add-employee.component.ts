import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  imports: [ReactiveFormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent {
  employeeForm: FormGroup;
  router = inject(Router);
  employee: any = [];
  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
  ) {
    this.employeeForm = fb.group({
      empId: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      department: ['', Validators.required],
      designation: ['', Validators.required],
      salary: ['', Validators.required],
      address: ['', Validators.required],
      joiningDate: ['', Validators.required],
    });
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
  onSubmit() {
    this.apiService
      .createEmployee(this.employeeForm.value)
      .subscribe((res: any) => {
        if (res) {
          alert(res.message);
          this.employeeForm.reset();
          this.router.navigate(['/']);
        } else {
          console.error('There is some error');
        }
      });
  }
}

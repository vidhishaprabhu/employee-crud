import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  imports: [ReactiveFormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent {
  employeeForm: FormGroup;
  selectedEmp: any = null;
  id: string = '';
  isEdit: boolean = false;
  router = inject(Router);
  employee: any = [];
  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
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
    this.id = this.route.snapshot.paramMap.get('id') || '';
    if (this.id) {
      this.isEdit = true;
      this.apiService.getEmployeeById(this.id).subscribe((res: any) => {
        res.employee.joiningDate = this.formatDate(res.employee.joiningDate);
        // console.log(res.employee.joiningDate);
        this.employeeForm.patchValue(res.employee);
      });
    }
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
    if (this.isEdit === true) {
      this.apiService
        .updateEmployee(this.id, this.employeeForm.value)
        .subscribe((res: any) => {
          if (res) {
            alert(res.message);
            this.selectedEmp = null;
            this.router.navigate(['/']);
          } else {
            console.error('There is some error');
          }
        });
    } else {
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
  formatDate(date: any) {
    const d = new Date(date);

    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();

    return `${year}-${month}-${day}`;
  }
}

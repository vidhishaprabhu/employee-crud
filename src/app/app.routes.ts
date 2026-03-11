import { Routes } from '@angular/router';
import { EmployeeDashbordComponent } from './components/employee-dashbord/employee-dashbord.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';

export const routes: Routes = [
  {
    path:'',
    component:EmployeeDashbordComponent
  },
  {
    path:'add-employee',
    component:AddEmployeeComponent
  }
];

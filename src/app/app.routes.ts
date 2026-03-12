import { Routes } from '@angular/router';
import { EmployeeDashbordComponent } from './components/employee-dashbord/employee-dashbord.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  {
    path:'',
    component:EmployeeDashbordComponent
  },
  {
    path:'add-employee',
    component:AddEmployeeComponent
  },
  {
    path:'add-employee/:id',
    component:AddEmployeeComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'login',
    component:LoginComponent
  }
];

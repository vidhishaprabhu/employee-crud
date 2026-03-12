import { Routes } from '@angular/router';
import { EmployeeDashbordComponent } from './components/employee-dashbord/employee-dashbord.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path:'',
    component:EmployeeDashbordComponent,
    canActivate:[authGuard]
  },
  {
    path:'add-employee',
    component:AddEmployeeComponent,
    canActivate:[authGuard]
  },
  {
    path:'add-employee/:id',
    component:AddEmployeeComponent,
    canActivate:[authGuard]
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

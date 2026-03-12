import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  constructor(private authService:AuthService,private fb: FormBuilder,private router:Router) {
    this.registerForm = fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.min(2), Validators.max(8)],
      ],
    });
  }
  register(){
    // console.log(this.registerForm.value);
    this.authService.registerUser(this.registerForm.value.name,this.registerForm.value.email,this.registerForm.value.password).subscribe((res: any) => {
      if (res) {
        alert(res.message);
        this.registerForm.reset();
        this.router.navigateByUrl('/login')
      } else {
        console.error('There is some error');
      }
    });

  }
  
}

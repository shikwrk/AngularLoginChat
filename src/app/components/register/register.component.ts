import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/interfaces/auth';
import { AuthService } from 'src/app/services/auth.service';
import { passwordMatchValidator } from 'src/app/shared/password-match.directive';

import { JwtAuth } from 'src/app/interfaces/jwt-auth';
import { Register } from 'src/app/interfaces/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm = this.fb.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    {
      validators: passwordMatchValidator,
    }
  );

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  get fullName() {
    return this.registerForm.controls['name'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
  toggleConfirmShowPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  Register() {
    const registerDTO: Register = {
      name: this.registerForm.get('name')?.value ?? '',
      email: this.registerForm.get('email')?.value ?? '',
      password: this.registerForm.get('password')?.value ?? '',
    };
    this.authService.registerMember(registerDTO).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: '註冊成功',
          detail: '您已註冊成功!',
        });

        this.router.navigate(['login']);
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: '錯誤',
          detail: '註冊失敗，請重新註冊。',
        });
      }
    );
  }
}

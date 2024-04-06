import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

import { Login } from 'src/app/interfaces/login';
import { JwtAuth } from 'src/app/interfaces/jwt-auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  get email() {
    return this.loginForm.controls['email'];
  }
  get password() {
    return this.loginForm.controls['password'];
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  Login() {
    const loginDTO: Login = {
      email: this.loginForm.get('email')?.value ?? '',
      password: this.loginForm.get('password')?.value ?? '',
    };
    this.authService.loginMember(loginDTO).subscribe({
      next: (jwtDTO: JwtAuth) => {
        sessionStorage.setItem('jwtToken', jwtDTO.Token);
        sessionStorage.setItem('name', jwtDTO.Name);
        sessionStorage.setItem('email', jwtDTO.Email);

        this.messageService.add({
          severity: 'success',
          summary: '成功',
          detail: '登入成功，請選擇聊天室',
        });

        this.router.navigate(['/joinchat']);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: '失敗',
          detail: '登入失敗，修改輸入帳號密碼',
        });
      },
    });
  }
}

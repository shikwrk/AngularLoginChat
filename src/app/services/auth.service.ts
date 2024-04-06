import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/auth';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { Register } from './../interfaces/register';
import { Login } from './../interfaces/login';
import { JwtAuth } from '../interfaces/jwt-auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:5228/api';
  private loginUrl = 'Member/Login';
  private registerUrl = 'Member/Register';

  private loggedIn = new BehaviorSubject<boolean>(false);
  public isLoggedIn = this.loggedIn.asObservable();
  public userName!: string;

  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {}

  registerUser(userDetails: User) {
    return this.http.post(`${this.baseUrl}/users`, userDetails);
  }

  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users?email=${email}`);
  }

  registerMember(user: Register): Observable<JwtAuth> {
    return this.http.post<JwtAuth>(`${this.baseUrl}/${this.registerUrl}`, user);
  }

  loginMember(user: Login): Observable<JwtAuth> {
    return this.http
      .post<JwtAuth>(`${this.baseUrl}/${this.loginUrl}`, user)
      .pipe(
        tap((jwtAuth: JwtAuth) => {
          if (jwtAuth && jwtAuth.Token) {
            sessionStorage.setItem('jwtToken', jwtAuth.Token);
            sessionStorage.setItem('name', jwtAuth.Name);
            sessionStorage.setItem('email', jwtAuth.Email);
            this.loggedIn.next(true);
          }
        })
      );
  }

  logout() {
    sessionStorage.removeItem('jwtToken');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('email');
    this.loggedIn.next(false);
  }

  checkLoginStatus(): void {
    const storedName = sessionStorage.getItem('name');
    this.loggedIn.next(!!storedName);
  }
}

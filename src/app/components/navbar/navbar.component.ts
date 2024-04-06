import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  userName: string | undefined;
  items: MenuItem[] | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      this.userName = sessionStorage.getItem('name') as string;
      this.updateMenuItems();
    });

    // Initialize login status
    this.authService.checkLoginStatus();
  }

  updateMenuItems(): void {
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: '/' },
      ...(this.isLoggedIn
        ? [
            { label: `歡迎, ${this.userName}`, icon: 'pi pi-fw pi-user' },
            {
              label: 'Logout',
              icon: 'pi pi-fw pi-sign-out',
              command: () => this.logout(),
            },
          ]
        : [
            {
              label: 'Login',
              icon: 'pi pi-fw pi-sign-in',
              routerLink: '/login',
            },
          ]),
    ];
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}

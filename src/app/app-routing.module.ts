import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { loggedInAuthGuard, NotloggedInAuthGuard } from './guards/auth.guard';
import { ChatComponent } from './components/chat/chat.component';
import { JoinchatComponent } from './components/joinchat/joinchat.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loggedInAuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [loggedInAuthGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [NotloggedInAuthGuard],
  },
  {
    path: 'joinchat',
    component: JoinchatComponent,
    canActivate: [NotloggedInAuthGuard],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

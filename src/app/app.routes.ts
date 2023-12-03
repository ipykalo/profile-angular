import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RoutesConstant } from './constants/routes.constant';
import { authGuard } from './login/guards/auth.guard';
import { loginGuard } from './login/guards/login.guard';

export const routes: Routes = [
  { path: '', redirectTo: `/${RoutesConstant.Home}`, pathMatch: 'full' },
  {
    path: RoutesConstant.Home,
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: RoutesConstant.LOGIN,
    loadComponent: () =>
      import('./login/login.component').then(c => c.LoginComponent),
    canActivate: [loginGuard],
  },
];

// auth.routes.ts (Lazy Loading with loadComponent)
import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login-page/login-page.component').then(
        (c) => c.LoginPageComponent
      ),
  },
  {
    path: 'Register',
    loadComponent: () =>
      import('./pages/register-page/register-page.component').then(
        (c) => c.RegisterPageComponent
      ),
  },
  {
    path: 'Register/edit/:id',
    loadComponent: () =>
      import('./pages/register-page/register-page.component').then(
        (c) => c.RegisterPageComponent
      ),
  },
  {
    path: 'Forget-password',
    loadComponent: () =>
      import('./pages/forget-password-page/forget-password-page.component').then(
        (c) => c.ForgetPasswordPageComponent
      ),
  },
  {
    path: 'verify',
    loadComponent: () =>
      import('./pages/verify-page/verify-page.component').then(
        (c) => c.VerifyPageComponent
      ),
  },
  {
    path: 'verify-code',
    loadComponent: () =>
      import('./pages/verify-code-page/verify-code-page.component').then(
        (c) => c.VerifyCodePageComponent
      ),
  },
];

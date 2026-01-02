import { Routes } from '@angular/router';

export const BRAND_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/brand-page/brand-page.component').then(
        (m) => m.BrandPageComponent
      ),
  },
];

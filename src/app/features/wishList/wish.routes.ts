import { Routes } from '@angular/router';

export const WISH_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/wish-page/wish-page.component').then(
        (m) => m.WishPageComponent
      ),
  },
];

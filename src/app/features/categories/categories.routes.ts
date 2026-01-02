import { Routes } from '@angular/router';

export const Categories_Routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/categoires-page/categoires-page.component').then(
        (m) => m.CategoiresPageComponent
      ),
  },
];

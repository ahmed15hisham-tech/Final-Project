import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
import { authGuard } from './core/guards/auth-guard';
import { loggedGuard } from './core/guards/logged-guard';

export const routes: Routes = [
  /// auth (lazy)
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [loggedGuard],
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },

  /// user (lazy)
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./features/home/home.routes').then((m) => m.HOME_ROUTES),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./features/products/products.routes').then((m) => m.PRODUCTS_ROUTES),
      },
      {
        path: 'details/:id/:slug',
        loadComponent: () =>
          import('./features/products/pages/products-details/products-details.component').then(
            (c) => c.ProductsDetailsComponent
          ),
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./features/products/pages/products-details/products-details.component').then(
            (c) => c.ProductsDetailsComponent
          ),
      },
      {
        path: 'categoires',
        loadChildren: () =>
          import('./features/categories/categories.routes').then((m) => m.Categories_Routes),
      },
      {
        path: 'brands',
        loadChildren: () =>
          import('./features/brands/brand.routes').then((m) => m.BRAND_ROUTES),
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('./features/cart/cart.routes').then((m) => m.CART_ROUTES),
      },
      {
        path: 'Wish',
        loadChildren: () =>
          import('./features/wishList/wish.routes').then((m) => m.WISH_ROUTES),
      },
      {
        path: 'payment/:cartId',
        loadChildren: () =>
          import('./features/payment/payment.routes').then((m) => m.PAYMENT_ROUTES),
      },
      {
        path: 'allorders',
        loadChildren: () =>
          import('./features/orders/orders.routes').then((m) => m.ORDERS_ROUTES),
      },
    ],
  },

  /// not-found
  {
    path: 'not-found',
    loadComponent: () =>
      import('./features/static-pages/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

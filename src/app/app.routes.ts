import { Routes } from '@angular/router';
import { AuthGuard } from './modules/auth/guards/auth.guards';

export const routes: Routes = [
  // Rutas públicas
  { 
    path: '', 
    loadComponent: () => import('./modules/home/home-page/home-page').then(m => m.HomePageComponent) 
  },
  { 
    path: 'productos', 
    loadComponent: () => import('./modules/products/pages/products-page/products-page').then(m => m.ProductsPageComponent)
  },
  // --- AÑADIMOS LA RUTA QUE FALTABA AQUÍ ---
  { 
    path: 'producto/:id', 
    loadComponent: () => import('./modules/products/pages/product-detail-page/product-detail-page').then(m => m.ProductDetailPageComponent)
  },
  {
    path: 'pedido/:id',
    loadComponent: () => import('./modules/orders/pages/order-confirmation-page/order-confirmation-page').then(m => m.OrderConfirmationPageComponent)
  },
  { 
    path: 'users/login', 
    loadComponent: () => import('./modules/auth/pages/login-page/login-page').then(m => m.LoginPageComponent)
  },
  { 
    path: 'categorias', 
    loadComponent: () => import('./modules/categories/pages/categories-page/categories-page').then(m => m.CategoriesPageComponent)
  },
  { 
    path: 'categoria/:slug', 
    loadComponent: () => import('./modules/products/pages/category-products-page/category-products-page').then(m => m.CategoryProductsPageComponent)
  },

  // Rutas protegidas por el AuthGuard
  { 
    path: 'user/carrito', 
    loadComponent: () => import('./modules/cart/pages/cart-page/cart-page').then(m => m.CartPageComponent) 
  },
  { 
    path: 'users/profile', 
    canActivate: [AuthGuard],
    loadComponent: () => import('./modules/auth/pages/profile-page/profile-page').then(m => m.ProfilePageComponent) 
  },
  { 
    path: 'checkout', 
    canActivate: [AuthGuard],
    loadComponent: () => import('./modules/checkout/pages/checkout-page/checkout-page').then(m => m.CheckoutPageComponent)
  },

  // Redirección para rutas no encontradas
  { path: '**', redirectTo: '' }
];
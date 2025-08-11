import { RenderMode, ServerRoute } from '@angular/ssr';

// Definimos todas las rutas que conoce nuestra aplicación
export const serverRoutes: ServerRoute[] = [
  // Rutas estáticas para pre-renderizar
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'productos', renderMode: RenderMode.Prerender },
  { path: 'categorias', renderMode: RenderMode.Prerender },
  { path: 'users/login', renderMode: RenderMode.Prerender },
  
  // Rutas dinámicas y protegidas para renderizar en el servidor (SSR)
  { path: 'producto/:id', renderMode: RenderMode.Server },
  { path: 'categoria/:slug', renderMode: RenderMode.Server },
  { path: 'user/carrito', renderMode: RenderMode.Server },
  { path: 'users/profile', renderMode: RenderMode.Server },
  { path: 'checkout', renderMode: RenderMode.Server },
  { path: 'pedido/:id', renderMode: RenderMode.Server }, // ¡No te olvides de la página de confirmación de pedido!

  // La ruta comodín (wildcard) también debe ser manejada por el servidor
  { path: '**', renderMode: RenderMode.Server },
];
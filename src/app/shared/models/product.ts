// Modelo para los productos, adaptado de tu tipo 'Product'.
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  listPrice?: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  rating: number;
  stock: number;
}

// Interfaz para la respuesta de la API de DummyJSON
export interface DummyProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
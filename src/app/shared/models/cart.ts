// Modelos para el carrito de compras.
export interface CartItem {
  productId: string;
  qty: number;
  priceSnapshot: number;
  nameSnapshot: string;
  thumbnailSnapshot: string;
}

export interface Cart {
  items: CartItem[];
  currency: "USD";
}
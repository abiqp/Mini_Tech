import { CartItem } from "./cart";

export type OrderStatus = "created" | "paid" | "cancelled";

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  taxes: number;
  total: number;
  createdAt: string;
  status: OrderStatus;
}
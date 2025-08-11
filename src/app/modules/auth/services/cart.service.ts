import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart, CartItem } from '../../../shared/models/cart';
import { Product } from '../../../shared/models/product';

const IVA_RATE = 0.12;

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject: BehaviorSubject<Cart>;
  public cart$: Observable<Cart>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    let initialCart: Cart = { items: [], currency: 'USD' };
    if (isPlatformBrowser(this.platformId)) {
      const cartJson = localStorage.getItem('cart');
      if (cartJson) {
        initialCart = JSON.parse(cartJson);
      }
    }
    this.cartSubject = new BehaviorSubject<Cart>(initialCart);
    this.cart$ = this.cartSubject.asObservable();
  }

  private saveCart(cart: Cart) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
    this.cartSubject.next(cart);
  }

  addToCart(product: Product, qty = 1) {
    const cart = { ...this.cartSubject.value };
    const itemInCart = cart.items.find(item => item.productId === product.id);

    if (itemInCart) {
      itemInCart.qty += qty;
    } else {
      const newItem: CartItem = {
        productId: product.id, qty, priceSnapshot: product.price,
        nameSnapshot: product.name, thumbnailSnapshot: product.thumbnail,
      };
      cart.items.push(newItem);
    }
    this.saveCart(cart);
  }

  setQty(productId: string, qty: number) {
    const cart = { ...this.cartSubject.value };
    const item = cart.items.find(i => i.productId === productId);
    if (item) {
      item.qty = qty > 0 ? qty : 1;
    }
    this.saveCart(cart);
  }

  removeFromCart(productId: string) {
    let cart = { ...this.cartSubject.value };
    cart.items = cart.items.filter(i => i.productId !== productId);
    this.saveCart(cart);
  }

  clearCart() {
    const newCart: Cart = { items: [], currency: 'USD' };
    this.saveCart(newCart);
  }

  getSubtotal(): number {
    return this.cartSubject.value.items.reduce((acc, item) => acc + item.priceSnapshot * item.qty, 0);
  }

  getTaxes(): number {
    return this.getSubtotal() * IVA_RATE;
  }

  getTotal(): number {
    return this.getSubtotal() + this.getTaxes();
  }

  public get cartValue(): Cart {
  return this.cartSubject.value;
}
}


import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { cartItem, Product } from '../models/cart.model'; // <-- CartItem con C mayúscula

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: cartItem[] = [];
  
  // BehaviorSubject almacena el valor actual y lo emite inmediatamente a nuevos suscriptores
  private cartSubject = new BehaviorSubject<cartItem[]>([]);
  
  // Observable público expuesto para lectura
  public cart$: Observable<cartItem[]> = this.cartSubject.asObservable();

  constructor() {}

  getCartItems(): cartItem[] {
    return [...this.cartItems];
  }

  addToCart(product: Product, quantity: number = 1): void {
    const existingIndex = this.cartItems.findIndex(item => item.product.id === product.id);

    if (existingIndex > -1) {
      this.cartItems[existingIndex].quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity });
    }

    this.notifyChanges();
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const item = this.cartItems.find(i => i.product.id === productId);
    if (item) {
      item.quantity = quantity;
      this.notifyChanges();
    }
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    this.notifyChanges();
  }

  clearCart(): void {
    this.cartItems = [];
    this.notifyChanges();
  }

  private notifyChanges(): void {
    // Emitimos una copia inmutable del arreglo para reactivar la detección de cambios
    this.cartSubject.next([...this.cartItems]);
  }
}
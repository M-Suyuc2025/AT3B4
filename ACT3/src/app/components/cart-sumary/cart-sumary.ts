import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { cartItem } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';
import { SubtotalPipe } from '../../pipes/subtotal-pipe';
import { CartTotalPipe } from '../../pipes/cart-total-pipe';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [CommonModule, AsyncPipe, SubtotalPipe, CartTotalPipe],
  template: `
    <div class="cart-container" *ngIf="cart$ | async as cartItems">
      <h2>Resumen del Carrito ({{ cartItems.length }} tipos de producto)</h2>

      <div *ngIf="cartItems.length === 0" class="empty-cart">
        <p>El carrito está vacío. Agrega productos desde el catálogo.</p>
      </div>

      <div *ngIf="cartItems.length > 0">
        <table class="cart-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio Unit.</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of cartItems">
              <td>{{ item.product.name }}</td>
              <td>{{ item.product.price | currency:'USD':'symbol':'1.2-2' }}</td>
              <td>
                <input 
                  type="number" 
                  min="1" 
                  [value]="item.quantity" 
                  (change)="onQuantityChange(item.product.id, $event)"
                  class="qty-input"
                />
              </td>
              <td class="font-bold">
                {{ item.product.price | subtotal:item.quantity | currency:'USD':'symbol':'1.2-2' }}
              </td>
              <td>
                <button (click)="removeItem(item.product.id)" class="btn-delete">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="cart-summary-footer">
          <button (click)="clearCart()" class="btn-clear">Vaciar Carrito</button>
          
          <div class="total-box">
            <span>Total a Pagar: </span>
            <strong>{{ cartItems | cartTotal | currency:'USD':'symbol':'1.2-2' }}</strong>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cart-container { padding: 1rem; border: 1px solid #ddd; border-radius: 8px; background-color: #fafafa; }
    .cart-table { width: 100%; border-collapse: collapse; margin-bottom: 1rem; }
    .cart-table th, .cart-table td { padding: 0.75rem; border-bottom: 1px solid #ddd; text-align: left; }
    .qty-input { width: 60px; padding: 0.25rem; }
    .font-bold { font-weight: bold; }
    .btn-delete { background-color: #e74c3c; color: white; border: none; padding: 0.25rem 0.5rem; border-radius: 4px; cursor: pointer; }
    .btn-clear { background-color: #7f8c8d; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; }
    .cart-summary-footer { display: flex; justify-content: space-between; align-items: center; }
    .total-box { font-size: 1.25rem; background: #e8f8f5; padding: 0.75rem; border-radius: 6px; border: 1px solid #a3e4d7; }
    .empty-cart { text-align: center; color: #7f8c8d; padding: 2rem 0; }
  `]
})
export class CartSummaryComponent {
  private cartService = inject(CartService);
  public cart$: Observable<cartItem[]> = this.cartService.cart$;

  onQuantityChange(productId: number, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const newQuantity = Number(inputElement.value);
    this.cartService.updateQuantity(productId, newQuantity);
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}
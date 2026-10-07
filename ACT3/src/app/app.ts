import { Component } from '@angular/core';
import { ProductListComponent } from './components/product-list/product-list';
import { CartSummaryComponent } from './components/cart-sumary/cart-sumary';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductListComponent, CartSummaryComponent],
  template: `
    <div style="max-width: 1000px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
      <h1 style="text-align: center; color: #2c3e50;">🛒 Tienda en Línea Angular</h1>
      <hr style="margin-bottom: 20px;" />
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <app-product-list></app-product-list>
        <app-cart-summary></app-cart-summary>
      </div>
    </div>
  `
})
export class AppComponent {
  title = 'shopping-cart';
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="product-catalog">
      <h2>Catálogo de Productos</h2>
      <div class="product-grid">
        <div *ngFor="let product of products" class="product-card">
          <h3>{{ product.name }}</h3>
          <p class="price">{{ product.price | currency:'USD':'symbol':'1.2-2' }}</p>
          <button type="button" (click)="onAddToCart(product)" class="btn-add">
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .product-catalog { padding: 1rem; }
    .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; }
    .product-card { border: 1px solid #e0e0e0; border-radius: 8px; padding: 1rem; text-align: center; background: #ffffff; }
    .price { font-weight: bold; color: #2c3e50; font-size: 1.1rem; }
    .btn-add { background-color: #27ae60; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; }
    .btn-add:hover { background-color: #219150; }
  `]
})
export class ProductListComponent {
  products: Product[] = [
    { id: 1, name: 'Teclado Mecánico RGB', price: 85.50 },
    { id: 2, name: 'Mouse Inalámbrico Ergonómico', price: 42.00 },
    { id: 3, name: 'Monitor 24" Full HD', price: 175.99 },
    { id: 4, name: 'Audífonos Bluetooth', price: 65.00 }
  ];

  constructor(private cartService: CartService) {}

  onAddToCart(product: Product): void {
    console.log('✅ Botón presionado. Enviando producto al servicio:', product);
    this.cartService.addToCart(product);
  }
}
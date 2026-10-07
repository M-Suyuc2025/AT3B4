import { Pipe, PipeTransform } from '@angular/core';
import { cartItem } from '../models/cart.model';

@Pipe({
  name: 'cartTotal',
  standalone: true
})
export class CartTotalPipe implements PipeTransform {
  transform(items: cartItem[] | null): number {
    if (!items || items.length === 0) {
      return 0;
    }
    return items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  }
}
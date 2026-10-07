import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subtotal',
  standalone: true
})
export class SubtotalPipe implements PipeTransform {
  transform(price: number, quantity: number): number {
    if (!price || !quantity || quantity < 0) {
      return 0;
    }
    return price * quantity;
  }
}
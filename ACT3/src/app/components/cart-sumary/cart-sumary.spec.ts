import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartSumary } from './cart-sumary';

describe('CartSumary', () => {
  let component: CartSumary;
  let fixture: ComponentFixture<CartSumary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartSumary]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CartSumary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

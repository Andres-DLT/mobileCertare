import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService, CartItem } from '../cart.service';
import { PaypalService } from '../paypal.service';
import { OrderEmailService } from '../order-email.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})

export class CartComponent implements OnInit, AfterViewInit {
  cartItems: CartItem[] = [];
  paymentSuccess = false;
  paymentError = '';
  payerName = '';
  showPaypal = false;

  constructor(
    private cartService: CartService,
    private paypalService: PaypalService,
    private orderEmailService: OrderEmailService
  ) {}

  ngOnInit() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  ngAfterViewInit() {}

  get totalProducts(): number {
    return this.cartService.getTotalUnits();
  }

  get totalCost(): number {
    return this.cartService.getTotalCost();
  }

  removeUnit(item: CartItem) {
    this.cartService.removeUnit(item);
  }

  addUnit(item: CartItem) {
    this.cartService.addUnit(item);
  }

  initPayment() {
    if (this.cartItems.length === 0) return;
    this.showPaypal = true;
    this.paymentSuccess = false;
    this.paymentError = '';

    setTimeout(() => {
      this.paypalService.renderButtons(
        'paypal-button-container',
        this.cartItems,
        this.totalCost,
        (details) => {
          this.payerName = details.payer.name.given_name;
          this.paymentSuccess = true;
          this.showPaypal = false;
          const orderItems = this.cartItems;
          const orderTotal = this.totalCost;
          this.cartService.clearCart();
          this.orderEmailService
            .sendOrderEmail(details, orderItems, orderTotal)
            .catch((err) => {
              console.warn('Order email not sent:', err);
            });
        },
        (err) => {
          this.paymentError = 'Error processing payment. Please try again.';
          console.error('PayPal error:', err);
        }
      );
    });
  }
}
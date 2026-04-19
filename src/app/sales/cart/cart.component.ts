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
  sendingEmail = false;

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

  /** Muestra la sección de PayPal y renderiza los botones */
  initPayment() {
    if (this.cartItems.length === 0) return;
    this.showPaypal = true;
    this.paymentSuccess = false;
    this.paymentError = '';

    // Esperar al siguiente tick para que el div exista en el DOM
    setTimeout(() => {
      this.paypalService.renderButtons(
        'paypal-button-container',
        this.cartItems,
        this.totalCost,
        async (details) => {
          this.payerName = details.payer.name.given_name;
          this.paymentSuccess = true;
          this.showPaypal = false;

          // Enviar correo con los detalles del pedido
          this.sendingEmail = true;
          try {
            await this.orderEmailService.sendOrderEmail(
              details,
              this.cartItems,
              this.totalCost
            );
          } catch (emailErr) {
            console.error('Error sending order email:', emailErr);
          } finally {
            this.sendingEmail = false;
          }

          this.cartService.clearCart();
        },
        (err) => {
          this.paymentError = 'Error processing payment. Please try again.';
          console.error('PayPal error:', err);
        }
      );
    });
  }
}

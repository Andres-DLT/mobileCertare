import { Injectable } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { CartItem } from './cart.service';

export interface OrderEmailData {
  orderId: string;
  payerName: string;
  payerEmail: string;
  items: {
    name: string;
    units: number;
    unitPrice: number;
    subtotal: number;
  }[];
  totalProducts: number;
  totalAmount: number;
  paymentDate: string;
  currency: string;
}

@Injectable({ providedIn: 'root' })
export class OrderEmailService {

  constructor(private functions: Functions) {}

  /**
   * Envía los detalles del pedido al dueño de la tienda vía Cloud Function.
   */
  async sendOrderEmail(
    paymentDetails: any,
    cartItems: CartItem[],
    totalAmount: number
  ): Promise<void> {
    const orderData: OrderEmailData = {
      orderId: paymentDetails.id,
      payerName: `${paymentDetails.payer.name.given_name} ${paymentDetails.payer.name.surname}`,
      payerEmail: paymentDetails.payer.email_address,
      items: cartItems.map(item => ({
        name: item.title,
        units: item.units,
        unitPrice: item.price,
        subtotal: item.price * item.units
      })),
      totalProducts: cartItems.reduce((sum, i) => sum + i.units, 0),
      totalAmount,
      currency: 'MXN',
      paymentDate: new Date().toLocaleString('en-US', {
        dateStyle: 'full',
        timeStyle: 'short'
      })
    };

    const sendEmail = httpsCallable(this.functions, 'sendOrderEmail');
    await sendEmail(orderData);
  }
}

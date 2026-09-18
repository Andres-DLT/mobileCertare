import { Injectable } from '@angular/core';
import { CartItem } from './cart.service';

declare var paypal: any;

@Injectable({ providedIn: 'root' })
export class PaypalService {

  /**
   * Renderiza los botones de PayPal dentro del contenedor indicado.
   * @param containerId  - ID del div donde se montarán los botones
   * @param items        - Artículos del carrito
   * @param totalAmount  - Monto total a cobrar
   * @param onSuccess    - Callback cuando el pago se completa
   * @param onError      - Callback cuando hay un error
   */
  renderButtons(
    containerId: string,
    items: CartItem[],
    totalAmount: number,
    onSuccess: (details: any) => void,
    onError: (err: any) => void
  ): void {
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = '';
    }

    paypal.Buttons({
      style: {
        layout: 'vertical',
        color: 'blue',
        shape: 'rect',
        label: 'paypal'
      },

      // 1. Crear la orden en PayPal
      createOrder: (_data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            description: 'Certare - Compra',
            amount: {
              currency_code: 'MXN',
              value: totalAmount.toFixed(2),
              breakdown: {
                item_total: {
                  currency_code: 'MXN',
                  value: totalAmount.toFixed(2)
                }
              }
            },
            items: items.map(item => ({
              name: item.title,
              unit_amount: {
                currency_code: 'MXN',
                value: item.price.toFixed(2)
              },
              quantity: String(item.units)
            }))
          }]
        });
      },

      // 2. Capturar el pago cuando el usuario lo aprueba
      onApprove: (_data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          onSuccess(details);
        });
      },

      // 3. Manejar errores
      onError: (err: any) => {
        onError(err);
      }
    }).render('#' + containerId);
  }
}

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CartItem } from './cart.service';

@Injectable({ providedIn: 'root' })
export class PaypalService {
  private sdkLoaded = false;
  private sdkFailed = false;

  /** Indica si los pagos están habilitados (flag para desactivar sin romper). */
  isEnabled(): boolean {
    return !!environment.paymentsEnabled && !!environment.paypalClientId;
  }

  private loadSdk(): Promise<boolean> {
    if (this.sdkLoaded) return Promise.resolve(true);
    if (this.sdkFailed) return Promise.resolve(false);
    if (!this.isEnabled()) return Promise.resolve(false);
    if (typeof (window as unknown as { paypal?: unknown }).paypal !== 'undefined') {
      this.sdkLoaded = true;
      return Promise.resolve(true);
    }
    return new Promise((resolve) => {
      const s = document.createElement('script');
      s.src = `https://www.paypal.com/sdk/js?client-id=${environment.paypalClientId}&currency=MXN`;
      s.async = true;
      s.onload = () => {
        this.sdkLoaded = true;
        resolve(true);
      };
      s.onerror = (e) => {
        console.warn('[PayPal] SDK no se pudo cargar (pagos desactivados):', e);
        this.sdkFailed = true;
        resolve(false);
      };
      document.head.appendChild(s);
    });
  }

  /**
   * Renderiza los botones de PayPal dentro del contenedor indicado.
   * Si los pagos están desactivados, llama onError con mensaje controlado.
   */
  renderButtons(
    containerId: string,
    items: CartItem[],
    totalAmount: number,
    onSuccess: (details: unknown) => void,
    onError: (err: unknown) => void
  ): void {
    if (!this.isEnabled()) {
      onError(new Error('Pagos desactivados temporalmente.'));
      return;
    }
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = '';
    }

    this.loadSdk().then((ok) => {
      if (!ok) {
        onError(new Error('PayPal SDK no disponible.'));
        return;
      }
      const pp = (window as unknown as { paypal?: any }).paypal;
      if (!pp?.Buttons) {
        onError(new Error('PayPal SDK incompleto.'));
        return;
      }
      pp.Buttons({
        style: {
          layout: 'vertical',
          color: 'blue',
          shape: 'rect',
          label: 'paypal'
        },

        // 1. Crear la orden en PayPal
        createOrder: (_data: unknown, actions: any) => {
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
                  value: (item.price ?? 0).toFixed(2)
                },
                quantity: String(item.units)
              }))
            }]
          });
        },

        // 2. Capturar el pago cuando el usuario lo aprueba
        onApprove: (_data: unknown, actions: any) => {
          return actions.order.capture().then((details: unknown) => {
            onSuccess(details);
          });
        },

        // 3. Manejar errores
        onError: (err: unknown) => {
          onError(err);
        }
      }).render('#' + containerId);
    });
  }
}

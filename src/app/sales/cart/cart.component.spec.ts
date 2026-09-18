import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CartComponent } from './cart.component';
import { CartService, CartItem } from '../cart.service';
import { PaypalService } from '../paypal.service';
import { OrderEmailService } from '../order-email.service';
import { BehaviorSubject } from 'rxjs';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartServiceSpy: jasmine.SpyObj<CartService>;
  let paypalServiceSpy: jasmine.SpyObj<PaypalService>;
  let orderEmailServiceSpy: jasmine.SpyObj<OrderEmailService>;
  let mockItems$: BehaviorSubject<CartItem[]>;

  const mockCartItems: CartItem[] = [
    {
      id: '1', title: 'Red Hoodie', price: 45.00,
      description: '', 'image-front': '', 'image-back': '',
      price_s: 30, price_m: 45, price_l: 60,
      size_s: 'S', size_m: 'M', size_l: 'L', size: 'M', units: 2
    },
    {
      id: '2', title: 'Black Cap', price: 15.00,
      description: '', 'image-front': '', 'image-back': '',
      price_s: 15, price_m: 20, price_l: 25,
      size_s: 'S', size_m: 'M', size_l: '', size: 'S', units: 1
    }
  ];

  beforeEach(async () => {
    mockItems$ = new BehaviorSubject<CartItem[]>([]);

    cartServiceSpy = jasmine.createSpyObj('CartService', [
      'getCartItems', 'addUnit', 'removeUnit', 'clearCart',
      'getTotalUnits', 'getTotalCost'
    ]);
    cartServiceSpy.getCartItems.and.returnValue(mockItems$.asObservable());
    cartServiceSpy.getTotalUnits.and.returnValue(0);
    cartServiceSpy.getTotalCost.and.returnValue(0);

    paypalServiceSpy = jasmine.createSpyObj('PaypalService', ['renderButtons']);
    orderEmailServiceSpy = jasmine.createSpyObj('OrderEmailService', ['sendOrderEmail']);
    orderEmailServiceSpy.sendOrderEmail.and.returnValue(Promise.resolve());

    await TestBed.configureTestingModule({
      imports: [CartComponent, RouterTestingModule]
    })
    .overrideComponent(CartComponent, {
      set: {
        providers: [
          { provide: CartService, useValue: cartServiceSpy },
          { provide: PaypalService, useValue: paypalServiceSpy },
          { provide: OrderEmailService, useValue: orderEmailServiceSpy },
        ]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to cart items on init', () => {
    expect(cartServiceSpy.getCartItems).toHaveBeenCalled();
  });

  it('should update cartItems when service emits', () => {
    mockItems$.next(mockCartItems);
    expect(component.cartItems.length).toBe(2);
  });

  it('should not init payment when cart is empty', () => {
    component.cartItems = [];
    component.initPayment();
    expect(component.showPaypal).toBeFalse();
    expect(paypalServiceSpy.renderButtons).not.toHaveBeenCalled();
  });

  it('should show PayPal section when initPayment is called with items', fakeAsync(() => {
    component.cartItems = mockCartItems;
    component.initPayment();
    expect(component.showPaypal).toBeTrue();
    tick();
    expect(paypalServiceSpy.renderButtons).toHaveBeenCalledTimes(1);
  }));

  it('should pass correct container ID to PayPal renderButtons', fakeAsync(() => {
    component.cartItems = mockCartItems;
    component.initPayment();
    tick();
    const callArgs = paypalServiceSpy.renderButtons.calls.first().args;
    expect(callArgs[0]).toBe('paypal-button-container');
  }));

  it('should set paymentSuccess and payerName on successful payment', fakeAsync(() => {
    component.cartItems = mockCartItems;
    paypalServiceSpy.renderButtons.and.callFake(
      (_id: string, _items: any, _total: number, onSuccess: Function) => {
        onSuccess({
          id: 'PAY-TEST',
          payer: { name: { given_name: 'Maria', surname: 'L' }, email_address: 'a@b.com' }
        });
      }
    );

    component.initPayment();
    tick();
    tick();

    expect(component.paymentSuccess).toBeTrue();
    expect(component.payerName).toBe('Maria');
    expect(component.showPaypal).toBeFalse();
  }));

  it('should clear cart after successful payment and email', fakeAsync(() => {
    component.cartItems = mockCartItems;
    paypalServiceSpy.renderButtons.and.callFake(
      (_id: string, _items: any, _total: number, onSuccess: Function) => {
        onSuccess({
          id: 'PAY-TEST',
          payer: { name: { given_name: 'A', surname: 'B' }, email_address: 'a@b.com' }
        });
      }
    );

    component.initPayment();
    tick();
    tick();

    expect(cartServiceSpy.clearCart).toHaveBeenCalled();
  }));

  it('should attempt to send the order email after successful payment', fakeAsync(() => {
    component.cartItems = mockCartItems;
    paypalServiceSpy.renderButtons.and.callFake(
      (_id: string, _items: any, _total: number, onSuccess: Function) => {
        onSuccess({
          id: 'PAY-TEST',
          payer: { name: { given_name: 'A', surname: 'B' }, email_address: 'a@b.com' }
        });
      }
    );

    component.initPayment();
    tick();
    tick();

    expect(orderEmailServiceSpy.sendOrderEmail).toHaveBeenCalledTimes(1);
    const args = orderEmailServiceSpy.sendOrderEmail.calls.mostRecent().args;
    expect(args[1]).toEqual(mockCartItems);
  }));

  it('should set paymentError on PayPal error', fakeAsync(() => {
    component.cartItems = mockCartItems;
    paypalServiceSpy.renderButtons.and.callFake(
      (_id: string, _items: any, _total: number, _onSuccess: Function, onError: Function) => {
        onError(new Error('PayPal failed'));
      }
    );

    component.initPayment();
    tick();

    expect(component.paymentError).toBe('Error processing payment. Please try again.');
  }));

  it('should call removeUnit on cart service', () => {
    const item = mockCartItems[0];
    component.removeUnit(item);
    expect(cartServiceSpy.removeUnit).toHaveBeenCalledWith(item);
  });

  it('should call addUnit on cart service', () => {
    const item = mockCartItems[0];
    component.addUnit(item);
    expect(cartServiceSpy.addUnit).toHaveBeenCalledWith(item);
  });
});


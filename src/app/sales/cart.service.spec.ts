import { CartService } from './cart.service';
import { Product } from '../products/product-services';

describe('CartService', () => {
  const product: Product = {
    id: '1', title: 'API Testing', description: '', price: 100,
    category: 'api', 'image-front': '', 'image-back': ''
  };

  it('keeps undo snapshots independent from subsequent quantity changes', () => {
    const cart = new CartService();
    cart.addToCart(product);
    const saved = cart.snapshot();
    cart.addToCart(product);
    cart.addUnit(saved[0]);
    expect(saved[0].units).toBe(1);
    cart.restore(saved);
    cart.removeUnit(saved[0]);
    expect(saved[0].units).toBe(1);
    expect(cart.getTotalUnits()).toBe(0);
  });

  it('keeps different document IDs separate and calculates their total', () => {
    const cart = new CartService();
    cart.addToCart(product);
    cart.addToCart({ ...product, id: '2', price: 200 });
    expect(cart.snapshot().length).toBe(2);
    expect(cart.getTotalUnits()).toBe(2);
    expect(cart.getTotalCost()).toBe(300);
  });
});

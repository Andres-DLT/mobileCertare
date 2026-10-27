import { CartService } from './cart.service';
import { CatalogItem } from '../products/product-services';

describe('CartService', () => {
  const product: CatalogItem = {
    id: '1', title: 'API Testing', description: '', price: 100,
    group: 'api', sector: 'testing', sectorLabel: 'Testing'
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

  it('keeps the same document ID in different sectors separate', () => {
    const cart = new CartService();
    const mobile = { ...product, id: 'discovery-scoping', sector: 'mobile' as const, price: 100 };
    const web = { ...mobile, sector: 'web' as const, price: 200 };
    cart.addToCart(mobile);
    cart.addToCart(web);
    expect(cart.snapshot().length).toBe(2);
    expect(cart.getTotalCost()).toBe(300);
    cart.addUnit({ ...web, units: 1 });
    cart.removeUnit({ ...mobile, units: 1 });
    expect(cart.snapshot().map(item => [item.sector, item.units])).toEqual([['web', 2]]);
  });

});

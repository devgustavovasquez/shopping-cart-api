import { CartItem, CartItemProps } from '../../src/domain/entities/cart-item';
import { makeProduct } from './product-factory';

export function makeCartItem(override: Partial<CartItemProps> = {}) {
  return new CartItem({
    product: makeProduct(),
    quantity: 10,
    ...override,
  });
}

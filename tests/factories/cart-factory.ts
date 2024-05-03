import { Cart, CartProps } from '../../src/entities/cart';

export function makeCart(override: Partial<CartProps> = {}) {
  return new Cart({
    id: 1,
    userId: 1,
    items: [],
    ...override,
  });
}

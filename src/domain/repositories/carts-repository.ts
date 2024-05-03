import { Cart } from '../entities/cart';

export abstract class CartsRepository {
  abstract create(raw: Cart): Promise<Cart>;
  abstract findByUserId(userId: number): Promise<Cart | null>;
  abstract save(cart: Cart): Promise<void>;
}

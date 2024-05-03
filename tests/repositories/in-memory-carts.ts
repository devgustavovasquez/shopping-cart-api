import { Cart } from '../../src/entities/cart';
import { CartsRepository } from '../../src/repositories/carts-repository';

export class InMemoryCartsRepository implements CartsRepository {
  public items: Cart[] = [];

  async findById(id: number): Promise<Cart | null> {
    const cart = this.items.find((item) => item.id === id);

    return cart || null;
  }

  async create(raw: Cart): Promise<Cart> {
    const cart = new Cart({
      id: this.items.length + 1,
      userId: raw.userId,
      items: raw.items,
    });

    this.items.push(cart);

    return cart;
  }

  async findByUserId(userId: number): Promise<Cart | null> {
    const cart = this.items.find((item) => item.userId === userId);

    return cart || null;
  }
}

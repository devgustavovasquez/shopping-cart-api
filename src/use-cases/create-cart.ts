import { Cart } from '../entities/cart';
import { CartItem } from '../entities/cart-item';
import { CartsRepository } from '../repositories/carts-repository';
import { ProductsRepository } from '../repositories/products-repository';
import { UsersRepository } from '../repositories/users-repository';

type CreateCartRequest = {
  userId: number;
  items: { productId: number; quantity: number }[];
};

type CreateCartResponse = {
  cart: Cart;
};

export class CreateCartUseCase {
  constructor(
    private readonly cartsRepository: CartsRepository,
    private readonly productsRepository: ProductsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(request: CreateCartRequest): Promise<CreateCartResponse> {
    const { userId, items } = request;

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const cartAlreadyExists = await this.cartsRepository.findByUserId(userId);

    if (cartAlreadyExists) {
      throw new Error('Cart already exists');
    }

    const products = await this.productsRepository.findByIdRange(
      items.map((item) => item.productId),
    );

    const cartItems = items.map((item) => {
      const product = products.find((product) => product.id === item.productId);

      if (!product) {
        throw new Error(`Product ${item.productId} not found`);
      }

      return new CartItem({
        product,
        quantity: item.quantity,
      });
    });

    const rawCart = new Cart({
      id: 0,
      userId,
      items: [],
    });

    for (const item of cartItems) {
      // TODO: improve this
      rawCart.addItem(item);
    }

    const cart = await this.cartsRepository.create(rawCart);

    for (const item of cart.items) {
      // TODO: improve this
      await this.productsRepository.save(item.product);
    }

    return { cart };
  }
}

import { Cart } from '../entities/cart';
import { CartItem } from '../entities/cart-item';
import { CartsRepository } from '../repositories/carts-repository';
import { ProductsRepository } from '../repositories/products-repository';
import { UsersRepository } from '../repositories/users-repository';

type UpdateCartRequest = {
  userId: number;
  items: { productId: number; quantity: number }[];
};

type UpdateCartResponse = {
  cart: Cart;
};

export class UpdateCartUseCase {
  constructor(
    private readonly cartsRepository: CartsRepository,
    private readonly productsRepository: ProductsRepository,
    private readonly usersRepository: UsersRepository
  ) {}

  async execute(request: UpdateCartRequest): Promise<UpdateCartResponse> {
    const { userId, items } = request;

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }
    
    const cart = await this.cartsRepository.findByUserId(userId);

    if (!cart) {
      throw new Error('Cart not found');  
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

    
    for (const item of cartItems) {
      // TODO: improve this
      cart.addItem(item);
    }

    await this.cartsRepository.save(cart);

    for (const item of cart.items) {
      // TODO: improve this
      await this.productsRepository.save(item.product);
    }

    return { cart };
  }
}

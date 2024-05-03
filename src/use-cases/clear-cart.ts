import { CartsRepository } from '../repositories/carts-repository';
import { ProductsRepository } from '../repositories/products-repository';
import { UsersRepository } from '../repositories/users-repository';

type ClearCartRequest = {
  userId: number;
};

type ClearCartResponse = Record<string, never>;

export class ClearCartUseCase {
  constructor(
    private readonly cartsRepository: CartsRepository,
    private readonly productsRepository: ProductsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(request: ClearCartRequest): Promise<ClearCartResponse> {
    const { userId } = request;

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const cart = await this.cartsRepository.findByUserId(userId);

    if (!cart) {
      throw new Error('Cart not found');
    }

    const products = await this.productsRepository.findByIdRange(
      cart.items.map((item) => item.product.id),
    );

    cart.items.forEach(async (item) => {
      const product = products.find(
        (product) => product.id === item.product.id,
      );

      if (!product) {
        return;
      }

      // TODO: improve this
      product.stock = product.stock + item.quantity;
      await this.productsRepository.save(product);
    });

    cart.clearCart();

    await this.cartsRepository.save(cart);

    return {};
  }
}

import { Cart } from '../entities/cart';
import { User } from '../entities/user';
import { CartsRepository } from '../repositories/carts-repository';
import { UsersRepository } from '../repositories/users-repository';

type ConfirmPurchaseRequest = {
  userId: number;
};

type ConfirmPurchaseResponse = {
  cart: Cart;
  user: User;
  totalCost: number;
};

export class ConfirmPurchaseUseCase {
  constructor(
    private readonly cartsRepository: CartsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(
    request: ConfirmPurchaseRequest,
  ): Promise<ConfirmPurchaseResponse> {
    const { userId } = request;

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const cart = await this.cartsRepository.findByUserId(userId);

    if (!cart) {
      throw new Error('Cart not found');
    }

    return {
      cart,
      user,
      totalCost: cart.calculateTotalCost(),
    };
  }
}

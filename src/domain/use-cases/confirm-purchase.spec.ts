import { makeCart } from '../../../tests/factories/cart-factory';
import { makeCartItem } from '../../../tests/factories/cart-item-factory';
import { makeProduct } from '../../../tests/factories/product-factory';
import { makeUser } from '../../../tests/factories/user-factory';
import { InMemoryCartsRepository } from '../../../tests/repositories/in-memory-carts';
import { InMemoryProductsRepository } from '../../../tests/repositories/in-memory-products';
import { InMemoryUsersRepository } from '../../../tests/repositories/in-memory-users';
import { ConfirmPurchaseUseCase } from './confirm-purchase';

let sut: ConfirmPurchaseUseCase;

let cartsRepository: InMemoryCartsRepository;
let productsRepository: InMemoryProductsRepository;
let usersRepository: InMemoryUsersRepository;

describe('ConfirmPurchase Use Case', () => {
  beforeEach(() => {
    cartsRepository = new InMemoryCartsRepository();
    productsRepository = new InMemoryProductsRepository();
    usersRepository = new InMemoryUsersRepository();
    sut = new ConfirmPurchaseUseCase(cartsRepository, usersRepository);
  });

  it('should be able to confirm a purchase', async () => {
    const user = makeUser();
    const product = makeProduct({ price: 100, stock: 50 });
    const cartItem = makeCartItem({ product, quantity: 5 });
    const cart = makeCart({ userId: user.id, items: [cartItem] });

    await usersRepository.create(user);
    await productsRepository.create(product);
    await cartsRepository.create(cart);

    const response = await sut.execute({ userId: user.id });

    expect(response).toBeTruthy();
    expect(response.cart).toEqual(cart);
    expect(response.user).toEqual(user);
    expect(response.totalCost).toBe(500);
  });

  it('should not be able to confirm a purchase if user not exists', async () => {
    const promise = sut.execute({ userId: 1 });

    expect(promise).rejects.toThrow();
  });

  it('should not be able to confirm a purchase if cart not exists', async () => {
    const user = makeUser();

    await usersRepository.create(user);

    const promise = sut.execute({ userId: user.id });

    expect(promise).rejects.toThrow();
  });
});

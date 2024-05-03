import { makeCart } from '../../../tests/factories/cart-factory';
import { makeCartItem } from '../../../tests/factories/cart-item-factory';
import { makeProduct } from '../../../tests/factories/product-factory';
import { makeUser } from '../../../tests/factories/user-factory';
import { InMemoryCartsRepository } from '../../../tests/repositories/in-memory-carts';
import { InMemoryProductsRepository } from '../../../tests/repositories/in-memory-products';
import { InMemoryUsersRepository } from '../../../tests/repositories/in-memory-users';
import { ClearCartUseCase } from './clear-cart';

let sut: ClearCartUseCase;

let cartsRepository: InMemoryCartsRepository;
let productsRepository: InMemoryProductsRepository;
let usersRepository: InMemoryUsersRepository;

describe('ClearCart Use Case', () => {
  beforeEach(() => {
    cartsRepository = new InMemoryCartsRepository();
    productsRepository = new InMemoryProductsRepository();
    usersRepository = new InMemoryUsersRepository();
    sut = new ClearCartUseCase(
      cartsRepository,
      productsRepository,
      usersRepository,
    );
  });

  it('should be able to clear a cart', async () => {
    const user = makeUser();
    const product = makeProduct({ stock: 50 });
    const cartItem = makeCartItem({ product, quantity: 5 });
    const cart = makeCart({ userId: user.id, items: [cartItem] });

    await usersRepository.create(user);
    await productsRepository.create(product);
    await cartsRepository.create(cart);

    await sut.execute({ userId: user.id });

    expect(cartsRepository.items[0].items).toHaveLength(0);
  });

  it('should not be able to clear a cart if user not exists', async () => {
    const product = makeProduct({ stock: 50 });
    const cartItem = makeCartItem({ product, quantity: 5 });
    const cart = makeCart({ userId: 1, items: [cartItem] });

    await productsRepository.create(product);
    await cartsRepository.create(cart);

    const promise = sut.execute({
      userId: 2,
    });

    expect(promise).rejects.toThrow();
  });

  it('should not be able to clear a cart if cart not exists', async () => {
    const user = makeUser();

    await usersRepository.create(user);

    const promise = sut.execute({
      userId: user.id,
    });

    expect(promise).rejects.toThrow();
  });
});

import { makeProduct } from '../../../tests/factories/product-factory';
import { makeUser } from '../../../tests/factories/user-factory';
import { InMemoryCartsRepository } from '../../../tests/repositories/in-memory-carts';
import { InMemoryProductsRepository } from '../../../tests/repositories/in-memory-products';
import { InMemoryUsersRepository } from '../../../tests/repositories/in-memory-users';
import { CreateCartUseCase } from './create-cart';

let sut: CreateCartUseCase;

let cartsRepository: InMemoryCartsRepository;
let productsRepository: InMemoryProductsRepository;
let usersRepository: InMemoryUsersRepository;

describe('CreateCart Use Case', () => {
  beforeEach(() => {
    cartsRepository = new InMemoryCartsRepository();
    productsRepository = new InMemoryProductsRepository();
    usersRepository = new InMemoryUsersRepository();
    sut = new CreateCartUseCase(
      cartsRepository,
      productsRepository,
      usersRepository,
    );
  });

  it('should be able to create a cart', async () => {
    const user = makeUser();
    const product = makeProduct({ stock: 50 });

    await usersRepository.create(user);
    await productsRepository.create(product);

    const { cart } = await sut.execute({
      userId: user.id,
      items: [{ productId: product.id, quantity: 5 }],
    });

    expect(cartsRepository.items).toHaveLength(1);
    expect(cartsRepository.items[0]).toEqual(cart);
    expect(productsRepository.items[0].stock).toBe(45);
  });

  it('should not be able to create a cart if user not exists', async () => {
    const product = makeProduct({ stock: 50 });

    await productsRepository.create(product);

    const promise = sut.execute({
      userId: 1,
      items: [{ productId: product.id, quantity: 5 }],
    });

    expect(promise).rejects.toThrow();
  });

  it('should not be able to create a cart if user already has a cart', async () => {
    const user = makeUser();
    const product = makeProduct({ stock: 50 });

    await usersRepository.create(user);
    await productsRepository.create(product);

    await sut.execute({
      userId: user.id,
      items: [{ productId: product.id, quantity: 5 }],
    });

    const promise = sut.execute({
      userId: user.id,
      items: [{ productId: product.id, quantity: 5 }],
    });

    expect(promise).rejects.toThrow();
  });

  it('should not be able to create a cart if product not exists', async () => {
    const user = makeUser();

    await usersRepository.create(user);

    const promise = sut.execute({
      userId: user.id,
      items: [{ productId: 1, quantity: 5 }],
    });

    expect(promise).rejects.toThrow();
  });
});

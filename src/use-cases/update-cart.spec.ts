import { makeCart } from '../../tests/factories/cart-factory';
import { makeCartItem } from '../../tests/factories/cart-item-factory';
import { makeProduct } from '../../tests/factories/product-factory';
import { makeUser } from '../../tests/factories/user-factory';
import { InMemoryCartsRepository } from '../../tests/repositories/in-memory-carts';
import { InMemoryProductsRepository } from '../../tests/repositories/in-memory-products';
import { InMemoryUsersRepository } from '../../tests/repositories/in-memory-users';
import { UpdateCartUseCase } from './update-cart';

let sut: UpdateCartUseCase;

let cartsRepository: InMemoryCartsRepository;
let productsRepository: InMemoryProductsRepository;
let usersRepository: InMemoryUsersRepository;

describe('UpdateCart Use Case', () => {
  beforeEach(() => {
    cartsRepository = new InMemoryCartsRepository();
    productsRepository = new InMemoryProductsRepository();
    usersRepository = new InMemoryUsersRepository();
    sut = new UpdateCartUseCase(
      cartsRepository,
      productsRepository,
      usersRepository,
    );
  });

  it('should be able to update a cart', async () => {
    const user = makeUser();
    const product = makeProduct({ stock: 50 });
    const otherProduct = makeProduct({ stock: 50 });
    const cartItem = makeCartItem({ product, quantity: 5 });
    const cart = makeCart({ userId: user.id, items: [cartItem] });

    await usersRepository.create(user);
    await productsRepository.create(product);
    await cartsRepository.create(cart);

    const { cart: updatedCart } = await sut.execute({
      userId: user.id,
      items: [{ productId: otherProduct.id, quantity: 40 }],
    });

    expect(cartsRepository.items).toHaveLength(1);
    expect(cartsRepository.items[0]).toEqual(updatedCart);
    expect(productsRepository.items[0].stock).toBe(10);
  });

  it('should not be able to update a cart if user not exists', async () => {
    const product = makeProduct({ stock: 50 });
    const cartItem = makeCartItem({ product, quantity: 5 });
    const cart = makeCart({ userId: 1, items: [cartItem] });

    await productsRepository.create(product);
    await cartsRepository.create(cart);

    const promise = sut.execute({
      userId: 2,
      items: [{ productId: product.id, quantity: 40 }],
    });

    expect(promise).rejects.toThrow();
  });

  it('should not be able to update a cart if product not exists', async () => {
    const user = makeUser();

    const cartItem = makeCartItem({
      product: makeProduct({ stock: 50 }),
      quantity: 5,
    });
    const cart = makeCart({ userId: user.id, items: [cartItem] });

    await usersRepository.create(user);
    await cartsRepository.create(cart);

    const promise = sut.execute({
      userId: user.id,
      items: [{ productId: 1, quantity: 40 }],
    });

    expect(promise).rejects.toThrow();
  });
});

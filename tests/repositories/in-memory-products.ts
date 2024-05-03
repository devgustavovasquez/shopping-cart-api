import { Product } from '../../src/entities/product';
import { Name } from '../../src/entities/value-objects/name';
import { ProductsRepository } from '../../src/repositories/products-repository';

export class InMemoryProductsRepository implements ProductsRepository {
  public items: Product[] = [];

  async findByIdRange(ids: number[]): Promise<Product[]> {
    const products = this.items.filter((item) => ids.includes(item.id));

    return products;
  }

  async create(raw: Product): Promise<Product> {
    const product = new Product({
      id: this.items.length + 1,
      name: new Name(raw.name),
      price: raw.price,
      stock: raw.stock,
    });

    this.items.push(product);

    return product;
  }

  async save(product: Product): Promise<void> {
    const index = this.items.findIndex((item) => item.id === product.id);

    this.items[index] = product;
  }
}

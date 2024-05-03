import { Product } from '../entities/product';

export abstract class ProductsRepository {
  abstract create(raw: Product): Promise<Product>;
  abstract findByIdRange(ids: number[]): Promise<Product[]>;
  abstract save(product: Product): Promise<void>;
}

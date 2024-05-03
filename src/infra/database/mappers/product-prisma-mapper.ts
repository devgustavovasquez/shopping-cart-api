import { Produto } from '@prisma/client';

import { Product } from '../../../domain/entities/product';
import { Name } from '../../../domain/entities/value-objects/name';

export class ProductPrismaMapper {
  static toPrisma(product: Product): Produto {
    return {
      id: product.id,
      nome: product.name,
      estoque: product.stock,
      preco: product.price,
    };
  }

  static toDomain(raw: Produto): Product {
    return new Product({
      id: raw.id,
      name: new Name(raw.nome),
      stock: raw.estoque,
      price: raw.preco,
    });
  }
}

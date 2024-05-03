import { PrismaClient } from '@prisma/client';

import { Product } from '../../../domain/entities/product';
import { ProductsRepository } from '../../../domain/repositories/products-repository';
import { ProductPrismaMapper } from '../mappers/product-prisma-mapper';

export class ProductsPrismaRepository implements ProductsRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(): Promise<Product> {
    throw new Error('Method not implemented.');
  }

  async findByIdRange(ids: number[]): Promise<Product[]> {
    const products = await this.prisma.produto.findMany({
      where: { id: { in: ids } },
    });

    if (!products) return [];

    return products.map(ProductPrismaMapper.toDomain);
  }

  async save(product: Product): Promise<void> {
    const data = ProductPrismaMapper.toPrisma(product);

    await this.prisma.produto.update({
      where: { id: product.id },
      data,
    });
  }
}

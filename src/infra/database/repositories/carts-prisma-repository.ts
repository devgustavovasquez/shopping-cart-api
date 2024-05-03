import { PrismaClient } from '@prisma/client';

import { Cart } from '../../../domain/entities/cart';
import { CartsRepository } from '../../../domain/repositories/carts-repository';
import { CartPrismaMapper } from '../mappers/cart-prisma-mapper';

export class CartsPrismaRepository implements CartsRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(raw: Cart): Promise<Cart> {
    const data = CartPrismaMapper.toPrismaCreate(raw);

    const cart = await this.prisma.carrinho.create({
      data,
      include: { CarrinhoItem: { include: { Produto: true } } },
    });

    return CartPrismaMapper.toDomain(cart);
  }

  async findByUserId(userId: number): Promise<Cart | null> {
    const cart = await this.prisma.carrinho.findFirst({
      where: { id: userId },
      include: {
        CarrinhoItem: {
          include: { Produto: true },
        },
      },
    });

    if (!cart) return null;

    return CartPrismaMapper.toDomain(cart);
  }

  async save(raw: Cart): Promise<void> {
    const data = CartPrismaMapper.toPrismaUpdate(raw);

    await this.prisma.carrinho.update({
      where: { id: raw.id },
      data,
    });
  }
}

import { Prisma } from '@prisma/client';

import { Cart } from '../../../domain/entities/cart';
import { CartItem } from '../../../domain/entities/cart-item';
import { Product } from '../../../domain/entities/product';
import { Name } from '../../../domain/entities/value-objects/name';

type CarrinhoPrisma = {
  CarrinhoItem: ({
    Produto: {
      id: number;
      nome: string;
      preco: number;
      estoque: number;
    };
  } & {
    id: number;
    carrinho_id: number;
    produto_id: number;
    quantidade: number;
  })[];
} & {
  id: number;
  usuario_id: number;
};

export class CartPrismaMapper {
  static toPrismaCreate(cart: Cart): Prisma.CarrinhoCreateInput {
    return {
      usuario_id: cart.userId,
      CarrinhoItem: {
        createMany: {
          data: cart.items.map((item) => ({
            carrinho_id: cart.id,
            produto_id: item.product.id,
            quantidade: item.quantity,
          })),
        },
      },
    };
  }

  static toPrismaUpdate(cart: Cart): Prisma.CarrinhoUpdateInput {
    return {
      usuario_id: cart.userId,
      CarrinhoItem: {
        updateMany: {
          data: cart.items.map((item) => ({
            carrinho_id: cart.id,
            produtos_id: item.product.id,
            quantidade: item.quantity,
          })),
          where: {
            carrinho_id: cart.id,
          },
        },
      },
    };
  }

  static toDomain(raw: CarrinhoPrisma): Cart {
    return new Cart({
      id: raw.id,
      userId: raw.usuario_id,
      items: raw.CarrinhoItem.map((item) => {
        return new CartItem({
          quantity: item.quantidade,
          product: new Product({
            id: item.Produto.id,
            name: new Name(item.Produto.nome),
            stock: item.Produto.estoque,
            price: item.Produto.preco,
          }),
        });
      }),
    });
  }
}

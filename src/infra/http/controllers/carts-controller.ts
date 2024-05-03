import { Request, Response } from 'express';

import { CartsRepository } from '../../../domain/repositories/carts-repository';
import { ProductsRepository } from '../../../domain/repositories/products-repository';
import { UsersRepository } from '../../../domain/repositories/users-repository';
import { ClearCartUseCase } from '../../../domain/use-cases/clear-cart';
import { ConfirmPurchaseUseCase } from '../../../domain/use-cases/confirm-purchase';
import { CreateCartUseCase } from '../../../domain/use-cases/create-cart';
import { UpdateCartUseCase } from '../../../domain/use-cases/update-cart';
import { Database } from '../../database';
import { CartsPrismaRepository } from '../../database/repositories/carts-prisma-repository';
import { ProductsPrismaRepository } from '../../database/repositories/products-prisma-repository';
import { UsersPrismaRepository } from '../../database/repositories/users-prisma-repository';

export class CartsController {
  private readonly cartsRepository: CartsRepository;
  private readonly productsRepository: ProductsRepository;
  private readonly usersRepository: UsersRepository;

  constructor(private readonly database: Database) {
    this.cartsRepository = new CartsPrismaRepository(database);
    this.productsRepository = new ProductsPrismaRepository(database);
    this.usersRepository = new UsersPrismaRepository(database);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const useCase = new CreateCartUseCase(
      this.cartsRepository,
      this.productsRepository,
      this.usersRepository,
    );

    try {
      const request = req.body;

      const result = await useCase.execute(request);

      return res.status(201).send(result);
    } catch (error) {
      return res.status(500).send();
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const useCase = new UpdateCartUseCase(
      this.cartsRepository,
      this.productsRepository,
      this.usersRepository,
    );

    try {
      const request = req.body;

      const result = await useCase.execute(request);

      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send();
    }
  }

  public async confirmPurchase(req: Request, res: Response): Promise<Response> {
    const useCase = new ConfirmPurchaseUseCase(
      this.cartsRepository,
      this.usersRepository,
    );

    try {
      const request = req.body;

      const result = await useCase.execute(request);

      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send();
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const useCase = new ClearCartUseCase(
      this.cartsRepository,
      this.productsRepository,
      this.usersRepository,
    );

    try {
      const request = req.body;

      const result = await useCase.execute(request);

      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send();
    }
  }
}

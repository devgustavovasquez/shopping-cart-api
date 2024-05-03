import { PrismaClient } from '@prisma/client';

import { User } from '../../../domain/entities/user';
import { UsersRepository } from '../../../domain/repositories/users-repository';
import { UserPrismaMapper } from '../mappers/user-prisma-mapper';

export class UsersPrismaRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(raw: User): Promise<User> {
    const data = UserPrismaMapper.toPrisma(raw);

    const user = await this.prisma.usuario.create({ data });

    return UserPrismaMapper.toDomain(user);
  }

  async findById(id: number): Promise<User | null> {
    const user = await this.prisma.usuario.findUnique({ where: { id } });

    if (!user) {
      return null;
    }

    return UserPrismaMapper.toDomain(user);
  }
}

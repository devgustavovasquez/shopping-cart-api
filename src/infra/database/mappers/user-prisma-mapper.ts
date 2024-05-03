import { Usuario } from '@prisma/client';

import { User } from '../../../domain/entities/user';
import { Email } from '../../../domain/entities/value-objects/email';
import { Name } from '../../../domain/entities/value-objects/name';

export class UserPrismaMapper {
  static toPrisma(user: User): Usuario {
    return {
      id: user.id,
      nome: user.name,
      email: user.email,
      senha: user.password,
    };
  }

  static toDomain(raw: Usuario): User {
    return new User({
      id: raw.id,
      name: new Name(raw.nome),
      email: new Email(raw.email),
      password: raw.senha,
    });
  }
}

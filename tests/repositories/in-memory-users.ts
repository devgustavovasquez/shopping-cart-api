import { User } from '../../src/domain/entities/user';
import { Email } from '../../src/domain/entities/value-objects/email';
import { Name } from '../../src/domain/entities/value-objects/name';
import { UsersRepository } from '../../src/domain/repositories/users-repository';

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async findById(id: number): Promise<User | null> {
    const user = this.items.find((item) => item.id === id);

    return user || null;
  }

  async create(raw: User): Promise<User> {
    const user = new User({
      id: this.items.length + 1,
      name: new Name(raw.name),
      email: new Email(raw.email),
      password: raw.password,
    });

    this.items.push(user);

    return user;
  }
}

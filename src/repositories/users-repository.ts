import { User } from '../entities/user';

export abstract class UsersRepository {
  abstract create(raw: User): Promise<User>;
  abstract findById(id: number): Promise<User | null>;
}

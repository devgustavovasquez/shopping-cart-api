import { User, UserProps } from '../../src/domain/entities/user';
import { Email } from '../../src/domain/entities/value-objects/email';
import { Name } from '../../src/domain/entities/value-objects/name';

export function makeUser(override: Partial<UserProps> = {}) {
  return new User({
    id: 1,
    name: new Name('User 1'),
    email: new Email('user@example.com'),
    password: '123456',
    ...override,
  });
}

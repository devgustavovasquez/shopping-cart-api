import { User, UserProps } from '../../src/entities/user';
import { Email } from '../../src/entities/value-objects/email';
import { Name } from '../../src/entities/value-objects/name';

export function makeUser(override: Partial<UserProps> = {}) {
  return new User({
    id: 1,
    name: new Name('User 1'),
    email: new Email('user@example.com'),
    password: '123456',
    ...override,
  });
}

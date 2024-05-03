import { Email } from './value-objects/email';
import { Name } from './value-objects/name';

export type UserProps = {
  id: number;
  name: Name;
  email: Email;
  password: string;
};

export class User {
  private props: UserProps;

  constructor(props: UserProps) {
    this.props = props;
  }

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name.value;
  }

  get email() {
    return this.props.email.value;
  }

  get password() {
    return this.props.password;
  }
}

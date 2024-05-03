export class Email {
  private _value: string;

  constructor(value: string) {
    this.validateValue(value);
    this._value = value;
  }

  get value() {
    return this._value;
  }

  private validateValue(value: string) {
    if (value.length <= 0) {
      throw new Error('Email must be greater than zero characters');
    }

    if (value.length > 100) {
      throw new Error('Email must be less than 100 characters');
    }

    const [username, domain] = value.split('@');

    if (username.length <= 0) {
      throw new Error('Username must be greater than zero characters');
    }

    if (domain.length <= 0) {
      throw new Error('Domain must be greater than zero characters');
    }

    if (!domain.includes('.')) {
      throw new Error('Domain must contain .');
    }
  }
}

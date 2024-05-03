export class Name {
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
      throw new Error('Name must be greater than zero characters');
    }

    if (value.length > 100) {
      throw new Error('Name must be less than 100 characters');
    }
  }
}

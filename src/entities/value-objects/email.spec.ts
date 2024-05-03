import { Email } from "./email";

describe('Email', () => {
  it('should be able to create an email', () => {
    const email = new Email('john.doe@example.com');
    expect(email.value).toBe('john.doe@example.com');
  });

  it('should not be able to create an email with empty value', () => {
    expect(() => {
      new Email('');
    }).toThrow('Email must be greater than zero characters');
  });

  it('should not be able to create an email with more than 100 characters', () => {
    expect(() => {
      new Email('a'.repeat(101) + '@example.com');
    }).toThrow('Email must be less than 100 characters');
  });

  it('should not be able to create an email with invalid domain', () => {
    expect(() => {
      new Email('john.doe@invalid');
    }).toThrow('Domain must contain .');
  });

  it('should not be able to create an email with empty username', () => {
    expect(() => {
      new Email('@example.com');
    }).toThrow('Username must be greater than zero characters');
  });

  it('should not be able to create an email with empty domain', () => {
    expect(() => {
      new Email('john.doe@');
    }).toThrow('Domain must be greater than zero characters');
  });
});

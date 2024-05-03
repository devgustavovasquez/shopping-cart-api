import { Name } from './name';

describe('Name', () => {
  it('should be able to create a name', () => {
    const name = new Name('John Doe');
    expect(name.value).toBe('John Doe');
  });

  it('should not be able to create a name with empty value', () => {
    expect(() => {
      new Name('');
    }).toThrow();
  });

  it('should not be able to create a name with more than 100 characters', () => {
    expect(() => {
      new Name('a'.repeat(101));
    }).toThrow();
  });
});

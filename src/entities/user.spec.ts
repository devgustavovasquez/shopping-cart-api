import { User } from "./user";
import { Email } from "./value-objects/email";
import { Name } from "./value-objects/name";

describe('User', () => {
  it('should be able to create a product', () => {
    const user = new User({
      id: 1,
      name: new Name("John Doe"),
      email: new Email("john@example.com"),
      password: "123456"
    })

    expect(user.id).toBe(1)
    expect(user.name).toBe("John Doe")
    expect(user.email).toBe("john@example.com")
    expect(user.password).toBe("123456")
  })
})
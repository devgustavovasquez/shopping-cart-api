import { CartItem } from "./cart-item";

describe('CartItem', () => {
  it('should be able to create a CartItem', () => {
    const cartItem = new CartItem({
      productId: 1,
      quantity: 10
    })

    expect(cartItem.productId).toBe(1)
    expect(cartItem.quantity).toBe(10)
  })

  it("should be able to update a CartItem", () => {
    const cartItem = new CartItem({
      productId: 1,
      quantity: 10
    })

    cartItem.quantity = 5
  })

  it('should not be able to create a CartItem with invalid quantity', () => {
    expect(() => {
      new CartItem({
        productId: 1,
        quantity: 0
      })
    }).toThrow()
  })

  it('should not be able to create a CartItem with invalid productId', () => {
    expect(() => {
      new CartItem({
        productId: 0,
        quantity: 10
      })
    }).toThrow()
  })

  it("should not be able to update a CartItem with invalid quantity", () => {
    const cartItem = new CartItem({
      productId: 1,
      quantity: 10
    })

    expect(() => {
      cartItem.quantity = 0
    }).toThrow()
  })
})
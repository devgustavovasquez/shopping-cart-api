import { CartItem } from "./cart-item";

import { makeProduct } from "../../tests/factories/product-factory";

describe('CartItem', () => {
  const product = makeProduct({ stock: 50 })
  
  it('should be able to create a CartItem', () => {
    const cartItem = new CartItem({
      product,
      quantity: 10
    })

    expect(cartItem.product).toBe(product)
    expect(cartItem.quantity).toBe(10)
  })

  it("should be able to update a CartItem", () => {
    const cartItem = new CartItem({
      product,
      quantity: 1
    })

    cartItem.quantity = 5
  })

  it('should not be able to create a CartItem with invalid quantity', () => {
    expect(() => {
      new CartItem({
        product,
        quantity: 0
      })
    }).toThrow()
  })

  it("should not be able to update a CartItem with invalid quantity", () => {
    const cartItem = new CartItem({
      product,
      quantity: 10
    })

    expect(() => {
      cartItem.quantity = 0
    }).toThrow()
  })

  it("should not be able to update a CartItem with invalid stock", () => {
    const cartItem = new CartItem({
      product,
      quantity: 10
    })

    expect(() => {
      cartItem.quantity = 60
    }).toThrow()
  })

  it("should not be able to update a CartItem with a decimal quantity", () => {
    const cartItem = new CartItem({
      product,
      quantity: 10
    })
    

    expect(() => {
      cartItem.quantity = 5.5
    }).toThrow()
  })
})
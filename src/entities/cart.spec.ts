import { Cart } from "./cart";

import { makeCartItem } from "../../tests/factories/cart-item-factory";
import { makeProduct } from "../../tests/factories/product-factory";
import { Product } from "./product";

let product: Product

describe('Cart', () => {
  beforeEach(() => {
    product = makeProduct({ stock: 50 })
  })
  
  it('should be able to create a cart', () => {
    const cart = new Cart({
      id: 1, 
      items: []
    })  

    cart.addItem(makeCartItem({ product, quantity: 10 }))

    expect(cart).toBeTruthy()
    expect(cart.id).toBe(1)
    expect(cart.items).toHaveLength(1)
    expect(cart.items[0].product).toBe(product)
    expect(cart.items[0].quantity).toBe(10)
    expect(cart.items[0].product.stock).toBe(40)
  })

  it("should to be able to add an item to the cart", () => {
    const cart = new Cart({
      id: 1, 
      items: [makeCartItem({ product })]
    })

    cart.addItem(makeCartItem({
      product: makeProduct({id: 2})
    }))
    
    expect(cart.items).toHaveLength(2)
  })


  it("should to be able increase an item if it already exists in the cart", () => {
    const cartItem = makeCartItem({ quantity: 10, product })
    const cart = new Cart({
      id: 1, 
      items: []
    })

    cart.addItem(cartItem)

    cart.addItem(makeCartItem({
      product: cartItem.product,
      quantity: 5
    }))

    expect(cart.items).toHaveLength(1)
    expect(cart.items[0].quantity).toBe(15)
    expect(cart.items[0].product.stock).toBe(35)
  })

  it("should to be able to reduce an item from the cart", () => {
    const cartItem = makeCartItem({ quantity: 10, product })
    const cart = new Cart({
      id: 1, 
      items: []
    })

    cart.addItem(cartItem)

    cart.reduceQuantity(cartItem, 5)

    expect(cart.items[0].quantity).toBe(5)
    expect(cart.items[0].product.stock).toBe(45)
  })

  it("should to be able to clear the cart", () => {
    const cart = new Cart({
      id: 1, 
      items: [makeCartItem({ product })]
    })

    cart.clearCart()

    expect(cart.items).toHaveLength(0)
    expect(cart.items).toEqual([])
  })

  it("should to be able to remove an item if the result is zero", () => {
    const cartItem = makeCartItem({ quantity: 10, product })
    const cart = new Cart({
      id: 1, 
      items: [cartItem]
    })

    cart.reduceQuantity(cartItem, 10)

    expect(cart.items).toHaveLength(0)
  })

  it("should to be able to calculate the total cost", () => {
    const product2 = makeProduct({ price: 20 })
    const cart = new Cart({
      id: 1, 
      items: [
        makeCartItem({
          product,
          quantity: 10
        }),
        makeCartItem({
          product: product2,
          quantity: 5
        })
      ]
    })
    
    expect(cart.calculateTotalCost()).toBe(200)
  })

  it("should not to be able reduce an item from the cart is it not exists", () => {
    const cart = new Cart({
      id: 1, 
      items: []
    })  

    expect(() => {
      cart.reduceQuantity(makeCartItem(), 5)
    }).toThrow()
  })
})
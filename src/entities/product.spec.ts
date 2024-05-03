import { Product } from "./product";
import { Name } from "./value-objects/name";

describe('Product', () => {
  it('should be able to create a product', () => {
    const product = new Product({
      id: 1,
      name: new Name("Product 1"),
      price: 10,
      stock: 10
    })

    expect(product.id).toBe(1)
    expect(product.name).toBe('Product 1')
    expect(product.price).toBe(10)
    expect(product.stock).toBe(10)
  })

  it('should not be able to create a product with invalid price', () => {
    expect(() => {
      new Product({
        id: 1,
        name: new Name("Product 1"),
        price: 0,
        stock: 10
      })
    }).toThrow()
  })
  
  it('should not be able to create a product with price greater than 99999999.99', () => {
    expect(() => {
      new Product({
        id: 1,
        name: new Name("Product 1"),
        price: 100000000.00,
        stock: 10
      })
    }).toThrow()
  })
})
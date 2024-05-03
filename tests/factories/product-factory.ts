import { Product, ProductProps } from "../../src/entities/product";
import { Name } from "../../src/entities/value-objects/name";

export function makeProduct(override: Partial<ProductProps> = {}) {
   return new Product({
    id: 1,
    name: new Name("Product 1"),
    price: 10,
    stock: 50,
    ...override
  })
}
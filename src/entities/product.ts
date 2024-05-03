import { Name } from "./value-objects/name"

export type ProductProps = {
  id: number
  name: Name
  price: number
  stock: number
}

export class Product {
  private props: ProductProps

  constructor(props: ProductProps) {
    this.validatePrice(props.price)
    this.props = props
  }

  get id() {
    return this.props.id
  }

  get name() {
    return this.props.name.value
  }

  get price() {
    return this.props.price
  }

  get stock() {
    return this.props.stock
  }

  set stock(stock: number) {
    this.props.stock = stock
  }

  private validatePrice(price: number) {
    if (price <= 0) {
      throw new Error('Price must be greater than zero')
    }

    const priceString = price.toString()
    const integerPart = priceString.split('.')[0]

    if (integerPart.length > 8) { // 8 ints + 2 decimals = 10 digits
      throw new Error('Price must be less than 99999999.99')
    }
  }
}
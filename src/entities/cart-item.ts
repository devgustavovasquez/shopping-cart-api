import { Product } from "./product"

export type CartItemProps = {
  product: Product
  quantity: number
}

export class CartItem {
  private props: CartItemProps

  constructor(props: CartItemProps) {
    this.validateQuantity(props.quantity)
    this.props = props
  }

  get product() {
    return this.props.product
  }

  get quantity() {
    return this.props.quantity
  }

  set quantity(quantity: number) {
    this.validateQuantity(quantity)
    this.props.quantity = quantity
  }

  private validateQuantity(value: number) {
    if (value <= 0) {
      throw new Error('Quantity must be greater than zero')
    }

    const isDecimal = value % 1 !== 0

    if (isDecimal) {
      throw new Error('Quantity must be an integer')
    }
  }
}
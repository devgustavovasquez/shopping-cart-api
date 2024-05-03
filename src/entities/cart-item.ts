export type CartItemProps = {
  productId: number
  quantity: number
}

export class CartItem {
  private props: CartItemProps

  constructor(props: CartItemProps) {
    this.validateInteger("quantity", props.quantity)
    this.validateInteger("productId", props.productId)
    this.props = props
  }

  get productId() {
    return this.props.productId
  }

  get quantity() {
    return this.props.quantity
  }

  set quantity(quantity: number) {
    this.validateInteger("quantity", quantity)
    this.props.quantity = quantity
  }

  private validateInteger(field: keyof CartItemProps, value: number) {
    if (value <= 0) {
      throw new Error(`${field} must be greater than zero`)
    }

    const isDecimal = value % 1 !== 0

    if (isDecimal) {
      throw new Error(`${field} must be an integer`)
    }
  }
}
import { CartItem } from "./cart-item";

export type CartItemProps = {
  id: number
  items: CartItem[]
}

export class Cart {
  private props: CartItemProps

  constructor(props: CartItemProps) {
    this.props = props
  }

  get id() {
    return this.props.id
  }

  get items() {
    return this.props.items
  }

  addItem(item: CartItem): void {
    const itemIndex = this.props.items.findIndex((cartItem) => cartItem.product.id === item.product.id);

    if (itemIndex === -1) {
      this.props.items.push(item);
    } else {
      this.props.items[itemIndex].quantity += item.quantity;
    }
  }

  reduceQuantity(item: CartItem, quantity: number): void {
    const itemIndex = this.props.items.findIndex((cartItem) => cartItem.product.id === item.product.id);

    if (itemIndex === -1) {
      throw new Error('Cart item not found');
    }

    if ((this.props.items[itemIndex].quantity - quantity) <= 0) {
      this.props.items.splice(itemIndex, 1);

    } else {
      this.props.items[itemIndex].quantity -= quantity;
    }
  }

  clearCart(): void {
    this.props.items = [];
  }

  calculateTotalCost(): number {
    return this.props.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }
}